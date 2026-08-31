// ── Learning Engine — RevBrain Accumulated Implementation Intelligence ─────
// Sub-nav with Black Background & Rounded-Full Buttons
// Accent Purple strictly matching Top Menu (bg-violet-600 / hsl(var(--accent)))

import { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Layers,
  UserCheck,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
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
      observedPaths: '214 observed approval paths',
      configRules: ['12 approval rules', '22 discount schedules', '3 QCP scripts'],
      runtimeBehavior: ['31 implementation histories', '147 comparable approvals', '18 exception patterns'],
      outcomes: ['Finance escalation behavior', 'Strategic exception paths', 'Approval cycle patterns', 'Rework / rejection behavior'],
      scenariosCount: 143,
    },
    human: {
      businessPolicy: ['CFO margin floor', 'Strategic-account definition', 'Pricing exception policy'],
      decisionIntent: ['Why Finance gets involved', 'When Deal Desk should override', 'Which exceptions are acceptable'],
      undocumentedOps: ['Manual stage transitions', 'Slack / email workarounds', 'Off-system approval behavior'],
      futureIntent: ['What should be automated', 'What should become an agent', 'Where humans must remain'],
      changeContext: ['Business priorities', 'Migration constraints', 'Change-management decisions'],
      counts: { total: 38, siArchitect: 11, financeRevOps: 9, salesDealDesk: 8, clientAdmin: 10 },
    },
  },

  pricing_discounts: {
    system: {
      observedPaths: '182 pricing rules & tier schedules',
      configRules: ['16 price books', '28 tier discount tables', '5 pricing procedures'],
      runtimeBehavior: ['24 implementation histories', '118 price evaluation events', '14 price override rules'],
      outcomes: ['Price floor compliance', 'Tier jump frequency', 'Discount stack order', 'Override frequency'],
      scenariosCount: 118,
    },
    human: {
      businessPolicy: ['Volume commitment rules', 'Contractual price lock policy', 'Partner discount caps'],
      decisionIntent: ['Why custom rate cards exist', 'When volume tiers are backdated', 'Which SKUs allow custom pricing'],
      undocumentedOps: ['Off-book executive discounts', 'Manual spreadsheet pricing calculators', 'Quarter-end pricing exceptions'],
      futureIntent: ['Automated tier calculations', 'AI price sanity checking', 'Self-service partner discounts'],
      changeContext: ['SaaS transition targets', 'ERP price book migration', 'Margin protection mandates'],
      counts: { total: 29, siArchitect: 8, financeRevOps: 9, salesDealDesk: 6, clientAdmin: 6 },
    },
  },

  quote_to_order: {
    system: {
      observedPaths: '156 state transitions & ERP payload schemas',
      configRules: ['9 order trigger rules', '14 ERP field mappings', '4 validation flows'],
      runtimeBehavior: ['21 implementation histories', '104 closed-won sync events', '12 retry patterns'],
      outcomes: ['ERP sync success rate', 'Order hold duration', 'Provisioning delay triggers', 'Missing data holds'],
      scenariosCount: 104,
    },
    human: {
      businessPolicy: ['Order booking criteria', 'Credit check requirements', 'PO waiver rules'],
      decisionIntent: ['Why orders get held in Sales Ops', 'When PO requirement is waived', 'Who approves credit terms'],
      undocumentedOps: ['Email order confirmations', 'Manual ERP entry workarounds', 'Sales ops manual validations'],
      futureIntent: ['Zero-touch order booking', 'Automated PO parsing', 'Real-time provisioning sync'],
      changeContext: ['NetSuite / SAP consolidation', 'Revenue recognition rules', 'Billing system migration'],
      counts: { total: 21, siArchitect: 7, financeRevOps: 6, salesDealDesk: 4, clientAdmin: 4 },
    },
  },

  bundle_config: {
    system: {
      observedPaths: '198 product bundle options & rules',
      configRules: ['18 product option rules', '11 bundle constraint scripts', '6 guided selling flows'],
      runtimeBehavior: ['19 implementation histories', '96 bundle selections', '13 rule collision events'],
      outcomes: ['Bundle completion rate', 'Add-on attach rate', 'Incompatible option selections', 'Rework rates'],
      scenariosCount: 96,
    },
    human: {
      businessPolicy: ['Mandatory services attach', 'Minimum seats per bundle', 'Legacy SKU sunset rules'],
      decisionIntent: ['Why certain products cannot be sold standalone', 'When custom bundles require Product approval', 'Which legacy SKUs are protected'],
      undocumentedOps: ['Off-catalog product bundling', 'Sales rep custom option notes', 'Manual SKU swap approvals'],
      futureIntent: ['AI guided selling assistant', 'Automated compatibility checks', 'Dynamic bundle pricing'],
      changeContext: ['Product catalog overhaul', 'Packaging simplification', 'Services attach expansion'],
      counts: { total: 26, siArchitect: 8, financeRevOps: 6, salesDealDesk: 5, clientAdmin: 7 },
    },
  },

  renewals_amendments: {
    system: {
      observedPaths: '144 contract lifecycles & amendment rules',
      configRules: ['11 renewal uplift rules', '14 amendment state flows', '8 co-terming calculations'],
      runtimeBehavior: ['18 implementation histories', '89 contract amendments', '12 uplift exception events'],
      outcomes: ['Uplift retention rate', 'Amendment cycle time', 'Co-terming accuracy', 'Early renewal frequency'],
      scenariosCount: 89,
    },
    human: {
      businessPolicy: ['Standard annual uplift floor', 'Co-terming discount policy', 'Early renewal incentive caps'],
      decisionIntent: ['Why certain accounts get 0% uplift', 'When co-terming discounts are granted', 'Who approves early renewals'],
      undocumentedOps: ['Manual amendment tracking in Excel', 'CSM email renewal agreements', 'Off-system price locks'],
      futureIntent: ['Automated renewal quote generation', 'AI churn risk routing', 'Self-service co-terming'],
      changeContext: ['ARR retention focus', 'Contract terms standardization', 'Customer success integration'],
      counts: { total: 24, siArchitect: 7, financeRevOps: 7, salesDealDesk: 5, clientAdmin: 5 },
    },
  },

  contracted_pricing: {
    system: {
      observedPaths: '112 agreement rate cards & tier rules',
      configRules: ['14 account rate cards', '9 custom pricing clauses', '5 entitlement lookups'],
      runtimeBehavior: ['14 implementation histories', '72 rate card lookups', '10 clause override events'],
      outcomes: ['Rate card hit rate', 'Contractual price compliance', 'Clause expiration alerts', 'Billing discrepancies'],
      scenariosCount: 72,
    },
    human: {
      businessPolicy: ['Enterprise agreement thresholds', 'Most Favored Customer clauses', 'Custom SLA price locks'],
      decisionIntent: ['Why top 5% accounts bypass list pricing', 'When rate cards are inherited by subsidiaries', 'How legal terms affect pricing'],
      undocumentedOps: ['Legal side-letter tracking in PDFs', 'Manual rate card verification by Deal Desk', 'Email price guarantees'],
      futureIntent: ['AI rate card extraction from contracts', 'Automated entitlement enforcement', 'Subsidiary inheritance sync'],
      changeContext: ['Legal repository sync', 'Global account pricing alignment', 'Enterprise contract governance'],
      counts: { total: 19, siArchitect: 6, financeRevOps: 5, salesDealDesk: 4, clientAdmin: 4 },
    },
  },

  quote_creation: {
    system: {
      observedPaths: '168 quote forms & field dependencies',
      configRules: ['15 layout rules', '22 default field behaviors', '7 opportunity sync flows'],
      runtimeBehavior: ['22 implementation histories', '108 quote creations', '11 field validation errors'],
      outcomes: ['Quote creation speed', 'First-pass accuracy', 'Opportunity data sync rate', 'Field completion completeness'],
      scenariosCount: 108,
    },
    human: {
      businessPolicy: ['Required fields by deal stage', 'Multi-currency quoting rules', 'Partner quote creation rules'],
      decisionIntent: ['Why certain reps skip technical requirements', 'When preliminary quotes are allowed', 'Which fields require manager sign-off'],
      undocumentedOps: ['Draft quotes sent via PDF pre-approval', 'Rep notes captured in external docs', 'Pre-quote sizing workarounds'],
      futureIntent: ['AI-assisted quote pre-filling', 'Automated deal sizing from CRM notes', 'One-click quote generation'],
      changeContext: ['CRM field cleanup', 'Quoting UI simplification', 'Sales onboarding acceleration'],
      counts: { total: 17, siArchitect: 5, financeRevOps: 5, salesDealDesk: 4, clientAdmin: 3 },
    },
  },

  quote_documents: {
    system: {
      observedPaths: '134 doc templates & e-signature flows',
      configRules: ['12 document templates', '9 clause conditional blocks', '6 DocuSign integration paths'],
      runtimeBehavior: ['17 implementation histories', '81 document renders', '7 e-signature callback events'],
      outcomes: ['Template render success', 'E-signature turnaround time', 'Clause variation count', 'Document amendment rate'],
      scenariosCount: 81,
    },
    human: {
      businessPolicy: ['Mandatory legal terms by region', 'E-signature authorization matrix', 'Custom proposal approval rules'],
      decisionIntent: ['Why specific legal clauses are non-negotiable', 'When reps can attach custom SOWs', 'Who authorizes redline changes'],
      undocumentedOps: ['Manual Word document redlines outside CPQ', 'Local PDF overrides by regional teams', 'Offline signature uploads'],
      futureIntent: ['AI contract redline risk scoring', 'Automated clause assembly', 'Real-time e-signature tracking'],
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
  representativeComponents: {
    agents: string[];
    workflows: string[];
    automations: string[];
    handoffs: string[];
    knowledge: string[];
    validation: string[];
    moreCount: number;
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
    representativeComponents: {
      agents: ['Discount Exception', 'Margin Analysis', 'Similar Deal', 'Approval Routing', '+8 more'],
      workflows: ['Margin-Risk Approval', 'Strategic Exception', 'Manager Routing', '+12 more'],
      automations: ['Approval Follow-Up', 'Escalation', 'Evidence Prep', '+20 more'],
      handoffs: ['Manager Approval', 'Finance Review', 'Deal Desk', '+6 more'],
      knowledge: ['Decision Rationale', 'Exception Classification', 'Outcome Capture', '+8 more'],
      validation: ['Margin Risk', 'Pricing Conflict', 'Regression', '+15 more'],
      moreCount: 14,
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
    representativeComponents: {
      agents: ['Pricing Context', 'Pricing Validation', 'Deal Desk Pricing'],
      workflows: ['Pricing Procedure Flow', 'Price Book Evaluation'],
      automations: ['Margin Threshold Auto', 'Price Override Review'],
      handoffs: ['Deal Desk Approval', 'Finance Pricing Handoff'],
      knowledge: ['Historical Price Rationale Store'],
      validation: ['Discount Regression Pack'],
      moreCount: 12,
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
    representativeComponents: {
      agents: ['Quote Status', 'Order Readiness'],
      workflows: ['Quote-to-Order Handoff', 'Closed-Won Order Generation'],
      automations: ['State Sync Auto', 'Missing Field Check'],
      handoffs: ['Sales Ops Handoff', 'Fulfillment Handoff'],
      knowledge: ['Order Exception Knowledge Loop'],
      validation: ['ERP / State Regression Pack'],
      moreCount: 10,
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
    representativeComponents: {
      agents: ['Configuration Agent', 'Product Dependency Agent'],
      workflows: ['Guided Selling Flow', 'Bundle Eligibility Flow'],
      automations: ['Product Model Validator', 'Rule Dependency Auto'],
      handoffs: ['Product Manager Review'],
      knowledge: ['Bundle Compatibility Store'],
      validation: ['Dependency Validation Pack'],
      moreCount: 9,
    },
  },
};

/* ── Q2C Readiness Data (for Complex Enterprise Sales) ───────────────── */

export interface Q2CReadinessRow {
  id: string;
  workflow: string;
  reusePercent: number;
  importance: 'Critical' | 'High' | 'Medium';
}

export const Q2C_READINESS_ROWS: Q2CReadinessRow[] = [
  { id: 'quote_creation', workflow: 'Quote Creation', reusePercent: 68, importance: 'High' },
  { id: 'bundle_config', workflow: 'Bundle / Product Configuration', reusePercent: 48, importance: 'Medium' },
  { id: 'pricing_discounts', workflow: 'Pricing & Discounts', reusePercent: 61, importance: 'Critical' },
  { id: 'discount_approvals', workflow: 'Discount Approvals & Exceptions', reusePercent: 64, importance: 'Critical' },
  { id: 'contracted_pricing', workflow: 'Contracted / Account Pricing', reusePercent: 52, importance: 'Critical' },
  { id: 'renewals_amendments', workflow: 'Renewals & Amendments', reusePercent: 46, importance: 'Medium' },
  { id: 'quote_documents', workflow: 'Quote Documents', reusePercent: 66, importance: 'Medium' },
  { id: 'quote_to_order', workflow: 'Quote-to-Order', reusePercent: 59, importance: 'High' },
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

        {/* ── Persistent Learning Engine Sub-Navigation (Black Background + Rounded-Full Buttons) ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-full p-1.5 shadow-md flex items-center justify-between gap-2 overflow-x-auto text-white">
          <div className="flex items-center gap-1.5 min-w-max">
            {LEARNING_TABS.map((tab) => {
              const isActive = screen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setScreen(tab.id)}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-2xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0 pr-3">
            <span className="hidden lg:inline font-mono text-slate-300 bg-slate-800/90 px-3.5 py-1 rounded-full border border-slate-700/80 font-bold text-[11px]">
              47 implementations · 247 learned patterns · 32 reusable components
            </span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* AREA 1 — Learning Corpus */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 1 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Header & Compact Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Client Learning Corpus</span>
                    <span className="text-xs font-mono font-medium text-slate-700 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
                      47 Implementations
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Accumulated revenue operations knowledge learned across Q2C customer implementations.
                  </p>
                </div>

                {/* Compact Filter Bar */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 text-xs shrink-0">
                  {['All', 'Subscription SaaS', 'Usage-Based', 'Complex Enterprise', 'Product + Services'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setCorpusFilter(f)}
                      className={`px-3 py-1 rounded-full font-semibold transition-all text-[11px] cursor-pointer ${
                        corpusFilter === f
                          ? 'bg-violet-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clean 8-Row Matrix (+2 Expandable) */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold w-[36%]">Q2C Area</th>
                      <th className="py-3 px-4 text-right font-semibold w-[16%]">Implementations</th>
                      <th className="py-3 px-4 text-right font-semibold w-[16%]">System Learnings</th>
                      <th className="py-3 px-4 text-right font-semibold w-[16%]">Human Learnings</th>
                      <th className="py-3 px-4 text-right font-semibold w-[16%]">Learned Patterns</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {visibleCorpusRows.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => {
                          setSelectedAreaId(row.id);
                          setScreen(2);
                        }}
                        className="hover:bg-slate-50 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span>{row.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-violet-600 transition-opacity" />
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-medium text-slate-700">
                          {row.implementations}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-medium text-slate-700">
                          {row.systemLearnings}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block">
                            {row.humanLearnings}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-violet-600">
                          {row.patterns}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Expand +2 More Button */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => setShowExtraCorpus(!showExtraCorpus)}
                  className="text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{showExtraCorpus ? 'Show 8 main Q2C areas' : '+2 additional Q2C areas (Product Changes, Quote Exceptions)'}</span>
                  {showExtraCorpus ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <span className="text-slate-400 text-[11px]">
                  Click any area to inspect detailed System &amp; Human intelligence
                </span>
              </div>

            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* AREA 2 — Learning Intelligence */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 2 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease]">
            
            {/* Header + Q2C Area Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Learning Intelligence</span>
                  <span className="text-xs font-mono font-semibold text-slate-800 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
                    System Evidence + Human Context
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  RevBrain captures operational behavior directly from system configuration AND human operational intent.
                </p>
              </div>

              {/* Q2C Area Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Selected Q2C Area:</span>
                <select
                  value={selectedAreaId}
                  onChange={(e) => setSelectedAreaId(e.target.value)}
                  className="text-xs font-bold text-violet-600 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 outline-none cursor-pointer focus:ring-2 focus:ring-violet-300"
                >
                  {Q2C_CORPUS_AREAS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Layout — Two Equal Sides (System vs Human) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LEFT — Captured from Systems */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4 shadow-2xs">
                <div className="space-y-1 border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-violet-600" />
                    <span>Captured from Systems</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    What RevBrain can observe directly from configuration, usage, transactions, and runtime behavior.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Current Process */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Current Process</span>
                    <p className="font-mono font-bold text-violet-600 text-sm">{currentIntelData.system.observedPaths}</p>
                  </div>

                  {/* Configuration */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Configuration</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentIntelData.system.configRules.map((c, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 font-mono text-[11px] px-3 py-0.5 rounded-full font-semibold border border-slate-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Runtime Behavior */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Runtime Behavior</span>
                    <ul className="space-y-1 text-slate-700 font-medium">
                      {currentIntelData.system.runtimeBehavior.map((b, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Observed Outcomes</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentIntelData.system.outcomes.map((o, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 text-[11px] px-3 py-0.5 rounded-full font-medium border border-slate-200">
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Validation */}
                  <div className="bg-slate-100 border border-slate-200 p-3 rounded-xl flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800">Observed Business Scenarios</span>
                    <span className="font-mono font-bold text-slate-900">{currentIntelData.system.scenariosCount} scenarios verified</span>
                  </div>
                </div>
              </div>

              {/* RIGHT — Captured from Humans */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4 shadow-2xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1 border-b border-slate-200 pb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-violet-600" />
                        <span>Captured from Humans — SI + Client</span>
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        SI + client knowledge that cannot be reliably discovered from the system alone.
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-200 px-3 py-1 rounded-full border border-slate-300 shrink-0">
                      {currentIntelData.human.counts.total} Human Learnings
                    </span>
                  </div>

                  {/* Human Sub-Categories */}
                  <div className="space-y-3 text-xs">
                    {/* Business Policy */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Business Policy</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentIntelData.human.businessPolicy.map((bp, i) => (
                          <span key={i} className="bg-slate-100 text-slate-900 font-semibold text-[11px] px-3 py-0.5 rounded-full border border-slate-200">
                            {bp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Decision Intent */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Decision Intent</span>
                      <ul className="space-y-1 text-slate-700 font-medium">
                        {currentIntelData.human.decisionIntent.map((di, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                            <span>{di}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Undocumented Operations */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Undocumented Operations</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentIntelData.human.undocumentedOps.map((uo, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 text-[11px] px-3 py-0.5 rounded-full border border-slate-200">
                            {uo}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Future Intent & Change Context */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                        <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wide">Future Intent</span>
                        <p className="text-[11px] text-slate-600 font-medium">{currentIntelData.human.futureIntent[0]}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                        <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wide">Change Context</span>
                        <p className="text-[11px] text-slate-600 font-medium">{currentIntelData.human.changeContext[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role Breakdown + Search Button */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-slate-500 space-x-1.5">
                    <span>{currentIntelData.human.counts.siArchitect} SI</span> · 
                    <span>{currentIntelData.human.counts.financeRevOps} Finance</span> · 
                    <span>{currentIntelData.human.counts.salesDealDesk} Sales</span> · 
                    <span>{currentIntelData.human.counts.clientAdmin} Admin</span>
                  </div>

                  <button
                    onClick={() => setShowHumanSearch(!showHumanSearch)}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search human learnings</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Expandable Search Panel for Human Learnings */}
            {showHumanSearch && (
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-xl space-y-4 animate-[fadeIn_200ms_ease] border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-violet-400" />
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
                    <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search policies, workarounds, or intent..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-400 outline-none focus:border-violet-400"
                    />
                  </div>

                  {/* Filter Dropdowns */}
                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    <select
                      value={searchRoleFilter}
                      onChange={(e) => setSearchRoleFilter(e.target.value)}
                      className="bg-slate-800 text-slate-200 border border-slate-700 rounded-full px-3 py-1.5 outline-none cursor-pointer"
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
                      className="bg-slate-800 text-slate-200 border border-slate-700 rounded-full px-3 py-1.5 outline-none cursor-pointer"
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
                          <div className="flex items-center gap-2 text-[10px] text-slate-300 font-semibold">
                            <span>{rec.role}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-400 font-mono">{rec.implTag}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-violet-400 font-bold">{rec.areaName}</span>
                          </div>
                          <p className="text-xs text-slate-100 font-medium">"{rec.text}"</p>
                        </div>
                        <span className="bg-slate-700 text-slate-300 text-[10px] px-2.5 py-0.5 rounded-full font-mono shrink-0 self-start sm:self-center">
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
                      ? 'bg-violet-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Implementation Packs
                </button>

                <button
                  onClick={() => setLibraryTab('readiness')}
                  className={`px-5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    libraryTab === 'readiness'
                      ? 'bg-violet-600 text-white shadow-2xs'
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
                          ? 'bg-violet-600 text-white border-violet-600 shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                  <span className="text-xs font-medium text-slate-400 px-2 shrink-0">+4 more packs</span>
                </div>

                {/* Calm Pack Factory Pipeline */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{currentPackData.name}</h3>
                    <span className="text-xs font-mono text-violet-600 font-bold bg-slate-200 px-3 py-1 rounded-full border border-slate-300">
                      {currentPackData.reusablePercent}% Reusable Core
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 text-[10px] uppercase">1. Observed</span>
                      <p className="font-mono font-bold text-slate-800">{currentPackData.pipelineData.observed.impls} impls</p>
                      <p className="text-[10px] text-slate-500">{currentPackData.pipelineData.observed.paths}</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 text-[10px] uppercase">2. Generalized</span>
                      <p className="font-mono font-bold text-violet-600">{currentPackData.pipelineData.generalized.shared}% shared</p>
                      <p className="text-[10px] text-slate-500">{currentPackData.pipelineData.generalized.variants}</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 text-[10px] uppercase">3. Componentized</span>
                      <p className="font-mono font-bold text-slate-800">
                        {currentPackData.pipelineData.componentized.agents + currentPackData.pipelineData.componentized.workflows} components
                      </p>
                      <p className="text-[10px] text-slate-500">Agents, workflows, automations</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 text-[10px] uppercase">4. Validated</span>
                      <p className="font-mono font-bold text-slate-800">{currentPackData.pipelineData.validated.scenarios} scenarios</p>
                      <p className="text-[10px] text-slate-500">{currentPackData.pipelineData.validated.scope}</p>
                    </div>

                    <div className="bg-violet-600 text-white p-3 rounded-xl border border-violet-700 space-y-1 shadow-2xs">
                      <span className="font-bold text-slate-200 text-[10px] uppercase">5. Ready</span>
                      <p className="font-bold text-white text-[11px]">{currentPackData.pipelineData.ready.label}</p>
                      <p className="text-[10px] text-slate-200">{currentPackData.pipelineData.ready.sub}</p>
                    </div>
                  </div>
                </div>

                {/* Neutral Categorized Components List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">Representative Reusable Components</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Agents */}
                    <div className="bg-white border border-slate-200/90 p-3.5 rounded-xl space-y-2">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Agents</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPackData.representativeComponents.agents.map((comp, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 font-medium px-2.5 py-0.5 rounded-full border border-slate-200 text-[11px]">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Workflows */}
                    <div className="bg-white border border-slate-200/90 p-3.5 rounded-xl space-y-2">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Workflows</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPackData.representativeComponents.workflows.map((comp, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 font-medium px-2.5 py-0.5 rounded-full border border-slate-200 text-[11px]">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Automations */}
                    <div className="bg-white border border-slate-200/90 p-3.5 rounded-xl space-y-2">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Automations</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPackData.representativeComponents.automations.map((comp, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 font-medium px-2.5 py-0.5 rounded-full border border-slate-200 text-[11px]">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Human Handoffs */}
                    <div className="bg-white border border-slate-200/90 p-3.5 rounded-xl space-y-2">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Human Handoffs</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPackData.representativeComponents.handoffs.map((comp, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 font-medium px-2.5 py-0.5 rounded-full border border-slate-200 text-[11px]">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Knowledge */}
                    <div className="bg-white border border-slate-200/90 p-3.5 rounded-xl space-y-2">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Knowledge Patterns</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPackData.representativeComponents.knowledge.map((comp, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 font-medium px-2.5 py-0.5 rounded-full border border-slate-200 text-[11px]">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Validation */}
                    <div className="bg-white border border-slate-200/90 p-3.5 rounded-xl space-y-2">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Validation Patterns</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPackData.representativeComponents.validation.map((comp, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 font-medium px-2.5 py-0.5 rounded-full border border-slate-200 text-[11px]">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB B — Q2C Readiness */}
            {libraryTab === 'readiness' && (
              <div className="space-y-6 animate-[fadeIn_200ms_ease]">
                
                {/* Revenue Operating Model Selector */}
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-full border border-slate-200 px-4">
                  <span className="text-xs font-medium text-slate-600">Select Revenue Operating Model:</span>
                  <div className="flex items-center gap-1.5 text-xs">
                    {['Subscription SaaS', 'Usage-Based', 'Complex Enterprise Sales', 'Product + Services'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedReadinessModel(m)}
                        className={`px-4 py-1 rounded-full font-bold transition-all cursor-pointer text-[11px] ${
                          selectedReadinessModel === m
                            ? 'bg-violet-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8 Main Q2C Area Horizontal Rows */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 px-3 uppercase tracking-wider">
                    <span>Q2C Workflow</span>
                    <div className="flex items-center gap-12 pr-4">
                      <span>Reuse Readiness</span>
                      <span>Business Importance</span>
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
                            ? 'bg-slate-100 border-violet-400 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-900">{row.workflow}</span>

                        <div className="flex items-center gap-8">
                          {/* Progress Bar */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-violet-600 h-full rounded-full"
                                style={{ width: `${row.reusePercent}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-slate-900 text-xs w-9 text-right">
                              {row.reusePercent}%
                            </span>
                          </div>

                          {/* Importance Color Signal */}
                          <span
                            className={`px-3 py-0.5 rounded-full text-[11px] font-bold border shrink-0 ${
                              row.importance === 'Critical'
                                ? 'bg-slate-900 text-white border-slate-900'
                                : row.importance === 'High'
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
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-xs font-bold text-slate-900">
                      {currentReadinessRow.workflow} — Reuse &amp; Policy Breakdown
                    </h4>
                    <span className="text-xs font-mono font-bold text-violet-600">
                      {currentReadinessRow.reusePercent}% Reusable Software Foundation
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 text-[11px] uppercase">Reusable Software Architecture</span>
                      <ul className="space-y-1 text-slate-700 text-[11px]">
                        <li>✓ Pre-built Agent exception routing architecture</li>
                        <li>✓ Standardized Approval Flow &amp; Escalation triggers</li>
                        <li>✓ Automated Evidence Preparation &amp; Slack Handoffs</li>
                        <li>✓ Pre-packaged Regression Validation Test Suite</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 text-[11px] uppercase">Client-Specific Policy Configuration</span>
                      <ul className="space-y-1 text-slate-700 text-[11px]">
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease]">
            
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Compounding Advantage</span>
                <span className="text-xs font-mono font-semibold text-slate-800 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
                  AI Implementation Economics
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                How every customer implementation increases RevBrain's prebuilt software foundation and reduces human SI effort.
              </p>
            </div>

            {/* 3-Stage Progression */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Implementation #1 */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-slate-500 font-mono">Implementation #1</span>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-slate-800">3 Reusable</p>
                  <p className="text-xs text-slate-500 font-medium">Software components created</p>
                </div>
                <div className="pt-2 border-t border-slate-200 space-y-1 text-xs font-mono">
                  <p className="text-slate-700 font-semibold">~320 hrs SI effort</p>
                  <p className="text-slate-500">81% mapping confidence</p>
                </div>
              </div>

              {/* Implementation #6 */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-violet-600 font-mono">Implementation #6</span>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-slate-900">18 Reusable</p>
                  <p className="text-xs text-slate-500 font-medium">Software components active</p>
                </div>
                <div className="pt-2 border-t border-slate-200 space-y-1 text-xs font-mono">
                  <p className="text-slate-700 font-semibold">~190 hrs SI effort</p>
                  <p className="text-slate-500">90% mapping confidence</p>
                </div>
              </div>

              {/* Implementation #12 */}
              <div className="bg-violet-600 text-white border border-violet-700 p-5 rounded-2xl space-y-3 shadow-md">
                <span className="text-xs font-bold text-slate-200 font-mono">Implementation #12</span>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-white">32 Reusable</p>
                  <p className="text-xs text-slate-200 font-medium">Software components matured</p>
                </div>
                <div className="pt-2 border-t border-violet-500 space-y-1 text-xs font-mono">
                  <p className="text-white font-bold">~110 hrs SI effort</p>
                  <p className="text-slate-100 font-bold">96% mapping confidence</p>
                </div>
              </div>

            </div>

            {/* Compact Trend Strip */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-full flex flex-wrap items-center justify-between gap-4 text-xs px-6">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <TrendingUp className="w-4 h-4 text-violet-600" />
                <span>Reusable agents ↑</span>
              </div>

              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <TrendingUp className="w-4 h-4 text-violet-600" />
                <span>Workflows &amp; automations ↑</span>
              </div>

              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <TrendingDown className="w-4 h-4 text-violet-600" />
                <span>Client-specific discovery ↓</span>
              </div>

              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <TrendingDown className="w-4 h-4 text-violet-600" />
                <span>Human implementation effort ↓</span>
              </div>
            </div>

            {/* Bottom Statement */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 text-center shadow-2xs">
              <p className="text-sm font-bold">
                More implementations → more prebuilt AI operations → less human implementation work
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
