import React, { useState, useEffect, useCallback, startTransition, Suspense, lazy } from 'react';
import { flushSync } from 'react-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import BaemonBackground from './components/BaemonBackground';
// [SAVED FOR FUTURE USE] Wave, Geometric & Rain Backgrounds:
// import BaemonCrimsonWaveBackground from './components/BaemonCrimsonWaveBackground';
// import BaemonGeometricBackground from './components/BaemonGeometricBackground';
// import BaemonRainBackground from './components/BaemonRainBackground';
// import WorkBackground from './components/WorkBackground';
import ReactiveAmbientGlow from './components/ReactiveAmbientGlow';
import { SkillModalProvider } from './context/SkillModalContext';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import ToxicScreenTransition from './components/sideprofile/ToxicScreenTransition';

const loadAbout = () => import('./sections/About');
const loadSevenMemberSlitTransition = () => import('./components/transitions/SevenMemberSlitTransition');
const loadExperience = () => import('./sections/Experience');
const loadBatterUpStageTransition = () => import('./components/transitions/BatterUpStageTransition');
const loadSkills = () => import('./sections/Skills');
const loadMonolithSplitTransition = () => import('./components/transitions/MonolithSplitTransition');
const loadEducation = () => import('./sections/Education');
const loadEncoreDiagonalShutterTransition = () => import('./components/transitions/EncoreDiagonalShutterTransition');
const loadContact = () => import('./sections/Contact');
const loadFooter = () => import('./components/Footer');

const About = lazy(loadAbout);
const SevenMemberSlitTransition = lazy(loadSevenMemberSlitTransition);
const Experience = lazy(loadExperience);
const BatterUpStageTransition = lazy(loadBatterUpStageTransition);
const Skills = lazy(loadSkills);
const MonolithSplitTransition = lazy(loadMonolithSplitTransition);
const Education = lazy(loadEducation);
const EncoreDiagonalShutterTransition = lazy(loadEncoreDiagonalShutterTransition);
const Contact = lazy(loadContact);
const Footer = lazy(loadFooter);
const SideProfilePage = lazy(() => import('./pages/SideProfilePage'));

function BelowFoldScrollSync() {
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      if (window.__lenis) {
        window.__lenis.resize();
      }
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);
  return null;
}

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

  const isInitialSideProfile = getInitialRoute() === '/sideprofile';

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);
  const [transitionActive, setTransitionActive] = useState(isInitialSideProfile);
  const [transitionInitialClosed, setTransitionInitialClosed] = useState(isInitialSideProfile);
  const [transitionTarget, setTransitionTarget] = useState('SIDE PROFILE');
  const [pendingRoute, setPendingRoute] = useState(null);
  const [portalEntranceTrigger, setPortalEntranceTrigger] = useState(null);
  const [sideProfileEntranceReady, setSideProfileEntranceReady] = useState(isInitialSideProfile);

  // If directly accessing /sideprofile, skip opening welcome screen
  const [showWelcome, setShowWelcome] = useState(() => !isInitialSideProfile);
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  // Mode animasi exit BABYMONSTER yang aktif: 'sheesh' (Diagonal Laser Claw Slash & Split Wipe)
  const exitMode = 'sheesh';

  const [activeSection, setActiveSection] = useState('');

  const handleStartExit = useCallback(() => {
    setWelcomeExiting(true);
  }, []);

  const handleComplete = useCallback(() => {
    setBelowFoldReady(true);
    setShowWelcome(false);
    if (window.__lenis) {
      window.__lenis.resize();
      window.__lenis.start();
    }
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  // Helper: Reliable return to Main Portfolio
  // Resets scroll, primes Hero, resets ScrollTrigger scrub progress, and displays Welcome Screen
  const returnToMainPortfolio = useCallback(() => {
    setTransitionActive(false);
    setPendingRoute(null);

    // 1. Instantly stop Lenis and reset scroll to absolute top
    if (window.__lenis) {
      window.__lenis.stop();
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Prime BaemonPortalO & Hero elements to hidden pre-entrance states
    setPortalEntranceTrigger({ phase: 'prime', timestamp: Date.now() });

    // 3. Switch route to '/' and activate WelcomeScreen
    flushSync(() => {
      setCurrentRoute('/');
      setWelcomeExiting(false);
      setShowWelcome(true);
    });

    // 4. Explicitly reset Hero ScrollTrigger scrub progress to 0
    const heroST = ScrollTrigger.getById('hero');
    if (heroST && heroST.animation) {
      heroST.animation.progress(0);
    }
    ScrollTrigger.getAll().forEach((st) => {
      const isHeroTrigger =
        st.trigger === document.getElementById('hero') ||
        st.vars?.trigger === '#hero' ||
        st.vars?.id === 'hero';
      if (isHeroTrigger && st.animation) {
        st.animation.progress(0);
      }
    });

    // 5. Re-confirm scroll position 0 on next animation frame to override any browser async restoration
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true, force: true });
      }
    });
  }, []);

  // Client-Side Routing:
  // - Ke Side Profile: Menggunakan Toxic Screen Transition
  // - Kembali ke Main Portfolio: Menggunakan Baemon Welcome Screen (per permintaan user)
  const navigateTo = useCallback((targetRoute) => {
    if (targetRoute === '/') {
      window.history.pushState({}, '', '/');
      returnToMainPortfolio();
      return;
    }

    // Masuk ke Side Profile: Gunakan Toxic Screen Transition
    setSideProfileEntranceReady(false);
    setTransitionTarget('SIDE PROFILE');
    setTransitionInitialClosed(false);
    setPendingRoute(targetRoute);
    setTransitionActive(true);
  }, [returnToMainPortfolio]);

  const handleTransitionMidpoint = useCallback(() => {
    if (pendingRoute) {
      window.history.pushState({}, '', pendingRoute);

      // Sinkronisasikan perubahan DOM seketika di balik tirai 100% tertutup
      flushSync(() => {
        setCurrentRoute(pendingRoute);
      });

      // Masuk ke Side Profile: siapkan scroll paling atas di balik tirai tertutup
      setSideProfileEntranceReady(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true, force: true });
        window.__lenis.resize();
      }
    } else {
      // Refresh langsung pada /sideprofile (pendingRoute null):
      // Siapkan scroll paling atas dan reset entrance di balik tirai tertutup
      setSideProfileEntranceReady(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true, force: true });
        window.__lenis.resize();
      }
    }
  }, [pendingRoute]);

  const handleOpenStart = useCallback(() => {
    // Dipanggil saat tirai toxic mulai terbuka:
    setSideProfileEntranceReady(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setSideProfileEntranceReady(true);
    setTransitionActive(false);
    setTransitionInitialClosed(false);
    setPendingRoute(null);
  }, []);

  // Listen to browser back/forward buttons (popstate)
  useEffect(() => {
    // Disable native browser automatic scroll restoration so back button doesn't jump down
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/sideprofile' || path.startsWith('/sideprofile')) {
        setSideProfileEntranceReady(true);
        setCurrentRoute('/sideprofile');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        returnToMainPortfolio();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [returnToMainPortfolio]);

  // Active section scroll observer for main portfolio navbar
  useEffect(() => {
    if (currentRoute !== '/') return;

    const sections = ['about', 'experience', 'skills', 'education', 'contact'];
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

          // If above about, clear active section
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

  // Prefetch and pre-mount below-the-fold sections behind WelcomeScreen
  // so document height and ScrollTrigger pin spacers settle before WelcomeScreen exits.
  useEffect(() => {
    if (currentRoute !== '/' || belowFoldReady) return;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      Promise.all([
        loadAbout(),
        loadSevenMemberSlitTransition(),
        loadExperience(),
        loadBatterUpStageTransition(),
        loadSkills(),
        loadMonolithSplitTransition(),
        loadEducation(),
        loadEncoreDiagonalShutterTransition(),
        loadContact(),
        loadFooter(),
      ]).then(() => {
        if (cancelled) return;
        startTransition(() => {
          setBelowFoldReady(true);
        });
      });
    }, 900);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [currentRoute, belowFoldReady]);

  const isSideProfile = currentRoute === '/sideprofile';
  const showBelowFoldSections = belowFoldReady || !showWelcome;

  // Synchronize route class on document.documentElement for route-specific palette styling (Scrollbars, accents)
  useEffect(() => {
    if (isSideProfile) {
      document.documentElement.classList.add('route-sideprofile');
      document.documentElement.classList.remove('route-main');
    } else {
      document.documentElement.classList.add('route-main');
      document.documentElement.classList.remove('route-sideprofile');
    }
  }, [isSideProfile]);

  return (
    <SmoothScrollProvider isLocked={showWelcome || transitionActive}>
      <SkillModalProvider>
        {/* Toxic Screen Transition Curtain */}
          <ToxicScreenTransition
            isActive={transitionActive}
            targetName={transitionTarget}
            initialClosed={transitionInitialClosed}
            onMidpoint={handleTransitionMidpoint}
            onOpenStart={handleOpenStart}
            onComplete={handleTransitionComplete}
          />

          {/* MAIN BABYMONSTER PORTFOLIO: Kept mounted in the DOM to eliminate heavy re-mount lag */}
          <div
            style={{ display: isSideProfile ? 'none' : 'flex' }}
            className="min-h-screen bg-[#FAFAFA] dark:bg-[#0f1117] text-[#09090B] dark:text-white flex-col selection:bg-[#E11D2E]/30 selection:text-white overflow-x-clip w-full max-w-full"
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

            {/* Atmospheric BABYMONSTER Ambient Background Canvas (paused while WelcomeScreen covers viewport) */}
            <BaemonBackground paused={showWelcome || isSideProfile} />

            {/* [SAVED FOR FUTURE USE] Alternative Background Components: */}
            {/* <BaemonGeometricBackground /> */}
            {/* <BaemonRainBackground /> */}
            {/* <WorkBackground /> */}

            {/* GSAP Scroll-Driven Reactive Ambient Lighting Atmosphere */}
            <ReactiveAmbientGlow />

            {/* Main Content Sections with Full-Screen Stage Transitions */}
            <main className="flex-1 w-full relative z-10">
              <Hero
                welcomeActive={showWelcome && !welcomeExiting}
                scrollReady={!showWelcome}
                portalEntranceTrigger={portalEntranceTrigger}
              />
              {showBelowFoldSections && (
                <Suspense fallback={null}>
                  <About />
                  <SevenMemberSlitTransition />
                  <Experience />
                  <BatterUpStageTransition />
                  <Skills />
                  <MonolithSplitTransition />
                  <Education />
                  <EncoreDiagonalShutterTransition />
                  <Contact />
                  <BelowFoldScrollSync />
                </Suspense>
              )}
            </main>

            {/* Semantic Footer with Balanced Left-Right Layout */}
            {showBelowFoldSections && (
              <Suspense fallback={null}>
                <Footer onNavigateToSideProfile={() => navigateTo('/sideprofile')} />
              </Suspense>
            )}
          </div>



          {/* SIDE PROFILE PAGE: Mounted only when active */}
          {isSideProfile && (
            <Suspense fallback={null}>
              <SideProfilePage
                isReady={sideProfileEntranceReady}
                onBackToPortfolio={() => navigateTo('/')}
              />
            </Suspense>
          )}
        </SkillModalProvider>
    </SmoothScrollProvider>
  );
}
