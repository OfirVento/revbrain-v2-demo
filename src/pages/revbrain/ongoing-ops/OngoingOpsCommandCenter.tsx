// ── Ongoing Ops — Command Center ────────────────────────────────────
// Post-migration live operations workspace. Shows RevBrain agents and
// automations actively managing the Bid O2C revenue process.
// Section order: Header → Lifecycle → Activity → Human Actions →
// Improvements → Recent Changes.

import { useState, Fragment } from 'react';
import { clsx } from 'clsx';
import type { LucideIcon } from 'lucide-react';
import {
  Target,
  FileText,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRightCircle,
  ChevronRight,
  Bot,
  Zap,
  Activity,
  AlertCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

/* ── Types ──────────────────────────────────────────────────────────── */

interface LifecycleStage {
  id: string;
  label: string;
  volume: string;
  status: string;
  exceptions: number;
  icon: LucideIcon;
}

interface ActivityItem {
  type: 'agent' | 'automation';
  name: string;
  action: string;
  detail?: string;
  time: string;
  resolution: string;
  resolutionType: 'success' | 'escalated' | 'pending';
  stage: string;
}

interface HumanAction {
  title: string;
  description: string;
  team: string;
  record: string;
  cta: string;
  stage: string;
}

interface ImprovementCard {
  title: string;
  before: string;
  now: string;
  metric: string;
}

interface RecentChange {
  title: string;
  description: string;
  timeAgo: string;
}

/* ── Data ───────────────────────────────────────────────────────────── */

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'intake',
    label: 'Opportunity Intake',
    volume: '18 active opportunities',
    status: 'RevBrain monitoring',
    exceptions: 0,
    icon: Target,
  },
  {
    id: 'quote',
    label: 'Quote & Pricing',
    volume: '11 quotes in progress',
    status: '8 automated checks today',
    exceptions: 0,
    icon: FileText,
  },
  {
    id: 'approval',
    label: 'Approval',
    volume: '4 approvals active',
    status: '2 human decisions needed',
    exceptions: 2,
    icon: ShieldCheck,
  },
  {
    id: 'decision',
    label: 'Customer Decision',
    volume: '9 awaiting result',
    status: '3 approaching SLA',
    exceptions: 3,
    icon: Clock,
  },
  {
    id: 'close',
    label: 'Close',
    volume: '6 completed this week',
    status: '1 exception',
    exceptions: 1,
    icon: CheckCircle2,
  },
  {
    id: 'erp',
    label: 'ERP Handoff',
    volume: '5 successful',
    status: '1 needs review',
    exceptions: 1,
    icon: ArrowRightCircle,
  },
];

const ACTIVITY_FEED: ActivityItem[] = [
  {
    type: 'agent',
    name: 'Quote Health Agent',
    action: 'Detected missing pricing context on Bid #1048',
    time: '2 min ago',
    resolution: 'Resolved automatically',
    resolutionType: 'success',
    stage: 'quote',
  },
  {
    type: 'automation',
    name: 'Approval Follow-Up Automation',
    action: 'Manager approval was idle for 18 hours',
    detail: 'Escalated with quote + margin context',
    time: '6 min ago',
    resolution: 'Escalated to VP Sales',
    resolutionType: 'escalated',
    stage: 'approval',
  },
  {
    type: 'agent',
    name: 'Pricing Validation Agent',
    action: 'Validated pricing rules and margin threshold for Quote Q-2841',
    time: '11 min ago',
    resolution: 'No issue found',
    resolutionType: 'success',
    stage: 'quote',
  },
  {
    type: 'automation',
    name: 'Awaiting Results Monitor',
    action: 'Detected 3 opportunities approaching stale-stage SLA',
    time: '18 min ago',
    resolution: 'Human review requested',
    resolutionType: 'pending',
    stage: 'decision',
  },
  {
    type: 'agent',
    name: 'Quote / Opportunity Consistency Agent',
    action: 'Detected inconsistent primary-quote state',
    time: '31 min ago',
    resolution: 'Correction prepared',
    resolutionType: 'success',
    stage: 'close',
  },
  {
    type: 'automation',
    name: 'ERP Handoff Automation',
    action: 'Validated closed-won opportunity before ERP handoff',
    time: '42 min ago',
    resolution: 'Completed',
    resolutionType: 'success',
    stage: 'erp',
  },
];

const HUMAN_ACTIONS: HumanAction[] = [
  {
    title: 'High margin-risk discount',
    description:
      'RevBrain prepared pricing history, margin impact and comparable deals.',
    team: 'Finance',
    record: 'Quote Q-2844',
    cta: 'Review context',
    stage: 'approval',
  },
  {
    title: '3 stale Awaiting Order Results',
    description:
      'RevBrain identified likely owners and recommended resolution paths.',
    team: 'Sales Ops',
    record: '3 opportunities',
    cta: 'Review opportunities',
    stage: 'decision',
  },
  {
    title: 'Strategic-account pricing exception',
    description:
      'Agent recommendation ready with comparable deals and account history.',
    team: 'Deal Desk',
    record: 'Quote Q-2829',
    cta: 'Review recommendation',
    stage: 'approval',
  },
  {
    title: 'ERP handoff exception',
    description: 'Missing external confirmation for closed-won opportunity.',
    team: 'Operations',
    record: 'BID-1097',
    cta: 'Review handoff',
    stage: 'erp',
  },
];

const IMPROVEMENTS: ImprovementCard[] = [
  {
    title: 'Approval preparation',
    before: '~25 min manual research',
    now: '~4 min human review',
    metric: '84% less effort',
  },
  {
    title: 'Approval follow-up',
    before: 'Manual Slack/email chasing',
    now: 'Automated monitoring + escalation',
    metric: '70% faster resolution',
  },
  {
    title: 'Quote issue investigation',
    before: '~30 min admin investigation',
    now: '~5 min guided resolution',
    metric: '83% less admin effort',
  },
  {
    title: 'Stale opportunity monitoring',
    before: 'Manual / no SLA',
    now: 'Continuously monitored',
    metric: '80 → 6 requiring attention',
  },
];

const RECENT_CHANGES: RecentChange[] = [
  {
    title: 'Added Awaiting Order Results SLA monitoring',
    description: 'Reduced stale opportunity exposure',
    timeAgo: '3 days ago',
  },
  {
    title: 'Improved approval-context package',
    description: 'Managers now receive margin + pricing evidence',
    timeAgo: '8 days ago',
  },
  {
    title: 'Standardized quote / opportunity state validation',
    description: 'Removed recurring mismatch investigation',
    timeAgo: '12 days ago',
  },
  {
    title: 'Improved approval rationale capture',
    description: 'Decisions now feed the Knowledge Engine',
    timeAgo: '18 days ago',
  },
];

/* ── Component ──────────────────────────────────────────────────────── */

export function OngoingOpsCommandCenter() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const filteredActivity = selectedStage
    ? ACTIVITY_FEED.filter((item) => item.stage === selectedStage)
    : ACTIVITY_FEED;

  const filteredActions = selectedStage
    ? HUMAN_ACTIONS.filter((item) => item.stage === selectedStage)
    : HUMAN_ACTIONS;

  const selectedLabel = LIFECYCLE_STAGES.find(
    (s) => s.id === selectedStage,
  )?.label;

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-4 pb-6 space-y-5 flex-1">
        {/* ─── A. Header ─── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[hsl(var(--foreground))]">
              Ongoing Operations
            </h1>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              RevBrain is monitoring and improving your live revenue operations.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200/60 rounded-full shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-700">
              Operations healthy
            </span>
          </div>
        </div>

        {/* ─── B. Live Process Overview ─── */}
        <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[hsl(var(--accent))]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Live Process Overview
              </span>
            </div>
            {selectedStage ? (
              <button
                onClick={() => setSelectedStage(null)}
                className="text-[10px] font-semibold text-[hsl(var(--accent))] hover:underline flex items-center gap-0.5"
              >
                ← All Operations
              </button>
            ) : (
              <span className="text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
                All Operations
              </span>
            )}
          </div>

          <div className="flex items-stretch">
            {LIFECYCLE_STAGES.map((stage, i) => {
              const isSelected = selectedStage === stage.id;
              const Icon = stage.icon;
              return (
                <Fragment key={stage.id}>
                  <button
                    onClick={() =>
                      setSelectedStage(isSelected ? null : stage.id)
                    }
                    className={clsx(
                      'flex-1 p-2.5 rounded-lg border transition-all text-left',
                      isSelected
                        ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/[0.04] ring-1 ring-[hsl(var(--accent))]/15 shadow-sm'
                        : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/50 hover:border-[hsl(var(--foreground))]/20',
                    )}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon
                        className={clsx(
                          'w-3.5 h-3.5 shrink-0',
                          isSelected
                            ? 'text-[hsl(var(--accent))]'
                            : 'text-[hsl(var(--muted-foreground))]',
                        )}
                      />
                      <span
                        className={clsx(
                          'text-[10px] font-bold truncate',
                          isSelected
                            ? 'text-[hsl(var(--accent))]'
                            : 'text-[hsl(var(--foreground))]',
                        )}
                      >
                        {stage.label}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-[hsl(var(--foreground))] leading-snug">
                      {stage.volume}
                    </p>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug mt-0.5">
                      {stage.status}
                    </p>
                    {stage.exceptions > 0 && (
                      <div className="flex items-center gap-1 mt-1.5 pt-1.5 border-t border-[hsl(var(--border))]/50">
                        <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="text-[9px] font-semibold text-amber-700">
                          {stage.exceptions}{' '}
                          {stage.exceptions === 1 ? 'exception' : 'exceptions'}
                        </span>
                      </div>
                    )}
                  </button>
                  {i < LIFECYCLE_STAGES.length - 1 && (
                    <div className="flex items-center px-1 shrink-0">
                      <ChevronRight className="w-3 h-3 text-[hsl(var(--border))]" />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </section>

        {/* ─── C. Live RevBrain Activity ─── */}
        <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-[hsl(var(--border))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[hsl(var(--accent))]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Live RevBrain Activity
              </h3>
              <span className="relative flex h-2 w-2 ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            {selectedStage && (
              <span className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] px-2 py-0.5 rounded">
                Filtered: {selectedLabel}
              </span>
            )}
          </div>

          <div className="divide-y divide-[hsl(var(--border))]/50">
            {filteredActivity.length > 0 ? (
              filteredActivity.map((item, i) => {
                const isAgent = item.type === 'agent';
                return (
                  <div
                    key={i}
                    className="px-5 py-3 flex items-start gap-3 hover:bg-[hsl(var(--muted))]/30 transition-colors"
                  >
                    {/* Type icon */}
                    <div
                      className={clsx(
                        'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                        isAgent ? 'bg-violet-100' : 'bg-blue-100',
                      )}
                    >
                      {isAgent ? (
                        <Bot className="w-3.5 h-3.5 text-violet-600" />
                      ) : (
                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs font-bold text-[hsl(var(--foreground))]">
                          {item.name}
                        </span>
                        <span
                          className={clsx(
                            'px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider border',
                            isAgent
                              ? 'bg-violet-100 text-violet-700 border-violet-200'
                              : 'bg-blue-100 text-blue-700 border-blue-200',
                          )}
                        >
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-[hsl(var(--foreground))] leading-snug">
                        {item.action}
                      </p>
                      {item.detail && (
                        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-snug">
                          {item.detail}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                          {item.time}
                        </span>
                        <span className="text-[hsl(var(--border))]">·</span>
                        <span
                          className={clsx(
                            'text-[10px] font-semibold flex items-center gap-1',
                            item.resolutionType === 'success'
                              ? 'text-emerald-600'
                              : 'text-amber-600',
                          )}
                        >
                          {item.resolutionType === 'success' && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {item.resolutionType === 'escalated' && (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {item.resolutionType === 'pending' && (
                            <Clock className="w-3 h-3" />
                          )}
                          {item.resolution}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-5 py-8 text-center">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  No recent activity for this stage.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── D. Needs Your Attention ─── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Needs Your Attention
            </h3>
            {selectedStage && (
              <span className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] px-2 py-0.5 rounded ml-1">
                Filtered: {selectedLabel}
              </span>
            )}
          </div>

          {filteredActions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredActions.map((action, i) => (
                <div
                  key={i}
                  className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-3.5 flex flex-col shadow-sm hover:shadow-md hover:border-[hsl(var(--accent))]/20 transition-all"
                >
                  <p className="text-xs font-bold text-[hsl(var(--foreground))] mb-1.5">
                    {action.title}
                  </p>
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug flex-1">
                    {action.description}
                  </p>
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[hsl(var(--border))]/50">
                    <span className="text-[9px] font-semibold text-[hsl(var(--muted-foreground))]">
                      {action.team} · {action.record}
                    </span>
                    <button className="text-[10px] font-bold text-[hsl(var(--accent))] hover:underline flex items-center gap-0.5 shrink-0">
                      {action.cta}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 text-center">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                No actions needed for this stage right now.
              </p>
            </div>
          )}
        </section>

        {/* ─── E. Improvements Since Migration ─── */}
        <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-[hsl(var(--border))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Improvements since migration
              </h3>
            </div>
            <span className="text-[9px] font-semibold text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] px-2 py-0.5 rounded">
              vs. pre-migration manual baseline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-[hsl(var(--border))]/50">
            {IMPROVEMENTS.map((item, i) => (
              <div key={i} className="p-4 space-y-2.5">
                <p className="text-xs font-bold text-[hsl(var(--foreground))]">
                  {item.title}
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug">
                      Before: {item.before}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span className="text-[10px] text-[hsl(var(--foreground))] font-medium leading-snug">
                      Now: {item.now}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-[hsl(var(--border))]/50">
                  <span className="text-xs font-bold text-emerald-600">
                    {item.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── F. Recent Improvements Delivered by RevBrain ─── */}
        <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-[hsl(var(--border))]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(var(--accent))]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Recent improvements delivered by RevBrain
              </h3>
            </div>
          </div>

          <div className="px-5">
            {RECENT_CHANGES.map((change, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-[hsl(var(--border))]/50 last:border-0"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center pt-1.5 shrink-0">
                  <div
                    className={clsx(
                      'w-2 h-2 rounded-full',
                      i === 0
                        ? 'bg-[hsl(var(--accent))]'
                        : 'bg-[hsl(var(--border))]',
                    )}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[hsl(var(--foreground))] leading-snug">
                    {change.title}
                  </p>
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug mt-0.5">
                    {change.description}
                  </p>
                </div>

                {/* Time */}
                <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-medium shrink-0 mt-0.5">
                  {change.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
