export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  if (!env.ADMIN_PASSWORD || body.password !== env.ADMIN_PASSWORD) {
    return json({ error: 'Invalid password' }, 401);
  }
  return json({ token: env.ADMIN_PASSWORD });
}

function json(data, status = 200) {
  return Response.json(data, { status });
}
