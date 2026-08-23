import { motion } from 'framer-motion';
import heroBackground from '@/assets/hero-background.jpg';

export const HeroV2 = () => {
  return (
    <section className="relative flex flex-col">
      <div className="relative w-full h-[46vh] md:h-[56vh] overflow-hidden">
        <img
          src={heroBackground}
          alt="Automated Agile v2 — a quality-controlled production system for AI-assisted delivery"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(30%) brightness(0.45)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-10 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Automated Agile v2 — Quality-Controlled Production
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-tight mb-8 max-w-4xl">
            From accelerated generation to governed production.
          </h1>

          <div className="max-w-2xl space-y-5">
            <p className="prose-editorial text-lg md:text-xl">
              AI has removed code generation as the primary bottleneck. The constraint has moved
              upstream into intent, context and specification — and downstream into review, trust
              and governance.
            </p>
            <p className="prose-editorial">
              Automated Agile v2 re-frames the delivery lifecycle as a quality-controlled
              manufacturing line. It does not replace human judgment. It makes the conditions
              under which AI may act <strong>explicit, measurable and enforceable</strong>.
            </p>
          </div>

          <div className="mt-12 border-l-2 border-foreground/30 pl-6 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Central principle
            </p>
            <p className="pull-quote">
              Controlled uncertainty is the product. A production system should know what it may
              attempt, what context it needs, what evidence must exist, how the result is graded,
              and when it must stop.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">
            <span>Version 2.0</span>
            <span className="text-foreground/20">—</span>
            <span>Paul Glover</span>
            <span className="text-foreground/20">—</span>
            <span>August 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
