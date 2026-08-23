import { motion } from 'framer-motion';

const steps = [
  'Select a bounded class — for example, schema-constrained API changes or approved-language content components.',
  'Build the minimum viable context library and oracle for that class.',
  'Implement the gates and the fail-closed acceptance belt.',
  'Run governed changes; record every outcome in the ledger.',
  'Publish the measured floor and the open gaps. Do not inflate mechanical results into semantic guarantees.',
  'Only then expand the set of classes or raise autonomy thresholds.',
];

interface AdoptionSectionProps {
  onDownloadClick: () => void;
}

export const AdoptionSection = ({ onDownloadClick }: AdoptionSectionProps) => {
  return (
    <section id="adoption" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">05 — Adoption</span>
          <h2 className="editorial-h2">Start narrow. Expand on evidence.</h2>
          <p className="prose-editorial">
            Choose one work class with measurable oracles and limited blast radius. Build the
            context pack, the Definition of Ready, the executable specification and the acceptance
            belt. Run a bounded pilot. Measure mechanical results, oracle strength and escape rate.
            Expand only when evidence supports it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 mb-24">
          {steps.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
              className="flex gap-5 border-t border-border pt-6"
            >
              <span className="font-mono text-xs text-muted-foreground pt-1 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">{s}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card border border-border p-8 lg:p-12"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Closing
          </p>
          <p className="pull-quote mb-8 max-w-3xl">
            The decisive question is not whether the machine can generate an output. It is whether
            the system can know when that output is trustworthy, prove it with independent
            evidence, and stop when it cannot.
          </p>
          <p className="prose-editorial text-sm mb-10">
            Automated Agile v2 treats that knowledge as the product. It combines context
            engineering, executable specifications, measurable quality gates and explicit human
            escalation into a production system that can be operated, measured and improved.
          </p>
          <button onClick={onDownloadClick} className="btn-primary">
            <span className="font-mono text-xs tracking-widest uppercase">
              Register &amp; download the playbook
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
