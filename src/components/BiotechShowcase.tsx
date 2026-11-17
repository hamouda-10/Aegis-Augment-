import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BIOTECH_STAGES } from '../data/catalog';

export function BiotechShowcase() {
  const [activeStageId, setActiveStageId] = useState<string>(BIOTECH_STAGES[0].id);

  const activeStage =
    BIOTECH_STAGES.find((stage) => stage.id === activeStageId) ?? BIOTECH_STAGES[0];

  return (
    <section
      id="biotech"
      className="relative bg-zinc-950 text-white py-20 sm:py-28 px-5 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-red-400 mb-3">
            Biomechanical Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
            Four fused layers between carbon shell and living nerve.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Layer List */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-3">
            {BIOTECH_STAGES.map((stage) => {
              const isSelected = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900/90 border-red-500/50'
                      : 'bg-zinc-900/30 border-white/10 hover:border-white/25 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          isSelected ? 'text-red-400' : 'text-zinc-500'
                        }`}
                      >
                        {stage.index}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {stage.title}
                      </h3>
                    </div>
                    <span className="hidden sm:inline text-[11px] text-zinc-400">
                      {stage.subtitle}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2 pb-4">
                          {stage.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10">
                          {stage.metrics.map((m) => (
                            <div key={m.label}>
                              <span className="block text-[11px] text-zinc-500 mb-0.5">
                                {m.label}
                              </span>
                              <span className="text-sm font-semibold text-white tabular-nums">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Animated Biomechanical Schematic */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#0c0c0f] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                  Interactive Cross-Section
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {activeStage.index} {activeStage.subtitle}
                </p>
              </div>
              <span className="text-xs text-red-400 font-medium tabular-nums">
                Layer {activeStage.index.replace('.', '')} / 04
              </span>
            </div>

            {/* Animated SVG Mechanical Schematic */}
            <div className="relative flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[360px]">
              <svg
                viewBox="0 0 520 340"
                className="w-full h-auto max-h-[340px]"
                aria-label="Animated prosthetic architecture schematic"
              >
                <defs>
                  <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Subtle background grid lines */}
                <g stroke="#ffffff" strokeOpacity="0.06" strokeWidth="0.8">
                  <line x1="20" y1="60" x2="500" y2="60" />
                  <line x1="20" y1="170" x2="500" y2="170" />
                  <line x1="20" y1="280" x2="500" y2="280" />
                  <line x1="140" y1="20" x2="140" y2="320" />
                  <line x1="280" y1="20" x2="280" y2="320" />
                  <line x1="420" y1="20" x2="420" y2="320" />
                </g>

                {/* Central glow */}
                <circle cx="280" cy="170" r="120" fill="url(#coreGlow)" />

                {/* Layer 01: Outer Carbon-Weave Shell */}
                <motion.path
                  d="M 55 110 C 125 98, 200 105, 265 130 L 420 138 C 445 140, 460 155, 460 170 C 460 185, 445 200, 420 202 L 265 210 C 200 235, 125 242, 55 230 Z"
                  fill="none"
                  stroke={activeStageId === 'lattice' ? '#f87171' : '#52525b'}
                  strokeWidth={activeStageId === 'lattice' ? 2.4 : 1.4}
                  animate={{
                    strokeOpacity: activeStageId === 'lattice' ? [0.7, 1, 0.7] : 0.65,
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Carbon cross-hatch struts */}
                <g
                  stroke={activeStageId === 'lattice' ? '#ef4444' : '#3f3f46'}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                >
                  <line x1="95" y1="108" x2="150" y2="232" />
                  <line x1="150" y1="108" x2="95" y2="232" />
                  <line x1="165" y1="112" x2="220" y2="226" />
                  <line x1="220" y1="112" x2="165" y2="226" />
                </g>

                {/* Layer 02: Rotating Harmonic Joint Ring & Titanium Tendons */}
                <g transform="translate(280, 170)">
                  <motion.circle
                    r="44"
                    fill="none"
                    stroke={activeStageId === 'tendons' ? '#f87171' : '#71717a'}
                    strokeWidth={activeStageId === 'tendons' ? 2.5 : 1.5}
                    strokeDasharray="14 8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.circle
                    r="28"
                    fill="none"
                    stroke={activeStageId === 'tendons' ? '#ffffff' : '#a1a1aa'}
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                  />
                  <circle
                    r="11"
                    fill={activeStageId === 'tendons' ? '#ef4444' : '#27272a'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>

                {/* Tendon filaments */}
                <motion.path
                  d="M 80 145 Q 180 140 280 156 T 435 152"
                  fill="none"
                  stroke={activeStageId === 'tendons' ? '#fca5a5' : '#71717a'}
                  strokeWidth={activeStageId === 'tendons' ? 2 : 1.1}
                />
                <motion.path
                  d="M 80 195 Q 180 200 280 184 T 435 188"
                  fill="none"
                  stroke={activeStageId === 'tendons' ? '#fca5a5' : '#71717a'}
                  strokeWidth={activeStageId === 'tendons' ? 2 : 1.1}
                />

                {/* Layer 03: Animated Neural Signal Flow */}
                <motion.path
                  d="M 55 170 L 245 170 M 315 170 L 455 170"
                  fill="none"
                  stroke={activeStageId === 'neural-bus' ? '#ef4444' : '#a1a1aa'}
                  strokeWidth={activeStageId === 'neural-bus' ? 2.8 : 1.6}
                  strokeDasharray="10 12"
                  animate={{ strokeDashoffset: [0, -44] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                />

                {/* Layer 04: Hermetic Bio-Seal Collar */}
                <motion.rect
                  x="40"
                  y="100"
                  width="18"
                  height="140"
                  rx="8"
                  fill="none"
                  stroke={activeStageId === 'bio-seal' ? '#f87171' : '#71717a'}
                  strokeWidth={activeStageId === 'bio-seal' ? 2.6 : 1.5}
                  animate={{
                    scale: activeStageId === 'bio-seal' ? [1, 1.04, 1] : 1,
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '49px 170px' }}
                />

                {/* Telemetry Anchor Nodes */}
                {[
                  { x: 49, y: 170, id: 'bio-seal', label: 'PEEK SEAL' },
                  { x: 160, y: 112, id: 'lattice', label: 'T1100G SHELL' },
                  { x: 280, y: 126, id: 'tendons', label: 'HARMONIC DRIVE' },
                  { x: 395, y: 170, id: 'neural-bus', label: '4kHz BUS' },
                ].map((node) => {
                  const active = activeStageId === node.id;
                  return (
                    <g
                      key={node.id}
                      onClick={() => setActiveStageId(node.id)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={active ? 6 : 4}
                        fill={active ? '#ef4444' : '#ffffff'}
                      />
                      <text
                        x={node.x}
                        y={node.y - 14}
                        textAnchor="middle"
                        fill={active ? '#fca5a5' : '#a1a1aa'}
                        fontSize="9"
                        fontWeight="600"
                        letterSpacing="1.2"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
              <span>Click any schematic node or layer card to inspect tolerances.</span>
              <span className="text-zinc-300 tabular-nums">ISO 10993 · Ti-6Al-4V</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
