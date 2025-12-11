"use client";

import { usePathname } from "next/navigation";
import {NavbarDemo} from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current page is admin
  const isAdminPage = pathname?.startsWith("/admin");

  // Admin pages - no navbar/footer
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Normal pages - with navbar/footer
  return (
    <>
      <NavbarDemo />
      <main>{children}</main>
      <Footer />
    </>
  );
}