import { useState } from 'react';
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

const CHAT_WIDGET_ENABLED = false;

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-16">
        <Hero />
        <VisionSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <ROISection />
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
