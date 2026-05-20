import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Calendar,
    Users,
    ChevronRight,
    ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { opportunityCategories } from "@/data/businessOpportunities";

const statusStyle: Record<string, string> = {
    Active: "bg-green-100 text-green-800 border-green-200",
    Upcoming: "bg-amber-100 text-amber-800 border-amber-200",
};

const OpportunityDetail = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();

    const category = opportunityCategories.find((c) => c.id === categoryId);

    // SEO: update <title> and meta description per page
    useEffect(() => {
        if (category) {
            document.title = `${category.title} | SETU-NFR Business Opportunities`;
            const meta = document.querySelector("meta[name='description']");
            if (meta) {
                meta.setAttribute("content", category.description);
            } else {
                const newMeta = document.createElement("meta");
                newMeta.name = "description";
                newMeta.content = category.description;
                document.head.appendChild(newMeta);
            }
        }
        return () => {
            document.title = "SETU-NFR | Strategic Ecosystem for Trade Unified Platform";
        };
    }, [category]);

    // 404 if category not found
    if (!category) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
                    <p className="text-5xl font-bold text-muted-foreground/30">404</p>
                    <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
                        Category not found
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        The opportunity category you're looking for doesn't exist.
                    </p>
                    <Button asChild className="mt-6 bg-primary text-primary-foreground">
                        <Link to="/opportunities">← Back to Opportunities</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const Icon = category.icon;
    const totalItems = category.subCategories.reduce(
        (acc, sc) => acc + sc.items.length,
        0
    );

    // Adjacent categories for prev/next navigation
    const currentIndex = opportunityCategories.findIndex((c) => c.id === categoryId);
    const prevCat = opportunityCategories[currentIndex - 1];
    const nextCat = opportunityCategories[currentIndex + 1];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="relative pt-16 overflow-hidden">
                <div className="gradient-navy">
                    {/* Subtle dot pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />

                    <div className="section-container relative py-16 lg:py-24">
                        {/* Breadcrumb */}
                        <nav className="mb-8 flex items-center gap-2 text-sm text-primary-foreground/50">
                            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <Link to="/opportunities" className="hover:text-gold transition-colors">Opportunities</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-gold">{category.title}</span>
                        </nav>

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl animate-fade-up">
                                {/* Icon + status */}
                                <div className="mb-5 flex items-center gap-4">
                                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}>
                                        <Icon className={`h-8 w-8 ${category.iconColor}`} />
                                    </div>
                                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${statusStyle[category.status]}`}>
                                        {category.status}
                                    </span>
                                </div>

                                {/* Tagline */}
                                <p className={`mb-2 text-sm font-semibold uppercase tracking-widest ${category.iconColor === "text-amber-600" ? "text-gold" : "text-gold"}`}>
                                    {category.tagline}
                                </p>

                                {/* Title */}
                                <h1 className="mb-4 font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
                                    {category.title}
                                </h1>

                                <p className="text-lg leading-relaxed text-primary-foreground/70">
                                    {category.description}
                                </p>

                                {/* Stats row */}
                                <div className="mt-8 flex flex-wrap gap-6">
                                    <div>
                                        <div className="font-display text-2xl font-bold text-gold">{totalItems}+</div>
                                        <div className="text-sm text-primary-foreground/60">Opportunities</div>
                                    </div>
                                    <div>
                                        <div className="font-display text-2xl font-bold text-gold">{category.subCategories.length}</div>
                                        <div className="text-sm text-primary-foreground/60">Sub-Categories</div>
                                    </div>
                                    <div>
                                        <div className="font-display text-2xl font-bold text-gold flex items-center gap-1">
                                            <Calendar className="h-5 w-5" />{category.deadline}
                                        </div>
                                        <div className="text-sm text-primary-foreground/60">Deadline</div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA card */}
                            <div className="animate-fade-up rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm lg:min-w-[280px]">
                                <h3 className="mb-2 font-display text-lg font-bold text-primary-foreground">
                                    Ready to Apply?
                                </h3>
                                <p className="mb-5 text-sm leading-relaxed text-primary-foreground/60">
                                    Submit your business proposal and our BDU team will get back to you within 5–7 business days.
                                </p>
                                <Button
                                    asChild
                                    className="w-full bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold gap-2"
                                >
                                    <a href="/onboard">
                                        Apply Now <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    className="mt-2 w-full border-2 border-white/30 bg-transparent text-white hover:bg-white/10 font-medium"
                                >
                                    <Link to="/opportunities">← All Opportunities</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SUB-CATEGORIES ───────────────────────────── */}
            <section className="py-16 lg:py-20">
                <div className="section-container">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                            What's Available
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                            Available Opportunities
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Explore all sub-categories and specific opportunities within {category.title}.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {category.subCategories.map((sc) => (
                            <div
                                key={sc.name}
                                className={`rounded-2xl border-2 border-border bg-card p-6 transition-all hover:shadow-lg ${category.borderColor}`}
                            >
                                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${category.color}`}>
                                    <Icon className={`h-5 w-5 ${category.iconColor}`} />
                                </div>
                                <h3 className="mb-4 font-display text-lg font-bold text-card-foreground">
                                    {sc.name}
                                </h3>
                                <ul className="space-y-2">
                                    {sc.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5">
                                            <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${category.iconColor}`} />
                                            <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHO SHOULD APPLY ─────────────────────────── */}
            <section className="bg-surface-warm py-14 lg:py-16">
                <div className="section-container">
                    <div className="mx-auto max-w-3xl rounded-2xl border-2 border-border bg-card p-8 lg:p-10">
                        <div className="mb-4 flex items-center gap-3">
                            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}>
                                <Users className={`h-6 w-6 ${category.iconColor}`} />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-card-foreground">
                                Who Should Apply?
                            </h2>
                        </div>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            {category.whoShouldApply}
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                            >
                                <a href="/onboard">
                                    Submit Application <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link to="/opportunities">Browse All Categories</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── USEFUL LINKS ───────────────────────────── */}
            {category.links && category.links.length > 0 && (
                <section className="py-12 border-t border-border">
                    <div className="section-container">
                        <div className="flex flex-col items-center text-center mb-8">
                            <h2 className="font-display text-2xl font-bold text-foreground">
                                Useful Resources & Links
                            </h2>
                            <p className="mt-2 text-muted-foreground max-w-xl">
                                Official portals and policy documents relevant to {category.title} opportunities.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {category.links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm"
                                >
                                    {link.label}
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── PREV / NEXT NAVIGATION ───────────────────── */}
            <section className="border-t border-border py-10">
                <div className="section-container flex items-center justify-between gap-4">
                    {prevCat ? (
                        <Link
                            to={prevCat.route}
                            className="group flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/40 hover:shadow-md"
                        >
                            <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <div>
                                <p className="text-xs text-muted-foreground">Previous</p>
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {prevCat.title}
                                </p>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextCat ? (
                        <Link
                            to={nextCat.route}
                            className="group flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-right transition-all hover:border-primary/40 hover:shadow-md"
                        >
                            <div>
                                <p className="text-xs text-muted-foreground">Next</p>
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {nextCat.title}
                                </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OpportunityDetail;
