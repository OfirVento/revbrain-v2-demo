// ── SI Architect Command Center — Mock Data ─────────────────────────
// Static demo data for the Vector Systems migration project.
// All data is local — no backend required.

import type { LucideIcon } from 'lucide-react';
import {
  DollarSign,
  Package,
  FileText,
  Bot,
  Search,
  GitBranch,
  MessageSquare,
  Brain,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
} from 'lucide-react';

/* ── Project overview ───────────────────────────────────────────────── */

export interface ProjectStatus {
  projectName: string;
  customer: string;
  customerIndustry: string;
  stage: string;
  currentPhase: string;
  overallProgress: number; // 0-100
  knowledgeConfidence: number; // 0-100
  targetGoLive: string;
  currentBlocker: string;
  nextAction: string;
  daysRemaining: number;
}

export const PROJECT_STATUS: ProjectStatus = {
  projectName: 'Vector Systems CPQ → RCA/ARM',
  customer: 'Vector Systems',
  customerIndustry: 'B2B SaaS / High-Tech',
  stage: 'Implementation',
  currentPhase: 'Map / Prioritize',
  overallProgress: 38,
  knowledgeConfidence: 76,
  targetGoLive: 'Aug 12',
  currentBlocker: '4 client questions pending',
  nextAction: 'Validate Enterprise Discount Approval',
  daysRemaining: 49,
};

/* ── Migration phases ───────────────────────────────────────────────── */

export type PhaseStatus = 'complete' | 'active' | 'starting' | 'not-started';

export interface MigrationPhase {
  id: string;
  label: string;
  status: PhaseStatus;
  owner: string;
  signal: string;
  progress?: number; // 0-100, only for active/starting
}

export const MIGRATION_PHASES: MigrationPhase[] = [
  {
    id: 'assess',
    label: 'Assess',
    status: 'complete',
    owner: 'RevBrain AI',
    signal: '42 rules scanned',
  },
  {
    id: 'map',
    label: 'Map / Prioritize',
    status: 'active',
    owner: 'You',
    signal: '12 of 31 processes mapped',
    progress: 38,
  },
  {
    id: 'design',
    label: 'Design Future State',
    status: 'starting',
    owner: 'RevBrain AI',
    signal: 'Awaiting map completion',
    progress: 5,
  },
  {
    id: 'implement',
    label: 'Implementation',
    status: 'not-started',
    owner: 'Architect',
    signal: 'Blocked on design',
  },
  {
    id: 'golive',
    label: 'Go-Live Readiness',
    status: 'not-started',
    owner: 'Team',
    signal: 'Not started',
  },
];

/* ── Attention cards ────────────────────────────────────────────────── */

export interface AttentionCard {
  id: string;
  label: string;
  metric: string;
  subtext: string;
  icon: LucideIcon;
  color: string; // tailwind text color
  bgColor: string; // tailwind bg color
}

export const ATTENTION_CARDS: AttentionCard[] = [
  {
    id: 'revenue-critical',
    label: 'Revenue-Critical Processes',
    metric: '6',
    subtext: '3 high priority · 2 mapped · 1 blocked',
    icon: DollarSign,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    id: 'client-questions',
    label: 'Questions for Client',
    metric: '4',
    subtext: 'Avg 2.3 days waiting · 1 overdue',
    icon: MessageSquare,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'ai-opportunities',
    label: 'AI-First Opportunities',
    metric: '7',
    subtext: '3 approval flows · 2 pricing automations · 2 analytics',
    icon: Bot,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    id: 'knowledge-captured',
    label: 'Knowledge Captured This Week',
    metric: '+23',
    subtext: '14 rules · 6 patterns · 3 exceptions',
    icon: Brain,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
];

/* ── Revenue-critical processes ─────────────────────────────────────── */

export type ProcessPriority = 'critical' | 'high' | 'medium';

export interface RevenueCriticalProcess {
  id: string;
  name: string;
  priority: ProcessPriority;
  revenueSignal: string;
  complexity: string;
  complexityLevel: 'high' | 'medium' | 'low';
  recommendedAction: string;
  futureState: string;
  agentStatus: string;
  isPrimaryDemo: boolean;
}

export const REVENUE_CRITICAL_PROCESSES: RevenueCriticalProcess[] = [
  {
    id: 'eda',
    name: 'Enterprise Discount Approval / Pricing Exception',
    priority: 'critical',
    revenueSignal: '$14.2M ARR impacted · 340 approvals/quarter',
    complexity: '8 approval branches · 3 QCP scripts · custom Apex triggers',
    complexityLevel: 'high',
    recommendedAction: 'Validate approval matrix with VP Sales before design',
    futureState: 'ARM Advanced Approvals + BRE Expression Sets',
    agentStatus: 'Analyzing discount patterns',
    isPrimaryDemo: true,
  },
  {
    id: 'bcr',
    name: 'Bundle Configuration Rules',
    priority: 'high',
    revenueSignal: '$8.7M ARR · 14 product bundles',
    complexity: '14 product rules · 6 feature constraints · 2 lookup tables',
    complexityLevel: 'medium',
    recommendedAction: 'Map feature constraints to Product Configurator',
    futureState: 'Product Configurator + Custom Metadata',
    agentStatus: 'Mapped 9 of 14 rules',
    isPrimaryDemo: false,
  },
  {
    id: 'cpe',
    name: 'Contracted Pricing Exceptions',
    priority: 'high',
    revenueSignal: '$6.1M ARR · 89 active contracts',
    complexity: '4 price rules · 2 QCP scripts · customer-specific overrides',
    complexityLevel: 'medium',
    recommendedAction: 'Catalog override patterns before implementation',
    futureState: 'Pricing Procedures + Contract Lifecycle Mgmt',
    agentStatus: 'Awaiting client pricing matrix',
    isPrimaryDemo: false,
  },
];

/* ── Agent activity feed ────────────────────────────────────────────── */

export interface AgentActivity {
  id: string;
  message: string;
  icon: LucideIcon;
  timestamp: string;
  type: 'analysis' | 'discovery' | 'pattern' | 'question' | 'knowledge';
}

export const AGENT_ACTIVITIES: AgentActivity[] = [
  {
    id: 'a1',
    message: 'Analyzed 12 discount rules across 3 pricing tiers',
    icon: Search,
    timestamp: '2 min ago',
    type: 'analysis',
  },
  {
    id: 'a2',
    message: 'Found 3 approval branches needing human context',
    icon: AlertTriangle,
    timestamp: '8 min ago',
    type: 'discovery',
  },
  {
    id: 'a3',
    message: 'Matched 8 similar enterprise discount patterns from knowledge base',
    icon: GitBranch,
    timestamp: '14 min ago',
    type: 'pattern',
  },
  {
    id: 'a4',
    message: 'Sent 1 question to Client Admin: Regional discount ceiling clarification',
    icon: MessageSquare,
    timestamp: '22 min ago',
    type: 'question',
  },
  {
    id: 'a5',
    message: 'Updated Knowledge Engine confidence +8% (discount domain)',
    icon: Brain,
    timestamp: '31 min ago',
    type: 'knowledge',
  },
];

/* ── Status helpers ─────────────────────────────────────────────────── */

export const PHASE_STATUS_CONFIG: Record<
  PhaseStatus,
  { icon: LucideIcon; label: string; color: string; bgColor: string }
> = {
  complete: {
    icon: CheckCircle2,
    label: 'Complete',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  active: {
    icon: Clock,
    label: 'Active',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  starting: {
    icon: Circle,
    label: 'Starting',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  'not-started': {
    icon: Circle,
    label: 'Not Started',
    color: 'text-gray-400',
    bgColor: 'bg-gray-50',
  },
};
