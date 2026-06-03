# Build Rules

Version: 2.0

Status: Locked

Purpose:

These rules override AI assumptions.

AI must follow these rules before generating code.

---

# Core Principle

Build only requested scope.

Never expand features.

Never redesign workflow.

Never change architecture.

---

# Build Philosophy

Simple

Predictable

Secure

Maintainable

Ship Fast

---

# AI Execution Rules

Before generating ANY screen or component:

Step 1 — Read these docs:

01_product_brief.md

02_prd.md

03_ui_spec.md

04_tech_stack.md

07_claude_skill.md

Step 2 — Invoke Claude Skill:

/mnt/skills/public/frontend-design/SKILL.md

Step 3 — Then generate.

Do not assume requirements.

Do not skip the skill read.

---

# Scope Rules

Only build:

Requested screen

Requested feature

Requested module

Never generate future features.

---

# Forbidden Behavior

Do NOT:

Add screens

Add dashboard widgets

Add customer app

Add subscriptions

Add analytics

Add notifications

Add roles

Add AI

Add reports

Add charts

---

# Workflow Protection

Do not change:

Visit Flow

Reward Flow

OTP Flow

Navigation

Bottom tabs

Screen order

---

# UI Rules

UI must:

Follow 03_ui_spec.md

Follow 07_claude_skill.md

Use Claude frontend-design Skill

No redesign.

No decorative additions.

No hidden interactions.

---

# State Rules

State must live in:

Zustand

Do not move state into:

components

pages

firebase

No duplicated state.

---

# Backend Rules

Frontend:

Display

Request

Validate UX

Backend:

Calculate

Save

Update

Never trust frontend values.

---

# Reward Rules

Reward Earn:

Final Paid × Reward %

Reward Redeem:

Manual input

Validate:

Balance

Redeem %

OTP

Reward updates:

Backend only.

---

# OTP Rules

OTP required only for:

Reward Redemption

Login OTP:

First login only

Never mix flows.

---

# Firebase Rules

Never:

Write directly from UI

Expose secret logic

Use admin SDK in frontend

Store secure values client-side

---

# Component Rules

Each component:

Single responsibility

Max:

250 lines

Split when needed.

---

# Store Rules

One domain.

Example:

authStore

visitStore

rewardStore

transactionStore

No mega stores.

---

# Service Rules

Services:

Pure logic only

No UI

No side effects

---

# Error Handling Rules

Every async action must have:

Loading

Success

Error

Retry

---

# Security Rules

Never:

Trust payment amount

Trust reward amount

Trust customer wallet

Trust client OTP

Trust browser storage

Everything critical:

Backend verified.

---

# Performance Rules

Optimize:

Mobile first

Avoid rerenders

Lazy load

Cache safely

---

# Accessibility Rules

Large touch targets (min 44px)

Readable text (min 13px)

Keyboard safe

Visible errors

---

# Git Rules

Small commits

Examples:

feat/auth

feat/reward

fix/otp

Avoid:

final-final-v4

---

# Documentation Rules

After feature generation:

Generate:

README updates

Comments

Assumptions

---

# Testing Rules

Generate:

Unit tests

Critical flow tests

OTP tests

Reward tests

---

# Deployment Rules

Build must pass:

Lint

Type check

No warnings

---

# Final Rule

If conflict exists:

Follow:

PRD

↓

UI Spec

↓

Claude Skill Spec

↓

Tech Stack

↓

Build Rules

↓

Generated code
