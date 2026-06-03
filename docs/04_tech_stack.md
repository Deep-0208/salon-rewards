# Technical Stack Specification

Version: 1.0

Status: Locked

Purpose:

This document defines the exact implementation stack.

AI must NOT replace technologies.

No extra frameworks.

---

# Architecture

Frontend

↓

State

↓

Backend

↓

Database

↓

Functions

↓

Deploy

---

# Frontend

Framework:

Next.js

Version:

Latest Stable

Router:

App Router

Language:

TypeScript

Rules:

Strict mode enabled.

No Pages Router.

No JavaScript.

---

# Styling

Framework:

Tailwind CSS

Rules:

Utility-first.

No CSS frameworks.

No Bootstrap.

No Material UI.

Prefer:

Tailwind classes

Avoid:

Inline styles.

---

# Components

Library:

shadcn/ui

Allowed:

Button

Input

Dialog

Sheet

Card

Toast

Tabs

Badge

Separator

Avoid:

Custom component libraries.

---

# State Management

Library:

Zustand

Rules:

One store per domain.

Example:

stores/

auth/

visit/

reward/

transaction/

Avoid:

Global giant stores.

No Context API.

No Redux.

---

# Backend

Platform:

Firebase

Services:

Authentication

Firestore

Cloud Functions

Storage

Do NOT use:

Realtime Database

Analytics

Messaging

Remote Config

---

# Authentication

Method:

Phone OTP

Rules:

Single active device.

Session persistence.

OTP only at login.

Reward redemption uses custom verification flow.

---

# Database

Database:

Firestore

Rules:

Document-oriented.

Denormalized where helpful.

Avoid joins.

---

# Firestore Collections

shops

customers

transactions

services

reward_wallet

reward_logs

settings

---

# Data Rules

Frontend:

Read

Request

Display

Backend:

Validate

Write

Calculate

Never trust frontend calculations.

---

# Business Logic

Reward calculations:

Backend only.

Wallet updates:

Backend only.

OTP verification:

Backend only.

Transactions:

Immutable.

---

# API Pattern

UI

↓

Hooks

↓

Services

↓

Firebase

Never call Firebase directly from components.

---

# Deployment

Provider:

Vercel

Environment:

Development

Preview

Production

---

# Environment Variables

Use:

.env.local

Never expose:

Secrets

Service keys

Private tokens

---

# Folder Structure

app/

components/

stores/

hooks/

services/

lib/

types/

constants/

docs/

public/

---

# Component Rules

Max:

250 lines

Split if larger.

---

# Store Rules

Max:

200 lines

Split by feature.

---

# Naming Rules

Components:

PascalCase

Hooks:

camelCase

Stores:

camelCase

Files:

kebab-case

---

# Forms

Use:

react-hook-form

Validation:

zod

---

# Date Handling

Use:

date-fns

Avoid:

manual parsing.

---

# Error Handling

Always:

Loading

Error

Empty

Success

states.

---

# Logging

Console logs:

development only.

Remove in production.

---

# Testing

Generate:

Unit tests

Integration tests

Critical flow tests

---

# Performance

Lazy load heavy modules.

Prevent unnecessary rerenders.

Optimize mobile.

---

# Security

Never:

Trust client reward amount

Store secrets in frontend

Calculate wallet client-side

Bypass OTP

Expose admin access

---

# Build Constraints

Do not change architecture.

Do not introduce new libraries.

Follow PRD strictly.