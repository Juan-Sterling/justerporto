import React from 'react';
import SectionTitle from '../components/SectionTitle';
import EducationItem from '../components/EducationItem';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            promptCommand="cat education.txt"
            title="Academic Background"
            subtitle="Formal foundation in Information Technology, academic coursework, and degree credentials."
          />
        </AnimatedSection>

        {/* Academic Credentials */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <EducationItem edu={edu} />
            </AnimatedSection>
          ))}
        </div>

        {/* College Projects GitHub Callout */}
        <AnimatedSection delay={200}>
          <div className="mt-6 p-5 sm:p-6 rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-2.5 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#E11D2E] shrink-0">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-sm sm:text-base font-bold text-[#09090B] dark:text-white">
                    College Projects on GitHub
                  </h3>
                  <span className="font-mono text-[10px] text-[#E11D2E] bg-[#E11D2E]/10 px-2 py-0.5 rounded border border-[#E11D2E]/30">
                    Academic Repos
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-xl">
                  Explore various academic coursework, practical lab assignments, and repositories developed during my university studies at Universitas Kristen Maranatha on GitHub.
                </p>
              </div>
            </div>

            <a
              href="https://github.com/juansterling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#090909] dark:bg-white text-white dark:text-[#090909] hover:bg-[#E11D2E] dark:hover:bg-[#E11D2E] dark:hover:text-white text-xs sm:text-sm font-mono font-medium transition-all duration-200 shadow-sm shrink-0 group cursor-pointer"
            >
              <span>Explore GitHub Projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
