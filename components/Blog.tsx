import { site } from '@/constants';
import { getPosts } from '@/lib/feeds';
import { Cmd } from './Cmd';

const fmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
});

export async function Blog() {
  const posts = await getPosts();
  return (
    <section
      id='blog'
      className='sec'
      aria-labelledby='blog-h'
    >
      <Cmd>tail -n 4 ~/blog/feed.xml</Cmd>
      <h2
        id='blog-h'
        className='h2'
        data-reveal
      >
        notes &amp; thoughts
      </h2>
      {posts.length > 0 && (
        <ul
          className='posts'
          data-print
        >
          {posts.map((p) => (
            <li
              key={p.href}
              className='post'
            >
              <a
                href={p.href}
                target='_blank'
                rel='noopener noreferrer'
                className='sel'
              >
                <time
                  className='post__date'
                  dateTime={p.date.toISOString()}
                >
                  {fmt.format(p.date)}
                </time>
                <span className={`post__tag post__tag--${p.tag}`}>
                  #{p.tag}
                </span>
                <span className='post__title'>{p.title}</span>
                <span
                  className='post__arrow'
                  aria-hidden='true'
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className='posts__more'>
        {posts.length > 0 ? 'read every post' : 'read the blog'} on{' '}
        <a
          href={site.blog}
          target='_blank'
          rel='noopener noreferrer'
          className='sel'
        >
          blogs.silentfellow.dev ↗
        </a>
      </p>
    </section>
  );
}
