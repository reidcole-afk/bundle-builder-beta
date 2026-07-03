const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_BACKUPS_ROOT = path.resolve(__dirname, "../../backups");
const BACKUPS_ROOT = path.resolve(process.env.BUNDLE_BUILDER_BACKTEST_BACKUPS_DIR || DEFAULT_BACKUPS_ROOT);
const REPORT_DIR = path.resolve(process.env.BUNDLE_BUILDER_BACKTEST_REPORT_DIR || path.join(process.cwd(), "backtest-reports"));
const DAY = 24 * 60 * 60 * 1000;

const WINDOWS = [
  {
    label: "March 2026",
    rawDir: "feb-march-backtest-20260702/raw",
    start: Date.UTC(2026, 2, 1),
    end: Date.UTC(2026, 3, 1),
  },
  {
    label: "April 2026",
    rawDir: "march-april-backtest-20260702/raw",
    start: Date.UTC(2026, 3, 1),
    end: Date.UTC(2026, 4, 1),
  },
  {
    label: "June 2026",
    rawDir: "may-june-backtest-20260702/raw",
    start: Date.UTC(2026, 5, 1),
    end: Date.UTC(2026, 6, 1),
  },
];

const THEMES = new Map([
  ["AERO", "base/defi"],
  ["VIRTUAL", "ai"],
  ["MORPHO", "defi"],
  ["DEGEN", "meme/base"],
  ["BRETT", "meme/base"],
  ["ZRO", "infrastructure"],
  ["KAITO", "ai/info"],
  ["ZORA", "creator"],
  ["AIXBT", "ai"],
  ["BIO", "science"],
  ["BNKR", "ai/base"],
  ["AVNT", "defi"],
  ["NOCK", "infrastructure"],
  ["PROS", "defi"],
  ["FUN", "gaming"],
  ["VVV", "ai/privacy"],
  ["TOSHI", "meme/base"],
]);

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

function dayLabel(time) {
  return new Date(time).toISOString().slice(0, 10);
}

function highBetaTheme(theme) {
  return /ai|meme|base|creator|gaming|consumer/.test(String(theme || ""));
}

function readRawFile(file) {
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const data = raw.data && typeof raw.data === "object" ? raw.data : raw;
  return Array.isArray(data.prices) && data.prices.length ? data : null;
}

function loadWindowRaw(window) {
  const dir = path.join(BACKUPS_ROOT, window.rawDir);
  const rawByTicker = new Map();
  if (!fs.existsSync(dir)) return rawByTicker;
  for (const name of fs.readdirSync(dir).filter((file) => file.endsWith(".json"))) {
    const ticker = name.split("-")[0].toUpperCase();
    const raw = readRawFile(path.join(dir, name));
    if (raw) rawByTicker.set(ticker, { ticker, theme: THEMES.get(ticker) || "other", raw });
  }
  return rawByTicker;
}

function priceAtOrBefore(raw, time) {
  const rows = raw?.prices || [];
  let found = null;
  for (const [rowTime, price] of rows) {
    if (rowTime <= time && Number.isFinite(price) && price > 0) found = { time: rowTime, price };
    if (rowTime > time) break;
  }
  return found;
}

function seriesBetween(raw, from, to) {
  return (raw?.prices || [])
    .filter(([time, price]) => time >= from && time <= to && Number.isFinite(price) && price > 0)
    .map(([time, price]) => ({ time, price }));
}

function trailingStats(raw, asOf) {
  const now = priceAtOrBefore(raw, asOf);
  if (!now) return null;
  const p1 = priceAtOrBefore(raw, asOf - DAY)?.price;
  const p3 = priceAtOrBefore(raw, asOf - 3 * DAY)?.price;
  const p7 = priceAtOrBefore(raw, asOf - 7 * DAY)?.price;
  const p14 = priceAtOrBefore(raw, asOf - 14 * DAY)?.price;
  const p30 = priceAtOrBefore(raw, asOf - 30 * DAY)?.price;
  const trail30 = seriesBetween(raw, asOf - 30 * DAY, asOf);
  const trail14 = seriesBetween(raw, asOf - 14 * DAY, asOf);
  if (trail14.length < 4 || trail30.length < 8) return null;
  const prices30 = trail30.map((row) => row.price);
  const low30 = Math.min(...prices30);
  const high30 = Math.max(...prices30);
  const returns = [];
  for (let index = 1; index < trail14.length; index += 1) {
    returns.push(pct(trail14[index - 1].price, trail14[index].price));
  }
  return {
    price: now.price,
    r1: pct(p1, now.price),
    r3: pct(p3, now.price),
    r7: pct(p7, now.price),
    r14: pct(p14, now.price),
    r30: pct(p30, now.price),
    rebound30: pct(low30, now.price),
    pullback30: pct(high30, now.price),
    consistency14: returns.length ? returns.filter((value) => value > 0).length / returns.length : 0.5,
  };
}

function forwardReturn(raw, asOf, days) {
  const start = priceAtOrBefore(raw, asOf)?.price;
  const end = priceAtOrBefore(raw, asOf + days * DAY)?.price;
  return pct(start, end);
}

function windowReturn(raw, start, end) {
  const startPrice = priceAtOrBefore(raw, start)?.price;
  const endPrice = priceAtOrBefore(raw, end - DAY)?.price || priceAtOrBefore(raw, end)?.price;
  return pct(startPrice, endPrice);
}

function wakeScore({ ticker, theme, stats, btc, eth }) {
  const highBeta = highBetaTheme(theme);
  const benchmark7 = avg([btc?.r7, eth?.r7].filter(Number.isFinite)) || 0;
  const benchmark30 = avg([btc?.r30, eth?.r30].filter(Number.isFinite)) || 0;
  const relative7 = (stats.r7 || 0) - benchmark7;
  const relative3 = (stats.r3 || 0) - (avg([btc?.r3, eth?.r3].filter(Number.isFinite)) || 0);
  const washedOut = (stats.r30 || 0) <= -8 || stats.pullback30 <= -20;
  const stoppedFalling = (stats.r3 || 0) >= -1.5 && (stats.r7 || 0) >= -6;
  const upwardDivergence = relative3 >= 3 || relative7 >= 5;
  const rebound = (stats.rebound30 || 0) >= 10;
  const freshPush = (stats.r1 || 0) >= 2 || (stats.r3 || 0) >= 5 || (stats.r7 || 0) >= 8;
  const benchmarkWeak = benchmark30 <= -6 || benchmark7 <= -3;
  const flags = [];
  let score = 0;

  score += clamp(relative7, -20, 35) * 0.8;
  score += clamp(relative3, -12, 24) * 0.9;
  score += clamp(stats.rebound30 || 0, 0, 80) * 0.18;
  score += clamp(stats.r7 || 0, -20, 35) * 0.35;
  score += (stats.consistency14 - 0.45) * 14;

  if (highBeta) {
    score += 4;
    flags.push("high-beta lane");
  }
  if (washedOut && stoppedFalling) {
    score += 10;
    flags.push("washed out but stabilizing");
  }
  if (upwardDivergence) {
    score += 9;
    flags.push("relative strength flip");
  }
  if (benchmarkWeak && upwardDivergence) {
    score += 6;
    flags.push("green against weak market");
  }
  if (rebound && freshPush) {
    score += 8;
    flags.push("rebound wake-up");
  }
  if ((stats.r30 || 0) > 40 && (stats.r7 || 0) < 5) {
    score -= 8;
    flags.push("old move losing freshness");
  }
  if (!highBeta && !upwardDivergence && !freshPush) score -= 4;

  return {
    score: round(clamp(score, -25, 100)),
    flags,
    relative7: round(relative7),
  };
}

function confirmedWakeScore(row, priorRows = []) {
  const recent = priorRows.slice(-3);
  const prior = priorRows.slice(Math.max(0, priorRows.length - 10), Math.max(0, priorRows.length - 3));
  const persistentWakeCount = recent.filter((priorRow) => (priorRow.wakeScore || 0) >= 55).length;
  const recentAvgWake = avg(recent.map((priorRow) => priorRow.wakeScore));
  const priorAvgWake = avg(prior.map((priorRow) => priorRow.wakeScore));
  const recentAvgRank = avg(recent.map((priorRow) => priorRow.baseRank));
  const priorAvgRank = avg(prior.map((priorRow) => priorRow.baseRank));
  const strengthening = Number.isFinite(recentAvgWake) && Number.isFinite(priorAvgWake) ? recentAvgWake - priorAvgWake : 0;
  const rankImproving = Number.isFinite(recentAvgRank) && Number.isFinite(priorAvgRank) ? priorAvgRank - recentAvgRank : 0;
  const earlyImpulse = (row.r3 || 0) >= 5 && (row.r7 || 0) <= 70 && (row.r1 || 0) >= -2;
  const persistent = persistentWakeCount >= 2;
  const relativeStrength = (row.relative7 || 0) >= 8;
  const notTooLate = (row.r7 || 0) <= 75 || persistent;
  const stretchedAndFading = (row.r30 || 0) >= 45 && (row.r7 || 0) < 6 && !persistent;
  const oneDaySpike = (row.r1 || 0) >= 14 && (row.r3 || 0) < 5 && !persistent;
  const flags = [];
  let score = (row.wakeScore || 0) * 0.68;

  if (persistent) {
    score += 13;
    flags.push("persistent wake-up");
  }
  if (strengthening >= 6) {
    score += 7;
    flags.push("wake strengthening");
  }
  if (rankImproving >= 2) {
    score += 5;
    flags.push("rank improving");
  }
  if (earlyImpulse && relativeStrength && notTooLate) {
    score += 9;
    flags.push("confirmed impulse");
  }
  if ((row.r14 || 0) < 0 && (row.r3 || 0) >= 4 && relativeStrength) {
    score += 5;
    flags.push("reversal from weakness");
  }
  if (stretchedAndFading) {
    score -= 12;
    flags.push("stretched without persistence");
  }
  if (oneDaySpike) {
    score -= 10;
    flags.push("one-day spike");
  }
  if ((row.r7 || 0) >= 95 && !persistent) {
    score -= 12;
    flags.push("unconfirmed extreme move");
  }

  const confirmedScore = round(clamp(score, -25, 100));
  return {
    confirmedWakeScore: confirmedScore,
    confirmedFlags: flags,
  };
}

function rankWindowDay(rawByTicker, asOf, history = new Map()) {
  const btcStats = trailingStats(rawByTicker.get("BTC")?.raw, asOf);
  const ethStats = trailingStats(rawByTicker.get("ETH")?.raw, asOf);
  const baseRows = [];
  for (const item of rawByTicker.values()) {
    if (item.ticker === "BTC" || item.ticker === "ETH") continue;
    const stats = trailingStats(item.raw, asOf);
    if (!stats) continue;
    const wake = wakeScore({ ticker: item.ticker, theme: item.theme, stats, btc: btcStats, eth: ethStats });
    baseRows.push({
      date: dayLabel(asOf),
      ticker: item.ticker,
      theme: item.theme,
      wakeScore: wake.score,
      flags: wake.flags,
      r1: round(stats.r1),
      r3: round(stats.r3),
      r7: round(stats.r7),
      r14: round(stats.r14),
      r30: round(stats.r30),
      rebound30: round(stats.rebound30),
      relative7: wake.relative7,
      next7d: round(forwardReturn(item.raw, asOf, 7)),
    });
  }
  const withBaseRank = baseRows
    .sort((a, b) => b.wakeScore - a.wakeScore)
    .map((row, index) => ({ ...row, baseRank: index + 1 }));
  return withBaseRank
    .map((row) => {
      const confirmed = confirmedWakeScore(row, history.get(row.ticker) || []);
      return {
        ...row,
        ...confirmed,
        flags: [...row.flags, ...confirmed.confirmedFlags].slice(0, 8),
      };
    })
    .sort((a, b) => b.confirmedWakeScore - a.confirmedWakeScore)
    .map((row, index) => ({ ...row, rank: index + 1 }));
}

function compact(row) {
  if (!row) return null;
  return {
    date: row.date,
    rank: row.rank,
    wakeScore: row.wakeScore,
    confirmedWakeScore: row.confirmedWakeScore,
    r7: row.r7,
    r30: row.r30,
    rebound30: row.rebound30,
    relative7: row.relative7,
    next7d: row.next7d,
    flags: row.flags,
  };
}

function analyzeWindow(window) {
  const rawByTicker = loadWindowRaw(window);
  const monthly = [...rawByTicker.values()]
    .filter((item) => item.ticker !== "BTC" && item.ticker !== "ETH")
    .map((item) => ({
      ticker: item.ticker,
      theme: item.theme,
      actualReturn: round(windowReturn(item.raw, window.start, window.end)),
    }))
    .filter((row) => Number.isFinite(row.actualReturn))
    .sort((a, b) => b.actualReturn - a.actualReturn);

  const daily = [];
  const history = new Map();
  for (let asOf = window.start; asOf < window.end; asOf += DAY) {
    const ranked = rankWindowDay(rawByTicker, asOf, history);
    daily.push({ date: dayLabel(asOf), ranked });
    for (const row of ranked) {
      if (!history.has(row.ticker)) history.set(row.ticker, []);
      history.get(row.ticker).push(row);
    }
  }

  const winners = monthly.slice(0, 5).map((winner, winnerIndex) => {
    const rows = daily.map((day) => day.ranked.find((row) => row.ticker === winner.ticker)).filter(Boolean);
    const firstTop10 = rows.find((row) => row.rank <= 10);
    const firstTop5 = rows.find((row) => row.rank <= 5);
    const firstTop3 = rows.find((row) => row.rank <= 3);
    const bestWake = [...rows].sort((a, b) => b.wakeScore - a.wakeScore)[0] || null;
    return {
      monthWinnerRank: winnerIndex + 1,
      ticker: winner.ticker,
      theme: winner.theme,
      actualReturn: winner.actualReturn,
      firstTop10: compact(firstTop10),
      firstTop5: compact(firstTop5),
      firstTop3: compact(firstTop3),
      bestWake: compact(bestWake),
    };
  });

  const top5Daily = daily.flatMap((day) => day.ranked.filter((row) => row.rank <= 5 && Number.isFinite(row.next7d)));
  return {
    label: window.label,
    start: dayLabel(window.start),
    end: dayLabel(window.end - DAY),
    coinsTested: monthly.length,
    topMonthlyPerformers: monthly.slice(0, 10),
    winnerDetection: winners,
    dailyTop5: {
      observations: top5Daily.length,
      avgNext7d: round(avg(top5Daily.map((row) => row.next7d))),
      hitRateNext7dOver10: round((top5Daily.filter((row) => row.next7d > 10).length / Math.max(1, top5Daily.length)) * 100, 1),
    },
  };
}

function formatSignal(signal) {
  if (!signal) return "not caught";
  return `${signal.date} #${signal.rank}, wake ${signal.wakeScore}, confirmed ${signal.confirmedWakeScore}, next7 ${signal.next7d}% (${signal.flags.join(", ") || "no flags"})`;
}

function markdownReport(result) {
  const lines = [
    "# Best Performer Catcher Backtest",
    "",
    "This replay checks each available historical month, ranks coins each day using trailing context only, then asks when the eventual monthly winners first appeared near the top.",
    "",
    "## Summary",
    `- Windows tested: ${result.windows.length}`,
    `- Generated: ${result.generatedAt}`,
  ];
  for (const window of result.windows) {
    lines.push(
      "",
      `## ${window.label}`,
      `- Period: ${window.start} to ${window.end}`,
      `- Coins tested: ${window.coinsTested}`,
      `- Daily top-5 avg next 7d: ${window.dailyTop5.avgNext7d}%`,
      `- Daily top-5 hit rate next 7d > 10%: ${window.dailyTop5.hitRateNext7dOver10}%`,
      "",
      "Top monthly performers:",
      ...window.topMonthlyPerformers.slice(0, 5).map((row, index) => `- #${index + 1} ${row.ticker}: ${row.actualReturn}%`),
      "",
      "Winner detection:",
      ...window.winnerDetection.map((row) => [
        `- ${row.ticker} (${row.actualReturn}% month):`,
        `  top10 ${formatSignal(row.firstTop10)}; top5 ${formatSignal(row.firstTop5)}; top3 ${formatSignal(row.firstTop3)}; best ${formatSignal(row.bestWake)}`,
      ].join("\n")),
    );
  }
  return `${lines.join("\n")}\n`;
}

function writeReports(result) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(REPORT_DIR, `best-performer-catcher-${stamp}.json`);
  const mdPath = path.join(REPORT_DIR, `best-performer-catcher-${stamp}.md`);
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
  fs.writeFileSync(mdPath, markdownReport(result));
  return { jsonPath, mdPath };
}

function main() {
  const result = {
    generatedAt: new Date().toISOString(),
    method: "Daily rolling wake-up replay against eventual monthly winners. Uses only data available as of each replay day.",
    windows: WINDOWS.map(analyzeWindow),
  };
  const reports = writeReports(result);
  console.log(JSON.stringify({
    windows: result.windows.map((window) => ({
      label: window.label,
      dailyTop5: window.dailyTop5,
      winnerDetection: window.winnerDetection,
    })),
    reports,
  }, null, 2));
}

main();
