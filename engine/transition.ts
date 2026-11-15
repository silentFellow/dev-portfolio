// Page transitions: `clear`. The well colour fills the screen row by row, then lifts the same way.
import { gsap } from 'gsap';
import { ease, prefersReducedMotion } from './env';

const curtain = () => document.getElementById('curtain') as HTMLElement;
const panel = () => curtain().querySelector('.curtain__panel');

export const playLeave = () =>
  prefersReducedMotion()
    ? Promise.resolve(
        gsap.set(curtain(), {
          autoAlpha: 1,
        }),
      )
    : Promise.resolve(
        gsap
          .timeline()
          .set(curtain(), {
            autoAlpha: 1,
          })
          .fromTo(
            panel(),
            {
              clipPath: 'inset(0% 0% 100% 0%)',
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.45,
              ease: ease.print,
            },
          ),
      );

export const playEnter = () =>
  prefersReducedMotion()
    ? Promise.resolve(
        gsap.set(curtain(), {
          autoAlpha: 0,
        }),
      )
    : Promise.resolve(
        gsap
          .timeline()
          .to(panel(), {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 0.45,
            ease: ease.print,
          })
          .set(curtain(), {
            autoAlpha: 0,
          }),
      );
