// ── Assess Page — CPQ Extraction & Assessment ─────────────────────────
// The trust-building screen showing extracted CPQ demographics, visual
// usage map, tabbed metadata catalog, operational workflows, and ROI.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Database,
  Users,
  FileText,
  Layers,
  Zap,
  CheckCircle2,
  Code2,
  Info,
  TrendingUp,
  Settings,
  ArrowRightCircle,
} from 'lucide-react';
import { HERO_STATS } from './assess-data';

const PRIORITY_STYLES = {
  critical: 'bg-rose-100 text-rose-700 border-rose-200',
  high: 'bg-amber-100 text-amber-700 border-amber-200',
  medium: 'bg-blue-100 text-blue-700 border-blue-200',
  low: 'bg-slate-100 text-slate-700 border-slate-200',
  ignore: 'bg-slate-100 text-slate-500 border-slate-200 border-dashed',
} as const;

const TABS = [
  'Overview',
  'Products',
  'Pricing',
  'Rules',
  'Code',
  'Integrations',
  'Amendments',
  'Approvals',
  'Documents',
  'Data & Reporting',
];

/* ── Business Users Data ──────────────────────────────────────────── */

interface BusinessWorkflow {
  id: string;
  name: string;
  usageVolume: string;
  revenueSupported: string;
  teamsInvolved: string;
  chips: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
}

const BUSINESS_WORKFLOWS: BusinessWorkflow[] = [
  {
    id: 'bw1',
    name: 'New business quote creation',
    usageVolume: '8,400 quotes/yr',
    revenueSupported: '76% of quoted revenue',
    teamsInvolved: 'Sales, Deal Desk',
    chips: ['Quotes', 'Products', 'Price Rules'],
    priority: 'critical',
  },
  {
    id: 'bw2',
    name: 'Renewal / amendment quoting',
    usageVolume: '1,840 quotes/yr',
    revenueSupported: '24% of quoted revenue',
    teamsInvolved: 'Account Management, CSM',
    chips: ['Renewals', 'Price Rules', 'Quotes'],
    priority: 'high',
  },
  {
    id: 'bw3',
    name: 'Bundle configuration / guided selling',
    usageVolume: '7,800 config runs',
    revenueSupported: 'touches 62% of quoted revenue',
    teamsInvolved: 'Sales, Solution Architects',
    chips: ['Products', 'Bundles', 'Product Rules'],
    priority: 'high',
  },
  {
    id: 'bw4',
    name: 'Price calculation and adjustment',
    usageVolume: '10,240 runs/yr',
    revenueSupported: 'touches 100% of quoted revenue',
    teamsInvolved: 'Sales Ops, Finance',
    chips: ['Price Rules', 'QCP', 'Price Books'],
    priority: 'critical',
  },
  {
    id: 'bw5',
    name: 'Enterprise discount approval',
    usageVolume: '340 approvals/qtr',
    revenueSupported: 'supports 10% of quoted revenue',
    teamsInvolved: 'Core Sales, Finance, Execs',
    chips: ['Price Rules', 'Discount Rules', 'Approval Rules', 'QCP'],
    priority: 'critical',
  },
  {
    id: 'bw6',
    name: 'Contracted pricing / account-specific pricing',
    usageVolume: '180 pricing setups',
    revenueSupported: 'supports 6% of quoted revenue',
    teamsInvolved: 'Strategic Sales, Legal',
    chips: ['Contracted Pricing', 'Price Rules', 'Approvals'],
    priority: 'high',
  },
  {
    id: 'bw7',
    name: 'Quote document generation',
    usageVolume: '10,240 documents',
    revenueSupported: 'touches 100% of quoted revenue',
    teamsInvolved: 'Sales, Customer Operations',
    chips: ['Quotes', 'Integrations'],
    priority: 'medium',
  },
  {
    id: 'bw8',
    name: 'Order creation / quote-to-order handoff',
    usageVolume: '4,200 orders/yr',
    revenueSupported: 'touches 88% of quoted revenue',
    teamsInvolved: 'Sales Ops, Billing Ops',
    chips: ['Quotes', 'Integrations', 'Orders'],
    priority: 'high',
  },
  {
    id: 'bw9',
    name: 'Subscription term / evergreen handling',
    usageVolume: '1,200 contracts',
    revenueSupported: 'supports 18% of quoted revenue',
    teamsInvolved: 'Finance, Customer Success',
    chips: ['Renewals', 'Quotes'],
    priority: 'medium',
  },
  {
    id: 'bw10',
    name: 'Blocked quote exception handling',
    usageVolume: '450 sync events',
    revenueSupported: 'touches 8% of quoted revenue',
    teamsInvolved: 'Deal Desk, IT Support',
    chips: ['Quotes', 'Integrations', 'Approval Rules'],
    priority: 'low',
  },
];

interface BusinessConfigArea {
  name: string;
  itemsFound: string;
  activeUsed: string;
  workflowImpact: string;
  priority: 'critical' | 'high' | 'medium' | 'low' | 'ignore';
}

const BUSINESS_CONFIGS: BusinessConfigArea[] = [
  { name: 'Quotes', itemsFound: '2 Record Types · 4 Layouts', activeUsed: '2 Record Types · 2 Layouts', workflowImpact: 'Impacts 100% of workflows', priority: 'critical' },
  { name: 'Products', itemsFound: '450 SKUs active in catalog', activeUsed: '112 SKUs active in last 12m', workflowImpact: 'Used in 94% of revenue workflows', priority: 'high' },
  { name: 'Bundles', itemsFound: '32 Bundles', activeUsed: '12 active Bundles', workflowImpact: 'Used in 42% of key workflows', priority: 'high' },
  { name: 'Price Rules', itemsFound: '142 Rules', activeUsed: '34 Rules active', workflowImpact: 'Affects 68% of quote workflows', priority: 'high' },
  { name: 'Discount Rules', itemsFound: '28 Rules', activeUsed: '16 Rules active', workflowImpact: 'Affects 37% of approval workflows', priority: 'medium' },
  { name: 'Approval Rules', itemsFound: '34 Advanced Approvals', activeUsed: '8 active Approval rules', workflowImpact: 'Controls 31% of approval workflows', priority: 'critical' },
  { name: 'QCP Scripts', itemsFound: '3 custom scripts (4,200 LOC)', activeUsed: '3 custom scripts', workflowImpact: 'Affects margin logic in 100% of quote workflows', priority: 'high' },
  { name: 'Contracted Pricing', itemsFound: '180 custom price setups', activeUsed: '124 active in last 12m', workflowImpact: 'Used in 18% of strategic-account workflows', priority: 'medium' },
  { name: 'Renewals', itemsFound: '8 automation flows', activeUsed: '4 active flows', workflowImpact: 'Used in 24% of recurring-revenue workflows', priority: 'medium' },
  { name: 'Integrations', itemsFound: '4 APIs (ERP, Billing, Slack, CLM)', activeUsed: '4 active APIs', workflowImpact: 'Affects 29% of handoff workflows', priority: 'high' },
];

interface BusinessOpportunity {
  name: string;
  currentWork: string;
  futureModel: string;
  outcome: string;
  roi: string;
  path: string;
}

const BUSINESS_OPPORTUNITIES: BusinessOpportunity[] = [
  {
    name: 'Discount Exception Agent',
    currentWork: 'Sales, Deal Desk, and Finance coordinate approval manually',
    futureModel: 'Agent prepares evidence, automation routes, humans approve exceptions',
    outcome: 'Same approval control, better evidence',
    roi: 'High',
    path: 'RCA Foundation + AI Agent + Human Approval',
  },
  {
    name: 'Renewal Amendment Assistant',
    currentWork: 'RevOps manually checks amendment logic and renewal terms',
    futureModel: 'Agent summarizes contract context and flags risky changes',
    outcome: 'Safer recurring revenue process',
    roi: 'High',
    path: 'RCA Foundation + AI Agent + Knowledge Capture',
  },
  {
    name: 'Configuration Assistant',
    currentWork: 'Reps depend on product rules and admin support for valid bundles',
    futureModel: 'Agent suggests valid bundles and flags conflicts',
    outcome: 'Fewer quote errors',
    roi: 'Medium',
    path: 'RCA Foundation + Automation',
  },
  {
    name: 'Contracted Pricing Assistant',
    currentWork: 'Strategic pricing exceptions require manual verification',
    futureModel: 'Agent checks account-specific pricing and explains eligibility',
    outcome: 'Faster strategic-account quoting',
    roi: 'Medium / High',
    path: 'Foundation + Agent',
  },
];

/* ── Admin Users Data ────────────────────────────────────────────── */

interface AdminWorkflow {
  rank: number;
  name: string;
  owner: string;
  effort: string;
  revenueSupported: string;
  futureModel: string;
  reduction: string;
}

const ADMIN_WORKFLOWS: AdminWorkflow[] = [
  { rank: 1, name: 'Quote status / mismatch investigation', owner: 'Sales Ops / Admin', effort: '12–18 hrs/month', revenueSupported: 'Quote-to-order handoff, 88% revenue touched', futureModel: 'Quote Status Agent', reduction: '60–70%' },
  { rank: 2, name: 'Approval follow-up and escalation', owner: 'Sales Ops', effort: '10–14 hrs/month', revenueSupported: 'Discount approvals, 10% revenue supported', futureModel: 'Approval Follow-Up Agent', reduction: '40–50%' },
  { rank: 3, name: 'Product launch readiness', owner: 'Product Ops', effort: '16–24 hrs/month', revenueSupported: 'Product catalog, 62% revenue touched', futureModel: 'Product Launch Readiness Agent', reduction: '50–60%' },
  { rank: 4, name: 'Product / price update validation', owner: 'Sales Ops', effort: '10–16 hrs/month', revenueSupported: 'Pricing workflows, 100% revenue touched', futureModel: 'Pricing Change Reviewer', reduction: '45–60%' },
  { rank: 5, name: 'Rule dependency review', owner: 'Admins', effort: '8–12 hrs/month', revenueSupported: 'Price/rule logic, 100% revenue touched', futureModel: 'Rule Dependency Reviewer', reduction: '50–65%' },
  { rank: 6, name: 'Deal Desk exception triage', owner: 'Deal Desk', effort: '25–35 hrs/month', revenueSupported: 'Discount approvals, 10% revenue supported', futureModel: 'Discount Exception Agent', reduction: '50–60%' },
  { rank: 7, name: 'Contracted pricing maintenance', owner: 'Admins', effort: '8–12 hrs/month', revenueSupported: 'Contracted pricing, 6% revenue supported', futureModel: 'Contracted Pricing Assistant', reduction: '30–40%' },
  { rank: 8, name: 'Renewal / amendment issue investigation', owner: 'RevOps', effort: '10–16 hrs/month', revenueSupported: 'Renewals & amendments, 24% revenue supported', futureModel: 'Renewal Amendment Assistant', reduction: '45–55%' },
  { rank: 9, name: 'Data cleanup / orphan record review', owner: 'Admins', effort: '6–10 hrs/month', revenueSupported: 'All configurations, 100% revenue touched', futureModel: 'Metadata Cleanup Trigger', reduction: '35–45%' },
  { rank: 10, name: 'Sandbox validation / release readiness', owner: 'SI / Admin', effort: '30–40 hrs/release', revenueSupported: 'Release cycle validation', futureModel: 'Sandbox Validation Assistant', reduction: '35–50%' },
];

interface AdminConfigArea {
  name: string;
  adminWork: string;
  activeItems: string;
  supportImpact: string;
  risk: 'critical' | 'high' | 'medium' | 'low' | 'ignore';
}

const ADMIN_CONFIGS: AdminConfigArea[] = [
  { name: 'Products', adminWork: 'SKU catalog validation & guided selling rules mapping', activeItems: '112 SKUs', supportImpact: 'Medium', risk: 'medium' },
  { name: 'Price Books', adminWork: 'Currencies sync & multi-currency price book setup', activeItems: '2 books', supportImpact: 'Low', risk: 'low' },
  { name: 'Product Rules', adminWork: 'Validation dependencies & option exclusion debugging', activeItems: '37 rules', supportImpact: 'High', risk: 'medium' },
  { name: 'Price Rules', adminWork: 'Sequence ordering conflicts & field injector troubleshooting', activeItems: '20 rules', supportImpact: 'High', risk: 'critical' },
  { name: 'Discount Schedules', adminWork: 'Tier calculation validation & custom term pricing', activeItems: '22 schedules', supportImpact: 'Medium', risk: 'medium' },
  { name: 'Approval Rules', adminWork: 'Approver routing issues & advanced approval configurations', activeItems: '8 rules', supportImpact: 'High', risk: 'critical' },
  { name: 'QCP Scripts', adminWork: 'Debug pricing behavior and margin exceptions', activeItems: '3 scripts', supportImpact: 'High', risk: 'critical' },
  { name: 'Contracted Pricing', adminWork: 'Strategic custom rate setups & account overrides', activeItems: '124 setups', supportImpact: 'Medium', risk: 'medium' },
  { name: 'Integrations', adminWork: 'Token expirations, sync failures & downstream mismatches', activeItems: '4 active APIs', supportImpact: 'High', risk: 'critical' },
  { name: 'Data Quality / Orphan Records', adminWork: 'Clean unused price options & legacy values', activeItems: '39 records', supportImpact: 'Low', risk: 'low' },
];

interface AdminOpportunity {
  name: string;
  currentEffort: string;
  futureModel: string;
  reduction: string;
  impact: string;
  path: string;
}

const ADMIN_OPPORTUNITIES: AdminOpportunity[] = [
  {
    name: 'Quote Status / Mismatch Agent',
    currentEffort: 'Admins manually investigate stuck quotes and mismatches',
    futureModel: 'Agent detects blockers and suggests fixes',
    reduction: '60–70%',
    impact: 'Faster quote-to-order handoff',
    path: 'Automation + Agent',
  },
  {
    name: 'Product Launch Readiness Agent',
    currentEffort: 'Admins validate products, bundles, pricing, and rules manually',
    futureModel: 'Agent checks launch readiness and missing dependencies',
    reduction: '50–60%',
    impact: 'Faster launches, fewer quote errors',
    path: 'Automation + Agent',
  },
  {
    name: 'Approval Follow-Up Agent',
    currentEffort: 'Sales Ops chases approvers through Slack/email',
    futureModel: 'Agent tracks approval status and escalates with context',
    reduction: '40–50%',
    impact: 'Shorter approval cycles',
    path: 'Automation + Agent + Human Approval',
  },
  {
    name: 'Rule Dependency Reviewer',
    currentEffort: 'Admins manually check downstream rule impacts before changes',
    futureModel: 'Agent highlights affected workflows and test scenarios',
    reduction: '50–65%',
    impact: 'Safer configuration changes',
    path: 'Agent + Validation',
  },
  {
    name: 'Sandbox Validation Assistant',
    currentEffort: 'SI/Admin manually runs and documents implementation tests',
    futureModel: 'Agent suggests tests and records evidence',
    reduction: '35–50%',
    impact: 'Faster release readiness',
    path: 'Agent + Validation',
  },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function AssessPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [userLens, setUserLens] = useState<'business' | 'admin'>('business');
  const [subTab, setSubTab] = useState<'workflows' | 'config' | 'opportunities'>('workflows');
  const [svgTab, setSvgTab] = useState(0);

  const stats = HERO_STATS;

  // Title and subtitle helper depending on active combination
  const getSectionHeader = () => {
    if (userLens === 'business') {
      if (subTab === 'workflows') {
        return {
          title: 'Revenue workflows supported by CPQ',
          subtitle: 'Shows which CPQ workflows support the largest share of quoted revenue and team activity.'
        };
      } else if (subTab === 'config') {
        return {
          title: 'Configuration areas powering business workflows',
          subtitle: 'Shows which CPQ foundations affect the workflows your teams use.'
        };
      } else {
        return {
          title: 'Business workflow transformation opportunities',
          subtitle: 'Shows where RevBrain can preserve business outcomes with a simpler AI-first operating model.'
        };
      }
    } else {
      if (subTab === 'workflows') {
        return {
          title: 'Where admin work is spent',
          subtitle: 'Shows the manual RevOps, admin, and Deal Desk effort required to support CPQ workflows and revenue.'
        };
      } else if (subTab === 'config') {
        return {
          title: 'Configuration areas creating admin effort',
          subtitle: 'Shows which CPQ foundations create the most support, maintenance, and validation work.'
        };
      } else {
        return {
          title: 'Admin effort reduction opportunities',
          subtitle: 'Shows where agents and automation can reduce recurring support work.'
        };
      }
    }
  };

  const getSectionMetric = () => {
    if (userLens === 'business') {
      if (subTab === 'workflows') {
        return {
          value: '87%',
          label: 'Revenue coverage',
          helper: 'from 22% of workflows'
        };
      } else if (subTab === 'config') {
        return {
          value: '75%',
          label: 'Active CPQ foundation',
          helper: 'supports top workflows'
        };
      } else {
        return {
          value: '65%',
          label: 'Less effort possible',
          helper: 'across selected workflows'
        };
      }
    } else {
      if (subTab === 'workflows') {
        return {
          value: '75+ hrs/mo',
          label: 'Recurring admin effort',
          helper: 'across support workflows'
        };
      } else if (subTab === 'config') {
        return {
          value: '142 + 34 + 5',
          label: 'Rules, approvals, scripts',
          helper: 'drive support burden'
        };
      } else {
        return {
          value: '45–65%',
          label: 'Effort reduction',
          helper: 'across admin workflows'
        };
      }
    }
  };

  const headerInfo = getSectionHeader();
  const metricInfo = getSectionMetric();

  return (
    <div className="w-full flex flex-col relative">
      
      {/* Scrollable Page Content Container */}
      <div className="max-w-[1520px] mx-auto w-full px-6 pt-5 pb-6 space-y-6 flex-1">
        
        {/* ─── A. Executive Summary Flow ─── */}
        <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Executive Summary</span>
            <span className="text-[hsl(var(--border))]">·</span>
            <span className="text-[hsl(var(--muted-foreground))] font-medium">
              {stats.activityWindow}
            </span>
          </div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))] leading-tight whitespace-nowrap">
            22% of CPQ workflows support 87% of quoted revenue across 37 active users in the last 12 months
          </h2>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3 pt-2">
            {/* Box 1: Active Users */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 mb-1">
                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Active Users</span>
                </div>
                <div className="text-lg font-extrabold text-slate-800">37 users</div>
              </div>
              <div className="space-y-1.5 mt-3 text-[10px] text-slate-500">
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>Frequent (12 users)</span>
                    <span className="font-semibold text-slate-700">Avg 18 days/mo</span>
                  </div>
                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>Moderate (15 users)</span>
                    <span className="font-semibold text-slate-700">Avg 7 days/mo</span>
                  </div>
                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>Rare (10 users)</span>
                    <span className="font-semibold text-slate-700">Avg 2 days/mo</span>
                  </div>
                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-300 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="flex lg:flex-col items-center justify-center px-1 text-[10px] font-bold text-slate-400 gap-1 shrink-0 self-center">
              <span className="lg:mb-0.5 text-slate-500">created</span>
              <ArrowRight className="w-4 h-4 text-slate-300 rotate-90 lg:rotate-0" />
            </div>

            {/* Box 2: Quotes */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 mb-1">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Quotes</span>
                </div>
                <div className="text-lg font-extrabold text-slate-800">10,240 quotes</div>
              </div>
              <ul className="space-y-1 mt-3 text-[10px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <span>Enterprise new business quotes</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <span>Renewal amendment quotes</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <span>Contracted pricing quotes</span>
                </li>
              </ul>
            </div>

            {/* Arrow 2 */}
            <div className="flex lg:flex-col items-center justify-center px-1 text-[10px] font-bold text-slate-400 gap-1 shrink-0 self-center">
              <span className="lg:mb-0.5 text-slate-500">generated</span>
              <ArrowRight className="w-4 h-4 text-slate-300 rotate-90 lg:rotate-0" />
            </div>

            {/* Box 3: Revenue */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Quoted revenue</span>
                </div>
                <div className="text-lg font-extrabold text-slate-800">$147M analyzed</div>
              </div>
              <ul className="space-y-1 mt-3 text-[10px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5 justify-between">
                  <span className="truncate">Top product families</span>
                  <span className="font-bold text-slate-700 shrink-0">$112M</span>
                </li>
                <li className="flex items-center gap-1.5 justify-between">
                  <span className="truncate">Discount approvals</span>
                  <span className="font-bold text-slate-700 shrink-0">$14.2M</span>
                </li>
                <li className="flex items-center gap-1.5 justify-between">
                  <span className="truncate">Renewal / amendment flow</span>
                  <span className="font-bold text-slate-700 shrink-0">$38M</span>
                </li>
              </ul>
            </div>

            {/* Arrow 3 */}
            <div className="flex lg:flex-col items-center justify-center px-1 text-[10px] font-bold text-slate-400 gap-1 shrink-0 self-center">
              <span className="lg:mb-0.5 text-slate-500">included</span>
              <ArrowRight className="w-4 h-4 text-slate-300 rotate-90 lg:rotate-0" />
            </div>

            {/* Box 4: Products */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 mb-1">
                  <Database className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Products</span>
                </div>
                <div className="text-lg font-extrabold text-slate-800">1,240 active products</div>
              </div>
              <ul className="space-y-1 mt-3 text-[10px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <span>SmartBytes Enterprise Suite</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <span>DataCloud Security Bundle</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <span>Platform Add-on Packages</span>
                </li>
              </ul>
            </div>

            {/* Arrow 4 */}
            <div className="flex lg:flex-col items-center justify-center px-1 text-[10px] font-bold text-slate-400 gap-1 shrink-0 self-center">
              <span className="lg:mb-0.5 text-slate-500">used</span>
              <ArrowRight className="w-4 h-4 text-slate-300 rotate-90 lg:rotate-0" />
            </div>

            {/* Box 5: Discounts / Pricing Logic */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 mb-1">
                  <Zap className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Discounts & pricing logic</span>
                </div>
                <div className="text-lg font-extrabold text-slate-800">48 price rules</div>
              </div>
              <ul className="space-y-1 mt-3 text-[10px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5 justify-between">
                  <span>Discount schedules</span>
                  <span className="font-bold text-slate-700">22</span>
                </li>
                <li className="flex items-center gap-1.5 justify-between">
                  <span>Approval rules</span>
                  <span className="font-bold text-slate-700">24</span>
                </li>
                <li className="flex items-center gap-1.5 justify-between">
                  <span>QCP scripts</span>
                  <span className="font-bold text-slate-700">5</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white border border-[hsl(var(--border))] rounded-xl overflow-hidden shadow-sm">
          
          {/* Connected horizontal segmented lens toggle */}
          <div className="flex border-b border-[hsl(var(--border))] bg-white p-3 gap-3">
            <button
              onClick={() => { setUserLens('business'); setSubTab('workflows'); }}
              className={`flex-1 py-3 px-4 text-center transition-all focus:outline-none rounded-lg border-2 ${
                userLens === 'business'
                  ? 'border-indigo-600 bg-white text-indigo-900 font-bold shadow-sm'
                  : 'border-slate-200 bg-white/50 text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs leading-normal">What your teams actually use</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Business users</span>
              </div>
            </button>
            <button
              onClick={() => { setUserLens('admin'); setSubTab('workflows'); }}
              className={`flex-1 py-3 px-4 text-center transition-all focus:outline-none rounded-lg border-2 ${
                userLens === 'admin'
                  ? 'border-indigo-600 bg-white text-indigo-900 font-bold shadow-sm'
                  : 'border-slate-200 bg-white/50 text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs leading-normal">What it takes to support it</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Admin users</span>
              </div>
            </button>
          </div>

          {/* Inner 3-tab navigation */}
          <div className="flex gap-1 border-b border-slate-100 pb-2 px-5 pt-4">
            {(['workflows', 'config', 'opportunities'] as const).map((tab) => {
              const label = tab === 'workflows' ? 'Current Workflows' : tab === 'config' ? 'Supporting Configuration' : 'Transformation Opportunities';
              const isActive = tab === subTab;
              return (
                <button
                  key={tab}
                  onClick={() => setSubTab(tab)}
                  className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[hsl(var(--accent))] text-white font-bold'
                      : 'text-[hsl(var(--muted-foreground))] hover:bg-slate-100 hover:text-[hsl(var(--foreground))]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Tab content area */}
          <div className="p-5">
            
            {/* Context title and subtitle directly below the tabs */}
            <div className="border-b border-slate-100 pb-3 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{headerInfo.title}</h4>
                <p className="text-xs text-slate-500 leading-normal mt-0.5">{headerInfo.subtitle}</p>
              </div>
              
              {/* Compact visual metric pill */}
              <div className="bg-indigo-50/50 border border-indigo-100/80 rounded-full px-4 py-1.5 flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                {/* Small indicator circle */}
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                
                <span className="text-sm font-extrabold text-indigo-600 tracking-tight leading-none">
                  {metricInfo.value}
                </span>
                
                <span className="text-[11px] font-bold text-indigo-950 uppercase tracking-wide leading-none border-l border-indigo-100 pl-2.5">
                  {metricInfo.label}
                </span>
                
                <span className="text-[11px] text-indigo-900/60 font-semibold border-l border-indigo-100 pl-2.5 leading-none">
                  {metricInfo.helper}
                </span>
              </div>
            </div>

            {/* 1. BUSINESS USERS LENS */}
            {userLens === 'business' && (
              <>
                {subTab === 'workflows' && (
                  <div className="space-y-3">
                    {/* SVG tab navigation */}
                    <div className="flex items-center justify-center gap-1">
                      {[
                        { label: 'Main Workflow', file: 'assess-workflows-table.svg' },
                        { label: 'Bottlenecks', file: 'assess-workflows-tab2.svg' },
                        { label: 'Dependencies', file: 'assess-workflows-tab3.svg' },
                      ].map((tab, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSvgTab(idx)}
                          className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                            svgTab === idx
                              ? 'bg-slate-800 text-white'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* SVG display */}
                    <div className="w-full flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 p-6 min-h-[320px]">
                      <img
                        key={svgTab}
                        src={`/assets/${['assess-workflows-table.svg', 'assess-workflows-tab2.svg', 'assess-workflows-tab3.svg'][svgTab]}`}
                        alt={`Workflows view ${svgTab + 1}`}
                        className="h-auto" style={{ width: '50%' }}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const filename = ['assess-workflows-table.svg', 'assess-workflows-tab2.svg', 'assess-workflows-tab3.svg'][svgTab];
                          target.parentElement!.innerHTML = `<p class="text-sm text-slate-400 font-medium text-center">SVG placeholder — upload <code>public/assets/${filename}</code></p>`;
                        }}
                      />
                    </div>
                  </div>
                )}

                {subTab === 'config' && (
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-12 gap-3 px-3 py-1 text-[9px] uppercase font-bold tracking-wider text-[hsl(var(--muted-foreground))] hidden md:grid border-b border-[hsl(var(--border))] pb-1.5">
                      <div className="col-span-3">Configuration Block</div>
                      <div className="col-span-3">Items Found</div>
                      <div className="col-span-2">Active in Last 12m</div>
                      <div className="col-span-3">Workflow Impact</div>
                      <div className="col-span-1 text-right">Priority</div>
                    </div>

                    {BUSINESS_CONFIGS.map((cfg, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-3 py-2 bg-white border border-[hsl(var(--border))] rounded-lg hover:shadow-sm hover:border-[hsl(var(--accent))]/30 transition-all card-interactive">
                        <div className="col-span-12 md:col-span-3 flex items-center gap-2">
                          <Database className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{cfg.name}</p>
                        </div>

                        <div className="col-span-12 md:col-span-3 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Items Found</span>
                          <span className="text-xs text-[hsl(var(--foreground))] font-mono">{cfg.itemsFound}</span>
                        </div>

                        <div className="col-span-12 md:col-span-2 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Active</span>
                          <span className="text-xs text-[hsl(var(--foreground))] font-mono">{cfg.activeUsed}</span>
                        </div>

                        <div className="col-span-12 md:col-span-3 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Workflow Impact</span>
                          <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">{cfg.workflowImpact}</span>
                        </div>

                        <div className="col-span-12 md:col-span-1 flex justify-between md:justify-end items-center">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Importance</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider border ${PRIORITY_STYLES[cfg.priority]}`}>
                            {cfg.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {subTab === 'opportunities' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-3 px-3 py-1.5 text-[9px] uppercase font-bold tracking-wider text-[hsl(var(--muted-foreground))] hidden md:grid border-b border-[hsl(var(--border))] pb-2">
                      <div className="col-span-2">Business Process</div>
                      <div className="col-span-2">Current Work</div>
                      <div className="col-span-3">Future AI-First Model</div>
                      <div className="col-span-2">Outcome</div>
                      <div className="col-span-1">ROI</div>
                      <div className="col-span-2 text-right">Path</div>
                    </div>

                    {BUSINESS_OPPORTUNITIES.map((opp, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-4 py-3 bg-white border border-[hsl(var(--border))] rounded-lg hover:shadow-sm hover:border-violet-300/50 transition-all card-interactive">
                        <div className="col-span-12 md:col-span-2">
                          <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{opp.name}</p>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Current Work</span>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{opp.currentWork}</p>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Future Model</span>
                          <p className="text-xs font-medium text-[hsl(var(--foreground))]">{opp.futureModel}</p>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Outcome</span>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{opp.outcome}</p>
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <span className="px-2 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider border bg-rose-100 text-rose-700 border-rose-200">{opp.roi}</span>
                        </div>
                        <div className="col-span-12 md:col-span-2 flex flex-wrap gap-1 justify-end">
                          {opp.path.split(' + ').map((p) => {
                            const badgeColor = p.includes('Foundation') ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : p.includes('Agent') ? 'bg-violet-100 text-violet-700 border border-violet-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200';
                            return (
                              <span key={p} className={`px-1.5 py-0.5 rounded text-[8px] font-semibold ${badgeColor}`}>{p}</span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* 2. ADMIN USERS LENS */}
            {userLens === 'admin' && (
              <>
                {subTab === 'workflows' && (
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-12 gap-3 px-3 py-1 text-[9px] uppercase font-bold tracking-wider text-[hsl(var(--muted-foreground))] hidden md:grid border-b border-[hsl(var(--border))] pb-1.5">
                      <div className="col-span-1">Rank</div>
                      <div className="col-span-3">Admin workflow</div>
                      <div className="col-span-2">Current Owner</div>
                      <div className="col-span-1">Effort Today</div>
                      <div className="col-span-2">Revenue/workflow supported</div>
                      <div className="col-span-2">Future model</div>
                      <div className="col-span-1 text-right">Est. Reduction</div>
                    </div>

                    {ADMIN_WORKFLOWS.map((wf) => (
                      <div key={wf.rank} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-3 py-2.5 bg-white border border-[hsl(var(--border))] rounded-lg hover:shadow-sm hover:border-[hsl(var(--accent))]/30 transition-all card-interactive">
                        <div className="col-span-1 flex items-center gap-2">
                          <span className="w-5.5 h-5.5 rounded bg-[hsl(var(--muted))] text-[10px] font-bold text-[hsl(var(--muted-foreground))] flex items-center justify-center shrink-0">
                            #{wf.rank}
                          </span>
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Rank</span>
                        </div>

                        <div className="col-span-11 md:col-span-3">
                          <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{wf.name}</p>
                        </div>

                        <div className="col-span-12 md:col-span-2 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Owner</span>
                          <span className="text-xs text-[hsl(var(--foreground))]">{wf.owner}</span>
                        </div>

                        <div className="col-span-12 md:col-span-1 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Effort Today</span>
                          <span className="text-xs font-mono font-medium text-[hsl(var(--foreground))]">{wf.effort}</span>
                        </div>

                        <div className="col-span-12 md:col-span-2 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Revenue/workflow supported</span>
                          <span className="text-xs text-[hsl(var(--muted-foreground))] block leading-snug">{wf.revenueSupported}</span>
                        </div>

                        <div className="col-span-12 md:col-span-2 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Future Model</span>
                          <span className="text-xs text-indigo-700 font-semibold block">{wf.futureModel}</span>
                        </div>

                        <div className="col-span-12 md:col-span-1 flex justify-between md:justify-end items-center">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Reduction</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                            {wf.reduction}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {subTab === 'config' && (
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-12 gap-3 px-3 py-1 text-[9px] uppercase font-bold tracking-wider text-[hsl(var(--muted-foreground))] hidden md:grid border-b border-[hsl(var(--border))] pb-1.5">
                      <div className="col-span-3">Configuration Block</div>
                      <div className="col-span-4">Admin Work Created</div>
                      <div className="col-span-2">Active Items</div>
                      <div className="col-span-2">Support Impact</div>
                      <div className="col-span-1 text-right">Risk</div>
                    </div>

                    {ADMIN_CONFIGS.map((cfg, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-3 py-2 bg-white border border-[hsl(var(--border))] rounded-lg hover:shadow-sm hover:border-[hsl(var(--accent))]/30 transition-all card-interactive">
                        <div className="col-span-12 md:col-span-3 flex items-center gap-2">
                          <Database className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{cfg.name}</p>
                        </div>

                        <div className="col-span-12 md:col-span-4 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Admin Work</span>
                          <span className="text-xs text-[hsl(var(--foreground))]">{cfg.adminWork}</span>
                        </div>

                        <div className="col-span-12 md:col-span-2 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Active</span>
                          <span className="text-xs text-[hsl(var(--foreground))] font-mono">{cfg.activeItems}</span>
                        </div>

                        <div className="col-span-12 md:col-span-2 grid grid-cols-2 md:block">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Support Impact</span>
                          <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">{cfg.supportImpact}</span>
                        </div>

                        <div className="col-span-12 md:col-span-1 flex justify-between md:justify-end items-center">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Risk</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider border ${PRIORITY_STYLES[cfg.risk]}`}>
                            {cfg.risk}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {subTab === 'opportunities' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-3 px-3 py-1.5 text-[9px] uppercase font-bold tracking-wider text-[hsl(var(--muted-foreground))] hidden md:grid border-b border-[hsl(var(--border))] pb-2">
                      <div className="col-span-2">Process</div>
                      <div className="col-span-3">Current Effort</div>
                      <div className="col-span-3">Future Model</div>
                      <div className="col-span-1.5 col-span-2">Impact</div>
                      <div className="col-span-1 text-right">Est. Reduction</div>
                    </div>

                    {ADMIN_OPPORTUNITIES.map((opp, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-4 py-3 bg-white border border-[hsl(var(--border))] rounded-lg hover:shadow-sm hover:border-violet-300/50 transition-all card-interactive">
                        <div className="col-span-12 md:col-span-2">
                          <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{opp.name}</p>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Current</span>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{opp.currentEffort}</p>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Future Model</span>
                          <p className="text-xs font-medium text-[hsl(var(--foreground))]">{opp.futureModel}</p>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Impact</span>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{opp.impact}</p>
                        </div>
                        <div className="col-span-12 md:col-span-1 flex justify-between md:justify-end items-center">
                          <span className="md:hidden text-[9px] uppercase font-bold text-slate-400">Reduction</span>
                          <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">{opp.reduction}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>
        </section>

        {/* ─── Current vs Future ROI Visual ─── */}
        <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-5">
            Current effort vs Future operating model
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch">
            {/* LEFT: Current */}
            <div className="bg-rose-50/60 border border-rose-200/60 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700">Current manual work</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <p className="text-xs text-[hsl(var(--foreground))]">Deal Desk + Finance manual discount review</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p className="text-xs text-[hsl(var(--foreground))]">Admin routes emails + Slack follow-ups for stuck quotes</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p className="text-xs text-[hsl(var(--foreground))]">RevOps validates amendment paths manually</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <p className="text-xs text-[hsl(var(--foreground))]">SI/Admin validates product bundles and dependencies</p>
              </div>
            </div>

            {/* CENTER: Arrow */}
            <div className="hidden md:flex flex-col items-center justify-center gap-2">
              <ArrowRightCircle className="w-8 h-8 text-[hsl(var(--accent))]" />
              <span className="text-[9px] uppercase font-bold tracking-wider text-[hsl(var(--muted-foreground))] [writing-mode:vertical-lr] rotate-180">Transform</span>
            </div>
            <div className="md:hidden flex justify-center py-1">
              <ArrowRightCircle className="w-6 h-6 text-[hsl(var(--accent))] rotate-90" />
            </div>

            {/* RIGHT: Future */}
            <div className="bg-indigo-50/60 border border-indigo-200/60 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700">Future AI-first model</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <p className="text-xs text-[hsl(var(--foreground))]">RCA foundation handles pricing rules and product logic</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <p className="text-xs text-[hsl(var(--foreground))]">Automation routes standard approvals and status updates</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                <p className="text-xs text-[hsl(var(--foreground))]">AI Agent explains exceptions and gathers evidence</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="text-xs text-[hsl(var(--foreground))]">Humans approve only when needed — with full AI context</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── B. CPQ at a Glance ─── */}
        <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[hsl(var(--border))] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              CPQ at a glance
            </h3>
            <div className="flex flex-wrap gap-1 border-b border-slate-100 pb-1">
              {TABS.map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 -mb-[2px] ${
                      isActive
                        ? 'border-[hsl(var(--accent))] text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/5 font-bold'
                        : 'border-transparent text-[hsl(var(--muted-foreground))] hover:bg-slate-50 hover:text-[hsl(var(--foreground))]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5">
            {activeTab === 'Overview' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Product Catalog */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-slate-500" />
                    <span>Product Catalog</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Active Products</span>
                      <span className="font-semibold text-slate-800">175</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Inactive Products</span>
                      <span className="font-semibold text-slate-800">4</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Bundle-capable</span>
                      <span className="font-semibold text-slate-800">19</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Product Options</span>
                      <span className="font-semibold text-slate-800">475</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Price Books</span>
                      <span className="font-semibold text-slate-800">2</span>
                    </li>
                  </ul>
                </div>

                {/* Card 2: Pricing & Rules */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-slate-500" />
                    <span>Pricing & Rules</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Price Rules Active</span>
                      <span className="font-semibold text-slate-800">20</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Product Rules</span>
                      <span className="font-semibold text-slate-800">37</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Discount Schedules</span>
                      <span className="font-semibold text-slate-800">22</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Custom Scripts (QCP)</span>
                      <span className="font-semibold text-slate-800">5</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Configured QCP</span>
                      <span className="font-semibold text-slate-800">Active</span>
                    </li>
                  </ul>
                </div>

                {/* Card 3: Quoting (90 Days) */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Quoting (90 Days)</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Quotes Created</span>
                      <span className="font-semibold text-slate-800">24</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Quote Lines</span>
                      <span className="font-semibold text-slate-800">0</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Avg Lines / Quote</span>
                      <span className="font-semibold text-slate-800">0</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Active Users</span>
                      <span className="font-semibold text-slate-800">6</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Orders Created</span>
                      <span className="font-semibold text-slate-800">558</span>
                    </li>
                  </ul>
                </div>

                {/* Card 4: Technical Debt */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span>Technical Debt</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Dormant Products</span>
                      <span className="font-semibold text-slate-800">2% (4)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Inactive Rules</span>
                      <span className="font-semibold text-slate-800">9</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Stale/Test Rules</span>
                      <span className="font-semibold text-slate-800">0</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Duplicate Schedules</span>
                      <span className="font-semibold text-slate-800">11</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Orphaned Records</span>
                      <span className="font-semibold text-slate-800">39</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200/80 rounded-xl p-8 text-center text-xs text-slate-500 font-medium space-y-1 py-12">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <p className="text-slate-800 font-semibold">{activeTab} Details</p>
                <p>Detailed telemetry and extracted metadata highlights are coming in the next release.</p>
              </div>
            )}
          </div>
        </section>

      </div>

    </div>
  );
}
