// Eventos de la landing «Tu caso» (/tu-caso): la página manda un evento por paso y esta función
// lo reenvía a la Platform (revo-clinical), que los guarda. Función Edge de Vercel, sin dependencias.
//
// Contrato (no cambiarlo: la Platform lo construye igual):
//   - Solo POST con Content-Type: application/json; cuerpo de 2 KB como mucho. Si no, 204 igualmente.
//   - `evento` tiene que estar en la lista y `sesion` ser 8-64 caracteres [a-z0-9]; el resto se descarta en silencio.
//   - Se reenvía el cuerpo tal cual a LANDING_EVENTOS_URL con la cabecera x-landing-secret: LANDING_EVENTOS_SECRET.
//   - Siempre 204 y rápido: el reenvío no bloquea ni falla hacia el navegador. Sin las dos variables, 204 y nada más.
//   - No viaja ni la IP ni el user-agent: solo el JSON que manda la página (sin datos personales).
//
// Variables de entorno (Vercel → proyecto de la web → Settings → Environment Variables), las pone Eric:
//   LANDING_EVENTOS_URL     Puerta de la Platform que recibe los eventos.
//   LANDING_EVENTOS_SECRET  Secreto compartido con la Platform.

export const config = { runtime: 'edge' };

const MAX_BYTES = 2048;
const EVENTOS = new Set([
  'abrio',
  'eligio_tema',
  'eligio_rama',
  'vio_resultado',
  'vio_dudas',
  'tiempo',
  'llego_propuesta',
  'abrio_duda',
  'pulso_reservar',
  'pulso_whatsapp',
  'cambio_tema',
]);

export default async function handler(request, context) {
  const vacio = new Response(null, { status: 204 });

  try {
    if (request.method !== 'POST') return vacio;
    if (!/^application\/json\b/i.test(request.headers.get('content-type') || '')) return vacio;

    const url = process.env.LANDING_EVENTOS_URL;
    const secret = process.env.LANDING_EVENTOS_SECRET;
    if (!url || !secret) return vacio;

    const raw = await request.text();
    if (!raw || new TextEncoder().encode(raw).length > MAX_BYTES) return vacio;

    let body;
    try { body = JSON.parse(raw); } catch { return vacio; }
    if (!body || typeof body !== 'object') return vacio;
    if (!EVENTOS.has(body.evento)) return vacio;
    if (typeof body.sesion !== 'string' || !/^[a-z0-9]{8,64}$/.test(body.sesion)) return vacio;

    const reenvio = fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-landing-secret': secret },
      body: raw,
    }).then(() => {}, () => {});

    if (context && typeof context.waitUntil === 'function') context.waitUntil(reenvio);
  } catch {
    // Nunca se le enseña un error a la persona.
  }

  return vacio;
}
