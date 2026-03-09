import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const interests = [
  "Passenger Amenities",
  "Advertisement",
  "Good Shed Terminal Management",
  "Warehousing",
  "Freight Logistics",
  "Parcel Logistics",
  "Container Goods",
  "Freight Forwarders",
  "Facility Management",
  "PPP Project",
  "Catering",
  "Premium Brand Retail",
  "Tourism & Hospitality",
  "IT & Digital Services",
  "Cleanliness & Sustainability",
  "Innovations",
  "Consultancy",
  "Station Redevelopment",
];

const FeedbackSection = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [otherInterest, setOtherInterest] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const allInterests = otherInterest.trim()
      ? [...selectedInterests, otherInterest.trim()]
      : selectedInterests;

    const { error } = await supabase.from("feedback_submissions").insert({
      organisation_name: formData.get("organisation_name") as string,
      email: formData.get("email") as string,
      areas_of_interest: allInterests,
      suggestions: (formData.get("suggestions") as string) || null,
    });

    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setSelectedInterests([]);
    setOtherInterest("");
    e.currentTarget.reset();
    toast.success("Thank you for sharing your interests! We appreciate your input.");
  };

  return (
    <section id="feedback" className="bg-surface-warm py-20 lg:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">Railway Seeks Your Input</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Share Your Business Interests
            </h2>
            <p className="mt-4 text-muted-foreground">
              SETU-NFR invites businesses to share their areas of interest and expertise. 
              Your inputs help us shape better partnership opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gold-dark" />
              <h3 className="font-display text-lg font-semibold text-card-foreground">Interest & Feedback Form</h3>
            </div>

            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Organisation Name *</Label>
                  <Input name="organisation_name" required placeholder="Your organisation" className="mt-1" />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input name="email" required type="email" placeholder="contact@organisation.com" className="mt-1" />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Areas of Interest *</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {interests.map((interest) => (
                    <label
                      key={interest}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-all ${
                        selectedInterests.includes(interest)
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-gold/40"
                      }`}
                    >
                      <Checkbox
                        checked={selectedInterests.includes(interest)}
                        onCheckedChange={() => toggleInterest(interest)}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <Label className="text-sm text-muted-foreground">Others (specify)</Label>
                  <Input
                    value={otherInterest}
                    onChange={(e) => setOtherInterest(e.target.value)}
                    placeholder="Type your area of interest..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Your Suggestions or Feedback</Label>
                <Textarea
                  name="suggestions"
                  placeholder="Share your ideas, suggestions, or specific areas where you can contribute..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <Button type="submit" size="lg" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-navy-light font-semibold text-base">
                {loading ? "Submitting..." : "Submit Feedback"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
