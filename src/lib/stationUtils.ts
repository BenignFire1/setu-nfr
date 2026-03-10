// ─── Plain-English Reach Tier ─────────────────────────────────────────────
// NSG categories are internal only — never exposed to UI
export type ReachTier = "City Hub" | "Major Station" | "District Station" | "Local Market";

export function getReachTier(passengersTotal: number): ReachTier {
    if (passengersTotal >= 4_000_000) return "City Hub";
    if (passengersTotal >= 1_000_000) return "Major Station";
    if (passengersTotal >= 200_000) return "District Station";
    return "Local Market";
}

export const REACH_TIER_META: Record<
    ReachTier,
    { color: string; bg: string; border: string; description: string; badgeBg: string }
> = {
    "City Hub": {
        color: "text-green-700",
        bg: "bg-green-50",
        border: "border-green-200",
        badgeBg: "bg-green-100 text-green-800 border-green-200",
        description: "Best for national brand campaigns",
    },
    "Major Station": {
        color: "text-blue-700",
        bg: "bg-blue-50",
        border: "border-blue-200",
        badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
        description: "Ideal for regional campaigns",
    },
    "District Station": {
        color: "text-amber-700",
        bg: "bg-amber-50",
        border: "border-amber-200",
        badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
        description: "Great for state-level campaigns",
    },
    "Local Market": {
        color: "text-gray-600",
        bg: "bg-gray-50",
        border: "border-gray-200",
        badgeBg: "bg-gray-100 text-gray-700 border-gray-200",
        description: "Perfect for local businesses",
    },
};

// ─── Monthly impressions estimate ─────────────────────────────────────────
export function getMonthlyImpressions(passengersTotal: number): number {
    return Math.round(passengersTotal / 12);
}

export function formatPassengers(n: number): string {
    if (n >= 10_000_000) return `${(n / 10_000_000).toFixed(1)} Cr`;
    if (n >= 100_000) return `${(n / 100_000).toFixed(1)}L`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return `${n}`;
}

// ─── Ad formats by reach tier (plain English, no NSG) ────────────────────
export const AD_FORMATS_BY_TIER: Record<ReachTier, string[]> = {
    "City Hub": [
        "Platform Branding",
        "LED Digital Screens",
        "Escalator Branding",
        "Train Vinyl Wrap",
        "Large Hoardings",
        "Waiting Hall Displays",
        "Audio Announcements",
        "Interactive Digital Displays",
    ],
    "Major Station": [
        "Platform Branding",
        "Waiting Hall Displays",
        "Digital Standees",
        "Train Interior Advertising",
        "Hoardings",
    ],
    "District Station": [
        "Platform Displays",
        "Hoardings",
        "Waiting Hall Advertising",
    ],
    "Local Market": [
        "Hoardings",
        "Platform Displays",
    ],
};

// ─── Maximum passengers in NFR for progress bar scaling ─────────────────
export const MAX_PASSENGERS = 6_930_846; // Guwahati
