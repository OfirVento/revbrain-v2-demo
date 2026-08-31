import type { OrgProfile } from '@/types/assessment';

interface OrgMetricsBarProps {
  orgProfile: OrgProfile;
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[hsl(var(--muted-foreground))]">{label}</span>
      <span className="text-sm font-semibold">{value.toLocaleString?.() ?? value}</span>
    </div>
  );
}

export function OrgMetricsBar({ orgProfile }: OrgMetricsBarProps) {
  const { edition, cpqVersion, activeUsers, dataVolume, integrations } = orgProfile;

  return (
    <div className="card">
      <h2 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-4">
        Org Profile
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
        <Metric label="Edition" value={edition} />
        <Metric label="CPQ Version" value={cpqVersion.split(' ')[0]} />
        <Metric label="Active Users" value={activeUsers} />
        <Metric label="Products" value={dataVolume.products} />
        <Metric label="Active Quotes" value={dataVolume.activeQuotes} />
        <Metric label="Subscriptions" value={dataVolume.activeSubscriptions} />
        <Metric label="Integrations" value={integrations.length} />
      </div>
    </div>
  );
}
