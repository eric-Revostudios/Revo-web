/* Campaña de Navidad 2026 (/navidad) · TODO el texto de la página está aquí.
   Cambiar una frase = cambiarla aquí y en ningún otro sitio. Los textos son PROVISIONALES: los definitivos los
   escribe el equipo (María) y se pegan encima. Reglas: las de la skill revo-tono (de tú, sin exclamaciones, sin prometer
   resultados) y la lista de palabras de María (23-nov-2026): sin «regalamos», «gratis», «sorteamos», «sorteo», «gana»,
   «premio», «descuento», «oferta», «promo», «3×2», «2+1», «la tercera» ni «salud» en lo que se ve.
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
  CANALES: ['studio', 'socios', 'vecinos', 'instagram', 'ads', 'exmiembros', 'leads', 'partners', 'conserjes', 'web', 'goodfit', 'barrys', 'corehaus', 'casabarre', 'yogaone'],
  // «estudio» (María) = «studio» (QR ya impresos); «conserjes» lo crea la Platform; «web» es la propia web
  ALIAS_CANAL: { estudio: 'studio' },
  // los centros asociados: con su canal, la cabecera dice «Para la comunidad de {nombre}»
  PARTNERS: ['goodfit', 'barrys', 'corehaus', 'casabarre', 'yogaone'],
  // Solo para la maqueta: si la Platform no contesta, con ?sorteo=1 se ve el bloque del sorteo para revisarlo.
  NOMBRES_PROVISIONALES: { goodfit: 'GoodFit', barrys: "Barry's Barcelona", corehaus: 'Corehaus', casabarre: 'Casa Barré', yogaone: 'YogaOne Aragó-Eixample', vecinos: 'Turó Park' },   // los mismos que la Platform (20-nov)

  /* ---- cabecera ---- */
  CABECERA: {
    rotulo: 'Navidad en REVO',
    titulo: '¿Qué le regalas a quien *lo tiene todo*?',
    entrada: 'Un rato para cuidarse. Seis experiencias en REVO, el club de longevidad de Turó Park.',
    boton: 'Elegir una experiencia',
    test: '¿No sabes cuál? Encuentra su regalo',
    // con canal de partner: se añade debajo del titular. {nombre} = nombre del partner
    partner: 'Para la comunidad de {nombre}.'
  },

  /* ---- la oferta «dos y una de regalo»: la MANDA LA PLATFORM (20-nov-2026) ----
     GET /api/campana/canal (con o sin ?c=) trae `oferta: { activa, modo: 'elegir' | 'lista', experiencias: [ids],
     valido_desde, valido_hasta }` y `campana: { desde, hasta }`. La oferta solo se ve si `oferta.activa` es true;
     si es false, si no viene el campo o si la Platform no contesta, no sale NI UNA palabra (ni la franja, ni la línea
     del resultado del test, ni la pregunta frecuente, ni su frase en la de la validez). Se enciende y se apaga desde la Platform (Regalos → Canales).
     Para revisarla sin encenderla: ?oferta=elegir o ?oferta=lista (solo en este navegador, no cambia nada para nadie).
     {cuando} = «de enero a marzo de 2027», sacado de valido_desde / valido_hasta; {exp} = la experiencia o
     experiencias de la lista. Nunca «3×2», «2+1», «oferta» ni «descuento». */
  // Frases de María (25-nov-2026): «hay una más de nuestra parte». «Cortesía de la casa» es solo el nombre del interruptor
  // y del vale en la Platform: no va de titular aquí. {para} = «para ti o para quien quieras» y, con el canal `socios`
  // (miembros), «para alguien a quien quieras». {hasta}: la fecha de la campaña que manda la Platform.
  // Cómo llega de verdad (Platform, docs/regalos.md): cuentan las compras pagadas de la misma persona (mismo email) y la
  // elige ella en su página, a la que llega al pagar. Nadie se la manda: no escribir «te llega sola».
  // Palabras que no van en ningún texto visible: regalamos, gratis, sorteamos, sorteo, gana, premio, descuento, oferta,
  // promo, 3×2, 2+1, la tercera, salud.
  OFERTA: {
    franja: 'Si regalas dos, hay una más de nuestra parte. *Hasta el {hasta}.*',
    hastaDefecto: '5 de enero',
    para: 'para ti o para quien quieras',
    paraSocios: 'para alguien a quien quieras',
    cuandoDefecto: 'de enero a marzo de 2027',
    cuando: 'de {mesDesde} a {mesHasta} de {anio}',
    o: ' o ',
    duda: '¿Cómo funciona la experiencia de más?',
    // respuesta en párrafos cortos; al final, el enlace de WhatsApp para quien usó otro email
    dudaElegir: [
      'Regala dos experiencias hasta el {hasta} y usa el mismo email en las dos: así sabemos que son tuyas. Cuenta también la que compres para ti.',
      'Al pagar la segunda llegas a la página de tu regalo, y ahí aparece la de más. Tú eliges cuál, de un valor igual o menor que la más económica de las dos, y a quién se la das.',
      'Se disfruta {cuando}. Si en una compra pusiste otro email, escríbenos y lo resolvemos.'
    ],
    dudaLista: [
      'Regala dos experiencias hasta el {hasta} y usa el mismo email en las dos: así sabemos que son tuyas. Cuenta también la que compres para ti.',
      'Al pagar la segunda llegas a la página de tu regalo, y ahí aparece la de más. Es {exp} o, si cuesta más que la más económica de las dos, otra de un valor igual o menor. Tú eliges a quién se la das.',
      'Se disfruta {cuando}. Si en una compra pusiste otro email, escríbenos y lo resolvemos.'
    ],
    dudaBoton: 'Escríbenos por WhatsApp',
    dudaWa: 'Hola, he regalado dos experiencias con emails distintos y quería que contaran juntas. ¿Me ayudáis?',
    // el bloque grande, después de las seis experiencias. {Para} = «Para ti o para quien quieras» (socios: su frase)
    bloque: {
      titulo: 'Si regalas dos, hay una más *de nuestra parte*.',
      pasosElegir: [
        ['Regala dos experiencias', 'El mismo día o en días distintos, hasta el {hasta}. Usa el mismo email en las dos.'],
        ['Verás que hay una más', 'Al pagar la segunda te llevamos a la página de tu regalo. Aparece ahí.'],
        ['Elige cuál y para quién', '{Para}. De un valor igual o menor que la más económica de las dos. Se disfruta {cuando}.']
      ],
      pasosLista: [
        ['Regala dos experiencias', 'El mismo día o en días distintos, hasta el {hasta}. Usa el mismo email en las dos.'],
        ['Verás que hay una más', 'Al pagar la segunda te llevamos a la página de tu regalo. Aparece ahí.'],
        ['Elige para quién', '{Para}. Es {exp} o, si cuesta más que la más económica de las dos, otra de un valor igual o menor. Se disfruta {cuando}.']
      ],
      boton: 'Elegir las experiencias'
    },
    // se añade a la respuesta de «¿Cuánto tiempo tiene para usarla?»
    validez: 'La experiencia de más se disfruta {cuando}.',
    test: 'Por cada dos experiencias que regales, hay una más de nuestra parte, {para}.'
  },
  MESES: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  FECHA: '{dia} de {mes}',

  /* ---- qué es REVO (frases de María, recortadas el 25-nov-2026 por la noche). Cambiarlo aquí y en ningún otro sitio.
     *texto* → cursiva de la casa. ---- */
  QUE_ES: {
    rotulo: 'Qué es REVO',
    titulo: 'REVO es un club de longevidad en Turó Park.',
    texto: 'Quien viene no busca un spa ni un gimnasio: busca encontrarse bien hoy y seguir haciéndolo *dentro de veinte años*.'
  },

  /* ---- las seis experiencias ----
     Precio, enlace de Momence y textos: los mismos que experiencias.html (20-nov-2026). Si cambian allí, aquí también.
     `id` es el que usa la página del regalo de la Platform (/regalo/demo?e=…). */
  EXPERIENCIAS_TITULO: 'Seis respuestas para *quien lo tiene todo*.',
  EXPERIENCIAS_ENTRADA: 'Varias terapias en una sola visita, encadenadas por nuestro equipo médico para un objetivo.',
  EXPERIENCIAS: [
    { id: 'glow', nombre: 'Glow', precio: 140, dur: '1 h 50 min', foto: 'nv-glow.webp', pos: '50% 30%',
      todo: 'Lo tiene todo, menos un rato para sí.',
      lema: 'Para cuidarse por dentro y por fuera.',
      pasos: ['Campo electromagnético', 'Máscara de luz roja', 'Crioterapia de cuerpo entero', 'Masaje drenante y moldeador'],
      url: 'https://momence.com/REVO-Studios/product/Glow-Experience/498606' },
    { id: 'sports', nombre: 'Sports Performance', precio: 140, dur: '1 h 30 min', foto: 'nv-sports.webp', pos: '50% 40%',
      todo: 'Lo tiene todo, menos descanso entre entreno y entreno.',
      lema: 'Oxígeno, frío y compresión, para quien entrena.',
      pasos: ['Cámara hiperbárica', 'Crioterapia de cuerpo entero', 'Presoterapia'],
      url: 'https://momence.com/REVO-Studios/product/Sports-Performance-Experience/498608' },
    { id: 'sleep_stress', nombre: 'Sleep & Stress', precio: 140, dur: '1 h', foto: 'nv-sleep.webp', pos: '40% 45%',
      todo: 'Lo tiene todo, menos tiempo para parar.',
      lema: 'Baja el ritmo. Desconecta.',
      pasos: ['Crioterapia de cuerpo entero', 'Cama de luz roja', 'Campo electromagnético', 'Neuroestimulación'],
      url: 'https://momence.com/REVO-Studios/product/Sleep-and-Stress-Experience/498614' },
    { id: 'longevity', nombre: 'Longevity', precio: 160, dur: '1 h 50 min', foto: 'nv-longevity.webp', pos: '50% 35%',
      todo: 'Lo tiene todo, y quiere seguir teniéndolo dentro de veinte años.',
      lema: 'La más completa, para el cuerpo y la cabeza.',
      pasos: ['Campo electromagnético', 'Neuroestimulación', 'Cámara hiperbárica', 'Cama de luz roja'],
      url: 'https://momence.com/REVO-Studios/product/Longevity-Experience/498612' },
    { id: 'cognitiva', nombre: 'Performance Cognitiva', precio: 140, dur: '1 h 40 min', foto: 'nv-cognitiva.webp', pos: '50% 35%',
      todo: 'Lo tiene todo, menos la cabeza en silencio.',
      lema: 'Oxígeno, luz y sonido, pensados para la cabeza.',
      pasos: ['Cámara hiperbárica', 'Cama de luz roja', 'Neuroestimulación'],
      url: 'https://momence.com/REVO-Studios/product/Performance-Cognitiva-Experience/498616' },
    { id: 'massage_plus', nombre: 'Massage +', precio: 110, dur: '1 h 30 min', foto: 'nv-massage.webp', pos: '50% 50%',
      todo: 'Lo tiene todo, menos ese masaje que siempre aplaza.',
      lema: 'Su masaje, potenciado.',
      pasos: ['Masaje a elegir', 'Una terapia más, a elegir'],
      url: 'https://momence.com/REVO-Studios/product/Massage-Experience/498613' }
  ],
  BOTON_REGALAR: 'Regalar',
  VER_REGALO: 'Ver cómo lo recibe',

  /* ---- «Encuentra su regalo» · tercera versión (20-nov-2026) ----
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
    entrada: 'Piensa en esa persona que lo tiene todo y contesta cuatro cosas. Te decimos qué experiencia encaja con esa persona, por qué, y te enseñamos cómo lo recibe.',
    empezar: 'Empezar',
    duracion: 'Unos 30 segundos',
    foto: 'gift-bag.webp',
    // dentro
    cerrar: 'Cerrar', atras: 'Atrás', seguir: 'Continuar',
    intro: { foto: 'navidad-calma.webp', ojo: 'Encuentra su regalo', titulo: 'Piensa en esa persona *que lo tiene todo*.', texto: 'Cuatro preguntas sobre quien lo recibe. Al final te decimos qué experiencia encaja con esa persona y te enseñamos cómo lo recibe.', boton: 'Empezar' },
    nombre: {
      ojo: '01 · Quién es', titulo: '¿Cómo se llama?', placeholder: 'Su nombre', ayuda: 'Lo ponemos en su tarjeta. Solo lo ves tú.',
      relacion: 'Y para ti es…',
      relaciones: [ { t: 'mi pareja' }, { t: 'mi madre' }, { t: 'mi padre' }, { t: 'una amiga' }, { t: 'un amigo' }, { t: 'familia' }, { t: 'del trabajo', formal: true } ],
      sinNombre: 'Prefiero no ponerlo'
    },
    dia: {
      ojo: '02 · Su día a día', ayuda: 'Elige todas las que encajen.', y: ' y ', titulo: 'Un día cualquiera, *{nombre}*…', sin: 'Un día cualquiera, esa persona…',
      opciones: [
        { t: 'va a mil y le cuesta parar', foto: 'nv-cognitiva.webp', pos: '50% 30%', da: 'cognitiva', porque: 'va a mil y le cuesta parar' },
        { t: 'entrena o hace deporte', foto: 'navidad-entrena.webp', pos: '50% 25%', da: 'sports', porque: 'entrena y le pide mucho al cuerpo' },
        { t: 'cuida de todos, menos de sí', foto: 'nv-longevity.webp', pos: '50% 35%', da: 'massage_plus', porque: 'cuida de todos, menos de sí' },
        { t: 'lo mide todo: reloj, analíticas, suplementos', foto: 'nv-mide.webp', pos: '50% 50%', da: 'longevity', porque: 'se cuida y le gusta medirlo todo' },
        { t: 'disfruta cuidándose, también por fuera', foto: 'nv-glow.webp', pos: '50% 30%', da: 'glow', porque: 'disfruta cuidándose, también por fuera' },
        { t: 'no desconecta cuando acaba el día', foto: 'nv-sleep.webp', pos: '40% 45%', da: 'sleep_stress', porque: 'no desconecta cuando acaba el día' }
      ]
    },
    deseo: {
      ojo: '03 · Lo que le regalarías', titulo: 'Si pudieras regalarle a *{nombre}* una sensación…', sin: 'Si pudieras regalarle una sensación…',
      opciones: [
        { t: 'Energía', d: 'un rato para recargar', da: 'longevity' },
        { t: 'Calma', d: 'parar, bajar el ritmo y desconectar', da: 'sleep_stress' },
        { t: 'Claridad', d: 'un rato para ordenar la cabeza', da: 'cognitiva' },
        { t: 'Fuerza', d: 'cuidar el cuerpo con el que entrena', da: 'sports' },
        { t: 'Luz', d: 'cuidarse por dentro y por fuera', da: 'glow' },
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
      recibe: 'Así lo recibirá',
      recibeNota: 'Es la página real que le llega, con un ejemplo. La suya llevará su nombre y tu dedicatoria.',
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
      titular: 'Casi dos horas para cuidarse por dentro y por fuera.',
      motivo: 'Glow encadena cuatro terapias, con luz roja para la piel y un masaje drenante y moldeador.',
      dedicatoria: 'Para que se te vea la luz que tienes.',
      pasos: [
        ['Campos electromagnéticos', 'Dejan las células más receptivas a los estímulos que vienen después: por eso abren el circuito.'],
        ['Máscara de luz roja', 'Luz roja e infrarroja en la cara. Estimula el colágeno y la elastina.'],
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C. Activa la microcirculación, y por eso va justo antes del masaje.'],
        ['Masaje drenante y moldeador', 'Intenso, con manos y aparatología. Se sale con sensación de ligereza.']
      ],
      otra: 'massage_plus' },
    sports: {
      sensacion: 'fuerza',
      titular: 'El circuito de quienes entrenan en serio.',
      motivo: 'Sports Performance encadena oxígeno, frío y compresión en una hora y media.',
      dedicatoria: 'Para ti, que entrenas en serio.',
      pasos: [
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C: un estímulo breve al que el cuerpo responde con fuerza.'],
        ['Presoterapia', 'Botas de compresión por aire, de los pies a la cadera. Se sale con las piernas ligeras.']
      ],
      otra: 'longevity' },
    sleep_stress: {
      sensacion: 'calma',
      titular: 'Una hora para bajar el ritmo.',
      motivo: 'Sleep & Stress es una hora para parar y desconectar, con frío, luz, campos electromagnéticos y sonido.',
      dedicatoria: 'Una hora para parar. Sin teléfono y sin prisa.',
      pasos: [
        ['Crioterapia de cuerpo entero', 'De 2 a 3 minutos a −130 °C: un estímulo breve al que el cuerpo responde con fuerza.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs de luz roja e infrarroja, sin nada que hacer.'],
        ['Campos electromagnéticos', 'La magnetoterapia de los fisioterapeutas, en todo el cuerpo.'],
        ['Neuroestimulación', 'Sonido binaural y luz: un rato para dejar la cabeza quieta.']
      ],
      otra: 'massage_plus' },
    longevity: {
      sensacion: 'energía',
      titular: 'La más completa, para el cuerpo y la cabeza.',
      motivo: 'Longevity reúne campos electromagnéticos, sonido, oxígeno y luz en casi dos horas.',
      dedicatoria: 'Un rato para recargar, antes de empezar otro año.',
      pasos: [
        ['Campos electromagnéticos', 'Dejan las células más receptivas a los estímulos que vienen después: por eso abren el circuito.'],
        ['Neuroestimulación', 'Sonido binaural y luz: un rato para dejar la cabeza quieta.'],
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs. Activa la mitocondria, la central de energía de cada célula.']
      ],
      otra: 'cognitiva' },
    cognitiva: {
      sensacion: 'claridad',
      titular: 'Un rato para la cabeza.',
      motivo: 'Performance Cognitiva junta oxígeno, luz y sonido, pensados para la cabeza.',
      dedicatoria: 'Un rato para ti y para tu cabeza.',
      pasos: [
        ['Cámara hiperbárica', 'Oxígeno al 98 % a 1,5 atmósferas: hasta diez veces más oxígeno en los tejidos.'],
        ['Cama de luz roja', '10 minutos bajo 43.000 LEDs de luz roja e infrarroja. Activa la mitocondria.'],
        ['Neuroestimulación', 'Sonido binaural y luz, en el modo de foco.']
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
    // La foto de la impresa se cambia sustituyendo material-navidad/tarjeta-impresa.webp (vertical 4:5, 1080 × 1350): esa
    // carpeta no se guarda en caché. Hoy es la sala donde se recoge. Al poner la tarjeta, escribir su `alt`.
    digital: { t: 'Digital', d: 'Al pagar te llevamos a la página de su regalo, con su nombre y tu dedicatoria. Se la envías tú, por WhatsApp o por correo.', foto: 'nv-tarjeta-digital.webp', alt: 'La tarjeta digital: «Tienes un regalo», con la experiencia y tu dedicatoria.', boton: 'Ver un ejemplo' },
    impreso: { t: 'Impreso', d: 'Una tarjeta física que recoges en el estudio, en Turó Park, para darla en mano.', foto: '/material-navidad/tarjeta-impresa.webp', alt: '', boton: 'Cómo llegar' },
    // la página real de la Platform (ejemplo con la experiencia que se elija)
    demo: 'https://www.revostudios.eu/regalo/demo?e='
  },

  /* ---- sorteo (solo canales que lo tienen) ---- */
  // Fórmulas aprobadas por María (23-nov-2026): no se dice «sorteo», «premio» ni «gana» (en las bases sí).
  SORTEO: {
    rotulo: 'Para apuntarse',
    titulo: 'Este diciembre, una experiencia REVO espera a alguien de *{nombre}*.',
    // canales que no son un centro: su propia frase
    titulo_canal: { vecinos: 'Esta Navidad, una experiencia REVO es para un vecino o vecina de *Turó Park*.', socios: 'Este diciembre, una experiencia REVO espera a alguien de *REVO*.' },
    entrada: 'Déjanos tu nombre y tu correo. Te escribimos solo si es para ti.',
    premio: 'Quien resulte elegido elige una de las seis experiencias, para disfrutar hasta el 31 de marzo de 2027. Puedes apuntarte hasta el {hasta}; se elige el {dia}.',
    legal: 'Sin compra necesaria. Mayores de 18 años. Bases en revostudios.eu/navidad-bases.',
    abre: 'Las inscripciones abren el {desde}.',
    // plazo (Eric puede cambiarlo hasta el 25-nov). Si la Platform manda sorteo.desde / hasta / abierto, manda ella.
    DESDE: '2026-11-26', HASTA: '2026-12-18', DIA: '2026-12-19',
    acepto: 'Al apuntarte aceptas las {bases} y nuestra {privacidad}.', privacidad: 'política de privacidad',
    enlaceBases: '/navidad-bases', enlacePrivacidad: '/privacidad.html',
    nombre: 'Nombre', email: 'Email', telefono: 'Teléfono', opcional: 'opcional',
    novedades: 'Quiero recibir novedades de REVO. Puedes darte de baja cuando quieras.',
    boton: 'Apuntarme',
    hecho: 'Ya estás dentro. Te escribimos si es para ti.',
    error: 'No hemos podido apuntarte. Inténtalo de nuevo en un momento.',
    errores: {
      datos: 'Revisa el nombre y el email: alguno no está bien escrito.',
      canal: 'Las inscripciones ya no están abiertas.',
      fechas: 'Las inscripciones ya se han cerrado. Gracias por tu interés.',
      demasiados: 'Demasiados intentos seguidos. Prueba de nuevo dentro de un rato.'
    },
    bases: 'bases'
  },

  /* ---- preguntas frecuentes (solo lo que ya dice la web o la página del regalo) ---- */
  DUDAS_TITULO: 'Antes de *regalar*',
  DUDAS: [
    ['¿Cuánto tiempo tiene para usarla?', 'Un año desde la compra.'],
    ['¿Cómo reserva su sesión?', 'Por WhatsApp o por teléfono, cuando le vaya bien. Le ayudamos a encontrar el día.'],
    ['¿Cuándo llega el regalo?', 'Al momento. Al pagar te llevamos a la página de su regalo para que se la envíes tú.'],
    ['¿Puedo darlo en mano?', 'Sí. Elige «Impreso» al regalar y recoge la tarjeta en el estudio, en Turó Park.']
  ],

  /* ---- pie ---- */
  PIE: { dir: 'REVO Studios · Carrer de Ferran Agulló, 24 · Turó Park, Barcelona', legal: [['Aviso legal', '/aviso-legal.html'], ['Privacidad', '/privacidad.html'], ['Cookies', '/cookies.html']] },

  /* ---- cierre ---- */
  CIERRE: { titulo: '¿Prefieres que te ayudemos a elegir?', boton: 'Escríbenos por WhatsApp', wa: 'Hola, quiero regalar una experiencia de REVO por Navidad. ¿Me ayudáis a elegir?' }
};
