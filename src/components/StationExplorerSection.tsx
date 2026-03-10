import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    MapPin,
    TrendingUp,
    ChevronRight,
    ChevronLeft,
    Users,
    LayoutGrid,
    Table2,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
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
const PAGE_SIZE = 10;

type SortColumn =
    | "station"
    | "state"
    | "division"
    | "passengers_total"
    | "monthly"
    | "tier";

type ViewMode = "grid" | "table";

type Props = {
    compact?: boolean;
};

const StationExplorerSection = ({ compact = false }: Props) => {
    const [search, setSearch] = useState("");
    const [selectedState, setSelectedState] = useState("All");
    const [selectedTier, setSelectedTier] = useState<"All" | ReachTier>("All");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [sortColumn, setSortColumn] = useState<SortColumn>("passengers_total");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
    const [tablePage, setTablePage] = useState(0);

    const stationsWithTier = useMemo(
        () =>
            stations.map((s) => ({
                ...s,
                tier: getReachTier(s.passengers_total),
                monthly: getMonthlyImpressions(s.passengers_total),
            })),
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

    // Sorted data for table view
    const sortedFiltered = useMemo(() => {
        const TIER_ORDER: Record<ReachTier, number> = {
            "City Hub": 0,
            "Major Station": 1,
            "District Station": 2,
            "Local Market": 3,
        };
        return [...filtered].sort((a, b) => {
            let cmp = 0;
            if (sortColumn === "station") cmp = a.station.localeCompare(b.station);
            else if (sortColumn === "state") cmp = a.state.localeCompare(b.state);
            else if (sortColumn === "division")
                cmp = a.division.localeCompare(b.division);
            else if (sortColumn === "passengers_total")
                cmp = a.passengers_total - b.passengers_total;
            else if (sortColumn === "monthly") cmp = a.monthly - b.monthly;
            else if (sortColumn === "tier")
                cmp = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
            return sortDir === "asc" ? cmp : -cmp;
        });
    }, [filtered, sortColumn, sortDir]);

    // For grid view — sorted descending by passengers by default
    const defaultSorted = useMemo(
        () => [...filtered].sort((a, b) => b.passengers_total - a.passengers_total),
        [filtered]
    );

    const visible = defaultSorted.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;
    const totalReach = filtered.reduce((acc, s) => acc + s.passengers_total, 0);

    const handleSort = (col: SortColumn) => {
        if (sortColumn === col) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(col);
            setSortDir(col === "station" || col === "state" || col === "division" ? "asc" : "desc");
        }
        setTablePage(0);
    };

    // Pagination helpers
    const totalPages = Math.ceil(sortedFiltered.length / PAGE_SIZE);
    const pagedRows = sortedFiltered.slice(tablePage * PAGE_SIZE, (tablePage + 1) * PAGE_SIZE);

    const SortIcon = ({ col }: { col: SortColumn }) => {
        if (sortColumn !== col)
            return <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground/50" />;
        return sortDir === "asc" ? (
            <ArrowUp className="ml-1 h-3 w-3 text-gold-dark" />
        ) : (
            <ArrowDown className="ml-1 h-3 w-3 text-gold-dark" />
        );
    };

    const thClass =
        "cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors";

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

                {/* Tier stat tiles */}
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
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search station name or code..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setVisibleCount(INITIAL_VISIBLE);
                                setTablePage(0);
                            }}
                            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["All", ...ALL_STATES].map((state) => (
                            <button
                                key={state}
                                onClick={() => {
                                    setSelectedState(state);
                                    setVisibleCount(INITIAL_VISIBLE);
                                    setTablePage(0);
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

                {/* Result count + reach + view toggle */}
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                        <span className="text-muted-foreground">
                            <span className="font-semibold text-foreground">{filtered.length}</span> stations found
                        </span>
                        {filtered.length > 0 && (
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                <TrendingUp className="h-3.5 w-3.5 text-gold-dark" />
                                Combined reach:{" "}
                                <span className="font-semibold text-foreground">
                                    {formatPassengers(totalReach)}/yr
                                </span>
                            </span>
                        )}
                    </div>

                    {/* View toggle */}
                    <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
                        <button
                            onClick={() => setViewMode("grid")}
                            title="Grid view"
                            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${viewMode === "grid"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <LayoutGrid className="h-3.5 w-3.5" />
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("table")}
                            title="Table view"
                            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${viewMode === "table"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Table2 className="h-3.5 w-3.5" />
                            Table
                        </button>
                    </div>
                </div>

                {/* ─── EMPTY STATE ─────────────────────────────────── */}
                {filtered.length === 0 ? (
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
                ) : viewMode === "grid" ? (
                    /* ─── GRID VIEW ─────────────────────────────────── */
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {visible.map((s) => {
                                const meta = REACH_TIER_META[s.tier];
                                const barPct = Math.max(
                                    4,
                                    Math.round((s.passengers_total / MAX_PASSENGERS) * 100)
                                );

                                return (
                                    <div
                                        key={s.code}
                                        className="group flex flex-col rounded-xl border-2 border-border bg-card p-4 transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30"
                                    >
                                        <div className="mb-3 flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-display text-base font-bold text-card-foreground leading-tight">
                                                    {s.station}
                                                </h3>
                                                <span className="text-xs text-muted-foreground font-mono">{s.code}</span>
                                            </div>
                                            <span className={`flex-shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${meta.badgeBg}`}>
                                                {s.tier}
                                            </span>
                                        </div>
                                        <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <MapPin className="h-3 w-3 flex-shrink-0" />
                                            <span>{s.state}</span>
                                            <span className="text-border">·</span>
                                            <span>{s.division} Div.</span>
                                        </div>
                                        <div className="mb-1 flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">Annual Footfall</span>
                                            <span className="font-semibold text-foreground">{formatPassengers(s.passengers_total)}</span>
                                        </div>
                                        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${barPct}%`,
                                                    backgroundColor:
                                                        s.tier === "City Hub" ? "#16a34a"
                                                            : s.tier === "Major Station" ? "#2563eb"
                                                                : s.tier === "District Station" ? "#d97706"
                                                                    : "#9ca3af",
                                                }}
                                            />
                                        </div>
                                        <div className="mt-auto flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2">
                                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">
                                                Est. monthly reach:{" "}
                                                <span className="font-semibold text-foreground">
                                                    {formatPassengers(s.monthly)}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {!compact && hasMore && (
                            <div className="mt-8 flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setVisibleCount((v) => v + LOAD_MORE_COUNT)}
                                    className="min-w-[200px]"
                                >
                                    Load More ({filtered.length - visibleCount} remaining)
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    /* ─── TABLE VIEW ─────────────────────────────────── */
                    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                        <table className="w-full min-w-[700px] text-sm">
                            <thead className="border-b border-border bg-muted/40">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-10">
                                        #
                                    </th>
                                    <th className={thClass} onClick={() => handleSort("station")}>
                                        <span className="flex items-center">Station <SortIcon col="station" /></span>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Code
                                    </th>
                                    <th className={thClass} onClick={() => handleSort("state")}>
                                        <span className="flex items-center">State <SortIcon col="state" /></span>
                                    </th>
                                    <th className={thClass} onClick={() => handleSort("division")}>
                                        <span className="flex items-center">Division <SortIcon col="division" /></span>
                                    </th>
                                    <th className={thClass} onClick={() => handleSort("tier")}>
                                        <span className="flex items-center">Reach Tier <SortIcon col="tier" /></span>
                                    </th>
                                    <th className={thClass} onClick={() => handleSort("passengers_total")}>
                                        <span className="flex items-center">Annual Footfall <SortIcon col="passengers_total" /></span>
                                    </th>
                                    <th className={thClass} onClick={() => handleSort("monthly")}>
                                        <span className="flex items-center">Monthly Reach <SortIcon col="monthly" /></span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {pagedRows.map((s, idx) => {
                                    const meta = REACH_TIER_META[s.tier];
                                    const barPct = Math.max(
                                        3,
                                        Math.round((s.passengers_total / MAX_PASSENGERS) * 100)
                                    );
                                    const globalIdx = tablePage * PAGE_SIZE + idx + 1;
                                    return (
                                        <tr
                                            key={s.code}
                                            className="transition-colors hover:bg-muted/30"
                                        >
                                            <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                                                {globalIdx}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-foreground">
                                                {s.station}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                                    {s.code}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">{s.state}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{s.division}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${meta.badgeBg}`}>
                                                    {s.tier}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted flex-shrink-0">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${barPct}%`,
                                                                backgroundColor:
                                                                    s.tier === "City Hub" ? "#16a34a"
                                                                        : s.tier === "Major Station" ? "#2563eb"
                                                                            : s.tier === "District Station" ? "#d97706"
                                                                                : "#9ca3af",
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="font-semibold text-foreground tabular-nums">
                                                        {formatPassengers(s.passengers_total)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-foreground tabular-nums">
                                                {formatPassengers(s.monthly)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* Pagination footer */}
                        <div className="border-t border-border px-4 py-2.5 flex items-center justify-between gap-4">
                            <span className="text-xs text-muted-foreground">
                                {sortedFiltered.length === 0 ? "0" : tablePage * PAGE_SIZE + 1}–{Math.min((tablePage + 1) * PAGE_SIZE, sortedFiltered.length)} of {sortedFiltered.length} stations
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setTablePage((p) => Math.max(0, p - 1))}
                                    disabled={tablePage === 0}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded border border-border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="min-w-[80px] text-center text-xs font-medium text-foreground">
                                    Page {tablePage + 1} of {Math.max(1, totalPages)}
                                </span>
                                <button
                                    onClick={() => setTablePage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={tablePage >= totalPages - 1}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded border border-border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* View All link */}
                <div className="mt-8 flex justify-center">
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
