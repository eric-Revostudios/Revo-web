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
  var scrim, panel, body, titleEl, extEl, waAside, waTxt, lastFocus = null;
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
      '</div>' +
      '<a class="bk-wa" id="bkWa" href="#" target="_blank" rel="noopener" aria-label="WhatsApp">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.9 14.1c-.25.7-1.45 1.34-2 1.4-.53.05-1.05.24-3.5-.73-2.95-1.16-4.83-4.2-4.98-4.4-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.58-.37.78-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.25.6.84 2.06.91 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.35.07.12.07.72-.18 1.42Z"/></svg>' +
        '<span class="bk-wa-txt">WhatsApp</span>' +
      '</a>';
    document.body.appendChild(scrim);
    panel   = scrim.querySelector('#bkPanel');
    body    = scrim.querySelector('#bkBody');
    titleEl = scrim.querySelector('#bkTitle');
    extEl   = scrim.querySelector('#bkExt');
    waAside = scrim.querySelector('#bkWa');
    waTxt   = waAside ? waAside.querySelector('.bk-wa-txt') : null;

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
    var url = opts.url || urlFor(opts.board || DEFAULT_BOARD);
    panel.dataset.mode = resolveMode(opts.mode);
    titleEl.textContent = opts.title || 'Reservar';
    extEl.href = url;
    if(opts.whatsapp && waAside){ waAside.href = opts.whatsapp; var wl = opts.whatsappLabel || 'WhatsApp'; if(waTxt) waTxt.textContent = wl; waAside.setAttribute('aria-label', wl); waAside.title = wl; waAside.classList.add('on'); }
    else if(waAside){ waAside.classList.remove('on'); }
    lastFocus = document.activeElement;

    body.innerHTML = loadingHTML;
    var load = body.querySelector('.bk-load');
    var frame = document.createElement('iframe');
    frame.id = 'iframe_appointments_' + APPT;
    frame.src = url;
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
