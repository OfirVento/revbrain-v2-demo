import { AGENT_CONFIG } from '@/config/agent';
import { buildSystemBlocks, type SystemBlock } from './systemPrompt';
import type { AssessmentPayload } from '@/types/assessment';
import type { LayerKey } from '@/types/agent';

// Re-export buildSystemBlocks so AgentPanel can call it directly
export { buildSystemBlocks };
// Legacy export alias for any callers using the old name
export { buildSystemBlocks as buildSystemPrompt };

// ── Streaming call ───────────────────────────────────────────────
// Calls the Vercel Edge Function proxy → Anthropic. API key is never
// client-side. Accepts a system block array (with cache_control) so
// the proxy can forward prompt-caching headers to Anthropic.
export type StreamChunk =
  | { type: 'text'; text: string }
  | { type: 'done' }
  | { type: 'error'; message: string };

export async function* streamAgentResponse(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemBlocks: SystemBlock[] | string,
  abortSignal?: AbortSignal,
  payload?: AssessmentPayload,
  layer?: LayerKey
): AsyncGenerator<StreamChunk> {
  // If caller passes legacy string (old code path), use it as-is.
  // If caller passes payload + layer, build blocks here.
  // If caller already built blocks, use them directly.
  let system: SystemBlock[] | string = systemBlocks;
  if (payload && layer && typeof systemBlocks === 'string') {
    system = buildSystemBlocks(payload, layer);
  }

  let response: Response;
  try {
    response = await fetch(AGENT_CONFIG.apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        // Enable prompt caching — proxy forwards this to Anthropic
        'anthropic-beta': 'prompt-caching-2024-07-31',
      },
      body: JSON.stringify({
        model: AGENT_CONFIG.modelId,
        max_tokens: 4096,
        stream: true,
        system,
        messages,
      }),
      signal: abortSignal,
    });
  } catch (err) {
    // Don't surface abort as an error — the caller handles AbortError silently
    if ((err as Error).name === 'AbortError' || abortSignal?.aborted) return;
    yield { type: 'error', message: `Network error: ${String(err)}` };
    return;
  }

  if (!response.ok) {
    const body = await response.text();
    yield {
      type: 'error',
      message: `API error ${response.status}: ${body.slice(0, 200)}`,
    };
    return;
  }

  // Parse SSE stream from Anthropic
  const reader = response.body?.getReader();
  if (!reader) {
    yield { type: 'error', message: 'No response body from API.' };
    return;
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') {
          yield { type: 'done' };
          return;
        }
        try {
          const parsed = JSON.parse(data);
          if (
            parsed.type === 'content_block_delta' &&
            parsed.delta?.type === 'text_delta'
          ) {
            yield { type: 'text', text: parsed.delta.text };
          }
          if (parsed.type === 'message_stop') {
            yield { type: 'done' };
            return;
          }
        } catch {
          // skip malformed SSE lines
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (!abortSignal?.aborted) {
    yield { type: 'done' };
  }
}

