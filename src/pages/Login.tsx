import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatingDemo, setCreatingDemo] = useState(false);
  const navigate = useNavigate();

  const createDemoUsers = async () => {
    setCreatingDemo(true);
    try {
      // Create admin user
      const { data: adminData, error: adminError } = await supabase.auth.signUp({
        email: "admin@mindcare.com",
        password: "admin123",
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: "Admin User"
          }
        }
      });

      if (adminError && !adminError.message.includes("already registered")) {
        throw adminError;
      }

      // Create data scientist user
      const { data: scientistData, error: scientistError } = await supabase.auth.signUp({
        email: "scientist@mindcare.com",
        password: "scientist123",
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: "Data Scientist"
          }
        }
      });

      if (scientistError && !scientistError.message.includes("already registered")) {
        throw scientistError;
      }

      // Assign roles using admin privileges
      if (adminData?.user) {
        await supabase.from("user_roles").upsert({
          user_id: adminData.user.id,
          role: "admin"
        }, { onConflict: "user_id,role" });
      }

      if (scientistData?.user) {
        await supabase.from("user_roles").upsert({
          user_id: scientistData.user.id,
          role: "data_scientist"
        }, { onConflict: "user_id,role" });
      }

      toast.success("Demo users created successfully! You can now login.");
    } catch (error: any) {
      if (error.message.includes("already registered")) {
        toast.info("Demo users already exist. You can login now.");
      } else {
        toast.error(error.message || "Failed to create demo users");
      }
    } finally {
      setCreatingDemo(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check user role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .single();

        toast.success("Login successful!");
        
        // Redirect based on role
        if (roleData?.role === "data_scientist") {
          navigate("/recommendations");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">MindCare Admin</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@mindcare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Demo Credentials:</p>
              <div className="text-xs space-y-1">
                <p><strong>Admin:</strong> admin@mindcare.com / admin123</p>
                <p><strong>Data Scientist:</strong> scientist@mindcare.com / scientist123</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={createDemoUsers}
              disabled={creatingDemo}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {creatingDemo ? "Creating..." : "Create Demo Users"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
