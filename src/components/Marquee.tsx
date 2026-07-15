import { motion, useReducedMotion } from 'motion/react';

const ITEMS = [
  'FULL-STACK REACT',
  'CREATIVE CODE',
  'FIGMA UI SYSTEMS',
  'DA VINCI RESOLVE',
  'CINEMATIC POST',
  'NODE GATEWAYS',
  'VECTOR DESIGN',
  'AUDIO MASTERING',
  'MOTION PHYSICS',
  'BRAND SYSTEMS',
  'UX ALGEBRA',
  '60FPS MOTION',
];

export default function Marquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-4 bg-[#0B0E14]/80 border-y border-white/5 overflow-hidden z-10">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0E14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0E14] to-transparent z-10 pointer-events-none" />
      
      <div className="flex whitespace-nowrap min-w-full">
        <motion.div
          id="marquee-strip-1"
          className="flex gap-16 text-xs font-mono tracking-[0.25em] text-white/40 items-center pr-16"
          animate={shouldReduceMotion ? {} : { x: [0, '-100%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 35,
          }}
        >
          {/* Double content to ensure seamless loop */}
          {ITEMS.map((item, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-accent" />
            </div>
          ))}
          {/* Repeat */}
          {ITEMS.map((item, idx) => (
            <div key={`m1-dup-${idx}`} className="flex items-center gap-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-accent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
