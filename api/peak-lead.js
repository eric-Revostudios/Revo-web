// Aviso por SMS cuando entra una solicitud en un formulario de Tally.
//
// Flujo: Tally (webhook) -> esta función -> Twilio -> SMS a los números de SMS_TO.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   TALLY_SIGNING_SECRET  Secreto de firma del webhook de Tally (para rechazar peticiones ajenas).
//   TWILIO_ACCOUNT_SID    Cuenta de Twilio.
//   TWILIO_AUTH_TOKEN     Token de Twilio.
//   TWILIO_FROM           Remitente: número de Twilio (+1...) o Messaging Service SID (MG...).
//   SMS_TO                Destinatarios separados por comas, en formato internacional (+34..., +39...).

export const config = { runtime: 'edge' };

const MAX_SMS_LEN = 300;

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const missing = ['TALLY_SIGNING_SECRET', 'TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_FROM', 'SMS_TO']
    .filter((k) => !process.env[k]);
  if (missing.length) {
    return json({ error: 'Missing configuration', missing }, 500);
  }

  const raw = await request.text();

  const signature = request.headers.get('tally-signature') || '';
  if (!(await verifyTallySignature(raw, signature, process.env.TALLY_SIGNING_SECRET))) {
    return json({ error: 'Invalid signature' }, 401);
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  if (payload.eventType && payload.eventType !== 'FORM_RESPONSE') {
    return json({ ok: true, ignored: payload.eventType });
  }

  const body = buildSms(payload.data || {});
  const to = process.env.SMS_TO.split(',').map((s) => s.trim()).filter(Boolean);

  const results = await Promise.all(to.map((number) => sendSms(number, body)));
  const failed = results.filter((r) => !r.ok);

  if (failed.length === results.length) {
    return json({ error: 'SMS delivery failed', results }, 502);
  }
  return json({ ok: true, sent: results.length - failed.length, failed: failed.length, results });
}

// ---------- helpers ----------

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

async function verifyTallySignature(raw, signature, secret) {
  if (!signature) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(raw));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));
  return timingSafeEqual(expected, signature);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function fieldValue(fields, matcher) {
  const f = fields.find(matcher);
  if (!f || f.value == null) return '';
  return String(f.value).trim();
}

export function buildSms(data) {
  const fields = Array.isArray(data.fields) ? data.fields : [];
  const byLabel = (re) => (f) => re.test(String(f.label || ''));

  const nombre = fieldValue(fields, byLabel(/^nombre/i));
  const apellidos = fieldValue(fields, byLabel(/^apellidos?/i));
  const telefono = fieldValue(fields, (f) => f.type === 'INPUT_PHONE_NUMBER') || fieldValue(fields, byLabel(/tel/i));
  const email = fieldValue(fields, (f) => f.type === 'INPUT_EMAIL') || fieldValue(fields, byLabel(/mail/i));

  const formName = data.formName ? String(data.formName) : 'Web';
  const persona = [nombre, apellidos].filter(Boolean).join(' ') || 'Sin nombre';

  const lines = [
    `${formName}: nueva solicitud`,
    persona,
    telefono ? `Tel: ${telefono}` : null,
    email ? `Email: ${email}` : null,
  ].filter(Boolean);

  const text = lines.join('\n');
  return text.length > MAX_SMS_LEN ? text.slice(0, MAX_SMS_LEN - 1) + '…' : text;
}

async function sendSms(to, body) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;

  const params = new URLSearchParams({ To: to, Body: body });
  if (/^MG[0-9a-f]{32}$/i.test(from)) params.set('MessagingServiceSid', from);
  else params.set('From', from);

  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        authorization: 'Basic ' + btoa(`${sid}:${token}`),
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { to, ok: false, status: res.status, error: out.message || out.error || 'Twilio error' };
    }
    return { to, ok: true, sid: out.sid };
  } catch (err) {
    return { to, ok: false, error: String(err && err.message || err) };
  }
}
