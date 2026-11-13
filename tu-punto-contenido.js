/* Contenido de la landing «Tu punto de partida», versión con tres preguntas (/tu-punto).
   Aquí vive TODO el texto: cambiar una frase se hace en este fichero y no obliga a tocar tu-punto.js ni tu-punto.html
   (salvo el titular y la pregunta de la primera pantalla, que además están escritos en tu-punto.html para que
   se vean antes de que cargue el JavaScript: si se cambian aquí, se cambian también allí).
   Voz: la de los guiones de los vídeos (12-nov-2026) y el documento de la landing del equipo. Escenas de cada día,
   nada de explicar mecanismos del cuerpo, sin masculinos genéricos, sin precio en los titulares.
   Cifras: skill revo-tono (references/datos.md) y la web. No se inventa ninguna. */

window.TU_PUNTO = {

  FOTO: 'assets/',

  /* Duración de la visita, en minutos. Un solo sitio. Con 0 no se dice en ninguna parte. */
  MINUTOS: 45,

  /* WhatsApp del equipo, con el mensaje ya escrito. */
  WHATSAPP: 'https://wa.me/34613505881?text=' + encodeURIComponent('Hola, quiero reservar mi punto de partida en REVO.'),

  TEXTOS: {
    logoAlt: 'REVO Studios',
    donde: 'Clínica de longevidad · Turó Park',
    atras: 'Atrás',
    continuar: 'Continuar',
    reservar: 'Elegir día y hora',

    /* 1 · el porcentaje */
    /* La entrada promete saber qué terapias pueden ayudarte (Eric, 13-nov-2026); la invitación al punto
       de partida llega al final, después del resultado. */
    ojo1: 'Tres preguntas · un minuto',
    titular1a: 'Descubre qué terapias',
    titular1b: 'pueden ayudarte a estar <em class="n">al 100&nbsp;%</em>.',
    pregunta1: '¿A qué porcentaje dirías que estás hoy?',
    pista1: 'Mueve la línea hasta tu número.',
    nota1: '',
    directo: 'O ve directamente a la invitación',

    /* 2 · lo que ya haces */
    paso2: '2 de 3',
    pregunta2: '¿Qué haces ya <em>por cuidarte</em>?',
    pista2: 'Marca todo lo que hagas.',
    menos: 'Menos de lo que me gustaría',

    /* 3 · dónde lo notarías */
    paso3: '3 de 3 · Has dicho {p}&nbsp;%',
    pregunta3: '¿Dónde notarías <em class="n">ese {r}&nbsp;%</em>?',
    pregunta3cien: '¿Dónde quieres seguir así <em>dentro de veinte años</em>?',

    /* resultado */
    cambiar: 'Cambiar respuestas',
    ojoResultado: 'Tu resultado',
    hoy: 'Hoy',
    margen: 'Margen',
    ojoNotarias: 'Dónde lo notarías',
    ojoConservar: 'Lo que quieres conservar',
    ojoCombinar: 'Las terapias que pueden ayudarte',
    combinar: 'Para {tema}, solemos combinar estas tres. Cada visita dura alrededor de una hora.',
    desliza: 'Desliza para ver las tres',
    criterio: 'Cuáles tienen sentido para ti, y con qué frecuencia, lo decidimos después de medirte, con criterio médico. Eso es tu punto de partida.',

    hacesMucho: 'Haces mucho. Cuidarse bien no es hacer más cosas, sino las que tienen sentido para ti.',
    hacesBase: 'Es una buena base. Lo siguiente es saber dónde merece la pena poner el esfuerzo.',
    hacesMenos: 'Dices que haces menos de lo que te gustaría. No hace falta saber por dónde empezar: primero se mide y después se hace un plan sencillo.',
    hacesDatos: 'Ya tienes datos. Aquí alguien los mira contigo.',

    /* la invitación */
    ojoInvita: 'Por invitación',
    invita: 'Te invitamos a tu <em>punto de partida</em>',
    oferta: 'Conoce REVO, descubre si es para ti, mide tu punto de partida y sal con un plan.',
    claves: ['Corre de nuestra cuenta', 'Sin compromiso', 'De lunes a sábado'],
    waAntes: '¿Prefieres preguntarnos antes?',
    waEnlace: 'Escríbenos por WhatsApp',
    ojoPasos: 'Así son tus {m} minutos',
    ojoPasosSinMinutos: 'Así es tu punto de partida',
    fichaTitulo: 'Tu punto de partida',
    fichaEstado: 'Por medir',
    preguntas: 'Hacer las tres preguntas',

    /* el lugar */
    ojoLugar: 'REVO · Turó Park',
    lugarA: 'Para saber si es tu lugar,',
    lugarB: '<em>hay que entrar</em>.',
    lugar: 'REVO es una clínica de longevidad en Turó Park, vivida como un club: crioterapia, luz roja, cámara hiperbárica y PEMF, con un equipo médico detrás.',
    ojoEquipo: 'Un equipo que te conoce',
    comoLlegar: 'Cómo llegar',
    mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('REVO Studios, Carrer de Ferran Agulló 24, 08021 Barcelona'),

    /* dudas y cierre */
    ojoDudas: 'Si te lo estás preguntando',
    dudas: 'Lo que conviene saber <em>antes de venir</em>',
    waOtra: '¿Otra duda?',
    lemaA: 'Los atajos no funcionan.',
    lemaB: 'Los sistemas, sí.',
    cierre: 'Empieza por el tuyo: te invitamos a tu punto de partida.',
    marca: 'Wellbeing. Revolved.',
    direccion: 'Carrer de Ferran Agulló 24, Turó Park · 08021 Barcelona',
    horario: 'De lunes a viernes de 7:00 a 21:00 · Sábados de 9:00 a 14:00',
    legal: 'Tu punto de partida no es una consulta médica ni sustituye a tu médico.',
    privacidad: 'Privacidad',
    cookies: 'Cookies'
  },

  /* Lo que dice la línea según el número (de mayor a menor: gana el primero que se cumple). */
  ECO: [
    [100, 'Entonces se trata de cuidarlo.'],
    [90, 'Muy bien. Y aún con margen.'],
    [75, 'Bien. Y con margen.'],
    [0, 'Hay margen. Es un buen punto de partida.']
  ],

  /* Titular del resultado según el número: primera frase y segunda (esta va en cursiva). */
  TITULARES: [
    [100, 'Estás al cien.', 'Ahora se trata de cuidarlo.'],
    [90, 'Estás muy bien.', 'Y aún queda margen.'],
    [75, 'Estás bien.', 'Y queda margen.'],
    [0, 'Hay margen.', 'Y es un buen punto de partida.']
  ],

  /* Lo que ya hace: id, botón y cómo se dice en el resultado («Entrenas, cuidas lo que comes y…»). */
  HACES: [
    ['entreno', 'Entreno', 'entrenas'],
    ['comida', 'Cuido lo que como', 'cuidas lo que comes'],
    ['descanso', 'Cuido mi descanso', 'cuidas tu descanso'],
    ['suplementos', 'Tomo suplementos', 'tomas suplementos'],
    ['reloj', 'Llevo reloj o anillo', 'llevas un reloj o un anillo que mide'],
    ['analiticas', 'Me hago analíticas', 'te haces analíticas'],
    ['masaje', 'Masaje o fisio', 'vas al masaje o al fisio'],
    ['yoga', 'Yoga o meditación', 'haces yoga o meditas']
  ],

  /* Terapias: nombre, foto y encuadre, dato (duración) y qué hace, dicho en llano. */
  TERAPIAS: {
    crio:    { nombre: 'Crioterapia', foto: 'cryo-chamber.webp', pos: '50% 58%', meta: 'De 2 a 3 minutos · −130&nbsp;°C',
               que: 'Tres minutos de frío que despejan la cabeza y ayudan al cuerpo a desinflamar. Siempre con tu coach al lado.' },
    luz:     { nombre: 'Cama de luz roja', foto: 'redlight-chamber.webp', pos: '38% 50%', meta: 'De 10 a 15 minutos',
               que: 'Luz roja e infrarroja de cuerpo entero. Ayuda a las células a producir energía y estimula el colágeno de la piel.' },
    pemf:    { nombre: 'PEMF', foto: 'pemf-hero.webp', pos: '62% 50%', meta: 'De 20 a 40 minutos',
               que: 'Campos electromagnéticos pulsados: la magnetoterapia de los fisioterapeutas, en todo el cuerpo. Ayuda a entrar en modo descanso.' },
    hbot:    { nombre: 'Cámara hiperbárica', foto: 'hbot-chamber.webp', pos: '46% 50%', meta: '60 minutos · oxígeno al 98&nbsp;%',
               que: 'Respiras oxígeno a 1,9 atmósferas. A los tejidos llega hasta diez veces más, y eso ayuda a que se reparen.' },
    brain:   { nombre: 'BrainTap', foto: 'braintap-hero.webp', pos: '50% 34%', meta: '15 minutos',
               que: 'Auriculares y luces sincronizadas que llevan al cerebro a una relajación profunda.' },
    luzpiel: { nombre: 'Luz roja para la piel', foto: 'redlight-chamber.webp', pos: '38% 50%', meta: 'De 10 a 15 minutos',
               que: 'La misma luz, en la cama y en una máscara para la cara. Estimula el colágeno y la elastina, que dan firmeza a la piel.' },
    facial:  { nombre: 'Masaje facial', foto: 'massage-glow.webp', pos: '34% 40%', meta: 'A mano',
               que: 'Un masaje después de la luz. Suelta la tensión de la cara.' },
    respark: { nombre: 'Respark®', foto: 'therapy.webp', pos: '40% 50%', meta: '60 minutos',
               que: 'Crioterapia a −130&nbsp;°C y, después, un masaje drenante y moldeador.' }
  },

  /* Dónde lo notaría: botón, tema (para la frase de «lo que solemos combinar»), `para` (la frase que abre
     la invitación, del documento de la landing del equipo), la escena y sus tres terapias.
     Las escenas salen de los guiones: 01A, 02A, 04A y 05A. `que` cambia lo que hace una terapia para ese caso. */
  AREAS: {
    energia:  { boton: 'En la energía con la que acabo el día', tema: 'llegar con energía al final del día',
      para: 'Para seguir haciendo planes con energía.',
      apunte: 'El día empieza bien. A media tarde pesa un poco más, y el plan de la noche se piensa dos veces. Pasa tan poco a poco que se acaba dando por normal.',
      terapias: ['crio', 'luz', 'hbot'],
      que: { crio: 'Tres minutos de frío. Se sale con la cabeza despejada y con energía para el resto del día. Siempre con tu coach al lado.' } },
    descanso: { boton: 'En cómo me levanto', tema: 'descansar de verdad',
      para: 'Para que dormir vuelva a ser descansar.',
      apunte: 'Duermes tus horas. Pero levantarse con la batería llena es otra cosa, y hace tiempo que no pasa todos los días. Dormir no siempre es descansar.',
      terapias: ['pemf', 'brain', 'luz'],
      que: { pemf: 'Campos electromagnéticos pulsados, en todo el cuerpo. Ayudan a pasar al modo descanso, que es lo que lleva al sueño profundo.',
             luz: 'Luz roja e infrarroja de cuerpo entero. Ayuda a regular el ritmo del sueño: el reloj interno que marca cuándo dormir.' } },
    cabeza:   { boton: 'En la cabeza: claridad y calma', tema: 'bajar el ritmo',
      para: 'Para que la cabeza también termine la jornada.',
      apunte: 'El trabajo termina a las siete. La cabeza, a veces, bastante más tarde. Rindes igual, pero cuesta estar del todo en la cena.',
      terapias: ['brain', 'crio', 'pemf'],
      que: { crio: 'Tres minutos de frío que bajan las revoluciones. Se sale con la cabeza despejada. Siempre con tu coach al lado.',
             pemf: 'Campos electromagnéticos pulsados, en todo el cuerpo. Ayudan a pasar del modo alerta al modo descanso.' } },
    cuerpo:   { boton: 'En cómo me recupero del deporte', tema: 'recuperarse mejor',
      para: 'Para que la recuperación también se entrene.',
      apunte: 'El siguiente entrenamiento también se prepara cuando termina el de hoy. Con los años el cuerpo tarda un poco más en volver, y eso se acaba dando por hecho.',
      terapias: ['crio', 'hbot', 'pemf'],
      que: { crio: 'Tres minutos de frío que ayudan a desinflamar y sueltan la musculatura. Siempre con tu coach al lado.',
             pemf: 'Campos electromagnéticos pulsados: la magnetoterapia de los fisioterapeutas, en todo el cuerpo. Ayuda a desinflamar y a reparar.' } },
    piel:     { boton: 'En la piel', tema: 'cuidar la piel',
      para: 'Para que la piel también entre en el plan.',
      apunte: 'Con los años la piel produce menos colágeno y pierde firmeza. Es un cambio lento, de los que no se ven de un mes para otro. Por eso se da por normal.',
      terapias: ['luzpiel', 'facial', 'respark'] },
    todo:     { boton: 'En nada concreto. Quiero seguir así muchos años', boton100: 'En todo', tema: 'cuidarse a largo plazo',
      para: 'Para saber desde dónde empiezas.',
      apunte: 'Te encuentras bien, y precisamente por eso es fácil dejarlo para más adelante. La longevidad no empieza cuando aparece un problema. Empieza por saber cómo estás hoy y cuidarlo con constancia.',
      terapias: ['hbot', 'luz', 'crio'] }
  },
  ORDEN: ['energia', 'descanso', 'cabeza', 'cuerpo', 'piel', 'todo'],

  /* La frase que abre la invitación cuando la persona NO ha hecho las preguntas (va directa a la invitación)
     y el anuncio dice de qué perfil viene: «icp1», «icp2»… en cualquier parte de utm_content, igual que en
     /punto-de-partida. Son las del documento de la landing del equipo (13-nov-2026). Si ha contestado las
     preguntas, manda su respuesta (`para` del área) y esto no se usa. */
  PERFILES: {
    icp1: 'Para seguir haciendo planes con energía.',
    icp2: 'Para que la cabeza también termine la jornada.',
    icp3: 'Para volver a lo que te gusta hacer.',
    icp4: 'Para que la recuperación también se entrene.',
    icp5: 'Para saber desde dónde empiezas.',
    icp6: 'Para conocer REVO por dentro.'
  },

  /* Los cuatro pasos de la visita. La ficha de las tres mediciones cuelga del segundo. */
  PASOS: [
    ['Te recibimos', 'Llegas al estudio de Turó Park, te enseñamos el espacio y las terapias, y nos cuentas qué te gustaría mejorar.'],
    ['Medimos cómo estás', 'Tres mediciones sencillas. Lo que no se nota desde dentro.'],
    ['Hablamos de ti', 'Revisamos contigo los resultados, tu objetivo y tus hábitos: cómo descansas, cómo te recuperas, qué quieres seguir haciendo.'],
    ['Sales con un plan', 'Te explicamos qué terapias encajan contigo y con qué frecuencia. Te hagas miembro o no, el plan es tuyo.']
  ],

  /* Las tres mediciones: nombre, la casilla vacía y qué dice cada una. */
  FICHA: [
    ['Edad biológica', '— años', 'Una estimación de los años que marca tu cuerpo. No siempre coinciden con los del calendario.'],
    ['Composición corporal', '— %', 'Cuánto es músculo y cuánto es grasa. La báscula sola no lo dice.'],
    ['Índice de estrés', '—', 'Un indicador de la carga que lleva tu sistema nervioso. Lo leemos junto con tus hábitos.']
  ],

  /* El lugar, en tres datos. */
  DATOS: [
    ['1 o 2', 'visitas por semana, según tu plan.'],
    ['7 – 21&nbsp;h', 'de lunes a viernes. Los sábados, de 9 a 14&nbsp;h.'],
    ['175', 'plazas de miembro.']
  ],

  /* Nombre, cargo, texto y foto (vacía = sin foto). El texto de la doctora es el de la portada de la web. */
  EQUIPO: [
    ['Dra. Miriam Rivera', 'Directora médica', 'Especialista en medicina de la longevidad y oxigenoterapia hiperbárica. Diseña el plan de cada miembro.', 'dra-miriam-rivera.jpeg'],
    ['Tu Wellness Coach', '', 'Te acompaña en el recorrido y en tus primeras sesiones, para que cada visita se adapte a tu plan.', '']
  ],

  FOTOS: [
    ['visita-fachada.webp', 'La entrada de REVO Studios, de noche, con la luz azul encendida', 1600, 1067, ''],
    ['visita-salas.webp', 'El pasillo de las salas, con la pared de luz azul', 933, 1400, ''],
    ['lounge.webp', 'La sala de espera, con sofás grises', 1125, 1500, '60% 70%']
  ],

  CITA: { texto: 'REVO es uno de esos sitios que Barcelona hace excepcionalmente bien: bonito, algo futurista y tan agradable que cuidarte deja de parecer otra tarea más en la agenda.', quien: 'Kristina R. · Reseña de Google' },

  /* Dudas plegadas: pregunta y respuesta. */
  DUDAS: [
    ['¿Tiene algún coste?', 'Tu punto de partida corre de nuestra cuenta. Solo pagas si decides probar una terapia ese día o hacerte miembro.'],
    ['¿Me compromete a algo?', 'No. Sales con tu plan, te hagas miembro o no.'],
    ['Ya hago muchas cosas. ¿Qué me aporta?', 'Orden. Cuidarse bien no es hacer más cosas, sino las que tienen sentido para ti, con constancia. Medir te dice cuáles.'],
    ['¿Puedo probar una terapia ese mismo día?', 'Sí. Puedes probar una o dos: crioterapia, luz roja, PEMF, BrainTap, Pulsetto o presoterapia. Son 40&nbsp;€ una y 60&nbsp;€ dos.'],
    ['¿Y si decido seguir?', 'La membresía REVO Core incluye todas las terapias sin límite, hasta dos masajes al mes y tu plan personalizado con seguimiento médico. Son 350&nbsp;€ al mes, con un mínimo de tres meses, o 3.500&nbsp;€ al año. <a href="membresias.html">Ver la membresía</a>'],
    ['¿Cuánto tiempo pide después?', 'La mayoría de miembros viene una o dos veces por semana, una hora cada vez, según su plan. Abrimos de lunes a viernes de 7:00 a 21:00 y los sábados de 9:00 a 14:00.'],
    ['¿Puedo cambiar la fecha?', 'Sí. Desde el enlace de la confirmación o escribiéndonos por WhatsApp.'],
    ['¿Y si vivo fuera de Barcelona?', 'La membresía tiene sentido viniendo cada semana. Si nos visitas de forma puntual o quieres regalarlo, tenemos experiencias de una o dos horas. <a href="experiencias.html">Ver las experiencias</a>'],
    ['¿Es un tratamiento médico?', 'REVO no diagnostica ni trata enfermedades. Si estás embarazada, llevas un marcapasos o tienes una condición médica, cuéntanoslo al llegar: revisamos contigo qué terapias son seguras para ti.']
  ]
};
