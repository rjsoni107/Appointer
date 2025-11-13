import React, { useState } from 'react';
import { FaBars, FaTimes, FaChevronDown, FaWrench, FaBolt, FaPaintBrush, FaTools, FaBroom, FaCar, FaTree } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { closeLogin, closeRegister, openLogin, openRegister } from "../../store/reducerSlice/modalSlice";
import { useAuth } from "../../hook/useAuth";
import AnimatedSearch from './AnimatedSearch';
import ThemeToggle from './ThemeToggle';
import logoDark from '../../assets/images/logo-dark.webp';
import logoLight from '../../assets/images/logo-light.webp';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const { theme } = useTheme();
    const dispatch = useDispatch();

    const onOpenLogin = () => {
        dispatch(closeRegister());
        setTimeout(() => dispatch(openLogin()), 0);
    };

    const onOpenRegister = () => {
        dispatch(closeLogin());
        setTimeout(() => dispatch(openRegister()), 0);
    };

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
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 bg-gradient-to-b from-[#f9fbff] to-[#eef4ff] dark:from-[#0b1120] dark:to-[#0e1423] shadow-md py-4 z-50`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <a href="#home">
                    <img src={theme === "dark" ? logoLight : logoDark} alt="Appointer" className="w-40" />
                </a>

                {/* Nav Links */}
                <nav className="hidden lg:flex items-center gap-8 relative">
                    {['Home', 'About', 'Services', 'Contact'].map((link) =>
                        link === "Services" ? (
                            <div
                                key={link}
                                className="relative group"
                                onClick={() => setIsServicesOpen(true)}
                            >
                                <button className="flex items-center gap-1 text-gray-800 dark:text-gray-200 hover:text-blue-600 font-medium transition-colors">
                                    {link} <FaChevronDown className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
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

                {/* Right Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <AnimatedSearch />
                    <ThemeToggle />

                    {isLoggedIn ? (
                        <button
                            type="button"
                            onClick={logout}
                            className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 bg-white px-5 py-1 rounded-full transition border border-blue-600 hover:border-blue-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={onOpenLogin}
                                className="text-gray-800 font-medium hover:text-blue-600 dark:hover:text-blue-400 bg-white px-5 py-1 rounded-full transition border border-blue-600 hover:border-blue-600"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={onOpenRegister}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-full font-medium transition hover:border-blue-600"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <ThemeToggle className="lg:hidden"/>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
                >
                    {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md py-6 flex flex-col items-center gap-4 lg:hidden">
                        {['Home', 'About', 'Services', 'Contact'].map((link) =>
                            link === "Services" ? (
                                <div key={link} className="w-full text-center">
                                    <button
                                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                                        className="flex justify-center items-center w-full text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400"
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
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={onOpenLogin}
                                className="text-gray-800 dark:text-gray-600 font-medium hover:text-blue-600 dark:hover:text-blue-400 bg-white px-5 py-1 rounded-full transition border border-blue-600 hover:border-blue-600">
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={onOpenRegister}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-full font-medium transition">
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
