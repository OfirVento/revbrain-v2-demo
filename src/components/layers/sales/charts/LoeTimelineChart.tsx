import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { LoeEstimate } from '@/types/assessment';

interface Props { loeEstimate: LoeEstimate }

export function LoeTimelineChart({ loeEstimate }: Props) {
  const data = loeEstimate.suggestedPhases.map((phase, i) => ({
    phase: `P${i + 1}`,
    name: phase.name,
    low: phase.durationWeeks.low,
    // Show range as base (low) + delta (high - low)
    range: phase.durationWeeks.high - phase.durationWeeks.low,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        barCategoryGap="30%"
        margin={{ top: 4, right: 8, bottom: 4, left: -8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="phase"
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `${v}w`}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false} tickLine={false}
          domain={[0, 'auto']}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            const phase = loeEstimate.suggestedPhases[parseInt(label.slice(1)) - 1];
            return (
              <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg px-3 py-2 text-xs shadow-lg">
                <p className="font-semibold mb-1">{phase?.name ?? label}</p>
                <p>{phase?.durationWeeks.low}–{phase?.durationWeeks.high} weeks</p>
                {phase?.description && (
                  <p className="text-[hsl(var(--muted-foreground))] mt-1 max-w-[200px] leading-relaxed">
                    {phase.description}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Legend
          iconType="square"
          iconSize={8}
          wrapperStyle={{ fontSize: 12 }}
          formatter={(value) => value === 'low' ? 'Min weeks' : 'Buffer'}
        />
        {/* Stacked: base (min) + range buffer */}
        <Bar dataKey="low" stackId="a" fill="hsl(245 70% 58%)" radius={[0, 0, 3, 3]} maxBarSize={36} name="low" />
        <Bar dataKey="range" stackId="a" fill="hsl(245 70% 80%)" radius={[3, 3, 0, 0]} maxBarSize={36} name="range" />
      </BarChart>
    </ResponsiveContainer>
  );
}
