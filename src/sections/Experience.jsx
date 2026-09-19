import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import ExperienceItem from '../components/ExperienceItem';
import ProjectCard from '../components/ProjectCard';
import TerminalPrompt from '../components/TerminalPrompt';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { ChevronDown } from 'lucide-react';

const INITIAL_EXPERIENCE_COUNT = 2;

export default function Experience() {
  const { experience, personalProjects = [] } = portfolioData;
  const [isExpanded, setIsExpanded] = useState(false);

  const initialExperience = experience.slice(0, INITIAL_EXPERIENCE_COUNT);
  const remainingExperience = experience.slice(INITIAL_EXPERIENCE_COUNT);

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            promptCommand="git log --experience"
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

        {/* Sub-section: Personal Projects */}
        {personalProjects && personalProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/80">
            <AnimatedSection>
              <div className="space-y-3 mb-8">
                <div>
                  <TerminalPrompt command="ls -la ./personal-projects" />
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#09090B] dark:text-white font-['Space_Grotesk',sans-serif]">
                    Personal Projects
                  </h3>
                  <span className="h-2 w-2 rounded-full bg-[#E11D2E] inline-block" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] max-w-2xl leading-relaxed">
                  Independent applications and web platforms built to solve real-world problems, explore architectures, and deploy live solutions.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {personalProjects.map((project, idx) => (
                <AnimatedSection key={project.title} delay={idx * 120}>
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
