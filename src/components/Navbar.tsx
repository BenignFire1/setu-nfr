import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import railwaysLogo from "@/assets/indian-railways-logo.png";

const links = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Station Map", href: "/station-map" },
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
    <nav className="fixed top-0 z-50 w-full bg-white/80 border-b border-slate-200/50 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="section-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={railwaysLogo} alt="Indian Railways" className="h-10 w-10 object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
          <div>
            <span className="font-display text-xl font-extrabold text-slate-900 tracking-tight">SETU-NFR</span>
            <span className="ml-2 hidden text-[10px] font-bold uppercase tracking-widest text-emerald-600 sm:inline opacity-80">Strategic Ecosystem for Trade</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-bold transition-all ${isActive(l.href)
                ? "text-emerald-700 underline underline-offset-4 decoration-2"
                : "text-slate-600 hover:text-emerald-600"
                }`}
            >
              {l.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-6 shadow-lg shadow-emerald-500/20"
          >
            <Link to="/onboard">Get Started</Link>
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="text-slate-900 md:hidden p-1 rounded-lg hover:bg-slate-100 transition-colors">
          {open ? <X className="h-6 w-6 text-emerald-600" /> : <Menu className="h-6 w-6 text-slate-700" />}
        </button>
      </div>

      {open && (
        <div className="bg-white/95 border-t border-slate-100 md:hidden animate-fade-in shadow-2xl">
          <div className="section-container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all ${isActive(l.href)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
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
