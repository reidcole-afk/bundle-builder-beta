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

5. Add production auth secrets:

```text
BUNDLE_BUILDER_AUTH_SECRET=long-random-secret-used-to-hash-login-codes
BUNDLE_BUILDER_ADMIN_SECRET=long-random-secret-for-admin-api-access
BUNDLE_BUILDER_EMAIL_DELIVERY=provider
BUNDLE_BUILDER_EMAIL_PROVIDER=resend
RESEND_API_KEY=your-resend-api-key
BUNDLE_BUILDER_EMAIL_FROM=Bundle Builder <login@bundlebuilder.vicicoin.io>
```

Production refuses to start without `BUNDLE_BUILDER_AUTH_SECRET`, `BUNDLE_BUILDER_ADMIN_SECRET`, provider email delivery, and the email provider key. Admin-only endpoints accept the admin secret through the `x-bundle-builder-admin-secret` header or a bearer token.

6. Confirm these environment variables:

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

Optional Live Market Pulse analyst notes:

```text
OPENAI_API_KEY=your-openai-api-key
BUNDLE_BUILDER_PULSE_ANALYST_MODEL=gpt-4.1-mini
BUNDLE_BUILDER_PULSE_ANALYST_FALLBACK_MODEL=gpt-4.1-nano
BUNDLE_BUILDER_PULSE_ANALYST_CACHE_MS=600000
BUNDLE_BUILDER_PULSE_ANALYST_QUOTA_COOLDOWN_MS=1800000
```

The LLM is only used to explain the deterministic machine signals. It does not choose rankings or replace the scoring engine. If `OPENAI_API_KEY` is missing, Bundle Builder falls back to local rule-based explanations.

If OpenAI returns a quota or billing error, fix it in the OpenAI platform account by checking project billing, usage limits, and whether the key belongs to the intended project. If the key is scoped to a specific OpenAI organization or project, also set:

```text
OPENAI_ORGANIZATION=your-openai-org-id
OPENAI_PROJECT=your-openai-project-id
```

The `/health` endpoint reports `pulseAnalystOpenAiStatus` so Render logs can show whether LLM info is using OpenAI, cooling down after quota/rate limits, or falling back locally.

Recommended reliability settings for Render Free:

```text
BUNDLE_BUILDER_COINGECKO_PRELOAD_ENABLED=false
BUNDLE_BUILDER_PULSE_COLLECTOR_ENABLED=true
BUNDLE_BUILDER_PULSE_COLLECTOR_INTERVAL_MS=600000
BUNDLE_BUILDER_PULSE_COLLECTOR_STARTUP_DELAY_MS=150000
BUNDLE_BUILDER_PULSE_COLLECTOR_DECK_SIZE=8
BUNDLE_BUILDER_PULSE_COLLECTOR_MAX_RUN_MS=480000
BUNDLE_BUILDER_MARKET_HEALTH_CACHE_MS=120000
BUNDLE_BUILDER_RECOMMENDATION_TIMEOUT_MS=6500
```

This keeps snapshot collection on, but avoids the heavier background chart preload that can compete with health checks and live user requests.

## Supabase Security Step

After deploy, open Supabase SQL Editor and run:

```text
SUPABASE_RLS_FIX.sql
```

This locks down `pulse_snapshots`, `chart_cache`, `profiles`, `profiles_login_codes`, and `profiles_sessions` from Supabase anon/authenticated/public direct access. The Render server should still work through `DATABASE_URL`.

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
  "version": "0.1.154",
"pulseSnapshotStorage": {
  "mode": "postgres",
  "durable": true
},
"chartCacheStorage": {
  "mode": "postgres",
  "durable": true
},
"profileStorage": {
  "mode": "postgres",
  "durable": true
},
"productionReadiness": {
  "openAiConfigured": true,
  "coingeckoPreloadEnabled": false
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
