// ── Ongoing Ops — User Requests ─────────────────────────────────────
// Kanban board of business/admin requests captured across teams.
// Reuses the visual patterns from MigrateIQ ScopePhasesPage:
// column headers with item counts, ticket-style cards, detail modal,
// and dnd-kit drag-and-drop.

import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  X,
  ChevronRight,
  User,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

/* ── Types ──────────────────────────────────────────────────────────── */

type LaneId = 'new' | 'needs-context' | 'ready' | 'completed';

type Impact = 'High' | 'Medium' | 'Low';

interface UserRequest {
  id: string;
  title: string;
  requester: string;
  team: string;
  age: string;
  description: string;
  impact: Impact;
  tags: string[];
  /** present only in needs-context lane */
  missingContext?: string;
  /** present only in completed lane */
  completedAgo?: string;
}

/* ── Lane metadata ──────────────────────────────────────────────────── */

const LANE_META: Record<LaneId, { label: string; icon: typeof Clock; color: string }> = {
  'new': { label: 'New Requests', icon: MessageSquare, color: 'text-blue-600' },
  'needs-context': { label: 'Needs Context', icon: AlertCircle, color: 'text-amber-600' },
  'ready': { label: 'Ready to Implement', icon: Zap, color: 'text-emerald-600' },
  'completed': { label: 'Recently Completed', icon: CheckCircle2, color: 'text-[hsl(var(--muted-foreground))]' },
};

const LANE_ORDER: LaneId[] = ['new', 'needs-context', 'ready', 'completed'];

const IMPACT_COLORS: Record<Impact, string> = {
  High: 'bg-orange-100 text-orange-800 border-orange-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Low: 'bg-green-100 text-green-800 border-green-200',
};

/* ── Request data ───────────────────────────────────────────────────── */

const ALL_REQUESTS: UserRequest[] = [
  // ── New Requests ──
  {
    id: 'REQ-101',
    title: 'Update EMEA enterprise quote template',
    requester: 'Maya',
    team: 'EMEA Sales',
    age: '2 days ago',
    description: 'Add regional terms and remove the US-only warranty section.',
    impact: 'Medium',
    tags: ['Quote Template', 'EMEA'],
  },
  {
    id: 'REQ-102',
    title: 'Add Enterprise Services Bundle',
    requester: 'Daniel',
    team: 'Product',
    age: '3 days ago',
    description: 'Package implementation, premium support and training together.',
    impact: 'High',
    tags: ['Products', 'Bundle', 'Pricing'],
  },
  {
    id: 'REQ-103',
    title: 'Allow Net 30 payment terms for strategic accounts',
    requester: 'Rachel',
    team: 'Finance',
    age: '4 days ago',
    description: 'Default is Net 60 today. Approved strategic accounts should be eligible for Net 30.',
    impact: 'High',
    tags: ['Payment Terms', 'Approval'],
  },
  // ── Needs Context ──
  {
    id: 'REQ-201',
    title: 'Change renewal uplift for Enterprise customers',
    requester: 'CS Leadership',
    team: 'CS',
    age: '5 days ago',
    description: 'Use 5% instead of 7% for selected multi-year renewals.',
    impact: 'High',
    tags: ['Renewal', 'Pricing'],
    missingContext: 'Which customer segments qualify?',
  },
  {
    id: 'REQ-202',
    title: 'Add Premium Support to existing bundles',
    requester: 'Product Operations',
    team: 'Product',
    age: '6 days ago',
    description: 'Include premium support as a line item in existing bundles.',
    impact: 'Medium',
    tags: ['Products', 'Bundles'],
    missingContext: 'Optional or required dependency?',
  },
  {
    id: 'REQ-203',
    title: 'Simplify low-risk discount approval',
    requester: 'Sales Leadership',
    team: 'Sales',
    age: '7 days ago',
    description: 'Reps should not wait for Finance on low-risk exceptions.',
    impact: 'High',
    tags: ['Discount', 'Approval'],
    missingContext: 'Required margin threshold?',
  },
  // ── Ready to Implement ──
  {
    id: 'REQ-301',
    title: 'Add approval escalation for margin-risk deals',
    requester: 'Finance',
    team: 'Finance',
    age: '8 days ago',
    description: 'Auto-escalate when margin falls below threshold for high-value deals.',
    impact: 'High',
    tags: ['Approval', 'Automation'],
  },
  {
    id: 'REQ-302',
    title: 'Monitor stale Awaiting Order Results opportunities',
    requester: 'Sales Operations',
    team: 'Sales Ops',
    age: '10 days ago',
    description: 'Continuously flag opportunities stuck in Awaiting Order Results beyond SLA.',
    impact: 'Medium',
    tags: ['Opportunity', 'Automation'],
  },
  {
    id: 'REQ-303',
    title: 'Update contracted pricing for strategic accounts',
    requester: 'Deal Desk',
    team: 'Deal Desk',
    age: '11 days ago',
    description: 'Refresh contracted pricing tables for top-tier accounts.',
    impact: 'Medium',
    tags: ['Pricing', 'Accounts'],
  },
  // ── Recently Completed ──
  {
    id: 'REQ-401',
    title: 'Add approval evidence to Slack',
    requester: 'Deal Desk',
    team: 'Deal Desk',
    age: '14 days ago',
    description: 'Post approval evidence and margin context to Slack channel automatically.',
    impact: 'Medium',
    tags: ['Agentforce', 'Approval'],
    completedAgo: '4 days ago',
  },
  {
    id: 'REQ-402',
    title: 'Validate quote-to-opportunity state automatically',
    requester: 'RevOps',
    team: 'RevOps',
    age: '18 days ago',
    description: 'Auto-detect and correct inconsistent quote/opportunity state.',
    impact: 'High',
    tags: ['Automation', 'Quote'],
    completedAgo: '9 days ago',
  },
  {
    id: 'REQ-403',
    title: 'Capture approval rationale in Knowledge Engine',
    requester: 'Finance',
    team: 'Finance',
    age: '22 days ago',
    description: 'Feed approval decisions and rationale into the Knowledge Engine for future recommendations.',
    impact: 'Medium',
    tags: ['Knowledge', 'Approval'],
    completedAgo: '13 days ago',
  },
];

const requestMap = new Map(ALL_REQUESTS.map((r) => [r.id, r]));

const INITIAL_LANES: Record<LaneId, string[]> = {
  'new': ['REQ-101', 'REQ-102', 'REQ-103'],
  'needs-context': ['REQ-201', 'REQ-202', 'REQ-203'],
  'ready': ['REQ-301', 'REQ-302', 'REQ-303'],
  'completed': ['REQ-401', 'REQ-402', 'REQ-403'],
};

/* ── Detail data (expanded per-request context for modal) ──────────── */

interface RequestDetail {
  businessReason: string;
  revbrainKnows: string[];
  affectedProcess: string;
  affectedAreas: string[];
  recommendation: string;
}

const REQUEST_DETAILS: Record<string, RequestDetail> = {
  'REQ-101': {
    businessReason: 'EMEA enterprise deals require regional compliance terms. The current US-only warranty section has caused client pushback in EU markets.',
    revbrainKnows: ['Current template has 3 US-specific sections', 'EMEA regional terms documented in compliance repo', 'No pricing logic affected'],
    affectedProcess: 'Quote & Pricing',
    affectedAreas: ['Quote Template', 'Document Generation'],
    recommendation: 'Straightforward template update. RevBrain can generate the modified template for review.',
  },
  'REQ-102': {
    businessReason: 'Product wants to package implementation, premium support, and training as a single bundle to simplify quoting and improve attach rates.',
    revbrainKnows: ['All 3 products exist as standalone SKUs', 'Bundle pricing rules need configuration', 'Similar bundle pattern exists for SMB tier'],
    affectedProcess: 'Quote & Pricing',
    affectedAreas: ['Products', 'Bundle Configuration', 'Pricing Rules'],
    recommendation: 'Create new bundle product with optional components. Pricing rules can mirror existing SMB pattern.',
  },
  'REQ-103': {
    businessReason: 'Default payment terms are Net 60. Finance has approved Net 30 for strategic accounts to accelerate deal velocity.',
    revbrainKnows: ['Current default: Net 60 for all tiers', 'Strategic account list maintained in CRM', 'Approval matrix needs new payment-term exception path', 'No pricing impact — terms only'],
    affectedProcess: 'Approval',
    affectedAreas: ['Payment Terms', 'Approval Rules', 'Account Classification'],
    recommendation: 'Add account-tier check before term assignment. Route Net 30 through existing approval flow with Finance visibility.',
  },
  'REQ-201': {
    businessReason: 'CS Leadership wants to reduce renewal uplift from 7% to 5% for multi-year Enterprise renewals to improve retention.',
    revbrainKnows: ['Current uplift: 7% across all Enterprise renewals', 'Renewal pricing rule identified', 'Need clarification on segment eligibility'],
    affectedProcess: 'Quote & Pricing',
    affectedAreas: ['Renewal Pricing', 'Customer Segmentation'],
    recommendation: 'Pending context: which customer segments qualify. Once confirmed, RevBrain can update the renewal pricing rule.',
  },
  'REQ-202': {
    businessReason: 'Product Operations wants Premium Support included in existing product bundles to increase attach rate.',
    revbrainKnows: ['Premium Support exists as standalone SKU', 'Bundle configuration identified', 'Dependency type unclear'],
    affectedProcess: 'Quote & Pricing',
    affectedAreas: ['Products', 'Bundle Configuration'],
    recommendation: 'Pending context: should Premium Support be optional or required? This affects bundle validation rules.',
  },
  'REQ-203': {
    businessReason: 'Sales reps are waiting days for Finance approval on low-risk discount exceptions. Leadership wants to streamline.',
    revbrainKnows: ['Current flow routes all exceptions to Finance', 'Discount distribution analysis available', 'Need margin threshold to define "low-risk"'],
    affectedProcess: 'Approval',
    affectedAreas: ['Discount Rules', 'Approval Flow'],
    recommendation: 'Pending context: required margin threshold. Once defined, RevBrain can create an auto-approve path for low-risk exceptions.',
  },
  'REQ-301': {
    businessReason: 'Finance wants automatic escalation when deal margin falls below acceptable thresholds on high-value opportunities.',
    revbrainKnows: ['Margin threshold rules identified from migration', 'Escalation path exists but is manual today', 'Can integrate with existing approval flow', 'RevBrain context complete'],
    affectedProcess: 'Approval',
    affectedAreas: ['Approval Automation', 'Margin Rules', 'Escalation'],
    recommendation: 'Ready to implement. Add automated escalation trigger on margin-risk detection with approval context package.',
  },
  'REQ-302': {
    businessReason: 'Sales Operations wants continuous monitoring of opportunities stuck in Awaiting Order Results beyond SLA.',
    revbrainKnows: ['SLA thresholds defined during migration', 'Historical stale-opportunity patterns analyzed', 'Owner identification logic ready', 'RevBrain context complete'],
    affectedProcess: 'Customer Decision',
    affectedAreas: ['Opportunity Monitoring', 'SLA Automation'],
    recommendation: 'Ready to implement. Deploy Awaiting Results Monitor with SLA alerting and owner notification.',
  },
  'REQ-303': {
    businessReason: 'Deal Desk needs contracted pricing tables refreshed for strategic accounts after recent pricing changes.',
    revbrainKnows: ['Strategic account list available', 'Contracted pricing tables identified', 'Pricing delta analysis complete', 'RevBrain context complete'],
    affectedProcess: 'Quote & Pricing',
    affectedAreas: ['Pricing', 'Account Management'],
    recommendation: 'Ready to implement. Update contracted pricing records with new rates and validate against quote history.',
  },
  'REQ-401': {
    businessReason: 'Deal Desk wanted approval evidence and margin context posted to Slack automatically when approvals complete.',
    revbrainKnows: ['Implemented via Agentforce action', 'Posts to #deal-desk-approvals channel', 'Includes margin, pricing evidence, and approval decision'],
    affectedProcess: 'Approval',
    affectedAreas: ['Agentforce', 'Notifications'],
    recommendation: 'Completed. Approval evidence now posts to Slack automatically.',
  },
  'REQ-402': {
    businessReason: 'RevOps reported recurring inconsistencies between quote and opportunity state.',
    revbrainKnows: ['Root cause: manual state transitions', 'Validation automation deployed', 'Catches mismatches within minutes'],
    affectedProcess: 'Close',
    affectedAreas: ['Automation', 'Data Integrity'],
    recommendation: 'Completed. Quote/opportunity state validated automatically.',
  },
  'REQ-403': {
    businessReason: 'Finance wanted approval decisions and rationale captured in Knowledge Engine for future AI recommendations.',
    revbrainKnows: ['Rationale capture integrated into approval flow', 'Feeds Knowledge Engine pattern library', 'Improves future approval recommendations'],
    affectedProcess: 'Approval',
    affectedAreas: ['Knowledge Engine', 'Approval Flow'],
    recommendation: 'Completed. Approval rationale now feeds the Knowledge Engine.',
  },
};

/* ── Persistence helper ─────────────────────────────────────────────── */

const SELECTED_REQUEST_KEY = 'revbrain-ongoing-selected-request';

function persistSelectedRequest(request: UserRequest) {
  localStorage.setItem(SELECTED_REQUEST_KEY, JSON.stringify(request));
}

/* ── Card component ─────────────────────────────────────────────────── */

function RequestCard({
  request,
  isDragging,
  onClick,
}: {
  request: UserRequest;
  isDragging?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-md p-3 transition-all',
        isDragging
          ? 'shadow-lg rotate-[1.5deg] cursor-grabbing opacity-90'
          : 'shadow-sm hover:shadow-md cursor-grab',
      )}
    >
      {/* Header: ID + grip */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-1.5 py-0.5 rounded">
          {request.id}
        </span>
        <GripVertical className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]/40" />
      </div>

      {/* Title */}
      <p className="text-sm font-medium leading-snug mb-1">{request.title}</p>

      {/* Description */}
      <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2 mb-2 leading-relaxed">
        {request.description}
      </p>

      {/* Missing context callout */}
      {request.missingContext && (
        <div className="flex items-start gap-1.5 px-2 py-1.5 bg-amber-50 border border-amber-200/60 rounded mb-2">
          <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
          <span className="text-[10px] text-amber-700 font-medium leading-snug">
            {request.missingContext}
          </span>
        </div>
      )}

      {/* Completed callout */}
      {request.completedAgo && (
        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-emerald-50 border border-emerald-200/60 rounded mb-2">
          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
          <span className="text-[10px] text-emerald-700 font-medium">
            Completed {request.completedAgo}
          </span>
        </div>
      )}

      {/* Requester + impact */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
          <User className="w-3 h-3 shrink-0" />
          <span>
            {request.requester} · {request.team}
          </span>
        </div>
        <span
          className={clsx(
            'text-[9px] font-semibold px-1.5 py-0.5 rounded border',
            IMPACT_COLORS[request.impact],
          )}
        >
          {request.impact}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {request.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Sortable wrapper ───────────────────────────────────────────────── */

function SortableRequestCard({
  id,
  onClick,
}: {
  id: string;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };
  const request = requestMap.get(id);
  if (!request) return null;
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isOver && !isDragging && (
        <div className="h-0.5 bg-[hsl(var(--accent))] rounded-full mb-1 animate-pulse" />
      )}
      <RequestCard request={request} onClick={onClick} />
    </div>
  );
}

/* ── Droppable lane ─────────────────────────────────────────────────── */

function DroppableLane({
  laneId,
  entryIds,
  isOver,
  onCardClick,
}: {
  laneId: LaneId;
  entryIds: string[];
  isOver: boolean;
  onCardClick: (id: string) => void;
}) {
  const { setNodeRef } = useDroppable({ id: laneId });
  const meta = LANE_META[laneId];
  const Icon = meta.icon;
  return (
    <div
      className={clsx(
        'rounded-lg border flex flex-col min-w-0',
        isOver
          ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/5'
          : 'border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20',
      )}
    >
      <div className="px-3 py-2.5 border-b border-[hsl(var(--border))]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Icon className={clsx('w-3.5 h-3.5', meta.color)} />
            <span className="text-xs font-semibold truncate">{meta.label}</span>
          </div>
          <span className="text-[10px] font-semibold bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] px-1.5 py-0.5 rounded-full ml-1 shrink-0">
            {entryIds.length}
          </span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className="flex-1 p-2 space-y-2 overflow-y-auto"
        style={{ minHeight: 280, maxHeight: 520 }}
      >
        <SortableContext items={entryIds} strategy={verticalListSortingStrategy}>
          {entryIds.map((id) => (
            <SortableRequestCard
              key={id}
              id={id}
              onClick={() => onCardClick(id)}
            />
          ))}
        </SortableContext>
        {entryIds.length === 0 && (
          <div className="flex items-center justify-center h-20 text-xs text-[hsl(var(--muted-foreground))] italic">
            No requests
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Board ──────────────────────────────────────────────────────────── */

function KanbanBoard({
  lanes,
  setLanes,
  onCardClick,
}: {
  lanes: Record<LaneId, string[]>;
  setLanes: React.Dispatch<React.SetStateAction<Record<LaneId, string[]>>>;
  onCardClick: (id: string) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overLane, setOverLane] = useState<LaneId | null>(null);

  function findLane(id: string): LaneId | null {
    for (const l of LANE_ORDER) if (lanes[l].includes(id)) return l;
    return null;
  }

  const handleStart = (e: DragStartEvent) => setActiveId(e.active.id as string);
  const handleOver = (e: DragOverEvent) => {
    const overId = e.over?.id as string | undefined;
    if (!overId) {
      setOverLane(null);
      return;
    }
    setOverLane(
      LANE_ORDER.includes(overId as LaneId)
        ? (overId as LaneId)
        : findLane(overId),
    );
  };

  const handleEnd = (e: DragEndEvent) => {
    setActiveId(null);
    setOverLane(null);
    const { active, over } = e;
    if (!over) return;
    const itemId = active.id as string;
    const overId = over.id as string;
    const srcLane = findLane(itemId);
    if (!srcLane) return;

    let tgtLane: LaneId;
    if (LANE_ORDER.includes(overId as LaneId)) {
      tgtLane = overId as LaneId;
    } else {
      const f = findLane(overId);
      if (!f) return;
      tgtLane = f;
    }

    if (srcLane === tgtLane) {
      setLanes((prev) => {
        const arr = [...prev[srcLane]];
        const fromIdx = arr.indexOf(itemId);
        const toIdx = arr.indexOf(overId);
        if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return prev;
        arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, itemId);
        return { ...prev, [srcLane]: arr };
      });
    } else {
      setLanes((prev) => {
        const src = prev[srcLane].filter((id) => id !== itemId);
        const tgt = [...prev[tgtLane]];
        const insertIdx = tgt.indexOf(overId);
        if (insertIdx >= 0) tgt.splice(insertIdx, 0, itemId);
        else tgt.push(itemId);
        return { ...prev, [srcLane]: src, [tgtLane]: tgt };
      });
    }
  };

  const activeRequest = activeId ? requestMap.get(activeId) : null;

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleStart}
      onDragOver={handleOver}
      onDragEnd={handleEnd}
    >
      <div className="grid grid-cols-4 gap-3">
        {LANE_ORDER.map((lane) => (
          <DroppableLane
            key={lane}
            laneId={lane}
            entryIds={lanes[lane]}
            isOver={overLane === lane}
            onCardClick={onCardClick}
          />
        ))}
      </div>
      <DragOverlay>
        {activeRequest && <RequestCard request={activeRequest} isDragging />}
      </DragOverlay>
    </DndContext>
  );
}

/* ── Detail modal ───────────────────────────────────────────────────── */

function RequestDetailModal({
  requestId,
  laneId,
  onClose,
  onImplement,
}: {
  requestId: string;
  laneId: LaneId;
  onClose: () => void;
  onImplement: (request: UserRequest) => void;
}) {
  const request = requestMap.get(requestId);
  const detail = REQUEST_DETAILS[requestId];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!request || !detail) return null;

  const isReady = laneId === 'ready';
  const isNeedsContext = laneId === 'needs-context';
  const isCompleted = laneId === 'completed';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 animate-[fadeIn_150ms_ease]" />
      <div
        className="relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto animate-[scaleIn_150ms_ease] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-2 py-0.5 rounded">
                {request.id}
              </span>
              <span
                className={clsx(
                  'text-[9px] font-semibold px-1.5 py-0.5 rounded border',
                  IMPACT_COLORS[request.impact],
                )}
              >
                {request.impact} Impact
              </span>
              {isCompleted && (
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                  Completed
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold">{request.title}</h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              <span>
                <User className="w-3 h-3 inline mr-1" />
                {request.requester} · {request.team}
              </span>
              <span>•</span>
              <span>{request.age}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[hsl(var(--muted))] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Business reason */}
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1.5">
            Business Reason
          </p>
          <p className="text-sm leading-relaxed text-[hsl(var(--foreground))]">
            {detail.businessReason}
          </p>
        </div>

        {/* What RevBrain knows */}
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1.5">
            What RevBrain Knows
          </p>
          <ul className="space-y-1">
            {detail.revbrainKnows.map((item) => (
              <li
                key={item}
                className="text-sm text-[hsl(var(--foreground))] flex items-start gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing context (if applicable) */}
        {isNeedsContext && request.missingContext && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200/60 rounded-lg">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">
              Missing Context
            </p>
            <p className="text-sm text-amber-800">{request.missingContext}</p>
          </div>
        )}

        {/* Affected process + areas */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1.5">
              Affected Process
            </p>
            <p className="text-sm font-medium">{detail.affectedProcess}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1.5">
              Affected Areas
            </p>
            <div className="flex flex-wrap gap-1">
              {detail.affectedAreas.map((area) => (
                <span
                  key={area}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]/50"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1.5">
            RevBrain Recommendation
          </p>
          <div className="card bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20">
            <p className="text-sm leading-relaxed">{detail.recommendation}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {request.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[hsl(var(--border))]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
          >
            Close
          </button>
          {isReady && (
            <button
              onClick={() => onImplement(request)}
              className="px-4 py-2 text-sm font-medium rounded-md bg-[hsl(var(--accent))] text-white hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span>Implement with RevBrain</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */

export function UserRequestsPage() {
  const navigate = useNavigate();
  const [lanes, setLanes] = useState<Record<LaneId, string[]>>(() => ({
    ...INITIAL_LANES,
  }));
  const [modal, setModal] = useState<{ id: string; lane: LaneId } | null>(null);

  // Summary counts
  const openCount = lanes['new'].length + lanes['needs-context'].length + lanes['ready'].length;
  const readyCount = lanes['ready'].length;
  const contextCount = lanes['needs-context'].length;

  const onCardClick = useCallback(
    (id: string) => {
      // Find which lane the card is in
      const lane = LANE_ORDER.find((l) => lanes[l].includes(id));
      if (lane) setModal({ id, lane });
    },
    [lanes],
  );

  const onImplement = useCallback(
    (request: UserRequest) => {
      persistSelectedRequest(request);
      setModal(null);
      navigate('/revbrain/ongoing/implementation');
    },
    [navigate],
  );

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-4 pb-6 space-y-5 flex-1">
        {/* ─── Header ─── */}
        <div>
          <h1 className="text-lg font-bold text-[hsl(var(--foreground))]">
            User Requests
          </h1>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">
            Business and operations requests captured across Sales, Finance, CS,
            Product and RevOps.
          </p>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold text-[hsl(var(--foreground))]">
              {openCount} open requests
            </span>
            <span className="text-[hsl(var(--border))]">·</span>
            <span className="text-emerald-600 font-medium">
              {readyCount} ready to implement
            </span>
            <span className="text-[hsl(var(--border))]">·</span>
            <span className="text-amber-600 font-medium">
              {contextCount} waiting on context
            </span>
          </div>
        </div>

        {/* ─── Kanban Board ─── */}
        <KanbanBoard lanes={lanes} setLanes={setLanes} onCardClick={onCardClick} />
      </div>

      {/* ─── Detail Modal ─── */}
      {modal && (
        <RequestDetailModal
          requestId={modal.id}
          laneId={modal.lane}
          onClose={() => setModal(null)}
          onImplement={onImplement}
        />
      )}
    </div>
  );
}
