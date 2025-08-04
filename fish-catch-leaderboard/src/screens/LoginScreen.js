import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
    const { theme } = useContext(ThemeContext);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Auto-login with demo user
            await login('demo@example.com');
            // Redirect to leaderboard after successful login
            navigate('/leaderboard');
        } catch (error) {
            // Silent error handling - no console logs allowed
        }
    };

    return (
        <div className="login-container" style={{ color: theme.text }}>
            <h1 style={{ color: theme.primary }}>🎣 Login</h1>
            <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
                Click the login button below to automatically sign in as a demo user and explore the leaderboard with mock fishing data.
            </p>
            <button 
                onClick={handleLogin}
                className="btn"
            >
                Login as Demo User
            </button>
        </div>
    );
};

export default LoginScreen;