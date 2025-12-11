"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  ChevronRight,
  Send,
  Award,
  Clock,
  Shield,
  Headphones,
  MapPin,
  Mail,
  Phone as PhoneIcon,
  Building,
  GraduationCap,
  Landmark,
  Server,
  Globe,
  Contact,
  Loader2,
  CheckCircle,
  Bell,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import React from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        // Handle specific error messages
        if (data.error?.includes("Contact already exist")) {
          setError("You're already subscribed! 📧");
        } else {
          setError(data.error || "Something went wrong. Please try again.");
        }
        // Reset error message after 5 seconds
        setTimeout(() => setError(""), 5000);
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setError("Network error. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const productLinks = [
    { href: "/products/cctv-surveillance", label: "CCTV & Surveillance" },
    { href: "/products/networking-devices", label: "Networking Devices" },
    { href: "/products/servers-storage", label: "Servers & Storage" },
    { href: "/products/firewalls-security", label: "Firewalls & Security" },
    { href: "/products/collaboration-tools", label: "Collaboration Tools" },
    {
      href: "/products/cybersecurity-software",
      label: "Cybersecurity Software",
    },
  ];

  const serviceLinks = [
    { href: "/services/enterprise-networking", label: "Enterprise Networking" },
    { href: "/services/it-consulting", label: "IT Consulting" },
    { href: "/services/cloud-migration", label: "Cloud Services & Migration" },
    { href: "/services/cybersecurity", label: "Cybersecurity Solutions" },
    { href: "/services/amc-support", label: "AMC & Support" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "#", label: "Become a Partner" },
  ];

  const resourceLinks = [
    { href: "#", label: "Product Brochures" },
    { href: "#", label: "White Papers" },
    { href: "#", label: "Technical Documentation" },
    { href: "#", label: "FAQs" },
    { href: "#", label: "Support Portal" },
    { href: "#", label: "Partner Program" },
  ];

  const industries = [
    { icon: <Building className="w-3 h-3 sm:w-4 sm:h-4" />, label: "Corporates" },
    { icon: <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />, label: "Education" },
    { icon: <Landmark className="w-3 h-3 sm:w-4 sm:h-4" />, label: "Government" },
    { icon: <Server className="w-3 h-3 sm:w-4 sm:h-4" />, label: "Data Centers" },
  ];

  const trustBadges = [
    { icon: <Award />, text: "ISO 9001:2015 Certified" },
    { icon: <Shield />, text: "Authorized Partner" },
    { icon: <Clock />, text: "24/7 Support" },
    { icon: <Headphones />, text: "500+ Projects" },
  ];

  return (
    <footer className="bg-white text-gray-700 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Newsletter Section - Gray Background */}
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12"
            >
              {/* Newsletter Text */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                    {/* <Bell className="w-5 h-5 text-white" /> */}
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    Subscribe to Our Newsletter
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base max-w-md lg:pl-12">
                  Stay updated with the latest IT solutions, industry insights, and exclusive offers.
                </p>
              </div>

              {/* Newsletter Form */}
              <div className="w-full lg:w-auto">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                  <div className="relative flex-1 sm:min-w-[300px] lg:min-w-[350px]">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent text-sm sm:text-base shadow-sm"
                      required
                        id="new"
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="submit"
                    id="news"
                    disabled={isSubmitting || !email}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-primary-700 hover:bg-primary-800 disabled:bg-primary-700 text-white font-semibold rounded-lg sm:rounded-l-none sm:rounded-r-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span className="hidden sm:inline">Subscribing...</span>
                        <span className="sm:hidden">Wait...</span>
                      </>
                    ) : isSubscribed ? (
                      <>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </form>
                
                {/* Success Message */}
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-sm mt-2 text-center sm:text-left font-medium flex items-center justify-center sm:justify-start gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    🎉 Thank you for subscribing! Check your inbox soon.
                  </motion.p>
                )}
                
                {/* Error Message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm mt-2 text-center sm:text-left font-medium flex items-center justify-center sm:justify-start gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-7 gap-6 sm:gap-8 lg:gap-12 mb-12">
            {/* Company Info - Full width on mobile, Spans 2 columns on large screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-2 lg:col-span-2"
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 font-bold flex-shrink-0 mb-4 sm:mb-6"
              >
                <div className="h-16 sm:h-20 w-[100px] sm:w-[120px] overflow-hidden flex items-center justify-center">
                  <img
                    src="/logoo.webp"
                    alt="logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </Link>

              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                Leading provider of enterprise-grade IT infrastructure
                solutions. We deliver cutting-edge networking, security, and
                cloud services to businesses across India.
              </p>

              {/* Industries We Serve */}
              <div className="mb-4 sm:mb-6">
                <h5 className="text-gray-900 font-semibold mb-3 text-xs sm:text-sm">
                  INDUSTRIES WE SERVE
                </h5>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-lg text-[10px] sm:text-xs font-medium hover:bg-primary-700 hover:text-white transition-all cursor-pointer"
                    >
                      {industry.icon}
                      <span className="whitespace-nowrap">{industry.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-gray-900 font-semibold mb-3 text-xs sm:text-sm">
                  CONNECT WITH US
                </h5>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href="https://www.linkedin.com/company/soltech-nexus/"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-700 hover:scale-110 transition-all text-gray-600 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  {/* <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-700 hover:scale-110 transition-all text-gray-600 hover:text-white"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a> */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61584477085968"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-700 hover:scale-110 transition-all text-gray-600 hover:text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/soltechnexus/"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-700 hover:scale-110 transition-all text-gray-600 hover:text-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-700 hover:scale-110 transition-all text-gray-600 hover:text-white"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Products - Side by side with Services on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-1 lg:col-span-1"
            >
              <h4 className="text-gray-900 text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary-700" />
                Products
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-1.5 sm:gap-2 text-gray-600 hover:text-primary-700 transition-all"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs lg:text-sm leading-tight">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services - Side by side with Products on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-1 lg:col-span-1"
            >
              <h4 className="text-gray-900 text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary-700" />
                Services
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-1.5 sm:gap-2 text-gray-600 hover:text-primary-700 transition-all"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs lg:text-sm leading-tight">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company - Side by side with Contact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-1 lg:col-span-1"
            >
              <h4 className="text-gray-900 text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary-700" />
                Company
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-1.5 sm:gap-2 text-gray-600 hover:text-primary-700 transition-all"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs lg:text-sm leading-tight">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact - Side by side with Company on mobile, Spans 2 columns on large screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-1 lg:col-span-2"
            >
              <h4 className="text-gray-900 text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                <Contact className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary-700" />
                Contact
              </h4>

              <div className="space-y-3 sm:space-y-4">
                {/* Phone */}
                <a
                  href="tel:+919023506084"
                  className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-gray-600 hover:text-primary-700 transition-all group"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-all flex-shrink-0">
                    <PhoneIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 mb-0.5 sm:mb-1">Call Us</p>
                    <p className="text-[10px] sm:text-xs lg:text-sm font-semibold">+91 90235 06084</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@soltechnexus.com"
                  className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-gray-600 hover:text-primary-700 transition-all group"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-all flex-shrink-0">
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 mb-0.5 sm:mb-1">Email Us</p>
                    <p className="text-[10px] sm:text-xs lg:text-sm font-semibold break-all">
                      contact@soltechnexus.com
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-gray-600">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 mb-0.5 sm:mb-1">Visit Us</p>
                    <p className="text-[10px] sm:text-xs lg:text-sm font-semibold leading-relaxed">
                      Vibrant Park, Survey No. 182,
                      <br />
                      Near NH 8, GIDC Phase 1,
                      <br />
                      Vapi, Gujarat - 396195
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
                © {new Date().getFullYear()}{" "}
                <span className="text-primary-700 font-semibold">
                  Soltech Nexus
                </span>
                {" "}- A vertical of{" "}
                <a 
                  href="https://soltechtechservices.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-700 font-semibold hover:text-primary-600 hover:underline transition-all"
                >
                  SOLTECH TechServices Pvt Ltd
                </a>
                . All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <Link
                  href="/privacypolicy"
                  className="text-gray-500 hover:text-primary-700 transition-colors whitespace-nowrap"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <Link
                  href="/termandcondition"
                  className="text-gray-500 hover:text-primary-700 transition-colors whitespace-nowrap"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}