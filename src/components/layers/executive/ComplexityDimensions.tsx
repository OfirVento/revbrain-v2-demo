import { clsx } from 'clsx';
import { useUiStore } from '@/store';
import type { ComplexityScores } from '@/types/assessment';

const DIMENSION_LABELS: Record<string, string> = {
  pricingLogic: 'Pricing Logic',
  productCatalog: 'Product Catalog',
  customCode: 'Custom Code',
  dataMigration: 'Data Migration',
  integrations: 'Integrations',
  deprecatedConfig: 'Deprecated Config',
};

const TIER_COLORS: Record<string, string> = {
  Low: 'bg-green-400',
  Medium: 'bg-yellow-400',
  High: 'bg-orange-500',
  'Very High': 'bg-red-500',
};

interface ComplexityDimensionsProps {
  complexityScores: ComplexityScores;
}

export function ComplexityDimensions({ complexityScores }: ComplexityDimensionsProps) {
  const { openEvidenceDrawer } = useUiStore();
  const { dimensions } = complexityScores;

  const rows = Object.entries(dimensions) as [
    keyof typeof dimensions,
    (typeof dimensions)[keyof typeof dimensions]
  ][];

  return (
    <div className="card">
      <h2 className="section-header mb-1">Complexity Breakdown</h2>
      <p className="muted-text mb-5">
        Six-dimension assessment — click any row to see the evidence behind the score.
      </p>
      <div className="space-y-4">
        {rows.map(([key, dim]) => (
          <button
            key={key}
            onClick={() => openEvidenceDrawer(dim.evidence, DIMENSION_LABELS[key])}
            className="w-full text-left group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium group-hover:text-[hsl(var(--accent))] transition-colors">
                {DIMENSION_LABELS[key]}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'px-1.5 py-0.5 rounded text-xs font-medium text-white',
                    TIER_COLORS[dim.tier] ?? 'bg-gray-400'
                  )}
                >
                  {dim.tier}
                </span>
                <span className="text-sm font-mono font-semibold w-8 text-right">
                  {dim.score}
                </span>
              </div>
            </div>
            {/* Score bar */}
            <div className="h-1.5 w-full bg-[hsl(var(--border))] rounded-full overflow-hidden">
              <div
                className={clsx(
                  'h-full rounded-full transition-all duration-500',
                  TIER_COLORS[dim.tier] ?? 'bg-gray-400'
                )}
                style={{ width: `${dim.score}%` }}
              />
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 truncate">
              {dim.signal}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
