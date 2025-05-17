import React from "react";
<<<<<<< Updated upstream
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import InsightsSection from "./InsightsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <InsightsSection />
      <ContactSection />
=======
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import AboutSection from "../AboutSection";
import ServicesSection from "../ServicesSection";
import InsightsSection from "../InsightsSection";
import ContactSection from "../ContactSection";
import Footer from "../Footer";

const LandingPage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={scrollToSection} />

      <HeroSection
        companyName="PayNomad Capital"
        tagline="Empowering Your Finances"
      />

      <div id="about">
        <AboutSection />
      </div>

      <div id="services">
        <ServicesSection />
      </div>

      <div id="insights">
        <InsightsSection />
      </div>

      <div id="contact">
        <ContactSection backgroundColor="#faf4eb" />
      </div>

>>>>>>> Stashed changes
      <Footer />
    </div>
  );
};

export default LandingPage;
