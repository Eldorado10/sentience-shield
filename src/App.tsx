import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { useAuth } from "./hooks/useAuth";
import Index from "./pages/Index";
import MoodLogging from "./pages/MoodLogging";
import AIAnalysis from "./pages/AIAnalysis";
import Recommendations from "./pages/Recommendations";
import Counselors from "./pages/Counselors";
import Sessions from "./pages/Sessions";
import Crisis from "./pages/Crisis";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><DashboardLayout><Index /></DashboardLayout></ProtectedRoute>} />
          <Route path="/mood-logging" element={<ProtectedRoute><DashboardLayout><MoodLogging /></DashboardLayout></ProtectedRoute>} />
          <Route path="/ai-analysis" element={<ProtectedRoute><DashboardLayout><AIAnalysis /></DashboardLayout></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><DashboardLayout><Recommendations /></DashboardLayout></ProtectedRoute>} />
          <Route path="/counselors" element={<ProtectedRoute><DashboardLayout><Counselors /></DashboardLayout></ProtectedRoute>} />
          <Route path="/sessions" element={<ProtectedRoute><DashboardLayout><Sessions /></DashboardLayout></ProtectedRoute>} />
          <Route path="/crisis" element={<ProtectedRoute><DashboardLayout><Crisis /></DashboardLayout></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
