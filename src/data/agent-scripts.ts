export interface DemoScript {
  trigger: string | RegExp;
  response: string;
}

export const DEMO_SCRIPTS: DemoScript[] = [
  {
    trigger: /is.+(actually|really) using CPQ/i,
    response: `**84 of 112 licenses active (75% adoption)**, growing +16 over 24 months.

- **Enterprise Sales** — 12 users, daily
- **Renewals** — 28 users, weekly
- **Deal Desk** — 6 users, daily

Not shelfware. Adoption accelerating since the 2024 SmartBytes launch.`,
  },
  {
    trigger: /how much quoting/i,
    response: `**10,240 quotes over 24 months**, 2,100 in the last 6 months, **8.5-day average cycle**.

Volume is well above the migration ROI threshold. Recent uptick correlates with the SmartBytes product line launch (mid-2024).`,
  },
  {
    trigger: /what.+(sell|products)/i,
    response: `**176 products in 12 families.** 19 bundle-capable products drive **47% of recent volume** (SmartBytes, launched mid-2024).

87 products dormant 6+ months — Phase 4 rationalization candidates, not Phase 1 scope.`,
  },
  {
    trigger: /complex.+(org|overall|migration)/i,
    response: `**26/100 — Low tier.** Breakdown:

- **Pricing**: 36 · **Catalog**: 32 · **Custom code**: 22
- **Data**: 28 · **Integrations**: 30 · **Deprecated**: 18

5 QCP scripts + 4 plugin interfaces = ~70% of architect work. Everything else maps cleanly to ARM.`,
  },
  {
    trigger: /biggest.+(risk|concern|worry)/i,
    response: `Three risks:

1. **SmartBytes filter rule** — no ARM equivalent, needs custom architect design
2. **4 plugin interfaces** — POC validation required before Phase 1 sign-off
3. **Historical quotes** (8,140 records) — likely SOX compliance requirements

Secondary: avoid **Q1 renewal peak** (Feb-March) for cutover.`,
  },
  {
    trigger: /how long|timeline|duration/i,
    response: `**14–18 weeks, 4 phases:**

| Phase | Weeks | Effort |
|---|---|---|
| 1 — Active Quoting | 3–4w | Medium |
| 2 — Renewals | 4–5w | Medium-High |
| 3 — Data Migration | 3–6w | High |
| 4 — Legacy Cleanup | 2–3w | Variable |

Phase 1 realistically **4–6 weeks** with plugin POC (+1.5w) and SmartBytes UAT (+1w). Avoid Feb-March cutover.`,
  },
  {
    trigger: /strong candidate|why.+migrate|business case/i,
    response: `Strong candidate:

- **Active usage** — 84 users, 75% adoption, growing
- **Revenue-critical** — $147M closed-won over 24 months
- **Low complexity** — 26/100, 87% maps to ARM at 96% confidence

Risk is concentrated (SmartBytes filter + plugin POCs) — architect effort is predictable. **Proceed with Caution** verdict.`,
  },
  {
    trigger: /summarize|summary|executive/i,
    response: `**Vector Systems** — 84 active users, $147M revenue, **26/100 complexity** (Low). 87% maps cleanly to ARM.

**Key risk:** SmartBytes filter rule (no ARM equivalent) + 4 plugin interfaces needing POC.

**Plan:** 4 phases, 14–18 weeks. Phase 1 targets active quoting (3–4w). Avoid Q1 renewal window. SOW should gate on plugin POC and SmartBytes filter.`,
  },
  {
    trigger: /phase 1|first phase|what.+scope/i,
    response: `**Phase 1 — Active Quoting:**

- Core catalog (176 products), 20 pricing rules, 22 discount schedules
- Basic approval workflows
- ~340 active quotes from last 12 months

**Excluded:** historical archive (→ Phase 3), renewals (→ Phase 2), legacy bundles (→ Phase 4).

**Duration:** 3–4w baseline, **4–6w realistic** with plugin POC (+1.5w) and SmartBytes UAT (+1w). Client commitment ~25 hrs/week.`,
  },
  {
    trigger: /dependencies|block|blocker/i,
    response: `**Phase 1 blockers:**

1. **ARM License** — not yet detected in scan
2. **Plugin POC** — 4 interfaces need architect validation
3. **SmartBytes filter** — custom design required
4. **SF Billing v232.3.0** — must survive migration (revenue recognition)
5. **MockAdapter v1.4.0** — suspicious integration, needs investigation

Plugin POC can run parallel to standard mapping, compressing timeline from 6w toward 4w.`,
  },
];
