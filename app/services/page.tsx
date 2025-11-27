import type { Metadata } from "next";
import React from "react";
import ServicesPage from "../components/Services";

// ▶ META TAGS
export const metadata: Metadata = {
  title: "Our Services | Soltech Nexus",
  description:
    "Explore Soltech Nexus services including IT infrastructure, networking, CCTV, cloud solutions, cybersecurity, and annual maintenance (AMC).",
  keywords: [
    "IT services",
    "Networking services",
    "Cloud solutions",
    "Cybersecurity",
    "CCTV installation",
    "IT AMC support",
    "Soltech Nexus services"
  ],
  alternates: {
    canonical: "https://soltechnexus.com/services",
  },
  openGraph: {
    title: "Soltech Nexus - Services",
    description:
      "Discover our comprehensive IT services: networking, cloud, cybersecurity, servers, CCTV, and managed IT support.",
    url: "https://soltechnexus.com/services",
    siteName: "Soltech Nexus",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soltech Nexus Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const services = () => {
  return (
    <div>
      <ServicesPage />
    </div>
  );
};

export default services;