export async function onRequestGet({ params, env }) {
  const post = await env.DB.prepare(
    'SELECT * FROM posts WHERE slug = ? AND published = 1'
  ).bind(params.slug).first();

  if (!post) {
    return new Response(notFoundPage(), {
      status: 404,
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  }

  return new Response(postPage(post), {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  });
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function postPage(post) {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(post.title)} — AllSquared</title>
<meta name="description" content="${esc(post.excerpt || '')}"/>
<link rel="canonical" href="https://allsquared.io/blog/${esc(post.slug)}"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root{
  --ink:#000000;--paper:#FFF8EC;--paper-2:#FFE9B0;--white:#FFFFFF;
  --lime:#C9F546;--lime-deep:#A6D72F;--tomato:#FF5B2E;
  --shadow:6px 6px 0 var(--ink);--shadow-sm:4px 4px 0 var(--ink);
  --border:3px solid var(--ink);--border-thick:4px solid var(--ink);
  --display:'Archivo Black',Impact,sans-serif;
  --sans:'Space Grotesk',-apple-system,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:17px;line-height:1.6;font-weight:500;-webkit-font-smoothing:antialiased;overflow-x:hidden;background-image:radial-gradient(circle at 1px 1px,rgba(0,0,0,.12) 1px,transparent 0);background-size:24px 24px}
.wrap{max-width:740px;margin:0 auto;padding:0 32px}
::selection{background:var(--lime);color:var(--ink)}
a{color:inherit}
nav.top{position:sticky;top:0;z-index:50;background:var(--paper);border-bottom:var(--border-thick)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 0;gap:24px;max-width:1280px;margin:0 auto;padding-left:32px;padding-right:32px}
.as-mark{display:inline-flex;align-items:center;gap:12px;text-decoration:none;color:var(--ink);font-family:var(--display);font-size:18px;letter-spacing:-0.01em}
.as-mark .glyph{width:40px;height:40px;flex-shrink:0;background:var(--lime);border:3px solid var(--ink);display:grid;place-items:center;font-family:var(--mono);font-size:13px;font-weight:700}
.nav-back{font-size:14px;font-weight:600;text-decoration:none;border:var(--border);padding:8px 16px;display:inline-flex;align-items:center;gap:6px;background:var(--white);transition:box-shadow .15s,transform .15s}
.nav-back:hover{box-shadow:var(--shadow-sm);transform:translate(-2px,-2px)}
header{padding:56px 0 40px;border-bottom:var(--border-thick)}
.post-meta{font-family:var(--mono);font-size:12px;letter-spacing:.05em;text-transform:uppercase;opacity:.6;margin-bottom:16px}
h1.post-title{font-family:var(--display);font-size:clamp(32px,5vw,52px);line-height:.95;letter-spacing:-.01em;text-transform:uppercase;margin-bottom:20px}
.post-excerpt{font-size:19px;line-height:1.5;font-weight:400;opacity:.75}
.post-body{padding:48px 0 80px}
.post-body h2{font-family:var(--display);font-size:28px;text-transform:uppercase;line-height:1;margin:40px 0 16px;padding-bottom:8px;border-bottom:var(--border)}
.post-body h3{font-family:var(--display);font-size:20px;text-transform:uppercase;margin:32px 0 12px}
.post-body p{margin-bottom:20px}
.post-body ul,.post-body ol{margin:0 0 20px 24px}
.post-body li{margin-bottom:6px}
.post-body blockquote{border-left:4px solid var(--lime-deep);padding:12px 20px;background:var(--paper-2);margin:24px 0;font-style:italic}
.post-body code{font-family:var(--mono);background:var(--paper-2);border:2px solid var(--ink);padding:2px 6px;font-size:14px}
.post-body pre{background:var(--ink);color:var(--lime);padding:24px;border:var(--border);overflow-x:auto;margin:24px 0}
.post-body pre code{background:none;border:none;color:inherit;padding:0}
.post-body a{color:var(--ink);text-decoration:underline;text-decoration-color:var(--lime-deep);text-underline-offset:3px;font-weight:600}
.post-body strong{font-weight:700}
.post-body img{max-width:100%;border:var(--border);box-shadow:var(--shadow)}
.post-body hr{border:none;border-top:var(--border-thick);margin:40px 0}
footer{border-top:var(--border-thick);padding:24px 0;font-family:var(--mono);font-size:11px;opacity:.5;text-align:center}
</style>
</head>
<body>
<nav class="top">
  <div class="nav-inner">
    <a class="as-mark" href="/">
      <div class="glyph">A²</div>
      ALLSQUARED
    </a>
    <a class="nav-back" href="/blog/">← All posts</a>
  </div>
</nav>
<div class="wrap">
  <header>
    <p class="post-meta">${esc(formatDate(post.published_at))}</p>
    <h1 class="post-title">${esc(post.title)}</h1>
    ${post.excerpt ? `<p class="post-excerpt">${esc(post.excerpt)}</p>` : ''}
  </header>
  <div class="post-body">${post.content}</div>
</div>
<footer><div class="wrap">© AllSquared Ltd · <a href="/">allsquared.io</a></div></footer>
</body>
</html>`;
}

function notFoundPage() {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Post not found — AllSquared</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#FFF8EC;color:#000;font-family:'Space Grotesk',sans-serif;display:grid;place-items:center;min-height:100vh;text-align:center;padding:32px}
h1{font-family:'Archivo Black',sans-serif;font-size:64px;text-transform:uppercase;line-height:1;border-bottom:4px solid #000;padding-bottom:16px;margin-bottom:16px}
p{font-size:18px;margin-bottom:24px}
a{display:inline-block;padding:12px 24px;border:3px solid #000;text-decoration:none;font-weight:700;background:#C9F546;transition:box-shadow .15s,transform .15s}
a:hover{box-shadow:4px 4px 0 #000;transform:translate(-2px,-2px)}
</style>
</head>
<body>
<div>
  <h1>404</h1>
  <p>This post doesn't exist.</p>
  <a href="/blog/">← Back to blog</a>
</div>
</body>
</html>`;
}

function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
