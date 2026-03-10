import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import railwaysLogo from "@/assets/indian-railways-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Benefits", href: "#benefits" },
    { label: "Onboard", href: "#onboard" },
    { label: "Feedback", href: "#feedback" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full gradient-navy border-b border-navy-light/30 backdrop-blur-sm">
      <div className="section-container flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src={railwaysLogo} alt="Indian Railways" className="h-9 w-9 object-contain" />
          <div>
            <span className="font-display text-lg font-bold text-primary-foreground">SETU-NFR</span>
            <span className="ml-2 hidden text-xs text-gold sm:inline">Strategic Alliance for Trade Unified Platform</span>
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-primary-foreground/70 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <Button
            asChild
            className="bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold"
          >
            <a href="#onboard">Get Started</a>
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="text-primary-foreground md:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="gradient-navy border-t border-navy-light/20 md:hidden">
          <div className="section-container flex flex-col gap-3 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-primary-foreground/80 hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
