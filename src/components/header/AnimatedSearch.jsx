import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { FaBolt, FaWrench, FaTools, FaPaintBrush, FaCar, FaBroom, FaTree } from "react-icons/fa";

const AnimatedSearch = () => {
    const [value, setValue] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const searchRef = useRef(null);

    const STATIC_DATA = [
        { name: "Electrician", category: "Home Services", icon: <FaBolt className="text-yellow-500" /> },
        { name: "Plumber", category: "Home Services", icon: <FaWrench className="text-blue-500" /> },
        { name: "Carpenter", category: "Repairs", icon: <FaTools className="text-green-600" /> },
        { name: "Painter", category: "Repairs", icon: <FaPaintBrush className="text-pink-500" /> },
        { name: "Mechanic", category: "Vehicle", icon: <FaCar className="text-red-500" /> },
        { name: "Cleaner", category: "Home Services", icon: <FaBroom className="text-teal-500" /> },
        { name: "Gardener", category: "Outdoor", icon: <FaTree className="text-emerald-500" /> },
        { name: "AC Technician", category: "Appliance", icon: <FaTools className="text-indigo-500" /> },
    ];

    const TRENDING_SERVICES = [
        { name: "AC Repair", icon: <FaTools className="text-indigo-500" />, category: "Home Appliances" },
        { name: "Electrician", icon: <FaBolt className="text-yellow-500" />, category: "Home Services" },
        { name: "Plumber", icon: <FaWrench className="text-blue-500" />, category: "Home Services" },
        { name: "Carpenter", icon: <FaTools className="text-green-600" />, category: "Repairs" },
        { name: "Cleaner", icon: <FaBroom className="text-teal-500" />, category: "Maintenance" },
    ]

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Debounced search
    const handleChange = (e) => {
        const inputValue = e.target.value.trim();
        setValue(inputValue);

        setIsTyping(inputValue.length > 0);

        // Always show suggestions (search results OR trending)
        setShowResults(true);

        // Hit API only when input is NOT empty
        if (inputValue.length > 0) {
            setLoading(true);

            // clearTimeout(typingTimeout);
            const timeout = setTimeout(() => {
                // searchAPI(inputValue); // backend call here
                doSearch(inputValue)
            }, 800);

            // setTypingTimeout(timeout);
        } else {
            // Input empty → trending mode
            setResults([]);
            setLoading(false);
        }
    };

    // Main search logic
    const doSearch = (query) => {
        setLoading(true);
        setShowResults(true);

        const filtered = STATIC_DATA.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
        setLoading(false);
    };

    const clearSearch = () => {
        setValue("");
        setIsTyping(false);
        setShowResults(false);
        setResults([]);
    };

    // Highlight matching text
    const highlightMatch = (text) => {
        const index = text.toLowerCase().indexOf(value.toLowerCase());
        if (index === -1) return text;

        return (
            <>
                {text.substring(0, index)}
                <span className="text-blue-600 font-semibold">
                    {text.substring(index, index + value.length)}
                </span>
                {text.substring(index + value.length)}
            </>
        );
    };

    return (
        <div className="relative w-50" ref={searchRef}>
            {/* Input */}
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className="text-gray-800 dark:text-gray-200 pl-5 pr-12 py-2 w-full rounded-full border border-gray-200 dark:border-gray-700 transition bg-white dark:bg-gray-800"
            />

            {/* Animated Placeholder */}
            {!isTyping && !value && (
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none">
                    <TypeAnimation
                        sequence={[
                            "Search for Electrician...",
                            1200,
                            "Search for Painter...",
                            1200,
                            "Search for Plumber...",
                            1200,
                            "Search for AC Repair...",
                            1200,
                        ]}
                        speed={50}
                        repeat={Infinity}
                    />
                </div>
            )}

            {/* Clear icon */}
            {value && (
                <button
                    onClick={clearSearch}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                >
                    <FaTimes />
                </button>
            )}

            {/* Search icon */}
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400" />

            {/* Dropdown */}
            {showResults && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto animate-fadeIn">

                    {/* Show Trending Searches when no input */}
                    {!value.trim() ? (
                        <div>
                            <p className="px-4 pt-4 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                🔥 Top Trending Searches
                            </p>

                            <div className="mt-2">
                                {TRENDING_SERVICES.map((trend, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition group"
                                    >
                                        <div className="text-2xl">{trend.icon}</div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-800 dark:text-gray-200 group-hover:text-blue-600 font-medium">
                                                {trend.name}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{trend.category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* WHEN USER TYPES → SEARCH RESULTS */}
                            {loading ? (
                                <p className="p-4 text-center text-gray-500">Searching...</p>
                            ) : results.length === 0 ? (
                                <div className="p-6 text-center">
                                    <FaSearch className="text-gray-400 mx-auto text-3xl mb-2 dark:text-gray-300" />
                                    <h4 className="text-gray-700 font-medium dark:text-gray-200">No results found</h4>
                                    <p className="text-gray-500 text-sm dark:text-gray-400">
                                        Try different keywords.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="px-4 pt-2 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">
                                        Suggestions
                                    </p>

                                    {results.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer group"
                                        >
                                            <div className="text-2xl">{item.icon}</div>

                                            <div className="flex flex-col leading-tight">
                                                <span className="text-gray-800 dark:text-gray-200 group-hover:text-blue-600 font-medium">
                                                    {highlightMatch(item.name)}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

        </div>
    );
};

export default AnimatedSearch;