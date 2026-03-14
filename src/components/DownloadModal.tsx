import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { generateAutomatedAgileMarkdown } from '@/lib/generateMarkdown';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export const DownloadModal = ({ open, onClose }: DownloadModalProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (trimmed.length > 255) {
      setErrorMsg('Email address is too long.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('download_emails')
      .insert({ email: trimmed });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
      return;
    }

    // Trigger download
    const content = generateAutomatedAgileMarkdown();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'automated-agile-process-architecture.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatus('success');
  };

  const handleClose = () => {
    setEmail('');
    setStatus('idle');
    setErrorMsg('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-card border border-border p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            {status !== 'success' ? (
              <>
                <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  Download
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-3">
                  Process Architecture
                </h2>
                <p className="prose-editorial text-sm mb-8 max-w-none">
                  Enter your email to download the full Automated Agile framework as a single Markdown file — all six sections, every decision type, every meeting format.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="dl-email" className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      Email address
                    </label>
                    <input
                      id="dl-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="you@example.com"
                      maxLength={255}
                      autoComplete="email"
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors font-sans"
                      required
                    />
                    {errorMsg && (
                      <p className="font-mono text-xs text-destructive mt-2">{errorMsg}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="font-mono text-xs tracking-widest">Preparing...</span>
                    ) : (
                      <>
                        <Download size={14} strokeWidth={1.5} />
                        <span className="font-mono text-xs tracking-widest uppercase">Download Markdown</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="font-mono text-xs text-muted-foreground/50 mt-5">
                  Your email is stored securely and never shared.
                </p>
              </>
            ) : (
              <div className="py-4">
                <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  Download started
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-4">
                  Your file is downloading.
                </h2>
                <p className="prose-editorial text-sm mb-8 max-w-none">
                  The full process architecture document has been saved to your device as a Markdown file.
                </p>
                <button onClick={handleClose} className="btn-outline inline-flex items-center gap-3">
                  <ArrowRight size={14} strokeWidth={1.5} />
                  <span className="font-mono text-xs tracking-widest uppercase">Back to the site</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
