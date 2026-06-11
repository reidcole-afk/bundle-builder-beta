const assert = require("node:assert/strict");
const { recommendBundle, normalizeParams, normalizeNetwork } = require("../src/recommendation-engine");

(async () => {
  const params = normalizeParams({
    network: "base",
    risk: "moderate",
    focus: "defi",
    coinCount: 6,
    amountUsd: 100,
    preferredCoins: ["MORPHO", "AERO"],
    excludedCoins: ["TOSHI"],
    timeframe: "7d",
    marketData: false,
    categoryIntelligence: false,
  });

  assert.equal(params.network, "base");
  assert.equal(params.timeframe, "7d");
  assert.equal(params.includeCategoryIntelligence, false);
  assert.equal(params.allowFallbackEligibility, false);
  assert.equal(normalizeNetwork("8453").name, "Base");
  assert.equal(normalizeNetwork("137").name, "Polygon");

  const result = await recommendBundle(params, { skipExternalFetch: true });
  assert.equal(result.ok, true);
  assert.equal(result.bundle.network, "Base");
  assert.equal(result.bundle.coins.length, 6);
  assert.equal(result.coins.length, 6);
  assert(result.coins.every((coin) => coin.network === "Base"));
  assert(result.coins.every((coin) => typeof coin.allocationPercent === "number"));
  assert(result.coins.every((coin) => coin.categorySignals.source === "not available"));
  assert(result.coins.some((coin) => coin.ticker === "MORPHO"));
  assert(!result.coins.some((coin) => coin.ticker === "TOSHI"));

  const total = result.coins.reduce((sum, coin) => sum + coin.allocationPercent, 0);
  assert(Math.abs(total - 100) < 0.001);

  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/vs2/api/coins")) throw new Error("simulated ViciSwap API outage");
    return jsonResponse({});
  };

  try {
    const strictResult = await recommendBundle({
      network: "base",
      risk: "moderate",
      focus: "defi",
      coinCount: 6,
      amountUsd: 100,
      marketData: false,
      categoryIntelligence: false,
    });

    assert.equal(strictResult.ok, false);
    assert.equal(strictResult.code, "ELIGIBILITY_SOURCE_UNAVAILABLE");
    assert.equal(strictResult.dataSources.eligibility, "vici-api-unavailable");
    assert.equal(strictResult.dataSources.fallbackEligibilitySource, "fallback-starter-list");
    assert.equal(strictResult.dataSources.fallbackEligibilityUsed, false);
    assert.equal(strictResult.coins.length, 0);

    const fallbackResult = await recommendBundle({
      network: "base",
      risk: "moderate",
      focus: "defi",
      coinCount: 6,
      amountUsd: 100,
      marketData: false,
      categoryIntelligence: false,
      allowFallbackEligibility: true,
    });

    assert.equal(fallbackResult.ok, true);
    assert.equal(fallbackResult.dataSources.eligibility, "fallback-starter-list");
    assert(fallbackResult.warnings.length > 0);
  } finally {
    global.fetch = originalFetch;
  }

  global.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/vs2/api/coins")) {
      return jsonResponse([
        { symbol: "MORPHO", name: "Morpho Token", address: "0x0000000000000000000000000000000000000001" },
        { symbol: "AERO", name: "Aerodrome Finance", address: "0x0000000000000000000000000000000000000002" },
        { symbol: "VIRTUAL", name: "Virtuals Protocol", address: "0x0000000000000000000000000000000000000003" },
        { symbol: "DEGEN", name: "Degen", address: "0x0000000000000000000000000000000000000004" },
        { symbol: "WETH", name: "Wrapped Ether", address: "0x0000000000000000000000000000000000000005" },
        { symbol: "USDC", name: "USDC", address: "0x0000000000000000000000000000000000000006" },
      ]);
    }
    if (target.includes("/token-pairs/v1/base/")) {
      const address = target.split("/").pop().toLowerCase();
      const tickerByAddress = {
        "0x0000000000000000000000000000000000000001": "MORPHO",
        "0x0000000000000000000000000000000000000002": "AERO",
        "0x0000000000000000000000000000000000000003": "VIRTUAL",
        "0x0000000000000000000000000000000000000004": "DEGEN",
        "0x0000000000000000000000000000000000000005": "WETH",
        "0x0000000000000000000000000000000000000006": "USDC",
      };
      const ticker = tickerByAddress[address] || "MORPHO";
      return jsonResponse([{
        chainId: "base",
        url: `https://dexscreener.com/base/${address}`,
        priceUsd: ticker === "USDC" ? "1" : "2",
        priceChange: { h24: ticker === "DEGEN" ? 12 : 4 },
        volume: { h24: ticker === "VIRTUAL" ? 80_000 : 1_500_000 },
        liquidity: { usd: ticker === "VIRTUAL" ? 90_000 : 900_000 },
        baseToken: { symbol: ticker, address },
      }]);
    }
    if (target.includes("/coins/categories?")) {
      return jsonResponse([
        { id: "decentralized-finance-defi", name: "Decentralized Finance (DeFi)", market_cap_change_24h: 6.2, volume_24h: 1800000000, market_cap: 12000000000 },
        { id: "base-ecosystem", name: "Base Ecosystem", market_cap_change_24h: 4.1, volume_24h: 900000000, market_cap: 6000000000 },
        { id: "artificial-intelligence", name: "Artificial Intelligence (AI)", market_cap_change_24h: -1.5, volume_24h: 700000000, market_cap: 9000000000 },
        { id: "meme-token", name: "Meme", market_cap_change_24h: 12.5, volume_24h: 2200000000, market_cap: 8000000000 },
      ]);
    }
    if (target.includes("/coins/")) {
      const id = target.split("/coins/")[1].split("?")[0];
      const categoriesById = {
        morpho: [{ id: "decentralized-finance-defi", name: "Decentralized Finance (DeFi)" }, { id: "base-ecosystem", name: "Base Ecosystem" }],
        "aerodrome-finance": [{ id: "base-ecosystem", name: "Base Ecosystem" }, { id: "decentralized-finance-defi", name: "Decentralized Finance (DeFi)" }],
        "virtual-protocol": [{ id: "artificial-intelligence", name: "Artificial Intelligence (AI)" }, { id: "base-ecosystem", name: "Base Ecosystem" }],
        "degen-base": [{ id: "meme-token", name: "Meme" }, { id: "base-ecosystem", name: "Base Ecosystem" }],
        weth: [{ id: "ethereum-ecosystem", name: "Ethereum Ecosystem" }],
        "usd-coin": [{ id: "stablecoins", name: "Stablecoins" }],
      };
      return jsonResponse({ id, categories_details: categoriesById[id] || [] });
    }
    return jsonResponse({});
  };

  try {
    const liveLikeResult = await recommendBundle({
      network: "base",
      risk: "high",
      focus: "base",
      coinCount: 5,
      amountUsd: 100,
    });

    const morpho = liveLikeResult.coins.find((coin) => coin.ticker === "MORPHO");
    assert(morpho);
    assert.equal(morpho.categorySignals.source, "CoinGecko");
    assert.equal(morpho.categorySignals.primaryCategory, "Decentralized Finance (DeFi)");
    assert.equal(morpho.categorySignals.categoryChange24h, 6.2);
    assert.equal(morpho.liquidityCheck.status, "passed");
    assert.equal(morpho.liquidityCheck.passed, true);

    const virtual = liveLikeResult.coins.find((coin) => coin.ticker === "VIRTUAL");
    if (virtual) assert.equal(virtual.liquidityCheck.status, "thin");
  } finally {
    global.fetch = originalFetch;
  }

  global.fetch = async (url) => {
    const target = String(url);
    if (target.includes("/vs2/api/coins")) {
      return jsonResponse([
        { symbol: "MORPHO", name: "Morpho Token", address: "0x0000000000000000000000000000000000000001" },
        { symbol: "AERO", name: "Aerodrome Finance", address: "0x0000000000000000000000000000000000000002" },
        { symbol: "VIRTUAL", name: "Virtuals Protocol", address: "0x0000000000000000000000000000000000000003" },
        { symbol: "WETH", name: "Wrapped Ether", address: "0x0000000000000000000000000000000000000005" },
        { symbol: "USDC", name: "USDC", address: "0x0000000000000000000000000000000000000006" },
      ]);
    }
    if (target.includes("/coins/categories?")) {
      return jsonResponse([
        { id: "decentralized-finance-defi", name: "Decentralized Finance (DeFi)", market_cap_change_24h: 6.2, volume_24h: 1800000000, market_cap: 12000000000 },
        { id: "base-ecosystem", name: "Base Ecosystem", market_cap_change_24h: 4.1, volume_24h: 900000000, market_cap: 6000000000 },
        { id: "artificial-intelligence", name: "Artificial Intelligence (AI)", market_cap_change_24h: -1.5, volume_24h: 700000000, market_cap: 9000000000 },
      ]);
    }
    if (target.includes("/coins/")) throw new Error("simulated per-token CoinGecko category outage");
    return jsonResponse({});
  };

  try {
    const categoryFallbackResult = await recommendBundle({
      network: "base",
      risk: "moderate",
      focus: "defi",
      preferredCoins: ["MORPHO"],
      coinCount: 3,
      amountUsd: 100,
      marketData: false,
    });

    const morpho = categoryFallbackResult.coins.find((coin) => coin.ticker === "MORPHO");
    assert(morpho);
    assert.equal(morpho.categorySignals.source, "CoinGecko category market data + static token category map");
    assert.equal(morpho.categorySignals.primaryCategory, "Decentralized Finance (DeFi)");
    assert.equal(morpho.categorySignals.categoryChange24h, 6.2);
    assert.equal(morpho.categorySignals.categoryVolume24hUsd, 1800000000);
  } finally {
    global.fetch = originalFetch;
  }

  console.log("bundle-builder-api smoke test ok");
})();

function jsonResponse(payload) {
  return {
    ok: true,
    json: async () => payload,
  };
}
