import { clsx } from 'clsx';
import { ExternalLink } from 'lucide-react';
import { useUiStore } from '@/store';
import type { RcaOpportunity } from '@/types/assessment';

const CONFIDENCE_DOT: Record<string, string> = {
  High: 'bg-green-500',
  Medium: 'bg-yellow-400',
  Low: 'bg-gray-400',
};

interface OpportunityCardProps {
  opportunity: RcaOpportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { openEvidenceDrawer } = useUiStore();

  return (
    <div className="card-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={clsx(
                'w-2 h-2 rounded-full shrink-0',
                CONFIDENCE_DOT[opportunity.confidence] ?? 'bg-gray-400'
              )}
            />
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {opportunity.confidence} confidence
            </span>
            {opportunity.expansionSignal && (
              <span className="px-1.5 py-0.5 bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] text-xs rounded font-medium">
                + {opportunity.expansionSignal.replace(/_/g, ' ')}
              </span>
            )}
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">
            <span className="font-medium">From:</span> {opportunity.cpqFinding}
          </p>
          <p className="text-sm font-semibold">{opportunity.rcaCapability}</p>
        </div>
      </div>

      {/* Business benefit */}
      <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
        {opportunity.businessBenefit}
      </p>

      {/* Evidence link */}
      <div className="flex justify-end border-t border-[hsl(var(--border))] pt-2 mt-auto">
        <button
          onClick={() => openEvidenceDrawer(opportunity.evidence, opportunity.rcaCapability)}
          className="flex items-center gap-1.5 text-xs text-[hsl(var(--accent))] hover:underline"
        >
          <ExternalLink className="w-3 h-3" />
          Evidence
        </button>
      </div>
    </div>
  );
}
