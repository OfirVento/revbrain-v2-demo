// ── Learning Engine — RevBrain Compounding Intelligence Factory ─────────────
// Guided sequence of 6 screens:
// 1. Client Learning Map
// 2. Pattern Extraction
// 3. Component Factory
// 4. Segment Readiness
// 5. Next Client Simulation
// 6. Compounding Advantage

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
  Building2,
  X,
  Lock,
  Sliders,
  HelpCircle,
  Check,
} from 'lucide-react';

/* ── Screen Definition ─────────────────────────────────────────────── */

export function KnowledgePlaceholder() {
  const [screen, setScreen] = useState<number>(1);
  const [selectedSegment, setSelectedSegment] = useState<string>('B2B SaaS');
  const [showQuestionsModal, setShowQuestionsModal] = useState<boolean>(false);
  const [showLibraryDrawer, setShowLibraryDrawer] = useState<boolean>(false);
  const [showLineagePopover, setShowLineagePopover] = useState<boolean>(false);

  // Broadcast screen change to RevBrainBottomAgent
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('revbrain-learning-screen-change', {
        detail: { screen },
      })
    );
  }, [screen]);

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
      <div className="max-w-[1400px] mx-auto w-full px-6 pt-5 pb-16 space-y-4 flex-1">

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
              <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-[11px] font-bold tracking-wide">
                {screen} of 6 · Learning Engine
              </span>
              <h1 className="text-base font-bold text-slate-900">
                {screen === 1 && 'Client Learning Map'}
                {screen === 2 && 'Pattern Extraction'}
                {screen === 3 && 'Component Factory'}
                {screen === 4 && 'Segment Readiness'}
                {screen === 5 && 'Next Client Simulation'}
                {screen === 6 && 'Compounding Advantage'}
              </h1>
            </div>
          </div>

          {/* Compact Top Metric Line */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="hidden md:inline font-mono text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80">
              47 client learnings · 247 patterns · 32 reusable components
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
        {/* SCREEN 1 — Client Learning Map */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 1 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Proprietary Intelligence Source Network
                  </h2>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Every customer implementation feeds RevBrain&apos;s generalized pattern engine.
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80">
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Client data remains isolated. RevBrain reuses generalized patterns only.</span>
                </div>
              </div>

              {/* Visual Map Canvas */}
              <div className="py-6 relative flex items-center justify-center min-h-[400px]">
                
                {/* SVG Connecting Lines Background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-violet-200/70" strokeWidth="1.5">
                  <line x1="15%" y1="18%" x2="35%" y2="30%" strokeDasharray="4 4" className="animate-pulse" />
                  <line x1="15%" y1="42%" x2="35%" y2="30%" strokeDasharray="4 4" />
                  <line x1="15%" y1="65%" x2="35%" y2="52%" strokeDasharray="4 4" />
                  <line x1="15%" y1="85%" x2="35%" y2="70%" strokeDasharray="4 4" />

                  <line x1="85%" y1="18%" x2="65%" y2="30%" strokeDasharray="4 4" />
                  <line x1="85%" y1="42%" x2="65%" y2="52%" strokeDasharray="4 4" />
                  <line x1="85%" y1="65%" x2="65%" y2="52%" strokeDasharray="4 4" />
                  <line x1="85%" y1="85%" x2="65%" y2="70%" strokeDasharray="4 4" />

                  <line x1="35%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-violet-400" />
                  <line x1="35%" y1="52%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-violet-400" />
                  <line x1="35%" y1="70%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-violet-400" />
                  <line x1="65%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-violet-400" />
                  <line x1="65%" y1="52%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-violet-400" />
                  <line x1="65%" y1="70%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-violet-400" />
                </svg>

                {/* Outer Layer: Anonymized Client Implementations */}
                <div className="absolute left-4 top-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">B2B SaaS</span>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">CloudScale SaaS</div>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">DataFlow.io</div>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">SaaSify Corp</div>
                </div>

                <div className="absolute left-4 bottom-6 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Manufacturing</span>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">PrecisionMfg Co</div>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">Industrial Solutions</div>
                </div>

                <div className="absolute right-4 top-4 space-y-2 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Enterprise Software</span>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">Enterprise Systems Ltd</div>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">OmniSoft Global</div>
                </div>

                <div className="absolute right-4 bottom-6 space-y-2 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Services</span>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">Apex Advisory</div>
                  <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">Global Services Group</div>
                </div>

                {/* Middle Layer: Use Cases */}
                <div className="absolute left-[30%] top-[20%] p-3 bg-violet-50 border-2 border-violet-400 rounded-xl shadow-md space-y-0.5 text-center animate-pulse">
                  <span className="text-xs font-bold text-violet-900 block">Discount Approval</span>
                  <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded">31 Orgs · 87% Reusable</span>
                </div>

                <div className="absolute left-[28%] top-[48%] p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Pricing Procedure</span>
                  <span className="text-[10px] text-slate-500 font-semibold">24 Orgs</span>
                </div>

                <div className="absolute left-[30%] bottom-[18%] p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Bundle Configuration</span>
                  <span className="text-[10px] text-slate-500 font-semibold">19 Orgs</span>
                </div>

                <div className="absolute right-[30%] top-[20%] p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Renewals Automation</span>
                  <span className="text-[10px] text-slate-500 font-semibold">18 Orgs</span>
                </div>

                <div className="absolute right-[28%] top-[48%] p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Quote-to-Order</span>
                  <span className="text-[10px] text-slate-500 font-semibold">21 Orgs</span>
                </div>

                <div className="absolute right-[30%] bottom-[18%] p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Contracted Pricing</span>
                  <span className="text-[10px] text-slate-500 font-semibold">14 Orgs</span>
                </div>

                {/* Center Core: RevBrain Learning Engine */}
                <div className="relative z-10 p-6 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 text-white rounded-2xl shadow-xl border-2 border-violet-300 text-center space-y-2 max-w-[220px]">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">RevBrain Learning Engine</h3>
                    <p className="text-[10px] text-violet-200 font-medium">Accumulated Intelligence Core</p>
                  </div>
                  <div className="pt-1 text-[11px] font-mono text-violet-100 bg-black/20 rounded-md py-1 px-2 border border-white/10">
                    47 Org Learnings
                  </div>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-400 font-medium">
                Multiple customer implementations continuously train shared use-case models.
              </span>
              <button
                onClick={() => setScreen(2)}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Show the pattern</span>
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
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    Deep-Dive Focus · Discount Approval
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Pattern Extraction: Shared vs. Client-Specific Behavior
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-600 block">87% Reusable</span>
                  <span className="text-[11px] font-semibold text-slate-400">31 implementations · 4 shared primitives · 6 policy variants</span>
                </div>
              </div>

              {/* Two Clear Areas Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
                
                {/* Shared Pattern — 87% */}
                <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-2xl p-5 space-y-4 shadow-2xs relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-base font-bold text-emerald-950">Shared Pattern — 87%</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-300 shadow-2xs">
                      4 Shared Primitives
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-semibold text-emerald-900">
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                      <span>• Margin threshold evaluation</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Core Logic</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                      <span>• Manager approval routing</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Slack Handoff</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                      <span>• Finance escalation trigger</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Risk Gate</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                      <span>• Rationale &amp; evidence capture</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Knowledge Loop</span>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 pt-2 border-t border-emerald-200/80">
                    Learned from 31 implementations
                  </p>
                </div>

                {/* Client-Specific — 13% */}
                <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5 space-y-4 shadow-2xs relative">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-slate-700" />
                      <h3 className="text-base font-bold text-slate-900">Client-Specific — 13%</h3>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-300 shadow-2xs">
                      6 Policy Variants
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-semibold text-slate-800">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
                      <span>• Threshold values (e.g. 25% vs 30%)</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Config Parameter</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
                      <span>• Approver hierarchy &amp; SLA rules</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Client Org Matrix</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
                      <span>• Strategic-account policy criteria</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Business Override</span>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-200">
                    Generalized across 6 policy variants
                  </p>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                87% of Discount Approval logic can be productized as a reusable component.
              </span>
              <button
                onClick={() => setScreen(3)}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Productize pattern</span>
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
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    Factory Transformation Pipeline
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Component Factory: Approval Routing Core v3
                  </h2>
                </div>

                {/* Lineage link */}
                <div className="relative">
                  <button
                    onClick={() => setShowLineagePopover(!showLineagePopover)}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-800 underline underline-offset-2 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View lineage</span>
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>

                  {/* Lightweight Popover */}
                  {showLineagePopover && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 text-slate-100 rounded-xl p-4 shadow-xl border border-slate-800 text-xs space-y-2 z-50 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <span className="font-bold text-violet-300 uppercase text-[10px] tracking-wider">Component Lineage</span>
                        <button onClick={() => setShowLineagePopover(false)} className="text-slate-400 hover:text-white cursor-pointer">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p><strong className="text-white">Learned from:</strong> 31 implementations</p>
                      <p><strong className="text-white">Generalized into:</strong> 4 common primitives</p>
                      <p><strong className="text-white">Validated against:</strong> 143 business scenarios</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Horizontal Production Pipeline Flow */}
              <div className="py-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                  
                  {/* Stage 1: Observed */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                      <Eye className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">1. Observed</span>
                    <span className="text-[11px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                      31 implementations
                    </span>
                    <p className="text-[10px] text-slate-500">Raw CPQ &amp; Approval logs</p>
                  </div>

                  {/* Stage 2: Generalized */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                      <GitMerge className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">2. Generalized</span>
                    <span className="text-[11px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                      4 shared primitives
                    </span>
                    <p className="text-[10px] text-slate-500">Standard policy abstraction</p>
                  </div>

                  {/* Stage 3: Validated */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">3. Validated</span>
                    <span className="text-[11px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                      143 business scenarios
                    </span>
                    <p className="text-[10px] text-slate-500">Automated test pack pass</p>
                  </div>

                  {/* Stage 4: Productized */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center shadow-2xs">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">4. Productized</span>
                    <span className="text-[11px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                      Revenue Cloud + Flow + Agentforce
                    </span>
                    <p className="text-[10px] text-slate-500">Deployable metadata package</p>
                  </div>

                  {/* Stage 5: Ready */}
                  <div className="p-4 bg-emerald-50/80 border-2 border-emerald-300 rounded-xl space-y-2 text-center shadow-md">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-emerald-950 block">5. Ready</span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                      Reusable for next client
                    </span>
                    <p className="text-[10px] text-emerald-700 font-medium">Pre-built &amp; certified</p>
                  </div>

                </div>

                {/* Factory Pipeline Pulse Indicator */}
                <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-emerald-300 font-semibold">Approval Routing Core v3 — Active Component</span>
                  </div>
                  <span className="font-mono text-slate-400">31 implementations · 143 validations · 6 variants · 82% reusable</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                Approval Routing Core now covers 82% of typical approval logic.
              </span>
              <button
                onClick={() => setScreen(4)}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>See where it is reusable</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* SCREEN 4 — Segment Readiness */}
        {/* ────────────────────────────────────────────────────────────── */}
        {screen === 4 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-[fadeIn_300ms_ease] min-h-[580px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    Productization Coverage
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Segment Readiness Matrix
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 block">Ready for 4 customer segments</span>
                  <span className="text-[11px] text-slate-400 font-semibold">Click segment column to focus</span>
                </div>
              </div>

              {/* Segment Readiness Tile Map */}
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-5 gap-3 text-xs text-center font-bold">
                  <div className="text-left text-slate-400 uppercase tracking-wider text-[10px] self-end pb-1">Use Case</div>
                  
                  {['B2B SaaS', 'Manufacturing', 'Services', 'Enterprise Software'].map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setSelectedSegment(seg)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedSegment === seg
                          ? 'bg-violet-600 text-white border-violet-700 shadow-md ring-2 ring-violet-300'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>

                {/* Rows */}
                {[
                  { useCase: 'Discount Approval', saas: '88%', mfg: '73%', svc: '81%', ent: '85%' },
                  { useCase: 'Pricing', saas: '84%', mfg: '69%', svc: '76%', ent: '82%' },
                  { useCase: 'Bundles', saas: '72%', mfg: '86%', svc: '58%', ent: '74%' },
                  { useCase: 'Renewals', saas: '79%', mfg: '42%', svc: '68%', ent: '77%' },
                  { useCase: 'Quote-to-Order', saas: '76%', mfg: '81%', svc: '71%', ent: '80%' },
                ].map((row) => (
                  <div key={row.useCase} className="grid grid-cols-5 gap-3 items-center text-xs font-semibold">
                    <div className="text-slate-800 font-bold text-xs">{row.useCase}</div>

                    <div className={`p-3 rounded-xl text-center border font-mono text-xs font-bold transition-all ${
                      selectedSegment === 'B2B SaaS'
                        ? 'bg-violet-50 text-violet-900 border-violet-300 ring-1 ring-violet-200 shadow-2xs'
                        : 'bg-slate-50/50 text-slate-400 border-slate-200/60'
                    }`}>
                      {row.saas}
                    </div>

                    <div className={`p-3 rounded-xl text-center border font-mono text-xs font-bold transition-all ${
                      selectedSegment === 'Manufacturing'
                        ? 'bg-violet-50 text-violet-900 border-violet-300 ring-1 ring-violet-200 shadow-2xs'
                        : 'bg-slate-50/50 text-slate-400 border-slate-200/60'
                    }`}>
                      {row.mfg}
                    </div>

                    <div className={`p-3 rounded-xl text-center border font-mono text-xs font-bold transition-all ${
                      selectedSegment === 'Services'
                        ? 'bg-violet-50 text-violet-900 border-violet-300 ring-1 ring-violet-200 shadow-2xs'
                        : 'bg-slate-50/50 text-slate-400 border-slate-200/60'
                    }`}>
                      {row.svc}
                    </div>

                    <div className={`p-3 rounded-xl text-center border font-mono text-xs font-bold transition-all ${
                      selectedSegment === 'Enterprise Software'
                        ? 'bg-violet-50 text-violet-900 border-violet-300 ring-1 ring-violet-200 shadow-2xs'
                        : 'bg-slate-50/50 text-slate-400 border-slate-200/60'
                    }`}>
                      {row.ent}
                    </div>
                  </div>
                ))}

                {/* Selected Segment Highlight summary */}
                <div className="p-4 bg-violet-50/80 border border-violet-200 rounded-xl flex items-center justify-between text-xs text-violet-900">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-violet-600" />
                    <span className="font-bold">{selectedSegment} Segment Focus:</span>
                    <span>Approval (88%) + Pricing (84%) are mostly prebuilt. Renewals (79%) still expanding.</span>
                  </div>
                  <span className="font-bold text-violet-700 bg-white px-2.5 py-1 rounded border border-violet-200">
                    84% Average Segment Readiness
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                For B2B SaaS, Approval + Pricing are already mostly prebuilt.
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
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    New Client Onboarding Simulation
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    New Client: Acme SaaS Corp · B2B SaaS Segment
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span>Salesforce CPQ</span>
                  <span>·</span>
                  <span>Advanced Approvals</span>
                </div>
              </div>

              {/* Large Impact Result Banner */}
              <div className="py-4 space-y-5">
                <div className="p-6 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-2xl shadow-lg border border-violet-500/30 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-300 block">Pre-Discovery Readiness</span>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                      82% ready before discovery starts
                    </h3>
                    <p className="text-xs text-slate-300 font-medium pt-1">
                      6 components prebuilt · 3 client decisions still needed
                    </p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 text-center">
                    <span className="text-2xl font-black text-emerald-400 block">6 / 9</span>
                    <span className="text-[10px] font-bold uppercase text-slate-200">Prebuilt Artifacts</span>
                  </div>
                </div>

                {/* Two Comparison Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  
                  {/* READY FROM PREVIOUS LEARNING */}
                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                      <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        READY FROM PREVIOUS LEARNING
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        6 Components
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-800 font-semibold">
                      <div className="p-2 bg-white rounded-lg border border-emerald-200/80 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Approval Routing Core</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-emerald-200/80 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Margin Risk Class.</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-emerald-200/80 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pricing Context</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-emerald-200/80 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Slack Approval Handoff</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-emerald-200/80 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Knowledge Capture</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-emerald-200/80 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Regression Test Pack</span>
                      </div>
                    </div>
                  </div>

                  {/* STILL CLIENT-SPECIFIC */}
                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                      <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-amber-600" />
                        STILL CLIENT-SPECIFIC
                      </span>
                      <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
                        3 Decisions Needed
                      </span>
                    </div>

                    <div className="space-y-2 text-slate-800 font-semibold">
                      <div className="p-2 bg-white rounded-lg border border-amber-200/80 flex items-center justify-between">
                        <span>1. CFO margin threshold value</span>
                        <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Default: 28%</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-amber-200/80 flex items-center justify-between">
                        <span>2. Strategic-account policy criteria</span>
                        <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">ARR &gt;$100k</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-amber-200/80 flex items-center justify-between">
                        <span>3. Approver hierarchy mapping</span>
                        <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Finance VP</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowQuestionsModal(!showQuestionsModal)}
                      className="w-full py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg border border-amber-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showQuestionsModal ? 'Hide decision preview' : 'Preview 3 client questions'}</span>
                    </button>
                  </div>

                </div>

                {/* Inline 3 Questions Preview Modal/Accordion */}
                {showQuestionsModal && (
                  <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 animate-fadeIn border border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-violet-300 uppercase tracking-wider">Remaining 3 Client Decisions</span>
                      <button onClick={() => setShowQuestionsModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-slate-800 rounded-lg space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Question 1</span>
                        <p className="font-semibold text-slate-200">What is the CFO margin floor for auto-approval?</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Question 2</span>
                        <p className="font-semibold text-slate-200">Which accounts qualify as strategic accounts?</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Question 3</span>
                        <p className="font-semibold text-slate-200">Who owns final escalation for margin exceptions?</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                Based on 11 similar implementations, RevBrain starts with 6 prebuilt components.
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
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded border border-violet-200">
                    Implementation Economics Progression
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    Compounding Advantage: Declining Effort &amp; Rising Confidence
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

              {/* Implementation Progression Visuals */}
              <div className="py-6 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                  
                  {/* Implementation #1 */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 shadow-2xs relative">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-900 text-sm">Implementation #1</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Initial Baseline</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-2xl font-extrabold text-slate-800 block">~320 hrs</span>
                      <span className="text-xs font-semibold text-slate-500">SI Implementation Effort</span>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-600">
                      81% mapping confidence
                    </div>

                    <p className="text-[10px] text-slate-400 italic">Manual discovery &amp; custom Apex scripting</p>
                  </div>

                  {/* Implementation #6 */}
                  <div className="p-5 bg-violet-50/60 border border-violet-200 rounded-2xl space-y-3 shadow-2xs relative">
                    <div className="flex items-center justify-between border-b border-violet-200 pb-2">
                      <span className="font-bold text-violet-900 text-sm">Implementation #6</span>
                      <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded">4 Shared Primitives</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-2xl font-extrabold text-violet-900 block">~190 hrs</span>
                      <span className="text-xs font-semibold text-violet-700">SI Implementation Effort</span>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-violet-200 text-[11px] font-semibold text-violet-800">
                      90% mapping confidence
                    </div>

                    <p className="text-[10px] text-violet-600 font-medium">• 41% effort reduction</p>
                  </div>

                  {/* Implementation #12 */}
                  <div className="p-5 bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl space-y-3 shadow-md relative">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                      <span className="font-bold text-emerald-950 text-sm">Implementation #12</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">6 Prebuilt Components</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-2xl font-extrabold text-emerald-700 block">~110 hrs</span>
                      <span className="text-xs font-semibold text-emerald-800">SI Implementation Effort</span>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-[11px] font-semibold text-emerald-900">
                      96% mapping confidence
                    </div>

                    <p className="text-[10px] text-emerald-700 font-bold">• 65% total effort reduction</p>
                  </div>

                </div>

                {/* Strong Bottom Line Banner */}
                <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl text-center space-y-2 border border-slate-800">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    More clients → more reusable context → less human implementation work
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-mono pt-2 border-t border-slate-800">
                    <span>32 reusable components</span>
                    <span>·</span>
                    <span>247 learned patterns</span>
                    <span>·</span>
                    <span>96% mapping confidence</span>
                    <span>·</span>
                    <span>82% ready for next client</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-medium">
                Every implementation expands what is ready for the next client.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLibraryDrawer(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore component library</span>
                </button>
                <button
                  onClick={() => setScreen(4)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Simulate another segment
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
                        82% Reusable
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
