import { motion } from 'framer-motion';

const rows = [
  {
    stage: 'Intent & Plan',
    traditional: 'Committee workshops, hand-written requirements',
    aiNative: 'Originator + agent produce intent.md / spec.md in one session',
    v2: 'Context library + classified intent + Definition-of-Ready gates that stop incomplete work',
  },
  {
    stage: 'Specification',
    traditional: 'Analyst-written specs, later parsed by designers',
    aiNative: 'Requirements and design compressed; standards encoded as skills',
    v2: 'Executable specifications and independent oracles; acceptance criteria as contracts, not prose',
  },
  {
    stage: 'Build',
    traditional: 'Hand-written tests and code; documentation after',
    aiNative: 'Plan mode then auto mode; CLAUDE.md + skills + hooks',
    v2: 'Classification-specific context packs; generation only after oracle and context gates pass',
  },
  {
    stage: 'Quality',
    traditional: 'QA gates at stage boundaries; human review of every line',
    aiNative: 'Continuous evals; AI PR review; human judgment on risk',
    v2: 'Independent acceptance belts that fail closed; oracle-adequacy measurement; mechanical vs semantic distinction',
  },
  {
    stage: 'Governance',
    traditional: 'Process sign-offs and review cycles',
    aiNative: 'Hooks, managed settings, branch protection, audit via commits',
    v2: 'Routing by measured capability; refusal as positive behaviour; append-only evidence ledger; human escalation on residual risk',
  },
  {
    stage: 'Maintain',
    traditional: 'Humans watch production',
    aiNative: 'Agents monitor; breaches write new intent.md',
    v2: 'Outcomes refine the context library and oracle strength; weak-oracle classes remain human-routed',
  },
];

export const ShiftSection = () => {
  return (
    <section id="shift" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">01 — The Shift</span>
          <h2 className="editorial-h2">Generation is no longer the constraint.</h2>
          <p className="prose-editorial">
            AI-native approaches correctly compress planning, coding and review into tighter loops.
            Automated Agile v2 accepts that diagnosis and adds a further requirement: the system
            must distinguish mechanical acceptance from semantic correctness, measure the strength
            of its own grading oracles, and route work according to evidence rather than assumption.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="border-b border-border">
                {['Stage', 'Traditional SDLC', 'AI-Native Loop', 'Automated Agile v2'].map((h) => (
                  <th
                    key={h}
                    className="text-left py-4 pr-6 font-mono text-xs tracking-widest uppercase text-muted-foreground last:pr-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.stage} className="border-b border-border/40 last:border-0 align-top">
                  <td className="py-5 pr-6 font-mono text-xs text-foreground whitespace-nowrap">{r.stage}</td>
                  <td className="py-5 pr-6 text-muted-foreground">{r.traditional}</td>
                  <td className="py-5 pr-6 text-muted-foreground">{r.aiNative}</td>
                  <td className="py-5 text-foreground">{r.v2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="prose-editorial text-sm mt-10"
        >
          Most organisations sit somewhere between the middle and right columns. The value of
          Automated Agile v2 is that it makes the quality and evidence rules explicit rather than
          implicit in tooling choices.
        </motion.p>
      </div>
    </section>
  );
};
