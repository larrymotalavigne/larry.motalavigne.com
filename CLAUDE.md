# CLAUDE.md — larry.motalavigne.com

Founder's personal site at **larry.motalavigne.com**. Angular 21 with Server-Side Rendering (Express adapter).

## Stack

- Angular 21 + SSR via `src/server.ts` (Express)
- i18n: EN + FR (`src/i18n/`)
- Content-driven pages: markdown / data files in `src/content/`
- nginx is **not** used here — the prod container runs the Node SSR server directly

## Layout

```
src/
  main.ts             # browser entry
  main.server.ts      # SSR entry
  server.ts           # Express server wiring
  app/
    app.config.ts     # browser providers
    app.config.server.ts   # SSR-only providers
    app.routes.ts     # route table
    core/             # global services (i18n, content loader)
    features/         # page components — lazy-loaded
    layout/           # header / footer / shell
    shared/           # reusable UI bits
  i18n/               # translation JSON
  content/            # markdown / data
  assets/             # images, fonts
docker/               # Dockerfile + entrypoint
public/               # static assets served verbatim (Angular 17+ convention)
tsconfig.{json,app.json,spec.json}
angular.json          # @angular/build with prerender + ssr targets
scripts/              # build helpers
```

## Commands

```bash
npm install --legacy-peer-deps
npm start                                  # ng serve at :4200 (CSR dev)
npm run build                              # full SSR build (browser + server bundles)
npm run serve:ssr:larry.motalavigne.com    # run the SSR server locally after build
```

The exact `serve:ssr:*` script name depends on the `angular.json` project name — check `package.json` scripts if it changed.

## Conventions

- **Standalone components** only.
- **i18n keys** in `src/i18n/{en,fr}.json` — don't hardcode user-visible strings; use the i18n service.
- **Content edits** (blog posts, page copy) live in `src/content/` — treat as data, not code.
- **Avoid browser-only APIs at module scope** (`window`, `document`, `localStorage`). They will crash the SSR build. Guard with `isPlatformBrowser(...)` or move into `afterNextRender(...)`.
- Two `app.config*.ts` files exist because SSR needs different providers than the browser — when adding a provider, decide whether it goes in `app.config.ts` (browser), `app.config.server.ts` (SSR only), or both.

## Deploy

Frontend-only archetype, **but** the container runs the Node SSR server, not nginx. The shared SPA Deployment in `infra/k8s/apps/` may need a separate Deployment with the Node entrypoint and port — confirm by reading the manifest before assuming a vanilla SPA rollout works here.

## Gotchas

- **SSR hydration mismatch** is the usual failure mode: server renders one tree, browser renders another. Symptom is a console warning and a flash of replaced DOM. Fix by ensuring all data fetched at SSR time is also available to the browser bundle (TransferState).
- The `scripts/` dir contains content-generation helpers; they're not part of the runtime build.
