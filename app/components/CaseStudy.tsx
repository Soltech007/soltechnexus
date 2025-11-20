"use client";

import Carousel from "@/components/ui/carousel";
import { motion } from "framer-motion";

export function CarouselDemo() {
  const slideData = [
    {
      title: "CCTV & Surveillance",
      button: "Explore Security",
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/cctv-surveillance"
    },
    {
      title: "Networking Devices",
      button: "View Devices",
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/networking-devices"
    },
    {
      title: "Servers & Storage",
      button: "View Infrastructure",
      src: "https://images.unsplash.com/photo-1565375706404-082d37dd1f5d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/servers-storage"
    },
    {
      title: "Firewalls & Security",
      button: "Explore Security",
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/firewalls-security"
    },
    {
      title: "Collaboration Tools",
      button: "Explore Tools",
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/collaboration-tools"
    },
    {
      title: "Cybersecurity Software",
      button: "Secure Your Business",
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
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