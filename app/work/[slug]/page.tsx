import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Demo } from '@/components/Demo';
import { glyph, projects, site } from '@/constants';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p
    ? {
        title: `${p.title}(${p.section})`,
        description: `${p.title}: ${p.tagline} ${p.description}`.slice(0, 158),
      }
    : {};
}

export default async function Work({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) {
    notFound();
  }
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const id = `${p.title.toUpperCase()}(${p.section})`;
  const manual =
    p.section === 3 ? 'Library Functions Manual' : 'General Commands Manual';
  const sections = [
    {
      h: 'NAME',
      body: (
        <p className='man__lead'>
          {p.title}: {p.tagline}
        </p>
      ),
    },
    {
      h: 'SYNOPSIS',
      body: <pre className='man__synopsis'>{p.synopsis}</pre>,
    },
    {
      h: 'DESCRIPTION',
      body: <p>{p.description}</p>,
    },
    {
      h: 'DEMO',
      wide: true,
      body: (
        <div className='man__demo'>
          <Demo
            project={p}
            active
          />
        </div>
      ),
    },
    {
      h: 'FEATURES',
      body: (
        <ul className='man__list'>
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      h: 'NOTES',
      body: <p>{p.notes}</p>,
    },
    ...(p.fork
      ? [
          {
            h: 'HISTORY',
            body: (
              <p>
                {p.fork.added} Upstream:{' '}
                <a
                  href={p.fork.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='ulink'
                >
                  {p.fork.upstream}
                </a>
                .
              </p>
            ),
          },
        ]
      : []),
    {
      h: 'STACK',
      body: <p className='mono'>{p.stack.join(', ').toLowerCase()}</p>,
    },
    {
      h: 'SEE ALSO',
      body: (
        <ul className='man__links'>
          {p.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target='_blank'
                rel='noopener noreferrer'
                className='ulink'
              >
                <span
                  className='glyph'
                  aria-hidden='true'
                >
                  {l.label === 'source' ? glyph.github : glyph.external}
                </span>{' '}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <article className='man'>
      <header className='man__head'>
        <span>{id}</span>
        <span>{manual}</span>
        <span>{id}</span>
      </header>
      <Link
        href='/#projects'
        className='man__back sel'
      >
        ❮ cd ~/projects
      </Link>
      <h1
        className='man__title'
        data-reveal
        data-intro
      >
        {p.title}
      </h1>
      {sections.map((s) => (
        <section
          key={s.h}
          className='man__sec'
          aria-label={s.h.toLowerCase()}
          data-reveal
        >
          <h2 className='man__h'>{s.h}</h2>
          <div className={`man__body${s.wide ? ' man__body--wide' : ''}`}>
            {s.body}
          </div>
        </section>
      ))}
      <footer className='man__foot'>
        <span>{site.handle}</span>
        <span>{p.year}</span>
        <span>{id}</span>
      </footer>
      <nav
        className='man__next'
        aria-label='Next project'
      >
        <p className='cmd'>
          <span className='cmd__arrow'>❯</span>{' '}
          <span className='cmd__text'>man {next.slug}</span>{' '}
          <span
            className='caret'
            aria-hidden='true'
          />
        </p>
        <Link
          href={`/work/${next.slug}`}
          className='sel'
        >
          next: {next.title}
        </Link>
      </nav>
    </article>
  );
}
