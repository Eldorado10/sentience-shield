import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Login | MindCare";
  }, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      toast({
        title: "Invalid input",
        description: firstError,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    navigate("/");
    setIsLoading(false);
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setIsLoading(true);

    // Try to sign in first
    let { error } = await supabase.auth.signInWithPassword({
      email: demoEmail,
      password: demoPassword,
    });

    if (error) {
      if (error.message?.toLowerCase().includes("invalid login credentials")) {
        // If user doesn't exist yet, create it and then sign in
        const redirectUrl = `${window.location.origin}/`;
        const { error: signUpError } = await supabase.auth.signUp({
          email: demoEmail,
          password: demoPassword,
          options: { emailRedirectTo: redirectUrl },
        });

        // If already registered or duplicate key error, continue to login retry; otherwise handle real errors
        if (signUpError && 
            !signUpError.message.toLowerCase().includes("already registered") &&
            !signUpError.message.toLowerCase().includes("duplicate key")) {
          toast({
            title: "Demo Setup Failed",
            description: signUpError.message,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const retry = await supabase.auth.signInWithPassword({
          email: demoEmail,
          password: demoPassword,
        });

        if (retry.error) {
          toast({
            title: "Login Failed",
            description: retry.error.message,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      } else {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    // Optional: attempt to ensure role for demo users (ignore failures silently)
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user;
      if (user) {
        const role = demoEmail.includes("admin") ? "admin" : "data_scientist";
        // Attempt insert; ignore if table doesn't exist or role already set
        await supabase
          .from("user_roles")
          .insert({ user_id: user.id, role })
          .select()
          .single();
      }
    } catch (_) {}

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to MindCare</CardTitle>
          <CardDescription>Sign in to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleDemoLogin("admin@mindcare.com", "admin123")}
                disabled={isLoading}
              >
                Login as Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleDemoLogin("scientist@mindcare.com", "scientist123")}
                disabled={isLoading}
              >
                Login as Data Scientist
              </Button>
            </div>

            <div className="mt-4 text-sm text-muted-foreground text-center">
              <p className="font-medium">Demo Credentials:</p>
              <p>Admin: admin@mindcare.com / admin123</p>
              <p>Data Scientist: scientist@mindcare.com / scientist123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
