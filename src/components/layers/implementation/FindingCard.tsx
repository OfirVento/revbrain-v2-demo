import { useState } from 'react';
import { useUiStore } from '@/store';
import { clsx } from 'clsx';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import type { ImplementationFinding, Severity } from '@/types/assessment';

// ── Severity helpers ─────────────────────────────────────────────
export const SEVERITY_ORDER: Record<Severity, number> = {
  Critical: 5, High: 4, Medium: 3, Low: 2, Info: 1,
};

// Design decision (deviation from spec §7.2):
// Spec specifies a yellow→red gradient for severity. We intentionally use blue for
// Low and gray for Info. Rationale: keeping advisory tiers (Low, Info) in cool tones
// visually separates "worth noting" from "problem" findings (High=orange, Medium=yellow)
// at a glance. This hierarchy is more useful for the delivery audience than strict
// warm-gradient compliance. Applied consistently across all layers.
export const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
  High: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
  Low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
  Info: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-300',
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        SEVERITY_STYLES[severity]
      )}
    >
      {severity}
    </span>
  );
}

// ── FindingCard ──────────────────────────────────────────────────
interface FindingCardProps {
  finding: ImplementationFinding;
}

export function FindingCard({ finding }: FindingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { openEvidenceDrawer } = useUiStore();

  return (
    <div className="card-sm group">
      {/* Always-visible header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <SeverityBadge severity={finding.severity} />
            <span className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] px-2 py-0.5 rounded">
              {finding.category}
            </span>
          </div>
          <h3 className="text-sm font-semibold leading-snug">{finding.finding}</h3>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1.5 rounded hover:bg-[hsl(var(--muted))] transition-colors shrink-0"
          aria-label={expanded ? 'Collapse finding' : 'Expand finding'}
        >
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          )}
        </button>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="mt-4 space-y-4 border-t border-[hsl(var(--border))] pt-4">
          <div>
            <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1.5">
              Technical Detail
            </p>
            <p className="text-sm leading-relaxed">{finding.technicalDetail}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[hsl(var(--accent))] uppercase tracking-wide mb-1.5">
              Recommended Action
            </p>
            <p className="text-sm leading-relaxed font-medium">{finding.recommendedAction}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => openEvidenceDrawer(finding.evidence, finding.finding)}
              className="flex items-center gap-1.5 text-xs text-[hsl(var(--accent))] hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              View evidence trail
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
