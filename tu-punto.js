/* Lógica de la landing «Tu punto de partida», versión con tres preguntas (/tu-punto). Sin dependencias.
   - Tres preguntas (el porcentaje, lo que ya hace, dónde lo notaría), un resultado y la invitación.
   - Navegación por hash (#paso-2 · #paso-3 · #resultado · #invitacion) para que el botón «atrás» del
     navegador funcione siempre. Las respuestas se guardan en sessionStorage: recargar en el resultado
     vuelve a enseñar el resultado, y mueren al cerrar la pestaña.
   - Cada paso manda un evento a POST /api/landing-evento, con los MISMOS nombres que /tu-caso
     (api/landing-evento.js y la Platform descartan cualquier otro) y pagina: 'tu-punto'. Sin cookies y sin
     ningún dato personal. El porcentaje y lo que ya hace viajan dentro de `datos`.
   - El enlace de Momence es window.REVO_TU_PUNTO_URL (en la cabecera de tu-punto.html).
   - El texto vive en tu-punto-contenido.js. */
(function () {
  'use strict';
  var C = window.TU_PUNTO;
  if (!C) return;
  var T = C.TEXTOS, FOTO = C.FOTO;
  var MOMENCE = window.REVO_TU_PUNTO_URL || 'https://www.revostudios.eu/visita';

  /* ---------- parámetros del enlace ---------- */
  var params = new URLSearchParams(location.search);
  var utmContent = (params.get('utm_content') || '').slice(0, 120);
  var utmSource = (params.get('utm_source') || '').slice(0, 60);

  /* ---------- sesión: id aleatorio que muere al cerrar la pestaña ---------- */
  function leer(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function guardar(k, x) { try { sessionStorage.setItem(k, x); } catch (e) {} }
  function idAleatorio() {
    var out = '';
    try {
      var b = new Uint8Array(16); crypto.getRandomValues(b);
      for (var i = 0; i < b.length; i++) out += (b[i] < 16 ? '0' : '') + b[i].toString(16);
    } catch (e) {
      while (out.length < 32) out += Math.random().toString(36).slice(2);
      out = out.slice(0, 32);
    }
    return out;
  }
  var sesion = leer('tp_sesion');
  if (!sesion || !/^[a-z0-9]{8,64}$/.test(sesion)) { sesion = idAleatorio(); guardar('tp_sesion', sesion); }

  /* ---------- eventos ---------- */
  function evento(nombre, datos) {
    var cuerpo = JSON.stringify({
      sesion: sesion,
      evento: nombre,
      datos: datos || {},
      v: 'a',
      utm_content: utmContent,
      utm_source: utmSource,
      pagina: 'tu-punto',
      ts: new Date().toISOString()
    });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon('/api/landing-evento', new Blob([cuerpo], { type: 'application/json' }))) return;
    } catch (e) {}
    try {
      fetch('/api/landing-evento', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- tiempo en cada pantalla y hasta dónde baja (como en /tu-caso) ----------
     Al salir de una pantalla se manda UN evento `tiempo` con los segundos y el % de la página visto.
     Pantallas: inicio (el porcentaje) · q2 (las otras dos preguntas) · resultado. */
  var pant = null, pantDesde = 0, scrollMax = 0;
  function medirScroll() {
    var alto = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) || 1;
    var visto = Math.round(((window.scrollY || window.pageYOffset || 0) + window.innerHeight) / alto * 100);
    if (visto > scrollMax) scrollMax = Math.min(100, visto);
  }
  function cierraPantalla() {
    if (!pant) return;
    medirScroll();
    var seg = Math.round((Date.now() - pantDesde) / 1000);
    if (seg >= 1) evento('tiempo', { pantalla: pant, segundos: Math.min(seg, 3600), scroll: scrollMax });
    pant = null;
  }
  function abrePantalla(nombre) {
    cierraPantalla();
    pant = nombre; pantDesde = Date.now(); scrollMax = 0;
    setTimeout(medirScroll, 300);
  }
  window.addEventListener('scroll', medirScroll, { passive: true });
  window.addEventListener('pagehide', cierraPantalla);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') { var p = pant; cierraPantalla(); pant = p; pantDesde = Date.now(); scrollMax = 0; }
  });

  /* ---------- respuestas ---------- */
  var S = { p: 80, tocado: false, haces: [], area: null };
  try {
    var g = JSON.parse(leer('tp_estado') || 'null');
    if (g && typeof g.p === 'number' && g.p >= 50 && g.p <= 100 && Array.isArray(g.haces)) S = g;
  } catch (e) {}
  function guarda() { guardar('tp_estado', JSON.stringify(S)); }
  function f() { return (S.p - 50) / 50; }
  function porTramo(tabla) { for (var i = 0; i < tabla.length; i++) if (S.p >= tabla[i][0]) return tabla[i]; return tabla[tabla.length - 1]; }

  /* ---------- piezas comunes ---------- */
  var app = document.getElementById('app');
  var I = {
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    atras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    visto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    lado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>'
  };
  var navegado = false;   // true en cuanto ha habido un cambio de hash dentro de la página

  function cab(derecha) {
    return '<header class="cab"><div class="w"><img src="' + FOTO + 'revo-logo-white.webp" alt="' + T.logoAlt + '" width="2253" height="819">' +
      (derecha || '<span class="donde">' + T.donde + '</span>') + '</div></header>';
  }
  function pinta(html) {
    app.innerHTML = html;
    window.scrollTo(0, 0);
    var t = app.querySelector('[data-titulo]');
    if (t && navegado) { t.setAttribute('tabindex', '-1'); try { t.focus({ preventScroll: true }); } catch (e) {} }
  }
  function ir(nombre) { if (location.hash.replace('#', '') === nombre) render(); else location.hash = nombre; }
  function botonReservar(desde, clase) {
    return '<a class="boton' + (clase ? ' ' + clase : '') + '" href="' + MOMENCE + '" data-reservar="' + desde + '" data-title="Tu punto de partida">' + T.reservar + '</a>';
  }
  function whatsapp(pregunta, desde) {
    return '<p class="wa">' + pregunta + ' <a href="' + C.WHATSAPP + '" target="_blank" rel="noopener" data-wa="' + desde + '">' + T.waEnlace + '</a></p>';
  }

  /* marco común de las tres preguntas */
  function escena(n, dentro, derecha) {
    var tramos = [1, 2, 3].map(function (i) { return '<i' + (i <= n ? ' class="on"' : '') + '></i>'; }).join('');
    return '<section class="escena grano" style="--f:' + f() + '"><div class="foto"></div><div class="sombra"></div><div class="aurora"></div>' + cab(derecha) +
      '<div class="w escena-w"><div class="lado-izq">' +
        '<div class="tramos" role="img" aria-label="Pregunta ' + n + ' de 3">' + tramos + '</div>' +
        '<div class="cuerpo entra">' + dentro + '</div></div>' +
        '<div class="vitrina" aria-hidden="true"><img src="' + FOTO + 'metodo-diagnostico.webp" alt="" width="2000" height="1334"></div>' +
      '</div></section>';
  }
  function atras() { return '<button type="button" data-atras>' + I.atras + T.atras + '</button>'; }
  function alVolver(destino) {
    app.querySelector('[data-atras]').addEventListener('click', function () {
      if (navegado && history.length > 1) history.back(); else ir(destino);
    });
  }

  /* ---------- 1 · el porcentaje ---------- */
  function paso1() {
    abrePantalla('inicio');
    pinta(escena(1,
      '<div class="arriba">' +
        '<p class="ojo">' + T.ojo1 + '</p>' +
        '<h1 class="t1" data-titulo><span class="linea">' + T.titular1a + '</span> <span class="linea">' + T.titular1b + '</span></h1>' +
      '</div>' +
      '<div class="medida">' +
        '<label for="porcentaje">' + T.pregunta1 + '</label>' +
        '<div class="cifra" aria-hidden="true"><span id="cifra">' + S.p + '</span><small>%</small></div>' +
        '<div class="regla" id="regla"><span class="hecho"></span><span class="resto"></span>' +
          '<input type="range" id="porcentaje" min="50" max="100" step="5" value="' + S.p + '" aria-valuetext="' + S.p + ' por ciento"></div>' +
        '<div class="escala" aria-hidden="true"><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span></div>' +
        '<p class="eco" id="eco" aria-live="polite">' + (S.tocado ? porTramo(C.ECO)[1] : T.pista1) + '</p>' +
      '</div>' +
      '<div class="abajo">' +
        '<button type="button" class="boton boton--luz" id="seguir">' + T.continuar + '</button>' +
        '<p class="mini atajo">' + T.nota1 + ' <button type="button" class="enlace" id="directo">' + T.directo + '</button></p>' +
      '</div>'));

    var input = document.getElementById('porcentaje'), marco = app.querySelector('.escena');
    input.addEventListener('input', function () {
      S.p = Number(input.value); S.tocado = true;
      marco.style.setProperty('--f', f());
      document.getElementById('cifra').textContent = S.p;
      input.setAttribute('aria-valuetext', S.p + ' por ciento');
      document.getElementById('eco').textContent = porTramo(C.ECO)[1];
      guarda();
    });
    document.getElementById('seguir').addEventListener('click', function () { guarda(); ir('paso-2'); });
    document.getElementById('directo').addEventListener('click', function () { ir('invitacion'); });
  }

  /* ---------- 2 · lo que ya haces ---------- */
  function paso2() {
    abrePantalla('q2');
    var marcas = C.HACES.map(function (h) {
      return '<button type="button" class="marca" data-h="' + h[0] + '" aria-pressed="' + (S.haces.indexOf(h[0]) > -1) + '">' + h[1] + '<i>' + I.visto + '</i></button>';
    }).join('') + '<button type="button" class="marca ancha" data-h="menos" aria-pressed="' + (S.haces.indexOf('menos') > -1) + '">' + T.menos + '<i>' + I.visto + '</i></button>';
    pinta(escena(2,
      '<div class="arriba">' +
        '<p class="paso">' + T.paso2 + '</p>' +
        '<h1 class="t3" data-titulo>' + T.pregunta2 + '</h1>' +
        '<p class="texto">' + T.pista2 + '</p>' +
        '<div class="marcas">' + marcas + '</div>' +
      '</div>' +
      '<div class="abajo"><button type="button" class="boton boton--luz" id="seguir">' + T.continuar + '</button></div>',
      atras()));
    app.querySelectorAll('.marca').forEach(function (c) {
      c.addEventListener('click', function () {
        var id = c.getAttribute('data-h'), i = S.haces.indexOf(id);
        if (i > -1) S.haces.splice(i, 1);
        else if (id === 'menos') S.haces = ['menos'];
        else { S.haces = S.haces.filter(function (x) { return x !== 'menos'; }); S.haces.push(id); }
        app.querySelectorAll('.marca').forEach(function (x) { x.setAttribute('aria-pressed', S.haces.indexOf(x.getAttribute('data-h')) > -1); });
        guarda();
      });
    });
    alVolver('');
    document.getElementById('seguir').addEventListener('click', function () { ir('paso-3'); });
  }

  /* ---------- 3 · dónde lo notarías ---------- */
  function paso3() {
    abrePantalla('q2');
    var r = 100 - S.p;
    var pregunta = r > 0 ? T.pregunta3.replace('{r}', r) : T.pregunta3cien;
    var botones = C.ORDEN.map(function (id) {
      var a = C.AREAS[id];
      return '<button type="button" class="op" data-a="' + id + '"><span>' + (r === 0 && a.boton100 ? a.boton100 : a.boton) + '</span>' + I.flecha + '</button>';
    }).join('');
    pinta(escena(3,
      '<div class="arriba">' +
        '<p class="paso">' + T.paso3.replace('{p}', S.p) + '</p>' +
        '<h1 class="t3" data-titulo>' + pregunta + '</h1>' +
        '<div class="ops">' + botones + '</div>' +
      '</div><div></div>',
      atras()));
    app.querySelectorAll('[data-a]').forEach(function (b) {
      b.addEventListener('click', function () {
        b.classList.add('elegida');
        S.area = b.getAttribute('data-a'); guarda();
        evento('eligio_tema', { tema: S.area, porcentaje: S.p, haces: S.haces.join(',') });
        setTimeout(function () { ir('resultado'); }, 180);
      });
    });
    alVolver('paso-2');
  }

  /* ---------- piezas de la página de resultado ---------- */
  function fraseHaces() {
    var verbos = C.HACES.filter(function (h) { return S.haces.indexOf(h[0]) > -1; }).map(function (h) { return h[2]; });
    if (!verbos.length) return T.hacesMenos;
    var lista = verbos.length === 1 ? verbos[0] : verbos.slice(0, -1).join(', ') + ' y ' + verbos[verbos.length - 1];
    lista = lista.charAt(0).toUpperCase() + lista.slice(1) + '. ';
    var mide = S.haces.indexOf('reloj') > -1 || S.haces.indexOf('analiticas') > -1;
    return lista + (verbos.length >= 3 ? T.hacesMucho : T.hacesBase) + (mide ? ' ' + T.hacesDatos : '');
  }

  function secResumen() {
    var r = 100 - S.p, t = porTramo(C.TITULARES);
    return '<section class="sec alba grano primera">' + cab('<button type="button" data-cambiar>' + T.cambiar + '</button>') +
      '<div class="w resumen-rejilla entra">' +
        '<div class="pila pila--l">' +
          '<p class="ojo">' + T.ojoResultado + '</p>' +
          '<div class="marcador" style="--p:' + S.p + '" role="img" aria-label="Has dicho ' + S.p + ' por ciento' + (r > 0 ? '. Margen: ' + r + ' por ciento' : '') + '">' +
            '<div class="cifras"><div class="hoy"><span class="rot">' + T.hoy + '</span><b>' + S.p + '<small>%</small></b></div>' +
              (r > 0 ? '<div class="queda"><span class="rot">' + T.margen + '</span><b>' + r + '&nbsp;%</b></div>' : '') + '</div>' +
            '<div class="trazo"><i class="hecho"></i>' + (r > 0 ? '<i class="resto"></i>' : '') + '<i class="punto"></i></div>' +
          '</div>' +
        '</div>' +
        '<div class="pila dicho">' +
          '<h1 class="t2" data-titulo><span class="linea">' + t[1] + '</span> <em class="linea">' + t[2] + '</em></h1>' +
          '<p class="entrada suave">' + fraseHaces() + '</p></div>' +
      '</div></section>';
  }

  function secCombinacion(a, cien) {
    var tarjetas = a.terapias.map(function (id) {
      var t = C.TERAPIAS[id], que = (a.que && a.que[id]) || t.que;
      return '<article class="ter"><div class="marco"><img src="' + FOTO + t.foto + '" alt="" loading="lazy" decoding="async" style="object-position:' + t.pos + '"></div>' +
        '<div class="txt"><p class="meta">' + t.meta + '</p><h3>' + t.nombre + '</h3><p class="que">' + que + '</p></div></article>';
    }).join('');
    return '<section class="sec papel"><div class="w pila pila--l">' +
      '<div class="pila"><p class="ojo">' + (cien ? T.ojoConservar : T.ojoNotarias) + '</p>' +
        '<p class="apunte">' + (cien ? C.AREAS.todo.apunte : a.apunte) + '</p></div>' +
      '<div class="pila"><p class="ojo">' + T.ojoCombinar + '</p>' +
        '<p class="texto medio">' + T.combinar.replace('{tema}', a.tema) + '</p>' +
        '<div class="terapias" tabindex="0" role="group" aria-label="Terapias">' + tarjetas + '</div>' +
        '<p class="mini desliza" aria-hidden="true">' + T.desliza + I.lado + '</p>' +
        '<p class="texto medio cierre-nota">' + T.criterio + '</p></div>' +
    '</div></section>';
  }

  function ficha() {
    return '<div class="ficha"><header><b>' + T.fichaTitulo + '</b><span>' + T.fichaEstado + '</span></header><ul>' +
      C.FICHA.map(function (m) { return '<li><b>' + m[0] + '</b><i>' + m[1] + '</i><p>' + m[2] + '</p></li>'; }).join('') +
    '</ul></div>';
  }

  function secInvitacion(primera) {
    var pasos = C.PASOS.map(function (p, i) {
      return '<li><span class="num">' + (i + 1) + '</span><div class="txt"><h3>' + p[0] + '</h3><p class="texto">' + p[1] + '</p>' + (i === 1 ? ficha() : '') + '</div></li>';
    }).join('');
    var claves = (C.MINUTOS ? [C.MINUTOS + ' minutos'] : []).concat(T.claves).map(function (c) { return '<li>' + c + '</li>'; }).join('');
    var H = primera ? 'h1' : 'h2';
    return '<section class="sec alba grano' + (primera ? ' primera' : '') + '" id="invitacion">' + (primera ? cab('<button type="button" data-cambiar>' + T.preguntas + '</button>') : '') +
      '<div class="w invita-rejilla' + (primera ? ' entra' : '') + '">' +
        '<div class="resumen-visita">' +
          '<p class="ojo">' + T.ojoInvita + '</p>' +
          '<' + H + ' class="t2"' + (primera ? ' data-titulo' : '') + '>' + T.invita + '</' + H + '>' +
          '<p class="entrada">' + T.oferta + '</p>' +
          '<ul class="claves">' + claves + '</ul>' +
          botonReservar('propuesta', 'boton--luz') +
          whatsapp(T.waAntes, 'propuesta') +
        '</div>' +
        '<div class="pila"><p class="ojo">' + (C.MINUTOS ? T.ojoPasos.replace('{m}', C.MINUTOS) : T.ojoPasosSinMinutos) + '</p><ol class="hilo">' + pasos + '</ol></div>' +
      '</div></section>';
  }

  function secLugar() {
    var fotos = C.FOTOS.map(function (x, i) {
      return '<figure class="' + (i === 0 ? 'grande' : 'alta') + '"><img src="' + FOTO + x[0] + '" alt="' + x[1] + '" width="' + x[2] + '" height="' + x[3] + '" loading="lazy" decoding="async"' + (x[4] ? ' style="object-position:' + x[4] + '"' : '') + '></figure>';
    }).join('');
    return '<section class="sec papel"><div class="w lugar-rejilla">' +
      '<div class="lugar-col">' +
        '<div class="pila lugar-a">' +
          '<p class="ojo">' + T.ojoLugar + '</p>' +
          '<h2 class="t2"><span class="linea">' + T.lugarA + '</span> <span class="linea">' + T.lugarB + '</span></h2>' +
          '<p class="texto medio">' + T.lugar + '</p>' +
        '</div>' +
        '<div class="pila pila--l lugar-c">' +
          '<ul class="datos">' + C.DATOS.map(function (d) { return '<li><b>' + d[0] + '</b><span>' + d[1] + '</span></li>'; }).join('') + '</ul>' +
          '<div class="pila pila--s"><p class="ojo">' + T.ojoEquipo + '</p><ul class="equipo">' +
            C.EQUIPO.map(function (p) { return '<li><b>' + p[0] + '</b><span>' + p[1] + '</span></li>'; }).join('') +
          '</ul></div>' +
        '</div>' +
      '</div>' +
      '<div class="lugar-col">' +
        '<div class="mosaico lugar-b">' + fotos + '</div>' +
        '<blockquote class="cita lugar-d"><p>«' + C.CITA.texto + '»</p><footer>' + C.CITA.quien + '</footer></blockquote>' +
      '</div>' +
    '</div></section>';
  }

  function secDudas() {
    var dudas = C.DUDAS.map(function (d, i) { return '<details data-duda="' + i + '"><summary>' + d[0] + '<i aria-hidden="true"></i></summary><p>' + d[1] + '</p></details>'; }).join('');
    return '<section class="sec papel dudas-sec" id="dudas"><div class="w"><div class="dudas-rejilla pila pila--l">' +
      '<div class="pila"><p class="ojo">' + T.ojoDudas + '</p><h2 class="t3">' + T.dudas + '</h2></div>' +
      '<div class="pila"><div class="dudas">' + dudas + '</div>' + whatsapp(T.waOtra, 'dudas') + '</div>' +
    '</div></div></section>';
  }

  function secFinal() {
    return '<section class="alba grano final"><div class="w">' +
      '<div class="lema medio">' +
        '<h2 class="t1"><span class="linea">' + T.lemaA + '</span> <em class="linea">' + T.lemaB + '</em></h2>' +
        '<p class="entrada suave">' + T.cierre + '</p>' +
        botonReservar('cierre', 'boton--luz') +
      '</div>' +
      '<footer class="pie"><img src="' + FOTO + 'revo-logo-white.webp" alt="' + T.logoAlt + '" width="2253" height="819">' +
        '<div class="lineas"><b>' + T.marca + '</b>' +
          '<span>' + T.direccion + '</span>' +
          '<span>' + T.horario + '</span>' +
          '<span>' + T.legal + '</span>' +
          '<span><a href="privacidad.html">' + T.privacidad + '</a> · <button type="button" data-cookies>' + T.cookies + '</button></span></div></footer>' +
    '</div></section>';
  }

  function flota() { return '<div class="flota" id="flota"><div class="w">' + botonReservar('fijo', '') + '</div></div>'; }

  function activaResultado(tema) {
    app.querySelector('[data-cambiar]').addEventListener('click', function () { evento('cambio_tema', { desde: tema }); ir(''); });
    app.querySelectorAll('[data-reservar]').forEach(function (b) {
      // El evento sale por sendBeacon antes de saltar; Momence se abre en la misma pestaña.
      b.addEventListener('click', function () { evento('pulso_reservar', { tema: tema, desde: b.getAttribute('data-reservar') }); });
    });
    app.querySelectorAll('[data-wa]').forEach(function (a) {
      a.addEventListener('click', function () { evento('pulso_whatsapp', { tema: tema, desde: a.getAttribute('data-wa') }); });
    });
    app.querySelectorAll('[data-duda]').forEach(function (d) {
      d.addEventListener('toggle', function () { if (d.open) evento('abrio_duda', { duda: C.DUDAS[d.getAttribute('data-duda')][0] }); });
    });
    var cookies = app.querySelector('[data-cookies]');
    if (cookies) cookies.addEventListener('click', function () { if (window.revoCookies && window.revoCookies.open) window.revoCookies.open(); });

    // Botón que acompaña: aparece al pasar la primera sección y se esconde si ya hay otro botón de reservar a la vista.
    var caja = document.getElementById('flota'), primera = app.querySelector('.primera');
    var otros = [].slice.call(app.querySelectorAll('[data-reservar]')).filter(function (b) { return !caja.contains(b); });
    function pon() {
      if (!document.body.contains(caja)) { window.removeEventListener('scroll', pon); return; }
      var alto = window.innerHeight;
      var pasada = primera.getBoundingClientRect().bottom < alto * .35;
      var hayOtro = otros.some(function (b) { var q = b.getBoundingClientRect(); return q.bottom > 0 && q.top < alto - 70; });
      caja.classList.toggle('on', pasada && !hayOtro);
    }
    window.addEventListener('scroll', pon, { passive: true });
    pon();

    if ('IntersectionObserver' in window) {
      var llego = false, vioDudas = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting && !llego) { llego = true; evento('llego_propuesta', { tema: tema }); }
      }, { threshold: .15 }).observe(document.getElementById('invitacion'));
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting && !vioDudas) { vioDudas = true; evento('vio_dudas', { tema: tema }); }
      }, { threshold: .2 }).observe(document.getElementById('dudas'));
    }
  }

  /* ---------- resultado y camino directo ---------- */
  function resultado() {
    var a = C.AREAS[S.area];
    if (!a) { ir(''); return; }
    abrePantalla('resultado');
    pinta(secResumen() + secCombinacion(a, S.p >= 100) + secInvitacion(false) + secLugar() + secDudas() + secFinal() + flota());
    evento('vio_resultado', { tema: S.area, porcentaje: S.p });
    activaResultado(S.area);
  }
  function invitacion() {
    abrePantalla('resultado');
    pinta(secInvitacion(true) + secLugar() + secDudas() + secFinal() + flota());
    evento('eligio_tema', { tema: 'directo' });
    evento('vio_resultado', { tema: 'directo' });
    activaResultado('directo');
  }

  function render() {
    var h = location.hash.replace('#', '');
    if (h === 'paso-2') return paso2();
    if (h === 'paso-3') return paso3();
    if (h === 'resultado') return resultado();
    if (h === 'invitacion') return invitacion();
    paso1();
  }
  window.addEventListener('hashchange', function () { navegado = true; render(); });

  /* ---------- que el aviso de cookies no tape el botón en el móvil ----------
     Mientras el aviso está abierto, la página deja abajo su alto libre. revo-cookies.js lo pinta antes
     que esta página (los dos van con defer, él primero) y avisa con el evento revo:consent al cerrarse. */
  function ajustaAviso() {
    var b = document.querySelector('.rc-banner');
    var alto = (b && window.innerWidth < 900) ? b.offsetHeight + 12 : 0;
    document.documentElement.style.setProperty('--rc-alto', alto + 'px');
  }
  window.addEventListener('resize', ajustaAviso);
  document.addEventListener('revo:consent', function () { document.documentElement.style.setProperty('--rc-alto', '0px'); });

  if (!leer('tp_abrio')) { guardar('tp_abrio', '1'); evento('abrio', {}); }
  render();
  ajustaAviso();
  setTimeout(ajustaAviso, 600);
})();
