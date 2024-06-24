// キャッシュファイルの指定
var CACHE_NAME = 'temperature-converter-v1';
var urlsToCache = [
    '/rie622skt.github.io/',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(async function() {
       try {
         if (event.request.url.startsWith('http')) {
           var res = await fetch(event.request);
           var cache = await caches.open(CACHE_NAME);
           cache.put(event.request.url, res.clone());
           return res;
         }
         return fetch(event.request);
       }
       catch (error) {
         console.log('Using cache');
         return caches.match(event.request);
       }
     }());
 });