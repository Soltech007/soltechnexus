import React from 'react'
import AboutSection from '../components/About'
import type { Metadata } from 'next'

// --- PAGE METADATA --- //
export const metadata: Metadata = {
  title: "About Us | Soltech Nexus",
  description:
    "Learn more about Soltech Nexus – a leading provider of IT services, networking, CCTV installation, and tech solutions.",
  keywords: [
    "About Soltech Nexus",
    "IT company",
    "Networking services",
    "CCTV installation",
    "Software development",
    "Tech company profile"
  ],
  alternates: {
    canonical: "https://soltechnexus.com/about"
  },
  openGraph: {
    title: "About Soltech Nexus",
    description:
      "Learn more about Soltech Nexus – providing top-notch IT and networking solutions.",
    url: "https://soltechnexus.com/about",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soltech Nexus"
      }
    ]
  }
};

const Page = () => {
  return (
    <div>
      <AboutSection />
    </div>
  )
}

export default Page