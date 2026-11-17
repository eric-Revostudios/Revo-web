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

  /* ---------- la pregunta: ir a la experiencia elegida ---------- */
  function abrirRecorrido(tarjeta, abrir){
    var boton = tarjeta.querySelector('[data-rg-recorrido]');
    var caja = boton && $(boton.getAttribute('aria-controls'));
    if(!boton || !caja) return;
    var abierto = abrir === undefined ? caja.hidden : abrir;
    caja.hidden = !abierto;
    boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    boton.textContent = abierto ? 'Cerrar el recorrido' : 'Ver el recorrido';
  }
  document.querySelectorAll('[data-rg-ir]').forEach(function(b){
    b.addEventListener('click', function(){
      var t = $(b.getAttribute('data-rg-ir'));
      if(!t) return;
      document.querySelectorAll('.rg-exp.es-elegida').forEach(function(x){ x.classList.remove('es-elegida'); });
      t.classList.add('es-elegida', 'in');
      abrirRecorrido(t, true);
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
