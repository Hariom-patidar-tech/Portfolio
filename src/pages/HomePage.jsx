import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Domains from '../components/sections/Domains';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Certificates from '../components/sections/Certificates';
import ResumeSection from '../components/sections/ResumeSection';
import GitHubSection from '../components/sections/GitHubSection';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Skills />
      <Domains />
      <Projects />
      <Experience />
      <Certificates />
      <ResumeSection />
      <GitHubSection />
      <Contact />
    </main>
  );
}
