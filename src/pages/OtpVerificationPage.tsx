import React from "react";
<<<<<<< Updated upstream
=======
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OtpVerificationForm from "../components/OtpVerificationForm";

<<<<<<< Updated upstream
const OtpVerificationPage = () => {
  return (
    <div className="min-h-screen bg-[#faf4eb] flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-r from-[#2c3e50] to-[#0077be] p-6 rounded-t-lg text-center shadow-md">
            <h1
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              style={{
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Verify Your Email
            </h1>
          </div>
          <OtpVerificationForm />
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-2">
              <a
                href="/#about"
                className="text-sm text-gray-600 hover:text-[#0077be] transition-colors"
              >
                About Us
              </a>
              <a
                href="/#services"
                className="text-sm text-gray-600 hover:text-[#0077be] transition-colors"
              >
                Services
              </a>
              <a
                href="/#insights"
                className="text-sm text-gray-600 hover:text-[#0077be] transition-colors"
              >
                Insights
              </a>
              <a
                href="/#contact"
                className="text-sm text-gray-600 hover:text-[#0077be] transition-colors"
              >
                Contact
=======
interface OtpVerificationPageProps {
  email: string | null;
  onVerificationSuccess?: () => void;
}

const OtpVerificationPage: React.FC<OtpVerificationPageProps> = ({
  email,
  onVerificationSuccess,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar
        onNavigate={(sectionId) => {
          window.location.href = `/#${sectionId}`;
        }}
      />

      {/* Mini Hero Section */}
      <div className="bg-[#2C3E50] h-[240px] flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wider font-serif">
          Email Verification
        </h1>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 mb-16">
        <div className="max-w-[480px] mx-auto">
          <OtpVerificationForm
            email={email || ""}
            onBack={handleBack}
            onVerificationSuccess={onVerificationSuccess}
          />

          {/* Quick Links */}
          <div className="text-center text-sm space-y-2 mt-6">
            <div>
              <span className="text-gray-600">Return to </span>
              <a
                href="/"
                className="text-[#0077BE] underline hover:text-[#6B96C3]"
              >
                Home Page
              </a>
            </div>
            <div>
              <span className="text-gray-600">Already verified? </span>
              <a
                href="https://ebank.paynomadcapital.com/login"
                className="text-[#0077BE] underline hover:text-[#6B96C3]"
              >
                Sign In
>>>>>>> Stashed changes
              </a>
            </div>
          </div>
        </div>
      </div>

<<<<<<< Updated upstream
      <Footer />
=======
      <div className="mt-auto">
        <Footer />
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default OtpVerificationPage;
