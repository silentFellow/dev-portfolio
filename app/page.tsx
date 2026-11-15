import { About } from '@/components/About';
import { Blog } from '@/components/Blog';
import { Contact } from '@/components/Contact';
import { Experience } from '@/components/Experience';
import { Hero } from '@/components/Hero';
import { Misc } from '@/components/Misc';
import { Projects } from '@/components/Projects';
import { Resume } from '@/components/Resume';
import { Skills } from '@/components/Skills';

export const revalidate = 86_400; // blog feed + GitHub stars refresh daily

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Resume />
      <Blog />
      <Misc />
      <Contact />
    </>
  );
}
