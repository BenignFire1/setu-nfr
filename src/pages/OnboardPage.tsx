import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardForm from "@/components/OnboardForm";
import { useEffect } from "react";

const OnboardPage = () => {
    useEffect(() => {
        document.title = "Register Your Business | SETU-NFR";
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {/* Small top spacer for fixed navbar */}
            <div className="pt-16" />
            <OnboardForm />
            <Footer />
        </div>
    );
};

export default OnboardPage;
