import React, { useEffect, Suspense, lazy } from 'react';
import SectionTitle from '../components/SectionTitle';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { Home, MapPin, Calendar, Code2, Sparkles, AtSign } from 'lucide-react';

const ThreePassBadge = lazy(() => import('../components/ThreePassBadge'));

const ICON_MAP = {
  Home,
  MapPin,
  Calendar,
  Code2,
  AtSign,
};

export default function About() {
  const { about } = portfolioData;
  const { isDark } = useTheme();
  const passDetails = about?.passDetails;

  useEffect(() => {
    if (!passDetails?.photo || !passDetails?.photoLight) return;
    const preloadImg = new Image();
    preloadImg.src = isDark ? passDetails.photoLight : passDetails.photo;
  }, [isDark, passDetails?.photo, passDetails?.photoLight]);

  if (!about) return null;

  const { narrative, quickFacts, headline, title, subtitle } = about;

  return (
    <section id="about" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title={title || "About Me"}
          subtitle={subtitle || "A backstage look into my background, core focus, and engineering journey."}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start mt-6 sm:mt-10">
          {/* Left Column: Interactive 3D Backstage All-Access ID Pass */}
          <div className="md:col-span-5 flex flex-col items-center">
            <AnimatedSection delay={100} direction="none" gpu={false} className="w-full max-w-[340px] mx-auto">
              <Suspense
                fallback={
                  <div className="w-full max-w-[320px] aspect-[1/1.55] rounded-3xl bg-zinc-100 dark:bg-[#121318] border border-zinc-200 dark:border-zinc-800 animate-pulse flex items-center justify-center shadow-md">
                    <span className="font-mono text-xs text-zinc-400">Loading 3D Stage ID...</span>
                  </div>
                }
              >
                <ThreePassBadge passDetails={passDetails} isDark={isDark} />
              </Suspense>
            </AnimatedSection>
          </div>

          {/* Right Column: Narrative Story & Ticket Stub Spec Cards */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            <AnimatedSection delay={200}>
              {/* Narrative Headline */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white font-display tracking-tight">
                {headline}
              </h3>

              {/* Story Narrative Paragraphs */}
              <div className="mt-4 space-y-3.5 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed border-l-2 border-[#E11D2E]/50 pl-4">
                {narrative.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>

            {/* Quick Facts Bento Grid (Ticket Stubs) */}
            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {quickFacts.map((fact) => {
                  const Icon = ICON_MAP[fact.icon] || Sparkles;
                  return (
                    <div
                      key={fact.label}
                      className="group relative p-3.5 rounded-xl bg-white/70 dark:bg-[#141416]/70 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[#E11D2E]/50 transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-[#E11D2E]/5 overflow-hidden"
                    >
                      {/* Subtle Corner Glow on Hover */}
                      <div className="absolute top-0 right-0 w-14 h-14 bg-[#E11D2E]/5 rounded-bl-full pointer-events-none group-hover:bg-[#E11D2E]/10 transition-colors" />

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-[#E11D2E] border border-zinc-200/80 dark:border-zinc-700/60 shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            {fact.label}
                          </span>
                          <span className="block font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                            {fact.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

