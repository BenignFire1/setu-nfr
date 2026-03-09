import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CarouselImage = {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
};

const ImageCarousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from("carousel_images")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (data && data.length > 0) setImages(data);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-dark">Gallery</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            SETU-NFR in Action
          </h2>
        </div>

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border shadow-lg">
          <div className="relative aspect-[16/9]">
            {images.map((img, i) => (
              <div
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={img.image_url}
                  alt={img.caption || "SETU-NFR Gallery"}
                  className="h-full w-full object-cover"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-sm font-medium text-white">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 w-2 rounded-full transition-all ${i === current ? "bg-gold w-6" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
