import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Layout, Palette, Cpu } from 'lucide-react';

type TabType = 'all' | 'languages' | 'frameworks' | 'design';

interface Skill {
  name: string;
  category: TabType;
  level: number;
}

const skills: Skill[] = [
  { name: 'TypeScript', category: 'languages', level: 95 },
  { name: 'JavaScript (ESNext)', category: 'languages', level: 80 },
  { name: 'Python', category: 'languages', level: 75 },
  { name: 'Rust', category: 'languages', level: 60 },
  { name: 'React / Next.js', category: 'frameworks', level: 90 },
  { name: 'Node.js / Express', category: 'frameworks', level: 85 },
  { name: 'Tailwind CSS', category: 'frameworks', level: 88 },
  { name: 'Framer Motion', category: 'frameworks', level: 82 },
  { name: 'Figma', category: 'design', level: 85 },
  { name: 'Adobe Creative Suite', category: 'design', level: 78 },
  { name: 'Blender', category: 'design', level: 65 },
  { name: 'After Effects', category: 'design', level: 70 },
];

export default function TechInventory() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'all', label: 'ALL', icon: Cpu },
    { id: 'languages', label: 'LANGUAGES', icon: Code2 },
    { id: 'frameworks', label: 'FRAMEWORKS', icon: Layout },
    { id: 'design', label: 'DESIGN & CREATIVE', icon: Palette },
  ];

  return (
    <div className="w-full bg-zinc-950 border border-white/10 rounded-none p-6 md:p-8">
      {/* Section Header */}
      <div className="mb-6">
        <div className="font-mono text-[10px] tracking-[0.25em] text-teal-400 font-semibold uppercase mb-2">
          // TECH_INVENTORY
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
          Capabilities &amp; Toolkit Focus
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-none font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-teal-400/10 border border-teal-400/30 text-teal-400'
                  : 'bg-zinc-900 border border-white/10 text-white/40 hover:text-white hover:border-white/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={`${skill.name}-${activeTab}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-zinc-900 border border-white/5 rounded-none p-4 hover:border-teal-400/20 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <span className="font-mono text-sm text-white">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">
                    MASTERY_LEVEL
                  </span>
                  <span className="font-mono text-lg text-teal-400">
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-zinc-800 rounded-none overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-400 to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-6 text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <span className="text-teal-400">TOTAL_SKILLS:</span>
          <span className="text-white">{skills.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-teal-400">AVG_MASTERY:</span>
          <span className="text-white">
            {Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-teal-400">CATEGORIES:</span>
          <span className="text-white">4</span>
        </div>
      </div>
    </div>
  );
}
