export const priceRuleArtifacts = [
  {
    id: "pr-volume-discount",
    name: "PR_VolumeBasedDiscount",
    sourceType: "Price_Rule",
    sourceCode: "Price Rule: PR_VolumeBasedDiscount\n  Evaluation Event: On Calculate\n  Conditions Scope: Product\n  Conditions:\n    Field: SBQQ__Quantity__c\n    Operator: greater than\n    Filter Value: 1\n  Actions:\n    Target Field: SBQQ__Discount__c\n    Value:\n      1-9: 0%\n      10-49: 5%\n      50-99: 10%\n      100+: 15%\n  Evaluation Order: 1",
    businessPurpose: "Applies tiered volume discounts based on line quantity. Higher quantities receive progressively larger discounts up to 15%.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 30,
    dependencies: [
      { type: "field", name: "SBQQ__Quantity__c", reference: "CPQ managed field" },
      { type: "field", name: "SBQQ__Discount__c", reference: "CPQ managed field" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: "Pricing Procedure: \"PRC_VolumeDiscount_v1\"\n├── Step 1: Initialize Price\n├── Step 2: Lookup Volume Discount\n│   └── Decision Table: DT_VolumeDiscount\n│       Input: QuoteLineItem.Quantity\n│       Output: Discount_Pct\n│       Rows: 1-9→0, 10-49→5, 50-99→10, 100+→15\n├── Step 3: Apply Discount\n│   └── Expression: AdjustedPrice = ListPrice × (1 - Discount_Pct/100)\n└── Step 4: Calculate Total",
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "Volume discount tiers map directly to a Decision Table within a Pricing Procedure. The tier boundaries and percentages are identical.",
      targetPatternReasoning: "Volume-based discount logic maps to a Pricing Procedure step backed by a Decision Table lookup keyed on Quantity. This is the most common price rule conversion pattern.",
      preservedBehavior: ["Volume tier boundaries preserved", "Discount percentages identical", "Applies per line item"],
      changedBehavior: ["Condition/action pair → pricing procedure step", "Discount tiers in Decision Table (editable without deployment)"],
      unknowns: ["Does this stack with segment-based discounts?"],
      requiredTests: ["Qty 5 → 0% discount", "Qty 25 → 5% discount", "Qty 75 → 10% discount", "Qty 150 → 15% discount"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Standard volume discount rule", "Direct Decision Table mapping", "High confidence"],
      detailed: [{ metric: "Discount tiers", value: 4, source: "Price rule config" }, { metric: "Lines affected monthly", value: 3200, source: "Quote line query" }],
      raw: { artifactReferences: ["artifact:pr-volume-discount"], metadataExtracts: {} }
    }
  },
  {
    id: "pr-customer-tier-override",
    name: "PR_CustomerTierPriceOverride",
    sourceType: "Price_Rule",
    sourceCode: "Price Rule: PR_CustomerTierPriceOverride\n  Evaluation Event: On Calculate\n  Conditions Scope: Quote\n  Conditions:\n    Field: SBQQ__Account__r.Customer_Tier__c\n    Operator: not equal to\n    Filter Value: null\n  Lookup Object: Customer_Price_Override__c\n  Lookup Match Fields:\n    Customer_Tier__c = Account.Customer_Tier__c\n    Product_Family__c = Product.Family\n  Action: Set SBQQ__SpecialPrice__c = Override_Price__c\n  Evaluation Order: 2",
    businessPurpose: "Overrides list price with tier-specific pricing for customers with an assigned tier. Lookup matches customer tier and product family to find the negotiated price.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 35,
    dependencies: [
      { type: "field", name: "Account.Customer_Tier__c", reference: "Custom field" },
      { type: "object", name: "Customer_Price_Override__c", reference: "Custom lookup table" },
      { type: "field", name: "SBQQ__SpecialPrice__c", reference: "CPQ managed field" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: "Pricing Procedure: \"PRC_CustomerTierOverride_v1\"\n├── Step 1: Initialize Price\n├── Step 2: Check Customer Tier\n│   └── Condition: Account.Customer_Tier__c IS NOT NULL\n├── Step 3: Lookup Tier Price\n│   └── Decision Table: DT_CustomerTierPrice\n│       Inputs: Account.Customer_Tier__c, Product.Family\n│       Output: OverridePrice (Currency)\n├── Step 4: Apply Override\n│   └── Expression: IF OverridePrice != null THEN NetPrice = OverridePrice\n└── Step 5: Calculate Total",
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "The custom lookup object maps directly to a Decision Table. The tier-based price override becomes a conditional pricing procedure step.",
      targetPatternReasoning: "Customer tier price lookup maps to a Pricing Procedure step backed by a Decision Table lookup keyed on Customer Tier and Product Family. The custom object Customer_Price_Override__c data migrates into Decision Table rows.",
      preservedBehavior: ["Tier-specific pricing preserved", "Product family granularity maintained", "Only applies when Customer_Tier__c is populated"],
      changedBehavior: ["Custom object lookup → Decision Table", "Override visible in price waterfall"],
      unknowns: ["How many Customer_Price_Override__c records exist?", "How frequently are tier prices updated?"],
      requiredTests: ["Gold tier + Platform family → override price applied", "No tier assigned → no override", "Tier exists but no family match → no override"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Customer tier lookup → Decision Table", "Direct mapping", "High confidence"],
      detailed: [{ metric: "Customer tiers", value: 4, source: "Picklist values" }, { metric: "Override records", value: 85, source: "Custom object count" }],
      raw: { artifactReferences: ["artifact:pr-customer-tier-override"], metadataExtracts: {} }
    }
  },
  {
    id: "pr-promo-discount-date",
    name: "PR_PromotionalDiscountDateRange",
    sourceType: "Price_Rule",
    sourceCode: "Price Rule: PR_PromotionalDiscountDateRange\n  Evaluation Event: On Calculate\n  Conditions Scope: Quote\n  Conditions:\n    Field: SBQQ__StartDate__c\n    Operator: greater or equal\n    Filter Value: 2026-01-01\n    Field: SBQQ__StartDate__c\n    Operator: less or equal\n    Filter Value: 2026-06-30\n    Field: SBQQ__Product__r.Promo_Eligible__c\n    Operator: equals\n    Filter Value: true\n  Actions:\n    Target Field: SBQQ__AdditionalDiscount__c\n    Value: 20\n  Evaluation Order: 3",
    businessPurpose: "Applies a 20% promotional discount to eligible products for quotes with start dates in H1 2026. Used for time-limited sales campaigns.",
    usageSignal: "Active_Or_Referenced",
    complexityScore: 48,
    dependencies: [
      { type: "field", name: "SBQQ__StartDate__c", reference: "CPQ managed field" },
      { type: "field", name: "Promo_Eligible__c", reference: "Custom field on Product2" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "Medium",
    draft: {
      generatedCandidate: "Pricing Procedure: \"PRC_PromoDiscount_v1\"\n├── Step 1: Initialize Price\n├── Step 2: Check Promo Eligibility\n│   └── Decision Table: DT_PromoEligibility\n│       Inputs: Quote.StartDate, Product.PromoEligible\n│       Logic: StartDate BETWEEN 2026-01-01 AND 2026-06-30 AND PromoEligible = true\n│       Output: PromoDiscount_Pct = 20\n├── Step 3: Apply Promo Discount\n│   └── Expression: AdjustedPrice = ListPrice × (1 - PromoDiscount_Pct/100)\n└── Step 4: Calculate Total",
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "Promotional discount with date range logic maps to a pricing procedure with date-aware conditions in a Decision Table.",
      targetPatternReasoning: "Date-range promotional discounts map to Pricing Procedures with date logic in Decision Table conditions. Medium confidence because date handling in BRE requires careful Context Definition setup.",
      preservedBehavior: ["20% discount for promo-eligible products", "Date range enforcement"],
      changedBehavior: ["Date logic moves to Decision Table conditions", "Promo periods manageable without deployment"],
      unknowns: ["Will future promo periods use the same 20% rate?", "Can multiple promos stack?"],
      requiredTests: ["Promo-eligible product in H1 2026 → 20% discount", "Promo-eligible product in H2 2026 → no discount", "Non-eligible product in H1 → no discount"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Date-range promo discount", "Medium confidence due to date handling", "Decision Table mapping"],
      detailed: [{ metric: "Promo-eligible products", value: 45, source: "Product2 query" }],
      raw: { artifactReferences: ["artifact:pr-promo-discount-date"], metadataExtracts: {} }
    }
  },
  {
    id: "pr-multi-currency",
    name: "PR_MultiCurrencyAdjustment",
    sourceType: "Price_Rule",
    sourceCode: "Price Rule: PR_MultiCurrencyAdjustment\n  Evaluation Event: On Calculate\n  Conditions Scope: Quote\n  Conditions:\n    Field: CurrencyIsoCode\n    Operator: not equal to\n    Filter Value: USD\n  Lookup Object: Currency_Adjustment__c\n  Lookup Match Fields:\n    Currency_Code__c = Quote.CurrencyIsoCode\n    Product_Family__c = Product.Family\n  Action: Set SBQQ__Markup__c = Adjustment_Pct__c\n  Evaluation Order: 4",
    businessPurpose: "Applies currency-specific price adjustments for non-USD quotes. Different product families have different adjustment percentages per currency to account for regional pricing strategy.",
    usageSignal: "Active_Or_Referenced",
    complexityScore: 52,
    dependencies: [
      { type: "field", name: "CurrencyIsoCode", reference: "Standard multi-currency field" },
      { type: "object", name: "Currency_Adjustment__c", reference: "Custom lookup table" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "Low",
    draft: {
      generatedCandidate: "Pricing Procedure: \"PRC_MultiCurrencyAdj_v1\"\n├── Step 1: Initialize Price (currency-aware price book)\n├── Step 2: Check Non-USD\n│   └── Condition: Quote.CurrencyIsoCode != 'USD'\n├── Step 3: Lookup Currency Adjustment\n│   └── Decision Table: DT_CurrencyAdjustment\n│       Inputs: CurrencyIsoCode, Product.Family\n│       Output: AdjustmentPct\n├── Step 4: Apply Adjustment\n│   └── Expression: AdjustedPrice = ListPrice × (1 + AdjustmentPct/100)\n└── Step 5: Calculate Total",
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "Multi-currency adjustments map to a pricing procedure with a Decision Table for currency/family-specific adjustment rates.",
      targetPatternReasoning: "Currency-specific adjustments map to Pricing Procedures with Decision Table lookup. Medium confidence because RCA's multi-currency support may handle some adjustments natively via currency-aware price books.",
      preservedBehavior: ["Per-currency, per-family adjustment percentages", "Only applies to non-USD quotes"],
      changedBehavior: ["Custom object → Decision Table", "RCA may support some adjustments via multi-currency price books natively"],
      unknowns: ["Can RCA's native multi-currency price books replace some adjustments?", "How many currency/family combinations exist?"],
      requiredTests: ["EUR + Platform → correct adjustment", "USD quote → no adjustment applied", "Unknown currency → graceful handling"],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Multi-currency adjustment rule", "Medium confidence — may overlap with native multi-currency"],
      detailed: [{ metric: "Supported currencies", value: 5, source: "CurrencyType query" }, { metric: "Adjustment records", value: 20, source: "Custom object count" }],
      raw: { artifactReferences: ["artifact:pr-multi-currency"], metadataExtracts: {} }
    }
  }
];
