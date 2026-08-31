import { clsx } from 'clsx';
import { CheckCircle, AlertTriangle, Search, RefreshCw } from 'lucide-react';
import { useUiStore, useAgentStore } from '@/store';
import type { Verdict } from '@/types/assessment';

const VERDICT_CONFIG = {
  Proceed: {
    icon: CheckCircle,
    label: 'Proceed',
    colorClass: 'border-green-200 bg-green-50 dark:border-green-800/40 dark:bg-green-900/10',
    iconClass: 'text-green-600 dark:text-green-400',
    badgeClass: 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/40 dark:text-green-300',
    gaugeStroke: 'text-green-500',
  },
  Proceed_With_Caution: {
    icon: AlertTriangle,
    label: 'Proceed with Caution',
    colorClass: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800/40 dark:bg-yellow-900/10',
    iconClass: 'text-yellow-600 dark:text-yellow-400',
    badgeClass: 'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300',
    gaugeStroke: 'text-yellow-500',
  },
  Needs_Deeper_Discovery: {
    icon: Search,
    label: 'Needs Deeper Discovery',
    colorClass: 'border-orange-200 bg-orange-50 dark:border-orange-800/40 dark:bg-orange-900/10',
    iconClass: 'text-orange-600 dark:text-orange-400',
    badgeClass: 'bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-900/40 dark:text-orange-300',
    gaugeStroke: 'text-orange-500',
  },
};

interface VerdictCardProps {
  verdict: Verdict;
  orgName: string;
  overallNumeric: number;
  overallTier: string;
  aiNarrative: string;
}

export function VerdictCard({
  verdict,
  orgName,
  overallNumeric,
  overallTier,
  aiNarrative,
}: VerdictCardProps) {
  const cfg = VERDICT_CONFIG[verdict.recommendation];
  const Icon = cfg.icon;
  const { setAgentPanelOpen } = useUiStore();
  const { setPendingInput } = useAgentStore();

  // Re-roll opens the agent panel with a pre-filled question about the verdict.
  const handleReRoll = () => {
    setPendingInput(`The current verdict is "${verdict.recommendation}". Can you explain the reasoning and key risks?`);
    setAgentPanelOpen(true);
  };

  return (
    // group class is required for hover-visible re-roll button per §5.1
    <div className={clsx('card border-2 group', cfg.colorClass)}>
      {/* Verdict badge row */}
      <div className="flex items-start gap-4 mb-4">
        <div className={clsx('mt-0.5 shrink-0', cfg.iconClass)}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span className={clsx('px-2.5 py-0.5 rounded text-sm font-semibold', cfg.badgeClass)}>
              {cfg.label}
            </span>
            <span className="text-sm text-[hsl(var(--muted-foreground))]">{orgName}</span>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {verdict.rationale}
          </p>
        </div>

        {/* Complexity score gauge */}
        <div className="shrink-0 text-center hidden sm:block">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="none" className="stroke-[hsl(var(--border))]" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9155" fill="none"
                className={cfg.gaugeStroke} stroke="currentColor" strokeWidth="3"
                strokeDasharray={`${overallNumeric} ${100 - overallNumeric}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold leading-none">{overallNumeric}</span>
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{overallTier}</p>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--border))]/60 mb-4" />

      {/* AI narrative — §5.1 hero block */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-[hsl(var(--accent))] flex items-center justify-center shrink-0">
            <span className="text-white text-[9px] font-bold">V</span>
          </div>
          <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">Vento Assessment</span>
          
          {/* Re-roll — hover-visible per §5.1. Opens agent panel to re-generate. */}
          <button
            className="ml-auto flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 hover:text-[hsl(var(--accent))] transition-all"
            title="Re-generate narrative via Ask Vento"
            onClick={handleReRoll}
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Re-roll</span>
          </button>
        </div>
        <p className="text-sm leading-relaxed">{aiNarrative}</p>
      </div>
    </div>
  );
}
