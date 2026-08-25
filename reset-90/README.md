# RESET 90 — landing para revostudios.eu

Carpeta autocontenida. No toca ningún archivo de la web actual.

## Publicar
1. Copia la carpeta `reset-90` completa a la raíz del repositorio de la web (donde está `index.html`).
2. GitHub Desktop → commit → push.
3. Queda publicada en **https://revostudios.eu/reset-90/**

Para cambiar la URL, renombra la carpeta (`reset-90-septiembre`, `programa-reset-90`…) y actualiza `canonical`, `og:url` y `og:image` en el `<head>` de `index.html`.

## Contenido
- `index.html` — la landing completa: HTML estático, sin build, sin dependencias que instalar.
- `assets/` — logo, fotos de terapias, foto de Bea y la imagen de previsualización al compartir (`og-reset-90.png`).

Solo carga desde fuera: tipografías de Google Fonts y el widget de Tally (formulario). Con eso ya funciona; si un día quitas internet a esas dos cosas, la página sigue leyéndose.

## Enlazarla desde la web
Añade en el menú o donde te encaje:

    <a href="/reset-90/">RESET 90</a>

## Ajustes rápidos (dentro de index.html)
- **Formulario**: busca `FORM_ID = 'dWe68K'` y cámbialo por el ID de tu formulario de Tally. Cada CTA envía el campo oculto `origen` (hero / plan / cierre / sticky) para saber desde dónde entra cada lead.
- **Analítica**: hay un comentario en el `<head>` (`<!-- Analítica: ... -->`) para pegar tu GA4 o Meta Pixel.
- **Legales**: los dos enlaces del footer apuntan a `revostudios.eu/politica-privacidad.html` y `revostudios.eu/aviso-legal.html`. Verifica que esas URLs son las de tu web y corrígelas si no.
- **Fechas, precio y plazas** están escritos en el texto; se editan directamente en el HTML.

## Antes de publicar
- Confirma las URLs de los legales.
- Si tienes `sitemap.xml`, añade `https://revostudios.eu/reset-90/`.
- Las fotos van tal cual salieron del proyecto: si quieres bajar peso, pásalas por un compresor (TinyPNG o similar) manteniendo los mismos nombres.
