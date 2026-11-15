import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parsePosts } from './rss.ts';

const item = (title: string, desc: string) =>
  `<item><title>${title}</title><link>https://b.dev/${title}/</link><pubDate>Tue, 11 Aug 2026 23:45:22 +0530</pubDate><description>${desc}</description></item>`;

test('parses items, decodes entities, tags by code presence, respects limit', () => {
  const xml = `<rss><channel>${item('Why I Like CLIs &amp; More', '&lt;code&gt;ls&lt;/code&gt;')}${item('So I Watched Mr.Robot', 'a show')}${item('third', '')}</channel></rss>`;
  const posts = parsePosts(xml, 2);
  assert.equal(posts.length, 2);
  assert.equal(posts[0].title, 'Why I Like CLIs & More');
  assert.equal(posts[0].href, 'https://b.dev/Why I Like CLIs &amp; More/');
  assert.equal(posts[0].tag, 'tech');
  assert.equal(posts[1].tag, 'thoughts');
  assert.equal(posts[0].date.getUTCFullYear(), 2026);
});

test('empty feed gives no posts', () => {
  assert.deepEqual(parsePosts('<rss></rss>'), []);
});
