import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface AthenaBannerProps {
  onNavigate: () => void;
}

export const AthenaBanner = ({ onNavigate }: AthenaBannerProps) => {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
              <Sparkles size={12} strokeWidth={1.5} />
              Coming Soon — Closed Alpha
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground leading-tight mb-3">
              Meet Athena
            </h2>
            <p className="prose-editorial text-sm max-w-lg">
              Your AI-powered Automated Agile facilitator. Context-aware intelligence for stand-ups, retrospectives, and decision-making.
            </p>
          </div>

          <button
            onClick={onNavigate}
            className="btn-primary inline-flex items-center gap-3 shrink-0 self-start md:self-center"
          >
            <ArrowRight size={14} strokeWidth={1.5} />
            <span className="font-mono text-xs tracking-widest uppercase">Learn More</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
