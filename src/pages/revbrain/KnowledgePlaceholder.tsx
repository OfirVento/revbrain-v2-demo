// ── Learning Engine — RevBrain Accumulated Implementation Intelligence ─────
// 6 Guided Productized Screens:
// 1. Client Learning Corpus (Reusable Implementation Stack: Agents, Workflows, Automations)
// 2. Discount Approvals & Exceptions — Pattern Decomposition (87% Reusable Core -> AI Stack & 13% Policy)
// 3. Component Factory (Discount Approval Pack v3: Observed → Generalized → Componentized → Validated → Ready)
// 4. Q2C Operating Model Readiness (10 Q2C Workflows x 4 Revenue Operating Models Matrix + Cell AI Breakdown)
// 5. Next Client Simulation (Complex Enterprise Sales — 86% AI Stack Prebuilt by Type, 3 Policy Decisions)
// 6. Compounding Advantage (Implementation #1 → #6 → #12 Reusable Agents & Automations Progression)

import { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Eye,
  GitMerge,
  Package,
  X,
  Lock,
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
  Building,
} from 'lucide-react';

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

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-140px)] bg-slate-100/60 text-slate-800 font-sans">
      <div className="max-w-[1440px] mx-auto w-full px-6 pt-5 pb-20 space-y-4 flex-1">

        {/* ── Top Header Navigation Bar ──────────────────────────────── */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {screen > 1 && (
              <button
                onClick={() => setScreen(screen - 1)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-[11px] font-bold tracking-wide font-mono">
                {screen} of 6 · Learning Engine
              </span>
              <h1 className="text-base font-bold text-slate-900">
                {screen === 1 && 'Client Learning Corpus'}
                {screen === 2 && 'Discount Approvals & Exceptions — Pattern Extraction'}
                {screen === 3 && 'Component Factory — Discount Approval Pack v3'}
                {screen === 4 && 'Q2C Operating Model Readiness'}
                {screen === 5 && 'Next Client Simulation'}
                {screen === 6 && 'Compounding AI Implementation Advantage'}
              </h1>
            </div>
          </div>

          {/* Compact Top Metric Line */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="hidden md:inline font-mono text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80 font-bold">
              47 implementations · 247 learned patterns · 32 reusable components
            </span>

            {/* Screen Step Dots (1..6) */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <button
                  key={s}
                  onClick={() => setScreen(s)}
                  title={`Go to Screen ${s}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    s === screen
                      ? 'bg-violet-600 ring-2 ring-violet-300 scale-125'
                      : s < screen
                      ? 'bg-emerald-500'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* SCREEN 1 — Client Learning Corpus */}
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
                        onClick={() => setSelectedRowId('3')}
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
                        onClick={() => setSelectedRowId('8')}
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
                        onClick={() => setSelectedRowId('2')}
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
                        onClick={() => setSelectedRowId('6')}
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
                        onClick={() => setSelectedRowId('5')}
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
        {/* SCREEN 2 — Pattern Extraction */}
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
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-600 block">87% Reusable</span>
                  <span className="text-[11px] font-semibold text-slate-400 font-mono">
                    31 implementations · 214 approval paths · 46 policy variants · 143 validation scenarios
                  </span>
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
        {/* SCREEN 3 — Component Factory */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 3 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    AI-First Implementation Pack
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Component Factory: Discount Approval Pack v3
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
                      <p><strong className="text-white">Observed:</strong> 31 implementations</p>
                      <p><strong className="text-white">Generalized:</strong> 87% shared behavior</p>
                      <p><strong className="text-white">Componentized:</strong> 1 Agent · 1 Flow · 2 Automations · 2 Handoffs · 1 Knowledge</p>
                      <p><strong className="text-white">Validated:</strong> 143 business scenarios</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 5 Pipeline Stages: Observed -> Generalized -> Componentized -> Validated -> Ready */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                
                {/* 1. Observed */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">1. Observed</span>
                  <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    31 impls
                  </span>
                  <p className="text-[10px] text-slate-500">Raw logs &amp; approvals</p>
                </div>

                {/* 2. Generalized */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <GitMerge className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">2. Generalized</span>
                  <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    87% shared logic
                  </span>
                  <p className="text-[10px] text-slate-500">Logic abstraction</p>
                </div>

                {/* 3. Componentized */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <Layers className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">3. Componentized</span>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    1 Agent · 1 Flow · 2 Autos
                  </span>
                  <p className="text-[10px] text-slate-500">Stack decomposition</p>
                </div>

                {/* 4. Validated */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">4. Validated</span>
                  <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    143 scenarios
                  </span>
                  <p className="text-[10px] text-slate-500">Test pack certified</p>
                </div>

                {/* 5. Ready */}
                <div className="p-4 bg-emerald-50/90 border-2 border-emerald-300 rounded-xl space-y-2 text-center shadow-md">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-emerald-950 block">5. Ready</span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                    Next Client Ready
                  </span>
                  <p className="text-[10px] text-emerald-700 font-medium">Prebuilt Pack</p>
                </div>

              </div>

              {/* Productized Pack Visual Grid */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Productized Components in Discount Approval Pack v3
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  
                  {/* AI Agent */}
                  <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-purple-200 text-purple-900 font-bold rounded text-[10px] flex items-center gap-1">
                        <Bot className="w-3 h-3 text-purple-700" />
                        <span>AI Agent</span>
                      </span>
                      <span className="text-[10px] text-purple-700 font-bold">Agentforce</span>
                    </div>
                    <h4 className="font-bold text-purple-950 text-xs pt-1">Discount Exception Agent</h4>
                    <p className="text-[10px] text-slate-600">Evaluates margin risk &amp; suggests approval rationale</p>
                  </div>

                  {/* Workflow */}
                  <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-blue-200 text-blue-900 font-bold rounded text-[10px] flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-blue-700" />
                        <span>Workflow</span>
                      </span>
                      <span className="text-[10px] text-blue-700 font-bold">Flow Builder</span>
                    </div>
                    <h4 className="font-bold text-blue-950 text-xs pt-1">Margin-Risk Approval Flow</h4>
                    <p className="text-[10px] text-slate-600">Routes exceptions based on margin floors &amp; account tiers</p>
                  </div>

                  {/* Automation */}
                  <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-bold rounded text-[10px] flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-700" />
                        <span>Automation</span>
                      </span>
                      <span className="text-[10px] text-amber-700 font-bold">Revenue Cloud</span>
                    </div>
                    <h4 className="font-bold text-amber-950 text-xs pt-1">Approval Follow-Up &amp; Escalation</h4>
                    <p className="text-[10px] text-slate-600">Auto-escalates stalled approvals after SLA expiration</p>
                  </div>

                  {/* Human Handoff */}
                  <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-rose-200 text-rose-900 font-bold rounded text-[10px] flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-rose-700" />
                        <span>Human Handoff</span>
                      </span>
                      <span className="text-[10px] text-rose-700 font-bold">Slack API</span>
                    </div>
                    <h4 className="font-bold text-rose-950 text-xs pt-1">Slack Manager Approval</h4>
                    <p className="text-[10px] text-slate-600">Interactive block kit approval cards for manager action</p>
                  </div>

                  {/* Knowledge */}
                  <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 font-bold rounded text-[10px] flex items-center gap-1">
                        <Brain className="w-3 h-3 text-emerald-700" />
                        <span>Knowledge Loop</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">RevBrain Store</span>
                    </div>
                    <h4 className="font-bold text-emerald-950 text-xs pt-1">Decision &amp; Rationale Capture</h4>
                    <p className="text-[10px] text-slate-600">Stores historical decision reasons to train future recommendations</p>
                  </div>

                  {/* Validation */}
                  <div className="p-3 bg-teal-50/80 border border-teal-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-teal-200 text-teal-900 font-bold rounded text-[10px] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-teal-700" />
                        <span>Validation</span>
                      </span>
                      <span className="text-[10px] text-teal-700 font-bold">Automated Suite</span>
                    </div>
                    <h4 className="font-bold text-teal-950 text-xs pt-1">Approval Behavior Test Pack</h4>
                    <p className="text-[10px] text-slate-600">143 regression tests verifying rule execution accuracy</p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* SCREEN 4 — Q2C Operating Model Readiness */}
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
        {/* SCREEN 5 — Next Client Simulation */}
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
        {/* SCREEN 6 — Compounding Advantage */}
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
