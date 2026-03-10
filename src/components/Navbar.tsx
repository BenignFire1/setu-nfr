import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import railwaysLogo from "@/assets/indian-railways-logo.png";

const links = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Policies", href: "/policies" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Onboard", href: "/onboard" },
  { label: "Feedback", href: "/feedback" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  return (
    <nav className="fixed top-0 z-50 w-full gradient-navy border-b border-navy-light/30 backdrop-blur-sm">
      <div className="section-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={railwaysLogo} alt="Indian Railways" className="h-9 w-9 object-contain" />
          <div>
            <span className="font-display text-lg font-bold text-primary-foreground">SETU-NFR</span>
            <span className="ml-2 hidden text-xs text-gold sm:inline">Strategic Ecosystem for Trade Unified Platform</span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors ${isActive(l.href)
                ? "text-gold"
                : "text-primary-foreground/70 hover:text-gold"
                }`}
            >
              {l.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold"
          >
            <Link to="/onboard">Get Started</Link>
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
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium transition-colors ${isActive(l.href)
                  ? "text-gold"
                  : "text-primary-foreground/80 hover:text-gold"
                  }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
