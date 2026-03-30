import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";
import BenefitsSection from "@/components/BenefitsSection";
import OnboardForm from "@/components/OnboardForm";
import FeedbackSection from "@/components/FeedbackSection";

const Index = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <div className="relative z-10 -mt-20">
        <ImageCarousel />
      </div>
      <div className="glass-panel mx-4 my-12 rounded-3xl overflow-hidden">
        <BenefitsSection />
      </div>
      <div className="ceramic-panel mx-4 my-12 rounded-3xl overflow-hidden p-8">
        <OnboardForm />
      </div>
      <div className="glass-panel mx-4 my-12 rounded-3xl overflow-hidden">
        <FeedbackSection />
      </div>
    </div>
  );
};

export default Index;
