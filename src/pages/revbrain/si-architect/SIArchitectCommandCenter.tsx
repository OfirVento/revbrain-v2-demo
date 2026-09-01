// ── SI Architect Command Center ─────────────────────────────────────
// Forward-deployed SI Solution Architect operating view.
// Shows: Top Client Context, 5-Stage Implementation Progress, 70/30 Needs Attention & RevBrain Work.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ClientContextDrawer } from '../../../components/revbrain/ClientContextDrawer';
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Activity,
  Sparkles,
  Search,
  Layers,
  PenTool,
  Package,
  Rocket,
  CheckCircle2,
  Circle,
  AlertCircle,
  Zap,
  MessageSquare,
  FileText,
  Bot,
  RefreshCw,
  X,
  ArrowRight,
  Loader2,
  Check,
} from 'lucide-react';

/* ── 5-Stage Implementation Progress Data ───────────────────────────── */

interface StageItem {
  icon: LucideIcon;
  text: string;
  muted: boolean;
}

interface Stage {
  id: string;
  name: string;
  pct: number;
  color: string;
  trackColor: string;
  textColor: string;
  status: string;
  icon: LucideIcon;
  items: StageItem[];
  link: string;
}

const STAGES: Stage[] = [
  {
    id: 'assess',
    name: 'Assess',
    pct: 100,
    color: 'bg-emerald-500',
    trackColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    status: '6 revenue-critical workflows identified',
    icon: Search,
    items: [
      { icon: CheckCircle2, text: 'Org scanned: today, 10:42 AM', muted: false },
      { icon: Activity, text: '37 active CPQ users found', muted: false },
      { icon: Circle, text: '72% of CPQ usage analyzed', muted: false },
      { icon: MessageSquare, text: '7 client questions pending', muted: true },
    ],
    link: '/revbrain/migration/si-architect/assess',
  },
  {
    id: 'map',
    name: 'Map',
    pct: 55,
    color: 'bg-blue-500',
    trackColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    status: '87% of quoted revenue mapped',
    icon: Layers,
    items: [
      { icon: Zap, text: '6 revenue-critical workflows identified', muted: false },
      { icon: CheckCircle2, text: '87% of quoted revenue mapped', muted: false },
      { icon: Sparkles, text: 'Discount approval marked high priority', muted: false },
      { icon: AlertCircle, text: '3 validation gaps open', muted: true },
    ],
    link: '/revbrain/migration/si-architect/map',
  },
  {
    id: 'design',
    name: 'Design',
    pct: 35,
    color: 'bg-violet-500',
    trackColor: 'bg-violet-100',
    textColor: 'text-violet-700',
    status: 'Discount Approval design in progress',
    icon: PenTool,
    items: [
      { icon: Bot, text: '1 AI topic drafted', muted: false },
      { icon: Zap, text: '2 automation paths suggested', muted: false },
      { icon: AlertCircle, text: 'Finance escalation rule needs confirmation', muted: true },
      { icon: Activity, text: '88% design confidence', muted: false },
    ],
    link: '/revbrain/migration/si-architect/design',
  },
  {
    id: 'implementation',
    name: 'Implementation',
    pct: 15,
    color: 'bg-amber-500',
    trackColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    status: '8 implementation artifacts prepared',
    icon: Package,
    items: [
      { icon: FileText, text: '8 generated artifacts prepared', muted: false },
      { icon: Circle, text: '5 sandbox tests planned', muted: false },
      { icon: Circle, text: '0 deployed yet', muted: true },
      { icon: AlertCircle, text: 'Package waiting for validation', muted: true },
    ],
    link: '/revbrain/migration/si-architect/implementation',
  },
  {
    id: 'launch',
    name: 'Launch & Track',
    pct: 0,
    color: 'bg-slate-400',
    trackColor: 'bg-slate-100',
    textColor: 'text-slate-500',
    status: 'Waiting for validated implementation',
    icon: Rocket,
    items: [
      { icon: Circle, text: 'Operating model launch checklist not started', muted: true },
      { icon: Circle, text: 'Behavioral verification pending', muted: true },
      { icon: Circle, text: 'Outcome & performance tracking standby', muted: true },
      { icon: Circle, text: 'Initial release window TBD', muted: true },
    ],
    link: '/revbrain/migration/si-architect/implementation',
  },
];

const OVERALL_PCT = 42;

/* ── Needs Attention Data (Primary 70% Area) ────────────────────────── */

interface AttentionItem {
  id: string;
  title: string;
  context: string;
  impact: string;
  status: string;
  statusType: 'amber' | 'violet' | 'blue' | 'rose';
  link?: string;
}

const PRIMARY_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    title: 'Validate manual senior-manager approvals',
    context: 'Two senior managers manually review almost every approval despite a 98.4% approval rate.',
    impact: '11.4K approvals · ~4,560 hrs/yr · ≈$410K annual effort',
    status: 'Client validation needed',
    statusType: 'amber',
  },
  {
    id: 'att-2',
    title: 'Investigate Finance margin overrides',
    context: '23% of observed quotes fall below the documented 20% margin floor through manual overrides.',
    impact: '23% below policy · ≈$370K modeled annual margin exposure',
    status: 'Needs business validation',
    statusType: 'violet',
    link: '/revbrain/migration/si-architect/map',
  },
  {
    id: 'att-3',
    title: 'Investigate renewal uplift leakage',
    context: 'Contracted renewal uplift terms are not consistently applied across multi-year renewals.',
    impact: '4.6% of renewals affected · ≈$315K modeled annual revenue leakage',
    status: 'Needs RevOps validation',
    statusType: 'rose',
    link: '/revbrain/migration/si-architect/map',
  },
  {
    id: 'att-4',
    title: 'Investigate contracted pricing leakage',
    context: 'Account-specific pricing is not consistently applied when quotes are created outside the standard quoting path.',
    impact: '2.7% of quotes affected · ≈$240K modeled annual revenue leakage',
    status: 'Needs SalesOps validation',
    statusType: 'amber',
    link: '/revbrain/migration/si-architect/assess',
  },
  {
    id: 'att-5',
    title: 'Confirm strategic-account exception path',
    context: 'Strategic accounts appear to bypass the standard pricing and approval path in several observed cases.',
    impact: '≈$185K modeled annual revenue exposure',
    status: 'Waiting on RevOps',
    statusType: 'blue',
    link: '/revbrain/migration/si-architect/design',
  },
  {
    id: 'att-6',
    title: 'Validate quote repricing after approval',
    context: 'Approved quotes can be repriced without re-running the full approval path.',
    impact: '≈$160K modeled annual pricing exposure',
    status: 'Validation needed',
    statusType: 'rose',
    link: '/revbrain/migration/si-architect/implementation',
  },
];

const EXTRA_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-7',
    title: 'Resolve custom Apex pricing plugin fallback',
    context: 'calculatePrice() script triggers unhandled timeout when calculating bundle tier discounts.',
    impact: '150+ line item quotes affected · ~180 hrs/yr · ≈$16K annual effort',
    status: 'Architect review',
    statusType: 'amber',
    link: '/revbrain/migration/si-architect/assess',
  },
  {
    id: 'att-8',
    title: 'Audit multi-currency rounding discrepancies',
    context: 'Currency conversion rounding differences detected between opportunity and contracted line items.',
    impact: '320 cross-border invoices · ~120 hrs/yr · ≈$11K annual effort',
    status: 'Data validation',
    statusType: 'violet',
    link: '/revbrain/migration/si-architect/design',
  },
];

/* ── 15 Unique Live Workstream Tasks Pool for Continuous Simulation ─── */

interface WorkTask {
  id: string;
  name: string;
  description: string;
}

const ALL_REV_TASKS: WorkTask[] = [
  { id: 't1', name: 'Analyzing approval behavior', description: 'Evaluating 11.4K historical manager approvals across Q2C logs.' },
  { id: 't2', name: 'Compare Finance overrides', description: 'Cross-referencing approval matrix with 23% manual override records.' },
  { id: 't3', name: 'Generate validation scenarios', description: 'Synthesizing edge cases for discount thresholds >40%.' },
  { id: 't4', name: 'Analyze strategic exceptions', description: 'Mapping tier-1 customer custom margin floor bypasses.' },
  { id: 't5', name: 'Audit tiered pricing constraints', description: 'Validating bundle option dependencies against catalog schema.' },
  { id: 't6', name: 'Extract renewal discount distribution', description: 'Analyzing auto-renewal uplift variances across customer segments.' },
  { id: 't7', name: 'Verify contract amendment sync', description: 'Extracting co-terming rules for renewal uplifts.' },
  { id: 't8', name: 'Map billing schedule handoff', description: 'Checking revenue recognition trigger points on quote activation.' },
  { id: 't9', name: 'Audit multi-currency precision', description: 'Analyzing EUR & JPY rounding rules across contracted lines.' },
  { id: 't10', name: 'Inspect custom Apex pricing plugin', description: 'Profiling calculatePrice() script execution latency on 150+ line quotes.' },
  { id: 't11', name: 'Reconcile grandfathered SLA terms', description: 'Tracing legacy margin floor exemptions during contract renewals.' },
  { id: 't12', name: 'Cross-validate CPQ twin fields', description: 'Mapping custom quote line attribute pass-throughs into order assets.' },
  { id: 't13', name: 'Analyze approval routing bottlenecks', description: 'Identifying multi-tier escalation delays on quarter-end deals.' },
  { id: 't14', name: 'Simulate discount matrix thresholds', description: 'Testing boundary conditions on 35%-50% discount approval gates.' },
  { id: 't15', name: 'Audit volume discount schedules', description: 'Validating slab vs tiered pricing calculation pipelines.' },
];

const INITIAL_COMPLETED_TASKS = [
  'Identified 6 revenue-critical workflows',
  'Mapped 87% of quoted revenue',
  'Found 23% Finance override pattern',
];


/* ── Component ─────────────────────────────────────────────────────── */

export function SIArchitectCommandCenter() {
  const navigate = useNavigate();

  // Top Client Context drawer state
  const [clientContextOpen, setClientContextOpen] = useState(false);

  // Collapsible detailed bullets per stage (single toggle under Assess controls all)
  const [allStagesExpanded, setAllStagesExpanded] = useState(false);

  // Needs Attention expansion
  const [showAllAttention, setShowAllAttention] = useState(false);

  // Continuous Live Workstream Simulation over 15 distinct tasks
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>(INITIAL_COMPLETED_TASKS);
  const [showMoreCompleted, setShowMoreCompleted] = useState(false);

  // Auto-cycle live workstream smoothly every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTaskIndex((prevIdx) => {
        const nextIdx = (prevIdx + 1) % ALL_REV_TASKS.length;
        const justFinished = ALL_REV_TASKS[prevIdx];
        setCompletedTasks((prevDone) => {
          // Strictly deduplicate to prevent any repeating task
          const filtered = prevDone.filter((name) => name !== justFinished.name);
          return [justFinished.name, ...filtered];
        });
        return nextIdx;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  // Compute active task and 7 upcoming tasks in sequence
  const activeTask = ALL_REV_TASKS[currentTaskIndex];
  const upcomingQueue = Array.from({ length: 7 }, (_, i) =>
    ALL_REV_TASKS[(currentTaskIndex + 1 + i) % ALL_REV_TASKS.length]
  );
  const visibleCompleted = showMoreCompleted ? completedTasks : completedTasks.slice(0, 3);

  return (
    <div className="w-full flex flex-col relative">
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-4 pb-6 space-y-4 flex-1">

        {/* ─── 1. Top Account / Client Context Strip ─── */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] shadow-2xs">
          <span className="text-slate-500">
            Client: <strong className="text-slate-700 font-semibold">Vector Systems</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            Project: <strong className="text-slate-700 font-semibold">Salesforce CPQ → Revenue Cloud + AI Agents</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            Partner: <strong className="text-slate-700 font-semibold">SI Architect Workspace</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            Phase: <strong className="text-slate-700 font-semibold">Assessment &amp; AI workflow design</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-500">
            <RefreshCw className="w-3 h-3 text-slate-400" />
            Last sync: <strong className="text-slate-700 font-medium">12 min ago</strong>
          </span>

          <div className="ml-auto flex items-center">
            {/* Clickable Client Context Trigger */}
            <button
              onClick={() => setClientContextOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-all cursor-pointer group shadow-2xs active:scale-[0.98] opacity-75"
              title="Click to view open and blocking Client Context items"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 group-hover:animate-ping" />
              <span className="font-bold text-[11px]">Client Context · 7 open · 2 blocking</span>
              <ChevronRight className="w-3 h-3 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* ─── 2. Implementation Progress (Assess → Map → Design → Implementation → Launch & Track) ─── */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Implementation Progress</h2>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-500 font-medium">Overall</span>
              <span className="text-sm font-black font-mono text-violet-700 opacity-75">{OVERALL_PCT}%</span>
              <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-violet-600 opacity-75 rounded-full transition-all duration-700"
                  style={{ width: `${OVERALL_PCT}%` }}
                />
              </div>
            </div>
          </div>

          {/* 5-Stage Grid (Controlled globally by single toggle under Assess) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              const isExpanded = allStagesExpanded;

              return (
                <div
                  key={stage.id}
                  onClick={() => navigate(stage.link)}
                  className="p-3 sm:p-3.5 flex flex-col justify-between bg-slate-50/40 hover:bg-white transition-colors group cursor-pointer"
                >
                  <div className="space-y-1.5">
                    {/* Stage Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${stage.textColor} opacity-75 shrink-0`} />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{stage.name}</span>
                      </div>
                      <span className={`text-[11px] font-bold font-mono ${stage.textColor} opacity-75`}>
                        {stage.pct}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`h-1.5 rounded-full overflow-hidden ${stage.trackColor}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-700 opacity-75 ${stage.color}`}
                        style={{ width: `${Math.max(stage.pct, 2)}%` }}
                      />
                    </div>

                    {/* One Meaningful Status Sentence */}
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">
                      {stage.status}
                    </p>

                    {/* Collapsible Detailed Bullets */}
                    {isExpanded && (
                      <div className="pt-2 border-t border-slate-100 space-y-1.5 animate-[fadeIn_150ms_ease]">
                        {stage.items.map((item, i) => {
                          const ItemIcon = item.icon;
                          return (
                            <div key={i} className="flex items-start gap-1.5">
                              <ItemIcon
                                className={`w-3 h-3 shrink-0 mt-[2px] ${
                                  item.muted ? 'text-amber-500' : 'text-slate-400'
                                }`}
                              />
                              <span
                                className={`text-[10px] leading-snug ${
                                  item.muted ? 'text-amber-800 font-medium' : 'text-slate-600'
                                }`}
                              >
                                {item.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Stage Bottom Bar: Show details toggle only under Assess */}
                  {stage.id === 'assess' && (
                    <div className="pt-1.5 border-t border-slate-100/80 flex items-center justify-start mt-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setAllStagesExpanded(!allStagesExpanded)}
                        className="text-[10px] font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>{allStagesExpanded ? 'Show less' : 'Show details'}</span>
                        {allStagesExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 3. Main Working Area: Needs Attention (75%) / RevBrain Work (25%) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4.5">

          {/* ─── LEFT 75%: Needs Attention ─── */}
          <div className="lg:col-span-9 bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs space-y-3.5 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Needs Attention
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Highest-value items where human judgment, client context, validation, and transformation decisions matter most.
                  </p>
                </div>
              </div>

              {/* Attention Cards Grid (2 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2.5">
                {PRIMARY_ATTENTION_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'att-1') {
                        window.dispatchEvent(new CustomEvent('revbrain-open-command-center-chat'));
                      } else if (item.link) {
                        navigate(item.link);
                      }
                    }}
                    className="p-3.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/90 hover:border-violet-300 rounded-xl transition-all shadow-2xs space-y-2.5 flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-2">
                      {/* Title */}
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-900 transition-colors leading-snug">
                          {item.title}
                        </h4>
                      </div>

                      {/* Short context sentence */}
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {item.context}
                      </p>

                      {/* Quantified impact */}
                      <div>
                        <span className="text-[11px] font-mono font-medium text-slate-700 bg-white border border-slate-200/90 px-2.5 py-1 rounded-md shadow-2xs inline-block">
                          {item.impact}
                        </span>
                      </div>
                    </div>

                    {/* Current status + Investigate */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100/80">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 opacity-80 ${
                          item.statusType === 'amber'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : item.statusType === 'violet'
                            ? 'bg-violet-100 text-violet-900 border-violet-300'
                            : item.statusType === 'blue'
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}
                      >
                        {item.status}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.id === 'att-1') {
                            window.dispatchEvent(new CustomEvent('revbrain-open-command-center-chat'));
                          } else if (item.link) {
                            navigate(item.link!);
                          }
                        }}
                        className="text-[10.5px] font-bold text-violet-700 hover:text-violet-900 flex items-center gap-0.5 shrink-0 hover:underline cursor-pointer"
                      >
                        <span>Investigate</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded Extra Attention Items */}
              {showAllAttention && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 animate-[fadeIn_200ms_ease]">
                  {EXTRA_ATTENTION_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.link) navigate(item.link);
                      }}
                      className="p-3.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/90 hover:border-violet-300 rounded-xl transition-all shadow-2xs space-y-2.5 flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="space-y-2">
                        {/* Title */}
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-900 transition-colors leading-snug">
                            {item.title}
                          </h4>
                        </div>

                        {/* Short context sentence */}
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {item.context}
                        </p>

                        {/* Quantified impact */}
                        <div>
                          <span className="text-[11px] font-mono font-medium text-slate-700 bg-white border border-slate-200/90 px-2.5 py-1 rounded-md shadow-2xs inline-block">
                            {item.impact}
                          </span>
                        </div>
                      </div>

                      {/* Current status + Investigate */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100/80">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 opacity-80 ${
                            item.statusType === 'amber'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : item.statusType === 'violet'
                              ? 'bg-violet-100 text-violet-900 border-violet-300'
                              : item.statusType === 'blue'
                              ? 'bg-blue-100 text-blue-900 border-blue-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          {item.status}
                        </span>

                        {item.link && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(item.link!);
                            }}
                            className="text-[10.5px] font-bold text-violet-700 hover:text-violet-900 flex items-center gap-0.5 shrink-0 hover:underline cursor-pointer"
                          >
                            <span>Investigate</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* View All Toggle Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowAllAttention(!showAllAttention)}
                className="text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{showAllAttention ? 'Show fewer attention items' : `View all attention items (${PRIMARY_ATTENTION_ITEMS.length + EXTRA_ATTENTION_ITEMS.length})`}</span>
                {showAllAttention ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* ─── RIGHT 25%: RevBrain Work (Live Workstream) ─── */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-violet-600" />
                  <h3 className="text-sm font-bold text-slate-900">RevBrain Work</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                </div>
              </div>

              {/* 1. Live Active Workstream */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                    Active Task
                  </span>
                  <span className="text-[10px] font-mono text-violet-600 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin text-violet-600" />
                    Running
                  </span>
                </div>

                {/* Static Active Task Card (no jumping box, only inner text transitions in from bottom) */}
                <div className="bg-gradient-to-br from-violet-50/70 via-white to-violet-50/30 border border-violet-200/90 rounded-xl p-3 shadow-2xs space-y-1.5 relative">
                  <div className="flex items-center justify-between">
                    <div className="h-4.5 overflow-hidden flex-1 mr-2">
                      <p
                        key={`title-${activeTask.id}`}
                        className="text-xs font-bold text-slate-900 truncate animate-slide-up"
                      >
                        {activeTask.name}
                      </p>
                    </div>
                    <span className="text-[9.5px] font-mono font-bold text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded border border-violet-200 shrink-0 opacity-75">
                      In progress
                    </span>
                  </div>

                  <div className="min-h-[30px] overflow-hidden">
                    <p
                      key={`desc-${activeTask.id}`}
                      className="text-[10.5px] text-slate-600 leading-snug animate-slide-up"
                    >
                      {activeTask.description}
                    </p>
                  </div>

                  {/* Moving Dashed Line (Soft faded color, constant subtle transparency, no harsh pulse) */}
                  <div className="w-full h-1.5 flex items-center overflow-hidden mt-1.5 opacity-30">
                    <svg className="w-full h-1.5" preserveAspectRatio="none">
                      <line
                        x1="0"
                        y1="3"
                        x2="100%"
                        y2="3"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        strokeDasharray="14 10"
                        strokeLinecap="round"
                        className="animate-moving-dash"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. Upcoming Tasks */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                    Upcoming Tasks
                  </span>
                </div>

                <div className="space-y-1.5">
                  {upcomingQueue.map((task, idx) => {
                    const isNewAtBottom = idx === upcomingQueue.length - 1;
                    return (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between gap-2 px-2.5 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 rounded-lg text-slate-700 text-xs shadow-2xs transition-all duration-300 ${
                          isNewAtBottom ? 'animate-bottom-entry' : ''
                        }`}
                      >
                        <span className="text-[11px] font-medium text-slate-800 truncate flex-1">
                          {task.name}
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Recently Completed */}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  Recently Completed
                </span>
                {completedTasks.length > 3 && (
                  <button
                    onClick={() => setShowMoreCompleted(!showMoreCompleted)}
                    className="text-[10px] font-bold text-violet-700 hover:text-violet-900 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>{showMoreCompleted ? 'Show less' : `Show more (${completedTasks.length})`}</span>
                    {showMoreCompleted ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                )}
              </div>

              <div className="space-y-1">
                {visibleCompleted.map((doneText, idx) => (
                  <div
                    key={`${doneText}-${idx}`}
                    className={`flex items-start gap-1.5 text-[10.5px] text-slate-600 leading-snug py-0.5 ${
                      idx === 0 ? 'animate-slide-down' : ''
                    }`}
                  >
                    <Check className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="truncate">{doneText}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ─── 4. Client Context Right-Side Slide-Over Drawer ─── */}
      <ClientContextDrawer
        isOpen={clientContextOpen}
        onClose={() => setClientContextOpen(false)}
      />
    </div>
  );
}
