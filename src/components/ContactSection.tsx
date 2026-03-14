import { motion } from 'framer-motion';

const signOffMatrix = [
  { doc: 'Quarterly Roadmap', producedBy: 'Product Lead', reviewedBy: 'Eng Lead', signedBy: 'Business Sponsor', gate: 'Quarter start' },
  { doc: 'Phase Plan', producedBy: 'Delivery Lead', reviewedBy: 'Product Owner', signedBy: 'Eng Lead + PO', gate: 'Phase start' },
  { doc: 'Resource Allocation', producedBy: 'Eng Leads', reviewedBy: 'Context Eng', signedBy: 'Eng Leads', gate: 'Phase start' },
  { doc: 'Story Definition', producedBy: 'Three Amigos', reviewedBy: 'Context Eng', signedBy: 'All three Amigos', gate: 'Discovery exit' },
  { doc: 'Context Package', producedBy: 'Context Eng (auto-assembled)', reviewedBy: 'Developer + PO', signedBy: 'CE + TL + PO', gate: 'Manufacturing entry' },
  { doc: 'Testing Contract', producedBy: 'Context Eng', reviewedBy: 'Tech Lead', signedBy: 'Tech Lead', gate: 'Manufacturing entry' },
  { doc: 'Sprint Plan', producedBy: 'Dev Team', reviewedBy: 'PO + CE', signedBy: 'Team consensus', gate: 'Sprint start' },
  { doc: 'Triage Feedback', producedBy: 'Developer', reviewedBy: 'Context Eng', signedBy: 'Developer', gate: 'Context improvement' },
  { doc: 'Context Improvement Plan', producedBy: 'Context Eng', reviewedBy: 'Tech Lead', signedBy: 'CE + TL', gate: 'Next sprint' },
  { doc: 'Phase Completion Report', producedBy: 'Delivery Lead', reviewedBy: 'PO + Eng Lead', signedBy: 'PO + Eng Lead + Stakeholders', gate: 'Release / next phase' },
  { doc: 'Meeting Extraction', producedBy: 'Platform (auto)', reviewedBy: 'Context Eng', signedBy: 'All participants', gate: 'Context Graph entry' },
  { doc: 'Pattern Library Entry', producedBy: 'Codebase Intel (auto)', reviewedBy: 'Senior Dev', signedBy: 'Tech Lead', gate: 'Pattern library entry' },
];

export const ContactSection = () => {
  return (
    <section id="sign-off" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">06 — Output & Sign-Off Matrix</span>
          <h2 className="editorial-h2">Every Document. Every Gate.</h2>
          <p className="prose-editorial max-w-2xl">
            Every output document has a defined owner, reviewer, and sign-off authority. 
            Nothing enters the official context library or crosses a phase gate without 
            documented human approval.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-x-auto mb-20"
        >
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                {['Document', 'Produced by', 'Reviewed by', 'Signed off by', 'Gate it enables'].map((h) => (
                  <th key={h} className="text-left py-4 pr-6 font-mono text-xs tracking-widest uppercase text-muted-foreground last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {signOffMatrix.map((row) => (
                <tr key={row.doc} className="border-b border-border/40 last:border-0">
                  <td className="py-4 pr-6 text-foreground font-medium">{row.doc}</td>
                  <td className="py-4 pr-6 text-muted-foreground">{row.producedBy}</td>
                  <td className="py-4 pr-6 text-muted-foreground">{row.reviewedBy}</td>
                  <td className="py-4 pr-6 text-muted-foreground">{row.signedBy}</td>
                  <td className="py-4 font-mono text-xs text-foreground/50">{row.gate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 border-t border-border pt-16"
        >
          <div>
            <p className="font-serif text-3xl md:text-4xl text-foreground font-normal leading-snug mb-6">
              The platform proposes. Humans approve. Every time.
            </p>
            <p className="prose-editorial">
              The entire architecture rests on a single principle: AI accelerates every part 
              of the process, but humans remain accountable for every decision. Context is 
              captured automatically, structured automatically, and assembled automatically — 
              but it is never <em>approved</em> automatically.
            </p>
          </div>
          <div className="space-y-6 text-sm text-muted-foreground">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-2">Learn More</p>
              <div className="space-y-3">
                <a href="https://contextengineering.team/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <span className="font-mono text-xs text-foreground/30">→</span>
                  contextengineering.team
                </a>
                <a href="https://softwaremanufacturing.team/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <span className="font-mono text-xs text-foreground/30">→</span>
                  softwaremanufacturing.team
                </a>
                <a href="mailto:Paul@AutomatedAgile.co.uk" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <span className="font-mono text-xs text-foreground/30">→</span>
                  Paul@AutomatedAgile.co.uk
                </a>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-2">Document</p>
              <p className="text-xs font-mono text-muted-foreground">Version 1.0 · March 2026 · Part of the Automated Agile Framework</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
