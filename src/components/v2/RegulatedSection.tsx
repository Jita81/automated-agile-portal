import { motion } from 'framer-motion';

const complements = [
  'Use skills and CLAUDE.md-style files as the delivery vehicle for curated context packs.',
  'Use hooks and managed settings to enforce Definition-of-Ready and acceptance-belt predicates.',
  'Use continuous evals for agent configuration regression and as part of oracle-adequacy measurement.',
  'Use PR review agents for mechanical and policy passes; retain human judgment for residual risk and semantic acceptance where the oracle is incomplete.',
  'Use the evidence ledger alongside commit history so process audit and quality evidence are both first-class.',
];

export const RegulatedSection = () => {
  return (
    <section id="regulated" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">04 — Regulated Environments</span>
          <h2 className="editorial-h2">Conservative at the boundary.</h2>
          <p className="prose-editorial">
            Healthcare and financial services make residual risk, provenance and human
            accountability non-negotiable. Automated Agile v2 automates only where operating
            conditions and independent evidence justify it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal">
              Healthcare example — campaign language design system
            </h3>
            <p className="prose-editorial text-sm">
              Instead of assuring each content item as an isolated artefact, assurance moves
              upstream. Approved evidence defines what is true. A campaign language design system
              defines how that truth must be communicated. Component specifications define
              structure, fields and limits. An AI-enabled tool produces structured drafts with
              claim-level evidence links. Automated controls test schema, approved wording,
              conditions and provenance.
            </p>
            <p className="prose-editorial text-sm">
              Anything outside the approved boundary stops and escalates. Human clinical, content,
              policy and safety professionals retain authority over the operating boundary and
              residual risk.
            </p>
            <p className="prose-editorial text-sm">
              <strong>
                The value proposition is not the removal of clinical judgement.
              </strong>{' '}
              It is the reduction of unsupported, inconsistent or outdated statements that reach
              clinical review, so expert attention focuses on material changes, exceptions and
              residual risk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal">
              Relationship to AI-native tooling
            </h3>
            <p className="prose-editorial text-sm">
              AI-native SDLC playbooks supply the operational machinery for fast loops. Automated
              Agile v2 supplies the quality architecture that determines when those loops may run
              autonomously and when they must stop. They are complementary.
            </p>
            <ul className="space-y-4">
              {complements.map((c) => (
                <li key={c} className="border-l-2 border-border pl-5 text-sm text-muted-foreground leading-relaxed">
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
