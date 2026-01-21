import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ArrowRight, Check, X } from 'lucide-react';

const notList = [
  'Ad-hoc AI tool implementation',
  'Generic productivity consulting',
  '"Try it and see what happens"',
];

const yesList = [
  'Systematic methodology that scales',
  'Consistent, reliable results',
  'Performance guarantee with real protection',
];

export const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          number="02"
          title="Our Solution"
          subtitle="Automated Agile Methodology"
        />

        {/* Featured Methodology Cards - Immediate Value */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.a
            href="https://contextengineering.team/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="group bg-card border border-primary/30 p-8 hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-mono text-sm uppercase tracking-wider text-primary">Context Engineering</h3>
              <ArrowRight size={18} className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-foreground font-medium text-lg mb-3">
              The foundation of reliable AI outputs
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ensuring AI tools receive precisely the right information at the right time, enabling consistent, high-quality outputs at scale.
            </p>
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 group-hover:underline">
              Explore the methodology
              <ArrowRight size={14} />
            </span>
          </motion.a>

          <motion.a
            href="https://softwaremanufacturing.team/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-card border border-primary/30 p-8 hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-mono text-sm uppercase tracking-wider text-primary">Software Manufacturing</h3>
              <ArrowRight size={18} className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-foreground font-medium text-lg mb-3">
              Manufacturing principles for software
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Systematically automating the 70-80% of cycle time spent on coordination, requirements, and process overhead.
            </p>
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 group-hover:underline">
              Explore the methodology
              <ArrowRight size={14} />
            </span>
          </motion.a>
        </div>

        {/* Supporting Content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-foreground leading-relaxed mb-8">
              We've developed a proprietary approach that provides what's missing: a scalable, 
              reliable way to apply AI that consistently delivers results.
            </p>
            
            <div className="pt-2 text-sm text-muted-foreground mb-8">
              <span className="font-medium text-foreground">Proven over 2+ years</span> of development and validated across multiple contexts.
            </div>

            <div className="bg-primary/10 p-6 border-l-4 border-primary">
              <h4 className="font-semibold mb-2">What We Guarantee</h4>
              <p className="text-muted-foreground">
                30% minimum productivity improvement, measured using rigorous baseline-to-endpoint 
                comparison—or you get 50% of your engagement fee back (£100,000).
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* What this is NOT */}
            <div className="bg-card border border-border p-8">
              <h4 className="font-mono text-sm uppercase tracking-wider text-destructive mb-6">What This Is Not</h4>
              <ul className="space-y-4">
                {notList.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <X className="w-5 h-5 text-destructive flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What this IS */}
            <div className="bg-card border border-primary/30 p-8">
              <h4 className="font-mono text-sm uppercase tracking-wider text-primary mb-6">What This Is</h4>
              <ul className="space-y-4">
                {yesList.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a href="#contact" className="btn-primary inline-flex">
              Get Started
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
