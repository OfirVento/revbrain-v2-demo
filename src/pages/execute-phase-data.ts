import { ALL_ITEMS, type ScopeItem } from './scope-phases-data';

export interface PhaseConfig {
  num: number; title: string; effort: string; time: string; itemIds: string[];
  summary: string; dataMigration: string; implPlan: string; learningFeedback: string;
}

export const PHASES: PhaseConfig[] = [
  { num: 1, title: 'Active Quoting', effort: 'Medium', time: '0–4 weeks', itemIds: ['MIG-005','MIG-006','MIG-007','MIG-008','MIG-009','MIG-021','MIG-022','MIG-023','MIG-024','MIG-025'],
    summary: 'Phase 1 — Active Quoting. 5 artifacts mapped to ARM. 2 protected Apex classes (Q2CBundleSpecific, SmartBytes Selection Core). 3 Flow/Custom Metadata combinations. Estimated effort: Medium. Duration: 0–4 weeks. Architect attention items: SmartBytes filter rule edge case validation. Deployment sequence respects Q1 renewal window.',
    dataMigration: 'Phase 1 does not migrate historical data. Active quoting only. New quotes flow through ARM from cutover date. Existing contracts remain in legacy CPQ and migrate via "Renewal Flip" automation in Phase 2 as they renew. No data parity validation required for Phase 1.',
    implPlan: 'Week 1: Sandbox setup, OAuth, service account configuration. Week 2: Generate ARM drafts for all 5 artifacts, architect review. Week 3: Deploy to sandbox, test scenarios, side-by-side validation against current CPQ. Week 4: UAT with Sales team, production cutover preparation. Architect approval gate before Phase 2.',
    learningFeedback: 'Architect feedback during Phase 1 deployment feeds the Learning Engine. Patterns identified — SmartBytes filter edge cases, bundle pricing cascade — propagate to similar customer orgs in subsequent migrations. Feedback loop: every architect decision improves AI recommendations across the AllCloud customer base.' },
  { num: 2, title: 'Renewals', effort: 'Medium-High', time: '4–9 weeks', itemIds: ['MIG-010','MIG-011','MIG-012','MIG-013','MIG-026','MIG-027','MIG-028'],
    summary: 'Phase 2 — Renewals. 4 artifacts mapped to ARM. Renewal QCP handling (Q2CLegacyqcp) is the highest-risk item due to proration edge cases. PowerSlide Server Selection and ExampleProductSearchPlugin extend renewal product lookup. Set Twinned Fields provides declarative field mapping. Dependencies on Phase 1 product/pricing model.',
    dataMigration: 'Phase 2 introduces "Renewal Flip" — as contracts from Phase 1 come up for renewal, they renew through ARM instead of legacy CPQ. No bulk data migration. Renewals processed through new flow from renewal date forward. Legacy renewal records remain in CPQ for audit trail.',
    implPlan: 'Week 5: Generate ARM drafts for renewal artifacts, architect review of proration edge cases. Week 6: Deploy to sandbox, run renewal test scenarios including mid-term amendments. Week 7–8: Parallel run — renewals process in both CPQ and ARM for 2-week validation window. Week 9: Cut over renewal flow, decommission CPQ renewal path.',
    learningFeedback: 'Proration edge cases identified in Phase 2 are the highest-value learning inputs. Custom validation patterns for mid-term amendments and partial renewals feed the pattern library for future Salesforce CPQ migrations with similar renewal complexity.' },
  { num: 3, title: 'Data Migration', effort: 'High', time: '9–14 weeks', itemIds: ['MIG-014','MIG-015','MIG-016','MIG-017','MIG-029','MIG-030','MIG-031'],
    summary: 'Phase 3 — Data Migration. 4 artifacts handling historical record migration. DataMapHistoricalQuotes is Very High complexity — 8,140 records with cross-currency conversion. ValidateQuoteRecords provides sample-based parity checks. Asset Bridge Adapter enables co-existence. CFO-flagged audit trail continuity is the primary risk.',
    dataMigration: 'Phase 3 is the core data migration phase. 8,140 historical quote records migrated with currency conversion (5 currencies). 10% sample validation before full migration. Audit trail continuity preserved per CFO requirement. Asset Bridge Adapter maintains co-existence during parallel running period.',
    implPlan: 'Week 9–10: Currency Conversion Map validation, DataMapHistoricalQuotes batch job development, 10% sample migration. Week 11: Full migration run, ValidateQuoteRecords parity checks. Week 12: Asset Bridge Adapter deployment for co-existence. Week 13–14: Finance/audit sign-off, bridge period monitoring.',
    learningFeedback: 'Data migration patterns — currency conversion rules, audit trail preservation strategies, sample validation methodologies — are high-value reusable assets. These patterns apply directly to any Salesforce CPQ customer with multi-currency historical data.' },
  { num: 4, title: 'Legacy Cleanup', effort: 'Variable', time: '14–18 weeks', itemIds: ['MIG-018','MIG-019','MIG-020','MIG-032','MIG-033','MIG-034','MIG-035'],
    summary: 'Phase 4 — Legacy Cleanup. 3 artifacts for decommissioning. Legacy Org Audit Script identifies orphaned components. Permission Set Cleanup consolidates 16 permission sets to 8. Orphan Feature Removal eliminates 39 features. Variable effort depends on Vector Systems data retention policy decisions.',
    dataMigration: 'Phase 4 does not migrate data — it cleans up. Decommission Asset Bridge Adapter from Phase 3. Archive legacy CPQ configuration. Ensure all audit trail requirements met before final cleanup. Data retention policy determines which historical records remain accessible.',
    implPlan: 'Week 14–15: Run Legacy Org Audit Script, generate cleanup manifest. Week 16: Permission Set Cleanup — staged rollout by team. Week 17: Orphan Feature Removal in batches of 10. Week 18: Final validation, decommission bridge, archive legacy CPQ org.',
    learningFeedback: 'Cleanup patterns — permission set consolidation ratios, orphan detection accuracy, safe decommission sequences — feed the cleanup playbook. Learning from Vector Systems cleanup informs future migration customers with similar org complexity.' },
];

const itemMap = new Map(ALL_ITEMS.map((i) => [i.id, i]));
export function getItem(id: string): ScopeItem | undefined { return itemMap.get(id); }

export const SOURCE_SNIPPETS: Record<string, string> = {
  'MIG-005': `global class Q2CBundleSpecific implements SBQQ.QCPPlugin2 {

  // SmartBytes bundle-aware pricing — active in 47% of quotes
  global void onBeforePriceRules(QuoteLineContext ctx) {
    if (ctx.product.Family == 'SmartBytes') {
      applyFilterRule(ctx);
      calculateBundlePrice(ctx);
    }
  }

  // 2024 filter rule — controls product visibility per profile
  private void applyFilterRule(QuoteLineContext ctx) {
    List<FilterCriteria> filters = getActiveFilters();
    for (FilterCriteria f : filters) {
      if (!f.evaluate(ctx.userProfile)) {
        ctx.exclude(f.productId);
      }
    }
  }

  // 3-tier discount cascade — see Multi Intel Asset Discount Rule
  private void calculateBundlePrice(QuoteLineContext ctx) {
    Decimal basePrice = ctx.getBasePrice();
    Decimal discount = DiscountEngine.cascade(ctx);
    ctx.setNetPrice(basePrice - discount);
  }

  // Security ops feature filtering
  private List<FilterCriteria> getActiveFilters() {
    return [SELECT Criteria__c, ProductId__c
            FROM FilterRule__mdt
            WHERE IsActive__c = true];
  }
}`,
  'MIG-006': `// Custom Metadata: Multi_Intel_Discount__mdt
tierDiscounts = [
  { min: 1, max: 10, pct: 5 },
  { min: 11, max: 50, pct: 12 },
  { min: 51, max: null, pct: 18 }
];
// Applied via cascade in Q2CBundleSpecific`,
  'MIG-007': `// Flow: Approval_Threshold_Lookup
// Reads Custom Metadata: Threshold_Values__mdt
if (deal.value > threshold.Level1) {
  route("Manager");
} else if (deal.value > threshold.Level2) {
  route("Director");
} else if (deal.value > threshold.Level3) {
  route("VP");
}`,
  'MIG-008': `// Custom Metadata: Approval_Level__mdt
regionMap = {
  "APAC": "L2", "EMEA": "L3", "AMER": "L1"
};`,
  'MIG-009': `// Flow: SmartBytes_Selection
eligibleProducts = catalog.filter(p =>
  p.Family == 'SmartBytes' &&
  userProfile.hasAccess(p) &&
  filterRule.evaluate(p)
);
// Drives 47% of recent quote volume`,
};

export const DRAFT_SNIPPETS: Record<string, string> = {
  'MIG-005': `public class Q2CBundleSpecific_ARM {

  @InvocableMethod(label='Bundle Pricing')
  public static List<Result> execute(List<Request> reqs) {
    for (Request req : reqs) {
      // BRE Expression Set replaces filter rule
      ExpressionSet es = new ExpressionSet('SmartBytes_Filter');
      es.evaluate(req.context);

      // Pricing Procedure replaces manual calc
      PricingProcedure pp = new PricingProcedure('BundlePrice');
      pp.setInput(req.quoteLines);
      req.result = pp.execute();
    }
    return results;
  }

  // Cascade discount preserved as Apex — Flow alternative
  // rejected due to tier complexity (see Test Scenario 2)
  private static Decimal applyCascade(Context ctx) {
    List<Tier__mdt> tiers = Tier__mdt.getAll().values();
    tiers.sort();
    Decimal discount = 0;
    for (Tier__mdt t : tiers) {
      if (ctx.assetCount >= t.Min__c) discount = t.Pct__c;
    }
    return ctx.basePrice * (discount / 100);
  }
}`,
  'MIG-006': `// ARM Custom Metadata: Multi_Intel_Discount__mdt
// Direct 1:1 mapping — tier structure preserved
// Referenced by Pricing Procedure: BundlePrice`,
  'MIG-007': `// ARM Flow: Approval_Routing_v2
// Maps to ARM Advanced Approvals matrix
// Threshold values preserved in Custom Metadata`,
  'MIG-008': `// ARM Custom Metadata: Approval_Level__mdt
// Direct 1:1 mapping to ARM approval matrix`,
  'MIG-009': `// ARM Flow: SmartBytes_Product_Selection
// Uses BRE Expression Set for filter logic
// Composable product model replaces rigid bundles`,
};

export const OUTPUT_TYPES: Record<string, string> = {
  'MIG-005': 'Apex (protected layer)', 'MIG-006': 'Custom Metadata', 'MIG-007': 'Flow + Custom Metadata',
  'MIG-008': 'Custom Metadata', 'MIG-009': 'Flow + Custom Metadata',
  'MIG-010': 'Apex invocable action', 'MIG-011': 'Flow + Custom Metadata', 'MIG-012': 'Custom Metadata',
  'MIG-013': 'Apex invocable action', 'MIG-014': 'Apex batch job', 'MIG-015': 'Flow',
  'MIG-016': 'Apex', 'MIG-017': 'Custom Metadata', 'MIG-018': 'Apex', 'MIG-019': 'Custom Metadata',
  'MIG-020': 'Custom Metadata', 'MIG-021': 'Apex (protected layer)', 'MIG-022': 'Apex',
  'MIG-023': 'Apex', 'MIG-024': 'Apex', 'MIG-025': 'Flow',
  'MIG-026': 'Apex (Scheduled Job)', 'MIG-027': 'Flow', 'MIG-028': 'Apex',
  'MIG-029': 'Apex (migration tool)', 'MIG-030': 'Apex', 'MIG-031': 'Custom Metadata',
  'MIG-032': 'Apex (utility)', 'MIG-033': 'Apex', 'MIG-034': 'Apex', 'MIG-035': 'Custom Metadata',
  'MIG-036': 'Custom Metadata',
};

export const TEST_RESULTS: Record<string, string[]> = {
  'MIG-005': ['Standard bundle pricing', 'Edge-case discount cascade', 'Multi-currency conversion', 'Approval threshold'],
  'MIG-006': ['Single-tier discount', 'Tier boundary transitions', 'Max discount cap'],
  'MIG-007': ['Below-threshold auto-approve', 'Manager-level routing', 'Director-level routing', 'VP override'],
  'MIG-008': ['APAC region routing', 'EMEA region routing', 'Unknown region fallback'],
  'MIG-009': ['Standard product selection', 'Profile-restricted selection', 'Filter rule edge cases', 'Empty catalog'],
  'MIG-021': ['Standard cap validation', 'Cascade cap check', 'Regional override', 'Manual override bypass'],
  'MIG-022': ['Standard increment', 'Parallel creation', 'Year rollover', 'Regional prefix'],
  'MIG-026': ['90-day flag', 'Duplicate prevention', 'High-volume batch', 'Notification routing'],
  'MIG-029': ['Single-currency reconciliation', 'Multi-currency reconciliation', 'Edge case variance', 'Audit log generation'],
  'MIG-032': ['Permission set parity', 'Apex version check', 'Custom metadata sync', 'Drift detection'],
};

export const CONTEXT_LINES: Record<string, string> = {
  'MIG-005': 'Active in Deal Desk operations · 11-14 ops/week · validated against 2024 SmartBytes volume',
  'MIG-006': 'Multi-asset discount cascade · 3 tiers · feeds Q2CBundleSpecific',
  'MIG-007': 'Approval routing flow · configurable thresholds · 4-tier system',
  'MIG-008': 'Region-to-approval mapping · simple lookup · no custom logic',
  'MIG-009': 'SmartBytes selection orchestrator · 47% of recent volume · depends on filter rule',
  'MIG-021': 'Discount cap validation · ~8 ops/week · Deal Desk approval flow',
  'MIG-022': 'Quote numbering · regional prefix · yearly reset',
  'MIG-026': 'Renewal reminders · ~340 contracts/Q1 · scheduled batch',
  'MIG-029': 'Discount reconciliation · ASC 606 compliance · audit trail',
  'MIG-032': 'Sandbox validation · pre-deployment gate · drift detection',
};

export const BUSINESS_LOGIC: Record<string, string> = {
  'MIG-005': 'Q2CBundleSpecific enforces bundle-aware pricing logic with security operations feature filtering. Active in Deal Desk operations 11-14 times per week. Validated against 2024 SmartBytes launch volume. The 3-tier discount cascade for SmartBytes products requires the filter rule embedded in this script — without it, ~47% of Q1 quote volume calculates pricing incorrectly.',
  'MIG-006': 'Tiered discount schedule for multi-asset deals. Three tiers based on asset count with progressive discounts applied via cascade in Q2CBundleSpecific.',
  'MIG-007': 'Approval routing flow checking deal value against configurable thresholds. Routes to Manager, Director, or VP based on deal size.',
  'MIG-008': 'Simple region-to-approval-level mapping. No custom logic — direct lookup.',
  'MIG-009': 'Core product selection orchestrator for SmartBytes line. Applies user profile filtering and the 2024 filter rule to determine eligible products.',
};

export const MIGRATION_NOTES: Record<string, string> = {
  'MIG-005': 'Target output: Apex (protected layer). Maintained: code-only (stable behavior — admin team not required to modify). The cascade logic is preserved as protected Apex because Flow-based alternatives can\'t handle the conditional discount tiers without significant complexity. Test scenario 2 specifically validates this edge case.',
  'MIG-006': 'Target output: Custom Metadata in ARM Pricing Procedure. Direct mapping — tier structure preserved.',
  'MIG-007': 'Target output: Flow + Custom Metadata. Maps to ARM Advanced Approvals matrix.',
  'MIG-008': 'Target output: Custom Metadata. Direct 1:1 mapping to ARM approval matrix.',
  'MIG-009': 'Target output: Flow + BRE Expression Set. Central piece of SmartBytes migration.',
};

export const TEST_DESCRIPTIONS: Record<string, string[]> = {
  'MIG-005': [
    'Standard bundle pricing — validates baseline behavior with SmartBytes line items, no discounts applied',
    'Edge-case discount cascade — confirms 3-tier discount sequence applies correctly to SmartBytes filtered products',
    'Multi-currency conversion — verifies discounted pricing across all 5 currencies (AUD/GBP/EUR/NZD/USD)',
    'Approval threshold — ensures discounted total triggers Deal Desk approval at correct threshold',
  ],
  'MIG-006': ['Single-tier discount validation', 'Tier boundary transition check', 'Max discount cap enforcement'],
  'MIG-007': ['Auto-approve below threshold', 'Manager routing at Level 1', 'Director routing at Level 2'],
  'MIG-008': ['APAC routing check', 'EMEA routing check', 'Fallback region handling'],
  'MIG-009': ['Standard selection flow', 'Profile restriction enforcement', 'Filter rule edge cases'],
};

export const DEPENDENCIES: Record<string, string[]> = {
  'MIG-005': ['Depends on: Multi Intel Asset Discount Rule (MIG-006)', 'Depends on: Lookup Approval Threshold 1 (MIG-007)', 'Used by: SmartBytes Selection Core (MIG-009)'],
  'MIG-006': ['Used by: Q2CBundleSpecific (MIG-005)', 'Feeds: Set Approval Level (MIG-008)'],
  'MIG-007': ['Produces values for: Set Approval Level (MIG-008)', 'References: Threshold_Values__mdt'],
  'MIG-008': ['Consumes: Lookup Approval Threshold 1 output (MIG-007)'],
  'MIG-009': ['Depends on: Q2CBundleSpecific filter rule (MIG-005)', 'References: Product catalog metadata'],
};

export interface AgentMessage { role: 'architect' | 'agent'; text: string; }

export const AGENT_THREADS: Record<string, AgentMessage[]> = {
  'MIG-005': [
    { role: 'architect', text: 'Is this script\'s edge-case discount handling going to break when migrated as Apex? Worried about the SmartBytes filter.' },
    { role: 'agent', text: 'Good question. The SmartBytes filter has a 3-tier discount cascade that doesn\'t have a direct ARM equivalent. I\'ve drafted the migration as Apex (protected layer) because the cascade logic requires custom validation. Test scenario 2 in this deep-dive specifically validates this edge case.\n\nWould you like me to:\n1. Show the Apex draft side-by-side with the current QCP JavaScript\n2. Propose a Flow-based alternative (less robust)\n3. Add a custom validation test scenario' },
    { role: 'architect', text: 'Show me option 1.' },
    { role: 'agent', text: 'Loading side-by-side comparison...' },
  ],
  '_default': [
    { role: 'architect', text: 'Any concerns with this artifact\'s migration path?' },
    { role: 'agent', text: 'No major concerns. The migration path is straightforward with direct ARM equivalents available. I\'ve generated test scenarios to validate behavior parity.' },
  ],
};

// ── Column explainers ─────────────────────────────────────────
export interface Explainers { source: string; draft: string; deployed: string; }

export const EXPLAINERS: Record<string, Explainers> = {
  'MIG-005': {
    source: 'This is the current CPQ logic for Q2CBundleSpecific. It runs in Deal Desk operations 11-14 times per week, controlling bundle pricing and the SmartBytes filter behavior. We need to migrate this without breaking the 3-tier discount cascade — that pattern affects 47% of Q1 quote volume.',
    draft: 'RevBrain has generated the ARM equivalent as protected Apex. The cascade logic stays intact, but lives in a maintainable layer that your admin team doesn\'t need to modify directly. Custom Metadata holds the tier thresholds — those stay editable in Salesforce UI.',
    deployed: 'Deployed to Vector Systems sandbox. All 4 test scenarios passed. Production deployment is blocked pending architect approval — the SmartBytes cascade requires sign-off given its revenue impact.',
  },
  'MIG-006': {
    source: 'This is Multi Intel Asset Discount Rule — a 3-tier discount schedule for multi-asset deals. We need to migrate this preserving the tier boundaries, since Q2CBundleSpecific depends on it for cascade pricing.',
    draft: 'RevBrain has generated the ARM equivalent as Custom Metadata. The tier structure maps directly — thresholds remain admin-editable via Salesforce Setup.',
    deployed: 'Deployed to Vector Systems sandbox. All 3 test scenarios passed — tier boundaries and cap enforcement validated.',
  },
  'MIG-007': {
    source: 'This is Lookup Approval Threshold 1 — an approval routing flow that checks deal value against configurable thresholds. We need to migrate this to ARM\'s Advanced Approvals matrix.',
    draft: 'RevBrain has generated the ARM equivalent as Flow + Custom Metadata. Approval thresholds are preserved as metadata records, and the routing logic maps to ARM Advanced Approvals.',
    deployed: 'Deployed to Vector Systems sandbox. All 4 approval routing scenarios passed including VP override.',
  },
  'MIG-008': {
    source: 'This is Set Approval Level — a simple region-to-level mapping. No custom logic, just a lookup table. Straightforward migration target.',
    draft: 'RevBrain has generated the ARM equivalent as Custom Metadata. Direct 1:1 mapping — region codes and approval levels preserved exactly.',
    deployed: 'Deployed to Vector Systems sandbox. All 3 region routing scenarios passed.',
  },
  'MIG-009': {
    source: 'This is SmartBytes Selection Core — the product selection orchestrator driving 47% of recent quote volume. We need to migrate the filter rule integration carefully since it depends on Q2CBundleSpecific.',
    draft: 'RevBrain has generated the ARM equivalent as Flow + BRE Expression Set. The composable product model replaces rigid bundles, and the filter logic moves to an Expression Set.',
    deployed: 'Deployed to Vector Systems sandbox. All 4 test scenarios passed including empty catalog edge case.',
  },
};

// Generate default explainers for items without custom ones
export function getExplainers(id: string): Explainers {
  if (EXPLAINERS[id]) return EXPLAINERS[id];
  const item = getItem(id);
  const name = item?.name ?? id;
  const desc = item?.description ?? '';
  const out = OUTPUT_TYPES[id] ?? 'the target output type';
  const tests = (TEST_RESULTS[id] ?? []).length;
  return {
    source: `This is ${name}. ${desc} We need to migrate this to its ARM equivalent while preserving current behavior.`,
    draft: `RevBrain has generated the ARM equivalent as ${out}. The migration preserves existing behavior with direct ARM mappings where available.`,
    deployed: `Deployed to Vector Systems sandbox. ${tests > 0 ? `All ${tests} test scenarios passed.` : 'Validation complete.'} Production deployment requires architect approval.`,
  };
}

// ── Phase rail entries (groups + standalone) ──────────────────
export interface RailEntry {
  kind: 'group' | 'standalone';
  id: string;      // GROUP-A or MIG-012
  groupName?: string;
  childIds?: string[];
  complexity?: string;
}

export const PHASE_RAIL_ENTRIES: Record<number, RailEntry[]> = {
  1: [
    { kind: 'group', id: 'GROUP-A', groupName: 'SmartBytes Logic Cluster', childIds: ['MIG-005','MIG-006','MIG-009'], complexity: 'High' },
    { kind: 'group', id: 'GROUP-B', groupName: 'Approval Logic Cluster', childIds: ['MIG-007','MIG-008'], complexity: 'Medium' },
    { kind: 'standalone', id: 'MIG-021' },
    { kind: 'standalone', id: 'MIG-025' },
    { kind: 'standalone', id: 'MIG-022' },
    { kind: 'standalone', id: 'MIG-023' },
    { kind: 'standalone', id: 'MIG-024' },
  ],
  2: [
    { kind: 'group', id: 'GROUP-C', groupName: 'Renewal Engine', childIds: ['MIG-010','MIG-011','MIG-013'], complexity: 'High' },
    { kind: 'standalone', id: 'MIG-012' },
    { kind: 'standalone', id: 'MIG-026' },
    { kind: 'standalone', id: 'MIG-027' },
    { kind: 'standalone', id: 'MIG-028' },
  ],
  3: [
    { kind: 'group', id: 'GROUP-D', groupName: 'Data Migration Stack', childIds: ['MIG-014','MIG-015','MIG-017'], complexity: 'Very High' },
    { kind: 'standalone', id: 'MIG-016' },
    { kind: 'standalone', id: 'MIG-029' },
    { kind: 'standalone', id: 'MIG-030' },
    { kind: 'standalone', id: 'MIG-031' },
  ],
  4: [
    { kind: 'group', id: 'GROUP-E', groupName: 'Legacy Cleanup Bundle', childIds: ['MIG-018','MIG-019','MIG-020'], complexity: 'Low' },
    { kind: 'standalone', id: 'MIG-032' },
    { kind: 'standalone', id: 'MIG-033' },
    { kind: 'standalone', id: 'MIG-034' },
    { kind: 'standalone', id: 'MIG-035' },
  ],
};

// New deeply-authored explainers
Object.assign(EXPLAINERS, {
  'MIG-021': {
    source: 'This is Discount Cap Validator — it blocks quote finalization when bundle discounts exceed regional caps. Active ~8 times per week in Deal Desk approval flow, primarily on SmartBytes-tied opportunities.',
    draft: 'RevBrain has generated the ARM equivalent as protected Apex. Cap thresholds are now admin-editable Custom Metadata — no code changes needed when regional caps adjust.',
    deployed: 'Deployed to Vector Systems sandbox. All 4 test scenarios passed including APAC regional override.',
  },
  'MIG-022': {
    source: 'This is Quote Number Sequencer — generates sequential quote numbers with regional prefix (US-, EU-, APAC-) and yearly reset. Collision handling is critical during high-volume March renewals.',
    draft: 'RevBrain has generated the ARM equivalent as Apex. Counter state moves to Custom Setting for runtime efficiency. Historical numbers remain searchable.',
    deployed: 'Deployed to Vector Systems sandbox. All 4 test scenarios passed including parallel creation collision test.',
  },
  'MIG-026': {
    source: 'This is Renewal Reminder Job — a scheduled batch scanning expiring contracts at 90/60/30 days out. Processes ~340 contracts per Q1 cycle and creates tasks for the Renewals team.',
    draft: 'RevBrain has generated the ARM equivalent as a Scheduled Apex Job. Timing thresholds move to Custom Metadata so the Renewals team can adjust without code changes.',
    deployed: 'Deployed to Vector Systems sandbox. All 4 test scenarios passed including March peak volume simulation.',
  },
  'MIG-029': {
    source: 'This is Historical Discount Reconciler — validates that migrated quote discounts preserve original amounts after currency conversion. Critical for ASC 606 compliance and finance audit trail.',
    draft: 'RevBrain has generated the ARM equivalent as a one-time Apex migration tool. Failed reconciliations are flagged with discrepancy codes and routed to architect review.',
    deployed: 'Deployed to Vector Systems sandbox. All 4 reconciliation scenarios passed including multi-currency edge case.',
  },
  'MIG-032': {
    source: 'This is Sandbox Refresh Validator — confirms sandbox state matches production baseline after refresh. Used as a pre-deployment gate to catch drift before Phase 4 cleanup.',
    draft: 'RevBrain has generated the ARM equivalent as an Apex utility. Lightweight enough to schedule as a post-refresh job in CI/CD.',
    deployed: 'Deployed to Vector Systems sandbox. All 4 validation scenarios passed including drift detection.',
  },
});

// Agent threads for new deeply-authored items
Object.assign(AGENT_THREADS, {
  'MIG-021': [
    { role: 'architect', text: 'What happens to the regional cap data — is it preserved in Apex or admin-editable?' },
    { role: 'agent', text: 'Cap thresholds move to Custom Metadata. Admins can adjust regional caps natively in Salesforce UI without touching code. The validation logic stays in Apex (protected) because the cascade math requires precise execution order.' },
  ],
  'MIG-022': [
    { role: 'architect', text: 'Will historical quote numbers stay searchable?' },
    { role: 'agent', text: 'Yes. Counter state migrates to Custom Setting. Existing quotes retain their original numbers. New quotes increment from where the legacy sequencer left off.' },
  ],
  'MIG-026': [
    { role: 'architect', text: 'Can the team adjust the 90/60/30 timing without a code change?' },
    { role: 'agent', text: 'Yes. The timing thresholds move to Custom Metadata. Renewals team can edit them in Salesforce UI. The scheduled job logic stays in Apex.' },
  ],
  'MIG-029': [
    { role: 'architect', text: 'What happens if reconciliation fails on a quote?' },
    { role: 'agent', text: 'Failed reconciliations are flagged with a discrepancy code and routed to architect review. The quote is not migrated until manually approved. Finance can run the audit log query at any time.' },
  ],
  'MIG-032': [
    { role: 'architect', text: 'Should this run automatically after every sandbox refresh?' },
    { role: 'agent', text: 'Recommended. The validator is lightweight. Schedule it as a post-refresh job in CI/CD or run manually before each deployment. Catches drift early.' },
  ],
});
