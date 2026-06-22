const assert = require("node:assert/strict");
const { collectNewsIntelligence } = require("../src/news-intelligence");

const saved = {
  COINGECKO_NEWS_API_KEY: process.env.COINGECKO_NEWS_API_KEY,
  X_BEARER_TOKEN: process.env.X_BEARER_TOKEN,
  LUNARCRUSH_API_KEY: process.env.LUNARCRUSH_API_KEY,
  LUNARCRUSH_NEWS_URL_TEMPLATE: process.env.LUNARCRUSH_NEWS_URL_TEMPLATE,
};

process.env.COINGECKO_NEWS_API_KEY = "test-key";
process.env.X_BEARER_TOKEN = "test-token";
delete process.env.LUNARCRUSH_API_KEY;
delete process.env.LUNARCRUSH_NEWS_URL_TEMPLATE;

function jsonResponse(payload) {
  return { ok: true, status: 200, json: async () => payload };
}

async function fetchImpl(url) {
  const target = String(url);
  if (target.includes("pro-api.coingecko.com")) {
    return jsonResponse({ data: [{
      title: "Aerodrome announces an Ethereum expansion and incentive upgrade",
      url: "https://example.com/aerodrome-expansion",
      source_name: "Crypto Wire",
      posted_at: new Date().toISOString(),
      description: "Aerodrome Finance detailed a new expansion and incentive model.",
      related_coin_ids: ["aerodrome-finance"],
    }] });
  }
  if (target.includes("api.x.com")) {
    return jsonResponse({
      data: [{
        id: "123",
        author_id: "1",
        created_at: new Date().toISOString(),
        text: "Aerodrome expansion and incentive upgrade is now live.",
        public_metrics: { like_count: 500, retweet_count: 100, quote_count: 20 },
      }],
      includes: { users: [{ id: "1", username: "AerodromeFi", name: "Aerodrome", verified: true }] },
    });
  }
  if (target.includes("gdeltproject.org")) {
    return jsonResponse({ articles: [{
      title: "Aerodrome Finance expansion draws fresh Base activity",
      url: "https://another.example/aero-base-expansion",
      domain: "another.example",
      seendate: "20260621T120000Z",
    }] });
  }
  throw new Error(`Unexpected test URL: ${target}`);
}

(async () => {
  try {
    const result = await collectNewsIntelligence({
      ticker: "AERO",
      name: "Aerodrome Finance",
      network: "Base",
      coinGeckoId: "aerodrome-finance",
      profile: { driver: "Base DEX expansion" },
    }, { fetchImpl, timeoutMs: 1000 });

    assert(result.articles.length >= 2, "Expected evidence from more than one provider");
    assert(result.articles.every((article) => article.identityScore >= 0.55), "Every retained item should match the requested coin");
    assert(result.successfulSourceCount >= 3, "CoinGecko, X, and GDELT should all return evidence");
    assert(result.corroboration.some((group) => group.sourceCount >= 2), "Related evidence should be corroborated across sources");
    assert(result.score <= 3 && result.score >= -2, "News influence must remain bounded");
    assert(["high", "medium"].includes(result.confidence), "Official corroboration should produce meaningful confidence");
    console.log("news intelligence test ok");
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
