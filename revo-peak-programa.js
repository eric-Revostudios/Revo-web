/* Peak · el programa: los bloques se abren SOLO al pasar el ratón por encima (y al pulsar en táctil/teclado) */
(function(){
  function init(){
    var bs=Array.prototype.slice.call(document.querySelectorAll('.pgm-b'));
    if(!bs.length) return;
    function open(b){ b.classList.add('is-open'); if(b.hasAttribute('aria-expanded')) b.setAttribute('aria-expanded','true'); }
    function close(b){ b.classList.remove('is-open'); if(b.hasAttribute('aria-expanded')) b.setAttribute('aria-expanded','false'); }
    bs.forEach(function(b){
      b.addEventListener('mouseenter',function(){ open(b); });
      b.addEventListener('mouseleave',function(){ if(!b.dataset.pin) close(b); });
      if(!b.classList.contains('pgm-b--tap')) return;
      function toggle(){ if(b.classList.contains('is-open')){ delete b.dataset.pin; close(b); } else { b.dataset.pin='1'; open(b); } }
      b.addEventListener('click',toggle);
      b.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); } });
      b.addEventListener('focusout',function(){ if(!b.contains(document.activeElement)&&!b.matches(':hover')){ delete b.dataset.pin; close(b); } });
    });
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
})();

/* FX: aparición escalonada + contador (compartido ES/EN) */
(function(){
  function init(){
    var els=[].slice.call(document.querySelectorAll('.pkfx'));
    var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    function inn(el){ el.classList.add('fx-in'); }
    if(els.length){
      if(reduce||!('IntersectionObserver' in window)){ els.forEach(inn); }
      else{
        var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ inn(e.target); io.unobserve(e.target); } }); },{threshold:.18,rootMargin:'0px 0px -8% 0px'});
        els.forEach(function(el){ io.observe(el); });
        setTimeout(function(){ els.forEach(inn); },3000);
      }
    }
    var nb=document.querySelector('.st-num b');
    if(nb&&!reduce&&('IntersectionObserver' in window)){
      var target=parseInt(nb.textContent,10)||0;
      var io2=new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return; io2.disconnect();
        var t0=null;
        function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/1100,1); p=1-Math.pow(1-p,3); nb.textContent=Math.round(target*p); if(p<1) requestAnimationFrame(step); }
        requestAnimationFrame(step); }); },{threshold:.6});
      io2.observe(nb);
    }
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
})();

/* Ciclo móvil · la esfera: coloca anillo, sello y tarjetas 2/3 según la altura real (ES/EN) */
(function(){
  var mq=window.matchMedia&&matchMedia('(max-width:800px)');
  var cys=[].slice.call(document.querySelectorAll('.hiw .cy'));
  function layout(){
    if(!mq) return;
    cys.forEach(function(cy){
      if(!mq.matches){ cy.style.removeProperty('height'); return; }
      var n=[].slice.call(cy.querySelectorAll('.cy-n'));
      if(n.length<3) return;
      var w=cy.clientWidth||1, R=Math.min(150,Math.round(w*.44));
      var n1=n[0];
      var cyy=n1.offsetTop+n1.offsetHeight*.5+R;
      var badge=cy.querySelector('.cy-loop');
      var bh=(badge&&badge.offsetHeight)||46;
      var n1b=n1.offsetTop+n1.offsetHeight;
      var by=Math.max(cyy-22,n1b+16+bh/2);
      var ty=Math.max(cyy+R*.3,by+bh/2+18);
      cy.style.setProperty('--cyr',R+'px');
      cy.style.setProperty('--cyy',Math.round(cyy)+'px');
      cy.style.setProperty('--cyby',Math.round(by)+'px');
      cy.style.setProperty('--cyty',Math.round(ty)+'px');
      var hb=Math.max(ty+n[1].offsetHeight,ty+n[2].offsetHeight,cyy+R+4);
      cy.style.height=Math.round(hb+6)+'px';
    });
  }
  if(!cys.length) return;
  if(document.readyState!=='loading') layout(); else document.addEventListener('DOMContentLoaded',layout);
  addEventListener('load',layout);
  addEventListener('resize',layout);
  if(mq&&mq.addEventListener) mq.addEventListener('change',layout);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(layout);
  if(window.ResizeObserver){
    var ro=new ResizeObserver(layout);
    cys.forEach(function(c){ ro.observe(c); [].forEach.call(c.querySelectorAll('.cy-n'),function(x){ ro.observe(x); }); });
  }
})();
