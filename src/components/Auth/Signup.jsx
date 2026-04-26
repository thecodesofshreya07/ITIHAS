import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Signup({ close, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const result = await signup(email, password, name);
    if (result.success) {
      close();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-box">
      <h2>Join ITIHAAS</h2>
      <p>Create an account to track your progress and master history.</p>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSignup}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
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
            placeholder="Create Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="auth-btn">Create Account</button>
      </form>

      <p className="auth-switch">
        Already have an account? <span onClick={switchToLogin}>Login</span>
      </p>
    </div>
  );
}
