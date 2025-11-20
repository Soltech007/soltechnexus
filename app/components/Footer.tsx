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
} from "lucide-react";
import { useState } from "react";
import React from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert("Thank you for subscribing!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
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
    { href: "#", label: "Blog" },
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
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
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
                    src="/logoo.jpg"
                    alt="logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </Link>

              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                Leading provider of enterprise-grade IT infrastructure
                solutions. We deliver cutting-edge networking, security, and
                cloud services to businesses across India.
              </p>

              {/* Industries We Serve */}
              <div className="mb-4 sm:mb-6">
                <h5 className="text-white font-semibold mb-3 text-xs sm:text-sm">
                  INDUSTRIES WE SERVE
                </h5>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800 text-gray-300 rounded-lg text-[10px] sm:text-xs font-medium hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
                    >
                      {industry.icon}
                      <span className="whitespace-nowrap">{industry.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-white font-semibold mb-3 text-xs sm:text-sm">
                  CONNECT WITH US
                </h5>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href="https://www.linkedin.com/company/soltech-nexus/"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
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
              <h4 className="text-white text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary-400" />
                Products
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-1.5 sm:gap-2 text-gray-400 hover:text-primary-400 transition-all"
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
              <h4 className="text-white text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary-400" />
                Services
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-1.5 sm:gap-2 text-gray-400 hover:text-primary-400 transition-all"
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
              <h4 className="text-white text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary-400" />
                Company
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-1.5 sm:gap-2 text-gray-400 hover:text-primary-400 transition-all"
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
              <h4 className="text-white text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                <Contact className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary-400" />
                Contact
              </h4>

              <div className="space-y-3 sm:space-y-4">
                {/* Phone */}
                <a
                  href="tel:+919023506084"
                  className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-gray-400 hover:text-primary-400 transition-all group"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-all flex-shrink-0">
                    <PhoneIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 mb-0.5 sm:mb-1">Call Us</p>
                    <p className="text-[10px] sm:text-xs lg:text-sm font-semibold">+91 90235 06084</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@soltechnexus.com"
                  className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-gray-400 hover:text-primary-400 transition-all group"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-all flex-shrink-0">
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 mb-0.5 sm:mb-1">Email Us</p>
                    <p className="text-[10px] sm:text-xs lg:text-sm font-semibold break-all">
                      info@soltechnexus.com
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-gray-400">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
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
          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
                © {new Date().getFullYear()}{" "}
                <span className="text-primary-400 font-semibold">
                  Soltech Nexus
                </span>
                . All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <Link
                  href="/privacypolicy"
                  className="text-gray-500 hover:text-primary-400 transition-colors whitespace-nowrap"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-700 hidden sm:inline">•</span>
                <Link
                  href="/termandcondition"
                  className="text-gray-500 hover:text-primary-400 transition-colors whitespace-nowrap"
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