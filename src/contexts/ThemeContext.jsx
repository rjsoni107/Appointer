import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const ThemeContext = createContext();

// Provider Component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    // Automatically load saved theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) setTheme(storedTheme);
    }, []);

    // Update HTML root + localStorage
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Toggle function
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook for easy access
export const useTheme = () => useContext(ThemeContext);
