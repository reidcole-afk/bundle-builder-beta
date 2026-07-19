# Bundle Builder Beta Deployment

This package can run as one hosted Node service:

- `/` serves the Bundle Builder beta page.
- `/health` reports service health.
- `/api/v1/tokens?network=base` returns supported Base tokens when the ViciSwap eligibility API is available.
- `/api/v1/bundle` returns the JSON recommendation for ViciSwap integration.
- `/api/v1/auth/request-code`, `/api/v1/auth/verify-code`, and `/api/v1/profile` support the standalone Bundle Builder email profile prototype.

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

Durable snapshot storage:

```text
DATABASE_URL=your-supabase-pooled-postgres-url
```

Render Free does not support persistent disks. Use Supabase/Postgres for machine accuracy snapshots so collector data survives redeploys and overnight restarts.

Environment variables:

```text
NODE_ENV=production
HOST=0.0.0.0
CORS_ORIGIN=https://bundlebuilder.vicicoin.io
BUNDLE_BUILDER_ALLOWED_NETWORKS=base
VICI_COIN_DATA_API_BASE_URL=https://app.viciswap.io/api/coin_data
BUNDLE_BUILDER_MAX_DIFF_THOUSAND_USD=20
BUNDLE_BUILDER_LOW_MAX_DIFF_THOUSAND_USD=20
BUNDLE_BUILDER_MODERATE_MAX_DIFF_THOUSAND_USD=35
BUNDLE_BUILDER_HIGH_MAX_DIFF_THOUSAND_USD=60
BUNDLE_BUILDER_VERY_HIGH_MAX_DIFF_THOUSAND_USD=100
DATABASE_URL=your-supabase-pooled-postgres-url
BUNDLE_BUILDER_AUTH_SECRET=replace-with-a-long-random-secret
BUNDLE_BUILDER_ADMIN_SECRET=replace-with-a-different-long-random-secret
BUNDLE_BUILDER_EMAIL_DELIVERY=provider
BUNDLE_BUILDER_EMAIL_PROVIDER=resend
RESEND_API_KEY=your-resend-api-key
BUNDLE_BUILDER_EMAIL_FROM=Bundle Builder <login@bundlebuilder.vicicoin.io>
COINGECKO_API_KEY=your-coingecko-demo-key
COINGECKO_API_KEY_HEADER=x-cg-demo-api-key
BUNDLE_BUILDER_COINGECKO_PRELOAD_ENABLED=false
BUNDLE_BUILDER_PULSE_COLLECTOR_ENABLED=true
BUNDLE_BUILDER_PULSE_COLLECTOR_INTERVAL_MS=900000
BUNDLE_BUILDER_PULSE_COLLECTOR_STARTUP_DELAY_MS=150000
BUNDLE_BUILDER_PULSE_COLLECTOR_DECK_SIZE=8
BUNDLE_BUILDER_PULSE_COLLECTOR_STAGGER_MS=1800
BUNDLE_BUILDER_PULSE_COLLECTOR_DEX_CACHE_MS=1800000
BUNDLE_BUILDER_PULSE_COLLECTOR_DEX_STALE_MS=172800000
BUNDLE_BUILDER_PULSE_COLLECTOR_DEX_RATE_LIMIT_COOLDOWN_MS=600000
BUNDLE_BUILDER_PULSE_COLLECTOR_REFRESH_BATCH_SIZE=3
```

The host usually provides `PORT` automatically. Set `PORT` only if the host asks for it.

## Prototype Profile DB

Bundle Builder now includes a standalone prototype profile store in `src/profile-store.js`. It is intentionally separate from ViciSwap production data. Users can enter an email, request a 6-digit code, verify it, and sync:

- display name
- favorite coins
- favorite bundles and recent bundle history
- renamed bundles
- review alerts
- builder preferences

On Render, profile snapshots, login codes, and sessions use Supabase/Postgres when `DATABASE_URL` is configured. Local/dev runs without `DATABASE_URL` still use a temporary file fallback.

After `DATABASE_URL` is configured, run `SUPABASE_RLS_FIX.sql` in Supabase SQL Editor. It enables RLS and revokes anon/authenticated access for the server-owned `pulse_snapshots`, `chart_cache`, `profiles`, `profiles_login_codes`, and `profiles_sessions` tables.

For local/dev testing, `BUNDLE_BUILDER_EMAIL_DELIVERY=dev-response` returns the 6-digit login code in the API response and shows it in the app toast.

To send real email codes with Resend, set:

```text
BUNDLE_BUILDER_EMAIL_DELIVERY=provider
BUNDLE_BUILDER_EMAIL_PROVIDER=resend
RESEND_API_KEY=your-resend-api-key
BUNDLE_BUILDER_EMAIL_FROM=Bundle Builder <login@bundle.vicicoin.io>
```

Make sure the sender/domain is verified in Resend before switching the live app to provider mode.

## Database-Ready Storage Seam

The beta API routes submitted bundle snapshots through `src/bundle-store.js` and profile snapshots through `src/profile-store.js`. Profile storage uses Postgres in production and a JSON fallback in local/dev. The server routes call repositories instead of reading or writing storage directly.

Submitted bundle repository methods:

- `list({ limit })`
- `upsert(bundleSnapshot)`
- `descriptor()`

Profile repository methods:

- `requestLoginCode(email)`
- `verifyLoginCode(email, code)`
- `profileForToken(token)`
- `saveProfileSnapshot(token, snapshot)`
- `descriptor()`

When the DB/Python refactor starts, keep these repository method names and record shapes stable so `/api/v1/submitted-bundles` and `/api/v1/profile` do not need UI changes.

## DNS Handoff

After the app is deployed, the hosting provider will give a temporary HTTPS URL, such as:

```text
https://bundle-builder-beta.example-host.com
```

Send that URL to Luke and ask him to point:

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

To test the prototype email profile flow locally or on a staging deploy:

```text
POST /api/v1/auth/request-code
body: { "email": "you@example.com" }

POST /api/v1/auth/verify-code
body: { "email": "you@example.com", "code": "123456" }

GET /api/v1/profile
Authorization: Bearer YOUR_TOKEN
```

Expected beta behavior:

- Base requests work when the ViciSwap eligibility API is reachable.
- Non-Base requests return `NETWORK_NOT_SUPPORTED_IN_BETA`.
- If ViciSwap eligibility is unavailable, production recommendations fail closed instead of using fallback tokens.
- If ViciSwap simulated liquidity data is unavailable, production recommendations fail closed instead of using fallback liquidity.
- Low-risk bundles exclude any token above Austin's conservative `$20` `diff_thousand` cutoff by default.
