import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, TrendingUp, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stations, ALL_STATES } from "@/data/stations";
import {
    getReachTier,
    getMonthlyImpressions,
    formatPassengers,
    REACH_TIER_META,
    MAX_PASSENGERS,
    type ReachTier,
} from "@/lib/stationUtils";

const REACH_TIERS: ReachTier[] = [
    "City Hub",
    "Major Station",
    "District Station",
    "Local Market",
];

const INITIAL_VISIBLE = 12;
const LOAD_MORE_COUNT = 12;

type Props = {
    /** When true, hides the "Load More" button and shows a "View Full Explorer" link instead */
    compact?: boolean;
};

const StationExplorerSection = ({ compact = false }: Props) => {
    const [search, setSearch] = useState("");
    const [selectedState, setSelectedState] = useState("All");
    const [selectedTier, setSelectedTier] = useState<"All" | ReachTier>("All");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    // Compute tier for each station once (memoised)
    const stationsWithTier = useMemo(
        () =>
            stations
                .map((s) => ({ ...s, tier: getReachTier(s.passengers_total) }))
                .sort((a, b) => b.passengers_total - a.passengers_total),
        []
    );

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return stationsWithTier.filter((s) => {
            const matchSearch =
                !q ||
                s.station.toLowerCase().includes(q) ||
                s.code.toLowerCase().includes(q);
            const matchState = selectedState === "All" || s.state === selectedState;
            const matchTier = selectedTier === "All" || s.tier === selectedTier;
            return matchSearch && matchState && matchTier;
        });
    }, [stationsWithTier, search, selectedState, selectedTier]);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    const totalReach = filtered.reduce((acc, s) => acc + s.passengers_total, 0);

    return (
        <section className="py-16 lg:py-20 bg-surface-warm border-t border-border">
            <div className="section-container">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-10">
                    <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                        NFR Station Network
                    </span>
                    <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                        Explore Stations by Reach & Footfall
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Browse all {stations.length} NFR stations. Filter by state or campaign scale to find the best advertising locations for your business.
                    </p>
                </div>

                {/* Summary stats row */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {REACH_TIERS.map((tier) => {
                        const meta = REACH_TIER_META[tier];
                        const count = stationsWithTier.filter((s) => s.tier === tier).length;
                        return (
                            <button
                                key={tier}
                                onClick={() =>
                                    setSelectedTier((prev) => (prev === tier ? "All" : tier))
                                }
                                className={`flex flex-col items-center rounded-xl border-2 p-4 text-center transition-all hover:shadow-md ${selectedTier === tier
                                        ? `${meta.bg} ${meta.border} shadow-sm`
                                        : "border-border bg-card hover:border-primary/30"
                                    }`}
                            >
                                <span
                                    className={`text-2xl font-bold font-display ${selectedTier === tier ? meta.color : "text-foreground"
                                        }`}
                                >
                                    {count}
                                </span>
                                <span
                                    className={`mt-1 text-xs font-semibold ${selectedTier === tier ? meta.color : "text-muted-foreground"
                                        }`}
                                >
                                    {tier}
                                </span>
                                <span className="mt-0.5 text-[10px] text-muted-foreground hidden sm:block">
                                    {meta.description}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Search + state filters */}
                <div className="mb-6 flex flex-col gap-3">
                    {/* Search bar */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search station name or code..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setVisibleCount(INITIAL_VISIBLE);
                            }}
                            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                        />
                    </div>

                    {/* State pills */}
                    <div className="flex flex-wrap gap-2">
                        {["All", ...ALL_STATES].map((state) => (
                            <button
                                key={state}
                                onClick={() => {
                                    setSelectedState(state);
                                    setVisibleCount(INITIAL_VISIBLE);
                                }}
                                className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${selectedState === state
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                                    }`}
                            >
                                {state}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Result count + combined reach */}
                <div className="mb-5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        <span className="font-semibold text-foreground">{filtered.length}</span> stations found
                    </span>
                    {filtered.length > 0 && (
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <TrendingUp className="h-3.5 w-3.5 text-gold-dark" />
                            Combined annual reach:{" "}
                            <span className="font-semibold text-foreground">
                                {formatPassengers(totalReach)}
                            </span>
                        </span>
                    )}
                </div>

                {/* Station cards grid */}
                {visible.length === 0 ? (
                    <div className="flex flex-col items-center py-16 text-center">
                        <Search className="mb-3 h-10 w-10 text-muted-foreground/30" />
                        <p className="font-semibold text-foreground">No stations found</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try a different search or clear the filters.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearch("");
                                setSelectedState("All");
                                setSelectedTier("All");
                                setVisibleCount(INITIAL_VISIBLE);
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visible.map((s) => {
                            const meta = REACH_TIER_META[s.tier];
                            const barPct = Math.max(
                                4,
                                Math.round((s.passengers_total / MAX_PASSENGERS) * 100)
                            );
                            const monthly = getMonthlyImpressions(s.passengers_total);

                            return (
                                <div
                                    key={s.code}
                                    className={`group flex flex-col rounded-xl border-2 border-border bg-card p-4 transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30`}
                                >
                                    {/* Top row */}
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-display text-base font-bold text-card-foreground leading-tight">
                                                {s.station}
                                            </h3>
                                            <span className="text-xs text-muted-foreground font-mono">
                                                {s.code}
                                            </span>
                                        </div>
                                        <span
                                            className={`flex-shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${meta.badgeBg}`}
                                        >
                                            {s.tier}
                                        </span>
                                    </div>

                                    {/* State + division */}
                                    <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <MapPin className="h-3 w-3 flex-shrink-0" />
                                        <span>{s.state}</span>
                                        <span className="text-border">·</span>
                                        <span>{s.division} Div.</span>
                                    </div>

                                    {/* Passenger bar */}
                                    <div className="mb-1 flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Annual Footfall</span>
                                        <span className="font-semibold text-foreground">
                                            {formatPassengers(s.passengers_total)}
                                        </span>
                                    </div>
                                    <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                        <div
                                            className={`h-full rounded-full ${meta.bg} border ${meta.border}`}
                                            style={{
                                                width: `${barPct}%`,
                                                backgroundColor:
                                                    s.tier === "City Hub"
                                                        ? "#16a34a"
                                                        : s.tier === "Major Station"
                                                            ? "#2563eb"
                                                            : s.tier === "District Station"
                                                                ? "#d97706"
                                                                : "#9ca3af",
                                            }}
                                        />
                                    </div>

                                    {/* Monthly reach */}
                                    <div className="mt-auto flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2">
                                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">
                                            Est. monthly reach:{" "}
                                            <span className="font-semibold text-foreground">
                                                {formatPassengers(monthly)}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Load More / View All */}
                <div className="mt-8 flex flex-col items-center gap-3">
                    {!compact && hasMore && (
                        <Button
                            variant="outline"
                            onClick={() => setVisibleCount((v) => v + LOAD_MORE_COUNT)}
                            className="min-w-[180px]"
                        >
                            Load More Stations ({filtered.length - visibleCount} remaining)
                        </Button>
                    )}
                    <Link
                        to="/opportunities/advertising"
                        className="flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-primary transition-colors"
                    >
                        View Full Advertising Explorer
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default StationExplorerSection;
