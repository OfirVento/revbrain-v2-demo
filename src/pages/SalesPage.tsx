import { useAssessmentStore, useUiStore, useAgentStore } from '@/store';
import { clsx } from 'clsx';
import { MessageSquare } from 'lucide-react';

// ── Key Signals Hero ──────────────────────────────────────────

function FitScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const label = score >= 80 ? 'Strong' : score >= 60 ? 'Moderate' : 'Weak';
  const labelColor = score >= 80 ? 'bg-green-100 text-green-800 border-green-200'
    : score >= 60 ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
    : 'bg-red-100 text-red-800 border-red-200';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-32 h-32 -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" className="stroke-[hsl(var(--border))]" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="hsl(245 70% 58%)" strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold leading-none">{score}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">/100</span>
        </div>
      </div>
      <p className="text-sm font-medium mt-2">Fit Score</p>
      <span className={clsx('text-xs font-semibold px-2 py-0.5 rounded border mt-1', labelColor)}>
        {label}
      </span>
    </div>
  );
}

function SignalTile({ title, value }: { title: string; value: string }) {
  return (
    <div className="card flex-1 min-w-0">
      <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-2">
        {title}
      </p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function KeySignalsHero() {
  return (
    <div className="card bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20">
      <h2 className="section-header mb-1">KEY SIGNALS</h2>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-6">
        Based on similar org profiles, here's how this account looks against typical ARM migration readiness.
      </p>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <FitScoreGauge score={86} />
        <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
          <SignalTile title="Strong adoption" value="84/112 active users · +16 over 24mo" />
          <SignalTile title="Clean architecture" value="26/100 complexity · 87% maps to ARM" />
        </div>
      </div>
    </div>
  );
}

// ── Q&A Card ──────────────────────────────────────────────────

interface QACardProps {
  question: string;
  answer: string;
  source?: string;
}

function QACard({ question, answer, source }: QACardProps) {
  const { setAgentPanelOpen } = useUiStore();
  const { setPendingInput } = useAgentStore();

  const askAgent = () => {
    const snippet = answer.length > 100 ? answer.slice(0, 100) + '...' : answer;
    setPendingInput(`Re: "${question}"\nCurrent answer: ${snippet}\n\nFollow-up: `);
    setAgentPanelOpen(true);
  };

  return (
    <div className="card-sm hover:border-[hsl(var(--accent))]/30 transition-colors">
      <h4 className="text-sm font-semibold mb-2">{question}</h4>
      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-3">{answer}</p>
      <div className="flex items-center justify-between pt-2 border-t border-[hsl(var(--border))]/60">
        {source && (
          <span className="text-xs text-[hsl(var(--muted-foreground))]">→ {source}</span>
        )}
        <button
          onClick={askAgent}
          className="flex items-center gap-1 text-xs text-[hsl(var(--accent))] hover:underline ml-auto"
        >
          <MessageSquare className="w-3 h-3" />
          Ask agent
        </button>
      </div>
    </div>
  );
}

// ── Category section ──────────────────────────────────────────

interface CategorySectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

function CategorySection({ title, count, children }: CategorySectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="section-header">{title}</h3>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">{count} items</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────

export function SalesPage() {
  const { payload } = useAssessmentStore();

  if (!payload) return null;

  const { meta } = payload;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-10 page-fade">

      {/* ── Page header ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-semibold">Sales Workspace</h1>
          
        </div>
        <p className="text-[hsl(var(--muted-foreground))]">
          Qualify the deal — {meta.orgName}
        </p>
        <p className="text-sm mt-2 font-medium">
          Is this account ready for a serious ARM migration conversation, and why?
        </p>
      </div>

      {/* ── Key Signals Hero ───────────────────────────────────── */}
      <KeySignalsHero />

      {/* ── Category 1: Adoption ───────────────────────────────── */}
      <CategorySection title="ADOPTION & USAGE" count={13}>
        <QACard
          question="Is this org actually using CPQ?"
          answer="Yes — 84 of 112 licenses active (75% adoption), growing +16 over 24 months. Three teams drive daily and weekly use: Enterprise Sales (~12), Renewals (~28), Deal Desk (~6). Not shelfware."
          source="§2.1 · Adoption scan"
        />
        <QACard
          question="How much quoting activity?"
          answer="10,240 quotes over 24 months · 2,100 in last 6 months · 8.5-day average cycle. Volume comfortably above the threshold where migration ROI is defensible."
          source="§3.2 · Quote activity"
        />
        <QACard
          question="What do they actually sell through CPQ?"
          answer="176 active products in 12 product families. A mid-2024 product line launch added 19 bundle-capable products — these drive 47% of recent quote volume. Catalog is segmented enough to support phased migration."
          source="§5.3 · Catalog analysis"
        />
      </CategorySection>

      {/* ── Category 2: Revenue ────────────────────────────────── */}
      <CategorySection title="REVENUE IMPACT" count={8}>
        <QACard
          question="What's the deal value tied to CPQ?"
          answer="$147M in closed-won opportunity value over 24 months. CPQ is on the critical revenue path — this isn't a back-office tool, it's the quoting backbone."
          source="§4.1 · Revenue attribution"
        />
        <QACard
          question="What product lines drive volume?"
          answer="SmartBytes (2024 launch) = 47% of recent volume. Core Products 38%. Legacy Bundles 10%. Other 5%. SmartBytes' rapid adoption shows the org actively evolves its catalog."
          source="§5.3 · Product mix"
        />
        <QACard
          question="Currency complexity?"
          answer="5 currencies (AUD, GBP, EUR, NZD, USD). All have direct ARM equivalents — no custom currency handling required."
          source="§3.4 · Currency config"
        />
      </CategorySection>

      {/* ── Category 3: Complexity ─────────────────────────────── */}
      <CategorySection title="COMPLEXITY & ARCHITECTURE" count={9}>
        <QACard
          question="How complex is the current implementation?"
          answer="26/100 overall (Low tier). 87% of functionality maps cleanly to ARM at 96% confidence. The remaining 13% needs architect review but is bounded."
          source="§6.1 · Complexity score"
        />
        <QACard
          question="What's the custom code situation?"
          answer="5 QCP scripts, 109 Apex classes, 8 triggers, 4 plugins. SmartBytes filter rule needs custom validation in ARM. Plugin interfaces need POC scoping."
          source="§6.2 · Code inventory"
        />
        <QACard
          question="Approval flows?"
          answer="Standard approval flows with 4 tiers. Deal Desk handles 11-14 ops/day. Maps directly to ARM approval framework — no custom approval logic needed."
          source="§6.3 · Approval analysis"
        />
      </CategorySection>

      {/* ── Category 4: Timeline ───────────────────────────────── */}
      <CategorySection title="TIMELINE & RISK" count={6}>
        <QACard
          question="What's the migration lift?"
          answer="14–18 weeks across 4 phases. Phase 1 (Active Quoting) deployable in 3–4 weeks. Each phase is independently shippable — risk is bounded per phase."
          source="§7.1 · LOE estimate"
        />
        <QACard
          question="Cutover risk?"
          answer="Q1 renewal peak (March) is a hard constraint. Recommend February UAT lock. 73% of similar orgs slip if cutover overlaps renewals."
          source="§7.3 · Cutover analysis"
        />
        <QACard
          question="Existing contracts?"
          answer="Bridge strategy: keep active contracts in CPQ, use 'Renewal Flip' automation as contracts come up for renewal. No big-bang contract migration needed."
          source="§7.4 · Contract strategy"
        />
      </CategorySection>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-[hsl(var(--border))]">
        
      </div>
    </div>
  );
}
