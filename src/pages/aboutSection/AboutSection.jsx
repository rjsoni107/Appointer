import React from "react";
import "aos/dist/aos.css";
import aboutImg from "../../assets/images/about-img.webp";

const AboutSection = () => {

    return (
        <section
            id="about"
            className="bg-[#f9fbff] dark:bg-[#0c111c] py-20 text-gray-800 dark:text-gray-300 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-12">
                {/* === Left Image === */}
                <div
                    data-aos="zoom-in"
                    data-aos-duration="1000"
                    data-aos-delay="50"
                    className="flex-1 flex justify-center lg:justify-start"
                >
                    <img
                        src={aboutImg}
                        alt="About Appointer"
                        className="rounded-2xl max-w-sm sm:max-w-md lg:max-w-lg object-cover"
                    />
                </div>

                {/* === Right Content === */}
                <div
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="50"
                    className="flex-1 space-y-6 text-center lg:text-left"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
                        About <span className="text-blue-600 dark:text-blue-400">Appointer</span>
                    </h2>

                    <p className="text-gray-600 dark:text-gray-200 text-md leading-relaxed">
                        Appointer connects you with trusted local professionals — from home
                        repairs to beauty and cleaning services. Our goal is to make finding
                        and booking reliable service providers as easy as a few clicks.
                    </p>

                    <p className="text-gray-600 dark:text-gray-200 text-md leading-relaxed">
                        With verified providers, secure payments, and thousands of happy
                        customers, we’re redefining how local services work. Whether you’re
                        a customer or a service provider, Appointer is here to make life
                        easier and smarter.
                    </p>

                    {/* === Mini Stats === */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 text-center hover:shadow-xl transition-all duration-300">
                            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</h3>
                            <p className="text-gray-500 dark:text-gray-200 text-sm font-medium">
                                Happy Customers
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 text-center hover:shadow-xl transition-all duration-300">
                            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">1.5K+</h3>
                            <p className="text-gray-500 dark:text-gray-200 text-sm font-medium">
                                Verified Providers
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 text-center hover:shadow-xl transition-all duration-300">
                            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">98%</h3>
                            <p className="text-gray-500 dark:text-gray-200 text-sm font-medium">Satisfaction</p>
                        </div>
                    </div>

                    {/* === CTA Button === */}
                    <div className="pt-6">
                        <a
                            href="#services"
                            className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:text-white hover:bg-blue-300 dark:hover:bg-blue-600 transition-all duration-300"
                        >
                            Explore Our Services
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
