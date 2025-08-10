import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { theme } = useContext(ThemeContext);
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
      <div className="auth-card glass" style={{ background: theme.surface }}>
        <div className="auth-card-left">
          <h1 className="auth-title" style={{ color: theme.primary }}>
            Welcome back
          </h1>
          <p className="auth-subtitle" style={{ color: theme.text }}>
            Sign in to track catches, climb the leaderboard, and manage your
            groups.
          </p>
        </div>
        <div className="auth-card-right">
          <button
            onClick={handleLogin}
            className="btn auth-primary"
            style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
          >
            Continue as Demo
          </button>
          <button
            onClick={handleLogin}
            className="btn-secondary auth-secondary"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            Sign in with Email
          </button>
          <p className="auth-hint" style={{ color: theme.text }}>
            No account needed. Demo login uses mock data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
