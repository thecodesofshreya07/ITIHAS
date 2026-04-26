import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import TimelinePage from "./components/Timeline/TimelinePage";
import MapsPage from "./components/Map/MapsPage";
import StoriesPage from "./components/Stories/StoriesPage";
import QuizPage from "./components/Quiz/QuizPage";
import StoryDetail from "./components/Stories/StoryDetail";
import ProfilePage from "./pages/ProfilePage";
import BookmarksPage from "./pages/BookmarksPage";
import Chatbot from "./components/Chatbot/Chatbot";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/maps" element={<MapsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbot />
    </>
  );
}