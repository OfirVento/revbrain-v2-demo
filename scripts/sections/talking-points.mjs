export const salesTalkingPoints = [
  {
    context: "discovery_call",
    point: "We've already mapped your 7 QCP scripts and 47 price rules to their RCA equivalents — most go declarative via Pricing Procedures, which gives your finance team full price waterfall transparency.",
    supportingData: "5 of 7 QCP scripts map to Pricing Procedures with High confidence. 2 require custom Apex invocable hooks. 47 price rules consolidate into ~8 pricing procedure steps."
  },
  {
    context: "discovery_call",
    point: "Your 100-line amendment Apex service becomes a single invocable action in RCA. That's not just a migration — it's eliminating a maintenance liability.",
    supportingData: "CPQ_AmendmentService.cls: 127 lines of custom proration and co-termination logic. RCA's commerceesb.AmendAsset handles this natively with automatic proration and asset versioning."
  },
  {
    context: "sow_review",
    point: "We recommend a 22–32 week timeline across 5 phases, with the largest variable being the pricing logic validation in Discovery and the provisioning integration scope in Phase 4.",
    supportingData: "LOE tier: High. Confidence: Medium. Two primary limiting factors: pricing logic intent validation and undocumented provisioning API. Discovery phase (3-4 weeks) is designed to de-risk both."
  },
  {
    context: "sow_review",
    point: "The SOW includes three explicit caveats: pricing procedure design assumes validated intent, provisioning integration is scoped pending API docs, and historical data migration is limited to active subscriptions.",
    supportingData: "3 change order risks identified: undiscovered QCP scripts, pricing intent divergence, and bespoke provisioning integration work. Each has a mitigation plan in the Discovery phase."
  },
  {
    context: "executive_meeting",
    point: "Moving to Revenue Cloud Advanced unlocks capabilities your current CPQ can't provide: server-side pricing at scale, full price waterfall audit trails, and native asset lifecycle management.",
    supportingData: "Current CPQ: browser-side QCP with 8 monthly timeout incidents on large quotes. RCA: server-side BRE pricing with headless API support. Price waterfall provides step-by-step pricing transparency finance has been requesting."
  },
  {
    context: "executive_meeting",
    point: "The assessment identifies 5 expansion opportunities beyond core migration — DRO for provisioning automation, Billing consolidation, native Advanced Approvals, Revenue Recognition, and Agentforce.",
    supportingData: "3 expansion signals triggered by current org patterns (DRO, Billing, Advanced Approvals). 2 additional future-phase candidates (Revenue Recognition, Agentforce). Advanced Approvals alone saves the CPQ managed package license cost."
  },
  {
    context: "salesforce_handoff",
    point: "This account shows strong expansion signals for DRO, Billing, and Advanced Approvals — all triggered by patterns we found in the assessment, not speculative.",
    supportingData: "DRO: legacy provisioning with 1,200 monthly handoffs and 3.2% error rate. Billing: Stripe with 24 hrs/month manual reconciliation. Advanced Approvals: custom Apex trigger replaceable by native feature at no extra cost."
  },
  {
    context: "salesforce_handoff",
    point: "Revenue Cloud readiness verdict is 'Proceed with Caution' — the migration path is clear but pricing logic depth requires a validation phase before SOW commitment.",
    supportingData: "Complexity: 68/100 (Medium-High). 20 code artifacts analyzed, 12 with High conversion confidence. Largest risk: 7 QCP scripts with pricing logic that must be validated against business intent."
  }
];
