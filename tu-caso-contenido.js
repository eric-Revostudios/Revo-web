/* Contenido de la landing «Tu caso» (/tu-caso).
   Fuente: ~/code/revo-clinical/docs/agente-savia/agente-captacion.md, pasado por la maqueta aprobada
   (docs/landing-captacion-maqueta.html). Aquí vive TODO el texto: cambiar una frase se hace en este
   fichero y no obliga a tocar tu-caso.js ni tu-caso.html. No se inventa ningún mecanismo ni cifra. */

window.TU_CASO = {

  /* Carpeta de las fotos. Cuando haya fotos reales de cada máquina, se sustituyen con el mismo nombre. */
  FOTO: 'assets/',

  /* WhatsApp del equipo (salida secundaria, al final del resultado). */
  WHATSAPP: 'https://wa.me/34613505881',

  /* Terapias: nombre, foto (con su tamaño real para que no salte la página), dato y efecto por defecto. */
  TERAPIAS: {
    crio:   { nombre:'Crioterapia', foto:'cryo-chamber.webp', w:1333, h:2000, pos:'50% 60%',
              dato:'Dos o tres minutos a −120 grados.',
              efecto:'Un reset del sistema nervioso: baja el cortisol, la hormona del estrés, y suelta la musculatura. La mayoría nos dice que esa noche duerme increíble.' },
    luz:    { nombre:'Cama de luz roja', foto:'redlight-chamber.webp', w:2000, h:1333, pos:'50% 50%',
              dato:'Diez o quince minutos de luz roja e infrarroja.',
              efecto:'La infrarroja llega adentro y activa la mitocondria, el motor de la célula, de donde sale la energía. Regula el reloj interno del sueño y de paso activa el colágeno de la piel.' },
    pemf:   { nombre:'PEMF', foto:'pemf-hero.webp', w:1536, h:1024, pos:'50% 50%',
              dato:'Veinte minutos tumbado con campos magnéticos a frecuencia terapéutica: la magnetoterapia de los fisios, en todo el cuerpo.',
              efecto:'Activa el modo descanso y reparación: sueño más profundo, menos inflamación, más circulación.' },
    hbot:   { nombre:'Cámara hiperbárica', foto:'hbot-chamber.webp', w:1800, h:1350, pos:'50% 50%',
              dato:'Una hora respirando oxígeno al 98 % a 1,5 atmósferas: el cuerpo absorbe diez veces más oxígeno.',
              efecto:'No hay mejor antiinflamatorio que el oxígeno: regenera los tejidos y despeja la cabeza.' },
    brain:  { nombre:'BrainTap', foto:'braintap-hero.webp', w:1333, h:2000, pos:'50% 30%',
              dato:'Quince minutos con auriculares de sonido binaural y luces.',
              efecto:'Lleva las ondas del cerebro al estado que toca, relajación profunda si cuesta desconectar. Quince minutos equivalen a unas tres horas de meditación.' },
    preso:  { nombre:'Presoterapia', foto:'presoterapia-hero.webp', w:1333, h:2000, pos:'50% 40%',
              dato:'Botas que comprimen por aire de los pies hacia arriba, imitando el drenaje linfático.',
              efecto:'Elimina retención y toxinas y mejora la circulación: piernas ligeras. Los deportistas la usan para recuperar.' },
    respark:{ nombre:'Respark', foto:'therapy.webp', w:1800, h:1200, pos:'50% 50%',
              dato:'Crioterapia seguida de masaje drenante y moldeador.',
              efecto:'El frío contrae los vasos y luego se abren de rebote, y el drenaje se potencia. Silueta y retención.' },
    luzpiel:{ nombre:'Luz roja: cama y máscara', foto:'redlight-chamber.webp', w:2000, h:1333, pos:'50% 50%',
              dato:'Diez o quince minutos de luz roja e infrarroja; la máscara, en la cara.',
              efecto:'La roja estimula el colágeno y la elastina de la piel. Es lo de las máscaras LED; la NASA la usa desde hace veinte años para curar heridas.' },
    facial: { nombre:'Masaje facial', foto:'massage-glow.webp', w:1672, h:941, pos:'50% 40%',
              dato:'A mano, después de la luz.',
              efecto:'Completa el trabajo de la luz en la piel y relaja la musculatura de la cara.' },
  },

  /* Las cinco ramas: botón de la pregunta 1, pregunta 2, dos respuestas (cada una con su lección,
     sus terapias y los efectos que cambian para ese caso), y qué respuesta recibe «Un poco las dos». */
  RAMAS: {
    energia: {
      boton:'Me falta energía',
      pregunta:'¿Duermes bien y te levantas con la sensación de haber recuperado?',
      ambas:'a',
      respuestas:{
        a:{ boton:'No, me levanto igual',
            leccion:'Tu cuerpo no está entrando en el descanso profundo, que es cuando se repara y recarga. Por eso duermes las horas y te levantas igual.',
            terapias:['crio','luz','pemf'],
            efectos:{ crio:'Baja el cortisol y libera dopamina y noradrenalina: sales despejado y con energía. Y la mayoría nos dice que esa noche duerme increíble.',
                      pemf:'Activa el modo descanso y reparación: es lo que lleva al sueño profundo, que es donde recargas.' } },
        b:{ boton:'Sí, duermo bien',
            leccion:'Entonces no es el descanso. Lo más habitual es que tus células produzcan menos energía de la que deberían, porque la mitocondria, el motor de la célula, va lenta, o que el cuerpo vaya inflamado por el estrés.',
            terapias:['crio','luz','hbot'],
            efectos:{ crio:'Baja el cortisol y libera dopamina y noradrenalina: sales despejado y con energía.',
                      luz:'La infrarroja llega adentro y activa la mitocondria, el motor de la célula, de donde sale la energía. Y de paso activa el colágeno de la piel.' } },
      },
    },
    sueno: {
      boton:'Duermo mal',
      pregunta:'¿Te cuesta dormirte, o te duermes bien y lo que pasa es que te despiertas o no descansas?',
      ambas:'b',
      respuestas:{
        a:{ boton:'Me cuesta dormirme',
            leccion:'Tu sistema nervioso sigue en modo alerta cuando te acuestas. Para dormirte tiene que pasar al modo descanso, y eso es lo que no está pasando.',
            terapias:['brain','pemf','crio'],
            efectos:{ pemf:'Activa el parasimpático, el modo descanso y reparación: es el cambio que necesita tu cuerpo al acostarse.' } },
        b:{ boton:'Me despierto o no descanso',
            leccion:'No estás llegando al sueño profundo, que es cuando el cuerpo se repara. Por eso duermes y no descansas.',
            terapias:['pemf','luz','crio'],
            efectos:{ pemf:'Activa el modo descanso y reparación: sueño más profundo, menos inflamación.',
                      luz:'Regula el ritmo circadiano, el reloj interno que le dice al cuerpo cuándo dormir, y activa la mitocondria, de donde sale la energía.' } },
      },
    },
    estres: {
      boton:'Estrés',
      pregunta:'¿Lo notas más en el cuerpo, como tensión, o en la cabeza, que no desconecta?',
      ambas:'b',
      respuestas:{
        a:{ boton:'En el cuerpo',
            leccion:'La tensión se va acumulando en los músculos como inflamación y no llega a descargarse.',
            terapias:['crio','pemf','luz'],
            efectos:{ crio:'Tres minutos que bajan el cortisol, la hormona del estrés, y sueltan la musculatura.',
                      pemf:'Desinflama, como la magnetoterapia de los fisios pero en todo el cuerpo, y activa el modo descanso.',
                      luz:'Desinflama, regula el reloj interno del sueño y de paso activa el colágeno de la piel.' } },
        b:{ boton:'En la cabeza',
            leccion:'Tu sistema nervioso se queda en modo alerta y no suelta. El cortisol, la hormona del estrés, se mantiene alto todo el día.',
            terapias:['brain','crio','pemf'],
            efectos:{ crio:'Baja el cortisol y libera dopamina y noradrenalina: sales despejado. En Polonia se usa en la sanidad pública para ansiedad.' } },
      },
    },
    verme: {
      boton:'Verme mejor',
      pregunta:'¿Es más la piel, o el cuerpo: retención, piernas, silueta?',
      ambas:'b',
      respuestas:{
        a:{ boton:'La piel',
            leccion:'Con los años la piel produce menos colágeno y elastina, y pierde firmeza.',
            terapias:['luzpiel','facial'] },
        b:{ boton:'El cuerpo',
            leccion:'El sistema linfático, que drena líquidos y toxinas, va lento. Por eso se nota en las piernas y en la silueta.',
            terapias:['preso','respark','luz'],
            efectos:{ luz:'Activa el colágeno de la piel y desinflama; la infrarroja llega adentro y activa la mitocondria.' } },
      },
    },
    prevenir: {
      boton:'Cuidarme y prevenir',
      pregunta:'¿Ya haces algo por cuidarte, como deporte o alimentación, o quieres empezar?',
      porque:'Para decirte por dónde se empieza.',
      ambasTexto:'Un poco de las dos',
      ambas:'a',
      tituloLeccion:'Lo que pasa con los años',
      respuestas:{
        a:{ boton:'Ya me cuido',
            leccion:'Con los años el cuerpo repara más lento: la piel produce menos colágeno, las células producen menos energía y la inflamación de base va subiendo. Cuidarse es trabajar eso antes de que se note.',
            terapias:['hbot','luz','crio'],
            efectos:{ hbot:'No hay mejor antiinflamatorio que el oxígeno: regenera los tejidos. De lo mejor que hay para longevidad.',
                      crio:'Baja el cortisol, desinflama y activa el metabolismo. Sales despejado y con energía.' },
            metodo:'Lo que ya haces, esto lo potencia: como el gimnasio lo complementa. Y medir te dice dónde estás de verdad.' },
        b:{ boton:'Quiero empezar',
            leccion:'Con los años el cuerpo repara más lento: la piel produce menos colágeno, las células producen menos energía y la inflamación de base va subiendo. Cuidarse es trabajar eso antes de que se note.',
            terapias:['hbot','luz','crio'],
            efectos:{ hbot:'No hay mejor antiinflamatorio que el oxígeno: regenera los tejidos. De lo mejor que hay para longevidad.',
                      crio:'Baja el cortisol, desinflama y activa el metabolismo. Sales despejado y con energía.' },
            metodo:'Se empieza por medir, no por hacer: sangre y sistema nervioso, y de ahí un plan sencillo, dos o tres veces por semana, una hora, como el gimnasio.' },
      },
    },
  },

  /* Orden de los cinco botones de la pregunta 1. */
  ORDEN: ['energia','sueno','estres','verme','prevenir'],

  /* Textos fijos de las pantallas y del resultado. */
  TEXTOS: {
    marca: 'REVO Studios · Turó Park',
    paso1: '1 de 2',
    paso2: '2 de 2',
    porque1: 'Dos preguntas y te decimos qué te pasa y cómo lo trabajamos.',
    pregunta1: '¿Qué es lo que más te pesa ahora mismo?',
    todo: 'Un poco de todo',
    porqueTodo: 'Tiene sentido: todo va junto. El estrés estropea el sueño, si no descansas te falta energía, y al final se nota también por fuera.',
    preguntaTodo: '¿Por cuál empezamos?',
    porque2: 'Lo primero es entender de dónde viene.',
    ambas: 'Un poco las dos',
    atras: 'atrás',
    cambiar: 'Cambiar',
    tituloLeccion: 'Lo que te pasa',
    tituloTerapias: 'Cómo lo trabajamos en tu caso',
    etqVisita: 'La visita',
    propuesta: 'Te enseñamos todas las terapias y vemos si realmente esto es para ti. Es totalmente gratuito.',
    propuestaMetodo: 'Aquí se empieza midiendo, sangre y sistema nervioso, y con un plan personalizado.',
    tituloPropMetodoA: 'Lo mejor es que vengas a verlo',
    visita: ['30 minutos, cuando te vaya bien.', 'Un wellness coach te enseña el centro y las terapias y te orienta.', 'Sin compromiso.'],
    miedo: 'Nadie te va a vender nada: lo ves y decides.',
    sub: 'Eliges día y hora. Te pedirá nombre y teléfono.',
    prueba: 'Si quieres, ese mismo día pruebas una o dos terapias: 40 € una, 60 € dos. Lo eliges al reservar.',
    tituloDudas: 'Si te lo estás preguntando',
    wa: '¿Prefieres preguntarnos?',
    waEnlace: 'Escríbenos por WhatsApp',
    pie: 'REVO Studios · Carrer de Ferran Agulló 24, Turó Park, Barcelona',
    privacidad: 'Privacidad',
  },

  /* Dudas plegadas al final del resultado: pregunta y respuesta. */
  DUDAS: [
    ['¿Cuánto cuesta ser miembro?', 'La visita es gratis. La membresía REVO Core son 300 € al mes, con todas las terapias ilimitadas, hasta dos masajes al mes y el plan personalizado.'],
    ['¿Es caro?', 'Una sola sesión de cámara hiperbárica son 80 €, y una de crioterapia 50 €. La membresía las da ilimitadas: con cuatro visitas al mes ya compensa, y sale a unos 10 € al día.'],
    ['¿Funciona de verdad?', 'Más de 25 años de ciencia detrás. Los deportistas de élite lo usan desde hace años, y la mayoría de miembros nota cambios en las primeras semanas si viene con constancia.'],
    ['No tengo tiempo', 'Con dos visitas de una hora a la semana ya se nota, y se viene cuando cuadre: entre semana de 7 a 21, y los sábados de 9 a 14.'],
    ['Ya hago deporte', 'Esto lo potencia, como el gimnasio lo complementa. Si haces hielo en casa, no es comparable: la cabina baja a −120 grados y en dos minutos activa todo el cuerpo.'],
    ['¿Y si no es para mí?', 'No pasa nada. La visita es justo para verlo: 30 minutos, gratis y sin compromiso. Lo ves y decides.'],
    ['¿Dónde estáis?', 'Carrer de Ferran Agulló 24, en Turó Park. De lunes a viernes de 7:00 a 21:00 y sábados de 9:00 a 14:00.'],
  ],

  /* Texto del botón de reservar, título de la propuesta y cuándo aparece el botón fijo de abajo
     ('leccion' = cuando la persona ha pasado la lección; 'inicio' = desde el principio).
     Solo hay una versión: Eric decidió el 20-oct-2026 no hacer A/B de texto aquí (ya hay bastantes tests).
     El parámetro ?v= del enlace sigue admitiéndose y viaja en los eventos, pero cualquier valor cae en «a». */
  VARIANTES: {
    a:{ cta:'Reservar visita gratuita', fijoDesde:'leccion', tituloProp:'Lo mejor es que vengas' },
  },
};
