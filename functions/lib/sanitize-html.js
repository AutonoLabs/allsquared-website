const ALLOWED_TAGS = new Set([
  'p', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote',
  'strong', 'b', 'em', 'i', 'code', 'pre', 'a', 'img', 'hr', 'br',
]);

const ALLOWED_ATTRS = {
  a: new Set(['href', 'title']),
  img: new Set(['src', 'alt']),
  code: new Set(['class']),
};

const BLOCKED_RE = /<(script|style|iframe|object|embed|form|input|textarea|select|button|meta|link|base)\b[^>]*>[\s\S]*?<\/\1>/gi;
const TAG_RE = /<\/?([a-zA-Z][\w:-]*)\b([^>]*)>/g;
const ATTR_RE = /([a-zA-Z_:][\w:.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function isSafeUrl(value, attr) {
  if (!value) return attr !== 'href' && attr !== 'src';
  const trimmed = value.trim();
  if (attr === 'href' && trimmed.startsWith('/')) return !trimmed.startsWith('//');
  try {
    const url = new URL(trimmed, 'https://allsquared.io');
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function sanitizeAttributes(tag, rawAttrs) {
  const allowed = ALLOWED_ATTRS[tag];
  if (!allowed) return '';

  const attrs = [];
  let match;
  ATTR_RE.lastIndex = 0;
  while ((match = ATTR_RE.exec(rawAttrs)) !== null) {
    const name = match[1].toLowerCase();
    if (!allowed.has(name) || name.startsWith('on')) continue;

    const value = match[2] ?? match[3] ?? match[4] ?? '';
    if ((name === 'href' || name === 'src') && !isSafeUrl(value, name)) continue;

    attrs.push(`${name}="${String(value).replace(/"/g, '&quot;')}"`);
  }

  return attrs.length ? ` ${attrs.join(' ')}` : '';
}

export function sanitizePostHtml(html) {
  if (!html) return '';

  let cleaned = String(html).replace(BLOCKED_RE, '');
  cleaned = cleaned.replace(TAG_RE, (full, tagName, rawAttrs = '') => {
    const tag = tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return '';

    const closing = full.startsWith('</');
    if (closing) return `</${tag}>`;
    if (tag === 'br' || tag === 'hr') return `<${tag}>`;

    return `<${tag}${sanitizeAttributes(tag, rawAttrs)}>`;
  });

  return cleaned
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '');
}
