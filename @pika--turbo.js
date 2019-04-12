const MANIFEST = {
  "/index.js": [
    "/web_modules/htm.js",
    "/web_modules/csz/index.js",
  ],
  "/routes/home/index.js": [
    '/components/tests.js',
    '/components/results.js',
  ],
  "/components/tests.js": [
    '/components/icons.js',
    '/components/editor.js',
  ],
};

const LOADED = new Set();
window.turbo = {};
window.turbo.preloadAll = function preloadAll() {
  for (const script of document.querySelectorAll('script')) {
    window.turbo.preload(script.src);
  }
}

window.turbo.preload = function preload(url) {
  const deps = MANIFEST[url];
  if (!deps || LOADED.has(url)) {
    return;
  }
  LOADED.add(url);
  for (const dep of [url, ...deps]) {
    const preloadLink = document.createElement("link");
    preloadLink.rel = "modulepreload";
    preloadLink.href = dep;
    document.head.appendChild(preloadLink);
  }
  for (const dep of deps) {
    preload(dep);
  }
}
