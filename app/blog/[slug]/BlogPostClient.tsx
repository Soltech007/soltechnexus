"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Eye,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  created_at: string;
  views: number;
  author?: string;
}

interface BlogPostClientProps {
  blog: Blog;
  relatedBlogs: Blog[];
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80";

export default function BlogPostClient({ blog, relatedBlogs }: BlogPostClientProps) {
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const readingTime = Math.ceil(blog.content.split(" ").length / 200);

  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return FALLBACK_IMAGE;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    if (url.startsWith("/")) {
      return url;
    }
    return FALLBACK_IMAGE;
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = blog.title;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
      return;
    }

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b  border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#004080] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 " />
            <span className="font-medium ">Back to Blogs</span>
          </Link>
        </div>
      </div>

      <section className="bg-white py-12 border-b border-gray-200">
      {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Category Badge */}
          {blog.category && (
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-[#004080]" />
              <span className="text-sm font-semibold text-[#004080] uppercase tracking-wider">
                {blog.category}
              </span>
            </div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {blog.title}
          </motion.h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{blog.excerpt}</p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(blog.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{blog.views || 0} views</span>
            </div>
            {blog.author && (
              <div className="flex items-center gap-2">
                <span>By {blog.author}</span>
              </div>
            )}
          </div>

          {/* Share Button */}
          <div className="relative mt-6">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Share</span>
            </button>

            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 flex gap-2 z-50"
              >
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="p-2 hover:bg-sky-50 rounded-lg transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-5 h-5 text-sky-500" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-blue-700" />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy Link"
                >
                  <Link2 className="w-5 h-5 text-gray-600" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featured_image && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <Image
                src={getImageUrl(blog.featured_image)}
                alt={blog.title}
                fill
                className="absolute inset-0 object-cover"
                priority
                onError={(e: any) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            </div>
          </motion.div>
        </section>
      )}

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[#004080] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:my-6 prose-ol:my-6
            prose-li:text-gray-700 prose-li:my-2
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-[#004080] 
            prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
            prose-code:text-[#004080] prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/blog/${relatedBlog.slug}`}
                  className="group"
                >
                  <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-18 bg-gray-200 overflow-hidden">
                      <Image
                        src={getImageUrl(relatedBlog.featured_image)}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e: any) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      {relatedBlog.category && (
                        <span className="text-xs font-semibold text-[#004080] uppercase tracking-wider mb-2">
                          {relatedBlog.category}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#004080] transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 flex-1">
                        {relatedBlog.excerpt || "Click to read more..."}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-[#004080] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Read More?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Explore our collection of articles on digital marketing, web development, and more.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#004080] font-semibold rounded-xl hover:bg-gray-100 transition-all"
          >
            View All Blogs
          </Link>
        </div>
      </section>
    </main>
  );
}