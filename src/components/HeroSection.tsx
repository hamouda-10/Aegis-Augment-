import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_125121_afb71ce9-9c64-4c54-90b5-c89c0764c052.png&w=1920&q=85';

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_135737_0da59642-725b-451a-997b-b0283d95a42a.png&w=1280&q=85';

interface ArcStat {
  radius: number;
  startDeg: number;
  endDeg: number;
  dotDeg: number;
  value: string;
  suffix: string;
  label: string;
}

const ARC_CENTER_X = -110;
const ARC_CENTER_Y = 300;
const SPOTLIGHT_RADIUS = 260;

const ARC_STATS: ArcStat[] = [
  {
    radius: 330,
    startDeg: -92,
    endDeg: 16,
    dotDeg: -46,
    value: '10',
    suffix: '+',
    label: 'YEARS REAL',
  },
  {
    radius: 395,
    startDeg: -56,
    endDeg: 60,
    dotDeg: 2,
    value: '40',
    suffix: '+',
    label: 'USE FORMS',
  },
  {
    radius: 460,
    startDeg: -14,
    endDeg: 72,
    dotDeg: 44,
    value: '95',
    suffix: '%',
    label: 'REPEAT MEMBERS',
  },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

interface HeroSectionProps {
  onReserveClick: () => void;
  onExploreModules: () => void;
}

export function HeroSection({ onReserveClick, onExploreModules }: HeroSectionProps) {
  const revealLayerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridPatternRef = useRef<SVGPatternElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const revealEl = revealLayerRef.current;
    if (!canvas || !revealEl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targetCursor = { x: -999, y: -999 };
    const smoothCursor = { x: -999, y: -999 };
    const targetGrid = { x: 0, y: 0 };
    const smoothGrid = { x: 0, y: 0 };

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const handleMouseMove = (e: MouseEvent) => {
      targetCursor.x = e.clientX;
      targetCursor.y = e.clientY;

      const normX = window.innerWidth > 0 ? e.clientX / window.innerWidth : 0.5;
      const normY = window.innerHeight > 0 ? e.clientY / window.innerHeight : 0.5;
      targetGrid.x = (normX - 0.5) * 16;
      targetGrid.y = (normY - 0.5) * 16;
    };

    const handleMouseLeave = () => {
      targetCursor.x = -999;
      targetCursor.y = -999;
      targetGrid.x = 0;
      targetGrid.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateCanvasSize);

    let rafId = 0;
    let lastDrawnX = Number.NaN;
    let lastDrawnY = Number.NaN;

    const renderFrame = () => {
      const cursorLerp = prefersReducedMotion ? 1 : 0.1;
      const gridLerp = prefersReducedMotion ? 1 : 0.06;

      smoothCursor.x += (targetCursor.x - smoothCursor.x) * cursorLerp;
      smoothCursor.y += (targetCursor.y - smoothCursor.y) * cursorLerp;

      smoothGrid.x += (targetGrid.x - smoothGrid.x) * gridLerp;
      smoothGrid.y += (targetGrid.y - smoothGrid.y) * gridLerp;

      if (gridPatternRef.current) {
        gridPatternRef.current.setAttribute('x', smoothGrid.x.toFixed(2));
        gridPatternRef.current.setAttribute('y', smoothGrid.y.toFixed(2));
      }

      const movedEnough =
        Number.isNaN(lastDrawnX) ||
        Math.abs(smoothCursor.x - lastDrawnX) > 0.15 ||
        Math.abs(smoothCursor.y - lastDrawnY) > 0.15;

      if (movedEnough && canvas.width > 0 && canvas.height > 0) {
        lastDrawnX = smoothCursor.x;
        lastDrawnY = smoothCursor.y;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const grad = ctx.createRadialGradient(
          smoothCursor.x,
          smoothCursor.y,
          0,
          smoothCursor.x,
          smoothCursor.y,
          SPOTLIGHT_RADIUS,
        );
        grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        grad.addColorStop(0.4, 'rgba(0, 0, 0, 1)');
        grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.75)');
        grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.4)');
        grad.addColorStop(0.88, 'rgba(0, 0, 0, 0.12)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(smoothCursor.x, smoothCursor.y, SPOTLIGHT_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        const maskUrl = `url(${canvas.toDataURL()})`;
        revealEl.style.maskImage = maskUrl;
        revealEl.style.webkitMaskImage = maskUrl;
        revealEl.style.maskSize = '100% 100%';
        revealEl.style.webkitMaskSize = '100% 100%';
        revealEl.style.maskRepeat = 'no-repeat';
        revealEl.style.webkitMaskRepeat = 'no-repeat';
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <section id="hero" className="relative h-[100dvh] w-full overflow-hidden bg-[#1a0406]">
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* Layer 1: Grid background (z-0) */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ opacity: 0.1 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            ref={gridPatternRef}
            id="cyber-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cyber-grid-pattern)" />
      </svg>

      {/* Layer 2: Base red-tinted portrait with Ken Burns intro (z-10) */}
      <div
        className="absolute inset-0 z-10 bg-center bg-cover ken-burns"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        aria-hidden="true"
      />

      {/* Layer 3: Cursor spotlight reveal layer (z-30) */}
      <div
        ref={revealLayerRef}
        className="absolute inset-0 z-30 bg-center bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${BG_IMAGE_2})`,
          maskImage: 'radial-gradient(circle 0px at -999px -999px, black, transparent)',
          WebkitMaskImage: 'radial-gradient(circle 0px at -999px -999px, black, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Scrim for readable typography (z-40) */}
      <div
        className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-tr from-black/55 via-black/15 to-transparent"
        aria-hidden="true"
      />

      {/* Layer 4: Stats on a fading circular arc (z-50) */}
      <div className="hidden sm:block absolute inset-y-0 right-0 z-50 pointer-events-none">
        <svg
          viewBox="0 0 380 700"
          preserveAspectRatio="xMaxYMid meet"
          className="h-full w-auto"
          aria-hidden="true"
        >
          <defs>
            {ARC_STATS.map((stat, idx) => {
              const startPt = polarToCartesian(
                ARC_CENTER_X,
                ARC_CENTER_Y,
                stat.radius,
                stat.startDeg,
              );
              const endPt = polarToCartesian(
                ARC_CENTER_X,
                ARC_CENTER_Y,
                stat.radius,
                stat.endDeg,
              );
              return (
                <linearGradient
                  key={stat.label}
                  id={`arc-grad-${idx}`}
                  gradientUnits="userSpaceOnUse"
                  x1={startPt.x}
                  y1={startPt.y}
                  x2={endPt.x}
                  y2={endPt.y}
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="22%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="85%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              );
            })}
          </defs>

          {ARC_STATS.map((stat, i) => {
            const startPt = polarToCartesian(
              ARC_CENTER_X,
              ARC_CENTER_Y,
              stat.radius,
              stat.startDeg,
            );
            const endPt = polarToCartesian(ARC_CENTER_X, ARC_CENTER_Y, stat.radius, stat.endDeg);
            const dotPt = polarToCartesian(ARC_CENTER_X, ARC_CENTER_Y, stat.radius, stat.dotDeg);

            const arcLength = stat.radius * (((stat.endDeg - stat.startDeg) * Math.PI) / 180);
            const lineDelay = 0.4 + i * 0.22;
            const markDelay = lineDelay + 0.9;
            const d = `M ${startPt.x.toFixed(2)} ${startPt.y.toFixed(2)} A ${stat.radius} ${stat.radius} 0 0 1 ${endPt.x.toFixed(2)} ${endPt.y.toFixed(2)}`;

            return (
              <g key={stat.label}>
                <path
                  d={d}
                  fill="none"
                  stroke={`url(#arc-grad-${i})`}
                  strokeWidth={1.1}
                  className="arc-line"
                  style={
                    {
                      '--len': arcLength.toFixed(2),
                      animationDelay: `${lineDelay.toFixed(2)}s`,
                    } as React.CSSProperties
                  }
                />

                <circle
                  cx={dotPt.x}
                  cy={dotPt.y}
                  r={7}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={1}
                  className="arc-ring"
                  style={{ animationDelay: `${(markDelay + 0.3).toFixed(2)}s` }}
                />

                <circle
                  cx={dotPt.x}
                  cy={dotPt.y}
                  r={3.4}
                  fill="#ffffff"
                  className="arc-dot"
                  style={{ animationDelay: `${markDelay.toFixed(2)}s` }}
                />

                <text
                  x={dotPt.x + 16}
                  y={dotPt.y + 4}
                  fill="#ffffff"
                  fontSize={32}
                  fontWeight={500}
                  className="arc-text tabular-nums"
                  style={{ animationDelay: `${(markDelay + 0.15).toFixed(2)}s` }}
                >
                  {stat.value}
                  <tspan fontSize={19} dy={-10} style={{ letterSpacing: '-1px' }}>
                    {stat.suffix}
                  </tspan>
                </text>

                <text
                  x={dotPt.x + 18}
                  y={dotPt.y + 22}
                  fill="#ffffff"
                  fillOpacity={0.8}
                  fontSize={8.5}
                  fontWeight={600}
                  style={{
                    letterSpacing: '2px',
                    animationDelay: `${(markDelay + 0.3).toFixed(2)}s`,
                  }}
                  className="arc-text"
                >
                  {stat.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Layer 5: Hero text block (z-50) */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-24 left-5 sm:left-8 md:left-12 z-50 max-w-[300px] sm:max-w-md">
        <p
          className="hero-rise text-[11px] sm:text-xs font-semibold tracking-[0.12em] text-white/90 mb-3"
          style={{ animationDelay: '0.15s' }}
        >
          Gateway to your <span className="italic font-normal">augmented self</span>
        </p>

        <h1
          className="hero-rise text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.08em] text-white mb-4"
          style={{ animationDelay: '0.3s' }}
        >
          A window
          <br />
          of coming
          <br />
          enhancements
        </h1>

        <p
          className="hero-rise text-sm sm:text-base text-white/90 leading-relaxed mb-7"
          style={{ animationDelay: '0.5s' }}
        >
          A future where carbon fiber, titanium, and human instinct align. Not machine. Not human.
          Something wonderfully poised between.
        </p>

        <div className="hero-rise flex flex-wrap items-center gap-3" style={{ animationDelay: '0.7s' }}>
          <button
            type="button"
            onClick={onReserveClick}
            className="group relative overflow-hidden bg-white text-gray-900 text-sm font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-[1.04] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span className="relative z-10">Reserve Now</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </button>

          <button
            type="button"
            onClick={onExploreModules}
            className="text-xs sm:text-sm font-medium text-white/85 hover:text-white px-4 py-3 rounded-full border border-white/25 hover:border-white/50 bg-black/30 backdrop-blur-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            Explore Modules
          </button>
        </div>
      </div>

      {/* Subtle scroll cue */}
      <motion.button
        type="button"
        onClick={onExploreModules}
        aria-label="Scroll to hardware modules"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-50 items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-black/35 backdrop-blur-sm text-white/75 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
      >
        <ArrowDown size={15} />
      </motion.button>
    </section>
  );
}
