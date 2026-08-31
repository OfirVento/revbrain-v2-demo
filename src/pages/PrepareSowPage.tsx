import { useState } from 'react';
import { clsx } from 'clsx';
import {
  ChevronDown, ChevronRight, Check, AlertTriangle,
  FileDown, ShieldCheck, CheckCircle,
} from 'lucide-react';

// ── Data types ────────────────────────────────────────────────

type ItemStatus = 'confirmed' | 'pending' | 'warning';

interface SOWItem {
  id: string;
  label: string;
  status: ItemStatus;
  detail?: string;       // expanded detail / resolution text
  warningNote?: string;  // for ⚠ items
}

interface SOWSection {
  id: string;
  title: string;
  items?: SOWItem[];
  effortRows?: { phase: string; weeks: string; effort: string }[];
}

// ── SOW section data ──────────────────────────────────────────

const SOW_SECTIONS: SOWSection[] = [
  {
    id: 'exec-summary',
    title: 'Executive Summary',
    items: [
      {
        id: 'es-1', status: 'confirmed', label: 'Customer goal',
        detail: 'Move from CPQ to ARM with minimum risk to active quoting.',
      },
      {
        id: 'es-2', status: 'confirmed', label: 'Scope overview',
        detail: 'Phase-based migration prioritizing active enterprise quoting, followed by renewals, data migration, and optional legacy cleanup.',
      },
      {
        id: 'es-3', status: 'pending', label: 'Success criteria',
        detail: 'Awaiting definition — recommend: quoting parity in Phase 1, zero revenue disruption, <2% post-migration defect rate.',
      },
    ],
  },
  {
    id: 'scope',
    title: 'Scope',
    items: [
      {
        id: 'sc-1', status: 'confirmed', label: 'Phase 1: Active Enterprise Quoting',
        detail: 'Active enterprise quote flow, core product bundles, standard pricing logic, standard approval path.',
      },
      {
        id: 'sc-2', status: 'confirmed', label: 'Phase 2: Renewals and Amendments',
        detail: 'Renewal quote flow, amendment process, Phase 1 dependencies.',
      },
      {
        id: 'sc-3', status: 'pending', label: 'Phase 3: Data Migration',
        detail: 'Historical quote archive (8,140 records), permission set consolidation, data validation.',
      },
      {
        id: 'sc-4', status: 'pending', label: 'Phase 4: Legacy Cleanup',
        detail: 'Dormant product decommission (87 products), orphan feature removal, CPQ uninstall.',
      },
    ],
  },
  {
    id: 'assumptions',
    title: 'Assumptions',
    items: [
      {
        id: 'as-1', status: 'confirmed', label: 'Active quotes migrate to ARM in Phase 1',
        detail: 'Only in-progress quotes migrate; completed quotes remain as read-only CPQ records.',
      },
      {
        id: 'as-2', status: 'warning', label: 'Historical quote archive — retention policy TBD',
        warningNote: '3 open questions',
        detail: '8,140 historical records. Need retention window decision from Vector Systems CTO. Options: full migration, archive-only, or selective by closed-won status.',
      },
      {
        id: 'as-3', status: 'warning', label: 'Approval exception handling',
        warningNote: '2 open questions',
        detail: 'Deal Desk approval overrides need POC validation. Current CPQ flow uses custom Apex for 4-tier escalation — must confirm ARM Advanced Approvals covers edge cases.',
      },
      {
        id: 'as-4', status: 'confirmed', label: 'Standard approval logic preserves current behavior',
        detail: 'Baseline 4-tier approval flow maps directly to ARM approval matrix. No custom code needed for standard path.',
      },
      {
        id: 'as-5', status: 'confirmed', label: 'SmartBytes filter rule requires custom validation',
        detail: 'Accepted as custom scope. Will build as BRE Expression Set in Phase 1.',
      },
      {
        id: 'as-6', status: 'warning', label: 'Plugin interface migration approach',
        warningNote: '4 plugins to assess',
        detail: 'Q2CLegacyqcp, ExampleProductSearchPlugin, SmartBytesQCPPlugin, CustomApprovalServiceImpl — each needs POC to determine ARM pattern.',
      },
    ],
  },
  {
    id: 'loe',
    title: 'LOE & Estimates',
    effortRows: [
      { phase: 'Phase 1: Active Quoting', weeks: '3–4 weeks', effort: 'Medium' },
      { phase: 'Phase 2: Renewals', weeks: '4–5 weeks', effort: 'Medium-High' },
      { phase: 'Phase 3: Data Migration', weeks: '3–6 weeks', effort: 'High' },
      { phase: 'Phase 4: Legacy Cleanup', weeks: 'TBD', effort: 'Variable' },
    ],
  },
  {
    id: 'risks',
    title: 'Risks & Mitigations',
    items: [
      {
        id: 'rk-1', status: 'confirmed', label: 'Pricing complexity concentrated in QCP scripts',
        detail: 'Mitigated: 5 QCP scripts mapped to BRE Expression Sets. POC required for SmartBytes filter.',
      },
      {
        id: 'rk-2', status: 'confirmed', label: 'Data validation at scale',
        detail: 'Mitigated: automated regression suite comparing CPQ vs ARM quote outputs for top-100 scenarios.',
      },
      {
        id: 'rk-3', status: 'pending', label: 'Renewal flow disruption during cutover',
        detail: 'Q1 renewal peak (March) is a hard constraint. Recommend February UAT lock. Bridge strategy uses Renewal Flip automation.',
      },
      {
        id: 'rk-4', status: 'confirmed', label: 'Permission set drift',
        detail: '16 permission sets → consolidate to 4-5 role-based sets aligned to team structure.',
      },
    ],
  },
];

// ── Status badge ──────────────────────────────────────────────

function StatusBadge({ status }: { status: ItemStatus }) {
  if (status === 'confirmed') {
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-green-100 text-green-800 border border-green-200">
        <CheckCircle className="w-3 h-3" />
        Confirmed
      </span>
    );
  }
  if (status === 'warning') {
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">
        <AlertTriangle className="w-3 h-3" />
        Needs Review
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]">
      Pending
    </span>
  );
}

// ── SOW section item ──────────────────────────────────────────

function SectionItem({ item }: { item: SOWItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={clsx(
        'border-b border-[hsl(var(--border))]/50 last:border-0',
        item.status === 'warning' && 'bg-orange-50/50'
      )}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 py-2.5 px-3 hover:bg-[hsl(var(--muted))]/30 transition-colors text-left"
      >
        {expanded
          ? <ChevronDown className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] shrink-0" />
          : <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] shrink-0" />
        }
        <span className="text-sm flex-1">{item.label}</span>
        {item.warningNote && (
          <span className="text-xs text-orange-600 shrink-0 mr-2">{item.warningNote}</span>
        )}
        <StatusBadge status={item.status} />
      </button>
      {expanded && item.detail && (
        <div className="px-10 pb-3">
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{item.detail}</p>
        </div>
      )}
    </div>
  );
}

// ── SOW section accordion ─────────────────────────────────────

function SectionAccordion({ section }: { section: SOWSection }) {
  const [open, setOpen] = useState(true);

  const confirmedCount = section.items?.filter((i) => i.status === 'confirmed').length ?? 0;
  const totalCount = section.items?.length ?? section.effortRows?.length ?? 0;
  const warningCount = section.items?.filter((i) => i.status === 'warning').length ?? 0;

  return (
    <div className="border border-[hsl(var(--border))] rounded-md overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[hsl(var(--muted))]/30 hover:bg-[hsl(var(--muted))]/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ChevronDown className={clsx(
            'w-4 h-4 text-[hsl(var(--muted-foreground))] transition-transform',
            !open && '-rotate-90'
          )} />
          <span className="text-sm font-semibold">{section.title}</span>
          {warningCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-orange-600">
              <AlertTriangle className="w-3 h-3" />
              {warningCount}
            </span>
          )}
        </div>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">
          {section.items ? `${confirmedCount}/${totalCount} confirmed` : `${totalCount} phases`}
        </span>
      </button>

      {open && (
        <div>
          {/* Regular items */}
          {section.items?.map((item) => (
            <SectionItem key={item.id} item={item} />
          ))}

          {/* Effort rows (LOE section) */}
          {section.effortRows && (
            <div className="px-4 py-3">
              {section.effortRows.map((row) => (
                <div key={row.phase} className="flex items-center justify-between py-2 border-b border-[hsl(var(--border))]/40 last:border-0">
                  <span className="text-sm">{row.phase}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium tabular-nums">{row.weeks}</span>
                    <span className={clsx(
                      'text-[10px] font-semibold px-1.5 py-0.5 rounded border',
                      row.effort === 'Medium' && 'bg-yellow-100 text-yellow-800 border-yellow-200',
                      row.effort === 'Medium-High' && 'bg-orange-100 text-orange-800 border-orange-200',
                      row.effort === 'High' && 'bg-red-100 text-red-800 border-red-200',
                      row.effort === 'Variable' && 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]',
                    )}>
                      {row.effort}
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-[hsl(var(--border))]">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-sm font-bold">14–18 weeks</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── SOW Summary Strip ─────────────────────────────────────────

function SOWSummaryStrip() {
  const allItems = SOW_SECTIONS.flatMap((s) => s.items ?? []);
  const confirmed = allItems.filter((i) => i.status === 'confirmed').length;
  const warnings = allItems.filter((i) => i.status === 'warning').length;
  const total = allItems.length;

  return (
    <div className="card bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">
            SOW STATUS
          </h2>
          <p className="text-sm">
            <strong>4 phases</strong> · <strong>14–18 weeks</strong> estimated effort
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            <strong>{confirmed} of {total}</strong> items confirmed
            {warnings > 0 && (
              <> · <span className="text-orange-600">⚠ <strong>{warnings}</strong> awaiting architect review</span></>
            )}
          </p>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-48 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
            <div
              className="h-full bg-[hsl(var(--accent))] rounded-full transition-all"
              style={{ width: `${(confirmed / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
            <ShieldCheck className="w-4 h-4" />
            Validate with Architect
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md bg-[hsl(var(--accent))] text-white hover:opacity-90 transition-opacity">
            <FileDown className="w-4 h-4" />
            Export Draft SOW
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Right pane: SOW Preview ───────────────────────────────────

function SOWPreview() {
  return (
    <div className="card overflow-y-auto" style={{ maxHeight: 640 }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
          SOW PREVIEW
        </span>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">Live preview · Updates as you edit</span>
      </div>

      <div className="border border-[hsl(var(--border))] rounded-lg bg-white p-6 mt-3">
        {/* Document header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 rounded bg-[hsl(var(--accent))] flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">V</span>
          </div>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">RevBrain · Vector Systems</span>
        </div>

        <h2 className="text-xl font-bold mb-6">Statement of Work</h2>

        {/* Executive Summary */}
        <h3 className="text-base font-semibold mt-5 mb-2 pb-1 border-b border-[hsl(var(--border))]/40">
          Executive Summary
        </h3>
        <div className="text-sm leading-relaxed space-y-2 mb-4">
          <p><span className="font-medium">Customer goal:</span><br />
            Move from CPQ to ARM with minimum risk to active quoting.
          </p>
          <p><span className="font-medium">Scope overview:</span><br />
            Phase-based migration prioritizing active enterprise quoting, followed by renewals, data migration, and optional legacy cleanup.
          </p>
        </div>

        {/* Scope */}
        <h3 className="text-base font-semibold mt-5 mb-2 pb-1 border-b border-[hsl(var(--border))]/40">
          Scope
        </h3>

        <h4 className="text-sm font-medium mt-3 mb-1">Phase 1: Active Enterprise Quoting</h4>
        <ul className="list-disc list-inside text-sm text-[hsl(var(--muted-foreground))] space-y-0.5 ml-1">
          <li>Active enterprise quote flow</li>
          <li>Core product bundles (176 products, 12 families)</li>
          <li>Standard pricing logic (20 active price rules)</li>
          <li>Standard approval path (4-tier)</li>
          <li>SmartBytes filter rule — custom validation</li>
        </ul>

        <h4 className="text-sm font-medium mt-3 mb-1">Phase 2: Renewals and Amendments</h4>
        <ul className="list-disc list-inside text-sm text-[hsl(var(--muted-foreground))] space-y-0.5 ml-1">
          <li>Renewal quote flow</li>
          <li>Amendment process</li>
          <li>Phase 1 dependencies validated</li>
        </ul>

        <h4 className="text-sm font-medium mt-3 mb-1">Phase 3: Data Migration</h4>
        <ul className="list-disc list-inside text-sm text-[hsl(var(--muted-foreground))] space-y-0.5 ml-1">
          <li>Historical quote archive (8,140 records)</li>
          <li>Permission set consolidation (16 → 4-5)</li>
          <li>Data validation suite</li>
        </ul>

        {/* Assumptions */}
        <h3 className="text-base font-semibold mt-5 mb-2 pb-1 border-b border-[hsl(var(--border))]/40">
          Assumptions
        </h3>
        <ul className="text-sm space-y-1.5 ml-1">
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
            <span>Active quotes will be migrated to ARM in Phase 1.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
            <span>Standard approval logic preserves current behavior.</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
            <span className="text-orange-700">Historical quote retention policy — pending CTO decision.</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
            <span className="text-orange-700">Approval exception handling — POC validation required.</span>
          </li>
        </ul>

        {/* Effort */}
        <h3 className="text-base font-semibold mt-5 mb-2 pb-1 border-b border-[hsl(var(--border))]/40">
          Effort Estimate
        </h3>
        <div className="text-sm space-y-1 ml-1">
          <div className="flex justify-between py-1">
            <span>Phase 1: Active Quoting</span>
            <span className="font-medium">3–4 weeks</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Phase 2: Renewals</span>
            <span className="font-medium">4–5 weeks</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Phase 3: Data Migration</span>
            <span className="font-medium">3–6 weeks</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Phase 4: Legacy Cleanup</span>
            <span className="font-medium">TBD after review</span>
          </div>
          <div className="flex justify-between py-1.5 mt-2 pt-2 border-t border-[hsl(var(--border))]/60 font-semibold">
            <span>Total</span>
            <span>14–18 weeks</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-3 border-t border-[hsl(var(--border))]/40 text-xs text-[hsl(var(--muted-foreground))] italic">
          Draft generated by RevBrain · Subject to architect validation
        </div>
      </div>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────

export function PrepareSowPage() {

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 page-fade">
      {/* ── Page header ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-semibold">Prepare SOW</h1>
          
        </div>
        <p className="text-[hsl(var(--muted-foreground))]">
          Statement of Work builder with architect validation queue
        </p>
      </div>

      {/* ── Summary strip ──────────────────────────────────────── */}
      <SOWSummaryStrip />

      {/* ── 2-pane workbench ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: 500 }}>
        {/* Left pane: section list */}
        <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 640 }}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            SOW SECTIONS
          </h3>
          {SOW_SECTIONS.map((section) => (
            <SectionAccordion key={section.id} section={section} />
          ))}
        </div>

        {/* Right pane: preview */}
        <SOWPreview />
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-[hsl(var(--border))]">
        
      </div>
    </div>
  );
}
