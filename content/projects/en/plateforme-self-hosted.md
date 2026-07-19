---
title: "A complete production platform, under a desk"
slug: "plateforme-self-hosted"
date: "2026-07-19"
description: "Three machines, one Kubernetes cluster, and everything a real platform needs: GitLab, CI, GitOps, monitoring, proven backups. Zero cloud."
techStack: ["Kubernetes", "k3s", "Flux", "GitLab CI", "Grafana", "Velero", "Ollama"]
featured: true
lang: "en"
---

## The bet

Self-host the entire company: the code, the CI, the databases, the production
SaaS, and the AI models. Three physical machines, a k3s cluster, and one
rule: data does not leave.

## What runs on it

- **A full GitLab** with CI runners and a container registry
- **About thirty deployed projects**, including three SaaS in production
- **End-to-end GitOps**: every change goes through git; Flux reconciles
- **Observability**: VictoriaMetrics, Loki, Grafana, alerting
- **Local LLMs** (Ollama) powering the apps' AI features

## What makes it sustainable solo

The bar is non-negotiable because nobody else will come and fix it:

- Deployments **verify themselves** (comparing the commit actually running in
  production) and roll back automatically.
- Backups are not assumed to work: a full restore has been **proven on a
  throwaway cluster**, and the drill is repeated quarterly.
- Defense in depth: TLS everywhere, default-deny network policies, secrets
  encrypted in git, CrowdSec at the perimeter.
