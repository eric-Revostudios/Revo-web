/* Campaña de Navidad 2026 (/navidad) · TODO el texto de la página está aquí.
   Cambiar una frase = cambiarla aquí y en ningún otro sitio. Los textos son PROVISIONALES: los definitivos los
   escribe el equipo (María) y se pegan encima. Reglas: las de la skill revo-tono (de tú, sin exclamaciones, sin
   «oferta», «promoción», «3×2» ni «2+1»; sin prometer resultados).
   Un poco de formato: *texto* → cursiva de la casa (Noto Serif). Nada más. */
window.NAVIDAD = {

  /* ---- interruptores ---- */
  // Mandar el canal (?c=) a la Platform con cada regalo. APAGADO hasta que la Platform confirme que /api/regalo lo
  // admite (con el campo trampa relleno responde «ok» sin mirar nada, así que no se puede comprobar desde fuera).
  ENVIAR_CANAL: false,
  // Pedir a la Platform el nombre del partner y si su canal tiene sorteo. Sin respuesta (o sin la puerta publicada),
  // la página sigue sin sorteo y con el texto general.
  PLATFORM: 'https://revo-platform.vercel.app',
  CANALES: ['studio', 'socios', 'vecinos', 'instagram', 'ads', 'goodfit', 'barrys', 'corehaus', 'casabarre', 'yogaone'],
  // los centros asociados: con su canal, la cabecera dice «Para la comunidad de {nombre}»
  PARTNERS: ['goodfit', 'barrys', 'corehaus', 'casabarre', 'yogaone'],
  // Solo para la maqueta: si la Platform no contesta, con ?sorteo=1 se ve el bloque del sorteo para revisarlo.
  NOMBRES_PROVISIONALES: { goodfit: 'GoodFit', barrys: "Barry's", corehaus: 'CoreHaus', casabarre: 'Casa Barre', yogaone: 'YogaOne', vecinos: 'Turó Park' },

  /* ---- cabecera ---- */
  CABECERA: {
    rotulo: 'Navidad en REVO',
    titulo: 'Esta Navidad, regala *salud*.',
    entrada: 'Hay regalos que se abren. Este se siente.',
    boton: 'Elegir una experiencia',
    test: '¿No sabes cuál? Tres preguntas',
    // con canal de partner: se añade debajo del titular. {nombre} = nombre del partner
    partner: 'Para la comunidad de {nombre}.'
  },

  /* ---- la oferta en una frase ---- */
  OFERTA: {
    rotulo: 'Hasta el 5 de enero',
    frase: 'Regala dos experiencias y te regalamos *una tercera*, para ti o para quien quieras.',
    letra: 'La tercera es de igual o menor precio que la más económica de las dos y se disfruta de enero a marzo de 2027. Te llega sola, en la página de tu regalo.'
  },

  /* ---- las seis experiencias ----
     Precio, enlace de Momence y textos: los mismos que experiencias.html (20-nov-2026). Si cambian allí, aquí también.
     `id` es el que usa la página del regalo de la Platform (/regalo/demo?e=…). */
  EXPERIENCIAS_TITULO: 'Seis experiencias para *regalar*.',
  EXPERIENCIAS_ENTRADA: 'Varias terapias en una sola visita, encadenadas por nuestro equipo médico para un objetivo.',
  EXPERIENCIAS: [
    { id: 'glow', nombre: 'Glow', precio: 140, dur: '1 h 50 min', foto: 'laugh-blonde.webp', pos: '50% 30%',
      lema: 'Piel luminosa, silueta definida.',
      pasos: ['Campo electromagnético', 'Máscara de luz roja', 'Crioterapia de cuerpo entero', 'Masaje drenante y moldeador'],
      url: 'https://momence.com/REVO-Studios/product/Glow-Experience/498606' },
    { id: 'sports', nombre: 'Sports Performance', precio: 140, dur: '1 h 30 min', foto: 'jump-man.jpg', pos: '50% 40%',
      lema: 'Recupérate más rápido. Rinde mejor.',
      pasos: ['Cámara hiperbárica', 'Crioterapia de cuerpo entero', 'Presoterapia'],
      url: 'https://momence.com/REVO-Studios/product/Sports-Performance-Experience/498608' },
    { id: 'sleep_stress', nombre: 'Sleep & Stress', precio: 140, dur: '1 h', foto: 'massage-glow.webp', pos: '40% 45%',
      lema: 'Baja el ritmo. Descansa de verdad.',
      pasos: ['Crioterapia de cuerpo entero', 'Cama de luz roja', 'Campo electromagnético', 'Neuroestimulación'],
      url: 'https://momence.com/REVO-Studios/product/Sleep-and-Stress-Experience/498614' },
    { id: 'longevity', nombre: 'Longevity', precio: 160, dur: '1 h 50 min', foto: 'two-women.webp', pos: '50% 35%',
      lema: 'Más energía. Un cuerpo que se siente más joven.',
      pasos: ['Campo electromagnético', 'Neuroestimulación', 'Cámara hiperbárica', 'Cama de luz roja'],
      url: 'https://momence.com/REVO-Studios/product/Longevity-Experience/498612' },
    { id: 'cognitiva', nombre: 'Performance Cognitiva', precio: 140, dur: '1 h 40 min', foto: 'focus-man.webp', pos: '50% 35%',
      lema: 'Piensa con claridad. Mantén el foco.',
      pasos: ['Cámara hiperbárica', 'Cama de luz roja', 'Neuroestimulación'],
      url: 'https://momence.com/REVO-Studios/product/Performance-Cognitiva-Experience/498616' },
    { id: 'massage_plus', nombre: 'Massage +', precio: 110, dur: '1 h 30 min', foto: 'massage-room.webp', pos: '50% 50%',
      lema: 'Su masaje, potenciado.',
      pasos: ['Masaje a elegir', 'Una terapia más, a elegir'],
      url: 'https://momence.com/REVO-Studios/product/Massage-Experience/498613' }
  ],
  BOTON_REGALAR: 'Regalar',
  VER_REGALO: 'Ver cómo lo recibe',

  /* ---- «¿No sabes cuál? Tres preguntas» ----
     Se abre directo con /navidad#test (para los anuncios «con test»).
     La tercera respuesta decide; la segunda solo desempata cuando la tercera da dos opciones. */
  TEST: {
    rotulo: '¿No sabes cuál?',
    titulo: 'Tres preguntas sobre *quien lo recibe*.',
    entrada: 'Te decimos qué experiencia le encaja y por qué.',
    p1: { titulo: 'Hoy está al…', ayuda: 'Desliza hasta donde creas.', min: 50, max: 100, boton: 'Continuar' },
    p2: { titulo: 'Así se cuida', ayuda: 'Elige lo que más se le parece.',
      opciones: [
        { t: 'Se mueve o entrena', da: ['sports'] },
        { t: 'Se da un masaje o va al fisio', da: ['massage_plus'] },
        { t: 'Yoga, meditación o cuida su descanso', da: ['sleep_stress'] },
        { t: 'Lleva reloj o anillo, se hace analíticas, toma suplementos', da: ['longevity'] },
        { t: 'Menos de lo que querría', da: ['massage_plus', 'sleep_stress'] }
      ] },
    p3: { titulo: 'Le vendría bien…',
      opciones: [
        { t: 'tener más energía', da: 'longevity' },
        { t: 'descansar de verdad', da: 'sleep_stress' },
        { t: 'tener la cabeza más clara', da: 'cognitiva' },
        { t: 'sentir su cuerpo fuerte y ágil', da: 'sports' },
        { t: 'sentirse bien con su aspecto', da: 'glow' },
        { t: 'que alguien le cuide un rato', da: 'massage_plus' }
      ] },
    // el porqué de cada experiencia, en una frase (en tercera persona)
    porque: {
      glow: 'Cuatro terapias encadenadas para desinflamar, drenar y dar luz a la piel. Sale con otra cara.',
      sports: 'Oxígeno, frío y presión para que el músculo se recupere antes. Pensada para quien entrena en serio.',
      sleep_stress: 'Un circuito que baja el ritmo del sistema nervioso y prepara el cuerpo para dormir.',
      longevity: 'La más completa: oxígeno, luz y estímulo para cuerpo y cabeza a la vez. Para quien quiere más energía.',
      cognitiva: 'Oxígeno, luz y sonido para una mente más clara y estable.',
      massage_plus: 'Un masaje a su medida y una terapia más. Una hora y media en la que solo tiene que dejarse cuidar.'
    },
    resultado: 'Para quien está al {pct} %, lo que más le encaja:',
    otra: 'Volver a empezar'
  },

  /* ---- así lo recibe ---- */
  RECIBE: {
    rotulo: 'Así lo recibe',
    titulo: 'Llega *al momento*. O en mano.',
    digital: { t: 'Digital', d: 'Al pagar te llevamos a la página de su regalo, con su nombre y tu dedicatoria. Se la envías tú, por WhatsApp o por correo.', boton: 'Ver un ejemplo' },
    impreso: { t: 'Impreso', d: 'Una tarjeta física que recoges en el estudio, en Turó Park, para darla en mano.', foto: 'lounge.webp', boton: 'Cómo llegar' },
    // la página real de la Platform (ejemplo con la experiencia que se elija)
    demo: '/regalo/demo?e='
  },

  /* ---- sorteo (solo canales que lo tienen) ---- */
  SORTEO: {
    rotulo: 'Sorteo',
    titulo: 'Sorteamos una experiencia entre los miembros de *{nombre}*.',
    // canales que no son un centro: su propia frase
    titulo_canal: { vecinos: 'Sorteamos una experiencia entre los vecinos de *Turó Park*.', socios: 'Sorteamos una experiencia entre los miembros de *REVO*.' },
    entrada: 'Déjanos tu nombre y tu correo. Te escribimos solo si te toca.',
    nombre: 'Nombre', email: 'Email', telefono: 'Teléfono', opcional: 'opcional',
    novedades: 'Quiero recibir novedades de REVO. Puedes darte de baja cuando quieras.',
    boton: 'Apuntarme',
    hecho: 'Ya estás dentro. Te escribimos si te toca.',
    error: 'No hemos podido apuntarte. Inténtalo de nuevo en un momento.',
    bases: 'Bases del sorteo'
  },

  /* ---- preguntas frecuentes (solo lo que ya dice la web o la página del regalo) ---- */
  DUDAS_TITULO: 'Antes de *regalar*',
  DUDAS: [
    ['¿Cuánto tiempo tiene para usarla?', 'Seis meses desde la compra. La experiencia de regalo, de enero a marzo de 2027.'],
    ['¿Cómo reserva su sesión?', 'Por WhatsApp o por teléfono, cuando le vaya bien. Le ayudamos a encontrar el día.'],
    ['¿Cuándo llega el regalo?', 'Al momento. Al pagar te llevamos a la página de su regalo para que se la envíes tú.'],
    ['¿Puedo darlo en mano?', 'Sí. Elige «Impreso» al regalar y recoge la tarjeta en el estudio, en Turó Park.'],
    ['¿Cómo funciona la tercera experiencia?', 'Al regalar dos, el tercer vale aparece solo en la página de tu regalo. Es de igual o menor precio que la más económica de las dos y se disfruta de enero a marzo de 2027.']
  ],

  /* ---- cierre ---- */
  CIERRE: { titulo: '¿Prefieres que te ayudemos a elegir?', boton: 'Escríbenos por WhatsApp', wa: 'Hola, quiero regalar una experiencia de REVO por Navidad. ¿Me ayudáis a elegir?' }
};
