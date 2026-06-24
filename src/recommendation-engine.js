const VICI_COINS_API_BASE_URL = process.env.VICI_COINS_API_BASE_URL || "https://office.viciswap.io/vs2/api/coins";
const VICI_COIN_DATA_API_BASE_URL = process.env.VICI_COIN_DATA_API_BASE_URL || "https://app.viciswap.io/api/coin_data";
const DEX_SCREENER_BASE_URL = "https://api.dexscreener.com";
const COINGECKO_API_BASE_URL = process.env.COINGECKO_API_BASE_URL || "https://api.coingecko.com/api/v3";
const API_VERSION = "0.1.32";
const REQUEST_TIMEOUT_MS = Number(process.env.BUNDLE_BUILDER_TIMEOUT_MS || 7000);
const MARKET_LOOKUP_LIMIT = Number(process.env.BUNDLE_BUILDER_MARKET_LOOKUP_LIMIT || 18);
const CATEGORY_LOOKUP_LIMIT = Number(process.env.BUNDLE_BUILDER_CATEGORY_LOOKUP_LIMIT || 10);
const MIN_LIQUIDITY_USD = Number(process.env.BUNDLE_BUILDER_MIN_LIQUIDITY_USD || 250_000);
const MIN_VOLUME_24H_USD = Number(process.env.BUNDLE_BUILDER_MIN_VOLUME_24H_USD || 100_000);
const VICI_MAX_DIFF_THOUSAND_USD = Number(process.env.BUNDLE_BUILDER_MAX_DIFF_THOUSAND_USD || 20);

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

const tokenThesisProfiles = {
  AERO: {
    role: "Base liquidity layer",
    why: "AERO is the Base DEX infrastructure bet: it tends to matter most when Base trading activity, incentives, and ecosystem liquidity are expanding.",
    watch: "Watch whether trading volume and route depth keep confirming the move, because DEX tokens can cool quickly if incentives or activity fade.",
  },
  MORPHO: {
    role: "Base lending engine",
    why: "MORPHO gives the bundle lending-market exposure, where the thesis is tied to borrowing demand, collateral growth, and DeFi credit activity.",
    watch: "Watch utilization, route depth, and whether DeFi lending remains in favor; lending tokens can lag if risk appetite drops.",
  },
  VIRTUAL: {
    role: "AI-agent upside",
    why: "VIRTUAL is the AI-agent narrative sleeve, useful when users want exposure to attention-driven AI infrastructure inside Base.",
    watch: "AI tokens can be reflexive and sentiment-heavy, so the setup needs volume confirmation and careful sizing.",
  },
  AIXBT: {
    role: "AI market-intelligence beta",
    why: "AIXBT adds a market-intelligence flavor to the AI sleeve rather than pure agent speculation.",
    watch: "This can move on attention as much as fundamentals, so weak volume or fading short-term trend should reduce conviction.",
  },
  BRETT: {
    role: "Base social beta",
    why: "BRETT is a recognizable Base community asset, so it can add social momentum for users who explicitly want aggressive upside.",
    watch: "This is not a core holding; meme exposure can reverse fast and should be penalized when liquidity or volume thins out.",
  },
  DEGEN: {
    role: "Base community momentum",
    why: "DEGEN captures Base-native community energy and can move quickly when risk appetite is high.",
    watch: "Community momentum can disappear quickly, so the builder should require strong volume and avoid it for low-risk users.",
  },
  ZRO: {
    role: "Interoperability infrastructure",
    why: "ZRO gives the bundle cross-chain infrastructure exposure, which is different from DEX, lending, or meme beta.",
    watch: "Interoperability tokens can trade unevenly, so the setup is stronger when category strength and short-term trend align.",
  },
  CBBTC: {
    role: "Base BTC ballast",
    why: "CBBTC gives Base bundles BTC exposure without leaving the selected network, making it useful as a core ballast asset.",
    watch: "Wrapped BTC still needs route, custody, and liquidity review even when the broader BTC thesis is simple.",
  },
  CBETH: {
    role: "Staked ETH core",
    why: "CBETH adds staked ETH exposure, giving the bundle ETH beta with a yield-oriented wrapper where ViciSwap supports it.",
    watch: "Premium/discount behavior and route quality matter because wrapped staking assets do not always trade exactly like ETH.",
  },
  WETH: {
    role: "ETH core beta",
    why: "WETH anchors bundles with liquid ETH exposure, which can keep a portfolio from becoming only narrative-driven.",
    watch: "WETH usually lowers upside versus smaller coins, but it can improve route depth and reduce concentration risk.",
  },
  WBTC: {
    role: "BTC core beta",
    why: "WBTC gives the bundle Bitcoin exposure on the selected network, useful when users want broader market ballast.",
    watch: "Wrapped BTC needs route and custody-risk review, and it will usually not move as explosively as smaller tokens.",
  },
  LINK: {
    role: "Oracle and infrastructure overlap",
    why: "LINK connects infrastructure, DeFi, RWA, and AI narratives, making it a useful cross-theme asset instead of a single-lane bet.",
    watch: "Because LINK is larger and more established, it may not provide the same upside burst as smaller Base tokens.",
  },
  AAVE: {
    role: "Blue-chip DeFi lending",
    why: "AAVE brings recognizable lending infrastructure and can stabilize a DeFi-heavy bundle with a more proven protocol name.",
    watch: "AAVE still sells off when DeFi risk appetite fades, so positive category context matters.",
  },
  PENDLE: {
    role: "Yield-tokenization beta",
    why: "PENDLE adds a more specialized DeFi yield angle, which can make a bundle less generic than simple ETH/BTC exposure.",
    watch: "The story is more complex for beginners and can weaken if yield narratives cool.",
  },
  KAITO: {
    role: "InfoFi and attention data",
    why: "KAITO adds exposure to the market-data and attention layer of crypto, which is distinct from AI-agent tokens.",
    watch: "Newer attention-driven tokens can be volatile, so it needs strong confirmation before becoming a large allocation.",
  },
  ZORA: {
    role: "Creator economy beta",
    why: "ZORA gives Base bundles creator-economy exposure, adding a different consumer/social lane.",
    watch: "Creator-economy tokens can be sentiment-heavy and may not track broader Base liquidity.",
  },
  VCNT: {
    role: "Vici ecosystem alignment",
    why: "VCNT is the home-court Vici asset, useful for users who specifically want ecosystem alignment.",
    watch: "VCNT should still be sized carefully when live market depth or volume is thinner.",
  },
};

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

const coinGeckoCategoryAliases = {
  "arbitrum-ecosystem": ["arbitrum-ecosystem"],
  "artificial-intelligence-ai": ["artificial-intelligence", "ai-agents"],
  "base-ecosystem": ["base-ecosystem"],
  "bitcoin-ecosystem": ["bitcoin-ecosystem"],
  "decentralized-exchange-dex": ["decentralized-exchange", "dex"],
  "decentralized-finance-defi": ["decentralized-finance-defi", "defi"],
  "ethereum-ecosystem": ["ethereum-ecosystem"],
  "infrastructure": ["infrastructure"],
  "interoperability": ["interoperability"],
  "layer-1-l1": ["layer-1", "smart-contract-platform"],
  "layer-2-l2": ["layer-2"],
  "lending-borrowing": ["lending-borrowing"],
  "liquid-restaking-tokens": ["liquid-restaking-tokens", "restaking"],
  "liquid-staking-governance-tokens": ["liquid-staking-governance-tokens", "liquid-staking-tokens"],
  "liquid-staking-tokens": ["liquid-staking-tokens"],
  "meme": ["meme-token", "meme"],
  "nft": ["non-fungible-tokens-nft", "nft"],
  "optimism-ecosystem": ["optimism-ecosystem"],
  "oracle": ["oracle"],
  "perpetuals": ["perpetuals"],
  "polygon-ecosystem": ["polygon-ecosystem"],
  "real-world-assets-rwa": ["real-world-assets-rwa", "real-world-assets"],
  "restaking": ["restaking", "liquid-restaking-tokens"],
  "smart-contract-platform": ["smart-contract-platform", "layer-1"],
  "stablecoins": ["stablecoins", "stablecoin"],
  "vici-ecosystem": ["vici-ecosystem"],
  "wrapped-tokens": ["wrapped-tokens"],
  "yield-farming": ["yield-farming"],
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
  const liquiditySource = await getViciLiquiditySignals(network, options);
  if (liquiditySource.source !== "vici-coin-data" && !params.allowFallbackLiquidity && !options.skipExternalFetch) {
    return buildLiquidityUnavailableResponse(params, network, liquiditySource);
  }
  const liquidityQualifiedRows = applyLiquidityGate(candidateRows, liquiditySource, params);
  if (!liquidityQualifiedRows.length) {
    return buildInsufficientLiquidityResponse(params, network, liquiditySource, candidateRows.length);
  }

  const initialCandidates = liquidityQualifiedRows
    .filter((candidate) => supportedTickers.has(candidate.ticker))
    .sort((a, b) => scoreCandidate(b, params) - scoreCandidate(a, params))
    .slice(0, MARKET_LOOKUP_LIMIT);

  const marketSignals = params.includeMarketData === false
    ? new Map()
    : await getMarketSignals(initialCandidates, network, options);
  const categorySignals = params.includeCategoryIntelligence === false
    ? new Map()
    : await getCategorySignals(initialCandidates, options);

  const scoredCandidates = liquidityQualifiedRows
    .map((candidate) => ({
      ...candidate,
      market: marketSignals.get(candidate.ticker) || null,
      categorySignal: categorySignals.get(candidate.ticker) || null,
    }))
    .map((candidate) => ({ ...candidate, marketEdge: marketEdgeSignal(candidate) }))
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
      targetHoldPeriod: timeframeLabel(params.timeframe),
      strictEligibility: !params.allowFallbackEligibility,
      betaAllowedNetworks: allowedNetworkKeys(),
    },
    dataSources: {
      eligibility: support.source,
      eligibilityUrl: support.url || null,
      eligibilityError: support.error || null,
      marketData: params.includeMarketData === false ? "disabled" : "DEX Screener best-effort",
      categoryIntelligence: params.includeCategoryIntelligence === false ? "disabled" : "CoinGecko category market data best-effort",
      liquidityScreen: liquiditySource.source === "vici-coin-data"
        ? `ViciSwap simulated $1k round-trip liquidity; max loss for ${params.risk} risk is $${maxDiffForRisk(params.risk).toLocaleString()}`
        : "fallback liquidity data for local/demo mode",
      liquiditySource: liquiditySource.source,
      liquidityUrl: liquiditySource.url || null,
      liquidityError: liquiditySource.error || null,
      liquidityThresholds: {
        conservativeMaxDiffThousandUsd: VICI_MAX_DIFF_THOUSAND_USD,
        selectedRiskMaxDiffThousandUsd: maxDiffForRisk(params.risk),
      },
      liquidityTokenCount: liquiditySource.tokenCount,
      liquidityQualifiedTokenCount: liquidityQualifiedRows.length,
      marketEdge: "deterministic signal from ViciSwap simulated liquidity, DEX Screener market data, category strength, and token relative strength",
      horizonModel: "target hold period changes the weighting between short-term momentum, multi-day continuation, volume, liquidity, and steadiness",
      note: "ViciSwap token eligibility is separated from token and category market ranking data. ViciSwap simulated-swap liquidity is the primary risk gate.",
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

function buildLiquidityUnavailableResponse(params, network, liquiditySource) {
  return {
    ok: false,
    version: API_VERSION,
    beta: true,
    code: "LIQUIDITY_SOURCE_UNAVAILABLE",
    error: "The ViciSwap simulated-swap liquidity source was unavailable, so Bundle Builder did not create a recommendation.",
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
      eligibility: "vici-api",
      liquiditySource: "vici-coin-data-unavailable",
      liquidityUrl: liquiditySource.url || null,
      liquidityError: liquiditySource.error || null,
      fallbackLiquidityUsed: false,
      marketData: "not requested",
      categoryIntelligence: "not requested",
      note: "Production recommendations fail closed unless ViciSwap liquidity depth data is available.",
    },
    bundle: null,
    coins: [],
    howToProceed: "Retry after the ViciSwap coin_data API is available. For local demos only, pass allowFallbackLiquidity=true.",
    disclaimers: [
      "Educational beta output only; not financial advice.",
      "The API does not detect rug pulls or audit contracts.",
      "ViciSwap should still verify route, liquidity, slippage, fees, and wallet approval before execution.",
    ],
  };
}

function buildInsufficientLiquidityResponse(params, network, liquiditySource, candidateCount) {
  return {
    ok: false,
    version: API_VERSION,
    beta: true,
    code: "INSUFFICIENT_LIQUIDITY_FOR_RISK",
    error: `No ${network.name} tokens passed the ${params.risk} risk simulated-swap liquidity screen.`,
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
      eligibility: "vici-api",
      liquiditySource: liquiditySource.source,
      liquidityUrl: liquiditySource.url || null,
      liquidityTokenCount: liquiditySource.tokenCount,
      candidateCount,
      maxDiffThousandUsd: maxDiffForRisk(params.risk),
      note: "Every recommendation must be present in ViciSwap coin_data and pass the selected risk threshold.",
    },
    bundle: null,
    coins: [],
    howToProceed: "Use a higher risk setting, reduce exclusions, or wait for more Base tokens to pass ViciSwap's simulated-swap liquidity screen.",
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

async function getViciLiquiditySignals(network, options = {}) {
  if (options.skipExternalFetch) return fallbackLiquiditySupport(network, "fallback-liquidity-list");
  const url = `${VICI_COIN_DATA_API_BASE_URL}?chain_id=${encodeURIComponent(network.chainId)}`;
  try {
    const payload = await fetchJson(url, REQUEST_TIMEOUT_MS);
    const rows = normalizeViciLiquidityRows(payload);
    if (!rows.length) throw new Error("No usable ViciSwap liquidity rows returned");
    return buildLiquidityResult(network, rows, "vici-coin-data", url);
  } catch (error) {
    const fallback = fallbackLiquiditySupport(network, "fallback-liquidity-list");
    fallback.error = error.message;
    fallback.url = url;
    return fallback;
  }
}

function fallbackLiquiditySupport(network, source) {
  const rows = (confirmedViciNetworkTokens[network.name] || []).map((ticker) => ({
    ticker,
    diffThousandUsd: ticker.includes("USD") || ["WETH", "ETH", "WBTC", "CBBTC"].includes(ticker) ? 2 : 18,
    raw: { ticker, diff_thousand: 18 },
  }));
  return buildLiquidityResult(network, rows, source, null);
}

function buildLiquidityResult(network, rows, source, url) {
  const deduped = [...new Map(rows.map((row) => [row.ticker, row])).values()]
    .filter((row) => isLikelyTicker(row.ticker))
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
  return {
    network: network.name,
    chainId: network.chainId,
    source,
    url,
    tokenCount: deduped.length,
    rows: deduped,
    tokenMap: new Map(deduped.map((row) => [row.ticker, row])),
  };
}

function normalizeViciLiquidityRows(payload) {
  return extractRows(payload)
    .map(normalizeViciLiquidityRow)
    .filter(Boolean)
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
}

function normalizeViciLiquidityRow(row) {
  if (!row || typeof row !== "object") return null;
  const symbol = readField(row, ["ticker", "symbol", "coin", "coin_symbol", "coinSymbol", "token", "token_symbol", "tokenSymbol", "asset", "asset_symbol"]);
  const ticker = normalizeTicker(symbol);
  if (!isLikelyTicker(ticker)) return null;
  const diffThousandUsd = finiteOrNull(readField(row, [
    "diff_thousand",
    "diffThousand",
    "diff_1000",
    "diff1000",
    "loss_thousand",
    "lossThousand",
    "roundtrip_loss",
    "roundTripLoss",
    "loss",
  ]));
  if (diffThousandUsd === null) return null;
  return {
    ticker,
    diffThousandUsd: Math.abs(diffThousandUsd),
    raw: row,
  };
}

function applyLiquidityGate(candidates, liquiditySource, params) {
  const maxDiff = maxDiffForRisk(params.risk);
  return candidates
    .map((candidate) => ({
      ...candidate,
      viciLiquidity: liquiditySource.tokenMap.get(candidate.ticker) || null,
    }))
    .filter((candidate) => {
      if (!candidate.viciLiquidity) return false;
      if (params.risk === "low" && isSpeculativeCandidate(candidate) && !params.preferredCoins.includes(candidate.ticker)) return false;
      return candidate.viciLiquidity.diffThousandUsd <= maxDiff;
    });
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
      const thesis = tokenThesisForTicker(token.ticker);
      return {
        ticker: token.ticker,
        name: token.name && token.name !== token.ticker ? token.name : meta?.[0] || token.ticker,
        address: token.address || "",
        theme: meta?.[1] || inferTheme(token.ticker),
        baseScore: meta?.[2] || 36,
        rationale: thesis?.why || meta?.[3] || "Found in ViciSwap's same-network Receive-token list; include only if route quality and market depth check out.",
        riskNote: thesis?.watch || meta?.[4] || "Keep allocation small unless market depth, route quality, and token details are verified.",
        thesisProfile: thesis,
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
  const hasPreferredCoins = params.preferredCoins.length > 0;

  for (const ticker of params.preferredCoins) {
    const candidate = supportedCandidateMap.get(ticker);
    if (candidate) selected.set(ticker, { candidate, role: "Preferred", seedWeight: 14 });
  }

  if (!hasPreferredCoins) {
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
  }

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
      thesisProfile: thesisProfileForResponse(candidate),
      bestFor: bestTimeframeForCandidate(candidate, params),
      allocationPercent: roundPercent(weight),
      amountUsd,
      estimatedQuantity,
      priceUsd,
      rationale: rationaleForCandidate(candidate),
      riskNote: candidate.riskNote,
      confidence: confidenceSignalForCandidate(candidate, params),
      conviction: convictionSignalForCandidate(candidate, params),
      support: {
        source: token.address ? "vici-api-with-address" : "vici-eligible",
        receiveToken: true,
      },
      liquidityCheck: liquidityCheckForCandidate(candidate, params),
      riskBreakdown: riskBreakdownForCandidate(candidate, params),
      market: candidate.market ? {
        source: "DEX Screener",
        change1h: candidate.market.change1h,
        change6h: candidate.market.change6h,
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
      marketEdge: candidate.marketEdge || {
        label: "No edge signal",
        score: 0,
        components: {},
        interpretation: "Not enough live market and liquidity data was available to calculate a market-edge signal.",
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
    change1h: finiteOrNull(pair.priceChange?.h1) || 0,
    change6h: finiteOrNull(pair.priceChange?.h6) || 0,
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
    ? buildCategoryLookupMap(categoryRows.value)
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

function buildCategoryLookupMap(categories) {
  const categoryMap = new Map();
  (categories || []).forEach((category) => {
    categoryLookupKeys(category).forEach((key) => categoryMap.set(key, category));
  });
  return categoryMap;
}

function categoryLookupKeys(category) {
  const keys = [
    category?.id,
    category?.name,
    slugifyCategory(category?.name),
    slugifyCategory(category?.id),
  ];
  const aliasKeys = [
    category?.id,
    category?.name,
    slugifyCategory(category?.name),
    slugifyCategory(category?.id),
  ]
    .flatMap((key) => coinGeckoCategoryAliases[String(key || "").trim()] || []);
  return [...new Set([...keys, ...aliasKeys]
    .map((key) => String(key || "").trim())
    .filter(Boolean))];
}

function resolveCategoryRow(category, categoryMap) {
  for (const key of categoryLookupKeys(category)) {
    const row = categoryMap.get(key);
    if (row) return row;
  }
  return null;
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
      const row = resolveCategoryRow(category, categoryMap);
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
  const source = hasLiveCategoryStats && coinCategoryData.source === "Static category map"
    ? "CoinGecko category market data + static token category map"
    : coinCategoryData.source || "CoinGecko";
  const score = roundPercent(clamp(
    50
      + clamp(categoryChange, -25, 35) * 0.9
      + logScore(primary.categoryVolume24h, 1_000_000_000) * 1.2
      + clamp(relativeStrength, -25, 35) * 0.45,
    0,
    100,
  ));

  return {
    source,
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
  const momentum = timeframeMomentumScore(market, params.timeframe);
  const volumeScore = logScore(market.volume24h, 1_000_000);
  const liquidityScore = viciLiquidityScore(candidate.viciLiquidity);
  const liquidityPenalty = liquidityPenaltyForCandidate(candidate, params);
  const categoryScore = category.score ? (category.score - 50) * 0.2 : 0;
  const relativeStrengthScore = category.relativeStrength24h ? clamp(category.relativeStrength24h, -20, 25) * 0.2 : 0;
  const edgeScore = candidate.marketEdge ? candidate.marketEdge.score * 0.55 : 0;
  const confidence = confidenceSignalForCandidate(candidate, params).score;
  const confidenceBoost = (confidence - 50) * 0.08;
  const speculativePenalty = speculativePenaltyForRisk(candidate, params);
  const riskWeight = riskMomentumMultiplier(params.risk);
  return candidate.baseScore + focusBoost + preferredBoost + momentum * riskWeight + volumeScore + liquidityScore + categoryScore + relativeStrengthScore + edgeScore + confidenceBoost - liquidityPenalty - speculativePenalty;
}

function marketEdgeSignal(candidate) {
  const market = candidate.market || {};
  const category = candidate.categorySignal || {};
  const liquidity = candidate.viciLiquidity || null;
  const change24h = finiteOrNull(market.change24h) || 0;
  const trendScore = trendContinuationScore(market);
  const volume24h = finiteOrNull(market.volume24h) || 0;
  const liquidityDepthScore = liquidity ? clamp(22 - liquidity.diffThousandUsd, -20, 22) : -18;
  const volumeScore = logScore(volume24h, 750_000) * 0.7;
  const momentumScore = clamp(change24h, -12, 18) * 0.45;
  const categoryScore = category.score ? (category.score - 50) * 0.16 : 0;
  const relativeStrengthScore = category.relativeStrength24h ? clamp(category.relativeStrength24h, -20, 25) * 0.18 : 0;
  const score = roundPercent(clamp(
    liquidityDepthScore * 0.5 + volumeScore + momentumScore + trendScore + categoryScore + relativeStrengthScore,
    -25,
    35,
  ));
  const label = score >= 18 ? "Strong edge" : score >= 8 ? "Positive edge" : score <= -8 ? "Weak edge" : "Neutral edge";
  const reasons = [];
  if (liquidity) reasons.push(`ViciSwap simulated $1k round-trip loss is about $${roundMoney(liquidity.diffThousandUsd)}`);
  if (volume24h >= 1_000_000) reasons.push(`DEX Screener shows solid 24h volume`);
  if (category.interpretation) reasons.push(category.interpretation);
  if (change24h > 0) reasons.push(`24h price action is positive`);
  if (trendScore > 1.5) reasons.push(`shorter-term trend is confirming the 24h move`);
  if (trendScore < -1.5) reasons.push(`shorter-term trend is fading versus the 24h move`);
  if (!reasons.length) reasons.push("Market edge is limited because live supporting data is thin.");
  return {
    label,
    score,
    components: {
      viciLiquidityDepth: roundPercent(liquidityDepthScore),
      dexVolume: roundPercent(volumeScore),
      momentum24h: roundPercent(momentumScore),
      trendContinuation: roundPercent(trendScore),
      categoryStrength: roundPercent(categoryScore),
      relativeStrength: roundPercent(relativeStrengthScore),
    },
    interpretation: `${label}: ${reasons.slice(0, 2).join("; ")}.`,
  };
}

function timeframeMomentumScore(market = {}, timeframe = "24h") {
  const change1h = finiteOrNull(market.change1h);
  const change6h = finiteOrNull(market.change6h);
  const change24h = finiteOrNull(market.change24h) || 0;
  const c1 = Number.isFinite(change1h) ? clamp(change1h, -10, 12) : 0;
  const c6 = Number.isFinite(change6h) ? clamp(change6h, -18, 22) : 0;
  const c24 = clamp(change24h, -25, 40);
  if (timeframe === "1h") return c1 * 0.5 + c6 * 0.3 + c24 * 0.2;
  if (timeframe === "7d") return c1 * 0.08 + c6 * 0.22 + c24 * 0.7;
  if (timeframe === "30d" || timeframe === "90d") return c1 * 0.05 + c6 * 0.15 + c24 * 0.8;
  return c1 * 0.12 + c6 * 0.28 + c24 * 0.6;
}

function trendContinuationScore(market = {}) {
  const change1h = finiteOrNull(market.change1h);
  const change6h = finiteOrNull(market.change6h);
  const change24h = finiteOrNull(market.change24h) || 0;
  if (!Number.isFinite(change1h) && !Number.isFinite(change6h)) return 0;
  const shortTerm = (Number.isFinite(change1h) ? change1h * 0.55 : 0) + (Number.isFinite(change6h) ? change6h * 0.45 : 0);
  if (change24h > 4 && shortTerm < -1) return clamp(shortTerm * 0.9, -6, -1.5);
  if (change24h > 0 && shortTerm > 0) return clamp(shortTerm * 0.7, 0, 5);
  if (change24h < 0 && shortTerm > 1.5) return clamp(shortTerm * 0.55, 0, 4);
  return clamp(shortTerm * 0.25, -3, 3);
}

function confidenceSignalForCandidate(candidate, params = {}) {
  const liquidity = candidate.viciLiquidity;
  const market = candidate.market || {};
  const category = candidate.categorySignal || {};
  let score = 35;
  const reasons = [];
  const watchouts = [];

  if (liquidity) {
    const depthScore = clamp(35 - liquidity.diffThousandUsd, -20, 35);
    score += depthScore;
    reasons.push(`ViciSwap simulated $1k round-trip loss is about $${roundMoney(liquidity.diffThousandUsd)}`);
    if (liquidity.diffThousandUsd > maxDiffForRisk(params.risk) * 0.75) watchouts.push("route depth is close to the selected risk limit");
  } else {
    score -= 35;
    watchouts.push("missing ViciSwap simulated liquidity depth");
  }

  if (market.volume24h >= 1_000_000) {
    score += 12;
    reasons.push("solid 24h trading volume");
  } else if (market.volume24h > 0) {
    score += 4;
    watchouts.push("volume is available but not especially deep");
  } else {
    watchouts.push("fresh DEX volume was unavailable");
  }

  if (market.liquidityUsd >= 1_000_000) score += 8;
  else if (market.liquidityUsd > 0) score += 3;

  if (category.score >= 60) {
    score += 8;
    reasons.push("category context supports the token");
  } else if (category.score && category.score < 45) {
    score -= 5;
    watchouts.push("category context is weak");
  }

  const trend = trendContinuationScore(market);
  if (trend > 2) {
    score += 6;
    reasons.push("shorter-term trend confirms the move");
  } else if (trend < -2) {
    score -= 7;
    watchouts.push("shorter-term trend is fading");
  }

  if (params.risk === "low" && isSpeculativeCandidate(candidate)) {
    score -= 18;
    watchouts.push("speculative/community token is not a natural low-risk fit");
  }

  const normalized = roundPercent(clamp(score, 0, 100));
  return {
    label: normalized >= 75 ? "High confidence" : normalized >= 55 ? "Medium confidence" : "Low confidence",
    score: normalized,
    reasons: reasons.slice(0, 4),
    watchouts: watchouts.slice(0, 4),
  };
}

function convictionSignalForCandidate(candidate, params = {}) {
  const confidence = confidenceSignalForCandidate(candidate, params);
  const market = candidate.market || {};
  const category = candidate.categorySignal || {};
  const trend = trendContinuationScore(market);
  const liquidity = candidate.viciLiquidity;
  const score = roundPercent(clamp(
    confidence.score * 0.52
      + clamp(timeframeMomentumScore(market, params.timeframe), -20, 30) * 0.55
      + (category.score ? (category.score - 50) * 0.16 : 0)
      + (liquidity ? clamp(20 - liquidity.diffThousandUsd, -10, 20) * 0.35 : -8)
      + trend * 1.1,
    0,
    100,
  ));
  return {
    label: score >= 72 ? "High conviction setup" : score >= 52 ? "Developing setup" : "Speculative setup",
    score,
    timeframe: params.timeframe,
    summary: convictionSummary(candidate, confidence, trend),
  };
}

function convictionSummary(candidate, confidence, trend) {
  if (confidence.score >= 75 && trend > 1.5) {
    return `${candidate.ticker} has stronger confirmation from liquidity, volume, and shorter-term trend.`;
  }
  if (confidence.score >= 55) {
    return `${candidate.ticker} has usable support, but users should still verify the live quote and route.`;
  }
  return `${candidate.ticker} is eligible, but the data support is thinner or more speculative.`;
}

function bestTimeframeForCandidate(candidate, params = {}) {
  const ticker = normalizeTicker(candidate.ticker);
  const market = candidate.market || {};
  const thesis = tokenThesisForTicker(ticker);
  const isStable = isStableOrCashTicker(ticker);
  const isCore = isCoreWrappedTicker(ticker);
  const isCommunity = /Community|social|meme/i.test(thesis?.role || "")
    || ["BRETT", "DEGEN", "TOSHI", "MOG", "ZORA"].includes(ticker);
  const change1h = finiteOrNull(market.change1h) || 0;
  const change6h = finiteOrNull(market.change6h) || 0;
  const change24h = finiteOrNull(market.change24h) || 0;
  const volume = finiteOrNull(market.volume24h) || 0;
  const liquidityLoss = finiteOrNull(candidate.viciLiquidity?.diffThousandUsd);

  let timeframe = "7d";
  if (isStable) timeframe = "90d";
  else if (isCommunity && change24h > 4 && volume >= 500_000) timeframe = "1h";
  else if (change24h > 8 && (change1h > 0 || change6h > 0)) timeframe = "1h";
  else if (change24h > 2 && change6h > -1 && volume >= 750_000) timeframe = "7d";
  else if (isCore || (liquidityLoss !== null && liquidityLoss <= 12 && volume >= 1_000_000)) timeframe = "30d";

  const selected = normalizeTimeframe(params.timeframe);
  const fit = selected === timeframe
    ? "good match"
    : selected === "90d" && ["30d", "90d"].includes(timeframe)
      ? "reasonable match"
      : selected === "1h" && ["1h", "7d"].includes(timeframe)
        ? "reasonable match"
        : "watch fit";

  return {
    timeframe,
    label: timeframeLabel(timeframe),
    selectedTimeframe: selected,
    selectedLabel: timeframeLabel(selected),
    fit,
    rationale: horizonRationale(candidate, timeframe),
  };
}

function horizonRationale(candidate, timeframe) {
  const market = candidate.market || {};
  const volume = finiteOrNull(market.volume24h) || 0;
  if (timeframe === "1h") return "Shorter setup: ranking depends more on fresh momentum, active volume, and quick confirmation.";
  if (timeframe === "30d") return "Multi-week setup: ranking gives more credit to liquidity depth, steadier trend quality, and less noisy pullbacks.";
  if (timeframe === "90d") return "Longer setup: ranking favors core, stable, or liquid assets over short-lived momentum.";
  if (volume >= 1_000_000) return "Swing setup: enough volume is present for a short hold, but route and slippage still need review.";
  return "Swing setup: useful only if live route quality and volume keep confirming.";
}

function isSpeculativeCandidate(candidate = {}) {
  const ticker = normalizeTicker(candidate.ticker);
  const theme = String(candidate.theme || "").toLowerCase();
  return theme.includes("meme") || ["BRETT", "DEGEN", "TOSHI", "MOG", "ZORA", "DINO", "CHECK", "CLANKER"].includes(ticker);
}

function speculativePenaltyForRisk(candidate, params = {}) {
  if (!isSpeculativeCandidate(candidate)) return 0;
  if (params.preferredCoins.includes(candidate.ticker)) return params.risk === "low" ? 8 : 0;
  return { low: 18, moderate: 5, high: 0, very_high: 0 }[params.risk] || 5;
}

function viciLiquidityScore(liquidity) {
  if (!liquidity) return -1000;
  return clamp(28 - liquidity.diffThousandUsd, -30, 28);
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
    timeframe: normalizeTimeframe(params.timeframe || params.horizon || params.targetHorizon || params.holdPeriod || "7d"),
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
    allowFallbackLiquidity: params.allowFallbackLiquidity === true
      || params.allowFallbackLiquidity === "true"
      || params.demoFallback === true
      || params.demoFallback === "true",
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
  if (["1h", "hour", "intraday", "quick", "13days", "1d", "3d", "days", "short"].includes(value)) return "1h";
  if (["7d", "1w", "week", "weekly", "shortterm", "swing"].includes(value)) return "7d";
  if (["30d", "1m", "month", "monthly", "trend", "23weeks", "2w", "3w", "multiweek"].includes(value)) return "30d";
  if (["90d", "3m", "quarter", "conviction", "position", "long", "longer"].includes(value)) return "90d";
  return "24h";
}

function timeframeLabel(timeframe = "24h") {
  return {
    "1h": "1-3 days",
    "24h": "about 1 week",
    "7d": "about 1 week",
    "30d": "2-3 weeks",
    "90d": "1+ month",
  }[normalizeTimeframe(timeframe)] || "about 1 week";
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
  const liquidity = candidate.viciLiquidity;
  const thesis = tokenThesisForTicker(candidate.ticker);
  const roleLead = thesis ? `${candidate.ticker} is acting as this bundle's ${thesis.role} sleeve. ${thesis.why}` : candidate.rationale;
  const edgeNote = candidate.marketEdge?.interpretation ? ` Edge read: ${candidate.marketEdge.interpretation}` : "";
  if (liquidity && liquidity.diffThousandUsd <= VICI_MAX_DIFF_THOUSAND_USD) {
    const categoryNote = category ? ` Category read: ${category.interpretation}` : "";
    return `${roleLead} It made the cut because ViciSwap simulated liquidity shows about $${roundMoney(liquidity.diffThousandUsd)} loss on a $1k round-trip, which passes the conservative beta screen.${categoryNote}${edgeNote}`;
  }
  if (liquidity) {
    const categoryNote = category ? ` Category read: ${category.interpretation}` : "";
    return `${roleLead} It made the cut for this risk setting, but ViciSwap simulated liquidity shows about $${roundMoney(liquidity.diffThousandUsd)} loss on a $1k round-trip, so sizing should match the user's risk setting.${categoryNote}${edgeNote}`;
  }
  if (market && market.volume24h >= 500_000 && market.liquidityUsd >= 250_000) {
    const categoryNote = category ? ` Category read: ${category.interpretation}` : "";
    return `${roleLead} DEX Screener currently shows solid volume and liquidity for this network, but ViciSwap should still verify live execution depth.${categoryNote}${edgeNote}`;
  }
  if (market && market.volume24h > 0) {
    const categoryNote = category ? ` Category read: ${category.interpretation}` : "";
    return `${roleLead} Market data is available, but route and depth still need review.${categoryNote}${edgeNote}`;
  }
  if (category) return `${roleLead} Category read: ${category.interpretation}${edgeNote}`;
  return roleLead;
}

function tokenThesisForTicker(ticker) {
  const normalized = normalizeTicker(ticker);
  return tokenThesisProfiles[normalized] || routeThesisForTicker(normalized);
}

function isStableOrCashTicker(ticker) {
  const normalized = normalizeTicker(ticker);
  return (
    /USD/.test(normalized)
    || ["DAI", "FRAX", "LUSD", "SUSD", "DOLA", "MAI", "MIM", "PYUSD", "GHO", "EURC", "EURS", "EUSD", "TUSD", "BUSD"].includes(normalized)
  );
}

function isCoreWrappedTicker(ticker) {
  const normalized = normalizeTicker(ticker);
  return ["ETH", "WETH", "WBTC", "CBBTC", "CBETH", "TBTC", "WEETH", "WSTETH", "EZETH", "RETH", "RSETH", "LBTC", "WPOL"].includes(normalized);
}

function routeThesisForTicker(ticker) {
  const normalized = normalizeTicker(ticker);
  if (!normalized) return null;
  const label = normalized.replace(/\./g, " ");

  if (isStableOrCashTicker(normalized)) {
    return {
      role: "Stable / cash sleeve",
      why: `${label} is a ViciSwap-supported cash or stable sleeve, useful for defensive allocations, quote stability, or reducing bundle volatility rather than chasing upside.`,
      watch: "Stable and cash-like assets still need peg, route, and liquidity checks before swapping.",
      coverage: "category",
    };
  }

  if (isCoreWrappedTicker(normalized) || /^(BTC|ETH|SOL|WPOL|POL|ARB|OP)$/.test(normalized)) {
    return {
      role: "Core market sleeve",
      why: `${label} gives the bundle broad market or network exposure through a ViciSwap-supported asset on the selected chain.`,
      watch: "Core and wrapped assets still need route quality, liquidity depth, peg or premium, and custody-risk review.",
      coverage: "category",
    };
  }

  if (/^(AAVE|COMP|MORPHO|CRV|VELO|AERO|PENDLE|LDO|GMX|GNS|DOLA|GHO|FRX|SUS|USDE|USDAI|SUSDAI|USDS|USDSM|ETHFI|SYRUPUSDC|MAI|MIM)$/.test(normalized)) {
    return {
      role: "DeFi / yield sleeve",
      why: `${label} gives the bundle DeFi exposure, where usage, liquidity depth, lending demand, fees, or yield activity can matter more than headline hype.`,
      watch: "DeFi tokens can lag if incentives fade, yields compress, or route depth weakens.",
      coverage: "category",
    };
  }

  if (/^(VIRTUAL|AIXBT|KAITO|BIO|BNKR|CLANKER|NOCK|VFY|VVV|CGN|KTA|TIBBIR|TRUST)$/.test(normalized)) {
    return {
      role: "AI / data narrative sleeve",
      why: `${label} adds AI, data, or attention-market exposure, which can help a bundle capture faster narrative rotation when users want more upside.`,
      watch: "AI and attention tokens can be reflexive, so the machine should require stronger volume, liquidity, and trend confirmation before sizing them up.",
      coverage: "category",
    };
  }

  if (/^(BRETT|DEGEN|TOSHI|MOG|DINO|CBDOGE|CHECK|CHIP|ELSA|FUN|LUNA|ZORA)$/.test(normalized)) {
    return {
      role: "Community / social beta",
      why: `${label} adds community momentum exposure, which can make aggressive bundles more responsive when social risk appetite is leading the market.`,
      watch: "Community tokens can reverse sharply, so they should be avoided or kept small unless liquidity, volume, and trend strength are all confirming.",
      coverage: "category",
    };
  }

  if (/^(LINK|ZRO|AXLUSDC|GRT|LPT|MAGIC|ARB|OP|POL|MATICX|STMATIC|TEL|VSN|GRAIL|LAVA|RAIN)$/.test(normalized)) {
    return {
      role: "Infrastructure / network sleeve",
      why: `${label} adds infrastructure or network exposure, helping the bundle diversify beyond simple ETH, BTC, and single-app tokens.`,
      watch: "Infrastructure tokens can trade unevenly, so category strength and execution depth should confirm the thesis.",
      coverage: "category",
    };
  }

  if (/^(PAXG|XAUT0|THBILL|WTMSTR|WTSPYM|ONDO)$/.test(normalized)) {
    return {
      role: "RWA / treasury sleeve",
      why: `${label} can add real-world-asset, treasury, or off-chain market exposure when ViciSwap support and route quality are confirmed.`,
      watch: "RWA-style assets need extra review around issuer, wrapper, redemption, liquidity, and route quality.",
      coverage: "category",
    };
  }

  return {
    role: "Route-supported token",
    why: `${label} is confirmed in the selected ViciSwap Receive list, so it can be considered only when market data, route quality, and user preferences support it.`,
    watch: "The builder does not yet have a high-conviction custom thesis for this token; verify route, slippage, liquidity, and token details before using it.",
    coverage: "route-only",
  };
}

function thesisProfileForResponse(candidate) {
  const thesis = tokenThesisForTicker(candidate.ticker);
  if (!thesis) {
    return {
      role: roleForCandidate(candidate),
      why: candidate.rationale,
      watch: candidate.riskNote,
    };
  }
  return {
    role: thesis.role,
    why: thesis.why,
    watch: thesis.watch,
    coverage: thesis.coverage || "custom",
  };
}

function liquidityCheckForCandidate(candidate, params = {}) {
  const liquidity = candidate.viciLiquidity;
  const maxDiff = maxDiffForRisk(params.risk);
  if (!liquidity) {
    return {
      status: "unverified",
      passed: false,
      source: "ViciSwap simulated $1k round-trip",
      diffThousandUsd: null,
      maxDiffThousandUsd: maxDiff,
      conservativeMaxDiffThousandUsd: VICI_MAX_DIFF_THOUSAND_USD,
      note: "Token was not found in the ViciSwap liquidity-depth list and should not be recommended.",
    };
  }
  const passed = liquidity.diffThousandUsd <= maxDiff;
  const conservative = liquidity.diffThousandUsd <= VICI_MAX_DIFF_THOUSAND_USD;
  return {
    status: passed ? conservative ? "passed" : "risk_adjusted_pass" : "thin",
    passed,
    source: "ViciSwap simulated $1k round-trip",
    diffThousandUsd: roundMoney(liquidity.diffThousandUsd),
    maxDiffThousandUsd: maxDiff,
    conservativeMaxDiffThousandUsd: VICI_MAX_DIFF_THOUSAND_USD,
    dexScreener: candidate.market ? {
      volume24hUsd: candidate.market.volume24h,
      liquidityUsd: candidate.market.liquidityUsd,
      pairUrl: candidate.market.pairUrl,
    } : null,
    note: passed
      ? "Passes the selected risk setting's simulated-swap liquidity screen; ViciSwap should still verify live route and quote."
      : "Fails the selected risk setting's simulated-swap liquidity screen and should be excluded.",
  };
}

function liquidityPenaltyForCandidate(candidate, params = {}) {
  if (!candidate.viciLiquidity) return 1000;
  const overConservative = Math.max(0, candidate.viciLiquidity.diffThousandUsd - VICI_MAX_DIFF_THOUSAND_USD);
  if (overConservative <= 0) return 0;
  const riskOffset = params.risk === "very_high" ? 14 : params.risk === "high" ? 9 : params.risk === "moderate" ? 4 : 0;
  return Math.max(0, overConservative * 0.8 - riskOffset);
}

function riskBreakdownForCandidate(candidate, params = {}) {
  const liquidity = liquidityCheckForCandidate(candidate, params);
  const category = candidate.categorySignal;
  const market = candidate.market;
  return {
    riskSetting: params.risk,
    primaryRiskDriver: "ViciSwap simulated liquidity depth",
    liquidity,
    marketDataConfidence: market ? "dex-screener-available" : "dex-screener-unavailable",
    categoryRisk: category ? {
      primaryCategory: category.primaryCategory,
      categoryChange24h: category.categoryChange24h,
      relativeStrength24h: category.relativeStrength24h,
    } : null,
    tokenRiskNote: candidate.riskNote,
  };
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

function maxDiffForRisk(risk) {
  const configured = {
    low: process.env.BUNDLE_BUILDER_LOW_MAX_DIFF_THOUSAND_USD,
    moderate: process.env.BUNDLE_BUILDER_MODERATE_MAX_DIFF_THOUSAND_USD,
    high: process.env.BUNDLE_BUILDER_HIGH_MAX_DIFF_THOUSAND_USD,
    very_high: process.env.BUNDLE_BUILDER_VERY_HIGH_MAX_DIFF_THOUSAND_USD,
  };
  const override = finiteOrNull(configured[risk]);
  if (override !== null) return override;
  return { low: 20, moderate: 35, high: 60, very_high: 100 }[risk] || 35;
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

function coinGeckoIdForTicker(value) {
  return coinGeckoIds[normalizeTicker(value)] || "";
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
  const cleaned = typeof value === "string" ? value.replace(/[$,%\s,]/g, "") : value;
  const number = Number(cleaned);
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
  coinGeckoIdForTicker,
  API_VERSION,
};
