import type { Metadata } from "next";
import React from "react";
import ContactPage from "../components/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Soltech Nexus",
  description:
    "Get in touch with Soltech Nexus for IT infrastructure, networking, cloud services, cybersecurity, and professional technical support.",
  keywords: [
    "Contact Soltech Nexus",
    "IT services support",
    "IT company contact",
    "Networking support",
    "Cloud services help",
    "IT infrastructure company",
    "Cybersecurity services"
  ],
  alternates: {
    canonical: "https://soltechnexus.com/contact",
  },
  openGraph: {
    title: "Contact Soltech Nexus",
    description:
      "Reach out to Soltech Nexus for enterprise IT solutions, cloud services, networking, CCTV, and more.",
    url: "https://soltechnexus.com/contact",
    siteName: "Soltech Nexus",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soltech Nexus - Contact Us",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const Contact = () => {
  return (
    <div>
      <ContactPage />
    </div>
  );
};

export default Contact;