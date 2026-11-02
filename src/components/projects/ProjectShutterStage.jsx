import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '../ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

/**
 * ProjectShutterStage - Concept 3 (Evolved Stage Shutter with Peeking Wings & Multi-Input Scroll)
 * 
 * Features:
 * 1. Center Stage Frame with Hydraulic Split-Shutter blast doors and central razor-sharp laser flare.
 * 2. Left & Right Peeking Wings: Previous and Next project cards are visible in the wings as live previews.
 * 3. Multi-Input Scroll on PC:
 *    - Mouse wheel (vertical & horizontal trackpad) scrolling steps through projects.
 *    - Mouse drag / flick (click & drag horizontally) switches projects.
 *    - Keyboard Arrow navigation (ArrowLeft & ArrowRight).
 *    - Direct click on side peeking cards jumps to that project.
 * 4. 100% GPU accelerated via Motion transforms with back-card culling for 120 FPS performance.
 * 5. Strictly zero "//" syntax in UI, preserves original image placeholder, supports Dark/Light mode.
 */
export default function ProjectShutterStage({ projects = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const totalProjects = projects.length;
  const containerRef = useRef(null);

  // Responsive device check for dynamic wing offsets
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToProject = useCallback((targetIndex) => {
    if (isAnimating || targetIndex === currentIndex || totalProjects <= 1) return;
    setIsAnimating(true);
    setCurrentIndex(targetIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 280);
  }, [currentIndex, isAnimating, totalProjects]);

  const nextProject = useCallback(() => {
    if (totalProjects <= 1) return;
    const nextIdx = (currentIndex + 1) % totalProjects;
    goToProject(nextIdx);
  }, [currentIndex, totalProjects, goToProject]);

  const prevProject = useCallback(() => {
    if (totalProjects <= 1) return;
    const prevIdx = (currentIndex - 1 + totalProjects) % totalProjects;
    goToProject(prevIdx);
  }, [currentIndex, totalProjects, goToProject]);

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevProject();
    } else if (e.key === 'ArrowRight') {
      nextProject();
    }
  };

  // PC Mouse Wheel & Trackpad Navigation
  const lastWheelTimeRef = useRef(0);
  const WHEEL_COOLDOWN = 380; // ms

  useEffect(() => {
    const container = containerRef.current;
    if (!container || totalProjects <= 1) return;

    const handleWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Ignore subtle jitter
      if (absX < 14 && absY < 14) return;

      const now = Date.now();
      if (now - lastWheelTimeRef.current < WHEEL_COOLDOWN) {
        // Prevent default during active cooldown to preserve smooth stepped feel
        e.preventDefault();
        return;
      }

      if (absX > absY) {
        // Horizontal Trackpad Swipe or Shift + Wheel
        if (e.deltaX > 20) {
          e.preventDefault();
          lastWheelTimeRef.current = now;
          nextProject();
        } else if (e.deltaX < -20) {
          e.preventDefault();
          lastWheelTimeRef.current = now;
          prevProject();
        }
      } else {
        // Vertical Mouse Wheel on PC
        if (e.deltaY > 20) {
          e.preventDefault();
          lastWheelTimeRef.current = now;
          nextProject();
        } else if (e.deltaY < -20) {
          e.preventDefault();
          lastWheelTimeRef.current = now;
          prevProject();
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [nextProject, prevProject, totalProjects]);

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
      className="relative w-full outline-hidden select-none cursor-grab active:cursor-grabbing"
      aria-label="Split-Shutter Stage Project Showcase"
      role="region"
    >
      {/* Top Header Bar: Track Counter & Arrows */}
      <div className="max-w-2xl sm:max-w-3xl mx-auto flex items-center justify-between gap-3 mb-4 sm:mb-6 px-1">
        {/* Track Timecode Badge */}
        <div className="inline-flex items-center font-mono text-xs text-zinc-600 dark:text-zinc-300 bg-white dark:bg-[#141416] px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <span className="font-semibold text-zinc-900 dark:text-white tracking-wider">
            TRACK {String(currentIndex + 1).padStart(2, '0')} OF {String(totalProjects).padStart(2, '0')}
          </span>
        </div>

        {/* Direction Arrows */}
        {totalProjects > 1 && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={prevProject}
              disabled={isAnimating}
              className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#161b22] hover:bg-zinc-100 dark:hover:bg-[#1c212a] active:scale-95 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:border-[#E11D2E] dark:hover:border-[#E11D2E] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-300 hover:text-[#E11D2E] transition-colors" />
            </button>

            <button
              type="button"
              onClick={nextProject}
              disabled={isAnimating}
              className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#161b22] hover:bg-zinc-100 dark:hover:bg-[#1c212a] active:scale-95 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:border-[#E11D2E] dark:hover:border-[#E11D2E] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-300 hover:text-[#E11D2E] transition-colors" />
            </button>
          </div>
        )}
      </div>

      {/* Main Widescreen Stage with Peeking Wings & Hydraulic Shutter on Center Card */}
      <motion.div
        className="relative -mx-3 sm:-mx-6 md:-mx-10 overflow-hidden pt-2 pb-3.5 flex items-center justify-center"
        style={{
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
        {/* Natural Height Sizer - keeps container height locked to dynamic card contents */}
        <div
          className="invisible pointer-events-none w-full max-w-2xl mx-auto px-2 opacity-0 select-none"
          aria-hidden="true"
        >
          <ProjectCard project={projects[currentIndex]} />
        </div>

        {/* Stack of Stage Cards: Active Center + Peeking Wing Previews */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {projects.map((project, idx) => {
            const diff = getDiff(idx);
            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isVisible = Math.abs(diff) <= 1 || (!isMobile && Math.abs(diff) <= 2);

            if (!isVisible) return null;

            // Transform calculations
            let xOffset = '0%';
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isCenter) {
              xOffset = '0%';
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (isRight) {
              xOffset = isMobile ? '82%' : '66%';
              scale = isMobile ? 0.82 : 0.88;
              opacity = isMobile ? 0.35 : 0.5;
              zIndex = 20;
            } else if (isLeft) {
              xOffset = isMobile ? '-82%' : '-66%';
              scale = isMobile ? 0.82 : 0.88;
              opacity = isMobile ? 0.35 : 0.5;
              zIndex = 20;
            } else if (diff === 2) {
              xOffset = '94%';
              scale = 0.76;
              opacity = 0.12;
              zIndex = 10;
            } else if (diff === -2) {
              xOffset = '-94%';
              scale = 0.76;
              opacity = 0.12;
              zIndex = 10;
            }

            return (
              <motion.div
                key={project.title}
                className="absolute top-2 w-full max-w-2xl px-2 sm:px-3 will-change-transform"
                style={{
                  pointerEvents: isCenter || Math.abs(diff) === 1 ? 'auto' : 'none',
                }}
                animate={{
                  x: xOffset,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 28,
                  mass: 0.9,
                }}
              >
                <div
                  className={`relative rounded-xl transition-all duration-300 ${
                    isCenter
                      ? 'ring-1 ring-[#E11D2E] dark:ring-[#E11D2E]'
                      : 'cursor-pointer hover:opacity-85'
                  }`}
                  onClick={() => {
                    if (!isCenter) goToProject(idx);
                  }}
                >
                  {/* Frosted interactive lens over side preview cards */}
                  {!isCenter && (
                    <div
                      className="absolute inset-0 z-30 rounded-xl bg-white/40 dark:bg-[#0f1117]/55 hover:bg-white/10 dark:hover:bg-[#0f1117]/25 backdrop-blur-[1px] transition-all cursor-pointer"
                      title={isLeft ? `View previous: ${project.title}` : `View next: ${project.title}`}
                    />
                  )}

                  {/* Project Card Render */}
                  <div className="w-full">
                    <ProjectCard
                      project={project}
                      onOpenDetail={isCenter ? () => setSelectedProjectModal(project) : undefined}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Track Selector Bar */}
      {totalProjects > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-2.5 max-w-xs mx-auto">
          {projects.map((p, dotIdx) => {
            const isActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToProject(dotIdx)}
                disabled={isAnimating}
                className="group flex-1 py-1 cursor-pointer focus:outline-hidden disabled:opacity-50"
                aria-label={`Go to Track ${dotIdx + 1}: ${p.title}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#E11D2E] scale-y-110'
                      : 'bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        key={selectedProjectModal?.title || 'project-modal'}
        project={selectedProjectModal}
        isOpen={Boolean(selectedProjectModal)}
        onClose={() => setSelectedProjectModal(null)}
      />
    </div>
  );
}
