# UI / UX Specification

Version: 2.0

Status: Locked

Tool:
Anthropic Artifacts + Claude frontend-design Skill
(/mnt/skills/public/frontend-design/SKILL.md)

---

# Design Goal

Build a salon SaaS that feels:

Fast

Minimal

Professional

Not corporate.

Not fancy.

Not fintech.

Owner should feel:

Open

↓

Bill

↓

Done

---

# Design Principles

Speed > Decoration

Large touch targets

Minimum typing

Maximum clarity

Reduce screen count

Avoid modal overload

---

# Device Target

Primary:

Android phones

Width:

360–430 px

Secondary:

Desktop responsive

Mobile First

PWA Ready

---

# Visual Style

Style:

Clean

Soft

Professional

Modern

Minimal

Do NOT use:

Glassmorphism

Neomorphism

Heavy shadows

Gradients everywhere

Over-animation

---

# Color System

Primary Accent:
#4F46E5

Background (Page):
#F8FAFC

Cards:
#FFFFFF

Text (Primary):
#111827

Success:
#10B981

Warning:
#F59E0B

Error:
#EF4444

Rules:

Use only one accent color (#4F46E5).

No rainbow dashboards.

No gradient backgrounds.

---

# Typography

Font:

Inter

Fallback:

System Font

Rules:

Max 3 sizes

Large

Medium

Small

Avoid tiny text

---

# Radius

Cards:
16px

Buttons:
16px

Inputs:
14px

Bottom Sheets:
20px

---

# Spacing

Base:

8px

Scale:

8
16
24
32
40

Never random spacing.

---

# Components

Use:

Cards

Bottom Sheets

Inputs

Tabs

Buttons

Badges

Toasts

Skeleton Loading

Do not use:

Tables

Dropdown-heavy UI

Complex forms

Nested modals

---

# Navigation

Bottom Navigation

Home

Transactions

➕

Insights

More

Persistent.

Removed:

Customer tab

Sidebar

Floating buttons

---

# Screen Rules

Maximum:

1 primary action

per screen.

---

# Login

Simple.

Phone

Continue

OTP

No illustration.

No password.

Session persists after first login.

---

# Setup

Multi step.

Shop

↓

Rewards

↓

Services

↓

Done

Must complete in under 60 seconds.

Suggested services available (Haircut ₹150, Beard ₹80, Facial ₹400).

---

# Dashboard

Large:

Add Visit (primary CTA, #4F46E5)

Show:

Revenue Today (large number)

Customers Today (large number)

Recent Transactions (last 5)

No charts.

---

# Visit Flow

Phone

↓

Customer

↓

Services

↓

Rewards

↓

Payment

↓

Complete

Single vertical flow.

Target: ≤12 seconds end to end.

---

# Services Selection

UI: Tap-to-select pill buttons.

NOT dropdown.

Multiple selection allowed.

Live running total shown.

"Other" expands inline amount input.

---

# Rewards

Show:

Available Reward Balance

Reward Used (manual input)

Max Redeem Limit

Final Pay

Manual input only.

No slider.

No chips.

If reward used > 0:

Open OTP bottom sheet.

---

# OTP

Bottom Sheet

4 digit

Auto focus

Auto advance

Do not navigate away.

"Continue Without Reward" escape option always visible.

---

# Transactions

Card Layout

No table.

Card shows:

Customer name

Bill amount

Reward used

Amount paid

Payment method

Tap → bottom sheet detail view.

Edit allowed ≤ 5 minutes only.

No delete.

---

# Insights

Today only.

3 cards:

Revenue (= Final Paid)

Customers

Rewards

No charts.

Tap card → bottom sheet breakdown.

---

# More

Quick Actions:

Services

Reward Rules

Shop (edit name)

Settings:

Notifications

Help

Logout

Minimal list. No nested navigation.

---

# States

Loading:

Skeleton screens (not spinners)

Errors:

Inline (not modal)

Empty:

Friendly copy

Offline:

Top banner strip + retry

---

# Motion

Fast

150–250ms

Subtle only.

No confetti.

No heavy transitions.

---

# Accessibility

Large tap areas (min 44px)

Readable text (min 14px body)

Visible states (focus, error, disabled)

Thumb-friendly layout

---

# Build Constraints

No hidden screens

No invented pages

No feature expansion

Follow PRD strictly

Read 02_prd.md before generating any screen.

Always invoke Claude frontend-design Skill before generating UI.
