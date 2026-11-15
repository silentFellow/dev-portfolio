import { glyph, workExperience } from '@/constants';
import { Cmd } from './Cmd';

export function Experience() {
  return (
    <section
      id='log'
      className='sec'
      aria-labelledby='log-h'
    >
      <Cmd>git log --graph --all</Cmd>
      <h2
        id='log-h'
        className='h2'
        data-reveal
      >
        work log
      </h2>
      <div className='log'>
        {workExperience.map((w, wi) => (
          <article
            key={w.branch}
            className='branch'
          >
            <header className='branch__head'>
              <p className='branch__ref'>
                <span
                  className='glyph'
                  aria-hidden='true'
                >
                  {glyph.branch}
                </span>{' '}
                {w.branch}
              </p>
              <h3 className='branch__company'>
                <a
                  href={w.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='sel'
                >
                  {w.company}
                </a>
              </h3>
              <p className='branch__meta'>
                {w.location}
                <br />
                {w.period}
              </p>
            </header>
            <div className='branch__body'>
              <ol
                className='commits'
                data-print
                aria-label={`Roles at ${w.company}, newest first`}
              >
                {w.roles.map((r, ri) => (
                  <li
                    key={r.hash}
                    className='commit'
                  >
                    <span className='commit__hash'>{r.hash}</span>
                    {ri === 0 && (
                      <span className='commit__ref'>
                        ({wi === 0 ? `HEAD → ${w.branch}` : w.branch})
                      </span>
                    )}
                    <span>{r.title}</span>
                    {r.date && <span className='commit__date'>{r.date}</span>}
                  </li>
                ))}
              </ol>
              <ul
                className='points'
                data-print
              >
                {w.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
