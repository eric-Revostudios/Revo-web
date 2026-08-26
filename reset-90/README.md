# RESET 90 — landing para revostudios.eu

Carpeta autocontenida. No toca ningún archivo de la web actual.

## Publicar
1. Copia la carpeta `reset-90` completa a la raíz del repositorio de la web (donde está `index.html`).
2. GitHub Desktop → commit → push.
3. Queda publicada en **https://revostudios.eu/reset-90/**

Para cambiar la URL, renombra la carpeta (`reset-90-septiembre`, `programa-reset-90`…) y actualiza `canonical`, `og:url` y `og:image` en el `<head>` de `index.html`.

## Contenido
- `index.html` — la landing completa: HTML estático, sin build, sin dependencias que instalar.
- `plazas.html` — panel para cambiar las plazas que quedan desde el móvil.
- `assets/` — logo, fotos de terapias, foto de Bea y la imagen de previsualización al compartir (`og-reset-90.png`).

Solo carga desde fuera: tipografías de Google Fonts y el widget de Tally (formulario). Con eso ya funciona; si un día quitas internet a esas dos cosas, la página sigue leyéndose.

## Enlazarla desde la web
Añade en el menú o donde te encaje:

    <a href="/reset-90/">RESET 90</a>

## Ajustes rápidos (dentro de index.html)
- **Plazas**: ver abajo, «El panel de plazas».
- **Formulario**: busca `FORM_ID = 'dWe68K'` y cámbialo por el ID de tu formulario de Tally. Cada CTA envía el campo oculto `origen` (hero / terapias / plan / cierre / sticky) para saber desde dónde entra cada lead.
- **Captura de leads que no reservan** (punto 2.5 del documento de Bea): se hace en Tally, no en la landing — configura la página final del test para ofrecer la guía «Las 5 fugas de energía» a quien encaja pero no reserva.
- **Analítica**: hay un comentario en el `<head>` (`<!-- Analítica: ... -->`) para pegar tu GA4 o Meta Pixel.
- **Legales**: los dos enlaces del footer apuntan a `revostudios.eu/politica-privacidad.html` y `revostudios.eu/aviso-legal.html`. Verifica que esas URLs son las de tu web y corrígelas si no.
- **Fechas y precio** están escritos en el texto; se editan directamente en el HTML.

## El panel de plazas

`plazas.html` es un panel para el móvil: abres la página, das a − o a +, pulsas «Publicar el cambio» y la landing lo recoge. Sin tocar código, sin publicar la web, sin hojas de cálculo.

### Instalación (una vez, unos cinco minutos)

**1 · Crea el almacén**

Ve a [script.google.com](https://script.google.com) → **Nuevo proyecto**. Borra lo que haya y pega esto:

    const CLAVE = 'cambia-esto-por-una-palabra-larga';

    function doGet(e) {
      const P = PropertiesService.getScriptProperties();
      const p = e.parameter || {};
      if (p.set !== undefined && p.clave === CLAVE) {
        const n = Math.max(0, Math.min(99, parseInt(p.set, 10) || 0));
        P.setProperty('plazas', String(n));
        P.setProperty('fecha', new Date().toISOString());
      }
      const out = {
        plazas: Number(P.getProperty('plazas') || 15),
        fecha: P.getProperty('fecha') || null
      };
      return ContentService.createTextOutput(JSON.stringify(out))
        .setMimeType(ContentService.MimeType.JSON);
    }

Cambia `CLAVE` por una palabra larga que solo sepas tú. Guarda.

**2 · Publícalo**

**Implementar → Nueva implementación** → tipo **Aplicación web**. En «Ejecutar como», tú. En «Quién tiene acceso», **Cualquier persona**. Implementar. Google te pedirá permiso una vez: acéptalo. Copia la **URL de la aplicación web** (termina en `/exec`).

**3 · Pega los datos en dos sitios**

- En `plazas.html`, arriba del todo del script: `ENDPOINT` = esa URL, `CLAVE` = tu palabra.
- En `index.html`, busca `PLAZAS_URL = ''` y pega ahí la misma URL.

**4 · Publica la web esta vez**

Y ya no hace falta más. El panel queda en **revostudios.eu/reset-90/plazas.html**. Guárdalo en la pantalla de inicio del móvil.

### Cosas que conviene saber

- **La dirección del panel es la llave.** No está enlazada desde ninguna parte y lleva `noindex`, pero quien la tenga y sepa la clave puede cambiar el número. No la pegues en grupos.
- **El cambio tarda un par de minutos.** Google cachea la respuesta un rato; no es instantáneo.
- **Si algo falla, la landing no se rompe**: muestra el número de respaldo escrito en el HTML (`PLAZAS_INICIALES`). Mantenlo más o menos al día por si acaso.
- **Solo acepta un número entre 0 y 15**, así que un dedazo no publica «quedan 300 plazas».
- **Publicar un 0 cierra la edición**: todos los botones pasan a «Únete a la lista de espera de enero» y las líneas de plazas cambian al aviso de edición cubierta. El panel te lo enseña antes de publicar.
- Si el navegador bloquea la petición, el panel ofrece un enlace «Hacerlo en una pestaña nueva» que funciona siempre.
- `PLAZAS_TOTALES` (en los dos archivos) es el tamaño de la edición. Si un día son otras plazas, cámbialo ahí.

### Alternativa sin panel

Si prefieres no instalar nada, la landing también lee una **hoja de cálculo de Google** publicada como CSV: número en A1, Archivo → Compartir → Publicar en la web → formato CSV, y esa URL en `PLAZAS_URL`. Menos bonito, cero instalación.

## Antes de publicar
- Confirma las URLs de los legales.
- Si tienes `sitemap.xml`, añade `https://revostudios.eu/reset-90/`.
- Las fotos van tal cual salieron del proyecto: si quieres bajar peso, pásalas por un compresor (TinyPNG o similar) manteniendo los mismos nombres.
