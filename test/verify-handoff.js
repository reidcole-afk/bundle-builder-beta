const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const apiRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(apiRoot, "..");
const extensionRoot = firstExistingPath([
  path.join(workspaceRoot, "vici-bundle-assistant-extension"),
  path.join(workspaceRoot, "chrome-extension"),
]);
const handoffRoot = firstExistingPath([
  path.join(workspaceRoot, "bundle-builder-beta-final-handoff"),
  workspaceRoot,
]);

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
  path.join(extensionRoot, "manifest.json"),
  path.join(extensionRoot, "manifest.production-template.json"),
  path.join(extensionRoot, "README.md"),
  path.join(handoffRoot, "README_FINAL_HANDOFF.md"),
];

requiredFiles.forEach((file) => assert(fs.existsSync(file), `Missing expected handoff file: ${file}`));

const packageJson = JSON.parse(fs.readFileSync(path.join(apiRoot, "package.json"), "utf8"));
assert(packageJson.scripts.check, "API package should expose npm run check");
assert(packageJson.scripts.test, "API package should expose npm test");
assert(packageJson.scripts.verify, "API package should expose npm run verify");

const productionManifestText = fs.readFileSync(path.join(extensionRoot, "manifest.production-template.json"), "utf8");
const localManifest = JSON.parse(fs.readFileSync(path.join(extensionRoot, "manifest.json"), "utf8"));
assert.equal(localManifest.manifest_version, 3, "Local extension manifest should be Manifest V3");
assert(localManifest.host_permissions.includes("file:///*"), "Local extension manifest should support local file testing");

const extensionReadme = fs.readFileSync(path.join(extensionRoot, "README.md"), "utf8");
assert(extensionReadme.includes("Allow access to file URLs"), "Extension README should explain Chrome's local file URL permission");

const deploymentReadme = fs.readFileSync(path.join(apiRoot, "DEPLOYMENT.md"), "utf8");
assert(deploymentReadme.includes("bundle.vicicoin.io"), "Deployment notes should include the preferred beta subdomain");
assert(deploymentReadme.includes("BUNDLE_BUILDER_ALLOWED_NETWORKS=base"), "Deployment notes should pin beta to Base by default");

const publicIndex = fs.readFileSync(path.join(apiRoot, "public", "index.html"), "utf8");
assert(publicIndex.includes("Bundle Builder beta"), "Public app should be included for one-service hosting");

const handoffReadme = fs.readFileSync(path.join(handoffRoot, "README_FINAL_HANDOFF.md"), "utf8");
assert(handoffReadme.includes("Final production domain required"), "Handoff README should call out final production domain requirement");
assert(handoffReadme.includes("strict eligibility"), "Handoff README should explain strict REST API eligibility behavior");

const hasDomainPlaceholder = productionManifestText.includes("FINAL-BUILDER-DOMAIN-HERE");
if (hasDomainPlaceholder && process.env.REQUIRE_FINAL_DOMAIN === "true") {
  throw new Error("Production manifest still contains FINAL-BUILDER-DOMAIN-HERE");
}

if (hasDomainPlaceholder) {
  console.warn("warning: production manifest is still a template and must be given the final domain before publication");
}

console.log("bundle-builder-api handoff verification ok");

function firstExistingPath(paths) {
  const found = paths.find((candidate) => fs.existsSync(candidate));
  assert(found, `None of these expected paths exist: ${paths.join(", ")}`);
  return found;
}
