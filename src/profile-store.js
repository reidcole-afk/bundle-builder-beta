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

function createProfileRepository({
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
    requestLoginCode(emailInput) {
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
    verifyLoginCode(emailInput, codeInput) {
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
    profileForToken(tokenInput) {
      const token = String(tokenInput || "").trim();
      if (!token) return null;
      const store = readStore(filePath);
      const tokenHash = hashSecret(token);
      const session = store.sessions.find((record) => record.tokenHash === tokenHash && !isExpired(record.expiresAt));
      if (!session) return null;
      const profile = store.profiles.find((record) => record.id === session.profileId);
      return profile ? publicProfile(profile) : null;
    },
    saveProfileSnapshot(tokenInput, snapshotInput) {
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

module.exports = {
  createProfileRepository,
  normalizeEmail,
  sanitizeSnapshot,
};
