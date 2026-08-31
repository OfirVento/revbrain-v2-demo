import { useState } from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { useShikiHighlight } from '@/hooks/useShikiHighlight';
import type { MigrationDraft } from '@/types/assessment';

type Tab = 'draft' | 'reasoning' | 'tests';

type DraftStatus = 'idle' | 'generating' | 'revealed';

function EmptyDraft({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-8 text-center animate-in fade-in zoom-in-95 duration-300">
      <div className="w-14 h-14 rounded-full bg-[#1c1a2c] flex items-center justify-center mb-5">
        <Sparkles className="w-6 h-6 text-[#7a66f4]" />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-100 mb-2">Ready to draft</h3>
      <p className="text-[13px] text-[#9ca3af] mb-6 max-w-[420px] leading-relaxed">
        Generate a migration candidate for this artifact. The draft includes target pattern reasoning, preserved/changed behaviour, and required test scenarios.
      </p>
      <button
        onClick={onGenerate}
        className="flex items-center gap-2 px-4 py-2 text-[13px] rounded-md bg-[#7a66f4] hover:bg-[#6855df] text-white font-medium transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Generate ARM Draft
      </button>
    </div>
  );
}

function GeneratingDraft() {
  return (
    <div className="p-4 space-y-2">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="h-3 bg-indigo-900/30 rounded animate-pulse"
          style={{ width: `${30 + (i * 7) % 60}%`, animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

interface DraftCodeProps {
  code: string;
  lang: string;
}
function DraftCode({ code, lang }: DraftCodeProps) {
  const { html, loading } = useShikiHighlight(code, lang, 'github-dark');
  if (loading) return <GeneratingDraft />;
  return <div className="shiki-container text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
}

interface Props {
  draft: MigrationDraft;
  targetPattern: string;
  status: DraftStatus;
  onGenerate: () => void;
  onRegenerate: () => void;
}

export function DraftPane({ draft, targetPattern, status, onGenerate, onRegenerate }: Props) {
  const [tab, setTab] = useState<Tab>('draft');

  const TABS: { key: Tab; label: string }[] = [
    { key: 'draft', label: 'Draft' },
    { key: 'reasoning', label: 'Reasoning' },
    { key: 'tests', label: 'Tests' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0d1117]">
      {/* Pane header with target pattern badge + tabs */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-[#30363d] bg-[#161b22] shrink-0">
        <span className="text-xs font-semibold text-gray-300">Generated ARM Migration Draft</span>
        {/* ai_generated applies to every draft — Manual flags are additional signals on top */}
        
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-900/50 border border-indigo-700/50 text-indigo-300 font-medium">
          {targetPattern.replace(/_/g, ' ')}
        </span>
        <div className="ml-auto flex gap-1 items-center">
          {status === 'revealed' && (
            <button
              onClick={onRegenerate}
              className="mr-2 px-2 py-1 text-[10px] rounded border border-indigo-700/50 text-indigo-400 hover:bg-indigo-900/30 hover:text-indigo-300 font-medium transition-colors"
            >
              Re-generate
            </button>
          )}
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={clsx(
                'px-2.5 py-1 text-[10px] rounded font-medium transition-colors',
                tab === t.key
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>


      {/* Human review warning */}
      {draft.humanReviewRequired && status === 'revealed' && (
        <div className="flex items-start gap-2 px-4 py-2 bg-amber-900/20 border-b border-amber-700/30 shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-amber-300 font-semibold">Human Review Required</p>
            <ul className="mt-0.5 space-y-0.5">
              {draft.reviewReasons.map((r, i) => (
                <li key={i} className="text-[10px] text-amber-400/80">{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {/* Draft tab */}
        {tab === 'draft' && (
          status === 'idle' ? <EmptyDraft onGenerate={onGenerate} /> :
          status === 'generating' ? <GeneratingDraft /> :
          <DraftCode code={draft.generatedCandidate} lang={draft.candidateLanguage} />
        )}

        {/* Reasoning tab */}
        {tab === 'reasoning' && (
          <div className="p-5 space-y-5">
            <div>
              <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-2">Target Pattern Reasoning</p>
              <p className="text-xs text-gray-300 leading-relaxed">{draft.targetPatternReasoning}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-2">Preserved Behavior</p>
              <ul className="space-y-1">
                {draft.preservedBehavior.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-green-500 mt-0.5">✓</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-yellow-400 uppercase tracking-widest mb-2">Changed Behavior</p>
              <ul className="space-y-1">
                {draft.changedBehavior.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-yellow-500 mt-0.5">~</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            {draft.unknowns.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-2">Unknowns</p>
                <ul className="space-y-1">
                  {draft.unknowns.map((u, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-red-500 mt-0.5">?</span>{u}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tests tab */}
        {tab === 'tests' && (
          <div className="p-5">
            <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">Required Tests</p>
            <ol className="space-y-2">
              {draft.requiredTests.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded bg-[#161b22] border border-[#30363d] text-indigo-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
