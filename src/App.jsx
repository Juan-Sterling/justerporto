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

const ANIMATION_MODES = [
  { id: 'sheesh', label: '1. SHEESH', icon: '🔥', desc: 'Diagonal Claw Slash Split' },
  { id: 'batterup', label: '2. BATTER UP', icon: '⚡', desc: 'Stadium Blast Doors' },
  { id: 'drip', label: '3. DRIP', icon: '💧', desc: 'Bass Drop Zoom' },
  { id: 'seven', label: '4. 7-MEMBERS', icon: '👑', desc: 'Concert LED Slits' },
];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeExiting, setWelcomeExiting] = useState(false);

  // Mode animasi exit BABYMONSTER yang aktif (Pilihan user: 'sheesh')
  // Pilihan yang terdokumentasi dan siap pakai:
  // - 'sheesh'   : Diagonal Laser Claw Slash & Split Wipe (Aktif)
  // - 'batterup' : Double Stadium Blast Doors
  // - 'drip'     : Bass Drop Chromatic Glitch & Devil Horns Hyper Zoom
  // - 'seven'    : 7-Members Staggered Concert LED Slits
  const [exitMode, setExitMode] = useState('sheesh');

  const [replayKey, setReplayKey] = useState(0);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(true);

  // Bilah preview interaktif disembunyikan secara default untuk pengunjung publik.
  // Tambahkan '?preview=true' di URL (misal: http://localhost:5173/?preview=true) jika ingin mengaktifkan tester kembali.
  const [showPreviewBar, setShowPreviewBar] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.search.includes('preview');
    }
    return false;
  });

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

  const triggerAnimation = (mode) => {
    setExitMode(mode);
    setWelcomeExiting(false);
    setShowWelcome(true);
    setReplayKey((k) => k + 1);
  };

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
    <SmoothScrollProvider isLocked={showWelcome}>
      <SkillModalProvider>
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0f1117] text-[#09090B] dark:text-white flex flex-col selection:bg-[#E11D2E]/30 selection:text-white">
          {/* Opening Welcome Screen Animation */}
          {showWelcome && (
            <WelcomeScreen
              key={replayKey}
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
            <Hero welcomeActive={showWelcome && !welcomeExiting} />
            <LaserSectionDivider />
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

          {/* Floating Baemon Exit Animation Switcher / Tester (Aktif jika showPreviewBar true atau via ?preview=true) */}
          {showPreviewBar && (
            <aside
              aria-label="Baemon Animation Tester"
              className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[10001] max-w-[95vw] select-none"
            >
              {isSwitcherOpen ? (
                <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#09090B]/90 backdrop-blur-xl border border-[#E11D2E]/40 shadow-2xl shadow-[#E11D2E]/30 text-white font-mono text-xs">
                  <div className="flex items-center gap-1.5 px-2 text-[#E11D2E] font-bold tracking-widest text-[11px] hidden sm:flex">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D2E] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D2E]" />
                    </span>
                    <span>EXIT:</span>
                  </div>

                  {ANIMATION_MODES.map((mode) => {
                    const isActive = exitMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => triggerAnimation(mode.id)}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#E11D2E] text-white shadow-[0_0_12px_rgba(225,29,46,0.6)] scale-[1.02]'
                            : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80 bg-zinc-900/60'
                        }`}
                        title={mode.desc}
                      >
                        <span>{mode.icon}</span>
                        <span className="text-[11px] sm:text-xs">{mode.label}</span>
                      </button>
                    );
                  })}

                  <div className="h-4 w-[1px] bg-zinc-700 mx-0.5" />

                  {/* Replay current active */}
                  <button
                    onClick={() => triggerAnimation(exitMode)}
                    className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors flex items-center gap-1 text-[11px] sm:text-xs cursor-pointer font-medium"
                    title="Replay current animation"
                  >
                    <span>🔄</span>
                    <span className="hidden sm:inline">Replay</span>
                  </button>

                  {/* Minimize toggle */}
                  <button
                    onClick={() => setIsSwitcherOpen(false)}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs ml-0.5"
                    title="Hide Preview Bar"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSwitcherOpen(true)}
                  className="px-3.5 py-2 rounded-full bg-[#09090B]/90 backdrop-blur-xl border border-[#E11D2E]/50 text-[#E11D2E] hover:text-white hover:bg-[#E11D2E] transition-all duration-300 shadow-xl shadow-[#E11D2E]/30 font-mono text-xs flex items-center gap-2 cursor-pointer font-bold"
                >
                  <span>🎬</span>
                  <span>Test Exit Animations</span>
                </button>
              )}
            </aside>
          )}
        </div>
      </SkillModalProvider>
    </SmoothScrollProvider>
  );
}
