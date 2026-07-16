import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Video } from 'lucide-react';

export default function InteractiveLutGrader() {
  const [sliderValue, setSliderValue] = useState(68);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timecode, setTimecode] = useState('00:14:02:18');
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Animate the HUD timecode to simulate real-time playback
  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }

    const updateTimecode = (time: number) => {
      if (time - lastTimeRef.current >= 41.66) { // ~24 frames per second (1000/24)
        lastTimeRef.current = time;
        
        // Generate mock timecode increment
        const now = new Date();
        const hrs = String(now.getHours() % 12).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        const frames = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        setTimecode(`${hrs}:${mins}:${secs}:${frames}`);
      }
      requestRef.current = requestAnimationFrame(updateTimecode);
    };

    requestRef.current = requestAnimationFrame(updateTimecode);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying]);

  // Render the high-fidelity mock video scene
  const renderScene = (isGraded: boolean) => {
    return (
      <div 
        className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-300 ${
          isGraded 
            ? 'bg-gradient-to-tr from-[#050B14] via-[#0E1B2E] to-[#1F1810]' 
            : 'bg-gradient-to-tr from-[#0B1017] via-[#121820] to-[#1A1A1E]'
        }`}
      >
        {/* Cinematic Grid mesh (perspective floor) */}
        <div 
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to top, #475569 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(200px) rotateX(60deg) translateY(-20px)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Central Graphic Element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer Glowing Ring */}
            <div 
              className={`w-36 h-36 md:w-48 md:h-48 rounded-full border-2 border-dashed flex items-center justify-center animate-spin-slow ${
                isGraded 
                  ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,165,36,0.15)]' 
                  : 'border-slate-500/20'
              }`}
            />
            {/* Inner Ring */}
            <div 
              className={`absolute inset-4 rounded-full border flex items-center justify-center ${
                isGraded 
                  ? 'border-teal-400/50 shadow-[0_0_20px_rgba(94,234,212,0.2)]' 
                  : 'border-slate-600/20'
              }`}
            />
            {/* Center Core */}
            <div 
              className={`absolute inset-10 rounded-full bg-gradient-to-br flex items-center justify-center font-mono text-[10px] font-bold tracking-widest ${
                isGraded 
                  ? 'from-teal-400 to-amber-500 text-zinc-950 shadow-lg' 
                  : 'from-slate-700 to-slate-800 text-slate-400'
              }`}
            >
              LUT_3D
            </div>
          </div>
        </div>

        {/* Abstract Floating Data Overlays */}
        <div className="absolute top-8 left-8 font-mono text-[9px] text-white/30 space-y-1.5 hidden sm:block">
          <div>REC_FORMAT: 4K PRORES 422 HQ</div>
          <div>COLOR_SPACE: REDWIDEGAMUTRGB</div>
          <div>ISO: 800 // APERTURE: F/2.8</div>
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-[9px] text-white/30 space-y-1 hidden sm:block">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`} />
            <span>{isPlaying ? 'CAP_ENGAGED' : 'CAP_PAUSED'}</span>
          </div>
          <div>GAMMA_CURVE: C-LOG3</div>
        </div>

        {/* Cinematic HUD brackets */}
        <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-white/20" />

        {/* Bottom Timecode Display */}
        <div className="absolute bottom-6 right-6 font-mono text-xs md:text-sm tracking-widest text-white/80 font-bold bg-zinc-950/80 px-2.5 py-1 rounded border border-white/10 flex items-center gap-2">
          <span className="text-[10px] text-white/40 font-normal">TC</span>
          {timecode}
        </div>

        {/* Top Centered Status Label */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 bg-zinc-950/50 px-3 py-1 rounded-full border border-white/5">
          {isGraded ? 'LUT PROFILE: AMBER_TEAL_CINE' : 'LOG PROFILE: FLAT_UNGRADED'}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Visualizer Card */}
      <div className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
        {/* Split Screen Image Component */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-white/5 select-none">
          {/* Base Layer: Before (Cool/Ungraded) */}
          {renderScene(false)}

          {/* Overlay Layer: After (Warm/Graded) - Width is controlled by slider */}
          <div 
            className="absolute top-0 right-0 bottom-0 h-full overflow-hidden z-10"
            style={{ 
              left: `${sliderValue}%`, 
              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)` 
            }}
          >
            {/* We position it absolute top-0 right-0 but with fixed 100% width of parent to prevent squishing */}
            <div 
              className="absolute top-0 right-0 bottom-0 h-full"
              style={{ width: '100%', right: 0 }}
            >
              {renderScene(true)}
            </div>
          </div>

          {/* Divider Line */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-teal-400 z-20 pointer-events-none"
            style={{ left: `${sliderValue}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-teal-400 border border-zinc-950 shadow-[0_0_10px_rgba(94,234,212,0.8)] flex items-center justify-center text-[10px] text-zinc-950 font-bold select-none">
              ↔
            </div>
          </div>

          {/* Before & After HUD Text overlays */}
          <div className="absolute top-16 left-6 font-mono text-[10px] uppercase font-bold text-white/50 bg-zinc-950/80 px-2 py-0.5 rounded border border-white/10 z-30 select-none">
            RAW_LOG
          </div>
          <div className="absolute top-16 right-6 font-mono text-[10px] uppercase font-bold text-amber-500 bg-zinc-950/80 px-2 py-0.5 rounded border border-white/10 z-30 select-none">
            LUT_GRADED
          </div>

          {/* Control overlay (Play / Pause simulation) */}
          <div className="absolute bottom-6 left-6 z-30 flex items-center gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-7 h-7 rounded bg-zinc-950/80 border border-white/10 hover:border-teal-400 hover:text-teal-400 text-white/70 flex items-center justify-center transition-colors cursor-pointer"
              title={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              {isPlaying ? <span className="w-2.5 h-2.5 bg-current rounded-sm" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button 
              onClick={() => setSliderValue(68)}
              className="w-7 h-7 rounded bg-zinc-950/80 border border-white/10 hover:border-teal-400 hover:text-teal-400 text-white/70 flex items-center justify-center transition-colors cursor-pointer"
              title="Reset split"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grader Metrics & Slider control */}
        <div className="flex flex-col gap-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
              INTERACTIVE LUT GRADER VALUE
            </span>
            <span className="text-sm text-teal-400 font-bold">
              {sliderValue}%
            </span>
          </div>

          {/* Custom Range Slider */}
          <div className="relative w-full flex flex-col mt-1">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer focus:outline-none accent-teal-400"
            />
            {/* Position-tracked Arrow hint just below the slider thumb */}
            <div 
              className="relative h-4 mt-1 transition-all duration-75 pointer-events-none"
              style={{ width: '100%' }}
            >
              <span 
                className="absolute text-teal-400 font-bold text-xs select-none"
                style={{ 
                  left: `${sliderValue}%`, 
                  transform: 'translateX(-50%)' 
                }}
              >
                ↔
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Content */}
      <div className="pl-1">
        <div className="font-mono text-xs tracking-[0.25em] text-teal-400 font-semibold uppercase mb-2">
          // VIDEO POST-PRODUCTION
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight mb-3">
          Cinematic Reels &amp; Motion Design
        </h2>
        <p className="text-white/50 text-sm font-sans leading-relaxed max-w-2xl">
          Tailored SaaS promotional visual trailers, keyframe-synced kinetics typography, and high-precision LUT color correction workflows.
        </p>
      </div>
    </div>
  );
}
