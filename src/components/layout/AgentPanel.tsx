import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Square, RotateCcw } from 'lucide-react';
import { useAssessmentStore, useAgentStore } from '@/store';
import { buildSystemBlocks, streamAgentResponse } from '@/lib/agent/stream';
import { DEMO_SCRIPTS } from '@/data/agent-scripts';
import { clsx } from 'clsx';
import type { LayerKey } from '@/types/agent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ── Script matcher ──────────────────────────────────────────────
function matchScript(userInput: string): string | null {
  for (const script of DEMO_SCRIPTS) {
    const re = script.trigger instanceof RegExp
      ? script.trigger
      : new RegExp(script.trigger, 'i');
    if (re.test(userInput)) return script.response;
  }
  return null;
}



// ── Friendly labels for the context display ─────────────────────
const PAGE_LABELS: Record<string, string> = {
  '/scan': 'Scan',
  '/scan/running': 'Scanning',
  '/executive-summary': 'Executive Summary',
  '/sales/qualify': 'Sales · Qualify',
  '/sales/build-case': 'Sales · Build Case',
  '/sales/prepare-sow': 'Sales · Prepare SOW',
  '/salesforce-briefing': 'Salesforce Briefing',
  '/migration/understand': 'Migration · Understand',
  '/migration/scope-phases': 'Migration · Scope Phases',
  '/migration/execute-phase': 'Migration · Execute Phase',
  '/implementation': 'Implementation',
};

// ── Suggested prompts — scoped per layer ─────────────────────────
const SUGGESTED_PROMPTS: Record<LayerKey, string[]> = {
  executive: [
    'What is the top risk for this migration?',
    'Summarise the verdict in two sentences.',
    'Which ARM capabilities give the most immediate uplift?',
  ],
  sales: [
    'What is the business case for migrating?',
    'How long will the migration take?',
    'What are the key change order risks?',
  ],
  salesforce: [
    'Which CPQ artifacts need manual design?',
    'What Apex code survives migration?',
    'Summarise the LOE and phase plan.',
  ],
  migration: [
    'Which QCP scripts are highest risk?',
    'List the artifacts with Manual_Review_Required.',
    'What integration unknowns need resolving first?',
  ],
  implementation: [
    'List the High severity findings.',
    'What should be in Phase 1?',
    'Which findings are change order risks?',
  ],
};

// ── Message bubble ───────────────────────────────────────────────
function MessageBubble({
  role,
  content,
  streaming,
  onReroll,
}: {
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
  onReroll?: () => void;
}) {
  const isUser = role === 'user';
  return (
    <div className={clsx('flex gap-2 group/msg', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-white text-[9px] font-bold">Q</span>
        </div>
      )}
      <div className="flex flex-col gap-1 max-w-[85%]">
        <div
          className={clsx(
            'rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'bg-[hsl(var(--accent))] text-white rounded-tr-sm'
              : 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] rounded-tl-sm'
          )}
        >
          {isUser ? (
            // User messages: plain text
            <>{content}{streaming && <span className="inline-block w-1.5 h-3.5 bg-current opacity-70 ml-0.5 animate-pulse rounded-sm" />}</>
          ) : (
            // Assistant messages: styled markdown
            <div className="prose-agent">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-base font-bold mt-3 mb-1 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-sm font-bold mt-3 mb-1 first:mt-0">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-0.5 first:mt-0">{children}</h3>,
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children }) => <code className="text-xs bg-black/10 dark:bg-white/10 rounded px-1 py-0.5 font-mono">{children}</code>,
                  hr: () => <hr className="my-2 border-[hsl(var(--border))]" />,
                  blockquote: ({ children }) => <blockquote className="border-l-2 border-[hsl(var(--accent))]/40 pl-3 italic my-2">{children}</blockquote>,
                  table: ({ children }) => <table className="text-xs w-full border-collapse my-2">{children}</table>,
                  th: ({ children }) => <th className="text-left border-b border-[hsl(var(--border))] pb-1 pr-3 font-semibold">{children}</th>,
                  td: ({ children }) => <td className="border-b border-[hsl(var(--border))]/40 py-1 pr-3">{children}</td>,
                }}
              >
                {content}
              </ReactMarkdown>
              {streaming && <span className="inline-block w-1.5 h-3.5 bg-current opacity-70 ml-0.5 animate-pulse rounded-sm" />}
            </div>
          )}
        </div>
        {/* Footer: re-roll */}
        {!isUser && !streaming && onReroll && (
          <button
            onClick={onReroll}
            className="self-start opacity-0 group-hover/msg:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] px-1.5 py-0.5 rounded hover:bg-[hsl(var(--muted))]"
            title="Re-roll this response"
          >
            <RotateCcw className="w-3 h-3" /> Re-roll
          </button>
        )}
      </div>
    </div>
  );
}


// ── Error bubble ─────────────────────────────────────────────────
function ErrorBubble({ message }: { message: string }) {
  return (
    <div className="mx-2 px-3 py-2 bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800/40 rounded-lg text-xs text-red-700 dark:text-red-300">
      {message}
    </div>
  );
}

// ── Main panel ───────────────────────────────────────────────────
export function AgentPanel() {
  const { payload } = useAssessmentStore();
  const location = useLocation();
  const {
    messages,
    addMessage,
    updateLastAssistant,
    truncateMessages,
    clearMessages,
    dropTrailingEmptyAssistant,
    isStreaming,
    setStreaming,
    pendingInput,
    setPendingInput,
  } = useAgentStore();

  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Pre-fill input from store (triggered by "Ask agent" buttons)
  useEffect(() => {
    if (pendingInput) {
      setInput(pendingInput);
      setPendingInput(null);
      setTimeout(() => {
        inputRef.current?.focus();
        const len = inputRef.current?.value.length ?? 0;
        inputRef.current?.setSelectionRange(len, len);
      }, 0);
    }
  }, [pendingInput, setPendingInput]);

  // Clear conversation on route change — each page starts fresh
  useEffect(() => {
    if (isStreaming) {
      abortRef.current?.abort();
      setStreaming(false);
      dropTrailingEmptyAssistant();
    }
    clearMessages();
    setInput('');
    setError(null);
    setPendingInput(null);
    // intentionally not adding isStreaming/dropTrailingEmptyAssistant to deps
    // — this effect must only fire on route change, not on every streaming tick
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleStop = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
    dropTrailingEmptyAssistant();
  }, [setStreaming, dropTrailingEmptyAssistant]);

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isStreaming || !payload) return;

    setError(null);
    addMessage({ id: crypto.randomUUID(), role: 'user', content: userText, timestamp: Date.now() });

    // ── Scripted demo intercept ──────────────────────────────────
    const scripted = matchScript(userText);
    if (scripted) {
      const assistantId = crypto.randomUUID();
      addMessage({ id: assistantId, role: 'assistant', content: '', timestamp: Date.now() });
      // Brief delay so it doesn't feel instant
      await new Promise(r => setTimeout(r, 600));
      updateLastAssistant(scripted);
      return;
    }

    // ── Live API path ────────────────────────────────────────────
    addMessage({ id: crypto.randomUUID(), role: 'assistant', content: '', timestamp: Date.now() });

    // Build 4-block system prompt with KB + cache_control + page context
    const currentLayer: LayerKey = location.pathname.startsWith('/sales') ? 'sales' : location.pathname.startsWith('/migration') ? 'migration' : 'executive';
    const systemBlocks = buildSystemBlocks(payload, currentLayer, location.pathname);

    // Build history for the API: filter out any empty assistant messages (from stopped streams)
    // to avoid Anthropic rejecting turns with empty content strings.
    const validHistory = messages.filter((m, i, arr) => {
      if (m.role === 'assistant' && !m.content.trim()) return false;
      // Also drop the user message that immediately preceded an empty assistant turn
      if (m.role === 'user' && arr[i + 1]?.role === 'assistant' && !arr[i + 1].content.trim()) return false;
      return true;
    });
    const apiMessages = [
      ...validHistory.map(m => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: userText },
    ];

    const abort = new AbortController();
    abortRef.current = abort;
    setStreaming(true);

    // Stream timeout — abort if no chunk arrives within the window.
    // Resets on every received chunk so only truly hung connections trigger it.
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!abort.signal.aborted) {
          abort.abort();
          setError('Response timed out. Please try again.');
        }
      }, 90_000);
    };
    resetTimeout();

    let accumulated = '';
    try {
      for await (const chunk of streamAgentResponse(apiMessages, systemBlocks, abort.signal)) {
        resetTimeout();
        if (chunk.type === 'text') {
          accumulated += chunk.text;
          updateLastAssistant(accumulated);
        } else if (chunk.type === 'error') {
          setError(chunk.message);
          break;
        } else if (chunk.type === 'done') {
          break;
        }
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        setError(String(e));
      }
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setStreaming(false);
      abortRef.current = null;
    }
  }, [isStreaming, payload, location.pathname, messages, addMessage, updateLastAssistant, setStreaming]);


  const handleSubmit = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendMessage(text);
  }, [input, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Per-message re-roll: re-send the user message that preceded this assistant message
  const handleReroll = useCallback((assistantIndex: number) => {
    if (isStreaming) return;
    const userMsg = messages[assistantIndex - 1];
    if (!userMsg || userMsg.role !== 'user') return;
    // Truncate from the user message index (removes user + assistant pair)
    truncateMessages(assistantIndex - 1);
    sendMessage(userMsg.content);
  }, [isStreaming, messages, truncateMessages, sendMessage]);

  const suggestions = SUGGESTED_PROMPTS[(location.pathname.startsWith('/sales') ? 'sales' : location.pathname.startsWith('/migration') ? 'migration' : 'executive') as LayerKey] ?? SUGGESTED_PROMPTS.executive;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[hsl(var(--border))] shrink-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">RevBrain Agent</p>
            
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => { clearMessages(); setError(null); }}
              className="p-1 rounded hover:bg-[hsl(var(--muted))] transition-colors"
              title="Clear conversation"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
            </button>
          )}
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Context: {PAGE_LABELS[location.pathname] ?? 'General'}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-xs text-[hsl(var(--muted-foreground))] px-1 mb-3">
                  Suggested questions for this layer:
                </p>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); inputRef.current?.focus(); }}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--muted))]/50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              const isStreaming_ = isLast && msg.role === 'assistant' && isStreaming;
              return (
                <MessageBubble
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  streaming={isStreaming_}
                  onReroll={msg.role === 'assistant' ? () => handleReroll(i) : undefined}
                />
              );
            })}

            {error && <ErrorBubble message={error} />}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="px-3 py-3 border-t border-[hsl(var(--border))] shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about this assessment…"
                rows={1}
                className={clsx(
                  'flex-1 resize-none rounded-lg px-3 py-2 text-sm',
                  'bg-[hsl(var(--muted))]/60 border border-[hsl(var(--border))]',
                  'focus:outline-none focus:border-[hsl(var(--accent))]/50',
                  'placeholder:text-[hsl(var(--muted-foreground))] leading-relaxed',
                  'max-h-[200px] overflow-y-auto'
                )}
                style={{ minHeight: '76px' }}
              />
              {isStreaming ? (
                <button
                  onClick={handleStop}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors shrink-0"
                  title="Stop"
                >
                  <Square className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  className={clsx(
                    'p-2 rounded-lg transition-colors shrink-0',
                    input.trim()
                      ? 'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent))]/90'
                      : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] cursor-not-allowed'
                  )}
                  title="Send (Enter)"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
