import { motion } from 'framer-motion';

const inputSources = [
  { source: 'Meeting transcript', method: 'Auto-record + transcribe', context: 'Decisions, requirements, action items, clarifications', decisions: 'D1–D8, D11' },
  { source: 'Git commit / PR', method: 'Webhook listener', context: 'Code patterns, file changes, review feedback', decisions: 'D5, D10, D11' },
  { source: 'Jira / PM tool update', method: 'Bidirectional sync', context: 'Story status, scope changes, blocking issues', decisions: 'D4, D8, D9' },
  { source: 'Slack / Teams thread', method: 'Opt-in channel listener', context: 'Ad-hoc decisions, clarifications, technical discussions', decisions: 'D4–D7' },
  { source: 'CI/CD pipeline result', method: 'Webhook listener', context: 'Test pass/fail, build status, coverage metrics', decisions: 'D10, D12' },
  { source: 'Architecture document', method: 'Manual upload or Confluence sync', context: 'System constraints, component boundaries, NFRs', decisions: 'D2, D5, D7' },
  { source: 'Production incident', method: 'Alerting integration', context: 'Failure patterns, constraint updates, risk factors', decisions: 'D5, D6, D11' },
  { source: 'User research / feedback', method: 'Manual upload or tool sync', context: 'Business context, user needs, priority signals', decisions: 'D1, D4' },
  { source: 'Codebase scan', method: 'Scheduled analysis pipeline', context: 'Success patterns, dependency graphs, file maps', decisions: 'D5, D7, D9' },
  { source: 'Triage feedback form', method: 'In-platform submission', context: 'Gap analysis, Q2 diffs, Q3 failure causes', decisions: 'D11' },
];

const integrations = [
  {
    category: 'Chat Tools',
    tools: 'Slack · Microsoft Teams',
    items: [
      { name: 'Passive context capture', body: 'Opt-in channels are monitored for project-relevant decisions and clarifications. When the platform detects a decision, it creates a draft context item and sends a confirmation prompt. The user confirms with a single emoji reaction or button click.' },
      { name: 'Meeting agenda distribution', body: 'Before each curated meeting, the platform posts the context-gap agenda to the relevant channel or DMs participants directly. Agenda items link to the specific context gaps in the platform so participants can prepare.' },
      { name: 'Sign-off collection', body: 'After meeting extractions are ready for review, participants receive a Slack/Teams message with a summary and approve/reject buttons. Sign-offs are collected asynchronously without requiring anyone to log into the platform.' },
    ],
  },
  {
    category: 'Call Tools',
    tools: 'Zoom · Microsoft Teams · Google Meet',
    items: [
      { name: 'Recording and transcription', body: 'A bot joins scheduled meetings automatically (based on calendar integration). It records, transcribes using speaker diarisation, and delivers the transcript to the Meeting Intelligence engine. Participants see the bot join and can remove it if the meeting should not be recorded.' },
      { name: 'Real-time sufficiency dashboard', body: 'During the meeting, the facilitator has a browser tab showing the live sufficiency tracker. This is a lightweight web view — not a plugin that requires installation. It updates every 30 seconds as the transcript is processed.' },
    ],
  },
  {
    category: 'Project Management',
    tools: 'Jira · Linear · Azure DevOps',
    items: [
      { name: 'Bidirectional sync', body: 'Work items created in the platform push to the PM tool. Status changes in the PM tool reflect in the Context Graph. Context packages link to stories via custom fields.' },
      { name: 'Context readiness field', body: 'A custom field on each story shows the current context readiness score (0–100%). Developers see at a glance which stories have sufficient context. Product owners can filter the backlog by context readiness.' },
      { name: 'Auto-story creation', body: 'When Three Amigos sessions produce new stories, they are automatically created in the PM tool with acceptance criteria, linked to the context package, and placed in the appropriate sprint or backlog position.' },
    ],
  },
  {
    category: 'Source Control',
    tools: 'GitHub · GitLab · Bitbucket',
    items: [
      { name: 'Pattern detection', body: 'Every push and merge triggers Codebase Intelligence analysis. New patterns, convention changes, and dependency updates flow into the Context Graph automatically.' },
      { name: 'PR enrichment', body: 'When a PR is created from AI-manufactured code, the platform automatically adds a comment linking to the context package that generated it. Reviewers can trace any line of code back to the business requirement that motivated it.' },
      { name: 'Feedback capture', body: 'PR review comments on manufactured code are captured as potential context improvements. A reviewer who writes "This should handle the null case" is automatically flagged as a testing contract gap.' },
    ],
  },
];

export const ROISection = () => {
  return (
    <section id="integrations" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">05 — Integration Architecture</span>
          <h2 className="editorial-h2">Inputs, Outputs & Integrations</h2>
          <p className="prose-editorial max-w-2xl">
            The platform wraps around existing tools. No one changes their workflow. 
            Context is captured where work already happens.
          </p>
        </motion.div>

        {/* Input sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-8">Input Sources</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  {['Source', 'Capture Method', 'Context Produced', 'Decisions Fed'].map((h) => (
                    <th key={h} className="text-left py-4 pr-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inputSources.map((row, i) => (
                  <tr key={row.source} className="border-b border-border/40 last:border-0">
                    <td className="py-4 pr-6 text-foreground font-medium">{row.source}</td>
                    <td className="py-4 pr-6 text-muted-foreground">{row.method}</td>
                    <td className="py-4 pr-6 text-muted-foreground">{row.context}</td>
                    <td className="py-4 font-mono text-xs text-foreground/60">{row.decisions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Integration architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal mb-8">Integration Architecture</h3>
          <div className="space-y-0 border-t border-border">
            {integrations.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
                className="border-b border-border py-12 grid md:grid-cols-[10rem_1fr] gap-6"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1">{group.category}</p>
                  <p className="font-mono text-xs text-foreground/40">{group.tools}</p>
                </div>
                <div className="space-y-6">
                  {group.items.map((item) => (
                    <div key={item.name}>
                      <p className="font-serif text-lg text-foreground font-normal mb-2">{item.name}</p>
                      <p className="prose-editorial text-sm">{item.body}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
