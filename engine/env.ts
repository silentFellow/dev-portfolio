export const prefersReducedMotion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () =>
  matchMedia('(hover: none), (pointer: coarse)').matches;

// Shared easing vocabulary. "Print like a TTY": stepped for anything that appears.
export const ease = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
  print: 'steps(8)',
} as const;
