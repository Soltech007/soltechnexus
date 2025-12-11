"use client";

import React from "react";
import { AuthProvider } from "@/app/lib/auth/AuthContext";
import Sidebar from "@/app/components/Admin/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AuthProvider>
      {/* Flex container to put Sidebar and Main side-by-side */}
      <div className="flex min-h-screen bg-gray-50">
        {!isLoginPage && (
          // Fixed sidebar container
          <div className="hidden lg:block w-64 shrink-0">
            <Sidebar />
          </div>
        )}
        
        {/* Main Content Area */}
        <main className={`flex-1 min-h-screen overflow-y-auto p-4 lg:p-8 ${!isLoginPage ? 'lg:ml-0' : 'w-full'}`}>
          {/* Mobile Sidebar Trigger could go here */}
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}