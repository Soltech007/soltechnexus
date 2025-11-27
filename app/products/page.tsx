import type { Metadata } from "next";
import React from 'react';
import ProductsPage from '../components/Products';

// ⭐ SEO META TAGS
export const metadata: Metadata = {
  title: "Products | Soltech Nexus",
  description:
    "Explore enterprise-grade IT products including networking equipment, servers, storage solutions, CCTV systems, cloud tools, and cybersecurity products from Soltech Nexus.",
  keywords: [
    "IT products",
    "enterprise networking",
    "servers",
    "storage solutions",
    "CCTV products",
    "firewalls",
    "IT company",
    "Soltech Nexus products",
  ],
  alternates: {
    canonical: "https://soltechnexus.com/products",
  },
  openGraph: {
    title: "Our Products | Soltech Nexus",
    description:
      "Browse top-tier IT solutions including servers, networking hardware, surveillance systems, and cloud products.",
    url: "https://soltechnexus.com/products",
    siteName: "Soltech Nexus",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soltech Nexus Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const products = () => {
  return (
    <div>
      <ProductsPage />
    </div>
  );
};

export default products;