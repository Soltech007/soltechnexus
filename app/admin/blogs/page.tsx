"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Loader2,
  Globe,
  Filter,
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  website: string;
  category: string;
  is_published: boolean;
  views: number;
  created_at: string;
  featured_image: string;
}

const WEBSITES = [
  { id: "all", name: "All Websites", color: "bg-gray-500" },
  { id: "soltech360", name: "SolTech360", color: "bg-blue-700" },
  { id: "bizaihacks", name: "BizAI Hacks", color: "bg-purple-500" },
  { id: "ebooks", name: "Ebooks", color: "bg-green-500" },
  { id: "nexus", name: "Nexus", color: "bg-orange-500" },
  { id: "website5", name: "Website 5", color: "bg-pink-500" },
  { id: "website6", name: "Website 6", color: "bg-indigo-500" },
  { id: "website7", name: "Website 7", color: "bg-red-500" },
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [selectedWebsite]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedWebsite !== "all") {
        params.set("website", selectedWebsite);
      }

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    setDeleteId(id);
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setDeleteId(null);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getWebsiteInfo = (websiteId: string) => {
    return WEBSITES.find((w) => w.id === websiteId) || WEBSITES[0];
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-20 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            All Blogs
          </h1>
          <p className="text-gray-600 mt-1">
            Manage blogs across all your websites
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all"
        >
          <PlusCircle className="w-10 h-8" />
          New Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-700 outline-none"
            />
          </div>

          {/* Website Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedWebsite}
              onChange={(e) => setSelectedWebsite(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-700 outline-none min-w-[180px]"
            >
              {WEBSITES.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
          <p className="text-sm text-gray-500">Total Blogs</p>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-2xl font-bold text-green-600">
            {blogs.filter((b) => b.is_published).length}
          </p>
          <p className="text-sm text-gray-500">Published</p>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-2xl font-bold text-yellow-600">
            {blogs.filter((b) => !b.is_published).length}
          </p>
          <p className="text-sm text-gray-500">Drafts</p>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-2xl font-bold text-blue-600">
            {blogs.reduce((sum, b) => sum + (b.views || 0), 0)}
          </p>
          <p className="text-sm text-gray-500">Total Views</p>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
            <p className="text-gray-500 mt-4">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No blogs found</p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 mt-4 text-blue-600 font-medium"
            >
              <PlusCircle className="w-4 h-4" />
              Create your first blog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                    Blog
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                    Website
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 hidden lg:table-cell">
                    Views
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBlogs.map((blog) => {
                  const websiteInfo = getWebsiteInfo(blog.website);
                  return (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          {blog.featured_image && (
                            <img
                              src={blog.featured_image}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover hidden sm:block"
                            />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-900 line-clamp-1">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {blog.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 ${websiteInfo.color} text-white text-xs font-medium rounded-full`}
                        >
                          <Globe className="w-3 h-3" />
                          {websiteInfo.name}
                        </span>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        {blog.is_published ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Published
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 hidden lg:table-cell">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Eye className="w-4 h-4" />
                          {blog.views || 0}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 hidden lg:table-cell">
                        {new Date(blog.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/blogs/edit/${blog.id}`}
                            className="p-2 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-blue-700" />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            disabled={deleteId === blog.id}
                            className="p-2 hover:bg-red-50 rounded-lg disabled:opacity-50"
                            title="Delete"
                          >
                            {deleteId === blog.id ? (
                              <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 text-red-500" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}