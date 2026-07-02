const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const DEFAULT_DATA_DIR = path.join(os.tmpdir(), "bundle-builder-beta");
const CHART_CACHE_STORE_PATH = path.resolve(
  process.env.BUNDLE_BUILDER_CHART_CACHE_FILE
    || path.join(process.env.BUNDLE_BUILDER_DATA_DIR || DEFAULT_DATA_DIR, "coingecko-charts.json"),
);
const CHART_CACHE_TABLE = process.env.BUNDLE_BUILDER_CHART_CACHE_TABLE || "chart_cache";

function createChartCacheRepository({ filePath = CHART_CACHE_STORE_PATH } = {}) {
  const fileRepository = createFileChartCacheRepository({ filePath });
  const connectionString = process.env.DATABASE_URL || process.env.BUNDLE_BUILDER_DATABASE_URL;
  if (connectionString) {
    return createPostgresChartCacheRepository({
      connectionString,
      tableName: CHART_CACHE_TABLE,
      fallbackRepository: fileRepository,
    });
  }
  return fileRepository;
}

function createFileChartCacheRepository({ filePath = CHART_CACHE_STORE_PATH } = {}) {
  return {
    descriptor() {
      return {
        mode: "file",
        durable: !filePath.startsWith(os.tmpdir()),
        kind: "bundle-builder-chart-cache-repository",
        configured: true,
        path: filePath,
        warning: filePath.startsWith(os.tmpdir()) ? "Chart cache is stored in temporary local files and may reset on deploy." : "",
      };
    },
    async get(key) {
      const store = readStore(filePath);
      return store[safeKey(key)] || null;
    },
    async set(key, value) {
      const store = readStore(filePath);
      store[safeKey(key)] = value;
      writeStore(filePath, store);
      return value;
    },
    async getMany(keys = []) {
      const store = readStore(filePath);
      return new Map(keys.map((key) => [key, store[safeKey(key)] || null]));
    },
  };
}

function createPostgresChartCacheRepository({ connectionString, tableName, fallbackRepository }) {
  let pool = null;
  let readyPromise = null;
  let lastError = "";
  let lastCount = 0;
  const safeTableName = sanitizeIdentifier(tableName || "chart_cache");

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
        create table if not exists ${safeTableName} (
          cache_key text primary key,
          updated_at timestamptz not null default now(),
          payload jsonb not null
        );
        create index if not exists ${safeTableName}_updated_at_idx on ${safeTableName} (updated_at);
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
      lastError = error.message || "Database chart cache failed.";
      return fallback(error);
    }
  }

  return {
    descriptor() {
      return {
        mode: "postgres",
        durable: !lastError,
        kind: "bundle-builder-chart-cache-repository",
        configured: true,
        databaseUrlConfigured: true,
        table: safeTableName,
        cacheCount: lastCount,
        fallback: fallbackRepository.descriptor(),
        warning: lastError ? `Postgres chart cache failed; using file fallback. ${lastError}` : "",
        note: "Reusable market charts are stored in Supabase/Postgres when DATABASE_URL is configured.",
      };
    },
    async get(key) {
      return withFallback(async () => {
        await ensureReady();
        const result = await getPool().query(`select payload from ${safeTableName} where cache_key = $1`, [safeKey(key)]);
        return result.rows[0]?.payload || null;
      }, () => fallbackRepository.get(key));
    },
    async set(key, value) {
      return withFallback(async () => {
        await ensureReady();
        await getPool().query(
          `insert into ${safeTableName} (cache_key, updated_at, payload)
           values ($1, now(), $2::jsonb)
           on conflict (cache_key) do update set updated_at = now(), payload = excluded.payload`,
          [safeKey(key), JSON.stringify(value)],
        );
        lastCount += 1;
        return value;
      }, () => fallbackRepository.set(key, value));
    },
    async getMany(keys = []) {
      return withFallback(async () => {
        await ensureReady();
        const cleanKeys = keys.map(safeKey).filter(Boolean);
        if (!cleanKeys.length) return new Map();
        const result = await getPool().query(`select cache_key, payload from ${safeTableName} where cache_key = any($1)`, [cleanKeys]);
        const output = new Map(cleanKeys.map((key) => [key, null]));
        result.rows.forEach((row) => output.set(row.cache_key, row.payload || null));
        lastCount = Math.max(lastCount, result.rowCount || 0);
        return output;
      }, () => fallbackRepository.getMany(keys));
    },
  };
}

function readStore(filePath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed;
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

function writeStore(filePath, store) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(store, null, 2));
}

function safeKey(value) {
  return String(value || "").trim().slice(0, 240);
}

function sanitizeIdentifier(value) {
  const text = String(value || "").trim();
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(text) ? text : "chart_cache";
}

function clampInteger(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, Math.round(number)));
}

module.exports = {
  createChartCacheRepository,
};
