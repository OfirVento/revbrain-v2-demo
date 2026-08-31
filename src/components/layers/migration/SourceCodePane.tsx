import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useShikiHighlight } from '@/hooks/useShikiHighlight';

interface Props {
  code: string;
  lang: string;
  label?: string;
}

export function SourceCodePane({ code, lang, label = 'CPQ Source' }: Props) {
  const { html, loading } = useShikiHighlight(code, lang, 'github-dark');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117]">
      {/* Pane header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#30363d] bg-[#161b22] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-300">Original CPQ Source</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-gray-500">
            {lang.replace(/_/g, ' ')}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code body */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="p-4 space-y-1.5">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-3.5 bg-[#161b22] rounded animate-pulse"
                style={{ width: `${40 + Math.random() * 50}%` }}
              />
            ))}
          </div>
        ) : (
          <div
            className="shiki-container text-xs"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}
