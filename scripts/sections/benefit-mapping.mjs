export const rcaBenefitMapping = [
  {
    cpqPainPoint: "Pricing logic spread across QCP scripts and price rules with no audit trail",
    rcaCapability: "Pricing Procedures with Price Waterfall",
    businessBenefit: "Every pricing decision becomes transparent and auditable — finance can trace any price from list through each adjustment step to net.",
    salesforceExpansion: null,
    confidence: "High",
    evidence: {
      summary: ["7 QCP scripts and 47 price rules execute without audit visibility", "RCA price waterfall provides step-by-step transparency"],
      detailed: [
        { metric: "Price rules without audit trail", value: 47, source: "SBQQ__PriceRule__c query" },
        { metric: "QCP scripts (no server logging)", value: 7, source: "StaticResource scan" }
      ],
      raw: { artifactReferences: ["artifact:qcp-segment-discount", "artifact:pr-volume-discount"], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "Browser-side QCP execution creates performance ceiling on large quotes",
    rcaCapability: "Server-side Pricing Execution via BRE",
    businessBenefit: "Server-side pricing eliminates browser timeouts on large quotes and enables headless pricing for API-driven workflows.",
    salesforceExpansion: null,
    confidence: "High",
    evidence: {
      summary: ["QCP runs in browser — degrades above 200 line items", "8 monthly timeout incidents reported"],
      detailed: [
        { metric: "Browser timeout incidents (monthly)", value: 8, source: "User-reported issues" },
        { metric: "Max quote lines (P99)", value: 280, source: "Quote line aggregation" }
      ],
      raw: { artifactReferences: ["artifact:qcp-bundle-pricing"], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "Point-and-click product rules fragile at scale and limited in expressiveness",
    rcaCapability: "Product Configurator with CML",
    businessBenefit: "CML compiles constraints and solves at sub-second speed with 10,000+ line items — replacing fragile point-and-click rules with a type-safe constraint language.",
    salesforceExpansion: null,
    confidence: "High",
    evidence: {
      summary: ["3 product rules map to CML constraints and relationships", "Sub-second solve time at scale"],
      detailed: [
        { metric: "Product rules", value: 3, source: "SBQQ__ProductRule__c query" },
        { metric: "CML solve time (10K lines)", value: "<1s", source: "RCA benchmark" }
      ],
      raw: { artifactReferences: ["artifact:prd-incompatible-products", "artifact:prd-auto-include-support"], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "100+ lines of custom Apex for amendments, proration, and co-termination",
    rcaCapability: "Transaction Management (Asset Lifecycle)",
    businessBenefit: "Native amendment, renewal, and cancellation actions with automatic proration eliminate the largest single Apex maintenance burden.",
    salesforceExpansion: null,
    confidence: "High",
    evidence: {
      summary: ["127 lines of amendment Apex → single invocable action", "Native proration replaces manual calculation"],
      detailed: [
        { metric: "Amendment Apex lines", value: 127, source: "CPQ_AmendmentService.cls" },
        { metric: "Monthly amendments", value: 85, source: "Quote query" }
      ],
      raw: { artifactReferences: ["artifact:apex-amendment-service"], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "CPQ Advanced Approvals managed package requires additional license and custom Apex routing",
    rcaCapability: "Advanced Approvals (Native)",
    businessBenefit: "Native approval workflows at no additional license cost, with declarative configuration replacing custom Apex trigger logic.",
    salesforceExpansion: "Advanced_Approvals",
    confidence: "High",
    evidence: {
      summary: ["Custom Apex approval routing → native declarative workflows", "No additional license cost"],
      detailed: [
        { metric: "Approval routing Apex lines", value: 89, source: "CPQ_ApprovalRouting trigger" },
        { metric: "Monthly approval submissions", value: 340, source: "ApprovalRequest query" }
      ],
      raw: { artifactReferences: ["artifact:apex-approval-routing"], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "Manual post-order handoff to undocumented provisioning system",
    rcaCapability: "Dynamic Revenue Orchestrator (DRO)",
    businessBenefit: "Automated fulfillment orchestration with dependency management, retry logic, and jeopardy rules replaces manual handoff and reduces provisioning errors.",
    salesforceExpansion: "DRO",
    confidence: "Medium",
    evidence: {
      summary: ["1,200 monthly provisioning handoffs with 3.2% error rate", "DRO can orchestrate external callouts"],
      detailed: [
        { metric: "Monthly handoffs", value: 1200, source: "Callout logs" },
        { metric: "Error rate", value: "3.2%", source: "Error logs" }
      ],
      raw: { artifactReferences: ["artifact:qcp-tax-callout"], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "Stripe payment processing disconnected from Salesforce with manual reconciliation",
    rcaCapability: "Revenue Cloud Billing",
    businessBenefit: "Consolidated invoicing and payment processing inside Salesforce eliminates 24 hours/month of manual reconciliation and 6 monthly billing discrepancies.",
    salesforceExpansion: "Billing",
    confidence: "Medium",
    evidence: {
      summary: ["24 hrs/month manual reconciliation between Stripe and Salesforce", "6 monthly billing discrepancies"],
      detailed: [
        { metric: "Manual reconciliation hours", value: 24, source: "Finance team" },
        { metric: "Monthly discrepancies", value: 6, source: "Reconciliation report" }
      ],
      raw: { artifactReferences: [], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "Manual ASC 606 revenue recognition in spreadsheets",
    rcaCapability: "Revenue Recognition",
    businessBenefit: "Automated revenue schedules and GL distributions reduce manual effort and audit risk for ASC 606 compliance.",
    salesforceExpansion: "Revenue_Recognition",
    confidence: "Medium",
    evidence: {
      summary: ["180 manual rev rec entries monthly", "120 hours annual audit preparation"],
      detailed: [
        { metric: "Monthly rev rec entries", value: 180, source: "Finance team" },
        { metric: "Annual audit prep hours", value: 120, source: "Finance team" }
      ],
      raw: { artifactReferences: [], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "Static discount schedules limited to Range method only",
    rcaCapability: "Price Adjustment Schedules",
    businessBenefit: "RCA supports both Range (one tier applies to all units) and Slab (graduated pricing per tier) methods, plus attribute-based and bundle schedule types.",
    salesforceExpansion: null,
    confidence: "High",
    evidence: {
      summary: ["CPQ discount schedules support Range only", "RCA adds Slab (graduated) and additional schedule types"],
      detailed: [
        { metric: "Discount schedules", value: 2, source: "SBQQ__DiscountSchedule__c query" },
        { metric: "Orphaned schedules", value: 8, source: "Reference analysis" }
      ],
      raw: { artifactReferences: ["artifact:ds-volume-tiers", "artifact:ds-term-graduated"], metadataExtracts: {} }
    }
  },
  {
    cpqPainPoint: "Twin fields create rigid, hard-to-maintain field mirroring between quote and quote line",
    rcaCapability: "Context Definitions + Context Mappings",
    businessBenefit: "Explicit, configurable field mappings replace rigid twin fields — any field on any object can participate in pricing and configuration context.",
    salesforceExpansion: null,
    confidence: "High",
    evidence: {
      summary: ["CPQ twin fields create maintenance overhead", "RCA Context Definitions are configurable and explicit"],
      detailed: [
        { metric: "Twin field pairs", value: 18, source: "SBQQ field analysis" },
        { metric: "Custom twin fields", value: 6, source: "Custom field inventory" }
      ],
      raw: { artifactReferences: [], metadataExtracts: {} }
    }
  }
];
