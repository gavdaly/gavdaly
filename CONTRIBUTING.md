# Contributing

Thanks for your interest in improving this project! For day‑to‑day conventions (structure, commands, style), read `AGENTS.md` (Repository Guidelines). This file covers how to propose changes.

## Getting Started
- Use Node `v23.5.0` (`nvm use`), then `npm i`.
- Run locally: `npm run dev`. Type checks: `npm run check`. Build: `npm run build`.

## Branches & Commits
- Branch from `main`; use short, descriptive names (e.g., `feat/tags-filter`).
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.

## Pull Requests
- Use the PR template. Include:
  - What and why (link issues with `Fixes #123`).
  - Screenshots for UI changes.
  - Verification steps (commands, pages to check).
  - Notes on Cloudflare config (KV/D1/env) or migrations.
- Before opening:
  - `npm run check` and `npm run build` pass.
  - Optional: `npx eslint 'src/**/*.{astro,ts,tsx}'` and `npx prettier --write .`.

## Data & Content
- Place posts/notes/projects in `src/content/` with frontmatter.
- Avoid committing secrets. Use `.env` locally; production via Cloudflare bindings.

## Code of Conduct
- Be respectful and constructive. Assume good intent and document trade‑offs.
