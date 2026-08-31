export const loeEstimate = {
  tier: "High",
  weeksLow: 22,
  weeksHigh: 32,
  confidence: "Medium",
  confidenceLimitingFactors: [
    "Missing admin validation of pricing logic intent",
    "Legacy provisioning integration lacks documented API contract",
    "Historical data migration scope not yet validated with finance"
  ],
  primaryDrivers: [
    "Custom QCP and Apex pricing logic depth",
    "Legacy provisioning integration translation",
    "Cross-line aggregation logic requiring Apex invocables",
    "Bundle complexity in product catalog"
  ],
  suggestedPhases: [
    {
      name: "Discovery & Validation",
      durationWeeks: { low: 3, high: 4 },
      description: "Validate pricing logic intent with CPQ admin, map integrations, audit deprecated config, document provisioning API"
    },
    {
      name: "Foundation Setup",
      durationWeeks: { low: 4, high: 6 },
      description: "PCM catalog migration, BRE/Context Service setup, base pricing procedures, CML constraint models"
    },
    {
      name: "Migration Build",
      durationWeeks: { low: 8, high: 12 },
      description: "Pricing procedures from QCP/price rules, CML constraints from product rules, custom Apex invocables for summary variables, amendment flow configuration"
    },
    {
      name: "Integration & Data",
      durationWeeks: { low: 4, high: 6 },
      description: "NetSuite ERP re-integration, Avalara tax adapter, Stripe/Billing evaluation, asset migration with AssetAction/AssetStatePeriod records"
    },
    {
      name: "UAT & Hypercare",
      durationWeeks: { low: 3, high: 4 },
      description: "User acceptance testing, pricing validation, sales rep training, go-live support, post-launch monitoring"
    }
  ],
  sowCaveats: [
    "Pricing procedure design assumes validated pricing logic intent — variance triggers change order",
    "Legacy provisioning integration scoped pending API documentation review",
    "Historical data migration limited to active subscriptions only"
  ],
  changeOrderRisks: [
    "Discovery of additional QCP scripts not surfaced in initial assessment",
    "Pricing logic intent diverges from observed behavior",
    "Provisioning system requires bespoke integration work"
  ],
  disclaimer: "Demo heuristic. Requires validation by delivery lead before SOW commitment."
};
