// app/blog/page.tsx

import Blogs from "@/app/components/Blog/Blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Soltech360Ads - Website Development & Digital Solutions",
  description:
    "Explore the latest blogs by Soltech360Ads on website development, SEO, UI/UX, performance optimization, and digital solutions to grow your business.",
  keywords: [
    "Soltech360Ads blogs",
    "website development blogs",
    "digital marketing blogs",
    "SEO tips",
    "Next.js tutorials",
    "React tutorials",
    "web design blogs",
  ],
  openGraph: {
    title: "Blogs | Soltech360Ads",
    description:
      "Read expert articles on website development, SEO, UI/UX, and digital strategy by Soltech360Ads.",
    url: "https://soltech360ads.com/blog",
    siteName: "Soltech360Ads",
    images: [
      {
        url: "https://soltech360ads.com/icons/logo.webp", // Blog OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Soltech360Ads",
    description:
      "Latest insights and articles on Next.js, React, SEO, and web development.",
    images: ["https://soltech360ads.com/icons/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogPage() {
  return (
    <div>
      <Blogs />
    </div>
  );
}
