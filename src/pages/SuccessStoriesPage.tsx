import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Star,
    ChevronRight,
    ArrowRight,
    MapPin,
    TrendingUp,
    Users,
    Award,
    Quote,
    Megaphone,
    ShoppingBag,
    Bus,
    Package,
    Truck,
    Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type Story = {
    id: string;
    partnerName: string;
    category: string;
    categoryIcon: React.ElementType;
    iconColor: string;
    iconBg: string;
    station: string;
    division: string;
    since: string;
    impact: string;
    quote: string;
    metrics: { label: string; value: string }[];
    tag: string;
    tagColor: string;
};

const stories: Story[] = [
    {
        id: "1",
        partnerName: "GoAds NE Media Pvt. Ltd.",
        category: "Advertising & Media",
        categoryIcon: Megaphone,
        iconColor: "text-amber-600",
        iconBg: "bg-amber-50",
        station: "Guwahati, Dibrugarh, Tinsukia",
        division: "Lumding & Tinsukia Division",
        since: "2021",
        impact: "Operates over 200 advertising panels across 12 major NFR stations, serving brands like Airtel, HDFC Bank, and Amul.",
        quote: "NFR gave us a platform to reach lakhs of passengers daily. The BDU team was seamless to work with — from licensing to on-ground installation.",
        metrics: [
            { label: "Panels Operated", value: "200+" },
            { label: "Stations Covered", value: "12" },
            { label: "Annual Revenue", value: "₹2.4 Cr+" },
        ],
        tag: "Advertising",
        tagColor: "bg-amber-100 text-amber-700 border-amber-200",
    },
    {
        id: "2",
        partnerName: "Brahmaputra Fresh Foods",
        category: "Retail, Food & Commercial",
        categoryIcon: ShoppingBag,
        iconColor: "text-green-600",
        iconBg: "bg-green-50",
        station: "Guwahati Railway Station",
        division: "Lumding Division",
        since: "2020",
        impact: "Runs a food plaza and two branded kiosks at Guwahati Station, serving 3,000+ passengers daily with Northeast cuisine.",
        quote: "Railway stations have massive captive footfall. Our outlet saw breakeven in under 8 months. SETU-NFR made onboarding straightforward.",
        metrics: [
            { label: "Daily Footfall Served", value: "3,000+" },
            { label: "Outlets", value: "3" },
            { label: "Staff Employed", value: "28" },
        ],
        tag: "Food & Retail",
        tagColor: "bg-green-100 text-green-700 border-green-200",
    },
    {
        id: "3",
        partnerName: "NE RideConnect",
        category: "Mobility & Transport",
        categoryIcon: Bus,
        iconColor: "text-purple-600",
        iconBg: "bg-purple-50",
        station: "Guwahati, Jorhat, Dimapur",
        division: "Tinsukia Division",
        since: "2022",
        impact: "Operates cab aggregation and EV charging services at 3 major stations, providing first-mile connectivity to 500+ daily commuters.",
        quote: "We integrated our cab app with NFR's passenger network. The data insight from footfall counts alone helped us optimise our fleet deployment.",
        metrics: [
            { label: "Daily Rides", value: "500+" },
            { label: "EV Chargers", value: "18" },
            { label: "Partner Drivers", value: "120+" },
        ],
        tag: "Mobility",
        tagColor: "bg-purple-100 text-purple-700 border-purple-200",
    },
    {
        id: "4",
        partnerName: "Assam Parcel Express Pvt. Ltd.",
        category: "Parcel & Courier",
        categoryIcon: Package,
        iconColor: "text-teal-600",
        iconBg: "bg-teal-50",
        station: "Guwahati, Rangiya, Barpeta Road",
        division: "Rangia Division",
        since: "2023",
        impact: "Franchise parcel booking centres at 3 stations enabling overnight parcel delivery across the Northeast, integrating with Flipkart's supply chain.",
        quote: "Using NFR's rail network brought our delivery cost down by 40% vs road. We now serve over 200 pin codes in just 24–48 hours.",
        metrics: [
            { label: "Parcels/Month", value: "8,000+" },
            { label: "Pin Codes Served", value: "200+" },
            { label: "Cost Reduction", value: "40%" },
        ],
        tag: "Parcel",
        tagColor: "bg-teal-100 text-teal-700 border-teal-200",
    },
    {
        id: "5",
        partnerName: "Northeast Logistics Hub",
        category: "Freight Opportunities",
        categoryIcon: Truck,
        iconColor: "text-yellow-700",
        iconBg: "bg-yellow-50",
        station: "Azara Goods Yard, Guwahati",
        division: "Lumding Division",
        since: "2021",
        impact: "Operates a Gati Shakti Cargo Terminal at Guwahati, handling FMCG, cement, and steel freight across the Northeast rail corridor.",
        quote: "India's freight future is on rail. The GCT license from NFR gave us the infrastructure backbone to serve large-scale industrial clients.",
        metrics: [
            { label: "Freight/Month", value: "12,000 MT" },
            { label: "Clients Served", value: "35+" },
            { label: "Turnaround Time", value: "< 24hrs" },
        ],
        tag: "Freight",
        tagColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    {
        id: "6",
        partnerName: "GreenBuild Infrastructure",
        category: "Infrastructure Development",
        categoryIcon: Building2,
        iconColor: "text-orange-600",
        iconBg: "bg-orange-50",
        station: "New Jalpaiguri, Siliguri",
        division: "Katihar Division",
        since: "2019",
        impact: "Completed station landscaping, forecourt redevelopment, and amenity block upgrades at NJP — one of NFR's busiest gateway stations.",
        quote: "Railway infrastructure projects are complex but immensely rewarding. The SETU-NFR team was collaborative at every stage of the NJP project.",
        metrics: [
            { label: "Project Value", value: "₹8.5 Cr" },
            { label: "Completion", value: "On schedule" },
            { label: "Passengers Benefited", value: "50,000+/day" },
        ],
        tag: "Infrastructure",
        tagColor: "bg-orange-100 text-orange-700 border-orange-200",
    },
];

const stats = [
    { icon: Users, value: "120+", label: "Active Partners" },
    { icon: MapPin, value: "85+", label: "Stations Covered" },
    { icon: TrendingUp, value: "₹45 Cr+", label: "Non-Fare Revenue FY24" },
    { icon: Award, value: "10+", label: "Business Categories" },
];

const SuccessStoriesPage = () => {
    useEffect(() => {
        document.title = "Success Stories | SETU-NFR";
    }, []);

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
                            <span className="text-gold">Success Stories</span>
                        </nav>

                        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-5">
                            <Star className="h-4 w-4 text-gold" />
                            <span className="text-sm font-medium text-gold">Partner Achievements</span>
                        </div>

                        <h1 className="font-display text-4xl font-extrabold text-primary-foreground sm:text-5xl lg:text-6xl">
                            Partners Who{" "}
                            <span className="text-gradient-gold">Chose NFR</span>
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg text-primary-foreground/70">
                            Real businesses. Real impact. Discover how partners across the Northeast are growing their operations through SETU-NFR's opportunity ecosystem.
                        </p>

                        {/* Stats bar */}
                        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-primary-foreground/10 pt-8 sm:grid-cols-4">
                            {stats.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div key={s.label}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon className="h-4 w-4 text-gold" />
                                            <div className="font-display text-2xl font-bold text-gold">{s.value}</div>
                                        </div>
                                        <div className="text-sm text-primary-foreground/60">{s.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STORIES GRID ── */}
            <section className="py-16 lg:py-20">
                <div className="section-container">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                            Partner Spotlight
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                            Stories from the Ground
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            From food kiosks to freight terminals — businesses of all sizes are building real value on the NFR network.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {stories.map((story) => {
                            const CategoryIcon = story.categoryIcon;
                            return (
                                <div
                                    key={story.id}
                                    className="group flex flex-col rounded-2xl border-2 border-border bg-card p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    {/* Header Row */}
                                    <div className="mb-5 flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${story.iconBg}`}>
                                                <CategoryIcon className={`h-6 w-6 ${story.iconColor}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-display text-lg font-bold text-card-foreground leading-tight">
                                                    {story.partnerName}
                                                </h3>
                                                <p className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${story.tagColor}`}>
                                                    {story.tag}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-xs text-muted-foreground">Partner since</div>
                                            <div className="font-display text-lg font-bold text-foreground">{story.since}</div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <MapPin className="h-3.5 w-3.5 text-gold-dark flex-shrink-0" />
                                        <span>{story.station} · {story.division}</span>
                                    </div>

                                    {/* Impact */}
                                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground flex-1">
                                        {story.impact}
                                    </p>

                                    {/* Metrics */}
                                    <div className="mb-5 grid grid-cols-3 gap-3 rounded-xl bg-muted/50 p-4">
                                        {story.metrics.map((m) => (
                                            <div key={m.label} className="text-center">
                                                <div className={`font-display text-lg font-bold ${story.iconColor}`}>{m.value}</div>
                                                <div className="mt-0.5 text-xs text-muted-foreground leading-tight">{m.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                                        <Quote className="h-4 w-4 text-gold mb-2 flex-shrink-0" />
                                        <p className="text-sm italic leading-relaxed text-muted-foreground">
                                            "{story.quote}"
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── BECOME NEXT SUCCESS STORY ── */}
            <section className="bg-surface-warm py-16 lg:py-20">
                <div className="section-container">
                    <div className="mx-auto max-w-3xl rounded-2xl border-2 border-gold/30 bg-card p-10 text-center shadow-xl">
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                            <Star className="h-7 w-7 text-gold" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                            Become the Next Success Story
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                            Join 120+ partners already building their business on one of India's most dynamic railway networks. The BDU team is ready to guide you every step of the way.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2" size="lg">
                                <a href="/onboard">Apply Now <ArrowRight className="h-4 w-4" /></a>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link to="/opportunities">Browse Opportunities</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SuccessStoriesPage;
