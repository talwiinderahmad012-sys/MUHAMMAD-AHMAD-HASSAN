import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Code2, Sparkles, Tv } from 'lucide-react';
import portraitImg from '../assets/images/ahmad-portrait.jpg';

interface HeroProps {
  onInitiateProject?: () => void;
}

export default function Hero({ onInitiateProject }: HeroProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // 3D Parallax Tilt calculation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative mouse position from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    // Max tilt angles
    const maxTiltX = 15; // degrees
    const maxTiltY = -15; // degrees
    
    setTilt({
      x: relativeY * maxTiltX,
      y: relativeX * maxTiltY
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-12 px-6 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Text & Pitch */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Tagline pills (Sharp & boxy) */}
          <div className="flex flex-wrap gap-2.5">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent font-mono text-[10px] uppercase tracking-wider rounded-none">
              <Code2 className="w-3 h-3" />
              Full-Stack Dev
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-accent/10 border border-amber-accent/30 text-amber-accent font-mono text-[10px] uppercase tracking-wider rounded-none">
              <Sparkles className="w-3 h-3" />
              UI/UX Design
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-white/70 font-mono text-[10px] uppercase tracking-wider rounded-none">
              <Tv className="w-3 h-3" />
              Video Edit
            </span>
          </div>
 
          {/* Heading - Bold, high-contrast, tight tracking */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter text-white">
              HEX<br />
              <span className="text-[#5EEAD4]">FRAME</span>
            </h1>
          </div>

          {/* Brief Bio */}
          <p className="text-white/60 max-w-sm text-sm leading-relaxed mb-6 font-sans">
            Multidisciplinary studio bridging the gap between high-performance code, avant-garde design, and cinematic storytelling.
          </p>
 
          {/* Dual CTAs - Sharp rectangular cyber look */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <button
              onClick={() => {
                if (onInitiateProject) {
                  onInitiateProject();
                } else {
                  const el = document.getElementById('timeline-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-[#5EEAD4] text-black px-6 py-3.5 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              INITIATE PROJECT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-white/20 px-6 py-3.5 rounded-none font-bold text-xs uppercase tracking-widest text-white hover:bg-white/[0.05] transition-all flex items-center justify-center cursor-pointer"
            >
              PORTFOLIO .PDF
            </button>
          </div>

          {/* Micro stats footer */}
          <div className="flex gap-8 pt-8 border-t border-white/10 w-full font-mono text-[11px] text-white/30">
            <div>
              <div className="text-white font-mono font-bold text-lg md:text-xl text-glow-cyan">100%</div>
              <div className="mt-0.5">DEV_UPTIME</div>
            </div>
            <div>
              <div className="text-white font-mono font-bold text-lg md:text-xl text-glow-amber">84+</div>
              <div className="mt-0.5">SHIPPED_ASSETS</div>
            </div>
            <div>
              <div className="text-white font-mono font-bold text-lg md:text-xl">4K UHD</div>
              <div className="mt-0.5">REEL_MASTERED</div>
            </div>
          </div>
        </div>

        {/* Right: Immersive Portrait Frame with Dashed spin controls */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          
          {/* Animated Dashed Spinner frame */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            
            {/* Spinning dotted line indicator around portrait */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#5EEAD4]/30 p-2 pointer-events-none"
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            />

            {/* Core Portrait Container (sharp yellow border overlay) */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-[#F5A524] overflow-hidden p-1 bg-white/5 z-10 relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-800">
                <img
                  src={portraitImg}
                  alt="Muhammad Ahmad Hassan - Full Stack Developer Portfolio Portrait"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  className="w-full h-full object-cover select-none scale-105"
                />
              </div>
            </div>

            {/* Top Right System Badge with Glow */}
            <div className="absolute top-0 right-0 bg-[#0B0E14] border border-[#5EEAD4] px-3.5 py-1 text-[10px] font-mono rounded-full translate-x-4 shadow-[0_0_15px_rgba(94,234,212,0.4)] z-20">
              React / TS
            </div>

            {/* Bottom Left System Badge with Glow */}
            <div className="absolute bottom-4 -left-4 bg-[#0B0E14] border border-[#F5A524] px-3.5 py-1 text-[10px] font-mono rounded-full shadow-[0_0_15px_rgba(245,165,36,0.4)] z-20">
              Motion 4K
            </div>

            {/* Custom User ID Metadata */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/30 tracking-[0.25em] z-20 uppercase whitespace-nowrap">
              STUDIO // HEXFRAME
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
