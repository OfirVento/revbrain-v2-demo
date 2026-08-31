import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import type { ComplexityScores } from '@/types/assessment';

const TIER_COLORS: Record<string, string> = {
  Low: '#22c55e',
  Medium: '#eab308',
  High: '#f97316',
  'Very High': '#ef4444',
};

const DIMENSION_LABELS: Record<string, string> = {
  pricingLogic: 'Pricing Logic',
  productCatalog: 'Product Catalog',
  customCode: 'Custom Code',
  dataMigration: 'Data Migration',
  integrations: 'Integrations',
  deprecatedConfig: 'Deprecated Config',
};

interface Props { complexityScores: ComplexityScores }

export function ComplexityChart({ complexityScores }: Props) {
  const { dimensions } = complexityScores;

  const data = (Object.entries(dimensions) as [keyof typeof dimensions, (typeof dimensions)[keyof typeof dimensions]][])
    .map(([key, dim]) => ({
      name: DIMENSION_LABELS[key],
      score: dim.score,
      tier: dim.tier,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 16, bottom: 0, left: 96 }}
        barCategoryGap="25%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis
          type="number" domain={[0, 100]}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false} tickLine={false}
          tickFormatter={(v) => `${v}`}
        />
        <YAxis
          type="category" dataKey="name" width={90}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false} tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg px-3 py-2 text-xs shadow-lg">
                <p className="font-semibold">{d.name}</p>
                <p>{d.score}/100 — {d.tier}</p>
              </div>
            );
          }}
        />
        <Bar dataKey="score" radius={[0, 3, 3, 0]} maxBarSize={18}>
          {data.map((entry, i) => (
            <Cell key={i} fill={TIER_COLORS[entry.tier] ?? '#94a3b8'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
