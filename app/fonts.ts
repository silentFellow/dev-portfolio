import localFont from 'next/font/local';

// JetBrains Mono Nerd Font Mono (OFL): body text and technical UI copy.
export const body = localFont({
  src: [
    {
      path: './fonts/jetbrains-mono-Regular.woff2',
      weight: '400',
    },
    {
      path: './fonts/jetbrains-mono-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-body',
  display: 'swap',
});

// ComicShannsMono Nerd Font Mono (MIT): display (bold) and code/terminal text (regular).
// Subset to Latin, box drawing and the glyphs in constants.glyph.
export const code = localFont({
  src: [
    {
      path: './fonts/comic-shanns-mono-Regular.woff2',
      weight: '400',
    },
    {
      path: './fonts/comic-shanns-mono-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-code',
  display: 'swap',
});
