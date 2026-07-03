const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_BACKUPS_ROOT = path.resolve(__dirname, "../../backups");
const BACKUPS_ROOT = path.resolve(process.env.BUNDLE_BUILDER_BACKTEST_BACKUPS_DIR || DEFAULT_BACKUPS_ROOT);
const REPORT_DIR = path.resolve(process.env.BUNDLE_BUILDER_BACKTEST_REPORT_DIR || path.join(process.cwd(), "backtest-reports"));
const RAW_DIR = "may-june-backtest-20260702/raw";

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

const TARGETS = new Set(["FUN", "DEGEN"]);
const START = Date.UTC(2026, 5, 1);
const END = Date.UTC(2026, 6, 1);
const DAY = 24 * 60 * 60 * 1000;

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

function highBetaTheme(theme) {
  return /ai|meme|base|creator|gaming|consumer/.test(String(theme || ""));
}

function readRaw(ticker, id) {
  const candidates = [
    path.join(BACKUPS_ROOT, RAW_DIR, `${ticker}-${id}.json`),
    ...fs.existsSync(path.join(BACKUPS_ROOT, RAW_DIR))
      ? fs.readdirSync(path.join(BACKUPS_ROOT, RAW_DIR))
        .filter((name) => name.startsWith(`${ticker}-`) && name.endsWith(".json"))
        .map((name) => path.join(BACKUPS_ROOT, RAW_DIR, name))
      : [],
  ];
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  if (!file) return null;
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const data = raw.data && typeof raw.data === "object" ? raw.data : raw;
  return Array.isArray(data.prices) && data.prices.length ? data : null;
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
    volatility14: Math.sqrt(avg(returns.map((value) => value ** 2)) || 0),
    consistency14: returns.length ? returns.filter((value) => value > 0).length / returns.length : 0.5,
  };
}

function forwardReturn(raw, asOf, days) {
  const start = priceAtOrBefore(raw, asOf)?.price;
  const end = priceAtOrBefore(raw, asOf + days * DAY)?.price;
  return pct(start, end);
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
    relative3: round(relative3),
  };
}

function runReplay() {
  const rawByTicker = new Map();
  for (const [ticker, id, theme] of COINS) {
    const raw = readRaw(ticker, id);
    if (raw) rawByTicker.set(ticker, { ticker, id, theme, raw });
  }
  const btc = readRaw("BTC", "bitcoin");
  const eth = readRaw("ETH", "ethereum");
  const days = [];

  for (let asOf = START; asOf < END; asOf += DAY) {
    const btcStats = trailingStats(btc, asOf);
    const ethStats = trailingStats(eth, asOf);
    const rows = [];
    for (const item of rawByTicker.values()) {
      const stats = trailingStats(item.raw, asOf);
      if (!stats) continue;
      const wake = wakeScore({ ticker: item.ticker, theme: item.theme, stats, btc: btcStats, eth: ethStats });
      rows.push({
        date: new Date(asOf).toISOString().slice(0, 10),
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
        pullback30: round(stats.pullback30),
        relative3: wake.relative3,
        relative7: wake.relative7,
        next1d: round(forwardReturn(item.raw, asOf, 1)),
        next3d: round(forwardReturn(item.raw, asOf, 3)),
        next7d: round(forwardReturn(item.raw, asOf, 7)),
      });
    }
    const ranked = rows
      .sort((a, b) => b.wakeScore - a.wakeScore)
      .map((row, index) => ({ ...row, rank: index + 1 }));
    days.push({
      date: new Date(asOf).toISOString().slice(0, 10),
      btc: { r7: round(btcStats?.r7), r30: round(btcStats?.r30) },
      eth: { r7: round(ethStats?.r7), r30: round(ethStats?.r30) },
      ranked,
    });
  }

  return summarize(days);
}

function summarize(days) {
  const targetSummaries = [...TARGETS].map((ticker) => {
    const rows = days.map((day) => day.ranked.find((row) => row.ticker === ticker)).filter(Boolean);
    const firstTop10 = rows.find((row) => row.rank <= 10) || null;
    const firstTop5 = rows.find((row) => row.rank <= 5) || null;
    const firstTop3 = rows.find((row) => row.rank <= 3) || null;
    const bestWake = [...rows].sort((a, b) => b.wakeScore - a.wakeScore)[0] || null;
    const bestForward7 = [...rows].filter((row) => Number.isFinite(row.next7d)).sort((a, b) => b.next7d - a.next7d)[0] || null;
    return {
      ticker,
      firstTop10: compactSignal(firstTop10),
      firstTop5: compactSignal(firstTop5),
      firstTop3: compactSignal(firstTop3),
      bestWake: compactSignal(bestWake),
      bestForward7: compactSignal(bestForward7),
    };
  });

  const detectionRows = days.flatMap((day) => day.ranked.filter((row) => row.rank <= 5 && Number.isFinite(row.next7d)));
  const top5AvgNext7d = round(avg(detectionRows.map((row) => row.next7d)));
  const top5HitRate = round((detectionRows.filter((row) => row.next7d > 10).length / Math.max(1, detectionRows.length)) * 100, 1);
  return {
    generatedAt: new Date().toISOString(),
    method: "Rolling daily wake-up replay. Each day uses trailing 1d/3d/7d/14d/30d context only, then checks forward 1d/3d/7d returns.",
    period: "June 2026",
    daysTested: days.length,
    targets: targetSummaries,
    top5Summary: {
      observations: detectionRows.length,
      avgNext7d: top5AvgNext7d,
      hitRateNext7dOver10: top5HitRate,
    },
    daily: days.map((day) => ({
      date: day.date,
      btc: day.btc,
      eth: day.eth,
      top5: day.ranked.slice(0, 5).map(compactSignal),
      targets: day.ranked.filter((row) => TARGETS.has(row.ticker)).map(compactSignal),
    })),
  };
}

function compactSignal(row) {
  if (!row) return null;
  return {
    date: row.date,
    ticker: row.ticker,
    rank: row.rank,
    wakeScore: row.wakeScore,
    r3: row.r3,
    r7: row.r7,
    r30: row.r30,
    rebound30: row.rebound30,
    relative7: row.relative7,
    next3d: row.next3d,
    next7d: row.next7d,
    flags: row.flags,
  };
}

function markdownReport(result) {
  const lines = [
    "# Rolling Wake-Up Backtest",
    "",
    result.method,
    "",
    "## Summary",
    `- Period: ${result.period}`,
    `- Days tested: ${result.daysTested}`,
    `- Top-5 observations: ${result.top5Summary.observations}`,
    `- Top-5 avg next 7d: ${result.top5Summary.avgNext7d}%`,
    `- Top-5 hit rate next 7d > 10%: ${result.top5Summary.hitRateNext7dOver10}%`,
    "",
    "## Target Detection",
  ];
  for (const target of result.targets) {
    lines.push(
      "",
      `### ${target.ticker}`,
      `- First top 10: ${formatSignal(target.firstTop10)}`,
      `- First top 5: ${formatSignal(target.firstTop5)}`,
      `- First top 3: ${formatSignal(target.firstTop3)}`,
      `- Best wake score: ${formatSignal(target.bestWake)}`,
      `- Best future 7d move: ${formatSignal(target.bestForward7)}`,
    );
  }
  lines.push("", "## Daily Top 5");
  for (const day of result.daily) {
    lines.push(
      "",
      `### ${day.date}`,
      `- BTC 7d/30d: ${day.btc.r7}% / ${day.btc.r30}%; ETH 7d/30d: ${day.eth.r7}% / ${day.eth.r30}%`,
      ...day.top5.map((row) => `- #${row.rank} ${row.ticker}: wake ${row.wakeScore}, 7d ${row.r7}%, rel7 ${row.relative7}%, next7 ${row.next7d}% (${row.flags.join(", ") || "no flags"})`),
    );
  }
  return `${lines.join("\n")}\n`;
}

function formatSignal(row) {
  if (!row) return "not detected";
  return `${row.date} #${row.rank}, wake ${row.wakeScore}, 7d ${row.r7}%, rel7 ${row.relative7}%, next7 ${row.next7d}% (${row.flags.join(", ") || "no flags"})`;
}

function writeReports(result) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(REPORT_DIR, `rolling-wakeup-${stamp}.json`);
  const mdPath = path.join(REPORT_DIR, `rolling-wakeup-${stamp}.md`);
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
  fs.writeFileSync(mdPath, markdownReport(result));
  return { jsonPath, mdPath };
}

function main() {
  const result = runReplay();
  const reports = writeReports(result);
  console.log(JSON.stringify({
    targets: result.targets,
    top5Summary: result.top5Summary,
    reports,
  }, null, 2));
}

main();
