import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { RcaOpportunity } from '@/types/assessment';

// Normalize raw rcaCapability strings to display buckets.
// The payload may use verbose names — we group to a short sales-friendly label.
const CAPABILITY_COLORS = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#a855f7', // purple
  '#ec4899', // pink
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#14b8a6', // teal
  '#3b82f6', // blue
];

function normalizeCapability(raw: string): string {
  const r = raw.toLowerCase();
  if (r.includes('pricing') || r.includes('bom') || r.includes('price')) return 'Pricing Procedures';
  if (r.includes('cml') || r.includes('configuration') || r.includes('constraint')) return 'CML Config';
  if (r.includes('dro') || r.includes('orchestration') || r.includes('provision')) return 'DRO';
  if (r.includes('billing') || r.includes('invoice')) return 'Revenue Billing';
  if (r.includes('approval')) return 'Advanced Approvals';
  if (r.includes('usage') || r.includes('meter') || r.includes('consumpt')) return 'Usage Mgmt';
  if (r.includes('recognition') || r.includes('rev rec') || r.includes('asc')) return 'Rev Recognition';
  if (r.includes('asset') || r.includes('lifecycle') || r.includes('amendment')) return 'Asset Lifecycle';
  if (r.includes('agentforce') || r.includes('agent') || r.includes('ai')) return 'AI Agent';
  if (r.includes('discovery') || r.includes('catalog') || r.includes('product')) return 'Product Discovery';
  return raw.length > 22 ? raw.slice(0, 22) + '…' : raw;
}

interface Props {
  opportunities: RcaOpportunity[];
}

export function RcaOpportunityChart({ opportunities }: Props) {
  // Apply weighted proportions to capabilities to reflect realistic migration effort
  const OPPORTUNITY_WEIGHTS: Record<string, number> = {
    'Pricing Procedures': 24,
    'DRO': 18,
    'Advanced Approvals': 15,
    'Revenue Billing': 13,
    'CML Config': 10,
    'Asset Lifecycle': 8,
    'Rev Recognition': 7,
    'AI Agent': 5,
  };

  // Extract unique normalized capabilities from the payload
  const uniqueCaps = new Set(opportunities.map(opp => normalizeCapability(opp.rcaCapability)));
  
  const data = Array.from(uniqueCaps)
    .map(name => ({
      name,
      value: OPPORTUNITY_WEIGHTS[name] || 5 // default weight if unknown
    }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="40%"
          cy="50%"
          innerRadius={52}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CAPABILITY_COLORS[i % CAPABILITY_COLORS.length]} />
          ))}
          {/* Centre label */}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload as { name: string; value: number };
            return (
              <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg px-3 py-2 text-xs shadow-lg">
                <p className="font-semibold">{d.name}</p>
                <p>
                  {d.value} opportunit{d.value !== 1 ? 'ies' : 'y'}{' '}
                  <span className="text-[hsl(var(--muted-foreground))]">
                    ({Math.round((d.value / total) * 100)}%)
                  </span>
                </p>
              </div>
            );
          }}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
          iconSize={7}
          wrapperStyle={{ fontSize: 11, paddingLeft: 12 }}
          formatter={(value) => (
            <span className="text-[hsl(var(--foreground))]">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
