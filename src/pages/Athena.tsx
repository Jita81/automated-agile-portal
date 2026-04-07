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
      <div className="pt-16">
        {/* Hero */}
        <section className="py-24 md:py-36">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Coming Soon — Closed Alpha
              </p>
              <h1 className="font-serif text-5xl md:text-7xl font-normal text-foreground leading-[1.1] mb-6 max-w-4xl">
                Meet Athena
              </h1>
              <p className="font-mono text-sm tracking-wide uppercase text-muted-foreground/60 mb-10 max-w-2xl">
                Your Automated Agile Facilitator — context-aware intelligence for stand-ups, retrospectives, and decision-making.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary inline-flex items-center gap-3"
              >
                <ArrowRight size={14} strokeWidth={1.5} />
                <span className="font-mono text-xs tracking-widest uppercase">Register for Closed Beta</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Video section */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
              {/* Video — takes 3 of 5 cols */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="md:col-span-3"
              >
                <div className="border border-border bg-card overflow-hidden">
                  <video
                    src="/videos/athena-demo.mov"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full aspect-video object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40 mt-3">
                  Alpha Preview — April 2026
                </p>
              </motion.div>

              {/* Copy — 2 of 5 cols */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                className="md:col-span-2 flex flex-col gap-6"
              >
                <blockquote className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed italic">
                  "I'd like to introduce Athena from Automated Agile.
                </blockquote>
                <p className="prose-editorial text-sm max-w-none">
                  It's still an Alpha, but we should self-improve ourselves to the Beta by the end of the month.
                </p>

                <div className="border-l border-border pl-5 mt-4 space-y-5">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-1">
                      What Athena Does
                    </p>
                    <p className="prose-editorial text-sm max-w-none">
                      Athena facilitates your Automated Agile ceremonies — running stand-ups, retrospectives, and decision-making sessions with context-aware intelligence.
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-1">
                      Status
                    </p>
                    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide uppercase text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Closed Alpha — Beta target: end of month
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="border-t border-border py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground mb-4">
                Get early access
              </h2>
              <p className="prose-editorial text-sm mb-10 max-w-lg mx-auto">
                Register for the Closed Beta and download the full Automated Agile process architecture as a Markdown file.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary inline-flex items-center gap-3"
              >
                <ArrowRight size={14} strokeWidth={1.5} />
                <span className="font-mono text-xs tracking-widest uppercase">Register for Closed Beta &amp; Download Context</span>
              </button>
            </motion.div>
          </div>
        </section>

        <Footer onDownloadClick={() => setModalOpen(true)} />
      </div>
      <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Athena;
