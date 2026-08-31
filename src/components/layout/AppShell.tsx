import { TopBar } from './TopBar';
import { AgentPanel } from './AgentPanel';
import { WorkspaceStepper } from './WorkspaceStepper';
import { EvidenceDrawer } from '@/components/shared/EvidenceDrawer';
import { Outlet } from 'react-router-dom';


export function AppShell() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[hsl(var(--background))]">
      <TopBar />
      <WorkspaceStepper />
      <div className="flex-1 flex overflow-hidden">
        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto transition-all duration-300"
        >
          <Outlet />
        </main>

        {/* Agent panel — always visible */}
        <aside className="w-96 border-l border-[hsl(var(--border))] bg-[hsl(var(--card))] flex flex-col shrink-0 overflow-hidden">
          <AgentPanel />
        </aside>
      </div>

      {/* Global evidence drawer */}
      <EvidenceDrawer />
    </div>
  );
}
