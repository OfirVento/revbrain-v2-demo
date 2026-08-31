import { useUiStore } from '@/store';
import type { EvidenceTrail } from '@/types/assessment';
import { clsx } from 'clsx';

type Confidence = 'High' | 'Medium' | 'Low';

interface Capability {
  id: string;
  name: string;
  oneLiner: string;
  kbDescription: string;
  confidence: Confidence;
  evidence: EvidenceTrail;
}

const RCA_CAPABILITIES: Capability[] = [
  {
    id: 'pricing-procedures',
    name: 'Pricing Procedures',
    oneLiner: 'Auditable price waterfall replaces QCP scripts with declarative BRE steps.',
    kbDescription:
      'The Business Rules Engine (BRE) executes pricing as an ordered set of Expression Sets and Decision Tables. Every step is logged and auditable — finance can trace exactly why a price was produced. Replaces QCP JavaScript, Apex pricing triggers, and complex price rule chains. Supports parallel execution for performance-sensitive catalogs.',
    confidence: 'High',
    evidence: {
      summary: [
        'Replaces 5 unregistered Custom QCP plugins with declarative BRE Expression Sets.',
        'Retires 20 active CPQ Price Rules, eliminating complex execution order dependencies.',
      ],
      detailed: [
        { metric: 'Source CPQ Artifact', value: '5 QCP Scripts, 20 Price Rules', source: 'Metadata' },
        { metric: 'Target ARM Artifact', value: 'BRE Expression Sets & Decision Tables', source: 'ARM Mapping' },
        { metric: 'Applicability Criteria', value: 'Requires dynamic margin calculation (Met)', source: 'Code Inventory' },
      ],
      raw: {
        artifactReferences: ['rcaOpportunities[id=pricing-procedures]', 'codeInventory[type=ApexClass]'],
        metadataExtracts: {
          qcpCount: 5,
          activePriceRules: 20,
          unregisteredPlugins: 14,
        },
      },
    },
  },
  {
    id: 'cml',
    name: 'CML Configuration',
    oneLiner: 'Type-safe product constraints replace point-and-click product rules.',
    kbDescription:
      'Configuration Modeling Language (CML) defines product validity, relationships, and constraints as a typed model that the constraint solver enforces at configuration time — before save. Incompatible product combinations, cardinality limits, and mandatory bundles are caught immediately. Replaces CPQ Product Rules and most Option Constraints.',
    confidence: 'High',
    evidence: {
      summary: [
        'Replaces CPQ Product Rules and Option Constraints with a type-safe CML constraint model.',
        'Improves configuration UI performance and prevents invalid bundle saves.',
      ],
      detailed: [
        { metric: 'Source CPQ Artifact', value: 'Product Rules, Option Constraints', source: 'Metadata' },
        { metric: 'Target ARM Artifact', value: 'CML Types, Constraints', source: 'ARM Mapping' },
        { metric: 'Applicability Criteria', value: 'Complex bundle cardinality (Met)', source: 'Catalog Rules' },
      ],
      raw: {
        artifactReferences: ['rcaOpportunities[id=cml]'],
      },
    },
  },
  {
    id: 'product-discovery',
    name: 'Product Discovery',
    oneLiner: 'Guided, AI-assisted product selection replaces catalog browsing.',
    kbDescription:
      'Product Discovery uses qualification rules and scoring to surface the right products for each buyer context. Guided selling flows replace static product lookup filters. Context Service injects account attributes (region, segment, lifecycle stage) to dynamically filter and rank the catalog without Apex.',
    confidence: 'Medium',
    evidence: {
      summary: [
        'Replaces CPQ Guided Selling prompts and static Search Filters with dynamic Product Discovery context.',
      ],
      detailed: [
        { metric: 'Source CPQ Artifact', value: 'Guided Selling Flows, Search Filters', source: 'Metadata' },
        { metric: 'Target ARM Artifact', value: 'Context Service, Discovery Flows', source: 'ARM Mapping' },
      ],
      raw: {
        artifactReferences: ['rcaOpportunities[id=product-discovery]'],
      },
    },
  },
  {
    id: 'dro',
    name: 'Dynamic Revenue Orchestrator',
    oneLiner: 'Native fulfillment orchestration eliminates custom provisioning integrations.',
    kbDescription:
      'DRO (Dynamic Revenue Orchestrator) coordinates post-order fulfillment across systems using Asset-based lifecycle management. OrderItem triggers AssetAction flows that update AssetStatePeriod records, eliminating custom Apex provisioning bridges. Particularly relevant for orgs with undocumented legacy provisioning integrations.',
    confidence: 'High',
    evidence: {
      summary: [
        'Eliminates undocumented custom Apex provisioning bridges identified in the 109 Apex classes.',
        'Standardizes fulfillment across legacy external systems.',
      ],
      detailed: [
        { metric: 'Source CPQ Artifact', value: 'Custom Apex Provisioning Triggers', source: 'Metadata' },
        { metric: 'Target ARM Artifact', value: 'AssetAction Flows, AssetStatePeriod', source: 'ARM Mapping' },
      ],
      raw: {
        artifactReferences: ['rcaOpportunities[id=dro]', 'codeInventory[type=ApexTrigger]'],
        metadataExtracts: {
          totalApexClasses: 109,
          suspectedIntegrationTriggers: 12,
        },
      },
    },
  },
  {
    id: 'billing',
    name: 'Revenue Billing',
    oneLiner: 'Native invoicing and revenue schedules eliminate external billing dependencies.',
    kbDescription:
      'Salesforce Billing (now Revenue Billing in ARM) manages invoice generation, payment schedules, and billing treatment rules natively. BillingTreatment and BillingPolicy objects control proration, cancellation credit, and amendment billing — replacing external billing systems for orgs ready to consolidate.',
    confidence: 'High',
    evidence: {
      summary: [
        'Consolidates external billing logic directly onto the ARM core data model.',
      ],
      detailed: [
        { metric: 'Source CPQ Artifact', value: 'External Billing API Sync', source: 'Architecture' },
        { metric: 'Target ARM Artifact', value: 'BillingTreatment, BillingPolicy', source: 'ARM Mapping' },
      ],
      raw: {
        artifactReferences: ['rcaOpportunities[id=billing]'],
      },
    },
  },
  {
    id: 'usage-management',
    name: 'Usage Management',
    oneLiner: 'Rated usage pricing replaces flat subscription models for consumption products.',
    kbDescription:
      'Usage Management ingests metered consumption data, applies rating rules, and generates usage-based line items for billing. Supports flat, tiered, and block rating models natively. UsageConsumptionSchedule and UnitOfMeasure records replace custom usage calculation triggers.',
    confidence: 'Medium',
    evidence: {
      summary: [
        'Allows migration from custom usage-rating Apex to native ARM usage pricing objects.',
      ],
      detailed: [
        { metric: 'Source CPQ Artifact', value: 'Custom Consumption Triggers', source: 'Metadata' },
        { metric: 'Target ARM Artifact', value: 'UsageConsumptionSchedule', source: 'ARM Mapping' },
      ],
      raw: {
        artifactReferences: ['rcaOpportunities[id=usage-management]'],
      },
    },
  },
  {
    id: 'revenue-recognition',
    name: 'Revenue Recognition',
    oneLiner: 'ASC 606-compliant rev rec schedules generated automatically at order.',
    kbDescription:
      'Revenue Recognition in ARM generates RevenueSchedule records aligned to contract performance obligations at order creation. Supports time-based, milestone-based, and usage-based recognition patterns. FinanceBook and RevenuePolicy objects control treatment by product family, eliminating manual spreadsheet-based rev rec processes.',
    confidence: 'Medium',
    evidence: {
      summary: [
        'Automates ASC 606 revenue schedules upon order creation, replacing external spreadsheets.',
      ],
      detailed: [
        { metric: 'Source CPQ Artifact', value: 'Manual Finance Operations', source: 'Discovery' },
        { metric: 'Target ARM Artifact', value: 'RevenuePolicy, RevenueSchedule', source: 'ARM Mapping' },
      ],
      raw: {
        artifactReferences: ['rcaOpportunities[id=revenue-recognition]'],
      },
    },
  },
  {
    id: 'agentforce',
    name: 'AI Agent for Revenue',
    oneLiner: 'AI agents automate quote drafting, renewal outreach, and expansion plays.',
    kbDescription:
      'AI Agent Revenue agents operate on the ARM data model natively — drafting quotes from email intent, identifying renewal risk from AssetStatePeriod signals, and surfacing upsell plays from usage patterns. No custom agent configuration required for standard revenue actions when the ARM data model is implemented correctly.',
    confidence: 'Low',
    evidence: {
      summary: [
        'Identified as a future roadmap capability once the baseline migration to ARM stabilizes.',
      ],
      detailed: [
        { metric: 'Applicability Criteria', value: 'Requires clean baseline ARM deployment', source: 'Best Practice' },
      ],
      raw: {
        artifactReferences: ['rcaOpportunities[id=agentforce]'],
      },
    },
  },
];

const CONFIDENCE_COLORS: Record<Confidence, string> = {
  High: 'bg-green-500/10 text-green-500 border-green-500/20',
  Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Low: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export function CapabilityTileGrid() {
  const { openEvidenceDrawer } = useUiStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-header">ARM Capabilities Unlocked</h2>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">KB §1 · {RCA_CAPABILITIES.length} capabilities</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {RCA_CAPABILITIES.map((cap) => (
          <button
            key={cap.id}
            onClick={() => openEvidenceDrawer(cap.evidence, cap.name)}
            className={clsx(
              'card-sm text-left group transition-all duration-200',
              'hover:border-[hsl(var(--accent))]/50 hover:shadow-sm flex flex-col justify-between h-full min-h-[120px]'
            )}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold group-hover:text-[hsl(var(--accent))] transition-colors">
                  {cap.name}
                </p>
                <span className={clsx(
                  'text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0',
                  CONFIDENCE_COLORS[cap.confidence]
                )}>
                  {cap.confidence}
                </span>
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                {cap.oneLiner}
              </p>
            </div>
            <span className="text-xs font-semibold text-[hsl(var(--accent))] group-hover:underline">
              Learn more ↗
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
