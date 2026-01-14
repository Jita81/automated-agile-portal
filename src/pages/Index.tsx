import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProblemSection } from '@/components/ProblemSection';
import { SolutionSection } from '@/components/SolutionSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ROISection } from '@/components/ROISection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <ROISection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
