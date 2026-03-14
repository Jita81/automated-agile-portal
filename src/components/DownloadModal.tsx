import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const DownloadModal = ({ open, onClose }: DownloadModalProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const { error } = await supabase.functions.invoke('send-markdown', {
        body: { email: email.trim() },
      });
      if (error) throw error;
      setStatus('success');
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStatus('idle');
      setEmail('');
      setErrorMsg('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed z-50 inset-x-4 bottom-4 md:inset-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-card border border-border p-8 md:p-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center">
                  <Check size={14} strokeWidth={1.5} className="text-foreground" />
                </div>
                <div>
                  <p className="font-serif text-2xl text-foreground font-normal mb-2">Check your inbox</p>
                  <p className="text-sm text-muted-foreground">
                    The full Automated Agile process document has been sent to <span className="text-foreground">{email}</span>. Check your spam folder if it doesn't arrive within a few minutes.
                  </p>
                </div>
                <button onClick={handleClose} className="btn-outline text-sm mt-2">
                  Close
                </button>
              </motion.div>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">
                  Download the Framework
                </p>
                <p className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-3 leading-snug">
                  Get the full document as Markdown
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  Enter your email and we'll send you the complete Automated Agile process architecture — all six sections — as a single Markdown file you can keep, share, or import into any tool.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                      disabled={status === 'loading'}
                      className="w-full bg-background border border-input text-foreground placeholder:text-muted-foreground/50 font-mono text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors disabled:opacity-50"
                    />
                    {errorMsg && (
                      <p className="font-mono text-xs text-destructive mt-2">{errorMsg}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send me the document
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </>
                    )}
                  </button>
                </form>

                <p className="font-mono text-xs text-muted-foreground/50 mt-5">
                  No marketing. Just the document.
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
