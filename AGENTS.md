# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` route-based pages (Astro). Example: `src/pages/posts/[slug].astro`.
- `src/components/` UI components; prefer `.astro` or `.tsx` (Solid). Example: `ProjectCard.astro`.
- `src/layouts/` shared page shells. `MarkdownLayout.astro` for content.
- `src/content/` Markdown content (`posts/`, `notes/`, `projects/`) with frontmatter.
- `src/data/` site config and data sources. Example: `config.ts`.
- `src/utils/` TypeScript utilities. Example: `formatDate.ts`.
- `public/` static assets; `dist/` build output (generated).
- `functions/` Cloudflare Pages Functions (KV/D1, webhooks, redirects).
- `migrations/` D1 schema changes.

## Build, Test, and Development Commands
- `nvm use` (Node `v23.5.0`), then `npm i`.
- `npm run dev` — start Astro dev server.
- `npm run build` — build to `dist/`.
- `npm run preview` — serve a production build.
- `npm run check` — Astro/TS diagnostics (type, Markdown, config).
- Lint/format (on demand): `npx eslint "src/**/*.{astro,ts,tsx}"` and `npx prettier --write .`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; TypeScript strict (`tsconfig.json`).
- Components: PascalCase (`Header.astro`, `sprite.tsx`). Utilities: camelCase. Routes/content slugs: kebab-case.
- Use Tailwind utility classes (see `src/styles/tailwind.css`); keep semantic HTML.
- Prettier with Astro/Tailwind plugins; ESLint via `eslint-plugin-astro`.

## Testing Guidelines
- No unit test runner is configured. Use:
  - `npm run check` for static/type checks.
  - `npm run preview` and verify pages, dynamic routes, and layouts.
- Pages Functions live in `functions/`; validate redirects and form handling with local preview or a staging deploy. Consider adding Playwright/Vitest if you introduce complex logic.

## Commit & Pull Request Guidelines
- Prefer Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`. Use `wip:` only for drafts.
- Keep messages imperative and scoped (e.g., `feat: add tags page`).
- PRs should include: concise description, rationale, screenshots for UI, reproduction/verification steps, and linked issues.

## Security & Configuration
- Do not commit secrets. Use `.env` locally; production via Cloudflare bindings.
- Expected bindings: `DISCORD_WEBHOOK`, `TURNSTILE_SECRET_KEY`, KV `GAV_DALY_REFERRAL`, D1 `DB` (see `functions/` and `migrations/`).
- Content requires frontmatter; update `src/data/config.ts` if site metadata changes.

