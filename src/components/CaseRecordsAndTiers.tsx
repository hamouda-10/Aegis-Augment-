import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { CASE_RECORDS, INTEGRATION_TIERS, IntegrationTier } from '../data/catalog';

interface CaseRecordsAndTiersProps {
  onSelectTier: (tier: IntegrationTier, cadence: 'annual' | 'monthly') => void;
}

export function CaseRecordsAndTiers({ onSelectTier }: CaseRecordsAndTiersProps) {
  const [cadence, setCadence] = useState<'annual' | 'monthly'>('annual');

  return (
    <>
      {/* Clinical Case Records Section */}
      <section
        id="case-records"
        className="relative bg-zinc-950 text-white py-20 sm:py-28 px-5 sm:px-8 lg:px-12 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-red-400 mb-3">
                Verified Field Reports
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
                Documented outcomes across workshops, alpine rescue, and surgery.
              </h2>
            </div>

            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Longitudinal telemetry captured across 12-month member deployments under independent
              clinical review.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {CASE_RECORDS.map((rec, idx) => (
              <motion.article
                key={rec.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col justify-between bg-[#0d0d10] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-white/25 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-400 mb-4">
                    <span>{rec.code}</span>
                    <span>{rec.moduleUsed}</span>
                  </div>

                  <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-4 tabular-nums">
                    {rec.outcomeMetric}
                  </p>

                  <blockquote className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    "{rec.quote}"
                  </blockquote>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-3 py-3.5 px-4 rounded-xl bg-zinc-900/70 border border-white/5 mb-5 text-xs">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">
                        Baseline
                      </span>
                      <span className="text-zinc-400 tabular-nums">{rec.beforeStat}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-red-400 mb-0.5">
                        Verified
                      </span>
                      <span className="text-white font-medium tabular-nums">{rec.afterStat}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm font-semibold text-white">{rec.patientName}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {rec.role} · {rec.organization}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Tiers Section */}
      <section
        id="tiers"
        className="relative bg-[#09090b] text-white py-20 sm:py-28 px-5 sm:px-8 lg:px-12 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-red-400 mb-3">
                Clinical Integration Tiers
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
                Calibration, fitting, and lifecycle support.
              </h2>
            </div>

            {/* Cadence Switch */}
            <div className="inline-flex items-center p-1 bg-zinc-900 border border-white/10 rounded-xl self-start">
              <button
                type="button"
                onClick={() => setCadence('annual')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  cadence === 'annual' ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Annual Fitting
              </button>
              <button
                type="button"
                onClick={() => setCadence('monthly')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  cadence === 'monthly'
                    ? 'bg-white text-zinc-950'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monthly Plan
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {INTEGRATION_TIERS.map((tier, idx) => {
              const price = cadence === 'annual' ? tier.annualPrice : tier.monthlyPrice;
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`flex flex-col justify-between rounded-2xl p-6 sm:p-8 border transition-all ${
                    tier.featured
                      ? 'bg-zinc-900 border-red-500/50 shadow-xl shadow-red-950/20'
                      : 'bg-zinc-950 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                      {tier.featured && (
                        <span className="text-[11px] font-medium text-red-400">
                          Recommended
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">{tier.tagline}</p>

                    <div className="mb-6 pb-6 border-b border-white/10">
                      <span className="text-3xl sm:text-4xl font-semibold text-white tabular-nums">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-xs text-zinc-400 ml-1.5">
                        / {cadence === 'annual' ? 'year' : 'month'}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check size={14} className="text-red-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectTier(tier, cadence)}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      tier.featured
                        ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                        : 'bg-zinc-900 text-white border border-white/15 hover:border-white/40'
                    }`}
                  >
                    <span>{tier.ctaLabel}</span>
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
