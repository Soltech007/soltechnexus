"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Lock, FileText, Shield, UserCheck, Globe, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-white">

      {/* ---------------- HERO ---------------- */}
      <section className="section-blue text-center overflow-hidden py-28 relative">
        
        {/* Soft grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Soft glow */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-primary-700/20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-semibold mb-6 border border-white/30 shadow-md">
              <Sparkles className="w-4 h-4" />
              Privacy Policy
            </div>

            <h1 className="h1 text-white mb-4">Your Privacy Matters to Us</h1>

            <p className="p-large text-primary-100 max-w-3xl mx-auto">
              At Soltech Nexus, we are committed to protecting your data with industry-leading security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- CONTENT ---------------- */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl mx-auto">

          {/* Card Wrapper */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 md:p-12 space-y-14">

            {/* SECTION TEMPLATE */}
            {[
              {
                icon: <FileText className="w-7 h-7 text-primary-600" />,
                title: "1. Introduction",
                text: `Soltech Nexus (“we”, “our”, “us”) provides IT infrastructure, cloud solutions, cybersecurity, and enterprise networking services. This Privacy Policy explains how we collect, use, store, and protect your data.`,
              },
              {
                icon: <UserCheck className="w-7 h-7 text-primary-600" />,
                title: "2. Information We Collect",
                list: [
                  "Personal Information: Name, email, phone number.",
                  "Business Information: Company details, industry type.",
                  "Technical Information: IP, browser, device data.",
                  "Service Usage: Inquiry details, AMC interactions.",
                  "Communication Records: Emails, tickets, support logs.",
                ],
              },
              {
                icon: <Shield className="w-7 h-7 text-primary-600" />,
                title: "3. How We Use Your Information",
                list: [
                  "To provide enterprise networking & IT services.",
                  "To respond to service inquiries and consultations.",
                  "To deliver AMC, cloud migration, and maintenance.",
                  "To share quotes, proposals, and product info.",
                  "To provide cybersecurity alerts & support.",
                ],
              },
              {
                icon: <Lock className="w-7 h-7 text-primary-600" />,
                title: "4. Data Protection & Security",
                list: [
                  "Encrypted data storage practices.",
                  "Secure firewalls & intrusion prevention systems.",
                  "Multi-layer access control within our systems.",
                  "Regular security audits & monitoring.",
                  "Compliance with industry-grade protection norms.",
                ],
              },
              {
                icon: <ShieldCheck className="w-7 h-7 text-primary-600" />,
                title: "5. Sharing of Information",
                text: `We do NOT sell or rent your data. Data may be shared only with trusted partners strictly to fulfill service requirements.`,
                list: [
                  "Dell, Cisco, Microsoft (integration/licensing).",
                  "Cloud providers: AWS, Azure, Google Workspace.",
                  "Payment gateways for invoicing.",
                  "Authorized engineers for onsite support.",
                ],
              },
              {
                icon: <UserCheck className="w-7 h-7 text-primary-600" />,
                title: "6. Your Rights",
                list: [
                  "Right to access your data.",
                  "Right to request updates or deletion.",
                  "Right to withdraw consent anytime.",
                  "Right to restrict how your data is used.",
                  "Right to data export & portability.",
                ],
              },
              {
                icon: <Globe className="w-7 h-7 text-primary-600" />,
                title: "7. Cookies & Tracking Technologies",
                text:
                  "We use cookies to enhance user experience, analyze traffic, and improve website performance.",
              },
              {
                icon: <Mail className="w-7 h-7 text-primary-600" />,
                title: "8. Contact Us",
                text: (
                  <span>
                    For privacy-related inquiries, contact us:<br /><br />
                    <strong>Email:</strong> info@soltechnexus.com<br />
                    <strong>Phone:</strong> +91 90235 06084<br />
                    <strong>Address:</strong> Vibrant Park, GIDC Phase 1, Vapi, Gujarat – 396195
                  </span>
                ),
              },
            ].map((sec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 rounded-xl border border-primary-100">
                    {sec.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{sec.title}</h2>
                </div>

                {/* Text */}
                {sec.text && (
                  <p className="p-base text-gray-700 leading-relaxed">{sec.text}</p>
                )}

                {/* List */}
                {sec.list && (
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {sec.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Divider */}
                {i !== 7 && <div className="h-px bg-gray-200 my-6"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
