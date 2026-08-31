import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { TYPE_GLYPHS, COMPLEXITY_COLORS, ALL_ITEMS, ALL_GROUPS, type ScopeItem, type ScopeGroup } from './scope-phases-data';

const itemMap = new Map(ALL_ITEMS.map((i) => [i.id, i]));
const groupMap = new Map(ALL_GROUPS.map((g) => [g.id, g]));

// ── Tab bar ───────────────────────────────────────────────────
function TabBar({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 border-b border-[hsl(var(--border))] mb-4">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={clsx(
          'px-3 py-2 text-xs font-medium transition-colors border-b-2 -mb-px',
          active === t ? 'border-[hsl(var(--accent))] text-[hsl(var(--foreground))]' : 'border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
        )}>{t}</button>
      ))}
    </div>
  );
}

// ── Item detail tabs ──────────────────────────────────────────
function ItemDetail({ item }: { item: ScopeItem }) {
  const [tab, setTab] = useState('Source');
  const tabs = ['Source', 'Business Logic', 'Migration Draft', 'Test Scenarios', 'Dependencies'];
  const stubSrc = item.type.includes('Apex')
    ? `// ${item.name} — current CPQ logic\npublic class ${item.name.replace(/\s+/g,'')} {\n  public void execute() {\n    // Detailed analysis pending architect review\n    System.debug('${item.name} executing');\n  }\n}`
    : item.type === 'Flow'
    ? `// Flow: ${item.name.replace(/\s+/g,'_')}\n// ${item.description}\n// Flow logic pending architect review`
    : `// CustomMetadata: ${item.name.replace(/\s+/g,'_')}__mdt\n// ${item.description}\n// Configuration pending architect review`;
  const src = item.source ?? stubSrc;
  const biz = item.businessLogic ?? `${item.name} is a ${item.type} artifact in Vector Systems' CPQ org. ${item.description} Detailed analysis pending architect review.`;
  const mig = item.migrationDraft ?? `Target output: ${item.type}. Migration approach pending architect review.`;
  return (
    <div>
      <TabBar tabs={tabs} active={tab} onChange={setTab} />
      {tab === 'Source' && (
        <pre className="bg-[hsl(var(--muted))] rounded-md p-4 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{src}</pre>
      )}
      {tab === 'Business Logic' && <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{biz}</p>}
      {tab === 'Migration Draft' && <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{mig}</p>}
      {tab === 'Test Scenarios' && (
        <ul className="space-y-1.5">{(item.testScenarios ?? ['Standard operation validation', 'Edge case handling']).map((s) => <li key={s} className="text-sm text-[hsl(var(--muted-foreground))]">• {s}</li>)}</ul>
      )}
      {tab === 'Dependencies' && (
        <ul className="space-y-1.5">{(item.dependencies ?? ['Dependencies to be validated during architect review']).map((d) => <li key={d} className="text-sm text-[hsl(var(--muted-foreground))]">• {d}</li>)}</ul>
      )}
    </div>
  );
}

// ── Collapsible child in group modal ──────────────────────────
function CollapsibleChild({ item, defaultOpen }: { item: ScopeItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const glyph = TYPE_GLYPHS[item.type] ?? '•';
  return (
    <div className="border border-[hsl(var(--border))]/60 rounded-md overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[hsl(var(--muted))]/30 transition-colors text-left">
        {open ? <ChevronDown className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" /> : <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />}
        <span className="text-[10px] font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-1.5 py-0.5 rounded">{item.id}</span>
        <span className="text-sm font-medium flex-1 truncate">{item.name}</span>
        {item.stub && <span className="text-[8px] font-semibold uppercase px-1 py-0.5 rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING</span>}
        <span className="text-xs text-[hsl(var(--muted-foreground))]">{glyph} {item.type}</span>
        <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border ml-1', COMPLEXITY_COLORS[item.complexity])}>{item.complexity}</span>
      </button>
      {open && <div className="px-4 pb-4 pt-1"><ItemDetail item={item} /></div>}
    </div>
  );
}

// ── Modal component ───────────────────────────────────────────
export function ScopeDetailModal({ entryId, phase, onClose }: { entryId: string; phase: string; onClose: () => void }) {
  const item = itemMap.get(entryId);
  const group = groupMap.get(entryId);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!item && !group) return null;

  // ── Standalone item modal ──
  if (item) {
    const glyph = TYPE_GLYPHS[item.type] ?? '•';
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/40 animate-[fadeIn_150ms_ease]" />
        <div className="relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto animate-[scaleIn_150ms_ease] p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-2 py-0.5 rounded">{item.id}</span>
                <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[item.complexity])}>{item.complexity}</span>
                {item.stub && <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING REVIEW</span>}
              </div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                <span>{glyph} {item.type}</span>
                <span>•</span>
                <span>{phase}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[hsl(var(--muted))] transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{item.description}</p>
          <ItemDetail item={item} />
        </div>
      </div>
    );
  }

  // ── Group modal ──
  if (group) {
    const children = group.childIds.map((id) => itemMap.get(id)).filter(Boolean) as ScopeItem[];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/40 animate-[fadeIn_150ms_ease]" />
        <div className="relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto animate-[scaleIn_150ms_ease] p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-2 py-0.5 rounded">{group.id}</span>
                <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[group.complexity])}>{group.complexity}</span>
              </div>
              <h2 className="text-lg font-semibold">▦ {group.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                <span>{children.length} items</span><span>•</span><span>{phase}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[hsl(var(--muted))] transition-colors"><X className="w-5 h-5" /></button>
          </div>
          {/* Group rationale */}
          <div className="card bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20 mb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-2">Why these migrate together</p>
            <p className="text-sm leading-relaxed">{group.rationale}</p>
          </div>
          {/* Children */}
          <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-3">ARTIFACTS IN THIS GROUP</p>
          <div className="space-y-2">
            {children.map((child, i) => <CollapsibleChild key={child.id} item={child} defaultOpen={i === 0} />)}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
