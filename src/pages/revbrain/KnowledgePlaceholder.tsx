// ── Learning Engine — RevBrain Accumulated Implementation Intelligence ─────
// 4-Screen Product Area Architecture with Rich Visual Hierarchy & Semantic Colors:
// 1. Learning Corpus (3 Visual Summary Blocks, Q2C Landscape Rows with System/Human/Pattern Markers)
// 2. Learning Intelligence (50/50 Split Systems vs. Humans, Center Relationship Connector)
// 3. Implementation Library (Visual Factory Flow, Componentized Icon Metrics, 3 Grouped Example Areas, Q2C Readiness Map)
// 4. Compounding (Horizontal Connected Progression Cards #1 -> #6 -> #12, Trend Strip, Thesis Band)

import { useState, useEffect, useMemo } from 'react';
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Search,
  Layers,
  UserCheck,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Sliders,
  Activity,
  Zap,
  BookOpen,
  FileText,
  ShieldAlert,
  Target,
} from 'lucide-react';

/* ── Persistent Learning Sub-Nav Tabs (4 Areas) ───────────────────────── */

export const LEARNING_TABS = [
  { id: 1, label: 'Learning Corpus' },
  { id: 2, label: 'Learning Intelligence' },
  { id: 3, label: 'Implementation Library' },
  { id: 4, label: 'Compounding' },
];

/* ── 1. Learning Corpus Data (8 main Q2C areas + 2 extra) ─────────────── */

export interface Q2CCorpusArea {
  id: string;
  name: string;
  implementations: number;
  systemLearnings: number;
  humanLearnings: number;
  patterns: number;
  isExtra?: boolean;
}

export const Q2C_CORPUS_AREAS: Q2CCorpusArea[] = [
  { id: 'discount_approvals', name: 'Discount Approvals & Exceptions', implementations: 31, systemLearnings: 214, humanLearnings: 38, patterns: 88 },
  { id: 'pricing_discounts', name: 'Pricing & Discounts', implementations: 24, systemLearnings: 176, humanLearnings: 29, patterns: 71 },
  { id: 'quote_to_order', name: 'Quote-to-Order', implementations: 21, systemLearnings: 142, humanLearnings: 21, patterns: 54 },
  { id: 'bundle_config', name: 'Bundle / Product Configuration', implementations: 19, systemLearnings: 131, humanLearnings: 26, patterns: 61 },
  { id: 'renewals_amendments', name: 'Renewals & Amendments', implementations: 18, systemLearnings: 118, humanLearnings: 24, patterns: 49 },
  { id: 'contracted_pricing', name: 'Contracted / Account Pricing', implementations: 14, systemLearnings: 96, humanLearnings: 19, patterns: 42 },
  { id: 'quote_creation', name: 'Quote Creation', implementations: 22, systemLearnings: 149, humanLearnings: 17, patterns: 52 },
  { id: 'quote_documents', name: 'Quote Documents', implementations: 17, systemLearnings: 87, humanLearnings: 11, patterns: 28 },
  { id: 'product_changes', name: 'Product / Pricing Changes', implementations: 13, systemLearnings: 83, humanLearnings: 18, patterns: 35, isExtra: true },
  { id: 'quote_exceptions', name: 'Quote Exceptions / Issues', implementations: 16, systemLearnings: 104, humanLearnings: 22, patterns: 46, isExtra: true },
];

/* ── 2. Learning Intelligence Data (Dynamic per Q2C area) ────────────── */

export interface SystemLearningsData {
  observedPaths: string;
  configRules: string[];
  runtimeBehavior: string[];
  outcomes: string[];
  scenariosCount: number;
}

export interface HumanLearningsData {
  businessPolicy: string[];
  decisionIntent: string[];
  undocumentedOps: string[];
  futureIntent: string[];
  changeContext: string[];
  counts: {
    total: number;
    siArchitect: number;
    financeRevOps: number;
    salesDealDesk: number;
    clientAdmin: number;
  };
}

export interface IntelligenceContextData {
  system: SystemLearningsData;
  human: HumanLearningsData;
}

export const INTELLIGENCE_DATA_BY_AREA: Record<string, IntelligenceContextData> = {
  discount_approvals: {
    system: {
      observedPaths: '214 approval paths',
      configRules: ['12 approval rules', '22 discount schedules', '3 QCP scripts'],
      runtimeBehavior: ['Finance escalation', 'Strategic exceptions', 'Approval cycle patterns', 'Rework / rejection'],
      outcomes: ['Finance escalation behavior', 'Strategic exception paths', 'Approval cycle patterns', 'Rework / rejection behavior'],
      scenariosCount: 143,
    },
    human: {
      businessPolicy: ['CFO margin floor', 'Strategic-account definition', 'Pricing exception policy'],
      decisionIntent: ['Why Finance gets involved', 'When Deal Desk should override', 'Which exceptions are acceptable'],
      undocumentedOps: ['Manual stage transitions', 'Slack / email workarounds', 'Off-system approvals', 'Exception handling'],
      futureIntent: ['What should be automated', 'What should become an agent', 'Where humans must remain', 'Business priorities'],
      changeContext: ['Business priorities', 'Migration constraints', 'Change-management decisions'],
      counts: { total: 38, siArchitect: 11, financeRevOps: 9, salesDealDesk: 8, clientAdmin: 10 },
    },
  },

  pricing_discounts: {
    system: {
      observedPaths: '182 pricing rules & tier schedules',
      configRules: ['16 price books', '28 tier discount tables', '5 pricing procedures'],
      runtimeBehavior: ['Price floor compliance', 'Tier jump frequency', 'Discount stack order', 'Override frequency'],
      outcomes: ['Price floor compliance', 'Tier jump frequency', 'Discount stack order', 'Override frequency'],
      scenariosCount: 118,
    },
    human: {
      businessPolicy: ['Volume commitment rules', 'Contractual price lock policy', 'Partner discount caps'],
      decisionIntent: ['Why custom rate cards exist', 'When volume tiers are backdated', 'Which SKUs allow custom pricing'],
      undocumentedOps: ['Off-book executive discounts', 'Manual spreadsheet pricing calculators', 'Quarter-end pricing exceptions', 'Manual floor checks'],
      futureIntent: ['Automated tier calculations', 'AI price sanity checking', 'Self-service partner discounts', 'Margin alerts'],
      changeContext: ['SaaS transition targets', 'ERP price book migration', 'Margin protection mandates'],
      counts: { total: 29, siArchitect: 8, financeRevOps: 9, salesDealDesk: 6, clientAdmin: 6 },
    },
  },

  quote_to_order: {
    system: {
      observedPaths: '156 state transitions & ERP payload schemas',
      configRules: ['9 order trigger rules', '14 ERP field mappings', '4 validation flows'],
      runtimeBehavior: ['ERP sync success rate', 'Order hold duration', 'Provisioning delay triggers', 'Missing data holds'],
      outcomes: ['ERP sync success rate', 'Order hold duration', 'Provisioning delay triggers', 'Missing data holds'],
      scenariosCount: 104,
    },
    human: {
      businessPolicy: ['Order booking criteria', 'Credit check requirements', 'PO waiver rules'],
      decisionIntent: ['Why orders get held in Sales Ops', 'When PO requirement is waived', 'Who approves credit terms'],
      undocumentedOps: ['Email order confirmations', 'Manual ERP entry workarounds', 'Sales ops manual validations', 'Credit waiver logs'],
      futureIntent: ['Zero-touch order booking', 'Automated PO parsing', 'Real-time provisioning sync', 'Automated holds'],
      changeContext: ['NetSuite / SAP consolidation', 'Revenue recognition rules', 'Billing system migration'],
      counts: { total: 21, siArchitect: 7, financeRevOps: 6, salesDealDesk: 4, clientAdmin: 4 },
    },
  },

  bundle_config: {
    system: {
      observedPaths: '198 product bundle options & rules',
      configRules: ['18 product option rules', '11 bundle constraint scripts', '6 guided selling flows'],
      runtimeBehavior: ['Bundle completion rate', 'Add-on attach rate', 'Incompatible option selections', 'Rework rates'],
      outcomes: ['Bundle completion rate', 'Add-on attach rate', 'Incompatible option selections', 'Rework rates'],
      scenariosCount: 96,
    },
    human: {
      businessPolicy: ['Mandatory services attach', 'Minimum seats per bundle', 'Legacy SKU sunset rules'],
      decisionIntent: ['Why certain products cannot be sold standalone', 'When custom bundles require Product approval', 'Which legacy SKUs are protected'],
      undocumentedOps: ['Off-catalog product bundling', 'Sales rep custom option notes', 'Manual SKU swap approvals', 'Legacy SKU overrides'],
      futureIntent: ['AI guided selling assistant', 'Automated compatibility checks', 'Dynamic bundle pricing', 'Self-service bundling'],
      changeContext: ['Product catalog overhaul', 'Packaging simplification', 'Services attach expansion'],
      counts: { total: 26, siArchitect: 8, financeRevOps: 6, salesDealDesk: 5, clientAdmin: 7 },
    },
  },

  renewals_amendments: {
    system: {
      observedPaths: '144 contract lifecycles & amendment rules',
      configRules: ['11 renewal uplift rules', '14 amendment state flows', '8 co-terming calculations'],
      runtimeBehavior: ['Uplift retention rate', 'Amendment cycle time', 'Co-terming accuracy', 'Early renewal frequency'],
      outcomes: ['Uplift retention rate', 'Amendment cycle time', 'Co-terming accuracy', 'Early renewal frequency'],
      scenariosCount: 89,
    },
    human: {
      businessPolicy: ['Standard annual uplift floor', 'Co-terming discount policy', 'Early renewal incentive caps'],
      decisionIntent: ['Why certain accounts get 0% uplift', 'When co-terming discounts are granted', 'Who approves early renewals'],
      undocumentedOps: ['Manual amendment tracking in Excel', 'CSM email renewal agreements', 'Off-system price locks', 'Early renewal waivers'],
      futureIntent: ['Automated renewal quote generation', 'AI churn risk routing', 'Self-service co-terming', 'Uplift automation'],
      changeContext: ['ARR retention focus', 'Contract terms standardization', 'Customer success integration'],
      counts: { total: 24, siArchitect: 7, financeRevOps: 7, salesDealDesk: 5, clientAdmin: 5 },
    },
  },

  contracted_pricing: {
    system: {
      observedPaths: '112 agreement rate cards & tier rules',
      configRules: ['14 account rate cards', '9 custom pricing clauses', '5 entitlement lookups'],
      runtimeBehavior: ['Rate card hit rate', 'Contractual price compliance', 'Clause expiration alerts', 'Billing discrepancies'],
      outcomes: ['Rate card hit rate', 'Contractual price compliance', 'Clause expiration alerts', 'Billing discrepancies'],
      scenariosCount: 72,
    },
    human: {
      businessPolicy: ['Enterprise agreement thresholds', 'Most Favored Customer clauses', 'Custom SLA price locks'],
      decisionIntent: ['Why top 5% accounts bypass list pricing', 'When rate cards are inherited by subsidiaries', 'How legal terms affect pricing'],
      undocumentedOps: ['Legal side-letter tracking in PDFs', 'Manual rate card verification by Deal Desk', 'Email price guarantees', 'Custom clause tracking'],
      futureIntent: ['AI rate card extraction from contracts', 'Automated entitlement enforcement', 'Subsidiary inheritance sync', 'Clause alerts'],
      changeContext: ['Legal repository sync', 'Global account pricing alignment', 'Enterprise contract governance'],
      counts: { total: 19, siArchitect: 6, financeRevOps: 5, salesDealDesk: 4, clientAdmin: 4 },
    },
  },

  quote_creation: {
    system: {
      observedPaths: '168 quote forms & field dependencies',
      configRules: ['15 layout rules', '22 default field behaviors', '7 opportunity sync flows'],
      runtimeBehavior: ['Quote creation speed', 'First-pass accuracy', 'Opportunity data sync rate', 'Field completion completeness'],
      outcomes: ['Quote creation speed', 'First-pass accuracy', 'Opportunity data sync rate', 'Field completion completeness'],
      scenariosCount: 108,
    },
    human: {
      businessPolicy: ['Required fields by deal stage', 'Multi-currency quoting rules', 'Partner quote creation rules'],
      decisionIntent: ['Why certain reps skip technical requirements', 'When preliminary quotes are allowed', 'Which fields require manager sign-off'],
      undocumentedOps: ['Draft quotes sent via PDF pre-approval', 'Rep notes captured in external docs', 'Pre-quote sizing workarounds', 'Manual currency conversions'],
      futureIntent: ['AI-assisted quote pre-filling', 'Automated deal sizing from CRM notes', 'One-click quote generation', 'Smart layout routing'],
      changeContext: ['CRM field cleanup', 'Quoting UI simplification', 'Sales onboarding acceleration'],
      counts: { total: 17, siArchitect: 5, financeRevOps: 5, salesDealDesk: 4, clientAdmin: 3 },
    },
  },

  quote_documents: {
    system: {
      observedPaths: '134 doc templates & e-signature flows',
      configRules: ['12 document templates', '9 clause conditional blocks', '6 DocuSign integration paths'],
      runtimeBehavior: ['Template render success', 'E-signature turnaround time', 'Clause variation count', 'Document amendment rate'],
      outcomes: ['Template render success', 'E-signature turnaround time', 'Clause variation count', 'Document amendment rate'],
      scenariosCount: 81,
    },
    human: {
      businessPolicy: ['Mandatory legal terms by region', 'E-signature authorization matrix', 'Custom proposal approval rules'],
      decisionIntent: ['Why specific legal clauses are non-negotiable', 'When reps can attach custom SOWs', 'Who authorizes redline changes'],
      undocumentedOps: ['Manual Word document redlines outside CPQ', 'Local PDF overrides by regional teams', 'Offline signature uploads', 'Custom clause inserts'],
      futureIntent: ['AI contract redline risk scoring', 'Automated clause assembly', 'Real-time e-signature tracking', 'Dynamic SOW assembly'],
      changeContext: ['Global legal template standardization', 'DocuSign integration upgrade', 'Compliance enforcement'],
      counts: { total: 11, siArchitect: 4, financeRevOps: 3, salesDealDesk: 2, clientAdmin: 2 },
    },
  },
};

/* ── Human Learnings Search Data (Across 47 implementations) ──────────── */

export interface HumanLearningRecord {
  id: string;
  role: string;
  implTag: string;
  areaId: string;
  areaName: string;
  text: string;
  contextTag: string;
}

export const HUMAN_LEARNINGS_DATABASE: HumanLearningRecord[] = [
  { id: 'h1', role: 'Finance Owner', implTag: 'Implementation #24', areaId: 'discount_approvals', areaName: 'Discount Approvals', text: 'Finance only reviews deals below approved margin floor.', contextTag: 'Margin Policy' },
  { id: 'h2', role: 'SI Architect', implTag: 'Implementation #19', areaId: 'discount_approvals', areaName: 'Discount Approvals', text: 'Strategic accounts bypass the standard approval hierarchy.', contextTag: 'Approval Hierarchy' },
  { id: 'h3', role: 'RevOps Lead', implTag: 'Implementation #31', areaId: 'discount_approvals', areaName: 'Discount Approvals', text: 'Approval rationale is captured manually in Slack today.', contextTag: 'Workaround' },
  { id: 'h4', role: 'Deal Desk Manager', implTag: 'Implementation #15', areaId: 'pricing_discounts', areaName: 'Pricing & Discounts', text: 'Volume discounts for enterprise tiers require annual commitment verification.', contextTag: 'Commitment Check' },
  { id: 'h5', role: 'SI Architect', implTag: 'Implementation #28', areaId: 'quote_to_order', areaName: 'Quote-to-Order', text: 'Closed-won triggers ERP order payload via async integration queue.', contextTag: 'Integration Architecture' },
  { id: 'h6', role: 'Client Admin', implTag: 'Implementation #11', areaId: 'bundle_config', areaName: 'Bundle Configuration', text: 'Services attach is mandatory when purchasing Core Platform SKUs.', contextTag: 'Packaging Rule' },
  { id: 'h7', role: 'VP Finance', implTag: 'Implementation #42', areaId: 'contracted_pricing', areaName: 'Contracted Pricing', text: 'Custom rate cards override standard price book for top 5% accounts.', contextTag: 'Enterprise Exception' },
  { id: 'h8', role: 'RevOps Lead', implTag: 'Implementation #7', areaId: 'renewals_amendments', areaName: 'Renewals & Amendments', text: 'Co-termed amendments carry existing discount tier forward without re-approval.', contextTag: 'Renewal Policy' },
  { id: 'h9', role: 'SI Architect', implTag: 'Implementation #35', areaId: 'quote_creation', areaName: 'Quote Creation', text: 'Pre-sales technical sizing questionnaire determines initial quote layout.', contextTag: 'Intake Workflow' },
  { id: 'h10', role: 'Legal Counsel', implTag: 'Implementation #17', areaId: 'quote_documents', areaName: 'Quote Documents', text: 'Regional data privacy clauses must be auto-inserted based on billing country.', contextTag: 'Compliance Requirement' },
];

/* ── 3. Implementation Library Data (Packs & Readiness) ───────────────── */

export interface ImplementationPackData {
  id: string;
  name: string;
  reusablePercent: number;
  implementationsCount: number;
  pipelineData: {
    observed: { impls: number; paths: string };
    generalized: { shared: number; variants: string };
    componentized: {
      agents: number;
      workflows: number;
      automations: number;
      handoffs: number;
      knowledge: number;
      validation: number;
    };
    validated: { scenarios: number; scope: string };
    ready: { label: string; sub: string };
  };
  groupedExamples: {
    aiWorkflow: { title: string; items: string[] };
    automationHandoff: { title: string; items: string[] };
    knowledgeValidation: { title: string; items: string[] };
  };
}

export const IMPLEMENTATION_PACKS_DATA: Record<string, ImplementationPackData> = {
  discount_approval: {
    id: 'discount_approval',
    name: 'Discount Approval Pack v3',
    reusablePercent: 87,
    implementationsCount: 31,
    pipelineData: {
      observed: { impls: 31, paths: '214 approval paths' },
      generalized: { shared: 87, variants: '46 policy variants isolated' },
      componentized: { agents: 12, workflows: 15, automations: 23, handoffs: 9, knowledge: 11, validation: 18 },
      validated: { scenarios: 143, scope: 'Across 31 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'Client policy remains configurable' },
    },
    groupedExamples: {
      aiWorkflow: {
        title: 'AI & Workflow',
        items: ['Discount Exception Agent', 'Margin Analysis Agent', 'Margin-Risk Approval Workflow', 'Strategic Exception Workflow', '+23 more'],
      },
      automationHandoff: {
        title: 'Automation & Human Handoffs',
        items: ['Approval Follow-Up Auto', 'Escalation Trigger Auto', 'Manager Approval Handoff', 'Finance Review Handoff', '+28 more'],
      },
      knowledgeValidation: {
        title: 'Knowledge & Validation',
        items: ['Decision Rationale Store', 'Exception Classifier', 'Margin Risk Test Suite', 'Regression Test Pack', '+25 more'],
      },
    },
  },
  pricing_discounts: {
    id: 'pricing_discounts',
    name: 'Pricing & Discounts Pack v2',
    reusablePercent: 84,
    implementationsCount: 24,
    pipelineData: {
      observed: { impls: 24, paths: '182 pricing rules' },
      generalized: { shared: 84, variants: '38 tier models isolated' },
      componentized: { agents: 9, workflows: 11, automations: 17, handoffs: 8, knowledge: 8, validation: 14 },
      validated: { scenarios: 118, scope: 'Across 24 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'Price books remain configurable' },
    },
    groupedExamples: {
      aiWorkflow: {
        title: 'AI & Workflow',
        items: ['Pricing Context Agent', 'Deal Desk Pricing Agent', 'Price Book Evaluation Workflow', 'Procedure Flow', '+16 more'],
      },
      automationHandoff: {
        title: 'Automation & Human Handoffs',
        items: ['Margin Threshold Auto', 'Price Override Review Auto', 'Deal Desk Approval Handoff', 'Finance Pricing Handoff', '+21 more'],
      },
      knowledgeValidation: {
        title: 'Knowledge & Validation',
        items: ['Historical Price Rationale Store', 'Tier Jump Rule Catalog', 'Discount Regression Pack', 'Floor Verification Suite', '+18 more'],
      },
    },
  },
  quote_to_order: {
    id: 'quote_to_order',
    name: 'Quote-to-Order Pack v2',
    reusablePercent: 78,
    implementationsCount: 21,
    pipelineData: {
      observed: { impls: 21, paths: '156 state transitions' },
      generalized: { shared: 78, variants: '29 ERP schemas isolated' },
      componentized: { agents: 7, workflows: 12, automations: 19, handoffs: 7, knowledge: 9, validation: 15 },
      validated: { scenarios: 104, scope: 'Across 21 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'ERP endpoints remain configurable' },
    },
    groupedExamples: {
      aiWorkflow: {
        title: 'AI & Workflow',
        items: ['Quote Status Agent', 'Order Readiness Agent', 'Quote-to-Order Handoff Flow', 'Closed-Won Order Workflow', '+15 more'],
      },
      automationHandoff: {
        title: 'Automation & Human Handoffs',
        items: ['State Sync Auto', 'Missing Field Check Auto', 'Sales Ops Handoff', 'Fulfillment Handoff', '+22 more'],
      },
      knowledgeValidation: {
        title: 'Knowledge & Validation',
        items: ['Order Exception Knowledge Loop', 'ERP Payload Schema Store', 'State Machine Regression Pack', 'Sync Validation Suite', '+19 more'],
      },
    },
  },
  bundle_config: {
    id: 'bundle_config',
    name: 'Bundle Configuration Pack v2',
    reusablePercent: 81,
    implementationsCount: 19,
    pipelineData: {
      observed: { impls: 19, paths: '198 bundle options' },
      generalized: { shared: 81, variants: '33 rule schemas isolated' },
      componentized: { agents: 8, workflows: 10, automations: 16, handoffs: 6, knowledge: 7, validation: 13 },
      validated: { scenarios: 96, scope: 'Across 19 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'Product catalog remains configurable' },
    },
    groupedExamples: {
      aiWorkflow: {
        title: 'AI & Workflow',
        items: ['Configuration Agent', 'Product Dependency Agent', 'Guided Selling Workflow', 'Bundle Eligibility Flow', '+14 more'],
      },
      automationHandoff: {
        title: 'Automation & Human Handoffs',
        items: ['Product Model Validator Auto', 'Rule Dependency Auto', 'Product Manager Review Handoff', 'Catalog Override Handoff', '+18 more'],
      },
      knowledgeValidation: {
        title: 'Knowledge & Validation',
        items: ['Bundle Compatibility Store', 'Option Collision Pattern Store', 'Dependency Validation Pack', 'Bundle Test Suite', '+16 more'],
      },
    },
  },
};

/* ── Q2C Readiness Data (for Complex Enterprise Sales) ───────────────── */

export interface Q2CReadinessRow {
  id: string;
  workflow: string;
  reusePercent: number;
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export const Q2C_READINESS_ROWS: Q2CReadinessRow[] = [
  { id: 'quote_creation', workflow: 'Quote Creation', reusePercent: 68, importance: 'HIGH' },
  { id: 'bundle_config', workflow: 'Bundle / Product Configuration', reusePercent: 48, importance: 'MEDIUM' },
  { id: 'pricing_discounts', workflow: 'Pricing & Discounts', reusePercent: 61, importance: 'CRITICAL' },
  { id: 'discount_approvals', workflow: 'Discount Approvals & Exceptions', reusePercent: 64, importance: 'CRITICAL' },
  { id: 'contracted_pricing', workflow: 'Contracted / Account Pricing', reusePercent: 52, importance: 'CRITICAL' },
  { id: 'renewals_amendments', workflow: 'Renewals & Amendments', reusePercent: 46, importance: 'MEDIUM' },
  { id: 'quote_documents', workflow: 'Quote Documents', reusePercent: 66, importance: 'MEDIUM' },
  { id: 'quote_to_order', workflow: 'Quote-to-Order', reusePercent: 59, importance: 'HIGH' },
];

/* ── Main Component ────────────────────────────────────────────────── */

export function KnowledgePlaceholder() {
  const [screen, setScreen] = useState<number>(1);

  // Corpus filter & extra toggle
  const [corpusFilter, setCorpusFilter] = useState<string>('All');
  const [showExtraCorpus, setShowExtraCorpus] = useState<boolean>(false);

  // Selected Q2C Area for Intelligence
  const [selectedAreaId, setSelectedAreaId] = useState<string>('discount_approvals');

  // Search Human Learnings Panel State
  const [showHumanSearch, setShowHumanSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchRoleFilter, setSearchRoleFilter] = useState<string>('All');
  const [searchAreaFilter, setSearchAreaFilter] = useState<string>('All');

  // Implementation Library Internal Tab State
  const [libraryTab, setLibraryTab] = useState<'packs' | 'readiness'>('packs');
  const [selectedPackKey, setSelectedPackKey] = useState<string>('discount_approval');
  const [selectedReadinessId, setSelectedReadinessId] = useState<string>('discount_approvals');
  const [selectedReadinessModel, setSelectedReadinessModel] = useState<string>('Complex Enterprise Sales');

  // Compounding Extra Q2C Areas Toggle
  const [showExtraCompounding, setShowExtraCompounding] = useState<boolean>(false);

  // Broadcast screen & libraryTab change to RevBrainBottomAgent
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('revbrain-learning-screen-change', {
        detail: { screen, libraryTab },
      })
    );
  }, [screen, libraryTab]);

  // Listen for agent navigation events
  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      if (e.detail?.screen) {
        setScreen(e.detail.screen);
        if (e.detail?.libraryTab) {
          setLibraryTab(e.detail.libraryTab);
        }
      }
    };

    window.addEventListener('revbrain-learning-navigate', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('revbrain-learning-navigate', handleNavigate as EventListener);
    };
  }, []);

  // Filtered Corpus rows
  const visibleCorpusRows = showExtraCorpus
    ? Q2C_CORPUS_AREAS
    : Q2C_CORPUS_AREAS.filter((r) => !r.isExtra);

  // Active Q2C Intelligence Data
  const currentAreaInfo = Q2C_CORPUS_AREAS.find((a) => a.id === selectedAreaId) || Q2C_CORPUS_AREAS[0];
  const currentIntelData = INTELLIGENCE_DATA_BY_AREA[selectedAreaId] || INTELLIGENCE_DATA_BY_AREA.discount_approvals;

  // Filtered Human Learnings Search
  const filteredHumanLearnings = useMemo(() => {
    return HUMAN_LEARNINGS_DATABASE.filter((rec) => {
      const matchesQuery =
        searchQuery === '' ||
        rec.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.implTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.contextTag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = searchRoleFilter === 'All' || rec.role.includes(searchRoleFilter);
      const matchesArea = searchAreaFilter === 'All' || rec.areaId === searchAreaFilter;

      return matchesQuery && matchesRole && matchesArea;
    });
  }, [searchQuery, searchRoleFilter, searchAreaFilter]);

  const currentPackData = IMPLEMENTATION_PACKS_DATA[selectedPackKey] || IMPLEMENTATION_PACKS_DATA.discount_approval;
  const currentReadinessRow = Q2C_READINESS_ROWS.find((r) => r.id === selectedReadinessId) || Q2C_READINESS_ROWS[3];

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-140px)] bg-slate-100/60 text-slate-800 font-sans">
      <div className="max-w-[1440px] mx-auto w-full px-6 pt-5 pb-20 space-y-4 flex-1">

        {/* ── Persistent Learning Engine Sub-Navigation ───────────────────── */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-2 shadow-2xs flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {LEARNING_TABS.map((tab) => {
              const isActive = screen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setScreen(tab.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[hsl(var(--accent))] text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* AREA 1 — Learning Corpus */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 1 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5 animate-[fadeIn_300ms_ease]">
            
            {/* Header & Operating Model Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Client Learning Corpus</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Accumulated revenue operations knowledge learned across Q2C customer implementations.
                </p>
              </div>

              {/* Operating Model Filter Bar */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 text-xs shrink-0">
                {['All', 'Subscription SaaS', 'Usage-Based', 'Complex Enterprise', 'Product + Services'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setCorpusFilter(f)}
                    className={`px-3 py-1 rounded-full font-semibold transition-all text-[11px] cursor-pointer ${
                      corpusFilter === f
                        ? 'bg-slate-800 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Compact Visual Summary Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Block 1 — Implementations */}
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900 leading-tight">47 Implementations</div>
                  <div className="text-xs text-blue-700 font-medium mt-0.5">across 4 revenue operating models</div>
                </div>
              </div>

              {/* Block 2 — Learned Patterns */}
              <div className="bg-violet-50/60 border border-violet-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900 leading-tight">247 Unique Learned Patterns</div>
                  <div className="text-xs text-violet-700 font-medium mt-0.5">system + human context</div>
                </div>
              </div>

              {/* Block 3 — Reusable Components */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900 leading-tight">32 Reusable Components</div>
                  <div className="text-xs text-emerald-700 font-medium mt-0.5">agents · workflows · automations</div>
                </div>
              </div>
            </div>

            {/* RevBrain Knowledge Graph Topology */}
            <div className="bg-gradient-to-b from-slate-50/90 via-white to-slate-50/90 border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-violet-600" />
                  <span>RevBrain Q2C Knowledge Graph Topology</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  Connected Q2C intelligence · Click any node to inspect
                </span>
              </div>

              {/* 3-Column Balanced Topology Grid with Central Hub */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative py-2">
                
                {/* Left Column — 4 Q2C Domain Cards */}
                <div className="space-y-3 z-10">
                  {visibleCorpusRows.slice(0, 4).map((row) => (
                    <div
                      key={row.id}
                      onClick={() => {
                        setSelectedAreaId(row.id);
                        setScreen(2);
                      }}
                      className="bg-white border border-slate-200 hover:border-violet-400 rounded-xl p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center justify-between gap-1 border-b border-slate-100 pb-1.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-tight">
                          {row.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 shrink-0 transition-colors" />
                      </div>

                      {/* 3 Metric Columns: Relevant Patterns, System Learnings, Human Learnings */}
                      <div className="grid grid-cols-3 gap-1.5 pt-0.5 text-center">
                        {/* Relevant Patterns */}
                        <div className="bg-violet-50/80 border border-violet-200/80 rounded-lg p-1 flex flex-col items-center justify-center">
                          <span className="text-[8.5px] font-bold text-violet-600 uppercase tracking-tight whitespace-nowrap">
                            Relevant Patterns
                          </span>
                          <span className="text-xs font-black font-mono text-violet-900 leading-none mt-1">
                            {row.patterns}
                          </span>
                        </div>

                        {/* System Learnings */}
                        <div className="bg-blue-50/80 border border-blue-200/80 rounded-lg p-1 flex flex-col items-center justify-center">
                          <span className="text-[8.5px] font-bold text-blue-600 uppercase tracking-tight whitespace-nowrap">
                            System Learnings
                          </span>
                          <span className="text-xs font-black font-mono text-blue-900 leading-none mt-1">
                            {row.systemLearnings}
                          </span>
                        </div>

                        {/* Human Learnings */}
                        <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-1 flex flex-col items-center justify-center">
                          <span className="text-[8.5px] font-bold text-amber-700 uppercase tracking-tight whitespace-nowrap">
                            Human Learnings
                          </span>
                          <span className="text-xs font-black font-mono text-amber-900 leading-none mt-1">
                            {row.humanLearnings}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Center Column — Simplified Soft Background Central RevBrain Intelligence Hub */}
                <div className="flex flex-col items-center justify-center relative py-6 z-10">
                  {/* Visual Pulse Ring */}
                  <div className="hidden lg:block absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-56 h-56 rounded-full border border-violet-200/60 animate-ping opacity-20" />
                  </div>

                  <div
                    onClick={() => {
                      setSelectedAreaId('discount_approvals');
                      setScreen(2);
                    }}
                    className="bg-violet-50/90 hover:bg-violet-100/90 border-2 border-violet-300/80 ring-8 ring-violet-100/60 rounded-full p-6 text-center shadow-sm flex flex-col items-center justify-center w-52 h-52 space-y-1.5 transform hover:scale-105 transition-all cursor-pointer group"
                  >
                    <Brain className="w-9 h-9 text-violet-600 group-hover:rotate-12 transition-transform mb-0.5" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                      Q2C INTELLIGENCE CORE
                    </span>
                    <span className="text-4xl font-black text-slate-900 leading-none">
                      247
                    </span>
                    <span className="text-xs font-semibold text-violet-800">
                      Generalized Patterns
                    </span>
                  </div>
                </div>

                {/* Right Column — 4 Q2C Domain Cards */}
                <div className="space-y-3 z-10">
                  {visibleCorpusRows.slice(4).map((row) => (
                    <div
                      key={row.id}
                      onClick={() => {
                        setSelectedAreaId(row.id);
                        setScreen(2);
                      }}
                      className="bg-white border border-slate-200 hover:border-violet-400 rounded-xl p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center justify-between gap-1 border-b border-slate-100 pb-1.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-tight">
                          {row.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 shrink-0 transition-colors" />
                      </div>

                      {/* 3 Metric Columns: Relevant Patterns, System Learnings, Human Learnings */}
                      <div className="grid grid-cols-3 gap-1.5 pt-0.5 text-center">
                        {/* Relevant Patterns */}
                        <div className="bg-violet-50/80 border border-violet-200/80 rounded-lg p-1 flex flex-col items-center justify-center">
                          <span className="text-[8.5px] font-bold text-violet-600 uppercase tracking-tight whitespace-nowrap">
                            Relevant Patterns
                          </span>
                          <span className="text-xs font-black font-mono text-violet-900 leading-none mt-1">
                            {row.patterns}
                          </span>
                        </div>

                        {/* System Learnings */}
                        <div className="bg-blue-50/80 border border-blue-200/80 rounded-lg p-1 flex flex-col items-center justify-center">
                          <span className="text-[8.5px] font-bold text-blue-600 uppercase tracking-tight whitespace-nowrap">
                            System Learnings
                          </span>
                          <span className="text-xs font-black font-mono text-blue-900 leading-none mt-1">
                            {row.systemLearnings}
                          </span>
                        </div>

                        {/* Human Learnings */}
                        <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-1 flex flex-col items-center justify-center">
                          <span className="text-[8.5px] font-bold text-amber-700 uppercase tracking-tight whitespace-nowrap">
                            Human Learnings
                          </span>
                          <span className="text-xs font-black font-mono text-amber-900 leading-none mt-1">
                            {row.humanLearnings}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Expand +2 More Button */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                <button
                  onClick={() => setShowExtraCorpus(!showExtraCorpus)}
                  className="text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{showExtraCorpus ? 'Show 8 main Q2C areas' : '+2 additional Q2C areas (Product Changes, Quote Exceptions)'}</span>
                  {showExtraCorpus ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <span className="text-slate-400 text-[11px]">
                  Click any node to navigate to Learning Intelligence
                </span>
              </div>

            </div>

          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* AREA 2 — Learning Intelligence */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 2 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5 animate-[fadeIn_300ms_ease]">
            
            {/* Header + Q2C Area Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-[15px] font-semibold text-slate-900">
                  Learning Intelligence
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  System Evidence + Human Context &rarr; Complete Business Understanding
                </p>
              </div>

              {/* Q2C Area Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Selected Q2C Area:</span>
                <select
                  value={selectedAreaId}
                  onChange={(e) => setSelectedAreaId(e.target.value)}
                  className="text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none cursor-pointer focus:ring-2 focus:ring-violet-300"
                >
                  {Q2C_CORPUS_AREAS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Layout — Balanced 50/50 Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              {/* LEFT — Captured from Systems (Light Blue/Purple Tinted Container) */}
              <div className="bg-blue-50/40 border border-blue-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  {/* Header & Subtitle */}
                  <div className="border-b border-blue-200/60 pb-3 space-y-1">
                    <h3 className="text-[14px] font-semibold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Captured from Systems</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      What RevBrain can observe directly
                    </p>
                  </div>

                  {/* Strong Metric Strip */}
                  <div className="bg-white/90 border border-blue-200/90 rounded-xl p-3 shadow-2xs">
                    <p className="text-xs font-mono text-blue-800 font-bold">
                      {currentIntelData.system.observedPaths} · {currentIntelData.system.configRules[0]} · {currentIntelData.system.scenariosCount} scenarios verified
                    </p>
                  </div>

                  {/* 3 Clean Sections with Micro-Card Items & Pill Badges */}
                  <div className="space-y-4 text-xs">
                    
                    {/* Section 1: Configuration */}
                    <div className="space-y-2 border-b border-blue-200/60 pb-3.5">
                      <h4 className="text-[12px] font-semibold text-slate-900 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-blue-600" />
                        <span>Configuration</span>
                      </h4>
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                        {currentIntelData.system.configRules.map((cr, i) => (
                          <span key={i} className="bg-white/90 border border-blue-200/90 rounded-lg px-2.5 py-1 font-semibold text-blue-900 shadow-2xs">
                            {cr}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Section 2: Observed Behavior */}
                    <div className="space-y-2 border-b border-blue-200/60 pb-3.5">
                      <h4 className="text-[12px] font-semibold text-slate-900 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-blue-600" />
                        <span>Observed Behavior</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {currentIntelData.system.runtimeBehavior.map((b, i) => (
                          <div key={i} className="bg-white/90 border border-blue-200/70 rounded-xl px-2.5 py-1.5 flex items-center gap-2 shadow-2xs text-slate-800 font-medium hover:border-blue-300 transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span className="truncate">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Validation Evidence */}
                    <div className="space-y-2 pt-0.5">
                      <h4 className="text-[12px] font-semibold text-slate-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Validation Evidence</span>
                      </h4>
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                        <span className="bg-white/90 border border-blue-200/80 rounded-lg px-2.5 py-1 font-semibold text-blue-900 shadow-2xs">
                          {currentIntelData.system.scenariosCount} scenarios verified
                        </span>
                        <span className="bg-white/90 border border-blue-200/80 rounded-lg px-2.5 py-1 font-semibold text-blue-900 shadow-2xs">
                          18 exception patterns
                        </span>
                        <span className="bg-white/90 border border-blue-200/80 rounded-lg px-2.5 py-1 font-semibold text-blue-900 shadow-2xs">
                          31 impl histories
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT — Captured from Humans — SI + Client (Light Warm/Amber Tinted Container) */}
              <div className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="border-b border-amber-200/60 pb-3 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[14px] font-semibold text-slate-900 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Captured from Humans — SI + Client</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        What people explain that the system cannot
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                        {currentIntelData.human.counts.total} Human Learnings
                      </span>

                      <button
                        onClick={() => setShowHumanSearch(!showHumanSearch)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Search className="w-3 h-3 text-amber-700" />
                        <span>Search</span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Clean Sections using Full Card Width with 2-Column Grids */}
                  <div className="space-y-4 text-xs">
                    
                    {/* Section 1: Policies & Decision Rules (2-Column Grid) */}
                    <div className="space-y-2 border-b border-amber-200/60 pb-3.5">
                      <h4 className="text-[12px] font-semibold text-slate-900 flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        <span>Policies &amp; Decision Rules</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[...currentIntelData.human.businessPolicy, ...currentIntelData.human.decisionIntent.slice(0, 2)].map((p, i) => (
                          <div key={i} className="bg-white/90 border border-amber-200/70 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-medium text-slate-800 shadow-2xs hover:border-amber-300 transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="leading-snug">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 2: Undocumented Operations */}
                    <div className="space-y-2 border-b border-amber-200/60 pb-3.5">
                      <h4 className="text-[12px] font-semibold text-slate-900 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-amber-600" />
                        <span>Undocumented Operations</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {currentIntelData.human.undocumentedOps.map((uo, i) => (
                          <div key={i} className="bg-white/90 border border-amber-200/70 rounded-xl px-3 py-2 flex items-center gap-2 font-medium text-slate-800 shadow-2xs hover:border-amber-300 transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="leading-snug">{uo}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Future Intent */}
                    <div className="space-y-2 pt-0.5">
                      <h4 className="text-[12px] font-semibold text-slate-900 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-amber-600" />
                        <span>Future Intent</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {currentIntelData.human.futureIntent.map((fi, i) => (
                          <div key={i} className="bg-white/90 border border-amber-200/70 rounded-xl px-3 py-2 flex items-center gap-2 font-medium text-slate-800 shadow-2xs hover:border-amber-300 transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="leading-snug">{fi}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Source Metadata Grid Spanning Full Width */}
                <div className="pt-3 border-t border-amber-200/60">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono font-medium text-amber-950 text-center">
                    <span className="bg-white/90 border border-amber-200/80 rounded-lg py-1 px-1.5 shadow-2xs">
                      {currentIntelData.human.counts.siArchitect} SI Architect
                    </span>
                    <span className="bg-white/90 border border-amber-200/80 rounded-lg py-1 px-1.5 shadow-2xs">
                      {currentIntelData.human.counts.financeRevOps} Finance/RevOps
                    </span>
                    <span className="bg-white/90 border border-amber-200/80 rounded-lg py-1 px-1.5 shadow-2xs">
                      {currentIntelData.human.counts.salesDealDesk} Sales/Deal Desk
                    </span>
                    <span className="bg-white/90 border border-amber-200/80 rounded-lg py-1 px-1.5 shadow-2xs">
                      {currentIntelData.human.counts.clientAdmin} Client/Admin
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Expandable Search Panel for Human Learnings */}
            {showHumanSearch && (
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-xl space-y-4 animate-[fadeIn_200ms_ease] border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <span>Search Institutional Memory (47 Implementations)</span>
                  </h4>
                  <button
                    onClick={() => setShowHumanSearch(false)}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    Close search
                  </button>
                </div>

                {/* Search Input & Filter Chips */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search policies, workarounds, or intent..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-400 outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Filter Dropdowns */}
                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    <select
                      value={searchRoleFilter}
                      onChange={(e) => setSearchRoleFilter(e.target.value)}
                      className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
                    >
                      <option value="All">All Roles</option>
                      <option value="SI Architect">SI Architect</option>
                      <option value="Finance">Finance / RevOps</option>
                      <option value="Sales">Sales / Deal Desk</option>
                      <option value="Client Admin">Client Admin</option>
                    </select>

                    <select
                      value={searchAreaFilter}
                      onChange={(e) => setSearchAreaFilter(e.target.value)}
                      className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
                    >
                      <option value="All">All Areas</option>
                      <option value="discount_approvals">Discount Approvals</option>
                      <option value="pricing_discounts">Pricing &amp; Discounts</option>
                      <option value="quote_to_order">Quote-to-Order</option>
                      <option value="bundle_config">Bundle Config</option>
                    </select>
                  </div>
                </div>

                {/* Results List */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {filteredHumanLearnings.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-3 text-center">No matching human learnings found.</p>
                  ) : (
                    filteredHumanLearnings.map((rec) => (
                      <div key={rec.id} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] text-amber-400 font-semibold">
                            <span>{rec.role}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-300 font-mono">{rec.implTag}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-violet-300">{rec.areaName}</span>
                          </div>
                          <p className="text-xs text-slate-100 font-medium">"{rec.text}"</p>
                        </div>
                        <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono shrink-0 self-start sm:self-center">
                          {rec.contextTag}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* AREA 3 — Implementation Library */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 3 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease]">
            
            {/* Top Internal Tab Selector (Packs vs Readiness) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Implementation Library</span>
                  <span className="text-xs font-mono font-medium text-slate-700 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
                    Productized Packs &amp; Q2C Readiness
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standardized AI agents, workflows, automations, and readiness baselines ready for immediate client deployment.
                </p>
              </div>

              {/* Internal Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200 text-xs">
                <button
                  onClick={() => setLibraryTab('packs')}
                  className={`px-5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    libraryTab === 'packs'
                      ? 'bg-[hsl(var(--accent))] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Implementation Packs
                </button>

                <button
                  onClick={() => setLibraryTab('readiness')}
                  className={`px-5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    libraryTab === 'readiness'
                      ? 'bg-[hsl(var(--accent))] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Q2C Readiness
                </button>
              </div>
            </div>

            {/* TAB A — Implementation Packs */}
            {libraryTab === 'packs' && (
              <div className="space-y-6 animate-[fadeIn_200ms_ease]">
                
                {/* Horizontal Pack Selector */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[
                    { key: 'discount_approval', label: 'Discount Approval' },
                    { key: 'pricing_discounts', label: 'Pricing & Discounts' },
                    { key: 'quote_to_order', label: 'Quote-to-Order' },
                    { key: 'bundle_config', label: 'Bundle Configuration' },
                  ].map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPackKey(p.key)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all shrink-0 cursor-pointer ${
                        selectedPackKey === p.key
                          ? 'bg-[hsl(var(--accent))] text-white border-violet-600 shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                  <span className="text-xs font-medium text-slate-400 px-2 shrink-0">+4 more packs</span>
                </div>

                {/* Factory Progression Pipeline with Semantic Accents & Flow Arrows */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{currentPackData.name}</h3>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
                      {currentPackData.reusablePercent}% Reusable Core Foundation
                    </span>
                  </div>

                  {/* Flow Stages with Semantic Colors */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                    {/* Stage 1: Observed */}
                    <div className="flex-1 w-full bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-500 text-[10px] uppercase tracking-wide">1. Observed</span>
                      <p className="font-mono font-bold text-slate-900">{currentPackData.pipelineData.observed.impls} impls</p>
                      <p className="text-[10px] text-slate-500">{currentPackData.pipelineData.observed.paths}</p>
                    </div>

                    <ChevronRight className="hidden sm:block w-4 h-4 text-slate-400 shrink-0" />

                    {/* Stage 2: Generalized */}
                    <div className="flex-1 w-full bg-violet-50/80 p-3 rounded-xl border border-violet-200/80 space-y-1">
                      <span className="font-bold text-violet-700 text-[10px] uppercase tracking-wide">2. Generalized</span>
                      <p className="font-mono font-bold text-violet-900">{currentPackData.pipelineData.generalized.shared}% shared</p>
                      <p className="text-[10px] text-violet-700">{currentPackData.pipelineData.generalized.variants}</p>
                    </div>

                    <ChevronRight className="hidden sm:block w-4 h-4 text-violet-400 shrink-0" />

                    {/* Stage 3: Productized */}
                    <div className="flex-1 w-full bg-blue-50/80 p-3 rounded-xl border border-blue-200/80 space-y-1">
                      <span className="font-bold text-blue-700 text-[10px] uppercase tracking-wide">3. Productized</span>
                      <p className="font-mono font-bold text-blue-900">
                        {currentPackData.pipelineData.componentized.agents + currentPackData.pipelineData.componentized.workflows} components
                      </p>
                      <p className="text-[10px] text-blue-700">Agents, workflows, automations</p>
                    </div>

                    <ChevronRight className="hidden sm:block w-4 h-4 text-blue-400 shrink-0" />

                    {/* Stage 4: Validated */}
                    <div className="flex-1 w-full bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 space-y-1">
                      <span className="font-bold text-amber-700 text-[10px] uppercase tracking-wide">4. Validated</span>
                      <p className="font-mono font-bold text-amber-900">{currentPackData.pipelineData.validated.scenarios} scenarios</p>
                      <p className="text-[10px] text-amber-700">{currentPackData.pipelineData.validated.scope}</p>
                    </div>

                    <ChevronRight className="hidden sm:block w-4 h-4 text-amber-400 shrink-0" />

                    {/* Stage 5: Ready */}
                    <div className="flex-1 w-full bg-emerald-50/80 p-3 rounded-xl border border-emerald-200/80 space-y-1">
                      <span className="font-bold text-emerald-700 text-[10px] uppercase tracking-wide">5. Ready</span>
                      <p className="font-bold text-emerald-900 text-[11px]">{currentPackData.pipelineData.ready.label}</p>
                      <p className="text-[10px] text-emerald-700">{currentPackData.pipelineData.ready.sub}</p>
                    </div>
                  </div>
                </div>

                {/* Componentized Icons Metric Row */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="font-bold text-slate-900 font-mono">{currentPackData.pipelineData.componentized.agents}</span>
                    <span className="text-slate-600 font-medium">Agents</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-900 font-mono">{currentPackData.pipelineData.componentized.workflows}</span>
                    <span className="text-slate-600 font-medium">Workflows</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-bold text-slate-900 font-mono">{currentPackData.pipelineData.componentized.automations}</span>
                    <span className="text-slate-600 font-medium">Automations</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-bold text-slate-900 font-mono">{currentPackData.pipelineData.componentized.handoffs}</span>
                    <span className="text-slate-600 font-medium">Handoffs</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-900 font-mono">{currentPackData.pipelineData.componentized.knowledge}</span>
                    <span className="text-slate-600 font-medium">Knowledge</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-bold text-slate-900 font-mono">{currentPackData.pipelineData.componentized.validation}</span>
                    <span className="text-slate-600 font-medium">Validation</span>
                  </div>
                </div>

                {/* 3 Stronger Grouped Component Example Areas */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">Representative Component Examples</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Group 1: AI & Workflow */}
                    <div className="bg-blue-50/50 border border-blue-200/80 p-4 rounded-xl space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                        <span className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
                          <Brain className="w-3.5 h-3.5 text-blue-600" />
                          <span>AI &amp; Workflows</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          {currentPackData.pipelineData.componentized.agents + currentPackData.pipelineData.componentized.workflows} Active
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-slate-700 font-medium">
                        {currentPackData.groupedExamples.aiWorkflow.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Group 2: Automation & Human Handoffs */}
                    <div className="bg-violet-50/50 border border-violet-200/80 p-4 rounded-xl space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-violet-200/60 pb-2">
                        <span className="font-bold text-violet-900 text-xs flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-violet-600" />
                          <span>Automations &amp; Handoffs</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                          {currentPackData.pipelineData.componentized.automations + currentPackData.pipelineData.componentized.handoffs} Active
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-slate-700 font-medium">
                        {currentPackData.groupedExamples.automationHandoff.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Group 3: Knowledge & Validation */}
                    <div className="bg-emerald-50/50 border border-emerald-200/80 p-4 rounded-xl space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                        <span className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Knowledge &amp; Validation</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {currentPackData.pipelineData.componentized.knowledge + currentPackData.pipelineData.componentized.validation} Active
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-slate-700 font-medium">
                        {currentPackData.groupedExamples.knowledgeValidation.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB B — Q2C Readiness Map */}
            {libraryTab === 'readiness' && (
              <div className="space-y-6 animate-[fadeIn_200ms_ease]">
                
                {/* Revenue Operating Model Selector Bar */}
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-full border border-slate-200 px-4">
                  <span className="text-xs font-medium text-slate-600">Select Revenue Operating Model:</span>
                  <div className="flex items-center gap-1.5 text-xs">
                    {['Subscription SaaS', 'Usage-Based', 'Complex Enterprise Sales', 'Product + Services'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedReadinessModel(m)}
                        className={`px-4 py-1 rounded-full font-bold transition-all cursor-pointer text-[11px] ${
                          selectedReadinessModel === m
                            ? 'bg-[hsl(var(--accent))] text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8 Q2C Areas Visual Readiness Map */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 px-3 uppercase tracking-wider">
                    <span>Q2C Workflow Area</span>
                    <div className="flex items-center gap-16 pr-4">
                      <span>Reusable Foundation</span>
                      <span>Importance</span>
                    </div>
                  </div>

                  {Q2C_READINESS_ROWS.map((row) => {
                    const isSelected = selectedReadinessId === row.id;
                    return (
                      <div
                        key={row.id}
                        onClick={() => setSelectedReadinessId(row.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-violet-50/50 border-violet-400 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-900">{row.workflow}</span>

                        <div className="flex items-center gap-8">
                          {/* Readiness Bar */}
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-[hsl(var(--accent))] h-full rounded-full transition-all duration-500"
                                style={{ width: `${row.reusePercent}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-violet-700 text-xs w-9 text-right">
                              {row.reusePercent}%
                            </span>
                          </div>

                          {/* Semantic Importance Badge */}
                          <span
                            className={`px-3 py-0.5 rounded-full text-[11px] font-bold border shrink-0 ${
                              row.importance === 'CRITICAL'
                                ? 'bg-slate-900 text-white border-slate-900'
                                : row.importance === 'HIGH'
                                ? 'bg-slate-800 text-white border-slate-800'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {row.importance}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-[11px] text-slate-400 text-right pr-2">+ Product Changes · Quote Exceptions · and more...</p>
                </div>

                {/* Selected Readiness Detail */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-xs font-bold text-slate-900">
                      {currentReadinessRow.workflow} — Reuse Architecture vs. Client Policy
                    </h4>
                    <span className="text-xs font-mono font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-200">
                      {currentReadinessRow.reusePercent}% Reusable Software Foundation
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                      <span className="font-bold text-emerald-800 text-[11px] uppercase tracking-wide flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Reusable Software Architecture</span>
                      </span>
                      <ul className="space-y-1 text-slate-700 text-[11px] font-medium">
                        <li>• Pre-built Agent exception routing architecture</li>
                        <li>• Standardized Approval Flow &amp; Escalation triggers</li>
                        <li>• Automated Evidence Preparation &amp; Slack Handoffs</li>
                        <li>• Pre-packaged Regression Validation Test Suite</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                      <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wide flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                        <span>Client-Specific Policy Configuration</span>
                      </span>
                      <ul className="space-y-1 text-slate-700 text-[11px] font-medium">
                        <li>• Specific CFO margin floor thresholds</li>
                        <li>• Strategic-account qualification rules</li>
                        <li>• Exact manager approver hierarchy</li>
                        <li>• Regional discount override policies</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* AREA 4 — Compounding */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 4 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5 animate-[fadeIn_300ms_ease]">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Compounding Advantage</span>
                  <span className="text-xs font-mono font-medium text-slate-700 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
                    Client ROI &amp; Implementation Leverage
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  How RevBrain accelerates business outcomes across Q2C while compounding implementation efficiency.
                </p>
              </div>
            </div>

            {/* ── 1. Overall Client ROI — First ────────────────────────────────── */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Observed Client ROI Across Q2C
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    ~1,350 hrs/qtr before RevBrain &rarr; ~523 hrs/qtr with RevBrain
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
                  61% less manual effort
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Primary Metric</span>
                  <p className="text-xl sm:text-2xl font-black font-mono text-slate-900">~827 manual hours saved / quarter</p>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">~1,350 hrs/qtr before RevBrain &rarr; ~523 hrs/qtr with RevBrain</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Outcome</span>
                  <p className="text-xl sm:text-2xl font-black text-emerald-700">61% less manual effort</p>
                  <p className="text-xs text-slate-600 mt-0.5">Across implemented Q2C workflows and approval cycles</p>
                </div>
              </div>
            </div>

            {/* ── 2. Observed ROI by Workflow — Glimpse Only ───────────────────── */}
            <div className="space-y-3 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Observed ROI by Workflow
                </h3>
                <button
                  onClick={() => setShowExtraCompounding(!showExtraCompounding)}
                  className="text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>{showExtraCompounding ? 'Show fewer workflows' : 'View impact across all Q2C workflows'}</span>
                  {showExtraCompounding ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Primary 3 Workflows Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Discount Approvals */}
                <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-1.5 hover:border-violet-300 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">Discount Approvals</h4>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      34% faster approvals
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-black font-mono text-slate-900">340 &rarr; 88 hrs/qtr</p>
                  <p className="text-[11px] text-slate-500">Pre-built approval agents &amp; policy rules</p>
                </div>

                {/* Pricing & Discounts */}
                <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-1.5 hover:border-violet-300 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">Pricing &amp; Discounts</h4>
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      28% fewer pricing errors
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-black font-mono text-slate-900">420 &rarr; 170 hrs/qtr</p>
                  <p className="text-[11px] text-slate-500">Automated discount matrix validation</p>
                </div>

                {/* Quote-to-Order */}
                <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-1.5 hover:border-violet-300 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">Quote-to-Order</h4>
                    <span className="text-[10px] font-mono font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                      41% fewer handoff issues
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-black font-mono text-slate-900">310 &rarr; 125 hrs/qtr</p>
                  <p className="text-[11px] text-slate-500">Continuous contract-to-order synchronization</p>
                </div>

              </div>

              {/* Expandable 7 Additional Q2C Areas */}
              {showExtraCompounding && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 animate-[fadeIn_200ms_ease]">
                  
                  {/* Renewals & Amendments */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Renewals &amp; Amendments</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        39% faster renewal cycles
                      </span>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-900">280 &rarr; 110 hrs/qtr</p>
                    <p className="text-[10px] text-slate-500">Automated renewal uplift &amp; terms mapping</p>
                  </div>

                  {/* Contracted / Account Pricing */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Contracted / Account Pricing</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        45% less dispute time
                      </span>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-900">210 &rarr; 85 hrs/qtr</p>
                    <p className="text-[10px] text-slate-500">Master customer agreement rate indexing</p>
                  </div>

                  {/* Bundle / Product Configuration */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Bundle / Product Configuration</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        36% fewer rework cycles
                      </span>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-900">260 &rarr; 95 hrs/qtr</p>
                    <p className="text-[10px] text-slate-500">Automated option constraint &amp; dependency pack</p>
                  </div>

                  {/* Quote Creation */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Quote Creation</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        48% faster quote drafting
                      </span>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-900">190 &rarr; 70 hrs/qtr</p>
                    <p className="text-[10px] text-slate-500">Pre-populated opportunity line item generation</p>
                  </div>

                  {/* Quote Documents */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Quote Documents</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        52% faster doc generation
                      </span>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-900">150 &rarr; 55 hrs/qtr</p>
                    <p className="text-[10px] text-slate-500">Automated legal terms &amp; formatting injection</p>
                  </div>

                  {/* Product / Pricing Changes */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Product / Pricing Changes</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        65% faster rule updates
                      </span>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-900">175 &rarr; 60 hrs/qtr</p>
                    <p className="text-[10px] text-slate-500">Automated rule migration &amp; SKU versioning</p>
                  </div>

                  {/* Quote Exceptions / Issue Resolution */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Quote Exceptions / Resolution</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        63% faster resolution
                      </span>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-900">220 &rarr; 80 hrs/qtr</p>
                    <p className="text-[10px] text-slate-500">Intelligent fallback validation &amp; root cause triage</p>
                  </div>

                </div>
              )}

            </div>

            {/* ── 3. RevBrain Implementation Leverage ──────────────────────────── */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  RevBrain Implementation Leverage
                </h3>
                <span className="text-[11px] font-mono font-medium text-violet-800 bg-violet-100/80 px-2.5 py-0.5 rounded-full border border-violet-200 shrink-0">
                  Platform Economics
                </span>
              </div>

              {/* 3 Metrics Grid: Implementation effort, Mapping confidence, Reusable foundation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Metric 1: Implementation Effort */}
                <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wide">
                      Implementation effort
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      -66% effort
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-black font-mono text-slate-900 mt-1">
                    ~320 hrs &rarr; ~110 hrs
                  </p>
                  <p className="text-xs font-bold text-emerald-700">
                    66% less implementation effort
                  </p>
                </div>

                {/* Metric 2: Mapping Confidence */}
                <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wide">
                      Mapping confidence
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      +15% accuracy
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-black font-mono text-emerald-700 mt-1">
                    81% &rarr; 96%
                  </p>
                  <p className="text-xs text-slate-500">
                    Automated schema &amp; rule mapping accuracy
                  </p>
                </div>

                {/* Metric 3: Reusable Foundation */}
                <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wide">
                      Reusable foundation
                    </span>
                    <span className="text-[10px] font-mono font-bold text-violet-800 bg-violet-100 px-2 py-0.5 rounded border border-violet-300">
                      +8 components
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-black font-mono text-violet-900 mt-1">
                    24 &rarr; 32 components
                  </p>
                  <p className="text-xs text-slate-500">
                    Pre-built agents, workflows &amp; automations
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
