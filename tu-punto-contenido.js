/* Contenido de la landing «Tu punto de partida», versión con tres preguntas (/tu-punto).
   Aquí vive TODO el texto: cambiar una frase se hace en este fichero y no obliga a tocar tu-punto.js ni tu-punto.html
   (salvo el titular y la pregunta de la primera pantalla, que además están escritos en tu-punto.html para que
   se vean antes de que cargue el JavaScript: si se cambian aquí, se cambian también allí).
   Voz (versión única del 16-nov-2026): la del documento de la landing del equipo (María, v2 del 13-nov): se dice
   qué le pasa a la persona, qué hace cada terapia y con qué dato. Sin masculinos genéricos, sin precio en los titulares.
   Tono (repaso del 16-nov-2026): sobrio y amable. Frases cortas, de tú, sin exclamaciones; se normaliza sin culpa
   («es más habitual de lo que parece», «y no pasa nada») y nunca se promete un resultado.
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
    /* El titular es el del documento del equipo (v2). Con «icp5» en el anuncio dice «seguir sintiéndote». */
    ojo1: 'Un minuto para ti',
    titular1: 'Descubre qué terapias pueden ayudarte a volver a sentirte <em class="n">al 100&nbsp;%</em>.',
    titular1icp5: 'Descubre qué terapias pueden ayudarte a seguir sintiéndote <em class="n">al 100&nbsp;%</em>.',
    sub1: 'Crioterapia, luz roja, cámara hiperbárica, PEMF y más, con acompañamiento médico. Te contamos cuáles encajan con lo que buscas.',
    pregunta1: 'Hoy me siento al…',
    pista1: 'Desliza hasta donde te reconozcas.',
    directo: 'Ver las terapias directamente',

    /* 2 · lo que ya haces */
    paso2: '02 / 03',
    pregunta2: 'Así <em>me cuido hoy</em>',
    pista2: 'Elige lo que ya forma parte de tu vida.',
    menos: 'Todavía menos de lo que querría',

    /* 3 · dónde lo notarías */
    paso3: '03 / 03 · Has dicho {p}&nbsp;%',
    pregunta3: 'Con <em class="n">ese {r}&nbsp;%</em>, me gustaría…',
    pregunta3cien: 'Dentro de veinte años, <em>me gustaría…</em>',

    /* resultado */
    cambiar: 'Cambiar respuestas',
    ojoResultado: 'Lo que nos has contado',
    hoy: 'Hoy',
    margen: 'Margen',
    /* el bloque de la persona y lo que hay alrededor */
    ojoBloque: 'Lo que puede ayudarte',
    cuales: '¿Cuáles son las tuyas?',
    cualesTexto: 'Depende de cómo estés, y eso se mide.',
    cualesEnlace: 'Te lo contamos más abajo',
    otra: '¿Buscas otra cosa?',

    /* todas las terapias */
    ojoTerapias: 'Las terapias',
    terapiasTitulo: 'Tecnología que hasta hace poco solo usaban <em>deportistas de élite</em>',
    terapiasTexto: 'Más de 20 años de ciencia detrás, todo en un mismo sitio y con acompañamiento médico.',
    notas: 'Qué notas',
    desliza: 'Desliza para ver las siete',

    /* lo que dicen los miembros */
    ojoVoces: 'Miembros',
    vocesTitulo: 'Así lo viven <em>nuestros miembros</em>',

    /* quién está detrás */
    ojoMedico: 'Quién está detrás',
    medicoTitulo: 'Con acompañamiento <em>médico</em>',

    /* introducción de quien no contesta las preguntas */
    introSub: 'Tecnología de última generación (crioterapia, luz roja, cámara hiperbárica, PEMF y más) con acompañamiento médico continuo. Te contamos qué hace cada una y cuáles encajan con lo que buscas.',

    hacesMucho: 'Haces mucho. Cuidarse bien no es hacer más cosas, sino las que tienen sentido para ti.',
    hacesBase: 'Es una buena base. Lo siguiente es saber dónde merece la pena poner el esfuerzo.',
    hacesMenos: 'Haces menos de lo que te gustaría, y no pasa nada. No hace falta saber por dónde empezar: primero se mide y después se hace un plan sencillo.',
    hacesDatos: 'Ya tienes datos. Aquí alguien los mira contigo.',

    /* la invitación */
    ojoInvita: 'Por invitación',
    invita: 'Te invitamos a tu <em>punto de partida</em>',
    oferta: 'Antes de decidir qué terapias encajan contigo, medimos cómo estás: tu edad biológica, tu composición corporal y tu índice de estrés. Sales con un plan para ti, te hagas miembro o no.',
    /* La ficha de la invitación: qué es cada cosa y su valor. La duración sale de MINUTOS. */
    claveDuracion: 'Duración',
    minutos: '{m} minutos',
    claves: [['Coste', 'Corre de nuestra cuenta'], ['Compromiso', 'Ninguno'], ['Cuándo', 'De lunes a sábado']],
    waAntes: '¿Prefieres preguntarnos antes?',
    waEnlace: 'Escríbenos por WhatsApp',
    ojoPasos: 'Así son tus {m} minutos',
    ojoPasosSinMinutos: 'Así es tu punto de partida',
    fichaTitulo: 'Tu punto de partida',
    fichaEstado: 'Por medir',
    preguntas: 'Hacer las tres preguntas',

    /* después de la visita */
    despues: [
      ['Si quieres, prueba ese mismo día', 'Puedes añadir una o dos terapias de tu plan: crioterapia, luz roja, PEMF, BrainTap, Pulsetto o presoterapia. Son 40&nbsp;€ una y 60&nbsp;€ dos.', '', ''],
      ['Si decides seguir', 'La membresía REVO Core incluye todas las terapias, hasta dos masajes al mes y tu plan personalizado con seguimiento médico. Son 350&nbsp;€ al mes con un mínimo de tres meses, o 3.500&nbsp;€ al año. La mayoría de miembros viene una o dos veces por semana.', 'Ver la membresía', 'membresias.html']
    ],

    /* el lugar */
    ojoLugar: 'Dónde estamos',
    lugarTitulo: 'En <em>Turó Park</em>',
    lugar: 'REVO es una clínica de longevidad vivida como un club, a un paso del parque. Todo en un mismo sitio.',
    verMapa: 'Ver el mapa',
    comoLlegar: 'Abrir en Google Maps',
    mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('REVO Studios, Carrer de Ferran Agulló 24, 08021 Barcelona'),
    mapaDentro: 'https://www.google.com/maps?q=' + encodeURIComponent('REVO Studios, Carrer de Ferran Agulló 24, 08021 Barcelona') + '&output=embed',

    /* dudas y cierre */
    ojoDudas: 'Antes de venir',
    dudas: 'Preguntas <em>frecuentes</em>',
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
    [90, 'Muy bien. Siempre queda un poco más.'],
    [75, 'Bien. Y con margen.'],
    [0, 'Más habitual de lo que parece.']
  ],

  /* Titular del resultado según el número: primera frase y segunda (esta va en cursiva). */
  TITULARES: [
    [100, 'Estás al cien.', 'Ahora se trata de cuidarlo.'],
    [90, 'Estás muy bien.', 'Y todavía queda margen.'],
    [75, 'Estás bien.', 'Y queda margen.'],
    [0, 'Hay margen.', 'Y es un buen punto de partida.']
  ],

  /* Lo que ya hace: id, botón y cómo se dice en el resultado («Entrenas, cuidas lo que comes y…»). */
  HACES: [
    ['entreno', 'Me muevo o entreno', 'entrenas'],
    ['comida', 'Cuido lo que como', 'cuidas lo que comes'],
    ['descanso', 'Cuido mi descanso', 'cuidas tu descanso'],
    ['suplementos', 'Tomo suplementos', 'tomas suplementos'],
    ['reloj', 'Llevo reloj o anillo inteligente', 'llevas un reloj o un anillo que mide'],
    ['analiticas', 'Me hago analíticas', 'te haces analíticas'],
    ['masaje', 'Masaje o fisioterapia', 'vas al masaje o al fisio'],
    ['yoga', 'Yoga o meditación', 'haces yoga o meditas']
  ],

  /* Todas las terapias, en el orden del carrusel: nombre, duración, foto y encuadre, qué es y qué se nota.
     Las cifras son las de la skill revo-tono (references/datos.md): el documento del equipo traía la presión de la
     hiperbárica y los minutos de PEMF y BrainTap de antes. */
  TERAPIAS: [
    { nombre: 'Crioterapia', dur: 'De 2 a 3 minutos', foto: 'cryo-chamber.webp', pos: '50% 45%',
      que: 'Cabina de frío seco a −130&nbsp;°C, siempre con tu coach al lado. Si no aguantas, puedes salir antes.',
      notas: 'Despeja la cabeza, baja el estrés y desinflama. Muchos miembros cuentan que esa noche duermen mejor.' },
    { nombre: 'Luz roja', dur: 'De 10 a 15 minutos', foto: 'redlight-chamber.webp', pos: '38% 50%',
      que: 'Cama de luz roja e infrarroja, de cuerpo entero.',
      notas: 'Estimula el colágeno de la piel, da energía a las células y ayuda a regular el sueño.' },
    { nombre: 'Cámara hiperbárica', dur: '60 minutos', foto: 'hbot-chamber.webp', pos: '46% 50%',
      que: 'Oxígeno al 98&nbsp;% a 1,9 atmósferas.',
      notas: 'Lleva hasta diez veces más oxígeno a los tejidos: ayuda a reparar y a bajar la inflamación.' },
    { nombre: 'PEMF', dur: 'De 20 a 40 minutos', foto: 'pemf-hero.webp', pos: '62% 50%',
      que: 'Campos electromagnéticos pulsados en todo el cuerpo, en reposo.',
      notas: 'Activa el modo descanso: sueño más profundo y menos inflamación.' },
    { nombre: 'BrainTap', dur: '15 minutos', foto: 'braintap-hero.webp', pos: '50% 30%',
      que: 'Auriculares de sonido binaural y luces.',
      notas: 'Relajación profunda cuando cuesta desconectar, o foco y energía.' },
    { nombre: 'Presoterapia', dur: 'De 20 a 30 minutos', foto: 'presoterapia-hero.webp', pos: '50% 40%',
      que: 'Botas que comprimen de los pies hacia arriba.',
      notas: 'Piernas ligeras, menos retención, mejor circulación.' },
    { nombre: 'Respark®', dur: 'Una hora', foto: 'therapy.webp', pos: '40% 50%',
      que: 'Crioterapia seguida de un masaje drenante y moldeador.',
      notas: 'Silueta y retención.' }
  ],

  /* Dónde lo notaría. De cada área: el botón de la pregunta, cómo se llama en «¿Buscas otra cosa?» (`corto`),
     la frase que abre la invitación (`para`), y su bloque: título, lo que pasa, las terapias con su dato y lo que
     hacen, y una cita si la hay. «Cuando la cabeza no para» y «Vivir más no es vivir mejor» son los dos bloques
     del documento del equipo; los otros cuatro están escritos igual. */
  AREAS: {
    energia:  { boton: 'tener más energía en mi día a día', corto: 'Energía',
      para: 'Para seguir haciendo planes con energía.',
      titulo: 'Cuando la energía <em>no acompaña</em>',
      texto: 'Hay épocas en las que la energía no acompaña: cuesta arrancar, o se acaba antes que el día. La energía se produce en las células, y cuando el descanso y la recuperación no acompañan, se nota. Pasa tan poco a poco que se acaba dando por normal.',
      filas: [
        ['Crioterapia', 'De 2 a 3 minutos a −130&nbsp;°C', 'Libera dopamina y noradrenalina: se sale con la cabeza despejada y con energía para el resto del día'],
        ['Luz roja', 'De 10 a 15 minutos', 'Activa la mitocondria, de donde sale la energía de las células'],
        ['Cámara hiperbárica', '60 minutos · oxígeno al 98&nbsp;%', 'Lleva hasta diez veces más oxígeno a los tejidos']
      ],
      cita: { texto: 'Duermo mejor, tengo más energía y REVO se ha convertido en parte natural de mi rutina.', quien: 'Gintare · Miembro de REVO' } },
    descanso: { boton: 'dormir mejor y levantarme con la sensación de haber descansado', corto: 'Descanso',
      para: 'Para que dormir vuelva a ser descansar.',
      titulo: 'Cuando dormir <em>no es descansar</em>',
      texto: 'Duermes tus horas y te levantas igual. Si el sistema nervioso se queda en modo alerta, cuesta llegar al sueño profundo, que es cuando el cuerpo se repara.',
      filas: [
        ['PEMF', 'De 20 a 40 minutos, en reposo', 'Activa el modo «descanso y reparación» del cuerpo, para un sueño más profundo'],
        ['BrainTap', '15 minutos', 'Sonido y luz que llevan al cerebro a la relajación profunda'],
        ['Luz roja', 'De 10 a 15 minutos', 'Ayuda a regular el reloj interno que le dice al cuerpo cuándo dormir'],
        ['Crioterapia', 'De 2 a 3 minutos a −130&nbsp;°C', 'Baja el cortisol, la hormona del estrés. Muchos miembros cuentan que esa noche duermen mejor']
      ] },
    cabeza:   { boton: 'tener la cabeza más clara y más tranquila', corto: 'Claridad y calma',
      para: 'Para que la cabeza también termine la jornada.',
      titulo: 'Cuando la cabeza <em>no para</em>',
      texto: 'Cuando el día no termina al cerrar el portátil, el sistema nervioso se queda en modo alerta y el cortisol, la hormona del estrés, no baja. Rindes igual, pero cuesta estar del todo en la cena.',
      filas: [
        ['Crioterapia', 'De 2 a 3 minutos a −130&nbsp;°C', 'Baja el cortisol y libera dopamina: se sale con la cabeza despejada, con una mezcla de energía y calma'],
        ['BrainTap', '15 minutos', 'Sonido y luz que llevan al cerebro a la relajación profunda'],
        ['PEMF', 'De 20 a 40 minutos, en reposo', 'Ayuda a pasar del modo alerta al modo «descanso y reparación»']
      ],
      cita: { texto: 'Por la tarde vengo aquí y hago una terapia o dos. Entre dos y tres veces a la semana voy sin ningún problema.', quien: 'Una miembro de REVO' } },
    cuerpo:   { boton: 'rendir más y sentir mi cuerpo fuerte y ágil', corto: 'Rendimiento',
      para: 'Para que el cuerpo responda como quieres.',
      titulo: 'Cuando el cuerpo <em>no responde igual</em>',
      texto: 'Con los años el cuerpo cambia: cuesta más mantener la fuerza y la agilidad, y tarda más en recuperarse después del esfuerzo. Rendir bien, en el deporte y en el día a día, depende tanto de lo que haces como de cómo te recuperas.',
      filas: [
        ['Crioterapia', 'De 2 a 3 minutos a −130&nbsp;°C', 'Desinflama y suelta la musculatura'],
        ['Cámara hiperbárica', '60 minutos · oxígeno al 98&nbsp;%', 'Lleva hasta diez veces más oxígeno a los tejidos, y eso ayuda a que se reparen'],
        ['PEMF', 'De 20 a 40 minutos, en reposo', 'La magnetoterapia de los fisioterapeutas, en todo el cuerpo: desinflama y mejora la circulación'],
        ['Presoterapia', 'De 20 a 30 minutos', 'Drena y deja las piernas ligeras']
      ] },
    piel:     { boton: 'sentirme mejor con mi aspecto físico', corto: 'Aspecto físico',
      para: 'Para verte tan bien como te sientes.',
      titulo: 'Cuando quieres <em>verte como te sientes</em>',
      texto: 'El aspecto cambia despacio: de un año para otro, no de un mes para otro. Con los años se produce menos colágeno y elastina, que dan firmeza a la piel, y al cuerpo le cuesta más drenar. Cuidarlo también merece un plan.',
      filas: [
        ['Luz roja', 'De 10 a 15 minutos', 'En la cama de cuerpo entero y en una máscara para la cara. Estimula el colágeno y la elastina'],
        ['Respark®', 'Una hora', 'Crioterapia seguida de un masaje drenante y moldeador, para la silueta y la retención'],
        ['Presoterapia', 'De 20 a 30 minutos', 'Drena la retención y mejora la circulación'],
        ['Masaje facial', 'A mano', 'Después de la luz. Suelta la tensión de la cara']
      ] },
    todo:     { boton: 'seguir como estoy durante muchos años', corto: 'Longevidad',
      para: 'Para saber desde dónde empiezas.',
      titulo: 'Vivir más no es <em>vivir mejor</em>',
      texto: 'El envejecimiento no empieza con las primeras arrugas o las canas: empieza mucho antes, cuando el cansancio dura más, cuesta concentrarse o el cuerpo no se recupera como antes. Cuidarse a tiempo es lo que permite seguir haciendo lo que te gusta.',
      filas: [
        ['Cámara hiperbárica', '60 minutos · oxígeno al 98&nbsp;%', 'Lleva hasta diez veces más oxígeno a los tejidos: ayuda a reparar y a bajar la inflamación'],
        ['Luz roja', 'De 10 a 15 minutos', 'Estimula el colágeno y activa la mitocondria, de donde sale la energía de las células'],
        ['Crioterapia', 'De 2 a 3 minutos a −130&nbsp;°C', 'Desinflama y activa el metabolismo']
      ],
      cita: { texto: 'No se trata de llegar más lejos, sino de llegar mejor.', quien: 'Dra. Miriam Rivera' } }
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
  /* A quien no contesta las preguntas se le enseña primero el bloque del perfil de su anuncio. Sin perfil, el de
     «Cuando la cabeza no para», que es el que el documento del equipo pone por delante. */
  PERFIL_AREA: { icp1: 'energia', icp2: 'cabeza', icp3: 'cuerpo', icp4: 'cuerpo', icp5: 'todo', icp6: 'todo' },
  AREA_SIN_PERFIL: 'cabeza',

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
    ['150', 'plazas de miembro.']
  ],

  /* Nombre, cargo, texto, foto y encuadre. */
  EQUIPO: [
    ['Dra. Miriam Rivera', 'Directora médica', 'Especialista en medicina de la longevidad y oxigenoterapia hiperbárica. Diseña tu plan y lo revisa contigo.', 'dra-miriam-rivera.jpeg', ''],
    ['El equipo de REVO', 'Wellness Coach', 'Tu Wellness Coach te acompaña en cada visita y ajusta el plan con la doctora.', 'metodo-acompanamiento.webp', '50% 30%']
  ],
  FRASE_DRA: { texto: 'Vivir más años no necesariamente significa vivir mejor.', quien: 'Dra. Miriam Rivera' },

  /* Lo que dicen los miembros (del archivo de vídeos del equipo). Cuando estén los vídeos, cada cita lleva el suyo
     en `video` (fichero en assets/) y la tarjeta lo enseña con su botón de reproducir. */
  VOCES: [
    { texto: 'Llevo todo el día sentada en una silla… por la tarde vengo aquí y hago una terapia o dos.', quien: 'Una miembro de REVO', video: '' },
    { texto: 'El personal es muy guay… al segundo día saben tu nombre… te sientes muy en casa.', quien: 'Miembro de REVO', video: '' },
    { texto: 'El bienestar no es solo nutrición o deporte… REVO es lo que no tenía integrado en mi rutina: la recuperación.', quien: 'Miembro de REVO · Traducido del catalán', video: '' }
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
    ['¿Puedo cambiar la fecha?', 'Sí, desde el enlace de la confirmación o contestándonos por WhatsApp.'],
    ['¿Es un tratamiento médico?', 'REVO no diagnostica ni trata enfermedades. Si estás embarazada, llevas un marcapasos o tienes una condición médica, cuéntanoslo al llegar: revisamos contigo qué terapias son seguras para ti.'],
    ['¿Cuánto tiempo necesito después?', 'La mayoría de miembros viene una o dos veces por semana, una hora cada vez, según su plan.'],
    ['¿Cuánto cuesta la membresía?', '350&nbsp;€ al mes con un mínimo de tres meses, o 3.500&nbsp;€ al año, con todas las terapias incluidas. También hay sesiones sueltas. <a href="membresias.html">Ver la membresía</a>'],
    ['¿Y si vivo fuera de Barcelona?', 'La membresía tiene sentido viniendo cada semana. Si nos visitas de forma puntual o quieres regalarlo, tenemos experiencias de una o dos horas. <a href="experiencias.html">Ver las experiencias</a>']
  ]
};
