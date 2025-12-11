"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import slugify from "slugify";
import {
  Save,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  Upload,
  X,
  Trash2,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase/client";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// 👇 WEBSITE LIST UPDATE KARO
const WEBSITES = [
  { id: "soltechnexus", name: "Soltech Nexus" },
];

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  author: string;
  is_published: boolean;
  website: string; // 👈 New Field
}

interface Props {
  blog?: any;
  isEditing?: boolean;
}

export default function BlogForm({ blog, isEditing = false }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(blog?.featured_image || null);

  const [formData, setFormData] = useState<BlogFormData>({
    title: blog?.title || "",
    slug: blog?.slug || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    featured_image: blog?.featured_image || "",
    category: blog?.category || "",
    tags: blog?.tags || [],
    author: blog?.author || "Admin",
    is_published: blog?.is_published || false,
    // 👇 Default website wo hogi jo .env me hai ya purani saved wali
    website: blog?.website || process.env.NEXT_PUBLIC_WEBSITE_ID || "soltech360",
  });

  useEffect(() => {
    if (!isEditing && formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(formData.title, { lower: true, strict: true }),
      }));
    }
  }, [formData.title, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    // Checkbox handling fix
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `blogs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      setFormData((prev) => ({ ...prev, featured_image: imageUrl }));
      setImagePreview(imageUrl);

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, featured_image: "" }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.title.trim()) throw new Error("Title is required");
      if (!formData.content.trim() || formData.content === "<p><br></p>") {
        throw new Error("Content is required");
      }

      const url = isEditing ? `/api/blogs/${blog.id}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save blog");

      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin/blogs" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Edit Blog" : "Create New Blog"}
        </h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
          <X className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="space-y-6">
        
        {/* 👇 WEBSITE SELECTOR (NEW) */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 shadow-sm">
          <label className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-2">
            <Globe className="w-4 h-4" />
            Select Website
          </label>
          <select
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
          >
            {WEBSITES.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-blue-600 mt-2">
            Select which website this blog belongs to.
          </p>
        </div>

        {/* Title */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title..."
            required
            className="w-full p-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Slug */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug *</label>
          <div className="flex items-center">
            <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500 text-sm">/blog/</span>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="blog-url-slug"
              required
              className="flex-1 p-3 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-3">Featured Image</label>
          {imagePreview ? (
            <div className="relative mb-4">
              <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-xl border border-gray-200" />
              <button type="button" onClick={removeImage} className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                  <p className="text-gray-600">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Click to upload image</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>

        {/* Category & Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., Tech, News" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author name" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} placeholder="Brief description..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
        </div>

        {/* Tags */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
          <div className="flex gap-2 mb-3">
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag..." className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            <button type="button" onClick={addTag} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium">Add</button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                  #{tag} <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500 font-bold">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-2">Content *</label>
          <div className="min-h-[400px]">
            <ReactQuill theme="snow" value={formData.content} onChange={(content) => setFormData((prev) => ({ ...prev, content }))} className="h-[350px]" />
          </div>
        </div>

        {/* Publish */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            <div className="flex items-center gap-2">
              {formData.is_published ? <><Eye className="w-5 h-5 text-green-500" /><span className="font-medium text-gray-700">Published</span></> : <><EyeOff className="w-5 h-5 text-gray-400" /><span className="font-medium text-gray-700">Draft</span></>}
            </div>
          </label>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button type="submit" disabled={loading || uploading} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : <><Save className="w-5 h-5" /> {isEditing ? "Update" : "Create"}</>}
          </button>
          <Link href="/admin/blogs" className="flex-1 flex items-center justify-center px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancel</Link>
        </div>
      </div>
      
      {/* Styles */}
      <style jsx global>{`
        .ql-container { font-size: 16px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; min-height: 300px; }
        .ql-toolbar { border-top-left-radius: 12px; border-top-right-radius: 12px; background: #f9fafb; }
        .ql-editor { min-height: 300px; font-size: 16px; line-height: 1.8; }
        .ql-editor p { margin-bottom: 1em; }
      `}</style>
    </form>
  );
}