import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { ImplementationFinding } from '@/types/assessment';

const SEVERITY_COLORS: Record<string, string> = {
  High: '#f97316',
  Medium: '#eab308',
  Low: '#3b82f6',
  Info: '#94a3b8',
  Critical: '#ef4444',
};

interface Props { findings: ImplementationFinding[] }

export function RiskDistributionChart({ findings }: Props) {
  const counts = findings.reduce<Record<string, number>>((acc, f) => {
    acc[f.severity] = (acc[f.severity] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => {
      const order = ['Critical', 'High', 'Medium', 'Low', 'Info'];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={52}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={SEVERITY_COLORS[entry.name] ?? '#94a3b8'} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg px-3 py-2 text-xs shadow-lg">
                <p className="font-semibold">{d.name}</p>
                <p>{d.value} finding{d.value !== 1 ? 's' : ''}</p>
              </div>
            );
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
