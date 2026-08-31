export const productRuleArtifacts = [
  {
    id: "prd-incompatible-products",
    name: "PrdRule_BlockStarterWithEnterprise",
    sourceType: "Product_Rule",
    sourceCode: "Product Rule: Block_Starter_With_Enterprise_AddOn\n  Type: Validation\n  Scope: Quote\n  Conditions:\n    Tested Object: Quote Line\n    Tested Field: SBQQ__Product__r.Family\n    Operator: Equals\n    Filter Value: Starter\n  Error Condition:\n    Tested Object: Quote Line\n    Tested Field: SBQQ__Product__r.Family\n    Operator: Equals\n    Filter Value: Enterprise Add-On\n  Error Message: Enterprise Add-Ons cannot be combined with Starter plans.\n  Active: true",
    businessPurpose: "Prevents sales reps from adding Enterprise Add-On products to quotes that contain Starter plan products, enforcing product tier compatibility.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 25,
    dependencies: [
      { type: "field", name: "Product2.Family", reference: "Standard product family field" }
    ],
    recommendedRcaTarget: "CML_Constraint",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: "type StarterPlan : LineItem {\n    constraint noEnterpriseAddOn {\n        description: \"Enterprise Add-Ons cannot be combined with Starter plans.\"\n        enforcement: Error\n        condition: NOT exists(sibling where type == EnterpriseAddOn)\n    }\n}\n\ntype EnterpriseAddOn : LineItem {\n    constraint noStarterPlan {\n        description: \"Enterprise Add-Ons cannot be combined with Starter plans.\"\n        enforcement: Error\n        condition: NOT exists(sibling where type == StarterPlan)\n    }\n}",
      candidateLanguage: "cml",
      plainLanguageExplanation: "CML enforces mutual exclusion between Starter and Enterprise Add-On product types at configuration time, before save.",
      targetPatternReasoning: "Product validation rules map directly to CML Constraints with enforcement: Error. The sibling existence check replaces the cross-quote-line condition evaluation.",
      preservedBehavior: ["Starter + Enterprise Add-On combination blocked", "Error message preserved", "Validation at quote level"],
      changedBehavior: ["Save-time validation → configuration-time constraint solving", "Point-and-click rule → CML type system"],
      unknowns: ["Are there other product family incompatibilities not captured in rules?"],
      requiredTests: ["Add Starter + Enterprise Add-On → error", "Add Starter + Standard Add-On → allowed", "Add Enterprise + Enterprise Add-On → allowed"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Product validation rule → CML constraint", "Direct mapping with enforcement: Error"],
      detailed: [{ metric: "Validation triggers monthly", value: 120, source: "Rule execution log" }],
      raw: { artifactReferences: ["artifact:prd-incompatible-products"], metadataExtracts: {} }
    }
  },
  {
    id: "prd-auto-include-support",
    name: "PrdRule_AutoAddSupportWithPlatform",
    sourceType: "Product_Rule",
    sourceCode: "Product Rule: Auto_Add_Support_With_Platform\n  Type: Selection\n  Scope: Product\n  Conditions:\n    Product: Platform License\n  Action: Add\n  Action Product: Basic Support\n  Action Quantity: 1\n  Active: true",
    businessPurpose: "Automatically adds a Basic Support line item when a Platform License is added to a quote, ensuring every platform customer has support coverage.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 28,
    dependencies: [
      { type: "object", name: "Product2 (Platform License)", reference: "Product record" },
      { type: "object", name: "Product2 (Basic Support)", reference: "Product record" }
    ],
    recommendedRcaTarget: "CML_Relationship",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: "type PlatformLicense : LineItem {\n    relation support : BasicSupport[1..1] {\n        default BasicSupport(1);\n        constraint alwaysPresent {\n            description: \"Basic Support is mandatory with Platform License\"\n            enforcement: Error\n            condition: count(support) >= 1\n        }\n    }\n}",
      candidateLanguage: "cml",
      plainLanguageExplanation: "CML relationship with [1..1] cardinality and a default clause auto-includes Basic Support when Platform License is configured. The constraint enforces mandatory inclusion.",
      targetPatternReasoning: "Product selection rules (auto-include) map to CML Relationships with cardinality constraints. The [1..1] cardinality enforces exactly one Basic Support per Platform License.",
      preservedBehavior: ["Basic Support auto-added with Platform License", "Quantity of 1 maintained", "Cannot remove support from platform bundle"],
      changedBehavior: ["Add action → CML relationship with default clause", "Cardinality enforcement is type-safe"],
      unknowns: ["Can customers upgrade from Basic to Premium support?"],
      requiredTests: ["Add Platform License → Basic Support auto-included", "Remove Basic Support → error", "Verify quantity = 1"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Auto-include rule → CML relationship", "Direct cardinality mapping"],
      detailed: [{ metric: "Platform License quotes monthly", value: 180, source: "Quote line query" }],
      raw: { artifactReferences: ["artifact:prd-auto-include-support"], metadataExtracts: {} }
    }
  },
  {
    id: "prd-region-filter",
    name: "PrdRule_RegionProductFilter",
    sourceType: "Product_Rule",
    sourceCode: "Product Rule: Filter_Region_Restricted_Products\n  Type: Filter\n  Scope: Product Lookup\n  Conditions:\n    Field: Account.Region__c\n    Operator: not equal to\n    Filter Value: null\n  Filter:\n    Object: Product2\n    Field: Available_Regions__c\n    Operator: includes\n    Filter Value: [Account.Region__c]\n  Active: true",
    businessPurpose: "Filters the product selector to show only products available in the customer's region, preventing reps from quoting region-restricted products.",
    usageSignal: "Unknown",
    complexityScore: 45,
    dependencies: [
      { type: "field", name: "Account.Region__c", reference: "Custom field" },
      { type: "field", name: "Product2.Available_Regions__c", reference: "Custom multi-select picklist" }
    ],
    recommendedRcaTarget: "Declarative_Configuration",
    conversionConfidence: "Medium",
    draft: {
      generatedCandidate: "{\n  \"productDiscovery\": {\n    \"qualificationRule\": \"Region_Product_Eligibility\",\n    \"type\": \"Guided Selection Filter\",\n    \"contextInput\": \"Account.Region__c\",\n    \"productAttribute\": \"AvailableRegions\",\n    \"matchLogic\": \"Product.AvailableRegions INCLUDES Context.AccountRegion\",\n    \"behavior\": \"Hide non-matching products from selector\"\n  }\n}",
      candidateLanguage: "json",
      plainLanguageExplanation: "Product Discovery qualification rules filter the product selector based on account region context. Products not available in the customer's region are hidden from the selector.",
      targetPatternReasoning: "Product filter rules map to Product Discovery qualification or CML eligibility rules. Product Discovery provides context-aware filtering that replaces CPQ's static lookup filters.",
      preservedBehavior: ["Region-based product filtering", "Only available products shown to reps"],
      changedBehavior: ["Static lookup filter → context-aware Product Discovery qualification", "Filter is dynamic based on account context"],
      unknowns: ["Is the Available_Regions__c field maintained consistently?", "Are there products without region restrictions?"],
      requiredTests: ["NA account → only NA-available products shown", "EMEA account → only EMEA products shown", "No region → all products shown"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Region filter rule → Product Discovery qualification", "Medium confidence due to context setup"],
      detailed: [{ metric: "Region-restricted products", value: 85, source: "Product2 query" }],
      raw: { artifactReferences: ["artifact:prd-region-filter"], metadataExtracts: {} }
    }
  }
];

export const discountScheduleArtifacts = [
  {
    id: "ds-volume-tiers",
    name: "DS_StandardVolumeTiers",
    sourceType: "Discount_Schedule",
    sourceCode: "Discount Schedule: Volume_Discount_Tiers\n  Type: Range\n  Tier 1: 1-9 units → 0% discount\n  Tier 2: 10-49 units → 5% discount\n  Tier 3: 50-99 units → 10% discount\n  Tier 4: 100+ units → 15% discount\n  Products: All subscription products\n  Active: true",
    businessPurpose: "Standard volume discount tiers applied to all subscription products. Uses Range method where one tier applies to all units.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 20,
    dependencies: [{ type: "field", name: "SBQQ__Quantity__c", reference: "CPQ managed field" }],
    recommendedRcaTarget: "Price_Adjustment_Method",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: "{\n  \"priceAdjustmentSchedule\": {\n    \"name\": \"Volume_Discount_Tiers\",\n    \"adjustmentMethod\": \"Range\",\n    \"type\": \"Volume\",\n    \"tiers\": [\n      { \"lowerBound\": 1, \"upperBound\": 9, \"adjustmentValue\": 0, \"adjustmentType\": \"Percentage\" },\n      { \"lowerBound\": 10, \"upperBound\": 49, \"adjustmentValue\": 5, \"adjustmentType\": \"Percentage\" },\n      { \"lowerBound\": 50, \"upperBound\": 99, \"adjustmentValue\": 10, \"adjustmentType\": \"Percentage\" },\n      { \"lowerBound\": 100, \"upperBound\": null, \"adjustmentValue\": 15, \"adjustmentType\": \"Percentage\" }\n    ]\n  }\n}",
      candidateLanguage: "json",
      plainLanguageExplanation: "Direct 1:1 mapping from CPQ Discount Schedule to RCA PriceAdjustmentSchedule with Range method. Tier boundaries and percentages are identical.",
      targetPatternReasoning: "Discount schedules with Range method map directly to PriceAdjustmentSchedule + PriceAdjustmentTier objects. This is the simplest conversion pattern.",
      preservedBehavior: ["Volume tier boundaries identical", "Range method (one tier for all units)", "Applies to all subscription products"],
      changedBehavior: ["RCA also supports Slab (graduated) method if needed in future"],
      unknowns: ["Should any products be excluded from volume discounting?"],
      requiredTests: ["5 units → 0%", "25 units → 5%", "75 units → 10%", "200 units → 15%"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Direct discount schedule mapping", "Range method preserved"],
      detailed: [{ metric: "Tiers", value: 4, source: "Schedule config" }],
      raw: { artifactReferences: ["artifact:ds-volume-tiers"], metadataExtracts: {} }
    }
  },
  {
    id: "ds-term-graduated",
    name: "DS_TermGraduatedDiscount",
    sourceType: "Discount_Schedule",
    sourceCode: "Discount Schedule: Term_Graduated_Discount\n  Type: Range\n  Tier 1: 1-11 months → 0% discount\n  Tier 2: 12-23 months → 5% discount\n  Tier 3: 24-35 months → 10% discount\n  Tier 4: 36+ months → 15% discount\n  Products: All subscription products\n  Active: true",
    businessPurpose: "Rewards longer commitment terms with progressively larger discounts. 36+ month subscriptions receive the maximum 15% term discount.",
    usageSignal: "Active_Or_Referenced",
    complexityScore: 32,
    dependencies: [{ type: "field", name: "SBQQ__SubscriptionTerm__c", reference: "CPQ managed field" }],
    recommendedRcaTarget: "Price_Adjustment_Method",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: "{\n  \"priceAdjustmentSchedule\": {\n    \"name\": \"Term_Graduated_Discount\",\n    \"adjustmentMethod\": \"Slab\",\n    \"type\": \"Term\",\n    \"tiers\": [\n      { \"lowerBound\": 1, \"upperBound\": 11, \"adjustmentValue\": 0, \"adjustmentType\": \"Percentage\" },\n      { \"lowerBound\": 12, \"upperBound\": 23, \"adjustmentValue\": 5, \"adjustmentType\": \"Percentage\" },\n      { \"lowerBound\": 24, \"upperBound\": 35, \"adjustmentValue\": 10, \"adjustmentType\": \"Percentage\" },\n      { \"lowerBound\": 36, \"upperBound\": null, \"adjustmentValue\": 15, \"adjustmentType\": \"Percentage\" }\n    ]\n  }\n}",
      candidateLanguage: "json",
      plainLanguageExplanation: "Term-based discount schedule converts to PriceAdjustmentSchedule with Slab method for graduated pricing — a capability CPQ doesn't natively support.",
      targetPatternReasoning: "Term-based graduated discounts map to PriceAdjustmentSchedule with Slab (graduated) method. RCA's Slab method is an upgrade from CPQ which only supports Range-equivalent.",
      preservedBehavior: ["Term tier boundaries preserved", "Discount percentages identical"],
      changedBehavior: ["Slab method enables true graduated pricing (RCA upgrade over CPQ)", "Term type natively recognized by RCA"],
      unknowns: ["Should this be Range or Slab? Current CPQ behavior is Range-equivalent."],
      requiredTests: ["6-month term → 0%", "18-month → 5%", "30-month → 10%", "48-month → 15%"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Term discount schedule → PriceAdjustmentSchedule (Slab)", "RCA upgrade: graduated pricing support"],
      detailed: [{ metric: "Tiers", value: 4, source: "Schedule config" }],
      raw: { artifactReferences: ["artifact:ds-term-graduated"], metadataExtracts: {} }
    }
  }
];

export const summaryVariableArtifacts = [
  {
    id: "sv-total-discount",
    name: "SV_TotalDiscountAcrossLines",
    sourceType: "Summary_Variable",
    sourceCode: "Summary Variable: Total_Discount_Across_All_Lines\n  Aggregate Function: SUM\n  Target Object: Quote Line\n  Target Field: SBQQ__Discount__c\n  Filter Field: SBQQ__Quantity__c\n  Filter Operator: greater than\n  Filter Value: 0\n  Used In: Validation Rule (Total_Discount <= 30)",
    businessPurpose: "Aggregates total discount percentage across all active quote lines. Used in a validation rule to enforce a 30% total discount cap requiring approval.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 55,
    dependencies: [
      { type: "field", name: "SBQQ__Discount__c", reference: "CPQ managed field" },
      { type: "rule", name: "Total discount cap validation", reference: "Validation rule" }
    ],
    recommendedRcaTarget: "Apex_Invocable_Extension",
    conversionConfidence: "Medium",
    draft: {
      generatedCandidate: "public class RCA_TotalDiscountValidator {\n    @InvocableMethod(label='Validate Total Discount Cap')\n    public static List<ValidationResult> validate(List<Id> quoteIds) {\n        List<ValidationResult> results = new List<ValidationResult>();\n        for (Id qId : quoteIds) {\n            Decimal totalDiscount = 0;\n            for (QuoteLineItem qli : [\n                SELECT Discount FROM QuoteLineItem\n                WHERE QuoteId = :qId AND Quantity > 0\n            ]) {\n                totalDiscount += (qli.Discount != null ? qli.Discount : 0);\n            }\n            ValidationResult r = new ValidationResult();\n            r.isValid = (totalDiscount <= 30);\n            r.totalDiscount = totalDiscount;\n            r.message = r.isValid ? '' : 'Total discount (' + totalDiscount.setScale(1) + '%) exceeds 30% cap.';\n            results.add(r);\n        }\n        return results;\n    }\n    public class ValidationResult {\n        @InvocableVariable public Boolean isValid;\n        @InvocableVariable public Decimal totalDiscount;\n        @InvocableVariable public String message;\n    }\n}",
      candidateLanguage: "apex",
      plainLanguageExplanation: "Summary variables with cross-line aggregation have no declarative RCA equivalent. This Apex invocable replicates the SUM aggregation and validation check.",
      targetPatternReasoning: "Cross-line aggregation (SUM of discount across lines) requires custom Apex in RCA. Summary variables are one of the few CPQ features without a direct declarative replacement.",
      preservedBehavior: ["SUM of discount across active lines", "30% cap enforcement", "Filter on quantity > 0"],
      changedBehavior: ["Declarative summary variable → custom Apex invocable", "Called from Flow or pricing procedure"],
      unknowns: ["Should the cap be configurable per account segment?"],
      requiredTests: ["Total discount 25% → pass", "Total discount 35% → fail with message", "No lines → pass (0% total)"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Summary variable SUM → Apex invocable", "No declarative equivalent in RCA"],
      detailed: [{ metric: "Validation triggers monthly", value: 2400, source: "Quote save frequency" }],
      raw: { artifactReferences: ["artifact:sv-total-discount"], metadataExtracts: {} }
    }
  },
  {
    id: "sv-aggregate-quantity",
    name: "SV_AggregateQtyByFamily",
    sourceType: "Summary_Variable",
    sourceCode: "Summary Variable: Aggregate_Qty_By_Product_Family\n  Aggregate Function: SUM\n  Target Object: Quote Line\n  Target Field: SBQQ__Quantity__c\n  Filter Field: SBQQ__Product__r.Family\n  Filter Operator: equals\n  Filter Value: [Dynamic - per family]\n  Used In: Price Rule conditions for family-level volume pricing",
    businessPurpose: "Aggregates total quantity by product family across all quote lines. Used as input to price rules that apply family-level volume discounts.",
    usageSignal: "Active_Or_Referenced",
    complexityScore: 40,
    dependencies: [
      { type: "field", name: "SBQQ__Quantity__c", reference: "CPQ managed field" },
      { type: "field", name: "Product2.Family", reference: "Standard field" },
      { type: "rule", name: "Family volume pricing rules", reference: "Price rules" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: "Pricing Procedure: \"PRC_FamilyQtyAggregation_v1\"\n├── Step 1: Aggregate Quantity by Family\n│   └── Expression Set: ES_FamilyQtySum\n│       Function: SUM(QuoteLineItem.Quantity)\n│       GroupBy: Product.Family\n│       Output: FamilyTotalQty\n├── Step 2: Lookup Family Volume Discount\n│   └── Decision Table: DT_FamilyVolumeDiscount\n│       Inputs: Product.Family, FamilyTotalQty\n│       Output: FamilyDiscount_Pct\n└── Step 3: Apply Family Discount\n    └── Expression: AdjustedPrice = ListPrice × (1 - FamilyDiscount_Pct/100)",
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "BRE Expression Sets support SUM aggregation with GROUP BY, making this a declarative conversion. The aggregated quantity feeds into a Decision Table for family-level volume discounts.",
      targetPatternReasoning: "Simple SUM aggregation grouped by a field can be expressed in BRE Expression Sets. This is distinct from the cross-line validator which required complex conditional logic.",
      preservedBehavior: ["Quantity aggregated by product family", "Feeds into volume discount logic"],
      changedBehavior: ["Summary variable → BRE Expression Set with SUM", "Aggregation and discount in same pricing procedure"],
      unknowns: ["Which product families have volume pricing?"],
      requiredTests: ["3 Platform lines (qty 5, 10, 15) → family total = 30", "Mixed families → separate aggregation", "Single line → family total = line quantity"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Simple SUM aggregation → BRE Expression Set", "High confidence — declarative replacement"],
      detailed: [{ metric: "Product families with volume pricing", value: 3, source: "Price rule analysis" }],
      raw: { artifactReferences: ["artifact:sv-aggregate-quantity"], metadataExtracts: {} }
    }
  }
];
