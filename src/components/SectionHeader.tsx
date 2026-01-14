import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader = ({ number, title, subtitle, align = 'left' }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      <span className="section-number mb-4 block">{number}</span>
      <h2 className="section-title mb-6">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
};
