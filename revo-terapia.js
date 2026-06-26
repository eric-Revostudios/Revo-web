/* ===========================================================
   REVO — shared therapy-page behaviour
   header hide/show · gradient morph · reveals · faq · cursor
   =========================================================== */
(function(){
  const header = document.getElementById('header');
  const bg = document.getElementById('bg');
  const cursor = document.getElementById('cursor');
  const scrollTop = document.getElementById('scrollTop');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let headerLock = false;   /* lo activa el pin horizontal para que el morph global no pelee el header */

  /* ---- header hide/show + scroll-to-top ---- */
  let lastY = window.scrollY;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(header){
      header.classList.toggle('scrolled', y > 30);
      header.classList.toggle('is-hidden', y > lastY && y > 200);
    }
    if(scrollTop) scrollTop.classList.toggle('show', y > window.innerHeight * 0.8);
    lastY = y;
  }, {passive:true});

  /* ---- gradient morph: palette of the section nearest viewport ---- */
  if(bg){
    const sections = [...document.querySelectorAll('[data-c1]')];
    let activeSec = null;
    function applyPalette(sec){
      if(!sec || sec === activeSec) return; activeSec = sec;
      bg.style.setProperty('--c1', sec.dataset.c1);
      bg.style.setProperty('--c2', sec.dataset.c2);
      bg.style.setProperty('--c3', sec.dataset.c3);
      bg.style.setProperty('--deg', sec.dataset.deg || '144deg');
      document.body.style.backgroundColor = sec.dataset.c2;
      if(header && !headerLock) header.classList.toggle('over-light', sec.dataset.theme === 'light');
    }
    function pickSection(){
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const y = window.scrollY;
      let best = sections[0];
      for(const s of sections){
        const top = s.offsetTop - y;
        const f = s.dataset.enter ? parseFloat(s.dataset.enter) : (s.dataset.theme === 'light' ? 0.82 : 0.6);
        if(top <= f * vh) best = s;
      }
      applyPalette(best);
    }
    window.addEventListener('scroll', pickSection, {passive:true});
    window.addEventListener('resize', pickSection);
    pickSection();
  }

  /* ---- reveal on scroll ---- */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold:0.12, rootMargin:"0px 0px -8% 0px" });
  reveals.forEach(el=>io.observe(el));
  const revealInView = ()=>{
    const vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach(el=>{ if(el.classList.contains('in')) return;
      const r = el.getBoundingClientRect();
      if(r.top < vh * 0.92 && r.bottom > 0){ el.classList.add('in'); io.unobserve(el); } });
  };
  requestAnimationFrame(()=>requestAnimationFrame(revealInView));
  window.addEventListener('load', revealInView);
  setTimeout(()=>reveals.forEach(el=>el.classList.add('in')), 2600);

  /* ---- faq accordion ---- */
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item = q.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
      if(!open) item.classList.add('open');
    });
  });

  /* ---- beats verticales: raíl luminoso + encendido progresivo con scroll ---- */
  if(!reduce){
    document.querySelectorAll('[data-beatflow]').forEach(flow=>{
      const beats = [...flow.querySelectorAll('.beat')];
      const n = beats.length;
      if(!n) return;
      flow.classList.add('flow');
      let ticking = false;
      function update(){
        ticking = false;
        const r = flow.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const denom = vh*0.5 + r.height*0.5;
        let p = (vh*0.74 - r.top) / denom;
        p = Math.max(0, Math.min(1, p));
        flow.style.setProperty('--bp', p.toFixed(4));
        for(let i=0;i<n;i++){ beats[i].classList.toggle('lit', p >= (i+0.5)/n); }
      }
      const onScroll = ()=>{ if(!ticking){ ticking = true; requestAnimationFrame(update); } };
      window.addEventListener('scroll', onScroll, {passive:true});
      window.addEventListener('resize', onScroll);
      update();
    });
  }

  /* ---- pin de scroll horizontal: el scroll vertical desplaza la pista; el panel entra desde la derecha ---- */
  document.querySelectorAll('.hpin').forEach(pin=>{
    const sticky = pin.querySelector('.hpin-sticky');
    const track = pin.querySelector('.hpin-track');
    if(!sticky || !track) return;
    let maxX = 0, enabled = false;
    const canPin = ()=> matchMedia('(min-width:1001px)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches;
    function setup(){
      if(canPin()){
        pin.classList.add('pinned');
        track.style.setProperty('--hx','0px');
        maxX = Math.max(0, track.scrollWidth - sticky.clientWidth);
        if(maxX <= 4){ pin.classList.remove('pinned'); pin.style.height=''; enabled=false; return; }
        pin.style.height = (window.innerHeight + maxX) + 'px';
        enabled = true; apply();
      } else {
        pin.classList.remove('pinned'); pin.style.height=''; track.style.setProperty('--hx','0px'); enabled=false; headerLock=false;
      }
    }
    function apply(){
      if(!enabled) return;
      const s0 = window.scrollY - pin.offsetTop;
      const inRange = s0 >= -2 && s0 <= maxX + 2;
      const s = Math.max(0, Math.min(maxX, s0));
      track.style.setProperty('--hx', (-s) + 'px');
      if(header){
        if(inRange){
          headerLock = true;
          const panels = [...track.querySelectorAll('.hpanel')];
          const idx = Math.max(0, Math.min(panels.length - 1, Math.round(s / sticky.clientWidth)));
          const cur = panels[idx];
          const light = !!cur && (cur.classList.contains('on-light') || cur.dataset.theme === 'light');
          header.classList.toggle('over-light', light);
        }
        else { headerLock = false; }
      }
    }
    let ticking = false;
    window.addEventListener('scroll', ()=>{ if(!ticking){ ticking = true; requestAnimationFrame(()=>{ ticking=false; apply(); }); } }, {passive:true});
    let rt; window.addEventListener('resize', ()=>{ clearTimeout(rt); rt = setTimeout(setup, 150); });
    window.addEventListener('load', setup);
    setup();
  });

  /* ---- scroll to top ---- */
  if(scrollTop) scrollTop.addEventListener('click',()=>window.scrollTo({top:0, behavior:'smooth'}));

  /* ---- steps: iluminación progresiva izq→der con scroll (igual que la home) ---- */
  if(!reduce){
    document.querySelectorAll('.steps').forEach(steps=>{
      const items = [...steps.querySelectorAll('.step')];
      const n = items.length;
      if(!n) return;
      steps.classList.add('flow');
      let ticking = false;
      function update(){
        ticking = false;
        const r = steps.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const denom = vh*0.45 + r.height*0.4;
        let p = (vh*0.8 - r.top) / denom;
        p = Math.max(0, Math.min(1, p));
        steps.style.setProperty('--p', p.toFixed(4));
        for(let i=0;i<n;i++){ items[i].classList.toggle('lit', p >= (i+0.5)/n); }
      }
      const onScroll = ()=>{ if(!ticking){ ticking = true; requestAnimationFrame(update); } };
      window.addEventListener('scroll', onScroll, {passive:true});
      window.addEventListener('resize', onScroll);
      update();
    });
  }

  /* ---- custom cursor ---- */
  if(cursor && !reduce && matchMedia('(hover:hover)').matches){
    window.addEventListener('mousemove', e=>{ cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`; }, {passive:true});
    const setHot = v => cursor.classList.toggle('hot', v);
    document.querySelectorAll('a, button, [data-hot]').forEach(el=>{
      el.addEventListener('mouseenter',()=>setHot(true));
      el.addEventListener('mouseleave',()=>setHot(false));
    });
    window.addEventListener('mousedown',()=>cursor.classList.add('hot'));
    window.addEventListener('mouseup',()=>cursor.classList.remove('hot'));
    const obs = ()=>cursor.classList.toggle('dark', header && header.classList.contains('over-light'));
    window.addEventListener('scroll', obs, {passive:true}); obs();
  } else if(cursor){ cursor.style.display='none'; document.body.style.cursor='auto'; }
})();
