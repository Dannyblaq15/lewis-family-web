import React, { useState, useEffect } from 'react';
import { ScreenId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  onNavigate: (screen: ScreenId, transition: 'push' | 'push_back' | 'slide_up') => void;
}

const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: '/family_couch_yellow.jpg',
    title: 'THE LEWIS FAMILY',
    recordNum: '#001',
    year: 'Circ. 2026',
    caption: 'A bright, joyful gathering of the complete family sharing a warm moment on the living couch.',
    bgTone: 'bg-[#f5efe2]',
    fitMode: 'object-cover'
  },
  {
    id: 'slide-2',
    image: '/sarah_glamour.png',
    recordNum: '#002',
    bgTone: 'bg-[#eae7dc]',
    fitMode: 'object-contain bg-stone-950 object-center'
  },
  {
    id: 'slide-3',
    image: '/family_standing.jpg',
    recordNum: '#003',
    bgTone: 'bg-[#fee2e2]',
    fitMode: 'object-cover'
  },
  {
    id: 'slide-4',
    image: '/family_couch_curtain_7.jpg',
    recordNum: '#004',
    bgTone: 'bg-[#fef9c3]',
    fitMode: 'object-cover'
  },
  {
    id: 'slide-5',
    image: '/family_couch_curtain_6.jpg',
    recordNum: '#005',
    bgTone: 'bg-[#cfe9d4]',
    fitMode: 'object-cover'
  }
];

export default function HomeView({ onNavigate }: HomeViewProps) {
  // States for interactive family picture slideshow in the hero
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  // Get first 1 featured items from GALLERY_ITEMS (removed two card frames)
  const featuredStories = GALLERY_ITEMS.slice(0, 1);

  return (
    <div className="space-y-12">
      {/* Hero Welcome banner - Background is the running photo slide projector */}
      <section className="relative overflow-hidden bg-black border-3 border-black p-4 sm:p-6 md:p-10 brutal-shadow rounded-lg text-white">

        {/* Animated Slide Background — no dark overlay, full warm photo backdrop */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={HERO_SLIDES[currentSlide].image}
                alt=""
                className={`w-full h-full ${HERO_SLIDES[currentSlide].fitMode || 'object-cover'}`}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 relative z-10">
          {/* Left Column: Descriptive Welcome block */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-black border border-black font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                  {HERO_SLIDES[currentSlide].recordNum}
                </span>
                <span className="text-[10px] font-mono text-stone-300 font-extrabold uppercase tracking-wide">
                  {HERO_SLIDES[currentSlide].year}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                {HERO_SLIDES[currentSlide].title}
              </h1>

              <p className="font-serif italic text-stone-100 text-xs sm:text-sm max-w-md leading-relaxed bg-black/45 p-3.5 border-l-3 border-amber-400 backdrop-blur-xs rounded-r-xs">
                {HERO_SLIDES[currentSlide].caption}
              </p>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3 pt-1">
              {/* Critical xpath element: //button[contains(., 'EXPLORE_FAMILY_TREE')] */}
              <button
                onClick={() => onNavigate('HOME_WITH_TREE', 'push')}
                className="group relative px-6 py-2.5 bg-orange-500 text-white font-mono text-xs sm:text-sm font-bold border-2 border-black brutal-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-1.5 font-bold">
                  EXPLORE FAMILY TREE
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean & Elegant Photo Glide Container */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-4 select-none">

            <div className="w-full max-w-[280px] bg-white border-2 border-black p-2.5 rounded-sm brutal-shadow relative text-black mt-6 lg:mt-10">
              {/* Actual photo view frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-black rounded-xs bg-stone-100 group">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentSlide}
                    src={HERO_SLIDES[currentSlide].image}
                    alt={HERO_SLIDES[currentSlide].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`w-full h-full ${HERO_SLIDES[currentSlide].fitMode || 'object-cover'}`}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Left navigation arrow overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-stone-100 text-black border-2 border-black p-1 rounded-sm shadow-xs transition-transform hover:scale-105 duration-100 cursor-pointer z-10"
                  title="Previous Photo"
                >
                  <ChevronLeft size={14} className="stroke-[3]" />
                </button>

                {/* Right navigation arrow overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-stone-100 text-black border-2 border-black p-1 rounded-sm shadow-xs transition-transform hover:scale-105 duration-100 cursor-pointer z-10"
                  title="Next Photo"
                >
                  <ChevronRight size={14} className="stroke-[3]" />
                </button>

              </div>

              {/* Minimalist Controls and Slide Pagination */}
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => setIsAutoplay(!isAutoplay)}
                  className={`text-[8px] font-mono px-2 py-0.5 border border-black rounded-xs font-black transition-colors cursor-pointer ${isAutoplay
                    ? 'bg-orange-500 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                    }`}
                >
                  {isAutoplay ? '● AUTOPLAYING' : '⚡ PAUSED'}
                </button>

                {/* Dot selectors mapping slides */}
                <div className="flex gap-1">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-1.5 h-1.5 rounded-full border border-black transition-colors cursor-pointer ${currentSlide === idx ? 'bg-[#d95d39]' : 'bg-stone-200 hover:bg-stone-400'
                        }`}
                      title={`Go to photo ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="text-[10px] font-mono text-stone-500 font-bold">
                  {currentSlide + 1}/{HERO_SLIDES.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scrapbook Stories Row */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-3 border-black pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase mt-1">Featured Memory Cards</h2>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <div className="w-full max-w-sm">
            {featuredStories.map((story, idx) => {
              // Each card gets a unique tilt + accent color for handcrafted feel
              const tilts = ['rotate-[-1.5deg]', 'rotate-[0.8deg]', 'rotate-[-0.6deg]'];
              const tapeColors = [
                'bg-amber-300/75',
                'bg-sky-300/75',
                'bg-rose-300/75',
              ];
              const cornerColors = [
                ['#f97316', '#fed7aa'],   // orange tones
                ['#0ea5e9', '#bae6fd'],   // sky tones
                ['#e11d48', '#fecdd3'],   // rose tones
              ];
              const [accentDark, accentLight] = cornerColors[idx % cornerColors.length];
              const tilt = tilts[idx % tilts.length];
              const tape = tapeColors[idx % tapeColors.length];

              return (
                /* Explicit class name match constraint: //div[contains(@class, 'story-card')] */
                <div
                  key={story.id}
                  className={`story-card group relative flex flex-col ${tilt} hover:rotate-0 transition-transform duration-300`}
                >
                  {/* Washi tape strip at top */}
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-7 ${tape} border border-black/20 rounded-sm z-20 shadow-sm`}
                    style={{ clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)' }}
                  />

                  {/* Main polaroid frame */}
                  <div className="relative bg-white border-2 border-black brutal-shadow-lg rounded-sm overflow-visible">

                    {/* Decorative corner triangles */}
                    <svg className="absolute -top-2 -left-2 z-10" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <polygon points="0,0 22,0 0,22" fill={accentDark} stroke="black" strokeWidth="1.5" />
                    </svg>
                    <svg className="absolute -top-2 -right-2 z-10" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <polygon points="22,0 0,0 22,22" fill={accentLight} stroke="black" strokeWidth="1.5" />
                    </svg>
                    <svg className="absolute -bottom-2 -left-2 z-10" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <polygon points="0,22 22,22 0,0" fill={accentLight} stroke="black" strokeWidth="1.5" />
                    </svg>
                    <svg className="absolute -bottom-2 -right-2 z-10" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <polygon points="22,22 0,22 22,0" fill={accentDark} stroke="black" strokeWidth="1.5" />
                    </svg>

                    {/* Photo area with thick white polaroid margin */}
                    <div className="p-3 pb-2">
                      <div 
                        className="relative w-full overflow-hidden border border-black/30" 
                        style={{ aspectRatio: story.imageUrl.includes('sarah_victory_gown') ? '3/4' : '4/3' }}
                      >
                        {/* Decorative shape overlay — circle accent */}
                        <div
                          className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-30 z-10 pointer-events-none"
                          style={{ background: accentDark }}
                        />
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{
                            objectPosition: story.imageUrl.includes('sarah_victory_gown') ? 'center 58%' : 'center'
                          }}
                          referrerPolicy="no-referrer"
                        />
                        {/* Film-grain texture strip at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent z-10" />
                      </div>
                    </div>

                    {/* Bottom white polaroid caption strip */}
                    <div className="px-3 pt-1 pb-4 space-y-1">
                      {/* Decorative ruled lines behind title */}
                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-px bg-stone-200" style={{ top: '1.5rem' }} />
                        <h3 className="font-extrabold text-stone-900 text-base leading-snug relative z-10">
                          {story.title}
                        </h3>
                      </div>
                      {/* Small badge accent */}
                      <div
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold border border-black/50 rounded-full"
                        style={{ background: accentLight, color: '#1c1917' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: accentDark }} />
                        MEMORY
                      </div>
                    </div>

                    {/* Decorative bottom edge line */}
                    <div className="absolute bottom-0 left-3 right-3 h-px" style={{ background: accentDark, opacity: 0.4 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BLOB FRAMES ROW ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-3 border-black pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase mt-1">Moments in Shape</h2>
            <p className="text-stone-500 font-mono text-xs mt-1">Organic memory frames — each one-of-a-kind</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
          {[
            {
              seed: 'blob-lewis',
              imageUrl: '/joseph_father.jpg',
              name: 'Lewis J.',
              year: '1986',
              accent: '#f97316',
              light: '#ffedd5',
              // organic blob path A
              blobPath: 'M54,-67C68,-55,74,-35,76,-14C78,7,75,29,63,47C51,66,30,81,7,84C-17,88,-42,80,-59,63C-77,46,-87,20,-84,-7C-82,-33,-66,-59,-46,-72C-26,-86,-0,-87,54,-67Z',
            },
            {
              seed: 'blob-sarah',
              imageUrl: '/sarah_mother.png',
              name: 'Sarah J.',
              year: '1993',
              accent: '#8b5cf6',
              light: '#ede9fe',
              // organic blob path B
              blobPath: 'M48,-60C60,-50,65,-31,68,-11C70,8,69,28,59,44C49,61,30,74,9,77C-13,80,-36,73,-53,58C-70,43,-81,21,-79,-3C-76,-27,-59,-53,-39,-66C-18,-79,9,-79,48,-60Z',
            },
            {
              seed: 'blob-gift',
              imageUrl: '/gift.jpg',
              name: 'Gift O.',
              year: '2002',
              accent: '#10b981',
              light: '#d1fae5',
              // organic blob path C
              blobPath: 'M42,-55C53,-44,59,-27,64,-8C69,11,73,32,64,49C56,66,35,79,13,81C-10,82,-35,72,-52,54C-69,37,-78,12,-74,-13C-70,-38,-52,-63,-31,-74C-9,-84,16,-80,42,-55Z',
            },
            {
              seed: 'blob-racheal',
              imageUrl: '/racheal_lewis.png',
              name: 'Racheal L.',
              year: '2010',
              accent: '#ec4899',
              light: '#fce7f3',
              // organic blob path D
              blobPath: 'M50,-62C62,-52,67,-35,69,-17C70,1,67,20,57,36C48,52,31,65,12,69C-8,73,-30,67,-47,54C-64,40,-75,19,-74,-4C-72,-26,-57,-50,-39,-63C-20,-76,2,-77,50,-62Z',
            },
          ].map((item, idx) => (
            <div key={item.seed} className="flex flex-col items-center gap-3 group">
              {/* Blob SVG clip container */}
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <clipPath id={`blob-clip-${idx}`}>
                      <path
                        d={item.blobPath}
                        transform="translate(100,100)"
                      />
                    </clipPath>
                    {/* Decorative outer ring */}
                    <path
                      id={`blob-outline-${idx}`}
                      d={item.blobPath}
                      transform="translate(100,100)"
                    />
                  </defs>

                  {/* Coloured glow ring behind blob */}
                  <path
                    d={item.blobPath}
                    transform="translate(100,100) scale(1.09)"
                    fill={item.light}
                    stroke={item.accent}
                    strokeWidth="3"
                  />
                  {/* Dashed ornament ring */}
                  <path
                    d={item.blobPath}
                    transform="translate(100,100) scale(1.04)"
                    fill="none"
                    stroke={item.accent}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />

                  {/* Actual photo clipped to blob */}
                  <image
                    href={item.imageUrl || `https://picsum.photos/seed/${item.seed}/400/400`}
                    x="0" y="0" width="200" height="200"
                    clipPath={`url(#blob-clip-${idx})`}
                    preserveAspectRatio="xMidYMid slice"
                    className="group-hover:opacity-90 transition-opacity duration-300"
                  />

                  {/* Solid border on the blob edge */}
                  <path
                    d={item.blobPath}
                    transform="translate(100,100)"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  />

                  {/* Small decorative star/asterisk in corner */}
                  <text
                    x="168" y="32"
                    fontSize="18"
                    fill={item.accent}
                    fontWeight="bold"
                    style={{ fontFamily: 'monospace' }}
                  >✦</text>
                  <text
                    x="18" y="178"
                    fontSize="14"
                    fill={item.accent}
                    fontWeight="bold"
                    style={{ fontFamily: 'monospace' }}
                  >✦</text>
                </svg>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── FAMILY FRAME (wide feature size) ────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-3 border-black pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase mt-1">The Family Portrait</h2>
            <p className="text-stone-500 font-mono text-xs mt-1"></p>
          </div>
        </div>

        {/* Outer ornate frame wrapper */}
        <div className="relative bg-[#fdf8f0] border-3 border-black brutal-shadow-lg p-2 rounded-sm">

          {/* Ornate corner flourishes */}
          {[
            'top-0 left-0',
            'top-0 right-0 rotate-90',
            'bottom-0 right-0 rotate-180',
            'bottom-0 left-0 -rotate-90',
          ].map((pos, i) => (
            <svg
              key={i}
              className={`absolute ${pos} z-20 w-10 h-10`}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 2 L16 2 L2 16 Z" fill="#d97706" stroke="black" strokeWidth="1" />
              <path d="M2 2 L2 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 2 L18 2" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="8" r="2.5" fill="#fbbf24" stroke="black" strokeWidth="1" />
            </svg>
          ))}

          {/* Double inner border */}
          <div className="border-2 border-black/30 p-3 rounded-xs">
            <div className="border border-dashed border-black/20 p-2 rounded-xs">

              {/* Divider line */}
              <div className="relative flex items-center justify-center mb-4">
                <div className="absolute left-0 right-0 h-px bg-black/20" />
              </div>

              {/* Main photo grid — 1 wide + 2 portrait side by side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                {/* Wide feature photo — full family group */}
                <div className="md:col-span-2 relative group overflow-hidden border-2 border-black" style={{ aspectRatio: '16/10' }}>
                  <img
                    src="/portrait_couple1.jpg"
                    alt="Sarah & Joseph Lewis"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Warm vintage overlay */}
                  <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="text-white font-mono text-[10px] font-bold tracking-widest uppercase bg-black/50 px-2 py-0.5">The Lewis Family</span>
                  </div>
                </div>

                {/* Two couple portraits stacked */}
                <div className="flex flex-col gap-3">
                  {[
                    { src: '/portrait_family_group.jpg', alt: 'The Lewis Family', label: 'Sarah & Joseph' },
                    { src: '/portrait_couple2.jpg', alt: 'Sarah & Joseph Lewis', label: 'Together' },
                  ].map((p, i) => (
                    <div key={i} className="relative group overflow-hidden border-2 border-black flex-1" style={{ minHeight: '140px' }}>
                      <img
                        src={p.src}
                        alt={p.alt}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-10 z-10" />
                      <div className="absolute bottom-2 left-2 z-20">
                        <span className="text-white font-mono text-[9px] font-bold tracking-widest uppercase">{p.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom ribbon with decorative dots */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="flex-1 h-px bg-black/15" />
                {['#f97316', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b'].map((c, i) => (
                  <div key={i} className="w-2 h-2 rounded-full border border-black/40" style={{ background: c }} />
                ))}
                <div className="flex-1 h-px bg-black/15" />
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
