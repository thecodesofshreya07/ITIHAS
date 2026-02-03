import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import "./Auth.css";

export default function Login({ close }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: "Demo User" });
    close();
    navigate("/home");
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
