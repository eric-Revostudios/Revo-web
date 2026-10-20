/* Lógica de la landing «Tu caso» (/tu-caso). Sin dependencias.
   - Navegación por hash (#q2/tema · #r/tema/rama · #todo) para que el botón «atrás» del navegador
     funcione siempre y recargar en el resultado vuelva a enseñar el resultado.
   - Cada toque manda un evento a POST /api/landing-evento (contrato en docs/landing-captacion-diseno.md
     de revo-clinical, sección 5 del prompt): sin cookies y sin ningún dato personal.
   - El enlace de Momence es window.REVO_TU_CASO_URL (en la cabecera de tu-caso.html). */
(function () {
  'use strict';
  var C = window.TU_CASO;
  if (!C) return;
  var T = C.TEXTOS;
  var MOMENCE = window.REVO_TU_CASO_URL || 'https://www.revostudios.eu/visita';

  /* ---------- parámetros del enlace (v se admite por el contrato de eventos; hoy solo existe «a») ---------- */
  var params = new URLSearchParams(location.search);
  var v = C.VARIANTES[params.get('v')] ? params.get('v') : 'a';
  var V = C.VARIANTES[v];
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
      pagina: 'tu-caso',
      ts: new Date().toISOString()
    });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon('/api/landing-evento', new Blob([cuerpo], { type: 'application/json' }))) return;
    } catch (e) {}
    try {
      fetch('/api/landing-evento', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- pantallas ---------- */
  var app = document.getElementById('app');
  var flecha = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  var navegado = false; // true en cuanto ha habido un cambio de hash dentro de la página

  function marca(extra) {
    return '<header class="marca"><img class="logo" src="assets/revo-logo-white.webp" alt="' + T.logoAlt + '" width="2253" height="819">' +
      (extra || '<b>' + T.marca + '</b>') + '</header>';
  }
  function pie() {
    return '<p class="pie">' + T.pie + ' · <a href="privacidad.html">' + T.privacidad + '</a></p>';
  }
  function pintar(html, clase) {
    app.innerHTML = '<div class="pantalla fade ' + (clase || '') + '">' + html + '</div>';
    window.scrollTo(0, 0);
  }

  function pantalla1(todo) {
    var cab = todo
      ? '<p class="paso">' + T.paso1 + '</p><p class="porque">' + T.porqueTodo + '</p><h1 class="preg">' + T.preguntaTodo + '</h1>'
      : '<p class="paso">' + T.paso1 + '</p><p class="porque">' + T.porque1 + '</p><h1 class="preg">' + T.pregunta1 + '</h1>';
    var botones = C.ORDEN.map(function (id) {
      return '<a class="opt" href="#q2/' + id + '" data-tema="' + id + '">' + C.RAMAS[id].boton + flecha + '</a>';
    }).join('');
    var todoLink = todo ? '' : '<a class="link" href="#todo" data-tema="todo">' + T.todo + '</a>';
    pintar(marca() + '<div class="pad">' + cab + '<div class="btns">' + botones + '</div>' + todoLink + '</div>' + pie());
    app.querySelectorAll('[data-tema]').forEach(function (b) {
      b.addEventListener('click', function () { evento('eligio_tema', { tema: b.getAttribute('data-tema') }); });
    });
  }

  function pantalla2(tema) {
    var r = C.RAMAS[tema];
    if (!r) { location.hash = ''; return; }
    var botones = ['a', 'b'].map(function (k) {
      return '<a class="opt" href="#r/' + tema + '/' + k + '" data-rama="' + k + '">' + r.respuestas[k].boton + flecha + '</a>';
    }).join('');
    pintar(marca('<button type="button" class="atras" data-atras>' + T.atras + '</button>') +
      '<div class="pad">' +
        '<p class="paso">' + T.paso2 + '</p>' +
        '<p class="porque">' + (r.porque || T.porque2) + '</p>' +
        '<h1 class="preg">' + r.pregunta + '</h1>' +
        '<div class="btns">' + botones + '</div>' +
        '<a class="link" href="#r/' + tema + '/' + r.ambas + '" data-rama="ambas">' + (r.ambasTexto || T.ambas) + '</a>' +
      '</div>' + pie());
    app.querySelector('[data-atras]').addEventListener('click', function () {
      if (navegado && history.length > 1) history.back(); else location.hash = '';
    });
    app.querySelectorAll('[data-rama]').forEach(function (b) {
      b.addEventListener('click', function () { evento('eligio_rama', { tema: tema, rama: b.getAttribute('data-rama') }); });
    });
  }

  function resultado(tema, k) {
    var r = C.RAMAS[tema];
    var a = r && r.respuestas[k];
    if (!a) { location.hash = ''; return; }

    var tarjetas = a.terapias.map(function (id) {
      var t = C.TERAPIAS[id];
      var efecto = (a.efectos && a.efectos[id]) || t.efecto;
      return '<article class="tar">' +
        '<img src="' + C.FOTO + t.foto + '" alt="" width="' + t.w + '" height="' + t.h + '" loading="lazy" decoding="async" style="object-position:' + t.pos + '">' +
        '<div class="tx"><h3>' + t.nombre + '</h3><p class="dato">' + t.dato + '</p><p class="efecto">' + efecto + '</p></div>' +
      '</article>';
    }).join('');
    var dudas = C.DUDAS.map(function (d, i) {
      return '<details data-duda="' + i + '"><summary>' + d[0] + '</summary><p>' + d[1] + '</p></details>';
    }).join('');
    var propuesta = a.metodo
      ? '<p>' + T.propuestaMetodo + ' ' + a.metodo + '</p>'
      : '<p>' + T.propuesta + '</p>';
    var tituloProp = a.metodo ? T.tituloPropMetodoA : V.tituloProp;
    var visita = T.visita.map(function (x) { return '<li>' + x + '</li>'; }).join('');

    pintar(marca('<a href="#" data-cambiar>' + T.cambiar + '</a>') +
      '<section class="leccion" id="leccion">' +
        '<p class="etq">' + (r.tituloLeccion || T.tituloLeccion) + '</p>' +
        '<p>' + a.leccion + '</p>' +
      '</section>' +
      '<section class="bloque">' +
        '<p class="etq">' + T.tituloTerapias + '</p>' +
        '<div class="tarjetas">' + tarjetas + '</div>' +
      '</section>' +
      '<section class="prop" id="propuesta">' +
        '<p class="etq">' + T.etqVisita + '</p>' +
        '<h2>' + tituloProp + '</h2>' +
        propuesta +
        '<ul>' + visita + '</ul>' +
        '<p class="miedo">' + T.miedo + '</p>' +
        '<a class="cta" href="' + MOMENCE + '" data-reservar="propuesta">' + V.cta + '</a>' +
        '<p class="sub">' + T.sub + '</p>' +
        '<div class="prueba"><p>' + T.prueba + '</p>' +
          '<a class="cta cta--2" href="' + MOMENCE + '" data-reservar="prueba">' + T.pruebaBoton + '</a></div>' +
      '</section>' +
      '<section class="dudas">' +
        '<p class="etq">' + T.tituloDudas + '</p>' + dudas +
      '</section>' +
      '<section class="wa">' + T.wa + ' <a href="' + C.WHATSAPP + '" target="_blank" rel="noopener" data-wa>' + T.waEnlace + '</a></section>' +
      pie() +
      '<div class="fijo" id="fijo"><a class="cta" href="' + MOMENCE + '" data-reservar="fijo">' + V.cta + '</a></div>',
      'resultado');

    evento('vio_resultado', { tema: tema, rama: k });

    app.querySelector('[data-cambiar]').addEventListener('click', function (e) {
      e.preventDefault();
      evento('cambio_tema', { desde: tema });
      location.hash = '';
    });
    app.querySelectorAll('[data-reservar]').forEach(function (b) {
      // El evento sale por sendBeacon antes de saltar; Momence se abre en la misma pestaña.
      b.addEventListener('click', function () { evento('pulso_reservar', { tema: tema, rama: k, desde: b.getAttribute('data-reservar') }); });
    });
    app.querySelector('[data-wa]').addEventListener('click', function () { evento('pulso_whatsapp', { tema: tema, rama: k }); });
    app.querySelectorAll('[data-duda]').forEach(function (d) {
      d.addEventListener('toggle', function () { if (d.open) evento('abrio_duda', { duda: C.DUDAS[d.getAttribute('data-duda')][0] }); });
    });

    // Botón fijo: tras pasar la lección (fijoDesde:'leccion') o desde el principio (fijoDesde:'inicio');
    // se esconde mientras la propuesta está a la vista para que no haya dos botones encimados.
    var fijo = document.getElementById('fijo');
    var pasoLeccion = V.fijoDesde === 'inicio', propVisible = false, llego = false;
    function pinta() { fijo.classList.toggle('on', pasoLeccion && !propVisible); }
    pinta();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        var e = es[0];
        if (!e.isIntersecting && e.boundingClientRect.top < 0) { pasoLeccion = true; pinta(); }
      }, { threshold: 0 }).observe(document.getElementById('leccion'));
      new IntersectionObserver(function (es) {
        var e = es[0];
        propVisible = e.isIntersecting; pinta();
        if (e.isIntersecting && !llego) { llego = true; evento('llego_propuesta', { tema: tema, rama: k }); }
      }, { threshold: 0.35 }).observe(document.getElementById('propuesta'));
    } else {
      pasoLeccion = true; pinta();
    }
  }

  function render() {
    var h = location.hash.replace(/^#\/?/, '');
    if (!h) return pantalla1(false);
    if (h === 'todo') return pantalla1(true);
    var p = h.split('/');
    if (p[0] === 'q2') return pantalla2(p[1]);
    if (p[0] === 'r') return resultado(p[1], p[2]);
    pantalla1(false);
  }

  window.addEventListener('hashchange', function () { navegado = true; render(); });

  if (!leer('tc_abrio')) { guardar('tc_abrio', '1'); evento('abrio', {}); }
  render();
})();
