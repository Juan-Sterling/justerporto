import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import ExperienceItem from '../components/ExperienceItem';
import ProjectCard from '../components/ProjectCard';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_EXPERIENCE_COUNT = 2;

export default function Experience() {
  const { experience, personalProjects = [] } = portfolioData;
  const [isExpanded, setIsExpanded] = useState(false);

  const totalProjects = personalProjects.length;

  // Infinite carousel logic with cloned boundary slides for seamless looping
  const extendedProjects = totalProjects > 1
    ? [
        personalProjects[totalProjects - 1],
        ...personalProjects,
        personalProjects[0],
      ]
    : personalProjects;

  const [currentIndex, setCurrentIndex] = useState(totalProjects > 1 ? 1 : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Re-enable CSS transition on next animation frame after an instant reset
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  const displayIndex = totalProjects > 1
    ? (currentIndex - 1 + totalProjects) % totalProjects
    : 0;

  const nextProject = () => {
    if (isAnimating || totalProjects <= 1) return;
    setIsAnimating(true);
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevProject = () => {
    if (isAnimating || totalProjects <= 1) return;
    setIsAnimating(true);
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToProject = (dotIndex) => {
    if (isAnimating || totalProjects <= 1) return;
    setIsAnimating(true);
    setWithTransition(true);
    setCurrentIndex(dotIndex + 1);
  };

  // When transition completes, instantly reset to real index if on a cloned boundary
  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (totalProjects <= 1) return;

    if (currentIndex === totalProjects + 1) {
      // Reached cloned first slide at the end: silently jump to real first slide
      setWithTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // Reached cloned last slide at the start: silently jump to real last slide
      setWithTransition(false);
      setCurrentIndex(totalProjects);
    }
  };

  const handleTouchStart = (e) => {
    if (isAnimating) return;
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX || isAnimating) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextProject();
    } else if (distance < -minSwipeDistance) {
      prevProject();
    }
  };

  const initialExperience = experience.slice(0, INITIAL_EXPERIENCE_COUNT);
  const remainingExperience = experience.slice(INITIAL_EXPERIENCE_COUNT);

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            title="Work History & Experience"
            subtitle="Chronological breakdown of engineering roles, software projects, and core contributions."
          />
        </AnimatedSection>

        {/* Work Experience Timeline */}
        <div className="mt-8">
          {initialExperience.map((item, index) => (
            <AnimatedSection key={item.organization + item.period} delay={index * 120}>
              <ExperienceItem
                experience={item}
                isLast={
                  !isExpanded && remainingExperience.length > 0
                    ? index === initialExperience.length - 1
                    : remainingExperience.length === 0 && index === initialExperience.length - 1
                }
              />
            </AnimatedSection>
          ))}

          {/* Smooth Expandable Section for Remaining Experience */}
          <div
            className="transition-all duration-500 ease-in-out"
            style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
              opacity: isExpanded ? 1 : 0,
            }}
          >
            <div className="overflow-hidden min-h-0">
              {remainingExperience.map((item, index) => (
                <ExperienceItem
                  key={item.organization + item.period}
                  experience={item}
                  isLast={index === remainingExperience.length - 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Non-Box Show More / Show Less Toggle */}
        {remainingExperience.length > 0 && (
          <div className="relative mt-2 mb-6 flex flex-col items-center justify-center">
            {/* Subtle gradient veil when collapsed */}
            <div
              className={`absolute -top-16 inset-x-0 h-16 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 dark:from-[#000000] dark:via-[#000000]/80 to-transparent pointer-events-none transition-opacity duration-500 ${
                isExpanded ? 'opacity-0' : 'opacity-100'
              }`}
              aria-hidden="true"
            />

            {/* Subtle divider line with centered interactive trigger */}
            <div className="w-full flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E4E4E7] dark:via-[#2A2A2A] to-transparent" />
              </div>

              {/* Interactive Pill Button */}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="relative z-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white dark:bg-[#141414] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1C] border border-[#E4E4E7] dark:border-[#333333] hover:border-[#E11D2E] dark:hover:border-[#E11D2E] text-[#09090B] dark:text-[#F4F4F5] text-xs font-mono shadow-xs hover:shadow-md hover:shadow-[#E11D2E]/10 active:scale-95 transition-all duration-200 cursor-pointer group select-none"
                aria-expanded={isExpanded}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isExpanded ? 'bg-transparent' : 'bg-[#E11D2E]'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isExpanded ? 'bg-[#71717A]' : 'bg-[#E11D2E]'
                    }`}
                  />
                </span>

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

        {/* Sub-section: Other Projects & Collaborations (Seamless Infinite Carousel) */}
        {personalProjects && personalProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/80">
            <AnimatedSection>
              <div className="flex items-end justify-between gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] dark:text-white font-['Space_Grotesk',sans-serif]">
                      Other Projects &amp; Collaborations
                    </h3>
                    <span className="h-2 w-2 rounded-full bg-[#E11D2E] inline-block" aria-hidden="true" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] max-w-2xl leading-relaxed">
                    A collection of projects outside my full-time roles, featuring applications, platforms, and initiatives where I have been involved—either directly or indirectly.
                  </p>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto font-mono text-xs text-[#71717A] dark:text-[#A1A1AA] bg-white dark:bg-[#141414] px-2.5 py-1 rounded border border-[#E4E4E7] dark:border-[#2A2A2A] shadow-xs">
                  <span className="text-[#E11D2E] font-semibold">0{displayIndex + 1}</span>
                  <span>/</span>
                  <span>0{totalProjects}</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Carousel Container with Side Navigation Arrows */}
            <div className="relative group/carousel">
              {/* Left Arrow Button (Beside Card) */}
              <button
                type="button"
                onClick={prevProject}
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#141414] hover:bg-[#F4F4F5] dark:hover:bg-[#1c1c1c] active:scale-90 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E] shadow-md dark:shadow-black/60 transition-all cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#E11D2E]" />
              </button>

              {/* Right Arrow Button (Beside Card) */}
              <button
                type="button"
                onClick={nextProject}
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#141414] hover:bg-[#F4F4F5] dark:hover:bg-[#1c1c1c] active:scale-90 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E] shadow-md dark:shadow-black/60 transition-all cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#E11D2E]" />
              </button>

              {/* Carousel Track Container (No native scrollbar, Touch Swipeable) */}
              <div
                className="relative overflow-hidden w-full rounded-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`flex ${withTransition ? 'transition-transform duration-500 ease-out' : ''}`}
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extendedProjects.map((project, idx) => (
                    <div
                      key={`${project.title}-${idx}`}
                      className="w-full shrink-0 px-0.5"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Carousel Progress Bar (Minimalist & Dynamic) */}
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
          </div>
        )}
      </div>
    </section>
  );
}


