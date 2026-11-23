/* Christmas campaign 2026 · ENGLISH version of /navidad (/en/navidad). Same keys as navidad-contenido.js (the
   Spanish file is the reference: comments and rules live there). Written 20-nov-2026 from the Spanish copy and the
   English texts the site already uses (en/experiencias.html: names, taglines, steps and the «Gift» window).
   Tone: the revo-tono rules carried into English — sober, warm, second person, no exclamation marks, no «deal»,
   «discount», «offer» or «2 for 1», no promised results ("helps", "with consistency"). Gender-neutral («them»).
   *text* → the house italic (Noto Serif). */
window.NAVIDAD = {
  IDIOMA: 'en',
  OTRO_IDIOMA: { t: 'ES', lang: 'es' },
  ENVIAR_CANAL: true,
  PLATFORM: 'https://revo-platform.vercel.app',
  CANALES: ['studio', 'socios', 'vecinos', 'instagram', 'ads', 'goodfit', 'barrys', 'corehaus', 'casabarre', 'yogaone'],
  PARTNERS: ['goodfit', 'barrys', 'corehaus', 'casabarre', 'yogaone'],
  NOMBRES_PROVISIONALES: { goodfit: 'GoodFit', barrys: "Barry's Barcelona", corehaus: 'Corehaus', casabarre: 'Casa Barré', yogaone: 'YogaOne Aragó-Eixample', vecinos: 'Turó Park' },

  CABECERA: {
    rotulo: 'Christmas at REVO',
    titulo: 'This Christmas, give *wellbeing*.',
    entrada: 'Some gifts are unwrapped. This one is felt.',
    boton: 'Choose an experience',
    test: 'Not sure which? Find their gift',
    partner: 'For the {nombre} community.'
  },

  // the «two and a third on us» offer: only shown when the Platform says it is active (see the Spanish file)
  OFERTA: {
    rotulo: 'From {desde} to {hasta}',
    rotuloDefecto: 'Until 5 January',
    frase: 'You give two. *The third is on us.*',
    entrada: 'When you give two experiences, we give you a third, for you or for whoever you like.',
    letraElegir: 'The third is of equal or lower price than the less expensive of the two, and is enjoyed {cuando}. It appears on its own, on your gift page.',
    letraLista: 'The third is {exp}, and is enjoyed {cuando}. It appears on its own, on your gift page.',
    cuandoDefecto: 'from January to March 2027',
    cuando: 'from {mesDesde} to {mesHasta} {anio}',
    o: ' or ',
    duda: 'How does the third experience work?',
    dudaTexto: 'When you give two, the third voucher appears on its own on your gift page. {letra}',
    test: 'If you give two experiences, we give you a third, for you or for whoever you like.'
  },
  MESES: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  FECHA: '{dia} {mes}',

  EXPERIENCIAS_TITULO: 'Six experiences to *give*.',
  EXPERIENCIAS_ENTRADA: 'Several therapies in a single visit, sequenced by our medical team around one goal.',
  EXPERIENCIAS: [
    { id: 'glow', nombre: 'Glow', precio: 140, dur: '1 h 50 min', foto: 'nv-glow.webp', pos: '50% 30%',
      lema: 'Glowing skin, defined silhouette.',
      pasos: ['Electromagnetic field', 'Red light mask', 'Whole-body cryotherapy', 'Draining and sculpting massage'],
      url: 'https://momence.com/REVO-Studios/product/Glow-Experience/498606' },
    { id: 'sports', nombre: 'Sports Performance', precio: 140, dur: '1 h 30 min', foto: 'nv-sports.webp', pos: '50% 40%',
      lema: 'Recover faster. Perform better.',
      pasos: ['Hyperbaric chamber', 'Whole-body cryotherapy', 'Pressotherapy'],
      url: 'https://momence.com/REVO-Studios/product/Sports-Performance-Experience/498608' },
    { id: 'sleep_stress', nombre: 'Sleep & Stress', precio: 140, dur: '1 h', foto: 'nv-sleep.webp', pos: '40% 45%',
      lema: 'Slow down. Truly rest.',
      pasos: ['Whole-body cryotherapy', 'Red light bed', 'Electromagnetic field', 'Neurostimulation'],
      url: 'https://momence.com/REVO-Studios/product/Sleep-and-Stress-Experience/498614' },
    { id: 'longevity', nombre: 'Longevity', precio: 160, dur: '1 h 50 min', foto: 'nv-longevity.webp', pos: '50% 35%',
      lema: 'More energy. A body that feels younger.',
      pasos: ['Electromagnetic field', 'Neurostimulation', 'Hyperbaric chamber', 'Red light bed'],
      url: 'https://momence.com/REVO-Studios/product/Longevity-Experience/498612' },
    { id: 'cognitiva', nombre: 'Cognitive Performance', precio: 140, dur: '1 h 40 min', foto: 'nv-cognitiva.webp', pos: '50% 35%',
      lema: 'Think clearly. Stay focused.',
      pasos: ['Hyperbaric chamber', 'Red light bed', 'Neurostimulation'],
      url: 'https://momence.com/REVO-Studios/product/Performance-Cognitiva-Experience/498616' },
    { id: 'massage_plus', nombre: 'Massage +', precio: 110, dur: '1 h 30 min', foto: 'nv-massage.webp', pos: '50% 50%',
      lema: 'Their massage, boosted.',
      pasos: ['Massage of their choice', 'One more therapy of their choice'],
      url: 'https://momence.com/REVO-Studios/product/Massage-Experience/498613' }
  ],
  BOTON_REGALAR: 'Gift',
  VER_REGALO: 'See how they receive it',

  TEST: {
    rotulo: 'Not sure which?',
    titulo: 'Find *their gift*.',
    entrada: 'Think of that person and answer four things. We tell you which experience will suit them, why, and leave their card ready.',
    empezar: 'Start',
    duracion: 'About 30 seconds',
    foto: 'gift-bag.webp',
    cerrar: 'Close', atras: 'Back', seguir: 'Continue',
    intro: { foto: 'navidad-calma.webp', ojo: 'Find their gift', titulo: 'Think of *that person*.', texto: 'Four questions about who receives it. At the end we tell you what will suit them and leave their card ready.', boton: 'Start' },
    nombre: {
      ojo: '01 · Who it is', titulo: 'What is their name?', placeholder: 'Their name', ayuda: 'We put it on their card. Only you see it.',
      relacion: 'And to you they are…',
      relaciones: [ { t: 'my partner' }, { t: 'my mother' }, { t: 'my father' }, { t: 'a friend' }, { t: 'family' }, { t: 'from work', formal: true } ],
      sinNombre: 'I would rather not say'
    },
    dia: {
      ojo: '02 · Their day', ayuda: 'Choose all that apply.', y: ' and ', titulo: 'On an ordinary day, *{nombre}*…', sin: 'On an ordinary day, that person…',
      opciones: [
        { t: 'is always on the go and finds it hard to stop', foto: 'nv-cognitiva.webp', pos: '50% 30%', da: 'cognitiva', porque: 'is always on the go and finds it hard to stop' },
        { t: 'trains or plays sport', foto: 'navidad-entrena.webp', pos: '50% 25%', da: 'sports', porque: 'trains and asks a lot of their body' },
        { t: 'looks after everyone except themselves', foto: 'nv-longevity.webp', pos: '50% 35%', da: 'massage_plus', porque: 'looks after everyone except themselves' },
        { t: 'measures everything: watch, blood tests, supplements', foto: 'nv-mide.webp', pos: '50% 50%', da: 'longevity', porque: 'takes care of themselves and likes to measure everything' },
        { t: 'enjoys looking after themselves, on the outside too', foto: 'nv-glow.webp', pos: '50% 30%', da: 'glow', porque: 'enjoys looking after themselves, on the outside too' },
        { t: 'sleeps less than they would like', foto: 'nv-sleep.webp', pos: '40% 45%', da: 'sleep_stress', porque: 'sleeps less than they would like' }
      ]
    },
    deseo: {
      ojo: '03 · What you would give', titulo: 'If you could give *{nombre}* a feeling…', sin: 'If you could give them a feeling…',
      opciones: [
        { t: 'Energy', d: 'getting up with drive and reaching the evening with strength to spare', da: 'longevity' },
        { t: 'Rest', d: 'sleeping through the night and waking up rested', da: 'sleep_stress' },
        { t: 'Clarity', d: 'a calm mind and focus back', da: 'cognitiva' },
        { t: 'Strength', d: 'a body that performs and recovers sooner', da: 'sports' },
        { t: 'Glow', d: 'looking well and feeling it in their skin', da: 'glow' },
        { t: 'Care', d: 'a while in which they only have to let themselves be looked after', da: 'massage_plus' }
      ]
    },
    como: {
      ojo: '04 · How you give it', titulo: 'How would you like to give it?',
      opciones: [
        { t: 'In their hands', d: 'A physical card you pick up at the studio, in Turó Park.', formato: 'impreso' },
        { t: 'Right away', d: 'It reaches them by WhatsApp or email, whenever you like.', formato: 'digital' }
      ]
    },
    preparando: { titulo: 'Preparing *{nombre}*’s gift…', sin: 'Preparing their gift…', lineas: ['Their day', 'What you would give', 'How you give it'] },
    res: {
      ojo: 'Their gift',
      recibe: 'This is how they will receive it',
      recibeNota: 'This is the real page they receive, shown with an example (in Spanish). Theirs will carry their name and your message.',
      unRegaloPara: 'A gift for',
      sinNombre: 'you',
      porQue: 'Why for *{nombre}*', porQueSin: 'Why it suits them',
      frase: '{Nombre} {porque}. You would give them {sensacion}: {motivo}',
      fraseSin: 'That person {porque}. You would give them {sensacion}: {motivo}',
      sesion: 'Their session',
      dedicatoria: 'Your message', dedicatoriaAyuda: 'We suggest one. Change it as you like.',
      boton: 'Gift it to {nombre}', botonSin: 'Gift {exp}',
      formatoImpreso: 'Physical card · pick it up at the studio',
      formatoDigital: 'Right away · by WhatsApp or email',
      otra: 'To complete the gift',
      oferta: 'If you give two experiences, we give you a third, for you or for whoever you like.',
      otraBoton: 'Also gift {exp}',
      compartir: 'Giving it together with others?', compartirBoton: 'Share it on WhatsApp',
      compartirSin: 'this person',
      compartirTexto: 'I thought of giving {nombre} the {exp} experience at REVO ({precio} €). Would you like to join in? https://www.revostudios.eu/en/navidad#exp-{id}',
      deNuevo: 'Start again', verTodas: 'See all experiences'
    }
  },
  // the same facts as the Spanish file (revo-tono datos.md), in English
  REGALO: {
    glow: {
      sensacion: 'glow',
      titular: 'Their skin, glowing. Their body, lighter.',
      motivo: 'Glow links four therapies that reduce inflammation, drain and work on the skin from within.',
      dedicatoria: 'So the light you have shows.',
      pasos: [
        ['Electromagnetic field', 'Switches on rest-and-repair mode and leaves cells more receptive to what comes next.'],
        ['Red light mask', 'Red and infrared light on the face. Stimulates collagen and elastin.'],
        ['Whole-body cryotherapy', '2 to 3 minutes at −130 °C. Reduces inflammation and activates microcirculation, which boosts the massage.'],
        ['Draining and sculpting massage', 'By hand and with devices. Reduces fluid retention and defines the silhouette: you leave feeling light.']
      ],
      otra: 'massage_plus' },
    sports: {
      sensacion: 'strength',
      titular: 'So their body recovers sooner and performs better.',
      motivo: 'Sports Performance is the circuit for people who train seriously. It oxygenates, reduces inflammation and releases muscle fatigue.',
      dedicatoria: 'So your body performs and recovers as it deserves.',
      pasos: [
        ['Hyperbaric chamber', '98 % oxygen at 1.5 atmospheres: up to ten times more oxygen in the tissues.'],
        ['Whole-body cryotherapy', '2 to 3 minutes at −130 °C. Reduces inflammation and eases pain.'],
        ['Pressotherapy', 'Compression boots from feet to hips. They drain and improve circulation: you leave with light legs.']
      ],
      otra: 'longevity' },
    sleep_stress: {
      sensacion: 'rest',
      titular: 'One hour for their body to slow down.',
      motivo: 'Sleep & Stress regulates the nervous system and prepares the body for sleep.',
      dedicatoria: 'So this winter you truly rest.',
      pasos: [
        ['Whole-body cryotherapy', '2 to 3 minutes at −130 °C. Lowers cortisol and leaves a state of calm and good mood.'],
        ['Red light bed', '10 minutes under 43,000 red and infrared LEDs. Helps regulate the sleep rhythm.'],
        ['Electromagnetic field', 'Switches on the body’s rest-and-repair mode.'],
        ['Neurostimulation', 'Binaural sound and light that take the brain into deep relaxation.']
      ],
      otra: 'massage_plus' },
    longevity: {
      sensacion: 'energy',
      titular: 'The most complete: energy for body and mind.',
      motivo: 'Longevity repairs, oxygenates and activates body and mind at the same time.',
      dedicatoria: 'So you have energy to spare all year.',
      pasos: [
        ['Electromagnetic field', 'Switches on rest-and-repair mode and leaves cells more receptive to what comes next.'],
        ['Neurostimulation', 'Binaural sound and light that take the brain into deep relaxation or focus.'],
        ['Hyperbaric chamber', '98 % oxygen at 1.5 atmospheres: up to ten times more oxygen in the tissues.'],
        ['Red light bed', '10 minutes under 43,000 LEDs. Activates the mitochondria, the energy centre of every cell.']
      ],
      otra: 'cognitiva' },
    cognitiva: {
      sensacion: 'clarity',
      titular: 'Oxygen, light and sound to think clearly.',
      motivo: 'Cognitive Performance is designed for a sharper, steadier and calmer mind.',
      dedicatoria: 'So your mind finds its calm and its focus.',
      pasos: [
        ['Hyperbaric chamber', '98 % oxygen at 1.5 atmospheres: up to ten times more oxygen in the tissues.'],
        ['Red light bed', '10 minutes under 43,000 red and infrared LEDs. Activates the mitochondria.'],
        ['Neurostimulation', 'Binaural sound and light that take the brain into focus.']
      ],
      otra: 'sleep_stress' },
    massage_plus: {
      sensacion: 'care',
      titular: 'An hour and a half in which they only have to let themselves be looked after.',
      motivo: 'Massage + is a massage made to measure, boosted with one more therapy.',
      dedicatoria: 'Some time just for you. You deserve it.',
      pasos: [
        ['A massage of their choice', 'Sports, relaxing, sculpting or facial.'],
        ['One more therapy of their choice', 'Cryotherapy, red light, pressotherapy, electromagnetic field or neurostimulation.']
      ],
      otra: 'sleep_stress' }
  },
  DEDICATORIA_FORMAL: 'Thank you for this year. Enjoy it.',

  RECIBE: {
    rotulo: 'How they receive it',
    titulo: 'It arrives *right away*. Or by hand.',
    digital: { t: 'Digital', d: 'After paying, we take you to their gift page, with their name and your message. You send it to them, by WhatsApp or email.', boton: 'See an example' },
    impreso: { t: 'Printed', d: 'A physical card you pick up at the studio, in Turó Park, to give by hand.', foto: 'nv-estudio.webp', boton: 'How to get there' },
    demo: 'https://www.revostudios.eu/regalo/demo?e='
  },

  SORTEO: {
    rotulo: 'Prize draw',
    titulo: 'We are giving away an experience among the members of *{nombre}*.',
    titulo_canal: { vecinos: 'We are giving away an experience among the neighbours of *Turó Park*.', socios: 'We are giving away an experience among *REVO* members.' },
    entrada: 'Leave your name and email. We only write if you win.',
    premio: 'An experience of your choice among the six, to enjoy until 31 March 2027. You can enter until {hasta}; the draw is on {dia}.',
    abre: 'Entries open on {desde}.',
    DESDE: '2026-11-26', HASTA: '2026-12-18', DIA: '2026-12-19',
    acepto: 'By entering you accept the {bases} and our {privacidad}.', privacidad: 'privacy policy',
    enlaceBases: '/navidad-bases', enlacePrivacidad: '/en/privacidad.html',
    nombre: 'Name', email: 'Email', telefono: 'Phone', opcional: 'optional',
    novedades: 'I would like to receive news from REVO. You can unsubscribe whenever you like.',
    boton: 'Enter',
    hecho: 'You are in. We will write if you win.',
    error: 'We could not enter you. Please try again in a moment.',
    errores: {
      datos: 'Check your name and email: one of them is not written correctly.',
      canal: 'This prize draw is no longer open.',
      fechas: 'The prize draw has ended. Thank you for your interest.',
      demasiados: 'Too many attempts in a row. Please try again in a while.'
    },
    bases: 'prize draw rules (in Spanish)'
  },

  DUDAS_TITULO: 'Before you *give*',
  DUDAS: [
    ['How long do they have to use it?', 'Six months from purchase.'],
    ['How do they book their session?', 'By WhatsApp or phone, whenever suits them. We help them find the day.'],
    ['When does the gift arrive?', 'Right away. After paying, we take you to their gift page so you can send it to them.'],
    ['Can I give it by hand?', 'Yes. Choose «Printed» when you gift it and pick up the card at the studio, in Turó Park.']
  ],

  PIE: { dir: 'REVO Studios · Carrer de Ferran Agulló, 24 · Turó Park, Barcelona', legal: [['Legal notice', '/en/aviso-legal.html'], ['Privacy', '/en/privacidad.html'], ['Cookies', '/en/cookies.html']] },

  CIERRE: { titulo: 'Would you like help choosing?', boton: 'Write to us on WhatsApp', wa: 'Hello, I would like to give a REVO experience for Christmas. Could you help me choose?' },

  // the «Gift» window (revo-regalar.js), with the same words as en/experiencias.html
  VENTANA: {
    cerrar: 'Close', kicker: 'Gift', titulo: 'Gift the experience ', sub: 'Complete the gift and we will take you to payment. We will email you the receipt.',
    formato: 'Which format would you like?', impreso: 'Printed', impresoMeta: 'Physical card · pick it up at REVO', digital: 'Digital', digitalMeta: 'Instantly · you send it by WhatsApp or email',
    para: 'For', paraPh: 'Who receives it', de: 'From', email: 'Your email', emailPh: 'For your payment receipt', ded: 'Message', dedPh: 'Optional — we will include it with the gift',
    boton: 'Continue to payment', enviando: 'Sending…', pie: 'Secure payment · handled by REVO Studios',
    error: 'We could not send your request. Check your connection and try again, or write to hello@revostudios.eu.',
    wa: 'Hello, I would like to give the {exp} experience. Could you help me?', waBoton: 'Write to us on WhatsApp'
  }
};
