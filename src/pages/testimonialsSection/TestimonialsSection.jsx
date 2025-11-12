import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

// ✅ Sample Testimonials Data
const testimonials = [
    {
        name: "Shobhit Kumar",
        role: "Customer",
        text: "Booking was super easy and quick! 👏 Loved how fast the service was.",
        img: "https://i.pravatar.cc/100?img=1",
        rating: 5,
    },
    {
        name: "Neha Verma",
        role: "Verified User",
        text: "Very professional and polite staff. The electrician fixed everything perfectly. ⚡",
        img: "https://i.pravatar.cc/100?img=2",
        rating: 5,
    },
    {
        name: "Rohit Sharma",
        role: "Customer",
        text: "Affordable prices and amazing customer support. Highly recommended! 💰",
        img: "https://i.pravatar.cc/100?img=3",
        rating: 4,
    },
    {
        name: "Priya Mehta",
        role: "Homeowner",
        text: "Got a plumber within 20 minutes! Fast, reliable and secure payments. 💧",
        img: "https://i.pravatar.cc/100?img=4",
        rating: 5,
    },
    {
        name: "Amit Tiwari",
        role: "Customer",
        text: "Easy to use app and transparent pricing. Everything was perfect! 🌟",
        img: "https://i.pravatar.cc/100?img=5",
        rating: 4,
    },
];

const TestimonialsSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: false,
            mirror: true,
        });
    }, []);

    return (
        <section id="testimonials" className="pt-20 pb-10 bg-[#f8faff] dark:bg-[#0c111c] text-center">
            <div className="max-w-6xl mx-auto px-6">
                {/* === Section Heading === */}
                <div data-aos="fade-up" className="mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                        💖 What Our <span className="text-blue-600 dark:text-blue-400">Customers Say</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200 text-lg">
                        Real reviews from our trusted users and happy customers ✨
                    </p>
                </div>

                {/* === Swiper Carousel === */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10"
                >
                    {testimonials.map((review, i) => (
                        <SwiperSlide key={i}>
                            <motion.div
                                data-aos="zoom-in-up"
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 mx-2"
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    {/* Profile Image */}
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-600 shadow-md">
                                        <img
                                            src={review.img}
                                            alt={review.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Name & Role */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                                            {review.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-200">{review.role}</p>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex justify-center text-yellow-400">
                                        {Array.from({ length: review.rating }).map((_, index) => (
                                            <FaStar key={index} />
                                        ))}
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed ">
                                        “{review.text}”
                                    </p>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialsSection;

