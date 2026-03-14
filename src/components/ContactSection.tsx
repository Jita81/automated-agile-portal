import { motion } from 'framer-motion';
import { Mail, Calendar } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Initial Conversation',
    duration: '20–30 minutes',
    description: 'A no-obligation exploratory call to discuss your productivity challenges and assess potential fit.',
  },
  {
    num: '02',
    title: 'Formal Proposal',
    description: 'A detailed validation plan for your specific context—timeline, team requirements, and commercial terms.',
  },
  {
    num: '03',
    title: 'Two-Week Validation',
    price: '£15,000',
    description: 'Baseline measurement, methodology demonstration, and a clear recommendation on whether to proceed.',
  },
  {
    num: '04',
    title: 'Three-Month Pilot',
    price: '£200,000',
    description: 'Single delivery team. 30% guaranteed improvement. Option to expand to additional teams.',
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">06</span>
          <h2 className="editorial-h2">Get Started</h2>
          <p className="prose-editorial max-w-xl">
            The process takes 4–5 months from first contact to completion. It begins with 
            a conversation, not a contract.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-0 border-t border-border">
              {steps.map((step) => (
                <div key={step.num} className="border-b border-border py-7 grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-mono text-xs text-muted-foreground pt-0.5">{step.num}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <h4 className="font-serif text-xl text-foreground font-normal">{step.title}</h4>
                      {step.price && (
                        <span className="font-mono text-sm text-foreground/60">{step.price}</span>
                      )}
                      {step.duration && (
                        <span className="font-mono text-xs text-muted-foreground">{step.duration}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-start"
          >
            <div className="bg-card border border-border p-8 lg:p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Contact</p>

              <p className="font-serif text-3xl md:text-4xl text-foreground font-normal mb-8 leading-snug">
                Start with a conversation. No obligation.
              </p>

              <p className="prose-editorial text-sm mb-10">
                Speak directly with Paul, the founder. If there's a fit, we'll design the 
                validation around your specific environment within a week.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:Paul@AutomatedAgile.co.uk"
                  className="btn-primary w-full justify-center"
                >
                  <Mail size={16} />
                  Email Paul directly
                </a>
                <a
                  href="https://calendly.com/paul-automatedagile/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full justify-center"
                >
                  <Calendar size={16} />
                  Book a 30-minute call
                </a>
              </div>

              <p className="mt-6 text-xs text-muted-foreground font-mono">
                Paul@AutomatedAgile.co.uk
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
