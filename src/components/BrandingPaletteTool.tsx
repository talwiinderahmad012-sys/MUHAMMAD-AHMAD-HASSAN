import { useState } from 'react';
import { motion } from 'motion/react';
import { Palette, Sliders } from 'lucide-react';

export default function BrandingPaletteTool() {
  const [sliderValue, setSliderValue] = useState(75);
  const [selectedColor, setSelectedColor] = useState('#5EEAD4');

  const brandColors = [
    { name: 'Primary', value: '#5EEAD4', label: 'Cyan Accent' },
    { name: 'Secondary', value: '#F5A524', label: 'Amber Accent' },
    { name: 'Neutral', value: '#8FA3AE', label: 'Slate Gray' },
    { name: 'Dark', value: '#0B0E14', label: 'Deep Black' },
  ];

  return (
    <div className="w-full bg-zinc-950 border border-white/10 rounded-none p-6 md:p-8">
      {/* Section Header */}
      <div className="mb-6">
        <div className="font-mono text-[10px] tracking-[0.25em] text-teal-400 font-semibold uppercase mb-2">
          // GRAPHIC & UI SYSTEMS
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
          High-Fidelity Branding Systems
        </h2>
      </div>

      <div className="space-y-6">
        {/* Brand Block: Ambit Arch */}
        <div className="bg-zinc-900 border border-white/5 rounded-none p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-teal-400" />
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
              BRAND_BLOCK // AMBIT_ARCH
            </span>
          </div>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {brandColors.map((color, idx) => (
              <motion.div
                key={idx}
                className="cursor-pointer group"
                onClick={() => setSelectedColor(color.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="aspect-square rounded-none border-2 transition-all duration-200 mb-2"
                  style={{
                    backgroundColor: color.value,
                    borderColor: selectedColor === color.value ? '#00f2fe' : 'transparent',
                  }}
                />
                <div className="text-[10px] font-mono text-white/60 text-center">
                  {color.name}
                </div>
                <div className="text-[9px] font-mono text-white/30 text-center">
                  {color.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Color Preview */}
          <div className="bg-zinc-800/50 border border-white/5 rounded-none p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                SELECTED_COLOR
              </span>
              <span className="font-mono text-xs text-teal-400">
                {selectedColor}
              </span>
            </div>
            <div
              className="w-full h-16 rounded-none border border-white/10"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="bg-zinc-900 border border-white/5 rounded-none p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-4 h-4 text-teal-400" />
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
              OPACITY_ADJUSTMENT
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                VALUE
              </span>
              <span className="font-mono text-lg text-teal-400">
                {sliderValue}%
              </span>
            </div>

            {/* Custom Slider */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-none appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00f2fe 0%, #00f2fe ${sliderValue}%, #27272a ${sliderValue}%, #27272a 100%)`,
                }}
              />
              {/* Custom Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-teal-400 rounded-none border-2 border-white shadow-lg pointer-events-none transition-all duration-150"
                style={{ left: `calc(${sliderValue}% - 10px)` }}
              />
            </div>

            {/* Preview with Opacity */}
            <div className="mt-4">
              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
                PREVIEW
              </div>
              <div
                className="w-full h-12 rounded-none border border-white/10 relative overflow-hidden"
                style={{ backgroundColor: selectedColor }}
              >
                <div
                  className="absolute inset-0 bg-zinc-950"
                  style={{ opacity: (100 - sliderValue) / 100 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
