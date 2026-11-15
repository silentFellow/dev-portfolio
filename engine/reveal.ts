// Declarative motion through data attributes:
//   data-print     children appear one line at a time, in steps (the motion verb)
//   data-reveal    block appears with a stepped wipe
//   data-intro     play with the page intro instead of on scroll
//   data-delay     extra delay (seconds)
// Skipped under reduced motion; CSS keeps content visible without JS.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger);

function tween(el: HTMLElement, paused: boolean) {
  const delay = Number.parseFloat(el.dataset.delay || '0');
  const trigger = paused
    ? undefined
    : {
        trigger: el,
        start: 'top 90%',
        once: true,
      };
  gsap.set(el, {
    visibility: 'visible',
  });
  if (el.hasAttribute('data-print')) {
    // Each direct child is a "line" printed after the previous one.
    return gsap.from(el.children, {
      autoAlpha: 0,
      duration: 0.01,
      stagger: 0.06,
      delay,
      paused,
      scrollTrigger: trigger,
    });
  }
  return gsap.fromTo(
    el,
    {
      clipPath: 'inset(0% 100% 0% 0%)',
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.5,
      ease: ease.print,
      delay,
      paused,
      scrollTrigger: trigger,
    },
  );
}

/** Wire every reveal inside `root`. Returns the intro timeline (paused) for the page entrance. */
export function initReveals(root: ParentNode = document) {
  const intro = gsap.timeline({
    paused: true,
  });
  if (prefersReducedMotion()) {
    return intro;
  }
  root
    .querySelectorAll<HTMLElement>('[data-print], [data-reveal]')
    .forEach((el) => {
      const isIntro = el.hasAttribute('data-intro');
      const t = tween(el, isIntro);
      if (isIntro) {
        intro.add(() => {
          t.play();
        }, 0);
      }
    });
  return intro;
}
