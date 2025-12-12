"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wifi,
  Server,
  ShieldCheck,
  Cloud,
  Video,
  Users,
  KeyRound,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import React from "react";
import CTA from "../components/CTA";

export default function ProductsPage() {
  const products = [
    {
      icon: <Video />,
      title: "CCTV & Surveillance",
      description:
        "Comprehensive monitoring systems to ensure complete on-premise security.",
      link: "/products/cctv-surveillance",
      items: [
        "High-Definition IP Cameras",
        "NVR/DVR Systems",
        "Video Analytics",
        "Access Control",
      ],
    },
    {
      icon: <Wifi />,
      title: "Networking Devices",
      description:
        "Switches, Routers, and Access Points for seamless, high-speed connectivity.",
      link: "/products/networking-devices",
      items: [
        "Enterprise Switches",
        "Core Routers",
        "Wireless Access Points",
        "Network Controllers",
      ],
    },
    {
      icon: <Server />,
      title: "Servers & Storage",
      description:
        "Reliable and scalable systems for enterprise data management and security.",
      link: "/products/servers-storage",
      items: [
        "Rack & Blade Servers",
        "NAS/SAN Storage",
        "Data Backup Solutions",
        "Virtualization",
      ],
    },
    {
      icon: <ShieldCheck />,
      title: "Firewalls & Security",
      description:
        "Advanced protection with next-gen firewalls for a secure network environment.",
      link: "/products/firewalls-security",
      items: [
        "Next-Gen Firewalls",
        "IPS/IDS Systems",
        "VPN Gateways",
        "Security Appliances",
      ],
    },
    {
      icon: <Users />,
      title: "Collaboration Tools",
      description:
        "PeopleLink, BenQ, and Panasonic solutions for modern hybrid workplaces and efficient workspace management. ",
      link: "/products/collaboration-tools",
      items: [
        "Video Conferencing",
        "Interactive Displays",
        "Meeting Room Solutions",
        "Collaboration Software",
      ],
    },
    {
      icon: <KeyRound />,
      title: "Cybersecurity Software",
      description:
        "Licensed Antivirus and endpoint protection to safeguard your data integrity.",
      link: "/products/cybersecurity-software",
      items: [
        "Endpoint Antivirus",
        "Email Security",
        "Data Loss Prevention",
        "Mobile Security",
      ],
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* ================================================= */}
      {/*                     HERO                         */}
      {/* ================================================= */}
      <section className="section-blue text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsla(0,0%,100%,.2) 1px, transparent 1px)",
            backgroundSize: "2rem 2rem",
          }}
        ></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="badge mb-6 bg-primary-600">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white">OUR PRODUCT PORTFOLIO</span>
            </div>
            <h1 className="h1 text-white mb-6">Enterprise-Grade IT Products</h1>
            <p className="p-large max-w-3xl mx-auto text-primary-100">
              A comprehensive range of cutting-edge IT infrastructure products
              from world-leading brands like Dell, Cisco, Microsoft, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================================================= */}
      {/*              PRODUCTS GRID                        */}
      {/* ================================================= */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">Complete IT Infrastructure Solutions</h2>
            <p className="p-large text-gray-600 max-w-3xl mx-auto">
              From networking to security, we provide everything your business
              needs to thrive in the digital age.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover group"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {React.cloneElement(product.icon, {
                    className: "w-10 h-10 text-primary-500",
                  })}
                </div>

                {/* Title */}
                <h3 className="h4 mb-3 group-hover:text-primary-500 transition-colors">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="p-base mb-6">{product.description}</p>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {product.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="p-small text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={product.link}
                  className="btn-outline w-full text-center"
                  aria-label={`Explore details about ${product.title}`}
                >
                  Explore {product.title}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/*              WHY CHOOSE OUR PRODUCTS              */}
      {/* ================================================= */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="badge mb-6">
                <div className="w-2 h-2 bg-primary-700 rounded-full"></div>
                <span>WHY CHOOSE US</span>
              </div>
              <h2 className="h2 mb-6">Premium Quality, Trusted Brands</h2>
              <p className="p-large mb-8">
                We partner with global technology leaders to bring you reliable,
                scalable, and secure IT infrastructure products.
              </p>

              <ul className="space-y-4">
                {[
                  "Authorized partnerships with Dell, Cisco, and Microsoft",
                  "Enterprise-grade quality and performance",
                  "Comprehensive warranties and support",
                  "Scalable solutions for businesses of all sizes",
                  "Expert consultation and deployment services",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                    <span className="p-base text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: "500+", label: "Products Delivered" },
                { number: "15+", label: "Brand Partners" },
                { number: "24/7", label: "Technical Support" },
                { number: "100%", label: "Genuine Products" },
              ].map((stat, index) => (
                <div key={index} className="card text-center">
                  <p className="text-5xl font-black gradient-text mb-2">
                    {stat.number}
                  </p>
                  <p className="p-base font-semibold text-gray-700">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/*                   CTA SECTION                     */}
      {/* ================================================= */}
      {/* <CTA params={{
        slug: ''
      }} /> */}
    </div>
  );
}
