import { motion } from 'framer-motion';

export const HowItWorksSection = () => {
  return (
    <section id="self-curation" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">04 — The Self-Curating Context Model</span>
          <h2 className="editorial-h2">Context That Curates Itself</h2>
          <p className="prose-editorial max-w-2xl">
            The platform's most distinctive capability is that context curates itself. Meetings 
            are scheduled because gaps exist. Agendas are generated because specific questions 
            need answers. The system learns what "complete" means from outcomes.
          </p>
        </motion.div>

        {/* Self-curation loop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-10">The Self-Curation Loop</h3>
          <div className="space-y-0 border-t border-border">
            {[
              { step: '01', label: 'Gap Detection', body: 'The Context Graph continuously evaluates completeness for every active work item. When a section falls below threshold (configured per team), a context gap is created automatically.' },
              { step: '02', label: 'Resolution Routing', body: 'Each gap is classified by type and routed to the appropriate resolution mechanism. A missing business rule goes to the stakeholder meeting agenda. A missing code pattern triggers Codebase Intelligence analysis.' },
              { step: '03', label: 'Meeting Curation', body: 'The Process Engine aggregates pending gaps by meeting type and schedules or adds to the next appropriate meeting. If enough high-severity gaps accumulate, it can trigger an ad-hoc session.' },
              { step: '04', label: 'Resolution Capture', body: 'When a meeting occurs, the extraction pipeline processes the transcript and marks gaps as resolved — pending human confirmation.' },
              { step: '05', label: 'Quality Feedback', body: 'When manufactured code is triaged, the triage feedback reveals whether gaps were truly resolved or merely appeared to be. Q2 and Q3 outcomes may reopen gaps that were marked resolved.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-b border-border py-8 grid grid-cols-[4rem_1fr] gap-4"
              >
                <span className="font-mono text-xs text-muted-foreground">{item.step}</span>
                <div>
                  <p className="font-serif text-xl text-foreground font-normal mb-2">{item.label}</p>
                  <p className="prose-editorial text-sm">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Context from the codebase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-6">Context from the Codebase</h3>
          <p className="prose-editorial mb-10 max-w-xl">
            The codebase is not just a manufacturing target — it is a rich context source. 
            The Codebase Intelligence engine continuously produces structured insights.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { label: 'Success Patterns', body: 'By analysing which code patterns correlate with clean PR approvals, high test coverage, and production stability, the engine builds a pattern library automatically. Developers validate these in Pattern Review meetings.' },
              { label: 'Anti-Patterns', body: 'By analysing which patterns correlate with production incidents, high defect rates, or repeated reviewer comments, the engine identifies patterns to avoid. These become hard constraints in context packages.' },
              { label: 'Change Impact Maps', body: 'By analysing historical co-change patterns (files that tend to change together), the engine predicts the blast radius of a modification. This feeds the "affected components" section of every context package.' },
            ].map((item) => (
              <div key={item.label} className="bg-background p-8">
                <p className="font-mono text-xs uppercase tracking-wider text-foreground/50 mb-3">{item.label}</p>
                <p className="prose-editorial text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Queue classification */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-6">Queue Classification</h3>
          <p className="prose-editorial mb-10 max-w-xl">
            Every piece of manufactured code is classified into one of three queues. 
            The distribution across these queues is the primary health metric for the platform.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { q: 'Q1', label: 'Production Ready', colour: 'text-foreground', body: 'Code meets all acceptance criteria. Passes all tests. Requires only standard code review. No developer rework needed. This is the target state.' },
              { q: 'Q2', label: 'Solid Foundation', colour: 'text-foreground/60', body: 'Code demonstrates correct understanding but requires human finishing. Developer documents the specific gaps. These gaps feed directly back into context improvement.' },
              { q: 'Q3', label: 'Unusable', colour: 'text-muted-foreground', body: 'Code is not a useful starting point. Developer documents the root cause of failure. Q3 failures trigger immediate context package review and are the highest priority for improvement.' },
            ].map((item) => (
              <div key={item.q} className="bg-background p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-sm font-medium text-foreground">{item.q}</span>
                  <span className={`font-mono text-xs uppercase tracking-wider ${item.colour}`}>{item.label}</span>
                </div>
                <p className="prose-editorial text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
