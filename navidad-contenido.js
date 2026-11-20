/* Campaña de Navidad 2026 (/navidad) · TODO el texto de la página está aquí.
   Cambiar una frase = cambiarla aquí y en ningún otro sitio. Los textos son PROVISIONALES: los definitivos los
   escribe el equipo (María) y se pegan encima. Reglas: las de la skill revo-tono (de tú, sin exclamaciones, sin
   «oferta», «promoción», «3×2» ni «2+1»; sin prometer resultados).
   Un poco de formato: *texto* → cursiva de la casa (Noto Serif). Nada más. */
window.NAVIDAD = {
  IDIOMA: 'es',
  OTRO_IDIOMA: { t: 'EN', lang: 'en' },

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
  NOMBRES_PROVISIONALES: { goodfit: 'GoodFit', barrys: "Barry's Barcelona", corehaus: 'Corehaus', casabarre: 'Casa Barré', yogaone: 'YogaOne Aragó-Eixample', vecinos: 'Turó Park' },   // los mismos que la Platform (21-nov)

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
  /* ---- la oferta «dos y una de regalo»: la MANDA LA PLATFORM (22-nov-2026) ----
     GET /api/campana/canal (con o sin ?c=) trae `oferta: { activa, modo: 'elegir' | 'lista', experiencias: [ids],
     valido_desde, valido_hasta }` y `campana: { desde, hasta }`. La oferta solo se ve si `oferta.activa` es true;
     si es false, si no viene el campo o si la Platform no contesta, no sale NI UNA palabra (ni el bloque, ni la línea
     del resultado del test, ni la pregunta frecuente). Se enciende y se apaga desde la Platform (Regalos → Canales).
     Para revisarla sin encenderla: ?oferta=elegir o ?oferta=lista (solo en este navegador, no cambia nada para nadie).
     {cuando} = «de enero a marzo de 2027», sacado de valido_desde / valido_hasta; {exp} = la experiencia o
     experiencias de la lista. Nunca «3×2», «2+1», «oferta» ni «descuento». */
  OFERTA: {
    rotulo: 'Del {desde} al {hasta}',
    rotuloDefecto: 'Hasta el 5 de enero',
    frase: 'Regalas dos. *La tercera, de nuestra parte.*',
    entrada: 'Al regalar dos experiencias, te regalamos una tercera, para ti o para quien quieras.',
    letraElegir: 'La tercera es de igual o menor precio que la más económica de las dos y se disfruta {cuando}. Te llega sola, en la página de tu regalo.',
    letraLista: 'La tercera es {exp} y se disfruta {cuando}. Te llega sola, en la página de tu regalo.',
    cuandoDefecto: 'de enero a marzo de 2027',
    cuando: 'de {mesDesde} a {mesHasta} de {anio}',
    o: ' o ',
    duda: '¿Cómo funciona la tercera experiencia?',
    dudaTexto: 'Al regalar dos, el tercer vale aparece solo en la página de tu regalo. {letra}',
    test: 'Si regalas dos experiencias, te regalamos una tercera, para ti o para quien quieras.'
  },
  MESES: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  FECHA: '{dia} de {mes}',

  /* ---- las seis experiencias ----
     Precio, enlace de Momence y textos: los mismos que experiencias.html (20-nov-2026). Si cambian allí, aquí también.
     `id` es el que usa la página del regalo de la Platform (/regalo/demo?e=…). */
  EXPERIENCIAS_TITULO: 'Seis experiencias para *regalar*.',
  EXPERIENCIAS_ENTRADA: 'Varias terapias en una sola visita, encadenadas por nuestro equipo médico para un objetivo.',
  EXPERIENCIAS: [
    { id: 'glow', nombre: 'Glow', precio: 140, dur: '1 h 50 min', foto: 'nv-glow.webp', pos: '50% 30%',
      lema: 'Piel luminosa, silueta definida.',
      pasos: ['Campo electromagnético', 'Máscara de luz roja', 'Crioterapia de cuerpo entero', 'Masaje drenante y moldeador'],
      url: 'https://momence.com/REVO-Studios/product/Glow-Experience/498606' },
    { id: 'sports', nombre: 'Sports Performance', precio: 140, dur: '1 h 30 min', foto: 'nv-sports.webp', pos: '50% 40%',
      lema: 'Recupérate más rápido. Rinde mejor.',
      pasos: ['Cámara hiperbárica', 'Crioterapia de cuerpo entero', 'Presoterapia'],
      url: 'https://momence.com/REVO-Studios/product/Sports-Performance-Experience/498608' },
    { id: 'sleep_stress', nombre: 'Sleep & Stress', precio: 140, dur: '1 h', foto: 'nv-sleep.webp', pos: '40% 45%',
      lema: 'Baja el ritmo. Descansa de verdad.',
      pasos: ['Crioterapia de cuerpo entero', 'Cama de luz roja', 'Campo electromagnético', 'Neuroestimulación'],
      url: 'https://momence.com/REVO-Studios/product/Sleep-and-Stress-Experience/498614' },
    { id: 'longevity', nombre: 'Longevity', precio: 160, dur: '1 h 50 min', foto: 'nv-longevity.webp', pos: '50% 35%',
      lema: 'Más energía. Un cuerpo que se siente más joven.',
      pasos: ['Campo electromagnético', 'Neuroestimulación', 'Cámara hiperbárica', 'Cama de luz roja'],
      url: 'https://momence.com/REVO-Studios/product/Longevity-Experience/498612' },
    { id: 'cognitiva', nombre: 'Performance Cognitiva', precio: 140, dur: '1 h 40 min', foto: 'nv-cognitiva.webp', pos: '50% 35%',
      lema: 'Piensa con claridad. Mantén el foco.',
      pasos: ['Cámara hiperbárica', 'Cama de luz roja', 'Neuroestimulación'],
      url: 'https://momence.com/REVO-Studios/product/Performance-Cognitiva-Experience/498616' },
    { id: 'massage_plus', nombre: 'Massage +', precio: 110, dur: '1 h 30 min', foto: 'nv-massage.webp', pos: '50% 50%',
      lema: 'Su masaje, potenciado.',
      pasos: ['Masaje a elegir', 'Una terapia más, a elegir'],
      url: 'https://momence.com/REVO-Studios/product/Massage-Experience/498613' }
  ],
  BOTON_REGALAR: 'Regalar',
  VER_REGALO: 'Ver cómo lo recibe',

  /* ---- «Encuentra su regalo» · tercera versión (21-nov-2026) ----
     Eric: «sigue siendo muy sencillo; ha de ser una experiencia el responder». Pensado desde cero:
     · Se abre a pantalla completa, una pantalla por paso, con foto y transiciones lentas (como una historia).
     · Lo primero es su nombre: desde ahí todo habla de esa persona («Un día cualquiera, Carmen…»).
     · Pasos: su nombre (y quién es para ti) → su día a día (fotos) → la sensación que le regalarías → cómo se lo das
       → «Preparando el regalo de Carmen» → la tarjeta se descubre → por qué, su sesión, dedicatoria y «Regalar».
     · Decide la sensación; el día a día da la segunda opción (para la tercera de regalo); el «cómo» rellena el
       formato en la ventana «Regalar». Sin datos de salud. El nombre y la dedicatoria NO salen del navegador.
     · {nombre} = lo que escriba la persona; sin nombre, se usa la versión `sin` de cada frase.
     · Se abre directo con /navidad#test (anuncios «con test»). */
  TEST: {
    // el bloque en la página
    rotulo: '¿No sabes cuál?',
    titulo: 'Encuentra *su regalo*.',
    entrada: 'Piensa en esa persona y contesta cuatro cosas. Te decimos qué experiencia le va a sentar bien, por qué, y te dejamos su tarjeta preparada.',
    empezar: 'Empezar',
    duracion: 'Unos 30 segundos',
    foto: 'gift-bag.webp',
    // dentro
    cerrar: 'Cerrar', atras: 'Atrás', seguir: 'Continuar',
    intro: { foto: 'navidad-calma.webp', ojo: 'Encuentra su regalo', titulo: 'Piensa en *esa persona*.', texto: 'Cuatro preguntas sobre quien lo recibe. Al final te decimos qué le va a sentar bien y te dejamos su tarjeta lista.', boton: 'Empezar' },
    nombre: {
      ojo: '01 · Quién es', titulo: '¿Cómo se llama?', placeholder: 'Su nombre', ayuda: 'Lo ponemos en su tarjeta. Solo lo ves tú.',
      relacion: 'Y para ti es…',
      relaciones: [ { t: 'mi pareja' }, { t: 'mi madre' }, { t: 'mi padre' }, { t: 'una amiga' }, { t: 'un amigo' }, { t: 'familia' }, { t: 'del trabajo', formal: true } ],
      sinNombre: 'Prefiero no ponerlo'
    },
    dia: {
      ojo: '02 · Su día a día', titulo: 'Un día cualquiera, *{nombre}*…', sin: 'Un día cualquiera, esa persona…',
      opciones: [
        { t: 'va a mil y le cuesta parar', foto: 'nv-cognitiva.webp', pos: '50% 30%', da: 'cognitiva', porque: 'va a mil y le cuesta parar' },
        { t: 'entrena o hace deporte', foto: 'navidad-entrena.webp', pos: '50% 25%', da: 'sports', porque: 'entrena y le pide mucho al cuerpo' },
        { t: 'cuida de todos, menos de sí', foto: 'nv-longevity.webp', pos: '50% 35%', da: 'massage_plus', porque: 'cuida de todos, menos de sí' },
        { t: 'lo mide todo: reloj, analíticas, suplementos', foto: 'nv-mide.webp', pos: '50% 50%', da: 'longevity', porque: 'se cuida y le gusta medirlo todo' },
        { t: 'disfruta cuidándose, también por fuera', foto: 'nv-glow.webp', pos: '50% 30%', da: 'glow', porque: 'disfruta cuidándose, también por fuera' },
        { t: 'duerme menos de lo que querría', foto: 'nv-sleep.webp', pos: '40% 45%', da: 'sleep_stress', porque: 'duerme menos de lo que querría' }
      ]
    },
    deseo: {
      ojo: '03 · Lo que le regalarías', titulo: 'Si pudieras regalarle a *{nombre}* una sensación…', sin: 'Si pudieras regalarle una sensación…',
      opciones: [
        { t: 'Energía', d: 'levantarse con ganas y llegar a la noche con fuerzas', da: 'longevity' },
        { t: 'Descanso', d: 'dormir del tirón y despertar con la sensación de haber descansado', da: 'sleep_stress' },
        { t: 'Claridad', d: 'la cabeza en calma y el foco de vuelta', da: 'cognitiva' },
        { t: 'Fuerza', d: 'un cuerpo que rinde y se recupera antes', da: 'sports' },
        { t: 'Luz', d: 'verse bien y notarlo en la piel', da: 'glow' },
        { t: 'Cuidado', d: 'un rato en el que solo tiene que dejarse cuidar', da: 'massage_plus' }
      ]
    },
    como: {
      ojo: '04 · Cómo se lo das', titulo: '¿Cómo quieres dárselo?',
      opciones: [
        { t: 'En sus manos', d: 'Una tarjeta física que recoges en el estudio, en Turó Park.', formato: 'impreso' },
        { t: 'Al momento', d: 'Le llega por WhatsApp o por correo, cuando tú quieras.', formato: 'digital' }
      ]
    },
    preparando: { titulo: 'Preparando el regalo de *{nombre}*…', sin: 'Preparando su regalo…', lineas: ['Su día a día', 'Lo que le regalarías', 'Cómo se lo das'] },
    // el resultado
    res: {
      ojo: 'Su regalo',
      unRegaloPara: 'Un regalo para',
      sinNombre: 'ti',
      porQue: 'Por qué a *{nombre}*', porQueSin: 'Por qué le encaja',
      // «Carmen va a mil y le cuesta parar. Le regalarías descanso: …»
      frase: '{Nombre} {porque}. Le regalarías {sensacion}: {motivo}',
      fraseSin: 'Esa persona {porque}. Le regalarías {sensacion}: {motivo}',
      sesion: 'Su sesión',
      dedicatoria: 'Tu dedicatoria', dedicatoriaAyuda: 'Te proponemos una. Cámbiala como quieras.',
      boton: 'Regalar a {nombre}', botonSin: 'Regalar {exp}',
      formatoImpreso: 'Tarjeta física · la recoges en el estudio',
      formatoDigital: 'Al momento · por WhatsApp o correo',
      otra: 'Para completar el regalo',
      oferta: 'Si regalas dos experiencias, te regalamos una tercera, para ti o para quien quieras.',
      otraBoton: 'Regalar también {exp}',
      compartir: '¿Lo regaláis entre varios?', compartirBoton: 'Compártelo por WhatsApp',
      compartirSin: 'esta persona',
      compartirTexto: 'He pensado en regalarle a {nombre} la experiencia {exp} de REVO ({precio} €). ¿Te sumas? https://www.revostudios.eu/navidad#exp-{id}',
      deNuevo: 'Empezar de nuevo', verTodas: 'Ver todas las experiencias'
    }
  },
  // Para cada experiencia, lo que se cuenta en el resultado. Cifras: solo las de revo-tono (datos.md).
  REGALO: {
    glow: {
      sensacion: 'luz',
      titular: 'Su piel, con luz. Su cuerpo, más ligero.',
      motivo: 'Glow encadena cuatro terapias que desinflaman, drenan y trabajan la piel desde dentro.',
      dedicatoria: 'Para que se te vea la luz que tienes.',
      pasos: [
        ['Campos electromagnéticos', 'Activan el modo de descanso y reparación, y dejan las células más receptivas a lo que viene después.'],
        ['Máscara de luz roja', 'Luz roja e infrarroja en la cara. Estimula el colágeno y la elastina.'],
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C. Desinflama y activa la microcirculación, que potencia el masaje.'],
        ['Masaje drenante y moldeador', 'Con manos y aparatología. Reduce la retención de líquidos y define la silueta: se sale con sensación de ligereza.']
      ],
      otra: 'massage_plus' },
    sports: {
      sensacion: 'fuerza',
      titular: 'Para que su cuerpo se recupere antes y rinda mejor.',
      motivo: 'Sports Performance es el circuito de quien entrena en serio. Oxigena, desinflama y descarga la fatiga del músculo.',
      dedicatoria: 'Para que tu cuerpo rinda y se recupere como se merece.',
      pasos: [
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C. Baja la inflamación y alivia el dolor.'],
        ['Presoterapia', 'Botas de compresión de los pies a la cadera. Drenan y mejoran la circulación: se sale con las piernas ligeras.']
      ],
      otra: 'longevity' },
    sleep_stress: {
      sensacion: 'descanso',
      titular: 'Una hora para que su cuerpo baje el ritmo.',
      motivo: 'Sleep & Stress regula el sistema nervioso y prepara el cuerpo para dormir.',
      dedicatoria: 'Para que este invierno descanses de verdad.',
      pasos: [
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C. Baja el cortisol y deja un estado de calma y buen humor.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs de luz roja e infrarroja. Ayuda a regular el ritmo del sueño.'],
        ['Campos electromagnéticos', 'Activan el modo de descanso y reparación del cuerpo.'],
        ['Neuroestimulación', 'Sonido binaural y luz que llevan al cerebro a la relajación profunda.']
      ],
      otra: 'massage_plus' },
    longevity: {
      sensacion: 'energía',
      titular: 'La más completa: energía para el cuerpo y la cabeza.',
      motivo: 'Longevity repara, oxigena y activa cuerpo y cabeza a la vez.',
      dedicatoria: 'Para que te sobre energía todo el año.',
      pasos: [
        ['Campos electromagnéticos', 'Activan el modo de descanso y reparación, y dejan las células más receptivas a lo que viene después.'],
        ['Neuroestimulación', 'Sonido binaural y luz que llevan al cerebro a la relajación profunda o al foco.'],
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs. Activa la mitocondria, la central de energía de cada célula.']
      ],
      otra: 'cognitiva' },
    cognitiva: {
      sensacion: 'claridad',
      titular: 'Oxígeno, luz y sonido para pensar con claridad.',
      motivo: 'Performance Cognitiva está pensada para una mente más nítida, estable y en calma.',
      dedicatoria: 'Para que la cabeza encuentre su calma y su foco.',
      pasos: [
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs de luz roja e infrarroja. Activa la mitocondria.'],
        ['Neuroestimulación', 'Sonido binaural y luz que llevan al cerebro al foco.']
      ],
      otra: 'sleep_stress' },
    massage_plus: {
      sensacion: 'cuidado',
      titular: 'Una hora y media en la que solo tiene que dejarse cuidar.',
      motivo: 'Massage + es un masaje a su medida, potenciado con una terapia más.',
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
    impreso: { t: 'Impreso', d: 'Una tarjeta física que recoges en el estudio, en Turó Park, para darla en mano.', foto: 'nv-estudio.webp', boton: 'Cómo llegar' },
    // la página real de la Platform (ejemplo con la experiencia que se elija)
    demo: '/regalo/demo?e=',
    // el móvil de ejemplo (imita la página del regalo de la Platform)
    movil: { ojo: 'Un regalo para ti', nombre: 'Para *Ana*', ded: 'Para que este año descanses de verdad.', boton: 'Reservar mi sesión' }
  },

  /* ---- sorteo (solo canales que lo tienen) ---- */
  SORTEO: {
    rotulo: 'Sorteo',
    titulo: 'Sorteamos una experiencia entre los miembros de *{nombre}*.',
    // canales que no son un centro: su propia frase
    titulo_canal: { vecinos: 'Sorteamos una experiencia entre los vecinos de *Turó Park*.', socios: 'Sorteamos una experiencia entre los miembros de *REVO*.' },
    entrada: 'Déjanos tu nombre y tu correo. Te escribimos solo si te toca.',
    premio: 'Una experiencia a elegir entre las seis, para disfrutar hasta el 31 de marzo de 2027. Puedes apuntarte hasta el {hasta}; el sorteo es el {dia}.',
    abre: 'Las inscripciones abren el {desde}.',
    // plazo (Eric puede cambiarlo hasta el 25-nov). Si la Platform manda sorteo_desde / sorteo_hasta / sorteo_dia, mandan esas.
    DESDE: '2026-11-26', HASTA: '2026-12-18', DIA: '2026-12-19',
    acepto: 'Al apuntarte aceptas las {bases} y nuestra {privacidad}.', privacidad: 'política de privacidad',
    enlaceBases: '/navidad-bases', enlacePrivacidad: '/privacidad.html',
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
    ['¿Cuánto tiempo tiene para usarla?', 'Seis meses desde la compra.'],
    ['¿Cómo reserva su sesión?', 'Por WhatsApp o por teléfono, cuando le vaya bien. Le ayudamos a encontrar el día.'],
    ['¿Cuándo llega el regalo?', 'Al momento. Al pagar te llevamos a la página de su regalo para que se la envíes tú.'],
    ['¿Puedo darlo en mano?', 'Sí. Elige «Impreso» al regalar y recoge la tarjeta en el estudio, en Turó Park.']
  ],

  /* ---- pie ---- */
  PIE: { dir: 'REVO Studios · Carrer de Ferran Agulló, 24 · Turó Park, Barcelona', legal: [['Aviso legal', '/aviso-legal.html'], ['Privacidad', '/privacidad.html'], ['Cookies', '/cookies.html']] },

  /* ---- cierre ---- */
  CIERRE: { titulo: '¿Prefieres que te ayudemos a elegir?', boton: 'Escríbenos por WhatsApp', wa: 'Hola, quiero regalar una experiencia de REVO por Navidad. ¿Me ayudáis a elegir?' }
};
