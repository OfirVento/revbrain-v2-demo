import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { AssessmentPayload } from '@/types/assessment';

// Derive chart data from payload dimensions and expansion signals.
// Each row shows: what CPQ covers today (utilization score) vs
// what ARM unlocks (potential score). Sourced from complexity dimensions
// (inverted — lower complexity = higher utilization) and rcaBenefitMapping.
function buildChartData(payload: AssessmentPayload) {
  const { complexityScores, expansionSignals } = payload;
  const { dimensions } = complexityScores;

  // CPQ utilization: rough proxy — lower complexity score implies
  // the feature is well-understood and used, so we invert.
  // ARM potential: what ARM unlocks beyond current CPQ state.
  return [
    {
      area: 'Pricing',
      'CPQ Today': Math.round(100 - dimensions.pricingLogic.score * 0.6),
      'ARM Potential': 92,
    },
    {
      area: 'Configuration',
      'CPQ Today': Math.round(100 - dimensions.productCatalog.score * 0.5),
      'ARM Potential': 88,
    },
    {
      area: 'Automation',
      'CPQ Today': Math.round(100 - dimensions.customCode.score * 0.55),
      'ARM Potential': 85,
    },
    {
      area: 'Revenue Mgmt',
      'CPQ Today': 18,
      // Only available if DRO or Revenue Recognition expansion signals present
      'ARM Potential': expansionSignals.some(
        (s) => s.module === 'DRO' || s.module === 'Revenue_Recognition'
      )
        ? 80
        : 60,
    },
    {
      area: 'Approvals',
      'CPQ Today': Math.round(100 - dimensions.customCode.score * 0.45),
      'ARM Potential': 90,
    },
  ];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; fill: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-3 shadow-lg text-sm">
      <p className="font-semibold mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="text-[hsl(var(--muted-foreground))]">{p.name}:</span>
          <span className="font-medium">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

interface HeroVisualProps {
  payload: AssessmentPayload;
}

export function HeroVisual({ payload }: HeroVisualProps) {
  const data = buildChartData(payload);

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="section-header mb-0.5">CPQ Today vs ARM Potential</h2>
          <p className="muted-text">
            Estimated capability utilization — current state vs post-migration upside
          </p>
        </div>
        
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          barCategoryGap="30%"
          barGap={4}
          margin={{ top: 4, right: 4, bottom: 4, left: -16 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="area"
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          />
          <Bar
            dataKey="CPQ Today"
            fill="hsl(220 9% 70%)"
            radius={[3, 3, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="ARM Potential"
            fill="hsl(245 70% 58%)"
            radius={[3, 3, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>

      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3 italic">
        Heuristic estimate — derived from org complexity signals and ARM capability benchmarks.
        Not a commitment.
      </p>
    </div>
  );
}
