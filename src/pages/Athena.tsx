import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DownloadModal } from '@/components/DownloadModal';
import { Calendar } from 'lucide-react';

const Athena = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Book a Demo — Athena, Automated Agile Facilitator</title>
        <meta name="description" content="See Athena in action — the Automated Agile facilitator. Book a demo to get early access to the closed beta." />
        <link rel="canonical" href="https://automatedagile.co.uk/athena" />
        <meta property="og:title" content="Book a Demo — Athena, Automated Agile Facilitator" />
        <meta property="og:description" content="See Athena in action. Book a demo of the Automated Agile facilitator." />
        <meta property="og:url" content="https://automatedagile.co.uk/athena" />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="https://automatedagile.co.uk/favicon.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Athena",
          "description": "Automated Agile facilitator. AI-powered ceremony facilitation for software delivery teams. Currently in Alpha.",
          "brand": { "@type": "Brand", "name": "Automated Agile" },
          "url": "https://automatedagile.co.uk/athena"
        })}</script>
      </Helmet>
      <Header />

      <section className="min-h-[90vh] flex items-center justify-center px-6 lg:px-10 py-24">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Mobile-format video */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center md:justify-end order-2 md:order-1"
          >
            <div className="relative w-full max-w-[300px] aspect-[9/19.5] border border-border bg-card overflow-hidden rounded-[2.5rem] shadow-2xl">
              <video
                src="/videos/athena-demo.mov"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>

          {/* Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="order-1 md:order-2"
          >
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-6">
              Closed Alpha — Beta Soon
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-normal text-foreground leading-[1.05] mb-6">
              Athena.
            </h1>
            <p className="prose-editorial text-lg text-foreground/70 mb-10 max-w-lg">
              Your automated agile facilitator. See her in action — then book a demo to bring her into your team's workflow.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary inline-flex items-center gap-3"
            >
              <Calendar size={14} strokeWidth={1.5} />
              <span className="font-mono text-xs tracking-widest uppercase">Book a Demo</span>
            </button>
          </motion.div>
        </div>
      </section>

      <Footer onDownloadClick={() => setModalOpen(true)} />
      <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Athena;
