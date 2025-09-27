# Project Roadmap

This document tracks planned improvements. Check items off as they ship. If you open a PR, link the matching task(s) below.

Decisions

- No Renovate (manual/Dependabot updates instead)

Guiding Principles

- Prefer small, reviewable PRs; keep CI green.
- Type-safe, accessible, and secure by default.
- Avoid churn; group changes by concern.

## Phase 1 — Near-term

- [x] Pre-commit hooks (husky + lint-staged)
  - Run: `eslint`, `markdownlint-cli2`, `cspell`, and a project `astro check`
- [x] E2E smoke tests (Playwright)
  - Routes: home, posts index + one post, tags index, contact, 404
  - Basic assertions: status 200/404, key content visible, no console errors
- [x] CI quality/caching
  - Cache node_modules based on lockfile; matrix Node 18/20/22 LTS
  - Enforce `eslint --max-warnings=0`; keep `ts-prune` report-only
- [x] Security headers (Workers)
  - Add CSP (start in report-only), Referrer-Policy, Permissions-Policy, COOP/COEP
  - Log violations (report-to endpoint or console for now)
- [x] Accessibility quick wins
  - Ensure focus styles, landmarks/roles, skip link; add `@axe-core/playwright` checks

## Phase 2 — Next (2–4 weeks)

- [x] Lighthouse CI with budgets (perf, accessibility)
  - LHCI autorun enforcing performance ≥0.90, accessibility ≥0.95, plus size/timing budgets
- [x] Error and request telemetry
  - Cloudflare Observability dataset captures sampled request/error logs with PII scrubbing and env tags (`docs/telemetry.md`)
- [x] Structured data (JSON-LD)
  - Article + BreadcrumbList for posts; validate in Rich Results Test
- [x] 404/500 pages improvements
  - Helpful navigation, search links, and report-issue CTA

## Phase 3 — Nice-to-haves

- [x] Visual regression testing (Playwright snapshots or Percy)
  - Playwright baseline screenshots covering home and posts routes
- [x] Secret scanning
  - Gitleaks in CI; baseline + allowlist for known test credentials
- [x] Dev environment reproducibility
  - Devcontainer with Node 23.5, pnpm, npm scripts, and wrangler preinstalled
- [x] ts-prune enforcement
  - Fail lint suite with ts-prune --error; add npm script for local checks

## Maintenance Tasks

- [x] Monthly dependency update PRs (manual or Dependabot weekly)
  - Dependabot runs every Monday at 07:00 America/Toronto for npm and GitHub Actions
- [x] Content QA pass (headings, links, spelling) each release
  - `npm run qa:content` aggregates Markdown lint, link validation, and spell-check before releases
  - Reference `docs/content-qa.md` for manual review steps and weekly Lychee coverage
- [x] CI runtime review quarterly (cache hits, flakiness, parallelism)
  - Follow `docs/ci-runtime-review.md` to track durations, cache hit rates, and flake reports once per quarter

## References

- Commands: `npm run lint:all`, `npm run typecheck`, `npm run typecheck:workers`, `npm run build`
- Key folders: `src/components/`, `src/pages/`, `functions/`, `.github/workflows/`
