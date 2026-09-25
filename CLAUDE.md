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
- **JS:** `revo-reservar.js` (reservas), `revo-cookies.js` (consentimiento), `revo-analytics.js` + `revo-pixel.js` (medición), `revo-footer-fluid.js`
- **SEO:** `sitemap.xml` y `robots.txt` — si añades o renombras una página, actualiza el sitemap.
- **Funciones de servidor (`api/`):** la única excepción al "todo estático". `api/peak-lead.js` es una función Edge de Vercel: recibe el webhook de Tally del formulario REVO Peak (`A7eMNo`) y avisa al instante por **push gratuito vía ntfy** (app ntfy en el móvil, suscrita al tema `NTFY_TOPIC`) y, opcionalmente, por SMS con Twilio. Sin dependencias (usa `fetch`). Variables de entorno en Vercel: `TALLY_SIGNING_SECRET` (obligatoria), `NTFY_TOPIC` (push; opcionales `NTFY_SERVER`, `NTFY_TOKEN`), y para SMS `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`, `SMS_TO`. Webhook en Tally → Integrations → Webhooks → `https://www.revostudios.eu/api/peak-lead` con signing secret activado. Vale para cualquier formulario de Tally con campos Nombre / Apellidos / Email / Teléfono. Además, Tally manda email de cada solicitud a luca@ y hello@revostudios.eu.

## Al trabajar aquí

- Es la **cara pública** del negocio: un fallo se ve. Comprueba el cambio en el navegador antes de dar nada por bueno.
- Respeta el estilo del HTML/CSS que ya existe; no introduzcas frameworks ni dependencias.
- Publicar = commit + push a `origin/main` (Vercel despliega solo). Confirma con Eric antes de publicar.
