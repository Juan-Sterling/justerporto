import React from 'react';
import SectionTitle from '../components/SectionTitle';
import EducationItem from '../components/EducationItem';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]/60">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            promptCommand="cat education.txt"
            title="Academic Background"
            subtitle="Formal foundation in Information Technology, academic coursework, and degree credentials."
          />
        </AnimatedSection>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <EducationItem edu={edu} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
