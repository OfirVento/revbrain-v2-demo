// Understand page data — matches wireframe structure

export const SALES_HANDOFF = {
  customerGoal: 'Move from CPQ to ARM with minimum risk to active quoting.',
  executiveConcern: 'Need confidence that current functionality can carry over.',
  objections: ['Implementation effort', 'Data migration', 'Quote history', 'Renewal process disruption'],
  clientNotes: [
    'Enterprise quoting is the priority.',
    'Legacy SMB bundles may not need to migrate.',
    'CFO asked about historical quote records.',
    'RevOps wants approval logic reviewed before scope is finalized.',
  ],
  salesRecommendation: 'Scope around active usage first, then review legacy configuration separately.',
};

export const COMPLEXITY_DIMENSIONS = [
  { label: 'Configuration', score: 32 },
  { label: 'Pricing Logic', score: 36 },
  { label: 'Customization', score: 23 },
  { label: 'Data & Usage', score: 22 },
  { label: 'Tech Debt', score: 10 },
];

export const STAT_TILES = [
  { value: '3,687', label: 'Total Items' },
  { value: '9', label: 'Areas Scanned' },
  { value: '0', label: 'Critical Blockers' },
  { value: '26/100', label: 'Complexity Score' },
];

export const GLANCE_CARDS = [
  { title: 'Product Catalog', rows: [
    { label: 'Active Products', value: '176' },
    { label: 'Inactive Products', value: '3' },
    { label: 'Product Options', value: '475' },
    { label: 'Price Books', value: '2' },
  ]},
  { title: 'Pricing & Rules', rows: [
    { label: 'Price Rules (Active)', value: '20' },
    { label: 'Product Rules', value: '37' },
    { label: 'Discount Schedules', value: '22' },
    { label: 'Custom Scripts (QCP)', value: '5' },
  ]},
  { title: 'Quoting (90 Days)', rows: [
    { label: 'Quotes Created', value: '487' },
    { label: 'Quote Lines', value: '~2,300' },
    { label: 'Avg Lines/Quote', value: '4.7' },
    { label: 'Active Users', value: '84' },
  ]},
  { title: 'Technical Debt', rows: [
    { label: 'Dormant Products', value: '87 (50%)' },
    { label: 'Inactive Rules', value: '9' },
    { label: 'Duplicate Schedules', value: '11' },
    { label: 'Orphaned Records', value: '39' },
  ]},
];

export const AREA_COMPLEXITY = [
  { label: 'Products', tier: 'Low', count: 179, fillPct: 20 },
  { label: 'Pricing', tier: 'Moderate', count: 327, fillPct: 45 },
  { label: 'Rules', tier: 'Moderate', count: 1081, fillPct: 50 },
  { label: 'Code', tier: 'Moderate', count: 1731, fillPct: 50 },
  { label: 'Integrations', tier: 'Low', count: 157, fillPct: 20 },
  { label: 'Amendments', tier: 'Low', count: 4, fillPct: 25 },
  { label: 'Approvals', tier: 'Moderate', count: 80, fillPct: 40 },
  { label: 'Documents', tier: 'Moderate', count: 23, fillPct: 45 },
  { label: 'Data & Reporting', tier: 'Low', count: 105, fillPct: 20 },
];

export const TOP_RISKS = [
  { severity: 'High', text: 'SmartBytes: Filter (Security Operations Feature)' },
  { severity: 'High', text: 'Implements CPQ plugin: SBQQ.QuoteCalculatorPlugin' },
  { severity: 'High', text: 'Implements CPQ plugin: SBQQ.QuoteCalculatorPlugin2' },
  { severity: 'High', text: 'CPQ-related Apex (109 classes, 8 triggers)' },
  { severity: 'High', text: 'Implements CPQ plugin: SBQQ.ProductRecommendation' },
  { severity: 'High', text: 'Implements CPQ plugin: SBQQ.CalculateCallback' },
];

export const CPQ_SETTINGS = [
  { setting: 'Multi-Currency', value: 'Enabled (AUD, GBP, EUR, NZD, USD)' },
  { setting: 'Twin Fields', value: 'Enabled (9 fields)' },
  { setting: 'Quote Line Editor', value: 'Enabled' },
  { setting: 'Contracted Pricing', value: 'Enabled' },
  { setting: 'Subscription Proration', value: 'By Subscription End Date' },
  { setting: 'Package: Salesforce Billing', value: 'v232.3.0' },
  { setting: 'Package: Launch Flow Modal', value: 'v1.10.0' },
];

export const PLUGINS = [
  { name: 'Quote Calculator Plugin (QCP)', status: 'Active' },
  { name: 'Electronic Signature', status: 'Active' },
  { name: 'Document Store Plugin', status: 'Not Configured' },
  { name: 'Payment Gateway', status: 'Not Configured' },
  { name: 'External Configurator', status: 'Not Configured' },
  { name: 'Recommended Products Plugin', status: 'Active' },
];

export const DATA_QUALITY = [
  { label: 'Products with Blank Family', status: '5 found', ok: false },
  { label: 'Orphaned Quote Lines', status: 'Clean', ok: true },
  { label: 'Duplicate Product Codes', status: '4 found', ok: false },
  { label: 'Inactive Products on Ordered Quotes', status: 'Clean', ok: true },
  { label: 'Invalid Picklist Values', status: 'Clean', ok: true },
];

export const USAGE_PROFILE = {
  highComplexity: ['Pricing logic', 'Approval exceptions', 'Historical quote data'],
  lowUsage: ['Retired bundles', 'Old approval branches', 'Unused quote templates', '87 dormant products and 39 orphan product features'],
};
