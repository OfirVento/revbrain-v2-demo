import { useState } from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAssessmentStore } from '@/store';
import {
  SALES_HANDOFF, COMPLEXITY_DIMENSIONS, STAT_TILES, GLANCE_CARDS,
  AREA_COMPLEXITY, TOP_RISKS, CPQ_SETTINGS, PLUGINS, DATA_QUALITY, USAGE_PROFILE,
} from './understand-data';
import { PRODUCT_ITEMS, PRODUCT_STATS, MIGRATION_STATUS } from './products-data';

// ── Reusable sub-components ──────────────────────────────────

function SectionCard({ eyebrow, children, className }: { eyebrow: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('card', className)}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-3">{eyebrow}</p>
      {children}
    </div>
  );
}

function DimensionBar({ label, score }: { label: string; score: number }) {
  const color = score >= 36 ? 'bg-orange-400' : score >= 21 ? 'bg-yellow-400' : 'bg-green-400';
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs w-28 shrink-0 text-[hsl(var(--muted-foreground))]">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-[hsl(var(--muted))]">
        <div className={clsx('h-full rounded-full', color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-semibold w-6 text-right tabular-nums">{score}</span>
    </div>
  );
}

function AreaRow({ label, tier, count, fillPct }: { label: string; tier: string; count: number; fillPct: number }) {
  const tierColor = tier === 'Moderate' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' : 'text-green-700 bg-green-50 border-green-200';
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-xs w-28 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-[hsl(var(--muted))]">
        <div className="h-full rounded-full bg-[hsl(var(--accent))]" style={{ width: `${fillPct}%` }} />
      </div>
      <span className={clsx('text-[10px] font-medium px-1.5 py-0.5 rounded border', tierColor)}>{tier}</span>
      <span className="text-xs text-[hsl(var(--muted-foreground))] w-16 text-right tabular-nums">{count.toLocaleString()}</span>
    </div>
  );
}

// ── Object tabs config ───────────────────────────────────────
const OBJECT_TABS = ['Overview','Products','Pricing','Rules','Code','Integrations','Amendments','Approvals','Documents','Data & Reporting'];
const ENABLED_TABS = new Set(['Overview', 'Products']);

// ── Page ─────────────────────────────────────────────────────

export function MigrationPage() {
  const { payload } = useAssessmentStore();
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  if (!payload) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8 page-fade">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Understand</h1>
        <p className="text-[hsl(var(--muted-foreground))]">What do I need to know before I start scoping the migration?</p>
      </div>

      {/* Section 1 — Sales Handoff */}
      <SectionCard eyebrow="SALES HANDOFF">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">Customer goal:</p>
            <p className="text-sm">{SALES_HANDOFF.customerGoal}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">Executive concern:</p>
            <p className="text-sm">{SALES_HANDOFF.executiveConcern}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">Known objections:</p>
            <ul className="space-y-0.5">{SALES_HANDOFF.objections.map(o => <li key={o} className="text-sm">• {o}</li>)}</ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">Client-specific notes:</p>
            <ul className="space-y-0.5">{SALES_HANDOFF.clientNotes.map(n => <li key={n} className="text-sm">• {n}</li>)}</ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">Sales recommendation:</p>
            <p className="text-sm">{SALES_HANDOFF.salesRecommendation}</p>
          </div>
        </div>
      </SectionCard>

      {/* Section 2 — Assessment header + Object Tabs */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">Assessment</span>
            <span className="inline-block px-2 py-0.5 text-[10px] font-medium border border-[hsl(var(--border))] rounded-md text-[hsl(var(--muted-foreground))]">IR: pending</span>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Run #1 · 8d ago ▾</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] transition-colors cursor-not-allowed">Re-Extract</button>
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] transition-colors cursor-not-allowed">Export ▾</button>
        </div>
      </div>

      {/* Object Tabs */}
      <div className="flex items-center gap-0 border-b border-[hsl(var(--border))]">
        {OBJECT_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => ENABLED_TABS.has(tab) && setActiveTab(tab)}
            className={clsx(
              'px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
              tab === activeTab
                ? 'border-b-2 border-[hsl(var(--foreground))] text-[hsl(var(--foreground))]'
                : ENABLED_TABS.has(tab)
                  ? 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] cursor-pointer'
                  : 'text-[hsl(var(--muted-foreground))]/50 cursor-not-allowed'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Products Tab ─────────────────────────────────── */}
      {activeTab === 'Products' && (
        <>
          {/* Stat tiles */}
          <div className="grid grid-cols-4 gap-4">
            {PRODUCT_STATS.map(s => (
              <div key={s.label} className="bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Migration status bar */}
          <div className="card">
            <p className="text-sm font-semibold mb-3">ARM Migration Status</p>
            <div className="h-3 rounded-full overflow-hidden flex">
              <div className="bg-green-500" style={{ width: `${(MIGRATION_STATUS.auto / 179) * 100}%` }} />
              <div className="bg-orange-400" style={{ width: `${(MIGRATION_STATUS.guided / 179) * 100}%` }} />
              <div className="bg-red-500" style={{ width: `${(MIGRATION_STATUS.manual / 179) * 100}%` }} />
              <div className="bg-gray-400" style={{ width: `${(MIGRATION_STATUS.blocked / 179) * 100}%` }} />
            </div>
            <div className="flex gap-4 mt-2">
              <span className="text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Auto ({MIGRATION_STATUS.auto})</span>
              <span className="text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400" />Guided ({MIGRATION_STATUS.guided})</span>
              <span className="text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Manual ({MIGRATION_STATUS.manual})</span>
              <span className="text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400" />Blocked ({MIGRATION_STATUS.blocked})</span>
            </div>
          </div>

          {/* 6.2.1 Product Segmentation */}
          <div className="card overflow-hidden p-0">
            <div className="px-4 py-3 border-b border-[hsl(var(--border))]">
              <h3 className="text-sm font-bold">6.2.1 Product Segmentation</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[hsl(var(--accent))] text-white text-xs">
                  <th className="text-left px-4 py-2 font-semibold">Observation</th>
                  <th className="text-center px-2 py-2 font-semibold">Not Used</th>
                  <th className="text-center px-2 py-2 font-semibold">Sometimes</th>
                  <th className="text-center px-2 py-2 font-semibold">Most Times</th>
                  <th className="text-center px-2 py-2 font-semibold">Always</th>
                  <th className="text-center px-3 py-2 font-semibold">Count / %</th>
                  <th className="text-left px-3 py-2 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { obs: 'Product Family', freq: 3, count: '171 / 97%', note: 'Categorization field' },
                  { obs: 'Pricing Method', freq: 3, count: '176 / 100%', note: 'Field populated (see breakdown below)' },
                  { obs: '→ List', freq: 3, count: '173 / 98%', note: 'Standard', sub: true },
                  { obs: '→ Cost', freq: 1, count: '1 / 1%', note: 'Margin calculations', sub: true },
                  { obs: '→ Block', freq: 1, count: '1 / 1%', note: 'Tiered pricing', sub: true },
                  { obs: '→ Percent of Total', freq: 1, count: '1 / 1%', note: 'Line dependencies', sub: true },
                  { obs: 'Price Editable', freq: 3, count: '176 / 100%', note: 'Can bypass approvals' },
                  { obs: 'Discount Schedule', freq: 1, count: '11 / 6%', note: 'Volume / term discounts' },
                  { obs: 'Subscription Type', freq: 2, count: '175 / 99%', note: 'Field populated (see breakdown below)' },
                  { obs: '→ One-time', freq: 1, count: '48 / 27%', note: '', sub: true },
                  { obs: '→ Renewable', freq: 2, count: '125 / 71%', note: 'Renewable term', sub: true },
                  { obs: '→ Evergreen', freq: 2, count: '2 / 1%', note: '⚠ High complexity', sub: true },
                ].map((r, i) => (
                  <tr key={i} className={clsx('border-b border-[hsl(var(--border))]/40', r.sub && 'bg-[hsl(var(--muted))]/20')}>
                    <td className={clsx('px-4 py-2.5 font-medium', r.sub ? 'pl-8 text-[hsl(var(--muted-foreground))]' : '')}>{r.obs}</td>
                    {[0,1,2,3].map(fi => (
                      <td key={fi} className="text-center px-2 py-2.5">
                        {r.freq === fi ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[hsl(var(--accent))] text-white text-[10px]">✓</span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-[hsl(var(--border))]" />
                        )}
                      </td>
                    ))}
                    <td className="text-center px-3 py-2.5 font-semibold tabular-nums">{r.count}</td>
                    <td className="px-3 py-2.5 text-xs text-[hsl(var(--muted-foreground))]">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Search + filters */}
          <div className="flex items-center gap-3">
            <input
              type="text" placeholder="Search items..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] focus:outline-none focus:border-[hsl(var(--accent))]/50"
            />
            <select className="px-3 py-2 text-sm rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <option>All</option><option>Low</option><option>Moderate</option><option>High</option>
            </select>
            <select className="px-3 py-2 text-sm rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <option>All</option><option>Auto</option><option>Guided</option><option>Manual</option>
            </select>
          </div>

          {/* Product table */}
          <div className="card overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
                  <th className="text-left px-4 py-2.5 font-semibold text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Name</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Complexity</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Status</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">RCA Target</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {PRODUCT_ITEMS.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
                  <tr key={p.id} className="border-b border-[hsl(var(--border))]/40 hover:bg-[hsl(var(--muted))]/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full border border-[hsl(var(--border))]" />
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={clsx('text-xs font-medium', p.complexity === 'Low' ? 'text-green-600' : p.complexity === 'Moderate' ? 'text-orange-500' : 'text-red-500')}>{p.complexity}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={clsx('text-xs font-medium', p.status === 'Auto' ? 'text-blue-600' : 'text-orange-500')}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">{p.rcaTarget}</td>
                    <td className="px-2 py-3"><ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]/40" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── Overview Tab ──────────────────────────────────── */}
      {activeTab === 'Overview' && (<>
      {/* Section 3 — Executive Summary Hero */}
      <div className="bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] rounded-xl p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Executive Summary</h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Run #1 · latest</p>
          </div>
          <span className="px-3 py-1 rounded-md bg-[hsl(var(--card))] text-sm font-semibold border border-[hsl(var(--border))]">
            Migration Readiness: Low
          </span>
        </div>
        <p className="text-sm leading-relaxed">
          Your Salesforce CPQ org contains <strong>3,687 CPQ artifacts</strong> across <strong>9 areas</strong>.{' '}
          <strong>6%</strong> can be auto-migrated, <strong>90%</strong> need guided setup,{' '}
          <strong>4%</strong> require custom development, and <strong>0 items</strong> are blocked with no ARM equivalent.
        </p>

        {/* Donut + Dimensions */}
        <div className="grid grid-cols-10 gap-6 mt-6">
          <div className="col-span-3 flex flex-col items-center justify-center">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--accent))" strokeWidth="10"
                  strokeDasharray={`${26 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">26</span>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">/ 100</span>
              </div>
            </div>
            <span className="text-xs font-medium mt-2">Overall Complexity</span>
            <span className="text-[10px] text-green-600 font-semibold">Low</span>
          </div>
          <div className="col-span-7">
            <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-3">COMPLEXITY DIMENSIONS</p>
            <div className="space-y-2">
              {COMPLEXITY_DIMENSIONS.map(d => <DimensionBar key={d.label} {...d} />)}
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {STAT_TILES.map(t => (
            <div key={t.label} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4 text-center">
              <div className="text-xl font-bold">{t.value}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">{t.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — CPQ at a Glance */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-4">CPQ AT A GLANCE</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GLANCE_CARDS.map(card => (
            <div key={card.title} className="card">
              <h3 className="text-xs font-semibold mb-3">{card.title}</h3>
              <div className="space-y-2">
                {card.rows.map(r => (
                  <div key={r.label} className="flex justify-between text-xs">
                    <span className="text-[hsl(var(--muted-foreground))]">{r.label}</span>
                    <span className="font-medium tabular-nums">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 — Usage Profile */}
      <SectionCard eyebrow="USAGE PROFILE">
        <div className="grid grid-cols-2 gap-x-8">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-2">High-complexity areas:</p>
            <ul className="space-y-1">{USAGE_PROFILE.highComplexity.map(i => <li key={i} className="text-sm">• {i}</li>)}</ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-2">Low-usage / legacy areas:</p>
            <ul className="space-y-1">{USAGE_PROFILE.lowUsage.map(i => <li key={i} className="text-sm">• {i}</li>)}</ul>
          </div>
        </div>
      </SectionCard>

      {/* Divider */}
      <div className="flex items-center">
        <hr className="flex-1 border-[hsl(var(--border))]" />
        <span className="px-4 text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Detailed Analysis</span>
        <hr className="flex-1 border-[hsl(var(--border))]" />
      </div>

      {/* Section 5 — Complexity by Area */}
      <SectionCard eyebrow="COMPLEXITY BY AREA">
        <div className="space-y-1">
          {AREA_COMPLEXITY.map(a => <AreaRow key={a.label} {...a} />)}
        </div>
      </SectionCard>

      {/* Section 6 — Top Risks */}
      <SectionCard eyebrow="TOP RISKS BY SEVERITY">
        <div className="space-y-2">
          {TOP_RISKS.map((r, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 border-b border-[hsl(var(--border))]/40 last:border-0">
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-orange-200 bg-orange-50 text-orange-700">{r.severity}</span>
              <span className="text-sm flex-1">{r.text}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Section 7 — Settings + Plugins (2-col) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard eyebrow="⚙ CPQ SETTINGS">
          <div className="space-y-0">
            {CPQ_SETTINGS.map(s => (
              <div key={s.setting} className="flex justify-between py-1.5 border-b border-[hsl(var(--border))]/40 last:border-0 text-xs">
                <span className="text-[hsl(var(--muted-foreground))]">{s.setting}</span>
                <span className="font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="⚡ PLUGINS">
          <div className="space-y-0">
            {PLUGINS.map(p => (
              <div key={p.name} className="flex justify-between items-center py-1.5 border-b border-[hsl(var(--border))]/40 last:border-0 text-xs">
                <span>{p.name}</span>
                <span className={clsx(
                  'text-[10px] font-medium px-1.5 py-0.5 rounded border',
                  p.status === 'Active' ? 'text-green-700 bg-green-50 border-green-200' : 'text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] border-[hsl(var(--border))]'
                )}>{p.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Section 8 — Data Quality */}
      <SectionCard eyebrow="🛡 DATA QUALITY">
        <div className="space-y-0">
          {DATA_QUALITY.map(d => (
            <div key={d.label} className="flex justify-between items-center py-1.5 border-b border-[hsl(var(--border))]/40 last:border-0 text-xs">
              <span>{d.label}</span>
              <span className={clsx(
                'text-[10px] font-medium px-1.5 py-0.5 rounded border',
                d.ok ? 'text-green-700 bg-green-50 border-green-200' : 'text-orange-700 bg-orange-50 border-orange-200'
              )}>{d.status}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Section 9 — Actions */}
      <div className="bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] rounded-xl p-6">
        <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-4">ACTIONS</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] transition-colors cursor-not-allowed">Open evidence drawer</button>
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] transition-colors cursor-not-allowed">Add architect notes</button>
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] transition-colors cursor-not-allowed">Mark missing context</button>
          <button onClick={() => navigate('/migration/scope-phases')} className="px-4 py-2 text-sm font-medium rounded-md bg-[hsl(var(--accent))] text-white hover:opacity-90 transition-opacity">Move to Scope Phases →</button>
        </div>
      </div>
      </>)}

      {/* Footer spacer */}
      <div className="pt-4 border-t border-[hsl(var(--border))]" />
    </div>
  );
}
