// ── Ongoing Ops — Implementation Workspace ─────────────────────────
// 3-column workspace: Ready tickets | Current/Future analysis | Agent execution
// Flow: select ticket → RevBrain traces current state → proposes future
// state → human approves → agents execute automatically.

import { useState, useEffect, useRef, useCallback } from 'react';
import { clsx } from 'clsx';
import {
  CheckCircle,
  Bot,
  Zap,
  AlertTriangle,
  Info,
  ExternalLink,
  User,
  Clock,
  ShieldCheck,
  Sparkles,
  FileCode,
  Workflow,
  Database,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════ */

interface ReadyTicket {
  id: string;
  title: string;
  requester: string;
  team: string;
  age: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  tags: string[];
}

interface EvidenceRef {
  type: 'flow' | 'rule' | 'code' | 'field' | 'metadata';
  name: string;
  detail: string;
  significance: string;
}

interface ConflictAlert {
  severity: 'conflict' | 'dependency' | 'confirmation';
  message: string;
}

interface PlannedChange {
  action: string;
  target: string;
}

interface AgentTask {
  agent: string;
  label: string;
  type: 'agent' | 'automation';
}

interface TicketAnalysis {
  // Current state
  currentBehavior: string;
  currentImplementation: string;
  evidence: EvidenceRef[];
  // Proposed future
  proposedBehavior: string;
  plannedChanges: PlannedChange[];
  expectedOutcome: string;
  conflicts: ConflictAlert[];
  // Execution
  executionSteps: AgentTask[];
  validationTests: string[];
  // Completion
  changedCount: number;
  manualEffort: string;
  agentEffort: string;
}

/* ═══════════════════════════════════════════════════════════════════════
   Ticket data — reuses the Ready to Implement tickets from User Requests
   ═══════════════════════════════════════════════════════════════════════ */

const READY_TICKETS: ReadyTicket[] = [
  {
    id: 'REQ-301',
    title: 'Add approval escalation for margin-risk deals',
    requester: 'Finance',
    team: 'Finance',
    age: '8 days ago',
    description: 'Auto-escalate when margin falls below threshold for high-value deals.',
    impact: 'High',
    tags: ['Approval', 'Automation'],
  },
  {
    id: 'REQ-302',
    title: 'Monitor stale Awaiting Order Results opportunities',
    requester: 'Sales Operations',
    team: 'Sales Ops',
    age: '10 days ago',
    description: 'Continuously flag opportunities stuck in Awaiting Order Results beyond SLA.',
    impact: 'Medium',
    tags: ['Opportunity', 'Automation'],
  },
  {
    id: 'REQ-303',
    title: 'Update contracted pricing for strategic accounts',
    requester: 'Deal Desk',
    team: 'Deal Desk',
    age: '11 days ago',
    description: 'Refresh contracted pricing tables for top-tier accounts.',
    impact: 'Medium',
    tags: ['Pricing', 'Accounts'],
  },
];

const IMPACT_COLORS: Record<string, string> = {
  High: 'bg-orange-100 text-orange-800 border-orange-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Low: 'bg-green-100 text-green-800 border-green-200',
};

/* ═══════════════════════════════════════════════════════════════════════
   Per-ticket analysis data
   ═══════════════════════════════════════════════════════════════════════ */

const TICKET_ANALYSIS: Record<string, TicketAnalysis> = {
  'REQ-301': {
    currentBehavior:
      'All discount exceptions above 15% are manually routed to Finance for approval, regardless of deal size or margin impact. Average approval turnaround is 18 hours.',
    currentImplementation:
      'A single approval rule evaluates discount percentage only. No margin-aware logic exists. High-value deals and low-risk discounts follow the same path.',
    evidence: [
      { type: 'rule', name: 'Enterprise_Discount_Approval', detail: 'Approval rule routing all discounts > 15% to Finance queue', significance: 'Single threshold — does not differentiate by margin impact' },
      { type: 'flow', name: 'Quote_After_Save_Flow', detail: 'Post-save flow triggering approval evaluation', significance: 'Entry point for approval routing logic' },
      { type: 'code', name: 'DiscountThresholdEvaluator', detail: 'Apex class computing discount percentage against flat threshold', significance: 'Contains hardcoded 15% threshold — no margin calculation' },
      { type: 'field', name: 'Approval_Status__c', detail: 'Custom field on Quote object tracking approval state', significance: 'Used by approval flow and quote template' },
      { type: 'field', name: 'Margin_Percent__c', detail: 'Custom field on Quote Line Item', significance: 'Exists but not referenced in current approval logic' },
    ],
    proposedBehavior:
      'Margin-risk deals (margin < 30% on deals > $100K) auto-escalate to Finance with full margin context. Standard discounts within margin range are routed through the existing fast-track approval.',
    plannedChanges: [
      { action: 'Update automation', target: 'Add margin-risk evaluation to Quote_After_Save_Flow' },
      { action: 'Create rule', target: 'Margin-risk escalation criteria (< 30% margin, > $100K deal value)' },
      { action: 'Update approval', target: 'Add escalation routing with margin evidence package' },
      { action: 'Add monitoring', target: 'Track margin-risk escalation frequency and resolution time' },
      { action: 'Update knowledge', target: 'Capture escalation policy and threshold rationale' },
    ],
    expectedOutcome:
      'Finance reviews only margin-risk exceptions while standard approvals are routed automatically. Estimated 70% reduction in Finance approval volume.',
    conflicts: [
      { severity: 'dependency', message: 'Existing approval rule also evaluates discount threshold. New margin-risk logic must integrate, not duplicate.' },
      { severity: 'confirmation', message: 'Confirm whether strategic accounts bypass the standard margin threshold.' },
    ],
    executionSteps: [
      { agent: 'Context Agent', label: 'Loading current approval behavior and threshold logic', type: 'agent' },
      { agent: 'Dependency Agent', label: 'Checking pricing, margin, and approval dependencies', type: 'agent' },
      { agent: 'Automation Agent', label: 'Updating approval routing with margin-risk evaluation', type: 'automation' },
      { agent: 'Approval Agent', label: 'Configuring escalation path with evidence package', type: 'agent' },
      { agent: 'Monitoring Agent', label: 'Adding escalation frequency and resolution tracking', type: 'automation' },
      { agent: 'Validation Agent', label: 'Testing standard and margin-risk approval scenarios', type: 'agent' },
      { agent: 'Knowledge Agent', label: 'Updating implementation rationale in Knowledge Engine', type: 'agent' },
    ],
    validationTests: [
      'Standard discount (> 30% margin) — fast-track approval',
      'Margin-risk deal (< 30% margin, > $100K) — Finance escalation',
      'Low-value deal with low margin — no escalation',
      'In-flight approvals — no disruption to existing flow',
    ],
    changedCount: 4,
    manualEffort: '4–6 hrs',
    agentEffort: '~12 min',
  },

  'REQ-302': {
    currentBehavior:
      'Opportunities in "Awaiting Order Results" stage are not monitored. Reps manually track deal status. Stale opportunities become invisible after 2 weeks.',
    currentImplementation:
      'No automated monitoring exists. Opportunity stage transitions are tracked only in standard Salesforce reporting. No SLA enforcement.',
    evidence: [
      { type: 'field', name: 'StageName', detail: 'Standard Salesforce Opportunity field — includes "Awaiting Order Results"', significance: 'Stage value used for filtering' },
      { type: 'field', name: 'Last_Activity_Date__c', detail: 'Custom field tracking last meaningful activity on the opportunity', significance: 'Key metric for staleness detection' },
      { type: 'metadata', name: 'Opportunity_SLA_Config__mdt', detail: 'Custom metadata defining stage-level SLA thresholds (14 days)', significance: 'SLA config from migration — currently unused in monitoring' },
      { type: 'flow', name: 'Opp_Stage_Transition_Flow', detail: 'Flow triggered on stage change', significance: 'Can be extended with SLA monitoring logic' },
    ],
    proposedBehavior:
      'Automated monitoring detects opportunities stuck in Awaiting Order Results beyond 14-day SLA. Owners receive progressive alerts at 10, 14, and 21 days with resolution suggestions.',
    plannedChanges: [
      { action: 'Create automation', target: 'Awaiting Results Monitor scheduled job with SLA evaluation' },
      { action: 'Create rule', target: 'Progressive alerting thresholds (10/14/21 days)' },
      { action: 'Update flow', target: 'Extend Opp_Stage_Transition_Flow with SLA tracking reset' },
      { action: 'Add monitoring', target: 'Dashboard widget for stale opportunity visibility' },
      { action: 'Update knowledge', target: 'Capture SLA policy and monitoring rationale' },
    ],
    expectedOutcome:
      'Zero opportunities silently stale in Awaiting Order Results. Owners get actionable alerts before SLA breach. Estimated recovery of $1.2M in previously stalled pipeline.',
    conflicts: [],
    executionSteps: [
      { agent: 'Context Agent', label: 'Loading opportunity stage data and SLA configuration', type: 'agent' },
      { agent: 'Dependency Agent', label: 'Checking opportunity workflow and reporting dependencies', type: 'agent' },
      { agent: 'Automation Agent', label: 'Creating scheduled Awaiting Results Monitor job', type: 'automation' },
      { agent: 'Notification Agent', label: 'Configuring progressive alert thresholds and templates', type: 'automation' },
      { agent: 'Dashboard Agent', label: 'Adding stale opportunity widget to operations view', type: 'agent' },
      { agent: 'Validation Agent', label: 'Testing SLA detection across opportunity scenarios', type: 'agent' },
      { agent: 'Knowledge Agent', label: 'Updating SLA policy in Knowledge Engine', type: 'agent' },
    ],
    validationTests: [
      'Active opportunity within SLA — no alert',
      'Opportunity at 10 days — warning notification',
      'Opportunity at 14 days — SLA breach alert',
      'Already-resolved opportunity — no false positive',
    ],
    changedCount: 4,
    manualEffort: '3–4 hrs',
    agentEffort: '~9 min',
  },

  'REQ-303': {
    currentBehavior:
      'Contracted pricing for strategic accounts is maintained in static price book entries. Updates require manual edits across multiple price books and validation against quote history.',
    currentImplementation:
      'Price book entries are managed through Salesforce Setup. No automated validation exists. Account-to-price-book association is tracked via custom lookup fields.',
    evidence: [
      { type: 'metadata', name: 'Strategic_Account_Tier__mdt', detail: 'Custom metadata mapping account tiers to pricing brackets', significance: 'Source of truth for tier-based pricing' },
      { type: 'field', name: 'Contracted_Price_Book__c', detail: 'Lookup field on Account linking to contracted price book', significance: 'Determines which price book applies to quotes' },
      { type: 'code', name: 'PriceBookSelector', detail: 'Apex class resolving correct price book for quote context', significance: 'Entry point for contracted pricing — must remain compatible' },
      { type: 'field', name: 'Last_Price_Update__c', detail: 'Date field tracking last price book update', significance: 'Audit trail for pricing changes' },
    ],
    proposedBehavior:
      'RevBrain updates contracted pricing entries for all strategic accounts based on the latest pricing delta. Changes are validated against recent quote history before activation.',
    plannedChanges: [
      { action: 'Update metadata', target: 'Refresh pricing brackets in Strategic_Account_Tier__mdt' },
      { action: 'Update records', target: 'Batch update price book entries for strategic accounts' },
      { action: 'Create validation', target: 'Cross-check updated prices against last 90 days of quote history' },
      { action: 'Update fields', target: 'Set Last_Price_Update__c on affected accounts' },
      { action: 'Update knowledge', target: 'Capture pricing update rationale and delta summary' },
    ],
    expectedOutcome:
      'Strategic account pricing is current and validated. No quote-level pricing discrepancies. Full audit trail of pricing changes maintained.',
    conflicts: [
      { severity: 'dependency', message: 'PriceBookSelector logic references tier metadata — must validate compatibility after update.' },
    ],
    executionSteps: [
      { agent: 'Context Agent', label: 'Loading strategic account list and current pricing data', type: 'agent' },
      { agent: 'Dependency Agent', label: 'Checking price book and quote history dependencies', type: 'agent' },
      { agent: 'Pricing Agent', label: 'Computing pricing delta and updating price book entries', type: 'agent' },
      { agent: 'Validation Agent', label: 'Cross-checking against 90-day quote history', type: 'agent' },
      { agent: 'Automation Agent', label: 'Updating audit fields and account records', type: 'automation' },
      { agent: 'Knowledge Agent', label: 'Capturing pricing update rationale and delta summary', type: 'agent' },
    ],
    validationTests: [
      'Strategic account — updated pricing applied correctly',
      'Non-strategic account — pricing unchanged',
      'Recent quote — no retroactive pricing change',
      'Price book selector — compatible with updated tiers',
    ],
    changedCount: 3,
    manualEffort: '3–5 hrs',
    agentEffort: '~10 min',
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   Evidence icon helper
   ═══════════════════════════════════════════════════════════════════════ */

const EVIDENCE_ICONS: Record<string, typeof FileCode> = {
  flow: Workflow,
  rule: ShieldCheck,
  code: FileCode,
  field: Database,
  metadata: Database,
};

const EVIDENCE_LABELS: Record<string, string> = {
  flow: 'Flow',
  rule: 'Automation / Rule',
  code: 'Code',
  field: 'Field',
  metadata: 'Custom Metadata',
};

/* ═══════════════════════════════════════════════════════════════════════
   Left Column — Ready Tickets
   ═══════════════════════════════════════════════════════════════════════ */

function TicketList({
  tickets,
  selectedId,
  onSelect,
}: {
  tickets: ReadyTicket[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <h2 className="text-sm font-bold text-[hsl(var(--foreground))] mb-0.5">
          Ready for Implementation
        </h2>
        <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug">
          Requests with enough business context for RevBrain to implement.
        </p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {tickets.map((ticket) => {
          const isSelected = ticket.id === selectedId;
          return (
            <button
              key={ticket.id}
              onClick={() => onSelect(ticket.id)}
              className={clsx(
                'w-full text-left rounded-lg border p-3 transition-all',
                isSelected
                  ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/5 shadow-sm ring-1 ring-[hsl(var(--accent))]/20'
                  : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--accent))]/30 hover:shadow-sm',
              )}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-1 py-0.5 rounded">
                  {ticket.id}
                </span>
                <span
                  className={clsx(
                    'text-[8px] font-semibold px-1 py-0.5 rounded border',
                    IMPACT_COLORS[ticket.impact],
                  )}
                >
                  {ticket.impact}
                </span>
              </div>
              <p
                className={clsx(
                  'text-xs font-semibold leading-snug mb-1',
                  isSelected
                    ? 'text-[hsl(var(--foreground))]'
                    : 'text-[hsl(var(--foreground))]',
                )}
              >
                {ticket.title}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-[hsl(var(--muted-foreground))] mb-1.5">
                <User className="w-2.5 h-2.5" />
                <span>
                  {ticket.requester} · {ticket.team}
                </span>
                <span className="text-[hsl(var(--border))]">·</span>
                <span>{ticket.age}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {ticket.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] font-medium px-1 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {isSelected && (
                <div className="flex items-center gap-1 mt-2 text-[10px] font-semibold text-[hsl(var(--accent))]">
                  <Sparkles className="w-3 h-3" />
                  <span>Analyzing…</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Evidence Popover
   ═══════════════════════════════════════════════════════════════════════ */

function EvidencePopover({
  evidence,
  onClose,
}: {
  evidence: EvidenceRef;
  onClose: () => void;
}) {
  const Icon = EVIDENCE_ICONS[evidence.type] ?? FileCode;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-xl w-full max-w-sm p-4 animate-[scaleIn_150ms_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-[hsl(var(--accent))]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
            {EVIDENCE_LABELS[evidence.type]}
          </span>
        </div>
        <p className="text-sm font-bold text-[hsl(var(--foreground))] mb-1 font-mono">
          {evidence.name}
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2 leading-relaxed">
          {evidence.detail}
        </p>
        <div className="bg-[hsl(var(--accent))]/5 rounded px-3 py-2 border border-[hsl(var(--accent))]/10">
          <p className="text-[10px] font-semibold text-[hsl(var(--accent))] mb-0.5">
            Why this matters
          </p>
          <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
            {evidence.significance}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Middle Column — Current & Future State
   ═══════════════════════════════════════════════════════════════════════ */

type AnalysisPhase = 'thinking' | 'ready';

function MiddleColumn({
  analysis,
  phase,
  approved,
  onApprove,
  onEvidenceClick,
}: {
  analysis: TicketAnalysis;
  phase: AnalysisPhase;
  approved: boolean;
  onApprove: () => void;
  onEvidenceClick: (ev: EvidenceRef) => void;
}) {
  return (
    <div className="flex flex-col h-full gap-3 overflow-y-auto">
      {/* ── Top Half: Current State ── */}
      <div className="shrink-0 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg">
        <div className="px-4 py-3 border-b border-[hsl(var(--border))]/60">
          <h3 className="text-xs font-bold text-[hsl(var(--foreground))]">
            What exists today
          </h3>
        </div>

        {phase === 'thinking' ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 animate-[fadeIn_200ms_ease]">
            <span className="w-5 h-5 border-2 border-[hsl(var(--accent))] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[hsl(var(--muted-foreground))] font-medium">
              RevBrain is tracing the current implementation…
            </p>
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-[hsl(var(--accent))]"
                  style={{
                    animation: `pulse 1.2s ease-in-out ${i * 0.3}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3 animate-[fadeIn_300ms_ease]">
            {/* Current behavior */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-1">
                Current behavior
              </p>
              <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                {analysis.currentBehavior}
              </p>
            </div>

            {/* Existing implementation */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-1">
                Existing implementation
              </p>
              <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                {analysis.currentImplementation}
              </p>
            </div>

            {/* Evidence */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-1.5">
                Evidence
              </p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.evidence.map((ev) => {
                  const Icon = EVIDENCE_ICONS[ev.type] ?? FileCode;
                  return (
                    <button
                      key={ev.name}
                      onClick={() => onEvidenceClick(ev)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[hsl(var(--muted))]/60 border border-[hsl(var(--border))]/60 hover:border-[hsl(var(--accent))]/40 hover:bg-[hsl(var(--accent))]/5 transition-colors group"
                    >
                      <Icon className="w-3 h-3 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--accent))] shrink-0" />
                      <span className="text-[10px] font-semibold font-mono text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))] truncate max-w-[160px]">
                        {ev.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Half: Future State ── */}
      <div className="shrink-0 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg flex flex-col">
        <div className="px-4 py-3 border-b border-[hsl(var(--border))]/60">
          <h3 className="text-xs font-bold text-[hsl(var(--foreground))]">
            What RevBrain will implement
          </h3>
        </div>

        {phase === 'thinking' ? (
          <div className="flex-1 flex items-center justify-center text-center p-4">
            <p className="text-xs text-[hsl(var(--muted-foreground))] italic">
              Waiting for current-state analysis…
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 space-y-3 animate-[fadeIn_300ms_ease]">
              {/* Proposed behavior */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-1">
                  Proposed behavior
                </p>
                <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                  {analysis.proposedBehavior}
                </p>
              </div>

              {/* Planned changes */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-1.5">
                  Planned changes
                </p>
                <div className="space-y-1">
                  {analysis.plannedChanges.map((change, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs"
                    >
                      <ArrowRight className="w-3 h-3 text-[hsl(var(--accent))] shrink-0 mt-0.5" />
                      <span>
                        <span className="font-semibold text-[hsl(var(--foreground))]">
                          {change.action}
                        </span>
                        <span className="text-[hsl(var(--muted-foreground))]">
                          {' '}— {change.target}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected outcome */}
              <div className="bg-emerald-50 border border-emerald-200/60 rounded px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 mb-0.5">
                  Expected outcome
                </p>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {analysis.expectedOutcome}
                </p>
              </div>

              {/* Conflicts / alerts */}
              {analysis.conflicts.length > 0 ? (
                <div className="space-y-1.5">
                  {analysis.conflicts.map((conflict, i) => (
                    <div
                      key={i}
                      className={clsx(
                        'flex items-start gap-2 px-3 py-2 rounded border text-xs',
                        conflict.severity === 'conflict'
                          ? 'bg-red-50 border-red-200/60'
                          : conflict.severity === 'dependency'
                            ? 'bg-amber-50 border-amber-200/60'
                            : 'bg-blue-50 border-blue-200/60',
                      )}
                    >
                      {conflict.severity === 'conflict' ? (
                        <AlertTriangle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                      ) : conflict.severity === 'dependency' ? (
                        <Info className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <MessageSquare className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className={clsx(
                          'font-semibold',
                          conflict.severity === 'conflict'
                            ? 'text-red-700'
                            : conflict.severity === 'dependency'
                              ? 'text-amber-700'
                              : 'text-blue-700',
                        )}>
                          {conflict.severity === 'conflict' ? 'Conflict' : conflict.severity === 'dependency' ? 'Dependency' : 'Human confirmation needed'}
                        </span>
                        <span className={clsx(
                          conflict.severity === 'conflict'
                            ? 'text-red-700'
                            : conflict.severity === 'dependency'
                              ? 'text-amber-700'
                              : 'text-blue-700',
                        )}>
                          {' '}— {conflict.message}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200/40 rounded text-xs text-emerald-700">
                  <CheckCircle className="w-3 h-3 shrink-0" />
                  <span>No blocking conflicts detected</span>
                </div>
              )}
            </div>

            {/* Approval bar */}
            <div className="px-4 py-3 border-t border-[hsl(var(--border))]/60 shrink-0">
              {approved ? (
                <div className="flex items-center gap-2 text-xs text-green-700 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Implementation approved</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onApprove}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[hsl(var(--accent))] text-white hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>Approve Implementation</span>
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
                    Request Changes
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/5 transition-colors">
                    Ask RevBrain
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Right Column — Execution
   ═══════════════════════════════════════════════════════════════════════ */

type ExecStatus = 'queued' | 'working' | 'complete';

function ExecutionColumn({
  analysis,
  approved,
}: {
  analysis: TicketAnalysis;
  approved: boolean;
}) {
  const [statuses, setStatuses] = useState<ExecStatus[]>(
    () => analysis.executionSteps.map(() => 'queued'),
  );
  const [phase, setPhase] = useState<'waiting' | 'running' | 'done'>('waiting');
  const startedRef = useRef(false);

  // Reset on analysis change
  useEffect(() => {
    setStatuses(analysis.executionSteps.map(() => 'queued'));
    setPhase('waiting');
    startedRef.current = false;
  }, [analysis]);

  // Auto-run after approval
  useEffect(() => {
    if (!approved || startedRef.current) return;
    startedRef.current = true;

    const run = async () => {
      const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
      setPhase('running');
      await delay(500);

      for (let i = 0; i < analysis.executionSteps.length; i++) {
        setStatuses((prev) => {
          const next = [...prev];
          next[i] = 'working';
          return next;
        });
        await delay(700 + Math.random() * 300);
        setStatuses((prev) => {
          const next = [...prev];
          next[i] = 'complete';
          return next;
        });
      }

      await delay(400);
      setPhase('done');
    };

    run();
  }, [approved, analysis]);

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[hsl(var(--border))]/60 shrink-0">
        <h3 className="text-xs font-bold text-[hsl(var(--foreground))]">
          RevBrain Implementation
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        {phase === 'waiting' && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 gap-3">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            </div>
            <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">
              Waiting for approval
            </p>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-relaxed max-w-[200px]">
              RevBrain has prepared the implementation plan and will execute after human approval.
            </p>
          </div>
        )}

        {(phase === 'running' || phase === 'done') && (
          <div className="p-4 space-y-4 animate-[fadeIn_300ms_ease]">
            {/* Progress */}
            {phase === 'running' && (
              <div className="mb-2">
                <div className="h-1.5 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-300"
                    style={{
                      width: `${(statuses.filter((s) => s === 'complete').length / statuses.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Execution steps */}
            <div className="space-y-1.5">
              {analysis.executionSteps.map((step, i) => {
                const status = statuses[i];
                const isAgent = step.type === 'agent';
                return (
                  <div
                    key={i}
                    className={clsx(
                      'flex items-start gap-2 px-3 py-2 rounded-md border transition-all',
                      status === 'working'
                        ? 'bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20 shadow-sm'
                        : status === 'complete'
                          ? 'bg-[hsl(var(--card))] border-[hsl(var(--border))]/60'
                          : 'bg-[hsl(var(--muted))]/20 border-transparent opacity-40',
                    )}
                  >
                    {status === 'complete' ? (
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                    ) : status === 'working' ? (
                      <span className="w-3.5 h-3.5 border-2 border-[hsl(var(--accent))] border-t-transparent rounded-full animate-spin shrink-0 mt-0.5" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-[hsl(var(--border))] shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-[hsl(var(--foreground))]">
                          {step.agent}
                        </span>
                        {isAgent ? (
                          <Bot className="w-2.5 h-2.5 text-violet-500" />
                        ) : (
                          <Zap className="w-2.5 h-2.5 text-blue-500" />
                        )}
                      </div>
                      <p
                        className={clsx(
                          'text-[10px] leading-snug',
                          status === 'working'
                            ? 'text-[hsl(var(--foreground))] font-medium'
                            : status === 'complete'
                              ? 'text-[hsl(var(--muted-foreground))]'
                              : 'text-[hsl(var(--muted-foreground))]',
                        )}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Validation */}
            {phase === 'done' && (
              <div className="space-y-3 animate-[fadeIn_300ms_ease]">
                <div className="pt-2 border-t border-[hsl(var(--border))]/60">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-1.5">
                    Validation
                  </p>
                  <div className="space-y-1">
                    {analysis.validationTests.map((test) => (
                      <div
                        key={test}
                        className="flex items-center gap-2 text-[11px]"
                      >
                        <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                        <span className="text-[hsl(var(--foreground))]">
                          {test}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion */}
                <div className="bg-emerald-50 border border-emerald-200/60 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-bold text-green-800">
                      Implementation complete
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                    <span className="text-emerald-700">Components changed</span>
                    <span className="font-semibold text-emerald-800 text-right">
                      {analysis.changedCount}
                    </span>
                    <span className="text-emerald-700">Validations passed</span>
                    <span className="font-semibold text-emerald-800 text-right">
                      {analysis.validationTests.length}
                    </span>
                    <span className="text-emerald-700">Blocking conflicts</span>
                    <span className="font-semibold text-emerald-800 text-right">
                      0
                    </span>
                    <span className="text-emerald-700">Knowledge updated</span>
                    <span className="font-semibold text-emerald-800 text-right">
                      Yes
                    </span>
                  </div>
                </div>

                {/* Effort */}
                <div className="bg-[hsl(var(--muted))]/40 rounded-lg px-3 py-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[hsl(var(--muted-foreground))]">
                      Manual admin effort
                    </span>
                    <span className="font-semibold text-[hsl(var(--foreground))]">
                      {analysis.manualEffort}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[hsl(var(--foreground))] font-medium">
                      RevBrain execution
                    </span>
                    <span className="font-semibold text-[hsl(var(--foreground))]">
                      {analysis.agentEffort} + human approval
                    </span>
                  </div>
                </div>

                <button className="w-full px-3 py-2 text-xs font-semibold rounded-md border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
                  View changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════ */

export function OngoingOpsImplementationPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase | null>(null);
  const [approved, setApproved] = useState(false);
  const [evidencePopover, setEvidencePopover] = useState<EvidenceRef | null>(null);

  const analysis = selectedId ? TICKET_ANALYSIS[selectedId] : null;

  // When ticket is selected, show thinking → ready
  const handleSelect = useCallback(
    (id: string) => {
      if (id === selectedId) return;
      setSelectedId(id);
      setAnalysisPhase('thinking');
      setApproved(false);
    },
    [selectedId],
  );

  // Transition from thinking to ready after delay
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (analysisPhase === 'thinking') {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
      thinkingTimerRef.current = setTimeout(() => {
        setAnalysisPhase('ready');
      }, 1800);
    }
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    };
  }, [analysisPhase, selectedId]);

  const handleApprove = useCallback(() => {
    setApproved(true);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-4 pb-6 flex-1 flex flex-col min-h-0">
        {/* 3-column workspace */}
        <div className="flex-1 flex gap-4 min-h-0" style={{ height: 'calc(100vh - 220px)' }}>
          {/* Left — 25% */}
          <div className="flex flex-col min-h-0" style={{ width: '25%', flexShrink: 0 }}>
            <TicketList
              tickets={READY_TICKETS}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </div>

          {/* Middle — 37.5% */}
          <div className="flex flex-col min-h-0" style={{ width: '37.5%', flexShrink: 0 }}>
            {analysis && analysisPhase ? (
              <MiddleColumn
                key={selectedId}
                analysis={analysis}
                phase={analysisPhase}
                approved={approved}
                onApprove={handleApprove}
                onEvidenceClick={setEvidencePopover}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-[hsl(var(--muted))]/20 rounded-lg border border-dashed border-[hsl(var(--border))]">
                <div className="text-center p-6">
                  <span className="text-2xl block mb-2">←</span>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Select a request to begin analysis
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right — 37.5% */}
          <div className="flex flex-col min-h-0" style={{ width: '37.5%', flexShrink: 0 }}>
            {analysis ? (
              <ExecutionColumn
                key={selectedId}
                analysis={analysis}
                approved={approved}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-[hsl(var(--muted))]/20 rounded-lg border border-dashed border-[hsl(var(--border))]">
                <div className="text-center p-6">
                  <span className="text-2xl block mb-2">⚙</span>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Implementation will execute here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Evidence popover */}
      {evidencePopover && (
        <EvidencePopover
          evidence={evidencePopover}
          onClose={() => setEvidencePopover(null)}
        />
      )}
    </div>
  );
}
