interface Env {
  Agnes_api_key?: string;
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

const jsonResponse = (error: string, status: number) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const handleChat = async (request: Request, env: Env) => {
  if (request.method !== 'POST') {
    return jsonResponse('Method not allowed', 405);
  }

  if (!env.Agnes_api_key) {
    return jsonResponse('API key not configured', 500);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse('Invalid JSON body', 400);
  }

  try {
    const upstream = await fetch('https://apihub.agnes-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.Agnes_api_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...(body as object), stream: true }),
    });

    if (!upstream.ok) {
      return jsonResponse(await upstream.text(), upstream.status);
    }

    if (!upstream.body) {
      return jsonResponse('Empty upstream response', 502);
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return jsonResponse('Unable to reach Agnes API', 502);
  }
};

export default {
  fetch(request: Request, env: Env) {
    if (new URL(request.url).pathname === '/api/chat') {
      return handleChat(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
