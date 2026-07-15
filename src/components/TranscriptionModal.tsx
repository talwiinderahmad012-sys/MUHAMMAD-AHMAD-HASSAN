import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Globe, FileText, UploadCloud, Check, ArrowRight, Sparkles } from 'lucide-react';

interface TranscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TranscriptionModal({ isOpen, onClose }: TranscriptionModalProps) {
  // State for video source binding (default to a high-quality stable video sample)
  const [videoSrc, setVideoSrc] = useState<string>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [videoName, setVideoName] = useState<string>('sample_video_blazes.mp4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [spokenLanguage, setSpokenLanguage] = useState<string>('');
  const [writingScript, setWritingScript] = useState<string>('Latin');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [transcriptionResult, setTranscriptionResult] = useState<string[]>([]);
  const [currentCaption, setCurrentCaption] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle video playback
  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((err) => console.log('Playback error:', err));
      setIsPlaying(true);
    }
  };

  // Sync state with HTML5 video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoSrc]);

  // Handle local file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setVideoSrc(localUrl);
      setVideoName(file.name);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  };

  // Handle "Generate Transcription" click with absolute tooltip validation
  const handleGenerateClick = () => {
    if (!spokenLanguage) {
      // Show tooltip temporarily above the button
      setShowTooltip(true);
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      return;
    }

    // Trigger processing workflow
    setIsProcessing(true);
    setProcessingProgress(0);
    setTranscriptionResult([]);
    setCurrentCaption('');
  };

  // Simulated subtitle progression for processing phase
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        const next = prev + 4;
        if (next >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          // Load mock transcription details
          setTranscriptionResult([
            '[00:01.00] Initiating audio-frequency parsing...',
            '[00:02.50] Language model synchronization: OK.',
            '[00:04.20] Analyzing spoken waveforms in real-time...',
            '[00:06.00] Dubbing core pipelines connected.',
            '[00:08.50] Generated transcription complete!'
          ]);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isProcessing]);

  // Simulated video playback subtitles sync
  useEffect(() => {
    if (!isPlaying || isProcessing || transcriptionResult.length === 0) return;

    const interval = setInterval(() => {
      if (!videoRef.current) return;
      const time = videoRef.current.currentTime;
      if (time < 2) {
        setCurrentCaption('Discovering the absolute limits of creative engineering.');
      } else if (time < 5) {
        setCurrentCaption('Connecting full-stack capability with cinematic production values.');
      } else if (time < 8) {
        setCurrentCaption('Our pipelines are fully optimized for real-time localization.');
      } else {
        setCurrentCaption('Hexframe Studio transcription is complete.');
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, isProcessing, transcriptionResult]);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      id="transcription-modal-overlay" 
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
    >
      <motion.div
        id="transcription-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="bg-[#0B0E14] border border-white/10 rounded-none w-full max-w-xl overflow-hidden shadow-2xl relative flex flex-col font-sans text-left"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0E1117] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#5EEAD4]/10 border border-[#5EEAD4]/30 flex items-center justify-center rounded-none text-[#5EEAD4]">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-extrabold text-white">
              Hexframe Localization Suite
            </span>
          </div>
          {/* Scaled small close 'X' button */}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors duration-150 rounded-none cursor-pointer p-0"
            title="Close modal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[85vh]">
          {/* 1. VIDEO PREVIEW CONTAINER */}
          <div className="space-y-3">
            <div className="relative aspect-video w-full bg-black border border-white/10 overflow-hidden group">
              {/* HTML5 Video Tag */}
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                preload="auto"
                loop
                className="w-full h-full object-cover"
              />

              {/* Centralized Play Button Overlay */}
              <button
                onClick={handleTogglePlay}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#5EEAD4]/50 flex items-center justify-center text-white transition-all duration-200 shadow-lg z-20 cursor-pointer"
                title={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-[#5EEAD4]" />
                ) : (
                  <Play className="w-4 h-4 fill-white translate-x-0.5 text-white" />
                )}
              </button>

              {/* Video Name Badge */}
              <div className="absolute bottom-3 left-3 bg-black/75 px-2 py-0.5 font-mono text-[9px] text-white/50 border border-white/5">
                {videoName}
              </div>

              {/* Upload Trigger overlay */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-3 right-3 bg-black/75 hover:bg-black border border-white/10 hover:border-[#5EEAD4]/40 p-1.5 transition-all text-white/40 hover:text-white cursor-pointer"
                title="Upload custom video"
              >
                <UploadCloud className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Subtitles Overlay beneath video if loaded and playing */}
            {isPlaying && currentCaption && !isProcessing && (
              <div className="bg-black/40 border border-white/5 px-4 py-2 font-mono text-center text-xs text-white/90">
                &ldquo;{currentCaption}&rdquo;
              </div>
            )}

            {/* Small centered status text with a green dot icon directly below the video */}
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ready for processing</span>
            </div>
          </div>

          {/* 2. SECTION HEADER (Language Settings) */}
          <div className="border-t border-white/10 pt-5 space-y-4">
            <div className="flex items-start gap-3 text-left">
              <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-none mt-0.5">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">
                  Language Settings
                </h4>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Configure the source language and writing system
                </p>
              </div>
            </div>

            {/* Dropdowns side-by-side in a two-column grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Spoken Language Dropdown */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  <span>🔊</span> What language is spoken?
                </label>
                <select
                  value={spokenLanguage}
                  onChange={(e) => setSpokenLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#11151D] border border-white/10 focus:border-[#5EEAD4]/50 rounded-none text-xs text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '32px'
                  }}
                >
                  <option value="" disabled className="text-white/20 bg-[#0B0E14]">
                    Select language
                  </option>
                  <option value="English" className="bg-[#0B0E14]">English</option>
                  <option value="Hindi" className="bg-[#0B0E14]">Hindi (हिन्दी)</option>
                  <option value="Spanish" className="bg-[#0B0E14]">Spanish (Español)</option>
                  <option value="French" className="bg-[#0B0E14]">French (Français)</option>
                  <option value="German" className="bg-[#0B0E14]">German (Deutsch)</option>
                  <option value="Japanese" className="bg-[#0B0E14]">Japanese (日本語)</option>
                </select>
              </div>

              {/* Writing Script Dropdown */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  <span>📄</span> Writing system used?
                </label>
                <select
                  value={writingScript}
                  onChange={(e) => setWritingScript(e.target.value)}
                  className="w-full px-3 py-2 bg-[#11151D] border border-white/10 focus:border-[#5EEAD4]/50 rounded-none text-xs text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '32px'
                  }}
                >
                  <option value="Latin" className="bg-[#0B0E14]">Latin Alphabet</option>
                  <option value="Devanagari" className="bg-[#0B0E14]">Devanagari (देवनागरी)</option>
                  <option value="Cyrillic" className="bg-[#0B0E14]">Cyrillic</option>
                  <option value="Katakana" className="bg-[#0B0E14]">Japanese Kana / Kanji</option>
                </select>
              </div>
            </div>
          </div>

          {/* Simulated processing progression bar */}
          {isProcessing && (
            <div className="space-y-2 border-t border-white/5 pt-4">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>LOCALIZATION_PIPELINE_RUNNING</span>
                <span>{processingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-none overflow-hidden">
                <div 
                  className="h-full bg-[#5EEAD4] transition-all duration-150"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Render simulation logs on complete */}
          {transcriptionResult.length > 0 && !isProcessing && (
            <div className="border-t border-white/10 pt-4 space-y-2 text-left">
              <div className="font-mono text-[10px] text-[#5EEAD4] font-bold tracking-wider">
                // OUTPUT_LOCALIZATION_STREAM_OK
              </div>
              <div className="p-3 bg-[#0E1117] border border-white/5 max-h-36 overflow-y-auto font-mono text-[10px] text-white/60 space-y-1.5">
                {transcriptionResult.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-white/20 select-none">[{idx + 1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. GENERATION TRIGGER SECTION with absolute validation tooltip */}
          <div className="border-t border-white/10 pt-5 relative">
            {/* Elegant, floating Tooltip/Popover */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: 10, x: '-50%' }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-50 bg-[#161B22] border border-red-500/30 text-white font-mono text-[11px] px-3.5 py-1.5 shadow-2xl rounded-none whitespace-nowrap flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-none bg-red-500" />
                  Please select a language first
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#161B22] border-r border-b border-red-500/30 rotate-45 -mt-1" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Muted primary green CTA button */}
            <button
              onClick={handleGenerateClick}
              disabled={isProcessing}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 disabled:opacity-50 text-white font-display font-extrabold text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 rounded-none border border-emerald-600/30 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Generating script...
                </>
              ) : (
                <>
                  Generate Transcription
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
