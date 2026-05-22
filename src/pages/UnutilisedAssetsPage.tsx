import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    ChevronRight,
    Search,
    Activity,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import rawData from "@/data/unutilised_assets.json";

type AssetData = {
    slNo: number;
    category: string;
    assetId: string;
    idleSince: string;
    auctionsConducted: number;
    bidsReceived: number;
    lastAuctionDate: string;
};

type SortColumn = "slNo" | "category" | "assetId" | "auctionsConducted" | "bidsReceived";

const assetsData = rawData as Record<string, AssetData[]>;
const divisions = Object.keys(assetsData);

// Build list of unique top-level category groups (e.g. "ATM", "Advertising", "Catering")
function getMainCategory(cat: string): string {
    if (!cat) return "Other";
    const part = cat.split(" - ")[0].trim();
    return part;
}

const allCategoryGroups = (): string[] => {
    const set = new Set<string>();
    divisions.forEach((div) => {
        (assetsData[div] || []).forEach((item) => {
            set.add(getMainCategory(item.category));
        });
    });
    return ["All", ...Array.from(set).sort()];
};

const CATEGORY_GROUPS = allCategoryGroups();

const UnutilisedAssetsPage = () => {
    const [activeDiv, setActiveDiv] = useState(divisions[0] || "");
    const [activeCatGroup, setActiveCatGroup] = useState("All");
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState<SortColumn>("slNo");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const currentDivData: AssetData[] = assetsData[activeDiv] || [];

    const filteredData = useMemo(() => {
        let data = currentDivData;

        if (activeCatGroup !== "All") {
            data = data.filter((item) => getMainCategory(item.category) === activeCatGroup);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            data = data.filter(
                (item) =>
                    item.category?.toLowerCase().includes(q) ||
                    item.assetId?.toLowerCase().includes(q)
            );
        }

        return [...data].sort((a, b) => {
            let cmp = 0;
            if (sortColumn === "category") cmp = (a.category || "").localeCompare(b.category || "");
            else if (sortColumn === "assetId") cmp = (a.assetId || "").localeCompare(b.assetId || "");
            else if (sortColumn === "auctionsConducted") cmp = (a.auctionsConducted || 0) - (b.auctionsConducted || 0);
            else if (sortColumn === "bidsReceived") cmp = (a.bidsReceived || 0) - (b.bidsReceived || 0);
            else cmp = a.slNo - b.slNo;
            return sortDir === "asc" ? cmp : -cmp;
        });
    }, [currentDivData, activeCatGroup, search, sortColumn, sortDir]);

    const handleSort = (col: SortColumn) => {
        if (sortColumn === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else { setSortColumn(col); setSortDir("asc"); }
    };

    const SortIcon = ({ col }: { col: SortColumn }) => {
        if (sortColumn !== col) return <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground/50 inline-block" />;
        return sortDir === "asc"
            ? <ArrowUp className="ml-1 h-3 w-3 text-primary inline-block" />
            : <ArrowDown className="ml-1 h-3 w-3 text-primary inline-block" />;
    };

    const thClass = "cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* HERO */}
            <section className="relative pt-16 overflow-hidden">
                <div className="gradient-navy">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                    <div className="section-container relative py-16 lg:py-24">
                        <nav className="mb-8 flex items-center gap-2 text-sm text-primary-foreground/50">
                            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <Link to="/opportunities" className="hover:text-gold transition-colors">Opportunities</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-gold">Unutilised Assets</span>
                        </nav>
                        <div className="max-w-2xl animate-fade-up">
                            <div className="mb-5 flex items-center gap-4">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
                                    <Activity className="h-8 w-8 text-slate-600" />
                                </div>
                                <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-green-100 text-green-800 border-green-200">
                                    Active
                                </span>
                            </div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
                                Re-activate dormant assets
                            </p>
                            <h1 className="mb-4 font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
                                Unutilised Assets
                            </h1>
                            <p className="text-lg leading-relaxed text-primary-foreground/70">
                                Explore idle railway assets across all divisions — ATMs, advertising spaces, catering units and more — available for lease and revival.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FILTERS + TABLE */}
            <section className="py-12 flex-grow">
                <div className="section-container space-y-6">

                    {/* Step 1: Category Group buttons */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                            Filter by Asset Type
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORY_GROUPS.map((grp) => (
                                <button
                                    key={grp}
                                    onClick={() => setActiveCatGroup(grp)}
                                    className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                                        activeCatGroup === grp
                                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                            : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
                                    }`}
                                >
                                    {grp}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Division tabs + search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <Tabs value={activeDiv} onValueChange={setActiveDiv}>
                            <TabsList className="bg-slate-100/50 p-1 flex-wrap h-auto">
                                {divisions.map((div) => (
                                    <TabsTrigger key={div} value={div} className="px-4 py-2 font-semibold text-sm">
                                        {div} Div
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search asset ID or category…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Results summary */}
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{filteredData.length}</span> assets
                        {activeCatGroup !== "All" && <> in <span className="font-semibold text-foreground">{activeCatGroup}</span></>}
                        {" "}— <span className="font-semibold text-foreground">{activeDiv} Division</span>
                    </p>

                    {/* Table */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className={thClass} onClick={() => handleSort("slNo")}>
                                            <span className="flex items-center">#<SortIcon col="slNo" /></span>
                                        </TableHead>
                                        <TableHead className={thClass} onClick={() => handleSort("category")}>
                                            <span className="flex items-center">Category<SortIcon col="category" /></span>
                                        </TableHead>
                                        <TableHead className={thClass} onClick={() => handleSort("assetId")}>
                                            <span className="flex items-center">Asset IREPS ID<SortIcon col="assetId" /></span>
                                        </TableHead>
                                        <TableHead className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                                            Idle Since
                                        </TableHead>
                                        <TableHead className={thClass} onClick={() => handleSort("auctionsConducted")}>
                                            <span className="flex items-center">Auctions<SortIcon col="auctionsConducted" /></span>
                                        </TableHead>
                                        <TableHead className={thClass} onClick={() => handleSort("bidsReceived")}>
                                            <span className="flex items-center">Bids<SortIcon col="bidsReceived" /></span>
                                        </TableHead>
                                        <TableHead className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                                            Last Auction
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, idx) => (
                                            <TableRow key={`${item.assetId}-${idx}`} className="hover:bg-slate-50/60 transition-colors">
                                                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{item.slNo}</TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div>
                                                        <span className="font-semibold text-foreground text-sm">
                                                            {getMainCategory(item.category)}
                                                        </span>
                                                        {item.category.includes(" - ") && (
                                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                                {item.category.split(" - ").slice(1).join(" - ")}
                                                            </p>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <Badge variant="outline" className="font-mono text-xs bg-slate-50">{item.assetId}</Badge>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{item.idleSince}</TableCell>
                                                <TableCell className="px-4 py-3 text-center">
                                                    <span className="inline-flex items-center justify-center rounded-full bg-slate-100 h-6 min-w-6 px-1.5 text-xs font-semibold text-slate-700">
                                                        {item.auctionsConducted ?? 0}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-center">
                                                    <span className={`inline-flex items-center justify-center rounded-full h-6 min-w-6 px-1.5 text-xs font-semibold ${(item.bidsReceived ?? 0) > 0 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}`}>
                                                        {item.bidsReceived ?? 0}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{item.lastAuctionDate}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                                No assets found for the selected filters.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default UnutilisedAssetsPage;
