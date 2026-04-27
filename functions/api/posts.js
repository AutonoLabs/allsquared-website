function isAuthed(request, env) {
  const auth = request.headers.get('Authorization') || '';
  return env.ADMIN_PASSWORD && auth === `Bearer ${env.ADMIN_PASSWORD}`;
}

function json(data, status = 200) {
  return Response.json(data, { status });
}

function slugify(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function onRequestGet({ request, env }) {
  const authed = isAuthed(request, env);
  const query = authed
    ? 'SELECT id, title, slug, excerpt, published, published_at, created_at, updated_at FROM posts ORDER BY created_at DESC'
    : 'SELECT id, title, slug, excerpt, published_at, created_at FROM posts WHERE published = 1 ORDER BY published_at DESC';
  const { results } = await env.DB.prepare(query).all();
  return json(results);
}

export async function onRequestPost({ request, env }) {
  if (!isAuthed(request, env)) return json({ error: 'Unauthorized' }, 401);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { title, content, excerpt = '', published = false } = body;
  if (!title?.trim() || !content?.trim()) return json({ error: 'title and content are required' }, 400);

  const slug = body.slug?.trim() || slugify(title);
  const now = new Date().toISOString();
  const published_at = published ? now : null;

  try {
    const result = await env.DB.prepare(
      'INSERT INTO posts (title, slug, content, excerpt, published, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(title.trim(), slug, content.trim(), excerpt.trim(), published ? 1 : 0, published_at, now, now).run();
    return json({ id: result.meta.last_row_id, slug }, 201);
  } catch (e) {
    if (e.message?.includes('UNIQUE')) return json({ error: 'Slug already exists' }, 409);
    throw e;
  }
}
