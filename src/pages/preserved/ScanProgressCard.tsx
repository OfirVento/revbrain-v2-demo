const steps: { glyph: string; label: string; color: string }[] = [
  { glyph: '☑', label: 'Connecting to org', color: 'text-black' },
  { glyph: '☑', label: 'Extracting metadata (12,847 records)', color: 'text-black' },
  { glyph: '☑', label: 'Analyzing product catalog', color: 'text-black' },
  { glyph: '☑', label: 'Analyzing pricing rules', color: 'text-black' },
  { glyph: '◐', label: 'Analyzing approval logic', color: 'text-gray-700' },
  { glyph: '☐', label: 'Analyzing custom code', color: 'text-gray-400' },
  { glyph: '☐', label: 'Analyzing integrations', color: 'text-gray-400' },
  { glyph: '☐', label: 'Mapping to ARM equivalents', color: 'text-gray-400' },
  { glyph: '☐', label: 'Generating findings report', color: 'text-gray-400' },
];

export function ScanProgressCard() {
  return (
    <div className="space-y-6">
      {/* Hero card */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <div className="text-xs uppercase tracking-wide text-gray-500">SCANNING — acme-mock</div>
        <div className="text-sm text-gray-700 mt-1">Estimated time remaining: <span className="font-bold">6m 30s</span></div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-black" style={{ width: '68%' }} />
          </div>
          <div className="text-xs text-gray-500 text-right mt-1">68%</div>
        </div>

        <div className="border-b border-gray-200 my-6" />

        {/* Step list */}
        <div className="space-y-0">
          {steps.map((s) => (
            <div key={s.label} className="flex items-center gap-3 py-1.5 text-sm">
              <span className={`w-5 shrink-0 ${s.color}`}>{s.glyph}</span>
              <span className={s.color === 'text-gray-400' ? 'text-gray-500' : 'text-gray-800'}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Early Findings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">EARLY FINDINGS</div>
        <div className="text-xs text-gray-400 mb-3">Updated as scan progresses.</div>
        {['176 active products detected · 12 product families', '10,240 quotes analyzed over 24 months', 'Complexity tracking toward "Low–Moderate" tier', 'ARM license status: not yet detected (final pass)'].map((l) => (
          <div key={l} className="text-sm text-gray-700 py-1">{l}</div>
        ))}
      </div>

      {/* Cancel */}
      <div className="text-right">
        <span className="text-xs text-gray-400 hover:text-gray-700 underline cursor-pointer">Cancel scan (advanced)</span>
      </div>
    </div>
  );
}
