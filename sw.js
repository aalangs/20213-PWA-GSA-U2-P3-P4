const CACHE_NAME = 'cache-v1';
const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

function cleanCache(cacheName, sizeItems){
    caches.open(cacheName)
        .then(cache => {
            cache.keys().then(k => {
                if (k.length >= sizeItems) {
                    cache.delete(k[0]).then(() => {
                        cleanCache(cacheName, sizeItems)
                    })
                }
            })
        })
}

self.addEventListener('install', (e) => {
    // Crear el cache y almacenar nuestro APPSHELL
    const promesaCache = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                '/20213-PWA-GSA-U2-P3-P4/',
                '/20213-PWA-GSA-U2-P3-P4/index.html',
                '/20213-PWA-GSA-U2-P3-P4/css/page.css',
                '/20213-PWA-GSA-U2-P3-P4/img/inicio.jpg',
                '/20213-PWA-GSA-U2-P3-P4/js/app.js'
            ])
        })

    const promesaInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cacheInmutable => {
            return cacheInmutable.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
            ])
        })
        
    e.waitUntil(Promise.all([promesaCache, promesaInmutable]));
})

self.addEventListener('fetch', (e) => {
    // 1. Only cache
    //e.respondWith(caches.match(e.request))

    // 2. Cache with network fallback
    // Primero va a buscar en cache y sino lo encuentra, va a la RED
    const responseCache = caches.match(e.request)
        .then(res => {
            // Si mi request existe en cache
            if (res) {
                //Respondemos con cacge
                return res;
            }
            console.log("No esta en cache", e.request.url);
            
            //Voy a la red
            return fetch(e.request)
                .then(resNetwork => {
                    // Abro mi cache dinamico (el que recupera en RED)
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            // Guardo la respuesta de la red en cache
                            cache.put(e.request, resNetwork).then(() => {
                                cleanCache(CACHE_DYNAMIC_NAME, 6)
                            })
                        });
                    //Respondo con el response de la RED
                    return resNetwork.clone();
                })
        })

    e.respondWith(responseCache)
})