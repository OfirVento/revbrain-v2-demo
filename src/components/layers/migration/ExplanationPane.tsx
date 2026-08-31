import { ExternalLink } from 'lucide-react';
import { useUiStore } from '@/store';
import type { CodeArtifact } from '@/types/assessment';

interface Props {
  artifact: CodeArtifact;
}

export function ExplanationPane({ artifact }: Props) {
  const { openEvidenceDrawer } = useUiStore();

  return (
    <div className="flex flex-col h-full bg-[#0d1117]">
      {/* Pane header */}
      <div className="px-4 py-2 border-b border-[#30363d] bg-[#161b22] shrink-0">
        <span className="text-xs font-semibold text-gray-300">What This Code Does</span>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Business purpose */}
        <div>
          <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-1.5">
            Business Purpose
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">{artifact.businessPurpose}</p>
        </div>

        {/* Plain language explanation — generous typography per spec */}
        <div>
          <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-1.5">
            What This Code Does
          </p>
          <p className="text-[17px] leading-relaxed text-gray-200 font-light">
            {artifact.draft.plainLanguageExplanation}
          </p>
        </div>

        {/* Dependencies */}
        {artifact.dependencies.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-2">
              Dependencies ({artifact.dependencies.length})
            </p>
            <ul className="space-y-1">
              {artifact.dependencies.map((dep, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                  <span className="font-mono text-indigo-300">{dep.name}</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-600 capitalize">{dep.type}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Evidence trail */}
        <div className="pt-2 border-t border-[#30363d]">
          <button
            onClick={() => openEvidenceDrawer(artifact.evidence, artifact.name)}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View evidence trail
          </button>
        </div>
      </div>
    </div>
  );
}
