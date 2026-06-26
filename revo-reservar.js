/* ===========================================================
   REVO — Reservar · motor de reserva Momence (compartido)
   Uso: añade  data-reservar  a cualquier botón/enlace, con
        data-board="146813"   (boardId de Momence)
        data-title="Crioterapia"  (opcional; si no, usa el texto)
        data-mode="auto|drawer|sheet|modal" (opcional; auto por defecto)
   Carga:  <link rel="stylesheet" href="revo-reservar.css">
           <script src="revo-reservar.js" defer></script>
   =========================================================== */
(function(){
  "use strict";
  var APPT = "52479";                 // id de la página de citas (constante)
  var DEFAULT_BOARD = "146948";       // Mi Primer Reset
  function urlFor(board){ return "https://momence.com/appointments/" + APPT + "?boardId=" + (board || DEFAULT_BOARD); }

  // ---- inyecta el overlay una sola vez ----
  var scrim, panel, body, titleEl, extEl, lastFocus = null;
  function build(){
    if(document.getElementById('bkScrim')) return;
    scrim = document.createElement('div');
    scrim.className = 'bk-scrim';
    scrim.id = 'bkScrim';
    scrim.setAttribute('aria-hidden','true');
    scrim.innerHTML =
      '<div class="bk-panel" id="bkPanel" data-mode="drawer" role="dialog" aria-modal="true" aria-label="Reservar">' +
        '<div class="bk-grab" aria-hidden="true"></div>' +
        '<div class="bk-head">' +
          '<div class="bk-eyebrow">' +
            '<span class="bk-kicker">Reservar en REVO</span>' +
            '<span class="bk-title" id="bkTitle">Reservar</span>' +
          '</div>' +
          '<div class="bk-actions">' +
            '<a class="bk-ext" id="bkExt" href="#" target="_blank" rel="noopener">Abrir en Momence <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg></a>' +
            '<button class="bk-close" id="bkClose" type="button" aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<div class="bk-body" id="bkBody"></div>' +
      '</div>';
    document.body.appendChild(scrim);
    panel   = scrim.querySelector('#bkPanel');
    body    = scrim.querySelector('#bkBody');
    titleEl = scrim.querySelector('#bkTitle');
    extEl   = scrim.querySelector('#bkExt');

    scrim.querySelector('#bkClose').addEventListener('click', close);
    scrim.addEventListener('click', function(e){ if(e.target === scrim) close(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && scrim.classList.contains('open')) close(); });
  }

  function resolveMode(mode){
    if(!mode || mode === 'auto') return window.matchMedia('(max-width:600px)').matches ? 'sheet' : 'drawer';
    return mode;
  }
  var loadingHTML = '<div class="bk-load"><div class="bk-spin"></div><span>Cargando reserva</span></div>';

  function open(opts){
    build();
    opts = opts || {};
    var board = opts.board || DEFAULT_BOARD;
    panel.dataset.mode = resolveMode(opts.mode);
    titleEl.textContent = opts.title || 'Reservar';
    extEl.href = urlFor(board);
    lastFocus = document.activeElement;

    body.innerHTML = loadingHTML;
    var load = body.querySelector('.bk-load');
    var frame = document.createElement('iframe');
    frame.id = 'iframe_appointments_' + APPT;
    frame.src = urlFor(board);
    frame.setAttribute('allowfullscreen','true');
    frame.setAttribute('loading','eager');
    frame.addEventListener('load', function(){ if(load) load.classList.add('gone'); });
    body.appendChild(frame);
    setTimeout(function(){ if(load) load.classList.add('gone'); }, 4500);

    document.body.classList.add('bk-lock');
    void scrim.offsetWidth;            // fuerza reflow para que la transición dispare siempre
    scrim.classList.add('open');
    scrim.setAttribute('aria-hidden','false');
    setTimeout(function(){ var c = scrim.querySelector('#bkClose'); if(c) c.focus(); }, 60);
  }
  function close(){
    scrim.classList.remove('open');
    scrim.setAttribute('aria-hidden','true');
    document.body.classList.remove('bk-lock');
    setTimeout(function(){ body.innerHTML = ''; }, 480);
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // ---- precarga al pasar por encima ----
  var preloaded = false;
  function preload(){
    if(preloaded) return; preloaded = true;
    var l = document.createElement('link'); l.rel = 'preconnect'; l.href = 'https://momence.com'; document.head.appendChild(l);
  }

  // ---- engancha los CTA ----
  function bind(el){
    if(el.dataset.bkBound) return; el.dataset.bkBound = '1';
    el.addEventListener('mouseenter', preload, {once:true});
    el.addEventListener('click', function(e){
      e.preventDefault();
      open({ board: el.dataset.board, title: el.dataset.title || el.textContent.trim(), mode: el.dataset.mode });
    });
  }
  function scan(root){ (root || document).querySelectorAll('[data-reservar]').forEach(bind); }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ build(); scan(); });
  } else { build(); scan(); }

  // API pública
  window.REVO = window.REVO || {};
  window.REVO.reservar = open;
  window.REVO.reservarScan = scan;
})();
