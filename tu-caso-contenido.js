/* Contenido de la landing «Tu caso» (/tu-caso).
   Fuente: ~/code/revo-clinical/docs/agente-savia/agente-captacion.md, pasado por la maqueta aprobada
   (docs/landing-captacion-maqueta.html) y reescrito el 21-oct-2026 con el tono de marca
   (skill revo-tono: ~/code/revo-clinical/docs/marca/revo-tono). Cifras: references/datos.md de esa skill. Aquí vive TODO el texto: cambiar una frase se hace en este
   fichero y no obliga a tocar tu-caso.js ni tu-caso.html. No se inventa ningún mecanismo ni cifra. */

window.TU_CASO = {

  /* Carpeta de las fotos. Cuando haya fotos reales de cada máquina, se sustituyen con el mismo nombre. */
  FOTO: 'assets/',

  /* WhatsApp del equipo (salida secundaria, al final del resultado). */
  WHATSAPP: 'https://wa.me/34613505881',

  /* Terapias: nombre, foto (con su tamaño real para que no salte la página), dato y efecto por defecto. */
  TERAPIAS: {
    crio:   { nombre:'Crioterapia', foto:'cryo-chamber.webp', w:1333, h:2000, pos:'50% 60%',
              dato:'Dos o tres minutos a −130 °C, siempre con tu coach al lado.',
              efecto:'Calma el sistema nervioso y baja el cortisol, la hormona del estrés. Desinflama y suelta la musculatura. Muchos miembros nos cuentan que esa noche duermen mejor.' },
    luz:    { nombre:'Cama de luz roja', foto:'redlight-chamber.webp', w:2000, h:1333, pos:'50% 50%',
              dato:'Diez o quince minutos de luz roja e infrarroja, de 630 a 940 nm.',
              efecto:'La infrarroja llega hasta la célula y activa la mitocondria, que es donde se produce la energía. Además ayuda a regular el ritmo del sueño y estimula el colágeno de la piel.' },
    pemf:   { nombre:'PEMF · campos electromagnéticos', foto:'pemf-hero.webp', w:1536, h:1024, pos:'50% 50%',
              dato:'De veinte a cuarenta minutos tumbado sobre campos electromagnéticos pulsados: la magnetoterapia de los fisioterapeutas, en todo el cuerpo.',
              efecto:'Activa el modo de descanso y reparación del cuerpo: sueño más profundo, menos inflamación y mejor circulación.' },
    hbot:   { nombre:'Cámara hiperbárica', foto:'hbot-chamber.webp', w:1800, h:1350, pos:'50% 50%',
              dato:'Una hora respirando oxígeno al 98 % a 1,9 atmósferas: a los tejidos llega hasta diez veces más oxígeno.',
              efecto:'Con más oxígeno, los tejidos se reparan antes y baja la inflamación. Por eso se usa antes y después de una operación. Y la cabeza sale más despejada.' },
    brain:  { nombre:'BrainTap', foto:'braintap-hero.webp', w:1333, h:2000, pos:'50% 30%',
              dato:'Quince minutos tumbado, con auriculares de sonido binaural y luces sincronizadas.',
              efecto:'Lleva el cerebro a un estado de relajación profunda: el sistema nervioso sale del modo alerta.' },
    preso:  { nombre:'Presoterapia', foto:'presoterapia-hero.webp', w:1333, h:2000, pos:'50% 40%',
              dato:'Botas que comprimen por aire de los pies a la cadera, como un drenaje linfático.',
              efecto:'Ayuda a drenar la retención y mejora la circulación: las piernas quedan ligeras. Los deportistas la usan para recuperar.' },
    respark:{ nombre:'Respark®', foto:'therapy.webp', w:1800, h:1200, pos:'50% 50%',
              dato:'Crioterapia a −130 °C seguida de un masaje drenante y moldeador. Una hora en total.',
              efecto:'El frío contrae los vasos, al salir se abren de nuevo y el masaje drena mejor. Se nota en la retención y en la silueta.' },
    luzpiel:{ nombre:'Luz roja: cama y máscara', foto:'redlight-chamber.webp', w:2000, h:1333, pos:'50% 50%',
              dato:'Diez o quince minutos de luz roja e infrarroja en la cama, y la máscara para la cara.',
              efecto:'La luz roja estimula el colágeno y la elastina, que son lo que da firmeza a la piel. Es la tecnología de las máscaras LED, que la NASA lleva años usando para cicatrizar heridas.' },
    facial: { nombre:'Masaje facial', foto:'massage-glow.webp', w:1672, h:941, pos:'50% 40%',
              dato:'Un masaje a mano, después de la luz.',
              efecto:'Completa el trabajo de la luz en la piel y suelta la tensión de la cara.' },
  },

  /* Las cinco ramas: botón de la pregunta 1, pregunta 2, dos respuestas (cada una con su lección,
     sus terapias y los efectos que cambian para ese caso), y qué respuesta recibe «Un poco las dos». */
  RAMAS: {
    energia: {
      boton:'Me falta energía',
      tema:'recuperar la energía',
      testimonio:{ texto:'Duermo mejor, tengo más energía y REVO se ha convertido en parte natural de mi rutina.', quien:'Gintare, miembro desde hace siete meses' },
      pregunta:'¿Cuándo notas más la falta de energía?',
      ambas:'a',
      respuestas:{
        a:{ boton:'Ya al levantarme',
            leccion:'Si te levantas ya sin energía, lo más habitual es que el cuerpo no esté entrando en el descanso profundo, que es cuando se repara y se recarga. Duermes las horas, pero no recargas.',
            terapias:['crio','luz','pemf'],
            efectos:{ crio:'Baja el cortisol y libera dopamina y noradrenalina: sales despejado y con energía. Muchos miembros nos cuentan que esa noche duermen mejor.',
                      pemf:'Activa el modo de descanso y reparación, que es lo que lleva al sueño profundo, donde de verdad se recarga.' } },
        b:{ boton:'A lo largo del día',
            leccion:'Si la energía se va a media mañana o a media tarde, no suele ser el descanso. Lo más habitual es que las células produzcan menos energía de la que deberían, porque la mitocondria, que es donde se produce, va lenta, o que el cuerpo arrastre inflamación por el estrés.',
            terapias:['crio','luz','hbot'],
            efectos:{ crio:'Baja el cortisol y libera dopamina y noradrenalina: sales despejado y con energía.',
                      luz:'La infrarroja llega hasta la célula y activa la mitocondria, que es donde se produce la energía. Además estimula el colágeno de la piel.' } },
      },
    },
    sueno: {
      boton:'Duermo mal',
      tema:'dormir mejor',
      testimonio:{ texto:'Ya no tomo mis pastillas para dormir, he conseguido dejarlas.', quien:'Miembro de REVO' },
      pregunta:'¿Qué te pasa con el sueño?',
      ambas:'b',
      respuestas:{
        a:{ boton:'Me cuesta dormirme',
            leccion:'Lo más habitual es que el sistema nervioso siga en modo alerta cuando te acuestas. Para dormirte tiene que pasar al modo descanso, y ahí es donde se atasca.',
            terapias:['brain','pemf','crio'],
            efectos:{ pemf:'Activa el parasimpático, el modo de descanso y reparación: justo el cambio que el cuerpo necesita al acostarse.' } },
        b:{ boton:'Me despierto, o duermo y no descanso',
            leccion:'Lo más habitual es que no estés llegando al sueño profundo, que es cuando el cuerpo se repara. Por eso duermes y no descansas.',
            terapias:['pemf','luz','crio'],
            efectos:{ pemf:'Activa el modo de descanso y reparación: sueño más profundo y menos inflamación.',
                      luz:'Ayuda a regular el ritmo circadiano, el reloj interno que marca cuándo dormir, y activa la mitocondria, que es donde se produce la energía.' } },
      },
    },
    estres: {
      boton:'Estrés',
      tema:'bajar el estrés',
      testimonio:{ texto:'REVO es uno de esos sitios que Barcelona hace excepcionalmente bien: bonito, algo futurista y tan agradable que cuidarte deja de parecer otra tarea más en la agenda.', quien:'Kristina R., reseña de Google' },
      pregunta:'¿Dónde lo notas más?',
      ambas:'b',
      respuestas:{
        a:{ boton:'En el cuerpo: tensión, contracturas',
            leccion:'Lo más habitual es que la tensión se vaya acumulando en los músculos en forma de inflamación y no llegue a descargarse.',
            terapias:['crio','pemf','luz'],
            efectos:{ crio:'Tres minutos que bajan el cortisol, la hormona del estrés, y sueltan la musculatura.',
                      pemf:'Desinflama, como la magnetoterapia de los fisioterapeutas pero en todo el cuerpo, y activa el modo de descanso.',
                      luz:'Desinflama, ayuda a regular el sueño y además estimula el colágeno de la piel.' } },
        b:{ boton:'En la cabeza: no desconecto',
            leccion:'Lo más habitual es que el sistema nervioso se quede en modo alerta y no desconecte. El cortisol, la hormona del estrés, se mantiene alto todo el día.',
            terapias:['brain','crio','pemf'],
            efectos:{ crio:'Baja el cortisol y libera dopamina y noradrenalina: sales con la cabeza despejada. En Polonia forma parte de la sanidad pública.' } },
      },
    },
    verme: {
      boton:'Verme mejor',
      tema:'verte mejor',
      testimonio:{ texto:'¡Espectacular! Me he hecho el Respark y me ha encantado. El estudio es un espacio cuidado al detalle y profesionales que realmente se implican contigo.', quien:'Carlota P., reseña de Google' },
      pregunta:'¿Qué te gustaría mejorar?',
      ambas:'b',
      respuestas:{
        a:{ boton:'La piel: firmeza, arrugas',
            testimonio:{ texto:'Mención especial para los masajes: el masaje facial es simplemente celestial.', quien:'Anella A., reseña de Google' },
            leccion:'Con los años la piel produce menos colágeno y elastina, y pierde firmeza.',
            terapias:['luzpiel','facial'] },
        b:{ boton:'El cuerpo: retención, silueta',
            leccion:'Lo más habitual es que el sistema linfático, que es el que drena los líquidos, vaya lento. Por eso se nota en las piernas y en la silueta.',
            terapias:['preso','respark','luz'],
            efectos:{ luz:'Estimula el colágeno de la piel y desinflama.' } },
      },
    },
    lesion: {
      boton:'Una lesión o un dolor',
      tema:'recuperarte de una lesión o de un dolor',
      testimonio:{ texto:'Me ha encantado cómo el wellness coach me ha guiado para acelerar mi recuperación de una operación de rodilla. He hecho varias sesiones de crioterapia, luz roja y cámara hiperbárica que han reducido mi inflamación y aliviado mucho el dolor.', quien:'Víctor, miembro desde hace diez meses' },
      pregunta:'¿Qué es lo tuyo?',
      ambas:'b',
      respuestas:{
        a:{ boton:'Una lesión u operación reciente',
            leccion:'Después de una lesión o de una operación, lo que marca la diferencia es cuánta inflamación queda en la zona y cuánto oxígeno llega a los tejidos. Con menos inflamación y más oxígeno, el cuerpo se repara antes.',
            aviso:'Qué te conviene a ti, con lo tuyo, y cuándo, lo revisa contigo el equipo médico en la visita.',
            terapias:['hbot','pemf','crio'],
            efectos:{ hbot:'Con más oxígeno, los tejidos se reparan antes y baja la inflamación. Por eso se usa antes y después de una operación.',
                      pemf:'Desinflama la zona y activa el modo de reparación del cuerpo.',
                      crio:'Tres minutos de frío que bajan la inflamación y el dolor.' } },
        b:{ boton:'Un dolor que arrastro, como la espalda',
            leccion:'Lo más habitual detrás de un dolor que no se va es una inflamación que no baja sola: el cuerpo no llega a apagarla y la zona se queda cargada.',
            aviso:'Qué te conviene a ti, con lo tuyo, y cuándo, lo revisa contigo el equipo médico en la visita.',
            terapias:['crio','pemf','luz'],
            efectos:{ crio:'Tres minutos de frío que bajan la inflamación y el dolor, y sueltan la musculatura de alrededor.',
                      pemf:'Desinflama la zona y activa el modo de reparación del cuerpo.',
                      luz:'La infrarroja llega hasta la célula, desinflama y ayuda a la reparación de los tejidos.' } },
      },
    },
    prevenir: {
      boton:'Cuidarme y prevenir',
      tema:'cuidarte y adelantarte',
      testimonio:{ texto:'Hay un médico que te hace un seguimiento regular para ver cómo avanzas y si tu protocolo necesita ajustes, así que todo se siente muy personalizado.', quien:'Anella A., reseña de Google' },
      pregunta:'¿Ya haces algo por cuidarte, como deporte o comer bien?',
      porque:'Para decirte por dónde se empieza.',
      ambasTexto:'Un poco de las dos',
      ambas:'a',
      tituloLeccion:'Lo que pasa con los años',
      respuestas:{
        a:{ boton:'Sí, ya me cuido',
            leccion:'Con los años el cuerpo se repara más despacio: la piel produce menos colágeno, las células generan menos energía y la inflamación de fondo sube sin dar síntomas. Cuidarse es trabajar eso antes de que se note.',
            terapias:['hbot','luz','crio'],
            efectos:{ hbot:'Con más oxígeno, los tejidos se reparan antes y baja la inflamación de fondo. Es de lo más estudiado en longevidad.',
                      crio:'Baja el cortisol, desinflama y activa el metabolismo. Sales despejado y con energía.' },
            metodo:'Si ya te cuidas, esto suma a lo que haces. Y medir te dice, con datos, dónde estás de verdad.' },
        b:{ boton:'No, quiero empezar',
            leccion:'Con los años el cuerpo se repara más despacio: la piel produce menos colágeno, las células generan menos energía y la inflamación de fondo sube sin dar síntomas. Cuidarse es trabajar eso antes de que se note.',
            terapias:['hbot','luz','crio'],
            efectos:{ hbot:'Con más oxígeno, los tejidos se reparan antes y baja la inflamación de fondo. Es de lo más estudiado en longevidad.',
                      crio:'Baja el cortisol, desinflama y activa el metabolismo. Sales despejado y con energía.' },
            metodo:'No hace falta saber por dónde empezar: primero se mide y después se hace un plan sencillo, una hora dos o tres veces por semana, como quien va al gimnasio.' },
      },
    },
  },

  /* Orden de los cinco botones de la pregunta 1. */
  ORDEN: ['energia','sueno','estres','verme','lesion','prevenir'],

  /* Textos fijos de las pantallas y del resultado. */
  TEXTOS: {
    marca: 'Turó Park · Barcelona',   /* va a la derecha del logo en la cabecera */
    logoAlt: 'REVO Studios',
    paso1: '1 de 2',
    paso2: '2 de 2',
    porque1: 'Dos preguntas y te contamos qué suele haber detrás y cómo lo trabajamos.',
    pregunta1: '¿Qué es lo que más te pesa <em>ahora mismo</em>?',   /* <em> = cursiva de marca, mismas palabras */
    todo: 'Un poco de todo',
    porqueTodo: 'Es lo más habitual, porque todo va unido: el estrés afecta al sueño, si no descansas te falta energía, y al final se nota también por fuera.',
    preguntaTodo: '¿Por cuál empezamos?',
    porque2: 'Lo primero es entender de dónde viene.',
    ambas: 'Un poco las dos',
    atras: 'atrás',
    cambiar: 'Cambiar',
    tituloLeccion: 'Lo que suele haber detrás',
    tituloTerapias: 'Cómo lo trabajamos',
    introTerapias: 'En REVO no hay dos protocolos iguales. Qué terapias, en qué orden y con qué frecuencia lo decide el equipo médico para cada miembro, con prescripción médica. Siempre. Lo que sigue son las terapias con las que solemos trabajar cuando el objetivo es {tema}.',
    tituloTestimonio: 'Lo que cuentan los miembros',
    etqVisita: 'El primer paso',
    propuesta: 'Todos los miembros empezaron por una visita guiada. Un Wellness Coach te enseña el espacio y las terapias, escucha lo que te pasa y te orienta sobre por dónde empezar en tu caso.',
    propuestaMetodo: 'En REVO se empieza midiendo: sangre y sistema nervioso. Con esos datos el equipo médico diseña tu protocolo. Y todo empieza por una visita guiada: un Wellness Coach te enseña el espacio y las terapias y te orienta.',
    tituloPropMetodoA: 'Empieza por <em>conocerte</em>',
    visita: ['30 minutos, el día y la hora que elijas.', 'Ves las terapias por dentro y resuelves tus dudas con alguien del equipo.', 'Sales sabiendo por dónde empezarías tú. Es gratuita.'],
    miedo: 'Primero te escuchamos. Después, si tiene sentido, te proponemos por dónde empezar.',
    sub: 'Eliges día y hora. Te pedirá nombre y teléfono.',
    prueba: 'Si prefieres sentirlo en tu cuerpo ese mismo día, la visita puede incluir una terapia (40 €) o dos (60 €), elegidas según tu objetivo.',
    pruebaBoton: 'Reserva la visita con terapia',   /* segundo botón: mismo enlace de Momence, allí se elige una o dos */
    tituloDudas: 'Si te lo estás preguntando',
    wa: '¿Prefieres preguntarnos?',
    waEnlace: 'Escríbenos por WhatsApp',
    pie: 'REVO Studios · Carrer de Ferran Agulló 24, Turó Park, Barcelona',
    privacidad: 'Privacidad',
  },

  /* Dudas plegadas al final del resultado: pregunta y respuesta. */
  DUDAS: [
    ['¿Qué significa ser miembro?', 'Ser miembro es tener un protocolo propio, diseñado por el equipo médico, y venir a hacerlo dos o tres veces por semana, como quien va al gimnasio. Lo que cambia el cuerpo no es una sesión suelta, que da un alivio puntual, sino el mismo estímulo repetido con constancia. La membresía REVO Core cuesta 350 € al mes (o 3.500 € al año) e incluye todas las terapias sin límite, hasta dos masajes al mes y el seguimiento médico.'],
    ['¿Y comparado con ir sesión a sesión?', 'Una sesión suelta de cualquiera de estas terapias cuesta alrededor de 100 €. La membresía las incluye todas sin límite, y cada visita de una hora suele combinar dos o tres. Con una o dos visitas a la semana, el cálculo sale solo: unos 10 € al día por tener todo esto a tu disposición, con guía médica.'],
    ['¿Funciona de verdad?', 'Son tecnologías avaladas por la ciencia, con más de 20 años de investigación detrás. Se usan en el ámbito médico, como la cámara hiperbárica antes y después de una operación o la crioterapia en la sanidad pública de Polonia, y en el deporte de élite desde hace años. La clave es la constancia: el 98 % de quienes siguen su protocolo con regularidad nota un cambio real.'],
    ['No tengo tiempo', 'REVO está pensado para agendas llenas. Abrimos de lunes a viernes de 7:00 a 21:00 y los sábados por la mañana, se viene con o sin reserva, y una visita de una hora combina dos o tres terapias. Entras, te cuidas y sigues con tu día. Con una o dos visitas a la semana ya se nota.'],
    ['¿Y si no es para mí?', 'No pasa nada. La visita es justo para eso: 30 minutos, gratuita y sin compromiso. Lo ves y decides.'],
    ['¿Quién hay detrás?', 'Un equipo con guía médica. La Dra. Miriam Rivera, especialista en medicina de la longevidad, dirige los protocolos, y en la visita el equipo revisa contigo si hay algo a tener en cuenta.'],
    ['¿Dónde estáis?', 'En Carrer de Ferran Agulló 24, en Turó Park (Barcelona). De lunes a viernes de 7:00 a 21:00 y sábados de 9:00 a 14:00.'],
  ],

  /* Texto del botón de reservar, título de la propuesta y cuándo aparece el botón fijo de abajo
     ('leccion' = cuando la persona ha pasado la lección; 'inicio' = desde el principio).
     Solo hay una versión: Eric decidió el 20-oct-2026 no hacer A/B de texto aquí (ya hay bastantes tests).
     El parámetro ?v= del enlace sigue admitiéndose y viaja en los eventos, pero cualquier valor cae en «a». */
  VARIANTES: {
    a:{ cta:'Reserva tu visita guiada', fijoDesde:'leccion', tituloProp:'Ven a verlo <em>con calma</em>' },
  },
};
