export const topConcerns = [
  {
    id: "concern-pricing-logic",
    title: "Pricing logic translation risk",
    severity: "High",
    audienceFraming: {
      executive: {
        headline: "Complex pricing logic requires careful migration to avoid revenue impact",
        impact: "7 QCP scripts and custom Apex pricing triggers contain business-critical discount, margin, and rounding logic. Incorrect translation could result in pricing errors on live quotes, directly impacting revenue and customer trust.",
        nextAction: "Schedule a pricing logic validation session with your CPQ admin and AllCloud delivery lead before SOW commitment."
      },
      sales: {
        headline: "Pricing logic depth drives the largest portion of migration effort",
        sowCaveat: "SOW must include a pricing logic validation phase. If observed pricing behavior diverges from documented intent, a change order is likely.",
        talkingPoint: "We've identified 7 QCP scripts and 3 Apex pricing dependencies. The assessment gives us a head start — we already know which scripts map to Pricing Procedures and which need custom Apex invocables."
      },
      salesforce: {
        headline: "Pricing logic density signals a high-value Pricing Procedures implementation",
        migrationRisk: "7 QCP scripts and custom Apex represent the deepest pricing logic translation challenge. Pricing Procedures and Decision Tables can handle most patterns declaratively, but 1-2 scripts may require Apex invocable hooks."
      }
    },
    evidence: {
      summary: [
        "7 QCP scripts detected — 5 surfaced for individual migration review",
        "3 Apex triggers directly manipulate SBQQ__QuoteLine__c pricing fields",
        "Custom rounding logic in QCP bypasses standard CPQ calculation",
        "1 QCP script performs external tax callout — requires Apex invocable in RCA"
      ],
      detailed: [
        { metric: "QCP scripts (total)", value: 7, source: "StaticResource metadata scan" },
        { metric: "QCP scripts (migration-critical)", value: 5, source: "Complexity analysis" },
        { metric: "Apex pricing triggers", value: 3, source: "ApexTrigger metadata" },
        { metric: "External callout QCPs", value: 1, source: "QCP code analysis" },
        { metric: "Estimated pricing procedure count", value: 8, source: "Migration pattern analysis" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-segment-discount", "artifact:qcp-bundle-pricing", "artifact:qcp-tax-callout", "artifact:qcp-custom-rounding", "artifact:qcp-recursive-subscription", "artifact:apex-cost-plus-pricing"],
        metadataExtracts: { affectedQuoteVolume: 2400, pricingFieldsModified: ["SBQQ__AdditionalDiscount__c", "SBQQ__NetPrice__c", "SBQQ__CustomerPrice__c", "SBQQ__PartnerPrice__c"] }
      }
    }
  },
  {
    id: "concern-amendment-logic",
    title: "Custom amendment logic complexity",
    severity: "High",
    audienceFraming: {
      executive: {
        headline: "Legacy amendment code must be replaced with RCA's native lifecycle management",
        impact: "Custom Apex amendment service handles proration, co-termination, and subscription line copying manually. This is exactly what RCA's Transaction Management automates — but the transition requires careful validation of edge cases.",
        nextAction: "Identify the top 5 amendment scenarios by volume and validate them against RCA's native amendment behavior."
      },
      sales: {
        headline: "Amendment logic replacement is a migration win — but needs scenario validation",
        sowCaveat: "Discovery phase must include amendment scenario mapping. Custom proration logic may reveal edge cases not covered by RCA's standard ProrationPolicy.",
        talkingPoint: "The client's 100+ line amendment Apex becomes a single invocable action in RCA. That's a major maintenance win — but we need to validate their proration edge cases first."
      },
      salesforce: {
        headline: "Custom amendment logic is prime for Transaction Management replacement",
        migrationRisk: "Legacy Apex handles manual proration and co-termination. RCA's Initiate Amendment Action handles this natively, but custom proration rules may require BillingTreatment.ProrationPolicy configuration."
      }
    },
    evidence: {
      summary: [
        "Custom Apex amendment service: 100+ lines handling proration and line copying",
        "Manual co-termination logic aligns subscription end dates",
        "3 amendment scenarios identified: mid-term upgrade, quantity change, add-on",
        "RCA replaces this with a single commerceesb.AmendAsset invocable action"
      ],
      detailed: [
        { metric: "Amendment Apex lines of code", value: 127, source: "CPQ_AmendmentService.cls" },
        { metric: "Amendment scenarios", value: 3, source: "Business process review" },
        { metric: "Monthly amendments processed", value: 85, source: "Amendment quote query (6-month avg)" },
        { metric: "Co-termination contracts", value: 340, source: "Contract analysis" }
      ],
      raw: {
        artifactReferences: ["artifact:apex-amendment-service"],
        metadataExtracts: { className: "CPQ_AmendmentService", lastModified: "2025-08-14", testCoverage: "72%" }
      }
    }
  },
  {
    id: "concern-provisioning-integration",
    title: "Legacy provisioning integration",
    severity: "Medium",
    audienceFraming: {
      executive: {
        headline: "Undocumented provisioning system creates integration risk",
        impact: "The legacy in-house provisioning API lacks formal documentation and is maintained by a single developer. Migration to RCA requires understanding this integration to determine whether DRO can orchestrate it.",
        nextAction: "Request API documentation and identify the provisioning system owner for a technical review session."
      },
      sales: {
        headline: "Provisioning integration is scoped pending API documentation",
        sowCaveat: "Legacy provisioning integration is scoped as a discovery item. If the API requires bespoke integration work beyond standard DRO callouts, a change order applies.",
        talkingPoint: "There's an undocumented provisioning API — we've flagged it and scoped it for discovery. If it's a standard REST API, DRO handles it. If not, we'll need custom integration work."
      },
      salesforce: {
        headline: "Legacy provisioning system may be a DRO expansion candidate",
        migrationRisk: "Undocumented outbound integration to internal provisioning system. API contract unknown. May require custom FulfillmentStep implementation if standard DRO callout patterns don't fit."
      }
    },
    evidence: {
      summary: [
        "Outbound integration to internal provisioning system (https://internal-provisioning.techflow.io)",
        "No formal API documentation found in org or shared drives",
        "Single developer (infrastructure team) maintains the provisioning service",
        "QCP tax callout artifact shows pattern of external API usage in pricing context"
      ],
      detailed: [
        { metric: "Provisioning API endpoints", value: "Unknown", source: "Stakeholder interview" },
        { metric: "Monthly provisioning calls", value: 1200, source: "Outbound HTTP callout logs" },
        { metric: "Error rate (30-day)", value: "3.2%", source: "Callout error logs" },
        { metric: "Documentation status", value: "None found", source: "Document repository scan" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-tax-callout"],
        metadataExtracts: { endpoint: "https://internal-provisioning.techflow.io/api/v1", authMethod: "API Key (header)", maintainer: "Infrastructure team (single developer)" }
      }
    }
  },
  {
    id: "concern-summary-variables",
    title: "Summary variable dependencies",
    severity: "Medium",
    audienceFraming: {
      executive: {
        headline: "Cross-line calculation logic requires custom development in RCA",
        impact: "Summary variables that aggregate data across quote lines have no direct declarative equivalent in RCA. These require custom Apex invocable actions — one of the few areas where RCA needs code instead of configuration.",
        nextAction: "Review which summary variable behaviors are business-critical vs. nice-to-have to prioritize custom development effort."
      },
      sales: {
        headline: "Summary variables need custom Apex — budget development time",
        sowCaveat: "Cross-line aggregation logic (total discount caps, quantity aggregation) requires custom Apex invocable actions. Estimate 2-3 days per summary variable conversion.",
        talkingPoint: "Most CPQ logic goes declarative in RCA, but summary variables are the exception — they need custom Apex. We've identified 2 that matter."
      },
      salesforce: {
        headline: "Summary variable gap requires Apex Invocable Actions",
        migrationRisk: "RCA has no direct equivalent to SBQQ__SummaryVariable__c. Cross-line aggregation must be implemented as custom Apex invocable actions called from pricing procedures or validation flows."
      }
    },
    evidence: {
      summary: [
        "2 summary variables with active cross-line aggregation logic",
        "Total discount cap validation aggregates discount across all quote lines",
        "Quantity aggregation by product family used in pricing rule conditions",
        "Both require custom Apex invocable actions in RCA"
      ],
      detailed: [
        { metric: "Active summary variables", value: 2, source: "SBQQ__SummaryVariable__c query" },
        { metric: "Price rules referencing summary variables", value: 4, source: "SBQQ__PriceRule__c dependency analysis" },
        { metric: "Estimated Apex development effort", value: "4-6 days", source: "Migration pattern analysis" }
      ],
      raw: {
        artifactReferences: ["artifact:sv-total-discount", "artifact:sv-aggregate-quantity"],
        metadataExtracts: { aggregateFunctions: ["SUM", "SUM"], targetFields: ["SBQQ__Discount__c", "SBQQ__Quantity__c"] }
      }
    }
  },
  {
    id: "concern-deprecated-cleanup",
    title: "Deprecated product cleanup needed",
    severity: "Low",
    audienceFraming: {
      executive: {
        headline: "Product catalog cleanup recommended before migration",
        impact: "23 inactive products are still referenced by active price rules, creating configuration debt. Cleaning these up before migration avoids carrying unnecessary complexity into RCA.",
        nextAction: "Run a product audit to confirm which inactive products can be safely retired before migration begins."
      },
      sales: {
        headline: "Catalog cleanup is a low-risk pre-migration task",
        sowCaveat: "Discovery phase includes a product audit. Cleanup effort is included in the Foundation Setup phase estimate.",
        talkingPoint: "We've found 23 inactive products still tangled with active rules — standard cleanup. We handle this in the Discovery phase so it doesn't slow down the build."
      },
      salesforce: {
        headline: "Ghost products and orphaned schedules should be cleaned pre-migration",
        migrationRisk: "23 inactive products referenced by active price rules and 8 orphaned discount schedules. Low technical risk but adds noise to the migration if not cleaned up first."
      }
    },
    evidence: {
      summary: [
        "23 inactive products still referenced by active price rules",
        "8 orphaned discount schedules with no product associations",
        "14 price rules dormant for 6+ months",
        "Recommended: audit and retire before migration"
      ],
      detailed: [
        { metric: "Inactive products (referenced)", value: 23, source: "Product2 cross-reference" },
        { metric: "Orphaned discount schedules", value: 8, source: "SBQQ__DiscountSchedule__c analysis" },
        { metric: "Dormant price rules", value: 14, source: "Execution log analysis (6-month)" },
        { metric: "Estimated cleanup effort", value: "3-5 days", source: "Migration pattern analysis" }
      ],
      raw: {
        artifactReferences: [],
        metadataExtracts: { inactiveProductIds: "23 IDs redacted", orphanedScheduleNames: ["Legacy_Volume_2019", "Promo_Q3_2023", "Partner_Tier_Old"] }
      }
    }
  }
];
