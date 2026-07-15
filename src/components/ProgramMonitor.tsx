import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TimelineClip } from '../types';
import { 
  Terminal, Code2, Sparkles, Tv, Play, Pause, 
  Volume2, VolumeX, Copy, Check, Sliders, Layers 
} from 'lucide-react';

interface ProgramMonitorProps {
  activeClip: TimelineClip | null;
  currentTime: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function ProgramMonitor({ 
  activeClip, 
  currentTime, 
  isPlaying, 
  onTogglePlay 
}: ProgramMonitorProps) {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cpuVal, setCpuVal] = useState(38);
  const [fpsVal, setFpsVal] = useState(60);

  // Smooth metrics jitter for SaaS mockup
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCpuVal(prev => Math.min(95, Math.max(12, Math.round(prev + (Math.random() - 0.5) * 8))));
      setFpsVal(prev => Math.min(62, Math.max(57, Math.round(prev + (Math.random() - 0.5) * 2))));
    }, 800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format SMPTE Timecode: HH:MM:SS:FF (assume 30fps)
  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30);
    return `00:00:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  return (
    <div id="program-monitor-shell" className="w-full bg-[#11151D]/45 backdrop-blur-md border border-white/10 rounded-none overflow-hidden box-glow-cyan/10">
      {/* Chrome Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0E14] border-b border-white/5 font-mono text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[10px] tracking-wider text-white/30">MONITOR_CORE // LIVE_PREVIEW</span>
        </div>
        <div className="flex items-center gap-3">
          {activeClip && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-white/5 border border-white/10 text-[10px] text-cyan-accent font-mono">
              <span className="w-1.5 h-1.5 rounded-none bg-cyan-accent animate-pulse" />
              {activeClip.track} : {activeClip.title}
            </div>
          )}
          <span className="text-[11px] text-amber-accent font-medium tracking-widest bg-amber-accent/5 px-2.5 py-0.5 rounded-none border border-amber-accent/10">
            {formatTimecode(currentTime)}
          </span>
        </div>
      </div>

      {/* Main Preview Frame */}
      <div className="relative aspect-video w-full bg-[#07090D] flex items-center justify-center p-4 md:p-6 overflow-hidden">
        {/* Aspect ratio grid markings */}
        <div className="absolute inset-0 border border-white/[0.02] pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/[0.02] pointer-events-none" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.02] pointer-events-none" />

        <AnimatePresence mode="wait">
          {!activeClip ? (
            <motion.div
              key="empty-monitor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/30 flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/40">
                <Sliders className="w-5 h-5" />
              </div>
              <p className="font-mono text-xs tracking-wider">NO CLIP ACTIVE UNDER PLAYHEAD</p>
              <p className="text-[11px] text-white/20 max-w-[280px]">
                Press Play or scrub the timeline below to select a developmental track clip
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeClip.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full flex flex-col justify-between"
            >
              {/* Media render depending on type */}
              <div className="flex-1 w-full flex items-center justify-center">
                
                {/* 1. CODE TYPE (Dev Console) */}
                {activeClip.details.mediaType === 'code' && (
                  <div className="w-full max-w-2xl h-full flex flex-col rounded-none bg-[#0E1117] border border-white/10 overflow-hidden text-left font-mono">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#0B0E14] border-b border-white/10 text-[11px] text-white/40">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-accent" />
                        <span>src/api/metrics.ts</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(activeClip.details.mediaContent.codeSnippet || '')}
                        className="p-1 hover:bg-white/5 rounded-none text-white/50 hover:text-white transition-colors"
                        title="Copy code"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Editor Content split with live metrics side-panel */}
                    <div className="flex-1 p-3 md:p-4 text-[11px] md:text-xs overflow-y-auto flex flex-col md:flex-row gap-4 leading-relaxed">
                      <div className="flex-1 text-white/80 select-all font-mono whitespace-pre overflow-x-auto border-r border-white/5 pr-4">
                        {activeClip.details.mediaContent.codeSnippet?.split('\n').map((line, lIdx) => (
                          <div key={lIdx} className="flex gap-4">
                            <span className="text-white/20 text-right w-5 select-none">{lIdx + 1}</span>
                            <span className="text-slate-300">
                              {line.includes('import') && <span className="text-amber-accent/90">{line.split(' ')[0]} </span>}
                              {line.includes('export') && <span className="text-cyan-accent">{line.split(' ')[0]} </span>}
                              {line.replace('import ', '').replace('export ', '')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Live Server Widget */}
                      <div className="w-full md:w-44 flex flex-col justify-between py-1 px-2 rounded-none bg-white/[0.02] border border-white/5">
                        <div>
                          <div className="text-[10px] text-white/30 tracking-wider uppercase mb-2">Node Core Console</div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-white/40">CPU Load</span>
                              <span className="font-bold text-cyan-accent">{cpuVal}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-none overflow-hidden">
                              <motion.div 
                                className="h-full bg-cyan-accent"
                                animate={{ width: `${cpuVal}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>

                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-white/40">FPS Sync</span>
                              <span className="font-bold text-amber-accent">{fpsVal}fps</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-none overflow-hidden">
                              <motion.div 
                                className="h-full bg-amber-accent"
                                animate={{ width: `${(fpsVal / 60) * 100}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-white/40 font-mono space-y-1">
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="text-emerald-400 font-bold animate-pulse">LIVE SECURE</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ping Gateway:</span>
                            <span className="text-cyan-accent">14ms</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. DESIGN TYPE (Figma Mockup) */}
                {activeClip.details.mediaType === 'design' && (
                  <div className="w-full max-w-md h-full flex flex-col rounded-none bg-[#0E1117] border border-white/10 overflow-hidden text-left relative">
                    {/* Design Chrome header */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#0B0E14] border-b border-white/10 text-[11px] text-white/40">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-accent" />
                        <span>canvas_frame.fig // Figma Mode</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-none bg-amber-accent" />
                        <span className="text-[10px]">100% Zoom</span>
                      </div>
                    </div>

                    {/* Vector Editor Workspace */}
                    <div className="flex-1 bg-[#151922] relative p-6 flex flex-col items-center justify-center overflow-hidden">
                      {/* Grid background */}
                      <div 
                        className="absolute inset-0 opacity-[0.05]" 
                        style={{
                          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                          backgroundSize: '16px 16px'
                        }}
                      />

                      {/* Figma cursor follow simulation */}
                      <motion.div 
                        className="absolute pointer-events-none z-10"
                        animate={isPlaying ? {
                          x: [50, -60, 40, -10, 50],
                          y: [-40, 50, -20, 30, -40]
                        } : {}}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" className="text-cyan-accent drop-shadow-md">
                          <path d="M0 0V14.5L4.5 10L8 14.5L10 13L6.5 8.5L12 8.5L0 0Z" fill="currentColor"/>
                        </svg>
                        <div className="ml-3 px-1.5 py-0.5 rounded-none bg-cyan-accent text-[#0B0E14] text-[9px] font-bold font-mono shadow-lg">
                          DESIGNER
                        </div>
                      </motion.div>

                      {/* Vector Shapes with outline controls */}
                      <div className="relative p-6 bg-[#0B0E14]/70 border border-white/10 rounded-none shadow-2xl flex flex-col gap-4 items-center min-w-[200px] hover:border-amber-accent/30 transition-colors">
                        {/* Selected overlay bounding box visual */}
                        <div className="absolute -inset-[3px] border border-dashed border-amber-accent/40 rounded-none pointer-events-none">
                          <span className="absolute -top-1 -left-1 w-2 h-2 bg-amber-accent border border-white" />
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-accent border border-white" />
                          <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-accent border border-white" />
                          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-accent border border-white" />
                        </div>

                        {/* Logo Text Render */}
                        <div className="font-display font-extrabold text-base tracking-[0.2em] text-white text-center">
                          {activeClip.details.mediaContent.logoText}
                        </div>

                        {/* Shape Blocks */}
                        <div className="flex gap-4 items-center py-2">
                          {activeClip.details.mediaContent.shapes?.map((shape, idx) => (
                            <motion.div
                              key={idx}
                              style={{ scale: shape.scale || 1 }}
                              className={`w-10 h-10 flex items-center justify-center text-white`}
                              animate={isPlaying ? {
                                rotate: shape.type === 'square' ? [0, 90, 180, 0] : shape.type === 'triangle' ? [0, -45, 0] : 0,
                                borderRadius: shape.type === 'morphing' ? ['20%', '50%', '30%', '20%'] : '0%'
                              } : {}}
                              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              {shape.type === 'triangle' && (
                                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px]" style={{ borderBottomColor: shape.color }} />
                              )}
                              {shape.type === 'circle' && (
                                <div className="w-10 h-10 rounded-none" style={{ backgroundColor: shape.color }} />
                              )}
                              {shape.type === 'square' && (
                                <div className="w-9 h-9" style={{ backgroundColor: shape.color }} />
                              )}
                              {shape.type === 'pill' && (
                                <div className="w-12 h-6 rounded-none" style={{ backgroundColor: shape.color }} />
                              )}
                              {shape.type === 'card' && (
                                <div className="w-12 h-10 rounded-none" style={{ backgroundColor: shape.color }} />
                              )}
                              {shape.type === 'morphing' && (
                                <div className="w-10 h-10 rounded-none" style={{ backgroundColor: shape.color }} />
                              )}
                              {shape.type === 'rotated' && (
                                <div className="w-10 h-10 rounded-none rotate-45" style={{ backgroundColor: shape.color }} />
                              )}
                              {shape.type === 'hexagon' && (
                                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="w-10 h-10 select-none">
                                  <polygon 
                                    points="50,15 80,32 80,68 50,85 20,68 20,32" 
                                    stroke={shape.color} 
                                    strokeWidth="6" 
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                  />
                                </svg>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {/* Swatches Row */}
                        <div className="flex gap-1.5 items-center mt-2">
                          {activeClip.details.mediaContent.palette?.map((color, cIdx) => (
                            <div 
                              key={cIdx} 
                              className="w-4 h-4 rounded-none border border-white/20 group relative cursor-pointer"
                              style={{ backgroundColor: color }}
                              title={color}
                            >
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-[#0E1117] text-[9px] text-white px-1 py-0.5 rounded-none border border-white/10 font-mono">
                                {color}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. VIDEO TYPE (Render Suite) */}
                {activeClip.details.mediaType === 'video' && (
                  <div className="w-full max-w-xl h-full flex flex-col rounded-none bg-[#0E1117] border border-white/5 overflow-hidden text-left font-mono relative">
                    {/* Render HUD Chrome */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#0B0E14] border-b border-white/5 text-[11px] text-white/40">
                      <div className="flex items-center gap-2">
                        <Tv className="w-3.5 h-3.5 text-cyan-accent" />
                        <span>viewport_active_rec // UHD 60fps</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-none bg-red-500 animate-pulse" />
                        <span className="text-[10px] text-red-400 font-bold tracking-wider uppercase">
                          {activeClip.details.mediaContent.videoStatus}
                        </span>
                      </div>
                    </div>

                    {/* Camera Viewfinder Screen */}
                    <div className="flex-1 bg-[#05070A] relative flex flex-col items-center justify-center p-4">
                      {/* Viewfinder brackets */}
                      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />

                      {/* HUD Overlay Details */}
                      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[9px] text-white/30 tracking-[0.2em]">
                        1080p // LUT_NEON_CRUSH
                      </div>

                      <div className="absolute bottom-5 left-6 text-[9px] text-white/30 space-y-0.5">
                        <div> shutter: 1/120 </div>
                        <div> iso: 400 </div>
                      </div>

                      <div className="absolute bottom-5 right-6 text-[9px] text-white/30 text-right space-y-0.5">
                        <div> f-stop: f/2.8 </div>
                        <div> lens: 35mm </div>
                      </div>

                      {/* Audio Bouncing Waveform */}
                      <div className="w-full max-w-sm p-4 bg-[#0B0E14]/60 border border-white/5 rounded-none flex flex-col gap-2 shadow-2xl relative overflow-hidden">
                        <div className="text-[10px] text-white/50 tracking-wider font-semibold">
                          {activeClip.details.mediaContent.videoTitle}
                        </div>
                        
                        <div className="h-16 flex items-end gap-[3px] py-1 bg-black/30 rounded-none px-2 overflow-hidden border border-white/[0.02]">
                          {activeClip.details.mediaContent.waveformSeed?.map((hVal, hIdx) => {
                            // Apply a random delta when playing
                            const randomMultiplier = isPlaying ? (0.6 + Math.random() * 0.5) : 1;
                            const animatedHeight = Math.min(100, Math.max(10, hVal * randomMultiplier));
                            return (
                              <motion.div
                                key={hIdx}
                                className="flex-1 rounded-none"
                                style={{
                                  height: `${animatedHeight}%`,
                                  background: `linear-gradient(to top, #5EEAD4, #F5A524)`
                                }}
                                animate={isPlaying ? {
                                  opacity: [0.6, 1, 0.6]
                                } : { opacity: 0.8 }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: hIdx * 0.04 }}
                              />
                            );
                          })}
                        </div>

                        {/* Stereo volume DB meters */}
                        <div className="space-y-1 mt-1 text-[9px] text-white/30">
                          <div className="flex gap-2 items-center">
                            <span>L</span>
                            <div className="flex-1 h-1.5 bg-black/40 rounded-none overflow-hidden flex">
                              <motion.div 
                                className="h-full bg-cyan-accent"
                                animate={isPlaying ? { width: ['30%', '85%', '50%', '95%', '30%'] } : { width: '45%' }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </div>
                            <span className="w-5 text-right">-12dB</span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span>R</span>
                            <div className="flex-1 h-1.5 bg-black/40 rounded-none overflow-hidden flex">
                              <motion.div 
                                className="h-full bg-amber-accent"
                                animate={isPlaying ? { width: ['40%', '75%', '60%', '90%', '40%'] } : { width: '55%' }}
                                transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </div>
                            <span className="w-5 text-right">-8dB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Clip details overlay panel */}
              <div className="p-4 bg-[#0B0E14] border-t border-white/10 flex flex-col md:flex-row gap-3 md:items-center justify-between text-left">
                <div>
                  <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    {activeClip.title}
                    <span className="text-[10px] font-mono tracking-wider font-normal text-white/30 bg-white/5 px-1.5 py-0.5 rounded-none">
                      {activeClip.details.meta}
                    </span>
                  </h3>
                  <p className="text-xs text-white/50 max-w-xl mt-1 leading-relaxed">
                    {activeClip.details.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 items-center">
                  {activeClip.details.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 text-[10px] font-mono rounded-none bg-white/5 border border-white/10 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Monitor Control Bar */}
      <div className="px-4 py-3 bg-[#0B0E14] border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-none bg-white text-[#0B0E14] hover:bg-cyan-accent hover:shadow-cyan-accent/20 hover:shadow-lg flex items-center justify-center transition-all cursor-pointer border border-white/10"
            title={isPlaying ? "Pause Timeline" : "Play Timeline Sequence"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-[#0B0E14]" /> : <Play className="w-4 h-4 fill-[#0B0E14] translate-x-0.5" />}
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-white/40 border-l border-white/10 pl-3">
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
            <span>RENDER_OK</span>
          </div>
        </div>

        {/* Informative text instructions */}
        <div className="font-mono text-[10px] text-white/30 text-right">
          USE TIMELINE BELOW TO SCRUB OR CHOOSE WORKTRACKS
        </div>
      </div>
    </div>
  );
}
