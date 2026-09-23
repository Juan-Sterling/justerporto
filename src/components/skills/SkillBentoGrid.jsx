import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import SkillBentoCard from './SkillBentoCard';
import {
  SKILL_CATEGORIES,
  SKILLS_DATA,
} from '../../data/skillsData';
import { getTechIconUrl } from '../../utils/techIcons';
import AnimatedSection from '../AnimatedSection';
import {
  Code2,
  Server,
  Database,
  Wrench,
  Search,
  X,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';

const CATEGORY_ICONS = {
  frontend: Code2,
  backend: Server,
  database: Database,
  tools: Wrench,
};

function ShowMoreToggle({ isExpanded, onToggle, labelMore = 'Show More', labelLess = 'Show Less' }) {
  return (
    <div className="relative mt-8 sm:mt-10 flex flex-col items-center justify-center">
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
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E4E4E7] dark:via-[#262626] to-transparent" />
        </div>

        {/* Interactive Pill Button */}
        <button
          type="button"
          onClick={onToggle}
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
            {isExpanded ? labelLess : labelMore}
          </span>

          <ChevronDown
            className={`w-4 h-4 text-[#E11D2E] transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default function SkillBentoGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'frontend' | 'backend' | 'database' | 'tools'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkill, setActiveSkill] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter skills based on category and search query
  const filteredSkills = useMemo(() => {
    let list = SKILLS_DATA;
    if (selectedCategory !== 'all') {
      list = list.filter((s) => s.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);


  const activeCategoryInfo = useMemo(() => {
    if (!activeSkill) return null;
    return SKILL_CATEGORIES.find((c) => c.id === activeSkill.category);
  }, [activeSkill]);

  // Handle ESC key and lock body scroll while modal is active
  useEffect(() => {
    if (!activeSkill) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveSkill(null);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSkill]);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setIsExpanded(false);
  };

  // Bento mode: 2 initial categories (Frontend, Backend) & 2 remaining categories (Database, Tools)
  const initialBentoCategories = SKILL_CATEGORIES.slice(0, 2);
  const remainingBentoCategories = SKILL_CATEGORIES.slice(2);

  // Filtered mode: 8 initial skills & remaining
  const INITIAL_FILTERED_COUNT = 8;
  const initialFilteredSkills = filteredSkills.slice(0, INITIAL_FILTERED_COUNT);
  const remainingFilteredSkills = filteredSkills.slice(INITIAL_FILTERED_COUNT);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ================================================================= */}
      {/* 1. Filter Bar: Category Tabs + Search                             */}
      {/* ================================================================= */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F4F4F5] dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#262626] overflow-x-auto no-scrollbar scroll-smooth">
          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-[#202020] text-[#09090B] dark:text-white shadow-xs font-semibold'
                : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            All <span className="opacity-60 text-[10px] ml-0.5">({SKILLS_DATA.length})</span>
          </button>

          {SKILL_CATEGORIES.map((cat) => {
            const count = SKILLS_DATA.filter((s) => s.category === cat.id).length;
            const Icon = CATEGORY_ICONS[cat.id] || Filter;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#202020] text-[#09090B] dark:text-white shadow-xs font-semibold'
                    : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-[#E11D2E]' : ''}`} />
                <span>{cat.label}</span>
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Bar */}
        <div className="relative min-w-[220px] sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter technologies..."
            className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#262626] text-xs text-[#09090B] dark:text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#E11D2E] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[#71717A] hover:text-[#09090B] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. Main Content View                                              */}
      {/* ================================================================= */}

      {/* CASE A: Category = 'all' and no active search => Render Bento Clusters with Show More */}
      {selectedCategory === 'all' && !searchQuery.trim() ? (
        <div>
          {/* Initial Bento Clusters (Frontend & Backend) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
            {initialBentoCategories.map((cat, catIdx) => {
              const catSkills = SKILLS_DATA.filter((s) => s.category === cat.id);
              const Icon = CATEGORY_ICONS[cat.id] || Filter;

              return (
                <AnimatedSection key={cat.id} delay={catIdx * 60}>
                  <div className="flex flex-col justify-start p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#0E0E0E]/90 border border-[#E4E4E7] dark:border-[#242424] shadow-xs hover:border-[#E11D2E]/40 transition-all duration-300">
                    {/* Bento Header */}
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 border border-[#E11D2E]/30 flex items-center justify-center text-[#E11D2E] shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-['Space_Grotesk',sans-serif] text-base font-bold text-[#09090B] dark:text-white leading-tight">
                              {cat.label}
                            </h3>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#F4F4F5] dark:bg-[#1E1E1E] text-[#71717A] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#2C2C2C]">
                              {catSkills.length}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                            {cat.tagline}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectCategory(cat.id)}
                        className="text-[11px] font-mono text-[#E11D2E] hover:underline cursor-pointer flex items-center gap-0.5 shrink-0"
                      >
                        <span>Focus</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Skills Mini-Grid inside Bento Cluster */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2.5">
                      {catSkills.map((skill) => (
                        <SkillBentoCard
                          key={skill.id}
                          skill={skill}
                          isSelected={activeSkill?.id === skill.id}
                          onClick={() => setActiveSkill(skill)}
                        />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Smooth Collapsible Section for Remaining Bento Clusters (Database & Tools) */}
          <div
            className="transition-all duration-500 ease-in-out"
            style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
              opacity: isExpanded ? 1 : 0,
              marginTop: isExpanded ? '0.875rem' : 0,
            }}
          >
            <div className="overflow-hidden min-h-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                {remainingBentoCategories.map((cat, catIdx) => {
                  const catSkills = SKILLS_DATA.filter((s) => s.category === cat.id);
                  const Icon = CATEGORY_ICONS[cat.id] || Filter;

                  return (
                    <AnimatedSection key={cat.id} delay={catIdx * 60}>
                      <div className="flex flex-col justify-start p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#0E0E0E]/90 border border-[#E4E4E7] dark:border-[#242424] shadow-xs hover:border-[#E11D2E]/40 transition-all duration-300">
                        {/* Bento Header */}
                        <div className="flex items-start justify-between gap-3 mb-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 border border-[#E11D2E]/30 flex items-center justify-center text-[#E11D2E] shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-['Space_Grotesk',sans-serif] text-base font-bold text-[#09090B] dark:text-white leading-tight">
                                  {cat.label}
                                </h3>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#F4F4F5] dark:bg-[#1E1E1E] text-[#71717A] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#2C2C2C]">
                                  {catSkills.length}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                                {cat.tagline}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectCategory(cat.id)}
                            className="text-[11px] font-mono text-[#E11D2E] hover:underline cursor-pointer flex items-center gap-0.5 shrink-0"
                          >
                            <span>Focus</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Skills Mini-Grid inside Bento Cluster */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2.5">
                          {catSkills.map((skill) => (
                            <SkillBentoCard
                              key={skill.id}
                              skill={skill}
                              isSelected={activeSkill?.id === skill.id}
                              onClick={() => setActiveSkill(skill)}
                            />
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Show More / Show Less Toggle Button */}
          <ShowMoreToggle
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
          />
        </div>
      ) : (
        /* CASE B: Specific Category Filter or Search Query => Responsive Unified Grid */
        <div>
          {searchQuery.trim() ? (
            /* When searching: show all matching results immediately */
            filteredSkills.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
                {filteredSkills.map((skill, index) => (
                  <AnimatedSection key={skill.id} delay={(index % 6) * 40}>
                    <SkillBentoCard
                      skill={skill}
                      isSelected={activeSkill?.id === skill.id}
                      onClick={() => setActiveSkill(skill)}
                    />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="py-12 px-4 text-center rounded-2xl bg-[#FAFAFA] dark:bg-[#101010] border border-dashed border-[#E4E4E7] dark:border-[#2A2A2A]">
                <Search className="w-8 h-8 text-[#A1A1AA] mx-auto mb-2 opacity-50" />
                <h4 className="font-['Space_Grotesk',sans-serif] font-bold text-sm text-[#09090B] dark:text-white">
                  No matching technologies found
                </h4>
                <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 max-w-sm mx-auto">
                  No skills match &quot;{searchQuery}&quot; in this category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#E11D2E] text-white hover:bg-[#C91928] transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )
          ) : (
            /* When category filtered: initial 8 + expandable remaining with Show More */
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
                {initialFilteredSkills.map((skill, index) => (
                  <AnimatedSection key={skill.id} delay={(index % 6) * 40}>
                    <SkillBentoCard
                      skill={skill}
                      isSelected={activeSkill?.id === skill.id}
                      onClick={() => setActiveSkill(skill)}
                    />
                  </AnimatedSection>
                ))}
              </div>

              {remainingFilteredSkills.length > 0 && (
                <>
                  <div
                    className="transition-all duration-500 ease-in-out"
                    style={{
                      display: 'grid',
                      gridTemplateRows: isExpanded ? '1fr' : '0fr',
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? '0.625rem' : 0,
                    }}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3 pt-1">
                        {remainingFilteredSkills.map((skill, index) => (
                          <AnimatedSection key={skill.id} delay={(index % 6) * 40}>
                            <SkillBentoCard
                              skill={skill}
                              isSelected={activeSkill?.id === skill.id}
                              onClick={() => setActiveSkill(skill)}
                            />
                          </AnimatedSection>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ShowMoreToggle
                    isExpanded={isExpanded}
                    onToggle={() => setIsExpanded((prev) => !prev)}
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* 3. Skill Inspection Modal / Detail Card (Portaled directly to body) */}
      {/* ================================================================= */}
      {activeSkill &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setActiveSkill(null)}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white dark:bg-[#141414] border-2 border-[#E11D2E] p-5 shadow-2xl shadow-[#E11D2E]/20 transition-all text-left relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#F4F4F5] dark:bg-[#1E1E1E] border border-[#E4E4E7] dark:border-[#2C2C2C] p-2 flex items-center justify-center shrink-0">
                    {getTechIconUrl(activeSkill.name) ? (
                      <img
                        src={getTechIconUrl(activeSkill.name)}
                        alt=""
                        className={`w-full h-full object-contain ${
                          activeSkill.name.toLowerCase() === 'github' ? 'dark:invert' : ''
                        }`}
                      />
                    ) : (
                      <Sparkles className="w-5 h-5 text-[#E11D2E]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E11D2E] font-semibold">
                      {activeCategoryInfo?.label || activeSkill.category}
                    </span>
                    <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#09090B] dark:text-white leading-tight">
                      {activeSkill.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSkill(null)}
                  className="p-1.5 rounded-lg text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#202020] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Architecture Role */}
              <div className="mt-3.5 pt-3 border-t border-[#E4E4E7] dark:border-[#242424]">
                <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] block mb-1">
                  Architecture Role
                </span>
                <p className="text-xs sm:text-sm text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed">
                  {activeSkill.role}
                </p>
              </div>


            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
