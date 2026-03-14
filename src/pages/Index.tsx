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

const Index = () => {
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-16">
        <Hero onDownload={() => setDownloadOpen(true)} />
        <VisionSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <ROISection />
        <ContactSection />
        <Footer />
      </div>
      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </main>
  );
};

export default Index;
