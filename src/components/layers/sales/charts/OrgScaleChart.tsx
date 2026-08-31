import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import type { OrgProfile } from '@/types/assessment';

interface Props { orgProfile: OrgProfile }

export function OrgScaleChart({ orgProfile }: Props) {
  const { dataVolume, activeUsers } = orgProfile;

  // Present key volume metrics as a horizontal comparison bar.
  // Normalize to a common scale (% of the largest value) for visual clarity.
  const raw = [
    { label: 'Active Users', value: activeUsers },
    { label: 'Products', value: dataVolume.products },
    { label: 'Active Quotes', value: dataVolume.activeQuotes },
    { label: 'Subscriptions', value: dataVolume.activeSubscriptions },
  ];

  const max = Math.max(...raw.map((r) => r.value));
  const data = raw.map((r) => ({
    ...r,
    pct: Math.round((r.value / max) * 100),
    display: r.value.toLocaleString(),
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 56, bottom: 0, left: 96 }}
        barCategoryGap="25%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis
          type="number" domain={[0, 100]} hide
        />
        <YAxis
          type="category" dataKey="label" width={90}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false} tickLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg px-3 py-2 text-xs shadow-lg">
                <p className="font-semibold">{d.label}</p>
                <p>{d.display}</p>
              </div>
            );
          }}
        />
        <Bar
          dataKey="pct"
          fill="hsl(245 70% 58%)"
          radius={[0, 3, 3, 0]}
          maxBarSize={18}
          label={{
            position: 'right',
            formatter: (_: unknown, entry: { payload?: { display?: string } }) =>
              entry?.payload?.display ?? '',
            fontSize: 11,
            fill: 'hsl(var(--muted-foreground))',
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
