import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { useGroups } from '../context/GroupContext';

const Navigation = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { groups, activeGroupId, setActiveGroupId } = useGroups();
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <>
    <nav className="navigation" style={{ backgroundColor: theme.surface }}>
      <div className="nav-container">
        <Link to="/home" className="nav-logo" style={{ color: theme.primary }}>
          More Than Robin
        </Link>
        
        <div className="nav-links">
          {user && groups.length > 0 && (
            <select
              value={activeGroupId || ''}
              onChange={(e)=> setActiveGroupId(e.target.value)}
              style={{ padding:'0.3rem 0.4rem', fontSize:'0.8rem' }}
            >
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          )}
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
                to="/personal-bests" 
                className={`nav-link ${location.pathname === '/personal-bests' ? 'active' : ''}`}
                style={{ color: theme.text }}
              >
                Personal Bests
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
          {user && (
            <Link 
              to="/groups" 
              className={`nav-link ${location.pathname === '/groups' ? 'active' : ''}`}
              style={{ color: theme.text }}
            >Groups</Link>
          )}
          <ThemeToggle />
        </div>
      </div>
  </nav>
    {user && (
      <a href="/MoreThenRobin/add-catch" aria-label="Add Catch" className="fab-add-catch">+</a>
    )}
    </>
  );
};

export default Navigation;
