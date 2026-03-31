# CV Design Guardrails

This document keeps visual and accessibility decisions stable while the CV evolves.

## Core Principles

- Keep a single visual rhythm controlled by tokens in `src/app/App.css`.
- Preserve semantic structure first (`h1` main identity, `h2/h3` sections by hierarchy).
- Prefer readability over decoration in A4 print constraints.
- Validate every typography or spacing change with visual tests and a11y checks.

## Required Checks Before Merging

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run test:visual`
- `pnpm run a11y:contrast`

## Token Usage Rules

- **Content area:** use `--content-*` tokens for body, meta, list spacing.
- **Sidebar area:** use `--sidebar-*` tokens for list rhythm and section gaps.
- **Courses area:** use `--courses-*` tokens.
- Avoid introducing hardcoded spacing/line-height values when an area token exists.

## Accessibility Guardrails

- Ensure interactive controls have visible focus (`:focus-visible`).
- Keep ARIA labels localized through `src/shared/ui-labels.ts`.
- Decorative images must remain `alt=""` and `aria-hidden="true"`.
- External links should use `target="_blank"` with `rel="noopener noreferrer"`.

## Contrast Policy

- Required body/meta/link contrast on white background: **>= 4.5:1**.
- Toolbar gradient checks are advisory in the current script and should trend toward 4.5:1.
- Contrast checks are scripted in `scripts/a11y/check-color-contrast.mjs`.

## Change Strategy

- For visual adjustments, tune tokens first, selectors second.
- If one file grows too much, split by domain (`content`, `sidebar`, `courses`, `layout`).
- Keep snapshots up to date only when intentional visual changes are approved.
