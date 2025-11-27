import type { Metadata } from "next";
import React from 'react';
import PrivacyPolicy from '../components/Privacypolicy';

export const metadata: Metadata = {
  title: "Privacy Policy | Soltech Nexus",
  description:
    "Read the Privacy Policy of Soltech Nexus to understand how we protect and manage your data.",
  keywords: [
    "Privacy Policy",
    "Soltech Nexus Privacy",
    "Data protection",
    "IT company privacy policy"
  ],
  alternates: {
    canonical: "https://soltechnexus.com/privacypolicy",
  },
  openGraph: {
    title: "Privacy Policy - Soltech Nexus",
    description:
      "Learn how Soltech Nexus protects your privacy and handles your data securely.",
    url: "https://soltechnexus.com/privacypolicy",
    siteName: "Soltech Nexus",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soltech Nexus Privacy Policy"
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

const Privacypolicy = () => {
  return (
    <div><PrivacyPolicy /></div>
  );
};

export default Privacypolicy;