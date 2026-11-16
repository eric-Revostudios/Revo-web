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
    menos: 'Menos de lo que querría',

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
    otrasEntrada: 'Lo normal es reconocerse en más de una cosa.',
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
    /* La tarjeta de la invitación (17-nov-2026, pensada para reservar). El valor se dice una vez, como un hecho y
       sin palabras de oferta: ni «gratis», ni «promoción», ni fecha límite (Eric: que no suene cutre). */
    sales: 'Lo medimos en {m} minutos y sales con un plan para ti, te hagas miembro o no.',
    valorRot: 'Valoración', valorPrecio: '100&nbsp;€',
    paraTiRot: 'Para ti', paraTi: 'Corre de nuestra cuenta',
    bajoBoton: 'Sin compromiso · Puedes cambiar la fecha cuando quieras',
    prueba: '4,9 en Google · 48 reseñas',
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

  /* Las terapias (Eric, 17-nov-2026: «piensa individualmente cada texto de cada terapia de cada objetivo»).
     NO hay plantilla: cada terapia tiene, para cada objetivo (energia · descanso · cabeza · cuerpo · piel · todo),
     un texto escrito entero para esa persona. Cada texto es una lista de párrafos; el que empieza por «» » es la
     frase que destaca (puede ir la primera, en medio, la última o no estar). Unos empiezan por lo que la persona
     quiere oír, otros por su duda, otros por una escena: lo que pida cada caso.
     Cómo están escritos: con las frases del equipo (las páginas de cada terapia de la web, el documento de la
     landing de María y los guiones), verbos directos para lo que hace la terapia («baja el cortisol», «activa la
     mitocondria»), lo que se nota contado como experiencia («sales…», «muchos miembros cuentan…») y los
     resultados sin prometer («ayuda a», «con constancia»). De cada terapia se cuenta SOLO lo que le importa a esa
     persona, y cuando la terapia no tiene que ver con su objetivo, se dice lo que es y no se fuerza.
     `specs` es la ficha técnica que sale bajo el nombre en las terapias principales: [cifra, unidad, qué es].
     Cifras: revo-tono (datos.md). Las terapias principales de cada objetivo están en AREAS.terapias y las
     demás, en AREAS.otras, en el orden en que salen. */
  TERAPIAS: [
    { nombre: 'Crioterapia', specs: [['−130', '°C', 'Frío seco'], ['2–3', 'min', 'Sesión']], dato: 'De 2 a 3 minutos · −130&nbsp;°C', foto: 'cryo-chamber.webp', pos: '50% 45%',
      textos: {
        energia: [
          '» Su efecto se percibe desde la primera sesión.',
          'Tres minutos a −130&nbsp;°C, en una cabina de frío seco y con tu coach al lado. El cuerpo responde a ese frío liberando dopamina y noradrenalina y activando el metabolismo: sales con energía, con la cabeza despejada, y vuelves a tu día al instante.',
          'Con regularidad, ese efecto se consolida.' ],
        descanso: [
          'A primera vista, tres minutos a −130&nbsp;°C en una cabina de frío seco parecen lo contrario del descanso. Sin embargo, ese frío reduce el cortisol, la hormona del estrés, que es la que mantiene al cuerpo en alerta.',
          '» Muchos miembros nos cuentan que esa noche duermen mejor.' ],
        cabeza: [
          'Tres minutos a −130&nbsp;°C, en una cabina de frío seco y con tu coach al lado. El frío baja el cortisol y libera dopamina.',
          '» Sales con la cabeza despejada, con una mezcla de energía y calma.',
          'Tres minutos en los que la mente, por una vez, no está en ninguna otra parte.' ],
        cuerpo: [
          'Tres minutos a −130&nbsp;°C, de cuerpo entero. El frío contrae los vasos y, al salir, la sangre vuelve a los músculos con más oxígeno: baja la inflamación y ayuda al cuerpo a recuperarse del esfuerzo.',
          '» Para llegar en mejores condiciones al siguiente entrenamiento, o simplemente al día siguiente.',
          'En Polonia está integrada en la sanidad pública.' ],
        piel: [
          'Es el primer paso del Respark®, y también se hace sola: tres minutos a −130&nbsp;°C que bajan el cortisol, la hormona del estrés, liberan dopamina y desinflaman. En nuestras reseñas hay quien lo describe como «salir como nueva».' ],
        todo: [
          'Tres minutos a −130&nbsp;°C, en una cabina de frío seco. El frío desinflama, activa el metabolismo y baja el cortisol, la hormona del estrés.',
          '» Tres aspectos que conviene cuidar mucho antes de que se hagan notar.',
          'En Polonia está integrada en la sanidad pública.' ] } },
    { nombre: 'Luz roja', specs: [['630–940', 'nm', 'Roja e infrarroja'], ['10–15', 'min', 'Sesión']], dato: 'De 10 a 15 minutos · 630–940&nbsp;nm', foto: 'redlight-chamber.webp', pos: '38% 50%',
      textos: {
        energia: [
          'Diez o quince minutos en una cama de luz roja e infrarroja, cálida y silenciosa. La infrarroja llega hasta cinco centímetros bajo la piel y activa la mitocondria, que es donde cada célula produce su energía.',
          '» Una energía de fondo, que se construye sesión a sesión.',
          'La misma luz estimula el colágeno y la elastina, de modo que la piel también se beneficia.' ],
        descanso: [
          '» Ayuda a regular el reloj interno, el que le dice al cuerpo cuándo toca dormir y cuándo despertar.',
          'Son diez o quince minutos en una cama de luz roja e infrarroja, cálida y silenciosa. Un entorno tan sereno que invita a cerrar los ojos.' ],
        cabeza: [
          'La claridad mental empieza por un buen descanso. La luz roja ayuda a regular el reloj interno, el que le dice al cuerpo cuándo toca dormir. Diez o quince minutos en una cama cálida y silenciosa.' ],
        cuerpo: [
          'La luz infrarroja llega hasta cinco centímetros bajo la piel, hasta el músculo, y activa la mitocondria, que es donde las células producen su energía. Ayuda a la recuperación muscular en diez o quince minutos, sin esfuerzo.' ],
        piel: [
          'La misma luz de las máscaras LED, en una cama de cuerpo entero. La luz roja e infrarroja estimula el colágeno y la elastina, justo lo que el cuerpo produce menos con los años.',
          '» Con constancia, ayuda a que la piel gane firmeza y mejor tono.',
          'Para el rostro contamos además con una máscara de la misma luz. Y aunque su aspecto lo recuerde, no es una cabina de bronceado: no emite radiación ultravioleta.' ],
        todo: [
          'Diez o quince minutos en una cama de luz roja e infrarroja. Activa la mitocondria, de donde sale la energía de las células, y estimula el colágeno y la elastina.',
          '» Es cuidar a tiempo dos cosas que se pierden despacio: la energía y la firmeza.',
          'Aquí la constancia importa más que la intensidad.' ] } },
    { nombre: 'Cámara hiperbárica', specs: [['98', '%', 'Oxígeno'], ['1,9', 'atm', 'Presión'], ['60', 'min', 'Sesión']], dato: '60 minutos · oxígeno al 98&nbsp;%', foto: 'hbot-chamber.webp', pos: '46% 50%',
      textos: {
        energia: [
          'Una hora respirando oxígeno al 98&nbsp;% en una cámara presurizada a 1,9 atmósferas. A esa presión llega a los tejidos hasta diez veces más oxígeno, que es lo que las células necesitan para producir energía y para repararse.',
          '» Ayuda al cuerpo a recuperarse a fondo, y eso se nota en la energía del día a día.',
          'Una hora que puedes dedicar a leer, a trabajar o, sencillamente, a descansar.' ],
        descanso: [
          'El sueño profundo es cuando el cuerpo se repara. La cámara hiperbárica ayuda a esa reparación por otro camino: una hora respirando oxígeno al 98&nbsp;% a 1,9 atmósferas, con hasta diez veces más oxígeno en los tejidos. Una hora que puedes dedicar a leer o a dormir.' ],
        cabeza: [
          'Una hora respirando oxígeno al 98&nbsp;% en una cámara presurizada a 1,9 atmósferas. Llega más oxígeno a todo el cuerpo, también al cerebro, y la mayoría sale con calma y con la cabeza despejada. Y es, además, una hora dedicada solo a ti.' ],
        cuerpo: [
          'Una hora respirando oxígeno al 98&nbsp;% en una cámara presurizada a 1,9 atmósferas. A esa presión llega a los tejidos hasta diez veces más oxígeno, también a donde la sangre apenas alcanza.',
          '» Con más oxígeno, músculos y tejidos se reparan mejor. Por eso se usa antes y después de una operación.',
          'Un miembro la combinó con crioterapia y luz roja para recuperarse de una operación de rodilla.' ],
        piel: [
          'Más oxígeno para que los tejidos se regeneren: una hora respirando oxígeno al 98&nbsp;% a 1,9 atmósferas. Es la tecnología que se usa antes y después de una operación, porque ayuda a los tejidos a repararse.' ],
        todo: [
          'Una hora respirando oxígeno al 98&nbsp;% en una cámara presurizada a 1,9 atmósferas. A esa presión llega a los tejidos hasta diez veces más oxígeno, también a donde la sangre apenas alcanza.',
          '» Ayuda al cuerpo a regenerarse y a repararse, y baja la inflamación.',
          'Es la especialidad de la Dra. Miriam Rivera, directora médica de REVO.' ] } },
    { nombre: 'PEMF', specs: [['20–40', 'min', 'Sesión']], dato: 'De 20 a 40 minutos', foto: 'pemf-hero.webp', pos: '62% 50%',
      textos: {
        energia: [
          'Muchas veces la falta de energía empieza por el descanso. El PEMF, campos electromagnéticos pulsados en todo el cuerpo, activa el modo de descanso y reparación y ayuda a llegar a un sueño más profundo. Sin ningún esfuerzo por tu parte.' ],
        descanso: [
          '» La terapia que acompaña al cuerpo fuera del modo alerta.',
          'Te recuestas y unos campos electromagnéticos pulsados actúan sobre todo el cuerpo: es la magnetoterapia de los fisioterapeutas. No se percibe ninguna corriente; como mucho, un calor suave. El sistema nervioso pasa al modo de descanso y reparación, y eso ayuda a llegar a un sueño más profundo.',
          'Su efecto es acumulativo: la constancia marca la diferencia.' ],
        cabeza: [
          'El estrés no se queda en la cabeza: el cuerpo también sigue en alerta. El PEMF, campos electromagnéticos pulsados en todo el cuerpo, activa el modo contrario, el de descanso y reparación.',
          '» Media hora de reposo que ayuda al cuerpo a entender que la jornada ha terminado.' ],
        cuerpo: [
          'Es la magnetoterapia que usan los fisioterapeutas, aplicada a todo el cuerpo. Los campos electromagnéticos pulsados desinflaman, mejoran la circulación y activan el modo de reparación.',
          '» Muchos miembros salen con el cuerpo más suelto y más ligero.',
          'Su efecto es acumulativo: con constancia, ayuda a recuperarse mejor entre un esfuerzo y el siguiente.' ],
        piel: [
          'El descanso también se ve por fuera. El PEMF, campos electromagnéticos pulsados en todo el cuerpo, activa el modo de descanso y reparación y mejora la circulación.' ],
        todo: [
          'Con los años, al cuerpo le cuesta más descansar y repararse. El PEMF, campos electromagnéticos pulsados en todo el cuerpo, activa justo ese modo, y además desinflama. Es la magnetoterapia de los fisioterapeutas.' ] } },
    { nombre: 'BrainTap', specs: [['15', 'min', 'Sesión'], ['2', 'modos', 'Calma o foco']], dato: '15 minutos', foto: 'braintap-hero.webp', pos: '50% 30%',
      textos: {
        energia: [
          'Quince minutos con unos auriculares de sonido binaural y unas gafas de luz, con los ojos cerrados. Tiene un modo de relajación profunda y otro de foco, para cuando la cabeza se queda sin energía antes que el cuerpo.' ],
        descanso: [
          'Hay noches en las que el cuerpo está cansado y la cabeza sigue en marcha. Para eso es el BrainTap: unos auriculares con sonido binaural y unas gafas de luz que, con los ojos cerrados, llevan al cerebro a la relajación profunda.',
          '» Quince minutos, sin ningún esfuerzo. Y con el uso, al cerebro le resulta cada vez más fácil volver a ese estado.' ],
        cabeza: [
          'Te pones unos auriculares y unas gafas de luz, cierras los ojos y una voz te guía. El sonido binaural y la luz llevan al cerebro a la relajación profunda, sin que tengas que hacer nada.',
          '» Baja el ruido mental y vuelve la claridad.',
          'Tiene también un modo de foco, para cuando lo que falta es concentración.' ],
        cuerpo: [
          'El rendimiento también empieza en la mente. Quince minutos de sonido binaural y luz, con los ojos cerrados, que llevan al cerebro a la relajación profunda o al foco, según lo que necesites ese día.' ],
        piel: [
          'Quince minutos de sonido binaural y luz, con los ojos cerrados, que llevan al cerebro a la relajación profunda. Para los días en que lo que necesita descanso es la mente.' ],
        todo: [
          'Cuidarse a largo plazo también es cuidar la cabeza. Quince minutos de sonido binaural y luz que llevan al cerebro a la relajación profunda o al foco. Cuanto más se usa, más se entrena.' ] } },
    { nombre: 'Presoterapia', specs: [['20–30', 'min', 'Sesión']], dato: 'De 20 a 30 minutos', foto: 'presoterapia-hero.webp', pos: '50% 40%',
      textos: {
        energia: [
          'El cansancio también se nota en las piernas. Unas botas de aire las comprimen de los pies a la cadera, drenan la retención y activan la circulación. La sensación al terminar es de piernas ligeras.' ],
        descanso: [
          'Unas botas de aire que comprimen las piernas de los pies a la cadera, con una presión rítmica y envolvente. Drenan la retención y activan la circulación, y resulta muy relajante.' ],
        cabeza: [
          'Unas botas de aire que comprimen las piernas de los pies a la cadera, drenan la retención y activan la circulación. Mientras, puedes leer o simplemente desconectar.' ],
        cuerpo: [
          'Unas botas de aire que se inflan por tramos, de los pies a la cadera, y empujan la circulación hacia arriba.',
          '» Descargan las piernas después de entrenar, o de un día entero de pie.',
          'Es la recuperación que usan los deportistas.' ],
        piel: [
          'Con los años, al cuerpo le cuesta más drenar. Estas botas de aire le ayudan: se inflan por tramos, de los pies a la cadera, y empujan los líquidos hacia arriba, como un drenaje linfático.',
          '» Ayudan a reducir la retención y dejan una sensación de ligereza.' ],
        todo: [
          'Unas botas de aire que comprimen las piernas de los pies a la cadera. Drenan la retención y activan la circulación, que también forma parte de cuidarse.' ] } },
    { nombre: 'Respark®', specs: [['−130', '°C', 'Crioterapia'], ['60', 'min', 'Sesión']], dato: 'Una hora', foto: 'therapy.webp', pos: '40% 50%',
      textos: {
        energia: [
          'Empieza con los mismos tres minutos de crioterapia y sigue con un masaje drenante y moldeador, el Método Lilium. Una hora pensada para la silueta y la retención, si también es algo que deseas cuidar.' ],
        descanso: [
          'Crioterapia seguida de un masaje drenante y moldeador, el Método Lilium. Es la terapia de la silueta y la retención, y una hora de la que se sale con una calma real.' ],
        cabeza: [
          'Tres minutos de crioterapia y, después, un masaje drenante y moldeador, el Método Lilium. Está pensada para la silueta y la retención, y es una hora en la que alguien cuida de ti.' ],
        cuerpo: [
          'Primero el frío y después las manos: crioterapia y un masaje drenante y moldeador, el Método Lilium. Está pensada para la silueta y la retención, y suma recuperación.' ],
        piel: [
          'Primero el frío y después las manos. Tres minutos de crioterapia a −130&nbsp;°C contraen los vasos; al salir se abren de nuevo, y sobre esa respuesta se trabaja un masaje drenante y moldeador, el Método Lilium.',
          '» Se nota en la retención y en la silueta, y mejora con la constancia.',
          'Es un método propio de REVO, y dura una hora.' ],
        todo: [
          'Crioterapia seguida de un masaje drenante y moldeador, el Método Lilium. Es la terapia de la silueta y la retención, si cuidar tu imagen también forma parte de tu plan.' ] } },
    { nombre: 'Masaje facial', specs: [], dato: 'A mano', foto: 'massage-glow.webp', pos: '34% 40%',
      textos: {
        piel: [
          'Un masaje a mano que trabaja los músculos de la cara, después de la luz roja. Reactiva la circulación y completa el trabajo de la luz.',
          '» Suelta la tensión del rostro, y la expresión queda más descansada.' ] } }
  ],

  /* Lo que la persona eligió. De cada tema: el botón de la pregunta, `deseo` (lo mismo dicho de tú, para el
     título de sus terapias), `para` (la frase que abre la invitación), el título y la explicación de la parte 01,
     sus terapias principales (`terapias`) y las demás (`otras`), en el orden en que salen. */
  AREAS: {
    energia:  { boton: 'Tener más energía en mi día a día', deseo: 'tener más energía en tu día a día', corto: 'Energía',
      para: 'Para seguir haciendo planes con energía.',
      titulo: 'Cuando la energía <em>no acompaña</em>',
      texto: 'Hay épocas en las que la energía no acompaña: cuesta arrancar, o se acaba antes que el día. La energía se produce en las células, y cuando el descanso y la recuperación no acompañan, se nota. Pasa tan poco a poco que se acaba dando por normal.',
      tema: 'tu energía',
      terapias: ['Crioterapia', 'Luz roja', 'Cámara hiperbárica'],
      otras: ['PEMF', 'BrainTap', 'Presoterapia', 'Respark®'] },
    descanso: { boton: 'Dormir mejor y levantarme con la sensación de haber descansado', deseo: 'dormir mejor y levantarte con la sensación de haber descansado', corto: 'Descanso',
      para: 'Para que dormir vuelva a ser descansar.',
      titulo: 'Cuando dormir <em>no es descansar</em>',
      texto: 'Duermes tus horas y te levantas igual. Si el sistema nervioso se queda en modo alerta, cuesta llegar al sueño profundo, que es cuando el cuerpo se repara.',
      tema: 'tu descanso',
      terapias: ['PEMF', 'BrainTap', 'Luz roja', 'Crioterapia'],
      otras: ['Cámara hiperbárica', 'Presoterapia', 'Respark®'] },
    cabeza:   { boton: 'Tener la cabeza más clara y más tranquila', deseo: 'tener la cabeza más clara y más tranquila', corto: 'Claridad y calma',
      para: 'Para que la cabeza también termine la jornada.',
      titulo: 'Cuando la cabeza <em>no para</em>',
      texto: 'Cuando el día no termina al cerrar el portátil, el sistema nervioso se queda en modo alerta y el cortisol, la hormona del estrés, no baja. Rindes igual, pero cuesta estar del todo en la cena.',
      tema: 'tu cabeza',
      terapias: ['Crioterapia', 'BrainTap', 'PEMF'],
      otras: ['Luz roja', 'Cámara hiperbárica', 'Presoterapia', 'Respark®'] },
    cuerpo:   { boton: 'Sentir mi cuerpo fuerte y ágil', deseo: 'sentir tu cuerpo fuerte y ágil', corto: 'Fuerza y agilidad',
      para: 'Para que el cuerpo responda como quieres.',
      titulo: 'Cuando el cuerpo <em>no responde igual</em>',
      texto: 'Con los años el cuerpo cambia: cuesta más mantener la fuerza y la agilidad, y tarda más en recuperarse después del esfuerzo. Rendir bien, en el deporte y en el día a día, depende tanto de lo que haces como de cómo te recuperas.',
      tema: 'tu cuerpo',
      terapias: ['Crioterapia', 'Cámara hiperbárica', 'PEMF', 'Presoterapia'],
      otras: ['Luz roja', 'BrainTap', 'Respark®'] },
    piel:     { boton: 'Sentirme mejor con mi aspecto físico', deseo: 'sentirte mejor con tu aspecto físico', corto: 'Aspecto físico',
      para: 'Para verte tan bien como te sientes.',
      titulo: 'Cuando quieres <em>verte como te sientes</em>',
      texto: 'El aspecto cambia despacio: de un año para otro, no de un mes para otro. Con los años se produce menos colágeno y elastina, que dan firmeza a la piel, y al cuerpo le cuesta más drenar. Cuidarlo también merece un plan.',
      tema: 'tu aspecto',
      terapias: ['Luz roja', 'Respark®', 'Presoterapia', 'Masaje facial'],
      otras: ['Crioterapia', 'Cámara hiperbárica', 'PEMF', 'BrainTap'] },
    todo:     { boton: 'Seguir como estoy durante muchos años', deseo: 'seguir como estás durante muchos años', corto: 'Longevidad',
      para: 'Para saber desde dónde empiezas.',
      titulo: 'Vivir más no es <em>vivir mejor</em>',
      texto: 'El envejecimiento no empieza con las primeras arrugas o las canas: empieza mucho antes, cuando el cansancio dura más, cuesta concentrarse o el cuerpo no se recupera como antes. Cuidarse a tiempo es lo que permite seguir haciendo lo que te gusta.',
      tema: 'los años que vienen',
      terapias: ['Cámara hiperbárica', 'Luz roja', 'Crioterapia'],
      otras: ['PEMF', 'BrainTap', 'Presoterapia', 'Respark®'] }
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
    ['Medimos cómo estás', 'Edad biológica, composición corporal e índice de estrés. Tres mediciones sencillas: lo que no se nota desde dentro.'],
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
