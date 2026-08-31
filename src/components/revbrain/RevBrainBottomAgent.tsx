// ── RevBrain Bottom Agent ─────────────────────────────────────────────
// Reusable sticky bottom agent input bar with working-mode panel.
// Contextual auto-question flow enabled on the Map page (/map).
// Includes a full-width white backdrop strip dynamically sized to match height.

import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Plus,
  Mic,
  SendHorizontal,
  ChevronUp,
  ChevronDown,
  Bot,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Edit3,
} from 'lucide-react';

/* ── Map Page Questions Data ─────────────────────────────────────── */

interface MapQuestion {
  id: string;
  question: string;
  options: string[];
}

const MAP_QUESTIONS: MapQuestion[] = [
  {
    id: 'q1',
    question: 'When does Finance need to review a discount exception?',
    options: [
      'Margin below target',
      'Strategic / non-standard deal',
      'Discount above threshold',
    ],
  },
  {
    id: 'q2',
    question: 'Should Finance review all discounts over 25%, or only margin-risk exceptions?',
    options: [
      'All discounts over 25%',
      'Only margin-risk exceptions',
      'Strategic accounts require separate review',
    ],
  },
  {
    id: 'q3',
    question: 'What evidence should the agent show before routing approval?',
    options: [
      'Similar closed-won deals',
      'Margin impact and discount history',
      'Contracted pricing and account tier',
    ],
  },
  {
    id: 'q4',
    question: 'Who owns final approval escalation?',
    options: [
      'Deal Desk owner',
      'Finance owner',
      'Sales leadership / VP approval',
    ],
  },
];

/* ── Route-based Context ──────────────────────────────────────────── */

interface RouteContext {
  stage: string;
  context: string;
  task: string;
}

function getRouteContext(pathname: string): RouteContext {
  // ── Ongoing Ops routes ──
  if (pathname.includes('/ongoing/command-center')) {
    return { stage: 'Ongoing Ops', context: 'Command Center', task: 'Monitoring live revenue operations' };
  }
  if (pathname.includes('/ongoing/user-requests')) {
    return { stage: 'Ongoing Ops', context: 'User Requests', task: 'Reviewing incoming business requests' };
  }
  if (pathname.includes('/ongoing/implementation')) {
    return { stage: 'Ongoing Ops', context: 'Implementation', task: 'Executing selected operational change' };
  }

  // ── Migration routes ──
  if (pathname.endsWith('/implementation')) {
    return { stage: 'Implementation', context: 'Implementation', task: 'Preparing generated artifacts for sandbox validation' };
  }
  if (pathname.endsWith('/design')) {
    return { stage: 'Implementation', context: 'Design', task: 'Drafting AI Agent instructions' };
  }
  if (pathname.endsWith('/map')) {
    return { stage: 'Implementation', context: 'Map', task: 'Mapping current process to future operating model' };
  }
  if (pathname.endsWith('/assess')) {
    return { stage: 'Implementation', context: 'Assess', task: 'Analyzing CPQ footprint and business coverage' };
  }
  if (pathname.includes('/si-architect')) {
    return { stage: 'Implementation', context: 'Command Center', task: 'Reviewing AI transformation opportunities' };
  }

  // ── Learning Engine route ──
  if (pathname.includes('/knowledge')) {
    return { stage: 'Learning Engine', context: 'Learning Engine', task: 'Analyzing patterns and insights across implementations' };
  }

  return { stage: 'Implementation', context: 'Implementation', task: 'Monitoring implementation workspace' };
}

/* ── Helper: Render {} terms as white background non-bold labels ──── */

function renderTextWithVariableLabels(text: string) {
  const parts = text.split(/(\{[^}]+\})/g);
  return parts.map((part, idx) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      return (
        <span
          key={idx}
          className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded bg-white text-slate-700 border border-slate-200/90 text-xs font-normal font-mono shadow-2xs leading-none"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

/* ── Typewriter Animation Component ─────────────────────────────── */

function TypewriterText({
  text,
  speed = 28,
  enabled = true,
  onComplete,
}: {
  text: string;
  speed?: number;
  enabled?: boolean;
  onComplete?: () => void;
}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!enabled) {
      setDisplayedLength(0);
      return;
    }

    if (!text) {
      setDisplayedLength(0);
      onCompleteRef.current?.();
      return;
    }

    setDisplayedLength(0);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplayedLength(i);
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 350);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, enabled]);

  const currentSubstring = text.slice(0, displayedLength);

  return (
    <span>
      {renderTextWithVariableLabels(currentSubstring)}
      {enabled && displayedLength < text.length && (
        <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-violet-600 animate-pulse align-middle rounded-xs" />
      )}
    </span>
  );
}

/* ── Component ────────────────────────────────────────────────────── */

export function RevBrainBottomAgent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { stage, context, task } = getRouteContext(pathname);

  const isAssessRoute = pathname.endsWith('/assess') || pathname.includes('/si-architect/assess');
  const isMapRoute = pathname.endsWith('/map') || pathname.includes('/si-architect/map');
  const isDesignRoute = pathname.endsWith('/design') || pathname.includes('/si-architect/design');
  const isImplementationRoute = pathname.endsWith('/implementation') || pathname.includes('/si-architect/implementation');
  const isLearningRoute = pathname.includes('/knowledge');

  const [learningScreen, setLearningScreen] = useState<number>(1);

  // Dynamic running tasks counter (starts 1-9 per page, updates +-1/2/3 every 3s)
  const [runningTasksCount, setRunningTasksCount] = useState<number>(() => Math.floor(Math.random() * 9) + 1);

  useEffect(() => {
    setRunningTasksCount(Math.floor(Math.random() * 9) + 1);
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRunningTasksCount((prevCount) => {
        const deltas = [-3, -2, -1, 1, 2, 3];
        const delta = deltas[Math.floor(Math.random() * deltas.length)];
        return Math.max(1, Math.min(15, prevCount + delta));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Learning Engine route event listener and auto-expand
  useEffect(() => {
    if (!isLearningRoute) return;

    // Auto expand agent after 1 second on Learning Engine route
    const timer = setTimeout(() => {
      setWorkingExpanded(true);
      setChatFullyOpened(true);
    }, 1000);

    const handleLearningScreenChange = (e: CustomEvent) => {
      if (e.detail?.screen) {
        setLearningScreen(e.detail.screen);
        setShowButtons(false);
        setWorkingExpanded(true);
        setChatFullyOpened(true);
      }
    };

    window.addEventListener('revbrain-learning-screen-change', handleLearningScreenChange as EventListener);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('revbrain-learning-screen-change', handleLearningScreenChange as EventListener);
    };
  }, [isLearningRoute]);

  // Assess route verification question flow state
  type AssessFlowState = 'idle' | 'waiting' | 'asking' | 'answered';
  const [assessFlowState, setAssessFlowState] = useState<AssessFlowState>('idle');
  const [assessAnswer, setAssessAnswer] = useState<string | null>(null);
  const assessVisitedRef = useRef<string | null>(null);

  // Initialize Assess scroll trigger: opens chat when scrolling towards the middle of the workflow SVG/page
  useEffect(() => {
    if (!isAssessRoute) {
      assessVisitedRef.current = null;
      setAssessFlowState('idle');
      return;
    }

    if (assessVisitedRef.current !== pathname) {
      assessVisitedRef.current = pathname;
      setAssessFlowState('waiting');

      const handleScroll = () => {
        const mainEl = document.querySelector('main');
        const scrollTop = mainEl ? mainEl.scrollTop : (window.scrollY || document.documentElement.scrollTop);

        if (scrollTop > 280) {
          setAssessFlowState('asking');
          setWorkingExpanded(true);
          if (mainEl) mainEl.removeEventListener('scroll', handleScroll);
          window.removeEventListener('scroll', handleScroll, { capture: true });
        }
      };

      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.addEventListener('scroll', handleScroll, { passive: true });
      }
      window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

      return () => {
        if (mainEl) mainEl.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleScroll, { capture: true });
      };
    }
  }, [pathname, isAssessRoute]);

  const handleAssessAnswer = (chosenValue: string) => {
    setAssessAnswer(chosenValue);
    const toastText = chosenValue === 'Sent to client' ? 'Question sent to client' : 'Saved to RevBrain context';
    setToastMessage(toastText);
    setAssessFlowState('answered');

    setShowOtherInput(false);
    setOtherInputText('');

    setTimeout(() => {
      setToastMessage(null);
      setWorkingExpanded(false);
    }, 1800);
  };

  // Implementation route 4-Phase demo state
  type ImplPhase = 'phase1' | 'phase2' | 'phase3' | 'phase4';
  const [implPhase, setImplPhase] = useState<ImplPhase>('phase1');
  const [implReviewSubPhase, setImplReviewSubPhase] = useState<'overview' | 'walkthrough' | 'completed'>('overview');
  const [implReviewStepIndex, setImplReviewStepIndex] = useState<number>(0);
  const [isImplReviewCompleted, setIsImplReviewCompleted] = useState<boolean>(false);
  const [implBuildStepIndex, setImplBuildStepIndex] = useState<number>(0);
  const [isPhase4Completed, setIsPhase4Completed] = useState<boolean>(false);
  const [showImplMakeUpdates, setShowImplMakeUpdates] = useState<boolean>(false);

  useEffect(() => {
    const handleImplPhaseChange = (
      e: CustomEvent<{
        phase: ImplPhase;
        reviewSubPhase?: 'overview' | 'walkthrough' | 'completed';
        reviewStepIndex: number;
        isReviewCompleted: boolean;
        buildStepIndex: number;
        isPhase4Completed: boolean;
      }>
    ) => {
      setImplPhase(e.detail.phase);
      if (e.detail.reviewSubPhase) {
        setImplReviewSubPhase(e.detail.reviewSubPhase);
      }
      setImplReviewStepIndex(e.detail.reviewStepIndex);
      setIsImplReviewCompleted(e.detail.isReviewCompleted);
      setImplBuildStepIndex(e.detail.buildStepIndex);
      setIsPhase4Completed(e.detail.isPhase4Completed);

      // Auto-expand on Phase 2 completion (after 7 steps reviewed)
      if (e.detail.phase === 'phase2' && e.detail.isReviewCompleted) {
        setWorkingExpanded(true);
      }

      // Auto-expand on Phase 4 completion (after 7 tests passed)
      if (e.detail.phase === 'phase4' && e.detail.isPhase4Completed) {
        setWorkingExpanded(true);
      }
    };

    window.addEventListener('revbrain-impl-phase-change', handleImplPhaseChange as EventListener);
    return () => window.removeEventListener('revbrain-impl-phase-change', handleImplPhaseChange as EventListener);
  }, []);

  // Chat input state (start in closed mode by default)
  const [inputValue, setInputValue] = useState('');
  const [workingExpanded, setWorkingExpanded] = useState(false);
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  // Track when chat is fully opened (after 450ms expand animation completes)
  const [chatFullyOpened, setChatFullyOpened] = useState(false);

  useEffect(() => {
    if (workingExpanded) {
      const timer = setTimeout(() => {
        setChatFullyOpened(true);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setChatFullyOpened(false);
    }
  }, [workingExpanded]);

  // Track when typewriter finishes so action buttons appear
  const [showButtons, setShowButtons] = useState(false);

  // Implementation page entry: start closed, then auto-expand after 1 second
  useEffect(() => {
    if (isImplementationRoute) {
      setWorkingExpanded(false);
      const timer = setTimeout(() => {
        setWorkingExpanded(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname, isImplementationRoute]);

  // Map route interactive flow state
  type MapFlowState = 'idle' | 'thinking' | 'question_flow' | 'completed';
  const [mapFlowState, setMapFlowState] = useState<MapFlowState>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherInputText, setOtherInputText] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Design route guided setup state
  // 8 Cards guided setup configuration for Design route
  const DESIGN_CARDS_GUIDE = [
    {
      headerBadge: '1 of 8 · Agent Overview',
      context: 'I built this agent around the approval path supporting {$14.2M ARR}. Human approval stays in control.',
      question: 'Anything I should change before I define its logic?',
      options: ['Keep as designed', 'Change goal', 'Change approval control'],
    },
    {
      headerBadge: '2 of 8 · Objective',
      context: 'I preserved the current {approval boundaries} and added the {client policy context} Salesforce does not encode directly.',
      question: 'One gap: should {customer lifetime value} influence the recommendation?',
      options: ['Yes, include it', 'No', 'Ask Finance'],
    },
    {
      headerBadge: '3 of 8 · Analyze',
      context: 'I found {147 comparable approvals}. When history conflicts with {CFO margin policy}, I recommend policy wins.',
      question: 'Use deal history as supporting evidence only?',
      options: ['Evidence only', 'Influence recommendation', 'Do not use', 'Ask Finance'],
    },
    {
      headerBadge: '4 of 8 · Decide',
      context: 'I inferred {Strategic Exception} from {historical approvals} and {account behavior} — it is not explicitly encoded in the current Salesforce rules.',
      question: 'Keep it as a separate decision path?',
      options: ['Keep separate', 'Merge with Margin Risk', 'Ask Deal Desk'],
    },
    {
      headerBadge: '5 of 8 · Act',
      context: 'I preserved the {human approval boundaries} but removed the manual routing and follow-up.',
      question: 'Should Finance receive every margin-risk case or only high-severity cases?',
      options: ['Every margin-risk case', 'High severity only', 'Ask Finance'],
    },
    {
      headerBadge: '6 of 8 · Actions & Handoffs',
      context: 'This is the initial setup. RevBrain will learn from each approval and suggest changes when performance patterns shift.',
      question: 'Which outcome should I optimize first?',
      options: ['Approval speed', 'Margin protection', 'Both'],
    },
    {
      headerBadge: '7 of 8 · Subagents',
      context: 'Similar deals are useful evidence, but I would not let historical behavior override {client policy}.',
      question: 'How much weight should prior deals have?',
      options: ['Evidence only', 'Influence score', 'Do not use'],
    },
    {
      headerBadge: '8 of 8 · Test Scenarios',
      context: 'I found one observed workflow pattern not covered by the original setup: quotes can be repriced after approval.',
      question: 'Add it as a regression test?',
      options: ['Add test', 'Not needed', 'Ask client'],
    },
  ];

  const [designCardIndex, setDesignCardIndex] = useState(0);
  const designRouteVisitedRef = useRef<string | null>(null);

  // Reset showButtons whenever question or route context changes
  useEffect(() => {
    setShowButtons(false);
  }, [pathname, currentQuestionIndex, designCardIndex, assessFlowState, implPhase, implReviewStepIndex]);

  // Sync designCardIndex with DesignFutureStatePage cardIndex navigation
  useEffect(() => {
    const handleIndexChanged = (e: CustomEvent<{ index: number }>) => {
      setDesignCardIndex(e.detail.index);
      setWorkingExpanded(true);
    };

    window.addEventListener('design-card-index-changed', handleIndexChanged as EventListener);
    return () => window.removeEventListener('design-card-index-changed', handleIndexChanged as EventListener);
  }, []);

  // Design route: open chat 2 seconds after page loading
  useEffect(() => {
    if (!isDesignRoute) {
      designRouteVisitedRef.current = null;
      return;
    }

    if (designRouteVisitedRef.current !== pathname) {
      designRouteVisitedRef.current = pathname;

      const timer = setTimeout(() => {
        setWorkingExpanded(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pathname, isDesignRoute]);

  const advanceDesignCard = (answerText: string) => {
    window.dispatchEvent(new CustomEvent('design-card-answer', {
      detail: {
        cardIndex: designCardIndex,
        answer: answerText
      }
    }));

    setToastMessage(answerText === 'Sent to client' ? 'Question sent to client' : 'Saved to Learning Engine');
    setTimeout(() => setToastMessage(null), 1800);

    setShowOtherInput(false);
    setOtherInputText('');

    if (designCardIndex < 8) {
      setDesignCardIndex(prev => prev + 1);
    }
  };

  // Track map route entry to prevent looping on every render
  const mapRouteVisitedRef = useRef<string | null>(null);

  // Map route: open chat 5 seconds after page loading
  useEffect(() => {
    if (!isMapRoute) {
      mapRouteVisitedRef.current = null;
      setMapFlowState('idle');
      return;
    }

    if (mapRouteVisitedRef.current !== pathname) {
      mapRouteVisitedRef.current = pathname;
      setMapFlowState('thinking');
      setCurrentQuestionIndex(0);
      setShowOtherInput(false);
      setOtherInputText('');
      setAnswers({});

      const timer = setTimeout(() => {
        setMapFlowState('question_flow');
        setWorkingExpanded(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [pathname, isMapRoute]);

  // Handle advancing through question flow
  const advanceQuestion = (chosenValue: string, toastText: string) => {
    const currentQ = MAP_QUESTIONS[currentQuestionIndex];
    if (currentQ) {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: chosenValue }));
    }

    setToastMessage(toastText);
    setTimeout(() => setToastMessage(null), 1800);

    setShowOtherInput(false);
    setOtherInputText('');

    if (currentQuestionIndex + 1 < MAP_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setMapFlowState('completed');
    }
  };

  // Chat input handlers
  const hasInput = inputValue.trim().length > 0;

  function handleSend() {
    if (!hasInput) return;
    setSentMessages((prev) => [...prev, inputValue.trim()]);
    setInputValue('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const agentRef = useRef<HTMLDivElement>(null);

  // Keep --agent-strip-height in sync with actual component size
  useEffect(() => {
    const el = agentRef.current;
    if (!el) return;
    function update() {
      const h = el!.getBoundingClientRect().height + 12; // +12 for pb-3
      document.documentElement.style.setProperty('--agent-strip-height', `${h}px`);
    }
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [workingExpanded, isMapRoute, mapFlowState, currentQuestionIndex, showOtherInput, isDesignRoute, designCardIndex]);

  const currentQ = MAP_QUESTIONS[currentQuestionIndex];

  return (
    <>
      {/* ─── Centered agent component ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center pb-3 px-6">
        <div
          className="w-full max-w-[800px] pointer-events-auto bg-[#eaedf1] rounded-2xl border border-slate-300/80 shadow-[0_4px_24px_rgba(0,0,0,0.10)] p-2"
          ref={agentRef}
        >

          {/* ─── Working Mode Panel / Question Card ─── */}
          <div className="bg-white border border-slate-200 border-b-0 rounded-t-xl overflow-hidden shadow-sm">
            
            {/* Header bar / Toggle Button */}
            <button
              onClick={() => setWorkingExpanded(!workingExpanded)}
              className="w-full px-4 py-2 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/60 transition-colors border-b border-slate-100 rounded-t-xl"
            >
              <div className="flex items-center gap-2">
                {isAssessRoute && (assessFlowState === 'asking' || assessFlowState === 'answered') ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold tracking-wide">
                    1 of 1 · Workflow Gap Verification
                  </span>
                ) : isMapRoute && mapFlowState === 'question_flow' ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold tracking-wide">
                    {currentQuestionIndex + 1} of {MAP_QUESTIONS.length} · Map Validation
                  </span>
                ) : isMapRoute && mapFlowState === 'completed' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800 text-xs">
                      Validation context captured
                    </span>
                  </>
                ) : isDesignRoute ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold tracking-wide">
                    {designCardIndex < 8
                      ? DESIGN_CARDS_GUIDE[designCardIndex]?.headerBadge
                      : 'Agent Setup Complete'}
                  </span>
                ) : isImplementationRoute ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold tracking-wide">
                    {implPhase === 'phase1' && '1 of 7 · Implementation Review'}
                    {implPhase === 'phase2' && `Reviewing Component ${implReviewStepIndex + 1} of 7`}
                    {implPhase === 'phase3' && `Live Implementation · Step ${implBuildStepIndex + 1} of 7`}
                    {implPhase === 'phase4' && (isPhase4Completed ? 'Implementation Verified' : 'Validation & Testing')}
                  </span>
                ) : (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-violet-500 animate-spin shrink-0" />
                    <span className="font-semibold text-slate-700 text-xs">
                      {runningTasksCount} {runningTasksCount === 1 ? 'task' : 'tasks'} running
                    </span>
                  </>
                )}

                {/* Pop-up Toast Notification in green for a few seconds when user answers */}
                {toastMessage && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1.5 animate-fadeIn ml-2 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{toastMessage}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {workingExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
            </button>

            {/* Expanded Content View with smooth 500ms grid transition */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                workingExpanded
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0 pointer-events-none'
              }`}
            >
              <div className="overflow-hidden">
                {/* 0. Assess Route Verification Question Flow State */}
                {isAssessRoute && assessFlowState === 'asking' && (
                  <div className="p-4 bg-gradient-to-b from-violet-50/40 via-white to-white space-y-3">
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                      
                      {/* Main Question */}
                      <div className="space-y-1">
                        <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[36px]">
                          <TypewriterText
                            text="I couldn’t find automation moving Bid opportunities from {Planning} → {Out to Bid}. How does this happen today?"
                            speed={28}
                            enabled={chatFullyOpened}
                            onComplete={() => setShowButtons(true)}
                          />
                        </p>
                      </div>

                      {/* Ready-made Answer Chips + Send to client + Other on SAME row */}
                      {showButtons && (
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {[
                            'Sales rep changes the stage manually',
                            'Bid team updates it after the bid is ready',
                            'It happens outside Salesforce',
                          ].map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleAssessAnswer(opt)}
                              style={{ animationDelay: `${i * 180}ms` }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all text-center shadow-2xs active:scale-[0.99] flex items-center justify-center shrink-0"
                            >
                              {opt}
                            </button>
                          ))}

                          <button
                            onClick={() => handleAssessAnswer('Sent to client')}
                            style={{ animationDelay: `540ms` }}
                            className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all text-center shadow-2xs active:scale-[0.99] flex items-center justify-center shrink-0"
                          >
                            <span>Send to client</span>
                          </button>

                          <button
                            onClick={() => setShowOtherInput(!showOtherInput)}
                            style={{ animationDelay: `720ms` }}
                            className="animate-button-stagger text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors ml-auto"
                          >
                            {showOtherInput ? 'Cancel custom answer' : 'Other...'}
                          </button>
                        </div>
                      )}

                      {/* Free-text input field when Other is selected */}
                      {showOtherInput && (
                        <div className="pt-2 animate-fadeIn flex items-center gap-2 border-t border-slate-100">
                          <input
                            type="text"
                            value={otherInputText}
                            onChange={(e) => setOtherInputText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAssessAnswer(otherInputText.trim() || 'Custom response');
                              }
                            }}
                            placeholder="Type custom answer for this transition..."
                            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white"
                            autoFocus
                          />
                          <button
                            onClick={() => handleAssessAnswer(otherInputText.trim() || 'Custom response')}
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shrink-0"
                          >
                            Save &amp; Continue
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 1. Map Route Thinking State */}
                {isMapRoute && mapFlowState === 'thinking' && (
                  <div
                    onClick={() => setMapFlowState('question_flow')}
                    className="p-4 bg-slate-50/50 cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <div className="flex items-center gap-3 px-3.5 py-3 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
                      <div className="w-2 h-2 rounded-full bg-violet-600 animate-ping shrink-0" />
                      <span className="text-xs font-medium text-slate-700">
                        Analyzing CPQ footprint &amp; validation requirements for future ARM model…
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Map Route Question Flow State */}
                {isMapRoute && mapFlowState === 'question_flow' && currentQ && (
                  <div className="p-4 bg-gradient-to-b from-violet-50/40 via-white to-white space-y-3">
                    
                    {/* Question Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                      <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                        <TypewriterText
                          key={currentQ.id}
                          text={currentQ.question}
                          speed={28}
                          enabled={chatFullyOpened}
                          onComplete={() => setShowButtons(true)}
                        />
                      </p>

                      {/* Ready-made Answer Chips + Send to client + Other on SAME row */}
                      {showButtons && (
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {currentQ.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => advanceQuestion(opt, 'Saved to Learning Engine')}
                              style={{ animationDelay: `${i * 180}ms` }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all text-center shadow-2xs active:scale-[0.99] flex items-center justify-center shrink-0"
                            >
                              {opt}
                            </button>
                          ))}

                          <button
                            onClick={() => advanceQuestion('Sent to client', 'Question sent to client')}
                            style={{ animationDelay: `${currentQ.options.length * 180}ms` }}
                            className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all text-center shadow-2xs active:scale-[0.99] flex items-center justify-center shrink-0"
                          >
                            <span>Send to client</span>
                          </button>

                          <button
                            onClick={() => setShowOtherInput(!showOtherInput)}
                            style={{ animationDelay: `${(currentQ.options.length + 1) * 180}ms` }}
                            className="animate-button-stagger text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors ml-auto"
                          >
                            {showOtherInput ? 'Cancel custom answer' : 'Other...'}
                          </button>
                        </div>
                      )}

                      {/* Free-text input field when Other is selected */}
                      {showOtherInput && (
                        <div className="pt-2 animate-fadeIn flex items-center gap-2 border-t border-slate-100">
                          <input
                            type="text"
                            value={otherInputText}
                            onChange={(e) => setOtherInputText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                advanceQuestion(otherInputText.trim() || 'Custom response', 'Saved to Learning Engine');
                              }
                            }}
                            placeholder="Type custom answer for this question..."
                            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white"
                            autoFocus
                          />
                          <button
                            onClick={() => advanceQuestion(otherInputText.trim() || 'Custom response', 'Saved to Learning Engine')}
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shrink-0"
                          >
                            Save &amp; Continue
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Design Route Guided Setup Flow State */}
                {isDesignRoute && (
                  <div className="p-4 bg-gradient-to-b from-violet-50/40 via-white to-white space-y-3">
                    
                    {/* Guided Card Question for Cards 0 to 7 */}
                    {designCardIndex < 8 && (() => {
                      const cardInfo = DESIGN_CARDS_GUIDE[designCardIndex];
                      if (!cardInfo) return null;

                      const hasInternalAskOption = cardInfo.options.some(
                        (opt) => opt === 'Ask Finance' || opt === 'Ask Deal Desk' || opt.startsWith('Ask ')
                      );

                      return (
                        <div key={designCardIndex} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                          
                          {/* Continuous bold text paragraph with typewriter */}
                          <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                            <TypewriterText
                              key={`card-${designCardIndex}`}
                              text={`${cardInfo.context} ${cardInfo.question}`}
                              speed={28}
                              enabled={chatFullyOpened}
                              onComplete={() => setShowButtons(true)}
                            />
                          </p>

                          {/* Answer Chips + Send to client + Other on SAME row */}
                          {showButtons && (
                            <div className="flex flex-wrap items-center gap-2 pt-0.5">
                              {cardInfo.options.map((opt, i) => (
                                <button
                                  key={i}
                                  onClick={() => advanceDesignCard(opt)}
                                  style={{ animationDelay: `${i * 180}ms` }}
                                  className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all text-center shadow-2xs active:scale-[0.99] flex items-center justify-center shrink-0"
                                >
                                  {opt}
                                </button>
                              ))}

                              {!hasInternalAskOption && (
                                <button
                                  onClick={() => advanceDesignCard('Sent to client')}
                                  style={{ animationDelay: `${cardInfo.options.length * 180}ms` }}
                                  className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all text-center shadow-2xs active:scale-[0.99] flex items-center justify-center shrink-0"
                                >
                                  <span>Send to client</span>
                                </button>
                              )}

                              <button
                                onClick={() => setShowOtherInput(!showOtherInput)}
                                style={{ animationDelay: `${(cardInfo.options.length + (hasInternalAskOption ? 0 : 1)) * 180}ms` }}
                                className="animate-button-stagger text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors ml-auto"
                              >
                                {showOtherInput ? 'Cancel custom answer' : 'Other...'}
                              </button>
                            </div>
                          )}

                          {/* Free-text input field when Other is selected */}
                          {showOtherInput && (
                            <div className="pt-2 animate-fadeIn flex items-center gap-2 border-t border-slate-100">
                              <input
                                type="text"
                                value={otherInputText}
                                onChange={(e) => setOtherInputText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    advanceDesignCard(otherInputText.trim() || 'Custom response');
                                  }
                                }}
                                placeholder="Type custom answer for this setup decision..."
                                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:bg-white"
                                autoFocus
                              />
                              <button
                                onClick={() => advanceDesignCard(otherInputText.trim() || 'Custom response')}
                                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shrink-0"
                              >
                                Save &amp; Continue
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Completion State for Card 8 */}
                    {designCardIndex === 8 && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <div className="space-y-1">
                          <p className="text-[14px] font-bold text-slate-900 leading-relaxed">
                            <TypewriterText
                              text="Setup complete. I captured the client rules, historical behavior, human boundaries, and test coverage needed to implement this agent."
                              speed={12}
                            />
                          </p>
                          <p className="text-xs text-slate-500 font-medium">
                            Expected impact: ~172 hrs/qtr saved · ~34% faster approvals
                          </p>
                        </div>

                        <div className="pt-0.5">
                          <button
                            onClick={() => navigate('/revbrain/migration/si-architect/implementation')}
                            className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all active:scale-[0.99] flex items-center justify-center gap-1.5 shrink-0"
                          >
                            <span>Proceed to Implementation</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* 5. Implementation Route 4-Phase Flow State */}
                {isImplementationRoute && (
                  <div className="p-4 bg-gradient-to-b from-violet-50/40 via-white to-white space-y-3">
                    
                    {/* PHASE 1: Implementation Blueprint Overview */}
                    {implPhase === 'phase1' && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                          <TypewriterText
                            key="phase1-blueprint"
                            text="I mapped the approved process into 7 implementation components. No blocking conflicts found. Ready for me to build it?"
                            speed={12}
                            enabled={chatFullyOpened}
                            onComplete={() => setShowButtons(true)}
                          />
                        </p>

                        {showButtons && (
                          <div className="flex flex-wrap items-center gap-2 pt-0.5">
                            <button
                              onClick={() => {
                                window.dispatchEvent(new Event('revbrain-start-live-impl'));
                                setWorkingExpanded(false);
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-[0.99]"
                            >
                              <span>Confirm &amp; Implement</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setShowImplMakeUpdates(!showImplMakeUpdates)}
                              style={{ animationDelay: '120ms' }}
                              className="animate-button-stagger px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all shrink-0 cursor-pointer"
                            >
                              <span>Make updates</span>
                            </button>

                            <button
                              onClick={() => {
                                window.dispatchEvent(new Event('revbrain-open-details-popover'));
                              }}
                              style={{ animationDelay: '180ms' }}
                              className="animate-button-stagger px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors shrink-0 cursor-pointer"
                            >
                              <span>Review details</span>
                            </button>
                          </div>
                        )}

                        {showImplMakeUpdates && (
                          <div className="pt-2 animate-fadeIn flex items-center gap-2 border-t border-slate-100">
                            <input
                              type="text"
                              placeholder="Tell me what you want to change..."
                              className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 outline-none focus:border-violet-400 focus:bg-white"
                              autoFocus
                            />
                            <button
                              onClick={() => {
                                setShowImplMakeUpdates(false);
                                setToastMessage('Updates saved');
                                setTimeout(() => setToastMessage(null), 1800);
                              }}
                              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shrink-0 cursor-pointer"
                            >
                              Save changes
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* PHASE 3: Continuous Live Implementation */}
                    {implPhase === 'phase3' && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-bold text-violet-700">
                            <Loader2 className="w-3.5 h-3.5 text-violet-600 animate-spin shrink-0" />
                            <span>
                              {implBuildStepIndex === 0 && 'Connecting Slack quote entry'}
                              {implBuildStepIndex === 1 && 'Building pricing foundation'}
                              {implBuildStepIndex === 2 && 'Building approval Flow'}
                              {implBuildStepIndex === 3 && 'Connecting Discount Exception Agent'}
                              {implBuildStepIndex === 4 && 'Configuring manager approval'}
                              {implBuildStepIndex === 5 && 'Configuring Finance exception path'}
                              {implBuildStepIndex === 6 && 'Connecting Knowledge Engine'}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 font-semibold">
                            Building Step {implBuildStepIndex + 1} of 7
                          </span>
                        </div>
                      </div>
                    )}

                    {/* PHASE 4: Validation & Audit Complete */}
                    {implPhase === 'phase4' && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <div className="space-y-1">
                          <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                            <TypewriterText
                              key="phase4-complete"
                              text="Implementation verified. The new process matches the approved business behavior across all 7 scenarios."
                              speed={18}
                              enabled={chatFullyOpened}
                              onComplete={() => setShowButtons(true)}
                            />
                          </p>
                        </div>

                        {showButtons && (
                          <div className="pt-1 flex items-center gap-2">
                            <button
                              onClick={() => navigate('/revbrain/migration/si-architect/ongoing-ops')}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all active:scale-[0.99] flex items-center gap-1.5 shrink-0"
                            >
                              <span>Go to Ongoing Operations</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setWorkingExpanded(false)}
                              style={{ animationDelay: '180ms' }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all shrink-0"
                            >
                              <span>Review report</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

                {/* 5. Learning Engine Route Guided Tour */}
                {isLearningRoute && (
                  <div className="p-4 bg-gradient-to-b from-violet-50/40 via-white to-white space-y-3">
                    {learningScreen === 1 && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-200/60">
                            1 of 6 · Client Learning Corpus
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-semibold">
                            47 implementations
                          </span>
                        </div>
                        <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                          <TypewriterText
                            key="screen-1"
                            text="Across 47 implementations, recurring revenue workflows are increasingly collapsing into reusable components. Complex Enterprise Sales has the deepest coverage; Usage-Based still has the largest learning gaps."
                            speed={24}
                            enabled={chatFullyOpened}
                            onComplete={() => setShowButtons(true)}
                          />
                        </p>
                        {showButtons && (
                          <div className="pt-0.5 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('revbrain-learning-navigate', { detail: { screen: 2 } }));
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                            >
                              <span>Show highest-leverage pattern</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {learningScreen === 2 && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-200/60">
                            2 of 6 · Pattern Decomposition
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            87% Reusable
                          </span>
                        </div>
                        <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                          <TypewriterText
                            key="screen-2"
                            text="Across 31 implementations, 87% of approval behavior collapses into reusable logic. The remaining 13% is mostly policy, thresholds, and org structure. The system architecture repeats more than the business parameters."
                            speed={24}
                            enabled={chatFullyOpened}
                            onComplete={() => setShowButtons(true)}
                          />
                        </p>
                        {showButtons && (
                          <div className="pt-0.5 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('revbrain-learning-navigate', { detail: { screen: 3 } }));
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                            >
                              <span>Show what can be productized</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {learningScreen === 3 && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-200/60">
                            3 of 6 · Component Factory
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-semibold">
                            Approval Routing Core v3
                          </span>
                        </div>
                        <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                          <TypewriterText
                            key="screen-3"
                            text="The architecture is reusable across multiple operating models; client policy stays configurable. This pattern is now validated across 143 business scenarios."
                            speed={24}
                            enabled={chatFullyOpened}
                            onComplete={() => setShowButtons(true)}
                          />
                        </p>
                        {showButtons && (
                          <div className="pt-0.5 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('revbrain-learning-navigate', { detail: { screen: 4 } }));
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                            >
                              <span>See readiness</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {learningScreen === 4 && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-200/60">
                            4 of 6 · Q2C Operating Model Readiness
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Complex Enterprise 86% Ready
                          </span>
                        </div>
                        <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                          <TypewriterText
                            key="screen-4"
                            text="Complex Enterprise Sales is strongest in approval, pricing, and contracted terms. Renewals still require more client-specific work."
                            speed={24}
                            enabled={chatFullyOpened}
                            onComplete={() => setShowButtons(true)}
                          />
                        </p>
                        {showButtons && (
                          <div className="pt-0.5 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('revbrain-learning-navigate', { detail: { screen: 5 } }));
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                            >
                              <span>Simulate next client</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {learningScreen === 5 && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-200/60">
                            5 of 6 · Next Client Simulation
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            86% Foundation Available
                          </span>
                        </div>
                        <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                          <TypewriterText
                            key="screen-5"
                            text="I can reuse the architecture. I only need the three business policies that make this customer unique. 8 components are already available. Only 3 client decisions remain."
                            speed={24}
                            enabled={chatFullyOpened}
                            onComplete={() => setShowButtons(true)}
                          />
                        </p>
                        {showButtons && (
                          <div className="pt-0.5 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('revbrain-learning-toggle-questions'));
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all shrink-0 cursor-pointer"
                            >
                              <span>Show the 3 questions</span>
                            </button>

                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('revbrain-learning-navigate', { detail: { screen: 6 } }));
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                            >
                              <span>Show compounding impact</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {learningScreen === 6 && (
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-200/60">
                            6 of 6 · Compounding Advantage
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            96% Mapping Confidence
                          </span>
                        </div>
                        <p className="text-[14px] font-bold text-slate-900 leading-relaxed min-h-[30px]">
                          <TypewriterText
                            key="screen-6"
                            text="We are not learning customer data. We are learning how these revenue operating models are implemented. The next implementation starts further ahead than the last one."
                            speed={24}
                            enabled={chatFullyOpened}
                            onComplete={() => setShowButtons(true)}
                          />
                        </p>
                        {showButtons && (
                          <div className="pt-0.5 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('revbrain-learning-open-library'));
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                            >
                              <span>Explore components</span>
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('revbrain-learning-navigate', { detail: { screen: 4 } }));
                              }}
                              className="animate-button-stagger px-3.5 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-200 hover:border-violet-300 rounded-lg transition-all shrink-0 cursor-pointer"
                            >
                              <span>Simulate another model</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 6. Default task display for non-interactive state */}
                {(!isMapRoute || mapFlowState === 'idle') && !isDesignRoute && !isImplementationRoute && !isLearningRoute && (!isAssessRoute || assessFlowState === 'idle' || assessFlowState === 'waiting') && (
                  <div className="px-4 pb-2.5 pt-2">
                    <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shrink-0" />
                      <span className="text-[11px] text-slate-600 leading-snug">{task}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Main Input Bar ─── */}
          <div className="relative bg-white border border-slate-200 rounded-b-xl shadow-lg px-3 py-2.5">
            {/* Sent messages preview */}
            {sentMessages.length > 0 && (
              <div className="flex items-start gap-2 mb-2 px-1">
                <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3 h-3 text-violet-600" />
                </div>
                <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5">
                  Noted. I'll incorporate that into the current {context.toLowerCase()} workspace.
                </div>
              </div>
            )}

            {/* Input row */}
            <div className="flex items-center gap-2">
              {/* Plus icon */}
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shrink-0">
                <Plus className="w-4 h-4" />
              </button>

              {/* Text input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything, @ to mention, / for actions"
                  className="w-full text-sm text-slate-800 placeholder:text-slate-400 bg-transparent outline-none py-1.5"
                />
              </div>
            </div>

            {/* Agent label row */}
            <div className="flex items-center gap-2 mt-1.5 px-1">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-violet-600 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">R</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-600">RevBrain Agent</span>
              </div>
              <span className="text-slate-300">·</span>
              <span className="text-[10px] text-slate-400 font-medium">{stage} · {context}</span>
            </div>

            {/* Mic or Send — absolute bottom-right */}
            <div className="absolute right-3 bottom-3">
              {hasInput ? (
                <button
                  onClick={handleSend}
                  className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white hover:bg-violet-700 transition-colors shrink-0"
                >
                  <SendHorizontal className="w-4 h-4" />
                </button>
              ) : (
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shrink-0">
                  <Mic className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
