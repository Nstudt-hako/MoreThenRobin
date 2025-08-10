import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className={`theme-toggle modern ${isDark ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      type="button"
    >
      <span className="theme-icon" aria-hidden>
        ☀️
      </span>
      <span className="theme-icon" aria-hidden>
        🌙
      </span>
      <span className="theme-thumb" aria-hidden />
    </button>
  );
};

export default ThemeToggle;
