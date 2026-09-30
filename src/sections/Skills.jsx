import React from 'react';
import SectionTitle from '../components/SectionTitle';
import AnimatedSection from '../components/AnimatedSection';
import SkillBentoGrid from '../components/skills/SkillBentoGrid';
import CertificatesSection from '../components/certificates/CertificatesSection';
import { SKILL_CATEGORIES, SKILLS_DATA } from '../data/skillsData';

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

        {/* Section Header */}
        <AnimatedSection>
          <SectionTitle
            title="Technical Capabilities"
            subtitle="A unified collection of languages, frameworks, databases, and engineering tools used across modern software development."
            className="!mb-0"
          />
        </AnimatedSection>

        {/* Bento Grid with Category Filters & Search */}
        <SkillBentoGrid />

        {/* Certifications & Credentials Mockup Section with Integrated Bidirectional Scroll Entrance */}
        <CertificatesSection />

        {/* Hidden Semantic Tree for Screen Readers & SEO Web Crawlers */}
        <div className="sr-only" aria-label="Structured Technical Skills Directory">
          <h2>Juan Sterling - Technical Skills and Architectural Proficiencies</h2>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={`sr-${cat.id}`}>
              <h3>{cat.label}</h3>
              <p>{cat.description}</p>
              <ul>
                {SKILLS_DATA.filter((s) => s.category === cat.id).map((skill) => (
                  <li key={`sr-${skill.id}`}>
                    <strong>{skill.name}</strong>: {skill.role}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
