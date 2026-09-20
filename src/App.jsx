import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = ['experience', 'skills', 'education', 'contact'];
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

      // If above experience, clear active section
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#000000] text-[#09090B] dark:text-white flex flex-col selection:bg-[#E11D2E]/30 selection:text-white transition-colors duration-300">
      {/* Opening Welcome Screen Animation */}
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

      {/* Sticky Header Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections with Unified Canvas Grid Motif */}
      <main className="flex-1 w-full relative">
        {/* Developer Canvas Grid across all sections */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2A2A2A20_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A20_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" 
          aria-hidden="true"
        />
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
}
