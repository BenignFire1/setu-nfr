import {
    Megaphone,
    Users,
    ShoppingBag,
    Bus,
    Cpu,
    Building2,
    Briefcase,
    LucideIcon,
} from "lucide-react";

export type SubCategory = {
    name: string;
    items: string[];
};

export type OpportunityCategory = {
    id: string;
    title: string;
    icon: LucideIcon;
    tagline: string;
    description: string;
    color: string;       // tailwind bg class for icon bg
    iconColor: string;   // tailwind text class for icon
    borderColor: string; // tailwind border class on hover
    status: "Active" | "Upcoming";
    deadline: string;
    subCategories: SubCategory[];
    whoShouldApply: string;
    route: string;
};

export const opportunityCategories: OpportunityCategory[] = [
    {
        id: "advertising",
        title: "Advertising & Media",
        icon: Megaphone,
        tagline: "Brand visibility at scale",
        description:
            "Leverage 500+ NFR stations and high-footfall train routes for impactful advertising campaigns across the Northeast.",
        color: "bg-amber-50",
        iconColor: "text-amber-600",
        borderColor: "hover:border-amber-300",
        status: "Active",
        deadline: "Open",
        subCategories: [
            {
                name: "Train Media",
                items: [
                    "Train vinyl wrapping",
                    "Coach interior advertising",
                    "Seatback & food tray advertising",
                    "Headrest cover & loco branding",
                    "LED advertising inside trains",
                ],
            },
            {
                name: "Station Media",
                items: [
                    "Platform branding",
                    "Escalator & lift branding",
                    "Waiting hall advertising",
                    "Digital standees",
                    "Bench & signage advertising",
                ],
            },
            {
                name: "Outdoor (OOH)",
                items: [
                    "Hoardings on railway land",
                    "Bridge approach road advertising",
                    "Railway boundary wall advertising",
                    "Station forecourt advertising",
                ],
            },
            {
                name: "Digital & Audio",
                items: [
                    "Audio ads via station announcements",
                    "Interactive digital displays",
                    "LED advertising boards",
                    "Augmented reality mirrors",
                ],
            },
            {
                name: "Strategic Branding",
                items: [
                    "Station naming rights",
                    "Corporate station branding",
                    "Event sponsorship partnerships",
                ],
            },
        ],
        whoShouldApply:
            "Brands, media agencies, FMCG companies, telecom operators, educational institutions, and any business targeting the Northeast market.",
        route: "/opportunities/advertising",
    },
    {
        id: "passenger-services",
        title: "Passenger Services & Amenities",
        icon: Users,
        tagline: "Improving journeys for millions",
        description:
            "Provide services that improve passenger comfort, hygiene, and convenience at railway stations across the NFR zone.",
        color: "bg-blue-50",
        iconColor: "text-blue-600",
        borderColor: "hover:border-blue-300",
        status: "Active",
        deadline: "Open",
        subCategories: [
            {
                name: "Waiting & Rest Facilities",
                items: [
                    "AC paid waiting halls",
                    "Relaxation lounges",
                    "Massage chairs & sleeping pods",
                    "Premium waiting rooms",
                ],
            },
            {
                name: "Accommodation",
                items: ["Retiring rooms", "Station dormitories", "Railway guest houses"],
            },
            {
                name: "Hygiene Infrastructure",
                items: [
                    "Pay & Use toilets",
                    "Women powder rooms",
                    "Sanitary napkin vending machines",
                    "Plastic bottle crushing machines",
                ],
            },
            {
                name: "Passenger Assistance",
                items: [
                    "Battery operated carts",
                    "E-wheelchair services",
                    "Porter-on-call services",
                    "Luggage & trolley services",
                ],
            },
            {
                name: "Women & Family Facilities",
                items: ["Nursing pods", "Daycare centres", "Women hygiene facilities"],
            },
            {
                name: "Station Facility Management",
                items: [
                    "Station cleaning services",
                    "Amenity management",
                    "Operations management",
                ],
            },
        ],
        whoShouldApply:
            "Service companies, hospitality businesses, NGOs, SHGs, and startups focused on passenger welfare and station management.",
        route: "/opportunities/passenger-services",
    },
    {
        id: "retail",
        title: "Retail, Food & Commercial",
        icon: ShoppingBag,
        tagline: "Turn stations into destinations",
        description:
            "Transform railway stations into commercial retail hubs — from food courts and branded kiosks to shopping arcades.",
        color: "bg-green-50",
        iconColor: "text-green-600",
        borderColor: "hover:border-green-300",
        status: "Active",
        deadline: "Open",
        subCategories: [
            {
                name: "Food & Beverage",
                items: [
                    "Branded food outlets",
                    "Food courts & food vans",
                    "Rail coach restaurants",
                    "Beverage & water vending machines",
                ],
            },
            {
                name: "Catering & Hospitality",
                items: [
                    "On-board catering services",
                    "Station restaurants",
                    "Food plaza operations",
                    "Premium hospitality lounges",
                ],
            },
            {
                name: "Retail Stores",
                items: [
                    "Branded showrooms",
                    "Souvenir & grocery shops",
                    "Textile & herbal product stores",
                    "Pooja samagri counters",
                ],
            },
            {
                name: "Premium Brand Kiosks",
                items: [
                    "Electronics kiosks",
                    "Fashion brand kiosks",
                    "FMCG & telecom stalls",
                ],
            },
            {
                name: "Marketplaces & Zones",
                items: [
                    "Flea markets",
                    "Shopping arcades",
                    "Multi-brand retail complexes",
                    "Commercial retail corridors",
                ],
            },
        ],
        whoShouldApply:
            "Restaurant chains, food brands, retail franchises, FMCG companies, kiosk operators, and local entrepreneurs.",
        route: "/opportunities/retail",
    },
    {
        id: "mobility",
        title: "Mobility & Transport",
        icon: Bus,
        tagline: "Connect passengers beyond the station",
        description:
            "Integrate railway stations with modern urban mobility — from cab aggregators and EV charging to freight logistics.",
        color: "bg-purple-50",
        iconColor: "text-purple-600",
        borderColor: "hover:border-purple-300",
        status: "Active",
        deadline: "Open",
        subCategories: [
            {
                name: "Cab Aggregators",
                items: [
                    "Cab aggregator partnerships",
                    "Dedicated cab pickup zones",
                    "Ride-sharing integration",
                    "App-based cab booking systems",
                ],
            },
            {
                name: "First & Last Mile",
                items: [
                    "Bike rental services",
                    "Auto/taxi booking kiosks",
                    "Bus ticket kiosks & shuttles",
                ],
            },
            {
                name: "Parking Infrastructure",
                items: [
                    "Surface & multi-level parking",
                    "Smart parking management systems",
                ],
            },
            {
                name: "Electric Mobility",
                items: [
                    "EV charging stations",
                    "Battery swapping facilities",
                    "EV parking infrastructure",
                ],
            },
            {
                name: "Logistics & Freight",
                items: [
                    "Parcel scanning & packing",
                    "Freight loading/unloading",
                    "Goods yard warehousing",
                    "Wagon cleaning services",
                ],
            },
        ],
        whoShouldApply:
            "Cab aggregators, EV companies, logistics providers, freight forwarders, and last-mile mobility startups.",
        route: "/opportunities/mobility",
    },
    {
        id: "digital",
        title: "Digital & Smart Solutions",
        icon: Cpu,
        tagline: "Technology-driven railway modernisation",
        description:
            "Power the next generation of smart railway infrastructure with IoT, passenger apps, surveillance, and AR experiences.",
        color: "bg-cyan-50",
        iconColor: "text-cyan-600",
        borderColor: "hover:border-cyan-300",
        status: "Upcoming",
        deadline: "Apr 2026",
        subCategories: [
            {
                name: "Passenger Information",
                items: [
                    "Digital information boards",
                    "Real-time train information displays",
                    "Passenger guidance systems",
                ],
            },
            {
                name: "Ticketing & Digital Platforms",
                items: [
                    "Mobile ticketing applications",
                    "Integrated passenger apps",
                    "Digital travel platforms",
                ],
            },
            {
                name: "Smart Station Infrastructure",
                items: [
                    "CCTV surveillance systems",
                    "IoT-based monitoring",
                    "Smart kiosks & energy monitoring",
                ],
            },
            {
                name: "Digital Workspaces",
                items: [
                    "Co-working lounges",
                    "Digital business centres",
                    "Shared office spaces at stations",
                ],
            },
            {
                name: "Interactive Experiences",
                items: [
                    "Augmented reality installations",
                    "Smart interactive displays",
                    "Digital engagement zones",
                ],
            },
        ],
        whoShouldApply:
            "IT companies, tech startups, SaaS providers, surveillance and IoT solution providers, and digital platform companies.",
        route: "/opportunities/digital",
    },
    {
        id: "infrastructure",
        title: "Infrastructure Development",
        icon: Building2,
        tagline: "Build the railways of tomorrow",
        description:
            "Large-scale station redevelopment, track infrastructure supply, and urban development under EPC and PPP models.",
        color: "bg-orange-50",
        iconColor: "text-orange-600",
        borderColor: "hover:border-orange-300",
        status: "Active",
        deadline: "Open",
        subCategories: [
            {
                name: "Station Redevelopment",
                items: [
                    "Station redevelopment projects",
                    "Amrit Bharat station modernisation",
                    "Commercial station complexes",
                ],
            },
            {
                name: "Landscape & Urban Development",
                items: [
                    "Station landscaping",
                    "Riverfront development",
                    "Station campus beautification",
                ],
            },
            {
                name: "Track & Railway Infrastructure",
                items: [
                    "Supply of track materials",
                    "Railway sleepers supply",
                    "Track maintenance services",
                    "Rail infrastructure upgrades",
                ],
            },
        ],
        whoShouldApply:
            "EPC contractors, civil engineering firms, architecture and urban planning companies, and infrastructure developers.",
        route: "/opportunities/infrastructure",
    },
    {
        id: "consultancy",
        title: "Consultancy & Professional",
        icon: Briefcase,
        tagline: "Expert guidance for railway growth",
        description:
            "Provide professional advisory, engineering consultancy, and project management services to the Northeast Frontier Railway.",
        color: "bg-rose-50",
        iconColor: "text-rose-600",
        borderColor: "hover:border-rose-300",
        status: "Active",
        deadline: "Open",
        subCategories: [
            {
                name: "Engineering Consultancy",
                items: [
                    "Railway infrastructure design",
                    "Track engineering consultancy",
                    "Structural consultancy",
                ],
            },
            {
                name: "Project Management",
                items: [
                    "EPC project supervision",
                    "Construction management",
                    "Infrastructure project monitoring",
                ],
            },
            {
                name: "Strategy & Planning",
                items: [
                    "Transport planning consultancy",
                    "Station development planning",
                    "Railway operational planning",
                ],
            },
        ],
        whoShouldApply:
            "Management consultants, engineering advisory firms, transport planners, and project management professionals.",
        route: "/opportunities/consultancy",
    },
];
