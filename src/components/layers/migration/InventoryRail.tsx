import { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { Search, Zap, ChevronDown } from 'lucide-react';
import type { CodeArtifact, DraftConfidence } from '@/types/assessment';

const CONFIDENCE_STYLES: Record<DraftConfidence, string> = {
  High: 'bg-green-900/40 text-green-300 border-green-700/50',
  Medium: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50',
  Low: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
  Manual_Review_Required: 'bg-amber-900/40 text-amber-300 border-amber-600/50',
};

const CONFIDENCE_OPTIONS = ['All', 'High', 'Medium', 'Low', 'Review'] as const;

const TYPE_OPTIONS = [
  'All', 'QCP', 'Apex', 'Price Rules', 'Product Rules', 'Discount Schedules', 'Summary Variables'
] as const;

type SortOption = 'Complexity' | 'Usage' | 'Confidence';

function matchesConfidence(a: CodeArtifact, f: string) {
  if (f === 'All') return true;
  if (f === 'Review') return a.conversionConfidence === 'Manual_Review_Required';
  return a.conversionConfidence === f;
}

function matchesType(a: CodeArtifact, t: string) {
  if (t === 'All') return true;
  if (t === 'QCP') return a.sourceType.includes('QCP');
  if (t === 'Apex') return a.sourceType.includes('Apex');
  if (t === 'Price Rules') return a.sourceType.includes('PriceRule');
  if (t === 'Product Rules') return a.sourceType.includes('ProductRule');
  if (t === 'Discount Schedules') return a.sourceType.includes('DiscountSchedule');
  if (t === 'Summary Variables') return a.sourceType.includes('SummaryVariable');
  return true;
}

function getCardAccent(a: CodeArtifact) {
  if (a.recommendedRcaTarget === 'Manual_Design_Required') return 'border-l-2 border-l-red-500';
  if (a.conversionConfidence === 'Manual_Review_Required') return 'border-l-2 border-l-amber-400';
  return 'border-l-2 border-l-transparent';
}

interface Props {
  artifacts: CodeArtifact[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onBulkDraft: () => void;
}

export function InventoryRail({ artifacts, selectedId, onSelect, onBulkDraft }: Props) {
  const [query, setQuery] = useState('');
  const [confFilter, setConfFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('Complexity');

  const visible = useMemo(() => {
    let filtered = artifacts.filter(
      (a) =>
        matchesConfidence(a, confFilter) &&
        matchesType(a, typeFilter) &&
        (query === '' ||
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.sourceType.toLowerCase().includes(query.toLowerCase()))
    );

    filtered.sort((a, b) => {
      if (sortBy === 'Complexity') {
        return b.complexityScore - a.complexityScore;
      }
      if (sortBy === 'Confidence') {
        const confRank = { High: 3, Medium: 2, Low: 1, Manual_Review_Required: 0 };
        return confRank[b.conversionConfidence] - confRank[a.conversionConfidence];
      }
      if (sortBy === 'Usage') {
        // Fallback: order by id if no usage signal exists
        return b.id.localeCompare(a.id);
      }
      return 0;
    });

    return filtered;
  }, [artifacts, query, confFilter, typeFilter, sortBy]);

  const highConfCount = artifacts.filter(a => a.conversionConfidence === 'High').length;

  return (
    <div className="flex flex-col h-full border-r border-[#30363d] bg-[#0d1117] w-80">
      {/* Top Controls section */}
      <div className="p-3 border-b border-[#30363d] space-y-3">
        {/* Bulk Draft Button */}
        <button
          onClick={onBulkDraft}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-sm"
        >
          <Zap className="w-4 h-4" />
          Bulk Draft High-Confidence ({highConfCount})
        </button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artifacts…"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#161b22] border border-[#30363d] rounded text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Sort by:</span>
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-[#161b22] border border-[#30363d] text-gray-300 rounded pl-2 pr-6 py-1 focus:outline-none focus:border-indigo-500 text-xs"
            >
              <option value="Complexity">Complexity</option>
              <option value="Usage">Usage (proxy)</option>
              <option value="Confidence">Confidence</option>
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      {/* Confidence Tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-[#30363d]">
        {CONFIDENCE_OPTIONS.map((f) => (
          <button
            key={f}
            onClick={() => setConfFilter(f)}
            className={clsx(
              'flex-1 py-1 text-[10px] rounded font-medium transition-colors text-center',
              confFilter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-[#161b22] border border-[#30363d] text-gray-400 hover:text-gray-200 hover:border-gray-600'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Type Chips (Horizontal scrollable) */}
      <div className="flex gap-2 px-3 py-2 border-b border-[#30363d] overflow-x-auto scrollbar-hide shrink-0">
        {TYPE_OPTIONS.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={clsx(
              'px-2 py-1 text-[10px] rounded-full whitespace-nowrap transition-colors border',
              typeFilter === t
                ? 'bg-gray-700 text-white border-gray-600'
                : 'bg-transparent text-gray-500 border-transparent hover:bg-[#161b22] hover:text-gray-300'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Artifact list */}
      <div className="flex-1 overflow-y-auto">
        {visible.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelect(a.id)}
            className={clsx(
              'w-full text-left px-4 py-4 border-b border-[#30363d]/50 transition-colors',
              getCardAccent(a),
              selectedId === a.id
                ? 'bg-indigo-600/10'
                : 'hover:bg-[#161b22]'
            )}
          >
            <div className="flex flex-col gap-2">
              <p className={clsx(
                "text-sm font-semibold truncate leading-tight",
                selectedId === a.id ? "text-indigo-300" : "text-white"
              )}>
                {a.name}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  {a.sourceType.replace(/_/g, ' ')}
                </span>
                <span className="text-gray-600">·</span>
                <span className={clsx(
                  'text-[10px] px-1.5 py-0.5 rounded border font-medium',
                  CONFIDENCE_STYLES[a.conversionConfidence]
                )}>
                  {a.conversionConfidence === 'Manual_Review_Required' ? 'Manual Review' : a.conversionConfidence}
                </span>
              </div>
            </div>
          </button>
        ))}
        {visible.length === 0 && (
          <p className="text-xs text-gray-600 text-center py-8">No artifacts match</p>
        )}
      </div>

      <div className="px-3 py-2 border-t border-[#30363d] text-[10px] text-gray-600 shrink-0">
        Showing {visible.length} of {artifacts.length} artifacts
      </div>
    </div>
  );
}
