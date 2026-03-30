import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface GlobalLayoutProps {
    children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-50">
            {/* Northeast Cultural Cinematic Background (Global) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns scale-110 opacity-70 blur-[2px]"
                    style={{ backgroundImage: "url('/assets/northeast-culture-bg.png')" }}
                />
                {/* High-Contrast Mist Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/40 to-white/90" />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-20">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default GlobalLayout;
