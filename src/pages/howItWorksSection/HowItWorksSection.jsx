import React from "react";
import { FaSearch, FaCalendarAlt, FaCog } from "react-icons/fa";

const steps = [
    {
        icon: <FaSearch className="text-4xl text-blue-600" />,
        title: "Find Services",
        desc: "Search and explore nearby professionals in just a few clicks.",
    },
    {
        icon: <FaCalendarAlt className="text-4xl text-red-500" />,
        title: "Book Instantly",
        desc: "Select your time slot and confirm booking — it’s super fast.",
    },
    {
        icon: <FaCog className="text-4xl text-green-600" />,
        title: "Service Execution",
        desc: "Your assigned provider arrives on time and completes the task efficiently.",
    },
];

const HowItWorksSection = () => {

    return (
        <section id="how-it-works" className="pt-20 pb-10 bg-[#ebf1fe] dark:bg-[#111827] text-center">
            <div className="max-w-7xl mx-auto px-6">
                {/* === Heading === */}
                <div data-aos="zoom-in-up" className="mb-14">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                        How It <span className="text-blue-600 dark:text-blue-400">Works</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200 text-lg">
                        Simple steps to book trusted local experts on{" "}
                        <span className="font-semibold text-blue-500 dark:text-blue-400">Appointer ⚡</span>
                    </p>
                </div>

                {/* === Steps Grid === */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            data-aos="flip-right"
                            data-aos-delay={i * 150}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
