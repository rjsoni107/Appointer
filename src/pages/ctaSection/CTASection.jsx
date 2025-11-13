import React from "react";
import { useDispatch } from "react-redux";
import { closeLogin, openProviderRegister } from "../../store/reducerSlice/modalSlice";

const CTASection = () => {
    const dispatch = useDispatch();
    const onOpenProviderRegister = () => {
        dispatch(closeLogin());
        setTimeout(() => dispatch(openProviderRegister()), 0);
    }

    return (
        <section
            id="cta"
            className="pt-20 pb-10 bg-[#ebf1fe] dark:bg-[#111827] text-center flex flex-col items-center justify-center"
        >
            {/* Heading */}
            <div data-aos="fade-up" className="mb-6">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    Ready to <span className="text-blue-600 dark:text-blue-400">Get Started?</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-200 text-lg">
                    Join thousands of satisfied customers and grow your business with{" "}
                    <span className="text-blue-600 font-medium dark:text-blue-400">Appointer.</span>
                </p>
            </div>

            {/* Buttons */}
            <div data-aos="zoom-in" className="flex flex-wrap justify-center gap-6 mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Find Services Now
                </button>

                <button
                    type="button"
                    onClick={onOpenProviderRegister}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Become a Provider
                </button>
            </div>
        </section>
    );
};

export default CTASection;
