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
    otrasEntradaSolo: 'Tienen que ver con otras cosas en las que quizá también te reconoces.',
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

  /* Las terapias (Eric, 17-nov-2026: «que no sea todo tan estándar; texto a texto, pensando qué es mejor decir,
     si añadir algo o no»). Cada texto está escrito para UNA terapia y UN objetivo; no hay plantilla que rellene
     huecos. De cada terapia:
     · `dato`: duración y la cifra que la define.
     · `que`: qué es, en una o dos frases, con su tecnología dicha tal cual. Igual para todo el mundo.
     · `usos`: por objetivo (energia · descanso · cabeza · cuerpo · piel · todo), SOLO donde la relación es real:
         `hace`  qué provoca en el cuerpo, eligiendo el mecanismo que le importa a esa persona (la crioterapia
                 hace tres cosas; a quien busca energía se le cuenta la dopamina, a quien duerme mal, el cortisol);
         `ayuda` en qué lo nota. Es la frase destacada. Nunca promete: «ayuda a», «la mayoría», «muchos miembros»;
         `extra` otro beneficio o un dato que da confianza. Solo si suma para esa persona; si no, no hay.
     · `aparte`: lo que se dice cuando no tiene que ver con lo que eligió. No se fuerza la relación.
     En cada objetivo, las terapias principales se reparten el papel para no repetirse (energía: la crioterapia
     es el efecto inmediato, la luz roja dónde se produce la energía, la hiperbárica el oxígeno que hace falta).
     Cifras y hechos: solo los de revo-tono (datos.md). */
  TERAPIAS: [
    { nombre: 'Crioterapia', dato: 'De 2 a 3 minutos · −130&nbsp;°C', foto: 'cryo-chamber.webp', pos: '50% 45%',
      que: 'Una cabina de frío seco a −130&nbsp;°C, de cuerpo entero. Entras dos o tres minutos, siempre con tu coach al lado.',
      usos: {
        energia: { hace: 'Con ese frío, el cuerpo libera dopamina y noradrenalina, dos sustancias ligadas a la motivación y a estar alerta.',
          ayuda: 'La mayoría sale con el cuerpo despierto y la cabeza despejada.',
          extra: 'También baja el cortisol, la hormona del estrés. Muchos miembros cuentan que esa noche duermen mejor.' },
        descanso: { hace: 'El frío baja el cortisol, la hormona del estrés, que es la que mantiene al cuerpo en alerta.',
          ayuda: 'Muchos miembros cuentan que el día que hacen crioterapia duermen mejor.',
          extra: 'En el momento, el efecto es el contrario: el cuerpo libera dopamina y noradrenalina, y se sale con energía.' },
        cabeza: { hace: 'El frío baja el cortisol y, a la vez, hace que el cuerpo libere dopamina y noradrenalina.',
          ayuda: 'Por eso se sale con una mezcla poco habitual, calma y energía a la vez.',
          extra: 'Y son dos o tres minutos en los que es difícil pensar en otra cosa.' },
        cuerpo: { hace: 'El frío desinflama, que es lo que el cuerpo necesita después del esfuerzo.',
          ayuda: 'Te ayuda a recuperarte y a llegar mejor al siguiente entrenamiento, o al día siguiente.',
          extra: 'No es una moda. En Polonia forma parte de la sanidad pública.' },
        piel: { hace: 'Es la primera mitad del Respark®. También se hace sola, y entonces es otra cosa.',
          ayuda: 'Baja el cortisol, la hormona del estrés, y la mayoría sale con el cuerpo despierto y la cabeza despejada.' },
        todo: { hace: 'El frío desinflama y baja el cortisol, la hormona del estrés.',
          ayuda: 'Ayuda a mantener a raya la inflamación y el estrés, dos cosas que conviene cuidar antes de notarlas.',
          extra: 'En Polonia forma parte de la sanidad pública.' } } },
    { nombre: 'Luz roja', dato: 'De 10 a 15 minutos · 630–940&nbsp;nm', foto: 'redlight-chamber.webp', pos: '38% 50%',
      que: 'Te tumbas en una cama de luz roja e infrarroja. La infrarroja no se queda en la superficie: llega hasta cinco centímetros bajo la piel.',
      usos: {
        energia: { hace: 'Ahí activa la mitocondria, la parte de cada célula que produce su energía.',
          ayuda: 'No es un empujón de un rato. Con constancia, ayuda a tener más energía de fondo.',
          extra: 'La misma luz estimula el colágeno y la elastina, así que de paso cuida la piel.' },
        descanso: { hace: 'Además de activar las células, esa luz ayuda a regular el ritmo del sueño, el reloj interno que le dice al cuerpo cuándo toca dormir y cuándo despertar.',
          ayuda: 'Con constancia, ayuda a que el sueño vuelva a tener horario.',
          extra: 'Y como activa la mitocondria, donde cada célula produce su energía, también ayuda con el cansancio del día.' },
        cabeza: { ayuda: 'Ayuda a regular el ritmo del sueño, y con la cabeza descansada todo se ve más claro.' },
        cuerpo: { hace: 'A esa profundidad llega al músculo.',
          ayuda: 'Activa la mitocondria, donde las células producen la energía que el cuerpo usa para moverse y para repararse.' },
        piel: { hace: 'Estimula justo lo que se va perdiendo: el colágeno y la elastina.',
          ayuda: 'Con constancia, ayuda a que la piel gane firmeza y mejor tono.',
          extra: 'Para la cara hay además una máscara con la misma luz.' },
        todo: { hace: 'Activa la mitocondria, donde cada célula produce su energía, y estimula el colágeno y la elastina.',
          ayuda: 'La energía y la firmeza se pierden despacio, y se cuidan mejor antes que después.' } } },
    { nombre: 'Cámara hiperbárica', dato: '60 minutos · oxígeno al 98&nbsp;%', foto: 'hbot-chamber.webp', pos: '46% 50%',
      que: 'Una hora respirando oxígeno al 98&nbsp;% dentro de una cámara presurizada a 1,9 atmósferas. Con esa presión, llega a los tejidos hasta diez veces más oxígeno.',
      usos: {
        energia: { hace: 'Y el oxígeno es lo que las células usan para producir energía.',
          ayuda: 'Ayuda al cuerpo a recuperarse a fondo. Cuando la recuperación acompaña, la energía también.',
          extra: 'Es la tecnología que se usa antes y después de una operación.' },
        cuerpo: { hace: 'Ese oxígeno es lo que músculos y tejidos necesitan para repararse. Por eso se usa antes y después de una operación.',
          ayuda: 'Después del esfuerzo, ayuda a que el cuerpo se repare a fondo.',
          extra: 'Hay miembros que la han combinado con crioterapia y luz roja para recuperarse de una operación de rodilla.' },
        todo: { hace: 'Más oxígeno es más capacidad de reparación, justo lo que el cuerpo hace más despacio con los años.',
          ayuda: 'Ayuda a cuidar el cuerpo por dentro antes de que lo pida.',
          extra: 'Es la tecnología que se usa antes y después de una operación.' } },
      aparte: { hace: 'Es la tecnología que se usa antes y después de una operación.',
        ayuda: 'Si entrenas, o vienes de una lesión, ayuda a que los tejidos se reparen.' } },
    { nombre: 'PEMF', dato: 'De 20 a 40 minutos', foto: 'pemf-hero.webp', pos: '62% 50%',
      que: 'Campos electromagnéticos pulsados: la magnetoterapia que usan los fisioterapeutas, aplicada a todo el cuerpo mientras descansas.',
      usos: {
        energia: { hace: 'Activan el modo de descanso y reparación del sistema nervioso.',
          ayuda: 'Si tu energía depende de cómo duermes, es por donde empezar: ayuda a llegar al sueño profundo.' },
        descanso: { hace: 'Activan el modo de descanso y reparación del sistema nervioso, justo el contrario del modo alerta.',
          ayuda: 'Con el cuerpo fuera del modo alerta, es más fácil llegar al sueño profundo.',
          extra: 'Además desinflaman y mejoran la circulación, que también cuenta para levantarse con el cuerpo descansado.' },
        cabeza: { hace: 'Activan el modo de descanso y reparación del sistema nervioso, el que debería tomar el relevo cuando acaba el día.',
          ayuda: 'Te ayuda a bajar las revoluciones y a terminar de verdad la jornada.' },
        cuerpo: { hace: 'Desinflaman, mejoran la circulación y activan el modo de reparación del cuerpo.',
          ayuda: 'Te ayuda a recuperarte entre un esfuerzo y otro, y a notar el cuerpo más suelto.',
          extra: 'Es el mismo modo en el que el cuerpo descansa, así que suele ayudar también con el sueño.' },
        todo: { hace: 'Activan el modo de descanso y reparación del sistema nervioso, y desinflaman.',
          ayuda: 'Ayuda al cuerpo con dos cosas que cuestan más con los años: descansar y repararse.' } },
      aparte: { hace: 'Activan el modo de descanso y reparación del sistema nervioso.',
        ayuda: 'Si además duermes regular, ayuda a llegar al sueño profundo.' } },
    { nombre: 'BrainTap', dato: '15 minutos', foto: 'braintap-hero.webp', pos: '50% 30%',
      que: 'Unos auriculares con sonido binaural y unas luces sincronizadas, con los ojos cerrados.',
      usos: {
        energia: { hace: 'Llevan al cerebro a un estado de relajación profunda o de foco, según lo que necesites.',
          ayuda: 'En modo foco, son quince minutos para recuperar la concentración cuando el día se hace largo.' },
        descanso: { hace: 'Llevan al cerebro, poco a poco, a un estado de relajación profunda.',
          ayuda: 'Si te acuestas con la cabeza todavía en marcha, es por donde empezar: quince minutos para soltar el día.' },
        cabeza: { hace: 'Llevan al cerebro a un estado de relajación profunda sin que tengas que hacer nada.',
          ayuda: 'Te ayuda a apagar el ruido de fondo y a volver con la cabeza clara.',
          extra: 'Y cuando lo que falta es concentración, tiene un modo de foco.' } },
      aparte: { hace: 'Llevan al cerebro a un estado de relajación profunda o de foco, según lo que necesites.',
        ayuda: 'Si te cuesta desconectar, son quince minutos para bajar el ruido.' } },
    { nombre: 'Presoterapia', dato: 'De 20 a 30 minutos', foto: 'presoterapia-hero.webp', pos: '50% 40%',
      que: 'Unas botas que se llenan de aire y comprimen de los pies a la cadera. Drenan la retención de líquidos y activan la circulación.',
      usos: {
        cuerpo: { ayuda: 'Descarga las piernas después de entrenar, o de un día entero de pie.' },
        piel: { ayuda: 'Ayuda a drenar, que es lo que al cuerpo le cuesta más con los años, y a quitar la sensación de pesadez.' } },
      aparte: { ayuda: 'Si acabas el día con las piernas cargadas, ayuda a dejarlas ligeras.' } },
    { nombre: 'Respark®', dato: 'Una hora', foto: 'therapy.webp', pos: '40% 50%',
      que: 'Dos terapias en una hora: crioterapia a −130&nbsp;°C y, a continuación, un masaje drenante y moldeador, el Método Lilium.',
      usos: {
        piel: { hace: 'El frío activa el cuerpo y el masaje trabaja la retención.',
          ayuda: 'Es la terapia pensada para la silueta. Los cambios llegan con constancia, no en una sesión.' } },
      aparte: { ayuda: 'Es la terapia pensada para la silueta y la retención, por si también es algo que quieres cuidar.' } },
    { nombre: 'Masaje facial', dato: 'A mano', foto: 'massage-glow.webp', pos: '34% 40%', solo: 'piel',
      que: 'Un masaje de la cara, a mano, después de la luz roja.',
      usos: { piel: { ayuda: 'Suelta la tensión que se acumula en los músculos de la cara, y eso se nota en la expresión.' } } }
  ],

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
