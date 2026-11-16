/* Lógica de la landing «Tu punto de partida» (/tu-punto). Sin dependencias.
   Versión única del 16-nov-2026: las tres preguntas y la invitación de la primera versión, con el vídeo de fondo,
   el lenguaje y las secciones de la propuesta del equipo (/tu-punto-v2).
   - Tres preguntas (el porcentaje, lo que ya hace, dónde lo notaría) y una página de resultado: lo que ha
     contado, su bloque (qué le pasa y qué terapias ayudan), todas las terapias, lo que dicen los miembros,
     quién está detrás, la invitación, el lugar y las dudas. Quien no quiere contestar ve la misma página con
     el bloque del perfil de su anuncio.
   - Navegación por hash (#paso-2 · #paso-3 · #resultado · #ver) para que el botón «atrás» del
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
  // Perfil del anuncio: «icp1», «icp2»… en cualquier parte de utm_content (la misma norma que /punto-de-partida).
  var icp = utmContent.match(/icp(\d+)/i);
  var perfil = icp ? 'icp' + parseInt(icp[1], 10) : '';
  var paraAnuncio = (C.PERFILES && C.PERFILES[perfil]) || '';
  var areaAnuncio = (C.PERFIL_AREA && C.PERFIL_AREA[perfil]) || C.AREA_SIN_PERFIL;

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
    lado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
    abajo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16M6 14l6 6 6-6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
    ir: '<svg class="ir" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>'
  };
  var CALMA = false;
  try { CALMA = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var navegado = false;   // true en cuanto ha habido un cambio de hash dentro de la página

  /* ---------- el vídeo de fondo de las tres preguntas ----------
     Vive fuera de #app (tu-punto.html) para que no se corte al pasar de una pregunta a otra. Vertical en el
     móvil y apaisado en el ordenador. No se carga con «reducir movimiento» ni con ahorro de datos: se queda la foto. */
  var video = document.getElementById('video'), videoListo = false;
  function fondo(visible) {
    document.body.classList.toggle('con-fondo', visible);
    if (!video) return;
    var ahorro = false;
    try { ahorro = !!(navigator.connection && navigator.connection.saveData); } catch (e) {}
    if (CALMA || ahorro) return;
    if (visible) {
      if (!videoListo) {
        videoListo = true;
        video.src = FOTO + (window.matchMedia('(min-width: 900px)').matches ? 'hero-video-1080.mp4' : 'hero-video-mobile.mp4');
      }
      var p = video.play && video.play();
      if (p && p.catch) p.catch(function () {});
    } else if (videoListo) { try { video.pause(); } catch (e) {} }
  }

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
    return '<a class="boton' + (clase ? ' ' + clase : '') + '" href="' + MOMENCE + '" data-reservar="' + desde + '" data-title="Tu punto de partida"><span>' + T.reservar + '</span>' + I.ir + '</a>';
  }
  function whatsapp(pregunta, desde) {
    return '<p class="wa">' + pregunta + ' <a href="' + C.WHATSAPP + '" target="_blank" rel="noopener" data-wa="' + desde + '">' + T.waEnlace + '</a></p>';
  }

  /* marco común de las tres preguntas */
  function escena(n, dentro, derecha) {
    var tramos = [1, 2, 3].map(function (i) { return '<i' + (i <= n ? ' class="on"' : '') + '></i>'; }).join('');
    fondo(true);
    return '<section class="escena grano" style="--f:' + f() + '"><div class="sombra"></div><div class="aurora"></div>' + cab(derecha) +
      '<div class="w escena-w"><div class="lado-izq">' +
        '<div class="tramos" role="img" aria-label="Pregunta ' + n + ' de 3">' + tramos + '</div>' +
        '<div class="cuerpo entra">' + dentro + '</div></div>' +
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
        '<h1 class="t1" data-titulo>' + (perfil === 'icp5' ? T.titular1icp5 : T.titular1) + '</h1>' +
        '<p class="sub1">' + T.sub1 + '</p>' +
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
        '<button type="button" class="boton boton--luz" id="seguir"><span>' + T.continuar + '</span>' + I.ir + '</button>' +
        '<p class="mini atajo"><button type="button" class="enlace" id="directo">' + T.directo + '</button></p>' +
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
    document.getElementById('directo').addEventListener('click', function () { ir('ver'); });
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
      '<div class="abajo"><button type="button" class="boton boton--luz" id="seguir"><span>' + T.continuar + '</span>' + I.ir + '</button></div>',
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
            '<div class="cifras"><div class="hoy"><span class="rot">' + T.hoy + '</span><b><span id="cuenta">' + S.p + '</span><small>%</small></b></div>' +
              (r > 0 ? '<div class="queda"><span class="rot">' + T.margen + '</span><b>' + r + '&nbsp;%</b></div>' : '') + '</div>' +
            '<div class="trazo"><i class="hecho"></i>' + (r > 0 ? '<i class="resto"></i>' : '') + '<i class="punto"></i></div>' +
          '</div>' +
        '</div>' +
        '<div class="pila dicho">' +
          '<h1 class="t2" data-titulo>' + T.eco.replace('{deseo}', C.AREAS[S.area].deseo) + '</h1>' +
          '<p class="entrada">' + t[1] + ' ' + t[2] + '</p>' +
          '<p class="texto">' + fraseHaces() + '</p></div>' +
      '</div></section>';
  }

  /* El bloque de la persona: qué le pasa, las terapias que ayudan con su dato y lo que hacen, una cita si la
     hay, y «¿Buscas otra cosa?» para ver el de otro tema sin volver a las preguntas. */
  function fotoTerapia(nombre) {
    for (var i = 0; i < C.TERAPIAS.length; i++) if (C.TERAPIAS[i].nombre === nombre) return [C.TERAPIAS[i].foto, C.TERAPIAS[i].pos];
    return (C.FOTOS_TERAPIA && C.FOTOS_TERAPIA[nombre]) || ['', '50% 50%'];
  }
  function htmlBloque(id) {
    var a = C.AREAS[id], total = a.filas.length, suyas = {};
    var tarjetas = a.filas.map(function (x, i) {
      var f = fotoTerapia(x[0]); suyas[x[0]] = 1;
      var pasos = [x[2], x[3], x[4]].map(function (t, k) { return '<li><span>' + T.pasosTerapia[k] + '</span><p>' + t + '</p></li>'; }).join('');
      return '<article class="tcard"><div class="marco">' + (f[0] ? '<img src="' + FOTO + f[0] + '" alt="" loading="lazy" decoding="async" style="object-position:' + f[1] + '">' : '') +
        '<span class="idx" aria-hidden="true">0' + (i + 1) + ' / 0' + total + '</span></div>' +
        '<div class="txt"><h3>' + x[0] + '</h3><p class="meta">' + x[1] + '</p>' +
        '<p class="quees">' + (x[5] || (C.QUE_ES && C.QUE_ES[x[0]]) || '') + '</p><ol class="como">' + pasos + '</ol></div></article>';
    }).join('');
    var resto = C.TERAPIAS.filter(function (t) { return !suyas[t.nombre]; }).map(function (t) {
      return '<li><img src="' + FOTO + t.foto + '" alt="" loading="lazy" decoding="async" style="object-position:' + t.pos + '">' +
        '<div><h3>' + t.nombre + ' <small>' + t.dur + '</small></h3><p>' + t.que + '</p><p class="nota">' + t.notas + '</p></div></li>';
    }).join('');
    var otras = C.ORDEN.filter(function (x) { return x !== id; }).map(function (x) {
      return '<button type="button" class="ficha-otra" data-otra="' + x + '">' + C.AREAS[x].corto + '</button>';
    }).join('');
    return '<div class="pila pila--l">' +
      '<div class="detras"><div class="pila"><p class="ojo">' + T.ojoBloque + '</p><h2 class="t2">' + a.titulo + '</h2></div>' +
        '<div class="pila"><p class="texto grande">' + a.texto + '</p>' +
          (a.cita ? '<blockquote class="cita cita--raya"><p>«' + a.cita.texto + '»</p><footer>' + a.cita.quien + '</footer></blockquote>' : '') + '</div></div>' +
      '<div class="pila"><p class="ojo">' + T.ojoTusTerapias + '</p><div class="tcards">' + tarjetas + '</div>' +
        '<div class="cuales"><p><b>' + T.cuales + '</b> ' + T.cualesTexto + '</p><a href="#invitacion" data-bajar>' + T.cualesEnlace + I.abajo + '</a></div>' +
        (resto ? '<details class="mas-ter"><summary><span><b>' + T.verOtras + '</b>' + T.otrasTexto + '</span><i aria-hidden="true"></i></summary><ul>' + resto + '</ul></details>' : '') +
      '</div>' +
      '<div class="otras"><p class="rot">' + T.otra + '</p><div class="otras-fila">' + otras + '</div></div>' +
    '</div>';
  }
  function secBloque(id) {
    return '<section class="sec papel" id="ayudarme"><div class="w" id="bloque">' + htmlBloque(id) + '</div></section>';
  }

  /* un carrusel: tarjetas que se deslizan, con sus rayas y, en el ordenador, dos flechas */
  function carril(clase, tarjetas, n, pista) {
    var puntos = ''; for (var i = 0; i < n; i++) puntos += '<i' + (i === 0 ? ' class="on"' : '') + '></i>';
    return '<div class="carril-caja"><div class="carril ' + clase + '" tabindex="0" role="group">' + tarjetas + '</div>' +
      '<p class="mini desliza"><span class="puntos" aria-hidden="true">' + puntos + '</span>' +
        (pista ? '<span class="pista" aria-hidden="true">' + pista + I.lado + '</span>' : '') +
        '<span class="flechas"><button type="button" data-carril="-1" aria-label="Anteriores">' + I.atras + '</button><button type="button" data-carril="1" aria-label="Siguientes">' + I.flecha + '</button></span></p></div>';
  }

  function secVoces() {
    var tarjetas = C.VOCES.map(function (v) {
      return '<figure class="voz">' +
        (v.video ? '<div class="clip"><video src="' + FOTO + v.video + '.mp4" poster="' + FOTO + v.video + '.webp" playsinline preload="none"></video>' +
          '<button type="button" class="play" data-play aria-label="' + C.verVideo + '">' + I.play + '</button></div>' : '') +
        '<blockquote><p>«' + v.texto + '»</p></blockquote><figcaption>' + v.quien + '</figcaption></figure>';
    }).join('');
    return '<section class="sec alba grano" id="miembros"><div class="w pila pila--l">' +
      '<div class="pila medio"><p class="ojo">' + T.ojoVoces + '</p><h2 class="t2">' + T.vocesTitulo + '</h2></div>' +
      carril('voces', tarjetas, C.VOCES.length, '') +
    '</div></section>';
  }

  function secMedico() {
    var personas = C.EQUIPO.map(function (p) {
      return '<li><img src="' + FOTO + p[3] + '" alt="" width="200" height="200" loading="lazy" decoding="async"' + (p[4] ? ' style="object-position:' + p[4] + '"' : '') + '>' +
        '<div><b>' + p[0] + '</b><small>' + p[1] + '</small><span>' + p[2] + '</span></div></li>';
    }).join('');
    return '<section class="sec papel" id="equipo"><div class="w medico-rejilla">' +
      '<div class="pila"><p class="ojo">' + T.ojoMedico + '</p><h2 class="t2">' + T.medicoTitulo + '</h2>' +
        '<blockquote class="cita cita--raya grande"><p>«' + C.FRASE_DRA.texto + '»</p><footer>' + C.FRASE_DRA.quien + '</footer></blockquote></div>' +
      '<ul class="equipo">' + personas + '</ul>' +
    '</div></section>';
  }

  /* quien no contesta las preguntas entra por aquí */
  function secIntro() {
    return '<section class="sec alba grano primera intro">' + cab('<button type="button" data-cambiar>' + T.preguntas + '</button>') +
      '<div class="w pila medio entra"><p class="ojo">' + T.donde + '</p>' +
        '<h1 class="t1" data-titulo>' + (perfil === 'icp5' ? T.titular1icp5 : T.titular1) + '</h1>' +
        '<p class="entrada suave">' + T.introSub + '</p></div></section>';
  }

  function ficha() {
    return '<div class="ficha"><header><b>' + T.fichaTitulo + '</b><span>' + T.fichaEstado + '</span></header><ul>' +
      C.FICHA.map(function (m) { return '<li><b>' + m[0] + '</b><i>' + m[1] + '</i><p>' + m[2] + '</p></li>'; }).join('') +
    '</ul></div>';
  }

  function secInvitacion(primera, para) {
    var pasos = C.PASOS.map(function (p, i) {
      return '<li><span class="num">' + (i + 1) + '</span><div class="txt"><h3>' + p[0] + '</h3><p class="texto">' + p[1] + '</p>' + (i === 1 ? ficha() : '') + '</div></li>';
    }).join('');
    var claves = (C.MINUTOS ? [[T.claveDuracion, T.minutos.replace('{m}', C.MINUTOS)]] : []).concat(T.claves)
      .map(function (c) { return '<div><dt>' + c[0] + '</dt><dd>' + c[1] + '</dd></div>'; }).join('');
    var H = 'h2';
    return '<section class="sec alba grano" id="invitacion">' +
      '<div class="w invita-rejilla">' +
        '<div class="resumen-visita"><div class="tarjeta">' +
          '<div class="tarjeta-cab"><img src="' + FOTO + 'revo-logo-white.webp" alt="' + T.logoAlt + '" width="2253" height="819"><p class="ojo">' + T.ojoInvita + '</p></div>' +
          '<' + H + ' class="t2">' + T.invita + '</' + H + '>' +
          '<p class="entrada"><em class="para" id="para">' + (para || '') + '</em> ' + T.oferta + '</p>' +
          '<dl class="claves">' + claves + '</dl>' +
          botonReservar('propuesta', 'boton--tinta') +
          whatsapp(T.waAntes, 'propuesta') +
        '</div></div>' +
        '<div class="pila"><p class="ojo">' + (C.MINUTOS ? T.ojoPasos.replace('{m}', C.MINUTOS) : T.ojoPasosSinMinutos) + '</p><ol class="hilo">' + pasos + '</ol></div>' +
      '</div></section>';
  }

  function secLugar() {
    var fotos = C.FOTOS.map(function (x, i) {
      return '<figure class="' + (i === 0 ? 'grande' : 'alta') + '"><img src="' + FOTO + x[0] + '" alt="' + x[1] + '" width="' + x[2] + '" height="' + x[3] + '" loading="lazy" decoding="async"' + (x[4] ? ' style="object-position:' + x[4] + '"' : '') + '></figure>';
    }).join('');
    var despues = T.despues.map(function (d) {
      return '<div class="extra"><h3>' + d[0] + '</h3><p>' + d[1] + '</p>' + (d[2] ? '<a href="' + d[3] + '">' + d[2] + '</a>' : '') + '</div>';
    }).join('');
    return '<section class="sec papel" id="donde"><div class="w pila pila--l">' +
      '<div class="extras">' + despues + '</div>' +
      '<div class="lugar-rejilla">' +
        '<div class="lugar-col">' +
          '<div class="pila lugar-a">' +
            '<p class="ojo">' + T.ojoLugar + '</p>' +
            '<h2 class="t2">' + T.lugarTitulo + '</h2>' +
            '<p class="texto grande">' + T.lugar + '</p>' +
            '<p class="llegar"><span>' + T.direccion + '</span><span class="acciones"><button type="button" class="enlace-t" data-mapa>' + T.verMapa + '</button><a class="enlace-t" href="' + T.mapa + '" target="_blank" rel="noopener">' + T.comoLlegar + '</a></span></p>' +
            '<div class="mapa" id="mapa" hidden></div>' +
          '</div>' +
          '<ul class="datos lugar-c">' + C.DATOS.map(function (d) { return '<li><b>' + d[0] + '</b><span>' + d[1] + '</span></li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="lugar-col">' +
          '<div class="mosaico lugar-b">' + fotos + '</div>' +
          '<blockquote class="cita lugar-d"><p>«' + C.CITA.texto + '»</p><footer>' + C.CITA.quien + '</footer></blockquote>' +
        '</div>' +
      '</div>' +
    '</div></section>';
  }

  function secDudas() {
    var dudas = C.DUDAS.map(function (d, i) { return '<details data-duda="' + i + '"><summary>' + d[0] + '<i aria-hidden="true"></i></summary><p>' + d[1] + '</p></details>'; }).join('');
    return '<section class="sec papel dudas-sec" id="dudas"><div class="w"><div class="dudas-rejilla pila pila--l">' +
      '<div class="pila"><p class="ojo">' + T.ojoDudas + '</p><h2 class="t2">' + T.dudas + '</h2></div>' +
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
          '<span><a href="' + T.mapa + '" target="_blank" rel="noopener">' + T.direccion + '</a></span>' +
          '<span>' + T.horario + '</span>' +
          '<span>' + T.legal + '</span>' +
          '<span><a href="privacidad.html">' + T.privacidad + '</a> · <button type="button" data-cookies>' + T.cookies + '</button></span></div></footer>' +
    '</div></section>';
  }

  /* ---------- movimiento de la página de resultado ----------
     · El número sube hasta su valor (con temporizador, no con requestAnimationFrame, para que siempre termine).
     · Los bloques aparecen al entrar en pantalla. Solo se esconden si el navegador sabe avisar de cuándo entran;
       si no, se quedan a la vista.
     · Los puntos de las terapias siguen al dedo en el móvil. */
  function movimiento() {
    var cuenta = document.getElementById('cuenta');
    if (cuenta && !CALMA) {
      var fin = S.p, ini = Math.max(50, fin - 14), paso = 0, pasos = 14;
      cuenta.textContent = ini;
      var reloj = setInterval(function () {
        paso++;
        var k = 1 - Math.pow(1 - paso / pasos, 3);
        cuenta.textContent = Math.round(ini + (fin - ini) * k);
        if (paso >= pasos) { clearInterval(reloj); cuenta.textContent = fin; }
      }, 55);
    }

    [].forEach.call(app.querySelectorAll('.carril-caja'), function (marco) {
      var caja = marco.querySelector('.carril'), puntos = marco.querySelectorAll('.puntos i');
      function ancho() { var t = caja.firstElementChild; return t ? t.getBoundingClientRect().width + 14 : 1; }
      caja.addEventListener('scroll', function () {
        var n = Math.round(caja.scrollLeft / ancho());
        if (caja.scrollLeft + caja.clientWidth >= caja.scrollWidth - 4) n = puntos.length - 1;   // al llegar al final, la última
        n = Math.max(0, Math.min(puntos.length - 1, n));
        for (var i = 0; i < puntos.length; i++) puntos[i].className = i === n ? 'on' : '';
      }, { passive: true });
      [].forEach.call(marco.querySelectorAll('[data-carril]'), function (b) {
        b.addEventListener('click', function () {
          caja.scrollBy({ left: Number(b.getAttribute('data-carril')) * ancho() * 2, behavior: CALMA ? 'auto' : 'smooth' });
        });
      });
    });

    if (CALMA || !('IntersectionObserver' in window)) return;
    var piezas = [].slice.call(app.querySelectorAll(
      '.sec:not(.primera) .ojo, .sec:not(.primera) .t2, .sec:not(.primera) .t3, .sec.papel .texto, .tcard, .cuales, .mas-ter, .otras, .voz, .tarjeta, .hilo > li, ' +
      '.extra, .mosaico figure, .datos li, .equipo li, .cita, .dudas details, .lema > *, .llegar'));
    var alto = window.innerHeight;
    var ojo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visto');
        ojo.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });
    piezas.forEach(function (el) {
      if (el.getBoundingClientRect().top < alto * .92) return;   // lo que ya se ve no se esconde
      var hermanos = el.parentNode ? [].slice.call(el.parentNode.children) : [];
      el.style.setProperty('--d', Math.min(hermanos.indexOf(el), 4) * 70 + 'ms');
      el.classList.add('rev');
      ojo.observe(el);
    });
    // Red de seguridad: si algo quedara sin avisar, a los seis segundos de estar a la vista se enseña igual.
    window.addEventListener('scroll', function seguro() {
      var hay = false;
      piezas.forEach(function (el) {
        if (!el.classList.contains('rev') || el.classList.contains('visto')) return;
        if (el.getBoundingClientRect().top < window.innerHeight * .9) el.classList.add('visto'); else hay = true;
      });
      if (!hay) window.removeEventListener('scroll', seguro);
    }, { passive: true });
  }

  function flota() { return '<div class="flota" id="flota"><div class="w">' + botonReservar('fijo', '') + '</div></div>'; }

  /* «¿Buscas otra cosa?»: cambia el bloque sin volver a las preguntas, y con él la frase de la invitación. */
  function activaBloque() {
    var caja = document.getElementById('bloque');
    [].forEach.call(caja.querySelectorAll('[data-otra]'), function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-otra');
        S.area = id; guarda();
        evento('eligio_tema', { tema: id, porcentaje: S.p, haces: S.haces.join(',') });
        caja.innerHTML = htmlBloque(id);
        var para = document.getElementById('para');
        if (para) para.textContent = C.AREAS[id].para;
        var eco = app.querySelector('.dicho [data-titulo]');
        if (eco) eco.innerHTML = T.eco.replace('{deseo}', C.AREAS[id].deseo);
        activaBloque();
        var y = caja.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - 28;
        window.scrollTo({ top: y, behavior: CALMA ? 'auto' : 'smooth' });
      });
    });
    var bajar = caja.querySelector('[data-bajar]');
    if (bajar) bajar.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('invitacion').scrollIntoView({ behavior: CALMA ? 'auto' : 'smooth', block: 'start' });
    });
  }

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
    // Los vídeos de los miembros: se cargan al pulsar, con sonido y con los mandos del navegador. Al poner uno, se paran los demás.
    var clips = [].slice.call(app.querySelectorAll('.voz .clip'));
    clips.forEach(function (c) {
      var v = c.querySelector('video'), b = c.querySelector('[data-play]');
      b.addEventListener('click', function () {
        clips.forEach(function (o) { var w = o.querySelector('video'); if (w !== v) { try { w.pause(); } catch (e) {} } });
        c.classList.add('puesto');
        v.controls = true;
        var p = v.play && v.play();
        if (p && p.catch) p.catch(function () {});
      });
    });
    activaBloque();
    var mapa = app.querySelector('[data-mapa]');
    if (mapa) mapa.addEventListener('click', function () {
      // El mapa de Google solo se carga si se pide (pone sus propias cookies).
      var m = document.getElementById('mapa');
      m.hidden = false;
      m.innerHTML = '<iframe title="REVO Studios en Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + T.mapaDentro + '"></iframe>';
      mapa.hidden = true;
    });
    movimiento();
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
    fondo(false);
    pinta(secResumen() + secBloque(S.area) + secInvitacion(false, a.para) + secMedico() + secVoces() + secLugar() + secDudas() + secFinal() + flota());
    evento('vio_resultado', { tema: S.area, porcentaje: S.p });
    activaResultado(S.area);
  }
  /* Sin contestar: la misma página, con el bloque del perfil del anuncio (o el de la cabeza si no lo dice). */
  function invitacion() {
    abrePantalla('resultado');
    fondo(false);
    S.area = null;
    pinta(secIntro() + secBloque(areaAnuncio) + secInvitacion(false, paraAnuncio || C.AREAS[areaAnuncio].para) + secMedico() + secVoces() + secLugar() + secDudas() + secFinal() + flota());
    evento('eligio_tema', { tema: 'directo' });
    evento('vio_resultado', { tema: 'directo' });
    activaResultado('directo');
  }

  function render() {
    var h = location.hash.replace('#', '');
    if (h === 'paso-2') return paso2();
    if (h === 'paso-3') return paso3();
    if (h === 'resultado') return resultado();
    // «ver» es la página sin contestar. «invitacion» se conserva por los enlaces antiguos: como ahora es también el
    // id de la sección, el navegador baja solo hasta la invitación.
    if (h === 'ver' || h === 'invitacion') return invitacion();
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
