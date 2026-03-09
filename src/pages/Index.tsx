import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";
import OpportunitiesSection from "@/components/OpportunitiesSection";
import BenefitsSection from "@/components/BenefitsSection";
import OnboardForm from "@/components/OnboardForm";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ImageCarousel />
      <BenefitsSection />
      <OpportunitiesSection />
      <OnboardForm />
      <FeedbackSection />
      <Footer />
    </div>
  );
};

export default Index;
