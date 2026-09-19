import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import SkillCard from '../components/SkillCard';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { ChevronDown } from 'lucide-react';

const INITIAL_SKILLS_COUNT = 12;

export default function Skills() {
  const { skills } = portfolioData;
  const [isExpanded, setIsExpanded] = useState(false);

  const initialSkills = skills.slice(0, INITIAL_SKILLS_COUNT);
  const remainingSkills = skills.slice(INITIAL_SKILLS_COUNT);

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            title="Technical Capabilities"
            subtitle="A unified collection of languages, frameworks, databases, and engineering tools used across modern software development."
          />
        </AnimatedSection>

        {/* Initial Skills Grid (12 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {initialSkills.map((skill, index) => {
            const skillName = typeof skill === 'string' ? skill : skill.name;
            return (
              <AnimatedSection key={skillName} delay={(index % 6) * 50}>
                <SkillCard skill={skill} />
              </AnimatedSection>
            );
          })}
        </div>

        {/* Smooth Expandable Section for Remaining Skills */}
        <div
          className="transition-all duration-500 ease-in-out"
          style={{
            display: 'grid',
            gridTemplateRows: isExpanded ? '1fr' : '0fr',
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? '1rem' : 0,
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 pt-1">
              {remainingSkills.map((skill) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                return (
                  <SkillCard key={skillName} skill={skill} />
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Non-Box Show More / Show Less Toggle */}
        {remainingSkills.length > 0 && (
          <div className="relative mt-10 flex flex-col items-center justify-center">
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
      </div>
    </section>
  );
}
