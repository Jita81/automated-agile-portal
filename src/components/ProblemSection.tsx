import { motion } from 'framer-motion';

export const ProblemSection = () => {
  return (
    <section id="problem" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-num">02</span>
          <h2 className="editorial-h2">The Problem</h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            <div className="space-y-5">
              <p className="prose-editorial">
                Teams are using Copilot, ChatGPT, and Claude. Some developers report 10–15% 
                improvements. Others see almost nothing. Results are inconsistent, unpredictable, 
                and impossible to rely on at an organisational level.
              </p>
              <p className="prose-editorial">
                The root cause is that <strong>AI tool adoption is not the same as AI methodology</strong>. 
                Handing a developer a new tool and hoping for results is the equivalent of giving a 
                factory worker a better wrench without changing the production line.
              </p>
            </div>

            <div className="space-y-5">
              <p className="prose-editorial">
                Worse, the productivity conversation has been entirely captured by a single metric: 
                developer coding speed. But coding is only 20–30% of the total software delivery 
                cycle.
              </p>
              <p className="prose-editorial">
                The other 70–80%—<strong>requirements gathering, sprint planning, coordination, 
                handoffs, wait states, review cycles, rework</strong>—has been almost entirely 
                ignored by every AI productivity solution on the market.
              </p>
            </div>
          </div>

          {/* Visual bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-card border border-border p-8 lg:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">Where your cycle time actually goes</p>
            <div className="flex gap-1 h-14 mb-4">
              <div className="flex items-center justify-center bg-foreground/10 text-foreground font-mono text-sm font-medium" style={{ width: '25%' }}>
                20–30%
              </div>
              <div className="flex items-center justify-center bg-foreground/25 text-foreground font-mono text-sm font-medium flex-1">
                70–80%
              </div>
            </div>
            <div className="flex gap-1 text-xs font-mono text-muted-foreground">
              <div style={{ width: '25%' }}>Coding</div>
              <div className="flex-1">Requirements · Coordination · Handoffs · Wait states · Rework</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
