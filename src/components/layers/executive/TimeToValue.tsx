import type { LoeEstimate } from '@/types/assessment';

interface TimeToValueProps {
  loeEstimate: LoeEstimate;
  capabilityCount: number;
}

function StatCard({
  label,
  value,
  sub,
  confidenceLabel,
}: {
  label: string;
  value: string;
  sub: string;
  confidenceLabel: 'heuristic_estimate' | 'sample_data';
}) {
  return (
    <div className="card flex-1 min-w-0">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
          {label}
        </p>
        
      </div>
      <p className="text-3xl font-bold tracking-tight mb-1">{value}</p>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">{sub}</p>
    </div>
  );
}

export function TimeToValue({ loeEstimate, capabilityCount }: TimeToValueProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <StatCard
        label="Estimated migration"
        value={`${loeEstimate.weeksLow}–${loeEstimate.weeksHigh} weeks`}
        sub={`${loeEstimate.tier} LOE · ${loeEstimate.confidence} confidence`}
        confidenceLabel="heuristic_estimate"
      />
      <StatCard
        label="ARM capabilities live"
        value={`${capabilityCount} modules`}
        sub="Available immediately post-migration"
        confidenceLabel="heuristic_estimate"
      />
    </div>
  );
}
