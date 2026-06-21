const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const apiRoot = path.resolve(__dirname, "..");

const requiredFiles = [
  path.join(apiRoot, "src", "recommendation-engine.js"),
  path.join(apiRoot, "src", "server.js"),
  path.join(apiRoot, "README.md"),
  path.join(apiRoot, "DEPLOYMENT.md"),
  path.join(apiRoot, ".env.example"),
  path.join(apiRoot, "Dockerfile"),
  path.join(apiRoot, "render.yaml"),
  path.join(apiRoot, "public", "index.html"),
  path.join(apiRoot, "public", "app.js"),
  path.join(apiRoot, "public", "styles.css"),
  path.join(apiRoot, "public", "assets", "bundle-builder-bg.png"),
  path.join(apiRoot, "public", "assets", "vici-logo.svg"),
  path.join(apiRoot, "test", "smoke-test.js"),
  path.join(apiRoot, "test", "server-fallback-test.js"),
];

requiredFiles.forEach((file) => assert(fs.existsSync(file), `Missing expected handoff file: ${file}`));

const packageJson = JSON.parse(fs.readFileSync(path.join(apiRoot, "package.json"), "utf8"));
assert(packageJson.scripts.check, "API package should expose npm run check");
assert(packageJson.scripts.test, "API package should expose npm test");
assert(packageJson.scripts.verify, "API package should expose npm run verify");

const deploymentReadme = fs.readFileSync(path.join(apiRoot, "DEPLOYMENT.md"), "utf8");
assert(deploymentReadme.includes("bundle.vicicoin.io"), "Deployment notes should include the preferred beta subdomain");
assert(deploymentReadme.includes("BUNDLE_BUILDER_ALLOWED_NETWORKS=base"), "Deployment notes should pin beta to Base by default");

const publicIndex = fs.readFileSync(path.join(apiRoot, "public", "index.html"), "utf8");
assert(publicIndex.includes("Bundle Builder beta"), "Public app should be included for one-service hosting");

const publicApp = fs.readFileSync(path.join(apiRoot, "public", "app.js"), "utf8");
assert(publicApp.includes("/api/v1/catalyst"), "Public app should call the API-first catalyst endpoint");

const serverSource = fs.readFileSync(path.join(apiRoot, "src", "server.js"), "utf8");
assert(serverSource.includes("/api/v1/catalyst"), "Server should expose the catalyst endpoint");
assert(serverSource.includes("/api/v1/coingecko-chart"), "Server should expose the chart cache endpoint");

const disallowedNestedArtifacts = [
  ...fs.readdirSync(apiRoot).filter((name) => name.endsWith(".zip")),
  ...fs.readdirSync(apiRoot).filter((name) => /^bundle-builder-render-deploy/.test(name)),
];
assert.equal(disallowedNestedArtifacts.length, 0, `Upload root should not include old zips or nested deploy folders: ${disallowedNestedArtifacts.join(", ")}`);

console.log("bundle-builder-api handoff verification ok");
