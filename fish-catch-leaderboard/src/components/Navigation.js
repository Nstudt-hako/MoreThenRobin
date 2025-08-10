import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import Avatar from "./Avatar";

const Navigation = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="Home">
          🎣 More Than Robin
        </Link>
        <div
          className="nav-links"
          role="navigation"
          aria-label="Primary Navigation"
        >
          <NavLink
            to="/home"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            end
          >
            <span className="icon">🏠</span>
            <span className="label">Home</span>
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/add-catch"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="icon">🐟</span>
                <span className="label">Add Catch</span>
              </NavLink>
              <NavLink
                to="/personal-bests"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="icon">⭐</span>
                <span className="label">Personal Bests</span>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="icon">🧑</span>
                <span className="label">Profile</span>
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/moderation"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <span className="label">Moderation</span>
                </NavLink>
              )}
            </>
          )}
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <span className="icon">🏆</span>
            <span className="label">Leaderboard</span>
          </NavLink>
          {!user && (
            <Link to="/login" className="nav-link nav-cta">
              🔐 Login
            </Link>
          )}
          {user && (
            <NavLink
              to="/groups"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="icon">🧑‍🤝‍🧑</span>
              <span className="label">Groups</span>
            </NavLink>
          )}
        </div>

        <div className="rail-footer">
          <ThemeToggle />
          {user ? (
            <div className="user-card">
              <div className="user-card-row">
                <Avatar name={user.email} size={36} />
                <div className="user-meta">
                  <span className="user-name">{user.email.split("@")[0]}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <button
                  className="nav-button small"
                  onClick={logout}
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-link nav-cta">
              🔐 Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
