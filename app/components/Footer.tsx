'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
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
  Contact
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for subscribing!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  const productLinks = [
    { href: '/products/cctv-surveillance', label: 'CCTV & Surveillance' },
    { href: '/products/networking-devices', label: 'Networking Devices' },
    { href: '/products/servers-storage', label: 'Servers & Storage' },
    { href: '/products/firewalls-security', label: 'Firewalls & Security' },
    { href: '/products/collaboration-tools', label: 'Collaboration Tools' },
    { href: '/products/cybersecurity-software', label: 'Cybersecurity Software' },
  ];

  const serviceLinks = [
    { href: '/services/enterprise-networking', label: 'Enterprise Networking' },
    { href: '/services/it-consulting', label: 'IT Consulting' },
    { href: '/services/cloud-migration', label: 'Cloud Services & Migration' },
    { href: '/services/cybersecurity', label: 'Cybersecurity Solutions' },
    { href: '/services/amc-support', label: 'AMC & Support' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Case Studies' },
    { href: '#', label: 'Blog' },
  ];

  const resourceLinks = [
    { href: '#', label: 'Product Brochures' },
    { href: '#', label: 'White Papers' },
    { href: '#', label: 'Technical Documentation' },
    { href: '#', label: 'FAQs' },
    { href: '#', label: 'Support Portal' },
    { href: '#', label: 'Partner Program' },
  ];

  const industries = [
    { icon: <Building className="w-4 h-4" />, label: 'Corporates' },
    { icon: <GraduationCap className="w-4 h-4" />, label: 'Education' },
    { icon: <Landmark className="w-4 h-4" />, label: 'Government' },
    { icon: <Server className="w-4 h-4" />, label: 'Data Centers' },
  ];

  const trustBadges = [
    { icon: <Award />, text: 'ISO 9001:2015 Certified' },
    { icon: <Shield />, text: 'Authorized Partner' },
    { icon: <Clock />, text: '24/7 Support' },
    { icon: <Headphones />, text: '500+ Projects' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Top Section - Newsletter & Trust Badges */}
        {/* <div className="border-b border-gray-800">
          <div className="container-custom py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
                    <p className="text-gray-400 text-sm">Subscribe to our newsletter for latest IT solutions & offers</p>
                  </div>
                </div>
                
                <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {trustBadges.map((badge, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-primary-500 transition-all hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center mb-2">
                      {badge.icon && React.cloneElement(badge.icon as React.ReactElement, { 
                        className: "w-5 h-5 text-primary-400" 
                      })}
                    </div>
                    <span className="text-xs font-semibold text-gray-300">{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-16">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12 mb-12">


            
            {/* Company Info - Spans 2 columns on large screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            className="lg:col-span-2"

            >
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-white font-black text-xl">SN</span>
                </div>
                <span className="text-2xl font-black text-white">Soltech Nexus</span>
              </Link>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Leading provider of enterprise-grade IT infrastructure solutions. We deliver cutting-edge networking, security, and cloud services to businesses across India.
              </p>

              {/* Industries We Serve */}
              <div className="mb-6">
                <h5 className="text-white font-semibold mb-3 text-sm">INDUSTRIES WE SERVE</h5>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs font-medium hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
                    >
                      {industry.icon}
                      {industry.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-white font-semibold mb-3 text-sm">CONNECT WITH US</h5>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all text-gray-400 hover:text-white"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                <Server className="w-5 h-5 text-primary-400" />
                Products
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="group flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-400" />
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="group flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-primary-400" />
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="group flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
 
            {/* Resources & Contact */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="lg:col-span-2"   // <-- THIS LINE IS THE FIX
>
  <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                <Contact className="w-5 h-5 text-primary-400" />
                Contact us
              </h4>

  <div className="space-y-4">

    {/* Phone */}
    <a 
      href="tel:+919023506084" 
      className="flex items-start gap-4 text-gray-400 hover:text-primary-400 transition-all group w-full max-w-full"
    >
      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-all">
        <PhoneIcon className="w-4 h-4" />
      </div>

      <div className="w-full">
        <p className="text-xs text-gray-500 mb-1">Call Us</p>
        <p className="text-sm font-semibold">+91 90235 06084</p>
      </div>
    </a>

    {/* Email */}
    <a 
      href="mailto:info@soltechnexus.com" 
      className="flex items-start gap-4 text-gray-400 hover:text-primary-400 transition-all group w-full max-w-full"
    >
      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-all">
        <Mail className="w-4 h-4" />
      </div>

      <div className="w-full">
        <p className="text-xs text-gray-500 mb-1">Email Us</p>
        <p className="text-sm font-semibold break-all">info@soltechnexus.com</p>
      </div>
    </a>

    {/* Address */}
    <div className="flex items-start gap-4 text-gray-400 w-full max-w-full">
      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
        <MapPin className="w-4 h-4" />
      </div>

      <div className="w-full">
        <p className="text-xs text-gray-500 mb-1">Visit Us</p>
        <p className="text-sm font-semibold leading-relaxed break-words">
          Vibrant Park, Survey No. 182,<br />
          Near NH 8, GIDC Phase 1,<br />
          Vapi, Gujarat - 396195, India
        </p>
      </div>
    </div>

  </div>
</motion.div>

          </div>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-800 pt-12 mb-12"
          >
            <h5 className="text-center text-white font-semibold mb-6 text-sm tracking-wider">AUTHORIZED TECHNOLOGY PARTNERS</h5>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 hover:opacity-100 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all" alt="Dell" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" className="h-10 grayscale hover:grayscale-0 transition-all" alt="Cisco" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all" alt="Microsoft" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" className="h-10 grayscale hover:grayscale-0 transition-all" alt="AWS" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all" alt="Azure" />
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {new Date().getFullYear()} <span className="text-primary-400 font-semibold">Soltech Nexus</span>. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <Link href="/privacypolicy" className="text-gray-500 hover:text-primary-400 transition-colors">Privacy Policy</Link>
                <span className="text-gray-700">•</span>
                <Link href="/termandcondition" className="text-gray-500 hover:text-primary-400 transition-colors">Terms of Service</Link>
                <span className="text-gray-700">•</span>
              </div>

              {/* <p className="text-xs text-gray-600 text-center md:text-right">
                Crafted with 💙 by <span className="text-primary-400">Divyesh Khalasi, Utkarsh Gupta, Jahnvee Singh</span>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}