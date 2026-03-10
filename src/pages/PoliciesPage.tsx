import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ScrollText,
    ChevronRight,
    ExternalLink,
    FileText,
    Tag,
    CalendarDays,
    ArrowRight,
    Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type Policy = {
    id: string;
    title: string;
    shortName: string;
    category: string;
    date: string;
    description: string;
    highlights: string[];
    link: string;
    tag: "Active" | "New" | "Upcoming";
};

const policies: Policy[] = [
    {
        id: "ninfris",
        title: "Non-Fare Revenue Policy for Infrastructure & Services (NINFRIS)",
        shortName: "NINFRIS",
        category: "Revenue Policy",
        date: "2023",
        description:
            "A comprehensive framework by Indian Railways to maximise non-fare revenue through licensing of spaces, services, and innovative commercial activities at railway stations.",
        highlights: [
            "Covers advertising, retail, hospitality & digital services",
            "Flexible licensing models — short-term & long-term",
            "Revenue sharing with BDU / Zonal Railways",
            "Applicable across all A1, A, B, C, D category stations",
        ],
        link: "https://nfr.indianrailways.gov.in",
        tag: "Active",
    },
    {
        id: "ppp-stations",
        title: "Public Private Partnership (PPP) for Station Redevelopment",
        shortName: "PPP Station Policy",
        category: "Infrastructure",
        date: "2022",
        description:
            "Policy enabling private entities to invest in and redevelop major railway stations under PPP model, with revenue rights over commercial space for a defined period.",
        highlights: [
            "EPC + revenue share model for major stations",
            "Amrit Bharat station upgrades included",
            "50–99 year lease options for commercial space",
            "Applicable to stations with high footfall (A1, A category)",
        ],
        link: "https://indianrailways.gov.in",
        tag: "Active",
    },
    {
        id: "premium-single-brand",
        title: "Premium Single Brand Retail Policy",
        shortName: "Single Brand Retail",
        category: "Retail Policy",
        date: "2023",
        description:
            "Allows premium single-brand companies to set up flagship stores within A1 and A category railway stations, leveraging high footfall for brand exposure.",
        highlights: [
            "Dedicated space allocation at premium stations",
            "Electronics, lifestyle, fashion & luxury brands eligible",
            "Fixed license fee + revenue share model",
            "Minimum station category: A (footfall > 10,000/day)",
        ],
        link: "https://nfr.indianrailways.gov.in",
        tag: "New",
    },
    {
        id: "pm-gati-shakti",
        title: "PM Gati Shakti — National Master Plan for Freight",
        shortName: "PM Gati Shakti",
        category: "Freight Policy",
        date: "2021",
        description:
            "National multi-modal connectivity infrastructure plan enabling private participation in Gati Shakti Cargo Terminals (GCTs) and freight logistics along railways.",
        highlights: [
            "Private GCT development & operations",
            "Multi-modal logistics park integration",
            "Dedicated freight corridor connectivity",
            "Incentives for warehousing & cold chain near rail heads",
        ],
        link: "https://gatishakti.gov.in",
        tag: "Active",
    },
    {
        id: "parcel-policy",
        title: "Indian Railways Parcel Management System Policy",
        shortName: "Parcel Policy",
        category: "Parcel & Logistics",
        date: "2022",
        description:
            "End-to-end policy framework for parcel handling, booking, tracking and delivery using Indian Railways network. Enables private operators to run franchise parcel centres.",
        highlights: [
            "Franchise parcel booking counters at stations",
            "Integration with e-commerce platforms",
            "Express parcel via mail & express trains",
            "Digital tracking & last-mile delivery support",
        ],
        link: "https://indianrailways.gov.in",
        tag: "Active",
    },
    {
        id: "advertising-policy",
        title: "Railway Advertising Policy — Stations & Trains",
        shortName: "Advertising Policy",
        category: "Advertising",
        date: "2020",
        description:
            "Comprehensive policy governing all forms of advertising on Indian Railways — from station hoardings and digital displays to train wrapping and OOH branding.",
        highlights: [
            "Train wrapping, coach interior & exterior branding",
            "Station hoardings, digital standees, naming rights",
            "Annual license model with competitive bidding",
            "Applicable to all NFR stations with footfall data",
        ],
        link: "https://nfr.indianrailways.gov.in",
        tag: "Active",
    },
    {
        id: "ev-policy",
        title: "Electric Vehicle Charging Infrastructure at Stations",
        shortName: "EV Charging Policy",
        category: "Mobility & Green",
        date: "2023",
        description:
            "Policy inviting private operators to install and manage EV charging stations, battery swap points, and EV parking at railway station premises.",
        highlights: [
            "Space allocation on license fee basis",
            "Revenue sharing model with zonal railway",
            "Priority for green energy / solar-powered setups",
            "Long-term contracts up to 10 years",
        ],
        link: "https://indianrailways.gov.in",
        tag: "New",
    },
    {
        id: "food-plaza",
        title: "Catering & Food Plaza Policy",
        shortName: "Catering Policy",
        category: "Food & Retail",
        date: "2021",
        description:
            "IRCTC-backed policy for licensed operation of food plazas, branded food outlets, and on-board catering services across the NFR zone.",
        highlights: [
            "Food plazas at major stations via IRCTC license",
            "Branded food outlet franchise model",
            "On-board catering pantry car operations",
            "Hygiene & quality standards mandated",
        ],
        link: "https://irctc.co.in",
        tag: "Active",
    },
];

const categories = ["All", ...Array.from(new Set(policies.map((p) => p.category)))];

const tagStyle: Record<string, string> = {
    Active: "bg-green-100 text-green-800 border-green-200",
    New: "bg-violet-100 text-violet-800 border-violet-200",
    Upcoming: "bg-amber-100 text-amber-800 border-amber-200",
};

const PoliciesPage = () => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        document.title = "Policy Documents | SETU-NFR";
    }, []);

    const filtered = policies.filter((p) => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const matchSearch =
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.shortName.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative pt-16 overflow-hidden">
                <div className="gradient-navy">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                    <div className="section-container relative py-20 lg:py-28">
                        {/* Breadcrumb */}
                        <nav className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/50">
                            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-gold">Policies</span>
                        </nav>

                        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-5">
                            <ScrollText className="h-4 w-4 text-gold" />
                            <span className="text-sm font-medium text-gold">Railway Policy Repository</span>
                        </div>

                        <h1 className="font-display text-4xl font-extrabold text-primary-foreground sm:text-5xl lg:text-6xl">
                            Policy &{" "}
                            <span className="text-gradient-gold">Regulatory Framework</span>
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg text-primary-foreground/70">
                            Key Indian Railways policies, circulars, and frameworks governing business opportunities across NFR — from NINFRIS to PM Gati Shakti.
                        </p>

                        {/* Stats */}
                        <div className="mt-10 flex flex-wrap gap-8 border-t border-primary-foreground/10 pt-8">
                            {[
                                { value: `${policies.length}`, label: "Policy Documents" },
                                { value: `${categories.length - 1}`, label: "Categories" },
                                { value: "2020–2023", label: "Coverage Period" },
                            ].map((s) => (
                                <div key={s.label}>
                                    <div className="font-display text-2xl font-bold text-gold">{s.value}</div>
                                    <div className="text-sm text-primary-foreground/60">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FILTER BAR ── */}
            <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
                <div className="section-container py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search policies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all border whitespace-nowrap ${activeCategory === cat
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-auto">
                        {filtered.length} of {policies.length} policies
                    </span>
                </div>
            </div>

            {/* ── POLICY CARDS ── */}
            <section className="py-16 lg:py-20">
                <div className="section-container">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center py-20 text-center">
                            <Search className="mb-4 h-10 w-10 text-muted-foreground/40" />
                            <p className="text-lg font-semibold text-foreground">No policies found</p>
                            <p className="mt-1 text-sm text-muted-foreground">Try a different search or category.</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {filtered.map((policy) => (
                                <div
                                    key={policy.id}
                                    className="group flex flex-col rounded-2xl border-2 border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-violet-200"
                                >
                                    {/* Header */}
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-50">
                                            <FileText className="h-5 w-5 text-violet-600" />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tagStyle[policy.tag]}`}>
                                                {policy.tag}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Meta */}
                                    <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Tag className="h-3 w-3 text-violet-500" />
                                            {policy.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="h-3 w-3 text-violet-500" />
                                            {policy.date}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="mb-1 font-display text-base font-bold text-card-foreground group-hover:text-violet-700 transition-colors leading-snug">
                                        {policy.title}
                                    </h2>
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-violet-500">
                                        {policy.shortName}
                                    </p>

                                    {/* Description */}
                                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                                        {policy.description}
                                    </p>

                                    {/* Highlights */}
                                    <ul className="mb-5 space-y-1.5">
                                        {policy.highlights.map((h) => (
                                            <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t border-border pt-4">
                                        <a
                                            href={policy.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors"
                                        >
                                            View Official Source <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                        <Link
                                            to="/opportunities"
                                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Related opportunities →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="gradient-navy py-16">
                <div className="section-container text-center">
                    <h2 className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
                        Ready to leverage these policies?
                    </h2>
                    <p className="mt-3 text-primary-foreground/70 max-w-xl mx-auto">
                        Explore concrete business opportunities under each framework and register your interest with the NFR BDU team.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button asChild className="bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold gap-2" size="lg">
                            <a href="/onboard">Apply Now <ArrowRight className="h-4 w-4" /></a>
                        </Button>
                        <Button asChild variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 font-semibold" size="lg">
                            <Link to="/opportunities">Browse Opportunities</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PoliciesPage;
