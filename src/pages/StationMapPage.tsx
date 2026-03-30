import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StationExplorerSection from "@/components/StationExplorerSection";

const StationMapPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-16">
                <StationExplorerSection />
            </div>
            <Footer />
        </div>
    );
};

export default StationMapPage;
