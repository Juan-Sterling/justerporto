import React, { useState, useMemo } from 'react';
import SkillBentoCard from './SkillBentoCard';
import {
  SKILL_CATEGORIES,
  SKILLS_DATA,
} from '../../data/skillsData';
import { useSkillModal } from '../../context/SkillModalContext';
import {
  Code2,
  Server,
  Database,
  Wrench,
  Search,
  X,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';

import { useInView } from '../../hooks/useInView';

const CATEGORY_ICONS = {
  frontend: Code2,
  backend: Server,
  database: Database,
  tools: Wrench,
};

function BentoCluster({
  cat,
  catIdx,
  onSelectCategory,
  activeSkill,
  openSkillModal,
}) {
  const [ref, isInView] = useInView({ threshold: 0.06, triggerOnce: false });
  const catSkills = SKILLS_DATA.filter((s) => s.category === cat.id);
  const Icon = CATEGORY_ICONS[cat.id] || Code2;

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
        transitionDelay: `${catIdx * 100}ms`,
      }}
      className="group/cluster relative flex flex-col justify-start p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#0E0E0E]/90 border border-[#E4E4E7] dark:border-[#242424] shadow-xs hover:border-[#E11D2E]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden will-change-transform"
    >
      {/* Top ambient highlight line on hover */}
      <div 
        className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#E11D2E]/60 to-transparent opacity-0 group-hover/cluster:opacity-100 transition-opacity duration-500 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Bento Header */}
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg bg-[#E11D2E]/10 dark:bg-[#E11D2E]/20 border border-[#E11D2E]/30 flex items-center justify-center text-[#E11D2E] shrink-0 group-hover/cluster:border-[#E11D2E] group-hover/cluster:shadow-[0_0_10px_rgba(225,29,46,0.3)] transition-all duration-300">
            <Icon className="w-4 h-4 relative z-10" />
            <span className="absolute inset-0 rounded-lg bg-[#E11D2E]/10 animate-pulse pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-bold text-[#09090B] dark:text-white leading-tight">
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
          onClick={() => onSelectCategory(cat.id)}
          className="text-[11px] font-mono text-[#E11D2E] hover:underline cursor-pointer flex items-center gap-0.5 shrink-0 group-hover/cluster:translate-x-0.5 transition-transform"
        >
          <span>Focus</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Skills Mini-Grid inside Bento Cluster with Staggered Cascading Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2.5">
        {catSkills.map((skill, sIdx) => (
          <SkillBentoCard
            key={skill.id}
            skill={skill}
            isSelected={activeSkill?.id === skill.id}
            onClick={() => openSkillModal(skill)}
            isInView={isInView}
            delay={sIdx * 30 + 60}
          />
        ))}
      </div>
    </div>
  );
}

function ShowMoreToggle({ isExpanded, onToggle, labelMore = 'Show More', labelLess = 'Show Less' }) {
  return (
    <div className="relative mt-3 sm:mt-4 flex flex-col items-center justify-center">
      {/* Subtle divider line with centered interactive trigger */}
      <div className="w-full flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E4E4E7] dark:via-[#262626] to-transparent" />
        </div>

        {/* Interactive Pill Button */}
        <button
          type="button"
          onClick={onToggle}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-[#141414] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1C] border border-[#E4E4E7] dark:border-[#333333] hover:border-[#E11D2E] dark:hover:border-[#E11D2E] text-[#09090B] dark:text-[#F4F4F5] text-xs font-mono shadow-xs hover:shadow-md hover:shadow-[#E11D2E]/10 active:scale-95 transition-all duration-200 cursor-pointer group select-none"
          aria-expanded={isExpanded}
        >
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
  const { activeSkill, openSkillModal } = useSkillModal();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterBarRef, isFilterBarInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [gridRef, isGridInView] = useInView({ threshold: 0.05, triggerOnce: false });

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
      {/* 1. Filter Bar: Category Tabs + Search with Scroll Entrance        */}
      {/* ================================================================= */}
      <div 
        ref={filterBarRef}
        style={{
          opacity: isFilterBarInView ? 1 : 0,
          transform: isFilterBarInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms ease-out, transform 600ms ease-out',
        }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 will-change-transform"
      >
        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F4F4F5] dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#262626] overflow-x-auto no-scrollbar scroll-smooth">
          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-[#202020] text-[#09090B] dark:text-white shadow-xs font-semibold ring-1 ring-[#E11D2E]/25'
                : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            {selectedCategory === 'all' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E] animate-pulse shrink-0" />
            )}
            <span>All</span>
            <span className="opacity-60 text-[10px]">({SKILLS_DATA.length})</span>
          </button>

          {SKILL_CATEGORIES.map((cat) => {
            const count = SKILLS_DATA.filter((s) => s.category === cat.id).length;
            const Icon = CATEGORY_ICONS[cat.id] || Code2;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#202020] text-[#09090B] dark:text-white shadow-xs font-semibold ring-1 ring-[#E11D2E]/25'
                    : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E] animate-pulse shrink-0" />
                )}
                <Icon className={`w-3 h-3 transition-colors ${isActive ? 'text-[#E11D2E]' : ''}`} />
                <span>{cat.label}</span>
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Bar */}
        <div className="relative min-w-[220px] sm:w-64 group/search">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] group-focus-within/search:text-[#E11D2E] transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter technologies..."
            className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#262626] text-xs text-[#09090B] dark:text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#E11D2E] focus:ring-2 focus:ring-[#E11D2E]/20 transition-all"
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
            {initialBentoCategories.map((cat, catIdx) => (
              <BentoCluster
                key={cat.id}
                cat={cat}
                catIdx={catIdx}
                onSelectCategory={handleSelectCategory}
                activeSkill={activeSkill}
                openSkillModal={openSkillModal}
              />
            ))}
          </div>

          {/* Smooth Collapsible Section for Remaining Bento Clusters (Database & Tools) */}
          <div className="relative mt-3.5 sm:mt-4">
            <div
              className="relative transition-all duration-700 ease-in-out overflow-hidden"
              style={{
                maxHeight: isExpanded ? '2000px' : '95px',
                maskImage: isExpanded
                  ? 'none'
                  : 'linear-gradient(to bottom, black 0%, black 25%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
                WebkitMaskImage: isExpanded
                  ? 'none'
                  : 'linear-gradient(to bottom, black 0%, black 25%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                {remainingBentoCategories.map((cat, catIdx) => (
                  <BentoCluster
                    key={cat.id}
                    cat={cat}
                    catIdx={catIdx + 2}
                    onSelectCategory={handleSelectCategory}
                    activeSkill={activeSkill}
                    openSkillModal={openSkillModal}
                  />
                ))}
              </div>
            </div>

            {/* Subtle Smooth Gradient Veil when collapsed */}
            <div
              className={`pointer-events-none absolute -bottom-1 inset-x-0 h-24 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0f1117] via-[#FAFAFA]/70 dark:via-[#0f1117]/70 to-transparent transition-opacity duration-500 z-10 ${
                isExpanded ? 'opacity-0' : 'opacity-100'
              }`}
              aria-hidden="true"
            />
          </div>

          {/* Show More / Show Less Toggle Button */}
          <ShowMoreToggle
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
          />
        </div>
      ) : (
        /* CASE B: Specific Category Filter or Search Query => Responsive Unified Grid with Cascading Entrance */
        <div ref={gridRef} key={selectedCategory}>
          {filteredSkills.length > 0 ? (
            <div>
              {/* Category Header Info when filtered */}
              {!searchQuery.trim() && (
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                      Showing {filteredSkills.length} technologies in
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#E11D2E] capitalize">
                      {selectedCategory}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectCategory('all')}
                    className="text-xs font-mono text-[#71717A] hover:text-[#E11D2E] dark:hover:text-[#E11D2E] transition-colors cursor-pointer"
                  >
                    ← Back to All
                  </button>
                </div>
              )}

              {/* Grid of All Filtered Skills - Always 100% visible! */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
                {filteredSkills.map((skill, index) => (
                  <SkillBentoCard
                    key={skill.id}
                    skill={skill}
                    isSelected={activeSkill?.id === skill.id}
                    onClick={() => openSkillModal(skill)}
                    isInView={true}
                    delay={(index % 6) * 35}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Empty Search State */
            <div className="py-12 px-4 text-center rounded-2xl bg-[#FAFAFA] dark:bg-[#101010] border border-dashed border-[#E4E4E7] dark:border-[#2A2A2A]">
              <Search className="w-8 h-8 text-[#A1A1AA] mx-auto mb-2 opacity-50" />
              <h4 className="font-display font-bold text-sm text-[#09090B] dark:text-white">
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
          )}
        </div>
      )}
    </div>
  );
}
