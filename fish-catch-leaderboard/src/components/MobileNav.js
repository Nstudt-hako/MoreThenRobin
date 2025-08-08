import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useGroups } from '../context/GroupContext';

// Simple icon mapping (emojis as lightweight placeholders)
const itemsBase = (hasUser, hasGroups) => [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/leaderboard', label: 'Board', icon: '🏆' },
  hasUser ? { to: '/personal-bests', label: 'Bests', icon: '⭐' } : null,
  hasUser ? { to: '/add-catch', label: 'Add', icon: '➕', accent: true } : null,
  hasUser && hasGroups ? { to: '/groups', label: 'Groups', icon: '👥' } : null,
  hasUser ? { to: '/profile', label: 'Me', icon: '👤' } : { to: '/login', label: 'Login', icon: '🔐' }
].filter(Boolean);

const MobileNav = () => {
  const { user } = useContext(AuthContext);
  const { groups } = useGroups();
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const items = itemsBase(!!user, groups.length > 0);

  return (
    <nav className="mobile-nav" aria-label="Primary Mobile Navigation" style={{ background: theme.surface, borderTop: `1px solid ${theme.border}` }}>
      {items.map(item => {
        const active = location.pathname === item.to;
        return (
          <NavLink key={item.to} to={item.to} className={`mobile-nav-item ${active ? 'active' : ''} ${item.accent ? 'accent' : ''}`}> 
            <span className="icon" aria-hidden>{item.icon}</span>
            <span className="label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileNav;
