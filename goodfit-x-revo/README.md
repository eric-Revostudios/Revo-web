# GoodFit × REVO — landing del día de prueba

Página estática, autocontenida. No comparte CSS, JS ni assets con el resto de la web:
todo lo que necesita vive en esta carpeta.

## Publicar con GitHub Desktop

1. Arrastra la carpeta `goodfit-x-revo` a la raíz del repo de la web de REVO.
2. Commit + Push.
3. Queda en `https://revostudios.eu/goodfit-x-revo/`.

Si quieres otra URL, renombra la carpeta: la ruta de la carpeta ES la URL.

## Contenido

- `index.html` — la página entera (HTML + CSS inline, sin dependencias ni CDN).
- `media/` — vídeo de intro, fotos y logos. Nada más se carga desde fuera.

## Cosas que se cambian a mano

- **Formulario de reserva**: busca `tally.so/r/J9bLJo` en `index.html` (2 apariciones).
- **Vídeo de intro**: sustituye `media/intro.mp4` (12 MB). El corte a 18,5 s está en el
  script del final de `index.html` (`FIN`), para no llegar al rótulo del final del clip.
- **Textos**: están en el HTML, sin plantillas ni build.
