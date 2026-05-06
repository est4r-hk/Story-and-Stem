import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Detect system theme
  const getSystemTheme = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // 🕒 Detect time-based theme (backup)
  const getTimeTheme = () => {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 6; // 7pm–6am = dark
  };

  // ⚡ Auto decide theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // priority: system → time fallback
      const systemDark = getSystemTheme();
      const timeDark = getTimeTheme();

      setDarkMode(systemDark ?? timeDark);
    }
  }, []);

  // 💾 Save changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  // 👀 Listen for system theme changes (live switching)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? "dark-theme" : "light-theme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};