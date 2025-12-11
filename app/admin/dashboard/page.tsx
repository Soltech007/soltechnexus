"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Eye,
  TrendingUp,
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
  Clock1,
} from "lucide-react";
import { Blog } from "@/app/types/blog";

interface Stats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/blogs");
      const blogs: Blog[] = await res.json();

      const published = blogs.filter((b) => b.is_published);
      const drafts = blogs.filter((b) => !b.is_published);
      const views = blogs.reduce((sum, b) => sum + (b.views || 0), 0);

      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: published.length,
        draftBlogs: drafts.length,
        totalViews: views,
      });

      setRecentBlogs(blogs.slice(0, 5));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Total Blogs", value: stats.totalBlogs, icon: FileText, color: "bg-blue-500" },
    { label: "Published", value: stats.publishedBlogs, icon: CheckCircle, color: "bg-green-500" },
    { label: "Drafts", value: stats.draftBlogs, icon: Clock1, color: "bg-blue-500" },
    { label: "Total Views", value: stats.totalViews, icon: Eye, color: "bg-purple-500" },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back to your admin panel</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#004080] text-white font-semibold rounded-xl hover:bg-[#003366] hover:shadow-lg transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Blog</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Blogs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Blogs</h2>
          <Link
            href="/admin/blogs"
            className="text-[#004080] hover:underline text-sm font-medium"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-[#004080] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : recentBlogs.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No blogs yet. Create your first blog!</p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 mt-4 text-[#004080] font-medium hover:underline"
            >
              <PlusCircle className="w-4 h-4" />
              Create Blog
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/admin/blogs/edit/${blog.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(blog.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    {blog.views || 0}
                  </span>
                  {blog.is_published ? (
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      Draft
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}