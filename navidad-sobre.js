/* Navidad · «Así lo recibe» → Impreso: el sobre de REVO se abre, sale la tarjeta y se escriben a mano el nombre y la
   experiencia. Todo dibujado (SVG + CSS, navidad.css § «el sobre»): pesa poco, no es un vídeo y se ve nítido en
   cualquier pantalla. El fondo es la foto del sobre de Eric (26-nov), sin el sobre y desenfocada.
   window.REVO_SOBRE.html(alt) devuelve el dibujo; window.REVO_SOBRE.vigila(raiz) lo pone en marcha solo cuando se ve.
   El nombre y la experiencia del ejemplo van en la letra «Pinyon Script» (licencia abierta OFL), recortada a esas
   letras: si se cambia el ejemplo hay que volver a recortar la tipografía (fonts/PinyonScript-navidad.woff). */
(function () {
  'use strict';
  var NOMBRE = 'Marta', EXPERIENCIA = 'Longevity';

  // un QR de mentira (no lleva a ningún sitio): tres esquinas y módulos sueltos, siempre los mismos
  function qr(x, y, lado) {
    var n = 25, m = lado / n, s = 20261126, d = '';
    function azar() { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }
    function esquina(i, j) { return (i < 8 && j < 8) || (i < 8 && j >= n - 8) || (i >= n - 8 && j < 8); }
    function marco(i, j) {
      var a = i < 8 ? i : i - (n - 7), b = j < 8 ? j : j - (n - 7);
      if (a < 0 || a > 6 || b < 0 || b > 6) return false;
      return a === 0 || a === 6 || b === 0 || b === 6 || (a >= 2 && a <= 4 && b >= 2 && b <= 4);
    }
    for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
      var on = esquina(i, j) ? marco(i, j) : azar() > 0.52;
      if (on) d += 'M' + (x + j * m).toFixed(2) + ' ' + (y + i * m).toFixed(2) + 'h' + m.toFixed(2) + 'v' + m.toFixed(2) + 'h-' + m.toFixed(2) + 'z';
    }
    return d;
  }

  // el trazo que «escribe»: un zigzag inclinado que recorre la palabra de izquierda a derecha y la va destapando
  function trazo(x0, x1, yArriba, yAbajo, paso) {
    var d = 'M' + x0 + ' ' + yAbajo, x = x0, inc = (yAbajo - yArriba) * 0.42;
    while (x < x1) {
      d += ' L' + (x + inc).toFixed(1) + ' ' + yArriba + ' L' + (x + paso).toFixed(1) + ' ' + yAbajo;
      x += paso;
    }
    return d;
  }

  function html(alt) {
    var E = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
    return '<div class="sobre" role="img" aria-label="' + E(alt).replace(/"/g, '&quot;') + '">' +
      '<img class="sobre-fondo" src="/assets/navidad-sobre-fondo.webp" alt="" loading="lazy" decoding="async" />' +
      '<svg class="sobre-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      '<defs>' +
        '<linearGradient id="sbPapel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1b21"/><stop offset=".55" stop-color="#131317"/><stop offset="1" stop-color="#0d0d12"/></linearGradient>' +
        '<linearGradient id="sbPapel2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1d24"/><stop offset="1" stop-color="#121216"/></linearGradient>' +
        '<linearGradient id="sbLado" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#16161b"/><stop offset="1" stop-color="#0f0f13"/></linearGradient>' +
        '<linearGradient id="sbLadoD" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#15151c"/><stop offset="1" stop-color="#0e0e12"/></linearGradient>' +
        '<linearGradient id="sbDentro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050507"/><stop offset="1" stop-color="#0b0b0e"/></linearGradient>' +
        '<linearGradient id="sbSolapaDentro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101014"/><stop offset="1" stop-color="#1a1a20"/></linearGradient>' +
        '<linearGradient id="sbTarjeta" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#101014"/><stop offset=".6" stop-color="#0a0a0d"/><stop offset="1" stop-color="#0c0c12"/></linearGradient>' +
        '<linearGradient id="sbReflejo" x1="0" y1="0" x2="1" y2="0"><stop offset=".5" stop-color="#3b4dff" stop-opacity="0"/><stop offset=".9" stop-color="#3b4dff" stop-opacity=".2"/><stop offset="1" stop-color="#2a38d8" stop-opacity=".1"/></linearGradient>' +
        '<linearGradient id="sbFoil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7386ff"/><stop offset=".5" stop-color="#4f63f5"/><stop offset="1" stop-color="#6c80ff"/></linearGradient>' +
        '<linearGradient id="sbBrillo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="sbBrilloSuave" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfd6ff" stop-opacity="0"/><stop offset=".5" stop-color="#cfd6ff" stop-opacity=".13"/><stop offset="1" stop-color="#cfd6ff" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="sbTinta" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c3c8d6"/></linearGradient>' +
        '<linearGradient id="sbLuzSobre" x1="0" y1="0" x2="1" y2="1"><stop offset=".1" stop-color="#fff" stop-opacity=".07"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#4a5cff" stop-opacity="0"/><stop offset="1" stop-color="#4a5cff" stop-opacity=".2"/></linearGradient>' +
        '<radialGradient id="sbSombra" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#05050c" stop-opacity=".5"/><stop offset=".6" stop-color="#05050c" stop-opacity=".2"/><stop offset="1" stop-color="#05050c" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="sbHalo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5d72ff" stop-opacity=".5"/><stop offset="1" stop-color="#5d72ff" stop-opacity="0"/></radialGradient>' +
        '<mask id="sbLogo" maskUnits="userSpaceOnUse" x="102" y="150" width="96" height="20"><image href="/assets/revo-palabra-blanca.webp" x="102" y="150" width="96" height="18.9"/></mask>' +
        '<mask id="sbM1" maskUnits="userSpaceOnUse" x="0" y="0" width="268" height="60"><path class="sb-pluma sb-pluma1" pathLength="1" d="' + trazo(18, 92, 8, 46, 5) + '"/></mask>' +
        '<mask id="sbM2" maskUnits="userSpaceOnUse" x="100" y="36" width="168" height="44"><path class="sb-pluma sb-pluma2" pathLength="1" d="' + trazo(132, 222, 42, 76, 4.4) + '"/></mask>' +
        '<clipPath id="sbRecorteTarjeta"><rect x="0" y="0" width="268" height="182" rx="2.5"/></clipPath>' +
        '<clipPath id="sbRecorteSobre"><rect x="0" y="0" width="300" height="210" rx="3"/></clipPath>' +
      '</defs>' +
      '<g class="sb-camara"><g transform="rotate(-2.5 150 105)">' +
        // sombra en la mesa y halo azul
        '<ellipse class="sb-halo" cx="170" cy="150" rx="230" ry="170" fill="url(#sbHalo)"/>' +
        '<ellipse cx="156" cy="214" rx="176" ry="26" fill="url(#sbSombra)"/>' +
        '<rect x="-14" y="-8" width="328" height="236" rx="30" fill="url(#sbSombra)" opacity=".7"/>' +
        // el interior del sobre
        '<rect x="0" y="0" width="300" height="210" rx="3" fill="url(#sbDentro)"/>' +
        // la solapa, ya abierta (por dentro), detrás de la tarjeta
        '<g class="sb-solapa-atras"><path d="M1 0H299L163 111Q150 121 137 111Z" fill="url(#sbSolapaDentro)"/><path d="M1 0L137 111Q150 121 163 111L299 0" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width=".6"/></g>' +
        // la tarjeta
        '<g class="sb-tarjeta"><g transform="translate(16 12)">' +
          '<rect x="1.5" y="3" width="268" height="182" rx="2.5" fill="#000" opacity=".35"/>' +
          '<rect width="268" height="182" rx="2.5" fill="url(#sbTarjeta)"/>' +
          '<g clip-path="url(#sbRecorteTarjeta)">' +
            '<rect width="268" height="182" fill="url(#sbReflejo)"/>' +
            '<text class="sb-foil sb-sans" x="20" y="64" font-size="10.6">Te regalo tu experiencia:</text>' +
            '<text class="sb-foil sb-sans" x="20" y="84" font-size="10.6">Para que puedas vivir 1 día REVO.</text>' +
            '<rect x="0" y="97" width="268" height=".7" fill="#6c80ff" opacity=".75"/>' +
            '<text class="sb-foil sb-serif" x="134" y="113" font-size="9.4" text-anchor="middle">Tu viaje empieza aquí.</text>' +
            '<text class="sb-foil sb-sans" x="134" y="124.5" font-size="8.6" text-anchor="middle">Escanea y reserva tu cita:</text>' +
            '<rect x="113" y="132" width="42" height="42" rx="1" fill="#f4f4f6"/><path d="' + qr(115.5, 134.5, 37) + '" fill="#0a0a0d"/>' +
            '<g mask="url(#sbM1)"><text class="sb-mano" x="20" y="38" font-size="30">' + E(NOMBRE) + '</text></g>' +
            '<g mask="url(#sbM2)"><text class="sb-mano" x="137" y="66.5" font-size="23">' + E(EXPERIENCIA) + '</text></g>' +
            '<rect class="sb-luz-tarjeta" x="-120" y="-20" width="90" height="230" fill="url(#sbBrilloSuave)" transform="skewX(-18)"/>' +
          '</g>' +
          '<rect x=".3" y=".3" width="267.4" height="181.4" rx="2.3" fill="none" stroke="#fff" stroke-opacity=".09" stroke-width=".6"/>' +
        '</g></g>' +
        // el bolsillo: solapas de los lados y la de abajo, con el logo
        '<g clip-path="url(#sbRecorteSobre)">' +
          '<path d="M0 0L141 89Q149 95 141 102L0 210Z" fill="url(#sbLado)"/>' +
          '<path d="M300 0L159 89Q151 95 159 102L300 210Z" fill="url(#sbLadoD)"/>' +
          '<path d="M0 0L141 89M300 0L159 89" stroke="#fff" stroke-opacity=".08" stroke-width=".6" fill="none"/>' +
          '<path d="M-4 214L135 86Q150 73 165 86L304 214Z" fill="#000" opacity=".3" transform="translate(0 -2.4)"/>' +
          '<path d="M0 210L136 87Q150 75 164 87L300 210Z" fill="url(#sbPapel2)"/>' +
          '<path d="M0 210L136 87Q150 75 164 87L300 210" stroke="#fff" stroke-opacity=".1" stroke-width=".6" fill="none"/>' +
          '<g mask="url(#sbLogo)"><rect x="102" y="150" width="96" height="20" fill="url(#sbFoil)"/><rect class="sb-destello" x="60" y="146" width="34" height="28" fill="url(#sbBrillo)" transform="skewX(-20)"/></g>' +
          '<text class="sb-foil sb-serif sb-lema" x="150" y="180.5" font-size="8.2" text-anchor="middle">Wellbeing, revolved</text>' +
          '<rect width="300" height="210" fill="url(#sbLuzSobre)"/>' +
        '</g>' +
        // la solapa, cerrada (por fuera), delante de todo
        '<g class="sb-solapa"><path d="M-3 0H303L166 116Q150 129 134 116Z" fill="#000" opacity=".32" transform="translate(0 2.2)"/><path d="M0 0H300L164 113Q150 124 136 113Z" fill="url(#sbPapel)"/><path d="M0 0L136 113Q150 124 164 113L300 0" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width=".6"/><path d="M0 0H300" stroke="#fff" stroke-opacity=".12" stroke-width=".7"/></g>' +
      '</g></g>' +
      '</svg>' +
      '<div class="sobre-grano" aria-hidden="true"></div>' +
    '</div>';
  }

  // solo se mueve mientras se ve (y nunca con «reducir movimiento»: ahí se queda en la tarjeta ya escrita, por CSS)
  function vigila(raiz) {
    var s = (raiz || document).querySelectorAll('.sobre');
    if (!s.length) return;
    if (!window.IntersectionObserver) { s.forEach(function (x) { x.classList.add('vivo'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { en.target.classList.toggle('vivo', en.isIntersecting); }); }, { threshold: 0.25 });
    s.forEach(function (x) { io.observe(x); });
  }

  window.REVO_SOBRE = { html: html, vigila: vigila };
})();
