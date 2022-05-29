import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getStorageTheme = () => {
  let theme = "light";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getStorageTheme());
  const toggleTheme = () => {
    if (theme === "light") return setTheme("dark");
    else return setTheme("light");
  };
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[{ theme }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
