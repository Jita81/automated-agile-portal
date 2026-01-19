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
            
            <div className="space-y-4 mb-8">
              <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">The Methodology</h4>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Automated Agile principles driven by context engineering
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Applied systematically across delivery, particularly in the 70-80%
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Proven over 2+ years of development and refinement
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Validated across multiple contexts
                </li>
              </ul>
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
