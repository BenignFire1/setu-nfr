import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BenefitsSection from "@/components/BenefitsSection";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BenefitsPage = () => {
    useEffect(() => {
        document.title = "Benefits of Partnering | SETU-NFR";
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="gradient-navy pt-28 pb-16">
                <div className="section-container">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/50">
                        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="text-gold">Benefits</span>
                    </nav>
                    <h1 className="font-display text-4xl font-extrabold text-primary-foreground sm:text-5xl">
                        Why Partner with SETU-NFR?
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">
                        Unlock exclusive access to India's Northeast railway ecosystem — one of the fastest-growing infrastructure networks in the country.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild className="bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold gap-2">
                            <a href="/onboard">Register Your Business <ArrowRight className="h-4 w-4" /></a>
                        </Button>
                        <Button asChild variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10">
                            <Link to="/opportunities">Browse Opportunities</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Reuse the existing BenefitsSection component */}
            <BenefitsSection />

            {/* CTA strip */}
            <section className="gradient-navy py-16">
                <div className="section-container text-center">
                    <h2 className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
                        Ready to get started?
                    </h2>
                    <p className="mt-3 text-primary-foreground/70">
                        Register your business today and our BDU team will connect you with relevant opportunities.
                    </p>
                    <Button asChild className="mt-6 bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold gap-2" size="lg">
                        <a href="/onboard">Apply Now <ArrowRight className="h-4 w-4" /></a>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BenefitsPage;
