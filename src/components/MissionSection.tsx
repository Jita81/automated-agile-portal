import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ArrowRight } from 'lucide-react';

export const MissionSection = () => {
  return (
    <section id="mission" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <SectionHeader
              number="01"
              title="Mission"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-8">
                We empower organizations to deliver beyond conventional limits and address 
                the defining challenges of modern software development.
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                From digital transformation to operational excellence to market responsiveness, 
                today's most pressing business priorities are, at their core, delivery problems. 
                We believe AI holds the key to solving them, unlocking unprecedented velocity 
                and quality across planning, development, and deployment.
              </p>
              <a href="#" className="btn-outline">
                About Us
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-border rounded-sm flex items-center justify-center">
                  <div className="w-1/2 h-1/2 bg-primary/10 rounded-sm flex items-center justify-center">
                    <span className="font-mono text-primary text-4xl font-bold">AA</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
