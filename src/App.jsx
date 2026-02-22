import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import TimelinePage from "./pages/TimelinePage";
import MapsPage from "./pages/MapsPage";
import StoriesPage from "./pages/StoriesPage";
import QuizPage from "./pages/QuizPage";
import StoryDetail from "./components/Stories/StoryDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/maps" element={<MapsPage />} />
      <Route path="/stories" element={<StoriesPage />} />
      <Route path="/stories/:id" element={<StoryDetail />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}