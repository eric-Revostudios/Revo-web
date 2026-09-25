# GoodFit × REVO — landing de la prueba

Página estática, autocontenida. No comparte CSS, JS ni assets con el resto de la web:
todo lo que necesita vive en esta carpeta.

## Publicar con GitHub Desktop

1. Arrastra la carpeta **entera** `goodfit-x-revo` a la raíz del repo de la web.
2. Antes de hacer commit, comprueba que en la lista de cambios aparecen **8 archivos**:
   `index.html`, `README.md` y los 7 de `media/` (incluido `intro.mp4`).
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
| `media/intro.mp4` | vídeo de la primera pantalla (12,1 MB) |

Sin fuentes externas ni dependencias. HTML + imágenes ≈ 400 KB.

**El vídeo es el único punto pesado**: 12,1 MB en la primera pantalla es mucho para
datos móviles. Antes de publicar, pásalo por [handbrake.fr](https://handbrake.fr):
720p, H.264, sin audio, ~2 Mbps → queda en 1,5–2,5 MB sin diferencia visible (va
detrás de un degradado oscuro). Guárdalo igual, como `media/intro.mp4`.

Si prefieres no usar vídeo: borra la línea `<video ...>` de `index.html`. La foto
`media/intro.jpg` queda de fondo y la entrada se ve igual, fija. En ese caso sube
su `opacity` de `.55` a `.92`.

El corte del clip se controla con la variable `FIN` (18,5 s) al final del HTML, para
no llegar al rótulo del final.

## Sección final: beneficios cruzados para miembros

La landing no vende una membresía cruzada: la sección final explica qué tiene cada
miembro en el otro centro (textos a mano en `index.html`, busca `beneficios para miembros`):

- **Miembro de GoodFit** → Ilimitada: 2 crioterapias/mes · Prime: 2 combinaciones/mes
  (PEMF + crioterapia + botas de compresión). Botón «Reservar en REVO Studios» →
  `https://www.revostudios.eu/crioterapia.html`.
- **Miembro de REVO** → 2 sesiones/mes en GoodFit. Botón «Reservar en GoodFit» →
  `https://goodfitbarcelona.com/horarios/`.

El formulario «Más información» (Web3Forms, access key `82f02911-70ad-44a6-abc5-c062eb9d235b`,
pública) sigue en el HTML pero ya no tiene botón que lo abra. Para recuperarlo basta con
añadir un botón con el atributo `data-info-open` y cambiar el texto del formulario, que
habla de «la membresía». El popup de Tally se retiró del todo hace tiempo.

## Cosas que se cambian a mano

- **Textos**: están en el HTML, sin plantillas ni build.
- **Imagen para redes** (`og:image`): apunta a
  `https://revostudios.eu/goodfit-x-revo/media/intro.jpg` — ajústala si cambias la URL.

## Rutas y barra final

Las rutas de `media/` son relativas. Un script de una línea en el `<head>` añade
una etiqueta `<base>` cuando el servidor sirve la página sin barra final
(`/goodfit-x-revo`), para que el navegador no busque las fotos en la raíz del
dominio. Sin redirecciones (evita bucles con hostings que quitan la barra), y
puedes renombrar o mover la carpeta sin tocar nada.

## Si aun así no se ven

Abre la web, clic derecho → Inspeccionar → pestaña Network, y recarga. Las líneas
en rojo te dicen exactamente qué URL está pidiendo y fallando. Compárala con donde
están de verdad los archivos. Los dos culpables habituales:

1. La carpeta `media/` no ha subido (el `.gitignore` del repo se la come) →
   añade `!goodfit-x-revo/media/**`.
2. La carpeta está en otra ruta de la que dicen las rutas absolutas de arriba.

Alternativa a prueba de bombas: el archivo único `GoodFit x REVO.html`, que lleva
las fotos y los logos incrustados dentro y no depende de ninguna carpeta (no lleva
vídeo).
