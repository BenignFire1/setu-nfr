
-- Add new columns to business_applications
ALTER TABLE public.business_applications
ADD COLUMN worked_with_railways boolean DEFAULT false,
ADD COLUMN railway_experience text,
ADD COLUMN proposal_url text;

-- Create storage bucket for proposals
INSERT INTO storage.buckets (id, name, public) VALUES ('proposals', 'proposals', true);

-- Allow anyone to upload proposals
CREATE POLICY "Anyone can upload proposals"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'proposals');

-- Allow anyone to read proposals
CREATE POLICY "Anyone can read proposals"
ON storage.objects FOR SELECT
USING (bucket_id = 'proposals');
