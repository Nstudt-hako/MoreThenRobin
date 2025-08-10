import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Auto-login with demo user
      await login("demo@example.com");
      // Redirect to leaderboard after successful login
      navigate("/leaderboard");
    } catch (error) {
      // Silent error handling - no console logs allowed
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-card-left">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to track catches, climb the leaderboard, and manage your
            groups.
          </p>
        </div>
        <div className="auth-card-right">
          <button onClick={handleLogin} className="btn auth-primary">
            Continue as Demo
          </button>
          <button
            onClick={handleLogin}
            className="btn-secondary auth-secondary"
          >
            Sign in with Email
          </button>
          <p className="auth-hint">
            No account needed. Demo login uses mock data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
