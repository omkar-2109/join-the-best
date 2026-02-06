import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JobListings from "./pages/JobListings";
import JobDetail from "./pages/JobDetail";
import CandidateProfile from "./pages/CandidateProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Companies from "./pages/Companies";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ATS from "./pages/ATS";
import SeekerDashboard from "./pages/SeekerDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/ats" element={<ATS />} />
          <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
