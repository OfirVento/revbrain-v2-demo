import { useAssessmentStore } from '@/store';

import { ReadinessHeader } from '@/components/layers/salesforce/ReadinessHeader';
import { ExpansionSignalsGrid } from '@/components/layers/salesforce/ExpansionSignalsGrid';
import { RiskHeatmap } from '@/components/layers/salesforce/RiskHeatmap';
import { CoSellNarrative } from '@/components/layers/salesforce/CoSellNarrative';
import { BriefingExport } from '@/components/layers/salesforce/BriefingExport';

// §5.3 Layer 3 — Salesforce
// Title: "Revenue Cloud / AI Revenue Management Readiness"
// Components in spec order, nothing added:
//   1. Readiness verdict header
//   2. Expansion signals grid
//   3. Migration risk profile (heatmap)
//   4. Co-sell narrative card
//   5. Account-ready summary export

export function SalesforcePage() {
  const { payload } = useAssessmentStore();
  if (!payload) return null;


  const {
    meta,
    verdict,
    complexityScores,
    expansionSignals,
    implementationFindings,
    aiNarratives,
  } = payload;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-10 page-fade">

      {/* ── Page header ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-semibold">
            Revenue Cloud / AI Revenue Management Readiness
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[hsl(var(--muted-foreground))]">
            Salesforce view — {meta.orgName}
          </p>
          

        </div>
      </div>

      {/* ── §5.3 (1) Readiness verdict header ───────────────────── */}
      <ReadinessHeader
        verdict={verdict}
        orgName={meta.orgName}
        complexityScores={complexityScores}
      />

      {/* ── §5.3 (2) Expansion signals grid ─────────────────────── */}
      <ExpansionSignalsGrid signals={expansionSignals} />

      {/* ── §5.3 (3) Migration risk profile ─────────────────────── */}
      <RiskHeatmap findings={implementationFindings} />

      {/* ── §5.3 (4) Co-sell narrative card ─────────────────────── */}
      <CoSellNarrative
        narrative={aiNarratives.salesforce}
        orgName={meta.orgName}
      />

      {/* ── §5.3 (5) Account-ready summary export ───────────────── */}
      <BriefingExport orgName={meta.orgName} />

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-[hsl(var(--border))]">
        
      </div>
    </div>
  );
}
