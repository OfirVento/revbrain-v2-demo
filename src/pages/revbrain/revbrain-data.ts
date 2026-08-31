import {
  Briefcase,
  Code2,
  Users,
  ShieldCheck,
  Settings,
  UserCircle,
  HeadphonesIcon,
  BarChart3,
  Brain,
  type LucideIcon,
} from 'lucide-react';

export interface Stage {
  id: string;
  label: string;
  description: string;
  path: string;
  icon: LucideIcon;
  color: string; // tailwind gradient classes
}

export interface Role {
  id: string;
  label: string;
  description: string;
  slug: string;
  icon: LucideIcon;
  workspaces: string[];
}

export const STAGES: Stage[] = [
  {
    id: 'migration',
    label: 'Implementation',
    description:
      'CPQ → ARM implementation intelligence. Onboard your org and capture Q2C knowledge.',
    path: '/revbrain/migration',
    icon: Code2,
    color: 'from-indigo-500 to-violet-600',
  },
  {
    id: 'ongoing',
    label: 'Ongoing Operations',
    description:
      'AI-first revenue operations after implementation. Agents assist with pricing, approvals, and forecasting.',
    path: '/revbrain/ongoing',
    icon: Settings,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'knowledge',
    label: 'Learning Engine',
    description:
      'Cross-cutting intelligence layer. Search, explore, and leverage institutional Q2C knowledge.',
    path: '/revbrain/knowledge',
    icon: Brain,
    color: 'from-amber-500 to-orange-600',
  },
];

export const MIGRATION_ROLES: Role[] = [
  {
    id: 'si-sales',
    label: 'SI Partner - Sales',
    description:
      'Qualify implementation opportunities and build business cases.',
    slug: 'si-sales',
    icon: Briefcase,
    workspaces: ['Command Center', 'Qualify', 'Build Case', 'Prepare SOW'],
  },
  {
    id: 'si-architect',
    label: 'SI Partner - Architect / Migrator',
    description:
      'Assess complexity, design implementation plans, and execute transformations.',
    slug: 'si-architect',
    icon: Code2,
    workspaces: [
      'Command Center',
      'Assess',
      'Map',
      'Design',
      'Implementation',
    ],
  },
  {
    id: 'client-business',
    label: 'Client Business User',
    description:
      'Validate business rules, review migrated configurations, and approve changes.',
    slug: 'client-business',
    icon: Users,
    workspaces: [
      'Command Center',
      'Review Queue',
      'Approvals',
      'Knowledge Feed',
    ],
  },
  {
    id: 'admin',
    label: 'Admin / Project Manager',
    description:
      'Track implementation progress, manage timelines, and coordinate workstreams.',
    slug: 'admin',
    icon: ShieldCheck,
    workspaces: [
      'Command Center',
      'Project Dashboard',
      'Risk Register',
      'Reports',
    ],
  },
];

export const ONGOING_ROLES: Role[] = [
  {
    id: 'revops-admin',
    label: 'RevOps / SF Admin',
    description:
      'Manage pricing rules, approval workflows, and system configuration.',
    slug: 'revops-admin',
    icon: Settings,
    workspaces: [
      'Command Center',
      'Pricing Engine',
      'Approval Workflows',
      'System Health',
    ],
  },
  {
    id: 'business-user',
    label: 'Business User',
    description:
      'Submit pricing exceptions, manage deals, and track approvals.',
    slug: 'business-user',
    icon: UserCircle,
    workspaces: [
      'Command Center',
      'My Deals',
      'Exception Requests',
      'Knowledge Feed',
    ],
  },
  {
    id: 'si-support',
    label: 'SI Support',
    description:
      'Provide ongoing optimization, troubleshooting, and enhancement support.',
    slug: 'si-support',
    icon: HeadphonesIcon,
    workspaces: [
      'Command Center',
      'Support Queue',
      'Optimization',
      'Change Requests',
    ],
  },
  {
    id: 'executive',
    label: 'Executive',
    description:
      'Monitor revenue operations health, review KPIs, and strategic insights.',
    slug: 'executive',
    icon: BarChart3,
    workspaces: [
      'Command Center',
      'Revenue Dashboard',
      'Strategic Insights',
      'Board Reports',
    ],
  },
];
