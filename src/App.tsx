import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout><Index /></DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/mood-logging" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout><MoodLogging /></DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/ai-analysis" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout><AIAnalysis /></DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/counselors" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout><Counselors /></DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/sessions" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout><Sessions /></DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/crisis" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout><Crisis /></DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/recommendations" element={
              <ProtectedRoute allowedRoles={["data_scientist"]}>
                <DashboardLayout><Recommendations /></DashboardLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
