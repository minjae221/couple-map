const CACHE = "cm-shell-v2";
const RUNTIME = "cm-runtime-v1";
const SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== RUNTIME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // 지도 타일·카카오 검색: 캐시하지 않음 (용량 폭증·stale 결과 방지)
  if (url.hostname.endsWith("openfreemap.org") || url.hostname.endsWith("openstreetmap.org") ||
      url.hostname.endsWith("kakao.com") || url.hostname.endsWith("daumcdn.net") ||
      url.hostname.endsWith("supabase.co")) return;

  if (url.origin === location.origin) {
    // 앱 셸: network-first — 배포하면 다음 접속에 바로 반영, 오프라인이면 캐시
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          const copy = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return r;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // leaflet/폰트 등: cache-first + 최초 1회 저장 → 오프라인에서도 동작
    e.respondWith(
      caches.match(e.request).then(
        (hit) =>
          hit ||
          fetch(e.request).then((r) => {
            if (r.ok || r.type === "opaque") {
              const copy = r.clone();
              caches.open(RUNTIME).then((c) => c.put(e.request, copy));
            }
            return r;
          })
      )
    );
  }
});
