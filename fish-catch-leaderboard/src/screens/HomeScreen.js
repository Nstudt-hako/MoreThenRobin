import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">🎣 More Than Robin</h1>
        <p className="hero-subtitle">
          Track and compare your fishing catches with fellow anglers
        </p>

        <div className="hero-actions">
          <Link to="/leaderboard" className="hero-button primary">
            View Leaderboard
          </Link>
          {user ? (
            <Link to="/add-catch" className="hero-button secondary">
              Add New Catch
            </Link>
          ) : (
            <Link to="/login" className="hero-button secondary">
              Login to Add Catches
            </Link>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Your Catches</h3>
            <p>Record species, size, location, and photos of your catches</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Compete with Friends</h3>
            <p>See who&apos;s catching the biggest fish on the leaderboard</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧑‍🤝‍🧑</div>
            <h3>Groups</h3>
            <p>Create or join groups to compare catches within your crew.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Personal Bests</h3>
            <p>Track your all-time records by species and season.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Moderation</h3>
            <p>Admins can review and manage flagged content with ease.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌓</div>
            <h3>Light & Dark Theme</h3>
            <p>Switch themes anytime for comfortable viewing day or night.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
