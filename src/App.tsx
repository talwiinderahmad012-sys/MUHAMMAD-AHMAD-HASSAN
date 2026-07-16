import { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { TrackType, TimelineClip } from './types';
import { TIMELINE_CLIPS } from './data';

// Import components
import AmbientBackground from './components/AmbientBackground';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ProgramMonitor from './components/ProgramMonitor';
import Timeline from './components/Timeline';
import SkillsGrid from './components/SkillsGrid';
import ServicesList from './components/ServicesList';
import Contact from './components/Contact';
import ConnectModal from './components/ConnectModal';
import SaasMetricsCard from './components/SaasMetricsCard';
import BrandingPaletteTool from './components/BrandingPaletteTool';
import InteractiveLutGrader from './components/InteractiveLutGrader';
import TechInventory from './components/TechInventory';

// Icons
import { Terminal, Settings, Sliders, ExternalLink, Menu, X, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'timeline' | 'lab' | 'journal' | 'services'>('home');
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedClipId, setSelectedClipId] = useState<string | null>('dev-1');
  const [focusedTrack, setFocusedTrack] = useState<TrackType>('DEV');
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top on page switch with smooth behavior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  }, [currentPage, shouldReduceMotion]);

  // 1. Butter-smooth requestAnimationFrame playback loop based on exact delta time
  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000; // delta in seconds
      lastTime = now;

      setCurrentTime((prev) => {
        const nextTime = prev + delta;
        return nextTime >= 10 ? 0 : nextTime; // loop timeline at 10.0s
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  // 2. Automatically derive the active clip under the playhead
  // We prioritize the currently focused track.
  // If no clip is active on that track, we check other tracks to keep the screen alive.
  const getActiveClipAtTime = (): TimelineClip | null => {
    // Check focused track first
    const primaryActive = TIMELINE_CLIPS.find(
      (c) => c.track === focusedTrack && currentTime >= c.start && currentTime <= (c.start + c.duration)
    );
    if (primaryActive) return primaryActive;

    // Check fallback tracks
    const secondaryActive = TIMELINE_CLIPS.find(
      (c) => currentTime >= c.start && currentTime <= (c.start + c.duration)
    );
    return secondaryActive || null;
  };

  const activeClip = getActiveClipAtTime();

  // Sync selectedClipId when activeClip changes
  useEffect(() => {
    if (activeClip) {
      setSelectedClipId(activeClip.id);
    }
  }, [activeClip]);

  const handleSelectClip = (clip: TimelineClip) => {
    setSelectedClipId(clip.id);
    setCurrentTime(clip.start);
    setFocusedTrack(clip.track);
  };

  return (
    <div className="relative min-h-screen text-slate-200 font-sans antialiased bg-[#0B0E14] selection:bg-cyan-accent selection:text-[#0B0E14] overflow-x-hidden">
      {/* 1. Fixed Interactive Background Elements */}
      <AmbientBackground />

      {/* 2. Sleek UI Navigation Header */}
      <header className="fixed top-0 inset-x-0 h-16 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/10 z-50 px-6 flex items-center justify-between">
        {/* Brand Logo with dynamic glowing accent */}
        <div 
          onClick={() => setCurrentPage('home')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setCurrentPage('home'); }}
          aria-label="Hexframe Studio Home"
          className="flex items-center gap-2.5 font-sans text-sm uppercase font-bold text-white cursor-pointer select-none"
        >
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 select-none animate-spin-slow origin-center" style={{ transformOrigin: 'center' }}>
            <polygon 
              points="50,16 79.44,33 79.44,67 50,84 20.56,67 20.56,33" 
              stroke="#5EEAD4" 
              strokeWidth="4.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="tracking-[0.12em] font-bold font-display text-sm">
            <span className="text-[#5EEAD4]">HEX</span><span className="text-[#8FA3AE] font-medium">FRAME</span>
          </span>
        </div>

        {/* Navigation anchors */}
        <nav className="hidden md:flex gap-8 text-[11px] font-mono uppercase tracking-[0.2em]" role="navigation" aria-label="Main navigation">
          <button
            onClick={() => setCurrentPage('home')}
            aria-current={currentPage === 'home' ? 'page' : undefined}
            className={`cursor-pointer transition-all relative group ${currentPage === 'home' ? 'text-[#5EEAD4] font-bold' : 'text-white/50 hover:text-white'}`}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#5EEAD4]" />
            )}
          </button>
          <button
            onClick={() => setCurrentPage('timeline')}
            aria-current={currentPage === 'timeline' ? 'page' : undefined}
            className={`cursor-pointer hover:text-cyan-accent transition-all relative ${currentPage === 'timeline' ? 'text-cyan-accent font-bold' : 'text-white/50'}`}
          >
            01 / Timeline
            {currentPage === 'timeline' && (
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-cyan-accent" />
            )}
          </button>
          <button
            onClick={() => setCurrentPage('lab')}
            aria-current={currentPage === 'lab' ? 'page' : undefined}
            className={`cursor-pointer hover:text-cyan-accent transition-all relative ${currentPage === 'lab' ? 'text-cyan-accent font-bold' : 'text-white/50'}`}
          >
            02 / Lab
            {currentPage === 'lab' && (
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-cyan-accent" />
            )}
          </button>
          <button
            onClick={() => setCurrentPage('journal')}
            aria-current={currentPage === 'journal' ? 'page' : undefined}
            className={`cursor-pointer hover:text-cyan-accent transition-all relative ${currentPage === 'journal' ? 'text-cyan-accent font-bold' : 'text-white/50'}`}
          >
            03 / Journal
            {currentPage === 'journal' && (
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-cyan-accent" />
            )}
          </button>
          <button
            onClick={() => setCurrentPage('services')}
            aria-current={currentPage === 'services' ? 'page' : undefined}
            className={`cursor-pointer hover:text-cyan-accent transition-all relative ${currentPage === 'services' ? 'text-cyan-accent font-bold' : 'text-white/50'}`}
          >
            04 / Services
            {currentPage === 'services' && (
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-cyan-accent" />
            )}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Action Coord buttons - hidden on mobile */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => setIsConnectOpen(true)}
            className="border border-[#F5A524]/40 hover:border-[#F5A524] px-5 py-2 rounded-none font-bold text-[10px] uppercase tracking-widest text-white hover:bg-white/[0.03] transition-all cursor-pointer"
          >
            CONNECT
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 inset-x-0 bg-[#0B0E14]/95 backdrop-blur-md border-b border-white/10 z-40 overflow-hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }}
                aria-current={currentPage === 'home' ? 'page' : undefined}
                className={`block w-full text-left py-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all ${currentPage === 'home' ? 'text-[#5EEAD4] font-bold' : 'text-white/50 hover:text-white'}`}
              >
                Home
              </button>
              <button
                onClick={() => { setCurrentPage('timeline'); setIsMobileMenuOpen(false); }}
                aria-current={currentPage === 'timeline' ? 'page' : undefined}
                className={`block w-full text-left py-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all ${currentPage === 'timeline' ? 'text-cyan-accent font-bold' : 'text-white/50 hover:text-white'}`}
              >
                01 / Timeline
              </button>
              <button
                onClick={() => { setCurrentPage('lab'); setIsMobileMenuOpen(false); }}
                aria-current={currentPage === 'lab' ? 'page' : undefined}
                className={`block w-full text-left py-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all ${currentPage === 'lab' ? 'text-cyan-accent font-bold' : 'text-white/50 hover:text-white'}`}
              >
                02 / Lab
              </button>
              <button
                onClick={() => { setCurrentPage('journal'); setIsMobileMenuOpen(false); }}
                aria-current={currentPage === 'journal' ? 'page' : undefined}
                className={`block w-full text-left py-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all ${currentPage === 'journal' ? 'text-cyan-accent font-bold' : 'text-white/50 hover:text-white'}`}
              >
                03 / Journal
              </button>
              <button
                onClick={() => { setCurrentPage('services'); setIsMobileMenuOpen(false); }}
                aria-current={currentPage === 'services' ? 'page' : undefined}
                className={`block w-full text-left py-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all ${currentPage === 'services' ? 'text-cyan-accent font-bold' : 'text-white/50 hover:text-white'}`}
              >
                04 / Services
              </button>
              <div className="pt-4 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => { setIsConnectOpen(true); setIsMobileMenuOpen(false); }}
                  aria-label="Open connect modal"
                  className="flex-1 border border-[#F5A524]/40 hover:border-[#F5A524] px-4 py-2 rounded-none font-bold text-[10px] uppercase tracking-widest text-white hover:bg-white/[0.03] transition-all cursor-pointer"
                >
                  CONNECT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Application Content Layout — Multi-Page Router */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">

          {/* ── HOME PAGE ─────────────────────────────────────────────── */}
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <Hero />
              <Marquee />

              {/* Quick-look strip — calls to each page */}
              <section className="relative py-16 px-6 border-b border-white/5 z-10">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-accent font-semibold uppercase mb-4">// STUDIO_INDEX</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { key: 'timeline', label: '01 / Timeline', sub: 'Interactive multi-track studio editor', color: 'border-cyan-accent/30 hover:border-cyan-accent', accent: 'text-cyan-accent' },
                      { key: 'lab',      label: '02 / Lab',      sub: 'Craft mockups & interactive prototypes', color: 'border-amber-accent/30 hover:border-amber-accent', accent: 'text-amber-accent' },
                      { key: 'journal',  label: '03 / Journal',  sub: 'Full toolkit & capability inventory',  color: 'border-cyan-accent/30 hover:border-cyan-accent', accent: 'text-cyan-accent' },
                      { key: 'services', label: '04 / Services', sub: 'Production capabilities & pricing',    color: 'border-white/20 hover:border-white/60', accent: 'text-white' },
                    ].map(p => (
                      <button
                        key={p.key}
                        onClick={() => setCurrentPage(p.key as any)}
                        className={`group text-left p-5 bg-white/[0.02] backdrop-blur-md border ${p.color} transition-all duration-300 hover:bg-white/[0.05] cursor-pointer`}
                      >
                        <div className={`font-mono text-xs font-bold tracking-widest mb-2 ${p.accent}`}>{p.label}</div>
                        <div className="text-white/40 text-xs font-sans leading-relaxed">{p.sub}</div>
                        <div className="mt-4 flex items-center gap-1 text-white/20 group-hover:text-white/60 transition-colors text-[10px] font-mono">
                          OPEN <span className="ml-1">→</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <Contact />
            </motion.div>
          )}

          {/* ── 01 / TIMELINE PAGE ────────────────────────────────────── */}
          {currentPage === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Page Hero */}
              <section className="relative pt-28 pb-12 px-6 border-b border-white/5 bg-[#0B0E14]/30 z-10">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-accent font-semibold uppercase mb-3">// 01_STUDIO_WORKSPACE</div>
                  <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight mb-4">
                    Discipline <span className="text-cyan-accent">Synchronization</span> Engine
                  </h1>
                  <p className="text-white/50 text-sm max-w-xl font-light font-sans">
                    Click and drag the time ruler to scrub, or hit play to let the core playhead run across disciplines. The Program Monitor reflects the active operational clips in real-time.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-8 border border-white/10 rounded-none p-3.5 bg-white/[0.02] font-mono text-[10px] text-white/50 w-fit">
                    <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-none bg-cyan-accent" /><span>DEV: ACTIVE</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-none bg-[#F5A524]" /><span>DESIGN: READY</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-none bg-white" /><span>VIDEO: MOUNTED</span></div>
                  </div>
                </div>
              </section>

              {/* Monitor + Timeline */}
              <section className="relative py-12 px-6 z-10">
                <div className="max-w-7xl mx-auto w-full space-y-6">
                  <ProgramMonitor
                    activeClip={activeClip}
                    currentTime={currentTime}
                    isPlaying={isPlaying}
                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                  />
                  <Timeline
                    currentTime={currentTime}
                    onTimeChange={(t) => setCurrentTime(t)}
                    selectedClipId={selectedClipId}
                    onSelectClip={handleSelectClip}
                    focusedTrack={focusedTrack}
                    onSelectTrack={(tr) => setFocusedTrack(tr)}
                  />
                </div>
              </section>

              <Marquee />
            </motion.div>
          )}

          {/* ── 02 / LAB PAGE ─────────────────────────────────────────── */}
          {currentPage === 'lab' && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Page Hero */}
              <section className="relative pt-28 pb-12 px-6 border-b border-white/5 z-10">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-amber-accent font-semibold uppercase mb-3">// 02_CRAFT_LAB</div>
                  <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight mb-4">
                    Interactive <span className="text-amber-accent">Prototypes</span> &amp; Production Masters
                  </h1>
                  <p className="text-white/50 text-sm max-w-xl font-light font-sans">
                    Hover over each deck to engage micro-animations &amp; interaction loops. Three disciplines, three live mockups.
                  </p>
                </div>
              </section>

              {/* Lab Dashboard Components */}
              <section className="relative py-12 px-6 z-10">
                <div className="max-w-3xl mx-auto w-full space-y-8">
                  <SaasMetricsCard />
                  <BrandingPaletteTool />
                  <InteractiveLutGrader />
                  <TechInventory />
                </div>
              </section>

              <Marquee />
            </motion.div>
          )}

          {/* ── 03 / JOURNAL PAGE ─────────────────────────────────────── */}
          {currentPage === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Page Hero */}
              <section className="relative pt-28 pb-12 px-6 border-b border-white/5 z-10">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-accent font-semibold uppercase mb-3">// 03_TECH_INVENTORY</div>
                  <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight mb-4">
                    Capabilities &amp; <span className="text-cyan-accent">Toolkit</span> Focus
                  </h1>
                  <p className="text-white/50 text-sm max-w-xl font-light font-sans">
                    Rigorous full-stack software development paired with vector geometry math and 60fps frame-sequence timeline logic.
                  </p>
                </div>
              </section>

              <SkillsGrid />
              <Marquee />
            </motion.div>
          )}

          {/* ── 04 / SERVICES PAGE ────────────────────────────────────── */}
          {currentPage === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Page Hero */}
              <section className="relative pt-28 pb-12 px-6 border-b border-white/5 z-10">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-amber-accent font-semibold uppercase mb-3">// 04_SERVICE_CATALOGUE</div>
                  <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight mb-4">
                    Production <span className="text-amber-accent">Capabilities</span>
                  </h1>
                  <p className="text-white/50 text-sm max-w-xl font-light font-sans">
                    Providing modular integrations across development, brand identity systems, and cinematic digital motion.
                  </p>
                </div>
              </section>

              <ServicesList />
              <Contact />
              <Marquee />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 5. Clean Tech Footer with Systems Ticker */}
      <footer className="relative bg-[#07090D] border-t border-white/10 z-10 text-left">
        {/* Systems Check Ticker Strip */}
        <div className="h-12 border-b border-white/10 flex items-center overflow-hidden bg-white/[0.02]">
          <div className="flex whitespace-nowrap gap-12 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 animate-marquee-slow py-1">
            <span className="flex items-center gap-2">Systems Check: Nominal <span className="w-1.5 h-1.5 bg-cyan-accent" /></span>
            <span className="flex items-center gap-2">Available for Q3 Projects <span className="w-1.5 h-1.5 bg-amber-accent" /></span>
            <span className="flex items-center gap-2">User_ID: 0x892A <span className="w-1.5 h-1.5 bg-white/40" /></span>
            <span className="flex items-center gap-2">Deployment: Global <span className="w-1.5 h-1.5 bg-cyan-accent" /></span>
            <span className="flex items-center gap-2">Systems Check: Nominal <span className="w-1.5 h-1.5 bg-cyan-accent" /></span>
            <span className="flex items-center gap-2">Available for Q3 Projects <span className="w-1.5 h-1.5 bg-amber-accent" /></span>
            <span className="flex items-center gap-2">User_ID: 0x892A <span className="w-1.5 h-1.5 bg-white/40" /></span>
            <span className="flex items-center gap-2">Deployment: Global <span className="w-1.5 h-1.5 bg-cyan-accent" /></span>
          </div>
        </div>

        {/* Tech Footer Coordinates */}
        <div className="max-w-7xl mx-auto w-full py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px] text-white/30">
          <div className="flex flex-col gap-1">
            <span className="text-white/60 font-semibold tracking-wider uppercase">HEXFRAME_STUDIO // PORTFOLIO</span>
            <span>&copy; {new Date().getFullYear()} ALL OPERATIONS DEPLOYED. SECURED VIA AES-GCM.</span>
          </div>


        </div>
      </footer>


      {/* 7. Connect Modal overlay */}
      <AnimatePresence>
        {isConnectOpen && (
          <ConnectModal
            isOpen={isConnectOpen}
            onClose={() => setIsConnectOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
