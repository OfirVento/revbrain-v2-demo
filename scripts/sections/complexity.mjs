export const complexityScores = {
  overall: "High",
  overallNumeric: 68,
  dimensions: {
    pricingLogic: {
      score: 75,
      tier: "High",
      signal: "7 QCP scripts, 47 price rules, 3 Apex pricing dependencies",
      evidence: {
        summary: [
          "7 QCP scripts detected, 5 with material migration complexity",
          "47 price rules across volume, tier, promotional, and multi-currency categories",
          "3 Apex triggers directly manipulate quote line pricing fields",
          "Custom rounding logic bypasses standard CPQ calculation"
        ],
        detailed: [
          { metric: "QCP script count", value: 7, source: "Org metadata scan" },
          { metric: "Price rule count", value: 47, source: "SBQQ__PriceRule__c query" },
          { metric: "Apex pricing triggers", value: 3, source: "ApexTrigger metadata" },
          { metric: "Custom pricing Apex classes", value: 2, source: "ApexClass metadata" }
        ],
        raw: {
          artifactReferences: ["artifact:qcp-segment-discount", "artifact:qcp-bundle-pricing", "artifact:qcp-tax-callout", "artifact:qcp-custom-rounding", "artifact:qcp-recursive-subscription", "artifact:apex-cost-plus-pricing"],
          metadataExtracts: { scanDate: "2026-05-06T10:30:00Z", toolVersion: "vento-scanner-1.2" }
        }
      }
    },
    productCatalog: {
      score: 55,
      tier: "Medium",
      signal: "340 products, 28 bundles, 12 product features",
      evidence: {
        summary: [
          "340 active products across subscription, add-on, and professional services categories",
          "28 product bundles with up to 3 nesting levels",
          "12 product features organizing bundle options"
        ],
        detailed: [
          { metric: "Active products", value: 340, source: "Product2 query" },
          { metric: "Product bundles", value: 28, source: "SBQQ__ProductOption__c query" },
          { metric: "Product features", value: 12, source: "SBQQ__ProductFeature__c query" },
          { metric: "Max nesting depth", value: 3, source: "Bundle structure analysis" }
        ],
        raw: {
          artifactReferences: ["artifact:prd-incompatible-products", "artifact:prd-auto-include-support", "artifact:prd-region-filter"],
          metadataExtracts: { productFamilies: ["Platform", "Add-On", "Professional Services", "Support", "Enterprise Add-On"] }
        }
      }
    },
    customCode: {
      score: 72,
      tier: "High",
      signal: "7 QCP scripts, 4 Apex classes/triggers, 2 summary variable dependencies",
      evidence: {
        summary: [
          "7 QCP JavaScript files with browser-side pricing logic",
          "2 Apex triggers on SBQQ__QuoteLine__c for pricing and approval",
          "2 Apex service classes for amendments and cross-line validation",
          "2 summary variables with cross-line aggregation dependencies"
        ],
        detailed: [
          { metric: "QCP scripts", value: 7, source: "StaticResource query" },
          { metric: "Apex triggers (CPQ-related)", value: 2, source: "ApexTrigger metadata" },
          { metric: "Apex classes (CPQ-related)", value: 2, source: "ApexClass metadata" },
          { metric: "Summary variables", value: 2, source: "SBQQ__SummaryVariable__c query" }
        ],
        raw: {
          artifactReferences: ["artifact:qcp-segment-discount", "artifact:apex-amendment-service", "artifact:apex-cross-line-validator", "artifact:sv-total-discount", "artifact:sv-aggregate-quantity"],
          metadataExtracts: { totalLinesOfCode: 1847, avgComplexityScore: 52 }
        }
      }
    },
    dataMigration: {
      score: 58,
      tier: "Medium",
      signal: "38,000 historical quotes, 3,600 active subscriptions, 1,200 contracts",
      evidence: {
        summary: [
          "38,000 historical quotes require archival strategy — not migrated",
          "3,600 active subscriptions must be converted to Assets with AssetStatePeriod records",
          "1,200 active contracts need ContractItemPrice migration"
        ],
        detailed: [
          { metric: "Historical quotes", value: 38000, source: "SBQQ__Quote__c query" },
          { metric: "Active subscriptions", value: 3600, source: "SBQQ__Subscription__c query" },
          { metric: "Active contracts", value: 1200, source: "Contract query" },
          { metric: "Active quotes", value: 2400, source: "SBQQ__Quote__c query (Status=Draft/Presented)" }
        ],
        raw: {
          artifactReferences: [],
          metadataExtracts: { oldestQuoteDate: "2019-03-15", newestQuoteDate: "2026-05-01" }
        }
      }
    },
    integrations: {
      score: 65,
      tier: "Medium",
      signal: "4 integrations: NetSuite (bidirectional), Avalara, Stripe, legacy provisioning",
      evidence: {
        summary: [
          "NetSuite ERP integration is bidirectional — handles order sync and financial data",
          "Avalara tax integration is standard outbound — low migration risk",
          "Stripe payment integration requires evaluation for RCA Billing replacement",
          "Legacy provisioning system has undocumented API and single-developer ownership"
        ],
        detailed: [
          { metric: "Integration count", value: 4, source: "Connected Apps + Named Credentials scan" },
          { metric: "Bidirectional integrations", value: 1, source: "Integration architecture review" },
          { metric: "Undocumented integrations", value: 1, source: "Stakeholder interviews" },
          { metric: "API endpoints called", value: 23, source: "Outbound HTTP callout logs" }
        ],
        raw: {
          artifactReferences: ["artifact:qcp-tax-callout"],
          metadataExtracts: { netsuiteEndpoint: "https://*****.restlets.api.netsuite.com", provisioningEndpoint: "https://internal-provisioning.techflow.io/api/v1" }
        }
      }
    },
    deprecatedConfig: {
      score: 50,
      tier: "Medium",
      signal: "23 inactive products, 8 orphaned discount schedules, 14 unused price rules",
      evidence: {
        summary: [
          "23 products marked inactive but still referenced by active price rules",
          "8 discount schedules with no active product associations",
          "14 price rules that have not fired in the past 6 months"
        ],
        detailed: [
          { metric: "Inactive products (still referenced)", value: 23, source: "Product2 cross-reference analysis" },
          { metric: "Orphaned discount schedules", value: 8, source: "SBQQ__DiscountSchedule__c analysis" },
          { metric: "Dormant price rules", value: 14, source: "SBQQ__PriceRule__c execution log analysis" }
        ],
        raw: {
          artifactReferences: [],
          metadataExtracts: { auditDate: "2026-05-06", analysisMethod: "6-month execution log review" }
        }
      }
    }
  }
};
