import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B0E14]">
      {/* 1. Immersive Theme Corner Glow Orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#5EEAD4]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#F5A524]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Dynamic Cursor Ambient Glow with Spring Physics */}
      {!shouldReduceMotion && isHovering && (
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full blur-[140px] opacity-15 mix-blend-screen pointer-events-none"
          animate={{
            x: mousePos.x - 225,
            y: mousePos.y - 225,
            background: `radial-gradient(circle, rgba(94,234,212,0.4) 0%, rgba(245,165,36,0.3) 50%, rgba(11,14,20,0) 100%)`,
          }}
          transition={{ type: 'spring', damping: 45, stiffness: 200, mass: 0.6 }}
        />
      )}

      {/* 3. Floating Ambient Background Orbs */}
      <motion.div
        id="bg-orb-cyan"
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-accent/5 blur-[120px] top-[10%] left-[-100px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, 50, -30, 0],
                x: [0, 30, -20, 0],
                scale: [1, 1.15, 0.95, 1],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        id="bg-orb-amber"
        className="absolute w-[450px] h-[450px] rounded-full bg-amber-accent/5 blur-[150px] bottom-[15%] right-[-150px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -60, 40, 0],
                x: [0, -40, 30, 0],
                scale: [1, 0.9, 1.1, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 4. Interactive Parallax Grid Dot Overlay (Shifts opposite to mouse for 3D depth) */}
      <motion.div 
        className="absolute inset-[-40px] opacity-[0.035] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#FFFFFF 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
        }}
        animate={shouldReduceMotion ? {} : {
          x: mousePos.x * -0.015,
          y: mousePos.y * -0.015
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
      />

      {/* 5. Center Blueprint / Radar Technical Grid overlay (Elegant slow spin) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] overflow-hidden select-none">
        <svg width="800" height="800" viewBox="0 0 800 800" className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] animate-spin-slow" style={{ animationDuration: '80s', transformOrigin: 'center' }}>
          <circle cx="400" cy="400" r="380" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="4 8" fill="none" />
          <circle cx="400" cy="400" r="280" stroke="#F5A524" strokeWidth="0.8" fill="none" opacity="0.7" />
          <circle cx="400" cy="400" r="180" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="20 4 4 4" fill="none" />
          <circle cx="400" cy="400" r="80" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.3" />
          
          {/* Axis lines */}
          <line x1="400" y1="0" x2="400" y2="800" stroke="#5EEAD4" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.5" />
          <line x1="0" y1="400" x2="800" y2="400" stroke="#5EEAD4" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.5" />
          
          {/* Angled ticks */}
          <line x1="100" y1="100" x2="700" y2="700" stroke="#F5A524" strokeWidth="0.5" strokeDasharray="2 10" opacity="0.3" />
          <line x1="100" y1="700" x2="700" y2="100" stroke="#F5A524" strokeWidth="0.5" strokeDasharray="2 10" opacity="0.3" />
        </svg>
      </div>

      {/* 6. Corner Technical Rotating Dial (Top-Left) */}
      <div className="absolute top-12 left-12 pointer-events-none opacity-[0.035] overflow-hidden select-none hidden lg:block">
        <svg width="200" height="200" viewBox="0 0 200 200" className="animate-spin-slow" style={{ animationDuration: '45s', transformOrigin: 'center' }}>
          <circle cx="100" cy="100" r="90" stroke="#F5A524" strokeWidth="0.8" strokeDasharray="3 6" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="#5EEAD4" strokeWidth="1" fill="none" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.3" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* 7. Floating Tech Vibe Icons (Developer, Designer, Editor) */}
      {!shouldReduceMotion && (
        <>
          {/* Developer Tag </> */}
          <motion.div
            className="absolute text-cyan-accent/5 pointer-events-none select-none"
            style={{ top: '25%', left: '15%' }}
            animate={{
              y: [0, -30, 20, 0],
              x: [0, 20, -15, 0],
              rotate: [0, 15, -10, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
              <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
          </motion.div>

          {/* Developer Curly Braces { } */}
          <motion.div
            className="absolute text-cyan-accent/5 pointer-events-none select-none"
            style={{ bottom: '20%', left: '25%' }}
            animate={{
              y: [0, 40, -20, 0],
              x: [0, -20, 15, 0],
              rotate: [0, -20, 15, 0]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
              <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1" />
            </svg>
          </motion.div>

          {/* Designer Bezier Pen Anchor */}
          <motion.div
            className="absolute text-amber-accent/5 pointer-events-none select-none"
            style={{ top: '15%', right: '25%' }}
            animate={{
              y: [0, -40, 25, 0],
              x: [0, -30, 20, 0],
              rotate: [0, 25, -15, 0]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="m5 5 14 14" strokeDasharray="2 2" />
            </svg>
          </motion.div>

          {/* Designer Grid alignment / Ruler */}
          <motion.div
            className="absolute text-amber-accent/5 pointer-events-none select-none"
            style={{ top: '55%', right: '12%' }}
            animate={{
              y: [0, 30, -20, 0],
              x: [0, 25, -15, 0],
              rotate: [0, -15, 10, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M21 9H3" />
              <path d="M21 15H3" />
              <path d="M12 3v18" strokeDasharray="3 3" />
            </svg>
          </motion.div>

          {/* Editor Film Reel */}
          <motion.div
            className="absolute text-white/5 pointer-events-none select-none"
            style={{ bottom: '35%', left: '8%' }}
            animate={{
              y: [0, -25, 30, 0],
              x: [0, -15, 20, 0],
              rotate: [0, 360]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="7" r="1.5" />
              <circle cx="12" cy="17" r="1.5" />
              <circle cx="7" cy="12" r="1.5" />
              <circle cx="17" cy="12" r="1.5" />
            </svg>
          </motion.div>

          {/* Editor Waveform Sound */}
          <motion.div
            className="absolute text-white/5 pointer-events-none select-none"
            style={{ bottom: '15%', right: '20%' }}
            animate={{
              y: [0, 35, -25, 0],
              x: [0, 15, -20, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          >
            <svg width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 10v4" />
              <path d="M6 6v12" />
              <path d="M9 3v18" />
              <path d="M12 7v10" />
              <path d="M15 5v14" />
              <path d="M18 8v8" />
              <path d="M21 11v2" />
            </svg>
          </motion.div>
        </>
      )}
    </div>
  );
}
