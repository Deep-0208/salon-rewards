# Build Specification

Version: 1.0

Status: READY TO BUILD

Target:

Generate production-grade MVP.

Strictly follow:

01_product_brief.md

02_prd.md

03_ui_spec.md

04_tech_stack.md

05_build_rules.md

Do not invent features.

---

# Project

Salon Rewards

Platform:

PWA

Architecture:

Next.js

↓

Zustand

↓

Firebase

↓

Firestore

↓

Cloud Functions

↓

Vercel

---

# Objective

Build a mobile-first salon loyalty SaaS.

Primary goal:

Complete visit in under 12 seconds.

---

# Build Strategy

Generate in modules.

Do NOT generate entire app at once.

Order:

Auth

↓

Setup

↓

Dashboard

↓

Visit

↓

Reward

↓

Transactions

↓

Insights

↓

More

---

# Deliverables

Generate:

Pages

Components

Stores

Services

Types

Hooks

Firebase integration

Tests

Documentation

---

# Project Structure

app/

components/

stores/

hooks/

services/

lib/

types/

constants/

public/

docs/

---

# Phase 1 — Initialize App

Generate:

Next.js

TypeScript

Tailwind

shadcn

Zustand

Firebase

PWA

Configure:

ESLint

Prettier

Environment setup

No feature implementation.

Output:

Running shell.

---

# Phase 2 — Authentication

Build:

Phone login

OTP verification

Session persistence

Single device support

First login detection

Redirect:

Setup

↓

Dashboard

Do not build passwords.

---

# Phase 3 — Setup

Screen 1

Shop Name

Screen 2

Reward Rules

Screen 3

Services

Persist:

Shop configuration

No onboarding animations.

---

# Phase 4 — Dashboard

Build:

Revenue

Customers

Transactions

Add Visit CTA

Bottom Navigation

Empty states

Loading states

No charts.

---

# Phase 5 — Visit Flow

Build:

Phone search

Customer lookup

Create customer

Service selection

Reward section

Payment

Complete flow

Target:

≤12 sec

---

# Phase 6 — Reward Engine

Build:

Reward earn

Reward redeem

Manual input

Redeem limits

Wallet updates

Rules:

Reward Earn

=

Final Paid

×

Reward %

Validation:

Backend only.

---

# Phase 7 — OTP Redemption

Trigger:

Reward > 0

Build:

Bottom Sheet

4 digit OTP

Verify

Continue Without Reward

Reset reward if cancelled

No navigation.

---

# Phase 8 — Transactions

Build:

List

Card

Details

Edit ≤ 5 min

No delete

Snapshot history

---

# Phase 9 — Insights

Build:

Revenue

Customers

Rewards

Today only

No charts

Bottom sheet details

---

# Phase 10 — More

Build:

Services

Reward Rules

Shop

Notifications

Help

Logout

---

# Firebase Implementation

Collections:

shops

customers

transactions

services

reward_wallet

reward_logs

settings

Generate:

Indexes

Rules

Models

Repository layer

---

# Zustand Implementation

Stores:

authStore

visitStore

rewardStore

transactionStore

No global store.

---

# API Rules

Components

↓

Hooks

↓

Services

↓

Firebase

No direct DB calls.

---

# Security

Reward validation:

Backend

OTP:

Backend

Wallet:

Backend

Transactions:

Immutable

Never trust frontend.

---

# UX Requirements

Follow:

03_ui_spec.md

Use:

Bottom sheets

Cards

Inline validation

Skeleton loading

Do not redesign.

---

# Quality Gates

Before marking complete:

Build passes

Lint passes

Types pass

No warnings

No TODO

No placeholder data

---

# Testing

Generate:

Unit tests

OTP tests

Reward tests

Critical flow tests

---

# Output Format

For every module provide:

What was built

Files created

Assumptions

How to run

Next steps

---

# Final Rule

If uncertain:

Prefer simplicity.

Do not overengineer.

Ship MVP.