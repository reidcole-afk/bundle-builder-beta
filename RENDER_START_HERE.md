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
Health Check Path: /healthz
```

4. Add the Supabase pooled Postgres URL as a secret environment variable:

```text
DATABASE_URL=postgresql://postgres.PROJECT_ID:YOUR_PASSWORD@aws-...pooler.supabase.com:6543/postgres
```

This is required for machine snapshots to survive deploys or overnight restarts on Render Free. Render disks are paid-only, so Supabase is the free durable memory path.

5. Confirm these environment variables:

```text
NODE_ENV=production
HOST=0.0.0.0
CORS_ORIGIN=https://bundlebuilder.vicicoin.io
BUNDLE_BUILDER_ALLOWED_NETWORKS=base
DATABASE_URL=your-supabase-pooled-postgres-url
VICI_COIN_DATA_API_BASE_URL=https://app.viciswap.io/api/coin_data
BUNDLE_BUILDER_MAX_DIFF_THOUSAND_USD=20
BUNDLE_BUILDER_LOW_MAX_DIFF_THOUSAND_USD=20
BUNDLE_BUILDER_MODERATE_MAX_DIFF_THOUSAND_USD=35
BUNDLE_BUILDER_HIGH_MAX_DIFF_THOUSAND_USD=60
BUNDLE_BUILDER_VERY_HIGH_MAX_DIFF_THOUSAND_USD=100
```

Do not set `PORT` unless Render specifically asks for it. Render usually provides it automatically.

## After Render Deploys

Check:

```text
https://bundlebuilder.vicicoin.io/
https://bundlebuilder.vicicoin.io/healthz
https://bundlebuilder.vicicoin.io/health
https://bundlebuilder.vicicoin.io/api/v1/bundle?network=base&risk=moderate&focus=defi&coinCount=6&amountUsd=100
```

In `/health`, confirm:

```json
  "version": "0.1.109",
"pulseSnapshotStorage": {
  "mode": "postgres",
  "durable": true
},
"homepage": {
  "enabled": true,
  "indexExists": true
}
```

## Expected Beta Behavior

- `/` opens Bundle Builder.
- The public page no longer includes a Chrome extension download.
- `/health` returns service status and confirms the homepage file exists.
- `/api/v1/bundle` returns recommendation JSON when both ViciSwap eligibility and ViciSwap simulated liquidity are reachable.
- Only Base is enabled in beta.
- Non-Base networks return `NETWORK_NOT_SUPPORTED_IN_BETA`.
- If the official ViciSwap eligibility API is unavailable, production recommendations fail closed.
- If the ViciSwap `coin_data` liquidity-depth API is unavailable, production recommendations fail closed.
- Low-risk recommendations exclude any token above Austin's conservative `$20` `diff_thousand` cutoff by default.
