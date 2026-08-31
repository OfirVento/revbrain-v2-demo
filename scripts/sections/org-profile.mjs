export const orgProfile = {
  edition: "Enterprise",
  cpqVersion: "Spring '25 Managed Package",
  activeUsers: 180,
  dataVolume: {
    products: 340,
    activeQuotes: 2400,
    historicalQuotes: 38000,
    activeContracts: 1200,
    activeSubscriptions: 3600
  },
  integrations: [
    { name: "NetSuite", type: "erp", direction: "bidirectional" },
    { name: "Avalara", type: "tax", direction: "outbound" },
    { name: "Stripe", type: "billing", direction: "outbound" },
    { name: "Legacy Provisioning System", type: "other", direction: "outbound" }
  ]
};
