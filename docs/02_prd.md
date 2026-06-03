# Product Requirements Document (PRD)

Version: 1.1

Status: Locked

---

# Product

Salon Rewards

Platform:
PWA (Web App)

Users:
Salon Owner

Device:
Single Active Device

---

# Goal

Allow salon owners to:

- Track customers
- Give rewards
- Redeem rewards
- Complete billing quickly

Target:

Visit Completion ≤ 12 sec

---

# Navigation

Home

Transactions

➕

Insights

More

Customer tab removed.

---

# Authentication

Flow:

Open

↓

Logged In
→ Dashboard

Else

Phone

↓

OTP

↓

Setup

↓

Dashboard

Rules:

- OTP only first login
- Session persists
- No password
- Single device

---

# Setup Flow

Step 1

Shop Name

Required

---

Step 2

Reward Rules

Owner sets:

Reward %

Max Redeem %

Rules:
- Not global
- Editable later
- Future visits only

---

Step 3

Services

Owner can:

Add

Edit

Remove

Historical transactions unchanged.

---

# Dashboard

Show:

Today Revenue

Customers

Recent Transactions

Primary CTA:

Add Visit

---

# Visit Flow

Visit

↓

Phone

↓

Search Customer

↓

Existing?

YES

↓

Service

↓

Reward

↓

Payment

↓

Complete

If Customer Not Found:

Create

Phone

Name (Optional)

---

# Services

Predefined services.

Fixed pricing.

Allow:

Other

Fields:

Amount

Billing auto-calculates.

---

# Rewards

Wallet tied to:

Phone Number

Reward Earn:

Final Paid × Reward %

Reward Redeem:

Manual Input

Rules:

Reward Used

≤

MIN(
Reward Balance,
Redeem Limit
)

No quick chips.

---

# Reward Verification

Condition:

Reward Used > 0

Flow:

Redeem & Complete

↓

OTP Bottom Sheet

↓

Verify

↓

Complete

OTP:

4 digits

If unavailable:

Continue Without Reward

System:

Reward → 0

Complete normally.

---

# Payments

Allowed:

Cash

Online

No split payments.

---

# Completion

Save

↓

Reward Update

↓

Notification

↓

Dashboard

No success screen.

Show:

Completed

1 second

---

# Transactions

Recent first.

Card:

Bill

Reward

Paid

Payment

Tap:

View Details

Edit:

≤ 5 min

No delete.

No reward balance.

---

# Insights

Today only.

Cards:

Revenue

Customers

Rewards

Revenue:

Final Paid

No charts.

---

# More

Quick Actions:

Services

Reward Rules

Shop

Settings:

Notifications

Help

Logout

---

# States

Loading:

Searching

Sending OTP

Saving

Errors:

Offline

Invalid OTP

Not Found

Empty:

No Visits

No Transactions

---

# Install Flow

PWA

Install after usage.

---

# Security Rules

Never trust client reward calculations.

OTP required for redemption only.

Backend validates:

Reward

Balance

Payment

---

# Explicitly Out Of Scope

No customer app

No staff roles

No subscriptions

No analytics charts

No AI

No refunds

No draft billing