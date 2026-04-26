import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../Auth/AuthModal";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null
  const { user, logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);
  const closeAuth = () => setAuthMode(null);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/home" className="nav-logo" onClick={closeMenu}>
        ITIHAAS
      </Link>

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
        <li><Link to="/home" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/timeline" onClick={closeMenu}>Timeline</Link></li>
        <li><Link to="/maps" onClick={closeMenu}>Maps</Link></li>
        <li><Link to="/stories" onClick={closeMenu}>Stories</Link></li>
        <li><Link to="/quiz" onClick={closeMenu}>Quiz</Link></li>
        <li><Link to="/bookmarks" onClick={closeMenu}>Bookmarks</Link></li>
        {user && <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>}

        {/* Mobile-only auth section */}
        <li className="mobile-auth-item">
          {user ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <div className="mobile-auth-btns">
              <button
                onClick={() => { setAuthMode('login'); closeMenu(); }}
                className="login-btn"
              >
                Login
              </button>
              <button
                onClick={() => { setAuthMode('signup'); closeMenu(); }}
                className="signup-btn"
              >
                Sign Up
              </button>
            </div>
          )}
        </li>
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="nav-auth">
        {user ? (
          <div className="user-profile">
            <Link to="/profile" className="user-name">Hello, {user.name.split(' ')[0]}</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <>
            <button onClick={() => setAuthMode('login')} className="login-btn">Login</button>
            <button onClick={() => setAuthMode('signup')} className="signup-btn">Sign Up</button>
          </>
        )}
      </div>

      {/* Auth Modals */}
      {authMode === 'login' && (
        <AuthModal close={closeAuth}>
          <Login close={closeAuth} switchToSignup={() => setAuthMode('signup')} />
        </AuthModal>
      )}
      {authMode === 'signup' && (
        <AuthModal close={closeAuth}>
          <Signup close={closeAuth} switchToLogin={() => setAuthMode('login')} />
        </AuthModal>
      )}
    </nav>
  );
}
