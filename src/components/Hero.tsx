import { motion } from 'framer-motion';
import heroBackground from '@/assets/hero-background.jpg';
import { Download } from 'lucide-react';

interface HeroProps {
  onDownload: () => void;
}

export const Hero = ({ onDownload }: HeroProps) => {
  return (
    <section className="relative flex flex-col">
      {/* Full-bleed image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={heroBackground}
          alt="Context Engineering Platform"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(30%) brightness(0.45)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Context Engineering Platform — Process Architecture
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-tight mb-8 max-w-4xl">
            Automated Agile
          </h1>

          <div className="max-w-2xl space-y-5">
            <p className="prose-editorial text-lg md:text-xl">
              A complete framework for AI-powered software delivery. Every activity in this 
              platform exists to answer one question: does the right person have the right context 
              to make the right decision at the right time?
            </p>
            <p className="prose-editorial">
              This document describes the full process architecture — the primitives, decision 
              taxonomy, meeting structure, and self-curation mechanisms that make consistent, 
              predictable software manufacturing possible.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <button onClick={onDownload} className="btn-outline inline-flex items-center gap-2 w-fit">
              <Download size={13} strokeWidth={1.5} />
              Download as Markdown
            </button>
            <div className="flex flex-wrap gap-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">
              <span>Version 1.0</span>
              <span className="text-foreground/20">—</span>
              <span>March 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
