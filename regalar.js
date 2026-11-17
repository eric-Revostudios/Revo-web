/* «Regala una experiencia» (/regalar): lo que se mueve en la página.
   · La pregunta «¿Qué te gustaría regalar?» lleva a la experiencia elegida y la enciende.
   · «Ver el recorrido» despliega la experiencia terapia a terapia.
   · La hoja de compra: para regalar (con la tarjeta que se va escribiendo al lado) o para mí. Al enviar:
       1) la solicitud queda apuntada en la Platform de REVO (pestaña Regalos): cuando llega el pago de Momence
          se enlaza sola con estos datos;
       2) llega el correo de siempre al equipo (Web3Forms);
       3) se abre el pago de Momence (revo-reservar.js).
     Con que una de las dos primeras salga bien, se pasa al pago: la venta no se pierde por un aviso.
   En local (localhost) no se envía nada a ningún sitio: es para probar la página sin dejar solicitudes falsas. */
(function(){
  'use strict';
  var PLATFORM = 'https://revo-platform.vercel.app/api/regalo';
  var CORREO = 'https://api.web3forms.com/submit';
  var WA = '34613505881';
  var EN_PRUEBAS = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var $ = function(id){ return document.getElementById(id); };
  var SIN_MOVIMIENTO = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raiz = document.documentElement;
  raiz.classList.add('rg-js');
  raiz.style.scrollBehavior = 'auto';   /* el desplazamiento lo lleva esta página, más despacio que el del navegador */

  /* ---------- aparecer: lo que entra en pantalla llega despacio, una vez ---------- */
  var porVer = document.querySelectorAll('.rg-ap');
  function visto(el){
    el.classList.add('es-visto');
    /* pasada la entrada, las opciones responden al cursor sin el retraso de la cascada */
    if(el.classList.contains('rg-opcion')) setTimeout(function(){ el.classList.add('es-dentro'); }, 2600);
  }
  if('IntersectionObserver' in window && !SIN_MOVIMIENTO){
    var ojo = new IntersectionObserver(function(entradas){
      entradas.forEach(function(en){ if(en.isIntersecting){ visto(en.target); ojo.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    porVer.forEach(function(el){ ojo.observe(el); });
    /* red de seguridad: si algo no llegara a observarse, que no se quede invisible */
    setTimeout(function(){ porVer.forEach(function(el){ var r = el.getBoundingClientRect(); if(r.top < innerHeight && r.bottom > 0) visto(el); }); }, 3500);
  } else { porVer.forEach(visto); }

  /* ---------- desplazarse: despacio y sin tirones ---------- */
  var viaje = 0;
  function irSuave(destino, alFinal){
    var y0 = window.scrollY;
    var y1 = Math.max(0, Math.min(destino, raiz.scrollHeight - innerHeight));
    var distancia = Math.abs(y1 - y0);
    if(SIN_MOVIMIENTO || distancia < 4){ window.scrollTo(0, y1); if(alFinal) alFinal(); return; }
    var dura = Math.min(2200, Math.max(900, distancia * 0.75)), t0 = null, yo = ++viaje;
    function paso(t){
      if(yo !== viaje) return;                       /* otro viaje ha empezado */
      if(t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dura);
      var e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;   /* acelera y frena con suavidad */
      window.scrollTo(0, y0 + (y1 - y0) * e);
      if(k < 1) requestAnimationFrame(paso); else if(alFinal) alFinal();
    }
    requestAnimationFrame(paso);
  }
  /* si la persona toca o gira la rueda, manda ella */
  ['wheel', 'touchstart', 'keydown'].forEach(function(ev){ window.addEventListener(ev, function(){ viaje++; }, { passive: true }); });
  function alturaDe(el){ return el.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0); }
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if(!a) return;
    var id = a.getAttribute('href').slice(1);
    var el = id ? document.getElementById(id) : null;
    if(!el || a.closest('.mobile-nav')) return;
    e.preventDefault();
    irSuave(id === 'top' ? 0 : alturaDe(el));
  });

  /* ---------- una luz suave sigue al cursor sobre cada experiencia ---------- */
  if(matchMedia('(hover:hover)').matches){
    document.querySelectorAll('.rg-exp').forEach(function(t){
      t.addEventListener('pointermove', function(e){
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        t.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, { passive: true });
    });
  }

  /* ---------- la pregunta: ir a la experiencia elegida ---------- */
  function abrirRecorrido(tarjeta, abrir){
    var boton = tarjeta.querySelector('[data-rg-recorrido]');
    var caja = boton && $(boton.getAttribute('aria-controls'));
    if(!boton || !caja) return;
    var abierto = abrir === undefined ? !tarjeta.classList.contains('es-abierta') : abrir;
    tarjeta.classList.toggle('es-abierta', abierto);
    if(abierto) caja.removeAttribute('inert'); else caja.setAttribute('inert', '');
    boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    boton.textContent = abierto ? 'Cerrar el recorrido' : 'Ver el recorrido';
  }
  document.querySelectorAll('[data-rg-ir]').forEach(function(b){
    b.addEventListener('click', function(){
      var t = $(b.getAttribute('data-rg-ir'));
      if(!t) return;
      document.querySelectorAll('.rg-exp.es-elegida').forEach(function(x){ x.classList.remove('es-elegida'); });
      visto(t);
      /* primero se llega; después la experiencia se enciende y se abre */
      irSuave(alturaDe(t), function(){ t.classList.add('es-elegida'); setTimeout(function(){ abrirRecorrido(t, true); }, 350); });
    });
  });
  document.querySelectorAll('[data-rg-recorrido]').forEach(function(b){
    b.addEventListener('click', function(){ abrirRecorrido(b.closest('.rg-exp')); });
  });

  /* ---------- la hoja de compra ---------- */
  var hoja = $('rgHoja');
  if(!hoja) return;
  var form = $('rgForm'), f = form.elements;
  var paso = $('rgPaso'), hecho = $('rgHecho'), vista = $('rgVista');
  var campos = { regalo: hoja.querySelector('[data-rg-campos="regalo"]'), mi: hoja.querySelector('[data-rg-campos="mi"]') };
  var enviar = $('rgEnviar'), errorEl = $('rgError');
  var exp = null, modo = 'regalo', ultimoFoco = null;

  function pila(nombre){ return String(nombre || '').trim().split(/\s+/)[0] || ''; }
  function valor(id){ var el = $(id); return el ? String(el.value || '').trim() : ''; }

  function pintarModo(){
    var regalo = modo === 'regalo';
    campos.regalo.disabled = !regalo;
    campos.mi.disabled = regalo;
    vista.hidden = !regalo;
    hoja.querySelectorAll('[data-rg-modo]').forEach(function(b){ b.classList.toggle('es-activo', b.getAttribute('data-rg-modo') === modo); });
    hoja.querySelector('.rg-modo').classList.toggle('es-mi', !regalo);
    $('rgTitulo').innerHTML = regalo ? 'Ponle <em>su nombre.</em>' : 'Tu experiencia, <em>a tu nombre.</em>';
    $('rgSub').textContent = regalo
      ? 'Lo que escribas aquí es lo que verá en su tarjeta.'
      : 'Déjanos tus datos y te llevamos al pago. Después te escribimos por WhatsApp para buscar tu día.';
    f['Tipo'].value = regalo ? 'Regalo' : 'Reserva';
    f['subject'].value = (regalo ? 'Nuevo regalo · ' : 'Nueva reserva · ') + exp.exp + ' · ' + exp.price + ' €';
    enviar.textContent = 'Continuar al pago · ' + exp.price + ' €';
    pintarTarjeta();
  }

  /* la tarjeta se va escribiendo con lo que la persona teclea */
  function pintarTarjeta(){
    var para = pila(valor('rg-para')), de = valor('rg-de'), ded = valor('rg-ded');
    $('rgVPara').textContent = para ? 'Un regalo para ' + para : 'Un regalo para…';
    $('rgVDe').textContent = de ? de + ' te regala la experiencia' : 'Te regalan la experiencia';
    $('rgVDed').hidden = !ded; $('rgVDed').textContent = ded ? '«' + ded + '»' : '';
    $('rgVFirma').hidden = !(ded && de); $('rgVFirma').textContent = de;
  }
  ['rg-para', 'rg-de', 'rg-ded'].forEach(function(id){ var el = $(id); if(el) el.addEventListener('input', pintarTarjeta); });

  function abrir(boton){
    var d = boton.dataset;
    exp = { id: d.id, exp: d.exp, prop: d.prop, price: d.price, dur: d.dur, n: d.n, url: d.url };
    modo = d.rgComprar === 'mi' ? 'mi' : 'regalo';
    ultimoFoco = document.activeElement;
    form.reset();
    errorEl.hidden = true; errorEl.textContent = '';
    enviar.disabled = false;
    paso.hidden = false; hecho.hidden = true;
    f['Experiencia'].value = exp.exp; f['Precio'].value = exp.price + '€';
    $('rgOjo').textContent = exp.exp + ' · ' + exp.price + ' €';
    $('rgVNombre').textContent = exp.exp; $('rgVProp').textContent = exp.prop;
    $('rgVDur').textContent = exp.dur; $('rgVN').textContent = exp.n;
    pintarModo();
    hoja.classList.add('es-abierta'); hoja.setAttribute('aria-hidden', 'false');
    document.body.classList.add('rg-fija');
    hoja.querySelector('.rg-hoja-caja').scrollTop = 0;
    setTimeout(function(){ var el = campos[modo].querySelector('input'); if(el && matchMedia('(min-width:960px)').matches) el.focus(); }, 120);
  }
  function cerrar(){
    hoja.classList.remove('es-abierta'); hoja.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('rg-fija');
    if(ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }
  document.querySelectorAll('[data-rg-comprar]').forEach(function(b){ b.addEventListener('click', function(){ abrir(b); }); });
  hoja.querySelectorAll('[data-rg-cerrar]').forEach(function(x){ x.addEventListener('click', cerrar); });
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape' || !hoja.classList.contains('es-abierta')) return;
    if(document.body.classList.contains('bk-lock')) return;   /* con el pago abierto, Escape cierra el pago */
    cerrar();
  });
  hoja.querySelectorAll('[data-rg-modo]').forEach(function(b){
    b.addEventListener('click', function(){ modo = b.getAttribute('data-rg-modo'); errorEl.hidden = true; pintarModo(); });
  });

  /* ---------- el pago y la pantalla de después ---------- */
  function abrirPago(){
    var wa = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hola, quiero ' + (modo === 'regalo' ? 'regalar' : 'reservar') + ' la experiencia ' + exp.exp + ' y tengo una duda antes de pagar.');
    if(window.REVO && window.REVO.reservar){ window.REVO.reservar({ url: exp.url, title: exp.exp, whatsapp: wa, whatsappLabel: 'Preguntar por WhatsApp' }); }
    else { window.open(exp.url, '_blank', 'noopener'); }
  }
  function terminar(datos){
    var regalo = modo === 'regalo';
    var quien = pila(datos.nombre), para = pila(datos.destinatario);
    $('rgHechoOjo').textContent = exp.exp;
    $('rgHechoTitulo').innerHTML = regalo
      ? 'Gracias' + (quien ? ', ' + escapar(quien) : '') + '. <em>Ya estamos preparando el regalo' + (para ? ' de ' + escapar(para) : '') + '.</em>'
      : 'Gracias' + (quien ? ', ' + escapar(quien) : '') + '. <em>Tu experiencia ya casi está.</em>';
    $('rgHechoTexto').textContent = regalo
      ? (datos.formato === 'impreso'
          ? 'Completa el pago y lo preparamos impreso. Te avisamos por WhatsApp en cuanto puedas recogerlo en el estudio.'
          : 'Completa el pago y te lo enviamos por WhatsApp en cuanto lo confirmemos. Mientras tanto, así es como lo va a ver.')
      : 'Completa el pago y te escribimos por WhatsApp para buscar tu día.';
    var ver = $('rgHechoVer');
    ver.href = '/regalo/demo?e=' + encodeURIComponent(exp.id) + (regalo ? '' : '&para=mi');
    ver.textContent = regalo ? 'Ver un regalo de ejemplo' : 'Ver cómo será';
    $('rgHechoWa').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hola, acabo de ' + (regalo ? 'regalar' : 'reservar') + ' la experiencia ' + exp.exp + ' y tengo una duda.');
    paso.hidden = true; hecho.hidden = false;
    hoja.querySelector('.rg-hoja-caja').scrollTop = 0;
    abrirPago();
  }
  function escapar(t){ return String(t).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
  $('rgHechoPago').addEventListener('click', function(e){ e.preventDefault(); abrirPago(); });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    errorEl.hidden = true; errorEl.textContent = '';
    var fd = new FormData(form);
    var regalo = modo === 'regalo';
    var fmt = String(fd.get('Formato') || '');
    var datos = regalo ? {
      experiencia: exp.id, para: 'regalo',
      nombre: String(fd.get('De parte de') || ''),
      email: String(fd.get('email') || ''),
      telefono: String(fd.get('Telefono') || ''),
      destinatario: String(fd.get('Para (nombre)') || ''),
      dedicatoria: String(fd.get('Dedicatoria') || ''),
      formato: /^impreso/i.test(fmt) ? 'impreso' : 'digital',
      entregarA: 'comprador',
      ref: fd.get('botcheck') ? '1' : ''
    } : {
      experiencia: exp.id, para: 'mi',
      nombre: String(fd.get('Nombre') || ''),
      email: String(fd.get('email') || ''),
      telefono: String(fd.get('Telefono') || ''),
      preferenciaFechas: String(fd.get('Preferencia de fechas') || ''),
      ref: fd.get('botcheck') ? '1' : ''
    };
    if(EN_PRUEBAS){ terminar(datos); return; }

    enviar.disabled = true; enviar.textContent = 'Un momento…';
    var bien = 0, hechas = 0;
    function una(ok){
      hechas++; if(ok) bien++;
      if(hechas < 2) return;
      if(bien > 0){ terminar(datos); return; }
      enviar.disabled = false; enviar.textContent = 'Continuar al pago · ' + exp.price + ' €';
      errorEl.hidden = false;
      errorEl.textContent = 'No hemos podido enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o escríbenos a hello@revostudios.eu.';
    }
    fetch(PLATFORM, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
      .then(function(r){ return r.json(); }).then(function(j){ una(!!(j && j.ok)); }).catch(function(){ una(false); });
    fetch(CORREO, { method: 'POST', body: fd })
      .then(function(r){ return r.json(); }).then(function(j){ una(!!(j && j.success)); }).catch(function(){ una(false); });
  });
})();
