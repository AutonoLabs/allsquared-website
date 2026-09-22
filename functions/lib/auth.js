import { verifySessionToken } from './session.js';

function extractBearerToken(request) {
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Bearer ')) return '';
  return auth.slice(7).trim();
}

export async function isAuthed(request, env) {
  const token = extractBearerToken(request);
  return verifySessionToken(token, env);
}
