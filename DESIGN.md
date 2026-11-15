# DESIGN

## Brief

- **Subject:** Gowtham S (silentFellow), software engineer at CDW. Go, TypeScript, Linux, CLIs,
  Neovim, tmux. Builds and ships small tools (cred, l2shift, nvim-db) and production backends.
- **Audience:** recruiters and engineering leads first, other terminal people second.
- **Job:** get hired / get a conversation. Prove taste and depth in under a minute.
- **Assets:** resume (typst), five public projects with real demo captures, live blog RSS.

## Concepts considered

| #   | Concept                                                                                                                                                             | Anchor                                       | Orig | Fit | Feas | Port (low=good) |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---- | --- | ---- | --------------- |
| A   | **One shell session.** The site is a live tmux session on his machine: every section is a command and its output, the status line is the nav, you can type into it. | He lives in tmux + Neovim and ships CLIs     | 4    | 5   | 4    | 2               |
| B   | **man gowtham(1).** The whole site typeset as a manual page: NAME, SYNOPSIS, DESCRIPTION, SEE ALSO.                                                                 | Author of CLI tools with real man-style docs | 4    | 4   | 5    | 2               |
| C   | **Layer 2.** Identity rotates like l2shift rotating MACs: the name scrambles through hex addresses.                                                                 | l2shift                                      | 3    | 2   | 4    | 3               |

**Pick: A, with B as the case-study page format.** A gives the home page a playable signature;
B gives the inner pages a typographic system no template ships. C is one effect, not a world.

## Concept card

```
Idea:        The portfolio is one live shell session: scroll through its history, or type into it.
Metaphor:    tmux. Windows are sections, the status line is navigation, every section is a command and its output.
Signature:   The hero prompt. Type (or tap) `projects`, `log`, `cat resume`... and the session jumps to that
             window while the status line follows. Driver: components/StatusLine.tsx (active window = one variable).
Emotion:     "wait, this is a real terminal." Recognition, then play.
Motion verb: print like a TTY. Lines appear one by one in hard steps, the caret blinks, nothing floats or bounces.
Screenshot:  The hero: GOWTHAM S in huge Comic Shanns Bold, `~ ❯ whoami` under it, a blinking block caret,
             and the tmux status line along the bottom edge.
```

## System

**Palette (Catppuccin Mocha, chosen with the owner; replaced Kanagawa Dragon in round 2):**

| Role    | Hex                                                                                                   | Use                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ground  | `#1e1e2e` base                                                                                        | page                                                                                  |
| well    | `#181825` mantle                                                                                      | terminal panes, status line, curtain, loader                                          |
| surface | `#313244` surface0                                                                                    | active status-line window                                                             |
| ink     | `#cdd6f4` text                                                                                        | text                                                                                  |
| muted   | `#a6adc8` subtext0                                                                                    | secondary text (AA on ground)                                                         |
| line    | `#45475a` surface1                                                                                    | rules, borders, demo frames                                                           |
| accent  | `#cba6f7` mauve                                                                                       | active window, focus, selection fill, highlights                                      |
| syntax  | `#a6e3a1` green, `#f9e2af` yellow, `#fab387` peach, `#f38ba8` red, `#89b4fa` blue, `#b4befe` lavender | prompts (green), branches, tags, errors: like syntax highlighting, never as big fills |

**Type:**

- Display + code: **ComicShannsMono Nerd Font Mono** (MIT, self-hosted, subset to Latin + box
  drawing + the Nerd glyphs in `constants.glyph`). Bold for headlines (the name is uppercase and
  sized to fill the measure: 9 glyphs x 0.55em), regular for every terminal/code/label bit.
  Departure Mono was tried first and dropped (read as too retro).
- Body: **JetBrains Mono Nerd Font Mono** (OFL, self-hosted woff2 subset). 17 px / 1.6.
- Fit formulas use the 0.55em advance: hero `/ 5.02`, `cat resume.pdf` `/ 9.3`, email `/ 13`.
- Scale: mega `clamp(3.3rem, 0.4rem + 12.4vw, 14rem)`, xl `clamp(2.4rem, 1.2rem + 5vw, 6.5rem)`,
  l `clamp(1.5rem, 1.15rem + 1.6vw, 2.6rem)`, m, body, s 14, xs 12.

**Grid & rhythm:** 12 columns, gutter `clamp(1rem, 0.6rem + 1.6vw, 2.5rem)`. Every section
starts with its command line (`~/gowtham ❯ git log --graph`) in the code face at column 1;
content aligns to column 1 or column 4. Every section uses the same padding (`--sec-pad`); the owner found varied rhythm awkward.

**Shape:** radius 0 everywhere except terminal panes (6 px, like a window). One rule: 1 px `line`.

**Motion language:** GSAP `steps()` for anything that "prints" (curtain, boot log, section
command typing); `expo.out` for the few things that travel (pinned demo swaps). Durations: small
UI 0.18 s, lines 0.04 s per step, curtain 0.5 s in 8 steps. Hovers: **selection invert** (fill
sweeps left to right in 6 steps, text flips to ground) for every primary target; utility links
get an underline. Idle: the caret blinks and the status line clock ticks on the GSAP ticker.

## Composition (each section a different layout family)

```
HERO      | GOWTHAM S (mega, cols 1-12, bold)                      |
          | builds tools for the terminal and the web.  [terminal pane cols 7-12]
          | meta x3 (code face)                         | ~ ❯ _ / chips |
ABOUT     | cmd                                                    |
          | big paragraph (l, cols 1-8)        | key: value list (cols 9-12) |
LOG       | cmd: git log --graph                                   |
          | graph gutter | hash  role · date  (branch per employer) |
          |              | bullets (cols 4-10)                     |
PROJECTS  | cmd: ls -l ~/projects                                  |
          | index rows (cols 1-5, sticky)  | pinned demo stage (cols 6-12) swaps per row |
          | phone: each row stacks its own demo                     |
SKILLS    | cmd: tree ~/skills   -> full-width tree, two columns on desktop |
RESUME    | type-as-image: `cat resume.pdf` at xl, the whole line is the link |
BLOG      | cmd: tail -n 4 feed  -> table rows date | tag | title   |
MISC      | achievements checklist (cols 1-6) | education man block (cols 7-12) |
CONTACT   | mail ❯ address at xl, socials row, colophon, `exit`    |
STATUS    | fixed bottom tmux line: [gowtham] 0:whoami 1:about ... | clock |
```

Case pages (`/work/[slug]`) are man pages: header `CRED(1)  General Commands Manual  CRED(1)`,
then NAME, SYNOPSIS, DESCRIPTION, DEMO, FEATURES, STACK, SEE ALSO, and NEXT as the next project.

## Genericness test

A generic model given "terminal portfolio" lands on acid green on black, a typewriter hero and
fake `ls` everywhere. Changed: the Catppuccin Mocha palette with a mauve accent instead of phosphor green; the tmux
status line is the real navigation with a live current-window indicator (not decoration); the
case pages use man page structure as a real typographic system; experience is an actual git
graph of the owner's real role progressions; the display face is the owner's own terminal font (Comic Shanns) set bold at poster scale, which a generic build would never pick for headlines.

## Decisions

- Dark only (owner). No light theme.
- Boot sequence only on the first visit (localStorage flag), skipped under reduced motion.
- GitHub stars show only at 5 or more (owner: no negative signals).
- No WebGL: the concept is typographic; demos are real captured video.
- Under reduced motion the hero terminal still works; it just jumps instead of scrolling.
- The boot log is pure CSS (plays from first paint, ~1.5 s total) rather than a JS progress
  counter: on a throttled phone a JS loader pushed LCP to 4.1 s; the CSS version gets 1.1 s.
- Blog post titles are shown exactly as the owner wrote them, punctuation from external feed (they are his
  words, quoted from the feed). External feed punctuation may trigger audit warnings.
- Idle state: the hero caret and the status-line dot blink in hard steps, and the clock ticks.
