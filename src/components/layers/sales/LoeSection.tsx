import { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import type { LoeEstimate } from '@/types/assessment';

// Phase timeline bar — visual duration representation
function PhaseBar({
  phase,
  index,
  totalWeeks,
}: {
  phase: LoeEstimate['suggestedPhases'][number];
  index: number;
  totalWeeks: number;
}) {
  const midWeeks = (phase.durationWeeks.low + phase.durationWeeks.high) / 2;
  const widthPct = Math.round((midWeeks / totalWeeks) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="w-16 shrink-0 text-right">
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">P{index + 1}</span>
      </div>
      <div className="flex-1 h-6 bg-[hsl(var(--muted))] rounded relative overflow-hidden">
        <div
          className="h-full bg-[hsl(var(--accent))] rounded transition-all duration-500 flex items-center pl-2"
          style={{ width: `${widthPct}%` }}
        >
          <span className="text-white text-[10px] font-semibold truncate">
            {phase.name}
          </span>
        </div>
      </div>
      <div className="w-16 shrink-0">
        <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
          {phase.durationWeeks.low}–{phase.durationWeeks.high}w
        </span>
      </div>
    </div>
  );
}

interface LoeSection_Props {
  loeEstimate: LoeEstimate;
}

export function LoeSection({ loeEstimate }: LoeSection_Props) {
  const [limitingOpen, setLimitingOpen] = useState(false);

  const totalWeeks = loeEstimate.suggestedPhases.reduce(
    (sum, p) => sum + (p.durationWeeks.low + p.durationWeeks.high) / 2,
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="section-header">LOE & Scoping</h2>
        
      </div>

      {/* Disclaimer banner — per §5.2 styled as soft banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800/40 rounded-lg">
        <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400 shrink-0" />
        <p className="text-xs text-yellow-800 dark:text-yellow-300 italic">
          {loeEstimate.disclaimer}
        </p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center py-4">
          <p className="text-2xl font-bold">{loeEstimate.weeksLow}–{loeEstimate.weeksHigh}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">weeks total</p>
        </div>
        <div className="card text-center py-4">
          <p className="text-2xl font-bold">{loeEstimate.tier}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">LOE tier</p>
        </div>
        <div className="card text-center py-4">
          <p className="text-2xl font-bold">{loeEstimate.confidence}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">confidence</p>
        </div>
      </div>

      {/* Primary drivers */}
      <div className="card">
        <h3 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-3">
          Primary LOE Drivers
        </h3>
        <ul className="space-y-2">
          {loeEstimate.primaryDrivers.map((driver, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] mt-2 shrink-0" />
              {driver}
            </li>
          ))}
        </ul>
      </div>

      {/* Phase timeline visualization */}
      <div className="card">
        <h3 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-4">
          Suggested Delivery Phases
        </h3>
        <div className="space-y-2.5">
          {loeEstimate.suggestedPhases.map((phase, i) => (
            <div key={i}>
              <PhaseBar phase={phase} index={i} totalWeeks={totalWeeks} />
              <p className="text-xs text-[hsl(var(--muted-foreground))] ml-20 mt-0.5 leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Limiting factors — expandable */}
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <button
          onClick={() => setLimitingOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[hsl(var(--muted))]/60 hover:bg-[hsl(var(--muted))] transition-colors text-left"
        >
          <span className="text-sm font-semibold">
            Limiting Factors ({loeEstimate.confidenceLimitingFactors.length})
          </span>
          {limitingOpen
            ? <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            : <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          }
        </button>
        {limitingOpen && (
          <div className="p-4 bg-[hsl(var(--card))]">
            <ul className="space-y-2">
              {loeEstimate.confidenceLimitingFactors.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Side-by-side SOW Caveats and Change Order Risks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SOW caveats — permanently expanded */}
        <div className="card flex flex-col h-full">
          <h3 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-3">
            SOW Caveats
          </h3>
          <ul className="space-y-2">
            {loeEstimate.sowCaveats.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--muted-foreground))] mt-2 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Change order risks — permanently expanded */}
        <div className="card flex flex-col h-full border-orange-200 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-800/40">
          <h3 className="text-xs font-semibold text-orange-700 dark:text-orange-400 uppercase tracking-wide mb-3">
            Change Order Risks
          </h3>
          <ul className="space-y-2">
            {loeEstimate.changeOrderRisks.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-orange-800 dark:text-orange-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
