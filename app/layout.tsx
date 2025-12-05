import "./globals.css";
import type { Metadata } from "next";
import { NavbarDemo } from "./components/Navbar";
import Footer from "./components/Footer";
import { cn } from "@/lib/utils";
import Script from "next/script";
import localFont from "next/font/local";

// Load Local Font (SEO + Performance Fix)
const mainFont = localFont({
  src: "../public/fonts/yourfont.woff2",
  variable: "--font-main",
  display: "swap",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mainFont.variable} !scroll-smooth`}>
      <head>

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Preload Fonts */}
        <link
          rel="preload"
          href="/fonts/yourfont.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NRN3WN26');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Soltech Nexus",
              url: "https://soltechnexus.com",
              description:
                "Leading IT infrastructure, CCTV installation, networking, and enterprise cloud solutions.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </head>

      <body className={cn("antialiased")}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-NRN3WN26"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <NavbarDemo />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
