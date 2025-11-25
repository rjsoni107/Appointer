import React, { useState } from 'react';
import { FaBolt, FaTools, FaWrench, FaPaintBrush, FaCar, FaTree, FaBroom, FaChevronDown } from 'react-icons/fa';

export default function HeaderNavbar() {
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
        <nav className="hidden lg:flex items-center gap-8 relative">
            {['Home', 'About', 'Services', 'Contact'].map((link) =>
                link === "Services" ? (
                    <div
                        key={link}
                        className="relative group"
                        onClick={() => setIsServicesOpen(true)}
                    >
                        <button className="flex items-center gap-1 text-gray-800 dark:text-gray-200 hover:text-blue-600 font-medium transition-colors">
                            {link} <FaChevronDown className={`transition-transform duration-200 mt-1 text-gray-800 dark:text-gray-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* 🧩 Multi-column Dropdown */}
                        {isServicesOpen && (
                            <div className="absolute left-0 mt-3 w-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 grid grid-cols-2 gap-4 animate-fadeIn z-50" onMouseLeave={() => setIsServicesOpen(false)}>
                                {services.map((service, i) => (
                                    <a
                                        key={i}
                                        href={`#${service.name.toLowerCase()}`}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 group/item"
                                    >
                                        <div className="text-2xl">{service.icon}</div>
                                        <span className="text-gray-700 dark:text-gray-200 font-medium group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                            {service.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        className="text-gray-800 dark:text-gray-200 hover:text-blue-600 font-medium transition-colors"
                    >
                        {link}
                    </a>
                )
            )}
        </nav>
    );
}