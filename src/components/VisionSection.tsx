import { motion } from 'framer-motion';

const primitives = [
  {
    name: 'INPUTS',
    definition: 'Raw material that enters the system. Conversations, code, documents, decisions, observations. Anything that contains knowledge relevant to building software.',
    examples: 'Meeting transcript, Git commit, Jira update, Slack thread, architecture diagram, stakeholder email, test result, production incident',
  },
  {
    name: 'DECISIONS',
    definition: 'Judgment calls that require sufficient context. Every decision transforms inputs into direction. Decisions are the value-creating moments in the process.',
    examples: 'Scope a feature, choose a technical approach, prioritise the backlog, approve a context package, triage generated code, sign off a release',
  },
  {
    name: 'OUTPUTS',
    definition: 'Artifacts produced by decisions. Documents, code, context packages, approvals. Every output becomes an input to a downstream decision.',
    examples: 'Context package, user story, acceptance criteria, generated code, triage classification, phase plan, sign-off document, pattern library entry',
  },
];

export const VisionSection = () => {
  return (
    <section id="model" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">01 — The Fundamental Model</span>
          <h2 className="editorial-h2">Three Primitives</h2>
          <p className="prose-editorial max-w-2xl">
            The entire process architecture is built from three primitives. 
            Every activity in this platform exists to ensure the right person 
            has the right context to make the right decision at the right time.
          </p>
        </motion.div>

        {/* Primitives */}
        <div className="space-y-px bg-border mb-16">
          {primitives.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background grid md:grid-cols-3 gap-0"
            >
              <div className="p-8 border-r border-border">
                <p className="font-mono text-sm font-medium text-foreground tracking-wider">{p.name}</p>
              </div>
              <div className="p-8 border-r border-border">
                <p className="prose-editorial text-sm">{p.definition}</p>
              </div>
              <div className="p-8">
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">{p.examples}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chain rule callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card border border-border p-8 lg:p-10 grid md:grid-cols-2 gap-8"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">The Chain Rule</p>
            <p className="font-serif text-2xl md:text-3xl text-foreground font-normal leading-snug">
              Every output from one decision becomes an input to the next.
            </p>
          </div>
          <div className="flex items-center">
            <p className="prose-editorial text-sm">
              The quality of upstream decisions determines the quality of downstream ones. 
              This is why context engineering exists: to ensure every decision has sufficient, 
              structured inputs before it is made.
            </p>
          </div>
        </motion.div>

        {/* Meetings fit */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <h3 className="font-serif text-3xl md:text-4xl text-foreground font-normal mb-8">How Meetings Fit</h3>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-5">
              <p className="prose-editorial">
                Meetings are not administrative overhead. They are the primary mechanism for 
                converting tacit human knowledge into explicit, structured context. Every meeting 
                in this framework has three properties.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Context-gap-driven agenda', body: 'The platform analyses what it knows and what it does not know, then generates an agenda of specific gaps to fill. Participants arrive knowing exactly what context is needed and why.' },
                { label: 'Real-time sufficiency feedback', body: 'During the meeting, the platform assesses the transcript against the required context model. A live indicator shows whether each agenda item has been addressed with sufficient depth.' },
                { label: 'Structured extraction with human sign-off', body: 'After the meeting, the platform extracts decisions, requirements, and action items into structured documents. A human reviews and signs off before anything enters the official context graph.' },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-border pl-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-foreground mb-2">{item.label}</p>
                  <p className="prose-editorial text-sm">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quarterly cadence */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <h3 className="font-serif text-3xl md:text-4xl text-foreground font-normal mb-3">The Quarterly Planning Cadence</h3>
          <p className="prose-editorial mb-10 max-w-xl">
            All work is planned on a quarterly cycle. Within each quarter, work flows through 
            three phases at the appropriate cadence.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-border">
                  {['Cadence', 'Phase', 'Key Decisions', 'Outputs'].map((h) => (
                    <th key={h} className="text-left py-4 pr-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { cadence: 'Quarterly', phase: 'Inception', decisions: 'What do we build this quarter? What order? What resources?', outputs: 'Quarterly roadmap, MoSCoW priorities, phase plan' },
                  { cadence: 'Per Phase (2–4 wk)', phase: 'Discovery', decisions: 'How do we build each feature? What does done look like? What patterns apply?', outputs: 'Context packages, user stories, testing contracts' },
                  { cadence: 'Per Sprint (2 wk)', phase: 'Delivery', decisions: 'Is context sufficient to manufacture? Triage AI output.', outputs: 'Working code (Q1/Q2/Q3), triage feedback, pattern library updates' },
                  { cadence: 'Daily', phase: 'Delivery', decisions: 'What is blocked? What needs context improvement today?', outputs: 'Unblocked items, urgent context requests' },
                ].map((row) => (
                  <tr key={row.cadence} className="border-b border-border/50 last:border-0">
                    <td className="py-5 pr-6 font-mono text-xs text-foreground">{row.cadence}</td>
                    <td className="py-5 pr-6 text-foreground">{row.phase}</td>
                    <td className="py-5 pr-6 text-muted-foreground">{row.decisions}</td>
                    <td className="py-5 text-muted-foreground">{row.outputs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
