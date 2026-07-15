import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TimelineClip, TrackType } from '../types';
import { TIMELINE_CLIPS } from '../data';
import { Clock, Sliders, Layers2, Code2, Sparkles, Tv, RotateCcw } from 'lucide-react';

interface TimelineProps {
  currentTime: number;
  onTimeChange: (time: number) => void;
  selectedClipId: string | null;
  onSelectClip: (clip: TimelineClip) => void;
  focusedTrack: TrackType;
  onSelectTrack: (track: TrackType) => void;
}

export default function Timeline({
  currentTime,
  onTimeChange,
  selectedClipId,
  onSelectClip,
  focusedTrack,
  onSelectTrack,
}: TimelineProps) {
  const rulerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Handle Scrubbing (Mouse / Touch movement on ruler)
  const handleScrub = (clientX: number) => {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const computedTime = percentage * 10; // 0 to 10 seconds range
    onTimeChange(Math.min(10, Math.max(0, computedTime)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    handleScrub(e.clientX);
    
    const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      handleScrub(moveEvent.clientX);
    };

    const handleGlobalMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    handleScrub(e.touches[0].clientX);

    const handleGlobalTouchMove = (moveEvent: TouchEvent) => {
      if (!isDraggingRef.current) return;
      handleScrub(moveEvent.touches[0].clientX);
    };

    const handleGlobalTouchEnd = () => {
      isDraggingRef.current = false;
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };

    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('touchend', handleGlobalTouchEnd);
  };

  // Group clips by track
  const devClips = TIMELINE_CLIPS.filter((c) => c.track === 'DEV');
  const designClips = TIMELINE_CLIPS.filter((c) => c.track === 'DESIGN');
  const videoClips = TIMELINE_CLIPS.filter((c) => c.track === 'VIDEO');

  const tracks: Array<{ type: TrackType; name: string; icon: any; clips: TimelineClip[]; colorClass: string }> = [
    { type: 'DEV', name: 'V1 // DEVELOPMENT', icon: Code2, clips: devClips, colorClass: 'text-cyan-accent border-cyan-accent/20' },
    { type: 'DESIGN', name: 'A1 // DESIGN_CORE', icon: Sparkles, clips: designClips, colorClass: 'text-amber-accent border-amber-accent/20' },
    { type: 'VIDEO', name: 'M1 // VIDEO_COMPS', icon: Tv, clips: videoClips, colorClass: 'text-white border-white/20' },
  ];

  return (
    <div id="timeline-editor-wrapper" className="w-full bg-[#11151D]/45 backdrop-blur-md border border-white/10 rounded-none overflow-hidden box-glow-cyan/5">
      {/* Editor Timeline Controls bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0E14] border-b border-white/5 font-mono text-[10px] text-white/40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-cyan-accent" />
            <span className="text-white/60 font-semibold tracking-wider">MULTI-TRACK EDITOR</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-white/30">
            <span>TC Mode: 30 FPS ND</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Scale: 10.0s Linear</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onTimeChange(0)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-none bg-white/5 border border-white/10 hover:border-cyan-accent hover:text-white transition-all text-[9px] cursor-pointer"
            title="Reset playhead to start"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            RESET
          </button>
          <div className="text-[11px] font-mono text-cyan-accent font-semibold tracking-wider">
            {currentTime.toFixed(2)}s
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-w-full">
        {/* Track Headers Sidebar */}
        <div className="w-full md:w-56 bg-[#0E1117] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-end">
          {/* Top spacer (aligns with the timeline ruler height) */}
          <div className="h-9 border-b border-white/5 hidden md:flex items-center px-4 font-mono text-[9px] text-white/30 tracking-wider">
            TRACK_NAME // DISCIPLINE
          </div>

          {/* Individual Track labels */}
          <div className="flex flex-col">
            {tracks.map((tr) => {
              const Icon = tr.icon;
              const isFocused = focusedTrack === tr.type;
              return (
                <button
                  key={tr.type}
                  onClick={() => onSelectTrack(tr.type)}
                  className={`flex items-center justify-between px-4 py-6 md:py-8 border-b border-white/5 text-left transition-all relative group cursor-pointer ${
                    isFocused ? 'bg-white/[0.03] text-white' : 'hover:bg-white/[0.01] text-white/40'
                  }`}
                >
                  {/* Left priority border indicator */}
                  {isFocused && (
                    <motion.div 
                      layoutId="activeTrackBorder" 
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        tr.type === 'DEV' ? 'bg-cyan-accent' : tr.type === 'DESIGN' ? 'bg-amber-accent' : 'bg-gradient-to-b from-cyan-accent to-amber-accent'
                      }`}
                    />
                  )}
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${
                      isFocused 
                        ? tr.type === 'DEV' ? 'text-cyan-accent' : tr.type === 'DESIGN' ? 'text-amber-accent' : 'text-white'
                        : 'text-white/20 group-hover:text-white/40'
                    }`} />
                    <span className="font-mono text-[10px] font-semibold tracking-widest">{tr.name}</span>
                  </div>
                  <span className={`text-[9px] font-mono border rounded-none px-1 py-0.5 leading-none transition-colors ${
                    isFocused ? 'border-white/20 text-white/50' : 'border-white/5 text-white/20 group-hover:border-white/10'
                  }`}>
                    {tr.clips.length} CLIPS
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Tracks Grid (Right) */}
        <div className="flex-1 relative flex flex-col min-h-[220px] md:min-h-0 bg-[#0A0D12]">
          {/* 1. Timeline Ruler / Time Scale */}
          <div 
            ref={rulerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="h-9 border-b border-white/5 bg-[#0C0F15] relative select-none cursor-ew-resize w-full z-20"
          >
            {/* Hour ticks (increments of 1 second from 0 to 10) */}
            {Array.from({ length: 11 }).map((_, idx) => {
              const percent = (idx / 10) * 100;
              return (
                <div 
                  key={idx} 
                  className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center select-none"
                  style={{ left: `${percent}%` }}
                >
                  <span className="text-[9px] font-mono text-white/30 mb-1 select-none">00:0{idx}</span>
                  <div className={`w-[1px] ${idx % 5 === 0 ? 'h-3 bg-white/20' : 'h-1.5 bg-white/10'}`} />
                </div>
              );
            })}
          </div>

          {/* 2. Timeline Tracks Rows */}
          <div className="flex flex-col relative w-full overflow-hidden flex-1">
            {/* The vertical playhead line moving across the track rows */}
            <div 
              className="absolute top-0 bottom-0 w-[1.5px] bg-[#F5A524] pointer-events-none z-10 transition-shadow shadow-[0_0_12px_rgba(245,165,36,0.8)]"
              style={{ left: `${(currentTime / 10) * 100}%` }}
            >
              {/* Playhead Marker Needle Handle (sharp rotated diamond) */}
              <div className="absolute top-0 -translate-y-[6px] -translate-x-1/2 w-3 h-3 bg-[#F5A524] rotate-45 border border-[#0B0E14] shadow-lg">
              </div>
            </div>

            {/* Tracks content */}
            {tracks.map((tr) => (
              <div 
                key={tr.type} 
                className={`relative h-[61px] md:h-[81px] border-b border-white/5 flex items-center px-0.5 ${
                  focusedTrack === tr.type ? 'bg-white/[0.015]' : ''
                }`}
              >
                {/* Horizontal reference line */}
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.02] pointer-events-none" />

                {/* Clips Container */}
                <div className="relative w-full h-12 md:h-14">
                  {tr.clips.map((clip) => {
                    const isSelected = selectedClipId === clip.id;
                    const isActive = currentTime >= clip.start && currentTime <= (clip.start + clip.duration);
                    const leftPos = (clip.start / 10) * 100;
                    const widthSize = (clip.duration / 10) * 100;

                    // Compute clip custom colors
                    let clipStyle = '';
                    if (clip.color === 'cyan') {
                      clipStyle = 'from-cyan-accent/10 to-cyan-accent/20 border-cyan-accent/30 text-cyan-accent hover:border-cyan-accent';
                    } else if (clip.color === 'amber') {
                      clipStyle = 'from-amber-accent/10 to-amber-accent/20 border-amber-accent/30 text-amber-accent hover:border-amber-accent';
                    } else {
                      clipStyle = 'from-cyan-accent/10 via-white/[0.05] to-amber-accent/15 border-white/30 text-white hover:border-white';
                    }

                    return (
                      <motion.button
                        key={clip.id}
                        onClick={() => {
                          onTimeChange(clip.start); // Snap playhead to clip start
                          onSelectClip(clip);
                          onSelectTrack(clip.track);
                        }}
                        style={{
                          left: `${leftPos}%`,
                          width: `${widthSize}%`,
                        }}
                        className={`absolute top-0 bottom-0 rounded-none border bg-gradient-to-br px-2.5 py-1.5 flex flex-col justify-between text-left cursor-pointer select-none transition-all duration-200 overflow-hidden group ${clipStyle} ${
                          isSelected ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-[#0A0D12] scale-[0.99] z-20' : ''
                        } ${isActive ? 'brightness-125 box-shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'opacity-60 hover:opacity-100'}`}
                      >
                        {/* Selected background highlight strip */}
                        <div className={`absolute top-0 left-0 right-0 h-1 ${
                          clip.color === 'cyan' ? 'bg-cyan-accent' : clip.color === 'amber' ? 'bg-amber-accent' : 'bg-gradient-to-r from-cyan-accent to-amber-accent'
                        }`} />

                        {/* Text labels */}
                        <div className="font-display font-bold text-[9px] md:text-[11px] tracking-wide truncate pr-1 mt-1">
                          {clip.title}
                        </div>
                        
                        <div className="flex items-center justify-between mt-1 text-[8px] font-mono opacity-60">
                          <span className="truncate">{clip.details.subtitle}</span>
                          <span className="hidden sm:inline">({clip.duration}s)</span>
                        </div>

                        {/* Active waveform ripple */}
                        {isActive && !shouldReduceMotion && (
                          <div className="absolute bottom-1 right-2 flex gap-0.5 items-end h-3">
                            <span className="w-0.5 h-1.5 bg-current rounded-none animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <span className="w-0.5 h-2.5 bg-current rounded-none animate-bounce" style={{ animationDelay: '0.3s' }} />
                            <span className="w-0.5 h-1.0 bg-current rounded-none animate-bounce" style={{ animationDelay: '0.5s' }} />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Timeline Footer / Grid Legend */}
      <div className="px-4 py-2 bg-[#0B0E14] border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-[10px] font-mono text-white/30">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-cyan-accent" />
            <span>DEV TRACKS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-amber-accent" />
            <span>DESIGN TRACKS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2 bg-gradient-to-r from-cyan-accent to-amber-accent rounded-none" />
            <span>VIDEO REEL TRACKS</span>
          </div>
        </div>
        <div className="hidden sm:block">
          TAP ANY CLIP TO INSTANTLY SNAP PLAYHEAD & PREVIEW
        </div>
      </div>
    </div>
  );
}
