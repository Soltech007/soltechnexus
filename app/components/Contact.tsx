"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  ChevronRight,
  Sparkles,
  Building,
  User,
  Loader2,
  CheckCircle2,
  Globe,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

// ✅ States and Cities Data
const statesAndCities: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  "Delhi": ["New Delhi", "South Delhi", "North Delhi", "East Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Vapi", "Bharuch"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangalore"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Varanasi"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  "Haryana": ["Gurgaon", "Faridabad", "Panipat", "Ambala"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
};

const statesList = Object.keys(statesAndCities).sort();

// ✅ Country List
const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "UAE",
  "Singapore",
  "Other",
];

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
  href?: string;
}

const InfoCard = ({ icon, title, content, href }: InfoCardProps) => {
  const CardContent = () => (
    <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-primary-300">
      <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-7 h-7 text-primary-500",
        })}
      </div>
      <div>
        <h4 className="font-bold text-lg text-gray-900 mb-1">{title}</h4>
        <p className="p-base text-gray-600">{content}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
};

// --- Reusable FAQ Item Component ---
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronRight
          className={`w-5 h-5 text-primary-500 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="p-base text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN CONTACT PAGE COMPONENT ---
export default function ContactPage() {
  // ✅ Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "India",
    state: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Custom Location States
  const [showCustomState, setShowCustomState] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [customState, setCustomState] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // ✅ Handle State Change - Update Cities
  useEffect(() => {
    if (formData.state && formData.state !== "other" && statesAndCities[formData.state]) {
      setAvailableCities(statesAndCities[formData.state]);
      setShowCustomCity(false);
      setFormData((prev) => ({ ...prev, city: "" }));
    } else if (formData.state === "other") {
      setAvailableCities([]);
      setShowCustomCity(true);
    } else {
      setAvailableCities([]);
    }
  }, [formData.state]);

  // ✅ Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle State Selection
  const handleStateChange = (value: string) => {
    if (value === "other") {
      setShowCustomState(true);
      setFormData((prev) => ({ ...prev, state: "other", city: "" }));
    } else {
      setShowCustomState(false);
      setCustomState("");
      setFormData((prev) => ({ ...prev, state: value, city: "" }));
    }
  };

  // ✅ Handle City Selection
  const handleCityChange = (value: string) => {
    if (value === "other") {
      setShowCustomCity(true);
      setFormData((prev) => ({ ...prev, city: "other" }));
    } else {
      setShowCustomCity(false);
      setCustomCity("");
      setFormData((prev) => ({ ...prev, city: value }));
    }
  };

  // ✅ Handle Form Submit - Connected to ERP
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
          padding: "16px 24px",
          borderRadius: "12px",
        },
      });
      return;
    }

    setLoading(true);

    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // ✅ Get final state and city values
      const finalState = showCustomState ? customState : formData.state;
      const finalCity = showCustomCity ? customCity : formData.city;

      // ✅ Prepare API Payload
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: formData.email,
        phone: formData.phone,
        whatsappNo: formData.phone,
        company: formData.company,
        country: formData.country,
        state: finalState,
        city: finalCity,
        source: "Contact Page",
        // Empty fields
        message: "",
        website: "",
        industry: "",
        noOfEmployees: "",
      };

      // ✅ Send to API
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        toast.success("Message Sent Successfully! 🎉", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
            fontWeight: "500",
            padding: "16px 24px",
            borderRadius: "12px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        });

        // Reset form after 3 seconds
        setTimeout(() => {
          setSuccess(false);
          setFormData({
            name: "",
            company: "",
            email: "",
            phone: "",
            country: "India",
            state: "",
            city: "",
          });
          setShowCustomState(false);
          setShowCustomCity(false);
          setCustomState("");
          setCustomCity("");
        }, 3000);
      } else {
        toast.error(data.error || "Something went wrong. Please try again.", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#EF4444",
            color: "#fff",
            fontWeight: "500",
            padding: "16px 24px",
            borderRadius: "12px",
          },
        });
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Failed to send message. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
          padding: "16px 24px",
          borderRadius: "12px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "What is the best way to get a quick quote?",
      answer:
        "For the fastest quote, please fill out our contact form with as much detail as possible about your project requirements. Our team will review it and get back to you within 24 business hours.",
    },
    {
      question: "What are your business hours?",
      answer:
        "Our standard business hours are Monday to Friday, 9:00 AM to 6:00 PM (IST). For clients with an AMC, we offer 24/7 technical support.",
    },
    {
      question: "Do you offer on-site consultations?",
      answer:
        "Yes, we do. For large-scale projects, we can arrange an on-site consultation to better understand your infrastructure and requirements. Please mention this in your contact message.",
    },
    {
      question: "Where is your office located?",
      answer:
        "Our head office is located in Surat, Gujarat. You can find the full address and a map on this page. We serve clients across India and internationally.",
    },
  ];

  // Common input class
  const inputClass =
    "block w-full px-4 py-3 pl-10 text-base text-gray-900 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:opacity-50";

  const selectClass =
    "block w-full px-4 py-3 text-base text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:opacity-50";

  return (
    <div className="w-full bg-white">
      {/* Toast Container */}
      <Toaster />

      {/* HERO */}
      <section className="section-blue text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsla(0,0%,100%,.2) 1px, transparent 1px)",
            backgroundSize: "2rem 2rem",
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="badge mb-6 bg-primary-600">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white">GET IN TOUCH</span>
            </div>
            <h1 className="h1 text-white mb-6">
              Let's Build Something Great Together
            </h1>
            <p className="p-large max-w-3xl mx-auto text-primary-100">
              Have a project in mind or just want to learn more? We're here to
              help. Reach out to us, and let's start the conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM & INFO SECTION */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
              {/* ✅ Success State */}
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                >
                  <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                  <p className="text-gray-600 max-w-sm">
                    We have received your details. Our team will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="h2 mb-4">Send Us a Message</h2>
                  <p className="p-base text-gray-600 mb-8">
                    Our team will get back to you within one business day.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Company */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className={inputClass}
                            placeholder="Your Name"
                          />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Company
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            disabled={loading}
                            className={inputClass}
                            placeholder="Your Company Name"
                          />
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className={inputClass}
                            placeholder="you@company.com"
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className={inputClass}
                            placeholder="+91 90235 06084"
                          />
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* ✅ Country */}
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Country *
                      </label>
                      <div className="relative">
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className={`${selectClass} pl-10`}
                        >
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* ✅ State & City */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* State */}
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          State
                        </label>
                        <select
                          id="state"
                          name="state"
                          value={showCustomState ? "other" : formData.state}
                          onChange={(e) => handleStateChange(e.target.value)}
                          disabled={loading}
                          className={selectClass}
                        >
                          <option value="">Select State</option>
                          {statesList.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                          <option value="other">➕ Other</option>
                        </select>
                        {showCustomState && (
                          <input
                            type="text"
                            placeholder="Enter State"
                            value={customState}
                            onChange={(e) => setCustomState(e.target.value)}
                            disabled={loading}
                            className={`${selectClass} mt-2`}
                          />
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          City
                        </label>
                        <select
                          id="city"
                          name="city"
                          value={showCustomCity && !showCustomState ? "other" : formData.city}
                          onChange={(e) => handleCityChange(e.target.value)}
                          disabled={loading || (!formData.state && !showCustomState)}
                          className={selectClass}
                        >
                          <option value="">
                            {!formData.state && !showCustomState
                              ? "Select State First"
                              : showCustomState
                              ? "Enter City Below"
                              : "Select City"}
                          </option>
                          {!showCustomState &&
                            availableCities.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          {!showCustomState && formData.state && (
                            <option value="other">➕ Other</option>
                          )}
                        </select>
                        {(showCustomCity || showCustomState) && (
                          <input
                            type="text"
                            placeholder="Enter City"
                            value={customCity}
                            onChange={(e) => setCustomCity(e.target.value)}
                            disabled={loading}
                            className={`${selectClass} mt-2`}
                          />
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full text-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8 lg:mt-4"
            >
              <h2 className="h3">Other Ways to Connect</h2>
              <InfoCard
                icon={<Mail />}
                title="Email Us"
                content="contact@soltechnexus.com"
                href="mailto:contact@soltechnexus.com"
              />
              <InfoCard
                icon={<Phone />}
                title="Call Us"
                content="+91 90235 06084"
                href="tel:+919023506084"
              />
              <InfoCard
                icon={<MapPin />}
                title="Our Office"
                content={
                  <>
                    Vibrant Park, Survey No. 182 Near NH 8,<br />
                    GIDC Phase 1, Vapi, Gujarat - 396195, India
                  </>
                }
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="h2 mb-4">Visit Our Office</h2>
            <p className="p-large text-gray-600 max-w-2xl mx-auto">
              We're located in the heart of the city. Come say hello!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2224.2330158537843!2d72.91013183937065!3d20.354043977963887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1763448898464!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="h2 mb-4">Frequently Asked Questions</h2>
            <p className="p-large text-gray-600 max-w-2xl mx-auto">
              Have questions? We've got answers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}