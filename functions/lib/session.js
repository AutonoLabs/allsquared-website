const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function toBase64Url(bytes) {
  const bin = bytes instanceof ArrayBuffer
    ? String.fromCharCode(...new Uint8Array(bytes))
    : bytes;
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  return atob(padded + pad);
}

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export async function createSessionToken(env) {
  if (!env.SESSION_SECRET) throw new Error('SESSION_SECRET is not configured');

  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS, v: 1 });
  const payloadPart = toBase64Url(payload);
  const key = await importHmacKey(env.SESSION_SECRET);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadPart));
  return `${payloadPart}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token, env) {
  if (!token || !env.SESSION_SECRET) return false;

  const dot = token.lastIndexOf('.');
  if (dot <= 0) return false;

  const payloadPart = token.slice(0, dot);
  const signaturePart = token.slice(dot + 1);

  let payloadBytes;
  try {
    payloadBytes = fromBase64Url(payloadPart);
  } catch {
    return false;
  }

  let signatureBytes;
  try {
    signatureBytes = Uint8Array.from(fromBase64Url(signaturePart), (c) => c.charCodeAt(0));
  } catch {
    return false;
  }

  const key = await importHmacKey(env.SESSION_SECRET);
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    new TextEncoder().encode(payloadPart),
  );
  if (!valid) return false;

  let payload;
  try {
    payload = JSON.parse(payloadBytes);
  } catch {
    return false;
  }

  return typeof payload.exp === 'number' && payload.exp > Date.now();
}
