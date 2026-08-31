import { useState } from 'react';
import { useAssessmentStore } from '@/store';

import { FindingCard, SeverityBadge, SEVERITY_ORDER } from '@/components/layers/implementation/FindingCard';
import { clsx } from 'clsx';
import { Lock } from 'lucide-react';
import type { Severity } from '@/types/assessment';

// ── Category filter bar ──────────────────────────────────────────
const CATEGORIES = [
  'All',
  'Pricing',
  'Configuration',
  'Custom Code',
  'Data Migration',
  'Integrations',
  'Deprecated Config',
];

function CategoryFilter({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (c: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={clsx(
            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
            active === cat
              ? 'bg-[hsl(var(--accent))] text-white border-transparent'
              : 'bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]'
          )}
        >
          {cat}
          {counts[cat] !== undefined && (
            <span
              className={clsx(
                'ml-1.5 text-xs',
                active === cat ? 'opacity-80' : 'text-[hsl(var(--muted-foreground))]'
              )}
            >
              {counts[cat]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ── Severity summary ─────────────────────────────────────────────
function SeveritySummary({ total, counts }: { total: number; counts: Record<string, number> }) {
  const items: Severity[] = ['High', 'Medium', 'Low', 'Info'];
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((s) => (
        <div key={s} className="flex items-center gap-1.5">
          <SeverityBadge severity={s} />
          <span className="text-sm font-semibold">{counts[s] || 0}</span>
        </div>
      ))}
      <span className="text-sm text-[hsl(var(--muted-foreground))] ml-1">
        | {total} total findings
      </span>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────
export function ImplementationPage() {
  const { payload } = useAssessmentStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSeverity, setActiveSeverity] = useState<Severity | 'All'>('All');


  if (!payload) return null;

  const { implementationFindings, meta } = payload;

  // Category counts
  const categoryCounts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] =
      cat === 'All'
        ? implementationFindings.length
        : implementationFindings.filter((f) => f.category === cat).length;
    return acc;
  }, {});

  // Severity counts (unfiltered, for the summary bar)
  const severityCounts = implementationFindings.reduce<Record<string, number>>((acc, f) => {
    acc[f.severity] = (acc[f.severity] || 0) + 1;
    return acc;
  }, {});

  // Filtered + sorted list
  const filtered = implementationFindings
    .filter((f) => activeCategory === 'All' || f.category === activeCategory)
    .filter((f) => activeSeverity === 'All' || f.severity === activeSeverity)
    .sort((a, b) => SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 page-fade">

      {/* ── Locked v2.1 banner ─────────────────────────────────── */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/60">
        <Lock className="w-4 h-4 text-[hsl(var(--muted-foreground))] mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">Implementation report v2.1 — locked.</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
            Future versions convert findings into work packages and migration tasks.
          </p>
        </div>
      </div>

      {/* ── Page header ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-semibold">Implementation Findings</h1>
          

        </div>
        <p className="text-[hsl(var(--muted-foreground))]">
          Technical analysis for AllCloud delivery leads and architects — {meta.orgName}
        </p>
      </div>

      {/* ── Severity distribution ───────────────────────────────── */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Finding Severity Distribution</h2>
          

        </div>
        <SeveritySummary total={implementationFindings.length} counts={severityCounts} />
      </div>

      {/* ── Section nav: category + severity filters ────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <h2 className="section-header">Technical Findings</h2>
            

          </div>
          {/* Severity pills */}
          <div className="flex items-center gap-1.5">
            {(['All', 'High', 'Medium', 'Low', 'Info'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setActiveSeverity(s)}
                className={clsx(
                  'px-2.5 py-1 text-xs rounded-md border transition-colors',
                  activeSeverity === s
                    ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))] border-transparent'
                    : 'bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--foreground))]/30'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          counts={categoryCounts}
        />
      </div>

      {/* ── Findings list ───────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="card text-center py-12 text-[hsl(var(--muted-foreground))]">
          No findings match the current filter.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((f, i) => (
            <FindingCard key={i} finding={f} />
          ))}
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-[hsl(var(--border))]">
        
      </div>
    </div>
  );
}
