// Smooth scroll on ONE clock: Lenis is driven by gsap.ticker, ScrollTrigger reads Lenis.
// Reduced motion → native scroll, no Lenis.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initScroll() {
  if (lenis || prefersReducedMotion()) {
    return;
  }
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    anchors: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
export function resetScroll() {
  if (lenis) {
    lenis.scrollTo(0, {
      immediate: true,
      force: true,
    });
  } else {
    scrollTo(0, 0);
  }
}
export function scrollToTarget(target: string | HTMLElement) {
  const el =
    typeof target === 'string'
      ? document.querySelector<HTMLElement>(target)
      : target;
  if (!el) {
    return;
  }
  if (lenis) {
    lenis.scrollTo(el, {
      duration: 1.2,
      easing: (t) => 1 - (1 - t) ** 4,
    });
  } else {
    el.scrollIntoView();
  }
}
