import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { Zap, GitBranch, Shield, LineChart } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Intelligent Automation',
    description: 'AI-powered workflows that adapt to your team\'s patterns and optimize delivery pipelines in real-time.',
  },
  {
    icon: GitBranch,
    title: 'Seamless Integration',
    description: 'Native connections to your existing toolchain—Jira, GitHub, Azure DevOps, and 200+ enterprise systems.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with end-to-end encryption and granular access controls.',
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    description: 'Machine learning models that forecast bottlenecks and recommend optimizations before issues arise.',
  },
];

export const PlatformSection = () => {
  return (
    <section id="platform" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          number="02"
          title="Platform"
          subtitle="A unified intelligence layer that transforms how teams plan, build, and ship software."
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-card border border-border hover:border-primary/30 transition-all duration-500 card-hover"
            >
              <feature.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
