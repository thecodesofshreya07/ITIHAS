import "./Auth.css";

export default function Signup({ close }) {
  return (
    <div className="auth-box">
      <h2>Sign Up</h2>

      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Create Account</button>
    </div>
  );
}
