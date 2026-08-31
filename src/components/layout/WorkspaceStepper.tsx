import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

interface Step {
  label: string;
  to: string;
}

const SALES_STEPS: Step[] = [
  { label: 'Qualify', to: '/sales/qualify' },
  { label: 'Build Case', to: '/sales/build-case' },
  { label: 'Prepare SOW', to: '/sales/prepare-sow' },
];

const MIGRATION_STEPS: Step[] = [
  { label: 'Understand', to: '/migration/understand' },
  { label: 'Scope Phases', to: '/migration/scope-phases' },
  { label: 'Execute Phase', to: '/migration/execute-phase' },
];

export function WorkspaceStepper() {
  const { pathname } = useLocation();

  const isSales = pathname.startsWith('/sales');
  const isMigration = pathname.startsWith('/migration');

  if (!isSales && !isMigration) return null;

  const steps = isSales ? SALES_STEPS : MIGRATION_STEPS;
  const activeIndex = steps.findIndex((s) => pathname === s.to);

  return (
    <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] shrink-0">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-center">
        {steps.map((step, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={step.to} className="flex items-center">
              {/* Connecting line before (not on first) */}
              {i > 0 && (
                <div className="w-16 sm:w-28 h-[2px] bg-[hsl(var(--border))]" />
              )}

              {/* Step circle + label */}
              <NavLink
                to={step.to}
                className="flex flex-col items-center gap-1.5 group outline-none"
              >
                <div
                  className={clsx(
                    'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors outline-none',
                    isActive
                      ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]'
                      : 'border-2 border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] group-hover:border-[hsl(var(--foreground))]/40 group-hover:text-[hsl(var(--foreground))]'
                  )}
                >
                  {i + 1}
                </div>
                <span
                  className={clsx(
                    'text-[13px] whitespace-nowrap transition-colors',
                    isActive
                      ? 'font-semibold text-[hsl(var(--foreground))]'
                      : 'text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]'
                  )}
                >
                  {step.label}
                </span>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
