/* ===========================================================
   REVO — Idioma (sin redirecciones automáticas)
   - Antes, cada página en español saltaba a la inglesa si el navegador
     estaba en inglés. El robot de Google navega en inglés, así que veía
     las páginas en español como redirecciones y no las indexaba.
     Google desaconseja estas redirecciones por idioma.
   - Ahora cada página se queda en su idioma. Si el visitante parece
     preferir el otro, aparece un aviso discreto con enlace a la versión
     equivalente, solo tras su primera interacción (toque, rueda o tecla).
   - Recuerda la elección del botón ES/EN (localStorage "revo_lang")
     y si el aviso se cerró (localStorage "revo_lang_hint").
   =========================================================== */
(function () {
  "use strict";
  var PREF = "revo_lang";
  var HINT = "revo_lang_hint";

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // Recordar la elección explícita del visitante (botón ES/EN o enlace del aviso).
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest(".lang-switch, .lang-hint-go") : null;
    if (a && a.getAttribute("hreflang")) set(PREF, a.getAttribute("hreflang"));
  }, true);

  var here = (document.documentElement.getAttribute("lang") || "es").slice(0, 2).toLowerCase();
  var nav = ((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase();
  var navLang = /^(es|ca|gl|eu)\b/.test(nav) ? "es" : "en";
  var want = get(PREF) || navLang;
  if (want === here || get(HINT)) return;

  var sw = document.querySelector('a.lang-switch[hreflang="' + want + '"]');
  var alt = document.querySelector('link[rel="alternate"][hreflang="' + want + '"]');
  var href = (sw && sw.getAttribute("href")) || (alt && alt.getAttribute("href"));
  if (!href) return;

  var T = want === "en"
    ? { text: "View this page in English", close: "Close" }
    : { text: "Ver esta página en español", close: "Cerrar" };

  var EVENTS = ["pointerdown", "touchstart", "wheel", "keydown"];
  var shown = false;

  function show() {
    if (shown) return;
    shown = true;
    EVENTS.forEach(function (ev) { window.removeEventListener(ev, show, true); });

    var css =
      ".lang-hint{position:fixed;right:clamp(12px,2.4vw,26px);z-index:95;display:flex;align-items:center;gap:2px;" +
      "font-family:var(--sans,'Helvetica Neue',Arial,sans-serif);font-size:13px;line-height:1.2;color:#eef1ff;" +
      "background:rgba(13,16,36,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);" +
      "border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:4px 4px 4px 16px;box-shadow:0 12px 32px rgba(0,0,0,.35);" +
      "opacity:0;transform:translateY(-8px);transition:opacity .45s cubic-bezier(.22,.61,.25,1),transform .45s cubic-bezier(.22,.61,.25,1)}" +
      ".lang-hint.in{opacity:1;transform:none}" +
      ".lang-hint a{color:#eef1ff;text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(238,241,255,.4);padding:9px 4px}" +
      ".lang-hint a:hover{text-decoration-color:#eef1ff}" +
      ".lang-hint button{appearance:none;-webkit-appearance:none;border:0;background:transparent;color:rgba(238,241,255,.7);" +
      "width:34px;height:34px;border-radius:50%;cursor:pointer;font:inherit;font-size:19px;line-height:1;display:grid;place-items:center}" +
      ".lang-hint button:hover{background:rgba(255,255,255,.08);color:#fff}" +
      "@media (max-width:520px){.lang-hint{left:12px;right:12px;justify-content:space-between}}";
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    var box = document.createElement("div");
    box.className = "lang-hint";
    box.setAttribute("lang", want);
    box.setAttribute("role", "note");
    box.setAttribute("data-nosnippet", "");

    var a = document.createElement("a");
    a.className = "lang-hint-go";
    a.href = href;
    a.setAttribute("hreflang", want);
    a.textContent = T.text;

    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", T.close);
    b.textContent = "×";
    b.addEventListener("click", function () {
      set(HINT, "1");
      box.classList.remove("in");
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 450);
    });

    box.appendChild(a);
    box.appendChild(b);

    // Justo debajo de la cabecera fija (su alto no cambia aunque se oculte al hacer scroll).
    var hd = document.querySelector(".site-header");
    box.style.top = ((hd ? hd.offsetHeight : 0) + 10) + "px";
    document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("in"); }); });
  }

  EVENTS.forEach(function (ev) { window.addEventListener(ev, show, { capture: true, passive: true }); });
})();
