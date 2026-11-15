import { site } from '@/constants';
import { type Post, parsePosts } from './rss';

const DAY = 86_400;

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(site.blogFeed, {
      next: {
        revalidate: DAY,
      },
    });
    return res.ok ? parsePosts(await res.text()) : [];
  } catch {
    return [];
  }
}

/** Star count, or null when unknown. Callers show it only at 5 or more. */
export async function getStars(repo: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${site.handle}/${repo}`,
      {
        headers: {
          accept: 'application/vnd.github+json',
        },
        next: {
          revalidate: DAY,
        },
      },
    );
    return res.ok ? ((await res.json()).stargazers_count ?? null) : null;
  } catch {
    return null;
  }
}
