const http = require("node:http");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { URL } = require("node:url");
const {
  recommendBundle,
  getSupportedTokens,
  normalizeNetwork,
  isNetworkAllowedForBeta,
  coinGeckoIdForTicker,
  API_VERSION,
} = require("./recommendation-engine");
const { collectNewsIntelligence } = require("./news-intelligence");

const PORT = Number(process.env.PORT || 8788);
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = path.resolve(process.env.PUBLIC_DIR || path.join(__dirname, "..", "public"));
const SUBMISSION_STORE_LIMIT = Number(process.env.BUNDLE_BUILDER_SUBMISSION_LIMIT || 500);
const SUBMISSION_STORE_PATH = path.resolve(
  process.env.BUNDLE_BUILDER_SUBMISSION_FILE
    || path.join(process.env.BUNDLE_BUILDER_DATA_DIR || path.join(os.tmpdir(), "bundle-builder-beta"), "submitted-bundles.json"),
);
const COINGECKO_CHART_STORE_PATH = path.resolve(
  process.env.BUNDLE_BUILDER_CHART_CACHE_FILE
    || path.join(process.env.BUNDLE_BUILDER_DATA_DIR || path.join(os.tmpdir(), "bundle-builder-beta"), "coingecko-charts.json"),
);
const COINGECKO_CHART_CACHE_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_CHART_CACHE_MS || 1000 * 60 * 5);
const COINGECKO_CHART_STALE_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_CHART_STALE_MS || 1000 * 60 * 20);
const COINGECKO_CHART_RETRIES = Number(process.env.BUNDLE_BUILDER_COINGECKO_CHART_RETRIES || 2);
const COINGECKO_CHART_PRELOAD_INTERVAL_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_INTERVAL_MS || 1000 * 60 * 5);
const COINGECKO_CHART_PRELOAD_STAGGER_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_STAGGER_MS || 750);
const COINGECKO_CHART_PRELOAD_ENABLED = process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_ENABLED !== "false";
const DEFAULT_COINGECKO_CHART_PRELOAD_IDS = [
  "aerodrome-finance",
  "morpho",
  "layerzero",
  "based-brett",
  "degen-base",
  "virtual-protocol",
  "coinbase-wrapped-btc",
  "coinbase-wrapped-staked-eth",
  "toshi",
  "zora",
  "aixbt-by-virtuals",
  "kaito",
  "weth",
  "wrapped-bitcoin",
  "aave",
  "chainlink",
  "renzo-restaked-eth",
];
const COINGECKO_CHART_PRELOAD_IDS = parseCoinGeckoPreloadIds(process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_IDS);
const CATALYST_CACHE_MS = Number(process.env.BUNDLE_BUILDER_CATALYST_CACHE_MS || 1000 * 60 * 10);
const CATALYST_FETCH_TIMEOUT_MS = Number(process.env.BUNDLE_BUILDER_CATALYST_TIMEOUT_MS || 5000);
const coingeckoChartPreloadState = {
  enabled: COINGECKO_CHART_PRELOAD_ENABLED,
  running: false,
  cycle: 0,
  idCount: COINGECKO_CHART_PRELOAD_IDS.length,
  lastStartedAt: null,
  lastCompletedAt: null,
  lastError: null,
  lastResult: null,
};
let coingeckoChartPreloadTimer = null;
const pendingCoinGeckoChartRefreshes = new Map();
const catalystCache = new Map();
const catalystProfiles = {
  AERO: {
    driver: "Base DEX expansion",
    title: "Aerodrome is watched for Base DEX volume, incentive changes, mainnet expansion, and protocol upgrade narratives.",
    source: "Bundle Builder catalyst watchlist",
    summary: "AERO gets more interesting when Base trading activity, liquidity incentives, protocol expansion, or DEX-volume headlines are active.",
    watch: "Watch for Base volume, emissions or incentive changes, mainnet expansion headlines, and whether volume confirms the move.",
    socialWatch: "Monitor X, Discord, Telegram, Base ecosystem feeds, and protocol channels for Aerodrome expansion notes, reward updates, fee-growth claims, or Base DEX-volume narratives.",
  },
  MORPHO: {
    driver: "Base lending growth",
    title: "Morpho is watched for lending growth, vault launches, institutional DeFi, and Base yield narratives.",
    source: "Bundle Builder catalyst watchlist",
    summary: "MORPHO gets more interesting when lending demand, vault growth, institutional DeFi, or Base yield narratives are active.",
    watch: "Watch whether lending deposits, vault launches, and Base DeFi activity keep confirming the story.",
    socialWatch: "Monitor Morpho governance, protocol announcements, DeFi researcher chatter, and Base lending threads for vault launches or institutional integrations.",
  },
  VIRTUAL: {
    driver: "AI-agent attention",
    title: "Virtuals is watched for AI-agent platform growth, launch activity, and attention-market narratives.",
    source: "Bundle Builder catalyst watchlist",
    summary: "VIRTUAL gets more interesting when AI-agent launches and Base AI narratives attract volume.",
    watch: "Watch whether AI attention is broad-based or just one short-term social spike.",
    socialWatch: "Monitor X, creator channels, Base AI projects, and Virtuals launch activity for agent launches, platform usage, or attention-cycle acceleration.",
  },
  DEGEN: {
    driver: "Base community momentum",
    title: "Degen is watched for Base community activity, social momentum, and Farcaster-adjacent narratives.",
    source: "Bundle Builder catalyst watchlist",
    summary: "DEGEN gets more interesting when Base social activity and community momentum are leading the market.",
    watch: "Community tokens can reverse quickly; watch liquidity and volume quality closely.",
    socialWatch: "Monitor Farcaster, X, Telegram, and Base community threads for social momentum, reward campaigns, or sudden attention spikes.",
  },
  BRETT: {
    driver: "Base meme liquidity",
    title: "Brett is watched for Base meme liquidity, social attention, and high-beta community momentum.",
    source: "Bundle Builder catalyst watchlist",
    summary: "BRETT gets more interesting when Base meme liquidity and social attention are expanding together.",
    watch: "Meme moves need volume confirmation and careful sizing because they can fade quickly.",
    socialWatch: "Monitor Base meme feeds, X trend chatter, whale-wallet discussion, and community channels for attention surges or liquidity shifts.",
  },
  ZRO: {
    driver: "interoperability activity",
    title: "LayerZero is watched for interoperability demand, integrations, and cross-chain infrastructure narratives.",
    source: "Bundle Builder catalyst watchlist",
    summary: "ZRO gets more interesting when cross-chain infrastructure and interoperability narratives are active.",
    watch: "Watch whether integrations and bridge activity are strong enough to support the move.",
    socialWatch: "Monitor LayerZero announcements, integration posts, governance updates, and cross-chain infrastructure commentary.",
  },
  KAITO: {
    driver: "InfoFi / AI attention",
    title: "Kaito is watched for InfoFi, AI attention markets, and crypto-data narrative growth.",
    source: "Bundle Builder catalyst watchlist",
    summary: "KAITO gets more interesting when InfoFi, AI attention, and crypto-data narratives are active.",
    watch: "Attention-data tokens can become crowded quickly; watch whether volume confirms the narrative.",
    socialWatch: "Monitor InfoFi discussion, AI-agent market commentary, creator incentives, and Kaito product or ecosystem updates.",
  },
  ZORA: {
    driver: "creator economy activity",
    title: "Zora is watched for creator economy momentum, mint activity, and Base-native consumer crypto growth.",
    source: "Bundle Builder catalyst watchlist",
    summary: "ZORA gets more interesting when creator launches and Base consumer activity are visible.",
    watch: "Creator-economy tokens can be sentiment-heavy; watch volume and trend quality.",
    socialWatch: "Monitor creator launches, mint activity, Base consumer-app chatter, and creator-economy headlines.",
  },
};

const server = createServer();

function createServer() {
  return http.createServer(handleRequest);
}

async function handleRequest(request, response) {
  try {
    setCorsHeaders(response);

    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, {
        ok: true,
        service: "bundle-builder-api",
        version: API_VERSION,
        strictEligibilityDefault: true,
        liquidityEndpointFailsClosed: true,
        tokensEndpointFailsClosed: true,
        friendlyPortErrors: true,
        coingeckoChartWorkflowCache: true,
        catalystIntelligenceEndpoint: true,
        coingeckoChartBackgroundPreload: {
          enabled: COINGECKO_CHART_PRELOAD_ENABLED,
          intervalMs: COINGECKO_CHART_PRELOAD_INTERVAL_MS,
          idCount: COINGECKO_CHART_PRELOAD_IDS.length,
        },
        homepage: {
          enabled: true,
          publicDirExists: fs.existsSync(PUBLIC_DIR),
          indexExists: fs.existsSync(path.join(PUBLIC_DIR, "index.html")),
        },
        betaScope: "invite-only Base beta by default",
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/coingecko-chart/status") {
      sendJson(response, 200, {
        ok: true,
        cacheFile: COINGECKO_CHART_STORE_PATH,
        cacheMs: COINGECKO_CHART_CACHE_MS,
        staleMs: COINGECKO_CHART_STALE_MS,
        preload: coingeckoChartPreloadState,
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/coingecko-chart") {
      const id = String(url.searchParams.get("id") || "").trim().toLowerCase();
      if (!isAllowedCoinGeckoId(id)) {
        sendJson(response, 400, {
          ok: false,
          error: "Unsupported CoinGecko coin id",
        });
        return;
      }

      try {
        const chart = await getCoinGeckoChartWorkflow(id, {
          force: isTruthy(url.searchParams.get("force")),
        });
        sendJson(response, 200, {
          ok: true,
          id,
          source: "coingecko-chart-workflow",
          cacheStatus: chart.cacheStatus,
          stale: chart.cacheStatus === "stale-cache",
          updatedAt: chart.updatedAt,
          cachedAt: chart.cachedAt ? new Date(chart.cachedAt).toISOString() : null,
          warning: chart.warning || null,
          prices: chart.prices,
          totalVolumes: chart.totalVolumes,
          marketCaps: chart.marketCaps,
        });
      } catch (error) {
        sendJson(response, 502, {
          ok: false,
          id,
          source: "coingecko-chart-workflow",
          error: `CoinGecko chart unavailable: ${error.message || "upstream request failed"}`,
        });
      }
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/catalyst") {
      const ticker = safeTicker(url.searchParams.get("ticker"));
      if (!ticker) {
        sendJson(response, 400, {
          ok: false,
          error: "Missing or invalid ticker",
        });
        return;
      }

      const network = normalizeNetwork(url.searchParams.get("network") || "base");
      const name = safeText(url.searchParams.get("name"), 120) || ticker;
      const coinGeckoId = safeText(url.searchParams.get("coinGeckoId"), 120) || coinGeckoIdForTicker(ticker);
      const contractAddress = safeText(url.searchParams.get("contractAddress"), 80);
      const force = isTruthy(url.searchParams.get("force"));
      const payload = await getCatalystIntelligence({
        ticker,
        name,
        network: network.name,
        coinGeckoId,
        contractAddress,
      }, { force });
      sendJson(response, 200, payload);
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/tokens") {
      const network = normalizeNetwork(url.searchParams.get("network") || url.searchParams.get("chainid"));
      const allowNonBaseBetaNetworks = isTruthy(url.searchParams.get("allowNonBaseBetaNetworks"));
      if (!isNetworkAllowedForBeta(network, { allowNonBaseBetaNetworks })) {
        sendJson(response, 400, {
          ok: false,
          code: "NETWORK_NOT_SUPPORTED_IN_BETA",
          error: `${network.name} is not enabled for this invite-only beta. Base is the default supported network.`,
          network: network.name,
          chainId: network.chainId,
          tokens: [],
          howToProceed: "Use network=base for the initial beta, or ask engineering to explicitly enable additional networks.",
        });
        return;
      }
      const support = await getSupportedTokens(network);
      const allowFallbackEligibility = isTruthy(url.searchParams.get("allowFallbackEligibility"))
        || isTruthy(url.searchParams.get("demoFallback"))
        || url.searchParams.get("strictEligibility") === "false";
      if (support.source !== "vici-api" && !allowFallbackEligibility) {
        sendJson(response, 503, {
          ok: false,
          code: "ELIGIBILITY_SOURCE_UNAVAILABLE",
          error: "The official ViciSwap token eligibility API was unavailable, so Bundle Builder did not return fallback tokens.",
          network: support.network,
          chainId: support.chainId,
          source: "vici-api-unavailable",
          eligibilityUrl: support.url || null,
          eligibilityError: support.error || null,
          fallbackEligibilitySource: support.source,
          fallbackEligibilityUsed: false,
          tokenCount: 0,
          tokens: [],
          howToProceed: "Retry after the ViciSwap coins API is available. For local demos only, pass allowFallbackEligibility=true to permit the starter-list fallback.",
        });
        return;
      }
      sendJson(response, 200, {
        ok: true,
        network: support.network,
        chainId: support.chainId,
        source: support.source,
        fallbackEligibilityUsed: support.source !== "vici-api",
        tokenCount: support.tokenCount,
        tokens: support.tokens,
        warning: support.error || null,
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/market-proxy") {
      const target = url.searchParams.get("url") || "";
      if (!isAllowedMarketProxyUrl(target)) {
        sendJson(response, 400, {
          ok: false,
          error: "Unsupported market data URL",
        });
        return;
      }
      try {
        const payload = await fetchMarketProxyJson(target);
        sendJson(response, 200, payload);
      } catch (error) {
        sendJson(response, 502, {
          ok: false,
          error: `Market proxy unavailable: ${error.message || "upstream request failed"}`,
        });
      }
      return;
    }

    if (url.pathname === "/api/v1/submitted-bundles") {
      if (request.method === "GET") {
        const limit = clampInteger(url.searchParams.get("limit"), 1, SUBMISSION_STORE_LIMIT, 100);
        const records = readSubmittedBundles().slice(0, limit);
        sendJson(response, 200, {
          ok: true,
          count: records.length,
          storage: storageDescriptor(),
          bundles: records,
        });
        return;
      }

      if (request.method === "POST") {
        const body = await readJsonBody(request);
        const record = sanitizeSubmittedBundle(body);
        if (!record.coins.length) {
          sendJson(response, 400, {
            ok: false,
            error: "Submitted bundle must include at least one coin.",
          });
          return;
        }
        const records = readSubmittedBundles();
        const nextRecords = [record, ...records.filter((item) => item.id !== record.id)].slice(0, SUBMISSION_STORE_LIMIT);
        writeSubmittedBundles(nextRecords);
        sendJson(response, 201, {
          ok: true,
          storage: storageDescriptor(),
          bundle: record,
        });
        return;
      }

      sendJson(response, 405, { ok: false, error: "Method not allowed" });
      return;
    }

    if (url.pathname === "/api/v1/bundle" || url.pathname === "/api/v1/recommendations") {
      if (!["GET", "POST"].includes(request.method)) {
        sendJson(response, 405, { ok: false, error: "Method not allowed" });
        return;
      }

      const params = request.method === "POST"
        ? await readJsonBody(request)
        : Object.fromEntries(url.searchParams.entries());

      const result = await recommendBundle(params);
      sendJson(response, statusForBundleResult(result), result);
      return;
    }

    if (["GET", "HEAD"].includes(request.method) && serveStaticAsset(url.pathname, request.method, response)) {
      return;
    }

    sendJson(response, 404, {
      ok: false,
      error: "Not found",
      routes: ["GET /health", "GET /api/v1/tokens", "GET /api/v1/coingecko-chart", "GET /api/v1/catalyst", "GET|POST /api/v1/bundle", "GET|POST /api/v1/submitted-bundles"],
    });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error.message || "Unexpected API error",
    });
  }
}

function startServer(serverInstance = server) {
  serverInstance.on("error", handleServerError);
  serverInstance.listen(PORT, HOST, () => {
    console.log(`Bundle Builder API listening on http://${HOST}:${PORT}`);
    startCoinGeckoChartPreloader();
  });
}

function handleServerError(error) {
  if (error.code === "EADDRINUSE") {
    console.error(`Bundle Builder API could not start because ${HOST}:${PORT} is already in use.`);
    console.error("Stop the existing server, choose a different PORT, or run: PORT=8790 npm start");
    process.exitCode = 1;
    return;
  }
  if (error.code === "EACCES" || error.code === "EPERM") {
    console.error(`Bundle Builder API could not start on ${HOST}:${PORT} because this process does not have permission to bind that address.`);
    console.error("Try a different PORT or HOST, for example: HOST=127.0.0.1 PORT=8790 npm start");
    process.exitCode = 1;
    return;
  }
  throw error;
}

if (require.main === module) {
  startServer(server);
}

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.setHeader("Access-Control-Max-Age", "86400");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
}

function readSubmittedBundles() {
  try {
    const parsed = JSON.parse(fs.readFileSync(SUBMISSION_STORE_PATH, "utf8"));
    return Array.isArray(parsed) ? parsed.map(sanitizeStoredBundle).filter(Boolean) : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function writeSubmittedBundles(records) {
  fs.mkdirSync(path.dirname(SUBMISSION_STORE_PATH), { recursive: true });
  fs.writeFileSync(SUBMISSION_STORE_PATH, JSON.stringify(records.map(sanitizeStoredBundle).filter(Boolean), null, 2));
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

function storageDescriptor() {
  return {
    mode: process.env.BUNDLE_BUILDER_SUBMISSION_FILE || process.env.BUNDLE_BUILDER_DATA_DIR ? "configured-file" : "ephemeral-file",
    durable: Boolean(process.env.BUNDLE_BUILDER_SUBMISSION_FILE || process.env.BUNDLE_BUILDER_DATA_DIR),
    note: process.env.BUNDLE_BUILDER_SUBMISSION_FILE || process.env.BUNDLE_BUILDER_DATA_DIR
      ? "Submitted bundle snapshots are stored in the configured server file."
      : "Submitted bundle snapshots are stored on the server filesystem for beta testing and may reset on redeploys.",
  };
}

function parseCoinGeckoPreloadIds(value) {
  const ids = String(value || "")
    .split(",")
    .map((id) => id.trim().toLowerCase())
    .filter(isAllowedCoinGeckoId);
  return ids.length ? [...new Set(ids)] : DEFAULT_COINGECKO_CHART_PRELOAD_IDS;
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

function safeTicker(value) {
  const ticker = safeText(value, 20).toUpperCase();
  return /^[A-Z0-9.]{2,16}$/.test(ticker) ? ticker : "";
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clampInteger(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

function serveStaticAsset(rawPathname, method, response) {
  const filePath = resolvePublicFilePath(rawPathname);
  if (!filePath) return false;

  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;
    response.writeHead(200, {
      "Content-Type": contentTypeForPath(filePath),
      "Content-Length": stat.size,
      "Cache-Control": cacheControlForPath(filePath),
    });
    if (method === "HEAD") {
      response.end();
      return true;
    }
    response.end(fs.readFileSync(filePath));
    return true;
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
    throw error;
  }
}

function resolvePublicFilePath(rawPathname) {
  let pathname = "/";
  try {
    pathname = decodeURIComponent(String(rawPathname || "/").split("?")[0]);
  } catch {
    return null;
  }
  if (pathname === "/") pathname = "/index.html";
  const normalized = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(PUBLIC_DIR, normalized);
  if (!filePath.startsWith(`${PUBLIC_DIR}${path.sep}`)) return null;
  return filePath;
}

function contentTypeForPath(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const types = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".zip": "application/zip",
  };
  return types[extension] || "application/octet-stream";
}

async function getCatalystIntelligence({ ticker, name, network, coinGeckoId, contractAddress }, options = {}) {
  const normalizedTicker = safeTicker(ticker);
  const normalizedNetwork = normalizeNetwork(network?.name || network).name;
  const resolvedCoinGeckoId = safeText(coinGeckoId, 120) || coinGeckoIdForTicker(normalizedTicker);
  const cacheKey = `${normalizedNetwork}:${normalizedTicker}:${resolvedCoinGeckoId}:${safeText(name, 120).toLowerCase()}`;
  const cached = catalystCache.get(cacheKey);
  if (!options.force && cached && Date.now() - cached.cachedAt < CATALYST_CACHE_MS) return cached.value;

  const profile = catalystProfiles[normalizedTicker] || null;
  const query = catalystSearchQuery({ ticker: normalizedTicker, name, network: normalizedNetwork, profile });
  const searches = catalystSearchLinks({ ticker: normalizedTicker, name, network: normalizedNetwork, profile, query });
  const intelligence = await collectNewsIntelligence({
    ticker: normalizedTicker,
    name: safeText(name, 120) || normalizedTicker,
    network: normalizedNetwork,
    coinGeckoId: resolvedCoinGeckoId,
    contractAddress,
    profile,
  }, { timeoutMs: CATALYST_FETCH_TIMEOUT_MS });
  const articles = intelligence.articles;

  const topArticle = articles[0] || null;
  const source = topArticle
    ? intelligence.successfulSourceCount > 1 ? "Multi-source news scan" : topArticle.source
    : profile ? profile.source : "No catalyst source";
  const signalType = topArticle ? "verified-article" : profile ? "market-context" : "unconfirmed";
  const confidence = topArticle ? intelligence.confidence : profile ? "context-only" : "unconfirmed";
  const driver = topArticle?.driver || profile?.driver || "market catalyst";
  const riskDriver = topArticle?.direction === "risk" ? driver : "";
  const corroborated = intelligence.corroboration.find((group) => group.sourceCount >= 2);
  const summary = topArticle
    ? `${normalizedTicker} has fresh ${driver.toLowerCase()} coverage: ${shortenText(topArticle.title, 130)}${topArticle.source ? ` (${topArticle.source})` : ""}.${corroborated ? ` ${corroborated.sourceCount} independent sources are pointing to the same ${corroborated.driver} theme.` : ""}`
    : profile
      ? `No recent article was confirmed for ${normalizedTicker}. Background context: ${profile.summary}`
      : `No recent article-level catalyst was confirmed for ${normalizedTicker}.`;
  const failedSources = intelligence.sourceStatuses.filter((status) => status.enabled && !status.ok);

  const value = {
    ok: true,
    ticker: normalizedTicker,
    name: safeText(name, 120) || normalizedTicker,
    network: normalizedNetwork,
    source,
    signalType,
    confidence,
    driver,
    riskDriver,
    score: topArticle ? intelligence.score : 0,
    contextStrength: profile ? 3.5 : 0,
    articleCount: articles.length,
    verifiedArticleCount: articles.filter((article) => article.verified).length,
    topTitle: topArticle?.title || "",
    topSource: topArticle?.domain || "",
    articles,
    sourceStatuses: intelligence.sourceStatuses,
    corroboration: intelligence.corroboration,
    configuredSourceCount: intelligence.configuredSourceCount,
    successfulSourceCount: intelligence.successfulSourceCount,
    summary,
    contextTitle: profile?.title || "",
    contextSummary: profile?.summary || "",
    watch: profile?.watch || "Watch whether volume, route depth, and chart structure keep confirming the move.",
    socialWatch: profile?.socialWatch || "No dedicated social watchlist is attached yet.",
    searches,
    updatedAt: new Date().toISOString(),
    warning: !topArticle && failedSources.length
      ? `Some news sources were unavailable: ${failedSources.map((status) => status.name).join(", ")}`
      : null,
  };
  catalystCache.set(cacheKey, { value, cachedAt: Date.now() });
  return value;
}

function catalystSearchQuery({ ticker, name, network, profile }) {
  const cleanName = safeText(name, 120).replace(/[^\w\s.-]/g, " ").trim();
  const driverTerms = profile?.driver ? profile.driver.replace(/[^\w\s.-]/g, " ") : "";
  const terms = [
    `"${cleanName || ticker}"`,
    `"${ticker} crypto"`,
    `"${ticker} ${network}"`,
    profile ? `"${cleanName || ticker}" "${profile.driver}"` : "",
    driverTerms ? `"${ticker}" ${driverTerms}` : "",
  ].filter(Boolean);
  return terms.join(" OR ");
}

function catalystSearchLinks({ ticker, name, network, profile, query }) {
  const cleanName = safeText(name, 120) || ticker;
  const socialQuery = `${cleanName} ${ticker} ${network} ${profile?.driver || "crypto"} catalyst`;
  return {
    gdelt: makeGdeltNewsUrl(query),
    googleNews: `https://news.google.com/search?q=${encodeURIComponent(socialQuery)}`,
    xSearch: `https://x.com/search?q=${encodeURIComponent(socialQuery)}&src=typed_query&f=live`,
  };
}

function makeGdeltNewsUrl(query) {
  const params = new URLSearchParams({
    query,
    mode: "artlist",
    format: "json",
    maxrecords: "15",
    timespan: "3d",
    sort: "hybridrel",
  });
  return `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
}

function normalizeCatalystArticles(articles) {
  if (!Array.isArray(articles)) return [];
  return articles
    .map((article) => ({
      title: safeText(article?.title, 220),
      url: safeText(article?.url, 500),
      domain: safeText(article?.domain || domainFromUrl(article?.url), 120),
      seendate: safeText(article?.seendate || article?.seenDate, 80),
    }))
    .filter((article) => article.title);
}

function scoreCatalystArticle(article, ticker, profile) {
  const text = `${article.title} ${article.domain}`.toLowerCase();
  const normalizedTicker = ticker.toLowerCase();
  const profileDriver = String(profile?.driver || "").toLowerCase();
  const catalystWords = ["launch", "upgrade", "mainnet", "expansion", "incentive", "reward", "liquidity", "volume", "integration", "partnership", "proposal", "governance", "vault", "growth", "surge", "whale", "accumulation", "fee", "revenue"];
  const riskWords = ["hack", "exploit", "lawsuit", "probe", "investigation", "outage", "depeg", "delist", "warning"];
  let score = 0;
  if (text.includes(normalizedTicker)) score += 1.1;
  if (profileDriver && profileDriver.split(/\s+/).some((word) => word.length > 3 && text.includes(word))) score += 1.4;
  score += catalystWords.filter((word) => text.includes(word)).length * 0.75;
  score -= riskWords.filter((word) => text.includes(word)).length * 1.2;
  if (isRecentCatalystDate(article.seendate)) score += 0.8;
  if (isKnownCryptoNewsDomain(article.domain || article.url)) score += 0.6;
  return clamp(score, -4, 6);
}

function catalystDriverFromText(text, profile = null) {
  const value = String(text || "").toLowerCase();
  if (/mainnet|launch|upgrade|release|roadmap|expansion/.test(value)) return "launch / upgrade";
  if (/partnership|integration|collaboration|ecosystem/.test(value)) return "partnership / integration";
  if (/listing|exchange|market|trading pair/.test(value)) return "listing / market access";
  if (/whale|accumulat|holder|inflow|buying pressure/.test(value)) return "accumulation";
  if (/incentive|reward|liquidity|volume|fee|revenue/.test(value)) return "liquidity / usage";
  if (/proposal|governance|vote/.test(value)) return "governance";
  return profile?.driver || "market catalyst";
}

function riskDriverFromText(text) {
  const value = String(text || "").toLowerCase();
  if (/hack|exploit|attack/.test(value)) return "security";
  if (/lawsuit|sec|probe|investigation/.test(value)) return "regulatory";
  if (/outage|halt|downtime/.test(value)) return "operational";
  if (/depeg|liquidation|delist/.test(value)) return "market structure";
  return "";
}

function isRecentCatalystDate(value) {
  const text = String(value || "");
  const compact = text.match(/^(\d{4})(\d{2})(\d{2})T?(\d{2})?(\d{2})?/);
  if (!compact) return false;
  const date = new Date(Date.UTC(
    Number(compact[1]),
    Number(compact[2]) - 1,
    Number(compact[3]),
    Number(compact[4] || 0),
    Number(compact[5] || 0),
  ));
  return Number.isFinite(date.getTime()) && Date.now() - date.getTime() < 1000 * 60 * 60 * 72;
}

function isKnownCryptoNewsDomain(value) {
  const domain = domainFromUrl(value || "").toLowerCase() || String(value || "").toLowerCase();
  return [
    "cointelegraph.com",
    "coindesk.com",
    "theblock.co",
    "decrypt.co",
    "blockworks.co",
    "coinmarketcap.com",
    "coingecko.com",
    "defillama.com",
    "beincrypto.com",
  ].some((known) => domain.includes(known));
}

function domainFromUrl(value) {
  try {
    return new URL(String(value || "")).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

async function fetchJsonWithTimeout(targetUrl, timeoutMs) {
  if (typeof fetch !== "function") throw new Error("Node 18+ fetch is required");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        accept: "application/json",
        "user-agent": "Vici-Bundle-Builder-Beta/0.1",
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchMarketProxyJson(targetUrl) {
  if (typeof fetch !== "function") throw new Error("Node 18+ fetch is required");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(process.env.BUNDLE_BUILDER_MARKET_PROXY_TIMEOUT_MS || 9000));
  try {
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        accept: "application/json",
        "user-agent": "Vici-Bundle-Builder-Beta/0.1",
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function getCoinGeckoChartWorkflow(id, options = {}) {
  const store = readCoinGeckoChartStore();
  const existing = sanitizeStoredCoinGeckoChart(store[id]);
  const now = Date.now();
  if (!options.force && existing && now - existing.cachedAt < COINGECKO_CHART_CACHE_MS) {
    return { ...existing, cacheStatus: "fresh-cache" };
  }
  if (!options.force && existing && now - existing.cachedAt < COINGECKO_CHART_STALE_MS) {
    refreshCoinGeckoChartInBackground(id);
    return { ...existing, cacheStatus: "stale-cache", warning: "Serving cached chart while a background refresh runs" };
  }

  try {
    const chart = await fetchCoinGeckoChartWithRetries(id);
    const record = sanitizeStoredCoinGeckoChart({
      id,
      prices: chart.prices,
      totalVolumes: chart.totalVolumes,
      marketCaps: chart.marketCaps,
      updatedAt: chart.updatedAt,
      cachedAt: now,
    });
    if (!record) throw new Error("CoinGecko chart response did not contain enough price points");
    store[id] = record;
    writeCoinGeckoChartStore(store);
    return { ...record, cacheStatus: "refreshed" };
  } catch (error) {
    if (existing && now - existing.cachedAt < COINGECKO_CHART_STALE_MS) {
      return {
        ...existing,
        cacheStatus: "stale-cache",
        warning: error.message || "CoinGecko refresh failed; using last good chart",
      };
    }
    throw error;
  }
}

function refreshCoinGeckoChartInBackground(id) {
  if (pendingCoinGeckoChartRefreshes.has(id)) return pendingCoinGeckoChartRefreshes.get(id);
  const refresh = (async () => {
    try {
      const chart = await fetchCoinGeckoChartWithRetries(id);
      const store = readCoinGeckoChartStore();
      const record = sanitizeStoredCoinGeckoChart({
        id,
        prices: chart.prices,
        totalVolumes: chart.totalVolumes,
        marketCaps: chart.marketCaps,
        updatedAt: chart.updatedAt,
        cachedAt: Date.now(),
      });
      if (record) {
        store[id] = record;
        writeCoinGeckoChartStore(store);
      }
      return record;
    } finally {
      pendingCoinGeckoChartRefreshes.delete(id);
    }
  })();
  pendingCoinGeckoChartRefreshes.set(id, refresh);
  refresh.catch(() => {});
  return refresh;
}

function startCoinGeckoChartPreloader() {
  if (!COINGECKO_CHART_PRELOAD_ENABLED || coingeckoChartPreloadTimer) return;
  setTimeout(() => {
    runCoinGeckoChartPreloadCycle("startup").catch((error) => {
      coingeckoChartPreloadState.lastError = error.message || "CoinGecko preload startup failed";
    });
  }, 1000).unref?.();
  coingeckoChartPreloadTimer = setInterval(() => {
    runCoinGeckoChartPreloadCycle("interval").catch((error) => {
      coingeckoChartPreloadState.lastError = error.message || "CoinGecko preload interval failed";
    });
  }, COINGECKO_CHART_PRELOAD_INTERVAL_MS);
  coingeckoChartPreloadTimer.unref?.();
}

async function runCoinGeckoChartPreloadCycle(trigger = "manual") {
  if (coingeckoChartPreloadState.running) {
    coingeckoChartPreloadState.lastError = "Previous CoinGecko preload cycle is still running";
    return coingeckoChartPreloadState.lastResult;
  }
  coingeckoChartPreloadState.running = true;
  coingeckoChartPreloadState.cycle += 1;
  coingeckoChartPreloadState.lastStartedAt = new Date().toISOString();
  coingeckoChartPreloadState.lastError = null;

  const result = {
    trigger,
    refreshed: 0,
    freshCache: 0,
    staleCache: 0,
    failed: 0,
    failedIds: [],
  };

  try {
    for (const id of COINGECKO_CHART_PRELOAD_IDS) {
      try {
        const chart = await getCoinGeckoChartWorkflow(id);
        if (chart.cacheStatus === "refreshed") result.refreshed += 1;
        else if (chart.cacheStatus === "fresh-cache") result.freshCache += 1;
        else if (chart.cacheStatus === "stale-cache") result.staleCache += 1;
      } catch (error) {
        result.failed += 1;
        result.failedIds.push({ id, error: error.message || "chart preload failed" });
      }
      if (COINGECKO_CHART_PRELOAD_STAGGER_MS > 0) await wait(COINGECKO_CHART_PRELOAD_STAGGER_MS);
    }
    coingeckoChartPreloadState.lastResult = result;
    coingeckoChartPreloadState.lastCompletedAt = new Date().toISOString();
    coingeckoChartPreloadState.lastError = result.failed ? `${result.failed} CoinGecko chart preload requests failed` : null;
    return result;
  } finally {
    coingeckoChartPreloadState.running = false;
  }
}

async function fetchCoinGeckoChartWithRetries(id) {
  const targetUrl = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=1`;
  let lastError = null;
  const attempts = Math.max(1, COINGECKO_CHART_RETRIES + 1);
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const payload = await fetchMarketProxyJson(targetUrl);
      const prices = normalizeChartRows(payload.prices);
      if (prices.length < 2) throw new Error("CoinGecko returned an empty chart");
      return {
        prices,
        totalVolumes: normalizeChartRows(payload.total_volumes),
        marketCaps: normalizeChartRows(payload.market_caps),
        updatedAt: timestampFromChartRows(payload.prices) || new Date().toISOString(),
      };
    } catch (error) {
      lastError = error;
      if (attempt < attempts - 1) await wait(250 * (attempt + 1));
    }
  }
  throw lastError || new Error("CoinGecko chart request failed");
}

function readCoinGeckoChartStore() {
  try {
    const parsed = JSON.parse(fs.readFileSync(COINGECKO_CHART_STORE_PATH, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed;
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

function writeCoinGeckoChartStore(store) {
  fs.mkdirSync(path.dirname(COINGECKO_CHART_STORE_PATH), { recursive: true });
  fs.writeFileSync(COINGECKO_CHART_STORE_PATH, JSON.stringify(store, null, 2));
}

function sanitizeStoredCoinGeckoChart(input = {}) {
  const id = String(input.id || "").trim().toLowerCase();
  const prices = normalizePriceList(input.prices);
  if (!isAllowedCoinGeckoId(id) || prices.length < 2) return null;
  return {
    id,
    prices,
    totalVolumes: normalizePriceList(input.totalVolumes),
    marketCaps: normalizePriceList(input.marketCaps),
    updatedAt: safeText(input.updatedAt, 40) || new Date().toISOString(),
    cachedAt: finiteNumber(input.cachedAt) || Date.now(),
  };
}

function normalizeChartRows(rows) {
  if (!Array.isArray(rows)) return [];
  return normalizePriceList(rows.map((row) => (Array.isArray(row) ? row[1] : row)));
}

function normalizePriceList(values) {
  if (!Array.isArray(values)) return [];
  return values.map((value) => Number(value)).filter(Number.isFinite);
}

function timestampFromChartRows(rows) {
  const latestTimestamp = Array.isArray(rows) ? finiteNumber(rows.at(-1)?.[0]) : null;
  if (!latestTimestamp) return "";
  return new Date(latestTimestamp).toISOString();
}

function isAllowedCoinGeckoId(id) {
  return /^[a-z0-9-]{2,120}$/.test(String(id || ""));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isAllowedMarketProxyUrl(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    if (parsed.protocol !== "https:") return false;
    if (parsed.origin === "https://api.coingecko.com") return parsed.pathname.startsWith("/api/v3/");
    if (parsed.origin === "https://api.dexscreener.com") {
      return parsed.pathname.startsWith("/latest/dex/")
        || parsed.pathname.startsWith("/token-pairs/v1/")
        || parsed.pathname.startsWith("/tokens/v1/");
    }
    if (parsed.origin === "https://api.geckoterminal.com") return parsed.pathname.startsWith("/api/v2/");
    if (parsed.origin === "https://office.viciswap.io") return parsed.pathname.startsWith("/vs2/api/coins");
    if (parsed.origin === "https://api.binance.com") return parsed.pathname.startsWith("/api/v3/");
    if (parsed.origin === "https://api.exchange.coinbase.com") return parsed.pathname.startsWith("/products/");
    if (parsed.origin === "https://min-api.cryptocompare.com") return parsed.pathname.startsWith("/data/");
    if (parsed.origin === "https://api.gdeltproject.org") return parsed.pathname.startsWith("/api/v2/doc/doc");
    return false;
  } catch {
    return false;
  }
}

function cacheControlForPath(filePath) {
  return path.basename(filePath) === "index.html"
    ? "no-store"
    : "public, max-age=3600";
}

function statusForBundleResult(result) {
  if (result?.ok !== false) return 200;
  if (result.code === "NETWORK_NOT_SUPPORTED_IN_BETA") return 400;
  if (result.code === "ELIGIBILITY_SOURCE_UNAVAILABLE") return 503;
  if (result.code === "LIQUIDITY_SOURCE_UNAVAILABLE") return 503;
  if (result.code === "INSUFFICIENT_LIQUIDITY_FOR_RISK") return 422;
  return 500;
}

function isTruthy(value) {
  return value === true || String(value || "").toLowerCase() === "true";
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });
    request.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    request.on("error", reject);
  });
}

module.exports = {
  createServer,
  handleRequest,
  handleServerError,
  serveStaticAsset,
  startServer,
  server,
};
