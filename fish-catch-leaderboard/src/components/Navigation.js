import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { useGroups } from "../context/GroupContext";
import GroupSelect from "./GroupSelect";
import Avatar from "./Avatar";

const Navigation = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { groups } = useGroups();
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <>
      <nav className="navigation" style={{ backgroundColor: theme.surface }}>
        <div className="nav-container">
          <Link
            to="/home"
            className="nav-logo"
            style={{ color: theme.primary }}
          >
            More Than Robin
          </Link>

          <div className="nav-links">
            {user && groups.length > 0 && <GroupSelect />}
            <Link
              to="/home"
              className={`nav-link ${
                location.pathname === "/home" ? "active" : ""
              }`}
              style={{ color: theme.text }}
            >
              <span className="icon" aria-hidden>
                🏠
              </span>
              <span className="label">Home</span>
            </Link>
            <Link
              to="/leaderboard"
              className={`nav-link ${
                location.pathname === "/leaderboard" ? "active" : ""
              }`}
              style={{ color: theme.text }}
            >
              <span className="icon" aria-hidden>
                🏆
              </span>
              <span className="label">Leaderboard</span>
            </Link>
            {user && (
              <>
                <Link
                  to="/add-catch"
                  className={`nav-link ${
                    location.pathname === "/add-catch" ? "active" : ""
                  }`}
                  style={{ color: theme.text }}
                >
                  <span className="icon" aria-hidden>
                    ➕
                  </span>
                  <span className="label">Add Catch</span>
                </Link>
                <Link
                  to="/personal-bests"
                  className={`nav-link ${
                    location.pathname === "/personal-bests" ? "active" : ""
                  }`}
                  style={{ color: theme.text }}
                >
                  <span className="icon" aria-hidden>
                    ⭐
                  </span>
                  <span className="label">Personal Bests</span>
                </Link>
                <Link
                  to="/profile"
                  className={`nav-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                  style={{ color: theme.text }}
                >
                  <span className="icon" aria-hidden>
                    👤
                  </span>
                  <span className="label">Profile</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/moderation"
                    className={`nav-link ${
                      location.pathname === "/moderation" ? "active" : ""
                    }`}
                    style={{ color: theme.text }}
                  >
                    <span className="label">Moderation</span>
                  </Link>
                )}
              </>
            )}
            {!user && (
              <Link
                to="/login"
                className={`nav-link ${
                  location.pathname === "/login" ? "active" : ""
                }`}
                style={{ color: theme.text }}
              >
                <span className="icon" aria-hidden>
                  🔐
                </span>
                <span className="label">Login</span>
              </Link>
            )}
            {user && (
              <Link
                to="/groups"
                className={`nav-link ${
                  location.pathname === "/groups" ? "active" : ""
                }`}
                style={{ color: theme.text }}
              >
                <span className="icon" aria-hidden>
                  👥
                </span>
                <span className="label">Groups</span>
              </Link>
            )}

            {/* Rail footer (sticks to bottom on desktop) */}
            <div className="rail-footer">
              <ThemeToggle />
              {user ? (
                <div className="user-card" aria-label="Current user">
                  <div className="user-card-row">
                    <Avatar name={user.email} size={36} />
                    <div className="user-meta">
                      <strong className="user-name">
                        {user.email.split("@")[0]}
                      </strong>
                      <span className="user-email muted">{user.email}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="nav-button small"
                      title="Logout"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="nav-link nav-cta">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* FAB entfernt: redundanter Add-Catch Button, da im MobileNav vorhanden */}
    </>
  );
};

export default Navigation;
