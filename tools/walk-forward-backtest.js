const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_BACKUPS_ROOT = path.resolve(__dirname, "../../backups");
const BACKUPS_ROOT = path.resolve(process.env.BUNDLE_BUILDER_BACKTEST_BACKUPS_DIR || DEFAULT_BACKUPS_ROOT);
const REPORT_DIR = path.resolve(process.env.BUNDLE_BUILDER_BACKTEST_REPORT_DIR || path.join(process.cwd(), "backtest-reports"));

const COINS = [
  ["AERO", "aerodrome-finance", "base/defi"],
  ["VIRTUAL", "virtual-protocol", "ai"],
  ["MORPHO", "morpho", "defi"],
  ["DEGEN", "degen-base", "meme/base"],
  ["BRETT", "based-brett", "meme/base"],
  ["ZRO", "layerzero", "infrastructure"],
  ["KAITO", "kaito", "ai/info"],
  ["ZORA", "zora", "creator"],
  ["AIXBT", "aixbt", "ai"],
  ["BIO", "bio-protocol", "science"],
  ["BNKR", "bankercoin-2", "ai/base"],
  ["AVNT", "avantis", "defi"],
  ["NOCK", "nockchain", "infrastructure"],
  ["PROS", "prosper", "defi"],
  ["FUN", "funfair", "gaming"],
  ["VVV", "venice-token", "ai/privacy"],
  ["TOSHI", "toshi", "meme/base"],
];

const BENCHMARKS = [
  ["BTC", "bitcoin"],
  ["ETH", "ethereum"],
];

const WINDOWS = [
  {
    label: "Feb -> Mar",
    trainLabel: "February",
    testLabel: "March",
    rawTrainDir: "feb-march-backtest-20260702/raw",
    rawTestDir: "feb-march-backtest-20260702/raw",
    trainStart: Date.UTC(2026, 1, 1),
    split: Date.UTC(2026, 2, 1),
    testEnd: Date.UTC(2026, 3, 1),
  },
  {
    label: "Mar -> Apr",
    trainLabel: "March",
    testLabel: "April",
    rawTrainDir: "march-april-backtest-20260702/raw",
    rawTestDir: "march-april-backtest-20260702/raw",
    trainStart: Date.UTC(2026, 2, 1),
    split: Date.UTC(2026, 3, 1),
    testEnd: Date.UTC(2026, 4, 1),
  },
  {
    label: "Apr -> May",
    trainLabel: "April",
    testLabel: "May",
    rawTrainDir: "march-april-backtest-20260702/raw",
    rawTestDir: "may-june-backtest-20260702/raw",
    trainStart: Date.UTC(2026, 3, 1),
    split: Date.UTC(2026, 4, 1),
    testEnd: Date.UTC(2026, 5, 1),
  },
  {
    label: "May -> Jun",
    trainLabel: "May",
    testLabel: "June",
    rawTrainDir: "may-june-backtest-20260702/raw",
    rawTestDir: "may-june-backtest-20260702/raw",
    trainStart: Date.UTC(2026, 4, 1),
    split: Date.UTC(2026, 5, 1),
    testEnd: Date.UTC(2026, 6, 1),
  },
];

function pct(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || start <= 0) return null;
  return ((end - start) / start) * 100;
}

function avg(values) {
  const clean = values.filter(Number.isFinite);
  return clean.length ? clean.reduce((sum, value) => sum + value, 0) / clean.length : null;
}

function round(value, digits = 2) {
  return Number.isFinite(value) ? Number(value.toFixed(digits)) : null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function corr(items, aKey, bKey) {
  const pairs = items
    .map((item) => [item[aKey], item[bKey]])
    .filter(([a, b]) => Number.isFinite(a) && Number.isFinite(b));
  if (pairs.length < 3) return null;
  const xAvg = avg(pairs.map(([x]) => x));
  const yAvg = avg(pairs.map(([, y]) => y));
  const numerator = pairs.reduce((sum, [x, y]) => sum + (x - xAvg) * (y - yAvg), 0);
  const xDenominator = Math.sqrt(pairs.reduce((sum, [x]) => sum + (x - xAvg) ** 2, 0));
  const yDenominator = Math.sqrt(pairs.reduce((sum, [, y]) => sum + (y - yAvg) ** 2, 0));
  return xDenominator && yDenominator ? numerator / (xDenominator * yDenominator) : null;
}

function rankCorr(items, predKey, actualKey) {
  const byPred = [...items].sort((a, b) => b[predKey] - a[predKey]);
  const byActual = [...items].sort((a, b) => b[actualKey] - a[actualKey]);
  const ranked = items.map((item) => ({
    ...item,
    predRankTmp: byPred.findIndex((entry) => entry.ticker === item.ticker) + 1,
    actualRankTmp: byActual.findIndex((entry) => entry.ticker === item.ticker) + 1,
  }));
  return corr(ranked, "predRankTmp", "actualRankTmp");
}

function readRaw(rawDir, ticker, id) {
  const file = path.join(BACKUPS_ROOT, rawDir, `${ticker}-${id}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const data = raw.data && typeof raw.data === "object" ? raw.data : raw;
  return Array.isArray(data.prices) && data.prices.length ? data : null;
}

function seriesBetween(raw, fromMs, toMs) {
  return (raw?.prices || [])
    .filter(([time, price]) => time >= fromMs && time < toMs && Number.isFinite(price) && price > 0)
    .map(([time, price]) => ({ time, price }));
}

function statsFor(series) {
  if (series.length < 4) return null;
  const first = series[0].price;
  const last = series.at(-1).price;
  const prices = series.map((item) => item.price);
  const returns = [];
  for (let index = 1; index < prices.length; index += 1) {
    returns.push(pct(prices[index - 1], prices[index]));
  }
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const last7Start = series[Math.max(0, series.length - 8)]?.price || first;
  const last14Start = series[Math.max(0, series.length - 15)]?.price || first;
  const upDays = returns.filter((value) => value > 0).length;
  return {
    first,
    last,
    monthlyReturn: pct(first, last),
    last7: pct(last7Start, last),
    last14: pct(last14Start, last),
    volatility: Math.sqrt(avg(returns.map((value) => value ** 2)) || 0),
    pullbackFromHigh: pct(high, last) || 0,
    reboundFromLow: pct(low, last) || 0,
    consistency: returns.length ? upDays / returns.length : 0.5,
  };
}

function themeBias(theme) {
  let score = 0;
  if (/ai/.test(theme)) score += 3.5;
  if (/defi|base/.test(theme)) score += 2.8;
  if (/infrastructure/.test(theme)) score += 1.5;
  if (/meme/.test(theme)) score -= 1.2;
  return score;
}

function highBetaTheme(theme) {
  return /ai|meme|base|creator|gaming|consumer/.test(String(theme || ""));
}

function predictFromPriorMonth(ticker, theme, stats, trainingMarketRegime) {
  const flags = [];
  let score = 0;
  score += clamp(stats.monthlyReturn, -45, 55) * 0.14;
  score += clamp(stats.last7, -24, 28) * 0.42;
  score += clamp(stats.last14, -35, 38) * 0.2;
  score += (stats.consistency - 0.48) * 18;
  score += clamp(stats.reboundFromLow, 0, 75) * 0.04;
  score += themeBias(theme);
  score += clamp(trainingMarketRegime, -18, 18) * 0.28;

  const extended = stats.monthlyReturn >= 42 || stats.last7 >= 22;
  const extendedWithoutFreshFollow = stats.monthlyReturn >= 35 && stats.last7 < 12;
  const fadingWinner = stats.monthlyReturn >= 18 && stats.last7 < 1;
  const reversalWakeup = stats.monthlyReturn <= -12 && stats.last7 >= 4 && stats.reboundFromLow >= 10;
  const coiled = Math.abs(stats.monthlyReturn) <= 10 && stats.last7 >= 2 && stats.consistency >= 0.48;
  const falling = stats.last7 <= -12 && stats.monthlyReturn < -15;
  const weakBenchmark = trainingMarketRegime <= -8;
  const riskOffBenchmark = trainingMarketRegime <= -14;
  const highBeta = highBetaTheme(theme);
  const washedOutReversal = highBeta
    && stats.monthlyReturn <= -10
    && stats.last7 >= -2
    && stats.last14 >= -8
    && stats.reboundFromLow >= 12
    && stats.pullbackFromHigh <= -18;
  const divergentReversal = highBeta
    && weakBenchmark
    && stats.monthlyReturn <= -5
    && stats.last7 >= 2
    && stats.reboundFromLow >= 10;

  if (extended) {
    score -= stats.last7 >= 18 ? 5 : 8;
    flags.push("extension risk");
  }
  if (extendedWithoutFreshFollow) {
    score -= 9;
    flags.push("prior-month run losing freshness");
  }
  if (fadingWinner) {
    score -= 5;
    flags.push("fading prior winner");
  }
  if (reversalWakeup) {
    score += 9;
    flags.push("reversal wake-up");
  }
  if (washedOutReversal) {
    score += weakBenchmark ? 13 : 9;
    flags.push("washed-out reversal");
  }
  if (divergentReversal) {
    score += 7;
    flags.push("divergent reversal");
  }
  if (coiled) {
    score += 5;
    flags.push("coiled");
  }
  if (falling) {
    score -= 7;
    flags.push("falling trend");
  }
  if (stats.volatility >= 12 && stats.consistency < 0.45) {
    score -= 5;
    flags.push("messy volatility");
  }
  if (weakBenchmark && highBeta && stats.last7 < 6 && !reversalWakeup && !coiled && !washedOutReversal && !divergentReversal) {
    score -= 7;
    flags.push("risk-off high-beta brake");
  }
  if (riskOffBenchmark && stats.monthlyReturn > 8 && stats.last7 < 8 && !washedOutReversal && !divergentReversal) {
    score -= 6;
    flags.push("regime-shift winner brake");
  }
  if (weakBenchmark && falling) {
    score -= 4;
    flags.push("benchmark-confirmed downtrend");
  }

  return {
    ticker,
    theme,
    priorReturn: round(stats.monthlyReturn),
    priorLast7: round(stats.last7),
    priorLast14: round(stats.last14),
    volatility: round(stats.volatility),
    consistency: round(stats.consistency, 3),
    predicted: round(clamp(score * 1.22, -42, 48)),
    conviction: Math.round(clamp(55 + Math.abs(score) * 1.3 - (flags.includes("messy volatility") ? 9 : 0), 20, 92)),
    flags,
  };
}

function classifyMiss(row) {
  const flags = Array.isArray(row.flags) ? row.flags : [];
  if (row.miss >= 35 && row.actual >= 40 && row.predicted <= 8 && (flags.includes("washed-out reversal") || flags.includes("divergent reversal") || flags.includes("reversal wake-up"))) return "missed explosive reversal";
  if (row.miss >= 20 && row.actual >= 25 && row.predicted <= 8) return "missed upside";
  if (row.miss <= -25 && row.predicted >= 8 && flags.includes("coiled")) return "false coiled setup";
  if (row.miss <= -20 && row.predicted >= 6 && (flags.includes("extension risk") || flags.includes("prior-month run losing freshness") || flags.includes("fading prior winner"))) return "over-chased prior winner";
  if (row.miss <= -20 && row.predicted >= 4) return "over-ranked weak follow-through";
  if (row.actual < 0 && row.predicted > 0 && flags.includes("risk-off high-beta brake")) return "risk-off brake too weak";
  if (Math.abs(row.miss) <= 10) return "close enough";
  return row.miss > 0 ? "underestimated upside" : "overestimated upside";
}

function summarizeMissTypes(rows = []) {
  const counts = new Map();
  for (const row of rows) counts.set(row.missType, (counts.get(row.missType) || 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }));
}

function runWindow(window) {
  const trainBench = {};
  const testBench = {};
  for (const [ticker, id] of BENCHMARKS) {
    trainBench[ticker] = statsFor(seriesBetween(readRaw(window.rawTrainDir, ticker, id), window.trainStart, window.split))?.monthlyReturn;
    testBench[ticker] = statsFor(seriesBetween(readRaw(window.rawTestDir, ticker, id), window.split, window.testEnd))?.monthlyReturn;
  }
  const trainingMarketRegime = avg([trainBench.BTC, trainBench.ETH].filter(Number.isFinite)) || 0;
  const rows = [];

  for (const [ticker, id, theme] of COINS) {
    const trainStats = statsFor(seriesBetween(readRaw(window.rawTrainDir, ticker, id), window.trainStart, window.split));
    const testStats = statsFor(seriesBetween(readRaw(window.rawTestDir, ticker, id), window.split, window.testEnd));
    if (!trainStats || !testStats) continue;
    const prediction = predictFromPriorMonth(ticker, theme, trainStats, trainingMarketRegime);
    rows.push({
      ...prediction,
      actual: round(testStats.monthlyReturn),
      miss: round(testStats.monthlyReturn - prediction.predicted),
    });
  }
  rows.forEach((row) => {
    row.missType = classifyMiss(row);
  });

  const predictedRanking = [...rows]
    .sort((a, b) => b.predicted - a.predicted)
    .map((row, index, all) => ({
      ...row,
      predRank: index + 1,
      actualRank: [...all].sort((a, b) => b.actual - a.actual).findIndex((item) => item.ticker === row.ticker) + 1,
    }));
  const actualRanking = [...predictedRanking].sort((a, b) => b.actual - a.actual);
  const directionCorrect = predictedRanking.filter((row) => (row.predicted >= 0 && row.actual >= 0) || (row.predicted < 0 && row.actual < 0)).length;

  return {
    label: window.label,
    method: "Walk-forward: one prior month visible, next month hidden until scoring; BTC/ETH regime uses only prior month.",
    testedCoins: predictedRanking.length,
    period: { training: window.trainLabel, test: window.testLabel },
    benchmarks: {
      BTC: { training: round(trainBench.BTC), test: round(testBench.BTC) },
      ETH: { training: round(trainBench.ETH), test: round(testBench.ETH) },
    },
    overall: {
      directionAcc: round((directionCorrect / predictedRanking.length) * 100, 1),
      avgPred: round(avg(predictedRanking.map((row) => row.predicted))),
      avgActual: round(avg(predictedRanking.map((row) => row.actual))),
      mae: round(avg(predictedRanking.map((row) => Math.abs(row.miss)))),
      top3PredAvg: round(avg(predictedRanking.slice(0, 3).map((row) => row.actual))),
      top5PredAvg: round(avg(predictedRanking.slice(0, 5).map((row) => row.actual))),
      allAvg: round(avg(predictedRanking.map((row) => row.actual))),
      predActualCorr: round(corr(predictedRanking, "predicted", "actual"), 3),
      rankCorr: round(rankCorr(predictedRanking, "predicted", "actual"), 3),
    },
    predictedRanking,
    actualRanking,
    missedUpside: predictedRanking.filter((row) => row.miss > 10).sort((a, b) => b.miss - a.miss).slice(0, 8),
    overChased: predictedRanking.filter((row) => row.miss < -10).sort((a, b) => a.miss - b.miss).slice(0, 8),
    missTypes: summarizeMissTypes(predictedRanking),
  };
}

function formatPct(value) {
  return Number.isFinite(value) ? `${round(value)}%` : "n/a";
}

function writeReports(result) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(REPORT_DIR, `walk-forward-${stamp}.json`);
  const mdPath = path.join(REPORT_DIR, `walk-forward-${stamp}.md`);
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
  fs.writeFileSync(mdPath, markdownReport(result));
  return { jsonPath, mdPath };
}

function markdownReport(result) {
  const lines = [
    "# Walk-Forward Backtest Report",
    "",
    result.caveat,
    "",
    "This report is compact by design. It saves summaries and key rows, not huge raw chart payloads.",
    "",
    "## Pooled Result",
    `- Tested calls: ${result.pooled.testedCalls}`,
    `- Direction accuracy: ${formatPct(result.pooled.directionAcc)}`,
    `- Avg projected next month: ${formatPct(result.pooled.avgPred)}`,
    `- Avg actual next month: ${formatPct(result.pooled.avgActual)}`,
    `- Avg miss size: ${formatPct(result.pooled.mae)}`,
    `- Prediction/actual correlation: ${result.pooled.predActualCorr}`,
    "",
    "## Month Windows",
  ];

  for (const window of result.windows) {
    lines.push(
      "",
      `### ${window.label}`,
      `- Tested coins: ${window.testedCoins}`,
      `- BTC ${window.period.training}: ${formatPct(window.benchmarks.BTC.training)}; BTC ${window.period.test}: ${formatPct(window.benchmarks.BTC.test)}`,
      `- ETH ${window.period.training}: ${formatPct(window.benchmarks.ETH.training)}; ETH ${window.period.test}: ${formatPct(window.benchmarks.ETH.test)}`,
      `- Direction accuracy: ${formatPct(window.overall.directionAcc)}`,
      `- Avg projected: ${formatPct(window.overall.avgPred)}`,
      `- Avg actual: ${formatPct(window.overall.avgActual)}`,
      `- Avg miss size: ${formatPct(window.overall.mae)}`,
      `- Top 5 predicted avg actual: ${formatPct(window.overall.top5PredAvg)}`,
      `- Prediction/actual correlation: ${window.overall.predActualCorr}`,
      `- Rank correlation: ${window.overall.rankCorr}`,
      `- Miss types: ${window.missTypes.map((item) => `${item.type} ${item.count}`).join("; ")}`,
      "",
      "Top predicted:",
      ...window.predictedRanking.slice(0, 5).map((row) => `- ${row.ticker}: predicted ${formatPct(row.predicted)}, actual ${formatPct(row.actual)}, miss ${formatPct(row.miss)}, type ${row.missType} (${row.flags.join(", ") || "no flags"})`),
      "",
      "Actual best:",
      ...window.actualRanking.slice(0, 5).map((row) => `- ${row.ticker}: actual ${formatPct(row.actual)}, predicted ${formatPct(row.predicted)}, prior ${formatPct(row.priorReturn)}, prior last 7d ${formatPct(row.priorLast7)}, type ${row.missType}`),
    );
  }

  lines.push(
    "",
    "## Pattern Read",
    "- The model has useful rank signal in some months, but absolute percentage targets are not reliable yet.",
    "- The biggest failure mode is regime shift: a strong prior-month runner can collapse next month, while a beaten-down coin can wake up hard.",
    "- Top-5 selection can add value even when direction accuracy is mediocre, but it needs a stronger overextension/fatigue gate.",
    "- One-month context alone is too brittle; compare 7d/14d/30d/60d context by regime before making large scoring changes.",
    "- The next live-machine improvement should keep collecting confidence, fragility, rank momentum, and regime-fit signals, then compare each signal against actual misses.",
    "",
  );
  return `${lines.join("\n")}\n`;
}

function main() {
  const windows = WINDOWS.map(runWindow);
  const pooledRows = windows.flatMap((window) => window.predictedRanking.map((row) => ({ ...row, window: window.label })));
  const directionCorrect = pooledRows.filter((row) => (row.predicted >= 0 && row.actual >= 0) || (row.predicted < 0 && row.actual < 0)).length;
  const result = {
    generatedAt: new Date().toISOString(),
    backupsRoot: BACKUPS_ROOT,
    caveat: "This is an offline historical approximation, not an exact replay of the live 5-minute pulse machine. It uses cached CoinGecko monthly windows and a machine-style score.",
    pooled: {
      testedCalls: pooledRows.length,
      directionAcc: round((directionCorrect / pooledRows.length) * 100, 1),
      avgPred: round(avg(pooledRows.map((row) => row.predicted))),
      avgActual: round(avg(pooledRows.map((row) => row.actual))),
      mae: round(avg(pooledRows.map((row) => Math.abs(row.miss)))),
      predActualCorr: round(corr(pooledRows, "predicted", "actual"), 3),
      missTypes: summarizeMissTypes(pooledRows),
    },
    windows,
  };
  const reports = writeReports(result);
  console.log(JSON.stringify({
    pooled: result.pooled,
    reports,
    windows: windows.map((window) => ({
      label: window.label,
      overall: window.overall,
      topPredicted: window.predictedRanking.slice(0, 5).map((row) => `${row.ticker} pred ${row.predicted}% actual ${row.actual}%`),
      actualBest: window.actualRanking.slice(0, 5).map((row) => `${row.ticker} actual ${row.actual}% pred ${row.predicted}%`),
    })),
  }, null, 2));
}

main();
