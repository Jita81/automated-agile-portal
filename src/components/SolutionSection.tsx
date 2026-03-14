import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const SolutionSection = () => {
  return (
    <section id="solution" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-num">03</span>
          <h2 className="editorial-h2">Our Methodology</h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            <div className="space-y-5">
              <p className="prose-editorial">
                Automated Agile is built on two proven disciplines that, in combination, 
                create something that neither achieves alone: a complete, scalable, and 
                measurable approach to AI-powered software productivity.
              </p>
              <p className="prose-editorial">
                We've spent two years developing and validating this methodology. It is not 
                theory—it is an operational system with a performance guarantee.
              </p>
            </div>

            <div className="space-y-5">
              <p className="prose-editorial">
                The engagement model is deliberately phased to de-risk the investment. 
                A two-week validation comes first—proving the approach works for your 
                specific context before any major commitment is made.
              </p>
              <p className="prose-editorial">
                The three-month pilot then embeds the methodology inside a single delivery 
                team, transfers capability permanently, and delivers the guaranteed improvement.
              </p>
            </div>
          </div>

          {/* Two methodology cards */}
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {[
              {
                num: '01',
                title: 'Context Engineering',
                url: 'https://contextengineering.team/',
                body: 'The foundation of consistent AI output. Context Engineering is the discipline of ensuring AI tools receive precisely the right information at the right time—enabling reliable, high-quality outputs at scale across your entire delivery process.',
              },
              {
                num: '02',
                title: 'Software Manufacturing',
                url: 'https://softwaremanufacturing.team/',
                body: 'Manufacturing principles applied to software delivery. Systematically automating the 70–80% of cycle time lost to coordination, requirements overhead, and process friction—transforming unpredictable delivery into a repeatable production system.',
              },
            ].map((item) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card p-8 lg:p-10 flex flex-col gap-6"
              >
                <span className="font-mono text-xs tracking-widest text-muted-foreground">{item.num}</span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal">{item.title}</h3>
                <p className="prose-editorial text-sm md:text-base flex-1">{item.body}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs tracking-wider uppercase text-foreground/60 hover:text-foreground transition-colors"
                >
                  Learn more <ArrowUpRight size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
