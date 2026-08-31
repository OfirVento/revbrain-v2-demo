// ── Migration Map — Mock Data ───────────────────────────────────────
// Process cards, detail panels, agent questions for the Map / Prioritize view.

import {
  DollarSign,
  Package,
  FileText,
  Percent,
  Handshake,
  Mail,
  Tag,
  Archive,
  type LucideIcon,
} from 'lucide-react';

/* ── Priority buckets ───────────────────────────────────────────────── */

export type BucketId = 'must-migrate' | 'should-migrate' | 'redesign' | 'do-not-migrate';

export interface PriorityBucket {
  id: BucketId;
  label: string;
  color: string;      // tailwind text color
  bgColor: string;     // tailwind bg color
  borderColor: string; // tailwind border color
  dotColor: string;    // tailwind bg for dot
}

export const PRIORITY_BUCKETS: PriorityBucket[] = [
  {
    id: 'must-migrate',
    label: 'Must Migrate',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    dotColor: 'bg-rose-500',
  },
  {
    id: 'should-migrate',
    label: 'Should Migrate',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    dotColor: 'bg-amber-500',
  },
  {
    id: 'redesign',
    label: 'Redesign / Simplify',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    dotColor: 'bg-blue-500',
  },
  {
    id: 'do-not-migrate',
    label: 'Do Not Migrate',
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    dotColor: 'bg-gray-400',
  },
];

/* ── Process cards ──────────────────────────────────────────────────── */

export type DecisionState = 'migrate' | 'redesign' | 'do-not-migrate' | 'ask-client' | 'si-review' | 'pending';

export interface ProcessCard {
  id: string;
  name: string;
  bucket: BucketId;
  icon: LucideIcon;
  usageSignal: string;
  revenueSignal: string;
  complexity: string;
  recommendation: string;
  decision: DecisionState;
  hasAgentContext: boolean;
}

export const PROCESS_CARDS: ProcessCard[] = [
  // Must migrate
  {
    id: 'eda',
    name: 'Enterprise Discount Approval / Pricing Exception',
    bucket: 'must-migrate',
    icon: DollarSign,
    usageSignal: '340 approvals/quarter · 97% usage rate',
    revenueSignal: '$14.2M ARR impacted',
    complexity: '8 approval branches · 3 QCP scripts · custom Apex',
    recommendation: 'Migrate with AI-first redesign for approval routing',
    decision: 'migrate',
    hasAgentContext: true,
  },
  {
    id: 'bcr',
    name: 'Bundle Configuration Rules',
    bucket: 'must-migrate',
    icon: Package,
    usageSignal: '14 bundles · 89% attach rate',
    revenueSignal: '$8.7M ARR',
    complexity: '14 product rules · 6 feature constraints',
    recommendation: 'Direct migration to Product Configurator',
    decision: 'migrate',
    hasAgentContext: false,
  },
  // Should migrate
  {
    id: 'cpe',
    name: 'Contracted Pricing Exceptions',
    bucket: 'should-migrate',
    icon: FileText,
    usageSignal: '89 active contracts · used monthly',
    revenueSignal: '$6.1M ARR',
    complexity: '4 price rules · 2 QCP scripts',
    recommendation: 'Migrate pricing logic, archive expired overrides',
    decision: 'migrate',
    hasAgentContext: false,
  },
  {
    id: 'rul',
    name: 'Renewal Uplift Logic',
    bucket: 'should-migrate',
    icon: Percent,
    usageSignal: '120 renewals/quarter · 78% auto-applied',
    revenueSignal: '$4.3M ARR uplift',
    complexity: '3 price rules · 1 QCP script',
    recommendation: 'Migrate and automate with AI Agent',
    decision: 'pending',
    hasAgentContext: false,
  },
  // Redesign
  {
    id: 'lpd',
    name: 'Legacy Partner Discount Overrides',
    bucket: 'redesign',
    icon: Handshake,
    usageSignal: '23 partners · declining usage',
    revenueSignal: '$2.1M ARR (shrinking)',
    complexity: '6 price rules · manual CSV uploads',
    recommendation: 'Simplify to metadata-driven partner tiers',
    decision: 'redesign',
    hasAgentContext: false,
  },
  {
    id: 'mdr',
    name: 'Manual Deal Desk Email Review',
    bucket: 'redesign',
    icon: Mail,
    usageSignal: '~40 emails/week · no SLA tracking',
    revenueSignal: 'Indirect — delays close rate',
    complexity: 'Custom Apex + email handler + manual routing',
    recommendation: 'Replace with AI Agent deal desk agent',
    decision: 'redesign',
    hasAgentContext: true,
  },
  // Do not migrate
  {
    id: 'dpc',
    name: 'Deprecated Promo Code Rules',
    bucket: 'do-not-migrate',
    icon: Tag,
    usageSignal: '0 usage last 6 months',
    revenueSignal: '$0 — fully deprecated',
    complexity: '8 price rules · orphaned',
    recommendation: 'Archive and document for compliance',
    decision: 'do-not-migrate',
    hasAgentContext: false,
  },
  {
    id: 'ilp',
    name: 'Inactive Legacy Product Add-ons',
    bucket: 'do-not-migrate',
    icon: Archive,
    usageSignal: 'Last quote: 14 months ago',
    revenueSignal: '$0 — sunset products',
    complexity: '4 product rules · 2 lookup tables',
    recommendation: 'Do not migrate — sunset confirmed by product team',
    decision: 'do-not-migrate',
    hasAgentContext: false,
  },
];

/* ── Enterprise Discount Approval — Detail panels ───────────────────── */

export interface EvidenceChip {
  label: string;
  source: string;
}

export interface CurrentStateItem {
  label: string;
  detail: string;
  evidence: EvidenceChip[];
}

export const CURRENT_STATE: CurrentStateItem[] = [
  {
    label: 'Advanced Approval Rule Chain',
    detail: '8-branch approval tree. Discount thresholds at 10%, 15%, 20%, 25%. Each tier routes to different approver persona. VP override path for strategic accounts.',
    evidence: [
      { label: 'Approval Rules', source: 'sbaa__ApprovalRule__c × 8' },
      { label: 'Approval Chain', source: 'sbaa__ApprovalChain__c × 3' },
    ],
  },
  {
    label: 'Price Rule + Condition Logic',
    detail: 'Price waterfall calculates net-net after volume, partner, and promotional discounts. 12 rules execute in defined sequence. Conditions reference custom fields.',
    evidence: [
      { label: 'Price Rules', source: 'SBQQ__PriceRule__c × 12' },
      { label: 'Conditions', source: 'SBQQ__PriceCondition__c × 34' },
    ],
  },
  {
    label: 'QCP Margin Calculation',
    detail: 'Three QCP scripts compute blended margin, apply floor price enforcement, and flag negative-margin lines. Script 2 depends on custom cost field from ERP sync.',
    evidence: [
      { label: 'QCP Scripts', source: 'SBQQ__CustomScript__c × 3' },
      { label: 'Apex Dependency', source: 'MarginCalcHelper.cls' },
    ],
  },
  {
    label: 'Slack / Email Exception Handoff',
    detail: 'Discounts above 25% trigger email to Deal Desk + Slack notification. Manual review with no SLA enforcement. Response time averages 2.3 days.',
    evidence: [
      { label: 'Email Alert', source: 'DiscountException_Alert' },
      { label: 'Apex Trigger', source: 'DealDeskNotifier.trigger' },
    ],
  },
];

export interface FutureStateSection {
  layer: string;
  layerColor: string;
  items: string[];
}

export const FUTURE_STATE: FutureStateSection[] = [
  {
    layer: 'RCA/ARM Foundation',
    layerColor: 'from-indigo-500 to-violet-600',
    items: [
      'Discount tiers as Custom Metadata (admin-editable)',
      'Price waterfall in Pricing Procedures',
      'Margin floor as BRE Expression Set',
      'Product catalog in Product Configurator',
    ],
  },
  {
    layer: 'Flow / Automation',
    layerColor: 'from-blue-500 to-cyan-600',
    items: [
      'ARM Advanced Approvals for tier-based routing',
      'Auto-escalation at 25% threshold',
      'SLA timer flow with reminder actions',
    ],
  },
  {
    layer: 'AI Agent',
    layerColor: 'from-violet-500 to-purple-600',
    items: [
      'Discount recommendation agent (historical patterns)',
      'Deal desk triage agent (replaces email handoff)',
      'Margin impact pre-check before submission',
    ],
  },
  {
    layer: 'Human Approval',
    layerColor: 'from-amber-500 to-orange-600',
    items: [
      'VP override for strategic accounts',
      'Finance review for margin < 40%',
      'Quarterly discount ceiling governance',
    ],
  },
  {
    layer: 'Knowledge Capture',
    layerColor: 'from-emerald-500 to-teal-600',
    items: [
      'Every approval decision feeds Knowledge Engine',
      'Pattern matching for future recommendations',
      'Compliance audit trail (auto-generated)',
    ],
  },
];

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

export const AGENT_QUESTIONS: AgentQuestion[] = [
  {
    id: 'q1',
    question: 'Should enterprise discounts above 25% always require Finance approval?',
    options: [
      { id: 'q1-a', label: 'Yes, always' },
      { id: 'q1-b', label: 'Only if margin < 60%' },
      { id: 'q1-c', label: 'Ask Finance owner' },
    ],
  },
  {
    id: 'q2',
    question: 'Should strategic accounts bypass standard discount tiers?',
    options: [
      { id: 'q2-a', label: 'Yes' },
      { id: 'q2-b', label: 'No' },
      { id: 'q2-c', label: 'Only named accounts' },
    ],
  },
];

/* ── Knowledge strip items ──────────────────────────────────────────── */

export interface KnowledgeItem {
  label: string;
  value: string;
  color: string;
}

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  { label: 'Discount rules analyzed', value: '12', color: 'text-blue-600' },
  { label: 'Approval branches need context', value: '3', color: 'text-amber-600' },
  { label: 'Similar patterns matched', value: '8', color: 'text-violet-600' },
  { label: 'Client question waiting', value: '1', color: 'text-rose-600' },
];
