"use client";
import HeroSlider from "@/app/components/Hero";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { CarouselDemo } from "@/app/components/CaseStudy"; // <-- CORRECT IMPORT PATH
import { Award, Calendar, ShieldCheck, Users } from "lucide-react";
import BrandLogoSlider from "./BrandLogoSlider";
import React from "react";
import CTA from "./CTA";

export default function Home() {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Enterprise Networking",
      description:
        "Dell & Cisco powered switches, routers, and access points for seamless connectivity",
      link: "/services",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Server Infrastructure",
      description:
        "Rack servers, blade servers, and scalable storage solutions for enterprise data management",
      link: "/services",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Cybersecurity Solutions",
      description:
        "Next-gen firewalls, antivirus, and network security for complete enterprise protection",
      link: "/services",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
        </svg>
      ),
      title: "Cloud Services",
      description:
        "AWS, Azure & Microsoft 365 deployment with seamless integration and migration support",
      link: "/services",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      ),
      title: "CCTV & Surveillance",
      description:
        "Advanced IP cameras, NVR/DVR systems with PeopleLink, BenQ & Panasonic technology",
      link: "/products",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      title: "24/7 Support & AMC",
      description:
        "Round-the-clock technical assistance and annual maintenance contracts for seamless operations",
      link: "/contact",
    },
  ];

  // In your app/page.tsx file, update this array
  const achievements = [
    {
      icon: <Award />,
      number: "500+",
      label: "Projects Delivered",
    },
    {
      icon: <Users />,
      number: "200+",
      label: "Happy Clients",
    },
    {
      icon: <Calendar />,
      number: "15+",
      label: "Years of Experience",
    },
    {
      icon: <ShieldCheck />,
      number: "24/7",
      label: "Support Available",
    },
  ];

  const features = [
    {
      title: "Certified Partnerships",
      items: [
        "Dell Certified Partner",
        "Cisco Authorized Reseller",
        "Microsoft Gold Partner",
      ],
    },
    {
      title: "Industry Expertise",
      items: [
        "15+ years of experience",
        "500+ successful deployments",
        "Enterprise-grade solutions",
      ],
    },
    {
      title: "Comprehensive Support",
      items: [
        "24/7 technical assistance",
        "AMC & warranty services",
        "On-site support available",
      ],
    },
    {
      title: "End-to-End Solutions",
      items: [
        "Consultation & planning",
        "Installation & deployment",
        "Maintenance & monitoring",
      ],
    },
  ];

  const trustedBy = [
    "Corporates & Enterprises",
    "Educational Institutions",
    "Government Organizations",
    "Data Centers",
    "Healthcare Facilities",
    "Manufacturing Units",
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSlider />

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="badge mb-6">
              <div className="w-2 h-2 bg-primary-700 rounded-full animate-pulse"></div>
              <span>WHAT WE OFFER</span>
            </div>
            <h2 className="h1 mb-6">Complete IT Infrastructure Solutions</h2>
            <p className="p-large max-w-3xl mx-auto">
              From enterprise networking to cloud services, we provide
              end-to-end IT solutions for businesses of all sizes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover group relative overflow-hidden"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-primary-gradient rounded-2xl group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative text-white">{service.icon}</div>
                </div>
                <h3 className="h4 mb-3 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h3>
                <p className="p-base mb-6">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-primary-500 font-semibold group-hover:gap-3 transition-all"
                >
                  Learn More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      {/* ====================================================== */}

      {/* Why Choose Us */}
      <section className="section bg-blue-soft">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="badge mb-6">
                <div className="w-2 h-2 bg-primary-700 rounded-full animate-pulse"></div>
                <span>WHY CHOOSE US</span>
              </div>
              <h2 className="h1 mb-6">Your Trusted IT Partner</h2>
              <p className="p-large mb-10 text-gray-700">
                With over 15 years of industry experience, we deliver
                cutting-edge IT infrastructure solutions backed by world-class
                partnerships.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">
                      {feature.title}
                    </h3>
                    <ul className="space-y-2">
                      {feature.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <svg
                            className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <Link href="/about" className="btn-gradient">
                Discover More About Us
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover-lift">
                <Image
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop&q=80"
                  alt="IT Infrastructure Team"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent"></div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-gradient rounded-xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">100%</p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Client Satisfaction
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <CarouselDemo />

      {/* Partners */}
      <BrandLogoSlider />

      <CTA />
    </div>
  );
}
