import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import railwaysLogo from "@/assets/indian-railways-logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="min-h-screen gradient-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm">
        <div className="text-center mb-6">
          <img src={railwaysLogo} alt="Indian Railways" className="mx-auto h-16 w-16 object-contain mb-3" />
          <h1 className="font-display text-2xl font-bold text-primary-foreground">SETU-NFR Admin</h1>
          <p className="text-sm text-primary-foreground/60 mt-1">Sign in to manage carousel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label className="text-primary-foreground/80">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
            />
          </div>
          <div>
            <Label className="text-primary-foreground/80">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gold text-secondary-foreground hover:bg-gold-dark font-semibold">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
