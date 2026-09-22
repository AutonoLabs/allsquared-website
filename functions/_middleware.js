const ADMIN_API_PREFIX = '/api/';

const ALLOWED_ORIGINS = new Set([
  'https://allsquared.io',
  'https://www.allsquared.io',
  'https://allsquared.uk',
  'https://www.allsquared.uk',
  'http://localhost:8788',
  'http://127.0.0.1:8788',
]);

const PUBLIC_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function corsHeadersForRequest(request, pathname) {
  if (!pathname.startsWith(ADMIN_API_PREFIX)) {
    return PUBLIC_CORS_HEADERS;
  }

  const origin = request.headers.get('Origin');
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      Vary: 'Origin',
    };
  }

  return {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function onRequest(context) {
  const { request, next } = context;
  const pathname = new URL(request.url).pathname;
  const corsHeaders = corsHeadersForRequest(request, pathname);

  if (request.method === 'OPTIONS') {
    if (pathname.startsWith(ADMIN_API_PREFIX) && !corsHeaders['Access-Control-Allow-Origin']) {
      return new Response(null, { status: 403 });
    }
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const response = await next();
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders)) newHeaders.set(key, value);
  return new Response(response.body, { status: response.status, headers: newHeaders });
}
