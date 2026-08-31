// ── Assess Data Mock ──────────────────────────────────────────────────
// Mock data for the Assess page of the SI Architect flow.
// Demographics and CPQ metrics for Vector Systems (B2B SaaS).

export interface OperationalWorkflow {
  id: string;
  name: string;
  usageVolume: string;
  revenueSupported: string;
  teamsInvolved: string;
  migrationPriority: 'critical' | 'high' | 'medium' | 'low';
  confidence: string;
}

export interface ConfigurationArea {
  id: string;
  name: string;
  itemsFound: string;
  activeUsed: string;
  revenueLinkage: string;
  migrationImportance: 'critical' | 'high' | 'medium' | 'ignore';
}

export const HERO_STATS = {
  cpqOrg: 'Salesforce CPQ Prod',
  activeUsers: 37,
  quotesReviewed: '10,240',
  quotedRevenue: '$147M',
  activityWindow: '12 months (Jul 2025–Jun 2026)',
  revenueCoverage: '87%',
  workflowPercentage: '22%',
};

export const OPERATIONAL_WORKFLOWS: OperationalWorkflow[] = [
  {
    id: 'w1',
    name: 'Quote creation and submission',
    usageVolume: '10,240 quotes',
    revenueSupported: '$147M ARR',
    teamsInvolved: 'Sales, Deal Desk',
    migrationPriority: 'critical',
    confidence: '98%',
  },
  {
    id: 'w2',
    name: 'Enterprise discount approval / pricing exception',
    usageVolume: '340 approvals',
    revenueSupported: '$14.2M ARR',
    teamsInvolved: 'Core Sales, Finance, Executive',
    migrationPriority: 'critical',
    confidence: '97%',
  },
  {
    id: 'w3',
    name: 'Bundle configuration / guided product selection',
    usageVolume: '7,800 config runs',
    revenueSupported: '$112M ARR',
    teamsInvolved: 'Sales, Solution Architects',
    migrationPriority: 'high',
    confidence: '94%',
  },
  {
    id: 'w4',
    name: 'Contracted pricing exception',
    usageVolume: '180 exceptions',
    revenueSupported: '$8.4M ARR',
    teamsInvolved: 'Strategic Sales, Legal',
    migrationPriority: 'high',
    confidence: '91%',
  },
  {
    id: 'w5',
    name: 'Renewal uplift / amendment quoting',
    usageVolume: '1,200 renewals',
    revenueSupported: '$38M ARR',
    teamsInvolved: 'Customer Success, Account Mgmt',
    migrationPriority: 'medium',
    confidence: '89%',
  },
  {
    id: 'w6',
    name: 'New product or package launch',
    usageVolume: '12 product additions',
    revenueSupported: '$5.5M ARR',
    teamsInvolved: 'Product Marketing, Sales Ops',
    migrationPriority: 'medium',
    confidence: '92%',
  },
  {
    id: 'w7',
    name: 'Product and price update workflow',
    usageVolume: '4 main updates',
    revenueSupported: 'All products',
    teamsInvolved: 'Sales Ops, Finance',
    migrationPriority: 'low',
    confidence: '95%',
  },
  {
    id: 'w8',
    name: 'Quote status / mismatch resolution',
    usageVolume: '450 sync events',
    revenueSupported: '$3.2M ARR',
    teamsInvolved: 'Sales Ops, IT Support',
    migrationPriority: 'low',
    confidence: '87%',
  },
  {
    id: 'w9',
    name: 'Approval follow-up and escalation',
    usageVolume: '150 escalations',
    revenueSupported: '$5.8M ARR',
    teamsInvolved: 'Sales Reps, Finance Admins',
    migrationPriority: 'low',
    confidence: '84%',
  },
  {
    id: 'w10',
    name: 'Deal desk / admin exception handling',
    usageVolume: '95 custom pricing approvals',
    revenueSupported: '$12.4M ARR',
    teamsInvolved: 'Deal Desk Analysts',
    migrationPriority: 'low',
    confidence: '89%',
  },
];

export const CONFIGURATION_AREAS: ConfigurationArea[] = [
  {
    id: 'c1',
    name: 'Quotes',
    itemsFound: '2 Record Types · 4 Layouts',
    activeUsed: '2 Record Types · 2 Layouts',
    revenueLinkage: 'Impacts 100% of workflows',
    migrationImportance: 'critical',
  },
  {
    id: 'c2',
    name: 'Products',
    itemsFound: '450 SKUs active in catalog',
    activeUsed: '112 SKUs active in last 12m',
    revenueLinkage: 'Used in 94% of revenue workflows',
    migrationImportance: 'high',
  },
  {
    id: 'c3',
    name: 'Bundles',
    itemsFound: '32 Bundles',
    activeUsed: '12 active Bundles',
    revenueLinkage: 'Used in 42% of key workflows',
    migrationImportance: 'high',
  },
  {
    id: 'c4',
    name: 'Price Rules',
    itemsFound: '142 Rules',
    activeUsed: '34 Rules active',
    revenueLinkage: 'Affects 68% of quote workflows',
    migrationImportance: 'high',
  },
  {
    id: 'c5',
    name: 'Discount Rules',
    itemsFound: '28 Rules',
    activeUsed: '16 Rules active',
    revenueLinkage: 'Affects 37% of approval workflows',
    migrationImportance: 'medium',
  },
  {
    id: 'c6',
    name: 'Approval Rules',
    itemsFound: '34 Advanced Approvals',
    activeUsed: '8 active Approval rules',
    revenueLinkage: 'Controls 31% of approval workflows',
    migrationImportance: 'critical',
  },
  {
    id: 'c7',
    name: 'QCP Scripts',
    itemsFound: '3 custom scripts (4,200 LOC)',
    activeUsed: '3 custom scripts',
    revenueLinkage: 'Affects margin logic in 100% of quote workflows',
    migrationImportance: 'high',
  },
  {
    id: 'c8',
    name: 'Contracted Pricing',
    itemsFound: '180 custom price setups',
    activeUsed: '124 active in last 12m',
    revenueLinkage: 'Used in 18% of strategic-account workflows',
    migrationImportance: 'medium',
  },
  {
    id: 'c9',
    name: 'Renewals',
    itemsFound: '8 automation flows',
    activeUsed: '4 active flows',
    revenueLinkage: 'Used in 24% of recurring-revenue workflows',
    migrationImportance: 'medium',
  },
  {
    id: 'c10',
    name: 'Integrations',
    itemsFound: '4 APIs (ERP, Billing, Slack, CLM)',
    activeUsed: '4 active APIs',
    revenueLinkage: 'Affects 29% of handoff workflows',
    migrationImportance: 'high',
  },
];

export const KEY_FINDINGS = [
  'Most revenue runs through 6 operational workflows.',
  'Discount approvals and bundle configuration create the highest admin effort.',
  'Several legacy rules are inactive and should not move into the first implementation phase.',
];
