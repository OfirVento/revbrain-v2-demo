
import type { ImplementationFinding, Severity } from '@/types/assessment';

// §5.3 — Migration risk profile: heatmap of findings by category × severity.
// Rows = categories, columns = severity levels. Cell = count of findings.

const SEVERITIES: Severity[] = ['Critical', 'High', 'Medium', 'Low', 'Info'];

const SEVERITY_BG: Record<Severity, (count: number) => string> = {
  Critical: (n) => n > 0 ? 'bg-red-500 text-white' : 'bg-red-50 text-red-200 dark:bg-red-900/10 dark:text-red-900/30',
  High: (n) => n > 0 ? 'bg-orange-400 text-white' : 'bg-orange-50 text-orange-200 dark:bg-orange-900/10',
  Medium: (n) => n > 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-yellow-50 text-yellow-200 dark:bg-yellow-900/10',
  Low: (n) => n > 0 ? 'bg-blue-200 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200' : 'bg-blue-50 text-blue-100 dark:bg-blue-900/10',
  Info: (n) => n > 0 ? 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100' : 'bg-gray-100 text-gray-200 dark:bg-gray-800/30',
};

interface RiskHeatmapProps {
  findings: ImplementationFinding[];
}

export function RiskHeatmap({ findings }: RiskHeatmapProps) {
  // Group by category
  const categories = Array.from(new Set(findings.map((f) => f.category))).sort();

  // Build matrix: category → severity → count
  const matrix: Record<string, Record<Severity, number>> = {};
  for (const cat of categories) {
    matrix[cat] = { Critical: 0, High: 0, Medium: 0, Low: 0, Info: 0 };
  }
  for (const f of findings) {
    if (matrix[f.category]) {
      matrix[f.category][f.severity as Severity] = (matrix[f.category][f.severity as Severity] ?? 0) + 1;
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="section-header">Migration Risk Profile</h2>
        

      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide py-2 pr-4 w-40">
                Category
              </th>
              {SEVERITIES.map((s) => (
                <th key={s} className="text-center text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide py-2 px-2 w-20">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, i) => (
              <tr key={cat} className={i % 2 === 0 ? '' : 'bg-[hsl(var(--muted))]/30'}>
                <td className="py-2 pr-4 text-xs font-medium truncate max-w-[140px]" title={cat}>
                  {cat}
                </td>
                {SEVERITIES.map((sev) => {
                  const count = matrix[cat][sev];
                  return (
                    <td key={sev} className="py-2 px-2 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-7 rounded text-xs font-bold ${SEVERITY_BG[sev](count)}`}>
                        {count > 0 ? count : '—'}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[hsl(var(--border))] flex-wrap">
          <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">Severity:</span>
          {SEVERITIES.map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-sm inline-block ${SEVERITY_BG[s](1)}`} />
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
