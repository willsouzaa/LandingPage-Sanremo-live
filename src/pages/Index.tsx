import { HeroSection } from "@/components/HeroSection";
import { UrgencyBar } from "@/components/UrgencyBar";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ConditionsSection } from "@/components/ConditionsSection";
import { GallerySection } from "@/components/GallerySection";
import { VideoSection } from "@/components/VideoSection";
import { LocationSection } from "@/components/LocationSection";
import { LeadForm } from "@/components/LeadForm";
import { FinalCTA } from "@/components/FinalCTA";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <GallerySection />
      <VideoSection />
      <LocationSection />
      <BenefitsSection />
      <ConditionsSection />
      <UrgencyBar />
      <LeadForm />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
