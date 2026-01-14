import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MissionSection } from '@/components/MissionSection';
import { PlatformSection } from '@/components/PlatformSection';
import { ImpactSection } from '@/components/ImpactSection';
import { CareersSection } from '@/components/CareersSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MissionSection />
        <PlatformSection />
        <ImpactSection />
        <CareersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
