import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import ExperienceItem from '../components/ExperienceItem';
import ProjectShutterStage from '../components/projects/ProjectShutterStage';
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

    // Real-time synchronization: Checks if the laser tip has physically touched/passed each node
    const checkNodes = () => {
      if (!laser || !container) return;
      const laserRect = laser.getBoundingClientRect();
      const laserTipY = laserRect.bottom;
      const nodeEls = container.querySelectorAll('.timeline-portal-node');

      // If laser hasn't started or is at top, ensure all nodes are dormant
      if (laserRect.height <= 2 || laserTipY <= laserRect.top + 2) {
        nodeEls.forEach((nodeEl) => nodeEl.classList.remove('node-active'));
        return;
      }

      nodeEls.forEach((nodeEl) => {
        const nodeRect = nodeEl.getBoundingClientRect();
        // Trigger precisely when the laser tip reaches the top edge of the node
        const isReached = laserTipY >= (nodeRect.top + 4);
        if (isReached !== nodeEl.classList.contains('node-active')) {
          nodeEl.classList.toggle('node-active', isReached);
        }
      });
    };

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
            scrub: 0.35,
            invalidateOnRefresh: true,
            onUpdate: checkNodes,
            onRefresh: checkNodes,
            onLeaveBack: () => {
              const nodeEls = container.querySelectorAll('.timeline-portal-node');
              nodeEls.forEach((nodeEl) => nodeEl.classList.remove('node-active'));
            },
          },
        }
      );
    }, container);

    const initTimer = setTimeout(checkNodes, 80);

    // Refresh ScrollTrigger to account for expandable container height changes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      checkNodes();
    }, 720);

    return () => {
      clearTimeout(initTimer);
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
        <style>{`
          .timeline-portal-node {
            transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .timeline-portal-node.node-active {
            background-color: #FFFFFF !important;
            border-color: #E11D2E !important;
            box-shadow: 0 0 14px rgba(225, 29, 46, 0.45) !important;
          }
          .dark .timeline-portal-node.node-active {
            background-color: #0E0E12 !important;
            border-color: #E11D2E !important;
            box-shadow: 0 0 14px rgba(225, 29, 46, 0.45) !important;
          }
          .timeline-portal-node.node-active .baemon-o-half {
            fill: #E11D2E !important;
            filter: drop-shadow(0 0 4px rgba(225, 29, 46, 0.7));
          }
          .timeline-portal-node.node-active .timeline-bridge-line {
            transform: scaleX(1) !important;
            opacity: 1 !important;
          }
          .timeline-portal-node:hover .baemon-o-left {
            transform: translateX(-1.5px);
          }
          .timeline-portal-node:hover .baemon-o-right {
            transform: translateX(1.5px);
          }
        `}</style>
        <div ref={timelineContainerRef} className="mt-8 relative">
          {/* 1. Stage Rigging / Dual-Rail Truss Track (Ultra-lightweight vector truss structure) */}
          <div 
            className="absolute left-[4px] sm:left-[6px] top-4 bottom-10 w-4 sm:w-5 pointer-events-none select-none z-0 overflow-hidden" 
            aria-hidden="true" 
          >
            {/* Left Rail */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-300/80 dark:bg-zinc-800/90" />
            
            {/* Right Rail */}
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-zinc-300/80 dark:bg-zinc-800/90" />
            
            {/* Center Guide Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-200/60 dark:bg-zinc-800/40" />

            {/* Diagonal Truss Cross-Braces Pattern */}
            <svg className="w-full h-full opacity-45 dark:opacity-30" aria-hidden="true">
              <defs>
                <pattern id="stage-truss-pattern" width="20" height="26" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="20" y2="13" stroke="currentColor" strokeWidth="0.8" className="text-zinc-400 dark:text-zinc-600" />
                  <line x1="20" y1="13" x2="0" y2="26" stroke="currentColor" strokeWidth="0.8" className="text-zinc-400 dark:text-zinc-600" />
                  <circle cx="0.5" cy="0.5" r="1" className="fill-zinc-400 dark:fill-zinc-500" />
                  <circle cx="19.5" cy="13" r="1" className="fill-zinc-400 dark:fill-zinc-500" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#stage-truss-pattern)" />
            </svg>
          </div>

          {/* 2. GSAP ScrollTrigger Stage Laser Beam (Laser Core + Traveling Head Spark) */}
          <div 
            ref={timelineLaserRef}
            className="absolute left-[11px] sm:left-[15px] top-4 bottom-10 w-[2px] origin-top pointer-events-none z-0 will-change-transform" 
            aria-hidden="true" 
          >
            {/* Ambient Ruby Laser Bloom */}
            <div className="absolute -inset-x-1 inset-y-0 bg-[#E11D2E]/25 blur-[3px]" />

            {/* Razor-sharp Central Laser Core */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#E11D2E] via-[#FF3B4D] to-[#E11D2E] shadow-[0_0_8px_rgba(225,29,46,0.9)]" />

            {/* Traveling Laser Spark Head (Mounted at the moving tip of the beam) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
              {/* Soft radial aura */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#E11D2E]/30 blur-xs" />
              {/* Sharp diamond spark */}
              <div className="absolute w-2 h-2 rotate-45 bg-white dark:bg-[#FFE5E8] shadow-[0_0_10px_#FF2A3D]" />
            </div>
          </div>

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

            {/* Split-Shutter Stage Project Showcase */}
            <ProjectShutterStage projects={personalProjects} />
          </div>
        )}
      </div>
    </section>
  );
}
