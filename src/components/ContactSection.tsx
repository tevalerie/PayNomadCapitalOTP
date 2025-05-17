import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with user ID (if available in environment)
if (import.meta.env.EMAILJS_USER_ID) {
  emailjs.init(import.meta.env.EMAILJS_USER_ID);
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Get in Touch",
  subtitle = "Have questions about our financial services? Our team is ready to assist you.",
  backgroundColor = "#faf4eb",
}) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setEmailError("");

      // Retry mechanism for email sending
      const maxRetries = 3;
      let retryCount = 0;

      const sendEmailWithRetry = () => {
        // EmailJS configuration
        emailjs
          .sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_id", // Uses environment variable if available
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_id", // Uses environment variable if available
            formRef.current as HTMLFormElement,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_key", // Uses environment variable if available
          )
          .then((result) => {
            console.log("Email sent successfully:", result.text);
            setIsSubmitted(true);

            // Reset form after submission
            setFormState({
              name: "",
              email: "",
              phone: "",
              message: "",
            });
          })
          .catch((error) => {
            console.error(
              `Failed to send email (attempt ${retryCount + 1}):`,
              error.text,
            );

            if (retryCount < maxRetries) {
              retryCount++;
              const delay = 1000 * retryCount; // Exponential backoff
              console.log(`Retrying in ${delay}ms...`);
              setTimeout(sendEmailWithRetry, delay);
            } else {
              setEmailError(
                "Failed to send your message after multiple attempts. Please try again later.",
              );
            }
          })
          .finally(() => {
            if (retryCount >= maxRetries || retryCount === 0) {
              setIsLoading(false);
            }
          });
      };

      // Start the email sending process with retry mechanism
      sendEmailWithRetry();
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <Card className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
          {isSubmitted ? (
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You
              </h3>
              <p className="text-gray-700 mb-6">
                Your message has been received. Our team will contact you
                shortly.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#2c3e50] hover:bg-[#0077be] transition-colors"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="user_name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`border-gray-300 focus:border-[#0077be] focus:ring-[#0077be] ${errors.name ? "border-red-500" : ""}`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="user_email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`border-gray-300 focus:border-[#0077be] focus:ring-[#0077be] ${errors.email ? "border-red-500" : ""}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  name="user_phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-[#0077be] focus:ring-[#0077be]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className={`border-gray-300 focus:border-[#0077be] focus:ring-[#0077be] min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {emailError && <p className="text-red-500 mb-4">{emailError}</p>}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#2c3e50] hover:bg-[#0077be] transition-colors flex items-center gap-2"
                  disabled={isLoading}
                >
                  <span>{isLoading ? "Sending..." : "Send Message"}</span>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </Card>

        <div className="text-center mt-8">
          <p className="text-lg text-gray-700 mb-1">
            Prefer to reach us directly? Just send an email to:
          </p>
          <a
            href="mailto:info@paynomadcapitalltd.ca"
            className="text-[#0077be] hover:underline"
          >
            info@paynomadcapitalltd.ca
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
