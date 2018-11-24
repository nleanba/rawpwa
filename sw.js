var cacheName = 'hello-pwa';
var filesToCache = [
    './',
    './index.html',
    './ccc.html',
    './css/style.css',
    './js/cccalc.js',
    './js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
/*
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            try {
                return fetch(e.request)
            }catch (e)  {
                return response
            }
        })
    );
});*/

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    let options = {};
    e.respondWith(fetch(e.request, options)
        .then((response) => {
            const resClone = response.clone()
            return caches.open(cacheName)
                .then((cache) => {
                    cache.put(e.request.url, response)
                    return resClone
                })
        })
        .catch(() => caches.open(cacheName)
            .then(cache => cache.match(e.request.url)
                .then((response) => {
                    return response || fetch(OFFLINE_GIF)
                })
            )
        )
    );
});