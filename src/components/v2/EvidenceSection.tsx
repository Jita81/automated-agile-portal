import { motion } from 'framer-motion';

const measures = [
  {
    measure: 'Mechanical quality floor',
    result: '848 clean credits in a 927-row re-audit; no credited row carried a recorded failed belt',
    meaning: 'Adherence to defined mechanical predicates, not guaranteed semantic correctness',
  },
  {
    measure: 'Test-conditioned reproduction',
    result: '834 of 855 tasks (97.5%) across five languages',
    meaning: 'Synthesis given a strong visible oracle and attempt budget — not autonomous delivery from vague description',
  },
  {
    measure: 'Value of precise specification',
    result: 'Blind success 33/48; signed change-specific facts + checklist raised to 46/48',
    meaning: 'Precise, accountable facts outperform generic context',
  },
  {
    measure: 'Multi-file work',
    result: '58 of 60 changes touching 4–8 source files reproduced',
    meaning: 'Method not confined to trivial single-file edits within the tested slice',
  },
  {
    measure: 'Oracle adequacy',
    result: 'Average target-test mutation kill rate 58.3% across 211 mutants',
    meaning: 'Passing tests alone cannot justify autonomy; weak-oracle work must route to humans',
  },
  {
    measure: 'Forward-mode pilots',
    result: '~40 governed changes across four private pilot repositories; no reported escapes',
    meaning: 'Full governance loop exercised; no pilot had yet become a complete running deployed product',
  },
];

const boundaries = [
  'Strong test-conditioned and forward-mode results do not yet include a complete running and deployed product that has passed through the entire manufacturing line.',
  'A mechanically clean acceptance result is not equivalent to proof of semantic correctness where the underlying oracle is incomplete.',
  'Campaign language and similar regulated proposals are pathways for multidisciplinary discovery and bounded proof of concept, not claims that clinical or policy review can already be removed.',
  'Adoption by other organisations is described precisely where named evidence exists; vague social-proof claims are avoided.',
];

export const EvidenceSection = () => {
  return (
    <section id="evidence" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">03 — Evidence</span>
          <h2 className="editorial-h2">Scoped numbers. Stated boundaries.</h2>
          <p className="prose-editorial">
            These results demonstrate mechanical reliability under defined conditions and the value
            of precise context and strong oracles. They do not claim that a complete product has
            passed through an end-to-end autonomous line, nor that mechanical acceptance equals
            semantic correctness when the oracle is incomplete.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-x-auto mb-20"
        >
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="border-b border-border">
                {['Measure', 'Reported result', 'Meaning and boundary'].map((h) => (
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
              {measures.map((m) => (
                <tr key={m.measure} className="border-b border-border/40 last:border-0 align-top">
                  <td className="py-5 pr-6 font-mono text-xs text-foreground">{m.measure}</td>
                  <td className="py-5 pr-6 text-foreground">{m.result}</td>
                  <td className="py-5 text-muted-foreground">{m.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card border border-border p-8 lg:p-10"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Evidence boundaries
          </p>
          <ul className="space-y-4 max-w-3xl">
            {boundaries.map((b) => (
              <li key={b} className="border-l-2 border-border pl-5 text-sm text-muted-foreground leading-relaxed">
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
