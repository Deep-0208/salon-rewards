# Graph Report - salon-rewards-v2  (2026-06-03)

## Corpus Check
- 54 files · ~14,027 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 371 nodes · 342 edges · 42 communities (33 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Product Brief` - 12 edges
3. `Purpose` - 6 edges
4. `Login Page` - 6 edges
5. `Setup Page` - 6 edges
6. `scripts` - 5 edges
7. `CustomerData` - 4 edges
8. `ServiceItem` - 4 edges
9. `BillingStepProps` - 3 edges
10. `paths` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Login Page` --conceptually_related_to--> `Product Requirements Document (PRD)`  [INFERRED]
  app/login/page.tsx → docs/02_prd.md
- `Setup Page` --conceptually_related_to--> `Product Requirements Document (PRD)`  [INFERRED]
  app/setup/page.tsx → docs/02_prd.md
- `Login Page` --conceptually_related_to--> `UI/UX Specification`  [INFERRED]
  app/login/page.tsx → docs/03_ui_spec.md
- `Setup Page` --conceptually_related_to--> `UI/UX Specification`  [INFERRED]
  app/setup/page.tsx → docs/03_ui_spec.md
- `Button Component` --conceptually_related_to--> `Premium Design System Guide`  [INFERRED]
  components/login/Button.tsx → docs/design.md

## Hyperedges (group relationships)
- **User Onboarding and Verification Flow** — page_login, page_setup, comp_phone_input, comp_otp_input, comp_step_indicator [INFERRED 0.95]
- **Reusable UI Core Components** — comp_button, comp_text_input, comp_brand_header [INFERRED 0.85]

## Communities (42 total, 9 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (7): DEFAULT_SERVICES, Service, Step, Service, ServiceChipsProps, StepIndicatorProps, TextInputProps

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (4): ButtonProps, OTPInputProps, Step, PhoneInputProps

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (21): dependencies, next, react, react-dom, devDependencies, eslint, eslint-config-next, tailwindcss (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.27
Nodes (10): Brand Header Component, OTP Input Component, Phone Input Component, Service Chips Selection, Step Progress Indicator, Text Input Component, Product Requirements Document (PRD), UI/UX Specification (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (28): 10. Spacing, 11. Components, 12. Login, 13. First-Time Setup, 14. Dashboard, 15. Add Visit, 16. Services, 17. Rewards (+20 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (3): inter, metadata, viewport

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (27): API Pattern, Architecture, Authentication, Backend, Build Constraints, Business Logic, Component Rules, Components (+19 more)

### Community 16 - "Community 16"
Cohesion: 0.07
Nodes (26): Accessibility, Build Constraints, Color System, Components, Dashboard, Design Goal, Design Principles, Device Target (+18 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (25): Accessibility Rules, AI Execution Rules, Backend Rules, Build Philosophy, Build Rules, Component Rules, Core Principle, Deployment Rules (+17 more)

### Community 18 - "Community 18"
Cohesion: 0.08
Nodes (25): API Rules, Build Specification, Build Strategy, Deliverables, Final Rule, Firebase Implementation, Objective, Output Format (+17 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (10): BottomNavProps, tabs, EmptyStateProps, MetricCardProps, DashboardPage(), DashboardState, getGreeting(), MOCK_METRICS (+2 more)

### Community 20 - "Community 20"
Cohesion: 0.10
Nodes (20): Authentication, Completion, Dashboard, Explicitly Out Of Scope, Goal, Insights, Install Flow, More (+12 more)

### Community 21 - "Community 21"
Cohesion: 0.21
Nodes (7): BillingStepProps, CustomerData, CustomerStepProps, VisitStep, POPULAR_SERVICES, ServiceItem, ServicesStepProps

### Community 22 - "Community 22"
Cohesion: 0.15
Nodes (12): Core Value, Main Workflow, Out Of Scope, Platform, Principles, Problem, Product Brief, Product Name (+4 more)

### Community 23 - "Community 23"
Cohesion: 0.15
Nodes (12): Claude Skill Specification, Component Rules, Design Direction, Forbidden Aesthetics, Prompt Template, Quality Gate Per Screen, Screen Generation Order, Skill Location (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (10): Commit, Next Step, Purpose, Rollback, Step 1 — Summarize, Step 2 — Validate Completion, Step 3 — Prepare Commit, Step 4 — Recommend Next Task (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.18
Nodes (10): Build Order, Purpose, Recommended Next Task, Risks, Step 1 — Understand, Step 2 — Analyze Structure, Step 3 — Risk Review, Step 4 — Build Order (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.40
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 27 - "Community 27"
Cohesion: 0.50
Nodes (3): code:block1 (/graphify                                             # full), /graphify, Usage

## Knowledge Gaps
- **272 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+267 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 3 inferred relationships involving `Login Page` (e.g. with `Product Requirements Document (PRD)` and `UI/UX Specification`) actually correct?**
  _`Login Page` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _272 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._