// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Add font optimization
import { NavbarDemo } from "./components/Navbar";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink"; // New component
import { cn } from "@/lib/utils";
import Script from "next/script";

// ✅ Optimize fonts with next/font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Soltech Nexus - Enterprise IT Solutions",
  description:
    "Leading provider of IT infrastructure, networking, and cloud services for modern businesses.",
  keywords: [
    "IT services",
    "CCTV installation",
    "Networking solutions",
    "Software development",
    "Web development",
    "Tech support",
    "SolTech Nexus",
  ],
  icons: "/logo.webp",
  alternates: {
    canonical: "https://soltechnexus.com/",
  },
  openGraph: {
    title: "Soltech Nexus – Enterprise IT Solutions",
    description: "Transforming businesses with enterprise networking, cloud, CCTV, and cybersecurity solutions.",
    url: "https://soltechnexus.com",
    siteName: "Soltech Nexus",
    images: [
      {
        url: "https://soltechnexus.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soltech Nexus Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soltech Nexus – Enterprise IT Solutions",
    description: "Transforming businesses with enterprise networking, cloud, CCTV, and cybersecurity solutions.",
    images: ["https://soltechnexus.com/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("!scroll-smooth", inter.variable)}>
      <head>
        {/* ✅ Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* ✅ JSON-LD using next/script */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Soltech Nexus",
              url: "https://soltechnexus.com",
              logo: "https://soltechnexus.com/logo.webp",
              description:
                "Leading provider of IT infrastructure, networking, CCTV, cloud services, and enterprise IT solutions.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9023506084",
                contactType: "customer service",
              },
              sameAs: [
                "https://www.facebook.com/",
                "https://www.instagram.com/",
                "https://www.linkedin.com/company/soltech-nexus/",
              ],
            }),
          }}
        />
      </head>

      <body className={cn("antialiased", inter.className)}>
        {/* ✅ Google Tag Manager - using afterInteractive */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NRN3WN26');
          `}
        </Script>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-NRN3WN26"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ✅ Skip Link for Accessibility */}
        <SkipLink />
        
        <NavbarDemo />
        {/* ✅ Add id and tabIndex for skip link target */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}