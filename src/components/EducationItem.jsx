import React, { useState } from 'react';
import { GraduationCap, Award, CheckCircle2, BookOpen, MapPin, ExternalLink } from 'lucide-react';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';
import { useInView } from '../hooks/useInView';

export default function EducationItem({ edu, delay = 0 }) {
  const [cardRef, isInView] = useInView({ threshold: 0.08, triggerOnce: false });
  const {
    degree,
    institution,
    location,
    period,
    gpa,
    mbkm,
    achievements,
    relevantCourses,
    logo = '',
    websiteUrl = '',
  } = edu;

  const [imgError, setImgError] = useState(false);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.98)',
        transitionProperty: 'opacity, transform, background-color, border-color, box-shadow',
        transitionDuration: isInView ? '700ms, 700ms, 200ms, 200ms, 200ms' : '300ms, 300ms, 200ms, 200ms, 200ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1), ease, ease, ease',
        transitionDelay: isInView ? `${delay + 80}ms, ${delay + 80}ms, 0ms, 0ms, 0ms` : '0ms',
      }}
      className="rounded-lg bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#2A2A2A] p-5 sm:p-7 hover:border-[#CBD5E1] dark:hover:border-[#3A3A3A] hover:bg-[#FAFAFA] dark:hover:bg-[#181818] shadow-xs will-change-transform"
    >
      {/* Header with Degree, Campus Logo, and Timeline */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 mb-5 border-b border-[#E4E4E7] dark:border-[#2A2A2A]">
        <div className="flex items-start gap-3.5">
          {/* Campus Logo Slot */}
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#2C2C2C] flex items-center justify-center shrink-0 overflow-hidden hover:border-[#E11D2E]/60 transition-all shadow-xs group/logo"
              title={`Visit ${institution}`}
            >
              {logo && !imgError ? (
                <img
                  src={optimizeCloudinaryUrl(logo)}
                  alt={institution}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover/logo:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center text-[#E11D2E] group-hover/logo:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
              )}
            </a>
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#2C2C2C] flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              {logo && !imgError ? (
                <img
                  src={optimizeCloudinaryUrl(logo)}
                  alt={institution}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain p-1.5"
                />
              ) : (
                <div className="flex items-center justify-center text-[#E11D2E]">
                  <GraduationCap className="w-6 h-6" />
                </div>
              )}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="font-display text-xl font-bold text-[#09090B] dark:text-white tracking-tight leading-snug">
              {degree}
            </h3>
            <div className="flex items-center gap-2 text-sm font-medium text-[#52525B] dark:text-[#D4D4D8] mt-1 flex-wrap">
              {websiteUrl ? (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#09090B] dark:text-[#F4F4F5] hover:text-[#E11D2E] dark:hover:text-[#E11D2E] transition-colors group/inst"
                >
                  <span>{institution}</span>
                  <ExternalLink className="w-3 h-3 text-[#71717A] dark:text-[#A1A1AA] group-hover/inst:text-[#E11D2E] transition-colors" />
                </a>
              ) : (
                <span>{institution}</span>
              )}
              {location && (
                <>
                  <span className="text-[#A1A1AA] dark:text-[#52525B]">•</span>
                  <span className="text-xs text-[#71717A] dark:text-[#A1A1AA] flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-[#E11D2E]" />
                    {location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
          <span className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA] bg-[#F4F4F5] dark:bg-[#090909] px-2.5 py-1 rounded border border-[#E4E4E7] dark:border-[#2A2A2A]">
            {period}
          </span>
          {gpa && (
            <span className="font-mono text-xs font-semibold bg-[#F4F4F5] dark:bg-[#090909] px-2.5 py-1 rounded border border-[#E11D2E]/40 text-[#E11D2E]">
              GPA: {gpa}
            </span>
          )}
        </div>
      </div>

      {/* MBKM Participation Highlight */}
      {mbkm && (
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(14px)',
            transition: isInView
              ? 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
              : 'opacity 250ms ease-out, transform 250ms ease-out',
            transitionDelay: isInView ? `${delay + 160}ms` : '0ms',
          }}
          className="mb-5 p-3.5 rounded-md bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] flex items-start gap-3"
        >
          <Award className="w-4 h-4 text-[#E11D2E] mt-0.5 shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-mono text-[#E11D2E] font-medium block sm:inline mr-2">
              [MBKM Program]
            </span>
            <span className="text-[#52525B] dark:text-[#D4D4D8]">{mbkm}</span>
          </div>
        </div>
      )}

      {/* Academic Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="space-y-2 mb-5">
          <h4
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(10px)',
              transition: isInView ? 'opacity 500ms ease-out, transform 500ms ease-out' : 'opacity 250ms ease-out, transform 250ms ease-out',
              transitionDelay: isInView ? `${delay + 170}ms` : '0ms',
            }}
            className="text-xs font-mono uppercase tracking-wider text-[#71717A]"
          >
            Experience &amp; Achievements
          </h4>
          <ul className="space-y-2">
            {achievements.map((item, idx) => (
              <li
                key={idx}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(12px)',
                  transition: isInView
                    ? 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'opacity 250ms ease-out, transform 250ms ease-out',
                  transitionDelay: isInView ? `${delay + 210 + idx * 55}ms` : '0ms',
                }}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D2E] mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Relevant Courses */}
      {relevantCourses && relevantCourses.length > 0 && (
        <div className={mbkm || (achievements && achievements.length > 0) ? "pt-4 border-t border-[#E4E4E7] dark:border-[#2A2A2A]/60" : ""}>
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(10px)',
              transition: isInView ? 'opacity 500ms ease-out, transform 500ms ease-out' : 'opacity 250ms ease-out, transform 250ms ease-out',
              transitionDelay: isInView ? `${delay + 240}ms` : '0ms',
            }}
            className="flex items-center gap-1.5 mb-2.5 text-xs font-mono text-[#71717A]"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E11D2E]" />
            <span>Key Coursework</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {relevantCourses.map((course, idx) => (
              <span
                key={course}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                  transition: isInView
                    ? 'opacity 450ms cubic-bezier(0.16, 1, 0.3, 1), transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'opacity 220ms ease-out, transform 220ms ease-out',
                  transitionDelay: isInView ? `${delay + 280 + idx * 28}ms` : '0ms',
                }}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F4F4F5] dark:bg-[#090909] border border-[#E4E4E7] dark:border-[#2A2A2A] text-[#52525B] dark:text-[#A1A1AA]"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
