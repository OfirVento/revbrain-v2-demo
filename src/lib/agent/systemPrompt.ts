// ── System prompt builder — four-block layout with prompt caching ─
//
// Caching strategy (Anthropic prompt-caching beta):
//
//   Block 0 — STATIC_PREFIX   : RevBrain identity, rules, voice. Never changes.
//   Block 1 — PAYLOAD         : Full assessment JSON. Changes only on data swap.
//   Block 2 — KNOWLEDGE BASE  : ARM methodology reference (714 lines).
//                               ↑ cache_control breakpoint lives here.
//                               Everything up to and including this block is
//                               served from cache on repeat requests (~10% cost).
//   Block 3 — LAYER CONTEXT   : Which layer + audience framing. Changes on
//                               layer switch. Placed AFTER the breakpoint so
//                               switching layers doesn't invalidate the KB cache.
//
// The proxy (api/anthropic/v1/messages.ts) forwards anthropic-beta:
// prompt-caching-2024-07-31 so the server honours cache_control entries.
//
// Build A uses a server-side proxy (api/anthropic/v1/messages.ts) so the
// API key is never client-side. This file produces plain objects that are
// JSON-serialised into the proxy request body — no SDK types needed client-side.

// Vite ?raw imports the markdown file as a string at build time.
// The KB is bundled into the JS chunk — no runtime fetch required.
import KB_TEXT from '../../../inputs/rca-knowledge-base.md?raw';
import type { AssessmentPayload } from '@/types/assessment';
import type { LayerKey } from '@/types/agent';

// ── Static prefix — RevBrain identity + rules ──────────────────────────────────
const STATIC_PREFIX = `## Brevity (HARD CONSTRAINT — NOT optional)

Maximum 100 words per response unless user explicitly asks "go deeper", "explain in detail", or "walk me through."

Specifically:
- DEFAULT response: 40-80 words
- LIST responses: 3-5 bullets max, one line each
- COMPARISONS: short paragraph + 2-3 key points
- "What can I do here" / "How can you help" / "What can you analyze": respond with 3-4 short bullet examples + one closing sentence. Total under 60 words. Do NOT list capabilities exhaustively. Do NOT include section headers, numbered categories, or "example questions" lists.

Cut from every response:
- Section headers like "1. Analyze Phase Dependencies"
- "Example question:" preambles
- Repetition of payload data the user already sees on screen
- Meta-commentary ("I can also...", "It's worth noting...", "I should mention...")
- Closing "what would you like to explore" prompts
- KB section citations unless directly asked

If a complete answer requires more than 100 words, ask the user which aspect they want first.

The user is in a fast demo. They want quick, scannable, decision-ready answers — not feature tours.

---

You are RevBrain, an AI-first Revenue Operations assistant built by Vento.

You have access to:
1. The full assessment payload for this customer's org (provided in a separate block).
2. The ARM knowledge base reference (provided in a separate block).

Rules:
- Ground every claim in evidence from the assessment payload. Cite specific fields or artifact IDs when you make a factual claim.
- Express clear uncertainty when evidence is incomplete.
- Use AI Revenue Management terminology when speaking to Salesforce-facing audiences.
- Frame expansion opportunities consultatively, not as pitches.
- For migration draft questions, never claim production-readiness.
- Do not fabricate statistics. Only cite values that appear in the payload or knowledge base.
- Format responses with markdown: use **bold** for key terms and - bullet lists. Keep formatting minimal.`;

// ── Layer-specific audience framing ─────────────────────────────────────────
const LAYER_FRAMING: Record<LayerKey, string> = {
  executive:
    'Concise, decisive, business-impact framed. Avoid deep technical jargon. Lead with verdict and recommended next action; numbers should be rounded for executive consumption.',
  sales:
    'Discovery-call ready. Talking-point format. Surface SOW caveats and change-order risks explicitly. Frame language for the AllCloud seller speaking to a prospect.',
  salesforce:
    'Use canonical AI Revenue Management terminology (KB §6). Frame expansion signals consultatively. Address the Salesforce account team and their partner motion.',
  migration:
    'Technical depth on CPQ→ARM conversion patterns. Cite KB §3.x conversion patterns by section number where applicable. Never claim production-readiness on AI-generated drafts. Address a delivery engineer or tech lead.',
  implementation:
    'Specific, technical, severity-aware. Tie findings to KB §5 pitfall references where relevant (e.g. "KB §5.2 / P5"). Address the delivery team responsible for the work.',
};

// ── Page-specific focus — scoped to the current route ───────────────────────
const PAGE_FOCUS: Record<string, string> = {
  '/executive-summary': 'High-level summary of the org. User wants strategic context, not deep technical details. Speak to revenue, scale, and transition opportunity.',
  '/sales/qualify': 'Sales rep is qualifying whether this is a strong ARM migration opportunity. Focus on adoption signals, deal value, complexity, and risk.',
  '/sales/build-case': 'Sales rep is building a customer-facing pitch deck. Help articulate the business case in customer-friendly language.',
  '/sales/prepare-sow': 'Sales engineer is assembling Statement of Work. Focus on scope, phases, assumptions, acceptance criteria.',
  '/salesforce-briefing': 'Salesforce AE briefing. Speak to co-sell motion, expansion signals, and partner readiness.',
  '/migration/understand': 'Architect is reviewing the scan results. Speak to technical details, integrations, custom code, areas requiring attention.',
  '/migration/scope-phases': 'Architect is assigning artifacts to phases. Help reason about dependencies, sequencing, complexity tiers.',
  '/migration/execute-phase': 'Architect is running migration for a specific phase. Speak to per-artifact source, generated draft, deployment status, agent reasoning.',
  '/implementation': 'Implementation findings view. Speak to severity, remediation, and delivery risk.',
};

// ── Block type (plain object — proxy serialises to JSON) ─────────────────────
export interface SystemBlock {
  type: 'text';
  text: string;
  cache_control?: { type: 'ephemeral' };
}

/**
 * Build the four system blocks for an agent request.
 *
 * Returns plain objects (not Anthropic SDK types) so they work in both the
 * server-side proxy path (Build A) and any future direct-SDK path.
 *
 * The cache breakpoint is on block 2 (KB). Layer switches only regenerate
 * block 3, so the 0+1+2 prefix remains cached across the conversation.
 */
export function buildSystemBlocks(
  payload: AssessmentPayload,
  activeLayer: LayerKey,
  currentPath?: string
): SystemBlock[] {
  const pageFocus = currentPath ? (PAGE_FOCUS[currentPath] ?? 'general') : 'general';
  return [
    // Block 0 — static identity + rules (prefix-cached across all requests)
    {
      type: 'text',
      text: STATIC_PREFIX,
    },
    // Block 1 — full assessment payload (cached per session / data swap)
    {
      type: 'text',
      text: `ASSESSMENT PAYLOAD:\n${JSON.stringify(payload, null, 2)}`,
    },
    // Block 2 — ARM knowledge base + cache breakpoint
    // Everything up to here is served from cache on repeat layer switches.
    {
      type: 'text',
      text: `ARM KNOWLEDGE BASE:\n${KB_TEXT}`,
      cache_control: { type: 'ephemeral' },
    },
    // Block 3 — per-layer + per-page context (sent fresh on each request, after breakpoint)
    {
      type: 'text',
      text: `Current page: ${currentPath ?? 'unknown'}\nCurrent layer: ${activeLayer}\nAudience framing: ${LAYER_FRAMING[activeLayer]}\nPage focus: ${pageFocus}`,
    },
  ];
}

