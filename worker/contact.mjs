const projects = new Set([
  'heavydesk',
  'planificacion-de-suministros',
  'flexit',
  'seguimiento-de-aeronaves',
  'del-chat-al-pedido',
  'evaluacion-de-riesgo-y-complejidad',
  'seguimiento-de-hitos',
  'desarrollo-software-la-linea',
  'desarrollador-palantir-foundry',
]);
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export async function handleContact(request, env, send = fetch) {
  const origin = request.headers.get('Origin');
  const headers = new Headers({ 'Cache-Control': 'no-store', Vary: 'Origin' });
  if (origin && origin === env.CONTACT_ORIGIN) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }
  const result = (status) => Response.json({ ok: status === 200 }, { headers, status });
  if (!headers.has('Access-Control-Allow-Origin')) return result(403);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (request.method !== 'POST') return result(405);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return result(415);

  let body;
  try {
    const reader = request.body.getReader();
    const decoder = new TextDecoder();
    let size = 0;
    let json = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return result(413);
      }
      json += decoder.decode(value, { stream: true });
    }
    body = JSON.parse(json + decoder.decode());
    if (!body || typeof body !== 'object' || Array.isArray(body)) return result(400);
  } catch {
    return result(400);
  }

  const { email, name, message, website, project, lang } = body;
  if (website || typeof email !== 'string' || typeof message !== 'string' ||
      typeof name !== 'string' || typeof project !== 'string' ||
      email.length > 254 || !emailPattern.test(email) || name.length > 120 ||
      !message.trim() || message.length > 5000 || (project && !projects.has(project)) ||
      !['es', 'en'].includes(lang)) return result(400);

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_TO) return result(503);
  try {
    if (env.CONTACT_LIMITER) {
      const key = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!(await env.CONTACT_LIMITER.limit({ key })).success) return result(429);
    }
    const mail = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        reply_to: email,
        subject: project ? `Portfolio Mateo — ${project}` : 'Portfolio Mateo',
        text: [name.trim(), email, `Idioma: ${lang}`, project, '', message.trim()].join('\n'),
      }),
      signal: AbortSignal.timeout(8000),
    });
    return result(mail.ok ? 200 : 502);
  } catch {
    return result(502);
  }
}

export default {
  fetch(request, env) {
    if (new URL(request.url).pathname !== '/contact') return new Response(null, { status: 404 });
    return handleContact(request, env);
  },
};
