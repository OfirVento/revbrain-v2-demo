// ── Learning Engine — RevBrain Accumulated Implementation Intelligence ─────
// 6 Guided Productized Screens:
// 1. Client Learning Corpus (Operating Model Coverage & Learned Pattern Table)
// 2. Discount Approval — Pattern Decomposition (87% Reusable Core & 13% Policy Variants)
// 3. Component Factory (Approval Routing Core v3 Pipeline: Observed → Generalized → Validated → Productized → Ready)
// 4. Q2C Operating Model Readiness (8 Q2C Workflows x 4 Revenue Operating Models Matrix)
// 5. Next Client Simulation (Complex Enterprise Sales — 86% Foundation, 8 Prebuilt Components, 3 Decisions)
// 6. Compounding Advantage (Implementation #1 → #6 → #12 Effort & Confidence Progression)

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
  Layers,
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

/* ── Q2C Workflows x 4 Models Matrix Data (Screen 4) ────────────────── */

export interface Q2CMatrixRow {
  workflow: string;
  saas: number;
  usage: number;
  enterprise: number;
  productsServices: number;
}

export const Q2C_WORKFLOW_MATRIX: Q2CMatrixRow[] = [
  { workflow: '1. Quote Creation', saas: 86, usage: 78, enterprise: 88, productsServices: 82 },
  { workflow: '2. Bundle Configuration', saas: 74, usage: 61, enterprise: 77, productsServices: 90 },
  { workflow: '3. Pricing & Discounts', saas: 86, usage: 92, enterprise: 88, productsServices: 79 },
  { workflow: '4. Discount Approval', saas: 82, usage: 71, enterprise: 91, productsServices: 84 },
  { workflow: '5. Contracted Pricing', saas: 72, usage: 68, enterprise: 89, productsServices: 81 },
  { workflow: '6. Renewals & Amendments', saas: 89, usage: 64, enterprise: 72, productsServices: 58 },
  { workflow: '7. Quote Documents', saas: 83, usage: 76, enterprise: 85, productsServices: 88 },
  { workflow: '8. Quote-to-Order', saas: 76, usage: 81, enterprise: 84, productsServices: 86 },
];

/* ── Main Component ────────────────────────────────────────────────── */

export function KnowledgePlaceholder() {
  const [screen, setScreen] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<string>('Complex Enterprise Sales');
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
                {screen === 2 && 'Discount Approval — Pattern Decomposition'}
                {screen === 3 && 'Component Factory'}
                {screen === 4 && 'Q2C Operating Model Readiness'}
                {screen === 5 && 'Next Client Simulation'}
                {screen === 6 && 'Compounding Implementation Advantage'}
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

              {/* Learned Pattern Table / Cards */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Learned Areas &amp; Reusable Components
                  </span>
                  <span className="text-[10px] text-violet-600 font-semibold italic">
                    ★ Discount Approval highlighted as highest-leverage pattern
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 font-mono">
                        <th className="p-3 pl-4">Learned Pattern</th>
                        <th className="p-3 text-right">Implementations</th>
                        <th className="p-3 text-right">Shared Behavior</th>
                        <th className="p-3 pr-4">Productized State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {/* Highlighted Pattern: Discount Approval */}
                      <tr
                        onClick={() => setScreen(2)}
                        className="bg-violet-50/80 hover:bg-violet-100/80 text-slate-900 font-bold transition-colors cursor-pointer ring-1 ring-violet-200"
                      >
                        <td className="p-3 pl-4 flex items-center gap-2 text-violet-950">
                          <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                          <span>Discount Approval</span>
                          <span className="text-[9px] bg-violet-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Explore Next
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono text-violet-900">31</td>
                        <td className="p-3 text-right font-mono text-emerald-700 font-bold">87%</td>
                        <td className="p-3 pr-4 text-violet-800">Approval Routing Core v3</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 pl-4 font-semibold text-slate-800">Pricing Procedure</td>
                        <td className="p-3 text-right font-mono text-slate-600">24</td>
                        <td className="p-3 text-right font-mono text-emerald-600">84%</td>
                        <td className="p-3 pr-4 text-slate-700 font-mono text-[11px]">Pricing Core v2</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 pl-4 font-semibold text-slate-800">Quote-to-Order</td>
                        <td className="p-3 text-right font-mono text-slate-600">21</td>
                        <td className="p-3 text-right font-mono text-emerald-600">78%</td>
                        <td className="p-3 pr-4 text-slate-700 font-mono text-[11px]">Handoff Core v2</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 pl-4 font-semibold text-slate-800">Bundle Configuration</td>
                        <td className="p-3 text-right font-mono text-slate-600">19</td>
                        <td className="p-3 text-right font-mono text-emerald-600">81%</td>
                        <td className="p-3 pr-4 text-slate-700 font-mono text-[11px]">Bundle Logic v2</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 pl-4 font-semibold text-slate-800">Renewals &amp; Amendments</td>
                        <td className="p-3 text-right font-mono text-slate-600">18</td>
                        <td className="p-3 text-right font-mono text-emerald-600">79%</td>
                        <td className="p-3 pr-4 text-slate-700 font-mono text-[11px]">Renewal Core v1</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 pl-4 font-semibold text-slate-800">Contracted Pricing</td>
                        <td className="p-3 text-right font-mono text-slate-600">14</td>
                        <td className="p-3 text-right font-mono text-emerald-600">76%</td>
                        <td className="p-3 pr-4 text-slate-700 font-mono text-[11px]">Pricing Context v2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                Deepest coverage observed in Complex Enterprise Sales (17 impls).
              </span>
              <button
                onClick={() => setScreen(2)}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Show highest-leverage pattern</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
                    Pattern Decomposition Focus
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Discount Approval — Pattern Decomposition
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-600 block">87% Reusable</span>
                  <span className="text-[11px] font-semibold text-slate-400 font-mono">
                    31 implementations · 214 approval paths · 46 policy variants · 143 validation scenarios
                  </span>
                </div>
              </div>

              {/* Two Main Columns: Reusable Core (87%) vs Client-Specific (13%) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left: Reusable Core — 87% */}
                <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-base font-bold text-emerald-950">Reusable Core — 87%</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-300">
                      8 Recurring Logic Patterns
                    </span>
                  </div>

                  {/* 8 Recurring Logic Patterns */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">1. Margin threshold eval</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">2. Approval-path selection</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">3. Manager routing</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">4. Finance risk escalation</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">5. Strategic exception handling</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">6. Evidence packaging</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">7. Decision rationale capture</div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">8. Post-approval writeback</div>
                  </div>

                  {/* Common Implementation Components */}
                  <div className="border-t border-emerald-200 pt-3 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Common Implementation Components
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-700">
                      <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">Revenue Cloud pricing context</span>
                      <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">Flow routing</span>
                      <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">Human approval handoff</span>
                      <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">Agent recommendation</span>
                      <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">Knowledge capture</span>
                      <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">Regression validation</span>
                    </div>
                  </div>
                </div>

                {/* Right: Client-Specific — 13% */}
                <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-slate-700" />
                      <h3 className="text-base font-bold text-slate-900">Client-Specific — 13%</h3>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-300">
                      46 Observed Variants
                    </span>
                  </div>

                  {/* 8 Observed Variants list */}
                  <div className="space-y-1.5 text-xs font-semibold text-slate-800">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>Threshold values</span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">11 variants</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>Approver hierarchy</span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">8 variants</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>Strategic-account definition</span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">7 variants</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>Finance escalation policy</span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">6 variants</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>SLA / escalation timing</span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">5 variants</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>Contracted pricing precedence</span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">4 variants</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium border-t border-slate-200 pt-2">
                    The system architecture repeats far more than the business parameters.
                  </p>
                </div>

              </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                The remaining 13% consists of configurable policy thresholds and org hierarchy.
              </span>
              <button
                onClick={() => setScreen(3)}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Show what can be productized</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
                    Productization Pipeline
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Component Factory: Approval Routing Core v3
                  </h2>
                </div>

                {/* Lineage Link */}
                <div className="relative">
                  <button
                    onClick={() => setShowLineagePopover(!showLineagePopover)}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-800 underline underline-offset-2 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View lineage</span>
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>

                  {showLineagePopover && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 text-slate-100 rounded-xl p-4 shadow-xl border border-slate-800 text-xs space-y-2 z-50 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <span className="font-bold text-violet-300 uppercase text-[10px] tracking-wider">Component Lineage</span>
                        <button onClick={() => setShowLineagePopover(false)} className="text-slate-400 hover:text-white cursor-pointer">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p><strong className="text-white">Observed:</strong> 31 implementations</p>
                      <p><strong className="text-white">Generalized:</strong> 8 recurring logic patterns</p>
                      <p><strong className="text-white">Validated:</strong> 143 business scenarios</p>
                      <p><strong className="text-white">Productized:</strong> Revenue Cloud + Flow + Agentforce</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 5 Pipeline Stages: Observed -> Generalized -> Validated -> Productized -> Ready */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                
                {/* 1. Observed */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">1. Observed</span>
                  <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    31 implementations
                  </span>
                  <p className="text-[10px] text-slate-500">Raw CPQ &amp; Approval logs</p>
                </div>

                {/* 2. Generalized */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <GitMerge className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">2. Generalized</span>
                  <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    8 recurring patterns
                  </span>
                  <p className="text-[10px] text-slate-500">Standard logic abstraction</p>
                </div>

                {/* 3. Validated */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">3. Validated</span>
                  <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    143 scenarios
                  </span>
                  <p className="text-[10px] text-slate-500">Automated test pack pass</p>
                </div>

                {/* 4. Productized */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">4. Productized</span>
                  <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    Revenue Cloud + Flow
                  </span>
                  <p className="text-[10px] text-slate-500">+ Agentforce Integration</p>
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
                  <p className="text-[10px] text-emerald-700 font-medium">Pre-built &amp; certified</p>
                </div>

              </div>

              {/* Small Metadata & Validated Operating Models */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="font-mono text-slate-700 font-semibold">
                  31 implementations · 143 validations · 46 policy variants · 87% reusable
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Validated Models:
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-800 font-bold">
                    Complex Enterprise Sales
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-800 font-bold">
                    Subscription SaaS
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-800 font-bold">
                    Product + Services
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                The architecture is reusable across multiple operating models; client policy stays configurable.
              </span>
              <button
                onClick={() => setScreen(4)}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>See readiness</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    Productization Coverage Matrix
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Q2C Operating Model Readiness
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 block">8 Quote-to-Cash Workflows</span>
                  <span className="text-[11px] text-slate-400 font-semibold">Click a model header to focus</span>
                </div>
              </div>

              {/* 8 Workflows x 4 Operating Models Matrix */}
              <div className="space-y-2">
                <div className="grid grid-cols-[200px_1fr_1fr_1fr_1fr] gap-2 text-xs font-bold text-center">
                  <div className="text-left text-slate-400 uppercase tracking-wider text-[10px] self-end pb-1 pl-2">
                    Q2C Workflow
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
                {Q2C_WORKFLOW_MATRIX.map((row) => (
                  <div key={row.workflow} className="grid grid-cols-[200px_1fr_1fr_1fr_1fr] gap-2 items-center text-xs">
                    <div className="text-slate-900 font-bold pl-2 truncate">{row.workflow}</div>

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

                {/* Selected Model Focus Summary Banner */}
                <div className="p-3.5 bg-violet-50/90 border border-violet-200 rounded-xl flex items-center justify-between text-xs text-violet-900 mt-3">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="font-bold">{selectedModel} Readiness Focus:</span>
                    <span className="font-medium">
                      Discount Approval 91% · Contracted Pricing 89% · Pricing 88% · Quote Creation 88% · and more...
                    </span>
                  </div>
                  <span className="font-bold text-violet-800 bg-white px-2.5 py-1 rounded border border-violet-300 shrink-0 font-mono">
                    86% Avg Coverage
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                Complex Enterprise Sales is strongest in approval, pricing, and contracted terms.
              </span>
              <button
                onClick={() => setScreen(5)}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Simulate next client</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
              <div className="p-6 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-2xl shadow-lg border border-violet-500/30 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-300 block">Pre-Discovery Foundation</span>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">
                    86% implementation foundation already available
                  </h3>
                  <p className="text-xs text-slate-300 font-medium pt-0.5">
                    8 components prebuilt · 3 business decisions still needed
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 text-center font-mono">
                  <span className="text-2xl font-black text-emerald-400 block">8 / 11</span>
                  <span className="text-[10px] font-bold uppercase text-slate-200">Prebuilt Artifacts</span>
                </div>
              </div>

              {/* Ready vs Still Client-Specific Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                
                {/* READY FROM PREVIOUS LEARNING (8 components) */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      READY FROM PREVIOUS LEARNING
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      8 Components
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-800 font-semibold">
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Approval Routing Core</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Margin Risk Classification</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pricing Context</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Strategic Exception Handling</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Human Approval Handoff</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Validation Pack</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Quote Document Mapping</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Quote-to-Order Handoff</span>
                    </div>
                  </div>
                </div>

                {/* STILL CLIENT-SPECIFIC (3 decisions) */}
                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                    <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      STILL CLIENT-SPECIFIC
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
                      3 Business Decisions
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-800 font-semibold">
                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center justify-between">
                      <span>1. CFO margin policy floor</span>
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">Policy Input</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center justify-between">
                      <span>2. Strategic-account criteria</span>
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">Policy Input</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-amber-200 flex items-center justify-between">
                      <span>3. Approver escalation hierarchy</span>
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">Org Matrix</span>
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
                      <p className="font-semibold text-slate-200">What is the CFO margin floor?</p>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Question 2</span>
                      <p className="font-semibold text-slate-200">Which accounts qualify as strategic?</p>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Question 3</span>
                      <p className="font-semibold text-slate-200">Who owns final escalation?</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                I only need the three business policies that make this customer unique.
              </span>
              <button
                onClick={() => setScreen(6)}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Show compounding impact</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
                    Compounding Implementation Advantage
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
                    <span className="text-2xl font-extrabold text-slate-800 block">~320 hrs</span>
                    <span className="text-xs font-semibold text-slate-500">Human Implementation Effort</span>
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
                    <span className="text-2xl font-extrabold text-violet-900 block">~190 hrs</span>
                    <span className="text-xs font-semibold text-violet-700">Human Implementation Effort</span>
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
                    <span className="text-2xl font-extrabold text-emerald-700 block">~110 hrs</span>
                    <span className="text-xs font-semibold text-emerald-800">Human Implementation Effort</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-[11px] font-bold text-emerald-900 font-mono">
                    96% mapping confidence
                  </div>
                </div>

              </div>

              {/* 3 Simple Trends */}
              <div className="grid grid-cols-3 gap-3 text-xs font-bold text-center">
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Reusable components ↑</span>
                </div>
                <div className="p-3 bg-violet-50 text-violet-900 border border-violet-200 rounded-xl flex items-center justify-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-violet-600" />
                  <span>Client-specific discovery ↓</span>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl flex items-center justify-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-indigo-600" />
                  <span>Human implementation effort ↓</span>
                </div>
              </div>

              {/* Strong Bottom Line */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-xl text-center space-y-2 border border-slate-800">
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  More implementations → more reusable context → less human implementation work
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

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                The next implementation starts further ahead than the last one.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLibraryDrawer(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore components</span>
                </button>
                <button
                  onClick={() => setScreen(4)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Simulate another model
                </button>
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
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Approval Routing Core v3</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        87% Reusable
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">Revenue Cloud + Flow + Agentforce</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/80 font-mono">
                      <span>31 implementations</span>
                      <span>143 validations</span>
                    </div>
                  </div>

                  {/* Component 2 */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Margin Risk Classification</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        86% Reusable
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">Pricing Engine + Custom Metadata</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/80 font-mono">
                      <span>24 implementations</span>
                      <span>91 validations</span>
                    </div>
                  </div>

                  {/* Component 3 */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Pricing Context Procedure</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        79% Reusable
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">Revenue Cloud Pricing</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/80 font-mono">
                      <span>19 implementations</span>
                      <span>74 validations</span>
                    </div>
                  </div>

                  {/* Component 4 */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">Knowledge Engine Capture</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        88% Reusable
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">Agentforce + Slack</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/80 font-mono">
                      <span>17 implementations</span>
                      <span>68 validations</span>
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
