"use client";

import Carousel from "@/components/ui/carousel";
import { motion } from "framer-motion";

export function CarouselDemo() {
  const slideData = [
    {
      title: "Advanced CCTV Surveillance",
      button: "Explore Security",
      // src: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // Alternative: Security camera focused
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products"
    },
    {
      title: "Enterprise Network Infrastructure",
      button: "View Hardware",
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // Alternative: Server room
      // src: "https://images.unsplash.com/photo-1565375706404-082d37dd1f5d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/services"
    },
    {
      title: "Next-Gen Cybersecurity",
      button: "Secure Your Business",
      // src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // Alternative: Digital security visualization
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/contact"
    },
    {
      title: "Seamless Cloud Integration",
      button: "Our Cloud Services",
      // Alternative: Cloud computing concept
      // src: "https://images.unsplash.com/photo-1667984390527-850f63192709?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/services"
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