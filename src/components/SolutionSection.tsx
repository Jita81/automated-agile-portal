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
            
            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">Context Engineering</h4>
                <p className="text-muted-foreground leading-relaxed">
                  The foundation of our methodology. Context engineering ensures AI tools receive precisely the right 
                  information at the right time, enabling consistent, high-quality outputs at scale.
                </p>
                <a 
                  href="https://contextengineering.team/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                >
                  Learn about Context Engineering
                  <ArrowRight size={14} />
                </a>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">Software Manufacturing</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We apply manufacturing principles to software delivery—systematically automating the 70-80% 
                  of cycle time spent on coordination, requirements, and process overhead.
                </p>
                <a 
                  href="https://softwaremanufacturing.team/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                >
                  Learn about Software Manufacturing
                  <ArrowRight size={14} />
                </a>
              </div>

              <div className="pt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Proven over 2+ years</span> of development and validated across multiple contexts.
              </div>
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
              Learn More
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
