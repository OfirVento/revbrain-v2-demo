// Agent configuration
// The model ID is not sensitive — it's just a model name.
// The API key lives server-side in the Vercel Edge Function at api/anthropic/v1/messages.ts.
// VITE_AGENT_MODEL can override the default at Vite build time, but is not required.

export const AGENT_CONFIG = {
  // Model ID — can be overridden by VITE_AGENT_MODEL at build time.
  // Default: claude-sonnet-4-5 (current production model as of May 2026).
  modelId: import.meta.env.VITE_AGENT_MODEL || 'claude-sonnet-4-5',

  // Proxy route — Vercel Edge Function reads ANTHROPIC_API_KEY server-side.
  // The client never sees the API key.
  apiRoute: '/api/anthropic/v1/messages',

  // Limits
  maxTokens: 1024,
  temperature: 0.3,

  // Stream timeout (ms)
  streamTimeout: 30_000,
} as const;

// Always configured — model ID has a hardcoded default, key is server-side.
// The panel is always active; errors from the proxy surface as ErrorBubbles.
export const isModelConfigured = () => true;
