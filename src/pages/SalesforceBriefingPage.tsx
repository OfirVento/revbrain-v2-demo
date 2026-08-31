import { useEffect } from 'react';
import { useAssessmentStore } from '@/store';
import { verdictToReadiness } from '@/components/layers/salesforce/ReadinessHeader';

// §6.3 — Print-dedicated one-page Salesforce briefing.
// Route: /assessment/salesforce/briefing
// Optimized for print-to-PDF: @media print rules hide nav and action elements.

export function SalesforceBriefingPage() {
  const { payload } = useAssessmentStore();

  // Trigger browser print dialog on mount (user can cancel)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Don't auto-print — let user review then use browser Print command
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!payload) return null;

  const {
    meta,
    verdict,
    complexityScores,
    loeEstimate,
    topConcerns,
    expansionSignals,
    aiNarratives,
  } = payload;

  const readiness = verdictToReadiness(verdict.recommendation);
  const BADGE_COLOR: Record<string, string> = {
    'Ready': '#16a34a',
    'Needs Preparation': '#ca8a04',
    'Not Ready': '#dc2626',
  };

  return (
    <>
      {/* Print-only action bar — hidden in @media print */}
      <div className="no-print flex items-center justify-between px-8 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Salesforce Briefing — {meta.orgName}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            ← Back
          </button>
          <button
            id="print-briefing-btn"
            onClick={() => window.print()}
            className="px-4 py-2 bg-[hsl(var(--accent))] text-white rounded-lg text-sm font-semibold hover:bg-[hsl(var(--accent))]/90 transition-colors"
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* One-page briefing content */}
      <div
        id="briefing-content"
        className="max-w-4xl mx-auto px-10 py-8 print:px-0 print:py-0 print:max-w-none"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-gray-200">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
              AllCloud · Revenue Cloud Readiness Briefing
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{meta.orgName}</h1>
            <p className="text-sm text-gray-500">
              Assessment {meta.assessmentId} · {new Date(meta.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-lg text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: BADGE_COLOR[readiness] ?? '#6b7280' }}
          >
            {readiness}
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Left: verdict + complexity */}
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Assessment Verdict
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{verdict.rationale}</p>

            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Complexity Profile
            </h2>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
                style={{ backgroundColor: complexityScores.overall === 'High' || complexityScores.overall === 'Very High' ? '#f97316' : '#eab308' }}
              >
                {complexityScores.overallNumeric}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{complexityScores.overall} Complexity</p>
                <p className="text-xs text-gray-500">out of 100</p>
              </div>
            </div>

            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Estimated LOE
            </h2>
            <p className="text-sm text-gray-700 mb-1">
              <strong>{loeEstimate.weeksLow}–{loeEstimate.weeksHigh} weeks</strong> · {loeEstimate.tier} effort
            </p>
            <p className="text-xs text-gray-500 italic">{loeEstimate.disclaimer}</p>
          </div>

          {/* Right: top concerns + expansion */}
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Top 3 Concerns
            </h2>
            <ol className="space-y-2 mb-4">
              {topConcerns.slice(0, 3).map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{c.audienceFraming.salesforce.headline}</span>
                </li>
              ))}
            </ol>

            {expansionSignals.length > 0 && (
              <>
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Expansion Signals ({expansionSignals.length})
                </h2>
                <ul className="space-y-1">
                  {expansionSignals.slice(0, 3).map((s, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <span>{s.module.replace(/_/g, ' ')} — {s.consultativeFraming.slice(0, 80)}{s.consultativeFraming.length > 80 ? '…' : ''}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Co-sell narrative */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            Co-Sell Narrative
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{aiNarratives.salesforce}</p>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Generated by RevBrain · AllCloud CPQ→ARM Assessment Tool · {meta.truthLabel === 'sample_data' ? 'Sample data — not a real org' : 'Live assessment'}
          </p>
          <p className="text-xs text-gray-400">Confidential</p>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          #briefing-content { padding: 0; }
          body { background: white; }
        }
      `}</style>
    </>
  );
}
