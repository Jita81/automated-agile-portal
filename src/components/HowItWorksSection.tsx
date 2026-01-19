import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ArrowRight, Check, Shield } from 'lucide-react';

const phases = [
  {
    phase: 'Phase 1',
    title: 'Two-Week Validation',
    price: '£15,000',
    description: 'Prove this works for YOUR specific context before committing.',
    items: [
      'Measure your current baseline throughput',
      'Assess your environment and readiness',
      'Demonstrate methodology application',
      'Present findings and recommendation',
    ],
    deliverables: [
      'Baseline Assessment (your current state, measured)',
      'Improvement Potential (realistic for your context)',
      'Recommendation (proceed or gap analysis)',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Three-Month Engagement',
    price: '£200,000',
    description: 'Implement full methodology with guaranteed 30% minimum improvement.',
    items: [
      '3-person coaching team embedded with your organization',
      '2 developers, 1 business analyst',
      'Work alongside your teams, teaching methodology',
    ],
    timeline: [
      { weeks: 'Weeks 1-4', label: 'Foundation (training and initial implementation)' },
      { weeks: 'Weeks 5-8', label: 'Application (teams apply with coaching support)' },
      { weeks: 'Weeks 9-12', label: 'Optimization (methodology embedded, sustainability)' },
    ],
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          number="03"
          title="How It Works"
          subtitle="A de-risked, phased approach to guaranteed productivity improvement."
        />

        <div className="space-y-12 mb-16">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border p-8 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                <div className="lg:w-1/3">
                  <span className="font-mono text-sm text-primary uppercase tracking-wider">{phase.phase}</span>
                  <h3 className="text-2xl lg:text-3xl font-semibold mt-2 mb-2">{phase.title}</h3>
                  <span className="text-3xl font-bold text-primary">{phase.price}</span>
                  <p className="text-muted-foreground mt-4">{phase.description}</p>
                </div>
                
                <div className="lg:w-2/3 space-y-6">
                  <div>
                    <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4">
                      What Happens
                    </h4>
                    <ul className="space-y-3">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {phase.deliverables && (
                    <div>
                      <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4">
                        Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {phase.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-muted-foreground">
                            <span className="text-primary">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.timeline && (
                    <div>
                      <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4">
                        Timeline
                      </h4>
                      <div className="space-y-3">
                        {phase.timeline.map((item) => (
                          <div key={item.weeks} className="flex items-start gap-4">
                            <span className="font-mono text-sm text-primary whitespace-nowrap">{item.weeks}</span>
                            <span className="text-muted-foreground">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="bg-primary/5 border border-primary/20 p-8 lg:p-12"
        >
          <div className="flex items-start gap-6">
            <Shield className="w-12 h-12 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-4">Performance Guarantee</h3>
              <p className="text-lg text-foreground mb-6">
                30% minimum productivity improvement or 50% fee reduction.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                <div>
                  <h4 className="font-mono text-sm uppercase tracking-wider mb-2 text-foreground">How We Measure</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Baseline: Average throughput 4-6 weeks before engagement</li>
                    <li>• Endpoint: Average throughput final 4-6 weeks of engagement</li>
                    <li>• Calculation: (Endpoint - Baseline) / Baseline</li>
                    <li>• Target: ≥30% improvement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-sm uppercase tracking-wider mb-2 text-foreground">If &lt;30%</h4>
                  <p className="text-sm">
                    £100,000 refund (50% of £200,000 engagement fee) within 30 days. 
                    This protects your investment while ensuring we're accountable for results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
