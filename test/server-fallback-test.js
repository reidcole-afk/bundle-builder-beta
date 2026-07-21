const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const os = require("node:os");
const path = require("node:path");

process.env.BUNDLE_BUILDER_CHART_CACHE_FILE = path.join(os.tmpdir(), `bundle-builder-test-charts-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
process.env.BUNDLE_BUILDER_ADMIN_SECRET = "test-admin-secret";

const { handleRequest, handleServerError } = require("../src/server");

const originalFetch = global.fetch;
global.fetch = async (url) => {
  const target = String(url);
  if (target.includes("/vs2/api/coins")) throw new Error("simulated ViciSwap API outage");
  return { ok: true, json: async () => ({}) };
};

(async () => {
  const health = await getJson("/health");
  assert.equal(health.statusCode, 200);
  assert.equal(health.body.version, "0.1.163");
  assert.equal(health.body.strictEligibilityDefault, true);
  assert.equal(health.body.liquidityEndpointFailsClosed, true);
  assert.equal(health.body.tokensEndpointFailsClosed, true);
  assert.equal(health.body.friendlyPortErrors, true);
  assert.equal(health.body.coingeckoChartWorkflowCache, true);
  assert.equal(health.body.chartCacheStorage.configured, true);
  assert.equal(health.body.normalizedMarketChartEndpoint, true);
  assert.equal(health.body.catalystIntelligenceEndpoint, true);
  assert.equal(health.body.machineAccuracyEndpoint, true);
  assert.equal(health.body.coingeckoChartBackgroundPreload.enabled, false);
  assert.equal(health.body.coingeckoChartBackgroundPreload.startupDelayMs, 180000);
  assert.equal(typeof health.body.pulseBackgroundCollector.enabled, "boolean");
  assert(Number.isFinite(health.body.pulseBackgroundCollector.intervalMs));
  assert.equal(health.body.pulseBackgroundCollector.deckSize, 8);
  assert.equal(health.body.homepage.enabled, true);
  assert.equal(health.body.homepage.indexExists, true);
  assert.equal(health.body.betaScope, "invite-only Base beta by default");

  const homepage = await getRaw("/");
  assert.equal(homepage.statusCode, 200);
  assert(homepage.headers["content-type"].includes("text/html"));
  assert(homepage.body.includes("Bundle Builder beta"));
  assert(!homepage.body.includes("Download extension"));
  assert(!homepage.body.includes("Chrome extension"));

  const stylesheet = await getRaw("/styles.css");
  assert.equal(stylesheet.statusCode, 200);
  assert(stylesheet.headers["content-type"].includes("text/css"));

  const blockedProxy = await getJson("/api/v1/market-proxy?url=https%3A%2F%2Fexample.com%2Fbad.json");
  assert.equal(blockedProxy.statusCode, 400);
  assert.equal(blockedProxy.body.ok, false);

  const catalystFallback = await getJson("/api/v1/catalyst?network=base&ticker=AERO&name=Aerodrome%20Finance");
  assert.equal(catalystFallback.statusCode, 200);
  assert.equal(catalystFallback.body.ok, true);
  assert.equal(catalystFallback.body.ticker, "AERO");
  assert.equal(catalystFallback.body.source, "Bundle Builder catalyst watchlist");
  assert.equal(catalystFallback.body.signalType, "market-context");
  assert.equal(catalystFallback.body.score, 0);
  assert(catalystFallback.body.contextStrength > 0);
  assert.equal(catalystFallback.body.verifiedArticleCount, 0);
  assert.deepEqual(catalystFallback.body.articles, []);
  assert.equal(catalystFallback.body.topTitle, "");
  assert(catalystFallback.body.summary.includes("No recent article was confirmed"));
  assert(catalystFallback.body.socialWatch.includes("Monitor"));
  assert(catalystFallback.body.searches.xSearch.includes("x.com/search"));

  global.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/api/v3/coins/aerodrome-finance/market_chart")) {
      return { ok: true, json: async () => ({ prices: [[1, 1], [2, 1.1]] }) };
    }
    if (target.includes("/api/v2/networks/base/pools/0x0000000000000000000000000000000000000001/ohlcv/minute")) {
      return { ok: true, json: async () => ({ data: { attributes: { ohlcv_list: [[2, 1, 1, 1, 1.1, 100], [1, 1, 1, 1, 1, 100]] } } }) };
    }
    if (target.includes("/vs2/api/coins")) throw new Error("simulated ViciSwap API outage");
    return { ok: true, json: async () => ({}) };
  };

  const allowedProxy = await getJson("/api/v1/market-proxy?url=https%3A%2F%2Fapi.coingecko.com%2Fapi%2Fv3%2Fcoins%2Faerodrome-finance%2Fmarket_chart%3Fvs_currency%3Dusd%26days%3D1");
  assert.equal(allowedProxy.statusCode, 200);
  assert.deepEqual(allowedProxy.body.prices, [[1, 1], [2, 1.1]]);

  const geckoTerminalProxy = await getJson("/api/v1/market-proxy?url=https%3A%2F%2Fapi.geckoterminal.com%2Fapi%2Fv2%2Fnetworks%2Fbase%2Fpools%2F0x0000000000000000000000000000000000000001%2Fohlcv%2Fminute%3Faggregate%3D15%26limit%3D96%26currency%3Dusd");
  assert.equal(geckoTerminalProxy.statusCode, 200);
  assert.equal(geckoTerminalProxy.body.data.attributes.ohlcv_list.length, 2);

  const chartStatus = await getJson("/api/v1/coingecko-chart/status");
  assert.equal(chartStatus.statusCode, 200);
  assert.equal(chartStatus.body.ok, true);
  assert.equal(chartStatus.body.preload.enabled, false);
  assert.equal(chartStatus.body.storage.configured, true);

  const workflowChart = await getJson("/api/v1/coingecko-chart?id=aerodrome-finance&force=true");
  assert.equal(workflowChart.statusCode, 200);
  assert.equal(workflowChart.body.ok, true);
  assert.deepEqual(workflowChart.body.prices, [1, 1.1]);

  const normalizedCoinGeckoChart = await getJson("/api/v1/market-chart?id=aerodrome-finance&window=7d&force=true");
  assert.equal(normalizedCoinGeckoChart.statusCode, 200);
  assert.equal(normalizedCoinGeckoChart.body.ok, true);
  assert.equal(normalizedCoinGeckoChart.body.window, "7d");
  assert.equal(normalizedCoinGeckoChart.body.source, "CoinGecko");
  assert.deepEqual(normalizedCoinGeckoChart.body.prices, [1, 1.1]);

  const normalizedGeckoTerminalChart = await getJson("/api/v1/market-chart?chainId=base&pairAddress=0x0000000000000000000000000000000000000001&window=24h&force=true");
  assert.equal(normalizedGeckoTerminalChart.statusCode, 200);
  assert.equal(normalizedGeckoTerminalChart.body.ok, true);
  assert.equal(normalizedGeckoTerminalChart.body.window, "24h");
  assert.equal(normalizedGeckoTerminalChart.body.source, "GeckoTerminal");
  assert.deepEqual(normalizedGeckoTerminalChart.body.prices, [1, 1.1]);

  const preferredPoolChart = await getJson("/api/v1/market-chart?id=aerodrome-finance&chainId=base&pairAddress=0x0000000000000000000000000000000000000001&window=24h&source=geckoterminal&force=true");
  assert.equal(preferredPoolChart.statusCode, 200);
  assert.equal(preferredPoolChart.body.ok, true);
  assert.equal(preferredPoolChart.body.source, "GeckoTerminal");
  assert.deepEqual(preferredPoolChart.body.prices, [1, 1.1]);

  const submittedBundle = await postJson("/api/v1/submitted-bundles", {
    bundleName: "Test Bundle",
    network: "Base",
    startValueUsd: 100,
    coins: [
      { ticker: "AERO", allocationPercent: 50, amountUsd: 50, quantity: 100, startPriceUsd: 0.5, network: "Base" },
      { ticker: "MORPHO", allocationPercent: 50, amountUsd: 50, quantity: 25, startPriceUsd: 2, network: "Base" },
    ],
  });
  assert.equal(submittedBundle.statusCode, 201);
  assert.equal(submittedBundle.body.ok, true);
  assert.equal(submittedBundle.body.bundle.coins.length, 2);

  const submittedFeedBlocked = await getJson("/api/v1/submitted-bundles?limit=5");
  assert.equal(submittedFeedBlocked.statusCode, 401);

  const submittedFeed = await getJson("/api/v1/submitted-bundles?limit=5", adminHeaders());
  assert.equal(submittedFeed.statusCode, 200);
  assert.equal(submittedFeed.body.ok, true);
  assert(submittedFeed.body.bundles.some((bundle) => bundle.bundleName === "Test Bundle"));

  const pulseSnapshotBlocked = await postJson("/api/v1/pulse-snapshots?includeAccuracy=true", {
    network: "Base",
    coins: [{ ticker: "AERO", priceUsd: 0.5 }],
  });
  assert.equal(pulseSnapshotBlocked.statusCode, 401);

  const pulseSnapshot = await postJson("/api/v1/pulse-snapshots?includeAccuracy=true", {
    network: "Base",
    selectedWindow: "24h",
    selectedReadWindow: "7d",
    coins: [
      {
        ticker: "AERO",
        name: "Aerodrome Finance",
        rank: 1,
        priceUsd: 0.5,
        projected24hChange: 2,
        projected7dChange: 4,
        projected30dChange: 9,
        forecastPaths: { next24h: [100, 101, 102], next7d: [100, 102, 104], next30d: [100, 104, 109] },
      },
      {
        ticker: "MORPHO",
        name: "Morpho",
        rank: 2,
        priceUsd: 2,
        projected24hChange: -1,
        projected7dChange: 1,
        projected30dChange: 3,
        forecastPaths: { next24h: [100, 99.5, 99], next7d: [100, 100.5, 101], next30d: [100, 101.5, 103] },
      },
    ],
  }, adminHeaders());
  assert.equal(pulseSnapshot.statusCode, 201);
  assert.equal(pulseSnapshot.body.ok, true);
  assert.equal(pulseSnapshot.body.snapshot.coins.length, 2);
  assert.equal(pulseSnapshot.body.snapshot.coins[0].forecastPaths.next24h.length, 3);
  assert.equal(pulseSnapshot.body.accuracy.totalSnapshots >= 1, true);

  const machineAccuracyBlocked = await getJson("/api/v1/machine-accuracy");
  assert.equal(machineAccuracyBlocked.statusCode, 401);

  const snapshotExportBlocked = await getJson("/api/v1/pulse-snapshots/export?limit=1");
  assert.equal(snapshotExportBlocked.statusCode, 401);

  const machineAccuracy = await getJson("/api/v1/machine-accuracy", adminHeaders());
  assert.equal(machineAccuracy.statusCode, 200);
  assert.equal(machineAccuracy.body.ok, true);
  assert.equal(typeof machineAccuracy.body.collector.enabled, "boolean");
  assert.equal(machineAccuracy.body.accuracy.horizons.length, 3);
  assert.equal(machineAccuracy.body.accuracy.deepDive24h.label, "24h");
  assert(Number.isFinite(machineAccuracy.body.accuracy.deepDive24h.checked));
  assert.equal(machineAccuracy.body.accuracy.pathAccuracy.length, 3);
  assert.equal(machineAccuracy.body.accuracy.pathAccuracy[0].label, "Next 24h");
  assert.equal(machineAccuracy.body.accuracy.partialPathAccuracy.length, 3);
  assert.equal(machineAccuracy.body.accuracy.partialPathAccuracy[0].label, "Next 24h");

  const marketHealth = await getJson("/api/v1/market-health");
  assert.equal(marketHealth.statusCode, 200);
  assert.equal(marketHealth.body.ok, true);
  assert.equal(typeof marketHealth.body.context.scoreDelta, "number");
  assert.equal(typeof marketHealth.body.context.regime, "string");
  assert(Number.isFinite(marketHealth.body.context.sampleSize));

  const collectorStatus = await getJson("/api/v1/pulse-collector/status");
  assert.equal(collectorStatus.statusCode, 200);
  assert.equal(collectorStatus.body.ok, true);
  assert.equal(typeof collectorStatus.body.collector.enabled, "boolean");
  assert.equal(collectorStatus.body.collector.deckSize, 8);

  const loginRequest = await postJson("/api/v1/auth/request-code", { email: "tester@example.com" });
  assert.equal(loginRequest.statusCode, 200);
  assert.equal(loginRequest.body.ok, true);
  assert.match(loginRequest.body.devCode, /^\d{6}$/);

  const loginVerify = await postJson("/api/v1/auth/verify-code", { email: "tester@example.com", code: loginRequest.body.devCode });
  assert.equal(loginVerify.statusCode, 200);
  assert.equal(loginVerify.body.ok, true);
  assert(loginVerify.body.token);

  const savedProfile = await putJson("/api/v1/profile", {
    profile: { displayName: "Tester" },
    favoriteCoins: [{ ticker: "AERO", network: "Base" }],
    recentBundles: [{ id: "bundle-1", name: "AERO test", allocation: [{ ticker: "AERO", weight: 100 }] }],
    reviewAlerts: [{ id: "review-1", status: "pending" }],
    builderPreferences: { network: "Base" },
  }, loginVerify.body.token);
  assert.equal(savedProfile.statusCode, 200);
  assert.equal(savedProfile.body.ok, true);
  assert.equal(savedProfile.body.profile.snapshot.favoriteCoins[0].ticker, "AERO");

  const loadedProfile = await getJson("/api/v1/profile", {
    authorization: `Bearer ${loginVerify.body.token}`,
  });
  assert.equal(loadedProfile.statusCode, 200);
  assert.equal(loadedProfile.body.profile.email, "tester@example.com");
  assert.equal(loadedProfile.body.profile.snapshot.profile.displayName, "Tester");

  global.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/api/v3/coins/aerodrome-finance/market_chart")) throw new Error("simulated CoinGecko chart outage");
    if (target.includes("/vs2/api/coins")) throw new Error("simulated ViciSwap API outage");
    return { ok: true, json: async () => ({}) };
  };

  const staleWorkflowChart = await getJson("/api/v1/coingecko-chart?id=aerodrome-finance");
  assert.equal(staleWorkflowChart.statusCode, 200);
  assert.equal(staleWorkflowChart.body.ok, true);
  assert(staleWorkflowChart.body.cacheStatus.includes("cache"));
  assert.deepEqual(staleWorkflowChart.body.prices, [1, 1.1]);

  const strictTokens = await getJson("/api/v1/tokens?network=base");
  assert.equal(strictTokens.statusCode, 503);
  assert.equal(strictTokens.body.ok, false);
  assert.equal(strictTokens.body.source, "vici-api-unavailable");
  assert.equal(strictTokens.body.fallbackEligibilityUsed, false);
  assert.equal(strictTokens.body.tokens.length, 0);

  const nonBaseTokens = await getJson("/api/v1/tokens?network=polygon");
  assert.equal(nonBaseTokens.statusCode, 400);
  assert.equal(nonBaseTokens.body.ok, false);
  assert.equal(nonBaseTokens.body.code, "NETWORK_NOT_SUPPORTED_IN_BETA");

  const demoTokens = await getJson("/api/v1/tokens?network=base&allowFallbackEligibility=true");
  assert.equal(demoTokens.statusCode, 200);
  assert.equal(demoTokens.body.ok, true);
  assert.equal(demoTokens.body.source, "fallback-starter-list");
  assert.equal(demoTokens.body.fallbackEligibilityUsed, true);
  assert(demoTokens.body.tokens.length > 0);

  const strictBundle = await getJson("/api/v1/bundle?network=base&risk=moderate&focus=defi&coinCount=6&amountUsd=100&marketData=false&categoryIntelligence=false");
  assert.equal(strictBundle.statusCode, 503);
  assert.equal(strictBundle.body.ok, false);
  assert.equal(strictBundle.body.dataSources.eligibility, "vici-api-unavailable");
  assert.equal(strictBundle.body.dataSources.fallbackEligibilityUsed, false);

  global.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/vs2/api/coins")) {
      return { ok: true, json: async () => [{ symbol: "MORPHO", name: "Morpho Token", address: "0x0000000000000000000000000000000000000001" }] };
    }
    if (target.includes("/api/coin_data")) throw new Error("simulated ViciSwap liquidity API outage");
    return { ok: true, json: async () => ({}) };
  };

  const strictLiquidityBundle = await getJson("/api/v1/bundle?network=base&risk=moderate&focus=defi&coinCount=3&amountUsd=100&marketData=false&categoryIntelligence=false");
  assert.equal(strictLiquidityBundle.statusCode, 503);
  assert.equal(strictLiquidityBundle.body.ok, false);
  assert.equal(strictLiquidityBundle.body.code, "LIQUIDITY_SOURCE_UNAVAILABLE");
  assert.equal(strictLiquidityBundle.body.dataSources.liquiditySource, "vici-coin-data-unavailable");

  const demoLiquidityBundle = await getJson("/api/v1/bundle?network=base&risk=moderate&focus=defi&coinCount=3&amountUsd=100&marketData=false&categoryIntelligence=false&allowFallbackLiquidity=true");
  assert.equal(demoLiquidityBundle.statusCode, 200);
  assert.equal(demoLiquidityBundle.body.ok, true);
  assert.equal(demoLiquidityBundle.body.dataSources.liquiditySource, "fallback-liquidity-list");

  const nonBaseBundle = await getJson("/api/v1/bundle?network=polygon&risk=moderate&focus=defi&coinCount=6&amountUsd=100&marketData=false&categoryIntelligence=false");
  assert.equal(nonBaseBundle.statusCode, 400);
  assert.equal(nonBaseBundle.body.ok, false);
  assert.equal(nonBaseBundle.body.code, "NETWORK_NOT_SUPPORTED_IN_BETA");

  const oldExitCode = process.exitCode;
  const oldConsoleError = console.error;
  const errors = [];
  console.error = (message) => errors.push(String(message));
  process.exitCode = undefined;
  handleServerError({ code: "EADDRINUSE" });
  assert.equal(process.exitCode, 1);
  assert(errors.some((line) => line.includes("already in use")));
  process.exitCode = oldExitCode;
  console.error = oldConsoleError;

  console.log("bundle-builder-api server fallback test ok");
})()
  .finally(async () => {
    global.fetch = originalFetch;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

function getJson(path, headers) {
  return getRaw(path, headers ? { headers: { host: "localhost", ...headers } } : undefined)
    .then(({ statusCode, headers: responseHeaders, body }) => ({ statusCode, headers: responseHeaders, body: JSON.parse(body) }));
}

function putJson(path, payload, token) {
  return getRaw(path, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { "content-type": "application/json", host: "localhost", authorization: `Bearer ${token}` },
  }).then(({ statusCode, headers, body }) => ({ statusCode, headers, body: JSON.parse(body) }));
}

function postJson(path, payload, headers = {}) {
  return getRaw(path, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "content-type": "application/json", host: "localhost", ...headers },
  }).then(({ statusCode, headers, body }) => ({ statusCode, headers, body: JSON.parse(body) }));
}

function adminHeaders() {
  return { "x-bundle-builder-admin-secret": "test-admin-secret" };
}

function getRaw(path, options = {}) {
  return new Promise((resolve, reject) => {
    const request = new EventEmitter();
    request.method = options.method || "GET";
    request.url = path;
    request.headers = options.headers || { host: "localhost" };

    const response = {
      headers: {},
      statusCode: 0,
      setHeader(key, value) {
        this.headers[key.toLowerCase()] = value;
      },
      writeHead(statusCode, headers = {}) {
        this.statusCode = statusCode;
        Object.entries(headers).forEach(([key, value]) => this.setHeader(key, value));
      },
      end(text = "") {
        resolve({ statusCode: this.statusCode, headers: this.headers, body: Buffer.isBuffer(text) ? text.toString("utf8") : String(text) });
      },
    };

    handleRequest(request, response).catch(reject);
    if (options.body) request.emit("data", Buffer.from(options.body));
    request.emit("end");
  });
}
