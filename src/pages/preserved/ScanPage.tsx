import { useState } from 'react';
import { StatePicker, type ScanState } from '../components/wireframe/StatePicker';
import { ConnectOrgCard } from '../components/wireframe/ConnectOrgCard';
import { ScanProgressCard } from '../components/wireframe/ScanProgressCard';
import { ScanCompleteCard } from '../components/wireframe/ScanCompleteCard';

export default function ScanPage() {
  const [state, setState] = useState<ScanState>('not-connected');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Org Scan</h1>

      <StatePicker state={state} onSelect={setState} />

      {state === 'not-connected' && <ConnectOrgCard />}
      {state === 'scanning' && <ScanProgressCard />}
      {state === 'complete' && <ScanCompleteCard />}
    </div>
  );
}
