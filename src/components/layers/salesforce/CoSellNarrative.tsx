import { RefreshCw } from 'lucide-react';
import { useUiStore, useAgentStore } from '@/store';

interface CoSellNarrativeProps {
  narrative: string;
  orgName: string;
}

export function CoSellNarrative({ narrative, orgName }: CoSellNarrativeProps) {
  const { setAgentPanelOpen } = useUiStore();
  const { setPendingInput } = useAgentStore();

  const handleReRoll = () => {
    setPendingInput(`Re-generate the co-sell narrative for ${orgName}. What are the strongest expansion signals for the Salesforce AE?`);
    setAgentPanelOpen(true);
  };

  return (
    <div className="card bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/20 group">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded bg-[hsl(var(--accent))] flex items-center justify-center shrink-0">
          <span className="text-white text-[9px] font-bold">Q</span>
        </div>
        <h2 className="text-sm font-semibold">Co-Sell Narrative</h2>
        
        <button
          onClick={handleReRoll}
          className="ml-auto flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 hover:text-[hsl(var(--accent))] transition-all"
          title="Re-generate via RevBrain Agent"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">Re-roll</span>
        </button>
      </div>

      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
        Prepared for Salesforce — {orgName} co-sell motion
      </p>

      <p className="text-sm leading-relaxed">{narrative}</p>
    </div>
  );
}
