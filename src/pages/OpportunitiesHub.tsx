import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Calendar, ChevronRight, Train, MapPin, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { opportunityCategories } from "@/data/businessOpportunities";
import StationExplorerSection from "@/components/StationExplorerSection";

const statusStyle: Record<string, string> = {
    Active: "bg-green-100 text-green-800 border-green-200",
    Upcoming: "bg-amber-100 text-amber-800 border-amber-200",
};

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Browse",
        desc: "Explore all 7 opportunity categories spanning the NFR network.",
    },
    {
        icon: Building,
        step: "02",
        title: "Apply",
        desc: "Submit your proposal with company details and area of interest.",
    },
    {
        icon: Train,
        step: "03",
        title: "Get Connected",
        desc: "BDU team reviews your profile and contacts you within 5–7 days.",
    },
];

const OpportunitiesHub = () => {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const filtered = useMemo(() => {
        return opportunityCategories.filter((cat) => {
            const matchSearch =
                cat.title.toLowerCase().includes(search.toLowerCase()) ||
                cat.description.toLowerCase().includes(search.toLowerCase()) ||
                cat.subCategories.some((sc) =>
                    sc.name.toLowerCase().includes(search.toLowerCase())
                );
            const matchStatus =
                filterStatus === "All" || cat.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [search, filterStatus]);

    const totalSubOpps = opportunityCategories.reduce(
        (acc, cat) => acc + cat.subCategories.reduce((a, sc) => a + sc.items.length, 0),
        0
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* ─── HERO ─────────────────────────────────────────────── */}
            <section className="relative pt-16 overflow-hidden">
                <div className="gradient-navy">
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                    <div className="section-container relative py-24 lg:py-32">
                        <div className="max-w-3xl animate-fade-up">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
                                <MapPin className="h-4 w-4 text-gold" />
                                <span className="text-sm font-medium text-gold">Northeast Frontier Railway</span>
                            </div>

                            <h1 className="mb-5 font-display text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                                Partner with{" "}
                                <span className="text-gradient-gold">NFR Railway</span>
                            </h1>

                            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/70 sm:text-xl max-w-2xl">
                                Explore business opportunities across{" "}
                                <span className="text-gold font-semibold">7 categories</span> —
                                from advertising and retail to infrastructure and digital solutions.
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold text-base px-8 gap-2"
                                >
                                    <a href="#categories">
                                        Explore Opportunities
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    className="border-2 border-white/40 bg-transparent text-white hover:bg-white/10 font-semibold text-base px-8 gap-2"
                                >
                                    <a href="/onboard">Apply Now</a>
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-primary-foreground/10 pt-8">
                                {[
                                    { value: "7", label: "Opportunity Categories" },
                                    { value: `${totalSubOpps}+`, label: "Sub-Opportunities" },
                                    { value: "500+", label: "NFR Stations" },
                                ].map((s) => (
                                    <div key={s.label}>
                                        <div className="font-display text-2xl font-bold text-gold sm:text-3xl">{s.value}</div>
                                        <div className="text-sm text-primary-foreground/60">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FILTER BAR ───────────────────────────────────────── */}
            <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
                <div className="section-container flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search opportunities, categories, services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {["All", "Active", "Upcoming"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${filterStatus === status
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {filtered.length} of {opportunityCategories.length} categories
                    </span>
                </div>
            </div>

            {/* ─── CATEGORY TILES ──────────────────────────────────── */}
            <section id="categories" className="py-16 lg:py-20">
                <div className="section-container">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                            Current Openings
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                            Business Opportunity Categories
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Select a category to explore all available sub-opportunities, requirements, and how to apply.
                        </p>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center py-20 text-center">
                            <Search className="mb-4 h-10 w-10 text-muted-foreground/40" />
                            <p className="text-lg font-semibold text-foreground">No results found</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try a different search term or clear the filter.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => { setSearch(""); setFilterStatus("All"); }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((cat, i) => {
                                const Icon = cat.icon;
                                const totalItems = cat.subCategories.reduce(
                                    (acc, sc) => acc + sc.items.length, 0
                                );
                                return (
                                    <Link
                                        key={cat.id}
                                        to={cat.route}
                                        className={`group flex flex-col rounded-2xl border-2 border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${cat.borderColor}`}
                                        style={{ animationDelay: `${i * 60}ms` }}
                                    >
                                        {/* Header */}
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${cat.color}`}>
                                                <Icon className={`h-7 w-7 ${cat.iconColor}`} />
                                            </div>
                                            <span
                                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyle[cat.status]}`}
                                            >
                                                {cat.status}
                                            </span>
                                        </div>

                                        {/* Title + tagline */}
                                        <p className={`mb-1 text-xs font-semibold uppercase tracking-wider ${cat.iconColor}`}>
                                            {cat.tagline}
                                        </p>
                                        <h3 className="mb-2 font-display text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                                            {cat.description}
                                        </p>

                                        {/* Sub-categories preview */}
                                        <div className="mb-5 flex flex-wrap gap-1.5">
                                            {cat.subCategories.slice(0, 3).map((sc) => (
                                                <span
                                                    key={sc.name}
                                                    className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                                                >
                                                    {sc.name}
                                                </span>
                                            ))}
                                            {cat.subCategories.length > 3 && (
                                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                                                    +{cat.subCategories.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer row */}
                                        <div className="flex items-center justify-between border-t border-border pt-4">
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <span className={`font-bold text-sm ${cat.iconColor}`}>{totalItems}+</span> opportunities
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {cat.deadline}
                                                </span>
                                            </div>
                                            <span className={`flex items-center gap-1 text-sm font-semibold ${cat.iconColor} group-hover:gap-2 transition-all`}>
                                                Explore <ChevronRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>


            {/* ─── STATION EXPLORER ────────────────────────────────── */}
            <StationExplorerSection compact />

            {/* ─── HOW IT WORKS ────────────────────────────────────── */}
            <section className="bg-surface-warm py-16 lg:py-20">
                <div className="section-container">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                            Simple Process
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                            How It Works
                        </h2>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-3">
                        {steps.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={s.step} className="relative flex flex-col items-center text-center">
                                    {i < steps.length - 1 && (
                                        <div className="absolute left-[calc(50%+3rem)] top-10 hidden h-px w-[calc(100%-6rem)] border-t-2 border-dashed border-border sm:block" />
                                    )}
                                    <div className="mb-4 relative">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20">
                                            <Icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-secondary-foreground">
                                            {s.step}
                                        </span>
                                    </div>
                                    <h3 className="mb-2 font-display text-lg font-bold text-foreground">{s.title}</h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                        >
                            <Link to="/#onboard">
                                Submit Your Application
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OpportunitiesHub;
