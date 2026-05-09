import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Detect system theme
  const getSystemTheme = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // ⚡ Decide theme on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme !== null) {
      // ✅ Use saved user preference
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // ✅ Fallback to system theme only once
      const systemDark = getSystemTheme();
      setDarkMode(systemDark);
    }
  }, []);

  // 💾 Save theme whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  // 🎨 Apply theme to body (better than wrapping div)
  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
  }, [darkMode]);

  // 🔘 Toggle function
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};