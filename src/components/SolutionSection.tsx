import { motion } from 'framer-motion';

const meetingTypes = [
  {
    num: 'M1',
    title: 'Quarterly Planning',
    phase: 'Inception',
    frequency: 'Once per quarter — half-day or full-day session',
    participants: 'Product Leads, Engineering Leads, Business Stakeholders, Context Engineers',
    decisions: 'D1 Portfolio Prioritisation · D2 Phase Breakdown · D3 T-Shirt Sizing',
    agenda: 'Prior quarter results, carry-over items, new backlog candidates, technical debt ranked by impact, team capacity, dependency conflicts.',
    realtime: 'Tracks whether each roadmap item has a clear business rationale, owner, MoSCoW classification, T-shirt size, and identified dependencies.',
    outputs: 'Quarterly Roadmap · Phase Plan · Resource Allocation Matrix',
  },
  {
    num: 'M2',
    title: 'Stakeholder Deep-Dive',
    phase: 'Inception / Discovery',
    frequency: 'As needed — typically 3–5 sessions during inception, ad-hoc during discovery',
    participants: 'Specific stakeholder(s) + Context Engineer. Optionally Product Owner',
    decisions: 'Feeds D1, D4, D6 with business domain knowledge',
    agenda: 'Specific business context gaps, questions from ambiguous requirements, business rules needing clarification, edge cases from similar past features.',
    realtime: 'Tracks whether each gap has been addressed. Highlights contradictions with existing context.',
    outputs: 'Stakeholder Interview Summary · Updated business requirements · New constraints added to Context Graph',
  },
  {
    num: 'M3',
    title: 'Three Amigos',
    phase: 'Discovery',
    frequency: 'Weekly 2-hour sessions during discovery phases — the most important recurring meeting',
    participants: 'Product Owner + Tech Lead + Context Engineer. Always all three. No substitutes.',
    decisions: 'D4 Story Decomposition · D5 Technical Approach · D6 Testing Contract',
    agenda: 'Features requiring story decomposition, draft stories needing acceptance criteria, context gaps per story with role-specific questions for each Amigo, success patterns for reference.',
    realtime: 'Per-story context completeness tracker. Alerts when a story has been discussed for >15 minutes without any testable acceptance criteria stated.',
    outputs: 'Story Definition Documents · Draft Context Packages auto-assembled from session outputs · Follow-up gap items',
  },
  {
    num: 'M4',
    title: 'Pattern Review',
    phase: 'Discovery',
    frequency: 'Once per discovery phase, or triggered when Codebase Intelligence detects new patterns',
    participants: 'Tech Lead + Context Engineer + Senior Developer(s)',
    decisions: 'D5 Technical Approach — specifically the success patterns section',
    agenda: 'Candidate patterns detected by Codebase Intelligence, stories lacking matched patterns, patterns needing validation, anti-patterns from Q3 failure analysis.',
    realtime: '—',
    outputs: 'Validated Pattern Library entries · Anti-pattern register · Updated context packages with newly matched patterns',
  },
  {
    num: 'M5',
    title: 'Sprint Planning',
    phase: 'Delivery',
    frequency: 'Start of each sprint — fortnightly',
    participants: 'Full development team + Product Owner + Context Engineer',
    decisions: 'D8 Sprint Commitment',
    agenda: 'Candidate stories ranked by context readiness score, phase priority, and dependency order. Each story shows predicted queue outcome and blocking gaps.',
    realtime: 'Running capacity tracker. Alerts when committing a story with context readiness below 70%. Highlights dependency chains.',
    outputs: 'Sprint Plan with committed stories, manufacturing sequence, and capacity allocation',
  },
  {
    num: 'M6',
    title: 'Daily Stand-Up',
    phase: 'Delivery',
    frequency: 'Daily — 15 minutes maximum',
    participants: 'Development team + Context Engineer',
    decisions: 'D9 Manufacturing Submission, unblocking decisions, scope micro-adjustments',
    agenda: 'Overnight manufacturing results requiring triage, stories blocked by context gaps, stories ready for manufacturing, context improvements completed since yesterday.',
    realtime: 'Sprint burndown with context readiness overlay — not just "work remaining" but "context-ready work remaining".',
    outputs: 'No formal document. Actions captured as context gap requests or Jira status updates via integration.',
  },
  {
    num: 'M7',
    title: 'Context Retrospective',
    phase: 'Delivery',
    frequency: 'End of each sprint — 1 hour',
    participants: 'Context Engineer + Tech Lead + interested developers',
    decisions: 'D11 Context Improvement Priority',
    agenda: 'Sprint queue distribution (Q1/Q2/Q3 trends), top 3 Q3 failure causes, common patterns in Q2 developer modifications, Q1 success patterns to replicate.',
    realtime: '—',
    outputs: 'Context Improvement Plan for next sprint · Updated pattern library entries · Sprint Context Quality Report',
  },
];

export const SolutionSection = () => {
  return (
    <section id="meetings" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">03 — The Meeting Architecture</span>
          <h2 className="editorial-h2">Seven Meeting Types</h2>
          <p className="prose-editorial max-w-2xl">
            Every meeting in this framework is a context-generating machine. The platform curates 
            each meeting's agenda based on known context gaps, monitors the conversation in real 
            time for sufficiency, and extracts structured outputs for human review.
          </p>
        </motion.div>

        {/* Meeting curation explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-3 gap-px bg-border mb-20"
        >
          {[
            { label: 'Before', heading: 'Agenda Generation', body: 'The platform scans the Context Graph for gaps relevant to the meeting\'s purpose and participants. It produces a structured agenda of specific questions that need answers, sent to participants in advance.' },
            { label: 'During', heading: 'Real-Time Sufficiency', body: 'The platform processes the transcript in real time and provides a live sufficiency dashboard. Green: covered. Amber: partially addressed. Red: not yet discussed. The facilitator uses this to steer conversation.' },
            { label: 'After', heading: 'Extraction & Sign-Off', body: 'Within minutes of the meeting ending, the platform produces a Meeting Extraction Document. Automated extraction → facilitator review → participant sign-off. No item enters the Context Graph without human confirmation.' },
          ].map((item) => (
            <div key={item.label} className="bg-background p-8 lg:p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">{item.label}</p>
              <h4 className="font-serif text-xl text-foreground font-normal mb-3">{item.heading}</h4>
              <p className="prose-editorial text-sm">{item.body}</p>
            </div>
          ))}
        </motion.div>

        {/* The Documentation Contract */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border p-8 mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">The Documentation Contract</p>
          <p className="prose-editorial">
            No extracted item enters the Context Graph without human confirmation. 
            <strong> The platform proposes; humans approve.</strong> This ensures the context library 
            is trustworthy — every item has a human who vouches for its accuracy.
          </p>
        </motion.div>

        {/* Meeting cards */}
        <div className="space-y-0 border-t border-border">
          {meetingTypes.map((m, i) => (
            <motion.div
              key={m.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="border-b border-border py-12 grid md:grid-cols-[7rem_1fr] gap-6"
            >
              <div className="pt-1">
                <span className="font-mono text-xs text-muted-foreground">{m.num}</span>
                <span className="block font-mono text-xs text-foreground/40 mt-1">{m.phase}</span>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-6">
                  <h4 className="font-serif text-2xl md:text-3xl text-foreground font-normal">{m.title}</h4>
                  <span className="font-mono text-xs text-muted-foreground">{m.frequency}</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-2">Participants</p>
                    <p className="text-muted-foreground">{m.participants}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-2">Decisions served</p>
                    <p className="text-muted-foreground">{m.decisions}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-2">Platform agenda</p>
                    <p className="text-muted-foreground">{m.agenda}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-2">Outputs</p>
                    <p className="text-muted-foreground">{m.outputs}</p>
                  </div>
                </div>

                {m.realtime && m.realtime !== '—' && (
                  <div className="mt-4 bg-card/50 border border-border/50 px-4 py-3">
                    <span className="font-mono text-xs text-foreground/40 mr-2">Real-time:</span>
                    <span className="text-xs text-muted-foreground">{m.realtime}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
