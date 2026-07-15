import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Play, Maximize2, ExternalLink } from 'lucide-react';

interface ProofOfWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WorkItem {
  id: string;
  title: string;
  category: 'Social Post' | 'Reel' | 'Client Campaign';
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
}

// Placeholder data structure - user will replace with actual work
const PLACEHOLDER_WORK: WorkItem[] = [
  {
    id: '1',
    title: 'Brand Campaign Visual',
    category: 'Client Campaign',
    type: 'image',
    src: '/public/work/placeholder-1.jpg',
  },
  {
    id: '2',
    title: 'Product Launch Reel',
    category: 'Reel',
    type: 'video',
    src: '/public/work/placeholder-2.mp4',
  },
  {
    id: '3',
    title: 'Social Media Post',
    category: 'Social Post',
    type: 'image',
    src: '/public/work/placeholder-3.jpg',
  },
  {
    id: '4',
    title: 'Brand Identity Package',
    category: 'Client Campaign',
    type: 'image',
    src: '/public/work/placeholder-4.jpg',
  },
  {
    id: '5',
    title: 'Promotional Video',
    category: 'Reel',
    type: 'video',
    src: '/public/work/placeholder-5.mp4',
  },
  {
    id: '6',
    title: 'Instagram Story Series',
    category: 'Social Post',
    type: 'image',
    src: '/public/work/placeholder-6.jpg',
  },
];

export default function ProofOfWorkModal({ isOpen, onClose }: ProofOfWorkModalProps) {
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleItemClick = (item: WorkItem) => {
    setSelectedItem(item);
    setIsPlaying(false);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
    setIsPlaying(false);
  };

  const toggleVideoPlay = () => {
    if (selectedItem?.type === 'video') {
      setIsPlaying(!isPlaying);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        id="proof-of-work-modal-overlay"
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target.id === 'proof-of-work-modal-overlay') onClose();
        }}
      >
        <motion.div
          id="proof-of-work-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-[#0B0E14] border border-white/10 rounded-none w-full max-w-6xl overflow-hidden shadow-2xl relative flex flex-col font-sans text-left max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#0E1117] border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#5EEAD4]/10 border border-[#5EEAD4]/30 flex items-center justify-center rounded-none text-[#5EEAD4]">
                <ExternalLink className="w-3 h-3" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-extrabold text-white">
                Proof of Work // Client Gallery
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors duration-150 rounded-none cursor-pointer p-0"
              title="Close modal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body - Gallery Grid */}
          <div className="p-6 overflow-y-auto max-h-[85vh]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white">Client Work Showcase</h3>
                  <p className="text-white/40 text-xs font-light">
                    Social media posts, reels, and campaign deliverables
                  </p>
                </div>
                <div className="font-mono text-[10px] text-white/30">
                  {PLACEHOLDER_WORK.length} ITEMS
                </div>
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PLACEHOLDER_WORK.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      delay: shouldReduceMotion ? 0 : index * 0.1,
                    }}
                    onClick={() => handleItemClick(item)}
                    className="group relative aspect-square bg-[#11151D] border border-white/10 hover:border-[#5EEAD4]/50 rounded-none overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#5EEAD4]/10"
                  >
                    {/* Content Preview */}
                    {item.type === 'image' ? (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="font-mono text-[10px] text-white/30">IMAGE_PLACEHOLDER</span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center relative">
                        <span className="font-mono text-[10px] text-white/30">VIDEO_PLACEHOLDER</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-white translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="space-y-1.5">
                          {/* Category Tag */}
                          <span className="inline-block px-2 py-0.5 bg-[#5EEAD4]/10 border border-[#5EEAD4]/30 text-[#5EEAD4] font-mono text-[9px] uppercase tracking-wider">
                            {item.category}
                          </span>
                          {/* Title */}
                          <p className="text-white font-display font-semibold text-sm truncate">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-black/60 border border-white/20 flex items-center justify-center">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State Message */}
              <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-none text-center">
                <p className="font-mono text-[10px] text-white/40">
                  Add your client work files to <code className="text-[#5EEAD4]">/public/work/</code> and update the placeholder data in this component.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-4"
            onClick={handleCloseLightbox}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all rounded-none cursor-pointer"
                title="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="bg-[#0B0E14] border border-white/10 rounded-none overflow-hidden">
                {selectedItem.type === 'image' ? (
                  <div className="aspect-video bg-white/5 flex items-center justify-center">
                    <span className="font-mono text-sm text-white/30">IMAGE_PLACEHOLDER</span>
                  </div>
                ) : (
                  <div className="aspect-video bg-white/5 flex items-center justify-center relative">
                    <span className="font-mono text-sm text-white/30">VIDEO_PLACEHOLDER</span>
                    <button
                      onClick={toggleVideoPlay}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-black/60 border border-white/20 hover:border-[#5EEAD4]/50 flex items-center justify-center transition-all">
                        {isPlaying ? (
                          <div className="w-4 h-4 bg-white/80 rounded-full" />
                        ) : (
                          <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                        )}
                      </div>
                    </button>
                  </div>
                )}

                {/* Info Bar */}
                <div className="p-4 bg-[#0E1117] border-t border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 bg-[#5EEAD4]/10 border border-[#5EEAD4]/30 text-[#5EEAD4] font-mono text-[9px] uppercase tracking-wider">
                      {selectedItem.category}
                    </span>
                    <h4 className="text-white font-display font-semibold text-sm">
                      {selectedItem.title}
                    </h4>
                  </div>
                  <div className="font-mono text-[10px] text-white/30 uppercase">
                    {selectedItem.type}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
