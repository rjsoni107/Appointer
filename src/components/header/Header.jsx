import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ModalComponent } from '../modal';
import { useDispatch } from 'react-redux';
import { closeLogin, closeRegister, openLogin, openRegister } from "../../store/reducerSlice/modalSlice";
import { useAuth } from "../../hook/useAuth";
import AnimatedSearch from './AnimatedSearch';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const { isLoggedIn, logout } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const dispatch = useDispatch();

    const onOpenLogin = () => {
        dispatch(closeRegister());
        setTimeout(() => dispatch(openLogin()), 0);
    };

    const onOpenRegister = () => {
        dispatch(closeLogin());
        setTimeout(() => dispatch(openRegister()), 0);
    };

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 bg-gradient-to-b from-[#f9fbff] to-[#eef4ff] dark:from-[#0b1120] dark:to-[#0e1423] shadow-md py-4 z-50`} >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <a
                    href="#home"
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
                >
                    Appointer
                </a>

                {/* Nav Links */}
                <nav className="hidden lg:flex items-center gap-8">
                    {['Home', 'About', 'Services', 'Contact'].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 font-medium transition-colors"
                        >
                            {link}
                        </a>
                    ))}
                </nav>

                {/* Right Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <AnimatedSearch />

                    {/* 🌙 Theme Toggle */}
                    <ThemeToggle />

                    {isLoggedIn ? (
                        <button
                            type="button"
                            onClick={logout}
                            className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 bg-white px-5 py-1 rounded-full transition border border-blue-600 hover:border-blue-600">
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={onOpenLogin}
                                className="text-gray-800 font-medium hover:text-blue-600 dark:hover:text-blue-400 bg-white px-5 py-1 rounded-full transition border border-blue-600 hover:border-blue-600">
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={onOpenRegister}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-full font-medium transition hover:border-blue-600">
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
                >
                    {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 dark:from-[#0b1120] dark:to-[#111827] shadow-md py-6 flex flex-col items-center gap-4 lg:hidden">
                        {['Home', 'About', 'Services', 'Contact'].map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                            >
                                {link}
                            </a>
                        ))}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-full font-medium transition">
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
            <ModalComponent />
        </header>
    );
};

export default Header;
