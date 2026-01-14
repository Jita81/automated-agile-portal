import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { TrendingUp, Zap, Users, Clock } from 'lucide-react';

const roiData = [
  { teamSize: '10 people', payroll: '£500,000', value: '£150,000', payback: '10.5 mo', yearlyBenefit: '£150,000/year' },
  { teamSize: '12 people', payroll: '£600,000', value: '£180,000', payback: '8.75 mo', yearlyBenefit: '£180,000/year' },
  { teamSize: '15 people', payroll: '£750,000', value: '£225,000', payback: '7 mo', yearlyBenefit: '£225,000/year' },
  { teamSize: '20 people', payroll: '£1,000,000', value: '£300,000', payback: '5.25 mo', yearlyBenefit: '£300,000/year' },
];

const strategicBenefits = [
  { icon: Zap, title: 'Competitive Advantage', description: 'Deliver faster than competitors' },
  { icon: Clock, title: 'Market Responsiveness', description: 'Faster time-to-market' },
  { icon: Users, title: 'Team Morale', description: 'Less frustration, clearer direction' },
  { icon: TrendingUp, title: 'Hiring Efficiency', description: 'Productive teams need less growth' },
];

export const ROISection = () => {
  return (
    <section id="roi" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          number="04"
          title="Return on Investment"
          subtitle="The improvement is permanent. You're buying capability, not a service that ends."
        />

        {/* ROI Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 overflow-x-auto"
        >
          <table className="w-full bg-card border border-border">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-mono text-sm uppercase tracking-wider text-muted-foreground">Team Size</th>
                <th className="text-left p-4 font-mono text-sm uppercase tracking-wider text-muted-foreground">Annual Payroll</th>
                <th className="text-left p-4 font-mono text-sm uppercase tracking-wider text-muted-foreground">30% Value</th>
                <th className="text-left p-4 font-mono text-sm uppercase tracking-wider text-muted-foreground">Payback</th>
                <th className="text-left p-4 font-mono text-sm uppercase tracking-wider text-muted-foreground">Year 2+ Benefit</th>
              </tr>
            </thead>
            <tbody>
              {roiData.map((row, index) => (
                <tr key={row.teamSize} className={index !== roiData.length - 1 ? 'border-b border-border' : ''}>
                  <td className="p-4 font-semibold">{row.teamSize}</td>
                  <td className="p-4 text-muted-foreground">{row.payroll}</td>
                  <td className="p-4 text-primary font-semibold">{row.value}</td>
                  <td className="p-4 text-muted-foreground">{row.payback}</td>
                  <td className="p-4 text-foreground">{row.yearlyBenefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-muted-foreground mt-4">
            Investment: £140,000 total (£15k validation + £125k engagement)
          </p>
        </motion.div>

        {/* Example Calculation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16"
        >
          <div className="bg-card border border-primary/30 p-8">
            <h3 className="text-xl font-semibold mb-6">Example: 12-Person Team</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Annual benefit</span>
                <span className="text-2xl font-bold text-primary">£180,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Year 1 net (after £140k investment)</span>
                <span className="text-xl font-semibold">£40,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">3-year total benefit</span>
                <span className="text-xl font-semibold">£400,000</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">3-year ROI</span>
                <span className="text-3xl font-bold text-primary">286%</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-8">
            <h3 className="text-xl font-semibold mb-6">Early Adopter Pricing</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current (Early Adopter)</span>
                <span className="text-2xl font-bold">£125,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Future (Standard)</span>
                <span className="text-xl text-muted-foreground line-through">£175-200,000</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-semibold">Your Savings</span>
                <span className="text-xl font-bold text-primary">£50-75,000</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              First-time commercial offering in 2026. You'd be among the first 10-12 organizations—first-mover 
              advantage at discounted pricing.
            </p>
          </div>
        </motion.div>

        {/* Strategic Benefits */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {strategicBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <benefit.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
