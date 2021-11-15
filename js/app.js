let url = window.location.href;
let swDirect = "/20213-PWA-GSA-U2-P3-P4/sw.js"

if (navigator.serviceWorker) {
    console.log("Service Worker disponible")
    if (url.includes("localhost")) {
        swDirect = "/sw.js"
    }
    navigator.serviceWorker.register(swDirect)
} else {
    console.log("Service Worker NO disponible")
}

/*if (window.caches) {
    console.log("Tenemos cache")

    caches.open('prueba')
    caches.open('prueba-v2')

    caches.has('prueba')
        .then((result) => {
            console.log(result)
        })

    caches.open('cache-v1')
        .then((cache) => {
            //cache.add('/index.html')
            cache.addAll([
                '/',
                '/index.html',
                '/css/page.css',
                '/img/inicio.jpg',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
            ])
            .then(() => {
                //cache.delete('/css/page.css')
                cache.put('index.html', new Response('Actualizado desde cache'))
            })
            cache.match('index.html')
                .then((res) => {
                    res.text().then((text) => { 
                        console.log(text) 
                    });
                })
        })

    // Arreglo donde estan almacenados nuestros caches
    caches.keys().then((k) => {
        console.log(k);
    })
}*/