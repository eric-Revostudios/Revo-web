# GoodFit × REVO — landing del día de prueba

Página estática, autocontenida. No comparte CSS, JS ni assets con el resto de la web:
todo lo que necesita vive en esta carpeta.

## Publicar con GitHub Desktop

1. Arrastra la carpeta **entera** `goodfit-x-revo` a la raíz del repo de la web.
2. En GitHub Desktop, antes de hacer commit, comprueba que en la lista de cambios
   aparecen **9 archivos**: `index.html`, `README.md` y los 7 de `media/`.
   Si solo aparece `index.html`, el repo tiene un `.gitignore` que se está comiendo
   la carpeta (busca líneas tipo `media/`, `*.jpg`, `*.mp4`, `assets/`) → añade una
   excepción: `!goodfit-x-revo/media/**`
3. Commit + Push. Queda en `https://revostudios.eu/goodfit-x-revo/`.

La ruta de la carpeta ES la URL: renómbrala y cambia la URL.

## Por qué en archivos separados y no todo dentro del HTML

El navegador cachea cada imagen por separado y pinta la página antes de tener
las fotos. Metiéndolas dentro del HTML (base64) pesan un 33% más, no se cachean y
la página no aparece hasta que ha bajado el archivo completo.

## Peso

| archivo | peso |
|---|---|
| index.html | 56 KB |
| media/*.jpg (4 fondos) | 308 KB |
| media/ logos | 40 KB |
| media/intro.mp4 | **12,1 MB** ← pendiente de comprimir |

**El vídeo es el único problema real.** 12 MB en la primera pantalla es mucho para
datos móviles. Antes de publicar, pásalo por [handbrake.fr](https://handbrake.fr)
o similar: 720p, H.264, sin pista de audio, ~2 Mbps → queda en 1,5–2,5 MB sin
diferencia visible (va detrás de un degradado oscuro al 92% de opacidad).
Guárdalo como `media/intro.mp4` y ya está.

Si prefieres no usar vídeo: borra la línea `<video ...>` de `index.html`.
La foto `media/intro.jpg` ya está puesta como `poster`, así que la pantalla de
entrada se ve igual (fija) sin tocar nada más.

## Cosas que se cambian a mano

- **Formulario de reserva**: busca `tally.so/r/J9bLJo` en `index.html` (2 apariciones).
- **Corte del vídeo**: la variable `FIN` (18,5 s) al final de `index.html`, para no
  llegar al rótulo del final del clip.
- **Textos**: están en el HTML, sin plantillas ni build.
- **Imagen para redes** (`og:image`): apunta a
  `https://revostudios.eu/goodfit-x-revo/media/intro.jpg` — ajústala si cambias la URL.
