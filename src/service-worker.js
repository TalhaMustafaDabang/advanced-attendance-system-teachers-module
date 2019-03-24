let CACHE_STATIC = "sws-static-v1";
let CACHE_DYNAMIC = "sws-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      cache.addAll([

        "/",
        "index.html",
        "build/vendor.js",
        "build/main.css",
        "build/main.js",
        "build/polyfills.js"

      ]);
    })
  );
});

self.addEventListener("activate", event => {

  return self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then((response)=>{
        if(response){
          return response;
        }
        else{
          return fetch(event.request)
                    .then((res)=>{


                      if(
                        event.request.method=="GET"
                      && res.status==200
                      && event.request.url.slice(0,32)!="https://www.google-analytics.com"
                      && event.request.url.slice(0,32)!="https://firestore.googleapis.com")
                      {
                        return caches.open(CACHE_DYNAMIC)
                        .then((cache)=>
                        {

                            cache.put(event.request,res.clone())
                            return res;

                        })
                        .catch(e=>{})


                      }
                       else{
                         return res;
                       }

                    })
                    .catch((e)=>{})
        }
      })
  );
});