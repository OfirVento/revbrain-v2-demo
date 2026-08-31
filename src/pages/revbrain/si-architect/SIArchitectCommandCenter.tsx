// ── SI Architect Command Center ─────────────────────────────────────
// Live project control page for the SI Architect migration workspace.
// Shows: account context, unified migration progress, and live activity.

import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {

  ChevronRight,
  Activity,
  Sparkles,
  Search,
  Layers,
  PenTool,
  Package,
  Rocket,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  Zap,
  MessageSquare,
  FileText,
  Bot,
  RefreshCw,
} from 'lucide-react';

/* ── Unified stage data ────────────────────────────────────────────── */

interface StageItem {
  icon: LucideIcon;
  text: string;
  muted: boolean;
}

interface Stage {
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
    name: 'Assess',
    pct: 100,
    color: 'bg-emerald-500',
    trackColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    status: 'CPQ footprint extracted, usage coverage in review',
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
    name: 'Map',
    pct: 55,
    color: 'bg-blue-500',
    trackColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    status: 'Top revenue workflows prioritized',
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
    name: 'Design',
    pct: 35,
    color: 'bg-violet-500',
    trackColor: 'bg-violet-100',
    textColor: 'text-violet-700',
    status: 'Discount Exception Agent draft in progress',
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
    name: 'Implementation',
    pct: 15,
    color: 'bg-amber-500',
    trackColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    status: 'Generated artifacts pending sandbox validation',
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
    name: 'Deploy / Go-Live',
    pct: 0,
    color: 'bg-slate-400',
    trackColor: 'bg-slate-100',
    textColor: 'text-slate-500',
    status: 'Waiting for validated package',
    icon: Rocket,
    items: [
      { icon: Circle, text: 'Go-live checklist not started', muted: true },
      { icon: Circle, text: 'Business validation pending', muted: true },
      { icon: Circle, text: 'Sandbox evidence required', muted: true },
      { icon: Circle, text: 'No release window selected', muted: true },
    ],
    link: '/revbrain/migration/si-architect/implementation',
  },
];

const OVERALL_PCT = 42;

/* ── Activity feed data ────────────────────────────────────────────── */

const ACTIVITY_FEED = [
  {
    time: '2 min ago',
    badge: 'Analysis',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    text: 'Analyzed quote activity and found 6 workflows covering most revenue',
  },
  {
    time: '8 min ago',
    badge: 'Recommendation',
    badgeColor: 'bg-violet-100 text-violet-700',
    text: 'Flagged Discount Exception Approval as the next validation priority',
  },
  {
    time: '14 min ago',
    badge: 'Draft',
    badgeColor: 'bg-blue-100 text-blue-700',
    text: 'Drafted future model: RCA Foundation + AI Agent + Human Approval',
  },
  {
    time: '22 min ago',
    badge: 'Question',
    badgeColor: 'bg-amber-100 text-amber-700',
    text: 'Found 3 open questions blocking higher design confidence',
  },
  {
    time: '35 min ago',
    badge: 'Validation',
    badgeColor: 'bg-slate-100 text-slate-700',
    text: 'Prepared implementation artifacts for sandbox validation',
  },
  {
    time: 'Pending client',
    badge: 'Question',
    badgeColor: 'bg-amber-100 text-amber-700',
    text: 'Suggested next action: confirm Finance escalation rule',
  },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function SIArchitectCommandCenter() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-4 pb-6 space-y-5 flex-1">

        {/* ─── 1. Account / Client Strip ─── */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg text-[11px]">
          <span className="text-[hsl(var(--muted-foreground))]">Client: <strong className="text-[hsl(var(--foreground))]">Vector Systems</strong></span>
          <span className="text-[hsl(var(--border))]">|</span>
          <span className="text-[hsl(var(--muted-foreground))]">Project: <strong className="text-[hsl(var(--foreground))]">Salesforce CPQ → Revenue Cloud + AI Agent</strong></span>
          <span className="text-[hsl(var(--border))]">|</span>
          <span className="text-[hsl(var(--muted-foreground))]">Partner: <strong className="text-[hsl(var(--foreground))]">SI Architect Workspace</strong></span>
          <span className="text-[hsl(var(--border))]">|</span>
          <span className="text-[hsl(var(--muted-foreground))]">Phase: <strong className="text-[hsl(var(--foreground))]">Implementation assessment and operating model design</strong></span>
          <span className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-1 text-[hsl(var(--muted-foreground))]">
              <RefreshCw className="w-3 h-3" />
              Last sync: <strong className="text-[hsl(var(--foreground))]">12 min ago</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-600 font-medium">Sandbox connected</span>
            </span>
          </span>
        </div>

        {/* ─── 2. Unified Migration Progress ─── */}
        <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden">
          {/* Section header */}
          <div className="px-5 py-3.5 border-b border-[hsl(var(--border))] flex items-center justify-between">
            <h2 className="text-sm font-bold text-[hsl(var(--foreground))]">Implementation Progress</h2>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">Overall</span>
              <span className="text-sm font-bold text-[hsl(var(--accent))]">{OVERALL_PCT}%</span>
              <div className="w-28 h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-700" style={{ width: `${OVERALL_PCT}%` }} />
              </div>
            </div>
          </div>

          {/* 5-column stage grid */}
          <div className="grid grid-cols-5 divide-x divide-[hsl(var(--border))]">
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.name} className="p-4 flex flex-col">
                  {/* Stage header: icon + name + pct */}
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${stage.textColor} shrink-0`} />
                    <span className="text-xs font-bold text-[hsl(var(--foreground))] truncate">{stage.name}</span>
                    <span className={`text-[11px] font-bold ml-auto shrink-0 ${stage.textColor}`}>{stage.pct}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className={`h-1.5 rounded-full overflow-hidden mb-2 ${stage.trackColor}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${stage.color}`}
                      style={{ width: `${Math.max(stage.pct, 2)}%` }}
                    />
                  </div>

                  {/* One-line status */}
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug mb-3">{stage.status}</p>

                  {/* Divider */}
                  <div className="h-px bg-[hsl(var(--border))]/60 mb-3" />

                  {/* Status bullets */}
                  <div className="space-y-2 flex-1">
                    {stage.items.map((item, i) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={i} className="flex items-start gap-1.5">
                          <ItemIcon className={`w-3 h-3 shrink-0 mt-[2px] ${item.muted ? 'text-amber-500' : 'text-[hsl(var(--muted-foreground))]'}`} />
                          <span className={`text-[10px] leading-snug ${item.muted ? 'text-amber-700 font-medium' : 'text-[hsl(var(--foreground))]'}`}>
                            {item.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* See more */}
                  <button
                    onClick={() => navigate(stage.link)}
                    className="self-start flex items-center gap-0.5 text-[10px] font-semibold text-[hsl(var(--accent))] hover:underline mt-3 pt-2 border-t border-[hsl(var(--border))]/40"
                  >
                    See more
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 3. Live Activity + Suggested Next Steps ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Live activity feed (LEFT) */}
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[hsl(var(--accent))]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Live RevBrain Activity</h3>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>

            <div className="space-y-0">
              {ACTIVITY_FEED.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[hsl(var(--border))]/50 last:border-0">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center pt-1.5 shrink-0">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--border))]'}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[hsl(var(--foreground))] leading-snug">{item.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${item.badgeColor}`}>{item.badge}</span>
                      <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                        <Clock className="w-3 h-3 inline -mt-0.5 mr-0.5" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested next steps (RIGHT) */}
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[hsl(var(--border))]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[hsl(var(--accent))]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Suggested Next Steps</h3>
              </div>
            </div>

            <div className="divide-y divide-[hsl(var(--border))]/60">
              {/* Step 1 */}
              <div className="px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-[hsl(var(--foreground))]">Confirm future operating model</p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug">Review Discount Exception Approval and confirm Foundation + Agent + Human Approval.</p>
                <button
                  onClick={() => navigate('/revbrain/migration/si-architect/map')}
                  className="flex items-center gap-0.5 text-[10px] font-semibold text-[hsl(var(--accent))] hover:underline pt-0.5"
                >
                  Open Map <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Step 2 */}
              <div className="px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-[hsl(var(--foreground))]">Answer Finance escalation question</p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug">Decide when Finance should review margin-risk exceptions.</p>
                <button className="flex items-center gap-0.5 text-[10px] font-semibold text-[hsl(var(--accent))] hover:underline pt-0.5">
                  Ask Finance Owner <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Step 3 */}
              <div className="px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-[hsl(var(--foreground))]">Validate top revenue workflow</p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug">Confirm the selected flow represents current business approval behavior.</p>
                <button className="flex items-center gap-0.5 text-[10px] font-semibold text-[hsl(var(--accent))] hover:underline pt-0.5">
                  Review validation gaps <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Step 4 */}
              <div className="px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-[hsl(var(--foreground))]">Review AI Agent draft</p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug">Check the Discount Exception Agent instructions and guardrails.</p>
                <button
                  onClick={() => navigate('/revbrain/migration/si-architect/design')}
                  className="flex items-center gap-0.5 text-[10px] font-semibold text-[hsl(var(--accent))] hover:underline pt-0.5"
                >
                  Open Design <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Step 5 */}
              <div className="px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-[hsl(var(--foreground))]">Prepare sandbox validation</p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug">Review generated artifacts and planned tests.</p>
                <button
                  onClick={() => navigate('/revbrain/migration/si-architect/implementation')}
                  className="flex items-center gap-0.5 text-[10px] font-semibold text-[hsl(var(--accent))] hover:underline pt-0.5"
                >
                  Open Implementation <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
