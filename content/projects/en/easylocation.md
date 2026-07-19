---
title: "EasyLocation — rental management SaaS"
slug: "easylocation"
date: "2026-07-19"
description: "French rental management for independent landlords: leases, inventories, rent receipts, payments — with an AI assistant that runs locally."
techStack: ["FastAPI", "Angular", "PostgreSQL", "Stripe", "Ollama", "Kubernetes"]
demo: "https://easylocation.fr"
featured: true
lang: "en"
---

## The problem

Independent French landlords juggle Word templates, spreadsheets and legal
obligations (ALUR-compliant leases, inventories, rent receipts, IRL rent
revision). Existing software targets agencies, not the individual managing
two or three properties.

## What I built

A complete SaaS, solo, from the first database migration to live Stripe
payments:

- **Compliance built in**: conforming leases, digital inventories, PDF rent
  receipts and certificates, IRL revision calculation.
- **Local AI assistant**: an in-app chat grounded on the landlord's data —
  the model runs on my own cluster; data never leaves it.
- **Payments**: Stripe subscriptions live in production.

## Behind the scenes

It is also where I hold the highest engineering bar: 60+ database
migrations, an end-to-end test suite that exercises real production every
night, and a deployment that verifies the shipped commit automatically and
rolls itself back on any mismatch.
