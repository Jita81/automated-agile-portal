import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DownloadModal } from '@/components/DownloadModal';
import { ArrowRight } from 'lucide-react';

const Athena = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Simple coming soon page */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl text-center"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-6">
            Coming Soon
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-normal text-foreground leading-[1.05] mb-6">
            Meet Athena.
          </h1>
          <p className="prose-editorial text-lg md:text-xl text-foreground/70 mb-12 max-w-lg mx-auto">
            Your automated agile facilitator. Still in Alpha — Beta by the end of the month.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary inline-flex items-center gap-3"
          >
            <ArrowRight size={14} strokeWidth={1.5} />
            <span className="font-mono text-xs tracking-widest uppercase">Register for Closed Beta</span>
          </button>
        </motion.div>
      </section>

      <Footer onDownloadClick={() => setModalOpen(true)} />
      <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Athena;
