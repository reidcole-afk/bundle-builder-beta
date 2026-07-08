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
const { createSubmittedBundleRepository } = require("./bundle-store");
const { createProfileRepository } = require("./profile-store");
const { createPulseSnapshotRepository } = require("./pulse-snapshot-store");
const { createChartCacheRepository } = require("./chart-cache-store");

const PORT = Number(process.env.PORT || 8788);
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = path.resolve(process.env.PUBLIC_DIR || path.join(__dirname, "..", "public"));
const COINGECKO_CHART_STORE_PATH = path.resolve(
  process.env.BUNDLE_BUILDER_CHART_CACHE_FILE
    || path.join(process.env.BUNDLE_BUILDER_DATA_DIR || path.join(os.tmpdir(), "bundle-builder-beta"), "coingecko-charts.json"),
);
const COINGECKO_CHART_CACHE_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_CHART_CACHE_MS || 1000 * 60 * 30);
const COINGECKO_CHART_STALE_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_CHART_STALE_MS || 1000 * 60 * 60 * 12);
const COINGECKO_CHART_RETRIES = Number(process.env.BUNDLE_BUILDER_COINGECKO_CHART_RETRIES || 2);
const COINGECKO_CHART_PRELOAD_INTERVAL_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_INTERVAL_MS || 1000 * 60 * 60 * 6);
const COINGECKO_CHART_PRELOAD_STARTUP_DELAY_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_STARTUP_DELAY_MS || 1000 * 180);
const COINGECKO_CHART_PRELOAD_STAGGER_MS = Number(process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_STAGGER_MS || 3000);
const COINGECKO_CHART_PRELOAD_ENABLED = process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_ENABLED === "true";
const COINGECKO_API_BASE_URL = process.env.COINGECKO_API_BASE_URL || "https://api.coingecko.com/api/v3";
const MARKET_CHART_CACHE_MS = Number(process.env.BUNDLE_BUILDER_MARKET_CHART_CACHE_MS || 1000 * 60 * 10);
const MARKET_CHART_STALE_MS = Number(process.env.BUNDLE_BUILDER_MARKET_CHART_STALE_MS || 1000 * 60 * 60 * 2);
const MARKET_CHART_TIMEOUT_MS = Number(process.env.BUNDLE_BUILDER_MARKET_CHART_TIMEOUT_MS || 9000);
const PULSE_COLLECTOR_ENABLED = process.env.BUNDLE_BUILDER_PULSE_COLLECTOR_ENABLED !== "false";
const PULSE_COLLECTOR_INTERVAL_MS = Number(process.env.BUNDLE_BUILDER_PULSE_COLLECTOR_INTERVAL_MS || 1000 * 60 * 10);
const PULSE_COLLECTOR_STARTUP_DELAY_MS = Number(process.env.BUNDLE_BUILDER_PULSE_COLLECTOR_STARTUP_DELAY_MS || 1000 * 150);
const PULSE_COLLECTOR_DECK_SIZE = clampInteger(process.env.BUNDLE_BUILDER_PULSE_COLLECTOR_DECK_SIZE, 1, 10, 8);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.BUNDLE_BUILDER_OPENAI_API_KEY || "";
const PULSE_ANALYST_MODEL = process.env.BUNDLE_BUILDER_PULSE_ANALYST_MODEL || "gpt-4.1-mini";
const PULSE_ANALYST_CACHE_MS = Number(process.env.BUNDLE_BUILDER_PULSE_ANALYST_CACHE_MS || 1000 * 60 * 10);
const PULSE_ANALYST_TIMEOUT_MS = Number(process.env.BUNDLE_BUILDER_PULSE_ANALYST_TIMEOUT_MS || 8000);
const IS_PRODUCTION_RUNTIME = process.env.NODE_ENV === "production" || Boolean(process.env.RENDER);
const ADMIN_SECRET = process.env.BUNDLE_BUILDER_ADMIN_SECRET || "";
const AUTH_SECRET_CONFIGURED = Boolean(process.env.BUNDLE_BUILDER_AUTH_SECRET);
const ADMIN_SECRET_CONFIGURED = Boolean(ADMIN_SECRET);
const rateLimitStore = new Map();
const submittedBundleRepository = createSubmittedBundleRepository();
const profileRepository = createProfileRepository();
const pulseSnapshotRepository = createPulseSnapshotRepository();
const chartCacheRepository = createChartCacheRepository({ filePath: COINGECKO_CHART_STORE_PATH });
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
const COINGECKO_CHART_PRELOAD_DAYS = parseCoinGeckoPreloadDays(process.env.BUNDLE_BUILDER_COINGECKO_PRELOAD_DAYS);
const CATALYST_CACHE_MS = Number(process.env.BUNDLE_BUILDER_CATALYST_CACHE_MS || 1000 * 60 * 10);
const CATALYST_FETCH_TIMEOUT_MS = Number(process.env.BUNDLE_BUILDER_CATALYST_TIMEOUT_MS || 5000);
const coingeckoChartPreloadState = {
  enabled: COINGECKO_CHART_PRELOAD_ENABLED,
  running: false,
  cycle: 0,
  idCount: COINGECKO_CHART_PRELOAD_IDS.length,
  dayWindows: COINGECKO_CHART_PRELOAD_DAYS,
  lastStartedAt: null,
  lastCompletedAt: null,
  lastError: null,
  lastResult: null,
};
let coingeckoChartPreloadTimer = null;
let pulseCollectorTimer = null;
const pulseCollectorState = {
  enabled: PULSE_COLLECTOR_ENABLED,
  running: false,
  intervalMs: PULSE_COLLECTOR_INTERVAL_MS,
  deckSize: PULSE_COLLECTOR_DECK_SIZE,
  watchlistSize: 0,
  cycle: 0,
  lastStartedAt: null,
  lastCompletedAt: null,
  lastError: null,
  lastSnapshotAt: null,
  lastSnapshotId: null,
  lastCoins: [],
  lastAttempted: 0,
  lastEligible: 0,
  lastSkipped: [],
  lastWakeList: [],
};
const pendingCoinGeckoChartRefreshes = new Map();
const marketChartCache = new Map();
const catalystCache = new Map();
const pulseAnalystCache = new Map();
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
    if (!checkRouteRateLimit(request, response, url)) return;

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
        normalizedMarketChartEndpoint: true,
        coingeckoApiKeyConfigured: Boolean(process.env.COINGECKO_API_KEY || process.env.CG_API_KEY),
        catalystIntelligenceEndpoint: true,
        pulseAnalystEndpoint: true,
        pulseAnalystModel: PULSE_ANALYST_MODEL,
        pulseAnalystOpenAiConfigured: Boolean(OPENAI_API_KEY),
        profileAuthEndpoint: true,
        productionSafety: productionSafetyDescriptor(),
        productionReadiness: productionReadinessDescriptor(),
        profileStorage: profileRepository.descriptor(),
        machineAccuracyEndpoint: true,
        pulseSnapshotStorage: pulseSnapshotRepository.descriptor(),
        chartCacheStorage: chartCacheRepository.descriptor(),
        coingeckoChartBackgroundPreload: {
          enabled: COINGECKO_CHART_PRELOAD_ENABLED,
          intervalMs: COINGECKO_CHART_PRELOAD_INTERVAL_MS,
          startupDelayMs: COINGECKO_CHART_PRELOAD_STARTUP_DELAY_MS,
          idCount: COINGECKO_CHART_PRELOAD_IDS.length,
          dayWindows: COINGECKO_CHART_PRELOAD_DAYS,
        },
        pulseBackgroundCollector: pulseCollectorState,
        homepage: {
          enabled: true,
          publicDirExists: fs.existsSync(PUBLIC_DIR),
          indexExists: fs.existsSync(path.join(PUBLIC_DIR, "index.html")),
        },
        betaScope: "invite-only Base beta by default",
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/healthz") {
      sendJson(response, 200, {
        ok: true,
        service: "bundle-builder-api",
        version: API_VERSION,
        uptimeSeconds: Math.round(process.uptime()),
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/coingecko-chart/status") {
      sendJson(response, 200, {
        ok: true,
        cacheFile: COINGECKO_CHART_STORE_PATH,
        storage: chartCacheRepository.descriptor(),
        cacheMs: COINGECKO_CHART_CACHE_MS,
        staleMs: COINGECKO_CHART_STALE_MS,
        preload: coingeckoChartPreloadState,
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/pulse-snapshots/export") {
      if (!requireAdmin(request, response)) return;
      const limit = clampInteger(url.searchParams.get("limit"), 1, 6000, 6000);
      const exportData = await pulseSnapshotRepository.exportData({ limit });
      const fileDate = new Date().toISOString().slice(0, 10);
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="bundle-builder-pulse-snapshots-${fileDate}.json"`,
        "Cache-Control": "no-store",
      });
      response.end(JSON.stringify(exportData, null, 2));
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/market-chart") {
      try {
        const chart = await getNormalizedMarketChart({
          id: url.searchParams.get("id"),
          chainId: url.searchParams.get("chainId") || url.searchParams.get("chainid"),
          pairAddress: url.searchParams.get("pairAddress") || url.searchParams.get("pair"),
          window: url.searchParams.get("window") || url.searchParams.get("range"),
          source: url.searchParams.get("source") || url.searchParams.get("prefer"),
          force: isTruthy(url.searchParams.get("force")),
        });
        sendJson(response, 200, {
          ok: true,
          ...chart,
        });
      } catch (error) {
        sendJson(response, error.statusCode || 502, {
          ok: false,
          error: error.message || "Market chart unavailable",
        });
      }
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/coingecko-chart") {
      const id = String(url.searchParams.get("id") || "").trim().toLowerCase();
      const days = normalizeCoinGeckoChartDays(url.searchParams.get("days"));
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
          days,
        });
        sendJson(response, 200, {
          ok: true,
          id,
          days,
          source: "coingecko-chart-workflow",
          cacheStatus: chart.cacheStatus,
          stale: String(chart.cacheStatus || "").startsWith("stale-"),
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

    if (url.pathname === "/api/v1/pulse-analyst") {
      if (request.method !== "POST") {
        sendJson(response, 405, { ok: false, error: "Method not allowed" });
        return;
      }
      const body = await readJsonBody(request);
      const analysis = await getPulseAnalystRead(body);
      sendJson(response, 200, {
        ok: true,
        ...analysis,
      });
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
        if (!requireAdmin(request, response)) return;
        const limit = clampInteger(url.searchParams.get("limit"), 1, submittedBundleRepository.limit, 100);
        const records = submittedBundleRepository.list({ limit });
        sendJson(response, 200, {
          ok: true,
          count: records.length,
          storage: submittedBundleRepository.descriptor(),
          bundles: records,
        });
        return;
      }

      if (request.method === "POST") {
        const body = await readJsonBody(request);
        try {
          const record = submittedBundleRepository.upsert(body);
          sendJson(response, 201, {
            ok: true,
            storage: submittedBundleRepository.descriptor(),
            bundle: record,
          });
        } catch (error) {
          if (error.code !== "EMPTY_BUNDLE") throw error;
          sendJson(response, 400, {
            ok: false,
            error: "Submitted bundle must include at least one coin.",
          });
        }
        return;
      }

      sendJson(response, 405, { ok: false, error: "Method not allowed" });
      return;
    }

    if (url.pathname === "/api/v1/pulse-snapshots") {
      if (request.method === "GET") {
        if (!requireAdmin(request, response)) return;
        const limit = clampInteger(url.searchParams.get("limit"), 1, 600, 50);
        const snapshots = await pulseSnapshotRepository.listSnapshots({ limit });
        sendJson(response, 200, {
          ok: true,
          count: snapshots.length,
          storage: pulseSnapshotRepository.descriptor(),
          snapshots,
          accuracy: isTruthy(url.searchParams.get("includeAccuracy"))
            ? await pulseSnapshotRepository.accuracySummary({
              limit: clampInteger(url.searchParams.get("accuracyLimit"), 24, 6000, 600),
            })
            : null,
        });
        return;
      }

      if (request.method === "POST") {
        if (!requireAdmin(request, response)) return;
        const body = await readJsonBody(request);
        try {
          const snapshot = await pulseSnapshotRepository.saveSnapshot(body);
          sendJson(response, 201, {
            ok: true,
            storage: pulseSnapshotRepository.descriptor(),
            snapshot,
            accuracy: isTruthy(url.searchParams.get("includeAccuracy"))
              ? await pulseSnapshotRepository.accuracySummary({
                limit: clampInteger(url.searchParams.get("accuracyLimit"), 24, 6000, 600),
              })
              : null,
          });
        } catch (error) {
          if (error.code !== "EMPTY_PULSE_SNAPSHOT") throw error;
          sendJson(response, 400, {
            ok: false,
            error: "Pulse snapshot must include at least one coin.",
          });
        }
        return;
      }

      sendJson(response, 405, { ok: false, error: "Method not allowed" });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/machine-accuracy") {
      if (!requireAdmin(request, response)) return;
      const limit = clampInteger(url.searchParams.get("limit"), 24, 6000, 1000);
      sendJson(response, 200, {
        ok: true,
        storage: pulseSnapshotRepository.descriptor(),
        collector: pulseCollectorState,
        accuracy: await pulseSnapshotRepository.accuracySummary({ limit }),
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/internal-dashboard") {
      if (!requireAdmin(request, response)) return;
      const limit = clampInteger(url.searchParams.get("limit"), 24, 6000, 1600);
      const [snapshots, accuracy] = await Promise.all([
        pulseSnapshotRepository.listSnapshots({ limit }),
        pulseSnapshotRepository.accuracySummary({ limit }),
      ]);
      sendJson(response, 200, {
        ok: true,
        storage: pulseSnapshotRepository.descriptor(),
        collector: pulseCollectorState,
        dashboard: buildInternalAccuracyDashboard(snapshots, accuracy),
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/wake-up-review") {
      if (!requireAdmin(request, response)) return;
      const limit = clampInteger(url.searchParams.get("limit"), 24, 6000, 1200);
      const snapshots = await pulseSnapshotRepository.listSnapshots({ limit });
      sendJson(response, 200, {
        ok: true,
        storage: pulseSnapshotRepository.descriptor(),
        review: buildWakeUpReview(snapshots),
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/market-health") {
      const limit = clampInteger(url.searchParams.get("limit"), 24, 5000, 288);
      const snapshots = await pulseSnapshotRepository.listSnapshots({ limit });
      sendJson(response, 200, {
        ok: true,
        storage: pulseSnapshotRepository.descriptor(),
        context: buildMarketHealthContext(snapshots),
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/pulse-collector/status") {
      const includeAccuracy = isTruthy(url.searchParams.get("includeAccuracy"));
      sendJson(response, 200, {
        ok: true,
        collector: pulseCollectorState,
        storage: pulseSnapshotRepository.descriptor(),
        accuracy: includeAccuracy
          ? await pulseSnapshotRepository.accuracySummary({
            limit: clampInteger(url.searchParams.get("accuracyLimit"), 24, 6000, 600),
          })
          : null,
      });
      return;
    }

    if (url.pathname === "/api/v1/auth/request-code") {
      if (request.method !== "POST") {
        sendJson(response, 405, { ok: false, error: "Method not allowed" });
        return;
      }
      const body = await readJsonBody(request);
      try {
        const login = await profileRepository.requestLoginCode(body.email);
        if (emailDeliveryMode() === "provider") {
          await sendLoginCodeEmail(login);
        }
        const payload = {
          ok: true,
          email: login.email,
          expiresAt: login.expiresAt,
          delivery: emailDeliveryMode(),
          message: emailDeliveryMode() === "dev-response"
            ? "Dev mode: use the returned code to finish login."
            : "Check your email for the login code.",
        };
        if (emailDeliveryMode() === "dev-response") payload.devCode = login.code;
        sendJson(response, 200, payload);
      } catch (error) {
        if (error.code !== "INVALID_EMAIL") throw error;
        sendJson(response, 400, { ok: false, error: error.message });
      }
      return;
    }

    if (url.pathname === "/api/v1/auth/verify-code") {
      if (request.method !== "POST") {
        sendJson(response, 405, { ok: false, error: "Method not allowed" });
        return;
      }
      const body = await readJsonBody(request);
      try {
        const session = await profileRepository.verifyLoginCode(body.email, body.code);
        sendJson(response, 200, {
          ok: true,
          token: session.token,
          profile: session.profile,
        });
      } catch (error) {
        if (error.code !== "INVALID_LOGIN_CODE") throw error;
        sendJson(response, 400, { ok: false, error: error.message });
      }
      return;
    }

    if (url.pathname === "/api/v1/profile") {
      const token = bearerToken(request);
      const profile = await profileRepository.profileForToken(token);
      if (!profile) {
        sendJson(response, 401, { ok: false, error: "Profile login required." });
        return;
      }

      if (request.method === "GET") {
        sendJson(response, 200, {
          ok: true,
          storage: profileRepository.descriptor(),
          profile,
        });
        return;
      }

      if (request.method === "PUT") {
        const body = await readJsonBody(request);
        const savedProfile = await profileRepository.saveProfileSnapshot(token, body);
        sendJson(response, 200, {
          ok: true,
          storage: profileRepository.descriptor(),
          profile: savedProfile,
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
        routes: ["GET /health", "GET /api/v1/tokens", "GET /api/v1/market-chart", "GET /api/v1/coingecko-chart", "GET /api/v1/catalyst", "POST /api/v1/pulse-analyst", "GET /api/v1/machine-accuracy", "GET /api/v1/internal-dashboard", "GET /api/v1/wake-up-review", "GET /api/v1/market-health", "GET /api/v1/pulse-collector/status", "GET /api/v1/pulse-snapshots/export", "POST /api/v1/auth/request-code", "POST /api/v1/auth/verify-code", "GET|PUT /api/v1/profile", "GET|POST /api/v1/bundle", "GET|POST /api/v1/submitted-bundles", "GET|POST /api/v1/pulse-snapshots"],
    });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error.message || "Unexpected API error",
    });
  }
}

function startServer(serverInstance = server) {
  validateProductionSafety();
  if (process.exitCode) return;
  serverInstance.on("error", handleServerError);
  serverInstance.listen(PORT, HOST, () => {
    console.log(`Bundle Builder API listening on http://${HOST}:${PORT}`);
    startCoinGeckoChartPreloader();
    startPulseSnapshotCollector();
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
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.setHeader("Access-Control-Max-Age", "86400");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
}

function bearerToken(request) {
  const header = String(request.headers.authorization || "");
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

function emailDeliveryMode() {
  return process.env.BUNDLE_BUILDER_EMAIL_DELIVERY === "provider" ? "provider" : "dev-response";
}

function productionSafetyDescriptor() {
  return {
    productionRuntime: IS_PRODUCTION_RUNTIME,
    authSecretConfigured: AUTH_SECRET_CONFIGURED,
    adminSecretConfigured: ADMIN_SECRET_CONFIGURED,
    emailDelivery: emailDeliveryMode(),
    devLoginCodesEnabled: emailDeliveryMode() === "dev-response",
    adminProtectedEndpoints: true,
    rateLimiting: true,
  };
}

function productionReadinessDescriptor() {
  const snapshotStorage = pulseSnapshotRepository.descriptor();
  const chartStorage = chartCacheRepository.descriptor();
  const profileStorage = profileRepository.descriptor();
  const warnings = [];
  if (!snapshotStorage.durable) warnings.push("Pulse snapshots are not using durable Postgres storage.");
  if (!chartStorage.durable) warnings.push("Chart cache is not using durable Postgres storage.");
  if (!OPENAI_API_KEY) warnings.push("OPENAI_API_KEY is not set; LLM info will use local fallback text.");
  if (COINGECKO_CHART_PRELOAD_ENABLED) warnings.push("CoinGecko background preload is enabled; monitor Render memory and external API rate limits.");
  if (!profileStorage.durable && IS_PRODUCTION_RUNTIME) warnings.push("Profile snapshots are still stored on the Render filesystem.");
  return {
    ok: warnings.length === 0,
    databaseUrlConfigured: Boolean(process.env.DATABASE_URL || process.env.BUNDLE_BUILDER_DATABASE_URL),
    openAiConfigured: Boolean(OPENAI_API_KEY),
    coingeckoPreloadEnabled: COINGECKO_CHART_PRELOAD_ENABLED,
    pulseCollectorIntervalMs: PULSE_COLLECTOR_INTERVAL_MS,
    pulseCollectorDeckSize: PULSE_COLLECTOR_DECK_SIZE,
    warnings,
  };
}

function validateProductionSafety() {
  if (!IS_PRODUCTION_RUNTIME) return;
  const missing = [];
  if (!AUTH_SECRET_CONFIGURED) missing.push("BUNDLE_BUILDER_AUTH_SECRET");
  if (!ADMIN_SECRET_CONFIGURED) missing.push("BUNDLE_BUILDER_ADMIN_SECRET");
  if (emailDeliveryMode() !== "provider") missing.push("BUNDLE_BUILDER_EMAIL_DELIVERY=provider");
  if (emailDeliveryMode() === "provider" && !process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!missing.length) return;
  console.error(`Bundle Builder refused to start with unsafe production auth settings. Missing: ${missing.join(", ")}`);
  process.exitCode = 1;
}

function requireAdmin(request, response) {
  if (!ADMIN_SECRET_CONFIGURED && !IS_PRODUCTION_RUNTIME) return true;
  const provided = adminSecretFromRequest(request);
  if (provided && safeEqual(provided, ADMIN_SECRET)) return true;
  sendJson(response, 401, {
    ok: false,
    error: "Admin access required.",
  });
  return false;
}

function adminSecretFromRequest(request) {
  const headerSecret = String(request.headers["x-bundle-builder-admin-secret"] || "").trim();
  if (headerSecret) return headerSecret;
  return bearerToken(request);
}

function safeEqual(leftValue, rightValue) {
  const crypto = require("node:crypto");
  const left = Buffer.from(String(leftValue || ""));
  const right = Buffer.from(String(rightValue || ""));
  return left.length === right.length && left.length > 0 && crypto.timingSafeEqual(left, right);
}

function checkRouteRateLimit(request, response, url) {
  const rule = rateLimitRuleFor(request, url);
  if (!rule) return true;
  const key = `${rule.name}:${clientIp(request)}:${rateLimitSubject(request, rule)}`;
  const now = Date.now();
  const bucket = rateLimitStore.get(key) || { resetAt: now + rule.windowMs, count: 0 };
  if (bucket.resetAt <= now) {
    bucket.resetAt = now + rule.windowMs;
    bucket.count = 0;
  }
  bucket.count += 1;
  rateLimitStore.set(key, bucket);
  pruneRateLimitStore(now);
  if (bucket.count <= rule.limit) return true;
  response.setHeader("Retry-After", String(Math.ceil((bucket.resetAt - now) / 1000)));
  sendJson(response, 429, {
    ok: false,
    error: "Too many requests. Please wait and try again.",
  });
  return false;
}

function rateLimitRuleFor(request, url) {
  if (request.method === "POST" && url.pathname === "/api/v1/auth/request-code") return { name: "auth-request", limit: 5, windowMs: 15 * 60 * 1000 };
  if (request.method === "POST" && url.pathname === "/api/v1/auth/verify-code") return { name: "auth-verify", limit: 10, windowMs: 15 * 60 * 1000 };
  if (request.method === "POST" && url.pathname === "/api/v1/pulse-analyst") return { name: "pulse-analyst", limit: 40, windowMs: 10 * 60 * 1000 };
  if (request.method === "POST" && url.pathname === "/api/v1/submitted-bundles") return { name: "bundle-submit", limit: 20, windowMs: 10 * 60 * 1000 };
  if (request.method === "POST" && url.pathname === "/api/v1/pulse-snapshots") return { name: "pulse-snapshot-write", limit: 60, windowMs: 10 * 60 * 1000 };
  if (request.method === "PUT" && url.pathname === "/api/v1/profile") return { name: "profile-write", limit: 60, windowMs: 10 * 60 * 1000 };
  if (request.method === "GET" && url.pathname === "/api/v1/market-chart") return { name: "market-chart-read", limit: 120, windowMs: 10 * 60 * 1000 };
  if (request.method === "GET" && url.pathname === "/api/v1/coingecko-chart") return { name: "coingecko-chart-read", limit: 80, windowMs: 10 * 60 * 1000 };
  if (request.method === "GET" && url.pathname === "/api/v1/catalyst") return { name: "catalyst-read", limit: 80, windowMs: 10 * 60 * 1000 };
  if (request.method === "GET" && url.pathname === "/api/v1/market-health") return { name: "market-health-read", limit: 90, windowMs: 10 * 60 * 1000 };
  if (request.method === "GET" && url.pathname === "/api/v1/pulse-collector/status") return { name: "collector-status-read", limit: 60, windowMs: 10 * 60 * 1000 };
  return null;
}

function rateLimitSubject(request, rule) {
  if (rule.name.startsWith("auth-")) return String(request.headers["x-bundle-builder-email"] || "email").toLowerCase();
  return "route";
}

function clientIp(request) {
  return String(request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "local").split(",")[0].trim();
}

function pruneRateLimitStore(now) {
  if (rateLimitStore.size < 1000) return;
  for (const [key, bucket] of rateLimitStore.entries()) {
    if (bucket.resetAt <= now) rateLimitStore.delete(key);
  }
}

async function sendLoginCodeEmail(login) {
  const provider = String(process.env.BUNDLE_BUILDER_EMAIL_PROVIDER || "resend").toLowerCase();
  if (provider !== "resend") throw new Error(`Unsupported email provider: ${provider}`);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BUNDLE_BUILDER_EMAIL_FROM || "Bundle Builder <login@bundle.vicicoin.io>";
  if (!apiKey) throw new Error("RESEND_API_KEY is required when BUNDLE_BUILDER_EMAIL_DELIVERY=provider");
  if (typeof fetch !== "function") throw new Error("Node 18+ fetch is required for email delivery");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: login.email,
      subject: "Bundle Builder sign-in code",
      text: buildLoginCodeEmailText(login),
      html: buildLoginCodeEmailHtml(login),
    }),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Email provider failed: HTTP ${response.status}${text ? ` ${text.slice(0, 180)}` : ""}`);
  }
}

function buildLoginCodeEmailText(login) {
  const expiresAt = formatLoginCodeExpiration(login.expiresAt);
  return [
    "You asked to sign in to Bundle Builder.",
    "",
    `Your one-time sign-in code is ${login.code}.`,
    "",
    `It expires ${expiresAt}.`,
    "",
    "This code only works for Bundle Builder. If you did not request it, you can safely ignore this email.",
    "",
    "Bundle Builder beta",
    "https://bundlebuilder.vicicoin.io/",
  ].join("\n");
}

function buildLoginCodeEmailHtml(login) {
  const code = escapeHtml(login.code);
  const expiresAt = escapeHtml(formatLoginCodeExpiration(login.expiresAt));
  const logoUrl = escapeHtml(publicAssetUrl("/assets/vici-logo-email.png"));
  return `<!doctype html>
<html>
  <head>
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
  </head>
  <body style="margin:0;padding:0;background:#f4f7fb;color:#182238;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Your one-time Bundle Builder sign-in code expires soon.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;margin:0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:#ffffff;border:1px solid #d9e3f1;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#141d31;color:#ffffff;padding:22px 26px;">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;padding-right:14px;">
                      <img src="${logoUrl}" width="48" height="48" alt="Bundle Builder" style="display:block;width:48px;height:48px;border-radius:10px;background:#ffffff;border:1px solid rgba(255,255,255,.28);" />
                    </td>
                    <td style="vertical-align:middle;">
                      <div style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#8bd6cc;">ViciSwap Bundle Advisor</div>
                      <div style="font-size:24px;font-weight:800;line-height:1.2;margin-top:6px;">Bundle Builder beta</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 26px 10px;">
                <h1 style="font-size:22px;line-height:1.25;margin:0 0 12px;color:#182238;">Sign in to Bundle Builder</h1>
                <p style="font-size:15px;line-height:1.6;margin:0 0 18px;color:#40506a;">You asked to sign in to your Bundle Builder profile. Enter this one-time code in the app to continue.</p>
                <div style="font-size:34px;font-weight:800;letter-spacing:8px;text-align:center;color:#0f766e;background:#eefbf8;border:1px solid #bdebe3;border-radius:12px;padding:18px 10px;margin:0 0 18px;">${code}</div>
                <p style="font-size:14px;line-height:1.6;margin:0;color:#5c6a81;">This code expires ${expiresAt}.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 26px 26px;">
                <div style="font-size:13px;line-height:1.55;color:#6b7688;background:#f8fafc;border:1px solid #e4ebf5;border-radius:10px;padding:14px 16px;">This code only works for Bundle Builder. If you did not request it, you can safely ignore this email. No changes will be made to your profile.</div>
                <p style="font-size:12px;line-height:1.5;margin:18px 0 0;color:#8792a3;">Bundle Builder beta<br><a href="https://bundlebuilder.vicicoin.io/" style="color:#0f766e;text-decoration:none;">bundlebuilder.vicicoin.io</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function publicAssetUrl(pathname) {
  const base = String(process.env.BUNDLE_BUILDER_PUBLIC_URL || process.env.CORS_ORIGIN || "https://bundlebuilder.vicicoin.io").replace(/\/+$/, "");
  const path = String(pathname || "").startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

function formatLoginCodeExpiration(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "soon";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseCoinGeckoPreloadIds(value) {
  const ids = String(value || "")
    .split(",")
    .map((id) => id.trim().toLowerCase())
    .filter(isAllowedCoinGeckoId);
  return ids.length ? [...new Set(ids)] : DEFAULT_COINGECKO_CHART_PRELOAD_IDS;
}

function parseCoinGeckoPreloadDays(value) {
  const days = String(value || "1,3,7,30")
    .split(",")
    .map(normalizeCoinGeckoChartDays)
    .filter((day) => ["1", "3", "7", "30"].includes(day));
  const unique = [...new Set(days)];
  return unique.length ? unique : ["1", "3", "7", "30"];
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

async function getPulseAnalystRead(body = {}) {
  const packet = normalizePulseAnalystPacket(body);
  const cacheKey = pulseAnalystCacheKey(packet);
  const cached = pulseAnalystCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < PULSE_ANALYST_CACHE_MS) {
    return {
      ...cached.value,
      cacheStatus: "hit",
      cachedAt: new Date(cached.cachedAt).toISOString(),
    };
  }

  let value = buildDeterministicPulseAnalystRead(packet);
  if (OPENAI_API_KEY) {
    try {
      value = await fetchOpenAiPulseAnalystRead(packet, value);
    } catch (error) {
      value = {
        ...value,
        source: "deterministic-fallback",
        warning: `LLM analyst unavailable: ${safeText(error.message, 180)}`,
      };
    }
  }

  pulseAnalystCache.set(cacheKey, { value, cachedAt: Date.now() });
  prunePulseAnalystCache();
  return {
    ...value,
    cacheStatus: "miss",
    cachedAt: new Date().toISOString(),
  };
}

function normalizePulseAnalystPacket(body = {}) {
  const coin = body.coin && typeof body.coin === "object" ? body.coin : body;
  const market = body.marketHealth && typeof body.marketHealth === "object" ? body.marketHealth : {};
  const insights = Array.isArray(body.insights) ? body.insights.slice(0, 8) : [];
  return {
    ticker: safeTicker(coin.ticker || coin.symbol) || "COIN",
    name: safeText(coin.name || coin.ticker || "Selected coin", 80),
    rank: clampInteger(coin.rank, 1, 50, 0),
    source: safeText(coin.source, 80),
    theme: safeText(coin.theme, 40),
    change24h: finiteNumber(coin.change24h ?? coin.price_change_percentage_24h),
    change7d: finiteNumber(coin.change7d ?? coin.price_change_percentage_7d),
    volume24h: finiteNumber(coin.volume24h ?? coin.total_volume),
    liquidityUsd: finiteNumber(coin.liquidityUsd),
    pulseScore: finiteNumber(coin.pulseScore),
    projected24hChange: finiteNumber(coin.projected24hChange),
    reason: safeText(coin.reason, 500),
    setup: sanitizeObject(coin.marketSetup, 12),
    edge: sanitizeObject(coin.marketEdge, 12),
    catalyst: sanitizeObject(coin.newsCatalyst, 12),
    insights: insights.map((item) => ({
      label: safeText(item?.label, 60),
      text: safeText(item?.text, 280),
    })).filter((item) => item.label || item.text),
    marketHealth: {
      score: finiteNumber(market.score),
      label: safeText(market.label, 80),
      summary: safeText(market.summary, 260),
      regime: safeText(market.context?.regime || market.regime, 80),
      flags: Array.isArray(market.context?.flags || market.flags)
        ? (market.context?.flags || market.flags).slice(0, 6).map((flag) => safeText(flag, 60)).filter(Boolean)
        : [],
    },
  };
}

function buildDeterministicPulseAnalystRead(packet = {}) {
  const ticker = packet.ticker || "COIN";
  const setupLabel = packet.setup?.label || packet.edge?.label || "mixed setup";
  const marketLabel = packet.marketHealth?.label || "market context";
  const change = Number.isFinite(packet.change24h) ? packet.change24h : null;
  const projected = Number.isFinite(packet.projected24hChange) ? packet.projected24hChange : null;
  const volumeText = Number.isFinite(packet.volume24h) ? formatCompactUsd(packet.volume24h) : "unconfirmed";
  const liquidityText = Number.isFinite(packet.liquidityUsd) ? formatCompactUsd(packet.liquidityUsd) : "unconfirmed";
  const isDeep = Number.isFinite(packet.liquidityUsd) && packet.liquidityUsd >= 1_000_000;
  const isActive = Number.isFinite(packet.volume24h) && packet.volume24h >= 1_000_000;
  const isRiskOff = /risk.?off|weak|bad|defensive/i.test(`${marketLabel} ${packet.marketHealth?.regime || ""}`);
  const isCooling = Number.isFinite(change) && change < 0;
  const isHot = Number.isFinite(change) && change >= 8;
  const projectedText = Number.isFinite(projected) ? ` The short-term projection is ${formatPercent(projected)}, so the machine is ${projected >= 0 ? "still leaning toward follow-through" : "not giving it much benefit of the doubt yet"}.` : "";
  let headline;
  if (isCooling && isDeep && isActive) {
    headline = `${ticker} is not ranking because the chart is perfect right now. It is ranking because the market is still giving it real depth and real activity while the move cools off. That makes it a constructive watch, not a blind chase.${projectedText}`;
  } else if (isHot && isActive && isDeep) {
    headline = `${ticker} has the kind of upside action the machine is built to notice, but the important question is freshness. Volume and liquidity make the move more believable; the risk is that late buyers are already paying for the easy part.${projectedText}`;
  } else if (isRiskOff && (isActive || isDeep)) {
    headline = `${ticker} is getting credit mostly for quality of market structure. In a weaker tape, the machine is willing to keep liquid names on the board, but it wants confirmation before treating the setup as aggressive upside.${projectedText}`;
  } else {
    headline = `${ticker} is on the board because the current setup has enough activity, depth, and ViciSwap eligibility to deserve attention. The read is ${String(setupLabel).toLowerCase()} inside a ${String(marketLabel).toLowerCase()}, so the next few checks matter more than one headline number.${projectedText}`;
  }
  return {
    source: "deterministic",
    model: null,
    headline,
    points: [
      {
        label: "Summary",
        text: summaryReadText(ticker, packet, { isActive, isDeep, volumeText, liquidityText, setupLabel, marketLabel }),
      },
      {
        label: "Entry strategy",
        text: entryStrategyReadText(ticker, packet, { isCooling, isHot, isRiskOff }),
      },
      {
        label: "Predicted outcome",
        text: `${outcomeReadText(ticker, packet)} ${riskReadText(ticker, packet, { isCooling, isHot, isRiskOff })}`,
      },
    ],
  };
}

function firstInsightText(packet = {}, pattern) {
  return analystSafeText((packet.insights || []).find((item) => pattern.test(`${item.label} ${item.text}`))?.text || "");
}

function analystSafeText(value) {
  return safeText(value, 440)
    .replace(/Wait for the next push before adding size\./gi, "Wait for the next push before treating it as a cleaner entry.")
    .replace(/Add only if/gi, "Only trust the signal if")
    .replace(/Do not add into weakness/gi, "Do not treat weakness as confirmation")
    .replace(/consider trimming/gi, "recheck whether the signal is breaking down");
}

function rewriteReasonAsAnalystRead(ticker, reason) {
  const clean = safeText(reason, 300);
  if (!clean) return `${ticker} is on the board because its ranking inputs are holding up better than most eligible alternatives.`;
  return clean
    .replace(new RegExp(`^${ticker}\\s+is\\s+`, "i"), `${ticker} is `)
    .replace(/\bIt is filtered to Base and the ViciSwap Receive list\.\s*/i, "")
    .replace(/\bData edge:\s*/i, "The useful part is ")
    .replace(/\bSetup read:\s*/i, "The setup read is ")
    .trim();
}

function summaryReadText(ticker, packet, context = {}) {
  const scores = compactInsightScores(packet);
  const changeText = Number.isFinite(packet.change24h) ? `${formatPercent(packet.change24h)} 24h` : "24h move refreshing";
  const scoreText = scores ? `${scores}. ` : "";
  const structureText = context.isActive && context.isDeep
    ? `${context.volumeText} volume and ${context.liquidityText} liquidity make the signal meaningful.`
    : confirmationReadText(ticker, packet, context);
  return `${ticker} is a ${String(context.setupLabel || "mixed setup").toLowerCase()} in a ${String(context.marketLabel || "market").toLowerCase()}: ${changeText}. ${scoreText}${structureText}`.trim();
}

function compactInsightScores(packet = {}) {
  const labels = (packet.insights || [])
    .map((item) => safeText(item.label, 80))
    .filter((label) => /timing|execution|conviction/i.test(label))
    .slice(0, 3);
  return labels.length ? labels.join(" / ") : "";
}

function confirmationReadText(ticker, packet, context = {}) {
  const timing = firstInsightText(packet, /timing|market read|conviction/i);
  if (context.isActive && context.isDeep) {
    return `${ticker} has enough volume and liquidity for the signal to mean something: ${context.volumeText} of 24h volume against ${context.liquidityText} of liquidity. ${timing || "That does not make it automatically bullish, but it reduces the chance that the rank is coming from a thin, easy-to-distort move."}`;
  }
  if (context.isActive) {
    return `${ticker} has trading activity, which is the first thing the machine wants to see. The weaker part is depth, so the signal still needs route quality and exit liquidity to confirm.`;
  }
  if (context.isDeep) {
    return `${ticker} has usable liquidity, which helps execution. The missing confirmation is fresh activity; without stronger volume, the coin can look stable without actually being ready to move.`;
  }
  return timing || `${ticker} needs stronger volume and cleaner depth before the machine should treat this as more than an early watchlist read.`;
}

function riskReadText(ticker, packet, context = {}) {
  const execution = firstInsightText(packet, /execution|entry|risk/i);
  if (context.isHot) {
    return `${ticker} may already be late in the move. The machine can respect momentum, but if the next checks show fading volume or lower rank, this starts looking like chase risk instead of early strength.`;
  }
  if (context.isCooling) {
    return `${ticker} is cooling off, so the ranking depends on whether buyers defend the pullback. If volume dries up while price keeps sliding, this should lose credit quickly.`;
  }
  if (context.isRiskOff) {
    return `${ticker} is being judged in a weaker market. That means the bar is higher: good liquidity is helpful, but the machine should not overpay for a name just because it is the least bad option.`;
  }
  return execution || `The main risk is false confirmation: the coin can look good for one snapshot, then fail if volume, liquidity, or rank improvement does not persist.`;
}

function entryStrategyReadText(ticker, packet, context = {}) {
  const entry = firstInsightText(packet, /entry|timing/i);
  if (entry) return entry;
  if (context.isHot) {
    return `${ticker} is not a clean chase setup. If the move keeps working, the cleaner signal would be a controlled pullback or another volume push, not a late vertical candle.`;
  }
  if (context.isCooling) {
    return `${ticker} should be treated as a wait-for-confirmation setup. The cleaner entry case is stabilization first, then renewed volume or rank improvement.`;
  }
  if (context.isRiskOff) {
    return `${ticker} needs a higher bar in this market. A reasonable entry read would require price to stop leaking while liquidity and volume stay intact.`;
  }
  return `${ticker} looks more like a measured-entry candidate than an urgent chase. The next useful confirmation is volume holding while price structure improves.`;
}

function outcomeReadText(ticker, packet) {
  const projected = Number.isFinite(packet.projected24hChange) ? packet.projected24hChange : null;
  const hold = firstInsightText(packet, /hold|watch|conviction/i);
  if (Number.isFinite(projected) && projected > 1) {
    return `${ticker} has a constructive near-term path if the next checks confirm. The machine is projecting ${formatPercent(projected)} over the next 24h, so the base case is modest follow-through rather than a guaranteed breakout.`;
  }
  if (Number.isFinite(projected) && projected < -1) {
    return `${ticker} has a defensive near-term path unless the next checks improve. The machine is projecting ${formatPercent(projected)} over the next 24h, so stabilization matters more than upside hunting right now.`;
  }
  if (Number.isFinite(projected)) {
    return `${ticker} has a mixed near-term path. The machine is projecting ${formatPercent(projected)} over the next 24h, which means the outcome depends more on confirmation than raw direction.`;
  }
  return hold || `${ticker} has an unresolved near-term path. The next few snapshots should decide whether this is early strength or just temporary noise.`;
}

function watchReadText(ticker, packet) {
  const watch = firstInsightText(packet, /watch|hold|entry/i);
  if (watch) return watch;
  const projected = Number.isFinite(packet.projected24hChange) ? packet.projected24hChange : null;
  if (Number.isFinite(projected) && projected > 0) {
    return `I would watch whether ${ticker} keeps improving over the next few collector cycles. If price firms while volume and rank hold, the current bullish read gets more believable.`;
  }
  if (Number.isFinite(projected) && projected < 0) {
    return `I would watch for stabilization first. A better read would need ${ticker} to stop sliding, hold liquidity, and show volume returning before the machine leans harder into it.`;
  }
  return `Watch the next few snapshots, not just this one. The signal gets stronger if rank, volume, liquidity, and chart structure improve together.`;
}

async function fetchOpenAiPulseAnalystRead(packet, fallback) {
  if (typeof fetch !== "function") throw new Error("Node 18+ fetch is required");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PULSE_ANALYST_TIMEOUT_MS);
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${OPENAI_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: PULSE_ANALYST_MODEL,
        input: [
          {
            role: "system",
            content: [
              "You are the Bundle Builder analyst voice.",
              "Explain a deterministic crypto ranking engine in plain English, like a thoughtful human analyst talking through the read.",
              "Do not give financial advice, do not tell the user to buy or sell, and do not invent data.",
              "Do not merely list the metrics. Explain why the metrics matter, what the machine may be seeing, what could be wrong, and what would change the read.",
              "Write with clear judgment and a little natural texture. Avoid hype, marketing language, generic disclaimers, and robotic phrases.",
              "Return only concise JSON with keys headline and points. points must be exactly three objects with label and text.",
            ].join(" "),
          },
          {
            role: "user",
            content: JSON.stringify({
              instruction: [
                "Write the coin explanation as a reasoning note, not a data recap.",
                "Use the supplied fallback only as raw material; improve it if it sounds stiff.",
                "The headline should be 2-3 natural sentences.",
                "The three points must be labeled exactly: Summary, Entry strategy, Predicted outcome.",
                "Summary should consolidate timing, execution, conviction, market read, and catalyst context into one concise human explanation.",
                "Entry strategy should explain whether this looks like a chase, wait, pullback, confirmation, or avoid-for-now setup.",
                "Predicted outcome should explain the likely path if the current signals persist, plus the main condition that would invalidate it.",
                "If the coin is down but still ranking, explicitly explain the distinction between momentum and market structure.",
              ].join(" "),
              packet,
              fallback,
            }),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "pulse_analyst_read",
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["headline", "points"],
              properties: {
                headline: { type: "string", maxLength: 520 },
                points: {
                  type: "array",
                  minItems: 3,
                  maxItems: 3,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["label", "text"],
                    properties: {
                      label: { type: "string", maxLength: 56 },
                      text: { type: "string", maxLength: 420 },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`OpenAI HTTP ${response.status}${text ? ` ${text.slice(0, 160)}` : ""}`);
    }
    const payload = await response.json();
    const parsed = parseOpenAiJsonOutput(payload);
    if (!parsed?.headline || !Array.isArray(parsed.points) || parsed.points.length < 3) {
      throw new Error("OpenAI analyst response was incomplete");
    }
    return {
      source: "openai",
      model: PULSE_ANALYST_MODEL,
      headline: safeText(parsed.headline, 560),
      points: parsed.points.slice(0, 3).map((item, index) => ({
        label: safeText(item.label, 60) || fallback.points[index]?.label || `Point ${index + 1}`,
        text: safeText(item.text, 440) || fallback.points[index]?.text || "",
      })),
    };
  } finally {
    clearTimeout(timer);
  }
}

function parseOpenAiJsonOutput(payload = {}) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return JSON.parse(payload.output_text);
  }
  const text = (payload.output || [])
    .flatMap((item) => item.content || [])
    .map((part) => part.text || "")
    .join("")
    .trim();
  return text ? JSON.parse(text) : null;
}

function pulseAnalystCacheKey(packet = {}) {
  return [
    packet.ticker,
    packet.rank,
    Math.round((packet.change24h || 0) * 10) / 10,
    Math.round((packet.projected24hChange || 0) * 10) / 10,
    packet.marketHealth?.score ?? "",
    packet.marketHealth?.regime || "",
    packet.reason?.slice(0, 120) || "",
  ].join("|");
}

function prunePulseAnalystCache() {
  if (pulseAnalystCache.size <= 80) return;
  const cutoff = Date.now() - PULSE_ANALYST_CACHE_MS * 2;
  for (const [key, entry] of pulseAnalystCache.entries()) {
    if (!entry?.cachedAt || entry.cachedAt < cutoff) pulseAnalystCache.delete(key);
  }
}

function formatCompactUsd(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "$0";
  if (Math.abs(number) >= 1_000_000_000) return `$${(number / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(number) >= 1_000_000) return `$${(number / 1_000_000).toFixed(1)}M`;
  if (Math.abs(number) >= 1_000) return `$${Math.round(number / 1_000)}K`;
  return `$${Math.round(number)}`;
}

function formatPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  const sign = number > 0 ? "+" : "";
  return `${sign}${number.toFixed(2)}%`;
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

async function getNormalizedMarketChart(options = {}) {
  const window = normalizeMarketChartWindow(options.window);
  const id = safeText(options.id, 120).toLowerCase();
  const chainId = normalizeMarketChartChainId(options.chainId);
  const pairAddress = normalizeContractAddress(options.pairAddress);
  const sourcePreference = normalizeMarketChartSource(options.source);
  if (!isAllowedCoinGeckoId(id) && (!chainId || !pairAddress)) {
    const error = new Error("Missing supported chart source. Provide id, or chainId plus pairAddress.");
    error.statusCode = 400;
    throw error;
  }

  const cacheKey = marketChartCacheKey({ id, chainId, pairAddress, window, sourcePreference });
  const cached = marketChartCache.get(cacheKey);
  const now = Date.now();
  if (!options.force && cached && now - cached.cachedAt < MARKET_CHART_CACHE_MS) {
    return { ...cached.value, cacheStatus: "fresh-cache", cached: true, cachedAt: new Date(cached.cachedAt).toISOString() };
  }
  if (!options.force && cached && now - cached.cachedAt < MARKET_CHART_STALE_MS) {
    refreshNormalizedMarketChartInBackground({ id, chainId, pairAddress, window, sourcePreference, cacheKey });
    return { ...cached.value, cacheStatus: "stale-cache", cached: true, cachedAt: new Date(cached.cachedAt).toISOString(), warning: "Serving cached chart while a background refresh runs" };
  }
  const durableCached = !options.force ? sanitizeStoredMarketChart(await chartCacheRepository.get(`market:${cacheKey}`)) : null;
  if (durableCached && now - durableCached.cachedAt < MARKET_CHART_CACHE_MS) {
    marketChartCache.set(cacheKey, { value: durableCached.value, cachedAt: durableCached.cachedAt });
    return { ...durableCached.value, cacheStatus: "fresh-durable-cache", cached: true, cachedAt: new Date(durableCached.cachedAt).toISOString() };
  }
  if (durableCached && now - durableCached.cachedAt < MARKET_CHART_STALE_MS) {
    marketChartCache.set(cacheKey, { value: durableCached.value, cachedAt: durableCached.cachedAt });
    refreshNormalizedMarketChartInBackground({ id, chainId, pairAddress, window, sourcePreference, cacheKey });
    return { ...durableCached.value, cacheStatus: "stale-durable-cache", cached: true, cachedAt: new Date(durableCached.cachedAt).toISOString(), warning: "Serving durable cached chart while a background refresh runs" };
  }

  try {
    const value = await fetchNormalizedMarketChart({ id, chainId, pairAddress, window, sourcePreference });
    marketChartCache.set(cacheKey, { value, cachedAt: now });
    await chartCacheRepository.set(`market:${cacheKey}`, { value, cachedAt: now });
    return { ...value, cacheStatus: "refreshed", cached: false, cachedAt: new Date(now).toISOString() };
  } catch (error) {
    if (cached && now - cached.cachedAt < MARKET_CHART_STALE_MS) {
      return { ...cached.value, cacheStatus: "stale-cache", cached: true, cachedAt: new Date(cached.cachedAt).toISOString(), warning: error.message || "Refresh failed; using last good chart" };
    }
    if (durableCached && now - durableCached.cachedAt < MARKET_CHART_STALE_MS) {
      return { ...durableCached.value, cacheStatus: "stale-durable-cache", cached: true, cachedAt: new Date(durableCached.cachedAt).toISOString(), warning: error.message || "Refresh failed; using durable cached chart" };
    }
    throw error;
  }
}

function refreshNormalizedMarketChartInBackground(options) {
  const refreshKey = `market-chart:${options.cacheKey}`;
  if (pendingCoinGeckoChartRefreshes.has(refreshKey)) return;
  const refresh = fetchNormalizedMarketChart(options)
    .then(async (value) => {
      const cachedAt = Date.now();
      marketChartCache.set(options.cacheKey, { value, cachedAt });
      await chartCacheRepository.set(`market:${options.cacheKey}`, { value, cachedAt });
    })
    .finally(() => pendingCoinGeckoChartRefreshes.delete(refreshKey));
  pendingCoinGeckoChartRefreshes.set(refreshKey, refresh);
  refresh.catch(() => {});
}

async function fetchNormalizedMarketChart({ id, chainId, pairAddress, window, sourcePreference }) {
  const errors = [];
  sourcePreference = normalizeMarketChartSource(sourcePreference);
  const preferPoolChart = shouldPreferGeckoTerminalChart(window, sourcePreference, Boolean(chainId && pairAddress));
  if (preferPoolChart) {
    try {
      return await fetchGeckoTerminalMarketChart({ chainId, pairAddress, window });
    } catch (error) {
      errors.push(`GeckoTerminal: ${error.message || "failed"}`);
    }
  }

  if (isAllowedCoinGeckoId(id)) {
    try {
      const days = marketChartWindowToCoinGeckoDays(window);
      const chart = await getCoinGeckoChartWorkflow(id, { days });
      const prices = normalizePriceList(chart.prices);
      if (prices.length >= 2) {
        return {
          id,
          chainId: chainId || null,
          pairAddress: pairAddress || null,
          window,
          prices,
          totalVolumes: normalizePriceList(chart.totalVolumes),
          marketCaps: normalizePriceList(chart.marketCaps),
          source: "CoinGecko",
          sourceDetail: `CoinGecko ${marketChartWindowLabel(window)} chart`,
          updatedAt: chart.updatedAt || new Date().toISOString(),
          confidence: chart.cacheStatus === "stale-cache" ? "medium" : "high",
        };
      }
    } catch (error) {
      errors.push(`CoinGecko: ${error.message || "failed"}`);
    }
  }

  if (chainId && pairAddress && !preferPoolChart) {
    try {
      const chart = await fetchGeckoTerminalMarketChart({ chainId, pairAddress, window });
      return chart;
    } catch (error) {
      errors.push(`GeckoTerminal: ${error.message || "failed"}`);
    }
  }

  throw new Error(`Market chart unavailable${errors.length ? `: ${errors.join(" | ")}` : ""}`);
}

async function fetchGeckoTerminalMarketChart({ chainId, pairAddress, window }) {
  const config = geckoTerminalChartConfig(window);
  const targetUrl = `https://api.geckoterminal.com/api/v2/networks/${encodeURIComponent(chainId)}/pools/${encodeURIComponent(pairAddress)}/ohlcv/${encodeURIComponent(config.timeframe)}?aggregate=${encodeURIComponent(config.aggregate)}&limit=${encodeURIComponent(config.limit)}&currency=usd`;
  const payload = await fetchJsonWithTimeout(targetUrl, MARKET_CHART_TIMEOUT_MS);
  const rows = Array.isArray(payload?.data?.attributes?.ohlcv_list) ? payload.data.attributes.ohlcv_list : [];
  const sortedRows = rows.slice().sort((a, b) => Number(a?.[0]) - Number(b?.[0]));
  const prices = normalizePriceList(sortedRows.map((row) => row?.[4]));
  if (prices.length < 2) throw new Error("GeckoTerminal chart data empty");
  return {
    id: null,
    chainId,
    pairAddress,
    window,
    prices,
    totalVolumes: normalizePriceList(sortedRows.map((row) => row?.[5])),
    marketCaps: [],
    source: "GeckoTerminal",
    sourceDetail: `GeckoTerminal ${marketChartWindowLabel(window)} pool chart`,
    updatedAt: sortedRows.at(-1)?.[0] ? new Date(Number(sortedRows.at(-1)[0]) * 1000).toISOString() : new Date().toISOString(),
    confidence: "medium",
  };
}

function geckoTerminalChartConfig(window) {
  return ({
    "5m": { timeframe: "minute", aggregate: 1, limit: 5 },
    "15m": { timeframe: "minute", aggregate: 1, limit: 15 },
    "30m": { timeframe: "minute", aggregate: 1, limit: 30 },
    "1h": { timeframe: "minute", aggregate: 1, limit: 60 },
    "3h": { timeframe: "minute", aggregate: 1, limit: 180 },
    "6h": { timeframe: "minute", aggregate: 2, limit: 180 },
    "12h": { timeframe: "minute", aggregate: 5, limit: 144 },
    "24h": { timeframe: "minute", aggregate: 5, limit: 288 },
    "3d": { timeframe: "hour", aggregate: 1, limit: 72 },
    "7d": { timeframe: "hour", aggregate: 1, limit: 168 },
    "1mo": { timeframe: "hour", aggregate: 4, limit: 180 },
  })[window] || { timeframe: "minute", aggregate: 5, limit: 288 };
}

function normalizeMarketChartWindow(value) {
  const normalized = String(value || "24h").trim().toLowerCase();
  if (["5m", "15m", "30m", "1h", "3h", "6h", "12h", "24h", "3d", "7d"].includes(normalized)) return normalized;
  if (["1m", "1mo", "30d", "month"].includes(normalized)) return "1mo";
  if (normalized === "1d") return "24h";
  return "24h";
}

function normalizeMarketChartSource(value) {
  const text = String(value || "auto").trim().toLowerCase();
  if (["geckoterminal", "gecko-terminal", "pool", "dex"].includes(text)) return "geckoterminal";
  if (["coingecko", "coin-gecko", "coin"].includes(text)) return "coingecko";
  return "auto";
}

function shouldPreferGeckoTerminalChart(window, sourcePreference, hasPool) {
  if (!hasPool) return false;
  if (sourcePreference === "geckoterminal") return true;
  if (sourcePreference === "coingecko") return false;
  return ["5m", "15m", "30m", "1h", "3h", "6h", "12h", "24h"].includes(normalizeMarketChartWindow(window));
}

function marketChartWindowToCoinGeckoDays(window) {
  if (window === "3d") return "3";
  if (window === "7d") return "7";
  if (window === "1mo") return "30";
  return "1";
}

function marketChartWindowLabel(window) {
  if (window === "1mo") return "1M";
  return window;
}

function normalizeMarketChartChainId(value) {
  const text = String(value || "").trim().toLowerCase();
  const aliases = {
    "8453": "base",
    base: "base",
    "42161": "arbitrum",
    arbitrum: "arbitrum",
    "137": "polygon",
    polygon: "polygon",
    "10": "optimism",
    optimism: "optimism",
  };
  return aliases[text] || "";
}

function normalizeContractAddress(value) {
  const text = String(value || "").trim().toLowerCase();
  return /^0x[a-f0-9]{40}$/.test(text) ? text : "";
}

function marketChartCacheKey({ id, chainId, pairAddress, window, sourcePreference }) {
  return `${safeText(id, 120).toLowerCase() || "no-id"}:${chainId || "no-chain"}:${pairAddress || "no-pair"}:${normalizeMarketChartWindow(window)}:${normalizeMarketChartSource(sourcePreference)}`;
}

function sanitizeStoredMarketChart(input = {}) {
  if (!input || typeof input !== "object") return null;
  const value = input.value && typeof input.value === "object" ? input.value : null;
  const prices = normalizePriceList(value?.prices);
  if (!value || prices.length < 2) return null;
  return {
    value: {
      ...value,
      prices,
      totalVolumes: normalizePriceList(value.totalVolumes),
      marketCaps: normalizePriceList(value.marketCaps),
    },
    cachedAt: finiteNumber(input.cachedAt) || 0,
  };
}

async function fetchMarketProxyJson(targetUrl) {
  if (typeof fetch !== "function") throw new Error("Node 18+ fetch is required");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(process.env.BUNDLE_BUILDER_MARKET_PROXY_TIMEOUT_MS || 9000));
  try {
    const headers = {
      accept: "application/json",
      "user-agent": "Vici-Bundle-Builder-Beta/0.1",
      ...coingeckoHeadersForUrl(targetUrl),
    };
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function coingeckoHeadersForUrl(targetUrl) {
  const key = process.env.COINGECKO_API_KEY || process.env.CG_API_KEY || "";
  if (!key) return {};
  try {
    const parsed = new URL(targetUrl);
    const base = new URL(COINGECKO_API_BASE_URL);
    if (parsed.origin !== base.origin) return {};
  } catch {
    return {};
  }
  const headerName = process.env.COINGECKO_API_KEY_HEADER || (COINGECKO_API_BASE_URL.includes("pro-api") ? "x-cg-pro-api-key" : "x-cg-demo-api-key");
  return { [headerName]: key };
}

async function getCoinGeckoChartWorkflow(id, options = {}) {
  const days = normalizeCoinGeckoChartDays(options.days);
  const storeKey = coinGeckoChartStoreKey(id, days);
  const durableKey = `coingecko:${storeKey}`;
  const legacyDurableKey = `coingecko:${id}`;
  const existing = !options.force
    ? sanitizeStoredCoinGeckoChart(
      await chartCacheRepository.get(durableKey)
        || (days === "1" ? await chartCacheRepository.get(legacyDurableKey) : null),
    )
    : null;
  const now = Date.now();
  if (!options.force && existing && now - existing.cachedAt < COINGECKO_CHART_CACHE_MS) {
    return { ...existing, cacheStatus: "fresh-durable-cache" };
  }
  if (!options.force && existing && now - existing.cachedAt < COINGECKO_CHART_STALE_MS) {
    refreshCoinGeckoChartInBackground(id, days);
    return { ...existing, cacheStatus: "stale-durable-cache", warning: "Serving cached chart while a background refresh runs" };
  }

  try {
    const chart = await fetchCoinGeckoChartWithRetries(id, days);
    const record = sanitizeStoredCoinGeckoChart({
      id,
      days,
      prices: chart.prices,
      totalVolumes: chart.totalVolumes,
      marketCaps: chart.marketCaps,
      updatedAt: chart.updatedAt,
      cachedAt: now,
    });
    if (!record) throw new Error("CoinGecko chart response did not contain enough price points");
    await chartCacheRepository.set(durableKey, record);
    if (days === "1") await chartCacheRepository.set(legacyDurableKey, record);
    return { ...record, cacheStatus: "refreshed" };
  } catch (error) {
    if (existing && now - existing.cachedAt < COINGECKO_CHART_STALE_MS) {
      return {
        ...existing,
        cacheStatus: "stale-durable-cache",
        warning: error.message || "CoinGecko refresh failed; using last good chart",
      };
    }
    throw error;
  }
}

function refreshCoinGeckoChartInBackground(id, days = "1") {
  const normalizedDays = normalizeCoinGeckoChartDays(days);
  const refreshKey = coinGeckoChartStoreKey(id, normalizedDays);
  if (pendingCoinGeckoChartRefreshes.has(refreshKey)) return pendingCoinGeckoChartRefreshes.get(refreshKey);
  const refresh = (async () => {
    try {
      const chart = await fetchCoinGeckoChartWithRetries(id, normalizedDays);
      const record = sanitizeStoredCoinGeckoChart({
        id,
        days: normalizedDays,
        prices: chart.prices,
        totalVolumes: chart.totalVolumes,
        marketCaps: chart.marketCaps,
        updatedAt: chart.updatedAt,
        cachedAt: Date.now(),
      });
      if (record) {
        await chartCacheRepository.set(`coingecko:${refreshKey}`, record);
        if (normalizedDays === "1") await chartCacheRepository.set(`coingecko:${id}`, record);
      }
      return record;
    } finally {
      pendingCoinGeckoChartRefreshes.delete(refreshKey);
    }
  })();
  pendingCoinGeckoChartRefreshes.set(refreshKey, refresh);
  refresh.catch(() => {});
  return refresh;
}

function startCoinGeckoChartPreloader() {
  if (!COINGECKO_CHART_PRELOAD_ENABLED || coingeckoChartPreloadTimer) return;
  setTimeout(() => {
    runCoinGeckoChartPreloadCycle("startup").catch((error) => {
      coingeckoChartPreloadState.lastError = error.message || "CoinGecko preload startup failed";
    });
  }, COINGECKO_CHART_PRELOAD_STARTUP_DELAY_MS).unref?.();
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
    requests: 0,
    failedIds: [],
  };

  try {
    for (const id of COINGECKO_CHART_PRELOAD_IDS) {
      for (const days of COINGECKO_CHART_PRELOAD_DAYS) {
        result.requests += 1;
        try {
          const chart = await getCoinGeckoChartWorkflow(id, { days });
          if (chart.cacheStatus === "refreshed") result.refreshed += 1;
          else if (chart.cacheStatus === "fresh-cache") result.freshCache += 1;
          else if (chart.cacheStatus === "stale-cache") result.staleCache += 1;
        } catch (error) {
          result.failed += 1;
          result.failedIds.push({ id, days, error: error.message || "chart preload failed" });
        }
        if (COINGECKO_CHART_PRELOAD_STAGGER_MS > 0) await wait(COINGECKO_CHART_PRELOAD_STAGGER_MS);
      }
    }
    coingeckoChartPreloadState.lastResult = result;
    coingeckoChartPreloadState.lastCompletedAt = new Date().toISOString();
    coingeckoChartPreloadState.lastError = result.failed ? `${result.failed} CoinGecko chart preload requests failed` : null;
    return result;
  } finally {
    coingeckoChartPreloadState.running = false;
  }
}

const pulseCollectorWatchlist = [
  { ticker: "AERO", name: "Aerodrome Finance", theme: "base", baseScore: 59 },
  { ticker: "VIRTUAL", name: "Virtuals Protocol", theme: "ai", baseScore: 64 },
  { ticker: "MORPHO", name: "Morpho", theme: "defi", baseScore: 60 },
  { ticker: "DEGEN", name: "Degen", theme: "base", baseScore: 52 },
  { ticker: "TOSHI", name: "Toshi", theme: "base", baseScore: 51 },
  { ticker: "ZRO", name: "LayerZero", theme: "core", baseScore: 56 },
  { ticker: "BRETT", name: "Brett", theme: "base", baseScore: 53 },
  { ticker: "AIXBT", name: "AIXBT", theme: "ai", baseScore: 60 },
  { ticker: "KAITO", name: "Kaito", theme: "ai", baseScore: 57 },
  { ticker: "ZORA", name: "Zora", theme: "base", baseScore: 55 },
  { ticker: "BNKR", name: "BankrCoin", theme: "base", baseScore: 50 },
  { ticker: "CLANKER", name: "Clanker", theme: "base", baseScore: 50 },
  { ticker: "MOG", name: "Mog Coin", theme: "base", baseScore: 49 },
  { ticker: "AVNT", name: "Avantis", theme: "defi", baseScore: 54 },
  { ticker: "BIO", name: "Bio Protocol", theme: "creator", baseScore: 52 },
  { ticker: "VVV", name: "Venice Token", theme: "ai", baseScore: 52 },
  { ticker: "PROS", name: "Prosper", theme: "defi", baseScore: 49 },
  { ticker: "TRUST", name: "Trust", theme: "base", baseScore: 48 },
  { ticker: "DINO", name: "Dino", theme: "base", baseScore: 47 },
  { ticker: "CHIP", name: "Chip", theme: "base", baseScore: 47 },
  { ticker: "NOCK", name: "Nockchain", theme: "infrastructure", baseScore: 49 },
  { ticker: "FUN", name: "FUNToken", theme: "consumer", baseScore: 47 },
];
pulseCollectorState.watchlistSize = pulseCollectorWatchlist.length;

function startPulseSnapshotCollector() {
  if (!PULSE_COLLECTOR_ENABLED || pulseCollectorTimer) return;
  setTimeout(() => {
    runPulseSnapshotCollector("startup").catch((error) => {
      pulseCollectorState.lastError = error.message || "Pulse collector startup failed";
    });
  }, PULSE_COLLECTOR_STARTUP_DELAY_MS).unref?.();
  pulseCollectorTimer = setInterval(() => {
    runPulseSnapshotCollector("interval").catch((error) => {
      pulseCollectorState.lastError = error.message || "Pulse collector interval failed";
    });
  }, PULSE_COLLECTOR_INTERVAL_MS);
  pulseCollectorTimer.unref?.();
}

async function runPulseSnapshotCollector(trigger = "manual") {
  if (pulseCollectorState.running) {
    pulseCollectorState.lastError = "Previous pulse collector cycle is still running";
    return null;
  }
  pulseCollectorState.running = true;
  pulseCollectorState.cycle += 1;
  pulseCollectorState.lastStartedAt = new Date().toISOString();
  pulseCollectorState.lastError = null;

  try {
    const candidates = [];
    const skipped = [];
    const wakeList = [];
    const rankingContext = await buildPulseRankingContext();
    for (const meta of pulseCollectorWatchlist) {
      try {
        const market = await fetchPulseCollectorMarket(meta);
        if (!market || !Number.isFinite(market.priceUsd)) {
          skipped.push({ ticker: meta.ticker, reason: "no Base DEX Screener market" });
          continue;
        }
        const scored = scorePulseCollectorCandidate(meta, market, rankingContext);
        const belowQualityFloor = (market.volume24h || 0) < 50_000 || (market.liquidityUsd || 0) < 75_000;
        if (belowQualityFloor && !scored.graduatesFromWatchlist) {
          const watch = pulseCollectorWatchCandidate(scored, "below collector quality floor");
          if (watch) wakeList.push(watch);
          skipped.push({
            ticker: meta.ticker,
            reason: "below collector quality floor",
            volume24h: Math.round(market.volume24h || 0),
            liquidityUsd: Math.round(market.liquidityUsd || 0),
            wakeUpScore: watch?.wakeUpScore ?? null,
            watchScore: watch?.watchScore ?? null,
          });
          continue;
        }
        candidates.push(scored);
      } catch (error) {
        pulseCollectorState.lastError = `${meta.ticker}: ${error.message || "market lookup failed"}`;
        skipped.push({ ticker: meta.ticker, reason: error.message || "market lookup failed" });
      }
      await wait(175);
    }
    const rankedWakeList = wakeList
      .sort((a, b) => b.watchScore - a.watchScore)
      .slice(0, 12);
    pulseCollectorState.lastAttempted = pulseCollectorWatchlist.length;
    pulseCollectorState.lastEligible = candidates.length;
    pulseCollectorState.lastSkipped = skipped.slice(0, 12);
    pulseCollectorState.lastWakeList = rankedWakeList.slice(0, 8);

    const ranked = candidates
      .sort((a, b) => b.pulseScore - a.pulseScore)
      .slice(0, PULSE_COLLECTOR_DECK_SIZE)
      .map(pulseCollectorSnapshotCoin);

    if (!ranked.length) throw new Error("Pulse collector found no eligible Base candidates");

    const snapshot = await pulseSnapshotRepository.saveSnapshot({
      source: "server-background-pulse",
      network: "Base",
      selectedWindow: "24h",
      selectedReadWindow: "7d",
      coins: ranked,
      watchlist: rankedWakeList,
    });

    pulseCollectorState.lastSnapshotAt = snapshot.createdAt;
    pulseCollectorState.lastSnapshotId = snapshot.id;
    pulseCollectorState.lastCoins = snapshot.coins.map((coin) => coin.ticker);
    pulseCollectorState.lastCompletedAt = new Date().toISOString();
    return { trigger, snapshotId: snapshot.id, coins: pulseCollectorState.lastCoins };
  } catch (error) {
    pulseCollectorState.lastError = error.message || "Pulse collector failed";
    throw error;
  } finally {
    pulseCollectorState.running = false;
  }
}

async function fetchPulseCollectorMarket(meta) {
  const url = `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(meta.ticker)}`;
  const payload = await fetchJsonWithTimeout(url, MARKET_CHART_TIMEOUT_MS);
  const ticker = String(meta.ticker || "").toUpperCase();
  const pairs = Array.isArray(payload?.pairs) ? payload.pairs : [];
  const matches = pairs
    .filter((pair) => String(pair.chainId || "").toLowerCase() === "base")
    .filter((pair) => String(pair.baseToken?.symbol || "").toUpperCase() === ticker)
    .map((pair) => ({
      ticker,
      name: safeText(pair.baseToken?.name || meta.name, 80),
      priceUsd: finiteNumber(pair.priceUsd),
      priceChange24h: finiteNumber(pair.priceChange?.h24) || 0,
      volume24h: finiteNumber(pair.volume?.h24) || 0,
      liquidityUsd: finiteNumber(pair.liquidity?.usd) || 0,
      buys24h: finiteNumber(pair.txns?.h24?.buys) || 0,
      sells24h: finiteNumber(pair.txns?.h24?.sells) || 0,
      pairAddress: safeText(pair.pairAddress, 80),
      url: safeText(pair.url, 240),
    }))
    .filter((pair) => Number.isFinite(pair.priceUsd) && pair.priceUsd > 0)
    .sort((a, b) => (b.liquidityUsd + b.volume24h * 0.35) - (a.liquidityUsd + a.volume24h * 0.35));
  return matches[0] || null;
}

async function buildPulseRankingContext() {
  try {
    const snapshots = await pulseSnapshotRepository.listSnapshots({ limit: 288 });
    const ordered = (Array.isArray(snapshots) ? snapshots : [])
      .slice()
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const marketContext = buildMarketHealthContext(ordered);
    const tickerHistory = buildTickerRankHistory(ordered);
    return {
      available: ordered.length >= 6,
      sampleSize: ordered.length,
      regime: marketContext?.regime || "mixed",
      marketContext,
      tickerHistory,
    };
  } catch (error) {
    return {
      available: false,
      sampleSize: 0,
      regime: "mixed",
      marketContext: null,
      tickerHistory: new Map(),
      error: error.message || "Ranking context unavailable",
    };
  }
}

function buildTickerRankHistory(snapshots = []) {
  const history = new Map();
  for (const snapshot of Array.isArray(snapshots) ? snapshots : []) {
    const createdAt = snapshot.createdAt || "";
    const trackedCoins = [
      ...(Array.isArray(snapshot.coins) ? snapshot.coins : []),
      ...(Array.isArray(snapshot.watchlist) ? snapshot.watchlist : []),
    ];
    for (const coin of trackedCoins) {
      const ticker = safeText(coin.ticker, 20).toUpperCase();
      if (!ticker) continue;
      if (!history.has(ticker)) history.set(ticker, []);
      history.get(ticker).push({
        createdAt,
        rank: finiteNumber(coin.rank),
        change24h: finiteNumber(coin.change24h),
        projected24hChange: finiteNumber(coin.projected24hChange),
        pulseScore: finiteNumber(coin.pulseScore),
        volume24h: finiteNumber(coin.volume24h),
        liquidityUsd: finiteNumber(coin.liquidityUsd),
        wakeUpScore: finiteNumber(coin.wakeUpScore),
        confirmedWakeUpScore: finiteNumber(coin.confirmedWakeUpScore),
        watchScore: finiteNumber(coin.watchScore),
        status: safeText(coin.status, 40),
      });
    }
  }
  return history;
}

function scorePulseCollectorCandidate(meta, market, rankingContext = {}) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const volumeScore = Math.min(20, Math.log10(Math.max(1, market.volume24h)) * 3.15);
  const liquidityScore = Math.min(14, Math.log10(Math.max(1, market.liquidityUsd)) * 1.95);
  const momentumScore = Math.max(-18, Math.min(24, market.priceChange24h * 1.7));
  const txnTotal = market.buys24h + market.sells24h;
  const buyRatio = txnTotal ? market.buys24h / txnTotal : 0.5;
  const flowScore = (buyRatio - 0.5) * 28;
  const opportunityScore = pulseOpportunityScore(meta, market, buyRatio);
  const qualityScore = meta.baseScore * 0.76;
  const defaultFavoritePenalty = ticker === "AERO" && market.priceChange24h < 7 && opportunityScore < 6 ? 5.5 : 0;
  const reversalWakeupBoost = pulseReversalWakeupBoost(meta, market, buyRatio, opportunityScore);
  const extensionPenalty = pulseExtensionPenalty(meta, market, opportunityScore);
  const speculativeTrapPenalty = pulseSpeculativeTrapPenalty(meta, market, buyRatio, opportunityScore);
  const rankMomentum = pulseRankMomentum(ticker, rankingContext);
  const graduationSignal = pulseGraduationSignal(ticker, rankingContext);
  const wakeUpSignal = pulseWakeUpSignal(meta, market, buyRatio, rankingContext, {
    opportunityScore,
    reversalWakeupBoost,
    rankMomentum,
  });
  const confirmedWakeUpSignal = pulseConfirmedWakeUpSignal(meta, market, buyRatio, rankingContext, {
    wakeUpSignal,
    opportunityScore,
    reversalWakeupBoost,
    rankMomentum,
    extensionPenalty,
    speculativeTrapPenalty,
  });
  const regimeFit = pulseRegimeFit(meta, market, buyRatio, rankingContext, opportunityScore);
  const confidenceScore = pulseConfidenceScore(meta, market, {
    buyRatio,
    opportunityScore,
    reversalWakeupBoost,
    wakeUpScore: wakeUpSignal.score,
    confirmedWakeUpScore: confirmedWakeUpSignal.score,
    extensionPenalty,
    speculativeTrapPenalty,
    rankMomentum,
    regimeFit,
    rankingContext,
  });
  const fragilityScore = pulseFragilityScore(meta, market, {
    buyRatio,
    extensionPenalty,
    speculativeTrapPenalty,
    confidenceScore,
    wakeUpScore: wakeUpSignal.score,
    confirmedWakeUpScore: confirmedWakeUpSignal.score,
  });
  const confidenceBoost = (confidenceScore - 50) * 0.08;
  const fragilityPenalty = Math.max(0, fragilityScore - 48) * 0.075;
  const wakeUpBoost = clamp((wakeUpSignal.score - 42) / 6, -3.5, 9.5);
  const confirmedWakeBoost = clamp((confirmedWakeUpSignal.score - 50) / 6, -4, 10);
  const graduationBoost = graduationSignal.boost;
  const pulseScore = Number((qualityScore + volumeScore + liquidityScore + momentumScore + flowScore + opportunityScore + reversalWakeupBoost + wakeUpBoost + confirmedWakeBoost + rankMomentum + regimeFit + confidenceBoost + graduationBoost - defaultFavoritePenalty - extensionPenalty - speculativeTrapPenalty - fragilityPenalty).toFixed(2));
  const signalLane = pulseSignalLane({
    pulseScore,
    wakeUpScore: wakeUpSignal.score,
    confirmedWakeUpScore: confirmedWakeUpSignal.score,
    confidenceScore,
    fragilityScore,
    graduationSignal,
    volume24h: market.volume24h,
    liquidityUsd: market.liquidityUsd,
    priceChange24h: market.priceChange24h,
  });
  return {
    ...meta,
    ...market,
    pulseScore,
    setupScore: Math.max(1, Math.min(10, pulseScore / 10)),
    dataEdge: Math.round(volumeScore + liquidityScore + flowScore + opportunityScore),
    opportunityScore: Number(opportunityScore.toFixed(2)),
    rankMomentum: Number(rankMomentum.toFixed(2)),
    wakeUpScore: wakeUpSignal.score,
    wakeUpLabel: wakeUpSignal.label,
    wakeUpFlags: wakeUpSignal.flags,
    confirmedWakeUpScore: confirmedWakeUpSignal.score,
    confirmedWakeUpLabel: confirmedWakeUpSignal.label,
    confirmedWakeUpFlags: confirmedWakeUpSignal.flags,
    regimeFit: Number(regimeFit.toFixed(2)),
    confidenceScore,
    fragilityScore,
    signalLane,
    graduationBoost: Number(graduationBoost.toFixed(2)),
    graduationLabel: graduationSignal.label,
    graduationFlags: graduationSignal.flags,
    graduatesFromWatchlist: graduationSignal.graduates,
    confidenceLabel: confidenceScore >= 72 ? "higher-confidence" : confidenceScore >= 54 ? "medium-confidence" : "low-confidence",
    regime: rankingContext?.regime || "mixed",
    reversalWakeupBoost: Number(reversalWakeupBoost.toFixed(2)),
    extensionPenalty: Number(extensionPenalty.toFixed(2)),
    speculativeTrapPenalty: Number(speculativeTrapPenalty.toFixed(2)),
  };
}

function pulseGraduationSignal(ticker, rankingContext = {}) {
  const rows = rankingContext?.tickerHistory instanceof Map ? rankingContext.tickerHistory.get(ticker) : [];
  const clean = (Array.isArray(rows) ? rows : []).filter((row) => Number.isFinite(row.watchScore) || Number.isFinite(row.wakeUpScore) || Number.isFinite(row.pulseScore));
  const recent = clean.slice(-6);
  const prior = clean.slice(Math.max(0, clean.length - 24), Math.max(0, clean.length - 6));
  const recentWatch = averageValue(recent.map((row) => row.watchScore).filter(Number.isFinite));
  const priorWatch = averageValue(prior.map((row) => row.watchScore).filter(Number.isFinite));
  const recentWake = averageValue(recent.map((row) => row.wakeUpScore).filter(Number.isFinite));
  const recentPulse = averageValue(recent.map((row) => row.pulseScore).filter(Number.isFinite));
  const watchPersistence = recent.filter((row) => (finiteNumber(row.watchScore) || 0) >= 58).length;
  const wakePersistence = recent.filter((row) => (finiteNumber(row.wakeUpScore) || 0) >= 58).length;
  const watchTrend = Number.isFinite(recentWatch) && Number.isFinite(priorWatch) ? recentWatch - priorWatch : 0;
  const flags = [];
  let boost = 0;

  if (watchPersistence >= 2) {
    boost += 4.5;
    flags.push("watchlist persistence");
  }
  if (wakePersistence >= 2) {
    boost += 3.5;
    flags.push("wake-up persistence");
  }
  if (watchTrend >= 5) {
    boost += 3;
    flags.push("watch score improving");
  }
  if (Number.isFinite(recentWake) && recentWake >= 64) {
    boost += 2.5;
    flags.push("strong wake read");
  }
  if (Number.isFinite(recentPulse) && recentPulse >= 68) {
    boost += 2;
    flags.push("rank score near deck");
  }

  const finalBoost = clamp(boost, 0, 10);
  const graduates = finalBoost >= 7 || (watchPersistence >= 3 && (Number.isFinite(recentWake) ? recentWake >= 58 : true));
  return {
    boost: finalBoost,
    graduates,
    label: graduates ? "watchlist-graduation" : finalBoost >= 4 ? "building-graduation" : "not-graduating",
    flags: flags.slice(0, 5),
  };
}

function pulseSignalLane(input = {}) {
  const pulseScore = finiteNumber(input.pulseScore) || 0;
  const wakeUpScore = finiteNumber(input.wakeUpScore) || 0;
  const confirmedWakeUpScore = finiteNumber(input.confirmedWakeUpScore) || 0;
  const confidenceScore = finiteNumber(input.confidenceScore) || 0;
  const fragilityScore = finiteNumber(input.fragilityScore) || 0;
  const change = finiteNumber(input.priceChange24h) || 0;
  const volume = finiteNumber(input.volume24h) || 0;
  const liquidity = finiteNumber(input.liquidityUsd) || 0;
  const graduation = input.graduationSignal || {};
  const fragile = fragilityScore >= 66 || (change >= 18 && liquidity < 250_000) || (volume < 60_000 && liquidity < 120_000);

  if (fragile && wakeUpScore < 72 && confirmedWakeUpScore < 66) return "trap-lane";
  if (graduation.graduates || (wakeUpScore >= 66 && confirmedWakeUpScore >= 58 && confidenceScore >= 48)) return "early-risky";
  if (pulseScore >= 76 && confidenceScore >= 55 && fragilityScore <= 62) return "main-recommendation";
  if (wakeUpScore >= 52 || confirmedWakeUpScore >= 48) return "watching";
  return "neutral";
}

function pulseConfirmedWakeUpSignal(meta, market, buyRatio = 0.5, rankingContext = {}, context = {}) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const history = rankingContext?.tickerHistory instanceof Map ? rankingContext.tickerHistory.get(ticker) : [];
  const clean = (Array.isArray(history) ? history : []).filter((row) => Number.isFinite(row.pulseScore) || Number.isFinite(row.wakeUpScore));
  const recent = clean.slice(-3);
  const prior = clean.slice(Math.max(0, clean.length - 18), Math.max(0, clean.length - 3));
  const currentWake = finiteNumber(context.wakeUpSignal?.score) || 0;
  const change = finiteNumber(market.priceChange24h) || 0;
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const txnTotal = (finiteNumber(market.buys24h) || 0) + (finiteNumber(market.sells24h) || 0);
  const recentWakeAvg = averageValue(recent.map((row) => row.wakeUpScore).filter(Number.isFinite));
  const priorWakeAvg = averageValue(prior.map((row) => row.wakeUpScore).filter(Number.isFinite));
  const recentVolume = averageValue(recent.map((row) => row.volume24h).filter(Number.isFinite));
  const priorVolume = averageValue(prior.map((row) => row.volume24h).filter(Number.isFinite));
  const recentRank = averageValue(recent.map((row) => row.rank).filter(Number.isFinite));
  const priorRank = averageValue(prior.map((row) => row.rank).filter(Number.isFinite));
  const wakePersistence = recent.filter((row) => (finiteNumber(row.wakeUpScore) || 0) >= 58).length;
  const scoreTrend = Number.isFinite(recentWakeAvg) && Number.isFinite(priorWakeAvg) ? recentWakeAvg - priorWakeAvg : 0;
  const volumeExpansion = Number.isFinite(recentVolume) && Number.isFinite(priorVolume) && priorVolume > 0 ? volume / priorVolume : null;
  const rankImproving = Number.isFinite(recentRank) && Number.isFinite(priorRank) ? priorRank - recentRank : 0;
  const strongDepth = volume >= 650_000 && liquidity >= 250_000;
  const usableDepth = volume >= 150_000 && liquidity >= 120_000;
  const constructiveFlow = buyRatio >= 0.515 || (txnTotal >= 60 && buyRatio >= 0.505);
  const flags = [];
  let score = currentWake * 0.72;

  if (wakePersistence >= 2) {
    score += 12;
    flags.push("persistent wake-up");
  } else if (recent.length >= 2 && currentWake >= 74) {
    score += 5;
    flags.push("strong fresh wake-up");
  }
  if (scoreTrend >= 6) {
    score += 7;
    flags.push("wake-up strengthening");
  }
  if (Number.isFinite(volumeExpansion) && volumeExpansion >= 1.18 && usableDepth) {
    score += 7;
    flags.push("volume expansion");
  }
  if (strongDepth) {
    score += 5;
    flags.push("depth confirmed");
  }
  if (constructiveFlow) {
    score += clamp((buyRatio - 0.5) * 95, 0, 8);
    flags.push("buy flow supportive");
  }
  if (rankImproving >= 2) {
    score += 5;
    flags.push("rank improving");
  }
  if (!usableDepth) {
    score -= 14;
    flags.push("thin depth");
  }
  if (change >= 18 && !strongDepth) {
    score -= 12;
    flags.push("late thin spike");
  }
  if (change >= 28) {
    score -= 10;
    flags.push("overheated");
  }
  if ((finiteNumber(context.extensionPenalty) || 0) >= 6 && wakePersistence < 2) {
    score -= 7;
    flags.push("extension unconfirmed");
  }
  if ((finiteNumber(context.speculativeTrapPenalty) || 0) >= 5 && !constructiveFlow) {
    score -= 7;
    flags.push("fragile flow");
  }

  const finalScore = Math.round(clamp(score, 0, 100));
  return {
    score: finalScore,
    label: finalScore >= 76 ? "confirmed-wake-up" : finalScore >= 58 ? "building-confirmation" : finalScore >= 42 ? "unconfirmed" : "weak-confirmation",
    flags: flags.slice(0, 6),
  };
}

function pulseWakeUpSignal(meta, market, buyRatio = 0.5, rankingContext = {}, context = {}) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const theme = String(meta.theme || "").toLowerCase();
  const history = rankingContext?.tickerHistory instanceof Map ? rankingContext.tickerHistory.get(ticker) : [];
  const clean = (Array.isArray(history) ? history : []).filter((row) => Number.isFinite(row.change24h) || Number.isFinite(row.pulseScore));
  const recent = clean.slice(-6);
  const prior = clean.slice(Math.max(0, clean.length - 30), Math.max(0, clean.length - 6));
  const change = finiteNumber(market.priceChange24h) || 0;
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const recentAvgChange = averageValue(recent.map((row) => row.change24h).filter(Number.isFinite));
  const priorAvgChange = averageValue(prior.map((row) => row.change24h).filter(Number.isFinite));
  const recentAvgScore = averageValue(recent.map((row) => row.pulseScore).filter(Number.isFinite));
  const priorAvgScore = averageValue(prior.map((row) => row.pulseScore).filter(Number.isFinite));
  const scoreAcceleration = Number.isFinite(recentAvgScore) && Number.isFinite(priorAvgScore) ? recentAvgScore - priorAvgScore : 0;
  const changeAcceleration = Number.isFinite(recentAvgChange) && Number.isFinite(priorAvgChange) ? recentAvgChange - priorAvgChange : 0;
  const highBeta = ["ai", "base", "consumer", "creator"].includes(theme) || ["AIXBT", "BNKR", "BRETT", "DEGEN", "FUN", "KAITO", "TOSHI", "VIRTUAL", "VVV", "ZORA"].includes(ticker);
  const hasDepth = volume >= 140_000 && liquidity >= 100_000;
  const strongDepth = volume >= 650_000 && liquidity >= 250_000;
  const constructiveFlow = buyRatio >= 0.51;
  const quietOrEarlyMove = change >= -7 && change <= 9;
  const freshMove = change > -3 && change <= 14;
  const stabilizing = prior.length >= 4 ? changeAcceleration >= 1.5 || scoreAcceleration >= 3 : change >= -2;
  const flags = [];
  let score = 34;

  if (highBeta) {
    score += 5;
    flags.push("high-beta lane");
  }
  if (hasDepth) score += 8;
  if (strongDepth) score += 5;
  if (constructiveFlow) score += clamp((buyRatio - 0.5) * 95, 0, 8);
  if (quietOrEarlyMove && hasDepth) {
    score += 8;
    flags.push("early move with depth");
  }
  if (freshMove && stabilizing) {
    score += 7;
    flags.push("stabilizing momentum");
  }
  if (changeAcceleration >= 3 || scoreAcceleration >= 5) {
    score += 8;
    flags.push("acceleration flip");
  }
  if ((finiteNumber(context.reversalWakeupBoost) || 0) >= 4 || (finiteNumber(context.opportunityScore) || 0) >= 8) {
    score += 7;
    flags.push("reversal wake-up");
  }
  if ((finiteNumber(context.rankMomentum) || 0) >= 2.5) {
    score += 5;
    flags.push("rank improving");
  }
  if (change >= 18 && !strongDepth) {
    score -= 12;
    flags.push("thin late spike");
  }
  if (change >= 28) {
    score -= 10;
    flags.push("overheated");
  }
  if (!hasDepth) {
    score -= highBeta ? 14 : 8;
    flags.push("needs depth");
  }
  if (buyRatio < 0.49 && change < 4) score -= 7;

  const finalScore = Math.round(clamp(score, 0, 100));
  return {
    score: finalScore,
    label: finalScore >= 78 ? "strong-wake-up" : finalScore >= 60 ? "building-wake-up" : finalScore >= 42 ? "watching" : "quiet",
    flags: flags.slice(0, 6),
  };
}

function pulseRankMomentum(ticker, rankingContext = {}) {
  const rows = rankingContext?.tickerHistory instanceof Map ? rankingContext.tickerHistory.get(ticker) : null;
  const clean = (Array.isArray(rows) ? rows : []).filter((row) => Number.isFinite(row.rank));
  if (clean.length < 4) return 0;
  const recent = clean.slice(-4);
  const prior = clean.slice(Math.max(0, clean.length - 16), Math.max(0, clean.length - 4));
  if (prior.length < 3) return 0;
  const recentRank = averageValue(recent.map((row) => row.rank));
  const priorRank = averageValue(prior.map((row) => row.rank));
  if (!Number.isFinite(recentRank) || !Number.isFinite(priorRank)) return 0;
  const rankImprovement = priorRank - recentRank;
  const scoreTrend = averageValue(recent.map((row) => row.pulseScore).filter(Number.isFinite)) - averageValue(prior.map((row) => row.pulseScore).filter(Number.isFinite));
  const scoreSignal = Number.isFinite(scoreTrend) ? clamp(scoreTrend / 8, -1.5, 1.5) : 0;
  return clamp(rankImprovement * 1.15 + scoreSignal, -5, 6);
}

function pulseRegimeFit(meta, market, buyRatio = 0.5, rankingContext = {}, opportunityScore = 0) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const theme = String(meta.theme || "").toLowerCase();
  const regime = String(rankingContext?.regime || "mixed").toLowerCase();
  const change = finiteNumber(market.priceChange24h) || 0;
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const highBeta = ["ai", "base", "consumer", "creator"].includes(theme) || ["DEGEN", "TOSHI", "BRETT", "ZORA", "FUN", "VVV", "AIXBT"].includes(ticker);
  const defiOrInfra = ["defi", "infrastructure", "l2"].includes(theme) || ["AERO", "MORPHO", "ZRO", "AVNT"].includes(ticker);
  const hasDepth = volume >= 200_000 && liquidity >= 150_000;
  const strongDepth = volume >= 750_000 && liquidity >= 300_000;
  const constructive = change > -3 && buyRatio >= 0.51;
  let score = 0;

  if (regime === "risk-on") {
    if (highBeta && hasDepth && constructive) score += 3.2;
    if (defiOrInfra && strongDepth && change > 0) score += 1.6;
  } else if (regime === "late-risk-on" || regime === "fragile-chase") {
    if (change >= 10 && !strongDepth) score -= 4.5;
    if (highBeta && !strongDepth) score -= 2;
    if (defiOrInfra && strongDepth && change < 9) score += 1.4;
  } else if (regime === "reversal-building") {
    if (hasDepth && change >= -4 && change <= 5 && opportunityScore >= 4) score += 4;
    if (change >= 12) score -= 2.5;
  } else if (regime === "risk-off") {
    if (strongDepth && Math.abs(change) <= 6) score += 2.2;
    if (highBeta && !strongDepth) score -= 4;
    if (change >= 12) score -= 2.5;
  } else {
    if (hasDepth && constructive && change <= 8) score += 1.2;
    if (!hasDepth && highBeta) score -= 1.8;
  }

  return clamp(score, -7, 7);
}

function pulseConfidenceScore(meta, market, context = {}) {
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const change = finiteNumber(market.priceChange24h) || 0;
  const buyRatio = finiteNumber(context.buyRatio) || 0.5;
  const rankMomentum = finiteNumber(context.rankMomentum) || 0;
  const regimeFit = finiteNumber(context.regimeFit) || 0;
  const historySize = finiteNumber(context.rankingContext?.sampleSize) || 0;
  let score = 38;

  score += clamp(Math.log10(Math.max(1, volume)) - 5, 0, 2.2) * 7;
  score += clamp(Math.log10(Math.max(1, liquidity)) - 5, 0, 2.4) * 6;
  score += clamp((buyRatio - 0.5) * 90, -7, 8);
  score += clamp(rankMomentum, -4, 5) * 1.6;
  score += clamp(regimeFit, -5, 5) * 1.35;
  score += clamp(finiteNumber(context.opportunityScore) || 0, -4, 12) * 0.65;
  score += clamp(finiteNumber(context.reversalWakeupBoost) || 0, 0, 8) * 0.75;
  score += clamp((finiteNumber(context.wakeUpScore) || 40) - 48, -8, 32) * 0.28;
  score += clamp((finiteNumber(context.confirmedWakeUpScore) || 40) - 52, -8, 34) * 0.22;
  score -= clamp(finiteNumber(context.extensionPenalty) || 0, 0, 12) * 1.25;
  score -= clamp(finiteNumber(context.speculativeTrapPenalty) || 0, 0, 10) * 1.45;
  if (Math.abs(change) <= 7) score += 4;
  if (historySize >= 48) score += 3;

  return Math.round(clamp(score, 18, 92));
}

function pulseFragilityScore(meta, market, context = {}) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const theme = String(meta.theme || "").toLowerCase();
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const change = finiteNumber(market.priceChange24h) || 0;
  const buyRatio = finiteNumber(context.buyRatio) || 0.5;
  const highBeta = ["ai", "base", "consumer", "creator"].includes(theme) || ["DEGEN", "TOSHI", "BRETT", "ZORA", "FUN", "VVV", "AIXBT"].includes(ticker);
  let score = 22;

  if (volume < 150_000) score += 16;
  else if (volume < 500_000) score += 7;
  if (liquidity < 150_000) score += 18;
  else if (liquidity < 500_000) score += 7;
  if (highBeta) score += 8;
  if (change >= 12) score += 8;
  if (change >= 22) score += 10;
  if (change <= -8) score += 6;
  if (buyRatio < 0.49) score += 7;
  score += clamp(finiteNumber(context.extensionPenalty) || 0, 0, 12) * 1.6;
  score += clamp(finiteNumber(context.speculativeTrapPenalty) || 0, 0, 10) * 1.9;
  score -= clamp((finiteNumber(context.confidenceScore) || 50) - 50, -20, 24) * 0.45;
  score -= clamp((finiteNumber(context.wakeUpScore) || 40) - 58, 0, 34) * 0.28;
  score -= clamp((finiteNumber(context.confirmedWakeUpScore) || 40) - 62, 0, 32) * 0.22;

  return Math.round(clamp(score, 8, 96));
}

function pulseOpportunityScore(meta, market, buyRatio = 0.5) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const theme = String(meta.theme || "").toLowerCase();
  const change = finiteNumber(market.priceChange24h) || 0;
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const hasUsableDepth = volume >= 150_000 && liquidity >= 120_000;
  const hasStrongDepth = volume >= 650_000 && liquidity >= 250_000;
  const quietMove = Math.abs(change) <= 5;
  const constructiveFlow = buyRatio >= 0.515;
  const highBetaTheme = ["ai", "defi", "base", "consumer"].includes(theme) || ["MORPHO", "VIRTUAL", "ZRO", "ZORA", "FUN", "VVV"].includes(ticker);
  const coiledUpside = hasUsableDepth && highBetaTheme && constructiveFlow && change >= -3 && change <= 6 && (hasStrongDepth || change > 0.8);
  let score = 0;

  if (hasUsableDepth && quietMove && constructiveFlow) score += 7;
  if (hasStrongDepth && quietMove && highBetaTheme) score += 5.5;
  if (coiledUpside) score += 4.5;
  if (hasUsableDepth && highBetaTheme && quietMove && !constructiveFlow && !hasStrongDepth) score -= 3.5;
  if (hasUsableDepth && change >= -2.5 && change <= 1.5 && constructiveFlow) score += 4;
  if (hasUsableDepth && change > 4 && change <= 14 && constructiveFlow) score += 3.5;
  if (ticker === "FUN" && volume >= 125_000 && liquidity >= 250_000 && change > -3) score += 4;
  if (ticker === "MORPHO" && volume >= 400_000 && liquidity >= 120_000 && change > -2) score += 3.5;
  if (ticker === "VVV" && volume >= 1_000_000 && liquidity >= 1_000_000 && change > -2) score += 3;
  if (ticker === "ZORA" && volume >= 60_000 && liquidity >= 100_000 && change > -2) score += 3;
  if (liquidity >= 8_000_000 && Math.abs(change) < 1 && buyRatio < 0.525) score -= 5.5;
  if (volume < 75_000 || liquidity < 75_000) score -= 6;

  return Math.max(-8, Math.min(20, score));
}

function pulseSpeculativeTrapPenalty(meta, market, buyRatio = 0.5, opportunityScore = 0) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const theme = String(meta.theme || "").toLowerCase();
  const change = finiteNumber(market.priceChange24h) || 0;
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const highBetaTheme = ["ai", "base", "consumer"].includes(theme) || ["AIXBT", "BRETT", "DEGEN", "KAITO", "TOSHI", "VIRTUAL", "ZORA"].includes(ticker);
  let penalty = 0;

  if (highBetaTheme && (volume < 150_000 || liquidity < 120_000)) penalty += 4;
  if (highBetaTheme && change < 0 && buyRatio < 0.51 && opportunityScore < 5) penalty += 3.5;
  if (change <= -8 && (volume < 350_000 || liquidity < 250_000)) penalty += 3;
  if (change >= 18 && liquidity < 300_000) penalty += 3.5;

  return Math.max(0, Math.min(10, penalty));
}

function pulseReversalWakeupBoost(meta, market, buyRatio = 0.5, opportunityScore = 0) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const theme = String(meta.theme || "").toLowerCase();
  const change = finiteNumber(market.priceChange24h) || 0;
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const highBetaTheme = ["ai", "defi", "base", "consumer"].includes(theme) || ["AIXBT", "KAITO", "MORPHO", "VIRTUAL", "ZRO", "ZORA", "FUN", "VVV"].includes(ticker);
  const hasDepth = volume >= 150_000 && liquidity >= 120_000;
  const cleanFlow = buyRatio >= 0.51;
  let boost = 0;

  if (hasDepth && highBetaTheme && cleanFlow && change >= -8 && change <= 4 && opportunityScore >= 3) boost += 4.5;
  if (hasDepth && change >= -3 && change <= 2.5 && opportunityScore >= 6) boost += 2.5;
  if (volume >= 650_000 && liquidity >= 250_000 && change > -6 && change < 6 && cleanFlow) boost += 2;
  if (change <= -12 || volume < 75_000 || liquidity < 75_000) boost *= 0.45;

  return Math.max(0, Math.min(8.5, boost));
}

function pulseExtensionPenalty(meta, market, opportunityScore = 0) {
  const ticker = safeText(meta.ticker, 20).toUpperCase();
  const change = finiteNumber(market.priceChange24h) || 0;
  const volume = finiteNumber(market.volume24h) || 0;
  const liquidity = finiteNumber(market.liquidityUsd) || 0;
  const hasStrongDepth = volume >= 1_000_000 && liquidity >= 500_000;
  let penalty = 0;

  if (change >= 14 && opportunityScore < 8) penalty += 4;
  if (change >= 24 && opportunityScore < 10) penalty += 5.5;
  if (change >= 36) penalty += 5;
  if (change >= 18 && !hasStrongDepth) penalty += 4;
  if (ticker === "AERO" && change < 7 && opportunityScore < 6) penalty += 1.5;

  return Math.max(0, Math.min(12, penalty));
}

function pulseCollectorSnapshotCoin(candidate, index) {
  const projected24hChange = projectedCollectorChange(candidate, "24h");
  const projected7dChange = projectedCollectorChange(candidate, "7d");
  const projected30dChange = projectedCollectorChange(candidate, "30d");
  const projection24h = buildCollectorProjection(candidate.priceUsd, projected24hChange, candidate, "24h");
  const projection7d = graftCollectorProjectionOpening(
    buildCollectorProjection(candidate.priceUsd, projected7dChange, candidate, "7d"),
    projection24h,
    1 / 7,
  );
  const projection30d = graftCollectorProjectionOpening(
    buildCollectorProjection(candidate.priceUsd, projected30dChange, candidate, "30d"),
    projection7d,
    7 / 30,
  );
  return {
    ticker: candidate.ticker,
    name: candidate.name,
    rank: index + 1,
    source: "Server DEX Screener",
    network: "Base",
    priceUsd: candidate.priceUsd,
    volume24h: candidate.volume24h,
    liquidityUsd: candidate.liquidityUsd,
    change24h: candidate.priceChange24h,
    setupScore: Number(candidate.setupScore.toFixed(1)),
    dataEdge: candidate.dataEdge,
    pulseScore: candidate.pulseScore,
    confidenceScore: candidate.confidenceScore,
    confidenceLabel: candidate.confidenceLabel,
    fragilityScore: candidate.fragilityScore,
    signalLane: candidate.signalLane,
    graduationBoost: candidate.graduationBoost,
    graduationLabel: candidate.graduationLabel,
    graduationFlags: candidate.graduationFlags,
    graduatesFromWatchlist: candidate.graduatesFromWatchlist,
    rankMomentum: candidate.rankMomentum,
    wakeUpScore: candidate.wakeUpScore,
    wakeUpLabel: candidate.wakeUpLabel,
    wakeUpFlags: candidate.wakeUpFlags,
    confirmedWakeUpScore: candidate.confirmedWakeUpScore,
    confirmedWakeUpLabel: candidate.confirmedWakeUpLabel,
    confirmedWakeUpFlags: candidate.confirmedWakeUpFlags,
    regimeFit: candidate.regimeFit,
    regime: candidate.regime,
    projected24hChange,
    projected7dChange,
    projected30dChange,
    forecastPaths: {
      next24h: projection24h,
      next7d: projection7d,
      next30d: projection30d,
    },
    pairAddress: candidate.pairAddress,
  };
}

function pulseCollectorWatchCandidate(candidate, reason = "watching") {
  const wakeUpScore = finiteNumber(candidate.wakeUpScore) || 0;
  const confirmedWakeUpScore = finiteNumber(candidate.confirmedWakeUpScore) || 0;
  const confidenceScore = finiteNumber(candidate.confidenceScore) || 0;
  const fragilityScore = finiteNumber(candidate.fragilityScore) || 0;
  const rankMomentum = finiteNumber(candidate.rankMomentum) || 0;
  const change = finiteNumber(candidate.priceChange24h) || 0;
  const volume = finiteNumber(candidate.volume24h) || 0;
  const liquidity = finiteNumber(candidate.liquidityUsd) || 0;
  const txnTotal = (finiteNumber(candidate.buys24h) || 0) + (finiteNumber(candidate.sells24h) || 0);
  const buyRatio = txnTotal ? (finiteNumber(candidate.buys24h) || 0) / txnTotal : 0.5;
  const flowLift = clamp((buyRatio - 0.5) * 60, -4, 8);
  const depthLift = clamp(Math.log10(Math.max(1, volume + liquidity * 0.35)) - 5, -4, 8);
  const earlyMoveLift = change >= -4 && change <= 9 ? 5 : change > 16 ? -5 : 0;
  const watchScore = Math.round(clamp(
    wakeUpScore * 0.42
      + confirmedWakeUpScore * 0.22
      + confidenceScore * 0.16
      + rankMomentum * 2.2
      + flowLift
      + depthLift
      + earlyMoveLift
      - Math.max(0, fragilityScore - 55) * 0.16,
    0,
    100,
  ));
  if (watchScore < 35 && wakeUpScore < 48 && confirmedWakeUpScore < 42) return null;
  return {
    ticker: candidate.ticker,
    name: candidate.name,
    source: "Server DEX Screener watchlist",
    network: "Base",
    status: reason,
    watchScore,
    priceUsd: candidate.priceUsd,
    volume24h: candidate.volume24h,
    liquidityUsd: candidate.liquidityUsd,
    change24h: candidate.priceChange24h,
    pulseScore: candidate.pulseScore,
    confidenceScore,
    confidenceLabel: candidate.confidenceLabel,
    fragilityScore,
    signalLane: candidate.signalLane === "trap-lane" ? "trap-lane" : candidate.signalLane === "early-risky" ? "early-risky" : "wake-up-lane",
    graduationBoost: candidate.graduationBoost,
    graduationLabel: candidate.graduationLabel,
    graduationFlags: candidate.graduationFlags,
    graduatesFromWatchlist: candidate.graduatesFromWatchlist,
    rankMomentum: candidate.rankMomentum,
    wakeUpScore,
    wakeUpLabel: candidate.wakeUpLabel,
    wakeUpFlags: candidate.wakeUpFlags,
    confirmedWakeUpScore,
    confirmedWakeUpLabel: candidate.confirmedWakeUpLabel,
    confirmedWakeUpFlags: candidate.confirmedWakeUpFlags,
    reason,
    pairAddress: candidate.pairAddress,
  };
}

function projectedCollectorChange(candidate, key) {
  const horizon = key === "30d" ? 4.2 : key === "7d" ? 2.2 : 0.75;
  const reliability = Math.min(1.35, Math.max(0.5, (Math.log10(Math.max(1, candidate.volume24h)) + Math.log10(Math.max(1, candidate.liquidityUsd))) / 11.5));
  const trend = Math.max(-10, Math.min(10, candidate.priceChange24h));
  const setupBias = (candidate.setupScore - 5) * 0.8;
  const scoreBias = (candidate.pulseScore - 70) * 0.05;
  const opportunity = finiteNumber(candidate.opportunityScore) || 0;
  const opportunityBias = opportunity * (key === "30d" ? 0.18 : key === "7d" ? 0.26 : 0.38);
  const betaBias = opportunity >= 8 && trend > -3 ? (key === "30d" ? 1.1 : key === "7d" ? 0.75 : 0.45) : 0;
  const extensionBrake = (finiteNumber(candidate.extensionPenalty) || 0) * (key === "30d" ? 0.34 : key === "7d" ? 0.22 : 0.1);
  const reversalLift = (finiteNumber(candidate.reversalWakeupBoost) || 0) * (key === "30d" ? 0.2 : key === "7d" ? 0.28 : 0.38);
  const rankLift = (finiteNumber(candidate.rankMomentum) || 0) * (key === "30d" ? 0.22 : key === "7d" ? 0.34 : 0.18);
  const wakeScore = finiteNumber(candidate.wakeUpScore) || 40;
  const wakeLift = clamp((wakeScore - 55) / 9, -2, 6) * (key === "30d" ? 0.4 : key === "7d" ? 0.72 : 0.5);
  const confirmedWakeScore = finiteNumber(candidate.confirmedWakeUpScore) || 40;
  const confirmedWakeLift = clamp((confirmedWakeScore - 58) / 10, -2, 5) * (key === "30d" ? 0.32 : key === "7d" ? 0.6 : 0.44);
  const regimeLift = (finiteNumber(candidate.regimeFit) || 0) * (key === "30d" ? 0.24 : key === "7d" ? 0.32 : 0.16);
  const confidence = finiteNumber(candidate.confidenceScore) || 50;
  const fragility = finiteNumber(candidate.fragilityScore) || 45;
  const freshnessPenalty = collectorFreshnessPenalty(candidate);
  const confirmationPenalty = collectorHighBetaConfirmationPenalty(candidate);
  const quietReversalLift = collectorQuietReversalLift(candidate);
  const marketRegime = String(candidate.regime || "").toLowerCase();
  const regimeDampener = marketRegime.includes("risk-off") || marketRegime.includes("weak")
    ? key === "30d" ? 0.82 : key === "7d" ? 0.88 : 0.92
    : 1;
  const confidenceMultiplier = clamp(0.82 + (confidence - 50) / 140, 0.72, 1.18);
  const fragilityBrake = Math.max(0, fragility - 52) * (key === "30d" ? 0.06 : key === "7d" ? 0.045 : 0.025);
  const confirmationBrake = (freshnessPenalty + confirmationPenalty) * (key === "30d" ? 0.22 : key === "7d" ? 0.16 : 0.08);
  const rawSignal = trend * 0.29 + setupBias + scoreBias + opportunityBias + betaBias + reversalLift + wakeLift + confirmedWakeLift + rankLift + regimeLift + quietReversalLift - extensionBrake;
  const rawChange = (rawSignal * horizon * reliability * confidenceMultiplier * regimeDampener) - fragilityBrake - confirmationBrake;
  return Number((clamp(rawChange, key === "30d" ? -44 : key === "7d" ? -28 : -12, key === "30d" ? 58 : key === "7d" ? 34 : 15)).toFixed(2));
}

function collectorFreshnessPenalty(candidate = {}) {
  const change = finiteNumber(candidate.priceChange24h) || 0;
  const rankMomentum = finiteNumber(candidate.rankMomentum) || 0;
  const extension = finiteNumber(candidate.extensionPenalty) || 0;
  const opportunity = finiteNumber(candidate.opportunityScore) || 0;
  let penalty = 0;
  if (change >= 12 && opportunity < 7) penalty += 5;
  if (change >= 18 && opportunity < 9) penalty += 5;
  if (change >= 8 && rankMomentum < 0) penalty += 4;
  if (extension >= 5) penalty += extension * 0.8;
  return clamp(penalty, 0, 18);
}

function collectorHighBetaConfirmationPenalty(candidate = {}) {
  if (!collectorIsHighBeta(candidate)) return 0;
  const volume = finiteNumber(candidate.volume24h) || 0;
  const liquidity = finiteNumber(candidate.liquidityUsd) || 0;
  const confirmed = finiteNumber(candidate.confirmedWakeUpScore) || 0;
  const confidence = finiteNumber(candidate.confidenceScore) || 0;
  let penalty = 0;
  if (volume < 150_000) penalty += 7;
  else if (volume < 350_000) penalty += 3;
  if (liquidity < 120_000) penalty += 7;
  else if (liquidity < 300_000) penalty += 3;
  if (confirmed < 45) penalty += 4;
  if (confidence < 45) penalty += 3;
  return clamp(penalty, 0, 20);
}

function collectorQuietReversalLift(candidate = {}) {
  const change = finiteNumber(candidate.priceChange24h) || 0;
  const opportunity = finiteNumber(candidate.opportunityScore) || 0;
  const wake = finiteNumber(candidate.wakeUpScore) || 0;
  const confirmed = finiteNumber(candidate.confirmedWakeUpScore) || 0;
  const rankMomentum = finiteNumber(candidate.rankMomentum) || 0;
  const volume = finiteNumber(candidate.volume24h) || 0;
  const liquidity = finiteNumber(candidate.liquidityUsd) || 0;
  const hasDepth = volume >= 120_000 && liquidity >= 100_000;
  let lift = 0;
  if (hasDepth && change >= -5 && change <= 3 && opportunity >= 5) lift += 2.5;
  if (hasDepth && change >= -4 && change <= 2 && wake >= 55) lift += 2.5;
  if (hasDepth && confirmed >= 50 && rankMomentum > 0) lift += 2;
  if (collectorIsHighBeta(candidate) && hasDepth && change <= 4 && wake >= 60 && confirmed >= 45) lift += 2;
  return clamp(lift, 0, 9);
}

function collectorIsHighBeta(candidate = {}) {
  const ticker = safeText(candidate.ticker, 20).toUpperCase();
  const theme = String(candidate.theme || "").toLowerCase();
  return ["ai", "base", "consumer", "creator", "gaming"].includes(theme)
    || ["AIXBT", "BIO", "BNKR", "BRETT", "CHECK", "CHIP", "CLANKER", "DEGEN", "DINO", "FUN", "KAITO", "MOG", "NOCK", "TOSHI", "VIRTUAL", "VVV", "ZORA"].includes(ticker);
}

function buildCollectorProjection(startPrice, projectedChange, candidate, key) {
  const pointCount = key === "30d" ? 64 : key === "7d" ? 48 : 36;
  const seed = projectionSeed(`${candidate.ticker}:${candidate.pulseScore}:${candidate.priceChange24h}:${key}`);
  const endPrice = startPrice * (1 + projectedChange / 100);
  const amplitude = Math.max(startPrice * 0.006, startPrice * Math.min(0.09, Math.abs(candidate.priceChange24h || projectedChange) / 100 * 0.75));
  const points = [];
  for (let index = 0; index < pointCount; index += 1) {
    const progress = pointCount === 1 ? 1 : index / (pointCount - 1);
    const base = startPrice + (endPrice - startPrice) * progress;
    const wobble = Math.sin((progress * 4.8 + seed) * Math.PI) * amplitude * 0.55
      + Math.sin((progress * 15.5 + seed * 1.7) * Math.PI) * amplitude * 0.22;
    const fade = Math.sin(progress * Math.PI);
    points.push(Number(Math.max(0.00000001, base + wobble * fade).toFixed(10)));
  }
  points[0] = Number(startPrice.toFixed(10));
  points[points.length - 1] = Number(endPrice.toFixed(10));
  return points;
}

function graftCollectorProjectionOpening(longerProjection, openingProjection, ratio) {
  if (!Array.isArray(longerProjection) || !Array.isArray(openingProjection)) return longerProjection || [];
  const output = [...longerProjection];
  const openingCount = Math.max(2, Math.min(output.length, Math.round(output.length * ratio)));
  const sampledOpening = sampleNumericSeries(openingProjection, openingCount);
  const firstLong = output[0];
  const lastOpening = sampledOpening.at(-1);
  const targetAtJoin = output[openingCount - 1] || lastOpening || firstLong;
  const adjustment = Number.isFinite(lastOpening) ? targetAtJoin - lastOpening : 0;
  sampledOpening.forEach((value, index) => {
    const blend = openingCount <= 1 ? 1 : index / (openingCount - 1);
    output[index] = Number((value + adjustment * blend).toFixed(10));
  });
  return output;
}

function sampleNumericSeries(values, count) {
  if (!Array.isArray(values) || !values.length || count <= 0) return [];
  if (count === 1) return [Number(values.at(-1))].filter(Number.isFinite);
  return Array.from({ length: count }, (_, index) => {
    const position = (index / (count - 1)) * (values.length - 1);
    const lower = Math.floor(position);
    const upper = Math.min(values.length - 1, Math.ceil(position));
    const ratio = position - lower;
    const lowValue = Number(values[lower]);
    const highValue = Number(values[upper]);
    if (!Number.isFinite(lowValue)) return Number.isFinite(highValue) ? highValue : 0;
    if (!Number.isFinite(highValue)) return lowValue;
    return lowValue + (highValue - lowValue) * ratio;
  });
}

function projectionSeed(text) {
  return String(text || "").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % 997 / 997;
}

async function fetchCoinGeckoChartWithRetries(id, days = "1") {
  const normalizedDays = normalizeCoinGeckoChartDays(days);
  const targetUrl = `${COINGECKO_API_BASE_URL.replace(/\/$/, "")}/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=${encodeURIComponent(normalizedDays)}`;
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
  if (!input || typeof input !== "object") return null;
  const id = String(input.id || "").trim().toLowerCase();
  const days = normalizeCoinGeckoChartDays(input.days);
  const prices = normalizePriceList(input.prices);
  if (!isAllowedCoinGeckoId(id) || prices.length < 2) return null;
  return {
    id,
    days,
    prices,
    totalVolumes: normalizePriceList(input.totalVolumes),
    marketCaps: normalizePriceList(input.marketCaps),
    updatedAt: safeText(input.updatedAt, 40) || new Date().toISOString(),
    cachedAt: finiteNumber(input.cachedAt) || Date.now(),
  };
}

function normalizeCoinGeckoChartDays(value) {
  const normalized = String(value || "1").trim().toLowerCase();
  if (["1", "3", "7", "30"].includes(normalized)) return normalized;
  if (normalized === "1d" || normalized === "24h") return "1";
  if (normalized === "3d") return "3";
  if (normalized === "7d") return "7";
  if (normalized === "1m" || normalized === "1mo" || normalized === "30d") return "30";
  return "1";
}

function coinGeckoChartStoreKey(id, days = "1") {
  return `${String(id || "").trim().toLowerCase()}:${normalizeCoinGeckoChartDays(days)}`;
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
  const basename = path.basename(filePath);
  return basename === "index.html" || basename === "app.js" || basename === "styles.css"
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

function buildMarketHealthContext(snapshots = []) {
  const ordered = (Array.isArray(snapshots) ? snapshots : [])
    .slice()
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map(snapshotMarketRead)
    .filter(Boolean);
  const latest = ordered.at(-1) || null;
  if (!latest) {
    return {
      available: false,
      scoreDelta: 0,
      regime: "insufficient-history",
      confidence: 0,
      sampleSize: 0,
      message: "Waiting for enough stored pulse snapshots to compare the market against its own recent history.",
    };
  }

  const baseline = ordered.length >= 6 ? ordered.slice(0, -1) : ordered;
  const breadthPercentile = percentileRank(baseline.map((item) => item.breadth), latest.breadth);
  const avgChangePercentile = percentileRank(baseline.map((item) => item.avgChange), latest.avgChange);
  const participationPercentile = percentileRank(baseline.map((item) => item.participationScore), latest.participationScore);
  const extensionPercentile = percentileRank(baseline.map((item) => item.extensionPressure), latest.extensionPressure);
  const reversalPercentile = percentileRank(baseline.map((item) => item.reversalPressure), latest.reversalPressure);
  const topRankPercentile = percentileRank(baseline.map((item) => item.topRankPressure), latest.topRankPressure);
  const wakeListPercentile = percentileRank(baseline.map((item) => item.wakeListPressure), latest.wakeListPressure);
  const watchlistCountPercentile = percentileRank(baseline.map((item) => item.watchlistCount), latest.watchlistCount);

  let scoreDelta = 0;
  scoreDelta += percentileDelta(breadthPercentile) * 15;
  scoreDelta += percentileDelta(avgChangePercentile) * 13;
  scoreDelta += percentileDelta(participationPercentile) * 9;
  scoreDelta += percentileDelta(reversalPercentile) * 6;
  scoreDelta += percentileDelta(wakeListPercentile) * 5;
  scoreDelta -= percentileDelta(extensionPercentile) * 14;
  scoreDelta -= percentileDelta(topRankPercentile) * 7;

  const flags = [];
  if (breadthPercentile >= 0.65 && avgChangePercentile >= 0.6) flags.push("broad participation");
  if (reversalPercentile >= 0.7 && latest.avgChange >= -2) flags.push("reversal wake-up");
  if (wakeListPercentile >= 0.7 && latest.wakeListPressure >= 55) flags.push("watchlist wake-up");
  if (extensionPercentile >= 0.75) flags.push("late-runner pressure");
  if (topRankPercentile >= 0.75) flags.push("top-heavy deck");
  if (breadthPercentile <= 0.35 && avgChangePercentile <= 0.35) flags.push("weak breadth");

  const regime = regimeLabel({ breadthPercentile, avgChangePercentile, extensionPercentile, reversalPercentile, latest });
  const confidence = Math.round(clamp((ordered.length / 2000) * 100, ordered.length >= 24 ? 18 : 8, 100));
  return {
    available: ordered.length >= 3,
    scoreDelta: roundTo(clamp(scoreDelta, -28, 28), 1),
    regime,
    confidence,
    sampleSize: ordered.length,
    historyWeight: roundTo(clamp(ordered.length / 1800, 0.22, 0.72), 3),
    latestAt: latest.createdAt,
    latest: publicMarketRead(latest),
    percentiles: {
      breadth: roundTo(breadthPercentile, 3),
      avgChange: roundTo(avgChangePercentile, 3),
      participation: roundTo(participationPercentile, 3),
      extension: roundTo(extensionPercentile, 3),
      reversal: roundTo(reversalPercentile, 3),
      topRank: roundTo(topRankPercentile, 3),
      wakeList: roundTo(wakeListPercentile, 3),
      watchlistCount: roundTo(watchlistCountPercentile, 3),
    },
    flags,
    message: flags.length
      ? `Historical pulse read: ${flags.join(", ")}.`
      : "Historical pulse read is close to its recent baseline.",
  };
}

function snapshotMarketRead(snapshot = {}) {
  const coins = (Array.isArray(snapshot.coins) ? snapshot.coins : [])
    .map((coin) => ({
      rank: finiteNumber(coin.rank),
      change24h: finiteNumber(coin.change24h),
      projected24hChange: finiteNumber(coin.projected24hChange),
      volume24h: finiteNumber(coin.volume24h),
      liquidityUsd: finiteNumber(coin.liquidityUsd),
    }))
    .filter((coin) => Number.isFinite(coin.change24h) && ((coin.volume24h || 0) >= 75_000 || (coin.liquidityUsd || 0) >= 75_000));
  if (coins.length < 3) return null;
  const bullishCount = coins.filter((coin) => coin.change24h > 0).length;
  const avgChange = averageValue(coins.map((coin) => clamp(coin.change24h, -18, 18))) || 0;
  const avgProjection = averageValue(coins.map((coin) => clamp(coin.projected24hChange, -18, 18)).filter(Number.isFinite)) || 0;
  const strongVolumeCount = coins.filter((coin) => (coin.volume24h || 0) >= 200_000 && (coin.liquidityUsd || 0) >= 150_000).length;
  const extensionCount = coins.filter((coin) => coin.change24h >= 10 || (coin.projected24hChange || 0) >= 7).length;
  const reversalCount = coins.filter((coin) => coin.change24h > 1 && (coin.projected24hChange || 0) > 2 && coin.change24h < 9).length;
  const topRanks = coins.filter((coin) => Number.isFinite(coin.rank) && coin.rank <= 3);
  const topRankPressure = topRanks.length
    ? averageValue(topRanks.map((coin) => Math.max(0, clamp(coin.change24h, -12, 18)))) || 0
    : 0;
  const watchlist = (Array.isArray(snapshot.watchlist) ? snapshot.watchlist : [])
    .map((coin) => ({
      ticker: safeText(coin.ticker, 20).toUpperCase(),
      watchScore: finiteNumber(coin.watchScore),
      wakeUpScore: finiteNumber(coin.wakeUpScore),
      confirmedWakeUpScore: finiteNumber(coin.confirmedWakeUpScore),
      change24h: finiteNumber(coin.change24h),
      volume24h: finiteNumber(coin.volume24h),
      liquidityUsd: finiteNumber(coin.liquidityUsd),
      status: safeText(coin.status || coin.reason, 60),
    }))
    .filter((coin) => Number.isFinite(coin.watchScore) || Number.isFinite(coin.wakeUpScore));
  const wakeListPressure = averageValue(watchlist.map((coin) => finiteNumber(coin.watchScore) || finiteNumber(coin.wakeUpScore)).filter(Number.isFinite)) || 0;
  return {
    createdAt: snapshot.createdAt || "",
    count: coins.length,
    bullishCount,
    breadth: bullishCount / coins.length,
    avgChange,
    avgProjection,
    participationScore: strongVolumeCount / coins.length,
    extensionPressure: extensionCount / coins.length,
    reversalPressure: reversalCount / coins.length,
    topRankPressure,
    watchlistCount: watchlist.length,
    wakeListPressure,
    wakeListLeaders: watchlist
      .slice()
      .sort((a, b) => (finiteNumber(b.watchScore) || 0) - (finiteNumber(a.watchScore) || 0))
      .slice(0, 5),
  };
}

function publicMarketRead(read = {}) {
  return {
    count: read.count,
    bullishCount: read.bullishCount,
    breadth: roundTo(read.breadth, 3),
    avgChange: roundTo(read.avgChange, 2),
    avgProjection: roundTo(read.avgProjection, 2),
    participationScore: roundTo(read.participationScore, 3),
    extensionPressure: roundTo(read.extensionPressure, 3),
    reversalPressure: roundTo(read.reversalPressure, 3),
    topRankPressure: roundTo(read.topRankPressure, 2),
    watchlistCount: read.watchlistCount,
    wakeListPressure: roundTo(read.wakeListPressure, 2),
    wakeListLeaders: Array.isArray(read.wakeListLeaders) ? read.wakeListLeaders : [],
  };
}

function buildInternalAccuracyDashboard(snapshots = [], accuracy = null) {
  const ordered = (Array.isArray(snapshots) ? snapshots : [])
    .slice()
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const outcomes = [];
  for (const snapshot of ordered) {
    const startTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(startTime)) continue;
    for (const coin of Array.isArray(snapshot.coins) ? snapshot.coins : []) {
      const startPrice = finiteNumber(coin.priceUsd);
      const projectedChange = finiteNumber(coin.projected24hChange);
      if (!startPrice || !Number.isFinite(projectedChange)) continue;
      const future = findDashboardFutureCoin(ordered, coin, startTime + 24 * 60 * 60 * 1000);
      const endPrice = finiteNumber(future?.priceUsd);
      if (!endPrice) continue;
      const actualChange = ((endPrice - startPrice) / startPrice) * 100;
      outcomes.push({
        ticker: safeText(coin.ticker, 20).toUpperCase(),
        rank: finiteNumber(coin.rank),
        projectedChange,
        actualChange,
        error: actualChange - projectedChange,
        absoluteError: Math.abs(actualChange - projectedChange),
        confidenceScore: finiteNumber(coin.confidenceScore),
        fragilityScore: finiteNumber(coin.fragilityScore),
        wakeUpScore: finiteNumber(coin.wakeUpScore),
        confirmedWakeUpScore: finiteNumber(coin.confirmedWakeUpScore),
        rankMomentum: finiteNumber(coin.rankMomentum),
        volume24h: finiteNumber(coin.volume24h),
        liquidityUsd: finiteNumber(coin.liquidityUsd),
        regime: safeText(coin.regime, 40),
      });
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    snapshots: ordered.length,
    checked24h: outcomes.length,
    headline: {
      directionAccuracy: percent(outcomes.filter((item) => dashboardDirectionMatches(item.projectedChange, item.actualChange)).length, outcomes.length),
      averageProjectedChange: roundTo(averageValue(outcomes.map((item) => item.projectedChange)), 2),
      averageActualChange: roundTo(averageValue(outcomes.map((item) => item.actualChange)), 2),
      meanAbsoluteError: roundTo(averageValue(outcomes.map((item) => item.absoluteError)), 2),
    },
    accuracy,
    byTicker: summarizeDashboardGroups(outcomes, (item) => item.ticker).slice(0, 14),
    overRanked: outcomes
      .filter((item) => (item.rank || 99) <= 5 && item.actualChange < item.projectedChange - 4)
      .sort((a, b) => b.absoluteError - a.absoluteError)
      .slice(0, 10)
      .map(publicDashboardOutcome),
    missedUpside: outcomes
      .filter((item) => item.actualChange >= 4 && item.projectedChange < item.actualChange / 2)
      .sort((a, b) => (b.actualChange - b.projectedChange) - (a.actualChange - a.projectedChange))
      .slice(0, 10)
      .map(publicDashboardOutcome),
    confidenceBands: summarizeDashboardBands(outcomes, (item) => item.confidenceScore, [[0, 45, "low"], [45, 65, "medium"], [65, 101, "high"]]),
    fragilityBands: summarizeDashboardBands(outcomes, (item) => item.fragilityScore, [[0, 35, "low"], [35, 60, "medium"], [60, 101, "high"]]),
    wakeBands: summarizeDashboardBands(outcomes, (item) => item.wakeUpScore, [[0, 45, "quiet"], [45, 70, "building"], [70, 101, "hot"]]),
  };
}

function findDashboardFutureCoin(snapshots, coin, targetTime) {
  for (const snapshot of snapshots) {
    const snapshotTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(snapshotTime) || snapshotTime < targetTime) continue;
    const ticker = safeText(coin.ticker, 20).toUpperCase();
    const match = (Array.isArray(snapshot.coins) ? snapshot.coins : []).find((futureCoin) => safeText(futureCoin.ticker, 20).toUpperCase() === ticker);
    if (match) return match;
  }
  return null;
}

function summarizeDashboardGroups(outcomes, keyForItem) {
  const groups = new Map();
  outcomes.forEach((item) => {
    const key = keyForItem(item);
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  return [...groups.entries()].map(([key, items]) => ({
    key,
    count: items.length,
    directionAccuracy: percent(items.filter((item) => dashboardDirectionMatches(item.projectedChange, item.actualChange)).length, items.length),
    averageProjectedChange: roundTo(averageValue(items.map((item) => item.projectedChange)), 2),
    averageActualChange: roundTo(averageValue(items.map((item) => item.actualChange)), 2),
    meanAbsoluteError: roundTo(averageValue(items.map((item) => item.absoluteError)), 2),
  })).sort((a, b) => b.count - a.count || b.meanAbsoluteError - a.meanAbsoluteError);
}

function summarizeDashboardBands(outcomes, valueForItem, bands) {
  return bands.map(([min, max, label]) => {
    const items = outcomes.filter((item) => {
      const value = finiteNumber(valueForItem(item));
      return Number.isFinite(value) && value >= min && value < max;
    });
    return {
      label,
      count: items.length,
      directionAccuracy: percent(items.filter((item) => dashboardDirectionMatches(item.projectedChange, item.actualChange)).length, items.length),
      averageProjectedChange: roundTo(averageValue(items.map((item) => item.projectedChange)), 2),
      averageActualChange: roundTo(averageValue(items.map((item) => item.actualChange)), 2),
      meanAbsoluteError: roundTo(averageValue(items.map((item) => item.absoluteError)), 2),
    };
  });
}

function publicDashboardOutcome(item) {
  return {
    ticker: item.ticker,
    rank: item.rank,
    projectedChange: roundTo(item.projectedChange, 2),
    actualChange: roundTo(item.actualChange, 2),
    error: roundTo(item.error, 2),
    confidenceScore: item.confidenceScore,
    fragilityScore: item.fragilityScore,
    wakeUpScore: item.wakeUpScore,
    confirmedWakeUpScore: item.confirmedWakeUpScore,
    volume24h: item.volume24h,
    liquidityUsd: item.liquidityUsd,
  };
}

function dashboardDirectionMatches(projectedChange, actualChange) {
  if (Math.abs(projectedChange) < 1 && Math.abs(actualChange) < 1.5) return true;
  return (projectedChange >= 0 && actualChange >= 0) || (projectedChange < 0 && actualChange < 0);
}

function percent(part, total) {
  return total ? Math.round((part / total) * 100) : null;
}

function buildWakeUpReview(snapshots = []) {
  const ordered = (Array.isArray(snapshots) ? snapshots : [])
    .slice()
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const groups = new Map();
  let watchEvents = 0;
  let deckEvents = 0;

  for (const snapshot of ordered) {
    const createdAt = snapshot.createdAt || "";
    const time = new Date(createdAt).getTime();
    if (!Number.isFinite(time)) continue;
    for (const coin of Array.isArray(snapshot.watchlist) ? snapshot.watchlist : []) {
      const ticker = safeText(coin.ticker, 20).toUpperCase();
      if (!ticker) continue;
      if (!groups.has(ticker)) groups.set(ticker, emptyWakeReviewTicker(ticker, coin.name));
      const row = groups.get(ticker);
      const watchScore = finiteNumber(coin.watchScore);
      const wakeUpScore = finiteNumber(coin.wakeUpScore);
      const priceUsd = finiteNumber(coin.priceUsd);
      watchEvents += 1;
      row.watchEvents += 1;
      row.firstWatchAt ||= createdAt;
      row.latestWatchAt = createdAt;
      row.latestWatchScore = Number.isFinite(watchScore) ? watchScore : row.latestWatchScore;
      row.maxWatchScore = Math.max(row.maxWatchScore || 0, Number.isFinite(watchScore) ? watchScore : 0);
      row.avgWatchScores.push(watchScore);
      row.avgWakeScores.push(wakeUpScore);
      row.watchPrices.push({ time, price: priceUsd });
      row.lanes.add(safeText(coin.signalLane || coin.status || "wake-up-lane", 40));
      for (const flag of Array.isArray(coin.wakeUpFlags) ? coin.wakeUpFlags : []) row.flags.set(flag, (row.flags.get(flag) || 0) + 1);
    }
    for (const coin of Array.isArray(snapshot.coins) ? snapshot.coins : []) {
      const ticker = safeText(coin.ticker, 20).toUpperCase();
      if (!ticker) continue;
      if (!groups.has(ticker)) groups.set(ticker, emptyWakeReviewTicker(ticker, coin.name));
      const row = groups.get(ticker);
      deckEvents += 1;
      row.deckEvents += 1;
      row.latestDeckRank = finiteNumber(coin.rank);
      row.latestDeckAt = createdAt;
      row.deckPrices.push({ time, price: finiteNumber(coin.priceUsd), rank: finiteNumber(coin.rank) });
      if (!row.firstDeckAt) row.firstDeckAt = createdAt;
    }
  }

  const tickers = [...groups.values()].map((row) => finalizeWakeReviewTicker(row, ordered)).sort((a, b) => {
    if (a.graduated !== b.graduated) return a.graduated ? -1 : 1;
    return b.priorityScore - a.priorityScore || b.maxWatchScore - a.maxWatchScore || b.watchEvents - a.watchEvents;
  });
  const graduated = tickers.filter((row) => row.graduated);
  const activeWatchlist = tickers.filter((row) => !row.graduated && row.watchEvents > 0 && row.priorityScore >= 50);
  const trapLane = tickers.filter((row) => row.lanes.includes("trap-lane"));
  return {
    generatedAt: new Date().toISOString(),
    snapshotCount: ordered.length,
    watchEvents,
    deckEvents,
    graduatedCount: graduated.length,
    activeWatchCount: activeWatchlist.length,
    trapLaneCount: trapLane.length,
    topGraduations: graduated.slice(0, 8),
    activeWatchlist: activeWatchlist.slice(0, 10),
    trapLane: trapLane.slice(0, 10),
    all: tickers.slice(0, 30),
    lesson: wakeReviewLesson({ graduated, activeWatchlist, trapLane, watchEvents }),
  };
}

function emptyWakeReviewTicker(ticker, name = "") {
  return {
    ticker,
    name: safeText(name, 80),
    watchEvents: 0,
    deckEvents: 0,
    firstWatchAt: "",
    latestWatchAt: "",
    firstDeckAt: "",
    latestDeckAt: "",
    latestDeckRank: null,
    latestWatchScore: null,
    maxWatchScore: 0,
    avgWatchScores: [],
    avgWakeScores: [],
    watchPrices: [],
    deckPrices: [],
    lanes: new Set(),
    flags: new Map(),
  };
}

function finalizeWakeReviewTicker(row, snapshots = []) {
  const firstWatchTime = new Date(row.firstWatchAt).getTime();
  const firstDeckTime = new Date(row.firstDeckAt).getTime();
  const firstWatchPrice = row.watchPrices.find((item) => Number.isFinite(item.price))?.price || null;
  const firstDeckPrice = row.deckPrices.find((item) => Number.isFinite(item.price) && (!Number.isFinite(firstWatchTime) || item.time >= firstWatchTime))?.price || null;
  const future24h = Number.isFinite(firstWatchTime) ? findTickerPriceAtOrAfter(snapshots, row.ticker, firstWatchTime + 24 * 60 * 60 * 1000) : null;
  const avgWatchScore = averageValue(row.avgWatchScores.filter(Number.isFinite));
  const avgWakeScore = averageValue(row.avgWakeScores.filter(Number.isFinite));
  const graduated = Boolean(row.firstWatchAt && row.firstDeckAt && Number.isFinite(firstDeckTime) && Number.isFinite(firstWatchTime) && firstDeckTime >= firstWatchTime);
  const timeToDeckHours = graduated ? roundTo((firstDeckTime - firstWatchTime) / (60 * 60 * 1000), 1) : null;
  const moveBeforeDeck = firstWatchPrice && firstDeckPrice ? roundTo(((firstDeckPrice - firstWatchPrice) / firstWatchPrice) * 100, 2) : null;
  const moveAfter24h = firstWatchPrice && future24h?.price ? roundTo(((future24h.price - firstWatchPrice) / firstWatchPrice) * 100, 2) : null;
  const topFlags = [...row.flags.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([flag]) => flag);
  const lanes = [...row.lanes].filter(Boolean);
  const priorityScore = Math.round(clamp(
    (avgWatchScore || 0) * 0.42
      + (avgWakeScore || 0) * 0.28
      + Math.min(18, row.watchEvents * 2)
      + (graduated ? 14 : 0)
      + (Number.isFinite(moveAfter24h) ? clamp(moveAfter24h, -8, 18) * 0.7 : 0),
    0,
    100,
  ));
  return {
    ticker: row.ticker,
    name: row.name,
    watchEvents: row.watchEvents,
    deckEvents: row.deckEvents,
    graduated,
    firstWatchAt: row.firstWatchAt,
    latestWatchAt: row.latestWatchAt,
    firstDeckAt: row.firstDeckAt,
    latestDeckAt: row.latestDeckAt,
    latestDeckRank: row.latestDeckRank,
    timeToDeckHours,
    moveBeforeDeck,
    moveAfter24h,
    latestWatchScore: row.latestWatchScore,
    maxWatchScore: row.maxWatchScore,
    averageWatchScore: roundTo(avgWatchScore || 0, 1),
    averageWakeUpScore: roundTo(avgWakeScore || 0, 1),
    priorityScore,
    lanes,
    topFlags,
  };
}

function findTickerPriceAtOrAfter(snapshots = [], ticker = "", targetTime = 0) {
  const cleanTicker = safeText(ticker, 20).toUpperCase();
  for (const snapshot of snapshots) {
    const time = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(time) || time < targetTime) continue;
    const rows = [
      ...(Array.isArray(snapshot.coins) ? snapshot.coins : []),
      ...(Array.isArray(snapshot.watchlist) ? snapshot.watchlist : []),
    ];
    const match = rows.find((coin) => safeText(coin.ticker, 20).toUpperCase() === cleanTicker && Number.isFinite(finiteNumber(coin.priceUsd)));
    if (match) return { at: snapshot.createdAt, price: finiteNumber(match.priceUsd) };
  }
  return null;
}

function wakeReviewLesson({ graduated = [], activeWatchlist = [], trapLane = [], watchEvents = 0 } = {}) {
  if (!watchEvents) return "No wake-up watchlist events have been collected yet. Deploy this version and let a few collector cycles run.";
  if (graduated.length) return "Some watchlist names graduated into the main deck. Compare time-to-deck and move-before-deck to see whether the machine caught them early enough.";
  if (activeWatchlist.length) return "The wake-up lane has active candidates, but they have not graduated yet. Watch for persistence across multiple 5-minute cycles.";
  if (trapLane.length) return "The machine is mostly seeing fragile movement, so the trap lane matters more than promotion right now.";
  return "Wake-up data is collecting, but no strong graduation pattern is visible yet.";
}

function percentileRank(values = [], value) {
  const clean = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!clean.length || !Number.isFinite(value)) return 0.5;
  const belowOrEqual = clean.filter((item) => item <= value).length;
  return belowOrEqual / clean.length;
}

function percentileDelta(percentile) {
  return clamp((Number(percentile) || 0.5) - 0.5, -0.5, 0.5) * 2;
}

function regimeLabel({ breadthPercentile, avgChangePercentile, extensionPercentile, reversalPercentile, latest }) {
  if (extensionPercentile >= 0.78 && latest.avgChange >= 5) return "late-risk-on";
  if (breadthPercentile >= 0.65 && avgChangePercentile >= 0.6) return "risk-on";
  if (reversalPercentile >= 0.7 && latest.avgChange >= -2) return "reversal-building";
  if (breadthPercentile <= 0.35 && avgChangePercentile <= 0.35) return "risk-off";
  if (extensionPercentile >= 0.72) return "fragile-chase";
  return "mixed";
}

function averageValue(values = []) {
  const clean = values.filter(Number.isFinite);
  return clean.length ? clean.reduce((sum, value) => sum + value, 0) / clean.length : null;
}

function roundTo(value, digits = 2) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  const factor = 10 ** digits;
  return Math.round(number * factor) / factor;
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
