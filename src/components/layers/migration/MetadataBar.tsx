import { clsx } from 'clsx';
import { Layers, Zap, AlertTriangle } from 'lucide-react';
import type { CodeArtifact, DraftConfidence } from '@/types/assessment';

type DraftStatus = 'idle' | 'generating' | 'revealed';

const CONFIDENCE_COLOR: Record<DraftConfidence, string> = {
  High: 'text-green-400 bg-green-900/30 border-green-700/50',
  Medium: 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50',
  Low: 'text-blue-400 bg-blue-900/30 border-blue-700/50',
  Manual_Review_Required: 'text-amber-400 bg-amber-900/30 border-amber-600/50',
};

interface Props {
  artifact: CodeArtifact;
  status: DraftStatus;
  isMarkedReview: boolean;
  onMarkReview: () => void;
  diffMode: boolean;
  onToggleDiff: () => void;
}

export function MetadataBar({
  artifact, status, isMarkedReview,
  onMarkReview,
  diffMode, onToggleDiff,
}: Props) {
  const conf = artifact.conversionConfidence;
  const isManual = artifact.recommendedRcaTarget === 'Manual_Design_Required';

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161b22] border-b border-[#30363d] flex-wrap">
      {/* Artifact info */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Layers className="w-3.5 h-3.5 text-gray-500 shrink-0" />
        <span className="text-xs text-gray-400 truncate">{artifact.sourceType.replace(/_/g, ' ')}</span>
        <span className={clsx('text-[10px] px-1.5 py-0.5 rounded border font-semibold shrink-0', CONFIDENCE_COLOR[conf])}>
          {conf === 'Manual_Review_Required' ? 'Manual Review' : conf}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-900/30 border border-indigo-700/50 text-indigo-400 font-medium shrink-0">
          → {artifact.recommendedRcaTarget.replace(/_/g, ' ')}
        </span>
        {isManual && (
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-red-900/40 border border-red-700/50 text-red-400 font-bold shrink-0">
            <AlertTriangle className="w-2.5 h-2.5" />
            Manual Design Required
          </span>
        )}
        {artifact.draft.humanReviewRequired && (
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-900/40 border border-amber-600/50 text-amber-400 font-bold shrink-0">
            <AlertTriangle className="w-2.5 h-2.5" />
            Human Review Required
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Diff toggle */}
        <button
          onClick={onToggleDiff}
          className={clsx(
            'px-2 py-1 text-[10px] rounded border font-medium transition-colors',
            diffMode
              ? 'bg-indigo-600 border-indigo-500 text-white'
              : 'border-[#30363d] text-gray-500 hover:text-gray-300'
          )}
        >
          ⬌ Diff
        </button>

        {status === 'revealed' && (
          <button
            onClick={onMarkReview}
            className={clsx(
              'px-2 py-1 text-[10px] rounded border font-medium transition-colors',
              isMarkedReview
                ? 'bg-amber-900/50 border-amber-600/50 text-amber-300'
                : 'border-[#30363d] text-gray-500 hover:text-amber-400'
            )}
          >
            {isMarkedReview ? '✓ Marked for Review' : 'Mark for Review'}
          </button>
        )}
      </div>
    </div>
  );
}
