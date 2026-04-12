import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Login({ close, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (result.success) {
      close();
      navigate("/home");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-box">
      <h2>Welcome Back</h2>
      <p>Enter your details to continue your journey through time.</p>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="auth-btn">Login</button>
      </form>
      
      <p className="auth-switch">
        Don't have an account? <span onClick={switchToSignup}>Sign Up</span>
      </p>
    </div>
  );
}
