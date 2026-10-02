---
title: "Une infrastructure de production complète, sous un bureau"
slug: "plateforme-self-hosted"
date: "2026-07-19"
description: "Trois machines, un cluster Kubernetes, et tout ce qui fait une vraie plateforme : GitLab, CI, GitOps, monitoring, sauvegardes prouvées. Zéro cloud."
techStack: ["Kubernetes", "k3s", "Flux", "GitLab CI", "Grafana", "Velero", "Ollama"]
featured: true
lang: "fr"
---

## Le pari

Héberger soi-même l'intégralité de son entreprise : le code, la CI, les bases
de données, les SaaS en production, et les modèles d'IA. Trois machines
physiques, un cluster k3s, et une règle : les données ne sortent pas.

## Ce qui tourne dessus

- **Runners CI et cache de build** (le serveur GitLab et le registre sont hébergés à part, sur une machine amie — pas de cloud public non plus)
- **Une trentaine de projets déployés**, dont deux SaaS en production
- **GitOps de bout en bout** : chaque changement passe par git, Flux réconcilie
- **Observabilité** : VictoriaMetrics, Loki, Grafana, alerting
- **LLMs locaux** (Ollama) qui alimentent les fonctionnalités IA des apps

## Ce qui rend ça tenable seul

Le niveau d'exigence n'est pas négociable parce que personne ne viendra
réparer à ma place :

- Les déploiements **se vérifient eux-mêmes** (comparaison du commit en prod)
  et se rollback automatiquement.
- Les sauvegardes ne sont pas supposées fonctionner : la restauration complète
  a été **prouvée sur un cluster jetable**, et le drill est répété chaque trimestre.
- Défense en profondeur : TLS partout, politiques réseau par défaut,
  secrets chiffrés dans git, CrowdSec en périmètre.
