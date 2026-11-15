'use client';
// Projects: the active row swaps the sticky demo stage (desktop); on phones each row plays its own
// demo while on screen. Only visible demos play. Reduced motion: no autoplay, native controls.
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/engine';
import { usePage } from '@/engine/next';

export function ProjectsMotion() {
  usePage(() => {
    const root = document.querySelector<HTMLElement>('.work');
    if (!root) {
      return;
    }
    const rows = [
      ...root.querySelectorAll<HTMLElement>('.row'),
    ];
    const stage = [
      ...root.querySelectorAll<HTMLElement>('.work__stage .demo'),
    ];
    const videos = [
      ...root.querySelectorAll('video'),
    ];
    const reduced = prefersReducedMotion();
    if (reduced) {
      videos.forEach((v) => {
        v.controls = true;
      });
    }
    let current = 0;
    let inView = false;
    const shown = (el: HTMLElement) => el.offsetParent !== null;
    const play = (v: HTMLVideoElement | null, on: boolean) => {
      if (!v || reduced) {
        return;
      }
      if (on) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    };
    const sync = () => {
      rows.forEach((r, i) => {
        r.classList.toggle('is-active', i === current);
      });
      stage.forEach((f, i) => {
        f.classList.toggle('is-active', i === current);
        play(f.querySelector('video'), inView && i === current && shown(f));
      });
    };
    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (s) => {
        inView = s.isActive;
        sync();
      },
    });
    rows.forEach((row, i) => {
      ScrollTrigger.create({
        trigger: row,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (s) => {
          if (s.isActive) {
            current = i;
            sync();
          }
        },
      });
      const v = row.querySelector<HTMLVideoElement>('.row__demo video');
      if (v) {
        ScrollTrigger.create({
          trigger: v,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (s) => play(v, s.isActive && shown(v)),
        });
      }
    });
    return () => {
      videos.forEach((v) => {
        v.pause();
      });
    };
  });
  return null;
}
