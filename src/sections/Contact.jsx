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

function WhatsappIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.08 7.4 8.84 7.66C8.61 7.92 7.96 8.53 7.96 9.77C7.96 11.01 8.86 12.21 8.99 12.38C9.11 12.55 10.74 15.06 13.23 16.14C15.3 17.03 15.72 16.86 16.17 16.82C16.62 16.78 17.62 16.23 17.83 15.65C18.04 15.07 18.04 14.58 17.98 14.48C17.92 14.37 17.75 14.31 17.5 14.19C17.25 14.07 16.03 13.47 15.8 13.39C15.58 13.3 15.41 13.26 15.25 13.51C15.08 13.76 14.61 14.31 14.46 14.48C14.31 14.64 14.17 14.66 13.92 14.54C13.67 14.41 12.87 14.15 11.93 13.31C11.2 12.66 10.7 11.85 10.55 11.6C10.41 11.35 10.53 11.22 10.66 11.09C10.77 10.98 10.91 10.8 11.03 10.65C11.16 10.5 11.2 10.39 11.28 10.23C11.36 10.06 11.32 9.92 11.26 9.8C11.2 9.67 10.7 8.46 10.5 7.96C10.29 7.47 10.09 7.54 9.93 7.53C9.79 7.53 9.66 7.52 9.53 7.52L9.53 7.34Z" />
    </svg>
  );
}

export default function Contact() {
  const { contact } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyWhatsapp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contact.whatsapp);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            title="Direct Contact & Inquiries"
            subtitle="Interested in discussing a software role, collaboration, or technical project? Reach out directly via email, WhatsApp, or connect through professional networks."
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

          {/* WhatsApp Card */}
          <AnimatedSection delay={150}>
            <div className="group relative flex items-center justify-between p-4 rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] hover:border-[#E11D2E]/60 transition-all duration-200 shadow-xs h-full min-h-[72px]">
              <a
                href={contact.whatsappUrl || `https://wa.me/62${contact.whatsapp.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 min-w-0 flex-1"
                title={`Chat on WhatsApp (${contact.whatsapp})`}
              >
                <div className="p-2 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#E11D2E] group-hover:border-[#E11D2E]/40 shrink-0">
                  <WhatsappIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] block">
                    WhatsApp
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-medium text-[#09090B] dark:text-white group-hover:text-[#E11D2E] transition-colors truncate block">
                    {contact.whatsapp}
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={handleCopyWhatsapp}
                  title="Copy WhatsApp number"
                  className="p-1.5 rounded-md text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#090909] border border-transparent hover:border-[#E4E4E7] dark:border-[#2A2A2A] transition-all cursor-pointer"
                  aria-label="Copy WhatsApp number"
                >
                  {copiedWhatsapp ? (
                    <Check className="w-4 h-4 text-[#E11D2E] animate-in fade-in" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={contact.whatsappUrl || `https://wa.me/62${contact.whatsapp.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md text-[#71717A] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#090909] border border-transparent hover:border-[#E4E4E7] dark:border-[#2A2A2A] transition-all"
                  aria-label="Open WhatsApp chat in new tab"
                >
                  <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#E11D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* GitHub 1 Card */}
          <AnimatedSection delay={200}>
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
          <AnimatedSection delay={250}>
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
          <AnimatedSection delay={300}>
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
