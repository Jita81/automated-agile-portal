import { motion } from 'framer-motion';

const strategicDecisions = [
  {
    num: 'D1',
    title: 'Portfolio Prioritisation',
    question: 'Of everything we could build, what matters most this quarter?',
    inputs: 'Business strategy, market conditions, customer feedback themes, technical debt severity scores, team capacity and velocity, prior quarter delivery vs. plan.',
    maker: 'Head of Product with Engineering leadership.',
    output: 'Prioritised quarterly roadmap with MoSCoW classification.',
    signoff: 'Quarterly Roadmap Document — signed by Product, Engineering, and Business stakeholders.',
  },
  {
    num: 'D2',
    title: 'Phase Breakdown',
    question: 'How do we break the quarter into testable, deliverable increments?',
    inputs: 'Prioritised roadmap, dependency map between items, team structure, integration complexity, risk register.',
    maker: 'Delivery Lead with Product and Engineering.',
    output: 'Phase plan with 2–4 phases of 2–4 weeks each, with defined scope and success criteria.',
    signoff: 'Phase Plan Document — signed by Delivery Lead and Product Owner.',
  },
  {
    num: 'D3',
    title: 'T-Shirt Sizing & Resource Allocation',
    question: 'How big is each piece of work, and which teams own it?',
    inputs: 'Roadmap items, product team boundaries, historical velocity data, team skill matrices, known technical constraints.',
    maker: 'Engineering Leads in Three Amigos with Product.',
    output: 'T-shirt sizes per item per team. Team assignments. Dependency identification.',
    signoff: 'Resource Allocation Matrix — signed by Engineering Leads.',
  },
];

const discoveryDecisions = [
  {
    num: 'D4',
    title: 'Story Decomposition',
    question: 'How do we break a feature into implementable stories with clear acceptance criteria?',
    inputs: 'Feature description from roadmap, business rules from stakeholder meetings, existing user journeys, architectural constraints, similar past features.',
    maker: 'Product Owner with Tech Lead and Context Engineer (Three Amigos).',
    output: 'User stories with Given/When/Then acceptance criteria, each linked to parent feature.',
    signoff: 'Story Definition Document — all three Amigos confirm each story is testable, implementable, and correctly scoped.',
  },
  {
    num: 'D5',
    title: 'Technical Approach',
    question: 'Which code patterns, files, and architectural approach should each story use?',
    inputs: 'Codebase analysis (affected files, dependency chain), success patterns, API contracts, data model, security requirements.',
    maker: 'Tech Lead, validated in Pattern Review meeting.',
    output: 'Technical section of the context package: components, files to modify/create, patterns to follow, error handling approach.',
    signoff: 'Technical Approach section of Context Package — signed by Tech Lead.',
  },
  {
    num: 'D6',
    title: 'Testing Contract',
    question: 'What are the preconditions, postconditions, invariants, and test scenarios?',
    inputs: 'Acceptance criteria, business rules, technical approach, existing test coverage, edge cases identified in Three Amigos.',
    maker: 'Context Engineer with Tech Lead review.',
    output: 'Testing contract within context package: preconditions, postconditions, invariants, and typed test scenarios.',
    signoff: 'Testing Contract section of Context Package — signed by Tech Lead.',
  },
  {
    num: 'D7',
    title: 'Context Package Approval',
    question: 'Is this context package complete enough to manufacture working software?',
    inputs: 'Assembled context package with completeness score, gap analysis, predicted queue outcome, all provenance trails.',
    maker: 'Context Engineer (completeness), Developer (technical accuracy), Product Owner (business correctness).',
    output: 'Approved context package (version-pinned), ready for manufacturing pipeline.',
    signoff: 'Three signatures: Context Engineer, Tech Lead, Product Owner.',
    critical: true,
  },
];

const deliveryDecisions = [
  { num: 'D8', title: 'Sprint Commitment', question: 'Which stories do we commit to this sprint?', inputs: 'Context readiness scores for all candidate stories, team capacity, dependency status, prior sprint velocity.', maker: 'Development team with Product Owner.', output: 'Sprint backlog with manufacturing sequence. Only stories with approved context packages enter.', signoff: 'Sprint Plan — team consensus in Sprint Planning.' },
  { num: 'D9', title: 'Manufacturing Submission', question: 'Is this specific story ready to submit to the AI manufacturing pipeline right now?', inputs: 'Approved context package, current codebase snapshot, manufacturing configuration, predicted queue outcome.', maker: 'Developer assigned to the story.', output: 'Manufacturing request submitted. Code generation begins.', signoff: 'Developer clicks Submit — implicit sign-off that context has been reviewed.' },
  { num: 'D10', title: 'Triage Classification', question: 'Is the generated code production-ready (Q1), a solid foundation needing human finishing (Q2), or unusable (Q3)?', inputs: 'Generated code, test results, AI self-assessment, acceptance criteria from context package, coding standards.', maker: 'Developer who submitted the manufacturing request.', output: 'Queue classification with structured feedback. For Q2: specific gap list. For Q3: failure analysis with root cause.', signoff: 'Triage Feedback Form — completed by developer, reviewed by Context Engineer.' },
  { num: 'D11', title: 'Context Improvement Priority', question: 'Based on triage feedback, which context packages need improvement most urgently?', inputs: 'Triage feedback from current sprint, queue distribution trends, differential analysis of Q2 code, Q3 failure patterns.', maker: 'Context Engineer, informed by Analytics Engine.', output: 'Prioritised improvement backlog: Q3 failures immediately, Q2 patterns weekly, Q1 successes monthly.', signoff: 'Context Improvement Plan — reviewed in Context Retrospective.' },
  { num: 'D12', title: 'Phase / Release Approval', question: 'Has this phase delivered its success criteria? Can we release?', inputs: 'All stories in phase: acceptance criteria pass/fail, test coverage, queue distribution, defect count, performance benchmarks, stakeholder demo feedback.', maker: 'Product Owner with Engineering Lead.', output: 'Release approval or list of items required before release.', signoff: 'Phase Completion Report — signed by PO, Engineering Lead, and relevant stakeholders.' },
];

const DecisionCard = ({ d, delay = 0 }: { d: typeof strategicDecisions[0] & { critical?: boolean }; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay }}
    className={`bg-background border-b border-border py-10 grid md:grid-cols-[8rem_1fr] gap-6 ${d.critical ? 'border-l-2 border-l-foreground/30 pl-6' : ''}`}
  >
    <div>
      <span className="font-mono text-xs tracking-widest text-muted-foreground">{d.num}</span>
      {d.critical && <p className="font-mono text-xs text-foreground mt-1 uppercase tracking-wider">Critical Gate</p>}
    </div>
    <div className="space-y-4">
      <h4 className="font-serif text-2xl text-foreground font-normal">{d.title}</h4>
      <p className="font-mono text-xs text-muted-foreground italic">"{d.question}"</p>
      <div className="grid sm:grid-cols-2 gap-4 pt-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-foreground/50 mb-1">Inputs required</p>
          <p className="text-sm text-muted-foreground">{d.inputs}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-foreground/50 mb-1">Output</p>
          <p className="text-sm text-muted-foreground">{d.output}</p>
          <p className="font-mono text-xs text-foreground/40 mt-2">Sign-off: {d.signoff}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export const ProblemSection = () => {
  return (
    <section id="decisions" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">02 — The Decision Taxonomy</span>
          <h2 className="editorial-h2">Twelve Decision Types</h2>
          <p className="prose-editorial max-w-2xl">
            There are exactly twelve decision types in the agile delivery process. Every meeting, 
            every review, every approval maps to one of these. The platform is designed to ensure 
            every decision type has the context it needs.
          </p>
        </motion.div>

        {/* Strategic */}
        <div className="mb-16">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-0 pb-4 border-b border-border">
            Strategic Decisions — Quarterly
          </h3>
          {strategicDecisions.map((d, i) => (
            <DecisionCard key={d.num} d={d} delay={i * 0.05} />
          ))}
        </div>

        {/* Discovery */}
        <div className="mb-16">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-0 pb-4 border-b border-border">
            Discovery Decisions — Per Phase
          </h3>
          {discoveryDecisions.map((d, i) => (
            <DecisionCard key={d.num} d={d} delay={i * 0.05} />
          ))}

          {/* Critical gate callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border p-8 mt-2"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-3">The Critical Gate</p>
            <p className="prose-editorial">
              Decision 7 is the most important gate in the entire process. 
              <strong> Nothing enters the manufacturing pipeline without a signed-off context package.</strong> 
              {' '}This is where quality is assured—not after code is generated, but before.
            </p>
          </motion.div>
        </div>

        {/* Delivery */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-0 pb-4 border-b border-border">
            Delivery Decisions — Per Sprint / Per Story
          </h3>
          {deliveryDecisions.map((d, i) => (
            <DecisionCard key={d.num} d={d} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
};
