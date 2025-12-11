"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Search,
  Tag,
  Sparkles,
  ImageIcon,
} from "lucide-react";

interface Blog {
  id: string;
  title: string;  
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  created_at: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80";

export default function   BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs?published=true");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setBlogs(data);
        const uniqueCategories = Array.from(new Set(data.map((b: any) => b.category).filter(Boolean))) as string[];
        setCategories(["All", ...uniqueCategories]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return FALLBACK_IMAGE;
    return url.startsWith("http") || url.startsWith("/") ? url : FALLBACK_IMAGE;
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#004080] py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Our Latest Blogs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Insights & Updates</h1>
          <p className="text-white/80 text-lg">Latest trends in digital marketing and development.</p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#004080] outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat ? "bg-[#004080] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Grid (Fixed: 4 Columns) */}
      <section className="max-w-[1400px] mx-auto px-4 pb-24">
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No blogs found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${blog.slug}`} className="group h-full block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(blog.featured_image)}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                      />
                      {blog.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 text-[#004080] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {blog.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.created_at).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#004080] transition-colors leading-tight">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                        {blog.excerpt || "Click to read full article..."}
                      </p>

                      <div className="pt-4 border-t border-gray-100 flex items-center text-[#004080] text-sm font-semibold group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}