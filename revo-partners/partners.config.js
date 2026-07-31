/* ============================================================================
   REVO · CENTROS ASOCIADOS — ARCHIVO ÚNICO DE CONFIGURACIÓN
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar cada mes.
   No hace falta saber programar. Solo cambiar el texto que va ENTRE COMILLAS.

   EL DÍA 1 DE CADA MES
   1. Abre este archivo en GitHub → botón del lápiz (Edit).
   2. Cambia el valor de "codigo" de cada centro (línea marcada con  ← CÓDIGO).
   3. Commit changes. Vercel publica solo en ~1 minuto.

   REGLAS PARA NO ROMPER NADA
   · Cambia solo lo que está entre "comillas".
   · No borres comas, llaves { } ni corchetes [ ].
   · Si un código todavía no está, déjalo vacío ("") y la página avisará
     al miembro de que lo pida en recepción. Nunca se rompe.

   PAUSAR UN CENTRO (vacaciones, cierre, acuerdo en revisión)
   · estado: "pausado"  +  mensajePausa: "Texto que verá el miembro."
   · El bloque sigue visible y su ancla sigue funcionando (los QR de la
     revista impresa apuntan a #barrys #corehaus #casabarre #yogaone y
     seguirán existiendo durante meses). No borres nunca un centro.
   · Para reactivarlo: estado: "activo".

   AÑADIR UN QUINTO CENTRO
   · Copia un bloque entero { ... } de centros y cambia sus valores.
   · El "id" es el ancla del QR: id "nuevocentro" → revostudios.eu/partners#nuevocentro
   · "pasos" admite dos formatos:
       a) lista de textos:      pasos: ["Primer paso", "Segundo paso"]
       b) enlace externo:       pasos: { enlace: "https://...", texto: "Ver el paso a paso" }
   ========================================================================== */

window.REVO_PARTNERS = {

  /* ---- PUERTA DE ACCESO --------------------------------------------------
     Una sola palabra, la misma para todos los miembros. Se comunica en el
     estudio, en la revista y en el mail mensual. No distingue mayúsculas,
     acentos ni espacios sobrantes. Se recuerda 90 días en el navegador.   */
  palabraAcceso: "member",

  /* Palabras que ya se retiraron. Quien use una de estas recibe un aviso
     distinto ("ya no está activa") en vez de un error genérico.
     Al cambiar la palabra: mueve la anterior a esta lista.               */
  palabrasRetiradas: [],

  /* ---- CENTROS ---------------------------------------------------------- */
  centros: [

    {
      id: "barrys",
      nombre: "Barry's Barcelona",
      sesionesMes: 2,
      codigo: "1001CLASSREVOIB0108",           /* ← CÓDIGO */
      enlace: "https://www.barrys.com/pricing/barcelona?_mt=%2Fbuy%2F10273",
      estado: "activo",
      es: {
        descripcion: "Alta intensidad por intervalos. 50 minutos alternando cinta y fuerza.",
        cta: "Reservar en Barry's",
        pasos: [
          "Abre el enlace de Barry's.",
          "Baja hasta “Class Packages”.",
          "Selecciona “1 Class”.",
          "Crea tu cuenta o inicia sesión.",
          "Aplica el código en el pago.",
          "Elige sesión y posición en la sala."
        ]
      },
      en: {
        descripcion: "High-intensity intervals. 50 minutes alternating treadmill and strength.",
        cta: "Book at Barry's",
        pasos: [
          "Open the Barry's link.",
          "Scroll down to “Class Packages”.",
          "Select “1 Class”.",
          "Create your account or log in.",
          "Apply the code at checkout.",
          "Pick your session and your spot in the room."
        ]
      }
    },

    {
      id: "corehaus",
      nombre: "Corehaus",
      sesionesMes: 2,
      codigo: "",                              /* ← CÓDIGO */
      enlace: "https://corehaus.es/schedule",
      estado: "pausado",
      es: {
        descripcion: "Fuerza sin impacto. 50 minutos de resistencia sobre el Coreformer.",
        mensajePausa: "Cerrado por vacaciones durante agosto. Vuelve en septiembre.",
        resumen: "Reserva tu clase en la plataforma de Corehaus y aplica el código en el pago.",
        cta: "Reservar en Corehaus",
        pasos: {
          enlace: "https://app.tango.us/app/workflow/Book-Appointment-and-Apply-Promo-Code-af9f573183c04e298fdf95e5e3074286",
          texto: "Ver el paso a paso en vídeo"
        }
      },
      en: {
        descripcion: "Strength without impact. 50 minutes of resistance on the Coreformer.",
        mensajePausa: "Closed for holidays throughout August. Back in September.",
        resumen: "Book your class on the Corehaus platform and apply the code at checkout.",
        cta: "Book at Corehaus",
        pasos: {
          enlace: "https://app.tango.us/app/workflow/Book-Appointment-and-Apply-Promo-Code-af9f573183c04e298fdf95e5e3074286",
          texto: "Watch the step-by-step video"
        }
      }
    },

    {
      id: "casabarre",
      nombre: "Casa Barré",
      sesionesMes: 1,
      codigo: "CASAREVOAGOSTO",                /* ← CÓDIGO */
      enlace: "https://casabarre.com/barcelona/horarios",
      estado: "activo",
      es: {
        descripcion: "Postura, equilibrio y control. Barré al ritmo de la música.",
        cta: "Reservar en Casa Barré",
        pasos: [
          "Abre el enlace de Casa Barré.",
          "Selecciona el estudio de Barcelona.",
          "Compra el paquete “REVO Members”.",
          "Introduce el código en el pago, en mayúsculas y sin espacios.",
          "Reserva la clase que te encaje desde su plataforma."
        ]
      },
      en: {
        descripcion: "Posture, balance and control. Barre to the beat of the music.",
        cta: "Book at Casa Barré",
        pasos: [
          "Open the Casa Barré link.",
          "Select the Barcelona studio.",
          "Buy the “REVO Members” package.",
          "Enter the code at checkout, in capitals and with no spaces.",
          "Book the class that suits you on their platform."
        ]
      }
    },

    {
      id: "yogaone",
      nombre: "YogaOne Aragó-Eixample",
      sesionesMes: 2,
      codigo: "REVOAUG26YOGA1",                /* ← CÓDIGO */
      enlace: "",                              /* no hay checkout: se reserva por WhatsApp */
      estado: "activo",
      es: {
        descripcion: "Movilidad y regulación. Yoga, pilates y meditación.",
        /* Condiciones: se muestran ANTES de que el miembro rellene nada. */
        condiciones: [
          "Acceso a las clases de la Sala I, de lunes a viernes.",
          "Reserva con un máximo de 48 horas de antelación.",
          "Solo en el centro YogaOne Aragó-Eixample."
        ],
        /* Dos fases dentro del mismo bloque. La primera es plegable. */
        pasos: [
          {
            titulo: "Solo la primera vez",
            plegable: true,
            pasos: [
              "Rellena el formulario de alta.",
              "YogaOne tramitará tu alta y te contactará para explicarte el funcionamiento de las reservas."
            ],
            cta: "Rellenar el formulario de alta",
            enlace: "https://form.jotform.com/261873005584056"
          },
          {
            titulo: "Cada vez que quieras reservar",
            nota: "Se reserva por WhatsApp directamente con el centro. Ellos confirman la disponibilidad de plaza."
          }
        ]
      },
      en: {
        descripcion: "Mobility and regulation. Yoga, pilates and meditation.",
        condiciones: [
          "Access to Sala I classes, Monday to Friday.",
          "Book no more than 48 hours in advance.",
          "Only at the YogaOne Aragó-Eixample centre."
        ],
        pasos: [
          {
            titulo: "First time only",
            plegable: true,
            pasos: [
              "Fill in the sign-up form.",
              "YogaOne will process your registration and contact you to explain how booking works."
            ],
            cta: "Fill in the sign-up form",
            enlace: "https://form.jotform.com/261873005584056"
          },
          {
            titulo: "Every time you want to book",
            nota: "Booking is done over WhatsApp directly with the centre. They confirm availability."
          }
        ]
      }
    }

  ]
};
