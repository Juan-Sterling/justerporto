import React from 'react';
import SectionTitle from '../components/SectionTitle';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';
import { Home, MapPin, Calendar, Code2, Sparkles } from 'lucide-react';

const ICON_MAP = {
  Home,
  MapPin,
  Calendar,
  Code2,
};

export default function About() {
  const { about } = portfolioData;

  if (!about) return null;

  const { passDetails, narrative, quickFacts, headline, title, subtitle } = about;

  return (
    <section id="about" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title={title || "About Me"}
          subtitle={subtitle || "A backstage look into my background, core focus, and engineering journey."}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start mt-6 sm:mt-10">
          {/* Left Column: The Backstage All-Access ID Pass */}
          <div className="md:col-span-5 flex flex-col items-center">
            <AnimatedSection delay={100} className="w-full max-w-[320px] mx-auto">
              {/* Lanyard Strap Slot */}
              <div className="w-16 h-3 mx-auto mb-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center shadow-xs">
                <div className="w-8 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              </div>

              {/* Pass Card Container */}
              <div className="group/pass relative rounded-2xl bg-white/95 dark:bg-[#121318]/95 border border-zinc-200/90 dark:border-zinc-800/90 p-4 sm:p-5 shadow-xl backdrop-blur-xs overflow-hidden transition-all duration-300 hover:border-[#E11D2E]/50 hover:shadow-[0_0_30px_rgba(225,29,46,0.18)]">
                {/* Subtle Ambient Red Glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#E11D2E]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Pass Photo Card */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <img
                    src={optimizeCloudinaryUrl(passDetails.photo, { width: 600 })}
                    alt={passDetails.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/pass:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* Corner Tactical Brackets in Crimson */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#E11D2E] pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#E11D2E] pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#E11D2E] pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#E11D2E] pointer-events-none" />

                  {/* Watermark Tag */}
                  <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-mono text-white/90 border border-white/10 uppercase tracking-wider">
                    ACCESS HOLDER
                  </div>
                </div>

                {/* Identity Info */}
                <div className="mt-3.5 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 dark:text-white tracking-tight">
                        {passDetails.name}
                      </h3>
                      {/* BABYMONSTER Devil Horns Mini Motif */}
                      <svg className="w-3.5 h-3.5 text-[#E11D2E]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C9 7 4 14 3 22C7 19 11 15 12 2Z" />
                      </svg>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      STAGE ID
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#E11D2E] font-medium tracking-tight">
                    {passDetails.role}
                  </p>
                </div>

                {/* Bottom Barcode Decorative Strip */}
                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <svg className="h-5 w-28 opacity-75 dark:opacity-60 text-zinc-800 dark:text-zinc-300" viewBox="0 0 120 24" fill="currentColor" aria-hidden="true">
                    <rect x="0" y="0" width="2" height="24" />
                    <rect x="4" y="0" width="1" height="24" />
                    <rect x="7" y="0" width="3" height="24" />
                    <rect x="12" y="0" width="1" height="24" />
                    <rect x="15" y="0" width="2" height="24" />
                    <rect x="19" y="0" width="4" height="24" />
                    <rect x="25" y="0" width="1" height="24" />
                    <rect x="28" y="0" width="2" height="24" />
                    <rect x="32" y="0" width="3" height="24" />
                    <rect x="37" y="0" width="1" height="24" />
                    <rect x="40" y="0" width="2" height="24" />
                    <rect x="44" y="0" width="4" height="24" />
                    <rect x="50" y="0" width="2" height="24" />
                    <rect x="54" y="0" width="1" height="24" />
                    <rect x="57" y="0" width="3" height="24" />
                    <rect x="62" y="0" width="1" height="24" />
                    <rect x="65" y="0" width="2" height="24" />
                    <rect x="69" y="0" width="4" height="24" />
                    <rect x="75" y="0" width="1" height="24" />
                    <rect x="78" y="0" width="3" height="24" />
                    <rect x="83" y="0" width="2" height="24" />
                    <rect x="87" y="0" width="1" height="24" />
                    <rect x="90" y="0" width="4" height="24" />
                    <rect x="96" y="0" width="2" height="24" />
                    <rect x="100" y="0" width="1" height="24" />
                    <rect x="103" y="0" width="3" height="24" />
                    <rect x="108" y="0" width="2" height="24" />
                    <rect x="112" y="0" width="1" height="24" />
                    <rect x="115" y="0" width="3" height="24" />
                  </svg>
                  <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 tracking-wider">
                    ALL · ACCESS
                  </span>
                </div>
              </div>
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

