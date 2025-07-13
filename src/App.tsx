
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Board from "./pages/Board";
import CreatePost from "./pages/CreatePost";
import CreateSNSPost from "./pages/CreateSNSPost";
import CreateMissingPost from "./pages/CreateMissingPost";
import SNSPostDetail from "./pages/SNSPostDetail";
import Shelters from "./pages/Shelters";
import ShelterDetail from "./pages/ShelterDetail";
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
          <Route path="/board" element={<Board />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/create-sns-post" element={<CreateSNSPost />} />
          <Route path="/create-missing-post" element={<CreateMissingPost />} />
          <Route path="/sns-post/:id" element={<SNSPostDetail />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/shelter/:id" element={<ShelterDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
