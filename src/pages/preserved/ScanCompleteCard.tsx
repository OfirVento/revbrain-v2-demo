import { useNavigate } from 'react-router-dom';
import { StatTile } from './StatTile';

export function ScanCompleteCard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Hero card */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">SCAN COMPLETE — acme-mock</div>
        <div className="text-sm text-gray-600 mb-6">Completed <span className="font-bold">8 minutes ago</span> · Run #1</div>

        <div className="text-sm text-gray-800 py-1">☑ All 9 analysis steps completed</div>
        <div className="text-sm text-gray-800 py-1">3,687 CPQ artifacts mapped across 9 areas</div>

        <div className="flex gap-3 mt-6">
          <button onClick={() => navigate('/executive-summary')} className="bg-black text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-800">Open Executive Summary →</button>
          <button onClick={() => navigate('/migration/understand')} className="bg-black text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-800">Open Migration Workspace →</button>
        </div>
      </div>

      {/* Scan Results Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-4">SCAN RESULTS PREVIEW</div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatTile value="3,687" label="Items" />
          <StatTile value="26" label="Complexity (/100)" />
          <StatTile value="9" label="Areas" />
          <StatTile value="0" label="Blockers" />
        </div>

        <div className="text-xs uppercase tracking-wide text-gray-500 mt-6 mb-2">TOP-LEVEL FINDINGS</div>
        <ul className="space-y-1">
          {[
            '176 active products · 12 product families',
            '10,240 quotes over 24 months',
            'Complexity tier: Low (26/100)',
            'Pricing logic is the primary validation area',
            'ARM license status: Blocked — license required before deployment',
          ].map((b) => (
            <li key={b} className="text-sm text-gray-700">• {b}</li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">NEXT STEPS</div>
        <ul className="space-y-1">
          <li className="text-sm text-gray-700">• Review the Executive Summary for org-level context</li>
          <li className="text-sm text-gray-700">• Open Migration → Understand for detailed analysis</li>
          <li className="text-sm text-gray-700">• Sales can begin qualification in Sales workspace</li>
        </ul>
        <div className="flex gap-2 mt-4">
          <button className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-not-allowed">Re-run scan</button>
          <button className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-not-allowed">Export findings ▾</button>
        </div>
      </div>
    </div>
  );
}
