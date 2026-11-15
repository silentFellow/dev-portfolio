import { achievements, education } from '@/constants';
import { Cmd } from './Cmd';

export function Misc() {
  return (
    <section
      id='misc'
      className='sec'
      aria-labelledby='misc-h'
    >
      <Cmd>cat ~/.achievements ~/.education</Cmd>
      <h2
        id='misc-h'
        className='sr-only'
      >
        Achievements and education
      </h2>
      <div className='misc__col'>
        <h3 className='misc__h'># achievements</h3>
        <ul
          className='checks'
          data-print
        >
          {achievements.map((a) => (
            <li key={a.title}>
              <span
                className='checks__box'
                aria-hidden='true'
              >
                [x]
              </span>
              <div>
                <a
                  href={a.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='checks__title ulink'
                >
                  {a.title}
                </a>
                <p className='checks__detail'>{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        className='misc__col edu'
        data-reveal
      >
        <h3 className='misc__h'># education</h3>
        <p className='edu__school'>{education.school}</p>
        <p>{education.degree}</p>
        <p className='edu__meta'>
          {education.period} · {education.location} · {education.score}
        </p>
      </div>
    </section>
  );
}
