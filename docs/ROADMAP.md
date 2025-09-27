# Project Roadmap

This document tracks planned improvements. Check items off as they ship. If you open a PR, link the matching task(s) below.

Decisions

- No Renovate (manual/Dependabot updates instead)

Guiding Principles

- Prefer small, reviewable PRs; keep CI green.
- Type-safe, accessible, and secure by default.
- Avoid churn; group changes by concern.

## Phase 1

- [ ] CI: Enforce Lighthouse budgets on every PR
  - Install Playwright's bundled Chromium in CI and run `npm run test:lhci`.
  - Fail the workflow when budgets regress and upload the HTML report artifact for debugging.
- [ ] Expand Playwright coverage for interactive flows
  - Test the contact form, navigation menu, and dark mode toggles with `@axe-core/playwright`.
  - Include regression checks for the Cloudflare Turnstile widget and capture console logs on failure.
- [ ] Harden Cloudflare edge caching
  - Configure Cache Rules to serve static pages from the edge with stale while revalidate fallbacks.
  - Add telemetry for cache hit ratios and cache bypass reasons.
- [ ] Homepage hero experience refresh
  - Add a concise tagline clarifying focus areas, promote a primary CTA, and surface social icons near the intro.
  - Rebalance spacing between the profile photo and copy so the layout feels weighted and scannable.
- [ ] Content sections visual affordances
  - Increase contrast between section headers and card backgrounds, and expose post tags beneath titles for quick context.
- [ ] Publish observability dashboards and alerts
  - Build Analytics Engine queries that power latency and error dashboards for each environment.
  - Configure threshold-based alerts and document the playbook for on-call responders.
- [ ] Automate scheduled content QA sweeps
  - Schedule `npm run qa:content` to run nightly and open an issue when failures occur.
  - Track link, spelling, and metadata regressions over time for trend insights.

## Phase 2

- [ ] Ship static search and content filters
  - Generate a prebuilt search index and surface an accessible search UI with keyboard support.
  - Provide tag and category filters on posts and projects to aid discovery.
- [ ] Produce syndication feeds (RSS, Atom, JSON Feed)
  - Offer dedicated feeds for posts, notes, and projects with accurate metadata.
  - Link feeds in the site `<head>` and README for discoverability.
- [ ] Publish component documentation site
  - Document Astro and Solid components with usage guidelines and prop definitions.
  - Integrate the component gallery with visual regression snapshots to prevent drift.
- [ ] Launch newsletter signup with double opt-in
  - Evaluate a privacy-friendly email provider and wire a call-to-action across the site.
  - Document consent handling, unsubscribe flows, and telemetry expectations.
- Improve content authoring workflow
  - [ ] Provide templates for new posts and projects with prefilled frontmatter.
  - [ ] Explore integrating a headless CMS or git-based editor with preview builds.
- [ ] Post template readability upgrades
  - Refresh header hierarchy, add breadcrumbs/back links, and expose a "Last updated" stamp for technical guides.
  - Tighten list spacing, standardize code blocks/inline callouts, and evaluate a table of contents for long-form posts.
- [ ] Projects list UX improvements
  - Pair titles with short descriptions, explicit repo/demo links, and consistent card heights.
  - Distinguish status labels with icons/colors, add filtering options, and consider a featured project highlight.
- [ ] Project detail storytelling pass
  - Introduce a hero image, summary paragraph, and prominently aligned status badge.

## Phase 3

- [ ] Provide offline experience
  - Add a service worker with asset caching and offline fallbacks for key routes.
  - Create a web app manifest with icons, theme colors, and install metrics.
- [ ] Build public dashboards for telemetry metrics
  - Publish anonymized views of latency, errors, and top content trends.
  - Embed interactive charts or link to Cloudflare Analytics for transparency.

## Research Backlog

- [ ] Research Astro View Transitions for smoother navigation
  - Prototype the experience and measure layout shift improvements.
- [ ] Explore MDX adoption for interactive content blocks
  - Assess authoring overhead and compatibility with existing Markdown collections.
- [ ] Assess incremental content builds or on-demand revalidation
  - Compare build times and cache behavior between full and partial deploys.
- [ ] Investigate edge-side personalization strategies
  - Evaluate lightweight approaches such as geolocation banners or returning-visitor greetings.

## Maintenance Tasks

- [x] Monthly dependency update PRs (manual or Dependabot weekly)
  - Dependabot runs every Monday at 07:00 America/Toronto for npm and GitHub Actions
- [x] Content QA pass (headings, links, spelling) each release
  - `npm run qa:content` aggregates Markdown lint, link validation, and spell-check before releases
  - Reference `docs/content-qa.md` for manual review steps and weekly Lychee coverage
- [x] CI runtime review quarterly (cache hits, flakiness, parallelism)
  - Follow `docs/ci-runtime-review.md` to track durations, cache hit rates, and flake reports once per quarter
- [ ] Biannual accessibility review
  - Perform manual screen reader and keyboard audits; capture follow-ups in roadmap issues.
  - Refresh accessibility documentation with findings and assign owners.
- [ ] Telemetry retention and privacy audit
  - Review Cloudflare Observability datasets, sampling, and redaction rules each quarter.
  - Confirm data deletion paths and update runbooks.

## Completed Milestones

### Launch Foundations

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

### Quality & Observability

- [x] Lighthouse CI with budgets (perf, accessibility)
  - LHCI autorun enforcing performance ≥0.90, accessibility ≥0.95, plus size/timing budgets
- [x] Error and request telemetry
  - Cloudflare Observability dataset captures sampled request/error logs with PII scrubbing and env tags (`docs/telemetry.md`)
- [x] Structured data (JSON-LD)
  - Article + BreadcrumbList for posts; validate in Rich Results Test
- [x] 404/500 pages improvements
  - Helpful navigation, search links, and report-issue CTA

### Tooling Enhancements

- [x] Visual regression testing (Playwright snapshots or Percy)
  - Playwright baseline screenshots covering home and posts routes
- [x] Secret scanning
  - Gitleaks in CI; baseline + allowlist for known test credentials
- [x] Dev environment reproducibility
  - Devcontainer with Node 23.5, pnpm, npm scripts, and wrangler preinstalled
- [x] ts-prune enforcement
  - Fail lint suite with ts-prune --error; add npm script for local checks

## References

- Commands: `npm run lint:all`, `npm run typecheck`, `npm run typecheck:workers`, `npm run build`
- Key folders: `src/components/`, `src/pages/`, `functions/`, `.github/workflows/`
