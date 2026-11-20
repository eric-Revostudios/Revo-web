/* «Encuentra su regalo» (/navidad), tercera versión, 20-nov-2026.
   Una experiencia a pantalla completa, una pantalla por paso: intro → su nombre → su día a día → la sensación
   que le regalarías → cómo se lo das → «Preparando el regalo de…» → la tarjeta y su resultado.
   Textos: NAVIDAD.TEST y NAVIDAD.REGALO (navidad-contenido.js). La página (navidad.js) le pasa sus utilidades en
   window.NAVIDAD_PAGINA: regalar, evento, porId, fmt, esc, sub.
   Privacidad: el nombre y la dedicatoria se quedan en este navegador; la medición solo lleva los índices elegidos.
   Se abre con cualquier enlace a #test y, al cargar, si la dirección acaba en #test. */
(function () {
  'use strict';
  var N = window.NAVIDAD, P = window.NAVIDAD_PAGINA;
  if (!N || !P) return;
  var T = N.TEST, fmt = P.fmt, esc = P.esc, sub = P.sub;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PASOS = ['nombre', 'dia', 'deseo', 'como'];

  var el, escena, fondoA, fondoB, prog, btnAtras, abierto = false, empujado = false, pila = [], st = null, lastFocus = null;
  function nuevo() { return { nombre: '', rel: null, dia: null, deseo: null, como: null, ded: null }; }

  /* ---------- montaje ---------- */
  function montar() {
    if (el) return;
    el = document.createElement('div');
    el.className = 'nt'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', T.intro.ojo); el.hidden = true;
    el.innerHTML =
      '<div class="nt-fondo" aria-hidden="true"><img alt="" /><img alt="" /></div>' +
      '<div class="nt-barra">' +
        '<button class="nt-icono nt-atras" type="button" aria-label="' + esc(T.atras) + '"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>' +
        '<ol class="nt-prog" aria-hidden="true">' + PASOS.map(function () { return '<li></li>'; }).join('') + '</ol>' +
        '<button class="nt-icono nt-cerrar" type="button" aria-label="' + esc(T.cerrar) + '"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '</div>' +
      '<div class="nt-escena"></div>';
    document.body.appendChild(el);
    escena = el.querySelector('.nt-escena');
    var imgs = el.querySelectorAll('.nt-fondo img'); fondoA = imgs[0]; fondoB = imgs[1];
    prog = el.querySelectorAll('.nt-prog li');
    btnAtras = el.querySelector('.nt-atras');
    btnAtras.addEventListener('click', atras);
    el.querySelector('.nt-cerrar').addEventListener('click', function () { cerrar(true); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(true); });
  }

  function fondo(src, pos) {
    if (!src) { fondoA.classList.remove('ve'); fondoB.classList.remove('ve'); return; }
    var url = '/assets/' + src;
    var vis = fondoA.classList.contains('ve') ? fondoA : fondoB.classList.contains('ve') ? fondoB : null;
    if (vis && vis.getAttribute('src') === url) return;
    var otra = vis === fondoA ? fondoB : fondoA;
    otra.onload = function () { otra.classList.add('ve'); if (vis) vis.classList.remove('ve'); };
    otra.style.objectPosition = pos || '50% 50%';
    otra.setAttribute('src', url);
    if (otra.complete && otra.naturalWidth) otra.onload();
  }

  /* ---------- abrir / cerrar ---------- */
  function abrir() {
    montar();
    if (abierto) return;
    abierto = true; lastFocus = document.activeElement;
    st = nuevo(); pila = [];
    el.hidden = false;
    document.documentElement.classList.add('nt-abierto');
    requestAnimationFrame(function () { el.classList.add('abierto'); });
    try { history.pushState({ nt: 1 }, ''); empujado = true; } catch (e) { empujado = false; }
    ir('intro');
  }
  function cerrar(desdeBoton) {
    if (!abierto) return;
    abierto = false;
    el.classList.remove('abierto');
    document.documentElement.classList.remove('nt-abierto');
    setTimeout(function () { if (!abierto) { el.hidden = true; escena.innerHTML = ''; } }, reduce ? 0 : 400);
    if (desdeBoton && empujado) { empujado = false; try { history.back(); } catch (e) {} }
    if (location.hash === '#test') { try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {} }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  // el botón «atrás» del móvil cierra la experiencia en vez de salir de la página
  window.addEventListener('popstate', function () {
    if (abierto) { empujado = false; cerrar(false); }
    // al volver, que la dirección no se quede en #test (si no, al recargar se abriría otra vez)
    else if (location.hash === '#test') { try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {} }
  });

  /* ---------- navegación entre pantallas ---------- */
  function ir(nombre, sinApilar) {
    var antes = escena.getAttribute('data-p');
    if (!sinApilar && antes && antes !== 'preparando') pila.push(antes);   // la espera no es un paso al que volver
    escena.setAttribute('data-p', nombre);
    var i = PASOS.indexOf(nombre);
    el.classList.toggle('con-prog', i !== -1);
    prog.forEach(function (li, k) { li.className = k < i ? 'hecho' : k === i ? 'ahora' : ''; });
    btnAtras.hidden = !pila.length || nombre === 'preparando';
    el.setAttribute('data-p', nombre);
    PANT[nombre]();
    escena.scrollTop = 0;
    var c = escena.firstElementChild;
    if (c && !reduce) { c.classList.add('nt-entra'); }
    var foco = escena.querySelector('[data-foco]') || escena.querySelector('h2');
    if (foco) setTimeout(function () { try { foco.focus({ preventScroll: true }); } catch (e) {} }, reduce ? 0 : 120);
  }
  function atras() { if (pila.length) ir(pila.pop(), true); }
  // tras elegir: un respiro para ver lo elegido encendido, y un solo avance aunque toquen dos veces
  function luego(fn) {
    if (escena.classList.contains('eligiendo')) return;
    escena.classList.add('eligiendo');
    setTimeout(function () { escena.classList.remove('eligiendo'); fn(); }, reduce ? 0 : 420);
  }

  /* ---------- frases con su nombre ---------- */
  function conNombre(conTxt, sinTxt) { return st.nombre ? sub(conTxt, { nombre: st.nombre }) : sinTxt; }
  function limpiaNombre(v) {
    v = String(v || '').replace(/\s+/g, ' ').trim().slice(0, 30);
    return v ? v.charAt(0).toLocaleUpperCase('es') + v.slice(1) : '';
  }

  /* ---------- pantallas ---------- */
  var PANT = {
    intro: function () {
      fondo(T.intro.foto, '50% 50%');
      escena.innerHTML = '<div class="nt-p nt-intro">' +
        '<p class="ojo">' + fmt(T.intro.ojo) + '</p>' +
        '<h2 class="nt-t1" tabindex="-1">' + fmt(T.intro.titulo) + '</h2>' +
        '<p class="nt-texto">' + fmt(T.intro.texto) + '</p>' +
        '<button class="boton boton--luz" type="button" data-foco>' + fmt(T.intro.boton) + '</button></div>';
      escena.querySelector('.boton').addEventListener('click', function () { ir('nombre'); });
    },

    nombre: function () {
      var Q = T.nombre;
      fondo(null);
      escena.innerHTML = '<div class="nt-p nt-nombre">' +
        '<p class="ojo">' + fmt(Q.ojo) + '</p>' +
        '<h2 class="nt-t2" tabindex="-1">' + fmt(Q.titulo) + '</h2>' +
        '<input class="nt-input" type="text" maxlength="30" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="' + esc(Q.placeholder) + '" aria-label="' + esc(Q.placeholder) + '" data-foco />' +
        '<p class="nt-ayuda">' + fmt(Q.ayuda) + '</p>' +
        '<p class="nt-sub">' + fmt(Q.relacion) + '</p>' +
        '<div class="nt-chips">' + Q.relaciones.map(function (r, k) {
          return '<button class="nt-chip" type="button" aria-pressed="false" data-k="' + k + '">' + fmt(r.t) + '</button>';
        }).join('') + '</div>' +
        '<div class="nt-pie"><button class="boton boton--luz nt-seguir" type="button">' + fmt(T.seguir) + '</button>' +
        '<button class="nt-enlace nt-sin" type="button">' + fmt(Q.sinNombre) + '</button></div></div>';
      var inp = escena.querySelector('.nt-input');
      inp.value = st.nombre;
      escena.querySelectorAll('.nt-chip').forEach(function (b) {
        var k = Number(b.getAttribute('data-k'));
        if (st.rel === k) b.setAttribute('aria-pressed', 'true');
        b.addEventListener('click', function () {
          st.rel = st.rel === k ? null : k;
          escena.querySelectorAll('.nt-chip').forEach(function (x) { x.setAttribute('aria-pressed', String(Number(x.getAttribute('data-k')) === st.rel)); });
        });
      });
      function seguir() { st.nombre = limpiaNombre(inp.value); ir('dia'); }
      escena.querySelector('.nt-seguir').addEventListener('click', seguir);
      escena.querySelector('.nt-sin').addEventListener('click', function () { inp.value = ''; st.nombre = ''; ir('dia'); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); seguir(); } });
    },

    dia: function () {
      var Q = T.dia;
      fondo(null);
      escena.innerHTML = '<div class="nt-p nt-dia">' +
        '<p class="ojo">' + fmt(Q.ojo) + '</p>' +
        '<h2 class="nt-t2" tabindex="-1">' + (st.nombre ? fmt(sub(Q.titulo, { nombre: st.nombre })) : fmt(Q.sin)) + '</h2>' +
        '<div class="nt-fotos">' + Q.opciones.map(function (o, k) {
          return '<button class="nt-foto' + (st.dia === k ? ' elegida' : '') + '" type="button" data-k="' + k + '" style="--d:' + (k * 60) + 'ms">' +
            '<img src="/assets/' + esc(o.foto) + '" alt="" loading="eager" decoding="async" style="object-position:' + esc(o.pos || '50% 50%') + '" />' +
            '<span>' + fmt(o.t) + '</span></button>';
        }).join('') + '</div></div>';
      escena.querySelectorAll('.nt-foto').forEach(function (b) {
        b.addEventListener('click', function () {
          if (escena.classList.contains('eligiendo')) return;
          st.dia = Number(b.getAttribute('data-k'));
          escena.querySelectorAll('.nt-foto').forEach(function (x) { x.classList.toggle('elegida', x === b); x.classList.toggle('apagada', x !== b); });
          luego(function () { ir('deseo'); });
        });
      });
    },

    deseo: function () {
      var Q = T.deseo;
      var o0 = T.dia.opciones[st.dia];
      fondo(o0 && o0.foto, o0 && o0.pos);
      escena.innerHTML = '<div class="nt-p nt-deseo">' +
        '<p class="ojo">' + fmt(Q.ojo) + '</p>' +
        '<h2 class="nt-t2" tabindex="-1">' + (st.nombre ? fmt(sub(Q.titulo, { nombre: st.nombre })) : fmt(Q.sin)) + '</h2>' +
        '<div class="nt-sens">' + Q.opciones.map(function (o, k) {
          return '<button class="nt-s' + (st.deseo === k ? ' elegida' : '') + '" type="button" data-k="' + k + '" style="--d:' + (k * 55) + 'ms">' +
            '<span class="nt-s-t">' + fmt(o.t) + '</span><span class="nt-s-d">' + fmt(o.d) + '</span></button>';
        }).join('') + '</div></div>';
      escena.querySelectorAll('.nt-s').forEach(function (b) {
        b.addEventListener('click', function () {
          if (escena.classList.contains('eligiendo')) return;
          st.deseo = Number(b.getAttribute('data-k'));
          escena.querySelectorAll('.nt-s').forEach(function (x) { x.classList.toggle('elegida', x === b); x.classList.toggle('apagada', x !== b); });
          luego(function () { ir('como'); });
        });
      });
    },

    como: function () {
      var Q = T.como;
      escena.innerHTML = '<div class="nt-p nt-como">' +
        '<p class="ojo">' + fmt(Q.ojo) + '</p>' +
        '<h2 class="nt-t2" tabindex="-1">' + fmt(Q.titulo) + '</h2>' +
        '<div class="nt-dos">' + Q.opciones.map(function (o, k) {
          var ico = o.formato === 'impreso'
            ? '<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="6" y="13" width="36" height="23" rx="3"/><path d="M6 19h36M12 30h10"/></svg>'
            : '<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="15" y="5" width="18" height="38" rx="4"/><path d="M21 37h6"/><path d="M20 18l4 4 7-8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          return '<button class="nt-c' + (st.como === k ? ' elegida' : '') + '" type="button" data-k="' + k + '" style="--d:' + (k * 80) + 'ms">' + ico +
            '<span class="nt-c-t">' + fmt(o.t) + '</span><span class="nt-c-d">' + fmt(o.d) + '</span></button>';
        }).join('') + '</div></div>';
      escena.querySelectorAll('.nt-c').forEach(function (b) {
        b.addEventListener('click', function () {
          if (escena.classList.contains('eligiendo')) return;
          st.como = Number(b.getAttribute('data-k'));
          escena.querySelectorAll('.nt-c').forEach(function (x) { x.classList.toggle('elegida', x === b); x.classList.toggle('apagada', x !== b); });
          luego(function () { ir('preparando'); });
        });
      });
    },

    preparando: function () {
      var Q = T.preparando;
      escena.innerHTML = '<div class="nt-p nt-prep">' +
        '<div class="nt-aro" aria-hidden="true"></div>' +
        '<h2 class="nt-t2" tabindex="-1">' + (st.nombre ? fmt(sub(Q.titulo, { nombre: st.nombre })) : fmt(Q.sin)) + '</h2>' +
        '<ol class="nt-lineas">' + Q.lineas.map(function (l, k) { return '<li style="--d:' + (300 + k * 420) + 'ms">' + fmt(l) + '</li>'; }).join('') + '</ol></div>';
      setTimeout(function () { if (abierto && escena.getAttribute('data-p') === 'preparando') ir('resultado'); }, reduce ? 300 : 1900);
    },

    resultado: function () {
      var R0 = T.res, id = T.deseo.opciones[st.deseo].da, x = P.porId(id), R = N.REGALO[id];
      var oDia = T.dia.opciones[st.dia];
      var otraId = oDia.da !== id ? oDia.da : R.otra, y = P.porId(otraId);
      var rel = st.rel != null ? T.nombre.relaciones[st.rel] : null;
      if (st.ded == null) st.ded = rel && rel.formal ? N.DEDICATORIA_FORMAL : R.dedicatoria;
      var formato = T.como.opciones[st.como].formato;
      var n = st.nombre;
      P.evento('eligio_tema', { tema: id, dia: st.dia, deseo: st.deseo, como: formato, rel: st.rel });
      P.evento('vio_resultado', { exp: id, otra: otraId, test: 1 });
      fondo(x.foto, x.pos);
      var porque = sub(n ? R0.frase : R0.fraseSin, { Nombre: n, porque: oDia.porque, sensacion: R.sensacion, motivo: R.motivo });
      escena.innerHTML = '<div class="nt-p nt-res">' +
        '<div class="nt-tarjeta" aria-hidden="true"><div class="nt-tarjeta-brillo"></div>' +
          '<img class="nt-tr-logo" src="/assets/revo-logo-white.webp" alt="" />' +
          '<p class="nt-tr-ojo">' + fmt(R0.unRegaloPara) + '</p>' +
          '<p class="nt-tr-nombre">' + esc(n || R0.sinNombre) + '</p>' +
          '<p class="nt-tr-exp">' + esc(x.nombre) + '</p>' +
          '<p class="nt-tr-ded" id="ntDedVista"></p>' +
        '</div>' +
        '<div class="nt-res-txt">' +
          '<p class="ojo">' + fmt(R0.ojo) + '</p>' +
          '<h2 class="nt-t1" tabindex="-1">' + esc(x.nombre) + '</h2>' +
          '<p class="nt-texto">' + fmt(R.titular) + '</p>' +
          '<p class="nt-meta"><span>' + esc(x.dur) + '</span><span>' + esc(x.precio) + ' €</span><span>' + fmt(formato === 'impreso' ? R0.formatoImpreso : R0.formatoDigital) + '</span></p>' +
          '<h3 class="nt-h">' + (n ? fmt(sub(R0.porQue, { nombre: n })) : fmt(R0.porQueSin)) + '</h3>' +
          '<p class="nt-porque">' + fmt(porque) + '</p>' +
          '<h3 class="nt-h">' + fmt(R0.sesion) + ' <span>' + esc(x.dur) + '</span></h3>' +
          '<ol class="nt-sesion">' + R.pasos.map(function (p) { return '<li><b>' + esc(p[0]) + '</b><span>' + esc(p[1]) + '</span></li>'; }).join('') + '</ol>' +
          '<h3 class="nt-h">' + fmt(R0.dedicatoria) + '</h3>' +
          '<textarea class="nt-ded" rows="2" maxlength="240" aria-label="' + esc(R0.dedicatoria) + '"></textarea>' +
          '<p class="nt-ayuda">' + fmt(R0.dedicatoriaAyuda) + '</p>' +
          '<div class="nt-otra">' +
            '<h3 class="nt-h">' + fmt(R0.otra) + '</h3>' +
            '<div class="nt-otra-fila"><img src="/assets/' + esc(y.foto) + '" alt="" style="object-position:' + esc(y.pos || '50% 50%') + '" />' +
              '<div><p class="nt-otra-n">' + esc(y.nombre) + '</p><p class="nt-ayuda">' + fmt(y.lema) + ' · ' + esc(y.precio) + ' €</p></div></div>' +
            (window.NAVIDAD_OFERTA ? '<p class="nt-texto nt-oferta">' + fmt(window.NAVIDAD_OFERTA) + '</p>' : '') +
            '<button class="nt-enlace nt-otra-b" type="button">' + fmt(sub(R0.otraBoton, { exp: y.nombre })) + '</button>' +
          '</div>' +
          '<div class="nt-compartir"><p class="nt-texto">' + fmt(R0.compartir) + '</p>' +
            '<a class="nt-enlace" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(sub(R0.compartirTexto, { nombre: n || R0.compartirSin, exp: x.nombre, precio: x.precio, id: id })) + '">' + fmt(R0.compartirBoton) + '</a></div>' +
          '<div class="nt-fin"><button class="nt-enlace nt-otra-vez" type="button">' + fmt(R0.deNuevo) + '</button>' +
            '<button class="nt-enlace nt-todas" type="button">' + fmt(R0.verTodas) + '</button></div>' +
        '</div>' +
        '<div class="nt-fijo"><button class="boton boton--luz nt-regalar" type="button"><span>' + fmt(n ? sub(R0.boton, { nombre: n }) : sub(R0.botonSin, { exp: x.nombre })) + '</span><span class="nt-precio">' + esc(x.precio) + ' €</span></button></div>' +
      '</div>';
      var ta = escena.querySelector('.nt-ded'), vista = document.getElementById('ntDedVista');
      ta.value = st.ded;
      function pinta() { st.ded = ta.value; vista.textContent = ta.value.trim() ? '«' + ta.value.trim() + '»' : ''; }
      ta.addEventListener('input', pinta); pinta();
      escena.querySelector('.nt-regalar').addEventListener('click', function () {
        cerrar(true);
        P.regalar(id, 'test', { para: n, dedicatoria: ta.value.trim(), formato: formato });
      });
      escena.querySelector('.nt-otra-b').addEventListener('click', function () {
        cerrar(true);
        P.regalar(otraId, 'test-otra', { formato: formato });
      });
      escena.querySelector('.nt-compartir a').addEventListener('click', function () { P.evento('pulso_whatsapp', { desde: 'test-compartir', exp: id }); });
      escena.querySelector('.nt-otra-vez').addEventListener('click', function () { st = nuevo(); pila = []; ir('intro', true); });
      escena.querySelector('.nt-todas').addEventListener('click', function () {
        cerrar(true);
        setTimeout(function () { var s = document.getElementById('experiencias'); if (s) s.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }, 80);
      });
    }
  };

  /* ---------- entradas ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="#test"], [data-abrir-test]');
    if (!a) return;
    e.preventDefault();
    abrir();
  });
  if (location.hash === '#test') setTimeout(abrir, 50);
  window.NAVIDAD_TEST = { abrir: abrir, cerrar: cerrar };
})();
