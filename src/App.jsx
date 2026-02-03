import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { isLoggedIn } from "./utils/auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Home accessible to everyone */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

