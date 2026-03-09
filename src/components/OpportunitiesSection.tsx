import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const opportunities = [
  {
    title: "Landscape Development",
    category: "Infrastructure",
    deadline: "Open",
    description: "Supply of track materials, sleepers, and maintenance services for NF Railway divisions.",
    status: "Active",
  },
  {
    title: "Station Modernisation Program",
    category: "Construction",
    deadline: "Mar 2026",
    description: "Redevelopment and modernisation of key stations across the Northeast under Amrit Bharat initiative.",
    status: "Upcoming",
  },
  {
    title: "Catering & Hospitality Services",
    category: "Services",
    deadline: "Open",
    description: "Licensing for on-board catering, waiting rooms, and food plaza operations at major stations.",
    status: "Active",
  },
  {
    title: "IT & Digital Solutions",
    category: "Technology",
    deadline: "Apr 2026",
    description: "Smart railway solutions, passenger information systems, surveillance, and ticketing upgrades.",
    status: "Upcoming",
  },
  {
    title: "Consultancy Services",
    category: "Services",
    deadline: "Open",
    description: "Expert consultancy for railway infrastructure, planning, and project management.",
    status: "Active",
  },
  {
    title: "Station Facility Management",
    category: "Services",
    deadline: "Open",
    description: "Manage and maintain station facilities including cleanliness, amenities, and passenger services.",
    status: "Active",
  },
  {
    title: "Advertisements",
    category: "Commercial",
    deadline: "Open",
    description: "Leverage high-footfall railway stations for impactful advertising and brand visibility campaigns.",
    status: "Active",
  },
  {
    title: "Premium Brand Stalls",
    category: "Commercial",
    deadline: "Open",
    description: "Set up premium retail stalls and kiosks at key railway stations to reach millions of travellers.",
    status: "Active",
  },
  {
    title: "Cab Aggregators",
    category: "Services",
    deadline: "Open",
    description: "Partner as a cab aggregator to provide seamless last-mile connectivity for railway passengers.",
    status: "Active",
  },
];

const statusColor: Record<string, string> = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Upcoming: "bg-gold/15 text-gold-dark border-gold/30",
};

const OpportunitiesSection = () => {
  return (
    <section id="opportunities" className="py-20 lg:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">Current Openings</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Business Opportunities
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore current and upcoming business opportunities with SETU-NFR across various sectors.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {opportunities.map((opp) => (
            <div
              key={opp.title}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-gold/40 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="secondary" className="font-medium">{opp.category}</Badge>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusColor[opp.status]}`}>
                  {opp.status}
                </span>
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-card-foreground">{opp.title}</h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">{opp.description}</p>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Deadline: {opp.deadline}
                </span>
                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-gold-dark">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
