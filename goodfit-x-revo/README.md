# GoodFit × REVO — landing de la prueba

Página estática, autocontenida. No comparte CSS, JS ni assets con el resto de la web:
todo lo que necesita vive en esta carpeta.

## Publicar con GitHub Desktop

1. Arrastra la carpeta **entera** `goodfit-x-revo` a la raíz del repo de la web.
2. Antes de hacer commit, comprueba que en la lista de cambios aparecen **8 archivos**:
   `index.html`, `README.md` y los 6 de `media/`.
   Si solo aparece `index.html`, el repo tiene un `.gitignore` que se está comiendo
   la carpeta (busca líneas tipo `media/`, `*.jpg`, `assets/`) → añade una excepción:
   `!goodfit-x-revo/media/**`
3. Commit + Push. Queda en `https://revostudios.eu/goodfit-x-revo/`.

La ruta de la carpeta ES la URL: renómbrala y cambia la URL.

## Contenido

| archivo | qué es |
|---|---|
| `index.html` | la página entera (textos, estilos y scripts dentro) |
| `media/intro.jpg` | fondo de la primera pantalla + imagen para redes |
| `media/entrenas.jpg`, `media/recuperas.jpg` | fondos de las dos mitades del método |
| `media/reserva.jpg` | fondo de la pantalla final |
| `media/goodfit-white.svg`, `media/revo-studios-white.png` | logos |

Peso total ≈ 400 KB. Sin vídeo, sin fuentes externas, sin dependencias.

## Formulario

El CTA («Solicita tu prueba») abre el formulario de **Tally en popup**, sin salir de
la página. Se apoya en dos cosas dentro de `index.html`:

- el script del widget en el `<head>`: `https://tally.so/widgets/embed.js`
- los enlaces con `data-tally-open="J9bLJo"` (2 apariciones)

Para cambiar de formulario, sustituye `J9bLJo` por el ID del nuevo (aparece también
en el `href="#tally-open=..."`, que actúa de respaldo).
Los textos del propio formulario se editan en Tally, no aquí.

## Cosas que se cambian a mano

- **Textos**: están en el HTML, sin plantillas ni build.
- **Imagen para redes** (`og:image`): apunta a
  `https://revostudios.eu/goodfit-x-revo/media/intro.jpg` — ajústala si cambias la URL.
