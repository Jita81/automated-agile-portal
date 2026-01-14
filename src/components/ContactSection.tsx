import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm text-muted-foreground mb-4 block">05</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Ready to transform
              <br />
              your delivery?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              Schedule a demo with our team to see how Automated Agile can accelerate 
              your organization's path to continuous delivery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="btn-primary">
                Request Demo
                <ArrowRight size={18} />
              </a>
              <a href="#" className="btn-outline">
                Contact Sales
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
