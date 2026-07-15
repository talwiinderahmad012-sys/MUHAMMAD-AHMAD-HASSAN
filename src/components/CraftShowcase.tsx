import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Laptop, Phone, Video, Cpu, Sliders, Palette, Eye, ArrowRight } from 'lucide-react';

export default function CraftShowcase() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [designSlider, setDesignSlider] = useState(50); // slider state for phone mockup
  const [gradingSlider, setGradingSlider] = useState(50); // split grading slider for video mockup
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="craft-section" className="relative py-20 px-6 border-b border-white/5 z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-3">
            <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-accent font-semibold uppercase">
              // CRAFT_SHOWCASE
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
              Interactive Prototypes & Production Masters
            </h2>
          </div>
          <p className="text-white/40 text-xs md:text-sm font-mono max-w-sm text-left md:text-right leading-relaxed">
            HOVER OVER EACH DECK TO ENGAGE MICRO-ANIMATIONS & INTERACTION LOOPS
          </p>
        </div>

        {/* Mockups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Browser Mockup (Web Engineering / DEV) */}
          <motion.div
            id="craft-card-dev"
            className="group relative rounded-none bg-[#0E1117]/30 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 hover:border-cyan-accent/30 box-glow-cyan/0 hover:box-glow-cyan"
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
          >
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0E14]/40 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-none bg-red-500/30 group-hover:bg-red-500/80 transition-colors" />
                <span className="w-2.5 h-2.5 rounded-none bg-yellow-500/30 group-hover:bg-yellow-500/80 transition-colors" />
                <span className="w-2.5 h-2.5 rounded-none bg-green-500/30 group-hover:bg-green-500/80 transition-colors" />
              </div>
              <div className="px-3 py-1 rounded-none bg-[#11151D] border border-white/5 text-[10px] font-mono text-white/30 group-hover:text-cyan-accent/70 transition-colors w-40 truncate">
                localhost:3000/saas-dashboard
              </div>
              <Laptop className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-accent transition-colors" />
            </div>

            {/* Inner App Shell (Interactive Code Output) */}
            <div className="aspect-[4/3] w-full bg-[#07090D] p-5 flex flex-col justify-between relative overflow-hidden">
              {/* Dynamic decorative backdrop line */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Header inside simulated page */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-none bg-cyan-accent/20 flex items-center justify-center">
                    <Cpu className="w-3 h-3 text-cyan-accent" />
                  </div>
                  <span className="font-display font-semibold text-[11px] text-white">APEX_NODE_GATE</span>
                </div>
                <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded-none">
                  SYS_OK
                </span>
              </div>

              {/* Layout Cards */}
              <div className="grid grid-cols-2 gap-3 flex-1 items-center justify-center my-4">
                {/* Simulated Chart block */}
                <div className="p-3 rounded-none bg-white/[0.02] border border-white/5 flex flex-col justify-between h-20 text-left relative overflow-hidden">
                  <span className="text-[9px] text-white/30 font-mono">CACHE_HIT_RATE</span>
                  <div className="flex items-end justify-between mt-1">
                    <span className="font-display font-bold text-lg text-white">99.4%</span>
                    <span className="text-[8px] text-cyan-accent font-mono">+1.2%</span>
                  </div>
                  {/* Miniature wave chart bar */}
                  <div className="h-4 flex items-end gap-[2px] mt-1">
                    {[3, 5, 8, 4, 6, 9, 7, 10, 8, 12].map((val, bIdx) => (
                      <div 
                        key={bIdx} 
                        className="flex-1 bg-cyan-accent/20 rounded-none" 
                        style={{ height: `${(val / 12) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Simulated Network load Block */}
                <div className="p-3 rounded-none bg-white/[0.02] border border-white/5 flex flex-col justify-between h-20 text-left">
                  <span className="text-[9px] text-white/30 font-mono">LATENCY</span>
                  <div className="flex items-end justify-between mt-1">
                    <span className="font-display font-bold text-lg text-amber-accent">14.2ms</span>
                    <span className="text-[8px] text-white/30 font-mono">EDGE_COMP</span>
                  </div>
                  {/* Linear progress metric */}
                  <div className="w-full h-1 bg-white/5 rounded-none overflow-hidden mt-2">
                    <motion.div 
                      className="h-full bg-amber-accent"
                      animate={activeCard === 0 && !shouldReduceMotion ? { width: ['30%', '95%', '60%', '30%'] } : { width: '45%' }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] font-mono text-[8px] text-white/30">
                <span>REPLICAS: x3 SERVERLESS</span>
                <span>SECURE: JWT / TLS1.3</span>
              </div>
            </div>

            {/* Description Footer */}
            <div className="p-5 border-t border-white/5 text-left space-y-2">
              <span className="text-[10px] font-mono text-cyan-accent uppercase tracking-wider font-semibold">
                // WEB ENGINEERING
              </span>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-accent transition-colors">
                Interactive SaaS Architecture
              </h3>
              <p className="text-white/50 text-xs leading-relaxed font-light">
                Tailored web consoles featuring custom metric state hooks, real-time data visualizers, 
                and edge-compressed cloud gateways.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Smartphone Mockup (UI/UX Design / DESIGN) */}
          <motion.div
            id="craft-card-design"
            className="group relative rounded-none bg-[#0E1117]/30 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 hover:border-amber-accent/30 box-glow-amber/0 hover:box-glow-amber"
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
          >
            {/* Top Phone Chrome bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0E14]/40 border-b border-white/10">
              <div className="w-2 h-2 rounded-none bg-white/10" />
              <div className="w-20 h-4 rounded-none bg-[#11151D] border border-white/5 flex items-center justify-center font-mono text-[8px] text-white/30 group-hover:text-amber-accent/70 transition-colors">
                UI WIREFRAME
              </div>
              <Phone className="w-3.5 h-3.5 text-white/20 group-hover:text-amber-accent transition-colors" />
            </div>

            {/* Phone Screen Mockup */}
            <div className="aspect-[4/3] w-full bg-[#151922] p-4 flex items-center justify-center relative overflow-hidden">
              {/* Dynamic Grid scaling based on designSlider */}
              <div 
                className="absolute inset-0 opacity-[0.04] transition-all duration-100" 
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                  backgroundSize: `${8 + (designSlider / 8)}px ${8 + (designSlider / 8)}px`
                }}
              />

              {/* Bounding Box Grid Wireframe with editable nodes (scales dynamically) */}
              <div 
                className="w-full max-w-[190px] p-3 rounded-none bg-[#0E1117]/90 border border-white/10 flex flex-col gap-2.5 relative select-none transition-transform duration-100 ease-out"
                style={{ transform: `scale(${0.85 + (designSlider / 350)})` }}
              >
                {/* Selected Node markers (inset dynamically offsets to show padding boundaries) */}
                <div 
                  className="absolute border border-dashed border-amber-accent/40 rounded-none pointer-events-none transition-all duration-100"
                  style={{ 
                    top: `-${2 + (designSlider / 20)}px`,
                    bottom: `-${2 + (designSlider / 20)}px`,
                    left: `-${2 + (designSlider / 20)}px`,
                    right: `-${2 + (designSlider / 20)}px`
                  }}
                >
                  <span className="absolute -top-1 -left-1 w-2 h-2 bg-amber-accent border border-white" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-accent border border-white" />
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-accent border border-white" />
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-accent border border-white" />
                </div>

                {/* Profile Card Mock */}
                <div className="flex gap-2 items-center border-b border-white/[0.04] pb-2">
                  <div className="w-8 h-8 rounded-none bg-gradient-to-br from-cyan-accent to-amber-accent flex items-center justify-center font-display font-bold text-white text-[10px]">
                    AA
                  </div>
                  <div className="text-left leading-none">
                    <div className="font-display font-semibold text-[10px] text-white">Ambit Arch</div>
                    <span className="text-[7px] font-mono text-white/30">CLIENT_ID: 9811</span>
                  </div>
                </div>

                {/* Grid Swatches (gaps scale with designSlider) */}
                <div className="space-y-1.5 text-left">
                  <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">Brand Palette Config</span>
                  <div 
                    className="flex transition-all duration-100"
                    style={{ gap: `${2 + (designSlider / 12)}px` }}
                  >
                    {['#0B0E14', '#5EEAD4', '#F5A524', '#FFFFFF'].map((color, idx) => (
                      <div 
                        key={idx}
                        className="flex-1 aspect-square rounded-none border border-white/15"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Interactive Slider Input simulating UX test */}
                <div className="text-left space-y-1">
                  <div className="flex justify-between items-center text-[7px] font-mono text-white/30">
                    <span>GRID SCALING (ALGEBRA)</span>
                    <span className="text-amber-accent font-bold">{designSlider}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={designSlider}
                    onChange={(e) => setDesignSlider(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-ew-resize accent-amber-accent"
                  />
                </div>
              </div>
            </div>

            {/* Description Footer */}
            <div className="p-5 border-t border-white/5 text-left space-y-2">
              <span className="text-[10px] font-mono text-amber-accent uppercase tracking-wider font-semibold">
                // GRAPHIC & UI SYSTEMS
              </span>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-accent transition-colors">
                High-Fidelity Branding Systems
              </h3>
              <p className="text-white/50 text-xs leading-relaxed font-light">
                Structuring scalable layouts, clean grids, typography hierarchy formulas, 
                and comprehensive branding libraries built for React codebases.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Video Mockup (Video Production / VIDEO) */}
          <motion.div
            id="craft-card-video"
            className="group relative rounded-none bg-[#0E1117]/30 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/30 box-glow-white/0"
            onMouseEnter={() => setActiveCard(2)}
            onMouseLeave={() => setActiveCard(null)}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
          >
            {/* Top Video bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0E14]/40 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-none bg-red-500 animate-pulse" />
                <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-wider">grading_comp</span>
              </div>
              <div className="px-3 py-1 rounded-none bg-[#11151D] border border-white/5 text-[10px] font-mono text-white/30 group-hover:text-white/70 transition-colors w-24 truncate">
                LUTS_MASTER_V1
              </div>
              <Video className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
            </div>

            {/* Video Canvas Split grading Comparison on hover */}
            <div className="aspect-[4/3] w-full bg-[#05070A] relative flex items-center justify-center overflow-hidden">
              {/* Cinematic Cityscape Background Mock */}
              <div className="absolute inset-0 flex items-center justify-center p-3 select-none">
                {/* Mock image container with colored grading overlays */}
                <div className="w-full h-full rounded-none border border-white/10 relative overflow-hidden bg-[#0A0D14] flex items-center justify-center">
                  
                  {/* Cinematic Cityscape Background Mock SVG */}
                  <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90 select-none">
                    {/* Sky background */}
                    <rect width="400" height="300" fill="#0A0D14" />
                    
                    {/* Stars */}
                    <circle cx="45" cy="50" r="1" fill="#fff" opacity="0.3" />
                    <circle cx="120" cy="30" r="1.5" fill="#fff" opacity="0.5" />
                    <circle cx="230" cy="70" r="1" fill="#fff" opacity="0.2" />
                    <circle cx="310" cy="40" r="1" fill="#fff" opacity="0.4" />
                    <circle cx="370" cy="85" r="1.5" fill="#fff" opacity="0.6" />
                    <circle cx="90" cy="90" r="1" fill="#fff" opacity="0.3" />

                    {/* Retro Sun */}
                    <defs>
                      <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F5A524" />
                        <stop offset="100%" stopColor="#5EEAD4" />
                      </linearGradient>
                    </defs>
                    <circle cx="200" cy="150" r="50" fill="url(#sunGrad)" opacity="0.75" />
                    <rect x="145" y="125" width="110" height="2" fill="#0A0D14" />
                    <rect x="145" y="138" width="110" height="3" fill="#0A0D14" />
                    <rect x="145" y="152" width="110" height="4" fill="#0A0D14" />
                    <rect x="145" y="168" width="110" height="6" fill="#0A0D14" />

                    {/* Distant Mountains */}
                    <polygon points="0,190 70,155 140,190 220,145 300,190 400,160 400,190 0,190" fill="#131924" />

                    {/* Skyscrapers */}
                    {/* Building 1 */}
                    <rect x="25" y="110" width="45" height="80" fill="#182030" stroke="#5EEAD4" strokeWidth="1" strokeOpacity="0.4" />
                    <rect x="33" y="120" width="6" height="6" fill="#5EEAD4" opacity="0.6" />
                    <rect x="53" y="120" width="6" height="6" fill="#5EEAD4" opacity="0.2" />
                    <rect x="33" y="135" width="6" height="6" fill="#5EEAD4" opacity="0.3" />
                    <rect x="53" y="135" width="6" height="6" fill="#5EEAD4" opacity="0.7" />
                    <rect x="33" y="150" width="6" height="6" fill="#5EEAD4" opacity="0.5" />
                    <rect x="53" y="150" width="6" height="6" fill="#5EEAD4" opacity="0.1" />
                    <rect x="33" y="165" width="6" height="6" fill="#5EEAD4" opacity="0.8" />

                    {/* Building 2 */}
                    <rect x="85" y="80" width="55" height="110" fill="#0F1522" stroke="#F5A524" strokeWidth="1" strokeOpacity="0.3" />
                    <line x1="112" y1="80" x2="112" y2="190" stroke="#F5A524" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
                    <rect x="95" y="95" width="8" height="10" fill="#F5A524" opacity="0.5" />
                    <rect x="119" y="95" width="8" height="10" fill="#5EEAD4" opacity="0.6" />
                    <rect x="95" y="115" width="8" height="10" fill="#5EEAD4" opacity="0.4" />
                    <rect x="119" y="115" width="8" height="10" fill="#F5A524" opacity="0.3" />
                    <rect x="95" y="135" width="8" height="10" fill="#F5A524" opacity="0.7" />
                    <rect x="119" y="135" width="8" height="10" fill="#5EEAD4" opacity="0.2" />
                    <rect x="95" y="155" width="8" height="10" fill="#5EEAD4" opacity="0.8" />
                    <rect x="119" y="155" width="8" height="10" fill="#F5A524" opacity="0.6" />

                    {/* Building 3 */}
                    <rect x="235" y="60" width="40" height="130" fill="#151C2C" stroke="#5EEAD4" strokeWidth="1" strokeOpacity="0.3" />
                    <line x1="255" y1="20" x2="255" y2="60" stroke="#5EEAD4" strokeWidth="1.5" />
                    <circle cx="255" cy="20" r="2.5" fill="#5EEAD4" />
                    <rect x="243" y="75" width="24" height="4" fill="#5EEAD4" opacity="0.8" />
                    <rect x="243" y="90" width="24" height="4" fill="#5EEAD4" opacity="0.3" />
                    <rect x="243" y="105" width="24" height="4" fill="#F5A524" opacity="0.6" />
                    <rect x="243" y="120" width="24" height="4" fill="#5EEAD4" opacity="0.4" />
                    <rect x="243" y="135" width="24" height="4" fill="#F5A524" opacity="0.7" />
                    <rect x="243" y="150" width="24" height="4" fill="#5EEAD4" opacity="0.9" />

                    {/* Building 4 */}
                    <polygon points="295,130 345,90 345,190 295,190" fill="#1C2538" stroke="#F5A524" strokeWidth="1" strokeOpacity="0.3" />
                    <rect x="305" y="125" width="8" height="8" fill="#F5A524" opacity="0.6" />
                    <rect x="325" y="125" width="8" height="8" fill="#F5A524" opacity="0.2" />
                    <rect x="305" y="145" width="8" height="8" fill="#5EEAD4" opacity="0.8" />
                    <rect x="325" y="145" width="8" height="8" fill="#F5A524" opacity="0.7" />
                    <rect x="305" y="165" width="8" height="8" fill="#F5A524" opacity="0.4" />
                    <rect x="325" y="165" width="8" height="8" fill="#5EEAD4" opacity="0.5" />

                    {/* Ground line */}
                    <line x1="0" y1="190" x2="400" y2="190" stroke="#5EEAD4" strokeWidth="1.5" opacity="0.8" />
                    
                    {/* Grid */}
                    <line x1="200" y1="190" x2="-100" y2="300" stroke="#5EEAD4" strokeWidth="0.8" opacity="0.35" />
                    <line x1="200" y1="190" x2="0" y2="300" stroke="#5EEAD4" strokeWidth="0.8" opacity="0.35" />
                    <line x1="200" y1="190" x2="100" y2="300" stroke="#5EEAD4" strokeWidth="0.8" opacity="0.35" />
                    <line x1="200" y1="190" x2="200" y2="300" stroke="#5EEAD4" strokeWidth="0.8" opacity="0.35" />
                    <line x1="200" y1="190" x2="300" y2="300" stroke="#5EEAD4" strokeWidth="0.8" opacity="0.35" />
                    <line x1="200" y1="190" x2="400" y2="300" stroke="#5EEAD4" strokeWidth="0.8" opacity="0.35" />
                    <line x1="200" y1="190" x2="500" y2="300" stroke="#5EEAD4" strokeWidth="0.8" opacity="0.35" />

                    <line x1="0" y1="200" x2="400" y2="200" stroke="#5EEAD4" strokeWidth="0.6" opacity="0.25" />
                    <line x1="0" y1="215" x2="400" y2="215" stroke="#5EEAD4" strokeWidth="0.6" opacity="0.25" />
                    <line x1="0" y1="235" x2="400" y2="235" stroke="#5EEAD4" strokeWidth="0.7" opacity="0.3" />
                    <line x1="0" y1="260" x2="400" y2="260" stroke="#5EEAD4" strokeWidth="0.8" opacity="0.35" />
                    <line x1="0" y1="290" x2="400" y2="290" stroke="#5EEAD4" strokeWidth="1" opacity="0.4" />
                  </svg>

                  {/* Left Overlay: desaturates/flattens the left side of the canvas (FLAT_RAW view) */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-[#121620]/60 backdrop-grayscale-[0.55] backdrop-contrast-[0.8] backdrop-brightness-[0.9] border-r border-dashed border-white/20 pointer-events-none"
                    style={{ width: `${gradingSlider}%` }}
                  />

                  {/* Right Overlay: applies rich color grades to the right side (LUT_GRADED view) */}
                  <div 
                    className="absolute inset-y-0 right-0 bg-gradient-to-br from-cyan-accent/15 via-transparent to-amber-accent/15 backdrop-brightness-[1.05] backdrop-contrast-[1.1] backdrop-saturate-[1.3] pointer-events-none"
                    style={{ left: `${gradingSlider}%` }}
                  />

                  {/* Left Side Label indicator (Always aligned to top-left) */}
                  <div className="absolute top-3 left-4 select-none font-mono text-[9px] tracking-wider text-white/40 bg-[#0B0E14]/75 px-1.5 py-0.5 border border-white/5 pointer-events-none">
                    FLAT_RAW
                  </div>

                  {/* Right Side Label indicator (Always aligned to top-right) */}
                  <div className="absolute top-3 right-4 select-none font-mono text-[9px] tracking-wider text-amber-accent/80 bg-[#0B0E14]/75 px-1.5 py-0.5 border border-amber-accent/20 pointer-events-none">
                    LUT_GRADED
                  </div>

                  {/* Split Divider line bar (Visual slider indicator) */}
                  <div 
                    className="absolute inset-y-0 w-[2px] bg-white/60 pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-100"
                    style={{ left: `${gradingSlider}%` }}
                  />

                  {/* Slider Control Overlay simulating real scrubbing */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B0E14]/85 p-2.5 rounded-none border border-white/10 flex flex-col gap-1.5 z-20">
                    <div className="flex justify-between items-center text-[7px] font-mono text-white/40">
                      <span>INTERACTIVE LUT GRADER VALUE</span>
                      <span className="text-cyan-accent font-bold">{gradingSlider}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={gradingSlider}
                      onChange={(e) => setGradingSlider(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-ew-resize accent-cyan-accent"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Description Footer */}
            <div className="p-5 border-t border-white/5 text-left space-y-2">
              <span className="text-[10px] font-mono text-white uppercase tracking-wider font-semibold">
                // VIDEO POST-PRODUCTION
              </span>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-accent transition-colors">
                Cinematic Reels & Motion Design
              </h3>
              <p className="text-white/50 text-xs leading-relaxed font-light">
                Tailored SaaS promotional visual trailers, keyframe-synced kinetics typography, 
                and high-precision LUT color correction workflows.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
