// First-load boot log. It is pure CSS (globals.css: #loader), so it plays from the first paint
// instead of waiting for hydration, which keeps LCP low on slow phones. JS only waits for it to
// finish (capped), then starts the page intro. Repeat visits (html.seen) and reduced motion skip it.
const MAX = 2.1;

export async function runLoader(): Promise<void> {
  const root = document.getElementById('loader');
  if (!root) {
    return;
  }
  const running = root
    .getAnimations({
      subtree: true,
    })
    .map((a) => a.finished.catch(() => {}));
  await Promise.race([
    Promise.all(running),
    new Promise((r) => setTimeout(r, MAX * 1000)),
  ]);
  root.hidden = true;
  document.documentElement.classList.add('is-loaded');
}
