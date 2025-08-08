import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <nav className="navigation" style={{ backgroundColor: theme.surface }}>
      <div className="nav-container">
        <Link to="/home" className="nav-logo" style={{ color: theme.primary }}>
          More Than Robin
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/home" 
            className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
            style={{ color: theme.text }}
          >
            Home
          </Link>
          <Link 
            to="/leaderboard" 
            className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}
            style={{ color: theme.text }}
          >
            Leaderboard
          </Link>
          {user && (
            <>
              <Link 
                to="/add-catch" 
                className={`nav-link ${location.pathname === '/add-catch' ? 'active' : ''}`}
                style={{ color: theme.text }}
              >
                Add Catch
              </Link>
              <Link 
                to="/profile" 
                className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                style={{ color: theme.text }}
              >
                Profile
              </Link>
              {isAdmin && (
                <Link 
                  to="/moderation" 
                  className={`nav-link ${location.pathname === '/moderation' ? 'active' : ''}`}
                  style={{ color: theme.text }}
                >
                  Moderation
                </Link>
              )}
              <button 
                onClick={logout}
                className="nav-button"
                style={{ color: theme.text, borderColor: theme.text }}
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link 
              to="/login" 
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              style={{ color: theme.text }}
            >
              Login
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
