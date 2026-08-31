import { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, ChevronDown, Check, FileDown } from 'lucide-react';

// ── Slide data model ──────────────────────────────────────────

interface SlideItem {
  id: string;
  text: string;
  defaultChecked: boolean;
}

interface SlideColumn {
  title: string;
  items: SlideItem[];
}

interface SlideData {
  number: number;
  title: string;
  topLine?: string;           // always-visible, non-checkable executive line
  columns?: SlideColumn[];    // columned layout (Slide 1)
  items?: SlideItem[];        // flat list (Slides 2-5)
}

const SLIDES: SlideData[] = [
  {
    number: 1,
    title: 'Current CPQ State',
    topLine:
      'Vector Systems runs Salesforce CPQ as a growing, revenue-critical platform with 84 active users, 10,240 quotes, and $147M in closed-won value over 24 months.',
    columns: [
      {
        title: 'Teams & Roles',
        items: [
          { id: '1-t1', text: 'Enterprise Sales: ~12 users, daily activity', defaultChecked: true },
          { id: '1-t2', text: 'Renewals: ~28 users, weekly activity', defaultChecked: true },
          { id: '1-t3', text: 'Deal Desk: ~6 users, daily approval ops', defaultChecked: true },
          { id: '1-t4', text: '16 net-new users over 24 months', defaultChecked: false },
          { id: '1-t5', text: '75% license adoption rate', defaultChecked: false },
        ],
      },
      {
        title: 'Usage Patterns',
        items: [
          { id: '1-u1', text: '10,240 quotes generated over 24 months', defaultChecked: true },
          { id: '1-u2', text: '8.5-day average quote cycle', defaultChecked: true },
          { id: '1-u3', text: 'March 2026 renewal peak (487 quotes)', defaultChecked: true },
          { id: '1-u4', text: '11-14 Deal Desk ops per day', defaultChecked: false },
          { id: '1-u5', text: 'Quote volume up 56% since 2024', defaultChecked: false },
        ],
      },
      {
        title: 'Catalog & Geography',
        items: [
          { id: '1-c1', text: '176 products in 12 families', defaultChecked: true },
          { id: '1-c2', text: 'SmartBytes (2024 launch) = 47% of recent volume', defaultChecked: true },
          { id: '1-c3', text: '5 currencies (AUD, GBP, EUR, NZD, USD)', defaultChecked: false },
          { id: '1-c4', text: '87 dormant products (50% of catalog)', defaultChecked: false },
          { id: '1-c5', text: '20 active price rules, 22 discount schedules', defaultChecked: false },
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'Why Move Now',
    items: [
      { id: '2-1', text: 'Salesforce sunsetting CPQ — EOS confirmed', defaultChecked: true },
      { id: '2-2', text: 'EOL expected 2029-2030, support and updates already frozen', defaultChecked: true },
      { id: '2-3', text: '87% of current functionality maps cleanly to ARM at 96% confidence', defaultChecked: true },
      { id: '2-4', text: 'Q1 renewal peak in March creates natural cutover window', defaultChecked: true },
      { id: '2-5', text: 'Diminishing ecosystem of CPQ-trained partners', defaultChecked: false },
      { id: '2-6', text: 'Technical debt compounding on managed package architecture', defaultChecked: false },
      { id: '2-7', text: 'Customer cannot access AI Agent features without ARM', defaultChecked: false },
    ],
  },
  {
    number: 3,
    title: 'Unlock ARM Capabilities',
    items: [
      { id: '3-1', text: 'Composable products (vs CPQ\'s rigid bundles)', defaultChecked: true },
      { id: '3-2', text: 'AI-native quoting (AI-assisted, conversational)', defaultChecked: true },
      { id: '3-3', text: 'Audit-trail continuity for finance and SOX compliance', defaultChecked: true },
      { id: '3-4', text: 'High-performance pricing engine (server-side, scales to thousands of lines)', defaultChecked: true },
      { id: '3-5', text: 'Constraint-Based Configurator replacing static product rules', defaultChecked: false },
      { id: '3-6', text: 'API-first architecture (vs CPQ\'s managed package)', defaultChecked: false },
      { id: '3-7', text: 'Native Data Cloud integration', defaultChecked: false },
      { id: '3-8', text: 'OmniStudio for bespoke quoting UX', defaultChecked: false },
    ],
  },
  {
    number: 4,
    title: 'RevBrain Scope & Phases',
    items: [
      { id: '4-1', text: 'Phase 1 — Active Quoting (weeks 0-4, Medium effort)', defaultChecked: true },
      { id: '4-2', text: 'Phase 2 — Renewals (weeks 4-9, Medium-High effort)', defaultChecked: true },
      { id: '4-3', text: 'Phase 3 — Data Migration (weeks 9-14, High effort)', defaultChecked: true },
      { id: '4-4', text: 'Phase 4 — Legacy Cleanup (weeks 14-18, Variable effort)', defaultChecked: true },
      { id: '4-5', text: 'Pre-Phase 1: org cleanup (39 orphan features, 87 dormant products)', defaultChecked: false },
      { id: '4-6', text: 'Architect approval gates between phases', defaultChecked: false },
      { id: '4-7', text: 'Parallel validation periods at each cutover', defaultChecked: false },
      { id: '4-8', text: 'Rollback plans for each phase', defaultChecked: false },
    ],
  },
  {
    number: 5,
    title: 'Next Steps',
    items: [
      { id: '5-1', text: 'Schedule kickoff workshop (1-2 weeks out)', defaultChecked: true },
      { id: '5-2', text: 'Architect alignment session with AllCloud + Vector Systems CTO', defaultChecked: true },
      { id: '5-3', text: 'Phase 1 SOW finalization (target signature within 30 days)', defaultChecked: true },
      { id: '5-4', text: 'Sandbox setup and OAuth configuration', defaultChecked: false },
      { id: '5-5', text: 'Stakeholder map: Sales, Renewals, Deal Desk, Finance', defaultChecked: false },
      { id: '5-6', text: 'Pre-migration data cleanup sprint (optional, recommended)', defaultChecked: false },
      { id: '5-7', text: 'Q1 cutover go/no-go review at week 12', defaultChecked: false },
    ],
  },
];

// Build initial checked state from defaults
function buildInitialChecked(): Record<number, Set<string>> {
  const result: Record<number, Set<string>> = {};
  for (const slide of SLIDES) {
    const ids = new Set<string>();
    const allItems = slide.columns
      ? slide.columns.flatMap((c) => c.items)
      : slide.items ?? [];
    for (const item of allItems) {
      if (item.defaultChecked) ids.add(item.id);
    }
    result[slide.number] = ids;
  }
  return result;
}

// ── Checkbox item component ───────────────────────────────────

function CheckItem({
  item,
  checked,
  onToggle,
}: {
  item: SlideItem;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <label className="flex items-start gap-2.5 py-1.5 cursor-pointer group">
      <div
        className={clsx(
          'w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
          checked
            ? 'bg-[hsl(var(--accent))] border-[hsl(var(--accent))]'
            : 'border-[hsl(var(--border))] group-hover:border-[hsl(var(--accent))]/50'
        )}
        onClick={() => onToggle(item.id)}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span
        className={clsx(
          'text-sm leading-relaxed transition-colors',
          checked ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'
        )}
        onClick={() => onToggle(item.id)}
      >
        {item.text}
      </span>
    </label>
  );
}

// ── Left pane: SlideSectionList ───────────────────────────────

function SlideSectionList({
  slide,
  checkedItems,
  onToggle,
}: {
  slide: SlideData;
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  const allItems = slide.columns
    ? slide.columns.flatMap((c) => c.items)
    : slide.items ?? [];
  const checkedCount = allItems.filter((i) => checkedItems.has(i.id)).length;

  return (
    <div className="space-y-4">
      {/* Slide header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          Slide {slide.number} — {slide.title}
        </h3>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">
          {checkedCount} / {allItems.length} selected
        </span>
      </div>

      {/* Top line (non-checkable) */}
      {slide.topLine && (
        <div className="px-3 py-2.5 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/20 rounded-md">
          <p className="text-xs font-semibold text-[hsl(var(--accent))] uppercase tracking-wide mb-1">
            Always included
          </p>
          <p className="text-sm leading-relaxed">{slide.topLine}</p>
        </div>
      )}

      {/* Columned layout (Slide 1) */}
      {slide.columns && (
        <div className="grid grid-cols-1 gap-4">
          {slide.columns.map((col) => (
            <ColumnSection key={col.title} column={col} checkedItems={checkedItems} onToggle={onToggle} />
          ))}
        </div>
      )}

      {/* Flat list (Slides 2-5) */}
      {slide.items && (
        <div className="space-y-0.5">
          {slide.items.map((item) => (
            <CheckItem
              key={item.id}
              item={item}
              checked={checkedItems.has(item.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Column section (accordion) ────────────────────────────────

function ColumnSection({
  column,
  checkedItems,
  onToggle,
}: {
  column: SlideColumn;
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const checkedCount = column.items.filter((i) => checkedItems.has(i.id)).length;

  return (
    <div className="border border-[hsl(var(--border))]/60 rounded-md">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-[hsl(var(--muted))]/50 transition-colors rounded-t-md"
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={clsx('w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] transition-transform', !open && '-rotate-90')}
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            {column.title}
          </span>
        </div>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">{checkedCount}/{column.items.length}</span>
      </button>
      {open && (
        <div className="px-3 pb-2">
          {column.items.map((item) => (
            <CheckItem
              key={item.id}
              item={item}
              checked={checkedItems.has(item.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Right pane: SlidePreview ──────────────────────────────────

function SlidePreview({
  slide,
  checkedItems,
}: {
  slide: SlideData;
  checkedItems: Set<string>;
}) {
  // Gather all checked items for this slide
  const allItems = slide.columns
    ? slide.columns.flatMap((c) => c.items)
    : slide.items ?? [];
  const visibleItems = allItems.filter((i) => checkedItems.has(i.id));

  return (
    <div className="h-full flex flex-col">
      {/* Slide number badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
          Slide Preview
        </span>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">
          {slide.number} / {SLIDES.length}
        </span>
      </div>

      {/* Preview card — simulates a slide */}
      <div className="flex-1 border border-[hsl(var(--border))] rounded-lg bg-white p-6 shadow-sm flex flex-col">
        {/* Slide title */}
        <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-[hsl(var(--border))]/60">
          {slide.title}
        </h3>

        {/* Top line (always shown for Slide 1) */}
        {slide.topLine && (
          <p className="text-sm leading-relaxed mb-4 font-medium">
            {slide.topLine}
          </p>
        )}

        {/* Checked items */}
        {visibleItems.length > 0 ? (
          <ul className="space-y-2 flex-1">
            {visibleItems.map((item) => (
              <li key={item.id} className="flex items-start gap-2 text-sm">
                <span className="text-[hsl(var(--accent))] mt-1 shrink-0">•</span>
                <span className="leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-[hsl(var(--muted-foreground))] italic">
              No items selected — check items in the left pane
            </p>
          </div>
        )}

        {/* Footer branding */}
        <div className="mt-auto pt-4 border-t border-[hsl(var(--border))]/40 flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[hsl(var(--accent))] flex items-center justify-center">
            <span className="text-white text-[7px] font-bold">Q</span>
          </div>
          <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
            RevBrain · Vector Systems Assessment
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Slide navigation ──────────────────────────────────────────

function SlideNav({
  activeSlide,
  onPrev,
  onNext,
}: {
  activeSlide: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const slide = SLIDES[activeSlide - 1];

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrev}
        disabled={activeSlide === 1}
        className={clsx(
          'p-2 rounded-md transition-colors',
          activeSlide === 1
            ? 'text-[hsl(var(--muted-foreground))]/30 cursor-not-allowed'
            : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          Slide {activeSlide} of {SLIDES.length} — {slide.title}
        </span>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((s) => (
            <div
              key={s.number}
              className={clsx(
                'w-2 h-2 rounded-full transition-colors',
                s.number === activeSlide
                  ? 'bg-[hsl(var(--accent))]'
                  : 'bg-[hsl(var(--border))]'
              )}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={activeSlide === SLIDES.length}
        className={clsx(
          'p-2 rounded-md transition-colors',
          activeSlide === SLIDES.length
            ? 'text-[hsl(var(--muted-foreground))]/30 cursor-not-allowed'
            : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]'
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ── DeckExportBar ─────────────────────────────────────────────

function DeckExportBar() {
  return (
    <div className="flex items-center justify-end pt-4 border-t border-[hsl(var(--border))]">
      <button className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-md bg-[hsl(var(--accent))] text-white hover:opacity-90 transition-opacity">
        <FileDown className="w-4 h-4" />
        Download Slides
      </button>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────

export function BuildCasePage() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [checkedItems, setCheckedItems] = useState<Record<number, Set<string>>>(buildInitialChecked);

  const handleToggle = useCallback(
    (id: string) => {
      setCheckedItems((prev) => {
        const current = prev[activeSlide];
        const next = new Set(current);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return { ...prev, [activeSlide]: next };
      });
    },
    [activeSlide]
  );

  const handlePrev = useCallback(() => setActiveSlide((s) => Math.max(1, s - 1)), []);
  const handleNext = useCallback(() => setActiveSlide((s) => Math.min(SLIDES.length, s + 1)), []);

  const slide = SLIDES[activeSlide - 1];
  const currentChecked = checkedItems[activeSlide] ?? new Set<string>();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 page-fade">
      {/* ── Page header ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-semibold">Build Case</h1>
          
        </div>
        <p className="text-[hsl(var(--muted-foreground))]">
          Assemble a customer-facing pitch deck from your scan analysis
        </p>
      </div>

      {/* ── Slide navigation ───────────────────────────────────── */}
      <div className="card">
        <SlideNav activeSlide={activeSlide} onPrev={handlePrev} onNext={handleNext} />
      </div>

      {/* ── 2-pane workbench ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: 480 }}>
        {/* Left pane: checklist */}
        <div className="card overflow-y-auto" style={{ maxHeight: 560 }}>
          <SlideSectionList
            slide={slide}
            checkedItems={currentChecked}
            onToggle={handleToggle}
          />
        </div>

        {/* Right pane: preview */}
        <div className="card">
          <SlidePreview slide={slide} checkedItems={currentChecked} />
        </div>
      </div>

      {/* ── Export bar ──────────────────────────────────────────── */}
      <DeckExportBar />

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-[hsl(var(--border))]">
        
      </div>
    </div>
  );
}
