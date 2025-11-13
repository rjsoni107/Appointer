import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserPlus, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { closeLogin, openProviderRegister, closeRegister, openLogin, openRegister } from '../../store/reducerSlice/modalSlice';
import bannerVideo from '../../assets/videos/banner-bg.mp4';
import bannerPoster from '../../assets/images/banner-poster.webp';
import { useAuth } from '../../hook/useAuth';
import { useNavigate } from 'react-router-dom';
// Framer Motion variants
const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

const BannerSection = () => {
    const words = ['Trusted', 'Local', 'Services'];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const onOpenProviderRegister = () => {
        dispatch(closeLogin());
        setTimeout(() => dispatch(openProviderRegister()), 0);
    }

    const onOpenLogin = () => {
        dispatch(closeRegister());
        setTimeout(() => dispatch(openLogin()), 0);
    };

    const onOpenRegister = () => {
        dispatch(closeLogin());
        setTimeout(() => dispatch(openRegister()), 0);
    };

    return (
        <section
            id="home"
            className="relative w-full h-screen flex items-center justify-center text-center text-white mt-16 overflow-hidden"
        >
            {/* 🔹 Video Background */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-700"
                src={bannerVideo}
                poster={bannerPoster}
                autoPlay
                loop
                muted
                playsInline
                onCanPlayThrough={(e) => e.target.classList.add('opacity-100')}
                style={{ opacity: 1 }}
            />

            {/* 🔹 Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 dark:bg-black/70 z-10"></div>

            {/* 🔹 Content */}
            <div className="relative z-20 px-4 sm:px-6 md:px-8 lg:px-12 w-full sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2">
                {/* Animated Heading */}
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug sm:leading-tight mb-4 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    Find & Book{' '}
                    <span className="inline-block text-blue-600 dark:text-blue-400">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="inline-block mr-2"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>{' '}
                    In Minutes
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-gray-200 dark:text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 px-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    Connect with verified professionals for all your needs — from home repairs
                    to beauty, get the best with real reviews.
                </motion.p>

                {/* 🔹 Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                >

                    {isLoggedIn ? (
                        <div className="sm:hidden flex items-center gap-4 justify-center">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-1 text-gray-800 hover:text-blue-600 bg-white px-5 py-1 rounded-full transition border border-blue-600 hover:border-blue-600"
                            >
                                <FaUser className="w-4 h-4" />
                                <span>Dashboard</span>
                            </button>
                            <button
                                type="button"
                                onClick={logout}
                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-full font-medium transition hover:border-blue-600"
                            >
                                <FaSignOutAlt className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="sm:hidden flex items-center gap-4 justify-center">
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
                    )}

                    <a href="#services" className="hidden sm:flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition duration-300 text-base sm:text-lg">
                        <FaSearch /> Find Services Now
                    </a>

                    <button
                        type="button"
                        onClick={onOpenProviderRegister}
                        className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition duration-300 text-base sm:text-lg">
                        <FaUserPlus /> Become a Provider
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default BannerSection;

