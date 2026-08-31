import { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronRight } from 'lucide-react';

import type { Concern } from '@/types/assessment';

// Risks styled as conversation prompts for the AE — not technical findings,
// but question framings that open the scoping dialogue.

const SEVERITY_ACCENT: Record<string, string> = {
  High: 'border-l-orange-400 bg-orange-50 dark:bg-orange-900/10',
  Medium: 'border-l-yellow-400 bg-yellow-50 dark:bg-yellow-900/10',
  Low: 'border-l-blue-400 bg-blue-50 dark:bg-blue-900/10',
  Critical: 'border-l-red-500 bg-red-50 dark:bg-red-900/10',
  Info: 'border-l-gray-300',
};

interface RiskPromptCardProps {
  concern: Concern;
  index: number;
}

function RiskPromptCard({ concern, index }: RiskPromptCardProps) {
  const [open, setOpen] = useState(false);
  const salesFraming = concern.audienceFraming.sales;

  return (
    <div className={`border-l-4 rounded-lg ${SEVERITY_ACCENT[concern.severity] ?? 'border-l-gray-300'} p-4`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-5 h-5 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-bold text-[hsl(var(--muted-foreground))]">{index + 1}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
                {concern.severity} priority
              </span>
            </div>
            {/* Sales headline = the conversation opener */}
            <p className="text-sm font-semibold leading-snug">
              {salesFraming?.headline ?? concern.title}
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="p-1 rounded hover:bg-[hsl(var(--muted))] transition-colors shrink-0"
        >
          {open
            ? <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            : <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          }
        </button>
      </div>

      {open && (
        <div className="mt-3 ml-8 space-y-3">
          {/* Context for the AE */}
          <div>
            <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1">
              Why it matters
            </p>
            <p className="text-sm leading-relaxed">
              {salesFraming?.sowCaveat ?? concern.audienceFraming.executive.impact}
            </p>
          </div>

          {/* The prompt itself */}
          <div className="flex items-start gap-2 px-3 py-2.5 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
            <MessageCircle className="w-3.5 h-3.5 text-[hsl(var(--accent))] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[hsl(var(--accent))] mb-0.5">Ask the prospect</p>
              <p className="text-sm leading-relaxed italic">
                "{salesFraming?.talkingPoint ?? concern.audienceFraming.executive.nextAction}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface RiskPromptsProps {
  concerns: Concern[];
}

export function RiskPrompts({ concerns }: RiskPromptsProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="section-header">Risks as Conversation Prompts</h2>
        

      </div>
      <p className="muted-text mb-5">
        Each risk card includes a suggested question to open the scoping dialogue with the prospect.
      </p>
      <div className="space-y-3">
        {concerns.map((concern, i) => (
          <RiskPromptCard key={concern.id} concern={concern} index={i} />
        ))}
      </div>
    </div>
  );
}
