import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">ITIHAAS</div>

      {/* Hamburger */}
      <button
        className={`nav-hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/timeline" onClick={closeMenu}>Timeline</Link></li>
        <li><Link to="/maps"     onClick={closeMenu}>Maps</Link></li>
        <li><Link to="/stories"  onClick={closeMenu}>Stories</Link></li>
        <li><Link to="/quiz"     onClick={closeMenu}>Quiz</Link></li>
      </ul>

      {/* Auth Buttons */}
      <div className="nav-auth">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}
