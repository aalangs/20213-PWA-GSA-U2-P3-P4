self.addEventListener('install', () => {
    console.log("SW: Activado")
})

self.addEventListener('fetch', e => {
    /*const respOff = new Response(`
        Bienvenido a la página offline
        Para poder la app, necesitas conexión a internet
    `)*/

    /*const resOffHtml = new Response(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
                <link rel="stylesheet" href="css/page.css">
                <title>Mi PWA | Caches</title>
            </head>
            <body>
                <h1>Bienvenido a la página offline</h1>
            </body>
        </html>
    `, 
    { 
        headers: {
            'Content-Type': 'text/html'
        }
    })*/

    const resOffFile = fetch("pages/view-offline.html");

    //No funciona porque debe de ir a la red para obtener el archivo
    const resp = fetch(e.request)
        .catch(() => {
            console.log("SW: Error en la petición")
            return resOffFile;
        })
    

    e.respondWith(resp)
})