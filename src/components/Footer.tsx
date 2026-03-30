import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import railwaysLogo from "@/assets/indian-railways-logo.png";

const quickLinks = [
  { label: "Opportunities", href: "/opportunities" },
  { label: "Benefits", href: "/benefits" },
  { label: "Onboard", href: "/onboard" },
  { label: "Feedback", href: "/feedback" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="py-16 ceramic-panel mt-auto border-t border-slate-200">
      <div className="section-container">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-6 group">
              <img src={railwaysLogo} alt="Indian Railways" className="h-10 w-10 object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
              <span className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">SETU-NFR</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 font-medium">
              Strategic Ecosystem for Trade Unified Platform — Northeast Frontier Railway.
              Connecting Industries to Railways, Connecting Railways to Business.
            </p>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-emerald-700">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-all hover:translate-x-1 inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-emerald-700">Contact BDU</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                <MapPin className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>NF Railway HQ, Maligaon, Guwahati - 781011</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium font-mono">
                <Phone className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>+91-361-2731621</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium underline decoration-emerald-200 underline-offset-4">
                <Mail className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>bdu.nfr@indianrailways.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          © {new Date().getFullYear()} SETU-NFR | Northeast Frontier Railway, Ministry of Railways, Govt. of India.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
