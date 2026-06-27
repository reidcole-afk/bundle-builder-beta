const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const DEFAULT_DATA_DIR = path.join(os.tmpdir(), "bundle-builder-beta");
const PULSE_SNAPSHOT_STORE_PATH = path.resolve(
  process.env.BUNDLE_BUILDER_PULSE_SNAPSHOT_FILE
    || path.join(process.env.BUNDLE_BUILDER_DATA_DIR || DEFAULT_DATA_DIR, "pulse-snapshots.json"),
);
const MAX_SNAPSHOTS = 600;
const MAX_COINS_PER_SNAPSHOT = 20;

function createPulseSnapshotRepository({ filePath = PULSE_SNAPSHOT_STORE_PATH } = {}) {
  return {
    descriptor() {
      const configured = Boolean(process.env.BUNDLE_BUILDER_PULSE_SNAPSHOT_FILE || process.env.BUNDLE_BUILDER_DATA_DIR);
      return {
        mode: configured ? "configured-file" : "ephemeral-file",
        durable: configured,
        kind: "bundle-builder-pulse-snapshot-repository",
        note: configured
          ? "Market pulse snapshots are stored in the configured prototype data file."
          : "Market pulse snapshots are stored on the server filesystem for beta testing and may reset on redeploys.",
      };
    },
    saveSnapshot(input = {}) {
      const store = readStore(filePath);
      const snapshot = sanitizeSnapshot(input);
      if (!snapshot.coins.length) {
        const error = new Error("Pulse snapshot must include at least one coin.");
        error.code = "EMPTY_PULSE_SNAPSHOT";
        throw error;
      }
      const last = store.snapshots[store.snapshots.length - 1];
      if (last && last.fingerprint === snapshot.fingerprint) {
        store.snapshots[store.snapshots.length - 1] = snapshot;
      } else {
        store.snapshots.push(snapshot);
      }
      store.snapshots = store.snapshots.slice(-MAX_SNAPSHOTS);
      writeStore(filePath, store);
      return snapshot;
    },
    listSnapshots({ limit = 50 } = {}) {
      const store = readStore(filePath);
      const boundedLimit = clampInteger(limit, 1, MAX_SNAPSHOTS, 50);
      return store.snapshots.slice(-boundedLimit).reverse();
    },
    accuracySummary() {
      return computeAccuracySummary(readStore(filePath).snapshots);
    },
  };
}

function readStore(filePath) {
  try {
    return normalizeStore(JSON.parse(fs.readFileSync(filePath, "utf8")));
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
    snapshots: Array.isArray(input.snapshots) ? input.snapshots.map(sanitizeSnapshot).filter((item) => item.coins.length) : [],
  };
}

function sanitizeSnapshot(input = {}) {
  const createdAt = validIsoDate(input.createdAt) || new Date().toISOString();
  const coins = Array.isArray(input.coins)
    ? input.coins.slice(0, MAX_COINS_PER_SNAPSHOT).map(sanitizeCoin).filter((coin) => coin.ticker)
    : [];
  const network = safeText(input.network, 40);
  const selectedWindow = safeText(input.selectedWindow, 24) || "24h";
  const selectedReadWindow = safeText(input.selectedReadWindow, 24) || "7d";
  return {
    id: safeText(input.id, 80) || makeId("pulse"),
    createdAt,
    source: safeText(input.source, 60) || "live-market-pulse",
    network,
    selectedWindow,
    selectedReadWindow,
    fingerprint: fingerprintSnapshot(createdAt, network, selectedWindow, coins),
    coins,
  };
}

function sanitizeCoin(input = {}) {
  return {
    ticker: normalizeTicker(input.ticker),
    name: safeText(input.name, 80),
    network: safeText(input.network, 40),
    rank: finiteOrNull(input.rank),
    priceUsd: finiteOrNull(input.priceUsd),
    change24h: finiteOrNull(input.change24h),
    change7d: finiteOrNull(input.change7d),
    change30d: finiteOrNull(input.change30d),
    volume24h: finiteOrNull(input.volume24h),
    liquidityUsd: finiteOrNull(input.liquidityUsd),
    bullishScore: finiteOrNull(input.bullishScore),
    projected24hChange: finiteOrNull(input.projected24hChange),
    projected7dChange: finiteOrNull(input.projected7dChange),
    projected30dChange: finiteOrNull(input.projected30dChange),
    action: safeText(input.action, 40),
    setupLabel: safeText(input.setupLabel, 80),
    edgeLabel: safeText(input.edgeLabel, 80),
    source: safeText(input.source, 60),
  };
}

function computeAccuracySummary(snapshots = []) {
  const normalized = snapshots.map(sanitizeSnapshot).filter((item) => item.coins.length);
  const latest = normalized[normalized.length - 1] || null;
  const horizons = [
    outcomeForHorizon(normalized, "24h", 24 * 60 * 60 * 1000, "projected24hChange"),
    outcomeForHorizon(normalized, "7d", 7 * 24 * 60 * 60 * 1000, "projected7dChange"),
    outcomeForHorizon(normalized, "30d", 30 * 24 * 60 * 60 * 1000, "projected30dChange"),
  ];
  const topCoinsBySnapshots = summarizeTopCoins(normalized);
  return {
    totalSnapshots: normalized.length,
    totalCoins: normalized.reduce((sum, snapshot) => sum + snapshot.coins.length, 0),
    latestSnapshotAt: latest?.createdAt || "",
    latestRunCoins: latest?.coins.slice(0, 5) || [],
    topCoinsBySnapshots,
    horizons,
  };
}

function outcomeForHorizon(snapshots, label, horizonMs, projectedKey) {
  let checked = 0;
  let correct = 0;
  let pending = 0;
  snapshots.forEach((snapshot) => {
    const startTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(startTime)) return;
    snapshot.coins.forEach((coin) => {
      const startPrice = finiteOrNull(coin.priceUsd);
      const projectedChange = finiteOrNull(coin[projectedKey]);
      if (!startPrice || projectedChange === null) return;
      const match = findFutureCoin(snapshots, coin, startTime + horizonMs);
      if (!match) {
        pending += 1;
        return;
      }
      const endPrice = finiteOrNull(match.priceUsd);
      if (!endPrice) return;
      const actualChange = ((endPrice - startPrice) / startPrice) * 100;
      checked += 1;
      if (directionMatches(projectedChange, actualChange)) correct += 1;
    });
  });
  return {
    label,
    checked,
    pending,
    directionAccuracy: checked ? Math.round((correct / checked) * 100) : null,
    status: checked ? "Tracking" : "Collecting",
  };
}

function findFutureCoin(snapshots, coin, targetTime) {
  for (const snapshot of snapshots) {
    const snapshotTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(snapshotTime) || snapshotTime < targetTime) continue;
    const match = snapshot.coins.find((futureCoin) => futureCoin.ticker === coin.ticker
      && (!coin.network || !futureCoin.network || futureCoin.network === coin.network));
    if (match) return match;
  }
  return null;
}

function directionMatches(projectedChange, actualChange) {
  if (Math.abs(projectedChange) < 1 && Math.abs(actualChange) < 1.5) return true;
  if (projectedChange >= 0 && actualChange >= 0) return true;
  return projectedChange < 0 && actualChange < 0;
}

function summarizeTopCoins(snapshots) {
  const counts = new Map();
  snapshots.forEach((snapshot) => {
    snapshot.coins.slice(0, 10).forEach((coin) => {
      const key = coin.ticker;
      if (!key) return;
      const existing = counts.get(key) || { ticker: key, count: 0, rankTotal: 0 };
      existing.count += 1;
      existing.rankTotal += finiteOrNull(coin.rank) || 10;
      counts.set(key, existing);
    });
  });
  return [...counts.values()]
    .map((item) => ({ ...item, averageRank: Math.round((item.rankTotal / item.count) * 10) / 10 }))
    .sort((a, b) => b.count - a.count || a.averageRank - b.averageRank)
    .slice(0, 5);
}

function fingerprintSnapshot(createdAt, network, selectedWindow, coins) {
  const minuteBucket = new Date(createdAt).toISOString().slice(0, 16);
  return [minuteBucket, network, selectedWindow, coins.slice(0, 10).map((coin) => coin.ticker).join("|")].join(":");
}

function validIsoDate(value) {
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString() : "";
}

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeTicker(value) {
  return safeText(value, 24).toUpperCase();
}

function safeText(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function finiteOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function clampInteger(value, min, max, fallback) {
  const number = Math.round(Number(value));
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

module.exports = {
  createPulseSnapshotRepository,
  computeAccuracySummary,
};
