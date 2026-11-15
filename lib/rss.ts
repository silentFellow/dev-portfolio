export type Post = {
  title: string;
  href: string;
  date: Date;
  tag: 'tech' | 'thoughts';
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, '’');

const field = (item: string, name: string) =>
  item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? '';

// shortcut: regex RSS parsing, fine for the owner's own Hugo feed; use a real parser if the feed changes shape.
export function parsePosts(xml: string, limit = 4): Post[] {
  return [
    ...xml.matchAll(/<item>([\s\S]*?)<\/item>/g),
  ]
    .slice(0, limit)
    .map(([, item]) => ({
      title: decode(field(item, 'title')),
      href: field(item, 'link'),
      date: new Date(field(item, 'pubDate')),
      // The feed has no categories: posts that show code are tech, the rest are thoughts.
      tag: field(item, 'description').includes('&lt;code&gt;')
        ? 'tech'
        : 'thoughts',
    }));
}
