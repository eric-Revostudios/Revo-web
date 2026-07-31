/* ===========================================================
   REVO — Google Analytics 4 (GA4)  ·  con consentimiento
   - NO carga hasta que el usuario ACEPTA la categoría
     "Analítica" en el banner de cookies.
   - Lo activa revo-cookies.js vía window.revoAnalytics.enable()
     (al aceptar, o si ya había aceptado antes).
   - Helper: window.revoGA('event', 'nombre', { ...params })

   >>> PASO ÚNICO: pega aquí tu ID de medición (formato G-XXXXXXXXXX)
       lo encuentras en GA4 → Administrar → Flujos de datos → Web.
   =========================================================== */
(function () {
  "use strict";
  var GA_ID = "G-QPQGGH1SG7";

  function analyticsAllowed() {
    try {
      if (window.revoConsent && typeof window.revoConsent.analytics === "boolean") {
        return window.revoConsent.analytics;
      }
      var s = localStorage.getItem("revo-consent");
      if (s) return JSON.parse(s).analytics === true;
    } catch (e) {}
    return false; // sin consentimiento, no se carga
  }

  function loadGA() {
    if (!GA_ID || GA_ID.indexOf("G-") !== 0 || GA_ID === "G-XXXXXXXXXX") return; // ID no configurado
    if (window.gtag) return; // ya cargado

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }

  function enable() {
    loadGA();
  }

  // Helper opcional para eventos personalizados desde el sitio.
  window.revoGA = function (command, name, params) {
    if (!window.gtag) return;
    window.gtag(command || "event", name, params || {});
  };

  // API para el gestor de consentimiento (revo-cookies.js).
  window.revoAnalytics = { enable: enable, id: GA_ID, allowed: analyticsAllowed };

  // Si el visitante ya había aceptado antes, arranca solo.
  if (analyticsAllowed()) enable();
})();
