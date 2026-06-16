const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const { recommendBundle, getSupportedTokens, normalizeNetwork, isNetworkAllowedForBeta, API_VERSION } = require("./recommendation-engine");

const PORT = Number(process.env.PORT || 8788);
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = path.resolve(process.env.PUBLIC_DIR || path.join(__dirname, "..", "public"));

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
      routes: ["GET /health", "GET /api/v1/tokens", "GET|POST /api/v1/bundle"],
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
