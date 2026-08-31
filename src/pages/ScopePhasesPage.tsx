import { useState, useMemo, useCallback } from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { DndContext, DragOverlay, closestCorners, useDroppable, type DragStartEvent, type DragEndEvent, type DragOverEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, ChevronRight, LayoutGrid, List, Zap, GripVertical } from 'lucide-react';
import { ScopeDetailModal } from './ScopeDetailModal';
import {
  ALL_ITEMS, ALL_GROUPS, INITIAL_COLUMNS, COLUMN_META, COLUMN_ORDER, PHASE_RATIONALES,
  TYPE_GLYPHS, COMPLEXITY_COLORS, EFFORT_COLORS,
  type ColumnId, type ScopeItem, type ScopeGroup,
} from './scope-phases-data';

const itemMap = new Map(ALL_ITEMS.map((i) => [i.id, i]));
const groupMap = new Map(ALL_GROUPS.map((g) => [g.id, g]));

function isGroup(id: string) { return id.startsWith('GROUP-'); }
function getEntryItemCount(id: string): number {
  const g = groupMap.get(id);
  return g ? g.childIds.length : 1;
}

// ── Standalone ticket card ────────────────────────────────────
function TicketCard({ item, isDragging, onClick }: { item: ScopeItem; isDragging?: boolean; onClick?: () => void }) {
  const glyph = TYPE_GLYPHS[item.type] ?? '•';
  return (
    <div onClick={onClick} className={clsx(
      'bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-md p-3 transition-all',
      isDragging ? 'shadow-lg rotate-[1.5deg] cursor-grabbing opacity-90' : 'shadow-sm hover:shadow-md cursor-grab'
    )}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-1.5 py-0.5 rounded">{item.id}</span>
        <GripVertical className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]/40" />
      </div>
      <p className="text-sm font-medium truncate mb-1">{item.name}{item.stub && <span className="text-[8px] font-semibold uppercase ml-1.5 px-1 py-0.5 rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING</span>}</p>
      <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-1 mb-2">{item.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[hsl(var(--muted-foreground))]">{glyph} {item.type}</span>
        <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[item.complexity])}>{item.complexity}</span>
      </div>
    </div>
  );
}

// ── Group ticket card ─────────────────────────────────────────
function GroupCard({ group, isDragging, onClick }: { group: ScopeGroup; isDragging?: boolean; onClick?: () => void }) {
  const [expanded, setExpanded] = useState(true);
  const children = group.childIds.map((id) => itemMap.get(id)).filter(Boolean) as ScopeItem[];
  return (
    <div onClick={onClick} className={clsx(
      'bg-[hsl(var(--card))] border border-[hsl(var(--border))] border-l-4 border-l-[hsl(var(--accent))] rounded-md p-3 transition-all',
      isDragging ? 'shadow-lg rotate-[1.5deg] cursor-grabbing opacity-90' : 'shadow hover:shadow-md cursor-grab'
    )}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-1.5 py-0.5 rounded">▦ {group.id}</span>
        <GripVertical className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]/40" />
      </div>
      <p className="text-sm font-medium mb-1">{group.name}</p>
      <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-2">{group.summary}</p>
      {/* Sub-items toggle */}
      <button onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }} className="flex items-center gap-1 text-[10px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] mb-1.5">
        {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        {children.length} items
      </button>
      {expanded && (
        <div className="space-y-1 ml-1 border-l-2 border-[hsl(var(--border))]/40 pl-2">
          {children.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5 text-[11px]">
              <span className="font-mono text-[hsl(var(--accent))]">{c.id}</span>
              <span className="text-[hsl(var(--muted-foreground))] truncate">· {c.name} · {TYPE_GLYPHS[c.type]}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[hsl(var(--border))]/40">
        <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{children.length} items</span>
        <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[group.complexity])}>{group.complexity}</span>
      </div>
    </div>
  );
}

// ── Entry renderer ────────────────────────────────────────────
function EntryCard({ id, isDragging, onClick }: { id: string; isDragging?: boolean; onClick?: () => void }) {
  const group = groupMap.get(id);
  if (group) return <GroupCard group={group} isDragging={isDragging} onClick={onClick} />;
  const item = itemMap.get(id);
  if (item) return <TicketCard item={item} isDragging={isDragging} onClick={onClick} />;
  return null;
}

// ── Sortable card wrapper ─────────────────────────────────────
function SortableCard({ id, onClick }: { id: string; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.3 : 1 };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isOver && !isDragging && <div className="h-0.5 bg-[hsl(var(--accent))] rounded-full mb-1 animate-pulse" />}
      <EntryCard id={id} onClick={onClick} />
    </div>
  );
}

// ── Droppable column ──────────────────────────────────────────
function DroppableColumn({ columnId, entryIds, isOver, onCardClick }: { columnId: ColumnId; entryIds: string[]; isOver: boolean; onCardClick: (id: string, phase: string) => void }) {
  const { setNodeRef } = useDroppable({ id: columnId });
  const meta = COLUMN_META[columnId];
  const totalItems = entryIds.reduce((n, id) => n + getEntryItemCount(id), 0);
  return (
    <div className={clsx(
      'rounded-lg border flex flex-col min-w-0',
      isOver ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/5' : 'border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20',
      columnId === 'unassigned' && !isOver && 'border-dashed'
    )}>
      <div className="px-3 py-2.5 border-b border-[hsl(var(--border))]/60">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold truncate">{meta.label}</span>
          <span className="text-[10px] font-semibold bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] px-1.5 py-0.5 rounded-full ml-1 shrink-0">{totalItems}</span>
        </div>
        {meta.effort && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className={clsx('text-[9px] font-semibold px-1 py-0.5 rounded border', EFFORT_COLORS[meta.effort])}>{meta.effort}</span>
            <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{meta.time}</span>
          </div>
        )}
      </div>
      <div ref={setNodeRef} className="flex-1 p-2 space-y-2 overflow-y-auto" style={{ minHeight: 300, maxHeight: 520 }}>
        <SortableContext items={entryIds} strategy={verticalListSortingStrategy}>
          {entryIds.map((id) => <SortableCard key={id} id={id} onClick={() => onCardClick(id, meta.label)} />)}
        </SortableContext>
        {entryIds.length === 0 && <div className="flex items-center justify-center h-20 text-xs text-[hsl(var(--muted-foreground))] italic">Drop items here</div>}
      </div>
    </div>
  );
}

// ── Board view ────────────────────────────────────────────────
function BoardView({ columns, setColumns, onCardClick }: { columns: Record<ColumnId, string[]>; setColumns: React.Dispatch<React.SetStateAction<Record<ColumnId, string[]>>>; onCardClick: (id: string, phase: string) => void }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<ColumnId | null>(null);

  function findCol(id: string): ColumnId | null {
    for (const c of COLUMN_ORDER) if (columns[c].includes(id)) return c;
    return null;
  }

  const handleStart = (e: DragStartEvent) => setActiveId(e.active.id as string);
  const handleOver = (e: DragOverEvent) => {
    const overId = e.over?.id as string | undefined;
    if (!overId) { setOverCol(null); return; }
    setOverCol(COLUMN_ORDER.includes(overId as ColumnId) ? overId as ColumnId : findCol(overId));
  };

  const handleEnd = (e: DragEndEvent) => {
    setActiveId(null); setOverCol(null);
    const { active, over } = e;
    if (!over) return;
    const itemId = active.id as string;
    const overId = over.id as string;
    const srcCol = findCol(itemId);
    if (!srcCol) return;

    // Target column
    let tgtCol: ColumnId;
    if (COLUMN_ORDER.includes(overId as ColumnId)) { tgtCol = overId as ColumnId; }
    else { const f = findCol(overId); if (!f) return; tgtCol = f; }

    if (srcCol === tgtCol) {
      // Reorder within column
      setColumns((prev) => {
        const arr = [...prev[srcCol]];
        const fromIdx = arr.indexOf(itemId);
        const toIdx = arr.indexOf(overId);
        if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return prev;
        arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, itemId);
        return { ...prev, [srcCol]: arr };
      });
    } else {
      // Cross-column move
      setColumns((prev) => {
        const src = prev[srcCol].filter((id) => id !== itemId);
        const tgt = [...prev[tgtCol]];
        const insertIdx = tgt.indexOf(overId);
        if (insertIdx >= 0) tgt.splice(insertIdx, 0, itemId);
        else tgt.push(itemId);
        return { ...prev, [srcCol]: src, [tgtCol]: tgt };
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragStart={handleStart} onDragOver={handleOver} onDragEnd={handleEnd}>
      <div className="grid grid-cols-5 gap-3">
        {COLUMN_ORDER.map((col) => (
          <DroppableColumn key={col} columnId={col} entryIds={columns[col]} isOver={overCol === col} onCardClick={onCardClick} />
        ))}
      </div>
      <DragOverlay>{activeId && <EntryCard id={activeId} isDragging />}</DragOverlay>
    </DndContext>
  );
}

// ── List view ─────────────────────────────────────────────────
function ListView({ columns }: { columns: Record<ColumnId, string[]> }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const rows = useMemo(() => {
    const r: { id: string; phase: string; isChild?: boolean }[] = [];
    for (const col of COLUMN_ORDER) {
      const phase = COLUMN_META[col].label;
      for (const id of columns[col]) {
        r.push({ id, phase });
        if (isGroup(id) && expanded.has(id)) {
          const g = groupMap.get(id);
          g?.childIds.forEach((cid) => r.push({ id: cid, phase, isChild: true }));
        }
      }
    }
    return r;
  }, [columns, expanded]);

  return (
    <div className="card overflow-hidden p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
            {['', 'ID', 'Name', 'Description', 'Type', 'Complexity', 'Phase'].map((h) => (
              <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, phase, isChild }) => {
            const g = groupMap.get(id);
            const item = itemMap.get(id);
            const entry = g || item;
            if (!entry) return null;
            const isGrp = !!g;
            return (
              <tr key={id + (isChild ? '-child' : '')} className={clsx('border-b border-[hsl(var(--border))]/50 hover:bg-[hsl(var(--muted))]/30 transition-colors', isChild && 'bg-[hsl(var(--muted))]/10')}>
                <td className="px-3 py-2 w-8">
                  {isGrp && <button onClick={() => toggle(id)} className="p-0.5">{expanded.has(id) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}</button>}
                </td>
                <td className="px-3 py-2 font-mono text-xs font-semibold text-[hsl(var(--accent))]">{isChild ? '  ↳ ' : ''}{id}</td>
                <td className="px-3 py-2 text-xs font-medium max-w-[180px] truncate">{isGrp ? `▦ ${g!.name}` : <>{(item as ScopeItem).name}{(item as ScopeItem).stub && <span className="text-[8px] font-semibold uppercase ml-1.5 px-1 py-0.5 rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING</span>}</>}</td>
                <td className="px-3 py-2 text-xs text-[hsl(var(--muted-foreground))] max-w-[220px] truncate">{isGrp ? g!.summary : (item as ScopeItem).description}</td>
                <td className="px-3 py-2 text-xs text-[hsl(var(--muted-foreground))]">{isGrp ? `${g!.childIds.length} items` : `${TYPE_GLYPHS[(item as ScopeItem).type]} ${(item as ScopeItem).type}`}</td>
                <td className="px-3 py-2"><span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[entry.complexity])}>{entry.complexity}</span></td>
                <td className="px-3 py-2 text-xs">{phase}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Phase rationale card ──────────────────────────────────────
function RationaleCard({ phase }: { phase: typeof PHASE_RATIONALES[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-sm">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between text-left">
        <div className="flex items-center gap-2">
          {open ? <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" /> : <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />}
          <span className="text-sm font-semibold">Phase {phase.num} — {phase.title}</span>
          <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', EFFORT_COLORS[phase.effort])}>{phase.effort}</span>
        </div>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">{phase.time}</span>
      </button>
      {open && (
        <div className="mt-4 space-y-4">
          <div><p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">{phase.whyLabel}</p><ul className="space-y-1">{phase.whyItems.map((w) => <li key={w} className="text-sm text-[hsl(var(--muted-foreground))]">• {w}</li>)}</ul></div>
          {phase.includes && phase.excludes && (
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-1">INCLUDES</p><ul className="space-y-0.5">{phase.includes.map((i) => <li key={i} className="text-sm text-[hsl(var(--muted-foreground))]">• {i}</li>)}</ul></div>
              <div><p className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-1">EXCLUDES</p><ul className="space-y-0.5">{phase.excludes.map((e) => <li key={e} className="text-sm text-[hsl(var(--muted-foreground))]">• {e}</li>)}</ul></div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            {[{ label: 'AUTONOMOUS', items: phase.autonomous, color: 'text-[hsl(var(--accent))]' }, { label: 'ARCHITECT', items: phase.architect, color: 'text-orange-600' }, { label: 'CLIENT', items: phase.client, color: 'text-blue-600' }].map((col) => (
              <div key={col.label}><p className={clsx('text-xs font-semibold uppercase tracking-wide mb-1', col.color)}>{col.label}</p><ul className="space-y-0.5">{col.items.map((i) => <li key={i} className="text-sm text-[hsl(var(--muted-foreground))]">• {i}</li>)}</ul></div>
            ))}
          </div>
          <div className="pt-2 border-t border-[hsl(var(--border))]/60"><span className="text-xs text-[hsl(var(--muted-foreground))] mr-2">Recommended action:</span><button className="px-3 py-1.5 text-xs font-medium rounded-md bg-[hsl(var(--accent))] text-white hover:opacity-90">{phase.actionLabel}</button></div>
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export function ScopePhasesPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<'board' | 'list'>('board');
  const [columns, setColumns] = useState<Record<ColumnId, string[]>>(() => ({ ...INITIAL_COLUMNS }));
  const [modal, setModal] = useState<{ id: string; phase: string } | null>(null);

  const totalItems = useMemo(() => COLUMN_ORDER.reduce((n, c) => n + columns[c].reduce((m, id) => m + getEntryItemCount(id), 0), 0), [columns]);
  const onCardClick = useCallback((id: string, phase: string) => setModal({ id, phase }), []);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6 page-fade">
      <div>
        <div className="flex items-center gap-3 mb-1"><h1 className="text-2xl font-semibold">Scope Phases</h1></div>
        <p className="text-[hsl(var(--muted-foreground))]">AI-recommended phase breakdown with architect validation gates</p>
      </div>

      <div className="card bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20">
        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-4 rounded bg-[hsl(var(--accent))] flex items-center justify-center"><span className="text-white text-[8px] font-bold">V</span></div><span className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">AI RECOMMENDATION</span></div>
        <p className="text-sm"><strong>4 phases</strong> · <strong>{totalItems} items</strong> · <strong>14–18 weeks</strong></p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Architect approval required.</p>
      </div>




      {view === 'board' ? <BoardView columns={columns} setColumns={setColumns} onCardClick={onCardClick} /> : <ListView columns={columns} />}

      <div className="flex items-center gap-4"><hr className="flex-1 border-[hsl(var(--border))]" /><span className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">AI Phase Rationale</span><hr className="flex-1 border-[hsl(var(--border))]" /></div>
      <div className="space-y-3">{PHASE_RATIONALES.map((p) => <RationaleCard key={p.num} phase={p} />)}</div>

      <div className="card"><p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-3">ACTIONS</p><div className="flex flex-wrap gap-2">{['Accept proposed phases', 'Edit phase', 'Generate phase-level LOE', 'Generate stakeholder list', 'Approve scope and send to SOW'].map((l) => (<button key={l} className="px-4 py-2 text-sm font-medium rounded-md border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">{l}</button>))}<button onClick={() => navigate('/migration/execute-phase')} className="px-4 py-2 text-sm font-medium rounded-md bg-[hsl(var(--accent))] text-white hover:opacity-90">Open Phase 1 in Execute →</button></div></div>

      <p className="text-xs italic text-[hsl(var(--muted-foreground))]">Estimates are AI-generated and require architect approval before SOW commitment.</p>
      <div className="pt-4 border-t border-[hsl(var(--border))]"></div>

      {modal && <ScopeDetailModal entryId={modal.id} phase={modal.phase} onClose={() => setModal(null)} />}
    </div>
  );
}
