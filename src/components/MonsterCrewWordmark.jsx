import React, { useState, useEffect, useRef, useCallback } from 'react';

const SVG_WIDTH = 1120;
const SVG_HEIGHT = 330;

const MONSTER_CREW = [
  {
    id: 'imp',
    name: 'Crimson Imp',
    ariaLabel: 'Crimson Imp character perched on J',
    x: 148,
    y: 152,
    anchorPercent: '13.2%',
    bubbleBottomPercent: '86.5%',
    bubbleAlign: 'left',
    bubbleBorder: 'border-[#09090B] dark:border-[#E11D2E]',
    bubbleShadow: 'shadow-[2px_2px_0px_#09090B] dark:shadow-[2px_2px_0px_#E11D2E]',
    tailBorder: 'border-[#09090B] dark:border-[#E11D2E]',
    lines: [
      'CURIOUS LIKE BABY',
      'BUILT FOR TECH',
      'HORNS UP · STAY SHARP',
    ],
    eyes: [
      { id: 'imp-left', cx: 136, cy: 96, maxOffset: 3.4 },
      { id: 'imp-right', cx: 160, cy: 96, maxOffset: 3.4 },
    ],
  },
  {
    id: 'cat',
    name: 'Horned Alley Cat',
    ariaLabel: 'Horned Alley Cat character perched on S',
    x: 480,
    y: 148,
    anchorPercent: '42.8%',
    bubbleBottomPercent: '83.5%',
    bubbleAlign: 'center',
    bubbleBorder: 'border-[#09090B] dark:border-[#E11D2E]',
    bubbleShadow: 'shadow-[2px_2px_0px_#09090B] dark:shadow-[2px_2px_0px_#E11D2E]',
    tailBorder: 'border-[#09090B] dark:border-[#E11D2E]',
    lines: [
      'KEEP IT DRIPPIN',
      'MEOW · SHIP THE CODE',
      '9 LIVES OF DEBUGGING',
    ],
    eyes: [
      { id: 'cat-left', cx: 468, cy: 96, maxOffset: 3.2 },
      { id: 'cat-right', cx: 492, cy: 96, maxOffset: 3.2 },
    ],
  },
  {
    id: 'cyclops',
    name: 'Portal Cyclops',
    ariaLabel: 'Portal Cyclops character perched on T',
    x: 656,
    y: 151,
    anchorPercent: '58.6%',
    bubbleBottomPercent: '84.5%',
    bubbleAlign: 'center',
    bubbleBorder: 'border-[#09090B] dark:border-[#E11D2E]',
    bubbleShadow: 'shadow-[2px_2px_0px_#09090B] dark:shadow-[2px_2px_0px_#E11D2E]',
    tailBorder: 'border-[#09090B] dark:border-[#E11D2E]',
    lines: [
      'PORTAL OPEN',
      'DRIP · DEBUG · DEPLOY',
      'EYES ON THE STACK',
    ],
    eyes: [
      { id: 'cyclops-center', cx: 656, cy: 97, maxOffset: 5.2 },
    ],
  },
  {
    id: 'ghost',
    name: 'Toxic Glitch Ghost',
    ariaLabel: 'Toxic Glitch Ghost character perched on R',
    x: 996,
    y: 152,
    anchorPercent: '88.9%',
    bubbleBottomPercent: '86%',
    bubbleAlign: 'right',
    bubbleBorder: 'border-[#059669] dark:border-[#00f59b]',
    bubbleShadow: 'shadow-[2px_2px_0px_#059669] dark:shadow-[2px_2px_0px_#00f59b]',
    tailBorder: 'border-[#059669] dark:border-[#00f59b]',
    lines: [
      'ANOTHER SIDE BELOW?',
      'SECRET MODE · READY',
      'EXPLORE PERSONAL SIDE',
    ],
    eyes: [
      { id: 'ghost-left', cx: 984, cy: 96, maxOffset: 3.3 },
      { id: 'ghost-right', cx: 1008, cy: 96, maxOffset: 3.3 },
    ],
  },
];

const BUBBLE_WRAPPER_ALIGN_CLASSES = {
  left: 'left-0 sm:left-[13.2%] sm:-translate-x-1/2',
  center: '-translate-x-1/2',
  right: 'right-0 sm:right-auto sm:left-[88.9%] sm:-translate-x-1/2',
};

const BUBBLE_TAIL_ALIGN_CLASSES = {
  left: 'left-7 sm:left-1/2 sm:-translate-x-1/2',
  center: 'left-1/2 -translate-x-1/2',
  right: 'right-7 sm:right-auto sm:left-1/2 sm:-translate-x-1/2',
};

/**
 * MonsterCrewWordmark
 *
 * Interactive giant dry-brush "JUSTER" wordmark with 4 BABYMONSTER-themed
 * hand-drawn SVG characters whose pupils track the cursor via rAF-throttled
 * DOM refs (zero React re-renders on pointer move) and hop with a speech
 * bubble on click/tap.
 */
export default function MonsterCrewWordmark() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const pupilRefs = useRef({});
  const lineCursorRef = useRef({});
  const speechTimerRef = useRef(null);

  const [activeSpeech, setActiveSpeech] = useState(null);
  const [hoppingId, setHoppingId] = useState(null);
  const [hopSeq, setHopSeq] = useState(0);
  const [poppedLetter, setPoppedLetter] = useState(null);
  const [letterSeq, setLetterSeq] = useState(0);

  const setPupilRef = useCallback((eyeId) => (el) => {
    if (el) {
      pupilRefs.current[eyeId] = el;
    } else {
      delete pupilRefs.current[eyeId];
    }
  }, []);

  // Cleanup speech auto-hide timer on unmount
  useEffect(() => {
    return () => {
      if (speechTimerRef.current) {
        clearTimeout(speechTimerRef.current);
      }
    };
  }, []);

  // Zero-re-render, viewport-gated cursor eye tracking
  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) return;

    let isVisible = false;
    let rafId = null;
    let latestX = 0;
    let latestY = 0;

    const updatePupils = () => {
      rafId = null;
      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const svgX = ((latestX - rect.left) / rect.width) * SVG_WIDTH;
      const svgY = ((latestY - rect.top) / rect.height) * SVG_HEIGHT;

      for (let i = 0; i < MONSTER_CREW.length; i += 1) {
        const monster = MONSTER_CREW[i];
        for (let j = 0; j < monster.eyes.length; j += 1) {
          const eye = monster.eyes[j];
          const pupilEl = pupilRefs.current[eye.id];
          if (!pupilEl) continue;

          const dx = svgX - eye.cx;
          const dy = svgY - eye.cy;
          const dist = Math.hypot(dx, dy);
          const factor = Math.min(1, dist / 180);
          const angle = Math.atan2(dy, dx);
          const px = Math.cos(angle) * eye.maxOffset * factor;
          const py = Math.sin(angle) * eye.maxOffset * factor;

          pupilEl.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;
        }
      }
    };

    const handlePointerMove = (e) => {
      if (!isVisible) return;
      latestX = e.clientX;
      latestY = e.clientY;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updatePupils);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '120px 0px' }
    );

    observer.observe(container);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleMonsterTrigger = (monster) => {
    const prevIdx = lineCursorRef.current[monster.id] ?? -1;
    const nextIdx = (prevIdx + 1) % monster.lines.length;
    lineCursorRef.current[monster.id] = nextIdx;

    setHoppingId(monster.id);
    setHopSeq((prev) => prev + 1);
    setActiveSpeech({
      id: monster.id,
      text: monster.lines[nextIdx],
      anchorPercent: monster.anchorPercent,
      bubbleBottomPercent: monster.bubbleBottomPercent,
      bubbleAlign: monster.bubbleAlign,
      bubbleBorder: monster.bubbleBorder,
      bubbleShadow: monster.bubbleShadow,
      tailBorder: monster.tailBorder,
    });

    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
    }
    speechTimerRef.current = setTimeout(() => {
      setActiveSpeech((current) => (current?.id === monster.id ? null : current));
    }, 3200);
  };

  const handleLetterTrigger = (letterKey) => {
    setPoppedLetter(letterKey);
    setLetterSeq((prev) => prev + 1);
  };

  const handleMonsterKeyDown = (e, monster) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMonsterTrigger(monster);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full mt-3 sm:mt-5 mb-2 select-none"
    >
      {/* Tight SVG Stage Container so speech bubble bottom% aligns precisely above each monster */}
      <div className="relative w-full">
        {/* Active Comic Speech Bubble Overlay */}
        {activeSpeech && (
          <div
            style={{
              left:
                activeSpeech.bubbleAlign === 'left' || activeSpeech.bubbleAlign === 'right'
                  ? undefined
                  : activeSpeech.anchorPercent,
              bottom: activeSpeech.bubbleBottomPercent,
            }}
            className={`pointer-events-none absolute z-20 ${
              BUBBLE_WRAPPER_ALIGN_CLASSES[activeSpeech.bubbleAlign]
            }`}
          >
            <div
              key={`${activeSpeech.id}-${hopSeq}`}
              role="status"
              aria-live="polite"
              className={`animate-monster-bubble relative px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-white dark:bg-[#111318] text-[#09090B] dark:text-[#FAFAFA] border-2 ${activeSpeech.bubbleBorder} ${activeSpeech.bubbleShadow} whitespace-nowrap`}
            >
              <span className="font-mono text-[10px] sm:text-xs font-extrabold tracking-wide uppercase block leading-tight">
                {activeSpeech.text}
              </span>
              {/* Comic Speech Pointer Tail */}
              <span
                aria-hidden="true"
                className={`absolute -bottom-[6px] w-2.5 h-2.5 rotate-45 bg-white dark:bg-[#111318] border-r-2 border-b-2 ${activeSpeech.tailBorder} ${
                  BUBBLE_TAIL_ALIGN_CLASSES[activeSpeech.bubbleAlign]
                }`}
              />
            </div>
          </div>
        )}

        {/* Main Responsive Wordmark & Monster Crew SVG */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-auto overflow-visible block"
          role="img"
          aria-label="JUSTER wordmark with interactive Little Monster Crew characters"
        >
        {/* Subtle Hand-Drawn Stage Doodles (Stars, Horns, Ink Sparks) */}
        <g aria-hidden="true" className="pointer-events-none">
          {/* 4-point sparkle near J */}
          <path
            d="M 42 108 L 46 120 L 58 124 L 46 128 L 42 140 L 38 128 L 26 124 L 38 120 Z"
            className="fill-[#E11D2E]/60 dark:fill-[#E11D2E]/80"
          />
          {/* Tiny floating horn emblem above U */}
          <path
            d="M 288 112 C 285 100 290 92 296 90 C 294 99 297 104 302 106 C 307 104 310 99 308 90 C 314 92 319 100 316 112 C 312 117 292 117 288 112 Z"
            className="fill-[#E11D2E]/40 dark:fill-[#E11D2E]/55"
          />
          {/* Small diagonal ink sparks above E */}
          <path
            d="M 818 112 L 826 94 M 834 118 L 848 106 M 804 118 L 792 105"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="stroke-zinc-400 dark:stroke-zinc-600"
          />
          {/* 4-point sparkle right of R */}
          <path
            d="M 1088 122 L 1091 131 L 1100 134 L 1091 137 L 1088 146 L 1085 137 L 1076 134 L 1085 131 Z"
            className="fill-[#10b981]/60 dark:fill-[#00f59b]/70"
          />
          {/* Subtle hand-drawn ground baseline tick marks */}
          <path
            d="M 52 320 Q 320 325 560 319 T 1076 320"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="10 12 42 14"
            className="stroke-zinc-300 dark:stroke-zinc-800"
          />
        </g>

        {/* Giant Dry-Brush "JUSTER" Wordmark + Perched Little Monster Crew
            Each column uses stationary hit rects + a single animated group so hovering never jitters
            and perched monsters lift/tilt together with their letter. */}

        {/* ================= COLUMN 1: J + CRIMSON IMP MONSTER ================= */}
        <g className="group">
          <rect
            x="44"
            y="146"
            width="154"
            height="170"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleLetterTrigger('J')}
          />

          <g
            style={{ transformOrigin: '122px 308px' }}
            className="pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2.5 group-hover:-rotate-2 group-hover:scale-[1.03]"
          >
            <g
              key={poppedLetter === 'J' ? `J-${letterSeq}` : 'J-idle'}
              style={{ transformOrigin: '122px 308px' }}
              className={poppedLetter === 'J' ? 'animate-letter-pop' : ''}
            >
              {/* Letter J */}
              <g aria-hidden="true">
                <path
                  d="M 68 152 L 194 148 L 190 182 L 166 183 L 166 248 C 166 289 140 310 100 310 C 68 310 50 292 48 263 L 85 256 C 87 272 95 278 106 278 C 122 278 128 266 128 246 L 128 184 L 64 186 Z"
                  className="fill-[#09090B] dark:fill-[#FAFAFA] group-hover:fill-[#E11D2E] transition-colors duration-200"
                />
                <path
                  d="M 45 254 L 64 251 L 61 264 L 44 266 Z"
                  className="fill-[#E11D2E] group-hover:fill-[#09090B] dark:group-hover:fill-[#FAFAFA] transition-colors duration-200"
                />
              </g>

              {/* Perched Monster: Crimson Imp */}
              <g
                key={hoppingId === 'imp' ? `imp-${hopSeq}` : 'imp-idle'}
                style={{ transformOrigin: '148px 152px' }}
                className={hoppingId === 'imp' ? 'animate-monster-hop' : ''}
              >
                {/* Spiked tail */}
                <path
                  d="M 122 132 C 104 130 98 115 105 106"
                  fill="none"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  className="stroke-[#09090B] dark:stroke-[#FAFAFA]"
                />
                <path d="M 100 102 L 111 101 L 106 112 Z" className="fill-[#E11D2E]" />

                {/* Twin BABYMONSTER Horns */}
                <path
                  d="M 127 78 C 117 62 121 48 131 46 C 130 57 135 65 141 72 Z"
                  className="fill-[#E11D2E] stroke-[#09090B] dark:stroke-[#FAFAFA]"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M 169 78 C 179 62 175 48 165 46 C 166 57 161 65 155 72 Z"
                  className="fill-[#E11D2E] stroke-[#09090B] dark:stroke-[#FAFAFA]"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Chubby Monster Body */}
                <path
                  d="M 118 146 C 114 118 118 72 148 72 C 178 72 182 118 178 146 C 172 153 160 151 148 151 C 136 151 124 153 118 146 Z"
                  className="fill-[#18181B] dark:fill-[#161822] stroke-[#09090B] dark:stroke-[#FAFAFA]"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* Little paws gripping top of J */}
                <ellipse
                  cx="132"
                  cy="149"
                  rx="8"
                  ry="5"
                  className="fill-[#E11D2E] stroke-[#09090B] dark:stroke-[#FAFAFA]"
                  strokeWidth="2.5"
                />
                <ellipse
                  cx="164"
                  cy="149"
                  rx="8"
                  ry="5"
                  className="fill-[#E11D2E] stroke-[#09090B] dark:stroke-[#FAFAFA]"
                  strokeWidth="2.5"
                />

                {/* Sclera */}
                <circle cx="136" cy="96" r="8.5" fill="#FFFFFF" />
                <circle cx="160" cy="96" r="8.5" fill="#FFFFFF" />

                {/* Tracking Pupils */}
                <g ref={setPupilRef('imp-left')}>
                  <circle cx="136" cy="96" r="4" fill="#09090B" />
                  <circle cx="137.5" cy="94.5" r="1.4" fill="#FFFFFF" />
                </g>
                <g ref={setPupilRef('imp-right')}>
                  <circle cx="160" cy="96" r="4" fill="#09090B" />
                  <circle cx="161.5" cy="94.5" r="1.4" fill="#FFFFFF" />
                </g>

                {/* Cheeky grin + tiny fang */}
                <path
                  d="M 136 115 Q 148 124 160 115"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <path d="M 141 117 L 144 123 L 147 118 Z" fill="#E11D2E" />
              </g>
            </g>
          </g>

          {/* Stationary Hit Target for Crimson Imp */}
          <rect
            x="104"
            y="40"
            width="88"
            height="108"
            fill="transparent"
            role="button"
            tabIndex={0}
            aria-label={MONSTER_CREW[0].ariaLabel}
            onClick={() => handleMonsterTrigger(MONSTER_CREW[0])}
            onKeyDown={(e) => handleMonsterKeyDown(e, MONSTER_CREW[0])}
            className="cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-[#E11D2E]"
          />
        </g>

        {/* ================= COLUMN 2: U ================= */}
        <g className="group">
          <rect
            x="222"
            y="134"
            width="156"
            height="182"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleLetterTrigger('U')}
          />

          <g
            style={{ transformOrigin: '300px 310px' }}
            className="pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2.5 group-hover:rotate-2 group-hover:scale-[1.03]"
          >
            <g
              key={poppedLetter === 'U' ? `U-${letterSeq}` : 'U-idle'}
              style={{ transformOrigin: '300px 310px' }}
              className={poppedLetter === 'U' ? 'animate-letter-pop' : ''}
              aria-hidden="true"
            >
              <path
                d="M 226 152 L 266 150 L 266 244 C 266 266 279 278 300 278 C 321 278 334 266 334 244 L 334 150 L 374 152 L 374 246 C 374 289 345 312 300 312 C 255 312 226 289 226 246 Z"
                className="fill-[#09090B] dark:fill-[#FAFAFA] group-hover:fill-[#E11D2E] transition-colors duration-200"
              />
              <path
                d="M 226 152 L 236 136 L 250 151 Z M 350 151 L 364 136 L 374 152 Z"
                className="fill-[#E11D2E] group-hover:fill-[#09090B] dark:group-hover:fill-[#FAFAFA] transition-colors duration-200"
              />
            </g>
          </g>
        </g>

        {/* ================= COLUMN 3: S + HORNED ALLEY CAT ================= */}
        <g className="group">
          <rect
            x="400"
            y="144"
            width="156"
            height="172"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleLetterTrigger('S')}
          />

          <g
            style={{ transformOrigin: '478px 310px' }}
            className="pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2.5 group-hover:-rotate-2 group-hover:scale-[1.03]"
          >
            <g
              key={poppedLetter === 'S' ? `S-${letterSeq}` : 'S-idle'}
              style={{ transformOrigin: '478px 310px' }}
              className={poppedLetter === 'S' ? 'animate-letter-pop' : ''}
            >
              {/* Letter S */}
              <g aria-hidden="true">
                <path
                  d="M 544 182 L 508 192 C 503 180 492 175 478 175 C 461 175 450 183 450 194 C 450 206 462 211 490 217 C 528 225 552 240 552 267 C 552 296 524 312 480 312 C 436 312 408 294 402 264 L 440 255 C 444 272 458 281 481 281 C 501 281 513 274 513 263 C 513 251 501 246 472 240 C 436 232 412 218 412 191 C 412 162 440 146 480 146 C 517 146 539 160 544 182 Z"
                  className="fill-[#09090B] dark:fill-[#FAFAFA] group-hover:fill-[#E11D2E] transition-colors duration-200"
                />
              </g>

              {/* Perched Monster: Horned Alley Cat */}
              <g
                key={hoppingId === 'cat' ? `cat-${hopSeq}` : 'cat-idle'}
                style={{ transformOrigin: '480px 148px' }}
                className={hoppingId === 'cat' ? 'animate-monster-hop' : ''}
              >
                {/* Wavy cat tail */}
                <path
                  d="M 505 138 C 524 134 528 112 518 102"
                  fill="none"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="stroke-[#09090B] dark:stroke-[#E4E4E7]"
                />

                {/* Cat ears */}
                <path
                  d="M 454 84 L 450 56 L 472 72 Z"
                  className="fill-[#FAFAFA] dark:fill-[#E4E4E7] stroke-[#09090B]"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M 506 84 L 510 56 L 488 72 Z"
                  className="fill-[#FAFAFA] dark:fill-[#E4E4E7] stroke-[#09090B]"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />
                {/* Inner ear crimson accents */}
                <path d="M 456 76 L 455 63 L 467 72 Z" className="fill-[#E11D2E]" />
                <path d="M 504 76 L 505 63 L 493 72 Z" className="fill-[#E11D2E]" />

                {/* Mini devil horns between ears */}
                <path
                  d="M 472 71 L 469 58 L 478 69 Z M 488 71 L 491 58 L 482 69 Z"
                  className="fill-[#E11D2E] stroke-[#09090B]"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* Cat head & seated body */}
                <path
                  d="M 450 144 C 446 122 450 72 480 72 C 510 72 514 122 510 144 C 503 150 457 150 450 144 Z"
                  className="fill-[#FAFAFA] dark:fill-[#E4E4E7] stroke-[#09090B]"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* Crimson collar */}
                <path
                  d="M 457 124 Q 480 130 503 124"
                  fill="none"
                  stroke="#E11D2E"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />

                {/* Whiskers */}
                <path
                  d="M 442 100 L 455 102 M 441 108 L 455 107 M 518 100 L 505 102 M 519 108 L 505 107"
                  stroke="#09090B"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />

                {/* Eye sockets */}
                <circle cx="468" cy="96" r="8" fill="#FFFFFF" stroke="#09090B" strokeWidth="2.2" />
                <circle cx="492" cy="96" r="8" fill="#FFFFFF" stroke="#09090B" strokeWidth="2.2" />

                {/* Tracking cat pupils */}
                <g ref={setPupilRef('cat-left')}>
                  <ellipse cx="468" cy="96" rx="3" ry="4.8" fill="#09090B" />
                  <circle cx="469.2" cy="94" r="1.2" fill="#E11D2E" />
                </g>
                <g ref={setPupilRef('cat-right')}>
                  <ellipse cx="492" cy="96" rx="3" ry="4.8" fill="#09090B" />
                  <circle cx="493.2" cy="94" r="1.2" fill="#E11D2E" />
                </g>

                {/* Nose + :3 mouth */}
                <path d="M 477 105 L 483 105 L 480 109 Z" fill="#E11D2E" />
                <path
                  d="M 473 112 Q 477 115 480 110 Q 483 115 487 112"
                  fill="none"
                  stroke="#09090B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Paws */}
                <circle cx="464" cy="146" r="6" className="fill-[#FAFAFA] dark:fill-[#E4E4E7] stroke-[#09090B]" strokeWidth="2.6" />
                <circle cx="496" cy="146" r="6" className="fill-[#FAFAFA] dark:fill-[#E4E4E7] stroke-[#09090B]" strokeWidth="2.6" />
              </g>
            </g>
          </g>

          {/* Stationary Hit Target for Horned Alley Cat */}
          <rect
            x="434"
            y="40"
            width="96"
            height="106"
            fill="transparent"
            role="button"
            tabIndex={0}
            aria-label={MONSTER_CREW[1].ariaLabel}
            onClick={() => handleMonsterTrigger(MONSTER_CREW[1])}
            onKeyDown={(e) => handleMonsterKeyDown(e, MONSTER_CREW[1])}
            className="cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-[#E11D2E]"
          />
        </g>

        {/* ================= COLUMN 4: T + PORTAL CYCLOPS ================= */}
        <g className="group">
          <rect
            x="572"
            y="146"
            width="166"
            height="170"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleLetterTrigger('T')}
          />

          <g
            style={{ transformOrigin: '656px 308px' }}
            className="pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2.5 group-hover:rotate-2 group-hover:scale-[1.03]"
          >
            <g
              key={poppedLetter === 'T' ? `T-${letterSeq}` : 'T-idle'}
              style={{ transformOrigin: '656px 308px' }}
              className={poppedLetter === 'T' ? 'animate-letter-pop' : ''}
            >
              {/* Letter T */}
              <g aria-hidden="true">
                <path
                  d="M 578 152 L 736 149 L 732 184 L 676 185 L 676 308 L 636 308 L 636 186 L 574 187 Z"
                  className="fill-[#09090B] dark:fill-[#FAFAFA] group-hover:fill-[#E11D2E] transition-colors duration-200"
                />
              </g>

              {/* Perched Monster: Portal Cyclops */}
              <g
                key={hoppingId === 'cyclops' ? `cyclops-${hopSeq}` : 'cyclops-idle'}
                style={{ transformOrigin: '656px 151px' }}
                className={hoppingId === 'cyclops' ? 'animate-monster-hop' : ''}
              >
                {/* Dangling little legs over T crossbar */}
                <path
                  d="M 642 136 L 640 151 M 670 136 L 672 151"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="stroke-[#09090B] dark:stroke-[#FAFAFA]"
                />

                {/* Tiny white horns */}
                <path
                  d="M 633 70 L 626 52 L 642 64 Z M 679 70 L 686 52 L 670 64 Z"
                  className="fill-[#FAFAFA] stroke-[#09090B]"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />

                {/* Split Portal "O" Shell Body */}
                <circle
                  cx="656"
                  cy="99"
                  r="36"
                  className="fill-[#E11D2E] stroke-[#09090B] dark:stroke-[#FAFAFA]"
                  strokeWidth="3.2"
                />
                {/* Signature Portal slit marks at top and bottom */}
                <rect
                  x="653.5"
                  y="63"
                  width="5"
                  height="10"
                  rx="1.5"
                  className="fill-[#09090B] dark:fill-[#07080B]"
                />
                <rect
                  x="653.5"
                  y="125"
                  width="5"
                  height="10"
                  rx="1.5"
                  className="fill-[#09090B] dark:fill-[#07080B]"
                />

                {/* Giant Central Cyclops Eye */}
                <circle
                  cx="656"
                  cy="97"
                  r="18"
                  fill="#FFFFFF"
                  stroke="#09090B"
                  strokeWidth="3"
                />

                {/* Tracking Pupil */}
                <g ref={setPupilRef('cyclops-center')}>
                  <circle cx="656" cy="97" r="8.5" fill="#09090B" />
                  <circle cx="656" cy="97" r="4" fill="#E11D2E" />
                  <circle cx="659.5" cy="93.5" r="2.6" fill="#FFFFFF" />
                </g>

                {/* Little stubby wave arms */}
                <path
                  d="M 621 102 C 611 98 610 88 616 84 M 691 102 C 701 98 702 88 696 84"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="stroke-[#09090B] dark:stroke-[#FAFAFA]"
                />
              </g>
            </g>
          </g>

          {/* Stationary Hit Target for Portal Cyclops */}
          <rect
            x="610"
            y="40"
            width="94"
            height="108"
            fill="transparent"
            role="button"
            tabIndex={0}
            aria-label={MONSTER_CREW[2].ariaLabel}
            onClick={() => handleMonsterTrigger(MONSTER_CREW[2])}
            onKeyDown={(e) => handleMonsterKeyDown(e, MONSTER_CREW[2])}
            className="cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-[#E11D2E]"
          />
        </g>

        {/* ================= COLUMN 5: E ================= */}
        <g className="group">
          <rect
            x="758"
            y="146"
            width="146"
            height="170"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleLetterTrigger('E')}
          />

          <g
            style={{ transformOrigin: '832px 308px' }}
            className="pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2.5 group-hover:-rotate-2 group-hover:scale-[1.03]"
          >
            <g
              key={poppedLetter === 'E' ? `E-${letterSeq}` : 'E-idle'}
              style={{ transformOrigin: '832px 308px' }}
              className={poppedLetter === 'E' ? 'animate-letter-pop' : ''}
              aria-hidden="true"
            >
              <path
                d="M 762 152 L 898 150 L 894 184 L 802 185 L 802 275 L 898 274 L 902 308 L 762 308 Z"
                className="fill-[#09090B] dark:fill-[#FAFAFA] group-hover:fill-[#E11D2E] transition-colors duration-200"
              />
              <path
                d="M 796 214 L 880 211 L 875 244 L 796 245 Z"
                className="fill-[#E11D2E] group-hover:fill-[#09090B] dark:group-hover:fill-[#FAFAFA] transition-colors duration-200"
              />
            </g>
          </g>
        </g>

        {/* ================= COLUMN 6: R + TOXIC GLITCH GHOST ================= */}
        <g className="group">
          <rect
            x="926"
            y="146"
            width="158"
            height="170"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handleLetterTrigger('R')}
          />

          <g
            style={{ transformOrigin: '1006px 308px' }}
            className="pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2.5 group-hover:rotate-2 group-hover:scale-[1.03]"
          >
            <g
              key={poppedLetter === 'R' ? `R-${letterSeq}` : 'R-idle'}
              style={{ transformOrigin: '1006px 308px' }}
              className={poppedLetter === 'R' ? 'animate-letter-pop' : ''}
            >
              {/* Letter R */}
              <g aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M 930 152 L 1018 152 C 1054 152 1076 171 1076 201 C 1076 225 1061 241 1039 247 L 1082 308 L 1036 308 L 998 252 L 970 252 L 970 308 L 930 308 Z M 970 183 L 970 221 L 1014 221 C 1029 221 1037 214 1037 202 C 1037 190 1029 183 1014 183 Z"
                  className="fill-[#09090B] dark:fill-[#FAFAFA] group-hover:fill-[#E11D2E] transition-colors duration-200"
                />
              </g>

              {/* Perched Monster: Toxic Glitch Ghost */}
              <g
                key={hoppingId === 'ghost' ? `ghost-${hopSeq}` : 'ghost-idle'}
                style={{ transformOrigin: '996px 152px' }}
                className={hoppingId === 'ghost' ? 'animate-monster-hop' : ''}
              >
                {/* Mini radar/horn */}
                <path
                  d="M 996 68 L 996 54"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  className="stroke-[#059669] dark:stroke-[#00f59b]"
                />
                <circle
                  cx="996"
                  cy="52"
                  r="4.5"
                  className="fill-[#10b981] dark:fill-[#00f59b] stroke-[#09090B]"
                  strokeWidth="2"
                />

                {/* Wavy Ghost Body */}
                <path
                  d="M 966 146 L 966 100 C 966 78 979 68 996 68 C 1013 68 1026 78 1026 100 L 1026 146 L 1016 138 L 1006 148 L 996 138 L 986 148 L 976 138 Z"
                  className="fill-[#ECFDF5] dark:fill-[#091A14] stroke-[#059669] dark:stroke-[#00f59b]"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* Toxic visor/stripe accent */}
                <rect
                  x="972"
                  y="84"
                  width="48"
                  height="24"
                  rx="10"
                  className="fill-[#09090B] dark:fill-[#050B08] stroke-[#10b981] dark:stroke-[#00f59b]"
                  strokeWidth="2"
                />

                {/* Sclera */}
                <circle cx="984" cy="96" r="7" fill="#FFFFFF" />
                <circle cx="1008" cy="96" r="7" fill="#FFFFFF" />

                {/* Tracking Pupils */}
                <g ref={setPupilRef('ghost-left')}>
                  <circle cx="984" cy="96" r="3.4" className="fill-[#059669] dark:fill-[#00f59b]" />
                  <circle cx="984" cy="96" r="1.6" fill="#09090B" />
                </g>
                <g ref={setPupilRef('ghost-right')}>
                  <circle cx="1008" cy="96" r="3.4" className="fill-[#059669] dark:fill-[#00f59b]" />
                  <circle cx="1008" cy="96" r="1.6" fill="#09090B" />
                </g>

                {/* Little pixel grin */}
                <path
                  d="M 988 119 L 992 122 L 1000 122 L 1004 119"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-[#059669] dark:stroke-[#00f59b]"
                />
              </g>
            </g>
          </g>

          {/* Stationary Hit Target for Toxic Glitch Ghost */}
          <rect
            x="950"
            y="40"
            width="92"
            height="108"
            fill="transparent"
            role="button"
            tabIndex={0}
            aria-label={MONSTER_CREW[3].ariaLabel}
            onClick={() => handleMonsterTrigger(MONSTER_CREW[3])}
            onKeyDown={(e) => handleMonsterKeyDown(e, MONSTER_CREW[3])}
            className="cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-[#E11D2E]"
          />
        </g>
        </svg>
      </div>
    </div>
  );
}
