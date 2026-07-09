/* ===========================================================
   REVO — Gestor de consentimiento de cookies (RGPD / LSSI)
   - Banner con Aceptar / Rechazar / Configurar.
   - Categorías: necesarias (siempre), analítica, marketing.
   - Guarda en localStorage "revo-consent" y activa el píxel de
     Meta (window.revoPixel.enable()) solo si marketing = true.
   - Reabrir preferencias: window.revoCookies.open()
   - Bilingüe según <html lang>.
   =========================================================== */
(function () {
  "use strict";
  var KEY = "revo-consent";
  var VERSION = 1;
  var isEN = (document.documentElement.lang || "es").toLowerCase().indexOf("en") === 0;

  var T = isEN
    ? {
        title: "Cookies",
        body: "We use cookies to improve your experience and show you relevant content. It only takes a tap.",
        more: "Cookie policy",
        accept: "Sounds good",
        reject: "Reject",
        config: "Manage",
        save: "Save choices",
        prefsTitle: "Cookie preferences",
        close: "Close",
        cats: {
          necessary: { name: "Strictly necessary", desc: "Required for the site to work (navigation, security, booking). Always active.", always: "Always on" },
          analytics: { name: "Analytics", desc: "Help us understand how the site is used (e.g. Google Analytics)." },
          marketing: { name: "Marketing", desc: "Let us measure and personalise ads and remarketing (Meta Pixel)." }
        }
      }
    : {
        title: "Cookies",
        body: "Usamos cookies para mejorar tu experiencia y mostrarte contenido relevante. Es solo un momento.",
        more: "Política de cookies",
        accept: "Vale, perfecto",
        reject: "Rechazar",
        config: "Configurar",
        save: "Guardar preferencias",
        prefsTitle: "Preferencias de cookies",
        close: "Cerrar",
        cats: {
          necessary: { name: "Estrictamente necesarias", desc: "Imprescindibles para que el sitio funcione (navegación, seguridad, reserva). Siempre activas.", always: "Siempre activas" },
          analytics: { name: "Analítica", desc: "Nos ayudan a entender cómo se usa el sitio (p. ej. Google Analytics)." },
          marketing: { name: "Marketing", desc: "Permiten medir y personalizar anuncios y remarketing (píxel de Meta)." }
        }
      };

  // ---------- estilos ----------
  var css =
    ".rc-scrim,.rc-banner{font-family:var(--sans,'Helvetica Neue',Arial,sans-serif);box-sizing:border-box}" +
    ".rc-banner{position:fixed;left:clamp(14px,2.4vw,26px);bottom:clamp(14px,2.4vw,26px);z-index:2000;width:min(340px,calc(100vw - 28px));" +
    "background:rgba(13,16,36,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:#eef1ff;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:16px 18px 14px;" +
    "box-shadow:0 16px 40px rgba(0,0,0,.4);opacity:0;transform:translateY(14px);transition:opacity .5s cubic-bezier(.22,.61,.25,1),transform .5s cubic-bezier(.22,.61,.25,1)}" +
    ".rc-banner.rc-in{opacity:1;transform:none}" +
    ".rc-banner .rc-head{display:flex;align-items:center;gap:8px;margin:0 0 6px}" +
    ".rc-banner .rc-head svg{width:15px;height:15px;flex:none;opacity:.8}" +
    ".rc-banner h2{font-family:var(--display,inherit);font-weight:500;font-size:14px;margin:0;letter-spacing:.01em}" +
    ".rc-banner p{margin:0 0 13px;font-size:12.5px;line-height:1.5;color:rgba(238,241,255,.62)}" +
    ".rc-banner a.rc-link{color:rgba(238,241,255,.62);text-decoration:underline;text-underline-offset:2px}.rc-banner a.rc-link:hover{color:#cfd6ff}" +
    ".rc-actions{display:flex}" +
    ".rc-mini{display:flex;align-items:center;gap:9px;margin-top:9px;justify-content:center}" +
    ".rc-reject{position:absolute;top:13px;right:15px;margin:0}" +
    ".rc-btn{flex:1 1 auto;font-family:var(--sans,inherit);font-weight:600;font-size:14px;letter-spacing:.01em;border-radius:100px;padding:12px 16px;cursor:pointer;border:1px solid transparent;transition:background .25s,border-color .25s,color .25s;white-space:nowrap}" +
    ".rc-btn--primary{width:100%;background:#6881fc;color:#fff;box-shadow:0 6px 18px rgba(104,129,252,.35)}.rc-btn--primary:hover{background:#5269f3}" +
    ".rc-btn--ghost{background:transparent;color:#eef1ff;border-color:rgba(255,255,255,.24)}.rc-btn--ghost:hover{border-color:rgba(255,255,255,.5)}" +
    ".rc-decline{background:transparent;border:none;font-family:var(--sans,inherit);font-size:11px;font-weight:400;color:rgba(238,241,255,.42);cursor:pointer;padding:2px 2px;text-decoration:none;transition:color .25s,opacity .25s}.rc-decline:hover{color:rgba(238,241,255,.72)}" +
    ".rc-reject{font-size:9.5px;color:rgba(238,241,255,.22);letter-spacing:.01em}.rc-reject:hover{color:rgba(238,241,255,.5)}" +
    ".rc-sep{display:none}" +
    ".rc-scrim{position:fixed;inset:0;z-index:2100;background:rgba(6,8,20,.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .4s}" +
    ".rc-scrim.rc-open{opacity:1;pointer-events:auto}" +
    ".rc-panel{width:min(560px,100%);max-height:88vh;overflow:auto;background:#0d1024;color:#eef1ff;border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:clamp(24px,3vw,34px);box-shadow:0 30px 80px rgba(0,0,0,.55);transform:translateY(18px);transition:transform .4s cubic-bezier(.22,.61,.25,1)}" +
    ".rc-scrim.rc-open .rc-panel{transform:none}" +
    ".rc-panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:8px}" +
    ".rc-panel h2{font-family:var(--display,inherit);font-weight:500;font-size:clamp(22px,3vw,28px);margin:0;letter-spacing:-.015em}" +
    ".rc-x{background:transparent;border:none;color:rgba(238,241,255,.7);cursor:pointer;font-size:22px;line-height:1;padding:4px}.rc-x:hover{color:#fff}" +
    ".rc-cat{display:flex;gap:16px;justify-content:space-between;align-items:flex-start;padding:18px 0;border-top:1px solid rgba(255,255,255,.1)}" +
    ".rc-cat:first-of-type{border-top:none}" +
    ".rc-cat-name{font-weight:600;font-size:15px;margin:0 0 4px}" +
    ".rc-cat-desc{font-size:13px;line-height:1.5;color:rgba(238,241,255,.66);margin:0}" +
    ".rc-always{font-size:12px;color:#8ea0ff;font-weight:600;white-space:nowrap;padding-top:2px}" +
    ".rc-switch{position:relative;flex:none;width:46px;height:26px;border-radius:100px;background:rgba(255,255,255,.18);border:none;cursor:pointer;transition:background .25s;margin-top:1px}" +
    ".rc-switch[aria-checked='true']{background:#6881fc}" +
    ".rc-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .25s}" +
    ".rc-switch[aria-checked='true']::after{transform:translateX(20px)}" +
    ".rc-panel-foot{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}" +
    ".rc-panel-foot .rc-btn{flex:1 1 140px}" +
    "@media (max-width:520px){.rc-banner{left:12px;right:12px;bottom:12px;width:auto}}";

  var styleEl = document.createElement("style");
  styleEl.id = "rc-style";
  styleEl.textContent = css;

  // ---------- consentimiento ----------
  function read() {
    try {
      var s = localStorage.getItem(KEY);
      if (!s) return null;
      var o = JSON.parse(s);
      if (!o || o.v !== VERSION) return null;
      return o;
    } catch (e) {
      return null;
    }
  }
  function write(analytics, marketing) {
    var o = { v: VERSION, necessary: true, analytics: !!analytics, marketing: !!marketing, ts: Date.now() };
    try {
      localStorage.setItem(KEY, JSON.stringify(o));
    } catch (e) {}
    apply(o);
    return o;
  }
  function apply(o) {
    window.revoConsent = o;
    if (o.marketing && window.revoPixel && window.revoPixel.enable) window.revoPixel.enable();
    if (o.analytics && window.revoAnalytics && window.revoAnalytics.enable) window.revoAnalytics.enable();
    document.dispatchEvent(new CustomEvent("revo:consent", { detail: o }));
  }

  // ---------- banner ----------
  var banner;
  function showBanner() {
    if (banner) return;
    banner = document.createElement("div");
    banner.className = "rc-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", T.title);
    banner.innerHTML =
      '<button class="rc-decline rc-reject" data-rc="reject">' + T.reject + "</button>" +
      '<div class="rc-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/><path d="M8.5 9.5h.01M15 9h.01M9 15h.01M14 14.5h.01"/></svg><h2>' + T.title + "</h2></div>" +
      "<p>" + T.body + ' <a class="rc-link" href="cookies.html">' + T.more + "</a></p>" +
      '<div class="rc-actions">' +
        '<button class="rc-btn rc-btn--primary" data-rc="accept">' + T.accept + "</button>" +
      "</div>" +
      '<div class="rc-mini">' +
        '<button class="rc-decline" data-rc="config">' + T.config + "</button>" +
      "</div>";
    document.body.appendChild(banner);
    requestAnimationFrame(function () {
      banner.classList.add("rc-in");
    });
    banner.addEventListener("click", function (e) {
      var b = e.target.closest("[data-rc]");
      if (!b) return;
      var a = b.getAttribute("data-rc");
      if (a === "accept") { write(true, true); hideBanner(); }
      else if (a === "reject") { write(false, false); hideBanner(); }
      else if (a === "config") { openPrefs(); }
    });
  }
  function hideBanner() {
    if (!banner) return;
    banner.classList.remove("rc-in");
    var b = banner;
    setTimeout(function () { if (b && b.parentNode) b.parentNode.removeChild(b); }, 500);
    banner = null;
  }

  // ---------- preferencias ----------
  var scrim;
  function buildSwitch(id, checked) {
    return '<button class="rc-switch" role="switch" aria-checked="' + (checked ? "true" : "false") + '" data-cat="' + id + '"></button>';
  }
  function catRow(id, on, locked) {
    var c = T.cats[id];
    var right = locked ? '<span class="rc-always">' + c.always + "</span>" : buildSwitch(id, on);
    return (
      '<div class="rc-cat"><div><p class="rc-cat-name">' + c.name + '</p><p class="rc-cat-desc">' + c.desc + "</p></div>" + right + "</div>"
    );
  }
  function openPrefs() {
    var cur = read() || { analytics: false, marketing: false };
    if (!scrim) {
      scrim = document.createElement("div");
      scrim.className = "rc-scrim";
      scrim.innerHTML =
        '<div class="rc-panel" role="dialog" aria-modal="true" aria-label="' + T.prefsTitle + '">' +
          '<div class="rc-panel-head"><h2>' + T.prefsTitle + '</h2><button class="rc-x" data-rc="close" aria-label="' + T.close + '">&times;</button></div>' +
          '<div class="rc-cats">' +
            catRow("necessary", true, true) +
            catRow("analytics", cur.analytics, false) +
            catRow("marketing", cur.marketing, false) +
          "</div>" +
          '<div class="rc-panel-foot">' +
            '<button class="rc-btn rc-btn--ghost" data-rc="reject">' + T.reject + "</button>" +
            '<button class="rc-btn rc-btn--ghost" data-rc="accept">' + T.accept + "</button>" +
            '<button class="rc-btn rc-btn--primary" data-rc="save">' + T.save + "</button>" +
          "</div>" +
        "</div>";
      document.body.appendChild(scrim);
      scrim.addEventListener("click", function (e) {
        if (e.target === scrim) closePrefs();
        var sw = e.target.closest(".rc-switch");
        if (sw) {
          var on = sw.getAttribute("aria-checked") === "true";
          sw.setAttribute("aria-checked", on ? "false" : "true");
          return;
        }
        var b = e.target.closest("[data-rc]");
        if (!b) return;
        var a = b.getAttribute("data-rc");
        if (a === "close") closePrefs();
        else if (a === "accept") { write(true, true); syncSwitches(true, true); closePrefs(); hideBanner(); }
        else if (a === "reject") { write(false, false); syncSwitches(false, false); closePrefs(); hideBanner(); }
        else if (a === "save") {
          var an = scrim.querySelector('.rc-switch[data-cat="analytics"]').getAttribute("aria-checked") === "true";
          var mk = scrim.querySelector('.rc-switch[data-cat="marketing"]').getAttribute("aria-checked") === "true";
          write(an, mk); closePrefs(); hideBanner();
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && scrim.classList.contains("rc-open")) closePrefs();
      });
    }
    syncSwitches(cur.analytics, cur.marketing);
    requestAnimationFrame(function () { scrim.classList.add("rc-open"); });
  }
  function syncSwitches(an, mk) {
    if (!scrim) return;
    var a = scrim.querySelector('.rc-switch[data-cat="analytics"]');
    var m = scrim.querySelector('.rc-switch[data-cat="marketing"]');
    if (a) a.setAttribute("aria-checked", an ? "true" : "false");
    if (m) m.setAttribute("aria-checked", mk ? "true" : "false");
  }
  function closePrefs() {
    if (scrim) scrim.classList.remove("rc-open");
  }

  // ---------- init ----------
  function init() {
    document.head.appendChild(styleEl);
    var c = read();
    if (c) { apply(c); }
    else { showBanner(); }
  }
  window.revoCookies = { open: openPrefs, get: read };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
