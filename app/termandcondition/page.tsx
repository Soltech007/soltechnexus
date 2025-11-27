import type { Metadata } from "next";
import React from "react";
import Termandcondition from "../components/Termandcondition";

export const metadata: Metadata = {
  title: "Terms & Conditions | Soltech Nexus",
  description:
    "Read the official Terms & Conditions of Soltech Nexus to understand our service policies, user responsibilities, and legal guidelines.",
  keywords: [
    "Terms and Conditions",
    "Soltech Nexus Terms",
    "IT service policies",
    "Legal terms",
    "Soltech Nexus agreement",
  ],
  alternates: {
    canonical: "https://soltechnexus.com/termandcondition",
  },
  openGraph: {
    title: "Terms & Conditions - Soltech Nexus",
    description:
      "Understand the terms and conditions governing the use of Soltech Nexus services and website.",
    url: "https://soltechnexus.com/termandcondition",
    siteName: "Soltech Nexus",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soltech Nexus Terms & Conditions",
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

const Termandconditions = () => {
  return (
    <div>
      <Termandcondition />
    </div>
  );
};

export default Termandconditions;