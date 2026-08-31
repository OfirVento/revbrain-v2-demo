export const rcaOpportunities = [
  {
    id: "opp-price-waterfall",
    cpqFinding: "Pricing logic spread across 7 QCP scripts and 47 price rules with no audit trail",
    rcaCapability: "Pricing Procedures with Price Waterfall",
    rcaTargetPattern: "BRE Expression Sets with step-based execution",
    businessBenefit: "Every pricing decision becomes transparent and auditable via the price waterfall — finance teams can trace any line item's price from list through each adjustment to net.",
    expansionSignal: null,
    confidence: "High",
    evidence: {
      summary: [
        "47 price rules and 7 QCP scripts currently execute without audit trail",
        "RCA Pricing Procedures generate a price waterfall for every line item",
        "Finance team currently relies on manual spot-checks for pricing accuracy"
      ],
      detailed: [
        { metric: "Price rules without audit trail", value: 47, source: "SBQQ__PriceRule__c query" },
        { metric: "QCP scripts (browser-side, no logging)", value: 7, source: "StaticResource scan" },
        { metric: "Pricing-related support tickets (monthly)", value: 12, source: "Case query analysis" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-segment-discount", "artifact:pr-volume-discount", "artifact:pr-customer-tier-override"],
        metadataExtracts: {}
      }
    }
  },
  {
    id: "opp-cml-configuration",
    cpqFinding: "3 product rules enforcing validation and selection logic via point-and-click builder",
    rcaCapability: "Product Configurator with Constraint Modeling Language (CML)",
    rcaTargetPattern: "CML type system with constraints and relationships",
    businessBenefit: "CML replaces fragile point-and-click product rules with a compiled constraint language that solves at sub-second speed even with 10,000+ line items.",
    expansionSignal: null,
    confidence: "High",
    evidence: {
      summary: [
        "3 product rules handle validation, auto-include, and filtering logic",
        "CML compiles constraints and solves during configuration, not at save time",
        "Sub-second solve time even at 10,000+ line items"
      ],
      detailed: [
        { metric: "Product validation rules", value: 1, source: "SBQQ__ProductRule__c (Type=Validation)" },
        { metric: "Product selection rules", value: 1, source: "SBQQ__ProductRule__c (Type=Selection)" },
        { metric: "Product filter rules", value: 1, source: "SBQQ__ProductRule__c (Type=Filter)" }
      ],
      raw: {
        artifactReferences: ["artifact:prd-incompatible-products", "artifact:prd-auto-include-support", "artifact:prd-region-filter"],
        metadataExtracts: {}
      }
    }
  },
  {
    id: "opp-server-side-pricing",
    cpqFinding: "QCP scripts execute browser-side JavaScript, creating performance ceiling on large quotes",
    rcaCapability: "Server-side Pricing Execution",
    rcaTargetPattern: "Pricing Procedures executed server-side via BRE",
    businessBenefit: "Moving pricing from browser JavaScript to server-side BRE execution eliminates the performance ceiling on large quotes and enables headless pricing for API-driven workflows.",
    expansionSignal: null,
    confidence: "High",
    evidence: {
      summary: [
        "QCP scripts run in browser — performance degrades above 200 line items",
        "Server-side BRE pricing scales to thousands of line items",
        "Enables headless pricing for API and batch workflows"
      ],
      detailed: [
        { metric: "Avg quote line count", value: 34, source: "SBQQ__QuoteLine__c aggregation" },
        { metric: "Max quote line count (P99)", value: 280, source: "SBQQ__QuoteLine__c aggregation" },
        { metric: "Browser timeout incidents (monthly)", value: 8, source: "User-reported issues" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-segment-discount", "artifact:qcp-bundle-pricing"],
        metadataExtracts: {}
      }
    }
  },
  {
    id: "opp-dro-provisioning",
    cpqFinding: "Legacy in-house provisioning system with undocumented API and manual handoff after order activation",
    rcaCapability: "Dynamic Revenue Orchestrator (DRO)",
    rcaTargetPattern: "FulfillmentPlan with FulfillmentSteps and external callout",
    businessBenefit: "DRO automates post-order fulfillment with dependency management, retry logic, and jeopardy rules — replacing the manual handoff to the provisioning system with orchestrated, auditable steps.",
    expansionSignal: "DRO",
    confidence: "Medium",
    evidence: {
      summary: [
        "Manual handoff between order activation and provisioning system",
        "Provisioning API lacks documentation — integration risk",
        "DRO can orchestrate external callouts with retry and fallout handling"
      ],
      detailed: [
        { metric: "Monthly provisioning handoffs", value: 1200, source: "Outbound callout logs" },
        { metric: "Provisioning error rate", value: "3.2%", source: "Callout error logs" },
        { metric: "Avg time to resolve provisioning failure", value: "4.2 hours", source: "Case resolution analysis" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-tax-callout"],
        metadataExtracts: { triggerCondition: "Outbound integration to undocumented provisioning API" }
      }
    }
  },
  {
    id: "opp-billing-consolidation",
    cpqFinding: "Stripe payment integration with manual reconciliation between Salesforce and billing",
    rcaCapability: "Revenue Cloud Billing",
    rcaTargetPattern: "BillingSchedule + BillingTreatment + Invoice generation",
    businessBenefit: "Consolidating billing into Salesforce eliminates the manual reconciliation between Stripe and the CRM, enables consolidated invoicing, and provides a single source of truth for revenue data.",
    expansionSignal: "Billing",
    confidence: "Medium",
    evidence: {
      summary: [
        "Stripe handles payment processing but billing data is re-keyed into Salesforce",
        "Manual reconciliation between Stripe dashboard and Salesforce reports",
        "RCA Billing can generate invoices, process payments, and manage credits natively"
      ],
      detailed: [
        { metric: "Monthly invoices processed via Stripe", value: 890, source: "Stripe integration logs" },
        { metric: "Manual reconciliation hours (monthly)", value: 24, source: "Finance team estimate" },
        { metric: "Billing discrepancies (monthly)", value: 6, source: "Finance reconciliation report" }
      ],
      raw: {
        artifactReferences: [],
        metadataExtracts: { currentBillingSystem: "Stripe", reconciliationMethod: "Manual CSV export + Salesforce import" }
      }
    }
  },
  {
    id: "opp-advanced-approvals",
    cpqFinding: "Complex quote approval routing via custom Apex trigger with multi-level threshold logic",
    rcaCapability: "Advanced Approvals (Native)",
    rcaTargetPattern: "ApprovalSubmission + ApprovalWorkItem declarative workflows",
    businessBenefit: "RCA Advanced Approvals is included at no additional license cost and replaces the CPQ Advanced Approvals managed package with native, configurable multi-step workflows.",
    expansionSignal: "Advanced_Approvals",
    confidence: "High",
    evidence: {
      summary: [
        "Custom Apex trigger routes approvals based on discount thresholds and deal size",
        "Current approval chain spans 3 levels: rep → manager → VP",
        "RCA Advanced Approvals handles this declaratively with no license cost"
      ],
      detailed: [
        { metric: "Approval levels", value: 3, source: "Approval process configuration" },
        { metric: "Approval triggers per month", value: 340, source: "ApprovalRequest query" },
        { metric: "Avg approval cycle time", value: "2.3 days", source: "Approval process report" }
      ],
      raw: {
        artifactReferences: ["artifact:apex-approval-routing"],
        metadataExtracts: { thresholds: { level1: "discount > 10%", level2: "deal > $50K", level3: "deal > $200K" } }
      }
    }
  },
  {
    id: "opp-revenue-recognition",
    cpqFinding: "Revenue recognition managed manually in spreadsheets by finance team",
    rcaCapability: "Revenue Recognition",
    rcaTargetPattern: "RevenueSchedule + RevenueTreatment + RevenueDistribution",
    businessBenefit: "Automates ASC 606 / IFRS 15 compliant revenue schedules, reducing manual effort and audit risk for the finance team.",
    expansionSignal: "Revenue_Recognition",
    confidence: "Medium",
    evidence: {
      summary: [
        "Finance team manually calculates revenue recognition in Excel",
        "Multi-element arrangements require standalone selling price allocation",
        "RCA Revenue Recognition automates ASC 606 compliance"
      ],
      detailed: [
        { metric: "Monthly rev rec entries (manual)", value: 180, source: "Finance team estimate" },
        { metric: "Multi-element arrangements", value: 45, source: "Contract analysis" },
        { metric: "Annual audit preparation hours", value: 120, source: "Finance team estimate" }
      ],
      raw: {
        artifactReferences: [],
        metadataExtracts: { complianceStandard: "ASC 606", currentMethod: "Manual spreadsheet allocation" }
      }
    }
  },
  {
    id: "opp-agentforce",
    cpqFinding: "Sales team lacks AI-assisted pricing guidance and deal scoring",
    rcaCapability: "Agentforce for Revenue Management",
    rcaTargetPattern: "AI agents with pre-built pricing and contract topics",
    businessBenefit: "AI agents can provide real-time pricing recommendations, contract analysis, and anomaly detection — enabling reps to price deals faster and more accurately.",
    expansionSignal: "Agentforce",
    confidence: "Low",
    evidence: {
      summary: [
        "Sales reps currently price deals based on tribal knowledge and manager guidance",
        "No automated deal scoring or pricing recommendation system in place",
        "Agentforce for Revenue Management provides pre-built AI pricing topics"
      ],
      detailed: [
        { metric: "Deals requiring manager pricing guidance", value: "~60%", source: "Sales manager estimate" },
        { metric: "Avg discount approval cycle", value: "1.8 days", source: "Approval process report" },
        { metric: "Pricing override rate", value: "34%", source: "SBQQ__QuoteLine__c analysis" }
      ],
      raw: {
        artifactReferences: [],
        metadataExtracts: { aiReadiness: "Low — no current Agentforce deployment", futureState: true }
      }
    }
  }
];
