import Hero from './components/hero/Hero';
import WorkExperience from './components/WorkExperience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <WorkExperience />
      <TechStack />
      <Projects />
      <Contact />
    </>
  );
}
