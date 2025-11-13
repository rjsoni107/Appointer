import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import { ModalComponent } from "../modal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
const PublicLayout = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Handle scroll to show/hide scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        AOS.init({
            duration: 1000, // animation duration
            easing: "ease-in-out", // smoother easing
            once: false, // trigger only once
            offset: 100,
        });
    }, []);
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ModalComponent />
            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop}
                        className="fixed bottom-10 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl flex items-center justify-center z-40 hover:shadow-2xl transition-all duration-300 group"
                        aria-label="Scroll to top"
                    >
                        <FaArrowUp className="text-xl group-hover:animate-bounce" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    )
}

export default PublicLayout;