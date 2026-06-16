const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
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
  assert.equal(health.body.version, "0.1.8");
  assert.equal(health.body.strictEligibilityDefault, true);
  assert.equal(health.body.liquidityEndpointFailsClosed, true);
  assert.equal(health.body.tokensEndpointFailsClosed, true);
  assert.equal(health.body.friendlyPortErrors, true);
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

  global.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/api/v3/coins/aerodrome-finance/market_chart")) {
      return { ok: true, json: async () => ({ prices: [[1, 1], [2, 1.1]] }) };
    }
    if (target.includes("/vs2/api/coins")) throw new Error("simulated ViciSwap API outage");
    return { ok: true, json: async () => ({}) };
  };

  const allowedProxy = await getJson("/api/v1/market-proxy?url=https%3A%2F%2Fapi.coingecko.com%2Fapi%2Fv3%2Fcoins%2Faerodrome-finance%2Fmarket_chart%3Fvs_currency%3Dusd%26days%3D1");
  assert.equal(allowedProxy.statusCode, 200);
  assert.deepEqual(allowedProxy.body.prices, [[1, 1], [2, 1.1]]);

  global.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/vs2/api/coins")) throw new Error("simulated ViciSwap API outage");
    return { ok: true, json: async () => ({}) };
  };

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

function getJson(path) {
  return getRaw(path).then(({ statusCode, headers, body }) => ({ statusCode, headers, body: JSON.parse(body) }));
}

function getRaw(path) {
  return new Promise((resolve, reject) => {
    const request = new EventEmitter();
    request.method = "GET";
    request.url = path;
    request.headers = { host: "localhost" };

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
  });
}
