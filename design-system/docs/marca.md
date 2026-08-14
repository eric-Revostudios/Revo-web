# REVO · Marca

## Qué es REVO

Club de longevidad y terapias avanzadas en Barcelona (Turó Park). Programas con
dirección médica real (diagnóstico clínico, plan personalizado, ajuste continuo con
datos) en un espacio de lujo sereno. El público: personas exigentes que quieren
rendimiento y salud con criterio médico, no "wellness" genérico.

La tensión que define la estética: **clínica + club privado**. Precisión de
instrumental médico, calidez de hotel de cinco estrellas. Ni frialdad de hospital
ni exuberancia de spa.

## Voz y tono

- **Frases cortas. Segunda persona.** "Un plan médico a tu medida, ejecutado
  contigo en el studio y ajustado con tus datos, cada mes."
- **Sobriedad**: nada de exclamaciones, emojis ni superlativos vacíos
  ("¡increíble!", "revolucionario"). La ambición se afirma con calma:
  "El máximo nivel de optimización física, mental y estética."
- **Concreción médica sin jerga opaca**: se nombran las pruebas reales
  (densitometría DEXA, eco-Doppler TSA) pero se explica qué obtienes tú.
- **Separador "·"** para datos en serie: "Programa anual · Diez plazas · Inicio en octubre".
- **Números con peso escritos** en el copy editorial ("Diez plazas"), cifras en
  datos técnicos y precios ("12.000€ / año").
- Español primero; toda pieza puede tener versión inglesa.

## Logotipo

- Archivo en `assets/revo-logo-white.png` (wordmark blanco) e icono en
  `assets/revo-icon.png`.
- Sobre fondo oscuro: blanco. Sobre fondo claro: tinta (`#14161C`) o negro.
  Nunca en azul REVO ni en degradado.
- **Marca de agua**: el wordmark enorme, recortado o a sangre, al 5–6% de opacidad
  sobre el fondo — un gesto de firma en cierres y contraportadas.
- Aire mínimo alrededor: la altura de la "R" por cada lado.

## Los gestos de firma

Estos detalles hacen que una pieza "sea REVO" en cualquier soporte. En digital
algunos llevan efectos de pantalla; la tabla da la traducción impresa. **Nunca
imitar un glow o un desenfoque en papel.**

| Gesto | En pantalla | En papel |
|---|---|---|
| **El punto** — un círculo pequeño azul REVO que precede micro-etiquetas y datos | 6–8px con halo luminoso (`box-shadow` azul) | Círculo pleno azul REVO de 1,5–2mm, sin halo |
| **Micro-etiqueta** — MAYÚSCULAS, tracking .18em, peso 600 | 9.5–13px | 6,5–7,5pt, tracking +180 |
| **Palabra serif** — una sola palabra del titular en Noto Serif itálica | `.ser` en el HTML | Igual: una palabra, itálica, tracking -50 |
| **Filos** — todos los bordes y divisores son líneas finísimas | 1px, blanco al 16% / tinta al 12% | Trazo 0,3pt, tinta o blanco al 20–30% |
| **Marcas de visor** — escuadras de 1px en las esquinas de un marco (evocan mira/escáner) | 12–15px, se encienden al interactuar | Escuadras de 3–4mm, trazo 0,3–0,5pt |
| **Numeración editorial** — pasos y bloques numerados 01, 02, 03… | Display grande, el número activo en azul | Igual: cifras display, una en azul si hay jerarquía |
| **Tarjeta de cristal** — panel translúcido sobre el fondo azul | blur + saturación + filos interiores claros | Panel navy-850/700 con filo 0,3pt claro; o tinta plana + filo. Sin transparencias |
| **Degradado de marca** — navy → azul → azul REVO | Vivo: muta de paleta al hacer scroll | Estático y solo en áreas grandes (portada); si no, plano navy. Probar en imprenta (banding) |
| **Grano** — textura de ruido casi invisible que quita "plástico" al fondo | SVG noise al 5% | El papel ya es la textura: elegir no estucado o soft-touch; no imprimir ruido |
| **Marca de agua** — wordmark gigante al 5–6% | En el pie de página | En contraportada o interior de cubierta |

## Fotografía

- Personas reales en el studio: gesto sereno, sin poses de stock ni sonrisas
  forzadas. Luz fría-neutra con sombras profundas que casan con el azul noche.
- El aparato médico (crioterapia, cámara hiperbárica, WHOOP) se muestra como
  objeto de deseo: primeros planos, reflejos controlados, fondo limpio.
- Sobre las fotos siempre puede caer un velo azul noche (scrim) para que el texto
  blanco respire. En papel: la foto puede ir a sangre con un degradado navy desde
  el borde donde vive el texto.

## Jerarquía tipográfica (el patrón)

1. **Micro-etiqueta** arriba (con o sin punto): sitúa el tema. "DIRECCIÓN MÉDICA"
2. **Titular display** grande, peso 400, tracking negativo, con **una** palabra en
   serif itálica: "El primer *mes.*"
3. **Entradilla** (lede) en peso 400, 1–2 frases.
4. **Cuerpo** en peso 500, columnas de máx. ~66 caracteres.
5. **Datos en serie** con "·" o en chips/píldoras.

Este patrón funciona idéntico en una sección web, la página de un folleto o un
cartel. Lo que cambia es el formato, no la jerarquía.
