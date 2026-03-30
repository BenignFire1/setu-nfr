import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import OpportunitiesHub from "./pages/OpportunitiesHub";
import OpportunityDetail from "./pages/OpportunityDetail";
import OnboardPage from "./pages/OnboardPage";
import BenefitsPage from "./pages/BenefitsPage";
import FeedbackPage from "./pages/FeedbackPage";
import ContactPage from "./pages/ContactPage";
import PoliciesPage from "./pages/PoliciesPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import StationMapPage from "./pages/StationMapPage";
import GlobalLayout from "./components/GlobalLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <GlobalLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/opportunities" element={<OpportunitiesHub />} />
            <Route path="/opportunities/:categoryId" element={<OpportunityDetail />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/onboard" element={<OnboardPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/station-map" element={<StationMapPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GlobalLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
