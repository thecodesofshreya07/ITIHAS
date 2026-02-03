import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        ITIHAAS
      </div>

      <ul className="nav-links">
        <li><Link to="/timeline">Timeline</Link></li>
        <li><Link to="/maps">Maps</Link></li>
        <li><Link to="/stories">Stories</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
      </ul>

      <div className="nav-auth">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}
