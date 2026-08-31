// Apex artifacts (4): 2 triggers, 2 classes
export const apexArtifacts = [
  {
    id: "apex-cost-plus-pricing",
    name: "CPQ_CostPlusPricing",
    sourceType: "Apex_Trigger",
    sourceCode: `trigger CPQ_CostPlusPricing on SBQQ__QuoteLine__c (before update) {
    Set<Id> productIds = new Set<Id>();
    for (SBQQ__QuoteLine__c ql : Trigger.new) {
        productIds.add(ql.SBQQ__Product__c);
    }
    Map<Id, Product2> products = new Map<Id, Product2>(
        [SELECT Id, Cost__c, Product_Family__c FROM Product2
         WHERE Id IN :productIds AND Cost__c != null]
    );
    Map<String, Decimal> marginByFamily = new Map<String, Decimal>{
        'Platform' => 1.30,
        'Add-On' => 1.25,
        'Professional Services' => 1.40,
        'Support' => 1.20
    };
    for (SBQQ__QuoteLine__c ql : Trigger.new) {
        Product2 p = products.get(ql.SBQQ__Product__c);
        if (p != null && p.Cost__c != null) {
            Decimal margin = marginByFamily.containsKey(p.Product_Family__c)
                ? marginByFamily.get(p.Product_Family__c) : 1.25;
            ql.SBQQ__NetPrice__c = p.Cost__c * margin;
        }
    }
}`,
    businessPurpose: "Calculates net price as cost plus a product-family-specific margin. Platform products get 30% margin, Add-Ons 25%, Professional Services 40%, and Support 20%.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 45,
    dependencies: [
      { type: "field", name: "Product2.Cost__c", reference: "Custom cost field on Product" },
      { type: "field", name: "Product2.Product_Family__c", reference: "Product family field" },
      { type: "field", name: "SBQQ__NetPrice__c", reference: "CPQ managed field" }
    ],
    recommendedRcaTarget: "Pricing_Procedure",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: `Pricing Procedure: "PRC_CostPlusMargin_v1"
├── Step 1: Initialize Price (standard price book lookup)
├── Step 2: Retrieve Cost
│   └── Decision Table: DT_ProductCost
│       Source: CostBook = "Standard Costs"
│       Inputs:  Product2Id
│       Output:  UnitCost (Currency)
├── Step 3: Lookup Margin by Product Family
│   └── Decision Table: DT_FamilyMargin
│       Inputs:  Product.Family
│       Output:  MarginMultiplier (Decimal)
│       Rows:
│         Platform             → 1.30
│         Add-On               → 1.25
│         Professional Services → 1.40
│         Support              → 1.20
│         *                    → 1.25
├── Step 4: Apply Margin
│   └── Expression: NetPrice = UnitCost × MarginMultiplier
└── Step 5: Calculate Total`,
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "RCA replaces this Apex trigger with a declarative Pricing Procedure using CostBook for product costs and a Decision Table for family-specific margin multipliers. Zero Apex required.",
      targetPatternReasoning: "Cost-plus pricing maps directly to a Pricing Procedure with CostBook lookup (standard RCA object) and a Decision Table for margin rates. This is a textbook conversion pattern from KB Section 3.2.",
      preservedBehavior: [
        "Cost-plus margin calculation by product family",
        "Margin percentages per family preserved exactly",
        "Default 25% margin for unmapped families"
      ],
      changedBehavior: [
        "Cost data moves from custom Product2.Cost__c field to CostBook standard object",
        "Margin rates move from hardcoded Apex map to maintainable Decision Table",
        "Trigger-based execution replaced by pricing procedure step"
      ],
      unknowns: [
        "Are Cost__c values maintained in a separate system or manually updated?",
        "Should margin rates be editable by business users without a deployment?"
      ],
      requiredTests: [
        "Platform product: verify NetPrice = Cost × 1.30",
        "Professional Services: verify NetPrice = Cost × 1.40",
        "Unknown family: verify default 1.25 multiplier applied",
        "Product with null cost: verify graceful handling"
      ],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Cost-plus Apex trigger → Pricing Procedure + CostBook", "Zero Apex in RCA", "High confidence conversion"],
      detailed: [
        { metric: "Apex trigger lines", value: 22, source: "CPQ_CostPlusPricing trigger" },
        { metric: "Product families with custom margins", value: 4, source: "Code analysis" },
        { metric: "Products with Cost__c populated", value: 310, source: "Product2 query" }
      ],
      raw: { artifactReferences: ["artifact:apex-cost-plus-pricing"], metadataExtracts: { lastModified: "2025-06-20", testCoverage: "85%" } }
    }
  },
  {
    id: "apex-cross-line-validator",
    name: "CPQ_CrossLineDiscountValidator",
    sourceType: "Apex_Class",
    sourceCode: `public class CPQ_CrossLineDiscountValidator {
    public static void validate(List<SBQQ__QuoteLine__c> lines) {
        Decimal totalDiscount = 0;
        Decimal totalRevenue = 0;
        for (SBQQ__QuoteLine__c ql : lines) {
            if (ql.SBQQ__Discount__c != null) {
                totalDiscount += ql.SBQQ__Discount__c;
            }
            totalRevenue += ql.SBQQ__NetTotal__c != null ? ql.SBQQ__NetTotal__c : 0;
        }
        Decimal avgDiscount = lines.size() > 0 ? totalDiscount / lines.size() : 0;
        if (avgDiscount > 30) {
            throw new CPQ_ValidationException(
                'Average discount across all lines (' +
                avgDiscount.setScale(1) + '%) exceeds the 30% cap. ' +
                'Approval required for discounts above this threshold.'
            );
        }
        if (totalRevenue < 1000 && totalDiscount > 0) {
            throw new CPQ_ValidationException(
                'Discounts cannot be applied to quotes under $1,000 total revenue.'
            );
        }
    }
}`,
    businessPurpose: "Validates that the average discount across all quote lines does not exceed 30% and that discounts are not applied to quotes under $1,000 total revenue.",
    usageSignal: "Active_Or_Referenced",
    complexityScore: 58,
    dependencies: [
      { type: "field", name: "SBQQ__Discount__c", reference: "CPQ managed field" },
      { type: "field", name: "SBQQ__NetTotal__c", reference: "CPQ managed field" },
      { type: "object", name: "CPQ_ValidationException", reference: "Custom exception class" }
    ],
    recommendedRcaTarget: "Apex_Invocable_Extension",
    conversionConfidence: "Medium",
    draft: {
      generatedCandidate: `public class RCA_CrossLineDiscountValidator {
    @InvocableMethod(label='Validate Cross-Line Discount')
    public static List<ValidationResult> validate(List<Id> quoteIds) {
        List<ValidationResult> results = new List<ValidationResult>();
        for (Id qId : quoteIds) {
            Decimal totalDiscount = 0;
            Decimal totalRevenue = 0;
            Integer lineCount = 0;
            for (QuoteLineItem qli : [
                SELECT Discount, TotalPrice
                FROM QuoteLineItem WHERE QuoteId = :qId
            ]) {
                totalDiscount += (qli.Discount != null ? qli.Discount : 0);
                totalRevenue += (qli.TotalPrice != null ? qli.TotalPrice : 0);
                lineCount++;
            }
            ValidationResult r = new ValidationResult();
            Decimal avgDiscount = lineCount > 0 ? totalDiscount / lineCount : 0;
            if (avgDiscount > 30) {
                r.isValid = false;
                r.message = 'Average discount (' + avgDiscount.setScale(1) +
                    '%) exceeds 30% cap. Approval required.';
            } else if (totalRevenue < 1000 && totalDiscount > 0) {
                r.isValid = false;
                r.message = 'Discounts cannot be applied to quotes under $1,000.';
            } else {
                r.isValid = true;
                r.message = '';
            }
            results.add(r);
        }
        return results;
    }

    public class ValidationResult {
        @InvocableVariable public Boolean isValid;
        @InvocableVariable public String message;
    }
}`,
      candidateLanguage: "apex",
      plainLanguageExplanation: "Cross-line validation requires Apex because it aggregates data across multiple quote lines — a pattern that BRE Expression Sets don't handle natively. This invocable action is called from a validation Flow or pricing procedure step.",
      targetPatternReasoning: "Cross-line aggregation (average discount, total revenue) has no declarative equivalent in RCA. Summary variables don't exist in RCA, so this must be a custom Apex invocable. Medium confidence because the logic itself is straightforward but the cross-line aggregation pattern requires careful integration.",
      preservedBehavior: [
        "30% average discount cap enforced across all lines",
        "$1,000 minimum revenue threshold for discounts",
        "Validation message includes calculated average"
      ],
      changedBehavior: [
        "Synchronous trigger validation → invocable action called from Flow",
        "Queries QuoteLineItem (standard) instead of SBQQ__QuoteLine__c (managed)",
        "Returns structured result instead of throwing exception"
      ],
      unknowns: [
        "Should the 30% cap be configurable per account segment?",
        "Does this validation run on save only, or during live pricing?"
      ],
      requiredTests: [
        "Quote with average discount 31% → validation failure",
        "Quote with average discount 29% → validation pass",
        "Quote under $1,000 with any discount → validation failure",
        "Quote with zero lines → graceful handling"
      ],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Cross-line discount validation requires Apex invocable", "No declarative cross-line aggregation in RCA"],
      detailed: [
        { metric: "Apex class lines", value: 20, source: "Code analysis" },
        { metric: "Validation triggers per month", value: 2400, source: "Quote save frequency" }
      ],
      raw: { artifactReferences: ["artifact:apex-cross-line-validator"], metadataExtracts: {} }
    }
  },
  {
    id: "apex-amendment-service",
    name: "CPQ_AmendmentService",
    sourceType: "Apex_Class",
    sourceCode: `public class CPQ_AmendmentService {
    public static Id createAmendment(Id contractId) {
        Contract contract = [SELECT Id, StartDate, EndDate,
            SBQQ__RenewalTerm__c, Account.Id
            FROM Contract WHERE Id = :contractId];
        SBQQ__Quote__c amendment = new SBQQ__Quote__c();
        amendment.SBQQ__Type__c = 'Amendment';
        amendment.SBQQ__MasterContract__c = contractId;
        amendment.SBQQ__StartDate__c = Date.today();
        amendment.SBQQ__EndDate__c = contract.EndDate;
        amendment.SBQQ__Account__c = contract.Account.Id;
        insert amendment;
        List<SBQQ__Subscription__c> subs = [
            SELECT Id, SBQQ__Product__c, SBQQ__Quantity__c,
                   SBQQ__NetPrice__c, SBQQ__StartDate__c
            FROM SBQQ__Subscription__c
            WHERE SBQQ__Contract__c = :contractId];
        List<SBQQ__QuoteLine__c> lines = new List<SBQQ__QuoteLine__c>();
        for (SBQQ__Subscription__c sub : subs) {
            SBQQ__QuoteLine__c ql = new SBQQ__QuoteLine__c();
            ql.SBQQ__Quote__c = amendment.Id;
            ql.SBQQ__Product__c = sub.SBQQ__Product__c;
            ql.SBQQ__Quantity__c = sub.SBQQ__Quantity__c;
            ql.SBQQ__NetPrice__c = calculateProration(
                sub.SBQQ__NetPrice__c, Date.today(), contract.EndDate);
            lines.add(ql);
        }
        insert lines;
        return amendment.Id;
    }

    private static Decimal calculateProration(Decimal price, Date start, Date endDt) {
        Integer totalDays = start.daysBetween(endDt);
        Integer remainingDays = Date.today().daysBetween(endDt);
        if (totalDays <= 0) return price;
        return (price * remainingDays) / totalDays;
    }
}`,
    businessPurpose: "Creates amendment quotes from contracts by copying existing subscription lines and applying manual daily proration for the remaining contract period.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 72,
    dependencies: [
      { type: "object", name: "Contract", reference: "Standard Contract object" },
      { type: "object", name: "SBQQ__Subscription__c", reference: "CPQ managed object" },
      { type: "object", name: "SBQQ__Quote__c", reference: "CPQ managed object" }
    ],
    recommendedRcaTarget: "Declarative_Configuration",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: `// RCA: Zero custom Apex required.
// Use Transaction Management: Initiate Amendment Action
//
// Option A: Flow (recommended for demo)
//   1. Flow trigger: User clicks "Amend" on Contract/Asset record
//   2. Invocable Action: commerceesb.AmendAsset
//      Input: AssetId (the asset to amend)
//   3. Platform automatically:
//      - Creates new asset version (old → Superseded, new → Active)
//      - Generates AssetAction (type = Amend)
//      - Calculates prorated billing adjustments
//      - Creates credit memo for prepaid unused period
//
// Option B: Connect API (for headless/integration scenarios)
//   ConnectApi.CommerceOrders.amendAsset(assetId);
//
// Configuration:
//   BillingTreatment.ProrationPolicy = 'DailyProration'
//   (matches current daily proration behavior)
//
// Co-termination: Configure at Contract level
//   Contract.CoTerminationDate = contract end date`,
      candidateLanguage: "pseudocode",
      plainLanguageExplanation: "RCA's Transaction Management handles amendment creation, subscription line copying, proration, and co-termination natively. The entire 127-line Apex service is replaced by a single invocable action call with ProrationPolicy configuration.",
      targetPatternReasoning: "Amendment logic is the canonical example of CPQ Apex → RCA declarative replacement. Transaction Management's Initiate Amendment Action handles everything this Apex class does manually. ProrationPolicy configuration replaces the custom proration calculation.",
      preservedBehavior: [
        "Amendment creates from existing contract/asset",
        "Existing subscription lines are copied to the amendment",
        "Daily proration applied for remaining period",
        "Co-termination aligns amendment end date with contract"
      ],
      changedBehavior: [
        "127 lines of Apex → single invocable action (zero code)",
        "Manual proration calculation → BillingTreatment.ProrationPolicy = DailyProration",
        "Quote-centric model → asset-lifecycle model (AssetAction + AssetStatePeriod)",
        "Credit memos generated automatically for prepaid unused periods"
      ],
      unknowns: [
        "Does DailyProration exactly match the custom proration calculation for all edge cases?",
        "Are there amendment scenarios with partial line amendments (not all subs)?",
        "How should the UI surface the amendment flow to end users?"
      ],
      requiredTests: [
        "Mid-term amendment: verify proration matches current Apex calculation",
        "Verify AssetAction (type=Amend) is created",
        "Verify credit memo generated for prepaid period",
        "End-of-term amendment: verify no proration applied"
      ],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["127 lines of amendment Apex → single invocable action", "Textbook CPQ-to-RCA conversion", "High confidence"],
      detailed: [
        { metric: "Apex lines", value: 127, source: "CPQ_AmendmentService.cls" },
        { metric: "Monthly amendments", value: 85, source: "Quote query" },
        { metric: "Proration method", value: "Daily", source: "Code analysis" }
      ],
      raw: { artifactReferences: ["artifact:apex-amendment-service"], metadataExtracts: { className: "CPQ_AmendmentService", lastModified: "2025-08-14" } }
    }
  },
  {
    id: "apex-approval-routing",
    name: "CPQ_ApprovalRouting",
    sourceType: "Apex_Trigger",
    sourceCode: `trigger CPQ_ApprovalRouting on SBQQ__Quote__c (before update) {
    for (SBQQ__Quote__c q : Trigger.new) {
        SBQQ__Quote__c oldQ = Trigger.oldMap.get(q.Id);
        if (q.SBQQ__Status__c == 'Pending Approval' &&
            oldQ.SBQQ__Status__c != 'Pending Approval') {
            Decimal maxDiscount = 0;
            Decimal dealSize = q.SBQQ__NetAmount__c != null ? q.SBQQ__NetAmount__c : 0;
            for (SBQQ__QuoteLine__c ql : [
                SELECT SBQQ__Discount__c FROM SBQQ__QuoteLine__c
                WHERE SBQQ__Quote__c = :q.Id
            ]) {
                if (ql.SBQQ__Discount__c != null && ql.SBQQ__Discount__c > maxDiscount) {
                    maxDiscount = ql.SBQQ__Discount__c;
                }
            }
            if (dealSize > 200000 || maxDiscount > 25) {
                q.Approval_Level__c = 'VP';
            } else if (dealSize > 50000 || maxDiscount > 15) {
                q.Approval_Level__c = 'Manager';
            } else {
                q.Approval_Level__c = 'Standard';
            }
        }
    }
}`,
    businessPurpose: "Routes quote approvals to the appropriate level based on deal size and maximum line discount. VP approval required for deals over $200K or discounts above 25%.",
    usageSignal: "Confirmed_Usage",
    complexityScore: 38,
    dependencies: [
      { type: "field", name: "SBQQ__Status__c", reference: "CPQ managed field" },
      { type: "field", name: "SBQQ__NetAmount__c", reference: "CPQ managed field" },
      { type: "field", name: "Approval_Level__c", reference: "Custom field on Quote" }
    ],
    recommendedRcaTarget: "Declarative_Configuration",
    conversionConfidence: "High",
    draft: {
      generatedCandidate: `{
  "approvalWorkflow": "Quote_Approval_Routing",
  "description": "RCA Advanced Approvals declarative configuration",
  "steps": [
    {
      "name": "VP_Approval",
      "condition": "Quote.NetAmount > 200000 OR MAX(QuoteLineItem.Discount) > 25",
      "approver": { "type": "Role", "value": "VP_Sales" },
      "order": 1
    },
    {
      "name": "Manager_Approval",
      "condition": "Quote.NetAmount > 50000 OR MAX(QuoteLineItem.Discount) > 15",
      "approver": { "type": "Role", "value": "Sales_Manager" },
      "order": 2
    },
    {
      "name": "Standard_Approval",
      "condition": "ELSE",
      "approver": { "type": "Queue", "value": "Deal_Desk" },
      "order": 3
    }
  ],
  "submissionObject": "ApprovalSubmission",
  "workItemObject": "ApprovalWorkItem"
}`,
      candidateLanguage: "json",
      plainLanguageExplanation: "RCA Advanced Approvals replaces this custom Apex trigger with declarative approval workflows using ApprovalSubmission and ApprovalWorkItem objects. The threshold-based routing logic is configured as workflow steps with conditions — no code required.",
      targetPatternReasoning: "Quote approval routing is a core use case for RCA Advanced Approvals, which is included at no additional license cost. The threshold-based logic (deal size, max discount) maps directly to approval workflow conditions.",
      preservedBehavior: [
        "VP approval for deals > $200K or max discount > 25%",
        "Manager approval for deals > $50K or max discount > 15%",
        "Standard approval for all other quotes"
      ],
      changedBehavior: [
        "Custom Apex trigger → declarative approval workflow",
        "Custom Approval_Level__c field → native ApprovalWorkItem routing",
        "No license cost for Advanced Approvals in RCA (vs. CPQ managed package)"
      ],
      unknowns: [
        "Are there additional approval criteria beyond deal size and discount?",
        "Should approvals support delegation and out-of-office routing?"
      ],
      requiredTests: [
        "$250K deal → VP approval triggered",
        "Deal with 30% max discount → VP approval triggered",
        "$75K deal with 10% discount → Manager approval",
        "$10K deal with 5% discount → Standard approval"
      ],
      humanReviewRequired: false,
      reviewReasons: []
    },
    evidence: {
      summary: ["Apex approval routing → native Advanced Approvals", "No additional license cost", "Declarative threshold configuration"],
      detailed: [
        { metric: "Apex trigger lines", value: 24, source: "CPQ_ApprovalRouting trigger" },
        { metric: "Monthly approvals", value: 340, source: "ApprovalRequest query" },
        { metric: "Approval levels", value: 3, source: "Code analysis" }
      ],
      raw: { artifactReferences: ["artifact:apex-approval-routing"], metadataExtracts: {} }
    }
  }
];
