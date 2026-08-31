import { clsx } from 'clsx';
import type { Verdict, ComplexityScores } from '@/types/assessment';

// Derives readiness badge from the assessment verdict.
// Ready / Needs Preparation / Not Ready — Salesforce framing.
export type ReadinessBadge = 'Ready' | 'Needs Preparation' | 'Not Ready';

const BADGE_CONFIG: Record<ReadinessBadge, { color: string; bg: string; border: string }> = {
  'Ready': {
    color: 'text-green-800 dark:text-green-300',
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-300 dark:border-green-700/50',
  },
  'Needs Preparation': {
    color: 'text-yellow-800 dark:text-yellow-300',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-yellow-300 dark:border-yellow-700/50',
  },
  'Not Ready': {
    color: 'text-red-800 dark:text-red-300',
    bg: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-300 dark:border-red-700/50',
  },
};

export function verdictToReadiness(recommendation: Verdict['recommendation']): ReadinessBadge {
  switch (recommendation) {
    case 'Proceed': return 'Ready';
    case 'Proceed_With_Caution': return 'Needs Preparation';
    case 'Needs_Deeper_Discovery': return 'Not Ready';
  }
}

function derivePipelineFraming(
  badge: ReadinessBadge,
  orgName: string,
  complexityScores: ComplexityScores
): string {
  const tier = complexityScores.overall;
  switch (badge) {
    case 'Ready':
      return `${orgName} is positioned for a Revenue Cloud deal — ${tier} complexity with a clear migration path.`;
    case 'Needs Preparation':
      return `${orgName} requires scoping validation before Revenue Cloud commitment — ${tier} complexity with pricing logic risks to resolve.`;
    case 'Not Ready':
      return `${orgName} needs deeper discovery before Revenue Cloud positioning — ${tier} complexity with unresolved integration unknowns.`;
  }
}

interface ReadinessHeaderProps {
  verdict: Verdict;
  orgName: string;
  complexityScores: ComplexityScores;
}

export function ReadinessHeader({ verdict, orgName, complexityScores }: ReadinessHeaderProps) {
  const badge = verdictToReadiness(verdict.recommendation);
  const cfg = BADGE_CONFIG[badge];
  const framing = derivePipelineFraming(badge, orgName, complexityScores);

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1">
            Revenue Cloud / AI Revenue Management Readiness
          </p>
          <h1 className="text-xl font-bold mb-2">{orgName}</h1>
          {/* Pipeline framing */}
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-2xl">
            {framing}
          </p>
        </div>
        {/* Readiness badge */}
        <div className={clsx(
          'px-4 py-2 rounded-lg border text-sm font-semibold shrink-0',
          cfg.color, cfg.bg, cfg.border
        )}>
          {badge}
        </div>
      </div>
    </div>
  );
}
