# Claude Skill Specification

Version: 1.0

Status: Locked

Purpose:

This document defines how to use the Claude frontend-design Skill
when generating any screen or component for Salon Rewards.

AI must read this file before generating any UI.

---

# Skill Location

Path:
/mnt/skills/public/frontend-design/SKILL.md

Rule:

Always read the SKILL.md before writing any code or generating any screen.

No exceptions.

---

# Design Direction

Style:
Refined Minimal + Soft Professional

Tone:
Fast. Daily-use. Trustworthy. Not corporate.

Accent Color:
#4F46E5 (single accent, no exceptions)

Background:
#F8FAFC (warm white)

Cards:
#FFFFFF

Text:
#111827

The design should feel like a tool the owner opens 30 times a day —
not a marketing page, not a fintech dashboard.

---

# Forbidden Aesthetics

Do NOT generate:

Glassmorphism

Neomorphism

Heavy drop shadows

Gradient backgrounds

Confetti or celebration animations

Corporate dashboard grids

Fancy onboarding illustrations

Multiple accent colors

---

# Viewport

Primary:

Mobile (Android)

Width: 360–430px

All components must:

Fill full width

Have minimum 44px tap targets

Be thumb-friendly (bottom-half reachable)

Secondary:

Desktop responsive (min 768px)

---

# Typography

Font: Inter

Fallback: System Font

Sizes:

Large: 24px (numbers, headings)

Medium: 16px (body, labels)

Small: 13px (hints, secondary info)

Never use text below 13px.

---

# Spacing

Always use 8px base grid:

8 / 16 / 24 / 32 / 40

Never random spacing.

---

# Component Rules

Use only:

Cards (radius 16px)

Bottom Sheets (radius 20px, slides up)

Inputs (radius 14px)

Pill Buttons for service selection

Primary Button (#4F46E5, radius 16px, full width)

Badges

Toasts (1 second, bottom)

Skeleton loading (not spinners)

Do NOT use:

Tables

Dropdowns

Nested modals

Complex multi-column forms

Date pickers (not in scope)

---

# Prompt Template

Use this exact prompt structure every time you generate a screen:

---

Read these files first:
- 02_prd.md
- 03_ui_spec.md
- 07_claude_skill.md
- /mnt/skills/public/frontend-design/SKILL.md

Then generate ONLY the [SCREEN NAME] screen.

Rules:
- Mobile first, 360–430px width
- Accent: #4F46E5
- Background: #F8FAFC
- Follow 05_build_rules.md strictly
- Do not add features not in PRD
- Do not redesign the visit flow
- Do not generate backend code

Output:
- React component (TSX)
- Tailwind classes only
- shadcn/ui components only
- No inline styles

---

# Screen Generation Order

Follow 06_build_spec.md order strictly:

1. Login
2. OTP
3. Setup Step 1 (Shop Name)
4. Setup Step 2 (Reward Rules)
5. Setup Step 3 (Services)
6. Dashboard
7. Visit — Phone Search
8. Visit — Customer Found / Create
9. Visit — Services Selection
10. Visit — Rewards
11. Visit — Payment
12. OTP Redemption Bottom Sheet
13. Transactions List
14. Transaction Detail (Bottom Sheet)
15. Insights
16. More

Generate one screen at a time.

Verify each screen against PRD before proceeding.

---

# What Claude Must Never Generate

No customer-facing app screens

No staff/role management

No analytics charts

No subscription or billing UI

No AI chat or suggestions

No split payment UI

No refund screens

No report exports

No date range pickers

If a request asks for any of the above:

Refuse and refer to 02_prd.md Out Of Scope section.

---

# Quality Gate Per Screen

Before marking any screen done:

[ ] Matches PRD spec exactly
[ ] No features added beyond spec
[ ] Mobile width 360–430px verified
[ ] Accent color #4F46E5 used correctly
[ ] All touch targets ≥ 44px
[ ] Loading state implemented
[ ] Error state implemented
[ ] Empty state implemented (where applicable)
[ ] No TypeScript errors
[ ] No Tailwind warnings
