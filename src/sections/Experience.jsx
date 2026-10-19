import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import ExperienceItem from '../components/ExperienceItem';
import ProjectCoverflow from '../components/projects/ProjectCoverflow';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const INITIAL_EXPERIENCE_COUNT = 2;

export default function Experience() {
  const { experience, personalProjects = [] } = portfolioData;
  const [isExpanded, setIsExpanded] = useState(false);

  const timelineContainerRef = useRef(null);
  const timelineLaserRef = useRef(null);

  // GSAP ScrollTrigger Laser Beam that progresses through the work history
  useEffect(() => {
    const container = timelineContainerRef.current;
    const laser = timelineLaserRef.current;
    if (!container || !laser) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        laser,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, container);

    // Refresh ScrollTrigger to account for expandable container height changes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 720);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [isExpanded]);

  const initialExperience = experience.slice(0, INITIAL_EXPERIENCE_COUNT);
  const remainingExperience = experience.slice(INITIAL_EXPERIENCE_COUNT);

  return (
    <section
      id="experience"
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionTitle
          title="Work History & Experience"
          subtitle="Chronological breakdown of engineering roles, software projects, and core contributions."
        />

        {/* Work Experience Timeline */}
        <div ref={timelineContainerRef} className="mt-8 relative">
          {/* Timeline Background Track */}
          <div 
            className="absolute left-[11px] sm:left-[15px] top-4 bottom-10 w-[1.5px] bg-[#E4E4E7] dark:bg-[#232326] rounded-full pointer-events-none" 
            aria-hidden="true" 
          />
          {/* GSAP ScrollTrigger Laser Beam */}
          <div 
            ref={timelineLaserRef}
            className="absolute left-[11px] sm:left-[15px] top-4 bottom-10 w-[1.5px] bg-gradient-to-b from-[#E11D2E] via-[#FF3B4D] to-[#E11D2E] origin-top shadow-[0_0_8px_rgba(225,29,46,0.9)] rounded-full pointer-events-none z-0 will-change-transform" 
            aria-hidden="true" 
          />

          {initialExperience.map((item, index) => (
            <ExperienceItem
              key={item.organization + item.period}
              experience={item}
              isLast={false}
              delay={index * 130}
            />
          ))}

          {/* Smooth Expandable Section for Remaining Experience with Peek & Fade */}
          <div className="relative">
            <div
              className="relative transition-all duration-700 ease-in-out overflow-hidden"
              style={{
                maxHeight: isExpanded ? '2000px' : '115px',
                maskImage: isExpanded
                  ? 'none'
                  : 'linear-gradient(to bottom, black 0%, black 30%, rgba(0, 0, 0, 0.4) 65%, transparent 100%)',
                WebkitMaskImage: isExpanded
                  ? 'none'
                  : 'linear-gradient(to bottom, black 0%, black 30%, rgba(0, 0, 0, 0.4) 65%, transparent 100%)',
              }}
            >
              <div>
                {remainingExperience.map((item, index) => (
                  <ExperienceItem
                    key={item.organization + item.period}
                    experience={item}
                    isLast={index === remainingExperience.length - 1}
                    delay={isExpanded ? index * 100 : 0}
                  />
                ))}
              </div>
            </div>

            {/* Subtle Smooth Gradient Veil over the bottom of the peeking card */}
            <div
              className={`pointer-events-none absolute -bottom-1 inset-x-0 h-28 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0f1117] via-[#FAFAFA]/70 dark:via-[#0f1117]/70 to-transparent transition-opacity duration-500 z-10 ${
                isExpanded ? 'opacity-0' : 'opacity-100'
              }`}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Dynamic Non-Box Show More / Show Less Toggle */}
        {remainingExperience.length > 0 && (
          <div className="relative mt-2 mb-6 flex flex-col items-center justify-center">
            {/* Subtle divider line with centered interactive trigger */}
            <div className="w-full flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E4E4E7] dark:via-[#2A2A2A] to-transparent" />
              </div>

              {/* Interactive Pill Button */}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-[#141414] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1C] border border-[#E4E4E7] dark:border-[#333333] hover:border-[#E11D2E] dark:hover:border-[#E11D2E] text-[#09090B] dark:text-[#F4F4F5] text-xs font-mono shadow-sm hover:shadow-md hover:shadow-[#E11D2E]/10 active:scale-95 transition-all duration-200 cursor-pointer group select-none"
                aria-expanded={isExpanded}
              >
                <span className="tracking-wider uppercase text-xs font-semibold group-hover:text-[#E11D2E] transition-colors">
                  {isExpanded ? 'Show Less' : 'Show More'}
                </span>

                <ChevronDown
                  className={`w-4 h-4 text-[#E11D2E] transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Sub-section: Other Projects & Collaborations */}
        {personalProjects && personalProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/80">
            <AnimatedSection>
              <div className="space-y-3 mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] dark:text-white font-display">
                  Other Projects &amp;{' '}
                  <span className="text-[#E11D2E]">Collaborations</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] max-w-2xl leading-relaxed">
                  A collection of projects outside my full-time roles, featuring applications, platforms, and initiatives where I have been involved—either directly or indirectly.
                </p>
              </div>
            </AnimatedSection>

            {/* 3D Perspective Coverflow Carousel */}
            <ProjectCoverflow projects={personalProjects} />
          </div>
        )}
      </div>
    </section>
  );
}
