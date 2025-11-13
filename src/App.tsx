import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Index from "./pages/Index";
import MoodLogging from "./pages/MoodLogging";
import AIAnalysis from "./pages/AIAnalysis";
import Recommendations from "./pages/Recommendations";
import Counselors from "./pages/Counselors";
import Sessions from "./pages/Sessions";
import Crisis from "./pages/Crisis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Index /></DashboardLayout>} />
          <Route path="/mood-logging" element={<DashboardLayout><MoodLogging /></DashboardLayout>} />
          <Route path="/ai-analysis" element={<DashboardLayout><AIAnalysis /></DashboardLayout>} />
          <Route path="/recommendations" element={<DashboardLayout><Recommendations /></DashboardLayout>} />
          <Route path="/counselors" element={<DashboardLayout><Counselors /></DashboardLayout>} />
          <Route path="/sessions" element={<DashboardLayout><Sessions /></DashboardLayout>} />
          <Route path="/crisis" element={<DashboardLayout><Crisis /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
