import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LandingPage from "./pages/LandingPage";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Leaderboard from "./pages/Leaderboard";
import Sponsors from "./pages/Sponsors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import SponsorOnboarding from "./pages/SponsorOnboarding";
import SubmissionForm from "./pages/SubmissionForm";
import BuilderProfile from "./pages/BuilderProfile";
import JudgePanel from "./pages/JudgePanel";
import CandidateDashboard from "./pages/CandidateDashboard";
import SponsorDashboard from "./pages/SponsorDashboard";
import CreateChallenge from "./pages/CreateChallenge"; 
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SubmissionSuccess from "./pages/SubmissionSuccess";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/challenge/:id" element={<ChallengeDetail />} />
                <Route path="/submit/:id?" element={<SubmissionForm />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/profile/:username" element={<BuilderProfile />} />
                <Route path="/admin/judge/:id" element={<JudgePanel />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/sponsor-onboarding" element={<SponsorOnboarding />} />
                <Route 
                  path="/candidate-dashboard" 
                  element={
                    <ProtectedRoute allowedRole="candidate">
                      <CandidateDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/sponsor-dashboard" 
                  element={
                    <ProtectedRoute allowedRole="sponsor">
                      <SponsorDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create-challenge" 
                  element={
                    <ProtectedRoute allowedRole="sponsor">
                      <CreateChallenge />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/submission-success" element={<SubmissionSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
