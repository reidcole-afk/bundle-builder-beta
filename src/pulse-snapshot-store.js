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
    forecastPaths: sanitizeForecastPaths(input.forecastPaths),
    action: safeText(input.action, 40),
    setupLabel: safeText(input.setupLabel, 80),
    edgeLabel: safeText(input.edgeLabel, 80),
    source: safeText(input.source, 60),
  };
}

function sanitizeForecastPaths(input = {}) {
  return {
    next24h: sanitizePath(input.next24h),
    next7d: sanitizePath(input.next7d),
    next30d: sanitizePath(input.next30d || input.next1mo),
  };
}

function sanitizePath(input = []) {
  if (!Array.isArray(input)) return [];
  return input
    .slice(0, 80)
    .map((value) => roundTo(value, 4))
    .filter((value) => Number.isFinite(value));
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
    deepDive24h: deepDiveForHorizon(normalized, "24h", 24 * 60 * 60 * 1000, "projected24hChange"),
    pathAccuracy: [
      pathAccuracyForHorizon(normalized, "Next 24h", 24 * 60 * 60 * 1000, "next24h"),
      pathAccuracyForHorizon(normalized, "Next 7d", 7 * 24 * 60 * 60 * 1000, "next7d"),
      pathAccuracyForHorizon(normalized, "Next 1M", 30 * 24 * 60 * 60 * 1000, "next30d"),
    ],
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

function deepDiveForHorizon(snapshots, label, horizonMs, projectedKey) {
  const outcomes = [];
  snapshots.forEach((snapshot) => {
    const startTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(startTime)) return;
    snapshot.coins.forEach((coin) => {
      const startPrice = finiteOrNull(coin.priceUsd);
      const projectedChange = finiteOrNull(coin[projectedKey]);
      if (!startPrice || projectedChange === null) return;
      const futureCoin = findFutureCoin(snapshots, coin, startTime + horizonMs);
      if (!futureCoin) return;
      const endPrice = finiteOrNull(futureCoin.priceUsd);
      if (!endPrice) return;
      const actualChange = ((endPrice - startPrice) / startPrice) * 100;
      outcomes.push({
        ticker: coin.ticker,
        rank: coin.rank,
        startAt: snapshot.createdAt,
        startPrice,
        endPrice,
        projectedChange: roundTo(projectedChange, 2),
        actualChange: roundTo(actualChange, 2),
        error: roundTo(actualChange - projectedChange, 2),
        absoluteError: roundTo(Math.abs(actualChange - projectedChange), 2),
        directionCorrect: directionMatches(projectedChange, actualChange),
        bullishScore: coin.bullishScore,
        volume24h: coin.volume24h,
        liquidityUsd: coin.liquidityUsd,
        action: coin.action,
        setupLabel: coin.setupLabel,
        edgeLabel: coin.edgeLabel,
      });
    });
  });

  const checked = outcomes.length;
  const missedUpside = outcomes.filter((item) => item.actualChange >= 4 && item.projectedChange < item.actualChange / 2);
  const falseBearish = outcomes.filter((item) => item.projectedChange < -0.25 && item.actualChange > 2);
  return {
    label,
    checked,
    directionAccuracy: checked ? Math.round((outcomes.filter((item) => item.directionCorrect).length / checked) * 100) : null,
    averageProjectedChange: roundTo(average(outcomes, (item) => item.projectedChange), 2),
    averageActualChange: roundTo(average(outcomes, (item) => item.actualChange), 2),
    averageError: roundTo(average(outcomes, (item) => item.error), 2),
    meanAbsoluteError: roundTo(average(outcomes, (item) => item.absoluteError), 2),
    missedUpsideCount: missedUpside.length,
    falseBearishCount: falseBearish.length,
    byTicker: summarizeOutcomes(outcomes, "ticker"),
    byAction: summarizeOutcomes(outcomes, "action"),
    byRank: summarizeOutcomes(outcomes, (item) => item.rank ? `#${item.rank}` : "unranked"),
    biggestMisses: outcomes.slice().sort((a, b) => b.absoluteError - a.absoluteError).slice(0, 5),
    bestCalls: outcomes.slice().sort((a, b) => a.absoluteError - b.absoluteError).slice(0, 5),
    lessons: machineLessons(outcomes, missedUpside, falseBearish),
  };
}

function summarizeOutcomes(outcomes, keyForItem) {
  const groups = new Map();
  outcomes.forEach((item) => {
    const key = typeof keyForItem === "function" ? keyForItem(item) : item[keyForItem];
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  return [...groups.entries()].map(([key, items]) => ({
    key,
    count: items.length,
    directionAccuracy: Math.round((items.filter((item) => item.directionCorrect).length / items.length) * 100),
    averageProjectedChange: roundTo(average(items, (item) => item.projectedChange), 2),
    averageActualChange: roundTo(average(items, (item) => item.actualChange), 2),
    meanAbsoluteError: roundTo(average(items, (item) => item.absoluteError), 2),
  })).sort((a, b) => b.count - a.count || b.meanAbsoluteError - a.meanAbsoluteError).slice(0, 8);
}

function pathAccuracyForHorizon(snapshots, label, horizonMs, pathKey) {
  const outcomes = [];
  snapshots.forEach((snapshot) => {
    const startTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(startTime)) return;
    snapshot.coins.forEach((coin) => {
      const forecastPath = Array.isArray(coin.forecastPaths?.[pathKey]) ? coin.forecastPaths[pathKey] : [];
      if (forecastPath.length < 4) return;
      const actualPath = actualPathForCoin(snapshots, coin, startTime, startTime + horizonMs, forecastPath.length);
      if (actualPath.length < 4) return;
      const forecast = normalizePathShape(forecastPath);
      const actual = normalizePathShape(actualPath);
      if (forecast.length < 4 || actual.length < 4) return;
      const shapeError = meanAbsolutePathError(forecast, actual);
      const directionAgreement = pathDirectionAgreement(forecast, actual);
      const endpointError = Math.abs((forecast.at(-1) || 0) - (actual.at(-1) || 0));
      outcomes.push({
        ticker: coin.ticker,
        rank: coin.rank,
        startAt: snapshot.createdAt,
        shapeScore: Math.round(clamp(100 - shapeError * 100, 0, 100)),
        directionAgreement: Math.round(directionAgreement * 100),
        endpointError: roundTo(endpointError * 100, 1),
      });
    });
  });
  const weakest = outcomes.slice().sort((a, b) => a.shapeScore - b.shapeScore).slice(0, 5);
  const strongest = outcomes.slice().sort((a, b) => b.shapeScore - a.shapeScore).slice(0, 5);
  return {
    label,
    checked: outcomes.length,
    averageShapeScore: outcomes.length ? Math.round(average(outcomes, (item) => item.shapeScore)) : null,
    averageDirectionAgreement: outcomes.length ? Math.round(average(outcomes, (item) => item.directionAgreement)) : null,
    averageEndpointError: outcomes.length ? roundTo(average(outcomes, (item) => item.endpointError), 1) : null,
    weakest,
    strongest,
  };
}

function actualPathForCoin(snapshots, coin, startTime, endTime, targetLength) {
  const points = [];
  snapshots.forEach((snapshot) => {
    const snapshotTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(snapshotTime) || snapshotTime < startTime || snapshotTime > endTime) return;
    const match = snapshot.coins.find((futureCoin) => futureCoin.ticker === coin.ticker
      && (!coin.network || !futureCoin.network || futureCoin.network === coin.network));
    const price = finiteOrNull(match?.priceUsd);
    if (price) points.push({ time: snapshotTime, price });
  });
  const uniquePoints = [];
  points.sort((a, b) => a.time - b.time).forEach((point) => {
    if (!uniquePoints.length || uniquePoints.at(-1).time !== point.time) uniquePoints.push(point);
  });
  return resampleValues(uniquePoints.map((point) => point.price), Math.min(Math.max(targetLength, 8), 80));
}

function normalizePathShape(values = []) {
  const series = values.map(finiteOrNull).filter((value) => value !== null);
  if (series.length < 2) return [];
  const start = series[0];
  if (!start) return [];
  return series.map((value) => roundTo((value - start) / start, 5));
}

function meanAbsolutePathError(a = [], b = []) {
  const length = Math.min(a.length, b.length);
  if (!length) return 0;
  let total = 0;
  for (let index = 0; index < length; index += 1) {
    total += Math.abs((a[index] || 0) - (b[index] || 0));
  }
  return total / length;
}

function pathDirectionAgreement(a = [], b = []) {
  const length = Math.min(a.length, b.length);
  if (length < 2) return 0;
  let checks = 0;
  let matches = 0;
  for (let index = 1; index < length; index += 1) {
    const da = (a[index] || 0) - (a[index - 1] || 0);
    const db = (b[index] || 0) - (b[index - 1] || 0);
    if (Math.abs(da) < 0.002 && Math.abs(db) < 0.002) continue;
    checks += 1;
    if ((da >= 0 && db >= 0) || (da < 0 && db < 0)) matches += 1;
  }
  return checks ? matches / checks : 0;
}

function resampleValues(values = [], targetLength = 32) {
  const series = values.map(finiteOrNull).filter((value) => value !== null);
  if (series.length <= targetLength) return series;
  if (targetLength <= 2) return [series[0], series.at(-1)];
  const output = [];
  for (let index = 0; index < targetLength; index += 1) {
    const position = (index / (targetLength - 1)) * (series.length - 1);
    const left = Math.floor(position);
    const right = Math.min(series.length - 1, Math.ceil(position));
    const blend = position - left;
    output.push(roundTo((series[left] || 0) * (1 - blend) + (series[right] || 0) * blend, 8));
  }
  return output;
}

function machineLessons(outcomes, missedUpside, falseBearish) {
  if (!outcomes.length) return ["Collecting enough 24h outcomes to compare projected move size against actual move size."];
  const lessons = [];
  const underPrediction = average(outcomes, (item) => item.error);
  if (underPrediction > 3) {
    lessons.push("The machine is underestimating high-beta upside; projected percentages need to become bolder when volume and market-wide momentum expand together.");
  } else if (underPrediction < -3) {
    lessons.push("The machine is overestimating upside; projected percentages need tighter checks before calling continuation.");
  }
  if (falseBearish.length) {
    const tickers = unique(falseBearish.map((item) => item.ticker)).slice(0, 4).join(", ");
    lessons.push(`False bearish calls showed up in ${tickers}; bearish labels should be softened when a coin has enough liquidity and is already ranking near the top.`);
  }
  if (missedUpside.length) {
    const tickers = unique(missedUpside.map((item) => item.ticker)).slice(0, 4).join(", ");
    lessons.push(`Missed upside showed up in ${tickers}; the machine should separate “balanced” from “quiet but coiled” instead of flattening those reads.`);
  }
  const worstTicker = summarizeOutcomes(outcomes, "ticker")[0];
  if (worstTicker) {
    lessons.push(`${worstTicker.key} currently has the largest average miss size, so its ranking pattern deserves review before changing weights globally.`);
  }
  return lessons.slice(0, 4);
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

function average(items, valueForItem) {
  if (!items.length) return 0;
  return items.reduce((sum, item) => sum + (finiteOrNull(valueForItem(item)) || 0), 0) / items.length;
}

function roundTo(value, digits = 2) {
  const number = finiteOrNull(value);
  if (number === null) return 0;
  const factor = 10 ** digits;
  return Math.round(number * factor) / factor;
}

function clamp(value, min, max) {
  const number = finiteOrNull(value);
  if (number === null) return min;
  return Math.min(max, Math.max(min, number));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
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
