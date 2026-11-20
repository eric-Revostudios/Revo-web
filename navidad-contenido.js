/* Campaña de Navidad 2026 (/navidad) · TODO el texto de la página está aquí.
   Cambiar una frase = cambiarla aquí y en ningún otro sitio. Los textos son PROVISIONALES: los definitivos los
   escribe el equipo (María) y se pegan encima. Reglas: las de la skill revo-tono (de tú, sin exclamaciones, sin
   «oferta», «promoción», «3×2» ni «2+1»; sin prometer resultados).
   Un poco de formato: *texto* → cursiva de la casa (Noto Serif). Nada más. */
window.NAVIDAD = {

  /* ---- interruptores ---- */
  // Mandar el canal (?c=) a la Platform con cada regalo. Encendido el 20-nov-2026: la Platform confirmó que
  // /api/regalo lo admite (commit da787f7 de revo-clinical) y que uno mal formado se ignora sin romper el regalo.
  ENVIAR_CANAL: true,
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
    test: '¿No sabes cuál? Encuentra su regalo',
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

  /* ---- «Encuentra su regalo» (antes «¿No sabes cuál? Tres preguntas»); rehecho el 21-nov-2026 ----
     Eric: «demasiado cutre, rápido; debería ser muchísimo más útil». Ahora:
     · Tres respuestas que completan UNA frase sobre quien lo recibe (como en /tu-punto, no suenan a encuesta):
       «Es para mi madre, que va a mil y le cuesta parar, y le regalaría dormir de verdad.»
     · La tercera decide la experiencia; la segunda da la segunda opción (para la oferta de la tercera de regalo).
     · El resultado: por qué le encaja, qué vivirá paso a paso (cifras de revo-tono), la tarjeta del regalo con su
       nombre y una dedicatoria sugerida que se puede cambiar, y «Regalar» abre la ventana ya rellena.
     · Sin datos de salud. El nombre y la dedicatoria se quedan en el navegador: no viajan en la medición.
     · Se abre directo con /navidad#test (anuncios «con test»). */
  TEST: {
    rotulo: '¿No sabes cuál?',
    titulo: 'Encuentra *su regalo*.',
    entrada: 'Tres respuestas sobre quien lo recibe. Te decimos qué experiencia le encaja, por qué, y cómo se la regalas.',
    atras: 'Atrás',
    preguntas: [
      { clave: 'para', frase: 'Es para', titulo: 'Es para…',
        opciones: [
          { t: 'mi pareja' },
          { t: 'mi madre o mi padre' },
          { t: 'una amiga o un amigo' },
          { t: 'alguien de mi familia' },
          { t: 'alguien del trabajo', formal: true }
        ] },
      { clave: 'dia', frase: 'que', titulo: 'En su día a día…',
        opciones: [
          { t: 'va a mil y le cuesta parar', da: 'sleep_stress', porque: 'Va a mil y le cuesta parar.' },
          { t: 'entrena o hace deporte a menudo', da: 'sports', porque: 'Entrena a menudo y le pide mucho al cuerpo.' },
          { t: 'pasa muchas horas pensando, delante de una pantalla', da: 'cognitiva', porque: 'Pasa muchas horas pensando, delante de una pantalla.' },
          { t: 'cuida de todos, menos de sí', da: 'massage_plus', porque: 'Cuida de todos, menos de sí.' },
          { t: 'ya se cuida: mide, se analiza, prueba cosas nuevas', da: 'longevity', porque: 'Ya se cuida y le gusta probar lo que funciona.' },
          { t: 'le gusta cuidarse también por fuera', da: 'glow', porque: 'Le gusta cuidarse también por fuera.' }
        ] },
      { clave: 'deseo', frase: 'y le regalaría', titulo: 'Si pudieras, le regalarías…',
        opciones: [
          { t: 'energía para todo el día', da: 'longevity' },
          { t: 'dormir de verdad', da: 'sleep_stress' },
          { t: 'la cabeza clara y en calma', da: 'cognitiva' },
          { t: 'un cuerpo fuerte que se recupere antes', da: 'sports' },
          { t: 'verse y sentirse con luz', da: 'glow' },
          { t: 'un rato solo para sí', da: 'massage_plus' }
        ] }
    ],
    // el resultado
    rotuloResultado: 'Su regalo',
    porQue: 'Por qué le encaja',
    vivira: 'Lo que vivirá',
    tarjeta: 'Así le llega',
    nombre: 'Su nombre',
    nombreAyuda: 'Opcional. Lo ponemos en su regalo.',
    dedicatoria: 'Tu dedicatoria',
    dedicatoriaAyuda: 'Te proponemos una. Cámbiala como quieras.',
    unRegaloPara: 'Un regalo para',
    boton: 'Regalar {exp}',
    botonNombre: 'Regalar {exp} a {nombre}',
    nota: 'Al momento, por WhatsApp o correo. O en una tarjeta que recoges en el estudio.',
    otra: 'También le encajaría',
    oferta: 'Si regalas las dos, te regalamos una tercera, para ti o para quien quieras.',
    otraBoton: 'Regalar {exp}',
    deNuevo: 'Volver a empezar'
  },
  // Para cada experiencia, lo que se cuenta en el resultado. Cifras: solo las de revo-tono (datos.md).
  REGALO: {
    glow: {
      titular: 'Su piel, con luz. Su cuerpo, más ligero.',
      porque: 'Y lo que más le regalarías es verse y sentirse con luz: Glow desinflama, drena y trabaja la piel desde dentro.',
      dedicatoria: 'Para que se te vea la luz que tienes.',
      pasos: [
        ['Campos electromagnéticos', 'Activan el modo de descanso y reparación, y dejan las células más receptivas a lo que viene después.'],
        ['Máscara de luz roja', 'Luz roja e infrarroja en la cara. Estimula el colágeno y la elastina.'],
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C. Desinflama y activa la microcirculación, que potencia el masaje.'],
        ['Masaje drenante y moldeador', 'Con manos y aparatología. Reduce la retención de líquidos y define la silueta: se sale con sensación de ligereza.']
      ],
      otra: 'massage_plus' },
    sports: {
      titular: 'Para que su cuerpo se recupere antes y rinda mejor.',
      porque: 'Y lo que más le regalarías es un cuerpo fuerte que se recupere antes: es el circuito de quien entrena en serio.',
      dedicatoria: 'Para que tu cuerpo rinda y se recupere como se merece.',
      pasos: [
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C. Baja la inflamación y alivia el dolor.'],
        ['Presoterapia', 'Botas de compresión de los pies a la cadera. Drenan y mejoran la circulación: se sale con las piernas ligeras.']
      ],
      otra: 'longevity' },
    sleep_stress: {
      titular: 'Una hora para que su cuerpo baje el ritmo.',
      porque: 'Y lo que más le regalarías es dormir de verdad: este circuito regula el sistema nervioso y prepara el cuerpo para descansar.',
      dedicatoria: 'Para que este invierno descanses de verdad.',
      pasos: [
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C. Baja el cortisol y deja un estado de calma y buen humor.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs de luz roja e infrarroja. Ayuda a regular el ritmo del sueño.'],
        ['Campos electromagnéticos', 'Activan el modo de descanso y reparación del cuerpo.'],
        ['Neuroestimulación', 'Sonido binaural y luz que llevan al cerebro a la relajación profunda.']
      ],
      otra: 'massage_plus' },
    longevity: {
      titular: 'La más completa: energía para el cuerpo y la cabeza.',
      porque: 'Y lo que más le regalarías es energía para todo el día: Longevity repara, oxigena y activa cuerpo y cabeza a la vez.',
      dedicatoria: 'Para que te sobre energía todo el año.',
      pasos: [
        ['Campos electromagnéticos', 'Activan el modo de descanso y reparación, y dejan las células más receptivas a lo que viene después.'],
        ['Neuroestimulación', 'Sonido binaural y luz que llevan al cerebro a la relajación profunda o al foco.'],
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs. Activa la mitocondria, la central de energía de cada célula.']
      ],
      otra: 'cognitiva' },
    cognitiva: {
      titular: 'Oxígeno, luz y sonido para pensar con claridad.',
      porque: 'Y lo que más le regalarías es la cabeza clara y en calma: Performance Cognitiva está pensada para una mente más nítida y estable.',
      dedicatoria: 'Para que la cabeza encuentre su calma y su foco.',
      pasos: [
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs de luz roja e infrarroja. Activa la mitocondria.'],
        ['Neuroestimulación', 'Sonido binaural y luz que llevan al cerebro al foco.']
      ],
      otra: 'sleep_stress' },
    massage_plus: {
      titular: 'Una hora y media en la que solo tiene que dejarse cuidar.',
      porque: 'Y lo que más le regalarías es un rato solo para sí: un masaje a su medida, potenciado con una terapia más.',
      dedicatoria: 'Un rato solo para ti. Te lo mereces.',
      pasos: [
        ['Un masaje a elegir', 'Deportivo, relajante, moldeador o facial.'],
        ['Una terapia más, a elegir', 'Crioterapia, luz roja, presoterapia, campos electromagnéticos o neuroestimulación.']
      ],
      otra: 'sleep_stress' }
  },
  // la dedicatoria para alguien del trabajo, más sobria
  DEDICATORIA_FORMAL: 'Gracias por este año. Que lo disfrutes.',

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
    errores: {
      datos: 'Revisa el nombre y el email: alguno no está bien escrito.',
      canal: 'Este sorteo ya no está abierto.',
      fechas: 'El sorteo ya ha terminado. Gracias por tu interés.',
      demasiados: 'Demasiados intentos seguidos. Prueba de nuevo dentro de un rato.'
    },
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
