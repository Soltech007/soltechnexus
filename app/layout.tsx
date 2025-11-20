import './globals.css'
import type { Metadata } from 'next'
import  {NavbarDemo}  from './components/Navbar'
import Footer from './components/Footer'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Soltech Nexus - Enterprise IT Solutions',
  description: 'Leading provider of IT infrastructure, networking, and cloud services for modern businesses.',
  icons:'/logoo.jpg'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={cn("antialiased")}>
        <NavbarDemo />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
