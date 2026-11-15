'use client';
// The tmux status line: real navigation. It is the concept's driver: one variable (the active
// window, from scroll) sets the highlighted window; the clock keeps the frame alive at rest.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { windows } from '@/constants';
import { usePage } from '@/engine/next';

const time = () =>
  new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

export function StatusLine() {
  const pathname = usePathname();
  const [active, setActive] = useState('top');
  const [clock, setClock] = useState('');
  const wins = useRef<HTMLDivElement>(null);
  const home = pathname === '/';

  usePage(() => {
    setClock(time());
    let last = 0;
    const tick = (t: number) => {
      if (t - last > 1) {
        last = t;
        setClock(time());
      }
    };
    gsap.ticker.add(tick);
    if (location.pathname === '/') {
      windows.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) {
          return;
        }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) {
              setActive(id);
              const a = wins.current?.querySelector<HTMLElement>(
                `[data-win="${id}"]`,
              );
              const w = wins.current;
              if (a && w) {
                w.scrollTo({
                  left: a.offsetLeft - (w.clientWidth - a.offsetWidth) / 2,
                });
              }
            }
          },
        });
      });
    }
    return () => gsap.ticker.remove(tick);
  });

  const slug = pathname.startsWith('/work/') ? pathname.split('/')[2] : null;

  return (
    <nav
      className='bar'
      aria-label='Sections'
    >
      <a
        href={home ? '#top' : '/'}
        className='bar__session'
        data-no-transition={home || undefined}
      >
        [gowtham]
      </a>
      <div
        className='bar__wins'
        ref={wins}
      >
        {home ? (
          windows.map((w, i) => (
            <a
              key={w.id}
              href={`#${w.id}`}
              data-win={w.id}
              data-no-transition
              className='sel'
              aria-current={active === w.id ? 'true' : undefined}
            >
              {i}:{w.name}
              <span
                className='bar__flag'
                aria-hidden='true'
              >
                {active === w.id ? '*' : ' '}
              </span>
            </a>
          ))
        ) : (
          <>
            <a
              href='/'
              className='sel'
            >
              0:~
            </a>
            <a
              href={pathname}
              aria-current='page'
              className='sel'
              data-no-transition
            >
              1:{slug ? `man ${slug}` : 'lost'}
              <span
                className='bar__flag'
                aria-hidden='true'
              >
                *
              </span>
            </a>
          </>
        )}
      </div>
      <div className='bar__right'>
        <span>silentfellow.dev</span>
        <span
          className='bar__clock'
          suppressHydrationWarning
        >
          {clock}
        </span>
      </div>
    </nav>
  );
}
