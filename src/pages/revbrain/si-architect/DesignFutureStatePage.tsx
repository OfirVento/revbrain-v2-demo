// ── Design Future State — Operating Model Builder ─────────────────────
// Turns the approved operating model (Foundation + Agent + Human Approval)
// into concrete AI Agent instructions, automation config, human handoffs,
// and validation test cases.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Database,
  Bot,
  ShieldCheck,
  CheckCircle2,
  X,
  Save,
  Send,
  ArrowDown,
  Info,
  Shield,
  Pencil,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Zap,
  Layers,
  Link2,
  Check,
  Cpu,
} from 'lucide-react';

/* ── Agent Type Icons & Options ────────────────────────────────────── */

function AgentforceIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <img
      src="/agentforce.png"
      alt="Agentforce"
      className={`${className} object-contain shrink-0`}
    />
  );
}

function ClaudeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <img
      src="/claude.png"
      alt="Claude"
      className={`${className} object-contain shrink-0`}
    />
  );
}

function CustomAgentIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-slate-600 shrink-0`}>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
    </svg>
  );
}

const AGENT_TYPE_OPTIONS = [
  { id: 'agentforce', label: 'Agentforce', icon: AgentforceIcon },
  { id: 'claude', label: 'Claude', icon: ClaudeIcon },
  { id: 'custom', label: 'Custom', icon: CustomAgentIcon },
];

/* ── Types ─────────────────────────────────────────────────────────── */

interface SetupChecklist {
  label: string;
  done: boolean;
}

interface StepDef {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  status: 'ready' | 'needs setup' | 'needs human decision';
  purpose: string;
  checklist: SetupChecklist[];
  // Knowledge panels
  cpqLearned: string[];
  rcaKnowledge: string[];
  customerKnowledge: string[];
  // Instruction builder sections
  instruction: string;
  topic: string;
  actions: string[];
  guardrail: string;
  humanHandoff: string;
  knowledgeCaptured: string;
  monitoring: string;
  // Editable instruction sections with options
  instructionSections: {
    label: string;
    options: string[];
  }[];
}

/* ── Step Data ─────────────────────────────────────────────────────── */

const STEPS: StepDef[] = [
  {
    id: 's1',
    title: 'RCA pricing procedure evaluates threshold/margin',
    badge: 'RCA Foundation',
    badgeColor: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    status: 'ready',
    purpose: 'Declaratively executes the discount tier waterfall and evaluates cost margins — replacing CPQ price rules and QCP scripts.',
    checklist: [
      { label: 'Declarative Pricing Procedure mapped', done: true },
      { label: 'Margin floor BRE formula validated', done: true },
      { label: 'Apex costing dependencies retired', done: true },
    ],
    cpqLearned: [
      '12 price rules influence discount thresholds',
      '3 QCP scripts calculate margin impact',
      'Volume discount tiers mapped from Custom Metadata',
    ],
    rcaKnowledge: ['Pricing procedure configuration', 'BRE margin floor formula', 'Custom Metadata tier mapping'],
    customerKnowledge: ['ERP cost baseline sync frequency', 'Margin floor target (currently 40%)'],
    instruction: 'Execute pricing waterfall sequentially. Fetch baseline cost from Custom Metadata, subtract volume discount, and verify target margin floor (40%).',
    topic: 'RCA Pricing Procedure',
    actions: ['Fetch Custom Metadata tiers', 'Execute BRE Margin Floor formula'],
    guardrail: 'Block quote calculations if ERP baseline cost sync is stale > 24 hours.',
    humanHandoff: 'None — fully automated pricing evaluation.',
    knowledgeCaptured: 'Pricing execution logs and margin calculations stored for audit.',
    monitoring: 'Track procedure execution time and rule matching coverage.',
    instructionSections: [
      { label: 'Evidence the agent should use', options: ['Custom Metadata pricing tiers', 'ERP cost baseline', 'Historical margin data'] },
      { label: 'Guardrails', options: ['Block on stale ERP data', 'Reject negative margins', 'Flag calculations > 2s latency'] },
    ],
  },
  {
    id: 's2',
    title: 'Approval automation routes standard approval path',
    badge: 'Automation',
    badgeColor: 'bg-[#FCEFD6] text-[#C9962E] border border-[#C9962E]',
    status: 'ready',
    purpose: 'Routes standard discount approvals through the automated path when margin is within acceptable range.',
    checklist: [
      { label: 'Approval routing rules defined', done: true },
      { label: 'Manager lookup integration verified', done: true },
      { label: 'SLA timer configured', done: true },
    ],
    cpqLearned: [
      '8 of 24 approval rules are active',
      'Manager routing via role hierarchy',
      'Average approval cycle: 2.3 days',
    ],
    rcaKnowledge: ['Approval process automation', 'SLA timer flows', 'Routing group configuration'],
    customerKnowledge: ['Approval hierarchy', 'SLA expectations', 'Escalation rules'],
    instruction: 'Route standard approvals to the manager routing group. If margin is within acceptable range, use automated path. Trigger SLA timer on submission.',
    topic: 'Approval Automation',
    actions: ['Route to manager routing group', 'Trigger SLA timer flow'],
    guardrail: 'Never skip manager approval for discounts > 15%.',
    humanHandoff: 'Manager receives notification and must explicitly approve.',
    knowledgeCaptured: 'Approval timing and routing path logged.',
    monitoring: 'Track approval cycle time (target: < 4 hours).',
    instructionSections: [
      { label: 'Approval routing logic', options: ['Route by role hierarchy', 'Route by deal size', 'Route by region'] },
      { label: 'Guardrails', options: ['Block auto-route for > 15% discount', 'Require manager in same region', 'Flag weekend approvals'] },
    ],
  },
  {
    id: 's3',
    title: 'Discount Exception Agent gathers evidence and explains recommendation',
    badge: 'AI Agent',
    badgeColor: 'bg-[#E8E3F5] text-[#7C3AED] border border-[#7C3AED] font-semibold',
    status: 'needs setup',
    purpose: 'Helps reps and approvers understand whether a discount exception is justified by analyzing margin impact, similar deals, and strategic context.',
    checklist: [
      { label: 'Topic drafted', done: true },
      { label: 'Benchmark evidence source selected', done: true },
      { label: 'Similar deal lookup configured', done: true },
      { label: 'Slack approval handoff pending', done: false },
      { label: 'Finance escalation rule needs confirmation', done: false },
      { label: 'Test scenarios pending', done: false },
    ],
    cpqLearned: [
      '340 approvals per quarter',
      '$14.2M ARR supported',
      '12 price rules and 3 QCP scripts influence this flow',
      'Finance review is triggered inconsistently today',
      'Rationale is rarely captured in a structured way',
    ],
    rcaKnowledge: ['Pricing procedure', 'Approval routing', 'Margin evaluation', 'Quote lifecycle status'],
    customerKnowledge: ['Strategic account exceptions', 'Finance escalation rules', 'Discount evidence requirements', 'Approval ownership'],
    instruction: 'When a rep requests a discount exception, analyze margin impact, similar closed-won deals, contracted pricing history, discount schedule, and strategic account status. Explain the recommendation and route the approval to the right human approver. Never auto-approve without human confirmation.',
    topic: 'Discount Exception Approval',
    actions: ['Request Manager Approval in Slack', 'Request Finance Review if margin risk'],
    guardrail: 'Never approve automatically without human approval.',
    humanHandoff: 'Always route to human approver with evidence package.',
    knowledgeCaptured: 'Decision rationale, discount justification, and approval outcome.',
    monitoring: 'Track overrides, approval time, and recommendation acceptance.',
    instructionSections: [
      { label: 'Evidence the agent should use', options: ['Similar closed-won deals', 'Contracted pricing history', 'Margin threshold analysis', 'Strategic account status'] },
      { label: 'Approval routing logic', options: ['Route to manager via Slack', 'Route to Deal Desk for > $500K', 'Route to Finance for margin risk'] },
      { label: 'Guardrails', options: ['Never auto-approve', 'Require evidence before routing', 'Block if margin < 20%', 'Limit to 3 re-submissions per deal'] },
      { label: 'Human handoff', options: ['Manager via Slack approval card', 'Finance via email with deal summary', 'VP escalation after 48h'] },
      { label: 'Knowledge captured after decision', options: ['Full rationale text', 'Discount justification category', 'Approval/rejection reason code'] },
      { label: 'Monitoring signals', options: ['Recommendation acceptance rate', 'Average approval cycle time', 'Override frequency', 'Finance escalation rate'] },
    ],
  },
  {
    id: 's4',
    title: 'Manager approves in Slack with business context',
    badge: 'HUMAN APPROVAL + SLACK INTEG.',
    badgeColor: 'bg-[#DCEAF9] text-[#3B7DD8] border border-[#3B7DD8]',
    status: 'needs human decision',
    purpose: 'Routes the structured exception request directly into Slack for manager review with full evidence context.',
    checklist: [
      { label: 'Slack app integration verified', done: true },
      { label: 'Manager routing group configured', done: true },
      { label: 'SLA timer flow with auto-escalation pending', done: false },
    ],
    cpqLearned: [
      'Current approval uses email + Slack inconsistently',
      'Average manager response: 1.8 days',
      'No structured evidence shared today',
    ],
    rcaKnowledge: ['Slack integration API', 'Approval card template', 'SLA escalation flow'],
    customerKnowledge: ['Preferred approval channel', 'Escalation ownership', 'SLA expectations'],
    instruction: 'Send approval card via Slack containing discount tier evidence. If unanswered in 24 hours, fire Slack reminder; at 48 hours, auto-escalate to VP Sales.',
    topic: 'Slack Manager Approval',
    actions: ['Post Slack Approval Card', 'Trigger 24h SLA Reminder Flow'],
    guardrail: 'Approvals must originate from authenticated Slack accounts matching routing tree.',
    humanHandoff: 'Manager must explicitly approve or reject with comment.',
    knowledgeCaptured: 'Approval response time, comments, and decision.',
    monitoring: 'Track manager approval cycle time (target: < 4 hours).',
    instructionSections: [
      { label: 'Approval routing logic', options: ['Route via Slack DM', 'Route via Slack channel', 'Fallback to email'] },
      { label: 'Human handoff', options: ['24h reminder → 48h VP escalation', '12h reminder → 24h escalation', 'No auto-escalation'] },
    ],
  },
  {
    id: 's5',
    title: 'Finance reviews margin-risk exceptions only',
    badge: 'HUMAN APPROVAL + AI AGENT',
    badgeColor: 'bg-[#E8E3F5] text-[#7C3AED] border border-[#7C3AED]',
    status: 'needs human decision',
    purpose: 'Involves Finance only for high-risk deals where the computed margin falls below the policy threshold.',
    checklist: [
      { label: 'Finance Queue routing rules defined', done: true },
      { label: 'Pre-populated deal summary payload structured', done: true },
      { label: 'Risk threshold rules confirmation pending', done: false },
    ],
    cpqLearned: [
      'Finance currently reviews all discounts > 25%',
      'Most reviews are rubber-stamp approvals',
      'Only margin-risk deals require real Finance judgment',
    ],
    rcaKnowledge: ['Margin threshold configuration', 'Finance queue routing', 'Audit logging'],
    customerKnowledge: ['Margin floor policy', 'Finance review scope preference', 'Audit requirements'],
    instruction: 'Filter approval requests: if calculated margin < 40%, route the deal to the Finance Ops Queue and request a human review before signing off.',
    topic: 'Finance Risk Review',
    actions: ['Route to Finance Ops Queue', 'Log exception detail in Audit table'],
    guardrail: 'Block quote completion if margin falls below 20% (hard floor).',
    humanHandoff: 'Finance reviewer must approve with documented rationale.',
    knowledgeCaptured: 'Finance review outcome, margin assessment, and risk classification.',
    monitoring: 'Track percentage of quotes routed to Finance review (target: < 10%).',
    instructionSections: [
      { label: 'Approval routing logic', options: ['Route when margin < 40%', 'Route when margin < 30%', 'Route all deals > $1M'] },
      { label: 'Guardrails', options: ['Hard floor at 20% margin', 'Hard floor at 15% margin', 'No hard floor — advisory only'] },
    ],
  },
  {
    id: 's6',
    title: 'Knowledge Engine captures decision and rationale',
    badge: 'Knowledge Capture',
    badgeColor: 'bg-[#DCEFEA] text-[#2C7A6E] border border-[#2C7A6E]',
    status: 'ready',
    purpose: 'Captures and stores the approval/rejection rationale so the agent can improve its recommendations over time.',
    checklist: [
      { label: 'Knowledge schema hook mapped', done: true },
      { label: 'Audit history logging enabled', done: true },
      { label: 'Pattern training trigger active', done: true },
    ],
    cpqLearned: [
      'Rationale is rarely captured today',
      'Similar deals are not referenced in approvals',
      'No feedback loop exists for discount decisions',
    ],
    rcaKnowledge: ['Knowledge object schema', 'AI classification model', 'Recommendation update cycle'],
    customerKnowledge: ['PII handling policy', 'Data retention requirements', 'Reporting needs'],
    instruction: 'Log approval metadata, requested discount, final margin, and approved rationale. Trigger learning cycle to update local recommendation pattern.',
    topic: 'Knowledge Capture Engine',
    actions: ['Log decision to Knowledge object', 'Retrain recommendation model dataset'],
    guardrail: 'Strip customer PII details from deal notes before model storage.',
    humanHandoff: 'None — fully automated capture.',
    knowledgeCaptured: 'Decision rationale, deal outcome, and agent recommendation accuracy.',
    monitoring: 'Track model confidence trend and recommendation accuracy.',
    instructionSections: [
      { label: 'Knowledge captured after decision', options: ['Full text + AI classification', 'Metadata characteristics only', 'Simple status log'] },
      { label: 'Monitoring signals', options: ['Model confidence trend', 'Recommendation acceptance rate', 'Knowledge base growth rate'] },
    ],
  },
  {
    id: 's7',
    title: 'Test scenarios validate pricing/approval output',
    badge: 'Validation / Testing',
    badgeColor: 'bg-slate-200 text-slate-700 border border-slate-300',
    status: 'needs setup',
    purpose: 'Validates that the migrated pricing procedure and approval flow produce the same business output as the original CPQ configuration.',
    checklist: [
      { label: 'Pricing output comparison test defined', done: true },
      { label: 'Approval routing regression test defined', done: true },
      { label: 'End-to-end scenario test pending', done: false },
    ],
    cpqLearned: [
      'Current output: discount threshold + margin calculation',
      'Approval routing: 8 active rules',
      'Edge cases: strategic accounts, multi-currency, volume tiers',
    ],
    rcaKnowledge: ['Test framework configuration', 'Output comparison tooling', 'Regression test patterns'],
    customerKnowledge: ['Critical test scenarios', 'Acceptable variance thresholds', 'UAT sign-off process'],
    instruction: 'Run pricing output comparison against CPQ baseline. Validate approval routing matches expected path. Test edge cases for strategic accounts and multi-currency.',
    topic: 'Validation & Testing',
    actions: ['Run pricing output regression', 'Run approval routing regression', 'Execute end-to-end scenario'],
    guardrail: 'Block deployment if pricing output variance exceeds 0.1%.',
    humanHandoff: 'SI reviews test results and signs off before deployment.',
    knowledgeCaptured: 'Test results, variance reports, and sign-off status.',
    monitoring: 'Track test pass rate and output variance.',
    instructionSections: [
      { label: 'Guardrails', options: ['Block on > 0.1% variance', 'Block on > 1% variance', 'Advisory only — no blocking'] },
      { label: 'Human handoff', options: ['SI sign-off required', 'Client admin sign-off required', 'Auto-proceed if tests pass'] },
    ],
  },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function DesignFutureStatePage() {
  const navigate = useNavigate();

  const [selectedStep, setSelectedStep] = useState('s3');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [sectionValues, setSectionValues] = useState<Record<string, Record<string, string>>>({});
  const [sectionFreeText, setSectionFreeText] = useState<Record<string, Record<string, string>>>({});
  const [expandedSection, setExpandedSection] = useState<string>('details');

  const [agentDetails, setAgentDetails] = useState({
    name: 'Discount Exception Agent',
    purpose: 'Review discount exceptions, gather relevant evidence, explain the recommendation, and route the request to the right approver.',
    topic: 'Discount Exception Approval',
    primaryGoal: 'Margin protection + faster approvals',
    finalApproval: 'Human approval required',
    autoApproval: 'Disabled (Never auto-approve)',
    instructions: `When a rep requests a discount exception, analyze the request, margin impact, account context, pricing history, and approval requirements before recommending the next action.

Use the Margin Analysis capability to calculate the expected margin impact and compare it with the company's approved margin thresholds and CFO margin policy.

Review:
• contracted pricing and account-specific pricing
• discount schedules and existing pricing rules
• similar closed-won deals and previously approved exceptions
• strategic account status and customer tier
• current quote amount, discount level, and product mix
• approval history for comparable deals

Identify whether the request is:
• within the standard approval path
• a margin-risk exception
• a strategic-account exception
• inconsistent with existing pricing policy

Explain the recommendation in concise business language and include the evidence used.

Route standard approvals automatically to the correct manager.

For margin-risk exceptions, include Finance with the relevant margin evidence.

Never auto-approve a discount that requires human judgment.

After the decision, capture the approval rationale, exception reason, and outcome so future recommendations can reuse the decision context.`
  });

  const [confidence, setConfidence] = useState(88);
  const [openSetupQuestions, setOpenSetupQuestions] = useState(3);
  const [completedSetupSteps, setCompletedSetupSteps] = useState<Set<string>>(new Set());
  const [cardIndex, setCardIndex] = useState(0);

  // Popover and modal states
  const [activePopover, setActivePopover] = useState<'approvals' | 'rules' | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [agentType, setAgentType] = useState<'agentforce' | 'claude' | 'custom'>('agentforce');
  const [isAgentTypeOpen, setIsAgentTypeOpen] = useState(false);

  const activeStep = STEPS.find((s) => s.id === selectedStep) || STEPS[2];
  const isStepDone = completedSteps.has(selectedStep);

  // Sync cardIndex with bottom agent answers & navigation
  useEffect(() => {
    const handleCardAnswer = (e: CustomEvent<{ cardIndex: number; answer: string }>) => {
      const nextIdx = Math.min(8, e.detail.cardIndex + 1);
      setCardIndex(nextIdx);
    };

    const handleIndexChanged = (e: CustomEvent<{ index: number }>) => {
      setCardIndex(e.detail.index);
    };

    window.addEventListener('design-card-answer', handleCardAnswer as EventListener);
    window.addEventListener('design-card-index-changed', handleIndexChanged as EventListener);
    return () => {
      window.removeEventListener('design-card-answer', handleCardAnswer as EventListener);
      window.removeEventListener('design-card-index-changed', handleIndexChanged as EventListener);
    };
  }, []);

  const handlePrevCard = () => {
    if (cardIndex > 0) {
      const prevIdx = cardIndex - 1;
      setCardIndex(prevIdx);
      window.dispatchEvent(new CustomEvent('design-card-index-changed', { detail: { index: prevIdx } }));
    }
  };

  const handleSelectSection = (sec: string) => {
    setExpandedSection(sec);
    window.dispatchEvent(new CustomEvent('design-section-changed', { detail: sec }));
  };

  function handleSelectStep(id: string) {
    setSelectedStep(id);
    if (id === 's3') {
      setCardIndex(0);
      window.dispatchEvent(new CustomEvent('design-card-index-changed', { detail: { index: 0 } }));
    }
  }

  function handleSaveStep() {
    if (isStepDone) return;
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(selectedStep);
      return next;
    });
    setConfidence((c) => Math.min(100, c + 3));
    setOpenSetupQuestions((prev) => Math.max(0, prev - 1));
  }

  return (
    <div className="w-full flex flex-col">

      {/* Scrollable Page Content Container */}
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-5 pb-6 space-y-5 flex-1">

        {/* ─── Main Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[22fr_78fr] gap-5 items-start">

          {/* LEFT: Future Operating Model Canvas (22% Width) */}
          <div className="space-y-5">

            {/* Process Steps */}
            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 shadow-sm space-y-3">
              <div className="border-b border-[hsl(var(--border))] pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  Future approval process
                </h3>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">
                  Select a step to configure its parameters.
                </p>
              </div>

              <div className="space-y-1.5">
                {STEPS.map((step, i) => {
                  const isSelected = step.id === selectedStep;
                  const isDone = completedSteps.has(step.id);
                  const isNextSelected = STEPS[i + 1]?.id === selectedStep;

                  return (
                    <div key={step.id} className="flex flex-col items-center w-full">
                      <button
                        onClick={() => handleSelectStep(step.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all duration-200 space-y-1.5 ${
                          isSelected
                            ? 'border-violet-500 bg-violet-50/20 ring-1 ring-violet-500/20 shadow-sm opacity-100'
                            : 'border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 opacity-[0.78] hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center px-1 shrink-0 transition-colors ${
                            isSelected ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            #{i + 1}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold transition-all ${step.badgeColor} ${
                            isSelected ? 'opacity-100' : 'opacity-85'
                          }`}>
                            {step.badge}
                          </span>
                          <span className={`text-[10px] font-bold shrink-0 transition-colors ${isSelected ? 'text-slate-400' : 'text-slate-300'}`}>→</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider shrink-0 transition-all ${
                            isSelected 
                              ? 'bg-slate-100 text-slate-600 border border-slate-200/80' 
                              : 'bg-slate-100/90 text-slate-500 border border-slate-200/60'
                          }`}>
                            {step.status === 'needs human decision' ? 'DECISION' : step.status}
                          </span>
                          {isDone && (
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold border ml-auto shrink-0 transition-all ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                                : 'bg-emerald-50/80 text-emerald-600 border-emerald-200/50'
                            }`}>
                              ✓ Done
                            </span>
                          )}
                        </div>

                        <p className={`text-[11px] leading-snug transition-colors ${
                          isSelected ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'
                        }`}>
                          {step.title}
                        </p>
                      </button>

                      {i < STEPS.length - 1 && (
                        <ArrowDown className={`w-3 h-3 my-0.5 transition-colors ${
                          isSelected || isNextSelected ? 'text-slate-400' : 'text-slate-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Step Setup & Configuration Workspace (78% Width) — ONE CARD AT A TIME */}
          <div className="space-y-5">
            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm p-6 space-y-4 min-h-[480px] flex flex-col justify-between">
              
              {/* Card Header & Progress Indicator */}
              <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
                <div className="flex items-center gap-2">
                  {cardIndex > 0 && cardIndex < 8 && (
                    <button
                      onClick={handlePrevCard}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors mr-1"
                    >
                      ← Back
                    </button>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[11px] font-bold tracking-wide">
                    {cardIndex < 8 ? `${cardIndex + 1} of 8 · Agent Setup` : 'Agent Setup Complete'}
                  </span>
                </div>
                <div className="relative flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Agent Type:</span>
                  <div className="relative">
                    <button
                      onClick={() => setIsAgentTypeOpen(!isAgentTypeOpen)}
                      className="bg-slate-50 border border-slate-200 hover:bg-slate-100/80 rounded-lg px-2.5 py-1 flex items-center gap-2 text-xs font-bold text-slate-800 transition-all shadow-2xs cursor-pointer"
                    >
                      {agentType === 'agentforce' && <AgentforceIcon className="w-4 h-4" />}
                      {agentType === 'claude' && <ClaudeIcon className="w-4 h-4" />}
                      {agentType === 'custom' && <CustomAgentIcon className="w-4 h-4" />}
                      <span>
                        {agentType === 'agentforce' && 'Agentforce'}
                        {agentType === 'claude' && 'Claude'}
                        {agentType === 'custom' && 'Custom'}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isAgentTypeOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isAgentTypeOpen && (
                      <>
                        <div className="fixed inset-0 z-20" onClick={() => setIsAgentTypeOpen(false)} />
                        <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-30 space-y-0.5 animate-fadeIn">
                          {AGENT_TYPE_OPTIONS.map((opt) => {
                            const Icon = opt.icon;
                            const isSelected = agentType === opt.id;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  setAgentType(opt.id as any);
                                  setIsAgentTypeOpen(false);
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                                  isSelected ? 'bg-violet-50 text-violet-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4" />
                                  <span>{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-violet-600" />}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Card Viewport */}
              <div className="flex-1 py-3 flex flex-col justify-center animate-[fadeIn_200ms_ease]" key={cardIndex}>

                {/* CARD 1 — Agent Overview */}
                {cardIndex === 0 && (
                  <div className="space-y-4 max-w-2xl mx-auto w-full">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900">Discount Exception Agent</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Review discount exceptions, gather relevant evidence, explain the recommendation, and route the request to the right approver.
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold border border-violet-200/60 shrink-0 ml-4">
                        Drafted by RevBrain
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-1">
                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Goal</span>
                        <span className="text-xs font-bold text-slate-800">Margin protection + faster approvals</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Approval</span>
                        <span className="text-xs font-bold text-slate-800">Human approval required</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Auto-approval</span>
                        <span className="text-xs font-bold text-slate-800">Off</span>
                      </div>
                    </div>

                    {/* Bottom Monochrome Evidence Line */}
                    <div className="border-t border-slate-100 pt-2.5 mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700">Built from:</span> Enterprise Discount Approval workflow · 340 approvals/qtr · $14.2M ARR ·{' '}
                        <button onClick={() => setActivePopover('rules')} className="underline hover:text-slate-900 font-mono">
                          12 approval rules ↗
                        </button>
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 2 — Objective */}
                {cardIndex === 1 && (
                  <div className="space-y-4 max-w-2xl mx-auto w-full">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-bold border border-violet-200/60">
                        Agent Instructions · Objective
                      </span>
                      <h3 className="text-base font-bold text-slate-900 pt-1">What the agent is responsible for</h3>
                    </div>

                    <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-2xs space-y-2 text-xs text-slate-800 leading-relaxed font-medium">
                      <ol className="space-y-1.5 list-decimal pl-4">
                        <li>Evaluate every discount exception submitted from the active quote workflow.</li>
                        <li>
                          Read <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] font-semibold">{`{quote.discount_percent}`}</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] font-semibold">{`{quote.net_amount}`}</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] font-semibold">{`{quote.margin_after_discount}`}</code>, product mix, and account tier.
                        </li>
                        <li>
                          Compare the request against <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] font-semibold">{`{policy.cfo_margin_floor}`}</code>, approved discount thresholds, and contracted pricing eligibility.
                        </li>
                        <li>Detect whether existing pricing rules already authorize the requested discount.</li>
                        <li>Identify conflicting pricing, expired contracted terms, or missing approval evidence before routing.</li>
                        <li>Preserve existing human approval boundaries for manager, Finance, and Deal Desk decisions.</li>
                        <li>Produce a short recommendation with the evidence and business reason supporting the decision path.</li>
                        <li>Capture the final rationale and outcome so future recommendations can reuse the decision context.</li>
                      </ol>
                    </div>

                    {/* Bottom Monochrome Evidence Line */}
                    <div className="border-t border-slate-100 pt-2.5 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700">Derived from:</span>{' '}
                        <button onClick={() => setActivePopover('rules')} className="underline hover:text-slate-900 font-mono">
                          12 approval rules ↗
                        </button>{' '}
                        · Quote data model · CFO policy · historical approval outcomes
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 3 — Analyze */}
                {cardIndex === 2 && (
                  <div className="space-y-4 max-w-2xl mx-auto w-full">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-bold border border-violet-200/60">
                        Agent Instructions · Analyze
                      </span>
                      <h3 className="text-base font-bold text-slate-900 pt-1">What the agent analyzes</h3>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        {
                          category: 'Margin',
                          items: ['Margin Analysis Agent', 'quote.margin_after_discount', 'CFO Margin Policy', 'Approved Margin Threshold'],
                        },
                        {
                          category: 'Pricing',
                          items: ['Pricing Context Agent', 'Contracted Pricing', 'Discount Schedules', 'Current Quote', 'Pricing Rule Output'],
                        },
                        {
                          category: 'Deal Context',
                          items: ['Account Tier', 'Product Mix', 'ARR Exposure', 'Strategic Account Status'],
                        },
                        {
                          category: 'Historical Evidence',
                          isEvidence: true,
                          items: ['147 Comparable Approvals ↗', 'Approval History', 'Outcome Pattern'],
                        },
                      ].map((group, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                          <span className="text-xs font-bold text-slate-500 w-32 shrink-0">{group.category}</span>
                          <div className="flex flex-wrap items-center gap-1.5 flex-1">
                            {group.items.map((item, itemIdx) => (
                              <span key={itemIdx} className="flex items-center gap-1.5">
                                {group.isEvidence && itemIdx === 0 ? (
                                  <button
                                    onClick={() => setActivePopover('approvals')}
                                    className="px-2.5 py-1 rounded-lg bg-violet-100 text-violet-800 border border-violet-300 text-[11px] font-bold underline hover:bg-violet-200 transition-colors"
                                  >
                                    {item}
                                  </button>
                                ) : (
                                  <span className="px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200/60 text-[11px] font-semibold font-mono underline decoration-violet-300 underline-offset-2">
                                    {item}
                                  </span>
                                )}
                                {itemIdx < group.items.length - 1 && (
                                  <span className="text-slate-300 font-bold text-xs">→</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Monochrome Evidence Line */}
                    <div className="border-t border-slate-100 pt-2.5 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700">RevBrain evidence:</span>{' '}
                        <button onClick={() => setActivePopover('approvals')} className="underline hover:text-slate-900 font-mono">
                          147 comparable approvals ↗
                        </button>{' '}
                        · 22 discount schedules ·{' '}
                        <button onClick={() => setActivePopover('rules')} className="underline hover:text-slate-900 font-mono">
                          12 price rules ↗
                        </button>{' '}
                        · account + quote context
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 4 — Decide */}
                {cardIndex === 3 && (
                  <div className="space-y-4 max-w-2xl mx-auto w-full">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-bold border border-violet-200/60">
                        Agent Instructions · Decide
                      </span>
                      <h3 className="text-base font-bold text-slate-900 pt-1">How the agent classifies the request</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          title: 'Standard',
                          desc: 'Discount is within approved pricing + margin policy.',
                          metric: '71% of observed approvals',
                          tooltip: 'Pricing and margin remain inside the customer’s approved thresholds. RevBrain can prepare and route the approval without additional exception analysis.',
                          badgeClass: 'bg-emerald-100 text-emerald-800',
                          boxClass: 'bg-emerald-50/70 border-emerald-200',
                        },
                        {
                          title: 'Margin Risk',
                          desc: 'Request breaches the CFO-approved margin floor.',
                          metric: '18% of observed approvals',
                          tooltip: 'The requested discount pushes expected margin below the CFO-approved floor or creates unusual margin exposure relative to comparable deals.',
                          badgeClass: 'bg-amber-100 text-amber-800',
                          boxClass: 'bg-amber-50/70 border-amber-200',
                        },
                        {
                          title: 'Strategic Exception',
                          desc: 'Strategic account or account-specific pricing requires additional judgment.',
                          metric: '9% · partly inferred',
                          tooltip: 'The request involves a strategic account, negotiated commercial terms, or account-specific precedent that is not fully represented by standard Salesforce rules.',
                          badgeClass: 'bg-blue-100 text-blue-800',
                          boxClass: 'bg-blue-50/70 border-blue-200',
                        },
                        {
                          title: 'Policy Conflict',
                          desc: 'Pricing rules, contracted terms, or requested exception conflict.',
                          metric: '2% · human decision',
                          tooltip: 'Two or more sources disagree — for example contracted pricing permits a discount while a current pricing rule blocks it.',
                          badgeClass: 'bg-rose-100 text-rose-800',
                          boxClass: 'bg-rose-50/70 border-rose-200',
                        },
                      ].map((path, idx) => (
                        <div key={idx} className={`p-3.5 border rounded-xl space-y-1.5 ${path.boxClass} relative group`}>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${path.badgeClass}`}>
                              {path.title}
                            </span>
                            <div className="relative flex items-center">
                              <Info className="w-3.5 h-3.5 text-slate-400 cursor-help group-hover:text-slate-700 transition-colors" />
                              {/* Hover Tooltip */}
                              <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-56 p-2.5 bg-slate-900 text-white text-[11px] leading-normal rounded-lg shadow-xl z-30 pointer-events-none">
                                {path.tooltip}
                              </div>
                            </div>
                          </div>
                          <p className="text-[11px] font-medium text-slate-800 leading-snug">{path.desc}</p>
                          <span className="text-[10px] font-bold text-slate-500 block pt-0.5">{path.metric}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Monochrome Evidence Line */}
                    <div className="border-t border-slate-100 pt-2.5 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>
                        <span className="font-bold text-slate-700">Derived from:</span> current Salesforce rules + historical approval behavior + client-specific exceptions
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 5 — Act */}
                {cardIndex === 4 && (
                  <div className="space-y-4 max-w-2xl mx-auto w-full">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-bold border border-violet-200/60">
                        Agent Instructions · Act
                      </span>
                      <h3 className="text-base font-bold text-slate-900 pt-1">What happens after the recommendation</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Standard</span>
                        <span className="text-xs font-bold text-slate-800 block">→ Manager</span>
                        <span className="text-[10px] text-slate-500 block font-medium">Automated routing</span>
                      </div>
                      <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl space-y-1">
                        <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">Margin Risk</span>
                        <span className="text-xs font-bold text-amber-900 block">→ Finance</span>
                        <span className="text-[10px] text-amber-800 block font-medium">Evidence package attached</span>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl space-y-1">
                        <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block">Strategic Exception</span>
                        <span className="text-xs font-bold text-blue-900 block">→ Deal Desk</span>
                        <span className="text-[10px] text-blue-800 block font-medium">Human judgment</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-semibold text-rose-700">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>Human approval remains required</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Rationale captured after decision</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>No automatic approval when judgment is required</span>
                      </div>
                      <div className="pt-1 text-[11px] font-bold text-slate-800 font-mono border-t border-slate-100">
                        Writes back: rationale · exception type · approver · outcome
                      </div>
                    </div>

                    {/* Bottom Monochrome Evidence Line */}
                    <div className="border-t border-slate-100 pt-2.5 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>
                        <span className="font-bold text-slate-700">Mapped from:</span> manager approval path · Finance escalation rules · historical Deal Desk routing
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 6 — Actions & Handoffs */}
                {cardIndex === 5 && (
                  <div className="space-y-4 max-w-2xl mx-auto w-full">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-bold border border-violet-200/60">
                        Actions & Handoffs
                      </span>
                      <h3 className="text-base font-bold text-slate-900 pt-1">Configured actions and approval handoffs</h3>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: 'Slack Approval', desc: 'Manager receives recommendation + evidence', tag: 'New Slack integration' },
                        { title: 'Finance Escalation', desc: 'Triggered by margin-risk classification', tag: 'Uses CFO margin policy' },
                        { title: 'Deal Desk Escalation', desc: 'Routes strategic pricing exceptions', tag: 'Derived from historical routing' },
                        { title: 'Knowledge Capture', desc: 'Stores rationale + exception + outcome', tag: 'Feeds future recommendations' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-2xs">
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">{item.title}</span>
                            <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 shrink-0">
                            {item.tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Monochrome Evidence Line */}
                    <div className="border-t border-slate-100 pt-2.5 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>
                        <span className="font-bold text-slate-700">RevBrain learning loop:</span> each decision updates future recommendation context and performance signals
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 7 — Subagents */}
                {cardIndex === 6 && (
                  <div className="space-y-4 max-w-2xl mx-auto w-full">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-bold border border-violet-200/60">
                        Subagents & Capabilities
                      </span>
                      <h3 className="text-base font-bold text-slate-900 pt-1">Specialized subagent capabilities</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          name: 'Margin Analysis Agent',
                          reads: 'quote.margin + CFO policy',
                          returns: 'Margin risk classification',
                        },
                        {
                          name: 'Similar Deal Agent',
                          reads: 'Approved + rejected historical exceptions',
                          returns: 'Comparable evidence',
                        },
                        {
                          name: 'Pricing Context Agent',
                          reads: 'Contracted pricing + discount schedules + pricing rules',
                          returns: 'Pricing entitlement',
                        },
                        {
                          name: 'Approval Routing Agent',
                          reads: 'Recommendation + policy + account context',
                          returns: 'Correct human approver',
                        },
                      ].map((sub, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                              <Bot className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-800">{sub.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 space-y-0.5 pl-7">
                            <p><span className="font-semibold text-slate-500">Reads/Searches:</span> <code className="font-mono text-[10px]">{sub.reads}</code></p>
                            <p><span className="font-semibold text-slate-500">Returns:</span> <span className="font-semibold text-slate-800">{sub.returns}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Monochrome Evidence Line */}
                    <div className="border-t border-slate-100 pt-2.5 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>
                        <span className="font-bold text-slate-700">Orchestrated by:</span> Discount Exception Agent · shared client context · common Knowledge Engine
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 8 — Test Scenarios */}
                {cardIndex === 7 && (
                  <div className="space-y-4 max-w-2xl mx-auto w-full">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-bold border border-violet-200/60">
                        Validation & Testing
                      </span>
                      <h3 className="text-base font-bold text-slate-900 pt-1">7 scenarios generated from observed workflow behavior</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { title: 'Standard discount within threshold', tag: 'Observed', tagClass: 'bg-slate-100 text-slate-700 border-slate-200' },
                        { title: 'Manager approval required', tag: 'Observed', tagClass: 'bg-slate-100 text-slate-700 border-slate-200' },
                        { title: 'Margin-risk exception', tag: 'Observed', tagClass: 'bg-slate-100 text-slate-700 border-slate-200' },
                        { title: 'Strategic account exception', tag: 'Inferred', tagClass: 'bg-blue-50 text-blue-700 border-blue-200' },
                        { title: 'Contracted pricing conflict', tag: 'Observed', tagClass: 'bg-slate-100 text-slate-700 border-slate-200' },
                        { title: 'Missing pricing evidence', tag: 'Edge case', tagClass: 'bg-amber-50 text-amber-700 border-amber-200' },
                        { title: 'Quote repriced after approval', tag: 'New regression test', tagClass: 'bg-violet-50 text-violet-700 border-violet-200 font-bold' },
                      ].map((scenario, i) => (
                        <div key={i} className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
                          <span className="text-xs font-semibold text-slate-800">{scenario.title}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] border shrink-0 ${scenario.tagClass}`}>
                            {scenario.tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Monochrome Evidence Line */}
                    <div className="border-t border-slate-100 pt-2.5 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>
                        <span className="font-bold text-slate-700">Generated from:</span> current rules · approval outcomes · observed exceptions · historical rework patterns
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 9 — Completion Card */}
                {cardIndex === 8 && (
                  <div className="space-y-4 max-w-xl mx-auto w-full text-center py-2 animate-[fadeIn_300ms_ease]">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900">Implement Future Approval Process</h3>
                      <p className="text-xs font-semibold text-violet-700 bg-violet-50 inline-block px-3 py-1 rounded-full border border-violet-200/80">
                        7 process components ready · 96% implementation confidence
                      </p>
                    </div>

                    {/* Side-by-side Centered Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto items-stretch">
                      
                      {/* Technical Summary List */}
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 font-bold text-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>8 decisions confirmed</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>4 specialized agents connected</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>6 customer context sources bound</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>7 workflow tests generated</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>1 inferred business rule confirmed</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-700 font-bold pt-2 border-t border-slate-200 mt-2">
                          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>96% implementation confidence</span>
                        </div>
                      </div>

                      {/* Compact Business Impact Section */}
                      <div className="p-3.5 bg-violet-50/70 border border-violet-200/80 rounded-xl text-xs flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-violet-900 uppercase text-[10px] tracking-wider block">Expected business impact</span>
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <div className="p-2 bg-white rounded-lg border border-violet-100">
                              <span className="font-bold text-violet-900 block text-xs">~172 senior-team hrs</span>
                              <span className="text-[10px] text-slate-500">saved per quarter</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-violet-100">
                              <span className="font-bold text-violet-900 block text-xs">~34% faster</span>
                              <span className="text-[10px] text-slate-500">approval cycle</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-violet-800 pt-2 font-medium leading-tight">
                          • Less manual Sales / Deal Desk / Finance coordination<br />
                          • RevBrain continues learning from every decision
                        </p>
                      </div>

                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => navigate('/revbrain/migration/si-architect/implementation')}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98]"
                      >
                        <span>Implement full process</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setCardIndex(0)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs transition-all active:scale-[0.98]"
                      >
                        <span>Review plan</span>
                      </button>

                      <button
                        onClick={() => setShowShareModal(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs transition-all active:scale-[0.98]"
                      >
                        <span>Share with client</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Evidence Popover Modal */}
      {activePopover && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-xs p-4 animate-fadeIn" onClick={() => setActivePopover(null)}>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xl max-w-sm w-full space-y-3" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-violet-600" />
                {activePopover === 'approvals' ? '147 Comparable Approvals' : '12 Matched Approval Rules'}
              </h4>
              <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              {activePopover === 'approvals' ? (
                <>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center font-mono text-[11px]">
                    <span>Quote Q-2841</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Approved</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center font-mono text-[11px]">
                    <span>Quote Q-2718</span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Finance escalation</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center font-mono text-[11px]">
                    <span>Quote Q-2604</span>
                    <span className="text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">Strategic exception</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-[11px] text-slate-800">
                    Enterprise_Discount_Approval
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-[11px] text-slate-800">
                    Margin_Risk_Routing
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg font-mono text-[11px] text-slate-800">
                    Strategic_Account_Exception
                  </div>
                </>
              )}
            </div>

            <div className="pt-1 text-right">
              <button
                onClick={() => {
                  alert('Opening Salesforce reference link...');
                  setActivePopover(null);
                }}
                className="text-xs font-bold text-violet-600 hover:text-violet-800 inline-flex items-center gap-1"
              >
                <span>Open in Salesforce</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Executive Summary Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 animate-fadeIn" onClick={() => setShowShareModal(false)}>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xl max-w-md w-full space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <h4 className="text-sm font-bold text-slate-900">RevBrain Executive Summary</h4>
              </div>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="text-slate-600 leading-relaxed">
                Ready to share with your client executive team or SI sponsors:
              </p>

              <div className="p-3.5 bg-violet-50/70 border border-violet-100 rounded-xl space-y-1.5">
                <span className="font-bold text-violet-900 block text-xs">Discount Exception Agent — Design Summary</span>
                <ul className="space-y-1 text-[11px] text-violet-800">
                  <li>• 8 decisions confirmed across pricing, margin, and routing</li>
                  <li>• 4 specialized subagents connected (Margin, Similar Deals, Pricing, Routing)</li>
                  <li>• Expected Impact: ~172 senior-team hrs/qtr saved & ~34% faster cycle</li>
                  <li>• Continuous Learning: RevBrain refines recommendations post-deployment</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Executive summary link copied to clipboard.');
                  setShowShareModal(false);
                }}
                className="px-4 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs"
              >
                Copy Share Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
