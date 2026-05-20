-- 1. Create Table for business onboarding applications
CREATE TABLE public.business_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  worked_with_railways boolean DEFAULT false,
  railway_experience text,
  proposal_url text
);

-- 2. Create Table for feedback/interest submissions
CREATE TABLE public.feedback_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organisation_name TEXT NOT NULL,
  email TEXT NOT NULL,
  areas_of_interest TEXT[] NOT NULL DEFAULT '{}',
  suggestions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Enable RLS for forms
ALTER TABLE public.business_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Policies for public forms
CREATE POLICY "Anyone can submit a business application"
  ON public.business_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit feedback"
  ON public.feedback_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "No public read access to applications"
  ON public.business_applications FOR SELECT
  USING (false);

CREATE POLICY "No public read access to feedback"
  ON public.feedback_submissions FOR SELECT
  USING (false);

-- 5. Create storage bucket for proposals
INSERT INTO storage.buckets (id, name, public) VALUES ('proposals', 'proposals', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Allow anyone to upload proposals
CREATE POLICY "Anyone can upload proposals"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'proposals');

-- 7. Allow anyone to read proposals
CREATE POLICY "Anyone can read proposals"
ON storage.objects FOR SELECT
USING (bucket_id = 'proposals');

-- 8. Create carousel_images table
CREATE TABLE public.carousel_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Enable RLS for carousel_images
ALTER TABLE public.carousel_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active carousel images"
ON public.carousel_images FOR SELECT
USING (is_active = true);

-- 10. Create storage bucket for carousel images
INSERT INTO storage.buckets (id, name, public) VALUES ('carousel-images', 'carousel-images', true)
ON CONFLICT (id) DO NOTHING;

-- 11. Policies for carousel images
CREATE POLICY "Anyone can view carousel images"
ON storage.objects FOR SELECT
USING (bucket_id = 'carousel-images');

CREATE POLICY "Authenticated users can upload carousel images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'carousel-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete carousel images"
ON storage.objects FOR DELETE
USING (bucket_id = 'carousel-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert carousel images"
ON public.carousel_images FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update carousel images"
ON public.carousel_images FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete carousel images"
ON public.carousel_images FOR DELETE
USING (auth.role() = 'authenticated');
