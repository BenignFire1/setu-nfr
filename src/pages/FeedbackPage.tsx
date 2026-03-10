import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackSection from "@/components/FeedbackSection";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FeedbackPage = () => {
    useEffect(() => {
        document.title = "Share Your Interests | SETU-NFR";
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
                        <span className="text-gold">Feedback</span>
                    </nav>
                    <h1 className="font-display text-4xl font-extrabold text-primary-foreground sm:text-5xl">
                        Share Your Business Interests
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">
                        SETU-NFR invites businesses to share their areas of interest and expertise. Your inputs help us shape better partnership opportunities.
                    </p>
                </div>
            </section>

            {/* Reuse the existing FeedbackSection component */}
            <FeedbackSection />

            <Footer />
        </div>
    );
};

export default FeedbackPage;
