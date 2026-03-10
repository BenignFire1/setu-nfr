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
    <footer className="gradient-navy py-16">
      <div className="section-container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={railwaysLogo} alt="Indian Railways" className="h-8 w-8 object-contain" />
              <span className="font-display text-lg font-bold text-primary-foreground">SETU-NFR</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              Strategic Alliance for Trade Unified Platform — Northeast Frontier Railway.
              Connecting Industries to Railways, Connecting Railways to Business.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-gold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-gold">Contact BDU</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <MapPin className="h-4 w-4 text-gold/60" />
                NF Railway HQ, Maligaon, Guwahati - 781011
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Phone className="h-4 w-4 text-gold/60" />
                +91-361-2731621
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail className="h-4 w-4 text-gold/60" />
                bdu.nfr@indianrailways.gov.in
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} SETU-NFR | Northeast Frontier Railway, Ministry of Railways, Govt. of India. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
