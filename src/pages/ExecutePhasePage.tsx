import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { TYPE_GLYPHS, COMPLEXITY_COLORS } from './scope-phases-data';
import { PHASES, getItem, SOURCE_SNIPPETS, DRAFT_SNIPPETS, OUTPUT_TYPES, TEST_RESULTS, CONTEXT_LINES, PHASE_RAIL_ENTRIES, getExplainers, type RailEntry } from './execute-phase-data';
import { ExecuteDeepDiveModal } from './ExecuteDeepDiveModal';

type Stage = 'empty' | 'source' | 'draft' | 'deployed';

// ── Progress bar ──────────────────────────────────────────────
function ProgressBar({ phaseIdx, stage }: { phaseIdx: number; stage: Stage }) {
  const sIdx = stage === 'empty' ? -1 : stage === 'source' ? 0 : stage === 'draft' ? 1 : 2;
  const labels = ['Source Review', 'Generate ARM', 'Deploy & Test'];
  return (
    <div className="card space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Project Progress</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Phase {phaseIdx + 1} of 4</span>
        </div>
        <div className="h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
          <div className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-500" style={{ width: `${(phaseIdx / 4) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2">
          {PHASES.map((p, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={clsx('w-3 h-3 rounded-full border-2', i < phaseIdx ? 'bg-[hsl(var(--accent))] border-[hsl(var(--accent))]' : i === phaseIdx ? 'border-[hsl(var(--accent))] bg-white' : 'border-[hsl(var(--border))] bg-white')} />
              <span className={clsx('text-[10px]', i <= phaseIdx ? 'font-medium' : 'text-[hsl(var(--muted-foreground))]')}>P{p.num}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-3 border-t border-[hsl(var(--border))]/60">
        <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2">Phase {PHASES[phaseIdx].num} — {PHASES[phaseIdx].title} · {sIdx >= 0 ? labels[sIdx] : 'Select artifact'}</p>
        <div className="flex items-center gap-2">
          {labels.map((l, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={clsx('flex-1 h-1.5 rounded-full transition-colors duration-300', i <= sIdx ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--muted))]')} />
              <span className={clsx('text-[10px] shrink-0', i <= sIdx ? 'font-medium' : 'text-[hsl(var(--muted-foreground))]')}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Scope-aware rail ──────────────────────────────────────────
function ScopeAwareRail({ phaseIdx, onPhaseChange, selected, onSelect, checked, onToggleCheck }: {
  phaseIdx: number; onPhaseChange: (i: number) => void; selected: string | null;
  onSelect: (id: string) => void; checked: Set<string>; onToggleCheck: (id: string, children?: string[]) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const entries = PHASE_RAIL_ENTRIES[phaseIdx + 1] ?? [];
  const totalItems = entries.reduce((n, e) => n + (e.kind === 'group' ? (e.childIds?.length ?? 0) : 1), 0);
  const groupCount = entries.filter((e) => e.kind === 'group').length;
  const standaloneCount = entries.filter((e) => e.kind === 'standalone').length;
  const checkedCount = checked.size;

  const toggleExpand = (id: string) => setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="card-sm overflow-y-auto shrink-0 flex flex-col" style={{ width: 270 }}>
      <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-2">ARTIFACTS</p>
      <div className="relative mb-3">
        <select value={phaseIdx} onChange={(e) => onPhaseChange(Number(e.target.value))}
          className="w-full appearance-none bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-md px-3 py-2 pr-8 text-sm font-semibold cursor-pointer hover:border-[hsl(var(--accent))]/50 transition-colors">
          {PHASES.map((p, i) => <option key={i} value={i}>Phase {p.num} — {p.title}</option>)}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))] pointer-events-none" />
      </div>
      <p className="text-[10px] text-[hsl(var(--muted-foreground))] mb-3">{totalItems} items · {standaloneCount > 0 ? `${standaloneCount} standalone · ` : ''}{groupCount} group{groupCount !== 1 ? 's' : ''}</p>

      {/* Bulk selection bar */}
      {checkedCount > 0 && (
        <div className="flex items-center justify-between bg-[hsl(var(--muted))] rounded-md px-3 py-2 mb-3">
          <span className="text-xs font-medium">{checkedCount} selected</span>
          <button className="text-xs font-medium text-[hsl(var(--accent))] hover:underline">Process selected</button>
        </div>
      )}

      {/* Entries */}
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {entries.map((entry) => entry.kind === 'group' ? (
          <GroupRailCard key={entry.id} entry={entry} expanded={expanded.has(entry.id)} onToggleExpand={() => toggleExpand(entry.id)}
            selected={selected} onSelect={onSelect} checked={checked} onToggleCheck={onToggleCheck} />
        ) : (
          <StandaloneRailCard key={entry.id} itemId={entry.id} selected={selected === entry.id}
            onSelect={() => onSelect(entry.id)} checked={checked.has(entry.id)} onToggleCheck={() => onToggleCheck(entry.id)} />
        ))}
      </div>
    </div>
  );
}

function StandaloneRailCard({ itemId, selected, onSelect, checked, onToggleCheck }: {
  itemId: string; selected: boolean; onSelect: () => void; checked: boolean; onToggleCheck: () => void;
}) {
  const item = getItem(itemId);
  if (!item) return null;
  const glyph = TYPE_GLYPHS[item.type] ?? '•';
  return (
    <div onClick={onSelect} className={clsx(
      'rounded-md p-3 cursor-pointer transition-all border',
      selected ? 'bg-[hsl(var(--accent))]/10 border-l-4 border-l-[hsl(var(--accent))] border-[hsl(var(--accent))]/30 shadow-md' : 'border-[hsl(var(--border))] hover:shadow-md hover:border-[hsl(var(--accent))]/30'
    )}>
      <div className="flex items-center gap-2 mb-1">
        <input type="checkbox" checked={checked}
          onChange={(e) => { e.stopPropagation(); onToggleCheck(); }}
          onClick={(e) => e.stopPropagation()}
          className="w-3.5 h-3.5 accent-[hsl(var(--accent))] shrink-0 cursor-pointer" />
        <span className="text-[9px] font-mono font-semibold text-[hsl(var(--accent))]">{itemId}</span>
        {item.stub && <span className="text-[8px] font-semibold uppercase px-1 py-0.5 rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING</span>}
      </div>
      <p className="text-xs font-medium mb-1 truncate" style={{ marginLeft: 22 }}>{item.name}</p>
      <div className="flex items-center justify-between" style={{ marginLeft: 22 }}>
        <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{glyph} {item.type}</span>
        <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[item.complexity])}>{item.complexity}</span>
      </div>
    </div>
  );
}

function GroupRailCard({ entry, expanded, onToggleExpand, selected, onSelect, checked, onToggleCheck }: {
  entry: RailEntry; expanded: boolean; onToggleExpand: () => void; selected: string | null;
  onSelect: (id: string) => void; checked: Set<string>; onToggleCheck: (id: string, children?: string[]) => void;
}) {
  const children = entry.childIds ?? [];
  const allChecked = children.every((c) => checked.has(c));
  const isGroupSelected = children.includes(selected ?? '');

  const handleGroupCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleCheck(entry.id, children);
  };

  return (
    <div className={clsx(
      'rounded-md transition-all border border-l-4 border-l-[hsl(var(--accent))]',
      isGroupSelected ? 'bg-[hsl(var(--accent))]/10 border-[hsl(var(--accent))]/30 shadow-md' : 'border-[hsl(var(--border))] hover:shadow-md hover:border-[hsl(var(--accent))]/30',
      expanded && 'bg-[hsl(var(--accent))]/3'
    )}>
      <div className="p-3 cursor-pointer" onClick={() => onSelect(children[0])}>
        <div className="flex items-center gap-2 mb-1">
          <input type="checkbox" checked={allChecked}
            onChange={() => {}}
            onClick={handleGroupCheck}
            className="w-3.5 h-3.5 accent-[hsl(var(--accent))] shrink-0 cursor-pointer" />
          <span className="text-sm">▦</span>
          <span className="text-[9px] font-mono font-semibold text-[hsl(var(--accent))]">{entry.id}</span>
          <button onClick={(e) => { e.stopPropagation(); onToggleExpand(); }} className="ml-auto p-0.5 hover:bg-[hsl(var(--muted))] rounded transition-colors">
            <ChevronDown className={clsx('w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] transition-transform', !expanded && '-rotate-90')} />
          </button>
        </div>
        <p className="text-xs font-medium mb-1" style={{ marginLeft: 22 }}>{entry.groupName}</p>
        <div className="flex items-center gap-2" style={{ marginLeft: 22 }}>
          <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{children.length} items</span>
          {entry.complexity && <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[entry.complexity])}>{entry.complexity}</span>}
        </div>
      </div>
      {expanded && (
        <div className="border-t border-[hsl(var(--border))]/40 px-3 py-2 space-y-1">
          {children.map((cid) => {
            const item = getItem(cid);
            if (!item) return null;
            const glyph = TYPE_GLYPHS[item.type] ?? '•';
            const isSel = selected === cid;
            return (
              <div key={cid} onClick={(e) => { e.stopPropagation(); onSelect(cid); }}
                className={clsx('flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors', isSel ? 'bg-[hsl(var(--accent))]/15' : 'hover:bg-[hsl(var(--muted))]/50')}>
                <input type="checkbox" checked={checked.has(cid)}
                  onChange={() => {}}
                  onClick={(e) => { e.stopPropagation(); onToggleCheck(cid); }}
                  className="w-3 h-3 accent-[hsl(var(--accent))] shrink-0 cursor-pointer" />
                <span className="text-[9px] font-mono text-[hsl(var(--accent))]">{cid}</span>
                <span className="text-[11px] truncate flex-1">{item.name}</span>
                {item.stub && <span className="text-[7px] font-semibold uppercase px-1 py-0.5 rounded bg-yellow-100 text-yellow-700 border border-yellow-200 shrink-0">PENDING</span>}
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{glyph}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Column components ─────────────────────────────────────────
function EmptyCol({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex-1 flex items-center justify-center text-center p-8 bg-[hsl(var(--muted))]/30 rounded-lg border border-dashed border-[hsl(var(--border))]">
      <div><span className="text-2xl block mb-2">{icon}</span><p className="text-sm text-[hsl(var(--muted-foreground))]">{text}</p></div>
    </div>
  );
}

function ActionCTA({ label, heading, description, buttonText, estimate, onClick }: { label: string; heading: string; description: string; buttonText: string; estimate: string; onClick: () => void }) {
  return (
    <div className="flex-1 p-6 bg-[hsl(var(--accent))]/5 rounded-lg border-2 border-dashed border-[hsl(var(--accent))]/30 animate-[fadeIn_400ms_ease]">
      <div className="text-center max-w-xs mx-auto pt-8">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--accent))] mb-2">{label}</p>
        <h3 className="text-base font-semibold mb-2">{heading}</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">{description}</p>
        <button onClick={onClick} className="px-6 py-2.5 text-sm font-medium rounded-md bg-[hsl(var(--accent))] text-white hover:opacity-90 transition-opacity">{buttonText}</button>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">{estimate}</p>
      </div>
    </div>
  );
}

// ── Thinking animation ────────────────────────────────────────
function ThinkingCol({ steps, duration, onDone }: { steps: string[]; duration: number; onDone: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [pct, setPct] = useState(0);
  const doneRef = useRef(false);
  useEffect(() => {
    const interval = duration / steps.length;
    const timer = setInterval(() => setStepIdx(i => { const next = Math.min(i + 1, steps.length - 1); return next; }), interval);
    const pTimer = setInterval(() => setPct(p => Math.min(p + 2, 100)), duration / 50);
    const done = setTimeout(() => { if (!doneRef.current) { doneRef.current = true; onDone(); } }, duration);
    return () => { clearInterval(timer); clearInterval(pTimer); clearTimeout(done); };
  }, [steps.length, duration, onDone]);
  return (
    <div className="flex-1 card-sm animate-[fadeIn_400ms_ease] flex flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--accent))] mb-4">WORKING…</p>
      <div className="h-1.5 bg-[hsl(var(--muted))] rounded-full overflow-hidden mb-4">
        <div className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-200" style={{ width: `${pct}%` }} />
      </div>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={i} className={clsx('flex items-center gap-2 text-sm transition-colors', i < stepIdx ? 'text-[hsl(var(--muted-foreground))]' : i === stepIdx ? 'font-medium' : 'text-[hsl(var(--muted-foreground))]/40')}>
            {i < stepIdx ? <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" /> : i === stepIdx ? <span className="w-3.5 h-3.5 border-2 border-[hsl(var(--accent))] border-t-transparent rounded-full animate-spin shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-[hsl(var(--border))] shrink-0" />}
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function SourceCol({ artifactId, onDeepDive }: { artifactId: string; onDeepDive: () => void }) {
  const item = getItem(artifactId);
  if (!item) return null;
  const src = SOURCE_SNIPPETS[artifactId] ?? `// Source: ${item.name}\n// ${item.type}`;
  const ctx = CONTEXT_LINES[artifactId] ?? item.description;
  const explainer = getExplainers(artifactId).source;
  return (
    <div className="flex-1 card-sm animate-[fadeIn_400ms_ease] flex flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-2">SOURCE</p>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-1.5 py-0.5 rounded">{artifactId}</span>
        <span className="text-sm font-medium truncate">{item.name}</span>
      </div>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{TYPE_GLYPHS[item.type]} {item.type} · CPQ Managed Package</p>
      <p className="text-sm leading-relaxed mb-3 border-l-[3px] border-[hsl(var(--accent))] pl-4 py-2 font-medium bg-[hsl(var(--accent))]/5 rounded-r-md">{explainer}</p>
      <pre className="bg-[hsl(var(--muted))] rounded-md p-3 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap flex-1 mb-3">{src}</pre>
      <p className="text-[11px] text-[hsl(var(--muted-foreground))] italic mb-2">{ctx}</p>
      <button onClick={onDeepDive} className="self-end text-xs text-[hsl(var(--accent))] hover:underline">Deep dive ▸</button>
    </div>
  );
}

function DraftCol({ artifactId, onDeepDive }: { artifactId: string; onDeepDive: () => void }) {
  const item = getItem(artifactId);
  if (!item) return null;
  const outputType = OUTPUT_TYPES[artifactId] ?? item.type;
  const draft = DRAFT_SNIPPETS[artifactId] ?? `// ARM draft: ${item.name}\n// Target: ${outputType}`;
  const explainer = getExplainers(artifactId).draft;
  return (
    <div className="flex-1 card-sm animate-[fadeIn_400ms_ease] flex flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-2">GENERATED ARM DRAFT</p>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium truncate">{item.name}</span>
        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-green-100 text-green-800 border border-green-200">→ {outputType}</span>
      </div>
      <p className="text-sm leading-relaxed mb-3 border-l-[3px] border-[hsl(var(--accent))] pl-4 py-2 font-medium bg-[hsl(var(--accent))]/5 rounded-r-md">{explainer}</p>
      <pre className="bg-[hsl(var(--muted))] rounded-md p-3 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap flex-1 mb-3">{draft}</pre>
      <p className="text-[11px] text-[hsl(var(--muted-foreground))] mb-2">Maintained: code-only · Test scenarios: {(TEST_RESULTS[artifactId] ?? []).length} generated</p>
      <button onClick={onDeepDive} className="self-end text-xs text-[hsl(var(--accent))] hover:underline">Deep dive ▸</button>
    </div>
  );
}

function DeployCol({ artifactId, onDeepDive }: { artifactId: string; onDeepDive: () => void }) {
  const item = getItem(artifactId);
  if (!item) return null;
  const tests = TEST_RESULTS[artifactId] ?? ['Functional validation', 'Edge case test', 'Integration check'];
  const explainer = getExplainers(artifactId).deployed;
  return (
    <div className="flex-1 card-sm animate-[fadeIn_400ms_ease] flex flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-2">DEPLOY & TEST</p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium">{item.name}</span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded border border-green-200"><CheckCircle className="w-3 h-3" /> Deployed</span>
      </div>
      <p className="text-sm leading-relaxed mb-3 border-l-[3px] border-[hsl(var(--accent))] pl-4 py-2 font-medium bg-[hsl(var(--accent))]/5 rounded-r-md">{explainer}</p>
      <p className="text-sm font-medium text-green-700 mb-3">{tests.length} of {tests.length} tests passed</p>
      <ul className="space-y-1.5 flex-1 mb-3">
        {tests.map((t) => <li key={t} className="flex items-center gap-2 text-sm"><CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" /><span>{t}</span></li>)}
      </ul>
      <p className="text-[11px] text-[hsl(var(--muted-foreground))] italic mb-2">Production deployment requires architect approval</p>
      <button onClick={onDeepDive} className="self-end text-xs text-[hsl(var(--accent))] hover:underline">Deep dive ▸</button>
    </div>
  );
}

// ── Collapsible section ───────────────────────────────────────
function CollapsibleCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-sm">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-2 text-left">
        {open ? <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" /> : <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />}
        <span className="text-sm font-semibold">{title}</span>
      </button>
      {open && <div className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{children}</div>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
const GENERATE_STEPS = ['Reading source…', 'Mapping to ARM equivalents…', 'Generating draft…'];
const DEPLOY_STEPS = ['Pushing to sandbox…', 'Running test scenario 1 of 4…', 'Running test scenario 2 of 4…', 'Validating output…', 'Confirming deployment…'];

export function ExecutePhasePage() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('empty');
  const [modal, setModal] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [thinking, setThinking] = useState<'generate' | 'deploy' | null>(null);

  const phase = PHASES[phaseIdx];

  const handlePhaseChange = useCallback((i: number) => { setPhaseIdx(i); setSelectedArtifact(null); setStage('empty'); setChecked(new Set()); setThinking(null); }, []);
  const handleSelect = useCallback((id: string) => { setSelectedArtifact(id); setStage('source'); setThinking(null); }, []);
  const handleGenerate = useCallback(() => setThinking('generate'), []);
  const handleGenerateDone = useCallback(() => { setThinking(null); setStage('draft'); }, []);
  const handleDeploy = useCallback(() => setThinking('deploy'), []);
  const handleDeployDone = useCallback(() => { setThinking(null); setStage('deployed'); }, []);
  const openModal = useCallback(() => { if (selectedArtifact) setModal(selectedArtifact); }, [selectedArtifact]);

  const handleToggleCheck = useCallback((id: string, children?: string[]) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (children) {
        // Group toggle: if all checked, uncheck all; else check all
        const allChecked = children.every((c) => prev.has(c));
        children.forEach((c) => allChecked ? next.delete(c) : next.add(c));
      } else {
        next.has(id) ? next.delete(id) : next.add(id);
      }
      return next;
    });
  }, []);

  const artName = selectedArtifact ? (getItem(selectedArtifact)?.name ?? '') : '';
  const outputType = selectedArtifact ? (OUTPUT_TYPES[selectedArtifact] ?? '') : '';

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6 page-fade">
      <div>
        <div className="flex items-center gap-3 mb-1"><h1 className="text-2xl font-semibold">Execute Phase</h1></div>
        <p className="text-[hsl(var(--muted-foreground))]">
          Phase {phase.num} — {phase.title} · {phase.itemIds.length} artifacts · {phase.effort} complexity · {phase.time}
        </p>
      </div>

      <ProgressBar phaseIdx={phaseIdx} stage={stage} />

      {/* Rail (LEFT) + Pipeline */}
      <div className="flex gap-4" style={{ minHeight: 480 }}>
        <ScopeAwareRail phaseIdx={phaseIdx} onPhaseChange={handlePhaseChange} selected={selectedArtifact} onSelect={handleSelect} checked={checked} onToggleCheck={handleToggleCheck} />

        {stage === 'empty' ? <EmptyCol icon="◷" text="← Select an artifact from the rail" /> : <SourceCol artifactId={selectedArtifact!} onDeepDive={openModal} />}

        {stage === 'empty' ? <EmptyCol icon="◇" text="Source will appear here" />
          : thinking === 'generate' ? <ThinkingCol steps={GENERATE_STEPS} duration={2500} onDone={handleGenerateDone} />
          : stage === 'source' ? <ActionCTA label="READY TO GENERATE" heading="Generate ARM Migration Draft" description={`RevBrain will produce the ARM equivalent of ${artName}. Target output: ${outputType}.`} buttonText="Generate ARM →" estimate="Estimated: ~30 seconds" onClick={handleGenerate} />
          : <DraftCol artifactId={selectedArtifact!} onDeepDive={openModal} />}

        {(stage === 'empty' || stage === 'source' || thinking === 'generate') ? <EmptyCol icon="◈" text="Generated draft will appear here" />
          : thinking === 'deploy' ? <ThinkingCol steps={DEPLOY_STEPS} duration={4000} onDone={handleDeployDone} />
          : stage === 'draft' ? <ActionCTA label="READY TO DEPLOY" heading="Deploy & Test in Sandbox" description={`Push generated ${outputType} to Vector Systems sandbox and run ${(TEST_RESULTS[selectedArtifact!] ?? []).length} test scenarios.`} buttonText="Deploy & Test →" estimate="Estimated: ~2 minutes" onClick={handleDeploy} />
          : <DeployCol artifactId={selectedArtifact!} onDeepDive={openModal} />}
      </div>

      {/* Collapsible sections */}
      <div className="space-y-3">
        <CollapsibleCard title="Phase Summary"><p>{phase.summary}</p></CollapsibleCard>
        <CollapsibleCard title="Phase Data Migration"><p>{phase.dataMigration}</p></CollapsibleCard>
        <CollapsibleCard title="Implementation Plan"><p>{phase.implPlan}</p></CollapsibleCard>
        <CollapsibleCard title="Learning Feedback"><p>{phase.learningFeedback}</p></CollapsibleCard>
      </div>

      <div className="pt-4 border-t border-[hsl(var(--border))]"></div>

      {modal && <ExecuteDeepDiveModal artifactId={modal} phase={`Phase ${phase.num} — ${phase.title}`} onClose={() => setModal(null)} />}
    </div>
  );
}
