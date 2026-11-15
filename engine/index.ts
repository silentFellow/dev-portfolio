// Engine core: framework-agnostic page lifecycle. No DOM access at import time (SSR-safe).
//   boot()            once, on first load: loader → page init → intro
//   leave() → cleanup()  before the route swaps
//   enter()           after the new page is in the DOM
// Project code hooks in with onPage(fn): fn runs inside a gsap.context, so its tweens and
// ScrollTriggers revert automatically. Return a cleanup for anything else.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './env';
import { runLoader } from './loader';
import { initReveals } from './reveal';
import { initScroll, resetScroll, startScroll, stopScroll } from './scroll';
import { playEnter, playLeave } from './transition';

export { ease, isTouch, prefersReducedMotion } from './env';
export { scrollToTarget } from './scroll';

export type PageFn = (page: {
  intro: gsap.core.Timeline;
  path: string;
}) => undefined | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

/** Run fn on every page load (and now, if a page is ready). Returns an unsubscribe. */
export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) {
    runPageFn(fn);
  }
  return () => {
    pageFns.delete(fn);
  };
}

function runPageFn(fn: PageFn) {
  ctx?.add(() => {
    const c = fn({
      // biome-ignore lint/style/noNonNullAssertion: set in initPage before any page fn runs
      intro: intro!,
      path: location.pathname,
    });
    if (typeof c === 'function') {
      cleanups.push(c);
    }
  });
}

function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => {
    intro = initReveals(document);
  });
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

export async function boot() {
  if (booted) {
    return;
  }
  booted = true;
  syncFlags();
  initScroll();
  stopScroll();
  initPage();
  await runLoader();
  startScroll();
  intro?.play();
}

export async function leave() {
  stopScroll();
  await playLeave();
}

/** Reverts every tween and ScrollTrigger of the current page. */
export function cleanup() {
  if (!ready) {
    return;
  }
  ready = false;
  cleanups.splice(0).forEach((c) => {
    c();
  });
  ctx?.revert();
  ctx = null;
}

/** Init the new page. `transition: false` for back/forward, where no leave ran. */
export async function enter({ transition = true, scrollTop = true } = {}) {
  if (!booted) {
    return;
  }
  cleanup();
  if (scrollTop) {
    resetScroll();
  }
  initPage();
  if (transition) {
    await playEnter();
  }
  startScroll();
  intro?.play();
}
