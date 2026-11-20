/* Campaña de Navidad 2026 (/navidad). Pinta la página con los textos de navidad-contenido.js.
   - El canal (?c=) y los utm_* se guardan 30 días en este navegador y viajan en el regalo (correo al equipo y,
     con ENVIAR_CANAL, a la Platform) y en el sorteo.
   - Medición: los MISMOS eventos que las landings (api/landing-evento.js descarta cualquier otro), con
     pagina: 'navidad'. Sin cookies: un id aleatorio por pestaña (clave propia `nv_sesion`, no la de /tu-punto,
     para que reserva-hecha.html no confunda a quien viene de aquí con quien viene de la landing).
     abrio {canal} · pulso_reservar {desde: tarjeta|test|resultado, exp} · eligio_tema {tema: exp, pct, cuidado}
     · vio_resultado {exp} · abrio_duda {n} · pulso_whatsapp {desde}
   - Con #test en el enlace, la página se abre en el test (anuncios «con test»). */
(function () {
  'use strict';
  var N = window.NAVIDAD;
  if (!N) return;
  var app = document.getElementById('app');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- utilidades ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(s) { return esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>'); }   // *texto* → cursiva de la casa
  function sub(s, o) { return String(s).replace(/\{(\w+)\}/g, function (_, k) { return o[k] == null ? '' : o[k]; }); }
  function porId(id) { for (var i = 0; i < N.EXPERIENCIAS.length; i++) if (N.EXPERIENCIAS[i].id === id) return N.EXPERIENCIAS[i]; return null; }
  function lget(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  var WA = 'https://wa.me/34613505881?text=';

  /* ---------- canal y utm ---------- */
  var qs; try { qs = new URLSearchParams(location.search); } catch (e) { qs = { get: function () { return null; } }; }
  var origen = null;
  try { origen = JSON.parse(lget('nv_origen') || 'null'); } catch (e) {}
  if (origen && Date.now() - (origen.t || 0) > 30 * 864e5) origen = null;
  var cNuevo = String(qs.get('c') || '').toLowerCase().trim();
  var utmNuevo = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { var v = qs.get(k); if (v) utmNuevo[k] = String(v).slice(0, 120); });
  if (/^[a-z0-9-]{1,40}$/.test(cNuevo) || Object.keys(utmNuevo).length) {
    origen = { c: /^[a-z0-9-]{1,40}$/.test(cNuevo) ? cNuevo : (origen && origen.c) || '', u: Object.keys(utmNuevo).length ? utmNuevo : (origen && origen.u) || {}, t: Date.now() };
    lset('nv_origen', JSON.stringify(origen));
  }
  var canal = (origen && origen.c) || '';
  var utm = (origen && origen.u) || {};
  var utmTexto = Object.keys(utm).map(function (k) { return k + '=' + utm[k]; }).join(' · ');

  window.REVO = window.REVO || {};
  window.REVO.regalarConfig = {
    canal: canal, utm: utmTexto, enviarCanal: !!N.ENVIAR_CANAL, origen: 'Web REVO · Navidad',
    alEnviar: function (d) {
      // a Meta: alguien empieza a pagar (solo con las cookies de marketing aceptadas; lo mira revoTrack)
      if (window.revoTrack) window.revoTrack('InitiateCheckout', { value: Number(d.precio) || 0, currency: 'EUR', content_name: String(d.exp || '').slice(0, 60) });
    }
  };

  /* ---------- eventos ---------- */
  var sesion = sget('nv_sesion');
  if (!sesion || !/^[a-z0-9]{8,64}$/.test(sesion)) {
    sesion = '';
    try { var b = new Uint8Array(16); crypto.getRandomValues(b); for (var i = 0; i < 16; i++) sesion += (b[i] < 16 ? '0' : '') + b[i].toString(16); }
    catch (e) { while (sesion.length < 32) sesion += Math.random().toString(36).slice(2); sesion = sesion.slice(0, 32); }
    sset('nv_sesion', sesion);
  }
  function evento(nombre, datos) {
    var d = datos || {}; if (canal) d.canal = canal;
    var cuerpo = JSON.stringify({ sesion: sesion, evento: nombre, datos: d, v: 'a', utm_content: String(utm.utm_content || '').slice(0, 120), utm_source: String(utm.utm_source || '').slice(0, 60), pagina: 'navidad', ts: new Date().toISOString() });
    try { if (navigator.sendBeacon && navigator.sendBeacon('/api/landing-evento', new Blob([cuerpo], { type: 'application/json' }))) return; } catch (e) {}
    try { fetch('/api/landing-evento', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true }).catch(function () {}); } catch (e) {}
  }

  /* ---------- cabecera: el texto manda el del contenido ---------- */
  document.querySelectorAll('[data-t]').forEach(function (el) {
    var p = el.getAttribute('data-t').split('.'), v = N[p[0]] && N[p[0]][p[1]];
    if (v) el.innerHTML = fmt(v);
  });

  /* ---------- secciones ---------- */
  var h = '';

  // la oferta en una frase
  h += '<section class="oferta" id="oferta"><div class="w estrecho">' +
    '<p class="ojo">' + fmt(N.OFERTA.rotulo) + '</p>' +
    '<p class="oferta-frase t2">' + fmt(N.OFERTA.frase) + '</p>' +
    '<p class="mini">' + fmt(N.OFERTA.letra) + '</p></div></section>';

  // las seis experiencias
  h += '<section class="papel" id="experiencias"><div class="w">' +
    '<h2 class="t2">' + fmt(N.EXPERIENCIAS_TITULO) + '</h2>' +
    '<p class="texto cabeza-texto">' + fmt(N.EXPERIENCIAS_ENTRADA) + '</p><div class="rejilla">';
  N.EXPERIENCIAS.forEach(function (x, k) {
    h += '<article class="exp aparece" id="exp-' + esc(x.id) + '">' +
      '<div class="exp-foto"><img loading="lazy" decoding="async" src="assets/' + esc(x.foto) + '" alt="" style="object-position:' + esc(x.pos || '50% 50%') + '" /></div>' +
      '<div class="exp-cuerpo"><p class="exp-num">' + (k < 9 ? '0' : '') + (k + 1) + ' / ' + (N.EXPERIENCIAS.length < 10 ? '0' : '') + N.EXPERIENCIAS.length + '</p>' +
      '<h3 class="exp-nombre">' + esc(x.nombre) + '</h3><p class="exp-lema">' + fmt(x.lema) + '</p>' +
      '<ol class="exp-pasos">' + x.pasos.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ol>' +
      '<p class="exp-meta"><span>' + esc(x.dur) + '</span><span class="exp-precio">' + esc(x.precio) + ' €</span></p>' +
      '<button class="boton boton--tinta" type="button" data-regalar="' + esc(x.id) + '" data-desde="tarjeta">' + fmt(N.BOTON_REGALAR) + '</button>' +
      '<a class="enlace-tinta" href="' + esc(N.RECIBE.demo + x.id) + '" target="_blank" rel="noopener">' + fmt(N.VER_REGALO) + '</a>' +
      '</div></article>';
  });
  h += '</div></div></section>';

  // el test
  var T = N.TEST;
  h += '<section class="noche" id="test" tabindex="-1"><div class="w estrecho">' +
    '<p class="ojo">' + fmt(T.rotulo) + '</p><h2 class="t2">' + fmt(T.titulo) + '</h2>' +
    '<p class="texto cabeza-texto">' + fmt(T.entrada) + '</p><div class="test" id="testCaja" aria-live="polite"></div></div></section>';

  // así lo recibe
  var R = N.RECIBE;
  h += '<section class="papel" id="recibe"><div class="w">' +
    '<p class="ojo">' + fmt(R.rotulo) + '</p><h2 class="t2">' + fmt(R.titulo) + '</h2><div class="recibe">' +
    '<div class="recibe-caja recibe-digital"><div class="movil" aria-hidden="true"><div class="movil-pantalla">' +
      '<p class="movil-ojo">Un regalo para ti</p><p class="movil-nombre">Para <em>Ana</em></p><p class="movil-exp">Sleep &amp; Stress</p>' +
      '<p class="movil-ded">«Para que este año descanses de verdad.»</p><span class="movil-boton">Reservar mi sesión</span></div></div>' +
      '<h3 class="t3">' + fmt(R.digital.t) + '</h3><p class="texto">' + fmt(R.digital.d) + '</p>' +
      '<a class="enlace-tinta" href="' + esc(R.demo) + 'sleep_stress" target="_blank" rel="noopener">' + fmt(R.digital.boton) + '</a></div>' +
    '<div class="recibe-caja"><div class="recibe-foto"><img loading="lazy" decoding="async" src="assets/' + esc(R.impreso.foto) + '" alt="" /></div>' +
      '<h3 class="t3">' + fmt(R.impreso.t) + '</h3><p class="texto">' + fmt(R.impreso.d) + '</p>' +
      '<a class="enlace-tinta" href="https://www.google.com/maps/search/?api=1&amp;query=Carrer%20de%20Ferran%20Agull%C3%B3%2024%2C%2008021%20Barcelona" target="_blank" rel="noopener">' + fmt(R.impreso.boton) + '</a></div>' +
    '</div></div></section>';

  // el sorteo (se rellena solo si el canal lo tiene)
  h += '<section class="noche" id="sorteo" hidden></section>';

  // dudas
  h += '<section class="papel" id="dudas"><div class="w estrecho"><h2 class="t2">' + fmt(N.DUDAS_TITULO) + '</h2><div class="dudas">';
  N.DUDAS.forEach(function (d, k) { h += '<details data-n="' + k + '"><summary>' + fmt(d[0]) + '</summary><p class="texto">' + fmt(d[1]) + '</p></details>'; });
  h += '</div></div></section>';

  // cierre
  h += '<section class="noche cierre"><div class="w estrecho"><p class="t2">' + fmt(N.CIERRE.titulo) + '</p>' +
    '<a class="boton boton--luz" href="' + WA + encodeURIComponent(N.CIERRE.wa) + '" target="_blank" rel="noopener" data-wa="cierre">' + fmt(N.CIERRE.boton) + '</a></div></section>' +
    '<footer class="pie"><div class="w"><p>REVO Studios · Carrer de Ferran Agulló, 24 · Turó Park, Barcelona</p>' +
    '<p><a href="aviso-legal.html">Aviso legal</a> · <a href="privacidad.html">Privacidad</a> · <a href="cookies.html">Cookies</a></p></div></footer>';

  app.insertAdjacentHTML('beforeend', h);

  /* ---------- regalar ---------- */
  function regalar(id, desde) {
    var x = porId(id); if (!x) return;
    evento('pulso_reservar', { desde: desde || 'tarjeta', exp: id });
    if (window.REVO && window.REVO.regalar) window.REVO.regalar({ exp: x.nombre, precio: x.precio, url: x.url });
    else location.href = x.url;
  }
  app.addEventListener('click', function (e) {
    var b = e.target.closest('[data-regalar]');
    if (b) { regalar(b.getAttribute('data-regalar'), b.getAttribute('data-desde')); return; }
    var w = e.target.closest('[data-wa]');
    if (w) evento('pulso_whatsapp', { desde: w.getAttribute('data-wa') });
  });
  app.querySelectorAll('.dudas details').forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) evento('abrio_duda', { n: Number(d.getAttribute('data-n')) }); });
  });

  /* ---------- el test ---------- */
  var caja = document.getElementById('testCaja');
  var resp = { pct: null, cuidado: null };
  function paso1() {
    var p = T.p1, mid = Math.round((p.min + p.max) / 2);
    caja.innerHTML = '<p class="test-paso">1 / 3</p><h3 class="t3">' + fmt(p.titulo) + ' <span class="pct sin" id="pct">' + mid + '<small>%</small></span></h3>' +
      '<p class="mini">' + fmt(p.ayuda) + '</p>' +
      '<input class="regla sin" id="regla" type="range" min="' + p.min + '" max="' + p.max + '" step="5" value="' + mid + '" aria-label="' + esc(p.titulo) + '" />' +
      '<div class="regla-ejes"><span>' + p.min + ' %</span><span>' + p.max + ' %</span></div>' +
      '<button class="boton boton--luz test-sigue" id="sigue" type="button" hidden>' + fmt(p.boton) + '</button>';
    var r = document.getElementById('regla'), out = document.getElementById('pct'), sigue = document.getElementById('sigue');
    function toca() { out.innerHTML = r.value + '<small>%</small>'; out.classList.remove('sin'); r.classList.remove('sin'); sigue.hidden = false; resp.pct = Number(r.value); }
    r.addEventListener('input', toca); r.addEventListener('change', toca);
    sigue.addEventListener('click', paso2);
  }
  function opciones(lista, cls) {
    return '<div class="test-ops ' + (cls || '') + '">' + lista.map(function (o, k) { return '<button class="op" type="button" data-k="' + k + '">' + fmt(o.t) + '</button>'; }).join('') + '</div>';
  }
  function atras() { return '<button class="test-atras" type="button">Atrás</button>'; }
  function paso2() {
    var p = T.p2;
    caja.innerHTML = '<p class="test-paso">2 / 3</p><h3 class="t3">' + fmt(p.titulo) + '</h3><p class="mini">' + fmt(p.ayuda) + '</p>' + opciones(p.opciones) + atras();
    caja.querySelector('.test-atras').addEventListener('click', paso1);
    caja.querySelectorAll('.op').forEach(function (b) { b.addEventListener('click', function () { resp.cuidado = Number(b.getAttribute('data-k')); paso3(); }); });
    foco();
  }
  function paso3() {
    var p = T.p3;
    caja.innerHTML = '<p class="test-paso">3 / 3</p><h3 class="t3">' + fmt(p.titulo) + '</h3>' + opciones(p.opciones, 'test-ops--deseo') + atras();
    caja.querySelector('.test-atras').addEventListener('click', paso2);
    caja.querySelectorAll('.op').forEach(function (b) { b.addEventListener('click', function () { resultado(Number(b.getAttribute('data-k'))); }); });
    foco();
  }
  // La tercera decide. Si una respuesta de la tercera diera varias experiencias, desempata la segunda.
  function decide(k3) {
    var da = [].concat(T.p3.opciones[k3].da);
    if (da.length === 1) return da[0];
    var p2 = resp.cuidado != null ? T.p2.opciones[resp.cuidado].da : [];
    for (var i = 0; i < da.length; i++) if (p2.indexOf(da[i]) !== -1) return da[i];
    return da[0];
  }
  function resultado(k3) {
    var id = decide(k3), x = porId(id);
    evento('eligio_tema', { tema: id, pct: resp.pct, cuidado: resp.cuidado });
    evento('vio_resultado', { exp: id });
    caja.innerHTML = '<p class="test-paso">' + fmt(sub(T.resultado, { pct: resp.pct })) + '</p>' +
      '<div class="test-res"><div class="test-res-foto"><img src="assets/' + esc(x.foto) + '" alt="" style="object-position:' + esc(x.pos || '50% 50%') + '" /></div>' +
      '<div class="test-res-txt"><h3 class="t2">' + esc(x.nombre) + '</h3><p class="texto">' + fmt(T.porque[id]) + '</p>' +
      '<p class="exp-meta"><span>' + esc(x.dur) + '</span><span class="exp-precio">' + esc(x.precio) + ' €</span></p>' +
      '<button class="boton boton--luz" type="button" data-regalar="' + esc(id) + '" data-desde="test">' + fmt(N.BOTON_REGALAR + ' ' + x.nombre) + '</button>' +
      '<a class="enlace-luz" href="' + esc(N.RECIBE.demo + id) + '" target="_blank" rel="noopener">' + fmt(N.VER_REGALO) + '</a>' +
      '<button class="test-atras" type="button">' + fmt(T.otra) + '</button></div></div>';
    caja.querySelector('.test-atras').addEventListener('click', function () { resp = { pct: null, cuidado: null }; paso1(); foco(); });
    foco();
  }
  function foco() {
    var t = caja.querySelector('.t3, .t2'); if (!t) return;
    var r = caja.getBoundingClientRect();
    if (r.top < 0 || r.top > innerHeight * 0.5) window.scrollTo({ top: scrollY + r.top - 90, behavior: reduce ? 'auto' : 'smooth' });
  }
  caja.addEventListener('click', function (e) { var b = e.target.closest('[data-regalar]'); if (b) { e.stopPropagation(); regalar(b.getAttribute('data-regalar'), 'test'); } });
  paso1();

  /* ---------- el sorteo ---------- */
  var S = N.SORTEO, secS = document.getElementById('sorteo');
  function pintaSorteo(nombre) {
    secS.innerHTML = '<div class="w estrecho"><p class="ojo">' + fmt(S.rotulo) + '</p>' +
      '<h2 class="t2">' + fmt(sub(S.titulo, { nombre: esc(nombre) })) + '</h2><p class="texto cabeza-texto">' + fmt(S.entrada) + '</p>' +
      '<form class="sorteo" id="sorteoForm" novalidate>' +
        '<label class="campo"><span>' + fmt(S.nombre) + '</span><input name="nombre" type="text" autocomplete="name" required maxlength="80" /></label>' +
        '<label class="campo"><span>' + fmt(S.email) + '</span><input name="email" type="email" autocomplete="email" required maxlength="120" /></label>' +
        '<label class="campo"><span>' + fmt(S.telefono) + ' <i>(' + fmt(S.opcional) + ')</i></span><input name="telefono" type="tel" autocomplete="tel" maxlength="30" /></label>' +
        '<input class="trampa" name="web" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
        '<label class="casilla"><input name="novedades" type="checkbox" /><span>' + fmt(S.novedades) + ' <i>(' + fmt(S.opcional) + ')</i></span></label>' +
        '<button class="boton boton--luz" type="submit">' + fmt(S.boton) + '</button>' +
        '<p class="mini">Al apuntarte aceptas las <a href="navidad-bases.html" target="_blank" rel="noopener">' + fmt(S.bases).toLowerCase() + '</a> y nuestra <a href="privacidad.html" target="_blank" rel="noopener">política de privacidad</a>.</p>' +
        '<p class="sorteo-msg" role="status" hidden></p>' +
      '</form></div>';
    secS.hidden = false;
    var fo = document.getElementById('sorteoForm'), msg = fo.querySelector('.sorteo-msg');
    fo.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!fo.checkValidity()) { fo.reportValidity(); return; }
      var btn = fo.querySelector('button'); btn.disabled = true;
      var el = fo.elements;
      fetch(N.PLATFORM + '/api/sorteo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        canal: canal, nombre: el.nombre.value.trim(), email: el.email.value.trim(), telefono: el.telefono.value.trim() || undefined,
        acepta_novedades: !!el.novedades.checked, web: el.web.value
      }) }).then(function (r) { return r.json(); }).then(function (j) {
        if (!j || !j.ok) throw new Error('no');
        fo.querySelectorAll('.campo, .casilla, button').forEach(function (x) { x.hidden = true; });
        msg.hidden = false; msg.textContent = S.hecho;
      }).catch(function () { btn.disabled = false; msg.hidden = false; msg.textContent = S.error; });
    });
  }
  function ponPartner(nombre) {
    var p = document.getElementById('partner');
    if (p && nombre && N.CABECERA.partner) { p.innerHTML = fmt(sub(N.CABECERA.partner, { nombre: esc(nombre) })); p.hidden = false; }
  }
  if (canal) {
    var ctrl = window.AbortController ? new AbortController() : null;
    if (ctrl) setTimeout(function () { ctrl.abort(); }, 4000);
    fetch(N.PLATFORM + '/api/campana/canal?c=' + encodeURIComponent(canal), ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) {
        if (!j || !j.ok || !j.canal) throw new Error('no');
        if (N.PARTNERS.indexOf(canal) !== -1) ponPartner(j.canal.nombre);   // los partners: goodfit, barrys…
        if (j.canal.sorteo) pintaSorteo(j.canal.nombre);
      })
      .catch(function () {
        // Sin la puerta de la Platform: sin sorteo. Solo para revisar la maqueta, ?sorteo=1 lo enseña igualmente.
        var nom = N.NOMBRES_PROVISIONALES[canal];
        if (N.PARTNERS.indexOf(canal) !== -1 && nom) ponPartner(nom);
        if (qs.get('sorteo') === '1' && nom) pintaSorteo(nom);
      });
  }

  /* ---------- aparecer al bajar ---------- */
  var ap = app.querySelectorAll('.aparece');
  if (reduce || !window.IntersectionObserver) ap.forEach(function (x) { x.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    ap.forEach(function (x) { io.observe(x); });
  }

  /* ---------- llegada ---------- */
  evento('abrio', { test: location.hash === '#test' ? 1 : 0 });
  if (location.hash === '#test') setTimeout(function () { var t = document.getElementById('test'); t.scrollIntoView({ behavior: 'auto' }); t.focus({ preventScroll: true }); }, 60);
  else if (location.hash && document.querySelector(location.hash)) setTimeout(function () { document.querySelector(location.hash).scrollIntoView(); }, 60);
})();
