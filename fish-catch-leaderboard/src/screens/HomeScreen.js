import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import './HomeScreen.css';

const HomeScreen = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    return (
        <div className="home-container" style={{ backgroundColor: theme.background, color: theme.text }}>
            <div className="hero-section">
                <h1 className="hero-title" style={{ color: theme.primary }}>
                    🎣 More Than Robin
                </h1>
                <p className="hero-subtitle">
                    Track and compare your fishing catches with fellow anglers
                </p>
                
                <div className="hero-actions">
                    <Link 
                        to="/leaderboard" 
                        className="hero-button primary"
                        style={{ backgroundColor: theme.primary }}
                    >
                        View Leaderboard
                    </Link>
                    {user ? (
                        <Link 
                            to="/add-catch" 
                            className="hero-button secondary"
                            style={{ borderColor: theme.primary, color: theme.primary }}
                        >
                            Add New Catch
                        </Link>
                    ) : (
                        <Link 
                            to="/login" 
                            className="hero-button secondary"
                            style={{ borderColor: theme.primary, color: theme.primary }}
                        >
                            Login to Add Catches
                        </Link>
                    )}
                </div>
            </div>

            <div className="features-section">
                <h2 style={{ color: theme.text }}>Features</h2>
                <div className="features-grid">
                    <div className="feature-card" style={{ backgroundColor: theme.surface }}>
                        <div className="feature-icon">📊</div>
                        <h3>Track Your Catches</h3>
                        <p>Record species, size, location, and photos of your catches</p>
                    </div>
                    <div className="feature-card" style={{ backgroundColor: theme.surface }}>
                        <div className="feature-icon">🏆</div>
                        <h3>Compete with Friends</h3>
                        <p>See who&apos;s catching the biggest fish on the leaderboard</p>
                    </div>
                    <div className="feature-card" style={{ backgroundColor: theme.surface }}>
                        <div className="feature-icon">📱</div>
                        <h3>Easy to Use</h3>
                        <p>Simple interface that works on all devices</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;