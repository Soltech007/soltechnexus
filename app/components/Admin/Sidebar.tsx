"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/app/lib/auth/AuthContext";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "All Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Add New Blog", href: "/admin/blogs/new", icon: PlusCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#004080] text-white flex flex-col shadow-xl z-50 transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header + Collapse Button */}
      <div className="relative p-6 border-b border-white/10 flex items-center justify-between">
        {!collapsed ? (
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
            <p className="text-xs text-white/60 mt-1">Manage your content</p>
          </div>
        ) : (
          <h2 className="text-xl font-bold">AP</h2>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white text-[#004080] p-1.5 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? "bg-white text-[#004080] font-semibold shadow-md"
                : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />

              {/* Hide text when collapsed */}
              {!collapsed && <span>{item.name}</span>}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className="absolute left-20 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 bg-[#003366]">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors mb-2 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Globe className="w-4 h-4" />
          {!collapsed && <span>View Website</span>}
        </Link>

        <div
          className={`flex items-center justify-between pt-2 border-t border-white/10 mt-2 ${
            collapsed ? "flex-col gap-3" : ""
          }`}
        >
          {!collapsed && (
            <div className="truncate text-xs text-white/60 max-w-[130px]">
              {user?.email}
            </div>
          )}

          {/* Logout */}
          <button
            onClick={signOut}
            className="p-2 hover:bg-red-500/20 rounded-full text-red-200 hover:text-red-100 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
