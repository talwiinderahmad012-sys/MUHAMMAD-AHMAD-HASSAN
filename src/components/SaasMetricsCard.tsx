import { motion } from 'motion/react';

export default function SaasMetricsCard() {
  const sparklineHeights = [30, 45, 35, 60, 80, 55, 70, 40, 65, 75, 90, 50, 70, 85, 99.4];

  return (
    <div className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-5 md:p-6">
      {/* Small monospace tag above heading */}
      <div className="font-mono text-xs tracking-[0.25em] text-teal-400 font-semibold uppercase mb-1.5">
        // WEB ENGINEERING
      </div>
      {/* Large heading */}
      <h2 className="font-display font-bold text-lg md:text-xl text-white tracking-tight mb-4">
        Interactive SaaS Architecture
      </h2>

      {/* 2-column metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-900/40 border border-white/5 rounded-xl font-mono">
        {/* Left Column: CACHE_HIT_RATE */}
        <div className="flex flex-col justify-between p-4 bg-zinc-950/60 border border-white/5 rounded-lg">
          <div>
            <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1 font-semibold">
              CACHE_HIT_RATE
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                99.4%
              </span>
              <span className="text-[9px] text-green-400 font-semibold bg-green-500/10 px-1 py-0.5 rounded">
                +1.3%
              </span>
            </div>
          </div>
          
          {/* Sparkline trend chart */}
          <div className="flex items-end gap-0.5 h-8 w-full mt-4">
            {sparklineHeights.map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-teal-400/80 hover:bg-teal-400 transition-colors rounded-sm"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.6, delay: i * 0.02, ease: 'easeOut' }}
              />
            ))}
          </div>
        </div>

        {/* Right Column: LATENCY */}
        <div className="flex flex-col justify-between p-4 bg-zinc-950/60 border border-white/5 rounded-lg">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">
                LATENCY
              </span>
              <span className="text-[9px] text-white/30 font-semibold uppercase">
                EDGE_COMP
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl md:text-2xl font-bold text-amber-500 tracking-tight">
                14.2ms
              </span>
            </div>
          </div>

          {/* Underline progress bar in amber */}
          <div className="w-full mt-auto pt-4">
            <div className="w-full h-1 bg-zinc-800/80 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Small monospace footer labels spaced apart */}
      <div className="flex items-center justify-between mt-4 font-mono text-[9px] text-white/40 border-t border-white/5 pt-3">
        <span>REPLICAS: x3 SERVERLESS</span>
        <span>SECURE: JWT / TLS1.3</span>
      </div>
    </div>
  );
}


