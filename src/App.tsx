
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Shows from "./pages/Shows";
import Clips from "./pages/Clips";
import MediaLibrary from "./pages/MediaLibrary";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Customisation from "./pages/Customisation";
import CreateShow from "./pages/CreateShow";
import CreateClip from "./pages/CreateClip";
import CreateMediaLibrary from "./pages/CreateMediaLibrary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/shows" element={<Layout><Shows /></Layout>} />
          <Route path="/shows/create" element={<Layout><CreateShow /></Layout>} />
          <Route path="/clips" element={<Layout><Clips /></Layout>} />
          <Route path="/clips/create" element={<Layout><CreateClip /></Layout>} />
          <Route path="/media-library" element={<Layout><MediaLibrary /></Layout>} />
          <Route path="/media-library/create" element={<Layout><CreateMediaLibrary /></Layout>} />
          <Route path="/users" element={<Layout><Users /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/customisation" element={<Layout><Customisation /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
