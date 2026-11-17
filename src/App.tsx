import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BiotechShowcase } from './components/BiotechShowcase';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CaseRecordsAndTiers } from './components/CaseRecordsAndTiers';
import { ConnectModal, ConnectModalContext } from './components/ConnectModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LiveDemoLab } from './components/LiveDemoLab';
import { NAV_ITEMS, Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { FinishOption, IntegrationTier, PRODUCTS, Product } from './data/catalog';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('Module');
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [connectContext, setConnectContext] = useState<ConnectModalContext | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Track active section in viewport for pill highlight
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => ({
      label: item.label,
      el: document.getElementById(item.targetId),
    })).filter((s): s is { label: string; el: HTMLElement } => s.el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const matched = sections.find((s) => s.el === visible[0].target);
          if (matched) setActiveSection(matched.label);
        }
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((targetId: string, label: string) => {
    setActiveSection(label);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleAddToCart = useCallback((product: Product, finish: FinishOption) => {
    const key = `${product.id}__${finish}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { key, product, finish, quantity: 1 }];
    });

    setToastMessage(`${product.name} (${finish}) added to bag`);
    window.setTimeout(() => {
      setToastMessage((curr) =>
        curr === `${product.name} (${finish}) added to bag` ? null : curr,
      );
    }, 2600);
  }, []);

  const handleUpdateQty = useCallback((key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const handleRemoveItem = useCallback((key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleSelectTier = useCallback(
    (tier: IntegrationTier, cadence: 'annual' | 'monthly') => {
      const price = cadence === 'annual' ? tier.annualPrice : tier.monthlyPrice;
      setConnectContext({
        title: `Reserve ${tier.name}`,
        subtitle: `$${price.toLocaleString()} / ${cadence} · Biometric scan & calibration intake`,
      });
    },
    [],
  );

  return (
    <div
      className="min-h-screen bg-[#09090b] text-white tracking-[-0.02em]"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <Navbar
        activeSection={activeSection}
        cartCount={totalCartCount}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartOpen(true)}
        onOpenConnect={() =>
          setConnectContext({
            title: 'Connect With Clinical Team',
            subtitle: 'Consultation, 3D biometric scan & hardware allocation',
          })
        }
      />

      <main>
        <HeroSection
          onReserveClick={() =>
            setConnectContext({
              title: 'Reserve Priority Allocation',
              subtitle: 'Schedule your custom carbon-titanium module fitting',
            })
          }
          onExploreModules={() => handleNavigate('modules', 'Module')}
        />

        <ProductCatalog
          products={PRODUCTS}
          onInspectProduct={(product) => setInspectedProduct(product)}
          onAddToCart={handleAddToCart}
        />

        <BiotechShowcase />

        <LiveDemoLab />

        <CaseRecordsAndTiers onSelectTier={handleSelectTier} />
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenConnect={() =>
          setConnectContext({
            title: 'Clinical Intake & Support',
            subtitle: 'Zurich & San Francisco biomechanical fitting centers',
          })
        }
      />

      {/* Product Specification & Finish Modal */}
      <ProductModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Hardware Allocation Bag */}
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Consultation / Tier Modal */}
      <ConnectModal
        context={connectContext}
        onClose={() => setConnectContext(null)}
      />

      {/* Cart Feedback Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-3 bg-zinc-900 border border-white/15 text-white px-4 py-3 rounded-xl shadow-2xl text-xs"
          >
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => {
                setToastMessage(null);
                setCartOpen(true);
              }}
              className="text-red-400 font-semibold hover:text-red-300 cursor-pointer whitespace-nowrap"
            >
              View Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
