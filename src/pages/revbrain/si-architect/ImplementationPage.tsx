// ── Implementation — Continuous Architecture Execution ──────────────────────
// Phase 1: Implementation Blueprint (5 System Areas, Summary & Approved Process Reference)
// Phase 3: Continuous Live Execution (3-Column Layout: Left 25%, Middle 37.5% Preview+Build, Right 37.5% Code & Configs)
// Phase 4: Validation, Business Verification & Audit Trail (~252 hrs saved summary)

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Loader2,
  MessageSquare,
  ShieldCheck,
  FileCode2,
  Check,
  Clock,
  Plug,
  Database,
  GitBranch,
  Bot,
  Brain,
  Layers,
  ChevronRight,
  Send,
  Zap,
  X,
  Info,
  Layers3,
  TrendingDown,
  CheckSquare,
} from 'lucide-react';

/* ── Process Step Definition ────────────────────────────────────────── */

interface ProcessStep {
  id: number;
  title: string;
  typeLabel: string;
  typeCategory: 'integration' | 'core' | 'automation' | 'agent' | 'human' | 'conditional' | 'knowledge';
  icon: any;
  middleTitle: string;
  provenanceText: string;
  agentStatus: string;
  executionLogs: string[];
  artifactLabel: string;
  artifactCode: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Rep submits quote in Slack',
    typeLabel: 'Integration',
    typeCategory: 'integration',
    icon: Plug,
    middleTitle: 'Slack Quote Entry',
    provenanceText: 'Approved quote workflow · account context · Revenue Cloud objects',
    agentStatus: 'Connecting Slack quote entry',
    executionLogs: [
      'Creating Slack action...',
      'Binding quote context...',
      'Connecting Revenue Cloud...',
    ],
    artifactLabel: 'Slack Action Configuration',
    artifactCode: `slash_command /quote-submit {
  endpoint: "https://api.revbrain.ai/v2/slack/quote-entry"
  trigger: Slack.Event.QuoteRequest
  security: {
    auth_mode: "OAuth2_SAML_SSO"
    client_id: "sf_connected_app_revbrain_v2"
    signing_secret: "env.SLACK_SIGNING_SECRET"
  }
  payload_mapping: {
    opportunity_id: Opportunity.Id
    requested_discount: Quote.Discount_Percent
    sales_rep_id: User.Id
    channel_id: Channel.Id
    account_context: Account.Strategic_Tier
  }
  response_handler: {
    on_success: "POST -> RevenueCloud.Quote.CreateDraft"
    on_error: "NotifyRepInSlackChannel"
  }
}`,
  },
  {
    id: 2,
    title: 'RCA pricing procedure evaluates threshold/margin',
    typeLabel: 'Revenue Cloud Core Config',
    typeCategory: 'core',
    icon: Database,
    middleTitle: 'Pricing Procedure',
    provenanceText: '12 price rules · 3 QCP scripts · CFO Margin Policy · and more...',
    agentStatus: 'Building pricing foundation',
    executionLogs: [
      'Mapping legacy price rules...',
      'Translating margin logic...',
      'Binding contracted pricing...',
    ],
    artifactLabel: 'Revenue Cloud Configuration',
    artifactCode: `PricingProcedure RCA_Discount_Exception_V2 {
  target_object: "RevenueCloud.QuoteLineItem"
  currency: "USD"
  steps: [
    {
      index: 10
      type: "List_Price_Resolution"
      source: "PricebookEntry.UnitPrice"
    },
    {
      index: 20
      type: "Contracted_Pricing_Override"
      condition: "Account.Contracted_Pricing != null"
      action: "ApplyContractedFloor"
    },
    {
      index: 30
      type: "Margin_Evaluation"
      formula: "(Gross_Amount - Total_Cost) / Gross_Amount"
      threshold_policy: "CFO_Margin_Policy.floor_28"
    },
    {
      index: 40
      type: "Discount_Exception_Flag"
      condition: "Requested_Discount > 0.25 || Calculated_Margin < 0.28"
      action: "SetFlag(Requires_Approval, true)"
    }
  ]
}`,
  },
  {
    id: 3,
    title: 'Approval automation routes standard approval path',
    typeLabel: 'Flow Automation',
    typeCategory: 'automation',
    icon: GitBranch,
    middleTitle: 'Approval Routing Flow',
    provenanceText: 'approval rules · confirmed client decision paths · historical routing patterns',
    agentStatus: 'Building approval Flow',
    executionLogs: [
      'Creating Flow...',
      'Adding margin decision...',
      'Generating manager branch...',
      'Generating finance branch...',
      'Generating strategic branch...',
    ],
    artifactLabel: 'Flow Logic',
    artifactCode: `flow Discount_Approval_Routing_V2 {
  process_type: "AutoLaunchedFlow"
  trigger: "Quote.Exception_Flagged"
  
  decision Evaluate_Discount_Severity {
    branch Margin_Risk_Path {
      condition: "Quote.Margin < 0.28"
      target: "Queue.Finance_Ops_Queue"
      action: "AssignUrgency(High)"
    }
    branch Strategic_Account_Path {
      condition: "Account.Strategic_Tier == 'Enterprise' && Quote.ARR > 100000"
      target: "Queue.Deal_Desk_Queue"
      action: "AttachDealDeskSummary"
    }
    default Standard_Manager_Path {
      target: "User.ManagerId"
      action: "SendSlackManagerCard"
    }
  }
}`,
  },
  {
    id: 4,
    title: 'Discount Exception Agent gathers evidence and explains recommendation',
    typeLabel: 'Agentforce Agent',
    typeCategory: 'agent',
    icon: Bot,
    middleTitle: 'Discount Exception Agent',
    provenanceText: 'Client policy · Salesforce logic · historical approvals · Design decisions',
    agentStatus: 'Connecting Discount Exception Agent',
    executionLogs: [
      'Generating Agentforce topic...',
      'Binding context sources...',
      'Adding decision instructions...',
      'Applying human-approval guardrail...',
    ],
    artifactLabel: 'Agentforce Topic & Action',
    artifactCode: `topic Discount_Exception_Agent_v2 {
  agent_name: "RevBrain Discount Assister"
  model: "Agentforce-Reasoning-v3"
  system_instructions: """
    Analyze requested discount against CFO policy floor (28%), account tier,
    and 147 comparable historic deal approvals. Formulate recommendation.
  """
  
  context_sources: [
    "Salesforce.RevenueCloud.Quote",
    "Salesforce.Account.HistoricalApprovals",
    "KnowledgeEngine.PatternIndex"
  ]
  
  actions: [
    { name: "CalculateMarginImpact", strict: true },
    { name: "QueryComparableDeals", limit: 7 },
    { name: "GenerateRecommendationSummary" }
  ]
  
  guardrails: {
    human_approval_required: true
    auto_execute_discounts: false
    min_confidence_score: 0.90
  }
}`,
  },
  {
    id: 5,
    title: 'Manager approves in Slack with business context',
    typeLabel: 'Integration + Human Approval',
    typeCategory: 'human',
    icon: MessageSquare,
    middleTitle: 'Slack Manager Approval',
    provenanceText: 'approval routing · CFO margin policy · Slack handoff decision · approval history',
    agentStatus: 'Configuring manager approval',
    executionLogs: [
      'Creating Slack approval action...',
      'Binding evidence package...',
      'Mapping response writeback...',
    ],
    artifactLabel: 'Slack Approval Action',
    artifactCode: `action SlackManagerApproval_BlockKit {
  type: "slack_interactive_card"
  channel: "Slack.PrivateChannel.ManagerQueue"
  card_layout: [
    { type: "header", text: "Discount Exception · Q-2844" },
    {
      type: "section",
      fields: [
        "Recommendation: *Approve*",
        "Discount: *18%* | Margin: *31%*",
        "CFO Floor: *28%* | Account: *Strategic*",
        "Comparable Deals: *7 Approvals*"
      ]
    },
    {
      type: "actions",
      elements: [
        { type: "button", text: "Approve", style: "primary", action_id: "approve_deal" },
        { type: "button", text: "Reject", style: "danger", action_id: "reject_deal" },
        { type: "button", text: "View Evidence", action_id: "view_evidence_drawer" }
      ]
    }
  ]
  writeback: {
    target: "Salesforce.ApprovalProcess.Submit"
    post_event: "KnowledgeEngine.CaptureDecision"
  }
}`,
  },
  {
    id: 6,
    title: 'Finance reviews margin-risk exceptions only',
    typeLabel: 'Conditional Human Approval',
    typeCategory: 'conditional',
    icon: ShieldCheck,
    middleTitle: 'Finance Margin-Risk Review',
    provenanceText: 'CFO policy floor · margin risk threshold · Finance queue routing',
    agentStatus: 'Configuring Finance exception path',
    executionLogs: [
      'Creating margin-risk condition...',
      'Binding Finance evidence...',
      'Configuring escalation path...',
    ],
    artifactLabel: 'Finance Exception Rule',
    artifactCode: `rule FinanceReview_MarginRisk_Config {
  rule_id: "FIN_MARGIN_RISK_009"
  trigger_condition: "Calculated_Margin < 0.28 && Requested_Discount > 0.25"
  
  evidence_package: {
    margin_waterfall: "Quote.MarginWaterfallJSON"
    price_override_history: "Account.PriceOverrides"
    comparable_rejections: "Knowledge.RecentRejections"
  }
  
  routing: {
    target_queue: "Finance_Ops_Queue"
    slack_alert: "Slack.Channel.FinanceEscalations"
    sla_hours: 4
  }
  
  hard_boundaries: {
    cfo_hard_floor: 0.20
    auto_reject_if: "Calculated_Margin < 0.20"
  }
}`,
  },
  {
    id: 7,
    title: 'Knowledge Engine captures decision and rationale',
    typeLabel: 'Knowledge + Learning',
    typeCategory: 'knowledge',
    icon: Brain,
    middleTitle: 'Decision & Rationale Capture',
    provenanceText: 'Knowledge Engine schema · approval event listener · pattern extraction engine',
    agentStatus: 'Connecting Knowledge Engine',
    executionLogs: [
      'Creating decision schema...',
      'Mapping writeback fields...',
      'Connecting Knowledge Engine...',
      'Enabling recommendation context...',
    ],
    artifactLabel: 'Knowledge Engine Payload',
    artifactCode: `event Knowledge_Engine_Capture_v2 {
  event_type: "Approval_Decision_Executed"
  timestamp: "2026-08-29T23:42:00Z"
  
  payload: {
    quote_id: "Q-2844"
    decision: "APPROVED"
    approver_role: "Sales_Manager"
    discount_percent: 0.18
    executed_margin: 0.31
    cfo_floor: 0.28
    rationale_text: "Strategic land deal with 3-year expansion contract"
    learning_weight: 0.94
  }
  
  learning_pipeline: [
    "VectorizeDecisionRationale",
    "UpdateCrossOrgPatternIndex",
    "ReindexAgentforcePromptWeights"
  ]
}`,
  },
];

/* ── Validation Test Scenarios (Phase 4) ────────────────────────────── */

interface TestScenario {
  id: number;
  name: string;
  category: string;
  expectedResult: string;
  runTime: string;
}

const TEST_SCENARIOS: TestScenario[] = [
  { id: 1, name: 'Standard discount under threshold (<25%)', category: 'Auto-Approval Path', expectedResult: 'Auto-approve via Slack notification', runTime: '12ms' },
  { id: 2, name: 'Manager approval required (25%-35%)', category: 'Manager Routing', expectedResult: 'Prompt Manager in Slack with context', runTime: '18ms' },
  { id: 3, name: 'Margin-risk exception (<28% floor)', category: 'Finance Escalation', expectedResult: 'Route to Finance queue with evidence', runTime: '24ms' },
  { id: 4, name: 'Strategic account exception (> $100k ARR)', category: 'Deal Desk Policy', expectedResult: 'Flag Deal Desk + auto-attach tier context', runTime: '15ms' },
  { id: 5, name: 'Contracted pricing conflict detection', category: 'Revenue Cloud Core', expectedResult: 'Enforce contracted floor over manual discount', runTime: '21ms' },
  { id: 6, name: 'Missing pricing evidence fallback', category: 'Agentforce Guardrail', expectedResult: 'Request rep justification before routing', runTime: '14ms' },
  { id: 7, name: 'Quote repriced after approval', category: 'Regression Protection', expectedResult: 'Invalidate stale approval + re-evaluate', runTime: '19ms' },
];

/* ── Business Verification Items (Phase 4) ──────────────────────────── */

const BUSINESS_VERIFICATIONS = [
  { scenario: 'Margin-risk exception', currentCPQ: 'Finance Review', newARM: 'Finance Review', status: 'Matched' },
  { scenario: 'Strategic exception', currentCPQ: 'Deal Desk Review', newARM: 'Deal Desk Review', status: 'Matched' },
  { scenario: 'Standard approval', currentCPQ: 'Manager Approval', newARM: 'Manager Approval', status: 'Matched' },
];

/* ── Audit Trail Items (Phase 4) ──────────────────────────────────────── */

const AUDIT_TRAIL = [
  'Revenue Cloud configuration generated',
  'Approval Flow created',
  'Agentforce agent connected',
  'Slack handoffs configured',
  'Knowledge Engine connected',
  '7 business scenarios validated',
  'and more...',
];

/* ── Main Component ────────────────────────────────────────────────── */

export function ImplementationPage() {
  const navigate = useNavigate();

  // Phase control: 'phase1' (Implementation Blueprint Overview) -> 'phase3' (Continuous Live Execution) -> 'phase4' (Validation & Audit)
  const [phase, setPhase] = useState<'phase1' | 'phase3' | 'phase4'>('phase1');

  // Lightweight popover for 'Review details' on Phase 1
  const [showDetailsPopover, setShowDetailsPopover] = useState(false);

  // Phase 3 live build step index (0 to 6)
  const [buildStepIndex, setBuildStepIndex] = useState<number>(0);
  const [stepPieceIndex, setStepPieceIndex] = useState<number>(0);
  const [buildStepStatuses, setBuildStepStatuses] = useState<('queued' | 'building' | 'ready')[]>([
    'building',
    'queued',
    'queued',
    'queued',
    'queued',
    'queued',
    'queued',
  ]);

  // Live execution logs & code snippet streaming
  const [completedLogs, setCompletedLogs] = useState<string[]>([]);
  const [currentLog, setCurrentLog] = useState<string>('Creating Slack action...');
  const [displayedCode, setDisplayedCode] = useState<string>('');

  // Phase 4 testing & validation state
  const [testStatuses, setTestStatuses] = useState<('queued' | 'running' | 'passed')[]>([
    'queued',
    'queued',
    'queued',
    'queued',
    'queued',
    'queued',
    'queued',
  ]);
  const [isPhase4Completed, setIsPhase4Completed] = useState(false);

  // Listen for user actions from RevBrainBottomAgent
  useEffect(() => {
    const handleStartLiveImpl = () => {
      setPhase('phase3');
      setBuildStepIndex(0);
      setStepPieceIndex(0);
      setCompletedLogs([]);
    };

    const handleOpenPopover = () => {
      setShowDetailsPopover(true);
    };

    window.addEventListener('revbrain-start-live-impl', handleStartLiveImpl);
    window.addEventListener('revbrain-open-details-popover', handleOpenPopover);

    return () => {
      window.removeEventListener('revbrain-start-live-impl', handleStartLiveImpl);
      window.removeEventListener('revbrain-open-details-popover', handleOpenPopover);
    };
  }, []);

  // Broadcast current phase status to RevBrainBottomAgent
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('revbrain-impl-phase-change', {
        detail: {
          phase,
          buildStepIndex,
          isPhase4Completed,
        },
      })
    );
  }, [phase, buildStepIndex, isPhase4Completed]);

  // ── PHASE 3: Continuous Sequential Build (~3.25s per step) ──────
  useEffect(() => {
    if (phase !== 'phase3') return;

    let step = buildStepIndex;
    setStepPieceIndex(0);

    // Progressive piece ticker for preview & build
    let piece = 0;
    const pieceInterval = setInterval(() => {
      if (piece < 4) {
        piece += 1;
        setStepPieceIndex(piece);
      } else {
        clearInterval(pieceInterval);
      }
    }, 500);

    const stepTimeout = setTimeout(() => {
      const stepData = PROCESS_STEPS[step];
      setCompletedLogs((prev) => [...prev, `${stepData.title} — Built & Connected`]);

      setBuildStepStatuses((prev) => {
        const next = [...prev];
        next[step] = 'ready';
        if (step + 1 < 7) {
          next[step + 1] = 'building';
        }
        return next;
      });

      if (step < 6) {
        const nextStep = step + 1;
        setBuildStepIndex(nextStep);
        setCurrentLog(PROCESS_STEPS[nextStep].executionLogs[0]);
      } else {
        // Step 7 complete → Auto transition to Phase 4 Validation & Audit
        startPhase4();
      }
    }, 3250);

    return () => {
      clearInterval(pieceInterval);
      clearTimeout(stepTimeout);
    };
  }, [phase, buildStepIndex]);

  // Fast Typewriter effect for Code & Configs in Phase 3
  useEffect(() => {
    if (phase !== 'phase3') return;
    const targetCode = PROCESS_STEPS[buildStepIndex]?.artifactCode || '';
    let charIdx = 0;
    setDisplayedCode('');

    const timer = setInterval(() => {
      charIdx += 8;
      if (charIdx <= targetCode.length) {
        setDisplayedCode(targetCode.slice(0, charIdx));
      } else {
        setDisplayedCode(targetCode);
        clearInterval(timer);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [phase, buildStepIndex]);

  // Instantly complete code to 100% full text when step finishes
  useEffect(() => {
    if (phase === 'phase3' && stepPieceIndex >= 4) {
      setDisplayedCode(PROCESS_STEPS[buildStepIndex]?.artifactCode || '');
    }
  }, [phase, buildStepIndex, stepPieceIndex]);

  // ── PHASE 4: Validation, Verification & Audit ───────────────────────────────
  const startPhase4 = () => {
    setPhase('phase4');
    setCurrentLog('Running 7 automated business validation scenarios...');

    let currentTest = 0;
    const testInterval = setInterval(() => {
      if (currentTest < TEST_SCENARIOS.length) {
        setTestStatuses((prev) => {
          const next = [...prev];
          next[currentTest] = 'passed';
          if (currentTest + 1 < TEST_SCENARIOS.length) {
            next[currentTest + 1] = 'running';
          }
          return next;
        });

        currentTest += 1;
        if (currentTest >= TEST_SCENARIOS.length) {
          clearInterval(testInterval);
          setIsPhase4Completed(true);
        }
      }
    }, 715);
  };

  const activeStepData = PROCESS_STEPS[buildStepIndex] || PROCESS_STEPS[0];
  const StepIcon = activeStepData.icon;

  return (
    <div className="w-full flex flex-col bg-slate-100/70 min-h-screen text-slate-800 font-sans">
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-5 pb-24 space-y-4 flex-1">

        {/* ────────────────────────────────────────────────────────────── */}
        {/* PHASE 1: Implementation Blueprint Main Canvas */}
        {/* ────────────────────────────────────────────────────────────── */}
        {phase === 'phase1' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 animate-fadeIn">
            
            {/* Header & Question */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>Implementation Blueprint</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  What systems will RevBrain change to implement the approved future process?
                </p>
              </div>

              {/* Compact Summary Line Badge */}
              <div className="px-3.5 py-1.5 bg-violet-50 border border-violet-200/80 rounded-xl text-violet-900 text-xs font-bold font-mono">
                7 process components · 5 system areas · 0 blocking conflicts · 96% confidence
              </div>
            </div>

            {/* Short RevBrain Statement */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
              <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                The approved business process maps to 7 implementation components across Revenue Cloud, Flow, Agentforce, Slack, and Knowledge.
              </p>
            </div>

            {/* 5 Connected Implementation Areas Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                5 System Implementation Areas
              </span>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* 1. Revenue Cloud */}
                <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-purple-950">
                    <Database className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Revenue Cloud</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-700 font-medium pt-1">
                    <div className="p-1.5 bg-white rounded border border-purple-100 shadow-2xs">Pricing foundation</div>
                    <div className="p-1.5 bg-white rounded border border-purple-100 shadow-2xs">Quote context</div>
                  </div>
                </div>

                {/* 2. Flow Automation */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <GitBranch className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Flow Automation</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-700 font-medium pt-1">
                    <div className="p-1.5 bg-white rounded border border-amber-100 shadow-2xs">Approval routing</div>
                    <div className="p-1.5 bg-white rounded border border-amber-100 shadow-2xs">Margin decisions</div>
                  </div>
                </div>

                {/* 3. Agentforce */}
                <div className="p-3.5 bg-violet-50/70 border border-violet-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-violet-950">
                    <Bot className="w-4 h-4 text-violet-600 shrink-0" />
                    <span>Agentforce</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-700 font-medium pt-1">
                    <div className="p-1.5 bg-white rounded border border-violet-100 shadow-2xs">Discount Exception Agent</div>
                    <div className="p-1.5 bg-white rounded border border-violet-100 shadow-2xs">Evidence + recommendation</div>
                  </div>
                </div>

                {/* 4. Slack */}
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-blue-950">
                    <Plug className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Slack</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-700 font-medium pt-1">
                    <div className="p-1.5 bg-white rounded border border-blue-100 shadow-2xs">Quote entry</div>
                    <div className="p-1.5 bg-white rounded border border-blue-100 shadow-2xs">Manager approval</div>
                  </div>
                </div>

                {/* 5. Knowledge Engine */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-950">
                    <Brain className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Knowledge Engine</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-700 font-medium pt-1">
                    <div className="p-1.5 bg-white rounded border border-emerald-100 shadow-2xs">Decision + rationale capture</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Process Reference Sequence */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Approved process reference
              </span>

              <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <span className="px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">Quote</span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">Price</span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">Route</span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">Agent</span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">Manager</span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">Finance</span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs text-violet-800">Learn</span>
              </div>
            </div>

            {/* Action Bar (Review Details) */}
            <div className="pt-2 flex items-center justify-start gap-3 border-t border-slate-100">
              <button
                onClick={() => setShowDetailsPopover(!showDetailsPopover)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Review details</span>
              </button>
            </div>

            {/* Lightweight Component Popover */}
            {showDetailsPopover && (
              <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 animate-fadeIn text-xs shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-100">7 Implementation Components Overview</span>
                  <button onClick={() => setShowDetailsPopover(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  {PROCESS_STEPS.map((step) => (
                    <div key={step.id} className="p-2 bg-slate-800/80 rounded border border-slate-700 space-y-0.5">
                      <div className="font-bold text-violet-300">Step 0{step.id}: {step.title}</div>
                      <div className="text-slate-400 text-[10px]">{step.typeLabel}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* PHASE 3 LAYOUT (3 Columns: Left 25%, Middle 37.5% Preview+Build, Right 37.5% Code Stream) */}
        {/* ────────────────────────────────────────────────────────────── */}
        {phase === 'phase3' && (
          <div className="grid grid-cols-1 lg:grid-cols-[25fr_37.5fr_37.5fr] gap-5 items-start min-h-[580px] animate-[fadeIn_300ms_ease]">
            
            {/* Left Column (Future Approval Process - 25%) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col h-full">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Future Approval Process
                </h2>
                <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-200/60 font-mono">
                  {buildStepStatuses.filter((s) => s === 'ready').length}/7 Ready
                </span>
              </div>

              <div className="space-y-2 flex-1">
                {PROCESS_STEPS.map((step, idx) => {
                  const StepIconItem = step.icon;
                  const status = buildStepStatuses[idx];
                  const isActive = idx === buildStepIndex;

                  return (
                    <div
                      key={step.id}
                      onClick={() => setBuildStepIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-violet-50/90 border-violet-400 ring-2 ring-violet-200/70 shadow-xs text-slate-900 font-bold'
                          : status === 'ready'
                          ? 'bg-slate-50/80 border-slate-200 text-slate-700'
                          : 'opacity-[0.65] bg-white border-slate-200/80 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1">
                          <StepIconItem className="w-3 h-3 text-slate-400" />
                          Step 0{step.id}
                        </span>

                        {status === 'ready' ? (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            Ready
                          </span>
                        ) : status === 'building' ? (
                          <span className="text-[9px] font-bold text-violet-700 bg-violet-100/90 px-1.5 py-0.5 rounded border border-violet-200 flex items-center gap-1 animate-pulse">
                            <Loader2 className="w-2.5 h-2.5 text-violet-600 animate-spin" />
                            Building
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            Queued
                          </span>
                        )}
                      </div>

                      <p className={`text-xs leading-snug ${isActive ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                        {step.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Middle Column (37.5%) — Preview → Live Build Component Canvas */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col h-full justify-between min-h-[560px]">
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        WHAT REVBRAIN IS IMPLEMENTING
                      </h2>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5 flex items-center gap-1.5">
                        <span>Step {buildStepIndex + 1}: {activeStepData.middleTitle}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 border border-violet-200/80 rounded-lg text-violet-800 text-[10px] font-bold">
                      <StepIcon className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                      <span>{activeStepData.typeLabel}</span>
                    </div>
                  </div>

                  {/* Build Phase Bar: Preview vs Live Assembly */}
                  <div className="pt-2 pb-1 flex items-center justify-between text-[11px] font-semibold">
                    <div className="flex items-center gap-2">
                      {stepPieceIndex < 2 ? (
                        <>
                          <Info className="w-3.5 h-3.5 text-violet-600" />
                          <span className="text-violet-700 font-bold">Blueprint Preview</span>
                        </>
                      ) : stepPieceIndex < 4 ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 text-violet-600 animate-spin" />
                          <span className="text-violet-700">Assembling component live...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-800 font-bold">Component Ready</span>
                        </>
                      )}
                    </div>
                    <span className="text-slate-400 font-mono text-[10px]">
                      Step {buildStepIndex + 1} of 7
                    </span>
                  </div>

                  {/* Visual Canvas (Blueprint Preview → Live Build) */}
                  <div key={buildStepIndex} className="py-1 transition-all duration-300 ease-out">
                    
                    {/* STEP 1: Integration (Slack Quote Entry) */}
                    {buildStepIndex === 0 && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 shadow-2xs text-xs">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-bold text-slate-900">Slack Quote Entry Integration</span>
                          <span className={`text-[9px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded border border-violet-200 transition-opacity duration-300 ${stepPieceIndex >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                            New Slack integration
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-2 py-4 text-xs font-bold text-slate-800">
                          <div className={`p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs transition-all duration-300 ${stepPieceIndex >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Rep Request
                          </div>
                          <span className={`text-slate-400 transition-opacity duration-300 ${stepPieceIndex >= 2 ? 'opacity-100' : 'opacity-0'}`}>→</span>
                          <div className={`p-2.5 bg-violet-100 border border-violet-200 text-violet-900 rounded-lg shadow-2xs transition-all duration-300 ${stepPieceIndex >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Quote Context
                          </div>
                          <span className={`text-slate-400 transition-opacity duration-300 ${stepPieceIndex >= 3 ? 'opacity-100' : 'opacity-0'}`}>→</span>
                          <div className={`p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs transition-all duration-300 ${stepPieceIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Revenue Cloud
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Revenue Cloud Core Config (Pricing Procedure) */}
                    {buildStepIndex === 1 && (
                      <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-3 shadow-2xs text-xs">
                        <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                          <span className="font-bold text-purple-950">Pricing Procedure</span>
                          <span className="text-[9px] font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                            Core Config
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-1 font-semibold text-slate-800">
                          <div className={`p-2.5 bg-white rounded-lg border border-purple-100 shadow-2xs transition-all duration-300 ${stepPieceIndex >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>Discount Threshold</div>
                          <div className={`p-2.5 bg-white rounded-lg border border-purple-100 shadow-2xs transition-all duration-300 ${stepPieceIndex >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>Margin Evaluation</div>
                          <div className={`p-2.5 bg-white rounded-lg border border-purple-100 shadow-2xs transition-all duration-300 ${stepPieceIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>Contracted Pricing</div>
                          <div className={`p-2.5 bg-white rounded-lg border border-purple-100 shadow-2xs transition-all duration-300 ${stepPieceIndex >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>Strategic Account Context</div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Flow Automation (Approval Routing Flow) */}
                    {buildStepIndex === 2 && (
                      <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3 text-center shadow-2xs text-xs">
                        <div className={`space-y-1 transition-all duration-300 ${stepPieceIndex >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                          <div className="inline-block p-2 bg-white border border-amber-200 rounded-lg text-xs font-bold text-slate-800 shadow-2xs">
                            Discount Request
                          </div>
                          <div className="text-amber-600 text-xs font-bold">↓</div>
                          <div className="inline-block p-2 bg-amber-100 border border-amber-300 rounded-lg text-xs font-bold text-amber-950 shadow-2xs">
                            Evaluate Margin
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs pt-2">
                          <div className={`p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-bold transition-all duration-300 ${stepPieceIndex >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Standard → Manager
                          </div>
                          <div className={`p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-bold transition-all duration-300 ${stepPieceIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Margin Risk → Finance
                          </div>
                          <div className={`p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 font-bold transition-all duration-300 ${stepPieceIndex >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Strategic → Deal Desk
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Agentforce Agent (Discount Exception Agent) */}
                    {buildStepIndex === 3 && (
                      <div className="p-4 bg-violet-50/60 border border-violet-200 rounded-xl space-y-3 shadow-2xs text-xs">
                        <div className="flex items-center justify-between border-b border-violet-200 pb-2">
                          <span className="font-bold text-violet-950">Discount Exception Agent</span>
                          <span className={`text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 transition-opacity duration-300 ${stepPieceIndex >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                            Human approval required
                          </span>
                        </div>

                        <div className={`space-y-1.5 transition-all duration-300 ${stepPieceIndex >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Context Sources</span>
                          <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-700">
                            <span className="px-2 py-0.5 bg-white rounded border border-violet-200">Margin</span>
                            <span className="px-2 py-0.5 bg-white rounded border border-violet-200">Pricing</span>
                            <span className="px-2 py-0.5 bg-white rounded border border-violet-200">Account Context</span>
                            <span className="px-2 py-0.5 bg-white rounded border border-violet-200">147 Comparable Approvals</span>
                            <span className="px-2 py-0.5 bg-white rounded border border-violet-200 italic text-slate-400">and more...</span>
                          </div>
                        </div>

                        <div className={`space-y-1 border-t border-violet-200 pt-2 transition-all duration-300 ${stepPieceIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                          <span className="text-[10px] font-bold text-violet-800 uppercase block">Outputs &amp; Decision Path</span>
                          <div className="flex gap-2 text-[11px] font-bold text-violet-950">
                            <span className="px-2.5 py-1 bg-white rounded border border-violet-200">Recommendation</span>
                            <span className="px-2.5 py-1 bg-white rounded border border-violet-200">Evidence</span>
                            <span className="px-2.5 py-1 bg-white rounded border border-violet-200">Decision Path</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: Manager Approval (Integration + Human Approval) */}
                    {buildStepIndex === 4 && (
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-[14fr_25fr_25fr] gap-2 items-stretch">
                          {/* Trigger */}
                          <div className={`p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 transition-all duration-300 ${stepPieceIndex >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block">1. Trigger</span>
                            <div className="p-1 bg-white border border-slate-200 rounded text-slate-900 font-bold text-[11px] shadow-2xs">
                              Approval Required
                            </div>
                            <span className="text-[9px] text-slate-500 block">Standard approval path</span>
                          </div>

                          {/* RevBrain Context Package */}
                          <div className={`p-2.5 bg-violet-50/80 border border-violet-200 rounded-xl space-y-1 transition-all duration-300 ${stepPieceIndex >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            <span className="text-[9px] font-mono font-bold text-violet-700 uppercase block">2. Context Package</span>
                            <div className="space-y-0.5 text-[9px] font-medium text-slate-700 bg-white p-1.5 rounded border border-violet-200">
                              <div>Recommendation: <strong className="text-emerald-600">Approve</strong></div>
                              <div>Discount: <strong>18%</strong> · Margin: <strong>31%</strong></div>
                              <div>CFO Floor: <strong>28%</strong> · Approvals: <strong>7</strong></div>
                              <div>Account: <strong>Strategic</strong></div>
                            </div>
                          </div>

                          {/* Slack Manager Approval */}
                          <div className={`p-2.5 bg-slate-900 text-white rounded-xl space-y-1.5 shadow-md transition-all duration-300 ${stepPieceIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[9px]">
                              <span className="font-bold text-slate-200">Slack Manager Approval</span>
                              <span className="text-[8px] bg-violet-500/20 text-violet-300 px-1 py-0.5 rounded">
                                New Slack integration
                              </span>
                            </div>
                            <div className="flex gap-1 text-[8px] font-bold">
                              <span className="px-1.5 py-0.5 bg-emerald-600 rounded">Approve</span>
                              <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded">Reject</span>
                              <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded">View Evidence</span>
                            </div>
                          </div>
                        </div>

                        {/* Decision Writeback */}
                        <div className={`p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 transition-all duration-300 ${stepPieceIndex >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                          <div className="text-[10px] text-slate-700 font-semibold">
                            <strong>Decision Writeback:</strong> Status · Approver · Rationale · Timestamp
                          </div>
                          <span className="text-[9px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                            → Salesforce + Knowledge Engine
                          </span>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: Finance Review (Conditional Human Approval) */}
                    {buildStepIndex === 5 && (
                      <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3 shadow-2xs text-xs">
                        <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                          <span className="font-bold text-amber-950">Finance Review</span>
                          <span className="text-[9px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
                            Conditional Path
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-slate-800">
                          <div className={`p-2 bg-white rounded-lg border border-amber-200 transition-all duration-300 ${stepPieceIndex >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Margin Risk
                          </div>
                          <span className={`text-amber-600 transition-opacity duration-300 ${stepPieceIndex >= 2 ? 'opacity-100' : 'opacity-0'}`}>→</span>
                          <div className={`p-2 bg-amber-100 rounded-lg border border-amber-300 text-amber-950 transition-all duration-300 ${stepPieceIndex >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Finance Evidence Package
                          </div>
                          <span className={`text-amber-600 transition-opacity duration-300 ${stepPieceIndex >= 3 ? 'opacity-100' : 'opacity-0'}`}>→</span>
                          <div className={`p-2 bg-white rounded-lg border border-amber-200 transition-all duration-300 ${stepPieceIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Finance Review
                          </div>
                          <span className={`text-amber-600 transition-opacity duration-300 ${stepPieceIndex >= 4 ? 'opacity-100' : 'opacity-0'}`}>→</span>
                          <div className={`p-2 bg-white rounded-lg border border-amber-200 transition-all duration-300 ${stepPieceIndex >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            Decision Writeback
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 7: Knowledge Capture (Knowledge + Learning) */}
                    {buildStepIndex === 6 && (
                      <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3 shadow-2xs text-xs">
                        <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                          <span className="font-bold text-emerald-950">Structured Knowledge Capture</span>
                          <span className="text-[9px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                            Learning Loop
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className={`p-2 bg-white rounded-lg border border-emerald-200 flex items-center justify-between transition-all duration-300 ${stepPieceIndex >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            <span className="font-bold text-slate-800">Approval Decision Event</span>
                            <span className="text-emerald-600 font-bold text-xs">↓</span>
                          </div>

                          <div className={`p-2 bg-emerald-100/90 border border-emerald-300 rounded-lg space-y-1 transition-all duration-300 ${stepPieceIndex >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            <span className="text-[10px] font-bold text-emerald-900 uppercase block">Structured Capture Fields</span>
                            <div className="grid grid-cols-3 gap-1 text-[10px] font-semibold text-slate-800">
                              <div className="bg-white p-1 rounded border border-emerald-200 text-center">Decision</div>
                              <div className="bg-white p-1 rounded border border-emerald-200 text-center">Approver</div>
                              <div className="bg-white p-1 rounded border border-emerald-200 text-center">Margin</div>
                              <div className="bg-white p-1 rounded border border-emerald-200 text-center">Exception</div>
                              <div className="bg-white p-1 rounded border border-emerald-200 text-center">Rationale</div>
                              <div className="bg-white p-1 rounded border border-emerald-200 text-center">Outcome</div>
                            </div>
                          </div>

                          <div className={`p-2 bg-emerald-600 text-white rounded-lg text-center text-xs font-bold transition-all duration-300 ${stepPieceIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            ↓ Knowledge Engine → Future Recommendations &amp; Performance Learning
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Canvas Bottom Monochrome Provenance Line */}
                <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500 tracking-tight flex items-center gap-1.5">
                  <span className="font-bold text-slate-700">Built from:</span>
                  <span className="truncate">{activeStepData.provenanceText}</span>
                </div>
              </div>
            </div>

            {/* Right Column (37.5%) — LIVE IMPLEMENTATION (Active Execution + Rich Code & Configs) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4 flex flex-col h-full">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  LIVE IMPLEMENTATION
                </h2>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Stream
                </span>
              </div>

              {/* Terminal log stream */}
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl space-y-1.5 font-mono text-[11px] shadow-sm min-h-[130px] flex flex-col justify-end">
                {completedLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span>✓</span>
                    <span>{log}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-slate-300 font-medium pt-1">
                  <Loader2 className="w-3 h-3 text-violet-400 animate-spin shrink-0" />
                  <span>{currentLog}</span>
                </div>
              </div>

              {/* Code & Configs Typewriter Box */}
              <div className="space-y-1.5 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileCode2 className="w-3.5 h-3.5 text-violet-600" />
                    CODE &amp; CONFIGS
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {activeStepData.artifactLabel}
                  </span>
                </div>

                <div className="bg-slate-950 text-slate-200 rounded-xl p-3.5 text-[11px] font-mono leading-relaxed border border-slate-800 flex-1 min-h-[220px] max-h-[360px] overflow-y-auto shadow-inner">
                  <pre className="whitespace-pre text-slate-200 font-mono">
                    {displayedCode}
                    <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-violet-400 animate-pulse align-middle" />
                  </pre>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ────────────────────────────────────────────────────────────── */}
        {/* PHASE 4 LAYOUT (Validation, Business Behavior Verification & Audit) */}
        {/* ────────────────────────────────────────────────────────────── */}
        {phase === 'phase4' && (
          <div className="space-y-6 animate-[fadeIn_300ms_ease]">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Validation &amp; Testing
                    </h2>
                    <p className="text-xs text-slate-500">
                      Verifying that implemented components match approved business behavior across all 7 scenarios.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    7 / 7 Scenarios Verified
                  </span>
                </div>
              </div>

              {/* Grid: 7 Automated Scenarios + Business Verification + Audit */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Column: 7 Automated Test Scenarios */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Automated Test Suite (7 Scenarios)
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">100% Pass Rate</span>
                  </div>

                  <div className="space-y-2">
                    {TEST_SCENARIOS.map((test, idx) => {
                      const status = testStatuses[idx];
                      return (
                        <div
                          key={test.id}
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs shadow-2xs"
                        >
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 truncate">{test.name}</span>
                              <span className="text-[9px] font-mono text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">
                                {test.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{test.expectedResult}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {status === 'passed' && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Passed ({test.runTime})
                              </span>
                            )}
                            {status === 'running' && (
                              <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200 flex items-center gap-1 animate-pulse">
                                <Loader2 className="w-3 h-3 text-violet-600 animate-spin" />
                                Testing
                              </span>
                            )}
                            {status === 'queued' && (
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                Queued
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Business Behavior Verification & Audit Trail */}
                <div className="space-y-4">
                  
                  {/* Business Behavior Verification (3 Strong Comparisons) */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Business Behavior Verification
                    </h3>

                    <div className="space-y-1.5">
                      {BUSINESS_VERIFICATIONS.map((item, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs shadow-2xs">
                          <div>
                            <span className="font-bold text-slate-900 block">{item.scenario}</span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Current CPQ: {item.currentCPQ} → New ARM: {item.newARM}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            ✓ {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audit Trail Block */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Audit Trail
                    </h3>

                    <div className="bg-slate-900 text-slate-200 rounded-xl p-3 space-y-1 font-mono text-[10px] border border-slate-800 shadow-inner">
                      {AUDIT_TRAIL.map((log, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-300">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Implementation Verified & Business Outcomes */}
                  {isPhase4Completed && (
                    <div className="p-4 bg-emerald-50/90 border-2 border-emerald-300 rounded-xl space-y-3 animate-fadeIn shadow-2xs">
                      <div>
                        <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          Implementation Verified
                        </h4>
                        <p className="text-xs text-emerald-900 leading-relaxed font-medium mt-1">
                          7 / 7 components implemented · 7 / 7 business scenarios passed · 0 blocking conflicts · Human approval controls preserved · Knowledge capture enabled
                        </p>
                      </div>

                      {/* Business Outcome Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800 pt-1">
                        <div className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Quarterly Effort</span>
                          <span className="text-emerald-900 text-sm font-bold">~340 → ~88 hrs</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Net Time Saved</span>
                          <span className="text-emerald-900 text-sm font-bold">~252 hrs / qtr</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Approval Speed</span>
                          <span className="text-emerald-900 text-sm font-bold">~34% faster cycle</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-emerald-200 shadow-2xs">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Governance</span>
                          <span className="text-emerald-900 text-sm font-bold">Controls Preserved</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-emerald-950 font-semibold italic border-t border-emerald-200 pt-2">
                        RevBrain will now monitor the process and recommend improvements as behavior changes.
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => navigate('/revbrain/ongoing/command-center')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <span>Go to Ongoing Operations</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
