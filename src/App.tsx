import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import JobListings from "./pages/JobListings";
import JobDetail from "./pages/JobDetail";
import SeekerDashboard from "./pages/SeekerDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPipeline from "./pages/admin/AdminPipeline";
import AdminRoles from "./pages/admin/AdminRoles";
import CompleteProfile from "./pages/CompleteProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/pipeline" element={<AdminPipeline />} />
            <Route path="/admin/roles" element={<AdminRoles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
