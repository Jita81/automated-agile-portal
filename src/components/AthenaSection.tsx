import { motion } from 'framer-motion';

export const AthenaSection = () => {
  return (
    <section id="athena" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Coming Soon — Closed Alpha
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-foreground leading-tight mb-4 max-w-3xl">
            Meet Athena
          </h2>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground/60 mb-8">
            Your Automated Agile Facilitator
          </p>
        </motion.div>

        {/* Two-column: video + copy */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="border border-border bg-card overflow-hidden">
              <video
                src="/videos/athena-demo.mov"
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40 mt-3">
              Alpha Preview — April 2026
            </p>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
            className="flex flex-col gap-6"
          >
            <blockquote className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed italic">
              "I'd like to introduce Athena from Automated Agile.
            </blockquote>
            <p className="prose-editorial text-sm max-w-none">
              It's still an Alpha, but we should self-improve ourselves to the Beta by the end of the month.
            </p>

            <div className="border-l border-border pl-5 mt-4 space-y-4">
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-1">
                  What Athena Does
                </p>
                <p className="prose-editorial text-sm max-w-none">
                  Athena facilitates your Automated Agile ceremonies — running stand-ups, retrospectives, and decision-making sessions with context-aware intelligence.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-1">
                  Status
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide uppercase text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Closed Alpha — Beta target: end of month
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
