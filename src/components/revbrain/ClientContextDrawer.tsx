// ── Client Context Side Panel ─────────────────────────────────────────
// Dedicated SI / FDE Client-Context workspace for Implementation Command Center.
// Provides 3 operational tabs: Open Context (with detail drilldown), Interactions Feed, and Materials Library.

import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  X,
  ArrowLeft,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Send,
  FileSpreadsheet,
  FileCode,
  Users,
  Mail,
  Hash,
  Check,
  Edit3,
} from 'lucide-react';

/* ── Types & Data ────────────────────────────────────────────────────── */

export type ContextStatus =
  | 'Blocking'
  | 'Waiting on Client'
  | 'Client Replied'
  | 'Needs SI Validation'
  | 'Draft Ready'
  | 'Confirmed';

export interface ContextMaterial {
  id: string;
  name: string;
  type: 'doc' | 'sheet' | 'policy' | 'email' | 'slack' | 'meeting';
  area: string;
  sizeOrCount?: string;
  updatedAt: string;
  url?: string;
  snippet?: string;
}

export interface ClientInquiry {
  id: string;
  title: string;
  area: 'Approvals' | 'Pricing' | 'Accounts' | 'Quotes' | 'Renewals' | 'Billing' | 'Operations';
  status: ContextStatus;
  statusDetail: string;
  owner: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  latestInteraction: {
    channel: 'Slack' | 'Email' | 'In-app' | 'Meeting';
    timeAgo: string;
    summary: string;
  };
  revbrainFinding: {
    summary: string;
    evidence: string;
    impact: string;
  };
  questionSent: {
    channel: 'Slack' | 'Email' | 'In-app' | 'Meeting';
    sentAt: string;
    targetRecipient: string;
    questionText: string;
    isDraft?: boolean;
  };
  clientResponse?: {
    author: string;
    role: string;
    respondedAt: string;
    channel: 'Slack' | 'Email' | 'Meeting';
    text: string;
    avatarInitials: string;
  };
  siValidation: {
    validated: boolean;
    validatedAt?: string;
    validatedBy?: string;
    note: string;
    clarificationNeeded?: boolean;
  };
  confirmedContext?: {
    ruleTitle: string;
    ruleDefinition: string;
    targetComponent: string;
  };
  materials: ContextMaterial[];
}

export interface ClientInteraction {
  id: string;
  stakeholder: string;
  role: string;
  channel: 'Slack' | 'Email' | 'In-app' | 'Meeting' | 'Upload';
  action: string;
  detail: string;
  timeAgo: string;
  status: 'Sent' | 'Viewed' | 'Replied' | 'Confirmed';
}

/* ── Open Context Inquiries Data (7 Existing Items with Real Working State) ── */

export const CLIENT_INQUIRIES: ClientInquiry[] = [
  {
    id: 'c1',
    title: 'Two senior managers manual sign-off rationale',
    area: 'Approvals',
    status: 'Blocking',
    statusDetail: 'Waiting on Finance',
    owner: {
      name: 'Sarah Jenkins',
      role: 'VP Finance',
      avatarInitials: 'SJ',
    },
    latestInteraction: {
      channel: 'Slack',
      timeAgo: '2h ago',
      summary: 'Asked via Slack · Waiting on Finance response',
    },
    revbrainFinding: {
      summary: 'Telemetry shows 11.4K historical approvals manually reviewed by both Sarah Jenkins and Michael Torres, with a 98.4% approval rate and 24 min avg cycle time.',
      evidence: 'Logs show 94% of deals routed have identical discount profiles (<22% standard catalog margin), suggesting redundant dual sign-off.',
      impact: 'High-ROI opportunity for automated agent approval routing (~172 hours saved quarterly).',
    },
    questionSent: {
      channel: 'Slack',
      sentAt: 'Today, 1:14 PM',
      targetRecipient: 'Sarah Jenkins (#finance-escalations)',
      questionText: 'We noticed 98.4% of non-standard discount approvals are dual-signed by both Finance Directors. Is dual sign-off strictly required for compliance, or can standard deviations (<25%) be auto-approved by RevBrain?',
      isDraft: false,
    },
    clientResponse: {
      author: 'Sarah Jenkins',
      role: 'VP Finance',
      respondedAt: 'Today, 2:40 PM',
      channel: 'Slack',
      text: 'Dual sign-off is only required when margins dip below 18% or deal ARR exceeds $500K. The current CPQ rule was configured broadly because our previous admin could not nest conditional rules.',
      avatarInitials: 'SJ',
    },
    siValidation: {
      validated: false,
      note: 'Sarah confirmed dual sign-off is only needed below 18% margin or >$500K ARR. We can model this in Revenue Cloud as a tiered approval matrix with single AI Agent delegation.',
      clarificationNeeded: false,
    },
    confirmedContext: {
      ruleTitle: 'Tiered Margin Floor Sign-off Rule',
      ruleDefinition: 'Discounts 0-25% with margin ≥18% and ARR <$500K auto-approve via Agent. Margins <18% or ARR ≥$500K escalate to Finance VP.',
      targetComponent: 'Approval Process: Deal Desk & Finance Delegation Matrix',
    },
    materials: [
      {
        id: 'm1',
        name: 'Approval Policy.pdf',
        type: 'policy',
        area: 'Approvals',
        sizeOrCount: '2.4 MB',
        updatedAt: '2h ago',
        snippet: 'Section 4.2: Commercial Approval Escalation Thresholds',
      },
      {
        id: 'm4',
        name: 'Finance Slack thread #rev-escalations',
        type: 'slack',
        area: 'Approvals',
        sizeOrCount: '14 msgs',
        updatedAt: '2h ago',
        snippet: 'Thread discussion on Q3 sign-off matrix and dual-signature relaxation',
      },
    ],
  },
  {
    id: 'c2',
    title: 'Finance margin risk threshold documented vs reality',
    area: 'Pricing',
    status: 'Blocking',
    statusDetail: 'Client replied · Needs SI validation',
    owner: {
      name: 'David Zhao',
      role: 'Director of FP&A',
      avatarInitials: 'DZ',
    },
    latestInteraction: {
      channel: 'Email',
      timeAgo: '4h ago',
      summary: 'Client replied via Email · Needs SI validation',
    },
    revbrainFinding: {
      summary: 'Documented pricing policy states a strict 20% margin floor, but system telemetry reveals 23% of closed quotes operated at 14%-18% margin through manual override codes.',
      evidence: '142 quotes in the past 12 months used the override code "EXEC_DIRECT_ALLOW" without documented justification in CPQ.',
      impact: 'Without validating the actual threshold, new Revenue Cloud pricing rules will fail quote validation on 1 in 4 enterprise deals.',
    },
    questionSent: {
      channel: 'Email',
      sentAt: 'Yesterday, 4:30 PM',
      targetRecipient: 'David Zhao (david.zhao@vectorsystems.com)',
      questionText: 'We found 23% of historical quotes bypass the 20% margin floor using code EXEC_DIRECT_ALLOW. What is the true operational margin floor we should build into Revenue Cloud rules?',
      isDraft: false,
    },
    clientResponse: {
      author: 'David Zhao',
      role: 'Director of FP&A',
      respondedAt: 'Today, 11:15 AM',
      channel: 'Email',
      text: 'For Enterprise and Strategic accounts, the true floor is 14% as long as the multi-year contract commitments exceed 24 months. 20% is strictly for SMB and mid-market.',
      avatarInitials: 'DZ',
    },
    siValidation: {
      validated: false,
      note: 'Need to cross-reference with Account Segment taxonomy to ensure Enterprise accounts are deterministically flagged before applying the 14% floor.',
      clarificationNeeded: true,
    },
    confirmedContext: {
      ruleTitle: 'Segment-Aware Margin Floor Policy',
      ruleDefinition: 'Enterprise accounts (ARR >$100K or 24+ mo commitment): 14% margin floor. SMB/Mid-Market: 20% margin floor.',
      targetComponent: 'Pricing Matrix: Price Rule — Floor Validation',
    },
    materials: [
      {
        id: 'm2',
        name: 'Pricing Matrix.xlsx',
        type: 'sheet',
        area: 'Pricing',
        sizeOrCount: '1.1 MB',
        updatedAt: '4h ago',
        snippet: 'Sheet 2: Discount & Margin Floor Rules by Customer Tier',
      },
      {
        id: 'm5',
        name: 'Email: Q3 approval process sign-off',
        type: 'email',
        area: 'Approvals',
        sizeOrCount: '3 replies',
        updatedAt: 'Yesterday',
        snippet: 'Discussion on enterprise exception thresholds and deal desk sign-offs',
      },
    ],
  },
  {
    id: 'c3',
    title: 'Strategic account exception rule path',
    area: 'Accounts',
    status: 'Draft Ready',
    statusDetail: 'Draft question ready for RevOps',
    owner: {
      name: 'Marcus Vance',
      role: 'RevOps Lead',
      avatarInitials: 'MV',
    },
    latestInteraction: {
      channel: 'Slack',
      timeAgo: '5h ago',
      summary: 'Draft question prepared · Ready to dispatch to RevOps',
    },
    revbrainFinding: {
      summary: 'Named tier-1 strategic accounts bypass standard product bundling and validation rules via custom Apex logic in CPQ quote trigger.',
      evidence: 'Detected 18 custom account flags (Is_Tier1_Strategic__c) triggering custom Apex pricing plugin calculatePrice().',
      impact: 'Need explicit operating model agreement to convert custom Apex logic into declarative Revenue Cloud product actions.',
    },
    questionSent: {
      channel: 'Slack',
      sentAt: 'Draft Ready (Not sent yet)',
      targetRecipient: 'Marcus Vance (#revops-sync)',
      questionText: 'RevBrain identified that Strategic Tier accounts currently bypass bundle dependencies. When transitioning to Revenue Cloud, should strategic accounts follow a guided override workflow or have custom catalog rulesets?',
      isDraft: true,
    },
    siValidation: {
      validated: false,
      note: 'Draft ready. Recommending guided override workflow with audit trail rather than hardcoded Apex exceptions.',
      clarificationNeeded: false,
    },
    materials: [
      {
        id: 'm7',
        name: 'Strategic Account Policy',
        type: 'policy',
        area: 'Accounts',
        sizeOrCount: '890 KB',
        updatedAt: '3d ago',
        snippet: 'Named Account Executive Sponsorship & Custom Commercial Terms',
      },
    ],
  },
  {
    id: 'c4',
    title: 'Repricing behavior post-approval lock',
    area: 'Quotes',
    status: 'Waiting on Client',
    statusDetail: 'Waiting on SalesOps',
    owner: {
      name: 'Elena Rostova',
      role: 'SalesOps Director',
      avatarInitials: 'ER',
    },
    latestInteraction: {
      channel: 'Email',
      timeAgo: '1d ago',
      summary: 'Asked via Email · Email read receipt received',
    },
    revbrainFinding: {
      summary: 'In legacy CPQ, editing a line item after quote approval unlocks the quote without invalidating prior approvals, causing revenue recognition discrepancies.',
      evidence: '47 approved quotes had net price modified post-signature prior to contract generation in FY2025.',
      impact: 'Critical compliance risk for SOX compliance and RevRec accuracy.',
    },
    questionSent: {
      channel: 'Email',
      sentAt: 'Yesterday, 2:15 PM',
      targetRecipient: 'Elena Rostova (elena.rostova@vectorsystems.com)',
      questionText: 'When a quote line item is edited post-approval, should the quote status revert to Draft and require re-approval, or should price recalculation lock automatically?',
      isDraft: false,
    },
    siValidation: {
      validated: false,
      note: 'Awaiting Elena confirmation. Strong recommendation is to enforce strict immutable quote lock once approved.',
      clarificationNeeded: false,
    },
    materials: [
      {
        id: 'm6',
        name: 'Client discovery notes — Vector Systems',
        type: 'meeting',
        area: 'Quotes',
        sizeOrCount: 'Doc',
        updatedAt: '2d ago',
        snippet: 'Notes on quote lock state machine and signature handoff',
      },
    ],
  },
  {
    id: 'c5',
    title: 'Grandfathered multi-year contract renewals',
    area: 'Renewals',
    status: 'Needs SI Validation',
    statusDetail: 'Client replied · Needs SI validation',
    owner: {
      name: 'David Kim',
      role: 'Deal Desk Lead',
      avatarInitials: 'DK',
    },
    latestInteraction: {
      channel: 'Slack',
      timeAgo: '6h ago',
      summary: 'Client replied via Slack · Needs SI validation',
    },
    revbrainFinding: {
      summary: 'Legacy 3-year contracts include a 5% fixed annual renewal uplift clause, but the current Revenue Cloud catalog default applies an 8% standard inflation rate.',
      evidence: '64 enterprise subscription contracts contain custom contract terms (Contract_Uplift_Cap__c = 5.0).',
      impact: 'Automated renewal generation must preserve grandfathered contract terms to prevent customer billing disputes.',
    },
    questionSent: {
      channel: 'Slack',
      sentAt: 'Today, 9:20 AM',
      targetRecipient: 'David Kim (#deal-desk)',
      questionText: 'How should grandfathered 5% uplift caps on legacy multi-year contracts be handled in Revenue Cloud automated renewals?',
      isDraft: false,
    },
    clientResponse: {
      author: 'David Kim',
      role: 'Deal Desk Lead',
      respondedAt: 'Today, 11:55 AM',
      channel: 'Slack',
      text: 'Legacy contracts must honor the 5% cap for the first renewal cycle. Any subsequent renewal after year 4 shifts to standard 8% inflation rate.',
      avatarInitials: 'DK',
    },
    siValidation: {
      validated: false,
      note: 'Confirmed with Deal Desk. We need to map Contract_Uplift_Cap__c as a subscribed asset attribute that expires after 1 renewal cycle.',
      clarificationNeeded: false,
    },
    confirmedContext: {
      ruleTitle: 'Grandfathered Renewal Rate Preservation',
      ruleDefinition: 'Contracted uplift cap (5%) persists for first renewal term; resets to standard 8% rate upon contract renegotiation.',
      targetComponent: 'Asset & Contract Engine: Renewal Rule — Uplift Preservation',
    },
    materials: [
      {
        id: 'm3',
        name: 'Renewal Policy.docx',
        type: 'doc',
        area: 'Renewals',
        sizeOrCount: '480 KB',
        updatedAt: 'Yesterday',
        snippet: 'Section 3.1: Grandfathered Contract Renewal Protection Terms',
      },
    ],
  },
  {
    id: 'c6',
    title: 'EMEA multi-currency rounding rules',
    area: 'Billing',
    status: 'Confirmed',
    statusDetail: 'Confirmed with Billing Ops',
    owner: {
      name: 'Claire Dupont',
      role: 'Billing Ops Lead',
      avatarInitials: 'CD',
    },
    latestInteraction: {
      channel: 'Meeting',
      timeAgo: 'Yesterday',
      summary: 'Confirmed during Weekly Architecture Sync',
    },
    revbrainFinding: {
      summary: 'Currency conversion rounding variations (EUR & JPY) created ±$0.02 reconciliation variances between quote lines and invoice schedules.',
      evidence: 'Analyzed 320 cross-border invoices in EMEA org with line-level conversion differences.',
      impact: 'Billing schedule generation must align with EMEA tax and ISO 4217 standard calculation rules.',
    },
    questionSent: {
      channel: 'Meeting',
      sentAt: 'Yesterday, 10:00 AM',
      targetRecipient: 'Claire Dupont (Weekly Architecture Sync)',
      questionText: 'Should multi-currency conversion rounding be calculated at the line item level or aggregated at the quote total level?',
      isDraft: false,
    },
    clientResponse: {
      author: 'Claire Dupont',
      role: 'Billing Ops Lead',
      respondedAt: 'Yesterday, 10:35 AM',
      channel: 'Meeting',
      text: 'Line items maintain 4 decimal precision internally; rounding to 2 decimals occurs only on final invoice schedule totals to ensure ERP ledger matching.',
      avatarInitials: 'CD',
    },
    siValidation: {
      validated: true,
      validatedAt: 'Yesterday, 11:20 AM',
      validatedBy: 'SI Solution Architect',
      note: 'Rule validated and confirmed with Billing Ops. Configured 4-decimal precision on QuoteLineItem.UnitPrice and 2-decimal rounding on InvoiceLineItem.',
      clarificationNeeded: false,
    },
    confirmedContext: {
      ruleTitle: 'ISO Multi-Currency Decimal Precision Standard',
      ruleDefinition: '4-decimal internal precision on quote line calculations; 2-decimal rounded precision on invoice schedule generation.',
      targetComponent: 'Billing Engine: Currency Conversion & Schedule Formatting',
    },
    materials: [
      {
        id: 'm8',
        name: 'Multi-Currency Conversion Schedule 2026',
        type: 'sheet',
        area: 'Billing',
        sizeOrCount: '650 KB',
        updatedAt: '4d ago',
        snippet: 'EMEA & APAC Exchange Rate Sync and Rounding Rules',
      },
    ],
  },
  {
    id: 'c7',
    title: 'Deal Desk SLA on urgent quarter-end quotes',
    area: 'Operations',
    status: 'Waiting on Client',
    statusDetail: 'Waiting on Deal Desk VP',
    owner: {
      name: 'Thomas Wright',
      role: 'VP Deal Desk',
      avatarInitials: 'TW',
    },
    latestInteraction: {
      channel: 'In-app',
      timeAgo: '3h ago',
      summary: 'Inquiry prompt dispatched in workspace',
    },
    revbrainFinding: {
      summary: 'Quarter-end deal cycles suffer 48hr turnaround delays due to batch Deal Desk queueing without priority classification.',
      evidence: 'Average approval turnaround extends from 4.2 hours in month 1 to 48.6 hours in final 5 days of quarter.',
      impact: 'Implementing automated priority routing will recover ~14% at-risk revenue at quarter-close.',
    },
    questionSent: {
      channel: 'In-app',
      sentAt: 'Today, 12:00 PM',
      targetRecipient: 'Thomas Wright (In-app Prompt)',
      questionText: 'What criteria should elevate an in-flight quote to "Urgent Quarter-End SLA" (e.g. ARR >$250K, close date within 72 hrs, or executive flag)?',
      isDraft: false,
    },
    siValidation: {
      validated: false,
      note: 'Waiting for Thomas to define priority thresholds for the final 5 days of quarter.',
      clarificationNeeded: false,
    },
    materials: [
      {
        id: 'm6',
        name: 'Client discovery notes — Vector Systems',
        type: 'meeting',
        area: 'Operations',
        sizeOrCount: 'Doc',
        updatedAt: '2d ago',
        snippet: 'Deal Desk SLA bottlenecks and quarter-end escalation workflows',
      },
    ],
  },
];

/* ── Client Interactions Feed Data ───────────────────────────────────── */

export const CLIENT_INTERACTIONS: ClientInteraction[] = [
  {
    id: 'int-1',
    stakeholder: 'Sarah Jenkins',
    role: 'VP Finance',
    channel: 'Slack',
    action: 'replied in Slack #finance-escalations',
    detail: '"Dual sign-off is only required when margins dip below 18% or deal ARR exceeds $500K..."',
    timeAgo: '2h ago',
    status: 'Replied',
  },
  {
    id: 'int-2',
    stakeholder: 'SI Solution Architect',
    role: 'Lead Architect',
    channel: 'In-app',
    action: 'confirmed pricing policy rule update',
    detail: 'Validated segment-aware margin floor rule for Enterprise tier accounts in workspace.',
    timeAgo: '3h ago',
    status: 'Confirmed',
  },
  {
    id: 'int-3',
    stakeholder: 'David Zhao',
    role: 'Director of FP&A',
    channel: 'Email',
    action: 'replied via Email on margin floor threshold',
    detail: '"For Enterprise and Strategic accounts, the true floor is 14% with 24+ mo commitments..."',
    timeAgo: '4h ago',
    status: 'Replied',
  },
  {
    id: 'int-4',
    stakeholder: 'RevBrain Agent',
    role: 'AI System',
    channel: 'Slack',
    action: 'sent question to RevOps (Marcus Vance)',
    detail: 'Inquiry dispatched regarding strategic tier product bundle exception path.',
    timeAgo: '5h ago',
    status: 'Sent',
  },
  {
    id: 'int-5',
    stakeholder: 'Sarah Jenkins',
    role: 'VP Finance',
    channel: 'Upload',
    action: 'uploaded Approval Policy.pdf',
    detail: 'Attached updated 2026 Commercial Approval Matrix to Approvals context workstream.',
    timeAgo: '6h ago',
    status: 'Confirmed',
  },
  {
    id: 'int-6',
    stakeholder: 'David Kim',
    role: 'Deal Desk Lead',
    channel: 'Slack',
    action: 'replied in Slack #deal-desk on renewal uplifts',
    detail: '"Legacy contracts must honor the 5% cap for the first renewal cycle..."',
    timeAgo: '6h ago',
    status: 'Replied',
  },
  {
    id: 'int-7',
    stakeholder: 'Claire Dupont',
    role: 'Billing Ops Lead',
    channel: 'Meeting',
    action: 'confirmed multi-currency decimal precision',
    detail: 'Agreed on 4-decimal calculation internally and 2-decimal invoice rounding standard.',
    timeAgo: 'Yesterday',
    status: 'Confirmed',
  },
  {
    id: 'int-8',
    stakeholder: 'Elena Rostova',
    role: 'SalesOps Director',
    channel: 'Email',
    action: 'viewed quote repricing inquiry email',
    detail: 'Email read receipt registered; awaiting formal response after weekly ops review.',
    timeAgo: '1d ago',
    status: 'Viewed',
  },
];

/* ── Supporting Materials Library Data ───────────────────────────────── */

export const ALL_MATERIALS: ContextMaterial[] = [
  {
    id: 'mat-1',
    name: 'Approval Policy.pdf',
    type: 'policy',
    area: 'Approvals',
    sizeOrCount: '2.4 MB',
    updatedAt: '2h ago',
    snippet: 'Official corporate governance policy for commercial approvals, executive thresholds, and delegation rules.',
  },
  {
    id: 'mat-2',
    name: 'Pricing Matrix.xlsx',
    type: 'sheet',
    area: 'Pricing',
    sizeOrCount: '1.1 MB',
    updatedAt: '4h ago',
    snippet: 'Comprehensive catalog matrix detailing baseline list price, volume tiers, and margin floors by account segment.',
  },
  {
    id: 'mat-3',
    name: 'Renewal Policy.docx',
    type: 'doc',
    area: 'Renewals',
    sizeOrCount: '480 KB',
    updatedAt: 'Yesterday',
    snippet: 'Standard terms for auto-renewals, inflation adjustment caps, and grandfathered multi-year contract amendments.',
  },
  {
    id: 'mat-4',
    name: 'Finance Slack thread #rev-escalations',
    type: 'slack',
    area: 'Approvals',
    sizeOrCount: '14 msgs',
    updatedAt: '2h ago',
    snippet: 'Live discussion between Sarah Jenkins and SI Architect regarding dual sign-off relaxation criteria.',
  },
  {
    id: 'mat-5',
    name: 'Email: Q3 approval process sign-off',
    type: 'email',
    area: 'Approvals',
    sizeOrCount: '3 replies',
    updatedAt: 'Yesterday',
    snippet: 'Executive sign-off from VP Finance on exception routing rules for deals exceeding $500K ARR.',
  },
  {
    id: 'mat-6',
    name: 'Client discovery notes — Vector Systems',
    type: 'meeting',
    area: 'Architecture',
    sizeOrCount: 'Meeting Doc',
    updatedAt: '2d ago',
    snippet: 'Detailed findings and stakeholder interview notes captured during the initial CPQ assessment phase.',
  },
  {
    id: 'mat-7',
    name: 'Strategic Account Policy',
    type: 'policy',
    area: 'Accounts',
    sizeOrCount: '890 KB',
    updatedAt: '3d ago',
    snippet: 'Rules governing named Tier-1 strategic customer contracts, bespoke discounting, and executive sponsor sign-offs.',
  },
  {
    id: 'mat-8',
    name: 'Multi-Currency Conversion Schedule 2026',
    type: 'sheet',
    area: 'Billing',
    sizeOrCount: '650 KB',
    updatedAt: '4d ago',
    snippet: 'Corporate FX table and rounding precision standards across EMEA (EUR/GBP) and APAC (JPY/SGD) currencies.',
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────── */

function getStatusBadgeClass(status: ContextStatus) {
  switch (status) {
    case 'Blocking':
      return 'bg-rose-50 text-rose-800 border-rose-200';
    case 'Waiting on Client':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'Client Replied':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'Needs SI Validation':
      return 'bg-violet-50 text-violet-800 border-violet-200';
    case 'Draft Ready':
      return 'bg-purple-50 text-purple-800 border-purple-200';
    case 'Confirmed':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}

function getChannelIcon(channel: string) {
  switch (channel) {
    case 'Slack':
      return Hash;
    case 'Email':
      return Mail;
    case 'Meeting':
      return Users;
    case 'In-app':
      return MessageSquare;
    default:
      return FileText;
  }
}

function getMaterialIcon(type: string): LucideIcon {
  switch (type) {
    case 'doc':
      return FileText;
    case 'sheet':
      return FileSpreadsheet;
    case 'policy':
      return FileCode;
    case 'email':
      return Mail;
    case 'slack':
      return Hash;
    case 'meeting':
      return Users;
    default:
      return FileText;
  }
}

/* ── Main Component ─────────────────────────────────────────────────── */

interface ClientContextDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialInquiryId?: string | null;
}

export function ClientContextDrawer({ isOpen, onClose, initialInquiryId }: ClientContextDrawerProps) {
  const [activeTab, setActiveTab] = useState<'open-context' | 'interactions' | 'materials'>('open-context');
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(initialInquiryId || null);
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(CLIENT_INQUIRIES);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [siNoteText, setSiNoteText] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [previewMaterial, setPreviewMaterial] = useState<ContextMaterial | null>(null);

  if (!isOpen) return null;

  const selectedInquiry = inquiries.find((item) => item.id === selectedInquiryId);

  // Filtered inquiries for Open Context tab
  const filteredInquiries = inquiries.filter((item) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'blocking') return item.status === 'Blocking';
    if (filterStatus === 'waiting') return item.status === 'Waiting on Client';
    if (filterStatus === 'replied') return item.status === 'Client Replied' || item.statusDetail.includes('replied');
    if (filterStatus === 'validation') return item.status === 'Needs SI Validation' || item.statusDetail.includes('validation');
    return true;
  });

  // Filtered materials
  const filteredMaterials = ALL_MATERIALS.filter((mat) => {
    if (materialFilter === 'all') return true;
    if (materialFilter === 'docs') return mat.type === 'doc';
    if (materialFilter === 'sheets') return mat.type === 'sheet';
    if (materialFilter === 'policies') return mat.type === 'policy';
    if (materialFilter === 'email') return mat.type === 'email';
    if (materialFilter === 'slack') return mat.type === 'slack';
    if (materialFilter === 'meetings') return mat.type === 'meeting';
    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleConfirmContext = (inquiryId: string) => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === inquiryId
          ? {
              ...item,
              status: 'Confirmed',
              statusDetail: 'Validated by SI Solution Architect',
              siValidation: {
                ...item.siValidation,
                validated: true,
                validatedAt: 'Just now',
                validatedBy: 'SI Solution Architect',
              },
            }
          : item
      )
    );
    showToast('Context confirmed & saved to Revenue Cloud model');
  };

  const handleSaveSiNote = (inquiryId: string) => {
    if (!siNoteText.trim()) return;
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === inquiryId
          ? {
              ...item,
              siValidation: {
                ...item.siValidation,
                note: siNoteText.trim(),
              },
            }
          : item
      )
    );
    setSiNoteText('');
    showToast('SI Architect note saved');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-[fadeIn_150ms_ease]">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-[1px] transition-opacity"
      />

      {/* Slide-in panel (Width expanded to max-w-xl for professional operational readability) */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl z-50 flex flex-col border-l border-slate-200 animate-[slideLeft_200ms_ease]">
        
        {/* ─── 1. Header (Compact, Operational, No Intro Banner) ─── */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-600" />
                <span>Client Context</span>
              </h2>
              <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                7 Open · 2 Blocking · 3 Waiting on Client
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Last client interaction: 2h ago</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600 font-medium">Vector Systems</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {toastMessage && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 animate-fadeIn shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{toastMessage}</span>
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ─── 2. Tabs Navigation (Open Context | Interactions | Materials) ─── */}
        {!selectedInquiryId && (
          <div className="px-5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('open-context')}
                className={`py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'open-context'
                    ? 'border-violet-600 text-violet-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Open Context</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    activeTab === 'open-context'
                      ? 'bg-violet-100 text-violet-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  7
                </span>
              </button>

              <button
                onClick={() => setActiveTab('interactions')}
                className={`py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'interactions'
                    ? 'border-violet-600 text-violet-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Interactions</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    activeTab === 'interactions'
                      ? 'bg-violet-100 text-violet-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  8
                </span>
              </button>

              <button
                onClick={() => setActiveTab('materials')}
                className={`py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'materials'
                    ? 'border-violet-600 text-violet-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Materials</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    activeTab === 'materials'
                      ? 'bg-violet-100 text-violet-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  8
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ─── 3. Tab Content Bodies ─── */}
        <div className="flex-1 overflow-y-auto">
          
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 1: OPEN CONTEXT (List or Detailed Drilldown)               */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'open-context' && (
            <div>
              {/* If an inquiry is selected, render drilldown detail */}
              {selectedInquiry ? (
                <div className="p-5 space-y-4 animate-[fadeIn_150ms_ease]">
                  
                  {/* Top Back bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <button
                      onClick={() => setSelectedInquiryId(null)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 group cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                      <span>Back to Open Context</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {selectedInquiry.area}
                      </span>
                      <span
                        className={`text-[10.5px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusBadgeClass(
                          selectedInquiry.status
                        )}`}
                      >
                        {selectedInquiry.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Owner Info */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {selectedInquiry.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Owner:</span>
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 font-bold text-[9px] flex items-center justify-center">
                          {selectedInquiry.owner.avatarInitials}
                        </span>
                        {selectedInquiry.owner.name} ({selectedInquiry.owner.role})
                      </span>
                    </div>
                  </div>

                  {/* 1. RevBrain Finding */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                      <span>RevBrain Observation</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {selectedInquiry.revbrainFinding.summary}
                    </p>
                    <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                      <p>
                        <strong className="text-slate-700">Telemetry Evidence:</strong>{' '}
                        {selectedInquiry.revbrainFinding.evidence}
                      </p>
                      <p>
                        <strong className="text-violet-700">Potential Impact:</strong>{' '}
                        {selectedInquiry.revbrainFinding.impact}
                      </p>
                    </div>
                  </div>

                  {/* 2. Question Sent */}
                  <div className="border border-slate-200 rounded-xl p-3.5 space-y-2 bg-white shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        {(() => {
                          const Icon = getChannelIcon(selectedInquiry.questionSent.channel);
                          return <Icon className="w-3.5 h-3.5 text-slate-500" />;
                        })()}
                        <span>Question Dispatched</span>
                        {selectedInquiry.questionSent.isDraft ? (
                          <span className="text-[9.5px] font-mono font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                            Draft
                          </span>
                        ) : (
                          <span className="text-[9.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            Sent via {selectedInquiry.questionSent.channel}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {selectedInquiry.questionSent.sentAt}
                      </span>
                    </div>

                    <div className="bg-slate-50/90 border border-slate-200/70 rounded-lg p-3 text-xs text-slate-800 leading-relaxed italic">
                      "{selectedInquiry.questionSent.questionText}"
                    </div>

                    <div className="text-[10.5px] text-slate-500 flex items-center justify-between">
                      <span>Target: {selectedInquiry.questionSent.targetRecipient}</span>
                      {selectedInquiry.questionSent.isDraft && (
                        <button
                          onClick={() => showToast('Draft sent to Slack channel')}
                          className="px-2.5 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded text-[10.5px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send Now</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 3. Client Response */}
                  {selectedInquiry.clientResponse ? (
                    <div className="border border-blue-200 bg-blue-50/40 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                            {selectedInquiry.clientResponse.avatarInitials}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {selectedInquiry.clientResponse.author} ({selectedInquiry.clientResponse.role})
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {selectedInquiry.clientResponse.respondedAt} · via {selectedInquiry.clientResponse.channel}
                        </span>
                      </div>
                      <div className="bg-white border border-blue-100 rounded-lg p-3 text-xs text-slate-800 leading-relaxed font-medium">
                        "{selectedInquiry.clientResponse.text}"
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed border-amber-300 bg-amber-50/50 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-amber-900">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Awaiting response from {selectedInquiry.owner.name}</span>
                      </div>
                      <button
                        onClick={() => showToast(`Ping reminder sent to ${selectedInquiry.owner.name}`)}
                        className="text-[10.5px] font-bold text-amber-800 hover:text-amber-900 underline underline-offset-2 cursor-pointer"
                      >
                        Send reminder
                      </button>
                    </div>
                  )}

                  {/* 4. SI Note / Validation */}
                  <div className="border border-slate-200 rounded-xl p-3.5 space-y-2.5 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Edit3 className="w-3.5 h-3.5 text-violet-600" />
                        <span>SI Architect Analysis &amp; Validation</span>
                      </div>
                      {selectedInquiry.siValidation.validated && (
                        <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Validated
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed font-medium">
                      {selectedInquiry.siValidation.note}
                    </p>

                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      {!selectedInquiry.siValidation.validated ? (
                        <button
                          onClick={() => handleConfirmContext(selectedInquiry.id)}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Confirm &amp; Apply Rule</span>
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Confirmed for Revenue Cloud Model
                        </span>
                      )}

                      <button
                        onClick={() => showToast('Clarification request logged to client')}
                        className="px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Request Clarification
                      </button>
                    </div>
                  </div>

                  {/* 5. Confirmed Context Rule */}
                  {selectedInquiry.confirmedContext && (
                    <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-3.5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Confirmed Business Rule</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">
                        {selectedInquiry.confirmedContext.ruleTitle}
                      </p>
                      <p className="text-[11.5px] text-slate-700 leading-relaxed bg-white p-2 rounded border border-emerald-200/80">
                        {selectedInquiry.confirmedContext.ruleDefinition}
                      </p>
                      <span className="text-[10px] font-mono text-emerald-800 block pt-0.5">
                        Target: {selectedInquiry.confirmedContext.targetComponent}
                      </span>
                    </div>
                  )}

                  {/* 6. Attached Materials */}
                  {selectedInquiry.materials.length > 0 && (
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Supporting Materials ({selectedInquiry.materials.length})
                      </span>
                      <div className="space-y-1.5">
                        {selectedInquiry.materials.map((mat) => {
                          const Icon = getMaterialIcon(mat.type);
                          return (
                            <div
                              key={mat.id}
                              onClick={() => setPreviewMaterial(mat)}
                              className="p-2.5 rounded-lg border border-slate-200 hover:border-violet-300 hover:bg-slate-50 transition-all flex items-center justify-between gap-2 cursor-pointer group"
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-violet-600 shrink-0" />
                                <div>
                                  <p className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                                    {mat.name}
                                  </p>
                                  {mat.snippet && (
                                    <p className="text-[10.5px] text-slate-500 line-clamp-1">
                                      {mat.snippet}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-400">
                                  {mat.updatedAt}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* Inquiries List View */
                <div className="p-5 space-y-3">
                  {/* Status filter chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pb-1">
                    {[
                      { id: 'all', label: 'All', count: inquiries.length },
                      { id: 'blocking', label: 'Blocking', count: inquiries.filter((i) => i.status === 'Blocking').length },
                      { id: 'waiting', label: 'Waiting on Client', count: inquiries.filter((i) => i.status === 'Waiting on Client').length },
                      { id: 'replied', label: 'Client Replied', count: inquiries.filter((i) => i.status === 'Client Replied' || i.statusDetail.includes('replied')).length },
                      { id: 'validation', label: 'Needs Validation', count: inquiries.filter((i) => i.status === 'Needs SI Validation' || i.statusDetail.includes('validation')).length },
                    ].map((flt) => (
                      <button
                        key={flt.id}
                        onClick={() => setFilterStatus(flt.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                          filterStatus === flt.id
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        <span>{flt.label}</span>
                        <span className="ml-1 opacity-75 font-mono text-[10px]">({flt.count})</span>
                      </button>
                    ))}
                  </div>

                  {/* List of 7 Open Context Inquiries */}
                  <div className="space-y-2.5 pt-1">
                    {filteredInquiries.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedInquiryId(item.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer group shadow-2xs ${
                          item.status === 'Blocking'
                            ? 'bg-rose-50/40 border-rose-200/90 hover:border-rose-300 hover:bg-rose-50/70'
                            : 'bg-white border-slate-200/90 hover:border-violet-300 hover:bg-slate-50/50'
                        }`}
                      >
                        {/* Card Top: Area + Status Pill */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide">
                            {item.area}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusBadgeClass(
                              item.status
                            )}`}
                          >
                            {item.statusDetail}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-900 transition-colors mt-1.5 leading-snug">
                          {item.title}
                        </h4>

                        {/* Summary / Telemetry note */}
                        <p className="text-[11.5px] text-slate-600 line-clamp-2 mt-1 leading-snug font-normal">
                          {item.revbrainFinding.summary}
                        </p>

                        {/* Card Bottom: Owner + Latest Interaction */}
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[8px] flex items-center justify-center">
                              {item.owner.avatarInitials}
                            </span>
                            {item.owner.name}
                          </span>
                          <span className="text-[10.5px] text-slate-500 font-mono">
                            {item.latestInteraction.summary}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 2: INTERACTIONS (Chronological Activity Feed)             */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'interactions' && (
            <div className="p-5 space-y-3.5 animate-[fadeIn_150ms_ease]">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Client Interaction Timeline ({CLIENT_INTERACTIONS.length})
                </span>
                <span className="text-[11px] text-slate-500">Auto-synced across channels</span>
              </div>

              <div className="space-y-2.5">
                {CLIENT_INTERACTIONS.map((int) => {
                  const Icon = getChannelIcon(int.channel);
                  return (
                    <div
                      key={int.id}
                      className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1.5 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">
                              {int.stakeholder}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {int.role} · {int.channel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                              int.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : int.status === 'Replied'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : int.status === 'Viewed'
                                ? 'bg-slate-50 text-slate-600 border-slate-200'
                                : 'bg-purple-50 text-purple-700 border-purple-200'
                            }`}
                          >
                            {int.status}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {int.timeAgo}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-snug pl-8">
                        {int.action}
                      </p>

                      {int.detail && (
                        <div className="ml-8 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600 italic">
                          {int.detail}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 3: MATERIALS (Supporting Evidence Library)                 */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'materials' && (
            <div className="p-5 space-y-3.5 animate-[fadeIn_150ms_ease]">
              
              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-1.5 pb-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'docs', label: 'Docs' },
                  { id: 'sheets', label: 'Sheets' },
                  { id: 'policies', label: 'Policies' },
                  { id: 'email', label: 'Email' },
                  { id: 'slack', label: 'Slack' },
                  { id: 'meetings', label: 'Meetings' },
                ].map((flt) => (
                  <button
                    key={flt.id}
                    onClick={() => setMaterialFilter(flt.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                      materialFilter === flt.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {flt.label}
                  </button>
                ))}
              </div>

              {/* Supporting Materials List */}
              <div className="space-y-2">
                {filteredMaterials.map((mat) => {
                  const Icon = getMaterialIcon(mat.type);
                  return (
                    <div
                      key={mat.id}
                      onClick={() => setPreviewMaterial(mat)}
                      className="p-3 rounded-xl border border-slate-200 bg-white hover:border-violet-300 hover:bg-slate-50/70 transition-all flex flex-col justify-between gap-2 cursor-pointer shadow-2xs group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200/80 flex items-center justify-center text-violet-700 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                              {mat.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[10.5px] text-slate-500 mt-0.5">
                              <span className="capitalize font-medium text-slate-700">{mat.type}</span>
                              <span className="text-slate-300">·</span>
                              <span>Area: {mat.area}</span>
                              {mat.sizeOrCount && (
                                <>
                                  <span className="text-slate-300">·</span>
                                  <span className="font-mono">{mat.sizeOrCount}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10.5px] font-mono text-slate-400 shrink-0">
                          {mat.updatedAt}
                        </span>
                      </div>

                      {mat.snippet && (
                        <p className="text-[11px] text-slate-600 line-clamp-2 pl-10.5 leading-snug">
                          {mat.snippet}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* ─── 4. Footer ─── */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Continuous sync with Vector Systems workspace</span>
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>

      {/* ─── Material Preview Modal Popover ─── */}
      {previewMaterial && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = getMaterialIcon(previewMaterial.type);
                  return <Icon className="w-4 h-4 text-violet-600" />;
                })()}
                <h3 className="text-sm font-bold text-slate-900">{previewMaterial.name}</h3>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-900">Document Context &amp; Key Excerpts:</p>
              <p>{previewMaterial.snippet}</p>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Connected Area: <strong className="text-slate-800">{previewMaterial.area}</strong> · Last updated: {previewMaterial.updatedAt}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setPreviewMaterial(null)}
                className="px-4 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
