# Quarterly CI Runtime Review

Review GitHub Actions performance once per quarter to keep pipelines fast and reliable.

## 1. Gather baseline metrics

- Export workflow run durations from **Actions → Workflow usage** for the past quarter.
- Capture cache hit rates from the `Cache node_modules` step in `ci.yml` across the Node matrix.
- Record queue times and job concurrency from workflow run summaries.

## 2. Identify bottlenecks

- Compare average vs. p95 run times for each job (`secrets`, `build`, `linkcheck`).
- Flag steps with repeated cache misses, especially `npm ci` installs.
- Note flaky or re-run jobs; check the **Actions → Insights → Flaky tests** report for Playwright suites.

## 3. Optimize and track actions

- Adjust matrix size or split jobs if p95 exceeds 15 minutes.
- Tweak cache keys or add `actions/cache/restore-keys` when hit rates fall below 80%.
- Consider artifact pruning and dependency caching for `lhci` or Playwright if runtimes drift upward.

## 4. Document outcomes

- File an issue summarizing findings, proposed optimizations, and owners.
- Update this document with any permanent changes (new caching strategy, parallelism tweaks, etc.).
- Link results in the roadmap maintenance section for traceability.

## 5. Schedule next review

- Add a calendar reminder for the first Monday of the next quarter.
- Include this checklist in release planning so regressions are caught early.
