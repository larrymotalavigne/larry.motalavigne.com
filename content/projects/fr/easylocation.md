---
title: "EasyLocation — SaaS de gestion locative"
slug: "easylocation"
date: "2026-07-19"
description: "La gestion locative française pour bailleurs indépendants : baux, états des lieux, quittances, paiements — avec un assistant IA qui tourne en local."
techStack: ["FastAPI", "Angular", "PostgreSQL", "Stripe", "Ollama", "Kubernetes"]
demo: "https://easylocation.fr"
featured: true
lang: "fr"
---

## Le problème

Les bailleurs indépendants français jonglent entre modèles Word, tableurs et
obligations légales (bail ALUR, état des lieux, quittances, révision IRL).
Les logiciels existants visent les agences, pas le particulier qui gère deux
ou trois biens.

## Ce que j'ai construit

Un SaaS complet, seul, de la première migration au paiement Stripe :

- **Conformité intégrée** : baux conformes, états des lieux numériques,
  quittances et attestations générées en PDF, calcul de révision IRL.
- **Assistant IA local** : un chat intégré à l'app qui répond sur les données
  du bailleur — le modèle tourne sur mon cluster, les données ne sortent jamais.
- **Paiements** : abonnements Stripe en production.

## L'envers du décor

C'est aussi le projet où j'applique le plus haut niveau d'exigence :
60+ migrations de base de données, une suite de tests de bout en bout qui se
connecte chaque nuit à la vraie production, un déploiement qui vérifie
automatiquement le commit livré et se rollback tout seul en cas d'écart.
