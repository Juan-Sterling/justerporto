import React from 'react';
import SectionTitle from '../components/SectionTitle';
import SkillCard from '../components/SkillCard';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]/60">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            promptCommand="npm list --skills"
            title="Technical Capabilities"
            subtitle="A unified collection of languages, frameworks, databases, and engineering tools used across modern software development."
          />
        </AnimatedSection>

        {/* Unified Responsive Skills Grid with staggered ripple entry */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.name} delay={(index % 6) * 60}>
              <SkillCard skill={skill} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
