import { motion } from 'framer-motion';
import heroBackground from '@/assets/hero-background.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Full-bleed image */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src={heroBackground}
          alt="AI-powered software productivity"
          className="w-full h-full object-cover opacity-60"
          style={{ filter: 'sepia(20%) brightness(0.55)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      </div>

      {/* Editorial heading block */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-24 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-tight mb-8 max-w-3xl">
            Automated Agile
          </h1>

          <div className="max-w-2xl space-y-5">
            <p className="prose-editorial text-lg md:text-xl">
              Companies know AI can transform software productivity. But knowing it and achieving 
              it reliably at scale are two very different things.
            </p>
            <p className="prose-editorial">
              Automated Agile is a proven methodology—not a tool, not a workshop—that consistently 
              delivers <strong>30% productivity improvement across your entire software delivery cycle</strong>. 
              Guaranteed, or you get half your money back.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a href="#contact" className="btn-primary">
              Start a Conversation
            </a>
            <a href="#vision" className="btn-outline">
              Read the Vision
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
