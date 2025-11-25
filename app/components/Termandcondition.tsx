"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Shield, CheckCircle, Ban, UserCheck, Briefcase, Globe } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="w-full bg-white">

      {/* ---------------- HERO ---------------- */}
      <section className="section-blue py-28 text-center relative overflow-hidden">

        {/* Light grid background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Soft Glow */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary-700/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-lg text-white rounded-full text-sm border border-white/30 shadow-md mb-6">
              <Sparkles className="w-4 h-4" />
              Terms & Conditions
            </div>

            <h1 className="h1 text-white mb-4">
              Terms of Service & Business Use
            </h1>

            <p className="p-large text-primary-100 max-w-3xl mx-auto">
              Please read these Terms and Conditions carefully before using our services or interacting with Soltech Nexus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- CONTENT ---------------- */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl mx-auto">

          <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-gray-200 space-y-14">

            {[
              {
                icon: <FileText className="text-primary-600 w-7 h-7" />,
                title: "1. Introduction",
                text: `These terms govern your use of Soltech Nexus products, services, websites, consulting, and technical support. By accessing our services, you agree to these Terms & Conditions.`,
              },
              {
                icon: <Briefcase className="text-primary-600 w-7 h-7" />,
                title: "2. Scope of Services",
                list: [
                  "Enterprise networking solutions and deployment",
                  "IT infrastructure consulting & implementation",
                  "Server, storage & hardware procurement",
                  "Cloud migration (AWS, Azure, Google Workspace)",
                  "Cybersecurity, firewalls, antivirus, and threat management",
                  "Annual Maintenance Contracts (AMC) and support",
                  "CCTV, surveillance & video conferencing setup",
                ],
              },
              {
                icon: <UserCheck className="text-primary-600 w-7 h-7" />,
                title: "3. Client Responsibilities",
                list: [
                  "Provide accurate business information and requirements.",
                  "Ensure access to premises or systems when required.",
                  "Ensure timely payments for services/products purchased.",
                  "Use Soltech Nexus services ethically and legally.",
                ],
              },
              {
                icon: <Shield className="text-primary-600 w-7 h-7" />,
                title: "4. Intellectual Property",
                text:
                  "All content, designs, software, documentation, and materials delivered by Soltech Nexus remain our intellectual property unless explicitly transferred through a written agreement.",
                list: [
                  "You may not copy, resell, or redistribute our solutions.",
                  "Configurations, architecture & documentation remain proprietary.",
                ],
              },
              {
                icon: <CheckCircle className="text-primary-600 w-7 h-7" />,
                title: "5. Payments & Billing",
                list: [
                  "All invoices must be paid within the due date.",
                  "Late payments may attract penalties.",
                  "For AMC or subscriptions, payments must be made in advance.",
                  "Hardware/software orders require partial or full advance.",
                ],
              },
              {
                icon: <Ban className="text-primary-600 w-7 h-7" />,
                title: "6. Restrictions",
                list: [
                  "Client must not misuse provided network infrastructure.",
                  "Reverse engineering our configurations is prohibited.",
                  "Use of our services for illegal activities is strictly prohibited.",
                ],
              },
              {
                icon: <Shield className="text-primary-600 w-7 h-7" />,
                title: "7. Limitation of Liability",
                text:
                  "Soltech Nexus is not liable for losses arising from:",
                list: [
                  "Misuse of IT infrastructure by the client.",
                  "Hardware failures due to external conditions.",
                  "Downtime caused by third-party cloud providers.",
                  "Cyberattacks caused by user negligence or unauthorized access.",
                ],
              },
              {
                icon: <UserCheck className="text-primary-600 w-7 h-7" />,
                title: "8. Warranty & Support",
                list: [
                  "Hardware warranty depends on OEM (Dell, Cisco, Microsoft, etc).",
                  "Support availability based on AMC or contract level.",
                  "Standard support hours: Monday–Saturday, 9 AM – 6 PM.",
                  "24/7 support available only for AMC clients.",
                ],
              },
              {
                icon: <Globe className="text-primary-600 w-7 h-7" />,
                title: "9. Governing Law",
                text:
                  "All dealings with Soltech Nexus fall under Indian jurisdiction. Any disputes will be resolved in courts located in Gujarat, India.",
              },
              {
                icon: <Shield className="text-primary-600 w-7 h-7" />,
                title: "10. Contact Information",
                text: (
                  <span>
                    For clarifications regarding these Terms, contact us:<br /><br />
                    <strong>Email:</strong> info@soltechnexus.com<br />
                    <strong>Phone:</strong> +91 90235 06084<br />
                    <strong>Address:</strong> Vibrant Park, GIDC Phase 1, Vapi, Gujarat – 396195
                  </span>
                ),
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Title Row */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 border border-primary-100 rounded-xl">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                {/* Text */}
                {section.text && <p className="p-base text-gray-700">{section.text}</p>}

                {/* List */}
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Divider */}
                {index !== 9 && <div className="h-px bg-gray-200 my-6"></div>}
              </motion.div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}
