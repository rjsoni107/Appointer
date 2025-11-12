import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    FaBolt,
    FaUserShield,
    FaHeadset,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaClock,
    FaLock,
    FaStar,
} from "react-icons/fa";

const features = [
    {
        icon: <FaBolt className="text-4xl text-yellow-500" />,
        title: "Quick Booking",
        desc: "Book any service in just a few clicks — fast and hassle-free.",
    },
    {
        icon: <FaUserShield className="text-4xl text-red-500" />,
        title: "Verified Experts",
        desc: "All service providers are background-checked and skilled professionals.",
    },
    {
        icon: <FaHeadset className="text-4xl text-blue-500" />,
        title: "24/7 Support",
        desc: "Get help anytime through our customer care and live chat.",
    },
    {
        icon: <FaMoneyBillWave className="text-4xl text-green-500" />,
        title: "Affordable Pricing",
        desc: "Transparent prices — no hidden costs or surprise charges.",
    },
    {
        icon: <FaMapMarkerAlt className="text-4xl text-pink-500" />,
        title: "Location Based",
        desc: "Find nearby professionals easily based on your area.",
    },
    {
        icon: <FaClock className="text-4xl text-indigo-500" />,
        title: "On-Time Service",
        desc: "Punctual providers who respect your time and deliver quality work.",
    },
    {
        icon: <FaLock className="text-4xl text-teal-500" />,
        title: "Secure Payments",
        desc: "All transactions are protected with encrypted and verified gateways.",
    },
    {
        icon: <FaStar className="text-4xl text-yellow-400" />,
        title: "Trusted by Thousands",
        desc: "Thousands of happy customers use Appointer every day with confidence.",
    },
];

const WhyChooseSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: false,
            mirror: true,
            offset: 120,
        });
    }, []);

    return (
        <section id="why-choose" className="pt-20 pb-10 bg-[#f8faff] dark:bg-[#0c111c] text-center">
            <div className="max-w-7xl mx-auto px-6">
                {/* === Heading === */}
                <div data-aos="zoom-in-up" className="mb-14" >
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                        Why Choose <span className="text-blue-600 dark:text-blue-400">Appointer?</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200 text-lg">
                        Your trusted partner for fast, verified, and affordable home services 🏠
                    </p>
                </div>

                {/* === Feature Grid === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, i) => (
                        <div
                            key={i}
                            data-aos="zoom-in-up"
                            data-aos-delay={i * 100}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-full">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
