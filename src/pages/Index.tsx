import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { VisionSection } from '@/components/VisionSection';
import { ProblemSection } from '@/components/ProblemSection';
import { SolutionSection } from '@/components/SolutionSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ROISection } from '@/components/ROISection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { DownloadModal } from '@/components/DownloadModal';
import { DownloadContextFAB } from '@/components/DownloadContextFAB';
import { AskWebsiteWidget } from '@/components/AskWebsiteWidget';
import { AthenaBanner } from '@/components/AthenaBanner';

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Automated Agile | Context Engineering Platform</title>
        <meta name="description" content="A complete framework for AI-powered software delivery — process architecture, decision taxonomy, meeting formats, and self-curation for predictable software manufacturing." />
        <link rel="canonical" href="https://automatedagile.co.uk/" />
        <meta property="og:title" content="Automated Agile | Context Engineering Platform" />
        <meta property="og:description" content="A complete framework for AI-powered software delivery — process architecture, decision taxonomy, meeting formats, and self-curation for predictable software manufacturing." />
        <meta property="og:url" content="https://automatedagile.co.uk/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://automatedagile.co.uk/favicon.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Automated Agile — Process Architecture v1.0",
          "description": "A complete framework for AI-powered software delivery covering process architecture, decision taxonomy, meeting formats, self-curation mechanisms, and integrations.",
          "author": { "@type": "Organization", "name": "Automated Agile" },
          "publisher": { "@type": "Organization", "name": "Automated Agile", "logo": { "@type": "ImageObject", "url": "https://automatedagile.co.uk/favicon.png" } },
          "mainEntityOfPage": "https://automatedagile.co.uk/",
          "datePublished": "2026-03-01"
        })}</script>
      </Helmet>
      <Header />
      <div className="pt-16">
        <Hero />
        <VisionSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <ROISection />
        <AthenaBanner onNavigate={() => navigate('/athena')} />
        <ContactSection />
        <Footer onDownloadClick={() => setModalOpen(true)} />
      </div>
      <DownloadContextFAB onOpen={() => setModalOpen(true)} />
      <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <AskWebsiteWidget />
    </main>
  );
};

export default Index;
