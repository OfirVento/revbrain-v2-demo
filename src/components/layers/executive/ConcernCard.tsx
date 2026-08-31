import { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useUiStore } from '@/store';
import type { Concern } from '@/types/assessment';

const SEVERITY_STYLES: Record<string, string> = {
  High: 'border-l-orange-400',
  Medium: 'border-l-yellow-400',
  Low: 'border-l-blue-400',
  Info: 'border-l-gray-300',
  Critical: 'border-l-red-500',
};

interface ExecutiveConcernCardProps {
  concern: Concern;
  rank: number;
}

export function ExecutiveConcernCard({ concern, rank }: ExecutiveConcernCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { openEvidenceDrawer } = useUiStore();
  const framing = concern.audienceFraming.executive;

  return (
    <div
      className={clsx(
        'card-sm border-l-4',
        SEVERITY_STYLES[concern.severity] ?? 'border-l-gray-300'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Rank */}
        <span className="text-2xl font-bold text-[hsl(var(--border))] leading-none mt-0.5 w-7 shrink-0">
          {rank}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-0.5">
                {concern.severity} Priority
              </p>
              <h3 className="text-sm font-semibold mb-1">{framing.headline}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed pr-2">
                {framing.impact}
              </p>
            </div>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="p-1 rounded hover:bg-[hsl(var(--muted))] transition-colors shrink-0"
            >
              {expanded ? (
                <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              )}
            </button>
          </div>

          {expanded && (
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2 px-3 py-2 bg-[hsl(var(--accent))]/8 rounded-md border border-[hsl(var(--accent))]/20">
                <span className="text-xs font-semibold text-[hsl(var(--accent))] uppercase tracking-wide shrink-0 mt-0.5">

                  Next action
                </span>
                <p className="text-sm leading-relaxed text-[hsl(var(--foreground))]">
                  {framing.nextAction}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => openEvidenceDrawer(concern.evidence, concern.title)}
                  className="flex items-center gap-1.5 text-xs text-[hsl(var(--accent))] hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  View evidence trail
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
