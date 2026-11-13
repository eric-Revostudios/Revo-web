/* Lógica de la landing «Tu punto de partida» (/punto-de-partida). Sin dependencias.
   - Pinta la página entera con los textos de punto-de-partida-contenido.js (window.PUNTO_PARTIDA)
     y las fichas de terapia de tu-caso-contenido.js (window.TU_CASO.TERAPIAS).
   - Las dos preguntas cambian dentro de su propia sección: no hay cambio de pantalla ni de dirección.
   - Medición: el mismo sistema que tu-caso.js. Cada paso manda un evento a POST /api/landing-evento
     (sin cookies, sin datos personales, con un id de sesión aleatorio que muere al cerrar la pestaña).
     SOLO nombres de evento de la lista de api/landing-evento.js: la función y la Platform descartan los demás.
   - El enlace de Momence es window.REVO_PUNTO_PARTIDA_URL (en la cabecera de punto-de-partida.html). */
(function () {
  'use strict';
  var C = window.PUNTO_PARTIDA;
  if (!C) return;
  var TC = window.TU_CASO || {};
  var TERAPIAS = TC.TERAPIAS || {};
  var FOTO = TC.FOTO || 'assets/';
  var MOMENCE = window.REVO_PUNTO_PARTIDA_URL || 'https://www.revostudios.eu/visita';
  var MIN = C.MINUTOS || 60;
  var WA = C.WHATSAPP + '?text=' + encodeURIComponent(C.WHATSAPP_TEXTO);
  function conMin(s) { return String(s).replace(/\{min\}/g, MIN); }
  // Que «40 €», «100 %» o «−130 °C» no se partan nunca entre dos líneas.
  function nb(html) { return html.replace(/(\d) (%|€|°C)/g, '$1 $2'); }

  /* ---------- parámetros del enlace ---------- */
  var params = new URLSearchParams(location.search);
  var utmContent = (params.get('utm_content') || '').slice(0, 120);
  var utmSource = (params.get('utm_source') || '').slice(0, 60);
  var v = 'a'; // el contrato de eventos lleva `v`; aquí no hay variantes

  // Subtítulo según el anuncio: «icp1», «icp2»… en cualquier parte de utm_content, sin distinguir mayúsculas.
  var subtitulo = conMin(C.CABECERA.subtitulo);
  var icp = utmContent.match(/icp(\d+)/i);
  if (icp && C.SUBTITULOS && C.SUBTITULOS['icp' + parseInt(icp[1], 10)]) subtitulo = C.SUBTITULOS['icp' + parseInt(icp[1], 10)];

  /* ---------- sesión: id aleatorio que muere al cerrar la pestaña (la misma clave que /tu-caso) ---------- */
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
  var sesion = leer('tc_sesion');
  if (!sesion || !/^[a-z0-9]{8,64}$/.test(sesion)) { sesion = idAleatorio(); guardar('tc_sesion', sesion); }

  /* ---------- eventos ---------- */
  function evento(nombre, datos) {
    var cuerpo = JSON.stringify({
      sesion: sesion,
      evento: nombre,
      datos: datos || {},
      v: v,
      utm_content: utmContent,
      utm_source: utmSource,
      pagina: 'punto-de-partida',
      ts: new Date().toISOString()
    });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon('/api/landing-evento', new Blob([cuerpo], { type: 'application/json' }))) return;
    } catch (e) {}
    try {
      fetch('/api/landing-evento', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- tiempo en la página y hasta dónde baja ----------
     Al cerrar o esconder la pestaña se manda UN evento `tiempo` con los segundos y el % de la página
     que llegó a ver. Si vuelve a la pestaña, se empieza a contar otra vez. Sin cronómetro en vivo. */
  var desde = Date.now(), scrollMax = 0, contando = true;
  function medirScroll() {
    var alto = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) || 1;
    var visto = Math.round(((window.scrollY || window.pageYOffset || 0) + window.innerHeight) / alto * 100);
    if (visto > scrollMax) scrollMax = Math.min(100, visto);
  }
  function mandaTiempo() {
    if (!contando) return;
    contando = false;
    medirScroll();
    var seg = Math.round((Date.now() - desde) / 1000);
    if (seg >= 1) evento('tiempo', { pantalla: 'inicio', segundos: Math.min(seg, 3600), scroll: scrollMax });
  }
  window.addEventListener('scroll', medirScroll, { passive: true });
  window.addEventListener('pagehide', mandaTiempo);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') mandaTiempo();
    else if (!contando) { contando = true; desde = Date.now(); scrollMax = 0; medirScroll(); }
  });

  /* ---------- piezas ---------- */
  var flecha = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  function boton(desde, clase) {
    return '<a class="cta' + (clase ? ' ' + clase : '') + '" href="' + MOMENCE + '" data-reservar="' + desde + '">' + C.CTA + '</a>';
  }
  function etq(t) { return '<p class="etq">' + t + '</p>'; }

  function hero() {
    var H = C.CABECERA;
    return '<section class="hero" id="cabecera">' +
      '<picture class="bg">' +
        '<source media="(min-width: 900px)" srcset="assets/studio-lounge.webp" type="image/webp">' +
        '<img src="assets/lounge.webp" alt="" width="1125" height="1500" fetchpriority="high" decoding="async">' +
      '</picture>' +
      '<div class="in">' +
        '<img class="logo" src="assets/revo-logo-white.webp" alt="' + C.LOGO_ALT + '" width="2253" height="819">' +
        '<div class="txt">' +
          '<p class="ante">' + H.antetitulo + '</p>' +
          '<h1>' + H.titular + '</h1>' +
          '<p class="sub">' + subtitulo + '</p>' +
          boton('cabecera', 'cta--claro') +
          '<p class="wa">' + H.waPregunta + ' <a href="' + WA + '" target="_blank" rel="noopener" data-wa="cabecera">' + H.waEnlace + '</a></p>' +
          '<p class="nota">' + H.nota + '</p>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function seccionPreguntas() {
    var P = C.PREGUNTAS;
    return '<section class="sec" id="preguntas"><div class="in">' +
      '<h2>' + P.titulo + '</h2>' +
      '<p class="lead">' + P.entradilla + '</p>' +
      '<div class="quiz" id="quiz" aria-live="polite"></div>' +
    '</div></section>';
  }

  function seccionPasos() {
    var lista = C.PASOS.lista.map(function (p, i) {
      return '<li><span class="n">' + (i + 1) + '</span><div><h3>' + p[0] + '</h3><p>' + p[1] + '</p></div></li>';
    }).join('');
    return '<section class="sec sec--suave" id="pasos"><div class="in">' +
      '<h2>' + conMin(C.PASOS.titulo) + '</h2>' +
      '<ol class="pasos">' + lista + '</ol>' +
      boton('pasos') +
    '</div></section>';
  }

  function foto(src, w, h, pos) {
    return '<figure class="foto"><img src="' + src + '" alt="" width="' + w + '" height="' + h + '" loading="lazy" decoding="async"' +
      (pos ? ' style="object-position:' + pos + '"' : '') + '></figure>';
  }

  function seccionEquipo() {
    var E = C.EQUIPO, d = E.doctora, c = E.coach;
    var icono = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c.9-3.6 3.7-5.6 7-5.6s6.1 2 7 5.6"/></svg>';
    return '<section class="sec" id="equipo"><div class="in">' +
      '<h2>' + E.titulo + '</h2>' +
      '<div class="equipo">' +
        '<div class="persona">' +
          '<img class="cara" src="' + d.foto + '" alt="' + d.nombre + '" width="200" height="200" loading="lazy" decoding="async">' +
          '<div><h3>' + d.nombre + '</h3><p>' + d.texto + '</p>' + (d.colegiada ? '<p class="coleg">' + d.colegiada + '</p>' : '') + '</div>' +
        '</div>' +
        '<div class="persona">' +
          '<span class="cara cara--icono">' + icono + '</span>' +
          '<div><h3>' + c.nombre + '</h3><p>' + c.texto + '</p></div>' +
        '</div>' +
      '</div>' +
    '</div></section>';
  }

  function seccionTestimonio() {
    var T = C.TESTIMONIO;
    return '<section class="sec sec--suave testi"><div class="in">' +
      '<blockquote><p>«' + T.texto + '»</p><footer>' + T.quien + '</footer></blockquote>' +
    '</div></section>';
  }

  function seccionReserva() {
    var R = C.RESERVA;
    return '<section class="sec reserva" id="reserva"><div class="in">' +
      '<h2>' + R.titulo + '</h2>' +
      '<p class="lead">' + R.texto + '</p>' +
      boton('reserva', 'cta--claro') +
      '<p class="wa">' + R.waPregunta + ' <a href="' + WA + '" target="_blank" rel="noopener" data-wa="reserva">' + R.waEnlace + '</a></p>' +
    '</div></section>';
  }

  function seccionProbarYSeguir() {
    var P = C.PRUEBA, S = C.SEGUIR;
    return '<section class="sec" id="despues"><div class="in"><div class="bloques">' +
      '<div class="bloque"><h3>' + P.titulo + '</h3><p>' + P.texto + '</p></div>' +
      '<div class="bloque"><h3>' + S.titulo + '</h3><p>' + S.texto + '</p>' +
        '<a class="enlace" href="' + S.href + '">' + S.enlace + ' →</a></div>' +
    '</div></div></section>';
  }

  function seccionDonde() {
    var D = C.DONDE;
    return '<section class="sec sec--suave donde" id="donde"><div class="in">' +
      '<h2>' + D.titulo + '</h2>' +
      '<p>' + D.barrio + '</p>' +
      '<p class="dir">' + D.direccion + '</p>' +
      '<p class="hor">' + D.horario + '</p>' +
      '<a class="enlace" href="' + C.MAPA + '" target="_blank" rel="noopener">' + D.enlace + ' ↗</a>' +
    '</div></section>';
  }

  var dudasVisibles = C.DUDAS.lista.filter(function (d) { return d[1]; }); // las PENDIENTES (null) no salen
  function seccionDudas() {
    var lista = dudasVisibles.map(function (d, i) {
      return '<details data-duda="' + i + '"><summary>' + d[0] + '</summary><p>' + d[1] + '</p></details>';
    }).join('');
    return '<section class="sec dudas" id="dudas"><div class="in">' +
      '<h2>' + C.DUDAS.titulo + '</h2>' + lista +
    '</div></section>';
  }

  function seccionCierre() {
    var X = C.CIERRE;
    return '<section class="sec cierre" id="cierre">' +
      '<picture class="bg"><img src="assets/studio-lounge.webp" alt="" width="2000" height="1333" loading="lazy" decoding="async"></picture>' +
      '<div class="in">' +
        '<h2>' + X.titulo + '</h2>' +
        '<p class="lead">' + X.texto + '</p>' +
        boton('cierre', 'cta--claro') +
        '<p class="firma">' + X.firma + '</p>' +
      '</div>' +
    '</section>' +
    '<p class="pie">' + C.PIE + ' · <a href="privacidad.html">' + C.PRIVACIDAD + '</a> · <button type="button" data-cookies>' + C.COOKIES + '</button></p>';
  }

  /* ---------- la página ---------- */
  ajustaAviso(); // antes de pintar: si el aviso de cookies ya está, la cabecera nace con su hueco (sin salto)
  var app = document.getElementById('app');
  app.innerHTML = nb(
    hero() +
    seccionPreguntas() +
    seccionPasos() +
    foto('assets/studio-salas.webp', 2000, 1333, '50% 60%') +
    seccionEquipo() +
    seccionTestimonio() +
    foto('assets/studio-fachada.webp', 2000, 1333, '50% 60%') +
    seccionReserva() +
    seccionProbarYSeguir() +
    seccionDonde() +
    seccionDudas() +
    seccionCierre() +
    '<div class="fijo" id="fijo">' + boton('fijo') + '</div>');

  /* ---------- las dos preguntas, dentro de su sección ---------- */
  var P = C.PREGUNTAS;
  var quiz = document.getElementById('quiz');
  var estado = { tema: null, rama: null };
  var reducido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function buscar(lista, id) { for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i]; return null; }
  function alQuiz(siempre) {
    var top = quiz.getBoundingClientRect().top;
    if (siempre || top < 0) quiz.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
  }

  function pregunta1() {
    estado.tema = null; estado.rama = null;
    quiz.innerHTML = '<div class="fade">' +
      '<p class="paso"><span>' + P.paso1 + '</span></p>' +
      '<h3 class="preg">' + P.pregunta1 + '</h3>' +
      '<div class="btns">' + P.temas.map(function (t) {
        return '<button type="button" class="opt" data-tema="' + t.id + '">' + t.boton + flecha + '</button>';
      }).join('') + '</div></div>';
  }
  function pregunta2() {
    quiz.innerHTML = '<div class="fade">' +
      '<p class="paso"><span>' + P.paso2 + '</span><button type="button" data-atras>← ' + P.atras + '</button></p>' +
      '<h3 class="preg">' + P.pregunta2 + '</h3>' +
      '<div class="btns">' + P.ramas.map(function (r) {
        return '<button type="button" class="opt" data-rama="' + r.id + '">' + r.boton + flecha + '</button>';
      }).join('') + '</div></div>';
  }
  function resultado() {
    var t = buscar(P.temas, estado.tema), r = buscar(P.ramas, estado.rama);
    if (!t || !r) return pregunta1();
    var tarjetas = t.terapias.map(function (id) {
      var x = TERAPIAS[id];
      if (!x) return '';
      return '<article class="tar">' +
        '<img src="' + FOTO + x.foto + '" alt="" width="' + x.w + '" height="' + x.h + '" loading="lazy" decoding="async" style="object-position:' + x.pos + '">' +
        '<div class="tx"><h4>' + x.nombre + '</h4><p class="dato">' + x.dato + '</p><p class="efecto">' + x.efecto + '</p></div>' +
      '</article>';
    }).join('');
    quiz.innerHTML = nb('<div class="fade res">' +
      etq(P.etqResultado) +
      (tarjetas ? '<div class="tarjetas">' + tarjetas + '</div>' : '') +
      '<p class="frase">' + r.frase + '</p>' +
      '<p class="siempre">' + P.siempre + '</p>' +
      boton('resultado') +
      '<button type="button" class="enlace cambiar" data-cambiar>' + P.cambiar + '</button>' +
    '</div>');
  }

  quiz.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-tema')) {
      estado.tema = b.getAttribute('data-tema');
      evento('eligio_tema', { tema: estado.tema });
      pregunta2(); alQuiz(false);
    } else if (b.hasAttribute('data-rama')) {
      estado.rama = b.getAttribute('data-rama');
      evento('eligio_rama', { tema: estado.tema, rama: estado.rama });
      resultado(); alQuiz(true);
      evento('vio_resultado', { tema: estado.tema, rama: estado.rama });
    } else if (b.hasAttribute('data-atras')) {
      pregunta1(); alQuiz(false);
    } else if (b.hasAttribute('data-cambiar')) {
      pregunta1(); alQuiz(true);
    }
    observaBotones(); pintaFijo(); // el botón del resultado aparece o desaparece
  });
  pregunta1();

  /* ---------- clics que se miden ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-reservar],[data-wa],[data-cookies]') : null;
    if (!el) return;
    if (el.hasAttribute('data-reservar')) {
      // El evento sale por sendBeacon antes de saltar; Momence se abre en la misma pestaña.
      var d = { desde: el.getAttribute('data-reservar') };
      if (estado.tema) d.tema = estado.tema;
      if (estado.rama) d.rama = estado.rama;
      evento('pulso_reservar', d);
    } else if (el.hasAttribute('data-wa')) {
      evento('pulso_whatsapp', { desde: el.getAttribute('data-wa') });
    } else if (el.hasAttribute('data-cookies')) {
      if (window.revoCookies && window.revoCookies.open) window.revoCookies.open();
    }
  });
  app.querySelectorAll('[data-duda]').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) evento('abrio_duda', { duda: dudasVisibles[d.getAttribute('data-duda')][0] });
    });
  });

  /* ---------- botón fijo, llegada a la reserva y a las dudas ----------
     El fijo sale cuando el botón de la cabecera queda por encima de la pantalla, y se esconde mientras
     la reserva o el cierre están a la vista o hay otro botón «Elegir día y hora» en pantalla,
     para que nunca haya dos botones iguales encimados. En ordenador no se ve (CSS). */
  var fijo = document.getElementById('fijo');
  var pasoCabecera = false, enReserva = false, enCierre = false, llego = false, vioDudas = false;
  var botonesALaVista = [];
  var ioBotones = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var i = botonesALaVista.indexOf(e.target);
      if (e.isIntersecting && i < 0) botonesALaVista.push(e.target);
      if (!e.isIntersecting && i >= 0) botonesALaVista.splice(i, 1);
    });
    pintaFijo();
  }, { threshold: 0 }) : null;
  function observaBotones() {
    if (!ioBotones) return;
    app.querySelectorAll('.cta[data-reservar]').forEach(function (b) {
      var d = b.getAttribute('data-reservar');
      if (d !== 'fijo' && d !== 'cabecera') ioBotones.observe(b); // observar dos veces el mismo no hace nada
    });
  }
  function pintaFijo() {
    botonesALaVista = botonesALaVista.filter(function (el) { return el.isConnected; }); // el del resultado puede haberse borrado
    fijo.classList.toggle('on', pasoCabecera && !enReserva && !enCierre && !botonesALaVista.length);
  }
  observaBotones();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var e = es[0];
      pasoCabecera = !e.isIntersecting && e.boundingClientRect.top < 0; pintaFijo();
    }, { threshold: 0 }).observe(document.querySelector('#cabecera .cta'));
    new IntersectionObserver(function (es) {
      var e = es[0];
      enReserva = e.isIntersecting; pintaFijo();
      if (e.isIntersecting && !llego) { llego = true; evento('llego_propuesta', {}); }
    }, { threshold: 0.35 }).observe(document.getElementById('reserva'));
    new IntersectionObserver(function (es) {
      enCierre = es[0].isIntersecting; pintaFijo();
    }, { threshold: 0.2 }).observe(document.getElementById('cierre'));
    new IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !vioDudas) { vioDudas = true; evento('vio_dudas', {}); }
    }, { threshold: 0.2 }).observe(document.getElementById('dudas'));
  } else {
    pasoCabecera = true; pintaFijo();
  }

  /* ---------- que el aviso de cookies no tape la cabecera en el móvil ----------
     Mientras el aviso está abierto, la cabecera deja abajo su alto libre y el texto sube.
     revo-cookies.js lo pinta antes que esta página (los dos van con defer, él primero). */
  function ajustaAviso() {
    var b = document.querySelector('.rc-banner');
    var alto = (b && window.innerWidth < 900) ? b.offsetHeight + 12 : 0;
    document.documentElement.style.setProperty('--rc-alto', alto + 'px');
  }
  window.addEventListener('resize', ajustaAviso);
  document.addEventListener('revo:consent', function () {
    document.documentElement.style.setProperty('--rc-alto', '0px');
  });

  if (!leer('pp_abrio')) { guardar('pp_abrio', '1'); evento('abrio', {}); }
  medirScroll();
})();
