import { FormEvent, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export interface ConnectModalContext {
  title: string;
  subtitle: string;
}

interface ConnectModalProps {
  context: ConnectModalContext | null;
  onClose: () => void;
}

export function ConnectModal({ context, onClose }: ConnectModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!context) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-modal-heading"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-zinc-950 border border-white/15 rounded-2xl p-6 text-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2 id="connect-modal-heading" className="text-lg font-semibold tracking-tight">
                {context.title}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">{context.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close dialog"
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="py-4 text-center">
              <CheckCircle2 size={36} className="text-red-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-white mb-1.5">
                Consultation Request Logged
              </p>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                Our biomechanics intake team will contact <span className="text-white">{email}</span>{' '}
                within 24 hours with scan center scheduling.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="w-full bg-white text-zinc-950 text-xs font-semibold py-2.5 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label htmlFor="connect-name" className="block text-xs text-zinc-300 mb-1.5">
                  Full name
                </label>
                <input
                  id="connect-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/45"
                />
              </div>

              <div>
                <label htmlFor="connect-email" className="block text-xs text-zinc-300 mb-1.5">
                  Email address
                </label>
                <input
                  id="connect-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/45"
                />
              </div>

              <div>
                <label htmlFor="connect-notes" className="block text-xs text-zinc-300 mb-1.5">
                  Target module or clinical note (optional)
                </label>
                <textarea
                  id="connect-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Upper limb calibration, Zurich or remote scan..."
                  className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/45 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white text-zinc-950 text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
