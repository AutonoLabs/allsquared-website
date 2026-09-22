import { createSessionToken } from '../lib/session.js';

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  if (!env.ADMIN_PASSWORD || body.password !== env.ADMIN_PASSWORD) {
    return json({ error: 'Invalid password' }, 401);
  }

  if (!env.SESSION_SECRET) {
    return json({ error: 'Server misconfigured' }, 500);
  }

  try {
    const token = await createSessionToken(env);
    return json({ token });
  } catch {
    return json({ error: 'Server misconfigured' }, 500);
  }
}

function json(data, status = 200) {
  return Response.json(data, { status });
}
