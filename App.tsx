import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Grammar from "./pages/Grammar";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Quizzes from "./pages/Quizzes";
import AuthCallback from "./pages/AuthCallback";
import AuthError from "./pages/AuthError";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/listening" element={<Listening />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/error" element={<AuthError />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
