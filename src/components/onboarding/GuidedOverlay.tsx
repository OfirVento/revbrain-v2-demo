import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

import { Zap, BarChart2, Users, GitBranch, Code, Wrench, ArrowRight, Check, X } from 'lucide-react';

// ── §4.3 Guided overlay — shown on first load ─────────────────────
// Steps: Connect org → Run assessment → Pick view → Review concerns →
//        Ask agent → Export / Draft
//
// State persisted in localStorage so returning users skip it.
// Can be re-triggered via a "Take the tour" button in TopBar.

const STORAGE_KEY = 'vento_onboarding_v1';

const AUDIENCE_CARDS = [
  {
    key: 'executive',
    route: '/assessment/executive',
    icon: BarChart2,
    label: 'Executive',
    desc: 'Verdict, ARM upside, top concerns',
    color: 'from-indigo-600 to-violet-600',
  },
  {
    key: 'sales',
    route: '/assessment/sales',
    icon: Users,
    label: 'Sales',
    desc: 'LOE, complexity, delivery risks',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    key: 'salesforce',
    route: '/assessment/salesforce',
    icon: GitBranch,
    label: 'Salesforce',
    desc: 'Readiness, expansion signals, co-sell',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    key: 'migration',
    route: '/assessment/migration',
    icon: Code,
    label: 'Migration',
    desc: 'Code inventory, ARM draft generation',
    color: 'from-orange-600 to-amber-600',
  },
  {
    key: 'implementation',
    route: '/assessment/implementation',
    icon: Wrench,
    label: 'Implementation',
    desc: 'Technical findings, severity, actions',
    color: 'from-rose-600 to-pink-600',
  },
] as const;

type AudienceKey = (typeof AUDIENCE_CARDS)[number]['key'];

// Progress steps for step 2 (run assessment)
const PROGRESS_STEPS = [
  'Reading CPQ metadata…',
  'Analysing pricing logic…',
  'Scoring complexity…',
  'Generating AI insights…',
  'Assessment complete',
];

interface Props {
  onComplete: () => void;
}

export function GuidedOverlay({ onComplete }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0–5

  const [progressStep, setProgressStep] = useState(0);
  const [progressPct, setProgressPct] = useState(0);
  const [selectedAudience, setSelectedAudience] = useState<AudienceKey | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  // Step 1: auto-progress after Connect click
  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => { setConnected(true); }, 1200);
    setTimeout(() => { setStep(1); }, 2200);
  };

  // Step 2: run animated progress bar then advance
  useEffect(() => {
    if (step !== 1) return;
    setProgressStep(0);
    setProgressPct(0);

    const duration = 3500;
    const interval = 60;
    const steps = duration / interval;
    let i = 0;

    const timer = setInterval(() => {
      i++;
      const pct = Math.min(100, Math.round((i / steps) * 100));
      setProgressPct(pct);

      const progressIdx = Math.floor((pct / 100) * (PROGRESS_STEPS.length - 1));
      setProgressStep(progressIdx);

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => setStep(2), 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [step]);

  // Step 3: audience selected → advance
  const handleAudienceSelect = (key: AudienceKey) => {
    setSelectedAudience(key);
    setTimeout(() => setStep(3), 300);
  };

  const handleDone = () => {
    const card = AUDIENCE_CARDS.find((c) => c.key === selectedAudience);
    onComplete(); // close overlay first — no reload
    navigate(card ? card.route : '/assessment/executive');
  };


  const TOTAL_STEPS = 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[hsl(220,20%,8%)]/90 backdrop-blur-md" />

      {/* Card */}
      <div className="relative w-full max-w-xl mx-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Close */}
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step content */}
        <div className="p-8 min-h-[380px] flex flex-col">
          {/* Step 0: Connect org */}
          {step === 0 && (
            <div className="flex flex-col items-center text-center flex-1 justify-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-5">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">Connect your Salesforce org</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8 max-w-sm leading-relaxed">
                RevBrain reads your CPQ metadata to generate a full complexity assessment.
                Read-only — no changes made to your org.
              </p>
              <button
                id="onboarding-connect-btn"
                onClick={handleConnect}
                disabled={connecting}
                className={clsx(
                  'px-6 py-3 rounded-xl font-semibold text-sm transition-all',
                  connected
                    ? 'bg-green-600 text-white'
                    : connecting
                    ? 'bg-indigo-800 text-indigo-300 cursor-wait'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-[1.02] active:scale-[0.98]'
                )}
              >
                {connected
                  ? <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Connected</span>
                  : connecting
                  ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" /> Connecting…</span>
                  : 'Connect Salesforce Org'}
              </button>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4">Demo mode — auto-connects with sample data</p>
            </div>
          )}

          {/* Step 1: Run assessment */}
          {step === 1 && (
            <div className="flex flex-col items-center text-center flex-1 justify-center">
              <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mb-5">
                <BarChart2 className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">Running assessment</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">
                {PROGRESS_STEPS[progressStep]}
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-xs mb-4">
                <div className="flex justify-between text-[10px] text-[hsl(var(--muted-foreground))] mb-1.5">
                  <span>Progress</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-100"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Step dots */}
              <div className="flex gap-3 mt-2">
                {PROGRESS_STEPS.slice(0, -1).map((s, i) => (
                  <div key={i} className={clsx(
                    'w-2 h-2 rounded-full transition-colors',
                    i <= progressStep ? 'bg-indigo-500' : 'bg-[hsl(var(--border))]'
                  )} title={s} />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Pick your view */}
          {step === 2 && (
            <div className="flex flex-col flex-1">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-1">Pick your view</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Each layer is tailored for a different audience.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 flex-1">
                {AUDIENCE_CARDS.map((card) => {
                  const Icon = card.icon;
                  const isSelected = selectedAudience === card.key;
                  return (
                    <button
                      key={card.key}
                      id={`onboarding-audience-${card.key}`}
                      onClick={() => handleAudienceSelect(card.key)}
                      className={clsx(
                        'flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all',
                        isSelected
                          ? 'border-indigo-500 bg-indigo-600/10'
                          : 'border-[hsl(var(--border))] hover:border-[hsl(var(--accent))]/40 hover:bg-[hsl(var(--muted))]/50'
                      )}
                    >
                      <div className={clsx('w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0', card.color)}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{card.label}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{card.desc}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-500 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Review concerns */}
          {step === 3 && (
            <div className="flex flex-col flex-1 justify-center">
              <h2 className="text-xl font-bold mb-1">Review top concerns</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-5">
                These are the issues that need attention before migration.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  { label: 'Pricing logic density', sev: 'High', desc: 'Signals a high-value Pricing Procedures implementation' },
                  { label: 'Custom amendment logic', sev: 'High', desc: 'Prime for Transaction Management replacement' },
                  { label: 'Legacy provisioning', sev: 'Medium', desc: 'May be a DRO expansion candidate' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 bg-[hsl(var(--muted))]/60 rounded-xl border border-[hsl(var(--border))]">
                    <span className="mt-0.5 text-[10px] px-1.5 py-0.5 rounded font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 shrink-0">
                      {c.sev}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{c.label}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors self-end"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 4: Ask the agent */}
          {step === 4 && (
            <div className="flex flex-col items-center text-center flex-1 justify-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5">
                <span className="text-2xl font-bold text-white">V</span>
              </div>
              <h2 className="text-xl font-bold mb-2">RevBrain Agent</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8 max-w-sm leading-relaxed">
                Your AI analyst is ready. Ask questions in natural language — RevBrain
                grounds every answer in the assessment payload.
              </p>
              <div className="w-full max-w-sm space-y-2 mb-6 text-left">
                {[
                  'What is the top risk for this migration?',
                  'Which ARM capabilities give the most uplift?',
                  'Summarise the verdict in two sentences.',
                ].map((q) => (
                  <div key={q} className="px-3 py-2 rounded-lg border border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))]">
                    {q}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(5)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
              >
                Got it <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 5: Export or draft */}
          {step === 5 && (
            <div className="flex flex-col items-center text-center flex-1 justify-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-5">
                <Check className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">Ready to explore</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8 max-w-sm leading-relaxed">
                Use the <strong>Salesforce</strong> layer to export a one-page briefing,
                or go to <strong>Migration</strong> to generate ARM candidates for
                high-confidence artifacts.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onComplete}
                  className="px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] text-sm font-medium hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  Skip to dashboard
                </button>
                <button
                  id="onboarding-done-btn"
                  onClick={handleDone}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
                >
                  Open {selectedAudience ? AUDIENCE_CARDS.find(c => c.key === selectedAudience)?.label : 'Dashboard'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Progress dots */}
        {step !== 1 && (
          <div className="flex items-center justify-center gap-1.5 pb-5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  'rounded-full transition-all duration-300',
                  i === step ? 'w-4 h-1.5 bg-indigo-500' : 'w-1.5 h-1.5 bg-[hsl(var(--border))]',
                  i < step && 'bg-indigo-400'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Exported helper to check/set onboarding complete ─────────────
export function isOnboardingComplete() {
  return localStorage.getItem(STORAGE_KEY) === 'done';
}

export function markOnboardingComplete() {
  localStorage.setItem(STORAGE_KEY, 'done');
}

export function resetOnboarding() {
  localStorage.removeItem(STORAGE_KEY);
}
