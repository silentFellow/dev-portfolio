# dev-portfolio

Personal portfolio site (single-page Next.js app): hero, work experience, projects, tech stack, and
footer sections, all driven by data in `constants/index.ts`.

## Setup

`pnpm install` (pnpm is the package manager — `pnpm-lock.yaml` is the lockfile, no npm/yarn
lockfiles exist).

## Build

`pnpm build`. Note: `typescript.ignoreBuildErrors: true` in `next.config.ts` — the build will
succeed even with type errors. Run `pnpm tsc --noEmit` and `pnpm lint` manually before committing;
don't rely on the build to catch these.

## Lint / format

- Biome (`biome.json`) replaced ESLint + Prettier — one tool for both linting and formatting.
- `pnpm lint` — lint only. `pnpm format` — format only. `pnpm check` — both, with fixes applied.
- A `pre-commit` hook (husky) runs `lint-staged`, which runs `biome check --write` on staged files
  matching `*.{js,jsx,ts,tsx,json,css,scss,md}`.
- Some findings are suppressed inline with `// biome-ignore <rule>: <reason>` (or
  `/* biome-ignore ... */` in CSS) where a real fix would mean retyping vendored three.js/animation
  code or redesigning a decorative-only element — read the reason before "fixing" these.

## Conventions

- Page sections live in `components/*.tsx` (e.g. `Hero.tsx`, `About.tsx`, `WorkExperience.tsx`) and
  are composed in `app/page.tsx`. Each section is wrapped with `StarWrapper` from
  `hoc/SectionWrapper.tsx`, which adds the scroll-reveal animation and the `#id` anchor used for
  nav scrolling — new sections should follow this pattern.
- Reusable UI primitives (shadcn/Aceternity-style effects: carousel, spotlight, moving-border,
  etc.) live in `components/ui/`.
- Framer Motion variants are factored into `lib/motion.ts` (`textVariant`, `fadeIn`,
  `staggerContainer`) — reuse these instead of inlining new variants.
- All portfolio content (services, work experience, projects, skills, social links) is hardcoded
  data in `constants/index.ts`. To update site content, edit that file, not the components.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`).
- Dark mode is forced (`className="dark"` in `app/layout.tsx`), not user-toggleable.

## Commit / PR instructions

Short, imperative commit subjects, optionally prefixed with a type (e.g. `Fix: blogs site url`,
`Add blog site, fix incorrect image issue`).

## Gotchas

- `app/api/keep-warm/route.ts` is a trivial GET endpoint used to keep the Vercel deployment warm
  (external pinger) — not part of app functionality, don't remove it without checking the pinger
  config.
- `@react-three/fiber` is pinned to an alpha version (`9.0.0-alpha.8`); verify three.js-related
  changes against that specific alpha, not the latest stable docs.
- No test suite and no CI exists — there's nothing to run beyond lint/typecheck/manual verification
  in the browser before considering a change done.

## Domain vocabulary

See [`CONTEXT.md`](./CONTEXT.md) for the portfolio content model (services, work experience,
projects, skills) before editing `constants/index.ts` or the section components that render it.
