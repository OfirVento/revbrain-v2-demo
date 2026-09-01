// ── Migration Map — Future Operating Model Opportunity ──────────────────
// Presents one selected process (Enterprise Discount Approval) as a
// future operating model transformation with ROI comparison, foundation
// validation, and operating model decision.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Zap,
  AlertCircle,
  HelpCircle,
  Database,
  Save,
  Send,
  Lock,
  FileText,
  Activity,
  Layers,
  Sparkles,
  Play,
  ArrowDown,
  Bot,
  Info,
  Shield,
} from 'lucide-react';
import { OPERATIONAL_WORKFLOWS } from './assess-data';

/* ── Flow step data ────────────────────────────────────────────────── */

interface FlowNode {
  label: string;
  badge: string;
  badgeColor: string;
  time: string;
}

const CURRENT_FLOW: FlowNode[] = [
  { label: 'Rep submits quote with discount', badge: 'Manual', badgeColor: 'bg-rose-100 text-rose-700 border border-rose-200', time: '~15 min' },
  { label: 'CPQ price rules and QCP calculate threshold/margin', badge: 'Automation', badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200', time: '<1 min' },
  { label: 'Manager reviews approval', badge: 'Manual', badgeColor: 'bg-rose-100 text-rose-700 border border-rose-200', time: '~10 min' },
  { label: 'Finance reviews high-risk exceptions manually', badge: 'Manual', badgeColor: 'bg-rose-100 text-rose-700 border border-rose-200 font-semibold', time: '~20 min' },
  { label: 'Deal Desk follows up via Slack/email', badge: 'Manual', badgeColor: 'bg-rose-100 text-rose-700 border border-rose-200', time: '~10 min' },
  { label: 'Decision returns to quote with limited rationale', badge: 'Limited rationale', badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200', time: '~5 min' },
];

const FUTURE_FLOW: FlowNode[] = [
  { label: 'Rep submits quote in Slack', badge: 'Slack Integration', badgeColor: 'bg-blue-100 text-blue-700 border border-blue-200', time: '~2 min' },
  { label: 'RCA pricing procedure evaluates threshold/margin', badge: 'RCA Foundation', badgeColor: 'bg-indigo-100 text-indigo-700 border border-indigo-200', time: '<1 min' },
  { label: 'Approval automation routes standard approval path', badge: 'Automation', badgeColor: 'bg-blue-100 text-blue-700 border border-blue-200', time: '<1 min' },
  { label: 'Discount Exception Agent gathers evidence and explains recommendation', badge: 'AI Agent', badgeColor: 'bg-violet-100 text-violet-700 border border-violet-200 font-semibold', time: '~2 min' },
  { label: 'Manager approves in Slack with business context', badge: 'Human Approval + Slack Integ.', badgeColor: 'bg-blue-100 text-blue-700 border border-blue-200', time: '~6 min' },
  { label: 'Finance reviews margin-risk exceptions only', badge: 'Human Approval + AI Agent', badgeColor: 'bg-violet-100 text-violet-700 border border-violet-200', time: '~5 min avg.' },
  { label: 'Knowledge Engine captures decision and rationale', badge: 'Knowledge Capture', badgeColor: 'bg-emerald-100 text-emerald-700 border border-emerald-200', time: '~1 min' },
];

interface ConfigNode {
  title: string;
  info: string;
  desc: string;
}

const CURRENT_CONFIG_FLOW: ConfigNode[] = [
  { title: 'Price Rules', info: '12 of 51 active rules', desc: 'Calculates thresholds and pricing adjustments' },
  { title: 'QCP Scripts', info: '3 of 8 scripts', desc: 'Calculates margin impact and exception logic' },
  { title: 'Approval Rules', info: '8 of 24 active rules', desc: 'Controls manager and finance routing' },
  { title: 'Discount Schedules', info: '6 schedules', desc: 'Defines discount tiers and boundaries' },
  { title: 'Quote Fields', info: '14 custom fields', desc: 'Stores discount, margin, account, and route context' },
  { title: 'Slack / Email Handoff Logic', info: '1 workflow alert', desc: 'Supports manual follow-up outside CPQ' },
];

interface FutureConfigNode {
  title: string;
  desc: string;
  badge: string;
  badgeColor: string;
}

const FUTURE_CONFIG_FLOW: FutureConfigNode[] = [
  { title: 'RCA Pricing Procedure', desc: 'Replaces threshold and margin evaluation', badge: 'RCA Foundation', badgeColor: 'bg-indigo-100 text-indigo-700 border border-indigo-200' },
  { title: 'Pricing / Margin Inputs', desc: 'Standardizes discount, margin, and account context', badge: 'RCA Foundation', badgeColor: 'bg-indigo-100 text-indigo-700 border border-indigo-200' },
  { title: 'Approval Automation', desc: 'Routes standard manager approvals', badge: 'Automation', badgeColor: 'bg-blue-100 text-blue-700 border border-blue-200' },
  { title: 'AI Topic', desc: 'Discount Exception Approval', badge: 'AI Agent', badgeColor: 'bg-violet-100 text-violet-700 border border-violet-200 font-semibold' },
  { title: 'AI Actions', desc: 'Request Manager Approval + Finance Review', badge: 'AI Action', badgeColor: 'bg-violet-100 text-violet-700 border border-violet-200' },
  { title: 'Knowledge Capture', desc: 'Stores rationale, evidence, approver, and override reason', badge: 'Knowledge Capture', badgeColor: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
];

const AGENT_QUESTIONS = [
  {
    id: 'q1',
    question: 'Which output must match current CPQ exactly?',
    options: [
      { id: 'q1-a', label: 'Discount threshold calc' },
      { id: 'q1-b', label: 'Margin impact output' },
      { id: 'q1-c', label: 'Both must match exactly' },
    ],
  },
  {
    id: 'q2',
    question: 'Should Finance review all discounts over 25%, or only margin-risk exceptions?',
    options: [
      { id: 'q2-a', label: 'All over 25%' },
      { id: 'q2-b', label: 'Only margin risk' },
      { id: 'q2-c', label: 'Ask Finance owner' },
    ],
  },
  {
    id: 'q3',
    question: 'What evidence should the agent show before routing approval?',
    options: [
      { id: 'q3-a', label: 'Similar deals + benchmarks' },
      { id: 'q3-b', label: 'Margin impact only' },
      { id: 'q3-c', label: 'Full deal context' },
    ],
  },
  {
    id: 'q4',
    question: 'Who owns final approval escalation?',
    options: [
      { id: 'q4-a', label: 'Sales VP' },
      { id: 'q4-b', label: 'Deal Desk Mgr' },
      { id: 'q4-c', label: 'Finance VP' },
    ],
  },
];

const DECISION_OPTIONS = [
  { id: 'foundation-agent-human', label: 'Foundation + Agent + Human Approval' },
  { id: 'foundation-automation', label: 'Foundation + Automation only' },
  { id: 'foundation-parity', label: 'Foundation parity first' },
  { id: 'redesign-simplify', label: 'Redesign / simplify' },
  { id: 'do-not-migrate', label: 'Do not migrate' },
  { id: 'ask-client-si', label: 'Ask client / SI review' },
];

export function MigrationMapPage() {
  const navigate = useNavigate();

  // States
  const [selectedWf, setSelectedWf] = useState('w2');
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');

  const [decision, setDecision] = useState('foundation-agent-human');
  const [decisionSaved, setDecisionSaved] = useState(false);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [savedQuestions, setSavedQuestions] = useState<Set<string>>(new Set());
  const [confidence, setConfidence] = useState(76);
  const [openQuestions, setOpenQuestions] = useState(4);

  const railWorkflows = OPERATIONAL_WORKFLOWS.slice(0, 8);
  const activeWorkflow = OPERATIONAL_WORKFLOWS.find((w) => w.id === selectedWf) || OPERATIONAL_WORKFLOWS[1];

  function handleSaveQuestion(qId: string) {
    if (savedQuestions.has(qId)) return;
    setSavedQuestions((prev) => {
      const next = new Set(prev);
      next.add(qId);
      return next;
    });
    setConfidence((c) => Math.min(100, c + 6));
    setOpenQuestions((prev) => Math.max(0, prev - 1));
  }

  function handleSaveDecision() {
    setDecisionSaved(true);
  }

  return (
    <div className="w-full flex flex-col">
      {/* Scrollable Page Content Container */}
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-5 pb-6 space-y-5 flex-1">

        {/* ─── Main Columns Grid: Left Rail + Workspace Content ─── */}
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-[18fr_82fr]">

          {/* ─── 2. Workflow Selector / Left Rail (18% Width) ─── */}
          <aside className="border-r border-[hsl(var(--border))] p-4 bg-white space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))] px-1">
              Workflows (Assess Mapped)
            </h3>

            <div className="space-y-1.5">
              {railWorkflows.map((wf) => {
                const isSelected = wf.id === selectedWf;
                return (
                  <button
                    key={wf.id}
                    onClick={() => {
                      setSelectedWf(wf.id);
                      setDecisionSaved(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/[0.03] ring-1 ring-[hsl(var(--accent))]/15'
                        : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className={`font-semibold leading-snug ${isSelected ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--foreground))]'}`}>
                        {wf.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))] pt-1 border-t border-[hsl(var(--border))]/50">
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                        {wf.migrationPriority}
                      </span>
                      <span>{wf.revenueSupported}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ─── Main Workspace Area ─── */}
          <div className="p-5 space-y-5 bg-white">

            {selectedWf !== 'w2' ? (
              // ── Placeholder Locked View for Other Workflows ──
              <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-12 text-center shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mx-auto">
                  <Lock className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                </div>
                <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                  Operating Model Map: {activeWorkflow.name}
                </h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-md mx-auto leading-relaxed">
                  Vector Systems custom operating model map is loaded for <strong className="text-[hsl(var(--foreground))]">Enterprise Discount Approval</strong>. Select that workflow in the left rail to interact with the active demo canvas.
                </p>
                <button
                  onClick={() => setSelectedWf('w2')}
                  className="px-4 py-2 rounded-lg bg-[hsl(var(--accent))] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Return to Enterprise Discount Approval
                </button>
              </div>
            ) : (
              // ── Active Demo Canvas for Enterprise Discount Approval ──
              <>
                {/* ─── 3. Main Comparison Canvas ─── */}
                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden shadow-sm">
                  <div className="px-5 py-3.5 border-b border-[hsl(var(--border))] bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[hsl(var(--foreground))]">
                        {viewMode === 'business' ? 'Workflow Comparison' : 'Supporting Configuration'}
                      </span>
                      {viewMode === 'business' && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-medium">Revenue supported: <span className="font-bold text-[hsl(var(--foreground))]">$14.2M ARR</span></span>
                          <span className="text-slate-300">·</span>
                          <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-medium">Volume: <span className="font-bold text-[hsl(var(--foreground))]">340 approvals/qtr</span></span>
                        </div>
                      )}
                    </div>

                    {/* View Switcher Toggle */}
                    <div className="flex items-center rounded-lg border border-[hsl(var(--border))] overflow-hidden bg-white shrink-0">
                      <button
                        onClick={() => setViewMode('business')}
                        className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold transition-colors ${
                          viewMode === 'business'
                            ? 'bg-[hsl(var(--accent))] text-white'
                            : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]'
                        }`}
                      >
                        <Activity className="w-3 h-3" />
                        Business Workflow
                      </button>
                      <button
                        onClick={() => setViewMode('technical')}
                        className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold transition-colors ${
                          viewMode === 'technical'
                            ? 'bg-[hsl(var(--accent))] text-white'
                            : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]'
                        }`}
                      >
                        <Database className="w-3 h-3" />
                        Supporting Configuration
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    {viewMode === 'business' ? (
                      // ── Business Workflow Comparison — SVG-inspired ──
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                          {/* LEFT: Current approval process */}
                          <div className="rounded-xl border border-[#D5D0C8] bg-[#FAF9F7] p-4 flex flex-col justify-between space-y-3">
                            <div className="space-y-1">
                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#3D3929] border-b border-[#D5D0C8] pb-2 mb-3">
                                Current approval process
                              </h4>

                              {CURRENT_FLOW.map((node, i) => {
                                const isManual = node.badge === 'Manual';
                                const isAuto = node.badge === 'Automation';
                                const bg = isManual ? 'bg-[#FBE3DA]' : isAuto ? 'bg-[#FCEFD6]' : 'bg-[#EEECE7]';
                                const border = isManual ? 'border-[#D97757]' : isAuto ? 'border-[#C9962E]' : 'border-[#8A8578]';
                                const badgeBg = isManual ? 'bg-[#D97757]' : isAuto ? 'bg-[#C9962E]' : 'bg-[#8A8578]';

                                return (
                                  <div key={i} className="flex flex-col items-center">
                                    <div className={`w-full ${bg} border ${border} rounded-lg px-3 py-2.5 flex items-center justify-between gap-2`}>
                                      <span className="text-[12px] font-semibold text-[#3D3929] leading-snug">{node.label}</span>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className={`${badgeBg} text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded shrink-0`}>
                                          {node.badge}
                                        </span>
                                        <span className="text-[11px] text-[#6B6455] font-normal shrink-0">
                                          {node.time}
                                        </span>
                                      </div>
                                    </div>
                                    {i < CURRENT_FLOW.length - 1 && (
                                      <div className="flex flex-col items-center justify-center py-0.5">
                                        <ArrowDown className="w-3.5 h-3.5 text-[#8A8578]" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="border-t border-[#D5D0C8] pt-2.5 text-center">
                              <p className="text-[13px] font-bold text-slate-900">
                                ~60 min / approval · ~340 manual hrs / quarter
                              </p>
                            </div>
                          </div>

                          {/* RIGHT: Future approval process */}
                          <div className="rounded-xl border border-[#C5BFD6] bg-[#F9F8FC] p-4 flex flex-col justify-between space-y-3">
                            <div className="space-y-1">
                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#3D3929] border-b border-[#C5BFD6] pb-2 mb-3 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#6B5CA5] animate-pulse" />
                                Future approval process
                              </h4>

                              {FUTURE_FLOW.map((node, i) => {
                                const palette: Record<string, { bg: string; border: string; badge: string }> = {
                                  'Slack Integration': { bg: 'bg-[#DCEAF9]', border: 'border-[#3B7DD8]', badge: 'bg-[#3B7DD8]' },
                                  'RCA Foundation': { bg: 'bg-[#E8E3F5]', border: 'border-[#6B5CA5]', badge: 'bg-[#6B5CA5]' },
                                  'Automation': { bg: 'bg-[#FCEFD6]', border: 'border-[#C9962E]', badge: 'bg-[#C9962E]' },
                                  'AI Agent': { bg: 'bg-[#E8E3F5]', border: 'border-[#7C3AED]', badge: 'bg-[#7C3AED]' },
                                  'Human Approval': { bg: 'bg-[#FCEFD6]', border: 'border-[#C9962E]', badge: 'bg-[#C9962E]' },
                                  'Human Approval + Slack Integ.': { bg: 'bg-[#DCEAF9]', border: 'border-[#3B7DD8]', badge: 'bg-[#3B7DD8]' },
                                  'Human Approval + AI Agent': { bg: 'bg-[#E8E3F5]', border: 'border-[#7C3AED]', badge: 'bg-[#7C3AED]' },
                                  'Knowledge Capture': { bg: 'bg-[#DCEFEA]', border: 'border-[#2C7A6E]', badge: 'bg-[#2C7A6E]' },
                                };
                                const p = palette[node.badge] || { bg: 'bg-[#EEECE7]', border: 'border-[#8A8578]', badge: 'bg-[#8A8578]' };

                                return (
                                  <div key={i} className="flex flex-col items-center">
                                    <div className={`w-full ${p.bg} border ${p.border} rounded-lg px-3 py-2.5 flex items-center justify-between gap-2`}>
                                      <span className="text-[12px] font-semibold text-[#3D3929] leading-snug">{node.label}</span>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className={`${p.badge} text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded shrink-0`}>
                                          {node.badge}
                                        </span>
                                        <span className="text-[11px] text-[#6B6455] font-normal shrink-0">
                                          {node.time}
                                        </span>
                                      </div>
                                    </div>
                                    {i < FUTURE_FLOW.length - 1 && (
                                      <div className="flex flex-col items-center justify-center py-0.5">
                                        <ArrowDown className="w-3.5 h-3.5 text-[#6B5CA5]" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="border-t border-[#C5BFD6] pt-2.5 text-center">
                              <p className="text-[13px] font-bold text-slate-900">
                                ~16 min / approval · ~88 manual hrs / quarter
                              </p>
                            </div>
                          </div>

                        </div>

                        {/* Shared ROI strip */}
                        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-center flex items-center justify-center shadow-sm">
                          <p className="text-base font-black text-black tracking-wide" style={{ fontWeight: 900 }}>
                            74% less manual effort · ~252 of ~340 hrs saved / quarter
                          </p>
                        </div>
                      </div>
                    ) : (
                      // ── Supporting Configuration View ──
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-[5fr_2fr_5fr] gap-4 md:gap-2 items-stretch">
                          {/* LEFT: Current Supporting Configuration */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-4">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 flex items-center justify-between">
                                <span>Current supporting configuration</span>
                                <span className="text-[10px] font-mono font-medium">Salesforce CPQ</span>
                              </h4>
                              <p className="text-[10px] text-slate-400 font-semibold mb-3">
                                CPQ components powering today’s discount approval workflow.
                              </p>
                              
                              <div className="space-y-2">
                                {CURRENT_CONFIG_FLOW.map((node, i) => (
                                  <div key={i} className="flex flex-col items-center">
                                    <div className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs leading-normal">
                                      <div className="flex items-center justify-between gap-1 mb-0.5">
                                        <span className="font-bold text-slate-700">{node.title}</span>
                                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[8px] font-semibold border border-slate-200 shrink-0">
                                          {node.info}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-slate-500 leading-normal">{node.desc}</p>
                                    </div>
                                    {i < CURRENT_CONFIG_FLOW.length - 1 && (
                                      <ArrowDown className="w-3.5 h-3.5 text-slate-300 my-0.5" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* MIDDLE: Bridge connector */}
                          <div className="flex flex-col justify-center items-center py-6 md:py-0 px-2 text-center select-none shrink-0 self-center">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5 whitespace-nowrap shadow-sm">
                              Translated by RevBrain
                            </div>
                            <p className="text-[9px] text-slate-400 font-semibold leading-relaxed max-w-[130px] mt-2">
                              Keeps core pricing and approval output working while reducing manual effort.
                            </p>
                            <div className="hidden md:flex items-center gap-1 mt-4">
                              <span className="w-2 h-0.5 bg-indigo-200" />
                              <ArrowRight className="w-4 h-4 text-indigo-400" />
                              <span className="w-2 h-0.5 bg-indigo-200" />
                            </div>
                            <div className="md:hidden mt-3">
                              <ArrowDown className="w-4 h-4 text-indigo-400" />
                            </div>
                          </div>

                          {/* RIGHT: Future Supporting Configuration */}
                          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex flex-col justify-between space-y-4">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-200/50 pb-2 flex items-center justify-between">
                                <span>Future supporting configuration</span>
                                <span className="text-[10px] font-mono font-medium">RCA & Agents</span>
                              </h4>
                              <p className="text-[10px] text-indigo-950/60 font-semibold mb-3">
                                Configuration required to support the recommended operating model.
                              </p>

                              <div className="space-y-2">
                                {FUTURE_CONFIG_FLOW.map((node, i) => (
                                  <div key={i} className="flex flex-col items-center">
                                    <div className="w-full p-2.5 bg-white border border-indigo-100 rounded-lg text-xs leading-normal shadow-sm">
                                      <div className="flex items-center justify-between gap-1 mb-0.5">
                                        <span className="font-bold text-slate-800">{node.title}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold shrink-0 ${node.badgeColor}`}>
                                          {node.badge}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-slate-500 leading-normal">{node.desc}</p>
                                    </div>
                                    {i < FUTURE_CONFIG_FLOW.length - 1 && (
                                      <ArrowDown className="w-3.5 h-3.5 text-indigo-300 my-0.5" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Validation Notice Note */}
                        <div className="bg-indigo-50 border border-indigo-200/60 rounded-xl p-4 text-center">
                          <p className="text-xs font-semibold text-indigo-950">
                            “This future model depends on structurally migrating and validating the connected CPQ foundation.”
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
