// ── RevBrain Shell ──────────────────────────────────────────────────
// Layout wrapper for SI Architect migration pages.
// Mirrors AppShell structure but with RevBrain-specific top bar,
// inline stepper, and bottom agent bar.

import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  ChevronDown,
  Check,
} from 'lucide-react';
import { RevBrainBottomAgent } from './RevBrainBottomAgent';

/* ── Stepper steps ───────────────────────────────────────────────── */

interface Step {
  label: string;
  to: string | null; // null = disabled
}

const STEPS: Step[] = [
  { label: 'Command Center', to: '/revbrain/migration/si-architect' },
  { label: 'Assess', to: '/revbrain/migration/si-architect/assess' },
  { label: 'Map', to: '/revbrain/migration/si-architect/map' },
  { label: 'Design', to: '/revbrain/migration/si-architect/design' },
  { label: 'Implementation', to: '/revbrain/migration/si-architect/implementation' },
];

/* ── Ongoing Ops tabs ────────────────────────────────────────────── */

const ONGOING_TABS = [
  { label: 'Command Center', to: '/revbrain/ongoing/command-center' },
  { label: 'User Requests', to: '/revbrain/ongoing/user-requests' },
  { label: 'Implementation', to: '/revbrain/ongoing/implementation' },
];

/* ── Stage pills (navigable) ──────────────────────────────────────── */

const STAGE_PILLS = [
  { label: 'Implementation', path: '/revbrain/migration/si-architect' },
  { label: 'Ongoing Ops', path: '/revbrain/ongoing' },
  { label: 'Learning Engine', path: '/revbrain/knowledge' },
];

/* ── Role dropdown options ───────────────────────────────────────── */

interface RoleOption {
  label: string;
  path: string;
}

const ROLES: RoleOption[] = [
  { label: 'SI Partner - Sales', path: '/revbrain/migration/si-sales' },
  { label: 'SI Partner - Solution Architect', path: '/revbrain/migration/si-architect' },
  { label: 'Client Business User', path: '/revbrain/migration/client-business' },
  { label: 'Admin / Project Manager', path: '/revbrain/migration/admin' },
];

const CURRENT_ROLE = ROLES[1]; // SI Partner - Solution Architect

/* ── Component ───────────────────────────────────────────────────── */

export function RevBrainShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [roleOpen, setRoleOpen] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Listen to scroll events on main element
  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setIsScrolled(mainRef.current.scrollTop > 20);
      }
    };

    const mainEl = mainRef.current;
    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (mainEl) mainEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
      setIsScrolled(false);
    }
  }, [pathname]);

  // Determine active step index
  const activeIndex = STEPS.findIndex(
    (s) => s.to !== null && pathname === s.to,
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[hsl(var(--background))]">
      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <header className="h-12 flex items-center justify-between px-6 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] shrink-0 z-30">
        {/* Left: logo + customer */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[hsl(var(--accent))] flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">R</span>
          </div>
          <span className="text-sm font-semibold text-[hsl(var(--foreground))]">
            RevBrain
          </span>
          <span className="text-[hsl(var(--border))]">|</span>
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">
            Vector Systems
          </span>
        </div>

        {/* Center: stage pills */}
        <nav className="hidden md:flex items-center gap-1.5">
          {STAGE_PILLS.map((pill) => {
            const isActive = pathname.startsWith(pill.path);
            return (
              <button
                key={pill.label}
                onClick={() => navigate(pill.path)}
                className={clsx(
                  'px-3 py-1 text-xs font-medium rounded-full transition-colors',
                  isActive
                    ? 'bg-[hsl(var(--accent))] text-white'
                    : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:opacity-80 cursor-pointer',
                )}
              >
                {pill.label}
              </button>
            );
          })}
        </nav>

        {/* Right: role dropdown */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors"
          >
            <span className="text-[hsl(var(--foreground))]">{CURRENT_ROLE.label}</span>
            <ChevronDown className={clsx('w-3 h-3 text-[hsl(var(--muted-foreground))] transition-transform', roleOpen && 'rotate-180')} />
          </button>

          {roleOpen && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-lg z-50 py-1 animate-fadeIn">
              {ROLES.map((role) => {
                const isCurrent = role.path === CURRENT_ROLE.path;
                return (
                  <button
                    key={role.path}
                    onClick={() => {
                      setRoleOpen(false);
                      navigate(role.path);
                    }}
                    className={clsx(
                      'w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2',
                      isCurrent
                        ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] font-medium'
                        : 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]',
                    )}
                  >
                    {isCurrent && <Check className="w-3 h-3 shrink-0" />}
                    <span className={clsx(!isCurrent && 'ml-5')}>{role.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* ── Main content (full width, no agent rail) ────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── Workspace Stepper (compact on scroll) — only on migration pages ──── */}
        {pathname.startsWith('/revbrain/migration') && (
          <div
            className={clsx(
              'border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] shrink-0 z-20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xs',
              isScrolled ? 'py-1' : 'py-2.5',
            )}
          >
            <div className="max-w-[1520px] mx-auto px-6 flex items-center justify-center">
              {STEPS.map((step, i) => {
                const isActive = i === activeIndex;
                const isDisabled = step.to === null;

                return (
                  <div key={step.label} className="flex items-center">
                    {/* Connecting line */}
                    {i > 0 && (
                      <div
                        className={clsx(
                          'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                          isScrolled ? 'w-8 sm:w-12 h-[1px]' : 'w-12 sm:w-20 h-[1.5px]',
                          isDisabled
                            ? 'border-t border-dashed border-[hsl(var(--border))]'
                            : 'bg-[hsl(var(--border))]',
                        )}
                      />
                    )}

                    {/* Step element */}
                    {isDisabled ? (
                      <div className="relative group flex items-center cursor-default px-1">
                        <div
                          className={clsx(
                            'rounded-full flex items-center justify-center font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                            isScrolled
                              ? 'w-1.5 h-1.5 border border-dashed border-[hsl(var(--border))] bg-transparent'
                              : 'w-7 h-7 text-[11px] border border-dashed border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]/50',
                          )}
                        >
                          {!isScrolled && (i + 1)}
                        </div>

                        <div
                          className={clsx(
                            'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden whitespace-nowrap',
                            isScrolled
                              ? 'max-w-0 opacity-0 -translate-x-2 pointer-events-none'
                              : 'max-w-[150px] opacity-100 translate-x-0 ml-2',
                          )}
                        >
                          <span className="text-xs text-[hsl(var(--muted-foreground))]/50 italic">
                            {step.label}
                          </span>
                        </div>

                        {/* Minimal tooltip on hover when scrolled */}
                        {isScrolled && (
                          <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-0.5 bg-slate-900 text-slate-100 text-[10px] rounded font-medium whitespace-nowrap shadow-md z-50">
                            {step.label}
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={step.to!}
                        className="relative group flex items-center outline-none px-1"
                      >
                        {/* Circle / Dot */}
                        <div
                          className={clsx(
                            'rounded-full flex items-center justify-center font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                            isScrolled
                              ? isActive
                                ? 'w-2.5 h-2.5 bg-[hsl(var(--foreground))] ring-2 ring-[hsl(var(--foreground))]/25 shadow-2xs'
                                : 'w-1.5 h-1.5 bg-slate-300 group-hover:bg-slate-700 group-hover:scale-150'
                              : isActive
                                ? 'w-7 h-7 text-[11px] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]'
                                : 'w-7 h-7 text-[11px] border-[1.5px] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] group-hover:border-[hsl(var(--foreground))]/40 group-hover:text-[hsl(var(--foreground))]',
                          )}
                        >
                          {!isScrolled && (i + 1)}
                        </div>

                        {/* Text Label */}
                        <div
                          className={clsx(
                            'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden whitespace-nowrap',
                            isScrolled
                              ? 'max-w-0 opacity-0 -translate-x-2 pointer-events-none'
                              : 'max-w-[150px] opacity-100 translate-x-0 ml-2',
                          )}
                        >
                          <span
                            className={clsx(
                              'text-xs font-medium',
                              isActive
                                ? 'font-semibold text-[hsl(var(--foreground))]'
                                : 'text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]',
                            )}
                          >
                            {step.label}
                          </span>
                        </div>

                        {/* Minimal tooltip on hover when scrolled */}
                        {isScrolled && (
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-0.5 bg-slate-900 text-slate-100 text-[10px] rounded font-medium whitespace-nowrap shadow-md z-50">
                            {step.label}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Ongoing Ops Tab Bar — only on ongoing-ops pages ──────── */}
        {pathname.startsWith('/revbrain/ongoing') && (
          <div
            className={clsx(
              'border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              isScrolled ? 'py-1' : 'py-2',
            )}
          >
            <div className="max-w-[1520px] mx-auto px-6 flex items-center gap-1">
              {ONGOING_TABS.map((tab) => {
                const isActive = pathname === tab.to;
                return (
                  <NavLink
                    key={tab.label}
                    to={tab.to}
                    className={clsx(
                      'px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors',
                      isActive
                        ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]'
                        : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]',
                    )}
                  >
                    {tab.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}

        {/* Page content — scrollable area */}
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Outlet />
          {/* Spacer to ensure content can scroll above the fixed bottom agent */}
          <div
            aria-hidden="true"
            className="pointer-events-none shrink-0 w-full"
            style={{ height: 'var(--agent-strip-height, 180px)' }}
          />
        </main>
      </div>

      {/* ── Bottom Agent Bar (global) ────────────────────────────────── */}
      <RevBrainBottomAgent />
    </div>
  );
}
