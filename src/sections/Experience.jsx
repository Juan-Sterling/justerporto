import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ExperienceItem from '../components/ExperienceItem';
import ProjectCard from '../components/ProjectCard';
import TerminalPrompt from '../components/TerminalPrompt';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience, personalProjects = [] } = portfolioData;

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]/60">
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
          {experience.map((item, index) => (
            <AnimatedSection key={index} delay={index * 120}>
              <ExperienceItem
                experience={item}
                isLast={index === experience.length - 1}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Sub-section: Personal Projects */}
        {personalProjects && personalProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#2A2A2A]/80">
            <AnimatedSection>
              <div className="space-y-3 mb-8">
                <div>
                  <TerminalPrompt command="ls -la ./personal-projects" />
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white font-['Space_Grotesk',sans-serif]">
                    Personal Projects
                  </h3>
                  <span className="h-2 w-2 rounded-full bg-[#E11D2E] inline-block" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-2xl leading-relaxed">
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
