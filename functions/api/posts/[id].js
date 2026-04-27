function isAuthed(request, env) {
  const auth = request.headers.get('Authorization') || '';
  return env.ADMIN_PASSWORD && auth === `Bearer ${env.ADMIN_PASSWORD}`;
}

function json(data, status = 200) {
  return Response.json(data, { status });
}

export async function onRequestGet({ params, env, request }) {
  const authed = isAuthed(request, env);
  const post = await env.DB.prepare('SELECT * FROM posts WHERE id = ?').bind(params.id).first();
  if (!post) return json({ error: 'Not found' }, 404);
  if (!post.published && !authed) return json({ error: 'Not found' }, 404);
  return json(post);
}

export async function onRequestPut({ params, request, env }) {
  if (!isAuthed(request, env)) return json({ error: 'Unauthorized' }, 401);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const existing = await env.DB.prepare('SELECT * FROM posts WHERE id = ?').bind(params.id).first();
  if (!existing) return json({ error: 'Not found' }, 404);

  const title = body.title?.trim() ?? existing.title;
  const slug = body.slug?.trim() ?? existing.slug;
  const content = body.content?.trim() ?? existing.content;
  const excerpt = body.excerpt?.trim() ?? existing.excerpt;
  const published = body.published !== undefined ? (body.published ? 1 : 0) : existing.published;
  const now = new Date().toISOString();
  const published_at = published && !existing.published_at ? now : (published ? existing.published_at : null);

  try {
    await env.DB.prepare(
      'UPDATE posts SET title=?, slug=?, content=?, excerpt=?, published=?, published_at=?, updated_at=? WHERE id=?'
    ).bind(title, slug, content, excerpt, published, published_at, now, params.id).run();
    return json({ id: parseInt(params.id), slug });
  } catch (e) {
    if (e.message?.includes('UNIQUE')) return json({ error: 'Slug already exists' }, 409);
    throw e;
  }
}

export async function onRequestDelete({ params, request, env }) {
  if (!isAuthed(request, env)) return json({ error: 'Unauthorized' }, 401);
  const result = await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(params.id).run();
  if (!result.meta.changes) return json({ error: 'Not found' }, 404);
  return json({ deleted: true });
}
