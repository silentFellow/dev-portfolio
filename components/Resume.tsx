import { glyph, site } from '@/constants';
import { Cmd } from './Cmd';

export function Resume() {
  return (
    <section
      id='resume'
      className='sec'
      aria-labelledby='resume-h'
    >
      <Cmd>ls ~/docs</Cmd>
      <h2
        id='resume-h'
        data-reveal
      >
        <a
          href={site.resume}
          target='_blank'
          rel='noopener noreferrer'
          className='resume sel'
        >
          <span className='sr-only'>Resume: </span>
          <span aria-hidden='true'>❯</span> cat resume.pdf
        </a>
      </h2>
      <p className='resume__note'>
        <span
          className='glyph'
          aria-hidden='true'
        >
          {glyph.pdf}
        </span>{' '}
        one page, ats friendly, opens on google drive in a new tab
      </p>
    </section>
  );
}
