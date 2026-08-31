import type { AssessmentPayload } from '@/types/assessment';

// Derives structured talking points from payload for the AE.
// These are not AI-generated at runtime — they're derived from
// the assessment data and formatted as conversation scaffolding.
function deriveTalkingPoints(payload: AssessmentPayload): string[] {
  const { complexityScores, orgProfile, loeEstimate, verdict, topConcerns } = payload;
  return [
    `This org runs ${orgProfile.edition} Salesforce with ${orgProfile.dataVolume.activeSubscriptions.toLocaleString()} active subscriptions — this is a material revenue system, not a pilot.`,
    `The migration complexity scores ${complexityScores.overallNumeric}/100 (${complexityScores.overall}). Pricing logic is the primary driver at ${complexityScores.dimensions.pricingLogic.score}/100 — this needs early discovery time with the CPQ admin.`,
    `Our verdict is ${verdict.recommendation.replace(/_/g, ' ')}. ${verdict.rationale}`,
    `${topConcerns[0]?.audienceFraming.sales?.headline ?? topConcerns[0]?.title} — this is the headline risk for the scoping conversation.`,
    `Estimated delivery: ${loeEstimate.weeksLow}–${loeEstimate.weeksHigh} weeks across ${loeEstimate.suggestedPhases.length} phases. LOE confidence is ${loeEstimate.confidence} — flag the limiting factors before quoting.`,
  ];
}

interface AiTalkingPointsProps {
  payload: AssessmentPayload;
}

export function AiTalkingPoints({ payload }: AiTalkingPointsProps) {
  const points = deriveTalkingPoints(payload);

  return (
    <div className="card bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded bg-[hsl(var(--accent))] flex items-center justify-center shrink-0">
          <span className="text-white text-[9px] font-bold">V</span>
        </div>
        <h2 className="text-sm font-semibold">AI Talking Points</h2>
        
      </div>

      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4 leading-relaxed">
        Prepared for: Account Executive — {payload.meta.orgName} discovery call
      </p>

      <ol className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed">{point}</p>
          </li>
        ))}
      </ol>

      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4 pt-3 border-t border-[hsl(var(--border))]/60 italic">
        {payload.aiNarratives.sales}
      </p>
    </div>
  );
}
