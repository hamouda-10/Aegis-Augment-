import { GeometricLogo } from './GeometricLogo';
import { NAV_ITEMS } from './Navbar';

interface FooterProps {
  onNavigate: (targetId: string, label: string) => void;
  onOpenConnect: () => void;
}

export function Footer({ onNavigate, onOpenConnect }: FooterProps) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-white/10 py-14 px-5 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <GeometricLogo size={20} className="text-white" />
          <div>
            <p className="text-sm font-semibold text-white tracking-tight">Aegis Augment</p>
            <p className="text-xs text-zinc-500">
              Precision Prosthetics & Neural Hardware · Zurich / San Francisco
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.targetId, item.label)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenConnect}
            className="text-white font-semibold hover:text-red-400 transition-colors cursor-pointer"
          >
            Clinical Intake
          </button>
        </div>

        <p className="text-xs text-zinc-500">
          © 2026 Aegis Augment Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
