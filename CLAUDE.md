# CLAUDE.md · Web pública de REVO Studios (`Revo-web`)

**Owner:** Eric (Alex) — operador estratégico REVO, **no programa**. Explica los cambios en lenguaje claro, sin jerga.
**Repo:** https://github.com/eric-Revostudios/Revo-web · **Deploy:** Vercel (`vercel.json`)

## Qué es esto

La **web pública** de REVO Studios. Es un sitio **HTML estático** — no hay framework, ni build, ni `npm install`. Se abren los `.html` directamente y se editan. Nada que ver con el dashboard (`~/code/revo-platform`) ni con el capturador clínico (`~/code/revo-clinical`), que son apps Next.js aparte.

## Estructura

- **Páginas de terapias:** `crioterapia.html`, `camara-hiperbarica.html`, `luz-roja.html`, `masajes.html`, `presoterapia.html`, `pemf.html`, `neuroestimulacion.html`, `respark.html`
- **Páginas de marca:** `index.html`, `metodo.html`, `terapias.html`, `experiencias.html`, `studios.html`, `membresias.html`
- **Legales:** `aviso-legal.html`, `privacidad.html`, `cookies.html`
- **Inglés:** todo duplicado dentro de `en/` — **si cambias una página en español, mira si toca replicar en `en/`**
- **CSS:** un fichero por área (`revo-studios.css`, `revo-terapia.css`, `revo-metodo.css`, `revo-amanecer.css`, `revo-verano.css`…)
- **JS:** `revo-reservar.js` (reservas), `revo-cookies.js` (consentimiento), `revo-analytics.js` + `revo-pixel.js` (medición), `revo-footer-fluid.js`, `revo-lang.js` (aviso de idioma, sin redirecciones)
- **SEO:** `sitemap.xml` y `robots.txt` — si añades o renombras una página, actualiza el sitemap.
- **Funciones de servidor (`api/`):** la única excepción al "todo estático". `api/peak-lead.js` es una función Edge de Vercel preparada para avisar al instante de cada solicitud del formulario REVO Peak (Tally `A7eMNo`) por push gratuito (ntfy) o SMS (Twilio). **No está activada** (decisión de Eric, 25-sep-2026: con el email basta). Los avisos de leads van por email de Tally a luca@ y hello@revostudios.eu. Si algún día se quiere activar: webhook en Tally → Integrations → Webhooks → `https://www.revostudios.eu/api/peak-lead` con signing secret, y en Vercel las variables `TALLY_SIGNING_SECRET` + `NTFY_TOPIC` (push) o `TWILIO_*`/`SMS_TO` (SMS). Sin dependencias (usa `fetch`).

## Landing de captación «Tu caso» (`/tu-caso`)

La página a la que llega quien pulsa el botón de un anuncio de Instagram (A/B contra el bot de WhatsApp, oct-2026). Dos preguntas y un resultado con su lección, sus terapias y la propuesta de la visita gratuita. Diseño y porqués: `~/code/revo-clinical/docs/landing-captacion-diseno.md`.

- **Ficheros:** `tu-caso.html` (rewrite `/tu-caso` en `vercel.json`; `noindex`, fuera del sitemap, solo en castellano), `tu-caso-contenido.js` (TODO el texto: ramas, terapias, dudas, precios, variantes; cambiar una frase se hace aquí), `tu-caso.js` (navegación por hash y eventos), `tu-caso.css`, `api/landing-evento.js` (función Edge que reenvía los eventos a la Platform).
- **Enlace de Momence:** un solo sitio, `window.REVO_TU_CASO_URL` en la cabecera de `tu-caso.html`. Hoy es el de «Visita REVO»; cuando Eric cree el servicio propio de la landing en Momence, se cambia ahí y en ningún otro sitio.
- **Enlace para la agencia:** `https://www.revostudios.eu/tu-caso?utm_source=ig&utm_content=NOMBRE-DEL-ANUNCIO` (la agencia pone el nombre de cada anuncio). `utm_source` y `utm_content` viajan en cada evento. Solo hay una versión del texto: Eric descartó el A/B de variantes (20-oct-2026); el parámetro `?v=` se admite por el contrato de eventos pero siempre cae en «a».
- **Atribución de reservas:** sin servicio propio en Momence (Eric no quiere más servicios, 20-oct-2026). La Platform cruza la hora del evento `pulso_reservar` con la hora de creación de las reservas de visita en Momence, y el coach lo confirma preguntando en la visita.
- **Medición:** cada toque manda un evento JSON (sin cookies, sin datos personales, con un id de sesión aleatorio que muere al cerrar la pestaña) a `POST /api/landing-evento`, que lo reenvía a la Platform. Necesita en Vercel (proyecto de la web) `LANDING_EVENTOS_URL` y `LANDING_EVENTOS_SECRET`; sin ellas la función responde 204 y la página sigue funcionando. El contrato de los eventos está en la sección 7 del documento de diseño y no se cambia sin tocar los dos lados. Añadido el 20-oct-2026: `pulso_reservar` lleva `desde: propuesta · fijo · prueba` (el tercero es el botón «Probar una terapia ese mismo día», mismo enlace de Momence).
- **No carga** header, footer, `revo-cookies.js`, `revo-analytics.js`, `revo-pixel.js` ni `revo-lang.js`: sin cookies no hace falta banner. Si algún día se mete el píxel, hará falta el aviso.

## Landing «Tu punto de partida» con tres preguntas (`/tu-punto`)

Publicada el 13-nov-2026. Es la misma oferta que `/punto-de-partida` («Tu punto de partida»: conocer REVO, medir edad biológica, composición corporal e índice de estrés, y salir con un plan), contada de otra forma, para quien ya se cuida y se encuentra bien: la persona se pone nota («¿a qué porcentaje dirías que estás hoy?»), dice qué hace ya y dónde notaría lo que falta, y ve su resultado con las tres terapias que solemos combinar y la invitación. Las dos páginas conviven hasta que Eric decida cuál se queda con los anuncios.

- **Ficheros:** `tu-punto.html` (rewrite `/tu-punto` en `vercel.json`; `noindex`, fuera del sitemap, solo en castellano), `tu-punto-contenido.js` (TODO el texto; la duración de la visita es `MINUTOS`, una sola línea), `tu-punto.js` (las tres preguntas, el resultado y los eventos), `tu-punto.css`. El titular y la primera pregunta están además escritos en `tu-punto.html` para que se vean antes de que cargue el JavaScript: si se cambian en el contenido, se cambian también ahí.
- **Cómo se entra y cómo se sale (Eric, 13-nov-2026):** la primera pantalla promete saber qué terapias pueden ayudarte a estar al 100 % («Descubre qué terapias pueden ayudarte a estar al 100 %.»); la invitación al punto de partida no se nombra arriba, llega al final, después del resultado («Cuáles tienen sentido para ti… lo decidimos después de medirte. Eso es tu punto de partida.»). El titular anterior («Te encuentras bien. Y precisamente por eso…») no le gustó: no volver a él.
- **Voz y aspecto:** las frases salen de los guiones de los vídeos (12-nov-2026) y del documento de la landing del equipo, casi literales; nada de explicar mecanismos del cuerpo ni masculinos genéricos. El aspecto es el de la web (degradado azul, secciones blancas, rótulos con punto de luz).
- **Enlace de Momence:** un solo sitio, `window.REVO_TU_PUNTO_URL` en la cabecera de `tu-punto.html`. **Pendiente:** hoy es el de «Visita REVO»; cuando exista el servicio «Tu punto de partida» en Momence, se cambia ahí (y en `punto-de-partida.html`).
- **Enlace para la agencia:** `https://www.revostudios.eu/tu-punto?utm_source=ig&utm_content=NOMBRE-DEL-ANUNCIO`.
- **La frase que abre la invitación** («Para que la cabeza también termine la jornada.») sale de lo que la persona contestó en la tercera pregunta (`para` de cada área, en el contenido). Si salta directa a la invitación y el nombre del anuncio lleva `icp1`…`icp6` en `utm_content` (la misma norma que `/punto-de-partida`), sale la del perfil del anuncio (`PERFILES`). Las frases son las del documento de la landing del equipo (13-nov-2026).
- **De ese documento no se ha cogido:** el formulario «Prefiero que me llaméis» (Eric no quiere formulario; el apoyo es WhatsApp), decir que la Dra. Rivera interpreta los resultados en la visita (la atiende quien cierra la venta), el número de colegiada y «¿Qué tengo que traer?» (los dos pendientes de confirmar).
- **Medición:** los mismos eventos y la misma función que `/tu-caso` (`api/landing-evento.js`), con `pagina: 'tu-punto'`. `eligio_tema` lleva dónde lo notaría (`tema`), el porcentaje y lo que ya hace; quien salta directo a la invitación cuenta como tema `directo`. No se usa `eligio_rama`. Un evento con otro nombre se pierde sin avisar: hay que añadirlo en `tu-punto.js`, en `api/landing-evento.js` y en la Platform.
- **Cookies y píxel:** carga `revo-cookies.js` y `revo-pixel.js` (el píxel de Meta solo arranca si la persona acepta, y marca «Lead» al pulsar un botón de reservar). En el móvil el aviso de cookies se dibuja más bajo y estrecho solo en esta página (final de `tu-punto.css`) para que no tape la pregunta.

## Al trabajar aquí

- Es la **cara pública** del negocio: un fallo se ve. Comprueba el cambio en el navegador antes de dar nada por bueno.
- Respeta el estilo del HTML/CSS que ya existe; no introduzcas frameworks ni dependencias.
- **Idioma: nunca redirigir según el idioma del navegador.** Googlebot navega en inglés y veía las páginas en español como redirecciones, así que no las indexaba (arreglado el 28-sep-2026). Las etiquetas hreflang van siempre con la URL completa.
- **Peso:** imágenes nuevas en WebP (los og:image pueden seguir en JPG) y fuentes en WOFF2. El vídeo de portada tiene versión de ordenador y vertical para móvil (`hero-video-1080.mp4`, `hero-video-mobile.mp4`), en H.264 estándar 4:2:0.
- Publicar = commit + push a `origin/main` (Vercel despliega solo). Confirma con Eric antes de publicar.
