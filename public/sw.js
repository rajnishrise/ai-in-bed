/* AI in Bed service worker: keeps visited pages and site assets so lessons open offline. */
const VERSION = "v1";
const PAGES = `aib-pages-${VERSION}`;
const ASSETS = `aib-assets-${VERSION}`;
const PRECACHE = ["/", "/offline"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("aib-") && k !== PAGES && k !== ASSETS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isAsset = (url) =>
  url.pathname.startsWith("/_next/static/") ||
  url.pathname.startsWith("/icons/") ||
  url.pathname === "/icon.svg" ||
  url.pathname === "/apple-icon";

async function cacheFirst(request) {
  const hit = await caches.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) (await caches.open(ASSETS)).put(request, res.clone());
  return res;
}

async function networkFirstPage(request) {
  try {
    const res = await fetch(request);
    if (res.ok) (await caches.open(PAGES)).put(request, res.clone());
    return res;
  } catch {
    const cache = await caches.open(PAGES);
    return (await cache.match(request, { ignoreSearch: true })) || (await cache.match("/offline"));
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isAsset(url)) event.respondWith(cacheFirst(request));
  else if (request.mode === "navigate") event.respondWith(networkFirstPage(request));
});

/** Saves a list of pages, plus the scripts, styles and fonts they use, for reading offline. */
async function savePages(urls, client) {
  const pages = await caches.open(PAGES);
  const assets = await caches.open(ASSETS);
  let done = 0;
  for (const u of urls) {
    try {
      const res = await fetch(u);
      if (res.ok) {
        const html = await res.clone().text();
        await pages.put(u, res);
        const refs = new Set(html.match(/\/_next\/static\/[^"'\s)\\]+/g) || []);
        for (const ref of refs) {
          if (!(await assets.match(ref))) {
            const a = await fetch(ref).catch(() => null);
            if (a && a.ok) await assets.put(ref, a);
          }
        }
      }
    } catch {
      /* skip pages that fail; the rest still save */
    }
    done++;
    client?.postMessage({ type: "aib-save-progress", done, total: urls.length });
  }
  client?.postMessage({ type: "aib-save-done", total: urls.length });
}

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "aib-save" && Array.isArray(data.urls)) {
    event.waitUntil(savePages(data.urls, event.source));
  }
});
