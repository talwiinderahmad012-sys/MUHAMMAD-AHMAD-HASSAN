import { useReducedMotion, motion } from 'motion/react';
import { SERVICES } from '../data';
import { ArrowRight } from 'lucide-react';

export default function ServicesList() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services-section" className="relative py-20 px-6 border-b border-white/5 z-10 bg-[#0B0E14]/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-3">
            <div className="font-mono text-[10px] tracking-[0.25em] text-amber-accent font-semibold uppercase">
              // SERVICE_CATALOGUE
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
              Production Capabilities
            </h2>
          </div>
          <p className="text-white/50 text-sm max-w-sm text-left leading-relaxed font-sans font-light">
            Providing modular integrations across development, brand identity systems, and cinematic digital motion.
          </p>
        </div>

        {/* Services List Stack */}
        <div className="flex flex-col border-t border-white/10">
          {SERVICES.map((srv, idx) => {
            return (
              <div
                key={srv.num}
                className="group border-b border-white/10 py-8 md:py-12 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 text-left relative transition-all duration-300 hover:bg-white/[0.015] px-4 -mx-4 rounded-none"
              >
                {/* 1. Number and Title */}
                <div className="lg:col-span-5 flex items-start gap-6 md:gap-8">
                  {/* Service Number */}
                  <span className="font-mono text-xl md:text-2xl text-white/20 group-hover:text-cyan-accent transition-colors">
                    {srv.num}
                  </span>
                  
                  {/* Service Title */}
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-white tracking-tight group-hover:text-glow-cyan transition-all">
                      {srv.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {srv.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 rounded-none text-[9px] font-mono bg-white/5 border border-white/5 text-white/40 group-hover:border-white/10 group-hover:text-white/60 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Service Description */}
                <div className="lg:col-span-6 flex items-center pr-4">
                  <p className="text-white/50 text-sm md:text-base leading-relaxed font-sans font-light">
                    {srv.description}
                  </p>
                </div>

                {/* 3. Numbered Arrow Reveal */}
                <div className="lg:col-span-1 flex items-center justify-start lg:justify-end">
                  <div className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center text-white/30 group-hover:text-amber-accent group-hover:border-amber-accent group-hover:shadow-lg group-hover:shadow-amber-accent/10 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
