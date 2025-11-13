import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = ( { className = "" } ) => {
    const { theme, toggleTheme } = useTheme(); // get theme and toggle function

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-blue-300 bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 ${className}`}
        >
            {theme === "dark" ? (
                <FaSun className="text-yellow-400 text-lg transition-transform duration-300" />
            ) : (
                <FaMoon className="text-blue-600 text-lg transition-transform duration-300" />
            )}
        </button>
    );
};

export default ThemeToggle;
