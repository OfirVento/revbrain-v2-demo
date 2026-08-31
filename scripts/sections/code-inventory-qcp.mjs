// QCP artifacts (5)
export const qcpArtifacts = [
  {
    id: "qcp-segment-discount",
    name: "QCP_SegmentDiscount",
    sourceType: "QCP_JavaScript",
    sourceCode: `export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    const segment = quoteModel.record["SBQQ__Account__r"]["Segment__c"];
    const region = quoteModel.record["SBQQ__Account__r"]["Region__c"];
    const discountMap = {
      Enterprise: { NA: 10, EMEA: 12, APAC: 8 },
      MidMarket: { NA: 5, EMEA: 6, APAC: 4 },
      SMB: { NA: 2, EMEA: 2, APAC: 2 }
    };
    const discount = discountMap[segment]?.[region] || 0;
    if (discount > 0) {
      quoteLineModels.forEach(line => {
        if (!line.record["SBQQ__Optional__c"]) {
          line.record["SBQQ__AdditionalDiscount__c"] = discount;
        }
      });
    }
    resolve();
  });
}`,
    businessPurpose: "Applies segment-based and region-specific discounts to all non-optional quote lines. Enterprise customers in EMEA receive the highest automatic discount (12%).",
    usageSignal: "Confirmed_Usage",
    complexityScore: 35,
    dependencies: [
      { type: "field", name: "Account.Segment__c", reference: "Custom field on Account" },
      { type: "field", name: "Account.Region__c", reference: "Custom field on Account" },
      { type: "field", name: "SBQQ__AdditionalDiscount__c", reference: "CPQ managed field" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: `Pricing Procedure: "PRC_SegmentRegionDiscount_v1"
├── Step 1: Initialize Price (standard price book lookup)
├── Step 2: Lookup Segment-Region Discount
│   └── Decision Table: DT_SegmentRegionDiscount
│       Inputs:  Account.Segment__c, Account.Region__c
│       Outputs: Discount_Pct (Decimal)
│       Rows:
│         Enterprise, NA   → 10.0
│         Enterprise, EMEA → 12.0
│         Enterprise, APAC → 8.0
│         MidMarket,  NA   → 5.0
│         MidMarket,  EMEA → 6.0
│         MidMarket,  APAC → 4.0
│         SMB,        NA   → 2.0
│         SMB,        EMEA → 2.0
│         SMB,        APAC → 2.0
├── Step 3: Apply Discount (skip optional lines)
│   └── Condition: QuoteLineItem.IsOptional != true
│   └── Expression: AdjustedPrice = ListPrice × (1 - Discount_Pct / 100)
└── Step 4: Calculate Total
    └── Expression: TotalPrice = AdjustedPrice × Quantity`,
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "This pricing procedure replaces the browser-side QCP with a server-side Decision Table lookup keyed on Account Segment and Region. The discount percentage is looked up declaratively and applied as a pricing step, producing a full audit trail in the price waterfall.",
      targetPatternReasoning: "Segment-based discount logic maps directly to a Pricing Procedure with a Decision Table lookup. The QCP's hardcoded discount map becomes a maintainable Decision Table that business users can update without code changes.",
      preservedBehavior: [
        "Discount percentages per segment and region remain identical",
        "Optional lines are excluded from the discount",
        "Discount applies to all non-optional lines uniformly"
      ],
      changedBehavior: [
        "Execution moves from browser-side to server-side — no browser performance impact",
        "Discount values are in a Decision Table, not hardcoded — easier to maintain",
        "Price waterfall audit trail now records each step"
      ],
      unknowns: [
        "Are there additional segment/region combinations not represented in the current QCP?",
        "Should the discount apply before or after volume-based discounts?"
      ],
      requiredTests: [
        "Verify Enterprise/EMEA quote line receives 12% discount",
        "Verify optional lines are excluded from discount",
        "Verify unknown segment defaults to 0% discount",
        "Verify price waterfall correctly records the discount step"
      ],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: [
        "QCP applies segment × region discount matrix to non-optional lines",
        "Maps cleanly to Pricing Procedure + Decision Table pattern",
        "High confidence — straightforward lookup-based logic"
      ],
      detailed: [
        { metric: "Discount combinations", value: 9, source: "QCP code analysis" },
        { metric: "Lines of QCP code", value: 18, source: "StaticResource" },
        { metric: "Quote lines affected (monthly)", value: 4200, source: "Quote line query" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-segment-discount"],
        metadataExtracts: { lastModified: "2025-11-20", executionFrequency: "Every quote save" }
      }
    }
  },
  {
    id: "qcp-bundle-pricing",
    name: "QCP_BundlePricingAdjustment",
    sourceType: "QCP_JavaScript",
    sourceCode: `export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve) => {
    const bundleLines = quoteLineModels.filter(
      l => l.record["SBQQ__ProductOption__r"] != null
    );
    const parentMap = {};
    quoteLineModels.forEach(l => {
      if (l.record["SBQQ__Bundle__c"]) {
        parentMap[l.record["Id"]] = l;
      }
    });
    bundleLines.forEach(child => {
      const parentId = child.record["SBQQ__RequiredBy__c"];
      const parent = parentMap[parentId];
      if (parent && parent.record["SBQQ__Quantity__c"] >= 10) {
        const basePct = child.record["SBQQ__BundledQuantity__c"] > 5 ? 15 : 8;
        child.record["SBQQ__AdditionalDiscount__c"] = basePct;
      }
    });
    resolve();
  });
}`,
    businessPurpose: "Applies bundle-aware discounts to child components based on parent bundle quantity. When a bundle parent has quantity >= 10, child components receive an additional 8-15% discount based on their bundled quantity.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 62,
    dependencies: [
      { type: "object", name: "SBQQ__ProductOption__c", reference: "CPQ product option object" },
      { type: "field", name: "SBQQ__RequiredBy__c", reference: "Bundle parent reference" },
      { type: "field", name: "SBQQ__BundledQuantity__c", reference: "Component quantity in bundle" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "Medium",
    draft: {
      generatedCandidate: `Pricing Procedure: "PRC_BundleComponentDiscount_v1"
├── Step 1: Initialize Price
├── Step 2: Identify Bundle Context
│   └── Context Mapping: Map parent bundle quantity to child context
│       Source: ParentQuoteLineItem.Quantity
│       Target: Context.ParentQuantity
├── Step 3: Lookup Bundle Discount
│   └── Decision Table: DT_BundleComponentDiscount
│       Inputs:  Context.ParentQuantity (>= 10 threshold),
│                QuoteLineItem.BundledQuantity (> 5 threshold)
│       Output:  BundleDiscount_Pct
│       Rows:
│         ParentQty >= 10 AND BundledQty > 5  → 15.0
│         ParentQty >= 10 AND BundledQty <= 5 → 8.0
│         ParentQty < 10                       → 0.0
├── Step 4: Apply Bundle Discount
│   └── Expression: AdjustedPrice = ListPrice × (1 - BundleDiscount_Pct / 100)
└── Step 5: Calculate Total`,
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "This pricing procedure handles bundle-aware discounting by using Context Mappings to pass parent bundle quantity to child component pricing steps, then applying tiered discounts via a Decision Table.",
      targetPatternReasoning: "Bundle-aware pricing maps to a Pricing Procedure with Decision Table, but requires Context Mappings to establish the parent-child relationship. Implemented as a Pricing Procedure step backed by a Decision Table lookup keyed on parent quantity and bundled quantity thresholds.",
      preservedBehavior: [
        "Discount thresholds (parent qty >= 10, child bundled qty > 5) remain identical",
        "Discount percentages (8% and 15%) preserved",
        "Only bundle child components are affected"
      ],
      changedBehavior: [
        "Parent-child relationship established via Context Mapping instead of in-memory JavaScript traversal",
        "Discount logic is declarative and auditable via price waterfall"
      ],
      unknowns: [
        "Does the discount stack with other line-level discounts?",
        "Are there bundle types that should be excluded from this pricing rule?",
        "How does this interact with nested bundles (bundle within bundle)?"
      ],
      requiredTests: [
        "Bundle with parent qty 10, child bundled qty 6 → 15% discount on child",
        "Bundle with parent qty 10, child bundled qty 3 → 8% discount on child",
        "Bundle with parent qty 5 → 0% discount on child",
        "Nested bundle scenario — verify correct parent resolution",
        "Verify discount appears in price waterfall"
      ],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: [
        "QCP traverses bundle parent-child relationships for conditional discounting",
        "Medium confidence due to Context Mapping complexity for parent-child resolution",
        "Decision Table captures the discount threshold logic"
      ],
      detailed: [
        { metric: "Bundle configurations affected", value: 28, source: "Bundle analysis" },
        { metric: "Lines of QCP code", value: 20, source: "StaticResource" },
        { metric: "Avg bundle components per parent", value: 4.2, source: "Product option query" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-bundle-pricing"],
        metadataExtracts: { lastModified: "2025-09-15" }
      }
    }
  },
  {
    id: "qcp-tax-callout",
    name: "QCP_TaxPreCalculation",
    sourceType: "QCP_JavaScript",
    sourceCode: `export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    const shipTo = quoteModel.record["ShippingState__c"];
    const lines = quoteLineModels.map(l => ({
      id: l.record["Id"],
      amount: l.record["SBQQ__NetTotal__c"],
      productCode: l.record["SBQQ__Product__r"]["ProductCode"]
    }));
    const endpoint = "https://tax-service.techflow.io/api/v2/estimate";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-API-Key", "tf_tax_key_prod_xxxx");
    xhr.onload = function() {
      if (xhr.status === 200) {
        const rates = JSON.parse(xhr.responseText);
        quoteLineModels.forEach(line => {
          const rate = rates[line.record["Id"]];
          if (rate) {
            line.record["Estimated_Tax_Rate__c"] = rate.taxRate;
            line.record["Estimated_Tax__c"] = rate.taxAmount;
          }
        });
      }
      resolve();
    };
    xhr.send(JSON.stringify({ shipTo, lines }));
  });
}`,
    businessPurpose: "Pre-calculates estimated tax amounts by calling an external tax service API before the main CPQ calculation. Used to display estimated tax on the quote editor before final Avalara tax calculation at save.",
    usageSignal: "Active_Or_Referenced",
    complexityScore: 78,
    dependencies: [
      { type: "integration", name: "Tax Service API", reference: "https://tax-service.techflow.io/api/v2/estimate" },
      { type: "field", name: "ShippingState__c", reference: "Custom field on Quote" },
      { type: "field", name: "Estimated_Tax_Rate__c", reference: "Custom field on Quote Line" },
      { type: "field", name: "Estimated_Tax__c", reference: "Custom field on Quote Line" }
    ],
    recommendedRcaTarget: "Apex_Invocable_Extension",
    conversionConfidence: "Manual_Review_Required",
    draft: {
      generatedCandidate: `public class RCA_TaxPreCalculation {
    @InvocableMethod(label='Estimate Tax for Quote Lines')
    public static List<TaxResult> estimateTax(List<TaxRequest> requests) {
        List<TaxResult> results = new List<TaxResult>();
        for (TaxRequest req : requests) {
            HttpRequest httpReq = new HttpRequest();
            httpReq.setEndpoint('callout:TaxService/api/v2/estimate');
            httpReq.setMethod('POST');
            httpReq.setHeader('Content-Type', 'application/json');
            httpReq.setTimeout(5000);
            httpReq.setBody(JSON.serialize(new Map<String, Object>{
                'shipTo' => req.shippingState,
                'lines' => req.lineItems
            }));
            try {
                HttpResponse res = new Http().send(httpReq);
                if (res.getStatusCode() == 200) {
                    // Parse and map tax rates to line items
                    TaxResult result = new TaxResult();
                    result.success = true;
                    result.taxData = res.getBody();
                    results.add(result);
                } else {
                    results.add(createFallback('Tax service returned ' + res.getStatusCode()));
                }
            } catch (Exception e) {
                results.add(createFallback('Tax service unavailable: ' + e.getMessage()));
            }
        }
        return results;
    }

    private static TaxResult createFallback(String reason) {
        TaxResult r = new TaxResult();
        r.success = false;
        r.fallbackReason = reason;
        return r;
    }

    public class TaxRequest {
        @InvocableVariable public String shippingState;
        @InvocableVariable public List<Map<String, Object>> lineItems;
    }

    public class TaxResult {
        @InvocableVariable public Boolean success;
        @InvocableVariable public String taxData;
        @InvocableVariable public String fallbackReason;
    }
}`,
      candidateLanguage: "apex",
      plainLanguageExplanation: "This Apex invocable action replaces the browser-side XHR callout with a server-side HTTP callout that includes proper error handling, a 5-second timeout, and fallback behavior. It's called from a Pricing Procedure step via ProcedurePlanOption.ApexClass.",
      targetPatternReasoning: "External API callouts cannot be made from BRE Expression Sets — they require custom Apex. The QCP's synchronous XHR becomes an Apex invocable with proper error handling, timeout, and Named Credential authentication replacing the hardcoded API key.",
      preservedBehavior: [
        "Tax estimates are calculated before final pricing",
        "Per-line tax rate and amount are populated"
      ],
      changedBehavior: [
        "Execution moves from browser to server — no XHR limitations",
        "Hardcoded API key replaced with Named Credential (callout:TaxService)",
        "5-second timeout and error handling added",
        "Fallback behavior on service failure instead of silent swallow"
      ],
      unknowns: [
        "What is the expected behavior when the tax service is unavailable? Current QCP silently resolves.",
        "Is the tax-service.techflow.io endpoint the same as the Avalara integration, or a separate service?",
        "Should fallback use a default tax rate or zero?"
      ],
      requiredTests: [
        "Verify tax calculation with valid shipping state returns correct rates",
        "Verify 5-second timeout triggers fallback behavior",
        "Verify HTTP 500 from tax service triggers fallback",
        "Verify Named Credential authentication works in sandbox",
        "Load test: verify performance with 100+ line items in a single callout"
      ],
      humanReviewRequired: true,
      reviewReasons: [
        "External API integration requires security review of Named Credential setup",
        "Fallback behavior on tax service failure needs business decision",
        "Relationship between this tax pre-calculation and the Avalara integration is unclear"
      ]
    },
    evidence: {
      summary: [
        "QCP makes unprotected XHR callout to tax service with hardcoded API key",
        "No error handling, no timeout — quote hangs on service failure",
        "Manual review required due to external integration and security concerns"
      ],
      detailed: [
        { metric: "Monthly callouts", value: 2400, source: "Execution frequency analysis" },
        { metric: "Avg latency", value: "1.2s", source: "Network logs" },
        { metric: "Failure rate", value: "2.1%", source: "Error tracking" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-tax-callout"],
        metadataExtracts: { endpoint: "https://tax-service.techflow.io/api/v2/estimate", authMethod: "Hardcoded API key in header" }
      }
    }
  },
  {
    id: "qcp-custom-rounding",
    name: "QCP_BankersRounding",
    sourceType: "QCP_JavaScript",
    sourceCode: `export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve) => {
    quoteLineModels.forEach(line => {
      const net = line.record["SBQQ__NetPrice__c"];
      if (net != null) {
        line.record["SBQQ__NetPrice__c"] = bankersRound(net, 2);
        line.record["SBQQ__NetTotal__c"] =
          bankersRound(net, 2) * line.record["SBQQ__Quantity__c"];
      }
    });
    resolve();
  });
}

function bankersRound(value, decimals) {
  const factor = Math.pow(10, decimals);
  const shifted = value * factor;
  const truncated = Math.trunc(shifted);
  const remainder = shifted - truncated;
  if (Math.abs(remainder - 0.5) < 1e-10) {
    return (truncated % 2 === 0 ? truncated : truncated + 1) / factor;
  }
  return Math.round(shifted) / factor;
}`,
    businessPurpose: "Applies banker's rounding (round half to even) to net prices after CPQ calculation, overriding the standard JavaScript Math.round behavior to comply with financial rounding standards.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 42,
    dependencies: [
      { type: "field", name: "SBQQ__NetPrice__c", reference: "CPQ managed field" },
      { type: "field", name: "SBQQ__NetTotal__c", reference: "CPQ managed field" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: `Pricing Procedure: "PRC_BankersRounding_v1"
├── Step 1: Apply Banker's Rounding to Net Price
│   └── Expression Set: ES_BankersRound
│       Input:  RawNetPrice (from previous pricing step)
│       Logic:  ROUND(RawNetPrice, 2, RoundingMode.HALF_EVEN)
│       Output: NetPrice
├── Step 2: Calculate Rounded Total
│   └── Expression: NetTotal = NetPrice × Quantity
│
│ Note: BRE Expression Sets support HALF_EVEN rounding mode
│ natively via the ROUND function's third parameter.
│ No custom Apex required.`,
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "BRE Expression Sets support banker's rounding natively via the ROUND function with HALF_EVEN mode. The custom JavaScript implementation is replaced by a single expression step in the pricing procedure.",
      targetPatternReasoning: "Banker's rounding is a built-in capability of BRE Expression Sets (ROUND with HALF_EVEN). No custom code needed — this is a direct declarative replacement.",
      preservedBehavior: [
        "Banker's rounding (round half to even) applied to all net prices",
        "Rounding to 2 decimal places",
        "Net total recalculated after rounding"
      ],
      changedBehavior: [
        "Custom JavaScript function replaced with native BRE ROUND function",
        "Rounding step visible in price waterfall audit trail"
      ],
      unknowns: [
        "Are there product families that should NOT receive banker's rounding?"
      ],
      requiredTests: [
        "Verify $10.125 rounds to $10.12 (round half to even — down)",
        "Verify $10.135 rounds to $10.14 (round half to even — up)",
        "Verify $10.145 rounds to $10.14 (round half to even — down)",
        "Verify net total is correctly recalculated after rounding"
      ],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: [
        "Custom rounding replaces standard Math.round with banker's rounding",
        "BRE natively supports HALF_EVEN rounding — direct replacement",
        "High confidence: straightforward mathematical function"
      ],
      detailed: [
        { metric: "Lines of QCP code", value: 22, source: "StaticResource" },
        { metric: "Quote lines affected (monthly)", value: 4200, source: "All quote lines" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-custom-rounding"],
        metadataExtracts: { roundingMethod: "HALF_EVEN", decimals: 2 }
      }
    }
  },
  {
    id: "qcp-recursive-subscription",
    name: "QCP_RecursiveSubscriptionCalc",
    sourceType: "QCP_JavaScript",
    sourceCode: `export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve) => {
    const subLines = quoteLineModels.filter(
      l => l.record["SBQQ__SubscriptionType__c"] === "Renewable"
    );
    const parentChildMap = buildHierarchy(subLines);
    subLines.forEach(line => {
      const totalPrice = calculateRecursive(line, parentChildMap, 0);
      line.record["SBQQ__NetPrice__c"] = totalPrice;
    });
    resolve();
  });
}

function buildHierarchy(lines) {
  const map = {};
  lines.forEach(l => {
    const parentId = l.record["Parent_Subscription__c"];
    if (parentId) {
      if (!map[parentId]) map[parentId] = [];
      map[parentId].push(l);
    }
  });
  return map;
}

function calculateRecursive(line, parentChildMap, depth) {
  const basePrice = line.record["SBQQ__ListPrice__c"] || 0;
  const children = parentChildMap[line.record["Id"]] || [];
  let childTotal = 0;
  children.forEach(child => {
    childTotal += calculateRecursive(child, parentChildMap, depth + 1);
  });
  return basePrice + (childTotal * 0.15);
}`,
    businessPurpose: "Recursively calculates subscription pricing based on parent-child subscription hierarchies. Child subscription prices roll up to parent at 15% of child total, creating a hierarchical pricing model for dependent subscriptions.",
    usageSignal: "Active_Or_Referenced",
    complexityScore: 88,
    dependencies: [
      { type: "field", name: "Parent_Subscription__c", reference: "Custom lookup field on Quote Line" },
      { type: "field", name: "SBQQ__SubscriptionType__c", reference: "CPQ managed field" },
      { type: "field", name: "SBQQ__ListPrice__c", reference: "CPQ managed field" }
    ],
    recommendedRcaTarget: "Manual_Design_Required",
    conversionConfidence: "Manual_Review_Required",
    draft: {
      generatedCandidate: `// MANUAL DESIGN REQUIRED
// This recursive pricing pattern has no direct RCA equivalent.
// Recommended approach:
//
// Option A: Iterative Apex Invocable
//   - Flatten the subscription hierarchy into depth-ordered layers
//   - Process bottom-up: calculate leaf nodes first, then roll up
//   - Call from Pricing Procedure via ProcedurePlanOption.ApexClass
//   - Add max-depth guard (recommend: 10 levels)
//
// Option B: Derived Pricing + Asset Hierarchy
//   - Model parent-child as Asset relationships
//   - Use Derived Pricing to calculate child contribution
//   - Limitation: Derived Pricing may not support recursive chains
//
// Option C: Re-architect as flat pricing
//   - If business allows, flatten the hierarchy into explicit line items
//   - Each child subscription has its own independent price
//   - Parent "roll-up" becomes a display-only calculation
//
// Recommended: Option A with depth guard
// Estimated effort: 5-8 development days`,
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "This recursive subscription pricing pattern has no direct declarative equivalent in RCA. The recursive parent-child traversal with roll-up pricing requires a custom architectural solution. Three options are proposed, with the iterative Apex invocable being the recommended approach.",
      targetPatternReasoning: "Recursive calculations cannot be expressed in BRE Expression Sets or Decision Tables, which are acyclic by design. CML constraints are also not appropriate for pricing logic. This requires either a custom Apex invocable with iterative processing or a fundamental re-architecture of the pricing model. Manual design is required to select the right approach.",
      preservedBehavior: [
        "Child subscription prices roll up to parent at 15% rate",
        "Hierarchical pricing model maintained"
      ],
      changedBehavior: [
        "Max recursion depth will be enforced (current QCP has no limit)",
        "Processing order changes from recursive to iterative bottom-up",
        "Cycle detection added to prevent infinite loops"
      ],
      unknowns: [
        "What is the maximum observed hierarchy depth in production?",
        "Can the 15% roll-up rate vary by product family or subscription type?",
        "Are there circular parent-child references in existing data?",
        "Would the business accept a flattened pricing model as an alternative?"
      ],
      requiredTests: [
        "2-level hierarchy: parent + child → parent price includes 15% of child",
        "3-level hierarchy: verify correct bottom-up roll-up",
        "Verify max-depth guard triggers at configured limit",
        "Verify cycle detection prevents infinite loop on circular references",
        "Performance test with 50+ subscription hierarchy"
      ],
      humanReviewRequired: true,
      reviewReasons: [
        "No direct RCA equivalent — requires architectural decision",
        "Multiple implementation approaches with different trade-offs",
        "Current QCP has no depth limit — production data analysis needed",
        "Business stakeholder input required on whether hierarchy can be simplified"
      ]
    },
    evidence: {
      summary: [
        "Recursive subscription pricing with no depth limit or cycle detection",
        "No direct RCA equivalent — manual architectural design required",
        "Both target pattern (Manual_Design_Required) and confidence (Manual_Review_Required) flag this for attention"
      ],
      detailed: [
        { metric: "Lines of QCP code", value: 35, source: "StaticResource" },
        { metric: "Max observed depth", value: 4, source: "QCP execution trace" },
        { metric: "Subscription chains affected", value: 180, source: "Hierarchy analysis" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-recursive-subscription"],
        metadataExtracts: { rollUpRate: 0.15, maxObservedDepth: 4, cycleDetection: false }
      }
    }
  }
];
