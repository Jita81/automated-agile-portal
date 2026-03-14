import { motion } from 'framer-motion';

const phases = [
  {
    num: '01',
    phase: 'Phase One',
    title: 'Two-Week Validation',
    price: '£15,000',
    description: 'Prove the methodology works for your specific context before any larger commitment.',
    points: [
      'Measure your current baseline throughput',
      'Assess your environment and team readiness',
      'Demonstrate the methodology in practice',
      'Deliver a clear recommendation: proceed or gap analysis',
    ],
    deliverables: [
      'Baseline Assessment — your current state, measured',
      'Improvement Potential — realistic for your context',
      'Recommendation — with full commercial transparency',
    ],
  },
  {
    num: '02',
    phase: 'Phase Two',
    title: 'Three-Month Pilot',
    price: '£200,000',
    description: 'A single delivery team. Three months. Guaranteed 30% productivity improvement—or 50% of the fee returned.',
    points: [
      '3-person coaching team embedded with your organisation',
      'Methodology taught, not just applied',
      'Permanent capability transfer—you own the improvement',
      'Option to continue or expand to additional teams',
    ],
    timeline: [
      { weeks: 'Weeks 1–4', label: 'Foundation — training and initial implementation' },
      { weeks: 'Weeks 5–8', label: 'Application — teams apply with coaching support' },
      { weeks: 'Weeks 9–12', label: 'Optimisation — methodology embedded and self-sustaining' },
    ],
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">04</span>
          <h2 className="editorial-h2">How It Works</h2>
          <p className="prose-editorial max-w-xl">
            A phased approach designed to de-risk every step. You validate before you commit. 
            You own the results permanently.
          </p>
        </motion.div>

        <div className="space-y-px bg-border">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-background grid lg:grid-cols-3 gap-0"
            >
              {/* Left: phase header */}
              <div className="p-8 lg:p-10 border-r border-border">
                <span className="font-mono text-xs tracking-widest text-muted-foreground mb-3 block">{phase.phase}</span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-foreground mb-3">{phase.title}</h3>
                <p className="font-mono text-2xl text-foreground mb-4">{phase.price}</p>
                <p className="prose-editorial text-sm">{phase.description}</p>
              </div>

              {/* Middle: what happens */}
              <div className="p-8 lg:p-10 border-r border-border">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">What happens</p>
                <ul className="space-y-3">
                  {phase.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-foreground/40 mt-0.5 flex-shrink-0">—</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: deliverables or timeline */}
              <div className="p-8 lg:p-10">
                {phase.deliverables && (
                  <>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Deliverables</p>
                    <ul className="space-y-3">
                      {phase.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="text-foreground/40 mt-0.5 flex-shrink-0">→</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {phase.timeline && (
                  <>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Timeline</p>
                    <div className="space-y-4">
                      {phase.timeline.map((t) => (
                        <div key={t.weeks}>
                          <p className="font-mono text-xs text-foreground mb-1">{t.weeks}</p>
                          <p className="text-sm text-muted-foreground">{t.label}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-px bg-card border-t border-border p-8 lg:p-12 grid lg:grid-cols-2 gap-10"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">The Guarantee</p>
            <p className="pull-quote text-2xl md:text-3xl mb-4">
              30% minimum productivity improvement, measured rigorously—or £100,000 returned within 30 days.
            </p>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-2">Measurement</p>
              <p>Baseline: average throughput 4–6 weeks before engagement. Endpoint: average throughput in the final 4–6 weeks. Improvement = (Endpoint − Baseline) / Baseline.</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-2">If &lt; 30%</p>
              <p>£100,000 refund (50% of the £200,000 pilot fee) paid within 30 days. No argument, no caveats.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
