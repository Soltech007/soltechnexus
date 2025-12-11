"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BlogForm from "@/app/components/Admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#004080] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Create New Blog</h1>
        <p className="text-gray-600 mt-1">Write and publish a new blog post</p>
      </motion.div>

      {/* Form */}
      <BlogForm />
    </div>
  );
}