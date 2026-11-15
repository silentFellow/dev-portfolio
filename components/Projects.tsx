import Link from 'next/link';
import { glyph, projects } from '@/constants';
import { getStars } from '@/lib/feeds';
import { Cmd } from './Cmd';
import { Demo } from './Demo';
import { ProjectsMotion } from './ProjectsMotion';

const MIN_STARS = 5; // owner's rule: never show a small number

export async function Projects() {
  const stars = await Promise.all(projects.map((p) => getStars(p.repo)));
  return (
    <section
      id='projects'
      className='sec'
      aria-labelledby='projects-h'
    >
      <Cmd>ls -l ~/projects</Cmd>
      <h2
        id='projects-h'
        className='h2'
        data-reveal
      >
        things i built
      </h2>
      <div className='work'>
        <ol className='work__list'>
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className={`row${i === 0 ? ' is-active' : ''}`}
            >
              <p className='row__perm'>
                {p.section === 3 ? '-rw-r--r--' : '-rwxr-xr-x'} {p.kind}{' '}
                {p.year}
                {(stars[i] ?? 0) >= MIN_STARS && (
                  <span className='row__stars'>
                    {'  '}
                    <span
                      className='glyph'
                      aria-hidden='true'
                    >
                      {glyph.star}
                    </span>{' '}
                    {stars[i]}
                    <span className='sr-only'> stars on GitHub</span>
                  </span>
                )}
              </p>
              <h3 className='row__title'>
                <Link
                  href={`/work/${p.slug}`}
                  className='sel'
                >
                  {p.title}
                </Link>
              </h3>
              <div className='row__demo'>
                <Demo
                  project={p}
                  active
                />
              </div>
              <p className='row__tagline'>{p.tagline}</p>
              <p className='row__stack'>{p.stack.join(' · ').toLowerCase()}</p>
              {p.fork && (
                <p className='row__fork'>
                  fork of {p.fork.upstream}, with my additions
                </p>
              )}
              <Link
                href={`/work/${p.slug}`}
                className='row__cta sel'
              >
                man {p.slug} ❯
                <span className='sr-only'>: read the {p.title} page</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className='work__stage'>
          {projects.map((p, i) => (
            <Demo
              key={p.slug}
              project={p}
              active={i === 0}
            />
          ))}
        </div>
      </div>
      <ProjectsMotion />
    </section>
  );
}
