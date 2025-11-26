import './globals.css'
import type { Metadata } from 'next'
import { NavbarDemo } from './components/Navbar'
import Footer from './components/Footer'
import { cn } from '@/lib/utils'
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Soltech Nexus - Enterprise IT Solutions',
  description: 'Leading provider of IT infrastructure, networking, and cloud services for modern businesses.',
  icons: '/logoo.jpeg'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
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
      </head>

      <body className={cn("antialiased")}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
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
  )
}
