import * as Dialog from '@radix-ui/react-dialog';
import { X, Copy, Check, ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useUiStore } from '@/store';
import { clsx } from 'clsx';
import type { EvidenceTrail } from '@/types/assessment';

// ── §6.1 three-level evidence pattern ──────────────────────────
// Level 1 — Summary: bullet list, 1–5 items, executive-readable
// Level 2 — Detailed: metrics table with metric / value / source
// Level 3 — Raw: artifact references + metadata extracts, copyable

// ── Collapsible section ─────────────────────────────────────────
function EvidenceSection({
  title,
  subtitle,
  level,
  defaultOpen = false,
  children,
  isEmpty = false,
}: {
  title: string;
  subtitle?: string;
  level: 1 | 2 | 3;
  defaultOpen?: boolean;
  children: React.ReactNode;
  isEmpty?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const levelColors: Record<number, string> = {
    1: 'text-[hsl(var(--accent))]',
    2: 'text-emerald-600 dark:text-emerald-400',
    3: 'text-[hsl(var(--muted-foreground))]',
  };

  return (
    <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[hsl(var(--muted))]/60 hover:bg-[hsl(var(--muted))] transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'text-xs font-bold uppercase tracking-wide w-4',
              levelColors[level]
            )}
          >
            L{level}
          </span>
          <div>
            <span className="text-sm font-semibold">{title}</span>
            {subtitle && (
              <span className="text-xs text-[hsl(var(--muted-foreground))] ml-2">
                {subtitle}
              </span>
            )}
          </div>
          {isEmpty && (
            <span className="text-xs text-[hsl(var(--muted-foreground))] italic ml-2">
              no data
            </span>
          )}
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))] shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] shrink-0" />
        )}
      </button>
      {open && !isEmpty && (
        <div className="p-4 bg-[hsl(var(--card))]">{children}</div>
      )}
    </div>
  );
}

// ── Copy button ─────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-3 h-3 text-green-500" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

// ── Level 1 — Summary ───────────────────────────────────────────
function SummaryLevel({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm">
          <span className="w-5 h-5 rounded-full bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Level 2 — Detailed metrics ──────────────────────────────────
function DetailedLevel({
  rows,
}: {
  rows: Array<{ metric: string; value: string | number; source: string }>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[hsl(var(--border))]">
            <th className="text-left pb-2 font-semibold text-[hsl(var(--muted-foreground))] text-xs uppercase tracking-wide">
              Metric
            </th>
            <th className="text-right pb-2 pr-4 font-semibold text-[hsl(var(--muted-foreground))] text-xs uppercase tracking-wide">
              Value
            </th>
            <th className="text-left pb-2 font-semibold text-[hsl(var(--muted-foreground))] text-xs uppercase tracking-wide">
              Source
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[hsl(var(--border))]">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[hsl(var(--muted))]/40 transition-colors">
              <td className="py-2.5 pr-4 font-medium">{row.metric}</td>
              <td className="py-2.5 pr-4 text-right font-mono text-sm font-semibold text-[hsl(var(--accent))]">
                {String(row.value)}
              </td>
              <td className="py-2.5 text-[hsl(var(--muted-foreground))] text-xs">
                {row.source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Level 3 — Raw references ────────────────────────────────────
function RawLevel({
  artifactReferences,
  metadataExtracts,
}: {
  artifactReferences: string[];
  metadataExtracts?: Record<string, unknown>;
}) {
  const rawJson = JSON.stringify(
    { artifactReferences, metadataExtracts: metadataExtracts ?? {} },
    null,
    2
  );

  return (
    <div className="space-y-4">
      {artifactReferences.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-2">
            Artifact References
          </p>
          <div className="flex flex-wrap gap-1.5">
            {artifactReferences.map((ref) => (
              <span
                key={ref}
                className="px-2 py-0.5 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded text-xs font-mono"
              >
                {ref}
              </span>
            ))}
          </div>
        </div>
      )}

      {metadataExtracts && Object.keys(metadataExtracts).length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
              Metadata Extracts
            </p>
            <CopyButton text={rawJson} />
          </div>
          <pre className="text-xs font-mono bg-[hsl(var(--muted))]/60 border border-[hsl(var(--border))] rounded-md p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap break-words">
            {JSON.stringify(metadataExtracts, null, 2)}
          </pre>
        </div>
      )}

      {artifactReferences.length === 0 &&
        (!metadataExtracts || Object.keys(metadataExtracts).length === 0) && (
          <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] italic">
            <AlertCircle className="w-3 h-3 shrink-0" />
            No raw references attached to this claim.
          </div>
        )}
    </div>
  );
}

// ── Main drawer ─────────────────────────────────────────────────
export function EvidenceDrawer() {
  const { evidenceDrawer, closeEvidenceDrawer } = useUiStore();
  const { isOpen, evidence, title } = evidenceDrawer;

  const isEmpty = (e: EvidenceTrail | null) => !e;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(v) => !v && closeEvidenceDrawer()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in-0 duration-200" />
        <Dialog.Content
          className={clsx(
            'fixed right-0 top-0 h-full w-full max-w-lg z-50',
            'bg-[hsl(var(--card))] border-l border-[hsl(var(--border))]',
            'shadow-2xl flex flex-col',
            'animate-in slide-in-from-right duration-300'
          )}
          aria-describedby="evidence-drawer-description"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-4 border-b border-[hsl(var(--border))] shrink-0">
            <div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-medium">
                Evidence Trail — §6.1
              </p>
              <Dialog.Title className="text-base font-semibold mt-0.5 leading-snug">
                {title || 'Evidence'}
              </Dialog.Title>
              <p
                id="evidence-drawer-description"
                className="text-xs text-[hsl(var(--muted-foreground))] mt-1"
              >
                Three-level evidence pattern: Summary → Detailed → Raw
              </p>
            </div>
            <Dialog.Close asChild>
              <button className="p-2 rounded-md hover:bg-[hsl(var(--muted))] transition-colors shrink-0 mt-0.5">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {isEmpty(evidence) ? (
              <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                No evidence trail attached to this item.
              </div>
            ) : (
              <>
                {/* L1 — Summary */}
                <EvidenceSection
                  title="Summary"
                  subtitle={`${evidence!.summary.length} point${evidence!.summary.length !== 1 ? 's' : ''}`}
                  level={1}
                  defaultOpen
                  isEmpty={evidence!.summary.length === 0}
                >
                  <SummaryLevel items={evidence!.summary} />
                </EvidenceSection>

                {/* L2 — Detailed */}
                <EvidenceSection
                  title="Detailed Metrics"
                  subtitle={`${evidence!.detailed.length} row${evidence!.detailed.length !== 1 ? 's' : ''}`}
                  level={2}
                  isEmpty={evidence!.detailed.length === 0}
                >
                  <DetailedLevel rows={evidence!.detailed} />
                </EvidenceSection>

                {/* L3 — Raw */}
                <EvidenceSection
                  title="Raw References"
                  subtitle={`${evidence!.raw.artifactReferences.length} artifact${evidence!.raw.artifactReferences.length !== 1 ? 's' : ''}`}
                  level={3}
                  isEmpty={
                    evidence!.raw.artifactReferences.length === 0 &&
                    (!evidence!.raw.metadataExtracts ||
                      Object.keys(evidence!.raw.metadataExtracts).length === 0)
                  }
                >
                  <RawLevel
                    artifactReferences={evidence!.raw.artifactReferences}
                    metadataExtracts={evidence!.raw.metadataExtracts}
                  />
                </EvidenceSection>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[hsl(var(--border))] shrink-0">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              All claims in this assessment carry a three-level evidence trail.
              L1 is human-readable. L2 is verifiable. L3 is traceable to source.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
