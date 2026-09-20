import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import AnimatedSection from '../components/AnimatedSection';
import { portfolioData } from '../data/portfolioData';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

export default function Contact() {
  const { contact } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            title="Direct Contact & Inquiries"
            subtitle="Interested in discussing a software role, collaboration, or technical project? Reach out directly via email or connect through professional networks."
          />
        </AnimatedSection>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Card */}
          <AnimatedSection delay={100}>
            <div className="group relative flex items-center justify-between p-4 rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 transition-all duration-200 shadow-xs h-full min-h-[72px]">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 min-w-0 flex-1"
                title={`Send email to ${contact.email}`}
              >
                <div className="p-2 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#E11D2E] group-hover:border-[#E11D2E]/40 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] block">
                    Email
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-medium text-[#09090B] dark:text-white group-hover:text-[#E11D2E] transition-colors truncate block">
                    {contact.email}
                  </span>
                </div>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email address"
                className="p-1.5 ml-2 rounded-md text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#090909] border border-transparent hover:border-[#E4E4E7] dark:border-[#2A2A2A] transition-all cursor-pointer shrink-0"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-[#E11D2E] animate-in fade-in" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </AnimatedSection>

          {/* GitHub 1 Card */}
          <AnimatedSection delay={150}>
            <a
              href={contact.github || "https://github.com/Juan-Sterling"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-4 rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 transition-all duration-200 shadow-xs h-full min-h-[72px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#E11D2E] group-hover:border-[#E11D2E]/40 shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] block">
                    GitHub 1
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-medium text-[#09090B] dark:text-white group-hover:text-[#E11D2E] transition-colors truncate block">
                    @Juan-Sterling
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>
          </AnimatedSection>

          {/* GitHub 2 Card */}
          <AnimatedSection delay={200}>
            <a
              href={contact.github2 || "https://github.com/juansterling"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-4 rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 transition-all duration-200 shadow-xs h-full min-h-[72px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#E11D2E] group-hover:border-[#E11D2E]/40 shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] block">
                    GitHub 2
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-medium text-[#09090B] dark:text-white group-hover:text-[#E11D2E] transition-colors truncate block">
                    @juansterling
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>
          </AnimatedSection>

          {/* LinkedIn Card */}
          <AnimatedSection delay={250}>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-4 rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 transition-all duration-200 shadow-xs h-full min-h-[72px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#E11D2E] group-hover:border-[#E11D2E]/40 shrink-0">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] block">
                    LinkedIn
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] text-xs sm:text-sm font-bold text-[#09090B] dark:text-white group-hover:text-[#E11D2E] transition-colors truncate block">
                    Juan Sterling Martua
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
