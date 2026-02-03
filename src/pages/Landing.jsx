import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home");
    }
  }, [navigate]);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/home");
    }, 800);
  };

  // JSX comes LAST
  return (
    <div className={`landing ${fadeOut ? "fade-out" : "fade-in"}`}>
      <h1 className="landing-title">ITIHAAS</h1>
      <p className="landing-tagline">A Journey Through Time</p>

      <button className="start-btn" onClick={handleStart}>
        Discover
      </button>
    </div>
  );
}
