import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HealthAICenter from "./pages/HealthAICenter";
import HyperCleanEngine from "./pages/HyperCleanEngine";
import PerformanceReactor from "./pages/PerformanceReactor";
import DriverSoftwareHub from "./pages/DriverSoftwareHub";
import SecurityVault from "./pages/SecurityVault";
import DeepAnalysisLogs from "./pages/DeepAnalysisLogs";
import AdvancedToolsLab from "./pages/AdvancedToolsLab";
import KnouxUltraHub from "./pages/KnouxUltraHub";
import Settings from "./pages/Settings";
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
          <Route path="/health-ai-center" element={<HealthAICenter />} />
          <Route path="/hyper-clean-engine" element={<HyperCleanEngine />} />
          <Route path="/performance-reactor" element={<PerformanceReactor />} />
          <Route path="/driver-software-hub" element={<DriverSoftwareHub />} />
          <Route path="/security-vault" element={<SecurityVault />} />
          <Route path="/deep-analysis-logs" element={<DeepAnalysisLogs />} />
          <Route path="/advanced-tools-lab" element={<AdvancedToolsLab />} />
          <Route path="/knoux-ultra-hub" element={<KnouxUltraHub />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
