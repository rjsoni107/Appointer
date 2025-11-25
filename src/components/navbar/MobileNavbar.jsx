import React, { useState } from 'react';
import { FaBolt, FaTools, FaWrench, FaPaintBrush, FaCar, FaTree, FaBroom, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../header/ThemeToggle';
import LocationInput from '../location/LocationInput';
export default function MobileNavbar() {
    const { theme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const services = [
        { name: "Electrician", icon: <FaBolt className="text-yellow-500" /> },
        { name: "Plumber", icon: <FaWrench className="text-blue-500" /> },
        { name: "Carpenter", icon: <FaTools className="text-green-600" /> },
        { name: "Painter", icon: <FaPaintBrush className="text-pink-500" /> },
        { name: "Mechanic", icon: <FaCar className="text-red-500" /> },
        { name: "Cleaner", icon: <FaBroom className="text-teal-500" /> },
        { name: "Gardener", icon: <FaTree className="text-emerald-500" /> },
        { name: "AC Technician", icon: <FaTools className="text-indigo-500" /> },
    ];
    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
                {/* <LocationInput onLocationChosen={({ city }) => {
                    // optional: navigate or fetch providers here
                    console.log("Location chosen:", city);
                    // e.g., dispatch(fetchProvidersForCity(city))
                }} /> */}
                <ThemeToggle theme={theme} />
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
                >
                    {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md py-6 flex flex-col items-center gap-4 lg:hidden">
                    {['Home', 'About', 'Services', 'Contact'].map((link) =>
                        link === "Services" ? (
                            <div key={link} className="w-full text-center">
                                <button
                                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                                    className="flex justify-center items-center w-full text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600"
                                >
                                    {link} <FaChevronDown className={`ml-2 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown for mobile */}
                                {isServicesOpen && (
                                    <div className="mt-2 w-full flex flex-col items-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        {services.map((service) => (
                                            <a
                                                key={service.name}
                                                href={`#${service.name.toLowerCase()}`}
                                                className="py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 w-full text-center"
                                            >
                                                {service.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                            >
                                {link}
                            </a>
                        )
                    )}
                </div>
            )}
        </>
    );
}