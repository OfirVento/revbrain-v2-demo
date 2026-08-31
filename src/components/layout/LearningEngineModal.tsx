import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

// ── Tab data ──────────────────────────────────────────────────

const TABS = [
  { value: '247', label: 'Migration patterns' },
  { value: '32', label: 'Architect insights' },
  { value: '47', label: 'Client learnings' },
  { value: "Spring '26", label: 'ARM release · 12 updates' },
];

const PATTERNS = [
  { title: 'SmartBytes-style filter rules → Apex (protected)', body: 'Across 8 migrations, custom product filter rules in CPQ consistently require protected Apex in ARM. Flow-based alternatives fail validation in 5 of 8 cases. Now defaulted as the Apex pattern.' },
  { title: 'Q1 renewal peak → Feb UAT lock', body: 'Across 6 enterprise migrations with Q1 renewal peaks, customers slipping cutover into March saw 73% project delay. Feb UAT lock is now the recommended default.' },
  { title: 'Bundle pricing cascade → Custom Metadata + Apex hybrid', body: 'Multi-tier discount cascades preserve admin maintainability when Custom Metadata holds thresholds and Apex handles calculation order. Pattern proven across 11 orgs.' },
];

const ARCHITECT = [
  { title: 'Plugin interfaces need POC scoping before SOW', body: 'Architect feedback from 3 separate orgs. POC scoping now required for any org with 3+ active plugins.' },
  { title: 'Historical quote retention >5 years needs SOX validation', body: 'Finance compliance feedback. Now auto-flagged when scan detects records older than 5 years.' },
  { title: 'Permission set consolidation saves more LOE than estimated', body: 'Average 40% reduction observed vs. initial scan estimate. Now factored into LOE projections.' },
];

const CLIENT = [
  { title: 'Deal Desk velocity is the leading indicator of pricing complexity', body: '11-14 ops/day vs 3-5 ops/day correlates 87% with high pricing complexity. Now a scan-time signal.' },
  { title: 'Renewal team headcount predicts renewal automation complexity', body: 'Teams >20 people indicate need for parallel Q1 renewal handling. Now factored into Phase 2 LOE.' },
  { title: 'Multi-currency orgs converge on 4-tier approval flow', body: '8 of 9 multi-currency orgs use 4-tier (vs 3 or 5). Now the default template.' },
];

const KB_INITIAL = [
  { title: 'Promotions in ARM (Beta)', body: 'Pricing designers can set up promotions for transactions. New objects and APIs for managing promotions on sales transactions.' },
  { title: 'Product Catalog Management — higher configurable limits', body: 'Supports more searchable/filterable attributes for large catalogs. Users can select more than 20 products during discovery.' },
  { title: 'Salesforce Pricing — conditional propagation', body: 'Define pricing rules across multi-level quotes with conditional ascending propagation. Auto-numbered steps in renamed Revenue Cloud Operations Console.' },
  { title: 'Dynamic Revenue Orchestrator — any business transaction', body: 'Extend orchestration to any transaction. Custom logic between decomposition and plan generation. Migration of rules between orgs.' },
];

const KB_MORE = [
  { title: 'Product Configurator', body: 'Localized troubleshooting messages, faster bundle configuration via streamlined attribute editing and clone-from-component-options. Non-blocking UI for options.' },
  { title: 'Transaction Management', body: 'Multiple ramp schedule groups in a single transaction. Amend ramped and non-ramped assets together. Faster instant pricing with advanced filtering.' },
  { title: 'Advanced Approvals', body: 'Auto-approve resubmitted records via custom flow logic. Override approval conditions for high-value records. Up to 30 conditions per approval step.' },
  { title: 'Billing', body: 'End-to-end dispute resolution. Shared charge allocation across parties. Custom retry rules for failed payments. Saved payment methods for buyers.' },
];

function ItemCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] rounded-lg p-4">
      <p className="text-sm font-semibold mb-1">{title}</p>
      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{body}</p>
    </div>
  );
}

function KBTab() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="space-y-3">
      {KB_INITIAL.map(p => <ItemCard key={p.title} {...p} />)}
      {showMore && KB_MORE.map(p => <ItemCard key={p.title} {...p} />)}
      {!showMore && (
        <button onClick={() => setShowMore(true)} className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--accent))] hover:underline">
          <ChevronDown className="w-4 h-4" /> Show more
        </button>
      )}
      <p className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1">
        <span>↗</span> Synced to Salesforce Spring '26 Release Notes
      </p>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────

export function LearningEngineModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-[fadeIn_200ms_ease]" onClick={onClose}>
      <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-y-auto animate-[scaleIn_200ms_ease]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] px-6 py-4 flex items-start justify-between z-10">
          <div>
            <h2 className="text-lg font-bold">Learning Engine</h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">How RevBrain learns from every migration</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[hsl(var(--muted))] transition-colors">
            <X className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Stat tile tabs */}
          <div className="grid grid-cols-4 gap-3">
            {TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={clsx(
                  'rounded-lg p-4 text-center transition-all border-2 cursor-pointer',
                  i === activeTab
                    ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/5'
                    : 'border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 hover:border-[hsl(var(--accent))]/40 hover:bg-[hsl(var(--muted))]/40'
                )}
              >
                <div className={clsx('text-2xl font-bold', i === activeTab ? 'text-[hsl(var(--accent))]' : '')}>{tab.value}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{tab.label}</div>
              </button>
            ))}
          </div>

          {/* Tab content with fade */}
          <div key={activeTab} className="animate-[fadeIn_200ms_ease]">
            {activeTab === 0 && (
              <div className="space-y-3">
                {PATTERNS.map(p => <ItemCard key={p.title} {...p} />)}
              </div>
            )}
            {activeTab === 1 && (
              <div className="space-y-3">
                {ARCHITECT.map(p => <ItemCard key={p.title} {...p} />)}
              </div>
            )}
            {activeTab === 2 && (
              <div className="space-y-3">
                {CLIENT.map(p => <ItemCard key={p.title} {...p} />)}
              </div>
            )}
            {activeTab === 3 && <KBTab />}
          </div>

          {/* Confidence delta footer */}
          <div className="bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/20 rounded-lg p-5">
            <p className="text-sm font-semibold mb-1">Mapping confidence trend</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Confidence on ARM mapping increased from <strong>81%</strong> (Q3 2025) → <strong>96%</strong> (Q1 2026) based on cumulative learnings across customer migrations.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">81%</span>
              <div className="flex-1 h-1.5 rounded-full bg-[hsl(var(--muted))] relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-orange-400 to-[hsl(var(--accent))]" style={{ width: '96%' }} />
              </div>
              <span className="text-xs font-bold text-[hsl(var(--accent))]">96%</span>
              <span className="text-xs text-green-600 font-semibold">↑ +15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
