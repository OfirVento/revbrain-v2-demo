// ── Design Future State — Mock Data ─────────────────────────────────
// Current CPQ flow nodes, future-state layers, implementation methods,
// conflicts/insights, agent questions, and AI Agent preview.

import type { LucideIcon } from 'lucide-react';
import {
  Percent,
  Calculator,
  GitBranch,
  Mail,
  CheckSquare,
  FileOutput,
  Database,
  Workflow,
  Bot,
  ShieldCheck,
  Brain,
  Eye,
  Settings,
  Zap,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
} from 'lucide-react';

/* ── Current CPQ flow nodes ─────────────────────────────────────────── */

export interface FlowNode {
  id: string;
  label: string;
  detail: string;
  evidence: string;
  risk: 'high' | 'medium' | 'low';
  hasAgentContext: boolean;
  icon: LucideIcon;
}

export const CPQ_FLOW_NODES: FlowNode[] = [
  {
    id: 'n1',
    label: 'Rep applies discount above threshold',
    detail: 'Sales rep enters discount % on quote line. Threshold tiers: 10%, 15%, 20%, 25%.',
    evidence: 'SBQQ__QuoteLine__c.Discount__c',
    risk: 'low',
    hasAgentContext: false,
    icon: Percent,
  },
  {
    id: 'n2',
    label: 'CPQ price rule checks discount %',
    detail: '12 price rules evaluate in sequence. Conditions reference region, product family, and account tier.',
    evidence: 'SBQQ__PriceRule__c × 12 · SBQQ__PriceCondition__c × 34',
    risk: 'medium',
    hasAgentContext: false,
    icon: Settings,
  },
  {
    id: 'n3',
    label: 'QCP calculates margin impact',
    detail: '3 QCP scripts compute blended margin, enforce floor price, flag negative-margin lines. Script 2 depends on ERP cost sync.',
    evidence: 'SBQQ__CustomScript__c × 3 · MarginCalcHelper.cls',
    risk: 'high',
    hasAgentContext: true,
    icon: Calculator,
  },
  {
    id: 'n4',
    label: 'Advanced Approval routes manager review',
    detail: '8-branch approval tree. Each discount tier routes to different approver persona. VP override for strategic accounts.',
    evidence: 'sbaa__ApprovalRule__c × 8 · sbaa__ApprovalChain__c × 3',
    risk: 'high',
    hasAgentContext: false,
    icon: GitBranch,
  },
  {
    id: 'n5',
    label: 'Slack / email handoff to Finance',
    detail: 'Discounts >25% trigger email to Deal Desk + Slack. Manual review, no SLA. Avg response: 2.3 days.',
    evidence: 'DiscountException_Alert · DealDeskNotifier.trigger',
    risk: 'high',
    hasAgentContext: true,
    icon: Mail,
  },
  {
    id: 'n6',
    label: 'Decision returned to quote',
    detail: 'Approved discount applied back to quote line. Rejection requires rep resubmission. No audit trail beyond email.',
    evidence: 'QuoteApprovalHandler.cls',
    risk: 'medium',
    hasAgentContext: false,
    icon: FileOutput,
  },
];

/* ── Future-state layers ────────────────────────────────────────────── */

export interface FutureNode {
  id: string;
  label: string;
  detail: string;
}

export interface FutureLayer {
  id: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  nodes: FutureNode[];
}

export const FUTURE_LAYERS: FutureLayer[] = [
  {
    id: 'rca',
    label: 'RCA/ARM Foundation',
    icon: Database,
    gradient: 'from-indigo-500 to-violet-600',
    nodes: [
      { id: 'f1', label: 'Discount tiers in Custom Metadata', detail: 'Admin-editable tier thresholds. No code changes for tier adjustments.' },
      { id: 'f2', label: 'Price waterfall in Pricing Procedures', detail: 'Replaces 12 CPQ price rules with declarative pricing procedure steps.' },
      { id: 'f3', label: 'Margin floor as BRE Expression Set', detail: 'Business rule engine enforces floor price. Replaces QCP Script 2.' },
    ],
  },
  {
    id: 'flow',
    label: 'Flow / Automation',
    icon: Workflow,
    gradient: 'from-blue-500 to-cyan-600',
    nodes: [
      { id: 'f4', label: 'ARM Advanced Approvals', detail: 'Tier-based routing with auto-escalation at 25% threshold.' },
      { id: 'f5', label: 'SLA timer with reminder actions', detail: 'Automated follow-up flow. 24h first reminder, 48h escalation.' },
      { id: 'f6', label: 'Auto-route by margin band', detail: 'Margin < 40% routes to Finance. < 60% routes to Deal Desk.' },
    ],
  },
  {
    id: 'agent',
    label: 'AI Agent',
    icon: Bot,
    gradient: 'from-violet-500 to-purple-600',
    nodes: [
      { id: 'f7', label: 'Discount recommendation', detail: 'Suggests optimal discount based on historical patterns and deal attributes.' },
      { id: 'f8', label: 'Deal desk triage', detail: 'Replaces Slack/email handoff. Agent routes, summarises context, tracks SLA.' },
      { id: 'f9', label: 'Margin impact pre-check', detail: 'Runs margin calculation before submission. Blocks negative-margin submits.' },
    ],
  },
  {
    id: 'human',
    label: 'Human Approval',
    icon: ShieldCheck,
    gradient: 'from-amber-500 to-orange-600',
    nodes: [
      { id: 'f10', label: 'VP override for strategic accounts', detail: 'Named accounts with active executive sponsor bypass standard tiers.' },
      { id: 'f11', label: 'Finance review for margin < 40%', detail: 'Finance Ops reviews and approves. Agent pre-populates context.' },
    ],
  },
  {
    id: 'knowledge',
    label: 'Knowledge Capture',
    icon: Brain,
    gradient: 'from-emerald-500 to-teal-600',
    nodes: [
      { id: 'f12', label: 'Every decision feeds Knowledge Engine', detail: 'Approval/rejection reasons stored as institutional knowledge.' },
      { id: 'f13', label: 'Compliance audit trail', detail: 'Auto-generated audit log for every discount exception. Replaces email-based tracking.' },
    ],
  },
];

/* ── Implementation methods ─────────────────────────────────────────── */

export interface ImplementationMethod {
  id: string;
  label: string;
  icon: LucideIcon;
  defaultSelected: boolean;
}

export const IMPLEMENTATION_METHODS: ImplementationMethod[] = [
  { id: 'rca-config', label: 'RCA/ARM Config', icon: Database, defaultSelected: true },
  { id: 'flow-auto', label: 'Flow Automation', icon: Workflow, defaultSelected: true },
  { id: 'agentforce', label: 'AI Agent', icon: Bot, defaultSelected: true },
  { id: 'agentic-orch', label: 'Agentic Orchestration', icon: Zap, defaultSelected: false },
  { id: 'human-approval', label: 'Human Approval', icon: ShieldCheck, defaultSelected: true },
  { id: 'manual-fallback', label: 'Manual Fallback', icon: Mail, defaultSelected: false },
  { id: 'knowledge-capture', label: 'Knowledge Capture', icon: Brain, defaultSelected: true },
  { id: 'simplify', label: 'Simplify / Retire', icon: AlertTriangle, defaultSelected: false },
];

/* ── Design conflicts + insights ────────────────────────────────────── */

export type InsightType = 'conflict' | 'insight' | 'missing';

export interface DesignInsight {
  id: string;
  type: InsightType;
  icon: LucideIcon;
  message: string;
  detail: string;
}

export const DESIGN_INSIGHTS: DesignInsight[] = [
  {
    id: 'c1',
    type: 'conflict',
    icon: AlertTriangle,
    message: 'Strategic accounts may bypass discount tiers',
    detail: 'Map decision marked "Only named accounts" — confirm list with VP Sales before finalizing routing rules.',
  },
  {
    id: 'c2',
    type: 'conflict',
    icon: AlertTriangle,
    message: 'Finance wants review only when margin < 60%',
    detail: 'Current CPQ routes all >25% discounts. New design should filter by margin band, not just discount %.',
  },
  {
    id: 'i1',
    type: 'insight',
    icon: Lightbulb,
    message: '8 similar enterprise discount patterns matched',
    detail: 'Knowledge Engine found 8 prior migrations with similar discount structures. 6 used ARM Advanced Approvals successfully.',
  },
  {
    id: 'i2',
    type: 'insight',
    icon: Lightbulb,
    message: '12 discount rules analyzed from CPQ',
    detail: 'All 12 price rules have been mapped. 9 translate directly to Pricing Procedures. 3 require BRE Expression Sets.',
  },
  {
    id: 'm1',
    type: 'missing',
    icon: HelpCircle,
    message: 'Finance escalation owner not confirmed',
    detail: 'Design assumes Finance Ops owns final approval, but org chart shows Deal Desk may be responsible. Needs client confirmation.',
  },
];

/* ── Agent questions for Finance node ───────────────────────────────── */

export interface AgentQuestionOption {
  id: string;
  label: string;
}

export interface AgentQuestion {
  id: string;
  question: string;
  options: AgentQuestionOption[];
}

export const DESIGN_AGENT_QUESTIONS: AgentQuestion[] = [
  {
    id: 'dq1',
    question: 'Who should own final approval after Sales Manager?',
    options: [
      { id: 'dq1-a', label: 'Finance Ops' },
      { id: 'dq1-b', label: 'Deal Desk' },
      { id: 'dq1-c', label: 'CRO delegate' },
    ],
  },
  {
    id: 'dq2',
    question: 'Should Finance review every enterprise discount exception?',
    options: [
      { id: 'dq2-a', label: 'Yes, always' },
      { id: 'dq2-b', label: 'Only if margin < 60%' },
      { id: 'dq2-c', label: 'Only for strategic accounts' },
    ],
  },
];

/* ── AI Agent preview ─────────────────────────────────────────────── */

export interface AIAgentPreview {
  name: string;
  purpose: string;
  trigger: string;
  evidence: string[];
  humanHandoffs: string[];
  guardrails: string[];
  monitoring: string[];
}

export const AGENTFORCE_PREVIEW: AIAgentPreview = {
  name: 'Discount Exception Agent',
  purpose: 'Automate discount exception triage, provide AI-grounded recommendations, and route approvals with full context — replacing manual Slack/email handoff.',
  trigger: 'Quote line discount exceeds tier threshold OR margin falls below configured floor.',
  evidence: [
    'Historical discount approval patterns (last 12 months)',
    'Customer account tier and strategic classification',
    'Current quarter discount budget utilisation',
    'Similar deal outcomes from Knowledge Engine',
  ],
  humanHandoffs: [
    'Finance review when margin < 40%',
    'VP override for strategic accounts',
    'Quarterly discount ceiling governance review',
  ],
  guardrails: [
    'Cannot auto-approve discounts > 30% without human review',
    'Must surface margin impact before any approval',
    'All recommendations include confidence score and evidence',
    'Escalation SLA: 24h first reminder, 48h auto-escalate',
  ],
  monitoring: [
    'Approval cycle time (target: < 4 hours vs current 2.3 days)',
    'Recommendation acceptance rate',
    'Margin impact of approved exceptions',
    'Knowledge Engine confidence trend',
  ],
};
