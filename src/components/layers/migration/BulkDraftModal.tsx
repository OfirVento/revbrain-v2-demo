import { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import type { CodeArtifact } from '@/types/assessment';

// Eligible: High confidence and not Manual_Design_Required
function isEligible(a: CodeArtifact) {
  return a.conversionConfidence === 'High' && a.recommendedRcaTarget !== 'Manual_Design_Required';
}

interface Props {
  artifacts: CodeArtifact[];
  open: boolean;
  onClose: () => void;
  onComplete: (ids: string[]) => void;
}

export function BulkDraftModal({ artifacts, open, onClose, onComplete }: Props) {
  const eligible = artifacts.filter(isEligible);
  const [phase, setPhase] = useState<'confirm' | 'generating' | 'done'>('confirm');
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (!open) { setPhase('confirm'); setRevealedCount(0); }
  }, [open]);

  const handleGenerate = () => {
    setPhase('generating');
    setRevealedCount(0);
    // Sequential reveal — one per 600ms
    eligible.forEach((_, i) => {
      setTimeout(() => {
        setRevealedCount(i + 1);
        if (i === eligible.length - 1) {
          setTimeout(() => {
            setPhase('done');
            onComplete(eligible.map((a) => a.id));
          }, 500);
        }
      }, i * 600);
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-gray-200">Bulk Draft High-Confidence Candidates</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {phase === 'confirm' && (
            <>
              <p className="text-sm text-gray-400 mb-4">
                <span className="text-white font-semibold">{eligible.length}</span> artifacts eligible
                (High confidence, no Manual Design requirement):
              </p>
              <div className="space-y-1.5 max-h-52 overflow-y-auto mb-5">
                {eligible.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 px-3 py-2 bg-[#0d1117] rounded text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span className="text-gray-300 truncate">{a.name}</span>
                    <span className="text-gray-600 ml-auto shrink-0">{a.sourceType.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleGenerate}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
              >
                Generate {eligible.length} Drafts
              </button>
            </>
          )}

          {phase === 'generating' && (
            <div className="space-y-1.5">
              <p className="text-sm text-gray-400 mb-3">
                Generating {revealedCount} / {eligible.length}…
              </p>
              {eligible.map((a, i) => (
                <div key={a.id} className={clsx(
                  'flex items-center gap-2 px-3 py-2 rounded text-xs transition-all duration-300',
                  i < revealedCount ? 'bg-green-900/20 border border-green-800/30' : 'bg-[#0d1117]'
                )}>
                  {i < revealedCount
                    ? <span className="text-green-400">✓</span>
                    : i === revealedCount
                    ? <span className="w-3 h-3 border border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-gray-700 shrink-0" />
                  }
                  <span className={clsx('truncate', i < revealedCount ? 'text-green-300' : 'text-gray-500')}>
                    {a.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {phase === 'done' && (
            <div className="text-center py-4">
              <p className="text-4xl mb-3">✓</p>
              <p className="text-sm font-semibold text-green-400 mb-1">{eligible.length} drafts generated</p>
              <p className="text-xs text-gray-500 mb-5">All high-confidence candidates have pre-generated drafts revealed.</p>
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
