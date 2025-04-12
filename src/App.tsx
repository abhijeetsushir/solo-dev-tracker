
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext";
import { Header } from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import NewProject from "./pages/NewProject";
import CalendarView from "./pages/CalendarView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProjectProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <Header />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <Header />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/projects/new"
              element={
                <>
                  <Header />
                  <NewProject />
                </>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <>
                  <Header />
                  <ProjectDetail />
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <Header />
                  <CalendarView />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProjectProvider>
  </QueryClientProvider>
);

export default App;
