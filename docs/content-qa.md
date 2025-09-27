# Content QA Checklist

Use this checklist before each release to ensure Markdown and site content stays clean.

## Automated checks

- `npm run qa:content` — Runs Markdown lint, remark link validation, and spell-checking across docs and content.
- `npm run lint:links` — Optional standalone run if you only need link validation.
- `npm run build && npm run preview` — Sanity-check generated pages locally if content changes are substantial.

## Manual review

- Skim page headings in the preview for hierarchy regressions (no skipped levels, unique H1).
- Click through recent content changes to confirm internal/external links resolve as expected.
- Confirm code blocks and callouts render correctly in Astro and Markdown layouts.

## Continuous monitoring

- The scheduled `Link Check` workflow uses Lychee weekly to crawl built pages for broken outbound links.
- Husky pre-commit hooks run Markdown linting and spell-checks on staged files to catch issues earlier.
