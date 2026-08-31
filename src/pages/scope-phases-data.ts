export type Complexity = 'Low' | 'Medium' | 'High' | 'Very High';
export type ItemType = 'Apex' | 'Apex (protected)' | 'QCP (JavaScript)' | 'Flow' | 'Custom Metadata' | 'Flow + Custom Metadata' | 'Lightning page';
export type ColumnId = 'unassigned' | 'phase1' | 'phase2' | 'phase3' | 'phase4';

export interface ScopeItem {
  id: string; name: string; type: ItemType; complexity: Complexity; description: string;
  source?: string; businessLogic?: string; migrationDraft?: string;
  testScenarios?: string[]; dependencies?: string[]; stub?: boolean;
}

export interface ScopeGroup {
  id: string; name: string; summary: string; complexity: Complexity; rationale: string; childIds: string[];
}

export const TYPE_GLYPHS: Record<string, string> = {
  'Apex': '⚡', 'Apex (protected)': '⚡', 'QCP (JavaScript)': '📜', 'Flow': '◆', 'Custom Metadata': '▣',
  'Flow + Custom Metadata': '◆▣', 'Lightning page': '◇',
};

export const COMPLEXITY_COLORS: Record<string, string> = {
  Low: 'bg-green-100 text-green-800 border-green-200', Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  High: 'bg-orange-100 text-orange-800 border-orange-200', 'Very High': 'bg-red-100 text-red-800 border-red-200',
};

export const EFFORT_COLORS: Record<string, string> = {
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200', 'Medium-High': 'bg-orange-100 text-orange-800 border-orange-200',
  High: 'bg-red-100 text-red-800 border-red-200', Variable: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]',
};

export const COLUMN_META: Record<ColumnId, { label: string; effort?: string; time?: string }> = {
  unassigned: { label: 'Unassigned' },
  phase1: { label: 'Phase 1 — Active Quoting', effort: 'Medium', time: '3–4 wk' },
  phase2: { label: 'Phase 2 — Renewals', effort: 'Medium-High', time: '4–5 wk' },
  phase3: { label: 'Phase 3 — Data Migration', effort: 'High', time: '3–6 wk' },
  phase4: { label: 'Phase 4 — Legacy Cleanup', effort: 'Variable', time: 'TBD' },
};

export const COLUMN_ORDER: ColumnId[] = ['unassigned', 'phase1', 'phase2', 'phase3', 'phase4'];

export const ALL_ITEMS: ScopeItem[] = [
  { id: 'MIG-001', name: 'Training Alert (DELETE MAYBE)', type: 'Custom Metadata', complexity: 'Low', description: 'Notification rule flagged for review; may be legacy noise.',
    source: '// CustomMetadata: Training_Alert__mdt\nif (record.Status__c === "Active") {\n  notify(record.Owner);\n}', businessLogic: 'Sends notification to record owner when training status is active. Flagged as potential legacy artifact — no usage in last 90 days.', migrationDraft: 'Target output: Custom Metadata. Likely candidate for deletion rather than migration.', testScenarios: ['Verify notification fires on active status', 'Confirm no downstream dependencies', 'Validate deletion impact'], dependencies: ['None identified'] },
  { id: 'MIG-002', name: 'DormantApprovalPath', type: 'Custom Metadata', complexity: 'Low', description: 'Approval flow with zero usage in last 90 days.',
    source: '// CustomMetadata: Dormant_Approval__mdt\n// Last invocation: 2024-08-15\napprovalMatrix.route(record);', businessLogic: 'Legacy approval routing path that has not been invoked since August 2024. Originally served a product line since discontinued.', migrationDraft: 'Target output: Custom Metadata. Recommend archive, not migrate.', testScenarios: ['Confirm zero usage', 'Check for hidden references', 'Validate safe removal'], dependencies: ['None — orphaned'] },
  { id: 'MIG-003', name: 'OldQuoteTemplate', type: 'Lightning page', complexity: 'Low', description: 'Legacy quote template, unused since 2024.',
    source: '<!-- Lightning Page: Old_Quote_Template -->\n<flexipage:template>\n  <region name="header">...</region>\n</flexipage:template>', businessLogic: 'Quote output template from pre-SmartBytes era. Replaced by current template in Q2 2024.', migrationDraft: 'Target output: Lightning page. Archive only — current template already in production.', testScenarios: ['Confirm replacement template covers all fields', 'Verify no active references'], dependencies: ['Superseded by Current_Quote_Template'] },
  { id: 'MIG-004', name: 'LegacyBundleConfig', type: 'Custom Metadata', complexity: 'Medium', description: 'Legacy bundle configuration; review for archival.',
    source: '// CustomMetadata: Legacy_Bundle__mdt\nbundleRules.forEach(rule => {\n  if (rule.isActive) applyConfig(rule);\n});', businessLogic: 'Bundle configuration rules from original CPQ deployment. Some rules still referenced by dormant products.', migrationDraft: 'Target output: Custom Metadata. Review active flag status before deciding migrate vs archive.', testScenarios: ['Audit active vs dormant rules', 'Cross-reference with product catalog', 'Test bundle rendering'], dependencies: ['Referenced by 3 dormant products'] },
  { id: 'MIG-005', name: 'Q2CBundleSpecific', type: 'QCP (JavaScript)', complexity: 'High', description: 'Core bundle pricing logic; SmartBytes filter rule embedded.',
    source: 'global class Q2CBundleSpecific implements SBQQ.QCPPlugin2 {\n  global void onBeforePriceRules(ctx) {\n    if (ctx.product.Family == "SmartBytes") {\n      applyFilterRule(ctx);\n      calculateBundlePrice(ctx);\n    }\n  }\n}', businessLogic: 'Core QCP plugin handling SmartBytes bundle pricing. Embeds the 2024 filter rule that controls product visibility for specific user profiles. Drives 47% of recent quote volume.', migrationDraft: 'Target output: Apex invocable action + BRE Expression Set. SmartBytes filter rule needs custom validation in ARM.', testScenarios: ['Standard bundle pricing', 'SmartBytes filter rule validation', 'Multi-currency bundle', 'Edge-case discount cascade'], dependencies: ['Depends on: Multi Intel Asset Discount Rule', 'Used by: SmartBytes Selection Core'] },
  { id: 'MIG-006', name: 'Multi Intel Asset Discount Rule', type: 'Custom Metadata', complexity: 'Medium', description: 'Multi-asset discount cascade across 3 tiers.',
    source: '// CustomMetadata: Multi_Intel_Discount__mdt\ntierDiscounts = [\n  { min: 1, max: 10, pct: 5 },\n  { min: 11, max: 50, pct: 12 },\n  { min: 51, max: null, pct: 18 }\n];', businessLogic: 'Tiered discount schedule for multi-asset deals. Three tiers based on asset count with progressive discounts.', migrationDraft: 'Target output: Custom Metadata in ARM Pricing Procedure. Direct mapping — tier structure preserved.', testScenarios: ['Single-tier discount', 'Tier boundary transitions', 'Max discount cap validation'], dependencies: ['Used by: Q2CBundleSpecific', 'Feeds: Set Approval Level'] },
  { id: 'MIG-007', name: 'Lookup Approval Threshold 1', type: 'Flow + Custom Metadata', complexity: 'Medium', description: 'Approval routing based on deal value lookups.',
    source: '// Flow: Approval_Threshold_Lookup\n// Metadata: Threshold_Values__mdt\nif (deal.value > threshold.Level1) {\n  route("Manager");\n} else if (deal.value > threshold.Level2) {\n  route("Director");\n}', businessLogic: 'Approval routing flow that checks deal value against configurable thresholds stored in Custom Metadata.', migrationDraft: 'Target output: Flow + Custom Metadata. Maps to ARM Advanced Approvals matrix.', testScenarios: ['Below-threshold auto-approve', 'Manager-level routing', 'Director-level routing', 'VP override scenario'], dependencies: ['Produces values for: Set Approval Level', 'References: Threshold_Values__mdt'] },
  { id: 'MIG-008', name: 'Set Approval Level', type: 'Custom Metadata', complexity: 'Low', description: 'Approval level assignment by region.',
    source: '// CustomMetadata: Approval_Level__mdt\nregionMap = {\n  "APAC": "L2",\n  "EMEA": "L3",\n  "AMER": "L1"\n};', businessLogic: 'Maps geographic regions to approval levels. Simple lookup with no custom logic.', migrationDraft: 'Target output: Custom Metadata. Direct 1:1 mapping to ARM approval matrix.', testScenarios: ['APAC region routing', 'EMEA region routing', 'Unknown region fallback'], dependencies: ['Consumes: Lookup Approval Threshold 1 output'] },
  { id: 'MIG-009', name: 'SmartBytes Selection Core', type: 'Flow + Custom Metadata', complexity: 'High', description: 'SmartBytes product selection logic; 47% of recent volume.',
    source: '// Flow: SmartBytes_Selection\n// Orchestrates product visibility\neligibleProducts = catalog.filter(p =>\n  p.Family == "SmartBytes" &&\n  userProfile.hasAccess(p) &&\n  filterRule.evaluate(p)\n);', businessLogic: 'Core product selection orchestrator for SmartBytes line. Applies user profile-based filtering and the 2024 filter rule to determine eligible products.', migrationDraft: 'Target output: Flow + BRE Expression Set. Central piece of SmartBytes migration — depends on Q2CBundleSpecific filter rule.', testScenarios: ['Standard product selection', 'Profile-restricted selection', 'Filter rule edge cases', 'Empty catalog scenario'], dependencies: ['Depends on: Q2CBundleSpecific (filter rule)', 'References: Product catalog metadata'] },
  { id: 'MIG-010', name: 'Q2CLegacyqcp', type: 'QCP (JavaScript)', complexity: 'High', description: 'Legacy QCP renewal handling; edge cases in proration.',
    source: 'global class Q2CLegacyqcp implements SBQQ.QCPPlugin2 {\n  global void onAfterCalculate(ctx) {\n    if (ctx.isRenewal) {\n      prorationEngine.calculate(ctx);\n      handleEdgeCases(ctx);\n    }\n  }\n}', businessLogic: 'Renewal-specific QCP handling proration calculations. Contains edge cases for mid-term amendments and partial renewals.', migrationDraft: 'Target output: Apex invocable action. Proration edge cases need POC — no direct ARM equivalent for partial renewal logic.', testScenarios: ['Standard renewal proration', 'Mid-term amendment', 'Partial renewal', 'Multi-year renewal'], dependencies: ['Depends on: Product pricing model (Phase 1)', 'Used by: PowerSlide Server Selection'] },
  { id: 'MIG-011', name: 'PowerSlide Server Selection', type: 'Flow + Custom Metadata', complexity: 'Medium', description: 'Renewal-time product selection for server line.',
    source: '// Flow: PowerSlide_Server_Selection\nserverProducts = renewalCatalog.filter(p =>\n  p.Line == "PowerSlide" &&\n  p.isRenewalEligible\n);', businessLogic: 'Product selection flow specific to PowerSlide server line during renewal. Ensures continuity of server licensing.', migrationDraft: 'Target output: Flow + Custom Metadata. Straightforward migration — renewal eligibility logic maps to ARM product rules.', testScenarios: ['Standard server renewal', 'Discontinued server handling', 'Upgrade path selection'], dependencies: ['Depends on: Q2CLegacyqcp (renewal context)', 'References: PowerSlide product catalog'] },
  { id: 'MIG-012', name: 'Set Twinned Fields', type: 'Custom Metadata', complexity: 'Low', description: 'Twinned field mapping for renewal data flow.',
    source: '// CustomMetadata: Twinned_Fields__mdt\nfieldPairs = [\n  { source: "Quote.Amount", target: "Renewal.BaseAmount" },\n  { source: "Quote.Term", target: "Renewal.Term" }\n];', businessLogic: 'Maps source quote fields to renewal record fields. Simple declarative mapping.', migrationDraft: 'Target output: Custom Metadata. Direct mapping to ARM field relationships.', testScenarios: ['All field pairs sync correctly', 'Null source field handling', 'Override scenario'], dependencies: ['Used by renewal data flow'] },
  { id: 'MIG-013', name: 'ExampleProductSearchPlugin', type: 'Apex (protected)', complexity: 'Medium', description: 'Custom product search plugin for renewal flow.',
    source: 'global class ExampleProductSearchPlugin implements SBQQ.ProductSearchPlugin {\n  global SObject[] search(ctx) {\n    return [SELECT Id, Name FROM Product2\n      WHERE IsActive = true\n      AND Family IN :ctx.families];\n  }\n}', businessLogic: 'Custom product search extending CPQ default search for renewal flows. Filters by active status and product family.', migrationDraft: 'Target output: Apex invocable action. ARM has native product search — evaluate if custom extension still needed.', testScenarios: ['Search by family filter', 'Empty results handling', 'Performance with large catalog'], dependencies: ['Used by: Renewal quote flow', 'References: Product2 catalog'] },
  { id: 'MIG-014', name: 'DataMapHistoricalQuotes', type: 'Apex (protected)', complexity: 'Very High', description: 'Historical quote migration; 8,140 records, currency conversion.',
    source: 'global class DataMapHistoricalQuotes {\n  global void migrate(List<SBQQ__Quote__c> quotes) {\n    for (SBQQ__Quote__c q : quotes) {\n      ARM_Quote__c rca = transform(q);\n      rca.Amount = convertCurrency(q.Amount, q.CurrencyIsoCode);\n      insert rca;\n    }\n  }\n}', businessLogic: 'Bulk migration of 8,140 historical quote records with cross-currency conversion. CFO flagged audit trail continuity as requirement.', migrationDraft: 'Target output: Apex batch job. Requires 10% sample validation before full run. Currency conversion via Currency Conversion Map.', testScenarios: ['Single-currency migration', 'Multi-currency conversion', 'Audit trail preservation', 'Bulk performance (8K+ records)'], dependencies: ['Depends on: Currency Conversion Map', 'Validated by: ValidateQuoteRecords'] },
  { id: 'MIG-015', name: 'ValidateQuoteRecords', type: 'Flow', complexity: 'High', description: 'Sample-based validation of migrated quote records.',
    source: '// Flow: Validate_Quote_Migration\nfor each migratedQuote {\n  original = lookupCPQ(migratedQuote.SourceId);\n  assert(migratedQuote.Amount == original.Amount);\n  assert(migratedQuote.LineCount == original.LineCount);\n}', businessLogic: 'Post-migration validation flow comparing ARM records against CPQ originals. Sample-based approach — validates amount parity and line item counts.', migrationDraft: 'Target output: Flow. Runs as validation suite after DataMapHistoricalQuotes batch completes.', testScenarios: ['Matching records pass', 'Amount mismatch detection', 'Missing line items', 'Currency rounding tolerance'], dependencies: ['Depends on: DataMapHistoricalQuotes (runs after)', 'References: Both CPQ and ARM quote objects'] },
  { id: 'MIG-016', name: 'Asset Bridge Adapter', type: 'Apex', complexity: 'High', description: 'Asset bridging between legacy CPQ and ARM models.',
    source: 'public class AssetBridgeAdapter {\n  public void bridge(Asset cpqAsset) {\n    ARM_Asset__c rcaAsset = new ARM_Asset__c();\n    rcaAsset.SourceId = cpqAsset.Id;\n    mapFields(cpqAsset, rcaAsset);\n    upsert rcaAsset;\n  }\n}', businessLogic: 'Bridges asset records between CPQ and ARM data models during co-existence period. Enables parallel running.', migrationDraft: 'Target output: Apex. Temporary bridge — decommission after Phase 4 legacy cleanup.', testScenarios: ['New asset creation', 'Existing asset update', 'Field mapping completeness', 'Rollback scenario'], dependencies: ['Used during co-existence period', 'Decommissioned in Phase 4'] },
  { id: 'MIG-017', name: 'Currency Conversion Map', type: 'Custom Metadata', complexity: 'Medium', description: 'Cross-currency conversion rules for historical data.',
    source: '// CustomMetadata: Currency_Conversion__mdt\nrates = {\n  "AUD_USD": 0.65, "GBP_USD": 1.27,\n  "EUR_USD": 1.08, "NZD_USD": 0.61\n};', businessLogic: 'Historical exchange rates for the 5 supported currencies. Used during data migration to normalize amounts to USD baseline.', migrationDraft: 'Target output: Custom Metadata. Direct mapping — rates table preserved as-is.', testScenarios: ['AUD conversion accuracy', 'GBP conversion accuracy', 'Missing rate fallback', 'Rate effective date handling'], dependencies: ['Used by: DataMapHistoricalQuotes'] },
  { id: 'MIG-018', name: 'Legacy Org Audit Script', type: 'Apex', complexity: 'Low', description: 'Audit script to identify decommissioned components.',
    source: 'public class LegacyOrgAudit {\n  public List<String> findOrphans() {\n    // Scan for unused components\n    return MetadataService.listUnreferenced();\n  }\n}', businessLogic: 'Utility script scanning org for decommissioned and unreferenced components. Produces cleanup manifest.', migrationDraft: 'Target output: Apex. Run once, generate report, then decommission script itself.', testScenarios: ['Identify orphan flows', 'Detect unused custom fields', 'Generate cleanup manifest'], dependencies: ['Feeds: Permission Set Cleanup, Orphan Feature Removal'] },
  { id: 'MIG-019', name: 'Permission Set Cleanup', type: 'Custom Metadata', complexity: 'Low', description: 'Consolidate 16 permission sets to 8.',
    source: '// CustomMetadata: PermSet_Consolidation__mdt\nconsolidationMap = [\n  { from: ["PS_Sales_1", "PS_Sales_2"], to: "PS_Sales_Unified" },\n  { from: ["PS_Desk_1", "PS_Desk_2"], to: "PS_DealDesk_Unified" }\n];', businessLogic: 'Permission set consolidation mapping. Reduces 16 overlapping permission sets to 8 role-based sets aligned to team structure.', migrationDraft: 'Target output: Custom Metadata + manual permission set assignment. Coordinate with IT admin.', testScenarios: ['Sales team access preserved', 'Deal Desk permissions intact', 'No privilege escalation', 'Rollback capability'], dependencies: ['Depends on: Legacy Org Audit Script (identifies redundancies)'] },
  { id: 'MIG-020', name: 'Orphan Feature Removal', type: 'Custom Metadata', complexity: 'Low', description: 'Remove 39 orphan features identified in scan.',
    source: '// CustomMetadata: Orphan_Features__mdt\norphans = auditReport.features.filter(f =>\n  f.lastUsed < "2024-01-01" &&\n  f.referenceCount === 0\n);', businessLogic: 'Removes 39 orphan features identified in initial RevBrain scan. Features have zero references and no usage since 2024.', migrationDraft: 'Target output: Custom Metadata. Delete operation — no migration needed, just cleanup.', testScenarios: ['Confirm zero references', 'Check for indirect dependencies', 'Staged removal (batch of 10)'], dependencies: ['Depends on: Legacy Org Audit Script (orphan list)'] },
  // ── Phase 1 new items ──
  { id: 'MIG-021', name: 'Discount Cap Validator', type: 'Apex', complexity: 'Medium', description: 'Validates bundle discounts against regional cap thresholds; blocks finalization if floor breached.',
    source: 'public class DiscountCapValidator {\n  public static Boolean validate(Quote q) {\n    Decimal cap = RegionalCap__mdt.getInstance(q.Region__c).Cap__c;\n    for (QuoteLine ql : q.Lines) {\n      Decimal effectivePrice = ql.NetPrice;\n      Decimal floor = ql.ListPrice * (1 - cap / 100);\n      if (effectivePrice < floor) {\n        q.addError("Discount exceeds regional cap");\n        return false;\n      }\n    }\n    return true;\n  }\n}',
    businessLogic: 'Validates that bundle discounts don\'t exceed Vector Systems\' regional cap thresholds. Runs on quote submission; blocks finalization if discount cascades produce values below floor. Active in Deal Desk approval flow ~8 times per week, primarily on SmartBytes-tied opportunities.',
    migrationDraft: 'Target output: Apex (protected layer). Cap thresholds extracted to Custom Metadata so admin team can adjust regional caps natively without code changes.',
    testScenarios: ['Standard cap — single-tier discount validates against US cap', 'Cascade cap — 3-tier SmartBytes discount validates floor not breached', 'Regional override — APAC cap differs from US', 'Edge case — manual override with architect approval bypasses validation'],
    dependencies: ['Depends on: Multi Intel Asset Discount Rule (MIG-006)', 'Used by: Lookup Approval Threshold 1 (MIG-007)'] },
  { id: 'MIG-022', name: 'Quote Number Sequencer', type: 'Apex', complexity: 'Low', description: 'Sequential quote numbers with regional prefix and yearly reset; collision handling for parallel inserts.',
    source: 'public class QuoteNumberSequencer {\n  public static String generate(String region) {\n    String prefix = RegionPrefix__mdt.get(region);\n    Integer year = Date.today().year();\n    QuoteCounter__c counter = getOrCreate(region, year);\n    counter.Value__c++;\n    update counter;\n    return prefix + String.valueOf(year).right(2) +\n           String.valueOf(counter.Value__c).leftPad(4, \'0\');\n  }\n}',
    businessLogic: 'Generates sequential quote numbers with regional prefix (US-, EU-, APAC-) and yearly reset. Auto-increments on quote creation; collision handling for parallel inserts in high-volume periods (March renewals).',
    migrationDraft: 'Target output: Apex. Sequencer logic preserved; counter state moves to Custom Setting for runtime efficiency.',
    testScenarios: ['Single quote — standard increment', 'Parallel creation — 10 simultaneous quotes, no collision', 'Year rollover — Jan 1 reset to 0001', 'Regional prefix — APAC quote receives correct prefix'],
    dependencies: ['No upstream dependencies', 'Used by: All renewal flows (Phase 2)'] },
  { id: 'MIG-023', name: 'Currency Override Hook', type: 'Apex', complexity: 'Medium', description: 'Pre-calculation hook for currency override on multi-currency quotes.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  { id: 'MIG-024', name: 'Tax Calc Trigger', type: 'Apex', complexity: 'Medium', description: 'Tax calculation trigger on quote line item creation and update.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  { id: 'MIG-025', name: 'Sales Channel Router', type: 'Flow', complexity: 'Low', description: 'Routes quotes to correct sales channel based on product family and region.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  // ── Phase 2 new items ──
  { id: 'MIG-026', name: 'Renewal Reminder Job', type: 'Apex', complexity: 'Medium', description: 'Scheduled batch scanning expiring contracts at 90/60/30 days; creates renewal tasks.',
    source: 'global class RenewalReminderJob implements Schedulable {\n  global void execute(SchedulableContext sc) {\n    List<Contract> expiring = [SELECT Id, EndDate, OwnerId\n      FROM Contract\n      WHERE EndDate = NEXT_N_DAYS:90\n      AND Status = \'Active\'];\n    List<Task> tasks = new List<Task>();\n    for (Contract c : expiring) {\n      if (!hasExistingTask(c.Id)) {\n        tasks.add(createRenewalTask(c));\n      }\n    }\n    insert tasks;\n  }\n}',
    businessLogic: 'Scheduled Apex batch that scans expiring contracts 90/60/30 days out and creates tasks for Renewals team. Currently processes ~340 contracts per Q1 cycle.',
    migrationDraft: 'Target output: Apex (Scheduled Job). Logic preserved; notification destination moves to Salesforce Tasks + email alert via Custom Notification (admin-configurable).',
    testScenarios: ['90-day flag — contract expiring in 89 days triggers task', 'Duplicate prevention — same contract scanned twice, only one task', 'High-volume — March renewal peak, 487 contracts in single batch', 'Notification routing — task assigned to correct Renewals team member'],
    dependencies: ['Depends on: Set Twinned Fields (MIG-012)', 'Used by: Auto-Renewal Flag Handler (MIG-027)'] },
  { id: 'MIG-027', name: 'Auto-Renewal Flag Handler', type: 'Flow', complexity: 'Low', description: 'Sets auto-renewal flag on eligible contracts based on product line rules.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  { id: 'MIG-028', name: 'Renewal Quote Cloner', type: 'Apex', complexity: 'Medium', description: 'Clones existing quote with renewal adjustments for pricing and term.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  // ── Phase 3 new items ──
  { id: 'MIG-029', name: 'Historical Discount Reconciler', type: 'Apex', complexity: 'High', description: 'Reconciles historical quote discounts post-migration; ASC 606 compliance.',
    source: 'public class HistoricalDiscountReconciler {\n  public ReconcileResult reconcile(ARM_Quote__c rca, SBQQ__Quote__c cpq) {\n    Decimal cpqDiscount = cpq.TotalDiscount__c;\n    Decimal rcaDiscount = rca.TotalDiscount__c;\n    Decimal variance = Math.abs(cpqDiscount - rcaDiscount);\n    ReconcileResult result = new ReconcileResult();\n    result.matched = variance < 0.01;\n    result.variance = variance;\n    if (!result.matched) {\n      result.discrepancyCode = \'DISC_MISMATCH\';\n      FlagForReview.create(rca.Id, result);\n    }\n    return result;\n  }\n}',
    businessLogic: 'Reconciles historical quote discounts during migration. Validates that migrated quote line items preserve original discount amounts after currency conversion. Critical for finance audit trail (ASC 606 compliance).',
    migrationDraft: 'Target output: Apex (one-time migration tool). Runs during Phase 3 data migration; output validation log stored as attachments on Quote records.',
    testScenarios: ['Single-currency reconciliation — USD quote with discount preserved', 'Multi-currency — GBP quote reconciles to converted total', 'Edge case — discount applied after conversion in source', 'Audit log — all reconciliations produce timestamped log entry'],
    dependencies: ['Depends on: DataMapHistoricalQuotes (MIG-014)', 'Depends on: Currency Conversion Map (MIG-017)'] },
  { id: 'MIG-030', name: 'Quote Archive Compressor', type: 'Apex', complexity: 'Medium', description: 'Compresses archived quote attachments for storage optimization.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  { id: 'MIG-031', name: 'Legacy Quote Number Mapper', type: 'Custom Metadata', complexity: 'Low', description: 'Maps legacy quote number format to new ARM numbering scheme.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  // ── Phase 4 new items ──
  { id: 'MIG-032', name: 'Sandbox Refresh Validator', type: 'Apex', complexity: 'Low', description: 'Validates sandbox state matches production baseline after refresh.',
    source: 'public class SandboxRefreshValidator {\n  public ValidationReport validate() {\n    ValidationReport rpt = new ValidationReport();\n    rpt.permSetParity = checkPermSets();\n    rpt.apexVersion = checkApexVersions();\n    rpt.cmtSync = checkCustomMetadata();\n    rpt.passed = rpt.permSetParity && rpt.apexVersion && rpt.cmtSync;\n    if (!rpt.passed) {\n      rpt.driftReport = generateDiffReport();\n    }\n    return rpt;\n  }\n}',
    businessLogic: 'Validates sandbox state matches expected baseline after refresh from production. Confirms permission sets, custom metadata, and Apex versions are in sync. Used as a pre-deployment gate in Phase 4 cleanup.',
    migrationDraft: 'Target output: Apex (test/validation utility). Stays in code-only — no admin-facing surface needed.',
    testScenarios: ['Permission set parity — sandbox sets match production after refresh', 'Apex version check — sandbox runs same Apex version as production', 'Custom metadata sync — all CMTs present in sandbox', 'Drift detection — flags any divergence with diff report'],
    dependencies: ['No upstream dependencies', 'Used by: Permission Set Cleanup (MIG-019)'] },
  { id: 'MIG-033', name: 'Deprecated Plugin Remover', type: 'Apex', complexity: 'Medium', description: 'Removes deprecated CPQ plugin registrations from org.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  { id: 'MIG-034', name: 'Final Org Audit Report', type: 'Apex', complexity: 'Low', description: 'Generates final audit report confirming all migration artifacts deployed.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  { id: 'MIG-035', name: 'Cutover Checklist Generator', type: 'Custom Metadata', complexity: 'Low', description: 'Generates cutover checklist from migration metadata for go-live readiness.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
  // ── Unassigned new item ──
  { id: 'MIG-036', name: 'Unused Email Template Reference', type: 'Custom Metadata', complexity: 'Low', description: 'Legacy email template reference with zero invocations since 2024.', stub: true,
    testScenarios: ['Standard operation validation', 'Edge case handling'], dependencies: ['Dependencies to be validated during architect review'] },
];

export const ALL_GROUPS: ScopeGroup[] = [
  { id: 'GROUP-A', name: 'SmartBytes Logic Cluster', complexity: 'High', childIds: ['MIG-005', 'MIG-006', 'MIG-009'],
    summary: 'Dependencies between bundle pricing logic and SmartBytes filter rule — deploy as cohesive unit.',
    rationale: 'These three artifacts share the 2024 SmartBytes filter rule logic. Q2CBundleSpecific handles bundle pricing, Multi Intel Asset Discount Rule applies cascade discounts, and SmartBytes Selection Core orchestrates product selection. Deploying them out of sequence creates pricing inconsistencies in 47% of Q1 quote volume. Architect recommendation: deploy as cohesive unit, test scenarios validate cross-artifact behavior.' },
  { id: 'GROUP-B', name: 'Approval Logic Cluster', complexity: 'Medium', childIds: ['MIG-007', 'MIG-008'],
    summary: 'Approval routing pair — Lookup Threshold uses Set Approval Level outputs.',
    rationale: 'Lookup Approval Threshold pulls values that Set Approval Level produces. Independent deployment risks orphan threshold lookups with no level assignments. Sequential deploy within same window, validate approval routing end-to-end before Phase 1 cutover.' },
  { id: 'GROUP-C', name: 'Renewal Engine', complexity: 'High', childIds: ['MIG-010', 'MIG-011', 'MIG-013'],
    summary: 'Renewal flow components sharing data model — sequential deployment recommended.',
    rationale: 'Renewal Engine components share the Q2C renewal data model. Q2CLegacyqcp orchestrates proration, PowerSlide Server Selection handles product line continuity, ExampleProductSearchPlugin extends product lookup. Architect attention required: edge cases in proration logic don\'t have direct ARM equivalents — flagged for custom validation.' },
  { id: 'GROUP-D', name: 'Data Migration Stack', complexity: 'Very High', childIds: ['MIG-014', 'MIG-015', 'MIG-017'],
    summary: 'Migration pipeline plus validation plus currency map — sequential dependency chain.',
    rationale: 'Data Migration Stack is a strict sequential pipeline. DataMapHistoricalQuotes processes records, ValidateQuoteRecords confirms parity sample-by-sample, Currency Conversion Map applies cross-currency rules during migration. 8,140 historical quotes; recommend 10% sample validation before full migration. Q1 renewal peak constraint: complete before March 1.' },
  { id: 'GROUP-E', name: 'Legacy Cleanup Bundle', complexity: 'Low', childIds: ['MIG-018', 'MIG-019', 'MIG-020'],
    summary: 'Decommission sequence — execute as final pass after ARM cutover.',
    rationale: 'Final cleanup sequence after ARM cutover. Legacy Org Audit Script identifies decommissioned components, Permission Set Cleanup consolidates 16 sets to 8, Orphan Feature Removal eliminates 39 features identified in initial scan. Variable LOE: depends on Vector Systems data retention policy archival decisions.' },
];

// Column entries: either an item ID or a group ID
export const INITIAL_COLUMNS: Record<ColumnId, string[]> = {
  unassigned: ['MIG-001', 'MIG-002', 'MIG-003', 'MIG-004', 'MIG-036'],
  phase1: ['GROUP-A', 'GROUP-B', 'MIG-021', 'MIG-022', 'MIG-023', 'MIG-024', 'MIG-025'],
  phase2: ['GROUP-C', 'MIG-012', 'MIG-026', 'MIG-027', 'MIG-028'],
  phase3: ['GROUP-D', 'MIG-016', 'MIG-029', 'MIG-030', 'MIG-031'],
  phase4: ['GROUP-E', 'MIG-032', 'MIG-033', 'MIG-034', 'MIG-035'],
};

export interface PhaseRationale {
  num: number; title: string; effort: string; time: string;
  whyLabel: string; whyItems: string[];
  includes?: string[]; excludes?: string[];
  autonomous: string[]; architect: string[]; client: string[];
  actionLabel: string;
}

export const PHASE_RATIONALES: PhaseRationale[] = [
  { num: 1, title: 'Active Enterprise Quoting', effort: 'Medium', time: '3–4 weeks', whyLabel: 'WHY FIRST', whyItems: ['Highest recent usage', 'Highest business value', 'Clear ownership', 'Required for ARM adoption story'], includes: ['Active quote flow', 'Core enterprise bundles', 'Standard pricing logic', 'Standard approval path'], excludes: ['Retired bundles', 'Historical quote archive', 'Rare approval exceptions'], autonomous: ['Initial CPQ-to-ARM mapping', 'Usage-based scope recommendation', 'Draft implementation plan', 'Draft LOE assumptions'], architect: ['Pricing design validation', 'Approval logic validation', 'Final phase scope approval'], client: ['Confirm enterprise quote flow priority', 'Validate approval exceptions', 'Confirm UAT owners'], actionLabel: 'Validate scope' },
  { num: 2, title: 'Renewals and Amendments', effort: 'Medium-High', time: '4–5 weeks', whyLabel: 'WHY NEXT', whyItems: ['Active usage', 'Dependency on Phase 1 product/pricing model', 'Important for customer retention motion'], autonomous: ['Renewal flow analysis', 'Dependency detection', 'Initial ARM mapping'], architect: ['Renewal process design', 'Amendment logic review', 'Cross-phase dependency review'], client: ['RevOps validation', 'Renewal owner input', 'Edge-case confirmation'], actionLabel: 'Review data dependencies' },
  { num: 3, title: 'Data Migration', effort: 'High', time: '3–6 weeks', whyLabel: 'WHY SEPARATE', whyItems: ['Quote history and active records require validation', 'CFO raised concern in client meeting', 'Scope depends on retention policy'], autonomous: ['Data object discovery', 'Record volume analysis', 'Dependency mapping', 'Draft migration checklist'], architect: ['Data transformation strategy', 'Data quality review', 'Migration sequencing'], client: ['Data retention policy', 'Historical quote access requirements', 'Finance / audit requirements'], actionLabel: 'Confirm data policy' },
  { num: 4, title: 'Legacy Cleanup', effort: 'Variable', time: 'TBD', whyLabel: 'WHY LATER', whyItems: ['Low recent usage', 'Some configuration may not need to move', 'Good candidate for rationalization instead of migration'], autonomous: ['Legacy usage detection', 'Inactive configuration grouping', 'Cleanup recommendations'], architect: ['Decide migrate vs retire', 'Validate hidden dependencies'], client: ['Confirm business ownership', 'Confirm whether legacy flows are still needed'], actionLabel: 'Review with customer' },
];
