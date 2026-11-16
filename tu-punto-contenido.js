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
    sub1: 'Crioterapia, luz roja, cámara hiperbárica, PEMF y más, con acompañamiento médico.',
    pregunta1: 'Hoy me siento al…',
    pista1: 'Desliza hasta donde te reconozcas.',

    /* 2 · lo que ya haces */
    pregunta2: 'Así <em>me cuido hoy</em>',
    pista2: 'Elige lo que ya forma parte de tu vida.',
    menos: 'Todavía menos de lo que querría',

    /* 3 · dónde lo notarías */
    pregunta3: 'Con <em class="n">ese {r}&nbsp;%</em>, me gustaría…',
    pregunta3cien: 'Dentro de veinte años, <em>me gustaría…</em>',

    /* resultado */
    cambiar: 'Cambiar respuestas',
    ojoResultado: 'Lo que nos has contado',
    hoy: 'Hoy',
    margen: 'Margen',
    /* Las cinco partes del resultado (17-nov-2026). Cada una contesta la pregunta que la persona tiene en ese
       momento y abre la siguiente: por qué pasa → qué puede ayudarte → tu punto de partida → quién lo vive y
       quién está detrás → antes de venir. */
    parte1: 'Por qué pasa',
    parte2: 'Qué puede ayudarte',
    parte3: 'Tu punto de partida',
    parte4: 'Quién lo vive y quién está detrás',
    parte5: 'Antes de venir',
    /* 02 · sus terapias y las demás, en el mismo formato de lista. {deseo} es lo que eligió, dicho de tú. */
    terapiasTuyas: 'Lo que puede ayudarte a <em>{deseo}</em>',
    terapiasEntrada: 'Tecnología que hasta hace poco solo usaban deportistas de élite, con más de 20 años de ciencia detrás.',
    otrasTitulo: 'Otras terapias que <em>también pueden ayudarte</em>',
    otrasEntrada: 'Unas tienen que ver con {tema}. Otras, con cosas en las que quizá también te reconoces.',
    tambien: 'También ayuda con',
    /* el puente hacia la invitación: lo que ya hace, y lo que falta */
    puenteBase: 'Falta saber dónde poner el esfuerzo.',
    puenteMucho: 'Haces mucho. Falta saber qué tiene más sentido para ti.',
    puenteMenos: 'No hace falta saber por dónde empezar. Primero se mide.',

    /* el puente hacia la invitación */
    cuales: '¿Cuáles son las tuyas?',
    cualesTexto: 'Depende de cómo estés, y eso se mide.',

    /* lo que dicen los miembros */
    ojoVoces: 'Miembros',
    vocesTitulo: 'Así lo viven <em>nuestros miembros</em>',

    /* quién está detrás */
    ojoMedico: 'Quién está detrás',
    medicoTitulo: 'Con acompañamiento <em>médico</em>',

    /* introducción de quien no contesta las preguntas */
    introSub: 'Tecnología de última generación (crioterapia, luz roja, cámara hiperbárica, PEMF y más) con acompañamiento médico continuo.',

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

    /* el lugar */
    ojoLugar: 'Dónde estamos',
    lugarTitulo: 'En <em>Turó Park</em>',
    lugar: 'Una clínica de longevidad vivida como un club, a un paso del parque. Todo en un mismo sitio.',
    verMapa: 'Ver el mapa',
    comoLlegar: 'Abrir en Google Maps',
    mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('REVO Studios, Carrer de Ferran Agulló 24, 08021 Barcelona'),
    mapaDentro: 'https://www.google.com/maps?q=' + encodeURIComponent('REVO Studios, Carrer de Ferran Agulló 24, 08021 Barcelona') + '&output=embed',

    /* dudas y cierre */
    ojoDudas: 'Antes de venir',
    dudas: 'Preguntas <em>frecuentes</em>',
    waOtra: '¿Otra duda?',
    lemaA: 'Volver a sentirte al 100&nbsp;%',
    lemaB: 'empieza por saber cómo estás hoy.',
    cierre: 'Te invitamos a tu punto de partida. Sin coste y sin compromiso.',
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
    [90, 'Muy bien, siempre queda un poco más.'],
    [75, 'Bien, con margen.'],
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

  /* Las terapias (17-nov-2026). De cada una:
     · `dato`: duración y la cifra que la define.
     · `base`: qué es y qué hace en tu cuerpo, con su tecnología dicha tal cual (−130 °C, oxígeno al 98 %…) y cada
       palabra rara explicada al lado. Es igual para todo el mundo.
     · `usos`: en qué ayuda según lo que la persona eligió (energia · descanso · cabeza · cuerpo · piel · todo).
       Solo se escribe donde la relación es real; nunca promete un resultado.
     · `aparte`: la frase que sale cuando no tiene que ver con lo que eligió («Si además…»), porque casi nadie se
       reconoce en una sola cosa.
     La línea «También ayuda con…» sale sola de los `usos` que tenga. Cifras: revo-tono (datos.md). */
  TERAPIAS: [
    { nombre: 'Crioterapia', dato: 'De 2 a 3 minutos · −130&nbsp;°C', foto: 'cryo-chamber.webp', pos: '50% 45%',
      base: 'Una cabina de frío seco a −130&nbsp;°C, de cuerpo entero, siempre con tu coach al lado. En dos o tres minutos, el frío baja el cortisol, la hormona del estrés, hace que el cuerpo libere dopamina y noradrenalina, y desinflama.',
      usos: {
        energia: 'Sales con la cabeza despejada y el cuerpo despierto: energía para el resto del día.',
        descanso: 'Con el cortisol más bajo, el cuerpo llega a la noche en calma. Muchos miembros cuentan que ese día duermen mejor.',
        cabeza: 'Sales con la cabeza despejada, con una mezcla de energía y calma.',
        cuerpo: 'Suelta la musculatura y te ayuda a llegar mejor al siguiente esfuerzo.',
        todo: 'Desinflama y activa el metabolismo: dos cosas que conviene cuidar con constancia.' },
      aparte: 'Si acumulas estrés, ayuda a bajarlo en tres minutos.' },
    { nombre: 'Luz roja', dato: 'De 10 a 15 minutos · 630–940&nbsp;nm', foto: 'redlight-chamber.webp', pos: '38% 50%',
      base: 'Una cama de luz roja e infrarroja, de cuerpo entero. La infrarroja llega hasta cinco centímetros bajo la piel: activa la mitocondria, que es donde cada célula produce su energía, y estimula el colágeno y la elastina.',
      usos: {
        energia: 'Te ayuda a tener energía de fondo, no solo durante un rato.',
        descanso: 'Ayuda a regular el reloj interno, el que le dice al cuerpo cuándo toca dormir.',
        cabeza: 'Ayuda a regular el sueño, y con la cabeza descansada todo se ve más claro.',
        cuerpo: 'Activa la energía de las células, también las del músculo.',
        piel: 'Con constancia, ayuda a que la piel gane firmeza y mejor tono. Hay también una máscara para la cara.',
        todo: 'Energía en las células y firmeza en la piel: dos cosas que se van perdiendo con los años.' },
      aparte: 'Si además quieres cuidar la piel, estimula el colágeno y la elastina.' },
    { nombre: 'Cámara hiperbárica', dato: '60 minutos · oxígeno al 98&nbsp;%', foto: 'hbot-chamber.webp', pos: '46% 50%',
      base: 'Una cámara presurizada a 1,9 atmósferas en la que respiras oxígeno casi puro. Con la presión, llega a los tejidos hasta diez veces más oxígeno. Es la tecnología que se usa antes y después de una operación.',
      usos: {
        energia: 'Con el cuerpo mejor recuperado, el día pesa menos.',
        cuerpo: 'Ayuda a que músculos y tejidos se reparen después del esfuerzo.',
        todo: 'Ayuda a los tejidos a repararse y a bajar la inflamación: cuidar el cuerpo por dentro, antes de que lo pida.' },
      aparte: 'Si entrenas o vienes de una lesión, ayuda a que los tejidos se reparen.' },
    { nombre: 'PEMF', dato: 'De 20 a 40 minutos', foto: 'pemf-hero.webp', pos: '62% 50%',
      base: 'Campos electromagnéticos pulsados que recorren todo el cuerpo mientras estás en reposo: la magnetoterapia de los fisioterapeutas. Activan el modo «descanso y reparación» del sistema nervioso, desinflaman y mejoran la circulación.',
      usos: {
        energia: 'Cuando el cuerpo descansa de verdad, al día siguiente hay más energía.',
        descanso: 'Te ayuda a llegar al sueño profundo, que es cuando el cuerpo se repara.',
        cabeza: 'Baja las revoluciones y te ayuda a terminar de verdad la jornada.',
        cuerpo: 'Te ayuda a recuperarte del esfuerzo y a sentir el cuerpo más suelto.',
        todo: 'Ayuda a mantener a raya la inflamación y a descansar mejor.' },
      aparte: 'Si duermes regular, ayuda a llegar al sueño profundo.' },
    { nombre: 'BrainTap', dato: '15 minutos', foto: 'braintap-hero.webp', pos: '50% 30%',
      base: 'Unos auriculares con sonido binaural y unas luces sincronizadas, con los ojos cerrados. Llevan al cerebro a un estado de relajación profunda o de foco, según lo que necesites ese día.',
      usos: {
        energia: 'En modo foco, te ayuda a recuperar la concentración cuando el día se hace largo.',
        descanso: 'Te ayuda a soltar el día antes de irte a dormir.',
        cabeza: 'Te ayuda a apagar el ruido de fondo y a volver con la cabeza clara.' },
      aparte: 'Si te cuesta desconectar, ayuda a bajar el ruido en quince minutos.' },
    { nombre: 'Presoterapia', dato: 'De 20 a 30 minutos', foto: 'presoterapia-hero.webp', pos: '50% 40%',
      base: 'Unas botas que se llenan de aire y comprimen de los pies a la cadera. Drenan la retención de líquidos y activan la circulación.',
      usos: {
        energia: 'Piernas ligeras: el cuerpo pesa menos al final del día.',
        cuerpo: 'Descarga las piernas después de entrenar o de un día entero de pie.',
        piel: 'Ayuda con la retención y con la sensación de pesadez.' },
      aparte: 'Si acabas el día con las piernas cargadas, ayuda a dejarlas ligeras.' },
    { nombre: 'Respark®', dato: 'Una hora', foto: 'therapy.webp', pos: '40% 50%',
      base: 'Crioterapia a −130&nbsp;°C seguida de un masaje drenante y moldeador. El frío activa el cuerpo y el masaje trabaja la retención.',
      usos: { piel: 'Trabaja la silueta, sesión a sesión.' },
      aparte: 'Si además quieres trabajar la silueta y la retención, es la terapia.' },
    { nombre: 'Masaje facial', dato: 'A mano', foto: 'massage-glow.webp', pos: '34% 40%', solo: 'piel',
      base: 'Un masaje de la cara, a mano, después de la luz roja. Suelta la tensión de los músculos del rostro.',
      usos: { piel: 'El rostro se relaja y refleja descanso.' },
      aparte: '' }
  ],

  /* Cómo se nombra cada tema en «También ayuda con…». «todo» no sale: todo ayuda a cuidarse a largo plazo. */
  USO_CORTO: { energia: 'la energía', descanso: 'el descanso', cabeza: 'la claridad y la calma', cuerpo: 'la fuerza y la recuperación', piel: 'el aspecto físico' },

  /* Lo que la persona eligió. De cada tema: el botón de la pregunta, `deseo` (lo mismo dicho de tú, para el
     título de sus terapias), `para` (la frase que abre la invitación), el título y la explicación de la parte 01,
     `tema` (cómo se nombra en «Otras terapias…») y sus terapias principales, en orden. Las demás salen debajo. */
  AREAS: {
    energia:  { boton: 'Tener más energía en mi día a día', deseo: 'tener más energía en tu día a día', corto: 'Energía',
      para: 'Para seguir haciendo planes con energía.',
      titulo: 'Cuando la energía <em>no acompaña</em>',
      texto: 'Hay épocas en las que la energía no acompaña: cuesta arrancar, o se acaba antes que el día. La energía se produce en las células, y cuando el descanso y la recuperación no acompañan, se nota. Pasa tan poco a poco que se acaba dando por normal.',
      tema: 'tu energía',
      terapias: ['Crioterapia', 'Luz roja', 'Cámara hiperbárica'] },
    descanso: { boton: 'Dormir mejor y levantarme con la sensación de haber descansado', deseo: 'dormir mejor y levantarte con la sensación de haber descansado', corto: 'Descanso',
      para: 'Para que dormir vuelva a ser descansar.',
      titulo: 'Cuando dormir <em>no es descansar</em>',
      texto: 'Duermes tus horas y te levantas igual. Si el sistema nervioso se queda en modo alerta, cuesta llegar al sueño profundo, que es cuando el cuerpo se repara.',
      tema: 'tu descanso',
      terapias: ['PEMF', 'BrainTap', 'Luz roja', 'Crioterapia'] },
    cabeza:   { boton: 'Tener la cabeza más clara y más tranquila', deseo: 'tener la cabeza más clara y más tranquila', corto: 'Claridad y calma',
      para: 'Para que la cabeza también termine la jornada.',
      titulo: 'Cuando la cabeza <em>no para</em>',
      texto: 'Cuando el día no termina al cerrar el portátil, el sistema nervioso se queda en modo alerta y el cortisol, la hormona del estrés, no baja. Rindes igual, pero cuesta estar del todo en la cena.',
      tema: 'tu cabeza',
      terapias: ['Crioterapia', 'BrainTap', 'PEMF'] },
    cuerpo:   { boton: 'Sentir mi cuerpo fuerte y ágil', deseo: 'sentir tu cuerpo fuerte y ágil', corto: 'Fuerza y agilidad',
      para: 'Para que el cuerpo responda como quieres.',
      titulo: 'Cuando el cuerpo <em>no responde igual</em>',
      texto: 'Con los años el cuerpo cambia: cuesta más mantener la fuerza y la agilidad, y tarda más en recuperarse después del esfuerzo. Rendir bien, en el deporte y en el día a día, depende tanto de lo que haces como de cómo te recuperas.',
      tema: 'tu cuerpo',
      terapias: ['Crioterapia', 'Cámara hiperbárica', 'PEMF', 'Presoterapia'] },
    piel:     { boton: 'Sentirme mejor con mi aspecto físico', deseo: 'sentirte mejor con tu aspecto físico', corto: 'Aspecto físico',
      para: 'Para verte tan bien como te sientes.',
      titulo: 'Cuando quieres <em>verte como te sientes</em>',
      texto: 'El aspecto cambia despacio: de un año para otro, no de un mes para otro. Con los años se produce menos colágeno y elastina, que dan firmeza a la piel, y al cuerpo le cuesta más drenar. Cuidarlo también merece un plan.',
      tema: 'tu aspecto',
      terapias: ['Luz roja', 'Respark®', 'Presoterapia', 'Masaje facial'] },
    todo:     { boton: 'Seguir como estoy durante muchos años', deseo: 'seguir como estás durante muchos años', corto: 'Longevidad',
      para: 'Para saber desde dónde empiezas.',
      titulo: 'Vivir más no es <em>vivir mejor</em>',
      texto: 'El envejecimiento no empieza con las primeras arrugas o las canas: empieza mucho antes, cuando el cansancio dura más, cuesta concentrarse o el cuerpo no se recupera como antes. Cuidarse a tiempo es lo que permite seguir haciendo lo que te gusta.',
      tema: 'los años que vienen',
      terapias: ['Cámara hiperbárica', 'Luz roja', 'Crioterapia'] }
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

  /* Nombre, cargo, texto, foto y encuadre. */
  EQUIPO: [
    ['Dra. Miriam Rivera', 'Directora médica', 'Especialista en medicina de la longevidad y oxigenoterapia hiperbárica. Diseña tu plan y lo revisa contigo.', 'dra-miriam-rivera.jpeg', ''],
    ['El equipo de REVO', 'Wellness Coach', 'Tu Wellness Coach te acompaña en cada visita y ajusta el plan con la doctora.', 'metodo-acompanamiento.webp', '50% 30%']
  ],
  FRASE_DRA: { texto: 'Vivir más años no necesariamente significa vivir mejor.', quien: 'Dra. Miriam Rivera' },

  /* Lo que dicen los miembros: los vídeos del archivo del equipo (16-nov-2026), con una frase suya debajo.
     `video` es el nombre sin extensión: en assets/ están el .mp4 (720 × 1280, ya comprimido) y el .webp de la portada.
     Los vídeos llevan los subtítulos pintados. Las frases son literales, recortadas; dos están traducidas. */
  VOCES: [
    { video: 'testimonio-12', texto: 'Yo era uno de los escépticos. La primera vez que lo probé, noté un cambio: tuve mucha más energía de la que pensaba tener.', quien: 'Miembro de REVO desde hace un año' },
    { video: 'testimonio-5', texto: 'Ahora que llevo meses haciéndolo, noto que duermo bien y he empezado a comer mejor. Es como una cadena.', quien: 'Miembro de REVO' },
    { video: 'testimonio-4', texto: 'Desde que hago crioterapia y después la cama de luz roja, me siento con más energía y de mejor ánimo. No me lo esperaba cuando vine.', quien: 'Miembro de REVO · Traducido del inglés' },
    { video: 'testimonio-3', texto: 'El bienestar no es solo nutrición o deporte… REVO es lo que no tenía integrado en mi rutina: la recuperación.', quien: 'Miembro de REVO · Traducido del catalán' }
  ],
  verVideo: 'Ver el vídeo',

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
    ['¿Dónde estáis y qué horario tenéis?', 'En Carrer de Ferran Agulló 24, junto a Turó Park (08021 Barcelona). Abrimos de lunes a viernes de 7:00 a 21:00 y los sábados de 9:00 a 14:00. <a href="https://www.google.com/maps/search/?api=1&query=REVO%20Studios%2C%20Carrer%20de%20Ferran%20Agull%C3%B3%2024%2C%2008021%20Barcelona" target="_blank" rel="noopener">Abrir en Google Maps</a>'],
    ['¿Puedo probar una terapia ese mismo día?', 'Sí. Puedes añadir una o dos: crioterapia, luz roja, PEMF, BrainTap, Pulsetto o presoterapia. Son 40&nbsp;€ una y 60&nbsp;€ dos.'],
    ['¿Puedo cambiar la fecha?', 'Sí, desde el enlace de la confirmación o contestándonos por WhatsApp.'],
    ['Ya hago muchas cosas. ¿Qué me aporta?', 'Orden. Cuidarse bien no es hacer más cosas, sino las que tienen sentido para ti, con constancia. Medir te dice cuáles.'],
    ['¿Es un tratamiento médico?', 'REVO no diagnostica ni trata enfermedades. Si estás embarazada, llevas un marcapasos o tienes una condición médica, cuéntanoslo al llegar: revisamos contigo qué terapias son seguras para ti.'],
    ['¿Y si decido seguir?', 'La membresía REVO Core incluye todas las terapias, hasta dos masajes al mes y tu plan personalizado con seguimiento médico. Son 350&nbsp;€ al mes con un mínimo de tres meses, o 3.500&nbsp;€ al año. La mayoría de miembros viene una o dos veces por semana, una hora cada vez. <a href="membresias.html">Ver la membresía</a>'],
    ['¿Y si vivo fuera de Barcelona?', 'La membresía tiene sentido viniendo cada semana. Si nos visitas de forma puntual o quieres regalarlo, tenemos experiencias de una o dos horas. <a href="experiencias.html">Ver las experiencias</a>']
  ]
};
