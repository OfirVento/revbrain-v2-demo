// ── SI Architect Command Center ─────────────────────────────────────
// Forward-deployed SI Solution Architect operating view.
// Shows: Top Client Context, 5-Stage Implementation Progress, 70/30 Needs Attention & RevBrain Work.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
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
  stats?: string;
  highlightPill?: string;
  context: string;
  status: string;
  statusType: 'amber' | 'violet' | 'blue' | 'rose';
  link?: string;
}

const PRIMARY_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    title: 'Validate manual senior-manager approvals',
    stats: '11.4K approvals · 24 min avg · 98.4% approved',
    highlightPill: 'Potential high-ROI AI workflow',
    context: 'Confirm why two senior managers still review these manually.',
    status: 'Client validation needed',
    statusType: 'amber',
    link: '/revbrain/migration/si-architect/assess',
  },
  {
    id: 'att-2',
    title: 'Investigate Finance escalation overrides',
    stats: '23% manually overridden',
    context: 'Observed behavior differs from the documented Finance escalation policy.',
    status: 'Needs business context',
    statusType: 'violet',
    link: '/revbrain/migration/si-architect/map',
  },
  {
    id: 'att-3',
    title: 'Confirm strategic-account policy',
    context: 'Current system behavior suggests strategic accounts follow a different exception path.',
    status: 'Waiting on RevOps',
    statusType: 'blue',
    link: '/revbrain/migration/si-architect/design',
  },
  {
    id: 'att-4',
    title: 'Validate quote repricing after approval',
    context: 'Potential regression risk before implementation.',
    status: 'Validation needed',
    statusType: 'rose',
    link: '/revbrain/migration/si-architect/implementation',
  },
];

const EXTRA_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-5',
    title: 'Resolve custom Apex pricing plugin fallback',
    stats: '150+ line item quotes affected',
    context: 'calculatePrice() script triggers unhandled timeout when calculating bundle tier discounts.',
    status: 'Architect review',
    statusType: 'amber',
    link: '/revbrain/migration/si-architect/assess',
  },
  {
    id: 'att-6',
    title: 'Confirm grandfathered SLA terms on renewals',
    context: 'Legacy contracted accounts bypass standard margin floor rules during automated uplift.',
    status: 'Waiting on SalesOps',
    statusType: 'blue',
    link: '/revbrain/migration/si-architect/map',
  },
  {
    id: 'att-7',
    title: 'Audit multi-currency rounding discrepancies',
    stats: 'EUR & JPY conversion variations',
    context: 'Currency conversion rounding differences detected between opportunity and contracted line items.',
    status: 'Data validation',
    statusType: 'violet',
    link: '/revbrain/migration/si-architect/design',
  },
];

/* ── Live Workstream Tasks Pool for Demo Simulation ─────────────────── */

interface WorkTask {
  id: string;
  name: string;
  description: string;
}

const INITIAL_UPCOMING_TASKS: WorkTask[] = [
  { id: 'task-1', name: 'Compare Finance overrides', description: 'Cross-referencing approval matrix with 23% manual override records.' },
  { id: 'task-2', name: 'Generate validation scenarios', description: 'Synthesizing edge cases for discount thresholds >40%.' },
  { id: 'task-3', name: 'Analyze strategic exceptions', description: 'Mapping tier-1 customer custom margin floor bypasses.' },
];

const TASK_ROTATION_POOL: WorkTask[] = [
  { id: 'task-4', name: 'Audit tiered pricing constraints', description: 'Validating bundle option dependencies against catalog schema.' },
  { id: 'task-5', name: 'Synthesize executive business case', description: 'Calculating manual hours saved across senior manager approvals.' },
  { id: 'task-6', name: 'Verify contract amendment sync', description: 'Extracting co-terming rules for renewal uplifts.' },
  { id: 'task-7', name: 'Map billing schedule handoff', description: 'Checking revenue recognition trigger points on quote activation.' },
];

const INITIAL_COMPLETED_TASKS = [
  'Identified 6 revenue-critical workflows',
  'Mapped 87% of quoted revenue',
  'Found 23% Finance override pattern',
];

/* ── Client Context Drawer Items ────────────────────────────────────── */

const CLIENT_CONTEXT_ITEMS = [
  { id: 'c1', title: 'Two senior managers manual sign-off rationale', area: 'Approvals', blocking: true },
  { id: 'c2', title: 'Finance margin risk threshold documented vs reality', area: 'Pricing', blocking: true },
  { id: 'c3', title: 'Strategic account exception rule path', area: 'Accounts', blocking: false },
  { id: 'c4', title: 'Repricing behavior post-approval lock', area: 'Quotes', blocking: false },
  { id: 'c5', title: 'Grandfathered multi-year contract renewals', area: 'Renewals', blocking: false },
  { id: 'c6', title: 'EMEA multi-currency rounding rules', area: 'Billing', blocking: false },
  { id: 'c7', title: 'Deal Desk SLA on urgent quarter-end quotes', area: 'Operations', blocking: false },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function SIArchitectCommandCenter() {
  const navigate = useNavigate();

  // Top Client Context drawer state
  const [clientContextOpen, setClientContextOpen] = useState(false);

  // Collapsible detailed bullets per stage (all collapsed by default)
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});

  // Needs Attention expansion
  const [showAllAttention, setShowAllAttention] = useState(false);

  // Continuous Live Workstream Simulation
  const [activeTask, setActiveTask] = useState<WorkTask>({
    id: 'task-active',
    name: 'Analyzing approval behavior',
    description: 'Evaluating 11.4K historical manager approvals across Q2C logs.',
  });
  const [upcomingQueue, setUpcomingQueue] = useState<WorkTask[]>(INITIAL_UPCOMING_TASKS);
  const [completedTasks, setCompletedTasks] = useState<string[]>(INITIAL_COMPLETED_TASKS);
  const [poolIndex, setPoolIndex] = useState(0);

  // Auto-cycle live workstream every 6.5s for realistic forward-deployed feel
  useEffect(() => {
    const timer = setInterval(() => {
      setUpcomingQueue((prevQueue) => {
        if (prevQueue.length === 0) return prevQueue;

        const nextActive = prevQueue[0];
        const remainingQueue = prevQueue.slice(1);

        // Move currently active to completed
        setCompletedTasks((prevDone) => [
          activeTask.name,
          ...prevDone.slice(0, 2),
        ]);

        // Set next active
        setActiveTask(nextActive);

        // Pull new task from pool into queue end
        const nextPoolTask = TASK_ROTATION_POOL[poolIndex % TASK_ROTATION_POOL.length];
        setPoolIndex((idx) => idx + 1);

        return [...remainingQueue, nextPoolTask];
      });
    }, 6500);

    return () => clearInterval(timer);
  }, [activeTask, poolIndex]);

  const toggleStage = (id: string) => {
    setExpandedStages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full flex flex-col relative">
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-4 pb-6 space-y-4 flex-1">

        {/* ─── 1. Top Account / Client Context Strip ─── */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] shadow-2xs">
          <span className="text-slate-500">
            Client: <strong className="text-slate-900 font-semibold">Vector Systems</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            Project: <strong className="text-slate-900 font-semibold">Salesforce CPQ → Revenue Cloud + AI Agent</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            Partner: <strong className="text-slate-900 font-semibold">SI Architect Workspace</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            Phase: <strong className="text-slate-900 font-semibold">Implementation assessment &amp; operating model design</strong>
          </span>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1 text-slate-500">
              <RefreshCw className="w-3 h-3 text-slate-400" />
              Last sync: <strong className="text-slate-700 font-medium">12 min ago</strong>
            </span>

            {/* Clickable Client Context Trigger */}
            <button
              onClick={() => setClientContextOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-all cursor-pointer group shadow-2xs active:scale-[0.98]"
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
              <span className="text-[11px] font-mono text-slate-400">Assess → Map → Design → Implementation → Launch &amp; Track</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-500 font-medium">Overall Progress</span>
              <span className="text-sm font-black font-mono text-violet-700">{OVERALL_PCT}%</span>
              <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-violet-600 rounded-full transition-all duration-700"
                  style={{ width: `${OVERALL_PCT}%` }}
                />
              </div>
            </div>
          </div>

          {/* 5-Stage Grid (Collapsed by default) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              const isExpanded = !!expandedStages[stage.id];

              return (
                <div key={stage.id} className="p-3 sm:p-3.5 flex flex-col justify-between bg-slate-50/40 hover:bg-white transition-colors group">
                  <div className="space-y-1.5">
                    {/* Stage Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${stage.textColor} shrink-0`} />
                        <span className="text-xs font-bold text-slate-900">{stage.name}</span>
                      </div>
                      <span className={`text-[11px] font-bold font-mono ${stage.textColor}`}>
                        {stage.pct}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`h-1.5 rounded-full overflow-hidden ${stage.trackColor}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${stage.color}`}
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

                  {/* Stage Bottom Bar: Show more toggle & direct link */}
                  <div className="pt-1.5 border-t border-slate-100/80 flex items-center justify-between mt-2">
                    <button
                      onClick={() => toggleStage(stage.id)}
                      className="text-[10px] font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <button
                      onClick={() => navigate(stage.link)}
                      className="text-[10px] font-bold text-violet-700 hover:text-violet-900 flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      <span>Open</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 3. Main Working Area: 70% Needs Attention / 30% RevBrain Work ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4.5">

          {/* ─── LEFT 70%: Needs Attention ─── */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs space-y-3.5 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Needs Attention
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Highest-value items where human judgment, client context, validation, and transformation decisions matter most.
                  </p>
                </div>
              </div>

              {/* Attention Cards List */}
              <div className="space-y-2.5 pt-2.5">
                {PRIMARY_ATTENTION_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/90 hover:border-violet-300 rounded-xl transition-all shadow-2xs space-y-2 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      {/* Status badge */}
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border self-start sm:self-auto shrink-0 ${
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
                    </div>

                    {/* Stats strip / Pills */}
                    {(item.stats || item.highlightPill) && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {item.stats && (
                          <span className="text-[10.5px] font-mono font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                            {item.stats}
                          </span>
                        )}
                        {item.highlightPill && (
                          <span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1 shadow-2xs">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            {item.highlightPill}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Short context */}
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        {item.context}
                      </p>

                      {item.link && (
                        <button
                          onClick={() => navigate(item.link!)}
                          className="text-[10px] font-bold text-violet-700 hover:text-violet-900 flex items-center gap-0.5 shrink-0 hover:underline cursor-pointer"
                        >
                          <span>Investigate</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Expanded Extra Attention Items */}
                {showAllAttention && (
                  <div className="space-y-2.5 pt-1 animate-[fadeIn_200ms_ease]">
                    {EXTRA_ATTENTION_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/90 hover:border-violet-300 rounded-xl transition-all shadow-2xs space-y-2 group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                              {item.title}
                            </h4>
                          </div>

                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border self-start sm:self-auto shrink-0 ${
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
                        </div>

                        {item.stats && (
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <span className="text-[10.5px] font-mono font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                              {item.stats}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-2 pt-0.5">
                          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                            {item.context}
                          </p>

                          {item.link && (
                            <button
                              onClick={() => navigate(item.link!)}
                              className="text-[10px] font-bold text-violet-700 hover:text-violet-900 flex items-center gap-0.5 shrink-0 hover:underline cursor-pointer"
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
            </div>

            {/* View All Toggle Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowAllAttention(!showAllAttention)}
                className="text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{showAllAttention ? 'Show fewer attention items' : 'View all attention items (7)'}</span>
                {showAllAttention ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* ─── RIGHT 30%: RevBrain Work (Live Workstream) ─── */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-violet-600" />
                  <h3 className="text-sm font-bold text-slate-900">RevBrain Work</h3>
                </div>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
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

                {/* Active Task Card */}
                <div className="bg-gradient-to-br from-violet-50/70 via-white to-violet-50/30 border border-violet-200/90 rounded-xl p-3 shadow-2xs space-y-1.5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">
                      {activeTask.name}
                    </p>
                    <span className="text-[9.5px] font-mono font-bold text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded border border-violet-200">
                      In progress
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-snug">
                    {activeTask.description}
                  </p>
                  <div className="w-full bg-violet-100 h-1 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-violet-600 rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              </div>

              {/* 2. Upcoming Sequence */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  Upcoming Sequence
                </span>

                <div className="space-y-1.5">
                  {upcomingQueue.map((task, idx) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200/70 rounded-lg text-slate-700 text-xs shadow-2xs"
                    >
                      <span className="w-4 h-4 rounded-full bg-white border border-slate-200 text-slate-500 font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-medium text-slate-800 truncate flex-1">
                        {task.name}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Recently Completed */}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                Recently Completed
              </span>

              <div className="space-y-1">
                {completedTasks.map((doneText, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[10.5px] text-slate-600 leading-snug">
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
      {clientContextOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-[fadeIn_150ms_ease]">
          {/* Backdrop */}
          <div
            onClick={() => setClientContextOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-[1px] transition-opacity"
          />

          {/* Slide-in panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-50 flex flex-col border-l border-slate-200 animate-[slideLeft_200ms_ease]">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Client Context</span>
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    7 Open · 2 Blocking
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Captured business exceptions, human policies &amp; open stakeholder questions.
                </p>
              </div>
              <button
                onClick={() => setClientContextOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="p-3 bg-violet-50/60 border border-violet-200 rounded-xl text-xs text-violet-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                  Client Context Overview
                </p>
                <p className="text-[11px] text-violet-700 leading-snug">
                  RevBrain automatically flags where human insight, historical client policies, and approval rationale resolve implementation ambiguity.
                </p>
              </div>

              {/* Context items list */}
              <div className="space-y-2 pt-1">
                <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Open Client Inquiries ({CLIENT_CONTEXT_ITEMS.length})
                </span>

                {CLIENT_CONTEXT_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all ${
                      item.blocking
                        ? 'bg-rose-50/60 border-rose-200/90 hover:border-rose-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    } space-y-1`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase">
                        {item.area}
                      </span>
                      {item.blocking && (
                        <span className="text-[9.5px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.2 rounded border border-rose-300">
                          Blocking
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Full panel experience to be defined
              </span>
              <button
                onClick={() => setClientContextOpen(false)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
