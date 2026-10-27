/* Travel apps service worker: keeps every app on the phone and unlocks them with the key saved at sign-in. */
const VERSION = "20261027-794a55d3";
const FILES = ["a/editprox/icon-192.png", "a/editprox/icon-512.png", "a/editprox/index.html.enc", "a/editprox/manifest.webmanifest", "a/french/icon-192.png", "a/french/icon-512.png", "a/french/index.html.enc", "a/french/manifest.webmanifest", "a/gongdak/icon-192.png", "a/gongdak/icon-512.png", "a/gongdak/index.html.enc", "a/gongdak/jyut.json.enc", "a/gongdak/manifest.webmanifest", "a/list/icon-192.png", "a/list/icon-512.png", "a/list/index.html.enc", "a/list/manifest.webmanifest", "a/master/icon-192.png", "a/master/icon-512.png", "a/master/index.html.enc", "a/master/manifest.webmanifest", "a/summarizy/icon-192.png", "a/summarizy/icon-512.png", "a/summarizy/index.html.enc", "a/summarizy/manifest.webmanifest", "a/veganremix/icon-192.png", "a/veganremix/icon-512.png", "a/veganremix/index.html.enc", "a/veganremix/manifest.webmanifest", "a/wellnow/icon-192.png", "a/wellnow/icon-512.png", "a/wellnow/index.html.enc", "a/wellnow/manifest.webmanifest", "a/zen/diagrams/d1.jpg.enc", "a/zen/diagrams/d10.jpg.enc", "a/zen/diagrams/d11.jpg.enc", "a/zen/diagrams/d12.jpg.enc", "a/zen/diagrams/d13.jpg.enc", "a/zen/diagrams/d14.jpg.enc", "a/zen/diagrams/d15.jpg.enc", "a/zen/diagrams/d16.jpg.enc", "a/zen/diagrams/d17.jpg.enc", "a/zen/diagrams/d18.jpg.enc", "a/zen/diagrams/d19.jpg.enc", "a/zen/diagrams/d2.jpg.enc", "a/zen/diagrams/d20.jpg.enc", "a/zen/diagrams/d21.jpg.enc", "a/zen/diagrams/d22.jpg.enc", "a/zen/diagrams/d24.jpg.enc", "a/zen/diagrams/d25.jpg.enc", "a/zen/diagrams/d26.jpg.enc", "a/zen/diagrams/d27.jpg.enc", "a/zen/diagrams/d28.jpg.enc", "a/zen/diagrams/d29.jpg.enc", "a/zen/diagrams/d3.jpg.enc", "a/zen/diagrams/d30.jpg.enc", "a/zen/diagrams/d31.jpg.enc", "a/zen/diagrams/d32.jpg.enc", "a/zen/diagrams/d33.jpg.enc", "a/zen/diagrams/d34.jpg.enc", "a/zen/diagrams/d35.jpg.enc", "a/zen/diagrams/d36.jpg.enc", "a/zen/diagrams/d37.jpg.enc", "a/zen/diagrams/d38.jpg.enc", "a/zen/diagrams/d39.jpg.enc", "a/zen/diagrams/d4.jpg.enc", "a/zen/diagrams/d41.jpg.enc", "a/zen/diagrams/d42.jpg.enc", "a/zen/diagrams/d43.jpg.enc", "a/zen/diagrams/d44.jpg.enc", "a/zen/diagrams/d45.jpg.enc", "a/zen/diagrams/d46.jpg.enc", "a/zen/diagrams/d47.jpg.enc", "a/zen/diagrams/d5.jpg.enc", "a/zen/diagrams/d6.jpg.enc", "a/zen/diagrams/d7.jpg.enc", "a/zen/diagrams/d8.jpg.enc", "a/zen/diagrams/d9.jpg.enc", "a/zen/icon-192.png", "a/zen/icon-512.png", "a/zen/index.html.enc", "a/zen/manifest.webmanifest", "check.enc", "go/editprox/index.html", "go/editprox/manifest.webmanifest", "go/french/index.html", "go/french/manifest.webmanifest", "go/gongdak/index.html", "go/gongdak/manifest.webmanifest", "go/index.html", "go/list/index.html", "go/list/manifest.webmanifest", "go/master/index.html", "go/master/manifest.webmanifest", "go/summarizy/index.html", "go/summarizy/manifest.webmanifest", "go/veganremix/index.html", "go/veganremix/manifest.webmanifest", "go/wellnow/index.html", "go/wellnow/manifest.webmanifest", "go/zen/index.html", "go/zen/manifest.webmanifest", "hub/hub.webmanifest", "hub/index.html", "icons/hub-192.png", "icons/hub-512.png", "index.html"];          // relative paths published with this version
const LOCKED = new Set(["a/editprox/index.html", "a/french/index.html", "a/gongdak/index.html", "a/gongdak/jyut.json", "a/list/index.html", "a/master/index.html", "a/summarizy/index.html", "a/veganremix/index.html", "a/wellnow/index.html", "a/zen/diagrams/d1.jpg", "a/zen/diagrams/d10.jpg", "a/zen/diagrams/d11.jpg", "a/zen/diagrams/d12.jpg", "a/zen/diagrams/d13.jpg", "a/zen/diagrams/d14.jpg", "a/zen/diagrams/d15.jpg", "a/zen/diagrams/d16.jpg", "a/zen/diagrams/d17.jpg", "a/zen/diagrams/d18.jpg", "a/zen/diagrams/d19.jpg", "a/zen/diagrams/d2.jpg", "a/zen/diagrams/d20.jpg", "a/zen/diagrams/d21.jpg", "a/zen/diagrams/d22.jpg", "a/zen/diagrams/d24.jpg", "a/zen/diagrams/d25.jpg", "a/zen/diagrams/d26.jpg", "a/zen/diagrams/d27.jpg", "a/zen/diagrams/d28.jpg", "a/zen/diagrams/d29.jpg", "a/zen/diagrams/d3.jpg", "a/zen/diagrams/d30.jpg", "a/zen/diagrams/d31.jpg", "a/zen/diagrams/d32.jpg", "a/zen/diagrams/d33.jpg", "a/zen/diagrams/d34.jpg", "a/zen/diagrams/d35.jpg", "a/zen/diagrams/d36.jpg", "a/zen/diagrams/d37.jpg", "a/zen/diagrams/d38.jpg", "a/zen/diagrams/d39.jpg", "a/zen/diagrams/d4.jpg", "a/zen/diagrams/d41.jpg", "a/zen/diagrams/d42.jpg", "a/zen/diagrams/d43.jpg", "a/zen/diagrams/d44.jpg", "a/zen/diagrams/d45.jpg", "a/zen/diagrams/d46.jpg", "a/zen/diagrams/d47.jpg", "a/zen/diagrams/d5.jpg", "a/zen/diagrams/d6.jpg", "a/zen/diagrams/d7.jpg", "a/zen/diagrams/d8.jpg", "a/zen/diagrams/d9.jpg", "a/zen/index.html"]); // relative paths whose real file is "<path>.enc"
const CDN = ["https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js", "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.6/purify.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js", "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js", "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+HK:wght@500&display=swap", "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap", "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap", "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,400&display=swap", "https://fonts.googleapis.com/css2?family=Caprasimo&family=Karla:ital,wght@0,400;0,500;0,700;1,400&display=swap", "https://fonts.googleapis.com/css2?family=Gloock&family=Figtree:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap", "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap", "https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;1,7..72,400&family=Public+Sans:wght@400;500;600&display=swap", "https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@600;900&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap"];              // third-party libraries and fonts the apps load
const CACHE = "travel-" + VERSION, RUNTIME = "travel-runtime";
const BASE = new URL("./", self.location).href;

function rel(url){ return url.startsWith(BASE) ? url.slice(BASE.length).split("#")[0].split("?")[0] : null; }

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // add one at a time so one slow file can't sink the whole install
    for (const f of FILES){ try { const r = await fetch(BASE + f, {cache:"reload"}); if (r.ok) await c.put(BASE + f, r); } catch(err){} }
    const rt = await caches.open(RUNTIME);
    for (const u of CDN){ try { if (!(await rt.match(u))){ const r = await fetch(u, {mode:"no-cors"}); await rt.put(u, r); } } catch(err){} }
    self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith("travel-") && k !== CACHE && k !== RUNTIME) await caches.delete(k);
    await self.clients.claim();
  })());
});

function keyDB(){ return new Promise((res, rej) => { const r = indexedDB.open("travel-keys", 1); r.onupgradeneeded = () => r.result.createObjectStore("k"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
async function getKey(){ try { const d = await keyDB(); return await new Promise(res => { const q = d.transaction("k").objectStore("k").get("aes"); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); }); } catch(e){ return null; } }

const TYPES = {html:"text/html; charset=utf-8", json:"application/json", jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", svg:"image/svg+xml", js:"text/javascript", css:"text/css", webmanifest:"application/manifest+json"};
async function fromCache(url){ const c = await caches.open(CACHE); let r = await c.match(url); if (!r){ try { r = await fetch(url); if (r.ok) await c.put(url, r.clone()); } catch(e){ r = null; } } return r; }

async function unlockServe(path, req){
  const key = await getKey();
  if (!key){
    if (req.mode === "navigate") return Response.redirect(BASE + "?next=" + encodeURIComponent(path), 302);
    return new Response("Locked", {status:403});
  }
  const enc = await fromCache(BASE + path + ".enc");
  if (!enc || !enc.ok) return new Response("Not available offline yet", {status:504});
  const buf = new Uint8Array(await enc.arrayBuffer());
  let plain;
  try { plain = await crypto.subtle.decrypt({name:"AES-GCM", iv:buf.slice(0, 12)}, key, buf.slice(12)); }
  catch(e){ return Response.redirect(BASE + "?bad=1&next=" + encodeURIComponent(path), 302); }
  const ext = (path.split(".").pop() || "").toLowerCase();
  return new Response(plain, {status:200, headers:{"Content-Type":TYPES[ext] || "application/octet-stream", "Cache-Control":"no-store"}});
}

self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  let r = rel(req.url);
  if (r !== null){
    if (r === "" || r.endsWith("/")) r += "index.html";
    if (LOCKED.has(r)){ e.respondWith(unlockServe(r, req)); return; }
    e.respondWith((async () => {
      const c = await caches.open(CACHE); const hit = await c.match(BASE + r);
      if (hit) return hit;
      try { return await fetch(req); } catch(err){ return (await c.match(BASE + "index.html")) || new Response("Offline", {status:503}); }
    })());
    return;
  }
  // other sites (fonts, libraries): use the saved copy, refresh it when online
  e.respondWith((async () => {
    const rt = await caches.open(RUNTIME); const hit = await rt.match(req.url);
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) rt.put(req.url, res.clone()).catch(() => {}); return res; }).catch(() => null);
    if (hit){ e.waitUntil(net); return hit; }
    return (await net) || new Response("", {status:504});
  })());
});

self.addEventListener("message", e => { if (e.data === "version" && e.source) e.source.postMessage({version:VERSION}); });
