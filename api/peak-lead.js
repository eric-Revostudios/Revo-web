// Aviso inmediato cuando entra una solicitud en un formulario de Tally.
//
// Flujo: Tally (webhook) -> esta función -> notificación push (ntfy, gratis) y/o SMS (Twilio, opcional).
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   TALLY_SIGNING_SECRET  Secreto de firma del webhook de Tally (para rechazar peticiones ajenas). Obligatorio.
//
//   Canal push (gratis, recomendado) — app "ntfy" en el móvil suscrita al mismo tema:
//   NTFY_TOPIC            Nombre del tema, largo y difícil de adivinar (p. ej. revo-peak-k7x2m9qp4z). Obligatorio para push.
//   NTFY_SERVER           Servidor ntfy. Opcional, por defecto https://ntfy.sh
//   NTFY_TOKEN            Token de acceso si el tema está protegido. Opcional.
//
//   Canal SMS (Twilio, de pago) — opcional, solo si se rellenan las cuatro:
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM (número +1... o Messaging Service MG...), SMS_TO (números separados por comas).
//
// Hace falta al menos un canal configurado.

export const config = { runtime: 'edge' };

const MAX_SMS_LEN = 300;

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  if (!process.env.TALLY_SIGNING_SECRET) {
    return json({ error: 'Missing configuration', missing: ['TALLY_SIGNING_SECRET'] }, 500);
  }
  const channels = enabledChannels();
  if (!channels.length) {
    return json({ error: 'No notification channel configured', hint: 'Set NTFY_TOPIC or the four TWILIO_*/SMS_TO variables' }, 500);
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

  const lead = extractLead(payload.data || {});

  const jobs = [];
  if (channels.includes('ntfy')) jobs.push(sendNtfy(lead));
  if (channels.includes('sms')) {
    const body = buildSms(lead);
    const to = process.env.SMS_TO.split(',').map((s) => s.trim()).filter(Boolean);
    jobs.push(...to.map((number) => sendSms(number, body)));
  }

  const results = await Promise.all(jobs);
  const failed = results.filter((r) => !r.ok);

  if (failed.length === results.length) {
    return json({ error: 'Notification delivery failed', results }, 502);
  }
  return json({ ok: true, sent: results.length - failed.length, failed: failed.length, results });
}

// ---------- helpers ----------

function enabledChannels() {
  const out = [];
  if (process.env.NTFY_TOPIC) out.push('ntfy');
  if (['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_FROM', 'SMS_TO'].every((k) => process.env[k])) out.push('sms');
  return out;
}

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

// Saca nombre, teléfono y email del envío de Tally. Vale para cualquier formulario
// con campos Nombre / Apellidos / Email / Teléfono.
export function extractLead(data) {
  const fields = Array.isArray(data.fields) ? data.fields : [];
  const byLabel = (re) => (f) => re.test(String(f.label || ''));

  const nombre = fieldValue(fields, byLabel(/^nombre/i));
  const apellidos = fieldValue(fields, byLabel(/^apellidos?/i));
  const telefono = fieldValue(fields, (f) => f.type === 'INPUT_PHONE_NUMBER') || fieldValue(fields, byLabel(/tel/i));
  const email = fieldValue(fields, (f) => f.type === 'INPUT_EMAIL') || fieldValue(fields, byLabel(/mail/i));

  return {
    formName: data.formName ? String(data.formName) : 'Web',
    persona: [nombre, apellidos].filter(Boolean).join(' ') || 'Sin nombre',
    telefono,
    email,
  };
}

export function buildSms(lead) {
  const lines = [
    `${lead.formName}: nueva solicitud`,
    lead.persona,
    lead.telefono ? `Tel: ${lead.telefono}` : null,
    lead.email ? `Email: ${lead.email}` : null,
  ].filter(Boolean);

  const text = lines.join('\n');
  return text.length > MAX_SMS_LEN ? text.slice(0, MAX_SMS_LEN - 1) + '…' : text;
}

// Notificación push vía ntfy. Se publica en JSON para que título y botones admitan acentos.
export function buildNtfyMessage(lead, topic) {
  const digits = lead.telefono.replace(/[^\d]/g, '');
  const actions = [];
  if (lead.telefono) {
    actions.push({ action: 'view', label: 'Llamar', url: `tel:${lead.telefono.replace(/\s+/g, '')}` });
    actions.push({ action: 'view', label: 'WhatsApp', url: `https://wa.me/${digits}` });
  }
  if (lead.email) {
    actions.push({ action: 'view', label: 'Email', url: `mailto:${lead.email}` });
  }

  const lines = [lead.persona, lead.telefono ? `Tel: ${lead.telefono}` : null, lead.email ? `Email: ${lead.email}` : null].filter(Boolean);

  return {
    topic,
    title: `${lead.formName}: nueva solicitud`,
    message: lines.join('\n'),
    priority: 4,
    tags: ['telephone'],
    click: lead.telefono ? `tel:${lead.telefono.replace(/\s+/g, '')}` : undefined,
    actions: actions.slice(0, 3),
  };
}

async function sendNtfy(lead) {
  const server = (process.env.NTFY_SERVER || 'https://ntfy.sh').replace(/\/+$/, '');
  const topic = process.env.NTFY_TOPIC;
  const headers = { 'content-type': 'application/json' };
  if (process.env.NTFY_TOKEN) headers.authorization = `Bearer ${process.env.NTFY_TOKEN}`;

  try {
    const res = await fetch(server, {
      method: 'POST',
      headers,
      body: JSON.stringify(buildNtfyMessage(lead, topic)),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { channel: 'ntfy', ok: false, status: res.status, error: out.error || 'ntfy error' };
    }
    return { channel: 'ntfy', ok: true, id: out.id };
  } catch (err) {
    return { channel: 'ntfy', ok: false, error: String(err && err.message || err) };
  }
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
      return { channel: 'sms', to, ok: false, status: res.status, error: out.message || out.error || 'Twilio error' };
    }
    return { channel: 'sms', to, ok: true, sid: out.sid };
  } catch (err) {
    return { channel: 'sms', to, ok: false, error: String(err && err.message || err) };
  }
}
