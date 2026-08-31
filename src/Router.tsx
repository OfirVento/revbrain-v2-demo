import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ExecutivePage } from '@/pages/ExecutivePage';
import { SalesPage } from '@/pages/SalesPage';
import { MigrationPage } from '@/pages/MigrationPage';
import { ScanLandingPage } from '@/pages/preserved/ScanLandingPage';
import { ScanRunningPage } from '@/pages/preserved/ScanRunningPage';
import { BuildCasePage } from '@/pages/BuildCasePage';
import { PrepareSowPage } from '@/pages/PrepareSowPage';
import { ScopePhasesPage } from '@/pages/ScopePhasesPage';
import { ExecutePhasePage } from '@/pages/ExecutePhasePage';
import { PayloadError } from '@/components/shared/PayloadError';
import { useAssessmentStore } from '@/store';

/* ── RevBrain v2 IA pages ── */
import { StageSelector } from '@/pages/revbrain/StageSelector';
import { RoleSelector } from '@/pages/revbrain/RoleSelector';
import { CommandCenterPlaceholder } from '@/pages/revbrain/CommandCenterPlaceholder';
import { KnowledgePlaceholder } from '@/pages/revbrain/KnowledgePlaceholder';
import { SIArchitectCommandCenter } from '@/pages/revbrain/si-architect/SIArchitectCommandCenter';
import { AssessPage } from '@/pages/revbrain/si-architect/AssessPage';
import { MigrationMapPage } from '@/pages/revbrain/si-architect/MigrationMapPage';
import { DesignFutureStatePage } from '@/pages/revbrain/si-architect/DesignFutureStatePage';
import { ImplementationPage } from '@/pages/revbrain/si-architect/ImplementationPage';
import { RevBrainShell } from '@/components/revbrain/RevBrainShell';

/* ── Ongoing Ops pages ── */
import { OngoingOpsCommandCenter } from '@/pages/revbrain/ongoing-ops/OngoingOpsCommandCenter';
import { UserRequestsPage } from '@/pages/revbrain/ongoing-ops/UserRequestsPlaceholder';
import { OngoingOpsImplementationPage } from '@/pages/revbrain/ongoing-ops/OngoingOpsImplementationPlaceholder';

export function Router() {
  const { loadErrors } = useAssessmentStore();

  if (loadErrors) return <PayloadError errors={loadErrors} />;

  return (
    <BrowserRouter>
      <Routes>
        {/* Default → scan landing */}
        <Route path="/" element={<Navigate to="/scan" replace />} />

        {/* Scan pages — outside AppShell (no nav chrome) */}
        <Route path="/scan" element={<ScanLandingPage />} />
        <Route path="/scan/running" element={<ScanRunningPage />} />

        {/* ── RevBrain v2 entry/selection routes (own layout) ── */}
        <Route path="/revbrain" element={<StageSelector />} />
        <Route path="/revbrain/:stage" element={<RoleSelector />} />
        <Route path="/revbrain/:stage/:role" element={<CommandCenterPlaceholder />} />

        {/* ── SI Architect + Knowledge + Ongoing Ops — inside RevBrainShell ── */}
        <Route element={<RevBrainShell />}>
          <Route path="/revbrain/knowledge" element={<KnowledgePlaceholder />} />
          <Route path="/revbrain/migration/si-architect" element={<SIArchitectCommandCenter />} />
          <Route path="/revbrain/migration/si-architect/assess" element={<AssessPage />} />
          <Route path="/revbrain/migration/si-architect/map" element={<MigrationMapPage />} />
          <Route path="/revbrain/migration/si-architect/design" element={<DesignFutureStatePage />} />
          <Route path="/revbrain/migration/si-architect/implementation" element={<ImplementationPage />} />

          {/* ── Ongoing Ops routes ── */}
          <Route path="/revbrain/ongoing" element={<Navigate to="/revbrain/ongoing/command-center" replace />} />
          <Route path="/revbrain/ongoing/command-center" element={<OngoingOpsCommandCenter />} />
          <Route path="/revbrain/ongoing/user-requests" element={<UserRequestsPage />} />
          <Route path="/revbrain/ongoing/implementation" element={<OngoingOpsImplementationPage />} />
        </Route>

        {/* Main app routes — inside AppShell with TopBar + AgentPanel */}
        <Route element={<AppShell />}>
          <Route path="/executive-summary" element={<ExecutivePage />} />
          <Route path="/sales/qualify" element={<SalesPage />} />
          <Route path="/sales/build-case" element={<BuildCasePage />} />
          <Route path="/sales/prepare-sow" element={<PrepareSowPage />} />
          <Route path="/migration/understand" element={<MigrationPage />} />
          <Route path="/migration/scope-phases" element={<ScopePhasesPage />} />
          <Route path="/migration/execute-phase" element={<ExecutePhasePage />} />
        </Route>

        {/* Catch-all → scan */}
        <Route path="*" element={<Navigate to="/scan" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

