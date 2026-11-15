import { skillCategories } from '@/constants';
import { Cmd } from './Cmd';

export function Skills() {
  const files = skillCategories.reduce((n, c) => n + c.items.length, 0);
  return (
    <section
      id='skills'
      className='sec'
      aria-labelledby='skills-h'
    >
      <Cmd>tree ~/skills</Cmd>
      <h2
        id='skills-h'
        className='h2'
        data-reveal
      >
        toolbox
      </h2>
      <p
        className='tree__root'
        aria-hidden='true'
      >
        ~/skills
      </p>
      <ul
        className='tree'
        data-print
      >
        {skillCategories.map((c, i) => (
          <li key={c.dir}>
            <span
              className='tree__branch'
              aria-hidden='true'
            >
              {i === skillCategories.length - 1 ? '└── ' : '├── '}
            </span>
            <span className='tree__dir'>{c.dir}/</span>
            <ul className='tree__files'>
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className='tree__sum'>
        {skillCategories.length} directories, {files} files
      </p>
    </section>
  );
}
