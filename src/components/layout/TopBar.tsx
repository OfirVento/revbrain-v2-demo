import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useAssessmentStore } from '@/store';
import { LearningEngineModal } from './LearningEngineModal';

/* ── Nav structure (plain links — stepper handles sub-pages) ── */

interface NavItem {
  label: string;
  to: string;
  /** Match any path starting with this prefix for active state */
  activePrefix?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Executive Summary', to: '/executive-summary' },
  { label: 'Sales', to: '/sales/qualify', activePrefix: '/sales' },
  { label: 'Migration', to: '/migration/understand', activePrefix: '/migration' },
  { label: 'RevBrain v2', to: '/revbrain', activePrefix: '/revbrain' },
];

/* ── TopBar ──────────────────────────────────────────────────── */

export function TopBar() {
  const { payload } = useAssessmentStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showStatus, setShowStatus] = useState(true);

  // Fade out status after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowStatus(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
    <header className="h-14 flex items-center justify-between px-6 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] shrink-0 z-30">
      {/* Left: logo + org name */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/scan')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-md bg-[hsl(var(--accent))] flex items-center justify-center">
            <span className="text-white font-bold text-xs">Q</span>
          </div>
          <span className="text-sm font-semibold">RevBrain</span>
        </button>

        <span className="text-[hsl(var(--border))]">|</span>

        {payload ? (
          <span className="text-sm font-medium">{payload.meta.orgName}</span>
        ) : (
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Loading…</span>
        )}
      </div>

      {/* Center: nav tabs */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.activePrefix
            ? location.pathname.startsWith(item.activePrefix)
            : location.pathname === item.to;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                isActive
                  ? 'bg-[hsl(var(--accent))] text-white font-medium'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
              }`}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Right: Learning Engine status + button */}
      <div className="flex items-center gap-3">
        {/* Fading status text */}
        <div className={`flex items-center gap-2 transition-opacity duration-500 ${showStatus ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <span className="w-3.5 h-3.5 rounded-full border-2 border-[hsl(var(--accent))] border-t-transparent shrink-0" style={{ animation: 'spin 10s linear infinite' }} />
          <span className="text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">Knowledge captures · 247 patterns</span>
        </div>

        {/* Persistent button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))]/10 hover:border-[hsl(var(--accent))]/30 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Learning Engine
        </button>
      </div>
    </header>

    {showModal && <LearningEngineModal onClose={() => setShowModal(false)} />}
    </>
  );
}
