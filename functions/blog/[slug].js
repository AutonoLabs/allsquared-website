export async function onRequestGet({ params, env, request }) {
  const host = request.headers.get('host') || '';
  const isBold = host.includes('.uk');

  const post = await env.DB.prepare(
    'SELECT * FROM posts WHERE slug = ? AND published = 1'
  ).bind(params.slug).first();

  if (!post) {
    return new Response(notFoundPage(isBold), {
      status: 404,
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  }

  return new Response(postPage(post, isBold), {
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

function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function sharedFonts() {
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">`;
}

function navyCSS() {
  return `
:root{
  --bg:#FAFAF7;--bg2:#F2F1EB;--ink:#0B1B33;--ink2:#2D466F;--ink3:#6B7E9E;
  --accent:#1F6B3F;--accent-light:#E5F1EA;
  --border:1px solid #C7D0E0;--border-hi:1px solid #0B1B33;
  --r:10px;
  --heading:'Inter Tight',-apple-system,sans-serif;
  --body:'Inter Tight',-apple-system,sans-serif;
  --serif:'Source Serif 4',Georgia,serif;
  --mono:'JetBrains Mono',ui-monospace,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.wrap{max-width:720px;margin:0 auto;padding:0 40px}
::selection{background:#0B1B33;color:#fff}
a{color:inherit}
nav.top{position:sticky;top:0;z-index:50;background:rgba(250,250,247,.92);backdrop-filter:blur(14px) saturate(160%);border-bottom:var(--border)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 0;gap:24px;max-width:1240px;margin:0 auto;padding-left:40px;padding-right:40px}
.as-mark{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);font-family:var(--serif);font-size:20px;font-weight:400;letter-spacing:-.01em}
.as-mark .glyph{width:34px;height:34px;flex-shrink:0;border:var(--border);border-radius:4px;display:grid;place-items:center;font-family:var(--mono);font-size:11px;font-weight:700;position:relative}
.as-mark .glyph::after{content:'2';position:absolute;top:1px;right:3px;font-family:var(--serif);font-style:italic;font-size:9px;color:var(--accent)}
.nav-back{font-size:13px;font-weight:600;text-decoration:none;color:var(--ink3);display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:var(--border);border-radius:var(--r);background:var(--bg);transition:border-color .15s,color .15s}
.nav-back:hover{border-color:var(--ink);color:var(--ink)}
header{padding:52px 0 36px;border-bottom:var(--border)}
.post-meta{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin-bottom:14px}
h1.post-title{font-family:var(--heading);font-size:clamp(28px,4.5vw,52px);line-height:1.05;letter-spacing:-.025em;font-weight:800;margin-bottom:18px}
.post-excerpt{font-family:var(--serif);font-size:20px;line-height:1.5;color:var(--ink2);font-style:italic}
.post-body{padding:44px 0 80px;font-family:var(--body);font-size:17px;line-height:1.7;color:var(--ink)}
.post-body h2{font-family:var(--heading);font-size:24px;font-weight:700;letter-spacing:-.02em;margin:44px 0 14px;color:var(--ink)}
.post-body h3{font-family:var(--heading);font-size:19px;font-weight:700;margin:32px 0 10px}
.post-body p{margin-bottom:22px;color:var(--ink2)}
.post-body ul,.post-body ol{margin:0 0 22px 22px;color:var(--ink2)}
.post-body li{margin-bottom:8px}
.post-body blockquote{border-left:3px solid var(--accent);padding:12px 20px;background:var(--accent-light);margin:28px 0;border-radius:0 var(--r) var(--r) 0}
.post-body code{font-family:var(--mono);background:var(--bg2);border:var(--border);padding:2px 6px;border-radius:4px;font-size:14px}
.post-body pre{background:var(--ink);color:#C9F546;padding:24px;border-radius:var(--r);overflow-x:auto;margin:24px 0}
.post-body pre code{background:none;border:none;color:inherit;padding:0}
.post-body a{color:var(--accent);text-decoration:underline;text-underline-offset:3px}
.post-body strong{font-weight:700;color:var(--ink)}
.post-body img{max-width:100%;border-radius:var(--r);border:var(--border);margin:8px 0}
.post-body hr{border:none;border-top:var(--border);margin:44px 0}
footer{border-top:var(--border);padding:24px 40px;font-family:var(--mono);font-size:11px;color:var(--ink3);text-align:center}`;
}

function boldCSS() {
  return `
:root{
  --bg:#FFF8EC;--bg2:#FFE9B0;--ink:#000;--ink2:#000;--ink3:rgba(0,0,0,.55);
  --lime:#C9F546;--lime-deep:#A6D72F;
  --border:3px solid #000;--shadow:6px 6px 0 #000;--shadow-sm:4px 4px 0 #000;
  --heading:'Archivo Black',Impact,sans-serif;
  --body:'Space Grotesk',-apple-system,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.6;font-weight:500;-webkit-font-smoothing:antialiased;overflow-x:hidden;background-image:radial-gradient(circle at 1px 1px,rgba(0,0,0,.12) 1px,transparent 0);background-size:24px 24px}
.wrap{max-width:740px;margin:0 auto;padding:0 32px}
::selection{background:var(--lime);color:#000}
a{color:inherit}
nav.top{position:sticky;top:0;z-index:50;background:var(--bg);border-bottom:var(--border)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 0;gap:24px;max-width:1280px;margin:0 auto;padding-left:32px;padding-right:32px}
.as-mark{display:inline-flex;align-items:center;gap:12px;text-decoration:none;color:#000;font-family:var(--heading);font-size:18px;letter-spacing:-.01em;text-transform:uppercase}
.as-mark .glyph{width:40px;height:40px;flex-shrink:0;background:var(--lime);border:var(--border);display:grid;place-items:center;font-family:var(--mono);font-size:13px;font-weight:700}
.nav-back{font-size:13px;font-weight:700;text-decoration:none;border:var(--border);padding:8px 16px;background:#fff;display:inline-flex;align-items:center;gap:6px;transition:box-shadow .15s,transform .15s}
.nav-back:hover{box-shadow:var(--shadow-sm);transform:translate(-2px,-2px)}
header{padding:56px 0 40px;border-bottom:var(--border)}
.post-meta{font-family:var(--mono);font-size:11px;letter-spacing:.05em;text-transform:uppercase;opacity:.55;margin-bottom:14px}
h1.post-title{font-family:var(--heading);font-size:clamp(30px,5vw,52px);line-height:.95;letter-spacing:-.01em;text-transform:uppercase;margin-bottom:18px}
.post-excerpt{font-size:19px;line-height:1.5;font-weight:400;opacity:.7}
.post-body{padding:48px 0 80px}
.post-body h2{font-family:var(--heading);font-size:28px;text-transform:uppercase;line-height:1;margin:40px 0 14px;padding-bottom:8px;border-bottom:var(--border)}
.post-body h3{font-family:var(--heading);font-size:20px;text-transform:uppercase;margin:32px 0 10px}
.post-body p{margin-bottom:20px}
.post-body ul,.post-body ol{margin:0 0 20px 24px}
.post-body li{margin-bottom:6px}
.post-body blockquote{border-left:4px solid var(--lime-deep);padding:12px 20px;background:var(--bg2);margin:24px 0;font-style:italic}
.post-body code{font-family:var(--mono);background:var(--bg2);border:2px solid #000;padding:2px 6px;font-size:14px}
.post-body pre{background:#000;color:var(--lime);padding:24px;border:var(--border);overflow-x:auto;margin:24px 0}
.post-body pre code{background:none;border:none;color:inherit;padding:0}
.post-body a{color:#000;text-decoration:underline;text-decoration-color:var(--lime-deep);text-underline-offset:3px;font-weight:600}
.post-body strong{font-weight:700}
.post-body img{max-width:100%;border:var(--border);box-shadow:var(--shadow)}
.post-body hr{border:none;border-top:var(--border);margin:40px 0}
footer{border-top:var(--border);padding:24px 32px;font-family:var(--mono);font-size:11px;opacity:.5;text-align:center}`;
}

function postPage(post, isBold) {
  const css = isBold ? boldCSS() : navyCSS();
  const domain = isBold ? 'allsquared.uk' : 'allsquared.io';
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(post.title)} — AllSquared</title>
<meta name="description" content="${esc(post.excerpt || '')}"/>
<link rel="canonical" href="https://${domain}/blog/${esc(post.slug)}"/>
${sharedFonts()}
<style>${css}</style>
</head>
<body>
<nav class="top">
  <div class="nav-inner">
    <a class="as-mark" href="/"><div class="glyph">A²</div>${isBold ? 'ALLSQUARED' : '<em>All</em><b>Squared</b>'}</a>
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
<footer>© AllSquared Ltd · <a href="/">${domain}</a></footer>
</body>
</html>`;
}

function notFoundPage(isBold) {
  const css = isBold
    ? `body{background:#FFF8EC;font-family:'Space Grotesk',sans-serif}h1{font-family:'Archivo Black',sans-serif;font-size:64px;text-transform:uppercase;border-bottom:4px solid #000;padding-bottom:12px;margin-bottom:12px}a{background:#C9F546;border:3px solid #000;padding:12px 24px;font-weight:700;display:inline-block;transition:box-shadow .15s,transform .15s}a:hover{box-shadow:4px 4px 0 #000;transform:translate(-2px,-2px)}`
    : `body{background:#FAFAF7;font-family:'Inter Tight',sans-serif;color:#0B1B33}h1{font-size:64px;font-weight:800;letter-spacing:-.03em;margin-bottom:12px}a{background:#1F6B3F;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;display:inline-block}`;
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Post not found — AllSquared</title>
${sharedFonts()}
<style>*{box-sizing:border-box;margin:0;padding:0}body{display:grid;place-items:center;min-height:100vh;text-align:center;padding:32px}${css}p{margin:12px 0 24px;font-size:18px;opacity:.7}</style>
</head>
<body>
<div><h1>404</h1><p>This post doesn't exist.</p><a href="/blog/">← Back to blog</a></div>
</body>
</html>`;
}
