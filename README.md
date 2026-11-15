# dev-portfolio

A terminal-style personal portfolio for [Gowtham S](https://silentfellow.dev), built around one live tmux session. Browse the work, experience, skills and blog, or type commands into the shell on the home page.

## Quick start

Requires Node.js and [pnpm](https://pnpm.io/).

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

- `pnpm dev` - start the Next.js development server with Turbopack.
- `pnpm build` - create a production build.
- `pnpm start` - serve the production build.
- `pnpm lint` - run Biome linting.
- `pnpm format` - format the repository with Biome.
- `pnpm check` - check and format files with Biome.
- `pnpm test` - run the Node test suite.
- `pnpm tsc --noEmit` - run TypeScript checks separately from the build.

## Using the portfolio

The home page behaves like a shell session. Try commands such as:

- `help` to list available commands.
- `projects` or `ls` to browse the portfolio.
- `man nvim-db` to open a project page.
- `git log` to jump to experience.
- `cat resume` to open the resume.
- `open github` to visit an external link.

## Content and structure

- `constants/index.ts` is the source of truth for site details, experience, projects, skills, achievements and education.
- `components/` contains the home page sections and interactive terminal.
- `app/work/[slug]/` renders project man pages.
- `public/demos/` stores project demo clips and posters.
- `lib/feeds.ts` fetches the blog feed and GitHub stars server side.
- `app/globals.css` contains the design tokens and site styles.

To add a project, update `projects` in `constants/index.ts` and add its `.mp4`, `.webm` and `.webp` demo files under `public/demos/`. Most content changes only need an edit to that constants file.

## Design

The site is dark-only and uses Catppuccin Mocha colour roles, self-hosted mono fonts, and a small GSAP plus Lenis motion engine. Motion remains available under reduced-motion preferences.

## License

This repository is private and is not published under an open-source license.
