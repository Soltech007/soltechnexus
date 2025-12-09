'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Cloud,
  ShieldCheck,
  Network,
  Server,
  Monitor,
  Wrench,
  Building,
  GraduationCap,
  Landmark,
  Layers,
  HeartHandshake,
  Zap,
} from "lucide-react";
import CTA from "./CTA";

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="group relative text-center bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-2xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300"
  >
    <div className="inline-block p-5 bg-primary-100 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

// Reusable Audience Card Component
const AudienceCard = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex flex-col items-center text-center gap-4">
    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-white border-2 border-primary-100 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="font-bold text-gray-800">{title}</p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="w-full bg-white">

      {/* ================================================= */}
      {/*                     HERO                         */}
      {/* ================================================= */}
      <section className="relative section-blue text-primary-foreground pt-32 pb-24 md:pt-40 md:pb-32 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, hsla(0,0%,100%,.2) 1px, transparent 1px)', backgroundSize: '2rem 2rem' }}></div>
        <div className="container-custom relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black drop-shadow-xl"
          >
            Engineering the Future of IT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-primary-100/90 leading-relaxed mt-6"
          >
            At Soltech Nexus, we build resilient, scalable, and secure IT infrastructures that power enterprise growth and innovation.
          </motion.p>
        </div>
      </section>

      {/* ================================================= */}
      {/*                COMPANY OVERVIEW                   */}
      {/* ================================================= */}
      <section className="section bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="badge mb-6">
              <div className="w-2 h-2 bg-primary-700 rounded-full"></div>
              <span>WHO WE ARE</span>
            </div>
            <h2 className="h2 mb-6">Your End-to-End IT Infrastructure Partner</h2>
            <p className="p-large mb-4">
              Soltech Nexus is a premier provider of enterprise-class IT solutions. From initial consultation to 24/7 support, we manage every aspect of your technology stack.
            </p>
            <p className="p-base text-gray-600">
              We leverage our strategic partnerships with global leaders like Dell, Cisco, and Microsoft to design and deploy robust networking, server, cloud, and security systems tailored to your unique business needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&q=80&w=1200"
              alt="IT Team Collaboration"
              width={1200}
              height={800}
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary-gradient rounded-full opacity-50 blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </section>
      
      {/* ================================================= */}
      {/*             CORE CAPABILITIES (Products & Services) */}
      {/* ================================================= */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="h1 mb-6">Our Core Capabilities</h2>
            <p className="p-large max-w-3xl mx-auto text-gray-600">
              We provide a comprehensive suite of products and services to cover every IT need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Network className="w-8 h-8 text-primary-500" />}
              title="Enterprise Networking"
              desc="High-performance switches, routers, and secure WiFi access points."
              delay={0}
            />
            <FeatureCard
              icon={<Server className="w-8 h-8 text-primary-500" />}
              title="Servers & Storage"
              desc="Reliable and scalable rack, blade, and storage solutions for enterprise data."
              delay={0.1}
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-primary-500" />}
              title="Cybersecurity"
              desc="Next-gen firewalls, antivirus, and threat management to protect your assets."
              delay={0.2}
            />
            <FeatureCard
              icon={<Cloud className="w-8 h-8 text-primary-500" />}
              title="Cloud Services"
              desc="Seamless migration and management for AWS, Azure, and Microsoft 365."
              delay={0.3}
            />
            <FeatureCard
              icon={<Monitor className="w-8 h-8 text-primary-500" />}
              title="CCTV & Surveillance"
              desc="Advanced IP cameras, NVRs, and complete monitoring systems."
              delay={0.4}
            />
            <FeatureCard
              icon={<Wrench className="w-8 h-8 text-primary-500" />}
              title="AMC & Support"
              desc="24/7 technical assistance and annual maintenance contracts."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/*              TARGET AUDIENCE                      */}
      {/* ================================================= */}
      <section className="section bg-white">
        <div className="container-custom text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2 mb-16"
          >
            Empowering a Wide Range of Industries
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 group"
          >
            <AudienceCard icon={<Building className="w-10 h-10 text-primary-500" />} title="Corporates" />
            <AudienceCard icon={<GraduationCap className="w-10 h-10 text-primary-500" />} title="Education" />
            <AudienceCard icon={<Landmark className="w-10 h-10 text-primary-500" />} title="Government" />
            <AudienceCard icon={<Layers className="w-10 h-10 text-primary-500" />} title="Data Centers" />
            <AudienceCard icon={<HeartHandshake className="w-10 h-10 text-primary-500" />} title="SMEs" />
            <AudienceCard icon={<Zap className="w-10 h-10 text-primary-500" />} title="Industries" />
          </motion.div>
        </div>
      </section>

      {/* ================================================= */}
      {/*                PARTNERS SECTION                   */}
      {/* ================================================= */}
      <section className="section bg-gray-50 text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-500 mb-12 tracking-widest">POWERED BY INDUSTRY LEADERS</h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8"
          >
            <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" className="h-10 md:h-12" alt="Dell Logo" />
            <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" className="h-12 md:h-16" alt="Cisco Logo" />
            <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="h-10 md:h-12" alt="Microsoft Logo" />
            <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" className="h-12 md:h-16" alt="AWS Logo" />
            <motion.img whileHover={{ scale: 1.1 }} src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" className="h-10 md:h-12" alt="Azure Logo" />
          </motion.div>
        </div>
      </section>

      {/* ================================================= */}
    {/* <CTA params={{
        slug: ""
      }}/> */}
    </div>
  );
}