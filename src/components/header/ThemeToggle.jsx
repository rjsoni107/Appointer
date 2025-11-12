import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check saved theme preference on mount
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        setIsDark(!isDark);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Save user preference
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-blue-300 bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
        >
            {isDark ? (
                <FaSun className="text-yellow-400 text-lg transition-transform duration-300 rotate-0" />
            ) : (
                <FaMoon className="text-blue-600 text-lg transition-transform duration-300 rotate-0" />
            )}
        </button>
    );
};

export default ThemeToggle;
