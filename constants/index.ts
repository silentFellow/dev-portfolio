// All site content. Source of truth: the typst resume (resume-source-code/ats-friendly-resume).
// Visible text avoids em/en dashes on purpose (design rule).

export const site = {
  name: 'Gowtham S',
  handle: 'silentFellow',
  role: 'Software engineer',
  url: 'https://silentfellow.dev',
  description:
    'Gowtham S is a software engineer who builds tools for the terminal and the web: Go and TypeScript, CLIs, Neovim plugins and production backends.',
  email: 'gowtham.sri@zohomail.in',
  location: 'Tamil Nadu, IN',
  resume:
    'https://drive.google.com/file/d/1_04tzXLJheWYkZkl70nPkd4WVlOg7CnG/view?usp=drive_link',
  blog: 'https://blogs.silentfellow.dev',
  blogFeed: 'https://blogs.silentfellow.dev/index.xml',
  github: 'https://github.com/silentFellow',
};

// Nerd Font glyphs (ComicShanns Mono subset in app/fonts keeps exactly these).
export const glyph = {
  github: '',
  linkedin: '',
  rss: '',
  mail: '',
  terminal: '',
  star: '',
  external: '',
  branch: '',
  commit: '',
  folder: '',
  pdf: '',
  link: '',
};

export const socialMedia = [
  {
    label: 'GitHub',
    handle: 'silentFellow',
    href: 'https://github.com/silentFellow',
    icon: glyph.github,
  },
  {
    label: 'LinkedIn',
    handle: 'in/silentFellow',
    href: 'https://linkedin.com/in/silentFellow',
    icon: glyph.linkedin,
  },
  {
    label: 'LeetCode',
    handle: 'silentFellow',
    href: 'https://leetcode.com/silentFellow',
    icon: glyph.terminal,
  },
  {
    label: 'Blog',
    handle: 'blogs.silentfellow.dev',
    href: 'https://blogs.silentfellow.dev',
    icon: glyph.rss,
  },
  {
    label: 'Reddit',
    handle: '_silent_fellow',
    href: 'https://www.reddit.com/user/_silent_fellow/',
    icon: glyph.external,
  },
];

export const hero = {
  line: 'builds tools for the terminal and the web.',
  meta: [
    'software engineer @ cdw',
    'go · typescript · linux',
    'tamil nadu, in',
  ],
};

export const about = {
  text: 'I write software the way I like to use it: fast, keyboard first, and small enough to read in one sitting. Most days that means backend services in NestJS and Go, data pipelines on Kafka, and the odd CLI or Neovim plugin when a tool I want does not exist yet.',
  facts: [
    {
      key: 'now',
      value: 'software engineer at CDW, Chennai',
    },
    {
      key: 'shipping',
      value: 'backends, pipelines, CLIs, UI libraries',
    },
    {
      key: 'editor',
      value: 'neovim inside tmux, always',
    },
    {
      key: 'os',
      value: 'linux at heart, open source by default',
    },
  ],
};

export type Role = {
  hash: string;
  title: string;
  date?: string; // only where the resume states it
};

export type WorkExperience = {
  branch: string;
  company: string;
  href: string;
  location: string;
  period: string;
  roles: Role[]; // newest first
  points: string[];
};

export const workExperience: WorkExperience[] = [
  {
    branch: 'cdw',
    company: 'CDW Technologies India',
    href: 'https://www.cdw.com',
    location: 'Chennai, IN',
    period: 'Mar 2026 → now',
    roles: [
      {
        hash: 'a1f3c9e',
        title: 'Software engineer, full time',
      },
      {
        hash: '7be20d1',
        title: 'Software engineering intern',
        date: 'Mar 2026',
      },
    ],
    points: [
      'Build and maintain NestJS backend services: REST APIs and the business logic behind internal applications.',
      'Run the dev infrastructure: Docker environments, a Git repository migration, and database backup and restore through data sync endpoints.',
      'Ship Apache Kafka pipelines for asynchronous messaging, parallel processing and data transformation.',
      'Work in an Agile team with Scrum ceremonies, code reviews and steady feature delivery.',
    ],
  },
  {
    branch: 'greencollar',
    company: 'Green Collar Agritech Solutions',
    href: 'https://greencollar.ai',
    location: 'Bengaluru, IN',
    period: 'Nov 2023 → Feb 2026',
    roles: [
      {
        hash: '4c09aa2',
        title: 'Software engineering intern',
      },
      {
        hash: '19e7f30',
        title: 'Student intern',
      },
      {
        hash: '02d1b5c',
        title: 'Freelancer',
        date: 'Nov 2023',
      },
    ],
    points: [
      'Built responsive React and Next.js applications used by 500+ people every day.',
      'Made the apps 40% faster with TanStack Query caching and leaner rendering.',
      'Moved key pages to server side rendering, which grew organic traffic by 25%.',
      'Shipped through code reviews and Scrum with a cross functional team.',
    ],
  },
];

export type Project = {
  slug: string;
  repo: string; // github repo name under site.handle
  title: string;
  section: number; // man page section: 1 = commands, 3 = libraries
  kind: string;
  year: number;
  tagline: string;
  synopsis: string;
  description: string;
  features: string[];
  notes: string; // how it works: real implementation detail, shown as NOTES on the man page
  stack: string[];
  links: {
    label: string;
    href: string;
  }[];
  fork?: {
    upstream: string;
    href: string;
    added: string;
  };
  demoAlt: string;
};

export const projects: Project[] = [
  {
    slug: 'nvim-db',
    repo: 'nvim-db',
    title: 'nvim-db',
    section: 1,
    kind: 'neovim plugin',
    year: 2026,
    tagline: 'A tiny database client that lives inside Neovim.',
    synopsis: 'vim.pack.add { "https://github.com/silentFellow/nvim-db.git" }',
    description:
      'nvim-db manages database connections, keeps a query file per connection, runs queries and shows the results without leaving the editor. It ships no drivers: every query goes through the native CLI you already have, so psql, sqlite3, mysql, redis-cli, mongosh and duckdb all work out of the box.',
    features: [
      'Seven databases through their own CLIs, zero drivers',
      'Per connection query files you can keep in git',
      'Shift+Enter runs a selection or the whole buffer, async, with timing',
      'Written in Lua, configured with one setup() call',
    ],
    notes:
      'Every query is handed to the database’s own CLI through vim.system, asynchronously, and the output lands in a result buffer along with its run time. The database type comes from the URL scheme, and each connection gets its own folder of query files next to its connection.json. Supporting a new database means teaching the plugin one more command line, not shipping a driver.',
    stack: [
      'Lua',
      'Neovim',
    ],
    links: [
      {
        label: 'source',
        href: 'https://github.com/silentFellow/nvim-db',
      },
    ],
    demoAlt:
      'Neovim running nvim-db: the bookshop SQLite connection in the sidebar, its tables, a two line SQL query and a results table of top rated books.',
  },
  {
    slug: 'trace',
    repo: 'trace',
    title: 'trace',
    section: 1,
    kind: 'self-hosted app',
    year: 2026,
    tagline: 'Self-hosted, Markdown first notes for quick capture.',
    synopsis:
      'docker run -d -p 5230:5230 -v ~/.trace:/var/opt/memos silentfellow/trace:stable',
    description:
      'Trace is a home for short form thinking: daily notes, links, work logs and snippets flow into one chronological Markdown timeline on infrastructure you control. No titles, folders or templates in the way.',
    features: [
      'Scratchpad: a private space per parent Space, with a global view',
      'Markdown export grouped by date, with attachments kept',
      'Print view for clean PDF export',
      'Export filters built on CEL, fetched page by page',
    ],
    notes:
      'Trace runs on the Memos stack: a Go backend over SQLite, MySQL or PostgreSQL and a React frontend. My work is the Scratchpad (private child spaces that follow their parent Space, an aggregate view and an untagged filter) and the export pipeline: a CEL filter builder, a paged fetcher, a Markdown builder grouped by date and a print view for PDF. I also fixed the release build so multi architecture images publish as one manifest.',
    stack: [
      'Go',
      'TypeScript',
      'React',
      'Docker',
    ],
    links: [
      {
        label: 'source',
        href: 'https://github.com/silentFellow/trace',
      },
      {
        label: 'docker hub',
        href: 'https://hub.docker.com/r/silentfellow/trace',
      },
    ],
    fork: {
      upstream: 'usememos/memos',
      href: 'https://github.com/usememos/memos',
      added:
        'Trace is my fork and rebrand of Memos. On top of upstream I built the Scratchpad and the Markdown and PDF export workflow.',
    },
    demoAlt:
      'The Trace notes app in dark mode: a calendar and tag sidebar, and a timeline led by a pinned memo with a checklist, followed by short tagged notes.',
  },
  {
    slug: 'l2shift',
    repo: 'l2shift',
    title: 'l2shift',
    section: 1,
    kind: 'cli',
    year: 2025,
    tagline: 'Spoof or rotate a MAC address in one command.',
    synopsis: 'sudo l2shift <interface> [mac]',
    description:
      'l2shift changes the Layer 2 address of a network interface, either to a value you pass or to a random one it generates. It is written in C, has no dependencies on most systems, and runs on Linux and macOS.',
    features: [
      'Random MAC generation when no address is given',
      'Custom MAC in the same single command',
      'Linux and macOS from one small C codebase',
      'Random MACs are always unicast and locally administered',
    ],
    notes:
      'On Linux l2shift sets the address with ioctl syscalls directly; on macOS it goes through ifconfig. Random addresses clear the multicast bit and set the locally administered bit, so the result is always a valid unicast MAC. Custom input is accepted with any separators, but it must be exactly 12 hex digits and never all zeros or all F.',
    stack: [
      'C',
      'Linux',
      'macOS',
    ],
    links: [
      {
        label: 'source',
        href: 'https://github.com/silentFellow/l2shift',
      },
    ],
    demoAlt:
      'A terminal in a Linux sandbox: l2shift changes the MAC of a dummy interface address to a random one, then to 2:1A:3C:4B:5D:6E, then prints its help.',
  },
  {
    slug: 'cred',
    repo: 'cred',
    title: 'cred',
    section: 1,
    kind: 'cli',
    year: 2025,
    tagline: 'Passwords and env files, encrypted with GPG, versioned in git.',
    synopsis: 'go install github.com/silentFellow/cred@latest',
    description:
      'cred keeps passwords, environment variables and SSH keys in a git repository, each file encrypted client side with your GPG key. Every change is a commit, so you get history and an audit trail for free, and nothing readable ever leaves your machine.',
    features: [
      'Zero knowledge: encryption happens on your machine',
      'Git backed store with full history',
      'Passwords, env vars and SSH keys in one tool',
      'SSH keys, env files and key migration in the same CLI',
    ],
    notes:
      'The store is a plain git repository with pass, env and ssh folders, and every secret is its own GPG encrypted file. Git provides the history and the sync, `cred env set` writes a project .env back out and reminds you to ignore it, and `cred migrate` re-encrypts the whole store when your key changes.',
    stack: [
      'Go',
      'Cobra',
      'GPG',
      'Git',
    ],
    links: [
      {
        label: 'source',
        href: 'https://github.com/silentFellow/cred',
      },
      {
        label: 'docs',
        href: 'https://cred.silentfellow.dev',
      },
    ],
    demoAlt:
      'A terminal running cred: generating a password, listing the encrypted store as a tree, decrypting one entry and writing a project .env from the env store.',
  },
  {
    slug: 'abstract-ui',
    repo: 'abstract-ui',
    title: 'abstract-ui',
    section: 3,
    kind: 'react library',
    year: 2024,
    tagline: 'Accessible React components, published on npm.',
    synopsis: 'pnpm add @silentfellow/abstract-ui',
    description:
      'Abstract UI is a React and Next.js component library written in TypeScript on top of Tailwind CSS. It covers the pieces most apps rebuild by hand: a command palette, date picker, filter dropdown, image input, auth forms, pagination and a theme switcher.',
    features: [
      '12+ components with 30+ variants, documented in Storybook',
      'Accessibility first, typed end to end',
      '100+ weekly downloads on npm',
      'Light and dark themes for every component',
    ],
    notes:
      'Components are built on Tailwind CSS and shadcn/ui and ship as a single tsup bundle with full TypeScript definitions. The live Storybook has 42 stories across the 12 components, each with a light and dark toggle, so you can try every variant before installing.',
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Storybook',
    ],
    links: [
      {
        label: 'demo',
        href: 'https://abstract-ui.silentfellow.dev',
      },
      {
        label: 'npm',
        href: 'https://www.npmjs.com/package/@silentfellow/abstract-ui',
      },
      {
        label: 'source',
        href: 'https://github.com/silentFellow/abstract-ui',
      },
    ],
    demoAlt:
      'The Abstract UI Storybook showing the Login Form component in dark mode, with username and password fields and social sign in buttons.',
  },
];

export const skillCategories = [
  {
    dir: 'languages',
    items: [
      'go',
      'typescript',
      'javascript',
      'python',
      'c',
      'java',
      'sql',
    ],
  },
  {
    dir: 'frontend',
    items: [
      'react',
      'next.js',
      'html',
      'css',
      'tailwind',
      'shadcn-ui',
      'tanstack',
    ],
  },
  {
    dir: 'backend',
    items: [
      'node.js',
      'express',
      'nest.js',
      'fastapi',
      'rest',
      'websockets',
    ],
  },
  {
    dir: 'databases',
    items: [
      'postgresql',
      'mongodb',
      'drizzle',
    ],
  },
  {
    dir: 'streaming',
    items: [
      'apache-kafka',
    ],
  },
  {
    dir: 'devops',
    items: [
      'linux',
      'docker',
      'podman',
      'git',
      'aws-ec2',
      'aws-s3',
      'shell',
      'ci-cd',
      'mise',
    ],
  },
  {
    dir: 'tools',
    items: [
      'neovim',
      'tmux',
      'bruno',
      'postman',
      'storybook',
      'vite',
      'biome',
      'cobra',
    ],
  },
];

export const achievements = [
  {
    title: 'MongoDB Associate Developer',
    detail: 'certified',
    href: 'https://learn.mongodb.com/c/o4uMvThfQDuYpcjprIEyWg',
  },
  {
    title: '500+ problems on LeetCode',
    detail: 'go, python and java, 365+ day streak',
    href: 'https://leetcode.com/silentFellow',
  },
];

export const education = {
  school: 'Kongu Engineering College',
  degree: 'B.Tech, Artificial Intelligence and Machine Learning',
  period: '2022 → 2026',
  location: 'Tamil Nadu, IN',
  score: 'CGPA 8.9 / 10',
};

// The tmux windows: one per home page section, in page order.
export const windows = [
  {
    id: 'top',
    name: 'whoami',
  },
  {
    id: 'about',
    name: 'about',
  },
  {
    id: 'log',
    name: 'log',
  },
  {
    id: 'projects',
    name: 'projects',
  },
  {
    id: 'skills',
    name: 'skills',
  },
  {
    id: 'resume',
    name: 'resume',
  },
  {
    id: 'blog',
    name: 'blog',
  },
  {
    id: 'misc',
    name: 'misc',
  },
  {
    id: 'contact',
    name: 'contact',
  },
];
