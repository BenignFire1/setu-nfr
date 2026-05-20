import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Building2, CheckCircle2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const categories = [
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
  "Start Ups",
  "SHG/NGO",
];

const OnboardForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [workedWithRailways, setWorkedWithRailways] = useState("no");
  const [proposalFile, setProposalFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    let proposalUrl: string | null = null;

    if (proposalFile) {
      const fileName = `${Date.now()}-${proposalFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("proposals")
        .upload(fileName, proposalFile);
      if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError);
        toast.error(`Failed to upload proposal: ${uploadError.message || 'Unknown error'}`);
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("proposals").getPublicUrl(fileName);
      proposalUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from("business_applications").insert({
      business_name: formData.get("business_name") as string,
      contact_person: formData.get("contact_person") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      business_category: category,
      description: (formData.get("description") as string) || null,
      worked_with_railways: workedWithRailways === "yes",
      railway_experience: workedWithRailways === "yes" ? (formData.get("railway_experience") as string) || null : null,
      proposal_url: proposalUrl,
    });

    setLoading(false);
    if (error) {
      console.error("Supabase Database Insert Error:", error);
      toast.error(`Submission failed: ${error.message || 'Unknown error'}`);
      return;
    }
    setSubmitted(true);
    toast.success("Application submitted successfully! We will contact you soon.");
  };

  if (submitted) {
    return (
      <section id="onboard" className="gradient-navy py-20 lg:py-28">
        <div className="section-container">
          <div className="mx-auto max-w-lg text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-foreground">Application Received!</h2>
            <p className="mt-4 text-primary-foreground/70">
              Thank you for your interest in partnering with SETU-NFR. Our team will review your application and get back to you within 5-7 business days.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-gold text-secondary-foreground hover:bg-gold-dark"
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const inputClasses = "mt-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40";

  return (
    <section id="onboard" className="gradient-navy py-20 lg:py-28">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">Business Onboarding</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
              Register Your Business with SETU-NFR
            </h2>
            <p className="mt-4 text-primary-foreground/70 leading-relaxed">
              Whether you're a manufacturer, contractor, service provider, or consultant — 
              we invite you to register your interest in partnering with Northeast Frontier Railway through SETU-NFR. 
              Our team will evaluate your profile and connect you with relevant opportunities.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Access to railway tenders & procurement",
                "Priority updates on new opportunities",
                "Direct communication with BDU team",
                "Support for MSME and startup enterprises",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold" />
                  <span className="text-sm text-primary-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gold" />
              <h3 className="font-display text-lg font-semibold text-primary-foreground">Business Registration</h3>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-primary-foreground/80">Business Name *</Label>
                  <Input name="business_name" required placeholder="Your company name" className={inputClasses} />
                </div>
                <div>
                  <Label className="text-primary-foreground/80">Contact Person *</Label>
                  <Input name="contact_person" required placeholder="Full name" className={inputClasses} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-primary-foreground/80">Email *</Label>
                  <Input name="email" required type="email" placeholder="you@company.com" className={inputClasses} />
                </div>
                <div>
                  <Label className="text-primary-foreground/80">Phone *</Label>
                  <Input name="phone" required placeholder="+91 XXXXX XXXXX" className={inputClasses} />
                </div>
              </div>

              <div>
                <Label className="text-primary-foreground/80">Business Category *</Label>
                <Select required onValueChange={setCategory}>
                  <SelectTrigger className={`mt-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-primary-foreground/80">Have you worked with Railways before? *</Label>
                <RadioGroup
                  value={workedWithRailways}
                  onValueChange={setWorkedWithRailways}
                  className="mt-2 flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="railways-yes" className="border-primary-foreground/40 text-gold" />
                    <Label htmlFor="railways-yes" className="text-primary-foreground/80 cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="railways-no" className="border-primary-foreground/40 text-gold" />
                    <Label htmlFor="railways-no" className="text-primary-foreground/80 cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
                {workedWithRailways === "yes" && (
                  <Textarea
                    name="railway_experience"
                    placeholder="Please mention where and what work you did with Railways..."
                    className={`${inputClasses} mt-2 min-h-[80px]`}
                  />
                )}
              </div>

              <div>
                <Label className="text-primary-foreground/80">Attach Proposal (PDF)</Label>
                <label className={`mt-1 flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-primary-foreground/30 bg-primary-foreground/5 p-3 transition-colors hover:border-gold/50 ${proposalFile ? "border-gold/60" : ""}`}>
                  <Upload className="h-4 w-4 text-primary-foreground/50" />
                  <span className="text-sm text-primary-foreground/60">
                    {proposalFile ? proposalFile.name : "Click to upload PDF"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setProposalFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <div>
                <Label className="text-primary-foreground/80">Brief Description</Label>
                <Textarea
                  name="description"
                  placeholder="Tell us about your business and how you'd like to work with SETU-NFR..."
                  className={`${inputClasses} min-h-[100px]`}
                />
              </div>

              <Button type="submit" size="lg" disabled={loading} className="w-full bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold text-base">
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OnboardForm;
