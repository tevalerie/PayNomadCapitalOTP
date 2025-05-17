import React, { useState, useEffect } from "react";
<<<<<<< Updated upstream
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerificationForm = () => {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from session storage (set during registration)
    const storedEmail = sessionStorage.getItem("registrationEmail");
    const storedName = sessionStorage.getItem("registrationName");

    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email in session storage, redirect back to signup
      navigate("/newsignup");
    }

    if (storedName) {
      setName(storedName);
    }
  }, [navigate]);
=======
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

interface OtpVerificationFormProps {
  email?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
  onBack?: () => void;
  onVerificationSuccess?: () => void;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  email = "",
  onVerify,
  onResend,
  onBack,
  onVerificationSuccess,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError(null);
    }
  };
>>>>>>> Stashed changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

<<<<<<< Updated upstream
    if (!otp || otp.length !== 6) {
      setStatus("error");
      setMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setStatus("loading");
    setMessage("Verifying your OTP...");

    try {
      // Verify OTP via Netlify function
      const response = await axios.post("/.netlify/functions/verify-otp", {
=======
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Make API call to verify OTP
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, {
>>>>>>> Stashed changes
        email,
        otp,
      });

<<<<<<< Updated upstream
      if (response.status === 200) {
        setStatus("success");
        setMessage("Email verified successfully!");

        // Redirect to ebanking after a delay
        setTimeout(() => {
          window.location.href = `https://ebank.paynomadcapital.com/signup?email=${encodeURIComponent(email)}`;
        }, 2000);
      } else {
        setStatus("error");
        setMessage(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setStatus("error");
      setMessage(
        err.response?.data?.message ||
          "An error occurred during verification. Please try again.",
      );
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setStatus("error");
      setMessage("Email address not found. Please go back to registration.");
      return;
    }

    setStatus("loading");
    setMessage("Sending new OTP...");

    try {
      // Generate new OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

      // Update OTP in Google Sheets via submit-application function
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "/.netlify/functions";
      const updateResponse = await axios.post(
        `${API_BASE_URL}/submit-application`,
        {
          email,
          otp: newOtp,
          resend: true,
        },
      );

      if (updateResponse.status !== 200) {
        throw new Error(
          updateResponse.data.message || "Failed to generate new OTP",
        );
      }

      setStatus("idle");
      setMessage("New OTP sent! Please check your email.");
    } catch (err: any) {
      console.error("Resend OTP error:", err);
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Failed to resend OTP. Please try again.",
      );
=======
      console.log("OTP verification response:", response.data);

      // Call the onVerify callback if provided
      if (onVerify) {
        onVerify(otp);
      }

      // Show success message
      setSuccessMessage("Email verified successfully! Redirecting...");

      // Call onVerificationSuccess to clear email from sessionStorage
      if (onVerificationSuccess) {
        onVerificationSuccess();
      }

      // Redirect to the URL provided by the backend after a delay
      if (response.data.redirectUrl) {
        setTimeout(() => {
          window.location.href = response.data.redirectUrl;
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      setError(
        error.response?.data?.message ||
          "Failed to verify code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setCountdown(60);
    setError(null);

    try {
      // Make API call to resend OTP
      const response = await axios.post(`${API_BASE_URL}/submit-application`, {
        email,
      });

      console.log("OTP resend response:", response.data);

      // Show success message
      setSuccessMessage("A new verification code has been sent to your email.");

      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      if (onResend) {
        onResend();
      }
    } catch (error: any) {
      console.error("Error resending OTP:", error);
      setError(
        error.response?.data?.message ||
          "Failed to resend code. Please try again.",
      );
      // Reset the countdown if there was an error
      setCanResend(true);
      setCountdown(0);
>>>>>>> Stashed changes
    }
  };

  return (
<<<<<<< Updated upstream
    <Card className="max-w-md w-full bg-white rounded-lg shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-[#2c3e50]">
          Verify Your Email
        </CardTitle>
        {email && (
          <CardDescription className="text-gray-600">{email}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {status === "success" ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-green-600 font-medium text-center">{message}</p>
            <p className="text-gray-500 text-sm text-center">
              Redirecting to dashboard...
            </p>
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#0077be] animate-pulse"></div>
            </div>
          </div>
        ) : status === "error" ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-red-100 p-3">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <p className="text-red-600 font-medium text-center">{message}</p>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  className="flex-1 bg-[#0077be] hover:bg-[#0066a6]"
                >
                  Verify
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendOtp}
                  className="flex-1 border-[#0077be] text-[#0077be] hover:bg-[#0077be] hover:text-white"
                >
                  Resend OTP
                </Button>
              </div>
            </form>
            <Button
              variant="link"
              onClick={() => navigate("/newsignup")}
              className="text-[#0077be]"
            >
              Back to Registration
            </Button>
          </div>
        ) : status === "loading" ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-[#0077be] animate-spin" />
            <p className="text-gray-600">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <p className="text-center text-gray-600">
                We've sent a 6-digit verification code to your email. Please
                enter it below to verify your account. The code is valid for 15
                minutes.
              </p>
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                type="submit"
                className="flex-1 bg-[#0077be] hover:bg-[#0066a6]"
              >
                Verify
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOtp}
                className="flex-1 border-[#0077be] text-[#0077be] hover:bg-[#0077be] hover:text-white"
              >
                Resend OTP
              </Button>
            </div>
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => navigate("/newsignup")}
                className="text-[#0077be]"
              >
                Back to Registration
              </Button>
            </div>
          </form>
        )}
      </CardContent>
=======
    <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-[#2c3e50] mb-6 text-center">
        Verify Your Email
      </h2>

      {successMessage ? (
        <div className="text-center p-4 bg-green-50 rounded-md text-green-700 mb-4">
          {successMessage}
        </div>
      ) : (
        <>
          <p className="text-center text-gray-600 mb-6">
            We've sent a verification code to{" "}
            <span className="font-medium">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                value={otp}
                onChange={handleChange}
                className={error ? "border-red-500" : ""}
                placeholder="Enter 6-digit code"
                inputMode="numeric"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || otp.length !== 6}
              className="w-full bg-[#0077BE] text-white uppercase tracking-wider py-3 rounded-lg font-medium hover:bg-[#6B96C3] transition-colors"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>

            <div className="flex justify-between items-center">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-[#0077BE] hover:underline text-sm"
                >
                  Back to email entry
                </button>
              )}

              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm ${canResend ? "text-[#0077BE] hover:underline" : "text-gray-400"}`}
              >
                {canResend ? "Resend code" : `Resend code in ${countdown}s`}
              </button>
            </div>
          </form>
        </>
      )}
>>>>>>> Stashed changes
    </Card>
  );
};

export default OtpVerificationForm;
