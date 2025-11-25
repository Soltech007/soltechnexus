"use client";

import Carousel from "@/components/ui/carousel";
import { motion } from "framer-motion";

export function CarouselDemo() {
  const slideData = [
    {
      title: "CCTV & Surveillance",
      button: "Explore Security",
      src: "/cctv.jpg",
      link: "/products/cctv-surveillance"
    },
    {
      title: "Networking Devices",
      button: "View Devices",
      src: "/network.jpg",
      link: "/products/networking-devices"
    },
    {
      title: "Servers & Storage",
      button: "View Infrastructure",
      src: "/server.jpg",
      link: "/products/servers-storage"
    },
    {
      title: "Firewalls & Security",
      button: "Explore Security",
      src: "/security.jpg",
      link: "/products/firewalls-security"
    },
    {
      title: "Collaboration Tools",
      button: "Explore Tools",
      src: "/tools.jpg",
      link: "/products/collaboration-tools"
    },
    {
      title: "Cybersecurity Software",
      button: "Secure Your Business",
      src: "/software.jpg",
      link: "/products/cybersecurity-software"
    },
  ];
  
  return (
    <section className="section text-white overflow-hidden">
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
            <span>CASE STUDIES</span>
          </div>
          <h2 className="h1 mb-6">Our Featured Projects</h2>
          <p className="p-large max-w-3xl mx-auto">
            A glimpse into the innovative solutions we've delivered for our clients.
          </p>
        </motion.div>

        <div className="relative w-full h-full">
          <Carousel slides={slideData} />
        </div>
      </div>
    </section>
  );
}