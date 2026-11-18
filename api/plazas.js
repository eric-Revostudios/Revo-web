// Plazas de la invitación «Tu punto de partida» (/tu-punto y /punto-de-partida).
// La página pregunta aquí cuántas plazas quedan y esta función lo calcula con las reservas DE VERDAD que le
// cuenta la Platform (revo-clinical). Función Edge de Vercel, sin dependencias.
//
// La regla (Eric, 18-nov-2026): cada mes se abren 20 plazas. Cuando se reservan las 20, se abren las 20 del mes
// siguiente. Al cambiar de mes, se empieza con las 20 de ese mes.
//
// Qué NO hace: inventarse el número. Si la Platform no contesta (o su puerta todavía no existe), responde
// `quedan: null` y la página enseña solo «20 plazas en noviembre», sin decir cuántas quedan.
//
// Contrato con la Platform (no cambiarlo sin tocar los dos lados):
//   GET {LANDING_EVENTOS_URL con «/evento» cambiado por «/plazas»}   cabecera x-landing-secret: LANDING_EVENTOS_SECRET
//   → 200 { "meses": { "2026-11": 7, "2026-12": 0 } }
//   Cada número son las reservas de la cita «Tu punto de partida» de Momence (servicio 404780) hechas en ese mes
//   (por fecha en que se hizo la reserva, hora de Madrid), sin contar las canceladas.
// No hacen falta variables nuevas en Vercel: usa las dos de api/landing-evento.js. Si algún día la puerta
// vive en otra dirección, se puede poner entera en LANDING_PLAZAS_URL.
//
// Respuesta a la página: 200 { "mes": "2026-11", "quedan": 13, "de": 20 }   (quedan: null si no se sabe)

export const config = { runtime: 'edge' };

const CUPO = 20;            // plazas por mes
const INICIO = '2026-11';   // primer mes con plazas
const ESPERA_MS = 2500;

function mesDeMadrid(fecha) {
  // «2026-11»
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit' }).formatToParts(fecha);
  const v = (t) => (p.find((x) => x.type === t) || {}).value;
  return v('year') + '-' + v('month');
}
function siguiente(mes) {
  let [a, m] = mes.split('-').map(Number);
  m += 1; if (m > 12) { m = 1; a += 1; }
  return a + '-' + String(m).padStart(2, '0');
}

// Recorre los meses desde el primero: cada mes empieza con sus 20 (si las del mes anterior no se llenaron, se
// pierden) y, cada vez que se llenan 20, se pasa a las del mes siguiente.
function calcula(meses, hoy) {
  let tanda = INICIO, usadas = 0;
  for (let m = INICIO, i = 0; m <= hoy && i < 240; m = siguiente(m), i++) {
    if (tanda < m) { tanda = m; usadas = 0; }
    const n = Number(meses[m]);
    usadas += Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
    while (usadas >= CUPO) { usadas -= CUPO; tanda = siguiente(tanda); }
  }
  return { mes: tanda, quedan: CUPO - usadas, de: CUPO };
}

export default async function handler() {
  const hoy = mesDeMadrid(new Date());
  let cuerpo = { mes: hoy < INICIO ? INICIO : hoy, quedan: null, de: CUPO };
  let sabido = false;

  try {
    const secret = process.env.LANDING_EVENTOS_SECRET;
    const url = process.env.LANDING_PLAZAS_URL || (process.env.LANDING_EVENTOS_URL || '').replace(/\/evento\/?$/, '/plazas');
    if (secret && /^https:\/\/.+\/plazas$/.test(url)) {
      const corte = new AbortController();
      const reloj = setTimeout(() => corte.abort(), ESPERA_MS);
      const r = await fetch(url, { headers: { 'x-landing-secret': secret }, signal: corte.signal });
      clearTimeout(reloj);
      if (r.ok) {
        const datos = await r.json();
        if (datos && datos.meses && typeof datos.meses === 'object') { cuerpo = calcula(datos.meses, hoy); sabido = true; }
      }
    }
  } catch {
    // Sin dato no se enseña número: nunca se inventa.
  }

  return new Response(JSON.stringify(cuerpo), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // El dato real se guarda cinco minutos en la red de Vercel; el «no se sabe», solo uno, para reintentar pronto.
      'cache-control': sabido ? 'public, max-age=0, s-maxage=300, stale-while-revalidate=600' : 'public, max-age=0, s-maxage=60',
    },
  });
}
