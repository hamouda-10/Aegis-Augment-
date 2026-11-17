import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FinishOption, Product, ProductCategory } from '../data/catalog';

const CATEGORIES: ProductCategory[] = ['All', 'Prosthetics', 'Neural', 'Optics', 'Chassis'];

type SortMode = 'featured' | 'price-asc' | 'price-desc';

interface ProductCatalogProps {
  products: Product[];
  onInspectProduct: (product: Product) => void;
  onAddToCart: (product: Product, finish: FinishOption) => void;
}

export function ProductCatalog({
  products,
  onInspectProduct,
  onAddToCart,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const base = products.filter((p) => {
      const catMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const textMatch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query);
      return catMatch && textMatch;
    });

    if (sortMode === 'price-asc') {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (sortMode === 'price-desc') {
      return [...base].sort((a, b) => b.price - a.price);
    }
    return base;
  }, [products, selectedCategory, searchQuery, sortMode]);

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, 'Matte Carbon');
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);
  };

  return (
    <section id="modules" className="relative bg-[#09090b] text-white py-20 sm:py-28 px-5 sm:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-red-400 mb-3">
              Hardware Suite
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
              Precision augmentation modules built for daily human motion.
            </h2>
          </div>

          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Every assembly ships calibrated to your biomechanical scan with Grade-5 titanium
            fasteners and modular NeuraSync bus connectors.
          </p>
        </motion.div>

        {/* Filter Bar + Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-white/10">
          {/* Category Segmented Tabs with shared layoutId */}
          <div
            role="tablist"
            aria-label="Filter modules by category"
            className="flex flex-wrap items-center gap-1 p-1 bg-zinc-900/90 border border-white/10 rounded-xl"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeCategoryBg"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-white rounded-lg"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-56">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SKU or module..."
                aria-label="Search modules"
                className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/35 transition-colors"
              />
            </div>

            <div className="relative flex items-center">
              <SlidersHorizontal
                size={14}
                className="absolute left-3 text-zinc-500 pointer-events-none"
              />
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                aria-label="Sort modules"
                className="bg-zinc-900 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-white/35 cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border border-white/10 rounded-2xl bg-zinc-900/40">
            <p className="text-sm text-zinc-300 mb-3">No modules match your current filter.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => {
                const isAdded = justAddedId === product.id;
                const imgFailed = failedImages[product.id];

                return (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.45,
                      delay: (index % 3) * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex flex-col bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* Image Stage (~68% visual weight, uniform 4:3) */}
                    <button
                      type="button"
                      onClick={() => onInspectProduct(product)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-[#141417] text-left cursor-pointer"
                    >
                      {imgFailed ? (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-red-950/40 p-6">
                          <span className="text-xs text-zinc-400">{product.name}</span>
                        </div>
                      ) : (
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [product.id]: true }))
                          }
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}

                      {/* Subtle bottom gradient for clean boundary */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950/90 to-transparent pointer-events-none"
                      />

                      <span className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-zinc-400">
                        {product.sku}
                      </span>
                      <span className="absolute bottom-3 right-4 text-[11px] text-zinc-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Inspect <ArrowUpRight size={13} />
                      </span>
                    </button>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.12em] text-zinc-400 mb-2">
                        <span>{product.category}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-300">{product.availability}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-1.5">
                        {product.name}
                      </h3>

                      <p className="text-xs text-zinc-400 leading-relaxed mb-5 flex-1">
                        {product.summary}
                      </p>

                      {/* Bottom Row: Tabular Price + Actions */}
                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                        <div>
                          <span className="text-base font-semibold text-white tabular-nums">
                            ${product.price.toLocaleString()}
                          </span>
                          <span className="block text-[11px] text-zinc-500">
                            {product.leadTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onInspectProduct(product)}
                            className="px-3 py-2 rounded-full border border-white/15 text-xs font-medium text-zinc-200 hover:border-white/40 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Specs
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuickAdd(product)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                              isAdded
                                ? 'bg-red-600 text-white'
                                : 'bg-white text-zinc-950 hover:bg-zinc-200 active:scale-95'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check size={14} /> Added
                              </>
                            ) : (
                              <>
                                <Plus size={14} /> Add to Bag
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
