<<<<<<< Updated upstream
import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import SignupPage from "./pages/SignupPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import ErrorBoundary from "./components/ErrorBoundary";
import LandingPage from "./components/landing/LandingPage";
import routes from "tempo-routes";

function App() {
  console.log("App rendering, Home component available:", !!Home);

  // Use the routes with useRoutes hook when in Tempo environment
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;
=======
import { Routes, Route, Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import SignupPage from "./pages/SignupPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import { useState, useEffect, ReactNode } from "react";

// RequireEmailForOtp component to guard the OTP verification route
interface RequireEmailForOtpProps {
  children: ReactNode;
  verifyingEmail: string | null;
}

const RequireEmailForOtp = ({
  children,
  verifyingEmail,
}: RequireEmailForOtpProps) => {
  if (!verifyingEmail) {
    return <Navigate to="/register" replace />;
  }
  return <>{children}</>;
};

function App() {
  // Initialize verifyingEmail from sessionStorage
  const [verifyingEmail, setVerifyingEmail] = useState<string | null>(() => {
    return sessionStorage.getItem("verifyingEmail");
  });

  // Function to update verifyingEmail in state and sessionStorage
  const handleSetVerifyingEmail = (email: string) => {
    setVerifyingEmail(email);
    sessionStorage.setItem("verifyingEmail", email);
  };

  // Function to clear verifyingEmail from state and sessionStorage
  const clearVerifyingEmail = () => {
    setVerifyingEmail(null);
    sessionStorage.removeItem("verifyingEmail");
  };
>>>>>>> Stashed changes

  return (
    <ErrorBoundary>
      {tempoRoutes}
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <div className="bg-white min-h-screen">
              <Home />
            </div>
          }
        />
        <Route path="/newsignup" element={<SignupPage />} />
        <Route path="/OTPVerification" element={<OtpVerificationPage />} />
=======
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<SignupPage setVerifyingEmail={handleSetVerifyingEmail} />}
        />
        <Route
          path="/verify"
          element={
            <RequireEmailForOtp verifyingEmail={verifyingEmail}>
              <OtpVerificationPage
                email={verifyingEmail}
                onVerificationSuccess={clearVerifyingEmail}
              />
            </RequireEmailForOtp>
          }
        />
        {/* Add more routes as needed */}
>>>>>>> Stashed changes

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
