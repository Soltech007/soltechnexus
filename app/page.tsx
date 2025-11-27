import React from "react";
import Home from "./components/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soltech Nexus | Enterprise IT Solutions & Services",
  description:
    "Soltech Nexus provides IT infrastructure, networking, CCTV, cloud services, cybersecurity, AMC support, and enterprise-scale technology solutions.",
  keywords: [
    "Soltech Nexus",
    "IT services",
    "Networking solutions",
    "CCTV installation",
    "Cloud services",
    "Cybersecurity",
    "IT infrastructure",
    "AMC support",
  ],
  alternates: {
    canonical: "https://soltechnexus.com/",
  },
  openGraph: {
    title: "Soltech Nexus – Enterprise IT Solutions",
    description:
      "Transforming businesses with enterprise networking, cloud, CCTV, and cybersecurity solutions.",
    url: "https://soltechnexus.com",
    siteName: "Soltech Nexus",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soltech Nexus Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const Page = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default Page;