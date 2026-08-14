# REVO · Guía de imprenta

Cómo llevar el sistema a folletos, carteles, tarjetas y packaging sin perder la
marca. Regla general: **la marca vive en el color, la tipografía, los gestos y el
aire — no en los efectos de pantalla.**

## Color

Equivalencias orientativas (ver `tokens/tokens.json` para la tabla completa).
**Siempre pedir prueba de color a la imprenta antes de la tirada.**

| Uso | Pantalla | Pantone | CMYK |
|---|---|---|---|
| Acento (azul REVO) | `#6881FC` | 2718 C | 65 · 48 · 0 · 0 |
| Fondo de marca (azul noche) | `#0A0D1E` | Black 6 C | 85 · 75 · 45 · 75 |
| Marino pleno | `#16245F` | 281 C | 100 · 85 · 20 · 30 |
| Detalle luminoso | `#9FB0FF` | 2716 C | 40 · 28 · 0 · 0 |
| Tinta (texto sobre claro) | `#14161C` | — | 60 · 50 · 40 · 90 (áreas) / 100K (texto pequeño) |

Notas:
- El azul REVO `#6881FC` es muy luminoso; en CMYK pierde algo de brillo. En piezas
  clave (tarjetas, cubierta de folleto) vale la pena **tinta directa Pantone 2718 C**.
- Los fondos azul noche son masas grandes de tinta: en papel no estucado se comen
  el detalle. Preferir **estucado mate o soft-touch** para piezas oscuras.
- Texto blanco pequeño sobre fondo oscuro: mínimo 7pt y trazo no ultrafino, o se
  rellena de tinta (el filete se "cierra").
- **Dos plantillas de pieza**: oscura (fondo navy, texto blanco — premium, para
  cubiertas y carteles) y clara ("momento claro": papel blanco, tinta, acentos
  azul REVO — para interiores densos y piezas económicas). Ambas son marca.

## Tipografía en papel

| Rol | Fuente | Cuerpo | Notas |
|---|---|---|---|
| Titular portada | NHaas Display 400 | 60–90pt | Interlínea 0,96 · tracking -20 |
| Titular sección/página | NHaas Display 400 | 30–44pt | Una palabra en Noto Serif itálica |
| Titular de bloque | NHaas Display 500 | 16–24pt | |
| Entradilla | Neue Haas 400 | 11–12,5pt | Interlínea 1,5 |
| Cuerpo | Neue Haas 500 | 9–9,5pt | Interlínea 1,6 · columna máx. 66 caracteres |
| Notas / legal | Neue Haas 500 | 8–8,5pt | |
| Micro-etiqueta | Neue Haas 600 | 6,5–7,5pt | MAYÚSCULAS · tracking +180 |

Mínimos absolutos: 6,5pt en positivo, 7pt en negativo (blanco sobre azul).

## Formatos y márgenes

| Pieza | Formato sugerido | Márgenes | Sangre |
|---|---|---|---|
| Folleto / dossier | A4 o A5 vertical | ≥14mm (A4) · ≥11mm (A5) | 3mm |
| Tríptico | A4 → tres cuerpos | ≥10mm por panel | 3mm |
| Cartel | A3 / 50×70 | ≥18mm | 5mm |
| Tarjeta | 85×55mm | ≥5mm | 3mm |

- Los **filos de 1px** de pantalla son **0,3pt** en papel (0,5pt en cartelería).
- Las **marcas de visor**: escuadras de 3–4mm en las esquinas del área viva —
  funcionan muy bien como recurso de retícula en portadas y fichas técnicas.
- El **aire es innegociable**: si el contenido no cabe, se quita contenido o se
  añade página; no se comprime el espaciado.

## Papel y acabados (sugerencia)

- Piezas premium (dossier Peak, tarjetas): estucado mate 300–350g o cartulina
  soft-touch; opcional **stamping o tinta directa** en el azul REVO para el punto
  y el wordmark.
- Piezas de volumen (flyers informativos): plantilla clara sobre estucado 150g —
  más barata y sigue siendo marca.

## Traducciones obligatorias pantalla → papel

- Glow / halo luminoso → color pleno, sin halo.
- Cristal translúcido (blur) → panel de color plano con filo de 0,3pt.
- Degradado vivo → degradado estático solo en áreas grandes, o color plano.
- Grano de ruido → lo pone el papel (no estucado / soft-touch), no la tinta.
- Animaciones / hover → no existen: la jerarquía tipográfica hace el trabajo.
- Vídeo de fondo → fotografía con velo azul noche.
