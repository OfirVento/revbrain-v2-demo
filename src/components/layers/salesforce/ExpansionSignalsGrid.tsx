import { useState } from 'react';
import { clsx } from 'clsx';
import { useUiStore } from '@/store';
import type { ExpansionSignal } from '@/types/assessment';

const MODULE_LABELS: Record<string, string> = {
  DRO: 'Dynamic Revenue Orchestration',
  Billing: 'Salesforce Billing',
  Advanced_Approvals: 'Advanced Approvals',
  Usage_Management: 'Usage Management',
  Revenue_Recognition: 'Revenue Recognition',
  CLM: 'Contract Lifecycle Management',
  Product_Discovery: 'Product Discovery',
  Token_Overage: 'Token Overage',
  'AI Agent': 'AI Agent Revenue Mgmt',
};

const CONFIDENCE_STYLES: Record<string, string> = {
  High: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
  Low: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400',
};

interface SignalCardProps {
  signal: ExpansionSignal;
}

function SignalCard({ signal }: SignalCardProps) {
  const [showEvidence, setShowEvidence] = useState(false);
  const { openEvidenceDrawer } = useUiStore();
  const moduleName = MODULE_LABELS[signal.module] ?? signal.module.replace(/_/g, ' ');

  return (
    <div
      className="card-sm relative cursor-default"
      onMouseEnter={() => setShowEvidence(true)}
      onMouseLeave={() => setShowEvidence(false)}
    >
      {/* Module header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold leading-snug">{moduleName}</p>
        <span className={clsx(
          'text-xs px-1.5 py-0.5 rounded border shrink-0 font-medium',
          CONFIDENCE_STYLES[signal.confidence] ?? CONFIDENCE_STYLES['Low']
        )}>
          {signal.confidence}
        </span>
      </div>

      {/* Consultative framing */}
      <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-3">
        <span className="font-medium text-[hsl(var(--foreground))]">May be relevant if </span>
        {signal.triggerCondition.toLowerCase()}
      </p>

      <p className="text-xs leading-relaxed text-[hsl(var(--foreground))]/80">
        {signal.consultativeFraming}
      </p>

      {/* Evidence hover overlay */}
      {showEvidence && (
        <div className="absolute inset-0 rounded-lg bg-[hsl(var(--card))]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-2 border border-[hsl(var(--accent))]/20 z-10">
          <p className="text-xs font-semibold text-[hsl(var(--accent))]">Trigger Evidence</p>
          <ul className="px-4 space-y-1 text-xs text-center">
            {signal.evidence.summary.slice(0, 2).map((s, i) => (
              <li key={i} className="text-[hsl(var(--muted-foreground))]">{s}</li>
            ))}
          </ul>
          <button
            onClick={() => openEvidenceDrawer(signal.evidence, `${moduleName} — expansion signal`)}
            className="text-xs text-[hsl(var(--accent))] underline mt-1"
          >
            Full evidence trail →
          </button>
        </div>
      )}
    </div>
  );
}

interface ExpansionSignalsGridProps {
  signals: ExpansionSignal[];
}

export function ExpansionSignalsGrid({ signals }: ExpansionSignalsGridProps) {
  // §5.3: modules surface only when triggered (non-empty signals array)
  if (signals.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          No expansion signals detected for this org.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="section-header">Expansion Signals</h2>
        
        <span className="text-xs text-[hsl(var(--muted-foreground))] ml-auto">
          Hover any card for trigger evidence
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.map((signal, i) => (
          <SignalCard key={i} signal={signal} />
        ))}
      </div>
    </div>
  );
}
