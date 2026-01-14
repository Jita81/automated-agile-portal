import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { AlertTriangle, TrendingDown, Users, Clock } from 'lucide-react';

const problems = [
  {
    icon: TrendingDown,
    title: 'Inconsistent Results',
    description: 'Some developers see 10-15% improvement, others see minimal benefit. No systematic approach.',
  },
  {
    icon: Users,
    title: 'Results Don\'t Scale',
    description: 'Ad-hoc AI tool usage delivers inconsistent results. Can\'t reliably predict outcomes across teams.',
  },
  {
    icon: Clock,
    title: 'Wrong Focus',
    description: 'Most AI efforts focus on making developers code faster—optimizing only 20-30% of total cycle time.',
  },
  {
    icon: AlertTriangle,
    title: 'Missing the 70-80%',
    description: 'Requirements, coordination, handoffs, wait states, and rework consume most of cycle time.',
  },
];

export const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          number="01"
          title="The Problem"
          subtitle="AI Productivity Has No Scalable Solution"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every company knows AI can improve software productivity. Teams are using tools 
            like Copilot, ChatGPT, and Claude. But there's a problem—
            <span className="text-foreground font-medium"> what's missing is a scalable, reliable 
            methodology that consistently delivers measurable productivity improvement.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-card border border-border hover:border-destructive/30 transition-all duration-500 card-hover"
            >
              <problem.icon className="w-8 h-8 text-destructive mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual: Where time is spent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="bg-secondary/30 p-8 lg:p-12"
        >
          <h3 className="text-2xl font-semibold mb-8">Where Productivity Is Actually Lost</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-end gap-4 mb-4">
                <div className="w-full bg-primary/20 h-16 flex items-center justify-center">
                  <span className="font-mono text-lg font-bold">20-30%</span>
                </div>
              </div>
              <p className="text-muted-foreground text-center font-mono text-sm">Development</p>
            </div>
            <div className="flex-[3]">
              <div className="flex items-end gap-4 mb-4">
                <div className="w-full bg-destructive/20 h-16 flex items-center justify-center">
                  <span className="font-mono text-lg font-bold">70-80%</span>
                </div>
              </div>
              <p className="text-muted-foreground text-center font-mono text-sm">Everything Else</p>
              <p className="text-muted-foreground/60 text-center text-xs mt-2">
                Requirements, coordination, handoffs, wait states, rework
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
