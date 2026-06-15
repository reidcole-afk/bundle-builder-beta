# Render Setup Checklist

Use this folder as the code for the Render service.

## Best Setup

1. Upload the contents of this folder to the GitHub repo root.
2. In Render, redeploy the existing service from the latest commit.
3. Keep these settings:

```text
Runtime: Node
Build Command: npm install --omit=dev
Start Command: npm start
Health Check Path: /health
```

4. Confirm these environment variables:

```text
NODE_ENV=production
HOST=0.0.0.0
CORS_ORIGIN=https://bundlebuilder.vicicoin.io
BUNDLE_BUILDER_ALLOWED_NETWORKS=base
BUNDLE_BUILDER_MIN_LIQUIDITY_USD=250000
BUNDLE_BUILDER_MIN_VOLUME_24H_USD=100000
```

Do not set `PORT` unless Render specifically asks for it. Render usually provides it automatically.

## After Render Deploys

Check:

```text
https://bundlebuilder.vicicoin.io/
https://bundlebuilder.vicicoin.io/health
https://bundlebuilder.vicicoin.io/api/v1/bundle?network=base&risk=moderate&focus=defi&coinCount=6&amountUsd=100
```

In `/health`, confirm:

```json
"version": "0.1.6",
"homepage": {
  "enabled": true,
  "indexExists": true
}
```

## Expected Beta Behavior

- `/` opens Bundle Builder.
- The public page no longer includes a Chrome extension download.
- `/health` returns service status and confirms the homepage file exists.
- `/api/v1/bundle` returns recommendation JSON.
- Only Base is enabled in beta.
- Non-Base networks return `NETWORK_NOT_SUPPORTED_IN_BETA`.
- If the official ViciSwap eligibility API is unavailable, production recommendations fail closed.
