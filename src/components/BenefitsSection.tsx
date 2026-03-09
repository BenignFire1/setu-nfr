import { Shield, TrendingUp, Handshake, MapPin, Truck, Award } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Massive Growth Potential",
    description: "Access railway projects worth thousands of crores across India's fastest-growing Northeast region.",
  },
  {
    icon: Handshake,
    title: "Transparent Partnerships",
    description: "Fair and open bidding processes with clear guidelines for all business partners.",
  },
  {
    icon: MapPin,
    title: "10-State Reach",
    description: "Operate across Assam, West Bengal, Bihar, Arunachal Pradesh, Nagaland, Tripura, Manipur & Meghalaya.",
  },
  {
    icon: Truck,
    title: "Supply Chain Access",
    description: "Become a preferred vendor for materials, equipment, and services across the railway network.",
  },
  {
    icon: Shield,
    title: "Government Backed",
    description: "Partner with a trusted Indian Railways zone backed by the Ministry of Railways.",
  },
  {
    icon: Award,
    title: "MSME Friendly",
    description: "Special provisions and support for Micro, Small & Medium Enterprises in the region.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="bg-surface-warm py-20 lg:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">Why Partner With Us</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Benefits of Partnering via SETU-NFR
          </h2>
          <p className="mt-4 text-muted-foreground">
            SETU-NFR offers unparalleled opportunities for businesses looking to grow with India's Northeast railway network.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <b.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">{b.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
