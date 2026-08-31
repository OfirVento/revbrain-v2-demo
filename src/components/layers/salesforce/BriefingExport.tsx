import { FileText, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// §5.3 / §6.3 — Account-ready summary export.
// "Generate one-page Salesforce briefing" navigates to the print-dedicated
// route /assessment/salesforce/briefing which is optimized for print-to-PDF.

interface BriefingExportProps {
  orgName: string;
}

export function BriefingExport({ orgName }: BriefingExportProps) {
  const navigate = useNavigate();


  return (
    <div className="card border-dashed border-2 border-[hsl(var(--border))]">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-[hsl(var(--accent))]" />
            <h2 className="text-sm font-semibold">Account-Ready Summary Export</h2>
            

          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed max-w-md">
            Generate a single-page Salesforce briefing for {orgName} — optimized for PDF export.
            Covers readiness verdict, top 3 signals, LOE range, and co-sell narrative.
          </p>
        </div>

        <button
          id="generate-briefing-btn"
          onClick={() => navigate('/assessment/salesforce/briefing')}
          className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(var(--accent))] text-white rounded-lg text-sm font-semibold hover:bg-[hsl(var(--accent))]/90 transition-colors shrink-0"
        >
          <FileText className="w-4 h-4" />
          Generate Salesforce Briefing
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>
    </div>
  );
}
