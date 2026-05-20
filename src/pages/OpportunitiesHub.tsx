import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Calendar, ChevronRight, Train, MapPin, Building, ExternalLink, Globe, Layout, ShieldCheck, ShoppingCart, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { opportunityCategories } from "@/data/businessOpportunities";


const statusStyle: Record<string, string> = {
    Active: "bg-green-100 text-green-800 border-green-200",
    Upcoming: "bg-amber-100 text-amber-800 border-amber-200",
};

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Browse",
        desc: "Explore all 10 opportunity categories spanning the NFR network.",
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

const portals = [
    {
        name: "IREPS",
        description: "Indian Railways E-Procurement System for tendering & auctions.",
        url: "https://www.ireps.gov.in",
        icon: ShieldCheck,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        name: "GeM Portal",
        description: "Government e-Marketplace for common use goods & services.",
        url: "https://gem.gov.in",
        icon: ShoppingCart,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        name: "RLDA",
        description: "Rail Land Development Authority for commercial land use.",
        url: "https://rlda.indianrailways.gov.in",
        icon: Layout,
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
    {
        name: "NFR Official",
        description: "Official zone website for Northeast Frontier Railway.",
        url: "https://nfr.indianrailways.gov.in",
        icon: Globe,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        name: "CRIS",
        description: "Centre for Railway Information Systems tech solutions.",
        url: "https://www.cris.org.in",
        icon: UserCheck,
        color: "text-cyan-600",
        bg: "bg-cyan-50",
    },
    {
        name: "IRCTC Biz",
        description: "Catering, hospitality and tourism partnership portals.",
        url: "https://www.irctc.com",
        icon: Building,
        color: "text-rose-600",
        bg: "bg-rose-50",
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
        <div className="pb-12">
            {/* ─── HERO ─────────────────────────────────────────────── */}
            <section className="relative overflow-hidden py-16 lg:py-24">
                <div className="section-container relative">
                    <div className="max-w-3xl animate-fade-up">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5">
                            <MapPin className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm font-semibold text-emerald-700">Northeast Frontier Railway</span>
                        </div>

                        <h1 className="mb-5 font-display text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-5xl">
                            Partner with{" "}
                            <span className="text-emerald-600">NFR Railway</span>
                        </h1>

                        <p className="mb-8 text-lg leading-relaxed text-slate-600 sm:text-xl max-w-2xl font-medium">
                            Explore business opportunities across{" "}
                            <span className="text-emerald-700 font-bold">10 categories</span> —
                            from advertising and retail to infrastructure and digital solutions.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-base px-8 gap-2 shadow-lg shadow-emerald-500/20"
                            >
                                <a href="#categories">
                                    Explore Opportunities
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-slate-200 bg-white/50 backdrop-blur-md text-slate-700 hover:bg-emerald-50 font-semibold text-base px-8 gap-2"
                            >
                                <a href="/onboard">Apply Now</a>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
                            {[
                                { value: "10", label: "Opportunity Categories" },
                                { value: `${totalSubOpps}+`, label: "Sub-Opportunities" },
                                { value: "500+", label: "NFR Stations" },
                            ].map((s) => (
                                <div key={s.label}>
                                    <div className="font-display text-2xl font-bold text-emerald-600 sm:text-3xl">{s.value}</div>
                                    <div className="text-sm text-slate-500 font-medium">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FILTER BAR ───────────────────────────────────────── */}
            <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/70 backdrop-blur-md shadow-sm">
                <div className="section-container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search opportunities, categories, services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {["All", "Active", "Upcoming"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all border ${filterStatus === status
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20"
                                    : "bg-white/60 text-slate-600 border-slate-200 hover:border-emerald-400/40 hover:text-emerald-700"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <span className="text-xs text-slate-500 font-bold whitespace-nowrap bg-slate-100/80 px-2 py-1 rounded-md">
                        {filtered.length} Categories
                    </span>
                </div>
            </div>

            {/* ─── CATEGORY TILES ──────────────────────────────────── */}
            <section id="categories" className="py-16 lg:py-24">
                <div className="section-container">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                            Current Openings
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                            Business Opportunity Categories
                        </h2>
                        <p className="mt-4 text-slate-600 font-medium">
                            Select a category to explore all available sub-opportunities, requirements, and how to apply.
                        </p>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center py-20 text-center glass-panel rounded-3xl mx-4">
                            <Search className="mb-4 h-12 w-12 text-slate-300" />
                            <p className="text-lg font-bold text-slate-800">No results found</p>
                            <p className="mt-1 text-sm text-slate-500 font-medium">
                                Try a different search term or clear the filter.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6 border-emerald-200 hover:bg-emerald-50 text-emerald-700"
                                onClick={() => { setSearch(""); setFilterStatus("All"); }}
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((cat, i) => {
                                const Icon = cat.icon;
                                const totalItems = cat.subCategories.reduce(
                                    (acc, sc) => acc + sc.items.length, 0
                                );
                                return (
                                    <Link
                                        key={cat.id}
                                        to={cat.route}
                                        className={`group flex flex-col rounded-3xl border border-white/80 bg-white/50 backdrop-blur-xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 shadow-xl animate-fade-in`}
                                        style={{ animationDelay: `${i * 60}ms` }}
                                    >
                                        {/* Header */}
                                        <div className="mb-6 flex items-start justify-between">
                                            <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${cat.color.replace('bg-', 'bg-')}`}>
                                                <Icon className={`h-8 w-8 ${cat.iconColor}`} />
                                            </div>
                                            <span
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyle[cat.status]}`}
                                            >
                                                {cat.status}
                                            </span>
                                        </div>

                                        {/* Title + tagline */}
                                        <p className={`mb-1.5 text-[10px] font-bold uppercase tracking-widest ${cat.iconColor}`}>
                                            {cat.tagline}
                                        </p>
                                        <h3 className="mb-3 font-display text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 font-medium">
                                            {cat.description}
                                        </p>

                                        {/* Sub-categories preview */}
                                        <div className="mb-6 flex flex-wrap gap-2">
                                            {cat.subCategories.slice(0, 3).map((sc) => (
                                                <span
                                                    key={sc.name}
                                                    className="rounded-lg bg-slate-100/80 px-2.5 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-tight"
                                                >
                                                    {sc.name}
                                                </span>
                                            ))}
                                            {cat.subCategories.length > 3 && (
                                                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 uppercase">
                                                    +{cat.subCategories.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer row */}
                                        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                            <div className="flex items-center gap-4 text-xs text-slate-400 font-bold">
                                                <span className="flex items-center gap-1.5">
                                                    <span className={`text-sm ${cat.iconColor}`}>{totalItems}+</span> Opportunities
                                                </span>
                                            </div>
                                            <span className={`flex items-center gap-1.5 text-sm font-bold ${cat.iconColor} group-hover:gap-2.5 transition-all text-emerald-600`}>
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


            {/* ─── OFFICIAL PORTALS ─────────────────────────────────── */}
            <section className="py-20 bg-slate-50/50">
                <div className="section-container">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                            Gateway to Railways
                        </span>
                        <h2 className="mt-3 font-display text-4xl font-bold text-slate-900">
                            Official Railway Portals
                        </h2>
                        <p className="mt-4 text-slate-600 font-medium text-lg">
                            Direct access to the primary digital platforms for Indian Railways business and procurement.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {portals.map((portal) => {
                            const Icon = portal.icon;
                            return (
                                <a
                                    key={portal.name}
                                    href={portal.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col p-6 rounded-3xl border border-white bg-white/40 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 hover:border-emerald-200"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${portal.bg} border border-white/50 shadow-inner group-hover:scale-110 transition-transform`}>
                                            <Icon className={`h-6 w-6 ${portal.color}`} />
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                            {portal.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed flex-1 mb-4">
                                        {portal.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider group-hover:gap-3 transition-all">
                                        Visit Portal <ExternalLink className="h-3.5 w-3.5" />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ────────────────────────────────────── */}
            <section className="py-20 lg:py-28">
                <div className="section-container ceramic-panel rounded-3xl py-16 px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                            Professional Process
                        </span>
                        <h2 className="mt-3 font-display text-4xl font-bold text-slate-900">
                            How It Works
                        </h2>
                    </div>
                    <div className="grid gap-12 sm:grid-cols-3">
                        {steps.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={s.step} className="relative flex flex-col items-center text-center px-4">
                                    {i < steps.length - 1 && (
                                        <div className="absolute left-[calc(50%+4rem)] top-12 hidden h-px w-[calc(100%-8rem)] border-t-2 border-dashed border-emerald-100 sm:block" />
                                    )}
                                    <div className="mb-6 relative">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-50 border border-emerald-100 shadow-inner">
                                            <Icon className="h-10 w-10 text-emerald-600" />
                                        </div>
                                        <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-lg">
                                            {s.step}
                                        </span>
                                    </div>
                                    <h3 className="mb-3 font-display text-xl font-bold text-slate-900">{s.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500 font-medium">{s.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-16 text-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-10 h-14 rounded-xl shadow-xl shadow-emerald-500/20 gap-3"
                        >
                            <Link to="/#onboard">
                                Start Your Application
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OpportunitiesHub;
