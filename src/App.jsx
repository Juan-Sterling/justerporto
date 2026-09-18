import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = ['education', 'skills', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 220; // Trigger threshold

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollY >= top) {
            setActiveSection(id);
            return;
          }
        }
      }

      // If above education, clear active section
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#000000] text-[#09090B] dark:text-white flex flex-col selection:bg-[#E11D2E]/30 selection:text-white transition-colors duration-300">
      {/* Sticky Header Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        <Hero />
        <Education />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
}
