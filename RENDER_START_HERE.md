# Render Setup Checklist

Use this folder as the code for the Render service.

## Best Setup

1. Create a new GitHub repo, for example `bundle-builder-beta`.
2. Upload the contents of this folder to that repo.
3. In Render, click **New +**.
4. Choose **Blueprint** if Render detects `render.yaml`, or choose **Web Service** and connect the repo manually.
5. Use these settings if entering them manually:

```text
Runtime: Node
Build Command: npm install --omit=dev
Start Command: npm start
Health Check Path: /health
```

6. Add these environment variables:

```text
NODE_ENV=production
HOST=0.0.0.0
CORS_ORIGIN=https://bundle.vicicoin.io
BUNDLE_BUILDER_ALLOWED_NETWORKS=base
BUNDLE_BUILDER_MIN_LIQUIDITY_USD=250000
BUNDLE_BUILDER_MIN_VOLUME_24H_USD=100000
```

Do not set `PORT` unless Render specifically asks for it. Render usually provides it automatically.

## After Render Deploys

Render will give a temporary URL like:

```text
https://bundle-builder-beta.onrender.com
```

Check:

```text
https://YOUR-RENDER-URL/
https://YOUR-RENDER-URL/health
https://YOUR-RENDER-URL/api/v1/bundle?network=base&risk=moderate&focus=defi&coinCount=6&amountUsd=100
```

In `/health`, confirm:

```json
"version": "0.1.5",
"homepage": {
  "enabled": true,
  "indexExists": true
}
```

Then send Luke:

```text
The Render service is live here: https://YOUR-RENDER-URL

Can you please point bundle.vicicoin.io to this Render service?
Render should give you the DNS target/CNAME when I add the custom domain in Render.
```

## Expected Beta Behavior

- `/` opens Bundle Builder.
- `/health` returns service status and confirms the homepage file exists.
- `/api/v1/bundle` returns recommendation JSON.
- Only Base is enabled in beta.
- Non-Base networks return `NETWORK_NOT_SUPPORTED_IN_BETA`.
- If the official ViciSwap eligibility API is unavailable, production recommendations fail closed.
- Category signals can use live CoinGecko category market rows even when per-token CoinGecko category lookup falls back to the static token-category map.
