import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import logoDark from "../../assets/images/logo-dark.webp";
import logoLight from "../../assets/images/logo-light.webp";

const Footer = () => {
    const footerLinks = [
        {
            title: "For Customers",
            delay: "100",
            links: [
                { label: "How It Works", href: "#how-it-works" },
                { label: "Find Services", href: "#services" },
                { label: "Safety", href: "#safety" }
            ]
        },
        {
            title: "For Providers",
            delay: "200",
            links: [
                { label: "Join as Provider", href: "#join" },
                { label: "Success Stories", href: "#stories" },
                { label: "Support", href: "#support" }
            ]
        },
        {
            title: "Company",
            delay: "300",
            links: [
                { label: "About Us", href: "#about" },
                { label: "Contact", href: "#contact" },
                { label: "Privacy Policy", href: "#privacy" }
            ]
        }
    ];
    const { theme } = useTheme();
    return (
        <footer className="relative bg-gradient-to-b from-[#ebf1fe] to-[#eef4ff] dark:from-[#0b1120] dark:to-[#111827] text-gray-700 dark:text-gray-300 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-5">
                {/* === Top Grid === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-200 dark:border-gray-700 pb-10">
                    {/* Logo + Description */}
                    <div data-aos="fade-up">
                        {/* <h3 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-3">
                            Appointer
                        </h3> */}
                        <img
                            src={theme === "dark" ? logoLight : logoDark}
                            alt="Appointer Logo"
                            className="h-10 mb-3"
                        />
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Connecting communities with{" "}
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                                trusted local services
                            </span>
                            . Book experts for your needs with confidence and ease.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-6">
                            {[
                                { Icon: FaFacebook, color: "hover:bg-blue-600" },
                                { Icon: FaTwitter, color: "hover:bg-sky-500" },
                                { Icon: FaInstagram, color: "hover:bg-pink-500" },
                                { Icon: FaLinkedin, color: "hover:bg-blue-800" },
                            ].map(({ Icon, color }, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className={`p-2 bg-white dark:bg-gray-800 shadow-md rounded-full ${color} hover:text-white transition-all duration-300`}
                                >
                                    <Icon className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((section, index) => (
                        <div
                            key={section.title}
                            data-aos="fade-up"
                            data-aos-delay={section.delay}
                        >
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 relative">
                                {section.title}
                                <span className="absolute left-0 -bottom-1 w-10 h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                            </h4>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="hover:text-blue-600 dark:hover:text-blue-600 dark:text-blue-400 transition"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* === Bottom Section === */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-3 pt-5">
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                            Appointer
                        </span>
                        . All rights reserved.
                    </p>
                    <p>
                        Made with ❤️ by{" "}
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                            Raj Soni
                        </span>
                    </p>
                </div>
            </div>

            {/* Subtle Glow Bar at Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-green-400 blur-[1px] opacity-70"></div>
        </footer>
    );
};

export default Footer;

