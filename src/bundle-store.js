const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const DEFAULT_DATA_DIR = path.join(os.tmpdir(), "bundle-builder-beta");
const SUBMITTED_BUNDLE_LIMIT = Number(process.env.BUNDLE_BUILDER_SUBMISSION_LIMIT || 500);
const SUBMITTED_BUNDLE_STORE_PATH = path.resolve(
  process.env.BUNDLE_BUILDER_SUBMISSION_FILE
    || path.join(process.env.BUNDLE_BUILDER_DATA_DIR || DEFAULT_DATA_DIR, "submitted-bundles.json"),
);

function createSubmittedBundleRepository({
  filePath = SUBMITTED_BUNDLE_STORE_PATH,
  limit = SUBMITTED_BUNDLE_LIMIT,
} = {}) {
  return {
    limit,
    descriptor() {
      const configured = Boolean(process.env.BUNDLE_BUILDER_SUBMISSION_FILE || process.env.BUNDLE_BUILDER_DATA_DIR);
      return {
        mode: configured ? "configured-file" : "ephemeral-file",
        durable: configured,
        kind: "submitted-bundle-repository",
        note: configured
          ? "Submitted bundle snapshots are stored in the configured server file. Swap this repository for a database adapter when DB credentials are ready."
          : "Submitted bundle snapshots are stored on the server filesystem for beta testing and may reset on redeploys.",
      };
    },
    list({ limit: requestedLimit = limit } = {}) {
      return readJsonRecords(filePath)
        .map(sanitizeStoredBundle)
        .filter(Boolean)
        .slice(0, Math.max(1, Math.min(limit, requestedLimit)));
    },
    upsert(input) {
      const record = sanitizeSubmittedBundle(input);
      if (!record.coins.length) {
        const error = new Error("Submitted bundle must include at least one coin.");
        error.code = "EMPTY_BUNDLE";
        throw error;
      }
      const records = readJsonRecords(filePath).map(sanitizeStoredBundle).filter(Boolean);
      const nextRecords = [record, ...records.filter((item) => item.id !== record.id)].slice(0, limit);
      writeJsonRecords(filePath, nextRecords);
      return record;
    },
  };
}

function readJsonRecords(filePath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function writeJsonRecords(filePath, records) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(records.map(sanitizeStoredBundle).filter(Boolean), null, 2));
}

function sanitizeSubmittedBundle(input = {}) {
  const now = new Date().toISOString();
  const id = makeSubmissionId(input.id || input.bundleNumber);
  const coins = Array.isArray(input.coins) ? input.coins.slice(0, 24).map(sanitizeSubmittedCoin).filter(Boolean) : [];
  const startValueUsd = finiteNumber(input.startValueUsd)
    || coins.reduce((sum, coin) => sum + (finiteNumber(coin.amountUsd) || 0), 0);
  return {
    id,
    bundleNumber: id,
    source: "bundle-builder-beta",
    submittedAt: now,
    bundleId: safeText(input.bundleId, 80),
    bundleName: safeText(input.bundleName, 120) || "Bundle Builder allocation",
    network: safeText(input.network, 30) || "Base",
    amountUsd: finiteNumber(input.amountUsd) || startValueUsd,
    startValueUsd,
    preferences: sanitizeObject(input.preferences, 12),
    fitScore: finiteNumber(input.fitScore),
    riskIndex: finiteNumber(input.riskIndex),
    thesis: safeText(input.thesis, 500),
    coins,
  };
}

function sanitizeStoredBundle(input = {}) {
  if (!input || typeof input !== "object") return null;
  const coins = Array.isArray(input.coins) ? input.coins.map(sanitizeSubmittedCoin).filter(Boolean) : [];
  if (!coins.length) return null;
  return {
    id: safeText(input.id || input.bundleNumber, 32) || makeSubmissionId(),
    bundleNumber: safeText(input.bundleNumber || input.id, 32) || makeSubmissionId(),
    source: safeText(input.source, 60) || "bundle-builder-beta",
    submittedAt: safeText(input.submittedAt, 40) || new Date().toISOString(),
    bundleId: safeText(input.bundleId, 80),
    bundleName: safeText(input.bundleName, 120) || "Bundle Builder allocation",
    network: safeText(input.network, 30) || "Base",
    amountUsd: finiteNumber(input.amountUsd) || null,
    startValueUsd: finiteNumber(input.startValueUsd) || coins.reduce((sum, coin) => sum + (finiteNumber(coin.amountUsd) || 0), 0),
    preferences: sanitizeObject(input.preferences, 12),
    fitScore: finiteNumber(input.fitScore),
    riskIndex: finiteNumber(input.riskIndex),
    thesis: safeText(input.thesis, 500),
    coins,
  };
}

function sanitizeSubmittedCoin(input = {}) {
  const ticker = safeText(input.ticker, 16).toUpperCase();
  if (!/^[A-Z0-9.]{2,16}$/.test(ticker)) return null;
  return {
    ticker,
    name: safeText(input.name, 120),
    network: safeText(input.network, 30) || "Base",
    allocationPercent: finiteNumber(input.allocationPercent) || finiteNumber(input.weight) || 0,
    amountUsd: finiteNumber(input.amountUsd) || finiteNumber(input.amount) || 0,
    quantity: finiteNumber(input.quantity),
    startPriceUsd: finiteNumber(input.startPriceUsd) || finiteNumber(input.priceUsd) || finiteNumber(input.price),
    priceSource: safeText(input.priceSource, 80),
    role: safeText(input.role, 140),
    safetyLabel: safeText(input.safetyLabel, 120),
  };
}

function makeSubmissionId(value) {
  const existing = safeText(value, 32).replace(/^#/, "");
  if (/^\d{8,20}$/.test(existing)) return existing;
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `${Date.now()}${random}`.slice(0, 17);
}

function sanitizeObject(input, maxKeys = 20) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(
    Object.entries(input)
      .slice(0, maxKeys)
      .map(([key, value]) => [safeText(key, 50), typeof value === "number" ? finiteNumber(value) : safeText(value, 120)])
      .filter(([key]) => key),
  );
}

function safeText(value, maxLength = 200) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

module.exports = {
  createSubmittedBundleRepository,
  sanitizeSubmittedBundle,
  sanitizeStoredBundle,
  sanitizeSubmittedCoin,
};
