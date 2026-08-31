// ── Learning Engine — RevBrain Accumulated Implementation Intelligence ─────
// Navigable Product Workspace:
// 1. Learning Corpus (Q2C Learned Areas & Reusable Implementation IP)
// 2. Pattern Extraction (Pattern Decomposition & Software Mapping)
// 3. Implementation Pack Factory (Productized Packs & Representative Reusable Components)
// 4. Q2C Readiness (Q2C Workflows x 4 Revenue Operating Models Matrix)
// 5. Next Client (Complex Enterprise Sales Simulation & AI Stack)
// 6. Compounding (AI Implementation Economics & Reusable Advantage)

import { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Eye,
  GitMerge,
  X,
  Sliders,
  HelpCircle,
  Check,
  TrendingUp,
  TrendingDown,
  Bot,
  Zap,
  GitFork,
  Layers,
  UserCheck,
  Layers3,
} from 'lucide-react';

/* ── Persistent Learning Sub-Nav Tabs ────────────────────────────────── */

export const LEARNING_TABS = [
  { id: 1, label: 'Learning Corpus' },
  { id: 2, label: 'Pattern Extraction' },
  { id: 3, label: 'Implementation Packs' },
  { id: 4, label: 'Q2C Readiness' },
  { id: 5, label: 'Next Client' },
  { id: 6, label: 'Compounding' },
];

/* ── 4 Global Revenue Operating Models ──────────────────────────────── */

export interface RevenueOperatingModel {
  id: string;
  name: string;
  subtitle: string;
  implementations: number;
}

export const REVENUE_OPERATING_MODELS: RevenueOperatingModel[] = [
  {
    id: 'saas',
    name: 'Subscription SaaS',
    subtitle: 'Renewals · amendments · seat changes · ARR logic',
    implementations: 14,
  },
  {
    id: 'usage',
    name: 'Usage-Based / Consumption',
    subtitle: 'Meters · credits · tiers · overages · variable pricing',
    implementations: 8,
  },
  {
    id: 'enterprise',
    name: 'Complex Enterprise Sales',
    subtitle: 'Discount approvals · contracted pricing · negotiated terms · multi-level approvals',
    implementations: 17,
  },
  {
    id: 'products_services',
    name: 'Product + Services',
    subtitle: 'Bundles · services attach · product dependencies · implementation packages',
    implementations: 8,
  },
];

/* ── Implementation Pack Factory Data ──────────────────────────────── */

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
      componentized: {
        agents: 12,
        workflows: 15,
        automations: 23,
        handoffs: 9,
        knowledge: 11,
        validation: 18,
      },
      validated: { scenarios: 143, scope: 'Across 31 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'Client policy remains configurable' },
    },
    representativeComponents: {
      agents: ['Discount Exception Agent', 'Margin Analysis Agent', 'Similar Deal Agent', 'Approval Routing Agent'],
      workflows: ['Margin-Risk Approval Flow', 'Strategic Exception Flow'],
      automations: ['Approval Follow-Up', 'Evidence Preparation', 'Escalation Automation'],
      handoffs: ['Slack Manager Approval', 'Finance Review'],
      knowledge: ['Decision & Rationale Capture'],
      validation: ['Approval Behavior Test Pack'],
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
      componentized: {
        agents: 9,
        workflows: 11,
        automations: 17,
        handoffs: 8,
        knowledge: 8,
        validation: 14,
      },
      validated: { scenarios: 118, scope: 'Across 24 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'Price books remain configurable' },
    },
    representativeComponents: {
      agents: ['Pricing Context Agent', 'Pricing Validation Agent', 'Deal Desk Pricing Agent'],
      workflows: ['Pricing Procedure Flow', 'Price Book Evaluation Flow'],
      automations: ['Margin Threshold Automation', 'Price Override Review', 'Price Escalation'],
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
      componentized: {
        agents: 7,
        workflows: 12,
        automations: 19,
        handoffs: 7,
        knowledge: 9,
        validation: 15,
      },
      validated: { scenarios: 104, scope: 'Across 21 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'ERP endpoints remain configurable' },
    },
    representativeComponents: {
      agents: ['Quote Status Agent', 'Order Readiness Agent'],
      workflows: ['Quote-to-Order Handoff Flow', 'Closed-Won Order Generation Flow'],
      automations: ['State Sync Automation', 'Missing Field Check', 'ERP Readiness Trigger'],
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
      componentized: {
        agents: 8,
        workflows: 10,
        automations: 16,
        handoffs: 6,
        knowledge: 7,
        validation: 13,
      },
      validated: { scenarios: 96, scope: 'Across 19 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'Product catalog remains configurable' },
    },
    representativeComponents: {
      agents: ['Configuration Agent', 'Product Dependency Agent', 'Launch Readiness Agent'],
      workflows: ['Guided Selling Flow', 'Bundle Eligibility Flow'],
      automations: ['Product Model Validator', 'Rule Dependency Automation'],
      handoffs: ['Product Manager Review'],
      knowledge: ['Bundle Compatibility Store'],
      validation: ['Dependency Validation Pack'],
      moreCount: 9,
    },
  },

  renewals_amendments: {
    id: 'renewals_amendments',
    name: 'Renewals & Amendments Pack v3',
    reusablePercent: 79,
    implementationsCount: 18,
    pipelineData: {
      observed: { impls: 18, paths: '144 contract lifecycles' },
      generalized: { shared: 79, variants: '27 term models isolated' },
      componentized: {
        agents: 8,
        workflows: 11,
        automations: 14,
        handoffs: 8,
        knowledge: 9,
        validation: 12,
      },
      validated: { scenarios: 89, scope: 'Across 18 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'SLA parameters remain configurable' },
    },
    representativeComponents: {
      agents: ['Renewal Amendment Agent', 'Renewal Risk Agent', 'Contract Context Agent'],
      workflows: ['Renewal Approval Flow', 'Amendment Routing Flow'],
      automations: ['Renewal Prep Automation', 'Amendment Validation Trigger'],
      handoffs: ['Account Manager Escalation', 'CSM Review'],
      knowledge: ['Renewal Outcome Knowledge Loop'],
      validation: ['Renewal Regression Pack'],
      moreCount: 11,
    },
  },

  contracted_pricing: {
    id: 'contracted_pricing',
    name: 'Contracted Pricing Pack v1',
    reusablePercent: 76,
    implementationsCount: 14,
    pipelineData: {
      observed: { impls: 14, paths: '112 agreement types' },
      generalized: { shared: 76, variants: '22 clause variations isolated' },
      componentized: {
        agents: 6,
        workflows: 8,
        automations: 12,
        handoffs: 6,
        knowledge: 6,
        validation: 10,
      },
      validated: { scenarios: 72, scope: 'Across 14 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'Account tiers remain configurable' },
    },
    representativeComponents: {
      agents: ['Pricing Context Agent', 'Contract Eligibility Agent'],
      workflows: ['Contracted Pricing Lookup Flow', 'Account Pricing Rules Flow'],
      automations: ['Account Eligibility Trigger', 'Pricing Override Review'],
      handoffs: ['Legal Handoff', 'Finance Review'],
      knowledge: ['Entitlement Decision Store'],
      validation: ['Pricing Conflict Regression Pack'],
      moreCount: 8,
    },
  },

  quote_creation: {
    id: 'quote_creation',
    name: 'Quote Creation Pack v2',
    reusablePercent: 82,
    implementationsCount: 22,
    pipelineData: {
      observed: { impls: 22, paths: '168 quote forms' },
      generalized: { shared: 82, variants: '31 layout variations isolated' },
      componentized: {
        agents: 7,
        workflows: 9,
        automations: 15,
        handoffs: 5,
        knowledge: 8,
        validation: 11,
      },
      validated: { scenarios: 108, scope: 'Across 22 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'Fields remain configurable' },
    },
    representativeComponents: {
      agents: ['Quote Intake Agent', 'Header Context Agent'],
      workflows: ['Quote Initialization Flow', 'Field Pre-fill Flow'],
      automations: ['Opportunity Sync Auto', 'Quote Auto-naming'],
      handoffs: ['Rep Draft Review'],
      knowledge: ['Intake Rationale Store'],
      validation: ['Quote Field Test Pack'],
      moreCount: 10,
    },
  },

  quote_documents: {
    id: 'quote_documents',
    name: 'Quote Documents Pack v1',
    reusablePercent: 80,
    implementationsCount: 16,
    pipelineData: {
      observed: { impls: 16, paths: '134 doc templates' },
      generalized: { shared: 80, variants: '24 e-signature flows isolated' },
      componentized: {
        agents: 5,
        workflows: 7,
        automations: 13,
        handoffs: 6,
        knowledge: 5,
        validation: 9,
      },
      validated: { scenarios: 81, scope: 'Across 16 implementations' },
      ready: { label: 'Reusable implementation pack', sub: 'PDF branding remains configurable' },
    },
    representativeComponents: {
      agents: ['Document Generation Agent', 'Terms Extraction Agent'],
      workflows: ['DocuSign Envelope Flow', 'Template Render Flow'],
      automations: ['PDF Render Auto', 'E-Signature Callback'],
      handoffs: ['Legal Clause Review'],
      knowledge: ['Template Usage Memory'],
      validation: ['Document Render Test Pack'],
      moreCount: 7,
    },
  },
};

/* ── Q2C Workflows Matrix Data (Screen 4) ────────────────────────────── */

export interface Q2CMatrixRow {
  id: string;
  workflow: string;
  saas: number;
  usage: number;
  enterprise: number;
  productsServices: number;
  isExtra?: boolean;
}

export const Q2C_WORKFLOW_MATRIX: Q2CMatrixRow[] = [
  { id: '1', workflow: '1. Quote Creation', saas: 86, usage: 78, enterprise: 88, productsServices: 82 },
  { id: '2', workflow: '2. Bundle / Product Config', saas: 74, usage: 61, enterprise: 77, productsServices: 90 },
  { id: '3', workflow: '3. Pricing & Discounts', saas: 86, usage: 92, enterprise: 88, productsServices: 79 },
  { id: '4', workflow: '4. Discount Approvals & Exceptions', saas: 82, usage: 71, enterprise: 91, productsServices: 84 },
  { id: '5', workflow: '5. Contracted / Account Pricing', saas: 72, usage: 68, enterprise: 89, productsServices: 81 },
  { id: '6', workflow: '6. Renewals & Amendments', saas: 89, usage: 64, enterprise: 72, productsServices: 58 },
  { id: '7', workflow: '7. Quote Documents', saas: 83, usage: 76, enterprise: 85, productsServices: 88 },
  { id: '8', workflow: '8. Quote-to-Order', saas: 76, usage: 81, enterprise: 84, productsServices: 86 },
  { id: '9', workflow: '9. Product / Pricing Changes', saas: 78, usage: 85, enterprise: 81, productsServices: 76, isExtra: true },
  { id: '10', workflow: '10. Quote Issues / Exceptions', saas: 80, usage: 74, enterprise: 87, productsServices: 83, isExtra: true },
];

/* ── Main Component ────────────────────────────────────────────────── */

export function KnowledgePlaceholder() {
  const [screen, setScreen] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<string>('Complex Enterprise Sales');
  const [selectedRowId, setSelectedRowId] = useState<string>('4');
  const [showExtraWorkflows, setShowExtraWorkflows] = useState<boolean>(false);

  const [selectedPackKey, setSelectedPackKey] = useState<string>('discount_approval');

  const [showQuestionsModal, setShowQuestionsModal] = useState<boolean>(false);
  const [showLibraryDrawer, setShowLibraryDrawer] = useState<boolean>(false);
  const [showLineagePopover, setShowLineagePopover] = useState<boolean>(false);

  // Broadcast screen change to RevBrainBottomAgent
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('revbrain-learning-screen-change', {
        detail: { screen, selectedModel },
      })
    );
  }, [screen, selectedModel]);

  // Listen for agent button actions
  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      if (e.detail?.screen) {
        setScreen(e.detail.screen);
      }
    };

    const handleToggleQuestions = () => {
      setShowQuestionsModal((prev) => !prev);
    };

    const handleOpenLibrary = () => {
      setShowLibraryDrawer(true);
    };

    window.addEventListener('revbrain-learning-navigate', handleNavigate as EventListener);
    window.addEventListener('revbrain-learning-toggle-questions', handleToggleQuestions);
    window.addEventListener('revbrain-learning-open-library', handleOpenLibrary);

    return () => {
      window.removeEventListener('revbrain-learning-navigate', handleNavigate as EventListener);
      window.removeEventListener('revbrain-learning-toggle-questions', handleToggleQuestions);
      window.removeEventListener('revbrain-learning-open-library', handleOpenLibrary);
    };
  }, []);

  const visibleMatrixRows = showExtraWorkflows
    ? Q2C_WORKFLOW_MATRIX
    : Q2C_WORKFLOW_MATRIX.filter((r) => !r.isExtra);

  const selectedMatrixRow = Q2C_WORKFLOW_MATRIX.find((r) => r.id === selectedRowId) || Q2C_WORKFLOW_MATRIX[3];

  const currentPackData = IMPLEMENTATION_PACKS_DATA[selectedPackKey] || IMPLEMENTATION_PACKS_DATA.discount_approval;

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
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/70'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0 pr-2">
            <span className="hidden lg:inline font-mono text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80 font-bold text-[11px]">
              47 implementations · 247 learned patterns · 32 reusable components
            </span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* TAB 1 — Client Learning Corpus */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 1 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div className="space-y-6">

              {/* Top Block: 4 Revenue Operating Models */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  4 Revenue Operating Models
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {REVENUE_OPERATING_MODELS.map((model) => (
                    <div
                      key={model.id}
                      className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl space-y-1.5 shadow-2xs hover:border-violet-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{model.name}</span>
                        <span className="text-[10px] font-mono font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                          {model.implementations} impls
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal">{model.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learned Pattern Table — Restored High-Quality Previous Layout */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Q2C Learned Areas &amp; Reusable Implementation IP
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium italic">
                    Select any area to view its reusable stack
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 font-mono">
                        <th className="p-3 pl-4">Q2C Learned Area</th>
                        <th className="p-3 text-right">Implementations</th>
                        <th className="p-3 text-right">Reusable Logic</th>
                        <th className="p-3 pr-4">Reusable Implementation Stack</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      
                      {/* 1. Discount Approvals & Exceptions */}
                      <tr
                        onClick={() => {
                          setSelectedRowId('4');
                          setScreen(2);
                        }}
                        className={`transition-colors cursor-pointer ${
                          selectedRowId === '4'
                            ? 'bg-violet-50/70 text-slate-900 font-semibold'
                            : 'bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <td className="p-3 pl-4 font-semibold text-slate-900">
                          Discount Approvals &amp; Exceptions
                        </td>
                        <td className="p-3 text-right font-mono text-slate-600">31</td>
                        <td className="p-3 text-right font-mono text-emerald-600 font-bold">87%</td>
                        <td className="p-3 pr-4 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-mono font-semibold">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">4 Agents</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">3 Automations</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Flows</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Handoffs</span>
                            <span className="text-slate-400">+3 more</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal italic">
                            Discount Exception Agent · Margin Analysis Agent · Approval Routing Agent · Similar Deal Agent
                          </div>
                        </td>
                      </tr>

                      {/* 2. Pricing & Discounts */}
                      <tr
                        onClick={() => {
                          setSelectedRowId('3');
                          setScreen(2);
                        }}
                        className={`transition-colors cursor-pointer ${
                          selectedRowId === '3'
                            ? 'bg-violet-50/70 text-slate-900 font-semibold'
                            : 'bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <td className="p-3 pl-4 font-semibold text-slate-800">Pricing &amp; Discounts</td>
                        <td className="p-3 text-right font-mono text-slate-600">24</td>
                        <td className="p-3 text-right font-mono text-emerald-600 font-bold">84%</td>
                        <td className="p-3 pr-4 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-mono font-semibold">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">3 Agents</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">4 Automations</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Foundations</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Validations</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal italic">
                            Pricing Context Agent · Pricing Validation Agent · Deal Desk Pricing Agent
                          </div>
                        </td>
                      </tr>

                      {/* 3. Quote-to-Order */}
                      <tr
                        onClick={() => {
                          setSelectedRowId('8');
                          setScreen(2);
                        }}
                        className={`transition-colors cursor-pointer ${
                          selectedRowId === '8'
                            ? 'bg-violet-50/70 text-slate-900 font-semibold'
                            : 'bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <td className="p-3 pl-4 font-semibold text-slate-800">Quote-to-Order</td>
                        <td className="p-3 text-right font-mono text-slate-600">21</td>
                        <td className="p-3 text-right font-mono text-emerald-600 font-bold">78%</td>
                        <td className="p-3 pr-4 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-mono font-semibold">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Agents</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">4 Automations</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Workflows</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">3 Validations</span>
                            <span className="text-slate-400">+1</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal italic">
                            Quote Status Agent · Order Readiness Agent
                          </div>
                        </td>
                      </tr>

                      {/* 4. Bundle / Product Configuration */}
                      <tr
                        onClick={() => {
                          setSelectedRowId('2');
                          setScreen(2);
                        }}
                        className={`transition-colors cursor-pointer ${
                          selectedRowId === '2'
                            ? 'bg-violet-50/70 text-slate-900 font-semibold'
                            : 'bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <td className="p-3 pl-4 font-semibold text-slate-800">Bundle / Product Configuration</td>
                        <td className="p-3 text-right font-mono text-slate-600">19</td>
                        <td className="p-3 text-right font-mono text-emerald-600 font-bold">81%</td>
                        <td className="p-3 pr-4 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-mono font-semibold">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">3 Agents</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Workflows</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Foundations</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Validations</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal italic">
                            Configuration Agent · Product Dependency Agent · Launch Readiness Agent
                          </div>
                        </td>
                      </tr>

                      {/* 5. Renewals & Amendments */}
                      <tr
                        onClick={() => {
                          setSelectedRowId('6');
                          setScreen(2);
                        }}
                        className={`transition-colors cursor-pointer ${
                          selectedRowId === '6'
                            ? 'bg-violet-50/70 text-slate-900 font-semibold'
                            : 'bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <td className="p-3 pl-4 font-semibold text-slate-800">Renewals &amp; Amendments</td>
                        <td className="p-3 text-right font-mono text-slate-600">18</td>
                        <td className="p-3 text-right font-mono text-emerald-600 font-bold">79%</td>
                        <td className="p-3 pr-4 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-mono font-semibold">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">3 Agents</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">3 Automations</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Workflows</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Validations</span>
                            <span className="text-slate-400">+1</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal italic">
                            Renewal Amendment Agent · Renewal Risk Agent · Contract Context Agent
                          </div>
                        </td>
                      </tr>

                      {/* 6. Contracted / Account-Specific Pricing */}
                      <tr
                        onClick={() => {
                          setSelectedRowId('5');
                          setScreen(2);
                        }}
                        className={`transition-colors cursor-pointer ${
                          selectedRowId === '5'
                            ? 'bg-violet-50/70 text-slate-900 font-semibold'
                            : 'bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <td className="p-3 pl-4 font-semibold text-slate-800">Contracted / Account Pricing</td>
                        <td className="p-3 text-right font-mono text-slate-600">14</td>
                        <td className="p-3 text-right font-mono text-emerald-600 font-bold">76%</td>
                        <td className="p-3 pr-4 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-mono font-semibold">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Agents</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">3 Automations</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Foundations</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">2 Validations</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal italic">
                            Pricing Context Agent · Contract Eligibility Agent
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* TAB 2 — Pattern Extraction */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 2 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    Pattern Extraction &amp; Software Mapping
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Discount Approvals &amp; Exceptions — Pattern Decomposition
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-emerald-600 block">87% Reusable</span>
                    <span className="text-[11px] font-semibold text-slate-400 font-mono">
                      31 implementations · 214 approval paths · 46 policy variants · 143 validation scenarios
                    </span>
                  </div>

                  {/* Direct Action Link to Implementation Pack tab */}
                  <button
                    onClick={() => {
                      setSelectedPackKey('discount_approval');
                      setScreen(3);
                    }}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>Open Implementation Pack</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Two Main Columns: Learned Business Behavior vs Reusable Implementation Stack */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left: Reusable Core — Learned Business Behavior */}
                <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-base font-bold text-emerald-950">Learned Business Behavior — 87%</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-300">
                      Repeating Logic
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">1. Margin threshold evaluation</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">2. Approval-path selection</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">3. Manager routing</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">4. Finance risk escalation</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">5. Strategic exception handling</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">6. Evidence packaging</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">7. Decision rationale capture</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">8. Post-approval writeback</div>
                  </div>

                  <p className="text-[11px] text-emerald-900 font-medium border-t border-emerald-200 pt-2 italic">
                    The repeating business unit translates directly into standard software components.
                  </p>
                </div>

                {/* Right: Reusable Implementation Stack (Mapped Components) */}
                <div className="bg-slate-50 border-2 border-violet-300 rounded-2xl p-5 space-y-3.5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-violet-600" />
                      <h3 className="text-base font-bold text-slate-900">Reusable Implementation Stack</h3>
                    </div>
                    <span className="text-xs font-bold text-violet-800 bg-violet-100 px-2.5 py-1 rounded-full border border-violet-300">
                      88 learned implementation patterns
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Agents — 12 */}
                    <div className="p-2.5 bg-white rounded-xl border border-purple-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 shrink-0">
                        <Bot className="w-4 h-4 text-purple-600" />
                        <span className="font-bold text-purple-900">Agents</span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 font-mono font-bold rounded-md text-[10px] border border-purple-200">
                          12
                        </span>
                      </div>
                      <span className="text-[11px] font-normal text-slate-500 text-right truncate">
                        Discount Exception · Margin Analysis · Similar Deal · +9
                      </span>
                    </div>

                    {/* Workflows — 15 */}
                    <div className="p-2.5 bg-white rounded-xl border border-blue-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 shrink-0">
                        <GitFork className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-blue-900">Workflows</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-mono font-bold rounded-md text-[10px] border border-blue-200">
                          15
                        </span>
                      </div>
                      <span className="text-[11px] font-normal text-slate-500 text-right truncate">
                        Margin-Risk Approval · Strategic Exception · Manager Routing · +12
                      </span>
                    </div>

                    {/* Automations — 23 */}
                    <div className="p-2.5 bg-white rounded-xl border border-amber-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 shrink-0">
                        <Zap className="w-4 h-4 text-amber-600" />
                        <span className="font-bold text-amber-900">Automations</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-mono font-bold rounded-md text-[10px] border border-amber-200">
                          23
                        </span>
                      </div>
                      <span className="text-[11px] font-normal text-slate-500 text-right truncate">
                        Approval Routing · Follow-Up · Escalation · Evidence Prep · +19
                      </span>
                    </div>

                    {/* Human Handoffs — 9 */}
                    <div className="p-2.5 bg-white rounded-xl border border-rose-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 shrink-0">
                        <UserCheck className="w-4 h-4 text-rose-600" />
                        <span className="font-bold text-rose-900">Human Handoffs</span>
                        <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-mono font-bold rounded-md text-[10px] border border-rose-200">
                          9
                        </span>
                      </div>
                      <span className="text-[11px] font-normal text-slate-500 text-right truncate">
                        Manager Approval · Finance Review · Deal Desk Escalation · +6
                      </span>
                    </div>

                    {/* Knowledge Patterns — 11 */}
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 shrink-0">
                        <Brain className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-emerald-900">Knowledge Patterns</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold rounded-md text-[10px] border border-emerald-200">
                          11
                        </span>
                      </div>
                      <span className="text-[11px] font-normal text-slate-500 text-right truncate">
                        Decision Rationale · Exception Classification · Outcome Capture · +8
                      </span>
                    </div>

                    {/* Validation Patterns — 18 */}
                    <div className="p-2.5 bg-white rounded-xl border border-teal-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 shrink-0">
                        <ShieldCheck className="w-4 h-4 text-teal-600" />
                        <span className="font-bold text-teal-900">Validation Patterns</span>
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-800 font-mono font-bold rounded-md text-[10px] border border-teal-200">
                          18
                        </span>
                      </div>
                      <span className="text-[11px] font-normal text-slate-500 text-right truncate">
                        Margin Risk · Strategic Exception · Pricing Conflict · Regression · +14
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 font-normal pt-1.5 border-t border-slate-200/80">
                    31 client implementations → 88 implementation patterns learned → reusable core identified → components productized
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* TAB 3 — Implementation Pack Factory */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 3 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                      Productized Component Factory
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200">
                      9 implementation packs · 32 reusable components · 247 learned patterns
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Implementation Pack Factory
                  </h2>
                </div>

                {/* Lineage Link */}
                <div className="relative">
                  <button
                    onClick={() => setShowLineagePopover(!showLineagePopover)}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-800 underline underline-offset-2 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View pack lineage</span>
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>

                  {showLineagePopover && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 text-slate-100 rounded-xl p-4 shadow-xl border border-slate-800 text-xs space-y-2 z-50 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <span className="font-bold text-violet-300 uppercase text-[10px] tracking-wider">Pack Lineage &amp; Stack</span>
                        <button onClick={() => setShowLineagePopover(false)} className="text-slate-400 hover:text-white cursor-pointer">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p><strong className="text-white">Observed:</strong> {currentPackData.pipelineData.observed.impls} implementations</p>
                      <p><strong className="text-white">Generalized:</strong> {currentPackData.pipelineData.generalized.shared}% shared behavior</p>
                      <p><strong className="text-white">Componentized:</strong> {currentPackData.pipelineData.componentized.agents} Agents · {currentPackData.pipelineData.componentized.workflows} Workflows · {currentPackData.pipelineData.componentized.automations} Autos</p>
                      <p><strong className="text-white">Validated:</strong> {currentPackData.pipelineData.validated.scenarios} scenarios</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Horizontal Pack Selector (Compact Tiles) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Select Implementation Pack
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  
                  {/* Pack 1: Discount Approval */}
                  <button
                    onClick={() => setSelectedPackKey('discount_approval')}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                      selectedPackKey === 'discount_approval'
                        ? 'bg-violet-600 text-white border-violet-700 shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">Discount Approval</div>
                    <div className={`text-[10px] font-mono ${selectedPackKey === 'discount_approval' ? 'text-violet-200' : 'text-emerald-600 font-bold'}`}>
                      87% reusable
                    </div>
                  </button>

                  {/* Pack 2: Pricing & Discounts */}
                  <button
                    onClick={() => setSelectedPackKey('pricing_discounts')}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                      selectedPackKey === 'pricing_discounts'
                        ? 'bg-violet-600 text-white border-violet-700 shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">Pricing &amp; Discounts</div>
                    <div className={`text-[10px] font-mono ${selectedPackKey === 'pricing_discounts' ? 'text-violet-200' : 'text-emerald-600 font-bold'}`}>
                      84% reusable
                    </div>
                  </button>

                  {/* Pack 3: Quote-to-Order */}
                  <button
                    onClick={() => setSelectedPackKey('quote_to_order')}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                      selectedPackKey === 'quote_to_order'
                        ? 'bg-violet-600 text-white border-violet-700 shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">Quote-to-Order</div>
                    <div className={`text-[10px] font-mono ${selectedPackKey === 'quote_to_order' ? 'text-violet-200' : 'text-emerald-600 font-bold'}`}>
                      78% reusable
                    </div>
                  </button>

                  {/* Pack 4: Bundle Configuration */}
                  <button
                    onClick={() => setSelectedPackKey('bundle_config')}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                      selectedPackKey === 'bundle_config'
                        ? 'bg-violet-600 text-white border-violet-700 shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">Bundle Configuration</div>
                    <div className={`text-[10px] font-mono ${selectedPackKey === 'bundle_config' ? 'text-violet-200' : 'text-emerald-600 font-bold'}`}>
                      81% reusable
                    </div>
                  </button>

                  {/* Pack 5: Renewals & Amendments */}
                  <button
                    onClick={() => setSelectedPackKey('renewals_amendments')}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                      selectedPackKey === 'renewals_amendments'
                        ? 'bg-violet-600 text-white border-violet-700 shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">Renewals &amp; Amendments</div>
                    <div className={`text-[10px] font-mono ${selectedPackKey === 'renewals_amendments' ? 'text-violet-200' : 'text-emerald-600 font-bold'}`}>
                      79% reusable
                    </div>
                  </button>

                  {/* Pack 6: Contracted Pricing */}
                  <button
                    onClick={() => setSelectedPackKey('contracted_pricing')}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                      selectedPackKey === 'contracted_pricing'
                        ? 'bg-violet-600 text-white border-violet-700 shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">Contracted Pricing</div>
                    <div className={`text-[10px] font-mono ${selectedPackKey === 'contracted_pricing' ? 'text-violet-200' : 'text-emerald-600 font-bold'}`}>
                      76% reusable
                    </div>
                  </button>

                  {/* Pack 7: Quote Creation */}
                  <button
                    onClick={() => setSelectedPackKey('quote_creation')}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                      selectedPackKey === 'quote_creation'
                        ? 'bg-violet-600 text-white border-violet-700 shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">Quote Creation</div>
                    <div className={`text-[10px] font-mono ${selectedPackKey === 'quote_creation' ? 'text-violet-200' : 'text-emerald-600 font-bold'}`}>
                      82% reusable
                    </div>
                  </button>

                  {/* Pack 8: Quote Documents */}
                  <button
                    onClick={() => setSelectedPackKey('quote_documents')}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                      selectedPackKey === 'quote_documents'
                        ? 'bg-violet-600 text-white border-violet-700 shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">Quote Documents</div>
                    <div className={`text-[10px] font-mono ${selectedPackKey === 'quote_documents' ? 'text-violet-200' : 'text-emerald-600 font-bold'}`}>
                      80% reusable
                    </div>
                  </button>

                  <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[11px] font-mono font-bold rounded-lg shrink-0 border border-slate-200">
                    +1 more
                  </span>
                </div>
              </div>

              {/* Selected Pack Factory Pipeline Flow */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    {currentPackData.name}
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-mono">
                    {currentPackData.reusablePercent}% Reusable
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  
                  {/* 1. Observed */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-center shadow-2xs">
                    <div className="w-7 h-7 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">1. Observed</span>
                    <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200 block">
                      {currentPackData.pipelineData.observed.impls} implementations
                    </span>
                    <p className="text-[10px] text-slate-500 font-mono pt-0.5">
                      {currentPackData.pipelineData.observed.paths}
                    </p>
                  </div>

                  {/* 2. Generalized */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-center shadow-2xs">
                    <div className="w-7 h-7 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                      <GitMerge className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">2. Generalized</span>
                    <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200 block">
                      {currentPackData.pipelineData.generalized.shared}% shared behavior
                    </span>
                    <p className="text-[10px] text-slate-500 font-mono pt-0.5">
                      {currentPackData.pipelineData.generalized.variants}
                    </p>
                  </div>

                  {/* 3. Componentized (Showing accumulated implementation depth) */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-center shadow-2xs">
                    <div className="w-7 h-7 mx-auto rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      <Layers3 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">3. Componentized</span>
                    <div className="grid grid-cols-2 gap-1 text-[9px] font-mono font-bold pt-0.5">
                      <span className="px-1 py-0.5 bg-purple-100 text-purple-800 rounded">{currentPackData.pipelineData.componentized.agents} Agents</span>
                      <span className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded">{currentPackData.pipelineData.componentized.workflows} Flows</span>
                      <span className="px-1 py-0.5 bg-amber-100 text-amber-800 rounded">{currentPackData.pipelineData.componentized.automations} Autos</span>
                      <span className="px-1 py-0.5 bg-rose-100 text-rose-800 rounded">{currentPackData.pipelineData.componentized.handoffs} Handoffs</span>
                    </div>
                  </div>

                  {/* 4. Validated */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-center shadow-2xs">
                    <div className="w-7 h-7 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">4. Validated</span>
                    <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200 block">
                      {currentPackData.pipelineData.validated.scenarios} scenarios
                    </span>
                    <p className="text-[10px] text-slate-500 font-mono pt-0.5">
                      {currentPackData.pipelineData.validated.scope}
                    </p>
                  </div>

                  {/* 5. Ready */}
                  <div className="p-3.5 bg-emerald-50/90 border-2 border-emerald-300 rounded-xl space-y-1 text-center shadow-md">
                    <div className="w-7 h-7 mx-auto rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-emerald-950 block">5. Ready</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300 block truncate">
                      {currentPackData.pipelineData.ready.label}
                    </span>
                    <p className="text-[10px] text-emerald-700 font-medium pt-0.5">
                      {currentPackData.pipelineData.ready.sub}
                    </p>
                  </div>

                </div>
              </div>

              {/* Representative Productized Components */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Representative Productized Components ({currentPackData.name})
                  </span>
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">
                    +{currentPackData.representativeComponents.moreCount} more reusable components in pack
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  
                  {/* Agents */}
                  <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs">
                      <Bot className="w-3.5 h-3.5 text-purple-600" />
                      <span>Agents</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {currentPackData.representativeComponents.agents.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-purple-200 rounded text-slate-800 text-[11px] font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Workflows */}
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                      <GitFork className="w-3.5 h-3.5 text-blue-600" />
                      <span>Workflows</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {currentPackData.representativeComponents.workflows.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-blue-200 rounded text-slate-800 text-[11px] font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Automations */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      <span>Automations</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {currentPackData.representativeComponents.automations.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-amber-200 rounded text-slate-800 text-[11px] font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Human Handoffs */}
                  <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs">
                      <UserCheck className="w-3.5 h-3.5 text-rose-600" />
                      <span>Human Handoffs</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {currentPackData.representativeComponents.handoffs.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-rose-200 rounded text-slate-800 text-[11px] font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Knowledge */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                      <Brain className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Knowledge Patterns</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {currentPackData.representativeComponents.knowledge.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-emerald-200 rounded text-slate-800 text-[11px] font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Validation */}
                  <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-teal-900 font-bold text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      <span>Validation Packs</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {currentPackData.representativeComponents.validation.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-teal-200 rounded text-slate-800 text-[11px] font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* TAB 4 — Q2C Operating Model Readiness */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 4 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                      Productization Coverage Matrix
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200">
                      Readiness = reusable agents + workflows + automations + foundation + validation
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Q2C Operating Model Implementation Readiness
                  </h2>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => setShowExtraWorkflows(!showExtraWorkflows)}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-800 underline underline-offset-2 cursor-pointer"
                  >
                    {showExtraWorkflows ? 'Show core 8 workflows' : '+ Product Changes · Exceptions · and more...'}
                  </button>
                </div>
              </div>

              {/* 10 Workflows x 4 Operating Models Matrix */}
              <div className="space-y-2">
                <div className="grid grid-cols-[220px_1fr_1fr_1fr_1fr] gap-2 text-xs font-bold text-center">
                  <div className="text-left text-slate-400 uppercase tracking-wider text-[10px] self-end pb-1 pl-2">
                    Q2C Workflow Area
                  </div>

                  {REVENUE_OPERATING_MODELS.map((model) => (
                    <button
                      key={model.name}
                      onClick={() => setSelectedModel(model.name)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        selectedModel === model.name
                          ? 'bg-violet-600 text-white border-violet-700 shadow-md ring-2 ring-violet-300 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="truncate text-xs">{model.name}</div>
                      <div className={`text-[9px] font-mono font-normal ${selectedModel === model.name ? 'text-violet-200' : 'text-slate-400'}`}>
                        {model.implementations} impls
                      </div>
                    </button>
                  ))}
                </div>

                {/* Matrix Rows */}
                {visibleMatrixRows.map((row) => (
                  <div
                    key={row.id}
                    onClick={() => setSelectedRowId(row.id)}
                    className={`grid grid-cols-[220px_1fr_1fr_1fr_1fr] gap-2 items-center text-xs rounded-xl transition-all cursor-pointer ${
                      selectedRowId === row.id ? 'bg-violet-50/50 p-1 border border-violet-200' : 'p-0.5'
                    }`}
                  >
                    <div className="text-slate-900 font-bold pl-2 truncate flex items-center justify-between pr-2">
                      <span>{row.workflow}</span>
                      {selectedRowId === row.id && <Sparkles className="w-3 h-3 text-violet-600 shrink-0" />}
                    </div>

                    {/* Subscription SaaS */}
                    <div className={`p-2 rounded-xl text-center border font-mono font-bold transition-all ${
                      selectedModel === 'Subscription SaaS'
                        ? 'bg-violet-50 text-violet-900 border-violet-300 ring-1 ring-violet-200 shadow-2xs'
                        : 'bg-slate-50/60 text-slate-500 border-slate-200/80 opacity-70'
                    }`}>
                      {row.saas}%
                    </div>

                    {/* Usage-Based / Consumption */}
                    <div className={`p-2 rounded-xl text-center border font-mono font-bold transition-all ${
                      selectedModel === 'Usage-Based / Consumption'
                        ? 'bg-violet-50 text-violet-900 border-violet-300 ring-1 ring-violet-200 shadow-2xs'
                        : 'bg-slate-50/60 text-slate-500 border-slate-200/80 opacity-70'
                    }`}>
                      {row.usage}%
                    </div>

                    {/* Complex Enterprise Sales */}
                    <div className={`p-2 rounded-xl text-center border font-mono font-bold transition-all ${
                      selectedModel === 'Complex Enterprise Sales'
                        ? 'bg-violet-50 text-violet-900 border-violet-300 ring-1 ring-violet-200 shadow-2xs'
                        : 'bg-slate-50/60 text-slate-500 border-slate-200/80 opacity-70'
                    }`}>
                      {row.enterprise}%
                    </div>

                    {/* Product + Services */}
                    <div className={`p-2 rounded-xl text-center border font-mono font-bold transition-all ${
                      selectedModel === 'Product + Services'
                        ? 'bg-violet-50 text-violet-900 border-violet-300 ring-1 ring-violet-200 shadow-2xs'
                        : 'bg-slate-50/60 text-slate-500 border-slate-200/80 opacity-70'
                    }`}>
                      {row.productsServices}%
                    </div>
                  </div>
                ))}

                {/* Selected Cell AI-First Implementation Stack Breakdown */}
                <div className="p-4 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-xl shadow-lg border border-violet-500/30 text-xs space-y-2 mt-3">
                  <div className="flex items-center justify-between border-b border-violet-700/50 pb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-violet-300 shrink-0" />
                      <span className="font-bold text-white text-sm">
                        {selectedModel} · {selectedMatrixRow.workflow}
                      </span>
                    </div>
                    <span className="font-mono font-extrabold text-emerald-400 text-sm bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                      {selectedModel === 'Complex Enterprise Sales'
                        ? `${selectedMatrixRow.enterprise}% Implementation Ready`
                        : `${selectedMatrixRow.saas}% Implementation Ready`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1 font-semibold text-[11px]">
                    <div className="p-2 bg-white/10 rounded-lg flex items-center gap-1.5 text-purple-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>AI Agent</span>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg flex items-center gap-1.5 text-blue-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Workflow</span>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg flex items-center gap-1.5 text-amber-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Automation</span>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg flex items-center gap-1.5 text-rose-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Human Handoffs</span>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg flex items-center gap-1.5 text-emerald-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Knowledge</span>
                    </div>
                    <div className="p-2 bg-white/10 rounded-lg flex items-center gap-1.5 text-teal-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Validation</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-violet-200 pt-1 font-medium flex items-center gap-2">
                    <span className="font-bold text-amber-300">Still Client-Specific:</span>
                    <span>Margin threshold policy · Approver escalation hierarchy</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* TAB 5 — Next Client Simulation */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 5 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    New Client Simulation
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    New Client: Complex Enterprise Sales
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span>Salesforce CPQ</span>
                  <span>·</span>
                  <span>Advanced Approvals</span>
                  <span>·</span>
                  <span>Negotiated Pricing</span>
                </div>
              </div>

              {/* 86% Foundation Banner */}
              <div className="p-5 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-2xl shadow-lg border border-violet-500/30 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-300 block">AI-First Foundation</span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    86% of the implementation foundation is already available
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    RevBrain loads 12 implementation components immediately by type · 3 business decisions needed
                  </p>
                </div>
                <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 text-center font-mono">
                  <span className="text-xl font-black text-emerald-400 block">12 / 15</span>
                  <span className="text-[10px] font-bold uppercase text-slate-200">Prebuilt Artifacts</span>
                </div>
              </div>

              {/* RevBrain Loads Immediately (Grouped by Component Type) vs Still Client-Specific */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                
                {/* 1. AI AGENTS & WORKFLOWS */}
                <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-xl space-y-3">
                  <span className="font-bold text-purple-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-purple-200 pb-1.5">
                    <Bot className="w-4 h-4 text-purple-600" />
                    AI AGENTS &amp; WORKFLOWS
                  </span>

                  <div className="space-y-1.5 text-slate-800 font-semibold">
                    <div className="p-2 bg-white rounded-lg border border-purple-200 flex items-center justify-between">
                      <span>Discount Exception Agent</span>
                      <span className="text-[9px] font-mono bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">Agent</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-purple-200 flex items-center justify-between">
                      <span>Pricing Context Agent</span>
                      <span className="text-[9px] font-mono bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">Agent</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-purple-200 flex items-center justify-between">
                      <span>Margin Analysis Agent</span>
                      <span className="text-[9px] font-mono bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">Agent</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-blue-200 flex items-center justify-between">
                      <span>Margin-Risk Approval Flow</span>
                      <span className="text-[9px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Flow</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-blue-200 flex items-center justify-between">
                      <span>Strategic Exception Flow</span>
                      <span className="text-[9px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Flow</span>
                    </div>
                  </div>
                </div>

                {/* 2. AUTOMATIONS, HANDOFFS & TESTS */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
                  <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-emerald-200 pb-1.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    AUTOMATIONS, HANDOFFS &amp; TESTS
                  </span>

                  <div className="space-y-1.5 text-slate-800 font-semibold">
                    <div className="p-2 bg-white rounded-lg border border-amber-200 flex items-center justify-between">
                      <span>Approval Routing &amp; Follow-Up</span>
                      <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Auto</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-amber-200 flex items-center justify-between">
                      <span>Quote Validation Engine</span>
                      <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Auto</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-rose-200 flex items-center justify-between">
                      <span>Slack Manager Approval</span>
                      <span className="text-[9px] font-mono bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">Handoff</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-rose-200 flex items-center justify-between">
                      <span>Finance Escalation Channel</span>
                      <span className="text-[9px] font-mono bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">Handoff</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-teal-200 flex items-center justify-between">
                      <span>Decision Capture &amp; Regression Pack</span>
                      <span className="text-[9px] font-mono bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-bold">Test</span>
                    </div>
                  </div>
                </div>

                {/* 3. STILL CLIENT-SPECIFIC (3 Decisions) */}
                <div className="p-4 bg-amber-50/70 border-2 border-amber-300 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-1.5">
                    <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      STILL CLIENT-SPECIFIC
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-300">
                      3 Decisions
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-800 font-semibold">
                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center justify-between">
                      <span>1. CFO margin threshold</span>
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">Policy</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center justify-between">
                      <span>2. Strategic-account policy</span>
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">Policy</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center justify-between">
                      <span>3. Approver hierarchy</span>
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">Org</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowQuestionsModal(!showQuestionsModal)}
                    className="w-full py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg border border-amber-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showQuestionsModal ? 'Hide decision preview' : 'Preview 3 client questions'}</span>
                  </button>
                </div>

              </div>

              {/* Modal preview of the 3 questions */}
              {showQuestionsModal && (
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 animate-fadeIn border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-violet-300 uppercase tracking-wider">3 Client Decision Questions</span>
                    <button onClick={() => setShowQuestionsModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-800 rounded-lg space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Question 1</span>
                      <p className="font-semibold text-slate-200">What is the CFO margin floor threshold?</p>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Question 2</span>
                      <p className="font-semibold text-slate-200">Which account tiers qualify for strategic overrides?</p>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Question 3</span>
                      <p className="font-semibold text-slate-200">Who owns final escalation approval hierarchy?</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* TAB 6 — Compounding Advantage */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 6 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    Compounding Economics
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Compounding AI Implementation Advantage
                  </h2>
                </div>
                <button
                  onClick={() => setShowLibraryDrawer(true)}
                  className="px-3.5 py-1.5 text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                  <span>Explore component library</span>
                </button>
              </div>

              {/* Implementation Progression: #1 -> #6 -> #12 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                
                {/* Implementation #1 */}
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-900 text-sm">Implementation #1</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Baseline</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-2xl font-extrabold text-slate-800 block">3 components</span>
                    <span className="text-xs font-semibold text-slate-500">~320 hrs human effort</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] font-bold text-slate-700 font-mono">
                    81% mapping confidence
                  </div>
                </div>

                {/* Implementation #6 */}
                <div className="p-5 bg-violet-50/60 border border-violet-200 rounded-2xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-violet-200 pb-2">
                    <span className="font-bold text-violet-900 text-sm">Implementation #6</span>
                    <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded">Midway</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-2xl font-extrabold text-violet-900 block">18 components</span>
                    <span className="text-xs font-semibold text-violet-700">~190 hrs human effort</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-violet-200 text-[11px] font-bold text-violet-800 font-mono">
                    90% mapping confidence
                  </div>
                </div>

                {/* Implementation #12 */}
                <div className="p-5 bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl space-y-3 shadow-md">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="font-bold text-emerald-950 text-sm">Implementation #12</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">Productized</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-2xl font-extrabold text-emerald-700 block">32 components</span>
                    <span className="text-xs font-semibold text-emerald-800">~110 hrs human effort</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-[11px] font-bold text-emerald-900 font-mono">
                    96% mapping confidence
                  </div>
                </div>

              </div>

              {/* 4 Compounding Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold text-center">
                <div className="p-3 bg-purple-50 text-purple-900 border border-purple-200 rounded-xl flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span>Reusable agents ↑</span>
                </div>
                <div className="p-3 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Workflows &amp; automations ↑</span>
                </div>
                <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl flex items-center justify-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-amber-600" />
                  <span>Client configuration ↓</span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span>Human effort ↓</span>
                </div>
              </div>

              {/* Strong Bottom Line */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-xl text-center space-y-2 border border-slate-800">
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  More implementations → more prebuilt AI operations → less human implementation work
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 font-mono pt-1">
                  <span>32 reusable components</span>
                  <span>·</span>
                  <span>247 learned patterns</span>
                  <span>·</span>
                  <span>96% mapping confidence</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* COMPONENT LIBRARY DRAWER OVERLAY */}
        {/* ────────────────────────────────────────────────────────────── */}
        {showLibraryDrawer && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end animate-fadeIn">
            <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl space-y-5 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-violet-100 text-violet-700 rounded-lg">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Reusable Component Library</h3>
                      <p className="text-xs text-slate-500">32 productized implementation components</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLibraryDrawer(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-4 space-y-3.5 text-xs">
                  {/* Component 1 */}
                  <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Discount Exception Agent</span>
                      <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded border border-purple-300">
                        AI Agent
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">Agentforce Topic &amp; Guardrails</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-purple-200/80 font-mono">
                      <span>31 implementations</span>
                      <span>87% reusable</span>
                    </div>
                  </div>

                  {/* Component 2 */}
                  <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Margin-Risk Approval Flow</span>
                      <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded border border-blue-300">
                        Workflow
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">Salesforce Flow Orchestrator</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-blue-200/80 font-mono">
                      <span>31 implementations</span>
                      <span>87% reusable</span>
                    </div>
                  </div>

                  {/* Component 3 */}
                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Approval Follow-Up &amp; Escalation</span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                        Automation
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">Revenue Cloud Event Trigger</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-amber-200/80 font-mono">
                      <span>24 implementations</span>
                      <span>84% reusable</span>
                    </div>
                  </div>

                  {/* Component 4 */}
                  <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Slack Manager Approval Handoff</span>
                      <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
                        Human Handoff
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">Slack Block Kit Cards</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-rose-200/80 font-mono">
                      <span>21 implementations</span>
                      <span>78% reusable</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowLibraryDrawer(false)}
                  className="w-full py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Close Library
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
