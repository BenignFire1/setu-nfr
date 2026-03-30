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
    Filter,
    Coffee,
    CreditCard,
    Clock,
    Volume2,
    Home,
    Bed,
    SquareArrowUpRight,
    Car,
    Accessibility,
    Building2,
    Briefcase,
    Check,
    X,
    Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { stations, ALL_STATES, ALL_DIVISIONS, ALL_CATEGORIES } from "@/data/stations";
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
    const [selectedDivision, setSelectedDivision] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTier, setSelectedTier] = useState<"All" | ReachTier>("All");
    const [facilitiesFilter, setFacilitiesFilter] = useState<Record<string, boolean>>({
        atm: false,
        food: false,
        cloak: false,
        escalator: false,
        parking: false,
        disability: false,
    });
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [sortColumn, setSortColumn] = useState<SortColumn>("passengers_total");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
    const [tablePage, setTablePage] = useState(0);

    const toggleFacility = (key: string) => {
        setFacilitiesFilter(prev => ({ ...prev, [key]: !prev[key] }));
        setVisibleCount(INITIAL_VISIBLE);
        setTablePage(0);
    };

    const activeFacilitiesCount = Object.values(facilitiesFilter).filter(Boolean).length;

    const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(null);

    const FacilityStatus = ({ exists, label }: { exists: boolean | number; label?: string }) => (
        <div className="flex items-center gap-2">
            {exists ? (
                <Check className="h-4 w-4 text-green-600 font-bold" strokeWidth={3} />
            ) : (
                <X className="h-4 w-4 text-red-400 opacity-60" />
            )}
            {label && <span className={exists ? "font-medium text-foreground" : "text-muted-foreground line-through"}>{label}</span>}
        </div>
    );

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
            const matchDivision = selectedDivision === "All" || s.division === selectedDivision;
            const matchCategory = selectedCategory === "All" || s.present_category === selectedCategory;
            const matchTier = selectedTier === "All" || s.tier === selectedTier;

            // Facilities match
            const f = s.facilities;
            const matchFacilities = !f ? activeFacilitiesCount === 0 : (
                (!facilitiesFilter.atm || f.atm_nos > 0) &&
                (!facilitiesFilter.food || f.food_plaza || f.refreshment_room > 0) &&
                (!facilitiesFilter.cloak || f.cloak_room) &&
                (!facilitiesFilter.escalator || f.disability_lifts_escalators) &&
                (!facilitiesFilter.parking || f.parking_earmarked || f.parking_area_sqm > 0) &&
                (!facilitiesFilter.disability || (f.disability_wheelchair || f.disability_ramp || f.disability_toilet))
            );

            return matchSearch && matchState && matchDivision && matchCategory && matchTier && matchFacilities;
        });
    }, [stationsWithTier, search, selectedState, selectedDivision, selectedCategory, selectedTier, facilitiesFilter, activeFacilitiesCount]);

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
        <section className="relative z-10 py-16 lg:py-20">
            <div className="section-container">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-12 animate-fade-up">
                    <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                        NF Railway Network
                    </span>
                    <h2 className="mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl drop-shadow-sm">
                        Explore Our Regional Reach
                    </h2>
                    <p className="mt-5 text-slate-600 font-medium leading-relaxed">
                        Discover station footprints across the majestic Northeast. Filter by division or state to find the perfect advertising location for your brand.
                    </p>
                </div>


                {/* Search + Filters */}
                <div className="mb-6 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="Search station name or code..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setVisibleCount(INITIAL_VISIBLE);
                                    setTablePage(0);
                                }}
                                className="w-full rounded-xl border border-white/60 bg-white/40 py-3 pl-11 pr-4 text-sm text-slate-900 backdrop-blur-xl placeholder:text-slate-400 focus:border-emerald-500/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-xl"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {/* State Filter */}
                            <Select value={selectedState} onValueChange={(val) => { setSelectedState(val); setVisibleCount(INITIAL_VISIBLE); setTablePage(0); }}>
                                 <SelectTrigger className="w-[140px] bg-white/40 border-white/60 backdrop-blur-md text-slate-700 font-semibold focus:ring-emerald-500/10">
                                    <SelectValue placeholder="State" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All States</SelectItem>
                                    {ALL_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            {/* Division Filter */}
                            <Select value={selectedDivision} onValueChange={(val) => { setSelectedDivision(val); setVisibleCount(INITIAL_VISIBLE); setTablePage(0); }}>
                                <SelectTrigger className="w-[160px] bg-white/40 border-white/60 backdrop-blur-md text-slate-700 font-semibold">
                                    <SelectValue placeholder="Division" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Divisions</SelectItem>
                                    {ALL_DIVISIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            {/* Category Filter */}
                            <Select value={selectedCategory} onValueChange={(val) => { setSelectedCategory(val); setVisibleCount(INITIAL_VISIBLE); setTablePage(0); }}>
                                <SelectTrigger className="w-[140px] bg-white/40 border-white/60 backdrop-blur-md text-slate-700 font-semibold">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Categories</SelectItem>
                                    {ALL_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            {/* Facilities Popover */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="bg-white/40 border-white/60 backdrop-blur-md text-slate-700 font-semibold relative hover:bg-emerald-50 transition-colors">
                                        <Filter className="mr-2 h-4 w-4 text-emerald-600" />
                                        Facilities
                                        {activeFacilitiesCount > 0 && (
                                            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                                                {activeFacilitiesCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-56 p-3">
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-sm border-b pb-2">Filter by Facilities</h4>
                                        <div className="space-y-2">
                                            {[
                                                { id: "atm", label: "ATM Available", icon: CreditCard },
                                                { id: "food", label: "Dining/Food", icon: Coffee },
                                                { id: "cloak", label: "Cloak Room", icon: Briefcase },
                                                { id: "escalator", label: "Escalator/Lift", icon: SquareArrowUpRight },
                                                { id: "parking", label: "Parking", icon: Car },
                                                { id: "disability", label: "Divyang Friendly", icon: Accessibility },
                                            ].map((f) => (
                                                <div key={f.id} className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id={f.id} 
                                                        checked={facilitiesFilter[f.id]} 
                                                        onCheckedChange={() => toggleFacility(f.id)}
                                                    />
                                                    <label htmlFor={f.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer">
                                                        <f.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                                        {f.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="w-full mt-2 text-xs h-8"
                                            onClick={() => {
                                                setFacilitiesFilter({
                                                    atm: false,
                                                    food: false,
                                                    cloak: false,
                                                    escalator: false,
                                                    parking: false,
                                                    disability: false,
                                                });
                                                setVisibleCount(INITIAL_VISIBLE);
                                            }}
                                        >
                                            Reset Facilities
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

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

                    <div className="flex items-center gap-3">
                        {/* View toggle */}
                        <div className="flex items-center rounded-lg border border-white/10 bg-slate-900/40 backdrop-blur-md p-0.5 shadow-lg">
                            <button
                                onClick={() => setViewMode("grid")}
                                title="Grid view"
                                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${viewMode === "grid"
                                    ? "bg-gold text-slate-950 shadow-sm shadow-gold/20 scale-105"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                <LayoutGrid className="h-3.5 w-3.5" />
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode("table")}
                                title="Table view"
                                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${viewMode === "table"
                                    ? "bg-gold text-slate-950 shadow-sm shadow-gold/20 scale-105"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                <Table2 className="h-3.5 w-3.5" />
                                Table
                            </button>
                        </div>
                    </div>
                </div>

                <Dialog open={!!selectedStation} onOpenChange={(open) => !open && setSelectedStation(null)}>
                    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader className="border-b pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div>
                                    <DialogTitle className="text-2xl font-bold font-display">{selectedStation?.station}</DialogTitle>
                                    <div className="text-sm text-muted-foreground mt-1 font-mono">{selectedStation?.code} · {selectedStation?.division} Division · Category {selectedStation?.present_category}</div>
                                </div>
                            </div>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                        <Building2 className="h-4 w-4" />
                                        Passenger Amenities
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2 border rounded-xl p-4 bg-muted/20">
                                        <FacilityStatus exists={selectedStation?.facilities?.food_plaza || selectedStation?.facilities?.refreshment_room} label="Food Plaza / Refreshment Room" />
                                        <FacilityStatus exists={selectedStation?.facilities?.atm_nos} label={`ATM Available (${selectedStation?.facilities?.atm_nos || 0})`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.cloak_room} label="Cloak Room" />
                                        <FacilityStatus exists={selectedStation?.facilities?.retiring_rooms} label={`Retiring Rooms (${selectedStation?.facilities?.retiring_rooms || 0})`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.dormitory_beds} label={`Dormitory Beds (${selectedStation?.facilities?.dormitory_beds || 0})`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.waiting_hall_area} label={`Waiting Hall (${selectedStation?.facilities?.waiting_hall_area || 0} sqm)`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.station_clock} label="Station Clock" />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                        <Volume2 className="h-4 w-4" />
                                        Connectivity & Info
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2 border rounded-xl p-4 bg-muted/20">
                                        <FacilityStatus exists={selectedStation?.facilities?.pas} label="Public Address System (PAS)" />
                                        <FacilityStatus exists={selectedStation?.facilities?.train_board} label="Digital Train Indication Board" />
                                        <FacilityStatus exists={selectedStation?.facilities?.touch_screen} label="Touch Screen Enquiry System" />
                                        <FacilityStatus exists={selectedStation?.facilities?.enquiry_counters} label={`Enquiry Counters (${selectedStation?.facilities?.enquiry_counters || 0})`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.booking_windows} label={`Booking Windows (${selectedStation?.facilities?.booking_windows || 0})`} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                        <Accessibility className="h-4 w-4" />
                                        Accessibility & Divyang
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2 border rounded-xl p-4 bg-muted/20">
                                        <FacilityStatus exists={selectedStation?.facilities?.disability_lifts_escalators} label="Escalators / Lifts" />
                                        <FacilityStatus exists={selectedStation?.facilities?.disability_wheelchair} label="Wheelchairs" />
                                        <FacilityStatus exists={selectedStation?.facilities?.disability_stretcher} label="Stretchers" />
                                        <FacilityStatus exists={selectedStation?.facilities?.disability_ramp} label="Ramp Access" />
                                        <FacilityStatus exists={selectedStation?.facilities?.disability_toilet} label="Accessible Toilets" />
                                        <FacilityStatus exists={selectedStation?.facilities?.disability_parking} label="Accessible Parking" />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                        <Car className="h-4 w-4" />
                                        Infrastructure
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2 border rounded-xl p-4 bg-muted/20">
                                        <FacilityStatus exists={selectedStation?.facilities?.parking_earmarked} label={`Earmarked Parking (${selectedStation?.facilities?.parking_area_sqm || 0} sqm)`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.fobs} label={`Foot Over-Bridges (${selectedStation?.facilities?.fobs || 0})`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.subways} label={`Subways (${selectedStation?.facilities?.subways || 0})`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.platforms_count} label={`Platforms (${selectedStation?.facilities?.platforms_count || 0})`} />
                                        <FacilityStatus exists={selectedStation?.facilities?.second_entry} label="Secondary Entry Point" />
                                        <FacilityStatus exists={selectedStation?.facilities?.platform_shelter} label="Platform Shelter Available" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t pt-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 rounded-lg bg-primary/5">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Annual Footfall</div>
                                    <div className="text-base font-bold text-foreground">{formatPassengers(selectedStation?.passengers_total || 0)}</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-primary/5">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Pass. / Day</div>
                                    <div className="text-base font-bold text-foreground">{formatPassengers(selectedStation?.facilities?.passengers_day || 0)}</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-primary/5">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Pass. Earnings (Report)</div>
                                    <div className="text-base font-bold text-blue-600">
                                        ₹{((selectedStation?.passenger_earnings_footfall || 0) / 10000000).toFixed(2)} Cr
                                    </div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-primary/5">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Total Earnings (Cat.)</div>
                                    <div className="text-base font-bold text-gold-dark">₹{((selectedStation?.earnings_total || 0) / 10000000).toFixed(2)} Cr</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-primary/5">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Station Type</div>
                                    <div className="text-base font-bold text-foreground">{selectedStation?.present_category}</div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

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

                                return (
                                    <div
                                        key={s.code}
                                        onClick={() => setSelectedStation(s)}
                                        className="group cursor-pointer flex flex-col rounded-2xl border border-white/80 bg-white/50 backdrop-blur-xl p-5 transition-all hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 hover:border-emerald-500/30 shadow-lg animate-fade-in"
                                    >
                                        <div className="mb-3 flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-display text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                                                    {s.station}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <span className="text-[10px] text-slate-500 font-mono tracking-wider">{s.code}</span>
                                                    <Badge variant="outline" className="text-[9px] py-0 px-1 border-emerald-100 text-emerald-800 font-mono uppercase bg-emerald-50 tracking-tighter">{s.present_category}</Badge>
                                                </div>
                                            </div>
                                            <span className={`flex-shrink-0 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-tight uppercase ${meta.badgeBg.replace('bg-', 'bg-')}`}>
                                                {s.tier}
                                            </span>
                                        </div>
                                        <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
                                            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600/70" />
                                            <span>{s.state}</span>
                                            <span className="text-slate-300">·</span>
                                            <span>{s.division} Div.</span>
                                        </div>

                                        {/* Key Facilities Summary */}
                                        <div className="mb-5 space-y-2 border border-white/60 rounded-xl p-3 bg-white/40 backdrop-blur-md">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-slate-700 flex items-center gap-1.5 font-medium"><CreditCard className="h-3.5 w-3.5 text-blue-600" /> ATM</span>
                                                <FacilityStatus exists={s.facilities?.atm_nos} />
                                            </div>
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-slate-700 flex items-center gap-1.5 font-medium"><Coffee className="h-3.5 w-3.5 text-orange-600" /> Food Plaza</span>
                                                <FacilityStatus exists={s.facilities?.food_plaza} />
                                            </div>
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-slate-700 flex items-center gap-1.5 font-medium"><SquareArrowUpRight className="h-3.5 w-3.5 text-indigo-600" /> Lift / Esc.</span>
                                                <FacilityStatus exists={s.facilities?.disability_lifts_escalators} />
                                            </div>
                                        </div>
                                        
                                        <Button variant="ghost" size="sm" className="w-full text-xs h-8 mb-5 font-bold text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-all rounded-lg border border-slate-200 group-hover:border-emerald-600">
                                            View Details <Info className="ml-2 h-3.5 w-3.5" />
                                        </Button>
                                        
                                        <div className="mt-auto space-y-2.5 border-t border-slate-100 pt-4">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-500">Annual Footfall</span>
                                                <span className="font-bold text-slate-900 tabular-nums">{formatPassengers(s.passengers_total)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-500">Pass. Earnings (Report)</span>
                                                <span className="font-bold text-blue-700 tabular-nums">₹{((s.passenger_earnings_footfall || 0) / 10000000).toFixed(2)} Cr</span>
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] opacity-70">
                                                <span className="text-slate-400">Total Earnings (Cat.)</span>
                                                <span className="font-medium text-emerald-800 tabular-nums">₹{((s.earnings_total || 0) / 10000000).toFixed(2)} Cr</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-50 mt-2">
                                                <span className="text-slate-500 flex items-center gap-1"><TrendingUp className="h-3 w-3 text-emerald-600" /> Monthly Reach</span>
                                                <span className="font-bold text-slate-900 tabular-nums">{formatPassengers(s.monthly)}</span>
                                            </div>
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
                    <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/60 backdrop-blur-xl shadow-2xl animate-fade-in mb-10">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-slate-100/50 backdrop-blur-md">
                                    <tr>
                                        <th className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 w-10">
                                            #
                                        </th>
                                        <th className={`${thClass} border-none`} onClick={() => handleSort("station")}>
                                            <span className="flex items-center text-slate-700">Station <SortIcon col="station" /></span>
                                        </th>
                                        <th className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                            Type
                                        </th>
                                        <th className={`${thClass} border-none`} onClick={() => handleSort("division")}>
                                            <span className="flex items-center text-slate-700">Division <SortIcon col="division" /></span>
                                        </th>
                                        <th className="px-4 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 w-12">
                                            PFs
                                        </th>
                                        <th className="px-4 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 w-12">
                                            ATM
                                        </th>
                                        <th className="px-4 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 w-12">
                                            Food
                                        </th>
                                        <th className="px-4 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 w-12">
                                            Lift
                                        </th>
                                        <th className="px-4 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 w-12">
                                            Info
                                        </th>
                                        <th className={`${thClass} border-none`} onClick={() => handleSort("passengers_total")}>
                                            <span className="flex items-center text-slate-700">Footfall <SortIcon col="passengers_total" /></span>
                                        </th>
                                        <th className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                            Pass. Earnings (Report)
                                        </th>
                                        <th className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 text-xs">
                                            Total Earnings (Cat.)
                                        </th>
                                        <th className={`${thClass} border-none`} onClick={() => handleSort("monthly")}>
                                            <span className="flex items-center text-slate-700">Monthly Reach <SortIcon col="monthly" /></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pagedRows.map((s, idx) => {
                                        const globalIdx = tablePage * PAGE_SIZE + idx + 1;
                                        return (
                                            <tr key={s.code} className="group hover:bg-emerald-50/50 transition-colors cursor-pointer" onClick={() => setSelectedStation(s)}>
                                                <td className="px-4 py-4 text-xs font-mono text-slate-400">
                                                    {globalIdx.toString().padStart(2, "0")}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div>
                                                        <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{s.station}</div>
                                                        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">{s.code}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-emerald-100 text-emerald-800 font-mono bg-emerald-50 uppercase tracking-tighter">
                                                        {s.present_category}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div>
                                                        <div className="text-sm font-semibold text-slate-700 uppercase tracking-tight">{s.division}</div>
                                                        <div className="text-[10px] text-slate-400">{s.state}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="text-sm font-bold text-slate-800 tabular-nums">{s.facilities?.platforms_count || "-"}</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="flex justify-center scale-90"><FacilityStatus exists={s.facilities?.atm_nos} /></div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="flex justify-center scale-90"><FacilityStatus exists={s.facilities?.food_plaza} /></div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="flex justify-center scale-90"><FacilityStatus exists={s.facilities?.disability_lifts_escalators} /></div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <button className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                                                        <Info className="h-4 w-4 mx-auto" />
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="font-bold text-slate-900 tabular-nums">
                                                        {formatPassengers(s.passengers_total)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="font-bold text-blue-700 tabular-nums">
                                                        ₹{((s.passenger_earnings_footfall || 0) / 10000000).toFixed(2)} Cr
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="font-semibold text-emerald-700 opacity-80 tabular-nums text-xs">
                                                        ₹{((s.earnings_total || 0) / 10000000).toFixed(2)} Cr
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 font-bold text-slate-900 tabular-nums">
                                                    {formatPassengers(s.monthly)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination footer */}
                        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-4 bg-slate-50/50 backdrop-blur-md">
                            <span className="text-xs text-slate-500 font-medium">
                                {sortedFiltered.length === 0 ? "0" : tablePage * PAGE_SIZE + 1}–{Math.min((tablePage + 1) * PAGE_SIZE, sortedFiltered.length)} of {sortedFiltered.length} stations
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setTablePage((p) => Math.max(0, p - 1))}
                                    disabled={tablePage === 0}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:bg-emerald-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="min-w-[100px] text-center text-xs font-bold text-slate-700">
                                    Page {tablePage + 1} of {Math.max(1, totalPages)}
                                </span>
                                <button
                                    onClick={() => setTablePage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={tablePage >= totalPages - 1}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:bg-emerald-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
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
