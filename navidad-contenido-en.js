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
  CANALES: ['studio', 'socios', 'vecinos', 'instagram', 'ads', 'exmiembros', 'leads', 'partners', 'conserjes', 'web', 'goodfit', 'barrys', 'corehaus', 'casabarre', 'yogaone'],
  // «estudio» (María) = «studio» (QR ya impresos); «conserjes» lo crea la Platform; «web» es la propia web
  ALIAS_CANAL: { estudio: 'studio' },
  PARTNERS: ['goodfit', 'barrys', 'corehaus', 'casabarre', 'yogaone'],
  NOMBRES_CORTOS: { barrys: "Barry's", yogaone: 'YogaOne' },
  NOMBRES_PROVISIONALES: { goodfit: 'GoodFit', barrys: "Barry's Barcelona", corehaus: 'Corehaus', casabarre: 'Casa Barré', yogaone: 'YogaOne Aragó-Eixample', vecinos: 'Turó Park' },

  CABECERA: {
    rotulo: 'Christmas at REVO',
    titulo: 'What do you give someone who *has everything*?',
    entrada: 'Some time to look after themselves. Six experiences at REVO, the longevity club in Turó Park.',
    boton: 'Choose an experience',
    test: 'Not sure which? Find their gift',
    partner: 'For the {nombre} community.'
  },

  // the extra experience: only shown when the Platform says it is active (see the Spanish file)
  OFERTA: {
    franja: 'If you give two, there is one more from us. *Until {hasta}.*',
    hastaDefecto: '5 January',
    para: 'for you or for whoever you like',
    paraSocios: 'for someone you love',
    cuandoDefecto: 'from January to March 2027',
    cuando: 'from {mesDesde} to {mesHasta} {anio}',
    o: ' or ',
    duda: 'How does the extra experience work?',
    dudaElegir: [
      'Give two experiences by {hasta} and use the same email for both: that way we know they are yours. One you buy for yourself counts too.',
      'After paying for the second, tap «Get it» to open your gift page: the extra one appears there. You choose which, of equal or lower value than the less expensive of the two, and who it is for.',
      'If you used a different email for one of them, write to us and we will sort it out.'
    ],
    dudaLista: [
      'Give two experiences by {hasta} and use the same email for both: that way we know they are yours. One you buy for yourself counts too.',
      'After paying for the second, tap «Get it» to open your gift page: the extra one appears there. It is {exp} or, if that costs more than the less expensive of the two, another of equal or lower value. You choose who it is for.',
      'If you used a different email for one of them, write to us and we will sort it out.'
    ],
    dudaBoton: 'Write to us on WhatsApp',
    dudaWa: 'Hello, I have given two experiences using different emails and would like them to count together. Could you help me?',
    bloque: {
      titulo: 'If you give two, there is one more *from us*.',
      pasosElegir: [
        ['Give two experiences', 'On the same day or on different days, by {hasta}. Use the same email for both.'],
        ['You will see one more', 'After paying for the second, tap «Get it» to open your gift page. It appears there.'],
        ['Choose which one and who for', '{Para}. Of equal or lower value than the less expensive of the two.']
      ],
      pasosLista: [
        ['Give two experiences', 'On the same day or on different days, by {hasta}. Use the same email for both.'],
        ['You will see one more', 'After paying for the second, tap «Get it» to open your gift page. It appears there.'],
        ['Choose who for', '{Para}. It is {exp} or, if that costs more than the less expensive of the two, another of equal or lower value.']
      ],
      boton: 'Choose the experiences'
    },
    validez: '',
    test: 'For every two experiences you give, there is one more from us, {para}.'
  },
  MESES: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  FECHA: '{dia} {mes}',

  QUE_ES: {
    rotulo: 'What REVO is',
    titulo: 'REVO is a longevity club in Turó Park.',
    texto: 'A moment to look after yourself, calmly and with care: advanced therapies, medical direction and a team attentive to every detail. To feel well today and still feel well *twenty years from now*.'
  },

  EXPERIENCIAS_TITULO: 'Six experiences *to give*.',
  EXPERIENCIAS_ENTRADA: 'Each one with a purpose. Choose by who it’s for.',
  EXPERIENCIAS: [
    { id: 'glow', nombre: 'Glow', precio: 140, dur: '1 h 50 min', foto: 'nv-glow.webp', pos: '50% 30%',
      corto: 'For someone who never takes time for themselves.',
      lema: 'Looking after yourself, inside and out.',
      pasos: ['Electromagnetic field', 'Red light mask', 'Whole-body cryotherapy', 'Draining and sculpting massage'],
      url: 'https://momence.com/REVO-Studios/product/Glow-Experience/498606' },
    { id: 'sports', nombre: 'Sports Performance', precio: 140, dur: '1 h 30 min', foto: 'nv-sports.webp', pos: '50% 40%',
      corto: 'For someone who never stops training.',
      lema: 'Oxygen, cold and compression, for people who train.',
      pasos: ['Hyperbaric chamber', 'Whole-body cryotherapy', 'Pressotherapy'],
      url: 'https://momence.com/REVO-Studios/product/Sports-Performance-Experience/498608' },
    { id: 'sleep_stress', nombre: 'Sleep & Stress', precio: 140, dur: '1 h', foto: 'nv-sleep.webp', pos: '40% 45%',
      corto: 'For someone who never stops.',
      lema: 'Slow down. Switch off.',
      pasos: ['Whole-body cryotherapy', 'Red light bed', 'Electromagnetic field', 'Neurostimulation'],
      url: 'https://momence.com/REVO-Studios/product/Sleep-and-Stress-Experience/498614' },
    { id: 'longevity', nombre: 'Longevity', precio: 160, dur: '1 h 50 min', foto: 'nv-longevity.webp', pos: '50% 35%',
      corto: 'For someone thinking about the next twenty years.',
      lema: 'The most complete, for body and mind.',
      pasos: ['Electromagnetic field', 'Neurostimulation', 'Hyperbaric chamber', 'Red light bed'],
      url: 'https://momence.com/REVO-Studios/product/Longevity-Experience/498612' },
    { id: 'cognitiva', nombre: 'Cognitive Performance', precio: 140, dur: '1 h 40 min', foto: 'nv-cognitiva.webp', pos: '50% 35%',
      corto: 'For someone whose mind is always racing.',
      lema: 'Oxygen, light and sound, designed for the mind.',
      pasos: ['Hyperbaric chamber', 'Red light bed', 'Neurostimulation'],
      url: 'https://momence.com/REVO-Studios/product/Performance-Cognitiva-Experience/498616' },
    { id: 'massage_plus', nombre: 'Massage +', precio: 110, dur: '1 h 30 min', foto: 'nv-massage.webp', pos: '50% 50%',
      corto: 'For someone who keeps putting off their massage.',
      lema: 'Their massage, boosted.',
      pasos: ['Massage of their choice', 'One more therapy of their choice'],
      url: 'https://momence.com/REVO-Studios/product/Massage-Experience/498613' }
  ],
  BOTON_REGALAR: 'Gift',
  VER_REGALO: 'See how they receive it',

  TEST: {
    rotulo: 'Not sure which?',
    titulo: 'Find *their gift*.',
    entrada: 'Think of that person who has everything and answer four things. We tell you which experience fits that person, why, and show you how they receive it.',
    empezar: 'Start',
    duracion: 'About 30 seconds',
    foto: 'gift-bag.webp',
    cerrar: 'Close', atras: 'Back', seguir: 'Continue',
    intro: { foto: 'navidad-calma.webp', ojo: 'Find their gift', titulo: 'Think of that person *who has everything*.', texto: 'Four questions about who receives it. At the end we tell you which experience fits that person and show you how they receive it.', boton: 'Start' },
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
        { t: 'finds it hard to switch off at the end of the day', foto: 'nv-sleep.webp', pos: '40% 45%', da: 'sleep_stress', porque: 'finds it hard to switch off at the end of the day' }
      ]
    },
    deseo: {
      ojo: '03 · What you would give', titulo: 'If you could give *{nombre}* a feeling…', sin: 'If you could give them a feeling…',
      opciones: [
        { t: 'Energy', d: 'a while to recharge', da: 'longevity' },
        { t: 'Calm', d: 'stopping, slowing down and switching off', da: 'sleep_stress' },
        { t: 'Clarity', d: 'a while to clear their head', da: 'cognitiva' },
        { t: 'Strength', d: 'looking after the body they train with', da: 'sports' },
        { t: 'Glow', d: 'looking after themselves, inside and out', da: 'glow' },
        { t: 'Care', d: 'a while in which they only have to let themselves be looked after', da: 'massage_plus' }
      ]
    },
    como: {
      ojo: '04 · How you give it', titulo: 'How would you like to give it?',
      opciones: [
        { t: 'In their hands', d: 'A physical card you pick up at the studio, in Turó Park.', formato: 'impreso' },
        { t: 'By message', d: 'You send it by WhatsApp or email, on the day you choose.', formato: 'digital' }
      ]
    },
    preparando: { titulo: 'Preparing *{nombre}*’s gift…', sin: 'Preparing their gift…', lineas: ['Their day', 'What you would give', 'How you give it'] },
    res: {
      ojo: 'Their gift',
      recibe: 'This is how they will receive it',
      recibeNotaImpreso: 'The card you pick up at the studio, with their name and the experience written by hand.',
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
      formatoDigital: 'By message · on the day you choose',
      otra: 'To complete the gift',
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
      titular: 'Almost two hours to look after themselves, inside and out.',
      motivo: 'Glow links four therapies, with red light for the skin and a draining and sculpting massage.',
      dedicatoria: 'So the light you have shows.',
      pasos: [
        ['Electromagnetic field', 'Leaves cells more receptive to the stimuli that follow: that is why it opens the circuit.'],
        ['Red light mask', 'Red and infrared light on the face. Stimulates collagen and elastin.'],
        ['Whole-body cryotherapy', '2 to 3 minutes at −130 °C. Activates microcirculation, which is why it comes right before the massage.'],
        ['Draining and sculpting massage', 'Intense, by hand and with devices. You leave feeling light.']
      ],
      otra: 'massage_plus' },
    sports: {
      sensacion: 'strength',
      titular: 'The circuit for people who train seriously.',
      motivo: 'Sports Performance links oxygen, cold and compression in an hour and a half.',
      dedicatoria: 'For you, who train seriously.',
      pasos: [
        ['Hyperbaric chamber', '98 % oxygen at 1.5 atmospheres: up to ten times more oxygen in the tissues.'],
        ['Whole-body cryotherapy', '2 to 3 minutes at −130 °C: a brief stimulus the body responds to strongly.'],
        ['Pressotherapy', 'Air compression boots, from feet to hips. You leave with light legs.']
      ],
      otra: 'longevity' },
    sleep_stress: {
      sensacion: 'calm',
      titular: 'One hour to slow down.',
      motivo: 'Sleep & Stress is one hour to stop and switch off, with cold, light, electromagnetic fields and sound.',
      dedicatoria: 'One hour to stop. No phone and no rush.',
      pasos: [
        ['Whole-body cryotherapy', '2 to 3 minutes at −130 °C: a brief stimulus the body responds to strongly.'],
        ['Red light bed', '10 minutes under 43,000 red and infrared LEDs, with nothing to do.'],
        ['Electromagnetic field', 'The magnetotherapy physiotherapists use, for the whole body.'],
        ['Neurostimulation', 'Binaural sound and light: a while to keep the mind still.']
      ],
      otra: 'massage_plus' },
    longevity: {
      sensacion: 'energy',
      titular: 'The most complete, for body and mind.',
      motivo: 'Longevity brings together electromagnetic fields, sound, oxygen and light in almost two hours.',
      dedicatoria: 'A while to recharge, before another year begins.',
      pasos: [
        ['Electromagnetic field', 'Leaves cells more receptive to the stimuli that follow: that is why it opens the circuit.'],
        ['Neurostimulation', 'Binaural sound and light: a while to keep the mind still.'],
        ['Hyperbaric chamber', '98 % oxygen at 1.5 atmospheres: up to ten times more oxygen in the tissues.'],
        ['Red light bed', '10 minutes under 43,000 LEDs. Activates the mitochondria, the energy centre of every cell.']
      ],
      otra: 'cognitiva' },
    cognitiva: {
      sensacion: 'clarity',
      titular: 'A while for the mind.',
      motivo: 'Cognitive Performance brings together oxygen, light and sound, designed for the mind.',
      dedicatoria: 'A while for you and your mind.',
      pasos: [
        ['Hyperbaric chamber', '98 % oxygen at 1.5 atmospheres: up to ten times more oxygen in the tissues.'],
        ['Red light bed', '10 minutes under 43,000 red and infrared LEDs. Activates the mitochondria.'],
        ['Neurostimulation', 'Binaural sound and light, in focus mode.']
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
    rotulo: 'How it is given',
    titulo: 'Choose how and *when* you give it.',
    digital: { alt: 'Their gift page on a phone: who it is from, the experience and its circuit.', t: 'Digital', d: 'After paying, their gift is ready, with their name and your message. You send it yourself, by WhatsApp or email, on the day you choose: this afternoon, on Christmas Eve or on 6 January.', boton: 'See an example' },
    impreso: { t: 'Printed', d: 'A physical card you pick up at the studio, in Turó Park, to give in person.', foto: '/material-navidad/tarjeta-impresa.webp', alt: 'The black REVO envelope opens and the card comes out, with the name and the experience written by hand.', boton: 'How to get there' },
    demo: 'https://www.revostudios.eu/regalo/demo?e='
  },

  SORTEO: {
    rotulo: 'Sign up',
    titulo: 'This December, a REVO experience awaits someone from *{nombre}*.',
    titulo_canal: { vecinos: 'This Christmas, a REVO experience is for a neighbour of *Turó Park*.', socios: 'This December, a REVO experience awaits someone from *REVO*.' },
    entrada: 'Your entry is waiting for you. We only need your name and email.',
    premio: 'The person chosen picks one of the six experiences at the studio, in Turó Park, and enjoys it for a year. You have until {hasta}; on {dia} we choose and write to them.',
    tarjeta: 'Your gift from {quien}', tarjetaTexto: 'You have an entry in the draw for a REVO experience.', quienVecinos: 'your neighbours at REVO',
    tarjetaOferta: 'If you give two experiences, there is one more from us.', tarjetaOfertaPie: 'From {precio} €',
    hechoVecinos: 'You are in. Good luck, neighbour.', hechoOtros: 'You are in. Good luck.',
    mientras: 'And in the meantime…', pregunta: 'What do you give someone *who has everything*?',
    tresExp: ['sleep_stress', 'glow', 'massage_plus'], verTodas: 'See all six experiences',
    enMano: 'Prefer to give it in person? Pick up the card at the studio, just round the corner.',
    legal: 'No purchase necessary. Over 18s only. Terms at revostudios.eu/navidad-bases.',
    abre: 'Sign-ups open on {desde}.',
    DESDE: '2026-11-26', HASTA: '2026-12-18', DIA: '2026-12-19',
    acepto: 'By signing up you accept the {bases} and our {privacidad}.', privacidad: 'privacy policy',
    enlaceBases: '/navidad-bases', enlacePrivacidad: '/en/privacidad.html',
    nombre: 'Name', email: 'Email', telefono: 'Phone', opcional: 'optional',
    novedades: 'I would like to receive news from REVO. You can unsubscribe whenever you like.',
    boton: 'Activate my entry',
    hecho: 'You are in. We will write if it is for you.',
    error: 'We could not sign you up. Please try again in a moment.',
    errores: {
      datos: 'Check your name and email: one of them is not written correctly.',
      canal: 'Sign-ups are no longer open.',
      fechas: 'Sign-ups are now closed. Thank you for your interest.',
      demasiados: 'Too many attempts in a row. Please try again in a while.'
    },
    bases: 'terms (in Spanish)'
  },

  DUDAS_TITULO: 'Before you *give*',
  DUDAS: [
    ['How long do they have to use it?', 'One year from purchase.'],
    ['How do they book their session?', 'By WhatsApp or phone, whenever suits them. We help them find the day.'],
    ['When does it reach them?', 'Whenever you like. After paying, their gift is ready and you send it yourself, on the day you choose.'],
    ['Can I give it by hand?', 'Yes. Choose «Printed» when you gift it and pick up the card at the studio, in Turó Park.']
  ],

  PIE: { dir: 'REVO Studios · Carrer de Ferran Agulló, 24 · Turó Park, Barcelona', legal: [['Legal notice', '/en/aviso-legal.html'], ['Privacy', '/en/privacidad.html'], ['Cookies', '/en/cookies.html']] },

  CIERRE: { titulo: 'Would you like help choosing?', boton: 'Write to us on WhatsApp', wa: 'Hello, I would like to give a REVO experience for Christmas. Could you help me choose?' },

  // the «Gift» window (revo-regalar.js), with the same words as en/experiencias.html
  VENTANA: {
    cerrar: 'Close', kicker: 'Gift', titulo: 'Gift the experience ', sub: 'Complete the gift and we will take you to payment. We will email you the receipt.',
    formato: 'Which format would you like?', impreso: 'Printed', impresoMeta: 'Physical card · pick it up at REVO', digital: 'Digital', digitalMeta: 'You send it by WhatsApp or email, whenever you like',
    para: 'For', paraPh: 'Who receives it', de: 'From', email: 'Your email', emailPh: 'For your payment receipt', ded: 'Message', dedPh: 'Optional — we will include it with the gift',
    boton: 'Continue to payment', enviando: 'Sending…', pie: 'Secure payment · handled by REVO Studios',
    error: 'We could not send your request. Check your connection and try again, or write to hello@revostudios.eu.',
    wa: 'Hello, I would like to give the {exp} experience. Could you help me?', waBoton: 'Write to us on WhatsApp',
    pagado: 'Already paid? Your gift is ready.', recoger: 'Get it'
  }
};
