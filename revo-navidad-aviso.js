/* ===========================================================
   REVO — Aviso de la campaña de Navidad 2026 en la web (preparado el 20-nov-2026, rama claude/navidad-anunciar)
   - Añade «Navidad» (en inglés, «Christmas») al menú, junto a «Experiencias». Va en todas las páginas con menú.
   - Con data-franja en la etiqueta <script>, además una franja discreta arriba (portada y experiencias, ES y EN).
   - CADUCA SOLO: a partir del 6 de enero de 2027 (hora de Madrid) no pinta nada. Después se puede quitar la línea
     <script src="/revo-navidad-aviso.js"> de las páginas cuando se quiera; no hace falta hacerlo ese día.
   - Lleva a /navidad?c=web (o /en/navidad?c=web): el canal «web» («La web», sin sorteo) lo creó la Platform el
     21-nov-2026 para lo que llega desde la propia web. Lleva además utm_source=web y utm_medium=franja | menu.
   - No menciona la experiencia de más ni precios. Texto: la pregunta de la campaña (María, 25-nov-2026).
   Se carga en <head> SIN defer: así añade «Navidad» al menú de ordenador antes de que la página construya el menú
   del móvil a partir de él (lo hace al terminar de cargar). Si el menú del móvil ya existiera, se añade también ahí.
   =========================================================== */
(function () {
  'use strict';
  var FIN = Date.parse('2027-01-06T00:00:00+01:00');
  if (!(Date.now() < FIN)) return;

  var yo = document.currentScript;
  var conFranja = !!(yo && yo.hasAttribute('data-franja'));
  var en = /^en/i.test(document.documentElement.lang || '');
  var T = en
    ? { menu: 'Christmas', base: '/en/navidad', ojo: 'Christmas at REVO', txt: 'What do you give someone who has everything?', aria: 'Christmas at REVO: what do you give someone who has everything?' }
    : { menu: 'Navidad', base: '/navidad', ojo: 'Navidad en REVO', txt: '¿Qué le regalas a quien lo tiene todo?', aria: 'Navidad en REVO: ¿qué le regalas a quien lo tiene todo?' };
  function url(medio) { return T.base + '?c=web&utm_source=web&utm_medium=' + medio; }

  function menu() {
    var nav = document.querySelector('.site-header .nav');
    if (nav && !nav.querySelector('[data-navidad]')) {
      // Con una entrada más, entre 1121 px (antes sale el menú del móvil) y 1320 px el menú no cabía y apretaba el
      // botón «Reservar». Solo en ese tramo, y solo mientras está «Navidad», un poco menos de aire entre entradas.
      var ajuste = document.createElement('style');
      ajuste.textContent = '@media (min-width:1121px) and (max-width:1320px){.site-header .nav{gap:18px}.site-header .nav a,.site-header .nav .nav-trigger{letter-spacing:.12em}}';
      document.head.appendChild(ajuste);
      var a = document.createElement('a');
      a.href = url('menu'); a.textContent = T.menu;
      a.setAttribute('data-navidad', ''); a.setAttribute('data-hot', '');
      var exp = nav.querySelector('a[href*="experiencias"]');
      nav.insertBefore(a, exp || null);
    }
    var movil = document.querySelector('.mobile-nav');
    if (movil && !movil.querySelector('[data-navidad]')) {
      var b = document.createElement('a');
      b.className = 'mnav-link'; b.href = url('menu'); b.textContent = T.menu; b.setAttribute('data-navidad', '');
      var expM = movil.querySelector('a[href*="experiencias"]');
      if (expM) movil.insertBefore(b, expM); else movil.appendChild(b);
    }
  }

  function franja() {
    if (!conFranja || document.querySelector('.nv-franja')) return;
    var alto = 38;
    var st = document.createElement('style');
    st.textContent =
      '.nv-franja{position:absolute;z-index:95;top:0;left:0;right:0;height:' + alto + 'px;display:flex;align-items:center;justify-content:center;gap:12px;' +
      'padding:0 16px;background:linear-gradient(90deg,#0b1030,#16245f 45%,#2a3fae);color:#fff;text-decoration:none;' +
      'font:500 12.5px/1 "Neue Haas","Helvetica Neue",Arial,sans-serif;letter-spacing:.02em;white-space:nowrap;overflow:hidden;}' +
      '.nv-franja .nv-o{font-size:10px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.72);}' +
      '.nv-franja .nv-o::before{content:"";display:inline-block;width:5px;height:5px;margin:0 9px 1px 0;border-radius:50%;background:#bcc5ff;box-shadow:0 0 8px 2px rgba(104,129,252,.9);}' +
      '.nv-franja .nv-t{font-family:"Noto Serif Hi",Georgia,serif;font-style:italic;font-size:14px;letter-spacing:-.01em;}' +
      '.nv-franja .nv-i{transition:transform .35s;}.nv-franja:hover .nv-i{transform:translateX(3px);}' +
      '.nv-franja:focus-visible{outline:2px solid #bcc5ff;outline-offset:-4px;}' +
      '@media (max-width:640px){.nv-franja .nv-o{display:none;}}@media (max-width:374px){.nv-franja{gap:7px;padding:0 8px;}.nv-franja .nv-t{font-size:12px;}}';
    document.head.appendChild(st);
    var a = document.createElement('a');
    a.className = 'nv-franja'; a.href = url('franja'); a.setAttribute('aria-label', T.aria);
    a.innerHTML = '<span class="nv-o">' + T.ojo + '</span><span class="nv-t">' + T.txt + '</span><span class="nv-i" aria-hidden="true">→</span>';
    document.body.insertBefore(a, document.body.firstChild);
    // La cabecera es fija arriba: mientras la franja se ve, baja lo que mide la franja; al bajar por la página,
    // la franja se va con el contenido y la cabecera vuelve a su sitio.
    var cab = document.querySelector('.site-header');
    if (!cab) return;
    function coloca() { cab.style.top = Math.max(0, alto - (window.scrollY || 0)) + 'px'; }
    window.addEventListener('scroll', coloca, { passive: true });
    coloca();
  }

  function listo() { menu(); franja(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', listo);
  else listo();
})();
