import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionTitle from '../components/SectionTitle';
import ExperienceItem from '../components/ExperienceItem';
import ProjectCard from '../components/ProjectCard';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const totalProjects = personalProjects.length;

  // Single-card infinite carousel logic with cloned boundary slides
  const extendedProjects =
    totalProjects > 1
      ? [
          personalProjects[totalProjects - 1],
          ...personalProjects,
          personalProjects[0],
        ]
      : personalProjects;

  const [currentIndex, setCurrentIndex] = useState(totalProjects > 1 ? 1 : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  // Re-enable CSS transition on next animation frame after an instant reset
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
          setIsAnimating(false);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  const displayIndex =
    totalProjects > 1
      ? (currentIndex - 1 + totalProjects) % totalProjects
      : 0;

  const nextProject = useCallback(() => {
    if (isAnimatingRef.current || totalProjects <= 1) return;
    setIsAnimating(true);
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, [totalProjects]);

  const prevProject = useCallback(() => {
    if (isAnimatingRef.current || totalProjects <= 1) return;
    setIsAnimating(true);
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, [totalProjects]);

  const goToProject = (dotIndex) => {
    if (isAnimating || totalProjects <= 1) return;
    setIsAnimating(true);
    setWithTransition(true);
    setCurrentIndex(dotIndex + 1);
  };

  // When transform transition completes, instantly reset to real index if on a cloned boundary
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;

    if (totalProjects <= 1) {
      setIsAnimating(false);
      return;
    }

    if (currentIndex >= totalProjects + 1) {
      // Reached cloned boundary at the end: silently jump to real first slide
      setWithTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      // Reached cloned boundary at the start: silently jump to real last slide
      setWithTransition(false);
      setCurrentIndex(totalProjects);
    } else {
      setIsAnimating(false);
    }
  };

  // Mobile Touch Swipe handlers
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const touchEndXRef = useRef(null);
  const touchEndYRef = useRef(null);

  const handleTouchStart = (e) => {
    if (isAnimatingRef.current || totalProjects <= 1) return;
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchEndXRef.current = touch.clientX;
    touchEndYRef.current = touch.clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartXRef.current === null) return;
    const touch = e.touches[0];
    touchEndXRef.current = touch.clientX;
    touchEndYRef.current = touch.clientY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartXRef.current === null ||
      touchEndXRef.current === null ||
      touchStartYRef.current === null ||
      touchEndYRef.current === null ||
      isAnimatingRef.current
    ) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      touchEndXRef.current = null;
      touchEndYRef.current = null;
      return;
    }

    const diffX = touchStartXRef.current - touchEndXRef.current;
    const diffY = touchStartYRef.current - touchEndYRef.current;
    const minSwipeDistance = 45;

    // Trigger swipe only when horizontal gesture is dominant over vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        nextProject();
      } else {
        prevProject();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchEndXRef.current = null;
    touchEndYRef.current = null;
  };

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
              <div className="flex items-end justify-between gap-4 mb-6">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] dark:text-white font-display">
                    Other Projects &amp;{' '}
                    <span className="text-[#E11D2E]">Collaborations</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] max-w-2xl leading-relaxed">
                    A collection of projects outside my full-time roles, featuring applications, platforms, and initiatives where I have been involved—either directly or indirectly.
                  </p>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-2 font-mono text-xs text-[#71717A] dark:text-[#A1A1AA] bg-white dark:bg-[#141414] px-2.5 py-1 rounded border border-[#E4E4E7] dark:border-[#2A2A2A] shadow-xs shrink-0 self-end sm:self-auto">
                  <span className="text-[#E11D2E] font-semibold">{String(displayIndex + 1).padStart(2, '0')}</span>
                  <span>/</span>
                  <span>{String(totalProjects).padStart(2, '0')}</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Carousel Container with Side Navigation Arrows */}
            <div className="relative group/carousel">
              {/* Left Arrow Button */}
              {totalProjects > 1 && (
                <button
                  type="button"
                  onClick={prevProject}
                  className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#161b22] hover:bg-[#FAFAFA] dark:hover:bg-[#1c212a] active:scale-90 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E] dark:hover:border-[#E11D2E] shadow-sm hover:shadow-md transition-all cursor-pointer"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#E11D2E]" />
                </button>
              )}

              {/* Right Arrow Button */}
              {totalProjects > 1 && (
                <button
                  type="button"
                  onClick={nextProject}
                  className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#161b22] hover:bg-[#FAFAFA] dark:hover:bg-[#1c212a] active:scale-90 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E] dark:hover:border-[#E11D2E] shadow-sm hover:shadow-md transition-all cursor-pointer"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#E11D2E]" />
                </button>
              )}

              {/* Carousel Track Container (Touch Swipeable on Mobile) */}
              <div
                className="relative overflow-hidden w-full rounded-xl py-1"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`flex ${withTransition ? 'transition-transform duration-400 ease-out' : ''}`}
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extendedProjects.map((project, idx) => (
                    <div
                      key={`${project.title}-${idx}`}
                      className="w-full shrink-0 px-1"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Carousel Progress Bar */}
            {totalProjects > 1 && (
              <div className="flex items-center justify-center mt-6">
                <div
                  className="relative w-36 sm:w-48 h-1 sm:h-1.5 rounded-full bg-[#E4E4E7] dark:bg-[#2A2A2A] overflow-hidden cursor-pointer group/progress transition-all"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const targetIdx = Math.min(
                      totalProjects - 1,
                      Math.max(0, Math.floor((clickX / rect.width) * totalProjects))
                    );
                    goToProject(targetIdx);
                  }}
                  role="progressbar"
                  aria-valuenow={displayIndex + 1}
                  aria-valuemin={1}
                  aria-valuemax={totalProjects}
                  aria-label={`Project ${displayIndex + 1} of ${totalProjects}`}
                >
                  <div
                    className="h-full rounded-full bg-[#E11D2E] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(225,29,46,0.5)]"
                    style={{
                      width: `${100 / totalProjects}%`,
                      transform: `translateX(${displayIndex * 100}%)`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
