# dev-portfolio

Personal portfolio site (Next.js App Router), designed as one live tmux/shell session: hero with a
typeable terminal, about, experience (git log), projects (with man-page case studies at
`/work/[slug]`), skills, resume, blog, achievements/education and contact. All content lives in
`constants/index.ts`. Design intent and rules: [`DESIGN.md`](./DESIGN.md) (read it before UI work).

## Setup

`pnpm install` (pnpm is the package manager — `pnpm-lock.yaml` is the lockfile, no npm/yarn
lockfiles exist).

## Build

`pnpm build`. Note: `typescript.ignoreBuildErrors: true` in `next.config.ts` — the build will
succeed even with type errors. Run `pnpm tsc --noEmit` and `pnpm lint` manually before committing;
don't rely on the build to catch these.

## Lint / format / test

- Biome (`biome.json`) does linting and formatting. `pnpm lint`, `pnpm format`, `pnpm check` (both,
  with fixes). A husky `pre-commit` hook runs `biome check --write` on staged files via lint-staged.
- `pnpm test` runs the few unit tests with Node's built-in runner (`node --test lib/*.test.ts`).
- CI (`.github/workflows/ci.yml`) runs `pnpm check` and `pnpm build` on pushes and PRs to `main`.
- Some findings are suppressed inline with `// biome-ignore <rule>: <reason>`; read the reason
  before "fixing" one.

## Conventions

- Plain CSS with design tokens in `app/globals.css` (no Tailwind). Colours are the Catppuccin
  Mocha roles defined at the top of that file (`--c-bg`, `--c-accent`...); use the tokens, never
  new hex values in components.
- Fonts are declared in `app/fonts.ts`: ComicShannsMono Nerd Font Mono (self-hosted in
  `app/fonts/`, bold for headlines, regular for code/terminal; subset to the glyphs in
  `constants.glyph`) and JetBrains Mono Nerd Font Mono (body, self-hosted as woff2 subset to Latin + box drawing; re-subset from the `~/Library/Fonts` TTF with the same `pyftsubset` command, minus the Nerd codepoints).
- Display text sizes that must fit one line are computed from the mono advance (0.55em per
  glyph), e.g. the hero name `/ 5.02`. If you change those strings or the font, redo the maths.
- Sections live in `components/*.tsx`, composed in `app/page.tsx`. Each section starts with a
  `<Cmd>` command line and has an `id` matching an entry in `windows` (constants), which drives
  the tmux status line (`components/StatusLine.tsx`).
- Motion runs through the small engine in `engine/` (GSAP ticker + Lenis, one clock). Use the
  data attributes (`data-reveal`, `data-print`, `data-intro`, `data-delay`) or `usePage()` from
  `engine/next.tsx`; never add your own scroll listeners or rAF loops. Everything must stay
  visible under `prefers-reduced-motion`.
- The boot loader is pure CSS (`#loader` in `globals.css`) and only plays on a visitor's first
  visit (`html.seen` flag from `localStorage`).
- Project demos are `public/demos/<slug>.{mp4,webm,webp}` (1600x1000). The blog feed and GitHub
  stars are fetched server side in `lib/feeds.ts` and revalidate daily.
- Visible copy: lowercase terminal-casual for UI chrome, factual sentences for experience and
  projects. No em/en dashes, no invented metrics (only numbers that are on the resume).
- Path alias `@/*` maps to the repo root. Dark only, by design.

## How to change things

Almost every content change is an edit to `constants/index.ts`; the components read from it.
After any change: `pnpm check && pnpm tsc --noEmit && pnpm test && pnpm build`, then look at it
in a browser at 390px and desktop width.

| I want to...                                 | Do this                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Change my name, email, resume link, blog URL | Edit `site` in `constants/index.ts`. `site.resume` is the Google Drive link used by the resume section and the terminal's `cat resume`.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Change hero / about text                     | `hero` and `about` in `constants/index.ts`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Add or change a social link                  | Add `{ label, handle, href, icon }` to `socialMedia`. `icon` is one of the `glyph` values (e.g. `glyph.github`) (see "Add a Nerd Font icon"). It shows in the contact section and is added to the JSON-LD `sameAs` automatically. To also open it from the terminal (`open <name>`), add it to `links` in `components/Terminal.tsx`.                                                                                                                                                                                                                                                               |
| Add a job or a promotion                     | `workExperience`: one entry per employer (`branch` is a short lowercase git-style name). `roles` are newest first; `hash` is a decorative 7-char hex; set `date` only when it is known. The first employer is rendered as `HEAD`.                                                                                                                                                                                                                                                                                                                                                                  |
| Add a project                                | 1. Add an entry to `projects` (`slug` is the URL and terminal name, `repo` is the GitHub repo under `site.handle` for the star count, `section` 1 for commands/apps, 3 for libraries). 2. Add `public/demos/<slug>.mp4`, `.webm` and `.webp` (see "Record a demo"). The home row, the `/work/<slug>` man page, the sitemap, `man <slug>` in the terminal and the boot log count all update from the array. Stars only show at 5 or more. If the project is a fork, fill `fork` with the upstream and only what you built.                                                                          |
| Add a skill                                  | Add it to the right `items` list in `skillCategories` (lowercase). A new category = a new `{ dir, items }` entry.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Add an achievement / update education        | `achievements` (title, detail, link) and `education`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Add a new home section                       | 1. Create `components/<Name>.tsx`: a `<section id='x' className='sec' aria-labelledby=...>` starting with `<Cmd>some command</Cmd>` and an `h2` (`className='h2'` or `sr-only`). 2. Add it to `app/page.tsx` in order. 3. Add `{ id: 'x', name: 'x' }` to `windows` at the same position so the tmux status line tracks it. 4. Optional: add a jump alias to `jumps` in `components/Terminal.tsx`. Use `data-reveal` / `data-print` for entrance motion.                                                                                                                                           |
| Add a terminal command                       | `run()` in `components/Terminal.tsx`: match the lowercased command and return a ReactNode (or call `scrollToTarget('#id')` / `go('/path')`). Add it to the `help` output.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Add a Nerd Font icon                         | Add the codepoint to `glyph` in `constants/index.ts`, then re-subset both weights so the glyph exists in the shipped font, adding the codepoint to `--unicodes`: `uvx --from 'fonttools[woff]' pyftsubset ~/Library/Fonts/ComicShannsMonoNerdFontMono-Regular.otf --unicodes="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+2190-21FF,U+2500-259F,U+2600-26FF,U+2700-27BF,U+F09B,U+F0E1,U+F09E,U+F0E0,U+F120,U+F005,U+F08E,U+F418,U+F417,U+F07B,U+F07C,U+F1C1,U+F0C1,U+E626" --flavor=woff2 --layout-features='*' --output-file=app/fonts/comic-shanns-mono-Regular.woff2` (same for `-Bold`). |
| Change colours or fonts                      | Tokens at the top of `app/globals.css`; fonts in `app/fonts.ts`. Update the palette/type section of `DESIGN.md` and re-record the demos so their theme matches.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Record a demo                                | Terminal tools: charmbracelet VHS, theme "Catppuccin Mocha", font "ComicShannsMono Nerd Font Mono" size ~26, no outer margin and square corners (the site adds the radius and border), slim window bar, 1600x1000, 8 to 14 s, prompt `~/projects/<slug> ❯`, only fake data. Web apps: capture with Playwright/agent-browser, frame edge to edge. Encode mp4 (H.264, yuv420p, +faststart), webm (VP9) and a webp poster (best frame), no audio, each under 2.5 MB. Install VHS only for the run and uninstall it afterwards.                                                                        |
| Refresh the OG image                         | Run the site (`pnpm build && pnpm start`) and render the hero to `public/og.png` (1200x630); the awwwards skill's `og.mjs` does this.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## Commit / PR instructions

Short, imperative commit subjects, optionally prefixed with a type (e.g. `Fix: blogs site url`,
`Add blog site, fix incorrect image issue`).

## Gotchas

- `app/api/keep-warm/route.ts` is a trivial GET endpoint used to keep the Vercel deployment warm
  (external pinger) — not part of app functionality, don't remove it without checking the pinger
  config.
- Visual QA uses the awwwards skill scripts (`shoot.mjs`, `audit.mjs`) against a production
  build; their output goes to `.shots/` (gitignored). `playwright` and `axe-core` are dev deps for
  those scripts only.
- Beyond `pnpm test`, verify UI changes in a browser at phone (390px) and desktop widths.

## Domain vocabulary

See [`CONTEXT.md`](./CONTEXT.md) for the portfolio content model (work experience, projects,
demos, skills, blog posts, windows) before editing `constants/index.ts` or the section components that render it.
