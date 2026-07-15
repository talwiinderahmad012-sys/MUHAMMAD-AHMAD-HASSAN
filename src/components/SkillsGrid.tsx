import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SKILLS } from '../data';
import { Skill } from '../types';
import { 
  Code2, FileCode, Server, Laptop, 
  Layers, Palette, Cpu, Database, 
  LayoutGrid, PenTool, Sparkles, Cuboid, 
  Tv, Film, Video, Volume2 
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Code2, FileCode, Server, Laptop,
  Layers, Palette, Cpu, Database,
  LayoutGrid, PenTool, Sparkles, Cuboid,
  Tv, Film, Video, Volume2
};

const CATEGORIES = ['All', 'Languages', 'Frameworks', 'Design & Creative', 'Video & Post'] as const;

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredSkills = activeCategory === 'All' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  return (
    <section id="skills-section" className="relative py-20 px-6 border-b border-white/5 bg-[#0B0E14]/50 z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="text-left space-y-3 mb-12">
          <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-accent font-semibold uppercase">
            // TECH_INVENTORY
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
            Capabilities & Toolkit Focus
          </h2>
          <p className="text-white/50 text-sm max-w-xl font-light font-sans">
            Rigorous full-stack software development paired with vector geometry math and 60fps frame-sequence timeline logic.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/5 justify-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-none font-mono text-[11px] tracking-wider transition-all relative cursor-pointer ${
                activeCategory === cat 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-none -z-10"
                  transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                />
              )}
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid of Skills */}
        <motion.div 
          layout={!shouldReduceMotion}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComp = ICON_MAP[skill.iconName] || Code2;
              
              // Decide colors based on category
              let colorTheme = {
                text: 'text-cyan-accent',
                bg: 'bg-cyan-accent/5',
                border: 'group-hover:border-cyan-accent/30',
                progress: 'bg-cyan-accent'
              };

              if (skill.category === 'Design & Creative') {
                colorTheme = {
                  text: 'text-amber-accent',
                  bg: 'bg-amber-accent/5',
                  border: 'group-hover:border-amber-accent/30',
                  progress: 'bg-amber-accent'
                };
              } else if (skill.category === 'Video & Post') {
                colorTheme = {
                  text: 'text-white',
                  bg: 'bg-white/5',
                  border: 'group-hover:border-white/30',
                  progress: 'bg-gradient-to-r from-cyan-accent to-amber-accent'
                };
              }

              return (
                <motion.div
                  key={skill.name}
                  layout={!shouldReduceMotion}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`group p-5 rounded-none bg-[#0E1117]/30 backdrop-blur-md border border-white/10 flex flex-col justify-between h-36 relative overflow-hidden transition-all duration-300 ${colorTheme.border} hover:bg-[#11151D]/50`}>
                  {/* Category Accent Top Border Line on Hover */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] transition-transform duration-300 scale-x-0 group-hover:scale-x-100 ${colorTheme.progress}`} />

                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest leading-none">
                        {skill.category}
                      </div>
                      <h3 className="font-display font-bold text-base text-white tracking-tight group-hover:text-white transition-colors">
                        {skill.name}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-none flex items-center justify-center ${colorTheme.bg}`}>
                      <IconComp className={`w-4 h-4 ${colorTheme.text}`} />
                    </div>
                  </div>

                  {/* Level gauge */}
                  <div className="space-y-1.5 mt-4">
                    <div className="flex justify-between font-mono text-[9px] text-white/40">
                      <span>MASTERY_LEVEL</span>
                      <span className="font-bold text-white group-hover:text-white transition-colors">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full h-1 bg-white/5 rounded-none overflow-hidden">
                      <motion.div 
                        className={`h-full ${colorTheme.progress}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
