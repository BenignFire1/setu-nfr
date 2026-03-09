import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Trash2, LogOut, GripVertical } from "lucide-react";
import railwaysLogo from "@/assets/indian-railways-logo.png";

type CarouselImage = {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

const AdminPanel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate("/admin-login");
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/admin-login");
    });

    fetchImages();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("carousel_images")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setImages(data);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("carousel-images")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("carousel-images").getPublicUrl(fileName);

    const maxOrder = images.length > 0 ? Math.max(...images.map((i) => i.display_order)) + 1 : 0;

    const { error } = await supabase.from("carousel_images").insert({
      image_url: urlData.publicUrl,
      caption: caption || null,
      display_order: maxOrder,
    });

    setUploading(false);
    if (error) {
      toast.error("Failed to save image");
      return;
    }
    setCaption("");
    toast.success("Image added to carousel!");
    fetchImages();
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      await supabase.storage.from("carousel-images").remove([fileName]);
    }
    await supabase.from("carousel_images").delete().eq("id", id);
    toast.success("Image removed");
    fetchImages();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-navy border-b border-navy-light/30">
        <div className="section-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={railwaysLogo} alt="Indian Railways" className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-bold text-primary-foreground">SETU-NFR Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-primary-foreground/70 hover:text-gold">
              <a href="/">← Back to Site</a>
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground/70 hover:text-gold gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="section-container py-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Manage Carousel Images</h1>

        {/* Upload Section */}
        <div className="mb-10 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Add New Image</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Caption (optional)</Label>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Image caption..."
                className="mt-1"
              />
            </div>
            <div>
              <Label>Image File</Label>
              <label className="mt-1 flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-background p-3 hover:border-gold/50 transition-colors">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {uploading ? "Uploading..." : "Click to upload image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl border border-border bg-card overflow-hidden">
              <div className="aspect-video">
                <img src={img.image_url} alt={img.caption || "Carousel"} className="h-full w-full object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-sm text-card-foreground truncate flex-1">
                  {img.caption || "No caption"}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(img.id, img.image_url)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No carousel images yet. Upload your first image above.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
