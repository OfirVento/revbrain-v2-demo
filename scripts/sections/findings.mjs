export const implementationFindings = [
  {
    category: "Pricing",
    severity: "High",
    finding: "Complex QCP pricing logic depth across 7 scripts requires systematic translation to Pricing Procedures",
    technicalDetail: "7 QCP scripts contain segment-based discounting, bundle-aware pricing, external tax callouts, custom rounding, and recursive subscription calculations. Each maps to a different RCA pattern — Pricing Procedures for most, Apex invocable hooks for external callouts, and Manual Design Required for the recursive calculation.",
    recommendedAction: "Map each QCP script to its RCA target pattern and validate pricing logic intent with the CPQ admin before building pricing procedures.",
    evidence: {
      summary: ["7 QCP scripts detected", "5 surfaced for individual migration review", "Complexity ranges from 35 to 88"],
      detailed: [
        { metric: "QCP scripts", value: 7, source: "StaticResource scan" },
        { metric: "High complexity QCPs", value: 3, source: "Complexity analysis" },
        { metric: "External callout QCPs", value: 1, source: "Code analysis" }
      ],
      raw: { artifactReferences: ["artifact:qcp-segment-discount", "artifact:qcp-bundle-pricing", "artifact:qcp-tax-callout", "artifact:qcp-custom-rounding", "artifact:qcp-recursive-subscription"], metadataExtracts: {} }
    }
  },
  {
    category: "Pricing",
    severity: "Medium",
    finding: "Price rules with overlapping conditions create ambiguous execution precedence",
    technicalDetail: "47 price rules detected, with 12 having overlapping condition sets that could fire on the same quote line. CPQ resolves this by evaluation order; RCA Pricing Procedures use explicit step sequencing which eliminates ambiguity but requires intentional ordering.",
    recommendedAction: "Document the intended execution order for overlapping price rules and design pricing procedure step sequence accordingly.",
    evidence: {
      summary: ["47 price rules total", "12 with overlapping conditions", "Execution order is implicit in CPQ"],
      detailed: [
        { metric: "Total price rules", value: 47, source: "SBQQ__PriceRule__c query" },
        { metric: "Overlapping condition sets", value: 12, source: "Condition analysis" }
      ],
      raw: { artifactReferences: ["artifact:pr-volume-discount", "artifact:pr-customer-tier-override", "artifact:pr-promo-discount-date", "artifact:pr-multi-currency"], metadataExtracts: {} }
    }
  },
  {
    category: "Pricing",
    severity: "Medium",
    finding: "Custom rounding logic bypasses standard CPQ calculation and must be replicated in pricing procedure",
    technicalDetail: "QCP script applies custom banker's rounding (round half to even) instead of CPQ's default rounding. This behavior must be explicitly replicated in the RCA pricing procedure via an Expression Set step.",
    recommendedAction: "Implement custom rounding as a dedicated pricing procedure step and validate against the current QCP output for the top 50 quote lines by revenue.",
    evidence: {
      summary: ["Custom rounding in QCP overrides standard CPQ behavior", "Banker's rounding (round half to even) applied"],
      detailed: [
        { metric: "Affected quote lines (monthly)", value: 850, source: "QCP execution analysis" },
        { metric: "Max rounding variance", value: "$0.02", source: "Calculation comparison" }
      ],
      raw: { artifactReferences: ["artifact:qcp-custom-rounding"], metadataExtracts: {} }
    }
  },
  {
    category: "Configuration",
    severity: "Medium",
    finding: "Product validation rules reference deprecated custom fields on Product2",
    technicalDetail: "1 product validation rule references Segment__c and Region__c custom fields that have been deprecated in recent org cleanup efforts but are still active on Product2. These fields must be mapped to RCA ProductAttribute or AttributeDefinition equivalents.",
    recommendedAction: "Audit custom field usage and map to RCA attribute model before building CML constraints.",
    evidence: {
      summary: ["1 validation rule references deprecated fields", "Fields still active but flagged for removal"],
      detailed: [
        { metric: "Deprecated fields referenced", value: 2, source: "Field dependency analysis" },
        { metric: "Rules affected", value: 1, source: "SBQQ__ProductRule__c analysis" }
      ],
      raw: { artifactReferences: ["artifact:prd-incompatible-products"], metadataExtracts: {} }
    }
  },
  {
    category: "Configuration",
    severity: "Info",
    finding: "Bundle structures are compatible with PCM ProductComponentGroup model",
    technicalDetail: "28 product bundles use SBQQ__ProductOption__c with up to 3 nesting levels and 12 product features. This maps cleanly to PCM's ProductRelatedComponent + ProductComponentGroup model with richer attribute inheritance.",
    recommendedAction: "Map existing bundle structures to PCM component groups during Foundation Setup phase. No blockers expected.",
    evidence: {
      summary: ["28 bundles map to PCM model", "3 nesting levels supported", "12 features → component groups"],
      detailed: [
        { metric: "Product bundles", value: 28, source: "Bundle analysis" },
        { metric: "Max nesting depth", value: 3, source: "Bundle structure scan" },
        { metric: "Product features", value: 12, source: "SBQQ__ProductFeature__c query" }
      ],
      raw: { artifactReferences: ["artifact:prd-auto-include-support"], metadataExtracts: {} }
    }
  },
  {
    category: "Configuration",
    severity: "Low",
    finding: "Guided selling flows use legacy SBQQ__ConfigurationAttribute__c that must be rebuilt",
    technicalDetail: "Current guided selling uses CPQ configuration attributes with picklist-based responses. RCA replaces this with OmniStudio FlexCards/OmniScripts or Product Discovery Guided Selection — a complete rebuild, not a migration.",
    recommendedAction: "Document current guided selling logic and rebuild using Product Discovery in the Foundation Setup phase.",
    evidence: {
      summary: ["Legacy guided selling uses CPQ configuration attributes", "RCA requires rebuild with Product Discovery"],
      detailed: [
        { metric: "Configuration attributes", value: 8, source: "SBQQ__ConfigurationAttribute__c query" },
        { metric: "Guided selling flows", value: 2, source: "Process builder scan" }
      ],
      raw: { artifactReferences: ["artifact:prd-region-filter"], metadataExtracts: {} }
    }
  },
  {
    category: "Custom Code",
    severity: "High",
    finding: "External tax callout in QCP JavaScript lacks error handling and timeout logic",
    technicalDetail: "QCP script makes synchronous HTTP callout to tax calculation service during browser-side pricing. No error handling, no timeout, no retry logic. If the service is slow or unavailable, the entire quote calculation hangs. In RCA, this must be an Apex invocable action with proper error handling.",
    recommendedAction: "Rewrite as an Apex invocable action with error handling, timeout (5s), retry logic, and fallback behavior. Integrate via ProcedurePlanOption.ApexClass.",
    evidence: {
      summary: ["QCP makes unprotected HTTP callout during pricing", "No error handling or timeout", "Must become Apex invocable in RCA"],
      detailed: [
        { metric: "Callout timeout incidents (monthly)", value: 8, source: "Browser error logs" },
        { metric: "Avg callout latency", value: "1.2s", source: "Network logs" },
        { metric: "Callout failure rate", value: "2.1%", source: "Error tracking" }
      ],
      raw: { artifactReferences: ["artifact:qcp-tax-callout"], metadataExtracts: {} }
    }
  },
  {
    category: "Custom Code",
    severity: "High",
    finding: "Recursive subscription calculation has unbounded depth and no cycle detection",
    technicalDetail: "QCP script recursively calculates dependent subscription prices based on parent/child relationships. No maximum depth limit, no cycle detection, no memoization. This pattern has no direct RCA equivalent and requires manual architecture design.",
    recommendedAction: "Analyze the recursion depth in production data, determine if iterative approach is feasible, and design a custom solution. Budget 5-8 days for design and implementation.",
    evidence: {
      summary: ["Recursive QCP with unbounded depth", "No cycle detection", "Requires manual design for RCA"],
      detailed: [
        { metric: "Max observed recursion depth", value: 4, source: "QCP execution trace" },
        { metric: "Avg recursion depth", value: 2.3, source: "QCP execution trace" },
        { metric: "Subscription chains affected", value: 180, source: "Subscription hierarchy analysis" }
      ],
      raw: { artifactReferences: ["artifact:qcp-recursive-subscription"], metadataExtracts: {} }
    }
  },
  {
    category: "Custom Code",
    severity: "Medium",
    finding: "Amendment service contains 127 lines of manual proration Apex that RCA handles natively",
    technicalDetail: "CPQ_AmendmentService.cls manually calculates prorated amounts, copies subscription lines, and handles co-termination date alignment. RCA's Transaction Management (Initiate Amendment Action) handles all of this natively — the entire class can be replaced by a Flow calling commerceesb.AmendAsset.",
    recommendedAction: "Map current amendment scenarios to RCA Transaction Management behavior. Validate proration edge cases against BillingTreatment.ProrationPolicy options.",
    evidence: {
      summary: ["127 lines of amendment Apex → 1 invocable action", "3 amendment scenarios to validate", "Native proration replaces manual calculation"],
      detailed: [
        { metric: "Apex lines of code", value: 127, source: "CPQ_AmendmentService.cls" },
        { metric: "Amendment scenarios", value: 3, source: "Business process review" },
        { metric: "Monthly amendments", value: 85, source: "Quote query" }
      ],
      raw: { artifactReferences: ["artifact:apex-amendment-service"], metadataExtracts: {} }
    }
  },
  {
    category: "Data Migration",
    severity: "Medium",
    finding: "38,000 historical quotes require archival strategy before migration",
    technicalDetail: "Historical closed/won quotes should not be migrated to RCA. Recommended approach: freeze in CPQ as read-only, optionally archive to a data warehouse. Only active subscriptions (3,600), active contracts (1,200), and open quotes (2,400) are in migration scope.",
    recommendedAction: "Agree on archival strategy with finance and compliance teams during Discovery phase. Implement read-only freeze on historical CPQ data.",
    evidence: {
      summary: ["38,000 historical quotes — archive, don't migrate", "Migration scope: active data only", "Finance sign-off required"],
      detailed: [
        { metric: "Historical quotes", value: 38000, source: "SBQQ__Quote__c query" },
        { metric: "Active subscriptions (migrate)", value: 3600, source: "SBQQ__Subscription__c query" },
        { metric: "Active contracts (migrate)", value: 1200, source: "Contract query" },
        { metric: "Open quotes (migrate)", value: 2400, source: "SBQQ__Quote__c (open)" }
      ],
      raw: { artifactReferences: [], metadataExtracts: {} }
    }
  },
  {
    category: "Data Migration",
    severity: "Medium",
    finding: "Active subscriptions need AssetAction and AssetStatePeriod records for RCA lifecycle management",
    technicalDetail: "3,600 active CPQ subscriptions must be migrated to Assets with corresponding AssetAction (type: Originate) and AssetStatePeriod records. Without AssetStatePeriod, Transaction Management cannot process amendments or renewals.",
    recommendedAction: "Build a data migration script that creates Asset + AssetAction + AssetStatePeriod records for each active subscription. Validate MRR calculations post-migration.",
    evidence: {
      summary: ["3,600 subscriptions → Assets with lifecycle records", "AssetStatePeriod required for amendments/renewals", "MRR validation required post-migration"],
      detailed: [
        { metric: "Active subscriptions", value: 3600, source: "SBQQ__Subscription__c query" },
        { metric: "Subscription with MRR data", value: 3200, source: "MRR field analysis" },
        { metric: "Estimated migration records", value: 10800, source: "Asset + AssetAction + AssetStatePeriod per subscription" }
      ],
      raw: { artifactReferences: [], metadataExtracts: {} }
    }
  },
  {
    category: "Data Migration",
    severity: "Info",
    finding: "Standard object field mappings are well-documented and low-risk",
    technicalDetail: "Core object mappings (Quote → Quote, QuoteLine → QuoteLineItem, Product → Product2) use standard Salesforce objects in RCA. Custom fields on these objects need individual mapping but the base migration path is well-understood.",
    recommendedAction: "Generate field mapping document during Foundation Setup. Focus custom field analysis on pricing-related and integration-related fields.",
    evidence: {
      summary: ["Standard object mappings are straightforward", "Custom field mapping needed", "Low-risk migration path"],
      detailed: [
        { metric: "Standard objects with direct mapping", value: 8, source: "Object mapping analysis" },
        { metric: "Custom fields requiring mapping", value: 34, source: "Field inventory" }
      ],
      raw: { artifactReferences: [], metadataExtracts: {} }
    }
  },
  {
    category: "Integrations",
    severity: "Medium",
    finding: "Legacy provisioning API contract is undocumented and maintained by a single developer",
    technicalDetail: "Outbound integration to https://internal-provisioning.techflow.io/api/v1 uses API key authentication. No Swagger/OpenAPI spec, no integration tests, and the sole maintainer is on the infrastructure team. This is a bus-factor-1 risk.",
    recommendedAction: "Request API documentation or a technical walkthrough from the provisioning system maintainer. Evaluate whether DRO can orchestrate this integration or if a custom adapter is needed.",
    evidence: {
      summary: ["Undocumented API with single maintainer", "1,200 monthly calls with 3.2% error rate", "Bus-factor-1 risk"],
      detailed: [
        { metric: "Monthly API calls", value: 1200, source: "Callout logs" },
        { metric: "Error rate", value: "3.2%", source: "Error logs" },
        { metric: "Documentation", value: "None", source: "Repository scan" },
        { metric: "Maintainers", value: 1, source: "Stakeholder interview" }
      ],
      raw: { artifactReferences: ["artifact:qcp-tax-callout"], metadataExtracts: {} }
    }
  },
  {
    category: "Integrations",
    severity: "Low",
    finding: "NetSuite ERP integration uses legacy SOAP endpoints — evaluate REST migration",
    technicalDetail: "Bidirectional NetSuite integration uses SuiteTalk SOAP API for order sync and financial data. While functional, SOAP endpoints are being deprecated in favor of REST. RCA integration should target NetSuite REST APIs.",
    recommendedAction: "Evaluate NetSuite REST API readiness during Integration & Data phase. Plan for REST migration as part of the RCA integration build.",
    evidence: {
      summary: ["NetSuite uses legacy SOAP API", "REST migration recommended", "Functional but aging integration"],
      detailed: [
        { metric: "Daily sync transactions", value: 45, source: "Integration logs" },
        { metric: "Integration age", value: "4 years", source: "Connected App metadata" }
      ],
      raw: { artifactReferences: [], metadataExtracts: {} }
    }
  },
  {
    category: "Deprecated Config",
    severity: "Medium",
    finding: "23 inactive products still referenced by active price rules create migration noise",
    technicalDetail: "23 products marked IsActive=false are still referenced in active SBQQ__PriceRule__c condition or action fields. Migrating these price rules without cleaning up the product references will create broken pricing procedures.",
    recommendedAction: "Audit and retire inactive product references in Discovery phase. Update or deactivate the 23 affected price rules before migration.",
    evidence: {
      summary: ["23 inactive products referenced by active rules", "Creates broken references if migrated as-is"],
      detailed: [
        { metric: "Inactive products (referenced)", value: 23, source: "Cross-reference analysis" },
        { metric: "Affected price rules", value: 9, source: "Rule dependency scan" }
      ],
      raw: { artifactReferences: [], metadataExtracts: { sampleProducts: ["Legacy_Starter_2020", "Promo_Bundle_Q1", "Partner_SKU_Deprecated"] } }
    }
  },
  {
    category: "Deprecated Config",
    severity: "Low",
    finding: "8 orphaned discount schedules have no product associations and should be removed",
    technicalDetail: "8 SBQQ__DiscountSchedule__c records exist with no active product or price rule references. These are safe to delete before migration to reduce configuration noise.",
    recommendedAction: "Delete orphaned discount schedules during the Discovery & Validation phase as part of catalog cleanup.",
    evidence: {
      summary: ["8 discount schedules with no references", "Safe to delete", "Part of pre-migration cleanup"],
      detailed: [
        { metric: "Orphaned discount schedules", value: 8, source: "Reference analysis" },
        { metric: "Last modified", value: "2023-Q3 or earlier", source: "Metadata timestamps" }
      ],
      raw: { artifactReferences: [], metadataExtracts: {} }
    }
  }
];
