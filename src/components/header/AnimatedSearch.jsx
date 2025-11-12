import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const AnimatedSearch = () => {
    const [isTyping, setIsTyping] = useState(false);
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
        setIsTyping(e.target.value.length > 0);
    };

    return (
        <div className="relative">
            {/* Input Field */}
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className="text-gray-800 pl-5 pr-12 py-2 rounded-full border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white"
            />

            {/* Animated Placeholder (hidden when user types) */}
            {!isTyping && (
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none whitespace-nowrap">
                    <TypeAnimation
                        sequence={[
                            "Search for Electrician...",
                            1500,
                            "Search for Doctor...",
                            1500,
                            "Search for Lawyer...",
                            1500,
                            "Search for Teacher...",
                            1500,
                            "Search for Painter...",
                            1500,
                            "Search for Plumber...",
                            1500,
                        ]}
                        speed={50}
                        deletionSpeed={40}
                        repeat={Infinity}
                    />
                </div>
            )}

            {/* Search Icon inside input */}
            <FaSearch
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors duration-300"
                size={18}
            />
        </div>
    );
};

export default AnimatedSearch;
