import React from 'react';
import BannerSection from './bannerSection/BannerSection.jsx';
import ServicesSection from './servicesSection/ServicesSection.jsx';
import WhyChooseSection from './whyChooseSection/WhyChooseSection.jsx';
import HowItWorksSection from './howItWorksSection/HowItWorksSection.jsx';
import TestimonialsSection from './testimonialsSection/TestimonialsSection.jsx';
import ContactSection from './contactSection/ContactSection.jsx';
import CTASection from './ctaSection/CTASection.jsx';
import AboutSection from './aboutSection/AboutSection.jsx';

export default function Home() {
    return (
        <>
            <BannerSection />
            <AboutSection />
            <ServicesSection />
            <WhyChooseSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <CTASection />
            <ContactSection />
        </>
    );
}


