import { useMemo, useState } from 'react';
import { motion } from 'motion/react';

type OperatingProfile = 'precision' | 'sprint' | 'reflex';

const PROFILES: {
  id: OperatingProfile;
  label: string;
  baseLatency: number;
  baseBend: number;
  summary: string;
}[] = [
  {
    id: 'precision',
    label: 'Precision Grip',
    baseLatency: 2.1,
    baseBend: 38,
    summary: 'Micro-damped phalanx control for delicate handling and tool work.',
  },
  {
    id: 'sprint',
    label: 'Kinetic Sprint',
    baseLatency: 1.4,
    baseBend: 64,
    summary: 'High-return hydraulic stiffness with rapid energy rebound.',
  },
  {
    id: 'reflex',
    label: 'Zero-Latency Reflex',
    baseLatency: 0.9,
    baseBend: 82,
    summary: 'Predictive EMG burst response with slip-prevention override.',
  },
];

export function LiveDemoLab() {
  const [profile, setProfile] = useState<OperatingProfile>('precision');
  const [torqueGain, setTorqueGain] = useState<number>(68);
  const [samplingHz, setSamplingHz] = useState<number>(640);

  const activeProfile = PROFILES.find((p) => p.id === profile) ?? PROFILES[0];

  const metrics = useMemo(() => {
    const latency = Math.max(0.7, activeProfile.baseLatency - (samplingHz - 120) / 1400);
    const gripForce = Math.round(45 + torqueGain * 1.15);
    const efficiency = Math.min(99, Math.round(82 + (100 - torqueGain) * 0.14 + samplingHz / 220));
    const thermalDelta = (31.4 + torqueGain * 0.085).toFixed(1);
    const articulationDeg = Math.min(
      95,
      Math.round(activeProfile.baseBend * 0.65 + torqueGain * 0.42),
    );
    return {
      latency: latency.toFixed(1),
      gripForce,
      efficiency,
      thermalDelta,
      articulationDeg,
    };
  }, [activeProfile, torqueGain, samplingHz]);

  const wavePath = useMemo(() => {
    const pts: string[] = [];
    const freq = 0.03 + samplingHz / 12000;
    const amp = 14 + (torqueGain / 100) * 30;
    for (let x = 0; x <= 480; x += 8) {
      const envelope = Math.sin((x / 480) * Math.PI);
      const y =
        75 +
        Math.sin(x * freq) * amp * envelope +
        Math.cos(x * freq * 2.1) * (amp * 0.32) * envelope;
      pts.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [torqueGain, samplingHz]);

  const secondaryWavePath = useMemo(() => {
    const pts: string[] = [];
    const freq = 0.022 + samplingHz / 15000;
    const amp = 10 + (torqueGain / 100) * 20;
    for (let x = 0; x <= 480; x += 8) {
      const envelope = Math.sin((x / 480) * Math.PI);
      const y = 75 + Math.cos(x * freq + 0.9) * amp * envelope;
      pts.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [torqueGain, samplingHz]);

  return (
    <section
      id="live-demo"
      className="relative bg-[#09090b] text-white py-20 sm:py-28 px-5 sm:px-8 lg:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-red-400 mb-3">
              Interactive Calibration Lab
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
              Test actuator response and neural gain in real time.
            </h2>
          </div>

          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Adjust torque gain and sampling rate below to preview live neuromuscular waveform
            filtering and joint articulation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-8">
            <div>
              <span className="block text-xs uppercase tracking-[0.12em] text-zinc-400 mb-3">
                Operating Profile
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {PROFILES.map((item) => {
                  const active = profile === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProfile(item.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-white text-zinc-950 border-white'
                          : 'bg-zinc-900/60 text-zinc-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                {activeProfile.summary}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <label htmlFor="torque-slider" className="text-zinc-300 font-medium">
                    Actuator Torque Gain
                  </label>
                  <span className="text-white font-semibold tabular-nums">{torqueGain}%</span>
                </div>
                <input
                  id="torque-slider"
                  type="range"
                  min={20}
                  max={100}
                  value={torqueGain}
                  onChange={(e) => setTorqueGain(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <label htmlFor="sampling-slider" className="text-zinc-300 font-medium">
                    Sensory Sampling Frequency
                  </label>
                  <span className="text-white font-semibold tabular-nums">{samplingHz} Hz</span>
                </div>
                <input
                  id="sampling-slider"
                  type="range"
                  min={120}
                  max={1000}
                  step={20}
                  value={samplingHz}
                  onChange={(e) => setSamplingHz(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Computed Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="block text-[11px] text-zinc-500">Response Latency</span>
                <span className="text-xl font-semibold text-white tabular-nums">
                  {metrics.latency} ms
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-zinc-500">Peak Grip Output</span>
                <span className="text-xl font-semibold text-white tabular-nums">
                  {metrics.gripForce} N
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-zinc-500">Power Efficiency</span>
                <span className="text-xl font-semibold text-white tabular-nums">
                  {metrics.efficiency}%
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-zinc-500">Core Thermal</span>
                <span className="text-xl font-semibold text-white tabular-nums">
                  {metrics.thermalDelta} C
                </span>
              </div>
            </div>
          </div>

          {/* Live Animated Visualizer */}
          <div className="lg:col-span-7 bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            {/* Dual Waveform Plot */}
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-zinc-400 uppercase tracking-[0.12em]">
                  EMG Differential Signal
                </span>
                <span className="text-red-400 tabular-nums">{samplingHz} Hz Active</span>
              </div>

              <div className="bg-[#0d0d11] border border-white/10 rounded-xl p-4 overflow-hidden">
                <svg viewBox="0 0 480 150" className="w-full h-36">
                  <line
                    x1="0"
                    y1="75"
                    x2="480"
                    y2="75"
                    stroke="#ffffff"
                    strokeOpacity="0.08"
                    strokeDasharray="4 4"
                  />
                  <motion.path
                    d={secondaryWavePath}
                    fill="none"
                    stroke="#71717a"
                    strokeWidth="1.4"
                    animate={{ d: secondaryWavePath }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                  <motion.path
                    d={wavePath}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.2"
                    animate={{ d: wavePath }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </svg>
              </div>
            </div>

            {/* Articulated Joint Angle Preview */}
            <div className="flex-1 flex flex-col justify-between bg-[#0d0d11] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-400 uppercase tracking-[0.12em]">
                  Distal Joint Flexion Simulation
                </span>
                <span className="text-white font-semibold tabular-nums">
                  {metrics.articulationDeg} deg
                </span>
              </div>

              <div className="flex items-center justify-center py-2">
                <svg viewBox="0 0 360 150" className="w-full max-w-md h-36">
                  {/* Base Forearm Segment */}
                  <rect
                    x="30"
                    y="92"
                    width="125"
                    height="24"
                    rx="12"
                    fill="#27272a"
                    stroke="#52525b"
                    strokeWidth="1.5"
                  />
                  <circle cx="155" cy="104" r="9" fill="#ef4444" />

                  {/* Articulated Middle Link */}
                  <motion.g
                    animate={{ rotate: -metrics.articulationDeg * 0.55 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                    style={{ originX: '155px', originY: '104px' }}
                  >
                    <rect
                      x="155"
                      y="94"
                      width="88"
                      height="20"
                      rx="10"
                      fill="#3f3f46"
                      stroke="#a1a1aa"
                      strokeWidth="1.5"
                    />
                    <circle cx="243" cy="104" r="7" fill="#ffffff" />

                    {/* Distal Finger / Claw Tip */}
                    <motion.g
                      animate={{ rotate: -metrics.articulationDeg * 0.45 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                      style={{ originX: '243px', originY: '104px' }}
                    >
                      <path
                        d="M 243 96 L 315 100 C 322 100, 322 108, 315 108 L 243 112 Z"
                        fill="#e4e4e7"
                      />
                    </motion.g>
                  </motion.g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
