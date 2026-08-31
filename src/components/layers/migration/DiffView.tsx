import { useShikiHighlight } from '@/hooks/useShikiHighlight';

interface Props {
  original: string;
  generated: string;
  originalLang: string;
  generatedLang: string;
}

function PaneCode({ code, lang, label }: { code: string; lang: string; label: string }) {
  const { html, loading } = useShikiHighlight(code, lang, 'github-dark');
  return (
    <div className="flex flex-col h-full border-r border-[#30363d] last:border-r-0">
      <div className="px-4 py-1.5 bg-[#161b22] border-b border-[#30363d] shrink-0">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="p-4 space-y-1.5 animate-pulse">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="h-3 bg-[#161b22] rounded" style={{ width: `${40 + (i * 6) % 50}%` }} />
            ))}
          </div>
        ) : (
          <div className="shiki-container text-xs" dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  );
}

export function DiffView({ original, generated, originalLang, generatedLang }: Props) {
  return (
    <div className="grid grid-cols-2 h-full">
      <PaneCode code={original} lang={originalLang} label="CPQ Original" />
      <PaneCode code={generated} lang={generatedLang} label="ARM Draft" />
    </div>
  );
}
