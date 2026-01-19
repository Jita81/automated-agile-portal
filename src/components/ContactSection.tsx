import { motion } from 'framer-motion';
import { ArrowRight, Mail, Calendar, Clock } from 'lucide-react';

const steps = [
  { step: 'Step 1', title: 'Initial Conversation', duration: '20-30 minutes', description: 'Discuss your productivity challenges and assess potential fit.' },
  { step: 'Step 2', title: 'Formal Proposal', description: 'Detailed validation plan for your context with timeline and commercial terms.' },
  { step: 'Step 3', title: 'Two-Week Validation', price: '£15,000', description: 'Baseline measurement, methodology demonstration, clear recommendation.' },
  { step: 'Step 4', title: 'Three-Month Engagement', price: '£200,000', description: 'Full implementation with guaranteed 30% minimum improvement.' },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm text-muted-foreground mb-4 block">05</span>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              How to Get Started
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Timeline: 4-5 months from first contact to completion. No obligation—just an exploratory conversation.
            </p>

            <div className="space-y-6">
              {steps.map((item, index) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-sm text-primary font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      {item.price && (
                        <span className="font-mono text-sm text-primary">{item.price}</span>
                      )}
                      {item.duration && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={12} />
                          {item.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-card border border-border p-8 lg:p-12">
              <h3 className="text-2xl font-semibold mb-6">Investment Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Two-Week Validation</span>
                  <span className="font-semibold">£15,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Three-Month Engagement</span>
                  <span className="font-semibold">£200,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-semibold">Total Investment</span>
                  <span className="text-2xl font-bold text-primary">£215,000</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Payback Period</span>
                  <span className="font-semibold">8-16 months</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-8">
                Years 2+: £150-300k+ annual benefit with no additional cost.
              </p>

              <div className="flex flex-col gap-4">
                <a href="mailto:Paul@AutomatedAgile.co.uk" className="btn-primary justify-center">
                  <Mail size={18} />
                  Email Paul
                </a>
                <a href="https://calendly.com/paul-automatedagile/30min" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center">
                  <Calendar size={18} />
                  Book a 30-Min Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
