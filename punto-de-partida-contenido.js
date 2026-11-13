/* Contenido de la landing «Tu punto de partida» (/punto-de-partida).
   La página a la que llevan los anuncios de Instagram (nov-2026). Aquí vive TODO el texto:
   cambiar una frase se hace en este fichero y no obliga a tocar punto-de-partida.js ni el HTML.
   Textos dictados por Eric el 13-nov-2026, literales. No se inventa ninguna cifra ni promesa.

   Lo que está PENDIENTE (lo que Eric marcó [entre corchetes]) vale null y NO se pinta:
   cuando llegue el dato, se escribe aquí y aparece solo.

   Las fichas de terapia (foto, nombre, dato y efecto) NO están aquí: se leen de
   tu-caso-contenido.js (window.TU_CASO.TERAPIAS), para que las dos landings digan lo mismo. */

window.PUNTO_PARTIDA = {

  /* Duración del punto de partida, en minutos. Si pasa a 45, se cambia solo este número. */
  MINUTOS: 60,

  /* Texto de TODOS los botones que abren Momence. El enlace está en la cabecera del HTML. */
  CTA: 'Elegir día y hora',

  /* WhatsApp del equipo, con el mensaje ya escrito. */
  WHATSAPP: 'https://wa.me/34613505881',
  WHATSAPP_TEXTO: 'Hola, quiero reservar mi punto de partida en REVO.',

  /* «Cómo llegar»: el mismo enlace a Google Maps que usa el resto de la web. */
  MAPA: 'https://www.google.com/maps/search/?api=1&query=Carrer%20de%20Ferran%20Agull%C3%B3%2024%2C%2008021%20Barcelona',

  /* 1 · Cabecera. <em> = cursiva de marca, mismas palabras. */
  CABECERA: {
    antetitulo: 'REVO Studios · Turó Park, Barcelona',
    titular: 'Te invitamos a tu <em>punto de partida</em>',
    subtitulo: 'Conoce REVO, descubre si es para ti, mide tu punto de partida y sal con un plan. {min} minutos, sin compromiso.',
    waPregunta: '¿Prefieres preguntarnos antes?',
    waEnlace: 'Escríbenos por WhatsApp',
    nota: 'Por invitación · Sin compromiso',
  },

  /* Subtítulo según el anuncio: si utm_content contiene «icp1», «icp2»… (da igual mayúsculas)
     sale el suyo en lugar del general. Para un anuncio nuevo, se añade aquí «icp7» y listo. */
  SUBTITULOS: {
    icp1: 'Para seguir haciendo planes con energía. Medimos cómo estás, revisamos contigo tu descanso y tu energía, y sales con un plan.',
    icp2: 'Para que la cabeza también termine la jornada. Medimos tu índice de estrés y tu composición corporal, te explicamos qué indican y sales con un plan que cabe en tu semana.',
    icp3: 'Para volver a lo que te gusta hacer. Revisamos contigo qué te limita, medimos cómo estás y sales sabiendo qué puede aportarte REVO.',
    icp4: 'Para que la recuperación también se entrene. Medimos tu composición corporal y vemos contigo cómo encaja la recuperación en tus entrenos.',
    icp5: 'Para saber desde dónde empiezas. Medimos cómo estás hoy, revisamos contigo tus hábitos y sales con un plan para cuidarlo.',
    icp6: 'Para conocer REVO por dentro. Recorres el estudio, medimos cómo estás y diseñamos contigo tu plan.',
  },

  /* 2 · Las dos preguntas. `id` es lo que viaja en los eventos (tema y rama): no cambiarlo
     una vez lanzados los anuncios, o la Platform verá dos nombres para lo mismo. */
  PREGUNTAS: {
    titulo: 'Estar bien no es lo mismo que estar al 100 %.',
    entradilla: 'Dos preguntas y te contamos qué solemos combinar para alguien como tú.',
    paso1: '1 de 2',
    paso2: '2 de 2',
    atras: 'Atrás',
    pregunta1: '¿Qué te gustaría notar más?',
    pregunta2: '¿Qué haces ya por cuidarte?',
    /* Pregunta 1: botón y las tres terapias del resultado (claves de TU_CASO.TERAPIAS). */
    temas: [
      { id: 'energia',     boton: 'Más energía todo el día',     terapias: ['crio', 'luz', 'hbot'] },
      { id: 'descanso',    boton: 'Dormir y recuperar mejor',    terapias: ['pemf', 'crio', 'luz'] },
      { id: 'cabeza',      boton: 'La cabeza más despejada',     terapias: ['brain', 'crio', 'pemf'] },
      { id: 'verme',       boton: 'Verme mejor por fuera',       terapias: ['luzpiel', 'preso', 'respark'] },
      { id: 'largo_plazo', boton: 'Cuidarme a largo plazo',      terapias: ['hbot', 'luz', 'crio'] },
    ],
    /* Pregunta 2: botón y la frase que sale debajo de las terapias. */
    ramas: [
      { id: 'entreno',      boton: 'Entreno con regularidad',
        frase: 'Si ya entrenas, esto cuida lo que pasa entre un entreno y el siguiente: la recuperación.' },
      { id: 'cuido',        boton: 'Cuido lo que como y cómo duermo',
        frase: 'Si ya cuidas lo básico, medirte te dice dónde te queda margen.' },
      { id: 'poco_de_todo', boton: 'Un poco de todo, sin un plan',
        frase: 'Cuidarse bien no es hacer más cosas, sino las que tienen sentido para ti, con constancia.' },
      { id: 'empezar',      boton: 'Quiero empezar a hacerlo bien',
        frase: 'No hace falta saber por dónde empezar: primero se mide y después se hace un plan sencillo.' },
    ],
    etqResultado: 'Lo que solemos combinar',
    siempre: 'Qué te encaja a ti lo decidimos después de medirte, con criterio médico. En REVO no hay dos planes iguales.',
    cambiar: 'Cambiar respuestas',
  },

  /* 3 · Así son tus minutos. {min} se cambia por MINUTOS. */
  PASOS: {
    titulo: 'Así son tus {min} minutos',
    lista: [
      ['Te recibimos', 'Llegas al estudio de Turó Park, te enseñamos el espacio y las terapias, y nos cuentas qué te gustaría mejorar.'],
      ['Medimos cómo estás', 'Edad biológica, composición corporal e índice de estrés. Son mediciones sencillas.'],
      ['Hablamos de ti', 'Revisamos contigo los resultados, tu objetivo y tus hábitos: cómo descansas, cómo te recuperas, qué quieres seguir haciendo.'],
      ['Sales con un plan', 'Te explicamos qué terapias encajan contigo y con qué frecuencia. Te hagas miembro o no, el plan es tuyo.'],
    ],
  },

  /* 4 · Quién hay detrás. */
  EQUIPO: {
    titulo: 'Un equipo que te conoce',
    doctora: {
      nombre: 'Dra. Miriam Rivera',
      texto: 'Especialista en medicina de la longevidad. Dirige los protocolos de REVO.',
      colegiada: null,   /* PENDIENTE [Número de colegiada]: p. ej. 'Colegiada n.º 08/XXXXX' */
      foto: 'assets/dra-miriam-rivera.jpeg',
    },
    coach: {
      nombre: 'Tu Wellness Coach',
      texto: 'Te acompaña en tu punto de partida y en tus primeras sesiones, para que cada visita se adapte a tu plan.',
    },
  },

  /* 5 · Testimonio (palabras literales del miembro). */
  TESTIMONIO: {
    texto: 'Duermo mejor, tengo más energía y REVO se ha convertido en parte natural de mi rutina.',
    quien: 'Gintare, miembro de REVO',
  },

  /* 6 · Reserva. */
  RESERVA: {
    titulo: 'Elige día y hora',
    texto: 'De lunes a viernes de 7:00 a 21:00 y sábados de 9:00 a 14:00.',
    waPregunta: '¿Ningún hueco te encaja o prefieres preguntar antes?',
    waEnlace: 'Escríbenos por WhatsApp',
  },

  /* 7 · Probar ese mismo día. */
  PRUEBA: {
    titulo: 'Si quieres, prueba ese mismo día',
    texto: 'Ese mismo día puedes probar una o dos terapias: crioterapia, luz roja, PEMF, BrainTap, Pulsetto o presoterapia. Son 40 € una y 60 € dos.',
  },

  /* 8 · La membresía. */
  SEGUIR: {
    titulo: 'Si decides seguir',
    texto: 'La membresía REVO Core incluye todas las terapias sin límite, hasta dos masajes al mes y tu plan personalizado con seguimiento médico. Son 350 € al mes, con un mínimo de tres meses, o 3.500 € al año. La mayoría de miembros viene una o dos veces por semana. Plazas limitadas a 175 miembros.',
    enlace: 'Ver la membresía',
    href: 'membresias.html',
  },

  /* 9 · Dónde estamos. */
  DONDE: {
    titulo: 'Dónde estamos',
    barrio: 'En Turó Park',
    direccion: 'Carrer de Ferran Agulló 24, 08021 Barcelona',
    horario: 'Lunes a viernes de 7:00 a 21:00, sábados de 9:00 a 14:00, domingos y festivos cerrado',
    enlace: 'Cómo llegar',
  },

  /* 10 · Preguntas frecuentes, plegadas. [pregunta, respuesta]; la respuesta admite un enlace <a>.
     Una respuesta null está PENDIENTE y la pregunta no se enseña hasta que se escriba. */
  DUDAS: {
    titulo: 'Preguntas frecuentes',
    lista: [
      ['¿Tiene algún coste?', 'Tu punto de partida corre de nuestra cuenta. Solo pagas si decides probar una terapia ese día o hacerte miembro.'],
      ['¿Me compromete a algo?', 'No. Sales con tu plan, te hagas miembro o no.'],
      ['¿Qué tengo que traer?', null],   /* PENDIENTE [Ropa cómoda. Indicaciones previas para la composición corporal, si las hay.] */
      ['¿Puedo cambiar la fecha?', 'Sí, desde el enlace de la confirmación o escribiéndonos por WhatsApp.'],
      ['¿Es un tratamiento médico?', 'REVO no diagnostica ni trata enfermedades. Si estás embarazada, llevas un marcapasos o tienes una condición médica, cuéntanoslo al llegar: revisamos contigo qué terapias son seguras para ti.'],
      ['¿Cuánto tiempo necesito después?', 'La mayoría de miembros viene una o dos veces por semana, una hora cada vez, según su plan.'],
      ['¿Cuánto cuesta la membresía?', '350 € al mes con un mínimo de tres meses, o 3.500 € al año, con todas las terapias incluidas. También hay sesiones sueltas.'],
      ['¿Y si vivo fuera de Barcelona?', 'La membresía tiene sentido viniendo cada semana. Si nos visitas de forma puntual o quieres regalarlo, tenemos <a href="experiencias.html">experiencias de una o dos horas</a>.'],
    ],
  },

  /* 11 · Cierre. */
  CIERRE: {
    titulo: 'Los atajos no funcionan.<br><em>Los sistemas, sí.</em>',
    texto: 'Empieza por el tuyo: te invitamos a tu punto de partida.',
    firma: 'REVO Studios · Wellbeing. Revolved.',
  },

  /* Pie y textos sueltos. */
  PIE: 'REVO Studios · Carrer de Ferran Agulló 24, Turó Park, Barcelona',
  PRIVACIDAD: 'Privacidad',
  COOKIES: 'Cookies',
  LOGO_ALT: 'REVO Studios',
};
