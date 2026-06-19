const http = require("node:http");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { URL } = require("node:url");
const { recommendBundle, getSupportedTokens, normalizeNetwork, isNetworkAllowedForBeta, API_VERSION } = require("./recommendation-engine");

const PORT = Number(process.env.PORT || 8788);
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = path.resolve(process.env.PUBLIC_DIR || path.join(__dirname, "..", "public"));
const SUBMISSION_STORE_LIMIT = Number(process.env.BUNDLE_BUILDER_SUBMISSION_LIMIT || 500);
const SUBMISSION_STORE_PATH = path.resolve(
  process.env.BUNDLE_BUILDER_SUBMISSION_FILE
    || path.join(process.env.BUNDLE_BUILDER_DATA_DIR || path.join(os.tmpdir(), "bundle-builder-beta"), "submitted-bundles.json"),
);

const server = createServer();

function createServer() {
  return http.createServer(handleRequest);
}

async function handleRequest(request, response) {
  try {
    setCorsHeaders(response);

    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, {
        ok: true,
        service: "bundle-builder-api",
        version: API_VERSION,
        strictEligibilityDefault: true,
        liquidityEndpointFailsClosed: true,
        tokensEndpointFailsClosed: true,
        friendlyPortErrors: true,
        homepage: {
          enabled: true,
          publicDirExists: fs.existsSync(PUBLIC_DIR),
          indexExists: fs.existsSync(path.join(PUBLIC_DIR, "index.html")),
        },
        betaScope: "invite-only Base beta by default",
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/tokens") {
      const network = normalizeNetwork(url.searchParams.get("network") || url.searchParams.get("chainid"));
      const allowNonBaseBetaNetworks = isTruthy(url.searchParams.get("allowNonBaseBetaNetworks"));
      if (!isNetworkAllowedForBeta(network, { allowNonBaseBetaNetworks })) {
        sendJson(response, 400, {
          ok: false,
          code: "NETWORK_NOT_SUPPORTED_IN_BETA",
          error: `${network.name} is not enabled for this invite-only beta. Base is the default supported network.`,
          network: network.name,
          chainId: network.chainId,
          tokens: [],
          howToProceed: "Use network=base for the initial beta, or ask engineering to explicitly enable additional networks.",
        });
        return;
      }
      const support = await getSupportedTokens(network);
      const allowFallbackEligibility = isTruthy(url.searchParams.get("allowFallbackEligibility"))
        || isTruthy(url.searchParams.get("demoFallback"))
        || url.searchParams.get("strictEligibility") === "false";
      if (support.source !== "vici-api" && !allowFallbackEligibility) {
        sendJson(response, 503, {
          ok: false,
          code: "ELIGIBILITY_SOURCE_UNAVAILABLE",
          error: "The official ViciSwap token eligibility API was unavailable, so Bundle Builder did not return fallback tokens.",
          network: support.network,
          chainId: support.chainId,
          source: "vici-api-unavailable",
          eligibilityUrl: support.url || null,
          eligibilityError: support.error || null,
          fallbackEligibilitySource: support.source,
          fallbackEligibilityUsed: false,
          tokenCount: 0,
          tokens: [],
          howToProceed: "Retry after the ViciSwap coins API is available. For local demos only, pass allowFallbackEligibility=true to permit the starter-list fallback.",
        });
        return;
      }
      sendJson(response, 200, {
        ok: true,
        network: support.network,
        chainId: support.chainId,
        source: support.source,
        fallbackEligibilityUsed: support.source !== "vici-api",
        tokenCount: support.tokenCount,
        tokens: support.tokens,
        warning: support.error || null,
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/market-proxy") {
      const target = url.searchParams.get("url") || "";
      if (!isAllowedMarketProxyUrl(target)) {
        sendJson(response, 400, {
          ok: false,
          error: "Unsupported market data URL",
        });
        return;
      }
      try {
        const payload = await fetchMarketProxyJson(target);
        sendJson(response, 200, payload);
      } catch (error) {
        sendJson(response, 502, {
          ok: false,
          error: `Market proxy unavailable: ${error.message || "upstream request failed"}`,
        });
      }
      return;
    }

    if (url.pathname === "/api/v1/submitted-bundles") {
      if (request.method === "GET") {
        const limit = clampInteger(url.searchParams.get("limit"), 1, SUBMISSION_STORE_LIMIT, 100);
        const records = readSubmittedBundles().slice(0, limit);
        sendJson(response, 200, {
          ok: true,
          count: records.length,
          storage: storageDescriptor(),
          bundles: records,
        });
        return;
      }

      if (request.method === "POST") {
        const body = await readJsonBody(request);
        const record = sanitizeSubmittedBundle(body);
        if (!record.coins.length) {
          sendJson(response, 400, {
            ok: false,
            error: "Submitted bundle must include at least one coin.",
          });
          return;
        }
        const records = readSubmittedBundles();
        const nextRecords = [record, ...records.filter((item) => item.id !== record.id)].slice(0, SUBMISSION_STORE_LIMIT);
        writeSubmittedBundles(nextRecords);
        sendJson(response, 201, {
          ok: true,
          storage: storageDescriptor(),
          bundle: record,
        });
        return;
      }

      sendJson(response, 405, { ok: false, error: "Method not allowed" });
      return;
    }

    if (url.pathname === "/api/v1/bundle" || url.pathname === "/api/v1/recommendations") {
      if (!["GET", "POST"].includes(request.method)) {
        sendJson(response, 405, { ok: false, error: "Method not allowed" });
        return;
      }

      const params = request.method === "POST"
        ? await readJsonBody(request)
        : Object.fromEntries(url.searchParams.entries());

      const result = await recommendBundle(params);
      sendJson(response, statusForBundleResult(result), result);
      return;
    }

    if (["GET", "HEAD"].includes(request.method) && serveStaticAsset(url.pathname, request.method, response)) {
      return;
    }

    sendJson(response, 404, {
      ok: false,
      error: "Not found",
      routes: ["GET /health", "GET /api/v1/tokens", "GET|POST /api/v1/bundle", "GET|POST /api/v1/submitted-bundles"],
    });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error.message || "Unexpected API error",
    });
  }
}

function startServer(serverInstance = server) {
  serverInstance.on("error", handleServerError);
  serverInstance.listen(PORT, HOST, () => {
    console.log(`Bundle Builder API listening on http://${HOST}:${PORT}`);
  });
}

function handleServerError(error) {
  if (error.code === "EADDRINUSE") {
    console.error(`Bundle Builder API could not start because ${HOST}:${PORT} is already in use.`);
    console.error("Stop the existing server, choose a different PORT, or run: PORT=8790 npm start");
    process.exitCode = 1;
    return;
  }
  if (error.code === "EACCES" || error.code === "EPERM") {
    console.error(`Bundle Builder API could not start on ${HOST}:${PORT} because this process does not have permission to bind that address.`);
    console.error("Try a different PORT or HOST, for example: HOST=127.0.0.1 PORT=8790 npm start");
    process.exitCode = 1;
    return;
  }
  throw error;
}

if (require.main === module) {
  startServer(server);
}

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.setHeader("Access-Control-Max-Age", "86400");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
}

function readSubmittedBundles() {
  try {
    const parsed = JSON.parse(fs.readFileSync(SUBMISSION_STORE_PATH, "utf8"));
    return Array.isArray(parsed) ? parsed.map(sanitizeStoredBundle).filter(Boolean) : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function writeSubmittedBundles(records) {
  fs.mkdirSync(path.dirname(SUBMISSION_STORE_PATH), { recursive: true });
  fs.writeFileSync(SUBMISSION_STORE_PATH, JSON.stringify(records.map(sanitizeStoredBundle).filter(Boolean), null, 2));
}

function sanitizeSubmittedBundle(input = {}) {
  const now = new Date().toISOString();
  const id = makeSubmissionId(input.id || input.bundleNumber);
  const coins = Array.isArray(input.coins) ? input.coins.slice(0, 24).map(sanitizeSubmittedCoin).filter(Boolean) : [];
  const startValueUsd = finiteNumber(input.startValueUsd)
    || coins.reduce((sum, coin) => sum + (finiteNumber(coin.amountUsd) || 0), 0);
  return {
    id,
    bundleNumber: id,
    source: "bundle-builder-beta",
    submittedAt: now,
    bundleId: safeText(input.bundleId, 80),
    bundleName: safeText(input.bundleName, 120) || "Bundle Builder allocation",
    network: safeText(input.network, 30) || "Base",
    amountUsd: finiteNumber(input.amountUsd) || startValueUsd,
    startValueUsd,
    preferences: sanitizeObject(input.preferences, 12),
    fitScore: finiteNumber(input.fitScore),
    riskIndex: finiteNumber(input.riskIndex),
    thesis: safeText(input.thesis, 500),
    coins,
  };
}

function sanitizeStoredBundle(input = {}) {
  if (!input || typeof input !== "object") return null;
  const coins = Array.isArray(input.coins) ? input.coins.map(sanitizeSubmittedCoin).filter(Boolean) : [];
  if (!coins.length) return null;
  return {
    id: safeText(input.id || input.bundleNumber, 32) || makeSubmissionId(),
    bundleNumber: safeText(input.bundleNumber || input.id, 32) || makeSubmissionId(),
    source: safeText(input.source, 60) || "bundle-builder-beta",
    submittedAt: safeText(input.submittedAt, 40) || new Date().toISOString(),
    bundleId: safeText(input.bundleId, 80),
    bundleName: safeText(input.bundleName, 120) || "Bundle Builder allocation",
    network: safeText(input.network, 30) || "Base",
    amountUsd: finiteNumber(input.amountUsd) || null,
    startValueUsd: finiteNumber(input.startValueUsd) || coins.reduce((sum, coin) => sum + (finiteNumber(coin.amountUsd) || 0), 0),
    preferences: sanitizeObject(input.preferences, 12),
    fitScore: finiteNumber(input.fitScore),
    riskIndex: finiteNumber(input.riskIndex),
    thesis: safeText(input.thesis, 500),
    coins,
  };
}

function sanitizeSubmittedCoin(input = {}) {
  const ticker = safeText(input.ticker, 16).toUpperCase();
  if (!/^[A-Z0-9.]{2,16}$/.test(ticker)) return null;
  return {
    ticker,
    name: safeText(input.name, 120),
    network: safeText(input.network, 30) || "Base",
    allocationPercent: finiteNumber(input.allocationPercent) || finiteNumber(input.weight) || 0,
    amountUsd: finiteNumber(input.amountUsd) || finiteNumber(input.amount) || 0,
    quantity: finiteNumber(input.quantity),
    startPriceUsd: finiteNumber(input.startPriceUsd) || finiteNumber(input.priceUsd) || finiteNumber(input.price),
    priceSource: safeText(input.priceSource, 80),
    role: safeText(input.role, 140),
    safetyLabel: safeText(input.safetyLabel, 120),
  };
}

function makeSubmissionId(value) {
  const existing = safeText(value, 32).replace(/^#/, "");
  if (/^\d{8,20}$/.test(existing)) return existing;
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `${Date.now()}${random}`.slice(0, 17);
}

function storageDescriptor() {
  return {
    mode: process.env.BUNDLE_BUILDER_SUBMISSION_FILE || process.env.BUNDLE_BUILDER_DATA_DIR ? "configured-file" : "ephemeral-file",
    durable: Boolean(process.env.BUNDLE_BUILDER_SUBMISSION_FILE || process.env.BUNDLE_BUILDER_DATA_DIR),
    note: process.env.BUNDLE_BUILDER_SUBMISSION_FILE || process.env.BUNDLE_BUILDER_DATA_DIR
      ? "Submitted bundle snapshots are stored in the configured server file."
      : "Submitted bundle snapshots are stored on the server filesystem for beta testing and may reset on redeploys.",
  };
}

function sanitizeObject(input, maxKeys = 20) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(
    Object.entries(input)
      .slice(0, maxKeys)
      .map(([key, value]) => [safeText(key, 50), typeof value === "number" ? finiteNumber(value) : safeText(value, 120)])
      .filter(([key]) => key),
  );
}

function safeText(value, maxLength = 200) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function clampInteger(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

function serveStaticAsset(rawPathname, method, response) {
  const filePath = resolvePublicFilePath(rawPathname);
  if (!filePath) return false;

  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;
    response.writeHead(200, {
      "Content-Type": contentTypeForPath(filePath),
      "Content-Length": stat.size,
      "Cache-Control": cacheControlForPath(filePath),
    });
    if (method === "HEAD") {
      response.end();
      return true;
    }
    response.end(fs.readFileSync(filePath));
    return true;
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
    throw error;
  }
}

function resolvePublicFilePath(rawPathname) {
  let pathname = "/";
  try {
    pathname = decodeURIComponent(String(rawPathname || "/").split("?")[0]);
  } catch {
    return null;
  }
  if (pathname === "/") pathname = "/index.html";
  const normalized = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(PUBLIC_DIR, normalized);
  if (!filePath.startsWith(`${PUBLIC_DIR}${path.sep}`)) return null;
  return filePath;
}

function contentTypeForPath(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const types = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".zip": "application/zip",
  };
  return types[extension] || "application/octet-stream";
}

async function fetchMarketProxyJson(targetUrl) {
  if (typeof fetch !== "function") throw new Error("Node 18+ fetch is required");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(process.env.BUNDLE_BUILDER_MARKET_PROXY_TIMEOUT_MS || 9000));
  try {
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        accept: "application/json",
        "user-agent": "Vici-Bundle-Builder-Beta/0.1",
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function isAllowedMarketProxyUrl(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    if (parsed.protocol !== "https:") return false;
    if (parsed.origin === "https://api.coingecko.com") return parsed.pathname.startsWith("/api/v3/");
    if (parsed.origin === "https://api.dexscreener.com") {
      return parsed.pathname.startsWith("/latest/dex/")
        || parsed.pathname.startsWith("/token-pairs/v1/")
        || parsed.pathname.startsWith("/tokens/v1/");
    }
    if (parsed.origin === "https://office.viciswap.io") return parsed.pathname.startsWith("/vs2/api/coins");
    if (parsed.origin === "https://api.binance.com") return parsed.pathname.startsWith("/api/v3/");
    if (parsed.origin === "https://api.exchange.coinbase.com") return parsed.pathname.startsWith("/products/");
    if (parsed.origin === "https://min-api.cryptocompare.com") return parsed.pathname.startsWith("/data/");
    if (parsed.origin === "https://api.gdeltproject.org") return parsed.pathname.startsWith("/api/v2/doc/doc");
    return false;
  } catch {
    return false;
  }
}

function cacheControlForPath(filePath) {
  return path.basename(filePath) === "index.html"
    ? "no-store"
    : "public, max-age=3600";
}

function statusForBundleResult(result) {
  if (result?.ok !== false) return 200;
  if (result.code === "NETWORK_NOT_SUPPORTED_IN_BETA") return 400;
  if (result.code === "ELIGIBILITY_SOURCE_UNAVAILABLE") return 503;
  if (result.code === "LIQUIDITY_SOURCE_UNAVAILABLE") return 503;
  if (result.code === "INSUFFICIENT_LIQUIDITY_FOR_RISK") return 422;
  return 500;
}

function isTruthy(value) {
  return value === true || String(value || "").toLowerCase() === "true";
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });
    request.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    request.on("error", reject);
  });
}

module.exports = {
  createServer,
  handleRequest,
  handleServerError,
  serveStaticAsset,
  startServer,
  server,
};
