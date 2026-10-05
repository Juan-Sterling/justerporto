import React, { useState, useEffect, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import BaemonBackground from './components/BaemonBackground';
import ReactiveAmbientGlow from './components/ReactiveAmbientGlow';
import LaserSectionDivider from './components/LaserSectionDivider';
import { SkillModalProvider } from './context/SkillModalContext';
import { SmoothScrollProvider } from './context/SmoothScrollContext';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeExiting, setWelcomeExiting] = useState(false);

  // Mode animasi exit BABYMONSTER yang aktif: 'sheesh' (Diagonal Laser Claw Slash & Split Wipe)
  const exitMode = 'sheesh';

  const [activeSection, setActiveSection] = useState('');

  const handleStartExit = useCallback(() => {
    setWelcomeExiting(true);
  }, []);

  const handleComplete = useCallback(() => {
    setShowWelcome(false);
    // Refresh ScrollTriggers once the welcome screen overlay is removed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  }, []);

  useEffect(() => {
    const sections = ['experience', 'skills', 'education', 'contact'];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const offset = 220; // Trigger threshold

          for (let i = sections.length - 1; i >= 0; i--) {
            const id = sections[i];
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop - offset;
              if (scrollY >= top) {
                setActiveSection(id);
                ticking = false;
                return;
              }
            }
          }

          // If above experience, clear active section
          setActiveSection('');
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SmoothScrollProvider isLocked={showWelcome}>
      <SkillModalProvider>
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0f1117] text-[#09090B] dark:text-white flex flex-col selection:bg-[#E11D2E]/30 selection:text-white">
          {/* Opening Welcome Screen Animation */}
          {showWelcome && (
            <WelcomeScreen
              exitMode={exitMode}
              onStartExit={handleStartExit}
              onComplete={handleComplete}
            />
          )}

          {/* Sticky Header Navigation */}
          <Navbar activeSection={activeSection} />

          {/* Atmospheric BABYMONSTER Ambient Background Canvas */}
          <BaemonBackground />

          {/* GSAP Scroll-Driven Reactive Ambient Lighting Atmosphere */}
          <ReactiveAmbientGlow />

          {/* Main Content Sections with Laser Horizon Transitions */}
          <main className="flex-1 w-full relative z-10">
            {/* Hero Portal Zooms directly into Experience */}
            <Hero welcomeActive={showWelcome && !welcomeExiting} />
            <Experience />
            <LaserSectionDivider />
            <Skills />
            <LaserSectionDivider />
            <Education />
            <LaserSectionDivider />
            <Contact />
          </main>

          {/* Semantic Footer */}
          <Footer />
        </div>
      </SkillModalProvider>
    </SmoothScrollProvider>
  );
}
