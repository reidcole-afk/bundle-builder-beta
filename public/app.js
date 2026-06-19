const bundleData = [
  {
    id: "core-shield",
    name: "Vault Core",
    risk: "Lower",
    riskIndex: 22,
    score: 60,
    themes: ["core"],
    accent: "#0d6b73",
    target: "Lower-volatility core exposure",
    tagline: "The careful foundation",
    thesis:
      "Centers the bundle around BTC, ETH, USDC, and liquid infrastructure so the user gets broad crypto exposure without chasing every high-beta theme.",
    action:
      "Best for users who want a calmer first bundle, clearer assets, and fewer surprises from narrative-driven tokens.",
    disclosure:
      "Lower volatility can mean lower upside if smaller tokens rally hard.",
    vcPlan:
      "Use this when the user wants stability first and is comfortable giving up some upside for a cleaner core allocation.",
    allocation: [
      ["USDC", 18, "Defense"],
      ["WBTC", 21, "Core beta"],
      ["WETH", 21, "Core beta"],
      ["LINK", 14, "Infrastructure"],
      ["AAVE", 10, "Blue-chip DeFi"],
      ["POL", 6, "Polygon"],
      ["ARB", 6, "Arbitrum"],
      ["ONDO", 4, "RWA"],
    ],
  },
  {
    id: "steady-climber",
    name: "Steady Alpha",
    risk: "Lower/Moderate",
    riskIndex: 35,
    score: 61,
    themes: ["core", "defi", "l2"],
    accent: "#28608f",
    target: "Measured upside with liquid names",
    tagline: "The balanced starter",
    thesis:
      "Keeps BTC and ETH meaningful while adding LINK, AAVE, RWA, and L2 exposure for users who want upside without turning the bundle into a moonshot.",
    action:
      "Best for users who want a practical blend of core assets and growth themes.",
    disclosure:
      "The defensive sleeve may drag returns during a strong altcoin rally.",
    vcPlan:
      "Use this when the user wants smoother exposure but still wants to participate in DeFi, RWA, and L2 recovery.",
    allocation: [
      ["USDC", 10, "Defense"],
      ["WBTC", 18, "Core beta"],
      ["WETH", 18, "Core beta"],
      ["LINK", 18, "Infrastructure"],
      ["AAVE", 14, "Blue-chip DeFi"],
      ["ONDO", 8, "RWA"],
      ["POL", 8, "Polygon"],
      ["ARB", 6, "Arbitrum"],
    ],
  },
  {
    id: "narrative-barbell",
    name: "Signal Stack",
    risk: "Moderate",
    riskIndex: 48,
    score: 64,
    themes: ["core", "defi", "rwa", "l2", "base", "ai"],
    accent: "#1f8a5f",
    target: "Balanced growth across multiple narratives",
    tagline: "The default builder pick",
    thesis:
      "Stacks several ViciSwap-ready themes at once: DeFi, RWA, L2 recovery, Base liquidity, and a small AI kicker.",
    action:
      "Best for users who want one well-rounded growth bundle instead of betting everything on one theme.",
    disclosure:
      "Balanced bundles can lose to concentrated moonshots when one risky theme runs hard.",
    vcPlan:
      "Use this as the general-purpose choice when the user wants upside but still wants the allocation to make intuitive sense.",
    allocation: [
      ["LINK", 20, "Infrastructure"],
      ["AAVE", 15, "Blue-chip DeFi"],
      ["MORPHO", 14, "Base lending"],
      ["ONDO", 14, "RWA"],
      ["ARB", 10, "Arbitrum"],
      ["POL", 9, "Polygon"],
      ["AERO", 9, "Base DEX"],
      ["VIRTUAL", 9, "AI agents"],
    ],
  },
  {
    id: "rwa-builder",
    name: "Asset Frontier",
    risk: "Moderate",
    riskIndex: 52,
    score: 62,
    themes: ["rwa", "core", "defi"],
    accent: "#c98219",
    target: "Real-world asset narrative exposure",
    tagline: "The RWA-focused bundle",
    thesis:
      "Leans into tokenized real-world asset infrastructure while keeping enough DeFi and core exposure to avoid being a one-token bet.",
    action:
      "Best for users who believe RWA adoption is a major crypto theme but still want a diversified bundle.",
    disclosure:
      "RWA sector growth does not always translate directly into token price performance.",
    vcPlan:
      "Use this when the user wants an institutional-assets story with LINK and ONDO as the main anchors.",
    allocation: [
      ["ONDO", 28, "RWA"],
      ["LINK", 25, "Infrastructure"],
      ["AAVE", 12, "Blue-chip DeFi"],
      ["WETH", 10, "Core beta"],
      ["POL", 8, "Polygon"],
      ["ARB", 7, "Arbitrum"],
      ["UNI", 5, "DEX"],
      ["VCNT", 5, "Vici ecosystem"],
    ],
  },
  {
    id: "l2-recovery",
    name: "Layer Rebound",
    risk: "Moderate/High",
    riskIndex: 58,
    score: 59,
    themes: ["l2", "core"],
    accent: "#56606f",
    target: "Polygon and Arbitrum recovery exposure",
    tagline: "The network rebound bundle",
    thesis:
      "Focuses on L2 network exposure with ARB and POL, then supports it with LINK, ETH, AAVE, and DEX exposure.",
    action:
      "Best for users who want a cleaner Polygon and Arbitrum thesis instead of a broad theme basket.",
    disclosure:
      "L2 governance tokens can be volatile and may not perfectly reflect network usage.",
    vcPlan:
      "Use this when the user wants network-aligned exposure across chains ViciSwap already supports.",
    allocation: [
      ["ARB", 28, "Arbitrum"],
      ["POL", 24, "Polygon"],
      ["LINK", 16, "Infrastructure"],
      ["WETH", 10, "Core beta"],
      ["AAVE", 8, "Blue-chip DeFi"],
      ["UNI", 6, "DEX"],
      ["AERO", 4, "Base DEX"],
      ["ONDO", 4, "RWA"],
    ],
  },
  {
    id: "vici-home-court",
    name: "Vici Vanguard",
    risk: "Moderate/High",
    riskIndex: 60,
    score: 56,
    themes: ["vici", "base", "defi", "ai", "rwa"],
    accent: "#7b4b9d",
    target: "Community-centered Vici exposure",
    tagline: "The Vici ecosystem bundle",
    thesis:
      "Places VCNT at the center, then surrounds it with DeFi, Base, AI, and RWA names so the bundle is not purely community-driven.",
    action:
      "Best for users who want Vici ecosystem alignment while still holding broader market narratives.",
    disclosure:
      "Community alignment is useful, but VCNT's lower market momentum may reduce short-term upside.",
    vcPlan:
      "Use this when the user wants the bundle to feel anchored to Vici rather than purely market-driven.",
    allocation: [
      ["VCNT", 28, "Vici ecosystem"],
      ["LINK", 14, "Infrastructure"],
      ["AAVE", 14, "Blue-chip DeFi"],
      ["MORPHO", 12, "Base lending"],
      ["AERO", 10, "Base DEX"],
      ["VIRTUAL", 8, "AI agents"],
      ["ONDO", 8, "RWA"],
      ["WETH", 6, "Core beta"],
    ],
  },
  {
    id: "base-balanced",
    name: "Base Catalyst",
    risk: "High",
    riskIndex: 65,
    score: 61,
    themes: ["base", "defi", "ai", "rwa"],
    accent: "#0d6b73",
    target: "Base ecosystem growth without one-token dependence",
    tagline: "The Base ecosystem bundle",
    thesis:
      "Combines Base liquidity, lending, AI, ETH beta, RWA, and VCNT exposure for users who want a Base-forward allocation.",
    action:
      "Best for users who like Base momentum but want the bundle spread across several kinds of Base-linked assets.",
    disclosure:
      "Base-focused allocations can move together if ecosystem sentiment cools.",
    vcPlan:
      "Use this when the user wants a Base thesis that still has internal diversification.",
    allocation: [
      ["AERO", 18, "Base DEX"],
      ["MORPHO", 18, "Base lending"],
      ["VIRTUAL", 16, "AI agents"],
      ["AAVE", 14, "Blue-chip DeFi"],
      ["WETH", 12, "Core beta"],
      ["ONDO", 10, "RWA"],
      ["VCNT", 6, "Vici ecosystem"],
      ["LINK", 6, "Infrastructure"],
    ],
  },
  {
    id: "base-defi-focus",
    name: "DeFi Ignition",
    risk: "High",
    riskIndex: 70,
    score: 61,
    themes: ["defi", "base"],
    accent: "#1f8a5f",
    target: "Focused DeFi and Base liquidity exposure",
    tagline: "The DeFi conviction bundle",
    thesis:
      "A concentrated DeFi thesis: AAVE and MORPHO for lending, AERO for liquidity, PENDLE and ETHFI for yield, and UNI plus COMP for DeFi beta.",
    action:
      "Best for users who believe DeFi and Base liquidity are the cleanest upside themes.",
    disclosure:
      "High DeFi concentration means sector selloffs can hit the whole bundle.",
    vcPlan:
      "Use this when the user wants a focused DeFi thesis and accepts sector concentration.",
    allocation: [
      ["AAVE", 20, "Blue-chip DeFi"],
      ["MORPHO", 20, "Base lending"],
      ["AERO", 18, "Base DEX"],
      ["PENDLE", 14, "Yield"],
      ["UNI", 10, "DEX"],
      ["COMP", 8, "Lending"],
      ["ETHFI", 6, "Restaking"],
      ["VIRTUAL", 4, "AI kicker"],
    ],
  },
  {
    id: "yield-explorer",
    name: "Yield Atlas",
    risk: "High",
    riskIndex: 72,
    score: 58,
    themes: ["defi", "base", "core"],
    accent: "#28608f",
    target: "Yield and lending protocol exposure",
    tagline: "The DeFi yield bundle",
    thesis:
      "Prioritizes DeFi protocols tied to lending, yield tokenization, and ETH yield while keeping some ETH and LINK ballast.",
    action:
      "Best for users who specifically want exposure to DeFi yield mechanics rather than general crypto beta.",
    disclosure:
      "Yield narratives can be complex and may reverse quickly if risk appetite falls.",
    vcPlan:
      "Use this when the user wants DeFi upside but prefers established protocol categories over pure momentum bets.",
    allocation: [
      ["AAVE", 18, "Blue-chip DeFi"],
      ["PENDLE", 18, "Yield"],
      ["ETHFI", 16, "Restaking"],
      ["MORPHO", 16, "Base lending"],
      ["WETH", 12, "Core beta"],
      ["COMP", 8, "Lending"],
      ["LINK", 8, "Infrastructure"],
      ["AERO", 4, "Base DEX"],
    ],
  },
  {
    id: "ai-agent-heat-check",
    name: "Agent Signal",
    risk: "High",
    riskIndex: 78,
    score: 58,
    themes: ["ai", "base", "defi"],
    accent: "#c98219",
    target: "High-energy AI narrative exposure",
    tagline: "The AI narrative bundle",
    thesis:
      "AI agents are the center: VIRTUAL leads, LINK gives infrastructure credibility, and Base DeFi names add ViciSwapable high-beta upside.",
    action:
      "Best for users who want a recognizable AI story and accept that narrative tokens can move quickly in both directions.",
    disclosure:
      "AI narratives can reverse quickly when social attention fades.",
    vcPlan:
      "Use this when the user wants a theme people immediately recognize and is comfortable with higher volatility.",
    allocation: [
      ["VIRTUAL", 28, "AI agents"],
      ["LINK", 20, "AI/RWA infra"],
      ["AERO", 14, "Base DEX"],
      ["MORPHO", 12, "Base lending"],
      ["PENDLE", 10, "DeFi yield"],
      ["WETH", 8, "Core beta"],
      ["AAVE", 8, "Blue-chip DeFi"],
    ],
  },
  {
    id: "momentum-pulse",
    name: "Momentum Radar",
    risk: "Very High",
    riskIndex: 88,
    score: 52,
    themes: ["base", "ai", "defi"],
    accent: "#c8503e",
    target: "ViciSwapable high-beta exposure",
    tagline: "The community momentum bundle",
    thesis:
      "Built for users who knowingly want high-beta momentum while staying inside the ViciSwapable Base, AI, and DeFi universe.",
    action:
      "Best for users who are comfortable with sharp moves and want the bundle to feel energetic and community-driven.",
    disclosure:
      "Momentum-heavy bundles are sentiment-driven and can drop quickly.",
    vcPlan:
      "Use this only when the user explicitly wants momentum exposure and understands the volatility.",
    allocation: [
      ["VIRTUAL", 24, "AI agents"],
      ["AERO", 18, "Base DEX"],
      ["MORPHO", 16, "Base lending"],
      ["PENDLE", 14, "DeFi yield"],
      ["ARB", 10, "Arbitrum"],
      ["WETH", 10, "Core beta"],
      ["VCNT", 8, "Vici ecosystem"],
    ],
  },
  {
    id: "momentum-hunter",
    name: "High-Beta Forge",
    risk: "Very High",
    riskIndex: 95,
    score: 54,
    themes: ["ai", "base", "defi"],
    accent: "#9b5c2f",
    target: "Very high-risk upside hunting",
    tagline: "The aggressive upside bundle",
    thesis:
      "A high-beta allocation built from volatile names for users who want concentrated momentum exposure.",
    action:
      "Best only for users who knowingly want the riskiest growth path and can tolerate a sharp reversal.",
    disclosure:
      "Highest volatility. Do not treat it as safe or guaranteed.",
    vcPlan:
      "Use this only when the user explicitly wants concentration in volatile, momentum-driven assets.",
    allocation: [
      ["AERO", 20, "Base DEX"],
      ["VIRTUAL", 20, "AI agents"],
      ["MORPHO", 16, "Base lending"],
      ["PENDLE", 14, "DeFi yield"],
      ["ARB", 10, "Arbitrum"],
      ["COMP", 8, "Lending"],
      ["WETH", 7, "Core beta"],
      ["VCNT", 5, "Vici ecosystem"],
    ],
  },
];

const coinData = [
  ["LINK", "RWA / Oracle / DeFi infra", "Base / Arbitrum / Polygon", 70, "Cross-narrative pick across Base, RWA, DeFi, and AI lists with strong liquidity.", "Large cap means less explosive than smaller Base names."],
  ["AAVE", "DeFi lending", "Base / Arbitrum / Polygon", 70, "Blue-chip DeFi with strong Base relevance and useful 7d/30d momentum.", "DeFi can sell off hard if risk appetite fades."],
  ["WETH", "Core beta", "Base / Arbitrum / Polygon / Optimism", 64, "ETH beta gives most bundles a liquid core while staying inside a same-network swap path.", "Lower upside than smaller narrative tokens."],
  ["OP", "Layer 2 / Optimism", "Optimism", 62, "Direct Optimism network exposure gives Optimism bundles a cleaner native-network thesis.", "L2 governance tokens can lag actual network usage."],
  ["VIRTUAL", "AI agents", "Base", 64, "AI-agent narrative plus Base momentum, with a story communities understand quickly.", "High narrative beta can reverse quickly."],
  ["AIXBT", "AI / market intelligence", "Base", 60, "Base-listed AI exposure gives high-risk bundles a sharper narrative without leaving the selected network.", "AI narrative tokens can move more on attention than fundamentals."],
  ["ONDO", "RWA", "Base / Arbitrum", 61, "Direct RWA narrative exposure and a clean institutional-assets story.", "RWA growth does not always accrue to project tokens."],
  ["ARB", "Layer 2", "Arbitrum", 61, "Direct Arbitrum exposure with recovery momentum and ViciSwap network alignment.", "L2 governance tokens remain volatile."],
  ["UNI", "DeFi / DEX", "Arbitrum / Polygon", 61, "Liquid DEX governance exposure with improving momentum.", "Governance tokens can lag protocol usage."],
  ["MORPHO", "DeFi lending", "Base", 60, "Base-native DeFi momentum with lending narrative overlap.", "Lower liquidity than large caps."],
  ["AERO", "Base DEX", "Base", 59, "Base DEX infrastructure with strong 7d/30d momentum.", "Smaller liquidity profile; size position carefully."],
  ["GMX", "Perp DEX", "Arbitrum", 59, "Arbitrum-native perpetuals exposure makes Arbitrum bundles more distinctive than pure core beta.", "Perp DEX tokens can be sensitive to trading-volume cycles."],
  ["WBTC", "Core beta", "Base", 58, "BTC exposure gives the bundle a liquid core if the broader market rebounds.", "Lower upside than smaller tokens."],
  ["CBBTC", "Core beta", "Base / Arbitrum", 54, "Coinbase-wrapped BTC gives Base and Arbitrum bundles another liquid BTC-backed Receive token.", "Wrapped assets still need route, liquidity, and custody-risk review."],
  ["CBETH", "ETH staking", "Base / Arbitrum", 54, "Coinbase-wrapped staked ETH adds ETH staking exposure where ViciSwap lists it.", "Staked/wrapped ETH assets can trade at a premium or discount to ETH."],
  ["EZETH", "ETH restaking", "Base / Arbitrum / Optimism", 54, "Renzo restaked ETH gives ETH-yield exposure while staying inside the scanned Receive list.", "Restaked ETH assets can have liquidity and redemption differences from plain ETH."],
  ["PENDLE", "DeFi yield", "Base", 58, "Yield-tokenization theme with strong 30d momentum.", "Specialized DeFi narrative can be harder to explain."],
  ["LDO", "ETH staking", "Polygon / Arbitrum", 57, "Liquid-staking infrastructure adds a mature ETH-yield lane to DeFi and core bundles.", "Staking governance tokens can underperform even when staking usage grows."],
  ["ETHFI", "Restaking / ETH yield", "Base", 57, "ETH yield/restaking exposure with solid 7d/30d momentum.", "Restaking sentiment can reverse quickly."],
  ["KAITO", "InfoFi / AI", "Base", 57, "InfoFi exposure gives Base bundles a fresher data-and-attention narrative.", "Newer narrative tokens can be especially volatile."],
  ["ZRO", "Interoperability", "Base", 56, "Interoperability exposure adds infrastructure variety to Base bundles.", "Bridge and interoperability tokens can trade unevenly across market cycles."],
  ["GNS", "Perp DEX", "Arbitrum", 56, "Arbitrum-listed perps exposure gives riskier bundles another DeFi trading-volume angle.", "Trading-volume narratives can cool quickly."],
  ["VELO", "Optimism DEX", "Optimism", 56, "Optimism-native DEX exposure makes Optimism bundles more ecosystem-specific.", "DEX tokens can be hit hard when liquidity incentives fade."],
  ["POL", "Layer 2 / Polygon", "Polygon", 55, "Polygon network exposure with ViciSwap network alignment.", "Less exciting momentum than high-beta Base names."],
  ["ZORA", "Creator economy", "Base", 55, "Base-listed creator-economy exposure can make growth bundles more differentiated.", "Creator-economy tokens can be sentiment-heavy."],
  ["CRV", "DeFi / DEX", "Arbitrum", 54, "Curve exposure adds established DeFi liquidity infrastructure to Arbitrum bundles.", "Older DeFi tokens can lag faster-moving narratives."],
  ["BRETT", "Base meme", "Base", 53, "A recognizable Base meme candidate for users who knowingly want higher social beta.", "Meme exposure is highly speculative and can reverse sharply."],
  ["COMP", "DeFi lending", "Base", 53, "Classic DeFi lending token showing tactical momentum.", "Older DeFi names can fade after short pops."],
  ["DEGEN", "Base community", "Base", 52, "Community-driven Base exposure can add upside energy to aggressive bundles.", "Community tokens are very sentiment-sensitive."],
  ["TOSHI", "Base meme", "Base", 51, "Base-native meme exposure can make very high-risk bundles feel more ecosystem-specific.", "Use only for users who explicitly want speculative meme beta."],
  ["USDC", "Stablecoin", "Base / Arbitrum / Polygon / Optimism", 32, "Stability sleeve for defensive bundles.", "Caps upside when risk assets rally."],
  ["VCNT", "Community / Vici ecosystem", "Base", 28, "Home-court asset for users who want Vici ecosystem alignment.", "Lower current momentum and lower volume."],
];

const tokenThesisProfiles = {
  AERO: {
    role: "Base liquidity layer",
    why: "AERO is the Base DEX infrastructure bet: it tends to matter most when Base trading activity, incentives, and ecosystem liquidity are expanding.",
    watch: "Watch whether trading volume and route depth keep confirming the move, because DEX tokens can cool quickly if incentives or activity fade.",
    marketRead: "The machine treats AERO as an ecosystem activity signal, not just a price chart, because stronger Base volume can flow directly through its DEX lane.",
  },
  MORPHO: {
    role: "Base lending engine",
    why: "MORPHO gives the bundle lending-market exposure, where the thesis is tied to borrowing demand, collateral growth, and DeFi credit activity.",
    watch: "Watch utilization, route depth, and whether DeFi lending remains in favor; lending tokens can lag if risk appetite drops.",
    marketRead: "The machine likes MORPHO more when Base DeFi is active and liquidity is strong enough to support the allocation.",
  },
  VIRTUAL: {
    role: "AI-agent upside",
    why: "VIRTUAL is the AI-agent narrative sleeve, useful when users want exposure to attention-driven AI infrastructure inside Base.",
    watch: "AI tokens can be reflexive and sentiment-heavy, so the setup needs volume confirmation and careful sizing.",
    marketRead: "The machine reads VIRTUAL as a higher-beta narrative coin that needs both momentum and liquidity support to deserve a larger role.",
  },
  AIXBT: {
    role: "AI market-intelligence beta",
    why: "AIXBT adds a market-intelligence flavor to the AI sleeve rather than pure agent speculation.",
    watch: "This can move on attention as much as fundamentals, so weak volume or fading short-term trend should reduce conviction.",
    marketRead: "The machine uses AIXBT when AI attention is active but keeps it sensitive to volume and trend quality.",
  },
  BRETT: {
    role: "Base social beta",
    why: "BRETT is a recognizable Base community asset, so it can add social momentum for users who explicitly want aggressive upside.",
    watch: "This is not a core holding; meme exposure can reverse fast and should be penalized when liquidity or volume thins out.",
    marketRead: "The machine treats BRETT as a sentiment trade first, so it needs stronger live confirmation than infrastructure coins.",
  },
  DEGEN: {
    role: "Base community momentum",
    why: "DEGEN captures Base-native community energy and can move quickly when risk appetite is high.",
    watch: "Community momentum can disappear quickly, so the builder should require strong volume and avoid it for low-risk users.",
    marketRead: "The machine only likes DEGEN when the data suggests the move has active participation behind it.",
  },
  ZRO: {
    role: "Interoperability infrastructure",
    why: "ZRO gives the bundle cross-chain infrastructure exposure, which is different from DEX, lending, or meme beta.",
    watch: "Interoperability tokens can trade unevenly, so the setup is stronger when category strength and short-term trend align.",
    marketRead: "The machine uses ZRO as an infrastructure diversifier when it has enough market confirmation.",
  },
  CBBTC: {
    role: "Base BTC ballast",
    why: "CBBTC gives Base bundles BTC exposure without leaving the selected network, making it useful as a core ballast asset.",
    watch: "Wrapped BTC still needs route, custody, and liquidity review even when the broader BTC thesis is simple.",
    marketRead: "The machine treats CBBTC as a steadier core sleeve rather than a high-upside narrative bet.",
  },
  CBETH: {
    role: "Staked ETH core",
    why: "CBETH adds staked ETH exposure, giving the bundle ETH beta with a yield-oriented wrapper where ViciSwap supports it.",
    watch: "Premium/discount behavior and route quality matter because wrapped staking assets do not always trade exactly like ETH.",
    marketRead: "The machine treats CBETH as core ETH exposure with staking nuance, not as a speculative momentum token.",
  },
  WETH: {
    role: "ETH core beta",
    why: "WETH anchors bundles with liquid ETH exposure, which can keep a portfolio from becoming only narrative-driven.",
    watch: "WETH usually lowers upside versus smaller coins, but it can improve route depth and reduce concentration risk.",
    marketRead: "The machine uses WETH when the bundle needs liquidity, core market exposure, and a cleaner execution profile.",
  },
  WBTC: {
    role: "BTC core beta",
    why: "WBTC gives the bundle Bitcoin exposure on the selected network, useful when users want broader market ballast.",
    watch: "Wrapped BTC needs route and custody-risk review, and it will usually not move as explosively as smaller tokens.",
    marketRead: "The machine treats WBTC as defensive growth exposure rather than a narrative accelerator.",
  },
  LINK: {
    role: "Oracle and infrastructure overlap",
    why: "LINK connects infrastructure, DeFi, RWA, and AI narratives, making it a useful cross-theme asset instead of a single-lane bet.",
    watch: "Because LINK is larger and more established, it may not provide the same upside burst as smaller Base tokens.",
    marketRead: "The machine likes LINK when the bundle needs a credible infrastructure anchor with multiple narrative overlaps.",
  },
  AAVE: {
    role: "Blue-chip DeFi lending",
    why: "AAVE brings recognizable lending infrastructure and can stabilize a DeFi-heavy bundle with a more proven protocol name.",
    watch: "AAVE still sells off when DeFi risk appetite fades, so positive category context matters.",
    marketRead: "The machine treats AAVE as the mature lending benchmark inside DeFi-focused bundles.",
  },
  PENDLE: {
    role: "Yield-tokenization beta",
    why: "PENDLE adds a more specialized DeFi yield angle, which can make a bundle less generic than simple ETH/BTC exposure.",
    watch: "The story is more complex for beginners and can weaken if yield narratives cool.",
    marketRead: "The machine likes PENDLE when DeFi yield appetite and market depth are both present.",
  },
  KAITO: {
    role: "InfoFi and attention data",
    why: "KAITO adds exposure to the market-data and attention layer of crypto, which is distinct from AI-agent tokens.",
    watch: "Newer attention-driven tokens can be volatile, so it needs strong confirmation before becoming a large allocation.",
    marketRead: "The machine treats KAITO as a fresher narrative sleeve that should earn its spot through trend and volume.",
  },
  ZORA: {
    role: "Creator economy beta",
    why: "ZORA gives Base bundles creator-economy exposure, adding a different consumer/social lane.",
    watch: "Creator-economy tokens can be sentiment-heavy and may not track broader Base liquidity.",
    marketRead: "The machine uses ZORA only when market activity supports the creator-economy story.",
  },
  VCNT: {
    role: "Vici ecosystem alignment",
    why: "VCNT is the home-court Vici asset, useful for users who specifically want ecosystem alignment.",
    watch: "VCNT should still be sized carefully when live market depth or volume is thinner.",
    marketRead: "The machine treats VCNT as ecosystem exposure, not as a generic momentum asset.",
  },
};

const viciNetworks = ["Base", "Arbitrum", "Polygon", "Optimism"];
const TOKEN_UNIVERSE_LOCAL_STORAGE_KEY = "viciBundleBuilderTokenUniverse";
const VICI_API_TOKEN_UNIVERSE_LOCAL_STORAGE_KEY = "viciBundleBuilderApiTokenUniverse";
const TERMS_ACK_STORAGE_KEY = "bundleBuilderBetaTermsAccepted";
const TERMS_ACK_VERSION = "beta-v1";
const BUILDER_TOKEN_UNIVERSE_MESSAGE = "VICI_TOKEN_UNIVERSE";
const MARKET_REQUEST_MESSAGE = "VICI_MARKET_REQUEST";
const MARKET_RESPONSE_MESSAGE = "VICI_MARKET_RESPONSE";
const MARKET_CHART_CACHE_MS = 1000 * 60 * 4;
const MARKET_CHART_STALE_MS = 1000 * 60 * 60;
const MARKET_BRIDGE_TIMEOUT_MS = 8000;
const MARKET_PULSE_TIMEOUT_MS = 18000;
const MARKET_STATS_TIMEOUT_MS = 9000;
const MARKET_SIMPLE_TIMEOUT_MS = 9000;
const MARKET_CHART_TIMEOUT_MS = 12000;
const MARKET_PULSE_CANDIDATE_LIMIT = 45;
const MARKET_PULSE_DECK_SIZE = 10;
const MARKET_PULSE_MIN_MARKET_ROWS = 10;
const MARKET_PULSE_LOOKUP_BATCH_SIZE = 15;
const NEWS_CATALYST_TIMEOUT_MS = 3000;
const NEWS_CATALYST_LOOKUP_LIMIT = 5;
const NEWS_CATALYST_CACHE_MS = 1000 * 60 * 10;
const BINANCE_TICKER_CACHE_MS = 1000 * 60 * 2;
const COINBASE_STATS_CACHE_MS = 1000 * 60 * 2;
const CRYPTOCOMPARE_STATS_CACHE_MS = 1000 * 60 * 2;
const DEXSCREENER_STATS_CACHE_MS = 1000 * 60 * 2;
const DEXSCREENER_TIMEOUT_MS = 14000;
const DEXSCREENER_ROW_TIMEOUT_MS = 4200;
const MARKET_CHART_CANDIDATE_LIMIT = 12;
const VICI_COINS_API_BASE_URL = "https://office.viciswap.io/vs2/api/coins";
const VICI_COINS_API_CACHE_MS = 1000 * 60 * 10;
const VICI_COINS_API_TIMEOUT_MS = 9000;
const viciNetworkChainIds = {
  Base: 8453,
  Arbitrum: 42161,
  Polygon: 137,
  Optimism: 10,
};
const dexScreenerChainIds = {
  Base: "base",
  Arbitrum: "arbitrum",
  Polygon: "polygon",
  Optimism: "optimism",
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
const seedViciNetworkSupport = supportMapFromNetworkTokenMap(confirmedViciNetworkTokens);

const marketCandidates = [
  { ticker: "USDC", id: "usd-coin", name: "USDC", theme: "core", baseScore: 32, reason: "It gives conservative bundles a stable quote asset and clean defensive sleeve." },
  { ticker: "LINK", id: "chainlink", name: "Chainlink", theme: "rwa", baseScore: 70, reason: "It combines liquidity with infrastructure, DeFi, AI, and RWA narrative overlap." },
  { ticker: "AAVE", id: "aave", name: "Aave", theme: "defi", baseScore: 70, reason: "It is a blue-chip DeFi candidate with lending exposure and strong bundle utility." },
  { ticker: "OP", id: "optimism", name: "Optimism", theme: "l2", baseScore: 62, reason: "It gives direct Optimism network exposure without mixing networks." },
  { ticker: "VIRTUAL", id: "virtual-protocol", name: "Virtuals Protocol", theme: "ai", baseScore: 64, reason: "It gives the builder an AI-agent anchor with a clear story users can understand." },
  { ticker: "AIXBT", id: "aixbt-by-virtuals", name: "AIXBT", theme: "ai", baseScore: 60, reason: "It adds Base-listed AI and market-intelligence exposure for users who want high-beta upside." },
  { ticker: "ONDO", id: "ondo-finance", name: "Ondo", theme: "rwa", baseScore: 61, reason: "It is the cleanest RWA token candidate in the current bundle set." },
  { ticker: "ARB", id: "arbitrum", name: "Arbitrum", theme: "l2", baseScore: 61, reason: "It gives direct Arbitrum network exposure on a Vici-supported chain." },
  { ticker: "UNI", id: "uniswap", name: "Uniswap", theme: "defi", baseScore: 61, reason: "It adds liquid DEX exposure and a familiar DeFi governance asset." },
  { ticker: "MORPHO", id: "morpho", name: "Morpho", theme: "defi", baseScore: 60, reason: "It adds Base-native lending beta and makes DeFi bundles more distinct." },
  { ticker: "AERO", id: "aerodrome-finance", name: "Aerodrome Finance", theme: "base", baseScore: 59, reason: "It is a Base liquidity layer candidate for users who want ecosystem upside." },
  { ticker: "GMX", id: "gmx", name: "GMX", theme: "defi", baseScore: 59, reason: "It adds Arbitrum-native perps exposure to DeFi-focused bundles." },
  { ticker: "WBTC", id: "wrapped-bitcoin", name: "Wrapped Bitcoin", theme: "core", baseScore: 58, reason: "It gives the bundle BTC beta while staying inside the candidate universe." },
  { ticker: "CBBTC", id: "coinbase-wrapped-btc", name: "Coinbase Wrapped BTC", theme: "core", baseScore: 54, reason: "It adds Coinbase-wrapped BTC exposure where ViciSwap lists it." },
  { ticker: "CBETH", id: "coinbase-wrapped-staked-eth", name: "Coinbase Wrapped Staked ETH", theme: "core", baseScore: 54, reason: "It adds staked ETH exposure where ViciSwap lists it." },
  { ticker: "EZETH", id: "renzo-restaked-eth", name: "Renzo Restaked ETH", theme: "defi", baseScore: 54, reason: "It adds restaked ETH exposure where ViciSwap lists it." },
  { ticker: "PENDLE", id: "pendle", name: "Pendle", theme: "defi", baseScore: 58, reason: "It adds yield-tokenization exposure for users who want DeFi depth." },
  { ticker: "LDO", id: "lido-dao", name: "Lido DAO", theme: "defi", baseScore: 57, reason: "It adds mature ETH staking infrastructure exposure." },
  { ticker: "KAITO", id: "kaito", name: "Kaito", theme: "ai", baseScore: 57, reason: "It adds a Base-listed InfoFi and AI attention-data lane." },
  { ticker: "ZRO", id: "layerzero", name: "LayerZero", theme: "core", baseScore: 56, reason: "It adds interoperability infrastructure exposure inside the supported token list." },
  { ticker: "GNS", id: "gains-network", name: "Gains Network", theme: "defi", baseScore: 56, reason: "It gives Arbitrum bundles another perps and trading-volume angle." },
  { ticker: "VELO", id: "velodrome-finance", name: "Velodrome", theme: "defi", baseScore: 56, reason: "It adds Optimism-native DEX exposure." },
  { ticker: "ETHFI", id: "ether-fi", name: "Ether.fi", theme: "defi", baseScore: 57, reason: "It adds ETH yield and restaking exposure to DeFi-focused allocations." },
  { ticker: "POL", id: "polygon-ecosystem-token", name: "POL", theme: "l2", baseScore: 55, reason: "It adds Polygon alignment and another supported-network recovery sleeve." },
  { ticker: "ZORA", id: "zora", name: "Zora", theme: "base", baseScore: 55, reason: "It adds Base creator-economy exposure." },
  { ticker: "CRV", id: "curve-dao-token", name: "Curve DAO", theme: "defi", baseScore: 54, reason: "It adds established DeFi liquidity infrastructure exposure." },
  { ticker: "COMP", id: "compound-governance-token", name: "Compound", theme: "defi", baseScore: 53, reason: "It adds classic DeFi lending exposure and makes yield bundles broader." },
  { ticker: "BRETT", id: "based-brett", name: "Brett", theme: "base", baseScore: 53, reason: "It adds recognizable Base social beta for aggressive users." },
  { ticker: "DEGEN", id: "degen-base", name: "Degen", theme: "base", baseScore: 52, reason: "It adds Base community momentum exposure for very high-risk users." },
  { ticker: "TOSHI", id: "toshi", name: "Toshi", theme: "base", baseScore: 51, reason: "It adds Base-native meme exposure for speculative bundles." },
  { ticker: "VCNT", id: "vicicoin", name: "ViciCoin", theme: "vici", baseScore: 28, reason: "It anchors a bundle to the Vici ecosystem and community thesis." },
  { ticker: "WETH", id: "weth", name: "Wrapped Ether", theme: "core", baseScore: 64, reason: "It provides ETH beta and useful ballast for almost every non-stable bundle." },
];

const fallbackPulse = {
  id: "chainlink",
  rank: 1,
  ticker: "LINK",
  name: "Chainlink",
  theme: "rwa",
  change24h: 0,
  prices: [],
  reason: "Cached fallback: Chainlink stays a useful favorite because it overlaps infrastructure, DeFi, AI, and RWA narratives.",
  source: "Cached",
  chartSource: "No live chart",
  updatedAt: null,
};

const fallbackPulseDeck = [
  fallbackPulse,
  {
    id: "aave",
    rank: 2,
    ticker: "AAVE",
    name: "Aave",
    theme: "defi",
    change24h: 0,
    prices: [],
    reason: "Cached fallback: Aave remains a high-quality DeFi lending candidate with broad bundle utility.",
    source: "Cached",
    chartSource: "No live chart",
    updatedAt: null,
  },
  {
    id: "weth",
    rank: 3,
    ticker: "WETH",
    name: "Wrapped Ether",
    theme: "core",
    change24h: 0,
    prices: [],
    reason: "Cached fallback: WETH keeps the top deck grounded with liquid ETH beta.",
    source: "Cached",
    chartSource: "No live chart",
    updatedAt: null,
  },
];

const fallbackPrices = {
  USDC: 1,
  WBTC: 106000,
  BTC: 106000,
  CBBTC: 106000,
  WETH: 3800,
  ETH: 3800,
  CBETH: 3900,
  EZETH: 3800,
  LINK: 15,
  AAVE: 190,
  OP: 1.25,
  MORPHO: 1.4,
  AIXBT: 0.08,
  ONDO: 0.75,
  UNI: 8,
  AERO: 0.8,
  GMX: 15,
  VIRTUAL: 1.35,
  ARB: 0.32,
  LDO: 0.9,
  KAITO: 1.2,
  ZRO: 2.5,
  GNS: 2,
  VELO: 0.06,
  POL: 0.22,
  MATIC: 0.22,
  ZORA: 0.04,
  CRV: 0.6,
  PENDLE: 4.2,
  BRETT: 0.04,
  COMP: 45,
  DEGEN: 0.004,
  TOSHI: 0.0008,
  ETHFI: 1.3,
  VCNT: 21,
};

const binanceMarketSymbols = {
  USDC: "USDCUSDT",
  LINK: "LINKUSDT",
  AAVE: "AAVEUSDT",
  OP: "OPUSDT",
  VIRTUAL: "VIRTUALUSDT",
  AIXBT: "AIXBTUSDT",
  ARB: "ARBUSDT",
  UNI: "UNIUSDT",
  MORPHO: "MORPHOUSDT",
  AERO: "AEROUSDT",
  GMX: "GMXUSDT",
  WBTC: "BTCUSDT",
  CBBTC: "BTCUSDT",
  CBETH: "ETHUSDT",
  EZETH: "ETHUSDT",
  PENDLE: "PENDLEUSDT",
  LDO: "LDOUSDT",
  KAITO: "KAITOUSDT",
  ZRO: "ZROUSDT",
  GNS: "GNSUSDT",
  VELO: "VELOUSDT",
  ETHFI: "ETHFIUSDT",
  POL: "POLUSDT",
  ZORA: "ZORAUSDT",
  CRV: "CRVUSDT",
  COMP: "COMPUSDT",
  BRETT: "BRETTUSDT",
  DEGEN: "DEGENUSDT",
  TOSHI: "TOSHIUSDT",
  WETH: "ETHUSDT",
};

const coinbaseMarketProducts = {
  USDC: "USDC-USD",
  LINK: "LINK-USD",
  AAVE: "AAVE-USD",
  OP: "OP-USD",
  VIRTUAL: "VIRTUAL-USD",
  AIXBT: "AIXBT-USD",
  ARB: "ARB-USD",
  UNI: "UNI-USD",
  MORPHO: "MORPHO-USD",
  AERO: "AERO-USD",
  GMX: "GMX-USD",
  WBTC: "BTC-USD",
  CBBTC: "BTC-USD",
  CBETH: "ETH-USD",
  EZETH: "ETH-USD",
  PENDLE: "PENDLE-USD",
  LDO: "LDO-USD",
  KAITO: "KAITO-USD",
  ZRO: "ZRO-USD",
  GNS: "GNS-USD",
  VELO: "VELO-USD",
  ETHFI: "ETHFI-USD",
  POL: "POL-USD",
  ZORA: "ZORA-USD",
  CRV: "CRV-USD",
  COMP: "COMP-USD",
  BRETT: "BRETT-USD",
  DEGEN: "DEGEN-USD",
  TOSHI: "TOSHI-USD",
  WETH: "ETH-USD",
};

const cryptoCompareSymbols = {
  USDC: "USDC",
  LINK: "LINK",
  AAVE: "AAVE",
  OP: "OP",
  VIRTUAL: "VIRTUAL",
  AIXBT: "AIXBT",
  ARB: "ARB",
  UNI: "UNI",
  MORPHO: "MORPHO",
  AERO: "AERO",
  GMX: "GMX",
  WBTC: "BTC",
  CBBTC: "BTC",
  CBETH: "ETH",
  EZETH: "ETH",
  PENDLE: "PENDLE",
  LDO: "LDO",
  KAITO: "KAITO",
  ZRO: "ZRO",
  GNS: "GNS",
  VELO: "VELO",
  ETHFI: "ETHFI",
  POL: "POL",
  ZORA: "ZORA",
  CRV: "CRV",
  COMP: "COMP",
  BRETT: "BRETT",
  DEGEN: "DEGEN",
  TOSHI: "TOSHI",
  WETH: "ETH",
};

const riskTargets = {
  lower: 25,
  moderate: 50,
  high: 75,
  "very-high": 95,
};

const colors = ["#0d6b73", "#28608f", "#1f8a5f", "#c98219", "#c8503e", "#7b4b9d", "#56606f", "#9b5c2f"];

const form = document.getElementById("matcher");
const primaryResult = document.getElementById("primaryResult");
const allocationBars = document.getElementById("allocationBars");
const allocationRisk = document.getElementById("allocationRisk");
const allocationTotal = document.getElementById("allocationTotal");
const topBundleName = document.getElementById("topBundleName");
const topFit = document.getElementById("topFit");
const coinRows = document.getElementById("coinRows");
const networkGroups = document.getElementById("networkGroups");
const coinSearch = document.getElementById("coinSearch");
const bundleAmount = document.getElementById("bundleAmount");
const amountDialog = document.getElementById("amountDialog");
const amountConfirm = document.getElementById("amountConfirm");
const amountCancel = document.getElementById("amountCancel");
const reviewDialog = document.getElementById("reviewDialog");
const reviewBundleTitle = document.getElementById("reviewBundleTitle");
const reviewChecklist = document.getElementById("reviewChecklist");
const reviewTokenList = document.getElementById("reviewTokenList");
const reviewAcknowledge = document.getElementById("reviewAcknowledge");
const reviewConfirm = document.getElementById("reviewConfirm");
const reviewCancel = document.getElementById("reviewCancel");
const openSubmittedBundles = document.getElementById("openSubmittedBundles");
const submittedBundlesDialog = document.getElementById("submittedBundlesDialog");
const submittedBundlesList = document.getElementById("submittedBundlesList");
const submittedBundlesRefresh = document.getElementById("submittedBundlesRefresh");
const submittedBundlesClose = document.getElementById("submittedBundlesClose");
const termsDialog = document.getElementById("termsDialog");
const termsAcknowledge = document.getElementById("termsAcknowledge");
const termsAccept = document.getElementById("termsAccept");
const targetNetwork = document.getElementById("targetNetwork");
const toast = document.getElementById("toast");
const diversityToggle = document.getElementById("diversityToggle");
const diversitySliderWrap = document.getElementById("diversitySliderWrap");
const coinCount = document.getElementById("coinCount");
const coinCountValue = document.getElementById("coinCountValue");
const allocationMode = document.getElementById("allocationMode");
const strategyUniverse = document.getElementById("strategyUniverse");
const recommendation = document.getElementById("recommendation");
const contextRefreshed = document.getElementById("contextRefreshed");
const favoriteCoinName = document.getElementById("favoriteCoinName");
const favoriteCoinTicker = document.getElementById("favoriteCoinTicker");
const favoriteCoinWindow = document.getElementById("favoriteCoinWindow");
const pulseWindowPrev = document.getElementById("pulseWindowPrev");
const pulseWindowNext = document.getElementById("pulseWindowNext");
const favoriteCoinChange = document.getElementById("favoriteCoinChange");
const favoriteCoinUpdated = document.getElementById("favoriteCoinUpdated");
const favoriteCoinEdge = document.getElementById("favoriteCoinEdge");
const favoriteCoinReason = document.getElementById("favoriteCoinReason");
const favoriteCoinInsights = document.getElementById("favoriteCoinInsights");
const pulseStatus = document.getElementById("pulseStatus");
const pulseRefresh = document.getElementById("pulseRefresh");
const pulseChart = document.getElementById("pulseChart");
const useFavoriteCoin = document.getElementById("useFavoriteCoin");
const pulsePrev = document.getElementById("pulsePrev");
const pulseNext = document.getElementById("pulseNext");
const coinPreferenceGrid = document.querySelector(".coin-chip-grid");

let latestMatches = [];
let currentFavorite = fallbackPulse;
let currentFavorites = fallbackPulseDeck;
let currentFavoriteIndex = 0;
let currentBundle = null;
let pulseChartCache = new Map();
let pendingPulseChartLoads = new Map();
let marketPulseRefreshSeq = 0;
let pulseSelectionSeq = 0;
let pulseLoadingActive = false;
let marketPulseReady = false;
let selectedPulseWindow = "24h";
let binanceTickerCache = null;
let coinbaseStatsCache = new Map();
let cryptoCompareStatsCache = null;
let dexScreenerStatsCache = new Map();
let newsCatalystCache = new Map();
let latestMarketSignals = new Map();
const submittedBundlesLocalStorageKey = "viciBundleBuilderSubmittedBundles";
const pulseWindowOptions = [
  { key: "24h", label: "24h", minutes: 1440 },
  { key: "12h", label: "12h", minutes: 720 },
  { key: "6h", label: "6h", minutes: 360 },
  { key: "3h", label: "3h", minutes: 180 },
  { key: "1h", label: "1h", minutes: 60 },
  { key: "30m", label: "30m", minutes: 30 },
  { key: "15m", label: "15m", minutes: 15 },
  { key: "5m", label: "5m", minutes: 5 },
];
let latestPrices = new Map(
  Object.entries(fallbackPrices).map(([ticker, price]) => [ticker, { price, source: "Cached estimate" }]),
);
let pricesUpdatedAt = null;
let apiViciTokenUniverse = readStoredApiTokenUniverse();
let scannedViciTokenUniverse = readStoredTokenUniverse();
let viciCoinsApiRefresh = null;
let viciCoinsApiError = "";
let lastMarketPulseError = "";
let pendingViciSwapHandoff = null;

function getPreferences() {
  const data = new FormData(form);
  const network = normalizeNetwork(data.get("targetNetwork"));
  return {
    network,
    risk: data.get("risk"),
    theme: data.get("theme"),
    confidence: Number(data.get("confidence")),
    targetHorizon: normalizeTargetHorizon(data.get("targetHorizon")),
    bundleAmount: normalizeBundleAmount(data.get("bundleAmount")),
    selectedCoins: data.getAll("coinPrefs").filter((ticker) => isTickerOnNetwork(ticker, network)),
    diversityEnabled: data.get("diversityToggle") === "on",
    coinCount: Number(data.get("coinCount")),
  };
}

function safePreferences() {
  try {
    return getPreferences();
  } catch {
    return {
      network: "Base",
      risk: "moderate",
      theme: "core",
      confidence: 3,
      targetHorizon: "swing",
      bundleAmount: 0,
      selectedCoins: [],
      diversityEnabled: false,
      coinCount: 6,
    };
  }
}

function normalizeTargetHorizon(value) {
  const normalized = String(value || "").toLowerCase().replace(/[_\s-]+/g, "");
  if (["quick", "13days", "1d", "3d", "days", "short"].includes(normalized)) return "quick";
  if (["trend", "23weeks", "2w", "3w", "multiweek"].includes(normalized)) return "trend";
  if (["position", "1month", "month", "long", "longer"].includes(normalized)) return "position";
  return "swing";
}

function horizonLabel(horizon = "swing") {
  return {
    quick: "1-3 days",
    swing: "about 1 week",
    trend: "2-3 weeks",
    position: "1+ month",
  }[normalizeTargetHorizon(horizon)] || "about 1 week";
}

function normalizeBundleAmount(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(numeric, 1_000_000_000));
}

function normalizeNetwork(network) {
  return viciNetworks.includes(network) ? network : "Base";
}

function normalizeKnownNetwork(network) {
  const normalized = String(network || "").trim().toLowerCase();
  return viciNetworks.find((item) => item.toLowerCase() === normalized) || "";
}

function isTickerOnNetwork(ticker, network) {
  return getNetworksForTicker(ticker).includes(normalizeNetwork(network));
}

function chooseBundleNetwork(bundle, preferences = getPreferences()) {
  return normalizeNetwork(preferences.network);
}

function getViciSwapAllocation(bundle, preferences = getPreferences(), network = chooseBundleNetwork(bundle, preferences)) {
  const supportedAllocation = getNetworkSafeAllocation(bundle.allocation, network);
  const desiredCount = getDesiredSupportedCoinCount(preferences, network);
  return normalizeAllocationWeights(fillAllocationToCount(supportedAllocation, network, desiredCount, preferences));
}

function getNetworkSafeAllocation(allocation, network) {
  const normalizedNetwork = normalizeNetwork(network);
  const seenFamilies = new Set();
  return (allocation || []).filter(([ticker]) => {
    if (!isTickerOnNetwork(ticker, normalizedNetwork)) return false;
    const family = canonicalTickerFamily(ticker);
    if (seenFamilies.has(family)) return false;
    seenFamilies.add(family);
    return true;
  });
}

function getNetworksForTicker(ticker) {
  return getActiveNetworkSupport()[normalizeTicker(ticker)] || [];
}

function getSupportedTickersForNetwork(network) {
  const normalized = normalizeNetwork(network);
  const preferences = safePreferences();
  return Object.entries(getActiveNetworkSupport())
    .filter(([, networks]) => networks.includes(normalized))
    .map(([ticker]) => ticker)
    .sort((a, b) => scoreForTicker(b, preferences) - scoreForTicker(a, preferences) || a.localeCompare(b));
}

function supportSourceForNetwork(network) {
  const normalized = normalizeNetwork(network);
  if (getTokenUniverseNetwork(apiViciTokenUniverse, normalized)) return "ViciSwap API";
  if (getTokenUniverseNetwork(scannedViciTokenUniverse, normalized)) return "live ViciSwap scan";
  return confirmedViciNetworkTokens[normalized]?.length ? "confirmed starter scan" : "network not scanned yet";
}

function getActiveNetworkSupport() {
  const support = {};
  viciNetworks.forEach((network) => {
    const apiGroup = getTokenUniverseNetwork(apiViciTokenUniverse, network);
    const scannedGroup = getTokenUniverseNetwork(scannedViciTokenUniverse, network);
    const tickers = apiGroup?.tokens?.length
      ? apiGroup.tokens.map((token) => token.ticker)
      : scannedGroup?.tokens?.length
        ? scannedGroup.tokens.map((token) => token.ticker)
        : confirmedViciNetworkTokens[network] || [];

    tickers.forEach((rawTicker) => {
      const ticker = normalizeTicker(rawTicker);
      if (!ticker || !isLikelyTicker(ticker)) return;
      if (!support[ticker]) support[ticker] = [];
      if (!support[ticker].includes(network)) support[ticker].push(network);
    });
  });
  return support;
}

function getTokenUniverseNetwork(tokenUniverse, network) {
  const normalized = normalizeNetwork(network);
  return tokenUniverse?.networks?.find((item) => normalizeNetwork(item.network) === normalized) || null;
}

function supportMapFromTokenUniverse(tokenUniverse) {
  if (!tokenUniverse?.networks?.length) return {};
  const support = {};
  tokenUniverse.networks.forEach(({ network, tokens }) => {
    const normalizedNetwork = normalizeKnownNetwork(network);
    if (!normalizedNetwork) return;
    (tokens || []).forEach((token) => {
      const ticker = normalizeTicker(token.ticker);
      if (!ticker || !isLikelyTicker(ticker)) return;
      if (!support[ticker]) support[ticker] = [];
      if (!support[ticker].includes(normalizedNetwork)) support[ticker].push(normalizedNetwork);
    });
  });
  return support;
}

function supportMapFromNetworkTokenMap(networkTokenMap) {
  const support = {};
  Object.entries(networkTokenMap || {}).forEach(([network, tickers]) => {
    const normalizedNetwork = normalizeKnownNetwork(network);
    if (!normalizedNetwork) return;
    (tickers || []).forEach((rawTicker) => {
      const ticker = normalizeTicker(rawTicker);
      if (!ticker || !isLikelyTicker(ticker)) return;
      if (!support[ticker]) support[ticker] = [];
      if (!support[ticker].includes(normalizedNetwork)) support[ticker].push(normalizedNetwork);
    });
  });
  return support;
}

function normalizeTicker(ticker) {
  return String(ticker || "").trim().toUpperCase();
}

function isLikelyTicker(ticker) {
  return /^[A-Z][A-Z0-9.]{1,11}$/.test(ticker) && !["MAX", "PAY", "RECEIVE", "SEARCH", "GET", "QUOTES", "CLICK", "SWAP"].includes(ticker);
}

function readStoredTokenUniverse() {
  try {
    const saved = localStorage.getItem(TOKEN_UNIVERSE_LOCAL_STORAGE_KEY);
    return saved ? normalizeTokenUniverse(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

function readStoredApiTokenUniverse() {
  try {
    const saved = localStorage.getItem(VICI_API_TOKEN_UNIVERSE_LOCAL_STORAGE_KEY);
    return saved ? normalizeTokenUniverse(JSON.parse(saved), { dropDuplicateNetworkSignatures: false }) : null;
  } catch {
    return null;
  }
}

function storeTokenUniverse(tokenUniverse) {
  try {
    localStorage.setItem(TOKEN_UNIVERSE_LOCAL_STORAGE_KEY, JSON.stringify(tokenUniverse));
  } catch {
    // The builder can still run from the fallback list if local storage is unavailable.
  }
}

function storeApiTokenUniverse(tokenUniverse) {
  try {
    localStorage.setItem(VICI_API_TOKEN_UNIVERSE_LOCAL_STORAGE_KEY, JSON.stringify(tokenUniverse));
  } catch {
    // The API can still render without cached token metadata.
  }
}

function normalizeTokenUniverse(tokenUniverse, { dropDuplicateNetworkSignatures = true } = {}) {
  if (!tokenUniverse?.networks?.length) return null;
  const networks = dedupeTokenUniverseNetworks(tokenUniverse.networks
    .map(({ network, tokens }) => ({
      network: normalizeKnownNetwork(network),
      tokens: [...new Map((tokens || [])
        .map((token) => ({
          ticker: normalizeTicker(token.ticker),
          text: String(token.text || token.ticker || "").trim(),
          address: normalizeContractAddress(token.address),
          addresses: normalizeTokenAddresses(token.addresses),
        }))
        .filter((token) => isLikelyTicker(token.ticker))
        .map((token) => [token.ticker, token])).values()]
        .sort((a, b) => a.ticker.localeCompare(b.ticker)),
    }))
    .filter(({ network, tokens }) => network && tokens.length), { dropDuplicateNetworkSignatures });

  if (!networks.length) return null;
  const aggregate = new Map();
  networks.forEach(({ network, tokens }) => {
    tokens.forEach((token) => {
      const existing = aggregate.get(token.ticker) || { ticker: token.ticker, text: token.text, networks: [], addresses: {} };
      if (!existing.networks.includes(network)) existing.networks.push(network);
      const address = token.address || token.addresses?.[network];
      if (address) existing.addresses[network] = address;
      aggregate.set(token.ticker, existing);
    });
  });

  return {
    source: tokenUniverse.source || "ViciSwap scan",
    scannedAt: tokenUniverse.scannedAt || new Date().toISOString(),
    networks,
    tokens: [...aggregate.values()].sort((a, b) => a.ticker.localeCompare(b.ticker)),
  };
}

function normalizeContractAddress(address) {
  const match = String(address || "").match(/0x[a-fA-F0-9]{40}/);
  return match ? match[0].toLowerCase() : "";
}

function normalizeTokenAddresses(addresses) {
  if (!addresses || typeof addresses !== "object") return {};
  return Object.entries(addresses).reduce((result, [network, address]) => {
    const normalizedNetwork = normalizeKnownNetwork(network);
    const normalizedAddress = normalizeContractAddress(address);
    if (normalizedNetwork && normalizedAddress) result[normalizedNetwork] = normalizedAddress;
    return result;
  }, {});
}

function dedupeTokenUniverseNetworks(networks, { dropDuplicateNetworkSignatures = true } = {}) {
  const byNetwork = new Map();
  networks.forEach(({ network, tokens }) => {
    const existing = byNetwork.get(network) || new Map();
    tokens.forEach((token) => {
      if (!existing.has(token.ticker)) existing.set(token.ticker, token);
    });
    byNetwork.set(network, existing);
  });

  const merged = [...byNetwork.entries()]
    .map(([network, tokenMap]) => ({
      network,
      tokens: [...tokenMap.values()].sort((a, b) => a.ticker.localeCompare(b.ticker)),
    }))
    .sort((a, b) => viciNetworks.indexOf(a.network) - viciNetworks.indexOf(b.network));

  if (!dropDuplicateNetworkSignatures) return merged;

  const signatureGroups = new Map();
  merged.forEach((result) => {
    const signature = signatureForTokenList(result.tokens);
    if (!signatureGroups.has(signature)) signatureGroups.set(signature, []);
    signatureGroups.get(signature).push(result);
  });

  return [...signatureGroups.values()].flatMap((group) => (group.length === 1 ? group : []));
}

function signatureForTokenList(tokens) {
  return [...new Set((tokens || []).map((token) => normalizeTicker(token.ticker)).filter(Boolean))]
    .sort()
    .join("|");
}

function applyTokenUniverse(tokenUniverse, { announce = false } = {}) {
  const normalized = normalizeTokenUniverse(tokenUniverse);
  if (!normalized) return;
  scannedViciTokenUniverse = normalized;
  storeTokenUniverse(normalized);
  renderNetworkGroups();
  renderCoinPreferenceChips();
  renderCoinRows();
  updateFavoriteToggle();
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
  refreshMarketPulse({ preserveSelection: true, silent: true, render: false });
  if (announce) {
    const networkSummary = normalized.networks.map(({ network, tokens }) => `${network}: ${tokens.length}`).join(" / ");
    showToast(`Imported ViciSwap scan: ${networkSummary}`);
  }
}

async function refreshViciCoinsFromApi({ announce = false, force = false } = {}) {
  if (viciCoinsApiRefresh) return viciCoinsApiRefresh;
  const lastLoaded = apiViciTokenUniverse?.scannedAt ? Date.parse(apiViciTokenUniverse.scannedAt) : 0;
  if (!force && apiViciTokenUniverse?.networks?.length && Number.isFinite(lastLoaded) && Date.now() - lastLoaded < VICI_COINS_API_CACHE_MS) {
    return apiViciTokenUniverse;
  }

  viciCoinsApiRefresh = (async () => {
    const networks = [];
    const errors = [];

    await Promise.all(viciNetworks.map(async (network) => {
      try {
        const tokens = await fetchViciCoinsForNetwork(network);
        if (tokens.length) networks.push({ network, tokens });
        else errors.push(`${network}: no tokens returned`);
      } catch (error) {
        errors.push(`${network}: ${error?.message || String(error)}`);
      }
    }));

    const normalized = normalizeTokenUniverse({
      source: "ViciSwap API",
      scannedAt: new Date().toISOString(),
      networks,
    }, { dropDuplicateNetworkSignatures: false });

    if (!normalized) {
      throw new Error(errors.filter(Boolean).join(" | ") || "ViciSwap API returned no usable token data");
    }

    apiViciTokenUniverse = normalized;
    viciCoinsApiError = "";
    storeApiTokenUniverse(normalized);
    renderNetworkGroups();
    renderCoinPreferenceChips();
    renderCoinRows();
    updateFavoriteToggle();
    if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
    refreshMarketPulse({ preserveSelection: true, silent: true, render: false });

    if (announce) {
      const networkSummary = normalized.networks.map(({ network, tokens }) => `${network}: ${tokens.length}`).join(" / ");
      showToast(`Updated ViciSwap API tokens: ${networkSummary}`);
    }

    return normalized;
  })();

  try {
    return await viciCoinsApiRefresh;
  } catch (error) {
    viciCoinsApiError = error?.message || String(error);
    if (announce) showToast("ViciSwap API was unavailable; keeping the fallback token list.");
    throw error;
  } finally {
    viciCoinsApiRefresh = null;
  }
}

async function fetchViciCoinsForNetwork(network) {
  const normalizedNetwork = normalizeNetwork(network);
  const chainId = viciNetworkChainIds[normalizedNetwork];
  if (!chainId) throw new Error(`Missing chain id for ${normalizedNetwork}`);
  const url = `${VICI_COINS_API_BASE_URL}?chainid=${encodeURIComponent(chainId)}`;
  const payload = await withTimeout(fetchMarketJson(url), VICI_COINS_API_TIMEOUT_MS, `ViciSwap API timed out for ${normalizedNetwork}`);
  return normalizeViciCoinsApiTokens(payload, normalizedNetwork);
}

function normalizeViciCoinsApiTokens(payload, network) {
  return extractViciCoinsApiRows(payload)
    .map((row) => normalizeViciCoinsApiToken(row, network))
    .filter(Boolean)
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
}

function extractViciCoinsApiRows(payload, depth = 0) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object" || depth > 4) return [];

  for (const key of ["coins", "tokens", "data", "result", "results", "items", "rows"]) {
    const value = payload[key];
    const rows = extractViciCoinsApiRows(value, depth + 1);
    if (rows.length) return rows;
  }

  return Object.entries(payload)
    .filter(([key]) => !["success", "status", "message", "error", "chainid", "chainId"].includes(key))
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) return value;
      if (value && typeof value === "object") {
        return [{ ...value, symbol: value.symbol || value.ticker || key }];
      }
      if (typeof value === "string" || typeof value === "number") {
        return [{ symbol: key, name: String(value) }];
      }
      return [];
    });
}

function normalizeViciCoinsApiToken(row, network) {
  if (!row) return null;
  const symbolValue = typeof row === "string" ? row : readApiTokenField(row, [
    "ticker",
    "symbol",
    "tickerSymbol",
    "tokenSymbol",
    "coinSymbol",
    "assetSymbol",
    "code",
  ]);
  let ticker = normalizeTicker(symbolValue);
  const name = typeof row === "string" ? "" : readApiTokenField(row, ["name", "tokenName", "coinName", "assetName", "fullName"]);
  if (!isLikelyTicker(ticker)) {
    const nameAsTicker = normalizeTicker(name);
    if (isLikelyTicker(nameAsTicker)) ticker = nameAsTicker;
  }
  if (!isLikelyTicker(ticker)) return null;

  const address = typeof row === "string" ? "" : normalizeContractAddress(readApiTokenField(row, [
    "address",
    "contract",
    "contractAddress",
    "contract_address",
    "tokenAddress",
    "token_address",
    "coinAddress",
  ]));

  return {
    ticker,
    text: [ticker, name, address].filter(Boolean).join(" "),
    address,
    addresses: address ? { [network]: address } : {},
  };
}

function readApiTokenField(row, keys) {
  if (!row || typeof row !== "object") return "";
  const containers = [row, row.token, row.coin, row.asset, row.currency].filter((item) => item && typeof item === "object");
  for (const container of containers) {
    for (const key of keys) {
      const value = container[key];
      if (value !== undefined && value !== null && value !== "") return String(value);
    }
  }
  return "";
}

function getDesiredSupportedCoinCount(preferences, network) {
  const availableCount = getUniqueSupportedFamilyCount(network);
  if (!availableCount) return 0;
  const requested = preferences.diversityEnabled ? preferences.coinCount : 6;
  return Math.max(Math.min(3, availableCount), Math.min(requested, availableCount));
}

function getUniqueSupportedFamilyCount(network) {
  return new Set(getSupportedTickersForNetwork(network).map(canonicalTickerFamily)).size;
}

function fillAllocationToCount(allocation, network, desiredCount, preferences) {
  const filled = allocation.slice();
  const selectedTickers = preferences.selectedCoins.filter((ticker) => isTickerOnNetwork(ticker, network));
  const fallbackTickers = getNetworkCandidateTickers(network);
  const candidates = [...new Set([...selectedTickers, ...fallbackTickers])];

  for (const ticker of candidates) {
    if (filled.length >= desiredCount) break;
    if (filled.some(([existingTicker]) => areEquivalentTickers(existingTicker, ticker))) continue;
    filled.push([ticker, fallbackWeightForTicker(ticker, preferences), roleForTicker(ticker)]);
  }

  return rebalanceAllocationByLiveSignals(filled, preferences);
}

function areEquivalentTickers(firstTicker, secondTicker) {
  return canonicalTickerFamily(firstTicker) === canonicalTickerFamily(secondTicker);
}

function canonicalTickerFamily(ticker) {
  const normalized = normalizeTicker(ticker);
  if (["ETH", "WETH"].includes(normalized)) return "ETH";
  if (["BTC", "WBTC"].includes(normalized)) return "BTC";
  if (["MATIC", "POL", "POLYGON"].includes(normalized)) return "POLYGON";
  return normalized;
}

function getNetworkCandidateTickers(network) {
  const preferences = safePreferences();
  const supported = getSupportedTickersForNetwork(network);
  const scored = supported
    .map((ticker) => ({ ticker, score: scoreForTicker(ticker, preferences) }))
    .sort((a, b) => b.score - a.score || a.ticker.localeCompare(b.ticker))
    .map(({ ticker }) => ticker);
  return scored;
}

function scoreForTicker(ticker, preferences = safePreferences()) {
  const market = marketCandidates.find((coin) => coin.ticker === ticker);
  const row = coinData.find(([coinTicker]) => coinTicker === ticker);
  const baseScore = market?.baseScore || row?.[3] || (isStableOrCashTicker(ticker) ? 34 : isCoreWrappedTicker(ticker) ? 54 : 50);
  const signal = marketSignalForTicker(ticker);
  if (!signal) return baseScore;
  return Math.round(Math.max(15, Math.min(95, baseScore + liveSignalAdjustment(signal, preferences))));
}

function marketSignalForTicker(ticker) {
  return latestMarketSignals.get(normalizeTicker(ticker)) || null;
}

function liveSignalAdjustment(signal, preferences = safePreferences()) {
  const risk = riskSignalProfile(preferences.risk);
  const horizon = horizonSignalProfile(preferences.targetHorizon);
  const momentum =
    clamp(signal.change24h, -18, 18) * horizon.change24h
    + clamp(signal.change7d, -35, 35) * horizon.change7d
    + clamp(signal.change30d, -60, 60) * horizon.change30d
    + signal.trendReturn * horizon.trendReturn;
  const liquidity = Math.min(12, Math.log10(Math.max(signal.volume24h || 1, 1)) - 5);
  const consistency = (signal.consistency - 0.5) * 16;
  const volatilityPenalty = Math.min(18, signal.volatility * 250);
  const drawdownPenalty = Math.min(16, signal.drawdown * 100);

  return (
    momentum * risk.momentum
    + liquidity * risk.liquidity * horizon.liquidity
    + consistency * risk.consistency * horizon.consistency
    - volatilityPenalty * risk.volatilityPenalty * horizon.volatilityPenalty
    - drawdownPenalty * risk.drawdownPenalty * horizon.drawdownPenalty
  );
}

function horizonSignalProfile(horizon) {
  const profiles = {
    quick: { change24h: 0.62, change7d: 0.18, change30d: 0.05, trendReturn: 0.15, liquidity: 0.95, consistency: 0.75, volatilityPenalty: 1.2, drawdownPenalty: 1.1 },
    swing: { change24h: 0.45, change7d: 0.32, change30d: 0.18, trendReturn: 0.05, liquidity: 1.0, consistency: 1.0, volatilityPenalty: 1.0, drawdownPenalty: 0.9 },
    trend: { change24h: 0.25, change7d: 0.42, change30d: 0.28, trendReturn: 0.05, liquidity: 1.12, consistency: 1.15, volatilityPenalty: 0.9, drawdownPenalty: 0.75 },
    position: { change24h: 0.12, change7d: 0.3, change30d: 0.48, trendReturn: 0.1, liquidity: 1.25, consistency: 1.25, volatilityPenalty: 0.8, drawdownPenalty: 0.65 },
  };
  return profiles[normalizeTargetHorizon(horizon)] || profiles.swing;
}

function riskSignalProfile(risk) {
  const profiles = {
    lower: { momentum: 0.18, liquidity: 1.25, consistency: 1.1, volatilityPenalty: 1.45, drawdownPenalty: 1.35 },
    moderate: { momentum: 0.35, liquidity: 1.0, consistency: 1.0, volatilityPenalty: 1.0, drawdownPenalty: 0.9 },
    high: { momentum: 0.58, liquidity: 0.75, consistency: 0.75, volatilityPenalty: 0.58, drawdownPenalty: 0.52 },
    "very-high": { momentum: 0.78, liquidity: 0.55, consistency: 0.5, volatilityPenalty: 0.35, drawdownPenalty: 0.35 },
  };
  return profiles[risk] || profiles.moderate;
}

function rebalanceAllocationByLiveSignals(allocation, preferences = safePreferences()) {
  if (!allocation.length) return allocation;
  const risk = riskSignalProfile(preferences.risk);
  return allocation.map(([ticker, weight, role]) => {
    const signal = marketSignalForTicker(ticker);
    if (!signal) return [ticker, weight, role];

    const adjustment = liveSignalAdjustment(signal, preferences);
    const cappedAdjustment = clamp(adjustment / 9, -0.26, risk.momentum > 0.5 ? 0.3 : 0.2);
    return [ticker, Math.max(3, weight * (1 + cappedAdjustment)), role];
  });
}

function marketSignalSummary(ticker, preferences = safePreferences()) {
  const signal = marketSignalForTicker(ticker);
  const bestFor = bestHorizonForTicker(ticker, preferences);
  if (!signal) return `Best for ${bestFor.label}. Data score uses the confirmed ViciSwap list; live market signal is still refreshing.`;

  const score = scoreForTicker(ticker, preferences);
  const volatilityLabel = signal.volatility < 0.01 ? "calmer chart" : signal.volatility < 0.025 ? "moderate volatility" : "high volatility";
  const liquidityLabel = signal.volume24h >= 100_000_000 ? "deep volume" : signal.volume24h >= 10_000_000 ? "solid volume" : "thin volume";
  return `Best for ${bestFor.label} (${bestFor.fit}). Data ${score}: 24h ${formatPercent(signal.change24h)}, 7d ${formatPercent(signal.change7d)}, 30d ${formatPercent(signal.change30d)}, ${liquidityLabel}, ${volatilityLabel}.`;
}

function bestHorizonForTicker(ticker, preferences = safePreferences()) {
  const normalized = normalizeTicker(ticker);
  const signal = marketSignalForTicker(normalized);
  const thesis = tokenThesisForTicker(normalized);
  const isStable = isStableOrCashTicker(normalized);
  const isCore = isCoreWrappedTicker(normalized);
  const isCommunity = /Community|social|meme/i.test(thesis?.role || "") || ["BRETT", "DEGEN", "TOSHI", "MOG", "ZORA"].includes(normalized);
  const change24h = finiteOrNull(signal?.change24h) || 0;
  const change7d = finiteOrNull(signal?.change7d) || 0;
  const change30d = finiteOrNull(signal?.change30d) || 0;
  const volume = finiteOrNull(signal?.volume24h) || 0;
  const volatility = finiteOrNull(signal?.volatility) || 0;

  let key = "swing";
  if (isStable) key = "position";
  else if (isCommunity && change24h > 4 && volume >= 500_000) key = "quick";
  else if (change7d > 8 && change30d > 10 && volatility < 0.045) key = "trend";
  else if (isCore || change30d > 18) key = "position";
  else if (change24h > 6 && volatility > 0.025) key = "quick";

  const selected = normalizeTargetHorizon(preferences.targetHorizon);
  const fit = selected === key
    ? "good match"
    : selected === "position" && ["trend", "position"].includes(key)
      ? "reasonable match"
      : selected === "quick" && ["quick", "swing"].includes(key)
        ? "reasonable match"
        : "watch fit";

  return { key, label: horizonLabel(key), fit };
}

function clamp(value, min, max) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(min, Math.min(max, numeric));
}

function roundTo(value, decimals = 2) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  const factor = 10 ** decimals;
  return Math.round(numeric * factor) / factor;
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
  return ["ETH", "WETH", "WBTC", "CBBTC", "CBETH", "TBTC", "WEETH", "WSTETH", "EZETH", "RETH", "RSETH", "LBTC"].includes(normalized);
}

function fallbackWeightForTicker(ticker, preferences = safePreferences()) {
  return Math.max(4, Math.round(scoreForTicker(ticker, preferences) / 5));
}

function roleForTicker(ticker) {
  const row = coinData.find(([coinTicker]) => coinTicker === ticker);
  if (row?.[1]) return row[1].split("/")[0].trim();
  const market = marketCandidates.find((coin) => coin.ticker === ticker);
  return market?.theme ? market.theme.toUpperCase() : "Network-supported";
}

function normalizeAllocationWeights(allocation) {
  if (!allocation.length) return [];
  const total = allocation.reduce((sum, [, weight]) => sum + weight, 0);
  const normalized = allocation.map(([ticker, weight, role]) => {
    const exact = (weight / total) * 100;
    return { ticker, role, exact, weight: Math.floor(exact) };
  });
  let remainder = 100 - normalized.reduce((sum, item) => sum + item.weight, 0);
  [...normalized]
    .sort((a, b) => b.exact - Math.floor(b.exact) - (a.exact - Math.floor(a.exact)))
    .slice(0, remainder)
    .forEach((item) => {
      item.weight += 1;
    });

  return normalized.map(({ ticker, weight, role }) => [ticker, weight, role]);
}

function getViciMarketCandidates(network = getPreferences().network) {
  const normalizedNetwork = normalizeNetwork(network);
  return getSupportedTickersForNetwork(normalizedNetwork).map((ticker) => marketCandidateForTicker(ticker, normalizedNetwork));
}

function findMarketCandidateById(id, network = getPreferences().network) {
  return getViciMarketCandidates(network).find((coin) => coin.id === id);
}

function findMarketCandidateForMarket(market, network = getPreferences().network) {
  const normalizedTicker = normalizeTicker(market?.ticker);
  return getViciMarketCandidates(network).find((coin) => (
    (market?.id && coin.id === market.id)
    || (normalizedTicker && coin.ticker === normalizedTicker)
  ));
}

function marketCandidateForTicker(ticker, network = getPreferences().network) {
  const normalizedTicker = normalizeTicker(ticker);
  const known = marketCandidates.find((coin) => coin.ticker === normalizedTicker);
  if (known) return known;
  const row = coinData.find(([coinTicker]) => coinTicker === normalizedTicker);
  const token = tokenInfoForNetwork(normalizedTicker, network);
  const theme = row?.[1]?.split("/")?.[0]?.trim()?.toLowerCase() || inferPulseTheme(normalizedTicker);
  return {
    ticker: normalizedTicker,
    id: "",
    name: token?.name || row?.[0] || normalizedTicker,
    theme,
    baseScore: row?.[3] || (isStableOrCashTicker(normalizedTicker) ? 30 : isCoreWrappedTicker(normalizedTicker) ? 52 : 38),
    reason: row?.[4] || "It is in the current ViciSwap Receive-token list for this network, so it can compete if live market data confirms enough momentum and depth.",
  };
}

function tokenInfoForNetwork(ticker, network = getPreferences().network) {
  const normalizedTicker = normalizeTicker(ticker);
  const normalizedNetwork = normalizeNetwork(network);
  const apiToken = getTokenUniverseNetwork(apiViciTokenUniverse, normalizedNetwork)
    ?.tokens?.find((token) => normalizeTicker(token.ticker) === normalizedTicker);
  const scannedToken = getTokenUniverseNetwork(scannedViciTokenUniverse, normalizedNetwork)
    ?.tokens?.find((token) => normalizeTicker(token.ticker) === normalizedTicker);
  return apiToken || scannedToken || null;
}

function inferPulseTheme(ticker) {
  const normalized = normalizeTicker(ticker);
  if (isStableOrCashTicker(normalized) || isCoreWrappedTicker(normalized)) return "core";
  if (/BTC|ETH|SOL/.test(normalized)) return "core";
  if (/AERO|VELO|UNI|CRV|GMX|GNS|AAVE|MORPHO|PENDLE|LDO/.test(normalized)) return "defi";
  if (/AIXBT|VIRTUAL|KAITO/.test(normalized)) return "ai";
  return "network";
}

function scoreBundle(bundle, preferences) {
  return scoreBundleBreakdown(bundle, preferences)?.score ?? -1;
}

function scoreBundleBreakdown(bundle, preferences) {
  const network = chooseBundleNetwork(bundle, preferences);
  const nativeAllocation = getNetworkSafeAllocation(bundle.allocation, network);
  const allocation = getViciSwapAllocation(bundle, preferences, network);
  const desiredCount = getDesiredSupportedCoinCount(preferences, network);
  if (desiredCount <= 0) return null;
  const requiredNativeCount = Math.min(2, desiredCount);
  if (nativeAllocation.length < requiredNativeCount || allocation.length < desiredCount) return null;

  const targetRisk = riskTargets[preferences.risk] + (preferences.confidence - 3) * 7;
  const riskFit = Math.max(0, 100 - Math.abs(bundle.riskIndex - targetRisk) * 1.35);
  const themeFit =
    bundle.themes[0] === preferences.theme
      ? 100
      : bundle.themes.includes(preferences.theme)
        ? 78
      : bundle.themes.includes("core")
          ? 56
          : 30;
  const bundleTickers = allocation.map(([ticker]) => ticker);
  const selectedMatches = preferences.selectedCoins.filter((ticker) => bundleTickers.includes(ticker)).length;
  const coinFit = preferences.selectedCoins.length ? (selectedMatches / preferences.selectedCoins.length) * 100 : 62;
  const diversityFit = preferences.diversityEnabled
    ? Math.max(55, 100 - Math.abs(allocation.length - preferences.coinCount) * 8)
    : 78;
  const networkFit = Math.min(100, 62 + nativeAllocation.length * 6);
  const qualityFit = getAllocationDataFit(allocation, preferences, bundle);
  const roleSummary = allocationRoleSummary(allocation);
  const weights = preferences.selectedCoins.length
    ? { risk: 0.34, theme: 0.23, coins: 0.22, quality: 0.08, diversity: 0.05, network: 0.08 }
    : { risk: 0.46, theme: 0.29, coins: 0, quality: 0.11, diversity: 0.05, network: 0.09 };
  const pieces = [
    {
      id: "risk",
      label: "Risk match",
      value: riskFit,
      weight: weights.risk,
      color: "#0d6b73",
      detail: `Risk fit ${Math.round(riskFit)}/100. Your target risk is ${Math.round(targetRisk)} and this bundle's risk index is ${bundle.riskIndex}.`,
    },
    {
      id: "theme",
      label: "Focus match",
      value: themeFit,
      weight: weights.theme,
      color: "#28608f",
      detail: `Focus fit ${Math.round(themeFit)}/100. Your selected lane is ${preferences.theme.toUpperCase()}; this bundle covers ${bundle.themes.join(", ")}.`,
    },
    {
      id: "coins",
      label: "Coin picks",
      value: coinFit,
      weight: weights.coins,
      color: "#7b4b9d",
      detail: preferences.selectedCoins.length
        ? `Coin preference fit ${Math.round(coinFit)}/100. ${selectedMatches} of ${preferences.selectedCoins.length} preferred coins made the same-network allocation.`
        : "No specific coin preferences were selected, so this slice does not affect the score.",
    },
    {
      id: "quality",
      label: "Upside data",
      value: qualityFit,
      weight: weights.quality,
      color: "#1f8a5f",
      detail: `Upside/data fit ${Math.round(qualityFit)}/100. This blends live coin signals with the actual bundle roles: ${roleSummary}.`,
    },
    {
      id: "diversity",
      label: "Diversity",
      value: diversityFit,
      weight: weights.diversity,
      color: "#c98219",
      detail: preferences.diversityEnabled
        ? `Diversity fit ${Math.round(diversityFit)}/100. You asked for ${preferences.coinCount} coins and this bundle produced ${allocation.length}.`
        : `Diversity fit ${Math.round(diversityFit)}/100. Default diversity is being used, so this has a lighter influence.`,
    },
    {
      id: "network",
      label: "Vici support",
      value: networkFit,
      weight: weights.network,
      color: "#c8503e",
      detail: `ViciSwap support fit ${Math.round(networkFit)}/100. ${nativeAllocation.length} native model coins and ${allocation.length} final coins are confirmed on ${network}.`,
    },
  ].filter((piece) => piece.weight > 0);
  const raw = pieces.reduce((sum, piece) => sum + piece.value * piece.weight, 0);
  const score = Math.round(Math.max(0, Math.min(99, raw)));
  return {
    score,
    raw,
    pieces: pieces.map((piece) => ({
      ...piece,
      contribution: piece.value * piece.weight,
    })),
  };
}

function getAllocationDataFit(allocation, preferences, bundle) {
  if (!allocation.length) return Math.min(100, bundle.score + 32);
  const averageCoinScore = allocation.reduce((sum, [ticker]) => sum + scoreForTicker(ticker, preferences), 0) / allocation.length;
  const modelThesisScore = Math.min(100, bundle.score + 32);
  return Math.max(25, Math.min(100, averageCoinScore * 0.68 + modelThesisScore * 0.32));
}

function allocationRoleSummary(allocation) {
  const roles = allocation
    .map(([ticker]) => tokenThesisForTicker(ticker)?.role || roleForTicker(ticker))
    .filter(Boolean);
  const uniqueRoles = [...new Set(roles)].slice(0, 4);
  return uniqueRoles.length ? uniqueRoles.join(", ") : "same-network supported coins";
}

function rankBundles() {
  const preferences = getPreferences();
  latestMatches = bundleData
    .map((bundle) => {
      const fitBreakdown = scoreBundleBreakdown(bundle, preferences);
      return { ...bundle, fit: fitBreakdown?.score ?? -1, fitBreakdown };
    })
    .filter((bundle) => bundle.fit >= 0)
    .sort((a, b) => b.fit - a.fit || b.score - a.score);

  renderPrimary(latestMatches[0] || makeNetworkFallbackBundle(preferences));
}

function makeNetworkFallbackBundle(preferences) {
  const network = preferences.network;
  const allocation = fillAllocationToCount([], network, getDesiredSupportedCoinCount(preferences, network), preferences);
  const hasAllocation = allocation.length > 0;
  return {
    id: "same-network-fallback",
    name: `${network} Confirmed Bundle`,
    risk: "Moderate",
    riskIndex: 48,
    score: 58,
    themes: ["core"],
    accent: "#0d6b73",
    target: hasAllocation ? `Confirmed ${network} Receive-list allocation` : `${network} needs a ViciSwap scan`,
    tagline: "The strict network-safe pick",
    thesis: hasAllocation
      ? `Uses only coins from the builder's confirmed ${network} ViciSwap support list.`
      : `No ${network} Receive tokens are confirmed right now. Refresh the builder or try again after ViciSwap token eligibility is available.`,
    action: hasAllocation
      ? "Best when token availability matters more than maximizing narrative variety."
      : "Switch back to a scanned network or run the full ViciSwap token scan before building on this network.",
    disclosure: "This still requires a live route, liquidity, slippage, and quote review inside ViciSwap.",
    vcPlan: "Use this as the fallback when stricter support rules remove less compatible strategies.",
    allocation,
    fit: hasAllocation ? 70 : 0,
  };
}

function buildBundle({ scroll = true } = {}) {
  if (!form.reportValidity()) return;
  rankBundles();
  recommendation.hidden = false;
  if (scroll) {
    recommendation.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderPrimary(bundle) {
  currentBundle = bundle;
  const preferences = getPreferences();
  const bundleNetwork = preferences.network;
  const adjustedAllocation = getAdjustedAllocation(bundle, bundleNetwork, preferences);
  const allocationPlan = getAllocationPlan(adjustedAllocation, preferences.bundleAmount);
  const viciSwapUrl = makeViciSwapUrl(bundle, adjustedAllocation, bundleNetwork);
  const fitBreakdown = bundle.fitBreakdown || scoreBundleBreakdown(bundle, preferences) || makeFallbackFitBreakdown(bundle.fit || 0);
  topBundleName.textContent = bundle.name;
  topFit.textContent = `Fit ${fitBreakdown.score}`;
  allocationRisk.textContent = bundle.risk;
  allocationTotal.textContent = `${formatCurrency(preferences.bundleAmount)} total`;
  const passedCount = latestMatches.length || (bundle.id === "same-network-fallback" ? 0 : 1);
  strategyUniverse.textContent = `Screened ${bundleData.length} models; ${passedCount} passed strict ${bundleNetwork} support from ${supportSourceForNetwork(bundleNetwork)}`;
  allocationMode.textContent = `${bundleNetwork} network - ${adjustedAllocation.length} confirmed Receive coins - target ${horizonLabel(preferences.targetHorizon)}`;
  primaryResult.innerHTML = `
    <div class="result-copy">
      <p class="eyebrow">${bundle.tagline}</p>
      <h3>${bundle.target}</h3>
      <p>${bundle.thesis}</p>
      <div class="metric-row" aria-label="Bundle metrics">
        <div class="metric"><span>Fit</span><strong>${fitBreakdown.score}</strong></div>
        <div class="metric"><span>Upside score</span><strong>${bundle.score}</strong></div>
        <div class="metric"><span>Risk index</span><strong>${bundle.riskIndex}</strong></div>
        <div class="metric"><span>Coins</span><strong>${adjustedAllocation.length}</strong></div>
        <div class="metric"><span>Total</span><strong>${formatCurrency(preferences.bundleAmount)}</strong></div>
        <div class="metric"><span>Horizon</span><strong>${horizonLabel(preferences.targetHorizon)}</strong></div>
      </div>
      <div class="result-actions">
        <a class="action-button primary" href="${viciSwapUrl}" target="_blank" rel="noreferrer" data-open-viciswap="${bundle.id}">
          ${icon("external")} Build in ViciSwap
        </a>
        <button class="action-button" type="button" data-copy="${bundle.id}">
          ${icon("copy")} Copy summary
        </button>
        <button class="action-button caution" type="button" data-risk="${bundle.id}">
          ${icon("alert")} Risk note
        </button>
      </div>
    </div>
    <div class="fit-panel">
      ${renderFitDonut(fitBreakdown)}
      <p>${bundle.action}</p>
      <p class="fit-role-note"><strong>Signal roles:</strong> ${escapeHtml(allocationRoleSummary(adjustedAllocation))}</p>
    </div>
  `;
  renderAllocation(bundle, allocationPlan);
}

function makeFallbackFitBreakdown(score) {
  return {
    score,
    pieces: [
      {
        id: "fit",
        label: "Fit",
        value: score,
        weight: 1,
        contribution: score,
        color: "#0d6b73",
        detail: `Fit score ${score}/100 from the strict same-network fallback model.`,
      },
    ],
  };
}

function renderFitDonut(breakdown) {
  const slices = fitDonutSlices(breakdown);
  return `
    <div class="fit-donut-wrap" aria-label="Fit score contribution chart">
      <div class="fit-donut-stage">
        <svg class="fit-donut" viewBox="0 0 180 180" role="img" aria-label="Fit score ${breakdown.score} out of 100">
          ${slices.map((slice) => `
            <g class="fit-slice" tabindex="0" data-fit-tooltip="${escapeAttribute(slice.tooltip)}" aria-label="${escapeAttribute(slice.tooltip)}">
              <path d="${slice.path}" fill="${slice.color}"></path>
            </g>
          `).join("")}
          <circle cx="90" cy="90" r="48" fill="#ffffff"></circle>
          <text x="90" y="83" text-anchor="middle" class="fit-donut-score">${breakdown.score}</text>
          <text x="90" y="105" text-anchor="middle" class="fit-donut-label">Fit</text>
        </svg>
        <div class="fit-donut-tooltip" role="status" aria-live="polite" hidden></div>
      </div>
      <div class="fit-legend">
        ${breakdown.pieces.map((piece) => `
          <span class="fit-legend-item">
            <i style="--fit-color:${piece.color}"></i>
            <b>${piece.label}</b>
            <em>${piece.contribution.toFixed(1)}</em>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function fitDonutSlices(breakdown) {
  let start = -90;
  const scoredSlices = breakdown.pieces.map((piece) => {
    const value = Math.max(0, piece.contribution);
    const end = start + value * 3.6;
    const slice = {
      color: piece.color,
      path: describeDonutSlice(90, 90, 78, 50, start, end),
      tooltip: fitPieceTooltip(piece),
    };
    start = end;
    return slice;
  });
  const remainder = Math.max(0, 100 - breakdown.score);
  if (remainder > 0) {
    scoredSlices.push({
      color: "#e6edf3",
      path: describeDonutSlice(90, 90, 78, 50, start, start + remainder * 3.6),
      tooltip: `Gap to perfect fit: ${remainder} points. This is the space between this bundle and a 100/100 match.`,
    });
  }
  return scoredSlices;
}

function fitPieceTooltip(piece) {
  return `${piece.label}: contributes ${piece.contribution.toFixed(1)} points (${Math.round(piece.value)}/100 x ${Math.round(piece.weight * 100)}% weight). ${piece.detail}`;
}

function describeDonutSlice(cx, cy, outerRadius, innerRadius, startAngle, endAngle) {
  const span = Math.max(0.01, endAngle - startAngle);
  const adjustedEnd = span >= 360 ? startAngle + 359.99 : endAngle;
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, adjustedEnd);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, adjustedEnd);
  const largeArcFlag = adjustedEnd - startAngle > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function polarToCartesian(cx, cy, radius, angleDegrees) {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  return {
    x: Number((cx + radius * Math.cos(angleRadians)).toFixed(3)),
    y: Number((cy + radius * Math.sin(angleRadians)).toFixed(3)),
  };
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getAdjustedAllocation(bundle, network = chooseBundleNetwork(bundle), preferences = getPreferences()) {
  const allocation = getNetworkSafeAllocation(getViciSwapAllocation(bundle, preferences, network), network);
  if (!preferences.diversityEnabled) return allocation;

  const desiredCount = Math.max(3, Math.min(preferences.coinCount, allocation.length));
  return normalizeAllocationWeights(getNetworkSafeAllocation(allocation.slice(0, desiredCount), network));
}

function getAllocationPlan(allocation, totalAmount = getPreferences().bundleAmount) {
  const preferences = safePreferences();
  const totalCents = Math.round(normalizeBundleAmount(totalAmount) * 100);
  const planned = allocation.map(([ticker, weight, role]) => {
    const exactCents = (totalCents * weight) / 100;
    const priceInfo = getCoinPriceInfo(ticker);
    return {
      ticker,
      weight,
      role,
      cents: Math.floor(exactCents),
      fractionalCents: exactCents - Math.floor(exactCents),
      price: priceInfo?.price || null,
      priceSource: priceInfo?.source || null,
      networks: getNetworksForTicker(ticker),
      dataScore: scoreForTicker(ticker, preferences),
      signalSummary: marketSignalSummary(ticker, preferences),
    };
  });
  let remainder = totalCents - planned.reduce((sum, item) => sum + item.cents, 0);
  [...planned]
    .sort((a, b) => b.fractionalCents - a.fractionalCents || b.weight - a.weight)
    .slice(0, remainder)
    .forEach((item) => {
      item.cents += 1;
    });

  return planned.map(({ ticker, weight, role, cents, price, priceSource, networks, dataScore, signalSummary }) => ({
    ticker,
    weight,
    role,
    amount: cents / 100,
    price,
    priceSource,
    networks,
    dataScore,
    signalSummary,
    bestFor: bestHorizonForTicker(ticker, preferences),
    thesisProfile: tokenThesisForTicker(ticker),
    safetyProfile: safetyProfileForTicker(ticker, { amount: cents / 100, priceSource }),
    quantity: price ? cents / 100 / price : null,
  }));
}

function safetyProfileForTicker(ticker, { amount = 0, priceSource = "" } = {}) {
  const normalized = normalizeTicker(ticker);
  const signal = marketSignalForTicker(normalized);
  const isStable = isStableOrCashTicker(normalized);
  const isCore = isCoreWrappedTicker(normalized);
  const isViciNative = normalized === "VCNT";
  const isSpeculative = ["BRETT", "DEGEN", "TOSHI", "ZORA", "AIXBT", "KAITO", "VIRTUAL"].includes(normalized);
  const volume = finiteOrNull(signal?.volume24h);
  const hasLiveVolume = Number.isFinite(volume) && volume > 0;
  const volatility = finiteOrNull(signal?.volatility);
  const highVolatility = Number.isFinite(volatility) && volatility > 0.055;
  const livePrice = priceSource && !/cached/i.test(priceSource);

  const liquidityLabel = hasLiveVolume
    ? volume >= 100_000_000
      ? "Deep volume"
      : volume >= 10_000_000
        ? "Solid volume"
        : "Volume verified"
    : isStable || isCore
      ? "Established asset"
      : "ViciSwap listed";

  const contractLabel = isStable || isCore
    ? "Major/wrapped asset"
    : isViciNative
      ? "Vici ecosystem asset"
      : "Basic list check only";

  const dataLabel = hasLiveVolume || livePrice ? "Live data" : "Cached data";
  const needsReview = isSpeculative || highVolatility || (!hasLiveVolume && !isStable && !isCore);
  const level = needsReview ? "review" : "pass";
  const label = needsReview ? "Review" : "Basic pass";
  const summary = needsReview
    ? "Higher-risk profile. Verify liquidity, route depth, and contract details before swapping."
    : "Passed the builder's basic availability, price, and liquidity screen.";

  return {
    level,
    label,
    liquidityLabel,
    contractLabel,
    dataLabel,
    amount,
    summary,
    detail: `${summary} This is not a rug-pull detector or contract audit.`,
  };
}

function renderSafetyStrip(profile) {
  if (!profile) return "";
  return `
    <span class="safety-strip safety-${profile.level}" title="${escapeAttribute(profile.detail)}">
      <b>${profile.label}</b>
      <span>${profile.liquidityLabel}</span>
      <span>${profile.contractLabel}</span>
      <span>${profile.dataLabel}</span>
    </span>
  `;
}

function renderAllocation(bundle, allocationPlan = getAllocationPlan(getAdjustedAllocation(bundle))) {
  if (!allocationPlan.length) {
    allocationBars.innerHTML = `
      <div class="allocation-item">
        <div class="allocation-head">
          <span class="allocation-label">No confirmed same-network coins available</span>
          <span class="allocation-value"><strong>Try another network</strong></span>
        </div>
      </div>
    `;
    return;
  }

  allocationBars.innerHTML = allocationPlan
    .map(({ ticker, weight, role, amount, quantity, price, priceSource, networks, signalSummary, thesisProfile, safetyProfile, bestFor }, index) => {
      const color = colors[index % colors.length];
      const selectedNetwork = getPreferences().network;
      const otherNetworks = (networks || []).filter((network) => network !== selectedNetwork);
      const networkText = networks?.includes(selectedNetwork)
        ? `Receive: ${selectedNetwork}${otherNetworks.length ? `; also listed: ${otherNetworks.join(" / ")}` : ""}`
        : "network pending";
      return `
        <div class="allocation-item">
          <div class="allocation-head">
            <span class="allocation-label">
              ${ticker} - ${role}
              <small>${networkText}</small>
              ${bestFor ? `<small>Best for ${escapeHtml(bestFor.label)} - ${escapeHtml(bestFor.fit)} with your target.</small>` : ""}
              ${thesisProfile ? `<small>${escapeHtml(thesisProfile.role)}: ${escapeHtml(thesisProfile.why)}</small>` : ""}
              <small>${signalSummary}</small>
              ${renderSafetyStrip(safetyProfile)}
            </span>
            <span class="allocation-value">
              <strong>${formatCurrency(amount)}</strong>
              <span>${weight}% - ${formatQuantity(quantity, ticker)}</span>
              <span>${formatPriceLine(price, priceSource)}</span>
            </span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${weight}%; --bar-color:${color}"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderCoinPreferenceChips() {
  if (!coinPreferenceGrid) return;
  const { network } = getPreferences();
  const checked = new Set([...document.querySelectorAll('input[name="coinPrefs"]')]
    .filter((input) => input.checked)
    .map((input) => input.value));
  const tickers = getSupportedTickersForNetwork(network);
  coinPreferenceGrid.innerHTML = tickers.length
    ? tickers.map((ticker) => {
      const id = `coin-${ticker.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      return `
        <input type="checkbox" id="${id}" name="coinPrefs" value="${ticker}" ${checked.has(ticker) ? "checked" : ""} />
        <label for="${id}" title="${ticker} is available on ${network}">${ticker}</label>
      `;
    }).join("")
    : `<p class="empty-chip-note">ViciSwap API unavailable for this network. Run a fallback scan or choose another network.</p>`;
  syncCoinCountBounds();
}

function renderNetworkGroups() {
  if (!networkGroups) return;
  const selectedNetwork = getPreferences().network;
  networkGroups.innerHTML = viciNetworks.map((network) => {
    const tickers = getSupportedTickersForNetwork(network);
    const source = supportSourceForNetwork(network);
    const isSelected = network === selectedNetwork;
    const visibleTickers = tickers.slice(0, 18);
    const extraCount = Math.max(0, tickers.length - visibleTickers.length);
    const status = source === "ViciSwap API"
      ? `${tickers.length} API coins`
      : source === "live ViciSwap scan"
        ? `${tickers.length} scanned coins`
        : source === "network not scanned yet"
          ? "not scanned yet"
          : `${tickers.length} confirmed coins`;

    return `
      <button class="network-group ${isSelected ? "active" : ""}" type="button" data-network-select="${network}">
        <span class="network-group-head">
          <strong>${network}</strong>
          <em>${status}</em>
        </span>
        <span class="network-group-tickers">
          ${visibleTickers.length ? visibleTickers.map((ticker) => `<b>${ticker}</b>`).join("") : "<i>Run scan</i>"}
          ${extraCount ? `<b>+${extraCount}</b>` : ""}
        </span>
      </button>
    `;
  }).join("");
}

function syncCoinCountBounds() {
  const availableCount = getUniqueSupportedFamilyCount(getPreferences().network);
  const maxCount = Math.max(3, Math.min(12, availableCount || 3));
  coinCount.max = String(maxCount);
  if (Number(coinCount.value) > maxCount) coinCount.value = String(maxCount);
  coinCountValue.textContent = `${coinCount.value} coins`;
}

function renderCoinRows() {
  const { network } = getPreferences();
  const query = coinSearch.value.trim().toLowerCase();
  const rows = getCoinRowsForNetwork(network).filter((coin) => [
    coin.ticker,
    coin.theme,
    coin.network,
    coin.bullish,
    coin.watchout,
  ].join(" ").toLowerCase().includes(query));
  coinRows.innerHTML = rows.length
    ? rows
    .map(({ ticker, theme, network: coinNetwork, score, bullish, watchout }) => {
      const color = score >= 64 ? "#1f8a5f" : score >= 55 ? "#c98219" : "#c8503e";
      return `
        <tr>
          <td><strong>${escapeHtml(ticker)}</strong></td>
          <td>${escapeHtml(theme)}</td>
          <td>${escapeHtml(networkTextForTicker(ticker) || coinNetwork)}</td>
          <td><span class="score-badge" style="--score-color:${color}">${score}</span></td>
          <td>${escapeHtml(bullish)}</td>
          <td>${escapeHtml(watchout)}</td>
        </tr>
      `;
    })
    .join("")
    : `<tr><td colspan="6">No ViciSwapable candidates found for this network yet.</td></tr>`;
}

function getCoinRowsForNetwork(network) {
  return getSupportedTickersForNetwork(network).map((ticker) => coinMetaForTicker(ticker));
}

function coinMetaForTicker(ticker) {
  const row = coinData.find(([coinTicker]) => coinTicker === ticker);
  const score = scoreForTicker(ticker);
  if (row) {
    return {
      ticker: row[0],
      theme: row[1],
      network: networkTextForTicker(row[0]) || row[2],
      score,
      bullish: coinBullishCase(row[0], row[4]),
      watchout: coinWatchout(row[0], row[5]),
    };
  }

  return {
    ticker,
    theme: tokenThesisForTicker(ticker)?.role || "ViciSwap listed",
    network: networkTextForTicker(ticker),
    score,
    bullish: coinBullishCase(ticker, "Listed on the selected ViciSwap Receive list, so it can be considered for same-network bundle ideas."),
    watchout: coinWatchout(ticker, "Review route, slippage, token details, and transaction terms before swapping."),
  };
}

function coinBullishCase(ticker, baseText) {
  const thesis = tokenThesisForTicker(ticker);
  const liveText = liveSignalText(marketSignalForTicker(ticker));
  const thesisText = thesis ? `${thesis.role}: ${thesis.why}` : baseText;
  return liveText ? `${thesisText} Live signal: ${liveText}.` : thesisText;
}

function coinWatchout(ticker, baseText) {
  const thesis = tokenThesisForTicker(ticker);
  const signal = marketSignalForTicker(ticker);
  const startingText = thesis?.watch || baseText;
  if (!signal) return startingText;

  const notes = [];
  const volatility = finiteOrNull(signal.volatility);
  const drawdown = finiteOrNull(signal.drawdown);
  if (Number.isFinite(volatility) && volatility > 0.055) notes.push("live chart is high volatility");
  if (Number.isFinite(drawdown) && drawdown > 0.12) notes.push("recent drawdown is elevated");
  return notes.length ? `${startingText} Also note: ${notes.join(", ")}.` : startingText;
}

function liveSignalText(signal) {
  if (!signal) return "";
  const pieces = [`24h ${formatPercent(signal.change24h)}`];
  const sevenDay = finiteOrNull(signal.change7d);
  const thirtyDay = finiteOrNull(signal.change30d);
  const volume = confirmedVolumePhrase(signal.volume24h);
  const volatility = volatilityPhrase(signal.volatility);
  if (Number.isFinite(sevenDay) && Math.abs(sevenDay) >= 0.01) pieces.push(`7d ${formatPercent(sevenDay)}`);
  if (Number.isFinite(thirtyDay) && Math.abs(thirtyDay) >= 0.01) pieces.push(`30d ${formatPercent(thirtyDay)}`);
  if (volume) pieces.push(volume);
  if (volatility) pieces.push(volatility);
  return pieces.join(", ");
}

function confirmedVolumePhrase(volume24h) {
  const volume = finiteOrNull(volume24h);
  if (!Number.isFinite(volume) || volume <= 0) return "";
  if (volume >= 100_000_000) return "deep volume";
  if (volume >= 10_000_000) return "solid volume";
  return "";
}

function volatilityPhrase(volatility) {
  const value = finiteOrNull(volatility);
  if (!Number.isFinite(value) || value <= 0) return "";
  if (value < 0.01) return "calmer chart";
  if (value < 0.035) return "moderate volatility";
  return "higher volatility";
}

function networkTextForTicker(ticker) {
  return getNetworksForTicker(ticker).join(" / ");
}

function pitchFor(bundle) {
  const preferences = getPreferences();
  const bundleNetwork = preferences.network;
  const allocationRows = getAllocationPlan(getAdjustedAllocation(bundle, bundleNetwork, preferences), preferences.bundleAmount);
  const allocation = allocationRows
    .map(({ ticker, weight, amount, quantity, networks }) => {
      const otherNetworks = (networks || []).filter((network) => network !== bundleNetwork);
      const networkNote = otherNetworks.length ? `${bundleNetwork}; also ${otherNetworks.join("/")}` : bundleNetwork;
      return `${ticker} ${weight}% (${formatCurrency(amount)}, ${formatQuantity(quantity, ticker)}, Receive: ${networkNote})`;
    })
    .join(", ");
  const tokenNotes = allocationRows
    .map(({ ticker, thesisProfile, signalSummary }) => {
      if (!thesisProfile) return `- ${ticker}: ${signalSummary}`;
      return `- ${ticker}: ${thesisProfile.role}. ${thesisProfile.why} Watch: ${thesisProfile.watch}`;
    })
    .join("\n");
  return `${bundle.name}: ${bundle.thesis}\n\nNetwork: ${bundleNetwork}\nTotal bundle value: ${formatCurrency(preferences.bundleAmount)}\n\nSuggested allocation: ${allocation}\n\nWhy these coins:\n${tokenNotes}\n\nWhy use it: ${bundle.action}\n\nBuilder note: ${bundle.vcPlan}\n\nRisk note: ${bundle.disclosure}\n\nAlways verify route, slippage, and token availability in ViciSwap before swapping.`;
}

async function copyPitch(bundleId) {
  const bundle = bundleData.find((item) => item.id === bundleId);
  if (!bundle) return;
  try {
    await navigator.clipboard.writeText(pitchFor(bundle));
    showToast(`${bundle.name} summary copied.`);
  } catch {
    showToast("Copy was blocked by the browser. Open the app in a browser tab and try again.");
  }
}

function showRisk(bundleId) {
  const bundle = bundleData.find((item) => item.id === bundleId);
  if (bundle) showToast(bundle.disclosure);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function icon(name) {
  const icons = {
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>',
    alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21.7 18-8.5-15a1.4 1.4 0 0 0-2.4 0L2.3 18a1.3 1.3 0 0 0 1.2 2h17a1.3 1.3 0 0 0 1.2-2Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>',
  };
  return icons[name] || "";
}

function openAmountDialog() {
  if (!amountDialog) return;
  if (typeof amountDialog.showModal === "function") {
    if (!amountDialog.open) amountDialog.showModal();
  } else {
    amountDialog.setAttribute("open", "");
  }
  window.setTimeout(() => {
    bundleAmount.focus();
    if (bundleAmount.value) bundleAmount.select();
  }, 0);
}

function closeAmountDialog() {
  if (!amountDialog) return;
  if (typeof amountDialog.close === "function" && amountDialog.open) {
    amountDialog.close();
  } else {
    amountDialog.removeAttribute("open");
  }
}

function confirmBundleAmount() {
  if (!bundleAmount.reportValidity()) return;
  closeAmountDialog();
  buildBundle();
}

function hasAcceptedTerms() {
  try {
    const record = JSON.parse(localStorage.getItem(TERMS_ACK_STORAGE_KEY) || "null");
    return record?.version === TERMS_ACK_VERSION && record?.accepted === true;
  } catch {
    return false;
  }
}

function showTermsGate() {
  if (!termsDialog || hasAcceptedTerms()) return;
  termsAcknowledge.checked = false;
  termsAccept.disabled = true;
  if (typeof termsDialog.showModal === "function") {
    if (!termsDialog.open) termsDialog.showModal();
  } else {
    termsDialog.setAttribute("open", "");
  }
  window.setTimeout(() => termsAcknowledge?.focus(), 0);
}

function acceptTermsGate() {
  if (!termsAcknowledge?.checked) return;
  try {
    localStorage.setItem(TERMS_ACK_STORAGE_KEY, JSON.stringify({
      accepted: true,
      version: TERMS_ACK_VERSION,
      acceptedAt: new Date().toISOString(),
    }));
  } catch {
    // If storage is blocked, the modal can still close for the current session.
  }
  if (typeof termsDialog?.close === "function" && termsDialog.open) {
    termsDialog.close();
  } else {
    termsDialog?.removeAttribute("open");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  openAmountDialog();
});
form.addEventListener("change", (event) => {
  updateFavoriteToggle();
  if (event.target === targetNetwork) return;
  renderNetworkGroups();
  renderCoinRows();
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
});
form.addEventListener("input", (event) => {
  if (event.target === bundleAmount || event.target === coinCount) return;
  renderNetworkGroups();
  renderCoinRows();
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
});
targetNetwork.addEventListener("change", () => {
  marketPulseReady = false;
  renderNetworkGroups();
  renderCoinPreferenceChips();
  updateCoinPreferenceAvailability();
  renderCoinRows();
  refreshMarketPulse();
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
});
bundleAmount.addEventListener("input", () => {
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) renderPrimary(currentBundle);
});
bundleAmount.addEventListener("wheel", () => {
  if (document.activeElement === bundleAmount) bundleAmount.blur();
});
bundleAmount.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  confirmBundleAmount();
});
amountConfirm.addEventListener("click", confirmBundleAmount);
amountCancel.addEventListener("click", closeAmountDialog);
reviewAcknowledge.addEventListener("change", () => {
  reviewConfirm.disabled = !reviewAcknowledge.checked;
});
reviewConfirm.addEventListener("click", confirmViciReview);
reviewCancel.addEventListener("click", closeViciReview);
openSubmittedBundles?.addEventListener("click", openSubmittedBundlesFeed);
submittedBundlesRefresh?.addEventListener("click", () => loadSubmittedBundlesFeed({ showLoading: true }));
submittedBundlesClose?.addEventListener("click", closeSubmittedBundlesFeed);
submittedBundlesDialog?.addEventListener("cancel", closeSubmittedBundlesFeed);
termsDialog?.addEventListener("cancel", (event) => {
  if (!hasAcceptedTerms()) event.preventDefault();
});
termsAcknowledge?.addEventListener("change", () => {
  termsAccept.disabled = !termsAcknowledge.checked;
});
termsAccept?.addEventListener("click", acceptTermsGate);
coinSearch.addEventListener("input", renderCoinRows);
diversityToggle.addEventListener("change", () => {
  coinCount.disabled = !diversityToggle.checked;
  diversitySliderWrap.setAttribute("aria-disabled", String(!diversityToggle.checked));
});
coinCount.addEventListener("input", () => {
  coinCountValue.textContent = `${coinCount.value} coins`;
  renderNetworkGroups();
  renderCoinRows();
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
});

useFavoriteCoin.addEventListener("click", () => {
  if (!currentFavorite?.ticker) return;
  const coinInput = document.querySelector(`input[name="coinPrefs"][value="${currentFavorite.ticker}"]`);
  if (!coinInput || coinInput.disabled) {
    showToast(`${currentFavorite.ticker} is not available on ${getPreferences().network}.`);
    return;
  }
  const isUsing = !!coinInput?.checked;
  if (coinInput) coinInput.checked = !isUsing;
  if (!isUsing) {
    const themeInput = document.querySelector(`input[name="theme"][value="${currentFavorite.theme}"]`);
    if (themeInput) themeInput.checked = true;
    showToast(`${currentFavorite.ticker} added to your preferences.`);
    if (bundleAmount.checkValidity() && !recommendation.hidden) buildBundle({ scroll: false });
  } else {
    showToast(`${currentFavorite.ticker} removed from your preferences.`);
    if (!recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
  }
  updateFavoriteToggle();
});

pulseRefresh?.addEventListener("click", () => {
  pulseRefresh.disabled = true;
  refreshMarketPulse({ preserveSelection: true }).finally(() => {
    pulseRefresh.disabled = false;
  });
});

pulseWindowPrev?.addEventListener("click", () => stepPulseWindow(-1));
pulseWindowNext?.addEventListener("click", () => stepPulseWindow(1));

pulsePrev?.addEventListener("click", () => movePulseCandidate(-1));
pulseNext?.addEventListener("click", () => movePulseCandidate(1));

document.body.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy]");
  const riskButton = event.target.closest("[data-risk]");
  const viciButton = event.target.closest("[data-open-viciswap]");

  if (copyButton) copyPitch(copyButton.dataset.copy);
  if (riskButton) showRisk(riskButton.dataset.risk);
  if (viciButton) {
    event.preventDefault();
    openViciReview(viciButton.dataset.openViciswap, viciButton.href);
  }

  const networkButton = event.target.closest("[data-network-select]");
  if (networkButton) {
    targetNetwork.value = networkButton.dataset.networkSelect;
    targetNetwork.dispatchEvent(new Event("change", { bubbles: true }));
  }
});

document.body.addEventListener("mouseover", (event) => {
  const slice = event.target.closest(".fit-slice");
  if (slice) showFitSliceTooltip(slice);
});

document.body.addEventListener("mouseout", (event) => {
  const slice = event.target.closest(".fit-slice");
  if (slice && !slice.contains(event.relatedTarget)) hideFitSliceTooltip(slice);
});

document.body.addEventListener("focusin", (event) => {
  const slice = event.target.closest(".fit-slice");
  if (slice) showFitSliceTooltip(slice);
});

document.body.addEventListener("focusout", (event) => {
  const slice = event.target.closest(".fit-slice");
  if (slice) hideFitSliceTooltip(slice);
});

window.addEventListener("message", (event) => {
  if (event.source !== window || event.data?.source !== "vici-bundle-assistant") return;
  if (event.data.type === BUILDER_TOKEN_UNIVERSE_MESSAGE) {
    applyTokenUniverse(event.data.tokenUniverse, { announce: true });
  }
});

renderNetworkGroups();
renderCoinPreferenceChips();
updateCoinPreferenceAvailability();
renderCoinRows();
showTermsGate();
refreshMarketPulse({ preserveSelection: false });
refreshViciCoinsFromApi({ announce: false }).catch(() => {
  // If the office API is temporarily offline, the builder keeps using scan/starter support data.
});
setInterval(() => refreshMarketPulse({ preserveSelection: true, silent: true, render: false }), 1000 * 60 * 5);

function showFitSliceTooltip(slice) {
  const wrap = slice.closest(".fit-donut-wrap");
  const tooltip = wrap?.querySelector(".fit-donut-tooltip");
  const text = slice.dataset.fitTooltip;
  if (!tooltip || !text) return;
  wrap.querySelectorAll(".fit-slice.is-active").forEach((activeSlice) => activeSlice.classList.remove("is-active"));
  slice.classList.add("is-active");
  tooltip.textContent = text;
  tooltip.hidden = false;
}

function hideFitSliceTooltip(slice) {
  const wrap = slice.closest(".fit-donut-wrap");
  const tooltip = wrap?.querySelector(".fit-donut-tooltip");
  slice.classList.remove("is-active");
  if (!tooltip || wrap.querySelector(".fit-slice.is-active")) return;
  tooltip.textContent = "";
  tooltip.hidden = true;
}

async function refreshMarketPulse({ preserveSelection = false, silent = false, render = true } = {}) {
  const refreshId = render ? ++marketPulseRefreshSeq : marketPulseRefreshSeq;
  if (!silent) startPulseLoading(pulseLoadingLabel(currentFavorite), { lockControls: !marketPulseReady });
  const { network } = getPreferences();
  const eligibleCandidates = getViciMarketCandidates(network);
  try {
    try {
      if (!eligibleCandidates.length) throw new Error("No market candidates for network");
      const nextFavorites = await getLivePulseDeck(eligibleCandidates, network);
      if (refreshId !== marketPulseRefreshSeq) return;
      if (!render) {
        currentFavorites = mergePulseDeckByTicker(currentFavorites, nextFavorites);
        currentFavorite = currentFavorites.find((candidate) => candidate.ticker === currentFavorite?.ticker) || currentFavorite;
        currentFavoriteIndex = Math.max(0, currentFavorites.findIndex((candidate) => candidate.ticker === currentFavorite?.ticker));
        lastMarketPulseError = "";
        return;
      }
      currentFavorites = nextFavorites;
      lastMarketPulseError = "";
      const selectedTicker = preserveSelection ? currentFavorite?.ticker : "";
      currentFavorite = preserveSelection
        ? currentFavorites.find((candidate) => candidate.ticker === selectedTicker) || currentFavorites[0]
        : currentFavorites[0];
      currentFavoriteIndex = Math.max(0, currentFavorites.findIndex((candidate) => candidate.ticker === currentFavorite.ticker));
      marketPulseReady = true;
    } catch (error) {
      if (refreshId !== marketPulseRefreshSeq) return;
      lastMarketPulseError = error?.message || String(error);
      window.viciMarketPulseLastError = lastMarketPulseError;
      console.warn("Live market pulse unavailable.", error);
      if (!render) return;
      currentFavorites = getFallbackPulseDeckForNetwork(network);
      if (!currentFavorites.length) currentFavorites = getMarketDataUnavailableDeck(network, lastMarketPulseError);
      const selectedTicker = preserveSelection ? currentFavorite?.ticker : "";
      currentFavorite = currentFavorites.find((candidate) => candidate.ticker === selectedTicker) || currentFavorites[0];
      currentFavoriteIndex = Math.max(0, currentFavorites.findIndex((candidate) => candidate.ticker === currentFavorite.ticker));
      marketPulseReady = true;
    }
    if (render) renderMarketPulse(currentFavorite, currentFavorites);
    if (render) renderCoinRows();
    if (render && currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) {
      buildBundle({ scroll: false });
    }
  } finally {
    if (!silent) stopPulseLoading();
  }
}

function mergePulseDeckByTicker(currentDeck = [], nextDeck = []) {
  if (!Array.isArray(currentDeck) || !currentDeck.length) return nextDeck;
  const nextByTicker = new Map((nextDeck || []).map((candidate) => [candidate.ticker, candidate]));
  return currentDeck.map((candidate) => {
    const updated = nextByTicker.get(candidate.ticker);
    if (!updated) return candidate;
    const rank = candidate.rank;
    return {
      ...candidate,
      ...updated,
      rank,
      reason: rewritePulseRankLabel(updated.reason || candidate.reason, rank),
    };
  });
}

async function getLivePulseDeck(eligibleCandidates, network) {
  const errors = [];
  const pulseCandidates = marketPulseCandidates(eligibleCandidates, network);
  if (!pulseCandidates.length) throw new Error(`No ViciSwap-valid market candidates for ${normalizeNetwork(network)}`);
  const loaders = [
    {
      name: "DEX Screener",
      run: () => withTimeout(getDexScreenerPulseDeck(pulseCandidates, network), DEXSCREENER_TIMEOUT_MS, "DEX Screener pulse timed out"),
    },
    {
      name: "CoinGecko stats",
      run: () => withTimeout(getCoinGeckoPulseDeck(pulseCandidates, network), MARKET_PULSE_TIMEOUT_MS, "CoinGecko stats pulse timed out"),
    },
    {
      name: "CoinGecko chart",
      run: () => withTimeout(getCoinGeckoChartPulseDeck(pulseCandidates, network), MARKET_PULSE_TIMEOUT_MS, "CoinGecko chart pulse timed out"),
    },
    {
      name: "ViciSwap scan",
      run: () => getLocalViciPulseDeckWithCharts(pulseCandidates, network),
    },
    {
      name: "Confirmed fallback",
      run: () => getFallbackPulseDeckForNetwork(network),
    },
  ];

  for (const loader of loaders) {
    try {
      const deck = await loader.run();
      if (Array.isArray(deck) && deck.length) {
        const normalizedDeck = normalizePulseDeck(deck, loader.name);
        return enrichPulseDeckWithCatalysts(normalizedDeck, network).catch(() => normalizedDeck);
      }
      throw new Error(`${loader.name} returned no candidates`);
    } catch (error) {
      errors.push(`${loader.name}: ${error?.message || String(error)}`);
    }
  }

  throw new Error(errors.join(" | "));
}

function normalizePulseDeck(deck, sourceName = "") {
  return (deck || [])
    .filter(Boolean)
    .slice(0, MARKET_PULSE_DECK_SIZE)
    .map((candidate, index) => ({
      ...candidate,
      rank: index + 1,
      source: candidate.source || sourceName,
    }));
}

async function enrichPulseDeckWithCatalysts(deck, network) {
  const baseDeck = normalizePulseDeck(deck);
  const candidates = baseDeck
    .filter((candidate) => candidate?.ticker && candidate.ticker !== "--")
    .slice(0, NEWS_CATALYST_LOOKUP_LIMIT);
  if (!candidates.length) return baseDeck;

  const catalystRows = await Promise.allSettled(candidates.map((candidate) => (
    withTimeout(fetchNewsCatalystSignal(candidate, network), NEWS_CATALYST_TIMEOUT_MS, `${candidate.ticker} news timed out`)
  )));
  const catalystByTicker = new Map();
  catalystRows.forEach((row, index) => {
    if (row.status === "fulfilled" && row.value) catalystByTicker.set(candidates[index].ticker, row.value);
  });
  if (!catalystByTicker.size) return baseDeck;

  return baseDeck
    .map((candidate) => {
      const catalyst = catalystByTicker.get(candidate.ticker);
      if (!catalyst) return candidate;
      const currentEdge = candidate.marketEdge || marketEdgeSignal(candidate, candidate, candidate.prices);
      const nextEdge = {
        ...currentEdge,
        label: catalyst.score >= 5 && currentEdge.label === "Neutral data edge" ? "Positive data edge" : currentEdge.label,
        score: roundTo((currentEdge.score || 0) + catalyst.score, 1),
        details: [...(currentEdge.details || []), catalyst.summary].slice(0, 4),
      };
      return {
        ...candidate,
        marketEdge: nextEdge,
        newsCatalyst: catalyst,
        pulseScore: (candidate.pulseScore || 0) + catalyst.score * 0.25,
        reason: appendCatalystNote(candidate.reason, catalyst),
      };
    })
    .sort((a, b) => (b.pulseScore || 0) - (a.pulseScore || 0))
    .slice(0, MARKET_PULSE_DECK_SIZE)
    .map((candidate, index) => ({
      ...candidate,
      rank: index + 1,
      reason: rewritePulseRankLabel(candidate.reason, index + 1),
    }));
}

async function fetchNewsCatalystSignal(candidate, network) {
  const cacheKey = `${normalizeNetwork(network)}:${candidate.ticker}`;
  const cached = newsCatalystCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < NEWS_CATALYST_CACHE_MS) return cached.value;

  const payload = await fetchMarketJson(makeGdeltNewsUrl(candidate, network));
  const articles = Array.isArray(payload?.articles) ? payload.articles : [];
  const relevant = articles
    .filter((article) => article?.title || article?.seendate)
    .slice(0, 8);
  if (!relevant.length) return null;

  const recentCount = relevant.filter((article) => isRecentNewsDate(article.seendate)).length;
  const trustedCount = relevant.filter((article) => isKnownCryptoNewsDomain(article.domain || article.url)).length;
  const titleText = relevant.map((article) => article.title || "").join(" ").toLowerCase();
  const catalystWords = ["launch", "upgrade", "partnership", "integration", "mainnet", "airdrop", "listing", "funding", "proposal", "growth", "record", "surge"];
  const riskWords = ["hack", "exploit", "lawsuit", "probe", "outage", "depeg", "delist", "warning", "SEC".toLowerCase()];
  const positiveHits = catalystWords.filter((word) => titleText.includes(word)).length;
  const riskHits = riskWords.filter((word) => titleText.includes(word)).length;
  const score = clamp(recentCount * 0.8 + trustedCount * 0.6 + positiveHits * 1.2 - riskHits * 1.8, -5, 8);
  if (score <= 0 && !recentCount) return null;
  const topTitle = relevant[0]?.title || `${candidate.ticker} has recent market coverage`;
  const value = {
    source: "GDELT news scan",
    score: roundTo(score, 1),
    articleCount: relevant.length,
    summary: riskHits > 0
      ? `Recent news includes risk words; verify catalyst quality before using it.`
      : `${candidate.ticker} has recent catalyst coverage: ${topTitle.slice(0, 90)}${topTitle.length > 90 ? "..." : ""}`,
    updatedAt: new Date().toISOString(),
  };
  newsCatalystCache.set(cacheKey, { value, cachedAt: Date.now() });
  return value;
}

function makeGdeltNewsUrl(candidate, network) {
  const query = `"${candidate.ticker}" crypto OR "${candidate.name}"`;
  const params = new URLSearchParams({
    query,
    mode: "artlist",
    format: "json",
    maxrecords: "10",
    timespan: "1d",
    sort: "hybridrel",
  });
  return `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
}

function isRecentNewsDate(value) {
  const text = String(value || "");
  if (!text) return false;
  const compact = text.match(/^(\d{4})(\d{2})(\d{2})T?(\d{2})?(\d{2})?/);
  const parsed = compact
    ? new Date(Date.UTC(Number(compact[1]), Number(compact[2]) - 1, Number(compact[3]), Number(compact[4] || 0), Number(compact[5] || 0)))
    : new Date(text);
  return Number.isFinite(parsed.getTime()) && Date.now() - parsed.getTime() < 1000 * 60 * 60 * 36;
}

function isKnownCryptoNewsDomain(domainOrUrl) {
  const text = String(domainOrUrl || "").toLowerCase();
  return ["coindesk", "cointelegraph", "decrypt", "theblock", "blockworks", "coinmarketcap", "beincrypto", "cryptoslate"].some((domain) => text.includes(domain));
}

function appendCatalystNote(reason, catalyst) {
  if (!catalyst?.summary) return reason;
  return `${reason} Catalyst read: ${catalyst.summary}`;
}

function marketPulseCandidates(eligibleCandidates, network = getPreferences().network) {
  return [...(eligibleCandidates || [])]
    .filter((coin) => coin?.ticker && isTickerOnNetwork(coin.ticker, network))
    .sort((a, b) => b.baseScore - a.baseScore)
    .slice(0, MARKET_PULSE_CANDIDATE_LIMIT);
}

async function getCoinGeckoPulseDeck(eligibleCandidates, network) {
  const markets = await fetchCoinGeckoMarketRows(eligibleCandidates);
  updateLatestPrices(markets);
  const favoriteMarkets = selectFavoriteMarkets(markets, MARKET_PULSE_DECK_SIZE);
  if (!favoriteMarkets.length) throw new Error("No CoinGecko candidates ranked");
  const favoriteDeck = favoriteMarkets
    .map((market, index) => {
      const meta = findMarketCandidateById(market.id, network);
      if (!meta) return null;
      return buildPulseCandidate(meta, market, "CoinGecko", index + 1, network);
    })
    .filter(Boolean);
  return Promise.all(favoriteDeck.map(loadPulseChart));
}

async function getCoinGeckoChartPulseDeck(eligibleCandidates, network) {
  const candidates = uniqueCoinGeckoCandidates(eligibleCandidates).slice(0, MARKET_CHART_CANDIDATE_LIMIT);
  const markets = await fetchCoinGeckoChartRows(candidates);
  updateLatestPrices(markets);
  const favoriteMarkets = selectFavoriteMarkets(markets, MARKET_PULSE_DECK_SIZE);
  if (!favoriteMarkets.length) throw new Error("No CoinGecko chart candidates ranked");
  return favoriteMarkets
    .map((market, index) => {
      const meta = findMarketCandidateById(market.id, network);
      if (!meta) return null;
      return buildPulseCandidate(meta, market, "CoinGecko chart", index + 1, network);
    })
    .filter(Boolean);
}

async function getDexScreenerPulseDeck(eligibleCandidates, network) {
  const markets = await fetchDexScreenerMarketRows(eligibleCandidates, network);
  updateLatestPricesFromDexScreener(markets);
  const favoriteMarkets = selectFavoriteMarkets(markets, MARKET_PULSE_DECK_SIZE * 2);
  if (!favoriteMarkets.length) throw new Error("No DEX Screener candidates ranked");
  const favoriteDeck = favoriteMarkets
    .map((market, index) => {
      const meta = findMarketCandidateForMarket(market, network);
      if (!meta) return null;
      return buildDexScreenerPulseCandidate(meta, market, network, index + 1);
    })
    .filter(Boolean);
  return loadPulseChartsAndRerank(favoriteDeck, MARKET_PULSE_DECK_SIZE);
}

async function getViciSwapScanPulseDeck(eligibleCandidates, network) {
  return getLocalViciPulseDeck(eligibleCandidates, network);
}

function getLocalViciPulseDeck(eligibleCandidates, network, { updateSignals = true } = {}) {
  const networkTokens = getScannedTokensForNetwork(network);
  if (!networkTokens.length) throw new Error("No ViciSwap scan rows for network");
  const scanByTicker = new Map(networkTokens.map((token) => [normalizeTicker(token.ticker), token]));
  const scored = eligibleCandidates
    .map((meta) => {
      const scannedToken = scanByTicker.get(normalizeTicker(meta.ticker));
      if (!scannedToken) return null;
      const change = extractViciSwapPercent(scannedToken.text);
      const usableChange = Number.isFinite(change) ? change : 0;
      const score = meta.baseScore + clamp(usableChange, -10, 20) * 2.1 + (Number.isFinite(change) ? 8 : 0);
      return { meta, scannedToken, change: usableChange, hasChange: Number.isFinite(change), score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, MARKET_PULSE_DECK_SIZE);

  if (!scored.length) throw new Error("No ViciSwap scan candidates ranked");
  if (updateSignals) updateLatestSignalsFromViciSwapScan(scored);
  return scored.map((item, index) => buildViciSwapPulseCandidate(item.meta, item.scannedToken, item.change, item.hasChange, network, index + 1));
}

async function getLocalViciPulseDeckWithCharts(eligibleCandidates, network, options = {}) {
  const deck = getLocalViciPulseDeck(eligibleCandidates, network, options);
  return Promise.all(deck.map((candidate) => (
    withTimeout(loadPulseChart(candidate), 6000, "ViciSwap scan chart timed out").catch(() => candidate)
  )));
}

function updateLatestSignalsFromViciSwapScan(scoredMarkets) {
  const nextSignals = new Map(latestMarketSignals);
  scoredMarkets.forEach(({ meta, change, hasChange }) => {
    nextSignals.set(meta.ticker, buildViciSwapScanSignal(meta, change, hasChange));
  });
  latestMarketSignals = nextSignals;
  pricesUpdatedAt = new Date();
}

function buildViciSwapScanSignal(meta, change, hasChange) {
  return {
    ticker: meta.ticker,
    id: meta.id,
    price: null,
    marketCapRank: null,
    marketCap: null,
    volume24h: null,
    change24h: hasChange ? change : 0,
    change7d: 0,
    change30d: 0,
    updatedAt: scannedViciTokenUniverse?.scannedAt || new Date().toISOString(),
    trendReturn: hasChange ? change : 0,
    volatility: Math.min(0.12, Math.max(0.025, Math.abs(change) / 350)),
    drawdown: change < 0 ? Math.min(0.2, Math.abs(change) / 100) : 0,
    consistency: change >= 0 ? 0.62 : 0.38,
  };
}

function extractViciSwapPercent(text) {
  const match = String(text || "").match(/([+-]?\d+(?:\.\d+)?)\s*%/);
  return match ? Number(match[1]) : Number.NaN;
}

function scanPulsePrices(change, hasChange) {
  const points = 28;
  const boundedChange = hasChange ? clamp(change, -35, 35) : 0;
  const end = 100 * (1 + boundedChange / 100);
  return Array.from({ length: points }, (_, index) => {
    const progress = index / (points - 1);
    const ease = progress * progress * (3 - 2 * progress);
    const wave = Math.sin(progress * Math.PI * 3) * Math.min(2.8, Math.abs(boundedChange) / 7);
    return 100 + (end - 100) * ease + wave;
  });
}

function buildViciSwapPulseCandidate(meta, scannedToken, change, hasChange, network, rank = 1) {
  const source = scannedToken.scanned ? "ViciSwap scan" : "ViciSwap list";
  return {
    id: meta.id,
    rank,
    ticker: meta.ticker,
    name: meta.name,
    theme: meta.theme,
    network: normalizeNetwork(network),
    metaReason: meta.reason,
    change24h: hasChange ? change : 0,
    prices: scanPulsePrices(change, hasChange),
    reason: buildViciSwapFavoriteReason(meta, scannedToken, change, hasChange, network, rank),
    source,
    chartSource: hasChange ? "Receive-list signal line" : "Confirmed Receive token",
    updatedAt: scannedViciTokenUniverse?.scannedAt || new Date().toISOString(),
  };
}

function buildViciSwapFavoriteReason(meta, scannedToken, change, hasChange, network, rank = 1) {
  const rankLabel = rank === 1 ? "current favorite" : `#${rank} market favorite`;
  const signalText = hasChange
    ? `ViciSwap's Receive list is showing ${formatPercent(change)} on the row we scanned`
    : scannedToken.scanned
      ? "ViciSwap's Receive list confirmed this token on the selected network"
      : "the confirmed ViciSwap token map lists this token on the selected network";
  const source = scannedToken.scanned ? "ViciSwap scan" : "confirmed ViciSwap list";
  return `${meta.ticker} is the ${rankLabel} from the ${source}: ${signalText}. It is filtered to ${normalizeNetwork(network)} and avoids unsupported cross-network picks. ${meta.reason}`;
}

async function getBinancePulseDeck(eligibleCandidates, network) {
  const tickerRows = await fetchBinanceTickerRows();
  const tickerBySymbol = new Map(tickerRows.map((row) => [row.symbol, row]));
  const scored = eligibleCandidates
    .map((meta) => {
      const marketSymbol = binanceMarketSymbols[meta.ticker];
      const ticker = tickerBySymbol.get(marketSymbol);
      if (!ticker) return null;
      const price = finiteOrNull(ticker.lastPrice);
      const change = binanceTickerChange(ticker);
      const volume = finiteOrNull(ticker.quoteVolume);
      if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(change)) return null;
      const volumeScore = Math.log10(Math.max(volume || 1, 1));
      const momentum = Math.max(-8, Math.min(change, 18));
      return {
        meta,
        ticker,
        marketSymbol,
        score: meta.baseScore + momentum * 2.2 + volumeScore * 1.7,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!scored.length) throw new Error("No Binance-backed candidates ranked");
  updateLatestPricesFromBinance(scored.map((item) => item));
  const deck = scored.map((item, index) => buildBinancePulseCandidate(item.meta, item.ticker, item.marketSymbol, network, index + 1));
  return Promise.all(deck.map(loadPulseChart));
}

async function getCoinbasePulseDeck(eligibleCandidates, network) {
  const statResults = await Promise.allSettled(
    eligibleCandidates
      .filter((meta) => coinbaseMarketProducts[meta.ticker])
      .map(async (meta) => {
        const productId = coinbaseMarketProducts[meta.ticker];
        const stats = await fetchCoinbaseStats(productId);
        return { meta, productId, stats };
      }),
  );

  const scored = statResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => {
      const item = result.value;
      const price = finiteOrNull(item.stats.last);
      const change = coinbaseStatsChange(item.stats);
      const volume = coinbaseQuoteVolume(item.stats);
      if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(change)) return null;
      const volumeScore = Math.log10(Math.max(volume || 1, 1));
      const momentum = Math.max(-8, Math.min(change, 18));
      return {
        ...item,
        score: item.meta.baseScore + momentum * 2.25 + volumeScore * 1.8,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!scored.length) throw new Error("No Coinbase-backed candidates ranked");
  updateLatestPricesFromCoinbase(scored);
  const deck = scored.map((item, index) => buildCoinbasePulseCandidate(item.meta, item.stats, item.productId, network, index + 1));
  return Promise.all(deck.map(loadPulseChart));
}

async function getCryptoComparePulseDeck(eligibleCandidates, network) {
  const marketRows = await fetchCryptoCompareMarketRows(eligibleCandidates);
  const scored = eligibleCandidates
    .map((meta) => {
      const symbol = cryptoCompareSymbols[meta.ticker];
      const market = symbol ? marketRows.get(symbol) : null;
      if (!market) return null;
      const price = finiteOrNull(market.PRICE);
      const change = finiteOrNull(market.CHANGEPCT24HOUR) ?? cryptoCompareChange(market);
      const volume = finiteOrNull(market.VOLUME24HOURTO);
      if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(change)) return null;
      const volumeScore = Math.log10(Math.max(volume || 1, 1));
      const momentum = Math.max(-8, Math.min(change, 18));
      return {
        meta,
        symbol,
        market,
        score: meta.baseScore + momentum * 2.3 + volumeScore * 1.8,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!scored.length) throw new Error("No CryptoCompare-backed candidates ranked");
  updateLatestPricesFromCryptoCompare(scored);
  const deck = scored.map((item, index) => buildCryptoComparePulseCandidate(item.meta, item.market, item.symbol, network, index + 1));
  return Promise.all(deck.map(loadPulseChart));
}

function makeCoinGeckoMarketsUrl(ids) {
  const params = new URLSearchParams({
    vs_currency: "usd",
    ids,
    order: "market_cap_desc",
    per_page: "250",
    page: "1",
    sparkline: "true",
    price_change_percentage: "24h,7d,30d",
    precision: "full",
  });
  return `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`;
}

function makeCoinGeckoSimplePriceUrl(ids) {
  const params = new URLSearchParams({
    ids,
    vs_currencies: "usd",
    include_market_cap: "true",
    include_24hr_vol: "true",
    include_24hr_change: "true",
    include_last_updated_at: "true",
    precision: "full",
  });
  return `https://api.coingecko.com/api/v3/simple/price?${params.toString()}`;
}

async function fetchCoinGeckoMarketRows(eligibleCandidates) {
  const candidates = uniqueCoinGeckoCandidates(eligibleCandidates);
  const ids = candidates.map((coin) => coin.id).join(",");
  if (!ids) throw new Error("No CoinGecko ids for network");

  return firstNonEmptyMarketRows([
    withTimeout(
      fetchMarketJson(makeCoinGeckoMarketsUrl(ids)).then((markets) => (Array.isArray(markets) ? markets : [])),
      MARKET_STATS_TIMEOUT_MS,
      "CoinGecko markets timed out",
    ),
    withTimeout(
      fetchCoinGeckoSimpleRows(candidates),
      MARKET_SIMPLE_TIMEOUT_MS,
      "CoinGecko simple price timed out",
    ),
  ]);
}

function uniqueCoinGeckoCandidates(candidates) {
  return [...new Map((candidates || [])
    .filter((coin) => coin?.id)
    .map((coin) => [coin.id, coin])).values()];
}

function firstNonEmptyMarketRows(loaders) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let pending = loaders.length;
    loaders.forEach((loader) => {
      loader
        .then((rows) => {
          if (Array.isArray(rows) && rows.length) {
            resolve(rows);
            return;
          }
          throw new Error("CoinGecko source returned no rows");
        })
        .catch((error) => {
          errors.push(error?.message || String(error));
          pending -= 1;
          if (pending === 0) {
            reject(new Error(`CoinGecko stats unavailable: ${errors.filter(Boolean).join(" | ")}`));
          }
        });
    });
  });
}

async function fetchCoinGeckoSimpleRows(candidates) {
  const ids = candidates.map((coin) => coin.id).join(",");
  if (!ids) return [];
  const payload = await fetchMarketJson(makeCoinGeckoSimplePriceUrl(ids));
  return candidates
    .map((meta) => {
      const row = payload?.[meta.id];
      const price = finiteOrNull(row?.usd);
      if (!Number.isFinite(price) || price <= 0) return null;
      const updatedAt = finiteOrNull(row?.last_updated_at);
      return {
        id: meta.id,
        current_price: price,
        market_cap: finiteOrNull(row?.usd_market_cap),
        market_cap_rank: null,
        total_volume: finiteOrNull(row?.usd_24h_vol),
        price_change_percentage_24h: finiteOrNull(row?.usd_24h_change),
        price_change_percentage_24h_in_currency: finiteOrNull(row?.usd_24h_change),
        sparkline_in_7d: { price: [] },
        last_updated: updatedAt ? new Date(updatedAt * 1000).toISOString() : new Date().toISOString(),
      };
    })
    .filter(Boolean);
}

async function fetchCoinGeckoChartRows(candidates) {
  const results = await Promise.allSettled(candidates.map((meta) => (
    withTimeout(
      fetchCoinGeckoChartRow(meta),
      MARKET_CHART_TIMEOUT_MS,
      `${meta.ticker} CoinGecko chart timed out`,
    )
  )));
  return results
    .filter((result) => result.status === "fulfilled" && result.value)
    .map((result) => result.value);
}

async function fetchCoinGeckoChartRow(meta) {
  const chartData = await fetchBackendCoinGeckoChart(meta.id)
    .catch(() => fetchDirectCoinGeckoChart(meta.id));
  const prices = normalizePriceSeries(chartData.prices);
  if (prices.length < 2) return null;
  const currentPrice = prices.at(-1);
  const change24h = percentChangeFromPrices(prices);
  const updatedAt = chartData.updatedAt || new Date().toISOString();
  const volumeSeries = normalizePriceSeries(chartData.totalVolumes || []);
  const marketCapSeries = normalizePriceSeries(chartData.marketCaps || []);
  pulseChartCache.set(meta.id, { prices, cachedAt: Date.now(), updatedAt, stale: chartData.stale });
  return {
    id: meta.id,
    current_price: currentPrice,
    market_cap: marketCapSeries.at(-1) || null,
    market_cap_rank: null,
    total_volume: volumeSeries.at(-1) || null,
    price_change_percentage_24h: change24h,
    price_change_percentage_24h_in_currency: change24h,
    sparkline_in_7d: { price: prices },
    is24hChart: true,
    isStaleChart: Boolean(chartData.stale),
    last_updated: updatedAt,
  };
}

async function fetchBackendCoinGeckoChart(coinGeckoId) {
  const payload = await fetchJsonUrl(`/api/v1/coingecko-chart?id=${encodeURIComponent(coinGeckoId)}`);
  const prices = normalizePriceSeries(payload.prices);
  if (prices.length < 2) throw new Error("Backend CoinGecko chart empty");
  return {
    prices,
    totalVolumes: normalizePriceSeries(payload.totalVolumes),
    marketCaps: normalizePriceSeries(payload.marketCaps),
    updatedAt: payload.updatedAt || new Date().toISOString(),
    stale: Boolean(payload.stale),
    cacheStatus: payload.cacheStatus || "",
  };
}

async function fetchDirectCoinGeckoChart(coinGeckoId) {
  const chartUrl = `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/market_chart?vs_currency=usd&days=1`;
  const chart = await fetchMarketJson(chartUrl);
  const priceRows = Array.isArray(chart.prices) ? chart.prices : [];
  const prices = normalizePriceSeries(priceRows.map(([, price]) => price));
  if (prices.length < 2) throw new Error("CoinGecko chart data empty");
  return {
    prices,
    totalVolumes: normalizePriceSeries((chart.total_volumes || []).map(([, volume]) => volume)),
    marketCaps: normalizePriceSeries((chart.market_caps || []).map(([, cap]) => cap)),
    updatedAt: timestampFromCoinGeckoPriceRows(priceRows) || new Date().toISOString(),
    stale: false,
    cacheStatus: "direct",
  };
}

async function fetchDexScreenerMarketRows(eligibleCandidates, network) {
  const chainId = dexScreenerChainIds[normalizeNetwork(network)];
  if (!chainId) throw new Error("No DEX Screener chain id for network");
  const rows = [];
  const seen = new Set();
  for (let start = 0; start < eligibleCandidates.length; start += MARKET_PULSE_LOOKUP_BATCH_SIZE) {
    const batch = eligibleCandidates.slice(start, start + MARKET_PULSE_LOOKUP_BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map((meta) => (
        withTimeout(
          fetchDexScreenerMarketRow(meta, network, chainId),
          DEXSCREENER_ROW_TIMEOUT_MS,
          `${meta.ticker} DEX Screener lookup timed out`,
        )
      )),
    );
    results.forEach((result) => {
      if (result.status !== "fulfilled" || !result.value) return;
      const key = `${result.value.chainId || chainId}:${result.value.ticker || result.value.id || result.value.pairUrl}`;
      if (seen.has(key)) return;
      seen.add(key);
      rows.push(result.value);
    });
    if (rows.length >= MARKET_PULSE_MIN_MARKET_ROWS) break;
  }
  return rows;
}

async function fetchDexScreenerMarketRow(meta, network, chainId) {
  const address = tokenAddressForNetwork(meta.ticker, network);
  const cacheKey = `${chainId}:${meta.ticker}:${address || "search"}`;
  const cached = dexScreenerStatsCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < DEXSCREENER_STATS_CACHE_MS) {
    return cached.row;
  }

  const payload = address
    ? await fetchDexScreenerJson(`https://api.dexscreener.com/token-pairs/v1/${encodeURIComponent(chainId)}/${encodeURIComponent(address)}`)
    : await fetchDexScreenerJson(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(meta.ticker)}`);
  const pairs = Array.isArray(payload) ? payload : Array.isArray(payload?.pairs) ? payload.pairs : [];
  const pair = selectDexScreenerPair(pairs, meta, chainId, address);
  if (!pair) throw new Error(`No DEX Screener pair for ${meta.ticker} on ${chainId}`);
  const row = buildDexScreenerMarketRow(meta, pair, network);
  dexScreenerStatsCache.set(cacheKey, { row, cachedAt: Date.now() });
  return row;
}

function tokenAddressForNetwork(ticker, network) {
  const normalizedTicker = normalizeTicker(ticker);
  const normalizedNetwork = normalizeNetwork(network);
  const apiToken = getTokenUniverseNetwork(apiViciTokenUniverse, normalizedNetwork)
    ?.tokens?.find((token) => normalizeTicker(token.ticker) === normalizedTicker);
  const scannedToken = getTokenUniverseNetwork(scannedViciTokenUniverse, normalizedNetwork)
    ?.tokens?.find((token) => normalizeTicker(token.ticker) === normalizedTicker);
  const token = apiToken || scannedToken;
  return normalizeContractAddress(token?.address || token?.addresses?.[normalizedNetwork]);
}

function selectDexScreenerPair(pairs, meta, chainId, address = "") {
  const aliases = dexScreenerAliasesForTicker(meta.ticker);
  const normalizedAddress = normalizeContractAddress(address);
  return (pairs || [])
    .filter((pair) => normalizeDexChainId(pair.chainId) === chainId)
    .filter((pair) => {
      const baseSymbol = normalizeTicker(pair.baseToken?.symbol);
      const baseAddress = normalizeContractAddress(pair.baseToken?.address);
      if (normalizedAddress) return baseAddress === normalizedAddress;
      return aliases.includes(baseSymbol);
    })
    .filter((pair) => Number.isFinite(finiteOrNull(pair.priceUsd)) && finiteOrNull(pair.priceUsd) > 0)
    .sort((a, b) => dexScreenerPairScore(b) - dexScreenerPairScore(a))[0] || null;
}

function dexScreenerAliasesForTicker(ticker) {
  const normalized = normalizeTicker(ticker);
  const aliases = {
    ETH: ["ETH", "WETH"],
    WETH: ["WETH", "ETH"],
    BTC: ["BTC", "WBTC", "CBBTC"],
    WBTC: ["WBTC", "BTC"],
    CBBTC: ["CBBTC", "BTC"],
    CBETH: ["CBETH", "ETH"],
    EZETH: ["EZETH", "WETH", "ETH"],
    POL: ["POL", "MATIC"],
    MATIC: ["MATIC", "POL"],
    USDC: ["USDC", "USDBC", "USDC.E"],
  };
  return [...new Set([normalized, ...(aliases[normalized] || [])])];
}

function normalizeDexChainId(chainId) {
  const normalized = String(chainId || "").trim().toLowerCase();
  if (normalized === "matic" || normalized === "polygon-pos") return "polygon";
  if (normalized === "arbitrum-one") return "arbitrum";
  if (normalized === "optimistic-ethereum" || normalized === "optimism-mainnet") return "optimism";
  return normalized;
}

function dexScreenerPairScore(pair) {
  const liquidity = finiteOrNull(pair.liquidity?.usd) || 0;
  const volume = finiteOrNull(pair.volume?.h24) || 0;
  const txns = (finiteOrNull(pair.txns?.h24?.buys) || 0) + (finiteOrNull(pair.txns?.h24?.sells) || 0);
  return Math.log10(Math.max(liquidity, 1)) * 12
    + Math.log10(Math.max(volume, 1)) * 8
    + Math.log10(Math.max(txns, 1)) * 4;
}

function buildDexScreenerMarketRow(meta, pair, network) {
  const change24h = finiteOrNull(pair.priceChange?.h24) ?? 0;
  const prices = scanPulsePrices(change24h, true);
  const changeWindows = {
    "24h": change24h,
    "6h": finiteOrNull(pair.priceChange?.h6),
    "1h": finiteOrNull(pair.priceChange?.h1),
    "5m": finiteOrNull(pair.priceChange?.m5),
  };
  changeWindows["12h"] = interpolateWindowChange(changeWindows["6h"], changeWindows["24h"], 6 / 18);
  changeWindows["3h"] = interpolateWindowChange(changeWindows["1h"], changeWindows["6h"], 2 / 5);
  changeWindows["30m"] = interpolateWindowChange(changeWindows["5m"], changeWindows["1h"], 25 / 55);
  changeWindows["15m"] = interpolateWindowChange(changeWindows["5m"], changeWindows["1h"], 10 / 55);
  return {
    id: meta.id,
    ticker: meta.ticker,
    current_price: finiteOrNull(pair.priceUsd),
    market_cap: finiteOrNull(pair.marketCap ?? pair.fdv),
    market_cap_rank: null,
    total_volume: finiteOrNull(pair.volume?.h24),
    price_change_percentage_24h: change24h,
    price_change_percentage_24h_in_currency: change24h,
    changeWindows,
    price_change_percentage_7d_in_currency: null,
    price_change_percentage_30d_in_currency: null,
    sparkline_in_7d: { price: prices },
    isDexScreener: true,
    last_updated: new Date().toISOString(),
    chainId: normalizeDexChainId(pair.chainId) || dexScreenerChainIds[normalizeNetwork(network)],
    dexId: pair.dexId || "",
    pairAddress: pair.pairAddress || "",
    pairUrl: pair.url || "",
    tokenAddress: normalizeContractAddress(pair.baseToken?.address),
    liquidityUsd: finiteOrNull(pair.liquidity?.usd),
    txns24h: (finiteOrNull(pair.txns?.h24?.buys) || 0) + (finiteOrNull(pair.txns?.h24?.sells) || 0),
    ...chartStatsForSeries(prices),
  };
}

async function fetchMarketJson(url) {
  if (!isAllowedMarketUrl(url)) throw new Error("Unsupported market data URL");
  return firstSuccessfulMarketJson([
    fetchJsonUrl(url),
    fetchMarketJsonViaAssistant(url),
    wait(900).then(() => fetchMarketJsonViaProxy(url)),
  ]);
}

function withTimeout(promise, ms, message) {
  let timer = null;
  const timeout = new Promise((_, reject) => {
    timer = window.setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timer));
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function firstSuccessfulMarketJson(loaders) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let pending = loaders.length;
    loaders.forEach((loader) => {
      loader
        .then(resolve)
        .catch((error) => {
          errors.push(error?.message || String(error));
          pending -= 1;
          if (pending === 0) {
            reject(new Error(`Market data unavailable: ${errors.filter(Boolean).join(" | ")}`));
          }
        });
    });
  });
}

async function fetchJsonUrl(url) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Market data unavailable: ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
}

function fetchMarketJsonViaAssistant(url) {
  return new Promise((resolve, reject) => {
    const requestId = `market-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const timer = window.setTimeout(() => {
      window.removeEventListener("message", onMessage);
      reject(new Error("Assistant market bridge timed out"));
    }, MARKET_BRIDGE_TIMEOUT_MS);

    function onMessage(event) {
      if (event.source !== window || event.data?.source !== "vici-bundle-assistant") return;
      if (event.data.type !== MARKET_RESPONSE_MESSAGE || event.data.requestId !== requestId) return;
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      if (event.data.ok) resolve(event.data.json);
      else reject(new Error(event.data.error || "Assistant market bridge failed"));
    }

    window.addEventListener("message", onMessage);
    window.postMessage({
      source: "vici-bundle-builder",
      type: MARKET_REQUEST_MESSAGE,
      requestId,
      url,
    }, "*");
  });
}

async function fetchMarketJsonViaProxy(url) {
  let lastError = null;
  for (const proxyUrl of marketProxyUrls(url)) {
    try {
      return await fetchJsonUrl(proxyUrl);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Market proxy failed");
}

async function fetchBinanceTickerRows() {
  if (binanceTickerCache && Date.now() - binanceTickerCache.cachedAt < BINANCE_TICKER_CACHE_MS) {
    return binanceTickerCache.rows;
  }

  const rows = await fetchBinanceJson("https://api.binance.com/api/v3/ticker/24hr?type=FULL");
  const normalizedRows = Array.isArray(rows) ? rows : [rows];
  binanceTickerCache = { rows: normalizedRows, cachedAt: Date.now() };
  return normalizedRows;
}

async function fetchCoinbaseStats(productId) {
  const cached = coinbaseStatsCache.get(productId);
  if (cached && Date.now() - cached.cachedAt < COINBASE_STATS_CACHE_MS) {
    return cached.stats;
  }

  const stats = await fetchCoinbaseJson(`https://api.exchange.coinbase.com/products/${encodeURIComponent(productId)}/stats`);
  coinbaseStatsCache.set(productId, { stats, cachedAt: Date.now() });
  return stats;
}

async function fetchCryptoCompareMarketRows(eligibleCandidates) {
  if (cryptoCompareStatsCache && Date.now() - cryptoCompareStatsCache.cachedAt < CRYPTOCOMPARE_STATS_CACHE_MS) {
    return cryptoCompareStatsCache.rows;
  }

  const symbols = [...new Set(eligibleCandidates.map((meta) => cryptoCompareSymbols[meta.ticker]).filter(Boolean))];
  if (!symbols.length) throw new Error("No CryptoCompare symbols for network");
  const params = new URLSearchParams({
    fsyms: symbols.join(","),
    tsyms: "USD",
  });
  const payload = await fetchCryptoCompareJson(`https://min-api.cryptocompare.com/data/pricemultifull?${params.toString()}`);
  const rows = new Map();
  Object.entries(payload?.RAW || {}).forEach(([symbol, quotes]) => {
    if (quotes?.USD) rows.set(symbol, quotes.USD);
  });
  if (!rows.size) throw new Error("CryptoCompare returned no usable USD quotes");
  cryptoCompareStatsCache = { rows, cachedAt: Date.now() };
  return rows;
}

async function fetchBinanceJson(url) {
  if (!isAllowedBinanceUrl(url)) throw new Error("Unsupported Binance market URL");
  const errors = [];
  const attempts = [
    () => fetchJsonUrl(url),
    () => fetchMarketJsonViaAssistant(url),
    () => fetchMarketJsonViaProxy(url),
  ];

  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (error) {
      errors.push(error?.message || String(error));
    }
  }
  throw new Error(`Binance market data unavailable: ${errors.filter(Boolean).join(" | ")}`);
}

async function fetchCoinbaseJson(url) {
  if (!isAllowedCoinbaseUrl(url)) throw new Error("Unsupported Coinbase market URL");
  const errors = [];
  const attempts = [
    () => fetchJsonUrl(url),
    () => fetchMarketJsonViaAssistant(url),
    () => fetchMarketJsonViaProxy(url),
  ];

  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (error) {
      errors.push(error?.message || String(error));
    }
  }
  throw new Error(`Coinbase market data unavailable: ${errors.filter(Boolean).join(" | ")}`);
}

async function fetchCryptoCompareJson(url) {
  if (!isAllowedCryptoCompareUrl(url)) throw new Error("Unsupported CryptoCompare market URL");
  const errors = [];
  const attempts = [
    () => fetchJsonUrl(url),
    () => fetchMarketJsonViaAssistant(url),
    () => fetchMarketJsonViaProxy(url),
  ];

  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (error) {
      errors.push(error?.message || String(error));
    }
  }
  throw new Error(`CryptoCompare market data unavailable: ${errors.filter(Boolean).join(" | ")}`);
}

async function fetchDexScreenerJson(url) {
  if (!isAllowedDexScreenerUrl(url)) throw new Error("Unsupported DEX Screener URL");
  try {
    return await firstSuccessfulMarketJson([
      fetchJsonUrl(url),
      fetchMarketJsonViaAssistant(url),
      wait(900).then(() => fetchMarketJsonViaProxy(url)),
    ]);
  } catch (error) {
    throw new Error(`DEX Screener data unavailable: ${error?.message || String(error)}`);
  }
}

function marketProxyUrls(url) {
  const encodedUrl = encodeURIComponent(url);
  return [
    `/api/v1/market-proxy?url=${encodedUrl}`,
    `https://api.allorigins.win/raw?url=${encodedUrl}`,
    `https://corsproxy.io/?${encodedUrl}`,
  ];
}

function isAllowedMarketUrl(url) {
  try {
    const parsed = new URL(url);
    return (
      (parsed.origin === "https://api.coingecko.com" && parsed.pathname.startsWith("/api/v3/"))
      || isAllowedDexScreenerUrl(url)
      || isAllowedViciCoinsApiUrl(url)
      || isAllowedGdeltNewsUrl(url)
    );
  } catch {
    return false;
  }
}

function isAllowedViciCoinsApiUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://office.viciswap.io" && parsed.pathname.startsWith("/vs2/api/coins");
  } catch {
    return false;
  }
}

function isAllowedGdeltNewsUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://api.gdeltproject.org" && parsed.pathname.startsWith("/api/v2/doc/doc");
  } catch {
    return false;
  }
}

function isAllowedBinanceUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://api.binance.com" && parsed.pathname.startsWith("/api/v3/");
  } catch {
    return false;
  }
}

function isAllowedCoinbaseUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://api.exchange.coinbase.com" && parsed.pathname.startsWith("/products/");
  } catch {
    return false;
  }
}

function isAllowedCryptoCompareUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://min-api.cryptocompare.com" && parsed.pathname.startsWith("/data/");
  } catch {
    return false;
  }
}

function isAllowedDexScreenerUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://api.dexscreener.com"
      && (
        parsed.pathname.startsWith("/latest/dex/")
        || parsed.pathname.startsWith("/token-pairs/v1/")
        || parsed.pathname.startsWith("/tokens/v1/")
      );
  } catch {
    return false;
  }
}

function updateLatestPrices(markets) {
  const { network } = getPreferences();
  const nextPrices = new Map(latestPrices);
  const nextSignals = new Map(latestMarketSignals);
  markets.forEach((market) => {
    const meta = findMarketCandidateById(market.id, network);
    const price = Number(market.current_price);
    if (meta && Number.isFinite(price) && price > 0) {
      nextPrices.set(meta.ticker, { price, source: "Live price" });
      nextSignals.set(meta.ticker, buildMarketSignal(meta, market));
    }
  });
  latestPrices = nextPrices;
  latestMarketSignals = nextSignals;
  pricesUpdatedAt = new Date();
}

function updateLatestPricesFromBinance(scoredMarkets) {
  const nextPrices = new Map(latestPrices);
  const nextSignals = new Map(latestMarketSignals);
  scoredMarkets.forEach(({ meta, ticker }) => {
    const price = finiteOrNull(ticker.lastPrice);
    if (!Number.isFinite(price) || price <= 0) return;
    nextPrices.set(meta.ticker, { price, source: `Binance ${ticker.symbol}` });
    nextSignals.set(meta.ticker, buildBinanceMarketSignal(meta, ticker));
  });
  latestPrices = nextPrices;
  latestMarketSignals = nextSignals;
  pricesUpdatedAt = new Date();
}

function updateLatestPricesFromCoinbase(scoredMarkets) {
  const nextPrices = new Map(latestPrices);
  const nextSignals = new Map(latestMarketSignals);
  scoredMarkets.forEach(({ meta, stats, productId }) => {
    const price = finiteOrNull(stats.last);
    if (!Number.isFinite(price) || price <= 0) return;
    nextPrices.set(meta.ticker, { price, source: `Coinbase ${productId}` });
    nextSignals.set(meta.ticker, buildCoinbaseMarketSignal(meta, stats, productId));
  });
  latestPrices = nextPrices;
  latestMarketSignals = nextSignals;
  pricesUpdatedAt = new Date();
}

function updateLatestPricesFromCryptoCompare(scoredMarkets) {
  const nextPrices = new Map(latestPrices);
  const nextSignals = new Map(latestMarketSignals);
  scoredMarkets.forEach(({ meta, market, symbol }) => {
    const price = finiteOrNull(market.PRICE);
    if (!Number.isFinite(price) || price <= 0) return;
    nextPrices.set(meta.ticker, { price, source: `CryptoCompare ${symbol}-USD` });
    nextSignals.set(meta.ticker, buildCryptoCompareMarketSignal(meta, market, symbol));
  });
  latestPrices = nextPrices;
  latestMarketSignals = nextSignals;
  pricesUpdatedAt = new Date();
}

function updateLatestPricesFromDexScreener(markets) {
  const { network } = getPreferences();
  const nextPrices = new Map(latestPrices);
  const nextSignals = new Map(latestMarketSignals);
  markets.forEach((market) => {
    const meta = findMarketCandidateForMarket(market, network);
    const price = finiteOrNull(market.current_price);
    if (meta && Number.isFinite(price) && price > 0) {
      nextPrices.set(meta.ticker, { price, source: "DEX Screener" });
      nextSignals.set(meta.ticker, buildDexScreenerMarketSignal(meta, market));
    }
  });
  latestPrices = nextPrices;
  latestMarketSignals = nextSignals;
  pricesUpdatedAt = new Date();
}

function buildMarketSignal(meta, market) {
  const sparkline = normalizePriceSeries(market.sparkline_in_7d?.price);
  const chartStats = chartStatsForSeries(sparkline);
  return {
    ticker: meta.ticker,
    id: meta.id,
    price: finiteOrNull(market.current_price),
    marketCapRank: finiteOrNull(market.market_cap_rank),
    marketCap: finiteOrNull(market.market_cap),
    volume24h: finiteOrNull(market.total_volume),
    change24h: finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h) || 0,
    change7d: finiteOrNull(market.price_change_percentage_7d_in_currency) || 0,
    change30d: finiteOrNull(market.price_change_percentage_30d_in_currency) || 0,
    updatedAt: market.last_updated || null,
    ...chartStats,
  };
}

function buildBinanceMarketSignal(meta, ticker) {
  return {
    ticker: meta.ticker,
    id: meta.id,
    price: finiteOrNull(ticker.lastPrice),
    marketCapRank: null,
    marketCap: null,
    volume24h: finiteOrNull(ticker.quoteVolume),
    change24h: binanceTickerChange(ticker),
    change7d: 0,
    change30d: 0,
    updatedAt: binanceTimestamp(ticker),
    trendReturn: binanceTickerChange(ticker),
    volatility: 0.04,
    drawdown: 0,
    consistency: binanceTickerChange(ticker) >= 0 ? 0.6 : 0.4,
  };
}

function buildCoinbaseMarketSignal(meta, stats, productId) {
  return {
    ticker: meta.ticker,
    id: meta.id,
    productId,
    price: finiteOrNull(stats.last),
    marketCapRank: null,
    marketCap: null,
    volume24h: coinbaseQuoteVolume(stats),
    change24h: coinbaseStatsChange(stats),
    change7d: 0,
    change30d: 0,
    updatedAt: new Date().toISOString(),
    trendReturn: coinbaseStatsChange(stats),
    volatility: 0.04,
    drawdown: 0,
    consistency: coinbaseStatsChange(stats) >= 0 ? 0.6 : 0.4,
  };
}

function buildCryptoCompareMarketSignal(meta, market, symbol) {
  return {
    ticker: meta.ticker,
    id: meta.id,
    symbol,
    price: finiteOrNull(market.PRICE),
    marketCapRank: null,
    marketCap: finiteOrNull(market.MKTCAP),
    volume24h: finiteOrNull(market.VOLUME24HOURTO),
    change24h: finiteOrNull(market.CHANGEPCT24HOUR) ?? cryptoCompareChange(market),
    change7d: 0,
    change30d: 0,
    updatedAt: cryptoCompareTimestamp(market),
    trendReturn: finiteOrNull(market.CHANGEPCT24HOUR) ?? cryptoCompareChange(market),
    volatility: 0.04,
    drawdown: 0,
    consistency: (finiteOrNull(market.CHANGEPCT24HOUR) ?? 0) >= 0 ? 0.6 : 0.4,
  };
}

function buildDexScreenerMarketSignal(meta, market) {
  return {
    ticker: meta.ticker,
    id: meta.id,
    price: finiteOrNull(market.current_price),
    marketCapRank: null,
    marketCap: finiteOrNull(market.market_cap),
    volume24h: finiteOrNull(market.total_volume),
    change24h: finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h) || 0,
    change7d: 0,
    change30d: 0,
    updatedAt: market.last_updated || new Date().toISOString(),
    trendReturn: finiteOrNull(market.trendReturn) ?? finiteOrNull(market.price_change_percentage_24h) ?? 0,
    volatility: finiteOrNull(market.volatility) ?? 0.04,
    drawdown: finiteOrNull(market.drawdown) ?? 0,
    consistency: finiteOrNull(market.consistency) ?? ((finiteOrNull(market.price_change_percentage_24h) ?? 0) >= 0 ? 0.6 : 0.4),
    liquidityUsd: finiteOrNull(market.liquidityUsd),
    pairAddress: market.pairAddress || "",
  };
}

function binanceTickerChange(ticker) {
  const direct = finiteOrNull(ticker.priceChangePercent);
  if (direct !== null) return direct;
  const open = finiteOrNull(ticker.openPrice);
  const last = finiteOrNull(ticker.lastPrice);
  if (!open || !last) return 0;
  return ((last - open) / open) * 100;
}

function binanceTimestamp(ticker) {
  const closeTime = Number(ticker.closeTime);
  return Number.isFinite(closeTime) && closeTime > 0 ? new Date(closeTime).toISOString() : null;
}

function coinbaseStatsChange(stats) {
  const open = finiteOrNull(stats.open);
  const last = finiteOrNull(stats.last);
  if (!open || !last) return 0;
  return ((last - open) / open) * 100;
}

function coinbaseQuoteVolume(stats) {
  const volume = finiteOrNull(stats.volume);
  const last = finiteOrNull(stats.last);
  return volume && last ? volume * last : null;
}

function cryptoCompareChange(market) {
  const open = finiteOrNull(market.OPEN24HOUR);
  const price = finiteOrNull(market.PRICE);
  if (!open || !price) return 0;
  return ((price - open) / open) * 100;
}

function cryptoCompareTimestamp(market) {
  const timestamp = Number(market.LASTUPDATE);
  return Number.isFinite(timestamp) && timestamp > 0 ? new Date(timestamp * 1000).toISOString() : new Date().toISOString();
}

function getScannedTokensForNetwork(network) {
  const normalized = normalizeNetwork(network);
  const scannedTokens = scannedViciTokenUniverse?.networks
    ?.find((item) => normalizeNetwork(item.network) === normalized)
    ?.tokens || [];
  if (scannedTokens.length) return scannedTokens.map((token) => ({ ...token, scanned: true }));
  return getSupportedTickersForNetwork(normalized).map((ticker) => ({ ticker, text: ticker, scanned: false }));
}

function chartStatsForSeries(series) {
  const prices = normalizePriceSeries(series);
  if (prices.length < 2) {
    return { trendReturn: 0, volatility: 0.04, drawdown: 0, consistency: 0.5 };
  }

  const returns = [];
  let peak = prices[0];
  let maxDrawdown = 0;
  for (let index = 1; index < prices.length; index += 1) {
    const previous = prices[index - 1];
    const current = prices[index];
    returns.push((current - previous) / previous);
    peak = Math.max(peak, current);
    maxDrawdown = Math.max(maxDrawdown, peak ? (peak - current) / peak : 0);
  }

  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const variance = returns.reduce((sum, value) => sum + (value - mean) ** 2, 0) / returns.length;
  const consistency = returns.filter((value) => value >= 0).length / returns.length;
  const trendReturn = ((prices.at(-1) - prices[0]) / prices[0]) * 100;
  return {
    trendReturn: Number.isFinite(trendReturn) ? trendReturn : 0,
    volatility: Math.sqrt(variance || 0),
    drawdown: maxDrawdown,
    consistency,
  };
}

function finiteOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function getFallbackPulseDeckForNetwork(network) {
  const targetSize = MARKET_PULSE_DECK_SIZE;
  const baseDeck = fallbackPulseDeck.filter((candidate) => isTickerOnNetwork(candidate.ticker, network));
  const fillDeck = getViciMarketCandidates(network)
    .filter((candidate) => !baseDeck.some((fallback) => fallback.ticker === candidate.ticker))
    .slice(0, Math.max(0, targetSize - baseDeck.length))
    .map((candidate) => ({
      id: candidate.id,
      rank: 1,
      ticker: candidate.ticker,
      name: candidate.name,
      theme: candidate.theme,
      change24h: 0,
      prices: [],
      reason: `Cached fallback: ${candidate.ticker} is on the confirmed ${normalizeNetwork(network)} candidate list. ${candidate.reason}`,
      source: "Cached",
      chartSource: "No live chart",
      updatedAt: null,
    }));

  const genericDeck = getSupportedTickersForNetwork(network)
    .filter((ticker) => !baseDeck.some((fallback) => fallback.ticker === ticker) && !fillDeck.some((fallback) => fallback.ticker === ticker))
    .slice(0, Math.max(0, targetSize - baseDeck.length - fillDeck.length))
    .map((ticker) => {
      const meta = coinMetaForTicker(ticker);
      return {
        id: null,
        rank: 1,
        ticker,
        name: ticker,
        theme: meta.theme.split("/")[0].trim().toLowerCase(),
        change24h: 0,
        prices: [],
        reason: `${ticker} appears in the latest ${normalizeNetwork(network)} ViciSwap receive-token scan. Live market ranking needs a price mapping before it can score this coin deeply.`,
        source: "Scanned",
        chartSource: "No live chart",
        updatedAt: null,
      };
    });

  return [...baseDeck, ...fillDeck, ...genericDeck].slice(0, targetSize).map((candidate, index) => ({ ...candidate, rank: index + 1 }));
}

function getMarketDataUnavailableDeck(network, errorMessage = "") {
  const normalizedNetwork = normalizeNetwork(network);
  const trimmedError = String(errorMessage || "").replace(/\s+/g, " ").trim();
  const chartSource = trimmedError
    ? `Last error: ${trimmedError.slice(0, 140)}${trimmedError.length > 140 ? "..." : ""}`
    : "No market data";
  return [{
    id: "",
    rank: 1,
    ticker: "--",
    name: "Market data",
    theme: "core",
    network: normalizedNetwork,
    change24h: null,
    prices: [],
    reason: `Live market sources did not return a usable signal for the ${normalizedNetwork} ViciSwap-supported token set. The builder should normally fall back through DEX Screener, CoinGecko, the ViciSwap scan, and confirmed cached candidates before this card appears.`,
    source: "Market data unavailable",
    chartSource,
    updatedAt: null,
  }];
}

function getCoinPriceInfo(ticker) {
  const info = latestPrices.get(ticker);
  return info && Number.isFinite(info.price) && info.price > 0 ? info : null;
}

function selectFavoriteMarkets(markets, limit = 3) {
  const { network } = getPreferences();
  const scored = markets
    .map((market) => {
      const meta = findMarketCandidateForMarket(market, network);
      if (!meta) return null;
      const edge = marketEdgeSignal(meta, market, market.sparkline_in_7d?.price);
      const score = marketConvictionScore(meta, market, market.sparkline_in_7d?.price, edge);
      return { ...market, pulseScore: score, marketEdge: edge };
    })
    .filter(Boolean)
    .sort((a, b) => b.pulseScore - a.pulseScore);
  return scored.slice(0, limit);
}

async function loadPulseChartsAndRerank(deck, limit = 3) {
  const loaded = await Promise.all(deck.map(loadPulseChart));
  return loaded
    .map((candidate) => {
      const edge = marketEdgeSignal(candidate, candidate, candidate.prices);
      return {
        ...candidate,
        pulseScore: marketConvictionScore(candidate, candidate, candidate.prices, edge),
        trajectory: chartTrajectoryLabel(candidate.prices),
        marketEdge: edge,
      };
    })
    .sort((a, b) => b.pulseScore - a.pulseScore)
    .slice(0, limit)
    .map((candidate, index) => {
      const rank = index + 1;
      return {
        ...candidate,
        rank,
        reason: appendMarketEdgeNote(appendTrajectoryNote(rewritePulseRankLabel(candidate.reason, rank), candidate.prices), candidate.marketEdge),
      };
    });
}

function marketConvictionScore(meta, market = {}, prices = [], edge = null) {
  const change24h = finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h ?? market.change24h) ?? 0;
  const change7d = finiteOrNull(market.price_change_percentage_7d_in_currency ?? market.change7d);
  const change30d = finiteOrNull(market.price_change_percentage_30d_in_currency ?? market.change30d);
  const volume24h = finiteOrNull(market.total_volume ?? market.volume24h) || 0;
  const liquidityUsd = finiteOrNull(market.liquidityUsd) || 0;
  const volumeQuality = clamp(Math.log10(Math.max(volume24h, 1)) - 5.4, -2.5, 4.5);
  const liquidityQuality = clamp(Math.log10(Math.max(liquidityUsd, 1)) - 5.3, -2.5, 4.5);
  const multiTimeframe = (
    (Number.isFinite(change7d) ? clamp(change7d, -35, 55) * 0.22 : 0)
    + (Number.isFinite(change30d) ? clamp(change30d, -60, 95) * 0.11 : 0)
  );
  const trajectory = chartTrajectoryScore(prices);
  const pullback = pullbackQualityScore(prices, { volume24h, liquidityUsd });
  const theme = durableThemeScore(meta, { change24h, volume24h, liquidityUsd });
  const speculativePenalty = speculativePulsePenalty(meta, { volume24h, liquidityUsd });
  const edgeScore = finiteOrNull(edge?.score) || 0;
  return meta.baseScore
    + clamp(change24h, -14, 20) * 1.25
    + multiTimeframe
    + volumeQuality * 2.1
    + liquidityQuality * 2.05
    + trajectory * 1.05
    + pullback
    + theme
    + edgeScore * 0.22
    - speculativePenalty;
}

function durableThemeScore(meta, { change24h = 0, volume24h = 0, liquidityUsd = 0 } = {}) {
  const theme = String(meta?.theme || "").toLowerCase();
  const ticker = normalizeTicker(meta?.ticker);
  let score = 0;
  if (theme.includes("base")) score += 3.4;
  if (theme.includes("defi")) score += 2.7;
  if (theme.includes("rwa")) score += 1.8;
  if (theme.includes("ai")) score += 1.2;
  if (theme.includes("core")) score += 1.1;
  if (["AERO", "MORPHO", "VIRTUAL", "ZRO", "CBBTC", "CBETH"].includes(ticker)) score += 1.6;
  if (liquidityUsd >= 5_000_000 && volume24h >= 1_000_000) score += 1.6;
  if (change24h < -4 && score > 0) score *= 0.65;
  return score;
}

function speculativePulsePenalty(meta, { volume24h = 0, liquidityUsd = 0 } = {}) {
  const ticker = normalizeTicker(meta?.ticker);
  const theme = String(meta?.theme || "").toLowerCase();
  const speculative = theme.includes("meme") || ["BRETT", "DEGEN", "TOSHI", "MOG", "ZORA"].includes(ticker);
  if (!speculative) return 0;
  let penalty = 1.5;
  if (liquidityUsd < 1_000_000) penalty += 4;
  if (volume24h < 1_000_000) penalty += 2;
  return penalty;
}

function pullbackQualityScore(prices, { volume24h = 0, liquidityUsd = 0 } = {}) {
  const stats = chartTrajectoryStats(prices);
  if (!stats) return 0;
  if (stats.pullbackFromHigh >= 0.28 && stats.recentReturn < -1) return -5.5;
  if (stats.pullbackFromHigh >= 0.16 && stats.reboundFromLow < 2.5) return -2.5;
  const hasRealDepth = volume24h >= 1_000_000 && liquidityUsd >= 750_000;
  const hasStrongDepth = volume24h >= 3_000_000 && liquidityUsd >= 2_000_000;
  const reboundIsSteep = stats.reboundFromLow >= 4.5 && stats.reboundSlope >= 0.7;
  const reboundIsConstructive = stats.reboundFromLow >= 2.2 && stats.reboundSlope >= 0.28;
  if (stats.pullbackFromHigh >= 0.08 && stats.pullbackFromHigh <= 0.26 && reboundIsSteep && hasStrongDepth) return 5.2;
  if (stats.pullbackFromHigh >= 0.06 && stats.pullbackFromHigh <= 0.22 && reboundIsConstructive && hasRealDepth) return 3.2;
  if (stats.recentReturn >= 1.5 && stats.consistency >= 0.5 && hasRealDepth) return 2.2;
  return 0;
}

function marketEdgeSignal(meta, market = {}, prices = []) {
  const change24h = finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h ?? market.change24h) ?? 0;
  const volume24h = finiteOrNull(market.total_volume ?? market.volume24h) || 0;
  const liquidityUsd = finiteOrNull(market.liquidityUsd) || 0;
  const trajectory = chartTrajectoryStats(prices);
  const themeScore = themeMomentumScore(meta.theme, change24h);
  const liquidityQuality = clamp(Math.log10(Math.max(liquidityUsd, 1)) - 5.2, -2, 4);
  const volumeQuality = clamp(Math.log10(Math.max(volume24h, 1)) - 5.6, -2, 4);
  const trajectoryScore = chartTrajectoryScore(prices);
  const exhaustionPenalty = trajectory?.pullbackFromHigh >= 0.08 && trajectory?.recentReturn < 0
    ? clamp(trajectory.pullbackFromHigh * 55, 0, 8)
    : 0;
  const score = clamp(
    themeScore + liquidityQuality * 1.4 + volumeQuality * 1.2 + trajectoryScore * 0.75 - exhaustionPenalty,
    -12,
    16,
  );
  const label = score >= 8 ? "Strong data edge" : score >= 3 ? "Positive data edge" : score <= -5 ? "Weak data edge" : "Neutral data edge";
  const details = [];
  if (volume24h >= 1_000_000) details.push(`${formatCompactUsd(volume24h)} volume`);
  if (liquidityUsd >= 1_000_000) details.push(`${formatCompactUsd(liquidityUsd)} liquidity`);
  if (trajectory) {
    const trajectoryLabel = chartTrajectoryLabel(prices);
    if (trajectoryLabel?.tone !== "neutral") details.push(trajectoryLabel.text);
  }
  if (themeScore > 1) details.push(`${String(meta.theme || "market").toUpperCase()} narrative has momentum`);
  if (!details.length) details.push("market signal is mixed");
  return {
    label,
    score: roundTo(score, 1),
    details,
  };
}

function themeMomentumScore(theme, change24h) {
  const normalized = String(theme || "").toLowerCase();
  const riskOnThemes = ["base", "ai", "defi", "rwa", "l2"];
  if (riskOnThemes.includes(normalized) && change24h > 6) return 3.5;
  if (riskOnThemes.includes(normalized) && change24h > 2) return 1.75;
  if (normalized === "core" && change24h > 0) return 0.75;
  if (change24h < -6) return -3;
  return 0;
}

function appendMarketEdgeNote(reason, edge) {
  if (!edge || edge.label === "Neutral data edge") return reason;
  const detail = (edge.details || []).find((item) => !/slope|fading|chart|entry/i.test(item));
  return `${reason} Data edge: ${edge.label.toLowerCase()} (${edge.score}).${detail ? ` ${detail}` : ""}`;
}

function appendTrajectoryNote(reason, prices) {
  const label = chartTrajectoryLabel(prices);
  if (!label || label.tone === "neutral") return reason;
  return `${reason} Near-term chart read: ${label.text}`;
}

function rewritePulseRankLabel(reason, rank) {
  const label = rank === 1 ? "the current favorite" : `the #${rank} market favorite`;
  return String(reason || "")
    .replace(/the current favorite/g, label)
    .replace(/the #\d+ market favorite/g, label);
}

function chartTrajectoryLabel(prices) {
  const stats = chartTrajectoryStats(prices);
  if (!stats) return null;
  if (stats.recentReturn <= -2.5 && stats.pullbackFromHigh >= 0.06) {
    return { tone: "bearish", text: "up on 24h, but currently fading from its recent high." };
  }
  if (stats.recentReturn <= -1.25) {
    return { tone: "softening", text: "recent slope is softening, so the entry looks less clean." };
  }
  if (stats.pullbackFromHigh >= 0.08 && stats.reboundFromLow >= 4.5 && stats.reboundSlope >= 0.7) {
    return { tone: "rebound", text: "pullback is being bought with a sharp rebound from the recent low." };
  }
  if (stats.recentReturn >= 1.5 && stats.consistency >= 0.52) {
    return { tone: "constructive", text: "recent slope is still constructive." };
  }
  return { tone: "neutral", text: "recent chart is mixed." };
}

function chartTrajectoryScore(prices) {
  const stats = chartTrajectoryStats(prices);
  if (!stats) return 0;
  const recentSlope = clamp(stats.recentReturn, -8, 8) * 0.45;
  const pullbackPenalty = clamp(stats.pullbackFromHigh * 100, 0, 18) * 0.32;
  const consistency = (stats.consistency - 0.5) * 4;
  return clamp(recentSlope + consistency - pullbackPenalty, -8, 5);
}

function chartTrajectoryStats(prices) {
  const series = normalizePriceSeries(prices);
  if (series.length < 8) return null;
  const recentCount = Math.max(4, Math.round(series.length * 0.22));
  const recent = series.slice(-recentCount);
  const recentStart = recent[0];
  const recentEnd = recent.at(-1);
  if (!recentStart || !recentEnd) return null;
  const recentReturn = ((recentEnd - recentStart) / recentStart) * 100;
  const recentHigh = Math.max(...recent);
  const fullHigh = Math.max(...series);
  const recentLow = Math.min(...recent);
  const pullbackFromHigh = recentEnd && fullHigh ? (fullHigh - recentEnd) / fullHigh : 0;
  const reboundFromLow = recentEnd && recentLow ? ((recentEnd - recentLow) / recentLow) * 100 : 0;
  const reboundIndex = recent.lastIndexOf(recentLow);
  const barsSinceLow = reboundIndex >= 0 ? Math.max(1, recent.length - 1 - reboundIndex) : recent.length;
  const reboundSlope = reboundFromLow / barsSinceLow;
  const returns = [];
  for (let index = 1; index < recent.length; index += 1) {
    returns.push((recent[index] - recent[index - 1]) / recent[index - 1]);
  }
  const consistency = returns.length
    ? returns.filter((value) => value >= 0).length / returns.length
    : 0.5;
  return {
    recentReturn: Number.isFinite(recentReturn) ? recentReturn : 0,
    pullbackFromHigh: Number.isFinite(pullbackFromHigh) ? pullbackFromHigh : 0,
    reboundFromLow: Number.isFinite(reboundFromLow) ? reboundFromLow : 0,
    reboundSlope: Number.isFinite(reboundSlope) ? reboundSlope : 0,
    recentHigh,
    consistency,
  };
}

function normalizePriceSeries(prices) {
  return (prices || [])
    .map(Number)
    .filter((price) => Number.isFinite(price) && price > 0);
}

function lastDayFromSparkline(prices) {
  const series = normalizePriceSeries(prices);
  if (series.length < 2) return [];
  const estimatedDayPoints = series.length >= 72 ? Math.max(2, Math.round(series.length / 7)) : Math.min(series.length, 24);
  return series.slice(-estimatedDayPoints);
}

function buildPulseCandidate(meta, market, source, rank = 1, network = getPreferences().network) {
  const sparklinePrices = market.is24hChart
    ? normalizePriceSeries(market.sparkline_in_7d?.price)
    : lastDayFromSparkline(market.sparkline_in_7d?.price);
  const change24h = finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h) ?? 0;
  return {
    id: meta.id,
    rank,
    pulseScore: finiteOrNull(market.pulseScore) || 0,
    ticker: meta.ticker,
    name: meta.name,
    theme: meta.theme,
    network: normalizeNetwork(network),
    metaReason: meta.reason,
    change24h,
    changeWindows: market.changeWindows || {},
    prices: sparklinePrices,
    reason: buildFavoriteReason(meta, market, rank, source),
    source,
    chartSource: market.is24hChart ? "CoinGecko 24h chart" : sparklinePrices.length ? "CoinGecko sparkline" : "CoinGecko stats",
    updatedAt: market.last_updated || null,
    currentPrice: finiteOrNull(market.current_price),
    volume24h: finiteOrNull(market.total_volume),
  };
}

function buildDexScreenerPulseCandidate(meta, market, network, rank = 1) {
  const change24h = finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h) ?? 0;
  const prices = normalizePriceSeries(market.sparkline_in_7d?.price);
  return {
    id: meta.id,
    rank,
    pulseScore: finiteOrNull(market.pulseScore) || 0,
    ticker: meta.ticker,
    name: meta.name,
    theme: meta.theme,
    network: normalizeNetwork(network),
    metaReason: meta.reason,
    change24h,
    changeWindows: market.changeWindows || {},
    prices,
    reason: buildDexScreenerFavoriteReason(meta, market, network, rank),
    source: "DEX Screener",
    chartSource: "DEX Screener signal line",
    updatedAt: market.last_updated || null,
    currentPrice: finiteOrNull(market.current_price),
    volume24h: finiteOrNull(market.total_volume),
    liquidityUsd: finiteOrNull(market.liquidityUsd),
    pairUrl: market.pairUrl || "",
  };
}

function buildBinancePulseCandidate(meta, ticker, marketSymbol, network, rank = 1) {
  const change24h = binanceTickerChange(ticker);
  return {
    id: meta.id,
    rank,
    ticker: meta.ticker,
    name: meta.name,
    theme: meta.theme,
    change24h,
    prices: [],
    reason: buildBinanceFavoriteReason(meta, ticker, marketSymbol, network, rank),
    source: "Binance",
    chartSource: `${marketSymbol} chart loading`,
    updatedAt: binanceTimestamp(ticker),
    currentPrice: finiteOrNull(ticker.lastPrice),
    volume24h: finiteOrNull(ticker.quoteVolume),
    marketSymbol,
  };
}

function buildCoinbasePulseCandidate(meta, stats, productId, network, rank = 1) {
  const change24h = coinbaseStatsChange(stats);
  return {
    id: meta.id,
    rank,
    ticker: meta.ticker,
    name: meta.name,
    theme: meta.theme,
    change24h,
    prices: [],
    reason: buildCoinbaseFavoriteReason(meta, stats, productId, network, rank),
    source: "Coinbase",
    chartSource: `${productId} chart loading`,
    updatedAt: new Date().toISOString(),
    currentPrice: finiteOrNull(stats.last),
    volume24h: coinbaseQuoteVolume(stats),
    productId,
  };
}

function buildCryptoComparePulseCandidate(meta, market, symbol, network, rank = 1) {
  const change24h = finiteOrNull(market.CHANGEPCT24HOUR) ?? cryptoCompareChange(market);
  return {
    id: meta.id,
    rank,
    ticker: meta.ticker,
    name: meta.name,
    theme: meta.theme,
    change24h,
    prices: [],
    reason: buildCryptoCompareFavoriteReason(meta, market, symbol, network, rank),
    source: "CryptoCompare",
    chartSource: `${symbol}-USD chart loading`,
    updatedAt: cryptoCompareTimestamp(market),
    currentPrice: finiteOrNull(market.PRICE),
    volume24h: finiteOrNull(market.VOLUME24HOURTO),
    cryptoCompareSymbol: symbol,
  };
}

function buildCryptoCompareFavoriteReason(meta, market, symbol, network, rank = 1) {
  const change = finiteOrNull(market.CHANGEPCT24HOUR) ?? cryptoCompareChange(market);
  const volume = finiteOrNull(market.VOLUME24HOURTO);
  const rankLabel = rank === 1 ? "current favorite" : `#${rank} market favorite`;
  const volumeText = volume ? `${formatCompactUsd(volume)} 24h volume` : "volume still refreshing";
  const proxyText = symbol === meta.ticker ? `${symbol}-USD` : `${symbol}-USD market proxy`;
  return `${meta.ticker} is the ${rankLabel} from live CryptoCompare data: 24h ${formatPercent(change)}, ${volumeText}, using ${proxyText}. It is still filtered to the ${normalizeNetwork(network)} ViciSwap receive list. ${meta.reason}`;
}

function buildDexScreenerFavoriteReason(meta, market, network, rank = 1) {
  const change = finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h) ?? 0;
  const volume = finiteOrNull(market.total_volume);
  const liquidity = finiteOrNull(market.liquidityUsd);
  const rankLabel = rank === 1 ? "current favorite" : `#${rank} market favorite`;
  const volumeText = volume ? `${formatCompactUsd(volume)} 24h volume` : "volume still refreshing";
  const liquidityText = liquidity ? `${formatCompactUsd(liquidity)} liquidity` : "liquidity still refreshing";
  return `${meta.ticker} is the ${rankLabel} from DEX Screener: 24h ${formatPercent(change)}, ${volumeText}, ${liquidityText}. It is filtered to ${normalizeNetwork(network)} and the ViciSwap Receive list. ${meta.reason}`;
}

function buildCoinbaseFavoriteReason(meta, stats, productId, network, rank = 1) {
  const change = coinbaseStatsChange(stats);
  const volume = coinbaseQuoteVolume(stats);
  const rankLabel = rank === 1 ? "current favorite" : `#${rank} market favorite`;
  const volumeText = volume ? `${formatCompactUsd(volume)} estimated 24h quote volume` : "volume still refreshing";
  const proxyText = productId.startsWith(meta.ticker) ? productId : `${productId} market proxy`;
  return `${meta.ticker} is the ${rankLabel} from the live Coinbase backup: 24h ${formatPercent(change)}, ${volumeText}, using ${proxyText}. It is still filtered to the ${normalizeNetwork(network)} ViciSwap receive list. ${meta.reason}`;
}

function buildBinanceFavoriteReason(meta, ticker, marketSymbol, network, rank = 1) {
  const change = binanceTickerChange(ticker);
  const volume = finiteOrNull(ticker.quoteVolume);
  const rankLabel = rank === 1 ? "current favorite" : `#${rank} market favorite`;
  const volumeText = volume ? `${formatCompactUsd(volume)} 24h quote volume` : "volume still refreshing";
  const proxyText = marketSymbol.startsWith(meta.ticker) ? marketSymbol : `${marketSymbol} market proxy`;
  return `${meta.ticker} is the ${rankLabel} from the live exchange backup: 24h ${formatPercent(change)}, ${volumeText}, using ${proxyText}. It is still filtered to the ${normalizeNetwork(network)} ViciSwap receive list. ${meta.reason}`;
}

async function loadPulseChart(candidate) {
  if (!candidate?.id) return candidate;
  if (candidate.source === "CryptoCompare") return loadCryptoComparePulseChart(candidate);
  if (candidate.source === "Coinbase") return loadCoinbasePulseChart(candidate);
  if (candidate.source === "Binance") return loadBinancePulseChart(candidate);
  const canUseCoinGeckoChart = ["CoinGecko", "DEX Screener", "ViciSwap scan", "ViciSwap list"].includes(candidate.source);
  if (!canUseCoinGeckoChart) return candidate;
  const cached = pulseChartCache.get(candidate.id);
  if (cached && Date.now() - cached.cachedAt < MARKET_CHART_CACHE_MS) {
    return withCoinGeckoChart(candidate, cached.prices, cached.updatedAt, cached.stale);
  }

  try {
    const chartData = await getPulseChartData(candidate.id);
    const { prices, updatedAt, stale } = chartData;
    return withCoinGeckoChart(candidate, prices, updatedAt, stale);
  } catch {
    if (cached && Date.now() - cached.cachedAt < MARKET_CHART_STALE_MS) {
      return withCoinGeckoChart(candidate, cached.prices, cached.updatedAt, true);
    }
    return candidate;
  }
}

async function getPulseChartData(coinGeckoId) {
  const existing = pendingPulseChartLoads.get(coinGeckoId);
  if (existing) return existing;
  const request = (async () => {
    const chartData = await withTimeout(
      fetchBackendCoinGeckoChart(coinGeckoId),
      MARKET_CHART_TIMEOUT_MS,
      "Bundle Builder chart workflow timed out",
    ).catch(() => withTimeout(
      fetchDirectCoinGeckoChart(coinGeckoId),
      MARKET_CHART_TIMEOUT_MS,
      "CoinGecko chart timed out",
    ));
    const prices = normalizePriceSeries(chartData.prices);
    if (prices.length < 2) throw new Error("Chart data empty");
    const updatedAt = chartData.updatedAt || new Date().toISOString();
    pulseChartCache.set(coinGeckoId, { prices, cachedAt: Date.now(), updatedAt, stale: chartData.stale });
    return { prices, updatedAt, stale: Boolean(chartData.stale) };
  })();
  pendingPulseChartLoads.set(coinGeckoId, request);
  try {
    return await request;
  } finally {
    pendingPulseChartLoads.delete(coinGeckoId);
  }
}

function withCoinGeckoChart(candidate, prices, updatedAt = new Date().toISOString(), isStale = false) {
  const chartPatch = {
    prices,
    chartSource: isStale ? "Cached CoinGecko 24h chart" : "CoinGecko 24h chart",
    currentPrice: prices.at(-1) || candidate.currentPrice || null,
  };

  if (["DEX Screener", "ViciSwap scan", "ViciSwap list"].includes(candidate.source)) {
    return {
      ...candidate,
      ...chartPatch,
      updatedAt: candidate.updatedAt || updatedAt,
    };
  }

  const change24h = percentChangeFromPrices(prices);
  return {
    ...candidate,
    ...chartPatch,
    updatedAt,
    change24h,
    reason: buildCoinGeckoChartReason(candidate, change24h),
  };
}

function percentChangeFromPrices(prices) {
  const series = normalizePriceSeries(prices);
  const first = series[0];
  const last = series.at(-1);
  if (!first || !last) return 0;
  return ((last - first) / first) * 100;
}

function timestampFromCoinGeckoPriceRows(priceRows) {
  const latestTimestamp = finiteOrNull(priceRows?.at(-1)?.[0]);
  if (!latestTimestamp) return "";
  return new Date(latestTimestamp).toISOString();
}

function buildCoinGeckoChartReason(candidate, change24h) {
  const direction = change24h >= 0 ? "positive" : "defensive";
  const rankLabel = candidate.rank === 1 ? "current favorite" : `#${candidate.rank} market favorite`;
  const networkText = candidate.network ? ` on ${candidate.network}` : "";
  const thesis = candidate.metaReason || `${candidate.name} fits the ${candidate.theme.toUpperCase()} lane.`;
  return `${candidate.ticker} is the ${rankLabel} from CoinGecko 24h chart data: 24h ${formatPercent(change24h)}. It has a ${direction} setup and is filtered to coins available in ViciSwap${networkText}. ${thesis}`;
}

async function loadBinancePulseChart(candidate) {
  if (!candidate.marketSymbol) return candidate;
  const cacheKey = `binance:${candidate.marketSymbol}`;
  const cached = pulseChartCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < MARKET_CHART_CACHE_MS) {
    return { ...candidate, prices: cached.prices, chartSource: `Binance ${candidate.marketSymbol} 24h chart` };
  }

  try {
    const chartUrl = `https://api.binance.com/api/v3/klines?symbol=${encodeURIComponent(candidate.marketSymbol)}&interval=30m&limit=48`;
    const rows = await fetchBinanceJson(chartUrl);
    const prices = normalizePriceSeries((Array.isArray(rows) ? rows : []).map((row) => row?.[4]));
    if (prices.length < 2) throw new Error("Binance chart data empty");
    pulseChartCache.set(cacheKey, { prices, cachedAt: Date.now() });
    return { ...candidate, prices, chartSource: `Binance ${candidate.marketSymbol} 24h chart` };
  } catch {
    return { ...candidate, chartSource: `Binance ${candidate.marketSymbol} price only` };
  }
}

async function loadCoinbasePulseChart(candidate) {
  if (!candidate.productId) return candidate;
  const cacheKey = `coinbase:${candidate.productId}`;
  const cached = pulseChartCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < MARKET_CHART_CACHE_MS) {
    return { ...candidate, prices: cached.prices, chartSource: `Coinbase ${candidate.productId} 24h chart` };
  }

  try {
    const end = new Date();
    const start = new Date(end.getTime() - 1000 * 60 * 60 * 24);
    const params = new URLSearchParams({
      granularity: "900",
      start: start.toISOString(),
      end: end.toISOString(),
    });
    const chartUrl = `https://api.exchange.coinbase.com/products/${encodeURIComponent(candidate.productId)}/candles?${params.toString()}`;
    const rows = await fetchCoinbaseJson(chartUrl);
    const prices = normalizePriceSeries((Array.isArray(rows) ? rows : [])
      .slice()
      .sort((a, b) => Number(a?.[0]) - Number(b?.[0]))
      .map((row) => row?.[4]));
    if (prices.length < 2) throw new Error("Coinbase chart data empty");
    pulseChartCache.set(cacheKey, { prices, cachedAt: Date.now() });
    return { ...candidate, prices, chartSource: `Coinbase ${candidate.productId} 24h chart` };
  } catch {
    return { ...candidate, chartSource: `Coinbase ${candidate.productId} price only` };
  }
}

async function loadCryptoComparePulseChart(candidate) {
  if (!candidate.cryptoCompareSymbol) return candidate;
  const cacheKey = `cryptocompare:${candidate.cryptoCompareSymbol}`;
  const cached = pulseChartCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < MARKET_CHART_CACHE_MS) {
    return { ...candidate, prices: cached.prices, chartSource: `CryptoCompare ${candidate.cryptoCompareSymbol}-USD 24h chart` };
  }

  try {
    const params = new URLSearchParams({
      fsym: candidate.cryptoCompareSymbol,
      tsym: "USD",
      limit: "24",
    });
    const chartUrl = `https://min-api.cryptocompare.com/data/v2/histohour?${params.toString()}`;
    const payload = await fetchCryptoCompareJson(chartUrl);
    const rows = payload?.Data?.Data || [];
    const prices = normalizePriceSeries(rows.map((row) => row.close));
    if (prices.length < 2) throw new Error("CryptoCompare chart data empty");
    pulseChartCache.set(cacheKey, { prices, cachedAt: Date.now() });
    return { ...candidate, prices, chartSource: `CryptoCompare ${candidate.cryptoCompareSymbol}-USD 24h chart` };
  } catch {
    return { ...candidate, chartSource: `CryptoCompare ${candidate.cryptoCompareSymbol}-USD price only` };
  }
}

async function selectPulseCandidate(ticker) {
  const selected = currentFavorites.find((candidate) => candidate.ticker === ticker);
  if (!selected || selected.ticker === currentFavorite?.ticker) return;

  const selectionId = ++pulseSelectionSeq;
  animatePulseSlide();
  currentFavorite = selected;
  currentFavoriteIndex = Math.max(0, currentFavorites.findIndex((candidate) => candidate.ticker === selected.ticker));
  renderMarketPulse(currentFavorite, currentFavorites);
  startPulseLoading(pulseLoadingLabel(selected), { lockControls: false });
  const loadedFavorite = await loadPulseChart(selected);
  currentFavorites = currentFavorites.map((candidate) => (candidate.ticker === loadedFavorite.ticker ? loadedFavorite : candidate));
  if (selectionId !== pulseSelectionSeq || currentFavorite?.ticker !== selected.ticker) return;
  currentFavorite = loadedFavorite;
  currentFavoriteIndex = Math.max(0, currentFavorites.findIndex((candidate) => candidate.ticker === currentFavorite.ticker));
  renderMarketPulse(currentFavorite, currentFavorites);
  stopPulseLoading();
}

function movePulseCandidate(direction) {
  if (!currentFavorites.length) return;
  const nextIndex = (currentFavoriteIndex + direction + currentFavorites.length) % currentFavorites.length;
  const next = currentFavorites[nextIndex];
  if (next?.ticker) selectPulseCandidate(next.ticker);
}

function animatePulseSlide() {
  const card = document.querySelector(".pulse-card-front");
  if (!card) return;
  card.classList.remove("is-sliding");
  void card.offsetWidth;
  card.classList.add("is-sliding");
  window.setTimeout(() => card.classList.remove("is-sliding"), 280);
}

function buildFavoriteReason(meta, market, rank = 1, source = "CoinGecko") {
  const change = finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h) ?? 0;
  const change7d = finiteOrNull(market.price_change_percentage_7d_in_currency);
  const change30d = finiteOrNull(market.price_change_percentage_30d_in_currency);
  const volume = finiteOrNull(market.total_volume);
  const direction = change >= 0 ? "positive" : "defensive";
  const rankLabel = rank === 1 ? "current favorite" : `#${rank} market favorite`;
  const volumeText = volume ? `${formatCompactUsd(volume)} 24h volume` : "volume still refreshing";
  const sourceText = source === "CoinGecko chart" ? "CoinGecko 24h chart data" : "CoinGecko stats";
  const timeframeText = [
    `24h ${formatPercent(change)}`,
    source === "CoinGecko chart" || change7d === null ? "" : `7d ${formatPercent(change7d)}`,
    source === "CoinGecko chart" || change30d === null ? "" : `30d ${formatPercent(change30d)}`,
    volumeText,
  ].filter(Boolean).join(", ");
  return `${meta.ticker} is the ${rankLabel} from ${sourceText}: ${timeframeText}. It has a ${direction} setup, is available on the selected ViciSwap network, and fits the ${meta.theme.toUpperCase()} lane. ${meta.reason}`;
}

function marketTimestampLabel(favorite) {
  const source = favorite.source || "Market data";
  if (source === "Market data unavailable") {
    return favorite.chartSource || "No market data";
  }
  if (source === "Cached" && lastMarketPulseError) {
    const chart = favorite.chartSource || "No live chart";
    return `${source} fallback · ${chart}`;
  }
  const updatedDate = favorite.updatedAt ? new Date(favorite.updatedAt) : null;
  const updated = updatedDate && Number.isFinite(updatedDate.getTime())
    ? `updated ${updatedDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
    : "timestamp unavailable";
  const chart = favorite.chartSource || "No live chart";
  return `${source} · ${updated} · ${chart}`;
}

function renderMarketPulse(favorite, favorites = currentFavorites) {
  if (!favorite) {
    favorite = {
      rank: 1,
      ticker: "--",
      name: "No scanned coin",
      theme: "core",
      change24h: 0,
      prices: fallbackPulse.prices,
      reason: "Run a ViciSwap token scan so the builder can rank coins on this network.",
      source: "Waiting",
      chartSource: "No live chart",
      updatedAt: null,
    };
    favorites = [favorite];
  }
  contextRefreshed.textContent = `Market context refreshed ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  favoriteCoinName.textContent = favorite.source === "Market data unavailable"
    ? "Market data unavailable"
    : favorite.rank === 1
      ? `${favorite.name} is the current favorite`
      : `${favorite.name} is the #${favorite.rank} market favorite`;
  favoriteCoinTicker.textContent = favorite.ticker;
  renderPulseChange(favorite);
  favoriteCoinUpdated.textContent = marketTimestampLabel(favorite);
  if (favoriteCoinEdge) {
    const edgeLabel = favorite.marketEdge?.label || "";
    favoriteCoinEdge.hidden = !edgeLabel;
    favoriteCoinEdge.textContent = edgeLabel;
    favoriteCoinEdge.className = "pulse-edge-chip";
    favoriteCoinEdge.title = favorite.marketEdge?.details?.join(" • ") || "";
  }
  favoriteCoinUpdated.title = lastMarketPulseError || "";
  favoriteCoinReason.textContent = rewritePulseRankLabel(favorite.reason, favorite.rank || 1);
  renderPulseInsights(favorite);
  pulseStatus.textContent = `#${favorite.rank} ${favorite.source}`;
  pulseStatus.title = lastMarketPulseError || `Showing ${favorite.source} market data`;
  if (pulseRefresh) {
    pulseRefresh.title = lastMarketPulseError
      ? `Retry market pulse. Last error: ${lastMarketPulseError}`
      : "Refresh market pulse";
  }
  pulseChart.innerHTML = makeSparkline(favorite.prices, favorite.change24h);
  currentFavoriteIndex = Math.max(0, (favorites || []).findIndex((candidate) => candidate.ticker === favorite.ticker));
  if (pulsePrev) pulsePrev.disabled = (favorites || []).length <= 1;
  if (pulseNext) pulseNext.disabled = (favorites || []).length <= 1;
  updateFavoriteToggle();
}

function renderPulseChange(favorite = currentFavorite) {
  if (!favoriteCoinChange) return;
  if (favoriteCoinWindow) favoriteCoinWindow.textContent = pulseWindowLabel(selectedPulseWindow);
  const change = pulseChangeForWindow(favorite, selectedPulseWindow);
  favoriteCoinChange.classList.remove("positive", "negative", "neutral");
  favoriteCoinChange.classList.add(changeClass(change));
  favoriteCoinChange.textContent = Number.isFinite(change) ? formatAbsPercent(change) : "--";
  favoriteCoinChange.title = Number.isFinite(change)
    ? `${pulseWindowLabel(selectedPulseWindow)} change: ${formatPercent(change)}`
    : `${pulseWindowLabel(selectedPulseWindow)} change unavailable`;
}

function stepPulseWindow(direction) {
  const currentIndex = Math.max(0, pulseWindowOptions.findIndex((option) => option.key === selectedPulseWindow));
  const nextIndex = (currentIndex + direction + pulseWindowOptions.length) % pulseWindowOptions.length;
  selectedPulseWindow = pulseWindowOptions[nextIndex].key;
  renderPulseChange(currentFavorite);
}

function pulseChangeForWindow(favorite = {}, key = "24h") {
  if (key === "24h") return finiteOrNull(favorite.change24h);
  const direct = finiteOrNull(favorite.changeWindows?.[key]);
  if (direct !== null) return direct;
  const window = pulseWindowOptions.find((option) => option.key === key);
  if (!window) return null;
  return percentChangeFromPriceWindow(favorite.prices, window.minutes);
}

function pulseWindowLabel(key) {
  return pulseWindowOptions.find((option) => option.key === key)?.label || key || "24h";
}

function percentChangeFromPriceWindow(prices, minutes) {
  const series = normalizePriceSeries(prices);
  if (series.length < 3 || !Number.isFinite(minutes) || minutes <= 0) return null;
  const lookbackPoints = Math.max(1, Math.round((series.length - 1) * Math.min(minutes, 1440) / 1440));
  if (series.length - 1 - lookbackPoints < 0) return null;
  const start = series[series.length - 1 - lookbackPoints];
  const end = series.at(-1);
  if (!start || !end) return null;
  return ((end - start) / start) * 100;
}

function interpolateWindowChange(startChange, endChange, ratio) {
  const start = finiteOrNull(startChange);
  const end = finiteOrNull(endChange);
  const amount = finiteOrNull(ratio);
  if (start === null || end === null || amount === null) return null;
  return start + (end - start) * clamp(amount, 0, 1);
}

function changeClass(value) {
  const numeric = finiteOrNull(value);
  if (numeric === null || Math.abs(numeric) < 0.005) return "neutral";
  return numeric > 0 ? "positive" : "negative";
}

function formatAbsPercent(value) {
  const numeric = finiteOrNull(value);
  if (numeric === null) return "--";
  return `${Math.abs(numeric).toFixed(2)}%`;
}

function startPulseLoading(initialText = "Loading graph...", { lockControls = false } = {}) {
  pulseLoadingActive = true;
  if (lockControls && pulseStatus) pulseStatus.textContent = "Loading";
  if (lockControls) {
    if (pulsePrev) pulsePrev.disabled = true;
    if (pulseNext) pulseNext.disabled = true;
  }
  if (!pulseChart) return;
  pulseChart.classList.add("is-loading");
  pulseChart.innerHTML = `
    <div class="pulse-chart-loading">
      <span>${escapeHtml(initialText)}</span>
    </div>
  `;
}

function pulseLoadingLabel(candidate = currentFavorite) {
  if (candidate?.ticker && candidate.ticker !== "--") return `Loading ${candidate.ticker} graph...`;
  if (candidate?.name && candidate.name !== "No scanned coin") return `Loading ${candidate.name} graph...`;
  return "Loading market graph...";
}

function stopPulseLoading() {
  pulseLoadingActive = false;
  if (pulseChart) pulseChart.classList.remove("is-loading");
  if (pulsePrev) pulsePrev.disabled = (currentFavorites || []).length <= 1;
  if (pulseNext) pulseNext.disabled = (currentFavorites || []).length <= 1;
}

function renderPulseInsights(favorite) {
  if (!favoriteCoinInsights) return;
  const insights = buildPulseInsights(favorite).slice(0, 3);
  favoriteCoinInsights.innerHTML = insights.map((insight) => `
    <div class="pulse-insight">
      <span>${escapeHtml(insight.label)}</span>
      <p>${escapeHtml(insight.text)}</p>
    </div>
  `).join("");
}

function buildPulseInsights(favorite = {}) {
  if (!favorite || favorite.source === "Market data unavailable" || favorite.ticker === "--") {
    return [{
      label: "Status",
      text: "Market sources are refreshing. The builder will keep using confirmed ViciSwap-supported fallback candidates until fresh data returns.",
    }];
  }

  const insights = [];
  const volume = finiteOrNull(favorite.volume24h ?? favorite.total_volume);
  const liquidity = finiteOrNull(favorite.liquidityUsd);
  const change = finiteOrNull(favorite.change24h);
  const edge = favorite.marketEdge;
  const trajectory = chartTrajectoryLabel(favorite.prices);

  insights.push({
    label: "Market read",
    text: plainMarketRead(favorite.ticker, change, volume, liquidity),
  });

  insights.push({
    label: "Why it fits",
    text: coinInsightForTheme(favorite.theme, favorite.ticker),
  });

  if (favorite.newsCatalyst?.summary) {
    insights.push({
      label: "Catalyst check",
      text: plainCatalystRead(favorite.newsCatalyst),
    });
  } else if (edge?.details?.length) {
    insights.push({
      label: "What to watch",
      text: plainWatchRead(favorite, edge, trajectory),
    });
  } else if (trajectory?.text) {
    insights.push({
      label: "What to watch",
      text: plainWatchRead(favorite, edge, trajectory),
    });
  } else {
    insights.push({
      label: "What to watch",
      text: "No fresh catalyst headline yet, so this pick is mostly being judged by support, market activity, and fit.",
    });
  }

  return insights;
}

function plainMarketRead(ticker, change, volume, liquidity) {
  const thesis = tokenThesisForTicker(ticker);
  const hasChange = Number.isFinite(change);
  const hasSolidVolume = Number.isFinite(volume) && volume >= 1_000_000;
  const hasSolidLiquidity = Number.isFinite(liquidity) && liquidity >= 1_000_000;
  if (hasChange && change > 6 && hasSolidVolume && hasSolidLiquidity) {
    return thesis?.marketRead
      ? `${thesis.marketRead} Today's move also has enough activity behind it to look like more than a thin one-off spike.`
      : `${ticker} is moving with enough activity behind it to look like more than a thin one-off spike.`;
  }
  if (hasChange && change > 0 && hasSolidVolume) {
    return thesis?.marketRead
      ? `${thesis.marketRead} Current volume gives the setup a cleaner read.`
      : `${ticker} has positive momentum and enough trading activity to earn a closer look.`;
  }
  if (hasChange && change < 0) {
    return thesis?.marketRead
      ? `${thesis.marketRead} It is cooling off right now, so the builder treats the setup more carefully.`
      : `${ticker} is cooling off right now, so the builder treats the setup more carefully.`;
  }
  if (hasSolidLiquidity) {
    return thesis?.marketRead
      ? `${thesis.marketRead} Usable market depth helps reduce execution risk compared with thinner tokens.`
      : `${ticker} has usable market depth, which helps reduce execution risk compared with thinner tokens.`;
  }
  return thesis?.marketRead || `${ticker} is being ranked from the latest available market signal, but users should still verify the route.`;
}

function plainCatalystRead(catalyst) {
  const summary = String(catalyst?.summary || "").replace(/^Recent news includes risk words; /, "Recent headlines include risk language. ");
  return summary.length > 150 ? `${summary.slice(0, 147)}...` : summary;
}

function plainWatchRead(favorite, edge, trajectory) {
  const thesis = tokenThesisForTicker(favorite.ticker);
  if (trajectory?.tone === "bearish" || trajectory?.tone === "softening") {
    return thesis?.watch
      ? `${thesis.watch} The chart is also losing short-term strength, so a better entry may depend on stabilization rather than chasing.`
      : "The chart is losing short-term strength, so a better entry may depend on stabilization rather than chasing.";
  }
  if (trajectory?.tone === "rebound") {
    return thesis?.watch
      ? `${thesis.watch} The pullback is being bought, so the next check is whether volume and liquidity keep supporting the rebound.`
      : "The pullback is being bought, so the next check is whether volume and liquidity keep supporting the rebound.";
  }
  if (trajectory?.tone === "constructive") {
    return thesis?.watch
      ? `${thesis.watch} The recent chart is still constructive, but users should watch whether volume keeps confirming the move.`
      : "The recent chart is still constructive, but users should watch whether volume keeps confirming the move.";
  }
  if (edge?.label?.includes("Strong")) {
    return thesis?.watch
      ? `${thesis.watch} The data setup is strong, but the next check is whether liquidity and route quality hold up inside ViciSwap.`
      : "The data setup is strong, but the next check is whether liquidity and route quality hold up inside ViciSwap.";
  }
  return thesis?.watch || `${favorite.ticker} still needs a live route, quote, and slippage check before anyone treats the setup as actionable.`;
}

function coinInsightForTheme(theme = "", ticker = "This coin") {
  const thesis = tokenThesisForTicker(ticker);
  if (thesis) return thesis.why;
  const normalizedTheme = String(theme || "").toLowerCase();
  if (normalizedTheme.includes("base")) return `${ticker} adds Base ecosystem exposure, which can matter when Base activity and liquidity are leading the market.`;
  if (normalizedTheme.includes("defi")) return `${ticker} gives the bundle DeFi exposure, where usage, fees, and liquidity depth tend to matter more than hype alone.`;
  if (normalizedTheme.includes("ai")) return `${ticker} adds AI narrative exposure, which can move quickly but needs stronger risk controls.`;
  if (normalizedTheme.includes("meme")) return `${ticker} is a community momentum asset; the upside can be fast, but sizing should be careful.`;
  if (normalizedTheme.includes("rwa")) return `${ticker} connects the bundle to the RWA/infrastructure lane, where adoption stories can build more gradually.`;
  return `${ticker} is included because it is ViciSwap-supported on this network and fits the current bundle signal mix.`;
}

function tokenThesisForTicker(ticker) {
  const normalized = normalizeTicker(ticker);
  return tokenThesisProfiles[normalized] || routeThesisForTicker(normalized);
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
      marketRead: "The machine treats this as defensive utility rather than an upside catalyst.",
      coverage: "category",
    };
  }

  if (isCoreWrappedTicker(normalized) || /^(BTC|ETH|SOL|WPOL|POL|ARB|OP)$/.test(normalized)) {
    return {
      role: "Core market sleeve",
      why: `${label} gives the bundle broad market or network exposure through a ViciSwap-supported asset on the selected chain.`,
      watch: "Core and wrapped assets still need route quality, liquidity depth, peg or premium, and custody-risk review.",
      marketRead: "The machine treats this as core exposure and route depth rather than a pure narrative bet.",
      coverage: "category",
    };
  }

  if (/^(AAVE|COMP|MORPHO|CRV|VELO|AERO|PENDLE|LDO|GMX|GNS|DOLA|GHO|FRX|SUS|USDE|USDAI|SUSDAI|USDS|USDSM|ETHFI|SYRUPUSDC|MAI|MIM)$/.test(normalized)) {
    return {
      role: "DeFi / yield sleeve",
      why: `${label} gives the bundle DeFi exposure, where usage, liquidity depth, lending demand, fees, or yield activity can matter more than headline hype.`,
      watch: "DeFi tokens can lag if incentives fade, yields compress, or route depth weakens.",
      marketRead: "The machine looks for DeFi coins only when same-network support is confirmed and market depth is strong enough for the selected risk level.",
      coverage: "category",
    };
  }

  if (/^(VIRTUAL|AIXBT|KAITO|BIO|BNKR|CLANKER|NOCK|VFY|VVV|CGN|KTA|TIBBIR|TRUST)$/.test(normalized)) {
    return {
      role: "AI / data narrative sleeve",
      why: `${label} adds AI, data, or attention-market exposure, which can help a bundle capture faster narrative rotation when users want more upside.`,
      watch: "AI and attention tokens can be reflexive, so the machine should require stronger volume, liquidity, and trend confirmation before sizing them up.",
      marketRead: "The machine treats this as a higher-beta narrative sleeve rather than a defensive asset.",
      coverage: "category",
    };
  }

  if (/^(BRETT|DEGEN|TOSHI|MOG|DINO|CBDOGE|CHECK|CHIP|ELSA|FUN|LUNA|ZORA)$/.test(normalized)) {
    return {
      role: "Community / social beta",
      why: `${label} adds community momentum exposure, which can make aggressive bundles more responsive when social risk appetite is leading the market.`,
      watch: "Community tokens can reverse sharply, so they should be avoided or kept small unless liquidity, volume, and trend strength are all confirming.",
      marketRead: "The machine treats this as sentiment-led exposure that needs a higher evidence bar than core or infrastructure assets.",
      coverage: "category",
    };
  }

  if (/^(LINK|ZRO|AXLUSDC|GRT|LPT|MAGIC|ARB|OP|POL|MATICX|STMATIC|TEL|VSN|GRAIL|LAVA|RAIN)$/.test(normalized)) {
    return {
      role: "Infrastructure / network sleeve",
      why: `${label} adds infrastructure or network exposure, helping the bundle diversify beyond simple ETH, BTC, and single-app tokens.`,
      watch: "Infrastructure tokens can trade unevenly, so category strength and execution depth should confirm the thesis.",
      marketRead: "The machine likes infrastructure exposure when it improves the bundle's theme mix without weakening liquidity quality.",
      coverage: "category",
    };
  }

  if (/^(PAXG|XAUT0|THBILL|WTMSTR|WTSPYM|ONDO)$/.test(normalized)) {
    return {
      role: "RWA / treasury sleeve",
      why: `${label} can add real-world-asset, treasury, or off-chain market exposure when ViciSwap support and route quality are confirmed.`,
      watch: "RWA-style assets need extra review around issuer, wrapper, redemption, liquidity, and route quality.",
      marketRead: "The machine treats this as a diversification sleeve rather than a pure crypto momentum bet.",
      coverage: "category",
    };
  }

  return {
    role: "Route-supported token",
    why: `${label} is confirmed in the selected ViciSwap Receive list, so it can be considered only when market data, route quality, and user preferences support it.`,
    watch: "The builder does not yet have a high-conviction custom thesis for this token; verify route, slippage, liquidity, and token details before using it.",
    marketRead: "The machine treats this as eligible but not thesis-led until stronger data appears.",
    coverage: "route-only",
  };
}

function updateFavoriteToggle() {
  const coinInput = currentFavorite?.ticker
    ? document.querySelector(`input[name="coinPrefs"][value="${currentFavorite.ticker}"]`)
    : null;
  const unavailable = !coinInput || coinInput.disabled;
  const active = !!coinInput?.checked && !unavailable;
  useFavoriteCoin.classList.toggle("active", active);
  useFavoriteCoin.disabled = unavailable;
  useFavoriteCoin.innerHTML = active
    ? `${icon("check")} Using this coin`
    : `${icon("check")} Use this coin`;
}

function updateCoinPreferenceAvailability() {
  const { network } = getPreferences();
  document.querySelectorAll('input[name="coinPrefs"]').forEach((input) => {
    const available = isTickerOnNetwork(input.value, network);
    input.disabled = !available;
    if (!available) input.checked = false;
    input.nextElementSibling?.setAttribute("title", available ? `${input.value} is available on ${network}` : `${input.value} is not available on ${network}`);
  });
  updateFavoriteToggle();
}

function makeViciSwapUrl(bundle, allocation = getAdjustedAllocation(bundle), network = chooseBundleNetwork(bundle)) {
  const preferences = getPreferences();
  const safeAllocation = getNetworkSafeAllocation(allocation, network);
  const allocationPlan = getAllocationPlan(safeAllocation, preferences.bundleAmount);
  const handoff = {
    source: "vici-bundle-builder",
    name: bundle.name,
    network,
    totalUsd: Number(preferences.bundleAmount.toFixed(2)),
    tokens: allocationPlan.map(({ ticker, weight, role, amount, quantity, price, priceSource, networks }) => ({
      ticker,
      weight,
      role,
      amountUsd: Number(amount.toFixed(2)),
      quantity: quantity ? Number(quantity.toFixed(8)) : null,
      priceUsd: price ? Number(price.toFixed(8)) : null,
      priceSource,
      networks,
    })),
  };
  const params = new URLSearchParams({
    source: "vici-bundle-builder",
    bundle: bundle.name,
    network,
    amount: preferences.bundleAmount.toFixed(2),
    tokens: allocationPlan.map(({ ticker }) => ticker).join(","),
    weights: allocationPlan.map(({ weight }) => weight).join(","),
    amounts: allocationPlan.map(({ amount }) => amount.toFixed(2)).join(","),
    quantities: allocationPlan.map(({ quantity }) => (quantity ? quantity.toFixed(8) : "")).join(","),
    payload: btoa(JSON.stringify(handoff)),
  });
  return `https://app.viciswap.io/?${params.toString()}`;
}

async function copyViciSwapHandoff(bundleId) {
  const bundle = latestMatches.find((item) => item.id === bundleId) || currentBundle || bundleData.find((item) => item.id === bundleId);
  if (!bundle) return;
  const preferences = getPreferences();
  const bundleNetwork = chooseBundleNetwork(bundle, preferences);
  const allocation = getNetworkSafeAllocation(getAdjustedAllocation(bundle, bundleNetwork, preferences), bundleNetwork);
  const allocationPlan = getAllocationPlan(allocation, preferences.bundleAmount);
  const readable = `${bundle.name}\nNetwork: ${bundleNetwork}\nTotal: ${formatCurrency(preferences.bundleAmount)}\n${allocationPlan.map(({ ticker, weight, amount, quantity, networks }) => {
    const otherNetworks = (networks || []).filter((network) => network !== bundleNetwork);
    const networkNote = otherNetworks.length ? `${bundleNetwork}; also ${otherNetworks.join("/")}` : bundleNetwork;
    return `${ticker}: ${weight}% - ${formatCurrency(amount)} - ${formatQuantity(quantity, ticker)} - Receive: ${networkNote}`;
  }).join("\n")}`;
  try {
    await navigator.clipboard.writeText(readable);
    showToast("Bundle copied. Opening ViciSwap with token handoff.");
  } catch {
    showToast("Opening ViciSwap. Copy may be blocked by this browser.");
  }
}

function makeSubmittedBundleSnapshot(bundleId) {
  const bundle = latestMatches.find((item) => item.id === bundleId) || currentBundle || bundleData.find((item) => item.id === bundleId);
  if (!bundle) return null;
  const preferences = getPreferences();
  const bundleNetwork = chooseBundleNetwork(bundle, preferences);
  const allocation = getNetworkSafeAllocation(getAdjustedAllocation(bundle, bundleNetwork, preferences), bundleNetwork);
  const allocationPlan = getAllocationPlan(allocation, preferences.bundleAmount);
  const startValueUsd = allocationPlan.reduce((sum, item) => sum + item.amount, 0);
  return {
    bundleId: bundle.id,
    bundleName: bundle.name,
    network: bundleNetwork,
    amountUsd: Number(preferences.bundleAmount.toFixed(2)),
    startValueUsd: Number(startValueUsd.toFixed(2)),
    preferences: {
      risk: preferences.risk,
      focus: preferences.theme,
      confidence: preferences.confidence,
      targetHorizon: preferences.targetHorizon,
      coinCount: allocationPlan.length,
    },
    fitScore: bundle.fitBreakdown?.score || bundle.fit || null,
    riskIndex: bundle.riskIndex || null,
    thesis: bundle.thesis,
    coins: allocationPlan.map(({ ticker, weight, role, amount, quantity, price, priceSource, safetyProfile, thesisProfile }) => ({
      ticker,
      name: thesisProfile?.name || ticker,
      network: bundleNetwork,
      allocationPercent: weight,
      amountUsd: Number(amount.toFixed(2)),
      quantity: quantity ? Number(quantity.toFixed(10)) : null,
      startPriceUsd: price ? Number(price.toFixed(10)) : null,
      priceSource,
      role: role || thesisProfile?.role || "",
      safetyLabel: safetyProfile?.label || "",
    })),
  };
}

async function submitTrackedBundle(bundleId) {
  const snapshot = makeSubmittedBundleSnapshot(bundleId);
  if (!snapshot?.coins?.length) return null;
  try {
    const response = await fetch("/api/v1/submitted-bundles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(snapshot),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    if (payload?.bundle) {
      saveSubmittedBundleLocal(payload.bundle);
      return payload.bundle;
    }
    return null;
  } catch {
    saveSubmittedBundleLocal({ ...snapshot, id: snapshot.id || makeLocalSubmissionId(), submittedAt: new Date().toISOString() });
    return null;
  }
}

function makeLocalSubmissionId() {
  return `${Date.now()}${Math.floor(Math.random() * 9000) + 1000}`.slice(0, 17);
}

function saveSubmittedBundleLocal(record) {
  try {
    const records = readSubmittedBundlesLocal();
    const id = String(record.id || record.bundleNumber || makeLocalSubmissionId());
    const next = [{ ...record, id, bundleNumber: id }, ...records.filter((item) => String(item.id || item.bundleNumber) !== id)].slice(0, 80);
    localStorage.setItem(submittedBundlesLocalStorageKey, JSON.stringify(next));
  } catch {
    // Local feed backup is best-effort only.
  }
}

function readSubmittedBundlesLocal() {
  try {
    const parsed = JSON.parse(localStorage.getItem(submittedBundlesLocalStorageKey) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item?.coins?.length) : [];
  } catch {
    return [];
  }
}

function openSubmittedBundlesFeed() {
  if (!submittedBundlesDialog) return;
  if (typeof submittedBundlesDialog.showModal === "function") {
    if (!submittedBundlesDialog.open) submittedBundlesDialog.showModal();
  } else {
    submittedBundlesDialog.setAttribute("open", "");
  }
  loadSubmittedBundlesFeed({ showLoading: true });
}

function closeSubmittedBundlesFeed() {
  if (!submittedBundlesDialog) return;
  if (typeof submittedBundlesDialog.close === "function" && submittedBundlesDialog.open) {
    submittedBundlesDialog.close();
  } else {
    submittedBundlesDialog.removeAttribute("open");
  }
}

async function loadSubmittedBundlesFeed({ showLoading = false } = {}) {
  if (!submittedBundlesList) return;
  if (showLoading) {
    submittedBundlesList.innerHTML = `<div class="submitted-empty">Loading submitted bundles...</div>`;
  }
  try {
    const response = await fetch("/api/v1/submitted-bundles?limit=100", { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const serverRecords = Array.isArray(payload?.bundles) ? payload.bundles : [];
    renderSubmittedBundles(mergeSubmittedBundles(serverRecords, readSubmittedBundlesLocal()));
  } catch {
    renderSubmittedBundles(readSubmittedBundlesLocal(), { localOnly: true });
  }
}

function mergeSubmittedBundles(primary, secondary) {
  const seen = new Set();
  return [...primary, ...secondary].filter((record) => {
    const id = String(record.id || record.bundleNumber || "");
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function renderSubmittedBundles(records, { localOnly = false } = {}) {
  if (!submittedBundlesList) return;
  if (!records.length) {
    submittedBundlesList.innerHTML = `
      <div class="submitted-empty">
        No submitted bundles yet. Build a bundle, confirm the ViciSwap handoff, and it will appear here.
      </div>
    `;
    return;
  }
  submittedBundlesList.innerHTML = records.map((record) => renderSubmittedBundle(record, { localOnly })).join("");
}

function renderSubmittedBundle(record, { localOnly = false } = {}) {
  const performance = submittedBundlePerformance(record);
  const direction = performance.percent > 0.01 ? "up" : performance.percent < -0.01 ? "down" : "flat";
  const className = direction === "up" ? "gain" : direction === "down" ? "loss" : "neutral";
  const submittedAt = record.submittedAt ? new Date(record.submittedAt) : null;
  const submittedLabel = submittedAt && !Number.isNaN(submittedAt.getTime())
    ? submittedAt.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    : "time unknown";
  const storageNote = localOnly ? "local backup" : "tracked handoff";
  const coins = Array.isArray(record.coins) ? record.coins : [];
  return `
    <article class="submitted-bundle ${className}">
      <div class="submitted-bundle-head">
        <div class="submitted-bundle-title">
          <strong>Bundle #${escapeHtml(record.bundleNumber || record.id || "pending")}</strong>
          <span>${escapeHtml(record.bundleName || "Bundle Builder allocation")} - ${escapeHtml(record.network || "Base")} - ${formatCurrency(record.startValueUsd || record.amountUsd || 0)} - ${escapeHtml(submittedLabel)} - ${escapeHtml(storageNote)}</span>
        </div>
        <div class="submitted-performance ${direction === "up" ? "up" : direction === "down" ? "down" : ""}" aria-label="Estimated bundle performance">
          ${performanceIcon(direction)}
          <span>${formatPercent(performance.percent)}</span>
        </div>
      </div>
      <div class="submitted-token-grid">
        ${coins.map((coin) => renderSubmittedToken(coin)).join("")}
      </div>
    </article>
  `;
}

function renderSubmittedToken(coin) {
  const quantity = Number.isFinite(Number(coin.quantity)) ? formatQuantity(Number(coin.quantity), coin.ticker) : "quantity tracking";
  const currentPrice = currentPriceForSubmittedToken(coin);
  const valueNote = currentPrice ? `Current estimate ${formatUsdPrice(currentPrice)}` : "Current price tracking";
  return `
    <div class="submitted-token">
      <strong>${escapeHtml(coin.ticker)}</strong>
      <span>${Number(coin.allocationPercent || 0).toFixed(0)}% - ${formatCurrency(coin.amountUsd || 0)} - ${escapeHtml(quantity)} - Receive: ${escapeHtml(coin.network || "Base")}</span>
      <em>${escapeHtml(coin.safetyLabel || "Review")}: ${escapeHtml(valueNote)}${coin.role ? `; ${escapeHtml(coin.role)}` : ""}</em>
    </div>
  `;
}

function submittedBundlePerformance(record) {
  const coins = Array.isArray(record.coins) ? record.coins : [];
  const startValue = Number(record.startValueUsd) || coins.reduce((sum, coin) => sum + (Number(coin.amountUsd) || 0), 0);
  if (!startValue) return { percent: 0, currentValue: 0, startValue };
  const currentValue = coins.reduce((sum, coin) => {
    const quantity = Number(coin.quantity);
    const currentPrice = currentPriceForSubmittedToken(coin);
    if (Number.isFinite(quantity) && quantity > 0 && currentPrice) return sum + quantity * currentPrice;
    return sum + (Number(coin.amountUsd) || 0);
  }, 0);
  return {
    percent: ((currentValue - startValue) / startValue) * 100,
    currentValue,
    startValue,
  };
}

function currentPriceForSubmittedToken(coin) {
  const ticker = normalizeTicker(coin?.ticker);
  const livePrice = getCoinPriceInfo(ticker)?.price;
  if (livePrice) return livePrice;
  const signalPrice = finiteOrNull(marketSignalForTicker(ticker)?.priceUsd);
  if (signalPrice) return signalPrice;
  return finiteOrNull(coin?.startPriceUsd);
}

function performanceIcon(direction) {
  if (direction === "up") return '<svg viewBox="0 0 12 10" aria-hidden="true"><path d="M6 1 11 9H1z" /></svg>';
  if (direction === "down") return '<svg viewBox="0 0 12 10" aria-hidden="true"><path d="M6 9 1 1h10z" /></svg>';
  return '<svg viewBox="0 0 12 10" aria-hidden="true"><rect x="2" y="4" width="8" height="2" rx="1" /></svg>';
}

function openViciReview(bundleId, viciSwapUrl) {
  const bundle = latestMatches.find((item) => item.id === bundleId) || currentBundle || bundleData.find((item) => item.id === bundleId);
  if (!bundle || !reviewDialog) return;
  const preferences = getPreferences();
  const bundleNetwork = chooseBundleNetwork(bundle, preferences);
  const allocation = getNetworkSafeAllocation(getAdjustedAllocation(bundle, bundleNetwork, preferences), bundleNetwork);
  const allocationPlan = getAllocationPlan(allocation, preferences.bundleAmount);
  pendingViciSwapHandoff = { bundleId, url: viciSwapUrl };

  reviewBundleTitle.textContent = `${bundle.name} on ${bundleNetwork} - ${formatCurrency(preferences.bundleAmount)} total`;
  reviewChecklist.innerHTML = [
    `Same-network Receive tokens only: ${bundleNetwork}.`,
    `${allocationPlan.length} tokens confirmed from ${supportSourceForNetwork(bundleNetwork)}.`,
    "Assistant can prefill visible fields only. It will not approve, sign, or execute a swap.",
    "Safety screen is basic and does not replace contract review, liquidity review, or rug-pull analysis.",
    "Review ViciSwap quote, route, slippage, fees, token amounts, and wallet approvals before continuing.",
  ].map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  reviewTokenList.innerHTML = allocationPlan.map(renderReviewToken).join("");
  reviewAcknowledge.checked = false;
  reviewConfirm.disabled = true;

  if (typeof reviewDialog.showModal === "function") {
    if (!reviewDialog.open) reviewDialog.showModal();
  } else {
    reviewDialog.setAttribute("open", "");
  }
}

function renderReviewToken({ ticker, weight, amount, networks, safetyProfile }) {
  const network = getPreferences().network;
  const networkLabel = networks?.includes(network) ? network : "network pending";
  return `
    <div class="review-token safety-${safetyProfile.level}">
      <strong>${escapeHtml(ticker)}</strong>
      <span>${weight}% - ${formatCurrency(amount)} - Receive: ${escapeHtml(networkLabel)}</span>
      <em>${escapeHtml(safetyProfile.label)}: ${escapeHtml(safetyProfile.liquidityLabel)}; ${escapeHtml(safetyProfile.contractLabel)}</em>
    </div>
  `;
}

function closeViciReview() {
  pendingViciSwapHandoff = null;
  if (!reviewDialog) return;
  if (typeof reviewDialog.close === "function" && reviewDialog.open) {
    reviewDialog.close();
  } else {
    reviewDialog.removeAttribute("open");
  }
}

async function confirmViciReview() {
  if (!pendingViciSwapHandoff || !reviewAcknowledge.checked) return;
  const { bundleId, url } = pendingViciSwapHandoff;
  closeViciReview();
  submitTrackedBundle(bundleId);
  await copyViciSwapHandoff(bundleId);
  window.open(url, "_blank", "noopener,noreferrer");
}

function makeSparkline(prices, change) {
  const series = normalizePriceSeries(prices);
  const width = 320;
  const height = 132;
  const pad = 14;
  if (series.length < 2) {
    const y = height / 2;
    const color = "#697386";
    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Market chart unavailable">
        <path d="M ${pad} ${y} L ${width - pad} ${y}" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="7 7"></path>
        <circle cx="${width - pad}" cy="${y}" r="4" fill="${color}"></circle>
      </svg>
    `;
  }

  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const points = series.map((price, index) => {
    const x = pad + (index / (series.length - 1)) * (width - pad * 2);
    const y = max === min ? height / 2 : height - pad - ((price - min) / span) * (height - pad * 2);
    return [x, y];
  });
  const line = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L ${width - pad} ${height - pad} L ${pad} ${height - pad} Z`;
  const color = change >= 0 ? "#1f8a5f" : "#c8503e";
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="24 hour sparkline">
      <path d="${area}" fill="${color}" opacity="0.12"></path>
      <path d="${line}" fill="none" stroke="${color}" stroke-width="3"></path>
      <circle cx="${points.at(-1)[0].toFixed(1)}" cy="${points.at(-1)[1].toFixed(1)}" r="4" fill="${color}"></circle>
    </svg>
  `;
}

function formatPercent(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "--";
  const sign = numeric > 0 ? "+" : "";
  return `${sign}${numeric.toFixed(2)}%`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(normalizeBundleAmount(value));
}

function formatPriceLine(price, source) {
  if (!price) return "price refreshing";
  return `${source || "Price"} ${formatUsdPrice(price)}`;
}

function formatUsdPrice(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return "$0.00";
  const maximumFractionDigits = numeric >= 1000 ? 2 : numeric >= 1 ? 4 : numeric >= 0.01 ? 6 : 8;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(numeric);
}

function formatCompactUsd(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return "$0";
  if (numeric < 1000) return formatUsdPrice(numeric);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: numeric >= 1000000 ? 1 : 0,
  }).format(numeric);
}

function formatQuantity(quantity, ticker) {
  if (!Number.isFinite(quantity) || quantity <= 0) return "quantity loading";
  const decimals = quantity >= 100 ? 2 : quantity >= 1 ? 4 : quantity >= 0.01 ? 6 : 8;
  return `about ${quantity.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })} ${ticker}`;
}
