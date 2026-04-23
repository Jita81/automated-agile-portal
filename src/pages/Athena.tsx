import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DownloadModal } from '@/components/DownloadModal';
import { ArrowRight, ShieldCheck, GitBranch, Gauge, Sparkles } from 'lucide-react';

const pipelineStages = [
  {
    n: '01',
    title: 'Inception',
    body: 'Context capture from documents, meetings, and voice transcripts. Every input is named, attributable, and signed off.',
  },
  {
    n: '02',
    title: 'Discovery',
    body: 'AI-drafted epics, features, and stories with automatic gap detection against the captured context.',
  },
  {
    n: '03',
    title: 'Sprint Readiness Gate',
    body: 'Zero blocking gaps required before manufacturing begins. The gate is the governance contract.',
  },
  {
    n: '04',
    title: 'Delivery',
    body: 'Per-story Claude Code agents run against the context packages — on the customer\u2019s own Claude Max subscription via OAuth.',
  },
  {
    n: '05',
    title: 'Sprint Ceremonies',
    body: 'Review, retrospective, and readiness for the next sprint — facilitated by Athena, our automated agile facilitator.',
  },
  {
    n: '06',
    title: 'Tuning',
    body: 'Every LLM call is a versioned use case. Empirical model selection, quality thresholds, and a human-gated improvement loop.',
  },
];

const principles = [
  {
    icon: ShieldCheck,
    label: 'Governance-first',
    body: 'Every agent action is visible, attributable, and correctable. Every context item entering the pipeline requires named human sign-off.',
  },
  {
    icon: GitBranch,
    label: 'Customer-paid compute',
    body: 'Manufacturing runs against the customer\u2019s own Claude Max subscription. The platform orchestrates; the customer\u2019s credits pay.',
  },
  {
    icon: Gauge,
    label: 'Empirical tuning cockpit',
    body: 'Named, typed, registered use cases. Model choices proven by controlled experiment — updated per use case without a redeploy.',
  },
];

const Athena = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-24 md:py-36 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-6">
                Product — Closed Beta
              </p>
              <h1 className="font-serif text-5xl md:text-7xl font-normal text-foreground leading-[1.05] mb-8 max-w-5xl">
                The autonomous delivery management platform for enterprise software.
              </h1>
              <p className="prose-editorial text-lg md:text-xl max-w-3xl mb-10 text-foreground/80">
                Automated Agile compresses the BA, PM, solution architect, and scrum master roles into a single governed pipeline. A project brief becomes a sprint-ready backlog — and then merged code — without a human touching the intermediate documents except to review and confirm.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-primary inline-flex items-center gap-3"
                >
                  <ArrowRight size={14} strokeWidth={1.5} />
                  <span className="font-mono text-xs tracking-widest uppercase">Register for Closed Beta</span>
                </button>
                <a
                  href="#pipeline"
                  className="font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-border hover:border-foreground pb-1"
                >
                  See the pipeline ↓
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Validation strip */}
        <section className="py-16 border-b border-border bg-muted/20">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-10">
            {[
              { stat: '95%', label: 'Effort reduction on a live enterprise programme — Entain design system migration.' },
              { stat: '7,200 → 360', label: 'Man-days. Multi-year roadmap delivered in six months.' },
              { stat: '24-run', label: 'Controlled model matrix in production. Empirical winner selected per use case.' },
            ].map((item, i) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="font-serif text-4xl md:text-5xl text-foreground mb-3">{item.stat}</p>
                <p className="prose-editorial text-sm text-muted-foreground max-w-xs">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Thesis */}
        <section className="py-24 md:py-32 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">The Thesis</p>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground leading-tight mb-8">
                Software delivery failures are fundamentally context failures, not model failures.
              </h2>
              <p className="prose-editorial text-base md:text-lg max-w-3xl">
                Automated Agile treats context as a first-class managed asset. The translation overhead of enterprise delivery — 30–45 FTE at portfolio scale across BAs, PMs, architects, and scrum masters — is the highest-ROI automation target in enterprise software. We are building the operating system for that revolution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="py-24 md:py-32 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-16 max-w-3xl"
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">The Product</p>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground leading-tight">
                A six-stage pipeline. Brief to merged code.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              {pipelineStages.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-background p-8 md:p-10"
                >
                  <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground/60 mb-4">{s.n}</p>
                  <h3 className="font-serif text-2xl text-foreground mb-3">{s.title}</h3>
                  <p className="prose-editorial text-sm text-muted-foreground max-w-md">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Athena — the facilitator */}
        <section className="py-24 md:py-32 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <Sparkles size={14} strokeWidth={1.5} className="text-foreground" />
                <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  Coming Soon — Closed Alpha
                </p>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground leading-tight mb-4 max-w-3xl">
                Meet Athena — your automated agile facilitator.
              </h2>
              <p className="prose-editorial text-base md:text-lg max-w-2xl mb-12">
                Athena facilitates your Automated Agile ceremonies — running stand-ups, retrospectives, and decision-making sessions with context-aware intelligence drawn from the same governed pipeline.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.15 }}
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

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="md:col-span-2 flex flex-col gap-6"
              >
                <blockquote className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed italic">
                  "I'd like to introduce Athena from Automated Agile.
                </blockquote>
                <p className="prose-editorial text-sm">
                  It's still an Alpha, but we should self-improve ourselves to the Beta by the end of the month."
                </p>

                <div className="border-l border-border pl-5 mt-2">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-2">
                    Status
                  </p>
                  <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide uppercase text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Closed Alpha — Beta target: end of month
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Architectural principles */}
        <section className="py-24 md:py-32 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-16 max-w-3xl"
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">How it's built</p>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground leading-tight">
                Three architectural decisions that change the unit economics.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10 md:gap-12">
              {principles.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border-t border-border pt-6"
                >
                  <p.icon size={18} strokeWidth={1.5} className="text-foreground mb-5" />
                  <h3 className="font-serif text-xl text-foreground mb-3">{p.label}</h3>
                  <p className="prose-editorial text-sm text-muted-foreground">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tuning cockpit callout */}
        <section className="py-24 md:py-32 border-b border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">The Compounding Moat</p>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground leading-tight mb-8">
                The tuning cockpit.
              </h2>
              <p className="prose-editorial text-base md:text-lg mb-6">
                Every LLM call is a named, typed, registered use case — slug, versioned prompt, empirical model choice, quality threshold, and failure-mode detector.
              </p>
              <blockquote className="font-serif text-lg md:text-xl italic text-foreground/85 border-l-2 border-foreground pl-6 my-8">
                A 24-run model matrix produced a counter-intuitive finding: Haiku-4-5 outperforms Opus at every tested turn budget for fan-out extraction tasks. Opus exhausts its turn budget without completing.
              </blockquote>
              <p className="prose-editorial text-base md:text-lg">
                That result — and dozens like it — lives in the platform registry, updated per use case without a redeploy. Customers can see whether the AI is getting better or worse. They can change it. <span className="text-foreground">No other platform in this category offers this.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Competitive positioning */}
        <section className="py-24 md:py-32 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-12 max-w-3xl"
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">Where it sits</p>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground leading-tight">
                Three categories. None compete directly.
              </h2>
            </motion.div>

            <div className="border-t border-border">
              {[
                { cat: 'Autonomous coding', players: 'Devin · Factory.ai · GitHub Copilot Workspace', diff: 'No governance model. Enterprise procurement requires auditability — these platforms position as "agents do everything," a liability in regulated sectors.' },
                { cat: 'Dev productivity', players: 'Cursor · gstack · GitHub Copilot', diff: 'Individual developer tools. No context management, no delivery pipeline, no portfolio view. Different buyer, different problem.' },
                { cat: 'Delivery management', players: 'Linear · Jira · Modern Requirements', diff: 'Orchestration only, no manufacturing. Require process transformation — Automated Agile connects to existing Jira/ADO with no transformation required.' },
              ].map((row, i) => (
                <motion.div
                  key={row.cat}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-border"
                >
                  <div className="md:col-span-3">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 mb-2">Category</p>
                    <p className="font-serif text-lg text-foreground">{row.cat}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 mb-2">Players</p>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">{row.players}</p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 mb-2">Why we don't overlap</p>
                    <p className="prose-editorial text-sm text-muted-foreground">{row.diff}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-24 md:py-32 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-12 max-w-3xl"
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">Validated across</p>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground leading-tight">
                Three sectors. Three procurement cultures. One process.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { name: 'Retail', detail: '18 months at Next rebuilding the product delivery lifecycle.' },
                { name: 'Gaming & Gambling', detail: 'Entain — 7,200 man-days reduced to 360, delivered in six months. Context engineering embedded within their teams.' },
                { name: 'Regulated Public Sector', detail: 'Kainos / NHS — context engineering at programme management scale, with structured meetings as live context-gathering events.' },
              ].map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border-t border-border pt-6"
                >
                  <p className="font-serif text-2xl text-foreground mb-3">{s.name}</p>
                  <p className="prose-editorial text-sm text-muted-foreground">{s.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's coming */}
        <section className="py-24 md:py-32 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">What's coming</p>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground leading-tight mb-10">
                Closed Beta — opening to selected enterprises.
              </h2>
              <ul className="space-y-6">
                {[
                  { k: 'End-to-end pipeline', v: 'Inception through delivery, with sprint readiness gating and full audit trail.' },
                  { k: 'Athena facilitator', v: 'Alpha now; Beta target end of month. Self-improving against the same pipeline that ships her.' },
                  { k: 'Tuning cockpit', v: 'Live use case registry with empirical model selection — visible to customers.' },
                  { k: 'OAuth-bridged manufacturing', v: 'Customer-paid Claude Max compute, orchestrated by the platform.' },
                ].map((item) => (
                  <li key={item.k} className="grid md:grid-cols-3 gap-4 border-b border-border pb-6">
                    <p className="font-mono text-xs tracking-widest uppercase text-foreground">{item.k}</p>
                    <p className="prose-editorial text-sm text-muted-foreground md:col-span-2">{item.v}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground mb-6">
                Get early access.
              </h2>
              <p className="prose-editorial text-base md:text-lg mb-10 max-w-xl mx-auto">
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
