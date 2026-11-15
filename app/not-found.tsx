import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404: no such file',
};

export default function NotFound() {
  return (
    <section className='lost'>
      <h1 className='lost__code'>404</h1>
      <p className='lost__msg'>
        <span>zsh:</span> no such file or directory. this page was never
        committed.{' '}
        <span
          className='caret'
          aria-hidden='true'
        />
      </p>
      <Link
        href='/'
        className='lost__home sel'
      >
        cd ~
      </Link>
    </section>
  );
}
