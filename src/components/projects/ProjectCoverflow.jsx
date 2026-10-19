import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '../ProjectCard';

/**
 * ProjectCoverflow
 * 
 * 3D Perspective Coverflow Carousel powered by Motion.
 * - Center card is fully focused (scale 1.0, rotateY 0, full opacity).
 * - Neighbor cards peek on the left and right with 3D perspective rotation (rotateY 22° to 28°).
 * - Clicking a peek card smoothly brings it to the center.
 * - Touch-action: pan-y ensures 100% uninterrupted native vertical scrolling on mobile/tablet.
 * - Fully styled for both Dark and Light mode.
 */
export default function ProjectCoverflow({ projects = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProjects = projects.length;
  const containerRef = useRef(null);

  // Responsive device check for dynamic 3D angle and offset
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextProject = useCallback(() => {
    if (totalProjects <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const prevProject = useCallback(() => {
    if (totalProjects <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  // Keyboard accessibility (Left / Right arrow keys)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevProject();
    } else if (e.key === 'ArrowRight') {
      nextProject();
    }
  };

  // Calculate circular offset distance (-2, -1, 0, 1, 2)
  const getDiff = (idx) => {
    let diff = (idx - currentIndex) % totalProjects;
    if (diff > totalProjects / 2) diff -= totalProjects;
    if (diff < -totalProjects / 2) diff += totalProjects;
    return diff;
  };

  if (!projects || totalProjects === 0) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full outline-hidden select-none"
      aria-label="3D Project Coverflow Carousel"
      role="region"
    >
      {/* Top Header Bar: Counter & Direction Arrows */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
        {/* Monospace Counter */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#71717A] dark:text-[#A1A1AA] bg-white dark:bg-[#141414] px-3 py-1 rounded-md border border-[#E4E4E7] dark:border-[#2A2A2A] shadow-xs">
          <span className="text-[#E11D2E] font-bold">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-[#D4D4D8] dark:text-[#404040]">/</span>
          <span>{String(totalProjects).padStart(2, '0')}</span>
        </div>

        {/* Navigation Arrow Controls */}
        {totalProjects > 1 && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={prevProject}
              className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#161b22] hover:bg-[#F4F4F5] dark:hover:bg-[#1c212a] active:scale-95 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E] dark:hover:border-[#E11D2E] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#E11D2E] transition-colors" />
            </button>

            <button
              type="button"
              onClick={nextProject}
              className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#161b22] hover:bg-[#F4F4F5] dark:hover:bg-[#1c212a] active:scale-95 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E] dark:hover:border-[#E11D2E] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#E11D2E] transition-colors" />
            </button>
          </div>
        )}
      </div>

      {/* 3D Perspective Stage Area */}
      {/* touch-action: pan-y preserves 120Hz native vertical touch scrolling while letting horizontal pan trigger slide */}
      <motion.div
        className="relative w-full overflow-hidden sm:overflow-visible py-2"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          touchAction: 'pan-y',
        }}
        onPanEnd={(e, info) => {
          const swipeThreshold = 35;
          const velocityThreshold = 250;
          if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
            nextProject();
          } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
            prevProject();
          }
        }}
      >
        {/* Natural Height Sizer - ensures container matches card height dynamically across all devices */}
        <div
          className="invisible pointer-events-none w-full max-w-3xl mx-auto px-1 sm:px-2 opacity-0 select-none"
          aria-hidden="true"
        >
          <ProjectCard project={projects[currentIndex]} />
        </div>

        {/* 3D Coverflow Stack of Cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {projects.map((project, idx) => {
            const diff = getDiff(idx);
            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isVisible = Math.abs(diff) <= 1 || (!isMobile && Math.abs(diff) <= 2);

            if (!isVisible) return null;

            // Compute dynamic 3D transforms based on offset
            let xOffset = '0%';
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isCenter) {
              xOffset = '0%';
              rotateY = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (isRight) {
              xOffset = isMobile ? '68%' : '52%';
              rotateY = isMobile ? -16 : -24;
              scale = isMobile ? 0.88 : 0.86;
              opacity = 0.42;
              zIndex = 20;
            } else if (isLeft) {
              xOffset = isMobile ? '-68%' : '-52%';
              rotateY = isMobile ? 16 : 24;
              scale = isMobile ? 0.88 : 0.86;
              opacity = 0.42;
              zIndex = 20;
            } else if (diff === 2) {
              xOffset = '88%';
              rotateY = -34;
              scale = 0.75;
              opacity = 0.15;
              zIndex = 10;
            } else if (diff === -2) {
              xOffset = '-88%';
              rotateY = 34;
              scale = 0.75;
              opacity = 0.15;
              zIndex = 10;
            }

            return (
              <motion.div
                key={project.title}
                className="absolute top-0 w-full max-w-3xl px-1 sm:px-2 will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                  pointerEvents: isCenter || Math.abs(diff) === 1 ? 'auto' : 'none',
                }}
                animate={{
                  x: xOffset,
                  rotateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                  mass: 0.85,
                }}
                onClick={() => {
                  if (!isCenter) setCurrentIndex(idx);
                }}
              >
                <div
                  className={`relative rounded-xl transition-all duration-300 ${
                    isCenter
                      ? 'ring-1 ring-[#E11D2E]/40 dark:ring-[#E11D2E]/50 shadow-[0_10px_35px_-8px_rgba(225,29,46,0.18)] dark:shadow-[0_12px_45px_-5px_rgba(225,29,46,0.28)]'
                      : 'cursor-pointer hover:opacity-80'
                  }`}
                >
                  {/* Frosted translucent shield over peek cards in Dark & Light mode to highlight center focus */}
                  {!isCenter && (
                    <div
                      className="absolute inset-0 z-30 rounded-xl bg-white/40 dark:bg-[#0f1117]/50 hover:bg-white/10 dark:hover:bg-[#0f1117]/20 transition-colors pointer-events-auto"
                      title={`Click to view ${project.title}`}
                    />
                  )}

                  <ProjectCard project={project} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Pagination Dots with Liquid Pill Indicator */}
      {totalProjects > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          {projects.map((_, dotIdx) => {
            const isActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                className="relative py-1.5 px-0.5 cursor-pointer focus:outline-hidden group"
                aria-label={`Go to project ${dotIdx + 1}`}
              >
                <div className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300">
                  {isActive ? (
                    <motion.div
                      layoutId="coverflowActiveDot"
                      className="w-7 h-1.5 rounded-full bg-[#E11D2E] shadow-[0_0_8px_rgba(225,29,46,0.8)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  ) : (
                    <div className="w-2 h-1.5 rounded-full bg-[#D4D4D8] dark:bg-[#2A2A2A] group-hover:bg-[#A1A1AA] dark:group-hover:bg-[#404040] transition-colors" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
