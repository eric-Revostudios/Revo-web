# REVO · Centros asociados — landing independiente

Landing privada para miembros. No está enlazada desde revostudios.eu y no se
indexa. Se entra escribiendo una palabra, que se recuerda 90 días.

**Palabra de acceso actual: `member`**

---

## 1 · Publicarlo (una sola vez)

**GitHub Desktop**
1. `File → New repository…`
   - Name: `revo-partners`
   - Local path: donde quieras
   - Marca **Private**
2. Abre la carpeta del repositorio (`Repository → Show in Finder / Explorer`).
3. Copia **todo el contenido de esta carpeta** dentro (index.html, en/, fonts/,
   assets/, los .js, los .css, robots.txt, vercel.json).
4. Vuelve a GitHub Desktop → escribe un mensaje (`primera versión`) →
   **Commit to main** → **Publish repository** (deja marcado *Keep this code private*).

**Vercel**
1. vercel.com → `Add New… → Project → Import` el repo `revo-partners`.
2. Framework Preset: **Other**. No toques nada más. **Deploy**.
3. Te da una URL tipo `revo-partners.vercel.app`. En
   `Settings → Domains` añade el dominio definitivo, p. ej.
   `partners.revostudios.eu` (Vercel te dice el registro DNS que hay que crear).

### ¿Y si prefiero arrastrar la carpeta `partners` entera, sin abrirla?

También vale. En Vercel, al importar el repo (o después, en
`Settings → Build and Deployment`), pon:

```
Root Directory:  partners
```

Vercel trata esa carpeta como si fuera la raíz: la URL queda limpia
(`partners.revostudios.eu/#barrys`) y el `vercel.json` y el `robots.txt` de
dentro se leen igual.

Si no quieres tocar ajustes, mueve solo `vercel.json` y `robots.txt` a la raíz
del repositorio (Vercel únicamente los lee ahí). En ese caso la URL será
`partners.revostudios.eu/partners/#barrys`.

Esa es la URL que va en los QR de la revista. Un QR por centro, apuntando a su ancla:

```
https://partners.revostudios.eu/#barrys
https://partners.revostudios.eu/#corehaus
https://partners.revostudios.eu/#casabarre
https://partners.revostudios.eu/#yogaone
```

Las anclas no se tocan nunca: los QR impresos siguen existiendo durante meses.

> **Alternativa** si prefieres `revostudios.eu/partners`: copia esta carpeta
> entera dentro del repo de la web, con el nombre `partners`. Funciona igual y
> sigue sin estar enlazada.

---

## 2 · El mantenimiento mensual (día 1)

Solo se toca **`partners.config.js`**. Nada más.

Desde el navegador, sin instalar nada:
1. Abre el repo en github.com → clic en `partners.config.js`.
2. Botón del **lápiz** (Edit this file).
3. Cambia los códigos: son las líneas marcadas con `← CÓDIGO`.
4. **Commit changes**. Vercel publica solo en ~1 minuto.

O desde GitHub Desktop: edita el archivo, Commit, **Push origin**.

Dentro del archivo está explicado también cómo:
- cambiar la palabra de acceso,
- pausar un centro por vacaciones (sigue visible, sin botón de reserva),
- añadir un quinto centro.

Reglas para no romper nada: cambia solo lo que hay entre `"comillas"`, y no
borres comas, llaves `{ }` ni corchetes `[ ]`. Si un código se queda vacío
(`""`), la página no se rompe: avisa al miembro de que lo pida en recepción.

---

## 3 · Qué hay en cada archivo

| Archivo | Para qué |
| --- | --- |
| `partners.config.js` | **El único que se edita.** Códigos, enlaces, pasos, estados, palabra de acceso. |
| `index.html` | La página en castellano. |
| `en/index.html` | La misma en inglés. Se muestra sola si el móvil está en inglés. |
| `revo-partners.css` | Estilo. Compartido por las dos, para que no puedan divergir. |
| `revo-partners.js` | Puerta, montaje de los bloques y medición. |
| `revo-analytics.js` | Google Analytics 4 (solo carga si el visitante acepta). |
| `revo-cookies.js` | Aviso de cookies. |
| `fonts/`, `assets/` | Las dos tipografías Neue Haas y el logotipo. |
| `robots.txt`, `vercel.json` | Bloqueo de indexación (`noindex` + `Disallow: /`). |

---

## 4 · Lo que se mide

En GA4, eventos propios (agregados, sin perfilar):

- `partners_llegada` → con qué ancla entra la gente (qué QR de la revista tira más)
- `partners_copiar_codigo` → la señal más limpia de intención real
- `partners_abrir_plataforma` → clics al botón de cada centro
- `partners_bloque_visto` → cuántos de los que llegan por un ancla ven los otros tres
- `partners_puerta_fallo` → palabras fallidas, y si era una ya retirada

---

## 5 · Pendiente

- Código de **Corehaus**: no lo tenemos. Ahora está pausado, así que no se ve.
  Al reactivarlo hay que rellenarlo.
- **WhatsApp de YogaOne**: la fase 2 es solo texto. Con el número se convierte en botón.
