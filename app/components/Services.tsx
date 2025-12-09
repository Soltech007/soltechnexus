'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Settings,
  Network,
  Cloud,
  ShieldCheck,
  Wrench,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Clock,
  Globe,
  Building
} from 'lucide-react';
import React from 'react';
import CTA from '../components/CTA';

export default function ServicesPage() {
  const services = [
    {
      icon: <Settings />,
      title: "IT Infrastructure Consulting",
      description: "Expert guidance for planning, designing, and optimizing your complete IT environment with strategic roadmaps.",
      link: "/services/it-consulting",
      highlights: [
        "Infrastructure Assessment & Audit",
        "Technology Roadmap Development",
        "Digital Transformation Strategy",
        "Vendor Selection & Management"
      ]
    },
    {
      icon: <Network />,
      title: "Enterprise Networking Solutions",
      description: "Design and implementation of secure, high-performance network systems with Dell and Cisco technologies.",
      link: "/services/enterprise-networking",
      highlights: [
        "Network Architecture Design",
        "LAN/WAN Implementation",
        "WiFi Infrastructure Deployment",
        "Network Security & Segmentation"
      ]
    },
    {
      icon: <Cloud />,
      title: "Cloud Services & Migration",
      description: "Seamless deployment and transition to AWS, Azure, Microsoft 365, and Google Workspace platforms.",
      link: "/services/cloud-migration",
      highlights: [
        "Cloud Strategy & Planning",
        "Migration & Deployment",
        "Hybrid Cloud Solutions",
        "Cloud Optimization & Cost Management"
      ]
    },
    {
      icon: <ShieldCheck />,
      title: "Cybersecurity Solutions",
      description: "Comprehensive protection through advanced firewalls  and intelligent threat-management systems designed to detect, prevent, and respond to cyber risks.",
      link: "/services/cybersecurity",
      highlights: [
        "Security Assessment & Auditing",
        "Firewall & IPS Configuration",
        "Endpoint Protection Deployment",
        "Security Operations Center (SOC)"
      ]
    },
    {
      icon: <Wrench />,
      title: "Hardware Procurement & Installation",
      description: "Complete setup of servers, networking devices, and IT hardware from authorized partners.",
      link: "/services/hardware-installation",
      highlights: [
        "Hardware Selection & Sourcing",
        "Professional Installation",
        "Configuration & Testing",
        "Warranty Management"
      ]
    },
    {
      icon: <Headphones />,
      title: "AMC & Technical Support",
      description: "Annual maintenance contracts with 24/7 technical assistance ensuring smooth business operations.",
      link: "/services/amc-support",
      highlights: [
        "24/7 Helpdesk Support",
        "Preventive Maintenance",
        "Remote & Onsite Support",
        "SLA-based Service Delivery"
      ]
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Delivered", icon: <Award /> },
    { number: "100+", label: "Happy Clients", icon: <Users /> },
    { number: "24/7", label: "Support Available", icon: <Clock /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <TrendingUp /> }
  ];

  const industries = [
    "Corporates",
    "Education",
    "Government",
    "Data Centers",
    "Healthcare",
    "SMEs"
  ];

  return (
    <div className="w-full bg-white">
      <section className="section-blue text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, hsla(0,0%,100%,.2) 1px, transparent 1px)', 
            backgroundSize: '2rem 2rem' 
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="badge mb-6 bg-primary-600">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white">OUR SERVICES</span>
            </div>
            <h1 className="h1 text-white mb-6">
              End-to-End IT Services & Solutions
            </h1>
            <p className="p-large max-w-3xl mx-auto text-primary-100">
              From consulting to implementation and ongoing support, we provide comprehensive 
              IT services that transform your technology infrastructure into a competitive advantage.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">Comprehensive IT Service Portfolio</h2>
            <p className="p-large text-gray-600 max-w-3xl mx-auto">
              We deliver expert IT services across the entire technology lifecycle, 
              ensuring your infrastructure is secure, scalable, and optimized for growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
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
                  {React.cloneElement(service.icon, { className: "w-10 h-10 text-primary-500" })}
                </div>

                {/* Title */}
                <h3 className="h4 mb-3 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="p-base mb-6">{service.description}</p>

                {/* Highlights */}
                <ul className="space-y-3 mb-8">
                  {service.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="p-small text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={service.link} className="btn-outline w-full text-center">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/*              OUR PROCESS                          */}
      {/* ================================================= */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="badge mb-6">
              <div className="w-2 h-2 bg-primary-700 rounded-full"></div>
              <span>OUR APPROACH</span>
            </div>
            <h2 className="h2 mb-4">How We Work</h2>
            <p className="p-large text-gray-600 max-w-3xl mx-auto">
              Our proven methodology ensures successful project delivery, on time and within budget.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Assess", 
                desc: "We analyze your current infrastructure and identify opportunities for improvement" 
              },
              { 
                step: "02", 
                title: "Design", 
                desc: "Our experts create tailored solutions that align with your business objectives" 
              },
              { 
                step: "03", 
                title: "Implement", 
                desc: "Professional deployment with minimal disruption to your operations" 
              },
              { 
                step: "04", 
                title: "Support", 
                desc: "Ongoing maintenance and support to ensure optimal performance" 
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-gradient rounded-full text-white text-2xl font-bold mb-4 shadow-lg">
                  {item.step}
                </div>
                <h4 className="h5 mb-2">{item.title}</h4>
                <p className="p-small text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/*              STATISTICS                           */}
      {/* ================================================= */}
      <section className="section bg-white">
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
              <h2 className="h2 mb-6">Trusted IT Partner for Leading Organizations</h2>
              <p className="p-large mb-8">
                With years of experience and partnerships with industry leaders like Dell, Cisco, 
                and Microsoft, we deliver enterprise-grade solutions that drive business success.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Certified experts in Dell, Cisco, and Microsoft technologies",
                  "End-to-end service delivery from consulting to support",
                  "Proven track record with 500+ successful projects",
                  "24/7 support with guaranteed SLAs",
                  "Industry-specific solutions and compliance expertise"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                    <span className="p-base text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <span className="font-semibold text-gray-700">Industries we serve:</span>
                {industries.map((industry, index) => (
                  <span key={index} className="badge">
                    {industry}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="card text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4">
                    {React.cloneElement(stat.icon, { className: "w-6 h-6 text-primary-500" })}
                  </div>
                  <p className="text-5xl font-black gradient-text mb-2">{stat.number}</p>
                  <p className="p-base font-semibold text-gray-700">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/*              KEY PARTNERS                         */}
      {/* ================================================= */}
      <section className="section bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="h3 mb-8">Our Technology Partners</h3>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {["Dell", "Cisco", "Microsoft", "PeopleLink", "BenQ", "Panasonic"].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="text-xl font-bold text-gray-700">{partner}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================= */}
      {/*                   CTA SECTION                     */}
      {/* ================================================= */}
      <CTA params={{
        slug: ''
      }} />
    </div>
  );
}