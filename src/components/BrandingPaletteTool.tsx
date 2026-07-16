import { useState } from 'react';

export default function BrandingPaletteTool() {
  const [sliderValue, setSliderValue] = useState(50);

  const colors = [
    { name: 'Dark Navy/Black', hex: '#07090D' },
    { name: 'Teal/Mint', hex: '#5EEAD4' },
    { name: 'Orange/Amber', hex: '#F5A524' },
    { name: 'White', hex: '#FFFFFF' }
  ];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-6">
        <div className="font-mono text-xs tracking-[0.25em] text-teal-400 font-semibold uppercase mb-2">
          // GRAPHIC & UI SYSTEMS
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight mb-6">
          High-Fidelity Branding Systems
        </h2>
      </div>

      {/* Compact Card (left-aligned) */}
      <div className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
        {/* Client Header Info */}
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          {/* Avatar with teal-to-amber gradient and bold initials 'AA' */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-300 via-teal-400 to-amber-500 flex items-center justify-center font-mono text-zinc-950 font-bold text-lg shadow-md tracking-wider">
            AA
          </div>
          <div>
            <h3 className="text-white font-bold text-base tracking-wide">
              Ambit Arch
            </h3>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
              CLIENT_ID: 9811
            </p>
          </div>
        </div>

        {/* Brand Palette CONFIG */}
        <div>
          <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-3 font-semibold">
            BRAND PALETTE CONFIG
          </div>
          <div className="flex items-center gap-3">
            {colors.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 group">
                <div 
                  className="w-10 h-10 rounded-lg border border-white/10 shadow-sm transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                  title={`${color.name}: ${color.hex}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Grid Scaling Slider */}
        <div className="flex flex-col gap-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
              GRID SCALING (ALGEBRA)
            </span>
            <span className="text-sm text-amber-500 font-bold">
              {sliderValue}%
            </span>
          </div>

          {/* Interactive Range Slider */}
          <div className="relative flex items-center mt-1">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer focus:outline-none accent-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

