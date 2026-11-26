/* ===========================================================
   REVO — Regalar una experiencia · ventana compartida (20-nov-2026)
   El MISMO flujo que experiencias.html: ventana «Regalar» → correo al equipo (Web3Forms) + apunte en la Platform
   (/api/regalo, que devuelve el código del regalo) → pago en Momence (cajón de revo-reservar.js) → al volver de
   pagar, reserva-hecha.html lleva a quien compra a la página de su regalo (/regalo/{código}?enviar=1).
   Hoy lo usa /navidad. experiencias.html lleva todavía su propia copia de esta lógica (la que vende hoy):
   cuando Eric lo apruebe, se le quita su script y carga este fichero; el HTML que pinta es el mismo (clases exp-*).

   Uso:
     <script src="revo-reservar.js" defer></script>   (el cajón de pago; si falta, se va a Momence en la pestaña)
     <script src="revo-regalar.js" defer></script>
     REVO.regalar({ exp: 'Glow', precio: 140, url: 'https://momence.com/…/498606', para: 'Ana', dedicatoria: '…', formato: 'digital' })   (para, dedicatoria y formato, opcionales: rellenan la ventana)
   Opciones (antes de abrir): REVO.regalarConfig = {
     canal: 'goodfit',         // de dónde viene (?c=); va en el correo al equipo, y a la Platform solo si enviarCanal es true
     utm: 'utm_source=ig · …',  // los utm_* de la visita, en el correo al equipo
     enviarCanal: false,
     origen: 'Web REVO · Navidad',   // remitente del correo al equipo
     alEnviar: function(datos){}     // aviso para la medición de la página (no bloquea)
   }
   =========================================================== */
(function () {
  'use strict';
  var KEY = '5eeca49e-c92c-4d3b-9cff-e4ad55ed3991';   // Web3Forms, la misma de experiencias.html
  var API = 'https://revo-platform.vercel.app/api/regalo';
  var CANAL_OK = /^[a-z0-9-]{1,40}$/;
  var modal, form, f, elName, submitBtn, errBox, actual = null, lastFocus = null;

  function cfg() { return window.REVO && window.REVO.regalarConfig || {}; }
  /* Los textos que ve la persona. La página en inglés pasa los suyos en REVO.regalarConfig.textos (los mismos de
     en/experiencias.html). Lo que viaja al equipo (nombres de campo, valor de «Formato», asunto) sigue en español. */
  var ES = {
    cerrar: 'Cerrar', kicker: 'Regalar', titulo: 'Regala la experiencia ', sub: 'Completa el regalo y te llevamos al pago. Te enviamos el comprobante por correo.',
    formato: '¿En qué formato lo quieres?', impreso: 'Impreso', impresoMeta: 'Tarjeta física · recógela en REVO', digital: 'Digital', digitalMeta: 'Al momento · lo envías tú por WhatsApp o correo',
    para: 'Para', paraPh: 'Quien lo recibe', de: 'De parte de', email: 'Tu email', emailPh: 'Para el comprobante de pago', ded: 'Dedicatoria', dedPh: 'Opcional — la incluimos en el regalo',
    boton: 'Continuar al pago', enviando: 'Enviando…', pie: 'Pago seguro · lo gestiona REVO Studios',
    error: 'No hemos podido enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o escríbenos a hello@revostudios.eu.',
    wa: 'Hola, quiero regalar la experiencia {exp}. ¿Me ayudáis?', waBoton: 'Escríbenos por WhatsApp',
    pagado: '¿Ya has pagado? Tu regalo te espera.', recoger: 'Recogerlo'
  };
  function tx() { var o = {}, k, t = cfg().textos || {}; for (k in ES) o[k] = t[k] || ES[k]; return o; }
  function e(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build() {
    if (modal) return;
    var t = tx();
    modal = document.createElement('div');
    modal.className = 'exp-modal'; modal.id = 'expModal'; modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="exp-scrim" data-close></div>' +
      '<div class="exp-dialog" role="dialog" aria-modal="true" aria-labelledby="expTitle">' +
        '<button class="exp-close" type="button" data-close aria-label="' + e(t.cerrar) + '"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '<p class="exp-kicker">' + e(t.kicker) + '</p>' +
        '<h3 class="exp-title" id="expTitle">' + e(t.titulo) + '<span class="ser" id="expName"></span></h3>' +
        '<p class="exp-sub">' + e(t.sub) + '</p>' +
        '<form class="exp-form" id="expForm" novalidate>' +
          '<input type="hidden" name="access_key" value="' + KEY + '" />' +
          '<input type="hidden" name="subject" value="" />' +
          '<input type="hidden" name="from_name" value="" />' +
          '<input type="hidden" name="Tipo" value="Regalo" />' +
          '<input type="hidden" name="Experiencia" value="" />' +
          '<input type="hidden" name="Precio" value="" />' +
          '<input type="hidden" name="Canal" value="" />' +
          '<input type="hidden" name="UTM" value="" />' +
          '<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" style="display:none" aria-hidden="true" />' +
          '<fieldset class="exp-fields">' +
            '<div class="exp-field"><span class="exp-legend">' + e(t.formato) + ' <span class="req">*</span></span>' +
              '<div class="exp-seg">' +
                '<label><input type="radio" name="Formato" data-f="impreso" value="Impreso · tarjeta física, se recoge en REVO" required /><span class="exp-opt"><span class="o-name">' + e(t.impreso) + '</span><span class="o-meta">' + e(t.impresoMeta) + '</span></span></label>' +
                '<label><input type="radio" name="Formato" data-f="digital" value="Digital · al momento, lo envía quien compra" /><span class="exp-opt"><span class="o-name">' + e(t.digital) + '</span><span class="o-meta">' + e(t.digitalMeta) + '</span></span></label>' +
              '</div></div>' +
            '<div class="exp-row">' +
              '<div class="exp-field"><label for="gf-nombre">' + e(t.para) + ' <span class="req">*</span></label><input class="exp-input" id="gf-nombre" name="Para (nombre)" type="text" placeholder="' + e(t.paraPh) + '" required /></div>' +
              '<div class="exp-field"><label for="gf-de">' + e(t.de) + ' <span class="req">*</span></label><input class="exp-input" id="gf-de" name="De parte de" type="text" required /></div>' +
            '</div>' +
            '<div class="exp-field"><label for="gf-email">' + e(t.email) + ' <span class="req">*</span></label><input class="exp-input" id="gf-email" name="email" type="email" autocomplete="email" placeholder="' + e(t.emailPh) + '" required /></div>' +
            '<div class="exp-field"><label for="gf-ded">' + e(t.ded) + '</label><textarea class="exp-input" id="gf-ded" name="Dedicatoria" placeholder="' + e(t.dedPh) + '"></textarea></div>' +
          '</fieldset>' +
          '<button class="exp-submit" id="expSubmit" type="submit">' + e(t.boton) + '</button>' +
          '<p class="exp-error" id="expError" role="alert" hidden></p>' +
          '<p class="exp-foot-note"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span>' + e(t.pie) + '</span></p>' +
        '</form>' +
      '</div>';
    document.body.appendChild(modal);
    form = modal.querySelector('#expForm'); f = form.elements;
    elName = modal.querySelector('#expName'); submitBtn = modal.querySelector('#expSubmit'); errBox = modal.querySelector('#expError');
    modal.querySelectorAll('[data-close]').forEach(function (x) { x.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
    form.addEventListener('submit', enviar);
  }

  function open(d) {
    build();
    actual = d || {};
    lastFocus = document.activeElement;
    form.reset();
    errBox.hidden = true; errBox.textContent = '';
    submitBtn.disabled = false; submitBtn.classList.remove('is-loading'); submitBtn.textContent = tx().boton;
    var precio = actual.precio ? actual.precio + '€' : '';
    var c = cfg();
    elName.textContent = actual.exp || '';
    // lo que la persona ya escribió en la página (p. ej. la tarjeta del test de /navidad)
    if (actual.para) f['Para (nombre)'].value = String(actual.para).slice(0, 60);
    if (actual.dedicatoria) f['Dedicatoria'].value = String(actual.dedicatoria).slice(0, 400);
    if (actual.formato === 'impreso' || actual.formato === 'digital') {
      form.querySelectorAll('input[name="Formato"]').forEach(function (r) { r.checked = r.getAttribute('data-f') === actual.formato; });
    }
    f['Experiencia'].value = actual.exp || '';
    f['Precio'].value = precio;
    f['Canal'].value = CANAL_OK.test(c.canal || '') ? c.canal : '';
    f['UTM'].value = String(c.utm || '').slice(0, 300);
    f['from_name'].value = c.origen || 'Web REVO · Experiencias';
    f['subject'].value = 'Nuevo regalo · ' + (actual.exp || '') + (precio ? ' · ' + precio : '') + (f['Canal'].value ? ' · ' + f['Canal'].value : '');
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { var el = modal.querySelector('input[type=radio]'); if (el) el.focus(); }, 90);
  }

  function close() {
    if (!modal) return;
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function aPagar() {
    var url = actual.url, title = actual.exp || 'REVO Studios';
    var t = tx(), canal = cfg().canal || '';
    // de qué canal viene, también en el WhatsApp
    var wa = 'https://wa.me/34613505881?text=' + encodeURIComponent(t.wa.replace('{exp}', title) + (CANAL_OK.test(canal) ? ' (ref: ' + canal + ')' : ''));
    close();
    if (window.REVO && window.REVO.reservar) window.REVO.reservar({ url: url, title: title, whatsapp: wa, whatsappLabel: t.waBoton });
    else window.location.href = url;
    enPago = true; barra();
  }

  function enviar(e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    errBox.hidden = true;
    submitBtn.disabled = true; submitBtn.classList.add('is-loading'); submitBtn.textContent = tx().enviando;
    enviadoEn = Date.now(); sondeoDesde = 0;
    var fd = new FormData(form), c = cfg();
    var prod = (String(actual.url || '').match(/\/(\d+)\/?(?:[?#].*)?$/) || [])[1];
    var fmt = String(fd.get('Formato') || '');
    var formato = /^digital/i.test(fmt) ? 'digital' : (fmt ? 'impreso' : '');
    try { if (typeof c.alEnviar === 'function') c.alEnviar({ exp: actual.exp, precio: actual.precio, formato: formato }); } catch (_e) {}
    /* El apunte en la Platform (pestaña Regalos): cuando llega el pago de Momence se enlaza solo con estos datos.
       No bloquea: si fallara, el correo llega igual. */
    var apunte = null;
    try {
      if (prod) {
        var cuerpo = {
          producto: prod, para: 'regalo',
          nombre: String(fd.get('De parte de') || ''),
          email: String(fd.get('email') || ''),
          destinatario: String(fd.get('Para (nombre)') || ''),
          dedicatoria: String(fd.get('Dedicatoria') || ''),
          formato: formato,
          ref: fd.get('botcheck') ? '1' : ''
        };
        if (c.enviarCanal && CANAL_OK.test(c.canal || '')) cuerpo.canal = c.canal;
        apunte = fetch(API, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            /* el código del regalo: al volver de pagar, reserva-hecha.html lleva a su página. `v` (importe) y `n`
               (experiencia) sirven para avisar a Meta de la compra con su importe. */
            if (j && j.ok && j.codigo) {
              try { localStorage.setItem('revo_regalo', JSON.stringify({ c: j.codigo, t: Date.now(), v: Number(actual.precio) || 0, n: String(actual.exp || '').slice(0, 60) })); } catch (_e) {}
              barra();
            }
          }).catch(function () {});
      }
    } catch (_e) {}
    var done = function () {
      // como mucho 2,5 s esperando el código: el pago no se retrasa por esto
      if (!apunte || !window.Promise) { aPagar(); return; }
      Promise.race([apunte, new Promise(function (res) { setTimeout(res, 2500); })]).then(aPagar, aPagar);
    };
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j.success) done(); else throw new Error(j.message || 'err'); })
      .catch(function () {
        var t = tx();
        submitBtn.disabled = false; submitBtn.classList.remove('is-loading'); submitBtn.textContent = t.boton;
        errBox.hidden = false; errBox.textContent = t.error;
      });
  }

  /* «¿Ya has pagado? Tu regalo te espera.» (26-nov-2026). Momence NO devuelve a nuestra web a quien compra un producto
     (solo tras una cita, una clase o una membresía): se queda en su pantalla de gracias. Esta barra lleva a la página
     del regalo con el código guardado (3 h), la misma que experiencias.html:
     - con el pago abierto, al pie del cajón, DEBAJO del iframe (no tapa el botón de pagar) y solo si el código es el
       de esta compra; - cerrado el cajón o al volver a la página, abajo, flotando. */
  var enPago = false, enviadoEn = 0, fija = null, pie = null;

  /* Llevarla sola a su página (rama claude/navidad-vuelta-pago, 26-nov-2026; necesita GET /api/regalo/estado en la
     Platform). Mientras el cajón de pago está abierto, cada 4 s se pregunta si ese código ya está pagado; al saberlo,
     a /reserva-hecha?type=regalo, que avisa a Meta de la compra (con permiso) y la lleva a /regalo/{código}?enviar=1.
     Sin la puerta (404) o tras 20 minutos, se deja de preguntar y queda la barra. */
  var ESTADO = 'https://revo-platform.vercel.app/api/regalo/estado?codigo=', sondeo = null, sondeoDesde = 0, sinPuerta = false;
  function para() { if (sondeo) { clearTimeout(sondeo); sondeo = null; } }
  function pregunta() {
    para();
    var rg = guardado(), scrim = document.getElementById('bkScrim');
    if (sinPuerta || !rg || rg.t < enviadoEn || !scrim || !scrim.classList.contains('open') || Date.now() - sondeoDesde > 20 * 60000) return;
    fetch(ESTADO + encodeURIComponent(rg.c), { cache: 'no-store' })
      .then(function (r) {
        // 404: la puerta no existe todavía · 429: demasiadas preguntas desde esta conexión → se deja de preguntar.
        // 503 u otro: la base no contestó → «aún no», se vuelve a preguntar.
        if (r.status === 404 || r.status === 429) { sinPuerta = true; return null; }
        return r.ok ? r.json() : null;
      })
      .then(function (j) {
        if (j && j.ok && j.pagado === true) { location.href = '/reserva-hecha?type=regalo'; return; }
        if (!sinPuerta) sondeo = setTimeout(pregunta, 4000);
      })
      .catch(function () { sondeo = setTimeout(pregunta, 8000); });
  }
  function guardado() {
    var rg = null;
    try { rg = JSON.parse(localStorage.getItem('revo_regalo') || 'null'); } catch (_e) {}
    if (!rg || !/^RV-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(rg.c || '')) return null;
    if (rg.r) return null;   // ya lo recogió (lo marca reserva-hecha.html al llevarla a su página)
    if (Date.now() - (rg.t || 0) > 3 * 3600 * 1000) { try { localStorage.removeItem('revo_regalo'); } catch (_e) {} return null; }
    return rg;
  }
  function pinta(clase, rg, conCerrar) {
    var t = tx(), d = document.createElement('div');
    d.className = 'rg-barra ' + clase; d.setAttribute('role', 'status');
    d.innerHTML = '<span>' + e(t.pagado) + '</span><a href="/regalo/' + e(rg.c) + '?enviar=1">' + e(t.recoger) + '</a>' +
      (conCerrar ? '<button type="button" aria-label="' + e(t.cerrar) + '">\u00d7</button>' : '');
    if (conCerrar) d.querySelector('button').addEventListener('click', function () { try { localStorage.removeItem('revo_regalo'); } catch (_e) {} barra(); });
    return d;
  }
  function barra() {
    var rg = guardado(), scrim = document.getElementById('bkScrim'), abierto = !!(scrim && scrim.classList.contains('open'));
    if (fija) { fija.remove(); fija = null; } if (pie) { pie.remove(); pie = null; }
    if (!abierto) { enPago = false; para(); }
    if (!rg) return;
    if (abierto && enPago && !sondeo && rg.t >= enviadoEn) { sondeoDesde = sondeoDesde || Date.now(); sondeo = setTimeout(pregunta, 4000); }
    if (abierto) {
      var panel = document.getElementById('bkPanel');
      if (panel && enPago && rg.t >= enviadoEn) { pie = pinta('rg-pie', rg, false); panel.appendChild(pie); }
    } else { fija = pinta('rg-fija', rg, true); document.body.appendChild(fija); }
  }
  function vigila() {
    barra();
    var scrim = document.getElementById('bkScrim'), antes = false;
    if (!scrim || !window.MutationObserver) return;
    new MutationObserver(function () { var a = scrim.classList.contains('open'); if (a !== antes) { antes = a; barra(); } }).observe(scrim, { attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'complete') vigila(); else window.addEventListener('load', vigila);
  window.addEventListener('pageshow', function (ev) { if (ev.persisted) barra(); });   // al volver con «atrás»

  window.REVO = window.REVO || {};
  window.REVO.regalar = open;
  window.REVO.regalarCerrar = close;
})();
