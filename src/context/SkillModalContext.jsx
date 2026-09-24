import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SKILL_CATEGORIES, SKILLS_DATA } from '../data/skillsData';
import { getTechIconUrl } from '../utils/techIcons';
import { X, Sparkles } from 'lucide-react';

const SkillModalContext = createContext({
  activeSkill: null,
  openSkillModal: () => {},
  closeSkillModal: () => {},
});

const KNOWN_EXTRA_SKILLS = {
  'three.js': {
    id: 'threejs',
    name: 'Three.js',
    category: 'frontend',
    role: 'Cross-browser JavaScript 3D library used to create and display animated 3D computer graphics and interactive games in a web browser using WebGL.',
  },
  'threejs': {
    id: 'threejs',
    name: 'Three.js',
    category: 'frontend',
    role: 'Cross-browser JavaScript 3D library used to create and display animated 3D computer graphics and interactive games in a web browser using WebGL.',
  },
  'json': {
    id: 'json',
    name: 'JSON',
    category: 'tools',
    role: 'Lightweight, standard text-based data-interchange format based on JavaScript object syntax, used extensively for API payloads and client-server communication.',
  },
  'cloud computing': {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    category: 'tools',
    role: 'On-demand delivery of computing power, server instances, distributed storage, and networking over the cloud.',
  },
  'html': {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    role: 'Semantic web structuring, accessibility fundamentals & modern browser APIs.',
  },
  'css': {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    role: 'Modern responsive layouts, Flexbox, Grid, transitions & CSS animations.',
  },
  'react': {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    role: 'Component architecture, SPA development, custom hooks & reactive UI state.',
  },
};

function resolveSkill(input) {
  if (!input) return null;

  // If already a skill object with name and role
  if (typeof input === 'object' && input.name && input.role) {
    const categoryInfo = SKILL_CATEGORIES.find((c) => c.id === input.category);
    return {
      ...input,
      categoryLabel: categoryInfo?.label || input.category,
    };
  }

  const nameStr = typeof input === 'string' ? input.trim() : (input.name || '');
  if (!nameStr) return null;

  const key = nameStr.toLowerCase();

  // Check known extras/aliases first
  if (KNOWN_EXTRA_SKILLS[key]) {
    const extra = KNOWN_EXTRA_SKILLS[key];
    const cat = SKILL_CATEGORIES.find((c) => c.id === extra.category);
    return {
      ...extra,
      categoryLabel: cat?.label || extra.category,
    };
  }

  // Check SKILLS_DATA
  const found = SKILLS_DATA.find(
    (s) => s.name.toLowerCase() === key || s.id.toLowerCase() === key
  );
  if (found) {
    const cat = SKILL_CATEGORIES.find((c) => c.id === found.category);
    return {
      ...found,
      categoryLabel: cat?.label || found.category,
    };
  }

  // Partial match
  const partial = SKILLS_DATA.find(
    (s) => s.name.toLowerCase().includes(key) || key.includes(s.name.toLowerCase())
  );
  if (partial) {
    const cat = SKILL_CATEGORIES.find((c) => c.id === partial.category);
    return {
      ...partial,
      categoryLabel: cat?.label || partial.category,
    };
  }

  // Dynamic fallback
  return {
    id: key.replace(/[^a-z0-9]/g, '-'),
    name: nameStr,
    category: 'tools',
    categoryLabel: 'Engineering Stack',
    role: `Core engineering technology and dependency utilized across software development workflows and project implementations.`,
  };
}

export function SkillModalProvider({ children }) {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const openSkillModal = (skillOrName) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    const resolved = resolveSkill(skillOrName);
    if (resolved) {
      setActiveSkill(resolved);
      // Trigger enter animation on the next microtask/frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsOpen(true);
        });
      });
    }
  };

  const closeSkillModal = () => {
    // Start fast exit animation
    setIsOpen(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    // Fast unmount timer matching animation duration (180ms)
    closeTimerRef.current = setTimeout(() => {
      setActiveSkill(null);
      closeTimerRef.current = null;
    }, 180);
  };

  // Close on Escape key and lock body scroll while modal is active or animating
  useEffect(() => {
    if (!activeSkill) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeSkillModal();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [activeSkill]);

  return (
    <SkillModalContext.Provider value={{ activeSkill, openSkillModal, closeSkillModal }}>
      {children}

      {/* Global Skill Inspection Modal with Snappy Enter & Exit Animations */}
      {activeSkill &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200 ease-out ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeSkillModal}
          >
            <div
              className={`w-full max-w-md rounded-2xl bg-white dark:bg-[#141414] border-2 border-[#E11D2E] p-5 shadow-2xl shadow-[#E11D2E]/20 text-left relative transition-all duration-200 transform ${
                isOpen
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-2'
              }`}
              style={{
                transitionTimingFunction: isOpen
                  ? 'cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'cubic-bezier(0.4, 0, 1, 1)',
              }}
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
                      {activeSkill.categoryLabel || activeSkill.category}
                    </span>
                    <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#09090B] dark:text-white leading-tight">
                      {activeSkill.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeSkillModal}
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
    </SkillModalContext.Provider>
  );
}

export function useSkillModal() {
  return useContext(SkillModalContext);
}
