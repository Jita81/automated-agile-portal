import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const sectionNav = [
  { num: '1', label: 'Problem' },
  { num: '2', label: 'Solution' },
  { num: '3', label: 'How It Works' },
  { num: '4', label: 'ROI' },
  { num: '5', label: 'Contact' },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="AI-powered agility visualization"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      {/* Floating "How it works" card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="absolute top-32 right-6 lg:right-12 z-20 hidden md:block"
      >
        <div className="bg-card/95 backdrop-blur-sm border border-border p-5 max-w-[280px] shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-primary" />
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">How it works</span>
          </div>
          <p className="text-sm text-foreground mb-4 leading-relaxed">
            Automated Agile is built on two proven methodologies:
          </p>
          <div className="space-y-2">
            <a 
              href="https://contextengineering.team/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <span className="text-sm font-medium">Context Engineering</span>
              <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://softwaremanufacturing.team/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <span className="text-sm font-medium">Software Manufacturing</span>
              <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-12 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col max-w-3xl">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.05] tracking-tight">
              30% Productivity
              <br />
              Improvement
              <br />
              <span className="text-primary">Guaranteed</span>
            </h1>
          </motion.div>

          {/* Section nav + Description - left aligned under headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mt-10 flex flex-col lg:flex-row gap-8 lg:gap-16"
          >
            {/* Section Navigation */}
            <nav className="flex flex-row flex-wrap lg:flex-col gap-x-6 gap-y-2">
              {sectionNav.map((item) => (
                <a
                  key={item.num}
                  href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 group"
                >
                  <span className="font-mono text-sm text-muted-foreground">{item.num}</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Description */}
            <p className="text-lg text-foreground/80 leading-relaxed max-w-md">
              Companies know AI can improve software productivity, but there's no scalable, 
              reliable way to apply it. Automated Agile provides that approach—30% productivity 
              improvement guaranteed, or you get half your money back.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-12"
        >
          <a href="#contact" className="btn-primary">
            Start Validation
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* Bottom tech label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 container mx-auto px-6 lg:px-12 pb-8"
      >
        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">
          <span>EARLY ADOPTER 2026</span>
          <span className="text-primary">—</span>
          <span>AI-POWERED AGILITY</span>
        </div>
      </motion.div>
    </section>
  );
};
