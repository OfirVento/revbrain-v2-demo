import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useAssessmentStore } from '@/store';
import { ChartCard } from '@/components/layers/sales/ChartCard';
import { CapabilityTileGrid } from '@/components/layers/executive/CapabilityTileGrid';
import { TimeToValue } from '@/components/layers/executive/TimeToValue';

// ── Chart data (Vector Systems) ───────────────────────────────

const QUOTE_VOLUME_DATA = [
  { month: 'Nov', quotes: 312 },
  { month: 'Dec', quotes: 285 },
  { month: 'Jan', quotes: 342 },
  { month: 'Feb', quotes: 398 },
  { month: 'Mar', quotes: 487 },
  { month: 'Apr', quotes: 376 },
];

const REVENUE_PIE_DATA = [
  { name: 'SmartBytes', value: 47, revenue: '$69M' },
  { name: 'PowerSync Cloud', value: 16, revenue: '$24M' },
  { name: 'ClearMetrics Pro', value: 12, revenue: '$18M' },
  { name: 'SignalDesk Enterprise', value: 10, revenue: '$15M' },
  { name: 'Legacy Bundles', value: 10, revenue: '$15M' },
  { name: 'Other', value: 5, revenue: '$7M' },
];
const PIE_COLORS = [
  'hsl(245 70% 58%)',  // accent purple
  'hsl(210 65% 52%)',  // blue
  'hsl(185 55% 48%)',  // teal
  'hsl(165 50% 46%)',  // sea green
  'hsl(220 15% 62%)',  // muted slate
  'hsl(220 9% 75%)',   // light gray
];

const COMPLEXITY_AREA_DATA = [
  { area: 'Pricing', score: 36, fill: 'hsl(25 90% 55%)' },      // High (36-50) → orange
  { area: 'Configuration', score: 32, fill: 'hsl(45 95% 50%)' },// Medium (21-35) → yellow
  { area: 'Approvals', score: 24, fill: 'hsl(45 95% 50%)' },    // Medium → yellow
  { area: 'Custom Code', score: 22, fill: 'hsl(45 95% 50%)' },  // Medium → yellow
  { area: 'Products', score: 18, fill: 'hsl(152 55% 45%)' },    // Low (0-20) → green
  { area: 'Integrations', score: 14, fill: 'hsl(152 55% 45%)' },// Low → green
];

const GANTT_PHASES = [
  { name: 'P1 Active Quoting', start: 0, end: 4, risk: 'Medium', color: 'hsl(48 95% 55%)' },
  { name: 'P2 Renewals', start: 4, end: 9, risk: 'Medium-High', color: 'hsl(28 90% 58%)' },
  { name: 'P3 Data Migration', start: 9, end: 14, risk: 'High', color: 'hsl(8 80% 55%)' },
  { name: 'P4 Legacy Cleanup', start: 14, end: 18, risk: 'Variable', color: 'hsl(220 9% 60%)' },
];

// ── Tooltip components ────────────────────────────────────────

function BarTooltip({ active, payload, label }: {
  active?: boolean; payload?: Array<{ value: number }>; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-3 shadow-lg text-sm">
      <p className="font-semibold mb-1">{label}</p>
      <p className="text-[hsl(var(--muted-foreground))]">{payload[0].value.toLocaleString()} quotes</p>
    </div>
  );
}

function PieTooltip({ active, payload }: {
  active?: boolean; payload?: Array<{ name: string; value: number }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-3 shadow-lg text-sm">
      <p className="font-semibold">{payload[0].name}</p>
      <p className="text-[hsl(var(--muted-foreground))]">{payload[0].value}% of revenue</p>
    </div>
  );
}

function ComplexityTooltip({ active, payload, label }: {
  active?: boolean; payload?: Array<{ value: number }>; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-3 shadow-lg text-sm">
      <p className="font-semibold mb-1">{label}</p>
      <p className="text-[hsl(var(--muted-foreground))]">Complexity: {payload[0].value}/100</p>
    </div>
  );
}

// ── Narrative section component ───────────────────────────────

function NarrativeSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm leading-relaxed text-[hsl(var(--foreground))]">
      {children}
    </div>
  );
}

// ── Gantt chart component ─────────────────────────────────────

function GanttTimeline() {
  const totalWeeks = 18;
  return (
    <div className="space-y-2">
      {GANTT_PHASES.map((phase) => {
        const leftPct = (phase.start / totalWeeks) * 100;
        const widthPct = ((phase.end - phase.start) / totalWeeks) * 100;
        return (
          <div key={phase.name} className="flex items-center gap-3">
            <span className="text-xs text-[hsl(var(--muted-foreground))] w-36 shrink-0 truncate">
              {phase.name}
            </span>
            <div className="flex-1 relative h-7 bg-[hsl(var(--muted))]/40 rounded">
              <div
                className="absolute top-0 h-full rounded flex items-center px-2"
                style={{
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                  backgroundColor: phase.color,
                }}
              >
                <span className="text-xs font-medium text-white truncate">
                  Wk {phase.start}–{phase.end}
                </span>
              </div>
            </div>
            <span className="text-xs text-[hsl(var(--muted-foreground))] w-20 text-right shrink-0">
              {phase.risk}
            </span>
          </div>
        );
      })}
      {/* Week axis */}
      <div className="flex items-center gap-3 mt-1">
        <span className="w-36 shrink-0" />
        <div className="flex-1 flex justify-between px-1">
          {[0, 4, 9, 14, 18].map((w) => (
            <span key={w} className="text-[10px] text-[hsl(var(--muted-foreground))]">Wk {w}</span>
          ))}
        </div>
        <span className="w-20 shrink-0" />
      </div>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────

export function ExecutivePage() {
  const { payload } = useAssessmentStore();

  if (!payload) return null;

  const { meta, loeEstimate } = payload;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8 page-fade">

      {/* ── Page header ────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-semibold">CPQ to ARM Migration Readiness — {meta.orgName}</h1>
      </div>

      {/* ── Section 1: Current State ──────────────────────────── */}
      <div className="card">
        <h2 className="section-header mb-1">EXECUTIVE SUMMARY</h2>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">Org context and migration opportunity</p>

        <h3 className="text-base font-semibold mb-3">Current State</h3>
        <NarrativeSection>
          <p>
            Started <strong>5 years ago</strong>, Salesforce CPQ now serves <strong>84 active users</strong> generating{' '}
            <strong>2,100 quotes in the last 6 months</strong> — producing <strong>$147M in closed-won revenue</strong>{' '}
            across SmartBytes, Core Products, and Legacy Bundle lines. Configuration is{' '}
            <strong>moderate complexity (26/100)</strong> — driven by <strong>5 custom QCP scripts</strong>,{' '}
            <strong>4 plugin interfaces</strong>, and the <strong>2024 SmartBytes filter rule</strong>. With Salesforce
            sunsetting CPQ, <strong>AI Revenue Management</strong> is the modernization path: a{' '}
            <strong>14–18 week, 4-phase migration</strong>, <strong>87% mapping cleanly</strong> at 96% confidence.
          </p>
        </NarrativeSection>
      </div>

      {/* Chart 1: Quote Volume */}
      <ChartCard
        id="chart-quote-volume"
        title="QUOTE VOLUME — LAST 6 MONTHS"
        takeaway="10,240 quotes generated over 24 months · 8.5-day average cycle"
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={QUOTE_VOLUME_DATA} margin={{ top: 4, right: 4, bottom: 4, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<BarTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }} />
            <Bar dataKey="quotes" fill="hsl(245 70% 58%)" radius={[3, 3, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Section 2: Revenue Impact ────────────────────────── */}
      <div className="card">
        <h3 className="text-base font-semibold mb-3">Revenue Impact</h3>
        <NarrativeSection>
          <p>
            Over the last 24 months, CPQ has generated quotes tied to{' '}
            <strong>$147M in closed-won opportunity value</strong>. The 2024 SmartBytes product launch alone accounts
            for <strong>47% of recent quote volume</strong>, reflecting the platform's central role in the revenue
            motion.
          </p>
        </NarrativeSection>
      </div>

      {/* Chart 2: Revenue Pie */}
      <ChartCard
        id="chart-revenue-contribution"
        title="Revenue Contribution by Product Line"
        takeaway="SmartBytes (2024 launch) drives 47% of recent volume. PowerSync Cloud, ClearMetrics Pro, and SignalDesk Enterprise comprise the next 38%."
      >
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={REVENUE_PIE_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              label={({ name, value }: { name: string; value: number }) => `${name} ${value}%`}
              labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            >
              {REVENUE_PIE_DATA.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Section 3: Complexity Assessment ──────────────────── */}
      <div className="card">
        <h3 className="text-base font-semibold mb-3">Complexity Assessment</h3>
        <NarrativeSection>
          <p>
            The current implementation is moderately complex — <strong>26 on a 100-point scale, classified as Low
            tier</strong>. The architect-attention areas are concentrated: pricing logic, custom QCP scripts, and 4
            plugin interfaces. <strong>87% of current functionality maps cleanly to AI Revenue Management at 96%
            confidence.</strong>
          </p>
        </NarrativeSection>
      </div>

      {/* Chart 3: Complexity by Area */}
      <ChartCard
        id="chart-complexity-areas"
        title="Complexity by Area"
        takeaway="Pricing (36) and Configuration (32) are the primary complexity drivers — both concentrated in manageable QCP and plugin scope."
      >
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={COMPLEXITY_AREA_DATA}
            layout="vertical"
            margin={{ top: 4, right: 30, bottom: 4, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis
              type="number" domain={[0, 50]}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              type="category" dataKey="area" width={100}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<ComplexityTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }} />
            <Bar dataKey="score" radius={[0, 3, 3, 0]} maxBarSize={22}>
              {COMPLEXITY_AREA_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Section 4: Transition Opportunity ─────────────────── */}
      <div className="card">
        <h3 className="text-base font-semibold mb-3">Transition Opportunity</h3>
        <NarrativeSection>
          <p>
            Vector Systems gains immediate value: pricing transparency replaces <strong>5 invisible QCP scripts</strong> with
            a server-side engine finance can audit. The <strong>4 plugin interfaces</strong> collapse to declarative Flows
            your admins maintain natively. SmartBytes (<strong>47% of volume</strong>) gains AI-assisted quoting via
            AI Agent — capability not available in CPQ today. Phased deployment respects the March renewal peak:
            a <strong>14–18 week engagement</strong>, Phase 1 live in 3–4 weeks.
          </p>
        </NarrativeSection>
      </div>

      {/* Chart 4: Gantt Timeline */}
      <ChartCard
        id="chart-gantt-timeline"
        title="Migration Phase Timeline"
        takeaway="4 phases over 14–18 weeks. Phase 1 (Active Quoting) is the quick win — deployable in 3–4 weeks."
      >
        <GanttTimeline />
      </ChartCard>

      {/* ── Existing Build A sections ─────────────────────────── */}

      {/* ARM capabilities unlocked */}
      <CapabilityTileGrid />

      {/* Time-to-value */}
      <div>
        <h2 className="section-header mb-4">Time-to-value</h2>
        <TimeToValue loeEstimate={loeEstimate} capabilityCount={9} />
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[hsl(var(--border))]">
        
      </div>
    </div>
  );
}
