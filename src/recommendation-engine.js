const VICI_COINS_API_BASE_URL = process.env.VICI_COINS_API_BASE_URL || "https://office.viciswap.io/vs2/api/coins";
const DEX_SCREENER_BASE_URL = "https://api.dexscreener.com";
const COINGECKO_API_BASE_URL = process.env.COINGECKO_API_BASE_URL || "https://api.coingecko.com/api/v3";
const API_VERSION = "0.1.4";
const REQUEST_TIMEOUT_MS = Number(process.env.BUNDLE_BUILDER_TIMEOUT_MS || 7000);
const MARKET_LOOKUP_LIMIT = Number(process.env.BUNDLE_BUILDER_MARKET_LOOKUP_LIMIT || 18);
const CATEGORY_LOOKUP_LIMIT = Number(process.env.BUNDLE_BUILDER_CATEGORY_LOOKUP_LIMIT || 10);
const MIN_LIQUIDITY_USD = Number(process.env.BUNDLE_BUILDER_MIN_LIQUIDITY_USD || 250_000);
const MIN_VOLUME_24H_USD = Number(process.env.BUNDLE_BUILDER_MIN_VOLUME_24H_USD || 100_000);

const networks = {
  base: { key: "base", name: "Base", chainId: 8453, dexChainId: "base" },
  arbitrum: { key: "arbitrum", name: "Arbitrum", chainId: 42161, dexChainId: "arbitrum" },
  polygon: { key: "polygon", name: "Polygon", chainId: 137, dexChainId: "polygon" },
  optimism: { key: "optimism", name: "Optimism", chainId: 10, dexChainId: "optimism" },
};

const confirmedViciNetworkTokens = {
  Polygon: [
    "AAVE", "AIPF", "AUSD", "AXLUSDC", "BUSD", "CES", "DAI", "DAYS", "EURS", "FRAX",
    "FRXUSD", "GGUSD", "LDO", "LINK", "MAI", "MATICX", "PAXG", "POL", "PUSD", "SOL",
    "STMATIC", "TEL", "TUSD", "UNI", "USDC", "USDC.E", "USDT", "VCNT", "WBTC", "WETH", "WPOL",
  ],
  Base: [
    "AERO", "AIXBT", "AVNT", "AXLUSDC", "BIO", "BNKR", "BOLD", "BRETT", "CBADA", "CBBTC",
    "CBDOGE", "CBETH", "CBLTC", "CBMEGA", "CBXRP", "CGN", "CHECK", "CHIP", "CLANKER", "CRVUSD",
    "CTR", "DAI", "DAYS", "DEGEN", "DINO", "DOLA", "ELSA", "ETH", "EURC", "EUSD",
    "EZETH", "FLETH", "FUN", "KAITO", "KTA", "LBTC", "LMTS", "LUNA", "MAI", "MOG",
    "MORPHO", "NOCK", "OPG", "PROS", "SOL", "SOSO", "SUPEROETHB", "SUSDE", "SUSDS", "TBTC",
    "THQ", "TIBBIR", "TIG", "TOSHI", "TRUST", "USD", "USDBC", "USDC", "USDS", "USDT.E",
    "VCNT", "VELVET", "VFY", "VIRTUAL", "VVV", "WBLT", "WBTC", "WEETH", "WETH", "WSTETH",
    "WTMSTR", "WTSPYM", "ZEN", "ZORA", "ZRO",
  ],
  Arbitrum: [
    "AARBWETH", "AAVE", "ARB", "AXLUSDC", "CBBTC", "CBETH", "CHIP", "CRV", "CRVUSD", "DAI",
    "DAYS", "ESP", "ETH", "EVA", "EZETH", "FRAX", "FRXETH", "GHO", "GMX", "GNS",
    "GRAIL", "GRT", "GS", "LAVA", "LDO", "LINK", "LPT", "MAGIC", "MIM", "MOR",
    "NOX", "PENDLE", "PYUSD", "RAIN", "RETH", "RSETH", "SOL", "SUSDAI", "SUSDE", "SUSDS",
    "SYRUPUSDC", "TBTC", "THBILL", "UNI", "USD", "USD0", "USDAI", "USDC", "USDC.E", "USDD",
    "USDE", "USDS", "USDSM", "USDT", "VCNT", "VSN", "WBTC", "WEETH", "WETH", "WSTETH",
    "XAUT0", "XUSD",
  ],
  Optimism: [
    "AXLUSDC", "BITBTC", "CRVUSD", "DAI", "DAYS", "DOLA", "ETH", "EURC", "EZETH", "FRAX",
    "FRXETH", "LINK", "LUSD", "OP", "PIKA", "SUSD", "TBTC", "USD", "USDC", "USDC.E",
    "USDT", "VCNT", "VELO", "WBTC", "WETH", "WSTETH",
  ],
};

const strategyModels = [
  {
    id: "core-shield",
    name: "Vault Core",
    themes: ["core"],
    riskIndex: 22,
    thesis: "Lower-volatility core exposure built around stable, BTC, ETH, and liquid infrastructure names.",
    allocation: [["USDC", 18, "Defense"], ["WBTC", 21, "Core beta"], ["WETH", 21, "Core beta"], ["LINK", 14, "Infrastructure"], ["AAVE", 10, "Blue-chip DeFi"], ["POL", 6, "Polygon"], ["ARB", 6, "Arbitrum"], ["ONDO", 4, "RWA"]],
  },
  {
    id: "steady-climber",
    name: "Steady Alpha",
    themes: ["core", "defi", "l2"],
    riskIndex: 35,
    thesis: "Measured upside with core assets, DeFi, RWA, and L2 exposure.",
    allocation: [["USDC", 10, "Defense"], ["WBTC", 18, "Core beta"], ["WETH", 18, "Core beta"], ["LINK", 18, "Infrastructure"], ["AAVE", 14, "Blue-chip DeFi"], ["ONDO", 8, "RWA"], ["POL", 8, "Polygon"], ["ARB", 6, "Arbitrum"]],
  },
  {
    id: "signal-stack",
    name: "Signal Stack",
    themes: ["core", "defi", "rwa", "l2", "base", "ai"],
    riskIndex: 48,
    thesis: "A balanced growth bundle across DeFi, RWA, L2 recovery, Base liquidity, and AI.",
    allocation: [["LINK", 20, "Infrastructure"], ["AAVE", 15, "Blue-chip DeFi"], ["MORPHO", 14, "Base lending"], ["ONDO", 14, "RWA"], ["ARB", 10, "Arbitrum"], ["POL", 9, "Polygon"], ["AERO", 9, "Base DEX"], ["VIRTUAL", 9, "AI agents"]],
  },
  {
    id: "asset-frontier",
    name: "Asset Frontier",
    themes: ["rwa", "core", "defi"],
    riskIndex: 52,
    thesis: "RWA narrative exposure with DeFi and core ballast.",
    allocation: [["ONDO", 28, "RWA"], ["LINK", 25, "Infrastructure"], ["AAVE", 12, "Blue-chip DeFi"], ["WETH", 10, "Core beta"], ["POL", 8, "Polygon"], ["ARB", 7, "Arbitrum"], ["UNI", 5, "DEX"], ["VCNT", 5, "Vici ecosystem"]],
  },
  {
    id: "layer-rebound",
    name: "Layer Rebound",
    themes: ["l2", "core"],
    riskIndex: 58,
    thesis: "Network-recovery exposure through Polygon, Arbitrum, ETH, DeFi, and infrastructure.",
    allocation: [["ARB", 28, "Arbitrum"], ["POL", 24, "Polygon"], ["LINK", 16, "Infrastructure"], ["WETH", 10, "Core beta"], ["AAVE", 8, "Blue-chip DeFi"], ["UNI", 6, "DEX"], ["AERO", 4, "Base DEX"], ["ONDO", 4, "RWA"]],
  },
  {
    id: "vici-vanguard",
    name: "Vici Vanguard",
    themes: ["vici", "base", "defi", "ai", "rwa"],
    riskIndex: 60,
    thesis: "Community-centered Vici exposure surrounded by broader market narratives.",
    allocation: [["VCNT", 28, "Vici ecosystem"], ["LINK", 14, "Infrastructure"], ["AAVE", 14, "Blue-chip DeFi"], ["MORPHO", 12, "Base lending"], ["AERO", 10, "Base DEX"], ["VIRTUAL", 8, "AI agents"], ["ONDO", 8, "RWA"], ["WETH", 6, "Core beta"]],
  },
  {
    id: "base-catalyst",
    name: "Base Catalyst",
    themes: ["base", "defi", "ai", "rwa"],
    riskIndex: 65,
    thesis: "Base ecosystem growth across liquidity, lending, AI, ETH beta, and Vici exposure.",
    allocation: [["AERO", 18, "Base DEX"], ["MORPHO", 18, "Base lending"], ["VIRTUAL", 16, "AI agents"], ["AAVE", 14, "Blue-chip DeFi"], ["WETH", 12, "Core beta"], ["ONDO", 10, "RWA"], ["VCNT", 6, "Vici ecosystem"], ["LINK", 6, "Infrastructure"]],
  },
  {
    id: "defi-ignition",
    name: "DeFi Ignition",
    themes: ["defi", "base"],
    riskIndex: 70,
    thesis: "Focused DeFi exposure across lending, liquidity, yield, and restaking.",
    allocation: [["AAVE", 20, "Blue-chip DeFi"], ["MORPHO", 20, "Base lending"], ["AERO", 18, "Base DEX"], ["PENDLE", 14, "Yield"], ["UNI", 10, "DEX"], ["COMP", 8, "Lending"], ["ETHFI", 6, "Restaking"], ["VIRTUAL", 4, "AI kicker"]],
  },
  {
    id: "yield-atlas",
    name: "Yield Atlas",
    themes: ["defi", "base", "core"],
    riskIndex: 72,
    thesis: "Yield, lending, and ETH-yield protocol exposure with ETH and LINK ballast.",
    allocation: [["AAVE", 18, "Blue-chip DeFi"], ["PENDLE", 18, "Yield"], ["ETHFI", 16, "Restaking"], ["MORPHO", 16, "Base lending"], ["WETH", 12, "Core beta"], ["COMP", 8, "Lending"], ["LINK", 8, "Infrastructure"], ["AERO", 4, "Base DEX"]],
  },
  {
    id: "agent-signal",
    name: "Agent Signal",
    themes: ["ai", "base", "defi"],
    riskIndex: 78,
    thesis: "AI-agent narrative exposure with Base DeFi and infrastructure support.",
    allocation: [["VIRTUAL", 28, "AI agents"], ["LINK", 20, "AI/RWA infra"], ["AERO", 14, "Base DEX"], ["MORPHO", 12, "Base lending"], ["PENDLE", 10, "DeFi yield"], ["WETH", 8, "Core beta"], ["AAVE", 8, "Blue-chip DeFi"]],
  },
  {
    id: "momentum-radar",
    name: "Momentum Radar",
    themes: ["base", "ai", "defi"],
    riskIndex: 88,
    thesis: "High-beta momentum exposure while staying inside the ViciSwapable universe.",
    allocation: [["VIRTUAL", 24, "AI agents"], ["AERO", 18, "Base DEX"], ["MORPHO", 16, "Base lending"], ["PENDLE", 14, "DeFi yield"], ["ARB", 10, "Arbitrum"], ["WETH", 10, "Core beta"], ["VCNT", 8, "Vici ecosystem"]],
  },
  {
    id: "high-beta-forge",
    name: "High-Beta Forge",
    themes: ["ai", "base", "defi"],
    riskIndex: 95,
    thesis: "Concentrated volatile momentum exposure for users who knowingly want the riskiest growth path.",
    allocation: [["AERO", 20, "Base DEX"], ["VIRTUAL", 20, "AI agents"], ["MORPHO", 16, "Base lending"], ["PENDLE", 14, "DeFi yield"], ["ARB", 10, "Arbitrum"], ["COMP", 8, "Lending"], ["WETH", 7, "Core beta"], ["VCNT", 5, "Vici ecosystem"]],
  },
];

const coinMetadata = new Map([
  ["LINK", ["Chainlink", "rwa", 70, "Infrastructure, DeFi, AI, and RWA overlap with strong route familiarity.", "Large caps can move slower than smaller narrative tokens."]],
  ["AAVE", ["Aave", "defi", 70, "Blue-chip DeFi lending exposure with clear user recognition.", "DeFi can sell off hard when risk appetite fades."]],
  ["WETH", ["Wrapped Ether", "core", 64, "ETH beta gives most bundles a liquid core.", "Lower upside than smaller narrative tokens."]],
  ["ETH", ["Ether", "core", 64, "ETH beta gives most bundles a liquid core.", "Lower upside than smaller narrative tokens."]],
  ["OP", ["Optimism", "l2", 62, "Direct Optimism network exposure.", "L2 governance tokens can lag actual network usage."]],
  ["VIRTUAL", ["Virtuals Protocol", "ai", 64, "AI-agent narrative with Base momentum.", "Narrative tokens can reverse quickly."]],
  ["AIXBT", ["AIXBT", "ai", 60, "Base-listed AI and market-intelligence exposure.", "AI tokens can move more on attention than fundamentals."]],
  ["ONDO", ["Ondo", "rwa", 61, "Clean RWA tokenization story.", "RWA adoption does not always accrue to token price."]],
  ["ARB", ["Arbitrum", "l2", 61, "Direct Arbitrum recovery exposure.", "L2 governance tokens remain volatile."]],
  ["UNI", ["Uniswap", "defi", 61, "Liquid DEX governance exposure.", "Governance tokens can lag protocol usage."]],
  ["MORPHO", ["Morpho", "defi", 60, "Base-native lending beta.", "Lower liquidity than larger DeFi assets."]],
  ["AERO", ["Aerodrome Finance", "base", 59, "Base DEX infrastructure exposure.", "DEX tokens can be incentive-cycle sensitive."]],
  ["GMX", ["GMX", "defi", 59, "Arbitrum perps exposure.", "Perp DEX tokens can be trading-volume sensitive."]],
  ["WBTC", ["Wrapped Bitcoin", "core", 58, "BTC beta inside a same-network bundle.", "Lower upside than smaller tokens."]],
  ["CBBTC", ["Coinbase Wrapped BTC", "core", 54, "Coinbase-wrapped BTC exposure where ViciSwap lists it.", "Wrapped assets need route and custody-risk review."]],
  ["CBETH", ["Coinbase Wrapped Staked ETH", "core", 54, "Staked ETH exposure where ViciSwap lists it.", "Can trade at a premium or discount to ETH."]],
  ["EZETH", ["Renzo Restaked ETH", "defi", 54, "Restaked ETH exposure where ViciSwap lists it.", "Restaked ETH has liquidity and redemption differences."]],
  ["PENDLE", ["Pendle", "defi", 58, "Yield-tokenization exposure.", "Specialized DeFi narratives can be harder to explain."]],
  ["LDO", ["Lido DAO", "defi", 57, "Mature ETH staking infrastructure exposure.", "Staking governance tokens can lag staking usage."]],
  ["ETHFI", ["Ether.fi", "defi", 57, "ETH yield and restaking exposure.", "Restaking sentiment can reverse quickly."]],
  ["KAITO", ["Kaito", "ai", 57, "InfoFi and AI attention-data exposure.", "Newer narrative tokens can be volatile."]],
  ["ZRO", ["LayerZero", "core", 56, "Interoperability infrastructure exposure.", "Interoperability tokens can trade unevenly."]],
  ["GNS", ["Gains Network", "defi", 56, "Perps and trading-volume exposure.", "Trading-volume narratives can cool quickly."]],
  ["VELO", ["Velodrome", "defi", 56, "Optimism-native DEX exposure.", "DEX tokens can fade if incentives cool."]],
  ["POL", ["POL", "l2", 55, "Polygon ecosystem alignment.", "May have less explosive momentum than high-beta Base names."]],
  ["ZORA", ["Zora", "base", 55, "Base creator-economy exposure.", "Creator-economy tokens can be sentiment-heavy."]],
  ["CRV", ["Curve DAO", "defi", 54, "Established DeFi liquidity infrastructure.", "Older DeFi tokens can lag faster narratives."]],
  ["BRETT", ["Brett", "base", 53, "Recognizable Base social beta for aggressive users.", "Meme exposure is highly speculative."]],
  ["COMP", ["Compound", "defi", 53, "Classic DeFi lending exposure.", "Older DeFi names can fade after short pops."]],
  ["DEGEN", ["Degen", "base", 52, "Base community momentum exposure.", "Community tokens are sentiment-sensitive."]],
  ["TOSHI", ["Toshi", "base", 51, "Base-native speculative exposure.", "Use only for users who explicitly want high speculation."]],
  ["USDC", ["USDC", "core", 32, "Stability sleeve for defensive bundles.", "Caps upside when risk assets rally."]],
  ["VCNT", ["ViciCoin", "vici", 28, "Vici ecosystem alignment.", "Lower market depth should be checked before swapping."]],
]);

const fallbackPrices = {
  USDC: 1, USDT: 1, "USDC.E": 1, DAI: 1, WETH: 3800, ETH: 3800, WBTC: 62500, CBBTC: 62500,
  CBETH: 4050, EZETH: 3900, LINK: 16, AAVE: 62, ARB: 0.9, OP: 1.25, POL: 0.42, UNI: 6.8,
  MORPHO: 1.9, AERO: 0.38, VIRTUAL: 0.75, AIXBT: 0.08, PENDLE: 4.1, LDO: 1.7, ETHFI: 1.5,
  KAITO: 1.2, ZRO: 2.4, ZORA: 0.011, CRV: 0.45, GMX: 28, GNS: 3.7, VELO: 0.06, VCNT: 16.8,
};

const coinGeckoIds = {
  AAVE: "aave",
  AERO: "aerodrome-finance",
  AIXBT: "aixbt-by-virtuals",
  ARB: "arbitrum",
  BRETT: "based-brett",
  CBBTC: "coinbase-wrapped-btc",
  CBETH: "coinbase-wrapped-staked-eth",
  COMP: "compound-governance-token",
  CRV: "curve-dao-token",
  DEGEN: "degen-base",
  ETH: "ethereum",
  ETHFI: "ether-fi",
  EZETH: "renzo-restaked-eth",
  GMX: "gmx",
  GNS: "gains-network",
  KAITO: "kaito",
  LDO: "lido-dao",
  LINK: "chainlink",
  MORPHO: "morpho",
  ONDO: "ondo-finance",
  OP: "optimism",
  PENDLE: "pendle",
  POL: "polygon-ecosystem-token",
  TOSHI: "toshi",
  UNI: "uniswap",
  USDC: "usd-coin",
  VCNT: "vicicoin",
  VELO: "velodrome-finance",
  VIRTUAL: "virtual-protocol",
  WBTC: "wrapped-bitcoin",
  WETH: "weth",
  ZORA: "zora",
  ZRO: "layerzero",
};

const fallbackCategoriesByTicker = {
  AAVE: ["Decentralized Finance (DeFi)", "Lending/Borrowing"],
  AERO: ["Decentralized Exchange (DEX)", "Base Ecosystem"],
  AIXBT: ["Artificial Intelligence (AI)", "Base Ecosystem"],
  ARB: ["Layer 2 (L2)", "Arbitrum Ecosystem"],
  BRETT: ["Meme", "Base Ecosystem"],
  CBBTC: ["Wrapped-Tokens", "Bitcoin Ecosystem"],
  CBETH: ["Liquid Staking Tokens", "Ethereum Ecosystem"],
  COMP: ["Decentralized Finance (DeFi)", "Lending/Borrowing"],
  CRV: ["Decentralized Exchange (DEX)", "Decentralized Finance (DeFi)"],
  DEGEN: ["Meme", "Base Ecosystem"],
  ETH: ["Smart Contract Platform", "Layer 1 (L1)"],
  ETHFI: ["Restaking", "Liquid Restaking Tokens"],
  EZETH: ["Liquid Restaking Tokens", "Restaking"],
  GMX: ["Perpetuals", "Decentralized Finance (DeFi)"],
  GNS: ["Perpetuals", "Decentralized Finance (DeFi)"],
  KAITO: ["Artificial Intelligence (AI)", "InfoFi"],
  LDO: ["Liquid Staking Governance Tokens", "Decentralized Finance (DeFi)"],
  LINK: ["Oracle", "Infrastructure"],
  MORPHO: ["Decentralized Finance (DeFi)", "Lending/Borrowing", "Base Ecosystem"],
  ONDO: ["Real World Assets (RWA)", "Ethereum Ecosystem"],
  OP: ["Layer 2 (L2)", "Optimism Ecosystem"],
  PENDLE: ["Yield Farming", "Decentralized Finance (DeFi)"],
  POL: ["Layer 2 (L2)", "Polygon Ecosystem"],
  TOSHI: ["Meme", "Base Ecosystem"],
  UNI: ["Decentralized Exchange (DEX)", "Decentralized Finance (DeFi)"],
  USDC: ["Stablecoins"],
  VCNT: ["Vici Ecosystem"],
  VELO: ["Decentralized Exchange (DEX)", "Optimism Ecosystem"],
  VIRTUAL: ["Artificial Intelligence (AI)", "Base Ecosystem"],
  WBTC: ["Wrapped-Tokens", "Bitcoin Ecosystem"],
  WETH: ["Wrapped-Tokens", "Ethereum Ecosystem"],
  ZORA: ["NFT", "Base Ecosystem"],
  ZRO: ["Interoperability", "Infrastructure"],
};

async function recommendBundle(rawParams = {}, options = {}) {
  const params = normalizeParams(rawParams);
  const network = normalizeNetwork(params.network);
  if (!isNetworkAllowedForBeta(network, params)) {
    return buildNetworkUnavailableResponse(params, network);
  }
  const support = await getSupportedTokens(network, options);
  if (support.source !== "vici-api" && !params.allowFallbackEligibility && !options.skipExternalFetch) {
    return buildEligibilityUnavailableResponse(params, network, support);
  }
  const supportedTickers = new Set(support.tokens.map((token) => token.ticker));
  const candidateRows = buildCandidateRows(support.tokens, params);

  const initialCandidates = candidateRows
    .filter((candidate) => supportedTickers.has(candidate.ticker))
    .sort((a, b) => scoreCandidate(b, params) - scoreCandidate(a, params))
    .slice(0, MARKET_LOOKUP_LIMIT);

  const marketSignals = params.includeMarketData === false
    ? new Map()
    : await getMarketSignals(initialCandidates, network, options);
  const categorySignals = params.includeCategoryIntelligence === false
    ? new Map()
    : await getCategorySignals(initialCandidates, options);

  const scoredCandidates = candidateRows
    .map((candidate) => ({
      ...candidate,
      market: marketSignals.get(candidate.ticker) || null,
      categorySignal: categorySignals.get(candidate.ticker) || null,
    }))
    .map((candidate) => ({ ...candidate, recommendationScore: scoreCandidate(candidate, params) }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore);

  const model = selectStrategyModel(params, network, supportedTickers, scoredCandidates);
  const allocation = buildAllocation(model, scoredCandidates, support.tokenMap, params);

  return {
    ok: true,
    version: API_VERSION,
    beta: true,
    generatedAt: new Date().toISOString(),
    input: {
      network: network.name,
      chainId: network.chainId,
      risk: params.risk,
      focus: params.focus,
      coinCount: params.coinCount,
      amountUsd: params.amountUsd,
      preferredCoins: params.preferredCoins,
      excludedCoins: params.excludedCoins,
      timeframe: params.timeframe,
      strictEligibility: !params.allowFallbackEligibility,
      betaAllowedNetworks: allowedNetworkKeys(),
    },
    dataSources: {
      eligibility: support.source,
      eligibilityUrl: support.url || null,
      eligibilityError: support.error || null,
      marketData: params.includeMarketData === false ? "disabled" : "DEX Screener best-effort",
      categoryIntelligence: params.includeCategoryIntelligence === false ? "disabled" : "CoinGecko category market data best-effort",
      liquidityScreen: params.includeMarketData === false
        ? "disabled with marketData=false"
        : `DEX Screener best-effort; target minimum $${MIN_LIQUIDITY_USD.toLocaleString()} liquidity and $${MIN_VOLUME_24H_USD.toLocaleString()} 24h volume`,
      note: "ViciSwap token eligibility is separated from token and category market ranking data.",
    },
    bundle: {
      id: model.id,
      name: model.name,
      network: network.name,
      chainId: network.chainId,
      thesis: model.thesis,
      fitScore: fitScore(model, allocation, params),
      coins: allocation,
    },
    coins: allocation,
    warnings: support.source === "vici-api" ? [] : [
      "ViciSwap eligibility used fallback data because allowFallbackEligibility was enabled. Do not use fallback eligibility for production execution.",
    ],
    betaScope: {
      inviteOnly: true,
      allowedNetworks: allowedNetworkKeys().map((key) => networks[key]?.name || key),
      note: "Public beta is scoped to Base unless BUNDLE_BUILDER_ALLOWED_NETWORKS is changed by engineering.",
    },
    disclaimers: [
      "Educational beta output only; not financial advice.",
      "The API does not detect rug pulls or audit contracts.",
      "ViciSwap should still verify route, liquidity, slippage, fees, and wallet approval before execution.",
    ],
  };
}

function buildNetworkUnavailableResponse(params, network) {
  return {
    ok: false,
    version: API_VERSION,
    beta: true,
    code: "NETWORK_NOT_SUPPORTED_IN_BETA",
    error: `${network.name} is not enabled for this invite-only beta. Base is the default supported network.`,
    generatedAt: new Date().toISOString(),
    input: {
      network: network.name,
      chainId: network.chainId,
      risk: params.risk,
      focus: params.focus,
      coinCount: params.coinCount,
      amountUsd: params.amountUsd,
      preferredCoins: params.preferredCoins,
      excludedCoins: params.excludedCoins,
      timeframe: params.timeframe,
      strictEligibility: true,
      betaAllowedNetworks: allowedNetworkKeys(),
    },
    dataSources: {
      eligibility: "not requested",
      marketData: "not requested",
      categoryIntelligence: "not requested",
      liquidityScreen: "not requested",
      note: "Beta scope is intentionally limited. Engineering can expand networks by setting BUNDLE_BUILDER_ALLOWED_NETWORKS.",
    },
    bundle: null,
    coins: [],
    howToProceed: "Use network=base for the initial beta, or ask engineering to explicitly enable additional networks.",
    disclaimers: [
      "Educational beta output only; not financial advice.",
      "The API does not detect rug pulls or audit contracts.",
      "ViciSwap should still verify route, liquidity, slippage, fees, and wallet approval before execution.",
    ],
  };
}

function buildEligibilityUnavailableResponse(params, network, support) {
  return {
    ok: false,
    version: API_VERSION,
    beta: true,
    code: "ELIGIBILITY_SOURCE_UNAVAILABLE",
    error: "The official ViciSwap token eligibility API was unavailable, so Bundle Builder did not create a recommendation.",
    generatedAt: new Date().toISOString(),
    input: {
      network: network.name,
      chainId: network.chainId,
      risk: params.risk,
      focus: params.focus,
      coinCount: params.coinCount,
      amountUsd: params.amountUsd,
      preferredCoins: params.preferredCoins,
      excludedCoins: params.excludedCoins,
      timeframe: params.timeframe,
      strictEligibility: true,
    },
    dataSources: {
      eligibility: "vici-api-unavailable",
      eligibilityUrl: support.url || null,
      eligibilityError: support.error || null,
      fallbackEligibilitySource: support.source,
      fallbackEligibilityUsed: false,
      marketData: "not requested",
      categoryIntelligence: "not requested",
      note: "Production recommendations fail closed unless the official ViciSwap eligibility source is available.",
    },
    bundle: null,
    coins: [],
    howToProceed: "Retry after the ViciSwap coins API is available. For local demos only, pass allowFallbackEligibility=true to permit the starter-list fallback.",
    disclaimers: [
      "Educational beta output only; not financial advice.",
      "The API does not detect rug pulls or audit contracts.",
      "ViciSwap should still verify route, liquidity, slippage, fees, and wallet approval before execution.",
    ],
  };
}

async function getSupportedTokens(network, options = {}) {
  if (options.skipExternalFetch) return fallbackSupport(network, "fallback-starter-list");
  const url = `${VICI_COINS_API_BASE_URL}?chainid=${encodeURIComponent(network.chainId)}`;
  try {
    const payload = await fetchJson(url, REQUEST_TIMEOUT_MS);
    const tokens = normalizeViciApiTokens(payload);
    if (!tokens.length) throw new Error("No usable ViciSwap tokens returned");
    return buildSupportResult(network, tokens, "vici-api", url);
  } catch (error) {
    const fallback = fallbackSupport(network, "fallback-starter-list");
    fallback.error = error.message;
    fallback.url = url;
    return fallback;
  }
}

function fallbackSupport(network, source) {
  const tokens = (confirmedViciNetworkTokens[network.name] || []).map((ticker) => ({ ticker, name: ticker, address: "" }));
  return buildSupportResult(network, tokens, source, null);
}

function buildSupportResult(network, tokens, source, url) {
  const deduped = [...new Map(tokens.map((token) => [token.ticker, token])).values()]
    .filter((token) => isLikelyTicker(token.ticker))
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
  return {
    network: network.name,
    chainId: network.chainId,
    source,
    url,
    tokenCount: deduped.length,
    tokens: deduped,
    tokenMap: new Map(deduped.map((token) => [token.ticker, token])),
  };
}

function buildCandidateRows(tokens, params) {
  return tokens
    .filter((token) => !params.excludedCoins.includes(token.ticker))
    .map((token) => {
      const meta = coinMetadata.get(token.ticker);
      return {
        ticker: token.ticker,
        name: token.name && token.name !== token.ticker ? token.name : meta?.[0] || token.ticker,
        address: token.address || "",
        theme: meta?.[1] || inferTheme(token.ticker),
        baseScore: meta?.[2] || 36,
        rationale: meta?.[3] || "Found in ViciSwap's same-network Receive-token list; include only if route quality and market depth check out.",
        riskNote: meta?.[4] || "No custom thesis yet; keep allocation small unless market depth is verified.",
      };
    });
}

function selectStrategyModel(params, network, supportedTickers, scoredCandidates) {
  const targetRisk = riskTarget(params.risk);
  const supportedThemes = new Set(scoredCandidates.slice(0, 12).map((candidate) => candidate.theme));
  return strategyModels
    .map((model) => {
      const supportedModelCoins = model.allocation.filter(([ticker]) => supportedTickers.has(ticker)).length;
      const riskFit = 100 - Math.abs(model.riskIndex - targetRisk) * 1.25;
      const focusFit = model.themes.includes(params.focus) || params.focus === "balanced" ? 22 : supportedThemes.has(params.focus) ? 10 : 0;
      return { model, score: riskFit + focusFit + supportedModelCoins * 5 };
    })
    .sort((a, b) => b.score - a.score)[0]?.model || strategyModels[2];
}

function buildAllocation(model, scoredCandidates, tokenMap, params) {
  const selected = new Map();
  const supportedCandidateMap = new Map(scoredCandidates.map((candidate) => [candidate.ticker, candidate]));

  for (const ticker of params.preferredCoins) {
    const candidate = supportedCandidateMap.get(ticker);
    if (candidate) selected.set(ticker, { candidate, role: "Preferred", seedWeight: 14 });
  }

  model.allocation.forEach(([ticker, weight, role]) => {
    const candidate = supportedCandidateMap.get(ticker);
    if (!candidate || selected.has(ticker)) return;
    selected.set(ticker, { candidate, role, seedWeight: weight });
  });

  scoredCandidates.forEach((candidate) => {
    if (selected.size >= params.coinCount) return;
    if (selected.has(candidate.ticker)) return;
    selected.set(candidate.ticker, { candidate, role: roleForCandidate(candidate), seedWeight: fallbackWeight(candidate, params) });
  });

  const rows = [...selected.values()].slice(0, params.coinCount);
  const weighted = normalizeWeights(rows.map(({ candidate, role, seedWeight }) => {
    const marketBoost = candidate.market ? clamp((candidate.market.change24h || 0) / 8, -0.35, 0.45) : 0;
    const categoryBoost = candidate.categorySignal ? clamp((candidate.categorySignal.score - 50) / 100, -0.18, 0.22) : 0;
    const riskMultiplier = riskMomentumMultiplier(params.risk);
    return {
      candidate,
      role,
      weight: Math.max(2, seedWeight * (1 + marketBoost * riskMultiplier + categoryBoost * riskMultiplier)),
    };
  }));

  return weighted.map(({ candidate, role, weight }) => {
    const token = tokenMap.get(candidate.ticker) || {};
    const priceUsd = finiteOrNull(candidate.market?.priceUsd) || fallbackPrices[candidate.ticker] || null;
    const amountUsd = roundMoney(params.amountUsd * weight / 100);
    const estimatedQuantity = priceUsd ? Number((amountUsd / priceUsd).toPrecision(8)) : null;
    return {
      ticker: candidate.ticker,
      name: candidate.name,
      network: normalizeNetwork(params.network).name,
      chainId: normalizeNetwork(params.network).chainId,
      address: token.address || candidate.address || null,
      role,
      theme: candidate.theme,
      allocationPercent: roundPercent(weight),
      amountUsd,
      estimatedQuantity,
      priceUsd,
      rationale: rationaleForCandidate(candidate),
      riskNote: candidate.riskNote,
      support: {
        source: token.address ? "vici-api-with-address" : "vici-eligible",
        receiveToken: true,
      },
      liquidityCheck: liquidityCheckForCandidate(candidate, params),
      market: candidate.market ? {
        source: "DEX Screener",
        change24h: candidate.market.change24h,
        volume24hUsd: candidate.market.volume24h,
        liquidityUsd: candidate.market.liquidityUsd,
        pairUrl: candidate.market.pairUrl,
      } : {
        source: "not available",
        note: "No fresh DEX Screener row was available during this request.",
      },
      categorySignals: candidate.categorySignal ? {
        source: candidate.categorySignal.source,
        primaryCategory: candidate.categorySignal.primaryCategory,
        matchedCategories: candidate.categorySignal.categories,
        score: candidate.categorySignal.score,
        categoryChange24h: candidate.categorySignal.categoryChange24h,
        categoryVolume24hUsd: candidate.categorySignal.categoryVolume24h,
        relativeStrength24h: candidate.categorySignal.relativeStrength24h,
        interpretation: candidate.categorySignal.interpretation,
      } : {
        source: "not available",
        note: "No fresh category signal was available during this request.",
      },
    };
  });
}

async function getMarketSignals(candidates, network, options = {}) {
  if (options.skipExternalFetch) return new Map();
  const rows = await Promise.allSettled(candidates.map((candidate) => fetchDexSignal(candidate, network)));
  const result = new Map();
  rows.forEach((row, index) => {
    if (row.status === "fulfilled" && row.value) result.set(candidates[index].ticker, row.value);
  });
  return result;
}

async function fetchDexSignal(candidate, network) {
  const url = candidate.address
    ? `${DEX_SCREENER_BASE_URL}/token-pairs/v1/${encodeURIComponent(network.dexChainId)}/${encodeURIComponent(candidate.address)}`
    : `${DEX_SCREENER_BASE_URL}/latest/dex/search?q=${encodeURIComponent(candidate.ticker)}`;
  const payload = await fetchJson(url, REQUEST_TIMEOUT_MS);
  const pairs = Array.isArray(payload) ? payload : Array.isArray(payload?.pairs) ? payload.pairs : [];
  const pair = pairs
    .filter((item) => normalizeChainId(item.chainId) === network.dexChainId)
    .filter((item) => normalizeTicker(item.baseToken?.symbol) === candidate.ticker || normalizeAddress(item.baseToken?.address) === normalizeAddress(candidate.address))
    .filter((item) => finiteOrNull(item.priceUsd))
    .sort((a, b) => (finiteOrNull(b.liquidity?.usd) || 0) - (finiteOrNull(a.liquidity?.usd) || 0))[0];
  if (!pair) return null;
  return {
    priceUsd: finiteOrNull(pair.priceUsd),
    change24h: finiteOrNull(pair.priceChange?.h24) || 0,
    volume24h: finiteOrNull(pair.volume?.h24) || 0,
    liquidityUsd: finiteOrNull(pair.liquidity?.usd) || 0,
    pairUrl: pair.url || null,
  };
}

async function getCategorySignals(candidates, options = {}) {
  if (options.skipExternalFetch) return new Map();
  const eligible = candidates
    .filter((candidate) => coinGeckoIds[candidate.ticker])
    .slice(0, CATEGORY_LOOKUP_LIMIT);
  if (!eligible.length) return new Map();

  const [categoryRows, coinRows] = await Promise.allSettled([
    fetchCoinGeckoCategories(),
    Promise.allSettled(eligible.map(fetchCoinGeckoCoinCategories)),
  ]);

  const categoryMap = categoryRows.status === "fulfilled"
    ? new Map(categoryRows.value.map((category) => [category.id, category]))
    : new Map();
  const result = new Map();

  if (coinRows.status !== "fulfilled") return fallbackCategorySignals(eligible, categoryMap);
  coinRows.value.forEach((row, index) => {
    const candidate = eligible[index];
    const categoryData = row.status === "fulfilled" && row.value
      ? row.value
      : fallbackCoinCategoryData(candidate);
    const signal = buildCategorySignal(candidate, categoryData, categoryMap);
    if (signal) result.set(candidate.ticker, signal);
  });

  eligible.forEach((candidate) => {
    if (result.has(candidate.ticker)) return;
    const signal = buildCategorySignal(candidate, fallbackCoinCategoryData(candidate), categoryMap);
    if (signal) result.set(candidate.ticker, signal);
  });

  return result;
}

async function fetchCoinGeckoCategories() {
  const url = `${COINGECKO_API_BASE_URL}/coins/categories?order=market_cap_desc`;
  const payload = await fetchJson(url, REQUEST_TIMEOUT_MS, coingeckoHeaders());
  return Array.isArray(payload) ? payload.map(normalizeCoinGeckoCategory).filter(Boolean) : [];
}

async function fetchCoinGeckoCoinCategories(candidate) {
  const id = coinGeckoIds[candidate.ticker];
  if (!id) return null;
  const params = new URLSearchParams({
    localization: "false",
    tickers: "false",
    market_data: "false",
    community_data: "false",
    developer_data: "false",
    sparkline: "false",
    include_categories_details: "true",
  });
  const url = `${COINGECKO_API_BASE_URL}/coins/${encodeURIComponent(id)}?${params.toString()}`;
  const payload = await fetchJson(url, REQUEST_TIMEOUT_MS, coingeckoHeaders());
  const details = Array.isArray(payload?.categories_details)
    ? payload.categories_details.map((category) => ({
      id: String(category.id || "").trim(),
      name: String(category.name || "").trim(),
    })).filter((category) => category.id && category.name)
    : [];
  const categories = Array.isArray(payload?.categories)
    ? payload.categories.map((name) => ({ id: slugifyCategory(name), name: String(name || "").trim() })).filter((category) => category.name)
    : [];
  return {
    id: payload?.id || id,
    ticker: candidate.ticker,
    categories: details.length ? details : categories,
    source: "CoinGecko",
  };
}

function fallbackCategorySignals(candidates, categoryMap) {
  const result = new Map();
  candidates.forEach((candidate) => {
    const signal = buildCategorySignal(candidate, fallbackCoinCategoryData(candidate), categoryMap);
    if (signal) result.set(candidate.ticker, signal);
  });
  return result;
}

function fallbackCoinCategoryData(candidate) {
  const names = fallbackCategoriesByTicker[candidate.ticker] || [];
  return {
    id: coinGeckoIds[candidate.ticker] || candidate.ticker.toLowerCase(),
    ticker: candidate.ticker,
    source: "Static category map",
    categories: names.map((name) => ({ id: slugifyCategory(name), name })),
  };
}

function normalizeCoinGeckoCategory(category) {
  if (!category?.id || !category?.name) return null;
  return {
    id: String(category.id),
    name: String(category.name),
    marketCap: finiteOrNull(category.market_cap) || 0,
    categoryChange24h: finiteOrNull(category.market_cap_change_24h) || 0,
    categoryVolume24h: finiteOrNull(category.volume_24h) || 0,
    updatedAt: category.updated_at || null,
  };
}

function buildCategorySignal(candidate, coinCategoryData, categoryMap) {
  const categories = (coinCategoryData?.categories || [])
    .map((category) => {
      const row = categoryMap.get(category.id) || categoryMap.get(slugifyCategory(category.name));
      return {
        id: category.id,
        name: category.name,
        categoryChange24h: finiteOrNull(row?.categoryChange24h),
        categoryVolume24h: finiteOrNull(row?.categoryVolume24h),
        marketCap: finiteOrNull(row?.marketCap),
        updatedAt: row?.updatedAt || null,
      };
    })
    .filter((category) => category.name);
  if (!categories.length) return null;

  const ranked = categories
    .map((category) => ({
      ...category,
      qualityScore: categoryQualityScore(category),
    }))
    .sort((a, b) => b.qualityScore - a.qualityScore);

  const primary = ranked[0];
  const tokenChange = finiteOrNull(candidate.market?.change24h) || 0;
  const categoryChange = finiteOrNull(primary.categoryChange24h) || 0;
  const relativeStrength = roundPercent(tokenChange - categoryChange);
  const hasLiveCategoryStats = primary.categoryChange24h !== null || primary.categoryVolume24h !== null;
  const score = roundPercent(clamp(
    50
      + clamp(categoryChange, -25, 35) * 0.9
      + logScore(primary.categoryVolume24h, 1_000_000_000) * 1.2
      + clamp(relativeStrength, -25, 35) * 0.45,
    0,
    100,
  ));

  return {
    source: coinCategoryData.source || "CoinGecko",
    primaryCategory: primary.name,
    categories: ranked.slice(0, 4).map(({ id, name, categoryChange24h, categoryVolume24h, updatedAt }) => ({
      id,
      name,
      categoryChange24h,
      categoryVolume24h,
      updatedAt,
    })),
    score,
    categoryChange24h: primary.categoryChange24h,
    categoryVolume24h: primary.categoryVolume24h,
    relativeStrength24h: relativeStrength,
    interpretation: hasLiveCategoryStats
      ? categoryInterpretation(candidate.ticker, primary.name, tokenChange, categoryChange, relativeStrength)
      : `${candidate.ticker} is classified under ${primary.name}; live category market data was unavailable for this request.`,
  };
}

function categoryQualityScore(category) {
  return Math.abs(finiteOrNull(category.categoryChange24h) || 0) * 0.55 + logScore(category.categoryVolume24h, 1_000_000_000) + logScore(category.marketCap, 10_000_000_000);
}

function scoreCandidate(candidate, params) {
  const focusBoost = params.focus === "balanced" || candidate.theme === params.focus ? 14 : 0;
  const preferredBoost = params.preferredCoins.includes(candidate.ticker) ? 18 : 0;
  const market = candidate.market || {};
  const category = candidate.categorySignal || {};
  const momentum = clamp(finiteOrNull(market.change24h) || 0, -25, 40);
  const volumeScore = logScore(market.volume24h, 1_000_000);
  const liquidityScore = logScore(market.liquidityUsd, 1_000_000);
  const liquidityPenalty = liquidityPenaltyForCandidate(candidate, params);
  const categoryScore = category.score ? (category.score - 50) * 0.2 : 0;
  const relativeStrengthScore = category.relativeStrength24h ? clamp(category.relativeStrength24h, -20, 25) * 0.2 : 0;
  const riskWeight = riskMomentumMultiplier(params.risk);
  return candidate.baseScore + focusBoost + preferredBoost + momentum * riskWeight + volumeScore + liquidityScore + categoryScore + relativeStrengthScore - liquidityPenalty;
}

function fitScore(model, allocation, params) {
  const riskFit = 100 - Math.abs(model.riskIndex - riskTarget(params.risk)) * 1.1;
  const focusFit = model.themes.includes(params.focus) || params.focus === "balanced" ? 100 : 70;
  const dataFit = allocation.reduce((sum, coin) => sum + (coin.market.source === "DEX Screener" ? 1 : 0), 0) / Math.max(1, allocation.length) * 100;
  return Math.round(clamp(riskFit * 0.45 + focusFit * 0.3 + dataFit * 0.15 + 10, 0, 100));
}

function normalizeParams(rawParams) {
  const params = rawParams || {};
  return {
    network: params.network || params.chain || "base",
    risk: normalizeRisk(params.risk),
    focus: normalizeFocus(params.focus || params.goal || "balanced"),
    coinCount: clampInt(params.coinCount || params.coins || 6, 3, 12),
    amountUsd: clampNumber(params.amountUsd || params.amount || params.totalUsd || 100, 0, 1_000_000_000),
    preferredCoins: normalizeTickerList(params.preferredCoins || params.preferred || params.useCoins),
    excludedCoins: normalizeTickerList(params.excludedCoins || params.exclude || params.blocklist),
    timeframe: normalizeTimeframe(params.timeframe || params.horizon || "24h"),
    includeMarketData: params.includeMarketData === false || params.marketData === false || params.marketData === "false" ? false : true,
    includeCategoryIntelligence: params.includeCategoryIntelligence === false
      || params.categoryIntelligence === false
      || params.categoryIntelligence === "false" ? false : true,
    allowFallbackEligibility: params.allowFallbackEligibility === true
      || params.allowFallbackEligibility === "true"
      || params.demoFallback === true
      || params.demoFallback === "true"
      || params.strictEligibility === false
      || params.strictEligibility === "false",
    allowNonBaseBetaNetworks: params.allowNonBaseBetaNetworks === true
      || params.allowNonBaseBetaNetworks === "true",
  };
}

function allowedNetworkKeys() {
  const configured = String(process.env.BUNDLE_BUILDER_ALLOWED_NETWORKS || "base")
    .split(",")
    .map((key) => key.trim().toLowerCase())
    .filter(Boolean);
  if (configured.includes("all")) return Object.keys(networks);
  return configured.filter((key) => networks[key]);
}

function isNetworkAllowedForBeta(network, params = {}) {
  if (params.allowNonBaseBetaNetworks) return true;
  return allowedNetworkKeys().includes(network.key);
}

function normalizeRisk(risk) {
  const value = String(risk || "").toLowerCase().replace(/[_\s-]+/g, "");
  if (["low", "lower", "conservative", "safe"].includes(value)) return "low";
  if (["high", "aggressive"].includes(value)) return "high";
  if (["veryhigh", "degen", "speculative"].includes(value)) return "very_high";
  return "moderate";
}

function normalizeFocus(focus) {
  const value = String(focus || "").toLowerCase().replace(/[_\s-]+/g, "");
  const aliases = { layer2: "l2", aiagents: "ai", rwa: "rwa", realworldassets: "rwa", stable: "core", safety: "core", yield: "defi" };
  const normalized = aliases[value] || value;
  return ["balanced", "core", "defi", "rwa", "l2", "base", "ai", "vici"].includes(normalized) ? normalized : "balanced";
}

function normalizeTimeframe(timeframe) {
  const value = String(timeframe || "").toLowerCase().replace(/[_\s-]+/g, "");
  if (["1h", "hour", "intraday"].includes(value)) return "1h";
  if (["7d", "1w", "week", "weekly", "shortterm"].includes(value)) return "7d";
  if (["30d", "1m", "month", "monthly", "swing"].includes(value)) return "30d";
  if (["90d", "3m", "quarter", "conviction"].includes(value)) return "90d";
  return "24h";
}

function normalizeNetwork(network) {
  const value = String(network || "").toLowerCase().replace(/[_\s-]+/g, "");
  if (["8453", "base"].includes(value)) return networks.base;
  if (["42161", "arbitrum", "arb"].includes(value)) return networks.arbitrum;
  if (["137", "polygon", "matic", "pol"].includes(value)) return networks.polygon;
  if (["10", "optimism", "op"].includes(value)) return networks.optimism;
  return networks.base;
}

function normalizeViciApiTokens(payload) {
  return extractRows(payload)
    .map(normalizeViciApiToken)
    .filter(Boolean)
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
}

function extractRows(payload, depth = 0) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object" || depth > 4) return [];
  for (const key of ["coins", "tokens", "data", "result", "results", "items", "rows"]) {
    const rows = extractRows(payload[key], depth + 1);
    if (rows.length) return rows;
  }
  return Object.entries(payload).flatMap(([key, value]) => {
    if (value && typeof value === "object") return [{ ...value, symbol: value.symbol || value.ticker || key }];
    if (typeof value === "string") return [{ symbol: key, name: value }];
    return [];
  });
}

function normalizeViciApiToken(row) {
  if (typeof row === "string") return isLikelyTicker(row) ? { ticker: normalizeTicker(row), name: normalizeTicker(row), address: "" } : null;
  if (!row || typeof row !== "object") return null;
  const symbol = readField(row, ["ticker", "symbol", "tickerSymbol", "tokenSymbol", "coinSymbol", "assetSymbol", "code"]);
  const ticker = normalizeTicker(symbol);
  if (!isLikelyTicker(ticker)) return null;
  const name = readField(row, ["name", "tokenName", "coinName", "assetName", "fullName"]) || ticker;
  const address = normalizeAddress(readField(row, ["address", "contract", "contractAddress", "contract_address", "tokenAddress", "token_address", "coinAddress"]));
  return { ticker, name, address };
}

function readField(row, keys) {
  const containers = [row, row.token, row.coin, row.asset, row.currency].filter(Boolean);
  for (const container of containers) {
    for (const key of keys) {
      const value = container[key];
      if (value !== undefined && value !== null && value !== "") return String(value);
    }
  }
  return "";
}

async function fetchJson(url, timeoutMs, extraHeaders = {}) {
  if (typeof fetch !== "function") throw new Error("This API requires Node 18+ fetch support");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { accept: "application/json", ...extraHeaders } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function coingeckoHeaders() {
  const key = process.env.COINGECKO_API_KEY || process.env.CG_API_KEY || "";
  if (!key) return {};
  const headerName = process.env.COINGECKO_API_KEY_HEADER || (COINGECKO_API_BASE_URL.includes("pro-api") ? "x-cg-pro-api-key" : "x-cg-demo-api-key");
  return { [headerName]: key };
}

function rationaleForCandidate(candidate) {
  const market = candidate.market;
  const category = candidate.categorySignal;
  if (market && market.volume24h >= 500_000 && market.liquidityUsd >= 250_000) {
    const categoryNote = category ? ` Category read: ${category.interpretation}` : "";
    return `${candidate.rationale} DEX Screener currently shows solid volume and liquidity for this network.${categoryNote}`;
  }
  if (market && market.volume24h > 0) {
    const categoryNote = category ? ` Category read: ${category.interpretation}` : "";
    return `${candidate.rationale} Market data is available, but route and depth still need review.${categoryNote}`;
  }
  if (category) return `${candidate.rationale} Category read: ${category.interpretation}`;
  return candidate.rationale;
}

function liquidityCheckForCandidate(candidate, params = {}) {
  if (params.includeMarketData === false) {
    return {
      status: "not_checked",
      passed: null,
      source: "disabled",
      minLiquidityUsd: MIN_LIQUIDITY_USD,
      minVolume24hUsd: MIN_VOLUME_24H_USD,
      note: "Market-data checks were disabled for this request.",
    };
  }
  if (!candidate.market) {
    return {
      status: "unverified",
      passed: null,
      source: "DEX Screener",
      minLiquidityUsd: MIN_LIQUIDITY_USD,
      minVolume24hUsd: MIN_VOLUME_24H_USD,
      note: "No DEX Screener pair was available during this request. ViciSwap must verify route depth before execution.",
    };
  }
  const liquidityUsd = finiteOrNull(candidate.market.liquidityUsd) || 0;
  const volume24hUsd = finiteOrNull(candidate.market.volume24h) || 0;
  const passed = liquidityUsd >= MIN_LIQUIDITY_USD && volume24hUsd >= MIN_VOLUME_24H_USD;
  return {
    status: passed ? "passed" : "thin",
    passed,
    source: "DEX Screener",
    liquidityUsd,
    volume24hUsd,
    minLiquidityUsd: MIN_LIQUIDITY_USD,
    minVolume24hUsd: MIN_VOLUME_24H_USD,
    note: passed
      ? "Meets the beta liquidity and volume screen; ViciSwap should still verify live route depth."
      : "Below the beta liquidity or volume target. Keep size small or exclude unless the user explicitly wants higher risk.",
  };
}

function liquidityPenaltyForCandidate(candidate, params = {}) {
  if (params.includeMarketData === false || !candidate.market) return 0;
  const liquidityUsd = finiteOrNull(candidate.market.liquidityUsd) || 0;
  const volume24hUsd = finiteOrNull(candidate.market.volume24h) || 0;
  if (liquidityUsd >= MIN_LIQUIDITY_USD && volume24hUsd >= MIN_VOLUME_24H_USD) return 0;
  const riskOffset = params.risk === "very_high" ? 8 : params.risk === "high" ? 4 : 0;
  return Math.max(8, 22 - riskOffset);
}

function categoryInterpretation(ticker, categoryName, tokenChange, categoryChange, relativeStrength) {
  const tokenDirection = tokenChange >= 0 ? "up" : "down";
  const categoryDirection = categoryChange >= 0 ? "up" : "down";
  if (relativeStrength >= 8 && categoryChange < 0) {
    return `${ticker} is outperforming a weak ${categoryName} category, which suggests token-specific relative strength.`;
  }
  if (relativeStrength >= 8) {
    return `${ticker} is stronger than the ${categoryName} category today, adding positive relative-strength signal.`;
  }
  if (relativeStrength <= -8 && categoryChange > 0) {
    return `${ticker} is lagging a strong ${categoryName} category, so the category is healthy but this token is not leading it.`;
  }
  if (categoryChange > 5 && tokenChange > 0) {
    return `${ticker} is ${tokenDirection} while the ${categoryName} category is also ${categoryDirection}, so the move has sector support.`;
  }
  if (categoryChange < -5) {
    return `${ticker} sits in a weak ${categoryName} category right now, so size should reflect category headwind.`;
  }
  return `${ticker} is moving roughly in line with the ${categoryName} category.`;
}

function fallbackWeight(candidate, params) {
  const base = params.risk === "low" ? 8 : params.risk === "very_high" ? 14 : 11;
  return candidate.theme === params.focus ? base + 4 : base;
}

function roleForCandidate(candidate) {
  const roles = { core: "Core beta", defi: "DeFi", rwa: "RWA", l2: "Network exposure", base: "Base ecosystem", ai: "AI narrative", vici: "Vici ecosystem" };
  return roles[candidate.theme] || "Network-supported";
}

function riskTarget(risk) {
  return { low: 30, moderate: 52, high: 72, very_high: 90 }[risk] || 52;
}

function riskMomentumMultiplier(risk) {
  return { low: 0.12, moderate: 0.28, high: 0.45, very_high: 0.65 }[risk] || 0.28;
}

function normalizeWeights(rows) {
  const total = rows.reduce((sum, row) => sum + row.weight, 0) || 1;
  let rounded = rows.map((row) => ({ ...row, weight: roundPercent(row.weight / total * 100) }));
  const drift = roundPercent(100 - rounded.reduce((sum, row) => sum + row.weight, 0));
  if (rounded.length) rounded[0].weight = roundPercent(rounded[0].weight + drift);
  return rounded;
}

function normalizeTickerList(value) {
  if (Array.isArray(value)) return value.map(normalizeTicker).filter(isLikelyTicker);
  return String(value || "").split(",").map(normalizeTicker).filter(isLikelyTicker);
}

function normalizeTicker(value) {
  return String(value || "").trim().toUpperCase();
}

function slugifyCategory(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isLikelyTicker(ticker) {
  return /^[A-Z][A-Z0-9.]{1,14}$/.test(normalizeTicker(ticker));
}

function inferTheme(ticker) {
  if (/USD|DAI|FRAX|EUR/.test(ticker)) return "core";
  if (/BTC|ETH|SOL/.test(ticker)) return "core";
  return "balanced";
}

function normalizeAddress(value) {
  const match = String(value || "").match(/0x[a-fA-F0-9]{40}/);
  return match ? match[0].toLowerCase() : "";
}

function normalizeChainId(value) {
  return String(value || "").toLowerCase();
}

function finiteOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function logScore(value, scale) {
  const number = finiteOrNull(value);
  if (!number || number <= 0) return 0;
  return clamp(Math.log10(number / scale + 1) * 8, 0, 14);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clampInt(value, min, max) {
  return Math.round(clamp(Number(value) || min, min, max));
}

function clampNumber(value, min, max) {
  return clamp(Number(value) || 0, min, max);
}

function roundPercent(value) {
  return Math.round(value * 100) / 100;
}

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

module.exports = {
  recommendBundle,
  getSupportedTokens,
  normalizeParams,
  normalizeNetwork,
  isNetworkAllowedForBeta,
  liquidityCheckForCandidate,
  API_VERSION,
};
