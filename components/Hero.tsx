import { hero, site } from '@/constants';
import { Terminal } from './Terminal';

export function Hero() {
  return (
    <section
      id='top'
      className='hero'
      aria-label='Intro'
    >
      <p className='hero__top'>
        <span>
          <span
            className='hero__dot'
            aria-hidden='true'
          />
          open to good problems
        </span>
        <span>{site.handle}</span>
      </p>
      <h1
        className='hero__name'
        data-reveal
        data-intro
      >
        {site.name}
      </h1>
      <div className='hero__copy'>
        <p
          className='hero__line'
          data-reveal
          data-intro
          data-delay='0.25'
        >
          {site.name.split(' ')[0]} <em>{hero.line}</em>
          <span
            className='caret'
            aria-hidden='true'
          />
        </p>
        <ul
          className='hero__meta'
          data-print
          data-intro
          data-delay='0.45'
        >
          {hero.meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
      <div
        className='hero__term'
        data-reveal
        data-intro
        data-delay='0.6'
      >
        <Terminal />
      </div>
    </section>
  );
}
