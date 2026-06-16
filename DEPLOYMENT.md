# Bundle Builder Beta Deployment

This package can run as one hosted Node service:

- `/` serves the Bundle Builder beta page.
- `/health` reports service health.
- `/api/v1/tokens?network=base` returns supported Base tokens when the ViciSwap eligibility API is available.
- `/api/v1/bundle` returns the JSON recommendation for ViciSwap integration.

## Recommended Path

Use a managed Node host such as Render, Railway, Fly.io, or DigitalOcean App Platform. This avoids manually maintaining Linux, nginx, SSL certificates, and process managers during beta.

## Required Settings

Use these settings on the host:

```text
Runtime: Node.js 18+
Build command: npm install --omit=dev
Start command: npm start
Health check path: /health
```

Environment variables:

```text
NODE_ENV=production
HOST=0.0.0.0
CORS_ORIGIN=https://bundle.vicicoin.io
BUNDLE_BUILDER_ALLOWED_NETWORKS=base
VICI_COIN_DATA_API_BASE_URL=https://app.viciswap.io/api/coin_data
BUNDLE_BUILDER_MAX_DIFF_THOUSAND_USD=20
BUNDLE_BUILDER_LOW_MAX_DIFF_THOUSAND_USD=20
BUNDLE_BUILDER_MODERATE_MAX_DIFF_THOUSAND_USD=35
BUNDLE_BUILDER_HIGH_MAX_DIFF_THOUSAND_USD=60
BUNDLE_BUILDER_VERY_HIGH_MAX_DIFF_THOUSAND_USD=100
```

The host usually provides `PORT` automatically. Set `PORT` only if the host asks for it.

## DNS Handoff

After the app is deployed, the hosting provider will give a temporary HTTPS URL, such as:

```text
https://bundle-builder-beta.example-host.com
```

Send that URL to Luke and ask him to point:

```text
bundle.vicicoin.io
```

or:

```text
bundlebuilder.vicicoin.io
```

to the hosted service.

If the managed host asks for a CNAME, Luke should create a CNAME record. If the host provides a fixed IP address, Luke should create an A record. The hosting provider should handle the HTTPS certificate after the custom domain is attached.

## Outbound Access Needed

The server must be able to reach:

- `https://office.viciswap.io/vs2/api/coins`
- `https://app.viciswap.io/api/coin_data`
- `https://api.dexscreener.com`
- `https://api.coingecko.com`

## Pre-Launch Checks

Run:

```bash
npm run verify
```

Then verify:

```text
https://YOUR-HOST/health
https://YOUR-HOST/api/v1/bundle?network=base&risk=moderate&focus=defi&coinCount=6&amountUsd=100
```

Expected beta behavior:

- Base requests work when the ViciSwap eligibility API is reachable.
- Non-Base requests return `NETWORK_NOT_SUPPORTED_IN_BETA`.
- If ViciSwap eligibility is unavailable, production recommendations fail closed instead of using fallback tokens.
- If ViciSwap simulated liquidity data is unavailable, production recommendations fail closed instead of using fallback liquidity.
- Low-risk bundles exclude any token above Austin's conservative `$20` `diff_thousand` cutoff by default.
