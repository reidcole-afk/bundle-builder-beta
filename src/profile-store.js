const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const DEFAULT_DATA_DIR = path.join(os.tmpdir(), "bundle-builder-beta");
const PROFILE_STORE_PATH = path.resolve(
  process.env.BUNDLE_BUILDER_PROFILE_FILE
    || path.join(process.env.BUNDLE_BUILDER_DATA_DIR || DEFAULT_DATA_DIR, "profiles.json"),
);
const LOGIN_CODE_TTL_MS = Number(process.env.BUNDLE_BUILDER_LOGIN_CODE_TTL_MS || 1000 * 60 * 10);
const SESSION_TTL_MS = Number(process.env.BUNDLE_BUILDER_SESSION_TTL_MS || 1000 * 60 * 60 * 24 * 30);
const MAX_ARRAY_ITEMS = 100;
const PROFILE_TABLE = process.env.BUNDLE_BUILDER_PROFILE_TABLE || "profiles";

function createProfileRepository({
  filePath = PROFILE_STORE_PATH,
  loginCodeTtlMs = LOGIN_CODE_TTL_MS,
  sessionTtlMs = SESSION_TTL_MS,
} = {}) {
  const fileRepository = createFileProfileRepository({ filePath, loginCodeTtlMs, sessionTtlMs });
  const connectionString = process.env.DATABASE_URL || process.env.BUNDLE_BUILDER_DATABASE_URL;
  if (connectionString) {
    return createPostgresProfileRepository({
      connectionString,
      tableName: PROFILE_TABLE,
      loginCodeTtlMs,
      sessionTtlMs,
      fallbackRepository: fileRepository,
    });
  }
  return fileRepository;
}

function createFileProfileRepository({
  filePath = PROFILE_STORE_PATH,
  loginCodeTtlMs = LOGIN_CODE_TTL_MS,
  sessionTtlMs = SESSION_TTL_MS,
} = {}) {
  return {
    descriptor() {
      const configured = Boolean(process.env.BUNDLE_BUILDER_PROFILE_FILE || process.env.BUNDLE_BUILDER_DATA_DIR);
      return {
        mode: configured ? "configured-file" : "ephemeral-file",
        durable: configured,
        kind: "bundle-builder-profile-repository",
        auth: "email-code",
        note: configured
          ? "Profile snapshots are stored in the configured prototype profile file."
          : "Profile snapshots are stored on the server filesystem for beta testing and may reset on redeploys.",
      };
    },
    async requestLoginCode(emailInput) {
      const email = normalizeEmail(emailInput);
      if (!email) {
        const error = new Error("Enter a valid email address.");
        error.code = "INVALID_EMAIL";
        throw error;
      }
      const store = readStore(filePath);
      const profile = ensureProfile(store, email);
      const code = makeLoginCode();
      const codeId = makeId("code");
      store.loginCodes = store.loginCodes.filter((record) => record.email !== email && !isExpired(record.expiresAt));
      store.loginCodes.push({
        id: codeId,
        email,
        profileId: profile.id,
        codeHash: hashSecret(code),
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + loginCodeTtlMs).toISOString(),
        usedAt: "",
      });
      writeStore(filePath, store);
      return {
        email,
        profileId: profile.id,
        code,
        expiresAt: store.loginCodes[store.loginCodes.length - 1].expiresAt,
      };
    },
    async verifyLoginCode(emailInput, codeInput) {
      const email = normalizeEmail(emailInput);
      const code = String(codeInput || "").replace(/\D/g, "");
      if (!email || code.length !== 6) {
        const error = new Error("Enter the email and 6-digit login code.");
        error.code = "INVALID_LOGIN_CODE";
        throw error;
      }
      const store = readStore(filePath);
      const codeHash = hashSecret(code);
      const match = store.loginCodes.find((record) => record.email === email
        && !record.usedAt
        && !isExpired(record.expiresAt)
        && record.codeHash === codeHash);
      if (!match) {
        const error = new Error("The login code is invalid or expired.");
        error.code = "INVALID_LOGIN_CODE";
        throw error;
      }
      match.usedAt = new Date().toISOString();
      const profile = ensureProfile(store, email);
      profile.lastLoginAt = new Date().toISOString();
      const token = crypto.randomBytes(32).toString("hex");
      store.sessions.push({
        tokenHash: hashSecret(token),
        profileId: profile.id,
        email,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + sessionTtlMs).toISOString(),
      });
      pruneStore(store);
      writeStore(filePath, store);
      return {
        token,
        profile: publicProfile(profile),
      };
    },
    async profileForToken(tokenInput) {
      const token = String(tokenInput || "").trim();
      if (!token) return null;
      const store = readStore(filePath);
      const tokenHash = hashSecret(token);
      const session = store.sessions.find((record) => record.tokenHash === tokenHash && !isExpired(record.expiresAt));
      if (!session) return null;
      const profile = store.profiles.find((record) => record.id === session.profileId);
      return profile ? publicProfile(profile) : null;
    },
    async saveProfileSnapshot(tokenInput, snapshotInput) {
      const token = String(tokenInput || "").trim();
      if (!token) return null;
      const store = readStore(filePath);
      const tokenHash = hashSecret(token);
      const session = store.sessions.find((record) => record.tokenHash === tokenHash && !isExpired(record.expiresAt));
      if (!session) return null;
      const profile = store.profiles.find((record) => record.id === session.profileId);
      if (!profile) return null;
      const snapshot = sanitizeSnapshot(snapshotInput);
      profile.displayName = safeText(snapshot.profile?.displayName, 40);
      profile.snapshot = snapshot;
      profile.updatedAt = new Date().toISOString();
      writeStore(filePath, store);
      return publicProfile(profile);
    },
  };
}

function createPostgresProfileRepository({
  connectionString,
  tableName,
  loginCodeTtlMs = LOGIN_CODE_TTL_MS,
  sessionTtlMs = SESSION_TTL_MS,
  fallbackRepository,
}) {
  let pool = null;
  let readyPromise = null;
  let lastError = "";
  let lastProfileCount = 0;
  const safeProfileTable = sanitizeIdentifier(tableName || "profiles");
  const safeLoginCodeTable = sanitizeIdentifier(`${safeProfileTable}_login_codes`);
  const safeSessionTable = sanitizeIdentifier(`${safeProfileTable}_sessions`);

  function getPool() {
    if (!pool) {
      const { Pool } = require("pg");
      pool = new Pool({
        connectionString,
        ssl: process.env.BUNDLE_BUILDER_POSTGRES_SSL === "false" ? false : { rejectUnauthorized: false },
        max: clampInteger(process.env.BUNDLE_BUILDER_POSTGRES_POOL_SIZE, 1, 8, 3),
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });
    }
    return pool;
  }

  async function ensureReady() {
    if (!readyPromise) {
      readyPromise = getPool().query(`
        create table if not exists ${safeProfileTable} (
          id text primary key,
          email text not null unique,
          display_name text not null default '',
          created_at timestamptz not null,
          updated_at timestamptz not null,
          last_login_at timestamptz,
          snapshot jsonb not null
        );
        create index if not exists ${safeProfileTable}_email_idx on ${safeProfileTable} (email);
        create table if not exists ${safeLoginCodeTable} (
          id text primary key,
          email text not null,
          profile_id text not null references ${safeProfileTable}(id) on delete cascade,
          code_hash text not null,
          created_at timestamptz not null,
          expires_at timestamptz not null,
          used_at timestamptz
        );
        create index if not exists ${safeLoginCodeTable}_email_idx on ${safeLoginCodeTable} (email);
        create index if not exists ${safeLoginCodeTable}_expires_at_idx on ${safeLoginCodeTable} (expires_at);
        create table if not exists ${safeSessionTable} (
          token_hash text primary key,
          profile_id text not null references ${safeProfileTable}(id) on delete cascade,
          email text not null,
          created_at timestamptz not null,
          expires_at timestamptz not null
        );
        create index if not exists ${safeSessionTable}_profile_id_idx on ${safeSessionTable} (profile_id);
        create index if not exists ${safeSessionTable}_expires_at_idx on ${safeSessionTable} (expires_at);
      `);
    }
    await readyPromise;
  }

  async function withFallback(operation, fallback) {
    try {
      const value = await operation();
      lastError = "";
      return value;
    } catch (error) {
      lastError = error.message || "Database profile store failed.";
      return fallback(error);
    }
  }

  async function ensurePostgresProfile(email) {
    await ensureReady();
    const existing = await getPool().query(`select * from ${safeProfileTable} where email = $1 limit 1`, [email]);
    if (existing.rows[0]) return rowToProfile(existing.rows[0]);
    const now = new Date().toISOString();
    const profile = {
      id: makeId("profile"),
      email,
      displayName: "",
      createdAt: now,
      updatedAt: now,
      lastLoginAt: "",
      snapshot: emptySnapshot(),
    };
    await getPool().query(
      `insert into ${safeProfileTable}
        (id, email, display_name, created_at, updated_at, last_login_at, snapshot)
       values ($1, $2, $3, $4, $5, null, $6::jsonb)
       on conflict (email) do nothing`,
      [profile.id, profile.email, profile.displayName, profile.createdAt, profile.updatedAt, JSON.stringify(profile.snapshot)],
    );
    const result = await getPool().query(`select * from ${safeProfileTable} where email = $1 limit 1`, [email]);
    lastProfileCount += 1;
    return rowToProfile(result.rows[0]) || profile;
  }

  async function findProfileByToken(tokenInput) {
    const token = String(tokenInput || "").trim();
    if (!token) return null;
    await ensureReady();
    const tokenHash = hashSecret(token);
    const result = await getPool().query(
      `select p.*
       from ${safeSessionTable} s
       join ${safeProfileTable} p on p.id = s.profile_id
       where s.token_hash = $1 and s.expires_at > now()
       limit 1`,
      [tokenHash],
    );
    return rowToProfile(result.rows[0]);
  }

  return {
    descriptor() {
      return {
        mode: "postgres",
        durable: !lastError,
        kind: "bundle-builder-profile-repository",
        auth: "email-code",
        configured: true,
        databaseUrlConfigured: true,
        tables: {
          profiles: safeProfileTable,
          loginCodes: safeLoginCodeTable,
          sessions: safeSessionTable,
        },
        profileCount: lastProfileCount,
        fallback: fallbackRepository.descriptor(),
        warning: lastError ? `Postgres profile store failed; using file fallback. ${lastError}` : "",
        note: "Profile snapshots, login codes, and sessions are stored in Supabase/Postgres when DATABASE_URL is configured.",
      };
    },
    async requestLoginCode(emailInput) {
      return withFallback(async () => {
        const email = normalizeEmail(emailInput);
        if (!email) {
          const error = new Error("Enter a valid email address.");
          error.code = "INVALID_EMAIL";
          throw error;
        }
        const profile = await ensurePostgresProfile(email);
        const code = makeLoginCode();
        const codeId = makeId("code");
        const now = new Date().toISOString();
        const expiresAt = new Date(Date.now() + loginCodeTtlMs).toISOString();
        await getPool().query(
          `delete from ${safeLoginCodeTable} where email = $1 or expires_at <= now()`,
          [email],
        );
        await getPool().query(
          `insert into ${safeLoginCodeTable}
            (id, email, profile_id, code_hash, created_at, expires_at, used_at)
           values ($1, $2, $3, $4, $5, $6, null)`,
          [codeId, email, profile.id, hashSecret(code), now, expiresAt],
        );
        return { email, profileId: profile.id, code, expiresAt };
      }, () => fallbackRepository.requestLoginCode(emailInput));
    },
    async verifyLoginCode(emailInput, codeInput) {
      return withFallback(async () => {
        const email = normalizeEmail(emailInput);
        const code = String(codeInput || "").replace(/\D/g, "");
        if (!email || code.length !== 6) {
          const error = new Error("Enter the email and 6-digit login code.");
          error.code = "INVALID_LOGIN_CODE";
          throw error;
        }
        await ensureReady();
        const codeHash = hashSecret(code);
        const match = await getPool().query(
          `select * from ${safeLoginCodeTable}
           where email = $1 and code_hash = $2 and used_at is null and expires_at > now()
           order by created_at desc
           limit 1`,
          [email, codeHash],
        );
        if (!match.rows[0]) {
          const error = new Error("The login code is invalid or expired.");
          error.code = "INVALID_LOGIN_CODE";
          throw error;
        }
        const now = new Date().toISOString();
        await getPool().query(`update ${safeLoginCodeTable} set used_at = $2 where id = $1`, [match.rows[0].id, now]);
        const profile = await ensurePostgresProfile(email);
        await getPool().query(
          `update ${safeProfileTable} set last_login_at = $2, updated_at = $2 where id = $1`,
          [profile.id, now],
        );
        const token = crypto.randomBytes(32).toString("hex");
        await getPool().query(
          `delete from ${safeSessionTable} where expires_at <= now()`,
        );
        await getPool().query(
          `insert into ${safeSessionTable} (token_hash, profile_id, email, created_at, expires_at)
           values ($1, $2, $3, $4, $5)`,
          [hashSecret(token), profile.id, email, now, new Date(Date.now() + sessionTtlMs).toISOString()],
        );
        const saved = await getPool().query(`select * from ${safeProfileTable} where id = $1 limit 1`, [profile.id]);
        return {
          token,
          profile: publicProfile(rowToProfile(saved.rows[0]) || profile),
        };
      }, () => fallbackRepository.verifyLoginCode(emailInput, codeInput));
    },
    async profileForToken(tokenInput) {
      return withFallback(async () => {
        const profile = await findProfileByToken(tokenInput);
        return profile ? publicProfile(profile) : null;
      }, () => fallbackRepository.profileForToken(tokenInput));
    },
    async saveProfileSnapshot(tokenInput, snapshotInput) {
      return withFallback(async () => {
        const profile = await findProfileByToken(tokenInput);
        if (!profile) return null;
        const snapshot = sanitizeSnapshot(snapshotInput);
        const displayName = safeText(snapshot.profile?.displayName, 40);
        const now = new Date().toISOString();
        const result = await getPool().query(
          `update ${safeProfileTable}
           set display_name = $2, snapshot = $3::jsonb, updated_at = $4
           where id = $1
           returning *`,
          [profile.id, displayName, JSON.stringify(snapshot), now],
        );
        return publicProfile(rowToProfile(result.rows[0]));
      }, () => fallbackRepository.saveProfileSnapshot(tokenInput, snapshotInput));
    },
  };
}

function readStore(filePath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return normalizeStore(parsed);
  } catch (error) {
    if (error.code === "ENOENT") return normalizeStore({});
    throw error;
  }
}

function writeStore(filePath, store) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(normalizeStore(store), null, 2));
}

function normalizeStore(input = {}) {
  return {
    profiles: Array.isArray(input.profiles) ? input.profiles.map(sanitizeProfile).filter(Boolean) : [],
    loginCodes: Array.isArray(input.loginCodes) ? input.loginCodes.map(sanitizeLoginCode).filter(Boolean) : [],
    sessions: Array.isArray(input.sessions) ? input.sessions.map(sanitizeSession).filter(Boolean) : [],
  };
}

function ensureProfile(store, email) {
  let profile = store.profiles.find((record) => record.email === email);
  if (profile) return profile;
  profile = {
    id: makeId("profile"),
    email,
    displayName: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: "",
    snapshot: emptySnapshot(),
  };
  store.profiles.push(profile);
  return profile;
}

function publicProfile(profile) {
  return {
    id: profile.id,
    email: profile.email,
    displayName: profile.displayName,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
    lastLoginAt: profile.lastLoginAt,
    snapshot: sanitizeSnapshot(profile.snapshot),
  };
}

function emptySnapshot() {
  return {
    profile: {},
    favoriteCoins: [],
    recentBundles: [],
    reviewAlerts: [],
    builderPreferences: {},
  };
}

function sanitizeProfile(input = {}) {
  const email = normalizeEmail(input.email);
  const id = safeText(input.id, 80);
  if (!email || !id) return null;
  return {
    id,
    email,
    displayName: safeText(input.displayName, 40),
    createdAt: safeText(input.createdAt, 40) || new Date().toISOString(),
    updatedAt: safeText(input.updatedAt, 40) || new Date().toISOString(),
    lastLoginAt: safeText(input.lastLoginAt, 40),
    snapshot: sanitizeSnapshot(input.snapshot),
  };
}

function sanitizeSnapshot(input = {}) {
  const profile = input.profile && typeof input.profile === "object" && !Array.isArray(input.profile) ? input.profile : {};
  return {
    profile: {
      displayName: safeText(profile.displayName || input.displayName, 40),
    },
    favoriteCoins: sanitizeRecordArray(input.favoriteCoins),
    recentBundles: sanitizeRecordArray(input.recentBundles),
    reviewAlerts: sanitizeRecordArray(input.reviewAlerts),
    builderPreferences: sanitizePlainObject(input.builderPreferences, 40),
  };
}

function sanitizeRecordArray(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX_ARRAY_ITEMS).map((item) => sanitizePlainObject(item, 80)).filter((item) => Object.keys(item).length);
}

function sanitizePlainObject(input, maxKeys = 40) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(
    Object.entries(input)
      .slice(0, maxKeys)
      .map(([key, value]) => [safeText(key, 80), sanitizePlainValue(value)])
      .filter(([key, value]) => key && value !== undefined),
  );
}

function sanitizePlainValue(value) {
  if (value === null || typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "string") return safeText(value, 1200);
  if (Array.isArray(value)) return value.slice(0, 40).map(sanitizePlainValue).filter((item) => item !== undefined);
  if (value && typeof value === "object") return sanitizePlainObject(value, 40);
  return undefined;
}

function sanitizeLoginCode(input = {}) {
  const email = normalizeEmail(input.email);
  if (!email || !input.codeHash) return null;
  return {
    id: safeText(input.id, 80) || makeId("code"),
    email,
    profileId: safeText(input.profileId, 80),
    codeHash: safeText(input.codeHash, 160),
    createdAt: safeText(input.createdAt, 40) || new Date().toISOString(),
    expiresAt: safeText(input.expiresAt, 40),
    usedAt: safeText(input.usedAt, 40),
  };
}

function sanitizeSession(input = {}) {
  if (!input.tokenHash || !input.profileId || isExpired(input.expiresAt)) return null;
  return {
    tokenHash: safeText(input.tokenHash, 160),
    profileId: safeText(input.profileId, 80),
    email: normalizeEmail(input.email),
    createdAt: safeText(input.createdAt, 40) || new Date().toISOString(),
    expiresAt: safeText(input.expiresAt, 40),
  };
}

function pruneStore(store) {
  store.loginCodes = store.loginCodes.filter((record) => !record.usedAt && !isExpired(record.expiresAt));
  store.sessions = store.sessions.filter((record) => !isExpired(record.expiresAt));
}

function makeLoginCode() {
  return String(crypto.randomInt(100000, 1000000));
}

function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${crypto.randomBytes(6).toString("hex")}`;
}

function hashSecret(value) {
  const pepper = authSecret();
  return crypto.createHash("sha256").update(`${pepper}:${value}`).digest("hex");
}

function authSecret() {
  const secret = process.env.BUNDLE_BUILDER_AUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production" || process.env.RENDER) {
    throw new Error("BUNDLE_BUILDER_AUTH_SECRET is required in production.");
  }
  return "bundle-builder-prototype-secret";
}

function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 ? email : "";
}

function isExpired(value) {
  const time = new Date(value || 0).getTime();
  return !Number.isFinite(time) || time <= Date.now();
}

function safeText(value, maxLength = 200) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function rowToProfile(row) {
  if (!row) return null;
  return sanitizeProfile({
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    createdAt: isoText(row.created_at),
    updatedAt: isoText(row.updated_at),
    lastLoginAt: isoText(row.last_login_at),
    snapshot: row.snapshot,
  });
}

function isoText(value) {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString();
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? new Date(time).toISOString() : safeText(value, 40);
}

function sanitizeIdentifier(value) {
  const text = String(value || "").replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 48);
  return text || "profiles";
}

function clampInteger(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

module.exports = {
  createProfileRepository,
  normalizeEmail,
  sanitizeSnapshot,
};
