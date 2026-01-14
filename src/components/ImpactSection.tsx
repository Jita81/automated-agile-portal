import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';

const stats = [
  { value: '3x', label: 'Faster delivery cycles' },
  { value: '47%', label: 'Reduction in defects' },
  { value: '200+', label: 'Enterprise customers' },
  { value: '99.9%', label: 'Platform uptime' },
];

const testimonial = {
  quote: "Automated Agile transformed our entire delivery organization. We went from quarterly releases to continuous deployment in under six months.",
  author: "Sarah Chen",
  role: "CTO, Fortune 500 Financial Services",
};

export const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          number="03"
          title="Impact"
          subtitle="Measurable outcomes that redefine what's possible in software delivery."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center lg:text-left"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <blockquote className="relative">
            <span className="absolute -top-8 -left-4 text-8xl text-primary/20 font-serif">"</span>
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-8 relative z-10">
              {testimonial.quote}
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-mono text-sm font-bold">SC</span>
              </div>
              <div>
                <cite className="not-italic font-semibold block">{testimonial.author}</cite>
                <span className="text-muted-foreground text-sm">{testimonial.role}</span>
              </div>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};
