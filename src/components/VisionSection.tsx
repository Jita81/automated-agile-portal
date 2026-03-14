import { motion } from 'framer-motion';

export const VisionSection = () => {
  return (
    <section id="vision" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-num">01</span>
          <h2 className="editorial-h2">The Mission</h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-5">
              <p className="prose-editorial">
                Every software organisation on earth is now asking the same question: 
                <strong> how do we actually capture the productivity promise of AI?</strong>
              </p>
              <p className="prose-editorial">
                The problem isn't access to AI tools—everyone has them. The problem is the absence 
                of a systematic, repeatable methodology that makes the improvement predictable, 
                scalable, and measurable across entire delivery cycles.
              </p>
              <p className="prose-editorial">
                We've spent two years developing exactly that. Automated Agile combines two 
                breakthrough disciplines—Context Engineering and Software Manufacturing—into 
                a single engagement model with a hard performance guarantee attached.
              </p>
            </div>

            <div className="space-y-5">
              <p className="prose-editorial">
                Most productivity efforts focus on the 20–30% of cycle time spent writing code. 
                We address the other 70–80%: requirements, coordination, handoffs, wait states, 
                and rework—the hidden majority of your delivery process.
              </p>
              <p className="prose-editorial">
                The result is not marginal improvement. It is a structural shift in how your teams 
                operate, embedded capability that compounds over time, and a permanent uplift you 
                own beyond the engagement.
              </p>

              <blockquote className="pt-4 border-l-2 border-foreground/20 pl-6">
                <p className="pull-quote text-xl md:text-2xl">
                  "30% minimum improvement—or half your money back."
                </p>
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
