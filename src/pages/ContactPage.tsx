import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    ArrowRight,
    ChevronRight,
    Building2,
    ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const offices = [
    {
        name: "NFR Headquarters — Business Development Unit",
        address: "NF Railway HQ, Maligaon, Guwahati, Assam — 781011",
        phone: "+91-361-2731621",
        email: "bdu.nfr@indianrailways.gov.in",
        hours: "Mon – Fri, 10:00 AM – 5:30 PM",
    },
];

const contactLinks = [
    { label: "Official NFR Website", url: "https://nfr.indianrailways.gov.in", icon: ExternalLink },
    { label: "Indian Railways Portal", url: "https://indianrailways.gov.in", icon: ExternalLink },
    { label: "IRCTC", url: "https://irctc.co.in", icon: ExternalLink },
];

const ContactPage = () => {
    useEffect(() => {
        document.title = "Contact BDU | SETU-NFR";
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
                        <span className="text-gold">Contact</span>
                    </nav>
                    <h1 className="font-display text-4xl font-extrabold text-primary-foreground sm:text-5xl">
                        Get in Touch
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">
                        Reach out to the Business Development Unit of Northeast Frontier Railway. We're here to help you explore partnership opportunities.
                    </p>
                </div>
            </section>

            {/* Contact cards */}
            <section className="py-16 lg:py-20">
                <div className="section-container">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Office info */}
                        <div className="lg:col-span-2 space-y-6">
                            {offices.map((office) => (
                                <div
                                    key={office.name}
                                    className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm"
                                >
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                            <Building2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="font-display text-lg font-bold text-card-foreground">
                                            {office.name}
                                        </h2>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark" />
                                            <span>{office.address}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Phone className="h-4 w-4 flex-shrink-0 text-gold-dark" />
                                            <a href={`tel:${office.phone}`} className="hover:text-foreground transition-colors">
                                                {office.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Mail className="h-4 w-4 flex-shrink-0 text-gold-dark" />
                                            <a href={`mailto:${office.email}`} className="hover:text-foreground transition-colors">
                                                {office.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4 flex-shrink-0 text-gold-dark" />
                                            <span>{office.hours}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Map embed placeholder */}
                            <div className="overflow-hidden rounded-2xl border-2 border-border">
                                <iframe
                                    title="NFR HQ Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.8153!2d91.6803!3d26.1745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59b64f5c7c0f%3A0x5a01c38a01c38a01!2sNFR%20Headquarters%2C%20Maligaon%2C%20Guwahati!5e0!3m2!1sen!2sin!4v1"
                                    width="100%"
                                    height="280"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* CTA */}
                            <div className="rounded-2xl border-2 border-gold/30 bg-gold/5 p-6">
                                <h3 className="font-display text-lg font-bold text-foreground">
                                    Ready to Partner?
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Register your business and our BDU team will reach out within 5–7 business days.
                                </p>
                                <Button asChild className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
                                    <a href="/onboard">Apply Now <ArrowRight className="h-4 w-4" /></a>
                                </Button>
                            </div>

                            {/* Share interests */}
                            <div className="rounded-2xl border-2 border-border bg-card p-6">
                                <h3 className="font-display text-base font-bold text-card-foreground">
                                    Share Your Interests
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Let us know which areas you're interested in before committing to a full application.
                                </p>
                                <Button asChild variant="outline" className="mt-4 w-full">
                                    <Link to="/feedback">Give Feedback</Link>
                                </Button>
                            </div>

                            {/* Official links */}
                            <div className="rounded-2xl border-2 border-border bg-card p-6">
                                <h3 className="font-display text-base font-bold text-card-foreground mb-4">
                                    Official Links
                                </h3>
                                <div className="space-y-3">
                                    {contactLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <span>{link.label}</span>
                                            <link.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;
