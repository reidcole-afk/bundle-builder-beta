const { URL } = require("node:url");

const DEFAULT_TIMEOUT_MS = Number(process.env.BUNDLE_BUILDER_NEWS_TIMEOUT_MS || 5000);
const MAX_ARTICLES = Number(process.env.BUNDLE_BUILDER_NEWS_MAX_ARTICLES || 8);

const officialSources = {
  AERO: { x: "AerodromeFi", github: [] },
  MORPHO: { x: "MorphoLabs", github: ["morpho-org/morpho-blue"] },
  VIRTUAL: { x: "virtuals_io", github: [] },
  DEGEN: { x: "degentokenbase", github: [] },
  BRETT: { x: "BasedBrett", github: [] },
  ZRO: { x: "LayerZero_Core", github: ["LayerZero-Labs/LayerZero-v2"] },
  KAITO: { x: "KaitoAI", github: [] },
  ZORA: { x: "ourZORA", github: ["ourzora/zora-protocol"] },
};

const sourceWeights = {
  official: 1,
  github: 0.96,
  coingecko: 0.88,
  lunarcrush: 0.82,
  x: 0.72,
  gdelt: 0.64,
};

async function collectNewsIntelligence(input, options = {}) {
  const context = normalizeInput(input);
  const adapters = [
    coinGeckoNewsAdapter,
    lunarCrushAdapter,
    xRecentSearchAdapter,
    githubReleaseAdapter,
    gdeltAdapter,
  ];
  const settled = await Promise.all(adapters.map((adapter) => runAdapter(adapter, context, options)));
  const statuses = settled.map((entry) => entry.status);
  const evidence = settled.flatMap((entry) => entry.items);
  const relevant = evidence
    .map((item) => scoreEvidence(item, context))
    .filter((item) => item.identityScore >= 0.55 && item.relevanceScore > 0)
    .sort(compareEvidence);
  const deduped = deduplicateEvidence(relevant).slice(0, MAX_ARTICLES);
  const corroboration = buildCorroboration(deduped);
  const confidence = evidenceConfidence(deduped, corroboration);
  const score = boundedNewsInfluence(deduped, corroboration);

  return {
    articles: deduped,
    sourceStatuses: statuses,
    confidence,
    score,
    corroboration,
    configuredSourceCount: statuses.filter((status) => status.enabled).length,
    successfulSourceCount: statuses.filter((status) => status.ok && status.count > 0).length,
  };
}

async function runAdapter(adapter, context, options) {
  const startedAt = Date.now();
  try {
    const result = await adapter(context, options);
    const items = Array.isArray(result.items) ? result.items : [];
    return {
      items,
      status: {
        name: result.name,
        enabled: result.enabled !== false,
        ok: result.enabled === false ? false : true,
        count: items.length,
        durationMs: Date.now() - startedAt,
        skipped: result.enabled === false ? result.reason || "not configured" : null,
        error: null,
      },
    };
  } catch (error) {
    return {
      items: [],
      status: {
        name: adapter.sourceName || adapter.name,
        enabled: true,
        ok: false,
        count: 0,
        durationMs: Date.now() - startedAt,
        skipped: null,
        error: safeText(error?.message, 180) || "request failed",
      },
    };
  }
}

async function coinGeckoNewsAdapter(context, options) {
  const apiKey = process.env.COINGECKO_NEWS_API_KEY || process.env.COINGECKO_API_KEY;
  if (!apiKey || !context.coinGeckoId) {
    return { name: "CoinGecko News", enabled: false, reason: !apiKey ? "API key not configured" : "CoinGecko ID unavailable", items: [] };
  }
  const baseUrl = process.env.COINGECKO_NEWS_API_BASE_URL || "https://pro-api.coingecko.com/api/v3";
  const params = new URLSearchParams({ coin_id: context.coinGeckoId, language: "en", type: "news", page: "1", per_page: "20" });
  const payload = await fetchJson(`${baseUrl}/news?${params}`, options, { "x-cg-pro-api-key": apiKey });
  const rows = firstArray(payload, payload?.data, payload?.news, payload?.results);
  return {
    name: "CoinGecko News",
    items: rows.map((row) => normalizeEvidence({
      title: row.title,
      url: row.url,
      source: row.source_name || "CoinGecko News",
      sourceType: "coingecko",
      publishedAt: row.posted_at,
      snippet: row.description || "",
      author: row.author || "",
      relatedCoinIds: row.related_coin_ids || [],
      verified: true,
    })),
  };
}
coinGeckoNewsAdapter.sourceName = "CoinGecko News";

async function lunarCrushAdapter(context, options) {
  const apiKey = process.env.LUNARCRUSH_API_KEY;
  const template = process.env.LUNARCRUSH_NEWS_URL_TEMPLATE;
  if (!apiKey || !template) {
    return { name: "LunarCrush", enabled: false, reason: !apiKey ? "API key not configured" : "news URL template not configured", items: [] };
  }
  const target = template
    .replaceAll("{ticker}", encodeURIComponent(context.ticker))
    .replaceAll("{name}", encodeURIComponent(context.name))
    .replaceAll("{coinGeckoId}", encodeURIComponent(context.coinGeckoId || ""));
  const payload = await fetchJson(target, options, { authorization: `Bearer ${apiKey}` });
  const rows = firstArray(payload?.data, payload?.items, payload?.news, payload?.results);
  return {
    name: "LunarCrush",
    items: rows.map((row) => normalizeEvidence({
      title: row.title || row.post_title || row.text,
      url: row.url || row.link || row.post_link,
      source: row.source_name || row.source || "LunarCrush",
      sourceType: "lunarcrush",
      publishedAt: row.published_at || row.time_created || row.created_at,
      snippet: row.description || row.body || row.text,
      author: row.author || row.creator_name || "",
      engagement: finite(row.interactions_24h || row.interactions || row.engagement),
      sentiment: finite(row.sentiment || row.sentiment_score),
      verified: true,
    })),
  };
}
lunarCrushAdapter.sourceName = "LunarCrush";

async function xRecentSearchAdapter(context, options) {
  const bearer = process.env.X_BEARER_TOKEN;
  if (!bearer) return { name: "X recent search", enabled: false, reason: "bearer token not configured", items: [] };
  const official = officialSources[context.ticker]?.x;
  const identity = context.name && context.name.toUpperCase() !== context.ticker
    ? `(\"${context.name}\" OR \"$${context.ticker}\")`
    : `(\"$${context.ticker}\" OR \"${context.ticker} crypto\")`;
  const query = `${official ? `(from:${official} OR ${identity})` : identity} lang:en -is:retweet`;
  const params = new URLSearchParams({
    query,
    max_results: "20",
    sort_order: "relevancy",
    "tweet.fields": "created_at,public_metrics,author_id,entities",
    expansions: "author_id",
    "user.fields": "username,verified,name",
  });
  const payload = await fetchJson(`https://api.x.com/2/tweets/search/recent?${params}`, options, { authorization: `Bearer ${bearer}` });
  const users = new Map((payload?.includes?.users || []).map((user) => [String(user.id), user]));
  return {
    name: "X recent search",
    items: (payload?.data || []).map((post) => {
      const user = users.get(String(post.author_id)) || {};
      const username = user.username || "";
      const officialPost = Boolean(official && username.toLowerCase() === official.toLowerCase());
      const metrics = post.public_metrics || {};
      return normalizeEvidence({
        title: shorten(post.text, 220),
        url: username && post.id ? `https://x.com/${username}/status/${post.id}` : "",
        source: username ? `@${username}` : "X",
        sourceType: officialPost ? "official" : "x",
        publishedAt: post.created_at,
        snippet: post.text,
        author: user.name || username,
        engagement: finite(metrics.like_count) + finite(metrics.retweet_count) * 2 + finite(metrics.quote_count) * 2,
        official: officialPost,
        verified: Boolean(user.verified || officialPost),
      });
    }),
  };
}
xRecentSearchAdapter.sourceName = "X recent search";

async function githubReleaseAdapter(context, options) {
  const repos = officialSources[context.ticker]?.github || [];
  if (!repos.length) return { name: "Official GitHub releases", enabled: false, reason: "official repository not registered", items: [] };
  const headers = process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  const responses = await Promise.allSettled(repos.map((repo) => fetchJson(`https://api.github.com/repos/${repo}/releases?per_page=5`, options, headers)));
  const items = responses.flatMap((response, index) => response.status === "fulfilled"
    ? (Array.isArray(response.value) ? response.value : []).map((release) => normalizeEvidence({
        title: release.name || release.tag_name,
        url: release.html_url,
        source: `${repos[index]} releases`,
        sourceType: "github",
        publishedAt: release.published_at || release.created_at,
        snippet: release.body || "",
        author: release.author?.login || "",
        official: true,
        verified: true,
      }))
    : []);
  return { name: "Official GitHub releases", items };
}
githubReleaseAdapter.sourceName = "Official GitHub releases";

async function gdeltAdapter(context, options) {
  const payload = await fetchJson(makeGdeltUrl(context), options);
  return {
    name: "GDELT",
    items: (payload?.articles || []).map((row) => normalizeEvidence({
      title: row.title,
      url: row.url,
      source: row.domain || domainFromUrl(row.url) || "GDELT",
      sourceType: "gdelt",
      publishedAt: parseGdeltDate(row.seendate || row.seenDate),
      snippet: row.socialimage ? "" : row.description || "",
      verified: false,
    })),
  };
}
gdeltAdapter.sourceName = "GDELT";

function normalizeInput(input = {}) {
  return {
    ticker: String(input.ticker || "").trim().toUpperCase(),
    name: safeText(input.name, 120) || String(input.ticker || "").trim().toUpperCase(),
    network: safeText(input.network, 40) || "Base",
    coinGeckoId: safeText(input.coinGeckoId, 120),
    contractAddress: safeText(input.contractAddress, 80).toLowerCase(),
    profileDriver: safeText(input.profile?.driver, 120),
  };
}

function normalizeEvidence(item = {}) {
  const title = safeText(item.title, 280);
  const url = safeUrl(item.url);
  const publishedAt = normalizeDate(item.publishedAt);
  return {
    id: `${item.sourceType || "news"}:${canonicalUrl(url) || slug(title)}`,
    title,
    url,
    domain: domainFromUrl(url),
    source: safeText(item.source, 120) || domainFromUrl(url) || "News source",
    sourceType: item.sourceType || "gdelt",
    publishedAt,
    seendate: publishedAt,
    snippet: safeText(item.snippet, 600),
    author: safeText(item.author, 120),
    relatedCoinIds: Array.isArray(item.relatedCoinIds) ? item.relatedCoinIds.map(String) : [],
    engagement: finite(item.engagement),
    sentiment: finiteOrNull(item.sentiment),
    official: Boolean(item.official),
    verified: Boolean(item.verified),
  };
}

function scoreEvidence(item, context) {
  const text = `${item.title} ${item.snippet}`.toLowerCase();
  const ticker = context.ticker.toLowerCase();
  const name = context.name.toLowerCase();
  const exactName = name.length > 2 && text.includes(name);
  const tickerPattern = new RegExp(`(^|[^a-z0-9])\\$?${escapeRegExp(ticker)}([^a-z0-9]|$)`, "i");
  const tickerMatch = ticker.length >= 4 && tickerPattern.test(text);
  const relatedId = context.coinGeckoId && item.relatedCoinIds.includes(context.coinGeckoId);
  const official = item.official || item.sourceType === "github";
  const identityScore = official || relatedId ? 1 : exactName ? 0.9 : tickerMatch ? 0.62 : 0;
  const freshness = freshnessScore(item.publishedAt);
  const credibility = sourceWeights[item.sourceType] || 0.55;
  const catalystHits = countHits(text, positiveTerms);
  const riskHits = countHits(text, riskTerms);
  const relevanceScore = identityScore * 4 + freshness * 2 + credibility * 2 + Math.min(catalystHits + riskHits, 4) * 0.45;
  const direction = riskHits > catalystHits ? "risk" : catalystHits > 0 ? "positive" : "neutral";
  return {
    ...item,
    identityScore: round(identityScore, 2),
    freshnessScore: round(freshness, 2),
    credibilityScore: round(credibility, 2),
    relevanceScore: round(relevanceScore, 2),
    direction,
    driver: driverFromText(text),
  };
}

const positiveTerms = ["launch", "upgrade", "mainnet", "expansion", "incentive", "reward", "integration", "partnership", "proposal", "governance", "vault", "growth", "surge", "accumulation", "record", "adoption", "release", "revenue", "fee"];
const riskTerms = ["hack", "exploit", "lawsuit", "probe", "investigation", "outage", "depeg", "delist", "warning", "breach", "attack", "halt", "liquidation"];

function compareEvidence(a, b) {
  if (a.official !== b.official) return a.official ? -1 : 1;
  return b.relevanceScore - a.relevanceScore || dateMs(b.publishedAt) - dateMs(a.publishedAt);
}

function deduplicateEvidence(items) {
  const kept = [];
  const urls = new Set();
  for (const item of items) {
    const url = canonicalUrl(item.url);
    if (url && urls.has(url)) continue;
    if (kept.some((existing) => titleSimilarity(existing.title, item.title) >= 0.78)) continue;
    kept.push(item);
    if (url) urls.add(url);
  }
  return kept;
}

function buildCorroboration(items) {
  const groups = new Map();
  for (const item of items) {
    const key = item.driver || "market activity";
    const group = groups.get(key) || { driver: key, sources: new Set(), count: 0, direction: item.direction };
    group.sources.add(item.domain || item.source);
    group.count += 1;
    if (item.direction === "risk") group.direction = "risk";
    groups.set(key, group);
  }
  return [...groups.values()]
    .map((group) => ({ driver: group.driver, sourceCount: group.sources.size, itemCount: group.count, direction: group.direction }))
    .sort((a, b) => b.sourceCount - a.sourceCount || b.itemCount - a.itemCount);
}

function evidenceConfidence(items, corroboration) {
  if (!items.length) return "unconfirmed";
  if (items.some((item) => item.official) || corroboration.some((group) => group.sourceCount >= 2)) return "high";
  if (items.some((item) => item.credibilityScore >= 0.8)) return "medium";
  return "low";
}

function boundedNewsInfluence(items, corroboration) {
  if (!items.length) return 0;
  let score = 0;
  for (const item of items.slice(0, 5)) {
    const sign = item.direction === "risk" ? -1 : item.direction === "positive" ? 1 : 0;
    score += sign * item.freshnessScore * item.credibilityScore * (item.official ? 1.2 : 0.65);
  }
  if (corroboration.some((group) => group.sourceCount >= 2 && group.direction === "positive")) score += 0.6;
  if (corroboration.some((group) => group.sourceCount >= 2 && group.direction === "risk")) score -= 0.8;
  return round(clamp(score, -2, 3), 1);
}

function makeGdeltUrl(context) {
  const profile = context.profileDriver ? ` \"${context.profileDriver}\"` : "";
  const query = `(\"${context.name}\" OR \"${context.ticker} crypto\")${profile}`;
  const params = new URLSearchParams({ query, mode: "artlist", format: "json", maxrecords: "25", timespan: "7d", sort: "hybridrel" });
  return `https://api.gdeltproject.org/api/v2/doc/doc?${params}`;
}

async function fetchJson(targetUrl, options = {}, headers = {}) {
  const fetchImpl = options.fetchImpl || global.fetch;
  if (typeof fetchImpl !== "function") throw new Error("Node 18+ fetch is required");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs || DEFAULT_TIMEOUT_MS);
  try {
    const response = await fetchImpl(targetUrl, {
      signal: controller.signal,
      headers: { accept: "application/json", "user-agent": "Vici-Bundle-Builder-Beta/0.1", ...headers },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function driverFromText(text) {
  if (/hack|exploit|breach|attack/.test(text)) return "security risk";
  if (/lawsuit|probe|investigation|regulat/.test(text)) return "regulatory risk";
  if (/mainnet|launch|upgrade|release|roadmap|expansion/.test(text)) return "launch / upgrade";
  if (/partnership|integration|collaboration|ecosystem/.test(text)) return "partnership / integration";
  if (/listing|exchange|trading pair/.test(text)) return "listing / market access";
  if (/whale|accumulat|holder|inflow/.test(text)) return "accumulation";
  if (/incentive|reward|liquidity|volume|fee|revenue/.test(text)) return "liquidity / usage";
  if (/proposal|governance|vote/.test(text)) return "governance";
  return "market activity";
}

function freshnessScore(value) {
  const ageHours = (Date.now() - dateMs(value)) / 3_600_000;
  if (!Number.isFinite(ageHours) || ageHours < 0) return 0.2;
  if (ageHours <= 24) return 1;
  if (ageHours <= 72) return 0.82;
  if (ageHours <= 168) return 0.58;
  if (ageHours <= 720) return 0.28;
  return 0.08;
}

function titleSimilarity(a, b) {
  const left = new Set(slug(a).split("-").filter((word) => word.length > 2));
  const right = new Set(slug(b).split("-").filter((word) => word.length > 2));
  if (!left.size || !right.size) return 0;
  const overlap = [...left].filter((word) => right.has(word)).length;
  return overlap / Math.min(left.size, right.size);
}

function canonicalUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"].forEach((key) => url.searchParams.delete(key));
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}${url.search}`.toLowerCase();
  } catch {
    return "";
  }
}

function normalizeDate(value) {
  if (!value) return "";
  const numeric = Number(value);
  const date = Number.isFinite(numeric) && numeric > 0
    ? new Date(numeric > 1e12 ? numeric : numeric * 1000)
    : new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString() : "";
}

function parseGdeltDate(value) {
  const text = String(value || "");
  const match = text.match(/^(\d{4})(\d{2})(\d{2})T?(\d{2})?(\d{2})?/);
  if (!match) return normalizeDate(value);
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4] || 0), Number(match[5] || 0))).toISOString();
}

function safeUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function domainFromUrl(value) {
  try { return new URL(value).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function safeText(value, max = 240) { return String(value || "").replace(/\s+/g, " ").trim().slice(0, max); }
function shorten(value, max) { const text = safeText(value, max + 1); return text.length > max ? `${text.slice(0, max - 1).trim()}…` : text; }
function slug(value) { return safeText(value, 300).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function escapeRegExp(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function countHits(text, terms) { return terms.filter((term) => text.includes(term)).length; }
function dateMs(value) { const time = new Date(value || 0).getTime(); return Number.isFinite(time) ? time : 0; }
function finite(value) { const number = Number(value); return Number.isFinite(number) ? number : 0; }
function finiteOrNull(value) { const number = Number(value); return Number.isFinite(number) ? number : null; }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function round(value, places = 1) { const scale = 10 ** places; return Math.round(value * scale) / scale; }
function firstArray(...values) { return values.find(Array.isArray) || []; }

module.exports = {
  collectNewsIntelligence,
  deduplicateEvidence,
  evidenceConfidence,
  scoreEvidence,
};
