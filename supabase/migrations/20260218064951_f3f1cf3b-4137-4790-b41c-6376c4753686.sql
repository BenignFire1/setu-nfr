
-- Table for business onboarding applications
CREATE TABLE public.business_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for feedback/interest submissions
CREATE TABLE public.feedback_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organisation_name TEXT NOT NULL,
  email TEXT NOT NULL,
  areas_of_interest TEXT[] NOT NULL DEFAULT '{}',
  suggestions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public-facing forms)
CREATE POLICY "Anyone can submit a business application"
  ON public.business_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit feedback"
  ON public.feedback_submissions FOR INSERT
  WITH CHECK (true);

-- No public SELECT (admin only via SQL/dashboard)
CREATE POLICY "No public read access to applications"
  ON public.business_applications FOR SELECT
  USING (false);

CREATE POLICY "No public read access to feedback"
  ON public.feedback_submissions FOR SELECT
  USING (false);
