const VERSION = 'huo-pwa-v9';
const BASE_URL = new URL('./', self.registration.scope);
const APP_SHELL = [
  './', './index.html', './style.css', './script.js', './tailwind.config.js',
  './manifest.webmanifest', './icons/huo-mark.svg', './icons/icon-192.svg', './icons/icon-512.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './demo-qr.png'
].map(path => new URL(path, BASE_URL).href);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith('huo-pwa-') && key !== VERSION).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin !== BASE_URL.origin) {
    event.respondWith(caches.open(VERSION).then(async cache => {
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok || response.type === 'opaque') await cache.put(request, response.clone());
        return response;
      } catch {
        return cached || Response.error();
      }
    }));
    return;
  }

  if (!url.pathname.startsWith(BASE_URL.pathname)) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      event.waitUntil(caches.open(VERSION).then(cache => cache.put(new URL('./index.html', BASE_URL).href, copy)));
      return response;
    }).catch(() => caches.match(new URL('./index.html', BASE_URL.href))));
    return;
  }

  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(async response => {
    if (response.ok) await caches.open(VERSION).then(cache => cache.put(request, response.clone()));
    return response;
  })));
});
