/* ===========================================================
   REVO — Meta Pixel (navegador)  ·  con consentimiento
   Píxel: 837759925366480
   - NO carga hasta que el usuario ACEPTA en el banner.
   - Lo activa revo-cookies.js vía window.revoPixel.enable()
     (al pulsar "Vale, perfecto" o si ya había aceptado antes).
   - Dispara PageView + "Lead" (al abrir el drawer de reserva).
   - Helper: window.revoTrack(evento, params)
   =========================================================== */
(function () {
  "use strict";
  var PIXEL_ID = "837759925366480";
  var bound = false;

  function marketingAllowed() {
    try {
      if (window.revoConsent && typeof window.revoConsent.marketing === "boolean") {
        return window.revoConsent.marketing;
      }
      var s = localStorage.getItem("revo-consent");
      if (s) return JSON.parse(s).marketing === true;
    } catch (e) {}
    return false; // sin consentimiento, no se carga
  }

  function loadPixel() {
    if (window.fbq) return;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }

  function bindReservar() {
    if (bound) return;
    bound = true;
    document.addEventListener(
      "click",
      function (e) {
        var el = e.target && e.target.closest ? e.target.closest("[data-reservar]") : null;
        if (!el) return;
        var name = (el.getAttribute("data-title") || el.textContent || "Reservar").replace(/\s+/g, " ").trim();
        window.revoTrack("Lead", { content_name: name.slice(0, 60) });
      },
      true
    );
  }

  function enable() {
    loadPixel();
    bindReservar();
  }

  window.revoTrack = function (event, params) {
    if (!window.fbq) return;
    fbq("track", event, params || {});
  };

  // API para el gestor de consentimiento (revo-cookies.js).
  window.revoPixel = { enable: enable, id: PIXEL_ID, allowed: marketingAllowed };

  // Si el visitante ya había aceptado antes, arranca solo.
  if (marketingAllowed()) enable();
})();
