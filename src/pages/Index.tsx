import { HeroSection } from "@/components/HeroSection";
import { UrgencyBar } from "@/components/UrgencyBar";
import { BenefitsSection } from "@/components/BenefitsSection";
import { DevelopmentsSection } from "@/components/DevelopmentsSection";
import { LeadForm } from "@/components/LeadForm";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { CtaLeadModal } from "@/components/CtaLeadModal";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <DevelopmentsSection />
      <BenefitsSection />
<LeadForm />
      <UrgencyBar />
      <FinalCTA />
      <Footer />
      <CtaLeadModal />
    </main>
  );
};

export default Index;
