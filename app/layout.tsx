import type { Metadata, Viewport } from 'next';
import { StatusLine } from '@/components/StatusLine';
import { projects, site, socialMedia } from '@/constants';
import { Engine } from '@/engine/next';
import { body, code } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | software engineer, terminal and web`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    images: [
      '/og.png',
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#1e1e2e',
  colorScheme: 'dark',
};

// Before first paint: motion flags, and `seen` so the boot log only plays on the first visit.
const flags = `(function(){var c=document.documentElement.classList;c.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)c.add('motion');try{if(localStorage.getItem('booted'))c.add('seen');localStorage.setItem('booted','1')}catch(e){}})()`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.handle,
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'CDW',
  },
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: socialMedia.map((s) => s.href),
};

const boot = [
  'Started tmux session "gowtham".',
  `Mounted ~/projects (${projects.length} repos).`,
  'Reached target go, node, nvim.',
  'Loaded fonts: comic shanns, jetbrains mono.',
  'Linked blog feed.',
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${body.variable} ${code.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static flag script, must run before paint
          dangerouslySetInnerHTML={{
            __html: flags,
          }}
        />
      </head>
      <body>
        <a
          className='skip-link'
          href='#main'
          data-no-transition
        >
          Skip to content
        </a>
        <div
          id='curtain'
          aria-hidden='true'
        >
          <div className='curtain__panel' />
        </div>
        <div
          id='loader'
          role='status'
          aria-label='Loading'
        >
          <ol className='boot'>
            {boot.map((line) => (
              <li key={line}>
                <span className='boot__ok'>[ OK ]</span> {line}
              </li>
            ))}
          </ol>
          <p className='boot__count'>gowtham login: guest</p>
        </div>
        <main
          id='main'
          tabIndex={-1}
        >
          {children}
        </main>
        <StatusLine />
        <script
          type='application/ld+json'
          // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped JSON-LD
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Engine />
      </body>
    </html>
  );
}
