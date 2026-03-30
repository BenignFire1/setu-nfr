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
        <div className="pb-12">
            {/* Hero */}
            <section className="py-16">
                <div className="section-container">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="text-emerald-700">Benefits</span>
                    </nav>
                    <h1 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
                        Why Partner with <span className="text-emerald-600">SETU-NFR?</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-600 font-medium">
                        Unlock exclusive access to India's Northeast railway ecosystem — one of the fastest-growing infrastructure networks in the country.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold gap-2 shadow-lg shadow-emerald-500/20">
                            <a href="/onboard">Register Your Business <ArrowRight className="h-4 w-4" /></a>
                        </Button>
                        <Button asChild variant="outline" className="border-slate-200 text-slate-700 bg-white/50 backdrop-blur-md hover:bg-emerald-50">
                            <Link to="/opportunities">Browse Opportunities</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Main content wrapped in glass */}
            <div className="mx-4 ceramic-panel rounded-3xl overflow-hidden py-4">
                <BenefitsSection />
            </div>

            {/* CTA strip */}
            <section className="py-20">
                <div className="section-container text-center ceramic-panel rounded-2xl py-12 px-6">
                    <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                        Ready to get started?
                    </h2>
                    <p className="mt-3 text-slate-600 font-medium">
                        Register your business today and our BDU team will connect you with relevant opportunities.
                    </p>
                    <Button asChild className="mt-6 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold gap-2 shadow-lg shadow-emerald-500/20" size="lg">
                        <a href="/onboard">Apply Now <ArrowRight className="h-4 w-4" /></a>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default BenefitsPage;
