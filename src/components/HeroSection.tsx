import heroImage from "@/assets/hero-railway.jpg";
import railwaysLogo from "@/assets/indian-railways-logo.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, MessageSquare } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Daylight Glass Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

      <div className="relative section-container py-32 lg:py-40">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
            <img src={railwaysLogo} alt="Indian Railways" className="h-5 w-5 object-contain" />
            <span className="text-sm font-medium text-gold">Northeast Frontier Railway</span>
          </div>

          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            <span className="text-emerald-600">SETU-NFR</span>
            <br />
            <span className="md:whitespace-nowrap">Strategic Ecosystem for Trade</span>
            <br />
            <span className="text-emerald-700">Unified Platform</span>
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-slate-600 sm:text-xl font-medium">
            Connecting Industries to Railways. Connecting Railways to Business.
            Onboard your business for railway partnerships, supply opportunities,
            and infrastructure development across the Northeast.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-base px-8 gap-2 shadow-lg shadow-emerald-500/20">

              <a href="#onboard">
                <Building2 className="h-5 w-5" />
                Onboard Your Business
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-200 text-slate-700 hover:bg-emerald-50 font-semibold text-base px-8 gap-2 bg-white/50 backdrop-blur-md">

              <a href="#feedback" className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
                Share Your Interest
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
            {[
              { value: "10", label: "States Covered" },
              { value: "500+", label: "Stations" },
              { value: "₹5000Cr+", label: "Annual Projects" }].
              map((stat) =>
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-emerald-600 sm:text-3xl">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;