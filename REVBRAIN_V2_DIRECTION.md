# RevBrain v2 — Product Direction

## Vision

RevBrain v2 repositions the product from a one-time migration tool into an **AI-first Revenue Operations platform**. Migration becomes the onboarding ramp — the process through which RevBrain captures deep Q2C (Quote-to-Cash) knowledge — while **Ongoing Operations** is the AI-first operating model that follows.

## Core Concepts

### Stage → Role → Command Center → Workspace

The top-level information architecture will be restructured around four hierarchy levels:

| Level            | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| **Stage**        | The lifecycle phase the customer is in                             |
| **Role**         | The persona operating within that stage (e.g., RevOps Analyst)     |
| **Command Center** | The role's primary workspace with dashboards and agent panels   |
| **Workspace**    | Focused task views within a command center                         |

### Three Stages

1. **Migration** — Onboarding through CPQ → ARM migration. Captures org knowledge, pricing logic, approval chains, and business rules. Acts as the "learning phase" for RevBrain's knowledge engine.

2. **Ongoing Operations** — The steady-state AI-first operating model after migration. Agents assist with pricing exceptions, deal approvals, revenue forecasting, and operational tasks.

3. **Knowledge Engine** — Cross-cutting layer that powers both stages. Stores institutional Q2C knowledge extracted during migration and continuously enriched during operations.

## Primary Demo Use Case

**Enterprise Discount Approval / Pricing Exception**

This use case demonstrates:
- An agent-assisted approval workflow for non-standard pricing
- Knowledge-grounded recommendations based on historical deal data
- Multi-role collaboration (Sales Rep → RevOps Analyst → Approver)
- Real-time audit trail and compliance checks

## Build Approach

- **Frontend-first** with mock data and simulated agents
- No backend/API integration in the demo phase
- Existing MigrateIQ UI/design components may be reused where appropriate
- The old assessment-centric IA (Scan → Assess → Build Case → Execute) will be replaced with the Stage-based hierarchy
- Old pages are preserved in the codebase during transition — do not delete yet

## What This Repo Contains

This project was duplicated from the MigrateIQ demo (`migrateiq-demo/`). It retains all original routes, components, and mock data as a starting point. The renaming from MigrateIQ → RevBrain has been applied to:
- Package metadata
- HTML title and meta tags
- TopBar, AgentPanel, and onboarding overlays
- Agent system prompt identity
- Page-level labels and data file references

The Vento/Q visual identity (logo, accent colors) is preserved for now.
