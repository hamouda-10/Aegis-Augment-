import { FormEvent, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FINISH_OPTIONS, FinishOption, Product } from '../data/catalog';

export interface CartItem {
  key: string;
  product: Product;
  finish: FinishOption;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderId: string;
    total: number;
    email: string;
  } | null>(null);

  const getItemUnitPrice = (item: CartItem) => {
    const finishDelta = FINISH_OPTIONS.find((f) => f.name === item.finish)?.delta ?? 0;
    return item.product.price + finishDelta;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + getItemUnitPrice(item) * item.quantity,
    0,
  );
  const clinicCalibrationFee = subtotal > 0 ? 0 : 0;
  const total = subtotal + clinicCalibrationFee;

  const handleCheckout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || items.length === 0) return;

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setOrderConfirmation({
      orderId: `AG-${randomCode}`,
      total,
      email: customerEmail.trim(),
    });
    onClearCart();
  };

  const handleClose = () => {
    setOrderConfirmation(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Hardware allocation bag"
            className="relative z-10 w-full max-w-md bg-zinc-950 border-l border-white/15 text-white flex flex-col h-full shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-red-400" />
                <h2 className="text-base font-semibold tracking-tight">Hardware Allocation Bag</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close bag"
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {orderConfirmation ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center"
                >
                  <CheckCircle2 size={42} className="text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Order #{orderConfirmation.orderId} Confirmed
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    Fabrication and biometric scan scheduling have been dispatched to{' '}
                    <span className="text-white">{orderConfirmation.email}</span>.
                  </p>
                  <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 text-left mb-6">
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>Allocation Total</span>
                      <span className="text-white font-semibold tabular-nums">
                        ${orderConfirmation.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Status</span>
                      <span className="text-red-400">Preparing Fabrication</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full bg-white text-zinc-950 text-xs font-semibold py-3 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Return to Storefront
                  </button>
                </motion.div>
              ) : items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-zinc-300 mb-2">Your allocation bag is empty.</p>
                  <p className="text-xs text-zinc-500">
                    Select any prosthetic, neural, or optical module from the catalog to begin.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const unitPrice = getItemUnitPrice(item);
                      return (
                        <motion.div
                          key={item.key}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-4 p-3.5 rounded-xl bg-zinc-900/70 border border-white/10"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-20 h-20 rounded-lg object-cover bg-zinc-900 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-xs font-semibold text-white truncate">
                                {item.product.name}
                              </h3>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.key)}
                                aria-label={`Remove ${item.product.name}`}
                                className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="text-[11px] text-zinc-400 mt-0.5">{item.finish}</p>

                            <div className="flex items-center justify-between mt-3">
                              <div className="inline-flex items-center border border-white/15 rounded-full">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(item.key, -1)}
                                  aria-label="Decrease quantity"
                                  className="p-1.5 text-zinc-300 hover:text-white cursor-pointer"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-2 text-xs tabular-nums">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(item.key, 1)}
                                  aria-label="Increase quantity"
                                  className="p-1.5 text-zinc-300 hover:text-white cursor-pointer"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              <span className="text-xs font-semibold text-white tabular-nums">
                                ${(unitPrice * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Checkout Form */}
            {items.length > 0 && !orderConfirmation && (
              <form
                onSubmit={handleCheckout}
                className="px-6 py-5 border-t border-white/10 bg-zinc-950 space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Insured Clinical Courier</span>
                  <span className="text-white">Complimentary</span>
                </div>
                <div className="flex items-center justify-between text-sm font-semibold pb-2 border-b border-white/10">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${total.toLocaleString()}</span>
                </div>

                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  aria-label="Full name"
                  className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Email address"
                    aria-label="Email address"
                    className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="text"
                    required
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    placeholder="City / Clinic Hub"
                    aria-label="City or clinic hub"
                    className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-zinc-950 text-xs font-semibold py-3 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Confirm Hardware Order — ${total.toLocaleString()}
                </button>
              </form>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
