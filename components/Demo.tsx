import type { Project } from '@/constants';

// A project's Demo: looping clip with its still as poster. Playback is driven by ProjectsMotion.
export function Demo({
  project,
  active,
}: {
  project: Project;
  active?: boolean;
}) {
  const src = `/demos/${project.slug}`;
  return (
    <figure
      className={`demo demo--${project.slug}${active ? ' is-active' : ''}`}
    >
      <video
        muted
        loop
        playsInline
        preload='none'
        poster={`${src}.webp`}
        aria-label={project.demoAlt}
      >
        <source
          src={`${src}.webm`}
          type='video/webm'
        />
        <source
          src={`${src}.mp4`}
          type='video/mp4'
        />
      </video>
    </figure>
  );
}
