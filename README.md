# Bundle Builder REST API Prototype

This folder is the API-first version of Bundle Builder. It is meant for ViciSwap engineering to host on a server and call directly from the main ViciSwap bundle UI, including mobile wallet browsers.

The Chrome extension can stay useful for internal testing, but the production integration should use this REST API instead.

The service can also serve the beta web app from the same deployment:

```text
GET /
```

That means a managed host can run one Node service and expose both the browser page and the REST API on the same subdomain.

## What It Does

- Accepts user preferences such as network, risk, focus, preferred coins, excluded coins, coin count, and total dollar amount.
- Pulls same-network Receive-token eligibility from the official ViciSwap coins API:
  - Base: `chainid=8453`
  - Additional networks are implemented but disabled by default for the invite-only beta unless engineering changes `BUNDLE_BUILDER_ALLOWED_NETWORKS`.
  - Polygon: `chainid=137`
  - Arbitrum: `chainid=42161`
  - Optimism: `chainid=10`
- Uses ViciSwap's simulated liquidity-depth API as the primary risk gate. The check simulates a `$1,000` USDC -> token -> USDC round trip and reads `diff_thousand` as the expected dollar loss.
- Excludes any token that is not returned by the ViciSwap liquidity-depth list. Low risk defaults to Austin's conservative `$20` max round-trip loss cutoff.
- Uses DEX Screener best-effort market data for price, 24h change, volume, and general market context. DEX Screener is not the primary liquidity authority.
- Uses CoinGecko best-effort category intelligence to understand whether a token fits a hot/cooling sector, such as Meme, Smart Contract Platform, DeFi, AI, RWA, or L2.
- Builds the AI Market Scan from independent news evidence sources: CoinGecko News, LunarCrush, official project posts on X, official GitHub releases, and GDELT. Missing credentials or a failed source never block the other sources or the existing market-data pipeline.
- Returns a JSON recommendation with a same-network coin array, target percentages, estimated dollar amounts, estimated quantities, rationale, and risk notes.
- Fails closed by default if the official ViciSwap coins API or simulated liquidity-depth API is temporarily unavailable, so production recommendations are not built from stale fallback data.
- Supports `allowFallbackEligibility=true` and `allowFallbackLiquidity=true` only for local demos and engineering tests that intentionally need fallback behavior.

## Run Locally

```bash
cd bundle-builder-api
npm start
```

Default local URL:

```text
http://localhost:8788
```

Open the hosted page locally:

```text
http://localhost:8788/
```

## Endpoints

### Health

```http
GET /health
```

### Supported Tokens

```http
GET /api/v1/tokens?network=base
```

Network can be one of:

```text
base
```

Base chain ID also works:

```text
8453
```

The code can support Arbitrum, Polygon, and Optimism later, but the beta defaults to Base only. Engineering can expand this with `BUNDLE_BUILDER_ALLOWED_NETWORKS=base,arbitrum,polygon,optimism` or `BUNDLE_BUILDER_ALLOWED_NETWORKS=all`.

This endpoint also uses strict eligibility by default. If the official ViciSwap coins API is unavailable, it returns `503` with `ok:false` and an empty `tokens` array. For local demos only, add `allowFallbackEligibility=true` to return the starter-list fallback.

### Bundle Recommendation

```http
GET /api/v1/bundle?network=base&risk=moderate&focus=defi&coinCount=6&amountUsd=100
```

or:

```http
POST /api/v1/bundle
Content-Type: application/json

{
  "network": "base",
  "risk": "moderate",
  "focus": "defi",
  "coinCount": 6,
  "amountUsd": 100,
  "preferredCoins": ["MORPHO", "AERO"],
  "excludedCoins": ["TOSHI"],
  "timeframe": "24h"
}
```

### Catalyst And News Intelligence

```http
GET /api/v1/catalyst?network=base&ticker=AERO&name=Aerodrome%20Finance&coinGeckoId=aerodrome-finance
```

The endpoint requests configured sources in parallel, then matches every result to the requested coin by CoinGecko ID, ticker, name, contract address, or registered official account. It rejects weak identity matches, removes duplicate coverage, scores freshness and source credibility, and reports when independent sources corroborate the same catalyst.

Provider order is evidence quality, not a blocking waterfall:

1. CoinGecko News aggregates multiple crypto publications when `COINGECKO_NEWS_API_KEY` is configured.
2. Registered official X accounts and GitHub releases provide primary-source announcements.
3. LunarCrush adds social/news context when its key and endpoint template are configured.
4. GDELT remains the credential-free broad-news fallback.

The response includes article links, provider status, confidence, corroboration, and a tightly bounded news score. News is primarily used to explain the AI Market Scan and only lightly influences ranking. The local catalyst watchlist remains display context with a score of zero when no fresh article is confirmed; it is never presented as fetched news.

Optional deployment variables are documented in `.env.example`. `LUNARCRUSH_NEWS_URL_TEMPLATE` may contain `{ticker}`, `{name}`, and `{coinGeckoId}` placeholders so the deployment can use the LunarCrush news/search route included in its plan without hard-coding an unverified endpoint.

## Request Parameters

| Field | Type | Notes |
| --- | --- | --- |
| `network` | string | `base`, `arbitrum`, `polygon`, `optimism`, or matching chain ID. |
| `risk` | string | `low`, `moderate`, `high`, or `very_high`. Aliases like `conservative`, `aggressive`, and `degen` are accepted. |
| `focus` | string | `balanced`, `core`, `defi`, `rwa`, `l2`, `base`, `ai`, or `vici`. |
| `coinCount` | number | Clamped from 3 to 12. |
| `amountUsd` | number | Optional total bundle value for dollar/quantity estimates. |
| `preferredCoins` | array/string | Optional tickers to boost if supported on the selected network. |
| `excludedCoins` | array/string | Optional tickers to block. |
| `marketData` | boolean/string | Set to `false` to skip DEX Screener calls and return model-only results. |
| `categoryIntelligence` | boolean/string | Set to `false` to skip CoinGecko category calls. |
| `allowFallbackEligibility` | boolean/string | Defaults to `false`. Set to `true` only for local demos if the official ViciSwap coins API is unavailable. |
| `strictEligibility` | boolean/string | Defaults to `true`. Set to `false` only as an alias for demo fallback mode. |
| `timeframe` | string | `1h`, `24h`, `7d`, `30d`, or `90d`. The current category layer is strongest for 24h category market data and this field keeps the API contract ready for longer-horizon scoring. |

## How Coins Are Chosen

Bundle Builder uses a scored recommendation pipeline. It does not predict returns or guarantee performance.

1. **Eligibility gate:** The selected network is checked against the beta scope. The invite-only beta defaults to Base. Then the official ViciSwap coins API is used as the same-network Receive-token source. If that source is unavailable, production recommendations fail closed.
2. **User preference mapping:** `risk` maps to a target risk band, `focus` maps to a theme such as DeFi/Base/AI/core, `coinCount` controls diversification, and `preferredCoins`/`excludedCoins` boost or remove specific tickers.
3. **Liquidity gate:** The selected network is checked against ViciSwap's `coin_data` endpoint. Any coin not returned by that endpoint is excluded immediately. Remaining candidates must pass a risk-adjusted `diff_thousand` cutoff.
4. **Candidate enrichment:** Eligible ViciSwap tokens are enriched with local token metadata, DEX Screener token-level market context, and CoinGecko category context.
5. **Risk rules:** Low-risk bundles exclude speculative/community tokens unless the user explicitly asks for one. Every risk level still requires ViciSwap simulated liquidity depth.
6. **Scoring:** Each candidate receives a recommendation score from base quality, user focus match, preferred coin boost, risk-adjusted 1h/6h/24h trend confirmation, ViciSwap simulated liquidity depth, DEX Screener volume context, CoinGecko category strength, and relative strength versus its category.
7. **Model fit:** The system compares candidate bundles against strategy models with different risk indices and themes. It favors models that match the user's risk, focus, and the selected network's eligible token set.
8. **Allocation:** Seed weights come from the chosen model and preferred coins. Weights are adjusted modestly for market momentum and category strength, then normalized to 100%.
9. **Response:** The API returns the final same-network coin list, allocation percentage, estimated dollar/coin amount, rationale, market data, category signals, confidence, conviction, and the ViciSwap simulated liquidity check.

Default `diff_thousand` thresholds:

| Risk | Max simulated loss on $1k round trip |
| --- | ---: |
| `low` | `$20` |
| `moderate` | `$35` |
| `high` | `$60` |
| `very_high` | `$100` |

The simplified scoring formula is:

```text
candidate score =
  base token score
  + focus match
  + preferred coin boost
  + risk-adjusted 1h/6h/24h trend
  + volume score
  + liquidity score
  + category trend score
  + relative strength score
  + confidence boost
  - liquidity penalty
  - speculative risk penalty
```

Important limits: this is an educational beta tool, not financial advice, not a rug-pull detector, not a contract audit, and not a swap execution engine.

## Response Shape

```json
{
  "ok": true,
  "beta": true,
  "input": {
    "network": "Base",
    "chainId": 8453,
    "risk": "moderate",
    "focus": "defi",
    "coinCount": 6,
    "amountUsd": 100
  },
  "dataSources": {
    "eligibility": "vici-api",
    "marketData": "DEX Screener best-effort"
  },
  "bundle": {
    "id": "defi-ignition",
    "name": "DeFi Ignition",
    "fitScore": 91,
    "coins": [
      {
        "ticker": "MORPHO",
        "network": "Base",
        "chainId": 8453,
        "allocationPercent": 18.5,
        "amountUsd": 18.5,
        "estimatedQuantity": 9.73,
        "rationale": "Base-native lending beta...",
        "market": {
          "source": "DEX Screener",
          "change1h": 0.4,
          "change6h": 2.6,
          "change24h": 5.2,
          "volume24hUsd": 1200000,
          "liquidityUsd": 900000
        },
        "confidence": {
          "label": "High confidence",
          "score": 78,
          "reasons": ["ViciSwap simulated $1k round-trip loss is about $8", "solid 24h trading volume"],
          "watchouts": []
        },
        "conviction": {
          "label": "High conviction setup",
          "score": 74,
          "timeframe": "24h",
          "summary": "MORPHO has stronger confirmation from liquidity, volume, and shorter-term trend."
        },
        "liquidityCheck": {
          "status": "passed",
          "passed": true,
          "source": "ViciSwap simulated $1k round-trip",
          "diffThousandUsd": 8,
          "maxDiffThousandUsd": 35,
          "conservativeMaxDiffThousandUsd": 20
        },
        "categorySignals": {
          "source": "CoinGecko",
          "primaryCategory": "Decentralized Finance (DeFi)",
          "score": 73.4,
          "categoryChange24h": 4.8,
          "categoryVolume24hUsd": 1200000000,
          "relativeStrength24h": 2.1,
          "interpretation": "MORPHO is moving roughly in line with the Decentralized Finance (DeFi) category."
        }
      }
    ]
  },
  "coins": []
}
```

The top-level `coins` field duplicates `bundle.coins` so ViciSwap can integrate with a simple coin-array contract if preferred.

If the official ViciSwap coins API is unavailable, the default response is:

```json
{
  "ok": false,
  "code": "ELIGIBILITY_SOURCE_UNAVAILABLE",
  "error": "The official ViciSwap token eligibility API was unavailable, so Bundle Builder did not create a recommendation.",
  "bundle": null,
  "coins": []
}
```

This is intentional. It keeps the production REST API from recommending tokens from stale fallback data.

## Production Notes

- This API does not sign transactions, touch wallets, or execute swaps.
- This API is not a rug-pull detector or contract auditor.
- Invite-only beta scope should stay Base-first unless engineering deliberately expands `BUNDLE_BUILDER_ALLOWED_NETWORKS`.
- The ViciSwap simulated liquidity screen is a hard recommendation gate. ViciSwap must still verify live route depth, slippage, fees, and quote quality before execution.
- Keep strict eligibility and strict liquidity enabled in production. Do not use `allowFallbackEligibility=true` or `allowFallbackLiquidity=true` for live ViciSwap execution.
- If the configured port is already in use, the server now prints a short recovery message instead of a raw Node stack trace. Use `PORT=8790 npm start` or stop the existing server.
- ViciSwap should still verify token route, liquidity, slippage, fees, allowances, and final quote before execution.
- Add an API key or server-side allowlist before public launch if the endpoint is hosted publicly.
- If CoinGecko rate limits become a concern, set `COINGECKO_API_KEY` and optionally `COINGECKO_API_BASE_URL`/`COINGECKO_API_KEY_HEADER` in the server environment.
- If Rich provides a host, set `PORT`, `HOST`, and optionally `CORS_ORIGIN` in the server environment.
- Optional environment knobs: `BUNDLE_BUILDER_ALLOWED_NETWORKS`, `BUNDLE_BUILDER_MIN_LIQUIDITY_USD`, `BUNDLE_BUILDER_MIN_VOLUME_24H_USD`, `BUNDLE_BUILDER_MARKET_LOOKUP_LIMIT`, `BUNDLE_BUILDER_CATEGORY_LOOKUP_LIMIT`.

## Deployment

See `DEPLOYMENT.md` for managed-host setup. The intended beta shape is:

```text
https://bundle.vicicoin.io/
https://bundle.vicicoin.io/health
https://bundle.vicicoin.io/api/v1/bundle
```

Recommended hosting settings:

```text
Build command: npm install --omit=dev
Start command: npm start
Health check: /health
```

The included `render.yaml`, `Dockerfile`, and `.env.example` are there so Rich/Luke can choose either a managed Node deployment or a container deployment without reworking the app.

## Verification

Run this before handoff:

```bash
npm run verify
```

For a stricter production-domain check, run:

```bash
REQUIRE_FINAL_DOMAIN=true npm run verify
```

## Suggested Integration

ViciSwap main UI calls:

```http
POST https://YOUR-SERVER-HERE/api/v1/bundle
```

Then ViciSwap renders the returned `coins` array directly in its native bundle builder flow. This avoids Chrome extension listing friction and works in mobile wallet browsers.
