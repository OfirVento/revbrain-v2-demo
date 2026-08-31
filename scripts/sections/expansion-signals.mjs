export const expansionSignals = [
  {
    module: "DRO",
    triggerCondition: "Outbound integration to undocumented legacy provisioning system with manual post-order handoff",
    consultativeFraming: "Dynamic Revenue Orchestrator may be relevant if you're looking to automate the handoff between order activation and your provisioning system — it can orchestrate external callouts with dependency management, retry logic, and jeopardy rules.",
    confidence: "Medium",
    evidence: {
      summary: [
        "Legacy provisioning system receives outbound calls after order activation",
        "Manual handoff process between sales ops and infrastructure team",
        "3.2% error rate on provisioning calls indicates fragile integration"
      ],
      detailed: [
        { metric: "Monthly provisioning handoffs", value: 1200, source: "Outbound callout logs" },
        { metric: "Provisioning error rate", value: "3.2%", source: "Callout error logs" },
        { metric: "Manual intervention incidents (monthly)", value: 38, source: "Case query" }
      ],
      raw: {
        artifactReferences: ["artifact:qcp-tax-callout"],
        metadataExtracts: { provisioningEndpoint: "https://internal-provisioning.techflow.io/api/v1" }
      }
    }
  },
  {
    module: "Billing",
    triggerCondition: "Stripe payment integration with manual reconciliation between Salesforce billing data and external payment processor",
    consultativeFraming: "Revenue Cloud Billing may be relevant if you want to consolidate invoicing and payment processing inside Salesforce — eliminating the manual reconciliation between Stripe and your CRM that currently consumes 24 hours per month.",
    confidence: "Medium",
    evidence: {
      summary: [
        "Stripe processes payments but billing data is manually re-keyed into Salesforce",
        "24 hours per month spent on manual reconciliation",
        "6 billing discrepancies per month between systems"
      ],
      detailed: [
        { metric: "Monthly Stripe transactions", value: 890, source: "Stripe integration logs" },
        { metric: "Manual reconciliation hours", value: 24, source: "Finance team estimate" },
        { metric: "Monthly discrepancies", value: 6, source: "Reconciliation report" }
      ],
      raw: {
        artifactReferences: [],
        metadataExtracts: { currentProcessor: "Stripe", integrationPattern: "Outbound API + manual CSV reconciliation" }
      }
    }
  },
  {
    module: "Advanced_Approvals",
    triggerCondition: "Custom Apex approval routing trigger with multi-level threshold logic spanning 3 approval levels",
    consultativeFraming: "RCA Advanced Approvals may be relevant as a no-cost replacement for your current custom Apex approval routing — it provides native multi-step workflows with threshold-based triggers, parallel and sequential paths, and delegation support.",
    confidence: "High",
    evidence: {
      summary: [
        "Custom Apex trigger implements 3-level approval chain based on discount and deal size thresholds",
        "RCA Advanced Approvals is included at no additional license cost",
        "Declarative configuration replaces custom Apex maintenance burden"
      ],
      detailed: [
        { metric: "Approval levels", value: 3, source: "Approval process config" },
        { metric: "Monthly approval submissions", value: 340, source: "ApprovalRequest query" },
        { metric: "Custom Apex lines for approval logic", value: 89, source: "CPQ_ApprovalRouting trigger" }
      ],
      raw: {
        artifactReferences: ["artifact:apex-approval-routing"],
        metadataExtracts: { currentImplementation: "Custom Apex trigger on SBQQ__Quote__c" }
      }
    }
  },
  {
    module: "Revenue_Recognition",
    triggerCondition: "Manual ASC 606 revenue recognition calculations performed in spreadsheets by finance team",
    consultativeFraming: "Revenue Recognition may be relevant if your finance team is spending significant time on manual rev rec calculations — it automates ASC 606 and IFRS 15 compliant revenue schedules, treatments, and GL distributions.",
    confidence: "Medium",
    evidence: {
      summary: [
        "Finance team manually manages revenue recognition in Excel spreadsheets",
        "Multi-element arrangements require standalone selling price allocation",
        "120 hours annually spent on audit preparation for rev rec"
      ],
      detailed: [
        { metric: "Monthly manual rev rec entries", value: 180, source: "Finance team" },
        { metric: "Multi-element arrangements", value: 45, source: "Contract analysis" },
        { metric: "Annual audit prep hours", value: 120, source: "Finance team" }
      ],
      raw: {
        artifactReferences: [],
        metadataExtracts: { complianceStandard: "ASC 606" }
      }
    }
  },
  {
    module: "Agentforce",
    triggerCondition: "Sales team lacks AI-assisted pricing guidance — 60% of deals require manual manager intervention for pricing decisions",
    consultativeFraming: "Agentforce for Revenue Management may be relevant in a future phase if you're exploring AI-driven pricing recommendations and deal intelligence — it provides pre-built agents for pricing analysis, contract review, and anomaly detection.",
    confidence: "Low",
    evidence: {
      summary: [
        "60% of deals require manager guidance for pricing decisions",
        "No AI or automated deal scoring currently in place",
        "Agentforce deployment would be a future-phase initiative"
      ],
      detailed: [
        { metric: "Deals needing manager pricing input", value: "60%", source: "Sales manager estimate" },
        { metric: "Pricing override rate", value: "34%", source: "Quote line analysis" },
        { metric: "Current Agentforce adoption", value: "None", source: "Org feature scan" }
      ],
      raw: {
        artifactReferences: [],
        metadataExtracts: { aiReadiness: "Low", timeline: "Future phase" }
      }
    }
  }
];
