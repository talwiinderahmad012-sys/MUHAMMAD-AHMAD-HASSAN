import { motion } from 'motion/react';
import { Activity, Zap, Server } from 'lucide-react';

export default function SaasMetricsCard() {
  return (
    <div className="w-full bg-zinc-950 border border-white/10 rounded-none p-6 md:p-8">
      {/* Section Header */}
      <div className="mb-6">
        <div className="font-mono text-[10px] tracking-[0.25em] text-teal-400 font-semibold uppercase mb-2">
          // WEB ENGINEERING
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
          Interactive SaaS Architecture
        </h2>
      </div>

      {/* Terminal-style Metrics Dashboard */}
      <div className="bg-zinc-900 border border-white/5 rounded-none p-5 md:p-6 font-mono">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-[10px] text-white/30 tracking-wider">
            SERVER_METRICS // LIVE
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cache Hit Rate */}
          <div className="bg-zinc-800/50 border border-white/5 rounded-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-teal-400" />
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                CACHE_HIT_RATE
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-white">
                99.4
              </span>
              <span className="text-lg text-white/60">%</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] text-green-400 font-semibold">
                +1.3%
              </span>
              <span className="text-[9px] text-white/30">
                vs last hour
              </span>
            </div>
          </div>

          {/* Latency */}
          <div className="bg-zinc-800/50 border border-white/5 rounded-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                LATENCY
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-amber-400">
                14.2
              </span>
              <span className="text-lg text-white/60">ms</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] text-green-400 font-semibold">
                -0.8ms
              </span>
              <span className="text-[9px] text-white/30">
                improvement
              </span>
            </div>
          </div>

          {/* Active Connections */}
          <div className="bg-zinc-800/50 border border-white/5 rounded-none p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-teal-400" />
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                ACTIVE_CONN
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-white">
                2.4k
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] text-teal-400 font-semibold">
                +12%
              </span>
              <span className="text-[9px] text-white/30">
                traffic spike
              </span>
            </div>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">
              SYSTEM_LOAD
            </span>
            <span className="text-[10px] text-teal-400 font-mono">
              67%
            </span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-none overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: '67%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
