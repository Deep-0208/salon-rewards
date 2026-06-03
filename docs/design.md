# Salon Rewards — Design Specification
Version: 1.0
Status: Locked
Platform: PWA (Mobile First)

---

# 1. Design Goal

Build a salon rewards SaaS that feels:

Fast

Minimal

Professional

Trustworthy

Daily-use ready

The UI should feel:

Open
↓

Bill
↓

Done

The owner should complete a visit in under 12 seconds.

---

# 2. Product Principles

Fast > Feature Rich

Simple > Beautiful

Real Workflow > Fancy Features

Security > Convenience

Reduce clicks.

Reduce typing.

Reduce thinking.

---

# 3. Target Users

Primary:
Salon Owners

Secondary:
Receptionists

Market:
Indian local salons

User Characteristics:

- Uses phone all day
- Limited patience
- Wants speed
- Does not want setup complexity

---

# 4. Device Targets

Primary:

Android

Width:
360–430 px

Secondary:

Desktop responsive

Mode:

Mobile First

PWA Ready

---

# 5. Navigation

Persistent Bottom Navigation

🏠 Home

📋 Transactions

➕

📊 Insights

☰ More

Removed:

✗ Customer Tab

✗ Sidebar

✗ Floating Buttons

---

# 6. Visual Language

Style:

Modern

Minimal

Soft

Professional

Premium

Do NOT use:

Glassmorphism

Neomorphism

Heavy Shadows

Complex Charts

Over-animation

Corporate Dashboard style

---

# 7. Color System

Primary:
#4F46E5

Background:
#F8FAFC

Cards:
#FFFFFF

Text:
#111827

Success:
#10B981

Warning:
#F59E0B

Error:
#EF4444

Rules:

Use only one accent color.

No rainbow dashboards.

---

# 8. Typography

Font:

Inter

Fallback:

System Font

Sizes:

Large

Medium

Small

Rules:

Max 3 text sizes.

Avoid tiny labels.

---

# 9. Radius

Cards:
16

Buttons:
16

Inputs:
14

Bottom Sheets:
20

---

# 10. Spacing

Base:

8

Scale:

8
16
24
32
40

Never random spacing.

---

# 11. Components

Allowed:

Cards

Inputs

Buttons

Bottom Sheets

Toasts

Badges

Tabs

Skeleton Loading

Avoid:

Tables

Dropdown-heavy UI

Nested Modals

Complex Forms

---

# 12. Login

Flow:

Phone
↓

OTP
↓

Dashboard

Rules:

OTP first login only

Single active device

No password

Session persists

No illustrations

Primary CTA:
Continue

---

# 13. First-Time Setup

Step 1

Shop Name

↓

Step 2

Reward Rules

Reward %

Max Redeem %

↓

Step 3

Services

Example:

Haircut ₹150

Beard ₹80

Facial ₹400

Requirements:

Finish ≤60 sec

Suggested services available

---

# 14. Dashboard

Show:

Revenue Today

Customers Today

Recent Transactions

Primary CTA:

➕ Add Visit

Rules:

No charts

No analytics overload

Large numbers

---

# 15. Add Visit

Main workflow.

Flow:

Phone

↓

Search Customer

↓

Services

↓

Rewards

↓

Payment

↓

Complete

Rules:

Phone required

Name optional

Single vertical flow

---

# 16. Services

Selection UI:

Buttons

NOT dropdown

Example:

✂ Haircut ₹150

🧔 Beard ₹80

💇 Hair Spa ₹500

✨ Facial ₹400

➕ Other

Rules:

Tap to select

Multiple allowed

Live total

Other expands inline

---

# 17. Rewards

Show:

Available Reward

Reward Used

Max Redeem

Final Pay

Reward Calculation:

Reward Earned

=

Final Paid × Reward %

Rules:

Manual input only

No slider

No chips

---

# 18. Reward Verification

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

Bottom Sheet:

4 digit OTP

Continue Without Reward

If Continue:

Reward resets

Bill recalculates

No navigation

---

# 19. Payment

Allowed:

Cash

Online

Removed:

Split Payment

Wallet

Draft Billing

---

# 20. Transactions

Recent First

Card Layout

Show:

Customer

Bill

Reward

Paid

Payment

Tap:

View Detail

Edit:
≤5 minutes

No delete

No live reward balance

---

# 21. Insights

Period:

Today only

Cards:

Revenue

Customers

Rewards

Rules:

No charts

Revenue = Final Paid

Tap opens bottom sheet

---

# 22. More

Quick Actions:

Services

Reward Rules

Shop

Settings:

Notifications

Help

Logout

Minimal list

---

# 23. States

Loading:

Searching

Sending OTP

Saving

Errors:

Offline

Invalid OTP

Customer Not Found

Empty:

No Visits

No Transactions

Offline:

Top Banner

---

# 24. Motion

150–250ms

Subtle only

Avoid:

Confetti

Heavy transitions

Fancy effects

---

# 25. Accessibility

Large touch areas

Readable text

Visible states

Thumb-friendly

---

# 26. Build Constraints

No hidden screens

No feature expansion

Follow PRD strictly

Generate UI only

Do not generate backend

---

# Final UX Goal

Owner should feel:

Open
↓

Select Service
↓

Redeem
↓

Complete

No confusion.

No training.

No friction.