import { motion } from 'framer-motion';

const plays = [
  {
    num: '01',
    title: 'Context Architecture',
    change:
      'Context ceases to be prompt decoration or a single CLAUDE.md file. It becomes a maintained organisational asset with provenance, ownership, versioning and feedback.',
    steps: [
      'Identify the classes of work the organisation intends to automate or accelerate.',
      'For each class, define the minimum facts that must be true before work may proceed.',
      'Assemble strategic, discovery, delivery and technical context.',
      'Separate raw inputs from curated assets. Curated assets carry ownership, version and provenance.',
      'Commit the context pack. Incomplete packs fail the gate; they do not proceed to generation.',
    ],
    metrics:
      'Leading: time from request to a complete, gate-passing context pack. Lagging: rework caused by missing context discovered after generation.',
  },
  {
    num: '02',
    title: 'Classification and Definition of Ready',
    change:
      'Not every change is equal. Work is classified by blast radius, oracle strength, novelty and residual risk. Each class carries its own context requirements, autonomy threshold and escalation route.',
    steps: [
      'Define a small set of work classes — mechanical single-file change, multi-file feature with strong tests, policy-sensitive content, novel architecture, safety-critical communication.',
      'For each class, list mandatory context facts, the required oracle, and human sign-off points.',
      'Encode the Definition of Ready as an executable check. Missing or unsigned items fail closed.',
      'Route work that fails the gate to human refinement rather than to generation.',
    ],
    metrics:
      'Leading: gate-pass rate by class. Lagging: escapes that trace to incorrect classification or gate bypass.',
  },
  {
    num: '03',
    title: 'Executable Specification and Oracle Design',
    change:
      'Acceptance authority must exist independently of the generated implementation. Specifications become contracts. The oracle is designed and measured for adequacy before generation is permitted.',
    steps: [
      'Produce an executable specification: inputs, outputs, invariants, edge cases, error contracts.',
      'Design or select the independent oracle. Prefer held-out tests and deterministic validators over model self-assessment.',
      'Measure oracle adequacy — mutation kill rate, coverage of decision-critical paths, schema completeness.',
      'If oracle strength falls below the class threshold, route to human-led implementation or strengthened testing.',
    ],
    metrics:
      'Leading: proportion of work classes with measured oracle adequacy above threshold. Lagging: defects that passed a weak oracle.',
  },
  {
    num: '04',
    title: 'Controlled Generation',
    change:
      'Generation occurs only after context and oracle gates have passed. The agent receives a classification-specific context pack rather than generic overload.',
    steps: [
      'Confirm gate passage: complete context pack, signed facts, oracle above threshold for the class.',
      'Assemble the generation payload: classification, context pack, specification, oracle reference, constraints.',
      'Generate under the approved autonomy level — assisted, supervised, or bounded auto.',
      'Record the generation event, model and configuration identity, and context versions in the ledger.',
    ],
    metrics:
      'No generation without gate passage. Attempts that bypass gates are treated as process defects.',
  },
  {
    num: '05',
    title: 'Independent Grading and the Quality Floor',
    change:
      'Results are graded by independent evidence, not by the generating model’s self-assessment. Acceptance belts fail closed when tests are modified without authority, regressions appear, or the expected source change is absent.',
    steps: [
      'Grade against held-out evidence, never the generator’s own claim of success.',
      'Stop progression on unauthorised test modification, regression, or missing source change.',
      'Distinguish mechanical cleanliness from semantic correctness in every report.',
      'Publish the Quality Floor as a measured level of mechanical reliability under defined conditions.',
    ],
    metrics:
      'The Quality Floor is a measurement, not a universal semantic guarantee.',
  },
  {
    num: '06',
    title: 'Routing, Refusal and Escalation',
    change:
      'Refusal and escalation are positive system behaviours. When context is incomplete, the oracle is weak, or residual risk exceeds the autonomy threshold, the system stops and routes to a human.',
    steps: [
      'At every gate, evaluate measured capability, oracle strength and residual risk against the class threshold.',
      'If thresholds are met, allow progression under the approved autonomy level.',
      'If not, refuse the autonomous path, record the reason, and escalate a decision-ready package.',
      'Human resolution updates context, specification or oracle strength and re-enters the line at the appropriate gate.',
    ],
    metrics:
      'Every refusal is logged with reason and context version. In regulated settings, residual risk always retains human authority.',
  },
  {
    num: '07',
    title: 'Evidence Ledger and Continuous Refinement',
    change:
      'An append-only ledger records classification, context versions, specification identity, generation events, grading outcomes, routing decisions and human resolutions.',
    steps: [
      'Persist every gate decision, generation event and grading result with immutable identifiers.',
      'Feed defects, review findings and production incidents back into context packs and oracle design.',
      'Periodically re-measure oracle adequacy and re-classify work as evidence accumulates.',
      'Publish quality-floor dashboards that separate mechanical results from semantic claims.',
    ],
    metrics:
      'The system learns which classes are ready for higher autonomy and which remain human-routed.',
  },
];

export const ProductionLineSection = () => {
  return (
    <section id="production-line" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">02 — The Production Line</span>
          <h2 className="editorial-h2">Seven plays. One audit trail.</h2>
          <p className="prose-editorial">
            The plays form a manufacturing sequence rather than a strictly linear waterfall. Work is
            classified, context is assembled, specifications and oracles are established, generation
            occurs under gates, results are graded independently, and outcomes either advance or
            escalate. Each play produces committed artifacts the next play can read.
          </p>
        </motion.div>

        <div>
          {plays.map((p, i) => (
            <motion.article
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.05 }}
              className="border-t border-border py-10 grid md:grid-cols-[8rem_1fr] gap-6 last:border-b"
            >
              <div>
                <span className="font-mono text-xs tracking-widest text-muted-foreground">{p.num}</span>
              </div>
              <div className="space-y-5">
                <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal">{p.title}</h3>
                <p className="prose-editorial text-base">{p.change}</p>
                <ol className="space-y-2.5 max-w-2xl">
                  {p.steps.map((s, si) => (
                    <li key={si} className="flex gap-4 text-sm text-muted-foreground leading-relaxed">
                      <span className="font-mono text-xs text-foreground/40 pt-0.5 shrink-0">
                        {String(si + 1).padStart(2, '0')}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="font-mono text-xs text-muted-foreground/80 leading-relaxed border-l border-border pl-4 max-w-2xl">
                  {p.metrics}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
