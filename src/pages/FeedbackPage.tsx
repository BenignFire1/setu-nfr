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
        <div className="pb-12">
            {/* Hero */}
            <section className="py-16">
                <div className="section-container">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="text-emerald-700">Feedback</span>
                    </nav>
                    <h1 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
                        Share Your <span className="text-emerald-600">Business Interests</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-600 font-medium">
                        SETU-NFR invites businesses to share their areas of interest and expertise. Your inputs help us shape better partnership opportunities.
                    </p>
                </div>
            </section>

            {/* Main content wrapped in glass */}
            <div className="mx-4 glass-panel rounded-3xl overflow-hidden py-4">
                <FeedbackSection />
            </div>
        </div>
    );
};

export default FeedbackPage;
