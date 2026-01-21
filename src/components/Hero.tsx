import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import heroBackground from '@/assets/hero-background.jpg';

const sectionNav = [
  { num: '1', label: 'Problem' },
  { num: '2', label: 'Solution' },
  { num: '3', label: 'How It Works' },
  { num: '4', label: 'ROI' },
  { num: '5', label: 'Contact' },
];

export const Hero = () => {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-12 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left column - Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.05] tracking-tight">
              30% Productivity
              <br />
              Improvement
              <br />
              <span className="text-primary">Guaranteed</span>
            </h1>

            {/* Floating Methodology Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 max-w-md"
            >
              <button
                onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
                className="group flex items-center gap-3 text-left w-full"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/30 group-hover:bg-primary/20 transition-colors">
                  <Sparkles size={14} className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  How does Automated Agile work?
                </span>
                {isMethodologyOpen ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </button>

              <AnimatePresence>
                {isMethodologyOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-5 bg-card/80 backdrop-blur-sm border border-border rounded-lg space-y-4">
                      <p className="text-sm text-foreground">
                        Our methodology is built on two proven disciplines:
                      </p>
                      
                      <div className="space-y-3">
                        <a
                          href="https://contextengineering.team/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-3 p-3 bg-background/50 hover:bg-primary/5 border border-transparent hover:border-primary/30 rounded transition-all"
                        >
                          <span className="font-mono text-xs text-primary mt-0.5">01</span>
                          <div className="flex-1">
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                              Context Engineering
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              Ensuring AI receives the right information for reliable outputs
                            </p>
                          </div>
                          <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                        </a>

                        <a
                          href="https://softwaremanufacturing.team/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-3 p-3 bg-background/50 hover:bg-primary/5 border border-transparent hover:border-primary/30 rounded transition-all"
                        >
                          <span className="font-mono text-xs text-primary mt-0.5">02</span>
                          <div className="flex-1">
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                              Software Manufacturing
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              Automating 70-80% of delivery overhead systematically
                            </p>
                          </div>
                          <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                        </a>
                      </div>

                      <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                        Proven over 2+ years and validated across multiple contexts
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Right column - Section nav + Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:w-[400px] flex flex-col gap-8"
          >
            {/* Section Navigation */}
            <nav className="flex flex-col gap-2">
              {sectionNav.map((item) => (
                <a
                  key={item.num}
                  href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-4 group"
                >
                  <span className="font-mono text-sm text-muted-foreground">{item.num}</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Description */}
            <p className="text-lg text-foreground/80 leading-relaxed">
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
