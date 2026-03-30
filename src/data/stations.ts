import rawData from "./merged_stations.json";

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
    passenger_earnings_footfall?: number;
    proposed_category: string;   // internal use only
    facilities?: {
        electrified: boolean;
        food_plaza: boolean;
        cloak_room: boolean;
        atm_nos: number;
        station_clock: boolean;
        booking_windows: number;
        enquiry_counters: number;
        pas: boolean; // Public Address System
        adarsh: boolean;
        mfc: boolean;
        tourist_center: boolean;
        train_board: boolean;
        touch_screen: boolean;
        passengers_day: number;
        waiting_hall_area: number;
        retiring_rooms: number;
        dormitory_beds: number;
        refreshment_room: number;
        fobs: number;
        subways: number;
        second_entry: boolean;
        parking_area_sqm: number;
        parking_earmarked: boolean;
        disability_wheelchair: boolean;
        disability_stretcher: boolean;
        disability_ramp: boolean;
        disability_parking: boolean;
        disability_toilet: boolean;
        disability_lifts_escalators: boolean;
        platform_shelter: number;
        platform_taps: number;
        platform_lavatories: number;
        platform_urinals: number;
        platform_seats: number;
        platforms_count: number;
    };
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
].filter(Boolean).sort();

// All unique divisions for filter UI
export const ALL_DIVISIONS: string[] = [
    ...new Set(stations.map((s) => s.division)),
].filter(Boolean).sort();

// All unique categories for filter UI
export const ALL_CATEGORIES: string[] = [
    ...new Set(stations.map((s) => s.present_category)),
].filter(Boolean).sort();
