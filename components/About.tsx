import { about } from '@/constants';
import { Cmd } from './Cmd';

export function About() {
  return (
    <section
      id='about'
      className='sec'
      aria-labelledby='about-h'
    >
      <Cmd>cat about.md</Cmd>
      <h2
        id='about-h'
        className='sr-only'
      >
        About
      </h2>
      <p
        className='about__text'
        data-reveal
      >
        {about.text}
      </p>
      <dl
        className='about__facts'
        data-print
      >
        {about.facts.map((f) => (
          <div key={f.key}>
            <dt>{f.key}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
