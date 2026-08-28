/* ===========================================================================
   REVO · CENTROS ASOCIADOS — puerta, render y medición. Compartido ES / EN.
   Todo el contenido variable vive en partners.config.js. Aquí no hay ni un
   código, ni un enlace, ni una palabra de acceso.
   =========================================================================== */
(function () {
  "use strict";

  var CFG = window.REVO_PARTNERS || {};
  var CENTROS = Array.isArray(CFG.centros) ? CFG.centros : [];
  var LANG = (document.documentElement.getAttribute("lang") || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es";
  var KEY = "revo_partners_ok";
  var KEY_ALTA = "revo_partners_alta:";
  var DIAS = 90;

  var STR = {
    es: {
      beneficio: "Tu beneficio", estado: "Estado", pausado: "Pausado", codigo: "Código", condiciones: "Condiciones",
      copiar: "Copiar", copiado: "Copiado", pasos: "Pasos", fase: "Fase", abrir: "Abrir",
      sesion1: "sesión al mes", sesionN: "sesiones al mes",
      notaCodigo: "En la reserva verás el precio. El código lo deja en cero.",
      sinCodigo: "Código en actualización. Pídeselo al equipo en recepción.",
      pausaGen: "Temporalmente no disponible. Pregunta en recepción.",
      altaHecha: "Ya me di de alta", altaLista: "Alta hecha.", verAlta: "Ver los pasos del alta",
      errVacio: "Escribe la palabra.",
      errNo: "Esa no es. Pídesela al equipo en recepción.",
      errVieja: "Esa palabra ya no está activa. Pídele la nueva al equipo en recepción."
    },
    en: {
      beneficio: "Your benefit", estado: "Status", pausado: "Paused", codigo: "Code", condiciones: "Conditions",
      copiar: "Copy", copiado: "Copied", pasos: "Steps", fase: "Phase", abrir: "Open",
      sesion1: "session per month", sesionN: "sessions per month",
      notaCodigo: "You'll see the price at checkout. The code brings it to zero.",
      sinCodigo: "Code being updated. Ask the team at reception.",
      pausaGen: "Temporarily unavailable. Ask at reception.",
      altaHecha: "I already signed up", altaLista: "Signed up.", verAlta: "See the sign-up steps",
      errVacio: "Type the word.",
      errNo: "That's not it. Ask the team at reception.",
      errVieja: "That word is no longer active. Ask the team at reception for the new one."
    }
  }[LANG];

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function norm(s) {
    s = String(s == null ? "" : s).toLowerCase();
    if (s.normalize) s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return s.replace(/\s+/g, "");
  }
  function ga(name, params) {
    try { if (window.revoGA) window.revoGA("event", name, params || {}); } catch (e) {}
  }
  function loc(c) { return (c && (c[LANG] || c.es || c.en)) || {}; }
  function pad2(n) { return n < 10 ? "0" + n : "" + n; }
  function sesiones(n) {
    n = parseInt(n, 10);
    if (!n) return "";
    return n + " " + (n === 1 ? STR.sesion1 : STR.sesionN);
  }
  function sesionesHTML(n) {
    n = parseInt(n, 10);
    if (!n) return "";
    return "<span>" + n + '</span><span class="u">' + (n === 1 ? STR.sesion1 : STR.sesionN) + "</span>";
  }
  function activo(c) { return (c.estado || "activo") !== "pausado"; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- sesión de 90 días ---------- */
  function sesionValida() {
    try {
      var r = JSON.parse(store(KEY) || "null");
      if (!r || !r.t) return false;
      if (Date.now() - r.t > DIAS * 864e5) return false;
      return r.w === norm(CFG.palabraAcceso);
    } catch (e) { return false; }
  }
  function guardarSesion() {
    store(KEY, JSON.stringify({ w: norm(CFG.palabraAcceso), t: Date.now() }));
  }

  /* ---------- piezas de un bloque ---------- */
  function codigoHTML(c) {
    /* Centros que no usan código (se reserva por WhatsApp, por teléfono...):
       no se pinta el bloque del código. Ver "sinCodigo" en partners.config.js. */
    if (c.sinCodigo) return "";
    var code = (c.codigo || "").trim();
    if (!code) {
      return '<div class="pc-code pc-code--empty"><span class="lab">' + STR.codigo + '</span><p>' + esc(STR.sinCodigo) + "</p></div>";
    }
    return '<div class="pc-code"><span class="lab">' + STR.codigo + "</span>" +
      "<code>" + esc(code) + "</code>" +
      '<button type="button" class="pc-copy" data-copy="' + esc(code) + '" data-id="' + esc(c.id) + '">' + STR.copiar + "</button>" +
      (c.enlace ? '<p class="pc-code-note">' + esc(STR.notaCodigo) + "</p>" : "") + "</div>";
  }
  function condicionesHTML(t) {
    if (!t.condiciones || !t.condiciones.length) return "";
    return '<div class="pc-cond"><span class="lab">' + STR.condiciones + "</span><ul>" +
      t.condiciones.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
  }
  function listaPasosHTML(arr) {
    return '<ol class="pc-steps">' + arr.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";
  }
  function faseHTML(c, f, k, plegada) {
    var h = '<div class="pf' + (f.plegable && plegada ? " is-folded" : "") + '">';
    h += '<div class="pf-h"><span class="pf-n">' + STR.fase + " " + (k + 1) + '</span><h3 class="pf-t">' + esc(f.titulo) + "</h3></div>";
    h += '<div class="pf-body">';
    if (f.pasos && f.pasos.length) h += listaPasosHTML(f.pasos);
    if (f.nota) h += '<p class="pf-nota">' + esc(f.nota) + "</p>";
    if (f.enlace) h += '<a class="pc-cta" href="' + esc(f.enlace) + '" target="_blank" rel="noopener noreferrer" data-cta="' + esc(c.id) + '">' + esc(f.cta || STR.abrir) + "</a>";
    if (f.plegable) h += '<button type="button" class="pf-done" data-fold="' + esc(c.id) + '">' + STR.altaHecha + "</button>";
    h += "</div>";
    if (f.plegable) h += '<div class="pf-folded"><span>' + STR.altaLista + '</span><button type="button" class="pf-undo" data-unfold="' + esc(c.id) + '">' + STR.verAlta + "</button></div>";
    return h + "</div>";
  }

  function bloqueHTML(c, i) {
    var t = loc(c), paused = !activo(c), h = "";
    h += '<div class="pc-idx">' + pad2(i + 1) + "</div>";
    h += '<h2 class="pc-name">' + esc(c.nombre) + "</h2>";
    if (t.descripcion) h += '<p class="pc-desc">' + esc(t.descripcion) + "</p>";

    var rows = "";
    if (c.sesionesMes) rows += '<div class="f"><dt>' + STR.beneficio + "</dt><dd>" + sesionesHTML(c.sesionesMes) + "</dd></div>";
    if (paused) h += '<span class="pc-tag">' + STR.pausado + "</span>";
    if (rows) h += '<dl class="pc-spec">' + rows + "</dl>";

    if (paused) {
      h += '<div class="pc-pause"><span class="lab">' + STR.pausado + "</span><p>" + esc(t.mensajePausa || c.mensajePausa || STR.pausaGen) + "</p></div>";
      return h;
    }

    h += codigoHTML(c);
    h += condicionesHTML(t);

    var p = t.pasos, externo = null, fases = null, lista = null;
    if (p && !Array.isArray(p) && p.enlace) externo = p;
    else if (Array.isArray(p) && p.length && typeof p[0] === "object") fases = p;
    else if (Array.isArray(p) && p.length) lista = p;

    if (t.resumen) h += '<p class="pc-sum">' + esc(t.resumen) + "</p>";
    if (lista) h += '<p class="pc-lab lab">' + STR.pasos + "</p>" + listaPasosHTML(lista);
    if (fases) {
      var plegada = store(KEY_ALTA + c.id) === "1";
      h += fases.map(function (f, k) { return faseHTML(c, f, k, plegada); }).join("");
    }
    if (c.enlace) h += '<a class="pc-cta" href="' + esc(c.enlace) + '" target="_blank" rel="noopener noreferrer" data-cta="' + esc(c.id) + '">' + esc(t.cta || STR.abrir) + "</a>";
    if (externo) h += '<a class="pc-sec" href="' + esc(externo.enlace) + '" target="_blank" rel="noopener noreferrer" data-sec="' + esc(c.id) + '">' + esc(externo.texto || STR.pasos) + "</a>";
    return h;
  }

  /* ---------- render ---------- */
  function renderCentros() {
    var host = document.getElementById("centros");
    if (!host) return;
    host.innerHTML = CENTROS.map(function (c, i) {
      return '<section class="pc' + (activo(c) ? "" : " is-paused") + '" id="' + esc(c.id) + '" data-centro="' + esc(c.id) +
        '" data-screen-label="' + esc(c.nombre) + '">' + bloqueHTML(c, i) + "</section>";
    }).join("");

    var idx = document.getElementById("indice");
    if (idx) {
      idx.innerHTML = CENTROS.map(function (c) {
        return '<a href="#' + esc(c.id) + '"><span>' + esc(c.nombre) + '</span><span class="s">' +
          (activo(c) ? esc(sesiones(c.sesionesMes)) : STR.pausado) + "</span></a>";
      }).join("");
    }
  }

  function renderPuerta() {
    var host = document.getElementById("gateList");
    if (!host) return;
    host.innerHTML = CENTROS.map(function (c) {
      return '<li><span class="n">' + esc(c.nombre) + '</span><span class="s">' +
        (activo(c) ? esc(sesiones(c.sesionesMes)) : STR.pausado) + "</span></li>";
    }).join("");
  }

  /* ---------- medición ---------- */
  var vistos = {};
  function observarBloques() {
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var id = e.target.getAttribute("data-centro");
        if (e.isIntersecting && id && !vistos[id]) {
          vistos[id] = 1;
          ga("partners_bloque_visto", { centro: id });
        }
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(document.querySelectorAll(".pc"), function (el) { io.observe(el); });
  }

  /* ---------- apertura ---------- */
  function abrir(via) {
    var gate = document.getElementById("gate"), page = document.getElementById("page");
    renderCentros();
    if (gate) gate.hidden = true;
    if (page) page.hidden = false;
    document.body.classList.add("is-open");
    ga("partners_abierto", { via: via, ancla: (location.hash || "").replace("#", "") || "top" });
    var h = (location.hash || "").replace("#", "");
    if (h) {
      var el = document.getElementById(h);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.pageYOffset - 12);
    }
    observarBloques();
  }

  /* ---------- eventos ---------- */
  function copiar(text, btn) {
    function ok() {
      btn.classList.add("done");
      btn.textContent = STR.copiado;
      clearTimeout(btn._t);
      btn._t = setTimeout(function () { btn.classList.remove("done"); btn.textContent = STR.copiar; }, 2000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { legacy(text, ok); });
    } else legacy(text, ok);
  }
  function legacy(text, ok) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.cssText = "position:absolute;left:-9999px;top:0";
      document.body.appendChild(ta);
      ta.select(); ta.setSelectionRange(0, text.length);
      document.execCommand("copy");
      document.body.removeChild(ta);
      ok();
    } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-copy],[data-cta],[data-sec],[data-fold],[data-unfold]") : null;
    if (!el) return;
    if (el.hasAttribute("data-copy")) {
      copiar(el.getAttribute("data-copy"), el);
      ga("partners_copiar_codigo", { centro: el.getAttribute("data-id") });
    } else if (el.hasAttribute("data-cta")) {
      ga("partners_abrir_plataforma", { centro: el.getAttribute("data-cta") });
    } else if (el.hasAttribute("data-sec")) {
      ga("partners_ver_video", { centro: el.getAttribute("data-sec") });
    } else if (el.hasAttribute("data-fold")) {
      store(KEY_ALTA + el.getAttribute("data-fold"), "1");
      var f = el.closest(".pf"); if (f) f.classList.add("is-folded");
    } else if (el.hasAttribute("data-unfold")) {
      store(KEY_ALTA + el.getAttribute("data-unfold"), "0");
      var g = el.closest(".pf"); if (g) g.classList.remove("is-folded");
    }
  });

  /* ---------- arranque ---------- */
  function init() {
    renderPuerta();
    ga("partners_llegada", { ancla: (location.hash || "").replace("#", "") || "top" });

    var form = document.getElementById("gateForm");
    if (form) {
      var input = document.getElementById("gateInput");
      var msg = document.getElementById("gateMsg");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var v = norm(input.value);
        if (!v) { msg.textContent = STR.errVacio; return; }
        if (v === norm(CFG.palabraAcceso)) {
          msg.textContent = "";
          guardarSesion();
          abrir("palabra");
          return;
        }
        var viejas = (CFG.palabrasRetiradas || []).map(norm);
        if (viejas.indexOf(v) >= 0) { msg.textContent = STR.errVieja; ga("partners_puerta_fallo", { motivo: "retirada" }); }
        else { msg.textContent = STR.errNo; ga("partners_puerta_fallo", { motivo: "desconocida" }); }
        input.select();
      });
    }

    if (sesionValida()) abrir("sesion");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
