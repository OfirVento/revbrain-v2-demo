// Vercel Edge Function — Anthropic API proxy.
// Keeps ANTHROPIC_API_KEY server-side; client never sees it.
// Route: /api/anthropic/v1/messages (matches stream.ts apiRoute).

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // CORS preflight (for local dev cross-origin)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type, anthropic-version, anthropic-beta',
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ type: 'error', error: { message: 'ANTHROPIC_API_KEY not configured on server.' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Read & forward body
  const body = await req.text();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
    'x-api-key': apiKey,
  };
  
  const betaHeader = req.headers.get('anthropic-beta');
  if (betaHeader) {
    headers['anthropic-beta'] = betaHeader;
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers,
    body,
  });

  // Stream the SSE response back to client
  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'content-type': upstream.headers.get('content-type') ?? 'text/event-stream',
      'cache-control': 'no-cache, no-store',
      'x-accel-buffering': 'no',
    },
  });
}

