import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPaintBrush, FaWrench, FaBolt, FaBroom, FaTree, FaCar, FaTools } from "react-icons/fa";

const stats = [
    { number: 1200, suffix: "+", label: "Verified Providers" },
    { number: 15000, suffix: "+", label: "Services Completed" },
    { number: 4.9, suffix: "⭐", label: "Average Rating" },
];

const services = [
    {
        icon: <FaPaintBrush className="text-4xl text-yellow-500" />,
        title: "Painter",
        desc: "Professional painters for home and office decor.",
    },
    {
        icon: <FaWrench className="text-4xl text-red-500" />,
        title: "Plumber",
        desc: "Fix leaks, install pipes, and bathroom fittings easily.",
    },
    {
        icon: <FaBolt className="text-4xl text-blue-500" />,
        title: "Electrician",
        desc: "Certified electricians for wiring and appliance setup.",
    },
    {
        icon: <FaBroom className="text-4xl text-green-500" />,
        title: "Cleaner",
        desc: "Trained staff for home, office, and deep cleaning.",
    },
    {
        icon: <FaTools className="text-4xl text-pink-500" />,
        title: "Carpenter",
        desc: "Woodwork, furniture repair, and custom interior solutions.",
    },
    {
        icon: <FaTree className="text-4xl text-green-500" />,
        title: "Gardener",
        desc: "Professional gardening, plant care, and outdoor maintenance.",
    },
    {
        icon: <FaCar className="text-4xl text-red-500" />,
        title: "Mechanic",
        desc: "Vehicle repair and maintenance service at your doorstep.",
    },
    {
        icon: <FaTools className="text-4xl text-yellow-500" />,
        title: "AC Technician",
        desc: "Installation, maintenance, and repair of AC units.",
    },
];

const ServicesSection = () => {
    const [startCount, setStartCount] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        // scroll detection to trigger count
        const handleScroll = () => {
            const section = document.getElementById("services");
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight - 150) {
                    setStartCount(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="services" className="pt-20 pb-10 bg-[#ebf1fe] dark:bg-[#111827] text-center">
            <div className="max-w-7xl mx-auto px-6">
                {/* === Stats Section === */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
                    {stats.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                delay: i * 0.2,
                                duration: 0.6,
                                ease: [0.25, 0.1, 0.25, 1.05],
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <motion.h3
                                className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-0"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {startCount ? (
                                    <CountUp
                                        start={0}
                                        end={item.number}
                                        duration={2.5}
                                        separator=","
                                        decimals={item.number % 1 !== 0 ? 1 : 0}
                                        suffix={item.suffix}
                                    />
                                ) : (
                                    "0"
                                )}
                            </motion.h3>
                            <p className="text-gray-600 dark:text-gray-200 font-medium mt-2">{item.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* === Section Heading === */}
                <div
                    data-aos="zoom-in-up"
                    className="mb-12"
                    data-aos-delay="100"
                    data-aos-offset="120"
                >
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Our Services</h2>
                    <p className="text-gray-500 text-lg dark:text-gray-200">
                        Get professional home services at your doorstep 🏠
                    </p>
                </div>

                {/* === Services Grid === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            data-aos="flip-left"
                            data-aos-delay={i * 100}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-200">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;

