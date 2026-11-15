'use client';
// The signature: a real prompt. Section commands jump the session to that window.
import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { projects, site, socialMedia, windows } from '@/constants';
import { scrollToTarget } from '@/engine';

type Line = {
  id: number;
  node: ReactNode;
};

const jumps: Record<string, string> = {
  about: 'about',
  log: 'log',
  'git log': 'log',
  experience: 'log',
  projects: 'projects',
  'ls projects': 'projects',
  skills: 'skills',
  tree: 'skills',
  resume: 'resume',
  blog: 'blog',
  achievements: 'misc',
  education: 'misc',
  misc: 'misc',
  contact: 'contact',
  mail: 'contact',
};

const links: Record<string, string> = {
  github: site.github,
  linkedin: socialMedia[1].href,
  leetcode: socialMedia[2].href,
  blog: site.blog,
  resume: site.resume,
};

const COMMANDS = [
  'help',
  'whoami',
  ...Object.keys(jumps),
  'cat resume',
  'open github',
  'open linkedin',
  'man <project>',
  'ls',
  'clear',
];

const chips = [
  'help',
  'projects',
  'git log',
  'cat resume',
  'contact',
];

// Opens an internal route through the engine (so the `clear` transition plays).
function go(href: string) {
  const a = document.createElement('a');
  a.href = href;
  document.body.append(a);
  a.click();
  a.remove();
}

function run(raw: string): ReactNode | 'clear' {
  const cmd = raw.trim().replace(/\s+/g, ' ');
  const lower = cmd.toLowerCase();
  if (!cmd) {
    return null;
  }
  if (lower === 'clear' || lower === 'cls') {
    return 'clear';
  }
  if (lower === 'help') {
    return (
      <>
        <span className='hint'>commands:</span>
        {'\n'}
        {[
          [
            'whoami',
            'the short version',
          ],
          [
            'projects',
            'jump to the work (also: log, skills, blog, contact)',
          ],
          [
            'man <project>',
            `read a project page (${projects.map((p) => p.slug).join(', ')})`,
          ],
          [
            'cat resume',
            'open the resume',
          ],
          [
            'open <site>',
            'github, linkedin, leetcode, blog',
          ],
          [
            'clear',
            'wipe the screen',
          ],
        ].map(([k, v]) => (
          <span key={k}>
            {'  '}
            <span className='key'>{k.padEnd(14)}</span>
            {v}
            {'\n'}
          </span>
        ))}
      </>
    );
  }
  if (lower === 'whoami') {
    return 'gowtham s. software engineer at cdw. writes go and typescript, lives in neovim, ships small sharp tools.';
  }
  if (lower === 'ls' || lower === 'ls ~') {
    return (
      <span className='key'>
        {windows
          .slice(1)
          .map((w) => `${w.name}/`)
          .join('  ')}
      </span>
    );
  }
  if (jumps[lower]) {
    scrollToTarget(`#${jumps[lower]}`);
    return <span className='ok'>→ switching to window {jumps[lower]}</span>;
  }
  const man = lower.match(/^(?:man|cd|open) (?:~\/projects\/)?([\w-]+)$/);
  const project = man && projects.find((p) => p.slug === man[1]);
  if (project) {
    go(`/work/${project.slug}`);
    return <span className='ok'>→ opening man {project.slug}</span>;
  }
  const ext = lower.match(/^(?:cat|open) (\w+)(?:\.pdf)?$/);
  if (ext && links[ext[1]]) {
    window.open(links[ext[1]], '_blank', 'noopener');
    return <span className='ok'>→ opened {ext[1]} in a new tab</span>;
  }
  if (lower.startsWith('sudo')) {
    return (
      <span className='err'>
        guest is not in the sudoers file. this incident will be reported.
      </span>
    );
  }
  if (lower.startsWith('rm ')) {
    return (
      <span className='err'>
        rm: permission denied. the portfolio is read only.
      </span>
    );
  }
  if (
    [
      'vim',
      'nvim',
      'vi',
    ].includes(lower)
  ) {
    return 'you are already inside the editor of my heart. try `man nvim-db`.';
  }
  if (lower === 'exit') {
    return 'there is no exit from tmux, only `contact`.';
  }
  if (lower.startsWith('echo ')) {
    return cmd.slice(5);
  }
  return (
    <span className='err'>
      zsh: command not found: {cmd.split(' ')[0]}
      <span className='hint'> (try help)</span>
    </span>
  );
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const body = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const submit = (cmd: string) => {
    const out = run(cmd);
    if (cmd.trim()) {
      history.current.push(cmd);
    }
    cursor.current = history.current.length;
    setValue('');
    if (out === 'clear') {
      setLines([]);
      return;
    }
    const echo = (
      <>
        <span className='ok'>❯</span> {cmd}
        {'\n'}
      </>
    );
    setLines((ls) => [
      ...ls,
      {
        id: nextId.current++,
        node: (
          <>
            {echo}
            {out}
          </>
        ),
      },
    ]);
    requestAnimationFrame(() => {
      body.current?.scrollTo({
        top: body.current.scrollHeight,
      });
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(value);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const h = history.current;
    if (e.key === 'ArrowUp' && cursor.current > 0) {
      e.preventDefault();
      cursor.current--;
      setValue(h[cursor.current]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      cursor.current = Math.min(h.length, cursor.current + 1);
      setValue(h[cursor.current] ?? '');
    } else if (e.key === 'Tab' && value) {
      const match = COMMANDS.find((c) => c.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match.replace(' <project>', ' '));
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className='term'>
      <div className='term__bar'>
        <span
          className='term__lights'
          aria-hidden='true'
        >
          <i />
          <i />
          <i />
        </span>
        <span>guest@silentfellow: ~</span>
        <span aria-hidden='true'>zsh</span>
      </div>
      <div
        className='term__body'
        ref={body}
        data-lenis-prevent
      >
        <p className='term__out'>
          <span className='ok'>❯</span> whoami{'\n'}
          gowtham s, software engineer.{'\n'}
          <span className='hint'>
            type a command or tap one below. `help` lists them all.
          </span>
        </p>
        <div
          className='term__out'
          aria-live='polite'
        >
          {lines.map((l) => (
            <p key={l.id}>{l.node}</p>
          ))}
        </div>
        <form
          className='term__form'
          onSubmit={onSubmit}
        >
          <label
            className='term__prompt'
            htmlFor='prompt'
          >
            <b>~</b> ❯<span className='sr-only'> type a command</span>
          </label>
          <input
            id='prompt'
            className='term__input'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete='off'
            autoCapitalize='off'
            spellCheck={false}
            enterKeyHint='go'
          />
        </form>
      </div>
      <div className='term__chips'>
        {chips.map((c) => (
          <button
            key={c}
            type='button'
            className='chip sel'
            onClick={() => submit(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
