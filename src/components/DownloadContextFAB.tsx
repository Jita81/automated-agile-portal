import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown } from 'lucide-react';

interface DownloadContextFABProps {
  onOpen: () => void;
}

export const DownloadContextFAB = ({ onOpen }: DownloadContextFABProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={onOpen}
          aria-label="Download full context as Markdown"
          className="fixed right-6 bottom-8 z-40 flex items-center gap-2.5 bg-foreground text-background px-4 py-3 border border-foreground/10 shadow-lg hover:bg-foreground/90 transition-colors group"
        >
          <FileDown size={14} strokeWidth={1.5} className="shrink-0" />
          <span className="font-mono text-[10px] tracking-widest uppercase leading-none">
            Register for Closed Beta &amp; Download Context
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
