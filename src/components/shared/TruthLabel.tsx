import { clsx } from 'clsx';

export type TruthLabelVariant =
  | 'real_org_data'
  | 'sample_data'
  | 'ai_generated'
  | 'heuristic_estimate'
  | 'human_reviewed';

const LABEL_CONFIG: Record<
  TruthLabelVariant,
  { label: string; colorClass: string }
> = {
  real_org_data: {
    label: 'Real Org Data',
    colorClass: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  },
  sample_data: {
    label: 'Sample Data',
    colorClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  },
  ai_generated: {
    label: 'AI-Generated',
    colorClass: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  },
  heuristic_estimate: {
    label: 'Heuristic Estimate',
    colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
  },
  human_reviewed: {
    label: 'Human-Reviewed',
    colorClass: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  },
};

interface TruthLabelProps {
  variant: TruthLabelVariant;
  className?: string;
}

export function TruthLabel({ variant, className }: TruthLabelProps) {
  const cfg = LABEL_CONFIG[variant];
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border',
        cfg.colorClass,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {cfg.label}
    </span>
  );
}

interface TruthLabelLegendProps {
  className?: string;
}

export function TruthLabelLegend({ className }: TruthLabelLegendProps) {
  return (
    <div className={clsx('flex flex-wrap gap-2 text-xs', className)}>
      <span className="text-muted-foreground font-medium mr-1">Data sources:</span>
      {(Object.keys(LABEL_CONFIG) as TruthLabelVariant[]).map((v) => (
        <span key={v}>{LABEL_CONFIG[v].label}</span>
      ))}
    </div>
  );
}
