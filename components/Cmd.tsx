// A section's command line: the "heading" of every window in the session.
export function Cmd({ children }: { children: string }) {
  return (
    <p
      className='cmd'
      data-reveal
    >
      <span className='cmd__path'>~/gowtham</span>{' '}
      <span className='cmd__arrow'>❯</span>{' '}
      <span className='cmd__text'>{children}</span>
    </p>
  );
}
