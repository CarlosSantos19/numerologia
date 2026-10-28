// Service worker: guarda la app en caché para que funcione sin conexión.
// Cambia la versión cuando modifiques archivos para forzar la actualización.
const CACHE = "numerologia-v7";
const FILES = [
  "./", "index.html", "styles.css", "sky.js", "numerology.js", "meanings.js", "famous.js", "app.js",
  "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Primero la red (así siempre se ve la última versión); sin conexión, la caché.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});
