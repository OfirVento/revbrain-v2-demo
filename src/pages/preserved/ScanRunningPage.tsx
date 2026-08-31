import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const STEPS = [
  'Authenticating org connection',
  'Reading metadata (12,847 records)',
  'Analyzing 176 products across 12 families',
  'Auditing approval logic (4-tier, 16 permission sets)',
  'Scanning custom code (5 QCP scripts, 109 Apex classes, 4 plugins)',
  'Analyzing quote volume (10,240 over 24 months)',
  'Reviewing user activity (84 active users, 3 teams)',
  'Mapping to ARM equivalents (87% confidence)',
  'Generating findings · other areas',
];

const TOTAL_DURATION = 21000;
const PER_STEP = TOTAL_DURATION / STEPS.length;

export function ScanRunningPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(pct);
      const step = Math.floor(elapsed / PER_STEP);
      setCurrentStep(step);

      if (elapsed >= TOTAL_DURATION) {
        clearInterval(interval);
        setTimeout(() => navigate('/executive-summary'), 800);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Progress card */}
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-8 shadow-sm">
          <div className="flex justify-between items-baseline mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-[hsl(var(--accent))] flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">Q</span>
              </div>
              <p className="text-xs uppercase tracking-wider font-medium text-[hsl(var(--muted-foreground))]">
                Scanning — Vector Systems
              </p>
            </div>
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-[hsl(var(--muted))] mb-6 overflow-hidden">
            <div
              className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step list */}
          <div className="space-y-0.5">
            {STEPS.map((step, idx) => {
              const status =
                idx < currentStep ? 'complete' :
                idx === currentStep ? 'active' :
                'pending';

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 py-1.5 text-sm transition-all ${
                    status === 'active' ? 'animate-pulse' : ''
                  }`}
                >
                  {/* Status icon */}
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {status === 'complete' ? (
                      <div className="w-4 h-4 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </div>
                    ) : status === 'active' ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[hsl(var(--accent))] border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border-2 border-[hsl(var(--border))]" />
                    )}
                  </div>

                  {/* Step text */}
                  <span
                    className={
                      status === 'complete'
                        ? 'text-[hsl(var(--foreground))]'
                        : status === 'active'
                        ? 'text-[hsl(var(--foreground))] font-medium'
                        : 'text-[hsl(var(--muted-foreground))]'
                    }
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4 italic text-center">
          You'll be redirected to the Executive Summary when the scan completes.
        </p>
      </div>
    </div>
  );
}
