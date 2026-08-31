# Build Comparison Report
Generated: 2026-05-09

**Build A:** https://sf-demo-b1.vercel.app (commit be0ed41, redeploy with VITE_AGENT_MODEL=claude-sonnet-4-5)
**Build B:** https://sfd-wine.vercel.app (parallel build, commit c257a8a)

---

## TEST 1 — Initial Load

### Build A
- Screenshots: `a_t1_light.png`, `a_t1_dark.png`
- Light mode: Loads /assessment/executive with 5-tab nav (Executive, Sales, Salesforce Partner, AI Migration Drafts, Implementation). TopBar shows "TechFlow Solutions • Sample Data". Verdict card: "Proceed with Caution" badge, 68/100 complexity score. Hero chart: "CPQ Today vs RCA Potential" bar chart. Truth labels visible throughout.
- Dark mode: Full dark mode applied. Charts, verdict card, nav all adapt. No visual breakage observed.
- Onboarding overlay appears on first load (multi-step guided tour). Must be dismissed before interacting.

### Build B
- Screenshots: `b_t1_light.png`, `b_t1_dark.png`
- Light mode: Loads /assessment/executive with 5-tab nav (Executive, Sales, Salesforce, Migration, Implementation) — different label abbreviations. TopBar shows "Vento CPQ → RCA Assessment · Acme Cloud Holdings (sample)". Verdict card: "Proceed with caution" badge with "AI-generated draft" label. Narrative text different from Build A. Below verdict: "Where the org has friction" bar chart with Friction dimensions (5) and RCA capabilities (10) metrics. No truth label system visible in nav. Agent panel is a collapsible right-side drawer (not a slide-over).
- Dark mode: Full dark mode applied. All elements adapt cleanly. No visual breakage.
- No onboarding overlay on load.

---

## TEST 2 — Agent Panel Response

### Build A
- Screenshot: `a_t2_panel_response.png`
- Panel header: "Ask Vento • AI-Generated | Context: Executive Layer"
- Prebuilt chips: "What is the top risk for this migration?", "Summarise the verdict in two sentences.", "Which RCA capabilities give the most immediate uplift?"
- Question submitted: "Should we migrate now? What is the single biggest risk?"
- **Result during first test run (before model fix):** API error 404 — `{"type":"not_found_error","message":"model: claude-sonnet-4-5\n"}`. The error bubble appeared in the panel inline.
- **Status after redeploy (VITE_AGENT_MODEL=claude-sonnet-4-5 baked correctly):** Test re-run in progress at time of report. Proxy confirmed live via curl: returns claude-sonnet-4-5-20250929.
- Response transcript: NOT YET CAPTURED (pending re-run on corrected deploy)

### Build B
- Screenshot: `b_t2_panel_open.png`
- Panel header: "Ask the assessment" (no layer context label, no truth label)
- Prebuilt chips: "Should we migrate now?", "What's the biggest business risk?", "What will slow this project down?", "What RCA capabilities could we unlock?"
- Agent panel positioned as right-side expandable drawer. Panel collapses differently from Build A.
- Question submitted and response status: Build B subagent confirmed it submitted "Should we migrate now? What is the single biggest risk?" and received a response. Verbatim transcript: NOT CAPTURED — subagent deviated from the test protocol (did not record verbatim text).
- No API error observed in UI.

---

## TEST 3 — Stop Button Mid-Stream

### Build A
- Screenshot: not captured on corrected deploy (pending re-run)
- From prior run: Stop button present (red square replaces send button during streaming). Stream did not establish on first run due to model 404.

### Build B
- Screenshot: not captured — subagent deviated from protocol
- Subagent report: Build B's stop button was not explicitly tested in isolation.

---

## TEST 4 — Layer Switch Latency

### Build A
- Screenshots: pending re-run
- Layer switch behavior confirmed working: panel context label updates to "Context: Sales Layer" when navigating to /assessment/sales. Observed in prior session screenshots.
- Time-to-first-token: not measured on corrected deploy

### Build B
- Screenshots: not captured — subagent deviated from protocol
- Observation: Build B agent panel is a collapsible right-side drawer, not a fixed sidebar. Whether it persists across layer navigation was not confirmed.

---

## TEST 5 — Re-Roll Buttons

### Build A
- Screenshots: `a_t5_narrative_reroll.png`
- Executive narrative re-roll: Button present on hover over "Vento Assessment" card (the AI narrative block). Re-roll triggers but result depends on agent being functional. On pre-fix deploy: button visible, click registered, no new content generated (tied to model 404).
- Agent panel per-message re-roll: Re-roll (RotateCcw) button present on hover over assistant message bubbles. Confirmed in prior session.

### Build B
- Screenshot: `b_t5_narrative_hover.png`
- Executive narrative re-roll: Subagent noted a click was made at the narrative area. Whether a re-roll button was found vs. the click was a miss — not confirmed definitively. No re-generation screenshot captured.
- Agent panel per-message re-roll: Not captured.

---

## TEST 6 — Migration Drafts Layer

### Build A
- Screenshots: `a_t6_migration.png`, `a_t6_migration_with_agent.png`
- **Page contents:**
  - Left sidebar: searchable artifact list with 20 artifacts (names: QCP_SegmentDiscount, QCP_BundlePricingAdjustment, QCP_TaxPreCalculation, QCP_BankersRounding, QCP_RecursiveSubscriptionCalc [Manual Review + Manual Design badges], CPQ_CostPlusPricing, CPQ_CrossLineDiscountValidator, CPQ_AmendmentService, CPQ_ApprovalRouting, PR_VolumeBasedDiscount, PR_CustomerTierPriceOverride, PR_PromotionalDiscountDateRange, PR_MultiCurrencyAdjustment, PrdRule_BlockStarterWithEnterprise, and others). Severity badges (High/Medium/Low), Manual Review and Manual Design flags visible.
  - Center panel: CPQ Source code view (full JavaScript), with "Diff" and "Bulk Draft" and "Mark for Review" and "Re-generate" action buttons at top.
  - Right panel: "Plain Language" pane — Business Purpose, What This Code Does, Dependencies listed. Plus "RCA Draft" pane with tabs: AI-Generated, Pricing Procedure, **Draft**, **Reasoning** tabs visible.
  - "View evidence trail" link present at bottom of Plain Language pane.
  - 3-pane layout: artifact list | source code | plain language + RCA draft

### Build B
- Screenshot: `b_t6_migration.png`
- **Page contents:**
  - Page title: visible (specific content obscured in screenshot angle)
  - Subagent description: "The page contains a placeholder for AI migration drafts which is currently empty." No artifact list observed. No code viewer pane. No Draft/Reasoning/Tests tabs.
  - Build B subagent noted: "AI Assistant panel on the right shows a 404 error (model not found: claude-sonnet-4-5)"

---

## TEST 7 — Implementation Layer

### Build A
- Screenshots: pending (not captured in available screenshots)
- From prior session: FindingCard list with severity/statement/technical detail/recommended action. Evidence drawer confirmed with 3 levels: Summary, Detailed, Raw tabs.

### Build B
- Screenshots: `b_t7_impl.png`, `b_t7_impl_section.png`
- **Page contents:** Implementation page has a left sidebar with "Sections" (not individual findings). Sections observed: Data Migration, Custom Code. Clicking a section shows content in the main area. No individual FindingCard list visible. No "View supporting evidence" link found in the test. Evidence drawer with Summary/Detailed/Raw tabs: NOT found.

---

## ADDITIONAL OBSERVATIONS (not on test list)

**Build A:** The Vercel environment variable `VITE_AGENT_MODEL` was set to `claude-sonnet-4` in the Vercel project dashboard, overriding the local `.env` value. This caused all agent calls to fail with a 404 on the first test run. Fixed by removing and re-adding the variable (now `claude-sonnet-4-5`) and redeploying.

**Build B:** The agent panel shows a `claude-sonnet-4-5` 404 error on the Migration layer. This suggests Build B's proxy or client is also sending an incorrect model ID, despite `VITE_AGENT_MODEL=claude-sonnet-4-5` being set as an env var. Whether Build B uses the same proxy architecture (server-side key) or a different approach was not confirmed.

**Build B:** The page title/org name is "Acme Cloud Holdings (sample)" vs. Build A's "TechFlow Solutions". These are different assessment payloads, which means narrative content, data points, and agent responses are not directly comparable on content — only on structure and behavior.
