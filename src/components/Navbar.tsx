import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GeometricLogo } from './GeometricLogo';

export interface NavItem {
  label: string;
  targetId: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Module', targetId: 'modules' },
  { label: 'Case Records', targetId: 'case-records' },
  { label: 'Biotech', targetId: 'biotech' },
  { label: 'Tiers', targetId: 'tiers' },
  { label: 'Live Demo', targetId: 'live-demo' },
];

interface NavbarProps {
  activeSection: string;
  cartCount: number;
  onNavigate: (targetId: string, label: string) => void;
  onOpenCart: () => void;
  onOpenConnect: () => void;
}

export function Navbar({
  activeSection,
  cartCount,
  onNavigate,
  onOpenCart,
  onOpenConnect,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (item: NavItem) => {
    onNavigate(item.targetId, item.label);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center p-4 sm:p-5">
        {/* Desktop centered pill */}
        <div className="hidden md:flex bg-black/60 backdrop-blur-md border border-white/10 rounded-full pl-3 pr-2 py-2 items-center gap-1 nav-drop">
          <button
            type="button"
            onClick={() => onNavigate('hero', 'Module')}
            className="flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <GeometricLogo />
          </button>

          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleLinkClick(item)}
                className={`relative text-sm font-medium px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full text-gray-200 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={`Open hardware bag (${cartCount} items)`}
          >
            <ShoppingBag size={15} />
            <span className="tabular-nums text-xs">{cartCount}</span>
          </button>

          <button
            type="button"
            onClick={onOpenConnect}
            className="bg-white text-gray-900 text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-gray-100 ml-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Connect
          </button>
        </div>

        {/* Mobile left logo pill */}
        <button
          type="button"
          onClick={() => {
            onNavigate('hero', 'Module');
            setMobileMenuOpen(false);
          }}
          className="md:hidden bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-2.5 flex items-center justify-center nav-drop cursor-pointer"
          aria-label="Scroll to top"
        >
          <GeometricLogo />
        </button>

        {/* Mobile right controls */}
        <div className="md:hidden flex items-center gap-2 nav-drop">
          <button
            type="button"
            onClick={onOpenCart}
            className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-2.5 flex items-center gap-1.5 text-white cursor-pointer"
            aria-label={`Open hardware bag (${cartCount} items)`}
          >
            <ShoppingBag size={18} />
            <span className="text-xs font-semibold tabular-nums">{cartCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-2.5 flex items-center justify-center text-white cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-width dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-40 bg-white pt-16 pb-6 px-5 shadow-lg md:hidden"
          >
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleLinkClick(item)}
                  className={`text-left text-sm py-3 border-b border-gray-100 transition-colors cursor-pointer ${
                    activeSection === item.label
                      ? 'text-gray-950 font-semibold'
                      : 'text-gray-800 font-medium'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConnect();
                }}
                className="mt-5 w-full bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
