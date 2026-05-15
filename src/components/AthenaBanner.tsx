import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';

interface AthenaBannerProps {
  onBookDemo: () => void;
}

export const AthenaBanner = ({ onBookDemo }: AthenaBannerProps) => {
  return (
    <section id="athena" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
            <Sparkles size={12} strokeWidth={1.5} />
            Live Demo — Athena
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-foreground leading-tight max-w-3xl">
            See Athena in action.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="border border-border bg-card overflow-hidden"
        >
          <video
            src="/videos/athena-demo.mov"
            controls
            playsInline
            preload="metadata"
            className="w-full aspect-video object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <p className="prose-editorial text-base max-w-xl">
            Athena is the Automated Agile facilitator — context-aware AI that runs your ceremonies, decisions, and stand-ups. Book a demo to see it on your context.
          </p>
          <button
            onClick={onBookDemo}
            className="btn-primary inline-flex items-center gap-3 shrink-0 self-start md:self-center"
          >
            <Calendar size={14} strokeWidth={1.5} />
            <span className="font-mono text-xs tracking-widest uppercase">Book a Demo</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
