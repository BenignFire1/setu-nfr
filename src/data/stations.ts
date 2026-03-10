import rawData from "./station_categories_2023_24.json";

export type Station = {
    sr_no: string;
    station: string;
    zone: string;
    code: string;
    division: string;
    state: string;
    present_category: string;
    nsg_group: string;           // internal use only — never display to users
    passengers_reserved: number | null;
    passengers_unreserved: number | null;
    passengers_total: number;
    earnings_reserved: number | null;
    earnings_unreserved: number | null;
    earnings_total: number;
    proposed_category: string;   // internal use only
};

// Capitalise state names for display (source JSON is all-caps)
function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

export const stations: Station[] = (rawData as Station[]).map((s) => ({
    ...s,
    state: toTitleCase(s.state),
    station: s.station.trim(),
}));

// All unique states for filter UI
export const ALL_STATES: string[] = [
    ...new Set(stations.map((s) => s.state)),
].sort();

// All unique divisions for filter UI
export const ALL_DIVISIONS: string[] = [
    ...new Set(stations.map((s) => s.division)),
].sort();
