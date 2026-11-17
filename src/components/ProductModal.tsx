import { useEffect, useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FINISH_OPTIONS, FinishOption, Product } from '../data/catalog';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, finish: FinishOption) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>('Matte Carbon');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setSelectedFinish('Matte Carbon');
    setAddedFeedback(false);
  }, [product?.id]);

  if (!product) return null;

  const finishMeta = FINISH_OPTIONS.find((f) => f.name === selectedFinish) ?? FINISH_OPTIONS[0];
  const finalPrice = product.price + finishMeta.delta;

  const handleAdd = () => {
    onAddToCart(product, selectedFinish);
    setAddedFeedback(true);
    window.setTimeout(() => {
      setAddedFeedback(false);
      onClose();
    }, 650);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdp-modal-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl text-white my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left: Product Image */}
            <div className="md:col-span-6 bg-[#141417] relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 text-[11px] uppercase tracking-[0.14em] text-zinc-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                {product.sku}
              </span>
            </div>

            {/* Right: Contiguous Purchase & Spec Module */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-red-400">
                      {product.category} · {product.availability}
                    </span>
                    <h2
                      id="pdp-modal-title"
                      className="text-xl sm:text-2xl font-semibold text-white mt-1"
                    >
                      {product.name}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close product specification"
                    className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-semibold text-white tabular-nums">
                    ${finalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400">{product.leadTime}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Finish Selector */}
                <div className="mb-6">
                  <span className="block text-[11px] uppercase tracking-[0.12em] text-zinc-400 mb-2.5">
                    Chassis Finish — <span className="text-white">{selectedFinish}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {FINISH_OPTIONS.map((finish) => {
                      const active = selectedFinish === finish.name;
                      return (
                        <button
                          key={finish.name}
                          type="button"
                          onClick={() => setSelectedFinish(finish.name)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all cursor-pointer ${
                            active
                              ? 'border-white bg-white/10 text-white'
                              : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/30'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-white/25"
                            style={{ backgroundColor: finish.swatch }}
                          />
                          <span>{finish.name}</span>
                          {finish.delta > 0 && (
                            <span className="text-[11px] text-zinc-400 tabular-nums">
                              +${finish.delta}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Engineering Specs Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="bg-zinc-900/60 rounded-lg px-3 py-2.5">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-500">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-white tabular-nums">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  addedFeedback
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200 active:scale-[0.99]'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check size={16} /> Added to Bag
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add to Bag — ${finalPrice.toLocaleString()}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
