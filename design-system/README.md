# REVO · Design System

Sistema de diseño de **REVO Studios** — club de longevidad y terapias avanzadas en
Barcelona (Turó Park). Destilado de la dirección de arte del programa **REVO Peak**,
la expresión más alta de la marca.

**Este sistema sirve para web Y para piezas físicas** (folletos, carteles, tarjetas,
packaging, señalética). Cada decisión está documentada en las dos escalas: píxeles
para pantalla y puntos/milímetros para imprenta.

---

## La marca en una frase

Medicina de precisión con estética de lujo sereno: fondo azul noche, tipografía
grotesca ligera en cuerpos grandes, una sola palabra en serif itálica como gesto
humano, y detalles técnicos finos (puntos luminosos, marcas de visor, filos de 1px)
que evocan instrumental médico y medición.

## Estructura del paquete

| Carpeta | Qué contiene |
|---|---|
| `tokens/` | Colores, tipografía, espaciado y forma — en JSON (con equivalencias de imprenta) y CSS |
| `src/components/` | Componentes React: el vocabulario visual reutilizable |
| `docs/marca.md` | Voz y tono, logo, fotografía y los gestos de firma con su traducción a papel |
| `docs/impresion.md` | Guía de imprenta: CMYK/Pantone, cuerpos mínimos, márgenes, papel |
| `assets/` | Logotipo e icono |
| `fonts/` | Las tres fuentes de la marca |

## Los invariantes (esto sí es ley)

1. **Paleta**: azul noche como suelo (`#0A0D1E`), azul REVO `#6881FC` como único
   acento, blancos perlados (`#9FB0FF → #DFE5FF`) para detalles luminosos.
   La marca es *dark-first*, pero existe el "momento claro": superficies blancas
   con tinta `#14161C` para contenido denso o piezas económicas de imprimir.
2. **Tipografía**: Neue Haas Grotesk Display en peso ligero/normal para titulares
   grandes con tracking negativo; Neue Haas para cuerpo; **una** palabra del titular
   en Noto Serif itálica. Micro-etiquetas en mayúsculas con tracking muy abierto.
3. **Los gestos de firma** (ver `docs/marca.md`): el punto luminoso, las marcas de
   visor en las esquinas, los filos de 1px, los separadores "·", la numeración
   editorial (01, 02…), la marca de agua del logo.
4. **La voz**: frases cortas, segunda persona, sobriedad médica. Sin exclamaciones,
   sin superlativos vacíos. Español primero; existe versión inglesa.

## Libertad deliberada (esto NO es ley)

Para que el sistema no encorsete, estas cosas se dejan **abiertas a cada pieza**:

- **La composición y el orden de las secciones.** La landing de Peak es *una*
  expresión del sistema, no la plantilla. Un folleto, un cartel o una página nueva
  deben componerse según su formato y su mensaje, no calcar la landing.
- **La fotografía concreta.** Hay una dirección (ver `docs/marca.md`), no un banco
  cerrado de imágenes.
- **Los efectos de pantalla** (degradado vivo que muta al hacer scroll, cristal
  líquido con desenfoque, brillos, animaciones de aparición) son *traducciones
  digitales* de los gestos, no el gesto en sí. En papel se sustituyen por sus
  equivalentes impresos (ver la tabla de `docs/marca.md`). Nunca intentes imitar
  un desenfoque o un glow en imprenta.
- **La densidad.** Peak es aire y lujo; una pieza informativa (tarifas, protocolo
  de terapia) puede ser más densa manteniendo paleta, tipografía y gestos.

## Qué se ha dejado fuera, y por qué

- **Navegación web, banner de cookies, motor de reservas**: implementación de la
  web pública, no lenguaje de marca.
- **El copy de Peak** (precios, plazas, fechas): contenido de una campaña, no del
  sistema. Aparece solo como ejemplo de voz.
- **Animaciones y scroll**: comportamiento de un soporte concreto. Se documenta el
  resultado visual, no el mecanismo.
