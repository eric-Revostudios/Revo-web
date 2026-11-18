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

  /* «Otras terapias que también pueden ayudarte», debajo de las de su tema. Apagado el 18-nov-2026. */
  OTRAS_VISIBLES: false,

  /* Las plazas que QUEDAN («Quedan 7 de 20»). Apagado (Eric, 18-nov-2026: «que no salga de momento»): la tarjeta
     dice solo «20 plazas en noviembre · Quedan 12 días» y la página no pregunta nada a /api/plazas.
     Para encenderlo hacen falta dos cosas: la puerta de la Platform que cuenta las reservas reales (contrato en
     api/plazas.js) y poner esto en true. */
  PLAZAS_CONTADAS: false,

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
    /* 18-nov-2026 (la jefa de Eric): arriba hay que decir qué se va a encontrar la persona y cuánto tarda, y que
       se vea en qué paso está. Por eso el titular empieza por «En 2 minutos», la línea de debajo dice que son
       tres respuestas y qué recibe a cambio, y encima va «Paso 1 de 3» con sus tres tramos. */
    paso: 'Paso {n} de 3',
    titular1: 'En 2 minutos, descubre qué terapias pueden ayudarte a volver a sentirte <em class="n">al 100&nbsp;%</em>.',
    titular1icp5: 'En 2 minutos, descubre qué terapias pueden ayudarte a seguir sintiéndote <em class="n">al 100&nbsp;%</em>.',
    sub1: 'Tres respuestas rápidas y te enseñamos cuáles encajan contigo, y por qué.',
    pregunta1: 'Hoy me siento al…',
    pista1: 'Desliza el círculo hasta cómo te sientes hoy.',

    /* 2 · lo que ya haces */
    pregunta2: 'Así <em>me cuido hoy</em>',
    pista2: 'Marca todo lo que ya forma parte de tu vida.',
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
    parte3: 'Lo más importante',
    parte4: 'Tu punto de partida',
    parte5: 'Quién lo vive y quién está detrás',
    parte6: 'Antes de venir',
    /* El tramo final de /tu-punto, contraído (18-nov-2026, la jefa de Eric: «demasiado largo… sacarle el so what
       real y hacerlos venir»). Donde antes había dos secciones (medir + invitación con sus pasos largos) ahora hay
       UNA: el «so what» en una frase (para darte un plan, primero hay que saber cómo está tu sistema nervioso),
       dos líneas, la tarjeta de la invitación y los cuatro pasos en una palabra cada uno.
       Lo que la persona marcó en la segunda pregunta se dice aquí, en una frase, delante de `pasoInvita`.
       /punto-de-partida conserva su tramo largo (parte3 y parte4 de arriba). */
    partePaso: 'Tu plan personalizado',
    pasoTitulo: 'El primer paso es saber <em>cómo está hoy tu sistema nervioso autónomo</em>',
    pasoTexto: 'De eso depende qué terapias son para ti y con qué frecuencia. Se mide en {m} minutos y se resume en un número: tu edad biológica.',
    pasoTextoSinMinutos: 'De eso depende qué terapias son para ti y con qué frecuencia. Se mide y se resume en un número: tu edad biológica.',
    pasoInvita: 'Si has llegado hasta aquí, es que te interesa de verdad. Por eso queremos invitarte a medirlo.',
    yaHaces: 'Ya {lista}.',
    yaHacesMenos: 'Ya {lista}, aunque menos de lo que querrías.',
    soloMenos: 'Te cuidas menos de lo que querrías, y no pasa nada.',
    /* El hilo de la página (17-nov-2026, Eric con la agencia). La landing promete «qué terapias pueden ayudarte»
       y lo cumple, pero el discurso es el sistema nervioso autónomo. Leyendo solo los titulares tiene que
       quedar: esto te pasa → detrás está tu sistema nervioso autónomo → estas terapias le ayudan → lo más
       importante es saber cómo está el tuyo hoy → te invitamos a medirlo (tu edad biológica).
       Las frases de qué se mide son las del informe de valoración del equipo. Nada promete un resultado. */
    /* 01 · lo que hay detrás */
    detrasTitulo: 'Detrás está tu <em>sistema nervioso autónomo</em>',
    detrasTexto: 'Regula, sin que lo decidas, cómo duermes, cómo te recuperas y cuánta energía tienes. Tiene dos modos, activación y recuperación, y funciona bien cuando pasa de uno a otro.',
    modoA: 'Activación',
    modoB: 'Recuperación',
    /* 02 · las terapias, contadas desde el sistema nervioso. De cada una se ve la frase de para qué sirve;
       el resto se abre con «Cómo funciona». Cada área puede traer su propio titular y entrada (`titulo2`, `entrada2`). */
    terapiasSna: 'Terapias que ayudan a tu <em>sistema nervioso autónomo</em>',
    terapiasSnaEntrada: 'Unas actúan directamente sobre él. Otras, sobre lo que lo mantiene en alerta: la inflamación, la tensión, el cansancio acumulado.',
    leerMas: 'Cómo funciona',
    /* 03 · lo más importante: saber cómo está hoy */
    medirTitulo: 'Lo más importante es saber <em>cómo está hoy el tuyo</em>',
    medirPorque: 'Qué terapias son para ti, y con qué frecuencia, depende de eso. Y se puede medir: leyendo la variabilidad de tu pulso se ve cuánta carga lleva tu sistema nervioso, cómo se recupera y cuánta energía tiene disponible.',
    medirQue: 'El resultado se resume en un número, tu <em>edad biológica</em>: el estado real de tu organismo comparado con los años que tienes.',
    medirCambia: 'No es un número fijo. Cambia con cómo descansas, cómo te recuperas y cómo te cuidas, y por eso sirve de punto de partida.',
    ejeMenos: 'Menos años',
    ejeTu: 'Tu edad',
    ejeMas: 'Más años',
    ejeBio: 'Edad biológica',
    ejeEstado: 'Por medir',
    sabrasTitulo: 'Lo que vas a saber',
    sabrasPie: 'Pone números a sensaciones como el cansancio, la claridad mental, la tensión o la calma.',
    saberlo: 'Saberlo lleva <em>{m} minutos.</em>',
    saberloSinMinutos: 'Saberlo es <em>sencillo.</em>',
    /* 02 · sus terapias y las demás, en el mismo formato de lista. {deseo} es lo que eligió, dicho de tú. */
    terapiasTuyas: 'Lo que puede ayudarte a <em>{deseo}</em>',
    terapiasEntrada: 'Tecnología que hasta hace poco solo usaban deportistas de élite, con más de 20 años de ciencia detrás.',
    /* «Otras terapias» ya no se enseña (18-nov-2026, la jefa de Eric: «parece que le vendemos todo»). Los textos
       siguen escritos en TERAPIAS y en AREAS.otras; para volver a enseñarlas basta poner OTRAS_VISIBLES en true. */
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
    invita: 'Te invitamos a conocer tu <em>edad biológica</em>',
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
    /* La tarjeta, a lo mínimo (Eric, 17-nov-2026: «muchas menos cosas, solo lo importante»): título, su frase,
       las tres lecturas, una línea de valor, el botón y una línea de garantías. */
    valor: 'Valorada en 100&nbsp;€. Al reservarla desde esta invitación, corre de nuestra cuenta.',
    terapiaDia: 'Si quieres probar una terapia ese mismo día, escríbenos y te la reservamos.',
    /* Las plazas (Eric, 18-nov-2026): 20 al mes. Cuando se reservan las 20, se abren las del mes siguiente.
       El número de las que quedan lo da /api/plazas con las reservas DE VERDAD; si no lo sabe, se dice solo
       cuántas hay y no se inventa cuántas quedan. {mes} es el mes de esas plazas. */
    plazasMes: 'Plazas de {mes}',
    plazasQuedan: 'Quedan {n} de {de}',
    plazasQueda1: 'Queda 1 de {de}',
    plazasSinDato: '{de} plazas en {mes}',
    plazasDias: 'Quedan {n} días',
    plazasDia1: 'Queda 1 día',
    plazasHoy: 'Último día',
    plazasHasta: 'Hasta el {d} de {mes}',
    MESES: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    bajoBoton: '{m} minutos · Sin compromiso',
    waCorto: 'Pregúntanos por WhatsApp',
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
    cierre: 'Te invitamos a conocer tu edad biológica. Sin coste y sin compromiso.',
    marca: 'Wellbeing. Revolved.',
    direccion: 'Carrer de Ferran Agulló 24, Turó Park · 08021 Barcelona',
    horario: 'De lunes a viernes de 7:00 a 21:00 · Sábados de 9:00 a 14:00',
    legal: 'Tu punto de partida no es una consulta médica ni sustituye a tu médico.',
    privacidad: 'Privacidad',
    cookies: 'Cookies'
  },

  /* La landing solo de oferta (/punto-de-partida). Es la B del test A/B con /tu-punto: sin preguntas, una sola
     página que vende la valoración (la edad biológica). Rehecha el 18-nov-2026 (Eric: «que transmita lo mismo que
     conseguimos con /tu-punto, pero hablando solo de la oferta»).
     La A lleva a la persona a tres conclusiones haciéndole contestar; aquí se las damos escritas, en el mismo orden,
     y cada una es un motivo para aceptar la invitación:
       · primera pregunta de la A (el porcentaje)  → 01 «Sentirse bien no es estar al 100 %»
       · tercera (qué haría con lo que falta)      → 01, los seis deseos: los MISMOS seis de la A, dichos de tú
       · segunda (cómo me cuido)                   → 02, «le pasa también a quien se cuida»: desde dentro no se nota
       · el resultado (sistema nervioso autónomo)  → 02 y 03: lo que hay detrás, y que se puede medir
       · las terapias                              → 04, UNA sola pantalla: no se explican, se enseñan como lo que
                                                     compone el plan con el que sales (el «para qué» del dato)
     Leyendo solo los titulares tiene que quedar el argumento entero: ¿y la edad de tu cuerpo? → sentirse bien no es
     estar al 100 % → detrás está tu sistema nervioso autónomo → se puede medir → con ese dato, un plan → te invitamos.
     La oferta completa (qué, dónde, cuánto dura, qué cuesta) está en la primera pantalla con su botón: quien ya lo
     tiene claro no necesita bajar. */
  OFERTA: {
    heroOjo: 'Tu punto de partida',
    heroTitulo: 'La edad del calendario ya la sabes. <em>¿Y la de tu cuerpo?</em>',
    heroSub: 'Te invitamos a conocer tu edad biológica: una valoración de {m} minutos en REVO, en Turó Park (Barcelona), con acompañamiento médico.',
    heroPie: '{m} minutos · Sin compromiso · Valorada en 100&nbsp;€',

    /* 01 · el porcentaje y lo que harías con lo que falta */
    cienRotulo: 'Cómo estás hoy',
    cienTitulo: 'Sentirse bien <em>no es estar al 100&nbsp;%</em>',
    cienTexto: 'Casi nadie diría que está mal. Pero si te preguntaran a qué porcentaje estás hoy, es probable que no dijeras cien.',
    cienHoy: 'Hoy',
    cienFalta: 'Lo que falta',
    cienTope: '100&nbsp;%',
    notasEntrada: 'Con lo que falta, a cada persona le gustaría algo distinto:',
    /* Los seis deseos de la tercera pregunta de /tu-punto (AREAS.*.boton), dichos de tú y en el mismo orden. */
    notas: [
      'Tener más energía en el día a día.',
      'Dormir mejor y levantarte con la sensación de haber descansado.',
      'Tener la cabeza más clara y más tranquila.',
      'Sentir el cuerpo fuerte y ágil.',
      'Sentirte mejor con tu aspecto físico.',
      'Seguir como estás durante muchos años.'
    ],
    notasCierre: 'Parecen cosas distintas. Casi siempre tienen algo en común.',

    /* 02 · lo que hay detrás, y por qué cuidarse no basta para saberlo */
    detrasRotulo: 'Lo que hay detrás',
    detrasMas: 'Cuando pasa demasiado tiempo en activación, se nota: en cómo duermes, en la energía, en la cabeza y en cómo se recupera el cuerpo. Ocurre tan poco a poco que se acaba dando por normal.',
    cuidas: 'Y le pasa también a quien se cuida. Puedes entrenar, cuidar lo que comes y dormir tus horas, y que tu sistema nervioso siga en alerta. Desde dentro no se nota.',

    /* 03 · se puede medir */
    medirRotulo: 'Lo que vas a saber',
    medirTitulo: 'Y se puede <em>medir</em>',
    medirPorque: 'Con una lectura de la variabilidad de tu pulso, en reposo, se ve cuánta carga lleva tu sistema nervioso, cómo se recupera y cuánta energía tiene disponible.',

    /* 04 · para qué sirve el dato: el plan, y de qué está hecho. Las terapias salen aquí y solo aquí: nombre, foto
       y qué es, sin explicar ninguna (eso lo hace /tu-punto). Cifras de revo-tono (datos.md). */
    planRotulo: 'Para qué sirve',
    planTitulo: 'Con ese dato, <em>un plan para ti</em>',
    planCambia: 'Tu edad biológica no es un número fijo. Cambia con cómo descansas, cómo te recuperas y cómo te cuidas.',
    planTexto: 'En REVO trabajamos con terapias que ayudan a tu cuerpo a recuperarse y a tu sistema nervioso a bajar el ritmo. Es tecnología que hasta hace poco solo usaban deportistas de élite, con más de 20 años de ciencia detrás.',
    terapias: [
      ['Crioterapia', 'Frío seco a −130&nbsp;°C, tres minutos', 'cryo-chamber.webp', '50% 45%'],
      ['Luz roja', 'Luz roja e infrarroja, de cuerpo entero', 'redlight-chamber.webp', '38% 50%'],
      ['Cámara hiperbárica', 'Oxígeno al 98&nbsp;%, a presión', 'hbot-chamber.webp', '46% 50%'],
      ['PEMF', 'Campos electromagnéticos pulsados', 'pemf-hero.webp', '62% 50%']
    ],
    planCierre: 'Cuáles tienen sentido para ti, y con qué frecuencia, depende de cómo estés hoy. Por eso se empieza midiendo.',

    /* 05 · la invitación. `porque` contesta a «¿y por qué me invitáis?» sin palabras de oferta. */
    invitaRotulo: 'Tu punto de partida',
    porque: 'Preferimos que conozcas REVO midiendo algo tuyo que leyendo sobre nosotros. Por eso la valoración corre de nuestra cuenta.',
    para: 'Para saber desde dónde empiezas.'
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
          '» Tres minutos de frío hacen que el cuerpo libere dopamina y noradrenalina y active el metabolismo. Sales con energía y con la cabeza despejada, desde la primera sesión.',
          'A −130&nbsp;°C, el frío es un estímulo breve e intenso. Los vasos se contraen y, al salir, se dilatan: la sangre vuelve a circular con más oxígeno, y el cuerpo responde activándose.',
          'Entras en una cabina de frío seco, de cuerpo entero, con guantes y calcetines y con tu coach al lado. Son dos o tres minutos; contando equiparte y salir, un cuarto de hora.',
          'El efecto se nota el mismo día y se consolida con regularidad. Lo habitual son dos o tres sesiones por semana.' ],
        descanso: [
          '» El frío baja el cortisol, la hormona que mantiene al cuerpo en alerta, y libera endorfinas. Con el cuerpo fuera de ese estado cuesta menos llegar al sueño profundo: muchos miembros lo notan esa misma noche.',
          'Tres minutos a −130&nbsp;°C parecen lo contrario del descanso. Es un estímulo corto e intenso, y lo que viene después es la respuesta del cuerpo: se relaja.',
          'Entras en una cabina de frío seco, de cuerpo entero, con guantes y calcetines y con tu coach al lado. Son dos o tres minutos; contando equiparte y salir, un cuarto de hora.',
          'Se consolida con regularidad: lo habitual son dos o tres sesiones por semana.' ],
        cabeza: [
          '» Durante tres minutos a −130&nbsp;°C la mente no puede estar en otra parte. Al salir, el cortisol ha bajado y el cuerpo ha liberado dopamina y noradrenalina: cabeza despejada, más foco y mejor ánimo.',
          'El frío intenso es un estímulo breve que el cuerpo contesta por dentro: baja la hormona del estrés y suben las que dan foco y buen ánimo. Además desinflama y mejora la oxigenación.',
          'Entras en una cabina de frío seco, de cuerpo entero, con guantes y calcetines y con tu coach al lado. Son dos o tres minutos; contando equiparte y salir, un cuarto de hora.',
          'Se nota desde la primera sesión, y con regularidad el efecto se consolida.' ],
        cuerpo: [
          '» El frío contrae los vasos y, al salir, la sangre vuelve a los músculos con más oxígeno. Baja la inflamación y el dolor muscular, y ayuda a llegar en mejores condiciones al siguiente esfuerzo.',
          'Son tres minutos a −130&nbsp;°C, de cuerpo entero. Ese contraste, contraer y dilatar, es lo que reduce la inflamación de músculos y articulaciones y acelera la recuperación.',
          'Entras en una cabina de frío seco, de cuerpo entero, con guantes y calcetines y con tu coach al lado. Son dos o tres minutos; contando equiparte y salir, un cuarto de hora.',
          'Para recuperarse, lo habitual son dos o tres sesiones por semana, y más en épocas de carga. En Polonia forma parte de la sanidad pública.' ],
        piel: [
          '» Desinflama y activa la circulación, y la piel recibe más oxígeno. Es el primer paso del Respark®, y también se hace sola.',
          'Son tres minutos a −130&nbsp;°C en una cabina de frío seco, con tu coach al lado. En nuestras reseñas hay quien lo describe como «salir como nueva».' ],
        todo: [
          '» La inflamación y el estrés sostenidos no se notan hasta que llevan tiempo. El frío actúa sobre los dos: desinflama, baja el cortisol y activa el metabolismo y las defensas.',
          'Tres minutos a −130&nbsp;°C son un estímulo breve e intenso. Los vasos se contraen y se dilatan, mejora la oxigenación y el cuerpo pone en marcha sus mecanismos de defensa y regeneración.',
          'Entras en una cabina de frío seco, de cuerpo entero, con guantes y calcetines y con tu coach al lado. Son dos o tres minutos; contando equiparte y salir, un cuarto de hora.',
          'Es una terapia de constancia: dos o tres sesiones por semana. En Polonia forma parte de la sanidad pública.' ] } },
    { nombre: 'Luz roja', specs: [['630–940', 'nm', 'Roja e infrarroja'], ['10–15', 'min', 'Sesión']], dato: 'De 10 a 15 minutos · 630–940&nbsp;nm', foto: 'redlight-chamber.webp', pos: '38% 50%',
      textos: {
        energia: [
          '» La energía se produce dentro de cada célula, en la mitocondria. La luz roja e infrarroja llega hasta ella y la activa, y eso ayuda a tener una energía más estable a lo largo del día.',
          'Es luz de 630 a 940 nanómetros. La infrarroja penetra hasta cinco centímetros bajo la piel y eleva el ATP, la energía que usan las células para todo lo que hacen. También modula la inflamación.',
          'Te recuestas en una cama de cuerpo entero, cálida y silenciosa, durante diez o quince minutos. No da calor intenso ni emite radiación ultravioleta: no es una cabina de bronceado.',
          'Aquí la constancia importa más que la intensidad: lo habitual son dos o tres sesiones por semana. La misma luz estimula el colágeno y la elastina, así que la piel también se beneficia.' ],
        descanso: [
          '» El cuerpo tiene un reloj interno que marca cuándo toca dormir y cuándo despertar. La luz roja ayuda a regularlo y baja la inflamación, y eso favorece un sueño más profundo y reparador.',
          'Es luz roja e infrarroja de 630 a 940 nanómetros, que llega hasta la célula. Además de regular los ritmos del sueño, activa la mitocondria, de donde sale la energía con la que el cuerpo se repara por la noche.',
          'Te recuestas en una cama de cuerpo entero, cálida y silenciosa, durante diez o quince minutos. Es un entorno tan sereno que es fácil quedarse dormido.',
          'Aquí la constancia importa más que la intensidad: lo habitual son dos o tres sesiones por semana.' ],
        cabeza: [
          '» La claridad mental empieza por dormir bien. La luz roja ayuda a regular el reloj interno, el que marca cuándo toca dormir, y favorece un descanso más reparador.',
          'Diez o quince minutos en una cama de cuerpo entero, cálida y silenciosa.' ],
        cuerpo: [
          '» La luz infrarroja llega hasta cinco centímetros bajo la piel, hasta el músculo. Activa la energía de las células y modula la inflamación, y eso ayuda a la recuperación muscular.',
          'Diez o quince minutos en una cama de cuerpo entero, sin ningún esfuerzo.' ],
        piel: [
          '» Estimula el colágeno y la elastina, que dan firmeza a la piel y que el cuerpo produce menos con los años. Con constancia, la piel gana firmeza, textura y mejor tono.',
          'La luz roja e infrarroja, de 630 a 940 nanómetros, llega hasta la célula y activa su energía. Con ella la piel se repara mejor y produce más colágeno. No emite radiación ultravioleta: no es una cabina de bronceado.',
          'Te recuestas en una cama de cuerpo entero, cálida y silenciosa, durante diez o quince minutos. Para el rostro contamos además con una máscara de la misma luz.',
          'Aquí la constancia importa más que la intensidad: lo habitual son dos o tres sesiones por semana.' ],
        todo: [
          '» Con los años las células producen menos energía y la piel, menos colágeno. Esta luz actúa sobre las dos cosas: activa la mitocondria y estimula el colágeno y la elastina.',
          'Es luz de 630 a 940 nanómetros; la infrarroja penetra hasta cinco centímetros. Eleva la energía de las células, reduce el estrés oxidativo y modula la inflamación.',
          'Te recuestas en una cama de cuerpo entero, cálida y silenciosa, durante diez o quince minutos. No da calor intenso ni emite radiación ultravioleta: no es una cabina de bronceado.',
          'Aquí la constancia importa más que la intensidad: lo habitual son dos o tres sesiones por semana.' ] } },
    { nombre: 'Cámara hiperbárica', specs: [['98', '%', 'Oxígeno'], ['1,5', 'atm', 'Presión'], ['60', 'min', 'Sesión']], dato: '60 minutos · oxígeno al 98&nbsp;%', foto: 'hbot-chamber.webp', pos: '46% 50%',
      textos: {
        energia: [
          '» Con hasta diez veces más oxígeno en los tejidos, las células producen más energía y el cuerpo se recupera a fondo: del trabajo, del deporte, de dormir poco. Eso es lo que se nota en el día a día.',
          'En la cámara respiras oxígeno al 98&nbsp;% a 1,5 atmósferas. A esa presión el oxígeno se disuelve en el plasma de la sangre y alcanza tejidos a los que normalmente apenas llega: hasta diez veces más oxígeno. El oxígeno es lo que las células necesitan para producir energía y para repararse.',
          'Es una cámara individual y la sesión dura una hora. Puedes leer, trabajar o dormir. Al principio se nota una ligera presión en los oídos, como en un avión, y pasa enseguida.' ],
        descanso: [
          '» El sueño profundo es cuando el cuerpo se repara. La cámara ayuda a esa reparación por otro camino: lleva a los tejidos hasta diez veces más oxígeno y baja la inflamación.',
          'Es una hora respirando oxígeno al 98&nbsp;% a 1,5 atmósferas. Puedes leer o dormir.' ],
        cabeza: [
          '» El cerebro es de los órganos que más oxígeno consumen. Con más oxígeno mejora su riego, y eso ayuda a recuperar atención, memoria y claridad mental.',
          'En la cámara respiras oxígeno al 98&nbsp;% a 1,5 atmósferas. A esa presión el oxígeno se disuelve en el plasma de la sangre y alcanza tejidos a los que normalmente apenas llega: hasta diez veces más oxígeno. También al cerebro.',
          'Es una cámara individual y la sesión dura una hora. Puedes leer, trabajar o dormir. Al principio se nota una ligera presión en los oídos, como en un avión, y pasa enseguida. La mayoría sale relajada y con la cabeza despejada.' ],
        cuerpo: [
          '» Lleva oxígeno a los tejidos a los que la sangre apenas llega, que son los que más tardan en repararse. Baja la inflamación y ayuda a que músculos y tejidos se recuperen después de un esfuerzo o de una lesión.',
          'En la cámara respiras oxígeno al 98&nbsp;% a 1,5 atmósferas. A esa presión el oxígeno se disuelve en el plasma de la sangre y alcanza tejidos a los que normalmente apenas llega: hasta diez veces más oxígeno. Con más oxígeno se estimula la regeneración celular y la cicatrización: por eso se usa antes y después de una operación.',
          'Es una cámara individual y la sesión dura una hora. Puedes leer, trabajar o dormir. Al principio se nota una ligera presión en los oídos, como en un avión, y pasa enseguida.',
          'Un miembro la combinó con crioterapia y luz roja para recuperarse de una operación de rodilla.' ],
        piel: [
          '» Con más oxígeno, los tejidos se regeneran y cicatrizan mejor. Por eso se usa antes y después de una operación.',
          'Es una hora respirando oxígeno al 98&nbsp;% a 1,5 atmósferas, en una cámara individual.' ],
        todo: [
          '» Con los años el cuerpo se repara más despacio, mucho antes de que se note por fuera. Con hasta diez veces más oxígeno en los tejidos se estimula la regeneración celular y baja la inflamación.',
          'En la cámara respiras oxígeno al 98&nbsp;% a 1,5 atmósferas. A esa presión el oxígeno se disuelve en el plasma de la sangre y alcanza tejidos a los que normalmente apenas llega: hasta diez veces más oxígeno. Estimula la reparación de los tejidos y potencia la energía de las células.',
          'Es una cámara individual y la sesión dura una hora. Puedes leer, trabajar o dormir. Al principio se nota una ligera presión en los oídos, como en un avión, y pasa enseguida.',
          'Es la especialidad de la Dra. Miriam Rivera, directora médica de REVO.' ] } },
    { nombre: 'PEMF', specs: [['20–40', 'min', 'Sesión']], dato: 'De 20 a 40 minutos', foto: 'pemf-hero.webp', pos: '62% 50%',
      textos: {
        energia: [
          '» Muchas veces la falta de energía empieza por un descanso que no repara. El PEMF lleva al cuerpo al modo de descanso y reparación, y mejora la forma en que las células aprovechan el oxígeno.',
          'Son campos electromagnéticos pulsados en todo el cuerpo. Te recuestas en un sillón entre 20 y 40 minutos y no se nota ninguna corriente.' ],
        descanso: [
          '» Lleva al sistema nervioso del modo alerta al de descanso y reparación. Con el cuerpo en ese modo, cuesta menos llegar al sueño profundo.',
          'El cuerpo funciona con señales eléctricas. Los campos electromagnéticos pulsados, de baja frecuencia, llegan hasta la célula y le devuelven su voltaje: mejora la circulación más fina y la célula aprovecha mejor el oxígeno y los nutrientes. Es la magnetoterapia de los fisioterapeutas, aplicada a todo el cuerpo.',
          'Te recuestas en un sillón, sin cambiarte, entre 20 y 40 minutos. No se nota ninguna corriente; como mucho, una vibración suave o algo de calor.',
          'Su efecto es acumulativo: la constancia marca la diferencia. No se recomienda con marcapasos ni durante el embarazo; lo vemos contigo antes.' ],
        cabeza: [
          '» El estrés no se queda en la cabeza: el cuerpo también sigue en alerta. El PEMF activa el modo contrario, el de descanso y reparación, y ayuda al cuerpo a entender que la jornada ha terminado.',
          'El cuerpo funciona con señales eléctricas. Los campos electromagnéticos pulsados, de baja frecuencia, llegan hasta la célula y le devuelven su voltaje: mejora la circulación más fina y la célula aprovecha mejor el oxígeno y los nutrientes.',
          'Te recuestas en un sillón, sin cambiarte, entre 20 y 40 minutos. No se nota ninguna corriente; como mucho, una vibración suave o algo de calor.',
          'Su efecto es acumulativo: la constancia marca la diferencia. No se recomienda con marcapasos ni durante el embarazo; lo vemos contigo antes.' ],
        cuerpo: [
          '» Es la magnetoterapia de los fisioterapeutas, en todo el cuerpo. Desinflama, activa la circulación y favorece la reparación de músculos y articulaciones: el cuerpo queda más suelto y se recupera mejor entre un esfuerzo y el siguiente.',
          'El cuerpo funciona con señales eléctricas. Los campos electromagnéticos pulsados, de baja frecuencia, llegan hasta la célula y le devuelven su voltaje: mejora la circulación más fina y la célula aprovecha mejor el oxígeno y los nutrientes.',
          'Te recuestas en un sillón, sin cambiarte, entre 20 y 40 minutos. No se nota ninguna corriente; como mucho, una vibración suave o algo de calor. Muchos miembros salen con el cuerpo más ligero y con menos dolor.',
          'Su efecto es acumulativo: la constancia marca la diferencia. No se recomienda con marcapasos ni durante el embarazo; lo vemos contigo antes.' ],
        piel: [
          '» El descanso también se ve por fuera. El PEMF activa el modo de descanso y reparación y mejora la circulación más fina, la que lleva oxígeno y nutrientes a los tejidos.',
          'Son campos electromagnéticos pulsados en todo el cuerpo, entre 20 y 40 minutos en un sillón.' ],
        todo: [
          '» Con los años, al cuerpo le cuesta más descansar y repararse. El PEMF activa ese modo, modula la inflamación y favorece la reparación de músculos, articulaciones y huesos.',
          'Es la magnetoterapia de los fisioterapeutas, aplicada a todo el cuerpo. Su efecto es acumulativo.' ] } },
    { nombre: 'BrainTap', specs: [['15', 'min', 'Sesión'], ['2', 'modos', 'Calma o foco']], dato: '15 minutos', foto: 'braintap-hero.webp', pos: '50% 30%',
      textos: {
        energia: [
          '» A veces la cabeza se queda sin energía antes que el cuerpo. El BrainTap tiene un modo de foco para esos momentos y otro de relajación profunda para recuperar.',
          'Son quince minutos con unos auriculares de sonido binaural y unas gafas de luz, con los ojos cerrados y una voz que guía.' ],
        descanso: [
          '» Sonido y luz que guían al cerebro hacia las ondas de la calma y el sueño. Bajan el cortisol y el pulso, y el cuerpo entra en modo reparación: ayuda a dormirse cuando el cuerpo está cansado y la cabeza sigue en marcha.',
          'Unos auriculares con sonido binaural y unas gafas de luz pulsante marcan un ritmo, y la actividad del cerebro lo sigue hacia los estados de calma y descanso. Se activa el sistema nervioso parasimpático, el de la recuperación: bajan el cortisol y el pulso.',
          'Te recuestas en una sala tranquila, cierras los ojos y una voz te guía. Son quince minutos y no requiere ningún esfuerzo.',
          'Es acumulativo: cuanto más se usa, más fácil le resulta al cerebro volver a ese estado.' ],
        cabeza: [
          '» No hace falta saber meditar. El sonido y la luz guían al cerebro hacia la calma: baja el ruido mental, se reduce el estrés y vuelve la claridad.',
          'Unos auriculares con sonido binaural y unas gafas de luz pulsante marcan un ritmo, y la actividad del cerebro lo sigue hacia los estados de calma y descanso. Se activa el sistema nervioso parasimpático, el de la recuperación: bajan el cortisol y el pulso.',
          'Te recuestas en una sala tranquila, cierras los ojos y una voz te guía. Son quince minutos y no requiere ningún esfuerzo. Tiene también un modo de foco, para cuando lo que falta es concentración.',
          'Es acumulativo: cuanto más se usa, más se entrena la mente.' ],
        cuerpo: [
          '» El cuerpo se recupera cuando el sistema nervioso baja el ritmo. El sonido y la luz lo llevan a ese modo: bajan el cortisol y el pulso.',
          'Quince minutos con los ojos cerrados. Tiene también un modo de foco, para antes de un esfuerzo.' ],
        piel: [
          '» El estrés sostenido también se nota en la cara. Estos quince minutos llevan al cerebro a la relajación profunda y bajan el cortisol.',
          'Unos auriculares con sonido binaural y unas gafas de luz, con los ojos cerrados. No requiere ningún esfuerzo.' ],
        todo: [
          '» Cuidarse a largo plazo también es cuidar la cabeza. El sonido y la luz entrenan al cerebro a entrar en calma o en foco, y cuanto más se usa, más fácil le resulta.',
          'Quince minutos con unos auriculares y unas gafas de luz, con una voz que guía.' ] } },
    { nombre: 'Presoterapia', specs: [['20–45', 'min', 'Sesión']], dato: 'De 20 a 45 minutos', foto: 'presoterapia-sesion.webp', pos: '50% 50%',
      textos: {
        energia: [
          '» El cansancio también se queda en las piernas. Estas botas empujan la sangre y la linfa hacia el corazón, y las piernas quedan ligeras.',
          'Se inflan por tramos, de los pies a la cadera, de 20 a 45 minutos. Es una presión rítmica, sin dolor.' ],
        descanso: [
          '» Una presión rítmica y envolvente que descarga las piernas y relaja el músculo. Va bien al final del día, cuando el cuerpo necesita soltar.',
          'Unas botas de aire que se inflan por tramos, de los pies a la cadera, de 20 a 45 minutos.' ],
        cabeza: [
          '» Media hora sin hacer nada, que no es poco. Mientras, las botas activan la circulación y descargan las piernas.',
          'Se inflan por tramos, de los pies a la cadera. Puedes leer o, simplemente, desconectar.' ],
        cuerpo: [
          '» Empuja la sangre y la linfa de los pies hacia el corazón. Descarga las piernas, reduce el dolor muscular de después del ejercicio y ayuda a recuperarse antes.',
          'Son unas botas con seis cámaras de aire que se inflan por tramos, de los pies a la cadera. Empujan la sangre y la linfa hacia el corazón: mejora el retorno venoso, se activa el sistema linfático y se acumula menos líquido. El músculo recibe más oxígeno y se relaja.',
          'Te recuestas en un sillón y te colocamos las botas, de 20 a 45 minutos. Es una presión rítmica y envolvente, sin dolor; mientras, puedes leer o desconectar.',
          'Va bien después de entrenar o como descarga regular. Es la recuperación que usan los deportistas.' ],
        piel: [
          '» Activa el sistema linfático, el que drena los líquidos que el cuerpo retiene. Reduce la hinchazón y la retención, y deja las piernas ligeras.',
          'Son unas botas con seis cámaras de aire que se inflan por tramos, de los pies a la cadera. Empujan la sangre y la linfa hacia el corazón: mejora el retorno venoso, se activa el sistema linfático y se acumula menos líquido.',
          'Te recuestas en un sillón y te colocamos las botas, de 20 a 45 minutos. Es una presión rítmica y envolvente, sin dolor; mientras, puedes leer o desconectar.',
          'Con los años al cuerpo le cuesta más drenar; por eso funciona mejor como rutina que como sesión suelta.' ],
        todo: [
          '» Con los años, la circulación de las piernas se vuelve más lenta. Estas botas la activan y ayudan a drenar el líquido que se acumula.',
          'Se inflan por tramos, de los pies a la cadera, de 20 a 45 minutos.' ] } },
    { nombre: 'Respark®', es: 'Crioterapia + masaje', specs: [['−130', '°C', 'Crioterapia'], ['60', 'min', 'Con el masaje']], dato: 'Crioterapia + masaje · Una hora',
      foto: 'cryo-chamber.webp', pos: '50% 42%', foto2: 'massage-room.webp', pos2: '62% 50%',
      textos: {
        energia: [
          '» Empieza con los mismos tres minutos de crioterapia, que son los que dan energía, y sigue con un masaje drenante y moldeador.',
          'Es una hora pensada sobre todo para la retención y la silueta, por si también quieres cuidarlas.' ],
        descanso: [
          '» El masaje activa el sistema nervioso parasimpático, el de la calma, y se sale con una relajación real.',
          'Es crioterapia seguida de un masaje drenante y moldeador, el Método Lilium: una hora, pensada sobre todo para la retención y la silueta.' ],
        cabeza: [
          '» Una hora en la que alguien cuida de ti. El frío despeja y baja el cortisol; el masaje lleva al cuerpo a la calma.',
          'Es crioterapia seguida de un masaje drenante y moldeador, el Método Lilium, pensado sobre todo para la retención y la silueta.' ],
        cuerpo: [
          '» Primero el frío, que baja la inflamación, y después las manos, que movilizan la linfa y descargan el músculo.',
          'Es crioterapia seguida de un masaje drenante y moldeador, el Método Lilium: una hora. Está pensado para la silueta y la retención, y suma recuperación.' ],
        piel: [
          '» Tres minutos de crioterapia y, justo después, un masaje drenante y moldeador.<br>¿Por qué juntas? La crioterapia baja la inflamación y deja el tejido receptivo, y sobre esa respuesta el masaje moviliza la linfa, reduce la retención y redefine la silueta.',
          'Tres minutos a −130&nbsp;°C contraen los vasos; al salir, la sangre vuelve oxigenada. Sobre el tejido ya activado se trabaja el masaje drenante y moldeador con aparatología, el Método Lilium, que activa la microcirculación.',
          'Dura una hora en total: la crioterapia, siempre con tu coach al lado, y el masaje.',
          'Es un método propio de REVO. Los resultados son acumulativos: mejoran con la constancia.' ],
        todo: [
          '» La terapia de la retención y la silueta: crioterapia seguida de un masaje drenante y moldeador, el Método Lilium.',
          'Una hora, con resultados que mejoran con la constancia. Tiene sentido si cuidar tu imagen también forma parte de tu plan.' ] } },
    { nombre: 'Masaje facial', specs: [], dato: 'A mano', foto: 'massage-glow.webp', pos: '34% 40%',
      textos: {
        piel: [
          '» Trabaja a mano los músculos del rostro: suelta la tensión de la mandíbula, el ceño y la frente, reactiva la circulación y estimula el colágeno y la elastina.',
          'En la cara se acumula más tensión de la que parece. Es un trabajo muscular profundo, no un masaje superficial: al soltar esos músculos la expresión queda más descansada y el rostro, más definido.',
          'Se hace después de la luz roja y completa su trabajo.' ] } }
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
      nervio: 'La energía no depende solo de dormir más. La reparte tu sistema nervioso autónomo: si pasa demasiado tiempo en alerta, gasta más de lo que recupera.',
      terapias: ['Crioterapia', 'Luz roja', 'Cámara hiperbárica'],
      otras: ['PEMF', 'BrainTap', 'Presoterapia', 'Respark®'] },
    descanso: { boton: 'Dormir mejor y levantarme con la sensación de haber descansado', deseo: 'dormir mejor y levantarte con la sensación de haber descansado', corto: 'Descanso',
      para: 'Para que dormir vuelva a ser descansar.',
      titulo: 'Cuando dormir <em>no es descansar</em>',
      texto: 'Duermes tus horas y te levantas igual. Si el sistema nervioso se queda en modo alerta, cuesta llegar al sueño profundo, que es cuando el cuerpo se repara.',
      tema: 'tu descanso',
      nervio: 'Dormir bien no se decide. Lo regula tu sistema nervioso autónomo: si no sale del modo alerta, duermes, pero no descansas.',
      terapias: ['PEMF', 'BrainTap', 'Luz roja', 'Crioterapia'],
      otras: ['Cámara hiperbárica', 'Presoterapia', 'Respark®'] },
    cabeza:   { boton: 'Tener la cabeza más clara y más tranquila', deseo: 'tener la cabeza más clara y más tranquila', corto: 'Claridad y calma',
      para: 'Para que la cabeza también termine la jornada.',
      titulo: 'Cuando la cabeza <em>no para</em>',
      texto: 'Cuando el día no termina al cerrar el portátil, el sistema nervioso se queda en modo alerta y el cortisol, la hormona del estrés, no baja. Rindes igual, pero cuesta estar del todo en la cena.',
      tema: 'tu cabeza',
      nervio: 'Esa alerta que no se apaga es tu sistema nervioso autónomo. Trabaja sin que lo decidas, y cuando no baja el ritmo, la cabeza tampoco.',
      terapias: ['Crioterapia', 'Cámara hiperbárica', 'BrainTap', 'PEMF'],
      otras: ['Luz roja', 'Presoterapia', 'Respark®'] },
    cuerpo:   { boton: 'Sentir mi cuerpo fuerte y ágil', deseo: 'sentir tu cuerpo fuerte y ágil', corto: 'Fuerza y agilidad',
      para: 'Para que el cuerpo responda como quieres.',
      titulo: 'Cuando el cuerpo <em>no responde igual</em>',
      texto: 'Con los años el cuerpo cambia: cuesta más mantener la fuerza y la agilidad, y tarda más en recuperarse después del esfuerzo. Rendir bien, en el deporte y en el día a día, depende tanto de lo que haces como de cómo te recuperas.',
      tema: 'tu cuerpo',
      nervio: 'De la recuperación se encarga tu sistema nervioso autónomo. Según cómo esté, el mismo esfuerzo cuesta más o cuesta menos.',
      terapias: ['Crioterapia', 'Cámara hiperbárica', 'PEMF', 'Presoterapia'],
      otras: ['Luz roja', 'BrainTap', 'Respark®'] },
    piel:     { boton: 'Sentirme mejor con mi aspecto físico', deseo: 'sentirte mejor con tu aspecto físico', corto: 'Aspecto físico',
      para: 'Para verte tan bien como te sientes.',
      titulo: 'Cuando quieres <em>verte como te sientes</em>',
      texto: 'El aspecto cambia despacio: de un año para otro, no de un mes para otro. Con los años se produce menos colágeno y elastina, que dan firmeza a la piel, y al cuerpo le cuesta más drenar. Cuidarlo también merece un plan.',
      tema: 'tu aspecto',
      titulo2: 'Lo que puede ayudarte a <em>sentirte mejor con tu aspecto físico</em>',
      entrada2: 'Unas trabajan la piel y otras, la silueta. Y todas se notan más cuando el cuerpo descansa y se recupera bien.',
      nervio: 'El aspecto también cuenta cómo descansas y cómo te recuperas. De eso se encarga tu sistema nervioso autónomo, y se nota por fuera.',
      terapias: ['Luz roja', 'Respark®', 'Presoterapia', 'Masaje facial'],
      otras: ['Crioterapia', 'Cámara hiperbárica', 'PEMF', 'BrainTap'] },
    todo:     { boton: 'Seguir como estoy durante muchos años', deseo: 'seguir como estás durante muchos años', corto: 'Longevidad',
      para: 'Para saber desde dónde empiezas.',
      titulo: 'Vivir más no es <em>vivir mejor</em>',
      texto: 'El envejecimiento no empieza con las primeras arrugas o las canas: empieza mucho antes, cuando el cansancio dura más, cuesta concentrarse o el cuerpo no se recupera como antes. Cuidarse a tiempo es lo que permite seguir haciendo lo que te gusta.',
      tema: 'los años que vienen',
      nervio: 'Cómo estarás dentro de veinte años depende de cómo se recupera tu cuerpo hoy. Lo regula tu sistema nervioso autónomo, y se puede medir.',
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

  /* Los mismos cuatro pasos, en una línea cada uno: es lo que se ve en /tu-punto desde el 18-nov-2026. */
  PASOS_CORTOS: ['Te recibimos y te enseñamos el estudio', 'Medimos cómo estás', 'Vemos contigo los resultados', 'Sales con tu plan'],

  /* Las tres mediciones: nombre, la casilla vacía y qué dice cada una. */
  FICHA: [
    ['Edad biológica', '— años', 'Los años que marca tu cuerpo. Pueden ser menos, los mismos o más que los del calendario.'],
    ['Índice de estrés', '—', 'La carga que lleva tu sistema nervioso en reposo: el estrés físico, emocional y mental acumulado.'],
    ['Composición corporal', '— %', 'Cuánto es músculo y cuánto es grasa. La báscula sola no lo dice.']
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
    ['¿Cómo se mide la edad biológica?', 'Con una lectura de la variabilidad de tu pulso, en reposo. Analiza cómo responde tu sistema nervioso autónomo: cómo gestionas el estrés, cómo funciona tu recuperación y cuánta energía tienes disponible. No es una prueba médica ni un diagnóstico.'],
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
