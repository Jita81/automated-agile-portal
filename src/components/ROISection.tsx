import { motion } from 'framer-motion';

const roiData = [
  { teamSize: '10 people', payroll: '£500,000', value: '£150,000', payback: '16 months' },
  { teamSize: '12 people', payroll: '£600,000', value: '£180,000', payback: '13 months' },
  { teamSize: '15 people', payroll: '£750,000', value: '£225,000', payback: '11 months' },
  { teamSize: '20 people', payroll: '£1,000,000', value: '£300,000', payback: '8 months' },
];

export const ROISection = () => {
  return (
    <section id="roi" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="section-num">05</span>
          <h2 className="editorial-h2">Return on Investment</h2>
          <p className="prose-editorial max-w-xl">
            The improvement is permanent. You're buying a capability your teams own forever—not 
            a service that ends when the engagement does.
          </p>
        </motion.div>

        {/* ROI table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 pr-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">Team Size</th>
                <th className="text-left py-4 pr-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">Annual Payroll</th>
                <th className="text-left py-4 pr-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">30% Value / Year</th>
                <th className="text-left py-4 font-mono text-xs tracking-widest uppercase text-muted-foreground">Payback Period</th>
              </tr>
            </thead>
            <tbody>
              {roiData.map((row, i) => (
                <tr key={row.teamSize} className="border-b border-border/50 last:border-0">
                  <td className="py-5 pr-6 text-foreground font-medium">{row.teamSize}</td>
                  <td className="py-5 pr-6 text-muted-foreground">{row.payroll}</td>
                  <td className="py-5 pr-6 text-foreground font-semibold">{row.value}</td>
                  <td className="py-5 text-muted-foreground">{row.payback}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-mono text-xs text-muted-foreground">Investment: £215,000 total (£15k validation + £200k pilot)</p>
        </motion.div>

        {/* Pricing & early adopter */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card p-8 lg:p-10"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Early Adopter Pricing</p>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-baseline border-b border-border pb-4">
                <span className="text-muted-foreground text-sm">Two-Week Validation</span>
                <span className="font-mono text-lg text-foreground">£15,000</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-border pb-4">
                <span className="text-muted-foreground text-sm">Three-Month Pilot</span>
                <span className="font-mono text-lg text-foreground">£200,000</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-border pb-4">
                <span className="text-foreground font-medium text-sm">Total Investment</span>
                <span className="font-mono text-2xl text-foreground">£215,000</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground text-sm">Future Standard Pricing</span>
                <span className="font-mono text-lg text-muted-foreground line-through">£265,000</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              You'd be among the first 10–12 organisations. First-mover advantage at discounted pricing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card p-8 lg:p-10 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Year Two and Beyond</p>
              <p className="font-serif text-3xl md:text-4xl text-foreground font-normal mb-4">
                £150–300k+ annual benefit at zero additional cost.
              </p>
              <p className="prose-editorial text-sm">
                The methodology becomes part of how your organisation works. The capability 
                is yours—no ongoing licence, no retainer, no dependency on Automated Agile.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
