import React, { useState, useEffect, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
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
// [SAVED FOR FUTURE USE] Geometric & Rain Backgrounds:
// import BaemonGeometricBackground from './components/BaemonGeometricBackground';
// import BaemonRainBackground from './components/BaemonRainBackground';
// import WorkBackground from './components/WorkBackground';
import ReactiveAmbientGlow from './components/ReactiveAmbientGlow';
import LaserSectionDivider from './components/LaserSectionDivider';
import { SkillModalProvider } from './context/SkillModalContext';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import SideProfilePage from './pages/SideProfilePage';
import ToxicScreenTransition from './components/sideprofile/ToxicScreenTransition';

export default function App() {
  // Determine initial route based on URL path
  const getInitialRoute = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/sideprofile' || path.startsWith('/sideprofile')) {
        return '/sideprofile';
      }
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);
  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('SIDE PROFILE');
  const [pendingRoute, setPendingRoute] = useState(null);
  const [sideProfileEntranceReady, setSideProfileEntranceReady] = useState(
    () => getInitialRoute() === '/sideprofile'
  );

  // If directly accessing /sideprofile, skip opening welcome screen
  const [showWelcome, setShowWelcome] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/sideprofile' || path.startsWith('/sideprofile')) {
        return false;
      }
    }
    return true;
  });

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

  // Client-Side Routing with Toxic Screen Transition
  const navigateTo = useCallback((targetRoute) => {
    const isEnteringSideProfile = targetRoute === '/sideprofile';
    if (isEnteringSideProfile) {
      setSideProfileEntranceReady(false);
    }
    setTransitionTarget(isEnteringSideProfile ? 'SIDE PROFILE' : 'MAIN PORTFOLIO');
    setPendingRoute(targetRoute);
    setTransitionActive(true);
  }, []);

  const handleTransitionMidpoint = useCallback(() => {
    if (pendingRoute) {
      window.history.pushState({}, '', pendingRoute);
      const isReturningToMain = pendingRoute === '/';

      // Sinkronisasikan perubahan DOM seketika di balik tirai 100% tertutup
      flushSync(() => {
        setCurrentRoute(pendingRoute);
      });

      if (isReturningToMain) {
        // PERMINTAAN USER: Buka halaman HERO (top: 0), tapi JANGAN KELIHATAN LOMPAT!
        // Rahasia zero-jump: Matikan scrub lag, reset scroll & refresh ScrollTrigger SEKARANG di 280ms di balik tirai tertutup.
        if (window.__lenis) {
          window.__lenis.stop();
          window.__lenis.scrollTo(0, { immediate: true, force: true });
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Reset ScrollTrigger animation progress pada Hero agar tidak lerping dari scroll sebelumnya
        ScrollTrigger.getAll().forEach((st) => {
          const isHeroTrigger = st.trigger === document.getElementById('hero') || st.vars?.trigger === '#hero' || st.vars?.id === 'hero';
          if (isHeroTrigger && st.animation) {
            st.animation.progress(0);
          }
        });

        // Recalculate ScrollTrigger saat viewport tertutup tirai gelap
        ScrollTrigger.refresh();

        if (window.__lenis) {
          window.__lenis.resize();
          window.__lenis.start();
        }

        // Konfirmasi kepastian posisi 0 pada frame berikutnya (masih ~200ms sebelum tirai membuka di 520ms)
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true, force: true });
            window.__lenis.resize();
          }
          ScrollTrigger.refresh();
        });
      } else {
        // Masuk ke Side Profile: siapkan scroll paling atas di balik tirai tertutup
        setSideProfileEntranceReady(false);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true, force: true });
          window.__lenis.resize();
        }
      }
    }
  }, [pendingRoute]);

  const handleOpenStart = useCallback(() => {
    // Dipanggil tepat pada 520ms saat tirai mulai terbuka:
    // Memicu animasi Entrance Side Profile mengalir tepat di depan mata pengguna!
    setSideProfileEntranceReady(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setTransitionActive(false);
    setPendingRoute(null);
    // Note: Jangan panggil ScrollTrigger.refresh() di sini!
    // Semua posisi Hero sudah stabil di 280ms di balik tirai sehingga saat tirai membuka, Hero sudah statis sempurna tanpa loncatan.
  }, []);

  // Listen to browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/sideprofile' || path.startsWith('/sideprofile')) {
        setSideProfileEntranceReady(true);
        setCurrentRoute('/sideprofile');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        setCurrentRoute('/');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true, force: true });
            window.__lenis.resize();
          }
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Active section scroll observer for main portfolio navbar
  useEffect(() => {
    if (currentRoute !== '/') return;

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
  }, [currentRoute]);

  const isSideProfile = currentRoute === '/sideprofile';

  return (
    <SmoothScrollProvider isLocked={showWelcome}>
      <SkillModalProvider>
        {/* Toxic Screen Transition Curtain */}
        <ToxicScreenTransition
          isActive={transitionActive}
          targetName={transitionTarget}
          onMidpoint={handleTransitionMidpoint}
          onOpenStart={handleOpenStart}
          onComplete={handleTransitionComplete}
        />

        {/* MAIN BABYMONSTER PORTFOLIO: Kept mounted in the DOM to eliminate heavy re-mount lag */}
        <div
          style={{ display: isSideProfile ? 'none' : 'flex' }}
          className="min-h-screen bg-[#FAFAFA] dark:bg-[#0f1117] text-[#09090B] dark:text-white flex-col selection:bg-[#E11D2E]/30 selection:text-white overflow-x-hidden w-full max-w-full"
        >
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

          {/* [SAVED FOR FUTURE USE] Alternative Background Components: */}
          {/* <BaemonGeometricBackground /> */}
          {/* <BaemonRainBackground /> */}
          {/* <WorkBackground /> */}

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

          {/* Semantic Footer with Tactical /sideprofile Trigger Button */}
          <Footer onNavigateToSideProfile={() => navigateTo('/sideprofile')} />
        </div>

        {/* SIDE PROFILE PAGE: Mounted only when active */}
        {isSideProfile && (
          <SideProfilePage
            isReady={sideProfileEntranceReady}
            onBackToPortfolio={() => navigateTo('/')}
          />
        )}
      </SkillModalProvider>
    </SmoothScrollProvider>
  );
}
