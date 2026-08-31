// ── Implementation — Mock Data ──────────────────────────────────────
// Board columns, cards, agent questions, and activity feed for the
// Enterprise Discount Approval implementation phase.

import type { LucideIcon } from 'lucide-react';
import {
  ClipboardList,
  Users,
  Bot,
  GitBranch,
  Calculator,
  Settings,
  Workflow,
  Zap,
  Brain,
  Package,
  Route,
  TestTube,
  CheckSquare,
  FileCode,
  MessageSquare,
  Search,
  Wrench,
  Play,
} from 'lucide-react';

/* ── Board columns ──────────────────────────────────────────────────── */

export type ColumnId = 'plan' | 'understand' | 'build' | 'deploy';
export type CardStatus = 'complete' | 'active' | 'needs-validation' | 'ready' | 'not-started';

export interface BoardColumn {
  id: ColumnId;
  label: string;
  color: string;
  dotColor: string;
}

export const BOARD_COLUMNS: BoardColumn[] = [
  { id: 'plan', label: 'Implementation Plan', color: 'text-violet-700', dotColor: 'bg-violet-500' },
  { id: 'understand', label: 'Understand CPQ State', color: 'text-blue-700', dotColor: 'bg-blue-500' },
  { id: 'build', label: 'Build RCA/ARM State', color: 'text-emerald-700', dotColor: 'bg-emerald-500' },
  { id: 'deploy', label: 'Deploy & Test', color: 'text-amber-700', dotColor: 'bg-amber-500' },
];

/* ── Implementation cards ───────────────────────────────────────────── */

export interface ImplCard {
  id: string;
  column: ColumnId;
  title: string;
  businessSummary: string;
  technicalArtifact: string;
  status: CardStatus;
  timestamp: string;
  evidence: string;
  hasAgent: boolean;
  icon: LucideIcon;
  sfLink: { label: string; url: string } | null;
}

export const IMPL_CARDS: ImplCard[] = [
  // ── Migration Plan ───────────────────────────────────
  {
    id: 'mp-scope',
    column: 'plan',
    title: 'Discount Exception Migration Scope',
    businessSummary: 'Defines which discount approval rules, scripts, and workflows are in scope for migration. Covers all 4 discount tiers and 8 approval branches.',
    technicalArtifact: 'MigrationScope_DiscountException_v2.yaml',
    status: 'complete',
    timestamp: 'Completed 2 days ago',
    evidence: '42 CPQ rules analyzed · 8 approval chains mapped',
    hasAgent: false,
    icon: ClipboardList,
    sfLink: null,
  },
  {
    id: 'mp-owners',
    column: 'plan',
    title: 'Approval Owner Matrix',
    businessSummary: 'Maps every discount tier to the correct approver persona. Includes escalation paths for strategic accounts and margin exceptions.',
    technicalArtifact: 'ApprovalMatrix_EnterpriseDiscount_v1.csv',
    status: 'complete',
    timestamp: 'Completed 1 day ago',
    evidence: 'Validated by VP Sales · 4 tiers confirmed',
    hasAgent: false,
    icon: Users,
    sfLink: null,
  },
  {
    id: 'mp-agent',
    column: 'plan',
    title: 'AI Agent Handoff Design',
    businessSummary: 'Defines how the Discount Exception Agent hands off to human approvers. Includes Slack notification design and SLA enforcement rules.',
    technicalArtifact: 'AgentDesign_DiscountException_v1.md',
    status: 'active',
    timestamp: 'Updated 3 hours ago',
    evidence: 'Based on approved future-state design',
    hasAgent: false,
    icon: Bot,
    sfLink: null,
  },

  // ── Understand CPQ State ─────────────────────────────
  {
    id: 'uc-approval',
    column: 'understand',
    title: 'Advanced Approval Rule Chain',
    businessSummary: '8 approval branches routing discounts by tier (10%, 15%, 20%, 25%). VP override path for strategic accounts. 3 approval chains with sequential routing.',
    technicalArtifact: 'sbaa__ApprovalRule__c × 8 · sbaa__ApprovalChain__c × 3',
    status: 'complete',
    timestamp: 'Analyzed 4 days ago',
    evidence: '8 rules extracted · all branches documented',
    hasAgent: false,
    icon: GitBranch,
    sfLink: { label: 'View CPQ Rule', url: '#' },
  },
  {
    id: 'uc-qcp',
    column: 'understand',
    title: 'QCP Margin Calculation',
    businessSummary: '3 QCP scripts compute blended margin, enforce floor price, and flag negative-margin lines. Script 2 depends on ERP cost field sync.',
    technicalArtifact: 'SBQQ__CustomScript__c × 3 · MarginCalcHelper.cls',
    status: 'complete',
    timestamp: 'Analyzed 3 days ago',
    evidence: '3 scripts decompiled · ERP dependency documented',
    hasAgent: false,
    icon: Calculator,
    sfLink: { label: 'View QCP Script', url: '#' },
  },
  {
    id: 'uc-price',
    column: 'understand',
    title: 'Price Rule Conditions',
    businessSummary: '12 price rules in defined execution order. 34 conditions reference region, product family, account tier, and custom fields.',
    technicalArtifact: 'SBQQ__PriceRule__c × 12 · SBQQ__PriceCondition__c × 34',
    status: 'complete',
    timestamp: 'Analyzed 3 days ago',
    evidence: '12 rules mapped · 9 translate to Pricing Procedures',
    hasAgent: false,
    icon: Settings,
    sfLink: { label: 'View CPQ Rule', url: '#' },
  },

  // ── Build RCA/ARM State ──────────────────────────────
  {
    id: 'br-pricing',
    column: 'build',
    title: 'Pricing Procedure Draft',
    businessSummary: 'Declarative pricing procedure replacing 12 CPQ price rules. Discount tiers stored as Custom Metadata for admin-editable configuration.',
    technicalArtifact: 'PricingProcedure_DiscountException_v1',
    status: 'active',
    timestamp: 'Generated 1 hour ago',
    evidence: 'Auto-generated from mapped price rules',
    hasAgent: false,
    icon: FileCode,
    sfLink: { label: 'Open RCA Draft', url: '#' },
  },
  {
    id: 'br-flow',
    column: 'build',
    title: 'Approval Flow Orchestration',
    businessSummary: 'ARM Advanced Approvals flow with tier-based routing, auto-escalation at 25%, and SLA timer (24h reminder, 48h escalation).',
    technicalArtifact: 'Flow_EnterpriseDiscountApproval',
    status: 'active',
    timestamp: 'Generated 1 hour ago',
    evidence: 'Based on approval owner matrix',
    hasAgent: false,
    icon: Workflow,
    sfLink: { label: 'Open Flow Draft', url: '#' },
  },
  {
    id: 'br-agent',
    column: 'build',
    title: 'Discount Exception Agent',
    businessSummary: 'AI Agent agent for discount exception triage. Recommends optimal discount, routes approvals, tracks SLA. Replaces manual Slack/email handoff.',
    technicalArtifact: 'AIAgentTopic_DiscountException · SlackAction_ManagerApproval',
    status: 'needs-validation',
    timestamp: 'Generated 45 min ago',
    evidence: 'Built from approved agent design spec',
    hasAgent: true,
    icon: Bot,
    sfLink: { label: 'Open AI Agent Draft', url: '#' },
  },
  {
    id: 'br-knowledge',
    column: 'build',
    title: 'Knowledge Capture Hooks',
    businessSummary: 'Every approval/rejection decision feeds the Knowledge Engine. Pattern matching enabled for future recommendations. Compliance audit trail auto-generated.',
    technicalArtifact: 'KnowledgeHook_DiscountDecision · AuditTrail_Config',
    status: 'not-started',
    timestamp: 'Scheduled',
    evidence: 'Pending agent validation',
    hasAgent: false,
    icon: Brain,
    sfLink: null,
  },

  // ── Deploy & Test ────────────────────────────────────
  {
    id: 'dt-sandbox',
    column: 'deploy',
    title: 'Sandbox Deployment Package',
    businessSummary: 'Deployment package containing pricing procedure, approval flow, AI topic, and test data. Targets Vector Systems sandbox org.',
    technicalArtifact: 'DeployPackage_DiscountException_v1.zip',
    status: 'not-started',
    timestamp: 'Pending build completion',
    evidence: 'Awaiting all build artifacts',
    hasAgent: false,
    icon: Package,
    sfLink: null,
  },
  {
    id: 'dt-routing',
    column: 'deploy',
    title: 'Approval Routing Test',
    businessSummary: 'Validates all 4 discount tiers route to correct approvers. Tests VP override for strategic accounts. Verifies SLA timer triggers.',
    technicalArtifact: 'TestScenario_APPROVAL_ROUTING × 4',
    status: 'not-started',
    timestamp: 'Pending deployment',
    evidence: '4 test scenarios prepared',
    hasAgent: false,
    icon: Route,
    sfLink: null,
  },
  {
    id: 'dt-agent',
    column: 'deploy',
    title: 'AI Simulation Test',
    businessSummary: 'End-to-end test of Discount Exception Agent. Simulates discount request, agent recommendation, Slack approval, and Knowledge Engine capture.',
    technicalArtifact: 'TestScenario_MARGIN_LT_60 · TestScenario_STRATEGIC_ACCOUNT',
    status: 'not-started',
    timestamp: 'Pending deployment',
    evidence: '2 simulation scenarios prepared',
    hasAgent: false,
    icon: TestTube,
    sfLink: { label: 'View Test Run', url: '#' },
  },
  {
    id: 'dt-uat',
    column: 'deploy',
    title: 'Business UAT Checklist',
    businessSummary: 'User acceptance testing checklist for Client Business User. Covers discount submission, approval experience, notification quality, and reporting.',
    technicalArtifact: 'UAT_DiscountException_Checklist_v1.xlsx',
    status: 'not-started',
    timestamp: 'Pending simulation pass',
    evidence: '12 acceptance criteria defined',
    hasAgent: false,
    icon: CheckSquare,
    sfLink: null,
  },
];

/* ── Status config ──────────────────────────────────────────────────── */

export const STATUS_CONFIG: Record<CardStatus, { label: string; color: string; bg: string; border: string }> = {
  complete:          { label: 'Complete',         color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  active:            { label: 'In Progress',      color: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200' },
  'needs-validation':{ label: 'Needs Validation', color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200' },
  ready:             { label: 'Ready for Test',   color: 'text-violet-700',  bg: 'bg-violet-50',  border: 'border-violet-200' },
  'not-started':     { label: 'Not Started',      color: 'text-gray-500',    bg: 'bg-gray-50',    border: 'border-gray-200' },
};

/* ── Agent questions ────────────────────────────────────────────────── */

export interface AgentQuestionOption {
  id: string;
  label: string;
}

export interface AgentQuestion {
  id: string;
  question: string;
  options: AgentQuestionOption[];
}

export const IMPL_AGENT_QUESTIONS: AgentQuestion[] = [
  {
    id: 'iq1',
    question: 'Who should receive the first Slack approval when discount >25% and margin <60%?',
    options: [
      { id: 'iq1-a', label: 'Sales Manager' },
      { id: 'iq1-b', label: 'Deal Desk' },
      { id: 'iq1-c', label: 'Finance Ops' },
    ],
  },
  {
    id: 'iq2',
    question: 'Should Finance receive the request only after manager approval?',
    options: [
      { id: 'iq2-a', label: 'Yes, route sequentially' },
      { id: 'iq2-b', label: 'No, route in parallel' },
      { id: 'iq2-c', label: 'Ask Finance owner' },
    ],
  },
];

/* ── Live activity feed ─────────────────────────────────────────────── */

export interface ActivityItem {
  id: string;
  message: string;
  icon: LucideIcon;
  timestamp: string;
  type: 'build' | 'generate' | 'agent' | 'waiting' | 'test';
}

export const BUILD_ACTIVITIES: ActivityItem[] = [
  { id: 'ba1', message: 'Generated pricing procedure draft from 12 mapped price rules', icon: FileCode, timestamp: '1 hour ago', type: 'generate' },
  { id: 'ba2', message: 'Created approval flow orchestration with 4-tier routing', icon: Workflow, timestamp: '1 hour ago', type: 'build' },
  { id: 'ba3', message: 'Built AI topic and 3 agent actions', icon: Bot, timestamp: '45 min ago', type: 'agent' },
  { id: 'ba4', message: 'Added Slack manager approval action with SLA enforcement', icon: MessageSquare, timestamp: '40 min ago', type: 'build' },
  { id: 'ba5', message: 'Waiting on Finance escalation validation before deployment', icon: Search, timestamp: '35 min ago', type: 'waiting' },
  { id: 'ba6', message: 'Prepared 6 test scenarios for sandbox simulation', icon: TestTube, timestamp: '20 min ago', type: 'test' },
];
