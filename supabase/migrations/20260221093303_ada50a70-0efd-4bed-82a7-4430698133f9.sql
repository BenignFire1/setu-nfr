
-- Create carousel_images table
CREATE TABLE public.carousel_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.carousel_images ENABLE ROW LEVEL SECURITY;

-- Public can view active carousel images
CREATE POLICY "Anyone can view active carousel images"
ON public.carousel_images
FOR SELECT
USING (is_active = true);

-- Create storage bucket for carousel images
INSERT INTO storage.buckets (id, name, public) VALUES ('carousel-images', 'carousel-images', true);

-- Public can view carousel images
CREATE POLICY "Anyone can view carousel images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'carousel-images');

-- Authenticated users can upload carousel images
CREATE POLICY "Authenticated users can upload carousel images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'carousel-images' AND auth.role() = 'authenticated');

-- Authenticated users can delete carousel images
CREATE POLICY "Authenticated users can delete carousel images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'carousel-images' AND auth.role() = 'authenticated');

-- Admin policies for carousel_images table (authenticated users can manage)
CREATE POLICY "Authenticated users can insert carousel images"
ON public.carousel_images
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update carousel images"
ON public.carousel_images
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete carousel images"
ON public.carousel_images
FOR DELETE
USING (auth.role() = 'authenticated');
