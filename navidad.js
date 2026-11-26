/* Campaña de Navidad 2026 (/navidad). Pinta la página con los textos de navidad-contenido.js.
   - El canal (?c=) y los utm_* se guardan 30 días en este navegador y viajan en el regalo (correo al equipo y,
     con ENVIAR_CANAL, a la Platform) y en el sorteo.
   - Medición: los MISMOS eventos que las landings (api/landing-evento.js descarta cualquier otro), con
     pagina: 'navidad'. Sin cookies: un id aleatorio por pestaña (clave propia `nv_sesion`, no la de /tu-punto,
     para que reserva-hecha.html no confunda a quien viene de aquí con quien viene de la landing).
     abrio {canal} · pulso_reservar {desde: tarjeta|test|resultado, exp} · eligio_tema {tema: exp, para, dia, deseo}
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
  // alias: «estudio» (como lo escribe María) es el mismo canal que «studio» (el de los QR ya impresos). Los canales que
  // la Platform aún no conoce (conserjes, exmiembros, leads…) se guardan igual y viajan con la compra.
  var ALIAS = N.ALIAS_CANAL || {};
  function normaliza(c) { return ALIAS[c] || c; }
  var cNuevo = normaliza(String(qs.get('c') || '').toLowerCase().trim());
  var utmNuevo = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { var v = qs.get(k); if (v) utmNuevo[k] = String(v).slice(0, 120); });
  if (/^[a-z0-9-]{1,40}$/.test(cNuevo) || Object.keys(utmNuevo).length) {
    origen = { c: /^[a-z0-9-]{1,40}$/.test(cNuevo) ? cNuevo : (origen && origen.c) || '', u: Object.keys(utmNuevo).length || /^[a-z0-9-]{1,40}$/.test(cNuevo) ? utmNuevo : (origen && origen.u) || {}, t: Date.now() };
    lset('nv_origen', JSON.stringify(origen));
  }
  if (origen && origen.c && ALIAS[origen.c]) { origen.c = ALIAS[origen.c]; lset('nv_origen', JSON.stringify(origen)); }
  var canal = (origen && origen.c) || '';
  var utm = (origen && origen.u) || {};
  var REF = canal ? ' (ref: ' + canal + ')' : '';   // al final del mensaje de WhatsApp a REVO: de qué canal viene
  var utmTexto = Object.keys(utm).map(function (k) { return k + '=' + utm[k]; }).join(' · ');

  window.REVO = window.REVO || {};
  window.REVO.regalarConfig = {
    canal: canal, utm: utmTexto, enviarCanal: !!N.ENVIAR_CANAL, origen: 'Web REVO · Navidad' + (N.IDIOMA === 'en' ? ' (EN)' : ''), textos: N.VENTANA,
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
    var d = datos || {}; if (canal) d.canal = canal; if (N.IDIOMA && N.IDIOMA !== 'es') d.idioma = N.IDIOMA;
    var cuerpo = JSON.stringify({ sesion: sesion, evento: nombre, datos: d, v: 'a', utm_content: String(utm.utm_content || '').slice(0, 120), utm_source: String(utm.utm_source || '').slice(0, 60), pagina: 'navidad', ts: new Date().toISOString() });
    try { if (navigator.sendBeacon && navigator.sendBeacon('/api/landing-evento', new Blob([cuerpo], { type: 'application/json' }))) return; } catch (e) {}
    try { fetch('/api/landing-evento', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true }).catch(function () {}); } catch (e) {}
  }

  /* ---------- cabecera: el texto manda el del contenido ---------- */
  document.querySelectorAll('[data-t]').forEach(function (el) {
    var p = el.getAttribute('data-t').split('.'), v = N[p[0]] && N[p[0]][p[1]];
    if (v) el.innerHTML = fmt(v);
  });

  /* ---------- idioma: el enlace de arriba lleva a la otra versión, con el mismo canal ---------- */
  (function () {
    var a = document.getElementById('idioma'); if (!a || !N.OTRO_IDIOMA) return;
    var ruta = location.pathname.replace(/\.html$/, '');
    var otra = N.IDIOMA === 'en' ? ruta.replace(/^\/en(?=\/)/, '') : '/en' + ruta;
    a.href = otra + location.search; a.textContent = N.OTRO_IDIOMA.t; a.setAttribute('hreflang', N.OTRO_IDIOMA.lang);
    a.hidden = false;
  })();

  /* ---------- secciones ---------- */
  var h = '';

  // la oferta: hueco vacío; solo se rellena si la Platform dice que está activa (ver «la Platform» más abajo)
  h += '<div id="ofertaSitio"></div>';

  // qué es REVO
  var Q = N.QUE_ES;
  if (Q) h += '<section class="quees"><picture class="quees-foto" aria-hidden="true"><source media="(min-width:700px)" srcset="/assets/nv-fachada.webp" /><img loading="lazy" decoding="async" src="/assets/nv-fachada-v.webp" alt="" /></picture>' +
    '<div class="w quees-in"><p class="ojo">' + fmt(Q.rotulo) + '</p><h2 class="quees-titulo">' + fmt(Q.titulo) + '</h2><p class="quees-texto">' + fmt(Q.texto) + '</p></div></section>';

  // las seis experiencias
  h += '<section class="papel" id="experiencias"><div class="w">' +
    '<h2 class="t2">' + fmt(N.EXPERIENCIAS_TITULO) + '</h2>' +
    '<p class="texto cabeza-texto">' + fmt(N.EXPERIENCIAS_ENTRADA) + '</p><div class="rejilla">';
  N.EXPERIENCIAS.forEach(function (x, k) {
    h += '<article class="exp aparece" id="exp-' + esc(x.id) + '">' +
      '<div class="exp-cuerpo"><h3 class="exp-nombre">' + esc(x.nombre) + '</h3><p class="exp-lema">' + fmt(x.lema) + '</p>' +
      '<ol class="exp-pasos">' + x.pasos.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ol>' +
      '<p class="exp-meta"><span>' + esc(x.dur) + '</span><span class="exp-precio">' + esc(x.precio) + ' €</span></p>' +
      '<button class="boton boton--tinta" type="button" data-regalar="' + esc(x.id) + '" data-desde="tarjeta">' + fmt(N.BOTON_REGALAR) + '</button>' +
      '<a class="enlace-tinta" href="' + esc(N.RECIBE.demo + x.id) + '" target="_blank" rel="noopener">' + fmt(N.VER_REGALO) + '</a>' +
      '</div></article>';
  });
  h += '</div>';
  // «¿No sabes cuál?»: una tarjeta dentro de las experiencias que abre el test (Eric, 26-nov)
  var T = N.TEST;
  h += '<div class="encuentra" id="encuentra"><div class="encuentra-txt"><p class="ojo">' + fmt(T.rotulo) + '</p><h3 class="t3">' + fmt(T.titulo) + '</h3>' +
    '<p class="texto">' + fmt(T.entrada) + '</p></div>' +
    '<div class="encuentra-cta"><button class="boton boton--luz" type="button" data-abrir-test>' + fmt(T.empezar) + '</button><p class="mini">' + fmt(T.duracion) + '</p></div></div>';
  h += '</div></section>';

  // la experiencia de más, en grande: hueco vacío, se rellena con la franja
  h += '<div id="masSitio"></div>';

  // así lo recibe
  var R = N.RECIBE;
  h += '<section class="papel" id="recibe"><div class="w">' +
    '<p class="ojo">' + fmt(R.rotulo) + '</p><h2 class="t2">' + fmt(R.titulo) + '</h2><div class="recibe">' +
    // Las dos se mueven (Eric, 26-nov). Digital: un vídeo de la página real del regalo (la de ejemplo de la Platform)
    // deslizándose, dentro de un móvil; se grabó de /regalo/demo?e=longevity y solo corre mientras se ve. Impreso: el
    // sobre que se abre y la tarjeta que se escribe (navidad-sobre.js); si ese fichero no cargara, queda la foto.
    '<div class="recibe-caja recibe-digital"><div class="nt-movil"><div class="nt-movil-pantalla"><video class="recibe-video" muted loop playsinline preload="none" poster="/assets/navidad-regalo.webp" aria-label="' + esc(R.digital.alt) + '"><source src="/assets/navidad-regalo.mp4" type="video/mp4" /></video></div></div>' +
      '<h3 class="t3">' + fmt(R.digital.t) + '</h3><p class="texto">' + fmt(R.digital.d) + '</p>' +
      '<a class="enlace-tinta" href="' + esc(R.demo) + 'longevity" target="_blank" rel="noopener">' + fmt(R.digital.boton) + '</a></div>' +
    '<div class="recibe-caja">' + (window.REVO_SOBRE ? window.REVO_SOBRE.html(R.impreso.alt) : '<div class="recibe-foto"><img loading="lazy" decoding="async" src="' + esc(R.impreso.foto) + '" alt="' + esc(R.impreso.alt) + '" width="1080" height="1350" /></div>') +
      '<h3 class="t3">' + fmt(R.impreso.t) + '</h3><p class="texto">' + fmt(R.impreso.d) + '</p>' +
      '<a class="enlace-tinta" href="https://www.google.com/maps/search/?api=1&amp;query=Carrer%20de%20Ferran%20Agull%C3%B3%2024%2C%2008021%20Barcelona" target="_blank" rel="noopener">' + fmt(R.impreso.boton) + '</a></div>' +
    '</div></div></section>';

  // el sorteo (se rellena solo si el canal lo tiene)
  h += '<section class="noche" id="sorteo" hidden></section>';

  // dudas
  h += '<section class="papel" id="dudas"><div class="w estrecho"><h2 class="t2">' + fmt(N.DUDAS_TITULO) + '</h2><div class="dudas">';
  N.DUDAS.forEach(function (d, k) {
    h += '<details data-n="' + k + '"><summary>' + fmt(d[0]) + '</summary><p class="texto">' + fmt(d[1]) + '</p></details>';
  });
  h += '</div></div></section>';

  // cierre
  h += '<section class="noche cierre"><div class="w estrecho"><p class="t2">' + fmt(N.CIERRE.titulo) + '</p>' +
    '<a class="boton boton--luz" href="' + WA + encodeURIComponent(N.CIERRE.wa + REF) + '" target="_blank" rel="noopener" data-wa="cierre">' + fmt(N.CIERRE.boton) + '</a></div></section>' +
    '<footer class="pie"><div class="w"><p>' + fmt(N.PIE.dir) + '</p>' +
    '<p>' + N.PIE.legal.map(function (l) { return '<a href="' + esc(l[1]) + '">' + fmt(l[0]) + '</a>'; }).join(' · ') + '</p></div></footer>';

  app.insertAdjacentHTML('beforeend', h);

  /* ---------- regalar ---------- */
  function regalar(id, desde, extra) {
    var x = porId(id); if (!x) return;
    evento('pulso_reservar', { desde: desde || 'tarjeta', exp: id });
    extra = extra || {};
    if (window.REVO && window.REVO.regalar) window.REVO.regalar({ exp: x.nombre, precio: x.precio, url: x.url, para: extra.para, dedicatoria: extra.dedicatoria, formato: extra.formato });
    else location.href = x.url;
  }
  app.addEventListener('click', function (e) {
    var b = e.target.closest('[data-regalar]');
    if (b) { regalar(b.getAttribute('data-regalar'), b.getAttribute('data-desde')); return; }
    var w = e.target.closest('[data-wa]');
    if (w) evento('pulso_whatsapp', { desde: w.getAttribute('data-wa') });
  });
  function mideDuda(d) { d.addEventListener('toggle', function () { if (d.open) evento('abrio_duda', { n: Number(d.getAttribute('data-n')) }); }); }
  app.querySelectorAll('.dudas details').forEach(mideDuda);

  /* ---------- «Encuentra su regalo»: la experiencia vive en navidad-test.js ---------- */
  window.NAVIDAD_PAGINA = { regalar: regalar, evento: evento, porId: porId, fmt: fmt, esc: esc, sub: sub };

  /* ---------- el sorteo ---------- */
  var S = N.SORTEO, secS = document.getElementById('sorteo');
  function pintaSorteo(nombre, plazo) {
    var cab = '<div class="w estrecho"><p class="ojo">' + fmt(S.rotulo) + '</p>' +
      '<h2 class="t2">' + fmt(sub((S.titulo_canal && S.titulo_canal[canal]) || S.titulo, { nombre: nombre })) + '</h2>';
    var ahora = Date.now(), forzar = qs.get('sorteo') === '1';
    var abierto = plazo.abierto !== null ? plazo.abierto : (ahora >= plazo.desde && ahora < plazo.hasta);
    if (!forzar && !abierto && ahora >= plazo.desde) return;   // cerrado: no se enseña nada
    if (!forzar && !abierto) {                                 // aún no: solo el aviso de cuándo abre
      secS.innerHTML = cab + '<p class="texto cabeza-texto">' + fmt(sub(S.abre, { desde: fechaTxt(plazo.desde) })) + '</p></div>';
      secS.hidden = false; return;
    }
    secS.innerHTML = cab + '<p class="texto cabeza-texto">' + fmt(S.entrada) + '</p>' +
      '<p class="mini sorteo-premio">' + fmt(sub(S.premio, { hasta: fechaTxt(plazo.hasta - 1), dia: fechaTxt(plazo.dia) })) + '</p>' +
      '<form class="sorteo" id="sorteoForm" novalidate>' +
        '<label class="campo"><span>' + fmt(S.nombre) + '</span><input name="nombre" type="text" autocomplete="name" required maxlength="80" /></label>' +
        '<label class="campo"><span>' + fmt(S.email) + '</span><input name="email" type="email" autocomplete="email" required maxlength="120" /></label>' +
        '<label class="campo"><span>' + fmt(S.telefono) + ' <i>(' + fmt(S.opcional) + ')</i></span><input name="telefono" type="tel" autocomplete="tel" maxlength="30" /></label>' +
        '<input class="trampa" name="web" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
        '<label class="casilla"><input name="novedades" type="checkbox" /><span>' + fmt(S.novedades) + ' <i>(' + fmt(S.opcional) + ')</i></span></label>' +
        '<button class="boton boton--luz" type="submit">' + fmt(S.boton) + '</button>' +
        '<p class="mini">' + sub(esc(S.acepto), { bases: '<a href="' + esc(S.enlaceBases) + '" target="_blank" rel="noopener">' + esc(S.bases.toLowerCase()) + '</a>', privacidad: '<a href="' + esc(S.enlacePrivacidad) + '" target="_blank" rel="noopener">' + esc(S.privacidad) + '</a>' }) + '</p>' +
        '<p class="mini">' + fmt(S.legal) + '</p>' +
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
      }) }).then(function (r) { return r.json().catch(function () { return {}; }); }).then(function (j) {
        if (!j || !j.ok) {
          var er = new Error('no'); er.motivo = j && j.motivo;
          // fuera de plazo: 409 = aún no abre (con su fecha), 410 = ya cerró
          if (er.motivo === 'fechas' && j.desde && Date.now() < fecha(j.desde)) { er.texto = sub(S.abre, { desde: fechaTxt(fecha(j.desde)) }); }
          throw er;
        }
        fo.querySelectorAll('.campo, .casilla, button').forEach(function (x) { x.hidden = true; });
        msg.hidden = false; msg.textContent = S.hecho;
      }).catch(function (er) {
        // motivos de la Platform: datos (400) · canal (404) · fechas (410) · demasiados (429)
        btn.disabled = false; msg.hidden = false;
        msg.textContent = (er && er.texto) || (er && er.motivo && S.errores && S.errores[er.motivo]) || S.error;
      });
    });
  }
  function ponPartner(nombre) {
    var p = document.getElementById('partner');
    if (p && nombre && N.CABECERA.partner) { p.innerHTML = fmt(sub(N.CABECERA.partner, { nombre: nombre })); p.hidden = false; }
  }
  /* ---------- fechas ---------- */
  // 'AAAA-MM-DD' se lee como día de Madrid (+01:00 en invierno); una fecha con hora se respeta tal cual.
  function fecha(v, finDeDia) {
    if (!v) return NaN;
    var t = /^\d{4}-\d{2}-\d{2}$/.test(String(v)) ? Date.parse(v + 'T00:00:00+01:00') : Date.parse(v);
    return isNaN(t) ? NaN : (finDeDia ? t + 864e5 : t);
  }
  function partes(t) {   // día y mes en Madrid, sin depender del reloj del móvil
    try {
      var f = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'numeric', year: 'numeric' }).formatToParts(new Date(t));
      var o = {}; f.forEach(function (p) { o[p.type] = Number(p.value); }); return o;
    } catch (e) { var d = new Date(t); return { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() }; }
  }
  function fechaTxt(t) { var p = partes(t); return sub(N.FECHA, { dia: p.day, mes: N.MESES[p.month - 1] }); }
  function primero(lista) { for (var i = 0; i < lista.length; i++) if (lista[i] != null && lista[i] !== '') return lista[i]; return null; }

  /* ---------- la oferta (solo si la Platform la tiene activa) ---------- */
  function textoOferta(of, camp) {
    var O = N.OFERTA, cuando = O.cuandoDefecto;
    var d = fecha(of.valido_desde), hh = fecha(of.valido_hasta);
    if (!isNaN(d) && !isNaN(hh)) {
      var pd = partes(d), ph = partes(hh);
      cuando = sub(O.cuando, { mesDesde: N.MESES[pd.month - 1], mesHasta: N.MESES[ph.month - 1], anio: ph.year });
    }
    var hasta = fecha(camp && camp.hasta);
    var t = { cuando: cuando, hasta: isNaN(hasta) ? O.hastaDefecto : fechaTxt(hasta),
      para: canal === 'socios' ? O.paraSocios : O.para };   // miembros (canal socios): «para alguien a quien quieras»
    if (of.modo === 'lista') {
      var nombres = (of.experiencias || []).map(function (id) { var x = porId(id); return x && x.nombre; }).filter(Boolean);
      if (!nombres.length) return null;   // una lista vacía no se puede contar: mejor no decir nada
      t.exp = nombres.join(O.o);
    }
    t.Para = t.para.charAt(0).toUpperCase() + t.para.slice(1);
    t.duda = (of.modo === 'lista' ? O.dudaLista : O.dudaElegir).map(function (p) { return sub(p, t); });
    t.pasos = of.modo === 'lista' ? O.bloque.pasosLista : O.bloque.pasosElegir;
    return t;
  }
  function pintaOferta(of, camp) {
    var t = textoOferta(of, camp); if (!t) return;
    var O = N.OFERTA;
    // (la franja de arriba se quitó el 26-nov: Eric, «esto sobra»; queda el bloque)
    document.getElementById('masSitio').innerHTML = '<section class="noche mas" id="una-mas"><div class="w"><h2 class="mas-titulo">' + fmt(O.bloque.titulo) + '</h2><ol class="mas-pasos">' +
      t.pasos.map(function (p, k) { return '<li><span class="mas-num" aria-hidden="true">' + (k + 1) + '</span><div><h3 class="mas-paso">' + fmt(p[0]) + '</h3><p class="texto">' + fmt(sub(p[1], t)) + '</p></div></li>'; }).join('') +
      '</ol><a class="boton boton--luz" href="#experiencias">' + fmt(O.bloque.boton) + '</a></div></section>';
    var dudas = app.querySelector('.dudas');
    if (dudas) {
      var usar = dudas.querySelector('details[data-n="0"] .texto');   // «¿Cuánto tiempo tiene para usarla?»
      if (usar && O.validez) usar.innerHTML += ' ' + fmt(sub(O.validez, t));
      dudas.insertAdjacentHTML('beforeend', '<details id="dudaOferta" data-n="' + N.DUDAS.length + '"><summary>' + fmt(O.duda) + '</summary>' + t.duda.map(function (p) { return '<p class="texto">' + fmt(p) + '</p>'; }).join('') +
        '<a class="enlace-tinta" href="' + WA + encodeURIComponent(O.dudaWa + REF) + '" target="_blank" rel="noopener" data-wa="duda">' + fmt(O.dudaBoton) + '</a></details>');
      mideDuda(dudas.lastElementChild);
    }
    window.NAVIDAD_OFERTA = sub(O.test, t);   // la línea del resultado del test (navidad-test.js)
  }

  /* ---------- la Platform: canal, sorteo y oferta ----------
     Siempre se pregunta (con ?c= si hay canal). Si no contesta en 4 s o contesta mal: sin sorteo, sin oferta, y la
     cabecera con el nombre del centro que tenemos aquí. La compra no depende de esto. */
  // La Platform manda `sorteo: { desde, hasta, abierto }` (0285). Si dice abierto o cerrado, manda ella; las fechas
  // del contenido solo sirven si no contesta o no trae el bloque. El día del sorteo no viene: es SORTEO.DIA.
  function plazoSorteo(j) {
    var so = j && j.sorteo || {}, c = j && j.canal || {};
    var desde = fecha(primero([so.desde, c.sorteo_desde, S.DESDE]));
    var hasta = fecha(primero([so.hasta, c.sorteo_hasta, S.HASTA]), true);
    var dia = fecha(primero([so.dia, c.sorteo_dia, S.DIA]));
    if (isNaN(desde)) desde = fecha(S.DESDE); if (isNaN(hasta)) hasta = fecha(S.HASTA, true); if (isNaN(dia)) dia = fecha(S.DIA);
    return { desde: desde, hasta: hasta, dia: dia, abierto: typeof so.abierto === 'boolean' ? so.abierto : null };
  }
  var previa = qs.get('oferta');   // revisar la oferta sin encenderla: ?oferta=elegir | lista
  function siPrevia() {
    if (previa === 'elegir') pintaOferta({ activa: true, modo: 'elegir', valido_desde: '2027-01-01', valido_hasta: '2027-03-31' }, { desde: '2026-11-26', hasta: '2027-01-05' });
    else if (previa === 'lista') pintaOferta({ activa: true, modo: 'lista', experiencias: ['sleep_stress'], valido_desde: '2027-01-01', valido_hasta: '2027-03-31' }, { desde: '2026-11-26', hasta: '2027-01-05' });
  }
  (function () {
    var ctrl = window.AbortController ? new AbortController() : null;
    if (ctrl) setTimeout(function () { ctrl.abort(); }, 4000);
    fetch(N.PLATFORM + '/api/campana/canal' + (canal ? '?c=' + encodeURIComponent(canal) : ''), ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (j) {
        j = j || {};
        // la oferta: aunque el canal no exista, la oferta es de la campaña
        if (j.oferta && j.oferta.activa === true) pintaOferta(j.oferta, j.campana); else siPrevia();
        if (!j.ok || !j.canal) throw new Error('sin canal');
        if (N.PARTNERS.indexOf(canal) !== -1) ponPartner(j.canal.nombre);   // los partners: goodfit, barrys…
        if (j.canal.sorteo) pintaSorteo(j.canal.nombre, plazoSorteo(j));
      })
      .catch(function () {
        // Sin la Platform: sin sorteo ni oferta. Para revisar: ?sorteo=1 enseña el sorteo y ?oferta=… la oferta.
        if (!document.getElementById('oferta')) siPrevia();
        var nom = N.NOMBRES_PROVISIONALES[canal];
        if (N.PARTNERS.indexOf(canal) !== -1 && nom && document.getElementById('partner').hidden) ponPartner(nom);
        if (qs.get('sorteo') === '1' && nom && secS.hidden) pintaSorteo(nom, plazoSorteo(null));
      });
  })();

  /* ---------- aparecer al bajar ---------- */
  var ap = app.querySelectorAll('.aparece');
  if (reduce || !window.IntersectionObserver) ap.forEach(function (x) { x.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    ap.forEach(function (x) { io.observe(x); });
  }

  /* ---------- así lo recibe: el vídeo y el sobre solo se mueven mientras se ven ---------- */
  if (window.REVO_SOBRE) window.REVO_SOBRE.vigila(app);
  (function () {
    var v = app.querySelector('.recibe-video');
    var ahorro = navigator.connection && navigator.connection.saveData;
    if (!v || reduce || ahorro || !window.IntersectionObserver) return;   // se queda la primera imagen
    new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
      });
    }, { threshold: 0.35 }).observe(v);
  })();

  /* ---------- llegada ---------- */
  evento('abrio', { test: location.hash === '#test' ? 1 : 0 });
  if (location.hash !== '#test' && location.hash && document.querySelector(location.hash)) setTimeout(function () { document.querySelector(location.hash).scrollIntoView(); }, 60);
})();
