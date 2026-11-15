import { site, socialMedia } from '@/constants';
import { Cmd } from './Cmd';

export function Contact() {
  return (
    <section
      id='contact'
      className='sec'
      aria-labelledby='contact-h'
    >
      <Cmd>mail -s "hello" gowtham</Cmd>
      <h2
        id='contact-h'
        className='h2'
        data-reveal
      >
        say hello
      </h2>
      <a
        href={`mailto:${site.email}`}
        className='mail sel'
      >
        {site.email}
      </a>
      <ul className='socials'>
        {socialMedia.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target='_blank'
              rel='noopener noreferrer'
              className='sel'
            >
              <span
                className='glyph'
                aria-hidden='true'
              >
                {s.icon}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <div className='colophon'>
        <p>
          © {new Date().getFullYear()} {site.name}. set in comic shanns mono and
          jetbrains mono.
        </p>
        <p>catppuccin mocha palette · next.js, gsap, lenis</p>
      </div>
    </section>
  );
}
