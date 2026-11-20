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
     REVO.regalar({ exp: 'Glow', precio: 140, url: 'https://momence.com/…/498606', para: 'Ana', dedicatoria: '…' })   (para y dedicatoria, opcionales: rellenan la ventana)
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

  function build() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'exp-modal'; modal.id = 'expModal'; modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="exp-scrim" data-close></div>' +
      '<div class="exp-dialog" role="dialog" aria-modal="true" aria-labelledby="expTitle">' +
        '<button class="exp-close" type="button" data-close aria-label="Cerrar"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '<p class="exp-kicker">Regalar</p>' +
        '<h3 class="exp-title" id="expTitle">Regala la experiencia <span class="ser" id="expName"></span></h3>' +
        '<p class="exp-sub">Completa el regalo y te llevamos al pago. Te enviamos el comprobante por correo.</p>' +
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
            '<div class="exp-field"><span class="exp-legend">¿En qué formato lo quieres? <span class="req">*</span></span>' +
              '<div class="exp-seg">' +
                '<label><input type="radio" name="Formato" value="Impreso · tarjeta física, se recoge en REVO" required /><span class="exp-opt"><span class="o-name">Impreso</span><span class="o-meta">Tarjeta física · recógela en REVO</span></span></label>' +
                '<label><input type="radio" name="Formato" value="Digital · al momento, lo envía quien compra" /><span class="exp-opt"><span class="o-name">Digital</span><span class="o-meta">Al momento · lo envías tú por WhatsApp o correo</span></span></label>' +
              '</div></div>' +
            '<div class="exp-row">' +
              '<div class="exp-field"><label for="gf-nombre">Para <span class="req">*</span></label><input class="exp-input" id="gf-nombre" name="Para (nombre)" type="text" placeholder="Quien lo recibe" required /></div>' +
              '<div class="exp-field"><label for="gf-de">De parte de <span class="req">*</span></label><input class="exp-input" id="gf-de" name="De parte de" type="text" required /></div>' +
            '</div>' +
            '<div class="exp-field"><label for="gf-email">Tu email <span class="req">*</span></label><input class="exp-input" id="gf-email" name="email" type="email" autocomplete="email" placeholder="Para el comprobante de pago" required /></div>' +
            '<div class="exp-field"><label for="gf-ded">Dedicatoria</label><textarea class="exp-input" id="gf-ded" name="Dedicatoria" placeholder="Opcional — la incluimos en el regalo"></textarea></div>' +
          '</fieldset>' +
          '<button class="exp-submit" id="expSubmit" type="submit">Continuar al pago</button>' +
          '<p class="exp-error" id="expError" role="alert" hidden></p>' +
          '<p class="exp-foot-note"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span>Pago seguro · lo gestiona REVO Studios</span></p>' +
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
    submitBtn.disabled = false; submitBtn.classList.remove('is-loading'); submitBtn.textContent = 'Continuar al pago';
    var precio = actual.precio ? actual.precio + '€' : '';
    var c = cfg();
    elName.textContent = actual.exp || '';
    // lo que la persona ya escribió en la página (p. ej. la tarjeta del test de /navidad)
    if (actual.para) f['Para (nombre)'].value = String(actual.para).slice(0, 60);
    if (actual.dedicatoria) f['Dedicatoria'].value = String(actual.dedicatoria).slice(0, 400);
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
    var wa = 'https://wa.me/34613505881?text=' + encodeURIComponent('Hola, quiero regalar la experiencia ' + title + '. ¿Me ayudáis?');
    close();
    if (window.REVO && window.REVO.reservar) window.REVO.reservar({ url: url, title: title, whatsapp: wa, whatsappLabel: 'Escríbenos por WhatsApp' });
    else window.location.href = url;
  }

  function enviar(e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    errBox.hidden = true;
    submitBtn.disabled = true; submitBtn.classList.add('is-loading'); submitBtn.textContent = 'Enviando…';
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
            if (j && j.ok && j.codigo) { try { localStorage.setItem('revo_regalo', JSON.stringify({ c: j.codigo, t: Date.now(), v: Number(actual.precio) || 0, n: String(actual.exp || '').slice(0, 60) })); } catch (_e) {} }
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
        submitBtn.disabled = false; submitBtn.classList.remove('is-loading'); submitBtn.textContent = 'Continuar al pago';
        errBox.hidden = false; errBox.textContent = 'No hemos podido enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o escríbenos a hello@revostudios.eu.';
      });
  }

  window.REVO = window.REVO || {};
  window.REVO.regalar = open;
  window.REVO.regalarCerrar = close;
})();
