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
  // Este mismo fichero pinta dos landings: /tu-punto (las tres preguntas) y /punto-de-partida (solo la oferta,
  // con window.TU_PUNTO_MODO = 'oferta'). Cada una manda sus eventos con su nombre de página.
  var MODO = window.TU_PUNTO_MODO || '';
  var PAGINA = MODO === 'oferta' ? 'punto-de-partida' : 'tu-punto';

  /* ---------- parámetros del enlace ---------- */
  var params = new URLSearchParams(location.search);
  var utmContent = (params.get('utm_content') || '').slice(0, 120);
  var utmSource = (params.get('utm_source') || '').slice(0, 60);
  // Perfil del anuncio: «icp1», «icp2»… en cualquier parte de utm_content (la misma norma que /punto-de-partida).
  var icp = utmContent.match(/icp(\d+)/i);
  var perfil = icp ? 'icp' + parseInt(icp[1], 10) : '';
  var paraAnuncio = (C.PERFILES && C.PERFILES[perfil]) || '';
  var areaAnuncio = (C.PERFIL_AREA && C.PERFIL_AREA[perfil]) || C.AREA_SIN_PERFIL;

  /* ---------- de qué anuncio viene: solo una lista cerrada de parámetros ----------
     Se guardan en la pestaña (sessionStorage) para que sobrevivan a recargar. Las etiquetas utm_* viajan
     siempre al enlace de reserva; los identificadores del anuncio y el fbclid de Meta, solo si la persona
     aceptó las cookies de marketing. El fbclid nunca se inventa: o vino en el enlace, o no hay. */
  var ADS_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var ADS_ID = ['campaign_id', 'adset_id', 'ad_id', 'placement', 'fbclid'];
  var ads = {};
  try { ads = JSON.parse(sessionStorage.getItem('tp_ads') || '{}') || {}; } catch (e) { ads = {}; }
  ADS_UTM.concat(ADS_ID).forEach(function (k) {
    var x = params.get(k);
    // Una macro de Meta sin sustituir («{{ad.id}}») no es un dato.
    if (x && x.length <= 500 && x.indexOf('{{') === -1) ads[k] = x;
  });
  try { sessionStorage.setItem('tp_ads', JSON.stringify(ads)); } catch (e) {}
  function marketingOk() {
    try { return !!(window.revoPixel && window.revoPixel.allowed && window.revoPixel.allowed()); } catch (e) { return false; }
  }
  function enlaceReserva() {
    try {
      var u = new URL(MOMENCE);
      var claves = marketingOk() ? ADS_UTM.concat(ADS_ID) : ADS_UTM;
      claves.forEach(function (k) { if (ads[k] && !u.searchParams.has(k)) u.searchParams.set(k, ads[k]); });
      return u.toString();
    } catch (e) { return MOMENCE; }
  }
  function datosAnuncio(d) {
    d.mk = marketingOk() ? 'si' : 'no';
    ['campaign_id', 'adset_id', 'ad_id'].forEach(function (k) { if (/^\d{1,30}$/.test(ads[k] || '')) d[k] = ads[k]; });
    return d;
  }

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
      pagina: PAGINA,
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
  /* p arranca en el centro de la línea (75): hasta que la persona responde no se enseña ningún número. */
  var S = { p: 75, tocado: false, haces: [], area: null };
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
    if (ahorro) return;
    function suena() {
      if (!document.body.classList.contains('con-fondo') || !video.paused) return;
      var p = video.play && video.play();
      if (p && p.catch) p.catch(function () {});
    }
    if (visible) {
      if (!videoListo) {
        videoListo = true;
        // El iPhone solo deja arrancar un vídeo sin tocar si está en silencio DE VERDAD (la propiedad, no solo el
        // atributo) y en línea. Y con el ahorro de batería no lo deja nunca: por eso se reintenta al primer toque.
        video.muted = true; video.defaultMuted = true;
        video.setAttribute('muted', ''); video.setAttribute('autoplay', '');
        video.setAttribute('playsinline', ''); video.setAttribute('webkit-playsinline', '');
        var ancho = window.matchMedia('(min-width: 900px)').matches;
        if (!ancho) {
          // Móvil: debajo va la versión animada (imagen en movimiento) y el vídeo solo se enseña cuando corre.
          // Con el ahorro de batería el iPhone no arranca ningún vídeo, pero la imagen animada sí se mueve.
          var caja = video.parentNode, anim = new Image();
          anim.className = 'anim'; anim.alt = ''; anim.decoding = 'async'; anim.src = FOTO + 'hero-anim-mobile.webp';
          caja.insertBefore(anim, video); caja.classList.add('con-anim');
          video.removeAttribute('poster');
          video.addEventListener('playing', function () { video.classList.add('va'); });
          video.addEventListener('pause', function () { video.classList.remove('va'); });
        }
        video.src = FOTO + (ancho ? 'hero-video-1080.mp4' : 'hero-video-mobile.mp4');
        try { video.load(); } catch (e) {}
        video.addEventListener('loadedmetadata', suena); video.addEventListener('canplay', suena);
        ['touchend', 'pointerup', 'click', 'keydown'].forEach(function (ev) { document.addEventListener(ev, suena, { passive: true }); });
        document.addEventListener('visibilitychange', suena);
      }
      suena();
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
    return '<a class="boton' + (clase ? ' ' + clase : '') + '" href="' + MOMENCE + '" data-reservar="' + desde + '" data-sin-lead data-title="Tu punto de partida"><span>' + T.reservar + '</span>' + I.ir + '</a>';
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
        '<div class="progreso" role="img" aria-label="' + T.paso.replace('{n}', n) + '"><span class="paso">' + T.paso.replace('{n}', n) + '</span><div class="tramos">' + tramos + '</div></div>' +
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
  /* La barra de la primera pregunta: una línea de un píxel (lo marcado en blanco, el resto apagado). */
  var REGLA = '<span class="hecho"></span><span class="resto"></span>';
  /* El círculo mientras nadie ha respondido: el mismo anillo, con un halo que respira. */
  var GUIA = '<span class="guia" aria-hidden="true"><i></i></span>';
  /* Eric, 18-nov-2026: «al entrar no parece que tengas que seleccionar; como ya empieza al 80 %, da la sensación de
     que es clicar y continuar» → y al verlo con raya, flechas y botón apagado: «más bonito y elegante».
     La pregunta ARRANCA SIN RESPUESTA (clase «sin») y lo enseña sin decirlo: el círculo se desliza solo, muy despacio,
     entre el 65 y el 85, y el número lo sigue en tenue, como una respuesta que aún no es de nadie. No hay botón.
     Al tocar la línea (en cualquier punto), arrastrar el círculo o usar el teclado, el número se enciende, el círculo
     se queda donde lo deja la persona y «Continuar» aparece. Con «reducir movimiento» el círculo espera quieto. */
  function paso1() {
    abrePantalla('inicio');
    var sin = !S.tocado;
    pinta(escena(1,
      '<div class="arriba">' +
        '<h1 class="t1" data-titulo>' + (perfil === 'icp5' ? T.titular1icp5 : T.titular1) + '</h1>' +
        '<p class="sub1">' + T.sub1 + '</p>' +
      '</div>' +
      '<div class="medida' + (sin ? ' sin' : '') + '" id="medida">' +
        '<label for="porcentaje">' + T.pregunta1 + '</label>' +
        '<div class="cifra" aria-hidden="true"><span id="cifra">' + S.p + '</span><small>%</small></div>' +
        '<div class="regla" id="regla">' + REGLA + GUIA +
          '<input type="range" id="porcentaje" min="50" max="100" step="5" value="' + S.p + '" aria-valuetext="' + (sin ? T.pista1 : S.p + ' por ciento') + '"></div>' +
        '<div class="escala" aria-hidden="true"><span>50</span><span>100</span></div>' +
        '<p class="eco" id="eco" aria-live="polite">' + (sin ? T.pista1 : porTramo(C.ECO)[1]) + '</p>' +
      '</div>' +
      '<div class="abajo">' +
        '<button type="button" class="boton boton--luz' + (sin ? ' boton--espera' : '') + '" id="seguir"' + (sin ? ' aria-hidden="true" tabindex="-1"' : '') + '><span>' + T.continuar + '</span>' + I.ir + '</button>' +
      '</div>'));

    var input = document.getElementById('porcentaje'), marco = app.querySelector('.escena');
    var medida = document.getElementById('medida'), seguir = document.getElementById('seguir'), cifra = document.getElementById('cifra');
    /* el paseo del círculo: un vaivén de 7 segundos alrededor del centro */
    var paseo = 0, desde = 0;
    function pasea(t) {
      if (S.tocado || !medida.isConnected) return;
      if (!desde) desde = t;
      var g = .5 + .2 * Math.sin((t - desde) / 7000 * Math.PI * 2);
      medida.style.setProperty('--g', g.toFixed(4));
      var n = String(50 + Math.round(g * 10) * 5);
      if (cifra.textContent !== n) cifra.textContent = n;
      paseo = requestAnimationFrame(pasea);
    }
    if (sin && !CALMA) paseo = requestAnimationFrame(pasea);
    function responde() {
      S.p = Number(input.value);
      if (!S.tocado) {
        S.tocado = true;
        cancelAnimationFrame(paseo);
        medida.classList.remove('sin');
        seguir.classList.remove('boton--espera');
        seguir.removeAttribute('aria-hidden'); seguir.removeAttribute('tabindex');
      }
      marco.style.setProperty('--f', f());
      cifra.textContent = S.p;
      input.setAttribute('aria-valuetext', S.p + ' por ciento');
      document.getElementById('eco').textContent = porTramo(C.ECO)[1];
      guarda();
    }
    input.addEventListener('input', responde);
    input.addEventListener('change', responde);
    /* Tocar o arrastrar en cualquier punto de la línea responde (en el iPhone el control de serie solo deja
       arrastrar el círculo, y quien toca la línea no vería pasar nada). 14 px es el margen del círculo (--m). */
    var arrastra = false;
    function aLaPosicion(e) {
      var r = input.getBoundingClientRect(), m = 14;
      var t = Math.min(1, Math.max(0, (e.clientX - r.left - m) / Math.max(1, r.width - m * 2)));
      input.value = String(50 + Math.round(t * 10) * 5);
      responde();
    }
    input.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      arrastra = true;
      try { input.setPointerCapture(e.pointerId); } catch (x) {}
      aLaPosicion(e);
    });
    input.addEventListener('pointermove', function (e) { if (arrastra) aLaPosicion(e); });
    ['pointerup', 'pointercancel'].forEach(function (n) { input.addEventListener(n, function () { arrastra = false; }); });
    seguir.addEventListener('click', function () {
      if (!S.tocado) return;
      guarda(); ir('paso-2');
    });
  }

  /* ---------- 2 · lo que ya haces ---------- */
  function paso2() {
    abrePantalla('q2');
    var marcas = C.HACES.map(function (h) {
      return '<button type="button" class="marca" data-h="' + h[0] + '" aria-pressed="' + (S.haces.indexOf(h[0]) > -1) + '">' + h[1] + '<i>' + I.visto + '</i></button>';
    }).join('') + '<button type="button" class="marca ancha" data-h="menos" aria-pressed="' + (S.haces.indexOf('menos') > -1) + '">' + T.menos + '<i>' + I.visto + '</i></button>';
    pinta(escena(2,
      '<div class="arriba">' +
        '<h1 class="t3" data-titulo>' + T.pregunta2 + '</h1>' +
        '<p class="texto">' + T.pista2 + '</p>' +
        '<div class="marcas">' + marcas + '</div>' +
      '</div>' +
      '<div class="abajo"><button type="button" class="boton boton--luz" id="seguir"><span>' + T.continuar + '</span>' + I.ir + '</button></div>',
      atras()));
    app.querySelectorAll('.marca').forEach(function (c) {
      c.addEventListener('click', function () {
        var id = c.getAttribute('data-h'), i = S.haces.indexOf(id);
        if (i > -1) S.haces.splice(i, 1); else S.haces.push(id);
        c.setAttribute('aria-pressed', i === -1);
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
  /* Lo que ya hace, dicho en una frase: se usa una sola vez, en el puente hacia la invitación (parte 03),
     que es donde argumenta a favor de medir. Sin respuestas (o sin contestar), no se dice nada. */
  var sinContestar = false;
  function frasePuente() {
    if (sinContestar) return '';
    var verbos = C.HACES.filter(function (h) { return S.haces.indexOf(h[0]) > -1; }).map(function (h) { return h[2]; });
    if (!verbos.length) return S.haces.indexOf('menos') > -1 ? T.puenteMenos : '';
    var lista = verbos.length === 1 ? verbos[0] : verbos.slice(0, -1).join(', ') + ' y ' + verbos[verbos.length - 1];
    return 'Ya ' + lista + '. ' + (verbos.length >= 3 ? T.puenteMucho : T.puenteBase);
  }
  /* Lo mismo para el tramo final corto de /tu-punto: «Ya entrenas y cuidas lo que comes, aunque menos de lo que
     querrías.» «Menos de lo que querría» se puede marcar junto a lo demás. */
  function fraseHaces() {
    if (sinContestar) return '';
    var menos = S.haces.indexOf('menos') > -1;
    var verbos = C.HACES.filter(function (h) { return S.haces.indexOf(h[0]) > -1; }).map(function (h) { return h[2]; });
    if (!verbos.length) return menos ? T.soloMenos : '';
    var lista = verbos.length === 1 ? verbos[0] : verbos.slice(0, -1).join(', ') + ' y ' + verbos[verbos.length - 1];
    return (menos ? T.yaHacesMenos : T.yaHaces).replace('{lista}', lista);
  }
  function rotulo(n, texto) { return '<p class="ojo"><span class="nn">0' + n + '</span>' + texto + '</p>'; }

  /* 01 · Por qué pasa. No se repite lo que la persona ha dicho: una línea pequeña con su respuesta y, directo,
     el título de su tema y la explicación (es normal, y tiene un porqué). */
  function htmlPorque(id, contestado) {
    var a = C.AREAS[id];
    // Su tema y, enseguida, lo que hay detrás: el sistema nervioso autónomo, con sus dos modos.
    return rotulo(1, T.parte1) +
      '<h1 class="t1" data-titulo>' + a.titulo + '</h1>' +
      '<p class="entrada suave">' + a.texto + '</p>' +
      '<div class="detras"><h2 class="t3">' + T.detrasTitulo + '</h2>' +
        '<p class="entrada">' + a.nervio + '</p>' +
        '<div class="modos" aria-hidden="true"><span>' + T.modoA + '</span><i><b></b></i><span>' + T.modoB + '</span></div>' +
        '<p class="texto">' + T.detrasTexto + '</p></div>';
  }
  function secPorque(id, contestado) {
    return '<section class="sec alba grano primera">' + cab(contestado ? atras() : '<button type="button" data-cambiar>' + T.preguntas + '</button>') +
      '<div class="w"><div class="pila porque entra" id="porque" data-contestado="' + (contestado ? 1 : 0) + '">' + htmlPorque(id, contestado) + '</div></div></section>';
  }

  /* 02 · Qué puede ayudarte. Dos listas con el mismo formato (foto pequeña y texto corrido): las terapias de
     su tema y, debajo, las demás. De cada una: qué es y qué hace en tu cuerpo, en qué te ayuda a ti, y con qué
     más ayuda. Las demás dicen su relación con el tema si la hay; si no, con qué otra cosa ayudan. */
  // En las terapias principales se ve solo la frase de para qué sirve; lo demás se abre con «Cómo funciona».
  function resumida(ps) {
    var clave = '', resto = [];
    ps.forEach(function (x) { if (!clave && x.indexOf('» ') === 0) clave = x.slice(2); else resto.push(x.indexOf('» ') === 0 ? x.slice(2) : x); });
    if (!clave) clave = resto.shift() || '';
    return '<p class="ayuda clave">' + clave + '</p>' +
      (resto.length ? '<details class="mas"><summary>' + T.leerMas + '<i aria-hidden="true"></i></summary>' +
        resto.map(function (x) { return '<p class="base">' + x + '</p>'; }).join('') + '</details>' : '');
  }
  function filaTerapia(t, id, ficha) {
    // cada texto es una lista de párrafos escrita para esa terapia y ese objetivo; «» » marca la frase que destaca
    var ps = (t.textos && t.textos[id]) || [];
    function img(f, pos) { return '<img src="' + FOTO + f + '" alt="" loading="lazy" decoding="async" style="object-position:' + pos + '">'; }
    var foto = t.foto2 ? '<span class="duo">' + img(t.foto, t.pos) + img(t.foto2, t.pos2 || '50% 50%') + '</span>' : img(t.foto, t.pos);
    var conFicha = ficha && t.specs && t.specs.length;
    return '<li class="tfila"><div class="cabeza">' + foto +
        '<div><h3>' + t.nombre + '</h3>' + (conFicha ? (t.es ? '<p class="meta">' + t.es + '</p>' : '') : '<p class="meta">' + t.dato + '</p>') + '</div></div>' +
      (conFicha ? '<dl class="specs">' + t.specs.map(function (x) {
        return '<div><dd>' + x[0] + '<small>' + x[1] + '</small></dd><dt>' + x[2] + '</dt></div>'; }).join('') + '</dl>' : '') +
      '<div class="cuerpo-t">' + (ficha ? resumida(ps) : ps.map(function (x) {
        return x.indexOf('» ') === 0 ? '<p class="ayuda">' + x.slice(2) + '</p>' : '<p class="base">' + x + '</p>';
      }).join('')) + '</div></li>';
  }
  function htmlBloque(id) {
    var a = C.AREAS[id];
    function de(nombre) { for (var i = 0; i < C.TERAPIAS.length; i++) if (C.TERAPIAS[i].nombre === nombre && C.TERAPIAS[i].textos[id]) return C.TERAPIAS[i]; return null; }
    var suyas = a.terapias.map(de).filter(Boolean);
    var demas = C.OTRAS_VISIBLES ? (a.otras || []).map(de).filter(Boolean) : [];
    return '<div class="pila pila--l">' +
      '<div class="pila medio">' + rotulo(2, T.parte2) + '<h2 class="t2">' + (a.titulo2 || T.terapiasSna) + '</h2>' +
        '<p class="texto grande">' + (a.entrada2 || T.terapiasSnaEntrada) + '</p></div>' +
      '<ul class="tlista">' + suyas.map(function (t) { return filaTerapia(t, id, true); }).join('') + '</ul>' +
      (demas.length ? '<details class="otras-mas"><summary><span class="t3">' + T.otrasTitulo + '</span><i aria-hidden="true"></i></summary>' +
        '<p class="texto">' + T.otrasEntrada + '</p>' +
        '<ul class="tlista tlista--otras">' + demas.map(function (t) { return filaTerapia(t, id); }).join('') + '</ul></details>' : '') +
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

  /* 04 · Quién lo vive y quién está detrás: los vídeos de miembros, la doctora y el equipo, y el estudio. */
  function secConfianza(n) {
    var tarjetas = C.VOCES.map(function (v) {
      return '<figure class="voz">' +
        (v.video ? '<div class="clip"><video src="' + FOTO + v.video + '.mp4" poster="' + FOTO + v.video + '.webp" playsinline preload="none"></video>' +
          '<button type="button" class="play" data-play aria-label="' + C.verVideo + '">' + I.play + '</button></div>' : '') +
        '<blockquote><p>«' + v.texto + '»</p></blockquote><figcaption>' + v.quien + '</figcaption></figure>';
    }).join('');
    var personas = C.EQUIPO.map(function (p) {
      return '<li><img src="' + FOTO + p[3] + '" alt="" width="200" height="200" loading="lazy" decoding="async"' + (p[4] ? ' style="object-position:' + p[4] + '"' : '') + '>' +
        '<div><b>' + p[0] + '</b><small>' + p[1] + '</small><span>' + p[2] + '</span></div></li>';
    }).join('');
    var fotos = C.FOTOS.map(function (x, i) {
      return '<figure class="' + (i === 0 ? 'grande' : 'alta') + '"><img src="' + FOTO + x[0] + '" alt="' + x[1] + '" width="' + x[2] + '" height="' + x[3] + '" loading="lazy" decoding="async"' + (x[4] ? ' style="object-position:' + x[4] + '"' : '') + '></figure>';
    }).join('');
    return '<section class="sec papel" id="miembros"><div class="w pila pila--l">' +
      '<div class="pila medio">' + rotulo(n || 5, T.parte5) + '<h2 class="t2">' + T.vocesTitulo + '</h2></div>' +
      carril('voces', tarjetas, C.VOCES.length, '') +
      '<div class="medico-rejilla">' +
        '<div class="pila"><h3 class="t3">' + T.medicoTitulo + '</h3>' +
          '</div>' +
        '<ul class="equipo">' + personas + '</ul>' +
      '</div>' +
      '<div class="lugar-rejilla">' +
        '<div class="mosaico">' + fotos + '</div>' +
        '<div class="pila"><h3 class="t3">' + T.lugarTitulo + '</h3><p class="texto grande">' + T.lugar + '</p>' +
          '<blockquote class="cita"><p>«' + C.CITA.texto + '»</p><footer>' + C.CITA.quien + '</footer></blockquote></div>' +
      '</div>' +
    '</div></section>';
  }

  /* La ficha de las tres mediciones, con sus casillas vacías: es lo que la persona se lleva. Va DENTRO de la
     tarjeta de la invitación, antes del botón (17-nov-2026: es lo más deseable de la oferta y estaba escondida
     en el paso 2). */
  function ficha() {
    return '<div class="lectura"><p class="lectura-cab"><span>' + T.fichaTitulo + '</span><b>' + T.fichaEstado + '</b></p><ul>' +
      C.FICHA.map(function (m) {
        var v = m[1].split(' ');
        return '<li><i>' + v[0] + (v[1] ? '<small>' + v[1] + '</small>' : '') + '</i><b>' + m[0] + '</b></li>';
      }).join('') + '</ul></div>';
  }

  /* 03 · La invitación. Pensada para que se reserve: poco que leer antes del botón, lo que te llevas a la vista,
     el valor dicho una vez y sin tono de oferta, una prueba junto al botón y qué pasa al pulsar. Debajo, los
     pasos de la visita y el botón otra vez. */
  /* Las plazas del mes. Se pinta con lo que se sabe sin preguntar a nadie (cuántas hay este mes y los días que
     quedan) y, cuando /api/plazas contesta con las reservas de verdad, se completa con las que quedan. Nunca se
     enseña un número de plazas que no venga de ahí. */
  var plazasDato = null, plazasPedidas = false;
  function htmlPlazas(d) {
    var hoy = new Date(), mesHoy = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2);
    var mes = (d && /^\d{4}-\d{2}$/.test(d.mes) && d.mes >= mesHoy) ? d.mes : mesHoy;
    var de = (d && d.de) || 20, quedan = d && typeof d.quedan === 'number' ? d.quedan : null;
    var a = Number(mes.slice(0, 4)), m = Number(mes.slice(5)), nombre = T.MESES[m - 1];
    var ultimo = new Date(a, m, 0).getDate();
    var tiempo;
    if (mes === mesHoy) {
      var dias = ultimo - hoy.getDate();
      tiempo = dias <= 0 ? T.plazasHoy : dias === 1 ? T.plazasDia1 : T.plazasDias.replace('{n}', dias);
    } else tiempo = T.plazasHasta.replace('{d}', ultimo).replace('{mes}', nombre);
    var izq, der;
    if (quedan === null) { izq = T.plazasSinDato.replace('{de}', de).replace('{mes}', nombre); der = tiempo; }
    else { izq = T.plazasMes.replace('{mes}', nombre); der = (quedan === 1 ? T.plazasQueda1 : T.plazasQuedan.replace('{n}', quedan)).replace('{de}', de); }
    return '<p class="plazas-fila"><span>' + izq + '</span><b>' + der + '</b></p>' +
      (quedan === null ? '' : '<i class="plazas-barra" style="--u:' + Math.max(0, Math.min(1, 1 - quedan / de)) + '" aria-hidden="true"><i></i></i>' +
        '<p class="plazas-pie">' + tiempo + '</p>');
  }
  function plazas() { return '<div class="plazas" data-plazas>' + htmlPlazas(plazasDato) + '</div>'; }
  function cargaPlazas() {
    function pon() { [].forEach.call(app.querySelectorAll('[data-plazas]'), function (c) { c.innerHTML = htmlPlazas(plazasDato); }); }
    if (!C.PLAZAS_CONTADAS || plazasPedidas) return;
    plazasPedidas = true;
    try {
      fetch('/api/plazas', { headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { if (d && typeof d === 'object' && d.mes) { plazasDato = d; pon(); } })
        .catch(function () {});
    } catch (e) {}
  }
  function tarjeta(para) {
    return '<div class="resumen-visita"><div class="tarjeta">' +
      '<div class="pila medio"><h2 class="t2">' + T.invita + '</h2>' +
      '<p class="entrada"><em class="para" id="para">' + (para || '') + '</em></p></div>' +
      ficha() +
      '<p class="valor">' + T.valor + '</p>' +
      '<p class="valor">' + T.terapiaDia + '</p>' +
      plazas() +
      '<div class="pila medio">' + botonReservar('propuesta', 'boton--tinta') +
      '<p class="bajo-boton">' + T.bajoBoton.replace('{m}', C.MINUTOS) + ' <a href="' + C.WHATSAPP + '" target="_blank" rel="noopener" data-wa="propuesta">' + T.waCorto + '</a></p></div>' +
    '</div></div>';
  }

  /* /tu-punto · el tramo final, en UNA sección (18-nov-2026): el «so what» en una frase, dos líneas, la tarjeta
     de la invitación y los pasos de la visita en una línea cada uno. Sustituye a «Lo más importante» + «Tu punto
     de partida», que eran dos secciones largas. */
  function secPaso(para) {
    var hace = fraseHaces();
    var pasos = C.PASOS_CORTOS.map(function (x, i) { return '<li><span class="num">' + (i + 1) + '</span><span>' + x + '</span></li>'; }).join('');
    return '<section class="sec alba grano" id="invitacion"><div class="w"><div class="paso-rejilla">' +
      '<div class="pila paso-txt">' + rotulo(3, T.partePaso) +
        '<h2 class="t2">' + T.pasoTitulo + '</h2>' +
        '<p class="entrada suave">' + (C.MINUTOS ? T.pasoTexto.replace('{m}', C.MINUTOS) : T.pasoTextoSinMinutos) + '</p>' +
        '<p class="entrada">' + (hace ? hace + ' ' : '') + T.pasoInvita + '</p></div>' +
      tarjeta(para) +
      '<div class="pila paso-pasos"><p class="ojo">' + (C.MINUTOS ? T.ojoPasos.replace('{m}', C.MINUTOS) : T.ojoPasosSinMinutos) + '</p>' +
        '<ol class="pasos-cortos">' + pasos + '</ol></div>' +
    '</div></div></section>';
  }

  /* La invitación de /punto-de-partida (la landing solo de oferta): el puente («Saberlo lleva 45 minutos» y por
     qué invitamos), la tarjeta y los cuatro pasos de la visita con su párrafo, que aquí son el producto. */
  function secInvitacion(n, para) {
    var O = C.OFERTA;
    var pasos = C.PASOS.map(function (p, i) {
      return '<li><span class="num">' + (i + 1) + '</span><div class="txt"><h3>' + p[0] + '</h3><p class="texto">' + p[1] + '</p></div></li>';
    }).join('');
    var hace = frasePuente() || O.porque;
    return '<section class="sec alba grano" id="invitacion">' +
      '<div class="w pila pila--l">' +
      '<div class="pila puente">' + rotulo(n, O.invitaRotulo) +
        '<p class="t2">' + (C.MINUTOS ? T.saberlo.replace('{m}', C.MINUTOS) : T.saberloSinMinutos) + '</p>' +
        (hace ? '<p class="entrada suave">' + hace + '</p>' : '') + '</div>' +
      '<div class="invita-rejilla">' +
        tarjeta(para) +
        '<div class="pila"><p class="ojo">' + (C.MINUTOS ? T.ojoPasos.replace('{m}', C.MINUTOS) : T.ojoPasosSinMinutos) + '</p><ol class="hilo">' + pasos + '</ol>' +
          '<div class="tras-pasos">' + botonReservar('pasos', 'boton--luz') + '</div></div>' +
      '</div></div></section>';
  }

  function secDudas(n) {
    var dudas = C.DUDAS.map(function (d, i) { return '<details data-duda="' + i + '"><summary>' + d[0] + '<i aria-hidden="true"></i></summary><p>' + d[1] + '</p></details>'; }).join('');
    return '<section class="sec papel velado" id="dudas"><div class="w"><div class="dudas-rejilla pila pila--l">' +
      '<div class="pila">' + rotulo(n || 6, T.parte6) + '<h2 class="t2">' + T.dudas + '</h2></div>' +
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
  function activaCarriles(raiz) {
    [].forEach.call(raiz.querySelectorAll('.carril-caja'), function (marco) {
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
  }

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

    activaCarriles(app);

    if (CALMA || !('IntersectionObserver' in window)) return;
    var piezas = [].slice.call(app.querySelectorAll(
      '.sec:not(.primera) .ojo, .sec:not(.primera) .t2, .sec:not(.primera) .t3, .sec.papel .texto, .puente .entrada, .tfila, .voz, .tarjeta, .hilo > li, ' +
      '.sec .edades, .sientes, .cien, .tiras li, .cuidas, .sabras li,.pasos-cortos li, .paso-txt .entrada, .detras, .notas li, .modos, .extra, .mosaico figure, .datos li, .equipo li, .cita, .dudas details, .lema > *, .llegar'));
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

  function activaResultado(tema) {
    // Arriba: quien ha contestado vuelve a la tercera pregunta para elegir otra cosa; quien no, empieza las preguntas.
    var cambiar = app.querySelector('[data-cambiar]');
    if (cambiar) cambiar.addEventListener('click', function () { evento('cambio_tema', { desde: tema }); ir(''); });
    var volver = app.querySelector('[data-atras]');
    if (volver) volver.addEventListener('click', function () {
      evento('cambio_tema', { desde: tema });
      if (navegado && history.length > 1) history.back(); else ir('paso-3');
    });
    app.querySelectorAll('[data-reservar]').forEach(function (b) {
      // El evento sale por sendBeacon antes de saltar; Momence se abre en la misma pestaña.
      // Pulsar no es reservar: aquí solo se apunta la intención (y no se manda «Lead» a Meta: data-sin-lead).
      b.addEventListener('click', function () {
        b.setAttribute('href', enlaceReserva());
        evento('pulso_reservar', datosAnuncio({ tema: tema, desde: b.getAttribute('data-reservar') }));
      });
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
    var mapa = app.querySelector('[data-mapa]');
    if (mapa) mapa.addEventListener('click', function () {
      // El mapa de Google solo se carga si se pide (pone sus propias cookies).
      var m = document.getElementById('mapa');
      m.hidden = false;
      m.innerHTML = '<iframe title="REVO Studios en Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + T.mapaDentro + '"></iframe>';
      mapa.hidden = true;
    });
    movimiento();
    cargaPlazas();
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
    sinContestar = false;
    pinta(secPorque(S.area, true) + secBloque(S.area) + secPaso(a.para) + secConfianza(4) + secDudas(5) + secFinal() + flota());
    evento('vio_resultado', { tema: S.area, porcentaje: S.p });
    activaResultado(S.area);
  }
  /* Sin contestar: la misma página, con el tema del perfil del anuncio (o el de la cabeza si no lo dice). */
  function invitacion() {
    abrePantalla('resultado');
    fondo(false);
    S.area = null; sinContestar = true;
    pinta(secPorque(areaAnuncio, false) + secBloque(areaAnuncio) + secPaso(paraAnuncio || C.AREAS[areaAnuncio].para) + secConfianza(4) + secDudas(5) + secFinal() + flota());
    evento('eligio_tema', { tema: 'directo' });
    evento('vio_resultado', { tema: 'directo' });
    activaResultado('directo');
  }

  /* ---------- /punto-de-partida: la landing solo de oferta ----------
     Una sola página, sin preguntas. Da escritas, y en el mismo orden, las conclusiones a las que /tu-punto lleva
     preguntando (el porqué de cada tramo está en la cabecera de TU_PUNTO.OFERTA):
     la oferta con el vídeo detrás → 01 sentirse bien no es estar al 100 % (y los seis deseos) → 02 el sistema
     nervioso autónomo (y por qué cuidarse no basta para saberlo) → 03 se puede medir → 04 con ese dato, un plan
     (las terapias, en una sola pantalla) → 05 la invitación → miembros, equipo y dudas.
     Para la medición es una sola pantalla («inicio»), como la landing anterior de esta dirección. */
  function oferta() {
    var O = C.OFERTA, m = C.MINUTOS;
    abrePantalla('inicio');
    S.area = null; sinContestar = true;
    fondo(true);
    var hero = '<section class="escena grano primera oferta-hero" style="--f:.6"><div class="sombra"></div><div class="aurora"></div>' + cab() +
      '<div class="w escena-w"><div class="lado-izq"><div class="cuerpo entra">' +
        '<div class="arriba"><p class="ojo">' + O.heroOjo + '</p>' +
          '<h1 class="t1" data-titulo>' + (perfil === 'icp5' ? O.heroTituloIcp5 : O.heroTitulo) + '</h1>' +
          '<p class="sub1">' + O.heroSub.replace('{m}', m) + '</p></div>' +
        '<div class="edades" aria-hidden="true"><p class="edades-cab"><span>' + T.ejeBio + '</span><b>' + T.ejeEstado + '</b></p>' +
          '<div class="eje"><i class="linea"></i><i class="centro"></i><i class="bio"><span>?</span></i></div>' +
          '<p class="eje-pie"><span>' + T.ejeMenos + '</span><span>' + T.ejeTu + '</span><span>' + T.ejeMas + '</span></p></div>' +
        '<div class="abajo">' + botonReservar('cabecera', 'boton--luz') +
          '<p class="mini hero-pie">' + O.heroPie.replace('{m}', m) + '</p></div>' +
      '</div></div></div></section>';
    // 01 · el porcentaje (la primera pregunta de la A, dicha y no preguntada) y los seis deseos (la tercera).
    var notas = '<section class="sec papel" id="notas"><div class="w pila pila--l">' +
      '<div class="pila medio">' + rotulo(1, O.cienRotulo) + '<h2 class="t2">' + O.cienTitulo + '</h2>' +
        '<p class="texto grande">' + O.cienTexto + '</p></div>' +
      '<div class="cien" aria-hidden="true"><div class="cien-linea"><i class="hecho"></i><i class="falta"></i><i class="punto"></i></div>' +
        '<p class="cien-pie"><span class="hoy">' + O.cienHoy + '</span><b>' + O.cienFalta + '</b><span class="tope">' + O.cienTope + '</span></p></div>' +
      '<div class="pila"><p class="texto grande nervio">' + O.notasEntrada + '</p>' +
        '<ul class="notas">' + O.notas.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>' +
      '<p class="texto grande nervio">' + O.notasCierre + '</p></div></section>';
    // 02 · lo que hay detrás, y la segunda pregunta de la A (cómo te cuidas) como motivo para medir.
    var detras = '<section class="sec alba grano" id="detras"><div class="w"><div class="pila porque">' + rotulo(2, O.detrasRotulo) +
      '<h2 class="t2">' + T.detrasTitulo + '</h2>' +
      '<p class="entrada">' + T.detrasTexto + '</p>' +
      '<div class="modos" aria-hidden="true"><span>' + T.modoA + '</span><i><b></b></i><span>' + T.modoB + '</span></div>' +
      '<p class="texto">' + O.detrasMas + '</p>' +
      '<p class="entrada cuidas">' + O.cuidas + '</p></div></div></section>';
    // 03 · se puede medir: cómo, qué número sale y las tres lecturas.
    var medir = '<section class="sec papel" id="medir"><div class="w pila pila--l">' +
      '<div class="pila medio">' + rotulo(3, O.medirRotulo) + '<h2 class="t2">' + O.medirTitulo + '</h2>' +
        '<p class="texto grande nervio">' + O.medirPorque + '</p>' +
        '<p class="texto grande">' + T.medirQue + '</p></div>' +
      '<div class="pila sabras-caja"><ul class="sabras">' +
        C.FICHA.map(function (x) { return '<li><h3>' + x[0] + '</h3><p class="texto">' + x[2] + '</p></li>'; }).join('') +
      '</ul><p class="texto sabras-pie">' + T.sabrasPie + '</p></div></div></section>';
    // 04 · para qué sirve el dato: el plan. Las terapias, solo con su nombre, su foto y qué son.
    var plan = '<section class="sec papel velado" id="plan"><div class="w pila pila--l">' +
      '<div class="pila medio">' + rotulo(4, O.planRotulo) + '<h2 class="t2">' + O.planTitulo + '</h2>' +
        '<p class="texto grande nervio">' + O.planCambia + '</p>' +
        '<p class="texto grande">' + O.planTexto + '</p></div>' +
      '<ul class="tiras">' + O.terapias.map(function (x) {
        return '<li><img src="' + FOTO + x[2] + '" alt="" width="120" height="120" loading="lazy" decoding="async" style="object-position:' + x[3] + '">' +
          '<div><h3>' + x[0] + '</h3><p>' + x[1] + '</p></div></li>';
      }).join('') + '</ul>' +
      '<p class="texto grande nervio medio">' + O.planCierre + '</p></div></section>';
    pinta(hero + notas + detras + medir + plan + secInvitacion(5, paraAnuncio || O.para) + secConfianza(6) + secDudas(7) + secFinal() + flota());
    evento('eligio_tema', { tema: 'directo' });
    evento('vio_resultado', { tema: 'directo' });
    activaResultado('directo');
  }

  function render() {
    if (MODO === 'oferta') return oferta();
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
