import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ArrowRight, MapPin } from 'lucide-react';

const roles = [
  { title: 'Senior ML Engineer', location: 'San Francisco / Remote', type: 'Engineering' },
  { title: 'Product Designer', location: 'New York / Remote', type: 'Design' },
  { title: 'Solutions Architect', location: 'London / Remote', type: 'Customer Success' },
  { title: 'Staff Backend Engineer', location: 'San Francisco', type: 'Engineering' },
];

export const CareersSection = () => {
  return (
    <section id="careers" className="py-24 lg:py-32 bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-sm text-background/60 mb-4 block">04</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Working at
                <br />
                Automated Agile
              </h2>
              <p className="text-background/70 text-lg leading-relaxed mb-8 max-w-lg">
                Join a team of exceptional engineers, designers, and operators building 
                the future of software delivery. We're backed by leading investors and 
                growing fast.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300"
              >
                View All Openings
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>

          <div className="space-y-4">
            {roles.map((role, index) => (
              <motion.a
                key={role.title}
                href="#"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="block p-6 border border-background/20 hover:border-primary hover:bg-background/5 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-background/50 uppercase tracking-wider">
                      {role.type}
                    </span>
                    <h3 className="text-xl font-semibold mt-1 group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-background/60 text-sm">
                      <MapPin size={14} />
                      {role.location}
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-background/40 group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
