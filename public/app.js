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

const catalystNarrativeProfiles = {
  AERO: {
    driver: "launch / upgrade",
    title: "Aerodrome is being watched for Base DEX growth, liquidity incentives, and its predictive allocation / expansion narrative.",
    source: "Bundle Builder catalyst watchlist",
    summary: "AERO has a known Base DEX catalyst lane: ecosystem activity, liquidity incentives, and upgrade or expansion narratives can feed directly into demand for the token.",
    watch: "The catalyst is strongest when AERO has elevated volume and Base DEX activity. If volume fades, the move can become a chase.",
    socialWatch: "Watch X, Discord, Telegram, and Base ecosystem chatter for Aerodrome expansion notes, liquidity incentive changes, reward updates, and DEX-volume narratives.",
    minVolume: 1_500_000,
    minAbsChange: 2,
  },
  MORPHO: {
    driver: "DeFi lending growth",
    title: "Morpho is being watched for Base lending growth, vault adoption, and institutional DeFi credit demand.",
    source: "Bundle Builder catalyst watchlist",
    summary: "MORPHO has a Base DeFi lending catalyst lane: stronger borrowing, collateral, and vault activity can make the token more relevant than a generic DeFi pick.",
    watch: "The catalyst is strongest when lending narratives line up with volume and route depth, not just price movement.",
    socialWatch: "Watch for vault growth, collateral demand, institutional DeFi mentions, and lending-rate narratives that show real usage rather than just price movement.",
    minVolume: 750_000,
    minAbsChange: 1.5,
  },
  VIRTUAL: {
    driver: "AI-agent attention",
    title: "Virtuals Protocol is being watched for AI-agent narrative momentum and attention-driven Base activity.",
    source: "Bundle Builder catalyst watchlist",
    summary: "VIRTUAL has an AI-agent catalyst lane: when market attention rotates back into AI infrastructure, it can move faster than core assets.",
    watch: "AI-agent tokens are reflexive; the catalyst needs volume confirmation because attention can cool quickly.",
    socialWatch: "Watch for AI-agent launches, ecosystem integrations, mindshare spikes, and creator/developer activity that confirms the attention cycle is still live.",
    minVolume: 1_000_000,
    minAbsChange: 2,
  },
  DEGEN: {
    driver: "Base community momentum",
    title: "DEGEN is being watched for Base community momentum and high-beta social participation.",
    source: "Bundle Builder catalyst watchlist",
    summary: "DEGEN has a community catalyst lane: it can work when Base-native social risk appetite is active, but it needs strong confirmation.",
    watch: "Community catalysts can reverse fast. The machine should size it carefully unless volume and route depth stay strong.",
    socialWatch: "Watch for Base community memes, tipping/payment activity, creator mentions, and sudden social-volume bursts that explain why risk appetite is rotating into DEGEN.",
    minVolume: 700_000,
    minAbsChange: 2.5,
  },
  BRETT: {
    driver: "Base meme momentum",
    title: "BRETT is being watched for recognizable Base meme momentum and social beta.",
    source: "Bundle Builder catalyst watchlist",
    summary: "BRETT has a Base meme catalyst lane: it can benefit when attention and risk appetite rotate into Base community assets.",
    watch: "Meme catalysts are fragile; this only deserves conviction when volume confirms the move.",
    socialWatch: "Watch social platforms for Base meme rotation, whale posts, exchange chatter, and community-led campaigns; these can move BRETT faster than fundamentals.",
    minVolume: 700_000,
    minAbsChange: 2.5,
  },
  ZRO: {
    driver: "interoperability infrastructure",
    title: "LayerZero is being watched for interoperability, omnichain infrastructure, and cross-chain activity narratives.",
    source: "Bundle Builder catalyst watchlist",
    summary: "ZRO has an interoperability catalyst lane: it becomes more compelling when cross-chain infrastructure is in favor and live market data confirms interest.",
    watch: "Infrastructure narratives can take time. Short-term conviction should still depend on volume and chart setup.",
    socialWatch: "Watch for LayerZero ecosystem launches, bridge/integration announcements, token utility discussions, and cross-chain usage headlines.",
    minVolume: 1_000_000,
    minAbsChange: 1.5,
  },
  KAITO: {
    driver: "InfoFi / AI attention",
    title: "KAITO is being watched for InfoFi, AI attention markets, and crypto intelligence narratives.",
    source: "Bundle Builder catalyst watchlist",
    summary: "KAITO has an InfoFi catalyst lane: it can benefit when market attention favors data, AI, and crypto intelligence products.",
    watch: "Newer narrative assets need clear volume confirmation before the machine should treat them as durable.",
    socialWatch: "Watch for attention-market narratives, AI/data product updates, creator rewards, and InfoFi mindshare increases.",
    minVolume: 600_000,
    minAbsChange: 2,
  },
  ZORA: {
    driver: "creator economy activity",
    title: "ZORA is being watched for creator economy momentum and Base-native consumer crypto activity.",
    source: "Bundle Builder catalyst watchlist",
    summary: "ZORA has a creator-economy catalyst lane: it gets more interesting when Base consumer activity and creator narratives are active.",
    watch: "Creator-economy tokens can be sentiment-heavy; volume and trend quality matter a lot.",
    socialWatch: "Watch for creator launches, mint activity, Base consumer-app chatter, and creator-economy headlines that point to real usage.",
    minVolume: 600_000,
    minAbsChange: 2,
  },
};

const viciNetworks = ["Base", "Arbitrum", "Polygon", "Optimism"];
const TOKEN_UNIVERSE_LOCAL_STORAGE_KEY = "viciBundleBuilderTokenUniverse";
const VICI_API_TOKEN_UNIVERSE_LOCAL_STORAGE_KEY = "viciBundleBuilderApiTokenUniverse";
const TERMS_ACK_STORAGE_KEY = "bundleBuilderBetaTermsAccepted";
const TERMS_ACK_VERSION = "beta-v1";
const THEME_STORAGE_KEY = "bundleBuilderTheme";
const BUILDER_TOKEN_UNIVERSE_MESSAGE = "VICI_TOKEN_UNIVERSE";
const MARKET_REQUEST_MESSAGE = "VICI_MARKET_REQUEST";
const MARKET_RESPONSE_MESSAGE = "VICI_MARKET_RESPONSE";
const PULSE_CHART_CACHE_LOCAL_STORAGE_KEY = "viciBundleBuilderPulseChartCache";
const LIVE_BACKEND_BASE_URL = "https://bundlebuilder.vicicoin.io";
const MARKET_CHART_CACHE_MS = 1000 * 60 * 30;
const MARKET_HEALTH_CACHE_MS = 1000 * 60 * 5;
const MARKET_HEALTH_LIVE_DRIFT = 1;
const MARKET_CHART_STALE_MS = 1000 * 60 * 60 * 12;
const MARKET_CHART_BACKGROUND_REFRESH_COOLDOWN_MS = 1000 * 60 * 30;
const MARKET_CHART_FAILURE_COOLDOWN_MS = 1000 * 30;
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
const PULSE_ANALYST_CACHE_MS = 1000 * 60 * 10;
const BINANCE_TICKER_CACHE_MS = 1000 * 60 * 2;
const COINBASE_STATS_CACHE_MS = 1000 * 60 * 2;
const CRYPTOCOMPARE_STATS_CACHE_MS = 1000 * 60 * 2;
const DEXSCREENER_STATS_CACHE_MS = 1000 * 60 * 2;
const DEXSCREENER_TIMEOUT_MS = 14000;
const DEXSCREENER_ROW_TIMEOUT_MS = 4200;
const MARKET_CHART_CANDIDATE_LIMIT = 12;
const VICI_COINS_API_BASE_URL = "https://office.viciswap.io/vs2/api/coins";
const VICI_SWAP_VS2_BASE_URL = "https://office.viciswap.io/vs2/";
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
const themeToggle = document.getElementById("themeToggle");
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
const builderTitle = document.getElementById("builder-title");
const favoriteCoinName = document.getElementById("favoriteCoinName");
const favoriteCoinTicker = document.getElementById("favoriteCoinTicker");
const favoriteCoinWindow = document.getElementById("favoriteCoinWindow");
const favoriteCoinChange = document.getElementById("favoriteCoinChange");
const favoriteCoinReason = document.getElementById("favoriteCoinReason");
const favoriteCoinInsights = document.getElementById("favoriteCoinInsights");
const pulseSevenDayMeter = document.getElementById("pulseSevenDayMeter");
const pulseStatus = document.getElementById("pulseStatus");
const pulseRefresh = document.getElementById("pulseRefresh");
const pulseChart = document.getElementById("pulseChart");
const useFavoriteCoin = document.getElementById("useFavoriteCoin");
const favoriteMarketCoin = document.getElementById("favoriteMarketCoin");
const pulsePrev = document.getElementById("pulsePrev");
const pulseNext = document.getElementById("pulseNext");
const coinLookupInput = document.getElementById("coinLookupInput");
const coinLookupOptions = document.getElementById("coinLookupOptions");
const coinLookupClear = document.getElementById("coinLookupClear");
const coinLookupMood = document.getElementById("coinLookupMood");
const coinLookupStatus = document.getElementById("coinLookupStatus");
const coinLookupCard = document.getElementById("coinLookupCard");
const lookupCoinClose = document.getElementById("lookupCoinClose");
const lookupCoinName = document.getElementById("lookupCoinName");
const lookupCoinSource = document.getElementById("lookupCoinSource");
const lookupCoinChart = document.getElementById("lookupCoinChart");
const lookupCoinTicker = document.getElementById("lookupCoinTicker");
const lookupCoinWindow = document.getElementById("lookupCoinWindow");
const lookupCoinChange = document.getElementById("lookupCoinChange");
const lookupCoinMeter = document.getElementById("lookupCoinMeter");
const lookupCoinReason = document.getElementById("lookupCoinReason");
const lookupCoinInsights = document.getElementById("lookupCoinInsights");
const marketHealthRing = document.getElementById("marketHealthRing");
const marketHealthRingArc = document.getElementById("marketHealthRingArc");
const marketHealthScore = document.getElementById("marketHealthScore");
const marketHealthBtc = document.getElementById("marketHealthBtc");
const marketHealthEth = document.getElementById("marketHealthEth");
const marketHealthDetails = document.getElementById("marketHealthDetails");
const coinPreferenceGrid = document.querySelector(".coin-chip-grid");
const profileButton = document.getElementById("profileButton");
const profileDialog = document.getElementById("profileDialog");
const profileClose = document.getElementById("profileClose");
const profileDisplayName = document.getElementById("profileDisplayName");
const profileSaveName = document.getElementById("profileSaveName");
const profileDialogTitle = document.getElementById("profileDialogTitle");
const profileDialogSubtitle = document.getElementById("profileDialogSubtitle");
const profileSyncStatus = document.getElementById("profileSyncStatus");
const profileEmail = document.getElementById("profileEmail");
const profileLoginCodeGroup = document.getElementById("profileLoginCodeGroup");
const profileLoginCode = document.getElementById("profileLoginCode");
const profileRequestCode = document.getElementById("profileRequestCode");
const profileVerifyCode = document.getElementById("profileVerifyCode");
const profileSignedInActions = document.getElementById("profileSignedInActions");
const profileSyncNow = document.getElementById("profileSyncNow");
const profileLogout = document.getElementById("profileLogout");
const profileFavoriteList = document.getElementById("profileFavoriteList");
const profileFavoriteBundleList = document.getElementById("profileFavoriteBundleList");
const profileMachineAccuracy = document.getElementById("profileMachineAccuracy");
const profileBundleList = document.getElementById("profileBundleList");
const profileAlertList = document.getElementById("profileAlertList");
const appHeader = document.querySelector(".app-header");
const onboardingTour = document.getElementById("onboardingTour");
const tourClose = document.getElementById("tourClose");
const tourVisual = document.getElementById("tourVisual");
const tourTitle = document.getElementById("tourTitle");
const tourBody = document.getElementById("tourBody");
const tourBack = document.getElementById("tourBack");
const tourDots = document.getElementById("tourDots");
const tourNext = document.getElementById("tourNext");
const tourHelp = document.getElementById("tourHelp");
const notificationCenter = document.getElementById("notificationCenter");
const coinPreferenceSearch = document.getElementById("coinPreferenceSearch");
const coinPreferenceCategory = document.getElementById("coinPreferenceCategory");
const selectedCoinSummary = document.getElementById("selectedCoinSummary");

let latestMatches = [];
let currentFavorite = fallbackPulse;
let currentFavorites = fallbackPulseDeck;
let currentFavoriteIndex = 0;
let currentBundle = null;
let activeProfileFavoritesTab = "coins";
let editingBundleNameId = "";
let pulseChartCache = readStoredPulseChartCache();
let pendingPulseChartLoads = new Map();
let pulseChartBackgroundRefreshAttempts = new Map();
let pendingPulseWindowLoads = new Map();
let pendingBackendChartRequests = new Map();
let unavailablePulseWindows = new Map();
let marketHealthCache = null;
let pulseAnalystCache = new Map();
let marketHealthLiveTimer = null;
let marketHealthLiveBase = null;
let marketHealthLiveCurrent = null;
let marketHealthRenderedScore = 50;
let marketHealthRenderFrame = null;
let marketPulseRefreshSeq = 0;
let pulseSelectionSeq = 0;
let pulseChartWarmSeq = 0;
let pulseLoadingActive = false;
let marketPulseReady = false;
let selectedPulseWindow = "24h";
let selectedPulseReadWindow = "1d";
let selectedLookupWindow = "24h";
let selectedLookupReadWindow = "1d";
let lookupSelectedCoin = null;
let coinLookupTimer = 0;
let coinLookupSeq = 0;
let coinLookupMoodTimer = null;
let coinLookupMoodTier = "";
let coinLookupMoodIndex = -1;
let machineAccuracySummary = null;
let machineAccuracyStorage = null;
let binanceTickerCache = null;
let coinbaseStatsCache = new Map();
let cryptoCompareStatsCache = null;
let dexScreenerStatsCache = new Map();
let newsCatalystCache = new Map();
let latestMarketSignals = new Map();
const submittedBundlesLocalStorageKey = "viciBundleBuilderSubmittedBundles";
const builderPreferencesStorageKey = "viciBundleBuilderPreferencesV1";
const reviewAlertsStorageKey = "viciBundleBuilderReviewAlertsV1";
const recentBundlesStorageKey = "viciBundleBuilderRecentBundlesV1";
const localProfileStorageKey = "viciBundleBuilderLocalProfileV1";
const favoriteCoinsStorageKey = "viciBundleBuilderFavoriteCoinsV1";
const profileSessionStorageKey = "viciBundleBuilderProfileSessionV1";
const pulseSnapshotsStorageKey = "viciBundleBuilderPulseSnapshotsV1";
const tourSeenStorageKey = "viciBundleBuilderTourSeenV1";
const pulseSnapshotHistoryLimit = 6000;
const marketPulseBackgroundRefreshMs = 1000 * 60 * 5;
const pulseReadWindows = [
  { key: "5m", label: "5m" },
  { key: "15m", label: "15m" },
  { key: "30m", label: "30m" },
  { key: "1h", label: "1h" },
  { key: "3h", label: "3h" },
  { key: "6h", label: "6h" },
  { key: "1d", label: "1d" },
  { key: "3d", label: "3d" },
  { key: "7d", label: "7d" },
  { key: "1mo", label: "1M" },
];
const coinLookupMoodPhrases = {
  good: [
    "Markets feeling good today",
    "Risk appetite is showing up",
    "The board has some green lights",
    "Buyers are awake across the deck",
    "Momentum has room to breathe",
    "The market has coffee today",
    "Green candles are doing their little dance",
    "The board is feeling generous",
    "The machine sees some sparkle out there",
    "The market woke up on the right side of the chart",
  ],
  medium: [
    "Mixed market, selective entries",
    "Some coins are working, some need proof",
    "The tape is undecided but usable",
    "Good setups matter more than hype",
    "Momentum is there, confirmation matters",
    "Search the coin, then check the depth",
    "Market is balanced, be picky",
    "The machine is sorting signal from noise",
    "Not risk-off, not free money either",
    "Look for coins earning their move",
  ],
  bad: [
    "Today is not your day pal",
    "The chart said try again later",
    "The market woke up and chose violence",
    "Buyers are hiding under the desk",
    "This tape needs a snack and a nap",
    "The vibes are in timeout",
    "The market is giving side-eye",
    "Not the day to be a hero",
    "The candles are being dramatic",
    "The machine says maybe breathe first",
  ],
};
let selectedCoinPreferences = new Set();
let manualAllocationOverride = null;
let manualAllocationKey = "";
let tourIndex = 0;
let profileSession = readProfileSession();
let profileSyncTimer = null;
let profileSyncInFlight = false;
const tourSlides = [
  {
    icon: "sliders",
    title: "Choose what fits you",
    body: "Set your risk comfort, investment focus, conviction, and target hold period. These choices shape the ranking; they do not guarantee performance.",
  },
  {
    icon: "pulse",
    title: "Read the market pulse",
    body: "Browse the ranked market candidates, compare time windows, and use the setup/read badges for the data, context, and entry cautions behind each signal.",
  },
  {
    icon: "fit",
    title: "Inspect the fit score",
    body: "The Fit chart explains how risk, focus, upside evidence, diversity, and ViciSwap support contributed to the match.",
  },
  {
    icon: "allocation",
    title: "Tune the allocation",
    body: "After building, adjust any allocation percentage. The remaining coins rebalance automatically so the bundle stays at 100%.",
  },
  {
    icon: "review",
    title: "Review, then hand off",
    body: "Confirm the safety checklist before ViciSwap. Save an optional review reminder so Bundle Builder can prompt you to revisit the bundle on this device.",
  },
];
const pulseWindowOptions = [
  { key: "next1mo", label: "Next 1M", minutes: 43200, projected: true, sourceKey: "1mo", horizonDays: 30 },
  { key: "1mo", label: "1M", minutes: 43200 },
  { key: "next7d", label: "Next 7d", minutes: 10080, projected: true },
  { key: "7d", label: "7d", minutes: 10080 },
  { key: "3d", label: "3d", minutes: 4320 },
  { key: "24h", label: "24h", minutes: 1440 },
  { key: "12h", label: "12h", minutes: 720 },
  { key: "next24h", label: "Next 24h", minutes: 1440, projected: true, sourceKey: "24h", horizonDays: 1 },
  { key: "6h", label: "6h", minutes: 360 },
  { key: "3h", label: "3h", minutes: 180 },
  { key: "1h", label: "1h", minutes: 60 },
  { key: "30m", label: "30m", minutes: 30 },
  { key: "15m", label: "15m", minutes: 15 },
  { key: "5m", label: "5m", minutes: 5 },
];
const pulseWindowChartConfig = {
  "24h": { timeframe: "minute", aggregate: 5, limit: 288 },
  "3d": { timeframe: "hour", aggregate: 1, limit: 72 },
  "7d": { timeframe: "hour", aggregate: 1, limit: 168 },
  "1mo": { timeframe: "hour", aggregate: 4, limit: 180 },
  "12h": { timeframe: "minute", aggregate: 5, limit: 144 },
  "6h": { timeframe: "minute", aggregate: 2, limit: 180 },
  "3h": { timeframe: "minute", aggregate: 1, limit: 180 },
  "1h": { timeframe: "minute", aggregate: 1, limit: 60 },
  "30m": { timeframe: "minute", aggregate: 1, limit: 30 },
  "15m": { timeframe: "minute", aggregate: 1, limit: 15 },
  "5m": { timeframe: "minute", aggregate: 1, limit: 5 },
};

function chartWindowForReadWindow(key = "7d") {
  return ({
    "1d": "24h",
    "1mo": "1mo",
  }[key]) || key;
}

function projectedWindowForReadWindow(key = "7d") {
  return ({
    "1d": "next24h",
    "7d": "next7d",
    "1mo": "next1mo",
  }[key]) || chartWindowForReadWindow(key);
}

function isPulseReadWindow(key) {
  return pulseReadWindows.some((item) => item.key === key);
}
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
    selectedCoins: [...selectedCoinPreferences].filter((ticker) => isTickerOnNetwork(ticker, network)),
    diversityEnabled: data.get("diversityToggle") === "on",
    coinCount: Number(data.get("coinCount")),
  };
}

function saveBuilderPreferences() {
  const preferences = safePreferences();
  try {
    localStorage.setItem(builderPreferencesStorageKey, JSON.stringify({
      network: preferences.network,
      risk: preferences.risk,
      theme: preferences.theme,
      confidence: preferences.confidence,
      targetHorizon: preferences.targetHorizon,
      selectedCoins: [...selectedCoinPreferences],
      diversityEnabled: preferences.diversityEnabled,
      coinCount: preferences.coinCount,
    }));
  } catch {
    // The builder remains usable when private browsing blocks storage.
  }
}

function restoreBuilderPreferences() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(builderPreferencesStorageKey) || "null");
  } catch {
    saved = null;
  }
  const initialChecked = [...document.querySelectorAll('input[name="coinPrefs"]:checked')].map((input) => input.value);
  selectedCoinPreferences = new Set(Array.isArray(saved?.selectedCoins) ? saved.selectedCoins.map(normalizeTicker) : initialChecked);
  if (!saved) return;
  if (saved.network && [...targetNetwork.options].some((option) => option.value === saved.network && !option.disabled)) targetNetwork.value = saved.network;
  const riskControl = form.elements.namedItem("risk");
  if (riskControl && saved.risk) riskControl.value = saved.risk;
  const themeControl = document.querySelector(`input[name="theme"][value="${CSS.escape(saved.theme || "")}"]`);
  if (themeControl) themeControl.checked = true;
  const confidenceControl = form.elements.namedItem("confidence");
  if (confidenceControl && Number.isFinite(Number(saved.confidence))) confidenceControl.value = String(saved.confidence);
  const horizonControl = form.elements.namedItem("targetHorizon");
  if (horizonControl && saved.targetHorizon) horizonControl.value = saved.targetHorizon;
  diversityToggle.checked = saved.diversityEnabled === true;
  coinCount.disabled = !diversityToggle.checked;
  diversitySliderWrap.setAttribute("aria-disabled", String(!diversityToggle.checked));
  if (Number.isFinite(Number(saved.coinCount))) coinCount.value = String(saved.coinCount);
  coinCountValue.textContent = `${coinCount.value} coins`;
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
  const selectedTickers = selectedTickersForNetwork(preferences, network);
  const modelAllocation = getNetworkSafeAllocation(bundle.allocation, network)
    .filter(([ticker]) => !selectedTickers.length || selectedTickers.some((selected) => areEquivalentTickers(selected, ticker)));
  const selectedAllocation = selectedTickers.map((ticker) => {
    const modelMatch = modelAllocation.find(([modelTicker]) => areEquivalentTickers(modelTicker, ticker));
    return modelMatch || [ticker, fallbackWeightForTicker(ticker, preferences), roleForTicker(ticker)];
  });
  const supportedAllocation = selectedAllocation.length ? selectedAllocation : modelAllocation;
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
  if (getTokenUniverseNetwork(apiViciTokenUniverse, normalized) && getTokenUniverseNetwork(scannedViciTokenUniverse, normalized)) return "ViciSwap API + live scan";
  if (getTokenUniverseNetwork(apiViciTokenUniverse, normalized)) return "ViciSwap API + confirmed scan";
  if (getTokenUniverseNetwork(scannedViciTokenUniverse, normalized)) return "live ViciSwap scan + confirmed scan";
  return confirmedViciNetworkTokens[normalized]?.length ? "confirmed starter scan" : "network not scanned yet";
}

function getActiveNetworkSupport() {
  const support = {};
  viciNetworks.forEach((network) => {
    const apiGroup = getTokenUniverseNetwork(apiViciTokenUniverse, network);
    const scannedGroup = getTokenUniverseNetwork(scannedViciTokenUniverse, network);
    const tickers = [
      ...(confirmedViciNetworkTokens[network] || []),
      ...(scannedGroup?.tokens?.map((token) => token.ticker) || []),
      ...(apiGroup?.tokens?.map((token) => token.ticker) || []),
    ];

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

function readStoredPulseChartCache() {
  try {
    const saved = localStorage.getItem(PULSE_CHART_CACHE_LOCAL_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return new Map();
    const now = Date.now();
    return new Map(Object.entries(parsed)
      .map(([key, value]) => [key, normalizePulseChartCacheRecord(value)])
      .filter(([, value]) => value && now - value.cachedAt < MARKET_CHART_STALE_MS));
  } catch {
    return new Map();
  }
}

function normalizePulseChartCacheRecord(value = {}) {
  const prices = normalizePriceSeries(value.prices);
  if (prices.length < 2) return null;
  return {
    prices,
    cachedAt: finiteOrNull(value.cachedAt) || Date.now(),
    updatedAt: value.updatedAt || new Date().toISOString(),
    stale: Boolean(value.stale),
  };
}

function setPulseChartCache(key, value = {}) {
  const cacheKey = String(key || "").trim();
  const record = normalizePulseChartCacheRecord({ ...value, cachedAt: value.cachedAt || Date.now() });
  if (!cacheKey || !record) return;
  pulseChartCache.set(cacheKey, record);
  writeStoredPulseChartCache();
}

function writeStoredPulseChartCache() {
  try {
    const now = Date.now();
    const entries = [...pulseChartCache.entries()]
      .filter(([, value]) => value && now - value.cachedAt < MARKET_CHART_STALE_MS)
      .sort((a, b) => (b[1].cachedAt || 0) - (a[1].cachedAt || 0))
      .slice(0, 80);
    localStorage.setItem(PULSE_CHART_CACHE_LOCAL_STORAGE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
    // Chart cache is a speed boost only; the market pulse can still fetch live data.
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
  renderCoinLookupOptions();
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
    renderCoinLookupOptions();
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
  const selectedCount = selectedTickersForNetwork(preferences, network).length;
  if (selectedCount) return Math.min(selectedCount, availableCount);
  const requested = preferences.diversityEnabled ? preferences.coinCount : 6;
  return Math.max(Math.min(3, availableCount), Math.min(requested, availableCount));
}

function getUniqueSupportedFamilyCount(network) {
  return new Set(getSupportedTickersForNetwork(network).map(canonicalTickerFamily)).size;
}

function fillAllocationToCount(allocation, network, desiredCount, preferences) {
  const filled = allocation.slice();
  const selectedTickers = selectedTickersForNetwork(preferences, network);
  const fallbackTickers = getNetworkCandidateTickers(network);
  const candidates = selectedTickers.length && filled.length < desiredCount
    ? [...selectedTickers, ...fallbackTickers]
    : fallbackTickers;

  for (const ticker of candidates) {
    if (filled.length >= desiredCount) break;
    if (filled.some(([existingTicker]) => areEquivalentTickers(existingTicker, ticker))) continue;
    filled.push([ticker, fallbackWeightForTicker(ticker, preferences), roleForTicker(ticker)]);
  }

  return rebalanceAllocationByLiveSignals(filled, preferences);
}

function selectedTickersForNetwork(preferences = safePreferences(), network = preferences.network) {
  const normalizedNetwork = normalizeNetwork(network);
  const seenFamilies = new Set();
  return (preferences.selectedCoins || []).filter((ticker) => {
    if (!isTickerOnNetwork(ticker, normalizedNetwork)) return false;
    const family = canonicalTickerFamily(ticker);
    if (seenFamilies.has(family)) return false;
    seenFamilies.add(family);
    return true;
  });
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

function normalizeEqualAllocationWeights(allocation) {
  if (!allocation.length) return [];
  const baseWeight = Math.floor(100 / allocation.length);
  let remainder = 100 - baseWeight * allocation.length;
  return allocation.map(([ticker, originalWeight, role]) => {
    const weight = baseWeight + (remainder > 0 ? 1 : 0);
    remainder = Math.max(0, remainder - 1);
    return [ticker, weight, role, originalWeight];
  });
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
      <p class="viciswap-split-note">ViciSwap opens these selected coins as an equal split. Use the machine percentages below as manual guidance.</p>
      <div class="review-reminder-control">
        <div>
          <strong>Set a review alert</strong>
          <span>Schedule a same-device market analysis for this bundle.</span>
        </div>
        <select id="resultReviewDelay" aria-label="Bundle review reminder timing">
          <option value="1">Tomorrow</option>
          <option value="3">In 3 days</option>
          <option value="7" selected>In 1 week</option>
          <option value="14">In 2 weeks</option>
          <option value="30">In 1 month</option>
          <option value="custom">Choose exact date and time</option>
        </select>
        <input id="resultReviewDateTime" class="review-date-time" type="datetime-local" aria-label="Exact bundle review date and time" hidden />
        <button class="action-button" type="button" data-schedule-review="${bundle.id}">${icon("alert")} Schedule analysis</button>
      </div>
    </div>
    <div class="fit-panel">
      ${renderFitDonut(fitBreakdown)}
      <p>${bundle.action}</p>
      <p class="fit-role-note"><strong>Signal roles:</strong> ${escapeHtml(allocationRoleSummary(adjustedAllocation))}</p>
    </div>
  `;
  const resultReviewDelay = document.getElementById("resultReviewDelay");
  if (resultReviewDelay) resultReviewDelay.value = String(bundleReviewDelay(preferences));
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
      <details class="fit-explanation">
        <summary>How this Fit score works</summary>
        <p>Fit measures how well this bundle matches your choices. It is not a performance forecast.</p>
        <div class="fit-formula-list">
          ${breakdown.pieces.map((piece) => `
            <span><b>${escapeHtml(piece.label)}</b><em>${Math.round(piece.value)}/100 x ${Math.round(piece.weight * 100)}% = ${piece.contribution.toFixed(1)} points</em></span>
          `).join("")}
        </div>
      </details>
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

function getBaseAdjustedAllocation(bundle, network = chooseBundleNetwork(bundle), preferences = getPreferences()) {
  const allocation = getNetworkSafeAllocation(getViciSwapAllocation(bundle, preferences, network), network);
  const machineAllocation = preferences.diversityEnabled
    ? normalizeAllocationWeights(getNetworkSafeAllocation(allocation.slice(0, Math.max(3, Math.min(preferences.coinCount, allocation.length))), network))
    : allocation;

  return normalizeEqualAllocationWeights(machineAllocation);
}

function allocationOverrideFingerprint(bundle, network, allocation) {
  return `${bundle?.id || "bundle"}:${network}:${allocation.map(([ticker]) => ticker).join(",")}`;
}

function getAdjustedAllocation(bundle, network = chooseBundleNetwork(bundle), preferences = getPreferences()) {
  const allocation = getBaseAdjustedAllocation(bundle, network, preferences);
  const fingerprint = allocationOverrideFingerprint(bundle, network, allocation);
  if (manualAllocationOverride && manualAllocationKey === fingerprint) {
    return manualAllocationOverride.map((item) => [...item]);
  }
  return allocation;
}

function clearManualAllocationOverride() {
  manualAllocationOverride = null;
  manualAllocationKey = "";
}

function rebalanceAllocation(ticker, requestedWeight) {
  if (!currentBundle) return;
  const preferences = getPreferences();
  const network = preferences.network;
  const base = getBaseAdjustedAllocation(currentBundle, network, preferences);
  const current = getAdjustedAllocation(currentBundle, network, preferences);
  const targetIndex = current.findIndex(([coin]) => coin === ticker);
  if (targetIndex < 0 || current.length < 2) return;
  const minimumOtherTotal = current.length - 1;
  const targetWeight = clamp(Math.round(Number(requestedWeight) || 1), 1, 100 - minimumOtherTotal);
  const otherIndexes = current.map((_, index) => index).filter((index) => index !== targetIndex);
  const currentOtherTotal = otherIndexes.reduce((sum, index) => sum + current[index][1], 0) || otherIndexes.length;
  const remaining = 100 - targetWeight;
  const shares = otherIndexes.map((index) => {
    const exact = remaining * (current[index][1] / currentOtherTotal);
    return { index, weight: Math.max(1, Math.floor(exact)), remainder: exact - Math.floor(exact) };
  });
  let assigned = shares.reduce((sum, item) => sum + item.weight, 0);
  while (assigned < remaining) {
    const item = [...shares].sort((a, b) => b.remainder - a.remainder || current[b.index][1] - current[a.index][1])[0];
    item.weight += 1;
    item.remainder = 0;
    assigned += 1;
  }
  while (assigned > remaining) {
    const item = [...shares].filter((entry) => entry.weight > 1).sort((a, b) => a.remainder - b.remainder || b.weight - a.weight)[0];
    if (!item) break;
    item.weight -= 1;
    assigned -= 1;
  }
  const shareByIndex = new Map(shares.map((item) => [item.index, item.weight]));
  manualAllocationOverride = current.map(([coin, weight, role, recommendedWeight], index) => [coin, index === targetIndex ? targetWeight : shareByIndex.get(index), role, recommendedWeight]);
  manualAllocationKey = allocationOverrideFingerprint(currentBundle, network, base);
  renderPrimary(currentBundle);
}

function getAllocationPlan(allocation, totalAmount = getPreferences().bundleAmount) {
  const preferences = safePreferences();
  const totalCents = Math.round(normalizeBundleAmount(totalAmount) * 100);
  const planned = allocation.map(([ticker, weight, role, recommendedWeight]) => {
    const exactCents = (totalCents * weight) / 100;
    const priceInfo = getCoinPriceInfo(ticker);
    return {
      ticker,
      weight,
      role,
      recommendedWeight: Math.round(finiteOrNull(recommendedWeight) || weight),
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

  return planned.map(({ ticker, weight, role, recommendedWeight, cents, price, priceSource, networks, dataScore, signalSummary }) => ({
    ticker,
    weight,
    role,
    recommendedWeight,
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

  const dataLabel = hasLiveVolume || livePrice ? "Live data" : "Cached estimate";
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

  allocationBars.innerHTML = `
    <div class="allocation-editor-head">
      <div><strong>ViciSwap equal split</strong><span>ViciSwap opens these coins evenly. The machine's suggested weighting is shown as guidance for manual reference.</span></div>
      <button type="button" data-reset-allocation>Reset</button>
    </div>
  ` + allocationPlan
    .map(({ ticker, weight, recommendedWeight, role, amount, quantity, price, priceSource, networks, signalSummary, thesisProfile, safetyProfile, bestFor }, index) => {
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
              <span class="allocation-token-title">
                <span>${ticker} - ${role}</span>
                ${bundleTokenFavoriteButton(ticker, selectedNetwork)}
              </span>
              <small>${networkText}</small>
              ${bestFor ? `<small>Best for ${escapeHtml(bestFor.label)} - ${escapeHtml(bestFor.fit)} with your target.</small>` : ""}
              ${thesisProfile ? `<small>${escapeHtml(thesisProfile.role)}: ${escapeHtml(thesisProfile.why)}</small>` : ""}
              <small>${signalSummary}</small>
              ${renderSafetyStrip(safetyProfile)}
            </span>
            <span class="allocation-value">
              <strong>${formatCurrency(amount)}</strong>
              <label class="allocation-weight-input"><input type="number" min="1" max="99" step="1" value="${weight}" data-allocation-weight="${ticker}" aria-label="${ticker} ViciSwap split percentage" /><span>% split</span></label>
              <span class="allocation-guidance">Machine suggests ${recommendedWeight}%</span>
              <span>${formatQuantity(quantity, ticker)}</span>
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

function coinPreferenceGroups(ticker) {
  const normalized = normalizeTicker(ticker);
  const groups = new Set(["base"]);
  const addWhenListed = (group, tickers) => {
    if (tickers.includes(normalized)) groups.add(group);
  };
  addWhenListed("core", ["USDC", "USDBC", "USDT", "USDT.E", "DAI", "USD", "USDS", "WETH", "ETH", "WBTC", "CBBTC", "CBETH", "EZETH", "WEETH", "WSTETH", "LBTC", "TBTC"]);
  addWhenListed("defi", ["AERO", "MORPHO", "AAVE", "UNI", "COMP", "PENDLE", "CRV", "CRVUSD", "GMX", "GNS", "VELO", "LDO", "DOLA", "DEGEN"]);
  addWhenListed("ai", ["VIRTUAL", "AIXBT", "KAITO", "TIBBIR", "CLANKER", "TAO", "RENDER", "FET"]);
  addWhenListed("rwa", ["ONDO", "PAXG", "XAUT0", "THBILL", "WTMSTR", "WTSPYM", "LINK", "MORPHO", "USDE", "SUSDE", "CBXRP", "CBBTC"]);
  addWhenListed("l2", ["ARB", "OP", "ZRO", "AERO", "VELO", "GMX", "GNS", "ETH", "WETH", "CBETH", "EZETH", "WEETH", "WSTETH"]);
  addWhenListed("vici", ["VCNT", "DAYS", "VSN", "VFY", "CHIP"]);
  addWhenListed("community", ["BRETT", "DEGEN", "TOSHI", "ZORA", "MOG", "DINO"]);
  addWhenListed("infrastructure", ["LINK", "ZRO", "ARB", "OP", "ETH", "WETH", "CBETH", "EZETH", "WEETH", "WSTETH", "AERO"]);
  if (groups.size === 1) groups.add("infrastructure");
  return groups;
}

function visibleCoinPreferenceTickers() {
  const network = safePreferences().network;
  const query = String(coinPreferenceSearch?.value || "").trim().toUpperCase();
  const category = coinPreferenceCategory?.value || "all";
  return getSupportedTickersForNetwork(network).filter((ticker) => {
    const matchesQuery = !query || ticker.includes(query) || String(tokenThesisForTicker(ticker)?.role || "").toUpperCase().includes(query);
    const matchesCategory = category === "all" || coinPreferenceGroups(ticker).has(category);
    return matchesQuery && matchesCategory;
  });
}

function syncCoinPreferenceFilterToFocus(focus, { clearSearch = true } = {}) {
  if (!coinPreferenceCategory) return;
  const supportedFocuses = new Set(["core", "defi", "ai", "rwa", "base", "l2", "vici"]);
  coinPreferenceCategory.value = supportedFocuses.has(focus) ? focus : "all";
  if (clearSearch && coinPreferenceSearch) coinPreferenceSearch.value = "";
  renderCoinPreferenceChips();
}

function renderSelectedCoinSummary() {
  if (!selectedCoinSummary) return;
  const supported = [...selectedCoinPreferences].filter((ticker) => isTickerOnNetwork(ticker, safePreferences().network));
  selectedCoinSummary.innerHTML = supported.length
    ? supported.map((ticker) => `<button type="button" data-remove-coin="${ticker}" aria-label="Remove ${ticker}">${ticker}<span aria-hidden="true">&times;</span></button>`).join("")
    : '<span>No preferred coins selected. The machine can search the full eligible list.</span>';
}

function renderCoinPreferenceChips() {
  if (!coinPreferenceGrid) return;
  const { network } = safePreferences();
  const tickers = visibleCoinPreferenceTickers();
  coinPreferenceGrid.innerHTML = tickers.length
    ? tickers.map((ticker) => {
      const id = `coin-${ticker.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      return `
        <input type="checkbox" id="${id}" name="coinPrefs" value="${ticker}" ${selectedCoinPreferences.has(ticker) ? "checked" : ""} />
        <label for="${id}" title="${ticker} is available on ${network}">${ticker}</label>
      `;
    }).join("")
    : `<p class="empty-chip-note">No supported coins match this filter.</p>`;
  renderSelectedCoinSummary();
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
          <td>
            <span class="coin-table-ticker">
              <strong>${escapeHtml(ticker)}</strong>
              ${bundleTokenFavoriteButton(ticker, network)}
            </span>
          </td>
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
    .map(({ ticker, weight, recommendedWeight, amount, quantity, networks }) => {
      const otherNetworks = (networks || []).filter((network) => network !== bundleNetwork);
      const networkNote = otherNetworks.length ? `${bundleNetwork}; also ${otherNetworks.join("/")}` : bundleNetwork;
      return `${ticker} ${weight}% ViciSwap split; machine suggests ${recommendedWeight}% (${formatCurrency(amount)}, ${formatQuantity(quantity, ticker)}, Receive: ${networkNote})`;
    })
    .join(", ");
  const tokenNotes = allocationRows
    .map(({ ticker, thesisProfile, signalSummary }) => {
      if (!thesisProfile) return `- ${ticker}: ${signalSummary}`;
      return `- ${ticker}: ${thesisProfile.role}. ${thesisProfile.why} Watch: ${thesisProfile.watch}`;
    })
    .join("\n");
  return `${bundle.name}: ${bundle.thesis}\n\nNetwork: ${bundleNetwork}\nTotal bundle value: ${formatCurrency(preferences.bundleAmount)}\n\nViciSwap handoff: coins open as an equal split. Bundle Builder's suggested weights are guidance for manual reference.\n\nAllocation guide: ${allocation}\n\nWhy these coins:\n${tokenNotes}\n\nWhy use it: ${bundle.action}\n\nBuilder note: ${bundle.vcPlan}\n\nRisk note: ${bundle.disclosure}\n\nAlways verify route, slippage, and token availability in ViciSwap before swapping.`;
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
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 3Z" /></svg>',
    starFilled: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 3Z" /></svg>',
    pencil: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" /></svg>',
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
  window.setTimeout(() => openTour(), 180);
}

function applyThemePreference(theme) {
  const normalized = theme === "dark" ? "dark" : "light";
  document.documentElement.classList.add("theme-is-transitioning");
  window.clearTimeout(applyThemePreference.transitionTimer);
  document.documentElement.dataset.theme = normalized;
  applyThemePreference.transitionTimer = window.setTimeout(() => {
    document.documentElement.classList.remove("theme-is-transitioning");
  }, 420);
  if (!themeToggle) return;
  const isDark = normalized === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Turn dark mode off" : "Turn dark mode on");
  const text = themeToggle.querySelector(".theme-toggle-text");
  if (text) text.textContent = isDark ? "Light Mode" : "Dark Mode";
}

function readThemePreference() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function toggleThemePreference() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyThemePreference(next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Theme still applies for the current session if browser storage is blocked.
  }
}

function readLocalArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeLocalArray(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast("Browser storage is unavailable, so this item could not be saved.");
  }
}

function readProfileSession() {
  try {
    const session = JSON.parse(localStorage.getItem(profileSessionStorageKey) || "{}");
    return session && typeof session === "object" ? session : {};
  } catch {
    return {};
  }
}

function saveProfileSession(session) {
  profileSession = session && typeof session === "object" ? session : {};
  try {
    if (profileSession.token) localStorage.setItem(profileSessionStorageKey, JSON.stringify(profileSession));
    else localStorage.removeItem(profileSessionStorageKey);
  } catch {
    // The local-only profile still works if session storage is blocked.
  }
}

function currentProfileSnapshot() {
  return {
    profile: readLocalProfile(),
    favoriteCoins: readLocalArray(favoriteCoinsStorageKey),
    recentBundles: readLocalArray(recentBundlesStorageKey),
    reviewAlerts: readLocalArray(reviewAlertsStorageKey),
    builderPreferences: readStoredBuilderPreferences(),
  };
}

function readStoredBuilderPreferences() {
  try {
    const preferences = JSON.parse(localStorage.getItem(builderPreferencesStorageKey) || "{}");
    return preferences && typeof preferences === "object" ? preferences : {};
  } catch {
    return {};
  }
}

function applyProfileSnapshot(snapshot = {}) {
  if (snapshot.profile) {
    try {
      localStorage.setItem(localProfileStorageKey, JSON.stringify(snapshot.profile));
    } catch {
      // Keep the current local profile if storage is blocked.
    }
  }
  if (Array.isArray(snapshot.favoriteCoins)) writeLocalArray(favoriteCoinsStorageKey, snapshot.favoriteCoins);
  if (Array.isArray(snapshot.recentBundles)) writeLocalArray(recentBundlesStorageKey, snapshot.recentBundles);
  if (Array.isArray(snapshot.reviewAlerts)) writeLocalArray(reviewAlertsStorageKey, snapshot.reviewAlerts);
  if (snapshot.builderPreferences && typeof snapshot.builderPreferences === "object") {
    try {
      localStorage.setItem(builderPreferencesStorageKey, JSON.stringify(snapshot.builderPreferences));
    } catch {
      // Preferences remain in memory for this session.
    }
  }
}

function mergeProfileSnapshot(localSnapshot = currentProfileSnapshot(), serverSnapshot = {}) {
  const localProfile = localSnapshot.profile || {};
  const serverProfile = serverSnapshot.profile || {};
  return {
    profile: {
      ...serverProfile,
      ...localProfile,
      displayName: localProfile.displayName || serverProfile.displayName || "",
    },
    favoriteCoins: mergeRecordArrays(serverSnapshot.favoriteCoins, localSnapshot.favoriteCoins, favoriteCoinRecordKey),
    recentBundles: mergeRecordArrays(serverSnapshot.recentBundles, localSnapshot.recentBundles, recentBundleRecordKey),
    reviewAlerts: mergeRecordArrays(serverSnapshot.reviewAlerts, localSnapshot.reviewAlerts, reviewAlertRecordKey),
    builderPreferences: {
      ...(serverSnapshot.builderPreferences || {}),
      ...(localSnapshot.builderPreferences || {}),
    },
  };
}

function mergeRecordArrays(serverItems = [], localItems = [], keyForItem = defaultRecordKey) {
  const merged = new Map();
  [...(Array.isArray(serverItems) ? serverItems : []), ...(Array.isArray(localItems) ? localItems : [])].forEach((item) => {
    if (!item || typeof item !== "object") return;
    const key = keyForItem(item);
    if (!key) return;
    const existing = merged.get(key);
    if (!existing || recordTimestamp(item) >= recordTimestamp(existing)) {
      merged.set(key, { ...existing, ...item });
    }
  });
  return [...merged.values()].slice(0, 100);
}

function favoriteCoinRecordKey(item = {}) {
  return item.key || `${normalizeNetwork(item.network)}:${normalizeTicker(item.ticker)}`;
}

function recentBundleRecordKey(item = {}) {
  return item.id || item.bundleId || `${item.name || item.customName || "bundle"}:${item.createdAt || ""}`;
}

function reviewAlertRecordKey(item = {}) {
  return item.id || `${item.snapshotId || item.bundleId || "alert"}:${item.dueAt || item.createdAt || ""}`;
}

function defaultRecordKey(item = {}) {
  return item.id || item.key || JSON.stringify(item).slice(0, 120);
}

function recordTimestamp(item = {}) {
  return Math.max(
    new Date(item.updatedAt || 0).getTime(),
    new Date(item.renamedAt || 0).getTime(),
    new Date(item.favoritedAt || 0).getTime(),
    new Date(item.addedAt || 0).getTime(),
    new Date(item.createdAt || 0).getTime(),
    new Date(item.dueAt || 0).getTime(),
    0,
  );
}

function hasMeaningfulProfileSnapshot(snapshot = {}) {
  return ["favoriteCoins", "recentBundles", "reviewAlerts"].some((key) => Array.isArray(snapshot[key]) && snapshot[key].length)
    || Boolean(snapshot.profile?.displayName)
    || Object.keys(snapshot.builderPreferences || {}).length > 0;
}

function isProfileSignedIn() {
  return Boolean(profileSession?.token);
}

function queueProfileSync() {
  if (!isProfileSignedIn()) {
    updateProfileLoginUi();
    return;
  }
  window.clearTimeout(profileSyncTimer);
  profileSyncTimer = window.setTimeout(() => pushProfileSnapshot().catch(() => {}), 650);
}

async function profileApi(path, options = {}) {
  const headers = { accept: "application/json", ...(options.headers || {}) };
  if (options.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
  if (profileSession?.token) headers.Authorization = `Bearer ${profileSession.token}`;
  const response = await fetch(path, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload;
}

async function requestProfileCode() {
  const email = String(profileEmail?.value || "").trim();
  if (!email) {
    showToast("Enter your email first.");
    return;
  }
  profileRequestCode.disabled = true;
  try {
    const payload = await profileApi("/api/v1/auth/request-code", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    profileLoginCode?.focus();
    showToast(payload.devCode ? `Dev login code: ${payload.devCode}` : "Check your email for the login code.");
    updateProfileLoginUi(payload.devCode ? `Dev code: ${payload.devCode}` : "Code sent. Check your email.");
  } catch (error) {
    showToast(error.message || "Could not send login code.");
  } finally {
    profileRequestCode.disabled = false;
  }
}

async function verifyProfileCode() {
  const email = String(profileEmail?.value || "").trim();
  const code = String(profileLoginCode?.value || "").trim();
  if (!email || !code) {
    showToast("Enter your email and code.");
    return;
  }
  profileVerifyCode.disabled = true;
  try {
    const payload = await profileApi("/api/v1/auth/verify-code", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
    saveProfileSession({
      token: payload.token,
      email: payload.profile?.email || email,
      profileId: payload.profile?.id || "",
      signedInAt: new Date().toISOString(),
    });
    const serverSnapshot = payload.profile?.snapshot || {};
    const mergedSnapshot = hasMeaningfulProfileSnapshot(serverSnapshot)
      ? mergeProfileSnapshot(currentProfileSnapshot(), serverSnapshot)
      : currentProfileSnapshot();
    applyProfileSnapshot(mergedSnapshot);
    await pushProfileSnapshot();
    renderProfile();
    updateFavoriteToggle();
    showToast("Profile signed in and synced.");
  } catch (error) {
    showToast(error.message || "Could not verify login code.");
  } finally {
    profileVerifyCode.disabled = false;
  }
}

async function loadProfileSnapshot({ silent = false } = {}) {
  if (!isProfileSignedIn()) return;
  try {
    const payload = await profileApi("/api/v1/profile");
    if (payload.profile?.snapshot) {
      const mergedSnapshot = mergeProfileSnapshot(currentProfileSnapshot(), payload.profile.snapshot);
      applyProfileSnapshot(mergedSnapshot);
      await pushProfileSnapshot();
    }
    renderProfile();
    updateFavoriteToggle();
    if (!silent) showToast("Profile synced across devices.");
  } catch (error) {
    showToast("Profile sync is offline; this device will keep saving locally.");
  }
}

async function pushProfileSnapshot() {
  if (!isProfileSignedIn() || profileSyncInFlight) return;
  profileSyncInFlight = true;
  updateProfileLoginUi("Syncing profile...");
  try {
    await profileApi("/api/v1/profile", {
      method: "PUT",
      body: JSON.stringify(currentProfileSnapshot()),
    });
    updateProfileLoginUi("Profile synced.");
  } catch {
    updateProfileLoginUi("Profile sync offline. Local changes are still saved.");
  } finally {
    profileSyncInFlight = false;
  }
}

function logoutProfile() {
  saveProfileSession({});
  if (profileLoginCode) profileLoginCode.value = "";
  renderProfile();
  showToast("Signed out. This browser will keep its local copy.");
}

function updateProfileLoginUi(message = "") {
  const signedIn = isProfileSignedIn();
  if (profileEmail) {
    profileEmail.value = signedIn ? profileSession.email || "" : profileEmail.value;
    profileEmail.disabled = signedIn;
  }
  if (profileLoginCode) {
    profileLoginCode.disabled = signedIn;
    if (signedIn) profileLoginCode.value = "";
  }
  if (profileLoginCodeGroup) profileLoginCodeGroup.hidden = signedIn;
  if (profileRequestCode) profileRequestCode.hidden = signedIn;
  if (profileVerifyCode) profileVerifyCode.hidden = signedIn;
  if (profileSignedInActions) profileSignedInActions.hidden = !signedIn;
  if (profileLogout) profileLogout.hidden = !signedIn;
  if (profileDialogSubtitle) {
    profileDialogSubtitle.textContent = signedIn
      ? "Recent bundles and review reminders sync to your Bundle Builder profile."
      : "Recent bundles and review reminders saved on this browser.";
  }
  if (profileSyncStatus) {
    profileSyncStatus.textContent = signedIn
      ? message || `Signed in as ${profileSession.email}. Favorites, bundles, and alerts sync to the Bundle Builder prototype DB.`
      : message || "Beta profile: data saves on this device until you sign in with email.";
  }
}

const profileStore = {
  readArray: readLocalArray,
  writeArray(key, value) {
    writeLocalArray(key, value);
    queueProfileSync();
  },
  readProfile: readLocalProfile,
  writeProfile(profile) {
    try {
      localStorage.setItem(localProfileStorageKey, JSON.stringify(profile));
      queueProfileSync();
      return true;
    } catch {
      showToast("This browser could not save the profile.");
      return false;
    }
  },
  descriptor() {
    return {
      mode: isProfileSignedIn() ? "email-profile-sync" : "browser-local",
      apiReady: true,
      note: isProfileSignedIn()
        ? "Profile data saves locally first, then syncs to the Bundle Builder prototype profile DB."
        : "Profile data is local until the user signs in with email.",
    };
  },
};

function readPulseSnapshots() {
  return readLocalArray(pulseSnapshotsStorageKey);
}

function writePulseSnapshots(snapshots = []) {
  writeLocalArray(pulseSnapshotsStorageKey, snapshots.slice(-pulseSnapshotHistoryLimit));
}

function saveLocalPulseSnapshot(snapshot = {}) {
  const normalized = normalizePulseSnapshot(snapshot);
  if (!normalized.coins.length) return null;
  const snapshots = readPulseSnapshots();
  const last = snapshots[snapshots.length - 1];
  if (last?.fingerprint === normalized.fingerprint) {
    snapshots[snapshots.length - 1] = richerPulseSnapshot(last, normalized);
  } else {
    snapshots.push(normalized);
  }
  writePulseSnapshots(snapshots);
  machineAccuracySummary = computeMachineAccuracySummary(snapshots);
  return normalized;
}

function richerPulseSnapshot(existing = {}, incoming = {}) {
  const existingScore = snapshotForecastPathScore(existing);
  const incomingScore = snapshotForecastPathScore(incoming);
  if (existingScore > incomingScore) {
    return {
      ...incoming,
      coins: (incoming.coins || []).map((coin) => {
        const prior = (existing.coins || []).find((item) => item.ticker === coin.ticker && (!coin.network || !item.network || item.network === coin.network));
        if (!prior) return coin;
        return snapshotForecastPathScore({ coins: [prior] }) > snapshotForecastPathScore({ coins: [coin] })
          ? { ...coin, forecastPaths: prior.forecastPaths }
          : coin;
      }),
    };
  }
  return incoming;
}

function normalizePulseSnapshot(snapshot = {}) {
  const createdAt = new Date(snapshot.createdAt || Date.now()).toISOString();
  const coins = Array.isArray(snapshot.coins)
    ? snapshot.coins.slice(0, 20).map(normalizePulseSnapshotCoin).filter((coin) => coin.ticker)
    : [];
  const network = normalizeNetwork(snapshot.network || safePreferences().network);
  const selectedWindow = String(snapshot.selectedWindow || selectedPulseWindow || "24h");
  const minuteBucket = createdAt.slice(0, 16);
  return {
    id: snapshot.id || `pulse-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt,
    source: snapshot.source || "live-market-pulse",
    network,
    selectedWindow,
    selectedReadWindow: String(snapshot.selectedReadWindow || selectedPulseReadWindow || "7d"),
    fingerprint: [minuteBucket, network, selectedWindow, coins.slice(0, 10).map((coin) => coin.ticker).join("|")].join(":"),
    coins,
  };
}

function normalizePulseSnapshotCoin(coin = {}) {
  return {
    ticker: normalizeTicker(coin.ticker),
    name: String(coin.name || "").trim().slice(0, 80),
    network: normalizeNetwork(coin.network || safePreferences().network),
    rank: finiteOrNull(coin.rank),
    priceUsd: finiteOrNull(coin.priceUsd),
    change24h: finiteOrNull(coin.change24h),
    change7d: finiteOrNull(coin.change7d),
    change30d: finiteOrNull(coin.change30d),
    volume24h: finiteOrNull(coin.volume24h),
    liquidityUsd: finiteOrNull(coin.liquidityUsd),
    bullishScore: finiteOrNull(coin.bullishScore),
    projected24hChange: finiteOrNull(coin.projected24hChange),
    projected7dChange: finiteOrNull(coin.projected7dChange),
    projected30dChange: finiteOrNull(coin.projected30dChange),
    forecastPaths: normalizePulseForecastPaths(coin.forecastPaths),
    action: String(coin.action || "").slice(0, 40),
    setupLabel: String(coin.setupLabel || "").slice(0, 80),
    edgeLabel: String(coin.edgeLabel || "").slice(0, 80),
    source: String(coin.source || "").slice(0, 60),
  };
}

function normalizePulseForecastPaths(input = {}) {
  return {
    next24h: compactForecastPath(input.next24h),
    next7d: compactForecastPath(input.next7d),
    next30d: compactForecastPath(input.next30d || input.next1mo),
  };
}

function compactForecastPath(input = []) {
  const series = normalizePriceSeries(input);
  if (!series.length) return [];
  const sampled = samplePriceSeries(series, 64);
  return sampled.map((value) => roundTo(value, 6));
}

function buildPulseSnapshotPayload(favorites = currentFavorites) {
  const network = safePreferences().network;
  return normalizePulseSnapshot({
    createdAt: new Date().toISOString(),
    source: "live-market-pulse",
    network,
    selectedWindow: selectedPulseWindow,
    selectedReadWindow: selectedPulseReadWindow,
    coins: (Array.isArray(favorites) ? favorites : []).slice(0, 10).map((favorite, index) => pulseSnapshotCoin(favorite, index)),
  });
}

function pulseSnapshotCoin(favorite = {}, index = 0) {
  const read = forwardScenarioCoinRead(favorite, selectedPulseReadWindow || "7d");
  const scenario24h = projectedPulseScenario(favorite, "next24h");
  const scenario7d = projectedPulseScenario(favorite, "next7d");
  const scenario30d = projectedPulseScenario(favorite, "next1mo");
  return {
    ticker: favorite.ticker,
    name: favorite.name,
    network: favorite.network || safePreferences().network,
    rank: finiteOrNull(favorite.rank) || index + 1,
    priceUsd: currentPulsePrice(favorite),
    change24h: finiteOrNull(favorite.change24h),
    change7d: finiteOrNull(favorite.change7d),
    change30d: finiteOrNull(favorite.change30d),
    volume24h: finiteOrNull(favorite.volume24h ?? favorite.total_volume),
    liquidityUsd: finiteOrNull(favorite.liquidityUsd),
    bullishScore: finiteOrNull(read.score),
    projected24hChange: finiteOrNull(scenario24h.projectedChange),
    projected7dChange: finiteOrNull(scenario7d.projectedChange),
    projected30dChange: finiteOrNull(scenario30d.projectedChange),
    forecastPaths: {
      next24h: compactForecastPath(scenario24h.projectedPrices),
      next7d: compactForecastPath(scenario7d.projectedPrices),
      next30d: compactForecastPath(scenario30d.projectedPrices),
    },
    action: read.action || read.label || "",
    setupLabel: favorite.marketSetup?.label || favorite.setupLabel || "",
    edgeLabel: favorite.marketEdge?.label || favorite.edgeLabel || "",
    source: favorite.source || "",
  };
}

function currentPulsePrice(favorite = {}) {
  const direct = finiteOrNull(favorite.priceUsd ?? favorite.currentPrice ?? favorite.price);
  if (direct) return direct;
  const prices = normalizePriceSeries(favorite.windowPrices?.["24h"] || favorite.prices);
  return finiteOrNull(prices[prices.length - 1]);
}

async function logPulseSnapshot(favorites = currentFavorites, { attempt = 0, reason = "pulse-refresh" } = {}) {
  const targetFavorites = Array.isArray(favorites) ? favorites : currentFavorites;
  if (attempt < 2) {
    const preview = buildPulseSnapshotPayload(targetFavorites);
    if (preview.coins.length && snapshotForecastPathScore(preview) === 0) {
      warmSnapshotForecastInputs(targetFavorites);
      window.setTimeout(() => logPulseSnapshot(currentFavorites, { attempt: attempt + 1, reason: `${reason}-retry` }), attempt ? 5000 : 2200);
      return;
    }
  }
  const payload = buildPulseSnapshotPayload(favorites);
  if (!payload.coins.length) return;
  payload.reason = reason;
  if (window.location.protocol === "file:") {
    saveLocalPulseSnapshot(payload);
    renderMachineAccuracy();
    return;
  }
  try {
    const response = await fetch("/api/v1/pulse-snapshots", {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.accuracy) {
      machineAccuracySummary = data.accuracy;
      if (data.storage) machineAccuracyStorage = data.storage;
      renderMachineAccuracy();
    }
  } catch {
    saveLocalPulseSnapshot(payload);
    renderMachineAccuracy();
  }
}

function snapshotForecastPathScore(snapshot = {}) {
  return (snapshot.coins || []).reduce((sum, coin) => {
    const paths = coin.forecastPaths || {};
    return sum
      + (Array.isArray(paths.next24h) ? paths.next24h.length : 0)
      + (Array.isArray(paths.next7d) ? paths.next7d.length : 0)
      + (Array.isArray(paths.next30d) ? paths.next30d.length : 0);
  }, 0);
}

function warmSnapshotForecastInputs(favorites = currentFavorites) {
  (Array.isArray(favorites) ? favorites : [])
    .slice(0, 6)
    .forEach((favorite) => {
      if (!favorite?.ticker || favorite.ticker === "--") return;
      if (!hasLivePulseChart(favorite)) {
        loadPulseChart(favorite).then(applyLoadedPulseCandidate).catch(() => null);
      }
      ["24h", "7d", "1mo"].forEach((key) => ensurePulseWindowChart(favorite, key));
    });
}

async function loadMachineAccuracySummary() {
  if (window.location.protocol === "file:") {
    machineAccuracySummary = computeMachineAccuracySummary(readPulseSnapshots());
    renderMachineAccuracy();
    return;
  }
  try {
    const response = await fetch("/api/v1/machine-accuracy", { headers: { accept: "application/json" } });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.accuracy) {
      machineAccuracySummary = data.accuracy;
      if (data.storage) machineAccuracyStorage = data.storage;
    }
  } catch {
    machineAccuracySummary = computeMachineAccuracySummary(readPulseSnapshots());
  }
  renderMachineAccuracy();
}

function computeMachineAccuracySummary(snapshots = []) {
  const normalized = (Array.isArray(snapshots) ? snapshots : []).map(normalizePulseSnapshot).filter((snapshot) => snapshot.coins.length);
  const latest = normalized[normalized.length - 1];
  return {
    totalSnapshots: normalized.length,
    totalCoins: normalized.reduce((sum, snapshot) => sum + snapshot.coins.length, 0),
    latestSnapshotAt: latest?.createdAt || "",
    latestRunCoins: latest?.coins.slice(0, 5) || [],
    topCoinsBySnapshots: summarizePulseSnapshotCoins(normalized),
    horizons: [
      pulseOutcomeForHorizon(normalized, "24h", 24 * 60 * 60 * 1000, "projected24hChange"),
      pulseOutcomeForHorizon(normalized, "7d", 7 * 24 * 60 * 60 * 1000, "projected7dChange"),
      pulseOutcomeForHorizon(normalized, "30d", 30 * 24 * 60 * 60 * 1000, "projected30dChange"),
    ],
    deepDive24h: pulseDeepDiveForHorizon(normalized, "24h", 24 * 60 * 60 * 1000, "projected24hChange"),
    pathAccuracy: [
      pulsePathAccuracyForHorizon(normalized, "Next 24h", 24 * 60 * 60 * 1000, "next24h"),
      pulsePathAccuracyForHorizon(normalized, "Next 7d", 7 * 24 * 60 * 60 * 1000, "next7d"),
      pulsePathAccuracyForHorizon(normalized, "Next 1M", 30 * 24 * 60 * 60 * 1000, "next30d"),
    ],
    partialPathAccuracy: [
      pulsePartialPathAccuracyForHorizon(normalized, "Next 24h", 24 * 60 * 60 * 1000, "next24h"),
      pulsePartialPathAccuracyForHorizon(normalized, "Next 7d", 7 * 24 * 60 * 60 * 1000, "next7d"),
      pulsePartialPathAccuracyForHorizon(normalized, "Next 1M", 30 * 24 * 60 * 60 * 1000, "next30d"),
    ],
  };
}

function pulseOutcomeForHorizon(snapshots, label, horizonMs, projectedKey) {
  let checked = 0;
  let correct = 0;
  let pending = 0;
  snapshots.forEach((snapshot) => {
    const startTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(startTime)) return;
    snapshot.coins.forEach((coin) => {
      const startPrice = finiteOrNull(coin.priceUsd);
      const projectedChange = finiteOrNull(coin[projectedKey]);
      if (!startPrice || projectedChange === null) return;
      const future = findFuturePulseCoin(snapshots, coin, startTime + horizonMs);
      if (!future) {
        pending += 1;
        return;
      }
      const endPrice = finiteOrNull(future.priceUsd);
      if (!endPrice) return;
      const actualChange = ((endPrice - startPrice) / startPrice) * 100;
      checked += 1;
      if (pulseDirectionMatches(projectedChange, actualChange)) correct += 1;
    });
  });
  return {
    label,
    checked,
    pending,
    directionAccuracy: checked ? Math.round((correct / checked) * 100) : null,
    status: checked ? "Tracking" : "Collecting",
  };
}

function pulseDeepDiveForHorizon(snapshots, label, horizonMs, projectedKey) {
  const outcomes = [];
  snapshots.forEach((snapshot) => {
    const startTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(startTime)) return;
    snapshot.coins.forEach((coin) => {
      const startPrice = finiteOrNull(coin.priceUsd);
      const projectedChange = finiteOrNull(coin[projectedKey]);
      if (!startPrice || projectedChange === null) return;
      const future = findFuturePulseCoin(snapshots, coin, startTime + horizonMs);
      if (!future) return;
      const endPrice = finiteOrNull(future.priceUsd);
      if (!endPrice) return;
      const actualChange = ((endPrice - startPrice) / startPrice) * 100;
      outcomes.push({
        ticker: coin.ticker,
        rank: coin.rank,
        startAt: snapshot.createdAt,
        startPrice,
        endPrice,
        projectedChange: roundTo(projectedChange, 2),
        actualChange: roundTo(actualChange, 2),
        error: roundTo(actualChange - projectedChange, 2),
        absoluteError: roundTo(Math.abs(actualChange - projectedChange), 2),
        directionCorrect: pulseDirectionMatches(projectedChange, actualChange),
        bullishScore: coin.bullishScore,
        volume24h: coin.volume24h,
        liquidityUsd: coin.liquidityUsd,
        action: coin.action,
        setupLabel: coin.setupLabel,
        edgeLabel: coin.edgeLabel,
      });
    });
  });
  const missedUpside = outcomes.filter((item) => item.actualChange >= 4 && item.projectedChange < item.actualChange / 2);
  const falseBearish = outcomes.filter((item) => item.projectedChange < -0.25 && item.actualChange > 2);
  return {
    label,
    checked: outcomes.length,
    directionAccuracy: outcomes.length ? Math.round((outcomes.filter((item) => item.directionCorrect).length / outcomes.length) * 100) : null,
    averageProjectedChange: roundTo(averageValue(outcomes, (item) => item.projectedChange), 2),
    averageActualChange: roundTo(averageValue(outcomes, (item) => item.actualChange), 2),
    averageError: roundTo(averageValue(outcomes, (item) => item.error), 2),
    meanAbsoluteError: roundTo(averageValue(outcomes, (item) => item.absoluteError), 2),
    missedUpsideCount: missedUpside.length,
    falseBearishCount: falseBearish.length,
    byTicker: summarizePulseOutcomes(outcomes, "ticker"),
    byAction: summarizePulseOutcomes(outcomes, "action"),
    byRank: summarizePulseOutcomes(outcomes, (item) => item.rank ? `#${item.rank}` : "unranked"),
    biggestMisses: outcomes.slice().sort((a, b) => b.absoluteError - a.absoluteError).slice(0, 5),
    bestCalls: outcomes.slice().sort((a, b) => a.absoluteError - b.absoluteError).slice(0, 5),
    lessons: pulseMachineLessons(outcomes, missedUpside, falseBearish),
  };
}

function summarizePulseOutcomes(outcomes, keyForItem) {
  const groups = new Map();
  outcomes.forEach((item) => {
    const key = typeof keyForItem === "function" ? keyForItem(item) : item[keyForItem];
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  return [...groups.entries()].map(([key, items]) => ({
    key,
    count: items.length,
    directionAccuracy: Math.round((items.filter((item) => item.directionCorrect).length / items.length) * 100),
    averageProjectedChange: roundTo(averageValue(items, (item) => item.projectedChange), 2),
    averageActualChange: roundTo(averageValue(items, (item) => item.actualChange), 2),
    meanAbsoluteError: roundTo(averageValue(items, (item) => item.absoluteError), 2),
  })).sort((a, b) => b.count - a.count || b.meanAbsoluteError - a.meanAbsoluteError).slice(0, 8);
}

function pulsePathAccuracyForHorizon(snapshots, label, horizonMs, pathKey) {
  const outcomes = [];
  snapshots.forEach((snapshot) => {
    const startTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(startTime)) return;
    snapshot.coins.forEach((coin) => {
      const forecastPath = Array.isArray(coin.forecastPaths?.[pathKey]) ? coin.forecastPaths[pathKey] : [];
      if (forecastPath.length < 4) return;
      const actualPath = actualPulsePathForCoin(snapshots, coin, startTime, startTime + horizonMs, forecastPath.length);
      if (actualPath.length < 4) return;
      const forecast = normalizePathShape(forecastPath);
      const actual = normalizePathShape(actualPath);
      if (forecast.length < 4 || actual.length < 4) return;
      const shapeError = meanAbsolutePathError(forecast, actual);
      const directionAgreement = pulsePathDirectionAgreement(forecast, actual);
      const endpointError = Math.abs((forecast.at(-1) || 0) - (actual.at(-1) || 0));
      outcomes.push({
        ticker: coin.ticker,
        rank: coin.rank,
        startAt: snapshot.createdAt,
        shapeScore: strictPulsePathScore(forecast, actual, shapeError, directionAgreement, endpointError),
        directionAgreement: Math.round(directionAgreement * 100),
        endpointError: roundTo(endpointError * 100, 1),
      });
    });
  });
  return {
    label,
    checked: outcomes.length,
    averageShapeScore: outcomes.length ? Math.round(averageValue(outcomes, (item) => item.shapeScore)) : null,
    averageDirectionAgreement: outcomes.length ? Math.round(averageValue(outcomes, (item) => item.directionAgreement)) : null,
    averageEndpointError: outcomes.length ? roundTo(averageValue(outcomes, (item) => item.endpointError), 1) : null,
    weakest: outcomes.slice().sort((a, b) => a.shapeScore - b.shapeScore).slice(0, 5),
    strongest: outcomes.slice().sort((a, b) => b.shapeScore - a.shapeScore).slice(0, 5),
  };
}

function pulsePartialPathAccuracyForHorizon(snapshots, label, horizonMs, pathKey) {
  const latestTime = Math.max(...snapshots.map((snapshot) => new Date(snapshot.createdAt).getTime()).filter(Number.isFinite));
  const outcomes = [];
  snapshots.forEach((snapshot) => {
    const startTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(startTime) || !Number.isFinite(latestTime) || latestTime <= startTime) return;
    snapshot.coins.forEach((coin) => {
      const forecastPath = Array.isArray(coin.forecastPaths?.[pathKey]) ? coin.forecastPaths[pathKey] : [];
      if (forecastPath.length < 4) return;
      const endTime = Math.min(latestTime, startTime + horizonMs);
      const actualPoints = actualPulsePointsForCoin(snapshots, coin, startTime, endTime);
      if (actualPoints.length < 2) return;
      const elapsedRatio = clamp((actualPoints.at(-1).time - startTime) / horizonMs, 0.002, 1);
      const forecastPointCount = Math.max(2, Math.min(forecastPath.length, Math.round((forecastPath.length - 1) * elapsedRatio) + 1));
      const forecastSegment = samplePriceSeries(forecastPath.slice(0, forecastPointCount), actualPoints.length);
      const actualSegment = actualPoints.map((point) => point.price);
      const forecast = normalizePathShape(forecastSegment);
      const actual = normalizePathShape(actualSegment);
      if (forecast.length < 2 || actual.length < 2) return;
      const shapeError = meanAbsolutePathError(forecast, actual);
      const directionAgreement = pulsePathDirectionAgreement(forecast, actual);
      const endpointError = Math.abs((forecast.at(-1) || 0) - (actual.at(-1) || 0));
      outcomes.push({
        ticker: coin.ticker,
        rank: coin.rank,
        startAt: snapshot.createdAt,
        elapsedMinutes: Math.round((actualPoints.at(-1).time - startTime) / 60000),
        actualPoints: actualPoints.length,
        shapeScore: strictPulsePathScore(forecast, actual, shapeError, directionAgreement, endpointError),
        directionAgreement: Math.round(directionAgreement * 100),
        endpointError: roundTo(endpointError * 100, 1),
      });
    });
  });
  return {
    label,
    checked: outcomes.length,
    averageShapeScore: outcomes.length ? Math.round(averageValue(outcomes, (item) => item.shapeScore)) : null,
    averageDirectionAgreement: outcomes.length ? Math.round(averageValue(outcomes, (item) => item.directionAgreement)) : null,
    averageEndpointError: outcomes.length ? roundTo(averageValue(outcomes, (item) => item.endpointError), 1) : null,
    averageElapsedMinutes: outcomes.length ? Math.round(averageValue(outcomes, (item) => item.elapsedMinutes)) : null,
    weakest: outcomes.slice().sort((a, b) => a.shapeScore - b.shapeScore).slice(0, 5),
    strongest: outcomes.slice().sort((a, b) => b.shapeScore - a.shapeScore).slice(0, 5),
  };
}

function actualPulsePathForCoin(snapshots, coin, startTime, endTime, targetLength) {
  const points = actualPulsePointsForCoin(snapshots, coin, startTime, endTime);
  return samplePriceSeries(points.map((point) => point.price), Math.min(Math.max(targetLength, 8), 64));
}

function actualPulsePointsForCoin(snapshots, coin, startTime, endTime) {
  const points = [];
  snapshots.forEach((snapshot) => {
    const snapshotTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(snapshotTime) || snapshotTime < startTime || snapshotTime > endTime) return;
    const match = snapshot.coins.find((futureCoin) => futureCoin.ticker === coin.ticker
      && (!coin.network || !futureCoin.network || futureCoin.network === coin.network));
    const price = finiteOrNull(match?.priceUsd);
    if (price) points.push({ time: snapshotTime, price });
  });
  const uniquePoints = [];
  points.sort((a, b) => a.time - b.time).forEach((point) => {
    if (!uniquePoints.length || uniquePoints.at(-1).time !== point.time) uniquePoints.push(point);
  });
  return uniquePoints;
}

function normalizePathShape(values = []) {
  const series = normalizePriceSeries(values);
  if (series.length < 2 || !series[0]) return [];
  const start = series[0];
  return series.map((value) => roundTo((value - start) / start, 5));
}

function meanAbsolutePathError(a = [], b = []) {
  const length = Math.min(a.length, b.length);
  if (!length) return 0;
  let total = 0;
  for (let index = 0; index < length; index += 1) {
    total += Math.abs((a[index] || 0) - (b[index] || 0));
  }
  return total / length;
}

function pulsePathDirectionAgreement(a = [], b = []) {
  const length = Math.min(a.length, b.length);
  if (length < 2) return 0;
  let checks = 0;
  let matches = 0;
  for (let index = 1; index < length; index += 1) {
    const da = (a[index] || 0) - (a[index - 1] || 0);
    const db = (b[index] || 0) - (b[index - 1] || 0);
    if (Math.abs(da) < 0.002 && Math.abs(db) < 0.002) continue;
    checks += 1;
    if ((da >= 0 && db >= 0) || (da < 0 && db < 0)) matches += 1;
  }
  return checks ? matches / checks : 0;
}

function strictPulsePathScore(forecast = [], actual = [], shapeError = 0, directionAgreement = 0, endpointError = 0) {
  const forecastEnd = forecast.at(-1) || 0;
  const actualEnd = actual.at(-1) || 0;
  const bothFlat = Math.abs(forecastEnd) < 0.003 && Math.abs(actualEnd) < 0.003;
  const finalDirectionMatches = bothFlat || (forecastEnd >= 0 && actualEnd >= 0) || (forecastEnd < 0 && actualEnd < 0);
  const turnScore = clamp(pulsePathTurnAgreement(forecast, actual) * 100, 0, 100);
  const shapeScore = clamp(100 - shapeError * 320, 0, 100);
  const directionScore = clamp(directionAgreement * 100, 0, 100);
  const endpointScore = clamp(100 - endpointError * 520, 0, 100);
  let score = directionScore * 0.42 + endpointScore * 0.26 + shapeScore * 0.2 + turnScore * 0.12;
  if (!finalDirectionMatches) score = Math.min(score, 45);
  if (directionScore < 35) score = Math.min(score, 45);
  if (directionScore < 50) score = Math.min(score, 58);
  if (directionScore < 65) score = Math.min(score, 72);
  if (endpointError > 0.08) score = Math.min(score, 55);
  if (endpointError > 0.04) score = Math.min(score, 72);
  if (turnScore < 35) score = Math.min(score, 65);
  return Math.round(clamp(score, 0, 100));
}

function pulsePathTurnAgreement(a = [], b = []) {
  const length = Math.min(a.length, b.length);
  if (length < 3) return 0;
  let checks = 0;
  let matches = 0;
  for (let index = 2; index < length; index += 1) {
    const turnA = Math.sign(((a[index] || 0) - (a[index - 1] || 0)) - ((a[index - 1] || 0) - (a[index - 2] || 0)));
    const turnB = Math.sign(((b[index] || 0) - (b[index - 1] || 0)) - ((b[index - 1] || 0) - (b[index - 2] || 0)));
    if (!turnA && !turnB) continue;
    checks += 1;
    if (turnA === turnB) matches += 1;
  }
  return checks ? matches / checks : 0;
}

function pulseMachineLessons(outcomes, missedUpside, falseBearish) {
  if (!outcomes.length) return ["Collecting enough 24h outcomes to compare projected move size against actual move size."];
  const lessons = [];
  const underPrediction = averageValue(outcomes, (item) => item.error);
  if (underPrediction > 3) {
    lessons.push("Projected percentages are too timid when the Base market starts moving together.");
  } else if (underPrediction < -3) {
    lessons.push("Projected percentages are too aggressive; continuation needs stricter confirmation.");
  }
  if (falseBearish.length) {
    lessons.push(`False bearish calls: ${uniqueValues(falseBearish.map((item) => item.ticker)).slice(0, 4).join(", ")}.`);
  }
  if (missedUpside.length) {
    lessons.push(`Missed upside: ${uniqueValues(missedUpside.map((item) => item.ticker)).slice(0, 4).join(", ")}. Watch for “quiet but coiled” instead of flattening the read.`);
  }
  const worstTicker = summarizePulseOutcomes(outcomes, "ticker")[0];
  if (worstTicker) lessons.push(`${worstTicker.key} has the largest average miss size in this sample.`);
  return lessons.slice(0, 4);
}

function averageValue(items, valueForItem) {
  if (!items.length) return 0;
  return items.reduce((sum, item) => sum + (finiteOrNull(valueForItem(item)) || 0), 0) / items.length;
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function findFuturePulseCoin(snapshots, coin, targetTime) {
  for (const snapshot of snapshots) {
    const snapshotTime = new Date(snapshot.createdAt).getTime();
    if (!Number.isFinite(snapshotTime) || snapshotTime < targetTime) continue;
    const match = snapshot.coins.find((futureCoin) => futureCoin.ticker === coin.ticker
      && (!coin.network || !futureCoin.network || futureCoin.network === coin.network));
    if (match) return match;
  }
  return null;
}

function pulseDirectionMatches(projectedChange, actualChange) {
  if (Math.abs(projectedChange) < 1 && Math.abs(actualChange) < 1.5) return true;
  if (projectedChange >= 0 && actualChange >= 0) return true;
  return projectedChange < 0 && actualChange < 0;
}

function summarizePulseSnapshotCoins(snapshots = []) {
  const counts = new Map();
  snapshots.forEach((snapshot) => {
    snapshot.coins.slice(0, 10).forEach((coin) => {
      if (!coin.ticker) return;
      const existing = counts.get(coin.ticker) || { ticker: coin.ticker, count: 0, rankTotal: 0 };
      existing.count += 1;
      existing.rankTotal += finiteOrNull(coin.rank) || 10;
      counts.set(coin.ticker, existing);
    });
  });
  return [...counts.values()]
    .map((item) => ({ ...item, averageRank: Math.round((item.rankTotal / item.count) * 10) / 10 }))
    .sort((a, b) => b.count - a.count || a.averageRank - b.averageRank)
    .slice(0, 5);
}

function renderMachineAccuracy() {
  if (!profileMachineAccuracy) return;
  const summary = machineAccuracySummary || computeMachineAccuracySummary(readPulseSnapshots());
  const storage = machineAccuracyStorage || {};
  const horizons = Array.isArray(summary.horizons) ? summary.horizons : [];
  const latestCoins = Array.isArray(summary.latestRunCoins) ? summary.latestRunCoins : [];
  const topCoins = Array.isArray(summary.topCoinsBySnapshots) ? summary.topCoinsBySnapshots : [];
  const deepDive = summary.deepDive24h || {};
  const biggestMisses = Array.isArray(deepDive.biggestMisses) ? deepDive.biggestMisses : [];
  const bestCalls = Array.isArray(deepDive.bestCalls) ? deepDive.bestCalls : [];
  const lessons = Array.isArray(deepDive.lessons) ? deepDive.lessons : [];
  const pathAccuracy = Array.isArray(summary.pathAccuracy) ? summary.pathAccuracy : [];
  const partialPathAccuracy = Array.isArray(summary.partialPathAccuracy) ? summary.partialPathAccuracy : [];
  const storageWarning = storage.warning ? `
    <div class="machine-storage-warning">
      <b>Storage check</b>
      <span>${escapeHtml(storage.warning)}</span>
    </div>
  ` : "";
  const storageDetail = storage.path ? `
    <small>Storage: ${escapeHtml(storage.path)}${storage.backupPath ? ` · Backup: ${escapeHtml(storage.backupPath)}` : ""}</small>
  ` : "";
  const exportAction = window.location.protocol === "file:" ? "" : `
    <div class="machine-accuracy-actions">
      <a class="machine-export-link" href="/api/v1/pulse-snapshots/export" target="_blank" rel="noopener">Export snapshot backup</a>
    </div>
  `;
  profileMachineAccuracy.innerHTML = `
    ${exportAction}
    ${storageWarning}
    <div class="machine-accuracy-grid">
      <div><strong>${summary.totalSnapshots || 0}</strong><span>Pulse runs saved</span></div>
      ${horizons.map((item) => `
        <div>
          <strong>${item.directionAccuracy === null || item.directionAccuracy === undefined ? "Collecting" : `${item.directionAccuracy}%`}</strong>
          <span>${escapeHtml(item.label)} direction · ${Number(item.checked || 0)} checked</span>
        </div>
      `).join("")}
    </div>
    <p>${summary.totalSnapshots ? "The machine is saving each Live Market Pulse run and will compare later prices against its 24h, 7d, and 30d projections as new snapshots arrive." : "Open or refresh Live Market Pulse to start collecting prediction history."}</p>
    ${deepDive.checked ? `
      <div class="machine-deep-grid">
        <div><strong>${formatPercent(deepDive.averageProjectedChange || 0)}</strong><span>Avg projected 24h</span></div>
        <div><strong>${formatPercent(deepDive.averageActualChange || 0)}</strong><span>Avg actual 24h</span></div>
        <div><strong>${formatPercent(deepDive.meanAbsoluteError || 0)}</strong><span>Avg miss size</span></div>
        <div><strong>${Number(deepDive.missedUpsideCount || 0)}</strong><span>Missed upside calls</span></div>
      </div>
      <div class="machine-call-lists">
        <div>
          <b>Largest misses</b>
          ${biggestMisses.length ? biggestMisses.map((item) => machineOutcomeRow(item)).join("") : "<small>No completed misses yet.</small>"}
        </div>
        <div>
          <b>Best calibrated calls</b>
          ${bestCalls.length ? bestCalls.map((item) => machineOutcomeRow(item)).join("") : "<small>No completed calls yet.</small>"}
        </div>
      </div>
      ${lessons.length ? `<div class="machine-lessons"><b>What the machine should learn</b>${lessons.map((lesson) => `<small>${escapeHtml(lesson)}</small>`).join("")}</div>` : ""}
    ` : ""}
    ${pathAccuracy.length ? `
      <div class="machine-path-accuracy">
        <b>Forecast graph accuracy</b>
        <div class="machine-path-grid">
          ${pathAccuracy.map((item) => `
            <div>
              <strong>${item.averageShapeScore === null || item.averageShapeScore === undefined ? "Collecting" : `${item.averageShapeScore}/100`}</strong>
              <span>${escapeHtml(item.label)} shape · ${Number(item.checked || 0)} checked</span>
              ${item.averageDirectionAgreement === null || item.averageDirectionAgreement === undefined ? "" : `<small>${item.averageDirectionAgreement}% move-direction match · ${formatPercent(item.averageEndpointError || 0)} endpoint miss</small>`}
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
    ${partialPathAccuracy.length ? `
      <div class="machine-path-accuracy">
        <b>Live path learning</b>
        <div class="machine-path-grid">
          ${partialPathAccuracy.map((item) => `
            <div>
              <strong>${item.averageShapeScore === null || item.averageShapeScore === undefined ? "Collecting" : `${item.averageShapeScore}/100`}</strong>
              <span>${escapeHtml(item.label)} partial path · ${Number(item.checked || 0)} checked</span>
              ${item.averageDirectionAgreement === null || item.averageDirectionAgreement === undefined ? "" : `<small>${item.averageDirectionAgreement}% move-direction match · ${formatPercent(item.averageEndpointError || 0)} endpoint miss · avg ${Number(item.averageElapsedMinutes || 0)}m watched</small>`}
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
    ${latestCoins.length ? `<small>Latest saved: ${escapeHtml(latestCoins.map((coin) => coin.ticker).join(", "))}${summary.latestSnapshotAt ? ` · ${escapeHtml(formatDateTime(summary.latestSnapshotAt))}` : ""}</small>` : ""}
    ${topCoins.length ? `<small>Most tracked: ${escapeHtml(topCoins.map((coin) => `${coin.ticker} (${coin.count})`).join(", "))}</small>` : ""}
    ${storageDetail}
  `;
}

function machineOutcomeRow(item = {}) {
  return `
    <small class="machine-outcome-row">
      <span><b>${escapeHtml(item.ticker || "--")}</b> ${item.rank ? `#${escapeHtml(item.rank)}` : ""}</span>
      <span>projected ${escapeHtml(formatPercent(item.projectedChange || 0))}</span>
      <span>actual ${escapeHtml(formatPercent(item.actualChange || 0))}</span>
      <span>miss ${escapeHtml(formatPercent(item.absoluteError || 0))}</span>
    </small>
  `;
}

function readRecentBundles() {
  return profileStore.readArray(recentBundlesStorageKey);
}

function bundleDisplayName(bundle = {}) {
  return String(bundle.customName || bundle.name || "Bundle Builder allocation").trim();
}

function updateRecentBundleRecord(snapshotId, updater) {
  if (!snapshotId) return null;
  let updatedRecord = null;
  const next = readRecentBundles().map((bundle) => {
    if (bundle.id !== snapshotId) return bundle;
    updatedRecord = updater({ ...bundle });
    return updatedRecord;
  });
  profileStore.writeArray(recentBundlesStorageKey, next);
  renderProfile();
  return updatedRecord;
}

function toggleFavoriteBundle(snapshotId) {
  const updated = updateRecentBundleRecord(snapshotId, (bundle) => ({
    ...bundle,
    favorite: !bundle.favorite,
    favoritedAt: !bundle.favorite ? new Date().toISOString() : "",
  }));
  if (updated) showToast(updated.favorite ? `${bundleDisplayName(updated)} saved as a favorite bundle.` : `${bundleDisplayName(updated)} removed from favorite bundles.`);
}

function renameRecentBundle(snapshotId) {
  const bundle = readRecentBundles().find((item) => item.id === snapshotId);
  if (!bundle) return;
  editingBundleNameId = snapshotId;
  renderProfile();
  requestAnimationFrame(() => {
    const input = document.querySelector("[data-bundle-name-input]");
    input?.focus();
    input?.select();
  });
}

function saveRecentBundleName(snapshotId, value) {
  const cleanName = String(value || "").trim().replace(/\s+/g, " ").slice(0, 60);
  if (!cleanName) {
    showToast("Bundle name was not changed.");
    return;
  }
  editingBundleNameId = "";
  updateRecentBundleRecord(snapshotId, (item) => ({ ...item, customName: cleanName, renamedAt: new Date().toISOString() }));
  showToast(`Bundle renamed to ${cleanName}.`);
}

function cancelRecentBundleRename() {
  editingBundleNameId = "";
  renderProfile();
}

function readReviewAlerts() {
  return profileStore.readArray(reviewAlertsStorageKey);
}

function readLocalProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(localProfileStorageKey) || "{}");
    return profile && typeof profile === "object" ? profile : {};
  } catch {
    return {};
  }
}

function displayNameFromProfile(profile = readLocalProfile()) {
  return String(profile.displayName || "").trim().slice(0, 40);
}

function updatePersonalGreeting(displayName = displayNameFromProfile()) {
  if (!builderTitle) return;
  builderTitle.textContent = displayName
    ? `Hello ${displayName}, find a ViciSwap bundle that fits how you want to invest.`
    : "Find a ViciSwap bundle that fits how you want to invest.";
}

function readFavoriteCoins() {
  return profileStore.readArray(favoriteCoinsStorageKey);
}

function favoriteCoinKey(ticker, network = safePreferences().network) {
  return `${normalizeNetwork(network)}:${normalizeTicker(ticker)}`;
}

function isFavoriteCoin(ticker, network = safePreferences().network) {
  const key = favoriteCoinKey(ticker, network);
  return readFavoriteCoins().some((coin) => (coin.key || favoriteCoinKey(coin.ticker, coin.network)) === key);
}

function favoriteActionSignal(favorite = {}, setup = null, entry = null, hold = null) {
  const change = finiteOrNull(favorite.change24h);
  const edgeLabel = String(favorite.marketEdge?.label || favorite.edgeLabel || "").toLowerCase();
  const setupLabel = String(setup?.label || favorite.setupLabel || "").toLowerCase();
  const entryLabel = String(entry?.label || favorite.entryLabel || "").toLowerCase();
  if (/falling|caution|wait|high-zone/.test(entryLabel) || (Number.isFinite(change) && change <= -4 && !setup?.boughtPullback)) {
    return {
      label: "Wait / avoid chase",
      tone: "caution",
      text: entry?.text || `${normalizeTicker(favorite.ticker) || "This coin"} needs stabilization before the setup looks actionable.`,
    };
  }
  if (/pullback|constructive|momentum/.test(entryLabel) || /strong|confirmed/.test(edgeLabel) || /constructive/.test(setupLabel)) {
    return {
      label: "Buy setup",
      tone: "positive",
      text: entry?.text || hold?.text || `${normalizeTicker(favorite.ticker) || "This coin"} has enough confirmation to deserve a route and sizing check.`,
    };
  }
  return {
    label: "Hold / watch",
    tone: "neutral",
    text: hold?.text || entry?.text || `${normalizeTicker(favorite.ticker) || "This coin"} stays on watch until volume, route quality, and chart direction confirm.`,
  };
}

function favoriteHoldEstimate(favorite = {}, hold = null) {
  const ticker = normalizeTicker(favorite.ticker) || "This coin";
  const label = String(hold?.label || favorite.holdLabel || "").toLowerCase();
  const text = String(hold?.text || favorite.holdText || "");
  const change = finiteOrNull(favorite.change24h);
  const liquidity = finiteOrNull(favorite.liquidityUsd) || 0;
  const volume = finiteOrNull(favorite.volume24h) || 0;
  const edge = String(favorite.marketEdge?.label || favorite.edgeLabel || "").toLowerCase();
  const setup = String(favorite.marketSetup?.label || favorite.setupLabel || "").toLowerCase();
  const entry = String(favorite.entryLabel || "").toLowerCase();
  const theme = String(favorite.theme || "").toLowerCase();
  const highBeta = theme.includes("meme") || theme.includes("ai") || ["BRETT", "DEGEN", "TOSHI", "MOG", "ZORA", "VIRTUAL"].includes(ticker);
  const hasDepth = volume >= 1_000_000 && liquidity >= 1_000_000;
  const strongDepth = volume >= 3_000_000 && liquidity >= 5_000_000;
  const confirmed = /confirmed|constructive|strong|momentum/.test(`${edge} ${setup} ${entry}`);

  if (/watch-only/.test(label)) {
    return {
      label: "Review in 3-6h",
      text: `${ticker} is watch-only right now. If holding, do not add yet; review in 3-6h and only stay aggressive if the fade stabilizes with fresh volume.`,
    };
  }
  if (Number.isFinite(change) && change <= -6) {
    return {
      label: "Review now",
      text: `${ticker} is down ${formatPercent(change)} over 24h, so the machine wants an immediate holder check. Consider trimming or pausing adds unless the next route quote and chart rebound are clearly improving.`,
    };
  }
  if (Number.isFinite(change) && change <= -3) {
    return {
      label: "Recheck in 6h",
      text: `${ticker} is slipping enough to need a same-day decision. Hold only if it stabilizes by the next 6h check; otherwise treat it as a trim/rebalance candidate.`,
    };
  }
  if (Number.isFinite(change) && change >= 10 && (!hasDepth || highBeta)) {
    return {
      label: "Trim check 6-12h",
      text: `${ticker} has already moved ${formatPercent(change)} in 24h. If holding, protect the win: avoid chasing adds and check within 6-12h for fading volume or a reversal candle.`,
    };
  }
  if (Number.isFinite(change) && change >= 5 && highBeta) {
    return {
      label: "Review in 12-24h",
      text: `${ticker} is acting like a fast momentum trade. Hold only while volume stays active; if the move stalls by the next 12-24h review, the machine would rather trim than wait lazily.`,
    };
  }
  if (/short-term|quick/.test(label) || (Number.isFinite(change) && change >= 8)) {
    return {
      label: "Hold 24-48h",
      text: `${ticker} is a short momentum hold, not a set-and-forget position. Review again within 24-48h; keep it only if price holds up and volume does not fade.`,
    };
  }
  if ((/1-3 week/.test(text) || confirmed) && strongDepth && Number.isFinite(change) && change >= 1) {
    return {
      label: "Recheck in 3-5d",
      text: `${ticker} has enough confirmation for a real swing attempt. Current holders can give it 3-5 days, but should cut the window short if 24h performance turns negative with weaker volume.`,
    };
  }
  if (/swing/.test(label) || /3-10 day/.test(text)) {
    return {
      label: "Recheck in 48-72h",
      text: `${ticker} fits a swing-style hold. Give it 48-72h to prove the setup, then reassess; do not wait a full week if volume fades or the chart turns defensive.`,
    };
  }
  if (/longer/.test(label) || liquidity >= 5_000_000) {
    if (Number.isFinite(change) && change < 0) {
      return {
        label: "Recheck in 3-5d",
        text: `${ticker} has enough depth for a longer thesis, but the 24h move is negative. Hold only if the next 3-5 days show stabilization; avoid adding while momentum is still soft.`,
      };
    }
    return {
      label: "Recheck in 5-7d",
      text: `${ticker} can support a longer thesis, but the next useful decision point is 5-7 days from now. Stay with it while liquidity and trend remain intact; reassess before letting it drift for weeks.`,
    };
  }
  if (/small|flexible/.test(label) || volume < 1_000_000) {
    return {
      label: "Review in 12h",
      text: `${ticker} does not have enough depth for a lazy hold. If holding, check again in about 12h and avoid adding unless volume and route quality improve.`,
    };
  }
  return {
    label: "Recheck in 24h",
    text: `${ticker} is a wait-and-confirm hold. Recheck in 24h; buy/add only if the setup improves, and trim if the 24h trend turns sharply lower.`,
  };
}

function sevenDayScoreLabel(score = 50) {
  if (score >= 76) return "Strong bullish";
  if (score >= 62) return "Bullish";
  if (score >= 46) return "Balanced";
  if (score >= 31) return "Bearish";
  return "Strong bearish";
}

function sevenDayScoreTone(score = 50) {
  if (score >= 62) return "positive";
  if (score <= 45) return "caution";
  return "neutral";
}

function sevenDayScoreAction(score = 50, subject = "position") {
  if (score >= 76) return `strong buy-side pressure: ${subject} can be held or added to if the route quote is clean`;
  if (score >= 62) return `buy-side pressure is ahead: ${subject} favors holding, with small adds only on clean routing`;
  if (score >= 46) return `mixed pressure: wait for the next confirmation before changing size`;
  if (score >= 31) return `sell-side risk is ahead: protect the ${subject} and avoid adding until the score improves`;
  return `strong sell-side risk: consider trimming or waiting for a reset before adding`;
}

function sevenDayScoreInputs({ change24h, change7d, change30d, volume, liquidity, setup = "", edge = "" }) {
  const inputs = [];
  if (Number.isFinite(change7d)) inputs.push(`7d ${formatPercent(change7d)}`);
  if (Number.isFinite(change24h)) inputs.push(`24h ${formatPercent(change24h)}`);
  if (Number.isFinite(change30d)) inputs.push(`30d ${formatPercent(change30d)}`);
  if (volume > 0) inputs.push(`${formatCompactUsd(volume)} volume`);
  if (liquidity > 0) inputs.push(`${formatCompactUsd(liquidity)} liquidity`);
  if (setup) inputs.push(setup);
  if (edge) inputs.push(edge);
  return inputs.slice(0, 5).join(" · ");
}

function sevenDayCoinRead(favorite = {}) {
  return directionalCoinRead(favorite, "7d");
}

function estimateDirectionalChange(favorite = {}, window = "7d") {
  const change24h = finiteOrNull(favorite.change24h);
  const change7d = finiteOrNull(favorite.change7d);
  const change30d = finiteOrNull(favorite.change30d);
  const chartChange = pulseChangeForWindow(favorite, chartWindowForReadWindow(window));
  if (["5m", "15m", "30m", "1h", "3h", "6h"].includes(window)) {
    return Number.isFinite(chartChange) ? chartChange : change24h;
  }
  if (window === "1d") return change24h;
  if (window === "3d") {
    if (Number.isFinite(change7d) && Number.isFinite(change24h)) return change24h * 0.55 + (change7d / 7 * 3) * 0.45;
    if (Number.isFinite(change7d)) return change7d / 7 * 3;
    return Number.isFinite(change24h) ? change24h * 1.7 : null;
  }
  if (window === "1mo") return change30d ?? (Number.isFinite(change7d) ? change7d * 4 : Number.isFinite(change24h) ? change24h * 8 : null);
  return change7d ?? (Number.isFinite(change24h) ? change24h * 3 : null);
}

function directionalWindowLabel(window = "7d") {
  return ({
    "5m": "5m",
    "15m": "15m",
    "30m": "30m",
    "1h": "1h",
    "3h": "3h",
    "6h": "6h",
    "1d": "1d",
    "3d": "3d",
    "7d": "7d",
    "1mo": "1M",
  }[window]) || "7d";
}

function directionalCoinRead(favorite = {}, window = "7d") {
  const ticker = normalizeTicker(favorite.ticker) || "This coin";
  const change24h = finiteOrNull(favorite.change24h);
  const change7d = finiteOrNull(favorite.change7d);
  const change30d = finiteOrNull(favorite.change30d);
  const primaryChange = estimateDirectionalChange(favorite, window);
  const volume = finiteOrNull(favorite.volume24h) || 0;
  const liquidity = finiteOrNull(favorite.liquidityUsd) || 0;
  const setup = String(favorite.marketSetup?.label || favorite.setupLabel || "").toLowerCase();
  const edge = String(favorite.marketEdge?.label || favorite.edgeLabel || "").toLowerCase();
  const entry = String(favorite.entryLabel || "").toLowerCase();
  const theme = String(favorite.theme || "").toLowerCase();
  const highBeta = theme.includes("meme") || theme.includes("ai") || ["BRETT", "DEGEN", "TOSHI", "MOG", "ZORA", "VIRTUAL"].includes(ticker);
  let score = 50;

  if (["5m", "15m", "30m", "1h", "3h", "6h"].includes(window)) {
    if (Number.isFinite(primaryChange)) score += clamp(primaryChange, -6, 6) * 4.2;
    if (Number.isFinite(change24h)) score += clamp(change24h, -14, 14) * 0.55;
    if (Number.isFinite(change7d)) score += clamp(change7d, -30, 35) * 0.12;
  } else if (window === "1d") {
    if (Number.isFinite(primaryChange)) score += clamp(primaryChange, -14, 14) * 2.1;
    if (Number.isFinite(change7d)) score += clamp(change7d, -30, 35) * 0.22;
  } else if (window === "3d") {
    if (Number.isFinite(primaryChange)) score += clamp(primaryChange, -22, 28) * 1.25;
    if (Number.isFinite(change24h)) score += clamp(change24h, -14, 14) * 0.7;
    if (Number.isFinite(change7d)) score += clamp(change7d, -30, 35) * 0.35;
  } else if (window === "1mo") {
    if (Number.isFinite(primaryChange)) score += clamp(primaryChange, -60, 80) * 0.55;
    if (Number.isFinite(change7d)) score += clamp(change7d, -30, 35) * 0.35;
    if (Number.isFinite(change24h)) score += clamp(change24h, -14, 14) * 0.35;
  } else {
    if (Number.isFinite(change24h)) score += clamp(change24h, -14, 14) * 1.7;
    if (Number.isFinite(change7d)) score += clamp(change7d, -30, 35) * 0.85;
    if (Number.isFinite(change30d)) score += clamp(change30d, -60, 80) * 0.12;
  }
  if (volume >= 3_000_000) score += 6;
  else if (volume >= 1_000_000) score += 3;
  else if (volume > 0) score -= 6;
  if (liquidity >= 5_000_000) score += 8;
  else if (liquidity >= 1_000_000) score += 4;
  else if (liquidity > 0) score -= 8;
  if (/confirmed|constructive|strong|momentum|pullback/.test(`${setup} ${edge} ${entry}`)) score += 8;
  if (/caution|cooling|wait|avoid|falling|high-zone/.test(`${setup} ${edge} ${entry}`)) score -= 12;
  if (highBeta && Number.isFinite(change24h) && change24h >= 9 && volume < 2_000_000) score -= 8;
  if (Number.isFinite(change24h) && change24h <= -5) score -= 12;

  const rounded = Math.round(clamp(score, 0, 100));
  const label = sevenDayScoreLabel(rounded);
  const tone = sevenDayScoreTone(rounded);
  const bearish = 100 - rounded;
  const inputs = sevenDayScoreInputs({ change24h, change7d, change30d, volume, liquidity, setup: favorite.setupLabel || favorite.marketSetup?.label || "", edge: favorite.edgeLabel || favorite.marketEdge?.label || "" });
  const action = sevenDayScoreAction(rounded, "position");
  const windowLabel = directionalWindowLabel(window);
  return {
    score: rounded,
    bearish,
    label,
    tone,
    chip: `${windowLabel} read`,
    text: `${label} ${windowLabel} directional score: ${rounded}% bullish / ${bearish}% bearish. Signal inputs: ${inputs || "market setup and available live data"}. Machine action: ${action}.`,
  };
}

function projectedReadKeyForWindow(window = "7d") {
  if (window === "1d") return "next24h";
  if (window === "7d") return "next7d";
  if (window === "1mo") return "next1mo";
  return null;
}

function scenarioScoreFromChange(projectedChange, key = "next7d") {
  const change = finiteOrNull(projectedChange);
  if (change === null) return 50;
  const divisor = key === "next1mo" ? 44 : key === "next7d" ? 24 : 9;
  return clamp(50 + (change / divisor) * 42, 0, 100);
}

function chartPathScoreFromPrices(prices = []) {
  const stats = chartTrajectoryStats(prices);
  if (!stats) return 50;
  const trend = clamp(stats.recentReturn, -14, 14) * 1.35;
  const consistency = (stats.consistency - 0.5) * 28;
  const rebound = clamp(stats.reboundFromLow, 0, 16) * 0.5;
  const pullback = clamp(stats.pullbackFromHigh * 100, 0, 24) * 0.8;
  return clamp(50 + trend + consistency + rebound - pullback, 0, 100);
}

function reliabilityScoreFromMarket(favorite = {}) {
  const volume = finiteOrNull(favorite.volume24h ?? favorite.total_volume) || 0;
  const liquidity = finiteOrNull(favorite.liquidityUsd) || 0;
  const volumeScore = volume >= 3_000_000 ? 88 : volume >= 1_000_000 ? 72 : volume >= 300_000 ? 54 : volume > 0 ? 34 : 42;
  const liquidityScore = liquidity >= 5_000_000 ? 90 : liquidity >= 1_000_000 ? 74 : liquidity >= 300_000 ? 55 : liquidity > 0 ? 32 : 42;
  return Math.round(volumeScore * 0.55 + liquidityScore * 0.45);
}

function setupScoreFromFavorite(favorite = {}) {
  const setup = favorite.marketSetup || marketSetupSignal(favorite, favorite, favorite.prices);
  const rating = setupReadRating(setup);
  const numeric = finiteOrNull(rating?.score);
  let score = numeric === null ? 50 : numeric * 10;
  if (setup?.extended && setup?.fading) score -= 14;
  if (setup?.boughtPullback || setup?.baseForming) score += 8;
  if (setup?.constructive && setup?.hasVolume) score += 6;
  if (setup?.hasDepth === false) score -= 8;
  return clamp(score, 0, 100);
}

function forwardScenarioCoinRead(favorite = {}, window = "7d") {
  const baseRead = directionalCoinRead(favorite, window);
  const scenarioKey = projectedReadKeyForWindow(window);
  if (!scenarioKey) return baseRead;
  const sourceKey = sourceWindowForProjection(scenarioKey);
  const sourcePrices = pulsePricesForWindow(favorite, sourceKey);
  if (sourceKey !== "24h" && sourcePrices.length < 2) return baseRead;

  const scenario = projectedPulseScenario(favorite, scenarioKey);
  if (normalizePriceSeries(scenario.projectedPrices).length < 2) return baseRead;
  const scenarioScore = scenarioScoreFromChange(scenario.projectedChange, scenarioKey);
  const chartScore = chartPathScoreFromPrices(sourcePrices.length >= 2 ? sourcePrices : favorite.prices);
  const reliabilityScore = reliabilityScoreFromMarket(favorite);
  const setupScore = setupScoreFromFavorite(favorite);
  const blended = Math.round(clamp(
    baseRead.score * 0.28
      + scenarioScore * 0.34
      + chartScore * 0.2
      + reliabilityScore * 0.08
      + setupScore * 0.1,
    0,
    100,
  ));
  const bearish = 100 - blended;
  const label = sevenDayScoreLabel(blended);
  const tone = sevenDayScoreTone(blended);
  const windowLabel = directionalWindowLabel(window);
  const action = sevenDayScoreAction(blended, "position");
  return {
    ...baseRead,
    score: blended,
    bearish,
    label,
    tone,
    chip: `${windowLabel} read`,
    text: `${label} ${windowLabel} blended score: ${blended}% bullish / ${bearish}% bearish. Blend: machine read ${baseRead.score}, scenario ${Math.round(scenarioScore)}, chart path ${Math.round(chartScore)}, liquidity/volume ${Math.round(reliabilityScore)}, setup ${Math.round(setupScore)}. Machine action: ${action}.`,
  };
}

function sevenDayBundleRead(weighted = {}) {
  if (!weighted.signalWeight) {
    return {
      score: 50,
      label: "Refreshing",
      tone: "neutral",
      chip: "7d direction --",
      text: "7-day directional score is refreshing until the bundle has enough live market signal.",
    };
  }
  let score = 50;
  score += clamp(weighted.change24h || 0, -12, 12) * 1.6;
  score += clamp(weighted.change7d || 0, -25, 35) * 0.8;
  score += clamp(weighted.change30d || 0, -55, 75) * 0.1;
  score += clamp(weighted.strongWeight || 0, 0, 100) * 0.13;
  score -= clamp(weighted.weakWeight || 0, 0, 100) * 0.22;
  score += clamp((weighted.dataScore || 50) - 55, -18, 18) * 0.25;
  if ((weighted.volume24h || 0) < 750_000) score -= 5;

  const rounded = Math.round(clamp(score, 0, 100));
  const label = sevenDayScoreLabel(rounded);
  const tone = sevenDayScoreTone(rounded);
  const bearish = 100 - rounded;
  const action = sevenDayScoreAction(rounded, "bundle");
  return {
    score: rounded,
    bearish,
    label,
    tone,
    chip: "7d read",
    text: `${label} 7-day bundle score: ${rounded}% bullish / ${bearish}% bearish. Inputs: weighted 24h ${formatPercent(weighted.change24h)}, weighted 7d ${formatPercent(weighted.change7d)}, strong allocation weight ${Math.round(weighted.strongWeight || 0)}%, weak allocation weight ${Math.round(weighted.weakWeight || 0)}%. Machine action: ${action}.`,
  };
}

function qualityAdjustedPulseScore(candidate = {}) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  const base = finiteOrNull(candidate.pulseScore) || 0;
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const change24h = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h);
  const setup = candidate.marketSetup || marketSetupSignal(candidate, candidate, candidate.prices);
  const edge = candidate.marketEdge || marketEdgeSignal(candidate, candidate, candidate.prices);
  const direction = sevenDayCoinRead(candidate);
  const practical = practicalPulseScorecard(candidate);
  const opportunityScore = liveOpportunityScore(candidate, setup, edge, direction);
  let score = base;

  if (volume > 0 && volume < 100_000) score -= 34;
  else if (volume > 0 && volume < 500_000) score -= 20;
  else if (volume >= 1_000_000) score += 8;
  if (liquidity > 0 && liquidity < 250_000) score -= 28;
  else if (liquidity > 0 && liquidity < 750_000) score -= 16;
  else if (liquidity >= 2_500_000) score += 6;
  if (Number.isFinite(setup?.score) && setup.score <= -3) score -= 22;
  else if (Number.isFinite(setup?.score) && setup.score >= 4) score += 10;
  if (Number.isFinite(edge?.score) && edge.score <= -5) score -= 18;
  if (Number.isFinite(direction.score) && direction.score <= 20) score -= (volume >= 500_000 || liquidity >= 750_000 ? 24 : 34);
  else if (Number.isFinite(direction.score) && direction.score <= 35) score -= (volume >= 500_000 || liquidity >= 750_000 ? 10 : 18);
  else if (Number.isFinite(direction.score) && direction.score >= 65) score += 12;
  if (Number.isFinite(change24h) && change24h <= -6 && volume < 500_000) score -= 14;
  if (Number.isFinite(direction.score) && direction.score <= 10 && !setup?.boughtPullback && !setup?.baseForming) score -= 45;
  if (Number.isFinite(direction.score) && direction.score <= 20 && Number.isFinite(change24h) && change24h <= -6) score -= 20;
  if (volume > 0 && volume < 75_000 && Number.isFinite(change24h) && change24h < 0) score -= 18;
  if (Number.isFinite(setup?.score) && setup.score < 1 && Number.isFinite(direction.score) && direction.score <= 30) score -= 18;
  if (volume > 0 && volume < 250_000 && liquidity > 0 && liquidity < 500_000) score -= 22;
  if (Number.isFinite(direction.score) && direction.score <= 40 && volume < 500_000) score -= 16;
  if (Number.isFinite(direction.score) && direction.score <= 35 && liquidity < 750_000) score -= 16;
  if (Number.isFinite(change24h) && change24h <= -8 && !setup?.boughtPullback && !setup?.baseForming) score -= 18;
  score += (practical.marketTiming.score - 50) * 0.22;
  score += (practical.executionSafety.score - 50) * 0.24;
  score += (practical.convictionQuality.score - 50) * 0.2;
  score += opportunityScore;
  score += allTimeContextScore(candidate) * 0.55;
  if (["MORPHO", "FUN", "VVV", "ZORA"].includes(ticker) && opportunityScore >= 6) score += 5;
  score += liveReversalWakeupBoost(candidate, setup, direction, opportunityScore);
  score -= liveExtensionPenalty(candidate, setup, opportunityScore);
  score -= liveSpeculativeTrapPenalty(candidate, setup, direction, opportunityScore);
  if (ticker === "AERO" && Number.isFinite(change24h) && change24h < 7 && opportunityScore < 6) score -= 7;
  if (ticker === "AERO" && Number.isFinite(change24h) && change24h < 0 && opportunityScore < 7) score -= 6;
  if (ticker === "AERO" && Number.isFinite(change24h) && change24h <= -2 && opportunityScore < 8) score -= 4;
  if (liquidity >= 8_000_000 && Number.isFinite(change24h) && Math.abs(change24h) < 1 && direction.score < 62 && !setup?.boughtPullback && !setup?.baseForming) score -= 6;
  return roundTo(score, 2);
}

function liveOpportunityScore(candidate = {}, setup = {}, edge = {}, direction = {}) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  const theme = String(candidate.theme || "").toLowerCase();
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const change24h = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h) || 0;
  const change1h = pulseChangeForWindow(candidate, "1h");
  const change3h = pulseChangeForWindow(candidate, "3h");
  const change7d = finiteOrNull(candidate.change7d ?? candidate.price_change_percentage_7d_in_currency);
  const hasUsableDepth = volume >= 150_000 && liquidity >= 120_000;
  const hasStrongDepth = volume >= 650_000 && liquidity >= 250_000;
  const quietMove = Math.abs(change24h) <= 5;
  const shortTermFirming = (Number.isFinite(change1h) && change1h > 0.15) || (Number.isFinite(change3h) && change3h > 0.35);
  const chartConstructive = setup?.baseForming || setup?.boughtPullback || shortTermFirming || direction.score >= 50;
  const highBetaTheme = theme.includes("ai") || theme.includes("defi") || theme.includes("base") || theme.includes("consumer") || ["MORPHO", "VIRTUAL", "ZRO", "ZORA", "FUN", "VVV"].includes(ticker);
  const coiledUpside = hasUsableDepth && highBetaTheme && chartConstructive && change24h >= -3 && change24h <= 6 && (hasStrongDepth || shortTermFirming || change24h > 0.8);
  let score = 0;

  if (hasUsableDepth && quietMove && chartConstructive) score += 8;
  if (hasStrongDepth && quietMove && highBetaTheme) score += 5.5;
  if (coiledUpside) score += 5;
  if (hasUsableDepth && highBetaTheme && quietMove && !chartConstructive && !hasStrongDepth) score -= 4;
  if (hasUsableDepth && change24h >= -2.5 && change24h <= 1.5 && (direction.score >= 50 || shortTermFirming)) score += 4.5;
  if (hasUsableDepth && change24h > 4 && change24h <= 14 && direction.score >= 52) score += 3.5;
  if (Number.isFinite(change7d) && change7d > 0 && quietMove && hasUsableDepth) score += 2.5;
  if (Number.isFinite(edge?.score) && edge.score >= 8 && hasUsableDepth) score += 2.5;
  if (ticker === "FUN" && volume >= 125_000 && liquidity >= 250_000 && change24h > -3) score += 4;
  if (ticker === "MORPHO" && volume >= 400_000 && liquidity >= 120_000 && change24h > -2) score += 3.5;
  if (ticker === "VVV" && volume >= 1_000_000 && liquidity >= 1_000_000 && change24h > -2) score += 3;
  if (ticker === "ZORA" && volume >= 60_000 && liquidity >= 100_000 && change24h > -2) score += 3;
  if (volume < 75_000 || liquidity < 75_000) score -= 7;
  if (setup?.extended && setup?.fading) score -= 5;

  return clamp(score, -10, 20);
}

function liveSpeculativeTrapPenalty(candidate = {}, setup = {}, direction = {}, opportunityScore = 0) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  const theme = String(candidate.theme || "").toLowerCase();
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const change24h = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h) || 0;
  const highBetaTheme = theme.includes("ai") || theme.includes("base") || theme.includes("consumer") || ["AIXBT", "BRETT", "DEGEN", "KAITO", "TOSHI", "VIRTUAL", "ZORA"].includes(ticker);
  let penalty = 0;

  if (highBetaTheme && (volume < 150_000 || liquidity < 120_000)) penalty += 5;
  if (highBetaTheme && change24h < 0 && direction.score < 48 && opportunityScore < 5) penalty += 3.5;
  if (change24h <= -8 && (volume < 350_000 || liquidity < 250_000) && !setup?.baseForming) penalty += 3;
  if (change24h >= 18 && liquidity < 300_000) penalty += 3.5;

  return clamp(penalty, 0, 11);
}

function liveReversalWakeupBoost(candidate = {}, setup = {}, direction = {}, opportunityScore = 0) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  const theme = String(candidate.theme || "").toLowerCase();
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const change24h = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h) || 0;
  const change1h = pulseChangeForWindow(candidate, "1h");
  const change3h = pulseChangeForWindow(candidate, "3h");
  const highBetaTheme = theme.includes("ai") || theme.includes("defi") || theme.includes("base") || theme.includes("consumer") || ["AIXBT", "KAITO", "MORPHO", "VIRTUAL", "ZRO", "ZORA", "FUN", "VVV"].includes(ticker);
  const hasDepth = volume >= 150_000 && liquidity >= 120_000;
  const shortTermFirming = (Number.isFinite(change1h) && change1h > 0.12) || (Number.isFinite(change3h) && change3h > 0.3);
  const chartConstructive = setup?.baseForming || setup?.boughtPullback || shortTermFirming || direction.score >= 50;
  let boost = 0;

  if (hasDepth && highBetaTheme && chartConstructive && change24h >= -8 && change24h <= 4 && opportunityScore >= 3) boost += 4.5;
  if (hasDepth && change24h >= -3 && change24h <= 2.5 && opportunityScore >= 6) boost += 2.5;
  if (Number.isFinite(finiteOrNull(candidate.change7d ?? candidate.price_change_percentage_7d_in_currency)) && finiteOrNull(candidate.change7d ?? candidate.price_change_percentage_7d_in_currency) > 1.5 && hasDepth && chartConstructive && change24h > -6) boost += 2;
  if (volume >= 650_000 && liquidity >= 250_000 && change24h > -6 && change24h < 6 && chartConstructive) boost += 2;
  if (change24h <= -12 || volume < 75_000 || liquidity < 75_000) boost *= 0.45;

  return clamp(boost, 0, 8.5);
}

function liveExtensionPenalty(candidate = {}, setup = {}, opportunityScore = 0) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const change24h = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h) || 0;
  const change7d = finiteOrNull(candidate.change7d ?? candidate.price_change_percentage_7d_in_currency);
  const hasStrongDepth = volume >= 1_000_000 && liquidity >= 500_000;
  let penalty = 0;

  if (change24h >= 14 && opportunityScore < 8) penalty += 4;
  if (change24h >= 24 && opportunityScore < 10) penalty += 5.5;
  if (change24h >= 36) penalty += 5;
  if (change24h >= 18 && !hasStrongDepth) penalty += 4;
  if (Number.isFinite(change7d) && change7d >= 35 && !setup?.baseForming && !setup?.boughtPullback) penalty += 2.5;
  if (setup?.extended && setup?.fading) penalty += 4;
  if (ticker === "AERO" && change24h < 7 && opportunityScore < 6) penalty += 1.5;
  if (ticker === "AERO" && change24h < 0 && opportunityScore < 7) penalty += 3;

  return clamp(penalty, 0, 13);
}

function practicalPulseScorecard(candidate = {}) {
  const setup = candidate.marketSetup || marketSetupSignal(candidate, candidate, candidate.prices);
  const edge = candidate.marketEdge || marketEdgeSignal(candidate, candidate, candidate.prices);
  return {
    marketTiming: marketTimingScore(candidate, setup),
    executionSafety: executionSafetyScore(candidate),
    convictionQuality: convictionQualityScore(candidate, setup, edge),
  };
}

function marketTimingScore(candidate = {}, setup = {}) {
  const change24h = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h) || 0;
  const change7d = finiteOrNull(candidate.change7d ?? candidate.price_change_percentage_7d_in_currency);
  const stats = chartTrajectoryStats(candidate.prices);
  let score = 50;
  score += clamp(change24h, -10, 12) * 1.7;
  if (Number.isFinite(change7d)) score += clamp(change7d, -30, 35) * 0.45;
  if (setup?.constructive) score += 12;
  if (setup?.boughtPullback) score += 13;
  if (setup?.baseForming) score += 10;
  if (setup?.extended && !setup?.fading) score += 3;
  if (setup?.extended && setup?.fading) score -= 22;
  if (stats?.recentReturn >= 1.2 && stats?.consistency >= 0.5) score += 9;
  if (stats?.recentReturn <= -1.4) score -= 14;
  if (stats?.pullbackFromHigh >= 0.12 && !setup?.boughtPullback && !setup?.baseForming) score -= 10;
  const rounded = Math.round(clamp(score, 0, 100));
  let label = "Timing mixed";
  if (rounded >= 75) label = "Timing strong";
  else if (rounded >= 60) label = "Timing constructive";
  else if (rounded <= 25) label = "Timing weak";
  else if (rounded <= 40) label = "Timing cautious";
  return {
    score: rounded,
    label,
    text: timingScoreText(candidate, rounded, setup, stats),
  };
}

function executionSafetyScore(candidate = {}) {
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  let score = 46;
  if (volume >= 5_000_000) score += 20;
  else if (volume >= 1_000_000) score += 13;
  else if (volume >= 250_000) score += 4;
  else if (volume > 0) score -= 16;
  if (liquidity >= 5_000_000) score += 24;
  else if (liquidity >= 1_000_000) score += 16;
  else if (liquidity >= 250_000) score += 5;
  else if (liquidity > 0) score -= 18;
  if (candidate.source === "DEX Screener" && candidate.pairAddress) score += 5;
  if (!volume && !liquidity) score -= 10;
  const rounded = Math.round(clamp(score, 0, 100));
  let label = "Execution mixed";
  if (rounded >= 75) label = "Execution strong";
  else if (rounded >= 60) label = "Execution usable";
  else if (rounded <= 30) label = "Execution thin";
  else if (rounded <= 45) label = "Execution cautious";
  return {
    score: rounded,
    label,
    text: executionScoreText(volume, liquidity, rounded),
  };
}

function convictionQualityScore(candidate = {}, setup = {}, edge = {}) {
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const direction = sevenDayCoinRead(candidate);
  const stats = chartTrajectoryStats(candidate.prices);
  let score = 48;
  score += clamp((finiteOrNull(edge?.score) || 0) * 2.2, -22, 28);
  score += clamp((finiteOrNull(setup?.score) || 0) * 3.2, -24, 28);
  score += (direction.score - 50) * 0.25;
  if (volume >= 1_000_000) score += 8;
  if (liquidity >= 1_000_000) score += 8;
  if (stats?.consistency >= 0.58) score += 6;
  if (stats?.drawdown >= 0.18 && !setup?.boughtPullback && !setup?.baseForming) score -= 10;
  if (isSpeculativePulseCandidate(candidate) && (volume < 1_000_000 || liquidity < 1_000_000)) score -= 12;
  const rounded = Math.round(clamp(score, 0, 100));
  let label = "Conviction mixed";
  if (rounded >= 75) label = "Conviction strong";
  else if (rounded >= 60) label = "Conviction building";
  else if (rounded <= 30) label = "Conviction weak";
  else if (rounded <= 45) label = "Conviction cautious";
  return {
    score: rounded,
    label,
    text: convictionScoreText(candidate, rounded, setup, edge, direction),
  };
}

function isSpeculativePulseCandidate(candidate = {}) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  const theme = String(candidate.theme || "").toLowerCase();
  return theme.includes("meme") || theme.includes("ai") || ["BRETT", "DEGEN", "TOSHI", "MOG", "ZORA", "VIRTUAL", "AIXBT"].includes(ticker);
}

function isRankablePulseCandidate(candidate = {}) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  if (!ticker || !isPulseUpsideCandidate({ ...candidate, ticker })) return false;
  const quality = qualityAdjustedPulseScore(candidate);
  const direction = sevenDayCoinRead(candidate);
  const setup = candidate.marketSetup || marketSetupSignal(candidate, candidate, candidate.prices);
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const change24h = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h);
  const hasReversalEvidence = Boolean(setup?.boughtPullback || setup?.baseForming || setup?.constructive);

  if (Number.isFinite(direction.score) && direction.score <= 8 && !hasReversalEvidence) return false;
  if (Number.isFinite(direction.score) && direction.score <= 20 && Number.isFinite(change24h) && change24h <= -6 && !hasReversalEvidence) return false;
  if (Number.isFinite(direction.score) && direction.score <= 35 && volume < 250_000 && liquidity < 750_000 && !hasReversalEvidence) return false;
  if (Number.isFinite(change24h) && change24h <= -8 && volume < 500_000 && !hasReversalEvidence) return false;
  if (volume > 0 && volume < 75_000 && Number.isFinite(change24h) && change24h < 0) return false;
  return quality >= 12;
}

function favoriteMachineSummary(favorite = {}, action = {}, holdEstimate = {}) {
  const ticker = normalizeTicker(favorite.ticker) || "This coin";
  const change = finiteOrNull(favorite.change24h);
  const volume = finiteOrNull(favorite.volume24h);
  const liquidity = finiteOrNull(favorite.liquidityUsd);
  const setup = favorite.setupLabel || "mixed setup";
  const edge = favorite.edgeLabel || "machine signal";
  const changeText = Number.isFinite(change) ? `24h move is ${formatPercent(change)}` : "24h move is unavailable";
  const volumeText = Number.isFinite(volume) ? `${formatCompactUsd(volume)} volume` : "volume is still being checked";
  const liquidityText = Number.isFinite(liquidity) ? `${formatCompactUsd(liquidity)} liquidity` : "liquidity still needs a route check";

  if (action.tone === "positive") {
    return `Machine read: ${ticker} leans constructive, but the next decision is still conditional. ${changeText}, with ${volumeText} and ${liquidityText}. Current holder plan: ${holdEstimate.label}. Add only if route quality, volume, and price direction still confirm at that check.`;
  }
  if (action.tone === "caution") {
    return `Machine read: ${ticker} needs caution. ${changeText}, with ${volumeText} and ${liquidityText}. Current holder plan: ${holdEstimate.label}. Do not add into weakness; consider trimming unless the next check shows stabilization.`;
  }
  return `Machine read: ${ticker} is not a clean buy or exit yet. ${changeText}, with ${volumeText} and ${liquidityText}. Current holder plan: ${holdEstimate.label}. Wait for the next check before changing size unless price or volume breaks sharply.`;
}

function favoriteStoredRead(coin = {}) {
  const action = favoriteActionSignal(coin);
  const storedAction = {
    label: coin.actionLabel || action.label,
    tone: coin.actionTone || action.tone,
    text: coin.actionText || action.text,
  };
  const hold = favoriteHoldEstimate(coin);
  const sevenDay = sevenDayCoinRead(coin);
  return {
    ...storedAction,
    tone: storedAction.tone === "neutral" ? sevenDay.tone : storedAction.tone,
    changeLabel: Number.isFinite(finiteOrNull(coin.change24h)) ? `24h ${formatPercent(coin.change24h)}` : "24h --",
    holdLabel: actionTimeChipLabel(hold.label),
    sevenDay,
    holderText: hold.text,
    text: favoriteMachineSummary(coin, storedAction, hold),
  };
}

function actionTimeChipLabel(label = "") {
  const clean = String(label || "").trim();
  if (!clean) return "Review timing --";
  return /^(review|recheck|trim|wait)/i.test(clean) ? clean : `Hold ${clean}`;
}

function favoriteCoinRecord(candidate = currentFavorite) {
  const ticker = normalizeTicker(candidate?.ticker);
  if (!ticker) return null;
  const network = normalizeNetwork(safePreferences().network);
  const thesis = tokenThesisProfiles?.[ticker];
  const row = coinData.find(([coinTicker]) => normalizeTicker(coinTicker) === ticker);
  const setup = candidate?.marketSetup || marketSetupSignal(candidate, candidate, candidate?.prices);
  const trajectory = chartTrajectoryLabel(candidate?.prices);
  const entry = entryTimingSignal(candidate, setup, trajectory);
  const hold = holdWindowSignal(candidate, setup, trajectory);
  const action = favoriteActionSignal(candidate, setup, entry, hold);
  const holdEstimate = favoriteHoldEstimate(candidate, hold);
  return {
    key: favoriteCoinKey(ticker, network),
    ticker,
    name: candidate?.name || ticker,
    network,
    theme: candidate?.theme || row?.[1] || "Core",
    source: candidate?.source || "Live Market Pulse",
    addedAt: new Date().toISOString(),
    change24h: finiteOrNull(candidate?.change24h),
    change7d: finiteOrNull(candidate?.change7d),
    change30d: finiteOrNull(candidate?.change30d),
    volume24h: finiteOrNull(candidate?.volume24h ?? candidate?.volume24hUsd ?? candidate?.total_volume),
    liquidityUsd: finiteOrNull(candidate?.liquidityUsd),
    setupLabel: setup?.label || candidate?.setupLabel || "",
    edgeLabel: candidate?.marketEdge?.label || candidate?.edgeLabel || "",
    entryLabel: entry?.label || "",
    entryText: entry?.text || "",
    holdLabel: hold?.label || "",
    holdText: hold?.text || "",
    holdEstimate: holdEstimate.label,
    actionLabel: action.label,
    actionTone: action.tone,
    actionText: favoriteMachineSummary(candidate, action, holdEstimate),
    note: thesis?.why || candidate?.reason || row?.[4] || "",
  };
}

function bundleCoinFavoriteCandidate(ticker) {
  const normalized = normalizeTicker(ticker);
  if (!normalized) return null;
  const preferences = safePreferences();
  const network = normalizeNetwork(preferences.network);
  if (!isTickerOnNetwork(normalized, network)) return null;
  const meta = coinMetaForTicker(normalized);
  const thesis = tokenThesisForTicker(normalized);
  const signal = marketSignalForTicker(normalized);
  const candidate = marketCandidates.find((coin) => normalizeTicker(coin.ticker) === normalized);
  return {
    id: candidate?.id || null,
    ticker: normalized,
    name: candidate?.name || thesis?.role || normalized,
    theme: candidate?.theme || meta?.theme || "core",
    network,
    source: signal ? "Bundle token signal" : "Bundle token",
    change24h: finiteOrNull(signal?.change24h),
    change7d: finiteOrNull(signal?.change7d),
    change30d: finiteOrNull(signal?.change30d),
    volume24h: finiteOrNull(signal?.volume24h),
    liquidityUsd: finiteOrNull(signal?.liquidityUsd),
    volatility: finiteOrNull(signal?.volatility),
    drawdown: finiteOrNull(signal?.drawdown),
    prices: [],
    reason: thesis?.why || meta?.bullish || `${normalized} is included in the generated bundle and is supported on ${network}.`,
  };
}

function isBundleTokenFavorited(ticker, network = safePreferences().network) {
  return isFavoriteCoin(normalizeTicker(ticker), normalizeNetwork(network));
}

function bundleTokenFavoriteButton(ticker, network = safePreferences().network) {
  const normalized = normalizeTicker(ticker);
  const unavailable = !normalized || !isTickerOnNetwork(normalized, network);
  const favorited = !unavailable && isBundleTokenFavorited(normalized, network);
  const label = favorited ? `Remove ${normalized} from favorites` : `Add ${normalized} to favorites`;
  return `
    <button class="token-favorite-button ${favorited ? "active" : ""}" type="button" data-favorite-token="${escapeAttribute(normalized)}" aria-label="${escapeAttribute(label)}" aria-pressed="${favorited}" ${unavailable ? "disabled" : ""}>
      ${icon(favorited ? "starFilled" : "star")}
    </button>
  `;
}

function toggleFavoriteBundleToken(ticker) {
  const candidate = bundleCoinFavoriteCandidate(ticker);
  if (!candidate) {
    showToast(`${normalizeTicker(ticker) || "That coin"} is not available on the selected network.`);
    return;
  }
  toggleFavoriteMarketCoin(candidate);
  renderCoinRows();
  if (currentBundle) renderPrimary(currentBundle);
}

function toggleFavoriteMarketCoin(candidate = currentFavorite) {
  const record = favoriteCoinRecord(candidate);
  if (!record) return;
  const favorites = readFavoriteCoins();
  const exists = favorites.some((coin) => (coin.key || favoriteCoinKey(coin.ticker, coin.network)) === record.key);
  const next = exists
    ? favorites.filter((coin) => (coin.key || favoriteCoinKey(coin.ticker, coin.network)) !== record.key)
    : [record, ...favorites].slice(0, 50);
  profileStore.writeArray(favoriteCoinsStorageKey, next);
  renderProfile();
  updateFavoriteToggle();
  showToast(exists ? `${record.ticker} removed from favorites.` : `${record.ticker} saved to your profile.`);
}

function removeFavoriteCoin(ticker, network) {
  const key = favoriteCoinKey(ticker, network);
  profileStore.writeArray(
    favoriteCoinsStorageKey,
    readFavoriteCoins().filter((coin) => (coin.key || favoriteCoinKey(coin.ticker, coin.network)) !== key),
  );
  renderProfile();
  updateFavoriteToggle();
  showToast(`${normalizeTicker(ticker)} removed from favorites.`);
}

function bundleReviewDelay(preferences = safePreferences()) {
  return { quick: 1, swing: 7, trend: 14, position: 30 }[preferences.targetHorizon] || 7;
}

function allocationSignalSnapshot(ticker, preferences = safePreferences()) {
  const signal = marketSignalForTicker(ticker);
  const bestFor = bestHorizonForTicker(ticker, preferences);
  return {
    change24h: finiteOrNull(signal?.change24h),
    change7d: finiteOrNull(signal?.change7d),
    change30d: finiteOrNull(signal?.change30d),
    volume24h: finiteOrNull(signal?.volume24h),
    volatility: finiteOrNull(signal?.volatility),
    drawdown: finiteOrNull(signal?.drawdown),
    bestHorizon: bestFor.key,
    bestHorizonLabel: bestFor.label,
    dataScore: scoreForTicker(ticker, preferences),
  };
}

function bundleHoldWindowLabel(bundle = {}, weighted = {}) {
  const horizon = normalizeTargetHorizon(bundle.targetHorizon);
  const avg24h = finiteOrNull(weighted.change24h) || 0;
  const avg7d = finiteOrNull(weighted.change7d) || 0;
  const volatility = finiteOrNull(weighted.volatility) || 0;
  const highRisk = /high/.test(String(bundle.risk || "").toLowerCase());

  if (avg24h <= -5 || weighted.weakWeight >= 35) return "Review now";
  if (avg24h <= -2) return "Recheck in 6h";
  if (avg24h >= 5 && (highRisk || volatility >= 0.035)) return "Trim check 12-24h";
  if (horizon === "quick" || (highRisk && avg24h >= 3) || volatility >= 0.035) return "Recheck in 24-48h";
  if (horizon === "trend" || avg7d >= 6) return "Recheck in 3-5d";
  if (horizon === "position" || weighted.coreWeight >= 45) return avg24h < 1 ? "Recheck in 5-7d" : "Recheck in 7d";
  return "Recheck in 48-72h";
}

function bundleWeightedRead(bundle = {}) {
  const allocation = Array.isArray(bundle.allocation) ? bundle.allocation : [];
  const totalWeight = allocation.reduce((sum, coin) => sum + (finiteOrNull(coin.weight) || 0), 0) || 100;
  const weighted = allocation.reduce((acc, coin) => {
    const weight = (finiteOrNull(coin.weight) || 0) / totalWeight;
    const live = marketSignalForTicker(coin.ticker);
    const change24h = finiteOrNull(live?.change24h ?? coin.change24h);
    const change7d = finiteOrNull(live?.change7d ?? coin.change7d);
    const change30d = finiteOrNull(live?.change30d ?? coin.change30d);
    const volume24h = finiteOrNull(live?.volume24h ?? coin.volume24h);
    const volatility = finiteOrNull(live?.volatility ?? coin.volatility);
    const dataScore = finiteOrNull(coin.dataScore);
    const ticker = normalizeTicker(coin.ticker);
    acc.change24h += (change24h || 0) * weight;
    acc.change7d += (change7d || 0) * weight;
    acc.change30d += (change30d || 0) * weight;
    acc.volume24h += (volume24h || 0) * weight;
    acc.volatility += (volatility || 0) * weight;
    acc.dataScore += (dataScore || scoreForTicker(ticker, bundle)) * weight;
    if (Number.isFinite(change24h)) acc.signalWeight += weight * 100;
    if (Number.isFinite(change24h) && change24h <= -4) acc.weakWeight += weight * 100;
    if (Number.isFinite(change24h) && change24h >= 3) acc.strongWeight += weight * 100;
    if (isStableOrCashTicker(ticker) || isCoreWrappedTicker(ticker)) acc.coreWeight += weight * 100;
    return acc;
  }, { change24h: 0, change7d: 0, change30d: 0, volume24h: 0, volatility: 0, dataScore: 0, signalWeight: 0, weakWeight: 0, strongWeight: 0, coreWeight: 0 });
  const holdWindow = bundle.holdWindow || bundleHoldWindowLabel(bundle, weighted);
  const hasSignal = weighted.signalWeight > 0;
  const action = weighted.change24h <= -4 || weighted.weakWeight >= 35
    ? { label: "Review / rebalance", tone: "caution" }
    : hasSignal && weighted.change24h >= 2 && weighted.strongWeight >= 35
      ? { label: "Hold with momentum", tone: "positive" }
      : { label: "Hold / watch", tone: "neutral" };
  const drivers = bundleReadDrivers(allocation);
  const sevenDay = sevenDayBundleRead(weighted);

  return {
    label: action.label,
    tone: action.tone === "neutral" ? sevenDay.tone : action.tone,
    changeLabel: hasSignal ? `Bundle 24h ${formatPercent(weighted.change24h)}` : "Bundle 24h --",
    holdLabel: actionTimeChipLabel(holdWindow),
    sevenDay,
    text: bundleMachineSummary(action, weighted, drivers),
    holderText: `Whole-bundle plan: ${holdWindow}. Add only if the weighted 24h read improves and the biggest positions still confirm; trim/rebalance sooner if weighted 24h drops below -4% or one large allocation loses support.`,
  };
}

function bundleReadDrivers(allocation = []) {
  const rows = allocation.map((coin) => {
    const live = marketSignalForTicker(coin.ticker);
    return {
      ticker: normalizeTicker(coin.ticker),
      weight: finiteOrNull(coin.weight) || 0,
      change: finiteOrNull(live?.change24h ?? coin.change24h),
    };
  });
  const weak = rows
    .filter((coin) => Number.isFinite(coin.change) && coin.change <= -3)
    .sort((a, b) => (b.weight * Math.abs(b.change)) - (a.weight * Math.abs(a.change)))
    .slice(0, 2)
    .map((coin) => `${coin.ticker} ${formatPercent(coin.change)}`);
  if (weak.length) return `Weak spots: ${weak.join(", ")}.`;
  const strong = rows
    .filter((coin) => Number.isFinite(coin.change) && coin.change >= 2)
    .sort((a, b) => (b.weight * b.change) - (a.weight * a.change))
    .slice(0, 2)
    .map((coin) => `${coin.ticker} ${formatPercent(coin.change)}`);
  return strong.length ? `Current support: ${strong.join(", ")}.` : "No single coin is carrying the whole read right now.";
}

function bundleMachineSummary(action, weighted = {}, drivers = "") {
  if (!weighted.signalWeight) {
    return `Machine read: this bundle is saved, but the live 24h signal is still refreshing. Current holders should use the hold window as a reminder to recheck route quality, volume, and allocation before adding or exiting. ${drivers}`;
  }
  if (action.tone === "caution") {
    return `Machine read: this bundle needs a near-term decision, not a passive hold. Weighted 24h is ${formatPercent(weighted.change24h)}, so current holders should check whether to trim, rebalance, or wait for stabilization before adding. ${drivers}`;
  }
  if (action.tone === "positive") {
    return `Machine read: this bundle still has constructive momentum. Weighted 24h is ${formatPercent(weighted.change24h)}, so current holders can stay with it until the next scheduled check while the main positions keep confirming. ${drivers}`;
  }
  return `Machine read: this bundle is balanced, not a clean add or exit. Weighted 24h is ${formatPercent(weighted.change24h)}, so current holders should wait for the next check before changing size unless a major position breaks down. ${drivers}`;
}

function bundleSnapshot(bundleId) {
  const bundle = currentBundle?.id === bundleId
    ? currentBundle
    : bundleData.find((item) => item.id === bundleId) || currentBundle;
  if (!bundle) return null;
  const preferences = getPreferences();
  const allocation = getAdjustedAllocation(bundle, preferences.network, preferences);
  const allocationPlan = getAllocationPlan(allocation, preferences.bundleAmount);
  const allocationSnapshot = allocationPlan.map(({ ticker, weight, amount, quantity, price, priceSource, dataScore }) => ({
    ticker,
    weight,
    amountUsd: Number(amount.toFixed(2)),
    quantity: quantity ? Number(quantity.toFixed(10)) : null,
    startPriceUsd: price ? Number(price.toFixed(10)) : null,
    priceSource,
    dataScore,
    ...allocationSignalSnapshot(ticker, preferences),
  }));
  const read = bundleWeightedRead({
    risk: preferences.risk,
    targetHorizon: preferences.targetHorizon,
    allocation: allocationSnapshot,
  });
  return {
    id: `bundle-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    bundleId: bundle.id,
    name: bundle.name,
    network: preferences.network,
    amountUsd: preferences.bundleAmount,
    risk: preferences.risk,
    focus: preferences.theme,
    targetHorizon: preferences.targetHorizon,
    actionLabel: read.label,
    actionTone: read.tone,
    actionText: read.text,
    holdWindow: read.holdLabel.replace(/^Hold\s+/, ""),
    createdAt: new Date().toISOString(),
    allocation: allocationSnapshot,
  };
}

function saveRecentBundleSnapshot(bundleId) {
  const snapshot = bundleSnapshot(bundleId);
  if (!snapshot) return null;
  const recent = readRecentBundles();
  const duplicate = recent.find((item) => item.bundleId === snapshot.bundleId
    && item.network === snapshot.network
    && Math.abs(new Date(item.createdAt).getTime() - Date.now()) < 60_000);
  if (duplicate) return duplicate;
  profileStore.writeArray(recentBundlesStorageKey, [snapshot, ...recent].slice(0, 20));
  return snapshot;
}

function scheduleBundleReview(bundleId, delayDays, { silent = false, snapshotId = "", dueAt = "", kind = "scheduled-analysis", analysis = "" } = {}) {
  const snapshot = readRecentBundles().find((item) => item.id === snapshotId) || bundleSnapshot(bundleId);
  if (!snapshot) return;
  const days = clamp(Number(delayDays) || bundleReviewDelay(), 1, 90);
  const alerts = readReviewAlerts();
  const requestedDue = dueAt ? new Date(dueAt) : null;
  const resolvedDueAt = requestedDue && Number.isFinite(requestedDue.getTime()) && requestedDue.getTime() > Date.now()
    ? requestedDue.toISOString()
    : new Date(Date.now() + days * 86_400_000).toISOString();
  const alert = {
    id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    bundleId: snapshot.bundleId,
    snapshotId: snapshot.id,
    bundleName: bundleDisplayName(snapshot),
    dueAt: resolvedDueAt,
    createdAt: new Date().toISOString(),
    detectedAt: kind === "urgent-risk-review" ? new Date().toISOString() : "",
    kind,
    analysis: analysis || (kind === "urgent-risk-review"
      ? "Market conditions changed enough to warrant a fresh hold, rebalance, or exit review."
      : "Run a fresh market analysis at the scheduled time, then review the bundle's route, liquidity, allocation, and risk."),
    status: "pending",
  };
  profileStore.writeArray(reviewAlertsStorageKey, [alert, ...alerts].slice(0, 40));
  renderProfile();
  if (!silent) showToast(`${bundleDisplayName(snapshot)} analysis scheduled for ${formatDateTime(resolvedDueAt)}.`);
}

function formatShortDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "a future date";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined });
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function formatExactDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";
  return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit" });
}

function alertTimingLabel(alert = {}) {
  if (alert.kind === "urgent-risk-review") {
    return `Urgent · Detected ${formatExactDateTime(alert.detectedAt || alert.createdAt || alert.dueAt)}`;
  }
  const due = new Date(alert.dueAt).getTime();
  const isDue = Number.isFinite(due) && due <= Date.now();
  return isDue ? `Due now · ${formatDateTime(alert.dueAt)}` : `Due ${formatDateTime(alert.dueAt)}`;
}

function renderProfileFavoriteTabs() {
  document.querySelectorAll("[data-profile-favorites-tab]").forEach((button) => {
    const isActive = button.dataset.profileFavoritesTab === activeProfileFavoritesTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll("[data-profile-favorites-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.profileFavoritesPanel !== activeProfileFavoritesTab;
  });
}

function setProfileFavoritesTab(tab) {
  activeProfileFavoritesTab = tab === "bundles" ? "bundles" : "coins";
  renderProfileFavoriteTabs();
}

function bundlePerformanceSnapshot(bundle = {}) {
  const allocation = Array.isArray(bundle.allocation) ? bundle.allocation : [];
  const startValue = finiteOrNull(bundle.startValueUsd) || finiteOrNull(bundle.amountUsd)
    || allocation.reduce((sum, coin) => sum + (finiteOrNull(coin.amountUsd) || 0), 0);
  if (!startValue) return { startValue: 0, currentValue: 0, changePercent: 0, tone: "neutral" };
  const submittedMatch = submittedBundleForRecentBundle(bundle);
  if (submittedMatch) {
    const performance = submittedBundlePerformance(submittedMatch);
    return {
      startValue: performance.startValue,
      currentValue: performance.currentValue,
      changePercent: performance.percent,
      tone: performance.percent > 0.05 ? "positive" : performance.percent < -0.05 ? "caution" : "neutral",
    };
  }
  const livePreferences = {
    ...safePreferences(),
    network: normalizeNetwork(bundle.network || safePreferences().network),
    risk: bundle.risk || safePreferences().risk,
    targetHorizon: normalizeTargetHorizon(bundle.targetHorizon || safePreferences().targetHorizon),
  };
  const currentValue = allocation.reduce((sum, coin) => {
    const amount = finiteOrNull(coin.amountUsd) || 0;
    const quantity = finiteOrNull(coin.quantity);
    const currentPrice = currentPriceForSubmittedToken(coin);
    if (quantity && currentPrice) return sum + quantity * currentPrice;
    const live = allocationSignalSnapshot(coin.ticker, livePreferences);
    const change = finiteOrNull(live?.change24h ?? coin.change24h) || 0;
    return sum + amount * (1 + change / 100);
  }, 0) || startValue;
  const changePercent = ((currentValue - startValue) / startValue) * 100;
  return {
    startValue,
    currentValue,
    changePercent,
    tone: changePercent > 0.05 ? "positive" : changePercent < -0.05 ? "caution" : "neutral",
  };
}

function bundleCoinSignature(coins = []) {
  return (Array.isArray(coins) ? coins : [])
    .map((coin) => normalizeTicker(coin.ticker))
    .filter(Boolean)
    .sort()
    .join("|");
}

function submittedBundleForRecentBundle(bundle = {}) {
  const allocation = Array.isArray(bundle.allocation) ? bundle.allocation : [];
  if (!allocation.length) return null;
  const signature = bundleCoinSignature(allocation);
  const network = normalizeNetwork(bundle.network || safePreferences().network);
  const createdAt = new Date(bundle.createdAt || 0).getTime();
  const startValue = finiteOrNull(bundle.startValueUsd) || finiteOrNull(bundle.amountUsd)
    || allocation.reduce((sum, coin) => sum + (finiteOrNull(coin.amountUsd) || 0), 0);
  const candidates = readSubmittedBundlesLocal().filter((record) => {
    if (!Array.isArray(record.coins) || !record.coins.length) return false;
    if (normalizeNetwork(record.network || network) !== network) return false;
    if (signature && bundleCoinSignature(record.coins) !== signature) return false;
    return record.coins.some((coin) => finiteOrNull(coin.quantity) && currentPriceForSubmittedToken(coin));
  });
  const exact = candidates.find((record) => record.bundleId && bundle.bundleId && record.bundleId === bundle.bundleId);
  if (exact) return exact;
  return candidates.find((record) => {
    const submittedAt = new Date(record.submittedAt || record.createdAt || 0).getTime();
    const submittedStart = finiteOrNull(record.startValueUsd) || finiteOrNull(record.amountUsd);
    const sameStart = !startValue || !submittedStart || Math.abs(startValue - submittedStart) < 1;
    const closeTime = !createdAt || !submittedAt || Math.abs(createdAt - submittedAt) < 10 * 60_000;
    return sameStart && closeTime;
  }) || null;
}

function renderProfileBundleCard(bundle = {}) {
  const displayName = bundleDisplayName(bundle);
  const isEditing = editingBundleNameId === bundle.id;
  const performance = bundlePerformanceSnapshot(bundle);
  const titleControl = isEditing ? `
    <form class="profile-bundle-rename" data-bundle-rename-form="${escapeAttribute(bundle.id)}">
      <input data-bundle-name-input="${escapeAttribute(bundle.id)}" type="text" maxlength="60" value="${escapeAttribute(displayName)}" aria-label="Bundle name" />
      <button type="submit">Save</button>
      <button type="button" data-cancel-rename-bundle="${escapeAttribute(bundle.id)}">Cancel</button>
    </form>
  ` : `
    <span class="profile-bundle-title-row">
      <strong>${escapeHtml(displayName)}</strong>
      <button class="profile-icon-button ${bundle.favorite ? "active" : ""}" type="button" data-favorite-bundle="${escapeAttribute(bundle.id)}" aria-label="${bundle.favorite ? "Remove bundle from favorites" : "Favorite this bundle"}" aria-pressed="${String(Boolean(bundle.favorite))}">${icon(bundle.favorite ? "starFilled" : "star")}</button>
      <button class="profile-icon-button" type="button" data-rename-bundle="${escapeAttribute(bundle.id)}" aria-label="Rename ${escapeAttribute(displayName)}">${icon("pencil")}</button>
    </span>
  `;
  return `
    <article class="profile-bundle-card ${bundle.favorite ? "is-favorite" : ""}">
      <header>
        <div>
          ${titleControl}
          <span>${escapeHtml(bundle.network)} · ${formatDateTime(bundle.createdAt)}${bundle.favorite ? " · favorite" : ""}</span>
        </div>
        <div class="profile-bundle-value">
          <strong>${formatCurrency(performance.currentValue)}</strong>
          <span class="${escapeAttribute(performance.tone)}">${formatPercent(performance.changePercent)}</span>
          <small>Started at ${formatCurrency(performance.startValue || bundle.amountUsd || 0)}</small>
        </div>
      </header>
      <div class="profile-allocation">${(bundle.allocation || []).map((coin) => `<span>${escapeHtml(coin.ticker)} <b>${coin.weight}%</b></span>`).join("")}</div>
      ${renderProfileBundleRead(bundle)}
      <div class="profile-bundle-actions">
        <button type="button" data-rebuild-bundle="${escapeAttribute(bundle.id)}">Rebuild this bundle</button>
        <button type="button" data-profile-remind="${escapeAttribute(bundle.id)}" data-profile-bundle="${escapeAttribute(bundle.bundleId)}">Schedule analysis</button>
      </div>
    </article>
  `;
}

function renderProfile() {
  if (!profileBundleList || !profileAlertList) return;
  updateProfileLoginUi();
  const localProfile = readLocalProfile();
  const displayName = displayNameFromProfile(localProfile);
  updatePersonalGreeting(displayName);
  if (profileDisplayName) profileDisplayName.value = displayName;
  if (profileDialogTitle) profileDialogTitle.textContent = displayName ? `${displayName}'s profile` : "Profile";
  renderMachineAccuracy();
  const recent = readRecentBundles()
    .sort((a, b) => Number(Boolean(b.favorite)) - Number(Boolean(a.favorite))
      || new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  const favoriteBundles = recent.filter((bundle) => bundle.favorite);
  const alerts = readReviewAlerts().filter((item) => item.status === "pending");
  const favorites = readFavoriteCoins();
  renderProfileFavoriteTabs();
  if (profileFavoriteList) {
    const favoriteActions = favorites.length
      ? `<div class="profile-inline-actions"><button type="button" data-create-from-favorites>Create bundle from favorite coins</button></div>`
      : "";
    profileFavoriteList.innerHTML = favorites.length ? `${favoriteActions}${favorites.map((coin) => {
      const ticker = normalizeTicker(coin.ticker);
      const network = normalizeNetwork(coin.network);
      const read = favoriteStoredRead(coin);
      const context = [
        coin.edgeLabel,
        coin.setupLabel,
        coin.volume24h ? `${formatCompactUsd(coin.volume24h)} volume` : "",
      ].filter(Boolean).join(" · ");
      return `
        <article class="profile-favorite-card">
          <div>
            <strong>${escapeHtml(ticker)}${coin.name && coin.name !== ticker ? ` - ${escapeHtml(coin.name)}` : ""}</strong>
            <span>${escapeHtml(network)} · saved ${formatDateTime(coin.addedAt)}</span>
            <small>${escapeHtml(context || coin.note || "Saved from Live Market Pulse.")}</small>
            <div class="profile-favorite-read ${escapeAttribute(read.tone)}">
              <b>${escapeHtml(read.label)}</b>
              <div class="profile-favorite-meta">
                <span>${escapeHtml(read.changeLabel)}</span>
                <span>${escapeHtml(read.holdLabel)}</span>
                <span>${escapeHtml(read.sevenDay.chip)}</span>
              </div>
              ${renderSevenDayMeter(read.sevenDay)}
              <small>${escapeHtml(read.text)}</small>
              <small>${escapeHtml(read.holderText)}</small>
            </div>
          </div>
          <button type="button" data-remove-favorite-coin="${escapeAttribute(ticker)}" data-remove-favorite-network="${escapeAttribute(network)}">Remove</button>
        </article>
      `;
    }).join("")}` : '<p class="profile-empty">Favorite coins appear here after you star a market pulse coin.</p>';
  }
  if (profileFavoriteBundleList) {
    profileFavoriteBundleList.innerHTML = favoriteBundles.length
      ? favoriteBundles.map(renderProfileBundleCard).join("")
      : '<p class="profile-empty">Favorite bundles appear here after you star a recent bundle.</p>';
  }
  profileBundleList.innerHTML = recent.length
    ? recent.map(renderProfileBundleCard).join("")
    : '<p class="profile-empty">Bundles appear here after you complete the ViciSwap review handoff.</p>';
  profileAlertList.innerHTML = alerts.length ? alerts.map((alert) => {
    return `
      <article class="profile-alert-card ${alert.kind === "urgent-risk-review" ? "is-due urgent" : new Date(alert.dueAt).getTime() <= Date.now() ? "is-due" : ""}">
        <div><strong>${alert.kind === "urgent-risk-review" ? "Urgent market review" : "Scheduled analysis"}: ${escapeHtml(alert.bundleName || "Bundle")}</strong><span>${escapeHtml(alertTimingLabel(alert))}</span><small>${escapeHtml(alert.analysis || "Recheck the market before making a decision.")}</small></div>
        <div class="profile-alert-actions">
          <button type="button" data-dismiss-alert="${escapeAttribute(alert.id)}">Dismiss</button>
        </div>
      </article>
    `;
  }).join("") : '<p class="profile-empty">No review reminders yet.</p>';
}

function renderProfileBundleRead(bundle = {}) {
  const read = bundleWeightedRead(bundle);
  return `
    <div class="profile-bundle-read ${escapeAttribute(read.tone)}">
      <b>${escapeHtml(read.label)}</b>
      <div class="profile-read-meta">
        <span>${escapeHtml(read.changeLabel)}</span>
        <span>${escapeHtml(read.holdLabel)}</span>
        <span>${escapeHtml(read.sevenDay.chip)}</span>
      </div>
      ${renderSevenDayMeter(read.sevenDay)}
      <small>${escapeHtml(read.text)}</small>
      <small>${escapeHtml(read.holderText)}</small>
    </div>
  `;
}

function createBundleFromFavorites() {
  const network = safePreferences().network;
  const favorites = readFavoriteCoins()
    .map((coin) => normalizeTicker(coin.ticker))
    .filter((ticker, index, tickers) => ticker && tickers.indexOf(ticker) === index && isTickerOnNetwork(ticker, network));
  if (!favorites.length) {
    showToast(`No favorite coins are available on ${network}.`);
    return;
  }
  selectedCoinPreferences = new Set(favorites);
  if (diversityToggle) diversityToggle.checked = true;
  if (coinCount) {
    coinCount.value = String(Math.max(Number(coinCount.min || 3), Math.min(Number(coinCount.max || 12), favorites.length)));
    coinCount.disabled = false;
    coinCountValue.textContent = `${coinCount.value} coins`;
  }
  diversitySliderWrap?.setAttribute("aria-disabled", "false");
  clearManualAllocationOverride();
  renderCoinPreferenceChips();
  renderNetworkGroups();
  renderCoinRows();
  saveBuilderPreferences();
  closeProfile();
  showToast(`Bundle preferences set from ${favorites.length} favorite coin${favorites.length === 1 ? "" : "s"}.`);
  if (!recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: true });
}

function rebuildFromRecentBundle(snapshotId) {
  const snapshot = readRecentBundles().find((bundle) => bundle.id === snapshotId);
  if (!snapshot?.allocation?.length) {
    showToast("That saved bundle does not have coins to rebuild.");
    return;
  }
  const network = normalizeNetwork(snapshot.network || safePreferences().network);
  if (targetNetwork && [...targetNetwork.options].some((option) => option.value === network && !option.disabled)) {
    targetNetwork.value = network;
  }
  const tickers = snapshot.allocation
    .map((coin) => normalizeTicker(coin.ticker))
    .filter((ticker, index, list) => ticker && list.indexOf(ticker) === index && isTickerOnNetwork(ticker, network));
  if (!tickers.length) {
    showToast(`No saved coins are available on ${network}.`);
    return;
  }
  selectedCoinPreferences = new Set(tickers);
  if (diversityToggle) diversityToggle.checked = true;
  if (coinCount) {
    const min = Number(coinCount.min || 3);
    const max = Number(coinCount.max || 12);
    coinCount.value = String(Math.max(min, Math.min(max, tickers.length)));
    coinCount.disabled = false;
    coinCountValue.textContent = `${coinCount.value} coins`;
  }
  diversitySliderWrap?.setAttribute("aria-disabled", "false");
  const riskControl = form.elements.namedItem("risk");
  if (riskControl && snapshot.risk) riskControl.value = snapshot.risk;
  const horizonControl = form.elements.namedItem("targetHorizon");
  if (horizonControl && snapshot.targetHorizon) horizonControl.value = normalizeTargetHorizon(snapshot.targetHorizon);
  clearManualAllocationOverride();
  renderCoinPreferenceChips();
  renderNetworkGroups();
  renderCoinRows();
  saveBuilderPreferences();
  closeProfile();
  showToast(`${bundleDisplayName(snapshot)} loaded into the builder.`);
  if (bundleAmount.checkValidity()) buildBundle({ scroll: true });
}

function renderSevenDayMeter(read = {}) {
  const score = Math.round(clamp(finiteOrNull(read.score) ?? 50, 0, 100));
  const bearish = 100 - score;
  const isBearish = bearish > score;
  const dominantScore = isBearish ? bearish : score;
  const dominantLabel = dominantScore === 50 ? "Balanced" : `${dominantScore}% ${isBearish ? "Bearish" : "Bullish"}`;
  const tone = dominantScore === 50 ? "neutral" : isBearish ? "caution" : "positive";
  const fillStyle = isBearish
    ? `width: ${dominantScore}%; margin-left: ${100 - dominantScore}%`
    : `width: ${dominantScore}%`;
  return `
    <div class="seven-day-meter ${escapeAttribute(tone)} ${isBearish ? "bearish" : "bullish"}" aria-label="${escapeAttribute(read.chip || "Directional read")} ${dominantLabel}">
      <div class="seven-day-meter-track"><span style="${fillStyle}"></span></div>
      <div class="seven-day-meter-labels"><span>Bullish</span><strong>${escapeHtml(dominantLabel)}</strong><span>Bearish</span></div>
    </div>
  `;
}

function updateReviewAlert(alertId, updater) {
  const alerts = readReviewAlerts().map((alert) => alert.id === alertId ? updater({ ...alert }) : alert);
  profileStore.writeArray(reviewAlertsStorageKey, alerts);
  renderProfile();
  showDueReviewAlerts();
}

function dismissReviewAlert(alertId) {
  updateReviewAlert(alertId, (alert) => ({ ...alert, status: "dismissed", dismissedAt: new Date().toISOString() }));
}

function showDueReviewAlerts() {
  if (!notificationCenter) return;
  const dueAlerts = readReviewAlerts().filter((alert) => alert.status === "pending" && new Date(alert.dueAt).getTime() <= Date.now());
  notificationCenter.innerHTML = dueAlerts.slice(0, 3).map((alert) => `
    <aside class="review-notification ${alert.kind === "urgent-risk-review" ? "urgent" : ""}" role="status">
      <div><strong>${alert.kind === "urgent-risk-review" ? "Urgent market review" : "Scheduled bundle analysis"}</strong><span>${escapeHtml(alertTimingLabel(alert))} · ${escapeHtml(alert.bundleName || "Your bundle")}</span><span>${escapeHtml(alert.analysis || "Recheck the market, route, liquidity, and allocation before deciding whether to hold, rebalance, or exit.")}</span></div>
      <div><button type="button" data-open-profile>Review</button><button type="button" data-dismiss-alert="${escapeAttribute(alert.id)}" aria-label="Dismiss reminder">&times;</button></div>
    </aside>
  `).join("");
}

function urgentMarketReviewReasons(candidate = {}) {
  const reasons = [];
  const change = finiteOrNull(candidate.change24h);
  const liquidity = finiteOrNull(candidate.liquidityUsd);
  const setup = candidate.marketSetup || marketSetupSignal(candidate, candidate, candidate.prices);
  if (change !== null && change <= -8) reasons.push(`${formatPercent(change)} over 24h`);
  if (Number.isFinite(setup?.score) && setup.score <= -5) reasons.push("the market setup has weakened materially");
  if (liquidity !== null && liquidity < 250_000 && change !== null && change <= -4) {
    reasons.push(`route depth is only ${formatCompactUsd(liquidity)}`);
  }
  return reasons;
}

function maybeQueueUrgentMarketReviews(favorites = currentFavorites) {
  const recent = readRecentBundles();
  if (!recent.length || !Array.isArray(favorites) || !favorites.length) return;
  const candidates = new Map(favorites.map((candidate) => [normalizeTicker(candidate.ticker), candidate]));
  const existing = readReviewAlerts();
  const dayKey = new Date().toISOString().slice(0, 10);
  const created = [];

  recent.slice(0, 10).forEach((bundle) => {
    const flagged = (bundle.allocation || []).map((coin) => {
      const candidate = candidates.get(normalizeTicker(coin.ticker));
      const reasons = candidate ? urgentMarketReviewReasons(candidate) : [];
      return reasons.length ? { ticker: normalizeTicker(coin.ticker), reasons } : null;
    }).filter(Boolean);
    if (!flagged.length) return;
    const signalKey = `urgent:${bundle.id}:${dayKey}:${flagged.map((item) => item.ticker).sort().join("-")}`;
    if (existing.some((alert) => alert.signalKey === signalKey)) return;
    const summary = flagged.map((item) => `${item.ticker}: ${item.reasons.join(" and ")}`).join("; ");
    created.push({
      id: `urgent-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      signalKey,
      bundleId: bundle.bundleId,
      snapshotId: bundle.id,
      bundleName: bundle.name,
      dueAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      detectedAt: new Date().toISOString(),
      kind: "urgent-risk-review",
      analysis: `Fresh market data suggests a prompt review, not an automatic sell: ${summary}. Recheck the quote, route, liquidity, allocation, and your own risk plan before acting.`,
      status: "pending",
    });
  });

  if (!created.length) return;
  profileStore.writeArray(reviewAlertsStorageKey, [...created, ...existing].slice(0, 40));
  renderProfile();
  showDueReviewAlerts();
}

function openProfile() {
  renderProfile();
  loadMachineAccuracySummary();
  if (typeof profileDialog?.showModal === "function") {
    if (!profileDialog.open) profileDialog.showModal();
  } else {
    profileDialog?.setAttribute("open", "");
  }
}

function closeProfile() {
  if (typeof profileDialog?.close === "function" && profileDialog.open) profileDialog.close();
  else profileDialog?.removeAttribute("open");
}

function hasSeenTour() {
  try {
    return localStorage.getItem(tourSeenStorageKey) === "true";
  } catch {
    return false;
  }
}

function tourVisualMarkup(type) {
  const visual = {
    sliders: '<span class="tour-slider"></span><span class="tour-slider short"></span><span class="tour-slider"></span>',
    pulse: '<span class="tour-pulse-line"></span><span class="tour-pulse-dot"></span>',
    fit: '<span class="tour-ring"><b>92</b></span>',
    allocation: '<span class="tour-bar wide"></span><span class="tour-bar medium"></span><span class="tour-bar short"></span>',
    review: '<span class="tour-check">&#10003;</span><span class="tour-bell">!</span>',
  };
  return visual[type] || visual.sliders;
}

function renderTour() {
  const slide = tourSlides[tourIndex];
  if (!slide || !tourTitle || !tourBody || !tourDots) return;
  tourVisual.innerHTML = tourVisualMarkup(slide.icon);
  tourTitle.textContent = slide.title;
  tourBody.textContent = slide.body;
  tourBack.disabled = tourIndex === 0;
  tourNext.textContent = tourIndex === tourSlides.length - 1 ? "Start building" : "Next";
  tourDots.innerHTML = tourSlides.map((_, index) => `<button type="button" data-tour-index="${index}" class="${index === tourIndex ? "active" : ""}" aria-label="Go to tutorial step ${index + 1}"></button>`).join("");
}

function openTour({ force = false } = {}) {
  if (!onboardingTour || (!force && hasSeenTour()) || !hasAcceptedTerms()) return;
  tourIndex = 0;
  renderTour();
  if (typeof onboardingTour.showModal === "function") {
    if (!onboardingTour.open) onboardingTour.showModal();
  } else {
    onboardingTour.setAttribute("open", "");
  }
}

function closeTour({ remember = true } = {}) {
  if (remember) {
    try { localStorage.setItem(tourSeenStorageKey, "true"); } catch { /* Keep the tour dismissible for this session. */ }
  }
  if (typeof onboardingTour?.close === "function" && onboardingTour.open) onboardingTour.close();
  else onboardingTour?.removeAttribute("open");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  openAmountDialog();
});

document.body.addEventListener("submit", (event) => {
  const renameForm = event.target.closest("[data-bundle-rename-form]");
  if (!renameForm) return;
  event.preventDefault();
  const input = renameForm.querySelector("[data-bundle-name-input]");
  saveRecentBundleName(renameForm.dataset.bundleRenameForm, input?.value);
});

form.addEventListener("change", (event) => {
  if (event.target.matches('input[name="theme"]')) {
    syncCoinPreferenceFilterToFocus(event.target.value);
  }
  if (event.target.matches('input[name="coinPrefs"]')) {
    const ticker = normalizeTicker(event.target.value);
    if (event.target.checked) selectedCoinPreferences.add(ticker);
    else selectedCoinPreferences.delete(ticker);
    renderSelectedCoinSummary();
  }
  clearManualAllocationOverride();
  saveBuilderPreferences();
  updateFavoriteToggle();
  if (event.target === targetNetwork) return;
  renderNetworkGroups();
  renderCoinLookupOptions();
  renderCoinRows();
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
});
form.addEventListener("input", (event) => {
  if (event.target === bundleAmount || event.target === coinCount) return;
  clearManualAllocationOverride();
  saveBuilderPreferences();
  renderNetworkGroups();
  renderCoinLookupOptions();
  renderCoinRows();
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
});
targetNetwork.addEventListener("change", () => {
  marketPulseReady = false;
  clearManualAllocationOverride();
  saveBuilderPreferences();
  renderNetworkGroups();
  renderCoinLookupOptions();
  clearCoinLookup();
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
themeToggle?.addEventListener("click", toggleThemePreference);
coinSearch.addEventListener("input", renderCoinRows);
diversityToggle.addEventListener("change", () => {
  coinCount.disabled = !diversityToggle.checked;
  diversitySliderWrap.setAttribute("aria-disabled", String(!diversityToggle.checked));
});
coinCount.addEventListener("input", () => {
  coinCountValue.textContent = `${coinCount.value} coins`;
  clearManualAllocationOverride();
  saveBuilderPreferences();
  renderNetworkGroups();
  renderCoinRows();
  if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
});

useFavoriteCoin.addEventListener("click", () => {
  if (!currentFavorite?.ticker) return;
  const ticker = normalizeTicker(currentFavorite.ticker);
  if (!isTickerOnNetwork(ticker, getPreferences().network)) {
    showToast(`${currentFavorite.ticker} is not available on ${getPreferences().network}.`);
    return;
  }
  const isUsing = selectedCoinPreferences.has(ticker);
  if (isUsing) {
    selectedCoinPreferences.delete(ticker);
  } else {
    const themeInput = document.querySelector(`input[name="theme"][value="${currentFavorite.theme}"]`);
    if (themeInput) {
      themeInput.checked = true;
      syncCoinPreferenceFilterToFocus(currentFavorite.theme);
    }
    selectedCoinPreferences.add(ticker);
  }
  renderCoinPreferenceChips();
  saveBuilderPreferences();
  if (!isUsing) {
    showToast(`${currentFavorite.ticker} added to your preferences.`);
    if (bundleAmount.checkValidity() && !recommendation.hidden) buildBundle({ scroll: false });
  } else {
    showToast(`${currentFavorite.ticker} removed from your preferences.`);
    if (!recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
  }
  updateFavoriteToggle();
});

favoriteMarketCoin?.addEventListener("click", () => toggleFavoriteMarketCoin(currentFavorite));

coinLookupInput?.addEventListener("input", handleCoinLookupInput);
coinLookupInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  runCoinLookupFromInput({ force: true });
});
coinLookupInput?.addEventListener("change", () => runCoinLookupFromInput({ force: true }));
coinLookupClear?.addEventListener("click", clearCoinLookup);
lookupCoinClose?.addEventListener("click", closeCoinLookupPopup);
coinLookupCard?.addEventListener("click", (event) => {
  if (event.target === coinLookupCard) closeCoinLookupPopup();
});
lookupCoinWindow?.addEventListener("change", (event) => {
  selectedLookupWindow = event.target.value;
  renderCoinLookupCard(lookupSelectedCoin);
  ensureLookupWindowChart(lookupSelectedCoin, selectedLookupWindow);
});

coinPreferenceSearch?.addEventListener("input", renderCoinPreferenceChips);
coinPreferenceCategory?.addEventListener("change", renderCoinPreferenceChips);

profileButton?.addEventListener("click", openProfile);
profileClose?.addEventListener("click", closeProfile);
profileDialog?.addEventListener("cancel", closeProfile);
profileRequestCode?.addEventListener("click", requestProfileCode);
profileVerifyCode?.addEventListener("click", verifyProfileCode);
profileSyncNow?.addEventListener("click", () => loadProfileSnapshot());
profileLogout?.addEventListener("click", logoutProfile);
profileEmail?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  profileRequestCode?.click();
});
profileLoginCode?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  profileVerifyCode?.click();
});
profileSaveName?.addEventListener("click", () => {
  const displayName = String(profileDisplayName?.value || "").trim().slice(0, 40);
  if (!profileStore.writeProfile({ ...readLocalProfile(), displayName })) return;
  renderProfile();
  showToast(displayName ? `Profile saved for ${displayName}.` : "Profile name cleared.");
});
profileDisplayName?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  profileSaveName?.click();
});
tourHelp?.addEventListener("click", () => openTour({ force: true }));
tourClose?.addEventListener("click", () => closeTour());
onboardingTour?.addEventListener("cancel", () => closeTour());
tourBack?.addEventListener("click", () => {
  tourIndex = Math.max(0, tourIndex - 1);
  renderTour();
});
tourNext?.addEventListener("click", () => {
  if (tourIndex >= tourSlides.length - 1) closeTour();
  else {
    tourIndex += 1;
    renderTour();
  }
});

pulseRefresh?.addEventListener("click", () => {
  pulseRefresh.disabled = true;
  unavailablePulseWindows.clear();
  refreshMarketPulse({ preserveSelection: true }).finally(() => {
    pulseRefresh.disabled = false;
  });
});

marketHealthRing?.addEventListener("click", toggleMarketHealthDetails);
marketHealthRing?.addEventListener("keydown", (event) => {
  if (!["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  toggleMarketHealthDetails();
});

favoriteCoinWindow?.addEventListener("change", (event) => {
  setPulseWindow(event.target.value);
});

pulsePrev?.addEventListener("click", () => movePulseCandidate(-1));
pulseNext?.addEventListener("click", () => movePulseCandidate(1));

function closeEntryCautionPopovers() {
  document.querySelectorAll(".pulse-entry-flag[aria-expanded='true']").forEach((button) => {
    const wrapper = button.closest(".pulse-entry-warning");
    const panel = wrapper?.querySelector(".pulse-entry-popover");
    button.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  });
}

let pulseSummaryReturnFocus = null;

function closePulseSummaryPopovers() {
  const returnFocus = pulseSummaryReturnFocus;
  pulseSummaryReturnFocus = null;
  document.querySelectorAll(".pulse-ai-trigger[aria-expanded='true']").forEach((button) => {
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    const wrapper = button.closest(".pulse-ai-summary");
    button.setAttribute("aria-expanded", "false");
    if (!panel) return;
    panel.hidden = true;
    panel.classList.remove("is-modal");
    if (wrapper?.isConnected) wrapper.append(panel);
    else panel.remove();
  });
  const layer = document.getElementById("pulseAiModalLayer");
  layer?.querySelectorAll(".pulse-ai-popover.is-modal").forEach((panel) => {
    panel.hidden = true;
    panel.remove();
  });
  if (layer) layer.hidden = true;
  document.body.classList.remove("pulse-ai-modal-open");
  if (returnFocus?.isConnected) {
    requestAnimationFrame(() => returnFocus.focus({ preventScroll: true }));
  }
}

function openPulseSummaryModal(button, panel) {
  const layer = document.getElementById("pulseAiModalLayer");
  if (!layer || !button || !panel) return;
  pulseSummaryReturnFocus = button;
  button.setAttribute("aria-expanded", "true");
  panel.classList.add("is-modal");
  layer.append(panel);
  layer.hidden = false;
  panel.hidden = false;
  document.body.classList.add("pulse-ai-modal-open");
  requestAnimationFrame(() => panel.querySelector(".pulse-ai-close")?.focus({ preventScroll: true }));
}

document.body.addEventListener("click", (event) => {
  const profileFavoritesTab = event.target.closest("[data-profile-favorites-tab]");
  if (profileFavoritesTab) {
    setProfileFavoritesTab(profileFavoritesTab.dataset.profileFavoritesTab);
    return;
  }
  if (event.target.closest("[data-create-from-favorites]")) {
    createBundleFromFavorites();
    return;
  }
  const rebuildBundle = event.target.closest("[data-rebuild-bundle]");
  if (rebuildBundle) {
    rebuildFromRecentBundle(rebuildBundle.dataset.rebuildBundle);
    return;
  }
  const readScrollNext = event.target.closest("[data-read-scroll-next]");
  if (readScrollNext) {
    scrollReadCarousel(readScrollNext.closest(".pulse-read-track"), 1);
    return;
  }
  const readScrollPrev = event.target.closest("[data-read-scroll-prev]");
  if (readScrollPrev) {
    scrollReadCarousel(readScrollPrev.closest(".pulse-read-track"), -1);
    return;
  }
  const pulseReadWindow = event.target.closest("[data-pulse-read-window]");
  if (pulseReadWindow) {
    const key = pulseReadWindow.dataset.pulseReadWindow || "7d";
    setPulseReadWindow(key, { projected: key === selectedPulseReadWindow && !isProjectedPulseWindow(selectedPulseWindow) });
    return;
  }
  const lookupReadWindow = event.target.closest("[data-lookup-read-window]");
  if (lookupReadWindow) {
    const key = lookupReadWindow.dataset.lookupReadWindow || "1d";
    setLookupReadWindow(key, { projected: key === selectedLookupReadWindow && !isProjectedPulseWindow(selectedLookupWindow) });
    return;
  }
  const favoriteToken = event.target.closest("[data-favorite-token]");
  if (favoriteToken) {
    toggleFavoriteBundleToken(favoriteToken.dataset.favoriteToken);
    return;
  }
  const removeFavorite = event.target.closest("[data-remove-favorite-coin]");
  if (removeFavorite) {
    removeFavoriteCoin(removeFavorite.dataset.removeFavoriteCoin, removeFavorite.dataset.removeFavoriteNetwork);
    return;
  }
  const removeCoin = event.target.closest("[data-remove-coin]");
  if (removeCoin) {
    selectedCoinPreferences.delete(normalizeTicker(removeCoin.dataset.removeCoin));
    renderCoinPreferenceChips();
    saveBuilderPreferences();
    updateFavoriteToggle();
    if (currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) buildBundle({ scroll: false });
    return;
  }
  const resetAllocation = event.target.closest("[data-reset-allocation]");
  if (resetAllocation) {
    clearManualAllocationOverride();
    if (currentBundle) renderPrimary(currentBundle);
    showToast("ViciSwap equal split restored.");
    return;
  }
  const scheduleReview = event.target.closest("[data-schedule-review]");
  if (scheduleReview) {
    const delayControl = document.getElementById("resultReviewDelay");
    const dateControl = document.getElementById("resultReviewDateTime");
    if (delayControl?.value === "custom") {
      const chosenDate = new Date(dateControl?.value || "");
      if (!Number.isFinite(chosenDate.getTime()) || chosenDate.getTime() <= Date.now()) {
        showToast("Choose a future date and time for the analysis.");
        dateControl?.focus();
        return;
      }
      scheduleBundleReview(scheduleReview.dataset.scheduleReview, bundleReviewDelay(), { dueAt: chosenDate.toISOString() });
    } else {
      const delay = Number(delayControl?.value || bundleReviewDelay());
      scheduleBundleReview(scheduleReview.dataset.scheduleReview, delay);
    }
    return;
  }
  const favoriteBundle = event.target.closest("[data-favorite-bundle]");
  if (favoriteBundle) {
    toggleFavoriteBundle(favoriteBundle.dataset.favoriteBundle);
    return;
  }
  const renameBundle = event.target.closest("[data-rename-bundle]");
  if (renameBundle) {
    renameRecentBundle(renameBundle.dataset.renameBundle);
    return;
  }
  const cancelRenameBundle = event.target.closest("[data-cancel-rename-bundle]");
  if (cancelRenameBundle) {
    cancelRecentBundleRename();
    return;
  }
  const profileReminder = event.target.closest("[data-profile-remind]");
  if (profileReminder) {
    scheduleBundleReview(profileReminder.dataset.profileBundle, bundleReviewDelay(), { snapshotId: profileReminder.dataset.profileRemind });
    return;
  }
  const dismissAlert = event.target.closest("[data-dismiss-alert]");
  if (dismissAlert) {
    dismissReviewAlert(dismissAlert.dataset.dismissAlert);
    return;
  }
  if (event.target.closest("[data-open-profile]")) {
    openProfile();
    return;
  }
  const tourDot = event.target.closest("[data-tour-index]");
  if (tourDot) {
    tourIndex = clamp(Number(tourDot.dataset.tourIndex) || 0, 0, tourSlides.length - 1);
    renderTour();
    return;
  }
  const entryFlag = event.target.closest(".pulse-entry-flag");
  if (entryFlag) {
    event.preventDefault();
    event.stopPropagation();
    const wrapper = entryFlag.closest(".pulse-entry-warning");
    const panel = wrapper?.querySelector(".pulse-entry-popover");
    const willOpen = entryFlag.getAttribute("aria-expanded") !== "true";
    closeEntryCautionPopovers();
    entryFlag.setAttribute("aria-expanded", String(willOpen));
    if (panel) panel.hidden = !willOpen;
    return;
  }
  const summaryButton = event.target.closest(".pulse-ai-trigger");
  if (summaryButton) {
    event.preventDefault();
    event.stopPropagation();
    const panelId = summaryButton.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    const willOpen = summaryButton.getAttribute("aria-expanded") !== "true";
    closeEntryCautionPopovers();
    closePulseSummaryPopovers();
    if (willOpen && panel) openPulseSummaryModal(summaryButton, panel);
    return;
  }
  const summaryClose = event.target.closest(".pulse-ai-close");
  if (summaryClose) {
    event.preventDefault();
    event.stopPropagation();
    closePulseSummaryPopovers();
    return;
  }
  const summaryLayer = event.target.closest(".pulse-ai-modal-layer");
  if (summaryLayer && event.target === summaryLayer) {
    closePulseSummaryPopovers();
    return;
  }
  if (!event.target.closest(".pulse-entry-warning")) closeEntryCautionPopovers();
  if (!event.target.closest(".pulse-ai-summary") && !event.target.closest(".pulse-ai-popover")) closePulseSummaryPopovers();

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

document.body.addEventListener("scroll", (event) => {
  if (event.target?.classList?.contains("pulse-read-carousel")) {
    updateReadScrollCues(event.target.closest(".pulse-read-track"));
  }
}, true);

document.body.addEventListener("change", (event) => {
  if (event.target.id === "resultReviewDelay") {
    const dateControl = document.getElementById("resultReviewDateTime");
    if (dateControl) {
      const custom = event.target.value === "custom";
      dateControl.hidden = !custom;
      if (custom && !dateControl.value) {
        const defaultDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        defaultDate.setMinutes(defaultDate.getMinutes() - defaultDate.getTimezoneOffset());
        dateControl.value = defaultDate.toISOString().slice(0, 16);
        dateControl.min = new Date(Date.now() + 60_000).toISOString().slice(0, 16);
      }
    }
    return;
  }
  const allocationInput = event.target.closest("[data-allocation-weight]");
  if (!allocationInput) return;
  rebalanceAllocation(allocationInput.dataset.allocationWeight, allocationInput.value);
  if (currentBundle) renderPrimary(currentBundle);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("pulse-ai-modal-open")) {
    closePulseSummaryPopovers();
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeEntryCautionPopovers();
  if (event.key === "Escape") closeCoinLookupPopup();
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

applyThemePreference(readThemePreference());
restoreBuilderPreferences();
renderNetworkGroups();
renderCoinLookupOptions();
syncCoinPreferenceFilterToFocus(safePreferences().theme, { clearSearch: false });
updateCoinPreferenceAvailability();
renderCoinRows();
showTermsGate();
renderProfile();
if (isProfileSignedIn()) loadProfileSnapshot({ silent: true });
showDueReviewAlerts();
if (hasAcceptedTerms() && !hasSeenTour()) window.setTimeout(() => openTour(), 350);
startCoinLookupMoodTicker();
renderMarketHealth();
window.setInterval(() => renderMarketHealth({ force: true }), MARKET_HEALTH_CACHE_MS);
refreshMarketPulse({ preserveSelection: false });
refreshViciCoinsFromApi({ announce: false }).catch(() => {
  // If the office API is temporarily offline, the builder keeps using scan/starter support data.
});
let marketPulseIntervalId = null;
function startMarketPulseBackgroundRefresh() {
  if (marketPulseIntervalId || document.hidden) return;
  marketPulseIntervalId = window.setInterval(() => refreshMarketPulse({ preserveSelection: true, silent: true, render: false }), marketPulseBackgroundRefreshMs);
}

function stopMarketPulseBackgroundRefresh() {
  if (!marketPulseIntervalId) return;
  window.clearInterval(marketPulseIntervalId);
  marketPulseIntervalId = null;
}

startMarketPulseBackgroundRefresh();
setInterval(showDueReviewAlerts, 1000 * 60);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopMarketPulseBackgroundRefresh();
    return;
  }
  showDueReviewAlerts();
  startMarketPulseBackgroundRefresh();
  refreshMarketPulse({ preserveSelection: true, silent: true, render: false });
});
window.addEventListener("pagehide", stopMarketPulseBackgroundRefresh);

let headerScrollFrame = 0;
function syncCompactMobileHeader() {
  if (!appHeader) return;
  const shouldCompact = false;
  appHeader.classList.toggle("is-compact", shouldCompact);
}
window.addEventListener("scroll", () => {
  if (headerScrollFrame) return;
  headerScrollFrame = window.requestAnimationFrame(() => {
    headerScrollFrame = 0;
    syncCompactMobileHeader();
  });
}, { passive: true });
window.addEventListener("resize", syncCompactMobileHeader);
syncCompactMobileHeader();

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
        maybeQueueUrgentMarketReviews(currentFavorites);
        logPulseSnapshot(currentFavorites);
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
      maybeQueueUrgentMarketReviews(currentFavorites);
      logPulseSnapshot(currentFavorites);
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
    if (render) {
      pulseChartWarmSeq += 1;
      renderMarketPulse(currentFavorite, currentFavorites);
      loadVisiblePulseChartInBackground(refreshId);
      warmPulseWindowCharts(currentFavorite);
      warmPulseChartsAround(currentFavoriteIndex);
    }
    if (render) renderCoinRows();
    if (render && currentBundle && !recommendation.hidden && bundleAmount.checkValidity()) {
      buildBundle({ scroll: false });
    }
  } finally {
    if (!silent) stopPulseLoading();
  }
}

function renderCoinLookupOptions() {
  if (!coinLookupOptions) return;
  const { network } = safePreferences();
  const options = getViciMarketCandidates(network)
    .map((coin) => {
      const token = tokenInfoForNetwork(coin.ticker, network);
      const address = normalizeContractAddress(token?.address || token?.addresses?.[normalizeNetwork(network)]);
      return {
        ticker: coin.ticker,
        name: coin.name || coin.ticker,
        address,
        label: `${coin.ticker} - ${coin.name || coin.ticker}`,
      };
    })
    .sort((a, b) => a.ticker.localeCompare(b.ticker));
  coinLookupOptions.innerHTML = options.map((coin) => `
    <option value="${escapeAttribute(coin.label)}" label="${escapeAttribute([coin.name, coin.address].filter(Boolean).join(" · "))}"></option>
  `).join("");
}

function handleCoinLookupInput() {
  if (!coinLookupInput) return;
  window.clearTimeout(coinLookupTimer);
  const value = String(coinLookupInput.value || "").trim();
  if (coinLookupClear) coinLookupClear.hidden = !value && !lookupSelectedCoin;
  if (!value) {
    clearCoinLookup({ keepInput: true });
    return;
  }
  coinLookupTimer = window.setTimeout(() => runCoinLookupFromInput({ force: false }), 650);
}

function clearCoinLookup({ keepInput = false } = {}) {
  lookupSelectedCoin = null;
  coinLookupSeq += 1;
  window.clearTimeout(coinLookupTimer);
  if (!keepInput && coinLookupInput) coinLookupInput.value = "";
  closeCoinLookupPopup();
  if (coinLookupStatus) coinLookupStatus.textContent = "Pull up a ViciSwap-supported coin without changing the live favorite deck.";
  if (coinLookupClear) coinLookupClear.hidden = !String(coinLookupInput?.value || "").trim();
}

function openCoinLookupPopup() {
  if (!coinLookupCard) return;
  coinLookupCard.hidden = false;
  coinLookupCard.classList.add("is-open");
  document.body.classList.add("coin-lookup-modal-open");
}

function closeCoinLookupPopup() {
  if (!coinLookupCard) return;
  coinLookupCard.classList.remove("is-open");
  coinLookupCard.hidden = true;
  document.body.classList.remove("coin-lookup-modal-open");
}

function resolveCoinLookupCandidate(value = coinLookupInput?.value) {
  const query = String(value || "").trim();
  const normalizedQuery = normalizeTicker(query.split(/\s+[-–—]\s+|\s+/)[0]);
  const compactQuery = query.toLowerCase();
  if (!query) return null;
  const { network } = safePreferences();
  const candidates = getViciMarketCandidates(network)
    .map((coin) => {
      const token = tokenInfoForNetwork(coin.ticker, network);
      const address = normalizeContractAddress(token?.address || token?.addresses?.[normalizeNetwork(network)]);
      return { ...coin, address, lookupLabel: `${coin.ticker} - ${coin.name || coin.ticker}` };
    });
  return candidates.find((coin) => coin.ticker === normalizedQuery)
    || candidates.find((coin) => normalizeContractAddress(query) && coin.address === normalizeContractAddress(query))
    || candidates.find((coin) => coin.lookupLabel.toLowerCase() === compactQuery)
    || candidates.find((coin) => String(coin.name || "").toLowerCase() === compactQuery)
    || candidates.find((coin) => coin.ticker.toLowerCase().startsWith(compactQuery))
    || candidates.find((coin) => String(coin.name || "").toLowerCase().includes(compactQuery))
    || null;
}

async function runCoinLookupFromInput({ force = false } = {}) {
  const value = String(coinLookupInput?.value || "").trim();
  if (!value) return;
  const meta = resolveCoinLookupCandidate(value);
  if (!meta) {
    if (force && coinLookupStatus) coinLookupStatus.textContent = "No supported ViciSwap coin matched that search.";
    return;
  }
  const exact = meta.ticker === normalizeTicker(value.split(/\s+[-–—]\s+|\s+/)[0])
    || meta.lookupLabel?.toLowerCase() === value.toLowerCase()
    || String(meta.name || "").toLowerCase() === value.toLowerCase()
    || normalizeContractAddress(value) === meta.address;
  if (!force && !exact) return;
  if (coinLookupInput) coinLookupInput.value = `${meta.ticker} - ${meta.name || meta.ticker}`;
  await loadCoinLookup(meta);
}

async function loadCoinLookup(meta) {
  const lookupId = ++coinLookupSeq;
  const { network } = safePreferences();
  if (coinLookupClear) coinLookupClear.hidden = false;
  openCoinLookupPopup();
  if (coinLookupStatus) coinLookupStatus.textContent = `Loading ${meta.ticker} market read...`;
  lookupSelectedCoin = preparePulseCandidateForDisplay({
    ...meta,
    rank: 1,
    network,
    prices: [],
    reason: `${meta.ticker} is in the ViciSwap ${network} coin list. The machine is checking live market structure before giving it a read.`,
    source: "ViciSwap lookup",
    chartSource: "Loading live market data",
    updatedAt: new Date().toISOString(),
  }, 1);
  renderCoinLookupCard(lookupSelectedCoin);
  try {
    const loaded = await getLookupPulseCandidate(meta, network);
    if (lookupId !== coinLookupSeq) return;
    lookupSelectedCoin = preparePulseCandidateForDisplay({
      ...loaded,
      rank: 1,
      reason: lookupReasonForCandidate(loaded, network),
    }, 1);
    renderCoinLookupCard(lookupSelectedCoin);
    ensureLookupWindowChart(lookupSelectedCoin, selectedLookupWindow);
    if (coinLookupStatus) coinLookupStatus.textContent = `${lookupSelectedCoin.ticker} lookup updated from ${lookupSelectedCoin.source || "market data"}.`;
  } catch (error) {
    if (lookupId !== coinLookupSeq) return;
    const fallback = buildLookupFallbackCandidate(meta, network);
    lookupSelectedCoin = preparePulseCandidateForDisplay(fallback, 1);
    renderCoinLookupCard(lookupSelectedCoin);
    if (coinLookupStatus) coinLookupStatus.textContent = `Live data was limited for ${meta.ticker}; showing ViciSwap support context.`;
  }
}

async function getLookupPulseCandidate(meta, network) {
  const attempts = [
    async () => {
      const row = await withTimeout(
        fetchDexScreenerMarketRow(meta, network, dexScreenerChainIds[normalizeNetwork(network)]),
        DEXSCREENER_ROW_TIMEOUT_MS,
        `${meta.ticker} DEX lookup timed out`,
      );
      return buildDexScreenerPulseCandidate(meta, row, network, 1);
    },
    async () => {
      if (!meta.id) throw new Error("No CoinGecko id");
      const rows = await fetchCoinGeckoMarketRows([meta]);
      const market = rows.find((row) => row.id === meta.id) || rows[0];
      if (!market) throw new Error("No CoinGecko lookup row");
      return buildPulseCandidate(meta, market, "CoinGecko lookup", 1, network);
    },
  ];
  let lastError = null;
  for (const attempt of attempts) {
    try {
      const result = await attempt();
      if (result?.ticker) return result;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No lookup data");
}

function buildLookupFallbackCandidate(meta, network) {
  const token = tokenInfoForNetwork(meta.ticker, network) || {};
  const scanned = getScannedTokensForNetwork(network).find((coin) => normalizeTicker(coin.ticker) === meta.ticker);
  const change = extractViciSwapPercent(scanned?.text || token.text);
  const hasChange = Number.isFinite(change);
  return buildViciSwapPulseCandidate(meta, scanned || token || { ticker: meta.ticker }, hasChange ? change : 0, hasChange, network, 1);
}

function lookupReasonForCandidate(candidate = {}, network = safePreferences().network) {
  const ticker = normalizeTicker(candidate.ticker) || "This coin";
  const change = pulseChangeForWindow(candidate, "24h");
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume);
  const liquidity = finiteOrNull(candidate.liquidityUsd);
  const setup = candidate.marketSetup || marketSetupSignal(candidate, candidate, candidate.prices);
  const read = forwardScenarioCoinRead(candidate, "7d");
  const pieces = [
    `${ticker} is supported on ViciSwap ${normalizeNetwork(network)}.`,
    Number.isFinite(change) ? `24h move: ${formatPercent(change)}.` : "",
    Number.isFinite(volume) ? `${formatCompactUsd(volume)} 24h volume.` : "",
    Number.isFinite(liquidity) ? `${formatCompactUsd(liquidity)} liquidity.` : "",
    `Machine read: ${read.label || "mixed"} with ${setup.label || "mixed setup"}.`,
  ].filter(Boolean);
  return pieces.join(" ");
}

function renderCoinLookupCard(candidate = lookupSelectedCoin, { lookupScrollLeft = null } = {}) {
  if (!coinLookupCard || !candidate) return;
  openCoinLookupPopup();
  if (lookupCoinWindow) lookupCoinWindow.value = selectedLookupWindow;
  if (lookupCoinName) lookupCoinName.textContent = `${candidate.name || candidate.ticker} lookup`;
  if (lookupCoinSource) lookupCoinSource.textContent = candidate.source || "ViciSwap";
  if (lookupCoinTicker) lookupCoinTicker.textContent = candidate.ticker || "--";
  renderLookupChange(candidate);
  renderLookupChart(candidate);
  renderLookupMeter(candidate, { scrollLeft: lookupScrollLeft });
  if (lookupCoinReason) lookupCoinReason.textContent = rewritePulseRankLabel(candidate.reason || lookupReasonForCandidate(candidate), 1);
  if (lookupCoinInsights) {
    const insights = buildPulseInsights(candidate).slice(0, 4);
    lookupCoinInsights.innerHTML = insights.map((insight) => `
      <div class="pulse-insight">
        <span>${escapeHtml(insight.label)}</span>
        <p>${escapeHtml(insight.text)}</p>
      </div>
    `).join("");
  }
}

function renderLookupChange(candidate = lookupSelectedCoin) {
  if (!lookupCoinChange) return;
  const change = lookupPulseChangeForWindow(candidate, selectedLookupWindow);
  lookupCoinChange.classList.remove("positive", "negative", "neutral");
  lookupCoinChange.classList.add(changeClass(change));
  lookupCoinChange.textContent = Number.isFinite(change) ? formatAbsPercent(change) : "--";
}

function syncReadCarouselScroll(scope, selector, previousScrollLeft = null) {
  const root = typeof scope === "string" ? document.querySelector(scope) : scope;
  window.requestAnimationFrame(() => {
    const carousel = root?.querySelector(".pulse-read-carousel");
    if (!carousel) return;
    if (Number.isFinite(previousScrollLeft)) {
      carousel.scrollLeft = previousScrollLeft;
      updateReadScrollCues(root);
      return;
    }
    const active = carousel.querySelector(selector);
    if (!active) return;
    const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const target = active.offsetLeft - ((carousel.clientWidth - active.clientWidth) / 2);
    carousel.scrollLeft = Math.max(0, Math.min(maxScroll, target));
    updateReadScrollCues(root);
  });
}

function scrollReadCarousel(track, direction = 1) {
  const carousel = track?.querySelector(".pulse-read-carousel");
  if (!carousel) return;
  const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
  const distance = Math.max(80, carousel.clientWidth * 0.75);
  const target = Math.max(0, Math.min(maxScroll, carousel.scrollLeft + (distance * direction)));
  carousel.scrollTo({ left: target, behavior: "smooth" });
  window.setTimeout(() => updateReadScrollCues(track), 180);
}

function updateReadScrollCues(scope) {
  const root = typeof scope === "string" ? document.querySelector(scope) : scope;
  const carousel = root?.querySelector(".pulse-read-carousel");
  const track = carousel?.closest(".pulse-read-track");
  if (!carousel || !track) return;
  const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
  const progress = maxScroll ? carousel.scrollLeft / maxScroll : 0;
  const thumbWidth = carousel.scrollWidth ? Math.max(0.18, Math.min(1, carousel.clientWidth / carousel.scrollWidth)) : 1;
  track.classList.toggle("can-scroll-left", carousel.scrollLeft > 4);
  track.classList.toggle("can-scroll-right", carousel.scrollLeft < maxScroll - 4);
  track.classList.toggle("can-scroll", maxScroll > 4);
  track.style.setProperty("--read-scroll-progress", String(Math.max(0, Math.min(1, progress))));
  track.style.setProperty("--read-scroll-thumb-width", String(thumbWidth));
  track.style.setProperty("--read-scroll-left", `${Math.max(0, Math.min(100, progress * (1 - thumbWidth) * 100))}%`);
}

function renderLookupMeter(candidate = lookupSelectedCoin, { scrollLeft = null } = {}) {
  if (!lookupCoinMeter) return;
  if (!candidate?.ticker) {
    lookupCoinMeter.innerHTML = "";
    return;
  }
  lookupCoinMeter.innerHTML = `
    <div class="pulse-seven-day-head">
      <div class="pulse-read-track">
        <div class="pulse-read-carousel" role="tablist" aria-label="Lookup directional read window">
          ${pulseReadWindows.map((item) => `
            <button type="button" class="${item.key === selectedLookupReadWindow ? "active" : ""}" data-lookup-read-window="${escapeAttribute(item.key)}" role="tab" aria-selected="${String(item.key === selectedLookupReadWindow)}">
              ${escapeHtml(item.label)}
            </button>
          `).join("")}
        </div>
        <div class="pulse-read-scroll-cue" aria-hidden="true"><span></span></div>
      </div>
    </div>
    <div class="pulse-read-motion" key="${escapeAttribute(selectedLookupReadWindow)}">${renderSevenDayMeter(forwardScenarioCoinRead(candidate, selectedLookupReadWindow))}</div>
  `;
  syncReadCarouselScroll(lookupCoinMeter, `[data-lookup-read-window="${escapeAttribute(selectedLookupReadWindow)}"]`, scrollLeft);
}

function setLookupReadWindow(key = "1d", { projected = false } = {}) {
  if (!isPulseReadWindow(key)) return;
  const scrollLeft = lookupCoinMeter?.querySelector(".pulse-read-carousel")?.scrollLeft ?? null;
  selectedLookupReadWindow = key;
  selectedLookupWindow = projected ? projectedWindowForReadWindow(key) : chartWindowForReadWindow(key);
  renderCoinLookupCard(lookupSelectedCoin, { lookupScrollLeft: scrollLeft });
  ensureLookupWindowChart(lookupSelectedCoin, selectedLookupWindow);
}

function renderLookupChart(candidate = lookupSelectedCoin) {
  if (!lookupCoinChart || !candidate) return;
  if (isProjectedPulseWindow(selectedLookupWindow)) {
    const sourceKey = sourceWindowForProjection(selectedLookupWindow);
    const prices = lookupPricesForWindow(candidate, sourceKey);
    if (prices.length < 2) {
      lookupCoinChart.innerHTML = `<div class="pulse-window-message">Loading ${escapeHtml(candidate.ticker || "coin")} ${pulseWindowLabel(sourceKey)} chart for scenario...</div>`;
      ensureLookupWindowChart(candidate, sourceKey);
    } else {
      lookupCoinChart.innerHTML = makeProjectedPulseChart(projectedPulseScenario(candidate, selectedLookupWindow));
    }
    return;
  }
  const prices = lookupPricesForWindow(candidate, selectedLookupWindow);
  if (prices.length < 2) {
    lookupCoinChart.innerHTML = `<div class="pulse-window-message">Loading ${escapeHtml(candidate.ticker || "coin")} ${pulseWindowLabel(selectedLookupWindow)} chart...</div>`;
    ensureLookupWindowChart(candidate, selectedLookupWindow);
  } else {
    lookupCoinChart.innerHTML = makeSparkline(prices, lookupPulseChangeForWindow(candidate, selectedLookupWindow), pulseWindowLabel(selectedLookupWindow));
  }
}

function lookupPricesForWindow(candidate = {}, key = selectedLookupWindow) {
  if (key === "24h") return normalizePriceSeries(candidate.windowPrices?.["24h"] || candidate.prices);
  if (isProjectedPulseWindow(key)) return lookupPricesForWindow(candidate, sourceWindowForProjection(key));
  return normalizePriceSeries(candidate.windowPrices?.[key]);
}

function lookupPulseChangeForWindow(candidate = {}, key = selectedLookupWindow) {
  if (isProjectedPulseWindow(key)) return projectedPulseScenario(candidate, key).projectedChange;
  if (key === "24h") return priceSeriesChange(lookupPricesForWindow(candidate, "24h")) ?? finiteOrNull(candidate.change24h);
  const direct = finiteOrNull(candidate.changeWindows?.[key]);
  if (Number.isFinite(direct)) return direct;
  const window = pulseWindowOptions.find((option) => option.key === key);
  return window ? percentChangeFromPriceWindow(candidate.prices, window.minutes) : null;
}

function ensureLookupWindowChart(candidate = lookupSelectedCoin, key = selectedLookupWindow) {
  if (!candidate?.ticker) return;
  if (isProjectedPulseWindow(key)) {
    ensureLookupWindowChart(candidate, sourceWindowForProjection(key));
    return;
  }
  if (lookupPricesForWindow(candidate, key).length >= 2) return;
  const requestKey = `lookup:${pulseWindowLoadKey(candidate, key)}`;
  if (pendingPulseWindowLoads.has(requestKey) || isPulseWindowTemporarilyUnavailable(requestKey)) return;
  const request = getPulseWindowChartData(candidate, key)
    .then(({ prices, updatedAt, source }) => {
      const normalizedPrices = normalizePriceSeries(prices);
      if (normalizedPrices.length < 2) throw new Error("Lookup chart window is empty");
      if (normalizeTicker(lookupSelectedCoin?.ticker) !== normalizeTicker(candidate.ticker)) return;
      lookupSelectedCoin = {
        ...lookupSelectedCoin,
        windowPrices: { ...(lookupSelectedCoin.windowPrices || {}), [key]: normalizedPrices },
        changeWindows: { ...(lookupSelectedCoin.changeWindows || {}), [key]: priceSeriesChange(normalizedPrices) },
        windowSources: { ...(lookupSelectedCoin.windowSources || {}), [key]: source || `${pulseWindowLabel(key)} chart` },
        windowUpdatedAt: { ...(lookupSelectedCoin.windowUpdatedAt || {}), [key]: updatedAt },
      };
      renderCoinLookupCard(lookupSelectedCoin);
    })
    .catch(() => {
      markPulseWindowTemporarilyUnavailable(requestKey);
      if (normalizeTicker(lookupSelectedCoin?.ticker) === normalizeTicker(candidate.ticker)) renderLookupChart(lookupSelectedCoin);
    })
    .finally(() => pendingPulseWindowLoads.delete(requestKey));
  pendingPulseWindowLoads.set(requestKey, request);
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
    .map((candidate, index) => preparePulseCandidateForDisplay({
      ...candidate,
      source: candidate.source || sourceName,
    }, index + 1));
}

function basePulseReason(reason) {
  return String(reason || "")
    .split(/\s+(?:Near-term chart read:|Data edge:|Setup read:)/)[0]
    .trim();
}

function preparePulseCandidateForDisplay(candidate, rank = candidate?.rank || 1) {
  if (!candidate) return candidate;
  const nextRank = rank || candidate.rank || 1;
  const prices = normalizePriceSeries(candidate.prices);
  const edge = marketEdgeSignal(candidate, candidate, prices);
  const setup = marketSetupSignal(candidate, candidate, prices);
  const reasonBase = rewritePulseRankLabel(basePulseReason(candidate.reason), nextRank);
  const reason = appendSetupNote(
    appendMarketEdgeNote(appendTrajectoryNote(reasonBase, prices), edge),
    setup,
  );
  return {
    ...candidate,
    rank: nextRank,
    marketEdge: edge,
    marketSetup: setup,
    trajectory: chartTrajectoryLabel(prices),
    qualityPulseScore: qualityAdjustedPulseScore({ ...candidate, marketEdge: edge, marketSetup: setup, prices }),
    reason,
  };
}

function finalizePulseDeck(deck, limit = MARKET_PULSE_DECK_SIZE) {
  const prepared = (deck || [])
    .filter(Boolean)
    .map((candidate, index) => preparePulseCandidateForDisplay(candidate, candidate.rank || index + 1))
  const ranked = rankPulseCandidatesForDisplay(prepared, limit);
  return ranked.map((candidate, index) => preparePulseCandidateForDisplay(candidate, index + 1));
}

function rankPulseCandidatesForDisplay(candidates = [], limit = MARKET_PULSE_DECK_SIZE) {
  const sorted = [...(candidates || [])]
    .filter(Boolean)
    .sort((a, b) => qualityAdjustedPulseScore(b) - qualityAdjustedPulseScore(a));
  const strict = sorted.filter((candidate) => isRankablePulseCandidate(candidate));
  const strictSet = new Set(strict);
  const fill = sorted.filter((candidate) => !strictSet.has(candidate) && isDisplayablePulseCandidate(candidate));
  const minimumUsefulDeck = Math.min(limit, 5);
  const chosen = strict.length >= Math.min(3, limit)
    ? strict
    : [...strict, ...fill].slice(0, Math.max(minimumUsefulDeck, strict.length));
  return chosen.slice(0, limit);
}

function isDisplayablePulseCandidate(candidate = {}) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  if (!ticker || !isPulseUpsideCandidate({ ...candidate, ticker })) return false;
  const quality = qualityAdjustedPulseScore(candidate);
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const direction = sevenDayCoinRead(candidate);
  const setup = candidate.marketSetup || marketSetupSignal(candidate, candidate, candidate.prices);
  const hasReversalEvidence = Boolean(setup?.boughtPullback || setup?.baseForming || setup?.constructive);

  if (quality < -20) return false;
  if (volume > 0 && volume < 50_000 && liquidity > 0 && liquidity < 150_000) return false;
  if (Number.isFinite(direction.score) && direction.score <= 5 && !hasReversalEvidence) return false;
  return true;
}

function hasLivePulseChart(candidate = {}) {
  const source = String(candidate.chartSource || "");
  const prices = normalizePriceSeries(candidate.prices);
  return prices.length >= 2 && !/signal line|confirmed receive token|chart loading|price only|no live chart/i.test(source);
}

function applyLoadedPulseCandidate(loadedCandidate) {
  if (!loadedCandidate?.ticker) return null;
  const existing = currentFavorites.find((candidate) => candidate.ticker === loadedCandidate.ticker);
  const rank = existing?.rank || loadedCandidate.rank || 1;
  const prepared = preparePulseCandidateForDisplay(loadedCandidate, rank);
  currentFavorites = currentFavorites.map((candidate) => (
    candidate.ticker === prepared.ticker ? prepared : candidate
  ));
  if (currentFavorite?.ticker === prepared.ticker) {
    currentFavorite = prepared;
    currentFavoriteIndex = Math.max(0, currentFavorites.findIndex((candidate) => candidate.ticker === prepared.ticker));
  }
  return prepared;
}

function loadVisiblePulseChartInBackground(refreshId = marketPulseRefreshSeq) {
  const selected = currentFavorite;
  if (!selected?.ticker || selected.ticker === "--" || hasLivePulseChart(selected)) return;
  const selectionId = pulseSelectionSeq;
  startPulseLoading(pulseLoadingLabel(selected), { lockControls: !marketPulseReady });
  loadPulseChart(selected)
    .then((loaded) => {
      if (refreshId !== marketPulseRefreshSeq || selectionId !== pulseSelectionSeq) return;
      const prepared = applyLoadedPulseCandidate(loaded);
      if (prepared && currentFavorite?.ticker === prepared.ticker) {
        renderMarketPulse(prepared, currentFavorites);
        warmPulseWindowCharts(prepared);
      }
    })
    .catch(() => null)
    .finally(() => {
      if (refreshId === marketPulseRefreshSeq && selectionId === pulseSelectionSeq) stopPulseLoading();
    });
}

function warmPulseChartsAround(index = currentFavoriteIndex) {
  const deck = [...(currentFavorites || [])];
  if (!deck.length) return;
  const warmId = ++pulseChartWarmSeq;
  const order = [];
  for (let distance = 1; distance < deck.length; distance += 1) {
    const forward = (index + distance) % deck.length;
    const backward = (index - distance + deck.length) % deck.length;
    if (!order.includes(forward)) order.push(forward);
    if (!order.includes(backward)) order.push(backward);
  }

  (async () => {
    for (const nextIndex of order) {
      if (warmId !== pulseChartWarmSeq) return;
      const candidate = currentFavorites[nextIndex];
      if (!candidate || hasLivePulseChart(candidate)) continue;
      try {
        const loaded = await loadPulseChart(candidate);
        if (warmId !== pulseChartWarmSeq) return;
        const prepared = applyLoadedPulseCandidate(loaded);
        if (prepared) warmPulseWindowCharts(prepared, ["7d"]);
      } catch {
        // Keep the existing candidate; this is only a background cache warmer.
      }
    }
  })();
}

function warmPulseWindowCharts(candidate = currentFavorite, windows = ["3d", "7d", "1mo"]) {
  if (!candidate?.ticker || candidate.ticker === "--") return;
  const ticker = normalizeTicker(candidate.ticker);
  windows.forEach((key, index) => {
    window.setTimeout(() => {
      const active = currentFavorites.find((item) => normalizeTicker(item.ticker) === ticker) || candidate;
      if (!active || pulsePricesForWindow(active, key).length >= 2) return;
      ensurePulseWindowChart(active, key);
    }, 650 * index);
  });
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
      const verifiedNews = catalyst.signalType === "verified-article" || catalyst.verifiedArticleCount > 0;
      const newsScore = verifiedNews ? clamp(catalyst.score || 0, -5, 6) : 0;
      const nextEdge = {
        ...currentEdge,
        label: newsScore >= 5 && currentEdge.label === "Neutral data edge" ? "Positive data edge" : currentEdge.label,
        score: roundTo((currentEdge.score || 0) + newsScore, 1),
        details: [...(currentEdge.details || []), catalyst.summary].slice(0, 4),
      };
      return {
        ...candidate,
        marketEdge: nextEdge,
        newsCatalyst: catalyst,
        pulseScore: (candidate.pulseScore || 0) + newsScore * 0.25,
        reason: appendCatalystNote(candidate.reason, catalyst),
      };
    })
    .sort((a, b) => qualityAdjustedPulseScore(b) - qualityAdjustedPulseScore(a))
    .filter((candidate) => isRankablePulseCandidate(candidate))
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
  const curated = curatedCatalystSignal(candidate, network);

  const serverCatalyst = await fetchServerCatalystSignal(candidate, network).catch(() => null);
  if (serverCatalyst) {
    const selected = serverCatalyst.signalType === "verified-article" || serverCatalyst.verifiedArticleCount > 0
      ? serverCatalyst
      : curated || serverCatalyst;
    newsCatalystCache.set(cacheKey, { value: selected, cachedAt: Date.now() });
    return selected;
  }

  let payload = null;
  try {
    payload = await fetchMarketJson(makeGdeltNewsUrl(candidate, network));
  } catch (error) {
    if (curated) {
      newsCatalystCache.set(cacheKey, { value: curated, cachedAt: Date.now() });
      return curated;
    }
    throw error;
  }
  const articles = Array.isArray(payload?.articles) ? payload.articles : [];
  const relevant = articles
    .filter((article) => article?.title || article?.seendate)
    .map((article) => normalizeNewsArticle(article))
    .filter((article) => article.title)
    .slice(0, 8);
  if (!relevant.length) {
    if (curated) newsCatalystCache.set(cacheKey, { value: curated, cachedAt: Date.now() });
    return curated;
  }

  const recentCount = relevant.filter((article) => isRecentNewsDate(article.seendate)).length;
  const trustedCount = relevant.filter((article) => isKnownCryptoNewsDomain(article.domain || article.url)).length;
  const titleText = relevant.map((article) => article.title || "").join(" ").toLowerCase();
  const catalystWords = ["launch", "upgrade", "partnership", "integration", "mainnet", "airdrop", "listing", "funding", "proposal", "growth", "record", "surge", "incentive", "liquidity", "accumulation", "whale"];
  const riskWords = ["hack", "exploit", "lawsuit", "probe", "outage", "depeg", "delist", "warning", "sec", "investigation"];
  const positiveHits = catalystWords.filter((word) => titleText.includes(word)).length;
  const riskHits = riskWords.filter((word) => titleText.includes(word)).length;
  const score = clamp(recentCount * 0.8 + trustedCount * 0.6 + positiveHits * 1.2 - riskHits * 1.8, -5, 8);
  if (score <= 0 && !recentCount) return null;
  const topArticle = relevant[0] || {};
  const topTitle = topArticle.title || `${candidate.ticker} has recent market coverage`;
  const driver = catalystDriverFromText(titleText, candidate);
  const riskDriver = riskHits > 0 ? riskDriverFromText(titleText) : "";
  const value = {
    source: "GDELT news scan",
    signalType: "verified-article",
    score: roundTo(score, 1),
    articleCount: relevant.length,
    verifiedArticleCount: relevant.length,
    driver,
    riskDriver,
    topTitle,
    topSource: topArticle.domain || "",
    articles: relevant.slice(0, 3),
    summary: riskHits > 0
      ? `${candidate.ticker} has fresh ${riskDriver.toLowerCase()} risk coverage; verify catalyst quality before using it.`
      : `${candidate.ticker} has fresh ${driver.toLowerCase()} coverage: ${shortenText(topTitle, 90)}${topArticle.domain ? ` (${topArticle.domain})` : ""}`,
    updatedAt: new Date().toISOString(),
  };
  newsCatalystCache.set(cacheKey, { value, cachedAt: Date.now() });
  return value;
}

async function fetchServerCatalystSignal(candidate, network) {
  if (!/^https?:$/.test(window.location.protocol)) return null;
  const ticker = normalizeTicker(candidate.ticker);
  if (!ticker) return null;
  const params = new URLSearchParams({
    ticker,
    name: candidate.name || ticker,
    network: normalizeNetwork(network),
    coinGeckoId: candidate.id || "",
    contractAddress: candidate.address || candidate.contractAddress || "",
  });
  const payload = await fetchJsonUrl(`/api/v1/catalyst?${params.toString()}`);
  if (!payload?.ok) return null;
  const score = finiteOrNull(payload.score) || 0;
  if (score <= 0 && !payload.summary) return null;
  return {
    source: payload.source || "Bundle Builder catalyst service",
    signalType: payload.signalType || (payload.articleCount > 0 ? "verified-article" : "market-context"),
    score: roundTo(score, 1),
    contextStrength: roundTo(finiteOrNull(payload.contextStrength) || 0, 1),
    articleCount: finiteOrNull(payload.articleCount) || 0,
    verifiedArticleCount: finiteOrNull(payload.verifiedArticleCount) || 0,
    driver: payload.driver || "market catalyst",
    riskDriver: payload.riskDriver || "",
    topTitle: payload.topTitle || "",
    topSource: payload.topSource || "",
    articles: Array.isArray(payload.articles) ? payload.articles.slice(0, 6).map(normalizeNewsArticle) : [],
    sourceStatuses: Array.isArray(payload.sourceStatuses) ? payload.sourceStatuses : [],
    corroboration: Array.isArray(payload.corroboration) ? payload.corroboration : [],
    configuredSourceCount: finiteOrNull(payload.configuredSourceCount) || 0,
    successfulSourceCount: finiteOrNull(payload.successfulSourceCount) || 0,
    summary: payload.summary || "",
    watch: payload.watch || "",
    socialWatch: payload.socialWatch || "",
    searches: payload.searches || null,
    confidence: payload.confidence || "",
    updatedAt: payload.updatedAt || new Date().toISOString(),
    warning: payload.warning || "",
    contextTitle: payload.contextTitle || "",
    contextSummary: payload.contextSummary || "",
  };
}

function curatedCatalystSignal(candidate = {}, network = "") {
  const ticker = normalizeTicker(candidate.ticker);
  const profile = catalystNarrativeProfiles[ticker];
  if (!profile) return null;
  const change = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h) || 0;
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const setup = candidate.marketSetup || marketSetupSignal(candidate, candidate, candidate.prices);
  const hasMarketConfirmation = Math.abs(change) >= (profile.minAbsChange || 2)
    || volume >= (profile.minVolume || 1_000_000)
    || (setup?.score || 0) >= 3.5;
  if (!hasMarketConfirmation) return null;
  const depthBonus = volume >= (profile.minVolume || 1_000_000) ? 1.5 : 0;
  const setupBonus = (setup?.score || 0) >= 5 ? 1.2 : 0;
  const changeBonus = Math.min(2, Math.abs(change) / 6);
  const score = clamp(2.8 + depthBonus + setupBonus + changeBonus, 2.5, 7.5);
  return {
    source: profile.source,
    signalType: "market-context",
    score: 0,
    contextStrength: roundTo(score, 1),
    articleCount: 0,
    verifiedArticleCount: 0,
    driver: profile.driver,
    riskDriver: "",
    topTitle: "",
    topSource: "",
    articles: [],
    contextTitle: profile.title,
    contextSummary: profile.summary,
    summary: `No recent article was confirmed for ${ticker}. Background context: ${profile.summary}`,
    watch: profile.watch,
    socialWatch: profile.socialWatch,
    network: normalizeNetwork(network),
    updatedAt: new Date().toISOString(),
  };
}

function makeGdeltNewsUrl(candidate, network) {
  const ticker = normalizeTicker(candidate.ticker);
  const name = String(candidate.name || ticker).replace(/[^\w\s.-]/g, " ").trim();
  const networkName = normalizeNetwork(network);
  const query = `"${name}" OR "${ticker} crypto" OR "${ticker} ${networkName}"`;
  const params = new URLSearchParams({
    query,
    mode: "artlist",
    format: "json",
    maxrecords: "10",
    timespan: "3d",
    sort: "hybridrel",
  });
  return `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
}

function normalizeNewsArticle(article = {}) {
  return {
    title: String(article.title || "").replace(/\s+/g, " ").trim(),
    url: article.url || "",
    domain: article.domain || domainFromUrl(article.url),
    seendate: article.seendate || article.seenDate || "",
  };
}

function domainFromUrl(url) {
  try {
    return new URL(String(url || "")).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function catalystDriverFromText(text, candidate = {}) {
  const value = String(text || "").toLowerCase();
  if (/mainnet|launch|upgrade|release|roadmap/.test(value)) return "launch / upgrade";
  if (/partnership|integration|collaboration|ecosystem/.test(value)) return "partnership / integration";
  if (/listing|exchange|market|trading pair/.test(value)) return "listing / market access";
  if (/whale|accumulat|holder|inflow|buying pressure/.test(value)) return "accumulation";
  if (/incentive|reward|liquidity|volume|fee|revenue/.test(value)) return "liquidity / usage";
  if (/proposal|governance|vote/.test(value)) return "governance";
  const theme = roleForTicker(candidate.ticker) || candidate.theme || "market";
  return `${String(theme).toLowerCase()} catalyst`;
}

function riskDriverFromText(text) {
  const value = String(text || "").toLowerCase();
  if (/hack|exploit|attack/.test(value)) return "security";
  if (/lawsuit|sec|probe|investigation/.test(value)) return "regulatory";
  if (/outage|halt|downtime/.test(value)) return "operational";
  if (/depeg|liquidation|delist/.test(value)) return "market structure";
  return "headline";
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
    .filter((coin) => isPulseUpsideCandidate(coin))
    .sort((a, b) => b.baseScore - a.baseScore)
    .slice(0, MARKET_PULSE_CANDIDATE_LIMIT);
}

function isPulseUpsideCandidate(candidate = {}) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol);
  if (!ticker) return false;
  if (isStableOrCashTicker(ticker)) return false;
  if (isCoreWrappedTicker(ticker)) return false;
  if (ticker === "VCNT") return false;
  return true;
}

async function getCoinGeckoPulseDeck(eligibleCandidates, network) {
  const markets = await fetchCoinGeckoMarketRows(eligibleCandidates);
  updateLatestPrices(markets);
  const favoriteMarkets = selectFavoriteMarkets(markets, MARKET_PULSE_DECK_SIZE * 3);
  if (!favoriteMarkets.length) throw new Error("No CoinGecko candidates ranked");
  const favoriteDeck = favoriteMarkets
    .map((market, index) => {
      const meta = findMarketCandidateById(market.id, network);
      if (!meta) return null;
      return buildPulseCandidate(meta, market, "CoinGecko", index + 1, network);
    })
    .filter(Boolean);
  return finalizePulseDeck(favoriteDeck, MARKET_PULSE_DECK_SIZE);
}

async function getCoinGeckoChartPulseDeck(eligibleCandidates, network) {
  const candidates = uniqueCoinGeckoCandidates(eligibleCandidates).slice(0, MARKET_CHART_CANDIDATE_LIMIT);
  const markets = await fetchCoinGeckoChartRows(candidates);
  updateLatestPrices(markets);
  const favoriteMarkets = selectFavoriteMarkets(markets, MARKET_PULSE_DECK_SIZE * 3);
  if (!favoriteMarkets.length) throw new Error("No CoinGecko chart candidates ranked");
  return finalizePulseDeck(favoriteMarkets
    .map((market, index) => {
      const meta = findMarketCandidateById(market.id, network);
      if (!meta) return null;
      return buildPulseCandidate(meta, market, "CoinGecko chart", index + 1, network);
    })
    .filter(Boolean), MARKET_PULSE_DECK_SIZE);
}

async function getDexScreenerPulseDeck(eligibleCandidates, network) {
  const markets = await fetchDexScreenerMarketRows(eligibleCandidates, network);
  updateLatestPricesFromDexScreener(markets);
  const favoriteMarkets = selectFavoriteMarkets(markets, MARKET_PULSE_DECK_SIZE * 3);
  if (!favoriteMarkets.length) throw new Error("No DEX Screener candidates ranked");
  const favoriteDeck = favoriteMarkets
    .map((market, index) => {
      const meta = findMarketCandidateForMarket(market, network);
      if (!meta) return null;
      return buildDexScreenerPulseCandidate(meta, market, network, index + 1);
    })
    .filter(Boolean);
  return finalizePulseDeck(favoriteDeck, MARKET_PULSE_DECK_SIZE);
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
  return finalizePulseDeck(deck, MARKET_PULSE_DECK_SIZE);
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
    .slice(0, MARKET_PULSE_DECK_SIZE);

  if (!scored.length) throw new Error("No Binance-backed candidates ranked");
  updateLatestPricesFromBinance(scored.map((item) => item));
  const deck = scored.map((item, index) => buildBinancePulseCandidate(item.meta, item.ticker, item.marketSymbol, network, index + 1));
  return finalizePulseDeck(deck, MARKET_PULSE_DECK_SIZE);
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
    .slice(0, MARKET_PULSE_DECK_SIZE);

  if (!scored.length) throw new Error("No Coinbase-backed candidates ranked");
  updateLatestPricesFromCoinbase(scored);
  const deck = scored.map((item, index) => buildCoinbasePulseCandidate(item.meta, item.stats, item.productId, network, index + 1));
  return finalizePulseDeck(deck, MARKET_PULSE_DECK_SIZE);
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
    .slice(0, MARKET_PULSE_DECK_SIZE);

  if (!scored.length) throw new Error("No CryptoCompare-backed candidates ranked");
  updateLatestPricesFromCryptoCompare(scored);
  const deck = scored.map((item, index) => buildCryptoComparePulseCandidate(item.meta, item.market, item.symbol, network, index + 1));
  return finalizePulseDeck(deck, MARKET_PULSE_DECK_SIZE);
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
        ath: null,
        ath_change_percentage: null,
        ath_date: null,
        atl: null,
        atl_change_percentage: null,
        atl_date: null,
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
  const chartData = await fetchCoinGeckoChartWithBestSource(meta.id);
  const prices = normalizePriceSeries(chartData.prices);
  if (prices.length < 2) return null;
  const currentPrice = prices.at(-1);
  const change24h = percentChangeFromPrices(prices);
  const updatedAt = chartData.updatedAt || new Date().toISOString();
  const volumeSeries = normalizePriceSeries(chartData.totalVolumes || []);
  const marketCapSeries = normalizePriceSeries(chartData.marketCaps || []);
  setPulseChartCache(meta.id, { prices, cachedAt: Date.now(), updatedAt, stale: chartData.stale });
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

async function fetchBackendCoinGeckoChart(coinGeckoId, { force = false, days = 1 } = {}) {
  const windowKey = coinGeckoDaysToWindow(days);
  const payload = await fetchBackendMarketChart({ id: coinGeckoId, windowKey, force, source: "coingecko" });
  const prices = normalizePriceSeries(payload.prices);
  if (prices.length < 2) throw new Error("Backend CoinGecko chart empty");
  return {
    prices,
    totalVolumes: normalizePriceSeries(payload.totalVolumes),
    marketCaps: normalizePriceSeries(payload.marketCaps),
    updatedAt: payload.updatedAt || new Date().toISOString(),
    stale: Boolean(payload.stale || payload.cacheStatus === "stale-cache"),
    cacheStatus: payload.cacheStatus || "",
  };
}

async function fetchBackendMarketChart({ id = "", chainId = "", pairAddress = "", windowKey = "24h", force = false, source = "" } = {}) {
  const params = new URLSearchParams({
    window: sourceWindowForProjection(windowKey),
  });
  if (id) params.set("id", id);
  if (chainId) params.set("chainId", chainId);
  if (pairAddress) params.set("pairAddress", pairAddress);
  if (source) params.set("source", source);
  if (force) params.set("force", "true");
  const baseUrl = window.location.protocol === "file:" ? LIVE_BACKEND_BASE_URL : "";
  const url = `${baseUrl}/api/v1/market-chart?${params.toString()}`;
  if (pendingBackendChartRequests.has(url)) return pendingBackendChartRequests.get(url);
  const request = fetchJsonUrl(url)
    .finally(() => pendingBackendChartRequests.delete(url));
  pendingBackendChartRequests.set(url, request);
  const payload = await request;
  const prices = normalizePriceSeries(payload.prices);
  if (prices.length < 2) throw new Error("Backend market chart empty");
  return payload;
}

function coinGeckoDaysToWindow(days = 1) {
  const normalized = String(days || "1");
  if (normalized === "3") return "3d";
  if (normalized === "7") return "7d";
  if (normalized === "30") return "1mo";
  return "24h";
}

async function fetchCoinGeckoChartWithBestSource(coinGeckoId, { force = false, days = 1 } = {}) {
  if (window.location.protocol !== "file:") {
    return fetchBackendCoinGeckoChart(coinGeckoId, { force, days });
  }
  try {
    return await fetchBackendCoinGeckoChart(coinGeckoId, { force, days });
  } catch (error) {
    return fetchDirectCoinGeckoChart(coinGeckoId, days);
  }
}

async function fetchDirectCoinGeckoChart(coinGeckoId, days = 1) {
  const chartUrl = `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/market_chart?vs_currency=usd&days=${encodeURIComponent(days)}`;
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

async function renderMarketHealth({ force = false } = {}) {
  if (!marketHealthRing || !marketHealthScore) return;
  if (!force && marketHealthCache?.loadedAt && Date.now() - marketHealthCache.loadedAt < MARKET_HEALTH_CACHE_MS) {
    const breadth = marketPulseBreadthRead(currentFavorites);
    const health = buildMarketHealthRead(marketHealthCache.btc, marketHealthCache.eth, breadth, marketHealthCache.context);
    marketHealthCache = { ...marketHealthCache, ...health, breadth };
    updateMarketHealthUi(marketHealthCache);
    return;
  }

  updateMarketHealthUi({ loading: true });
  const results = await Promise.allSettled([
    loadBenchmarkHealthCoin("bitcoin", "BTC"),
    loadBenchmarkHealthCoin("ethereum", "ETH"),
    fetchMarketHealthContext(),
  ]);
  const btc = results[0].status === "fulfilled" ? results[0].value : marketHealthCache?.btc || null;
  const eth = results[1].status === "fulfilled" ? results[1].value : marketHealthCache?.eth || null;
  const context = results[2].status === "fulfilled" ? results[2].value : marketHealthCache?.context || null;
  const breadth = marketPulseBreadthRead(currentFavorites);
  const health = buildMarketHealthRead(btc, eth, breadth, context);
  marketHealthCache = { ...health, btc, eth, breadth, context, loadedAt: Date.now() };
  updateMarketHealthUi(marketHealthCache);
}

async function fetchMarketHealthContext() {
  const baseUrl = window.location.protocol === "file:" ? LIVE_BACKEND_BASE_URL : "";
  const payload = await fetchJsonUrl(`${baseUrl}/api/v1/market-health?limit=2000`);
  return payload?.context || null;
}

async function loadBenchmarkHealthCoin(id, ticker) {
  const chartData = await fetchCoinGeckoChartWithBestSource(id, { days: 1 });
  const prices = normalizePriceSeries(chartData.prices);
  if (prices.length < 2) throw new Error(`${ticker} chart unavailable`);
  return {
    id,
    ticker,
    change24h: percentChangeFromPrices(prices),
    price: prices.at(-1) || null,
    updatedAt: chartData.updatedAt || new Date().toISOString(),
  };
}

function marketPulseBreadthRead(deck = []) {
  const coins = (Array.isArray(deck) ? deck : [])
    .map((coin) => ({
      change24h: finiteOrNull(coin.change24h ?? coin.price_change_percentage_24h_in_currency ?? coin.price_change_percentage_24h),
      volume: finiteOrNull(coin.volume24h ?? coin.total_volume) || 0,
      liquidity: finiteOrNull(coin.liquidityUsd) || 0,
    }))
    .filter((coin) => Number.isFinite(coin.change24h) && (coin.volume >= 75_000 || coin.liquidity >= 75_000));
  if (coins.length < 3) return null;
  const bullishCount = coins.filter((coin) => coin.change24h > 0).length;
  const avgChange = coins.reduce((sum, coin) => sum + clamp(coin.change24h, -12, 12), 0) / coins.length;
  const breadth = bullishCount / coins.length;
  const scoreDelta = (breadth - 0.5) * 20 + clamp(avgChange, -5, 5) * 1.55;
  return {
    count: coins.length,
    bullishCount,
    breadth,
    avgChange,
    scoreDelta,
  };
}

function buildMarketHealthRead(btc = null, eth = null, breadth = null, context = null) {
  const btcChange = finiteOrNull(btc?.change24h);
  const ethChange = finiteOrNull(eth?.change24h);
  let currentScore = 50;
  let activeInputs = 0;

  if (Number.isFinite(btcChange)) {
    currentScore += clamp(btcChange, -8, 8) * 2.15;
    activeInputs += 1;
  }
  if (Number.isFinite(ethChange)) {
    currentScore += clamp(ethChange, -10, 10) * 1.65;
    activeInputs += 1;
  }
  if (Number.isFinite(btcChange) && Number.isFinite(ethChange)) {
    const spread = ethChange - btcChange;
    if (btcChange > 0 && ethChange > 0) currentScore += 2.5;
    if (btcChange < 0 && ethChange < 0) currentScore -= 10;
    if (spread > 1.2) currentScore += 1.5;
    if (spread < -2) currentScore -= 4;
  }
  if (breadth?.count) {
    currentScore += clamp(breadth.scoreDelta, -12, 12);
    activeInputs += 1;
  }
  let score = currentScore;
  if (context?.available && Number.isFinite(finiteOrNull(context.scoreDelta))) {
    const historyScore = 50 + clamp(finiteOrNull(context.scoreDelta), -28, 28);
    const historyWeight = historicalMarketHealthWeight(context);
    score = currentScore * (1 - historyWeight) + historyScore * historyWeight;
    activeInputs += 1;
  }
  if (!activeInputs) score = 50;

  const rounded = Math.round(clamp(score, 0, 100));
  const label = contextMarketHealthLabel(context?.regime) || (rounded >= 75 ? "Risk-on market"
    : rounded >= 62 ? "Constructive market"
      : rounded >= 45 ? "Mixed market"
        : rounded >= 30 ? "Defensive market"
          : "Risk-off market");
  const summary = context?.message || (activeInputs
    ? "BTC, ETH, DEX Screener breadth, and stored pulse history are setting the broad backdrop for bundle risk."
    : "Waiting for BTC and ETH benchmark data.");
  return { score: rounded, label, summary, btc, eth, breadth, context };
}

function historicalMarketHealthWeight(context = {}) {
  const sampleSize = finiteOrNull(context.sampleSize) || 0;
  const explicitWeight = finiteOrNull(context.historyWeight);
  const sampleWeight = clamp(sampleSize / 1800, 0.22, 0.72);
  const confidenceWeight = clamp((finiteOrNull(context.confidence) || 0) / 100, 0.18, 1) * 0.72;
  return clamp(Number.isFinite(explicitWeight) ? Math.max(explicitWeight, sampleWeight) : Math.max(sampleWeight, confidenceWeight), 0.22, 0.72);
}

function contextMarketHealthLabel(regime = "") {
  const normalized = String(regime || "").toLowerCase();
  if (normalized === "risk-on") return "Risk-on market";
  if (normalized === "late-risk-on") return "Late risk-on market";
  if (normalized === "reversal-building") return "Reversal building";
  if (normalized === "risk-off") return "Risk-off market";
  if (normalized === "fragile-chase") return "Fragile chase";
  if (normalized === "mixed") return "Mixed market";
  return "";
}

function updateMarketHealthUi(read = {}) {
  if (!marketHealthRing || !marketHealthScore) return;
  const loading = Boolean(read.loading);
  const score = loading ? 50 : finiteOrNull(read.score);
  const safeScore = Number.isFinite(score) ? Math.round(clamp(score, 0, 100)) : 50;
  const color = safeScore >= 70 ? "#22c76f" : safeScore >= 55 ? "#14b86a" : safeScore >= 40 ? "#d5a21b" : "#d95a4f";
  marketHealthRing.style.setProperty("--health-color", color);
  marketHealthRing.dataset.actualScore = String(safeScore);
  if (loading) {
    stopMarketHealthLiveScore();
    marketHealthRing.style.setProperty("--health-score", String(safeScore));
    marketHealthScore.textContent = "--";
  } else {
    startMarketHealthLiveScore(safeScore);
  }
  updateBenchmarkChange(marketHealthBtc, read.btc?.change24h);
  updateBenchmarkChange(marketHealthEth, read.eth?.change24h);
  updateCoinLookupMood(safeScore, { resetTier: !loading });
  if (marketHealthDetails && !marketHealthDetails.hidden) renderMarketHealthDetails();
}

function startCoinLookupMoodTicker() {
  if (!coinLookupMood || coinLookupMoodTimer) return;
  updateCoinLookupMood(marketHealthRenderedScore || 50, { force: true });
  coinLookupMoodTimer = window.setInterval(() => {
    const score = Number.isFinite(finiteOrNull(marketHealthRing?.dataset.actualScore))
      ? finiteOrNull(marketHealthRing.dataset.actualScore)
      : marketHealthRenderedScore;
    updateCoinLookupMood(score || 50);
  }, 8000);
}

function updateCoinLookupMood(score = 50, { force = false, resetTier = false } = {}) {
  if (!coinLookupMood) return;
  const tier = coinLookupMoodTierForScore(score);
  const phrases = coinLookupMoodPhrases[tier] || coinLookupMoodPhrases.medium;
  if (resetTier && tier !== coinLookupMoodTier) {
    coinLookupMoodTier = tier;
    coinLookupMoodIndex = -1;
  } else if (!coinLookupMoodTier) {
    coinLookupMoodTier = tier;
  }
  const nextIndex = (coinLookupMoodIndex + 1) % phrases.length;
  const nextPhrase = `${String(phrases[nextIndex] || "").replace(/[.。…]+$/u, "")}...`;
  if (!force && coinLookupMood.textContent === nextPhrase) return;
  coinLookupMoodIndex = nextIndex;
  coinLookupMood.classList.add("is-fading");
  window.setTimeout(() => {
    if (!coinLookupMood) return;
    coinLookupMood.textContent = nextPhrase;
    coinLookupMood.dataset.marketTone = tier;
    coinLookupMood.classList.remove("is-fading");
  }, 620);
}

function coinLookupMoodTierForScore(score = 50) {
  const numeric = finiteOrNull(score);
  if (!Number.isFinite(numeric)) return "medium";
  if (numeric >= 70) return "good";
  if (numeric < 45) return "bad";
  return "medium";
}

function toggleMarketHealthDetails() {
  if (!marketHealthDetails || !marketHealthRing) return;
  const willOpen = marketHealthDetails.hidden;
  marketHealthDetails.hidden = !willOpen;
  marketHealthRing.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) renderMarketHealthDetails();
}

function renderMarketHealthDetails() {
  if (!marketHealthDetails) return;
  const read = marketHealthCache || {};
  const score = Number.isFinite(finiteOrNull(read.score)) ? Math.round(clamp(read.score, 0, 100)) : "--";
  const btc = finiteOrNull(read.btc?.change24h);
  const eth = finiteOrNull(read.eth?.change24h);
  const breadth = read.breadth || null;
  const context = read.context || null;
  marketHealthDetails.innerHTML = `
    <strong>${escapeHtml(read.label || "Market health")} ${score}/100</strong>
    <p>${escapeHtml(read.summary || "The machine is combining broad market signals before ranking bundle candidates.")}</p>
    <ul>
      <li>BTC 24h: ${escapeHtml(formatPercent(btc))} anchors broad crypto risk.</li>
      <li>ETH 24h: ${escapeHtml(formatPercent(eth))} shows whether majors are confirming risk appetite.</li>
      <li>Pulse breadth: ${escapeHtml(marketHealthBreadthText(breadth))}</li>
      <li>History context: ${escapeHtml(marketHealthHistoryText(context))}</li>
    </ul>
  `;
}

function marketHealthBreadthText(breadth = null) {
  if (!breadth?.count) return "waiting for enough ranked pulse coins.";
  return `${breadth.bullishCount || 0} of ${breadth.count} ranked coins are positive, average move ${formatPercent(breadth.avgChange)}.`;
}

function marketHealthHistoryText(context = null) {
  if (!context?.available) return "stored snapshots are still building context.";
  const sample = finiteOrNull(context.sampleSize);
  const regime = contextMarketHealthLabel(context.regime) || "stored market regime";
  return `${regime}${Number.isFinite(sample) ? ` from ${Math.round(sample)} recent snapshot reads` : ""}.`;
}

function startMarketHealthLiveScore(baseScore) {
  if (!marketHealthRing || !marketHealthScore) return;
  const base = Math.round(clamp(baseScore, 0, 100));
  marketHealthLiveBase = base;
  marketHealthLiveCurrent = base;
  renderMarketHealthLiveScore(base);
  if (marketHealthLiveTimer) clearTimeout(marketHealthLiveTimer);
  scheduleMarketHealthLiveTick();
}

function stopMarketHealthLiveScore() {
  if (marketHealthLiveTimer) {
    clearTimeout(marketHealthLiveTimer);
    marketHealthLiveTimer = null;
  }
  if (marketHealthRenderFrame) {
    cancelAnimationFrame(marketHealthRenderFrame);
    marketHealthRenderFrame = null;
  }
  marketHealthLiveBase = null;
  marketHealthLiveCurrent = null;
}

function scheduleMarketHealthLiveTick() {
  const delay = randomInt(720, 2100);
  marketHealthLiveTimer = window.setTimeout(() => {
    const base = Number.isFinite(marketHealthLiveBase) ? marketHealthLiveBase : 50;
    const nextScore = nextMarketHealthLiveScore(base);
    marketHealthLiveCurrent = nextScore;
    renderMarketHealthLiveScore(nextScore);
    scheduleMarketHealthLiveTick();
  }, delay);
}

function nextMarketHealthLiveScore(base) {
  const current = Number.isFinite(marketHealthLiveCurrent) ? marketHealthLiveCurrent : base;
  const offsets = [-MARKET_HEALTH_LIVE_DRIFT, 0, MARKET_HEALTH_LIVE_DRIFT];
  const weights = [0.34, 0.28, 0.38];
  let next = Math.round(clamp(base + weightedRandomChoice(offsets, weights), 0, 100));
  if (next === current && Math.random() > 0.38) {
    const direction = current <= base ? 1 : -1;
    next = Math.round(clamp(current + direction, base - MARKET_HEALTH_LIVE_DRIFT, base + MARKET_HEALTH_LIVE_DRIFT));
  }
  return Math.round(clamp(next, Math.max(0, base - MARKET_HEALTH_LIVE_DRIFT), Math.min(100, base + MARKET_HEALTH_LIVE_DRIFT)));
}

function weightedRandomChoice(values, weights) {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;
  for (let index = 0; index < values.length; index += 1) {
    roll -= weights[index];
    if (roll <= 0) return values[index];
  }
  return values.at(-1);
}

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function renderMarketHealthLiveScore(score) {
  const targetScore = Math.round(clamp(score, 0, 100));
  const fromScore = Number.isFinite(marketHealthRenderedScore) ? marketHealthRenderedScore : targetScore;
  if (marketHealthRenderFrame) {
    cancelAnimationFrame(marketHealthRenderFrame);
    marketHealthRenderFrame = null;
  }
  const startedAt = performance.now();
  const duration = 700;
  const tick = (now) => {
    const progress = clamp((now - startedAt) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const next = fromScore + (targetScore - fromScore) * eased;
    applyMarketHealthRenderedScore(next);
    if (progress < 1) {
      marketHealthRenderFrame = requestAnimationFrame(tick);
    } else {
      marketHealthRenderFrame = null;
      applyMarketHealthRenderedScore(targetScore);
    }
  };
  marketHealthRenderFrame = requestAnimationFrame(tick);
}

function applyMarketHealthRenderedScore(score) {
  const rendered = clamp(Number(score) || 0, 0, 100);
  const rounded = Math.round(rendered);
  marketHealthRenderedScore = rendered;
  marketHealthRing.style.setProperty("--health-score", String(rendered));
  marketHealthScore.textContent = String(rounded);
  if (marketHealthRingArc && typeof marketHealthRingArc.getTotalLength === "function") {
    const length = marketHealthRingArc.getTotalLength();
    if (Number.isFinite(length) && length > 0) {
      marketHealthRing.style.setProperty("--health-ring-length", length.toFixed(2));
      marketHealthRing.style.setProperty("--health-ring-offset", (length * (1 - rendered / 100)).toFixed(2));
    }
  }
}

function updateBenchmarkChange(element, change) {
  if (!element) return;
  const value = finiteOrNull(change);
  element.classList.remove("positive", "negative");
  if (!Number.isFinite(value)) {
    element.textContent = "--";
    return;
  }
  element.textContent = formatPercent(value);
  if (value > 0) element.classList.add("positive");
  if (value < 0) element.classList.add("negative");
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

async function fetchJsonPostUrl(url, body = {}, { timeoutMs = 8000 } = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      signal: controller.signal,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Request unavailable: ${response.status}`);
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

async function fetchGeckoTerminalJson(url) {
  if (!isAllowedGeckoTerminalUrl(url)) throw new Error("Unsupported GeckoTerminal URL");
  try {
    return await firstSuccessfulMarketJson([
      fetchJsonUrl(url),
      fetchMarketJsonViaAssistant(url),
      wait(900).then(() => fetchMarketJsonViaProxy(url)),
    ]);
  } catch (error) {
    throw new Error(`GeckoTerminal chart unavailable: ${error?.message || String(error)}`);
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
      || isAllowedGeckoTerminalUrl(url)
      || isAllowedViciCoinsApiUrl(url)
      || isAllowedGdeltNewsUrl(url)
    );
  } catch {
    return false;
  }
}

function isAllowedGeckoTerminalUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://api.geckoterminal.com" && parsed.pathname.startsWith("/api/v2/");
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
    ath: finiteOrNull(market.ath),
    athChangePercentage: finiteOrNull(market.ath_change_percentage),
    athDate: market.ath_date || null,
    atl: finiteOrNull(market.atl),
    atlChangePercentage: finiteOrNull(market.atl_change_percentage),
    atlDate: market.atl_date || null,
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
  const baseDeck = fallbackPulseDeck.filter((candidate) => isTickerOnNetwork(candidate.ticker, network) && isPulseUpsideCandidate(candidate));
  const fillDeck = getViciMarketCandidates(network)
    .filter((candidate) => !baseDeck.some((fallback) => fallback.ticker === candidate.ticker))
    .filter((candidate) => isPulseUpsideCandidate(candidate))
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
    .filter((ticker) => !isStableOrCashTicker(ticker))
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
      if (!isPulseUpsideCandidate(meta)) return null;
      const edge = marketEdgeSignal(meta, market, market.sparkline_in_7d?.price);
      const setup = marketSetupSignal(meta, market, market.sparkline_in_7d?.price);
      const score = marketConvictionScore(meta, market, market.sparkline_in_7d?.price, edge);
      return { ...market, pulseScore: score, marketEdge: edge, marketSetup: setup };
    })
    .filter(Boolean)
    .sort((a, b) => qualityAdjustedPulseScore(b) - qualityAdjustedPulseScore(a));
  return rankPulseCandidatesForDisplay(scored, limit);
}

async function loadPulseChartsAndRerank(deck, limit = 3) {
  const loaded = await Promise.all(deck.map(loadPulseChart));
  const ranked = rankPulseCandidatesForDisplay(loaded
    .map((candidate) => {
      const edge = marketEdgeSignal(candidate, candidate, candidate.prices);
      const setup = marketSetupSignal(candidate, candidate, candidate.prices);
      return {
        ...candidate,
        pulseScore: marketConvictionScore(candidate, candidate, candidate.prices, edge),
        trajectory: chartTrajectoryLabel(candidate.prices),
        marketEdge: edge,
        marketSetup: setup,
      };
    })
    .sort((a, b) => qualityAdjustedPulseScore(b) - qualityAdjustedPulseScore(a)), limit);
  return ranked
    .map((candidate, index) => {
      const rank = index + 1;
      return {
        ...candidate,
        rank,
        reason: appendSetupNote(
          appendMarketEdgeNote(appendTrajectoryNote(rewritePulseRankLabel(candidate.reason, rank), candidate.prices), candidate.marketEdge),
          candidate.marketSetup,
        ),
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
  const setup = marketSetupSignal(meta, market, prices);
  const pullback = pullbackQualityScore(prices, { volume24h, liquidityUsd });
  const theme = durableThemeScore(meta, { change24h, volume24h, liquidityUsd });
  const lifetime = allTimeContextScore({ ...meta, ...market, volume24h, liquidityUsd, prices, marketSetup: setup });
  const speculativePenalty = speculativePulsePenalty(meta, { volume24h, liquidityUsd });
  const edgeScore = finiteOrNull(edge?.score) || 0;
  const aeroPenalty = normalizeTicker(meta.ticker || meta.symbol) === "AERO" && change24h < 0 ? 7 : normalizeTicker(meta.ticker || meta.symbol) === "AERO" && change24h < 1 ? 3 : 0;
  return meta.baseScore
    + clamp(change24h, -14, 20) * 1.25
    + multiTimeframe
    + volumeQuality * 2.1
    + liquidityQuality * 2.05
    + trajectory * 1.05
    + pullback
    + setup.score * 0.65
    + theme
    + lifetime
    + edgeScore * 0.22
    - speculativePenalty
    - aeroPenalty;
}

function marketSetupSignal(meta, market = {}, prices = []) {
  const change24h = finiteOrNull(market.price_change_percentage_24h_in_currency ?? market.price_change_percentage_24h ?? market.change24h) ?? 0;
  const change7d = finiteOrNull(market.price_change_percentage_7d_in_currency ?? market.change7d);
  const volume24h = finiteOrNull(market.total_volume ?? market.volume24h) || 0;
  const liquidityUsd = finiteOrNull(market.liquidityUsd) || 0;
  const stats = chartTrajectoryStats(prices);
  const hasVolume = volume24h >= 1_000_000;
  const strongVolume = volume24h >= 4_000_000;
  const hasDepth = liquidityUsd >= 750_000;
  const deepRoute = liquidityUsd >= 2_500_000;
  const extended = change24h >= 10 || (Number.isFinite(change7d) && change7d >= 28);
  const fading = stats && (stats.recentReturn <= -1.4 || (stats.pullbackFromHigh >= 0.08 && stats.recentReturn < 0));
  const constructive = stats && stats.recentReturn >= 1.2 && stats.consistency >= 0.5;
  const boughtPullback = stats && stats.pullbackFromHigh >= 0.06 && stats.pullbackFromHigh <= 0.26 && stats.reboundFromLow >= 2.5 && stats.reboundSlope >= 0.28;
  const baseForming = stats
    && stats.pullbackFromHigh >= 0.08
    && stats.pullbackFromHigh <= 0.55
    && Math.abs(stats.recentReturn) <= 1.2
    && stats.recentRange <= 0.08
    && stats.consistency >= 0.38;

  let score = 0;
  const reasons = [];
  let label = "Mixed setup";

  if (hasVolume) {
    score += 1.5;
    reasons.push(`${formatCompactUsd(volume24h)} 24h volume`);
  }
  if (strongVolume) score += 1.2;
  if (hasDepth) {
    score += 1.5;
    reasons.push(`${formatCompactUsd(liquidityUsd)} liquidity`);
  }
  if (deepRoute) score += 1.1;
  if (constructive) {
    score += 2.2;
    reasons.push("constructive recent slope");
  }
  if (boughtPullback) {
    score += hasVolume && hasDepth ? 3 : 1.4;
    reasons.push("pullback is being bought");
  }
  if (baseForming) {
    score += hasVolume && hasDepth ? 2.4 : 1.1;
    reasons.push("base is forming after the selloff");
  }
  if (extended && !fading && hasVolume) {
    score += 0.8;
    reasons.push("breakout still has activity behind it");
  }
  if (extended && fading) {
    score -= 3.2;
    reasons.push("extended move is fading");
  }
  if (change24h < -2 && !boughtPullback && !baseForming) score -= 1.8;
  if (!hasVolume) score -= 1.6;
  if (!hasDepth && liquidityUsd > 0) score -= 1.2;

  score = clamp(score, -8, 9);
  if (score >= 5.5) label = boughtPullback ? "Pullback rebound setup" : baseForming ? "Reversal base setup" : "Confirmed momentum setup";
  else if (score >= 2.5) label = "Constructive setup";
  else if (baseForming) label = "Reversal watch setup";
  else if (score <= -3) label = "Caution setup";
  else if (fading) label = "Cooling setup";

  return {
    label,
    score: roundTo(score, 1),
    reasons,
    extended,
    fading: Boolean(fading),
    constructive: Boolean(constructive),
    boughtPullback: Boolean(boughtPullback),
    baseForming: Boolean(baseForming),
    hasVolume,
    hasDepth,
  };
}

function setupReadRating(setup) {
  if (!setup || typeof setup !== "object") return null;
  const rawScore = finiteOrNull(setup.score);
  if (rawScore === null) return null;
  const score = roundTo(clamp(((rawScore + 8) / 17) * 10, 0, 10), 1);
  let tone = "neutral";
  let label = setup.label || "Mixed setup";
  if (score >= 7.5) tone = "strong";
  else if (score <= 3.5) tone = "weak";
  if (setup.extended && setup.fading) {
    tone = "caution";
    label = "Extended and cooling";
  } else if (setup.extended && score >= 6.5) {
    tone = "caution";
    label = "Strong but extended";
  } else if (setup.boughtPullback) {
    label = "Bought pullback";
  } else if (setup.baseForming) {
    label = "Reversal base";
  } else if (setup.constructive && setup.hasVolume) {
    label = "Constructive";
  }
  const notes = Array.isArray(setup.reasons) && setup.reasons.length
    ? setup.reasons.join(" • ")
    : "Setup score uses chart position, slope, volume, and liquidity depth.";
  return {
    score: score.toFixed(1),
    label,
    tone,
    title: notes,
  };
}

function entryCautionFlag(favorite = {}) {
  const setup = favorite.marketSetup || marketSetupSignal(favorite, favorite, favorite.prices);
  const trajectory = chartTrajectoryLabel(favorite.prices);
  const note = entryTimingSignal(favorite, setup, trajectory);
  if (!note) return "";
  const panelId = `pulse-entry-caution-${normalizeTicker(favorite.ticker) || "coin"}`;
  const tone = entryFlagTone(note.label);
  return `
    <div class="pulse-entry-warning ${escapeHtml(tone)}">
      <button class="pulse-entry-flag ${escapeHtml(tone)}" type="button" aria-expanded="false" aria-controls="${escapeHtml(panelId)}" aria-label="${escapeHtml(`${note.label}: ${note.text}`)}">
        ${entryFlagIcon(tone, note.label)}
        <span class="sr-only">${escapeHtml(note.label)}</span>
      </button>
      <div class="pulse-entry-popover ${escapeHtml(tone)}" id="${escapeHtml(panelId)}" hidden>
        <strong>${escapeHtml(note.label)}</strong>
        <p>${escapeHtml(note.text)}</p>
      </div>
    </div>
  `;
}

function pulseSummaryButton(favorite = {}) {
  if (!favorite || favorite.source === "Market data unavailable" || favorite.ticker === "--") return "";
  const ticker = normalizeTicker(favorite.ticker) || "coin";
  const panelId = `pulse-ai-${ticker.toLowerCase()}`;
  const summary = buildPulseAiSummary(favorite);
  return `
    <div class="pulse-ai-summary" data-pulse-analyst-root="${escapeAttribute(ticker)}">
      <button class="pulse-ai-trigger" type="button" aria-expanded="false" aria-controls="${escapeAttribute(panelId)}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3" /><path d="M12 18v3" /><path d="m4.93 4.93 2.12 2.12" /><path d="m16.95 16.95 2.12 2.12" /><path d="M3 12h3" /><path d="M18 12h3" /><path d="m4.93 19.07 2.12-2.12" /><path d="m16.95 7.05 2.12-2.12" /></svg>
        <span>LLM info</span>
      </button>
      <div class="pulse-ai-popover" id="${escapeAttribute(panelId)}" hidden>
        ${renderPulseAnalystPanel(favorite, summary, { source: "deterministic" })}
      </div>
    </div>
  `;
}

function pulseSummaryButtonText(favorite = {}) {
  const ticker = normalizeTicker(favorite.ticker) || "coin";
  const change = finiteOrNull(favorite.change24h);
  if (Number.isFinite(change) && change < -0.35) return `Why is ${ticker} down?`;
  if (Number.isFinite(change) && change > 0.35) return `Why is ${ticker} up?`;
  return `Why is ${ticker} moving?`;
}

function buildPulseAiSummary(favorite = {}) {
  const ticker = normalizeTicker(favorite.ticker) || "This coin";
  const name = favorite.name || ticker;
  const change = finiteOrNull(favorite.change24h);
  const volume = finiteOrNull(favorite.volume24h ?? favorite.total_volume);
  const liquidity = finiteOrNull(favorite.liquidityUsd);
  const setup = favorite.marketSetup || marketSetupSignal(favorite, favorite, favorite.prices);
  const edge = favorite.marketEdge || marketEdgeSignal(favorite, favorite, favorite.prices);
  const trajectory = chartTrajectoryLabel(favorite.prices);
  const entry = entryTimingSignal(favorite, setup, trajectory);
  const catalyst = favorite.newsCatalyst || curatedCatalystSignal(favorite, getPreferences().network);
  const theme = String(favorite.theme || "market").toUpperCase();
  const thesis = tokenThesisForTicker(ticker);
  const direction = Number.isFinite(change)
    ? change > 1 ? "up" : change < -1 ? "down" : "mostly flat"
    : "moving";
  const changeText = Number.isFinite(change) ? ` ${formatPercent(change)} over 24h` : "";
  const volumeText = volume ? ` with ${formatCompactUsd(volume)} 24h volume` : "";
  const liquidityText = liquidity ? ` and ${formatCompactUsd(liquidity)} liquidity` : "";
  const catalystPhrase = catalyst?.driver
    ? catalyst.source === "Bundle Builder catalyst watchlist"
      ? `, with a ${catalyst.driver.toLowerCase()} catalyst lane under watch`
      : `, with fresh ${catalyst.driver.toLowerCase()} context`
    : "";
  const headline = `${name} is ${direction}${changeText}${volumeText}${liquidityText}${catalystPhrase}. ${setup?.label ? `Setup: ${setup.label.toLowerCase()}.` : ""}`;
  const outlookText = pulseNearTermOutlook({ favorite, ticker, thesis, entry, edge, trajectory, setup, catalyst, volume });
  const practical = practicalPulseScorecard({ ...favorite, marketSetup: setup, marketEdge: edge });
  const scoreLine = `Timing ${practical.marketTiming.score}/100, execution ${practical.executionSafety.score}/100, conviction ${practical.convictionQuality.score}/100.`;
  const compactMarketRead = plainMarketRead(ticker, change, volume, liquidity, setup);
  const compactSummary = `${name} is ${direction}${changeText}${volumeText}${liquidityText}. ${scoreLine} ${compactMarketRead}`;
  return {
    headline,
    news: pulseNewsFoundSummary(favorite, catalyst, headline),
    points: [
      { label: "Summary", text: compactSummary },
      { label: "Entry strategy", text: entry?.text || pulseCatalystWatchText(favorite, catalyst) },
      { label: "Predicted outcome", text: outlookText },
    ],
  };
}

function renderPulseAnalystPanel(favorite = {}, summary = {}, meta = {}) {
  const ticker = normalizeTicker(favorite.ticker) || "coin";
  const source = meta.source === "openai" ? "AI analyst" : "Machine read";
  const warningText = analystWarningText(meta.warning);
  const warning = warningText ? `<p class="pulse-ai-warning">${escapeHtml(warningText)}</p>` : "";
  const points = Array.isArray(summary.points) && summary.points.length ? summary.points : buildPulseAiSummary(favorite).points;
  return `
    <div class="pulse-ai-modal-head">
      <strong>${escapeHtml(ticker)} LLM info</strong>
      <span>${escapeHtml(source)}</span>
      <button class="pulse-ai-close" type="button" aria-label="Close LLM info">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </button>
    </div>
    <div class="pulse-ai-modal-content">
      <div class="pulse-ai-head">
        <span>Analyst note</span>
        <strong>${escapeHtml(summary.headline || `${ticker} is being explained from the machine's current ranking signals.`)}</strong>
      </div>
      ${warning}
      ${summary.news ? renderPulseNewsFound(summary.news) : ""}
      <ul class="pulse-ai-points">
        ${points.slice(0, 3).map((point) => `
          <li>
            <span>${escapeHtml(point.label || "Signal")}</span>
            <p>${escapeHtml(cleanAnalystAdviceText(point.text || ""))}</p>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function cleanAnalystAdviceText(value) {
  return String(value || "")
    .replace(/Wait for the next push before adding size\./gi, "Wait for the next push before treating it as a cleaner entry.")
    .replace(/Add only if/gi, "Only trust the signal if")
    .replace(/Do not add into weakness/gi, "Do not treat weakness as confirmation")
    .replace(/consider trimming/gi, "recheck whether the signal is breaking down");
}

function renderPulseNewsFound(news = {}) {
  const items = Array.isArray(news.items) ? news.items : [];
  const searches = Array.isArray(news.searches) ? news.searches : [];
  return `
    <div class="pulse-ai-news">
      <span>${escapeHtml(news.label || "News found")}</span>
      <strong>${escapeHtml(news.lead || "No fresh article-level catalyst was confirmed yet.")}</strong>
      ${items.length ? `
        <ul class="pulse-ai-news-list">
          ${items.map((item) => `
            <li>
              ${item.url ? `<a href="${escapeAttribute(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>` : `<b>${escapeHtml(item.title)}</b>`}
              ${item.meta ? `<small>${escapeHtml(item.meta)}</small>` : ""}
            </li>
          `).join("")}
        </ul>
      ` : ""}
      ${searches.length ? `
        <div class="pulse-ai-search-links" aria-label="Manual catalyst research links">
          ${searches.map((item) => `<a href="${escapeAttribute(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.label)}</a>`).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function pulseNewsFoundSummary(favorite = {}, catalyst = null, fallbackHeadline = "") {
  const ticker = normalizeTicker(favorite.ticker) || "coin";
  const articles = Array.isArray(catalyst?.articles)
    ? catalyst.articles
        .map((article) => normalizeNewsArticle(article))
        .filter((article) => article.title)
        .slice(0, 4)
    : [];
  const searchLinks = catalystSearchLinkList(catalyst, ticker);
  const verifiedArticles = catalyst?.signalType === "verified-article" || catalyst?.verifiedArticleCount > 0;
  if (articles.length && verifiedArticles) {
    const first = articles[0];
    const source = first.domain || catalyst?.topSource || catalyst?.source || "news scan";
    return {
      label: "Recent coverage",
      lead: `${articles.length} recent article${articles.length === 1 ? "" : "s"} matched ${ticker}. The strongest current headline is “${first.title}”${source ? ` from ${source}` : ""}. This is supporting context, not proof that the headline caused the price move.`,
      items: articles.map((article) => ({
        title: shortenText(article.title, 150),
        url: safeExternalUrl(article.url),
        meta: [article.domain, formatNewsDate(article.seendate)].filter(Boolean).join(" · "),
      })),
      searches: searchLinks,
    };
  }
  if (catalyst?.signalType === "market-context" || catalyst?.source === "Bundle Builder catalyst watchlist") {
    const context = catalyst.contextSummary || cleanCuratedCatalystSummary(catalyst.summary, ticker);
    return {
      label: "What the machine is watching",
      lead: `No recent article matched ${ticker} in this refresh. The machine is therefore treating news as unconfirmed and judging the coin mainly from market activity and its established use case.`,
      items: context ? [{
        title: context,
        url: "",
        meta: "Background context, not breaking news",
      }] : [],
      searches: searchLinks,
    };
  }
  return {
    label: "Current market context",
    lead: `No recent article matched ${ticker}. The explanation below is based on price direction, trading activity, liquidity, route depth, and the coin’s role in the selected network.`,
    items: fallbackHeadline ? [{ title: fallbackHeadline, url: "", meta: "market-data read" }] : [],
    searches: searchLinks,
  };
}

function catalystSearchLinkList(catalyst = null, ticker = "coin") {
  const searches = catalyst?.searches || {};
  return [
    searches.googleNews ? { label: "Google News", url: safeExternalUrl(searches.googleNews) } : null,
    searches.xSearch ? { label: "X search", url: safeExternalUrl(searches.xSearch) } : null,
    searches.gdelt ? { label: "GDELT scan", url: safeExternalUrl(searches.gdelt) } : null,
  ].filter((item) => item?.url);
}

function safeExternalUrl(value) {
  const text = String(value || "").trim();
  if (!/^https?:\/\//i.test(text)) return "";
  return text;
}

function formatNewsDate(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const compact = text.match(/^(\d{4})(\d{2})(\d{2})/);
  if (compact) return `${compact[2]}/${compact[3]}/${compact[1]}`;
  const date = new Date(text);
  if (!Number.isFinite(date.getTime())) return "";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function pulsePrimaryReason({ favorite, ticker, theme, thesis, catalyst, setup, change, volume, liquidity }) {
  const role = thesis?.role || roleForTicker(ticker) || `${theme} candidate`;
  const source = catalystArticleSource(catalyst);
  const articleTitle = catalyst?.topTitle || catalyst?.articles?.[0]?.title || "";
  if (catalyst?.riskDriver) {
    return `Fresh headlines include ${catalyst.riskDriver.toLowerCase()} risk language${source}. The machine keeps ${ticker} on the board only if the ViciSwap route, liquidity, and market depth still justify the risk.`;
  }
  if (catalyst?.signalType === "market-context" || catalyst?.source === "Bundle Builder catalyst watchlist") {
    const catalystSummary = catalyst.contextSummary || cleanCuratedCatalystSummary(catalyst.summary, ticker);
    return `No recent article was confirmed for ${ticker}. The machine is watching its ${String(catalyst.driver || theme || "market").toLowerCase()} use case because ${catalystSummary || thesis?.why || coinInsightForTheme(favorite.theme, ticker)} Today’s read still depends on whether price direction, volume, and liquidity show that buyers are actually interested.`;
  }
  if (catalyst?.driver && articleTitle) {
    return `Fresh market coverage is pointing to a ${catalyst.driver.toLowerCase()} catalyst: "${shortenText(articleTitle, 150)}"${source}. For ${ticker}, that matters because ${thesis?.why || coinInsightForTheme(favorite.theme, ticker)}`;
  }
  if (setup?.boughtPullback && Number.isFinite(volume) && volume >= 1_000_000) {
    return `${ticker} is being read as a bought-pullback setup: price cooled off, then buyers stepped back in with ${formatCompactUsd(volume)} 24h volume. That is more useful than a simple green candle because it hints at demand returning after weakness.`;
  }
  if (setup?.extended && Number.isFinite(change) && change > 6) {
    return `${ticker} is moving because its current trend is still strong, but it is also extended. The machine likes the momentum, then tempers conviction because buying near a recent high can turn into chasing.`;
  }
  if (Number.isFinite(volume) && Number.isFinite(liquidity) && volume >= 1_000_000 && liquidity >= 1_000_000) {
    return `No fresh article-level catalyst was confirmed, so the read is market-structure driven: ${ticker} has active trading volume, usable liquidity, and a ${role.toLowerCase()} role inside the selected Base token set.`;
  }
  return `No fresh article-level catalyst was confirmed. The machine is treating ${ticker} as a ${role.toLowerCase()} because it fits the selected network and theme, but conviction depends on route quality, volume confirmation, and liquidity.`;
}

function cleanCuratedCatalystSummary(summary = "", ticker = "") {
  return String(summary || "")
    .replace(new RegExp(`^${ticker}\\s+has\\s+(?:a\\s+)?(?:confirmed|known)\\s+[^:]+catalyst lane:\\s*`, "i"), "")
    .trim();
}

function pulseSecondarySignal({ ticker, thesis, edge, setup, trajectory, change, volume, liquidity }) {
  const details = [];
  if (Number.isFinite(volume)) details.push(`${formatCompactUsd(volume)} 24h volume`);
  if (Number.isFinite(liquidity)) details.push(`${formatCompactUsd(liquidity)} liquidity`);
  if (Number.isFinite(change)) details.push(`${formatPercent(change)} 24h move`);
  if (setup?.label) details.push(`${setup.label.toLowerCase()}`);
  if (trajectory?.label) details.push(`${trajectory.label.toLowerCase()}`);
  if (edge?.label) details.push(`${edge.label.toLowerCase()}`);
  const thesisText = thesis?.marketRead || "";
  if (details.length) {
    return `${details.join("; ")}. ${thesisText || `${ticker} is being judged by whether the move is supported by real participation instead of a thin spike.`}`;
  }
  return thesisText || plainMarketRead(ticker, change, volume, liquidity, setup);
}

function pulseNearTermOutlook({ favorite, ticker, thesis, entry, edge, trajectory, setup, catalyst, volume }) {
  const watch = plainWatchRead(favorite, edge, trajectory, setup);
  if (setup?.extended) {
    return `${entry?.text || `${ticker} is near the high end of its recent range.`} Watch whether volume stays elevated; if volume fades, waiting for a cooloff or confirmation may be smarter than chasing.`;
  }
  if (setup?.boughtPullback) {
    return `${entry?.text || `${ticker} is trying to rebound from a pullback.`} The cleaner follow-through is a higher low plus steady volume, not just one bounce candle.`;
  }
  if (catalyst?.driver) {
    return `${entry?.text || watch} ${catalyst.watch || "The catalyst read helps explain the move, but the next check is whether price action and route depth keep confirming it."}`;
  }
  if (Number.isFinite(volume) && volume < 1_000_000) {
    return `${ticker} needs more participation before the signal deserves high conviction. ${thesis?.watch || watch}`;
  }
  return entry?.text || watch;
}

function pulseCatalystWatchText(favorite = {}, catalyst = null) {
  const ticker = normalizeTicker(favorite.ticker) || "This coin";
  const profile = catalystNarrativeProfiles[ticker];
  const article = catalyst?.articles?.[0];
  if (catalyst?.source === "GDELT news scan" && article?.title) {
    return `Article scan found a possible ${catalyst.driver.toLowerCase()} signal: "${shortenText(article.title, 140)}"${article.domain ? ` (${article.domain})` : ""}. The next step is confirming that the headline matches real volume and route depth instead of a one-off spike.`;
  }
  const socialWatch = catalyst?.socialWatch || profile?.socialWatch;
  if (socialWatch) {
    const searchNote = catalyst?.searches?.xSearch
      ? " The server also prepares a live X/news search trail for manual verification."
      : "";
    return `${socialWatch} This is a catalyst watchlist read backed by live market confirmation, not a guaranteed social signal.${searchNote}`;
  }
  if (catalyst?.summary) {
    return `${plainCatalystRead(catalyst)} Watch whether the market keeps confirming the story through volume, liquidity, and cleaner price structure.`;
  }
  return `No confirmed catalyst source is attached yet. A smarter social layer would check X, Discord, Telegram, protocol blogs, and news headlines for fresh reasons behind ${ticker}'s move.`;
}

function catalystArticleSource(catalyst) {
  const source = catalyst?.topSource || catalyst?.articles?.[0]?.domain || "";
  return source ? ` (${source})` : "";
}

function shortenText(value, limit = 120) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, Math.max(0, limit - 3)).trim()}...`;
}

function entryFlagIcon(tone = "neutral", label = "") {
  const normalizedLabel = String(label);
  if (/momentum confirmed/i.test(normalizedLabel)) {
    return `<span class="entry-fire-icon" aria-hidden="true">🔥</span>`;
  }
  if (/reversal/i.test(normalizedLabel)) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16h8a5 5 0 0 0 0-10H9" /><path d="M9 2 5 6l4 4" /><path d="M17 16l3 3-3 3" /></svg>`;
  }
  if (tone === "neutral") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>`;
  }
  if (tone === "positive") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>`;
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V5" /><path d="M5 5h12l-2 4 2 4H5" /></svg>`;
}

function entryFlagTone(label = "") {
  const normalized = String(label).toLowerCase();
  if (/falling|entry caution|wait|high-zone|liquidity/.test(normalized)) return "caution";
  if (/pullback|momentum confirmed/.test(normalized)) return "positive";
  if (/balanced|watch/.test(normalized)) return "neutral";
  return "neutral";
}

function entryCautionText(favorite = {}, setup = {}) {
  const ticker = normalizeTicker(favorite.ticker) || "This coin";
  const stats = chartTrajectoryStats(favorite.prices);
  const change24h = finiteOrNull(favorite.change24h) || 0;
  const extendedByPrice = stats?.pullbackFromHigh <= 0.035 && (change24h >= 8 || stats?.recentReturn >= 2.5);
  if (setup?.extended && setup?.fading) {
    return {
      label: "Entry caution",
      detail: `${ticker} looks extended and is cooling. A cleaner setup may depend on stabilization or renewed volume confirmation.`,
    };
  }
  if (setup?.extended || extendedByPrice) {
    const window = change24h >= 12 ? "6-12h" : "3-6h";
    return {
      label: "High-zone caution",
      detail: `${ticker} is near a recent high after a sharp move. Momentum is strong, but a ${window} cooloff or fresh volume confirmation may offer a cleaner entry.`,
    };
  }
  if (setup?.boughtPullback && setup?.hasVolume) {
    return {
      label: "Confirm rebound",
      detail: `${ticker} is rebounding from a pullback. Watch whether volume holds up instead of fading after the bounce.`,
    };
  }
  return null;
}

function durableThemeScore(meta, { change24h = 0, volume24h = 0, liquidityUsd = 0 } = {}) {
  const theme = String(meta?.theme || "").toLowerCase();
  const ticker = normalizeTicker(meta?.ticker);
  let score = 0;
  if (theme.includes("base")) score += 3.4;
  if (theme.includes("defi")) score += 2.7;
  if (theme.includes("rwa")) score += 1.8;
  if (theme.includes("ai")) score += 1.2;
  if (["AERO", "MORPHO", "VIRTUAL", "ZRO", "KAITO", "AIXBT"].includes(ticker)) score += 1.6;
  if (liquidityUsd >= 5_000_000 && volume24h >= 1_000_000) score += 1.6;
  if (change24h < -4 && score > 0) score *= 0.65;
  return score;
}

function allTimeContextScore(candidate = {}) {
  const drawdown = allTimeDrawdownPercent(candidate);
  if (!Number.isFinite(drawdown)) return 0;
  const volume = finiteOrNull(candidate.volume24h ?? candidate.total_volume) || 0;
  const liquidity = finiteOrNull(candidate.liquidityUsd) || 0;
  const change30d = finiteOrNull(candidate.change30d ?? candidate.price_change_percentage_30d_in_currency);
  const change7d = finiteOrNull(candidate.change7d ?? candidate.price_change_percentage_7d_in_currency);
  const setup = candidate.marketSetup || marketSetupSignal(candidate, candidate, candidate.prices);
  const hasDepth = volume >= 1_000_000 && liquidity >= 750_000;
  const hasRecovery = (Number.isFinite(change30d) && change30d >= 12)
    || (Number.isFinite(change7d) && change7d >= 8)
    || Boolean(setup?.boughtPullback || setup?.baseForming || setup?.constructive);
  let score = 0;

  if (drawdown <= -90) score -= 9;
  else if (drawdown <= -80) score -= 7;
  else if (drawdown <= -65) score -= 4.5;
  else if (drawdown <= -45) score -= 2;

  if (score < 0 && hasDepth) score *= 0.72;
  if (score < 0 && hasRecovery) score *= 0.62;
  if (drawdown > -35 && hasDepth && hasRecovery) score += 1.2;
  return roundTo(score, 2);
}

function allTimeDrawdownPercent(candidate = {}) {
  const direct = finiteOrNull(candidate.athChangePercentage ?? candidate.ath_change_percentage);
  if (Number.isFinite(direct)) return direct;
  const price = finiteOrNull(candidate.currentPrice ?? candidate.current_price ?? candidate.price);
  const ath = finiteOrNull(candidate.ath);
  if (!price || !ath || ath <= 0) return null;
  return ((price - ath) / ath) * 100;
}

function allTimeContextText(candidate = {}) {
  const drawdown = allTimeDrawdownPercent(candidate);
  if (!Number.isFinite(drawdown)) return "";
  if (drawdown <= -80) return `lifetime context is heavy: ${formatPercent(drawdown)} from ATH`;
  if (drawdown <= -55) return `still far below ATH: ${formatPercent(drawdown)}`;
  if (drawdown > -35) return `holding relatively closer to ATH: ${formatPercent(drawdown)}`;
  return "";
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
  const lifetimeText = allTimeContextText(market);
  if (lifetimeText) details.push(lifetimeText);
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

function appendSetupNote(reason, setup) {
  if (!setup || !setup.label || setup.label === "Mixed setup") return reason;
  const reasons = Array.isArray(setup.reasons) && setup.reasons.length ? setup.reasons.join(", ") : "improving confirmation";
  const rating = setupReadRating(setup);
  const prefix = rating ? `Setup read: ${rating.score}/10, ${rating.label.toLowerCase()}` : "Setup read";
  if (setup.boughtPullback) return `${reason} ${prefix}; pullback is being bought with ${reasons}.`;
  if (setup.baseForming) return `${reason} ${prefix}; selling has slowed into a tight base with ${reasons}.`;
  if (setup.extended && setup.fading) return `${reason} ${prefix}; move is extended and cooling, so the machine is cautious about chasing.`;
  if (setup.extended) return `${reason} ${prefix}; momentum is strong, but the coin is near an elevated short-term zone.`;
  if (setup.constructive && setup.hasVolume) return `${reason} ${prefix}; constructive price action with volume support.`;
  if (setup.label === "Caution setup") return `${reason} ${prefix}; caution flag because confirmation is weak or the move is fading.`;
  return `${reason} ${prefix}.`;
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
  if (stats.pullbackFromHigh >= 0.08 && Math.abs(stats.recentReturn) <= 1.2 && stats.recentRange <= 0.08) {
    return { tone: "base", text: "selling has slowed into a tight base, so this is a reversal watch rather than a clean breakdown." };
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
  const recentRange = recentHigh && recentLow ? (recentHigh - recentLow) / recentLow : 0;
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
    recentRange: Number.isFinite(recentRange) ? recentRange : 0,
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
  const change7d = finiteOrNull(market.price_change_percentage_7d_in_currency ?? market.change7d);
  const change30d = finiteOrNull(market.price_change_percentage_30d_in_currency ?? market.change30d);
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
    change7d,
    change30d,
    ath: finiteOrNull(market.ath),
    athChangePercentage: finiteOrNull(market.ath_change_percentage),
    athDate: market.ath_date || null,
    atl: finiteOrNull(market.atl),
    atlChangePercentage: finiteOrNull(market.atl_change_percentage),
    atlDate: market.atl_date || null,
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
  const change7d = finiteOrNull(market.price_change_percentage_7d_in_currency ?? market.change7d);
  const change30d = finiteOrNull(market.price_change_percentage_30d_in_currency ?? market.change30d);
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
    change7d,
    change30d,
    ath: finiteOrNull(market.ath),
    athChangePercentage: finiteOrNull(market.ath_change_percentage),
    athDate: market.ath_date || null,
    atl: finiteOrNull(market.atl),
    atlChangePercentage: finiteOrNull(market.atl_change_percentage),
    atlDate: market.atl_date || null,
    changeWindows: market.changeWindows || {},
    prices,
    reason: buildDexScreenerFavoriteReason(meta, market, network, rank),
    source: "DEX Screener",
    chartSource: "DEX Screener signal line",
    updatedAt: market.last_updated || null,
    currentPrice: finiteOrNull(market.current_price),
    volume24h: finiteOrNull(market.total_volume),
    liquidityUsd: finiteOrNull(market.liquidityUsd),
    chainId: market.chainId || dexScreenerChainIds[normalizeNetwork(network)] || "",
    pairAddress: market.pairAddress || "",
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
  if (cached && Date.now() - cached.cachedAt < MARKET_CHART_STALE_MS) {
    const isStale = cached.stale || Date.now() - cached.cachedAt >= MARKET_CHART_CACHE_MS;
    if (isStale) maybeRefreshPulseChartInBackground(candidate);
    return withCoinGeckoChart(candidate, cached.prices, cached.updatedAt, isStale);
  }

  if (candidate.source === "DEX Screener" && candidate.pairAddress) {
    try {
      const chartData = await fetchBackendCoinGeckoChart(candidate.id, { force: false, days: 1 });
      const prices = normalizePriceSeries(chartData.prices);
      if (prices.length < 2) throw new Error("Backend CoinGecko chart empty");
      const updatedAt = chartData.updatedAt || candidate.updatedAt || new Date().toISOString();
      setPulseChartCache(candidate.id, { prices, cachedAt: Date.now(), updatedAt, stale: Boolean(chartData.stale) });
      return withCoinGeckoChart(candidate, prices, updatedAt, Boolean(chartData.stale));
    } catch (backendError) {
      return loadGeckoTerminalPulseChart(candidate).then((poolCandidate) => {
        if (normalizePriceSeries(poolCandidate.prices).length >= 2) return poolCandidate;
        return {
          ...candidate,
          chartSource: backendError?.message ? `Backend chart unavailable: ${backendError.message}` : candidate.chartSource,
        };
      });
    }
  }

  try {
    const chartData = await getPulseChartData(candidate.id);
    const { prices, updatedAt, stale } = chartData;
    return withCoinGeckoChart(candidate, prices, updatedAt, stale);
  } catch {
    if (cached && Date.now() - cached.cachedAt < MARKET_CHART_STALE_MS) {
      return withCoinGeckoChart(candidate, cached.prices, cached.updatedAt, true);
    }
    const geckoTerminalCandidate = await loadGeckoTerminalPulseChart(candidate);
    if (normalizePriceSeries(geckoTerminalCandidate.prices).length >= 2) return geckoTerminalCandidate;
    return candidate;
  }
}

function maybeRefreshPulseChartInBackground(candidate) {
  if (!candidate?.id || pendingPulseChartLoads.has(candidate.id)) return false;
  const lastAttemptAt = pulseChartBackgroundRefreshAttempts.get(candidate.id) || 0;
  const now = Date.now();
  if (now - lastAttemptAt < MARKET_CHART_BACKGROUND_REFRESH_COOLDOWN_MS) return false;
  pulseChartBackgroundRefreshAttempts.set(candidate.id, now);
  refreshPulseChartInBackground(candidate);
  return true;
}

function refreshPulseChartInBackground(candidate) {
  if (!candidate?.id || pendingPulseChartLoads.has(candidate.id)) return;
  const refresh = fetchBackendCoinGeckoChart(candidate.id, { force: false })
    .then((chartData) => {
      const prices = normalizePriceSeries(chartData.prices);
      if (prices.length < 2) return null;
      setPulseChartCache(candidate.id, {
        prices,
        cachedAt: Date.now(),
        updatedAt: chartData.updatedAt || new Date().toISOString(),
        stale: Boolean(chartData.stale),
      });
      return chartData;
    })
    .catch(() => null)
    .finally(() => pendingPulseChartLoads.delete(candidate.id));
  pendingPulseChartLoads.set(candidate.id, refresh);
}

async function loadGeckoTerminalPulseChart(candidate) {
  try {
    const { prices, updatedAt } = await getGeckoTerminalPulseChartData(candidate);
    return {
      ...candidate,
      prices,
      chartSource: "GeckoTerminal pool chart",
      updatedAt,
    };
  } catch {
    return candidate;
  }
}

async function getGeckoTerminalPulseChartData(candidate, windowKey = "24h") {
  const chainId = normalizeDexChainId(candidate.chainId || dexScreenerChainIds[normalizeNetwork(candidate.network)]);
  const pairAddress = normalizeContractAddress(candidate.pairAddress);
  if (!chainId || !pairAddress) throw new Error("Missing GeckoTerminal pool address");
  if (window.location.protocol !== "file:") {
    const payload = await fetchBackendMarketChart({
      id: candidate.id || "",
      chainId,
      pairAddress,
      windowKey,
      source: "geckoterminal",
    });
    return {
      prices: normalizePriceSeries(payload.prices),
      updatedAt: payload.updatedAt || candidate.updatedAt,
      source: payload.sourceDetail || `${payload.source || "Backend"} ${pulseWindowLabel(windowKey)} chart`,
    };
  }
  const config = pulseWindowChartConfig[windowKey] || pulseWindowChartConfig["24h"];
  const cacheKey = `geckoterminal:${chainId}:${pairAddress}:${windowKey}`;
  const cached = pulseChartCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < MARKET_CHART_CACHE_MS) {
    return { prices: cached.prices, updatedAt: cached.updatedAt || candidate.updatedAt, source: `Cached GeckoTerminal ${pulseWindowLabel(windowKey)} chart` };
  }

  const timeframe = config.timeframe || "minute";
  const chartUrl = `https://api.geckoterminal.com/api/v2/networks/${encodeURIComponent(chainId)}/pools/${encodeURIComponent(pairAddress)}/ohlcv/${encodeURIComponent(timeframe)}?aggregate=${config.aggregate}&limit=${config.limit}&currency=usd`;
  const payload = await withTimeout(
    fetchGeckoTerminalJson(chartUrl),
    MARKET_CHART_TIMEOUT_MS,
    "GeckoTerminal chart timed out",
  );
  const rows = Array.isArray(payload?.data?.attributes?.ohlcv_list) ? payload.data.attributes.ohlcv_list : [];
  const sortedRows = rows
    .slice()
    .sort((a, b) => Number(a?.[0]) - Number(b?.[0]));
  const prices = normalizePriceSeries(sortedRows.map((row) => row?.[4]));
  if (prices.length < 2) throw new Error("GeckoTerminal chart data empty");
  const updatedAt = sortedRows.at(-1)?.[0] ? new Date(Number(sortedRows.at(-1)[0]) * 1000).toISOString() : new Date().toISOString();
  setPulseChartCache(cacheKey, { prices, cachedAt: Date.now(), updatedAt });
  return { prices, updatedAt, source: `GeckoTerminal ${pulseWindowLabel(windowKey)} chart` };
}

async function getPulseChartData(coinGeckoId) {
  const existing = pendingPulseChartLoads.get(coinGeckoId);
  if (existing) return existing;
  const request = (async () => {
    const chartData = await withTimeout(
      fetchCoinGeckoChartWithBestSource(coinGeckoId),
      MARKET_CHART_TIMEOUT_MS,
      "Bundle Builder chart workflow timed out",
    );
    const prices = normalizePriceSeries(chartData.prices);
    if (prices.length < 2) throw new Error("Chart data empty");
    const updatedAt = chartData.updatedAt || new Date().toISOString();
    setPulseChartCache(coinGeckoId, { prices, cachedAt: Date.now(), updatedAt, stale: chartData.stale });
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
    setPulseChartCache(cacheKey, { prices, cachedAt: Date.now() });
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
    setPulseChartCache(cacheKey, { prices, cachedAt: Date.now() });
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
    setPulseChartCache(cacheKey, { prices, cachedAt: Date.now() });
    return { ...candidate, prices, chartSource: `CryptoCompare ${candidate.cryptoCompareSymbol}-USD 24h chart` };
  } catch {
    return { ...candidate, chartSource: `CryptoCompare ${candidate.cryptoCompareSymbol}-USD price only` };
  }
}

async function selectPulseCandidate(ticker) {
  const selected = currentFavorites.find((candidate) => candidate.ticker === ticker);
  if (!selected || selected.ticker === currentFavorite?.ticker) return;

  const selectionId = ++pulseSelectionSeq;
  pulseChartWarmSeq += 1;
  animatePulseSlide();
  currentFavorite = selected;
  currentFavoriteIndex = Math.max(0, currentFavorites.findIndex((candidate) => candidate.ticker === selected.ticker));
  renderMarketPulse(currentFavorite, currentFavorites);
  startPulseLoading(pulseLoadingLabel(selected), { lockControls: false });
  try {
    const loadedFavorite = await loadPulseChart(selected);
    if (selectionId !== pulseSelectionSeq || currentFavorite?.ticker !== selected.ticker) return;
    const prepared = applyLoadedPulseCandidate(loadedFavorite);
    if (prepared) {
      renderMarketPulse(prepared, currentFavorites);
      warmPulseWindowCharts(prepared);
    }
    warmPulseChartsAround(currentFavoriteIndex);
  } finally {
    if (selectionId === pulseSelectionSeq) stopPulseLoading();
  }
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
  favoriteCoinReason.textContent = rewritePulseRankLabel(favorite.reason, favorite.rank || 1);
  renderPulseSevenDayMeter(favorite);
  renderPulseInsights(favorite);
  pulseStatus.textContent = `#${favorite.rank} ${favorite.source}`;
  pulseStatus.title = lastMarketPulseError || `Showing ${favorite.source} market data`;
  if (pulseRefresh) {
    pulseRefresh.title = lastMarketPulseError
      ? `Retry market pulse. Last error: ${lastMarketPulseError}`
      : "Refresh market pulse";
  }
  renderPulseWindowChart(favorite);
  currentFavoriteIndex = Math.max(0, (favorites || []).findIndex((candidate) => candidate.ticker === favorite.ticker));
  if (pulsePrev) pulsePrev.disabled = (favorites || []).length <= 1;
  if (pulseNext) pulseNext.disabled = (favorites || []).length <= 1;
  updateFavoriteToggle();
  renderMarketHealth();
}

function renderPulseSevenDayMeter(favorite = currentFavorite, { scrollLeft = null } = {}) {
  if (!pulseSevenDayMeter) return;
  if (!favorite || favorite.source === "Market data unavailable" || favorite.ticker === "--") {
    pulseSevenDayMeter.innerHTML = "";
    return;
  }
  const read = forwardScenarioCoinRead(favorite, selectedPulseReadWindow);
  pulseSevenDayMeter.innerHTML = `
    <div class="pulse-seven-day-head">
      <div class="pulse-read-track">
        <div class="pulse-read-carousel" role="tablist" aria-label="Directional read window">
          ${pulseReadWindows.map((item) => `
            <button type="button" class="${item.key === selectedPulseReadWindow ? "active" : ""}" data-pulse-read-window="${escapeAttribute(item.key)}" role="tab" aria-selected="${String(item.key === selectedPulseReadWindow)}">
              ${escapeHtml(item.label)}
            </button>
          `).join("")}
        </div>
        <div class="pulse-read-scroll-cue" aria-hidden="true"><span></span></div>
      </div>
    </div>
    <div class="pulse-read-motion" key="${escapeAttribute(selectedPulseReadWindow)}">${renderSevenDayMeter(read)}</div>
  `;
  syncReadCarouselScroll(pulseSevenDayMeter, `[data-pulse-read-window="${escapeAttribute(selectedPulseReadWindow)}"]`, scrollLeft);
}

function renderPulseChange(favorite = currentFavorite) {
  if (!favoriteCoinChange) return;
  if (favoriteCoinWindow) favoriteCoinWindow.value = selectedPulseWindow;
  const change = pulseChangeForWindow(favorite, selectedPulseWindow);
  favoriteCoinChange.classList.remove("positive", "negative", "neutral");
  favoriteCoinChange.classList.add(changeClass(change));
  favoriteCoinChange.textContent = Number.isFinite(change) ? formatAbsPercent(change) : "--";
  favoriteCoinChange.title = Number.isFinite(change)
    ? `${pulseWindowLabel(selectedPulseWindow)} change: ${formatPercent(change)}`
    : `${pulseWindowLabel(selectedPulseWindow)} change unavailable`;
}

function setPulseWindow(key = "24h") {
  if (!pulseWindowOptions.some((option) => option.key === key)) return;
  selectedPulseWindow = key;
  renderPulseChange(currentFavorite);
  renderPulseWindowChart(currentFavorite);
  ensurePulseWindowChart(currentFavorite, selectedPulseWindow);
}

function setPulseReadWindow(key = "1d", { projected = false } = {}) {
  if (!isPulseReadWindow(key)) return;
  const scrollLeft = pulseSevenDayMeter?.querySelector(".pulse-read-carousel")?.scrollLeft ?? null;
  selectedPulseReadWindow = key;
  setPulseWindow(projected ? projectedWindowForReadWindow(key) : chartWindowForReadWindow(key));
  renderPulseSevenDayMeter(currentFavorite, { scrollLeft });
}

function stepPulseWindow(direction) {
  const currentIndex = Math.max(0, pulseWindowOptions.findIndex((option) => option.key === selectedPulseWindow));
  const nextIndex = (currentIndex + direction + pulseWindowOptions.length) % pulseWindowOptions.length;
  setPulseWindow(pulseWindowOptions[nextIndex].key);
}

function pulsePricesForWindow(favorite = {}, key = "24h") {
  if (key === "24h") return normalizePriceSeries(favorite.windowPrices?.["24h"] || favorite.prices);
  if (isProjectedPulseWindow(key)) {
    const sourceKey = sourceWindowForProjection(key);
    if (sourceKey === "24h") return normalizePriceSeries(favorite.windowPrices?.["24h"] || favorite.prices);
    return normalizePriceSeries(favorite.windowPrices?.[sourceKey]);
  }
  return normalizePriceSeries(favorite.windowPrices?.[key]);
}

function isProjectedPulseWindow(key = selectedPulseWindow) {
  return Boolean(pulseWindowOptions.find((option) => option.key === key)?.projected);
}

function sourceWindowForProjection(key = selectedPulseWindow) {
  const option = pulseWindowOptions.find((item) => item.key === key);
  if (!option?.projected) return key;
  return option.sourceKey || (key === "next7d" ? "7d" : "24h");
}

function projectionHorizonDays(key = selectedPulseWindow) {
  return pulseWindowOptions.find((option) => option.key === key)?.horizonDays || (key === "next7d" ? 7 : 1);
}

function priceSeriesChange(prices) {
  const series = normalizePriceSeries(prices);
  if (series.length < 2 || !series[0]) return null;
  return ((series.at(-1) - series[0]) / series[0]) * 100;
}

function pulseWindowLoadKey(favorite = {}, key = "24h") {
  return `${normalizeTicker(favorite.ticker)}:${normalizeContractAddress(favorite.pairAddress)}:${key}`;
}

function isPulseWindowTemporarilyUnavailable(requestKey) {
  const failedAt = unavailablePulseWindows.get(requestKey);
  if (!failedAt) return false;
  if (Date.now() - failedAt < MARKET_CHART_FAILURE_COOLDOWN_MS) return true;
  unavailablePulseWindows.delete(requestKey);
  return false;
}

function markPulseWindowTemporarilyUnavailable(requestKey) {
  if (!requestKey) return;
  unavailablePulseWindows.set(requestKey, Date.now());
}

function ensurePulseWindowChart(favorite = currentFavorite, key = selectedPulseWindow) {
  if (isProjectedPulseWindow(key)) {
    const sourceKey = sourceWindowForProjection(key);
    ensurePulseWindowChart(favorite, sourceKey);
    return;
  }
  if (!favorite || pulsePricesForWindow(favorite, key).length >= 2) return;
  const requestKey = pulseWindowLoadKey(favorite, key);
  if (pendingPulseWindowLoads.has(requestKey) || isPulseWindowTemporarilyUnavailable(requestKey)) return;

  const request = getPulseWindowChartData(favorite, key)
    .then(({ prices, updatedAt, source }) => {
      const normalizedPrices = normalizePriceSeries(prices);
      if (normalizedPrices.length < 2) throw new Error("Exact chart window is empty");
      currentFavorites = currentFavorites.map((candidate) => {
        if (normalizeTicker(candidate.ticker) !== normalizeTicker(favorite.ticker)) return candidate;
        return {
          ...candidate,
          windowPrices: { ...(candidate.windowPrices || {}), [key]: normalizedPrices },
          changeWindows: { ...(candidate.changeWindows || {}), [key]: priceSeriesChange(normalizedPrices) },
          windowSources: { ...(candidate.windowSources || {}), [key]: source || `${pulseWindowLabel(key)} chart` },
          windowUpdatedAt: { ...(candidate.windowUpdatedAt || {}), [key]: updatedAt },
        };
      });
      const updated = currentFavorites.find((candidate) => normalizeTicker(candidate.ticker) === normalizeTicker(favorite.ticker));
      if (updated && normalizeTicker(currentFavorite?.ticker) === normalizeTicker(updated.ticker)) {
        currentFavorite = updated;
        if (selectedPulseWindow === key) {
          renderPulseChange(updated);
          renderPulseWindowChart(updated);
        }
      }
    })
    .catch(() => {
      markPulseWindowTemporarilyUnavailable(requestKey);
      if (normalizeTicker(currentFavorite?.ticker) === normalizeTicker(favorite.ticker) && selectedPulseWindow === key) {
        renderPulseWindowChart(currentFavorite);
      }
    })
    .finally(() => pendingPulseWindowLoads.delete(requestKey));
  pendingPulseWindowLoads.set(requestKey, request);
}

async function getPulseWindowChartData(favorite = {}, key = "7d") {
  const attempts = chartSourcePlanForWindow(key)
    .map((source) => {
      if (source === "coingecko" && favorite.id) return () => getCoinGeckoWindowChartData(favorite.id, key);
      if (source === "geckoterminal" && favorite.pairAddress) return () => getGeckoTerminalPulseChartData(favorite, key);
      return null;
    })
    .filter(Boolean);
  if (!attempts.length) throw new Error("No chart source available");
  let lastError = null;
  for (const attempt of attempts) {
    try {
      const result = await attempt();
      if (normalizePriceSeries(result?.prices).length >= 2) return result;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Chart window unavailable");
}

function chartSourcePlanForWindow(key = "24h") {
  const normalized = sourceWindowForProjection(key);
  if (["3d", "7d", "1mo"].includes(normalized)) return ["coingecko", "geckoterminal"];
  if (normalized === "24h") return ["geckoterminal", "coingecko"];
  return ["geckoterminal"];
}

async function getCoinGeckoWindowChartData(coinGeckoId, key = "7d") {
  const days = coinGeckoDaysForWindow(key);
  const chartData = await withTimeout(
    fetchCoinGeckoChartWithBestSource(coinGeckoId, { days }),
    MARKET_CHART_TIMEOUT_MS,
    "Bundle Builder CoinGecko window chart timed out",
  );
  const prices = normalizePriceSeries(chartData.prices);
  if (prices.length < 2) throw new Error("CoinGecko window chart empty");
  return {
    prices,
    updatedAt: chartData.updatedAt || new Date().toISOString(),
    source: `${chartData.stale ? "Cached " : ""}CoinGecko ${pulseWindowLabel(key)} chart`,
  };
}

function coinGeckoDaysForWindow(key = "24h") {
  if (key === "3d") return 3;
  if (key === "7d" || key === "next7d") return 7;
  if (key === "1mo" || key === "next1mo") return 30;
  return 1;
}

function renderPulseWindowChart(favorite = currentFavorite) {
  if (!pulseChart || !favorite) return;
  if (isProjectedPulseWindow(selectedPulseWindow)) {
    const sourceKey = sourceWindowForProjection(selectedPulseWindow);
    const requestKey = pulseWindowLoadKey(favorite, sourceKey);
    const hasSourceChart = pulsePricesForWindow(favorite, sourceKey).length >= 2;
    const canLoadSource = Boolean(favorite.pairAddress || favorite.id);
    if (!hasSourceChart) {
      const unavailable = !canLoadSource || isPulseWindowTemporarilyUnavailable(requestKey);
      pulseChart.innerHTML = `${entryCautionFlag(favorite)}<div class="pulse-window-message">${unavailable ? `${pulseWindowLabel(sourceKey)} chart unavailable. Retry shortly.` : `Loading ${escapeHtml(favorite.ticker || "coin")} ${pulseWindowLabel(sourceKey)} chart for scenario...`}</div>`;
      if (!unavailable) ensurePulseWindowChart(favorite, sourceKey);
      pulseChart.setAttribute("aria-label", `${pulseWindowLabel(selectedPulseWindow)} scenario chart for ${favorite.ticker || "this coin"}`);
      return;
    }
    const scenario = projectedPulseScenario(favorite, selectedPulseWindow);
    pulseChart.innerHTML = `${entryCautionFlag(favorite)}${makeProjectedPulseChart(scenario)}`;
    pulseChart.setAttribute("aria-label", `${pulseWindowLabel(selectedPulseWindow)} scenario chart for ${favorite.ticker || "this coin"}`);
    refreshPulseChartMotion();
    return;
  }
  const prices = pulsePricesForWindow(favorite, selectedPulseWindow);
  const change = pulseChangeForWindow(favorite, selectedPulseWindow);
  const requestKey = pulseWindowLoadKey(favorite, selectedPulseWindow);
  if (prices.length < 2) {
    const unavailable = isPulseWindowTemporarilyUnavailable(requestKey) || (!favorite.pairAddress && !favorite.id);
    pulseChart.innerHTML = `${entryCautionFlag(favorite)}<div class="pulse-window-message">${unavailable ? `${pulseWindowLabel(selectedPulseWindow)} chart unavailable` : `Loading ${escapeHtml(favorite.ticker || "coin")} ${pulseWindowLabel(selectedPulseWindow)} chart...`}</div>`;
    if (!unavailable) ensurePulseWindowChart(favorite, selectedPulseWindow);
  } else {
    pulseChart.innerHTML = `${entryCautionFlag(favorite)}${makeSparkline(prices, change, pulseWindowLabel(selectedPulseWindow))}`;
  }
  pulseChart.setAttribute("aria-label", `${pulseWindowLabel(selectedPulseWindow)} price sparkline for ${favorite.ticker || "this coin"}`);
  refreshPulseChartMotion();
}

function refreshPulseChartMotion() {
  // The chart sweep is intentionally CSS-only to match the mobile preview behavior.
}

function pulseChangeForWindow(favorite = {}, key = "24h") {
  if (isProjectedPulseWindow(key)) return projectedPulseScenario(favorite, key).projectedChange;
  if (key === "24h") return priceSeriesChange(pulsePricesForWindow(favorite, "24h")) ?? finiteOrNull(favorite.change24h);
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
  const insights = buildPulseInsights(favorite).slice(0, 6);
  favoriteCoinInsights.innerHTML = pulseSummaryButton(favorite);
  warmPulseAnalystRead(favorite, insights);
}

function buildPulseInsights(favorite = {}) {
  if (!favorite || favorite.source === "Market data unavailable" || favorite.ticker === "--") {
    return [{
      label: "Status",
      text: lastMarketPulseError
        ? `Live market data is unavailable right now: ${lastMarketPulseError}. The builder is using confirmed fallback candidates until fresh data returns.`
        : "Market sources are refreshing. The builder will keep using confirmed ViciSwap-supported fallback candidates until fresh data returns.",
    }];
  }

  const insights = [];
  if (lastMarketPulseError || /fallback|cached|price only|stale/i.test(`${favorite.source || ""} ${favorite.chartSource || ""}`)) {
    insights.push({
      label: "Data status",
      text: lastMarketPulseError
        ? `Some live market data failed to refresh: ${lastMarketPulseError}. Treat this read as provisional until the next successful refresh.`
        : `This read is using ${favorite.chartSource || favorite.source || "cached market data"}. Verify live route, liquidity, and price before acting.`,
    });
  }
  const volume = finiteOrNull(favorite.volume24h ?? favorite.total_volume);
  const liquidity = finiteOrNull(favorite.liquidityUsd);
  const change = finiteOrNull(favorite.change24h);
  const edge = favorite.marketEdge;
  const setup = favorite.marketSetup || marketSetupSignal(favorite, favorite, favorite.prices);
  const trajectory = chartTrajectoryLabel(favorite.prices);
  const entry = entryTimingSignal(favorite, setup, trajectory);
  const hold = holdWindowSignal(favorite, setup, trajectory);
  const practical = practicalPulseScorecard({ ...favorite, marketSetup: setup, marketEdge: edge });

  insights.push({
    label: `Timing ${practical.marketTiming.score}/100`,
    text: practical.marketTiming.text,
  });

  insights.push({
    label: `Execution ${practical.executionSafety.score}/100`,
    text: practical.executionSafety.text,
  });

  insights.push({
    label: `Conviction ${practical.convictionQuality.score}/100`,
    text: practical.convictionQuality.text,
  });

  insights.push({
    label: "Market read",
    text: plainMarketRead(favorite.ticker, change, volume, liquidity, setup),
  });

  insights.push({
    label: "Entry timing",
    text: entry.text,
  });

  insights.push({
    label: "Hold window",
    text: hold.text,
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
      text: plainWatchRead(favorite, edge, trajectory, setup),
    });
  } else if (trajectory?.text) {
    insights.push({
      label: "What to watch",
      text: plainWatchRead(favorite, edge, trajectory, setup),
    });
  } else {
    insights.push({
      label: "What to watch",
      text: "No fresh catalyst headline yet, so this pick is mostly being judged by support, market activity, and fit.",
    });
  }

  return insights;
}

function pulseAnalystKey(favorite = {}) {
  const ticker = normalizeTicker(favorite.ticker) || "coin";
  const change = finiteOrNull(favorite.change24h);
  const projected = finiteOrNull(favorite.projected24hChange);
  const health = finiteOrNull(marketHealthCache?.score);
  return [
    ticker,
    favorite.rank || "",
    Number.isFinite(change) ? change.toFixed(1) : "",
    Number.isFinite(projected) ? projected.toFixed(1) : "",
    Number.isFinite(health) ? health : "",
  ].join("|");
}

function pulseAnalystPayload(favorite = {}, insights = []) {
  return {
    coin: {
      ticker: favorite.ticker,
      name: favorite.name,
      rank: favorite.rank,
      source: favorite.source,
      theme: favorite.theme,
      change24h: favorite.change24h,
      change7d: favorite.change7d,
      volume24h: favorite.volume24h ?? favorite.total_volume,
      liquidityUsd: favorite.liquidityUsd,
      pulseScore: favorite.pulseScore,
      projected24hChange: favorite.projected24hChange,
      reason: favorite.reason,
      marketSetup: favorite.marketSetup,
      marketEdge: favorite.marketEdge,
      newsCatalyst: favorite.newsCatalyst,
    },
    marketHealth: marketHealthCache ? {
      score: marketHealthCache.score,
      label: marketHealthCache.label,
      summary: marketHealthCache.summary,
      context: marketHealthCache.context,
    } : null,
    insights: insights.slice(0, 6),
  };
}

async function warmPulseAnalystRead(favorite = {}, insights = []) {
  if (!favorite || favorite.source === "Market data unavailable" || favorite.ticker === "--") return;
  const key = pulseAnalystKey(favorite);
  const cached = pulseAnalystCache.get(key);
  if (cached && Date.now() - cached.loadedAt < PULSE_ANALYST_CACHE_MS) {
    updatePulseAnalystPanel(favorite, cached.value);
    return;
  }
  try {
    const baseUrl = window.location.protocol === "file:" ? LIVE_BACKEND_BASE_URL : "";
    const value = await fetchJsonPostUrl(
      `${baseUrl}/api/v1/pulse-analyst`,
      pulseAnalystPayload(favorite, insights),
      { timeoutMs: 15000 },
    );
    if (!value?.ok) return;
    pulseAnalystCache.set(key, { value, loadedAt: Date.now() });
    updatePulseAnalystPanel(favorite, value);
  } catch (error) {
    const fallback = buildPulseAiSummary(favorite);
    updatePulseAnalystPanel(favorite, {
      source: "deterministic-fallback",
      warning: "AI analyst note is taking longer than expected, so this is the machine read from the same live inputs.",
      headline: fallback.headline,
      points: fallback.points,
    });
  }
}

function analystWarningText(value = "") {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/unavailable|endpoint|failed|abort|timed out|timeout/i.test(text)) {
    return "AI analyst note is taking longer than expected, so this is the machine read from the same live inputs.";
  }
  return text;
}

function updatePulseAnalystPanel(favorite = {}, analysis = {}) {
  const ticker = normalizeTicker(favorite.ticker) || "coin";
  if (currentFavorite && normalizeTicker(currentFavorite.ticker) !== ticker) return;
  const panel = document.getElementById(`pulse-ai-${ticker.toLowerCase()}`);
  if (!panel) return;
  const summary = {
    headline: analysis.headline,
    points: analysis.points,
  };
  panel.innerHTML = renderPulseAnalystPanel(favorite, summary, {
    source: analysis.source,
    warning: analysis.warning,
  });
}

function plainMarketRead(ticker, change, volume, liquidity, setup = null) {
  const thesis = tokenThesisForTicker(ticker);
  const hasChange = Number.isFinite(change);
  const hasSolidVolume = Number.isFinite(volume) && volume >= 1_000_000;
  const hasSolidLiquidity = Number.isFinite(liquidity) && liquidity >= 1_000_000;
  if (setup?.boughtPullback && setup?.hasVolume && setup?.hasDepth) {
    return thesis?.marketRead
      ? `${thesis.marketRead} The extra setup read is that the recent pullback is being bought with enough volume and depth to deserve attention.`
      : `${ticker} is showing a bought-pullback setup: the move cooled off, then buyers stepped back in with enough volume and depth to deserve attention.`;
  }
  if (setup?.baseForming && setup?.hasVolume && setup?.hasDepth) {
    return thesis?.marketRead
      ? `${thesis.marketRead} The extra setup read is that selling has slowed into a tight base after the drop, so the machine treats it as a reversal watch instead of a pure falling-knife setup.`
      : `${ticker} is forming a tight base after the drop. That does not guarantee a pump, but it is real reversal evidence if volume and liquidity keep holding.`;
  }
  if (setup?.extended && setup?.fading) {
    return thesis?.marketRead
      ? `${thesis.marketRead} The move looks extended and is starting to fade, so the machine treats this as a watchlist setup rather than a clean chase.`
      : `${ticker} looks extended and is starting to fade, so the machine treats this as a watchlist setup rather than a clean chase.`;
  }
  if (setup?.constructive && setup?.hasVolume) {
    return thesis?.marketRead
      ? `${thesis.marketRead} The near-term setup is constructive because price action is still supported by active trading.`
      : `${ticker} has a constructive near-term setup because price action is still supported by active trading.`;
  }
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

function timingScoreText(candidate = {}, score = 50, setup = {}, stats = null) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol) || "This coin";
  const change24h = finiteOrNull(candidate.change24h ?? candidate.price_change_percentage_24h_in_currency ?? candidate.price_change_percentage_24h);
  if (score >= 75) return `${ticker} has a strong timing read because price action is constructive and buyers are still confirming the move.`;
  if (score >= 60) return `${ticker} has a constructive timing read; the machine likes the setup, but still wants volume to hold.`;
  if (score <= 25) return `${ticker} has weak timing right now. The machine would wait for stabilization before treating this as a buy.`;
  if (score <= 40) return `${ticker} has a cautious timing read${Number.isFinite(change24h) ? ` after a ${formatPercent(change24h)} 24h move` : ""}. It needs a cleaner bounce or stronger follow-through.`;
  if (setup?.boughtPullback) return `${ticker} is in the middle zone, but the pullback is being bought, so the next check is whether the rebound keeps working.`;
  if (setup?.baseForming) return `${ticker} is basing after a sharp drop. The machine is watching for a break above the base with volume before calling it a clean buy.`;
  if (stats?.recentReturn < 0) return `${ticker} is mixed on timing because the recent slope is softening. Wait for the next push before adding size.`;
  return `${ticker} is mixed on timing. It is not a clean buy or avoid signal yet.`;
}

function executionScoreText(volume = 0, liquidity = 0, score = 50) {
  const volumeText = volume ? `${formatCompactUsd(volume)} volume` : "volume still refreshing";
  const liquidityText = liquidity ? `${formatCompactUsd(liquidity)} liquidity` : "liquidity still refreshing";
  if (score >= 75) return `Execution looks strong: ${volumeText} and ${liquidityText} give the route more room to work.`;
  if (score >= 60) return `Execution looks usable with ${volumeText} and ${liquidityText}, but the quote still needs review.`;
  if (score <= 30) return `Execution is thin: ${volumeText} and ${liquidityText}. Keep size small or avoid until depth improves.`;
  if (score <= 45) return `Execution needs caution because ${volumeText} and ${liquidityText} may not support easy entry and exit.`;
  return `Execution is mixed. The token may be usable, but route, slippage, and exit depth matter before sizing.`;
}

function convictionScoreText(candidate = {}, score = 50, setup = {}, edge = {}, direction = {}) {
  const ticker = normalizeTicker(candidate.ticker || candidate.symbol) || "This coin";
  if (score >= 75) return `${ticker} has strong conviction quality because timing, data edge, depth, and setup are lining up.`;
  if (score >= 60) return `${ticker} has building conviction. It can rank, but it still needs the next market check to confirm.`;
  if (score <= 30) return `${ticker} has weak conviction quality. It should not be sized up unless the setup, depth, or 7d read improves.`;
  if (score <= 45) return `${ticker} has cautious conviction: ${edge?.label || "data edge"} and ${setup?.label || "setup"} are not strong enough for a lazy hold.`;
  if (Number.isFinite(direction.score) && direction.score < 50) return `${ticker} has mixed conviction because the 7d read is still leaning defensive.`;
  return `${ticker} has neutral conviction. It can stay on the board, but it needs stronger proof before becoming a high-confidence pick.`;
}

function entryTimingSignal(favorite = {}, setup = {}, trajectory = null) {
  const ticker = normalizeTicker(favorite.ticker) || "This coin";
  const stats = chartTrajectoryStats(favorite.prices);
  const change24h = finiteOrNull(favorite.change24h) || 0;
  const change1h = pulseChangeForWindow(favorite, "1h");
  const change3h = pulseChangeForWindow(favorite, "3h");
  const volume = finiteOrNull(favorite.volume24h ?? favorite.total_volume) || 0;
  const liquidity = finiteOrNull(favorite.liquidityUsd) || 0;
  const hasDepth = volume >= 1_000_000 && liquidity >= 750_000;
  const nearHigh = stats?.pullbackFromHigh <= 0.035;
  const sharpMove = change24h >= 8 || stats?.recentReturn >= 2.5;
  const shortCooling = (Number.isFinite(change1h) && change1h < -0.6) || (Number.isFinite(change3h) && change3h < -1.2);

  if (setup?.extended && setup?.fading) {
    return {
      label: "Entry caution",
      text: `${ticker} looks extended and is already cooling. Waiting for stabilization or renewed volume confirmation is cleaner than chasing the fade.`,
    };
  }
  if ((setup?.extended || (nearHigh && sharpMove)) && shortCooling) {
    return {
      label: "Wait for cooloff",
      text: `${ticker} is near a high but short-term momentum is cooling. A 6-12h cooloff or a fresh volume push would give a cleaner entry read.`,
    };
  }
  if (setup?.extended || (nearHigh && sharpMove)) {
    return {
      label: "High-zone caution",
      text: `${ticker} still has momentum, but it is being priced near the top of its recent range. Entering smaller or waiting for confirmation may be smarter.`,
    };
  }
  if (setup?.boughtPullback && setup?.hasVolume && setup?.hasDepth) {
    return {
      label: "Pullback setup",
      text: `${ticker} has cooled off and started rebounding with usable depth. That is usually a cleaner setup than buying a vertical spike.`,
    };
  }
  if (setup?.baseForming && setup?.hasVolume && setup?.hasDepth) {
    return {
      label: "Reversal watch",
      text: `${ticker} sold off, then flattened into a tighter base with usable volume and depth. The next bullish confirmation would be a break above the base with volume.`,
    };
  }
  if (trajectory?.tone === "bearish" || (change24h <= -4 && !setup?.boughtPullback && !setup?.baseForming)) {
    return {
      label: "Falling-knife caution",
      text: `${ticker} is dropping without enough rebound confirmation yet. The machine wants proof of buyer support before treating the dip as attractive.`,
    };
  }
  if (setup?.constructive && hasDepth) {
    return {
      label: "Momentum confirmed",
      text: `${ticker} has constructive price action with volume and route depth behind it. The setup is cleaner if those conditions hold through the quote.`,
    };
  }
  if (setup?.hasVolume && !setup?.hasDepth) {
    return {
      label: "Liquidity check",
      text: `${ticker} has activity, but depth looks less convincing. Keep size modest until the route, slippage, and exit path are reviewed.`,
    };
  }
  return {
    label: "Balanced signal",
    text: `${ticker} has no obvious entry warning right now. The signal is neutral, so it may still fit the bundle while waiting for stronger confirmation.`,
  };
}

function holdWindowSignal(favorite = {}, setup = {}, trajectory = null) {
  const ticker = normalizeTicker(favorite.ticker) || "This coin";
  const theme = String(favorite.theme || "").toLowerCase();
  const change24h = finiteOrNull(favorite.change24h) || 0;
  const change12h = pulseChangeForWindow(favorite, "12h");
  const change6h = pulseChangeForWindow(favorite, "6h");
  const volume = finiteOrNull(favorite.volume24h ?? favorite.total_volume) || 0;
  const liquidity = finiteOrNull(favorite.liquidityUsd) || 0;
  const highBeta = theme.includes("meme") || theme.includes("ai") || ["BRETT", "DEGEN", "TOSHI", "MOG", "ZORA", "VIRTUAL"].includes(ticker);
  const coreOrDeep = theme.includes("core") || ["ETH", "WETH", "CBBTC", "WBTC", "CBETH", "LINK", "AAVE"].includes(ticker) || liquidity >= 5_000_000;
  const strongDepth = volume >= 3_000_000 && liquidity >= 2_000_000;
  const intradayMomentum = (Number.isFinite(change12h) && change12h >= 3) || (Number.isFinite(change6h) && change6h >= 2);

  if (setup?.extended && setup?.fading) {
    return {
      label: "Watch-only",
      text: `${ticker} is better treated as watch-only until the fade stabilizes. The hold clock should start after confirmation, not during the cooloff.`,
    };
  }
  if (highBeta && (intradayMomentum || change24h >= 6)) {
    return {
      label: "Short-term trade",
      text: `${ticker} looks best suited for a 1-3 day window because the signal is mostly momentum, attention, and fast-moving risk appetite.`,
    };
  }
  if (setup?.boughtPullback && strongDepth) {
    return {
      label: "Swing setup",
      text: `${ticker} looks better for a 3-10 day swing if the rebound keeps volume. The idea is to let the recovery breathe, not scalp one candle.`,
    };
  }
  if (setup?.constructive && strongDepth) {
    return {
      label: "Swing setup",
      text: `${ticker} fits a 1-3 week hold better than a quick flip because the setup has both market activity and enough depth to support continuation.`,
    };
  }
  if (coreOrDeep) {
    return {
      label: "Longer conviction",
      text: `${ticker} can support a 2-6 week hold more comfortably than thin tokens because the thesis is less dependent on one short-term spike.`,
    };
  }
  if (!setup?.hasVolume || !setup?.hasDepth) {
    return {
      label: "Small test size",
      text: `${ticker} should be treated as a small, short hold until volume and liquidity improve. Review the route before assigning real conviction.`,
    };
  }
  if (trajectory?.tone === "constructive") {
    return {
      label: "Short swing",
      text: `${ticker} looks like a 3-7 day setup: enough trend to matter, but still dependent on near-term confirmation.`,
    };
  }
  return {
    label: "Flexible hold",
    text: `${ticker} does not show a clear time edge yet. Treat it as a flexible 3-10 day candidate and reassess if volume or trend changes.`,
  };
}

function plainCatalystRead(catalyst) {
  const summary = String(catalyst?.summary || "").replace(/^Recent news includes risk words; /, "Recent headlines include risk language. ");
  return summary.length > 150 ? `${summary.slice(0, 147)}...` : summary;
}

function plainWatchRead(favorite, edge, trajectory, setup = null) {
  const thesis = tokenThesisForTicker(favorite.ticker);
  if (setup?.boughtPullback) {
    return thesis?.watch
      ? `${thesis.watch} For this setup, the key confirmation is whether the rebound keeps its volume instead of rolling back over.`
      : "For this setup, the key confirmation is whether the rebound keeps its volume instead of rolling back over.";
  }
  if (setup?.extended && setup?.fading) {
    return thesis?.watch
      ? `${thesis.watch} The move is extended and cooling, so the main risk is chasing after the easy part of the move has already happened.`
      : "The move is extended and cooling, so the main risk is chasing after the easy part of the move has already happened.";
  }
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
  const ticker = normalizeTicker(currentFavorite?.ticker);
  const network = safePreferences().network;
  const unavailable = !ticker || !isTickerOnNetwork(ticker, network);
  const active = selectedCoinPreferences.has(ticker) && !unavailable;
  if (useFavoriteCoin) {
    useFavoriteCoin.classList.toggle("active", active);
    useFavoriteCoin.disabled = unavailable;
    useFavoriteCoin.innerHTML = active
      ? `${icon("check")} Using this coin`
      : `${icon("check")} Use this coin`;
  }
  if (favoriteMarketCoin) {
    const favorited = !unavailable && isFavoriteCoin(ticker, network);
    favoriteMarketCoin.disabled = unavailable;
    favoriteMarketCoin.classList.toggle("active", favorited);
    favoriteMarketCoin.setAttribute("aria-pressed", String(favorited));
    favoriteMarketCoin.innerHTML = favorited
      ? `${icon("starFilled")} <span>Favorited</span>`
      : `${icon("star")} <span>Favorite</span>`;
  }
}

function updateCoinPreferenceAvailability() {
  const { network } = getPreferences();
  document.querySelectorAll('input[name="coinPrefs"]').forEach((input) => {
    const available = isTickerOnNetwork(input.value, network);
    input.disabled = !available;
    input.checked = available && selectedCoinPreferences.has(normalizeTicker(input.value));
    input.nextElementSibling?.setAttribute("title", available ? `${input.value} is available on ${network}` : `${input.value} is not available on ${network}`);
  });
  updateFavoriteToggle();
}

function makeViciSwapUrl(bundle, allocation = getAdjustedAllocation(bundle), network = chooseBundleNetwork(bundle)) {
  const preferences = getPreferences();
  const safeAllocation = getNetworkSafeAllocation(allocation, network);
  const allocationPlan = getAllocationPlan(safeAllocation, preferences.bundleAmount);
  const chainId = viciNetworkChainIds[normalizeNetwork(network)];
  const tokenAddresses = allocationPlan
    .map(({ ticker }) => tokenAddressForNetwork(ticker, network))
    .filter(Boolean);
  if (chainId && tokenAddresses.length === allocationPlan.length) {
    const params = new URLSearchParams({
      chainid: String(chainId),
      bundle: tokenAddresses.join(","),
    });
    return `${VICI_SWAP_VS2_BASE_URL}?${params.toString()}`;
  }
  const handoff = {
    source: "vici-bundle-builder",
    name: bundle.name,
    network,
    totalUsd: Number(preferences.bundleAmount.toFixed(2)),
    split: "equal",
    tokens: allocationPlan.map(({ ticker, weight, recommendedWeight, role, amount, quantity, price, priceSource, networks }) => ({
      ticker,
      weight,
      recommendedWeight,
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
    split: "equal",
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
  const readable = `${bundle.name}\nNetwork: ${bundleNetwork}\nTotal: ${formatCurrency(preferences.bundleAmount)}\nViciSwap split: equal across selected coins\n${allocationPlan.map(({ ticker, weight, recommendedWeight, amount, quantity, networks }) => {
    const otherNetworks = (networks || []).filter((network) => network !== bundleNetwork);
    const networkNote = otherNetworks.length ? `${bundleNetwork}; also ${otherNetworks.join("/")}` : bundleNetwork;
    return `${ticker}: ${weight}% equal split - machine suggests ${recommendedWeight}% - ${formatCurrency(amount)} - ${formatQuantity(quantity, ticker)} - Receive: ${networkNote}`;
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
    showToast("Bundle saved locally; server sync is not available yet.");
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
    "ViciSwap will execute an equal split across the selected coins.",
    "Bundle Builder's machine percentages are recommendation guidance only, not the final ViciSwap allocation.",
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

function renderReviewToken({ ticker, weight, recommendedWeight, amount, networks, safetyProfile }) {
  const network = getPreferences().network;
  const networkLabel = networks?.includes(network) ? network : "network pending";
  return `
    <div class="review-token safety-${safetyProfile.level}">
      <strong>${escapeHtml(ticker)}</strong>
      <span>ViciSwap split ${weight}% - machine guide ${recommendedWeight}% - ${formatCurrency(amount)} - Receive: ${escapeHtml(networkLabel)}</span>
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
  const snapshot = saveRecentBundleSnapshot(bundleId);
  if (snapshot) {
    const alreadyScheduled = readReviewAlerts().some((alert) => alert.snapshotId === snapshot.id && alert.status === "pending");
    if (!alreadyScheduled) scheduleBundleReview(bundleId, bundleReviewDelay(), { silent: true, snapshotId: snapshot.id });
  }
  submitTrackedBundle(bundleId);
  await copyViciSwapHandoff(bundleId);
  window.open(url, "_blank", "noopener,noreferrer");
}

function projectedPulseScenario(favorite = {}, key = "next7d") {
  if (key === "next7d") {
    const scenario = projectedSevenDayScenario(favorite);
    return {
      ...scenario,
      key,
      label: "Next 7d",
      sourceLabel: "Last 7d",
      terminalPrice: scenario.sevenDayPrice,
      readWindow: "7d",
      cards: [
        { label: "1-Day", price: scenario.oneDayPrice, change: scenario.oneDayChange },
        { label: "5-Day", price: scenario.fiveDayPrice, change: scenario.fiveDayChange },
        { label: "7-Day", price: scenario.sevenDayPrice, change: scenario.projectedChange },
      ],
    };
  }

  const sourceKey = sourceWindowForProjection(key);
  const sourcePrices = pulsePricesForWindow(favorite, sourceKey);
  const series = sourceKey === "24h"
    ? (sourcePrices.length >= 2 ? sourcePrices : normalizePriceSeries(favorite.prices))
    : sourcePrices;
  const readKey = key === "next1mo" ? "1M" : "1d";
  const read = directionalCoinRead(favorite, readKey);
  const setup = favorite.marketSetup || marketSetupSignal(favorite, favorite, favorite.prices);
  const stats = chartTrajectoryStats(series);
  const change24h = finiteOrNull(favorite.change24h) || 0;
  const sourceChange = priceSeriesChange(series) ?? change24h;
  const volume = finiteOrNull(favorite.volume24h ?? favorite.total_volume) || 0;
  const liquidity = finiteOrNull(favorite.liquidityUsd) || 0;
  const opportunity = liveOpportunityScore(favorite, setup, null, read);
  const depthBoost = volume >= 3_000_000 && liquidity >= 1_000_000 ? 1.08 : volume >= 650_000 && liquidity >= 250_000 ? 0.82 : volume >= 150_000 && liquidity >= 120_000 ? 0.62 : 0.46;
  const scorePressure = ((read.score || 50) - 50) / 50;
  const horizonScale = key === "next1mo" ? 2.25 : 0.36;
  const trendPressure = clamp(sourceChange / (key === "next1mo" ? 55 : 14), -0.9, 0.9) * 0.42
    + clamp(change24h / 16, -0.9, 0.9) * (key === "next1mo" ? 0.14 : 0.28);
  const setupPressure = setup?.boughtPullback || setup?.baseForming ? 0.18
    : setup?.constructive ? 0.12
      : setup?.extended && setup?.fading ? -0.22
        : setup?.fading ? -0.12
          : 0;
  const lifetimeBias = lifetimeProjectionBias(favorite, key);
  const opportunityBias = opportunity * (key === "next1mo" ? 0.18 : 0.38);
  const betaLift = opportunity >= 8 && change24h > -3 ? (key === "next1mo" ? 2.2 : 0.65) : 0;
  const reversalLift = liveReversalWakeupBoost(favorite, setup, read, opportunity) * (key === "next1mo" ? 0.16 : 0.34);
  const extensionBrake = liveExtensionPenalty(favorite, setup, opportunity) * (key === "next1mo" ? 0.42 : 0.18);
  const trapBrake = liveSpeculativeTrapPenalty(favorite, setup, read, opportunity) * (key === "next1mo" ? 0.46 : 0.24);
  const rawChange = ((scorePressure * 12 + trendPressure * 10 + setupPressure * 11 + opportunityBias + reversalLift - extensionBrake - trapBrake) * depthBoost * horizonScale) + lifetimeBias + betaLift;
  const projectedChange = roundTo(clamp(rawChange, key === "next1mo" ? -38 : -9, key === "next1mo" ? 50 : 12), 2);
  const confidenceBase = 42
    + Math.min(18, Math.max(0, series.length - 12) * 0.5)
    + Math.min(18, Math.abs((read.score || 50) - 50) * 0.38)
    + (depthBoost >= 1 ? 12 : depthBoost >= 0.72 ? 6 : -8)
    - (key === "next1mo" ? 6 : 0)
    - Math.min(10, extensionBrake * 1.8)
    - Math.min(8, trapBrake * 1.4);
  const confidenceScore = Math.round(clamp(confidenceBase, 20, 86));
  const confidence = confidenceScore >= 70 ? "Higher confidence" : confidenceScore >= 50 ? "Medium confidence" : "Low confidence";
  let projectedPrices = buildProjectionSeries(series, projectedChange, { stats, setup, read, ticker: `${favorite.ticker || ""}-${key}`, key, confidenceScore, lifetimeBias });
  if (key === "next1mo") {
    const sevenDayScenario = projectedSevenDayScenario(favorite);
    projectedPrices = graftProjectionOpening(projectedPrices, sevenDayScenario.projectedPrices, 7 / 30);
  }
  const cards = key === "next1mo"
    ? [
        { label: "7-Day", price: scenarioPriceAtRatio(projectedPrices, 7 / 30), change: scenarioChangeAtRatio(projectedPrices, 7 / 30) },
        { label: "14-Day", price: scenarioPriceAtRatio(projectedPrices, 14 / 30), change: scenarioChangeAtRatio(projectedPrices, 14 / 30) },
        { label: "1-Month", price: scenarioPriceAtRatio(projectedPrices, 1), change: projectedChange },
      ]
    : [
        { label: "6-Hour", price: scenarioPriceAtRatio(projectedPrices, 0.25), change: scenarioChangeAtRatio(projectedPrices, 0.25) },
        { label: "12-Hour", price: scenarioPriceAtRatio(projectedPrices, 0.5), change: scenarioChangeAtRatio(projectedPrices, 0.5) },
        { label: "24-Hour", price: scenarioPriceAtRatio(projectedPrices, 1), change: projectedChange },
      ];

  return {
    sourcePrices: series,
    projectedPrices,
    projectedChange,
    confidence,
    confidenceScore,
    read,
    setup,
    ticker: favorite.ticker || "",
    key,
    label: pulseWindowLabel(key),
    sourceLabel: sourceKey === "1mo" ? "Last 1M" : "Last 24h",
    readWindow: readKey,
    terminalPrice: projectedPrices.at(-1) || null,
    cards,
  };
}

function scenarioPriceAtRatio(projectedPrices = [], ratio = 1) {
  const series = normalizePriceSeries(projectedPrices);
  if (!series.length) return null;
  const index = Math.round(clamp(ratio, 0, 1) * (series.length - 1));
  return series[index] || null;
}

function scenarioChangeAtRatio(projectedPrices = [], ratio = 1) {
  const series = normalizePriceSeries(projectedPrices);
  const start = series[0];
  const price = scenarioPriceAtRatio(series, ratio);
  if (!start || !price) return 0;
  return roundTo(((price - start) / start) * 100, 2);
}

function graftProjectionOpening(longerProjection = [], openingProjection = [], openingRatio = 0.15) {
  const longer = normalizePriceSeries(longerProjection);
  const opening = normalizePriceSeries(openingProjection);
  if (longer.length < 8 || opening.length < 4) return longer;
  const lastIndex = longer.length - 1;
  const openingCount = Math.max(4, Math.min(lastIndex - 2, Math.round(lastIndex * clamp(openingRatio, 0.05, 0.7)) + 1));
  const sampledOpening = samplePriceSeries(opening, openingCount);
  if (sampledOpening.length < 4) return longer;
  const merged = longer.slice();
  for (let index = 0; index < openingCount; index += 1) {
    merged[index] = sampledOpening[index];
  }

  const bridgeStart = openingCount;
  const bridgeCount = Math.min(Math.max(8, Math.round(longer.length * 0.08)), lastIndex - bridgeStart);
  const offset = sampledOpening.at(-1) - (longer[openingCount - 1] || sampledOpening.at(-1));
  for (let index = bridgeStart; index < Math.min(lastIndex, bridgeStart + bridgeCount); index += 1) {
    const t = (index - bridgeStart + 1) / bridgeCount;
    const fade = 1 - (t * t * (3 - 2 * t));
    merged[index] = Math.max(0.0000001, longer[index] + offset * fade);
  }
  merged[0] = sampledOpening[0];
  merged[lastIndex] = longer[lastIndex];
  return merged;
}

function projectedSevenDayScenario(favorite = {}) {
  const sourcePrices = pulsePricesForWindow(favorite, "7d");
  const series = sourcePrices;
  const read = directionalCoinRead(favorite, "7d");
  const setup = favorite.marketSetup || marketSetupSignal(favorite, favorite, favorite.prices);
  const stats = chartTrajectoryStats(series);
  const change24h = finiteOrNull(favorite.change24h) || 0;
  const change7d = finiteOrNull(favorite.change7d) ?? priceSeriesChange(series) ?? 0;
  const volume = finiteOrNull(favorite.volume24h ?? favorite.total_volume) || 0;
  const liquidity = finiteOrNull(favorite.liquidityUsd) || 0;
  const opportunity = liveOpportunityScore(favorite, setup, null, read);
  const depthBoost = volume >= 3_000_000 && liquidity >= 1_000_000 ? 1.08 : volume >= 650_000 && liquidity >= 250_000 ? 0.82 : volume >= 150_000 && liquidity >= 120_000 ? 0.62 : 0.46;
  const scorePressure = ((read.score || 50) - 50) / 50;
  const trendPressure = clamp(change7d / 35, -0.9, 0.9) * 0.38 + clamp(change24h / 16, -0.9, 0.9) * 0.24;
  const setupPressure = setup?.boughtPullback || setup?.baseForming ? 0.18
    : setup?.constructive ? 0.12
      : setup?.extended && setup?.fading ? -0.22
        : setup?.fading ? -0.12
          : 0;
  const lifetimeBias = lifetimeProjectionBias(favorite, "next7d");
  const opportunityBias = opportunity * 0.27;
  const betaLift = opportunity >= 8 && change24h > -3 ? 1.25 : 0;
  const reversalLift = liveReversalWakeupBoost(favorite, setup, read, opportunity) * 0.28;
  const extensionBrake = liveExtensionPenalty(favorite, setup, opportunity) * 0.26;
  const trapBrake = liveSpeculativeTrapPenalty(favorite, setup, read, opportunity) * 0.28;
  const rawChange = (scorePressure * 12 + trendPressure * 10 + setupPressure * 11 + opportunityBias + reversalLift - extensionBrake - trapBrake) * depthBoost + lifetimeBias + betaLift;
  const projectedChange = roundTo(clamp(rawChange, -24, 30), 2);
  const confidenceBase = 42
    + Math.min(18, Math.max(0, series.length - 12) * 0.5)
    + Math.min(18, Math.abs((read.score || 50) - 50) * 0.38)
    + (depthBoost >= 1 ? 12 : depthBoost >= 0.72 ? 6 : -8)
    - Math.min(10, extensionBrake * 1.6)
    - Math.min(8, trapBrake * 1.35);
  const confidenceScore = Math.round(clamp(confidenceBase, 20, 86));
  const confidence = confidenceScore >= 70 ? "Higher confidence" : confidenceScore >= 50 ? "Medium confidence" : "Low confidence";
  const next24hScenario = projectedPulseScenario(favorite, "next24h");
  const projectedPrices = graftProjectionOpening(
    buildProjectionSeries(series, projectedChange, { stats, setup, read, ticker: favorite.ticker, key: "next7d", confidenceScore, lifetimeBias }),
    next24hScenario.projectedPrices,
    1 / 7,
  );
  const currentPrice = series.at(-1) || finiteOrNull(favorite.currentPrice) || null;
  const oneDayChange = scenarioChangeAtRatio(projectedPrices, 1 / 7);
  const threeDayChange = scenarioChangeAtRatio(projectedPrices, 3 / 7);
  const fiveDayChange = scenarioChangeAtRatio(projectedPrices, 5 / 7);
  return {
    sourcePrices: series,
    projectedPrices,
    currentPrice,
    oneDayPrice: scenarioPriceAtDay(projectedPrices, 1),
    threeDayPrice: scenarioPriceAtDay(projectedPrices, 3),
    fiveDayPrice: scenarioPriceAtDay(projectedPrices, 5),
    sevenDayPrice: projectedPrices.at(-1) || null,
    oneDayChange,
    threeDayChange,
    fiveDayChange,
    projectedChange,
    confidence,
    confidenceScore,
    read,
    setup,
    ticker: favorite.ticker || "",
  };
}

function scenarioPriceAtDay(projectedPrices = [], day = 7) {
  const series = normalizePriceSeries(projectedPrices);
  if (!series.length) return null;
  const index = Math.round(clamp(day / 7, 0, 1) * (series.length - 1));
  return series[index] || null;
}

function buildProjectionSeries(sourcePrices = [], projectedChange = 0, context = {}) {
  const series = normalizePriceSeries(sourcePrices);
  if (series.length < 2) return [];
  const steps = projectionPointCount(series.length, context.key || "next7d");
  const start = series.at(-1);
  const target = start * (1 + (projectedChange || 0) / 100);
  const stats = context.stats || null;
  const setup = context.setup || {};
  const score = finiteOrNull(context.read?.score) ?? 50;
  const horizonKey = context.key || "next7d";
  const chartFingerprint = projectionChartFingerprint(series, stats, horizonKey);
  const seed = projectionSeed(`${context.ticker || "scenario"}-${horizonKey}-${chartFingerprint}`);
  const lifetimeBias = finiteOrNull(context.lifetimeBias) || 0;
  const recentSlope = stats?.recentReturn ? clamp(stats.recentReturn / 100, -0.08, 0.08) : 0;
  const volatility = priceReturnVolatility(series);
  const rangeVolatility = priceRangeVolatility(series);
  const confidenceScore = finiteOrNull(context.confidenceScore) ?? finiteOrNull(context.read?.score) ?? 58;
  const uncertaintyBoost = clamp((72 - confidenceScore) / 42, 0, 0.55);
  const amplitude = start * clamp(
    (volatility * projectionVolatilityScale(horizonKey)) + (rangeVolatility * 0.18) + uncertaintyBoost * 0.012,
    0.012,
    0.16,
  );
  const bullishBias = projectedChange >= 0;
  const projection = [];
  const texture = recentReturnTexture(series, steps, seed);
  const shapeEcho = projectionRecentShapeEcho(series, steps, start, amplitude, horizonKey);
  const textureWeight = horizonKey === "next24h" ? 0.74 : horizonKey === "next7d" ? 0.5 : 0.34;
  const slopeWeight = horizonKey === "next24h" ? 0.7 : horizonKey === "next7d" ? 0.45 : 0.24;
  for (let index = 0; index < steps; index += 1) {
    const t = index / (steps - 1 || 1);
    const smooth = t * t * (3 - 2 * t);
    const drift = start + (target - start) * smooth;
    const fade = 1.05 - t * 0.2;
    const chop = Math.sin(t * Math.PI * 4.1 + seed) * amplitude * fade
      + Math.sin(t * Math.PI * 9.7 + seed * 0.73) * amplitude * 0.46
      + Math.sin(t * Math.PI * 15.2 + seed * 1.17) * amplitude * 0.18;
    const microChop = projectionMicroChop({ t, amplitude, seed, index, steps, horizonKey });
    const textureChop = texture[index] * amplitude * textureWeight * (0.98 - t * 0.22);
    const recentBend = start * recentSlope * Math.sin(Math.PI * t) * slopeWeight;
    const echoBend = shapeEcho[index] || 0;
    const setupBend = projectionSetupBend({ t, amplitude, setup, bullishBias, score });
    const breakoutBend = projectionBreakoutBend({ t, amplitude, projectedChange, score, setup });
    const earlyBias = projectionEarlyBias({ t, amplitude, projectedChange, score, setup, recentSlope });
    const macroBend = projectionMacroBend({ t, start, projectedChange, lifetimeBias, horizonKey });
    projection.push(Math.max(0.0000001, drift + chop + microChop + textureChop + echoBend + recentBend + setupBend + breakoutBend + earlyBias + macroBend));
  }
  projection[0] = start;
  shapeProjectionOpening(projection, start, projectedChange, amplitude, setup);
  anchorProjectionEndpoints(projection, start, target, amplitude, projectedChange);
  projection[projection.length - 1] = target;
  return projection;
}

function anchorProjectionEndpoints(projection = [], start = 0, target = 0, amplitude = 0, projectedChange = 0) {
  if (projection.length < 4 || !start || !target) return;
  const lastIndex = projection.length - 1;
  const openingCount = Math.min(Math.max(8, Math.round(projection.length * 0.1)), lastIndex - 1);
  const openingDrift = (target - start) * 0.16;
  for (let index = 1; index <= openingCount; index += 1) {
    const t = index / openingCount;
    const smooth = t * t * (3 - 2 * t);
    const anchor = start + openingDrift * smooth;
    const tolerance = amplitude * (0.1 + t * 0.34);
    projection[index] = clamp(projection[index], anchor - tolerance, anchor + tolerance);
  }

  const closingCount = Math.min(Math.max(10, Math.round(projection.length * 0.14)), lastIndex - 1);
  const startClose = Math.max(1, lastIndex - closingCount);
  for (let index = startClose; index < lastIndex; index += 1) {
    const t = (index - startClose + 1) / closingCount;
    const smooth = t * t * (3 - 2 * t);
    const anchorWeight = 0.22 + smooth * 0.68;
    const tolerance = amplitude * (0.22 + (1 - t) * 0.26);
    const blended = projection[index] * (1 - anchorWeight) + target * anchorWeight;
    projection[index] = clamp(blended, target - tolerance, target + tolerance);
  }
  projection[0] = start;
  projection[lastIndex] = target;
}

function projectionPointCount(sourceLength = 0, key = "next7d") {
  if (key === "next24h") return Math.max(96, Math.min(150, Math.round(sourceLength * 1.05)));
  if (key === "next1mo") return Math.max(108, Math.min(170, Math.round(sourceLength * 0.95)));
  return Math.max(104, Math.min(160, Math.round(sourceLength * 0.95)));
}

function projectionMicroChop({ t, amplitude, seed, index, steps, horizonKey }) {
  const density = horizonKey === "next24h" ? 34.5 : horizonKey === "next1mo" ? 42.5 : 38.5;
  const fade = 0.94 - t * 0.18;
  const alternating = Math.sin((index / Math.max(1, steps - 1)) * Math.PI * density + seed * 1.9) * amplitude * 0.16 * fade;
  const fine = Math.sin(t * Math.PI * (density * 1.7) + seed * 2.7) * amplitude * 0.09 * fade;
  const needle = Math.sin(t * Math.PI * (density * 2.55) + seed * 0.41) * amplitude * 0.035 * fade;
  return alternating + fine + needle;
}

function recentReturnTexture(prices = [], steps = 100, seed = 0) {
  const series = normalizePriceSeries(prices);
  if (series.length < 4 || steps < 2) return Array.from({ length: steps }, () => 0);
  const returns = [];
  for (let index = 1; index < series.length; index += 1) {
    if (series[index - 1]) returns.push((series[index] - series[index - 1]) / series[index - 1]);
  }
  if (!returns.length) return Array.from({ length: steps }, () => 0);
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const centered = returns.map((value) => clamp((value - mean) * 48, -1.15, 1.15));
  const recent = centered.slice(-Math.min(48, centered.length));
  const offset = Math.floor((Math.abs(Math.sin(seed)) * 1000) % Math.max(1, recent.length));
  return Array.from({ length: steps }, (_, index) => {
    const raw = recent[(index + offset) % recent.length] || 0;
    const previous = recent[(index + offset - 1 + recent.length) % recent.length] || 0;
    return raw * 0.72 + previous * 0.28;
  });
}

function projectionRecentShapeEcho(prices = [], steps = 100, start = 0, amplitude = 0, horizonKey = "next7d") {
  const series = normalizePriceSeries(prices);
  if (series.length < 8 || steps < 2 || !start) return Array.from({ length: steps }, () => 0);
  const sourceCount = Math.min(series.length, horizonKey === "next24h" ? 42 : horizonKey === "next7d" ? 56 : 72);
  const recent = samplePriceSeries(series.slice(-sourceCount), Math.min(steps, sourceCount));
  if (recent.length < 4) return Array.from({ length: steps }, () => 0);
  const first = recent[0];
  const last = recent.at(-1);
  const net = last - first;
  const echoScale = horizonKey === "next24h" ? 0.52 : horizonKey === "next7d" ? 0.34 : 0.2;
  const sampled = samplePriceSeries(recent, steps);
  return Array.from({ length: steps }, (_, index) => {
    const t = index / (steps - 1 || 1);
    const sourceIndex = Math.min(sampled.length - 1, Math.round(t * (sampled.length - 1)));
    const baseline = first + net * t;
    const deviation = (sampled[sourceIndex] || baseline) - baseline;
    const fade = 0.9 - t * 0.38;
    return clamp(deviation * echoScale * fade, -amplitude * 1.1, amplitude * 1.1);
  });
}

function projectionChartFingerprint(prices = [], stats = null, horizonKey = "next7d") {
  const series = normalizePriceSeries(prices);
  if (series.length < 2) return "flat";
  const sample = samplePriceSeries(series, horizonKey === "next24h" ? 18 : 24);
  const first = sample[0] || 1;
  const encoded = sample.map((price) => Math.round(((price - first) / first) * 1000)).join(".");
  const recent = Math.round((finiteOrNull(stats?.recentReturn) || 0) * 10);
  const range = Math.round((finiteOrNull(stats?.recentRange) || 0) * 1000);
  const pullback = Math.round((finiteOrNull(stats?.pullbackFromHigh) || 0) * 1000);
  return `${recent}:${range}:${pullback}:${encoded}`;
}

function lifetimeProjectionBias(favorite = {}, key = "next7d") {
  const contextScore = finiteOrNull(allTimeContextScore(favorite)) || 0;
  const drawdown = allTimeDrawdownPercent(favorite);
  const change30d = finiteOrNull(favorite.change30d ?? favorite.price_change_percentage_30d_in_currency);
  const change7d = finiteOrNull(favorite.change7d ?? favorite.price_change_percentage_7d_in_currency);
  const change24h = finiteOrNull(favorite.change24h ?? favorite.price_change_percentage_24h_in_currency ?? favorite.price_change_percentage_24h);
  const scale = key === "next1mo" ? 1.05 : key === "next7d" ? 0.55 : 0.18;
  let bias = contextScore * scale;
  if (Number.isFinite(change30d)) bias += clamp(change30d, -70, 90) * (key === "next1mo" ? 0.045 : 0.018);
  if (Number.isFinite(change7d)) bias += clamp(change7d, -35, 45) * (key === "next1mo" ? 0.018 : 0.035);
  if (Number.isFinite(change24h)) bias += clamp(change24h, -18, 18) * (key === "next24h" ? 0.055 : 0.012);
  if (Number.isFinite(drawdown) && drawdown <= -85 && !(Number.isFinite(change30d) && change30d > 15)) {
    bias -= key === "next1mo" ? 2.4 : key === "next7d" ? 1.1 : 0.35;
  }
  return roundTo(clamp(bias, key === "next1mo" ? -7 : -3.5, key === "next1mo" ? 5.5 : 3.5), 2);
}

function projectionMacroBend({ t, start, projectedChange, lifetimeBias, horizonKey }) {
  const macroWeight = horizonKey === "next1mo" ? 0.42 : horizonKey === "next7d" ? 0.28 : 0.12;
  const bias = clamp((lifetimeBias || 0) / 12, -0.7, 0.7);
  const direction = clamp((projectedChange || 0) / 24, -0.8, 0.8);
  const pressure = bias * 0.65 + direction * 0.35;
  const curve = Math.sin(Math.PI * clamp(t, 0, 1)) * (0.35 + t * 0.55);
  return start * pressure * macroWeight * curve * 0.08;
}

function shapeProjectionOpening(projection = [], start = 0, projectedChange = 0, amplitude = 0, setup = {}) {
  if (!projection.length || !start) return;
  const openingCount = Math.min(Math.max(4, Math.round(projection.length * 0.22)), projection.length - 1);
  if (openingCount <= 1) return;
  const constructive = projectedChange >= 0 && !(setup?.extended && setup?.fading);
  const bearish = projectedChange < 0 || (setup?.extended && setup?.fading);
  for (let index = 1; index <= openingCount; index += 1) {
    const t = index / openingCount;
    const softRamp = t * t * (3 - 2 * t);
    if (constructive) {
      const floor = start - amplitude * (0.16 + 0.18 * t);
      const preferred = start + amplitude * 0.18 * softRamp;
      projection[index] = Math.max(projection[index], Math.min(preferred, floor + amplitude * 0.55));
      projection[index] = Math.max(projection[index], floor);
    } else if (bearish) {
      const ceiling = start + amplitude * (0.18 + 0.14 * t);
      projection[index] = Math.min(projection[index], ceiling);
    }
  }
}

function projectionVolatilityScale(key = "next7d") {
  if (key === "next24h") return 2.75;
  if (key === "next1mo") return 1.85;
  return 2.25;
}

function priceReturnVolatility(prices = []) {
  const series = normalizePriceSeries(prices);
  const returns = [];
  for (let index = 1; index < series.length; index += 1) {
    if (series[index - 1]) returns.push((series[index] - series[index - 1]) / series[index - 1]);
  }
  if (returns.length < 2) return 0.018;
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const variance = returns.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / returns.length;
  return Math.sqrt(variance);
}

function priceRangeVolatility(prices = []) {
  const series = normalizePriceSeries(prices);
  if (series.length < 2) return 0.03;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const last = series.at(-1) || series[0] || 1;
  if (!last) return 0.03;
  return clamp((max - min) / last, 0, 0.6);
}

function projectionSetupBend({ t, amplitude, setup, bullishBias, score }) {
  const early = Math.sin(Math.PI * clamp(t, 0, 1));
  if (setup?.baseForming || setup?.boughtPullback) {
    const dipDirection = bullishBias ? -0.24 : -0.95;
    const dip = amplitude * dipDirection * Math.exp(-Math.pow((t - 0.18) / 0.15, 2));
    const lift = amplitude * (score >= 58 ? 1.1 : 0.58) * Math.exp(-Math.pow((t - 0.68) / 0.22, 2));
    return dip + lift;
  }
  if (setup?.extended && setup?.fading) {
    const relief = amplitude * 0.72 * Math.exp(-Math.pow((t - 0.22) / 0.17, 2));
    const fade = -amplitude * 1.12 * Math.exp(-Math.pow((t - 0.72) / 0.24, 2));
    return relief + fade;
  }
  return bullishBias ? -amplitude * 0.38 * early * (1 - t) : amplitude * 0.4 * early * (1 - t);
}

function projectionEarlyBias({ t, amplitude, projectedChange, score, setup, recentSlope }) {
  const early = clamp(1 - t / 0.28, 0, 1);
  if (!early) return 0;
  const direction = projectedChange >= 0 ? 1 : -1;
  const scoreDirection = (score || 50) >= 52 ? 1 : (score || 50) <= 48 ? -1 : direction;
  const slopeDirection = recentSlope >= 0.002 ? 1 : recentSlope <= -0.002 ? -1 : 0;
  const setupDirection = setup?.extended && setup?.fading ? -1
    : setup?.constructive || setup?.baseForming || setup?.boughtPullback ? 1
      : 0;
  const blendedDirection = clamp(direction * 0.52 + scoreDirection * 0.2 + slopeDirection * 0.13 + setupDirection * 0.15, -1, 1);
  const strength = projectedChange >= 0 ? 0.62 : 0.5;
  return amplitude * blendedDirection * strength * early;
}

function projectionBreakoutBend({ t, amplitude, projectedChange, score, setup }) {
  const conviction = clamp((Math.abs(projectedChange || 0) / 18) + Math.abs((score || 50) - 50) / 80, 0, 1.1);
  if (conviction < 0.22) return 0;
  const direction = projectedChange >= 0 ? 1 : -1;
  const pulse = Math.exp(-Math.pow((t - 0.78) / 0.16, 2));
  const setupMultiplier = setup?.constructive || setup?.baseForming || setup?.boughtPullback ? 1.15 : setup?.fading ? 0.78 : 1;
  return direction * amplitude * conviction * setupMultiplier * pulse;
}

function projectionSeed(ticker = "") {
  const text = String(ticker || "scenario");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 997;
  }
  return (hash / 997) * Math.PI * 2;
}

function projectionActualPointLimit(key = "next7d") {
  if (key === "next1mo") return 180;
  if (key === "next7d") return 168;
  if (key === "next24h") return 96;
  return 120;
}

function alignProjectionForDisplay(projectedPrices = [], actualPrices = [], scenario = {}) {
  const projected = normalizePriceSeries(projectedPrices);
  const actual = normalizePriceSeries(actualPrices);
  const anchor = finiteOrNull(actual.at(-1));
  const firstProjected = finiteOrNull(projected[0]);
  if (projected.length < 2 || !anchor || !firstProjected) return projected;

  const ratio = anchor / firstProjected;
  let aligned = projected.map((price) => Math.max(0.0000001, price * ratio));
  aligned[0] = anchor;

  const displayMove = projectionDisplayMoveLimit(scenario);
  aligned = aligned.map((price, index) => {
    const t = index / Math.max(1, aligned.length - 1);
    const softLimit = displayMove * (0.42 + t * 0.58);
    return clamp(price, anchor * (1 - softLimit), anchor * (1 + softLimit));
  });

  aligned = limitProjectionStepMoves(aligned, scenario);
  aligned = smoothDisplayProjection(aligned);
  aligned = limitProjectionStepMoves(aligned, scenario);
  aligned[0] = anchor;
  return aligned;
}

function projectionDisplayMoveLimit(scenario = {}) {
  const key = scenario.key || "next7d";
  const projectedChange = Math.abs(finiteOrNull(scenario.projectedChange) || 0) / 100;
  const confidenceScore = finiteOrNull(scenario.confidenceScore) ?? 52;
  const horizonBase = key === "next1mo" ? 0.9 : key === "next24h" ? 0.24 : 0.52;
  const confidenceRoom = confidenceScore >= 70 ? 0.18 : confidenceScore >= 50 ? 0.1 : 0.04;
  return clamp(Math.max(horizonBase, projectedChange * 1.65 + confidenceRoom), 0.18, key === "next1mo" ? 1.15 : key === "next24h" ? 0.38 : 0.7);
}

function smoothDisplayProjection(prices = []) {
  const series = normalizePriceSeries(prices);
  if (series.length < 5) return series;
  const smoothed = series.map((price, index) => {
    if (index === 0 || index === series.length - 1) return price;
    const previous = series[index - 1] ?? price;
    const next = series[index + 1] ?? price;
    return previous * 0.24 + price * 0.52 + next * 0.24;
  });
  smoothed[0] = series[0];
  smoothed[smoothed.length - 1] = series.at(-1);
  return smoothed;
}

function limitProjectionStepMoves(prices = [], scenario = {}) {
  const series = normalizePriceSeries(prices);
  if (series.length < 3) return series;
  const maxStep = projectionDisplayStepLimit(scenario, series.length);
  const limited = [series[0]];
  for (let index = 1; index < series.length; index += 1) {
    const previous = limited[index - 1];
    const target = series[index];
    const floor = previous * (1 - maxStep);
    const ceiling = previous * (1 + maxStep);
    limited.push(clamp(target, floor, ceiling));
  }
  const lastTarget = series.at(-1);
  for (let index = limited.length - 2; index >= 0; index -= 1) {
    const next = limited[index + 1];
    const floor = next * (1 - maxStep);
    const ceiling = next * (1 + maxStep);
    limited[index] = clamp(limited[index], floor, ceiling);
  }
  limited[0] = series[0];
  limited[limited.length - 1] = lastTarget;
  return limited;
}

function projectionDisplayStepLimit(scenario = {}, length = 100) {
  const key = scenario.key || "next7d";
  const confidenceScore = finiteOrNull(scenario.confidenceScore) ?? 52;
  const base = key === "next24h" ? 0.026 : key === "next1mo" ? 0.042 : 0.032;
  const confidenceRoom = confidenceScore >= 70 ? 0.012 : confidenceScore >= 50 ? 0.006 : 0;
  const densityAdjustment = clamp(110 / Math.max(32, length), 0.8, 1.35);
  return clamp((base + confidenceRoom) * densityAdjustment, 0.018, key === "next1mo" ? 0.065 : 0.048);
}

function samplePriceSeries(prices = [], limit = 120) {
  const series = normalizePriceSeries(prices);
  const maxPoints = Math.max(2, Math.round(finiteOrNull(limit) || 120));
  if (series.length <= maxPoints) return series;
  const sampled = [];
  let lastIndex = -1;
  for (let index = 0; index < maxPoints; index += 1) {
    const sourceIndex = Math.round((index / (maxPoints - 1)) * (series.length - 1));
    if (sourceIndex !== lastIndex) {
      sampled.push(series[sourceIndex]);
      lastIndex = sourceIndex;
    }
  }
  return sampled;
}

function makeProjectedPulseChart(scenario = {}) {
  const actual = samplePriceSeries(scenario.sourcePrices, projectionActualPointLimit(scenario.key));
  const projected = alignProjectionForDisplay(scenario.projectedPrices, actual, scenario);
  const width = 420;
  const height = 176;
  const padX = 24;
  const padTop = 16;
  const padBottom = 28;
  const nowX = width * 0.58;
  const futureEnd = width - padX;
  const actualEnd = nowX;
  const allPrices = [...actual, ...projected];
  if (actual.length < 2 || projected.length < 2) return makeSparkline(actual, priceSeriesChange(actual), `${scenario.label || "Next"} scenario`);
  const min = Math.min(...allPrices);
  const max = Math.max(...allPrices);
  const rawSpan = max - min || 1;
  const chartMin = min - rawSpan * 0.14;
  const chartMax = max + rawSpan * 0.16;
  const span = chartMax - chartMin || 1;
  const chartHeight = height - padTop - padBottom;
  const yFor = (price) => chartMax === chartMin ? height / 2 : height - padBottom - ((price - chartMin) / span) * chartHeight;
  const actualPoints = actual.map((price, index) => {
    const x = padX + (index / (actual.length - 1)) * (actualEnd - padX);
    return [x, yFor(price)];
  });
  const projectedPoints = projected.map((price, index) => {
    const x = nowX + (index / (projected.length - 1)) * (futureEnd - nowX);
    return [x, yFor(price)];
  });
  const actualLine = actualPoints.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const projectedLine = projectedPoints.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const actualArea = `${actualLine} L ${actualEnd.toFixed(1)} ${height - padBottom} L ${padX} ${height - padBottom} Z`;
  const actualChange = priceSeriesChange(actual) || 0;
  const color = actualChange >= 0 ? "#1f8a5f" : "#c8503e";
  const projectedColor = scenario.projectedChange >= 0 ? "#667085" : "#7b8798";
  const gridLines = [0.25, 0.5, 0.75].map((ratio) => {
    const y = padTop + ratio * chartHeight;
    return `<line x1="${padX}" y1="${y.toFixed(1)}" x2="${futureEnd}" y2="${y.toFixed(1)}" stroke="#d8e1ee" stroke-width="1" stroke-dasharray="3 5"></line>`;
  }).join("");
  const terminalX = projectedPoints.at(-1)[0];
  const terminalY = projectedPoints.at(-1)[1];
  const forecastText = scenario.label || "Next 7d";
  return `
    <div class="pulse-forecast-panel graph-only">
      <svg class="pulse-sparkline-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeAttribute(forecastText)} machine scenario chart">
        <rect x="${nowX.toFixed(1)}" y="${padTop}" width="${(futureEnd - nowX).toFixed(1)}" height="${chartHeight}" fill="#f1f5f9" opacity="0.78"></rect>
        ${gridLines}
        <path d="${actualArea}" fill="${color}" opacity="0.11"></path>
        <path d="${actualLine}" fill="none" stroke="${color}" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="${projectedLine}" fill="none" stroke="${projectedColor}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path>
        <path class="pulse-line-trace" d="${actualLine}" fill="none" stroke="${color}" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round" pathLength="100"></path>
        <path class="pulse-line-trace pulse-line-trace-projected" d="${projectedLine}" fill="none" stroke="${projectedColor}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" pathLength="100"></path>
        <line x1="${nowX.toFixed(1)}" y1="${padTop}" x2="${nowX.toFixed(1)}" y2="${height - padBottom}" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="4 6"></line>
        <circle cx="${actualPoints.at(-1)[0].toFixed(1)}" cy="${actualPoints.at(-1)[1].toFixed(1)}" r="4.1" fill="#fff" stroke="${color}" stroke-width="2.35"></circle>
        <circle cx="${terminalX.toFixed(1)}" cy="${terminalY.toFixed(1)}" r="4.2" fill="#fff" stroke="${projectedColor}" stroke-width="2.1"></circle>
      </svg>
    </div>
  `;
}

function makeProjectedSevenDayChart(scenario = {}) {
  return makeProjectedPulseChart({
    ...scenario,
    label: scenario.label || "Next 7d",
    sourceLabel: scenario.sourceLabel || "Last 7d",
    terminalPrice: scenario.terminalPrice || scenario.sevenDayPrice,
    readWindow: scenario.readWindow || "7d",
  });
}

function forecastCardMarkup(label, price, change) {
  const numeric = finiteOrNull(change) || 0;
  const tone = numeric >= 0 ? "positive" : "negative";
  return `
    <div class="pulse-forecast-card ${tone}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(formatUsdPrice(price))}</strong>
      <em>${escapeHtml(formatPercent(numeric))}</em>
    </div>
  `;
}

function makeSparkline(prices, change, windowLabel = "24h") {
  const series = normalizePriceSeries(prices);
  const width = 320;
  const height = 132;
  const pad = 14;
  if (series.length < 2) {
    const y = height / 2;
    const color = "#697386";
    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Market chart unavailable">
        <path d="M ${pad} ${y} L ${width - pad} ${y}" fill="none" stroke="${color}" stroke-width="2.1" stroke-dasharray="7 7"></path>
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
    <svg class="pulse-sparkline-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeAttribute(windowLabel)} sparkline">
      <path d="${area}" fill="${color}" opacity="0.12"></path>
      <path d="${line}" fill="none" stroke="${color}" stroke-width="2.2"></path>
      <path class="pulse-line-trace" d="${line}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="100"></path>
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
  if (/cached/i.test(source || "")) return `${source || "Cached estimate"} ${formatUsdPrice(price)} - verify live price`;
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
